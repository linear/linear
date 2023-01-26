import {
  FieldDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  OperationTypeDefinitionNode,
} from "graphql";
import { isEdge, isOperationRoot } from "./object";
import { printTypescriptType } from "./print";
import { Named, NamedFields, PluginContext } from "./types";

/**
 * Get the fragment object type matching the name arg
 */
export function findFragment(
  context: PluginContext,
  node?: OperationTypeDefinitionNode | FieldDefinitionNode | Named<FieldDefinitionNode>
): NamedFields<ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode> | undefined {
  if (node) {
    const type = printTypescriptType(context, node.type).replace("[]", "");
    return context.fragments.find(operation => operation.name === type);
  }
  return undefined;
}

/**
 * Check whether this object has valid content and is not a connection, edge, root or has a skip comment.
 */
export function isValidObject(context: PluginContext, fragment: NamedFields<ObjectTypeDefinitionNode>): boolean {
  const hasFields = (fragment.fields ?? []).filter(Boolean).length;
  const skipComment = context.config.skipComments?.some(comment => fragment.description?.value.includes(comment));
  return Boolean(hasFields && !isEdge(fragment) && !isOperationRoot(context, fragment) && !skipComment);
}
