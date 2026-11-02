/* eslint-disable */
import { LinearClient } from "@linear/sdk";
import { dpopSignerFromCryptoKeyPair } from "@linear/sdk/oauth";
import { LinearWebhookClient } from "@linear/sdk/webhooks";

console.log("✓ SDK imported successfully");

// Basic smoke test - verify the SDK can be imported and instantiated
const client = new LinearClient({ apiKey: "test-key" });
const webhooks = new LinearWebhookClient("test-secret");
if (typeof dpopSignerFromCryptoKeyPair !== "function") {
  throw new Error("dpopSignerFromCryptoKeyPair is not exported from @linear/sdk/oauth");
}

console.log("✓ LinearClient instantiated");
console.log("✓ LinearWebhookClient instantiated");
console.log("✓ OAuth helpers imported");
console.log("Smoke test passed!");
