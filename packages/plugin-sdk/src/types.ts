import { ClientSideBasePluginConfig, RawClientSideBasePluginConfig } from "@graphql-codegen/visitor-plugin-common";
import { ArgDefinition, PluginContext } from "@linear/plugin-common";
import { FieldDefinitionNode, OperationDefinitionNode } from "graphql";

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
 * Definition for generating an sdk operation
 */
export interface SdkOperation {
  /** The name of this operation */
  name: string;
  /** The path through the schema to return this data */
  path: string[];
  /** The graphql node being processed with chain info added */
  node: OperationDefinitionNode;
  /** The parsed and printed required variables */
  requiredVariables: Record<string, ArgDefinition>;
  /** The name of the generated graphql document */
  documentVariableName?: string;
  /** The type of the graphql operation */
  operationType?: string;
  /** The type of the result from the graphql operation */
  operationResultType?: string;
  /** The type of the variables for the graphql operation */
  operationVariablesTypes?: string;
  /** The type returned from this operation */
  returnType: string;
}

/**
 * A pairing between an operation field and the definitions corresponding to the field
 */
export interface SdkOperationObject {
  /** The operation field node */
  field: FieldDefinitionNode;
  /** The matching sdk definition */
  definition: SdkDefinition;
  /** The matching query definition */
  queryDefinition: SdkOperation;
}

/**
 * Definition for generating an sdk
 */
export interface SdkDefinition {
  /** The api keys by which to nest operations */
  sdkPath: string[];
  /** The name of the sdk function */
  sdkName: string;
  /** The name of the sdk function type */
  sdkType: string;
  /** The operations to generate */
  operations: SdkOperation[];
}

/**
 * A map from api key to each sdk definition
 */
export type SdkDefinitions = Record<string, SdkDefinition>;

/**
 * The plugin context specific to the sdk plugin config
 */
export interface SdkPluginContext extends PluginContext<RawSdkPluginConfig> {
  /** All definitions for the sdk */
  sdkDefinitions: SdkDefinitions;
}
