import csv from "csvtojson";
import { Importer, ImportResult, IssuePriority } from "../../types";
import { safeParseInt } from "../../utils/parseInt";

type GitLabStatus = "opened" | "closed";

interface GitLabIssueType {
  Title: string;
  Description: string;
  URL: string;
  State: GitLabStatus;
  Labels: string;
  "Due Date": string;
  "Created At (UTC)": string;
  "Closed At (UTC)": string;
  Weight: string;
  "Time Estimate": string;
}

/**
 * Import issues from GitLab CSV export.
 *
 * @param filePath  path to csv file
 */
export class GitLabCsvImporter implements Importer {
  public constructor(filePath: string) {
    this.filePath = filePath;
  }

  public get name(): string {
    return "GitLab (CSV)";
  }

  public get defaultTeamName(): string {
    return "Linear";
  }

  public import = async (): Promise<ImportResult> => {
    const data = (await csv().fromFile(this.filePath)) as GitLabIssueType[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    const weights = new Set(data.map(r => safeParseInt(r.Weight)).filter(w => !!w)) as Set<number>;
    const normalizedWeights = normalizeWeights(weights);

    for (const row of data) {
      const labels = row.Labels.split(",").filter(tag => !!tag);
      const weight = safeParseInt(row.Weight);
      const timeEstimateSeconds = safeParseInt(row["Time Estimate"]);

      importData.issues.push({
        title: row.Title,
        description: `${row.Description}\n\n[Original issue](${row.URL})`,
        status: row.State === "closed" ? "Completed" : "Backlog",
        createdAt: !!row["Created At (UTC)"] ? new Date(row["Created At (UTC)"]) : undefined,
        completedAt: row.State === "closed" && !!row["Closed At (UTC)"] ? new Date(row["Closed At (UTC)"]) : undefined,
        labels,
        priority: !!weight ? normalizedWeights.get(weight) : undefined,
        dueDate: !!row["Due Date"] ? new Date(row["Due Date"]) : undefined,
        estimate: !!timeEstimateSeconds ? convertTimeEstimateToPoints(timeEstimateSeconds) : undefined,
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

// Map weights to a normalized range of 0-4, with 0 being the highest weight.
const normalizeWeights = (weights: Set<number>) => {
  const res: Map<number, IssuePriority> = new Map();

  const sortedWeights = Array.from(weights).sort((a, b) => a - b);
  const max = sortedWeights[sortedWeights.length - 1];
  const min = sortedWeights[0];

  for (const weight of sortedWeights) {
    if (max === min) {
      // Handle division by zero
      res.set(weight, 1);
    } else {
      res.set(weight, Math.round(((max - weight) / (max - min)) * 4) as IssuePriority);
    }
  }

  return res;
};

/**
 * Convert GitLab time estimate (in seconds) to Linear estimate points.
 * GitLab exports estimates in seconds, but Linear uses a point scale (max 64).
 * We convert seconds to hours and map to a reasonable estimate scale.
 * 
 * @param seconds - Time estimate in seconds from GitLab
 * @returns Linear estimate points (0-64)
 */
const convertTimeEstimateToPoints = (seconds: number): number => {
  if (seconds <= 0) {
    return 0;
  }

  // Convert seconds to hours
  const hours = seconds / 3600;

  // Map hours to story points using a reasonable scale:
  // 0-1h -> 1 point
  // 1-2h -> 2 points
  // 2-4h -> 3 points
  // 4-8h -> 5 points
  // 8-16h -> 8 points
  // 16-32h -> 13 points
  // 32-64h -> 21 points
  // 64h+ -> cap at 64 points (Linear's maximum)
  
  if (hours <= 1) {
    return 1;
  }
  if (hours <= 2) {
    return 2;
  }
  if (hours <= 4) {
    return 3;
  }
  if (hours <= 8) {
    return 5;
  }
  if (hours <= 16) {
    return 8;
  }
  if (hours <= 32) {
    return 13;
  }
  if (hours <= 64) {
    return 21;
  }
  
  // For very large estimates, cap at Linear's maximum of 64
  return Math.min(64, Math.ceil(hours / 2));
};
