import {
  ArgDefinition,
  getArgList,
  getOptionalVariables,
  getRequiredVariables,
  printComment,
  printLines,
  printList,
} from "@linear/common";
import c from "./constants";
import { SdkOperation } from "./types";

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
export function printRequestArgs(operation: SdkOperation): string {
  const requiredVariables = getRequiredVariables(operation.node);
  const requiredArg = printList(requiredVariables.map(variable => variable.variable.name?.value));

  const optionalVariables = getOptionalVariables(operation.node);

  if (requiredArg) {
    /** Merge id variable into requester variables */
    if (optionalVariables.length) {
      return `{ ${requiredArg}, ...${c.VARIABLE_NAME} }`;
    } else {
      return `{ ${requiredArg} }`;
    }
  }

  return optionalVariables.length ? c.VARIABLE_NAME : "{}";
}

/**
 * Print the exported requester type
 */
export function printRequest(): string {
  const args = getArgList([getRequestArg()]);

  return printLines([
    "\n",
    printComment([`The function for calling the graphql client`]),
    `export type ${c.REQUEST_TYPE} = <${printList([c.RESPONSE_TYPE, c.VARIABLE_TYPE])}>(doc: DocumentNode, ${
      c.VARIABLE_NAME
    }?: ${c.VARIABLE_TYPE}) => Promise<${c.RESPONSE_TYPE}>`,
    "\n",
    printComment(["Base class to provide a request function", ...args.jsdoc]),
    `class ${c.REQUEST_CLASS} {
        protected _${c.REQUEST_NAME}: ${c.REQUEST_TYPE}

        public constructor(${args.printInput}) {
          this._${c.REQUEST_NAME} = ${c.REQUEST_NAME}
        }
      }`,
    "\n",
  ]);
}
