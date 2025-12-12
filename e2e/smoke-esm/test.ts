/* eslint-disable */
import { LinearClient } from "@linear/sdk";

// Basic smoke test - verify the SDK can be imported and instantiated in ESM
const client = new LinearClient({ apiKey: "test-key" });

console.log("✓ SDK imported successfully (ESM)");
console.log("✓ LinearClient instantiated");
console.log("ESM smoke test passed!");
