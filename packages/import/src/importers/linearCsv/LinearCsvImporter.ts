import csv from "csvtojson";
import { Importer, ImportResult, IssuePriority } from "../../types";
import { safeParseInt } from "../../utils/parseInt";

type LinearPriority = "No priority" | "Urgent" | "High" | "Medium" | "Low";

interface LinearIssueType {
  Id: string;
  Team: string;
  Title: string;
  Description: string;
  Status: string;
  Estimate: string;
  Priority: LinearPriority;
  Project: string;
  Creator: string;
  Assignee: string;
  Labels: string;
  "Cycle Number": string;
  "Cycle Name": string;
  "Cycle Start": string;
  "Cycle End": string;
  Created: string;
  Updated: string;
  Started: string;
  Completed: string;
  Canceled: string;
  Archived: string;
}

/**
 * Import issues from Linear CSV export.
 *
 * @param filePath  path to csv file
 */
export class LinearCsvImporter implements Importer {
  public constructor(filePath: string) {
    this.filePath = filePath;
  }

  public get name(): string {
    return "Linear (CSV)";
  }

  public get defaultTeamName(): string {
    return "Linear";
  }

  public import = async (): Promise<ImportResult> => {
    const data = (await csv().fromFile(this.filePath)) as LinearIssueType[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    const assignees = Array.from(new Set(data.map(row => row.Assignee)));

    for (const user of assignees) {
      importData.users[user] = {
        name: user,
      };
    }

    for (const row of data) {
      if (!!row.Archived) {
        continue;
      }

      const labels = row.Labels ? parseLabels(row.Labels) : [];

      importData.issues.push({
        title: stripLeadingSingleQuote(row.Title),
        description: stripLeadingSingleQuote(row.Description),
        priority: mapPriority(row.Priority),
        status: row.Status,
        assigneeId: row.Assignee,
        createdAt: !!row.Created ? new Date(row.Created) : undefined,
        completedAt: !!row.Completed ? new Date(row.Completed) : undefined,
        startedAt: !!row.Started ? new Date(row.Started) : undefined,
        estimate: safeParseInt(row.Estimate),
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

/**
 * Parse comma-separated labels from Linear CSV export.
 * Linear exports multiple labels separated by ", " but individual label names
 * can themselves contain commas (e.g., "Label Group/Sub Label, with commas").
 *
 * Simple heuristic: Count "/" characters. If there's exactly one "/", treat the
 * entire string as a single hierarchical label (since it's likely "Parent/Child, with, commas").
 * Otherwise, use the standard ", " split for multiple labels.
 */
function parseLabels(labelsStr: string): string[] {
  if (!labelsStr || !labelsStr.trim()) {
    return [];
  }

  // Count slashes to detect hierarchical labels
  const slashCount = (labelsStr.match(/\//g) || []).length;

  // If there's exactly one slash, treat as single hierarchical label
  // This handles the common case: "Parent/Child, with, commas"
  if (slashCount === 1) {
    return [labelsStr.trim()];
  }

  // Otherwise, split on ", " as before (multiple labels)
  return labelsStr.split(", ").filter(label => label.trim().length > 0);
}

// Linear CSV exports add a single quote to the beginning of text fields when that field could otherwise be interpreted
// as a formula. When we're sending the data to the API, we need to strip that leading single quote.
function stripLeadingSingleQuote(input: string): string {
  return input.replace(/^'([+\-=@∑√∏<>＜＞≤≥＝≠±÷×])/, "$1");
}

const mapPriority = (input: LinearPriority) => {
  const priorityMap: { [k: string]: IssuePriority } = {
    "No priority": 0,
    Urgent: 1,
    High: 2,
    Medium: 3,
    Low: 4,
  };

  return priorityMap[input] || 0;
};
