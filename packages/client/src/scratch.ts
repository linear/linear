import { logger } from "@linear/common";
import * as dotenv from "dotenv";
import { LinearClient } from "./client";

/** Load environment variables */
dotenv.config();

/** Create async run function */
async function run() {
  /** Create a Linear client */
  const client = new LinearClient({ apiKey: process.env.E2E_API_KEY });

  /** Test implementation use... */
  const viewer = await client.viewer;
  logger.trace(viewer);
}

/** Execute the async run function */
try {
  run().catch(e => {
    logger.error(e);
  });
} catch (e) {
  logger.fatal(e);
}
