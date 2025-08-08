import crypto from "crypto";
import type { IncomingMessage, ServerResponse } from "http";
import { LinearWebhookPayload, LinearWebhookEventHandler, LinearWebhookHandler, LinearWebhookEventType } from "./types";

export const LINEAR_WEBHOOK_SIGNATURE_HEADER = "linear-signature";
export const LINEAR_WEBHOOK_TS_FIELD = "webhookTimestamp";

/**
 * Internal abstraction that normalizes request/response behavior across
 * Fetch API and Node.js HTTP runtimes.
 *
 * Not exported on purpose: this is an implementation detail of
 * `LinearWebhookClient` and should not be relied upon by SDK consumers.
 *
 * - `method` and `signature` expose the necessary request metadata.
 * - `readRawBody` defers reading/streaming the raw body until invoked.
 * - `send` unifies writing responses in both environments.
 */
interface NormalizedEnv {
  method: string;
  signature: string | null;
  readRawBody: () => Promise<Buffer>;
  send: (status: number, body: string) => Response | void;
}

/**
 * Client for handling Linear webhook requests with helpers.
 */
export class LinearWebhookClient {
  /**
   * Creates a new LinearWebhookClient instance
   * @param secret The webhook signing secret. See https://linear.app/developers/webhooks#securing-webhooks.
   */
  public constructor(private secret: string) {}

  /**
   * Creates a webhook handler function that can process Linear webhook requests
   * @returns A webhook handler function with event registration capabilities.
   * Supports both Fetch API `(request: Request) => Promise<Response>` and
   * Node.js `(request: IncomingMessage, response: ServerResponse) => Promise<void>`
   */
  public createHandler(): LinearWebhookHandler {
    const eventHandlers = new Map<string, LinearWebhookEventHandler<LinearWebhookPayload>[]>();

    const handler = async (
      requestOrMessage: Request | IncomingMessage,
      response?: ServerResponse
    ): Promise<Response | void> => {
      const env = this.getEnv(requestOrMessage, response);

      try {
        if (env.method !== "POST") {
          return env.send(405, "Method not allowed");
        }

        const signature = env.signature;
        if (!signature) {
          return env.send(400, "Missing webhook signature");
        }

        const rawBody = await env.readRawBody();

        let parsedPayload: LinearWebhookPayload;
        try {
          parsedPayload = this.parseVerifiedPayload(rawBody, signature);
        } catch {
          return env.send(400, "Invalid webhook");
        }

        const allHandlers = this.collectHandlers(eventHandlers, parsedPayload.type);
        await Promise.all(allHandlers.map(h => h(parsedPayload)));
        return env.send(200, "OK");
      } catch {
        return env.send(500, "Internal server error");
      }
    };

    handler.on = function <T extends LinearWebhookEventType>(
      eventType: T,
      eventHandler: LinearWebhookEventHandler<Extract<LinearWebhookPayload, { type: T }>>
    ): void {
      const handlers = eventHandlers.get(eventType) || [];
      handlers.push(eventHandler as LinearWebhookEventHandler<LinearWebhookPayload>);
      eventHandlers.set(eventType, handlers);
    };

    handler.off = function <T extends LinearWebhookEventType>(
      eventType: T,
      eventHandler: LinearWebhookEventHandler<Extract<LinearWebhookPayload, { type: T }>>
    ): void {
      const handlers = eventHandlers.get(eventType);
      if (handlers) {
        const index = handlers.indexOf(eventHandler as LinearWebhookEventHandler<LinearWebhookPayload>);
        if (index > -1) {
          handlers.splice(index, 1);
          if (handlers.length === 0) {
            eventHandlers.delete(eventType);
          }
        }
      }
    };

    handler.removeAllListeners = function (eventType?: string): void {
      if (eventType) {
        eventHandlers.delete(eventType);
      } else {
        eventHandlers.clear();
      }
    };

    return handler as LinearWebhookHandler;
  }

  /**
   * Determines whether the provided value is a Fetch API `Request`.
   * Used as a type guard to select the appropriate runtime path.
   *
   * @param value - Unknown request-like value
   * @returns True if `value` is a Fetch API `Request`
   */
  private isFetchRequest(value: unknown): value is Request {
    const candidate = value as { arrayBuffer?: unknown } | null | undefined;
    return typeof candidate?.arrayBuffer === "function";
  }

  /**
   * Creates a normalized environment for Fetch-based runtimes.
   * The body is not read until `readRawBody` is invoked.
   *
   * @param request - Fetch API `Request`
   * @returns Helpers to read input and send responses in a unified way
   */
  private createFetchEnv(request: Request): NormalizedEnv {
    return {
      method: request.method,
      signature: request.headers.get(LINEAR_WEBHOOK_SIGNATURE_HEADER),
      readRawBody: async () => Buffer.from(await request.arrayBuffer()),
      send: (status, body) => new Response(body, { status }),
    };
  }

