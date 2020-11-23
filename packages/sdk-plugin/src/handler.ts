import c from "./constants";
import { printDocBlock } from "./print";

// {
//   data?: T;
//   extensions?: any;
//   headers: Dom.Headers;
//   status: number;
//   errors?: GraphQLError[];
// }m

/**
 * Catch and handle any errors from the sdk function
 */
export function printSdkHandler(): string {
  return `
    ${printDocBlock(["The available Linear sdk statuses"])}
    export enum ${c.STATUS_TYPE} {
      ${printDocBlock(["The request has been successful"])}
      "success" = "success",
      ${printDocBlock(["The request has returned an error"])}
      "error" = "error",
    }
    
    ${printDocBlock(["The wrapped response type from calling a successful Linear sdk operation"])}
    export interface ${c.RESPONSE_TYPE}<T, V> {
      ${printDocBlock(["The status of the graphql operation call"])}
      status: ${c.STATUS_TYPE}
      ${printDocBlock(["The http status code of the graphql operation call"])}
      statusCode?: number
      ${printDocBlock(["The data returned from a successful call"])}
      data?: T
      ${printDocBlock(["The graphql extensions returned on error"])}
      extensions?: any
      ${printDocBlock(["The graphql errors caught when executing the graphql operation"])}
      errors?: GraphQLError[]
      ${printDocBlock(["The error caught when executing the graphql operation"])}
      error?: Error
      ${printDocBlock(["The query causing the error when executing the graphql operation"])}
      query?: string
      ${printDocBlock(["The variables causing the error when executing the graphql operation"])}
      variables?: V
    }

    ${printDocBlock([
      `Runs the operation and wraps the result in a ${c.RESPONSE_TYPE}`,
      "Catches errors and attaches them to the response object",
    ])}
    export async function ${c.HANDLER_NAME}<T, V>(operation: () => Promise<T>): Promise<${c.RESPONSE_TYPE}<T, V>> {
      try {
        const ${c.RESPONSE_NAME} = await operation()
        return {
          status: ${c.STATUS_TYPE}.success,
          statusCode: 200,
          data: ${c.RESPONSE_NAME},
        }
      } catch (error) {
        return {
          status: ${c.STATUS_TYPE}.error,
          statusCode: error?.response?.status ?? undefined,
          extensions: error?.response?.extensions ?? undefined,
          errors: error?.response?.errors ?? undefined,
          query: error?.request?.query ?? undefined,
          variables: error?.request?.variables ?? undefined,
          error,
        }
      }
    }
  `;
}
