import { filterJoin, nonNullable } from "@linear/common";

/**
 * A description of an arg
 */
export interface ArgDefinition {
  /** The name of the argument */
  name: string;
  /** Whether the argument is optional */
  optional: boolean;
  /** The string type of the argument */
  type: string;
  /** The jsdoc definition of the argument */
  description: string;
  /** The name of a default variable */
  defaultName?: string;
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