  /**
   * Creates a normalized environment for Node.js HTTP runtimes.
   * The body stream is consumed when `readRawBody` is invoked.
   *
   * @param incomingMessage - Node.js `IncomingMessage`
   * @param res - Node.js `ServerResponse` used to write the response
   * @returns Helpers to read input and send responses in a unified way
   */
  private createNodeEnv(incomingMessage: IncomingMessage, res: ServerResponse): NormalizedEnv {
    const headerValue = incomingMessage.headers[LINEAR_WEBHOOK_SIGNATURE_HEADER];
    const signature = Array.isArray(headerValue) ? (headerValue[0] ?? null) : ((headerValue ?? null) as string | null);
    return {
      method: incomingMessage.method || "",
      signature,
      readRawBody: async () => {
        const chunks: Buffer[] = [];
        for await (const chunk of incomingMessage) {
          chunks.push(Buffer.from(chunk));
        }
        return Buffer.concat(chunks);
      },
      send: (status, body) => {
        res.statusCode = status;
        res.end(body);
      },
    };
  }

  /**
   * Selects and constructs the appropriate normalized environment for the
   * provided request type (Fetch or Node.js HTTP).
   *
   * @param requestOrMessage - A Fetch `Request` or Node.js `IncomingMessage`
   * @param response - Node.js `ServerResponse` (required for Node path)
   * @returns A normalized environment with unified IO helpers
   */
  private getEnv(requestOrMessage: Request | IncomingMessage, response?: ServerResponse): NormalizedEnv {
    return this.isFetchRequest(requestOrMessage)
      ? this.createFetchEnv(requestOrMessage)
      : this.createNodeEnv(requestOrMessage as IncomingMessage, response as ServerResponse);
  }

  /**
   * Parses the JSON body and verifies signature and optional timestamp.
   * Throws if the JSON is invalid, the signature is invalid, or the timestamp
   * check fails.
   *
   * @param rawBody - Raw request body as a Buffer
   * @param signature - The value of the `linear-signature` header
   * @returns The verified and parsed webhook payload
   */
  private parseVerifiedPayload(rawBody: Buffer, signature: string): LinearWebhookPayload {
    const parsedBody = JSON.parse(rawBody.toString()) as { webhookTimestamp?: number };
    return this.parseData(rawBody, signature, parsedBody.webhookTimestamp);
  }

  /**
   * Returns the list of handlers to invoke for a given event type,
   * including both specific and wildcard handlers.
   *
   * @param eventHandlers - Internal registry of event handlers
   * @param eventType - The webhook `type` field from the payload
   * @returns Ordered list of handlers to be executed
   */
  private collectHandlers(
    eventHandlers: Map<string, LinearWebhookEventHandler<LinearWebhookPayload>[]>,
    eventType: string
  ): LinearWebhookEventHandler<LinearWebhookPayload>[] {
    const specificHandlers = eventHandlers.get(eventType) || [];
    const wildcardHandlers = eventHandlers.get("*") || [];
    return [...specificHandlers, ...wildcardHandlers];
  }

  /**
   * Verify the webhook signature
   * @param rawBody The webhook request raw body
   * @param signature The signature to verify
   * @param timestamp The `webhookTimestamp` field from the request parsed body
   */
  public verify(rawBody: Buffer, signature: string, timestamp?: number): boolean {
    const verificationBuffer = Buffer.from(crypto.createHmac("sha256", this.secret).update(rawBody).digest("hex"));
    const signatureBuffer = Buffer.from(signature);

    if (verificationBuffer.length !== signatureBuffer.length) {
      throw new Error("Invalid webhook signature");
    }

    if (!crypto.timingSafeEqual(verificationBuffer, signatureBuffer)) {
      throw new Error("Invalid webhook signature");
    }

    if (timestamp) {
      const timeDiff = Math.abs(new Date().getTime() - timestamp);
      // Throw error if more than one minute delta between provided ts and current time
      if (timeDiff > 1000 * 60) {
        throw new Error("Invalid webhook timestamp");
      }
    }

    return true;
  }

  /**
   * Parse and verify webhook data
   * @param rawBody The webhook request raw body
   * @param signature The signature to verify
   * @param timestamp The `webhookTimestamp` field from the request parsed body
   */
  public parseData(rawBody: Buffer, signature: string, timestamp?: number): LinearWebhookPayload {
    const verified = this.verify(rawBody, signature, timestamp);
    if (!verified) {
      throw new Error("Invalid webhook signature");
    }

    const parsedBody = JSON.parse(rawBody.toString());
    return parsedBody as LinearWebhookPayload;
  }
}
