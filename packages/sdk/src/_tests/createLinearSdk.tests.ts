import { createLinearSdk } from "../index";
import { LinearStatus } from "../_generated/sdk-api";
import { createTestServer, MOCK_API_KEY } from "./_mock";

const ctx = createTestServer();

describe("createLinearSdk", () => {
  it("makes query to baseUrl", async () => {
    const { data } = ctx.res({
      body: {
        data: {
          test: "asd",
        },
      },
    }).spec.body;

    const sdk = createLinearSdk({ apiKey: MOCK_API_KEY, baseUrl: ctx.url });
    const response = await sdk.viewer();

    expect(response.status).toEqual(LinearStatus.success);
    expect(response.data).toEqual(data);
    expect(response.error).toBeUndefined();
  });

  it("has nested api", async () => {
    const { data } = ctx.res({
      body: {
        data: {
          test: "asd",
        },
      },
    }).spec.body;

    const sdk = createLinearSdk({ apiKey: MOCK_API_KEY, baseUrl: ctx.url });
    const team = await sdk.team("someTeamId");
    const issues = await team.issues();

    expect(team.status).toEqual(LinearStatus.success);
    expect(team.data).toEqual(data);
    expect(team.error).toBeUndefined();
    expect(issues.status).toEqual(LinearStatus.success);
    expect(issues.data).toEqual(data);
    expect(issues.error).toBeUndefined();
  });

  it("fails auth with incorrect api key", async () => {
    ctx.res({});

    const sdk = createLinearSdk({ apiKey: "asd", baseUrl: ctx.url });
    const response = await sdk.viewer();

    expect(response.status).toEqual(LinearStatus.error);
    expect(response.data).toBeUndefined();
    expect(response.error).toBeDefined();
  });
});
