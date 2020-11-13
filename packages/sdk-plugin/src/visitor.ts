import { Types } from "@graphql-codegen/plugin-helpers";
import {
  ClientSideBasePluginConfig,
  ClientSideBaseVisitor,
  DocumentMode,
  indentMultiline,
  LoadedFragment,
  RawClientSideBasePluginConfig,
} from "@graphql-codegen/visitor-plugin-common";
import autoBind from "auto-bind";
import { GraphQLSchema, OperationDefinitionNode } from "graphql";
import { getSdkAction } from "./sdkAction";
import { getSdkFunction } from "./sdkFunction";
import { getSdkHandler } from "./sdkHandler";
import { getSdkWrapper } from "./sdkWrapper";

/**
 * Definition of an operation for outputting an sdk function
 */
export interface SdkOperation {
  /** The graphql node being processed */
  node: OperationDefinitionNode;
  /** The name of the generated graphql document */
  documentVariableName: string;
  /** The type of the graphql operation */
  operationType: string;
  /** The type of the result from the graphql operation */
  operationResultType: string;
  /** The type of the variables for the graphql operation */
  operationVariablesTypes: string;
}

/**
 * Default plugin config
 */
export type SdkPluginConfig = ClientSideBasePluginConfig;

/**
 * Graphql-codegen visitor for processing the ast
 */
export class SdkVisitor extends ClientSideBaseVisitor<RawClientSideBasePluginConfig, SdkPluginConfig> {
  private _operationsToInclude: SdkOperation[] = [];

  /**
   * Initialise the visitor
   */
  public constructor(
    schema: GraphQLSchema,
    fragments: LoadedFragment[],
    rawConfig: RawClientSideBasePluginConfig,
    documents?: Types.DocumentFile[]
  ) {
    super(schema, fragments, rawConfig, {}, documents);

    autoBind(this);

    /** Import DocumentNode type */
    if (this.config.documentMode !== DocumentMode.string) {
      const importType = this.config.useTypeImports ? "import type" : "import";
      this._additionalImports.push(`${importType} { DocumentNode } from 'graphql';`);
    }
  }

  /**
   * Record each operation to process later
   */
  protected buildOperation(
    node: OperationDefinitionNode,
    documentVariableName: string,
    operationType: string,
    operationResultType: string,
    operationVariablesTypes: string
  ): string {
    this._operationsToInclude.push({
      node,
      documentVariableName,
      operationType,
      operationResultType,
      operationVariablesTypes,
    });

    return "";
  }

  /**
   * Return the generated Linear sdk string content
   */
  public get sdkContent(): string {
    const sdkContent = this._operationsToInclude
      .map(getSdkAction)
      .map(s => indentMultiline(s, 2))
      .join(",\n");

    return `
      ${getSdkHandler()}

      ${getSdkWrapper()}

      ${getSdkFunction(sdkContent, this.config)}
    `;
  }
}
