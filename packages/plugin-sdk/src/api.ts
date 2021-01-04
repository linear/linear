import { indentMultiline } from "@graphql-codegen/visitor-plugin-common";
import {
  ArgumentTypescriptVisitor,
  filterJoin,
  getArgList,
  printComment,
  printDebug,
  upperFirst,
} from "@linear/plugin-common";
import { visit } from "graphql";
import c from "./constants";
import { getParentOperation, printOperation } from "./operation";
import { getRequesterArg } from "./requester";
import { SdkPluginContext } from "./types";
import { getRequiredVariables } from "./variable";

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

  /** Get the required variables for the parent operation */
  const parentOperation = getParentOperation(context);
  const requiredVariables = getRequiredVariables(parentOperation?.node);

  /** Create a visitor to print the arg type */
  const argVisitor = new ArgumentTypescriptVisitor(context, c.NAMESPACE_DOCUMENT);

  const args = getArgList([
    /** The requester function arg */
    getRequesterArg(),
    /** Args required by the parent operations */
    ...requiredVariables.map(v => ({
      name: v.variable.name.value,
      optional: false,
      type: visit(v.type, argVisitor),
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
      printDebug({
        name,
        type,
        parentDefinition: parentOperation,
        apiPath: context.apiPath,
        requiredVariables,
      }),
      `export function ${name}<${c.OPTIONS_TYPE}>(${args.print}) {
        return {
          ${content}
        };
      }`,
      "\n",
      printComment([`The returned type from calling ${name}`, apiDescription]),
      `export type ${type} = ReturnType<typeof ${name}>;`,
      "\n",
    ],
    "\n"
  );
}
