import {
  ArgDefinition,
  getArgList,
  printComment,
  printDebug,
  printList,
  reduceListType,
  reduceTypeName,
} from "@linear/plugin-common";
import c from "./constants";
import { getOperationArgs } from "./operation";
import { printNamespaced } from "./print";
import { getRequestArg } from "./request";
import { SdkOperation, SdkPluginContext } from "./types";
import { getOptionalVariables } from "./variable";

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
      `export class ${o.operationResultType} extends ${c.REQUEST_CLASS} {
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
