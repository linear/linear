import { extname } from "path";
import { PluginFunction, PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { LoadedFragment, RawClientSideBasePluginConfig } from "@graphql-codegen/visitor-plugin-common";
import { concatAST, DocumentNode, FragmentDefinitionNode, GraphQLSchema, Kind, visit } from "graphql";
import { RawSdkPluginConfig } from "./config";
import { SdkVisitor } from "./visitor";

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export const plugin: PluginFunction<RawSdkPluginConfig> = (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: RawSdkPluginConfig
) => {
  const nodes = documents.reduce<DocumentNode[]>((prev, v) => {
    return [...prev, v.document].filter(nonNullable);
  }, []);

  const allAst = concatAST(nodes);

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

  const visitor = new SdkVisitor(schema, allFragments, config, documents);
  const visitorResult = visit(allAst, { leave: visitor });

  return {
    prepend: visitor.getImports(),
    content: [
      visitor.fragments,
      ...visitorResult.definitions.filter((t: unknown) => typeof t === "string"),
      visitor.sdkContent,
    ].join("\n"),
  };
};

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
