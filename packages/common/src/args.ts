import { FieldDefinitionNode, InputValueDefinitionNode, Kind } from "graphql";
import { printGraphqlComment, printGraphqlType, printLines, printList } from "./print";
import { ArgDefinition, ArgList } from "./types";
import { nonNullable } from "./utils";

/**
 * Return only the required arguments
 */
export function getRequiredArgs(args: readonly InputValueDefinitionNode[] = []): InputValueDefinitionNode[] {
  return args.filter(arg => arg.type.kind === Kind.NON_NULL_TYPE);
}

/**
 * Transform a list of arg strings into the jsdoc and printed output
 */
export function getArgList(_args: (ArgDefinition | undefined)[]): ArgList {
  const args = _args.filter(nonNullable);
  return {
    args,
    jsdoc: [
      " ",
      ...args.filter(nonNullable).map(({ name, description }) => {
        return `@param ${name} - ${description}`;
      }),
    ],
    printInput: printList(
      args.filter(nonNullable).map(({ name, type, optional, defaultName }) => {
        return `${name}${optional ? "?" : ""}: ${type}${defaultName ? ` = ${defaultName}` : ""}`;
      })
    ),
    printOutput: printList(
      args.filter(nonNullable).map(({ name }) => {
        return name;
      })
    ),
  };
}

/**
 * Print the arg for passing into the operation input
 */
function printGraphqlInputArg(input?: InputValueDefinitionNode): string {
  if (input) {
    const arg = printGraphqlType(input.type);
    const description = input.description?.value ? printGraphqlComment([input.description?.value]) : undefined;
    return printLines([description, `$${input.name.value}: ${arg}`]);
  } else {
    return "";
  }
}

/**
 * Print the args list for passing into the operation input
 */
export function printGraphqlInputArgs(fields: FieldDefinitionNode[]): string {
  const args = fields.flatMap(field => field.arguments);
  return args?.length ? printLines(["(", ...args.map(printGraphqlInputArg), ")"]) : "";
}

/**
 * Print the arg for passing into the operation response
 */
function printGraphqlResponseArg(input: InputValueDefinitionNode): string {
  return `${input.name.value}: $${input.name.value}`;
}

/**
 * Print the args list for passing into the operation response
 */
export function printGraphqlResponseArgs(field: FieldDefinitionNode): string {
  return field.arguments?.length ? printLines(["(", ...field.arguments.map(printGraphqlResponseArg), ")"]) : "";
}
