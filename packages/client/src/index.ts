import { DocumentNode, print } from "graphql";
import { GraphQLClient } from "graphql-request";
import { RequestInit } from "graphql-request/dist/types.dom";
import { serializeUserAgent } from "./utils";
import { LinearSdk } from "./_generated/sdk";

export * from "./_generated/documents";
export * from "./_generated/sdk";

/**
 * Input options for creating a Linear sdk with graphql-request
 */
export interface LinearClientOptions extends RequestInit {
  /** Personal api token generated from https://linear.app/settings/api */
  apiKey?: string;
  /** The access token returned from oauth endpoints configured in https://linear.app/settings/api */
  accessToken?: string;
  /** The url to the Linear graphql api */
  baseUrl?: string;
}

/**
 * Validated graphql-request client options
 */
export interface LinearClientParsedOptions extends RequestInit {
  /** The url to the Linear graphql api defaulted to production */
  baseUrl: string;
}

/**
 * Validate and return default graphql-request client options
 *
 * @param options initial request options to pass to the graphql client
 * @returns parsed graphql client options
 */
function parseClientOptions({ apiKey, accessToken, baseUrl, ...opts }: LinearClientOptions): LinearClientParsedOptions {
  if (!accessToken && !apiKey) {
    throw new Error("No accessToken or apiKey provided");
  }

  return {
    headers: {
      /** Use bearer if oauth token exists, otherwise use the provided apiKey */
      Authorization: accessToken ? `Bearer ${accessToken}` : apiKey ?? "",
      ...opts.headers,
      /** Override any user agent with the sdk name and version */
      "User-Agent": serializeUserAgent({
        [process.env.npm_package_name ?? "@linear/client"]: process.env.npm_package_version ?? "unknown",
      }),
    },
    /** Default to production linear api */
    baseUrl: baseUrl ?? "https://api.linear.app/graphql",
    ...opts,
  };
}

/**
 * Create a Linear API client
 *
 * @param options request options to pass to the graphql client
 * @returns SDK for interacting with the Linear API
 */
export class LinearClient extends LinearSdk {
  public options: LinearClientParsedOptions;
  public client: GraphQLClient;

  public constructor(options: LinearClientOptions) {
    const opts = parseClientOptions(options);
    const client = new GraphQLClient(opts.baseUrl, opts);

    super(<R, V>(doc: DocumentNode, vars?: V) => this.client.request<R, V>(print(doc), vars));

    this.options = opts;
    this.client = client;
  }
}
