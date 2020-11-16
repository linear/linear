import { ClientSideBasePluginConfig, RawClientSideBasePluginConfig } from "@graphql-codegen/visitor-plugin-common";

export interface RawSdkPluginConfig extends RawClientSideBasePluginConfig {
  /**
   * @description The relative filepath to generated types
   *
   * @exampleMarkdown
   * ```yml
   * documents: "./src/documents/**"
   * generates:
   *   sdk-types.ts:
   *     plugins:
   *       - typescript
   *       - typescript-operations
   *   output-file.ts:
   *     plugins:
   *       - @linear/sdk-plugin
   *     config:
   *       typeFile: "./sdk-types"
   * ```
   */
  typeFile: string;

  /**
   * @description The relative filepath to generated documents
   *
   * @exampleMarkdown
   * ```yml
   * documents: "./src/documents/**"
   * generates:
   *   sdk-documents.ts:
   *     plugins:
   *       - typescript-document-nodes
   *     config:
   *       nameSuffix: "Document"
   *   output-file.ts:
   *     plugins:
   *       - @linear/sdk-plugin
   *     config:
   *       documentFile: "./sdk-documents"
   * ```
   */
  documentFile: string;

  /**
   * @description An object mapping a field key to the graphql files used to create a nested api
   *
   * @exampleMarkdown
   * ```yml
   * documents: "./src/documents/**"
   * generates:
   *   output-file.ts:
   *     plugins:
   *       - @linear/sdk-plugin
   *     config:
   *       nestedApiKeys:
   *         - team
   *         - issue
   * ```
   */
  nestedApiKeys?: string[];
}

export interface SdkPluginConfig extends ClientSideBasePluginConfig {
  typeFile: string;
  documentFile: string;
  nestedApiKeys?: string[];
}
