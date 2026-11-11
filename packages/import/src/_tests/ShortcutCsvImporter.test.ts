import type { LinearClient } from "@linear/sdk";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ShortcutCsvImporter } from "../importers/shortcutCsv/ShortcutCsvImporter.ts";
import { replaceImagesInMarkdown } from "../utils/replaceImages.ts";

const TOKEN = "shortcut-api-token";
const ATTACHMENT_URL = "https://media.app.shortcut.com/api/attachments/files/clubhouse-assets/1/2";

const csvField = (value: string) => `"${value.replaceAll('"', '""')}"`;

const importStory = async (description: string, token = TOKEN) => {
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

  const importData = await new ShortcutCsvImporter(filePath, "workspace", token).import();
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

  it("only authenticates https URLs of Shortcut attachments", async () => {
    const { importData } = await importStory("");
    const authenticate = importData.authenticateImageUrl;
    if (!authenticate) {
      throw new Error("Expected the importer to authenticate image URLs");
    }

    expect(authenticate(`${ATTACHMENT_URL}/a.png`)).toBe(`${ATTACHMENT_URL}/a.png?token=${TOKEN}`);
    expect(authenticate(`${ATTACHMENT_URL}/a.png?size=large#preview`)).toBe(
      `${ATTACHMENT_URL}/a.png?size=large&token=${TOKEN}#preview`
    );
    expect(authenticate(`${ATTACHMENT_URL}/a%20b.png`)).toBe(`${ATTACHMENT_URL}/a%20b.png?token=${TOKEN}`);

    for (const url of [
      "https://example.com/a.png",
      "https://media.app.shortcut.com/a.png",
      `http://media.app.shortcut.com/api/attachments/a.png`,
      "https://shortcut.com.example.com/a.png",
      "https://evilshortcut.com/a.png",
      "https://example.com\\.shortcut.com/a.png",
      "https://example.com\\@media.app.shortcut.com/a.png",
      "https://status.shortcut.com/a.png",
      "https://app.shortcut.com/a.png",
      "https://media.app.shortcut.com:8443/a.png",
      "https://media.app.shortcut.com/api/v3/member",
      "https://media.app.shortcut.com/API/v3/member",
      "https://media.app.shortcut.com/api;x/v3/member",
      "https://media.app.shortcut.com/api/attachments/..%2f..%2fv3/member",
      "https://media.app.shortcut.com/api/attachments/%2e%2e/%2e%2e/v3/member",
      "https://media.app.shortcut.com/api/attachments/a%5c..%5c..%5cv3/member",
      "https://media.app.shortcut.com/api/attachments/a%252f..%252fv3",
      "https://media.app.shortcut.com/api/attachments/a;b/c.png",
      "https://media.app.shortcut.com//api/attachments/a.png",
      "https://media.app.shortcut.com/api/attachments//a.png",
      "https://media.app.shortcut.com/%61pi/v3/member",
      "https://media.app.shortcut.com/a;/../api/v3/member",
      "https://media.clubhouse.io/api/attachments/a.png",
      "https://example.com:443@media.app.shortcut.com/api/attachments/a.png",
      "https://media.app.shortcut.com/%61pi/attachments/a.png",
      "https://media.app.shortcut.com/api%2Fattachments/a.png",
      "https://media.app.shortcut.com/api/attachments/a%0d%0aX-Injected:%201",
      "https://media.app.shortcut.com/api/attachments/%E2%80%A5/%E2%80%A5/v3/member",
      "https://media.app.shortcut.com/api/attachments/a%EF%BC%8F..%EF%BC%8F..%EF%BC%8Fv3",
      "not a url",
    ]) {
      expect(authenticate(url)).toBe(url);
    }
  });

  it("doesn't authenticate URLs without an API token", async () => {
    const { importData } = await importStory("", "");

    expect(importData.authenticateImageUrl?.(`${ATTACHMENT_URL}/a.png`)).toBe(`${ATTACHMENT_URL}/a.png`);
  });

  it("uploads images with the API token, and leaves it out of the description when the upload fails", async () => {
    const { importData, description } = await importStory(
      `![shortcut](${ATTACHMENT_URL}/a.png)\n\n![external](https://example.com/b.png)`
    );
    const imageUploadFromUrl = vi.fn().mockRejectedValue(new Error("Failed to download image"));
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const result = await replaceImagesInMarkdown(
      { imageUploadFromUrl } as unknown as LinearClient,
      description,
      importData.authenticateImageUrl
    );

    expect(imageUploadFromUrl.mock.calls).toEqual([
      [`${ATTACHMENT_URL}/a.png?token=${TOKEN}`],
      ["https://example.com/b.png"],
    ]);
    expect(result).toBe(description);
  });

  it("uploads images from their decoded URL, and only replaces the URL", async () => {
    const { importData, description } = await importStory(
      `| Before | After |\n|---|---|\n| ![shot](${ATTACHMENT_URL}/Screen\\(1\\).png) | none |`
    );
    const imageUploadFromUrl = vi.fn().mockResolvedValue({ success: true, url: "https://uploads.linear.app/a.png" });

    const result = await replaceImagesInMarkdown(
      { imageUploadFromUrl } as unknown as LinearClient,
      description,
      importData.authenticateImageUrl
    );

    expect(imageUploadFromUrl.mock.calls).toEqual([[`${ATTACHMENT_URL}/Screen(1).png?token=${TOKEN}`]]);
    expect(result).toContain("| ![shot](https://uploads.linear.app/a.png) | none |");
  });
});
