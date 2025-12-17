import crypto from "crypto";
import express from "express";
import getPort from "get-port";
import http from "http";
import { v4 as uuidv4 } from "uuid";
import { describe, expect, it } from "vitest";
import {
  LINEAR_WEBHOOK_SIGNATURE_HEADER,
  LinearWebhookClient,
  LinearWebhookPayload,
  LinearWebhookEventTypeMap,
} from "../webhooks/index.js";

export interface SignedBody {
  body: Buffer;
  signature: string;
}

interface EntityIds {
  actorId: string;
  orgId: string;
  webhookId: string;
}

describe("webhooks handlers", () => {
  it("wildcard '*' listens to both Issue and Comment events (fetch-style)", async () => {
    const secret = "SECRET";
    const client = new LinearWebhookClient(secret);
    const handler = client.createHandler();

    const { payload: issuePayload, ids: issueIds } = generateIssuePayload();
    const { payload: commentPayload, ids: commentIds } = generateCommentPayload();
    const expectedIds = [issueIds.actorId, commentIds.actorId].sort();

    const receivedActorIds: string[] = [];
    handler.on("*", evt => {
      expect(evt.action).toBe("create");
      const actorId = (evt as unknown as { actor?: { id?: string } }).actor?.id;
      if (actorId) {
        receivedActorIds.push(actorId);
      }
    });

    const { body: issueBody, signature: issueSig } = createSignedBody(secret, issuePayload);
    const issueHeaders = new Map<string, string>([
      [LINEAR_WEBHOOK_SIGNATURE_HEADER, issueSig],
      ["content-type", "application/json"],
    ]);
    const issueReq = {
      method: "POST",
      headers: { get: (key: string) => issueHeaders.get(key.toLowerCase()) ?? null },
      arrayBuffer: async () => issueBody,
    } as unknown as Request;
    const issueRes = await handler(issueReq);
    expect(issueRes.status).toBe(200);
    expect(await issueRes.text()).toBe("OK");

    const { body: commentBody, signature: commentSig } = createSignedBody(secret, commentPayload);
    const commentHeaders = new Map<string, string>([
      [LINEAR_WEBHOOK_SIGNATURE_HEADER, commentSig],
      ["content-type", "application/json"],
    ]);
    const commentReq = {
      method: "POST",
      headers: { get: (key: string) => commentHeaders.get(key.toLowerCase()) ?? null },
      arrayBuffer: async () => commentBody,
    } as unknown as Request;
    const commentRes = await handler(commentReq);
    expect(commentRes.status).toBe(200);
    expect(await commentRes.text()).toBe("OK");

    expect(receivedActorIds.sort()).toEqual(expectedIds);
  });

  it("listens to 'Issue' and 'Comment' events and validates actor.id (fetch-style)", async () => {
    const secret = "SECRET";
    const client = new LinearWebhookClient(secret);
    const handler = client.createHandler();

    const { payload: issuePayload, ids: issueIds } = generateIssuePayload();
    const { payload: commentPayload, ids: commentIds } = generateCommentPayload();
    const expectedIssueActorId = issueIds.actorId;
    const expectedCommentActorId = commentIds.actorId;

    let issueHandled = false;
    let commentHandled = false;

    handler.on("Issue", evt => {
      expect(evt.type).toBe("Issue");
      expect(evt.action).toBe("create");
      const actorId = (evt as unknown as { actor: { id: string } }).actor.id;
      expect(actorId).toBe(expectedIssueActorId);
      issueHandled = true;
    });

    handler.on("Comment", evt => {
      expect(evt.type).toBe("Comment");
      expect(evt.action).toBe("create");
      const actorId = (evt as unknown as { actor: { id: string } }).actor.id;
      expect(actorId).toBe(expectedCommentActorId);
      commentHandled = true;
    });

    const { body: issueBody, signature: issueSig } = createSignedBody(secret, issuePayload);
    const issueHeaders = new Map<string, string>([
      [LINEAR_WEBHOOK_SIGNATURE_HEADER, issueSig],
      ["content-type", "application/json"],
    ]);
    const issueReq = {
      method: "POST",
      headers: { get: (key: string) => issueHeaders.get(key.toLowerCase()) ?? null },
      arrayBuffer: async () => issueBody,
    } as unknown as Request;
    const issueRes = await handler(issueReq);
    expect(issueRes.status).toBe(200);
    expect(await issueRes.text()).toBe("OK");

    const { body: commentBody, signature: commentSig } = createSignedBody(secret, commentPayload);
    const commentHeaders = new Map<string, string>([
      [LINEAR_WEBHOOK_SIGNATURE_HEADER, commentSig],
      ["content-type", "application/json"],
    ]);
    const commentReq = {
      method: "POST",
      headers: { get: (key: string) => commentHeaders.get(key.toLowerCase()) ?? null },
      arrayBuffer: async () => commentBody,
    } as unknown as Request;
    const commentRes = await handler(commentReq);
    expect(commentRes.status).toBe(200);
    expect(await commentRes.text()).toBe("OK");

    expect(issueHandled).toBe(true);
    expect(commentHandled).toBe(true);
  });

  it("wildcard '*' listens to both Issue and Comment events (express server)", async () => {
    const secret = "SECRET";
    const client = new LinearWebhookClient(secret);
    const handler = client.createHandler();
    const app = express();
    const port = await getPort();
    const receivedActorIds: string[] = [];
    handler.on("*", evt => {
      expect(evt.action).toBe("create");
      const actorId = (evt as unknown as { actor?: { id?: string } }).actor?.id;
      if (actorId) {
        receivedActorIds.push(actorId);
      }
    });
    app.post("/", (req, res) => {
      void handler(req, res);
    });
    const server = app.listen(port);
    try {
      const { payload: issuePayload, ids: issueIds } = generateIssuePayload();
      const { body: issueBody, signature: issueSig } = createSignedBody(secret, issuePayload);
      const issueResult = await httpPost(port, "/", { [LINEAR_WEBHOOK_SIGNATURE_HEADER]: issueSig }, issueBody);
      expect(issueResult.status).toBe(200);
      expect(issueResult.text).toBe("OK");

      const { payload: commentPayload, ids: commentIds } = generateCommentPayload();
      const { body: commentBody, signature: commentSig } = createSignedBody(secret, commentPayload);
      const commentResult = await httpPost(port, "/", { [LINEAR_WEBHOOK_SIGNATURE_HEADER]: commentSig }, commentBody);
      expect(commentResult.status).toBe(200);
      expect(commentResult.text).toBe("OK");

      const expectedIds = [issueIds.actorId, commentIds.actorId].sort();
      expect(receivedActorIds.sort()).toEqual(expectedIds);
    } finally {
      server.close();
      handler.removeAllListeners();
    }
  });

  it("listens to 'Issue' and 'Comment' specifically (express server)", async () => {
    const secret = "SECRET";
    const client = new LinearWebhookClient(secret);
    const handler = client.createHandler();
    const app = express();
    const port = await getPort();

    const { payload: issuePayload, ids: issueIds } = generateIssuePayload();
    const { payload: commentPayload, ids: commentIds } = generateCommentPayload();
    const expectedIssueActorId = issueIds.actorId;
    const expectedCommentActorId = commentIds.actorId;
    let issueHandled = false;
    let commentHandled = false;

    handler.on("Issue", evt => {
      expect(evt.type).toBe("Issue");
      expect(evt.action).toBe("create");
      const actorId = (evt as unknown as { actor: { id: string } }).actor.id;
      expect(actorId).toBe(expectedIssueActorId);
      issueHandled = true;
    });
    handler.on("Comment", evt => {
      expect(evt.type).toBe("Comment");
      expect(evt.action).toBe("create");
      const actorId = (evt as unknown as { actor: { id: string } }).actor.id;
      expect(actorId).toBe(expectedCommentActorId);
      commentHandled = true;
    });

    app.post("/", (req, res) => {
      void handler(req, res);
    });
    const server = app.listen(port);
    try {
      const { body: issueBody, signature: issueSig } = createSignedBody(secret, issuePayload);
      const issueResult = await httpPost(port, "/", { [LINEAR_WEBHOOK_SIGNATURE_HEADER]: issueSig }, issueBody);
      expect(issueResult.status).toBe(200);
      expect(issueResult.text).toBe("OK");

      const { body: commentBody, signature: commentSig } = createSignedBody(secret, commentPayload);
      const commentResult = await httpPost(port, "/", { [LINEAR_WEBHOOK_SIGNATURE_HEADER]: commentSig }, commentBody);
      expect(commentResult.status).toBe(200);
      expect(commentResult.text).toBe("OK");

      expect(issueHandled).toBe(true);
      expect(commentHandled).toBe(true);
    } finally {
      server.close();
      handler.removeAllListeners();
    }
  });
});

