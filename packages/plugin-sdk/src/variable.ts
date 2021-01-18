import { Kind, OperationDefinitionNode, VariableDefinitionNode } from "graphql";

/**
 * Is this variable a non null type
 */
export function isRequiredVariable(v: VariableDefinitionNode): boolean {
  return v.type.kind === Kind.NON_NULL_TYPE;
}

/**
 * Return all required variables for this node
 */
export function getRequiredVariables(node?: OperationDefinitionNode): VariableDefinitionNode[] {
  return node?.variableDefinitions?.filter(isRequiredVariable) ?? [];
}

/**
 * Return all optional variables for this node
 */
export function getOptionalVariables(node: OperationDefinitionNode): VariableDefinitionNode[] {
  return node.variableDefinitions?.filter(v => !isRequiredVariable(v)) ?? [];
}
