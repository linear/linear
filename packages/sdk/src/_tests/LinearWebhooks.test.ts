import { LinearWebhooks, LINEAR_WEBHOOK_TS_FIELD } from "../webhooks";
import crypto from "crypto";

describe("webhooks", () => {
  let parsedBody = {};
  let rawBody: Buffer;
  let requestBody = {};

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
      webhookTimestamp: 1677611643000,
    };

    rawBody = Buffer.from(JSON.stringify(requestBody));
    parsedBody = JSON.parse(rawBody.toString());
  });

  it("incorrect signature, should fail verification", async () => {
    const webhook = new LinearWebhooks("SECRET");
    const signature = crypto.createHmac("sha256", "WRONG_SECRET").update(rawBody).digest("hex");
    expect(() => webhook.verify(rawBody, signature)).toThrowError("Invalid webhook signature");
  });

  it("correct signature, incorrect timestamp should fail verification", async () => {
    const webhook = new LinearWebhooks("SECRET");
    const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
    expect(() => webhook.verify(rawBody, signature, parsedBody[LINEAR_WEBHOOK_TS_FIELD])).toThrowError(
      "Invalid webhook timestamp"
    );
  });

  it("correct signature, no timestamp, should pass verification", async () => {
    const webhook = new LinearWebhooks("SECRET");
    const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
    expect(() => webhook.verify(rawBody, signature)).toBeTruthy();
  });

  it("correct signature, correct timestamp should pass verification", async () => {
    requestBody["webhookTimestamp"] = new Date().getTime();
    rawBody = Buffer.from(JSON.stringify(requestBody));
    parsedBody = JSON.parse(rawBody.toString());

    const webhook = new LinearWebhooks("SECRET");
    const signature = crypto.createHmac("sha256", "SECRET").update(rawBody).digest("hex");
    expect(() => webhook.verify(rawBody, signature, parsedBody[LINEAR_WEBHOOK_TS_FIELD])).toBeTruthy();
  });
});
