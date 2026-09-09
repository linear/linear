import { parseLinearError } from "./error.js";
import { LinearGraphQLClient } from "./graphql-client.js";
import { LinearClientOptions, LinearClientParsedOptions } from "./types.js";
import { serializeUserAgent } from "./utils.js";
import { LinearSdk } from "./_generated_sdk.js";

const LOCAL_API_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

/**
 * Require encrypted API connections except for local development servers.
 */
function validateApiUrl(apiUrl: string): void {
  const { hostname, protocol } = new URL(apiUrl);

  if (protocol === "https:") {
    return;
  }

  if (protocol === "http:" && LOCAL_API_HOSTNAMES.has(hostname)) {
    return;
  }

  throw new Error("LinearClient apiUrl must use HTTPS unless it points to a local development server");
}

/**
 * Validate and return default LinearGraphQLClient options
 *
 * @param options initial request options to pass to the graphql client
 * @returns parsed graphql client options
 */
function parseClientOptions({
  apiKey,
  accessToken,
  apiUrl,
  headers,
  ...opts
}: LinearClientOptions): LinearClientParsedOptions {
  if (!accessToken && !apiKey) {
    throw new Error(
      "No accessToken or apiKey provided to the LinearClient - create one here: https://linear.app/settings/account/security"
    );
  }

  const resolvedApiUrl = apiUrl ?? "https://api.linear.app/graphql";
  validateApiUrl(resolvedApiUrl);

  return {
    headers: {
      /** Use bearer if oauth token exists, otherwise use the provided apiKey */
      Authorization: accessToken
        ? accessToken.startsWith("Bearer ")
          ? accessToken
          : `Bearer ${accessToken}`
        : (apiKey ?? ""),
      /** Use configured headers */
      ...headers,
      /** Override any user agent with the sdk name and version */
      "User-Agent": serializeUserAgent({
        [process.env.npm_package_name ?? "@linear/sdk"]: process.env.npm_package_version ?? "unknown",
      }),
    },
    /** Default to production linear api */
    apiUrl: resolvedApiUrl,
    ...opts,
  };
}

/**
 * Create a Linear API client
 *
 * @param options request options to pass to the LinearGraphQLClient
 */
export class LinearClient extends LinearSdk {
  public options: LinearClientParsedOptions;
  public client: LinearGraphQLClient;

  public constructor(options: LinearClientOptions) {
    const parsedOptions = parseClientOptions(options);
    const graphQLClient = new LinearGraphQLClient(parsedOptions.apiUrl, parsedOptions);

    super(<Data, Variables extends Record<string, unknown>>(doc: string, vars?: Variables) =>
      /** Call the LinearGraphQLClient */
      this.client.request<Data, Variables>(doc, vars).catch(error => {
        /** Catch and wrap errors from the LinearGraphQLClient */
        throw parseLinearError(error);
      })
    );

    this.options = parsedOptions;
    this.client = graphQLClient;
  }
}
