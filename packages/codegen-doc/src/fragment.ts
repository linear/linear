import {
  FieldDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  OperationTypeDefinitionNode,
} from "graphql";
import { getObjectName, isConnection, isEdge, isOperationRoot, isValidObject } from "./object";
import { printTypescriptType } from "./print";
import { Named, NamedFields, PluginContext } from "./types";
import { nodeHasSkipComment } from "./utils";

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
 * Check whether this fragment has valid content and is not a connection, edge, root or has a skip comment.
 */
export function isValidFragment(context: PluginContext, fragment: NamedFields<ObjectTypeDefinitionNode>): boolean {
  const hasFields = (fragment.fields ?? []).filter(Boolean).length;
  const skipComment = nodeHasSkipComment(context, fragment);
  const isValid = Boolean(hasFields && !isEdge(fragment) && !isOperationRoot(context, fragment) && !skipComment);

  const connection = isConnection(fragment);
  if (connection) {
    // Check the type of this connection is valid
    const rootTypeName = getObjectName(fragment).replace("Connection", "");
    const object = context.objects.find(obj => rootTypeName === obj.name.value);
    return isValid && isValidObject(context, object);
  }

  return isValid;
}
