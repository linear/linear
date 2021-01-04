import { DocumentMode } from "@graphql-codegen/visitor-plugin-common";
import { ArgDefinition, filterJoin, printComment } from "@linear/plugin-common";
import c from "./constants";
import { printNamespaced } from "./print";
import { RawSdkPluginConfig, SdkOperation, SdkPluginContext } from "./types";
import { getOptionalVariables, getRequiredVariables } from "./variable";

/**
 * Get the requester args from the operation variables
 */
export function printRequesterArgs(o: SdkOperation): string {
  const requiredVariables = getRequiredVariables(o.node);
  const requiredArg = filterJoin(
    requiredVariables.map(v => v.variable.name?.value),
    ", "
  );

  const optionalVariables = getOptionalVariables(o.node);

  if (requiredArg) {
    /** Merge id variable into requester variables */
    if (optionalVariables.length) {
      return `{${requiredArg}, ...${c.VARIABLE_NAME}}`;
    } else {
      return `{${requiredArg}}`;
    }
  }

  return optionalVariables.length ? c.VARIABLE_NAME : "{}";
}

/**
 * Print the exported requester type
 */
export function printRequesterType(config: RawSdkPluginConfig): string[] {
  const docType = config.documentMode === DocumentMode.string ? "string" : "DocumentNode";
  return [
    printComment([`The function type for calling the graphql client`]),
    `export type ${c.REQUESTER_TYPE}<${c.OPTIONS_TYPE} = {}> = <R, V>(doc: ${docType}, ${c.VARIABLE_NAME}?: V, ${c.OPTIONS_NAME}?: ${c.OPTIONS_TYPE}) => Promise<R>`,
  ];
}

/**
 * Print the call to the requester
 */
export function printRequesterCall(context: SdkPluginContext, o: SdkOperation): string {
  const variableType = printNamespaced(context, o.operationVariablesTypes);
  const documentName = printNamespaced(context, o.documentVariableName);
  const resultType = printNamespaced(context, o.operationResultType);

  return `${c.REQUESTER_NAME}<${resultType}, ${variableType}>(${filterJoin(
    [documentName, printRequesterArgs(o), c.OPTIONS_NAME],
    ", "
  )});`;
}

/**
 * Get the argument definition for the requester
 */
export function getRequesterArg(): ArgDefinition {
  return {
    name: c.REQUESTER_NAME,
    optional: false,
    type: `${c.REQUESTER_TYPE}<${c.OPTIONS_TYPE}>`,
    description: "function to call the graphql client",
  };
}
