import csv from "csvtojson";

import type { Comment, Importer, ImportResult, IssuePriority, IssueStatus } from "../../types.ts";

/**
 * ClickUp CSV export rows. Some column names carry a leading space
 * (e.g. " Task Name") depending on the export, so we access them via
 * a helper that tries both variants.
 */
interface ClickupRow {
  [key: string]: string;
}

// — helpers ——————————————————————————————————————————————————————————————

/** Access a CSV column value, tolerating a leading-space variant of the key. */
const col = (row: ClickupRow, name: string): string => {
  const raw = row[name] ?? row[` ${name}`] ?? "";
  return raw.trim();
};

/**
 * ClickUp exports array-like fields as `[value1, value2]`.
 * Parse that into a trimmed string array, filtering empties.
 */
const parseArray = (value: string): string[] => {
  if (!value || value === "[]") {
    return [];
  }
  // Strip surrounding brackets then split on comma
  const inner = value.replace(/^\[/, "").replace(/\]$/, "");
  return inner
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
};

/** Map ClickUp numeric priority (1 = Urgent … 4 = Low) to Linear priority. */
const mapPriority = (value: string): IssuePriority => {
  switch (value) {
    case "1":
      return 1; // Urgent  → Linear Urgent
    case "2":
      return 2; // High    → Linear High
    case "3":
      return 3; // Normal  → Linear Medium
    case "4":
      return 4; // Low     → Linear Low
    default:
      return 0; // null / missing → No priority
  }
};

/** Map a ClickUp status string to a Linear status category. */
const mapStatusType = (status: string): IssueStatus => {
  const s = status.toLowerCase();
  if (["done", "shipped", "closed", "complete", "completed"].some(k => s.includes(k))) {
    return "completed";
  }
  if (["cancel", "reject", "void"].some(k => s.includes(k))) {
    return "canceled";
  }
  if (
    ["in progress", "in development", "in design", "in review", "testing", "qa", "validation", "blocked"].some(k =>
      s.includes(k)
    )
  ) {
    return "started";
  }
  if (["to do", "todo", "open"].some(k => s.includes(k))) {
    return "unstarted";
  }
  return "backlog";
};

/**
 * Map a ClickUp status to a standard Linear workflow state name.
 * These names match the default states created with a new Linear team,
 * so `importIssues` will find them by name and skip creating new ones.
 */
const mapToStandardLinearStatus = (status: string): string => {
  switch (mapStatusType(status)) {
    case "completed":
      return "Done";
    case "canceled":
      return "Canceled";
    case "started":
      return "In Progress";
    case "unstarted":
      return "Todo";
    case "backlog":
    default:
      return "Backlog";
  }
};

/** Parse a millisecond-epoch timestamp string into a Date (or undefined). */
const msToDate = (value: string): Date | undefined => {
  if (!value) {
    return undefined;
  }
  const n = Number(value);
  if (Number.isNaN(n) || n <= 0) {
    return undefined;
  }
  return new Date(n);
};

interface ClickupComment {
  text?: string;
  by?: string;
  date?: string;
  resolved?: string;
}

/** Best-effort parse of the Comments JSON column. */
const parseComments = (value: string): Comment[] => {
  if (!value || value === "[]") {
    return [];
  }
  try {
    const arr: ClickupComment[] = JSON.parse(value);
    return arr
      .filter(c => c.text)
      .map(c => ({
        body: c.text,
        userId: c.by ?? "Unknown",
        createdAt: c.date ? new Date(c.date) : undefined,
      }));
  } catch {
    return [];
  }
};

// — importer —————————————————————————————————————————————————————————————

/** Options controlling how the ClickUp CSV import behaves. */
export interface ClickupImportOptions {
  /** When true, tags / list / space labels are included and will be created in Linear. */
  createLabels: boolean;
  /** When true, ClickUp statuses are imported as-is. When false, they are mapped to standard Linear statuses. */
  importStatuses: boolean;
}

/**
 * Import issues from a ClickUp CSV export.
 *
 * @param filePath  Path to the exported CSV file
 * @param options   Import behaviour options
 */
export class ClickupCsvImporter implements Importer {
  public constructor(
    private filePath: string,
    private options: ClickupImportOptions
  ) {}

  public get name(): string {
    return "ClickUp (CSV)";
  }

  public get defaultTeamName(): string {
    return "ClickUp";
  }

  public import = async (): Promise<ImportResult> => {
    const data = (await csv().fromFile(this.filePath)) as ClickupRow[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    for (const row of data) {
      const taskId = col(row, "Task ID");
      const customId = col(row, "Task Custom ID");
      const title = col(row, "Task Name");
      const description = col(row, "Task Content") || undefined;
      const rawStatus = col(row, "Status");
      const status = this.options.importStatuses ? rawStatus : mapToStandardLinearStatus(rawStatus);
      const priority = mapPriority(col(row, "Priority"));
      const assignees = parseArray(col(row, "Assignees"));
      const tags = this.options.createLabels ? parseArray(col(row, "Tags")) : [];
      const listName = this.options.createLabels ? col(row, "List Name") : "";
      const spaceName = this.options.createLabels ? col(row, "Space Name") : "";
      const createdAt = msToDate(col(row, "Date Created"));
      const dueDate = msToDate(col(row, "Due Date"));
      const startedAt = msToDate(col(row, "Start Date"));
      const comments = parseComments(col(row, "Comments"));

      // Build the URL — prefer custom ID if present
      const displayId = customId || taskId;
      const url = taskId ? `https://app.clickup.com/t/${taskId}` : undefined;

      // Collect users
      for (const name of assignees) {
        if (!importData.users[name]) {
          importData.users[name] = { name };
        }
      }
      // Collect users from comments
      for (const c of comments) {
        if (c.userId && !importData.users[c.userId]) {
          importData.users[c.userId] = { name: c.userId };
        }
      }

      // Collect labels from tags
      for (const tag of tags) {
        if (!importData.labels[tag]) {
          importData.labels[tag] = { name: tag };
        }
      }

      // Add List Name and Space Name as labels for grouping context
      const labels: string[] = [...tags];
      if (listName) {
        const listLabel = `List: ${listName}`;
        labels.push(listLabel);
        if (!importData.labels[listLabel]) {
          importData.labels[listLabel] = { name: listLabel };
        }
      }
      if (spaceName) {
        const spaceLabel = `Space: ${spaceName}`;
        labels.push(spaceLabel);
        if (!importData.labels[spaceLabel]) {
          importData.labels[spaceLabel] = { name: spaceLabel };
        }
      }

      // Collect statuses (only when importing custom statuses)
      if (this.options.importStatuses && status && importData.statuses && !importData.statuses[status]) {
        importData.statuses[status] = {
          name: status,
          type: mapStatusType(status),
        };
      }

      // Build description with link back to ClickUp
      const descriptionParts: string[] = [];
      if (description) {
        descriptionParts.push(description);
      }
      if (url) {
        descriptionParts.push(`[View original issue in ClickUp](${url})`);
      }
      if (customId) {
        descriptionParts.push(`ClickUp ID: ${displayId}`);
      }

      importData.issues.push({
        title,
        description: descriptionParts.length > 0 ? descriptionParts.join("\n\n") : undefined,
        status: status || undefined,
        priority,
        url,
        assigneeId: assignees.length > 0 ? assignees[0] : undefined,
        labels,
        comments: comments.length > 0 ? comments : undefined,
        createdAt,
        dueDate,
        startedAt,
      });
    }

    return importData;
  };
}
