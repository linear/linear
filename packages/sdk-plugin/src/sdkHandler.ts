import c from "./constants";

/**
 * Catch and handle any errors from the sdk function
 */
export function getSdkHandler(): string {
  return `
    export enum ${c.STATUS_TYPE} {
      "success" = "success",
      "error" = "error",
    }
    
    export interface ${c.RESPONSE_TYPE}<T> {
      status: ${c.STATUS_TYPE};
      data?: T;
      error?: Error;
    }
    
    export type ${c.HANDLER_TYPE}<T> = () => Promise<${c.RESPONSE_TYPE}<T>>;

    export function ${c.HANDLER_NAME}<T>(sdkFunction: () => Promise<T>): ${c.HANDLER_TYPE}<T> {
      return async function handler() {
        try {
          const response = await sdkFunction();
          return {
            status: ${c.STATUS_TYPE}.success,
            data: response,
          };
        } catch (error) {
          return {
            status: ${c.STATUS_TYPE}.error,
            error,
          };
        }
      };
    }
  `;
}
