import csv from "csvtojson";
import { Importer, ImportResult } from "../../types";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const j2m = require("jira2md");


interface TeamworkIssueType {
  "Task ID": string;
  "Task list": string;
  "Milestone": string;
  "Task name": string;
  "Task description": string;
  "Due date": string;
  Status: string;
  "Due Date": string;
  "Assigned to": string;
  "Board column": string;
  Tags: string;
}

/**
 * Import issues from an Teamwork CSV export.
 *
 * @param filePath  path to csv file
 * @param baseUrl   base teamwork url
 * @param isImportCompleted  a flag to indicate should import completed tasks or not
 */
export class TeamworkCsvImporter implements Importer {
  public constructor(filePath: string, baseUrl: string, isImportCompleted: boolean) {
    this.filePath = filePath;
    this.baseUrl = baseUrl;
    this.isImportCompleted = isImportCompleted;
  }

  public get name(): string {
    return "Teamwork (CSV)";
  }

  public get defaultTeamName(): string {
    return "Teamwork";
  }

  public import = async (): Promise<ImportResult> => {
    const data = (await csv().fromFile(this.filePath)) as TeamworkIssueType[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    const assignees = Array.from(new Set(data.map(row => row["Assigned to"])));
    const statuses  = Array.from(new Set(data.map(row => row["Board column"])));

    for (const user of assignees) {
      importData.users[user] = {
        name: user,
      };
    }

    for (const status of statuses) {
      if (importData.statuses?.[status]) {
        importData.statuses[status] = {
          name: status,
        };
      }
    }

    for (const row of data) {
      const title = row["Task name"];
      if (!title) {
        continue;
      }

      const status = row.Status;

      if (!this.isImportCompleted && status === "completed") {
        continue;
      }



      const url = this.baseUrl ? `${this.baseUrl}/app/tasks/${row["Task ID"]}` : undefined;
      const mdDesc = j2m.to_markdown(row["Task description"]);
      const description = url ? `${mdDesc}\n\n[View original issue in Teamwork](${url})` : mdDesc;

      const dueDate = row["Due Date"] ? new Date(row["Due Date"]) : undefined;

      const assigneeId = row["Assigned to"] && row["Assigned to"].length > 0 ? row["Assigned to"] : undefined;



      const tags = row.Tags.split(",");

      const labels = tags.filter(tag => !!tag);

      importData.issues.push({
        title,
        description,
        status,
        url,
        assigneeId,
        dueDate,
        labels,
      });


      for (const lab of labels) {
        if (!importData.labels[lab]) {
          importData.labels[lab] = {
            name: lab,
          };
        }
      }
    }

    return importData;
  };

  // -- Private interface

  private filePath: string;
  private baseUrl?: string;
  private isImportCompleted: boolean;
}
