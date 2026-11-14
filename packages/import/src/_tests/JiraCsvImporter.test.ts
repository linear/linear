import fs from "fs";
import os from "os";
import path from "path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { JiraCsvImporter } from "../importers/jiraCsv/JiraCsvImporter.ts";

let tmpDir: string;

const header = "Summary,Issue key,Issue Type,Status,Status Category,Priority,Assignee,Created,Updated,Resolved";

const importRows = async (rows: string[]) => {
  const file = path.join(tmpDir, `jira-${rows.length}-${Date.now()}.csv`);
  fs.writeFileSync(file, [header, ...rows].join("\n"));
  const { issues } = await new JiraCsvImporter(file, "acme", "").import();
  return issues;
};

describe("JiraCsvImporter dates", () => {
  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "linear-import-jira-"));
  });

  afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("keeps the created date and completes resolved issues in Jira's default date format", async () => {
    const [issue] = await importRows([
      "Ship it,ACME-1,Task,Closed,Done,High,,05/Mar/24 3:12 PM,09/Mar/24 10:00 AM,08/Mar/24 9:30 AM",
    ]);

    expect(issue.createdAt).toEqual(new Date(2024, 2, 5, 15, 12));
    expect(issue.completedAt).toEqual(new Date(2024, 2, 8, 9, 30));
    expect(issue.startedAt).toBeUndefined();
  });

  it("falls back to the updated date for a done issue without a resolution date", async () => {
    const [issue] = await importRows(["Ship it,ACME-2,Task,Closed,Done,High,,05/Mar/24 3:12 PM,09/Mar/24 10:00 AM,"]);

    expect(issue.completedAt).toEqual(new Date(2024, 2, 9, 10, 0));
  });

  // Without startedAt/completedAt, a status Linear lacks is created as a backlog state.
  it("marks in-progress issues as started and leaves to-do issues untouched", async () => {
    const [started, todo] = await importRows([
      "Doing,ACME-3,Task,In Review,In Progress,Medium,,05/Mar/24 3:12 PM,06/Mar/24 11:00 AM,",
      "Later,ACME-4,Task,Open,To Do,Low,,05/Mar/24 3:12 PM,05/Mar/24 3:12 PM,",
    ]);

    expect(started.startedAt).toEqual(new Date(2024, 2, 6, 11, 0));
    expect(started.completedAt).toBeUndefined();
    expect(todo.startedAt).toBeUndefined();
    expect(todo.completedAt).toBeUndefined();
  });

  it("accepts ISO dates from instances with a custom date format", async () => {
    const [issue] = await importRows([
      "Ship it,ACME-5,Task,Done,Done,High,,2024-03-05T15:12:00Z,2024-03-09T10:00:00Z,2024-03-08T09:30:00Z",
    ]);

    expect(issue.createdAt).toEqual(new Date("2024-03-05T15:12:00Z"));
    expect(issue.completedAt).toEqual(new Date("2024-03-08T09:30:00Z"));
  });

  it("leaves dates unset when the export has none", async () => {
    const [issue] = await importRows(["Ship it,ACME-6,Task,Open,,High,,,,"]);

    expect(issue.createdAt).toBeUndefined();
    expect(issue.completedAt).toBeUndefined();
  });
});
