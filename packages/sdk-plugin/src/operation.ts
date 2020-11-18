import { FieldNode, Kind, OperationDefinitionNode } from "graphql";
import { SdkPluginConfig } from "./config";
import c from "./constants";
import {
  printApiFunctionName,
  printApiFunctionType,
  printArgList,
  printNamespacedDocument,
  printNamespacedType,
} from "./print";
import { lowerFirst } from "./utils";
import { hasOptionalVariable, hasOtherVariable, hasVariable, isIdVariable } from "./variable";
import { SdkOperation } from "./visitor";

/**
 * Type to determine at which level of the sdk an operation is to be added
 */
export enum SdkChainType {
  /** Add the operation to the root */
  root = "root",
  /** Add the operation to the root and return a chained api */
  parent = "parent",
  /** Add the operation to a chained api */
  child = "child",
}

/**
 * A processed operation definition to determine whether it is to chain or be chained
 */
export interface SdkOperationDefinition extends OperationDefinitionNode {
  chainType: SdkChainType;
  chainKey?: string;
}

/**
 * Operation should create a chained api using the chain key
 */
export interface SdkParentOperation extends SdkOperationDefinition {
  chainType: SdkChainType.parent;
  chainKey: string;
}

/**
 * Operation should be nested within the chained api by the chain key
 */
export interface SdkChildOperation extends SdkOperationDefinition {
  chainType: SdkChainType.child;
  chainKey: string;
}

/**
 * Operation is "normal" and should be added to the root level
 */
export interface SdkRootOperation extends SdkOperationDefinition {
  chainType: SdkChainType.root;
}

/**
 * The name of the first field of the operation definition
 */
function getFirstFieldName(operation: OperationDefinitionNode) {
  const firstField = operation.selectionSet.selections.find(s => s.kind === Kind.FIELD) as FieldNode;
  return firstField?.name?.value;
}

/**
 * The operation has a required id variable
 */
function hasIdVariable(o: OperationDefinitionNode): boolean {
  return (o.variableDefinitions ?? []).some(isIdVariable);
}

/**
 * The name of the operation
 */
function getOperationName(o: OperationDefinitionNode) {
  return o.name?.value;
}

/**
 * Chained api if the query name is the same as the first field and has an id (team, issue)
 * Return it with the chained key to link the chained sdk
 */
export function isParentOperation(o: OperationDefinitionNode): boolean {
  return hasIdVariable(o) && getOperationName(o) === getFirstFieldName(o);
}

/**
 * Chained api if the query name is the same as the first field and has an id (team, issue)
 * Return it with the chained key to link the chained sdk
 */
export function isChildOperation(o: OperationDefinitionNode): boolean {
  return Boolean(hasIdVariable(o) && getOperationName(o)?.startsWith(getFirstFieldName(o) ?? ""));
}

/**
 * Add information for chaining to the operation definition
 */
export function processSdkOperation(operation: OperationDefinitionNode): SdkOperationDefinition {
  if (isParentOperation(operation)) {
    return {
      ...operation,
      chainType: SdkChainType.parent,
      chainKey: getFirstFieldName(operation),
    };
  } else if (isChildOperation(operation)) {
    return {
      ...operation,
      chainType: SdkChainType.child,
      chainKey: getFirstFieldName(operation),
    };
  } else {
    return {
      ...operation,
      chainType: SdkChainType.root,
    };
  }
}

/**
 * Get the operation args from the operation variables
 */
function getVariableArgs(o: SdkOperation, config: SdkPluginConfig): string {
  const variableType = printNamespacedType(config, o.operationVariablesTypes);
  const optional = hasOptionalVariable(o) ? "?" : "";
  const chainChildKey = getChainChildKey(o);

  if (hasVariable(o, c.ID_NAME)) {
    /** Handle id variables separately by making them the first arg */
    if (hasOtherVariable(o, c.ID_NAME)) {
      /** If we are chained do not add the id arg as it comes from the function scope */
      if (chainChildKey) {
        return `${c.VARIABLE_NAME}${optional}: Omit<${variableType}, '${c.ID_NAME}'>`;
      } else {
        return `${c.ID_NAME}: ${c.ID_TYPE}, ${c.VARIABLE_NAME}${optional}: Omit<${variableType}, '${c.ID_NAME}'>`;
      }
    } else {
      if (chainChildKey) {
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
 * Get the chain key if the operation should create an api
 */
export function getChainParentKey(o: SdkOperation): string | undefined {
  return o.node.chainType === SdkChainType.parent ? o.node.chainKey : undefined;
}

/**
 * Get the chain key if the operation is nested within an api
 */
export function getChainChildKey(o: SdkOperation): string | undefined {
  return o.node.chainType === SdkChainType.child ? o.node.chainKey : undefined;
}

/**
 * Get the sdk action operation body
 */
function getOperationBody(o: SdkOperation, config: SdkPluginConfig): string {
  const variableType = printNamespacedType(config, o.operationVariablesTypes);
  const resultType = printNamespacedType(config, o.operationResultType);
  const documentName = printNamespacedDocument(config, o.documentVariableName);
  const callRequester = `${c.WRAPPER_NAME}(${c.HANDLER_NAME}(() => ${
    c.REQUESTER_NAME
  }<${resultType}, ${variableType}>(${documentName}, ${getRequesterArgs(o)}, ${c.OPTIONS_NAME})));`;

  /** If this is a chained api create the api and return it with the response */
  const chainParentKey = getChainParentKey(o);
  if (chainParentKey) {
    return `
      const response = await ${callRequester}
      return {
        ...response,
        ...${printApiFunctionName(chainParentKey)}(${c.ID_NAME}, ${c.REQUESTER_NAME}, ${c.WRAPPER_NAME}),
      }
    `;
  } else {
    return `return ${callRequester}`;
  }
}

/**
 * Get the name of the operation
 * Chained apis have the chain key removed from the name
 */
export function getSdkOperationName(o: SdkOperation): string {
  const nodeName = o.node.name?.value ?? "UNKNOWN_NODE_NAME";
  const chainChildKey = getChainChildKey(o);
  return chainChildKey ? lowerFirst(nodeName.replace(new RegExp(`^${chainChildKey}`, "i"), "")) : nodeName;
}

/**
 * Get the result type of the operation
 * Chained apis have the relevant chain api return type added
 */
function getOperationResultType(o: SdkOperation, config: SdkPluginConfig) {
  const resultType = printNamespacedType(config, o.operationResultType);

  const chainParentKey = getChainParentKey(o);
  if (chainParentKey) {
    return `Promise<${c.RESPONSE_TYPE}<${resultType}> & ${printApiFunctionType(chainParentKey)}>`;
  } else {
    return `Promise<${c.RESPONSE_TYPE}<${resultType}>>`;
  }
}

/**
 * Process a graphql operation and return a generated operation string
 */
export function getOperation(o: SdkOperation, config: SdkPluginConfig): string {
  const operationName = getSdkOperationName(o);
  const args = printArgList([getVariableArgs(o, config), `${c.OPTIONS_NAME}?: C`]);
  const returnType = getOperationResultType(o, config);
  const content = getOperationBody(o, config);

  /** Build a function for this graphql operation */
  return `
    ${getChainParentKey(o) ? "async " : ""}${operationName}(${args}): ${returnType} {
      ${content}
    }
  `;
}
