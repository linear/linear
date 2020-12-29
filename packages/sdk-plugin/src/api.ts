import { indentMultiline } from "@graphql-codegen/visitor-plugin-common";
import { filterJoin, printComment, upperFirst } from "@linear/common";
import { VariableDefinitionNode } from "graphql";
import { getArgList } from "./args";
import c from "./constants";
import { printOperation } from "./operation";
import { getRequesterArg } from "./requester";
import { SdkPluginContext } from "./types";
import { getRequiredVariables, getTypeName } from "./variable";

export function printApiDefinition(context: SdkPluginContext): string {
  /** For each operation get the function string content */
  const content = filterJoin(
    context.definitions.map(o => printOperation(context, o)).map(s => indentMultiline(s, 2)),
    ",\n"
  );

  return printApiFunction(context, content);
}

/**
 * Return the name of the sdk function scoped to the api key
 */
export function printApiFunctionName(path: string[]): string {
  return `${c.SDK_NAME}${path.map(upperFirst).join("")}`;
}

/**
 * Return the type of the sdk function scoped to the api key
 */
export function printApiFunctionType(path: string[]): string {
  return `${c.SDK_TYPE}${path.map(upperFirst).join("")}`;
}

/**
 * Print the api function with content
 */
export function printApiFunction(context: SdkPluginContext, content: string): string {
  const name = printApiFunctionName(context.apiPath);
  const type = printApiFunctionType(context.apiPath);

  const parentDefinitions = context.apiPath.slice(0, -1).map((key, index) => {
    const parentKey = context.apiPath.slice(0, index).join("_");
    return context.apiDefinitions[parentKey].find(
      definition => definition.path.join("_") === context.apiPath.slice(0, index + 1).join("_")
    );
  });

  const requiredVariables = parentDefinitions.reduce<VariableDefinitionNode[]>((acc, definition) => {
    return [...acc, ...(definition?.node ? getRequiredVariables(definition?.node) : [])];
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

  const apiDescription = context.apiPath.length
    ? `Initialize a set of operations, scoped to ${context.apiPath}, to run against the Linear api`
    : "Initialize a set of operations to run against the Linear api";

  return filterJoin(
    [
      printComment([
        apiDescription,
        ...args.jsdoc,
        context.apiPath.length
          ? `@returns The set of available operations scoped to a single ${context.apiPath}`
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
