import { PluginFunction, PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { LoadedFragment, RawClientSideBasePluginConfig } from "@graphql-codegen/visitor-plugin-common";
import { concatAST, DocumentNode, FragmentDefinitionNode, GraphQLSchema, Kind, visit } from "graphql";
import { extname } from "path";
import { nonNullable } from "utils";
import { SdkVisitor } from "./visitor";

/**
 * Graphql-codegen plugin for outputting the typed Linear sdk
 */
export const plugin: PluginFunction<RawClientSideBasePluginConfig> = (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: RawClientSideBasePluginConfig
) => {
  /** Get list of all document notes */
  const nodes = documents.reduce<DocumentNode[]>((prev, v) => {
    return [...prev, v.document].filter(nonNullable);
  }, []);

  /** Ensure the nodes validate as a single application */
  const allAst = concatAST(nodes);

  /** Get a list of all fragment definitions */
  const allFragments: LoadedFragment[] = [
    ...(allAst.definitions.filter(d => d.kind === Kind.FRAGMENT_DEFINITION) as FragmentDefinitionNode[]).map(
      fragmentDef => ({
        node: fragmentDef,
        name: fragmentDef.name.value,
        onType: fragmentDef.typeCondition.name.value,
        isExternal: false,
      })
    ),
    ...(config.externalFragments || []),
  ];

  /** Create an ast visitor configured with the plugin input */
  const visitor = new SdkVisitor(schema, allFragments, config, documents);

  /** Process each node of the ast with the visitor */
  const visitorResult = visit(allAst, { leave: visitor });

  return {
    /** Add any initial imports */
    prepend: visitor.getImports(),
    content: [
      /** Write the list of fragments */
      visitor.fragments,
      /** Write the list of string definitions */
      ...visitorResult.definitions.filter((t: unknown) => typeof t === "string"),
      /** Write the sdk function */
      visitor.sdkContent,
    ].join("\n"),
  };
};

/** Validate use of the plugin */
export const validate: PluginValidateFn = async (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: RawClientSideBasePluginConfig,
  outputFile: string
) => {
  if (extname(outputFile) !== ".ts") {
    throw new Error(`Plugin "@linear/sdk-plugin" requires extension to be ".ts"!`);
  }
};

export { SdkVisitor };
