import crypto from "crypto";
import { LinearWebhookClient, LINEAR_WEBHOOK_TS_FIELD } from "../webhooks";

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

  describe("verify", () => {
    it("incorrect signature, should fail verification", async () => {
      const webhook = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "WRONG_SECRET").update(rawBody).digest("hex");
      expect(() => webhook.verify(rawBody, signature)).toThrowError("Invalid webhook signature");
    });

    it("correct signature, invalid timestamp should fail verification", async () => {
      const webhook = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
      const invalidTimestamp = new Date().getTime() - 1_000_000;
      expect(() => webhook.verify(rawBody, signature, invalidTimestamp)).toThrowError("Invalid webhook timestamp");
    });

    it("correct signature, no timestamp, should pass verification", async () => {
      const webhook = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
      expect(() => webhook.verify(rawBody, signature)).toBeTruthy();
    });

    it("correct signature, correct timestamp should pass verification", async () => {
      const webhook = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
      expect(() =>
        webhook.verify(rawBody, signature, (parsedBody as Record<string, number>)[LINEAR_WEBHOOK_TS_FIELD])
      ).toBeTruthy();
    });
  });

  describe("parseData", () => {
    it("should return the parsed payload if valid", () => {
      const client = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
      const payload = client.parseData(rawBody, signature);
      expect(payload).toEqual(parsedBody);
    });

    it("should throw an error if the signature is invalid", () => {
      const client = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "WRONG_SIGNATURE").update(rawBody).digest("hex");
      expect(() => client.parseData(rawBody, signature)).toThrowError("Invalid webhook signature");
    });

    it("should throw an error if the timestamp is invalid", () => {
      const client = new LinearWebhookClient("SECRET");
      const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
      const invalidTimestamp = new Date().getTime() - 1_000_000;
      expect(() => client.parseData(rawBody, signature, invalidTimestamp)).toThrowError("Invalid webhook timestamp");
    });
  });
});
