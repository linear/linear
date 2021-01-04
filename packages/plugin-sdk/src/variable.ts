import { Kind, OperationDefinitionNode, VariableDefinitionNode } from "graphql";
import c from "./constants";
import { SdkOperation } from "./types";

/**
 * Does the operation have optional variables
 */
export function hasOptionalVariable(o: SdkOperation): boolean {
  return (
    !o.node.variableDefinitions ||
    o.node.variableDefinitions.length === 0 ||
    o.node.variableDefinitions.every(
      v => (o.path.length ? isIdVariable(v) : false) || !isRequiredVariable(v) || v.defaultValue
    )
  );
}

/**
 * Does the operation have a variable that matches the arg
 */
export function hasVariable(o: SdkOperation, variableName: string): boolean {
  return Boolean(o.node.variableDefinitions?.some(v => v.variable.name.value === variableName));
}

/**
 * Does the operation have a variable other than the arg
 */
export function hasOtherVariable(o: SdkOperation, variableName: string): boolean {
  return Boolean(o.node.variableDefinitions?.some(v => v.variable.name.value !== variableName));
}

/**
 * Is the variable named id and is it required
 */
export function isIdVariable(v: VariableDefinitionNode): boolean {
  return v.variable.name.value === c.ID_NAME && isRequiredVariable(v);
}

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
