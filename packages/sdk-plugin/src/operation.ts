import { SdkPluginConfig } from "config";
import { Kind } from "graphql";
import c, { getApiFunctionName, getApiFunctionType } from "./constants";
import { lowerFirst, printArgList, printNamespacedDocument, printNamespacedType } from "./utils";
import { SdkOperation } from "./visitor";

/**
 * Does the operation have optional variables
 */
function isVariableOptional(o: SdkOperation): boolean {
  return (
    !o.node.variableDefinitions ||
    o.node.variableDefinitions.length === 0 ||
    o.node.variableDefinitions.every(
      v => v.variable.name.value === c.ID_NAME || v.type.kind !== Kind.NON_NULL_TYPE || v.defaultValue
    )
  );
}

/**
 * Does the operation have a variable that matches the arg
 */
function hasVariable(o: SdkOperation, variableName: string): boolean {
  return Boolean(o.node.variableDefinitions?.some(v => v.variable.name.value === variableName));
}

/**
 * Does the operation have a variable other than the arg
 */
function hasOtherVariable(o: SdkOperation, variableName: string): boolean {
  return Boolean(o.node.variableDefinitions?.some(v => v.variable.name.value !== variableName));
}

/**
 * Get the operation args from the operation variables
 */
function getVariableArgs(o: SdkOperation, config: SdkPluginConfig, nestedApiKey?: string): string {
  const variableType = printNamespacedType(config, o.operationVariablesTypes);
  const optional = isVariableOptional(o) ? "?" : "";

  if (hasVariable(o, c.ID_NAME)) {
    /** Handle id variables separately by making them the first arg */
    if (hasOtherVariable(o, c.ID_NAME)) {
      /** If we are nested do not add the id arg as it comes from the function scope */
      if (nestedApiKey) {
        return `${c.VARIABLE_NAME}${optional}: Omit<${variableType}, '${c.ID_NAME}'>`;
      } else {
        return `${c.ID_NAME}: ${c.ID_TYPE}, ${c.VARIABLE_NAME}${optional}: Omit<${variableType}, '${c.ID_NAME}'>`;
      }
    } else {
      if (nestedApiKey) {
        return "";
      } else {
        return `${c.ID_NAME}: ${c.ID_TYPE}`;
      }
    }
  } else {
    return `${c.VARIABLE_NAME}${optional}: ${variableType}`;
  }
}

/**
 * Get the requester args from the operation variables
 */
function getRequesterArgs(o: SdkOperation): string {
  if (hasVariable(o, c.ID_NAME)) {
    /** Merge id variable into requester variables */
    if (hasOtherVariable(o, c.ID_NAME)) {
      return `{${c.ID_NAME}, ...${c.VARIABLE_NAME}}`;
    } else {
      return `{${c.ID_NAME}}`;
    }
  } else {
    return c.VARIABLE_NAME;
  }
}

/**
 * Get the sdk action operation body
 */
function getOperationBody(o: SdkOperation, config: SdkPluginConfig, apiKeyToNest?: string): string {
  const variableType = printNamespacedType(config, o.operationVariablesTypes);
  const resultType = printNamespacedType(config, o.operationResultType);
  const documentName = printNamespacedDocument(config, o.documentVariableName);
  const callRequester = `${c.WRAPPER_NAME}(${c.HANDLER_NAME}(() => ${
    c.REQUESTER_NAME
  }<${resultType}, ${variableType}>(${documentName}, ${getRequesterArgs(o)}, ${c.OPTIONS_NAME})));`;

  /** If this is a nested api create the api and return it with the response */
  if (apiKeyToNest) {
    return `
      const response = await ${callRequester}
      return {
        ...response,
        ...${getApiFunctionName(apiKeyToNest)}(${c.ID_NAME}, ${c.REQUESTER_NAME}, ${c.WRAPPER_NAME}),
      }
    `;
  } else {
    return `return ${callRequester}`;
  }
}

/**
 * Get the name of the operation
 * Nested apis have the initial nesting key removed from the name
 */
export function getOperationName(o: SdkOperation, nestedApiKey?: string): string {
  const nodeName = o.node.name?.value ?? "UNKNOWN_NODE_NAME";

  return nestedApiKey ? lowerFirst(nodeName.replace(new RegExp(`^${nestedApiKey}`, "i"), "")) : nodeName;
}

/**
 * Get the result type of the operation
 * Nested apis have the relevant nested api return type added
 */
function getOperationResultType(o: SdkOperation, config: SdkPluginConfig, apiKeyToNest?: string) {
  const resultType = printNamespacedType(config, o.operationResultType);

  if (apiKeyToNest) {
    return `Promise<${c.RESPONSE_TYPE}<${resultType}> & ${getApiFunctionType(apiKeyToNest)}>`;
  } else {
    return `Promise<${c.RESPONSE_TYPE}<${resultType}>>`;
  }
}

/**
 * Process a graphql operation and return a generated operation string
 */
export function getOperation(o: SdkOperation, config: SdkPluginConfig, nestedApiKey?: string): string {
  const operationName = getOperationName(o, nestedApiKey);
  const args = printArgList([getVariableArgs(o, config, nestedApiKey), `${c.OPTIONS_NAME}?: C`]);
  const apiKeyToNest = config.nestedApiKeys?.find(apiKey => o.node.name?.value === apiKey);
  const returnType = getOperationResultType(o, config, apiKeyToNest);
  const content = getOperationBody(o, config, apiKeyToNest);

  /** Build a function for this graphql operation */
  return `
    ${apiKeyToNest ? "async " : ""}${operationName}(${args}): ${returnType} {
      ${content}
    }
  `;
}
