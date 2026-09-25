import type { LinearClient } from "@linear/sdk";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { replaceImagesInMarkdown } from "../utils/replaceImages.ts";

const imageUploadFromUrl = vi.fn();
const client = { imageUploadFromUrl } as unknown as LinearClient;

const UPLOADED_URL = "https://uploads.linear.app/image.png";

const authenticateUrl = (url: string) => `${url}?token=secret`;

describe("replaceImagesInMarkdown", () => {
  beforeEach(() => {
    imageUploadFromUrl.mockReset().mockResolvedValue({ success: true, url: UPLOADED_URL });
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("replaces every image with its uploaded URL", async () => {
    imageUploadFromUrl.mockImplementation(async (url: string) => ({
      success: true,
      url: url.replace("https://example.com/", "https://uploads.linear.app/"),
    }));

    const result = await replaceImagesInMarkdown(
      client,
      '![one](https://example.com/1.png) ![two](https://example.com/2.png) <img src="https://example.com/3.png">'
    );

    expect(result).toBe(
      "\n![one](https://uploads.linear.app/1.png)\n \n![two](https://uploads.linear.app/2.png)\n ![](https://uploads.linear.app/3.png)"
    );
  });

  it("downloads images from the authenticated URL", async () => {
    const result = await replaceImagesInMarkdown(client, "![one](https://example.com/1.png)", authenticateUrl);

    expect(imageUploadFromUrl).toHaveBeenCalledWith("https://example.com/1.png?token=secret");
    expect(result).toBe(`\n![one](${UPLOADED_URL})\n`);
  });

  it("keeps literal parentheses in image URLs", async () => {
    const result = await replaceImagesInMarkdown(
      client,
      "![Screenshot](https://example.com/Screen%20Shot%20(1).png) after"
    );

    expect(imageUploadFromUrl).toHaveBeenCalledWith("https://example.com/Screen%20Shot%20(1).png");
    expect(result).toBe(`\n![Screenshot](${UPLOADED_URL})\n after`);
  });

  it.each([
    ['"Preview"', '![Image](https://example.com/a.png "Preview")'],
    ["'Preview'", "![Image](https://example.com/a.png 'Preview')"],
    ["(Preview)", "![Image](https://example.com/a.png (Preview))"],
  ])("keeps the %s title out of the image URL", async (title, markdown) => {
    const result = await replaceImagesInMarkdown(client, markdown);

    expect(imageUploadFromUrl).toHaveBeenCalledWith("https://example.com/a.png");
    expect(result).toBe(`\n![Image](${UPLOADED_URL} ${title})\n`);
  });

  it("supports brackets in alt text", async () => {
    const result = await replaceImagesInMarkdown(client, "![a [b] \\] c](https://example.com/a.png)");

    expect(result).toBe(`\n![a [b] \\] c](${UPLOADED_URL})\n`);
  });

  it("treats a doubly-escaped backslash as a literal backslash, so the image is replaced", async () => {
    const result = await replaceImagesInMarkdown(client, "\\\\![alt](https://example.com/a.png)");

    expect(result).toBe(`\\\\\n![alt](${UPLOADED_URL})\n`);
  });

  it.each([
    ["links", "[PDF](https://example.com/file.pdf)"],
    ["escaped image markers", "\\![literal](https://example.com/a.png)"],
    ["escaped image tags", '\\<img src="https://example.com/a.png">'],
    ["images in inline code spans", "see `![alt](https://example.com/a.png)` for syntax"],
    ["image tags in inline code spans", '`<img src="https://example.com/a.png">`'],
    ["images in fenced code blocks", "```\n![alt](https://example.com/a.png)\n```"],
    ["image tags in fenced code blocks", '~~~html\n<img src="https://example.com/a.png">\n~~~'],
    ["images in unclosed fenced code blocks", "```\n![alt](https://example.com/a.png)"],
    ["unclosed images", "![alt](https://example.com/a.png"],
    ["image markers without a URL", "![not an image] and [link](https://example.com/a.png)"],
    ["images with a relative URL", "![alt](/a.png)"],
    ["image tags with another src attribute", '<img data-src="https://example.com/a.png">'],
  ])("leaves %s untouched", async (_, markdown) => {
    const result = await replaceImagesInMarkdown(client, markdown, authenticateUrl);

    expect(imageUploadFromUrl).not.toHaveBeenCalled();
    expect(result).toBe(markdown);
  });

  it("replaces images outside code blocks in the same document", async () => {
    const result = await replaceImagesInMarkdown(
      client,
      "![one](https://example.com/a.png)\n\n```\n![two](https://example.com/b.png)\n```\n\n![three](https://example.com/c.png)"
    );

    expect(imageUploadFromUrl.mock.calls).toEqual([["https://example.com/a.png"], ["https://example.com/c.png"]]);
    expect(result).toBe(
      `\n![one](${UPLOADED_URL})\n\n\n\`\`\`\n![two](https://example.com/b.png)\n\`\`\`\n\n\n![three](${UPLOADED_URL})\n`
    );
  });

  it.each([
    ["images", "![one](https://example.com/1.png)"],
    ["images with parentheses in their URL", "![Screenshot](https://example.com/Screen%20Shot%20(1).png) after"],
    ["images with a title", '![Image](https://example.com/a.png "Preview")'],
    ["images in tables", "| a | ![one](https://example.com/1.png) |"],
    ["image tags", '<img width="100" src="https://example.com/2.png" alt="two">'],
  ])("leaves %s untouched when the upload fails", async (_, markdown) => {
    imageUploadFromUrl.mockRejectedValue(new Error("Failed to download image"));

    const result = await replaceImagesInMarkdown(client, markdown, authenticateUrl);

    expect(imageUploadFromUrl).toHaveBeenCalledWith(expect.stringContaining("?token=secret"));
    expect(result).toBe(markdown);
  });

  it("leaves images untouched when the upload returns no URL", async () => {
    imageUploadFromUrl.mockResolvedValue({ success: true });

    const result = await replaceImagesInMarkdown(client, "![one](https://example.com/1.png)", authenticateUrl);

    expect(result).toBe("![one](https://example.com/1.png)");
  });

  it.each([false, undefined])(
    "leaves images untouched when success is %s even if the upload returns a URL",
    async success => {
      imageUploadFromUrl.mockImplementation(async (url: string) => ({ success, url }));
      const markdown = '![one](https://example.com/1.png) <img src="https://example.com/2.png">';

      const result = await replaceImagesInMarkdown(client, markdown, authenticateUrl);

      expect(imageUploadFromUrl).toHaveBeenCalledWith("https://example.com/1.png?token=secret");
      expect(imageUploadFromUrl).toHaveBeenCalledWith("https://example.com/2.png?token=secret");
      expect(result).toBe(markdown);
    }
  );

  it("only replaces the images that uploaded", async () => {
    imageUploadFromUrl.mockImplementation(async (url: string) => {
      if (url.includes("fail")) {
        throw new Error("Failed to download image");
      }
      return { success: true, url: UPLOADED_URL };
    });

    const result = await replaceImagesInMarkdown(
      client,
      "![a](https://example.com/fail.png) ![b](https://example.com/ok.png) ![c](https://example.com/fail.png)",
      authenticateUrl
    );

    expect(result).toBe(
      `![a](https://example.com/fail.png) \n![b](${UPLOADED_URL})\n ![c](https://example.com/fail.png)`
    );
  });
});
