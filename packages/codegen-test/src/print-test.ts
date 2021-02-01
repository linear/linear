import { OperationType, printComment, printLines, printList, printSet } from "@linear/codegen-doc";
import { Sdk, SdkListField, SdkOperation, SdkPluginContext } from "@linear/codegen-sdk";
import { getLast, nonNullable } from "@linear/common";
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

/**
 * Find the model field for the connection nodes
 */
function getConnectionNode(operation: SdkOperation): SdkListField | undefined {
  return operation.model?.fields.list.find(field => field.name === Sdk.NODE_NAME);
}

/**
 * Print tests for a query
 */
function printQueryTest(context: SdkPluginContext, operation: SdkOperation, index = 0): string {
  if (index > 2) {
    return "";
  }

  const sdkKey = operation.sdkPath.join("_");
  const sdkOperations = context.sdkDefinitions[operation.path.join("_")]?.operations ?? [];
  const clientName = getLast(operation.sdkPath) ? `_${getLast(operation.sdkPath)}` : "client";

  const hasRequiredArgs = Boolean(operation.requiredArgs.args.length);
  const fieldName = getLast(operation.path) ?? "UNKNOWN_FIELD_NAME";
  const fieldType = printList([Sdk.NAMESPACE, operation.print.model], ".");

  const listType = getConnectionNode(operation)?.listType;
  const itemOperation = context.sdkDefinitions[sdkKey].operations.find(sdkOperation => {
    return sdkOperation.print.model === listType;
  });
  const itemField = itemOperation?.print.field;
  const itemType = printList([Sdk.NAMESPACE, itemOperation?.print.model], ".");
  const itemArgs = itemOperation?.requiredArgs.args ?? [];
  const itemQueries = itemOperation?.model?.fields.query ?? [];
  const itemConnections = itemOperation?.model?.fields.connection ?? [];

  if (hasRequiredArgs) {
    const connectionOperation = context.sdkDefinitions[sdkKey].operations.find(sdkOperation => {
      return getConnectionNode(sdkOperation)?.listType === operation.name;
    });

    if (connectionOperation) {
      /** This operation is handled by the connection test */
      return "";
    } else {
      const parentArgNames = operation.parent?.requiredArgs.args.map(arg => arg.name) ?? [];
      const fieldArgs = operation.requiredArgs.args
        .map(arg =>
          parentArgNames.includes(arg.name)
            ? undefined
            : arg.type === "string"
            ? `"mock-${arg.name}"`
            : arg.type === "string[]"
            ? `["mock-${arg.name}"]`
            : arg.type === "number"
            ? `123`
            : arg.type === "number[]"
            ? `[123]`
            : "UNMAPPED_MOCK_TYPE"
        )
        .filter(nonNullable);

      /** Mock data for any queries with required variables that cannot be sourced via a connection */
      return printLines([
        printComment([`Test ${operation.name} query with mock data`]),
        printDescribe(
          operation.name,
          printLines([
            sdkOperations.length ? `let _${fieldName}: ${fieldType}` : undefined,
            "\n",
            printComment([`Test the ${sdkKey || "root"} query for the ${operation.name} using mock data`]),
            printIt(
              fieldName,
              printLines([
                `const ${fieldName} = await ${clientName}.${fieldName}${
                  fieldArgs.length ? `(${printList(fieldArgs)})` : ""
                }`,
                sdkOperations.length ? printSet(`_${fieldName}`, fieldName) : undefined,
                `expect(${fieldName} instanceof ${fieldType})`,
              ])
            ),
            printLines(sdkOperations.map(sdkOperation => printQueryTest(context, sdkOperation, index + 1))),
          ])
        ),
      ]);
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
                  `let _${itemField}: ${itemType} | undefined`,
                  ...(itemArgs.map(arg => `let _${itemField}_${arg.name}: ${arg.type} | undefined`) ?? []),
                  "\n",
                ])
              : undefined,
            printComment([`Test the root query for the ${listType} connection`]),
            printIt(
              fieldName,
              printLines([
                `const ${fieldName} = await ${clientName}.${fieldName}${
                  Boolean(operation.optionalArgs.args.length) ? "()" : ""
                }`,
                itemOperation
                  ? printLines([
                      `const ${itemField} = ${fieldName}?.${Sdk.NODE_NAME}?.[0]`,
                      ...(itemArgs.map(arg => printSet(`_${itemField}_${arg.name}`, `${itemField}?.${arg.name}`)) ??
                        []),
                    ])
                  : undefined,
                `expect(${fieldName} instanceof ${fieldType})`,
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
                        `const ${itemField} = await ${clientName}.${itemField}(${printList(
                          itemArgs.map(arg => `_${itemField}_${arg.name}`)
                        )})`,
                        printSet(`_${itemField}`, itemField),
                        `expect(${itemField} instanceof ${itemType})`,
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
                            `expect(${itemField}_${field.name} instanceof ${field.type})`,
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
                          `expect(${itemField}_${field.name} instanceof ${field.type})`,
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
            sdkOperations.length ? `let _${fieldName}: ${fieldType}` : undefined,
            "\n",
            printComment([`Test the ${sdkKey || "root"} query for ${operation.name}`]),
            printIt(
              fieldName,
              printLines([
                `const ${fieldName} = await ${clientName}.${fieldName}${
                  Boolean(operation.optionalArgs.args.length) ? "()" : ""
                }`,
                sdkOperations.length ? printSet(`_${fieldName}`, fieldName) : undefined,
                `expect(${fieldName} instanceof ${fieldType})`,
              ])
            ),
            printLines(sdkOperations.map(sdkOperation => printQueryTest(context, sdkOperation, index + 1))),
          ])
        ),
      ]);
    } else {
      return printLines([`// ${operation.name} - no model for query`, "\n"]);
    }
  }
}
