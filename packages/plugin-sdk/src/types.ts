import { ClientSideBasePluginConfig, RawClientSideBasePluginConfig } from "@graphql-codegen/visitor-plugin-common";
import { PluginContext } from "@linear/plugin-common";
import { OperationDefinitionNode } from "graphql";

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
   *       - @linear/plugin-sdk
   *     config:
   *       documentFile: "./sdk-documents"
   * ```
   */
  documentFile: string;
}

export interface SdkPluginConfig extends ClientSideBasePluginConfig {
  documentFile: string;
}

/**
 * Description for generating a chained api function
 */
export interface SdkOperation {
  /** The path through the schema to return this data */
  path: string[];
  /** The graphql node being processed with chain info added */
  node: OperationDefinitionNode;
  /** The name of the generated graphql document */
  documentVariableName?: string;
  /** The type of the graphql operation */
  operationType?: string;
  /** The type of the result from the graphql operation */
  operationResultType?: string;
  /** The type of the variables for the graphql operation */
  operationVariablesTypes?: string;
}

/**
 * A map from api path to a list of definitions for that path
 */
export type SdkDefinition = Record<string, SdkOperation[]>;

/**
 * Stateful context for sdk building information
 */
export interface SdkPluginContext extends PluginContext {
  /** The api key by which to nest the operations */
  apiPath: string[];
  /** The plugin config */
  config: RawSdkPluginConfig;
  /** All parsed api definitions */
  apiDefinitions: SdkDefinition;
  /** The list of api definitions to add to this api */
  definitions: SdkOperation[];
}
