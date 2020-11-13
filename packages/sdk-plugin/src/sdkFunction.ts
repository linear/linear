import { DocumentMode } from "@graphql-codegen/visitor-plugin-common";
import c from "./constants";
import { SdkPluginConfig } from "./visitor";

/**
 * Get the sdk function definition
 *
 * @param content the string to inject into the function wrapper
 * @param config the plugin config
 */
export function getSdkFunction(content: string, config: SdkPluginConfig): string {
  const docType = config.documentMode === DocumentMode.string ? "string" : "DocumentNode";

  return `
    export type ${c.REQUESTER_TYPE}<C = {}> = <R, V>(doc: ${docType}, ${c.VARIABLE_NAME}?: V, ${c.OPTIONS_NAME}?: C) => Promise<R>

    export function ${c.SDK_NAME}<C>(${c.REQUESTER_NAME}: ${c.REQUESTER_TYPE}<C>, ${c.WRAPPER_NAME}: ${c.WRAPPER_TYPE} = ${c.WRAPPER_DEFAULT_NAME}) {
      return {
        ${content}
      };
    }
    
    export type ${c.SDK_TYPE} = ReturnType<typeof ${c.SDK_NAME}>;
  `;
}
