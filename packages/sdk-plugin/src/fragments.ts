import { LoadedFragment } from "@graphql-codegen/visitor-plugin-common";
import { DocumentNode, FragmentDefinitionNode, Kind } from "graphql";
import { RawSdkPluginConfig } from "./types";

/*
 * Get a list of all fragment definitions
 */
export function getFragmentsFromAst(ast: DocumentNode, config: RawSdkPluginConfig): LoadedFragment[] {
  return [
    ...(ast.definitions.filter(d => d.kind === Kind.FRAGMENT_DEFINITION) as FragmentDefinitionNode[]).map(
      fragmentDef => ({
        node: fragmentDef,
        name: fragmentDef.name.value,
        onType: fragmentDef.typeCondition.name.value,
        isExternal: false,
      })
    ),
    ...(config.externalFragments || []),
  ];
}
