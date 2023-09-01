import csv from "csvtojson";
import { Importer, ImportResult } from "../../types";

type HeightPriority = "P0" | "P1" | "P2" | "P3" | "P4" | "High" | "Medium" | "Low";
type HeightStatus = "Back log" | "On Deck" | "On hold" | "In progress" | "QA" | "Won't do" | "Done";

// Most properties don't have an equivalent on Linear and will be ignored
interface HeightIssueType {
  Index: string; // This property will be kept as part of the issue description on Linear
  Tasks: string; // This property will become the issue's Title on Linear
  Description: string; // This property will become the issue's Description on Linear
  Status: HeightStatus; // This property will become the issue's Status on Linear
  Priority: HeightPriority; // This property will become the issue's Priority on Linear

  // These properties don't have an equivalent that can be mapped directly on Linear
  "Parent task": string;
  Indentation: string;
  Lists: string;
  Assignees: string;
  Team: string;
  Github: string;
  "Start date": string;
  "App Team Objectives": string;
  "Blocking Tasks": string;
  "Canny URL": string;
  "Blocked by": string;
  Blocking: string;
  "Company Objective": string;
  Project: string;
  URL: string;
  Tags: string;
  "Due date": string;
  Effort: string;
  "App Team Weekly Plan": string;
  "OKR Quarter": string;
  "Impact Tier": string;
  "Less than 2 minutes?": string;
  When: string;
  "Areas of responsibility": string;
  Sprint: string;
  "Story points": string;
  Groomed: string;
  "Engine OKR": string;
  "Linked tasks": string;
  Estimate: string;
  Month: string;
  Branches: string;
  "Pull requests": string;
  Completed: string;
  "Completed at": string;
  "Completed by": string;
  "Created at": string;
  "Created by": string;
  "Last activity at": string;
  "Subtasks count": string;
  "Incomplete subtasks": string;
  "Completed subtasks": string;
  "Percent completed": string;
}

/**
 * Import tasks from Height CSV export.
 *
 * @param filePath  path to csv file
 */
export class HeightCsvImporter implements Importer {
  public constructor(filePath: string) {
    this.filePath = filePath;
  }

  public get name(): string {
    return "Height (CSV)";
  }

  public get defaultTeamName(): string {
    return "Height";
  }

  private createDescription(row: HeightIssueType): string {
    let description = "Height task: [" + row.Index + "](https://dune.height.app/" + row.Index + ")\n";
    if (row["Parent task"] && row["Parent task"].trim() !== "") {
      description += "Parent task: [" + row["Parent task"] + "](https://dune.height.app/" + row["Parent task"] + ")\n";
    }
    if (row.Assignees && row.Assignees.trim() !== "") {
      description += "Assignees:" + row.Assignees + "\n";
    }
    return description + "\n\n" + row.Description;
  }

  public import = async (): Promise<ImportResult> => {
    const data = (await csv().fromFile(this.filePath)) as HeightIssueType[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    for (const row of data) {
      importData.issues.push({
        title: row.Tasks,
        description: this.createDescription(row),
        priority: row.Priority ? mapPriority(row.Priority) : 0,
        status: row.Status ? mapStatus(row.Status) : "Backlog",
        assigneeId: row.Assignees,
        completedAt: !!row.Completed ? new Date(row.Completed) : undefined,
      });
    }

    return importData;
  };

  // -- Private interface

  private filePath: string;
}

const mapPriority = (input: HeightPriority): number => {
  const priorityMap = {
    P0: 1,
    P1: 2,
    P2: 3,
    P3: 4,
    P4: 4,
    High: 2,
    Medium: 3,
    Low: 4,
  };

  return priorityMap[input] || 0;
};

// If your team has more status defined on Linear, you can add them here
const mapStatus = (input: HeightStatus): string => {
  const statusMap = {
    "Back log": "Backlog",
    "On Deck": "On Deck",
    "On hold": "On Hold",
    "In progress": "In Progress",
    QA: "In Review",
    "Won't do": "Canceled",
    Done: "Done",
  };

  return statusMap[input] || "Backlog";
};
