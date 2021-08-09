import { getArgList, printComment, printLines, printList, printTernary } from "@linear/codegen-doc";
import { Sdk } from "./constants";
import { SdkModelField } from "./types";

const parseDateFunction = "parseDate";
const parseJsonFunction = "parseJson";
const parseValue = "value";

/**
 * Print functions to parse custom scalars
 */
export function printScalarParsers(): string {
  const args = getArgList([{ name: parseValue, type: "any", optional: true, description: "value to parse" }]);
  return printLines([
    "\n",
    printComment(["Function to parse custom scalars into Date types", ...args.jsdoc]),
    `function ${parseDateFunction}(${args.printInput}): ${Sdk.SCALAR_DATE_TYPE} | undefined {
      try {
        return ${printTernary(parseValue, `new Date(${args.printOutput})`)}
      } catch(e) {
        return undefined
      }
    }`,
    "\n",
    printComment(["Function to parse custom scalars into JSON objects", ...args.jsdoc]),
    `function ${parseJsonFunction}(${args.printInput}): ${Sdk.SCALAR_JSON_TYPE} | undefined {
      try {
        return ${printTernary(parseValue, `JSON.parse(${args.printOutput})`)}
      } catch(e) {
        return undefined
      }
    }`,
    "\n",
  ]);
}

/**
 * Wrap the scalar in a parsing function if required
 */
export function printModelScalar(field: SdkModelField): string {
  const fieldName = printList([Sdk.DATA_NAME, field.name], ".");

  switch (field.type) {
    case Sdk.SCALAR_DATE_TYPE:
      return field.nonNull ? `${parseDateFunction}(${fieldName}) ?? new Date()` : `${parseDateFunction}(${fieldName})`;
    case Sdk.SCALAR_JSON_TYPE:
      return field.nonNull ? `${parseJsonFunction}(${fieldName}) ?? {}` : `${parseJsonFunction}(${fieldName})`;
    default:
      return `${fieldName}`;
  }
}
