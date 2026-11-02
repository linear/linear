import { LinearWebhookClient } from "./webhooks/index.js";

export * from "./client.js";
export * from "./error.js";
export * from "./graphql-client.js";
export * from "./types.js";
export * as LinearDocument from "./_generated_documents.js";
export * from "./_generated_sdk.js";

/**
 * @deprecated LinearWebhooks has been renamed: use LinearWebhookClient from `@linear/sdk/webhooks` instead. This alias will be removed in a future version.
 */
export const LinearWebhooks = LinearWebhookClient;
