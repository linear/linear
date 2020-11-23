import { getArgList } from "./args";
import c from "./constants";
import { printDocBlock } from "./print";
import { getRequesterArg } from "./requester";
import { upperFirst } from "./utils";

/**
 * Return the name of the sdk function scoped to the api key
 */
export function printApiFunctionName(chainKey?: string): string {
  return `${c.SDK_NAME}${upperFirst(chainKey)}`;
}

/**
 * Return the type of the sdk function scoped to the api key
 */
export function printApiFunctionType(chainKey?: string): string {
  return `${c.SDK_TYPE}${upperFirst(chainKey)}`;
}

/**
 * Print the api function with content
 */
export function printApiFunction(content: string, chainKey?: string): string {
  const name = printApiFunctionName(chainKey);
  const type = printApiFunctionType(chainKey);

  const args = getArgList([
    /** Add an initial id arg if in a nested api */
    chainKey
      ? {
          name: c.ID_NAME,
          optional: false,
          type: c.ID_TYPE,
          description: `${c.ID_NAME} to scope the returned operations by`,
        }
      : undefined,
    /** The requester function arg */
    getRequesterArg(),
  ]);

  const apiDescription = chainKey
    ? `Initialise a set of operations, scoped to ${chainKey}, to run against the Linear api`
    : "Initialise a set of operations to run against the Linear api";

  return `
      ${printDocBlock([
        apiDescription,
        ...args.jsdoc,
        chainKey
          ? `@returns The set of available operations scoped to a single ${chainKey}`
          : "@returns The set of available operations",
      ])}
      export function ${name}<${c.OPTIONS_TYPE}>(${args.print}) {
        return {
          ${content}
        };
      }
      
      ${printDocBlock([`The returned type from calling ${name}`, apiDescription])}
      export type ${type} = ReturnType<typeof ${name}>;
    `;
}
