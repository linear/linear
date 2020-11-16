import c from "./constants";
import { printArgList } from "./utils";

/**
 * Return a function string taking at least a requester and sdk wrapper
 *
 * @param name the name of the function
 * @param type the name of the type of the function
 * @param initialArgs any additional args to be used at the start of the function definition
 * @param content the string to inject into the function
 */
export function getApiFunction(name: string, type: string, initialArgs: string, content: string): string {
  const args = printArgList([
    initialArgs,
    `${c.REQUESTER_NAME}: ${c.REQUESTER_TYPE}<C>`,
    `${c.WRAPPER_NAME}: ${c.WRAPPER_TYPE} = ${c.WRAPPER_DEFAULT_NAME}`,
  ]);

  return `
    export function ${name}<C>(${args}) {
      return {
        ${content}
      };
    }
    
    export type ${type} = ReturnType<typeof ${name}>;
  `;
}
