import csv from "csvtojson";
import { Importer, ImportResult } from "../../types";

type ClickupPriority = 0 | 1 | 2 | 3 | 4;

type ClickupAttachment = {
  title: string;
  url: string;
};

type ClickupChecklist = Record<string, string>;

type ClickupComment = {
  // text contains task_ids for reference and mentions startwing with "@User Name", @assignees, @watchers
  text: string;
  // email of the user who created the comment
  by: string;
  assigned: boolean;
  date: string;
  resolved: string;
};

interface ClickupTaskType {
  "Task ID": string;
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
  Assignees: string;
  Tags: string;
  Priority: ClickupPriority;
  "List Name": string;
  "Folder Name": string;
  "Space Name": string;
  "Time Estimated": number;
  "Time Estimated Text": string;
  Checklists: ClickupChecklist[];
  Comments: ClickupComment[];
  "Assigned Comments": number;
  "Time Spent": string;
  "Time Spent Text": string;
  "Rolled Up Time": string;
  "Rolled Up Time Text": string;
}

export class ClickupCsvImporter implements Importer {
  public constructor(private filePath: string) {}

  public get name(): string {
    return "ClickUp (CSV)";
  }

  public get defaultTeamName(): string {
    return "ClickUp";
  }

  public import = async (): Promise<ImportResult> => {
    const data = (await csv({
      colParser: {
        Attachments: item => JSON.parse(item),
        Checklists: item => JSON.parse(item),
        Comments: item => JSON.parse(item),
        Priority: item => parseInt(item),
        "Assigned Comments": item => parseInt(item),
      },
    }).fromFile(this.filePath)) as ClickupTaskType[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    const assignees = Array.from(
      new Set(data.map(row => row.Assignees.replace("[", "").replace("]", "").split(",")).flat())
    );

    for (const user of assignees) {
      importData.users[user] = {
        name: user,
      };
    }

    for (const row of data) {
      const title = row["Task Name"];
      if (!title) {
        continue;
      }

      const url = `https://app.clickup.com/t/${row["Task ID"]}`;
      const mdDesc = row["Task Content"];
      const description = url ? `${mdDesc}\n\n[View original issue in Asana](${url})` : mdDesc;

      const priority = mapPriority(row.Priority);

      const dueDate = row["Due Date"] ? new Date(row["Due Date"]) : undefined;

      const tags = row.Tags.replace("[", "").replace("]", "").split(",");

      const assigneeId = row.Assignees.replace("[", "").replace("]", "").split(",")[0] ?? undefined;

      const status = row.Status === "Closed" ? "Done" : "Todo";

      const labels = tags.filter(tag => !!tag);

      importData.issues.push({
        title,
        description,
        status,
        priority,
        url,
        assigneeId,
        labels,
        dueDate,
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

const mapPriority = (input: ClickupPriority): number => {
  const priorityMap = {
    Urgent: 1,
    High: 2,
    Medium: 3,
    Low: 4,
  };
  return priorityMap[input] || 0;
};
