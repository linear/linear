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
import { FieldNode, Kind, OperationDefinitionNode, SelectionSetNode, visit } from "graphql";
import { printApiFunctionName, printApiFunctionType } from "./api";
import c from "./constants";
import { printNamespaced, printOperationName } from "./print";
import { printRequesterCall } from "./requester";
import { SdkOperation, SdkPluginContext } from "./types";
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
 * Get the set of keys by which to nest the data
 */
function getNestedDataKeys(o: SdkOperation): string[] {
  // const operationName = printSdkOperationName(o);
  // const firstField = getFirstField(o.node.selectionSet);

  return [
    ...o.path,
    // /** If the operation name is the same as the first field we can drill into the data */
    // operationName === getFirstFieldName(o.node.selectionSet) ? operationName : undefined,
    // /** If the operation is a child and named the same as the first field inside the first field we can also drill */
    // chainChildKey && operationName === getFirstFieldName(firstField.selectionSet) ? operationName : undefined,
  ].filter(nonNullable);
}

/**
 * Get the sdk action operation body
 */
function printOperationBody(context: SdkPluginContext, o: SdkOperation): string {
  const requiredVariables = getRequiredVariables(o.node);
  const nestedDataKeys = getNestedDataKeys(o);

  return o.path.length || nestedDataKeys.length
    ? filterJoin(
        [
          `const response = await ${printRequesterCall(context, o)}`,
          `return {`,
          /** If the first field is the operation drill down for a nicer api */
          `...${filterJoin(["response", ...nestedDataKeys], "?.")},`,
          /** If we are a parent add the child sdk to the response */
          getOperationApi(context, o)
            ? `...${printApiFunctionName(o.path)}(${filterJoin(
                [c.REQUESTER_NAME, ...requiredVariables.map(v => v.variable.name?.value)],
                ", "
              )}),`
            : undefined,
          `}`,
        ],
        "\n"
      )
    : `return ${printRequesterCall(context, o)}`;
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
  const nestedDataKeys = getNestedDataKeys(o);
  const documentName = printNamespaced(context, o.documentVariableName);
  const documentResultType = `ResultOf<typeof ${documentName}>`;

  const resultType = filterJoin([documentResultType, ...nestedDataKeys.map(key => `['${key}']`)], "");

  if (getOperationApi(context, o)) {
    return `Promise<${resultType} & ${printApiFunctionType(o.path)}>`;
  } else {
    return `Promise<${resultType}>`;
  }
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
