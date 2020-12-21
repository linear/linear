import { FieldDefinitionNode, ObjectTypeDefinitionNode } from "graphql";
import { getTypeName } from "./field";

/**
 * Get the object type matching the name arg
 */
export function findObject(
  objects: ObjectTypeDefinitionNode[],
  field?: FieldDefinitionNode
): ObjectTypeDefinitionNode | undefined {
  return field ? objects.find(o => o.name.value === getTypeName(field.type)) : undefined;
}
