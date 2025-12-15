import csv from "csvtojson";
import j2m from "jira2md";
import type { Importer, ImportResult } from "../../types.ts";
import { safeParseInt } from "../../utils/parseInt.ts";

type PivotalStoryType = "epic" | "feature" | "bug" | "chore" | "release";

interface PivotalIssueType {
  Id: string;
  Title: string;
  Labels: string;
  Iteration: string;
  "Iteration Start": string;
  "Iteration End": string;
  Type: PivotalStoryType;
  Estimate: string;
  "Current State": string;
  "Created at": Date;
  "Accepted at": Date;
  Deadline: string;
  "Requested By": string;
  Description: string;
  URL: string;
  "Owned By": string;
  Blocker: string;
  "Blocker Status": string;
  Comment: string;
}

/**
 * Import issues from an Pivotal Tracker CSV export.
 *
 * @param filePath  path to csv file
 * @param orgSlug   base Pivotal project url
 */
export class PivotalCsvImporter implements Importer {
  public constructor(filePath: string) {
    this.filePath = filePath;
  }

  public get name(): string {
    return "Pivotal (CSV)";
  }

  public get defaultTeamName(): string {
    return "Pivotal";
  }

  public import = async (): Promise<ImportResult> => {
    const data = (await csv({ flatKeys: true }).fromFile(this.filePath)) as PivotalIssueType[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    const assignees = Array.from(new Set(data.map(row => row["Owned By"])));

    for (const user of assignees) {
      importData.users[user] = {
        name: user,
      };
    }

    for (const row of data) {
      const type = row.Type;
      if (type === "epic" || type === "release") {
        continue;
      }

      const title = row.Title;
      if (!title) {
        continue;
      }

      const url = row.URL;
      const mdDesc = j2m.to_markdown(row.Description);
      const description = url ? `${mdDesc}\n\n[View original issue in Pivotal](${url})` : mdDesc;

      // eslint-disable-next-line @typescript-eslint/dot-notation
      const estimate = safeParseInt(row["Estimate"]);

      const tags = row.Labels.split(",");

      const assigneeId = row["Owned By"] && row["Owned By"].length > 0 ? row["Owned By"] : undefined;

      const status = !!row["Accepted at"] ? "Done" : "Todo";

      const labels = tags.filter(tag => !!tag);

      const createdAt = row["Created at"];

      importData.issues.push({
        title,
        description,
        status,
        url,
        assigneeId,
        labels,
        createdAt,
        estimate,
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
