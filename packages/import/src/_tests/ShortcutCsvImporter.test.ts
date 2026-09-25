import type { LinearClient } from "@linear/sdk";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ShortcutCsvImporter } from "../importers/shortcutCsv/ShortcutCsvImporter.ts";
import { replaceImagesInMarkdown } from "../utils/replaceImages.ts";

const TOKEN = "shortcut-api-token";

const csvField = (value: string) => `"${value.replaceAll('"', '""')}"`;

const importStory = async (description: string) => {
  const story: Record<string, string> = {
    id: "1",
    name: "Story",
    type: "feature",
    owners: "",
    description,
    created_at: "",
    completed_at: "",
    estimate: "",
    external_tickets: "",
    labels: "",
    tasks: "",
    state: "Unscheduled",
  };
  const filePath = join(directory, "stories.csv");
  writeFileSync(
    filePath,
    [Object.keys(story).join(","), Object.values(story).map(csvField).join(",")].join("\n") + "\n"
  );

  const importData = await new ShortcutCsvImporter(filePath, "workspace", TOKEN).import();
  return { importData, description: importData.issues[0].description ?? "" };
};

let directory: string;

describe("ShortcutCsvImporter", () => {
  beforeEach(() => {
    directory = mkdtempSync(join(tmpdir(), "shortcut-import-"));
  });

  afterEach(() => {
    rmSync(directory, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  it("does not embed the API token in descriptions", async () => {
    const { description } = await importStory(
      '![image](https://media.app.shortcut.com/a.png)\n\n    <img src="https://media.app.shortcut.com/b.png">'
    );

    expect(description).not.toContain(TOKEN);
    expect(description).toContain("![image](https://media.app.shortcut.com/a.png)");
  });

  it("rewrites legacy Clubhouse media URLs to Shortcut ones", async () => {
    const { description } = await importStory("![image](https://media.clubhouse.io/a.png)");

    expect(description).toContain("![image](https://media.app.shortcut.com/a.png)");
  });

  it("only authenticates https URLs on Shortcut hosts", async () => {
    const { importData } = await importStory("");
    const authenticate = importData.authenticateImageUrl;
    if (!authenticate) {
      throw new Error("Expected the importer to authenticate image URLs");
    }

    expect(authenticate("https://media.app.shortcut.com/a.png")).toBe(
      `https://media.app.shortcut.com/a.png?token=${TOKEN}`
    );
    expect(authenticate("https://media.clubhouse.io/a.png")).toBe(`https://media.clubhouse.io/a.png?token=${TOKEN}`);
    expect(authenticate("https://media.app.shortcut.com/a.png?size=large#preview")).toBe(
      `https://media.app.shortcut.com/a.png?size=large&token=${TOKEN}#preview`
    );

    for (const url of [
      "https://example.com/a.png",
      "http://media.app.shortcut.com/a.png",
      "https://shortcut.com.example.com/a.png",
      "https://evilshortcut.com/a.png",
      "https://example.com\\.shortcut.com/a.png",
      "https://example.com\\@media.app.shortcut.com/a.png",
      "not a url",
    ]) {
      expect(authenticate(url)).toBe(url);
    }
  });

  it("uploads images with the API token, and leaves it out of the description when the upload fails", async () => {
    const { importData, description } = await importStory(
      "![shortcut](https://media.app.shortcut.com/a.png)\n\n![external](https://example.com/b.png)"
    );
    const imageUploadFromUrl = vi.fn().mockRejectedValue(new Error("Failed to download image"));
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const result = await replaceImagesInMarkdown(
      { imageUploadFromUrl } as unknown as LinearClient,
      description,
      importData.authenticateImageUrl
    );

    expect(imageUploadFromUrl.mock.calls).toEqual([
      [`https://media.app.shortcut.com/a.png?token=${TOKEN}`],
      ["https://example.com/b.png"],
    ]);
    expect(result).toBe(description);
  });
});
