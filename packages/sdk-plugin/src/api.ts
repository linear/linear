import { indentMultiline } from "@graphql-codegen/visitor-plugin-common";
import { filterJoin, printComment, upperFirst } from "@linear/common";
import { VariableDefinitionNode } from "graphql";
import { getArgList } from "./args";
import c from "./constants";
import { printOperation } from "./operation";
import { getRequesterArg } from "./requester";
import { SdkPluginContext } from "./types";
import { getTypeName, isRequiredVariable } from "./variable";

export function printApiDefinition(context: SdkPluginContext): string {
  /** For each operation get the function string content */
  const content = filterJoin(
    context.definitions.map(o => printOperation(context, o)).map(s => indentMultiline(s, 2)),
    "\n"
  );

  return printApiFunction(context, content);
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
export function printApiFunction(context: SdkPluginContext, content: string): string {
  const name = printApiFunctionName(context.apiKey);
  const type = printApiFunctionType(context.apiKey);

  const keys = context.apiKey.split("_");
  const parentDefinitions = keys.slice(0, -1).map((key, index) => {
    const parentKey = keys.slice(0, index).join("_");
    return context.apiDefinitions[parentKey].find(
      definition => definition.path.join("_") === keys.slice(0, index + 1).join("_")
    );
  });

  const requiredVariables = parentDefinitions.reduce<VariableDefinitionNode[]>((acc, definition) => {
    return [...acc, ...(definition?.node.variableDefinitions?.filter(isRequiredVariable) ?? [])];
  }, []);

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

  const apiDescription = context.apiKey
    ? `Initialize a set of operations, scoped to ${context.apiKey}, to run against the Linear api`
    : "Initialize a set of operations to run against the Linear api";

  return filterJoin(
    [
      printComment([
        apiDescription,
        ...args.jsdoc,
        context.apiKey.length
          ? `@returns The set of available operations scoped to a single ${context.apiKey}`
          : "@returns The set of available operations",
      ]),
      `export function ${name}<${c.OPTIONS_TYPE}>(${args.print}) {
        return {
          ${content}
        };
      }`,
      " ",
      printComment([`The returned type from calling ${name}`, apiDescription]),
      `export type ${type} = ReturnType<typeof ${name}>;`,
    ],
    "\n"
  );
}
