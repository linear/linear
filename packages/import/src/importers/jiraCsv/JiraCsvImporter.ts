import csv from "csvtojson";
import { isValid, parse, parseISO } from "date-fns";
import j2m from "jira2md";
import type { Importer, ImportResult, IssuePriority } from "../../types.ts";
import { safeParseInt } from "../../utils/parseInt.ts";

type JiraPriority = "Highest" | "High" | "Medium" | "Low" | "Lowest";

// There are many estimate fields in Jira. Use the one that comes as the default in new projects.
const estimateCustomField = "Custom field (Story point estimate)";

interface JiraIssueType {
  Description: string;
  Status: string;
  "Issue key": string;
  "Issue Type": string;
  Priority: JiraPriority;
  "Project key": string;
  Summary: string;
  Assignee: string;
  Created: string;
  Updated?: string;
  Resolved?: string;
  "Status Category"?: string;
  "Status Category Changed"?: string;
  Release: string;
  [estimateCustomField]?: string;
}

// Date formats Jira uses in CSV exports, with its default format (e.g. "05/Mar/24 3:12 PM") first
const jiraDateFormats = [
  "d/MMM/yy h:mm a",
  "d/MMM/yyyy h:mm a",
  "d/MMM/yy H:mm",
  "d/MMM/yyyy H:mm",
  "d/MMM/yy",
  "d/MMM/yyyy",
  "yyyy-MM-dd HH:mm:ss",
  "yyyy-MM-dd HH:mm",
];

/**
 * Parses a date from a Jira CSV export, in the time zone of the machine running the import.
 *
 * @returns The date, or undefined when the value is empty or not in a known format
 */
export const parseJiraDate = (value?: string): Date | undefined => {
  const trimmed = value?.trim();
  if (!trimmed) {
    return undefined;
  }

  const referenceDate = new Date();
  for (const format of jiraDateFormats) {
    const date = parse(trimmed, format, referenceDate);
    if (isValid(date)) {
      return date;
    }
  }

  const isoDate = parseISO(trimmed);
  return isValid(isoDate) ? isoDate : undefined;
};

/**
 * Maps a Jira issue's status category to when it was started or completed, so issues finished in Jira are imported as
 * completed and issues in progress as started. Issues in the "To Do" category, or any other category, get neither.
 */
export const mapStatusCategoryDates = (
  row: Pick<JiraIssueType, "Status Category" | "Status Category Changed" | "Resolved" | "Updated" | "Created">
): { startedAt?: Date; completedAt?: Date } => {
  const category = row["Status Category"]?.trim().toLowerCase();
  const categoryChangedAt = parseJiraDate(row["Status Category Changed"]);
  const updatedAt = parseJiraDate(row.Updated);
  const createdAt = parseJiraDate(row.Created);

  if (category === "done") {
    return { completedAt: parseJiraDate(row.Resolved) ?? categoryChangedAt ?? updatedAt ?? createdAt };
  }
  if (category === "in progress") {
    return { startedAt: categoryChangedAt ?? updatedAt ?? createdAt };
  }
  return {};
};

/**
 * Import issues from a Jira CSV export.
 *
 * @param filePath Path to CSV file
 * @param orgSlug Jira site name
 * @param customUrl Non-cloud Jira instance base URL
 */
export class JiraCsvImporter implements Importer {
  public constructor(filePath: string, orgSlug: string, customUrl: string) {
    this.filePath = filePath;
    this.jiraSiteName = orgSlug;
    this.customJiraUrl = customUrl;
  }

  public get name(): string {
    return "Jira (CSV)";
  }

  public get defaultTeamName(): string {
    return "Jira";
  }

  public import = async (): Promise<ImportResult> => {
    const data = (await csv().fromFile(this.filePath)) as JiraIssueType[];

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    const statuses = Array.from(new Set(data.map(row => row.Status)));
    const assignees = Array.from(new Set(data.map(row => row.Assignee)));

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
      const url = this.jiraSiteName
        ? `https://${this.jiraSiteName}.atlassian.net/browse/${row["Issue key"]}`
        : `${this.customJiraUrl}/browse/${row["Issue key"]}`;
      const mdDesc = row.Description ? j2m.to_markdown(row.Description) : undefined;
      const description =
        mdDesc && url
          ? `${mdDesc}\n\n[View original issue in Jira](${url})`
          : url
            ? `[View original issue in Jira](${url})`
            : undefined;
      const priority = mapPriority(row.Priority);
      const type = `Type: ${row["Issue Type"]}`;
      const release = row.Release && row.Release.length > 0 ? `Release: ${row.Release}` : undefined;
      const assigneeId = row.Assignee && row.Assignee.length > 0 ? row.Assignee : undefined;
      const status = row.Status;
      const estimate = safeParseInt(row[estimateCustomField]);
      const createdAt = parseJiraDate(row.Created);
      const { startedAt, completedAt } = mapStatusCategoryDates(row);

      const labels = [type];
      if (release) {
        labels.push(release);
      }

      importData.issues.push({
        title: row.Summary,
        description,
        status,
        priority,
        url,
        assigneeId,
        labels,
        estimate,
        createdAt,
        startedAt,
        completedAt,
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
  private customJiraUrl: string;
  private jiraSiteName?: string;
}

const mapPriority = (input: JiraPriority): IssuePriority => {
  const priorityMap: { [k: string]: IssuePriority } = {
    Highest: 1,
    High: 2,
    Medium: 3,
    Low: 4,
    Lowest: 0,
  };
  return priorityMap[input] || 0;
};
