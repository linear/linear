import { Linear } from "@linear/sdk";
import { getApiKey } from "./config";

export const client = new Linear({
  apiKey: getApiKey(),
});
