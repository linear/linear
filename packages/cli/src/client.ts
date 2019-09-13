import { Linear } from "@linear/sdk";

if (!process.env.LINEAR_API_KEY) {
  throw new Error("Expected LINEAR_API_KEY env var to be set, but it wasn't");
}

export const client = new Linear({
  apiKey: process.env.LINEAR_API_KEY,
});
