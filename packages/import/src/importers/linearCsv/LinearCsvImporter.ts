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
 * This function attempts to intelligently split labels by looking for ", " patterns
 * that separate distinct labels rather than being part of a label name.
 *
 * Strategy: Split on ", " only when what follows appears to start a new label:
 * - Contains "/" (indicating a hierarchical label like "Parent/Child")
 * - After we've moved past any "/" in the current label (not in the middle of a sub-label name)
 */
function parseLabels(labelsStr: string): string[] {
  // Handle empty or whitespace-only strings
  if (!labelsStr || !labelsStr.trim()) {
    return [];
  }

  const labels: string[] = [];
  let currentLabel = "";

  for (let i = 0; i < labelsStr.length; i++) {
    // Check for potential label separator (", ")
    if (labelsStr[i] === "," && labelsStr[i + 1] === " ") {
      const remainingStr = labelsStr.substring(i + 2);
      const lastSlashInCurrent = currentLabel.lastIndexOf("/");

      // Check if what follows contains "/" (indicating start of new hierarchical label)
      const nextSlashIndex = remainingStr.indexOf("/");
      const nextCommaIndex = remainingStr.indexOf(", ");

      // A ", " is a label separator if what follows has "/" before the next ", "
      // This indicates a new "Parent/Child" label is starting
      const followingHasSlash = nextSlashIndex !== -1 && (nextCommaIndex === -1 || nextSlashIndex < nextCommaIndex);

      // We're in a hierarchical label if current has "/"
      const inHierarchicalLabel = lastSlashInCurrent !== -1;

      // If we're in a hierarchical label (e.g., "Parent/Child, with commas")
      // only split if what follows also starts a hierarchical label
      // Otherwise (flat label), split on any ", " followed by uppercase (new label)
      let isLabelSeparator = false;
      if (inHierarchicalLabel) {
        // In hierarchy: only split if next part also has hierarchy
        isLabelSeparator = followingHasSlash;
      } else {
        // Not in hierarchy: split if next part starts a new label (has "/" or is capitalized)
        const nextStartsWithUpper = remainingStr.length > 0 && /^[A-Z]/.test(remainingStr);
        isLabelSeparator = followingHasSlash || nextStartsWithUpper;
      }

      if (isLabelSeparator) {
        // This ", " separates labels
        if (currentLabel.trim()) {
          labels.push(currentLabel.trim());
        }
        currentLabel = "";
        i++; // Skip the space after comma (loop increment handles comma)
      } else {
        // This ", " is part of the label name
        currentLabel += labelsStr[i];
      }
    } else {
      currentLabel += labelsStr[i];
    }
  }

  // Add the final label
  if (currentLabel.trim()) {
    labels.push(currentLabel.trim());
  }

  return labels;
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
