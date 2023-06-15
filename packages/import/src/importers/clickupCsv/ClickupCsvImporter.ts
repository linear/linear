import csv from "csvtojson";
import { Importer, ImportResult } from "../../types";

// enum of priority values in ClickUp, 0 - none, 1 - urgent, 2 - high, 3 - normal, 4 - low, etc
type ClickupPriority = 0 | 1 | 2 | 3 | 4;

type ClickupAttachment = {
  title: string;
  url: string;
};

// record of checklist names to checklist items
type ClickupChecklist = Record<string, string[]>;

type ClickupComment = {
  // text contains task_ids for reference and mentions starting with "@User Name", @assignees, @watchers
  text: string;
  // email of the user who created the comment
  by: string;
  assigned: boolean;
  date: string;
  resolved: string;
};

// csv schema
interface ClickupTaskType {
  "Task ID": string;
  "Task Custom ID": string;
  "Task Name": string;
  "Task Content": string;
  Status: string;
  "Date Created": number;
  "Date Created Text": string;
  "Due Date": number;
  "Due Date Text": string;
  "Start Date": number;
  "Start Date Text": string;
  "Parent ID": string;
  Attachments: ClickupAttachment[];
  Assignees: string[];
  Tags: string[];
  Priority: ClickupPriority;
  "List Name": string;
  "Folder Name": string; // "hidden" if it doesn't belong to a folder
  "Space Name": string;
  "Time Estimated": number | null;
  "Time Estimated Text": string;
  Checklists: ClickupChecklist[];
  Comments: ClickupComment[];
  "Assigned Comments": number; // seemingly always 0?
  "Time Spent": string;
  "Time Spent Text": string;
  "Rolled Up Time": string;
  "Rolled Up Time Text": string;
}

// custom parsing
// noinspection JSUnusedGlobalSymbols
const colParser = {
  Attachments: (str: string): ClickupAttachment[] => JSON.parse(str),
  Assignees: (str: string): string[] =>
    str
      .slice(1, -1)
      .split(",")
      .filter(s => s.length),
  Checklists: (str: string): ClickupChecklist[] => JSON.parse(str),
  Comments: (str: string): ClickupComment[] => JSON.parse(str),
  Priority: (str: string): ClickupPriority => JSON.parse(str),
  Tags: (str: string): string[] =>
    str
      .slice(1, -1)
      .split(",")
      .filter(s => s.length),
  "Assigned Comments": (str: string): number => JSON.parse(str),
};

export class ClickupCsvImporter implements Importer {
  // Instance variables
  private filePath: string;

  public constructor(filePath: string) {
    this.filePath = filePath;
  }

  public get name(): string {
    return "ClickUp (CSV)";
  }

  public get defaultTeamName(): string {
    return "ClickUp";
  }

  public import = async (): Promise<ImportResult> => {
    const data = (await csv({ colParser, checkType: true }).fromFile(this.filePath)) as ClickupTaskType[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    const assignees = Array.from(new Set(data.map(row => row.Assignees).flat()));

    for (const user of assignees) {
      importData.users[user] = {
        name: user,
      };
    }

    for (const row of data) {
      const title = row["Task Name"];
      const url = `https://app.clickup.com/t/${row["Task ID"]}`;
      const mdDesc = row["Task Content"];
      const description = url ? `${mdDesc}\n\n[View original issue in ClickUp](${url})` : mdDesc;
      const priority = row.Priority;
      const dueDate = row["Due Date"] ? new Date(row["Due Date"]) : undefined;
      const tags = row.Tags;
      const assigneeId = row.Assignees[0] ?? undefined;
      const status = row.Status === "Closed" ? "Done" : "Todo";
      const labels = tags.filter(tag => !!tag);
      const createdAt = row["Date Created"] ? new Date(row["Date Created"]) : undefined;

      importData.issues.push({
        title,
        description,
        status,
        priority,
        url,
        assigneeId,
        labels,
        dueDate,
        createdAt,
      });

      for (const label of labels) {
        if (!importData.labels[label]) {
          importData.labels[label] = {
            name: label,
          };
        }
      }
    }

    return importData;
  };
}
