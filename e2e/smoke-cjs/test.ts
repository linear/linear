/* eslint-disable */
import { LinearClient } from "@linear/sdk";

// Basic smoke test - verify the SDK can be imported and instantiated
const client = new LinearClient({ apiKey: "test-key" });

console.log("✓ SDK imported successfully");
console.log("✓ LinearClient instantiated");
console.log("Smoke test passed!");
