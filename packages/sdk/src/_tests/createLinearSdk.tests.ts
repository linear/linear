import { createLinearSdk } from "../index";
import { LinearSdkStatus } from "../_generated/schema-sdk";
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

    expect(response.status).toEqual(LinearSdkStatus.success);
    expect(response.data).toEqual(data);
    expect(response.error).toBeUndefined();
  });

  it("fails auth with incorrect api key", async () => {
    ctx.res({});

    const sdk = createLinearSdk({ apiKey: "asd", baseUrl: ctx.url });
    const response = await sdk.viewer();

    expect(response.status).toEqual(LinearSdkStatus.error);
    expect(response.data).toBeUndefined();
    expect(response.error).toBeDefined();
  });
});
