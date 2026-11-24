import fs from "fs";
import os from "os";
import path from "path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { AsanaCsvImporter } from "../importers/asanaCsv/AsanaCsvImporter.ts";
import { PivotalCsvImporter } from "../importers/pivotalCsv/PivotalCsvImporter.ts";

let tmpDir: string;

const csvCell = (value: string) => `"${value.replace(/"/g, '""')}"`;

const writeCsv = (name: string, header: string[], row: string[]) => {
  const file = path.join(tmpDir, name);
  fs.writeFileSync(file, [header.join(","), row.map(csvCell).join(",")].join("\n"));
  return file;
};

describe("importer descriptions", () => {
  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "linear-import-"));
  });

  afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("keeps Asana notes as written", async () => {
    const notes = "# of users is low\nSee https://example.com/a_b_c/d_e or mail jane_doe@example.com";
    const file = writeCsv(
      "asana.csv",
      ["Task ID", "Created At", "Completed At", "Name", "Assignee", "Due Date", "Tags", "Notes", "Priority"],
      ["1", "", "", "Task", "", "", "", notes, ""]
    );
    const { issues } = await new AsanaCsvImporter(file, "").import();
    expect(issues[0]?.description).toBe(notes);
  });

  it("keeps Pivotal Markdown descriptions as written", async () => {
    const description = "# Acceptance criteria\n**Important:** see [docs](https://example.com/my_page)\n~~old~~ new";
    const file = writeCsv(
      "pivotal.csv",
      ["Id", "Title", "Labels", "Type", "Estimate", "Created at", "Accepted at", "Description", "URL", "Owned By"],
      ["1", "Story", "", "feature", "", "", "", description, "", ""]
    );
    const { issues } = await new PivotalCsvImporter(file).import();
    expect(issues[0]?.description).toBe(description);
  });
});
