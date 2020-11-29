import { DocumentMode } from "@graphql-codegen/visitor-plugin-common";
import { ArgDefinition } from "./args";
import { RawSdkPluginConfig, SdkPluginConfig } from "./config";
import c from "./constants";
import { printDocBlock, printNamespaced } from "./print";
import { SdkVisitorOperation } from "./sdk-visitor";
import { hasOtherVariable, hasVariable } from "./variable";

/**
 * Get the requester args from the operation variables
 */
export function printRequesterArgs(o: SdkVisitorOperation): string {
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
    printDocBlock([`The function type for calling the graphql client`]),
    `export type ${c.REQUESTER_TYPE}<${c.OPTIONS_TYPE} = {}> = <R, V>(doc: ${docType}, ${c.VARIABLE_NAME}?: V, ${c.OPTIONS_NAME}?: ${c.OPTIONS_TYPE}) => Promise<R>`,
  ];
}

/**
 * Print the call to the requester
 */
export function printRequesterCall(o: SdkVisitorOperation, config: SdkPluginConfig): string {
  const variableType = printNamespaced(config, o.operationVariablesTypes);
  const documentName = printNamespaced(config, o.documentVariableName);
  const resultType = printNamespaced(config, o.operationResultType);

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
