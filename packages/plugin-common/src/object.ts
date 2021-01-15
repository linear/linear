import { FieldDefinitionNode, ObjectTypeDefinitionNode } from "graphql";
import c from "./constants";
import { reduceTypeName } from "./field";
import { Named, NamedFields, PluginContext } from "./types";

/**
 * Get the object type matching the name arg
 */
export function findObject<C>(
  context: PluginContext<C>,
  field?: FieldDefinitionNode | Named<FieldDefinitionNode>
): ObjectTypeDefinitionNode | undefined {
  return field ? context.objects.find(o => o.name.value === reduceTypeName(field.type)) : undefined;
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
export function isOperationRoot<C>(
  context: PluginContext<C>,
  object?: ObjectTypeDefinitionNode | NamedFields<ObjectTypeDefinitionNode>
): boolean {
  return object ? Object.values(context.operationMap).includes(getObjectName(object)) : false;
}
