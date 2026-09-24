/* eslint-disable */
import { LinearClient } from "@linear/sdk";
import { LinearWebhookClient } from "@linear/sdk/webhooks";

console.log("✓ SDK imported successfully");

// Basic smoke test - verify the SDK can be imported and instantiated
const client = new LinearClient({ apiKey: "test-key" });
const webhooks = new LinearWebhookClient("test-secret");

console.log("✓ LinearClient instantiated");
console.log("✓ LinearWebhookClient instantiated");
console.log("Smoke test passed!");
