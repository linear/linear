import { indentMultiline } from "@graphql-codegen/visitor-plugin-common";
import { filterJoin, upperFirst } from "@linear/common";
import { getArgList } from "./args";
import c from "./constants";
import { ApiDefinition, ApiDefinitions } from "./documents";
import { printDocBlock } from "./print";
import { getRequesterArg } from "./requester";

export function printOperation(apiDefinition: ApiDefinition): string {
  return apiDefinition.path.join("-");
}

export function printApiDefinition(
  apiDefinitions: ApiDefinitions,
  apiKey: string,
  definitions: ApiDefinition[]
): string {
  /** For each operation get the function string content */
  const content = filterJoin(
    definitions.map(o => printOperation(o)).map(s => indentMultiline(s, 2)),
    ",\n"
  );

  return printApiFunction(content, apiKey);
}

/**
 * Return the name of the sdk function scoped to the api key
 */
export function printApiFunctionName(apiKey: string): string {
  return `${c.SDK_NAME}${apiKey.split("_").map(upperFirst).join("")}`;
}

/**
 * Return the type of the sdk function scoped to the api key
 */
export function printApiFunctionType(apiKey: string): string {
  return `${c.SDK_TYPE}${apiKey.split("_").map(upperFirst).join("")}`;
}

/**
 * Print the api function with content
 */
export function printApiFunction(content: string, apiKey: string): string {
  const name = printApiFunctionName(apiKey);
  const type = printApiFunctionType(apiKey);

  const args = getArgList([
    /** Add an initial id arg if in a nested api */
    // chainKey
    //   ? {
    //       name: c.ID_NAME,
    //       optional: false,
    //       type: c.ID_TYPE,
    //       description: `${c.ID_NAME} to scope the returned operations by`,
    //     }
    //   : undefined,
    /** The requester function arg */
    getRequesterArg(),
  ]);

  const apiDescription = apiKey.length
    ? `Initialise a set of operations, scoped to ${apiKey}, to run against the Linear api`
    : "Initialise a set of operations to run against the Linear api";

  return `
      ${printDocBlock([
        apiDescription,
        ...args.jsdoc,
        apiKey.length
          ? `@returns The set of available operations scoped to a single ${apiKey}`
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
