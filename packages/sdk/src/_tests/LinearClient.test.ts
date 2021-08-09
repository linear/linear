import { LinearClient } from "../index";
import { LinearErrorType } from "./../types";
import { createTestServer, MOCK_API_KEY } from "./_mock";

const ctx = createTestServer();

describe("LinearClient", () => {
  beforeAll(() => {
    ctx.res({
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
    } catch (error) {
      expect(error.message).toEqual(expect.stringContaining("GraphQL Error (Code: 401) - Unauthorized"));
      expect(error.type).toEqual(LinearErrorType.AuthenticationError);
    }
  });

  it("rawRequest fails auth with incorrect api key", async () => {
    const client = new LinearClient({ apiKey: "asd", apiUrl: ctx.url }).client;

    try {
      await client.rawRequest("");
    } catch (error) {
      expect(error.message).toEqual(expect.stringContaining("GraphQL Error (Code: 401) - Unauthorized"));
      expect(error.type).toEqual(LinearErrorType.AuthenticationError);
    }
  });
});
