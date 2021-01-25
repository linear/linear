import { FieldDefinitionNode, ObjectTypeDefinitionNode, OperationTypeDefinitionNode } from "graphql";
import { isEdge, isOperationRoot } from "./object";
import { printTypescriptType } from "./print";
import { Named, NamedFields, PluginContext } from "./types";

/**
 * Get the fragment object type matching the name arg
 */
export function findFragment(
  context: PluginContext,
  node?: OperationTypeDefinitionNode | FieldDefinitionNode | Named<FieldDefinitionNode>
): NamedFields<ObjectTypeDefinitionNode> | undefined {
  if (node) {
    const type = printTypescriptType(context, node.type);
    return context.fragments.find(operation => operation.name === type);
  }
  return undefined;
}

/**
 * Check whether this fragment has valid content and is not a connection, edge or root
 */
export function isValidFragment(context: PluginContext, fragment: NamedFields<ObjectTypeDefinitionNode>): boolean {
  const hasFields = (fragment.fields ?? []).filter(Boolean).length;
  return Boolean(hasFields && !isEdge(fragment) && !isOperationRoot(context, fragment));
}
