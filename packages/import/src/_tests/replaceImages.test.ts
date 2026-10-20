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

  it("uploads every markdown image", async () => {
    let count = 0;
    imageUploadFromUrl.mockImplementation(async () => ({
      success: true,
      url: `https://uploads.linear.app/${++count}`,
    }));

    const result = await replaceImagesInMarkdown(
      client,
      "![a](https://example.com/a.png) ![b](https://example.com/b.png)"
    );

    expect(imageUploadFromUrl).toHaveBeenCalledTimes(2);
    expect(imageUploadFromUrl).toHaveBeenNthCalledWith(1, "https://example.com/a.png");
    expect(imageUploadFromUrl).toHaveBeenNthCalledWith(2, "https://example.com/b.png");
    expect(result).toBe("![a](https://uploads.linear.app/1) ![b](https://uploads.linear.app/2)");
  });

  it("uploads every image tag", async () => {
    let count = 0;
    imageUploadFromUrl.mockImplementation(async () => ({
      success: true,
      url: `https://uploads.linear.app/${++count}`,
    }));

    const result = await replaceImagesInMarkdown(
      client,
      '<img src="https://example.com/a.png"> <img alt="b" src="https://example.com/b.png" />'
    );

    expect(imageUploadFromUrl).toHaveBeenCalledTimes(2);
    expect(result).toBe("![](https://uploads.linear.app/1) ![](https://uploads.linear.app/2)");
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

  it("keeps a ! right before an image", async () => {
    const result = await replaceImagesInMarkdown(client, "Look!![one](https://example.com/1.png)");

    expect(result).toBe(`Look!![one](${UPLOADED_URL})`);
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
    ["escaped URL schemes", "![a](https\\://example.com/a.png)", "https://example.com/a.png", `![a](${UPLOADED_URL})`],
    [
      "definition backslash escapes and character references",
      "![a][r]\n\n[r]: https://example.com/Screen\\_a.png?x=1&amp;y=2",
      "https://example.com/Screen_a.png?x=1&y=2",
      `![a](${UPLOADED_URL})\n\n[r]: https://example.com/Screen\\_a.png?x=1&amp;y=2`,
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
    ["definition labels", "[a\n\n".repeat(50_000)],
    ["definition titles", "[a]: https://example.com/a.png (\n\n".repeat(50_000)],
  ])("processes unclosed %s in linear time", async (_, markdown) => {
    // Quadratic parsing takes several seconds or more for this much text
    const start = performance.now();
    const result = await replaceImagesInMarkdown(client, markdown);
    expect(performance.now() - start).toBeLessThan(1000);

    expect(imageUploadFromUrl).not.toHaveBeenCalled();
    expect(result).toBe(markdown);
  });

  it("processes nested images that fail to upload in linear time", async () => {
    imageUploadFromUrl.mockRejectedValue(new Error("Failed to download image"));
    const markdown = `${"![".repeat(100_000)}a${"](https://example.com/a.png)".repeat(100_000)}`;

    // Quadratic parsing takes several seconds or more for this much text
    const start = performance.now();
    const result = await replaceImagesInMarkdown(client, markdown);
    expect(performance.now() - start).toBeLessThan(1000);

    expect(imageUploadFromUrl).toHaveBeenCalledTimes(1);
    expect(result.startsWith("[\\!\\[")).toBe(true);
  });

  it("processes nested reference images in linear time", async () => {
    const markdown = `[a]: https://example.com/a.png\n\n${"![".repeat(100_000)}b${"]".repeat(100_000)}`;

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
    ["reference images without a definition", "![a][r] ![b][] ![c]"],
    ["reference images with a definition interrupting a paragraph", "![a][r]\n[r]: https://example.com/a.png"],
    ["reference images with a definition in a code block", "![a][r]\n\n```\n[r]: https://example.com/a.png\n```"],
    [
      "reference images whose first definition has a relative URL",
      "![a][r]\n\n[r]: /a.png\n[r]: https://example.com/a.png",
    ],
    ["reference images with an undefined label", "![a][r]\n\n[a]: https://example.com/a.png"],
    ["reference images with an escaped label", "![a][r\\!]\n\n[r!]: https://example.com/a.png"],
    ["reference images using alt text with brackets as label", "![a [b]]\n\n[a [b]]: https://example.com/a.png"],
    ["reference images with text after their definition", '![a][r]\n\n[r]: https://example.com/a.png "Preview" text'],
    [
      "images with a relative URL and a definition for their alt text",
      "![a](/a.png)\n\n[a]: https://example.com/a.png",
    ],
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
    ["images", "![one](https://example.com/1.png)", "[one](https://example.com/1.png)"],
    [
      "images with parentheses in their URL",
      "![Screenshot](https://example.com/Screen%20Shot%20(1).png) after",
      "[Screenshot](https://example.com/Screen%20Shot%20(1).png) after",
    ],
    [
      "images with a title",
      '![Image](https://example.com/a.png "Preview")',
      '[Image](https://example.com/a.png "Preview")',
    ],
    ["images in angle brackets", "![a](<https://example.com/a b.png>)", "[a](<https://example.com/a b.png>)"],
    ["images in tables", "| a | ![one](https://example.com/1.png) |", "| a | [one](https://example.com/1.png) |"],
    ["images after a !", "Look!![one](https://example.com/1.png)", "Look\\![one](https://example.com/1.png)"],
    [
      "images after an escaped !",
      "Look\\!![one](https://example.com/1.png)",
      "Look\\![one](https://example.com/1.png)",
    ],
    [
      "images without alt text",
      "![](https://example.com/1.png)",
      String.raw`[https\:\/\/example\.com\/1\.png](https://example.com/1.png)`,
    ],
    [
      "images with blank alt text",
      "![ ](https://example.com/1.png)",
      String.raw`[https\:\/\/example\.com\/1\.png](https://example.com/1.png)`,
    ],
  ])("turns %s into links when the upload fails", async (_, markdown, expected) => {
    imageUploadFromUrl.mockRejectedValue(new Error("Failed to download image"));

    const result = await replaceImagesInMarkdown(client, markdown, authenticateUrl);

    expect(imageUploadFromUrl).toHaveBeenCalledWith(expect.stringContaining("?token=secret"));
    expect(result).toBe(expected);
  });

  it("escapes the alt text of images that fail to upload, so that images and links in it don't render", async () => {
    imageUploadFromUrl.mockRejectedValue(new Error("Failed to download image"));

    const result = await replaceImagesInMarkdown(
      client,
      "![a ![b](https://example.com/b.png) <img src=https://example.com/c.png> \\] &amp; *d*](https://example.com/a.png)"
    );

    expect(imageUploadFromUrl.mock.calls).toEqual([["https://example.com/a.png"]]);
    expect(result).toBe(
      String.raw`[a \!\[b\]\(https\:\/\/example\.com\/b\.png\) \<img src\=https\:\/\/example\.com\/c\.png\> \] \& \*d\*](https://example.com/a.png)`
    );
  });

  // Definitions don't render, so they are kept for links that use them
  it.each([
    [
      "full reference images",
      "![a][r]\n\n[r]: https://example.com/a.png",
      `![a](${UPLOADED_URL})\n\n[r]: https://example.com/a.png`,
    ],
    [
      "collapsed reference images",
      "![a][]\n\n[a]: https://example.com/a.png",
      `![a](${UPLOADED_URL})\n\n[a]: https://example.com/a.png`,
    ],
    [
      "shortcut reference images",
      "![a] after\n\n[a]: https://example.com/a.png",
      `![a](${UPLOADED_URL}) after\n\n[a]: https://example.com/a.png`,
    ],
    [
      "reference images with labels in another case and spacing",
      "![a][My  Image]\n\n[my image]: https://example.com/a.png",
      `![a](${UPLOADED_URL})\n\n[my image]: https://example.com/a.png`,
    ],
    [
      "reference images with a title",
      '![a][r]\n\n[r]: https://example.com/a.png "Preview"',
      `![a](${UPLOADED_URL} "Preview")\n\n[r]: https://example.com/a.png "Preview"`,
    ],
    [
      "reference images with a title on the next line",
      "![a][r]\n\n[r]: <https://example.com/a.png>\n  (Preview)",
      `![a](${UPLOADED_URL} (Preview))\n\n[r]: <https://example.com/a.png>\n  (Preview)`,
    ],
    [
      "reference images after their definition",
      "[r]: https://example.com/a.png\n\n![a][r]",
      `[r]: https://example.com/a.png\n\n![a](${UPLOADED_URL})`,
    ],
    [
      "reference images in tables",
      "| a | ![one][r] |\n|---|---|\n\n[r]: https://example.com/a.png",
      `| a | ![one](${UPLOADED_URL}) |\n|---|---|\n\n[r]: https://example.com/a.png`,
    ],
    [
      "definitions after a heading",
      "![a][r]\n\n## Images\n[r]: https://example.com/a.png",
      `![a](${UPLOADED_URL})\n\n## Images\n[r]: https://example.com/a.png`,
    ],
    [
      "definitions in blockquotes",
      "![a][r]\n> [r]: https://example.com/a.png",
      `![a](${UPLOADED_URL})\n> [r]: https://example.com/a.png`,
    ],
    [
      "definitions in lists",
      "![a][r]\n\n- item\n- [r]: https://example.com/a.png",
      `![a](${UPLOADED_URL})\n\n- item\n- [r]: https://example.com/a.png`,
    ],
    [
      "shortcut reference images after an invalid inline URL",
      "![a](not a URL\n\n[a]: https://example.com/a.png",
      `![a](${UPLOADED_URL})(not a URL\n\n[a]: https://example.com/a.png`,
    ],
  ])("replaces %s with inline images using the uploaded URL", async (_, markdown, expected) => {
    const result = await replaceImagesInMarkdown(client, markdown, authenticateUrl);

    expect(imageUploadFromUrl.mock.calls).toEqual([["https://example.com/a.png?token=secret"]]);
    expect(result).toBe(expected);
  });

  it.each([
    ["full reference images", "![a][r]", "[a][r]"],
    ["collapsed reference images", "![a.b][]", String.raw`[a\.b][a.b]`],
    ["shortcut reference images", "![a.b]", String.raw`[a\.b][a.b]`],
    ["reference images without alt text", "![][r]", String.raw`[https\:\/\/example\.com\/a\.png][r]`],
    ["reference images after a !", "Look!![a][r]", "Look\\![a][r]"],
  ])("turns %s into links using their definition when the upload fails", async (_, image, link) => {
    imageUploadFromUrl.mockRejectedValue(new Error("Failed to download image"));
    const definitions = "\n\n[r]: https://example.com/a.png\n[a.b]: https://example.com/a.png";

    const result = await replaceImagesInMarkdown(client, `${image}${definitions}`, authenticateUrl);

    expect(imageUploadFromUrl.mock.calls).toEqual([["https://example.com/a.png?token=secret"]]);
    expect(result).toBe(`${link}${definitions}`);
  });

  it("leaves image tags untouched when the upload fails, since Linear shows them as text", async () => {
    imageUploadFromUrl.mockRejectedValue(new Error("Failed to download image"));
    const markdown = '<img width="100" src="https://example.com/2.png" alt="two">';

    const result = await replaceImagesInMarkdown(client, markdown, authenticateUrl);

    expect(imageUploadFromUrl).toHaveBeenCalledWith("https://example.com/2.png?token=secret");
    expect(result).toBe(markdown);
  });

  it("turns images into links when the upload returns no URL", async () => {
    imageUploadFromUrl.mockResolvedValue({ success: true });

    const result = await replaceImagesInMarkdown(client, "![one](https://example.com/1.png)", authenticateUrl);

    expect(result).toBe("[one](https://example.com/1.png)");
  });

  it.each([false, undefined])("doesn't use the returned URL when success is %s", async success => {
    imageUploadFromUrl.mockImplementation(async (url: string) => ({ success, url }));

    const result = await replaceImagesInMarkdown(
      client,
      '![one](https://example.com/1.png) <img src="https://example.com/2.png">',
      authenticateUrl
    );

    expect(imageUploadFromUrl).toHaveBeenCalledWith("https://example.com/1.png?token=secret");
    expect(imageUploadFromUrl).toHaveBeenCalledWith("https://example.com/2.png?token=secret");
    expect(result).toBe('[one](https://example.com/1.png) <img src="https://example.com/2.png">');
  });

  it("only replaces the images that uploaded, and turns the others into links", async () => {
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

    expect(result).toBe(`[a](https://example.com/fail.png) ![b](${UPLOADED_URL}) [c](https://example.com/fail.png)`);
  });
});
