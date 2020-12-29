import { filterJoin } from "@linear/common";
import { OperationDefinitionNode } from "graphql";
import { SdkPluginConfig } from "./config";
import c from "./constants";

/**
 * Prepend the import namespace if required
 */
export function printNamespaced(config: SdkPluginConfig, name: string): string {
  return config.documentFile ? filterJoin([c.NAMESPACE_DOCUMENT, name], ".") : name;
}

/**
 * Return the name of the operation
 */
export function printOperationName(o: OperationDefinitionNode): string {
  return o.name?.value ?? "UNKNOWN_OPERATION_NAME";
}

/**
 * Return the type of the operation
 */
export function printOperationType(o: OperationDefinitionNode): string {
  return o.operation;
}
