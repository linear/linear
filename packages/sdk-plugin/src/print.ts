import { filterJoin } from "@linear/common";
import c from "./constants";
import { ApiDefinition, SdkPluginContext } from "./types";

/**
 * Prepend the import namespace if required
 */
export function printNamespaced(context: SdkPluginContext, name?: string): string {
  return context.config.documentFile ? filterJoin([c.NAMESPACE_DOCUMENT, name], ".") : name ?? "UNNAMED_IMPORT";
}

/**
 * Return the name of the operation
 */
export function printOperationName(o: ApiDefinition): string {
  return o.node.name?.value ?? "UNKNOWN_OPERATION_NAME";
}

/**
 * Return the type of the operation
 */
export function printOperationType(o: ApiDefinition): string {
  return o.node.operation;
}
