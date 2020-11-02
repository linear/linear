import { createRawLinearSdk, TeamDocument } from "../index";
import { LinearSdkStatus } from "../_generated/schema-sdk";

describe("createRawLinearSdk", () => {
  it("calls the requester", async () => {
    const requester = jest.fn();
    const sdk = createRawLinearSdk(requester);
    const variables = { teamId: "asd" };
    const options = { asd: "qwe" };

    await sdk.team(variables, options);

    expect(requester).toHaveBeenCalledWith(TeamDocument, variables, options);
  });

  it("wraps the requester", async () => {
    const wrapper = jest.fn();
    const sdk = createRawLinearSdk(jest.fn(), wrapper);

    await sdk.team({ teamId: "asd" });

    expect(wrapper).toHaveBeenCalledTimes(1);
  });

  it("returns data", async () => {
    const data = { some: "data" };
    const sdk = createRawLinearSdk(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Promise.resolve(data) as any;
    });

    const response = await sdk.team({ teamId: "asd" });

    expect(response.status).toEqual(LinearSdkStatus.success);
    expect(response.data).toEqual(data);
    expect(response.error).toBeUndefined();
  });

  it("catches errors", async () => {
    const sdk = createRawLinearSdk(() => {
      throw new Error("test error");
    });

    const response = await sdk.team({ teamId: "asd" });

    expect(response.status).toEqual(LinearSdkStatus.error);
    expect(response.data).toBeUndefined();
    expect(response.error).toBeDefined();
  });
});
