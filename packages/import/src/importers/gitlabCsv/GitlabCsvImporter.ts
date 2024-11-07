import csv from "csvtojson";
import { Importer, ImportResult } from "../../types";
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
    return "Linear (CSV)";
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
      const estimate = safeParseInt(row["Time Estimate"]);

      importData.issues.push({
        title: row.Title,
        description: `${row.Description}\n\n[Original issue](${row.URL})`,
        status: row.State === "closed" ? "Completed" : "Backlog",
        createdAt: !!row["Created At (UTC)"] ? new Date(row["Created At (UTC)"]) : undefined,
        completedAt: row.State === "closed" && !!row["Closed At (UTC)"] ? new Date(row["Closed At (UTC)"]) : undefined,
        labels,
        priority: !!weight ? normalizedWeights.get(weight) : undefined,
        dueDate: !!row["Due Date"] ? new Date(row["Due Date"]) : undefined,
        estimate: !!estimate ? estimate : undefined,
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

// Map weights to a normalized range of 0-4, with 0 being the highest weight. Answer with a map of original to normalized.
const normalizeWeights = (weights: Set<number>) => {
  const res: Map<number, number> = new Map();

  const sortedWeights = Array.from(weights).sort((a, b) => a - b);
  const max = sortedWeights[sortedWeights.length - 1];
  const min = sortedWeights[0];

  for (const weight of sortedWeights) {
    if (max === min) {
      res.set(weight, 0);
    } else {
      res.set(weight, Math.round(((max - weight) / (max - min)) * 4));
    }
  }

  return res;
};
