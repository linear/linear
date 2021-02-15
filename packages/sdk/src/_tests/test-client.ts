import { logger } from "@linear/common";
import dotenv from "dotenv";
import execa, { ExecaChildProcess } from "execa";
import getPort from "get-port";
import { promisify } from "util";
import { LinearClient } from "../index";

const log = "client:test-client";

/** Load environment variables */
dotenv.config();

/** Initialize mock server variable */
let mockServer: ExecaChildProcess;

export async function startTestClient(): Promise<LinearClient> {
  /** Determine whether to use production or a mock server */
  if (Boolean(process.env.E2E)) {
    logger.info(log, "Using Linear API production endpoint for end-to-end test");

    /** Create Linear client with production server endpoint */
    return new LinearClient({
      apiKey: process.env.E2E_API_KEY,
    });
  } else {
    /** Create sleep function */
    const sleep = promisify(setTimeout);

    /** Get a port for the mock server */
    const port = await getPort();

    /** Start the mock server */
    try {
      logger.info(log, `Using mock server on http://localhost:${port}/graphql`);
      mockServer = execa("npx", ["graphql-faker", "packages/sdk/src/schema.graphql", `-p ${port}`]);
    } catch (error) {
      logger.fatal(log, error);
      throw new Error(`${log} Failed to start the mock server`);
    }

    /** Wait for mock server to start */
    await sleep(1000);

    /** Create Linear client with mock server endpoint */
    return new LinearClient({
      apiKey: "test",
      apiUrl: `http://localhost:${port}/graphql`,
    });
  }
}

export function stopTestClient(): void {
  /** Kill the mock server */
  try {
    if (mockServer) {
      mockServer.kill("SIGTERM", {
        forceKillAfterTimeout: 2000,
      });
    }
  } catch (error) {
    logger.fatal(log, error);
    throw new Error(`${log} Failed to kill the mock server`);
  }
}
