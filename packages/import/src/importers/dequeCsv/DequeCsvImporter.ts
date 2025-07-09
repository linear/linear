import csv from "csvtojson";
import { Importer, ImportResult } from "../../types";

type DequePriority = "Blocker" | "Critical" | "Serious" | "Moderate" | "Minor";

interface DequeIssueType {
  "Issue ID": string;
  Summary: string;
  Description: string;
  Impact: DequePriority;
  "Checkpoint Group": string;
  "Issue Type": string;
  "Test Unit": string;
  "Recommended to fix": string;
  User: string;
  "Group Name": string;
  "Group Description": string;
  Status: string;
  "Assign To": string;
  "Date Created": string;
  "Digital Asset Type": string;
  Releases: string;
  Environment: string;
  "Assistive technology": string;
  "Source Code": string;
  Checkpoint: string;
  Method: string;
  "Test Case Name": string;
  Standards: string;
  Product: string;
  URL: string;
  Screenshots: string;
  Flagged: string;
  "Flagged for Reason": string;
  "Flagged By": string;
  "Unit Type ": string;
  "More Info": string;
  "Issue Comments": string;
  "Group Notes": string;
  "Test Unit Screenshot": string;
  "Test Run Name": string;
}

/**
 * Import issues from Deque Auditor CSV export.
 *
 * @param filePath  path to csv file
 */
export class DequeCsvImporter implements Importer {
  public constructor(filePath: string) {
    this.filePath = filePath;
  }

  public get name(): string {
    return "Deque (CSV)";
  }

  public get defaultTeamName(): string {
    return "Deque";
  }

  public import = async (): Promise<ImportResult> => {
    const data = (await csv().fromFile(this.filePath)) as DequeIssueType[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    for (const row of data) {
      importData.issues.push({
        title: buildTitle(row),
        description: buildDescription(row),
        priority: mapPriority(row.Impact),
        status: "Backlog",
        assigneeId: undefined,
        completedAt: undefined,
        startedAt: undefined,
      });
    }

    return importData;
  };

  // -- Private interface

  private filePath: string;
}

const buildTitle = (row: DequeIssueType): string => {
  return `${row["Issue ID"]} - ${row.Summary}`;
};

const buildDescription = (row: DequeIssueType): string => {
  let description = "";
  const issueId = row["Issue ID"];
  const method = row.Method;
  const checkpoint = row.Checkpoint;
  const testCaseName = row["Test Case Name"];
  const testUnit = row["Test Unit"];
  const url = row.URL;
  const screenshots = row.Screenshots;
  const testUnitScreenshot = row["Test Unit Screenshot"];
  const dequeDescription = row.Description;
  const recommendedToFix = row["Recommended to fix"];
  const sourceCode = row["Source Code"];
  const moreInfo = row["More Info"];

  description += "## Description\n";
  description += dequeDescription;
  description += "\n\n";
  description += "## Recommended to fix\n";
  description += recommendedToFix;
  description += "\n\n";
  description += "## Source code\n";
  description += `${sourceCode}`;
  description += "\n\n";
  description += "## More info\n";
  description += moreInfo;
  description += "\n\n";
  description += `Test case name: ${testCaseName}\n`;
  description += `Checkpoint: ${checkpoint}\n`;
  description += `Test unit: ${testUnit}\n`;
  description += `URL: ${url}\n`;
  description += `Deque Auditor Issue ID: ${issueId}\n`;
  description += `Method: ${method}\n`;
  description += `Test unit screenshot: ${testUnitScreenshot}\n`;
  description += `Screenshots: ${screenshots}\n`;

  return description;
};

const mapPriority = (input: DequePriority): number => {
  const priorityMap = {
    Minor: 4,
    Moderate: 4,
    Serious: 3,
    Critical: 2,
    Blocker: 1,
  };

  return priorityMap[input] || 0;
};
