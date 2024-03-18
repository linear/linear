import { DocumentNode } from "graphql/language/ast";
import { parseLinearError } from "./error";
import { LinearGraphQLClient } from "./graphql-client";
import { LinearClientOptions, LinearClientParsedOptions } from "./types";
import { serializeUserAgent } from "./utils";
import { Connection, LinearFetch, LinearSdk, Request } from "./_generated_sdk";
import { Node } from "./_generated_documents";

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
      "No accessToken or apiKey provided to the LinearClient - create one here: https://linear.app/settings/api"
    );
  }

  return {
    headers: {
      /** Use bearer if oauth token exists, otherwise use the provided apiKey */
      Authorization: accessToken
        ? accessToken.startsWith("Bearer ")
          ? accessToken
          : `Bearer ${accessToken}`
        : apiKey ?? "",
      /** Use configured headers */
      ...headers,
      /** Override any user agent with the sdk name and version */
      "User-Agent": serializeUserAgent({
        [process.env.npm_package_name ?? "@linear/sdk"]: process.env.npm_package_version ?? "unknown",
      }),
    },
    /** Default to production linear api */
    apiUrl: apiUrl ?? "https://api.linear.app/graphql",
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

    super(<Data, Variables extends Record<string, unknown>>(doc: DocumentNode, vars?: Variables) =>
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
