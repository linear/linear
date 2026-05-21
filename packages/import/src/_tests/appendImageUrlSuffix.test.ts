import { describe, expect, it } from "vitest";
import { appendImageUrlSuffix } from "../utils/appendImageUrlSuffix.ts";

const options = { allowedHostSuffixes: ["shortcut.com", "clubhouse.io"] };

describe("appendImageUrlSuffix", () => {
  it("keeps literal parentheses in markdown image URLs intact", () => {
    expect(
      appendImageUrlSuffix(
        "![Screenshot](https://media.app.shortcut.com/files/Screen%20Shot%20(1).png)",
        "?token=t",
        options
      )
    ).toBe("![Screenshot](https://media.app.shortcut.com/files/Screen%20Shot%20(1).png?token=t)");
  });

  it("uses an ampersand when the image URL already has a query string", () => {
    expect(appendImageUrlSuffix("![Image](https://media.clubhouse.io/a.png?size=large)", "?token=t", options)).toBe(
      "![Image](https://media.clubhouse.io/a.png?size=large&token=t)"
    );
  });

  it("inserts the suffix before URL fragments", () => {
    expect(
      appendImageUrlSuffix("![Image](https://media.clubhouse.io/a.png?size=large#preview)", "?token=t", options)
    ).toBe("![Image](https://media.clubhouse.io/a.png?size=large&token=t#preview)");
  });

  it("appends the suffix to markdown image URLs with titles", () => {
    expect(appendImageUrlSuffix('![Image](https://media.clubhouse.io/a.png "Preview")', "?token=t", options)).toBe(
      '![Image](https://media.clubhouse.io/a.png?token=t "Preview")'
    );
  });

  it("does not append the suffix to markdown links or disallowed image hosts", () => {
    expect(
      appendImageUrlSuffix(
        "[PDF](https://media.app.shortcut.com/file.pdf) ![External](https://example.com/image.png)",
        "?token=t",
        options
      )
    ).toBe("[PDF](https://media.app.shortcut.com/file.pdf) ![External](https://example.com/image.png)");
  });

  it("appends the suffix to HTML image tags", () => {
    expect(appendImageUrlSuffix('<img src="https://media.app.shortcut.com/a.png">', "?token=t", options)).toBe(
      '<img src="https://media.app.shortcut.com/a.png?token=t">'
    );
  });

  it("does not append the suffix to backslash-escaped image markers", () => {
    expect(appendImageUrlSuffix("\\![literal](https://media.app.shortcut.com/a.png)", "?token=t", options)).toBe(
      "\\![literal](https://media.app.shortcut.com/a.png)"
    );
  });

  it("treats a doubly-escaped backslash as a literal backslash, so the image IS rewritten", () => {
    expect(appendImageUrlSuffix("\\\\![alt](https://media.app.shortcut.com/a.png)", "?token=t", options)).toBe(
      "\\\\![alt](https://media.app.shortcut.com/a.png?token=t)"
    );
  });

  it("does not append the suffix to images inside inline code spans", () => {
    expect(
      appendImageUrlSuffix("see `![alt](https://media.app.shortcut.com/a.png)` for syntax", "?token=t", options)
    ).toBe("see `![alt](https://media.app.shortcut.com/a.png)` for syntax");
  });

  it("does not append the suffix to images inside fenced code blocks", () => {
    const input = "```\n![alt](https://media.app.shortcut.com/a.png)\n```";
    expect(appendImageUrlSuffix(input, "?token=t", options)).toBe(input);
  });

  it("does not append the suffix to HTML img tags inside inline code spans", () => {
    expect(appendImageUrlSuffix('`<img src="https://media.app.shortcut.com/a.png">`', "?token=t", options)).toBe(
      '`<img src="https://media.app.shortcut.com/a.png">`'
    );
  });

  it("still rewrites images that sit outside a code block in the same document", () => {
    const input =
      "![one](https://media.app.shortcut.com/a.png)\n\n```\n![two](https://media.app.shortcut.com/b.png)\n```\n\n![three](https://media.app.shortcut.com/c.png)";
    expect(appendImageUrlSuffix(input, "?token=t", options)).toBe(
      "![one](https://media.app.shortcut.com/a.png?token=t)\n\n```\n![two](https://media.app.shortcut.com/b.png)\n```\n\n![three](https://media.app.shortcut.com/c.png?token=t)"
    );
  });
});
