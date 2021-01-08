import { InputValueDefinitionNode, Kind } from "graphql";
import { ArgDefinition, ArgList } from "./types";
import { filterJoin, nonNullable } from "./utils";

/**
 * Return only the required arguments
 */
export function requiredArgs(args: readonly InputValueDefinitionNode[] = []): InputValueDefinitionNode[] {
  return args.filter(a => a.type.kind === Kind.NON_NULL_TYPE);
}

/**
 * Transform a list of arg strings into the jsdoc and printed output
 */
export function getArgList(args: (ArgDefinition | undefined)[]): ArgList {
  return {
    jsdoc: [
      " ",
      ...args.filter(nonNullable).map(({ name, description }) => {
        return `@param ${name} - ${description}`;
      }),
    ],
    printInput: filterJoin(
      args.filter(nonNullable).map(({ name, type, optional, defaultName }) => {
        return `${name}${optional ? "?" : ""}: ${type}${defaultName ? ` = ${defaultName}` : ""}`;
      }),
      ", "
    ),
    printOutput: filterJoin(
      args.filter(nonNullable).map(({ name }) => {
        return name;
      }),
      ", "
    ),
  };
}
