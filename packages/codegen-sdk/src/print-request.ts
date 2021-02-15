import {
  ArgDefinition,
  getArgList,
  getOptionalVariables,
  getRequiredVariables,
  printComment,
  printLines,
  printList,
} from "@linear/codegen-doc";
import { Sdk } from "./constants";
import { SdkOperation } from "./types";

/**
 * Get the argument definition for the requester
 */
export function getRequestArg(): ArgDefinition {
  return {
    name: Sdk.REQUEST_NAME,
    optional: false,
    type: Sdk.REQUEST_TYPE,
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
      return `{ ${requiredArg}, ...${Sdk.VARIABLE_NAME} }`;
    } else {
      return `{ ${requiredArg} }`;
    }
  }

  return optionalVariables.length ? Sdk.VARIABLE_NAME : "{}";
}

/**
 * Print the exported requester type
 */
export function printRequest(): string {
  const args = getArgList([getRequestArg()]);

  return printLines([
    "\n",
    printComment([`The function for calling the graphql client`]),
    `export type ${Sdk.REQUEST_TYPE} = <${printList([Sdk.RESPONSE_TYPE, Sdk.VARIABLE_TYPE])}>(doc: DocumentNode, ${
      Sdk.VARIABLE_NAME
    }?: ${Sdk.VARIABLE_TYPE}) => Promise<${Sdk.RESPONSE_TYPE}>`,
    "\n",
    printComment(["Base class to provide a request function", ...args.jsdoc]),
    `export class ${Sdk.REQUEST_CLASS} {
        protected _${Sdk.REQUEST_NAME}: ${Sdk.REQUEST_TYPE}

        public constructor(${args.printInput}) {
          this._${Sdk.REQUEST_NAME} = ${Sdk.REQUEST_NAME}
        }
      }`,
    "\n",
  ]);
}
