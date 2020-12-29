import { DocumentMode } from "@graphql-codegen/visitor-plugin-common";
import { printComment } from "@linear/common";
import { ArgDefinition } from "./args";
import c from "./constants";
import { printNamespaced } from "./print";
import { ApiDefinition, RawSdkPluginConfig, SdkPluginContext } from "./types";
import { hasOtherVariable, hasVariable } from "./variable";

/**
 * Get the requester args from the operation variables
 */
export function printRequesterArgs(o: ApiDefinition): string {
  if (hasVariable(o, c.ID_NAME)) {
    /** Merge id variable into requester variables */
    if (hasOtherVariable(o, c.ID_NAME)) {
      return `{${c.ID_NAME}, ...${c.VARIABLE_NAME}}`;
    } else {
      return `{${c.ID_NAME}}`;
    }
  } else {
    return c.VARIABLE_NAME;
  }
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
export function printRequesterCall(context: SdkPluginContext, o: ApiDefinition): string {
  const variableType = printNamespaced(context, o.operationVariablesTypes);
  const documentName = printNamespaced(context, o.documentVariableName);
  const resultType = printNamespaced(context, o.operationResultType);

  return `${c.REQUESTER_NAME}<${resultType}, ${variableType}>(${documentName}, ${printRequesterArgs(o)}, ${
    c.OPTIONS_NAME
  });`;
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
