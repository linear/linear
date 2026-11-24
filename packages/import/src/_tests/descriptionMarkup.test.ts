import fs from "fs";
import os from "os";
import path from "path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { AsanaCsvImporter } from "../importers/asanaCsv/AsanaCsvImporter.ts";
import { JiraCsvImporter } from "../importers/jiraCsv/JiraCsvImporter.ts";
import { PivotalCsvImporter } from "../importers/pivotalCsv/PivotalCsvImporter.ts";

let tmpDir: string;
let fileIndex = 0;

const csvCell = (value: string) => `"${value.replaceAll('"', '""')}"`;

const writeCsv = (header: string[], row: string[]) => {
  const file = path.join(tmpDir, `import-${fileIndex++}.csv`);
  fs.writeFileSync(file, [header.join(","), row.map(csvCell).join(",")].join("\n"));
  return file;
};

const importAsanaNotes = async (notes: string) => {
  const header = [
    "Task ID",
    "Created At",
    "Completed At",
    "Last Modified",
    "Name",
    "Assignee",
    "Assignee Email",
    "Start Date",
    "Due Date",
    "Tags",
    "Notes",
    "Projects",
    "Parent Task",
    "Priority",
  ];
  const row = ["1", "", "", "", "Task", "", "", "", "", "", notes, "", "", ""];
  const { issues } = await new AsanaCsvImporter(writeCsv(header, row), "").import();
  return issues[0].description;
};

const importPivotalDescription = async (description: string) => {
  const header = ["Id", "Title", "Labels", "Type", "Estimate", "Current State", "Description", "URL", "Owned By"];
  const row = ["1", "Story", "", "feature", "", "unstarted", description, "", ""];
  const { issues } = await new PivotalCsvImporter(writeCsv(header, row)).import();
  return issues[0].description;
};

const importJiraDescription = async (description: string) => {
  const header = ["Summary", "Issue key", "Issue Type", "Status", "Priority", "Assignee", "Description"];
  const row = ["Bug", "ABC-1", "Bug", "To Do", "Medium", "", description];
  const { issues } = await new JiraCsvImporter(writeCsv(header, row), "acme", "").import();
  return issues[0].description;
};

describe("importer description markup", () => {
  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "linear-import-"));
  });

  afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it.each([
    "See https://example.com/a_b_c/d_e",
    "mail jane_doe_smith@example.com",
    "# of users is too low",
    "Line one\nLine two",
  ])("keeps Asana notes as written: %s", async notes => {
    expect(await importAsanaNotes(notes)).toBe(notes);
  });

  it("keeps the Asana link after the notes", async () => {
    const header = ["Task ID", "Name", "Tags", "Notes", "Completed At", "Priority"];
    const file = writeCsv(header, ["42", "Task", "", "a_b_c", "", ""]);
    const { issues } = await new AsanaCsvImporter(file, "https://app.asana.com/0/1/").import();

    expect(issues[0].description).toBe("a_b_c\n\n[View original issue in Asana](https://app.asana.com/0/1/42)");
  });

  it.each([
    "[docs](https://example.com/my_page)",
    "# Acceptance criteria",
    "**Important:**",
    "~~old~~ new",
    "- one\n- two\n\n```\nconst a_b = 1;\n```",
  ])("keeps Pivotal Markdown as written: %s", async description => {
    expect(await importPivotalDescription(description)).toBe(description);
  });

  it("still converts Jira wiki markup to Markdown", async () => {
    const description = await importJiraDescription("h1. Title\n*bold* and [docs|https://example.com/my_page]");

    expect(description).toBe(
      "# Title\n**bold** and [docs](https://example.com/my_page)\n\n[View original issue in Jira](https://acme.atlassian.net/browse/ABC-1)"
    );
  });
});
