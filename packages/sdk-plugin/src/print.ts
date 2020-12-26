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
export function printOperationName(o: OperationDefinitionNode): string {
  return o.name?.value ?? "UNKNOWN_OPERATION_NAME";
}

/**
 * Return the type of the operation
 */
export function printOperationType(o: OperationDefinitionNode): string {
  return o.operation;
}
