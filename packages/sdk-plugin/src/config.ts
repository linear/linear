import { ClientSideBasePluginConfig, RawClientSideBasePluginConfig } from "@graphql-codegen/visitor-plugin-common";

export interface RawSdkPluginConfig extends RawClientSideBasePluginConfig {
  /**
   * @description The relative filepath to generated documents
   *
   * @exampleMarkdown
   * ```yml
   * documents: "./src/documents/**"
   * generates:
   *   sdk-documents.ts:
   *     plugins:
   *       - typescript
   *       - typescript-operations
   *       - typed-document-node
   *   output-file.ts:
   *     plugins:
   *       - @linear/sdk-plugin
   *     config:
   *       documentFile: "./sdk-documents"
   * ```
   */
  documentFile: string;
}

export interface SdkPluginConfig extends ClientSideBasePluginConfig {
  documentFile: string;
}
