import { OperationType, printComment, printLines, printList, printSet } from "@linear/codegen-doc";
import { Sdk, SdkListField, SdkOperation, SdkPluginContext } from "@linear/codegen-sdk";
import { printAfterAll, printBeforeAll, printBeforeSuite } from "./print-hooks";

/**
 * Print all tests
 */
export function printTests(context: SdkPluginContext): string {
  return printDescribe(
    "generated",
    printLines([
      printBeforeSuite(),
      printBeforeAll(),
      printAfterAll(),
      ...context.sdkDefinitions[""].operations?.map(operation =>
        operation.node.operation === OperationType.query ? printQueryTest(context, operation) : undefined
      ),
    ])
  );
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
  return operation.model?.fields.list.find(field => field.name === Sdk.NODE_NAME);
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
  const itemField = itemOperation?.print.field;
  const itemArgs = itemOperation?.requiredArgs.args ?? [];
  const itemQueries = itemOperation?.model?.fields.query ?? [];
  const itemConnections = itemOperation?.model?.fields.connection ?? [];

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
            itemOperation
              ? printLines([
                  `let _${itemField}: ${Sdk.NAMESPACE}.${itemOperation.print.model} | undefined`,
                  ...(itemArgs.map(arg => `let _${itemField}_${arg.name}: ${arg.type} | undefined`) ?? []),
                  "\n",
                ])
              : undefined,
            printComment([`Test the root query for the ${listType} connection`]),
            printIt(
              fieldName,
              printLines([
                `const ${fieldName} = await client.${fieldName}${
                  Boolean(operation.optionalArgs.args.length) ? "()" : ""
                }`,
                itemOperation
                  ? printLines([
                      `const ${itemField} = ${fieldName}?.${Sdk.NODE_NAME}?.[0]`,
                      ...(itemArgs.map(arg => printSet(`_${itemField}_${arg.name}`, `${itemField}?.${arg.name}`)) ??
                        []),
                    ])
                  : undefined,
                `expect(${fieldName}).toBeDefined()`,
              ])
            ),
            "\n",
            ...(itemField
              ? [
                  printComment([`Test the root query for a single ${listType}`]),
                  printIt(
                    itemField,
                    `if (${printList(
                      itemArgs.map(arg => `_${itemField}_${arg.name}`),
                      " && "
                    )}) {
                      ${printLines([
                        `const ${itemField} = await client.${itemField}(${printList(
                          itemArgs.map(arg => `_${itemField}_${arg.name}`)
                        )})`,
                        printSet(`_${itemField}`, itemField),
                        `expect(${itemField}).toBeDefined()`,
                      ])}
                    } else {
                      throw new Error('No first ${listType} found from ${fieldName} connection query - cannot test ${itemField} query')
                    }`
                  ),
                ]
              : []),
            "\n",
            itemQueries.length
              ? printLines(
                  itemQueries.map(field => {
                    return printLines([
                      printComment([`Test the ${itemField}.${field.name} query for ${field.type}`]),
                      printIt(
                        `${itemField}.${field.name}`,
                        `if (_${itemField}) {
                          ${printLines([
                            `const ${itemField}_${field.name} = await _${itemField}.${field.name}`,
                            `expect(${itemField}_${field.name}).toBeDefined()`,
                          ])}
                        } else {
                          throw new Error('No ${listType} found from ${itemField} query - cannot test ${itemField}.${
                          field.name
                        } query')
                        }`
                      ),
                    ]);
                  })
                )
              : undefined,

            itemConnections.length
              ? printLines(
                  itemConnections.map(field => {
                    return printLines([
                      printComment([`Test the ${itemField}.${field.name} connection query for ${field.type}`]),
                      printIt(
                        `${itemField}.${field.name}`,
                        `if (_${itemField}) {
                        ${printLines([
                          `const ${itemField}_${field.name} = await _${itemField}.${field.name}()`,
                          `expect(${itemField}_${field.name}).toBeDefined()`,
                        ])}
                      } else {
                        throw new Error('No ${listType} found from ${itemField} query - cannot test ${itemField}.${
                          field.name
                        } connection query')
                      }`
                      ),
                    ]);
                  })
                )
              : undefined,
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
                `expect(${fieldName}).toBeDefined()`,
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
