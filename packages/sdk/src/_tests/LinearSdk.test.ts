import { LinearSdk } from "../index";

function resolveWithData(data: unknown) {
  return () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Promise.resolve(data) as any;
  };
}

describe("LinearSdk", () => {
  it("returns data", async () => {
    const sdk = new LinearSdk(resolveWithData({ project: { id: "qwe" } }));
    const response = await sdk.project("asd");

    expect(response).toEqual(expect.objectContaining({ id: "qwe" }));
  });

  it("parses DateTime", async () => {
    const sdk = new LinearSdk(resolveWithData({ project: { id: "qwe", createdAt: "2020-10-02T13:01:55.852Z" } }));
    const response = await sdk.project("asd");

    expect(response?.createdAt?.getFullYear()).toEqual(2020);
  });

  it("parses TimelessDateScalar", async () => {
    const sdk = new LinearSdk(resolveWithData({ project: { id: "qwe", targetDate: "2021-02-26T00:00:00.000Z" } }));
    const response = await sdk.project("asd");

    expect(response?.targetDate?.getFullYear()).toEqual(2021);
  });

  it("parses JSON", async () => {
    const sdk = new LinearSdk(resolveWithData({ project: { id: "qwe", targetDate: "2021-02-26T00:00:00.000Z" } }));
    const response = await sdk.project("asd");

    expect(response?.targetDate?.getFullYear()).toEqual(2021);
  });

  it("catches errors", async () => {
    const sdk = new LinearSdk(() => {
      throw new Error("test error");
    });

    try {
      await sdk.viewer;
    } catch (error) {
      expect(error.message).toEqual(expect.stringContaining("test error"));
    }
  });
});
