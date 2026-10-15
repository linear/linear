import crypto from "crypto";
import type { IncomingMessage, ServerResponse } from "http";
import {
  LinearWebhookEventHandler,
  LinearWebhookEventType,
  LinearWebhookHandler,
  LinearWebhookHandlerOptions,
  LinearWebhookPayload,
} from "./types.js";

export const LINEAR_WEBHOOK_SIGNATURE_HEADER = "linear-signature";
export const LINEAR_WEBHOOK_TS_HEADER = "linear-timestamp";
export const LINEAR_WEBHOOK_TS_FIELD = "webhookTimestamp";
export const LINEAR_WEBHOOK_DEFAULT_MAX_BODY_BYTES = 5 * 1024 * 1024;

class WebhookBodyTooLargeError extends Error {}

/**
 * Internal abstraction that adapts request/response behavior across
 * Fetch API and Node.js HTTP runtimes.
 *
 * Not exported on purpose: this is an implementation detail of
 * `LinearWebhookClient` and should not be relied upon by SDK consumers.
 *
 * - `method`, `signature`, `timestamp` and `contentLength` expose the necessary request metadata.
 * - `readRawBody` defers reading/streaming the raw body until invoked and
 *   throws `WebhookBodyTooLargeError` once more than `maxBytes` are received.
 * - `send` unifies writing responses in both environments.
 */
interface HttpAdapter {
  method: string;
  signature: string | null;
  timestamp: string | null;
  contentLength: string | null;
  readRawBody: (maxBytes: number) => Promise<Buffer>;
  send: (status: number, body: string) => Response | void;
}

/**
 * Concatenates body chunks, throwing as soon as more than `maxBytes` have been received.
 * Throwing ends the `for await` loop, which cancels or destroys the underlying stream.
 */
async function readBodyWithLimit(chunks: AsyncIterable<Uint8Array | string>, maxBytes: number): Promise<Buffer> {
  const buffers: Buffer[] = [];
  let size = 0;
  for await (const chunk of chunks) {
    const buffer = Buffer.from(chunk);
    size += buffer.length;
    if (size > maxBytes) {
      throw new WebhookBodyTooLargeError();
    }
    buffers.push(buffer);
  }
  return Buffer.concat(buffers, size);
}

/**
 * Iterates a Fetch API body stream, cancelling it if iteration stops early.
 */
async function* iterateBodyStream(stream: ReadableStream<Uint8Array>): AsyncIterable<Uint8Array> {
  const reader = stream.getReader();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
}

/**
 * Client for handling Linear webhook requests with helpers.
 */
export class LinearWebhookClient {
  /**
   * Creates a new LinearWebhookClient instance
   * @param secret The webhook signing secret. See https://linear.app/developers/webhooks#securing-webhooks.
   */
  public constructor(private secret: string) {
    if (typeof secret !== "string" || secret.length === 0) {
      throw new TypeError("LinearWebhookClient: secret must be a non-empty string");
    }
  }

