import { FieldDefinitionNode, UnionTypeDefinitionNode } from "graphql";
import { Named, PluginContext } from "./types";
import { reduceTypeName } from "./utils";

/**
 * Get the union type matching the field type
 */
export function findUnion(
  context: PluginContext,
  field?: FieldDefinitionNode | Named<FieldDefinitionNode>
): UnionTypeDefinitionNode | undefined {
  if (field) {
    const type = reduceTypeName(field.type);
    return context.unions.find(union => union.name.value === type);
  }
  return undefined;
}

/**
 * Get the member type names of a union type
 */
export function getUnionMemberTypes(union: UnionTypeDefinitionNode): string[] {
  return union.types?.map(type => type.name.value) || [];
}
