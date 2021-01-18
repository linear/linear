import { printList } from "@linear/plugin-common";
import c from "./constants";
import { SdkPluginContext } from "./types";

/**
 * Prepend the import namespace if required
 */
export function printNamespaced(context: SdkPluginContext, name?: string): string {
  return context.config.documentFile ? printList([c.NAMESPACE_DOCUMENT, name], ".") : name ?? "UNNAMED_IMPORT";
}
