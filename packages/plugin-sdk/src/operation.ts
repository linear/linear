import {
  ArgDefinition,
  getArgList,
  nonNullable,
  printComment,
  printDebug,
  printList,
  reduceListType,
  reduceTypeName,
} from "@linear/plugin-common";
import c from "./constants";
import { printNamespaced } from "./print";
import { getRequestArg } from "./request";
import { SdkOperation, SdkPluginContext } from "./types";
import { getOptionalVariables, getRequiredVariables } from "./variable";

/**
 * Print a return type for all operations
 */
export function printOperations(context: SdkPluginContext): string {
  const returnTypes = Object.values(context.sdkDefinitions).reduce<string[]>((acc, definition) => {
    return [...acc, ...definition.operations.map(o => printOperation(context, o))];
  }, []);

  return printList(returnTypes, "\n\n");
}

/**
 * Print the exported return type for an sdk operation
 */
function printOperation(context: SdkPluginContext, o: SdkOperation): string {
  const requiredVariables = getArgList(getOperationArgs(context, o));
  const variableType = printNamespaced(context, o.operationVariablesTypes);
  const documentName = printNamespaced(context, o.documentVariableName);
  const resultType = printNamespaced(context, o.operationResultType);
  const modelType = o.query ? reduceTypeName(o.query.type) : o.fragment?.name.value;
  const listModelType = o.query ? reduceListType(o.query.type) : undefined;
  const parentVariables = getOperationParentVariables(context, o);
  const parentArgs = getArgList([getRequestArg(), ...Object.values(parentVariables ?? {})]);
  const fetchReturnType = `Promise<${modelType}${listModelType ? "[]" : ""} | undefined>`;

  return printList(
    [
      printComment([`A fetchable ${o.name} ${o.operationType}`, ...parentArgs.jsdoc]),
      printDebug(o),
      `class ${o.operationResultType} extends ${c.REQUEST_CLASS} {
        ${printList(
          Object.values(parentVariables ?? {}).map(arg => `private _${arg.name}: ${arg.type}`),
          "\n"
        )}

        public constructor(${parentArgs.printInput}) {
          super(${c.REQUEST_NAME})
          ${printList(
            Object.values(parentVariables ?? {}).map(arg => `this._${arg.name} = ${arg.name}`),
            "\n"
          )}
        }

        ${printComment([
          `Call the ${o.name} ${o.operationType} and return a ${modelType}${listModelType ? " list" : ""}`,
          ...requiredVariables.jsdoc,
        ])}
        public async fetch(${requiredVariables.printInput}): ${fetchReturnType} {
          return ${`this.${c.REQUEST_NAME}<${resultType}, ${variableType}>(${printList(
            [documentName, printOperationArgs(o, parentVariables)],
            ", "
          )}).then(response => {
            const data = ${printList(["response", ...o.path], "?.")}
            return data 
              ? ${
                listModelType
                  ? `data.map(node => new ${modelType}(this.${c.REQUEST_NAME}, node))`
                  : `new ${modelType}(this.${c.REQUEST_NAME}, data)`
              }  
              : undefined
          })`}
        }
      }
    `,
    ],
    "\n"
  );
}

/**
 * Get the request args from the operation variables
 */
export function printOperationArgs(o: SdkOperation, parentVariables: Record<string, ArgDefinition>): string {
  const parentVariableNames = Object.keys(parentVariables);
  const requiredVariables = Object.keys(o.requiredVariables);
  const optionalVariables = getOptionalVariables(o.node);

  if (parentVariableNames.length || requiredVariables.length) {
    return `{
      ${printList(
        [
          /** Merge required variables from parent scope */
          ...parentVariableNames.map(v => `${v}: this._${v}`),
          /** Merge remaining required variables */
          ...requiredVariables.map(v => (parentVariableNames.includes(v) ? undefined : v)),
          /** Spread optional variables */
          optionalVariables.length ? `...${c.VARIABLE_NAME}` : undefined,
        ],
        ", "
      )}
    }`;
  }

  return optionalVariables.length ? c.VARIABLE_NAME : "{}";
}

/**
 * Get the operation args from the operation variables
 */
function getOperationArgs(context: SdkPluginContext, o: SdkOperation): ArgDefinition[] {
  /** Get all required variable names in the parent scope */
  const parentOperation = getParentOperation(context, o.path.slice(0, -1));
  const parentRequiredVariables = getRequiredVariables(parentOperation?.node) ?? [];
  const parentRequiredVariableNames = parentRequiredVariables.map(v => v.variable.name.value);

  /** Argument definition for each required variable that is not in the parent scope */
  const requiredVariables: (ArgDefinition | undefined)[] = Object.values(o.requiredVariables).map(({ name, type }) =>
    parentRequiredVariableNames.includes(name)
      ? undefined
      : {
          name,
          type,
          optional: false,
          description: `${name} to pass into the ${o.operationResultType}`,
        }
  );
  const requiredVariableNames = [
    ...parentRequiredVariableNames.map(v => `'${v}'`),
    ...requiredVariables.map(v => (v ? `'${v.name}'` : undefined)),
  ];

  /** Single definition for any optional variables */
  const optionalVariables = getOptionalVariables(o.node);
  const variableType = printNamespaced(context, o.operationVariablesTypes);
  const optionalArg = requiredVariables.length
    ? {
        name: c.VARIABLE_NAME,
        optional: true,
        type: `Omit<${variableType}, ${printList(requiredVariableNames, " | ")}>`,
        description: `variables without ${printList(requiredVariableNames, ", ")} to pass into the ${
          o.operationResultType
        }`,
      }
    : {
        name: c.VARIABLE_NAME,
        optional: true,
        type: variableType,
        description: `variables to pass into the ${o.operationResultType}`,
      };

  /** Spread required variables first */
  return [...requiredVariables, optionalVariables.length ? optionalArg : undefined].filter(nonNullable);
}

/**
 * Find the operation definition for the parent api function
 */
function getParentOperation(context: SdkPluginContext, path: string[]): SdkOperation | undefined {
  const parentKey = path.slice(0, -1).join("_") ?? "";
  return context.sdkDefinitions[parentKey].operations.find(d => d.path.join("_") === path.join("_"));
}

/**
 * Loop through the sdk path and merge all required variables in parent scope
 */
function getOperationParentVariables(context: SdkPluginContext, o: SdkOperation): Record<string, ArgDefinition> {
  return o.sdkPath.reduce((acc, _, i) => {
    const sdkKey = o.sdkPath.slice(0, i).join("_");
    const parentKey = o.sdkPath.slice(0, i + 1).join("_");
    return {
      ...acc,
      ...context.sdkDefinitions[sdkKey].operations.find(p => p.path.join("_") === parentKey)?.requiredVariables,
    };
  }, {});
}
