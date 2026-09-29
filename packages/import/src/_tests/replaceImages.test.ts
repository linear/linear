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
      "![one](https://uploads.linear.app/1.png) ![two](https://uploads.linear.app/2.png) ![](https://uploads.linear.app/3.png)"
    );
  });

  it("downloads images from the authenticated URL", async () => {
    const result = await replaceImagesInMarkdown(client, "![one](https://example.com/1.png)", authenticateUrl);

    expect(imageUploadFromUrl).toHaveBeenCalledWith("https://example.com/1.png?token=secret");
    expect(result).toBe(`![one](${UPLOADED_URL})`);
  });

  it("keeps literal parentheses in image URLs", async () => {
    const result = await replaceImagesInMarkdown(
      client,
      "![Screenshot](https://example.com/Screen%20Shot%20(1).png) after"
    );

    expect(imageUploadFromUrl).toHaveBeenCalledWith("https://example.com/Screen%20Shot%20(1).png");
    expect(result).toBe(`![Screenshot](${UPLOADED_URL}) after`);
  });

  it.each([
    ['"Preview"', '![Image](https://example.com/a.png "Preview")'],
    ["'Preview'", "![Image](https://example.com/a.png 'Preview')"],
    ["(Preview)", "![Image](https://example.com/a.png (Preview))"],
  ])("keeps the %s title out of the image URL", async (title, markdown) => {
    const result = await replaceImagesInMarkdown(client, markdown);

    expect(imageUploadFromUrl).toHaveBeenCalledWith("https://example.com/a.png");
    expect(result).toBe(`![Image](${UPLOADED_URL} ${title})`);
  });

  it("supports brackets in alt text", async () => {
    const result = await replaceImagesInMarkdown(client, "![a [b] \\] c](https://example.com/a.png)");

    expect(result).toBe(`![a [b] \\] c](${UPLOADED_URL})`);
  });

  it("treats a doubly-escaped backslash as a literal backslash, so the image is replaced", async () => {
    const result = await replaceImagesInMarkdown(client, "\\\\![alt](https://example.com/a.png)");

    expect(result).toBe(`\\\\![alt](${UPLOADED_URL})`);
  });

  it.each([
    ["tables", "| a | b |\n|---|---|\n| x | ![one](https://example.com/1.png) |\n"],
    ["lists", "- item ![one](https://example.com/1.png)\n- next\n"],
    ["blockquotes", "> ![one](https://example.com/1.png) caption\n"],
  ])("keeps images in place in %s", async (_, markdown) => {
    const result = await replaceImagesInMarkdown(client, markdown);

    expect(result).toBe(markdown.replace("https://example.com/1.png", UPLOADED_URL));
  });

  it.each([
    [
      "backslash escapes",
      "![a](https://example.com/Screen\\(1\\)\\_a.png)",
      "https://example.com/Screen(1)_a.png",
      `![a](${UPLOADED_URL})`,
    ],
    [
      "backslashes that don't escape punctuation",
      "![a](https://example.com/a\\b.png)",
      "https://example.com/a\\b.png",
      `![a](${UPLOADED_URL})`,
    ],
    [
      "character references",
      "![a](https://example.com/a.png?x=1&amp;y=&#50;&#x33;)",
      "https://example.com/a.png?x=1&y=23",
      `![a](${UPLOADED_URL})`,
    ],
    [
      "escaped character references",
      "![a](https://example.com/a.png?x=1\\&amp;y=2)",
      "https://example.com/a.png?x=1&amp;y=2",
      `![a](${UPLOADED_URL})`,
    ],
    [
      "angle brackets",
      '![a](<https://example.com/Screen Shot (1.png> "Title")',
      "https://example.com/Screen Shot (1.png",
      `![a](<${UPLOADED_URL}> "Title")`,
    ],
    [
      "image tag character references",
      '<img src="https://example.com/a.png?x=1&amp;y=2\\_3">',
      "https://example.com/a.png?x=1&y=2\\_3",
      `![](${UPLOADED_URL})`,
    ],
  ])("decodes %s in image URLs before downloading them", async (_, markdown, sourceUrl, expected) => {
    const result = await replaceImagesInMarkdown(client, markdown, authenticateUrl);

    expect(imageUploadFromUrl).toHaveBeenCalledWith(`${sourceUrl}?token=secret`);
    expect(result).toBe(expected);
  });

  it.each([
    ["single quotes", "<img alt='a > b' src='https://example.com/a.png'>"],
    ["no quotes", "<img src=https://example.com/a.png alt=a>"],
    ["a > in another attribute", '<img alt="Settings > Billing" src="https://example.com/a.png">'],
    ["a self-closing tag", '<img src="https://example.com/a.png" />'],
  ])("replaces image tags with %s", async (_, markdown) => {
    const result = await replaceImagesInMarkdown(client, markdown);

    expect(imageUploadFromUrl).toHaveBeenCalledWith("https://example.com/a.png");
    expect(result).toBe(`![](${UPLOADED_URL})`);
  });

  it.each([
    ["image markers", "![".repeat(50_000)],
    ["image URLs", "![a](https://example.com/".repeat(50_000)],
    ["parentheses in image URLs", "![a](https://example.com/(".repeat(50_000)],
    ["image titles", '![a](https://example.com/a.png ("'.repeat(50_000)],
    ["image tags", '<img src="https://example.com/a.png" '.repeat(50_000)],
    ["image tags without a src", "<img alt=a ".repeat(50_000)],
    ["code spans between image markers", "`a` ![ ".repeat(50_000)],
    ["backticks", `a ${"`".repeat(100_000)}`],
  ])("processes unclosed %s in linear time", async (_, markdown) => {
    // Quadratic parsing takes several seconds or more for this much text
    const start = performance.now();
    const result = await replaceImagesInMarkdown(client, markdown);
    expect(performance.now() - start).toBeLessThan(1000);

    expect(imageUploadFromUrl).not.toHaveBeenCalled();
    expect(result).toBe(markdown);
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
    ["unclosed image tags", '<img src="https://example.com/a.png"'],
    ["image tags with a src inside another attribute", '<img alt="a src="https://example.com/a.png">'],
    ["images with unbalanced parentheses in their URL", "![alt](https://example.com/a(.png)"],
    ["images with whitespace in parentheses in their URL", "![alt](https://example.com/a( b).png)"],
    ["images with parentheses in a title in parentheses", "![alt](https://example.com/a.png (a (b)))"],
    ["images with a line break in an angle-bracketed URL", "![alt](<https://example.com/a\n.png>)"],
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
      `![one](${UPLOADED_URL})\n\n\`\`\`\n![two](https://example.com/b.png)\n\`\`\`\n\n![three](${UPLOADED_URL})`
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

    expect(result).toBe(`![a](https://example.com/fail.png) ![b](${UPLOADED_URL}) ![c](https://example.com/fail.png)`);
  });
});
