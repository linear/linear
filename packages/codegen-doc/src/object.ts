import { FieldDefinitionNode, InterfaceTypeDefinitionNode, ObjectTypeDefinitionNode } from "graphql";
import { Named, NamedFields, PluginContext } from "./types";
import { nodeHasSkipComment, reduceTypeName } from "./utils";

/**
 * Get the object type matching the name arg
 */
export function findObject(
  context: PluginContext,
  field?: FieldDefinitionNode | Named<FieldDefinitionNode>
): ObjectTypeDefinitionNode | undefined {
  if (field) {
    const type = reduceTypeName(field.type);
    return context.objects.find(operation => operation.name.value === type);
  }
  return undefined;
}

/**
 * Get the interface type matching the name arg
 */
export function findInterface(
  context: PluginContext,
  field?: FieldDefinitionNode | Named<FieldDefinitionNode>
): InterfaceTypeDefinitionNode | undefined {
  if (field) {
    const type = reduceTypeName(field.type);
    return context.interfaces.find(operation => operation.name.value === type);
  }
  return undefined;
}

/**
 * Get the string value of the object name
 */
export function getObjectName(
  object: ObjectTypeDefinitionNode | NamedFields<ObjectTypeDefinitionNode> | InterfaceTypeDefinitionNode | string
): string {
  return typeof object === "string" ? object : typeof object.name === "string" ? object.name : object.name.value;
}

/**
 * Is the object a connection type
 */
export function isConnection(
  object?: ObjectTypeDefinitionNode | NamedFields<ObjectTypeDefinitionNode> | InterfaceTypeDefinitionNode | string
): boolean {
  return object ? getObjectName(object).endsWith("Connection") : false;
}

/**
 * Is the object an edge type
 */
export function isEdge(
  object?: ObjectTypeDefinitionNode | NamedFields<ObjectTypeDefinitionNode> | InterfaceTypeDefinitionNode
): boolean {
  return object ? getObjectName(object).endsWith("Edge") : false;
}

/**
 * Is the object an operation root
 */
export function isOperationRoot(
  context: PluginContext,
  object?: ObjectTypeDefinitionNode | NamedFields<ObjectTypeDefinitionNode>
): boolean {
  return object ? Object.values(context.operationMap).includes(getObjectName(object)) : false;
}

/**
 * Determine whether the object is valid to be output
 *
 * Use config skipComments to skip fields with comments containing specific strings
 */
export function isValidObject(context: PluginContext, object?: ObjectTypeDefinitionNode): boolean {
  const skipComment = nodeHasSkipComment(context, object);

  const connection = isConnection(object);
  if (connection && object) {
    // Check the type of this connection is valid
    const rootTypeName = getObjectName(object).replace("Connection", "");
    return (
      !skipComment &&
      isValidObject(
        context,
        context.objects.find(obj => rootTypeName === obj.name.value)
      )
    );
  }

  return !skipComment;
}
