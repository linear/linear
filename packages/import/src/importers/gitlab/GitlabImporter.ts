/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Importer, ImportResult } from "../../types";
import { getGitlabIssuesFromRepo, getGitlabProjectId } from "./client";

export interface GITLAB_ISSUE {
  id: number;
  title: string;
  description: string;
  labels: string[];
  assignees: Assignee[];
  due_date: string;
  severity: string;
  web_url: string;
  created_at: Date;
  state: string;
}

type LinearPriority = "No priority" | "Urgent" | "High" | "Medium" | "Low";

export interface Author {
  state: string;
  id: number;
  web_url: string;
  name: string;
  avatar_url: any;
  username: string;
}

export interface Milestone {
  project_id: number;
  description: string;
  state: string;
  due_date: any;
  iid: number;
  created_at: string;
  title: string;
  id: number;
  updated_at: string;
}

export interface Assignee {
  state: string;
  id: number;
  name: string;
  web_url: string;
  avatar_url: any;
  username: string;
}

export interface References {
  short: string;
  relative: string;
  full: string;
}

export interface TimeStats {
  time_estimate: number;
  total_time_spent: number;
  human_time_estimate: any;
  human_total_time_spent: any;
}

export interface Links {
  self: string;
  notes: string;
  award_emoji: string;
  project: string;
}

export interface TaskCompletionStatus {
  count: number;
  completed_count: number;
}

/**
 * Fetch and paginate through all Github issues.
 *
 * @param accessToken GitLab access token for authentication
 */
export class GitLabImporter implements Importer {
  private readonly accessToken: string;
  private readonly projectName: string;

  public constructor(projectId: string, accessToken: string) {
    this.projectName = projectId;
    this.accessToken = accessToken;
  }

  public get name(): string {
    return "GitLab";
  }

  public get defaultTeamName(): string {
    return "GitLab";
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public import = async (): Promise<ImportResult> => {
    const projectId = await getGitlabProjectId(this.accessToken, this.projectName);

    const issues: GITLAB_ISSUE[] = await getGitlabIssuesFromRepo(this.accessToken, projectId);

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
    };

    for (const issue of issues) {
      importData.issues.push({
        title: issue.title,
        description: issue.description,
        url: issue.web_url,
        labels: issue.labels,
        createdAt: new Date(issue.created_at),
        dueDate: issue.due_date ? new Date(issue.due_date) : undefined,
        priority: mapPriority("Low"),
        status: issue.state,
      });

      for (const assignee of issue.assignees) {
        importData.users[assignee.id] = {
          name: assignee.name,
          avatarUrl: assignee.avatar_url,
        };
      }

      for (const label of issue.labels) {
        importData.labels[label] = {
          name: label,
        };
      }
    }

    return importData;
  };
}

const mapPriority = (input: LinearPriority): number => {
  const priorityMap = {
    "No priority": 0,
    Urgent: 1,
    High: 2,
    Medium: 3,
    Low: 4,
  };

  return priorityMap[input] || 0;
};
