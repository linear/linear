import {
  ArgDefinition,
  ArgumentTypescriptVisitor,
  filterJoin,
  getArgList,
  getLast,
  nonNullable,
  printComment,
  printDebug,
} from "@linear/plugin-common";
import { FieldNode, FragmentSpreadNode, Kind, OperationDefinitionNode, SelectionSetNode, visit } from "graphql";
import { printApiFunctionName, printApiFunctionType } from "./api";
import c from "./constants";
import { printNamespaced, printOperationName } from "./print";
import { printRequesterCall } from "./requester";
import { SdkOperation, SdkOperationObject, SdkPluginContext } from "./types";
import { getOptionalVariables, getRequiredVariables, isIdVariable } from "./variable";

/**
 * Type to determine at which level of the sdk an operation is to be added
 */
export enum SdkChainType {
  /** Add the operation to the root */
  root = "root",
  /** Add the operation to the root and return a chained api */
  parent = "parent",
  /** Add the operation to a chained api */
  child = "child",
}

/**
 * A processed operation definition to determine whether it is to chain or be chained
 */
export interface SdkOperationDefinition extends OperationDefinitionNode {
  chainType: SdkChainType;
  chainKey?: string;
}

/**
 * Operation should create a chained api using the chain key
 */
export interface SdkParentOperation extends SdkOperationDefinition {
  chainType: SdkChainType.parent;
  chainKey: string;
}

/**
 * Operation should be nested within the chained api by the chain key
 */
export interface SdkChildOperation extends SdkOperationDefinition {
  chainType: SdkChainType.child;
  chainKey: string;
}

/**
 * Operation is "normal" and should be added to the root level
 */
export interface SdkRootOperation extends SdkOperationDefinition {
  chainType: SdkChainType.root;
}

/**
 * The first field of the operation definition
 */
function getFirstField(selectionSet?: SelectionSetNode) {
  return selectionSet?.selections.find(s => s.kind === Kind.FIELD) as FieldNode;
}

/**
 * The name of the first field of the operation definition
 */
function getFirstFieldName(selectionSet?: SelectionSetNode) {
  return getFirstField(selectionSet)?.name?.value;
}

/**
 * The operation has a required id variable
 */
function hasIdVariable(o: OperationDefinitionNode): boolean {
  return (o.variableDefinitions ?? []).some(isIdVariable);
}

/**
 * The name of the operation
 */
function getOperationName(o: OperationDefinitionNode) {
  return o.name?.value;
}

/**
 * Chained api if the query name is the same as the first field and has an id (team, issue)
 * Return it with the chained key to link the chained sdk
 */
export function isParentOperation(o: OperationDefinitionNode): boolean {
  return hasIdVariable(o) && getOperationName(o) === getFirstFieldName(o.selectionSet);
}

/**
 * Chained api if the query name is the same as the first field and has an id (team, issue)
 * Return it with the chained key to link the chained sdk
 */
export function isChildOperation(o: OperationDefinitionNode): boolean {
  return Boolean(hasIdVariable(o) && getOperationName(o)?.startsWith(getFirstFieldName(o.selectionSet) ?? ""));
}

/**
 * Add information for chaining to the operation definition
 */
export function processSdkOperation(o: OperationDefinitionNode): SdkOperationDefinition {
  if (isParentOperation(o)) {
    return {
      ...o,
      chainType: SdkChainType.parent,
      chainKey: getFirstFieldName(o.selectionSet),
    };
  } else if (isChildOperation(o)) {
    return {
      ...o,
      chainType: SdkChainType.child,
      chainKey: getFirstFieldName(o.selectionSet),
    };
  } else {
    return {
      ...o,
      chainType: SdkChainType.root,
    };
  }
}

/**
 * Get the operation args from the operation variables
 */
