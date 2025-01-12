import csv from "csvtojson";
import { Importer, ImportResult, Issue, IssuePriority } from "../../types";

interface TodoistIssueType {
  TYPE: string;
  CONTENT: string;
  DESCRIPTION: string;
  PRIORITY: string;
  INDENT: string;
  AUTHOR: string;
  RESPONSIBLE: string;
  DATE: string;
  DATE_LANG: string;
  TIMEZONE: string;
  DURATION: string;
  DURATION_UNIT: string;
}

/**
 * Import issues from a Todoist CSV export.
 *
 * @param filePath Path to CSV file
 */
export class TodoistCsvImporter implements Importer {
  public constructor(filePath: string) {
    this.filePath = filePath;
  }

  public get name(): string {
    return "Todoist (CSV)";
  }

  public get defaultTeamName(): string {
    return "Todoist";
  }

  public import = async (): Promise<ImportResult> => {
    const data = (await csv().fromFile(this.filePath)) as TodoistIssueType[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
    };

    const now = new Date();

    for (const row of data) {
      // Only process task rows, skip notes
      if (row.TYPE.toLowerCase() !== "task") {
        continue;
      }

      // Parse date and ensure it's not in the future
      let createdAt: Date | undefined;
      if (row.DATE) {
        createdAt = new Date(row.DATE);
        if (createdAt > now) {
          createdAt = now;
        }
      }

      const issue: Issue = {
        title: row.CONTENT,
        description: row.DESCRIPTION || undefined,
        priority: this.mapPriority(parseInt(row.PRIORITY, 10)),
        status: this.mapStatus(row.TYPE),
        assigneeId: row.RESPONSIBLE || undefined,
        createdAt,
      };

      importData.issues.push(issue);
    }

    return importData;
  };

  private mapPriority(priority: number): IssuePriority {
    // Todoist uses 1-4 priority scale where 4 is highest
    // Linear uses 0-4 scale where 1 is highest (0 is no priority)
    switch (priority) {
      case 4:
        return 1;
      case 3:
        return 2;
      case 2:
        return 3;
      case 1:
        return 4;
      default:
        return 0;
    }
  }

  private mapStatus(type: string): string {
    // Map Todoist task types to Linear statuses
    return type.toLowerCase() === "task" ? "backlog" : "completed";
  }

  private filePath: string;
}
