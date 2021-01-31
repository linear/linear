import { DocumentNode, print } from "graphql";
import { GraphQLClient } from "graphql-request";
import { LinearError } from "./error";
import { LinearClientOptions, LinearClientParsedOptions } from "./types";
import { serializeUserAgent } from "./utils";
import { LinearSdk } from "./_generated/_gen_sdk";

/**
 * Validate and return default graphql-request client options
 *
 * @param options initial request options to pass to the graphql client
 * @returns parsed graphql client options
 */
function parseClientOptions({ apiKey, accessToken, apiUrl, ...opts }: LinearClientOptions): LinearClientParsedOptions {
  if (!accessToken && !apiKey) {
    throw new Error("No accessToken or apiKey provided to the LinearClient");
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
      ...opts.headers,
      /** Override any user agent with the sdk name and version */
      "User-Agent": serializeUserAgent({
        [process.env.npm_package_name ?? "@linear/client"]: process.env.npm_package_version ?? "unknown",
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
 * @param options request options to pass to the graphql-request client
 */
export class LinearClient extends LinearSdk {
  public options: LinearClientParsedOptions;
  public client: GraphQLClient;

  public constructor(options: LinearClientOptions) {
    const parsedOptions = parseClientOptions(options);
    const graphQLClient = new GraphQLClient(parsedOptions.apiUrl, parsedOptions);

    super(<R, V>(doc: DocumentNode, vars?: V) =>
      /** Call the graphql-request client */
      this.client.request<R, V>(print(doc), vars).catch(error => {
        /** Catch and wrap errors from the graphql-request client */
        throw new LinearError(error);
      })
    );

    this.options = parsedOptions;
    this.client = graphQLClient;
  }
}
