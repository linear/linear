import crypto from "crypto";
import { LinearWebhookPayload, LinearWebhookEventHandler, LinearWebhookHandler, LinearWebhookEventType } from "./types";

export const LINEAR_WEBHOOK_SIGNATURE_HEADER = "linear-signature";
export const LINEAR_WEBHOOK_TS_FIELD = "webhookTimestamp";

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
   * Returns `(request: Request) => Promise<Response>`
   */
  public createHandler(): LinearWebhookHandler {
    const eventHandlers = new Map<string, LinearWebhookEventHandler<LinearWebhookPayload>[]>();

    const handler = async (request: Request): Promise<Response> => {
      try {
        if (request.method !== "POST") {
          return new Response("Method not allowed", { status: 405 });
        }

        const signature = request.headers.get(LINEAR_WEBHOOK_SIGNATURE_HEADER);
        if (!signature) {
          return new Response("Missing webhook signature", { status: 400 });
        }

        const rawBody = Buffer.from(await request.arrayBuffer());
        let parsedPayload: LinearWebhookPayload;

        try {
          const parsedBody = JSON.parse(rawBody.toString());
          parsedPayload = this.parseData(rawBody, signature, parsedBody.webhookTimestamp);
        } catch (error) {
          return new Response("Invalid webhook", { status: 400 });
        }

        const eventType = parsedPayload.type;
        const specificHandlers = eventHandlers.get(eventType) || [];
        const wildcardHandlers = eventHandlers.get("*") || [];
        const allHandlers = [...specificHandlers, ...wildcardHandlers];

        await Promise.all(allHandlers.map(h => h(parsedPayload)));

        return new Response("OK", { status: 200 });
      } catch (error) {
        return new Response("Internal server error", { status: 500 });
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

/**
 * @deprecated LinearWebhooks has been renamed: use LinearWebhookClient instead. This alias will be removed in a future version.
 */
export const LinearWebhooks = LinearWebhookClient;
