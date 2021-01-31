import { PluginContext, printList } from "@linear/common";
import { SdkPluginConfig } from "types";
import c from "./constants";

/**
 * Prepend the import namespace if required
 */
export function printNamespaced(context: PluginContext<SdkPluginConfig>, name?: string): string {
  return context.config.documentFile ? printList([c.NAMESPACE, name], ".") : name ?? "UNNAMED_IMPORT";
}