describe("webhook payload type", () => {
  it("contains a webhookId field", () => {
    type PayloadWebhookId = LinearWebhookPayload["webhookId"];
    type EventTypeWebhookId = LinearWebhookEventTypeMap[keyof LinearWebhookEventTypeMap]["webhookId"];

    // Here we are testing that these keys exist on the base webhook types, and that they are equal. The runtime
    // comparisons of these strings are a no-op, but type errors will be caught by build:types.
    expect<PayloadWebhookId>("").toBe<EventTypeWebhookId>("");
  });

  it("contains a webhookTimestamp field", () => {
    type PayloadWebhookId = LinearWebhookPayload["webhookTimestamp"];
    type EventTypeWebhookId = LinearWebhookEventTypeMap[keyof LinearWebhookEventTypeMap]["webhookTimestamp"];

    // Here we are testing that these keys exist on the base webhook types, and that they are equal. The runtime
    // comparisons of these numbers are a no-op, but type errors will be caught by build:types.
    expect<PayloadWebhookId>(0).toBe<EventTypeWebhookId>(0);
  });
});

function createSignedBody(secret: string, payload: Record<string, unknown>): SignedBody {
  const body = Buffer.from(JSON.stringify(payload));
  const signature = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return { body, signature };
}

async function httpPost(
  port: number,
  path: string,
  headers: Record<string, string>,
  body: Buffer
): Promise<{ status: number; text: string }> {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        method: "POST",
        hostname: "127.0.0.1",
        port,
        path,
        headers: { "content-type": "application/json", "content-length": Buffer.byteLength(body), ...headers },
      },
      res => {
        const chunks: Buffer[] = [];
        res.on("data", c => chunks.push(Buffer.from(c)));
        res.on("end", () => resolve({ status: res.statusCode || 0, text: Buffer.concat(chunks).toString() }));
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function createIssueIds(): EntityIds {
  return { actorId: uuidv4(), orgId: uuidv4(), webhookId: uuidv4() };
}

function createCommentIds(): EntityIds {
  return { actorId: uuidv4(), orgId: uuidv4(), webhookId: uuidv4() };
}

function generateIssuePayload(options?: { ids?: EntityIds; timestamp?: number }): {
  payload: Record<string, unknown>;
  ids: EntityIds;
} {
  const ids = options?.ids ?? createIssueIds();
  const payload: Record<string, unknown> = {
    type: "Issue",
    action: "create",
    actor: { id: ids.actorId },
    data: { foo: "bar" },
    organizationId: ids.orgId,
    createdAt: "2025-08-08T05:00:00.000Z",
    webhookId: ids.webhookId,
    webhookTimestamp: options?.timestamp ?? Date.now(),
  };
  return { payload, ids };
}

function generateCommentPayload(options?: { ids?: EntityIds; timestamp?: number }): {
  payload: Record<string, unknown>;
  ids: EntityIds;
} {
  const ids = options?.ids ?? createCommentIds();
  const payload: Record<string, unknown> = {
    type: "Comment",
    action: "create",
    actor: { id: ids.actorId },
    data: { foo: "bar" },
    organizationId: ids.orgId,
    createdAt: "2025-08-08T01:00:00.000Z",
    webhookId: ids.webhookId,
    webhookTimestamp: options?.timestamp ?? Date.now(),
  };
  return { payload, ids };
}