  /**
   * Creates a webhook handler function that can process Linear webhook requests
   * @param options Optional handler settings, such as the maximum accepted body size.
   * @returns A webhook handler function with event registration capabilities.
   * Supports both Fetch API `(request: Request) => Promise<Response>` and
   * Node.js `(request: IncomingMessage, response: ServerResponse) => Promise<void>`
   */
  public createHandler(options?: LinearWebhookHandlerOptions): LinearWebhookHandler {
    const maxBodyBytes = options?.maxBodyBytes ?? LINEAR_WEBHOOK_DEFAULT_MAX_BODY_BYTES;
    if (!Number.isSafeInteger(maxBodyBytes) || maxBodyBytes <= 0) {
      throw new TypeError("LinearWebhookClient: maxBodyBytes must be a positive integer");
    }
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

        if (Number(adapter.contentLength) > maxBodyBytes) {
          return adapter.send(413, "Payload too large");
        }

        const rawBody = await adapter.readRawBody(maxBodyBytes);

        let parsedPayload: LinearWebhookPayload;
        try {
          parsedPayload = this.parseVerifiedPayload(rawBody, signature, adapter.timestamp);
        } catch {
          return adapter.send(400, "Invalid webhook");
        }

        const allHandlers = this.collectHandlers(eventHandlers, parsedPayload.type);
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await Promise.all(allHandlers.map(h => h(parsedPayload)));
        return adapter.send(200, "OK");
      } catch (error) {
        if (error instanceof WebhookBodyTooLargeError) {
          return adapter.send(413, "Payload too large");
        }
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
   * The body is not read until `readRawBody` is invoked, and is streamed with a size limit.
   *
   * @param request - Fetch API `Request`
   * @returns Helpers to read input and send responses in a unified way
   */
  private createFetchAdapter(request: Request): HttpAdapter {
    return {
      method: request.method,
      signature: request.headers.get(LINEAR_WEBHOOK_SIGNATURE_HEADER),
      timestamp: request.headers.get(LINEAR_WEBHOOK_TS_HEADER),
      contentLength: request.headers.get("content-length"),
      readRawBody: async maxBytes =>
        request.body
          ? readBodyWithLimit(iterateBodyStream(request.body), maxBytes)
          : Buffer.from(await request.arrayBuffer()),
      send: (status, body) => new Response(body, { status }),
    };
  }

  /**
   * Creates an HTTP adapter for Node.js HTTP runtimes.
   * The body stream is consumed with a size limit when `readRawBody` is invoked.
   *
   * @param incomingMessage - Node.js `IncomingMessage`
   * @param res - Node.js `ServerResponse` used to write the response
   * @returns Helpers to read input and send responses in a unified way
   */
  private createNodeAdapter(incomingMessage: IncomingMessage, res: ServerResponse): HttpAdapter {
    const signatureHeader = incomingMessage.headers[LINEAR_WEBHOOK_SIGNATURE_HEADER];
    const signature = Array.isArray(signatureHeader)
      ? (signatureHeader[0] ?? null)
      : ((signatureHeader ?? null) as string | null);
    const timestampHeader = incomingMessage.headers[LINEAR_WEBHOOK_TS_HEADER];
    const timestamp = Array.isArray(timestampHeader)
      ? (timestampHeader[0] ?? null)
      : ((timestampHeader ?? null) as string | null);
    return {
      method: incomingMessage.method || "",
      signature,
      timestamp,
      contentLength: incomingMessage.headers["content-length"] ?? null,
      readRawBody: maxBytes => readBodyWithLimit(incomingMessage, maxBytes),
      send: (status, body) => {
        if (!incomingMessage.complete) {
          // Close the connection instead of keeping it open for a body that was not read.
          res.setHeader("Connection", "close");
        }
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
   * Parses the JSON body and verifies signature and signed body timestamp.
   *
   * Throws if the JSON is invalid, the signature is invalid, or the timestamp check fails.
   *
   * @param rawBody - Raw request body as a Buffer
   * @param signature - The value of the `linear-signature` header
   * @param timestampHeader - Legacy timestamp header; verify() only trusts the signed body timestamp.
   * @returns The verified and parsed webhook payload
   */
  private parseVerifiedPayload(
    rawBody: Buffer,
    signature: string,
    timestampHeader: string | null
  ): LinearWebhookPayload {
    const parsedBody = this.parseBodyAsWebhookPayload(rawBody);
    const timestamp = parsedBody.webhookTimestamp ?? timestampHeader;

    const verified = this.verify(rawBody, signature, timestamp);
    if (!verified) {
      throw new Error("Invalid webhook signature");
    }

    return parsedBody;
  }

  /**
   * Parses the raw body as a webhook payload with typing.
   *
   * @param rawBody - Raw request body as a Buffer
   * @returns Parsed webhook payload object
   */
  private parseBodyAsWebhookPayload(rawBody: Buffer): LinearWebhookPayload & { webhookTimestamp?: number } {
    return JSON.parse(rawBody.toString());
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
   * Throws if the signature is invalid or the signed body timestamp is missing or invalid.
   *
   * @param rawBody The webhook request raw body
   * @param signature The signature to verify
   * @param timestamp Deprecated and ignored. Only webhookTimestamp in the signed body is trusted.
   * @returns True if the signature is valid
   */
  public verify(rawBody: Buffer, signature: string, timestamp?: number | string): boolean {
    const verificationBuffer = Buffer.from(crypto.createHmac("sha256", this.secret).update(rawBody).digest("hex"));
    const signatureBuffer = Buffer.from(signature);

    if (verificationBuffer.length !== signatureBuffer.length) {
      throw new Error("Invalid webhook signature");
    }

    if (!crypto.timingSafeEqual(verificationBuffer, signatureBuffer)) {
      throw new Error("Invalid webhook signature");
    }

    // Only the timestamp in the signed body can establish freshness.
    timestamp = this.parseBodyAsWebhookPayload(rawBody)?.webhookTimestamp;
    if (timestamp === undefined || timestamp === null) {
      throw new Error("Missing webhook timestamp");
    }
    if (typeof timestamp !== "number" || !Number.isFinite(timestamp)) {
      throw new Error("Invalid webhook timestamp");
    }
    const timeDiff = Math.abs(Date.now() - timestamp);
    // Throw error if more than one minute delta between provided ts and current time
    if (timeDiff > 1000 * 60) {
      throw new Error("Invalid webhook timestamp");
    }

    return true;
  }

  /**
   * Parse and verify webhook data, throwing an error if the signature or given timestamp is invalid.
   *
   * @param rawBody The webhook request raw body
   * @param signature The signature to verify
   * @param timestamp Deprecated and ignored. Only webhookTimestamp in the signed body is trusted.
   */
  public parseData(rawBody: Buffer, signature: string, timestamp?: number | string): LinearWebhookPayload {
    const verified = this.verify(rawBody, signature, timestamp);
    if (!verified) {
      throw new Error("Invalid webhook signature");
    }

    return this.parseBodyAsWebhookPayload(rawBody);
  }
}
