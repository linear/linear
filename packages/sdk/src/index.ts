import { LinearWebhookClient } from "./webhooks";

export * from "./index_umd";

/**
 * @deprecated LinearWebhooks has been renamed: use LinearWebhookClient from `@linear/sdk/webhooks` instead. This alias will be removed in a future version.
 */
export const LinearWebhooks = LinearWebhookClient;
