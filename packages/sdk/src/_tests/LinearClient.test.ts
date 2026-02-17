import { describe, beforeEach, it, expect } from "vitest";
import { JsonObject } from "type-fest";
import { LinearClient } from "../index.js";
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
