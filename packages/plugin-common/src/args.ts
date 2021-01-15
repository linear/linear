import { InputValueDefinitionNode, Kind } from "graphql";
import { printList } from "./print";
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
export function getArgList(args: (ArgDefinition | undefined)[]): ArgList {
  return {
    args: args.filter(nonNullable),
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
