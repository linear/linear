import { getArgList, printComment, printDebug, printLines } from "@linear/common";
import c from "./constants";
import { getRequestArg } from "./print-request";
import { SdkOperation, SdkPluginContext } from "./types";

/**
 * Print a top level sdk class with all root operations
 */
export function printSdk(context: SdkPluginContext): string {
  const rootOperations = context.sdkDefinitions[""];

  const operations = printLines(rootOperations.operations.map(printSdkOperation));

  const args = getArgList([getRequestArg()]);

  return printLines([
    printComment(["The SDK class containing all root operations", ...args.jsdoc]),
    `export class ${c.SDK_CLASS} extends ${c.REQUEST_CLASS} {
        public constructor(${args.printInput}) {
          super(${c.REQUEST_NAME})
        }

        ${operations}
      }`,
  ]);
}

/**
 * Print an sdk root operation
 */
export function printSdkOperation(operation: SdkOperation): string {
  return printLines([
    printComment([
      `${operation.print.type} ${operation.print.field} for ${operation.print.model}${operation.print.list ? "s" : ""}`,
      operation.query?.description?.value ?? "",
      ...operation.args.jsdoc,
      `@returns ${operation.print.model}${operation.print.list ? "[]" : ""}`,
    ]),
    printDebug(operation),
    `public ${operation.args.args.length ? "" : "get"} ${operation.print.field}(${operation.args.printInput}): ${
      operation.print.promise
    } {
        return new ${operation.print.response}(this._${c.REQUEST_NAME}).fetch(${operation.args.printOutput})
      }`,
  ]);
}
