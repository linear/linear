import { createLinearSdk, TeamDocument } from "../index";

function resolveWithData(data: unknown) {
  return () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Promise.resolve(data) as any;
  };
}

describe("createLinearSdk", () => {
  it("calls the requester", async () => {
    const requester = jest.fn();
    const sdk = createLinearSdk(requester);
    const id = "asd";
    const options = { asd: "qwe" };
    await sdk.team(id, options);

    expect(requester).toHaveBeenCalledWith(TeamDocument, { id }, options);
  });

  it("returns data", async () => {
    const sdk = createLinearSdk(resolveWithData({ team: { id: "qwe" } }));
    const response = await sdk.team("asd");

    expect(response).toEqual(expect.objectContaining({ id: "qwe" }));
  });

  it("catches errors", async () => {
    const sdk = createLinearSdk(() => {
      throw new Error("test error");
    });

    try {
      await sdk.viewer();
    } catch (error) {
      expect(error.message).toEqual(expect.stringContaining("test error"));
    }
  });
});
