import { describe, beforeEach, it, expect, vi } from "vitest";
import { JsonObject } from "type-fest";
import { LinearClient, LinearGraphQLClient } from "../index.js";
import { LinearErrorType } from "../types.js";
import { createTestServer, MOCK_API_KEY } from "./_mock.js";

const ctx = createTestServer();

describe("LinearClient", () => {
  beforeEach(() => {
    ctx.res(() => {
      return {
        body: {
          data: {
            viewer: { id: "viewerId" },
            team: {
              id: "teamId",
              labels: { nodes: [{ id: "labelId" }], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              states: { nodes: [{ id: "stateId" }], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            },
          },
        },
      };
    });
  });

  it.each([
    "https://api.example.com/graphql",
    "http://localhost:3000/graphql",
    "http://127.0.0.1:3000/graphql",
    "http://[::1]:3000/graphql",
  ])("accepts secure or local apiUrl value %s", apiUrl => {
    const client = new LinearClient({ apiKey: MOCK_API_KEY, apiUrl });

    expect(client.options.apiUrl).toEqual(apiUrl);
  });

  it.each([
    "http://api.example.com/graphql",
    "http://localhost.example.com/graphql",
    "http://localhost@api.example.com/graphql",
    "ftp://api.example.com/graphql",
  ])("rejects insecure non-local apiUrl value %s", apiUrl => {
    expect(() => new LinearClient({ apiKey: MOCK_API_KEY, apiUrl })).toThrow(
      "LinearClient apiUrl must use HTTPS unless it points to a local development server"
    );
  });

  it("makes query to apiUrl", async () => {
    const client = new LinearClient({ apiKey: MOCK_API_KEY, apiUrl: ctx.url });
    const response = await client.viewer;

    expect(response).toEqual(expect.objectContaining({ id: "viewerId" }));
  });

  it("supports overriding headers", async () => {
    const client = new LinearClient({ apiKey: MOCK_API_KEY, apiUrl: ctx.url, headers: { user: "asd" } });
    const response = await client.viewer;

    expect(response).toEqual(expect.objectContaining({ id: "viewerId" }));
  });

  it.each([
    ["Headers", new Headers({ "X-Test": "expected" })],
    ["array", [["X-Test", "expected"]]],
  ] as [string, HeadersInit][])("sends configured headers in %s form", async (_, headers) => {
    const { requests } = ctx.res(() => ({ body: { data: { viewer: { id: "viewerId" } } } }));
    const client = new LinearClient({ apiKey: MOCK_API_KEY, apiUrl: ctx.url, headers });
    await client.viewer;

    expect(requests.at(-1)?.headers["x-test"]).toEqual("expected");
  });

  it("setHeader replaces headers held in a Headers instance", async () => {
    const { requests } = ctx.res(() => ({ body: { data: { viewer: { id: "viewerId" } } } }));
    const client = new LinearGraphQLClient(ctx.url, { headers: new Headers({ Authorization: "old" }) });
    client.setHeader("Authorization", MOCK_API_KEY);
    await client.request("query { viewer { id } }");

    expect(requests.at(-1)?.headers.authorization).toEqual(MOCK_API_KEY);
  });

  it("sends requests through a custom fetch", async () => {
    const fetch = vi.fn((url: string, init: RequestInit) => {
      const headers = new Headers(init.headers);
      headers.set("Authorization", MOCK_API_KEY);
      return globalThis.fetch(url, { ...init, headers });
    });
    const client = new LinearGraphQLClient(ctx.url, { headers: { "X-Test": "expected" }, fetch });
    const response = await client.rawRequest<{ viewer: { id: string } }, Record<string, never>>(
      "query { viewer { id } }"
    );

    expect(response.data?.viewer).toEqual({ id: "viewerId" });
    expect(fetch).toHaveBeenCalledWith(
      ctx.url,
      expect.objectContaining({ method: "POST", headers: expect.objectContaining({ "X-Test": "expected" }) })
    );
    expect(fetch.mock.calls[0][1]).not.toHaveProperty("fetch");
  });

  it("has chained api", async () => {
    const client = new LinearClient({ apiKey: MOCK_API_KEY, apiUrl: ctx.url });
    const team = await client.team("someTeamId");
    const labels = await team.labels();
    const states = await team.states();

    expect(team).toEqual(expect.objectContaining({ id: "teamId" }));
    expect(labels.nodes).toEqual(expect.arrayContaining([expect.objectContaining({ id: "labelId" })]));
    expect(states.nodes).toEqual(expect.arrayContaining([expect.objectContaining({ id: "stateId" })]));
  });

  it("fails auth with incorrect api key", async () => {
    const client = new LinearClient({ apiKey: "asd", apiUrl: ctx.url });

    try {
      await client.viewer;
      expect.unreachable("Expected an authentication error");
    } catch (error) {
      expect(error.message).toContain("GraphQL Error (Code: 401) - Unauthorized");
      expect(error.type).toEqual(LinearErrorType.AuthenticationError);
    }
  });

  it("rawRequest fails auth with incorrect api key", async () => {
    const client = new LinearClient({ apiKey: "asd", apiUrl: ctx.url }).client;

    try {
      await client.rawRequest("");
      expect.unreachable("Expected an authentication error");
    } catch (error) {
      expect(error.message).toContain("GraphQL Error (Code: 401) - Unauthorized");
      expect(error.type).toEqual(LinearErrorType.AuthenticationError);
    }
  });

  it("supports pagination", async () => {
    const client = new LinearClient({ apiKey: MOCK_API_KEY, apiUrl: ctx.url });
    const team = await client.team("someTeamId");

    let requestCount = 0;

    const { requests } = ctx.res(() => {
      if (requestCount === 0) {
        requestCount++;
        return {
          body: {
            data: {
              viewer: { id: "viewerId" },
              team: {
                id: "teamId",
                labels: {
                  nodes: [{ id: "labelId" }],
                  pageInfo: { hasNextPage: true, hasPreviousPage: false, endCursor: "endCursorId" },
                },
                states: { nodes: [{ id: "stateId" }], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              },
            },
          },
        };
      } else if (requestCount === 1) {
        requestCount++;
        return {
          body: {
            data: {
              viewer: { id: "viewerId" },
              team: {
                id: "teamId",
                labels: {
                  nodes: [{ id: "labelId" }],
                  pageInfo: { hasNextPage: false, hasPreviousPage: false, endCursor: null! },
                },
                states: { nodes: [{ id: "stateId" }], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              },
            },
          },
        };
      } else {
        throw new Error("Unexpected request");
      }
    });

    const allTeamLabels = await team.paginate(team.labels, { includeArchived: true });
    expect(allTeamLabels.length).toEqual(2);
    // eslint-disable-next-line @typescript-eslint/dot-notation
    expect((requests.at(-1)?.body.variables as JsonObject)?.["id"]).toEqual("teamId");
  });
});
