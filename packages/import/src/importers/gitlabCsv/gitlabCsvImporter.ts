import csv from "csvtojson";
import { Importer, ImportResult } from "../../types";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const j2m = require("jira2md");

interface GitlabIssueType {
  Title: string;
  Description: string;
  "Issue ID": string;
  State: string;
  Author: string;
  "Author Username": string;
  Assignee: string;
  "Assignee Username": string;
  "Created at": Date;
  "Updated at": Date;
  Labels: string;
}

/**
 * Import issues from an Gitlab CSV export.
 *
 * @param filePath  path to csv file
 * @param orgSlug   base Pivotal project url
 */
export class GitlabCsvImporter implements Importer {
  public constructor(filePath: string) {
    this.filePath = filePath;
  }

  public get name(): string {
    return "Gitlab (CSV)";
  }

  public get defaultTeamName(): string {
    return "Gitlab Import team";
  }

  public import = async (): Promise<ImportResult> => {
    const data = (await csv().fromFile(this.filePath)) as GitlabIssueType[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    const assignees = Array.from(new Set(data.map(row => row["Author Username"])));

    for (const user of assignees) {
      importData.users[user] = {
        name: user,
      };
    }

    for (const row of data) {
      const title = row.Title;
      if (!title) {
        continue;
      }

      const description = row.Description;

      const tags = row.Labels.split(",");

      const assigneeId = row.Assignee;

      const status = row.State == "Open" ? "Todo" : "Done";

      const labels = tags.filter(tag => !!tag);

      const createdAt = row["Created at"];

      importData.issues.push({
        title,
        description,
        status,
        assigneeId,
        labels,
        createdAt,
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
}
