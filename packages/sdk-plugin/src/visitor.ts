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
import { GraphQLSchema, Kind, OperationDefinitionNode } from "graphql";

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
 * Graphql-codegen visitor for processing the ast
 */
export class SdkVisitor extends ClientSideBaseVisitor<RawClientSideBasePluginConfig, ClientSideBasePluginConfig> {
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
   * Any types required by the generated sdk
   */
  private getSdkTypes(): string {
    return `
export type LinearSdkWrapper = <T>(action: () => Promise<T>) => Promise<T>;

export enum LinearSdkStatus {
  "success" = "success",
  "error" = "error",
}

export interface LinearSdkResponse<T> {
  status: LinearSdkStatus;
  data?: T;
  error?: Error;
}

export type LinearSdkHandler<T> = () => Promise<LinearSdkResponse<T>>;

export type Requester<C= {}> = <R, V>(doc: ${
      this.config.documentMode === DocumentMode.string ? "string" : "DocumentNode"
    }, vars?: V, options?: C) => Promise<R>
`;
  }

  /**
   * Catch and handle any errors from the sdk function
   */
  private getSdkErrorHandler(): string {
    return `
      export function linearSdkHandler<T>(sdkFunction: () => Promise<T>): LinearSdkHandler<T> {
        return async function handler() {
          try {
            const response = await sdkFunction();
            return {
              status: LinearSdkStatus.success,
              data: response,
            };
          } catch (error) {
            return {
              status: LinearSdkStatus.error,
              error,
            };
          }
        };
      }
      `;
  }

  /**
   * Process each operation and return a generated sdk function
   */
  private getSdkActions() {
    return this._operationsToInclude.map(o => {
      const optionalVariables =
        !o.node.variableDefinitions ||
        o.node.variableDefinitions.length === 0 ||
        o.node.variableDefinitions.every(v => v.type.kind !== Kind.NON_NULL_TYPE || v.defaultValue);

      const functionName = o.node.name?.value ?? "UNKNOWN_NODE_NAME";
      const variableType = o.operationVariablesTypes;
      const argDefinition = `variables${optionalVariables ? "?" : ""}: ${variableType}`;
      const resultType = o.operationResultType;
      const documentName = o.documentVariableName;

      /** Build a function for this graphql operation */
      return `${functionName}(${argDefinition}, options?: C): Promise<LinearSdkResponse<${resultType}>> {
  return withWrapper(linearSdkHandler(() => requester<${resultType}, ${variableType}>(${documentName}, variables, options)));
}`;
    });
  }

  /**
   * Return the generated Linear sdk string content
   */
  public get sdkContent(): string {
    return `
${this.getSdkTypes()}

${this.getSdkErrorHandler()}

const defaultWrapper: LinearSdkWrapper = sdkFunction => sdkFunction();

export function createRawLinearSdk<C>(requester: Requester<C>, withWrapper: LinearSdkWrapper = defaultWrapper) {
  return {
${this.getSdkActions()
  .map(s => indentMultiline(s, 2))
  .join(",\n")}
  };
}

export type Sdk = ReturnType<typeof createRawLinearSdk>;`;
  }
}
