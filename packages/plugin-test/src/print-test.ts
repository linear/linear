import { OperationType, printComment, printLines, printList, printSet } from "@linear/common";
import { SdkConstants, SdkListField, SdkOperation, SdkPluginContext } from "@linear/plugin-sdk";

/**
 * Print all tests
 */
export function printTests(context: SdkPluginContext): string {
  return printLines([
    ...context.sdkDefinitions[""].operations?.map(operation =>
      operation.node.operation === OperationType.query ? printQueryTest(context, operation) : undefined
    ),
    "\n",
  ]);
}

/**
 * Print a jest describe block
 */
function printDescribe(name: string, content: string): string {
  return printLines([
    `describe("${name}", () => {
      ${content}
    })`,
    "\n",
  ]);
}

/**
 * Print a jest it block
 */
function printIt(name: string, content: string): string {
  return printLines([
    `it("${name}", async () => {
      ${content}
    })`,
    "\n",
  ]);
}

function getConnectionNode(operation: SdkOperation): SdkListField | undefined {
  return operation.model?.fields.list.find(field => field.name === SdkConstants.NODE_NAME);
}

/**
 * Print tests for a query
 */
function printQueryTest(context: SdkPluginContext, operation: SdkOperation): string {
  const hasRequiredArgs = Boolean(operation.requiredArgs.args.length);
  const fieldName = operation.print.field;
  const listType = getConnectionNode(operation)?.listType;
  const itemOperation = context.sdkDefinitions[""].operations.find(rootOperation => {
    return rootOperation.print.model === listType;
  });

  if (hasRequiredArgs) {
    const connectionOperation = context.sdkDefinitions[""].operations.find(rootOperation => {
      return getConnectionNode(rootOperation)?.listType === operation.name;
    });
    if (connectionOperation) {
      /** This operation is handled by the connection test */
      return "";
    } else {
      /** Skip queries with required args */
      return printLines([`// ${operation.name} ${operation.requiredArgs.printInput} - has required args`, "\n"]);
    }
  } else {
    if (listType) {
      return printLines([
        printComment([`Test all ${listType} queries`]),
        printDescribe(
          operation.name,
          printLines([
            ...(itemOperation?.requiredArgs.args.map(
              arg => `let _${itemOperation.print.field}_${arg.name}: ${arg.type} | undefined`
            ) ?? []),
            "\n",
            printComment([`Test the root query for the ${listType} connection`]),
            printIt(
              fieldName,
              printLines([
                `const ${fieldName} = await client.${fieldName}${
                  Boolean(operation.optionalArgs.args.length) ? "()" : ""
                }`,
                itemOperation
                  ? printLines([
                      `const first${listType} = ${fieldName}?.${SdkConstants.NODE_NAME}?.[0]`,
                      ...(itemOperation?.requiredArgs.args.map(arg =>
                        printSet(`_${itemOperation.print.field}_${arg.name}`, `first${listType}?.${arg.name}`)
                      ) ?? []),
                    ])
                  : undefined,
                `logger.trace(${fieldName})`,
              ])
            ),
            "\n",
            ...(itemOperation
              ? [
                  printComment([`Test the root query for a single ${listType}`]),
                  printIt(
                    itemOperation.print.field,
                    `if (${printList(
                      itemOperation?.requiredArgs.args.map(arg => `_${itemOperation.print.field}_${arg.name}`),
                      " && "
                    )}) {
                      ${printLines([
                        `const ${itemOperation.print.field} = await client.${
                          itemOperation.print.field
                        }(${itemOperation?.requiredArgs.args.map(arg => `_${itemOperation.print.field}_${arg.name}`)})`,
                        `logger.trace(${itemOperation.print.field})`,
                      ])}
                    } else {
                      throw new Error('No first ${listType} found from ${fieldName} connection query - cannot test ${
                      itemOperation.print.field
                    } query')
                    }`
                  ),
                ]
              : []),
          ])
        ),
      ]);
    } else if (operation.model) {
      return printLines([
        printComment([`Test ${operation.name} query`]),
        printDescribe(
          operation.name,
          printLines([
            printComment([`Test the root query for ${operation.name}`]),
            printIt(
              fieldName,
              printLines([
                `const ${fieldName} = await client.${fieldName}${
                  Boolean(operation.optionalArgs.args.length) ? "()" : ""
                }`,
                `logger.trace(${fieldName})`,
              ])
            ),
          ])
        ),
      ]);
    } else {
      return printLines([`// ${operation.name} - no model for query`, "\n"]);
    }
  }
}
