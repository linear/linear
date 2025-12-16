import { beforeAll, afterAll } from "vitest";
import body from "body-parser";
import express, { Application, Request } from "express";
import getPort from "get-port";
import { createServer, Server } from "http";
import { JsonObject } from "type-fest";

/** Mock key used to test auth */
export const MOCK_API_KEY = "mock-api-key";

type CapturedRequest = Pick<Request, "headers" | "method" | "body">;

/**
 * Test server for returning mocked responses
 */
type MockContext = {
  /** Raw express application */
  server: Application;
  /** Raw test server */
  nodeServer: Server;
  /** Url to listen on */
  url: string;
  /** Mock result returned from the test server */
  res: <Spec extends MockSpec>(specFn: () => Spec) => MockResult<Spec>;
};

/**
 * Description of the mocked response to return
 */
interface MockSpec {
  /** The headers to return from the test request */
  headers?: Record<string, string>;
  /** The body data to return from the test request */
  body?: JsonObject;
}

/**
 * Returned result from a call to the test server
 */
interface MockResult<Spec extends MockSpec> {
  /** Input function for the mocked response */
  specFn: () => Spec;
  /** A list of all requests made to the test server */
  requests: {
    method: string;
    headers: Record<string, string | string[] | undefined>;
    body: JsonObject;
  }[];
}

/**
 *  Create and return a mocked express server for testing
 */
export function createTestServer(): MockContext {
  const ctx = {} as MockContext;
  const requests: CapturedRequest[] = [];
  let mockResponseFn: () => MockSpec;

  beforeAll(async () => {
    /** Initialise the test server */
    const port = await getPort();
    ctx.server = express();
    ctx.server.use(body.json());
    ctx.nodeServer = createServer();
    ctx.nodeServer.listen({ port });
    ctx.nodeServer.on("request", ctx.server);

    const isListening = new Promise(resolve => {
      ctx.nodeServer.once("listening", resolve);
    });

    ctx.url = `http://localhost:${port}`;

    /** Listen to all routes */
    ctx.server.use("*", function mock(req, res) {
      if (req.headers.authorization !== MOCK_API_KEY) {
        /** Handle invalid auth headers */
        res.sendStatus(401);
      } else {
        req.headers.host = "DYNAMIC";

        /** Record test request */
        requests.push({
          method: req.method,
          headers: req.headers,
          body: req.body,
        });

        const spec = mockResponseFn();

        /** Set response headers */
        if (spec?.headers) {
          Object.entries(spec.headers).forEach(([name, value]) => {
            res.setHeader(name, value);
          });
        }

        /** Return a valid response with mocked response body */
        res.send(spec?.body ?? { data: {} });
      }
    });

    /** Provide function for mocking the response */
    ctx.res = function createMockResponse<Spec extends MockSpec>(specFn: () => Spec) {
      mockResponseFn = specFn;
      return { specFn, requests };
    };

    await isListening;
  });

  afterAll(async () => {
    /** Stop the test server */
    await new Promise(resolve => {
      ctx.nodeServer.close(resolve);
    });
  });

  return ctx;
}
