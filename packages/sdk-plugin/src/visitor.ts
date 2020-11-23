import { Types } from "@graphql-codegen/plugin-helpers";
import { ClientSideBaseVisitor, indentMultiline, LoadedFragment } from "@graphql-codegen/visitor-plugin-common";
import autoBind from "auto-bind";
import { concatAST, DocumentNode, GraphQLSchema, OperationDefinitionNode, visit } from "graphql";
import { printApiFunction, printApiFunctionName, printApiFunctionType } from "./api";
import { RawSdkPluginConfig, SdkPluginConfig } from "./config";
import { printOperation, SdkOperationDefinition } from "./operation";
import { debug, filterJoin } from "./utils";

/**
 * Definition of an operation for outputting an sdk function
 */
export interface SdkVisitorOperation {
  /** The graphql node being processed with chain info added */
  node: SdkOperationDefinition;
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
 * Initialise and process a vistor for each node in the documents
 */
export function createVisitor(
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  documentNodes: DocumentNode[],
  fragments: LoadedFragment[],
  config: RawSdkPluginConfig,
  chainKey?: string
): {
  ast: DocumentNode;
  visitor: SdkVisitor;
  result: {
    fragments: string;
    definitions: unknown[];
  };
} {
  /** Ensure the documents validate as a single application */
  const ast = concatAST(documentNodes);

  /** Create an ast visitor configured with the plugin input */
  const visitor = new SdkVisitor(schema, fragments, config, documents, chainKey);

  /** Process each node of the ast with the visitor */
  const result = visit(ast, { leave: visitor });

  return {
    ast,
    visitor,
    result,
  };
}

/**
 * Graphql-codegen visitor for processing the ast
 *
 * @param name the name of the function
 * @param type the name of the type of the function
 * @param initialArgs any additional args to be used at the start of the function definition
 * @param schema the graphql schema to validate against
 * @param fragments graphql fragments
 * @param rawConfig the plugin config
 * @param documents the list of graphql operations
 */
export class SdkVisitor extends ClientSideBaseVisitor<RawSdkPluginConfig, SdkPluginConfig> {
  private _operationsToInclude: SdkVisitorOperation[] = [];
  private _apiName: string;
  private _apiType: string;
  private _chainKey: string | undefined;

  /**
   * Initialise the visitor
   */
  public constructor(
    schema: GraphQLSchema,
    fragments: LoadedFragment[],
    rawConfig: RawSdkPluginConfig,
    documents?: Types.DocumentFile[],
    chainKey?: string
  ) {
    super(
      schema,
      fragments,
      rawConfig,
      {
        typeFile: rawConfig.typeFile,
        documentFile: rawConfig.documentFile,
      },
      documents
    );
    autoBind(this);

    this._chainKey = chainKey;
    this._apiName = printApiFunctionName(chainKey);
    this._apiType = printApiFunctionType(chainKey);
    debug(chainKey ?? "root", "apiName", this._apiName);
    debug(chainKey ?? "root", "apiType", this._apiType);
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
      node: (node as unknown) as SdkOperationDefinition,
      documentVariableName,
      operationType,
      operationResultType,
      operationVariablesTypes,
    });

    return "";
  }

  /**
   * Return the generated sdk string content
   */
  public get sdkContent(): string {
    debug(this._chainKey ?? "root", "operations", this._operationsToInclude.length);

    /** For each operation get the function string content */
    const content = filterJoin(
      this._operationsToInclude.map(o => printOperation(o, this.config)).map(s => indentMultiline(s, 2)),
      ",\n"
    );

    /** Return the api  */
    return printApiFunction(content, this._chainKey);
  }
}
