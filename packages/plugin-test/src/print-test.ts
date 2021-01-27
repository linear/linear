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
  const hasRequiredArgs = Boolean(operation.requiredArgs.args.length);

  if (hasRequiredArgs) {
    /** Skip queries with required args */
    return `// requiredArgs ${operation.name} ${operation.requiredArgs.printInput}`;
  } else {
    if (operation.model) {
      const hasOptionalArgs = Boolean(operation.optionalArgs.args.length);
      const fieldName = operation.print.field;
      return printLines([
        `describe("${operation.name}", () => {
          it("${fieldName}", async () => {
            const ${fieldName} = await client.${fieldName}${hasOptionalArgs ? "()" : ""}
            logger.trace(${fieldName})
          })
        })`,
      ]);
    } else {
      return `// no model ${operation.name}`;
    }
  }
}
