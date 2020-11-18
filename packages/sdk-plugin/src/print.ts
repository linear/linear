import { SdkPluginConfig } from "./config";
import c from "./constants";
import { filterJoin, upperFirst } from "./utils";

/**
 * Print the name of the sdk function scoped to the api key
 */
export function printApiFunctionName(chainKey?: string): string {
  return `${c.SDK_NAME}${upperFirst(chainKey)}`;
}

/**
 * Print the type of the sdk function scoped to the api key
 */
export function printApiFunctionType(chainKey?: string): string {
  return `${c.SDK_TYPE}${upperFirst(chainKey)}`;
}

/**
 * Transform a list of arg strings into a single string
 */
export function printArgList(args: (string | undefined)[]): string {
  return filterJoin(args, ", ");
}

/**
 * Prepend the type import namespace if required
 */
export function printNamespacedType(config: SdkPluginConfig, typeName: string): string {
  return config.typeFile ? filterJoin([c.NAMESPACE_TYPE, typeName], ".") : typeName;
}

/**
 * Prepend the document import namespace if required
 */
export function printNamespacedDocument(config: SdkPluginConfig, documentName: string): string {
  return config.documentFile ? filterJoin([c.NAMESPACE_DOCUMENT, documentName], ".") : documentName;
}
