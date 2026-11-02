/* eslint-disable */
import { LinearClient } from "@linear/sdk";
import { createDPoPProof } from "@linear/sdk/oauth";
import { LinearWebhookClient } from "@linear/sdk/webhooks";

console.log("✓ SDK imported successfully (ESM)");

// Basic smoke test - verify the SDK can be imported and instantiated in ESM
const client = new LinearClient({ apiKey: "test-key" });
const webhooks = new LinearWebhookClient("test-secret");
if (typeof createDPoPProof !== "function") {
  throw new Error("createDPoPProof is not exported from @linear/sdk/oauth");
}

console.log("✓ LinearClient instantiated");
console.log("✓ LinearWebhookClient instantiated");
console.log("✓ OAuth helpers imported");
console.log("ESM smoke test passed!");
