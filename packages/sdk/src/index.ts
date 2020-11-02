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
import { createRawLinearSdk } from "./_generated/schema-sdk";
>>>>>>> Add tests for sdk wrapper

export * from "./_generated/schema-sdk";

export interface LinearSdkOptions {
  apiKey: string;
  baseUrl?: string;
}

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

  return createRawLinearSdk(<R, V>(doc: DocumentNode, vars?: V) => {
    const query = print(doc);
    return client.request<R, V>(query, vars);
  });
}
>>>>>>> Add tests for sdk wrapper
