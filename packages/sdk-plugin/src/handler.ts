import c from "./constants";
import { printDocBlock } from "./print";

/**
 * Catch and handle any errors from the sdk function
 */
export function getSdkHandler(): string {
  return `
    ${printDocBlock(["The available Linear sdk statuses"])}
    export enum ${c.STATUS_TYPE} {
      ${printDocBlock(["The request has been successful"])}
      "success" = "success",
      ${printDocBlock(["The request has returned an error"])}
      "error" = "error",
    }
    
    ${printDocBlock(["The wrapped response type from calling a Linear sdk operation"])}
    export interface ${c.RESPONSE_TYPE}<T> {
      status: ${c.STATUS_TYPE}
      data?: T
      error?: Error
    }

    ${printDocBlock([
      `Runs the operation and wraps the result in a ${c.RESPONSE_TYPE}`,
      "Catches errors and attaches them to the response object",
    ])}
    export async function ${c.HANDLER_NAME}<T>(operation: () => Promise<T>): Promise<${c.RESPONSE_TYPE}<T>> {
      try {
        const response = await operation()
        return {
          status: ${c.STATUS_TYPE}.success,
          data: response,
        }
      } catch (error) {
        return {
          status: ${c.STATUS_TYPE}.error,
          error,
        }
      }
    }
  `;
}
