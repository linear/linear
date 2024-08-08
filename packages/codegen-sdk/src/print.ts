import { PluginContext, printList } from "@linear/codegen-doc";
import { Sdk } from "./constants";
import { SdkPluginConfig } from "./types";

/**
 * Prepend the import namespace if required
 */
export function printNamespaced(context: PluginContext<SdkPluginConfig>, name?: string): string {
  return context.config.documentFile ? printList([Sdk.NAMESPACE, name], ".") : (name ?? "UNNAMED_IMPORT");
}
