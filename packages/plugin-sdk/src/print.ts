import { PluginContext, printList } from "@linear/plugin-common";
import { SdkPluginConfig } from "types";
import c from "./constants";

/**
 * Prepend the import namespace if required
 */
export function printNamespaced(context: PluginContext<SdkPluginConfig>, name?: string): string {
  return context.config.documentFile ? printList([c.NAMESPACE_DOCUMENT, name], ".") : name ?? "UNNAMED_IMPORT";
}
