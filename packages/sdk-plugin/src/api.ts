import { indentMultiline } from "@graphql-codegen/visitor-plugin-common";
import { filterJoin, logger, upperFirst } from "@linear/common";
import { VariableDefinitionNode } from "graphql";
import { getArgList } from "./args";
import c from "./constants";
import { printDocBlock } from "./print";
import { getRequesterArg } from "./requester";
import { ApiDefinition, ApiDefinitions } from "./types";
import { getTypeName, isRequiredVariable } from "./variable";

export function printOperation(apiDefinition: ApiDefinition): string {
  return `/** ${apiDefinition.path.join("-")} */`;
}

export function printApiDefinition(
  apiDefinitions: ApiDefinitions,
  apiKey: string,
  definitions: ApiDefinition[]
): string {
  /** For each operation get the function string content */
  const content = filterJoin(
    definitions.map(o => printOperation(o)).map(s => indentMultiline(s, 2)),
    "\n"
  );

  return printApiFunction(apiDefinitions, apiKey, definitions, content);
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
export function printApiFunction(
  apiDefinitions: ApiDefinitions,
  apiKey: string,
  definitions: ApiDefinition[],
  content: string
): string {
  const name = printApiFunctionName(apiKey);
  const type = printApiFunctionType(apiKey);

  const keys = apiKey.split("_");
  const parentDefinitions = keys.slice(0, -1).map((key, index) => {
    const parentKey = keys.slice(0, index).join("_");
    return apiDefinitions[parentKey].find(
      definition => definition.path.join("_") === keys.slice(0, index + 1).join("_")
    );
  });

  const requiredVariables = parentDefinitions.reduce<VariableDefinitionNode[]>((acc, definition) => {
    return [...acc, ...(definition?.operation.variableDefinitions?.filter(isRequiredVariable) ?? [])];
  }, []);

  logger.trace(apiKey, JSON.stringify(requiredVariables, null, 2));

  const args = getArgList([
    /** The requester function arg */
    getRequesterArg(),
    /** Args required by the parent operations */
    ...requiredVariables.map(v => ({
      name: v.variable.name.value,
      optional: false,
      type: getTypeName(v.type),
      description: `${v.variable.name.value} to scope the returned operations by`,
    })),
  ]);

  const apiDescription = apiKey
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
