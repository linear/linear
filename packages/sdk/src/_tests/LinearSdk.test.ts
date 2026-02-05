/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import { LinearSdk } from "../index.js";

function resolveWithData(data: unknown) {
  return () => {
    return Promise.resolve(data) as any;
  };
}

describe("LinearSdk", () => {
  it("returns data", async () => {
    const sdk = new LinearSdk(resolveWithData({ project: { id: "test", status: { id: "test" } } }));
    const response = await sdk.project("test");

    expect(response).toEqual(expect.objectContaining({ id: "test" }));
  });

  it("parses DateTime", async () => {
    const sdk = new LinearSdk(
      resolveWithData({ project: { id: "test", createdAt: "2020-10-02T13:01:55.852Z", status: { id: "test" } } })
    );
    const response = await sdk.project("test");

    expect(response?.createdAt?.getFullYear()).toEqual(2020);
  });

  it("parses TimelessDateScalar", async () => {
    const sdk = new LinearSdk(
      resolveWithData({ project: { id: "test", targetDate: "2021-02-26", status: { id: "test" } } })
    );
    const response = await sdk.project("test");

    expect(response?.targetDate).toEqual("2021-02-26");
  });

  it("parses JSON", async () => {
    const sdk = new LinearSdk(
      resolveWithData({ template: { id: "test", templateData: JSON.stringify({ some: { nested: { data: 123 } } }) } })
    );
    const response = await sdk.template("test");

    expect((response?.templateData?.some as any)?.nested?.data).toEqual(123);
  });

  it("does not attempt to parse JSONObject", async () => {
    const sdk = new LinearSdk(
      resolveWithData({ attachment: { id: "test", metadata: { some: { nested: { data: 123 } } } } })
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

  it("fetches project attachment", async () => {
    const sdk = new LinearSdk(
      resolveWithData({
        projectAttachment: {
          id: "test-attachment-id",
          title: "Test Attachment",
          url: "https://example.com",
          createdAt: "2020-10-02T13:01:55.852Z",
        },
      })
    );
    const response = await sdk.projectAttachment("test-attachment-id");

    expect(response?.id).toEqual("test-attachment-id");
    expect(response?.title).toEqual("Test Attachment");
    expect(response?.url).toEqual("https://example.com");
    expect(response?.createdAt?.getFullYear()).toEqual(2020);
  });

  it("fetches project attachments", async () => {
    const sdk = new LinearSdk(
      resolveWithData({
        projectAttachments: {
          nodes: [
            {
              id: "attachment-1",
              title: "Attachment 1",
              url: "https://example.com/1",
            },
            {
              id: "attachment-2",
              title: "Attachment 2",
              url: "https://example.com/2",
            },
          ],
          pageInfo: { hasNextPage: false, hasPreviousPage: false },
        },
      })
    );
    const response = await sdk.projectAttachments();

    expect(response?.nodes.length).toEqual(2);
    expect(response?.nodes[0]?.id).toEqual("attachment-1");
    expect(response?.nodes[1]?.id).toEqual("attachment-2");
  });
});
