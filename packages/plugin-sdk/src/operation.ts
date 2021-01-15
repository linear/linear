import { ArgDefinition, getArgList, nonNullable, printComment, printDebug, printList } from "@linear/plugin-common";
import { FieldNode, FragmentSpreadNode, Kind } from "graphql";
import c from "./constants";
import { printNamespaced, printSdkFunctionName, printSdkOperationName } from "./print";
import { printRequestCall } from "./request";
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

  /** Single definition for any optional variables */
  const optionalVariables = getOptionalVariables(o.node);
  const variableType = printNamespaced(context, o.operationVariablesTypes);
  const optionalArg = requiredVariables.length
    ? {
        name: c.VARIABLE_NAME,
        optional: true,
        type: `Omit<${variableType}, ${printList(requiredVariableNames, " | ")}>`,
        description: `variables without ${printList(requiredVariableNames, ", ")} to pass into the ${
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
export function getOperationResultField(o: SdkOperation): FieldNode | undefined {
  return o.path.reduce<FieldNode>((acc, key) => {
    const field = acc?.selectionSet?.selections?.find(selection => {
      return selection.kind === Kind.FIELD && selection.name.value === key;
    }) as FieldNode;
    if (field) {
      return field;
    } else {
      throw new Error(`No selection set found on operation with nested keys: ${printList(o.path, ", ")}`);
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
      const queryToCall = `() => ${printSdkFunctionName([])}(${c.REQUEST_NAME}).${field.name.value}`;

      if (requiredVariables.length) {
        const requiredVariableNames = requiredVariables.map(v =>
          printList(["response", ...o.path, field.name.value, v.name], "?.")
        );
        const castVariableNames = requiredVariables.map(
          v => `${printList(["response", ...o.path, field.name.value, v.name], "?.")} as ${v.type}`
        );
        return `${field.name.value}: ${printList(requiredVariableNames, " && ")} ? ${queryToCall}(${printList(
          castVariableNames,
          ", "
        )}) : undefined,`;
      } else {
        return `${field.name.value}: ${queryToCall}(),`;
      }
    }) ?? []
  );
}

/**
 * Find the operation field with list data if it exists
 */
export function getOperationList(context: SdkPluginContext, o: SdkOperation): FieldNode | undefined {
  const resultField = getOperationResultField(o);
  return resultField?.selectionSet?.selections.find(
    f => f.kind === Kind.FIELD && f.name.value === c.LIST_NAME
  ) as FieldNode;
}

/**
 * Loop through any returned list data and attach sdks if required
 */
function printOperationList(context: SdkPluginContext, o: SdkOperation): string | undefined {
  const listField = getOperationList(context, o);
  const extractedResponse = printOperationResponse(o);

  return listField
    ? `${c.LIST_NAME}: ${extractedResponse}.${c.LIST_NAME}.map(x => ({
    ...x,
    ...x,
  }))`
    : undefined;
}

/**
 * Print the response from the api drilled down by the operation path
 */
function printOperationResponse(o: SdkOperation): string {
  return printList(["response", ...o.path], "?.");
}

/**
 * Get the sdk action operation body
 */
function printOperationBody(context: SdkPluginContext, o: SdkOperation): string | undefined {
  const requiredVariables = getRequiredVariables(o.node);

  /** Extract from the response data if we are nested */
  if (o.path.length) {
    const operationApi = getReturnOperations(context, o);
    const operationObjects = printOperationObjects(context, o);
    const operationList = printOperationList(context, o);

    const extractedResponse = printOperationResponse(o);

    // if (isListType(o.query)) {
    //   return filterJoin(
    //     [
    //       `return ${extractedResponse}.map(x => {
    //       ${printOperationBody(context, o.query)}
    //     })`,
    //     ],
    //     "\n"
    //   );
    // }

    /** Return an object if required */
    if (operationApi || operationObjects.length || operationList) {
      return printList(
        [
          `return {`,
          /** If the first field is the operation drill down for a nicer api */
          `...${extractedResponse},`,
          ...operationObjects,
          operationList,
          /** Add the child sdk to the response */
          operationApi
            ? `...${printSdkFunctionName(o.path)}(${printList(
                [c.REQUEST_NAME, ...requiredVariables.map(v => v.variable.name?.value)],
                ", "
              )}),`
            : undefined,
          "}",
        ],
        "\n"
      );
    } else {
      return printList([`return ${extractedResponse}`], "\n");
    }
  } else {
    return undefined;
  }
}

/**
 * Process a graphql operation and return a generated operation string
 */
export function printOperation(context: SdkPluginContext, definition: SdkDefinition, o: SdkOperation): string {
  const operationName = printSdkOperationName(o);
  const body = printOperationBody(context, o);
  const args = getArgList(getOperationArgs(context, o));

  /** Build a function for this graphql operation */
  return printList(
    [
      printComment([
        `Call the Linear api with the ${operationName}`,
        ...args.jsdoc,
        `@returns The result of the ${o.operationResultType}`,
      ]),
      printDebug({ apiKey: definition.sdkPath, ...o }),
      `${operationName}(${args.printInput}): Promise<${o.returnType}> {
        return ${printRequestCall(context, o)}${
        body
          ? `.then(response => {
            ${body}
          })`
          : ""
      }
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
