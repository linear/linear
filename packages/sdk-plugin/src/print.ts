import { filterJoin } from "@linear/common";
import { SdkPluginConfig } from "./config";
import c from "./constants";
import { SdkVisitorOperation } from "./sdk-visitor";

/**
 * Prepend the import namespace if required
 */
export function printNamespaced(config: SdkPluginConfig, name: string): string {
  return config.documentFile ? filterJoin([c.NAMESPACE_DOCUMENT, name], ".") : name;
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
