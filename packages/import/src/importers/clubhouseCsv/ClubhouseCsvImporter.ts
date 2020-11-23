/* eslint-disable @typescript-eslint/no-explicit-any */
import csv from "csvtojson";
import { Importer, ImportResult } from "../../types";

type ClubhouseStoryType = "feature" | "bug" | "chore";

interface ClubhouseIssueType {
  id: string;
  name: string;
  type: ClubhouseStoryType;
  requestor: string;
  owners: string[];
  description: string;
  is_completed: boolean;
  created_at: Date;
  started_at: Date;
  updated_at: Date;
  moved_at: Date;
  completed_at: Date;
  estimate: number;
  external_ticket_count: number;
  external_tickets: string[];
  is_blocked: boolean;
  is_a_blocker: boolean;
  due_date: Date;
  labels: string[];
  epic_labels: string[];
  tasks: string[];
  state: string;
  epic_id: string;
  epic: string;
  project_id: string;
  project: string;
  iteration_id: string;
  iteration: string;
  is_archived: boolean;
}

const parseBooleanColumn = (item: string) => item === "TRUE";
const parseStringArrayColumn = (item: string) => item.split(";").filter(s => s.length > 0);
const parseInt = (item: string) => Number.parseInt(item) || 0;
const parseDate = (item: string, _: any, __: any, row: string[]) => {
  if (item.length <= 0) {
    return null;
  }
  // Inoptimal method for finding the timezone UTC offset, we parse it from the UTC offset column in this row each time
  const utcOffset = row.find(c => /[+-]([01]\d|2[0-4])(:?[0-5]\d)?/g.test(c)) || "";
  return new Date(item + " " + utcOffset);
};

const colParser = {
  owners: parseStringArrayColumn,
  is_completed: parseBooleanColumn,
  created_at: parseDate,
  started_at: parseDate,
  updated_at: parseDate,
  moved_at: parseDate,
  completed_at: parseDate,
  estimate: parseInt,
  external_ticket_count: parseInt,
  external_tickets: parseStringArrayColumn,
  is_blocked: parseBooleanColumn,
  is_a_blocker: parseBooleanColumn,
  due_date: parseDate,
  labels: parseStringArrayColumn,
  epic_labels: parseStringArrayColumn,
  tasks: parseStringArrayColumn,
  is_archived: parseBooleanColumn,
  // we parse dates using it, so to avoid confusion, leave it out of parsed rows
  utc_offset: "omit",
};

/**
 * Import issues from an Clubhouse CSV export.
 *
 * @param filePath  path to csv file
 * @param workspaceSlug   Clubhouse workspace slug (https://app.clubhouse.io/[THIS])
 * @param apiToken  A Clubhouse API token (https://app.clubhouse.io/settings/account/api-tokens)
 */
export class ClubhouseCsvImporter implements Importer {
  public constructor(private filePath: string, workspaceSlug: string, private apiToken: string) {
    this.clubhouseBaseURL = "https://app.clubhouse.io/" + workspaceSlug;
  }

  public get name(): string {
    return "Clubhouse (CSV)";
  }

  public get defaultTeamName(): string {
    return "Clubhouse";
  }

  public import = async (): Promise<ImportResult> => {
    const data = (await csv({ colParser, checkType: true }).fromFile(this.filePath)) as ClubhouseIssueType[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
      resourceURLSuffix: "?token=" + this.apiToken,
    };

    const assignees = Array.from(new Set(data.map(row => row.owners).flat()));

    for (const user of assignees) {
      importData.users[user] = {
        name: user,
        email: user,
      };
    }

    for (const row of data) {
      const title = row.name;
      if (!title) {
        continue;
      }

      const url = this.clubhouseBaseURL + "/story/" + row.id;
      const descriptionParts = [
        row.description,
        row.tasks.map(t => `- ${t}`).join("\n"),
        row.external_tickets.map(externalUrl => `* **External Link:** ${externalUrl}`).join("\n"),
        `[View original issue in Clubhouse](${url})`,
      ];
      const description = descriptionParts.filter(s => s.length > 0).join("\n\n");

      const tags = row.labels;
      tags.push(row.type);

      const assigneeId = row.owners[0];

      const status = mapStatus(row.state);

      const labels = tags.filter(tag => !!tag);

      const createdAt = row.created_at;

      importData.issues.push({
        title,
        description,
        status,
        url,
        assigneeId,
        labels,
        createdAt,
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

  private clubhouseBaseURL: string;
}

const mapStatus = (input: string): string => {
  const priorityMap: { [chState: string]: string } = {
    // 'Standard' workflow template
    Unscheduled: "Backlog",
    "Ready for Development": "Todo",
    "In Development": "In Progress",
    "Ready for Review": "In Review",
    "Ready for Deploy": "Done",
    Completed: "Done",

    // 'Simple' workflow template
    "To Do": "Todo",
    Doing: "In Progress",
    Done: "Done",
  };
  return priorityMap[input] || "Todo";
};
