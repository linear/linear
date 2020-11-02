import { extname } from "path";
import { PluginFunction, PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { LoadedFragment, RawClientSideBasePluginConfig } from "@graphql-codegen/visitor-plugin-common";
import { concatAST, DocumentNode, FragmentDefinitionNode, GraphQLSchema, Kind, visit } from "graphql";
import { RawGenericSdkPluginConfig } from "./config";
import { GenericSdkVisitor } from "./visitor";

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export const plugin: PluginFunction<RawGenericSdkPluginConfig> = (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: RawGenericSdkPluginConfig
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
  const visitor = new GenericSdkVisitor(schema, allFragments, config);
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
    throw new Error(`Plugin "typescript-generic-sdk" requires extension to be ".ts"!`);
  }
};

export { GenericSdkVisitor };
