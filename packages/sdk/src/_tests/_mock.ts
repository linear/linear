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
  res: <Spec extends MockSpec>(spec: Spec) => MockResult<Spec>;
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
  /** Input for the mocked response */
  spec: Spec;
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

  beforeAll(async done => {
    /** Initialise the test server */
    const port = await getPort();
    ctx.server = express();
    ctx.server.use(body.json());
    ctx.nodeServer = createServer();
    ctx.nodeServer.listen({ port });
    ctx.nodeServer.on("request", ctx.server);
    ctx.nodeServer.once("listening", done);
    ctx.url = `http://localhost:${port}`;

    /** Provide function for mocking the response */
    ctx.res = function createMockResponse<Spec extends MockSpec>(spec: Spec) {
      const requests: CapturedRequest[] = [];

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

      return { spec, requests };
    };
  });

  afterAll(done => {
    /** Stop the test server */
    ctx.nodeServer.close(done);
  });

  return ctx;
}
