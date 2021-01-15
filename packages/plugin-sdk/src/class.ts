import { getArgList, printList } from "@linear/plugin-common";
import c from "./constants";
import { getOperationArgs } from "./operation";
import { printNamespaced, printPascal } from "./print";
import { printRequesterArgs } from "./requester";
import { SdkOperation, SdkPluginContext } from "./types";

/**
 * Print a return type for all operations
 */
export function printSdkClasses(context: SdkPluginContext): string {
  const returnTypes = Object.values(context.sdkDefinitions).reduce<string[]>((acc, definition) => {
    return [...acc, ...definition.operations.map(o => printSdkClass(context, o))];
  }, []);

  return printList(returnTypes, "\n\n");
}

/**
 * Print the exported return type for an sdk operation
 */
function printSdkClass(context: SdkPluginContext, o: SdkOperation): string {
  const requiredVariables = getArgList(getOperationArgs(context, o));
  const variableType = printNamespaced(context, o.operationVariablesTypes);
  const documentName = printNamespaced(context, o.documentVariableName);
  const resultType = printNamespaced(context, o.operationResultType);

  return `
    export class ${o.operationResultType} {
      private _${c.REQUESTER_NAME}: ${c.REQUESTER_TYPE}

      public constructor(${c.REQUESTER_NAME}: ${c.REQUESTER_TYPE}) {
        this._${c.REQUESTER_NAME} = ${c.REQUESTER_NAME}
      }

      public async fetch(${requiredVariables.printInput}) {
        return ${`this._${c.REQUESTER_NAME}<${resultType}, ${variableType}>(${printList(
          [documentName, printRequesterArgs(o)],
          ", "
        )}).then(response => {
          const data = ${printList(["response", ...o.path], "?.")}
          return data ? new ${printPascal(o.model?.name)}(this._${c.REQUESTER_NAME}, data) : undefined
        })`}
      }
    }
  `;
}
