import { getArgList, printComment, printDebug, printList } from "@linear/plugin-common";
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
export function printOperationArgs(o: SdkOperation, parent?: SdkOperation): string {
  const parentVariables = parent ? Object.keys(parent.requiredVariables) : [];
  const requiredVariables = Object.keys(o.requiredVariables);
  const optionalVariables = getOptionalVariables(o.node);

  if (parentVariables.length || requiredVariables.length) {
    return `{
      ${printList(
        [
          /** Merge required variables from parent scope */
          ...parentVariables.map(v => `${v}: this._${v}`),
          /** Merge remaining required variables */
          ...requiredVariables.map(v => (parentVariables.includes(v) ? undefined : v)),
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
 * Print the exported return type for an sdk operation
 */
function printOperation(context: SdkPluginContext, o: SdkOperation): string {
  const requiredVariables = getArgList(getOperationArgs(context, o));
  const variableType = printNamespaced(context, o.operationVariablesTypes);
  const documentName = printNamespaced(context, o.documentVariableName);
  const resultType = printNamespaced(context, o.operationResultType);
  const fragmentName = o.fragment?.name.value;
  const parent = context.sdkDefinitions[""].operations.find(p => p.path.join("_") === o.sdkPath.join("_"));
  const parentArgs = getArgList([getRequestArg(), ...Object.values(parent?.requiredVariables ?? {})]);

  return printList(
    [
      printComment([`${o.operationType} ${o.documentVariableName} for ${fragmentName}`, ...parentArgs.jsdoc]),
      printDebug(o),
      `export class ${o.operationResultType} extends ${c.REQUEST_CLASS} {
        ${printList(
          Object.values(parent?.requiredVariables ?? {}).map(arg => `private _${arg.name}: ${arg.type}`),
          "\n"
        )}

        public constructor(${parentArgs.printInput}) {
          super(${c.REQUEST_NAME})
          ${printList(
            Object.values(parent?.requiredVariables ?? {}).map(arg => `this._${arg.name} = ${arg.name}`),
            "\n"
          )}
        }

        public async fetch(${requiredVariables.printInput}) {
          return ${`this.${c.REQUEST_NAME}<${resultType}, ${variableType}>(${printList(
            [documentName, printOperationArgs(o, parent)],
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
