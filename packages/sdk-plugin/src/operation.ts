import { FieldNode, Kind, OperationDefinitionNode } from "graphql";
import { printApiFunctionName, printApiFunctionType } from "./api";
import { ArgDefinition, getArgList } from "./args";
import { SdkPluginConfig } from "./config";
import c from "./constants";
import { printDocBlock, printNamespacedType, printOperationName } from "./print";
import { printRequesterCall } from "./requester";
import { filterJoin, lowerFirst } from "./utils";
import { hasOptionalVariable, hasOtherVariable, hasVariable, isIdVariable } from "./variable";
import { SdkVisitorOperation } from "./visitor";

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
function getOperationArgs(o: SdkVisitorOperation, config: SdkPluginConfig): ArgDefinition[] {
  /** Operation id argument definition */
  const idArg = {
    name: c.ID_NAME,
    optional: false,
    type: c.ID_TYPE,
    description: `${c.ID_NAME} to pass into the ${o.operationResultType}`,
  };

  /** Operation variables argument definition */
  const variableType = printNamespacedType(config, o.operationVariablesTypes);
  const variablesArg = {
    name: c.VARIABLE_NAME,
    optional: hasOptionalVariable(o),
    type: variableType,
    description: `variables to pass into the ${o.operationResultType}`,
  };

  /** Handle id variables separately by making them the first arg */
  if (hasVariable(o, c.ID_NAME)) {
    const chainChildKey = getChainChildKey(o);

    if (hasOtherVariable(o, c.ID_NAME)) {
      /** If we are chained do not add the id arg as it comes from the function scope */
      const variablesWithoutIdArg = {
        ...variablesArg,
        type: `Omit<${variableType}, '${c.ID_NAME}'>`,
        description: `variables without ${chainChildKey} ${c.ID_NAME} to pass into the ${o.operationResultType}`,
      };

      return chainChildKey ? [variablesWithoutIdArg] : [idArg, variablesWithoutIdArg];
    } else {
      return chainChildKey ? [] : [idArg];
    }
  } else {
    return [variablesArg];
  }
}

/**
 * Get the chain key if the operation should create an api
 */
export function getChainParentKey(o: SdkVisitorOperation): string | undefined {
  return o.node.chainType === SdkChainType.parent ? o.node.chainKey : undefined;
}

/**
 * Get the chain key if the operation is nested within an api
 */
export function getChainChildKey(o: SdkVisitorOperation): string | undefined {
  return o.node.chainType === SdkChainType.child ? o.node.chainKey : undefined;
}

/**
 * If the operation name is the same as the first field we can drill into the data to return a nicer api
 */
function getNestedDataKey(o: SdkVisitorOperation): string | undefined {
  const operationName = printOperationName(o);
  return operationName === getFirstFieldName(o.node) ? operationName : undefined;
}

/**
 * Get the sdk action operation body
 */
function printOperationBody(o: SdkVisitorOperation, config: SdkPluginConfig): string {
  const chainParentKey = getChainParentKey(o);
  const nestedDataKey = getNestedDataKey(o);

  return filterJoin(
    [
      `const ${c.RESPONSE_NAME} = await ${printRequesterCall(o, config)}`,
      `return {`,
      /** Return the response */
      `...${c.RESPONSE_NAME},`,
      /** If we are a parent add the child sdk to the response */
      chainParentKey ? `...${printApiFunctionName(chainParentKey)}(${c.ID_NAME}, ${c.REQUESTER_NAME}),` : undefined,
      /** If the first field is the operation drill down for a nicer api */
      nestedDataKey ? `data: ${c.RESPONSE_NAME}?.data?.${nestedDataKey},` : undefined,
      `}`,
    ],
    "\n"
  );
}

/**
 * Get the name of the operation
 * Chained apis have the chain key removed from the name
 */
export function printSdkOperationName(o: SdkVisitorOperation): string {
  const nodeName = printOperationName(o);
  const chainChildKey = getChainChildKey(o);
  return chainChildKey ? lowerFirst(nodeName.replace(new RegExp(`^${chainChildKey}`, "i"), "")) : nodeName;
}

/**
 * Get the result type of the operation
 * Chained apis have the relevant chain api return type added
 */
function printOperationResultType(o: SdkVisitorOperation, config: SdkPluginConfig) {
  const nestedDataKey = getNestedDataKey(o);
  const chainParentKey = getChainParentKey(o);
  const resultType = printNamespacedType(
    config,
    /** Print the operation result type with nested data key if present */
    nestedDataKey ? `${o.operationResultType}['${nestedDataKey}']` : o.operationResultType
  );

  if (chainParentKey) {
    return `Promise<${c.RESPONSE_TYPE}<${resultType}> & ${printApiFunctionType(chainParentKey)}>`;
  } else {
    return `Promise<${c.RESPONSE_TYPE}<${resultType}>>`;
  }
}

/**
 * Process a graphql operation and return a generated operation string
 */
export function printOperation(o: SdkVisitorOperation, config: SdkPluginConfig): string {
  const operationName = printSdkOperationName(o);
  const returnType = printOperationResultType(o, config);
  const content = printOperationBody(o, config);
  const args = getArgList([
    ...getOperationArgs(o, config),
    {
      name: c.OPTIONS_NAME,
      optional: true,
      type: c.OPTIONS_TYPE,
      description: "options to pass to the graphql client",
    },
  ]);

  /** Build a function for this graphql operation */
  return `
    ${printDocBlock([
      `Call the linear api with the ${o.operationResultType}`,
      ...args.jsdoc,
      `@returns The wrapped result of the ${o.operationResultType}`,
    ])}
    async ${operationName}(${args.print}): ${returnType} {
      ${content}
    }
  `;
}
