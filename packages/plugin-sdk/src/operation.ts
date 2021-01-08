import {
  ArgDefinition,
  filterJoin,
  getArgList,
  logger,
  nonNullable,
  printComment,
  printDebug,
} from "@linear/plugin-common";
import { FieldNode, FragmentSpreadNode, Kind } from "graphql";
import c from "./constants";
import { printNamespaced, printSdkFunctionName, printSdkOperationName } from "./print";
import { printRequesterCall } from "./requester";
import { getReturnOperations } from "./return-type";
import { SdkDefinition, SdkOperation, SdkOperationObject, SdkPluginContext } from "./types";
import { getOptionalVariables, getRequiredVariables } from "./variable";

/**
 * Get the operation args from the operation variables
 */
export function getOperationArgs(context: SdkPluginContext, o: SdkOperation): ArgDefinition[] {
  /** Get all required variable names in the parent scope */
  const parentOperation = getParentOperation(context, o.path.slice(0, -1));
  const parentRequiredVariables = getRequiredVariables(parentOperation?.node) ?? [];
  const parentRequiredVariableNames = parentRequiredVariables.map(v => v.variable.name.value);

  /** Argument definition for each required variable that is not in the parent scope */
  const requiredVariables: (ArgDefinition | undefined)[] = Object.values(o.requiredVariables).map(({ name, type }) =>
    parentRequiredVariableNames.includes(name)
      ? undefined
      : {
          name,
          type,
          optional: false,
          description: `${name} to pass into the ${o.operationResultType}`,
        }
  );
  const requiredVariableNames = [
    ...parentRequiredVariableNames.map(v => `'${v}'`),
    ...requiredVariables.map(v => (v ? `'${v.name}'` : undefined)),
  ];

  logger.trace({ o, parentOperation, parentRequiredVariableNames, requiredVariableNames });

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
function getOperationResultField(o: SdkOperation): FieldNode | undefined {
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
  const resultField = getOperationResultField(o);

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
export function getOperationObjects(context: SdkPluginContext, o: SdkOperation): SdkOperationObject[] {
  const fragment = getOperationFragment(context, o);

  const fields =
    fragment?.fields?.map(field => {
      return {
        field,
        definition: context.sdkDefinitions[field.name.value],
        queryDefinition: context.sdkDefinitions[""]?.operations?.find(d => d.path.join("") === field.name.value),
      };
    }) ?? [];

  return fields.filter(({ field, definition, queryDefinition }) =>
    Boolean(field && definition && queryDefinition)
  ) as SdkOperationObject[];
}

/**
 * Print each object returned in the response with a corresponding api definition
 */
function printOperationObjects(context: SdkPluginContext, o: SdkOperation): (string | undefined)[] {
  const operationObjects = getOperationObjects(context, o);

  return (
    operationObjects.map(({ field, queryDefinition }) => {
      const requiredVariables = getOperationArgs(context, queryDefinition);

      const queryToCall = `() => ${printSdkFunctionName([])}(${c.REQUESTER_NAME}).${field.name.value}`;

      if (requiredVariables.length) {
        const requiredVariableNames = requiredVariables.map(v =>
          filterJoin(["response", ...o.path, field.name.value, v.name], "?.")
        );
        return `${field.name.value}: ${filterJoin(requiredVariableNames, " && ")} ? ${queryToCall}(${filterJoin(
          requiredVariableNames,
          ", "
        )}) : undefined,`;
      } else {
        return `${field.name.value}: ${queryToCall}(),`;
      }
    }) ?? []
  );
}

/**
 * Get the sdk action operation body
 */
function printOperationBody(context: SdkPluginContext, definition: SdkDefinition, o: SdkOperation): string {
  const requiredVariables = getRequiredVariables(o.node);

  /** Extract from the response data if we are nested */
  if (o.path.length) {
    const operationApi = getReturnOperations(context, o);
    const operationObjects = printOperationObjects(context, o);

    const response = `const response = await ${printRequesterCall(context, o)}`;
    const extractedResponse = filterJoin(["response", ...o.path], "?.");

    /** Return an object if required */
    if (operationApi || operationObjects.length > 0) {
      return filterJoin(
        [
          response,
          `if (${extractedResponse}) {`,
          filterJoin(
            [
              `return {`,
              /** If the first field is the operation drill down for a nicer api */
              `...${extractedResponse},`,
              ...operationObjects,
              /** Add the child sdk to the response */
              operationApi
                ? `...${printSdkFunctionName(o.path)}(${filterJoin(
                    [c.REQUESTER_NAME, ...requiredVariables.map(v => v.variable.name?.value)],
                    ", "
                  )}),`
                : undefined,
              "}",
            ],
            "\n"
          ),
          "} else { return undefined }",
        ],
        "\n"
      );
    } else {
      return filterJoin([response, `return ${extractedResponse}`], "\n");
    }
  } else {
    return `return ${printRequesterCall(context, o)}`;
  }
}

/**
 * Process a graphql operation and return a generated operation string
 */
export function printOperation(context: SdkPluginContext, definition: SdkDefinition, o: SdkOperation): string {
  const operationName = printSdkOperationName(o);
  const content = printOperationBody(context, definition, o);
  const args = getArgList(getOperationArgs(context, o));

  /** Build a function for this graphql operation */
  return filterJoin(
    [
      printComment([
        `Call the Linear api with the ${operationName}`,
        ...args.jsdoc,
        `@returns The result of the ${o.operationResultType}`,
      ]),
      printDebug({ apiKey: definition.sdkPath, ...o }),
      `async ${operationName}(${args.printInput}): Promise<${o.returnType} | undefined> {
        ${content}
      }`,
    ],
    "\n"
  );
}

/**
 * Find the operation definition for the parent api function
 */
export function getParentOperation(context: SdkPluginContext, path: string[]): SdkOperation | undefined {
  const parentKey = path.slice(0, -1).join("_") ?? "";
  return context.sdkDefinitions[parentKey].operations.find(d => d.path.join("_") === path.join("_"));
}
