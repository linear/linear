import { Kind, OperationDefinitionNode, VariableDefinitionNode } from "graphql";
import { sortBy } from "./utils";

/**
 * Is this variable a non null type
 */
export function isRequiredVariable(variable: VariableDefinitionNode): boolean {
  return variable.type.kind === Kind.NON_NULL_TYPE;
}

/**
 * Return all required variables for this node
 */
export function getRequiredVariables(operation?: OperationDefinitionNode): VariableDefinitionNode[] {
  return sortBy("variable.name.value", operation?.variableDefinitions?.filter(isRequiredVariable));
}

/**
 * Return all optional variables for this node
 */
export function getOptionalVariables(operation: OperationDefinitionNode): VariableDefinitionNode[] {
  return sortBy(
    "variable.name.value",
    operation.variableDefinitions?.filter(variable => !isRequiredVariable(variable))
  );
}
