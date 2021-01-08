import { filterJoin, getLast, upperFirst } from "@linear/plugin-common";
import c from "./constants";
import { SdkOperation, SdkPluginContext } from "./types";

/**
 * Prepend the import namespace if required
 */
export function printNamespaced(context: SdkPluginContext, name?: string): string {
  return context.config.documentFile ? filterJoin([c.NAMESPACE_DOCUMENT, name], ".") : name ?? "UNNAMED_IMPORT";
}

/**
 * Return the name of the operation
 */
export function printOperationName(o: SdkOperation): string {
  return o.node.name?.value ?? "UNKNOWN_OPERATION_NAME";
}

/**
 * Return the type of the operation
 */
export function printOperationType(o: SdkOperation): string {
  return o.node.operation;
}

/**
 * Return the name of the sdk function scoped to the api key
 */
export function printSdkFunctionName(path: string[]): string {
  return `${c.SDK_NAME}${path.map(upperFirst).join("")}`;
}

/**
 * Return the type of the sdk function scoped to the api key
 */
export function printSdkFunctionType(path: string[]): string {
  return `${c.SDK_TYPE}${path.map(upperFirst).join("")}`;
}

/**
 * Return the name of the operation return type
 */
export function printOperationReturnType(operationType: string, path: string[]): string {
  return `${path.map(upperFirst).join("_")}${operationType}Response`;
}

/**
 * Get the name of the operation
 * Chained apis have the chain key removed from the name
 */
export function printSdkOperationName(o: SdkOperation): string {
  return getLast(printOperationName(o).split("_")) ?? "NO_OPERATION_NAME";
}
