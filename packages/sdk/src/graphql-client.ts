import { DocumentNode } from "graphql/language/ast";
import { print } from "graphql/language/printer";
import isoFetch from "isomorphic-unfetch";
import { parseLinearError } from "./error";
import { GraphQLRequestContext, LinearRawResponse } from "./types";

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
      request,
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

    const fetch = globalThis.fetch ?? isoFetch;
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        ...(typeof body === "string" ? { "Content-Type": "application/json" } : {}),
        ...resolveHeaders(headers),
        ...resolveHeaders(requestHeaders),
      },
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
    document: DocumentNode | string,
    variables?: Variables,
    requestHeaders?: RequestInit["headers"]
  ): Promise<Data> {
    const { headers, ...others } = this.options;
    const query = typeof document === "string" ? document : print(document);

    const body = JSON.stringify({ query, variables });

    const response = await isoFetch(this.url, {
      method: "POST",
      headers: {
        ...(typeof body === "string" ? { "Content-Type": "application/json" } : {}),
        ...resolveHeaders(headers),
        ...resolveHeaders(requestHeaders),
      },
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
    const { headers } = this.options;

    if (headers) {
      // todo what if headers is in nested array form... ?
      (headers as Record<string, string>)[key] = value;
    } else {
      this.options.headers = { [key]: value };
    }

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

/**
 * Convert the given headers configuration into a plain object.
 */
function resolveHeaders(headers: RequestInit["headers"]): Record<string, string> {
  let oHeaders: Record<string, string> = {};
  if (headers) {
    if (typeof Headers !== "undefined" && headers instanceof Headers) {
      oHeaders = headersToObject(headers);
    } else if (Array.isArray(headers)) {
      headers.forEach(([name, value]) => {
        oHeaders[name] = value;
      });
    } else {
      oHeaders = headers as Record<string, string>;
    }
  }

  return oHeaders;
}

/**
 * Convert Headers instance into regular object
 */
function headersToObject(headers: Response["headers"]): Record<string, string> {
  const o: Record<string, string> = {};
  headers.forEach((v, k) => {
    o[k] = v;
  });
  return o;
}
