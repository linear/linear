import { Types } from "@graphql-codegen/plugin-helpers";
import {
  ClientSideBasePluginConfig,
  ClientSideBaseVisitor,
  DocumentMode,
  indentMultiline,
  LoadedFragment,
} from "@graphql-codegen/visitor-plugin-common";
import autoBind from "auto-bind";
import { GraphQLSchema, Kind, OperationDefinitionNode } from "graphql";
import { RawSdkPluginConfig } from "./config";

export interface SdkPluginConfig extends ClientSideBasePluginConfig {
  usingObservableFrom: string;
}

export interface SdkOperation {
  node: OperationDefinitionNode;
  documentVariableName: string;
  operationType: string;
  operationResultType: string;
  operationVariablesTypes: string;
}

const additionalExportedTypes = `
export type LinearSdkWrapper = <T>(action: () => Promise<T>) => Promise<T>;
`;

export class SdkVisitor extends ClientSideBaseVisitor<RawSdkPluginConfig, SdkPluginConfig> {
  private _operationsToInclude: SdkOperation[] = [];

  public constructor(
    schema: GraphQLSchema,
    fragments: LoadedFragment[],
    rawConfig: RawSdkPluginConfig,
    documents?: Types.DocumentFile[]
  ) {
    super(
      schema,
      fragments,
      rawConfig,
      {
        usingObservableFrom: rawConfig.usingObservableFrom,
      },
      documents
    );

    autoBind(this);

    if (this.config.usingObservableFrom) {
      this._additionalImports.push(this.config.usingObservableFrom);
    }

    if (this.config.documentMode !== DocumentMode.string) {
      const importType = this.config.useTypeImports ? "import type" : "import";
      this._additionalImports.push(`${importType} { DocumentNode } from 'graphql';`);
    }
  }

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

  private getActions() {
    const usingObservable = !!this.config.usingObservableFrom;

    return this._operationsToInclude.map(o => {
      const optionalVariables =
        !o.node.variableDefinitions ||
        o.node.variableDefinitions.length === 0 ||
        o.node.variableDefinitions.every(v => v.type.kind !== Kind.NON_NULL_TYPE || v.defaultValue);

      const returnType = usingObservable && o.operationType === "Subscription" ? "Observable" : "Promise";

      return `${o.node.name?.value ?? "UNKNOWN_NODE_NAME"}(variables${optionalVariables ? "?" : ""}: ${
        o.operationVariablesTypes
      }, options?: C): ${returnType}<LinearSdkResponse<${o.operationResultType}>> {
return withWrapper(linearSdkHandler(() => requester<${o.operationResultType}, ${o.operationVariablesTypes}>(${
        o.documentVariableName
      }, variables, options)));
}`;
    });
  }

  public get sdkContent(): string {
    const usingObservable = !!this.config.usingObservableFrom;
    const allPossibleActions = this.getActions().map(s => indentMultiline(s, 2));

    return `
${additionalExportedTypes}

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

export type Requester<C= {}> = <R, V>(doc: ${
      this.config.documentMode === DocumentMode.string ? "string" : "DocumentNode"
    }, vars?: V, options?: C) => ${usingObservable ? "Promise<R> & Observable<R>" : "Promise<R>"}

const defaultWrapper: LinearSdkWrapper = sdkFunction => sdkFunction();

export function createRawLinearSdk<C>(requester: Requester<C>, withWrapper: LinearSdkWrapper = defaultWrapper) {
  return {
${allPossibleActions.join(",\n")}
  };
}

export type Sdk = ReturnType<typeof createRawLinearSdk>;`;
  }
}
