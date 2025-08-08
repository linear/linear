import { LinearWebhookClient, LINEAR_WEBHOOK_SIGNATURE_HEADER } from "../webhooks";
import http from "http";
import crypto from "crypto";
import getPort from "get-port";
import express from "express";
import { Response } from "node-fetch";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).Response = Response;

export interface SignedBody {
  body: Buffer;
  signature: string;
}

describe("webhooks handlers", () => {
  it("works with a fetch-style handler", async () => {
    const secret = "SECRET";
    const client = new LinearWebhookClient(secret);
    const handler = client.createHandler();

    const p = { ...samplePayload, webhookTimestamp: Date.now() };
    const { body, signature } = createSignedBody(secret, p);

    const headers = new Map<string, string>([
      [LINEAR_WEBHOOK_SIGNATURE_HEADER, signature],
      ["content-type", "application/json"],
    ]);
    const reqLike = {
      method: "POST",
      headers: { get: (key: string) => headers.get(key.toLowerCase()) ?? null },
      arrayBuffer: async () => body,
    } as unknown as Request;

    let handled = false;
    handler.on("*", evt => {
      expect(evt.action).toBe("create");
      handled = true;
    });
    const res = await handler(reqLike);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("OK");
    expect(handled).toBe(true);
  });

  it("works with a express server", async () => {
    const secret = "SECRET";
    const client = new LinearWebhookClient(secret);
    const handler = client.createHandler();
    const app = express();
    const port = await getPort();
    let handled = false;
    handler.on("*", evt => {
      expect(evt.action).toBe("create");
      handled = true;
    });
    app.post("/", (req, res) => {
      void handler(req, res);
    });
    const server = app.listen(port);
    try {
      const p = { ...samplePayload, webhookTimestamp: Date.now() };
      const { body, signature } = createSignedBody(secret, p);
      const result = await httpPost(port, "/", { [LINEAR_WEBHOOK_SIGNATURE_HEADER]: signature }, body);
      expect(result.status).toBe(200);
      expect(result.text).toBe("OK");
      expect(handled).toBe(true);
    } finally {
      server.close();
      handler.removeAllListeners();
    }
  });
});

export function createSignedBody(secret: string, payload: Record<string, unknown>): SignedBody {
  const body = Buffer.from(JSON.stringify(payload));
  const signature = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return { body, signature };
}

export async function httpPost(
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

export function makePayload(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  const base = { type: "Comment", webhookTimestamp: Date.now(), action: "create", data: { id: "1" } };
  return { ...base, ...overrides };
}

export const samplePayload = {
  action: "create",
  actor: {
    id: "87e5416f-db4e-4065-8a8b-ed02bb899c66",
    // fields redacted
  },
  data: {
    foo: "bar",
    // fields redacted
  },
  type: "Issue",
  organizationId: "01988821-102e-7031-a367-7b8cbd1e2bb9",
  createdAt: "2025-08-08T05:19:34.327Z",
  webhookId: "01988820-ff6f-7398-b31e-108ebea6d6a2",
  webhookTimestamp: undefined, // removed on purpose - requires dynamic value for signing
  // fields redacted
};
