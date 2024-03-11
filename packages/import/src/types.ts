/** Issue. */
export interface Issue {
  /** Issue title */
  title: string;
  /** Description in markdown */
  description?: string;
  /** Status */
  status?: string;
  /** Assigned user */
  assigneeId?: string;
  /** Issue's priority from 0-4, with 0 being the most important. Undefined for non-prioritized. */
  priority?: number;
  /** Issue's comments */
  comments?: Comment[];
  /** Issue's label IDs */
  labels?: string[];
  /** Link to original issue. */
  url?: string;
  /** When the issue was created. */
  createdAt?: Date;
  /** When the issue is due. This is a date string of the format yyyy-MM-dd. */
  dueDate?: Date;
  /** When the issue was completed. */
  completedAt?: Date;
  /** When the issue was started. */
  startedAt?: Date;
  originalId?: string;
}

/** Issue comment */
export interface Comment {
  /** Comment's body in markdown */
  body?: string;
  /** User who posted the comments */
  userId: string;
  /** When the comment was created. */
  createdAt?: Date;
}

export type IssueStatus = "backlog" | "unstarted" | "started" | "completed" | "canceled";

/** Import response. */
export interface ImportResult {
  issues: Issue[];
  statuses?: {
    [id: string]: {
      name: string;
      color?: string;
      type?: IssueStatus;
    };
  };
  users: {
    [id: string]: {
      name: string;
      email?: string;
      avatarUrl?: string;
    };
  };
  labels: {
    [id: string]: {
      name: string;
      color?: string;
      description?: string;
    };
  };
  /// A suffix to be appended to each resource URL (e.g. to authenticate requests)
  resourceURLSuffix?: string;
  subIssues?: { [key: string]: string[] };
}

/**
 * Generic importer interface.
 */
export interface Importer {
  // Import source name (e.g. 'GitHub')
  name: string;
  // Default team name (used in the prompt)
  defaultTeamName?: string;
  // Gets issues from import source
  import(): Promise<ImportResult>;
}

export interface ImportAnswers {
  // Linear's API key
  linearApiKey: string;
  // Import service type
  service: string;
}
