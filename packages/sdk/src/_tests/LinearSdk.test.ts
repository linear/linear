/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinearSdk } from "../index";

function resolveWithData(data: unknown) {
  return () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Promise.resolve(data) as any;
  };
}

describe("LinearSdk", () => {
  it("returns data", async () => {
    const sdk = new LinearSdk(resolveWithData({ project: { id: "test" } }));
    const response = await sdk.project("test");

    expect(response).toEqual(expect.objectContaining({ id: "test" }));
  });

  it("parses DateTime", async () => {
    const sdk = new LinearSdk(resolveWithData({ project: { id: "test", createdAt: "2020-10-02T13:01:55.852Z" } }));
    const response = await sdk.project("test");

    expect(response?.createdAt?.getFullYear()).toEqual(2020);
  });

  it("parses TimelessDateScalar", async () => {
    const sdk = new LinearSdk(resolveWithData({ project: { id: "test", targetDate: "2021-02-26" } }));
    const response = await sdk.project("test");

    expect(response?.targetDate).toEqual("2021-02-26");
  });

  it("parses JSONObject", async () => {
    const sdk = new LinearSdk(
      resolveWithData({ attachment: { id: "test", metadata: JSON.stringify({ some: { nested: { data: 123 } } }) } })
    );
    const response = await sdk.attachment("test");

    expect((response?.metadata?.some as any)?.nested?.data).toEqual(123);
  });

  it("catches errors", async () => {
    const sdk = new LinearSdk(() => {
      throw new Error("test error");
    });

    try {
      await sdk.viewer;
    } catch (error: any) {
      expect(error.message).toEqual(expect.stringContaining("test error"));
    }
  });
});
