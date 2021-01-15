import { getArgList, printComment, printDebug, printList } from "@linear/plugin-common";
import c from "./constants";
import { getOperationArgs } from "./operation";
import { printNamespaced } from "./print";
import { getRequesterArg, printRequesterArgs } from "./requester";
import { SdkOperation, SdkPluginContext } from "./types";

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
  const fragmentName = o.fragment?.name.value;
  const args = getArgList([getRequesterArg()]);

  return printList(
    [
      printComment([`${o.operationType} {@link ${o.documentVariableName}} for {@link ${fragmentName}}`, ...args.jsdoc]),
      printDebug(o),
      `export class ${o.operationResultType} {
        private _${c.REQUESTER_NAME}: ${c.REQUESTER_TYPE}

        public constructor(${args.printInput}) {
          this._${c.REQUESTER_NAME} = ${c.REQUESTER_NAME}
        }

        public async fetch(${requiredVariables.printInput}) {
          return ${`this._${c.REQUESTER_NAME}<${resultType}, ${variableType}>(${printList(
            [documentName, printRequesterArgs(o)],
            ", "
          )}).then(response => {
            const data = ${printList(["response", ...o.path], "?.")}
            return data ? new ${fragmentName}(this._${c.REQUESTER_NAME}, data) : undefined
          })`}
        }
      }
    `,
    ],
    "\n"
  );
}
