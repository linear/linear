import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { JiraCsvImporter, mapStatusCategoryDates, parseJiraDate } from "../importers/jiraCsv/JiraCsvImporter.ts";

const csvField = (value: string) => `"${value.replaceAll('"', '""')}"`;

const importRows = async (rows: Record<string, string>[]) => {
  const columns = Object.keys(rows[0]);
  const filePath = join(directory, "jira.csv");
  writeFileSync(
    filePath,
    [columns.join(","), ...rows.map(row => columns.map(column => csvField(row[column] ?? "")).join(","))].join("\n") +
      "\n"
  );

  return new JiraCsvImporter(filePath, "example", "").import();
};

const jiraRow = (overrides: Record<string, string>): Record<string, string> => ({
  Summary: "Issue",
  "Issue key": "JRA-1",
  "Issue Type": "Task",
  Status: "To Do",
  "Status Category": "To Do",
  Priority: "Medium",
  "Project key": "JRA",
  Assignee: "",
  Description: "",
  Created: "05/Mar/24 3:12 PM",
  Updated: "07/Mar/24 9:00 AM",
  Resolved: "",
  "Status Category Changed": "",
  Release: "",
  ...overrides,
});

let directory: string;

describe("parseJiraDate", () => {
  it("parses Jira's default export format in local time", () => {
    expect(parseJiraDate("05/Mar/24 3:12 PM")).toEqual(new Date(2024, 2, 5, 15, 12));
    expect(parseJiraDate("5/Mar/24 11:02 AM")).toEqual(new Date(2024, 2, 5, 11, 2));
    expect(parseJiraDate(" 28/Dec/23 12:00 AM ")).toEqual(new Date(2023, 11, 28, 0, 0));
  });

  it("parses other formats Jira can export", () => {
    expect(parseJiraDate("05/Mar/2024 3:12 PM")).toEqual(new Date(2024, 2, 5, 15, 12));
    expect(parseJiraDate("05/Mar/24 15:12")).toEqual(new Date(2024, 2, 5, 15, 12));
    expect(parseJiraDate("05/Mar/24")).toEqual(new Date(2024, 2, 5));
    expect(parseJiraDate("2024-03-05 15:12")).toEqual(new Date(2024, 2, 5, 15, 12));
    expect(parseJiraDate("2024-03-05T15:12:00.000Z")).toEqual(new Date("2024-03-05T15:12:00.000Z"));
  });

  it("returns undefined for missing or unparseable dates", () => {
    expect(parseJiraDate(undefined)).toBeUndefined();
    expect(parseJiraDate("")).toBeUndefined();
    expect(parseJiraDate("   ")).toBeUndefined();
    expect(parseJiraDate("not a date")).toBeUndefined();
    expect(parseJiraDate("32/Mar/24 3:12 PM")).toBeUndefined();
  });
});

describe("mapStatusCategoryDates", () => {
  const dates = {
    Created: "05/Mar/24 3:12 PM",
    Updated: "07/Mar/24 9:00 AM",
    "Status Category Changed": "06/Mar/24 10:00 AM",
    Resolved: "06/Mar/24 4:30 PM",
  };

  it("completes issues in the Done category when they were resolved", () => {
    expect(mapStatusCategoryDates({ ...dates, "Status Category": "Done" })).toEqual({
      completedAt: new Date(2024, 2, 6, 16, 30),
    });
  });

  it("falls back to other dates for issues in the Done category without a resolution date", () => {
    expect(mapStatusCategoryDates({ ...dates, Resolved: "", "Status Category": "Done" })).toEqual({
      completedAt: new Date(2024, 2, 6, 10, 0),
    });
    expect(
      mapStatusCategoryDates({ ...dates, Resolved: "", "Status Category Changed": "", "Status Category": "Done" })
    ).toEqual({ completedAt: new Date(2024, 2, 7, 9, 0) });
  });

  it("starts issues in the In Progress category", () => {
    expect(mapStatusCategoryDates({ ...dates, "Status Category": "In Progress" })).toEqual({
      startedAt: new Date(2024, 2, 6, 10, 0),
    });
    expect(
      mapStatusCategoryDates({ ...dates, "Status Category Changed": "garbage", "Status Category": "in progress" })
    ).toEqual({ startedAt: new Date(2024, 2, 7, 9, 0) });
  });

  it("neither starts nor completes issues in other categories", () => {
    expect(mapStatusCategoryDates({ ...dates, "Status Category": "To Do" })).toEqual({});
    expect(mapStatusCategoryDates({ ...dates, "Status Category": "Something else" })).toEqual({});
    expect(mapStatusCategoryDates({ ...dates, "Status Category": "" })).toEqual({});
    expect(mapStatusCategoryDates({ ...dates })).toEqual({});
  });
});

describe("JiraCsvImporter", () => {
  beforeEach(() => {
    directory = mkdtempSync(join(tmpdir(), "jira-import-"));
  });

  afterEach(() => {
    rmSync(directory, { recursive: true, force: true });
  });

  it("keeps created dates and maps status categories to started and completed dates", async () => {
    const { issues } = await importRows([
      jiraRow({ "Issue key": "JRA-1", Status: "Closed", "Status Category": "Done", Resolved: "06/Mar/24 4:30 PM" }),
      jiraRow({
        "Issue key": "JRA-2",
        Status: "In Review",
        "Status Category": "In Progress",
        "Status Category Changed": "06/Mar/24 10:00 AM",
      }),
      jiraRow({ "Issue key": "JRA-3", Status: "Open", "Status Category": "To Do" }),
    ]);

    expect(issues.map(({ createdAt, startedAt, completedAt }) => ({ createdAt, startedAt, completedAt }))).toEqual([
      { createdAt: new Date(2024, 2, 5, 15, 12), startedAt: undefined, completedAt: new Date(2024, 2, 6, 16, 30) },
      { createdAt: new Date(2024, 2, 5, 15, 12), startedAt: new Date(2024, 2, 6, 10, 0), completedAt: undefined },
      { createdAt: new Date(2024, 2, 5, 15, 12), startedAt: undefined, completedAt: undefined },
    ]);
  });

  it("imports issues with missing or unparseable dates without them", async () => {
    const { issues } = await importRows([
      jiraRow({ "Issue key": "JRA-1", Created: "", Updated: "" }),
      jiraRow({ "Issue key": "JRA-2", Created: "yesterday", Updated: "", "Status Category": "Done" }),
    ]);

    expect(issues).toHaveLength(2);
    for (const issue of issues) {
      expect(issue.createdAt).toBeUndefined();
      expect(issue.startedAt).toBeUndefined();
      expect(issue.completedAt).toBeUndefined();
    }
  });

  it("imports exports without date or status category columns", async () => {
    const { issues } = await importRows([
      {
        Summary: "Issue",
        "Issue key": "JRA-1",
        "Issue Type": "Task",
        Status: "Closed",
        Priority: "High",
        "Project key": "JRA",
        Assignee: "",
        Description: "",
        Release: "",
      },
    ]);

    expect(issues[0]).toMatchObject({ title: "Issue", status: "Closed", priority: 2 });
    expect(issues[0].createdAt).toBeUndefined();
    expect(issues[0].completedAt).toBeUndefined();
  });
});
