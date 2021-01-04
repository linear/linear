import { FieldDefinitionNode, ObjectTypeDefinitionNode, OperationTypeDefinitionNode } from "graphql";
import { getTypeName } from "./field";
import { isConnection, isEdge, isOperationRoot } from "./object";
import { Fragment, NamedFields, PluginContext } from "./types";

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

/**
 * Check whether this fragment has valid content and is not a connection, edge or root
 */
export function isValidFragment(context: PluginContext, fragment: NamedFields<ObjectTypeDefinitionNode>): boolean {
  const hasFields = (fragment.fields ?? []).filter(x => Boolean(x && x !== "cursor")).length;

  return Boolean(hasFields && !isConnection(fragment) && !isEdge(fragment) && !isOperationRoot(context, fragment));
}