function getOperationArgs(context: SdkPluginContext, o: SdkOperation): ArgDefinition[] {
  const argVisitor = new ArgumentTypescriptVisitor(context, c.NAMESPACE_DOCUMENT);

  /** Get all required variable names in the parent scope */
  const parentOperation = getParentOperation(context);
  const parentRequiredVariables = getRequiredVariables(parentOperation?.node) ?? [];
  const parentRequiredVariableNames = parentRequiredVariables.map(v => v.variable.name.value);

  /** Argument definition for each required variable that is not in the parent scope */
  const requiredVariables: (ArgDefinition | undefined)[] = getRequiredVariables(o.node).map(v =>
    parentRequiredVariableNames.includes(v.variable.name.value)
      ? undefined
      : {
          name: v.variable.name.value,
          optional: false,
          type: visit(v.type, argVisitor),
          description: `${v.variable.name.value} to pass into the ${o.operationResultType}`,
        }
  );
  const requiredVariableNames = [
    ...parentRequiredVariableNames.map(v => `'${v}'`),
    ...requiredVariables.map(v => (v ? `'${v.name}'` : undefined)),
  ];

  /** Single definition for any optional variables */
  const optionalVariables = getOptionalVariables(o.node);
  const variableType = printNamespaced(context, o.operationVariablesTypes);
  const optionalArg = requiredVariables.length
    ? {
        name: c.VARIABLE_NAME,
        optional: true,
        type: `Omit<${variableType}, ${filterJoin(requiredVariableNames, " | ")}>`,
        description: `variables without ${filterJoin(requiredVariableNames, ", ")} to pass into the ${
          o.operationResultType
        }`,
      }
    : {
        name: c.VARIABLE_NAME,
        optional: true,
        type: variableType,
        description: `variables to pass into the ${o.operationResultType}`,
      };

  /** Spread required variables first */
  return [...requiredVariables, optionalVariables.length ? optionalArg : undefined].filter(nonNullable);
}

/**
 * Drill into the selection set to return the resulting field
 */
function getOperationResultField(context: SdkPluginContext, o: SdkOperation): FieldNode | undefined {
  return o.path.reduce<FieldNode>((acc, key) => {
    const field = acc?.selectionSet?.selections?.find(selection => {
      return selection.kind === Kind.FIELD && selection.name.value === key;
    }) as FieldNode;
    if (field) {
      return field;
    } else {
      throw new Error(`No selection set found on operation with nested keys: ${filterJoin(o.path, ", ")}`);
    }
  }, (o.node as unknown) as FieldNode);
}

/**
 * Find a fragment definition that matches the operation response
 */
function getOperationFragment(context: SdkPluginContext, o: SdkOperation) {
  const resultField = getOperationResultField(context, o);

  /** Get the fragment spread if it exists */
  const fragmentSpread = resultField?.selectionSet?.selections.find(field => field.kind === Kind.FRAGMENT_SPREAD) as
    | FragmentSpreadNode
    | undefined;

  /** Match the fragment if it exists */
  return context.objects.find(f => f.name.value === fragmentSpread?.name?.value);
}

/**
 * Get a list of all fields with a corresponding api and query definition
 */
function getOperationObjects(context: SdkPluginContext, o: SdkOperation): SdkOperationObject[] {
  const fragment = getOperationFragment(context, o);

  const fields =
    fragment?.fields?.map(field => {
      return {
        field,
        apiDefinition: context.apiDefinitions[field.name.value],
        queryDefinition: context.apiDefinitions[""].find(d => d.path.join("") === field.name.value),
      };
    }) ?? [];

  return fields.filter(({ field, apiDefinition, queryDefinition }) =>
    Boolean(field && apiDefinition && queryDefinition)
  ) as SdkOperationObject[];
}

/**
 * Print each object returned in the response with a corresponding api definition
 */
function printOperationObjects(context: SdkPluginContext, o: SdkOperation): (string | undefined)[] {
  const operationObjects = getOperationObjects(context, o);

  return (
    operationObjects.map(({ field, queryDefinition }) => {
      const requiredVariables = getRequiredVariables(queryDefinition?.node);

      if (requiredVariables.length) {
        return `${field.name.value}: ${filterJoin(
          requiredVariables.map(v =>
            filterJoin(["response", ...o.path, field.name.value, v.variable.name.value], "?.")
          ),
          " && "
        )} ? ${printApiFunctionName([field.name.value])}(${filterJoin(
          [
            c.REQUESTER_NAME,
            ...requiredVariables.map(v =>
              filterJoin(["response", ...o.path, field.name.value, v.variable.name.value], "?.")
            ),
          ],
          ", "
        )}) : undefined,`;
      } else {
        return `${field.name.value}: ${printApiFunctionName([field.name.value])}(${c.REQUESTER_NAME}),`;
      }
    }) ?? []
  );
}

