import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import { SdkPluginConfig } from "./config";
import c from "./constants";
import { filterJoin, upperFirst } from "./utils";
import { SdkOperation } from "./visitor";

/**
 * Return the name of the sdk function scoped to the api key
 */
export function printApiFunctionName(chainKey?: string): string {
  return `${c.SDK_NAME}${upperFirst(chainKey)}`;
}

/**
 * Return the type of the sdk function scoped to the api key
 */
export function printApiFunctionType(chainKey?: string): string {
  return `${c.SDK_TYPE}${upperFirst(chainKey)}`;
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

/**
 * Return the name of a scalar
 */
export function printScalar(scalar: string): string {
  if (DEFAULT_SCALARS[scalar] === undefined) {
    return scalar;
  }

  return DEFAULT_SCALARS[scalar];
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
export function printOperationName(o: SdkOperation): string {
  return o.node.name?.value ?? "UNKNOWN_OPERATION_NAME";
}

/**
 * Return the type of the operation
 */
export function printOperationType(o: SdkOperation): string {
  return o.node.operation;
}
