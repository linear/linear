import { describe, beforeEach, it, expect } from "vitest";
import crypto from "crypto";
import { LinearWebhookClient, LINEAR_WEBHOOK_TS_FIELD } from "../webhooks/index.js";

describe("webhooks", () => {
  let parsedBody = {};
  let rawBody: Buffer;
  let requestBody: Record<string, unknown> = {};

  beforeEach(() => {
    requestBody = {
      action: "create",
      data: {
        id: "2174add1-f7c8-44e3-bbf3-2d60b5ea8bc9",
        createdAt: "2020-01-23T12:53:18.084Z",
        updatedAt: "2020-01-23T12:53:18.084Z",
        archivedAt: null,
        body: "Indeed, I think this is definitely an improvement over the previous version.",
        edited: false,
        issueId: "539068e2-ae88-4d09-bd75-22eb4a59612f",
        userId: "aacdca22-6266-4c0a-ab3c-8fa70a26765c",
      },
      type: "Comment",
      url: "https://linear.app/issue/LIN-1778/foo-bar#comment-77217de3-fb52-4dad-bb9a-b356beb93de8",
      createdAt: "2020-01-23T12:53:18.084Z",
      webhookTimestamp: new Date().getTime(),
    };

    rawBody = Buffer.from(JSON.stringify(requestBody));
    parsedBody = JSON.parse(rawBody.toString());
  });

  describe("constructor", () => {
    it("should throw if the secret is an empty string", () => {
      expect(() => new LinearWebhookClient("")).toThrowError(/non-empty string/);
    });

    it("should throw if the secret is not a string", () => {
      expect(() => new LinearWebhookClient(undefined as unknown as string)).toThrowError(/non-empty string/);
      expect(() => new LinearWebhookClient(null as unknown as string)).toThrowError(/non-empty string/);
    });
  });

  it.each([undefined, null, 0, "", "not-a-number"])(
    "rejects signed timestamp %j even with a fresh external timestamp",
    timestamp => {
      const client = new LinearWebhookClient("SECRET");
      requestBody.webhookTimestamp = timestamp;
      const body = Buffer.from(JSON.stringify(requestBody));
      const signature = crypto.createHmac("sha256", "SECRET").update(body).digest("hex");
      const error =
        timestamp === undefined || timestamp === null ? "Missing webhook timestamp" : "Invalid webhook timestamp";
      expect(() => client.verify(body, signature, Date.now())).toThrowError(error);
      expect(() => client.parseData(body, signature, String(Date.now()))).toThrowError(error);
    }
  );

  describe("verify", () => {
    it("incorrect signature, should fail verification", async () => {
      const webhook = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "WRONG_SECRET").update(rawBody).digest("hex");
      expect(() => webhook.verify(rawBody, signature)).toThrowError("Invalid webhook signature");
    });

    it("correct signature, invalid timestamp should fail verification", async () => {
      const webhook = new LinearWebhookClient("SECRET");
      requestBody.webhookTimestamp = Date.now() - 1_000_000;
      rawBody = Buffer.from(JSON.stringify(requestBody));
      const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
      expect(() => webhook.verify(rawBody, signature, Date.now())).toThrowError("Invalid webhook timestamp");
    });

    it("correct signature, signed body timestamp without a separate argument should pass verification", async () => {
      const webhook = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
      expect(webhook.verify(rawBody, signature)).toBe(true);
    });

    it("correct signature, correct timestamp should pass verification", async () => {
      const webhook = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
      expect(webhook.verify(rawBody, signature, (parsedBody as Record<string, number>)[LINEAR_WEBHOOK_TS_FIELD])).toBe(
        true
      );
    });

    it("correct signature, string timestamp from header should pass verification", async () => {
      const webhook = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
      const timestampString = String(new Date().getTime());
      expect(webhook.verify(rawBody, signature, timestampString)).toBe(true);
    });

    it("fresh signed body ignores a stale timestamp header", async () => {
      const webhook = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
      const invalidTimestampString = String(new Date().getTime() - 1_000_000);
      expect(webhook.verify(rawBody, signature, invalidTimestampString)).toBe(true);
    });

    it("fresh signed body ignores a non-numeric timestamp header", async () => {
      const webhook = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
      expect(webhook.verify(rawBody, signature, "not-a-number")).toBe(true);
    });
  });

  describe("parseData", () => {
    it("should return the parsed payload if valid", () => {
      const client = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
      const payload = client.parseData(rawBody, signature);
      expect(payload).toEqual(parsedBody);
    });

    it("should return the parsed payload if valid and with a string timestamp from header", () => {
      const client = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
      const timestampString = String(new Date().getTime());
      const payload = client.parseData(rawBody, signature, timestampString);
      expect(payload).toEqual(parsedBody);
    });

    it("should throw an error if the signature is invalid", () => {
      const client = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "WRONG_SIGNATURE").update(rawBody).digest("hex");
      expect(() => client.parseData(rawBody, signature)).toThrowError("Invalid webhook signature");
    });

    it("should throw an error if the timestamp is invalid", () => {
      const client = new LinearWebhookClient("SECRET");
      requestBody.webhookTimestamp = Date.now() - 1_000_000;
      rawBody = Buffer.from(JSON.stringify(requestBody));
      const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
      expect(() => client.parseData(rawBody, signature, Date.now())).toThrowError("Invalid webhook timestamp");
    });
  });
});
