import { getArgList, printComment, printDebug, printList } from "@linear/plugin-common";
import c from "./constants";
import { getRequestArg } from "./request";
import { SdkOperation, SdkPluginContext } from "./types";

/**
 * Print a top level sdk class with all root operations
 */
export function printSdk(context: SdkPluginContext): string {
  const rootOperations = context.sdkDefinitions[""];

  const operations = printList(
    rootOperations.operations.map(o => printSdkOperation(context, o)),
    "\n"
  );

  const args = getArgList([getRequestArg()]);

  return printList(
    [
      printComment(["The SDK class containing all root operations", ...args.jsdoc]),
      `export class ${c.SDK_TYPE} extends ${c.REQUEST_CLASS} {
        public constructor(${args.printInput}) {
          super(${c.REQUEST_NAME})
        }

        ${operations}
      }`,
    ],
    "\n"
  );
}

/**
 * Print a sdk root operation
 */
export function printSdkOperation(context: SdkPluginContext, o: SdkOperation): string {
  return printList(
    [printDebug(o), `public ${o.node.name?.value} = new ${o.operationResultType}(this.${c.REQUEST_NAME}).fetch`],
    "\n"
  );
}
