import { getArgList, printComment, printDebug, printLines } from "@linear/codegen-doc";
import { Sdk } from "./constants";
import { getRequestArg } from "./print-request";
import { SdkOperation, SdkPluginContext } from "./types";

/**
 * Print a top level sdk class with all root operations
 */
export function printSdk(context: SdkPluginContext): string {
  const rootOperations = context.sdkDefinitions[""];

  const operations = printLines(
    rootOperations.operations.filter(operation => operation.print.model !== Sdk.UNKNOWN_MODEL).map(printSdkOperation)
  );

  const args = getArgList([getRequestArg()]);

  return printLines([
    printComment(["The SDK class containing all root operations", ...args.jsdoc]),
    `export class ${Sdk.SDK_CLASS} extends ${Sdk.REQUEST_CLASS} {
        public constructor(${args.printInput}) {
          super(${Sdk.REQUEST_NAME})
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
      operation.query?.description?.value ??
        `${operation.print.type} ${operation.print.field} for ${operation.print.model}${
          operation.print.list ? "s" : ""
        }`,
      ...operation.args.jsdoc,
      `@returns ${operation.print.model}${operation.print.list ? "[]" : ""}`,
    ]),
    printDebug(operation),
    `public ${operation.args.args.length ? "" : "get"} ${operation.print.field}(${operation.args.printInput}): ${
      operation.print.promise
    } {
        return new ${operation.print.response}(this._${Sdk.REQUEST_NAME}).fetch(${operation.args.printOutput})
      }`,
  ]);
}
