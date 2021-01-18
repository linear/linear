import { getArgList, printComment, printDebug, printList } from "@linear/plugin-common";
import c from "./constants";
import { getRequestArg } from "./request";
import { SdkOperation, SdkPluginContext } from "./types";

/**
 * Print a top level sdk class with all root operations
 */
export function printSdk(context: SdkPluginContext): string {
  const rootOperations = context.sdkDefinitions[""];

  const operations = printList(rootOperations.operations.map(printSdkOperation), "\n");

  const args = getArgList([getRequestArg()]);

  return printList(
    [
      printComment(["The SDK class containing all root operations", ...args.jsdoc]),
      `export class ${c.SDK_CLASS} extends ${c.REQUEST_CLASS} {
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
 * Print an sdk root operation
 */
export function printSdkOperation(o: SdkOperation): string {
  return printList(
    [
      printComment([
        `${o.print.type} ${o.print.field} for ${o.print.model}${o.print.list ? "s" : ""}`,
        o.query?.description?.value ?? "",
        ...o.args.jsdoc,
        `@returns ${o.print.model}${o.print.list ? "[]" : ""}`,
      ]),
      printDebug(o),
      `public ${o.args.args.length ? "" : "get"} ${o.print.field}(${o.args.printInput}): ${o.print.promise} {
        return new ${o.print.response}(this.${c.REQUEST_NAME}).fetch(${o.args.printOutput})
      }`,
    ],
    "\n"
  );
}
