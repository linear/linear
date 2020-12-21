import { FieldDefinitionNode, ObjectTypeDefinitionNode, OperationTypeDefinitionNode } from "graphql";
import { getTypeName } from "./field";
import { Fragment, NamedFields } from "./types";

/**
 * Get the fragment object type matching the name arg
 */
export function findFragment(
  fragments: Fragment[],
  field?: OperationTypeDefinitionNode | FieldDefinitionNode
): NamedFields<ObjectTypeDefinitionNode> | undefined {
  return field ? fragments.find(o => o.name === getTypeName(field.type)) : undefined;
}

/**
 * Print spreading of the fragment
 */

export function printOperationFragment(fragment: NamedFields<ObjectTypeDefinitionNode>): string {
  return `...${fragment.name}`;
}
