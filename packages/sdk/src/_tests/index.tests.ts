import { createLinearSdk, createRawLinearSdk, TeamDocument } from "../index";
import { MOCK_API_KEY, setupTestServer } from "./_mock";

const ctx = setupTestServer();

describe("createRawLinearSdk", () => {
  it("calls the requester", async () => {
    const requester = jest.fn();
    const sdk = createRawLinearSdk(requester);
    const variables = { teamId: "asd" };
    const options = { asd: "qwe" };

    await sdk.team(variables, options);

    expect(requester).toHaveBeenCalledWith(TeamDocument, variables, options);
  });
});

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

    expect(await sdk.viewer()).toEqual(data);
  });

  it("fails auth with incorrect api key", async () => {
    ctx.res({});

    const sdk = createLinearSdk({ apiKey: "asd", baseUrl: ctx.url });

    try {
      await sdk.viewer();
    } catch (error) {
      expect(error.response).toEqual({ error: "Unauthorized", status: 401 });
    }
  });
});
