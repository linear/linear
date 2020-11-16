import { SdkPluginConfig } from "./config";
import c from "./constants";

/**
 * Type safe check for non defined values
 */
export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

/**
 * Print debug information if in development environment
 */
export function debug(namespace: string, ...args: unknown[]): void {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(namespace, ...args.map(a => (typeof a === "object" ? JSON.stringify(a, null, 2) : a)));
  }
}

/**
 * Capitalize the first character in a string
 */
export function upperFirst(s?: string): string {
  return s ? `${s.charAt(0).toUpperCase()}${s.slice(1)}` : "";
}

/**
 * Lowercase the first character in a string
 */
export function lowerFirst(s?: string): string {
  return s ? `${s.charAt(0).toLowerCase()}${s.slice(1)}` : "";
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

/**
 * Filter a list of strings and join into a single string
 */
export function filterJoin(a: (string | undefined)[], joinString: string): string {
  return a.filter(Boolean).join(joinString);
}
