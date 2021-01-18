import { DocumentNode, print } from "graphql";
import { GraphQLClient } from "graphql-request";
import { RequestInit } from "graphql-request/dist/types.dom";
import { serializeUserAgent } from "./utils";
import { LinearSdk } from "./_generated/sdk";

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
 * @param options initial sdk options
 * @returns parsed graphql-request options
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
 * @param options initial sdk options to pass to the graphql client
 * @returns an sdk for interacting with the Linear api
 */
export class LinearClient extends LinearSdk {
  public options: LinearClientParsedOptions;
  public client: GraphQLClient;

  public constructor(_options: LinearClientOptions) {
    const options = parseClientOptions(_options);
    const { baseUrl, ...opts } = options;
    const client = new GraphQLClient(baseUrl, opts);

    super(<R, V>(doc: DocumentNode, vars?: V) => {
      const query = print(doc);
      return this.client.request<R, V>(query, vars);
    });

    this.options = options;
    this.client = client;
  }
}
