import crypto from "crypto";
import type { IncomingMessage, ServerResponse } from "http";
import { LinearWebhookEventHandler, LinearWebhookEventType, LinearWebhookHandler, LinearWebhookPayload } from "./types";

export const LINEAR_WEBHOOK_SIGNATURE_HEADER = "linear-signature";
export const LINEAR_WEBHOOK_TS_FIELD = "webhookTimestamp";

/**
 * Internal abstraction that adapts request/response behavior across
 * Fetch API and Node.js HTTP runtimes.
 *
 * Not exported on purpose: this is an implementation detail of
 * `LinearWebhookClient` and should not be relied upon by SDK consumers.
 *
 * - `method` and `signature` expose the necessary request metadata.
 * - `readRawBody` defers reading/streaming the raw body until invoked.
 * - `send` unifies writing responses in both environments.
 */
interface HttpAdapter {
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
      const adapter = this.getHttpAdapter(requestOrMessage, response);

      try {
        if (adapter.method !== "POST") {
          return adapter.send(405, "Method not allowed");
        }

        const signature = adapter.signature;
        if (!signature) {
          return adapter.send(400, "Missing webhook signature");
        }

        const rawBody = await adapter.readRawBody();

        let parsedPayload: LinearWebhookPayload;
        try {
          parsedPayload = this.parseData(rawBody, signature);
        } catch {
          return adapter.send(400, "Invalid webhook");
        }

        const allHandlers = this.collectHandlers(eventHandlers, parsedPayload.type);
        await Promise.all(allHandlers.map(h => h(parsedPayload)));
        return adapter.send(200, "OK");
      } catch {
        return adapter.send(500, "Internal server error");
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
    return (
      typeof value === "object" &&
      value !== null &&
      "arrayBuffer" in value &&
      typeof Reflect.get(value, "arrayBuffer") === "function"
    );
  }

  /**
   * Creates an HTTP adapter for Fetch-based runtimes.
   * The body is not read until `readRawBody` is invoked.
   *
   * @param request - Fetch API `Request`
   * @returns Helpers to read input and send responses in a unified way
   */
  private createFetchAdapter(request: Request): HttpAdapter {
    return {
      method: request.method,
      signature: request.headers.get(LINEAR_WEBHOOK_SIGNATURE_HEADER),
      readRawBody: async () => Buffer.from(await request.arrayBuffer()),
      send: (status, body) => new Response(body, { status }),
    };
  }

  /**
   * Creates an HTTP adapter for Node.js HTTP runtimes.
   * The body stream is consumed when `readRawBody` is invoked.
   *
   * @param incomingMessage - Node.js `IncomingMessage`
   * @param res - Node.js `ServerResponse` used to write the response
   * @returns Helpers to read input and send responses in a unified way
   */
  private createNodeAdapter(incomingMessage: IncomingMessage, res: ServerResponse): HttpAdapter {
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
   * Selects and constructs the appropriate HTTP adapter for the
   * provided request type (Fetch or Node.js HTTP).
   *
   * @param requestOrMessage - A Fetch `Request` or Node.js `IncomingMessage`
   * @param response - Node.js `ServerResponse` (required for Node path)
   * @returns An HTTP adapter with unified IO helpers
   */
  private getHttpAdapter(requestOrMessage: Request | IncomingMessage, response?: ServerResponse): HttpAdapter {
    return this.isFetchRequest(requestOrMessage)
      ? this.createFetchAdapter(requestOrMessage)
      : this.createNodeAdapter(requestOrMessage as IncomingMessage, response as ServerResponse);
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
   *
   * Throws an error if the signature or timestamp is invalid.
   *
   * @param rawBody The webhook request raw body
   * @param signature The signature to verify
   * @param timestamp The `webhookTimestamp` field from the request parsed body
   * @returns True if the signature is valid
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
   * Parse and verify webhook data, throwing an error if the signature or timestamp is invalid.
   *
   * @param rawBody The webhook request raw body
   * @param signature The signature to verify
   * @param timestamp Optional timestamp override. If not provided, uses `webhookTimestamp` from the parsed body
   */
  public parseData(rawBody: Buffer, signature: string, timestamp?: number): LinearWebhookPayload {
    const parsedBody = JSON.parse(rawBody.toString()) as LinearWebhookPayload & { webhookTimestamp?: number };

    // Use provided timestamp as override, otherwise use timestamp from payload
    const verified = this.verify(rawBody, signature, timestamp ?? parsedBody.webhookTimestamp);
    if (!verified) {
      throw new Error("Invalid webhook signature");
    }

    return parsedBody;
  }
}
