import csv from "csvtojson";
import type { Comment, Importer, ImportResult, IssuePriority, IssueStatus } from "../../types.ts";
import { safeParseInt } from "../../utils/parseInt.ts";

interface PlaneIssueType {
  "Project Name": string;
  "Project Identifier": string;
  Parent: string;
  Identifier: string;
  "Sequence Id": string;
  Name: string;
  "State Name": string;
  Priority: string;
  Assignees: string;
  Subscribers: string;
  "Created By Name": string;
  "Start Date": string;
  "Target Date": string;
  "Completed At": string;
  "Created At": string;
  "Updated At": string;
  "Archived At": string;
  Estimate: string;
  Labels: string;
  Cycles: string;
  Modules: string;
  Links: string;
  Relations: string;
  Comments: string;
  "Sub Issues Count": string;
  "Link Count": string;
  "Attachment Count": string;
  "Is Draft": string;
}

interface PlaneComment {
  comment: string;
  created_by: string;
  created_at: string;
}

interface PlaneLink {
  url: string;
  title: string;
}

interface PlaneRelation {
  type: string;
  issue: string;
  direction: string;
}

/**
 * Import issues from a Plane CSV export.
 *
 * @param filePath  path to csv file
 */
export class PlaneCsvImporter implements Importer {
  public constructor(filePath: string) {
    this.filePath = filePath;
  }

  public get name(): string {
    return "Plane (CSV)";
  }

  public get defaultTeamName(): string {
    return "Plane";
  }

  public import = async (): Promise<ImportResult> => {
    const data = (await csv().fromFile(this.filePath)) as PlaneIssueType[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    // Dynamic status extraction from data
    const uniqueStates = new Set(data.map(row => row["State Name"]).filter(Boolean));
    for (const state of uniqueStates) {
      importData.statuses![state] = {
        name: state,
        type: mapStateToIssueStatus(state),
      };
    }

    // Extract all unique users from "Created By Name", "Assignees", and comment authors
    const allUsers = new Set<string>();
    for (const row of data) {
      if (row["Created By Name"]) {
        allUsers.add(row["Created By Name"].trim());
      }
      for (const name of parseJsonArray(row.Assignees)) {
        if (name) allUsers.add(name.trim());
      }
      for (const comment of parseJsonArray<PlaneComment>(row.Comments)) {
        if (comment.created_by) allUsers.add(comment.created_by.trim());
      }
    }

    for (const user of allUsers) {
      if (user) {
        importData.users[user] = {
          name: user,
        };
      }
    }

    for (const row of data) {
      const title = row.Name;
      if (!title) {
        continue;
      }

      // Skip draft issues
      if (row["Is Draft"]?.toLowerCase() === "true") {
        continue;
      }

      const priority = mapPriority(row.Priority);
      const status = row["State Name"] || "Backlog";

      // Parse dates
      const createdAt = parseDate(row["Created At"]);
      const completedAt = parseDate(row["Completed At"]);
      const startedAt = parseDate(row["Start Date"]);
      const dueDate = parseDate(row["Target Date"]);
      const archivedAt = parseDate(row["Archived At"]);

      // Parse labels from JSON array
      const labelNames = parseJsonArray(row.Labels);

      // Get first assignee (Linear supports single assignee)
      const assignees = parseJsonArray(row.Assignees);
      const assigneeId = assignees.length > 0 ? assignees[0] : undefined;

      // Parse estimate
      const estimate = safeParseInt(row.Estimate);

      // Parse comments
      const comments: Comment[] = parseJsonArray<PlaneComment>(row.Comments)
        .filter(c => c.comment)
        .map(c => ({
          body: c.comment,
          userId: c.created_by || "Unknown",
          createdAt: parseDate(c.created_at),
        }));

      // Build description from metadata fields not directly mappable to Linear
      const description = buildDescription(row);

      importData.issues.push({
        title,
        description,
        status,
        priority,
        assigneeId,
        labels: labelNames,
        comments: comments.length > 0 ? comments : undefined,
        createdAt,
        completedAt,
        startedAt,
        dueDate,
        estimate,
        archived: !!archivedAt,
      });

      // Add labels to the labels map
      for (const labelName of labelNames) {
        if (!importData.labels[labelName]) {
          importData.labels[labelName] = {
            name: labelName,
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
 * Safely parse a JSON-encoded array from a CSV cell.
 * Plane's CSVFormatter encodes lists with json.dumps().
 */
const parseJsonArray = <T = string>(value: string): T[] => {
  if (!value || value.trim() === "") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/**
 * Build a description from Plane metadata fields that have no direct Linear equivalent.
 */
const buildDescription = (row: PlaneIssueType): string | undefined => {
  const parts: string[] = [];

  if (row.Identifier) {
    parts.push(`*Imported from Plane: ${row.Identifier}*`);
  }

  if (row.Parent) {
    parts.push(`**Parent:** ${row.Parent}`);
  }

  // Preserve additional assignees beyond the first (Linear only supports single assignee)
  const assignees = parseJsonArray(row.Assignees);
  if (assignees.length > 1) {
    parts.push(`**Additional assignees:** ${assignees.slice(1).join(", ")}`);
  }

  const links = parseJsonArray<PlaneLink>(row.Links);
  if (links.length > 0) {
    parts.push("**Links:**\n" + links.map(l => `- ${l.title}: ${l.url}`).join("\n"));
  }

  const relations = parseJsonArray<PlaneRelation>(row.Relations);
  if (relations.length > 0) {
    parts.push("**Relations:**\n" + relations.map(r => `- ${r.direction} ${r.type}: ${r.issue}`).join("\n"));
  }

  const cycles = parseJsonArray(row.Cycles);
  if (cycles.length > 0) {
    parts.push(`**Cycles:** ${cycles.join(", ")}`);
  }

  const modules = parseJsonArray(row.Modules);
  if (modules.length > 0) {
    parts.push(`**Modules:** ${modules.join(", ")}`);
  }

  return parts.length > 0 ? parts.join("\n\n") : undefined;
};

/**
 * Map Plane state name to Linear issue status type.
 */
const mapStateToIssueStatus = (stateName: string): IssueStatus => {
  const lower = stateName.toLowerCase();
  if (lower === "backlog") return "backlog";
  if (lower === "cancelled" || lower === "canceled") return "canceled";
  if (lower === "done" || lower === "closed" || lower === "resolved") return "completed";
  if (lower.includes("progress") || lower.includes("review")) return "started";
  return "unstarted";
};

/**
 * Map Plane priority to Linear priority.
 * Linear: 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low
 */
const mapPriority = (input: string): IssuePriority => {
  const priorityMap: { [k: string]: IssuePriority } = {
    urgent: 1,
    high: 2,
    medium: 3,
    low: 4,
    none: 0,
  };
  return priorityMap[input?.toLowerCase()] || 0;
};

/**
 * Parse a date string. Plane exports ISO 8601 dates from Django REST Framework.
 */
const parseDate = (dateStr: string): Date | undefined => {
  if (!dateStr || dateStr.trim() === "") {
    return undefined;
  }
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? undefined : date;
};
