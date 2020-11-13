<<<<<<< HEAD
<<<<<<< HEAD
export * from "./client";
export * from "./error";
export * from "./types";
export * as LinearDocument from "./_generated_documents";
export * from "./_generated_sdk";
=======
import schema from "./_generated/graphql.schema.json";
import * as types from "./_generated/schema-types";
import * as documents from "./_generated/schema-documents";
import * as sdk from "./_generated/schema-sdk";
=======
import { DocumentNode, print } from "graphql";
import { GraphQLClient } from "graphql-request";
import { RequestInit } from "graphql-request/dist/types.dom";
import { createRawLinearSdk } from "./_generated/schema-sdk";
>>>>>>> Add tests for sdk wrapper

export * from "./_generated/schema-sdk";

/**
 * Input options for creating a Linear sdk with graphql-request
 */
export interface LinearSdkOptions extends RequestInit {
  /** Personal api token generated from https://linear.app/settings/api */
  apiKey?: string;
  /** The access token returned from oauth endpoints configured in https://linear.app/settings/api */
  accessToken?: string;
  /** The url to the Linear graphql api */
  baseUrl?: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
export default {
  schema,
  types,
  documents,
  sdk,
};
>>>>>>> Initial sdk generation plugin
=======
export function createLinearSdk({
  apiKey,
  baseUrl = "https://api.linear.app/graphql",
}: LinearSdkOptions): ReturnType<typeof createRawLinearSdk> {
  const client = new GraphQLClient(baseUrl, { headers: { Authorization: apiKey } });
=======
/**
 * Validated graphql-request client options
 */
export interface LinearSdkParsedOptions extends RequestInit {
  /** The url to the Linear graphql api defaulted to production */
  baseUrl: string;
}

/**
 * Validate and return default graphql-request client options
 *
 * @param options initial sdk options
 * @returns parsed graphql-request options
 */
function parseClientOptions({ apiKey, accessToken, baseUrl, ...opts }: LinearSdkOptions): LinearSdkParsedOptions {
  if (!accessToken && !apiKey) {
    throw new Error("No accessToken or apiKey provided");
  }

  return {
    headers: {
      /** Use bearer if oauth token exists, otherwise use the provided apiKey */
      Authorization: accessToken ? `Bearer ${accessToken}` : apiKey ?? "",
      ...opts.headers,
    },
    /** Default to production linear api */
    baseUrl: baseUrl ?? "https://api.linear.app/graphql",
    ...opts,
  };
}

/**
 * Create a Linear sdk client
 *
 * @param options initial sdk options to be passed to the graphql client
 * @returns an sdk for interacting with the Linear api
 */
export function createLinearSdk(
  options: LinearSdkOptions
): ReturnType<typeof createRawLinearSdk> & { client: GraphQLClient } {
  const { baseUrl, ...opts } = parseClientOptions(options);
  const client = new GraphQLClient(baseUrl, opts);
>>>>>>> Expose client from sdk and handle oauth accessToken

  const sdk = createRawLinearSdk(<R, V>(doc: DocumentNode, vars?: V) => {
    const query = print(doc);
    return client.request<R, V>(query, vars);
  });

  return { ...sdk, client };
}
>>>>>>> Add tests for sdk wrapper
