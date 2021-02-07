import { logger } from "@linear/common";
import * as dotenv from "dotenv";
import { LinearClient } from "./client";

/** Load environment variables */
dotenv.config();
const apiKey = process.env.E2E_API_KEY;

/** Create async run function */
async function run() {
  /** Create a Linear client */
  const client = new LinearClient({ apiKey });

  /** Test implementation use... */
  const viewer = await client.viewer;
  logger.trace(viewer);
  const graphqlRequestClient = client.client;
  graphqlRequestClient.setHeader("my-header", "value");
}

/** Execute the async run function */
try {
  run().catch(e => {
    logger.error(e);
  });
} catch (e) {
  logger.fatal(e);
}

// const client = new LinearClient({ apiKey });

// async function getCurrentUser(): Fetch<User> {
//   return client.viewer.catch(error => {});
// }
