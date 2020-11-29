import { Kind, VariableDefinitionNode } from "graphql";
import c from "./constants";
import { getChainChildKey } from "./operation";
import { SdkVisitorOperation } from "./sdk-visitor";

/**
 * Does the operation have optional variables
 */
export function hasOptionalVariable(o: SdkVisitorOperation): boolean {
  const isChainChild = getChainChildKey(o);
  return (
    !o.node.variableDefinitions ||
    o.node.variableDefinitions.length === 0 ||
    o.node.variableDefinitions.every(
      v => (isChainChild ? isIdVariable(v) : false) || !isRequiredVariable(v) || v.defaultValue
    )
  );
}

/**
 * Does the operation have a variable that matches the arg
 */
export function hasVariable(o: SdkVisitorOperation, variableName: string): boolean {
  return Boolean(o.node.variableDefinitions?.some(v => v.variable.name.value === variableName));
}

/**
 * Does the operation have a variable other than the arg
 */
export function hasOtherVariable(o: SdkVisitorOperation, variableName: string): boolean {
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
