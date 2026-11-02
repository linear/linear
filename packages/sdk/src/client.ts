import { createDPoPFetch } from "./oauth/dpop.js";
import { parseLinearError } from "./error.js";
import { LinearGraphQLClient } from "./graphql-client.js";
import { LinearClientOptions, LinearClientParsedOptions, LinearGraphQLClientOptions } from "./types.js";
import { mergeHeaders, serializeUserAgent } from "./utils.js";
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
 * Resolve how requests authenticate: a static Authorization header, or a per-request DPoP fetch
 */
function parseAuth({
  apiKey,
  accessToken,
  dpopSigner,
}: Pick<LinearClientOptions, "apiKey" | "accessToken" | "dpopSigner">): Pick<
  LinearGraphQLClientOptions,
  "headers" | "fetch"
> {
  if (dpopSigner) {
    if (!accessToken || apiKey) {
      throw new Error("LinearClient dpopSigner requires an OAuth accessToken and cannot be used with an apiKey");
    }
    if (accessToken.startsWith("Bearer ")) {
      throw new Error("LinearClient dpopSigner requires the raw accessToken, without a Bearer prefix");
    }
    return { fetch: createDPoPFetch(dpopSigner, accessToken) };
  }

  if (!accessToken && !apiKey) {
    throw new Error(
      "No accessToken or apiKey provided to the LinearClient - create one here: https://linear.app/settings/account/security"
    );
  }

  return {
    headers: {
      /** Use bearer if oauth token exists, otherwise use the provided apiKey */
      Authorization: accessToken
        ? accessToken.startsWith("Bearer ")
          ? accessToken
          : `Bearer ${accessToken}`
        : (apiKey ?? ""),
    },
  };
}

/**
 * Validate and return default LinearGraphQLClient options
 *
 * @param options initial request options to pass to the graphql client
 * @returns parsed graphql client options, and the fetch to send requests with
 */
function parseClientOptions({
  apiKey,
  accessToken,
  dpopSigner,
  apiUrl,
  headers,
  ...opts
}: LinearClientOptions): LinearClientParsedOptions & Pick<LinearGraphQLClientOptions, "fetch"> {
  const auth = parseAuth({ apiKey, accessToken, dpopSigner });

  const resolvedApiUrl = apiUrl ?? "https://api.linear.app/graphql";
  validateApiUrl(resolvedApiUrl);

  return {
    headers: mergeHeaders(
      auth.headers,
      /** Use configured headers */
      headers,
      {
        /** Override any user agent with the sdk name and version */
        "User-Agent": serializeUserAgent({
          [process.env.npm_package_name ?? "@linear/sdk"]: process.env.npm_package_version ?? "unknown",
        }),
      }
    ),
    fetch: auth.fetch,
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
    const { fetch, ...parsedOptions } = parseClientOptions(options);
    const graphQLClient = new LinearGraphQLClient(parsedOptions.apiUrl, { ...parsedOptions, fetch });

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
