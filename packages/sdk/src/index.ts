import { DocumentNode, print } from "graphql";
import { GraphQLClient } from "graphql-request";
import { createRawLinearSdk } from "./_generated/schema-sdk";

export * from "./_generated/schema-sdk";

export interface LinearSdkOptions {
  apiKey: string;
  baseUrl?: string;
}

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
