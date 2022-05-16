import {
  getLast,
  nonNullable,
  OperationType,
  printComment,
  printElseWarn,
  printLines,
  printList,
  printSet,
} from "@linear/codegen-doc";
import { Sdk, SdkListField, SdkOperation, SdkPluginContext } from "@linear/codegen-sdk";
import { ObjectTypeDefinitionNode } from "graphql";
import { printTestHooks } from "./print-hooks";

/**
 * Print all tests
 */
export function printTests(context: SdkPluginContext): string {
  return printDescribe(
    "generated",
    ["Auto generated API tests"],
    printLines([
      printTestHooks(),
      ...context.sdkDefinitions[""].operations?.map(operation =>
        operation.node.operation === OperationType.query ? printQueryTest(context, operation) : undefined
      ),
    ])
  );
}

/**
 * Print a jest describe block
 */
function printDescribe(name: string, description: string[], content: string, omit = false): string {
  return omit
    ? content
    : printLines([
        printComment(description),
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
 * Print mocked arguments for an operation
 */
function printOperationArgs(operation: SdkOperation): string {
  const parentArgNames = operation.parent?.requiredArgs.args.map(arg => arg.name) ?? [];
  const fieldMockArgs = operation.requiredArgs.args
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

  return fieldMockArgs.length || operation.optionalArgs.args.length ? `(${printList(fieldMockArgs)})` : "";
}

/**
 * Prints the type with array and undefined check
 */
function printResponseType(type: string, listType?: string) {
  return `${type}${listType ? "[]" : ""} | undefined`;
}

/**
 * Prints the test for a query with associated SdkModel
 */
function printModelQueryTest(context: SdkPluginContext, operation: SdkOperation, index = 1): string {
  const sdkKey = operation.sdkPath.join("_");
  const sdkOperations = context.sdkDefinitions[operation.path.join("_")]?.operations ?? [];
  const clientName = getLast(operation.sdkPath) ? `_${getLast(operation.sdkPath)}` : "client";

  const fieldName = getLast(operation.path) ?? "UNKNOWN_FIELD_NAME";
  const fieldType = printList([Sdk.NAMESPACE, operation.print.model], ".");

  const isModelObject = operation.parent?.model?.fields.object.find(field => field.name === getLast(operation.path));

  /** Mock data for any queries with required variables that cannot be sourced via a connection */
  return printDescribe(
    operation.name,
    [`Test ${operation.name} query`],
    printLines([
      sdkOperations.length ? `let _${fieldName}: ${fieldType} | undefined` : undefined,
      "\n",
      printComment([`Test the ${sdkKey || "root"} model query for ${operation.name}`]),
      printIt(
        printList([sdkKey ? sdkKey : undefined, fieldName], "."),
        printElseWarn(
          clientName,
          printLines([
            `const ${fieldName}: ${printResponseType(fieldType, operation.print.list)} = ${
              isModelObject
                ? `${clientName}.${fieldName}`
                : `await ${clientName}.${fieldName}${printOperationArgs(operation)}`
            }`,
            sdkOperations.length ? printSet(`_${fieldName}`, fieldName) : undefined,
            operation.print.list
              ? `${fieldName}?.map(node => expect(node instanceof ${fieldType}))`
              : `expect(${fieldName} instanceof ${fieldType})`,
          ]),
          `No ${getLast(operation.sdkPath)} found - cannot test ${clientName}.${fieldName} query`,
          clientName === "client"
        )
      ),
      printLines(sdkOperations.map(sdkOperation => printQueryTest(context, sdkOperation, index))),
    ]),
    operation.sdkPath.length > 0
  );
}

/**
 * Prints the test for a connection query
 */
function printConnectionQueryTest(context: SdkPluginContext, operation: SdkOperation, index = 1): string {
  const sdkKey = operation.sdkPath.join("_");
  const clientName = getLast(operation.sdkPath) ? `_${getLast(operation.sdkPath)}` : "client";

  const fieldName = getLast(operation.path) ?? "UNKNOWN_FIELD_NAME";
  const fieldType = printList([Sdk.NAMESPACE, operation.print.model], ".");

  const connectionType = getConnectionNode(operation)?.listType;

  /** Find item that matches type and start of name, or just type */
  const sdkOperations = context.sdkDefinitions[sdkKey].operations;
  const matchesType = (sdkOperation: SdkOperation) => sdkOperation.print.model === connectionType;
  const itemOperation =
    sdkOperations.find(sdkOperation => matchesType(sdkOperation) && fieldName.startsWith(sdkOperation.print.field)) ??
    sdkOperations.find(matchesType);

  const itemField = itemOperation?.print.field;
  const itemSdkKey = itemOperation?.path.join("_");
  const itemOperations = itemSdkKey ? context.sdkDefinitions[itemSdkKey]?.operations ?? [] : [];
  const itemType = printList([Sdk.NAMESPACE, itemOperation?.print.model], ".");
  const itemArgs = itemOperation?.requiredArgs.args ?? [];
  const itemOperationArgs = itemArgs.length ? `(${printList(itemArgs.map(arg => `_${itemField}_${arg.name}`))})` : "";
  const itemQueries = itemOperation?.model?.fields.query ?? [];

  /* For interfaces the type of item can be any of the implementations (plus the interface type) */
  const modelName = itemOperation?.print.model;
  const returnsInterface = modelName ? context.interfaces?.some(i => i.name.value === modelName) : false;
  const implementations: string[] =
    returnsInterface && modelName
      ? context.interfaceImplementations[modelName]?.map((imp: ObjectTypeDefinitionNode) => imp.name.value) ?? []
      : [];
  const itemTypes = printList([itemType, ...implementations.map(imp => printList([Sdk.NAMESPACE, imp], "."))], " | ");

  return printDescribe(
    operation.name,
    [`Test all ${connectionType} queries`],
    printLines([
      itemOperation
        ? printLines([
            `let _${itemField}: ${itemTypes} | undefined`,
            ...(itemArgs.map(arg => `let _${itemField}_${arg.name}: ${arg.type} | undefined`) ?? []),
            "\n",
          ])
        : undefined,
      printComment([`Test the ${sdkKey || "root"} connection query for the ${connectionType}`]),
      printIt(
        printList([sdkKey ? sdkKey : undefined, fieldName], "."),
        printElseWarn(
          clientName,
          printLines([
            `const ${fieldName}: ${printResponseType(
              fieldType,
              operation.print.list
            )} = await ${clientName}.${fieldName}${printOperationArgs(operation)}`,
            itemOperation
              ? printLines([
                  `const ${itemField} = ${fieldName}?.${Sdk.NODE_NAME}?.[0]`,
                  ...(itemArgs.map(arg => printSet(`_${itemField}_${arg.name}`, `${itemField}?.${arg.name}`)) ?? []),
                ])
              : undefined,
            operation.print.list
              ? `${fieldName}?.map(node => expect(node instanceof ${fieldType}))`
              : `expect(${fieldName} instanceof ${fieldType})`,
          ]),
          `No ${getLast(operation.sdkPath)} found - cannot test ${clientName}.${fieldName} query`,
          clientName === "client"
        )
      ),

      "\n",

      ...(itemField
        ? [
            printComment([`Test the root query for a single ${connectionType}`]),
            printIt(
              printList([sdkKey ? sdkKey : undefined, itemField], "."),
              printElseWarn(
                printList(
                  itemArgs.map(arg => `_${itemField}_${arg.name}`),
                  " && "
                ),
                printLines([
                  `const ${itemField}: ${printResponseType(
                    itemTypes,
                    operation.print.list
                  )} = await ${clientName}.${itemField}${itemOperationArgs}`,
                  itemOperations.length || itemQueries.length ? printSet(`_${itemField}`, itemField) : undefined,
                  operation.print.list
                    ? `${itemField}?.map(node => expect(node instanceof ${itemType}))`
                    : `expect(${itemField} instanceof ${itemType})`,
                ]),
                `No first ${connectionType} found in connection - cannot test ${itemField} query`
              )
            ),
          ]
        : []),
      "\n",

      printLines(itemOperations?.map(sdkOperation => printQueryTest(context, sdkOperation, index))),

      itemQueries.length
        ? printLines(
            itemQueries.map(field => {
              return printLines([
                printComment([`Test the ${itemField}.${field.name} query for ${field.type}`]),
                printIt(
                  printList([sdkKey ? sdkKey : undefined, itemField, field.name], "."),
                  printElseWarn(
                    `_${itemField}`,
                    printLines([
                      `const ${itemField}_${field.name}: ${printResponseType(
                        field.type,
                        operation.print.list
                      )} = await _${itemField}.${field.name}`,
                      operation.print.list
                        ? `${itemField}_${field.name}?.map(node => expect(node instanceof ${field.type}))`
                        : `expect(${itemField}_${field.name} instanceof ${field.type})`,
                    ]),
                    `No ${connectionType} found - cannot test ${itemField}.${field.name} query`
                  )
                ),
              ]);
            })
          )
        : undefined,
    ]),
    operation.sdkPath.length > 0
  );
}

/**
 * Print tests for a query
 */
function printQueryTest(context: SdkPluginContext, operation: SdkOperation, index = 0): string {
  if (index > 2) {
    return "";
  }

  const sdkKey = operation.sdkPath.join("_");

  const connectionType = getConnectionNode(operation)?.listType;
  const connectionOperation = context.sdkDefinitions[sdkKey].operations.find(sdkOperation => {
    return getConnectionNode(sdkOperation)?.listType === operation.name;
  });

  if (connectionType) {
    /** Handle connection queries specifically */
    return printConnectionQueryTest(context, operation, index + 1);
  } else if (connectionOperation) {
    /** This operation is handled by the connection test */
    return "";
  } else if (operation.model) {
    /** Handle models without connections */
    return printModelQueryTest(context, operation, index + 1);
  } else {
    return printLines([`// ${operation.name} - no model for query`, "\n"]);
  }
}
