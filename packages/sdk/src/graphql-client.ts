import { print } from "graphql/language/printer.js";
import { parseLinearError } from "./error.js";
import { GraphQLRequestContext, LinearRawResponse } from "./types.js";
import { mergeHeaders } from "./utils.js";

/**
 * Identical class to graphql-request ClientError
 * Ensures parseLinearError is compatible with custom graphql-request clients
 *
 * @param response the raw response from the Linear API
 * @param request information about the request resulting in the error
 */
export class GraphQLClientError<Data, Variables extends Record<string, unknown>> extends Error {
  public response: LinearRawResponse<Data>;
  public request: GraphQLRequestContext<Variables>;

  public constructor(response: LinearRawResponse<Data>, request: GraphQLRequestContext<Variables>) {
    const message = `${GraphQLClientError.extractMessage(response)}: ${JSON.stringify({
      response,
      request: { query: request.query },
    })}`;

    super(message);

    Object.setPrototypeOf(this, GraphQLClientError.prototype);

    this.response = response;
    this.request = request;

    // this is needed as Safari doesn't support .captureStackTrace
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, GraphQLClientError);
    }
  }

  private static extractMessage(response: LinearRawResponse<unknown>): string {
    try {
      return response.errors?.[0]?.message ?? `GraphQL Error (Code: ${response.status})`;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return `GraphQL Error (Code: ${response.status})`;
    }
  }
}

/**
 * Create an isomorphic GraphQL client
 * Originally forked from graphql-request to remove the external dependency
 *
 * @param url base url to send the request to
 * @param options the request options
 */
export class LinearGraphQLClient {
  private url: string;
  private options: RequestInit;

  public constructor(url: string, options?: RequestInit) {
    this.url = url;
    this.options = options || {};
  }

  public async rawRequest<Data, Variables extends Record<string, unknown>>(
    query: string,
    variables?: Variables,
    requestHeaders?: RequestInit["headers"]
  ): Promise<LinearRawResponse<Data>> {
    const { headers, ...others } = this.options;
    const body = JSON.stringify({ query, variables });

    const fetch = globalThis.fetch;
    const response = await fetch(this.url, {
      method: "POST",
      headers: mergeHeaders(
        typeof body === "string" ? { "Content-Type": "application/json" } : {},
        headers,
        requestHeaders
      ),
      body,
      ...others,
    });

    const result = await getResult<Data>(response);

    if (typeof result !== "string" && response.ok && !result.errors && result.data) {
      return { ...result, headers: response.headers, status: response.status };
    } else {
      throw parseLinearError(
        new GraphQLClientError(
          {
            ...(typeof result === "string" ? { error: result } : result),
            status: response.status,
            headers: response.headers,
          },
          { query, variables }
        )
      );
    }
  }

  /**
   * Send a GraphQL document to the server.
   */
  public async request<Data, Variables extends Record<string, unknown>>(
    document: string,
    variables?: Variables,
    requestHeaders?: RequestInit["headers"]
  ): Promise<Data> {
    const { headers, ...others } = this.options;
    const query = typeof document === "string" ? document : print(document);

    const body = JSON.stringify({ query, variables });

    const response = await fetch(this.url, {
      method: "POST",
      headers: mergeHeaders(
        typeof body === "string" ? { "Content-Type": "application/json" } : {},
        headers,
        requestHeaders
      ),
      body,
      ...others,
    });

    const result = await getResult<Data>(response);

    if (typeof result !== "string" && response.ok && !result.errors && result.data) {
      return result.data;
    } else {
      throw new GraphQLClientError(
        {
          ...(typeof result === "string" ? { error: result } : result),
          status: response.status,
          headers: response.headers,
        },
        { query, variables }
      );
    }
  }

  public setHeaders(headers: RequestInit["headers"]): LinearGraphQLClient {
    this.options.headers = headers;
    return this;
  }

  /**
   * Attach a header to the client. All subsequent requests will have this header.
   */
  public setHeader(key: string, value: string): LinearGraphQLClient {
    this.options.headers = mergeHeaders(this.options.headers, { [key]: value });
    return this;
  }
}

/**
 * Parse the raw response
 *
 * @param response raw response from the Linear API
 */
function getResult<Data>(response: Response): Promise<LinearRawResponse<Data> | string> {
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.startsWith("application/json")) {
    return response.json();
  } else {
    return response.text();
  }
}
