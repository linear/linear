import { Types } from "@graphql-codegen/plugin-helpers";
import { ClientSideBaseVisitor, indentMultiline, LoadedFragment } from "@graphql-codegen/visitor-plugin-common";
import autoBind from "auto-bind";
import { concatAST, DocumentNode, GraphQLSchema, OperationDefinitionNode, visit } from "graphql";
import { RawSdkPluginConfig, SdkPluginConfig } from "./config";
import c from "./constants";
import { getOperation, SdkOperationDefinition } from "./operation";
import { printApiFunctionName, printApiFunctionType, printArgList } from "./print";
import { filterJoin } from "./utils";

/**
 * Definition of an operation for outputting an sdk function
 */
export interface SdkOperation {
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
  private _operationsToInclude: SdkOperation[] = [];
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
  }

  public getImports(): string[] {
    /** Do not add any additional imports */
    return [];
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
    /** For each operation get the function string content */
    const operations = filterJoin(
      this._operationsToInclude.map(o => getOperation(o, this.config)).map(s => indentMultiline(s, 2)),
      ",\n"
    );

    const args = printArgList([
      /** Add an initial id arg if in a nested api */
      this._chainKey ? `${c.ID_NAME}: string` : "",
      /** The requester function arg */
      `${c.REQUESTER_NAME}: ${c.REQUESTER_TYPE}<C>`,
      /** The wrapper function arg */
      `${c.WRAPPER_NAME}: ${c.WRAPPER_TYPE} = ${c.WRAPPER_DEFAULT_NAME}`,
    ]);

    const apiName = printApiFunctionName(this._chainKey);
    const apiType = printApiFunctionType(this._chainKey);
    return `
      export function ${apiName}<C>(${args}) {
        return {
          ${operations}
        };
      }
      
      export type ${apiType} = ReturnType<typeof ${apiName}>;
    `;
  }
}
