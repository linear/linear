import { FieldDefinitionNode, ObjectTypeDefinitionNode, OperationTypeDefinitionNode } from "graphql";
import { reduceListType, reduceTypeName } from "./field";
import { isEdge, isOperationRoot } from "./object";
import { Named, NamedFields, PluginContext } from "./types";

/**
 * Get the fragment object type matching the name arg
 */
export function findFragment<C>(
  context: PluginContext<C>,
  field?: OperationTypeDefinitionNode | FieldDefinitionNode | Named<FieldDefinitionNode>
): NamedFields<ObjectTypeDefinitionNode> | undefined {
  return field && !reduceListType(field.type)
    ? context.fragments.find(o => o.name === reduceTypeName(field.type))
    : undefined;
}

/**
 * Check whether this fragment has valid content and is not a connection, edge or root
 */
export function isValidFragment<C>(
  context: PluginContext<C>,
  fragment: NamedFields<ObjectTypeDefinitionNode>
): boolean {
  const hasFields = (fragment.fields ?? []).filter(x => Boolean(x && x !== "cursor")).length;

  return Boolean(hasFields && !isEdge(fragment) && !isOperationRoot(context, fragment));
}
