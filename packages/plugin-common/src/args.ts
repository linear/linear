import { InputValueDefinitionNode, Kind } from "graphql";
import { ArgDefinition } from "./types";
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
export function getArgList(args: (ArgDefinition | undefined)[]): { jsdoc: string[]; print: string } {
  return {
    jsdoc: [
      " ",
      ...args.filter(nonNullable).map(({ name, description }) => {
        return `@param ${name} - ${description}`;
      }),
    ],
    print: filterJoin(
      args.filter(nonNullable).map(({ name, type, optional, defaultName }) => {
        return `${name}${optional ? "?" : ""}: ${type}${defaultName ? ` = ${defaultName}` : ""}`;
      }),
      ", "
    ),
  };
}
