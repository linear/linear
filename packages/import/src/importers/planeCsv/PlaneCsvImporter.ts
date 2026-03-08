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

    const uniqueStates = new Set(data.map(row => row["State Name"]).filter(Boolean));
    for (const state of uniqueStates) {
      importData.statuses![state] = {
        name: state,
        type: mapStateToIssueStatus(state),
      };
    }

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

      if (row["Is Draft"]?.toLowerCase() === "true") {
        continue;
      }

      const priority = mapPriority(row.Priority);
      const status = row["State Name"] || "Backlog";

      const createdAt = parseDate(row["Created At"]);
      const completedAt = parseDate(row["Completed At"]);
      const startedAt = parseDate(row["Start Date"]);
      const dueDate = parseDate(row["Target Date"]);
      const archivedAt = parseDate(row["Archived At"]);

      const labelNames = parseJsonArray(row.Labels);

      const assignees = parseJsonArray(row.Assignees);
      const assigneeId = assignees.length > 0 ? assignees[0] : undefined;

      const estimate = safeParseInt(row.Estimate);

      const comments: Comment[] = parseJsonArray<PlaneComment>(row.Comments)
        .filter(c => c.comment)
        .map(c => ({
          body: c.comment,
          userId: c.created_by || "Unknown",
          createdAt: parseDate(c.created_at),
        }));

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

  private filePath: string;
}

const parseJsonArray = <T = string>(value: string): T[] => {
  if (!value || value.trim() === "") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const buildDescription = (row: PlaneIssueType): string | undefined => {
  const parts: string[] = [];

  if (row.Identifier) {
    parts.push(`*Imported from Plane: ${row.Identifier}*`);
  }

  if (row.Parent) {
    parts.push(`**Parent:** ${row.Parent}`);
  }

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

const mapStateToIssueStatus = (stateName: string): IssueStatus => {
  const lower = stateName.toLowerCase();
  if (lower === "backlog") return "backlog";
  if (lower === "cancelled" || lower === "canceled") return "canceled";
  if (lower === "done" || lower === "closed" || lower === "resolved") return "completed";
  if (lower.includes("progress") || lower.includes("review")) return "started";
  return "unstarted";
};

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

const parseDate = (dateStr: string): Date | undefined => {
  if (!dateStr || dateStr.trim() === "") {
    return undefined;
  }
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? undefined : date;
};
