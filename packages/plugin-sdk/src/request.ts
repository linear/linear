import { ArgDefinition, getArgList, printComment, printList } from "@linear/plugin-common";
import c from "./constants";
import { SdkOperation } from "./types";
import { getOptionalVariables, getRequiredVariables } from "./variable";

/**
 * Get the argument definition for the requester
 */
export function getRequestArg(): ArgDefinition {
  return {
    name: c.REQUEST_NAME,
    optional: false,
    type: c.REQUEST_TYPE,
    description: "function to call the graphql client",
  };
}

/**
 * Get the requester args from the operation variables
 */
export function printRequestArgs(o: SdkOperation): string {
  const requiredVariables = getRequiredVariables(o.node);
  const requiredArg = printList(
    requiredVariables.map(v => v.variable.name?.value),
    ", "
  );

  const optionalVariables = getOptionalVariables(o.node);

  if (requiredArg) {
    /** Merge id variable into requester variables */
    if (optionalVariables.length) {
      return `{${requiredArg}, ...${c.VARIABLE_NAME}}`;
    } else {
      return `{${requiredArg}}`;
    }
  }

  return optionalVariables.length ? c.VARIABLE_NAME : "{}";
}

/**
 * Print the exported requester type
 */
export function printRequest(): string {
  const args = getArgList([getRequestArg()]);

  return printList(
    [
      "\n",
      printComment([`The function type for calling the graphql client`]),
      `export type ${c.REQUEST_TYPE} = <R, V>(doc: DocumentNode, ${c.VARIABLE_NAME}?: V) => Promise<R>`,
      "\n",
      printComment(["Base class to provide a request function", ...args.jsdoc]),
      `export class ${c.REQUEST_CLASS} {
        public constructor(${args.printInput}) {
          this.${c.REQUEST_NAME} = ${c.REQUEST_NAME}
        }

        protected ${c.REQUEST_NAME}: ${c.REQUEST_TYPE}
      }`,
    ],
    "\n"
  );
}
