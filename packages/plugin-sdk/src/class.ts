import { ArgDefinition, getArgList, printComment, printDebug, printList } from "@linear/plugin-common";
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
  const fragmentName = o.fragment?.name.value;
  const parentVariables = getOperationParentVariables(context, o);
  const parentArgs = getArgList([getRequestArg(), ...Object.values(parentVariables ?? {})]);

  return printList(
    [
      printComment([`${o.operationType} ${o.documentVariableName} for ${fragmentName}`, ...parentArgs.jsdoc]),
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

        public async fetch(${requiredVariables.printInput}) {
          return ${`this.${c.REQUEST_NAME}<${resultType}, ${variableType}>(${printList(
            [documentName, printOperationArgs(o, parentVariables)],
            ", "
          )}).then(response => {
            const data = ${printList(["response", ...o.path], "?.")}
            return data ? new ${fragmentName}(this.${c.REQUEST_NAME}, data) : undefined
          })`}
        }
      }
    `,
    ],
    "\n"
  );
}
