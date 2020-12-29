import { FieldDefinitionNode, ObjectTypeDefinitionNode } from "graphql";
import c from "./constants";
import { getTypeName } from "./field";
import { DocVisitorContext, Named, NamedFields } from "./types";

/**
 * Get the object type matching the name arg
 */
export function findObject(
  objects: ObjectTypeDefinitionNode[],
  field?: FieldDefinitionNode | Named<FieldDefinitionNode>
): ObjectTypeDefinitionNode | undefined {
  return field ? objects.find(o => o.name.value === getTypeName(field.type)) : undefined;
}

/**
 * Get the string value of the object name
 */
export function getObjectName(object: ObjectTypeDefinitionNode | NamedFields<ObjectTypeDefinitionNode>): string {
  return typeof object.name === "string" ? object.name : object.name.value;
}

/**
 * Is the object a connection type
 */
export function isConnection(object?: ObjectTypeDefinitionNode | NamedFields<ObjectTypeDefinitionNode>): boolean {
  return object ? getObjectName(object).endsWith(c.CONNECTION_TYPE) : false;
}

/**
 * Is the object an edge type
 */
export function isEdge(object?: ObjectTypeDefinitionNode | NamedFields<ObjectTypeDefinitionNode>): boolean {
  return object ? getObjectName(object).endsWith(c.EDGE_TYPE) : false;
}

/**
 * Is the object an operation root
 */
export function isOperationRoot(
  context: DocVisitorContext,
  object?: ObjectTypeDefinitionNode | NamedFields<ObjectTypeDefinitionNode>
): boolean {
  return object ? Object.values(context.operationMap).includes(getObjectName(object)) : false;
}
