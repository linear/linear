import { FieldDefinitionNode, InputValueDefinitionNode, Kind } from "graphql";
import { printGraphqlComment, printGraphqlType, printList } from "./print";
import { ArgDefinition, ArgList } from "./types";
import { nonNullable } from "./utils";

/**
 * Return only the required arguments
 */
export function getRequiredArgs(args: readonly InputValueDefinitionNode[] = []): InputValueDefinitionNode[] {
  return args.filter(a => a.type.kind === Kind.NON_NULL_TYPE);
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
      }),
      ", "
    ),
    printOutput: printList(
      args.filter(nonNullable).map(({ name }) => {
        return name;
      }),
      ", "
    ),
  };
}

/**
 * Print the arg for passing into the operation input
 */
function printGraphqlInputArg(node?: InputValueDefinitionNode): string {
  if (node) {
    const arg = printGraphqlType(node.type);
    const description = node.description?.value ? printGraphqlComment([node.description?.value]) : undefined;
    return printList([description, `$${node.name.value}: ${arg}`], "\n");
  } else {
    return "";
  }
}

/**
 * Print the args list for passing into the operation input
 */
export function printGraphqlInputArgs(fields: FieldDefinitionNode[]): string {
  const args = fields.flatMap(field => field.arguments);
  return args?.length ? printList(["(", ...args.map(printGraphqlInputArg), ")"], "\n") : "";
}

/**
 * Print the arg for passing into the operation response
 */
function printGraphqlResponseArg(node: InputValueDefinitionNode): string {
  return `${node.name.value}: $${node.name.value}`;
}

/**
 * Print the args list for passing into the operation response
 */
export function printGraphqlResponseArgs(field: FieldDefinitionNode): string {
  return field.arguments?.length ? printList(["(", ...field.arguments.map(printGraphqlResponseArg), ")"], "\n") : "";
}