/**
 * Get the sdk action operation body
 */
function printOperationBody(context: SdkPluginContext, o: SdkOperation): string {
  const requiredVariables = getRequiredVariables(o.node);

  /** Extract from the response data if we are nested */
  if (o.path.length) {
    const operationApi = getOperationApi(context, o);
    const operationObjects = printOperationObjects(context, o);

    const response = `const response = await ${printRequesterCall(context, o)}`;
    const extractedResponse = filterJoin(["response", ...o.path], "?.");

    return operationApi || operationObjects.length > 0
      ? filterJoin(
          [
            response,
            `return {`,
            /** If the first field is the operation drill down for a nicer api */
            `...${extractedResponse},`,
            ...operationObjects,
            /** Add the child sdk to the response */
            `...${printApiFunctionName(o.path)}(${filterJoin(
              [c.REQUESTER_NAME, ...requiredVariables.map(v => v.variable.name?.value)],
              ", "
            )}),`,
            `}`,
          ],
          "\n"
        )
      : filterJoin([response, `return ${extractedResponse}`], "\n");
  } else {
    return `return ${printRequesterCall(context, o)}`;
  }
}

/**
 * Get the name of the operation
 * Chained apis have the chain key removed from the name
 */
export function printSdkOperationName(o: SdkOperation): string {
  return getLast(printOperationName(o).split("_")) ?? "NO_OPERATION_NAME";
}

/**
 * Get the operations for this return type
 */
function getOperationApi(context: SdkPluginContext, o: SdkOperation): SdkOperation[] {
  return context.apiDefinitions[o.path.join("_")];
}

/**
 * Get the result type of the operation
 * Chained apis have the relevant chain api return type added
 */
function printOperationResultType(context: SdkPluginContext, o: SdkOperation) {
  const documentName = printNamespaced(context, o.documentVariableName);
  const operationObjects = getOperationObjects(context, o);
  const documentResultType = `ResultOf<typeof ${documentName}>`;

  const resultType = filterJoin([documentResultType, ...o.path.map(key => `['${key}']`)], "");

  const overriddenType = operationObjects.length
    ? `Omit<${resultType}, ${filterJoin(
        operationObjects.map(({ field }) => `'${field.name.value}'`),
        " | "
      )}>`
    : resultType;

  return `Promise<${filterJoin(
    [
      overriddenType,
      ...operationObjects.map(({ apiDefinition, field }) =>
        apiDefinition ? `{${field.name.value}?: ${printApiFunctionType([field.name.value])}}` : undefined
      ),
      getOperationApi(context, o) ? printApiFunctionType(o.path) : undefined,
    ],
    " & "
  )}>`;
}

/**
 * Process a graphql operation and return a generated operation string
 */
export function printOperation(context: SdkPluginContext, o: SdkOperation): string {
  const operationName = printSdkOperationName(o);
  const returnType = printOperationResultType(context, o);
  const content = printOperationBody(context, o);
  const args = getArgList([
    ...getOperationArgs(context, o),
    {
      name: c.OPTIONS_NAME,
      optional: true,
      type: c.OPTIONS_TYPE,
      description: "options to pass to the graphql client",
    },
  ]);

  /** Build a function for this graphql operation */
  return filterJoin(
    [
      printComment([
        `Call the Linear api with the ${operationName}`,
        ...args.jsdoc,
        `@returns The result of the ${o.operationResultType}`,
      ]),
      printDebug({ apiKey: context.apiPath, ...o }),
      `async ${operationName}(${args.print}): ${returnType} {
        ${content}
      }`,
    ],
    "\n"
  );
}

/**
 * Find the operation definition for the parent api function
 */
export function getParentOperation(context: SdkPluginContext): SdkOperation | undefined {
  const parentKey = context.apiPath.slice(0, -1).join("_") ?? "";
  return context.apiDefinitions[parentKey].find(d => d.path.join("_") === context.apiPath.join("_"));
}
