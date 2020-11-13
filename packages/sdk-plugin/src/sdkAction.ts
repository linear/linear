import { Kind } from "graphql";
import c from "./constants";
import { SdkOperation } from "./visitor";

/**
 * Does the operation have optional variables
 */
function isVariableOptional(o: SdkOperation): boolean {
  return (
    !o.node.variableDefinitions ||
    o.node.variableDefinitions.length === 0 ||
    o.node.variableDefinitions.every(v => v.type.kind !== Kind.NON_NULL_TYPE || v.defaultValue)
  );
}

/**
 * Does the operation have an id variable
 */
function hasIdVariable(o: SdkOperation): boolean {
  return Boolean(o.node.variableDefinitions?.some(v => v.variable.name.value === c.ID_KEY));
}

/**
 * Does the operation have a non-id variable
 */
function hasNonIdVariable(o: SdkOperation): boolean {
  return Boolean(o.node.variableDefinitions?.some(v => v.variable.name.value !== c.ID_KEY));
}

/**
 * Get the sdk function args from the operation variables
 */
function getVariableArgs(o: SdkOperation): string {
  const variableType = o.operationVariablesTypes;
  const optional = isVariableOptional(o) ? "?" : "";

  if (hasIdVariable(o)) {
    /** Handle id variables separately by making them the first arg */
    if (hasNonIdVariable(o)) {
      return `${c.ID_KEY}: ${c.ID_TYPE}, ${c.VARIABLE_NAME}${optional}: Omit<${variableType}, '${c.ID_KEY}'>`;
    } else {
      return `${c.ID_KEY}: ${c.ID_TYPE}`;
    }
  } else {
    return `${c.VARIABLE_NAME}${optional}: ${variableType}`;
  }
}

/**
 * Get the requester args from the operation variables
 */
function getRequesterArgs(o: SdkOperation): string {
  if (hasIdVariable(o)) {
    /** Merge id variable into requester variables */
    if (hasNonIdVariable(o)) {
      return `{${c.ID_KEY}, ...${c.VARIABLE_NAME}}`;
    } else {
      return `{${c.ID_KEY}}`;
    }
  } else {
    return c.VARIABLE_NAME;
  }
}

/**
 * Get the sdk action function body
 */
function getActionBody(o: SdkOperation): string {
  const variableType = o.operationVariablesTypes;
  const resultType = o.operationResultType;
  const documentName = o.documentVariableName;

  return `return ${c.WRAPPER_NAME}(${c.HANDLER_NAME}(() => ${
    c.REQUESTER_NAME
  }<${resultType}, ${variableType}>(${documentName}, ${getRequesterArgs(o)}, ${c.OPTIONS_NAME})));`;
}

/**
 * Process a graphql operation and return a generated sdk function string
 */
export function getSdkAction(o: SdkOperation): string {
  const functionName = o.node.name?.value ?? "UNKNOWN_NODE_NAME";
  const resultType = o.operationResultType;

  /** Build a function for this graphql operation */
  return `
    ${functionName}(${getVariableArgs(o)}, ${c.OPTIONS_NAME}?: C): Promise<${c.RESPONSE_TYPE}<${resultType}>> {
      ${getActionBody(o)}
    }
  `;
}
