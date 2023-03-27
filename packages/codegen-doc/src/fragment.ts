import {
  FieldDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  OperationTypeDefinitionNode,
} from "graphql";
import { getObjectName, isConnection, isEdge, isOperationRoot } from "./object";
import { printTypescriptType } from "./print";
import { Fragment, Named, NamedFields, PluginContext } from "./types";

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
export function isValidObject(
  context: PluginContext,
  fragment: NamedFields<ObjectTypeDefinitionNode>,
  previousFragments: Fragment[]
): boolean {
  const hasFields = (fragment.fields ?? []).filter(Boolean).length;
  const skipComment = context.config.skipComments?.some(comment => fragment.description?.value.includes(comment));
  const skip = Boolean(hasFields && !isEdge(fragment) && !isOperationRoot(context, fragment) && !skipComment);

  const connection = isConnection(fragment);
  if (connection) {
    // Check we have accepted a fragment for the type of this connection
    const rootTypeName = getObjectName(fragment).replace("Connection", "");
    const hasSkippedRootType = !previousFragments.some(f => f.name === rootTypeName);
    if (hasSkippedRootType) {
      return false;
    }
  }

  return skip;
}
