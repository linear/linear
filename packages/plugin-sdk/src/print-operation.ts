import { getArgList, printComment, printDebug, printLines, printList, printSet, printTernary } from "@linear/common";
import c from "./constants";
import { printNamespaced } from "./print";
import { isConnectionModel } from "./print-connection";
import { getRequestArg } from "./print-request";
import { SdkOperation, SdkPluginContext } from "./types";

/**
 * Print a return type for all operations
 */
export function printOperations(context: SdkPluginContext): string {
  const returnTypes = Object.values(context.sdkDefinitions).reduce<string[]>((acc, definition) => {
    return [...acc, ...definition.operations.map(operation => printOperation(context, operation))];
  }, []);

  return printLines(returnTypes);
}

/**
 * Print the exported return type for an sdk operation
 */
function printOperation(context: SdkPluginContext, operation: SdkOperation): string {
  const constructorArgs = getArgList([getRequestArg(), ...(operation.parentArgs.args ?? [])]);
  const parentArgNames = operation.parentArgs.args.map(arg => arg.name);

  return printLines([
    printComment([`A fetchable ${operation.name} ${operation.print.type}`, ...constructorArgs.jsdoc]),
    printDebug(operation),
    `class ${operation.print.response} extends ${c.REQUEST_CLASS} {
        ${printLines(operation.parentArgs.args.map(arg => `private _${arg.name}: ${arg.type}`))}

        public constructor(${constructorArgs.printInput}) {
          super(${c.REQUEST_NAME})
          ${printLines(operation.parentArgs.args.map(arg => printSet(`this._${arg.name}`, `${arg.name}`)))}
        }

        ${printComment([
          `Call the ${operation.print.name} ${operation.print.type.toLowerCase()} and return a ${
            operation.print.model
          }${operation.print.list ? " list" : ""}`,
          ...operation.fetchArgs.jsdoc,
          `@returns parsed response from ${operation.print.response}`,
        ])}
        public async ${c.FETCH_NAME}(${operation.fetchArgs.printInput}): ${operation.print.promise} {
          return ${`this._${c.REQUEST_NAME}<${printNamespaced(context, operation.print.response)}, ${
            operation.print.variables
          }>(${printList([operation.print.document, printOperationArgs(operation)])}).then(${c.RESPONSE_NAME} => {
            ${printSet(`const ${c.DATA_NAME}`, `${printList([c.RESPONSE_NAME, ...operation.path], "?.")}`)}
            return ${printTernary(
              c.DATA_NAME,
              operation.print.list
                ? `${c.DATA_NAME}.map(node => new ${operation.print.list}(${printList([
                    `this._${c.REQUEST_NAME}`,
                    "node",
                  ])}))`
                : isConnectionModel(operation.model)
                ? `new ${operation.print.model}(${printList([
                    `this._${c.REQUEST_NAME}`,
                    `pagination => this.${c.FETCH_NAME}(${printList([
                      ...operation.requiredArgs.args
                        .filter(arg => !parentArgNames.includes(arg.name))
                        .map(arg => arg.name),
                      `{ ${printList([`...${c.VARIABLE_NAME}`, `...pagination`])} }`,
                    ])})`,
                    c.DATA_NAME,
                  ])})`
                : `new ${operation.print.model}(${printList([`this._${c.REQUEST_NAME}`, c.DATA_NAME])})`
            )}
          })`}
        }
      }
    `,
  ]);
}

/**
 * Get the request args from the operation variables
 */
export function printOperationArgs(operation: SdkOperation): string {
  const parentVariableNames = operation.parentArgs.args.map(arg => arg.name) ?? [];

  if (parentVariableNames.length || operation.requiredArgs.args.length) {
    return `{
      ${printList([
        /** Merge required variables from parent scope */
        ...parentVariableNames.map(variable => `${variable}: this._${variable}`),
        /** Merge remaining required variables */
        ...operation.requiredArgs.args.map(variable =>
          parentVariableNames.includes(variable.name) ? undefined : variable.name
        ),
        /** Spread optional variables */
        operation.optionalArgs.args.length ? `...${c.VARIABLE_NAME}` : undefined,
      ])}
    }`;
  }

  return operation.optionalArgs.args.length ? c.VARIABLE_NAME : "{}";
}
