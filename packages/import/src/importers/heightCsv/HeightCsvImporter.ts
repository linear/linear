import csv from "csvtojson";
import { Importer, ImportResult, IssuePriority } from "../../types";

type HeightPriority = "Critical" | "High" | "Medium" | "Low";

interface HeightIssueType {
  Description: string;
  Status: string;
  Priority: HeightPriority;
  Tags: string;
  Tasks: string;
  Type: "task" | "project";
  Assignees: string;
  "Created at": string;
  "Completed at": string;
}

/**
 * Import issues from a Height CSV export.
 *
 * @param filePath Path to CSV file
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

  public import = async (): Promise<ImportResult> => {
    const data = (await csv().fromFile(this.filePath)) as HeightIssueType[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    const statuses = Array.from(new Set(data.map(row => row.Status)));
    const assignees = Array.from(new Set(data.flatMap(row => row.Assignees.split(",")))).filter(
      assignee => assignee.length > 0
    );

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
      if (row.Type === "project") {
        continue;
      }
      const priority = mapPriority(row.Priority);
      const assigneeId = row.Assignees?.split(",")?.[0];
      const status = row.Status;

      const labels = row.Tags.length > 0 ? row.Tags.split(",").map(tag => tag.trim()) : [];

      importData.issues.push({
        title: row.Tasks,
        description: row.Description,
        status,
        priority,
        assigneeId,
        createdAt: new Date(`${row["Created at"]}Z`),
        completedAt: row["Completed at"] ? new Date(`${row["Completed at"]}Z`) : undefined,
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
}

const mapPriority = (input: HeightPriority): IssuePriority => {
  const priorityMap: Record<HeightPriority, IssuePriority> = {
    Critical: 1,
    High: 2,
    Medium: 3,
    Low: 4,
  };
  return priorityMap[input] || 0;
};
