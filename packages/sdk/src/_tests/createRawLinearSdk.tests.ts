import { createRawLinearSdk, TeamDocument } from "../index";
import { LinearStatus } from "../_generated/sdk-api";

describe("createRawLinearSdk", () => {
  it("calls the requester", async () => {
    const requester = jest.fn();
    const sdk = createRawLinearSdk(requester);
    const id = "asd";
    const options = { asd: "qwe" };

    await sdk.team(id, options);

    expect(requester).toHaveBeenCalledWith(TeamDocument, { id }, options);
  });

  it("wraps the requester", async () => {
    const wrapper = jest.fn();
    const sdk = createRawLinearSdk(jest.fn(), wrapper);

    await sdk.team("asd");

    expect(wrapper).toHaveBeenCalledTimes(1);
  });

  it("returns data", async () => {
    const data = { some: "data" };
    const sdk = createRawLinearSdk(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Promise.resolve(data) as any;
    });

    const response = await sdk.team("asd");

    expect(response.status).toEqual(LinearStatus.success);
    expect(response.data).toEqual(data);
    expect(response.error).toBeUndefined();
  });

  it("catches errors", async () => {
    const sdk = createRawLinearSdk(() => {
      throw new Error("test error");
    });

    const response = await sdk.team("asd");

    expect(response.status).toEqual(LinearStatus.error);
    expect(response.data).toBeUndefined();
    expect(response.error).toBeDefined();
  });
});
