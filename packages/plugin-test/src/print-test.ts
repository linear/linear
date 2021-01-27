import { OperationType, printLines } from "@linear/common";
import { SdkOperation, SdkPluginContext } from "@linear/plugin-sdk";

/**
 * Print all tests
 */
export function printTests(context: SdkPluginContext): string {
  return printLines(
    context.sdkDefinitions[""].operations?.map(operation =>
      operation.node.operation === OperationType.query ? printQueryTest(context, operation) : undefined
    )
  );
}

/**
 * Print tests for a query
 */
function printQueryTest(context: SdkPluginContext, operation: SdkOperation): string {
  return printLines([
    `describe("Query ${operation.name}", () => {

    })`,
  ]);
}
