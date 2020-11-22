import { createLinearSdk } from "../index";
import { LinearStatus } from "../_generated/sdk-api";
import { createTestServer, MOCK_API_KEY } from "./_mock";

const ctx = createTestServer();

describe("createLinearSdk", () => {
  beforeAll(() => {
    ctx.res({
      body: {
        data: {
          viewer: { id: "viewerId" },
          team: { id: "teamId" },
        },
      },
    });
  });

  it("makes query to baseUrl", async () => {
    const sdk = createLinearSdk({ apiKey: MOCK_API_KEY, baseUrl: ctx.url });
    const response = await sdk.viewer();

    expect(response.status).toEqual(LinearStatus.success);
    expect(response.data).toEqual({ id: "viewerId" });
    expect(response.error).toBeUndefined();
  });

  it("has chained api", async () => {
    const sdk = createLinearSdk({ apiKey: MOCK_API_KEY, baseUrl: ctx.url });
    const team = await sdk.team("someTeamId");

    expect(team.status).toEqual(LinearStatus.success);
    expect(team.data).toEqual({ id: "teamId" });
    expect(team.error).toBeUndefined();
  });

  it("fails auth with incorrect api key", async () => {
    const sdk = createLinearSdk({ apiKey: "asd", baseUrl: ctx.url });
    const response = await sdk.viewer();

    expect(response.status).toEqual(LinearStatus.error);
    expect(response.data).toBeUndefined();
    expect(response.error).toBeDefined();
  });
});
