import type { LinearClient } from "@linear/sdk";
import { describe, expect, it, vi } from "vitest";
import { replaceImagesInMarkdown } from "../utils/replaceImages.ts";

const createClient = () => {
  let count = 0;
  const imageUploadFromUrl = vi.fn(async () => ({ url: `https://uploads.linear.app/${++count}` }));
  return { client: { imageUploadFromUrl } as unknown as LinearClient, imageUploadFromUrl };
};

describe("replaceImagesInMarkdown", () => {
  it("uploads every markdown image", async () => {
    const { client, imageUploadFromUrl } = createClient();

    const result = await replaceImagesInMarkdown(
      client,
      "![a](https://example.com/a.png) ![b](https://example.com/b.png)"
    );

    expect(imageUploadFromUrl).toHaveBeenCalledTimes(2);
    expect(imageUploadFromUrl).toHaveBeenNthCalledWith(1, "https://example.com/a.png");
    expect(imageUploadFromUrl).toHaveBeenNthCalledWith(2, "https://example.com/b.png");
    expect(result).toBe("\n![a](https://uploads.linear.app/1)\n \n![b](https://uploads.linear.app/2)\n");
  });

  it("uploads every image tag", async () => {
    const { client, imageUploadFromUrl } = createClient();

    const result = await replaceImagesInMarkdown(
      client,
      '<img src="https://example.com/a.png"> <img alt="b" src="https://example.com/b.png" />'
    );

    expect(imageUploadFromUrl).toHaveBeenCalledTimes(2);
    expect(result).toBe("![](https://uploads.linear.app/1) ![](https://uploads.linear.app/2)");
  });
});
