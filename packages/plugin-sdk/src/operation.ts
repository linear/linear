import { getArgList, printComment, printDebug, printList, printTernary } from "@linear/plugin-common";
import c from "./constants";
import { printNamespaced } from "./print";
import { getRequestArg } from "./request";
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
  const constructorArgs = getArgList([getRequestArg(), ...(o.parentArgs.args ?? [])]);

  return printList(
    [
      printComment([`A fetchable ${o.name} ${o.print.type}`, ...constructorArgs.jsdoc]),
      printDebug(o),
      `class ${o.print.response} extends ${c.REQUEST_CLASS} {
        ${printList(
          o.parentArgs.args.map(arg => `private _${arg.name}: ${arg.type}`),
          "\n"
        )}

        public constructor(${constructorArgs.printInput}) {
          super(${c.REQUEST_NAME})
          ${printList(
            o.parentArgs.args.map(arg => `this._${arg.name} = ${arg.name}`),
            "\n"
          )}
        }

        ${printComment([
          `Call the ${o.print.name} ${o.print.type.toLowerCase()} and return a ${o.print.model}${
            o.print.list ? " list" : ""
          }`,
          ...o.fetchArgs.jsdoc,
          `@returns parsed response from ${o.print.response}`,
        ])}
        public async fetch(${o.fetchArgs.printInput}): ${o.print.promise} {
          return ${`this.${c.REQUEST_NAME}<${printNamespaced(context, o.print.response)}, ${
            o.print.variables
          }>(${printList([o.print.document, printOperationArgs(o)], ", ")}).then(response => {
            const data = ${printList(["response", ...o.path], "?.")}
            return ${printTernary(
              "data",
              o.print.list
                ? `data.map(node => new ${o.print.list}(this.${c.REQUEST_NAME}, node))`
                : `new ${o.print.model}(this.${c.REQUEST_NAME}, data)`
            )}
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
export function printOperationArgs(o: SdkOperation): string {
  const parentVariableNames = o.parentArgs.args.map(a => a.name) ?? [];

  if (parentVariableNames.length || o.requiredArgs.args.length) {
    return `{
      ${printList(
        [
          /** Merge required variables from parent scope */
          ...parentVariableNames.map(v => `${v}: this._${v}`),
          /** Merge remaining required variables */
          ...o.requiredArgs.args.map(v => (parentVariableNames.includes(v.name) ? undefined : v.name)),
          /** Spread optional variables */
          o.optionalArgs.args.length ? `...${c.VARIABLE_NAME}` : undefined,
        ],
        ", "
      )}
    }`;
  }

  return o.optionalArgs.args.length ? c.VARIABLE_NAME : "{}";
}
