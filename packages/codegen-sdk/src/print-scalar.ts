import { getArgList, printComment, printLines, printList, printTernary } from "@linear/codegen-doc";
import { Sdk } from "./constants";
import { SdkModelField } from "./types";

const parseDateFunction = "parseDate";
const parseDateValue = "value";

/**
 * Print functions to parse custom scalars
 */
export function printScalarParsers(): string {
  const args = getArgList([{ name: parseDateValue, type: "any", optional: true, description: "value to parse" }]);
  return printLines([
    printComment(["Function to parse custom DateTime scalars into Date types", ...args.jsdoc]),
    `function ${parseDateFunction}(${args.printInput}): Date | undefined {
      try {
        return ${printTernary(parseDateValue, `new Date(${args.printOutput})`)}
      } catch(e) {
        return undefined
      }
    }`,
  ]);
}

/**
 * Wrap the scalar in a parsing function if required
 */
export function printModelScalar(field: SdkModelField): string {
  const fieldName = printList([Sdk.DATA_NAME, field.name], ".");

  switch (field.type) {
    case "Date":
      return `${parseDateFunction}(${fieldName})`;
    default:
      return `${fieldName}`;
  }
}
