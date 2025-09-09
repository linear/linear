import { printLines } from "@linear/codegen-doc";
import { SdkPluginContext } from "./types";

/**
 * Print enum re-exports for direct import from the SDK
 */
export function printEnumExports(context: SdkPluginContext): string {
  if (context.enums.length === 0) {
    return "";
  }

  const enumNames = context.enums.map(enumDef => enumDef.name.value).sort();

  return printLines([`export {`, ...enumNames.map(name => `  ${name},`), `} from '${context.config.documentFile}';`]);
}
