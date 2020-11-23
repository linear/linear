import { SdkPluginConfig } from "./config";
import c from "./constants";
import { filterJoin } from "./utils";
import { SdkVisitorOperation } from "./visitor";

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

/**
 * Return a jsdoc formatted block
 */
export function printDocBlock(lines: string[]): string {
  return [
    "/**",
    ...lines
      .filter(t => t && t !== "")
      .reduce((prev, t) => [...prev, ...t.split("\n")], [] as string[])
      .map(line => ` * ${line}`),
    " */",
  ].join("\n");
}

/**
 * Return the name of the operation
 */
export function printOperationName(o: SdkVisitorOperation): string {
  return o.node.name?.value ?? "UNKNOWN_OPERATION_NAME";
}

/**
 * Return the type of the operation
 */
export function printOperationType(o: SdkVisitorOperation): string {
  return o.node.operation;
}
