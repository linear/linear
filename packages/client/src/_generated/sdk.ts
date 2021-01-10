/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocumentNode } from "graphql";
import * as D from "./documents";
export * from "./documents";

/** The function type for calling the graphql client */
export type LinearRequest = <R, V>(doc: DocumentNode, vars?: V) => Promise<R>;

export class User {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.UserFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.displayName = data.displayName ?? undefined;
    this.email = data.email ?? undefined;
    this.avatarUrl = data.avatarUrl ?? undefined;
    this.disableReason = data.disableReason ?? undefined;
    this.inviteHash = data.inviteHash ?? undefined;
    this.userAccountId = data.userAccountId ?? undefined;
    this.lastSeen = data.lastSeen ?? undefined;
    this.admin = data.admin ?? undefined;
    this.active = data.active ?? undefined;
    this.createdIssueCount = data.createdIssueCount ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The user's full name. */
  public name?: string;

  /** The user's display (nick) name. Unique within each organization. */
  public displayName?: string;

  /** The user's email address. */
  public email?: string;

  /** An URL to the user's avatar image. */
  public avatarUrl?: string;

  /** Reason why is the account disabled. */
  public disableReason?: string;

  /** Unique hash for the user to be used in invite URLs. */
  public inviteHash?: string;

  public userAccountId?: string;

  /** The last time the user was seen online. If null, the user is currently online. */
  public lastSeen?: D.Scalars["DateTime"];

  /** Whether the user is an organization administrator. */
  public admin?: boolean;

  /** Whether the user account is active or disabled. */
  public active?: boolean;

  /** Number of issues created. */
  public createdIssueCount?: number;

  /** The settings of the user. */
  public get settings(): Promise<UserSettings | undefined> {
    return new NotificationQuery(this._request).fetch();
  }

  /** Organization in which the user belongs to. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

export class UserSettings {
  private _request: LinearRequest;
  private _user?: D.UserSettingsFragment["user"];

  public constructor(request: LinearRequest, data: D.UserSettingsFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.notificationPreferences = data.notificationPreferences ?? undefined;
    this.unsubscribedFrom = data.unsubscribedFrom ?? undefined;
    this._user = data.user ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The notification channel settings the user has selected. */
  public notificationPreferences?: D.Scalars["JSONObject"];

  /** The email types the user has unsubscribed from. */
  public unsubscribedFrom?: string[];

  /** The user to whom this notification was targeted for. */
  public get user(): Promise<User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
}

export class IssueConnection {
  private _request: LinearRequest;
  private _nodes?: D.IssueConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.IssueConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): Issue[] | undefined {
    return this._nodes?.map(node => new Issue(this._request, node));
  }
}

export class Issue {
  private _request: LinearRequest;
  private _team?: D.IssueFragment["team"];
  private _cycle?: D.IssueFragment["cycle"];
  private _state?: D.IssueFragment["state"];
  private _assignee?: D.IssueFragment["assignee"];
  private _parent?: D.IssueFragment["parent"];
  private _project?: D.IssueFragment["project"];
  private _creator?: D.IssueFragment["creator"];

  public constructor(request: LinearRequest, data: D.IssueFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.number = data.number ?? undefined;
    this.title = data.title ?? undefined;
    this.description = data.description ?? undefined;
    this.descriptionData = data.descriptionData ?? undefined;
    this.priority = data.priority ?? undefined;
    this.estimate = data.estimate ?? undefined;
    this.boardOrder = data.boardOrder ?? undefined;
    this.startedAt = data.startedAt ?? undefined;
    this.completedAt = data.completedAt ?? undefined;
    this.canceledAt = data.canceledAt ?? undefined;
    this.autoClosedAt = data.autoClosedAt ?? undefined;
    this.autoArchivedAt = data.autoArchivedAt ?? undefined;
    this.dueDate = data.dueDate ?? undefined;
    this.previousIdentifiers = data.previousIdentifiers ?? undefined;
    this.subIssueSortOrder = data.subIssueSortOrder ?? undefined;
    this.identifier = data.identifier ?? undefined;
    this.priorityLabel = data.priorityLabel ?? undefined;
    this.url = data.url ?? undefined;
    this.branchName = data.branchName ?? undefined;
    this._team = data.team ?? undefined;
    this._cycle = data.cycle ?? undefined;
    this._state = data.state ?? undefined;
    this._assignee = data.assignee ?? undefined;
    this._parent = data.parent ?? undefined;
    this._project = data.project ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The issue's unique number. */
  public number?: number;

  /** The issue's title. */
  public title?: string;

  /** The issue's description in markdown format. */
  public description?: string;

  /** The issue's description as a Prosemirror document. */
  public descriptionData?: D.Scalars["JSON"];

  /** The priority of the issue. */
  public priority?: number;

  /** The estimate of the complexity of the issue.. */
  public estimate?: number;

  /** The order of the item in its column on the board. */
  public boardOrder?: number;

  /** The time at which the issue was moved into started state. */
  public startedAt?: D.Scalars["DateTime"];

  /** The time at which the issue was moved into completed state. */
  public completedAt?: D.Scalars["DateTime"];

  /** The time at which the issue was moved into canceled state. */
  public canceledAt?: D.Scalars["DateTime"];

  /** The time at which the issue was automatically closed by the auto pruning process. */
  public autoClosedAt?: D.Scalars["DateTime"];

  /** The time at which the issue was automatically archived by the auto pruning process. */
  public autoArchivedAt?: D.Scalars["DateTime"];

  /** The date at which the issue is due. */
  public dueDate?: D.Scalars["TimelessDateScalar"];

  /** Previous identifiers of the issue if it has been moved between teams. */
  public previousIdentifiers?: string[];

  /** The order of the item in the sub-issue list. Only set if the issue has a parent. */
  public subIssueSortOrder?: number;

  /** Issue's human readable identifier (e.g. ENG-123). */
  public identifier?: string;

  /** Label for the priority. */
  public priorityLabel?: string;

  /** Issue URL. */
  public url?: string;

  /** Suggested branch name for the issue. */
  public branchName?: string;

  /** The team that the issue is associated with. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }

  /** The cycle that the issue is associated with. */
  public get cycle(): Promise<Cycle | undefined> | undefined {
    return this._cycle?.id ? new CycleQuery(this._request).fetch(this._cycle?.id) : undefined;
  }

  /** The workflow state that the issue is associated with. */
  public get state(): Promise<WorkflowState | undefined> | undefined {
    return this._state?.id ? new WorkflowStateQuery(this._request).fetch(this._state?.id) : undefined;
  }

  /** The user to whom the issue is assigned to. */
  public get assignee(): Promise<User | undefined> | undefined {
    return this._assignee?.id ? new UserQuery(this._request).fetch(this._assignee?.id) : undefined;
  }

  /** The parent of the issue. */
  public get parent(): Promise<Issue | undefined> | undefined {
    return this._parent?.id ? new IssueQuery(this._request).fetch(this._parent?.id) : undefined;
  }

  /** The project that the issue is associated with. */
  public get project(): Promise<Project | undefined> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }

  /** The user who created the issue. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}

export class Team {
  private _request: LinearRequest;
  private _draftWorkflowState?: D.TeamFragment["draftWorkflowState"];
  private _startWorkflowState?: D.TeamFragment["startWorkflowState"];
  private _reviewWorkflowState?: D.TeamFragment["reviewWorkflowState"];
  private _mergeWorkflowState?: D.TeamFragment["mergeWorkflowState"];
  private _markedAsDuplicateWorkflowState?: D.TeamFragment["markedAsDuplicateWorkflowState"];
  private _activeCycle?: D.TeamFragment["activeCycle"];

  public constructor(request: LinearRequest, data: D.TeamFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.key = data.key ?? undefined;
    this.description = data.description ?? undefined;
    this.cyclesEnabled = data.cyclesEnabled ?? undefined;
    this.cycleStartDay = data.cycleStartDay ?? undefined;
    this.cycleDuration = data.cycleDuration ?? undefined;
    this.cycleCooldownTime = data.cycleCooldownTime ?? undefined;
    this.cycleIssueAutoAssignStarted = data.cycleIssueAutoAssignStarted ?? undefined;
    this.cycleIssueAutoAssignCompleted = data.cycleIssueAutoAssignCompleted ?? undefined;
    this.cycleLockToActive = data.cycleLockToActive ?? undefined;
    this.upcomingCycleCount = data.upcomingCycleCount ?? undefined;
    this.timezone = data.timezone ?? undefined;
    this.inviteHash = data.inviteHash ?? undefined;
    this.issueEstimationType = data.issueEstimationType ?? undefined;
    this.issueEstimationAllowZero = data.issueEstimationAllowZero ?? undefined;
    this.issueEstimationExtended = data.issueEstimationExtended ?? undefined;
    this.defaultIssueEstimate = data.defaultIssueEstimate ?? undefined;
    this.defaultTemplateForMembersId = data.defaultTemplateForMembersId ?? undefined;
    this.defaultTemplateForNonMembersId = data.defaultTemplateForNonMembersId ?? undefined;
    this.groupIssueHistory = data.groupIssueHistory ?? undefined;
    this.slackNewIssue = data.slackNewIssue ?? undefined;
    this.slackIssueComments = data.slackIssueComments ?? undefined;
    this.slackIssueStatuses = data.slackIssueStatuses ?? undefined;
    this.autoClosePeriod = data.autoClosePeriod ?? undefined;
    this.autoCloseStateId = data.autoCloseStateId ?? undefined;
    this.autoArchivePeriod = data.autoArchivePeriod ?? undefined;
    this.cycleCalenderUrl = data.cycleCalenderUrl ?? undefined;
    this._draftWorkflowState = data.draftWorkflowState ?? undefined;
    this._startWorkflowState = data.startWorkflowState ?? undefined;
    this._reviewWorkflowState = data.reviewWorkflowState ?? undefined;
    this._mergeWorkflowState = data.mergeWorkflowState ?? undefined;
    this._markedAsDuplicateWorkflowState = data.markedAsDuplicateWorkflowState ?? undefined;
    this._activeCycle = data.activeCycle ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The team's name. */
  public name?: string;

  /** The team's unique key. The key is used in URLs. */
  public key?: string;

  /** The team's description. */
  public description?: string;

  /** Whether the team uses cycles. */
  public cyclesEnabled?: boolean;

  /** The day of the week that a new cycle starts. */
  public cycleStartDay?: number;

  /** The duration of a cycle in weeks. */
  public cycleDuration?: number;

  /** The cooldown time after each cycle in weeks. */
  public cycleCooldownTime?: number;

  /** Auto assign started issues to current cycle. */
  public cycleIssueAutoAssignStarted?: boolean;

  /** Auto assign completed issues to current cycle. */
  public cycleIssueAutoAssignCompleted?: boolean;

  /** Only allow issues issues with cycles in Active Issues. */
  public cycleLockToActive?: boolean;

  /** How many upcoming cycles to create. */
  public upcomingCycleCount?: number;

  /** The timezone of the team. Defaults to "America/Los_Angeles" */
  public timezone?: string;

  /** Unique hash for the team to be used in invite URLs. */
  public inviteHash?: string;

  /** The issue estimation type to use. */
  public issueEstimationType?: string;

  /** Whether to allow zeros in issues estimates. */
  public issueEstimationAllowZero?: boolean;

  /** Whether to add additional points to the estimate scale. */
  public issueEstimationExtended?: boolean;

  /** What to use as an default estimate for unestimated issues. */
  public defaultIssueEstimate?: number;

  /** The default template to use for new issues created by members of the team. */
  public defaultTemplateForMembersId?: string;

  /** The default template to use for new issues created by non-members of the team. */
  public defaultTemplateForNonMembersId?: string;

  /** Whether to group recent issue history entries. */
  public groupIssueHistory?: boolean;

  /** Whether to send new issue notifications to Slack. */
  public slackNewIssue?: boolean;

  /** Whether to send new issue comment notifications to Slack. */
  public slackIssueComments?: boolean;

  /** Whether to send new issue status updates to Slack. */
  public slackIssueStatuses?: boolean;

  /** Period after which issues are automatically closed in months. Null/undefined means disabled. */
  public autoClosePeriod?: number;

  /** The canceled workflow state which auto closed issues will be set to. Defaults to the first canceled state. */
  public autoCloseStateId?: string;

  /** Period after which automatically closed and completed issues are automatically archived in months. Null/undefined means disabled. */
  public autoArchivePeriod?: number;

  /** Calender feed (iCal) for cycles. */
  public cycleCalenderUrl?: string;

  /** The workflow state into which issues are moved when a PR has been opened as draft. */
  public get draftWorkflowState(): Promise<WorkflowState | undefined> | undefined {
    return this._draftWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._draftWorkflowState?.id)
      : undefined;
  }

  /** The workflow state into which issues are moved when a PR has been opened. */
  public get startWorkflowState(): Promise<WorkflowState | undefined> | undefined {
    return this._startWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._startWorkflowState?.id)
      : undefined;
  }

  /** The workflow state into which issues are moved when a review has been requested for the PR. */
  public get reviewWorkflowState(): Promise<WorkflowState | undefined> | undefined {
    return this._reviewWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._reviewWorkflowState?.id)
      : undefined;
  }

  /** The workflow state into which issues are moved when a PR has been merged. */
  public get mergeWorkflowState(): Promise<WorkflowState | undefined> | undefined {
    return this._mergeWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._mergeWorkflowState?.id)
      : undefined;
  }

  /** The workflow state into which issues are moved when they are marked as a duplicate of another issue. Defaults to the first canceled state. */
  public get markedAsDuplicateWorkflowState(): Promise<WorkflowState | undefined> | undefined {
    return this._markedAsDuplicateWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._markedAsDuplicateWorkflowState?.id)
      : undefined;
  }

  /** Team's currently active cycle. */
  public get activeCycle(): Promise<Cycle | undefined> | undefined {
    return this._activeCycle?.id ? new CycleQuery(this._request).fetch(this._activeCycle?.id) : undefined;
  }

  /** The organization that the team is associated with. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

export class WorkflowState {
  private _request: LinearRequest;
  private _team?: D.WorkflowStateFragment["team"];

  public constructor(request: LinearRequest, data: D.WorkflowStateFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.color = data.color ?? undefined;
    this.description = data.description ?? undefined;
    this.position = data.position ?? undefined;
    this.type = data.type ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The state's name. */
  public name?: string;

  /** The state's UI color as a HEX string. */
  public color?: string;

  /** Description of the state. */
  public description?: string;

  /** The position of the state in the team flow. */
  public position?: number;

  /** The type of the state. */
  public type?: string;

  /** The team to which this state belongs to. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
}

export class CycleConnection {
  private _request: LinearRequest;
  private _nodes?: D.CycleConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.CycleConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): Cycle[] | undefined {
    return this._nodes?.map(node => new Cycle(this._request, node));
  }
}

export class Cycle {
  private _request: LinearRequest;
  private _team?: D.CycleFragment["team"];

  public constructor(request: LinearRequest, data: D.CycleFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.number = data.number ?? undefined;
    this.name = data.name ?? undefined;
    this.startsAt = data.startsAt ?? undefined;
    this.endsAt = data.endsAt ?? undefined;
    this.completedAt = data.completedAt ?? undefined;
    this.issueCountHistory = data.issueCountHistory ?? undefined;
    this.completedIssueCountHistory = data.completedIssueCountHistory ?? undefined;
    this.scopeHistory = data.scopeHistory ?? undefined;
    this.completedScopeHistory = data.completedScopeHistory ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The number of the cycle. */
  public number?: number;

  /** The custom name of the cycle. */
  public name?: string;

  /** The start time of the cycle. */
  public startsAt?: D.Scalars["DateTime"];

  /** The end time of the cycle. */
  public endsAt?: D.Scalars["DateTime"];

  /** The completion time of the cycle. If null, the cycle hasn't been completed. */
  public completedAt?: D.Scalars["DateTime"];

  /** The total number of issues in the cycle after each day. */
  public issueCountHistory?: number[];

  /** The number of completed issues in the cycle after each day. */
  public completedIssueCountHistory?: number[];

  /** The total number of estimation points after each day. */
  public scopeHistory?: number[];

  /** The number of completed estimation points after each day. */
  public completedScopeHistory?: number[];

  /** The team that the cycle is associated with. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
}

export class PageInfo {
  public constructor(request: LinearRequest, data: D.PageInfoFragment) {
    this.hasPreviousPage = data.hasPreviousPage ?? undefined;
    this.hasNextPage = data.hasNextPage ?? undefined;
    this.startCursor = data.startCursor ?? undefined;
    this.endCursor = data.endCursor ?? undefined;
  }

  /** Indicates if there are more results when paginating backward. */
  public hasPreviousPage?: boolean;

  /** Indicates if there are more results when paginating forward. */
  public hasNextPage?: boolean;

  /** Cursor representing the first result in the paginated results. */
  public startCursor?: string;

  /** Cursor representing the last result in the paginated results. */
  public endCursor?: string;
}

export class TeamMembershipConnection {
  private _request: LinearRequest;
  private _nodes?: D.TeamMembershipConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.TeamMembershipConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): TeamMembership[] | undefined {
    return this._nodes?.map(node => new TeamMembership(this._request, node));
  }
}

export class TeamMembership {
  private _request: LinearRequest;
  private _user?: D.TeamMembershipFragment["user"];
  private _team?: D.TeamMembershipFragment["team"];

  public constructor(request: LinearRequest, data: D.TeamMembershipFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this._user = data.user ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The user that the membership is associated with. */
  public get user(): Promise<User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }

  /** The team that the membership is associated with. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
}

export class ProjectConnection {
  private _request: LinearRequest;
  private _nodes?: D.ProjectConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.ProjectConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): Project[] | undefined {
    return this._nodes?.map(node => new Project(this._request, node));
  }
}

export class Project {
  private _request: LinearRequest;
  private _creator?: D.ProjectFragment["creator"];
  private _lead?: D.ProjectFragment["lead"];
  private _milestone?: D.ProjectFragment["milestone"];

  public constructor(request: LinearRequest, data: D.ProjectFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.description = data.description ?? undefined;
    this.slugId = data.slugId ?? undefined;
    this.icon = data.icon ?? undefined;
    this.color = data.color ?? undefined;
    this.state = data.state ?? undefined;
    this.targetDate = data.targetDate ?? undefined;
    this.startedAt = data.startedAt ?? undefined;
    this.completedAt = data.completedAt ?? undefined;
    this.canceledAt = data.canceledAt ?? undefined;
    this.sortOrder = data.sortOrder ?? undefined;
    this.issueCountHistory = data.issueCountHistory ?? undefined;
    this.completedIssueCountHistory = data.completedIssueCountHistory ?? undefined;
    this.scopeHistory = data.scopeHistory ?? undefined;
    this.completedScopeHistory = data.completedScopeHistory ?? undefined;
    this.slackNewIssue = data.slackNewIssue ?? undefined;
    this.slackIssueComments = data.slackIssueComments ?? undefined;
    this.slackIssueStatuses = data.slackIssueStatuses ?? undefined;
    this._creator = data.creator ?? undefined;
    this._lead = data.lead ?? undefined;
    this._milestone = data.milestone ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The project's name. */
  public name?: string;

  /** The project's description. */
  public description?: string;

  /** The project's unique URL slug. */
  public slugId?: string;

  /** The icon of the project. */
  public icon?: string;

  /** The project's color. */
  public color?: string;

  /** The type of the state. */
  public state?: string;

  /** The estimated completion date of the project. */
  public targetDate?: D.Scalars["TimelessDateScalar"];

  /** The time at which the project was moved into started state. */
  public startedAt?: D.Scalars["DateTime"];

  /** The time at which the project was moved into completed state. */
  public completedAt?: D.Scalars["DateTime"];

  /** The time at which the project was moved into canceled state. */
  public canceledAt?: D.Scalars["DateTime"];

  /** The sort order for the project within its milestone. */
  public sortOrder?: number;

  /** The total number of issues in the project after each week. */
  public issueCountHistory?: number[];

  /** The number of completed issues in the project after each week. */
  public completedIssueCountHistory?: number[];

  /** The total number of estimation points after each week. */
  public scopeHistory?: number[];

  /** The number of completed estimation points after each week. */
  public completedScopeHistory?: number[];

  /** Whether to send new issue notifications to Slack. */
  public slackNewIssue?: boolean;

  /** Whether to send new issue comment notifications to Slack. */
  public slackIssueComments?: boolean;

  /** Whether to send new issue status updates to Slack. */
  public slackIssueStatuses?: boolean;

  /** The user who created the project. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }

  /** The project lead. */
  public get lead(): Promise<User | undefined> | undefined {
    return this._lead?.id ? new UserQuery(this._request).fetch(this._lead?.id) : undefined;
  }

  /** The milestone that this project is associated with. */
  public get milestone(): Promise<Milestone | undefined> | undefined {
    return this._milestone?.id ? new MilestoneQuery(this._request).fetch(this._milestone?.id) : undefined;
  }
}

export class Milestone {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.MilestoneFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.sortOrder = data.sortOrder ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The name of the milestone. */
  public name?: string;

  /** The sort order for the milestone. */
  public sortOrder?: number;

  /** The organization that the milestone belongs to. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

export class Organization {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.OrganizationFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.urlKey = data.urlKey ?? undefined;
    this.logoUrl = data.logoUrl ?? undefined;
    this.upgradeThresholdExceeded = data.upgradeThresholdExceeded ?? undefined;
    this.periodUploadVolume = data.periodUploadVolume ?? undefined;
    this.gitBranchFormat = data.gitBranchFormat ?? undefined;
    this.gitLinkbackMessagesEnabled = data.gitLinkbackMessagesEnabled ?? undefined;
    this.gitPublicLinkbackMessagesEnabled = data.gitPublicLinkbackMessagesEnabled ?? undefined;
    this.roadmapEnabled = data.roadmapEnabled ?? undefined;
    this.samlEnabled = data.samlEnabled ?? undefined;
    this.allowedAuthServices = data.allowedAuthServices ?? undefined;
    this.userCount = data.userCount ?? undefined;
    this.createdIssueCount = data.createdIssueCount ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The organization's name. */
  public name?: string;

  /** The organization's unique URL key. */
  public urlKey?: string;

  /** The organization's logo URL. */
  public logoUrl?: string;

  public upgradeThresholdExceeded?: boolean;

  /** Rolling 30-day total upload volume for the organization, in megabytes. */
  public periodUploadVolume?: number;

  /** How git branches are formatted. If null, default formatting will be used. */
  public gitBranchFormat?: string;

  /** Whether the Git integration linkback messages should be sent to private repositories. */
  public gitLinkbackMessagesEnabled?: boolean;

  /** Whether the Git integration linkback messages should be sent to public repositories. */
  public gitPublicLinkbackMessagesEnabled?: boolean;

  /** Whether the organization is using a roadmap. */
  public roadmapEnabled?: boolean;

  /** Whether SAML authentication is enabled for organization. */
  public samlEnabled?: boolean;

  /** Allowed authentication providers, empty array means all are allowed */
  public allowedAuthServices?: string[];

  /** Number of active users in the organization. */
  public userCount?: number;

  /** Number of issues in the organization. */
  public createdIssueCount?: number;

  /** The organization's subscription to a paid plan. */
  public get subscription(): Promise<Subscription | undefined> {
    return new SubscriptionQuery(this._request).fetch();
  }
}

export class UserConnection {
  private _request: LinearRequest;
  private _nodes?: D.UserConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.UserConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): User[] | undefined {
    return this._nodes?.map(node => new User(this._request, node));
  }
}

export class TeamConnection {
  private _request: LinearRequest;
  private _nodes?: D.TeamConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.TeamConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): Team[] | undefined {
    return this._nodes?.map(node => new Team(this._request, node));
  }
}

export class MilestoneConnection {
  private _request: LinearRequest;
  private _nodes?: D.MilestoneConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.MilestoneConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): Milestone[] | undefined {
    return this._nodes?.map(node => new Milestone(this._request, node));
  }
}

export class IntegrationConnection {
  private _request: LinearRequest;
  private _nodes?: D.IntegrationConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.IntegrationConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): Integration[] | undefined {
    return this._nodes?.map(node => new Integration(this._request, node));
  }
}

export class Integration {
  private _request: LinearRequest;
  private _team?: D.IntegrationFragment["team"];
  private _creator?: D.IntegrationFragment["creator"];

  public constructor(request: LinearRequest, data: D.IntegrationFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.service = data.service ?? undefined;
    this.serviceId = data.serviceId ?? undefined;
    this._team = data.team ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The integration's type. */
  public service?: string;

  /** The external service identifier. */
  public serviceId?: string;

  /** The organization that the integration is associated with. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }

  /** The team that the integration is associated with. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }

  /** The user that added the integration. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}

export class SlackPostSettings {
  public constructor(request: LinearRequest, data: D.SlackPostSettingsFragment) {
    this.channel = data.channel ?? undefined;
    this.channelId = data.channelId ?? undefined;
    this.configurationUrl = data.configurationUrl ?? undefined;
  }

  public channel?: string;

  public channelId?: string;

  public configurationUrl?: string;
}

export class GoogleSheetsSettings {
  public constructor(request: LinearRequest, data: D.GoogleSheetsSettingsFragment) {
    this.spreadsheetId = data.spreadsheetId ?? undefined;
    this.spreadsheetUrl = data.spreadsheetUrl ?? undefined;
    this.sheetId = data.sheetId ?? undefined;
    this.updatedIssuesAt = data.updatedIssuesAt ?? undefined;
  }

  public spreadsheetId?: string;

  public spreadsheetUrl?: string;

  public sheetId?: number;

  public updatedIssuesAt?: D.Scalars["DateTime"];
}

export class SentrySettings {
  public constructor(request: LinearRequest, data: D.SentrySettingsFragment) {
    this.organizationSlug = data.organizationSlug ?? undefined;
  }

  /** The slug of the Sentry organization being connected. */
  public organizationSlug?: string;
}

export class Subscription {
  private _request: LinearRequest;
  private _creator?: D.SubscriptionFragment["creator"];

  public constructor(request: LinearRequest, data: D.SubscriptionFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.type = data.type ?? undefined;
    this.seats = data.seats ?? undefined;
    this.canceledAt = data.canceledAt ?? undefined;
    this.pendingChangeType = data.pendingChangeType ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The subscription type. */
  public type?: string;

  /** The number of seats in the subscription. */
  public seats?: number;

  /** The date the subscription was canceled, if any. */
  public canceledAt?: D.Scalars["DateTime"];

  /** The subscription type of a pending change. Null if no change pending. */
  public pendingChangeType?: string;

  /** The creator of the subscription. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }

  /** The organization that the subscription is associated with. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

export class ProjectLinkConnection {
  private _request: LinearRequest;
  private _nodes?: D.ProjectLinkConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.ProjectLinkConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): ProjectLink[] | undefined {
    return this._nodes?.map(node => new ProjectLink(this._request, node));
  }
}

export class ProjectLink {
  private _request: LinearRequest;
  private _creator?: D.ProjectLinkFragment["creator"];
  private _project?: D.ProjectLinkFragment["project"];

  public constructor(request: LinearRequest, data: D.ProjectLinkFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.url = data.url ?? undefined;
    this.label = data.label ?? undefined;
    this._creator = data.creator ?? undefined;
    this._project = data.project ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The link's URL. */
  public url?: string;

  /** The link's label. */
  public label?: string;

  /** The user who created the link. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }

  /** The project that the link is associated with. */
  public get project(): Promise<Project | undefined> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
}

export class WorkflowStateConnection {
  private _request: LinearRequest;
  private _nodes?: D.WorkflowStateConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.WorkflowStateConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): WorkflowState[] | undefined {
    return this._nodes?.map(node => new WorkflowState(this._request, node));
  }
}

export class TemplateConnection {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.TemplateConnectionFragment) {
    this._request = request;
  }

  public get nodes(): Template[] | undefined {
    return this._nodes?.map(node => new Template(this._request, node));
  }
}

export class Template {
  private _request: LinearRequest;
  private _team?: D.TemplateFragment["team"];
  private _creator?: D.TemplateFragment["creator"];

  public constructor(request: LinearRequest, data: D.TemplateFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.type = data.type ?? undefined;
    this.name = data.name ?? undefined;
    this.description = data.description ?? undefined;
    this.templateData = data.templateData ?? undefined;
    this._team = data.team ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The entity type this template is for. */
  public type?: string;

  /** The name of the template. */
  public name?: string;

  /** Template description. */
  public description?: string;

  /** Template data. */
  public templateData?: D.Scalars["JSON"];

  /** The team that the template is associated with. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }

  /** The user who created the template. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}

export class IssueLabelConnection {
  private _request: LinearRequest;
  private _nodes?: D.IssueLabelConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.IssueLabelConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): IssueLabel[] | undefined {
    return this._nodes?.map(node => new IssueLabel(this._request, node));
  }
}

export class IssueLabel {
  private _request: LinearRequest;
  private _team?: D.IssueLabelFragment["team"];
  private _creator?: D.IssueLabelFragment["creator"];

  public constructor(request: LinearRequest, data: D.IssueLabelFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.description = data.description ?? undefined;
    this.color = data.color ?? undefined;
    this._team = data.team ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The label's name. */
  public name?: string;

  /** The label's description. */
  public description?: string;

  /** The label's color as a HEX string. */
  public color?: string;

  /** The team to which the label belongs to. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }

  /** The user who created the label. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}

export class WebhookConnection {
  private _request: LinearRequest;
  private _nodes?: D.WebhookConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.WebhookConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): Webhook[] | undefined {
    return this._nodes?.map(node => new Webhook(this._request, node));
  }
}

export class Webhook {
  private _request: LinearRequest;
  private _team?: D.WebhookFragment["team"];
  private _creator?: D.WebhookFragment["creator"];

  public constructor(request: LinearRequest, data: D.WebhookFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.url = data.url ?? undefined;
    this.enabled = data.enabled ?? undefined;
    this.secret = data.secret ?? undefined;
    this._team = data.team ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** Webhook URL */
  public url?: string;

  /** Whether the Webhook is enabled. */
  public enabled?: boolean;

  /** Secret token for verifying the origin on the recipient side. */
  public secret?: string;

  /** The team that the webhook is associated with. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }

  /** The user who created the webhook. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}

export class CommentConnection {
  private _request: LinearRequest;
  private _nodes?: D.CommentConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.CommentConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): Comment[] | undefined {
    return this._nodes?.map(node => new Comment(this._request, node));
  }
}

export class Comment {
  private _request: LinearRequest;
  private _user?: D.CommentFragment["user"];
  private _issue?: D.CommentFragment["issue"];

  public constructor(request: LinearRequest, data: D.CommentFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.body = data.body ?? undefined;
    this.bodyData = data.bodyData ?? undefined;
    this.reactionData = data.reactionData ?? undefined;
    this.editedAt = data.editedAt ?? undefined;
    this._user = data.user ?? undefined;
    this._issue = data.issue ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The comment content in markdown format. */
  public body?: string;

  /** Comment content as a Prosemirror document. */
  public bodyData?: D.Scalars["JSON"];

  /** Emoji reactions on the comment. */
  public reactionData?: D.Scalars["JSON"][];

  /** The time user edited the comment. */
  public editedAt?: D.Scalars["DateTime"];

  /** The user who wrote the comment. */
  public get user(): Promise<User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }

  /** The issue that the comment is associated with. */
  public get issue(): Promise<Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
}

export class IssueHistory {
  private _request: LinearRequest;
  private _issue?: D.IssueHistoryFragment["issue"];
  private _actor?: D.IssueHistoryFragment["actor"];
  private _integration?: D.IssueHistoryFragment["integration"];
  private _fromAssignee?: D.IssueHistoryFragment["fromAssignee"];
  private _toAssignee?: D.IssueHistoryFragment["toAssignee"];
  private _fromTeam?: D.IssueHistoryFragment["fromTeam"];
  private _toTeam?: D.IssueHistoryFragment["toTeam"];
  private _fromParent?: D.IssueHistoryFragment["fromParent"];
  private _toParent?: D.IssueHistoryFragment["toParent"];
  private _fromState?: D.IssueHistoryFragment["fromState"];
  private _toState?: D.IssueHistoryFragment["toState"];
  private _fromCycle?: D.IssueHistoryFragment["fromCycle"];
  private _toCycle?: D.IssueHistoryFragment["toCycle"];
  private _fromProject?: D.IssueHistoryFragment["fromProject"];
  private _toProject?: D.IssueHistoryFragment["toProject"];

  public constructor(request: LinearRequest, data: D.IssueHistoryFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.updatedDescription = data.updatedDescription ?? undefined;
    this.fromTitle = data.fromTitle ?? undefined;
    this.toTitle = data.toTitle ?? undefined;
    this.fromPriority = data.fromPriority ?? undefined;
    this.toPriority = data.toPriority ?? undefined;
    this.fromEstimate = data.fromEstimate ?? undefined;
    this.toEstimate = data.toEstimate ?? undefined;
    this.archived = data.archived ?? undefined;
    this.addedLabelIds = data.addedLabelIds ?? undefined;
    this.removedLabelIds = data.removedLabelIds ?? undefined;
    this.relationChanges = data.relationChanges ?? undefined;
    this.autoClosed = data.autoClosed ?? undefined;
    this.autoArchived = data.autoArchived ?? undefined;
    this.fromDueDate = data.fromDueDate ?? undefined;
    this.toDueDate = data.toDueDate ?? undefined;
    this._issue = data.issue ?? undefined;
    this._actor = data.actor ?? undefined;
    this._integration = data.integration ?? undefined;
    this._fromAssignee = data.fromAssignee ?? undefined;
    this._toAssignee = data.toAssignee ?? undefined;
    this._fromTeam = data.fromTeam ?? undefined;
    this._toTeam = data.toTeam ?? undefined;
    this._fromParent = data.fromParent ?? undefined;
    this._toParent = data.toParent ?? undefined;
    this._fromState = data.fromState ?? undefined;
    this._toState = data.toState ?? undefined;
    this._fromCycle = data.fromCycle ?? undefined;
    this._toCycle = data.toCycle ?? undefined;
    this._fromProject = data.fromProject ?? undefined;
    this._toProject = data.toProject ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** Whether the issue's description was updated. */
  public updatedDescription?: boolean;

  /** What the title was changed from. */
  public fromTitle?: string;

  /** What the title was changed to. */
  public toTitle?: string;

  /** What the priority was changed from. */
  public fromPriority?: number;

  /** What the priority was changed to. */
  public toPriority?: number;

  /** What the estimate was changed from. */
  public fromEstimate?: number;

  /** What the estimate was changed to. */
  public toEstimate?: number;

  /** Whether the issue was archived or un-archived. */
  public archived?: boolean;

  /** ID's of labels that were added. */
  public addedLabelIds?: string[];

  /** ID's of labels that were removed. */
  public removedLabelIds?: string[];

  /** Changed issue relationships. */
  public relationChanges?: string[];

  public autoClosed?: boolean;

  public autoArchived?: boolean;

  /** What the due date was changed from */
  public fromDueDate?: D.Scalars["TimelessDateScalar"];

  /** What the due date was changed to */
  public toDueDate?: D.Scalars["TimelessDateScalar"];

  /** The issue that was changed. */
  public get issue(): Promise<Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }

  /** The user who made these changes. If null, possibly means that the change made by an integration. */
  public get actor(): Promise<User | undefined> | undefined {
    return this._actor?.id ? new UserQuery(this._request).fetch(this._actor?.id) : undefined;
  }

  /** The integration that made these changes. If null, possibly means that the change was made by a user. */
  public get integration(): Promise<Integration | undefined> | undefined {
    return this._integration?.id ? new IntegrationQuery(this._request).fetch(this._integration?.id) : undefined;
  }

  /** The user from whom the issue was re-assigned from. */
  public get fromAssignee(): Promise<User | undefined> | undefined {
    return this._fromAssignee?.id ? new UserQuery(this._request).fetch(this._fromAssignee?.id) : undefined;
  }

  /** The user to whom the issue was assigned to. */
  public get toAssignee(): Promise<User | undefined> | undefined {
    return this._toAssignee?.id ? new UserQuery(this._request).fetch(this._toAssignee?.id) : undefined;
  }

  /** The team from which the issue was moved from. */
  public get fromTeam(): Promise<Team | undefined> | undefined {
    return this._fromTeam?.id ? new TeamQuery(this._request).fetch(this._fromTeam?.id) : undefined;
  }

  /** The team to which the issue was moved to. */
  public get toTeam(): Promise<Team | undefined> | undefined {
    return this._toTeam?.id ? new TeamQuery(this._request).fetch(this._toTeam?.id) : undefined;
  }

  /** The previous parent of the issue. */
  public get fromParent(): Promise<Issue | undefined> | undefined {
    return this._fromParent?.id ? new IssueQuery(this._request).fetch(this._fromParent?.id) : undefined;
  }

  /** The new parent of the issue. */
  public get toParent(): Promise<Issue | undefined> | undefined {
    return this._toParent?.id ? new IssueQuery(this._request).fetch(this._toParent?.id) : undefined;
  }

  /** The previous workflow state of the issue. */
  public get fromState(): Promise<WorkflowState | undefined> | undefined {
    return this._fromState?.id ? new WorkflowStateQuery(this._request).fetch(this._fromState?.id) : undefined;
  }

  /** The new workflow state of the issue. */
  public get toState(): Promise<WorkflowState | undefined> | undefined {
    return this._toState?.id ? new WorkflowStateQuery(this._request).fetch(this._toState?.id) : undefined;
  }

  /** The previous cycle of the issue. */
  public get fromCycle(): Promise<Cycle | undefined> | undefined {
    return this._fromCycle?.id ? new CycleQuery(this._request).fetch(this._fromCycle?.id) : undefined;
  }

  /** The new cycle of the issue. */
  public get toCycle(): Promise<Cycle | undefined> | undefined {
    return this._toCycle?.id ? new CycleQuery(this._request).fetch(this._toCycle?.id) : undefined;
  }

  /** The previous project of the issue. */
  public get fromProject(): Promise<Project | undefined> | undefined {
    return this._fromProject?.id ? new ProjectQuery(this._request).fetch(this._fromProject?.id) : undefined;
  }

  /** The new project of the issue. */
  public get toProject(): Promise<Project | undefined> | undefined {
    return this._toProject?.id ? new ProjectQuery(this._request).fetch(this._toProject?.id) : undefined;
  }
}

export class IntegrationResourceConnection {
  private _request: LinearRequest;
  private _nodes?: D.IntegrationResourceConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.IntegrationResourceConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): IntegrationResource[] | undefined {
    return this._nodes?.map(node => new IntegrationResource(this._request, node));
  }
}

export class IntegrationResource {
  private _request: LinearRequest;
  private _integration?: D.IntegrationResourceFragment["integration"];
  private _issue?: D.IntegrationResourceFragment["issue"];

  public constructor(request: LinearRequest, data: D.IntegrationResourceFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.resourceType = data.resourceType ?? undefined;
    this.resourceId = data.resourceId ?? undefined;
    this._integration = data.integration ?? undefined;
    this._issue = data.issue ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The integration's type. */
  public resourceType?: string;

  /** The external service resource ID. */
  public resourceId?: string;

  /** The integration that the resource is associated with. */
  public get integration(): Promise<Integration | undefined> | undefined {
    return this._integration?.id ? new IntegrationQuery(this._request).fetch(this._integration?.id) : undefined;
  }

  /** The issue that the resource is associated with. */
  public get issue(): Promise<Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
}

export class PullRequestPayload {
  public constructor(request: LinearRequest, data: D.PullRequestPayloadFragment) {
    this.status = data.status ?? undefined;
    this.number = data.number ?? undefined;
    this.url = data.url ?? undefined;
    this.draft = data.draft ?? undefined;
    this.id = data.id ?? undefined;
    this.title = data.title ?? undefined;
    this.branch = data.branch ?? undefined;
    this.userId = data.userId ?? undefined;
    this.userLogin = data.userLogin ?? undefined;
    this.repoLogin = data.repoLogin ?? undefined;
    this.repoName = data.repoName ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.closedAt = data.closedAt ?? undefined;
    this.mergedAt = data.mergedAt ?? undefined;
  }

  public status?: string;

  public number?: number;

  public url?: string;

  public draft?: boolean;

  public id?: string;

  public title?: string;

  public branch?: string;

  public userId?: string;

  public userLogin?: string;

  public repoLogin?: string;

  public repoName?: string;

  public createdAt?: string;

  public updatedAt?: string;

  public closedAt?: string;

  public mergedAt?: string;
}

export class CommitPayload {
  public constructor(request: LinearRequest, data: D.CommitPayloadFragment) {
    this.id = data.id ?? undefined;
    this.message = data.message ?? undefined;
    this.timestamp = data.timestamp ?? undefined;
    this.url = data.url ?? undefined;
    this.added = data.added ?? undefined;
    this.removed = data.removed ?? undefined;
    this.modified = data.modified ?? undefined;
  }

  public id?: string;

  public message?: string;

  public timestamp?: string;

  public url?: string;

  public added?: string[];

  public removed?: string[];

  public modified?: string[];
}

export class SentryIssuePayload {
  public constructor(request: LinearRequest, data: D.SentryIssuePayloadFragment) {
    this.issueId = data.issueId ?? undefined;
    this.webUrl = data.webUrl ?? undefined;
    this.actorType = data.actorType ?? undefined;
    this.actorId = data.actorId ?? undefined;
    this.actorName = data.actorName ?? undefined;
    this.projectId = data.projectId ?? undefined;
    this.projectSlug = data.projectSlug ?? undefined;
    this.issueTitle = data.issueTitle ?? undefined;
    this.shortId = data.shortId ?? undefined;
    this.firstSeen = data.firstSeen ?? undefined;
    this.firstVersion = data.firstVersion ?? undefined;
  }

  /** The Sentry identifier for the issue. */
  public issueId?: string;

  /** The description of the issue. */
  public webUrl?: string;

  /** The type of the actor who created the issue. */
  public actorType?: string;

  /** The Sentry identifier of the actor who created the issue. */
  public actorId?: number;

  /** The name of the Sentry actor who created this issue. */
  public actorName?: string;

  /** The Sentry identifier of the project this issue belongs to. */
  public projectId?: number;

  /** The slug of the project this issue belongs to. */
  public projectSlug?: string;

  /** The title of the issue. */
  public issueTitle?: string;

  /** The shortId of the issue. */
  public shortId?: string;

  /** The date this issue was first seen. */
  public firstSeen?: string;

  /** The name of the first release version this issue appeared on, if available. */
  public firstVersion?: string;
}

export class IssueRelationConnection {
  private _request: LinearRequest;
  private _nodes?: D.IssueRelationConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.IssueRelationConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): IssueRelation[] | undefined {
    return this._nodes?.map(node => new IssueRelation(this._request, node));
  }
}

export class IssueRelation {
  private _request: LinearRequest;
  private _issue?: D.IssueRelationFragment["issue"];
  private _relatedIssue?: D.IssueRelationFragment["relatedIssue"];

  public constructor(request: LinearRequest, data: D.IssueRelationFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.type = data.type ?? undefined;
    this._issue = data.issue ?? undefined;
    this._relatedIssue = data.relatedIssue ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The relationship of the issue with the related issue. */
  public type?: string;

  /** The issue whose relationship is being described. */
  public get issue(): Promise<Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }

  /** The related issue. */
  public get relatedIssue(): Promise<Issue | undefined> | undefined {
    return this._relatedIssue?.id ? new IssueQuery(this._request).fetch(this._relatedIssue?.id) : undefined;
  }
}

export class OrganizationExistsPayload {
  public constructor(request: LinearRequest, data: D.OrganizationExistsPayloadFragment) {
    this.success = data.success ?? undefined;
    this.exists = data.exists ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;

  /** Whether the organization exists. */
  public exists?: boolean;
}

export class SyncResponse {
  public constructor(request: LinearRequest, data: D.SyncResponseFragment) {
    this.state = data.state ?? undefined;
    this.delta = data.delta ?? undefined;
    this.archive = data.archive ?? undefined;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.databaseVersion = data.databaseVersion ?? undefined;
  }

  /**
   * The full state of the organization as a serialized JSON object.
   *     Mutually exclusive with the delta property
   */
  public state?: string;

  /**
   * JSON serialized delta changes that the client can apply to its local state
   *     in order to catch up with the state of the world.
   */
  public delta?: string;

  /** A JSON serialized collection of model objects loaded from the archive */
  public archive?: string;

  /** The last sync id covered by the response. */
  public lastSyncId?: number;

  /** The version of the remote database. Incremented by 1 for each migration run on the database. */
  public databaseVersion?: number;
}

export class ArchiveResponse {
  public constructor(request: LinearRequest, data: D.ArchiveResponseFragment) {
    this.archive = data.archive ?? undefined;
    this.totalCount = data.totalCount ?? undefined;
    this.databaseVersion = data.databaseVersion ?? undefined;
  }

  /** A JSON serialized collection of model objects loaded from the archive */
  public archive?: string;

  /** The total number of entities in the archive. */
  public totalCount?: number;

  /** The version of the remote database. Incremented by 1 for each migration run on the database. */
  public databaseVersion?: number;
}

export class UserAccountAdminPrivileged {
  public constructor(request: LinearRequest, data: D.UserAccountAdminPrivilegedFragment) {
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.email = data.email ?? undefined;
    this.service = data.service ?? undefined;
  }

  /** The models identifier. */
  public id?: string;

  /** The time at which the model was created. */
  public createdAt?: D.Scalars["DateTime"];

  /** The time at which the model was updated. */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the model was archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The user's name. */
  public name?: string;

  /** The user's email address. */
  public email?: string;

  /** The authentication service used to create the account. */
  public service?: string;
}

export class UserAdminPrivileged {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.UserAdminPrivilegedFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.displayName = data.displayName ?? undefined;
    this.email = data.email ?? undefined;
    this.avatarUrl = data.avatarUrl ?? undefined;
    this.disableReason = data.disableReason ?? undefined;
    this.inviteHash = data.inviteHash ?? undefined;
    this.userAccountId = data.userAccountId ?? undefined;
    this.lastSeen = data.lastSeen ?? undefined;
    this.admin = data.admin ?? undefined;
    this.active = data.active ?? undefined;
    this.createdIssueCount = data.createdIssueCount ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The user's full name. */
  public name?: string;

  /** The user's display (nick) name. Unique within each organization. */
  public displayName?: string;

  /** The user's email address. */
  public email?: string;

  /** An URL to the user's avatar image. */
  public avatarUrl?: string;

  /** Reason why is the account disabled. */
  public disableReason?: string;

  /** Unique hash for the user to be used in invite URLs. */
  public inviteHash?: string;

  public userAccountId?: string;

  /** The last time the user was seen online. If null, the user is currently online. */
  public lastSeen?: D.Scalars["DateTime"];

  /** Whether the user is an organization administrator. */
  public admin?: boolean;

  /** Whether the user account is active or disabled. */
  public active?: boolean;

  /** Number of issues created. */
  public createdIssueCount?: number;

  /** The settings of the user. */
  public get settings(): Promise<UserSettings | undefined> {
    return new NotificationQuery(this._request).fetch();
  }
}

export class OrganizationAdminPrivileged {
  public constructor(request: LinearRequest, data: D.OrganizationAdminPrivilegedFragment) {
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.urlKey = data.urlKey ?? undefined;
    this.logoUrl = data.logoUrl ?? undefined;
    this.upgradeThresholdExceeded = data.upgradeThresholdExceeded ?? undefined;
    this.periodUploadVolume = data.periodUploadVolume ?? undefined;
    this.gitBranchFormat = data.gitBranchFormat ?? undefined;
    this.gitLinkbackMessagesEnabled = data.gitLinkbackMessagesEnabled ?? undefined;
    this.gitPublicLinkbackMessagesEnabled = data.gitPublicLinkbackMessagesEnabled ?? undefined;
    this.roadmapEnabled = data.roadmapEnabled ?? undefined;
    this.samlEnabled = data.samlEnabled ?? undefined;
    this.allowedAuthServices = data.allowedAuthServices ?? undefined;
    this.userCount = data.userCount ?? undefined;
    this.createdIssueCount = data.createdIssueCount ?? undefined;
    this.stripeCustomerId = data.stripeCustomerId ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The organization's name. */
  public name?: string;

  /** The organization's unique URL key. */
  public urlKey?: string;

  /** The organization's logo URL. */
  public logoUrl?: string;

  public upgradeThresholdExceeded?: boolean;

  /** Rolling 30-day total upload volume for the organization, in megabytes. */
  public periodUploadVolume?: number;

  /** How git branches are formatted. If null, default formatting will be used. */
  public gitBranchFormat?: string;

  /** Whether the Git integration linkback messages should be sent to private repositories. */
  public gitLinkbackMessagesEnabled?: boolean;

  /** Whether the Git integration linkback messages should be sent to public repositories. */
  public gitPublicLinkbackMessagesEnabled?: boolean;

  /** Whether the organization is using a roadmap. */
  public roadmapEnabled?: boolean;

  /** Whether SAML authentication is enabled for organization. */
  public samlEnabled?: boolean;

  /** Allowed authentication providers, empty array means all are allowed */
  public allowedAuthServices?: string[];

  /** Number of active users in the organization. */
  public userCount?: number;

  /** Number of issues in the organization. */
  public createdIssueCount?: number;

  /** The Stripe identifier for the organization. */
  public stripeCustomerId?: string;
}

export class SubscriptionAdminPrivileged {
  private _request: LinearRequest;
  private _creator?: D.SubscriptionAdminPrivilegedFragment["creator"];

  public constructor(request: LinearRequest, data: D.SubscriptionAdminPrivilegedFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.type = data.type ?? undefined;
    this.seats = data.seats ?? undefined;
    this.canceledAt = data.canceledAt ?? undefined;
    this.pendingChangeType = data.pendingChangeType ?? undefined;
    this.stripeSubscriptionId = data.stripeSubscriptionId ?? undefined;
    this.stripeStatus = data.stripeStatus ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The subscription type. */
  public type?: string;

  /** The number of seats in the subscription. */
  public seats?: number;

  /** The date the subscription was canceled, if any. */
  public canceledAt?: D.Scalars["DateTime"];

  /** The subscription type of a pending change. Null if no change pending. */
  public pendingChangeType?: string;

  /** The Stripe identifier for the subscription. */
  public stripeSubscriptionId?: string;

  /** The Stripe status for the subscription. */
  public stripeStatus?: string;

  /** The creator of the subscription. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }

  /** The organization that the subscription is associated with. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

export class ApiKey {
  public constructor(request: LinearRequest, data: D.ApiKeyFragment) {
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.label = data.label ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The label of the API key. */
  public label?: string;
}

export class UserAuthorizedApplication {
  public constructor(request: LinearRequest, data: D.UserAuthorizedApplicationFragment) {
    this.clientId = data.clientId ?? undefined;
    this.name = data.name ?? undefined;
    this.description = data.description ?? undefined;
    this.developer = data.developer ?? undefined;
    this.developerUrl = data.developerUrl ?? undefined;
    this.imageUrl = data.imageUrl ?? undefined;
    this.isAuthorized = data.isAuthorized ?? undefined;
  }

  /** OAuth application's client ID. */
  public clientId?: string;

  /** Application name. */
  public name?: string;

  /** Information about the application. */
  public description?: string;

  /** Name of the developer. */
  public developer?: string;

  /** Url of the developer (homepage or docs). */
  public developerUrl?: string;

  /** Image of the application. */
  public imageUrl?: string;

  /** Whether the user has authorized the application for the given scopes. */
  public isAuthorized?: boolean;
}

export class AuthorizedApplication {
  public constructor(request: LinearRequest, data: D.AuthorizedApplicationFragment) {
    this.clientId = data.clientId ?? undefined;
    this.name = data.name ?? undefined;
    this.description = data.description ?? undefined;
    this.developer = data.developer ?? undefined;
    this.developerUrl = data.developerUrl ?? undefined;
    this.imageUrl = data.imageUrl ?? undefined;
    this.scope = data.scope ?? undefined;
    this.appId = data.appId ?? undefined;
  }

  /** OAuth application's client ID. */
  public clientId?: string;

  /** Application name. */
  public name?: string;

  /** Information about the application. */
  public description?: string;

  /** Name of the developer. */
  public developer?: string;

  /** Url of the developer (homepage or docs). */
  public developerUrl?: string;

  /** Image of the application. */
  public imageUrl?: string;

  /** Scopes that are authorized for this application for a given user. */
  public scope?: string[];

  /** OAuth application's ID. */
  public appId?: string;
}

export class AuthResolverResponse {
  private _request: LinearRequest;
  private _users?: D.AuthResolverResponseFragment["users"];

  public constructor(request: LinearRequest, data: D.AuthResolverResponseFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.token = data.token ?? undefined;
    this.email = data.email ?? undefined;
    this.allowDomainAccess = data.allowDomainAccess ?? undefined;
    this._users = data.users ?? undefined;
  }

  /** User account ID. */
  public id?: string;

  /** JWT token for authentication of the account. */
  public token?: string;

  /** Email for the authenticated account. */
  public email?: string;

  /** Should the signup flow allow access for the domain. */
  public allowDomainAccess?: boolean;

  /** Users belonging to this account. */
  public get users(): User[] | undefined {
    return this._users?.map(node => new User(this._request, node));
  }

  /** Organizations this account has access to, but is not yet a member. */
  public get availableOrganizations(): Organization[] | undefined {
    return this._availableOrganizations?.map(node => new Organization(this._request, node));
  }
}

export class SsoUrlFromEmailResponse {
  public constructor(request: LinearRequest, data: D.SsoUrlFromEmailResponseFragment) {
    this.success = data.success ?? undefined;
    this.samlSsoUrl = data.samlSsoUrl ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;

  /** SAML SSO sign-in URL. */
  public samlSsoUrl?: string;
}

export class BillingDetailsPayload {
  public constructor(request: LinearRequest, data: D.BillingDetailsPayloadFragment) {
    this.success = data.success ?? undefined;
    this.email = data.email ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The customer's email address the invoices are sent to. */
  public email?: string;
}

export class Invoice {
  public constructor(request: LinearRequest, data: D.InvoiceFragment) {
    this.url = data.url ?? undefined;
    this.created = data.created ?? undefined;
    this.dueDate = data.dueDate ?? undefined;
    this.status = data.status ?? undefined;
    this.total = data.total ?? undefined;
  }

  /** The URL at which the invoice can be viewed or paid. */
  public url?: string;

  /** The creation date of the invoice. */
  public created?: D.Scalars["TimelessDateScalar"];

  /** The due date of the invoice. */
  public dueDate?: D.Scalars["TimelessDateScalar"];

  /** The status of the invoice. */
  public status?: string;

  /** The invoice total, in cents. */
  public total?: number;
}

export class Card {
  public constructor(request: LinearRequest, data: D.CardFragment) {
    this.brand = data.brand ?? undefined;
    this.last4 = data.last4 ?? undefined;
  }

  /** The brand of the card, e.g. Visa. */
  public brand?: string;

  /** The last four digits used to identify the card. */
  public last4?: string;
}

export class CollaborationDocumentUpdatePayload {
  public constructor(request: LinearRequest, data: D.CollaborationDocumentUpdatePayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class StepsResponse {
  public constructor(request: LinearRequest, data: D.StepsResponseFragment) {
    this.version = data.version ?? undefined;
    this.steps = data.steps ?? undefined;
    this.clientIds = data.clientIds ?? undefined;
  }

  /** Client's document version. */
  public version?: number;

  /** New document steps from the client. */
  public steps?: D.Scalars["JSON"][];

  /** List of client IDs for the document steps. */
  public clientIds?: string[];
}

export class CustomView {
  private _request: LinearRequest;
  private _team?: D.CustomViewFragment["team"];
  private _creator?: D.CustomViewFragment["creator"];

  public constructor(request: LinearRequest, data: D.CustomViewFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.description = data.description ?? undefined;
    this.icon = data.icon ?? undefined;
    this.color = data.color ?? undefined;
    this.filters = data.filters ?? undefined;
    this.shared = data.shared ?? undefined;
    this._team = data.team ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The name of the custom view. */
  public name?: string;

  /** The description of the custom view. */
  public description?: string;

  /** The icon of the custom view. */
  public icon?: string;

  /** The color of the icon of the custom view. */
  public color?: string;

  /** The filters applied to issues in the custom view. */
  public filters?: D.Scalars["JSONObject"];

  /** Whether the custom view is shared with everyone in the organization. */
  public shared?: boolean;

  /** The organization of the custom view. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }

  /** The team associated with the custom view. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }

  /** The user who created the custom view. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}

export class CustomViewConnection {
  private _request: LinearRequest;
  private _nodes?: D.CustomViewConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.CustomViewConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): CustomView[] | undefined {
    return this._nodes?.map(node => new CustomView(this._request, node));
  }
}

export class Emoji {
  private _request: LinearRequest;
  private _creator?: D.EmojiFragment["creator"];

  public constructor(request: LinearRequest, data: D.EmojiFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.url = data.url ?? undefined;
    this.source = data.source ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The emoji's name. */
  public name?: string;

  /** The emoji image URL. */
  public url?: string;

  /** The source of the emoji. */
  public source?: string;

  /** The user who created the emoji. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }

  /** The organization that the emoji belongs to. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

export class EmojiConnection {
  private _request: LinearRequest;
  private _nodes?: D.EmojiConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.EmojiConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): Emoji[] | undefined {
    return this._nodes?.map(node => new Emoji(this._request, node));
  }
}

export class Favorite {
  private _request: LinearRequest;
  private _user?: D.FavoriteFragment["user"];
  private _issue?: D.FavoriteFragment["issue"];
  private _project?: D.FavoriteFragment["project"];
  private _projectTeam?: D.FavoriteFragment["projectTeam"];
  private _cycle?: D.FavoriteFragment["cycle"];
  private _label?: D.FavoriteFragment["label"];

  public constructor(request: LinearRequest, data: D.FavoriteFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.type = data.type ?? undefined;
    this.sortOrder = data.sortOrder ?? undefined;
    this._user = data.user ?? undefined;
    this._issue = data.issue ?? undefined;
    this._project = data.project ?? undefined;
    this._projectTeam = data.projectTeam ?? undefined;
    this._cycle = data.cycle ?? undefined;
    this._label = data.label ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The type of the favorite. */
  public type?: string;

  /** The order of the item in the favorites list. */
  public sortOrder?: number;

  /** The owner of the favorite. */
  public get user(): Promise<User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }

  /** Favorited issue. */
  public get issue(): Promise<Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }

  /** Favorited project. */
  public get project(): Promise<Project | undefined> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }

  /** Favorited project team. */
  public get projectTeam(): Promise<Project | undefined> | undefined {
    return this._projectTeam?.id ? new ProjectQuery(this._request).fetch(this._projectTeam?.id) : undefined;
  }

  /** Favorited cycle. */
  public get cycle(): Promise<Cycle | undefined> | undefined {
    return this._cycle?.id ? new CycleQuery(this._request).fetch(this._cycle?.id) : undefined;
  }

  /** Favorited issue label. */
  public get label(): Promise<IssueLabel | undefined> | undefined {
    return this._label?.id ? new IssueLabelQuery(this._request).fetch(this._label?.id) : undefined;
  }
}

export class FavoriteConnection {
  private _request: LinearRequest;
  private _nodes?: D.FavoriteConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.FavoriteConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): Favorite[] | undefined {
    return this._nodes?.map(node => new Favorite(this._request, node));
  }
}

export class FigmaEmbedPayload {
  public constructor(request: LinearRequest, data: D.FigmaEmbedPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class FigmaEmbed {
  public constructor(request: LinearRequest, data: D.FigmaEmbedFragment) {
    this.name = data.name ?? undefined;
    this.lastModified = data.lastModified ?? undefined;
    this.nodeName = data.nodeName ?? undefined;
    this.url = data.url ?? undefined;
  }

  /** Figma file name. */
  public name?: string;

  /** Date when the file was updated at the time of embedding. */
  public lastModified?: D.Scalars["DateTime"];

  /** Node name. */
  public nodeName?: string;

  /** Figma screenshot URL. */
  public url?: string;
}

export class InvitePagePayload {
  public constructor(request: LinearRequest, data: D.InvitePagePayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class InviteData {
  public constructor(request: LinearRequest, data: D.InviteDataFragment) {
    this.inviterName = data.inviterName ?? undefined;
    this.avatarURLs = data.avatarURLs ?? undefined;
    this.teamNames = data.teamNames ?? undefined;
    this.teamIds = data.teamIds ?? undefined;
    this.organizationName = data.organizationName ?? undefined;
    this.organizationDomain = data.organizationDomain ?? undefined;
    this.organizationLogoUrl = data.organizationLogoUrl ?? undefined;
    this.userCount = data.userCount ?? undefined;
  }

  /** The name of the inviter. */
  public inviterName?: string;

  /** Avatar URLs for the invitees. */
  public avatarURLs?: string[];

  /** Team names for the invitees. */
  public teamNames?: string[];

  /** Team identifiers for the invitees. */
  public teamIds?: string[];

  /** The name of the organization the users were invited to. */
  public organizationName?: string;

  /** The domain of the organization the users were invited to. */
  public organizationDomain?: string;

  /** The logo of the organization the users were invited to. */
  public organizationLogoUrl?: string;

  /** The user count of the organization. */
  public userCount?: number;
}

export class Notification {
  private _request: LinearRequest;
  private _user?: D.NotificationFragment["user"];
  private _issue?: D.NotificationFragment["issue"];
  private _team?: D.NotificationFragment["team"];
  private _comment?: D.NotificationFragment["comment"];

  public constructor(request: LinearRequest, data: D.NotificationFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.type = data.type ?? undefined;
    this.reactionEmoji = data.reactionEmoji ?? undefined;
    this.readAt = data.readAt ?? undefined;
    this.emailedAt = data.emailedAt ?? undefined;
    this._user = data.user ?? undefined;
    this._issue = data.issue ?? undefined;
    this._team = data.team ?? undefined;
    this._comment = data.comment ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** Notification type */
  public type?: string;

  /** Name of the reaction emoji associated with the notification. */
  public reactionEmoji?: string;

  /** The time at when the user marked the notification as read. Null, if the the user hasn't read the notification */
  public readAt?: D.Scalars["DateTime"];

  /**
   * The time at when an email reminder for this notification was sent to the user. Null, if no email
   *     reminder has been sent.
   */
  public emailedAt?: D.Scalars["DateTime"];

  /** The recipient of the notification. */
  public get user(): Promise<User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }

  /** The issue that the notification is associated with. */
  public get issue(): Promise<Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }

  /** The team which the notification is associated with. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }

  /** The comment which the notification is associated with. */
  public get comment(): Promise<Comment | undefined> | undefined {
    return this._comment?.id ? new CommentQuery(this._request).fetch(this._comment?.id) : undefined;
  }
}

export class NotificationSubscription {
  private _request: LinearRequest;
  private _user?: D.NotificationSubscriptionFragment["user"];
  private _team?: D.NotificationSubscriptionFragment["team"];
  private _project?: D.NotificationSubscriptionFragment["project"];

  public constructor(request: LinearRequest, data: D.NotificationSubscriptionFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.type = data.type ?? undefined;
    this._user = data.user ?? undefined;
    this._team = data.team ?? undefined;
    this._project = data.project ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The type of the subscription. */
  public type?: string;

  /** The user associated with notification subscriptions. */
  public get user(): Promise<User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }

  /** Subscribed team. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }

  /** Subscribed project. */
  public get project(): Promise<Project | undefined> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
}

export class OrganizationInvite {
  private _request: LinearRequest;
  private _inviter?: D.OrganizationInviteFragment["inviter"];
  private _invitee?: D.OrganizationInviteFragment["invitee"];

  public constructor(request: LinearRequest, data: D.OrganizationInviteFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.email = data.email ?? undefined;
    this.external = data.external ?? undefined;
    this.acceptedAt = data.acceptedAt ?? undefined;
    this.expiresAt = data.expiresAt ?? undefined;
    this._inviter = data.inviter ?? undefined;
    this._invitee = data.invitee ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The invitees email address. */
  public email?: string;

  /** The invite was sent to external address. */
  public external?: boolean;

  /** The time at which the invite was accepted. Null, if the invite hasn't been accepted */
  public acceptedAt?: D.Scalars["DateTime"];

  /** The time at which the invite will be expiring. Null, if the invite shouldn't expire */
  public expiresAt?: D.Scalars["DateTime"];

  /** The user who created the invitation. */
  public get inviter(): Promise<User | undefined> | undefined {
    return this._inviter?.id ? new UserQuery(this._request).fetch(this._inviter?.id) : undefined;
  }

  /** The user who has accepted the invite. Null, if the invite hasn't been accepted. */
  public get invitee(): Promise<User | undefined> | undefined {
    return this._invitee?.id ? new UserQuery(this._request).fetch(this._invitee?.id) : undefined;
  }

  /** The organization that the invite is associated with. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

export class PushSubscriptionPayload {
  public constructor(request: LinearRequest, data: D.PushSubscriptionPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class Reaction {
  private _request: LinearRequest;
  private _user?: D.ReactionFragment["user"];
  private _comment?: D.ReactionFragment["comment"];

  public constructor(request: LinearRequest, data: D.ReactionFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.emoji = data.emoji ?? undefined;
    this._user = data.user ?? undefined;
    this._comment = data.comment ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** Name of the reaction's emoji. */
  public emoji?: string;

  /** The user who reacted. */
  public get user(): Promise<User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }

  /** The comment that the reaction is associated with. */
  public get comment(): Promise<Comment | undefined> | undefined {
    return this._comment?.id ? new CommentQuery(this._request).fetch(this._comment?.id) : undefined;
  }
}

export class ReactionConnection {
  private _request: LinearRequest;
  private _nodes?: D.ReactionConnectionFragment["nodes"];

  public constructor(request: LinearRequest, data: D.ReactionConnectionFragment) {
    this._request = request;

    this._nodes = data.nodes ?? undefined;
  }

  public get nodes(): Reaction[] | undefined {
    return this._nodes?.map(node => new Reaction(this._request, node));
  }
}

export class ViewPreferences {
  public constructor(request: LinearRequest, data: D.ViewPreferencesFragment) {
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.type = data.type ?? undefined;
    this.viewType = data.viewType ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The view preference type. */
  public type?: string;

  /** The view type. */
  public viewType?: string;
}

export class UserPayload {
  private _request: LinearRequest;
  private _user?: D.UserPayloadFragment["user"];

  public constructor(request: LinearRequest, data: D.UserPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._user = data.user ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The user that was created or updated. */
  public get user(): Promise<User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
}

export class UserAdminPayload {
  public constructor(request: LinearRequest, data: D.UserAdminPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class OrganizationPayload {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.OrganizationPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The organization that was created or updated. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

export class OrganizationDeletePayload {
  public constructor(request: LinearRequest, data: D.OrganizationDeletePayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class AdminIntegrationPayload {
  public constructor(request: LinearRequest, data: D.AdminIntegrationPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class OrganizationAccessPayload {
  public constructor(request: LinearRequest, data: D.OrganizationAccessPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class OrganizationSamlConfigurePayload {
  public constructor(request: LinearRequest, data: D.OrganizationSamlConfigurePayloadFragment) {
    this.success = data.success ?? undefined;
    this.samlEnabled = data.samlEnabled ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;

  /** Whether SAML is enabled for the organization. */
  public samlEnabled?: boolean;
}

export class SamlConfiguration {
  public constructor(request: LinearRequest, data: D.SamlConfigurationFragment) {
    this.ssoSigningCert = data.ssoSigningCert ?? undefined;
    this.ssoEndpoint = data.ssoEndpoint ?? undefined;
    this.ssoBinding = data.ssoBinding ?? undefined;
    this.ssoSignAlgo = data.ssoSignAlgo ?? undefined;
    this.allowedDomains = data.allowedDomains ?? undefined;
  }

  /** X.509 Signing Certificate in string form. */
  public ssoSigningCert?: string;

  /** Sign in endpoint URL for the identity provider. */
  public ssoEndpoint?: string;

  /** Binding method for authentication call. Can be either `post` (default) or `redirect`. */
  public ssoBinding?: string;

  /** The algorithm of the Signing Certificate. Can be one of `sha1`, `sha256` (default), or `sha512`. */
  public ssoSignAlgo?: string;

  /** List of allowed email domains for SAML authentication. */
  public allowedDomains?: string[];
}

export class AdminCommandPayload {
  public constructor(request: LinearRequest, data: D.AdminCommandPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class EventPayload {
  public constructor(request: LinearRequest, data: D.EventPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class ApiKeyPayload {
  public constructor(request: LinearRequest, data: D.ApiKeyPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class ArchivePayload {
  public constructor(request: LinearRequest, data: D.ArchivePayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class EmailUserAccountAuthChallengeResponse {
  public constructor(request: LinearRequest, data: D.EmailUserAccountAuthChallengeResponseFragment) {
    this.success = data.success ?? undefined;
    this.authType = data.authType ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;

  /** Supported challenge for this user account. Can be either verificationCode or password. */
  public authType?: string;
}

export class CreateOrJoinOrganizationResponse {
  private _request: LinearRequest;
  private _user?: D.CreateOrJoinOrganizationResponseFragment["user"];

  public constructor(request: LinearRequest, data: D.CreateOrJoinOrganizationResponseFragment) {
    this._request = request;

    this._user = data.user ?? undefined;
  }

  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }

  public get user(): Promise<User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
}

export class BillingEmailPayload {
  public constructor(request: LinearRequest, data: D.BillingEmailPayloadFragment) {
    this.success = data.success ?? undefined;
    this.email = data.email ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The customer's email address the invoices are sent to. */
  public email?: string;
}

export class CommentPayload {
  private _request: LinearRequest;
  private _comment?: D.CommentPayloadFragment["comment"];

  public constructor(request: LinearRequest, data: D.CommentPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._comment = data.comment ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The comment that was created or updated. */
  public get comment(): Promise<Comment | undefined> | undefined {
    return this._comment?.id ? new CommentQuery(this._request).fetch(this._comment?.id) : undefined;
  }
}

export class ContactPayload {
  public constructor(request: LinearRequest, data: D.ContactPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class CustomViewPayload {
  private _request: LinearRequest;
  private _customView?: D.CustomViewPayloadFragment["customView"];

  public constructor(request: LinearRequest, data: D.CustomViewPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._customView = data.customView ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The custom view that was created or updated. */
  public get customView(): Promise<CustomView | undefined> | undefined {
    return this._customView?.id ? new CustomViewQuery(this._request).fetch(this._customView?.id) : undefined;
  }
}

export class CyclePayload {
  private _request: LinearRequest;
  private _cycle?: D.CyclePayloadFragment["cycle"];

  public constructor(request: LinearRequest, data: D.CyclePayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._cycle = data.cycle ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The Cycle that was created or updated. */
  public get cycle(): Promise<Cycle | undefined> | undefined {
    return this._cycle?.id ? new CycleQuery(this._request).fetch(this._cycle?.id) : undefined;
  }
}

export class DebugPayload {
  public constructor(request: LinearRequest, data: D.DebugPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class EmailUnsubscribePayload {
  public constructor(request: LinearRequest, data: D.EmailUnsubscribePayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class EmojiPayload {
  private _request: LinearRequest;
  private _emoji?: D.EmojiPayloadFragment["emoji"];

  public constructor(request: LinearRequest, data: D.EmojiPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._emoji = data.emoji ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The emoji that was created. */
  public get emoji(): Promise<Emoji | undefined> | undefined {
    return this._emoji?.id ? new EmojiQuery(this._request).fetch(this._emoji?.id) : undefined;
  }
}

export class FavoritePayload {
  private _request: LinearRequest;
  private _favorite?: D.FavoritePayloadFragment["favorite"];

  public constructor(request: LinearRequest, data: D.FavoritePayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._favorite = data.favorite ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The object that was added as a favorite. */
  public get favorite(): Promise<Favorite | undefined> | undefined {
    return this._favorite?.id ? new FavoriteQuery(this._request).fetch(this._favorite?.id) : undefined;
  }
}

export class FeedbackPayload {
  public constructor(request: LinearRequest, data: D.FeedbackPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class UploadPayload {
  public constructor(request: LinearRequest, data: D.UploadPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class UploadFile {
  public constructor(request: LinearRequest, data: D.UploadFileFragment) {
    this.filename = data.filename ?? undefined;
    this.contentType = data.contentType ?? undefined;
    this.size = data.size ?? undefined;
    this.uploadUrl = data.uploadUrl ?? undefined;
    this.assetUrl = data.assetUrl ?? undefined;
    this.metaData = data.metaData ?? undefined;
  }

  /** The filename. */
  public filename?: string;

  /** The content type. */
  public contentType?: string;

  /** The size of the uploaded file. */
  public size?: number;

  /** The signed URL the for the uploaded file. (assigned automatically) */
  public uploadUrl?: string;

  /** The asset URL for the uploaded file. (assigned automatically) */
  public assetUrl?: string;

  public metaData?: D.Scalars["JSON"];
}

export class UploadFileHeader {
  public constructor(request: LinearRequest, data: D.UploadFileHeaderFragment) {
    this.key = data.key ?? undefined;
    this.value = data.value ?? undefined;
  }

  /** Upload file header key. */
  public key?: string;

  /** Upload file header value. */
  public value?: string;
}

export class ImageUploadFromUrlPayload {
  public constructor(request: LinearRequest, data: D.ImageUploadFromUrlPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.url = data.url ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** The URL containing the image. */
  public url?: string;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class IntegrationPayload {
  private _request: LinearRequest;
  private _integration?: D.IntegrationPayloadFragment["integration"];

  public constructor(request: LinearRequest, data: D.IntegrationPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._integration = data.integration ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The integration that was created or updated. */
  public get integration(): Promise<Integration | undefined> | undefined {
    return this._integration?.id ? new IntegrationQuery(this._request).fetch(this._integration?.id) : undefined;
  }
}

export class IssueLabelPayload {
  private _request: LinearRequest;
  private _issueLabel?: D.IssueLabelPayloadFragment["issueLabel"];

  public constructor(request: LinearRequest, data: D.IssueLabelPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._issueLabel = data.issueLabel ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The label that was created or updated. */
  public get issueLabel(): Promise<IssueLabel | undefined> | undefined {
    return this._issueLabel?.id ? new IssueLabelQuery(this._request).fetch(this._issueLabel?.id) : undefined;
  }
}

export class IssueRelationPayload {
  private _request: LinearRequest;
  private _issueRelation?: D.IssueRelationPayloadFragment["issueRelation"];

  public constructor(request: LinearRequest, data: D.IssueRelationPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._issueRelation = data.issueRelation ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The issue relation that was created or updated. */
  public get issueRelation(): Promise<IssueRelation | undefined> | undefined {
    return this._issueRelation?.id ? new IssueRelationQuery(this._request).fetch(this._issueRelation?.id) : undefined;
  }
}

export class IssuePayload {
  private _request: LinearRequest;
  private _issue?: D.IssuePayloadFragment["issue"];

  public constructor(request: LinearRequest, data: D.IssuePayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._issue = data.issue ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The issue that was created or updated. */
  public get issue(): Promise<Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
}

export class MilestonePayload {
  private _request: LinearRequest;
  private _milestone?: D.MilestonePayloadFragment["milestone"];

  public constructor(request: LinearRequest, data: D.MilestonePayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._milestone = data.milestone ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The milesteone that was created or updated. */
  public get milestone(): Promise<Milestone | undefined> | undefined {
    return this._milestone?.id ? new MilestoneQuery(this._request).fetch(this._milestone?.id) : undefined;
  }
}

export class NotificationPayload {
  public constructor(request: LinearRequest, data: D.NotificationPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class NotificationSubscriptionPayload {
  public constructor(request: LinearRequest, data: D.NotificationSubscriptionPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class OauthClientPayload {
  public constructor(request: LinearRequest, data: D.OauthClientPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class OauthClient {
  public constructor(request: LinearRequest, data: D.OauthClientFragment) {
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.clientId = data.clientId ?? undefined;
    this.name = data.name ?? undefined;
    this.description = data.description ?? undefined;
    this.developer = data.developer ?? undefined;
    this.developerUrl = data.developerUrl ?? undefined;
    this.imageUrl = data.imageUrl ?? undefined;
    this.clientSecret = data.clientSecret ?? undefined;
    this.redirectUris = data.redirectUris ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** OAuth application's client ID. */
  public clientId?: string;

  /** OAuth application's client name. */
  public name?: string;

  /** Information about the application. */
  public description?: string;

  /** Name of the developer. */
  public developer?: string;

  /** Url of the developer. */
  public developerUrl?: string;

  /** Image of the application. */
  public imageUrl?: string;

  /** OAuth application's client secret. */
  public clientSecret?: string;

  /** List of allowed redirect URIs for the application. */
  public redirectUris?: string[];
}

export class RotateSecretPayload {
  public constructor(request: LinearRequest, data: D.RotateSecretPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class OauthTokenRevokePayload {
  public constructor(request: LinearRequest, data: D.OauthTokenRevokePayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class OrganizationDomainPayload {
  public constructor(request: LinearRequest, data: D.OrganizationDomainPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class OrganizationDomain {
  private _request: LinearRequest;
  private _creator?: D.OrganizationDomainFragment["creator"];

  public constructor(request: LinearRequest, data: D.OrganizationDomainFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.verified = data.verified ?? undefined;
    this.verificationEmail = data.verificationEmail ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** Domain name */
  public name?: string;

  /** Is this domain verified */
  public verified?: boolean;

  /** E-mail used to verify this domain */
  public verificationEmail?: string;

  /** The user who added the domain. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}

export class OrganizationInvitePayload {
  public constructor(request: LinearRequest, data: D.OrganizationInvitePayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class ProjectLinkPayload {
  private _request: LinearRequest;
  private _projectLink?: D.ProjectLinkPayloadFragment["projectLink"];

  public constructor(request: LinearRequest, data: D.ProjectLinkPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._projectLink = data.projectLink ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The project that was created or updated. */
  public get projectLink(): Promise<ProjectLink | undefined> | undefined {
    return this._projectLink?.id ? new ProjectLinkQuery(this._request).fetch(this._projectLink?.id) : undefined;
  }
}

export class ProjectPayload {
  private _request: LinearRequest;
  private _project?: D.ProjectPayloadFragment["project"];

  public constructor(request: LinearRequest, data: D.ProjectPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._project = data.project ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The project that was created or updated. */
  public get project(): Promise<Project | undefined> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
}

export class ReactionPayload {
  private _request: LinearRequest;
  private _reaction?: D.ReactionPayloadFragment["reaction"];

  public constructor(request: LinearRequest, data: D.ReactionPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._reaction = data.reaction ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  public success?: boolean;

  public get reaction(): Promise<Reaction | undefined> | undefined {
    return this._reaction?.id ? new ReactionQuery(this._request).fetch(this._reaction?.id) : undefined;
  }
}

export class CreateCsvExportReportPayload {
  public constructor(request: LinearRequest, data: D.CreateCsvExportReportPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class SubscriptionSessionPayload {
  public constructor(request: LinearRequest, data: D.SubscriptionSessionPayloadFragment) {
    this.session = data.session ?? undefined;
  }

  /** The subscription session that was created or updated. */
  public session?: string;
}

export class SubscriptionPayload {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.SubscriptionPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.canceledAt = data.canceledAt ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** The date the subscription was set to cancel at the end of the billing period, if any. */
  public canceledAt?: D.Scalars["DateTime"];

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The subscription entity being mutated. */
  public get subscription(): Promise<Subscription | undefined> {
    return new SubscriptionQuery(this._request).fetch();
  }
}

export class TeamMembershipPayload {
  private _request: LinearRequest;
  private _teamMembership?: D.TeamMembershipPayloadFragment["teamMembership"];

  public constructor(request: LinearRequest, data: D.TeamMembershipPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._teamMembership = data.teamMembership ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The team membership that was created or updated. */
  public get teamMembership(): Promise<TeamMembership | undefined> | undefined {
    return this._teamMembership?.id
      ? new TeamMembershipQuery(this._request).fetch(this._teamMembership?.id)
      : undefined;
  }
}

export class TeamPayload {
  private _request: LinearRequest;
  private _team?: D.TeamPayloadFragment["team"];

  public constructor(request: LinearRequest, data: D.TeamPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The team that was created or updated. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
}

export class TemplatePayload {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.TemplatePayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The template that was created or updated. */
  public get template(): Promise<Template | undefined> {
    return new TemplatesQuery(this._request).fetch();
  }
}

export class UserSettingsPayload {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.UserSettingsPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The user's settings. */
  public get userSettings(): Promise<UserSettings | undefined> {
    return new NotificationQuery(this._request).fetch();
  }
}

export class UserSettingsFlagPayload {
  public constructor(request: LinearRequest, data: D.UserSettingsFlagPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.flag = data.flag ?? undefined;
    this.value = data.value ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** The flag key which was updated. */
  public flag?: string;

  /** The flag value after update. */
  public value?: number;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class UserSettingsFlagsResetPayload {
  public constructor(request: LinearRequest, data: D.UserSettingsFlagsResetPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class UserSubscribeToNewsletterPayload {
  public constructor(request: LinearRequest, data: D.UserSubscribeToNewsletterPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class ViewPreferencesPayload {
  public constructor(request: LinearRequest, data: D.ViewPreferencesPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class WebhookPayload {
  private _request: LinearRequest;
  private _webhook?: D.WebhookPayloadFragment["webhook"];

  public constructor(request: LinearRequest, data: D.WebhookPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._webhook = data.webhook ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The webhook entity being mutated. */
  public get webhook(): Promise<Webhook | undefined> | undefined {
    return this._webhook?.id ? new WebhookQuery(this._request).fetch(this._webhook?.id) : undefined;
  }
}

export class WorkflowStatePayload {
  private _request: LinearRequest;
  private _workflowState?: D.WorkflowStatePayloadFragment["workflowState"];

  public constructor(request: LinearRequest, data: D.WorkflowStatePayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._workflowState = data.workflowState ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;

  /** Whether the operation was successful. */
  public success?: boolean;

  /** The state that was created or updated. */
  public get workflowState(): Promise<WorkflowState | undefined> | undefined {
    return this._workflowState?.id ? new WorkflowStateQuery(this._request).fetch(this._workflowState?.id) : undefined;
  }
}

export class DocumentStep {
  public constructor(request: LinearRequest, data: D.DocumentStepFragment) {
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.step = data.step ?? undefined;
    this.version = data.version ?? undefined;
    this.clientId = data.clientId ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** Step data. */
  public step?: D.Scalars["JSON"];

  /** Step version. */
  public version?: number;

  /** Connected client ID. */
  public clientId?: string;
}

export class PushSubscription {
  public constructor(request: LinearRequest, data: D.PushSubscriptionFragment) {
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];

  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
}

export class UserAccount {
  private _request: LinearRequest;
  private _users?: D.UserAccountFragment["users"];

  public constructor(request: LinearRequest, data: D.UserAccountFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.email = data.email ?? undefined;
    this.service = data.service ?? undefined;
    this._users = data.users ?? undefined;
  }

  /** The models identifier. */
  public id?: string;

  /** The time at which the model was created. */
  public createdAt?: D.Scalars["DateTime"];

  /** The time at which the model was updated. */
  public updatedAt?: D.Scalars["DateTime"];

  /** The time at which the model was archived. */
  public archivedAt?: D.Scalars["DateTime"];

  /** The user's name. */
  public name?: string;

  /** The user's email address. */
  public email?: string;

  /** The authentication service used to create the account. */
  public service?: string;

  /** Users belonging to the account. */
  public get users(): User[] | undefined {
    return this._users?.map(node => new User(this._request, node));
  }
}

export class FileUpload {
  private _request: LinearRequest;
  private _creator?: D.FileUploadFragment["creator"];

  public constructor(request: LinearRequest, data: D.FileUploadFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.assetUrl = data.assetUrl ?? undefined;
    this.contentType = data.contentType ?? undefined;
    this.filename = data.filename ?? undefined;
    this.metaData = data.metaData ?? undefined;
    this.size = data.size ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;

  /** The asset URL this file is available at. */
  public assetUrl?: string;

  /** The MIME type of the uploaded file. */
  public contentType?: string;

  /** The name of the uploaded file. */
  public filename?: string;

  /** Additional metadata of the file. */
  public metaData?: D.Scalars["JSON"];

  /** Size of the uploaded file in bytes. */
  public size?: number;

  /** The user who uploaded the file. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }

  /** The organization the upload belongs to. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

export class SynchronizedPayload {
  public constructor(request: LinearRequest, data: D.SynchronizedPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
}

export class Application {
  public constructor(request: LinearRequest, data: D.ApplicationFragment) {
    this.clientId = data.clientId ?? undefined;
    this.name = data.name ?? undefined;
    this.description = data.description ?? undefined;
    this.developer = data.developer ?? undefined;
    this.developerUrl = data.developerUrl ?? undefined;
    this.imageUrl = data.imageUrl ?? undefined;
  }

  /** OAuth application's client ID. */
  public clientId?: string;

  /** Application name. */
  public name?: string;

  /** Information about the application. */
  public description?: string;

  /** Name of the developer. */
  public developer?: string;

  /** Url of the developer (homepage or docs). */
  public developerUrl?: string;

  /** Image of the application. */
  public imageUrl?: string;
}

export class OrganizationDomainSimplePayload {
  public constructor(request: LinearRequest, data: D.OrganizationDomainSimplePayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

export class UserQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.UserQuery, D.UserQueryVariables>(D.UserDocument, { id }).then(response => {
      const data = response?.user;
      return data ? new User(this._request, data) : undefined;
    });
  }
}

export class ViewerQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.ViewerQuery, D.ViewerQueryVariables>(D.ViewerDocument, {}).then(response => {
      const data = response?.viewer;
      return data ? new User(this._request, data) : undefined;
    });
  }
}

export class OrganizationQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.OrganizationQuery, D.OrganizationQueryVariables>(D.OrganizationDocument, {}).then(
      response => {
        const data = response?.organization;
        return data ? new Organization(this._request, data) : undefined;
      }
    );
  }
}

export class OrganizationExistsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(urlKey: string) {
    return this._request<D.OrganizationExistsQuery, D.OrganizationExistsQueryVariables>(D.OrganizationExistsDocument, {
      urlKey,
    }).then(response => {
      const data = response?.organizationExists;
      return data ? new OrganizationExistsPayload(this._request, data) : undefined;
    });
  }
}

export class SyncBootstrapQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(databaseVersion: number, sinceSyncId: number) {
    return this._request<D.SyncBootstrapQuery, D.SyncBootstrapQueryVariables>(D.SyncBootstrapDocument, {
      databaseVersion,
      sinceSyncId,
    }).then(response => {
      const data = response?.syncBootstrap;
      return data ? new SyncResponse(this._request, data) : undefined;
    });
  }
}

export class SyncUpdatesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(sinceSyncId: number) {
    return this._request<D.SyncUpdatesQuery, D.SyncUpdatesQueryVariables>(D.SyncUpdatesDocument, { sinceSyncId }).then(
      response => {
        const data = response?.syncUpdates;
        return data ? new SyncResponse(this._request, data) : undefined;
      }
    );
  }
}

export class ArchivedModelSyncQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(identifier: string, modelClass: string) {
    return this._request<D.ArchivedModelSyncQuery, D.ArchivedModelSyncQueryVariables>(D.ArchivedModelSyncDocument, {
      identifier,
      modelClass,
    }).then(response => {
      const data = response?.archivedModelSync;
      return data ? new ArchiveResponse(this._request, data) : undefined;
    });
  }
}

export class ArchivedModelsSyncQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(
    modelClass: string,
    teamId: string,
    vars?: Omit<D.ArchivedModelsSyncQueryVariables, "modelClass" | "teamId">
  ) {
    return this._request<D.ArchivedModelsSyncQuery, D.ArchivedModelsSyncQueryVariables>(D.ArchivedModelsSyncDocument, {
      modelClass,
      teamId,
      ...vars,
    }).then(response => {
      const data = response?.archivedModelsSync;
      return data ? new ArchiveResponse(this._request, data) : undefined;
    });
  }
}

export class AdminUserAccountLookupQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.AdminUserAccountLookupQueryVariables) {
    return this._request<D.AdminUserAccountLookupQuery, D.AdminUserAccountLookupQueryVariables>(
      D.AdminUserAccountLookupDocument,
      vars
    ).then(response => {
      const data = response?.adminUserAccountLookup;
      return data ? new UserAccountAdminPrivileged(this._request, data) : undefined;
    });
  }
}

export class UsersQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.UsersQueryVariables) {
    return this._request<D.UsersQuery, D.UsersQueryVariables>(D.UsersDocument, vars).then(response => {
      const data = response?.users;
      return data ? new UserConnection(this._request, data) : undefined;
    });
  }
}

export class ApiKeysQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.ApiKeysQueryVariables) {
    return this._request<D.ApiKeysQuery, D.ApiKeysQueryVariables>(D.ApiKeysDocument, vars).then(response => {
      const data = response?.apiKeys;
      return data ? new ApiKeyConnection(this._request, data) : undefined;
    });
  }
}

export class ApplicationWithAuthorizationQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(
    scope: string[],
    clientId: string,
    vars?: Omit<D.ApplicationWithAuthorizationQueryVariables, "scope" | "clientId">
  ) {
    return this._request<D.ApplicationWithAuthorizationQuery, D.ApplicationWithAuthorizationQueryVariables>(
      D.ApplicationWithAuthorizationDocument,
      { scope, clientId, ...vars }
    ).then(response => {
      const data = response?.applicationWithAuthorization;
      return data ? new UserAuthorizedApplication(this._request, data) : undefined;
    });
  }
}

export class AuthorizedApplicationsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.AuthorizedApplicationsQuery, D.AuthorizedApplicationsQueryVariables>(
      D.AuthorizedApplicationsDocument,
      {}
    ).then(response => {
      const data = response?.authorizedApplications;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AvailableUsersQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.AvailableUsersQuery, D.AvailableUsersQueryVariables>(D.AvailableUsersDocument, {}).then(
      response => {
        const data = response?.availableUsers;
        return data ? new AuthResolverResponse(this._request, data) : undefined;
      }
    );
  }
}

export class SsoUrlFromEmailQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(email: string, vars?: Omit<D.SsoUrlFromEmailQueryVariables, "email">) {
    return this._request<D.SsoUrlFromEmailQuery, D.SsoUrlFromEmailQueryVariables>(D.SsoUrlFromEmailDocument, {
      email,
      ...vars,
    }).then(response => {
      const data = response?.ssoUrlFromEmail;
      return data ? new SsoUrlFromEmailResponse(this._request, data) : undefined;
    });
  }
}

export class BillingDetailsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.BillingDetailsQuery, D.BillingDetailsQueryVariables>(D.BillingDetailsDocument, {}).then(
      response => {
        const data = response?.billingDetails;
        return data ? new BillingDetailsPayload(this._request, data) : undefined;
      }
    );
  }
}

export class CollaborativeDocumentJoinQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(clientId: string, issueId: string, version: number) {
    return this._request<D.CollaborativeDocumentJoinQuery, D.CollaborativeDocumentJoinQueryVariables>(
      D.CollaborativeDocumentJoinDocument,
      { clientId, issueId, version }
    ).then(response => {
      const data = response?.collaborativeDocumentJoin;
      return data ? new CollaborationDocumentUpdatePayload(this._request, data) : undefined;
    });
  }
}

export class CommentQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.CommentQuery, D.CommentQueryVariables>(D.CommentDocument, { id }).then(response => {
      const data = response?.comment;
      return data ? new Comment(this._request, data) : undefined;
    });
  }
}

export class CommentsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.CommentsQueryVariables) {
    return this._request<D.CommentsQuery, D.CommentsQueryVariables>(D.CommentsDocument, vars).then(response => {
      const data = response?.comments;
      return data ? new CommentConnection(this._request, data) : undefined;
    });
  }
}

export class CustomViewQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.CustomViewQuery, D.CustomViewQueryVariables>(D.CustomViewDocument, { id }).then(response => {
      const data = response?.customView;
      return data ? new CustomView(this._request, data) : undefined;
    });
  }
}

export class CustomViewsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.CustomViewsQueryVariables) {
    return this._request<D.CustomViewsQuery, D.CustomViewsQueryVariables>(D.CustomViewsDocument, vars).then(
      response => {
        const data = response?.customViews;
        return data ? new CustomViewConnection(this._request, data) : undefined;
      }
    );
  }
}

export class CycleQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.CycleQuery, D.CycleQueryVariables>(D.CycleDocument, { id }).then(response => {
      const data = response?.cycle;
      return data ? new Cycle(this._request, data) : undefined;
    });
  }
}

export class CyclesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.CyclesQueryVariables) {
    return this._request<D.CyclesQuery, D.CyclesQueryVariables>(D.CyclesDocument, vars).then(response => {
      const data = response?.cycles;
      return data ? new CycleConnection(this._request, data) : undefined;
    });
  }
}

export class EmojiQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.EmojiQuery, D.EmojiQueryVariables>(D.EmojiDocument, { id }).then(response => {
      const data = response?.emoji;
      return data ? new Emoji(this._request, data) : undefined;
    });
  }
}

export class EmojisQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.EmojisQueryVariables) {
    return this._request<D.EmojisQuery, D.EmojisQueryVariables>(D.EmojisDocument, vars).then(response => {
      const data = response?.emojis;
      return data ? new EmojiConnection(this._request, data) : undefined;
    });
  }
}

export class FavoriteQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.FavoriteQuery, D.FavoriteQueryVariables>(D.FavoriteDocument, { id }).then(response => {
      const data = response?.favorite;
      return data ? new Favorite(this._request, data) : undefined;
    });
  }
}

export class FavoritesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.FavoritesQueryVariables) {
    return this._request<D.FavoritesQuery, D.FavoritesQueryVariables>(D.FavoritesDocument, vars).then(response => {
      const data = response?.favorites;
      return data ? new FavoriteConnection(this._request, data) : undefined;
    });
  }
}

export class FigmaEmbedInfoQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(fileId: string, vars?: Omit<D.FigmaEmbedInfoQueryVariables, "fileId">) {
    return this._request<D.FigmaEmbedInfoQuery, D.FigmaEmbedInfoQueryVariables>(D.FigmaEmbedInfoDocument, {
      fileId,
      ...vars,
    }).then(response => {
      const data = response?.figmaEmbedInfo;
      return data ? new FigmaEmbedPayload(this._request, data) : undefined;
    });
  }
}

export class IntegrationQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.IntegrationQuery, D.IntegrationQueryVariables>(D.IntegrationDocument, { id }).then(
      response => {
        const data = response?.integration;
        return data ? new Integration(this._request, data) : undefined;
      }
    );
  }
}

export class IntegrationsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.IntegrationsQueryVariables) {
    return this._request<D.IntegrationsQuery, D.IntegrationsQueryVariables>(D.IntegrationsDocument, vars).then(
      response => {
        const data = response?.integrations;
        return data ? new IntegrationConnection(this._request, data) : undefined;
      }
    );
  }
}

export class IntegrationResourceQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.IntegrationResourceQuery, D.IntegrationResourceQueryVariables>(
      D.IntegrationResourceDocument,
      { id }
    ).then(response => {
      const data = response?.integrationResource;
      return data ? new IntegrationResource(this._request, data) : undefined;
    });
  }
}

export class IntegrationResourcesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.IntegrationResourcesQueryVariables) {
    return this._request<D.IntegrationResourcesQuery, D.IntegrationResourcesQueryVariables>(
      D.IntegrationResourcesDocument,
      vars
    ).then(response => {
      const data = response?.integrationResources;
      return data ? new IntegrationResourceConnection(this._request, data) : undefined;
    });
  }
}

export class InviteInfoQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(userHash: string, vars?: Omit<D.InviteInfoQueryVariables, "userHash">) {
    return this._request<D.InviteInfoQuery, D.InviteInfoQueryVariables>(D.InviteInfoDocument, {
      userHash,
      ...vars,
    }).then(response => {
      const data = response?.inviteInfo;
      return data ? new InvitePagePayload(this._request, data) : undefined;
    });
  }
}

export class IssueLabelQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.IssueLabelQuery, D.IssueLabelQueryVariables>(D.IssueLabelDocument, { id }).then(response => {
      const data = response?.issueLabel;
      return data ? new IssueLabel(this._request, data) : undefined;
    });
  }
}

export class IssueLabelsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.IssueLabelsQueryVariables) {
    return this._request<D.IssueLabelsQuery, D.IssueLabelsQueryVariables>(D.IssueLabelsDocument, vars).then(
      response => {
        const data = response?.issueLabels;
        return data ? new IssueLabelConnection(this._request, data) : undefined;
      }
    );
  }
}

export class IssueRelationQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.IssueRelationQuery, D.IssueRelationQueryVariables>(D.IssueRelationDocument, { id }).then(
      response => {
        const data = response?.issueRelation;
        return data ? new IssueRelation(this._request, data) : undefined;
      }
    );
  }
}

export class IssueRelationsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.IssueRelationsQueryVariables) {
    return this._request<D.IssueRelationsQuery, D.IssueRelationsQueryVariables>(D.IssueRelationsDocument, vars).then(
      response => {
        const data = response?.issueRelations;
        return data ? new IssueRelationConnection(this._request, data) : undefined;
      }
    );
  }
}

export class IssueQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.IssueQuery, D.IssueQueryVariables>(D.IssueDocument, { id }).then(response => {
      const data = response?.issue;
      return data ? new Issue(this._request, data) : undefined;
    });
  }
}

export class IssueSearchQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(query: string, vars?: Omit<D.IssueSearchQueryVariables, "query">) {
    return this._request<D.IssueSearchQuery, D.IssueSearchQueryVariables>(D.IssueSearchDocument, {
      query,
      ...vars,
    }).then(response => {
      const data = response?.issueSearch;
      return data ? new IssueConnection(this._request, data) : undefined;
    });
  }
}

export class IssuesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.IssuesQueryVariables) {
    return this._request<D.IssuesQuery, D.IssuesQueryVariables>(D.IssuesDocument, vars).then(response => {
      const data = response?.issues;
      return data ? new IssueConnection(this._request, data) : undefined;
    });
  }
}

export class MilestoneQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.MilestoneQuery, D.MilestoneQueryVariables>(D.MilestoneDocument, { id }).then(response => {
      const data = response?.milestone;
      return data ? new Milestone(this._request, data) : undefined;
    });
  }
}

export class MilestonesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.MilestonesQueryVariables) {
    return this._request<D.MilestonesQuery, D.MilestonesQueryVariables>(D.MilestonesDocument, vars).then(response => {
      const data = response?.milestones;
      return data ? new MilestoneConnection(this._request, data) : undefined;
    });
  }
}

export class NotificationQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.NotificationQuery, D.NotificationQueryVariables>(D.NotificationDocument, {}).then(
      response => {
        const data = response?.notification;
        return data ? new UserSettings(this._request, data) : undefined;
      }
    );
  }
}

export class NotificationsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.NotificationsQueryVariables) {
    return this._request<D.NotificationsQuery, D.NotificationsQueryVariables>(D.NotificationsDocument, vars).then(
      response => {
        const data = response?.notifications;
        return data ? new NotificationConnection(this._request, data) : undefined;
      }
    );
  }
}

export class NotificationSubscriptionQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.NotificationSubscriptionQueryVariables) {
    return this._request<D.NotificationSubscriptionQuery, D.NotificationSubscriptionQueryVariables>(
      D.NotificationSubscriptionDocument,
      vars
    ).then(response => {
      const data = response?.notificationSubscription;
      return data ? new NotificationSubscriptionConnection(this._request, data) : undefined;
    });
  }
}

export class OrganizationInviteQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.OrganizationInviteQuery, D.OrganizationInviteQueryVariables>(D.OrganizationInviteDocument, {
      id,
    }).then(response => {
      const data = response?.organizationInvite;
      return data ? new IssueLabel(this._request, data) : undefined;
    });
  }
}

export class OrganizationInvitesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.OrganizationInvitesQueryVariables) {
    return this._request<D.OrganizationInvitesQuery, D.OrganizationInvitesQueryVariables>(
      D.OrganizationInvitesDocument,
      vars
    ).then(response => {
      const data = response?.organizationInvites;
      return data ? new OrganizationInviteConnection(this._request, data) : undefined;
    });
  }
}

export class ProjectLinkQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.ProjectLinkQuery, D.ProjectLinkQueryVariables>(D.ProjectLinkDocument, { id }).then(
      response => {
        const data = response?.projectLink;
        return data ? new ProjectLink(this._request, data) : undefined;
      }
    );
  }
}

export class ProjectLinksQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.ProjectLinksQueryVariables) {
    return this._request<D.ProjectLinksQuery, D.ProjectLinksQueryVariables>(D.ProjectLinksDocument, vars).then(
      response => {
        const data = response?.ProjectLinks;
        return data ? new ProjectLinkConnection(this._request, data) : undefined;
      }
    );
  }
}

export class ProjectQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.ProjectQuery, D.ProjectQueryVariables>(D.ProjectDocument, { id }).then(response => {
      const data = response?.project;
      return data ? new Project(this._request, data) : undefined;
    });
  }
}

export class ProjectsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.ProjectsQueryVariables) {
    return this._request<D.ProjectsQuery, D.ProjectsQueryVariables>(D.ProjectsDocument, vars).then(response => {
      const data = response?.projects;
      return data ? new ProjectConnection(this._request, data) : undefined;
    });
  }
}

export class PushSubscriptionTestQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.PushSubscriptionTestQuery, D.PushSubscriptionTestQueryVariables>(
      D.PushSubscriptionTestDocument,
      {}
    ).then(response => {
      const data = response?.pushSubscriptionTest;
      return data ? new PushSubscriptionPayload(this._request, data) : undefined;
    });
  }
}

export class ReactionQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.ReactionQuery, D.ReactionQueryVariables>(D.ReactionDocument, { id }).then(response => {
      const data = response?.reaction;
      return data ? new Reaction(this._request, data) : undefined;
    });
  }
}

export class ReactionsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.ReactionsQueryVariables) {
    return this._request<D.ReactionsQuery, D.ReactionsQueryVariables>(D.ReactionsDocument, vars).then(response => {
      const data = response?.reactions;
      return data ? new ReactionConnection(this._request, data) : undefined;
    });
  }
}

export class SubscriptionQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.SubscriptionQuery, D.SubscriptionQueryVariables>(D.SubscriptionDocument, {}).then(
      response => {
        const data = response?.subscription;
        return data ? new Subscription(this._request, data) : undefined;
      }
    );
  }
}

export class TeamMembershipQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.TeamMembershipQuery, D.TeamMembershipQueryVariables>(D.TeamMembershipDocument, { id }).then(
      response => {
        const data = response?.teamMembership;
        return data ? new TeamMembership(this._request, data) : undefined;
      }
    );
  }
}

export class TeamMembershipsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.TeamMembershipsQueryVariables) {
    return this._request<D.TeamMembershipsQuery, D.TeamMembershipsQueryVariables>(D.TeamMembershipsDocument, vars).then(
      response => {
        const data = response?.teamMemberships;
        return data ? new TeamMembershipConnection(this._request, data) : undefined;
      }
    );
  }
}

export class TeamQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.TeamQuery, D.TeamQueryVariables>(D.TeamDocument, { id }).then(response => {
      const data = response?.team;
      return data ? new Team(this._request, data) : undefined;
    });
  }
}

export class TeamsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.TeamsQueryVariables) {
    return this._request<D.TeamsQuery, D.TeamsQueryVariables>(D.TeamsDocument, vars).then(response => {
      const data = response?.teams;
      return data ? new TeamConnection(this._request, data) : undefined;
    });
  }
}

export class TemplatesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.TemplatesQuery, D.TemplatesQueryVariables>(D.TemplatesDocument, {}).then(response => {
      const data = response?.templates;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class TemplateQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.TemplateQuery, D.TemplateQueryVariables>(D.TemplateDocument, { id }).then(response => {
      const data = response?.template;
      return data ? new Template(this._request, data) : undefined;
    });
  }
}

export class ViewPreferencesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.ViewPreferencesQueryVariables) {
    return this._request<D.ViewPreferencesQuery, D.ViewPreferencesQueryVariables>(D.ViewPreferencesDocument, vars).then(
      response => {
        const data = response?.viewPreferences;
        return data ? new ViewPreferencesConnection(this._request, data) : undefined;
      }
    );
  }
}

export class WebhookQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.WebhookQuery, D.WebhookQueryVariables>(D.WebhookDocument, { id }).then(response => {
      const data = response?.webhook;
      return data ? new Webhook(this._request, data) : undefined;
    });
  }
}

export class WebhooksQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.WebhooksQueryVariables) {
    return this._request<D.WebhooksQuery, D.WebhooksQueryVariables>(D.WebhooksDocument, vars).then(response => {
      const data = response?.webhooks;
      return data ? new WebhookConnection(this._request, data) : undefined;
    });
  }
}

export class WorkflowStateQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.WorkflowStateQuery, D.WorkflowStateQueryVariables>(D.WorkflowStateDocument, { id }).then(
      response => {
        const data = response?.workflowState;
        return data ? new WorkflowState(this._request, data) : undefined;
      }
    );
  }
}

export class WorkflowStatesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.WorkflowStatesQueryVariables) {
    return this._request<D.WorkflowStatesQuery, D.WorkflowStatesQueryVariables>(D.WorkflowStatesDocument, vars).then(
      response => {
        const data = response?.workflowStates;
        return data ? new WorkflowStateConnection(this._request, data) : undefined;
      }
    );
  }
}

export class UserUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.UpdateUserInput, id: string) {
    return this._request<D.UserUpdateMutation, D.UserUpdateMutationVariables>(D.UserUpdateDocument, { input, id }).then(
      response => {
        const data = response?.userUpdate;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class UserPromoteAdminMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.UserPromoteAdminMutation, D.UserPromoteAdminMutationVariables>(D.UserPromoteAdminDocument, {
      id,
    }).then(response => {
      const data = response?.userPromoteAdmin;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class UserDemoteAdminMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.UserDemoteAdminMutation, D.UserDemoteAdminMutationVariables>(D.UserDemoteAdminDocument, {
      id,
    }).then(response => {
      const data = response?.userDemoteAdmin;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class UserSuspendMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.UserSuspendMutation, D.UserSuspendMutationVariables>(D.UserSuspendDocument, { id }).then(
      response => {
        const data = response?.userSuspend;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class UserUnsuspendMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.UserUnsuspendMutation, D.UserUnsuspendMutationVariables>(D.UserUnsuspendDocument, {
      id,
    }).then(response => {
      const data = response?.userUnsuspend;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OrganizationUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.UpdateOrganizationInput) {
    return this._request<D.OrganizationUpdateMutation, D.OrganizationUpdateMutationVariables>(
      D.OrganizationUpdateDocument,
      { input }
    ).then(response => {
      const data = response?.organizationUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OrganizationDeleteChallengeMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.OrganizationDeleteChallengeMutation, D.OrganizationDeleteChallengeMutationVariables>(
      D.OrganizationDeleteChallengeDocument,
      {}
    ).then(response => {
      const data = response?.organizationDeleteChallenge;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OrganizationDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.DeleteOrganizationInput) {
    return this._request<D.OrganizationDeleteMutation, D.OrganizationDeleteMutationVariables>(
      D.OrganizationDeleteDocument,
      { input }
    ).then(response => {
      const data = response?.organizationDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminDeleteIntegrationMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.AdminDeleteIntegrationMutation, D.AdminDeleteIntegrationMutationVariables>(
      D.AdminDeleteIntegrationDocument,
      { id }
    ).then(response => {
      const data = response?.adminDeleteIntegration;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OrganizationToggleAccessMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.OrganizationToggleAccessMutation, D.OrganizationToggleAccessMutationVariables>(
      D.OrganizationToggleAccessDocument,
      { id }
    ).then(response => {
      const data = response?.organizationToggleAccess;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OrganizationChangeEmailDomainMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(toDomain: string, fromDomain: string, id: string) {
    return this._request<D.OrganizationChangeEmailDomainMutation, D.OrganizationChangeEmailDomainMutationVariables>(
      D.OrganizationChangeEmailDomainDocument,
      { toDomain, fromDomain, id }
    ).then(response => {
      const data = response?.organizationChangeEmailDomain;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OrganizationToggleSamlEnabledMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.OrganizationToggleSamlEnabledMutation, D.OrganizationToggleSamlEnabledMutationVariables>(
      D.OrganizationToggleSamlEnabledDocument,
      { id }
    ).then(response => {
      const data = response?.organizationToggleSamlEnabled;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OrganizationConfigureSamlMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(samlConfiguration: D.SamlConfigurationInput, id: string) {
    return this._request<D.OrganizationConfigureSamlMutation, D.OrganizationConfigureSamlMutationVariables>(
      D.OrganizationConfigureSamlDocument,
      { samlConfiguration, id }
    ).then(response => {
      const data = response?.organizationConfigureSaml;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminCommandMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.AdminCommandInput) {
    return this._request<D.AdminCommandMutation, D.AdminCommandMutationVariables>(D.AdminCommandDocument, {
      input,
    }).then(response => {
      const data = response?.adminCommand;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminBulkEmailMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(
    emails: string[],
    markdownContent: string,
    subject: string,
    vars?: Omit<D.AdminBulkEmailMutationVariables, "emails" | "markdownContent" | "subject">
  ) {
    return this._request<D.AdminBulkEmailMutation, D.AdminBulkEmailMutationVariables>(D.AdminBulkEmailDocument, {
      emails,
      markdownContent,
      subject,
      ...vars,
    }).then(response => {
      const data = response?.adminBulkEmail;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminCreateStripeCustomerMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(organizationId: string) {
    return this._request<D.AdminCreateStripeCustomerMutation, D.AdminCreateStripeCustomerMutationVariables>(
      D.AdminCreateStripeCustomerDocument,
      { organizationId }
    ).then(response => {
      const data = response?.adminCreateStripeCustomer;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminScheduleAnonymousTaskMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(taskName: string) {
    return this._request<D.AdminScheduleAnonymousTaskMutation, D.AdminScheduleAnonymousTaskMutationVariables>(
      D.AdminScheduleAnonymousTaskDocument,
      { taskName }
    ).then(response => {
      const data = response?.adminScheduleAnonymousTask;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminUserAccountChangeEmailMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(newEmail: string, id: string) {
    return this._request<D.AdminUserAccountChangeEmailMutation, D.AdminUserAccountChangeEmailMutationVariables>(
      D.AdminUserAccountChangeEmailDocument,
      { newEmail, id }
    ).then(response => {
      const data = response?.adminUserAccountChangeEmail;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class EventCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.EventCreateInput) {
    return this._request<D.EventCreateMutation, D.EventCreateMutationVariables>(D.EventCreateDocument, { input }).then(
      response => {
        const data = response?.eventCreate;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class ApiKeyCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.ApiKeyCreateInput) {
    return this._request<D.ApiKeyCreateMutation, D.ApiKeyCreateMutationVariables>(D.ApiKeyCreateDocument, {
      input,
    }).then(response => {
      const data = response?.apiKeyCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class ApiKeyDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.ApiKeyDeleteMutation, D.ApiKeyDeleteMutationVariables>(D.ApiKeyDeleteDocument, { id }).then(
      response => {
        const data = response?.apiKeyDelete;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class EmailUserAccountAuthChallengeMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.EmailUserAccountAuthChallengeInput) {
    return this._request<D.EmailUserAccountAuthChallengeMutation, D.EmailUserAccountAuthChallengeMutationVariables>(
      D.EmailUserAccountAuthChallengeDocument,
      { input }
    ).then(response => {
      const data = response?.emailUserAccountAuthChallenge;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class EmailTokenUserAccountAuthMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.TokenUserAccountAuthInput) {
    return this._request<D.EmailTokenUserAccountAuthMutation, D.EmailTokenUserAccountAuthMutationVariables>(
      D.EmailTokenUserAccountAuthDocument,
      { input }
    ).then(response => {
      const data = response?.emailTokenUserAccountAuth;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class SamlTokenUserAccountAuthMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.TokenUserAccountAuthInput) {
    return this._request<D.SamlTokenUserAccountAuthMutation, D.SamlTokenUserAccountAuthMutationVariables>(
      D.SamlTokenUserAccountAuthDocument,
      { input }
    ).then(response => {
      const data = response?.samlTokenUserAccountAuth;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class GoogleUserAccountAuthMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.GoogleUserAccountAuthInput) {
    return this._request<D.GoogleUserAccountAuthMutation, D.GoogleUserAccountAuthMutationVariables>(
      D.GoogleUserAccountAuthDocument,
      { input }
    ).then(response => {
      const data = response?.googleUserAccountAuth;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class CreateOrganizationFromOnboardingMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(
    input: D.CreateOrganizationInput,
    vars?: Omit<D.CreateOrganizationFromOnboardingMutationVariables, "input">
  ) {
    return this._request<
      D.CreateOrganizationFromOnboardingMutation,
      D.CreateOrganizationFromOnboardingMutationVariables
    >(D.CreateOrganizationFromOnboardingDocument, { input, ...vars }).then(response => {
      const data = response?.createOrganizationFromOnboarding;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class JoinOrganizationFromOnboardingMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.JoinOrganizationInput) {
    return this._request<D.JoinOrganizationFromOnboardingMutation, D.JoinOrganizationFromOnboardingMutationVariables>(
      D.JoinOrganizationFromOnboardingDocument,
      { input }
    ).then(response => {
      const data = response?.joinOrganizationFromOnboarding;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class LeaveOrganizationMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(organizationId: string) {
    return this._request<D.LeaveOrganizationMutation, D.LeaveOrganizationMutationVariables>(
      D.LeaveOrganizationDocument,
      { organizationId }
    ).then(response => {
      const data = response?.leaveOrganization;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class BillingEmailUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.BillingEmailUpdateInput) {
    return this._request<D.BillingEmailUpdateMutation, D.BillingEmailUpdateMutationVariables>(
      D.BillingEmailUpdateDocument,
      { input }
    ).then(response => {
      const data = response?.billingEmailUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class CollaborativeDocumentUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.CollaborationDocumentUpdateInput) {
    return this._request<D.CollaborativeDocumentUpdateMutation, D.CollaborativeDocumentUpdateMutationVariables>(
      D.CollaborativeDocumentUpdateDocument,
      { input }
    ).then(response => {
      const data = response?.collaborativeDocumentUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class CommentCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.CommentCreateInput) {
    return this._request<D.CommentCreateMutation, D.CommentCreateMutationVariables>(D.CommentCreateDocument, {
      input,
    }).then(response => {
      const data = response?.commentCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class CommentUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.CommentUpdateInput, id: string) {
    return this._request<D.CommentUpdateMutation, D.CommentUpdateMutationVariables>(D.CommentUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.commentUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class CommentDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.CommentDeleteMutation, D.CommentDeleteMutationVariables>(D.CommentDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.commentDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class ContactCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.ContactCreateInput) {
    return this._request<D.ContactCreateMutation, D.ContactCreateMutationVariables>(D.ContactCreateDocument, {
      input,
    }).then(response => {
      const data = response?.contactCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class CustomViewCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.CustomViewCreateInput) {
    return this._request<D.CustomViewCreateMutation, D.CustomViewCreateMutationVariables>(D.CustomViewCreateDocument, {
      input,
    }).then(response => {
      const data = response?.customViewCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class CustomViewUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.CustomViewUpdateInput, id: string) {
    return this._request<D.CustomViewUpdateMutation, D.CustomViewUpdateMutationVariables>(D.CustomViewUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.customViewUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class CustomViewDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.CustomViewDeleteMutation, D.CustomViewDeleteMutationVariables>(D.CustomViewDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.customViewDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class CycleCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.CycleCreateInput) {
    return this._request<D.CycleCreateMutation, D.CycleCreateMutationVariables>(D.CycleCreateDocument, { input }).then(
      response => {
        const data = response?.cycleCreate;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class CycleUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.CycleUpdateInput, id: string) {
    return this._request<D.CycleUpdateMutation, D.CycleUpdateMutationVariables>(D.CycleUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.cycleUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class CycleArchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.CycleArchiveMutation, D.CycleArchiveMutationVariables>(D.CycleArchiveDocument, { id }).then(
      response => {
        const data = response?.cycleArchive;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class DebugFailWithInternalErrorMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.DebugFailWithInternalErrorMutation, D.DebugFailWithInternalErrorMutationVariables>(
      D.DebugFailWithInternalErrorDocument,
      {}
    ).then(response => {
      const data = response?.debugFailWithInternalError;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class DebugFailWithWarningMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.DebugFailWithWarningMutation, D.DebugFailWithWarningMutationVariables>(
      D.DebugFailWithWarningDocument,
      {}
    ).then(response => {
      const data = response?.debugFailWithWarning;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class DebugCreateSamlOrgMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.DebugCreateSamlOrgMutation, D.DebugCreateSamlOrgMutationVariables>(
      D.DebugCreateSamlOrgDocument,
      {}
    ).then(response => {
      const data = response?.debugCreateSAMLOrg;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class EmailUnsubscribeMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.EmailUnsubscribeInput) {
    return this._request<D.EmailUnsubscribeMutation, D.EmailUnsubscribeMutationVariables>(D.EmailUnsubscribeDocument, {
      input,
    }).then(response => {
      const data = response?.emailUnsubscribe;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class EmojiCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.EmojiCreateInput) {
    return this._request<D.EmojiCreateMutation, D.EmojiCreateMutationVariables>(D.EmojiCreateDocument, { input }).then(
      response => {
        const data = response?.emojiCreate;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class EmojiDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.EmojiDeleteMutation, D.EmojiDeleteMutationVariables>(D.EmojiDeleteDocument, { id }).then(
      response => {
        const data = response?.emojiDelete;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class FavoriteCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.FavoriteCreateInput) {
    return this._request<D.FavoriteCreateMutation, D.FavoriteCreateMutationVariables>(D.FavoriteCreateDocument, {
      input,
    }).then(response => {
      const data = response?.favoriteCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class FavoriteUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.FavoriteUpdateInput, id: string) {
    return this._request<D.FavoriteUpdateMutation, D.FavoriteUpdateMutationVariables>(D.FavoriteUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.favoriteUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class FavoriteDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.FavoriteDeleteMutation, D.FavoriteDeleteMutationVariables>(D.FavoriteDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.favoriteDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class FeedbackCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.FeedbackCreateInput) {
    return this._request<D.FeedbackCreateMutation, D.FeedbackCreateMutationVariables>(D.FeedbackCreateDocument, {
      input,
    }).then(response => {
      const data = response?.feedbackCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class FileUploadMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(
    size: number,
    contentType: string,
    filename: string,
    vars?: Omit<D.FileUploadMutationVariables, "size" | "contentType" | "filename">
  ) {
    return this._request<D.FileUploadMutation, D.FileUploadMutationVariables>(D.FileUploadDocument, {
      size,
      contentType,
      filename,
      ...vars,
    }).then(response => {
      const data = response?.fileUpload;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class ImageUploadFromUrlMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(url: string) {
    return this._request<D.ImageUploadFromUrlMutation, D.ImageUploadFromUrlMutationVariables>(
      D.ImageUploadFromUrlDocument,
      { url }
    ).then(response => {
      const data = response?.imageUploadFromUrl;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationGithubConnectMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(installationId: string) {
    return this._request<D.IntegrationGithubConnectMutation, D.IntegrationGithubConnectMutationVariables>(
      D.IntegrationGithubConnectDocument,
      { installationId }
    ).then(response => {
      const data = response?.integrationGithubConnect;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationGitlabConnectMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(gitlabUrl: string, accessToken: string) {
    return this._request<D.IntegrationGitlabConnectMutation, D.IntegrationGitlabConnectMutationVariables>(
      D.IntegrationGitlabConnectDocument,
      { gitlabUrl, accessToken }
    ).then(response => {
      const data = response?.integrationGitlabConnect;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationSlackMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(
    redirectUri: string,
    code: string,
    vars?: Omit<D.IntegrationSlackMutationVariables, "redirectUri" | "code">
  ) {
    return this._request<D.IntegrationSlackMutation, D.IntegrationSlackMutationVariables>(D.IntegrationSlackDocument, {
      redirectUri,
      code,
      ...vars,
    }).then(response => {
      const data = response?.integrationSlack;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationSlackPersonalMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(redirectUri: string, code: string) {
    return this._request<D.IntegrationSlackPersonalMutation, D.IntegrationSlackPersonalMutationVariables>(
      D.IntegrationSlackPersonalDocument,
      { redirectUri, code }
    ).then(response => {
      const data = response?.integrationSlackPersonal;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationSlackPostMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(
    redirectUri: string,
    teamId: string,
    code: string,
    vars?: Omit<D.IntegrationSlackPostMutationVariables, "redirectUri" | "teamId" | "code">
  ) {
    return this._request<D.IntegrationSlackPostMutation, D.IntegrationSlackPostMutationVariables>(
      D.IntegrationSlackPostDocument,
      { redirectUri, teamId, code, ...vars }
    ).then(response => {
      const data = response?.integrationSlackPost;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationSlackProjectPostMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(redirectUri: string, projectId: string, code: string) {
    return this._request<D.IntegrationSlackProjectPostMutation, D.IntegrationSlackProjectPostMutationVariables>(
      D.IntegrationSlackProjectPostDocument,
      { redirectUri, projectId, code }
    ).then(response => {
      const data = response?.integrationSlackProjectPost;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationSlackImportEmojisMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(redirectUri: string, code: string) {
    return this._request<D.IntegrationSlackImportEmojisMutation, D.IntegrationSlackImportEmojisMutationVariables>(
      D.IntegrationSlackImportEmojisDocument,
      { redirectUri, code }
    ).then(response => {
      const data = response?.integrationSlackImportEmojis;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationFigmaMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(redirectUri: string, code: string) {
    return this._request<D.IntegrationFigmaMutation, D.IntegrationFigmaMutationVariables>(D.IntegrationFigmaDocument, {
      redirectUri,
      code,
    }).then(response => {
      const data = response?.integrationFigma;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationGoogleSheetsMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(code: string) {
    return this._request<D.IntegrationGoogleSheetsMutation, D.IntegrationGoogleSheetsMutationVariables>(
      D.IntegrationGoogleSheetsDocument,
      { code }
    ).then(response => {
      const data = response?.integrationGoogleSheets;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class RefreshGoogleSheetsDataMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.RefreshGoogleSheetsDataMutation, D.RefreshGoogleSheetsDataMutationVariables>(
      D.RefreshGoogleSheetsDataDocument,
      { id }
    ).then(response => {
      const data = response?.refreshGoogleSheetsData;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationSentryConnectMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(organizationSlug: string, code: string, installationId: string) {
    return this._request<D.IntegrationSentryConnectMutation, D.IntegrationSentryConnectMutationVariables>(
      D.IntegrationSentryConnectDocument,
      { organizationSlug, code, installationId }
    ).then(response => {
      const data = response?.integrationSentryConnect;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.IntegrationDeleteMutation, D.IntegrationDeleteMutationVariables>(
      D.IntegrationDeleteDocument,
      { id }
    ).then(response => {
      const data = response?.integrationDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationResourceArchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.IntegrationResourceArchiveMutation, D.IntegrationResourceArchiveMutationVariables>(
      D.IntegrationResourceArchiveDocument,
      { id }
    ).then(response => {
      const data = response?.integrationResourceArchive;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IssueLabelCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.IssueLabelCreateInput) {
    return this._request<D.IssueLabelCreateMutation, D.IssueLabelCreateMutationVariables>(D.IssueLabelCreateDocument, {
      input,
    }).then(response => {
      const data = response?.issueLabelCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IssueLabelUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.IssueLabelUpdateInput, id: string) {
    return this._request<D.IssueLabelUpdateMutation, D.IssueLabelUpdateMutationVariables>(D.IssueLabelUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.issueLabelUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IssueLabelArchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.IssueLabelArchiveMutation, D.IssueLabelArchiveMutationVariables>(
      D.IssueLabelArchiveDocument,
      { id }
    ).then(response => {
      const data = response?.issueLabelArchive;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IssueRelationCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.IssueRelationCreateInput) {
    return this._request<D.IssueRelationCreateMutation, D.IssueRelationCreateMutationVariables>(
      D.IssueRelationCreateDocument,
      { input }
    ).then(response => {
      const data = response?.issueRelationCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IssueRelationUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.IssueRelationUpdateInput, id: string) {
    return this._request<D.IssueRelationUpdateMutation, D.IssueRelationUpdateMutationVariables>(
      D.IssueRelationUpdateDocument,
      { input, id }
    ).then(response => {
      const data = response?.issueRelationUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IssueRelationDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.IssueRelationDeleteMutation, D.IssueRelationDeleteMutationVariables>(
      D.IssueRelationDeleteDocument,
      { id }
    ).then(response => {
      const data = response?.issueRelationDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IssueCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.IssueCreateInput) {
    return this._request<D.IssueCreateMutation, D.IssueCreateMutationVariables>(D.IssueCreateDocument, { input }).then(
      response => {
        const data = response?.issueCreate;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class IssueUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.IssueUpdateInput, id: string) {
    return this._request<D.IssueUpdateMutation, D.IssueUpdateMutationVariables>(D.IssueUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.issueUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IssueArchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.IssueArchiveMutation, D.IssueArchiveMutationVariables>(D.IssueArchiveDocument, { id }).then(
      response => {
        const data = response?.issueArchive;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class IssueUnarchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.IssueUnarchiveMutation, D.IssueUnarchiveMutationVariables>(D.IssueUnarchiveDocument, {
      id,
    }).then(response => {
      const data = response?.issueUnarchive;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class MilestoneCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.MilestoneCreateInput) {
    return this._request<D.MilestoneCreateMutation, D.MilestoneCreateMutationVariables>(D.MilestoneCreateDocument, {
      input,
    }).then(response => {
      const data = response?.milestoneCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class MilestoneUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.MilestoneUpdateInput, id: string) {
    return this._request<D.MilestoneUpdateMutation, D.MilestoneUpdateMutationVariables>(D.MilestoneUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.milestoneUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class MilestoneDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.MilestoneDeleteMutation, D.MilestoneDeleteMutationVariables>(D.MilestoneDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.milestoneDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class NotificationCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.NotificationUpdateInput, id: string) {
    return this._request<D.NotificationCreateMutation, D.NotificationCreateMutationVariables>(
      D.NotificationCreateDocument,
      { input, id }
    ).then(response => {
      const data = response?.notificationCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class NotificationUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.NotificationUpdateInput, id: string) {
    return this._request<D.NotificationUpdateMutation, D.NotificationUpdateMutationVariables>(
      D.NotificationUpdateDocument,
      { input, id }
    ).then(response => {
      const data = response?.notificationUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class NotificationDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.NotificationDeleteMutation, D.NotificationDeleteMutationVariables>(
      D.NotificationDeleteDocument,
      { id }
    ).then(response => {
      const data = response?.notificationDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class NotificationArchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.NotificationArchiveMutation, D.NotificationArchiveMutationVariables>(
      D.NotificationArchiveDocument,
      { id }
    ).then(response => {
      const data = response?.notificationArchive;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class NotificationUnarchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.NotificationUnarchiveMutation, D.NotificationUnarchiveMutationVariables>(
      D.NotificationUnarchiveDocument,
      { id }
    ).then(response => {
      const data = response?.notificationUnarchive;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class NotificationSubscriptionCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.NotificationSubscriptionCreateInput) {
    return this._request<D.NotificationSubscriptionCreateMutation, D.NotificationSubscriptionCreateMutationVariables>(
      D.NotificationSubscriptionCreateDocument,
      { input }
    ).then(response => {
      const data = response?.notificationSubscriptionCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class NotificationSubscriptionDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.NotificationSubscriptionDeleteMutation, D.NotificationSubscriptionDeleteMutationVariables>(
      D.NotificationSubscriptionDeleteDocument,
      { id }
    ).then(response => {
      const data = response?.notificationSubscriptionDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OauthClientCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.OauthClientCreateInput) {
    return this._request<D.OauthClientCreateMutation, D.OauthClientCreateMutationVariables>(
      D.OauthClientCreateDocument,
      { input }
    ).then(response => {
      const data = response?.oauthClientCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OauthClientUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.OauthClientUpdateInput, id: string) {
    return this._request<D.OauthClientUpdateMutation, D.OauthClientUpdateMutationVariables>(
      D.OauthClientUpdateDocument,
      { input, id }
    ).then(response => {
      const data = response?.oauthClientUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OauthClientArchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.OauthClientArchiveMutation, D.OauthClientArchiveMutationVariables>(
      D.OauthClientArchiveDocument,
      { id }
    ).then(response => {
      const data = response?.oauthClientArchive;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OauthClientRotateSecretMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.OauthClientRotateSecretMutation, D.OauthClientRotateSecretMutationVariables>(
      D.OauthClientRotateSecretDocument,
      { id }
    ).then(response => {
      const data = response?.oauthClientRotateSecret;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OauthTokenRevokeMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(scope: string[], appId: string) {
    return this._request<D.OauthTokenRevokeMutation, D.OauthTokenRevokeMutationVariables>(D.OauthTokenRevokeDocument, {
      scope,
      appId,
    }).then(response => {
      const data = response?.oauthTokenRevoke;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OrganizationDomainVerifyMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.OrganizationDomainVerificationInput) {
    return this._request<D.OrganizationDomainVerifyMutation, D.OrganizationDomainVerifyMutationVariables>(
      D.OrganizationDomainVerifyDocument,
      { input }
    ).then(response => {
      const data = response?.organizationDomainVerify;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OrganizationDomainCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.OrganizationDomainCreateInput) {
    return this._request<D.OrganizationDomainCreateMutation, D.OrganizationDomainCreateMutationVariables>(
      D.OrganizationDomainCreateDocument,
      { input }
    ).then(response => {
      const data = response?.organizationDomainCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OrganizationDomainDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.OrganizationDomainDeleteMutation, D.OrganizationDomainDeleteMutationVariables>(
      D.OrganizationDomainDeleteDocument,
      { id }
    ).then(response => {
      const data = response?.organizationDomainDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OrganizationInviteCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.OrganizationInviteCreateInput) {
    return this._request<D.OrganizationInviteCreateMutation, D.OrganizationInviteCreateMutationVariables>(
      D.OrganizationInviteCreateDocument,
      { input }
    ).then(response => {
      const data = response?.organizationInviteCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class ResentOrganizationInviteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.ResentOrganizationInviteMutation, D.ResentOrganizationInviteMutationVariables>(
      D.ResentOrganizationInviteDocument,
      { id }
    ).then(response => {
      const data = response?.resentOrganizationInvite;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OrganizationInviteDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.OrganizationInviteDeleteMutation, D.OrganizationInviteDeleteMutationVariables>(
      D.OrganizationInviteDeleteDocument,
      { id }
    ).then(response => {
      const data = response?.organizationInviteDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class ProjectLinkCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.ProjectLinkCreateInput) {
    return this._request<D.ProjectLinkCreateMutation, D.ProjectLinkCreateMutationVariables>(
      D.ProjectLinkCreateDocument,
      { input }
    ).then(response => {
      const data = response?.projectLinkCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class ProjectLinkDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.ProjectLinkDeleteMutation, D.ProjectLinkDeleteMutationVariables>(
      D.ProjectLinkDeleteDocument,
      { id }
    ).then(response => {
      const data = response?.projectLinkDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class ProjectCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.ProjectCreateInput) {
    return this._request<D.ProjectCreateMutation, D.ProjectCreateMutationVariables>(D.ProjectCreateDocument, {
      input,
    }).then(response => {
      const data = response?.projectCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class ProjectUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.ProjectUpdateInput, id: string) {
    return this._request<D.ProjectUpdateMutation, D.ProjectUpdateMutationVariables>(D.ProjectUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.projectUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class ProjectArchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.ProjectArchiveMutation, D.ProjectArchiveMutationVariables>(D.ProjectArchiveDocument, {
      id,
    }).then(response => {
      const data = response?.projectArchive;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class PushSubscriptionCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.PushSubscriptionCreateInput) {
    return this._request<D.PushSubscriptionCreateMutation, D.PushSubscriptionCreateMutationVariables>(
      D.PushSubscriptionCreateDocument,
      { input }
    ).then(response => {
      const data = response?.pushSubscriptionCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class PushSubscriptionDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.PushSubscriptionDeleteMutation, D.PushSubscriptionDeleteMutationVariables>(
      D.PushSubscriptionDeleteDocument,
      { id }
    ).then(response => {
      const data = response?.pushSubscriptionDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class ReactionCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.ReactionCreateInput) {
    return this._request<D.ReactionCreateMutation, D.ReactionCreateMutationVariables>(D.ReactionCreateDocument, {
      input,
    }).then(response => {
      const data = response?.reactionCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class ReactionDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.ReactionDeleteMutation, D.ReactionDeleteMutationVariables>(D.ReactionDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.reactionDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class CreateCsvExportReportMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.CreateCsvExportReportMutation, D.CreateCsvExportReportMutationVariables>(
      D.CreateCsvExportReportDocument,
      {}
    ).then(response => {
      const data = response?.createCsvExportReport;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class SubscriptionSessionCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(plan: string) {
    return this._request<D.SubscriptionSessionCreateMutation, D.SubscriptionSessionCreateMutationVariables>(
      D.SubscriptionSessionCreateDocument,
      { plan }
    ).then(response => {
      const data = response?.subscriptionSessionCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class SubscriptionUpdateSessionCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.SubscriptionUpdateSessionCreateMutation, D.SubscriptionUpdateSessionCreateMutationVariables>(
      D.SubscriptionUpdateSessionCreateDocument,
      {}
    ).then(response => {
      const data = response?.subscriptionUpdateSessionCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class SubscriptionUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.SubscriptionUpdateInput, id: string) {
    return this._request<D.SubscriptionUpdateMutation, D.SubscriptionUpdateMutationVariables>(
      D.SubscriptionUpdateDocument,
      { input, id }
    ).then(response => {
      const data = response?.subscriptionUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class SubscriptionUpgradeMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(type: string, id: string) {
    return this._request<D.SubscriptionUpgradeMutation, D.SubscriptionUpgradeMutationVariables>(
      D.SubscriptionUpgradeDocument,
      { type, id }
    ).then(response => {
      const data = response?.subscriptionUpgrade;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class SubscriptionArchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.SubscriptionArchiveMutation, D.SubscriptionArchiveMutationVariables>(
      D.SubscriptionArchiveDocument,
      { id }
    ).then(response => {
      const data = response?.subscriptionArchive;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class TeamMembershipCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.TeamMembershipCreateInput) {
    return this._request<D.TeamMembershipCreateMutation, D.TeamMembershipCreateMutationVariables>(
      D.TeamMembershipCreateDocument,
      { input }
    ).then(response => {
      const data = response?.teamMembershipCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class TeamMembershipDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.TeamMembershipDeleteMutation, D.TeamMembershipDeleteMutationVariables>(
      D.TeamMembershipDeleteDocument,
      { id }
    ).then(response => {
      const data = response?.teamMembershipDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class TeamCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.TeamCreateInput, vars?: Omit<D.TeamCreateMutationVariables, "input">) {
    return this._request<D.TeamCreateMutation, D.TeamCreateMutationVariables>(D.TeamCreateDocument, {
      input,
      ...vars,
    }).then(response => {
      const data = response?.teamCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class TeamUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.TeamUpdateInput, id: string) {
    return this._request<D.TeamUpdateMutation, D.TeamUpdateMutationVariables>(D.TeamUpdateDocument, { input, id }).then(
      response => {
        const data = response?.teamUpdate;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class TeamArchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.TeamArchiveMutation, D.TeamArchiveMutationVariables>(D.TeamArchiveDocument, { id }).then(
      response => {
        const data = response?.teamArchive;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class TeamDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.TeamDeleteMutation, D.TeamDeleteMutationVariables>(D.TeamDeleteDocument, { id }).then(
      response => {
        const data = response?.teamDelete;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class TemplateCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.TemplateCreateInput) {
    return this._request<D.TemplateCreateMutation, D.TemplateCreateMutationVariables>(D.TemplateCreateDocument, {
      input,
    }).then(response => {
      const data = response?.templateCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class TemplateUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.TemplateUpdateInput, id: string) {
    return this._request<D.TemplateUpdateMutation, D.TemplateUpdateMutationVariables>(D.TemplateUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.templateUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class TemplateDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.TemplateDeleteMutation, D.TemplateDeleteMutationVariables>(D.TemplateDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.templateDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class UserSettingsUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.UserSettingsUpdateInput, id: string) {
    return this._request<D.UserSettingsUpdateMutation, D.UserSettingsUpdateMutationVariables>(
      D.UserSettingsUpdateDocument,
      { input, id }
    ).then(response => {
      const data = response?.userSettingsUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class UserSettingsFlagIncrementMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(flag: string) {
    return this._request<D.UserSettingsFlagIncrementMutation, D.UserSettingsFlagIncrementMutationVariables>(
      D.UserSettingsFlagIncrementDocument,
      { flag }
    ).then(response => {
      const data = response?.userSettingsFlagIncrement;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class UserSettingsFlagsResetMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.UserSettingsFlagsResetMutation, D.UserSettingsFlagsResetMutationVariables>(
      D.UserSettingsFlagsResetDocument,
      {}
    ).then(response => {
      const data = response?.userSettingsFlagsReset;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class UserFlagUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(operation: D.UserFlagUpdateOperation, flag: D.UserFlagType) {
    return this._request<D.UserFlagUpdateMutation, D.UserFlagUpdateMutationVariables>(D.UserFlagUpdateDocument, {
      operation,
      flag,
    }).then(response => {
      const data = response?.userFlagUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class UserSubscribeToNewsletterMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.UserSubscribeToNewsletterMutation, D.UserSubscribeToNewsletterMutationVariables>(
      D.UserSubscribeToNewsletterDocument,
      {}
    ).then(response => {
      const data = response?.userSubscribeToNewsletter;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class ViewPreferencesCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.ViewPreferencesCreateInput) {
    return this._request<D.ViewPreferencesCreateMutation, D.ViewPreferencesCreateMutationVariables>(
      D.ViewPreferencesCreateDocument,
      { input }
    ).then(response => {
      const data = response?.viewPreferencesCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class ViewPreferencesUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.ViewPreferencesUpdateInput, id: string) {
    return this._request<D.ViewPreferencesUpdateMutation, D.ViewPreferencesUpdateMutationVariables>(
      D.ViewPreferencesUpdateDocument,
      { input, id }
    ).then(response => {
      const data = response?.viewPreferencesUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class ViewPreferencesDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.ViewPreferencesDeleteMutation, D.ViewPreferencesDeleteMutationVariables>(
      D.ViewPreferencesDeleteDocument,
      { id }
    ).then(response => {
      const data = response?.viewPreferencesDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class WebhookCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.WebhookCreateInput) {
    return this._request<D.WebhookCreateMutation, D.WebhookCreateMutationVariables>(D.WebhookCreateDocument, {
      input,
    }).then(response => {
      const data = response?.webhookCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class WebhookUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.WebhookUpdateInput, id: string) {
    return this._request<D.WebhookUpdateMutation, D.WebhookUpdateMutationVariables>(D.WebhookUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.webhookUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class WebhookDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.WebhookDeleteMutation, D.WebhookDeleteMutationVariables>(D.WebhookDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.webhookDelete;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class WorkflowStateCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.WorkflowStateCreateInput) {
    return this._request<D.WorkflowStateCreateMutation, D.WorkflowStateCreateMutationVariables>(
      D.WorkflowStateCreateDocument,
      { input }
    ).then(response => {
      const data = response?.workflowStateCreate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class WorkflowStateUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.WorkflowStateUpdateInput, id: string) {
    return this._request<D.WorkflowStateUpdateMutation, D.WorkflowStateUpdateMutationVariables>(
      D.WorkflowStateUpdateDocument,
      { input, id }
    ).then(response => {
      const data = response?.workflowStateUpdate;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class WorkflowStateArchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.WorkflowStateArchiveMutation, D.WorkflowStateArchiveMutationVariables>(
      D.WorkflowStateArchiveDocument,
      { id }
    ).then(response => {
      const data = response?.workflowStateArchive;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class User_AssignedIssuesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.User_AssignedIssuesQueryVariables, "id">) {
    return this._request<D.User_AssignedIssuesQuery, D.User_AssignedIssuesQueryVariables>(
      D.User_AssignedIssuesDocument,
      { id, ...vars }
    ).then(response => {
      const data = response?.user?.assignedIssues;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class User_CreatedIssuesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.User_CreatedIssuesQueryVariables, "id">) {
    return this._request<D.User_CreatedIssuesQuery, D.User_CreatedIssuesQueryVariables>(D.User_CreatedIssuesDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.user?.createdIssues;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class User_TeamMembershipsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.User_TeamMembershipsQueryVariables, "id">) {
    return this._request<D.User_TeamMembershipsQuery, D.User_TeamMembershipsQueryVariables>(
      D.User_TeamMembershipsDocument,
      { id, ...vars }
    ).then(response => {
      const data = response?.user?.teamMemberships;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Viewer_AssignedIssuesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.Viewer_AssignedIssuesQueryVariables) {
    return this._request<D.Viewer_AssignedIssuesQuery, D.Viewer_AssignedIssuesQueryVariables>(
      D.Viewer_AssignedIssuesDocument,
      vars
    ).then(response => {
      const data = response?.viewer?.assignedIssues;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Viewer_CreatedIssuesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.Viewer_CreatedIssuesQueryVariables) {
    return this._request<D.Viewer_CreatedIssuesQuery, D.Viewer_CreatedIssuesQueryVariables>(
      D.Viewer_CreatedIssuesDocument,
      vars
    ).then(response => {
      const data = response?.viewer?.createdIssues;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Viewer_TeamMembershipsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.Viewer_TeamMembershipsQueryVariables) {
    return this._request<D.Viewer_TeamMembershipsQuery, D.Viewer_TeamMembershipsQueryVariables>(
      D.Viewer_TeamMembershipsDocument,
      vars
    ).then(response => {
      const data = response?.viewer?.teamMemberships;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Organization_UsersQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.Organization_UsersQueryVariables) {
    return this._request<D.Organization_UsersQuery, D.Organization_UsersQueryVariables>(
      D.Organization_UsersDocument,
      vars
    ).then(response => {
      const data = response?.organization?.users;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Organization_TeamsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.Organization_TeamsQueryVariables) {
    return this._request<D.Organization_TeamsQuery, D.Organization_TeamsQueryVariables>(
      D.Organization_TeamsDocument,
      vars
    ).then(response => {
      const data = response?.organization?.teams;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Organization_MilestonesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.Organization_MilestonesQueryVariables) {
    return this._request<D.Organization_MilestonesQuery, D.Organization_MilestonesQueryVariables>(
      D.Organization_MilestonesDocument,
      vars
    ).then(response => {
      const data = response?.organization?.milestones;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Organization_IntegrationsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.Organization_IntegrationsQueryVariables) {
    return this._request<D.Organization_IntegrationsQuery, D.Organization_IntegrationsQueryVariables>(
      D.Organization_IntegrationsDocument,
      vars
    ).then(response => {
      const data = response?.organization?.integrations;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminUserAccountLookup_UsersQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.AdminUserAccountLookup_UsersQueryVariables) {
    return this._request<D.AdminUserAccountLookup_UsersQuery, D.AdminUserAccountLookup_UsersQueryVariables>(
      D.AdminUserAccountLookup_UsersDocument,
      vars
    ).then(response => {
      const data = response?.adminUserAccountLookup?.users;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminUserAccountLookup_Users_AssignedIssuesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.AdminUserAccountLookup_Users_AssignedIssuesQueryVariables) {
    return this._request<
      D.AdminUserAccountLookup_Users_AssignedIssuesQuery,
      D.AdminUserAccountLookup_Users_AssignedIssuesQueryVariables
    >(D.AdminUserAccountLookup_Users_AssignedIssuesDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.assignedIssues;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminUserAccountLookup_Users_CreatedIssuesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.AdminUserAccountLookup_Users_CreatedIssuesQueryVariables) {
    return this._request<
      D.AdminUserAccountLookup_Users_CreatedIssuesQuery,
      D.AdminUserAccountLookup_Users_CreatedIssuesQueryVariables
    >(D.AdminUserAccountLookup_Users_CreatedIssuesDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.createdIssues;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminUserAccountLookup_Users_OrganizationQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.AdminUserAccountLookup_Users_OrganizationQueryVariables) {
    return this._request<
      D.AdminUserAccountLookup_Users_OrganizationQuery,
      D.AdminUserAccountLookup_Users_OrganizationQueryVariables
    >(D.AdminUserAccountLookup_Users_OrganizationDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.organization;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminUserAccountLookup_Users_TeamMembershipsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.AdminUserAccountLookup_Users_TeamMembershipsQueryVariables) {
    return this._request<
      D.AdminUserAccountLookup_Users_TeamMembershipsQuery,
      D.AdminUserAccountLookup_Users_TeamMembershipsQueryVariables
    >(D.AdminUserAccountLookup_Users_TeamMembershipsDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.teamMemberships;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminUserAccountLookup_Users_Organization_UsersQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.AdminUserAccountLookup_Users_Organization_UsersQueryVariables) {
    return this._request<
      D.AdminUserAccountLookup_Users_Organization_UsersQuery,
      D.AdminUserAccountLookup_Users_Organization_UsersQueryVariables
    >(D.AdminUserAccountLookup_Users_Organization_UsersDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.organization?.users;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminUserAccountLookup_Users_Organization_TeamsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.AdminUserAccountLookup_Users_Organization_TeamsQueryVariables) {
    return this._request<
      D.AdminUserAccountLookup_Users_Organization_TeamsQuery,
      D.AdminUserAccountLookup_Users_Organization_TeamsQueryVariables
    >(D.AdminUserAccountLookup_Users_Organization_TeamsDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.organization?.teams;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminUserAccountLookup_Users_Organization_MilestonesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.AdminUserAccountLookup_Users_Organization_MilestonesQueryVariables) {
    return this._request<
      D.AdminUserAccountLookup_Users_Organization_MilestonesQuery,
      D.AdminUserAccountLookup_Users_Organization_MilestonesQueryVariables
    >(D.AdminUserAccountLookup_Users_Organization_MilestonesDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.organization?.milestones;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminUserAccountLookup_Users_Organization_IntegrationsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.AdminUserAccountLookup_Users_Organization_IntegrationsQueryVariables) {
    return this._request<
      D.AdminUserAccountLookup_Users_Organization_IntegrationsQuery,
      D.AdminUserAccountLookup_Users_Organization_IntegrationsQueryVariables
    >(D.AdminUserAccountLookup_Users_Organization_IntegrationsDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.organization?.integrations;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class AdminUserAccountLookup_Users_Organization_SubscriptionQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: D.AdminUserAccountLookup_Users_Organization_SubscriptionQueryVariables) {
    return this._request<
      D.AdminUserAccountLookup_Users_Organization_SubscriptionQuery,
      D.AdminUserAccountLookup_Users_Organization_SubscriptionQueryVariables
    >(D.AdminUserAccountLookup_Users_Organization_SubscriptionDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.organization?.subscription;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class BillingDetails_InvoicesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.BillingDetails_InvoicesQuery, D.BillingDetails_InvoicesQueryVariables>(
      D.BillingDetails_InvoicesDocument,
      {}
    ).then(response => {
      const data = response?.billingDetails?.invoices;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class BillingDetails_PaymentMethodQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.BillingDetails_PaymentMethodQuery, D.BillingDetails_PaymentMethodQueryVariables>(
      D.BillingDetails_PaymentMethodDocument,
      {}
    ).then(response => {
      const data = response?.billingDetails?.paymentMethod;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class CollaborativeDocumentJoin_StepsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.CollaborativeDocumentJoin_StepsQuery, D.CollaborativeDocumentJoin_StepsQueryVariables>(
      D.CollaborativeDocumentJoin_StepsDocument,
      { clientId, issueId, version }
    ).then(response => {
      const data = response?.collaborativeDocumentJoin?.steps;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Cycle_IssuesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Cycle_IssuesQueryVariables, "id">) {
    return this._request<D.Cycle_IssuesQuery, D.Cycle_IssuesQueryVariables>(D.Cycle_IssuesDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.cycle?.issues;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Cycle_UncompletedIssuesUponCloseQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Cycle_UncompletedIssuesUponCloseQueryVariables, "id">) {
    return this._request<D.Cycle_UncompletedIssuesUponCloseQuery, D.Cycle_UncompletedIssuesUponCloseQueryVariables>(
      D.Cycle_UncompletedIssuesUponCloseDocument,
      { id, ...vars }
    ).then(response => {
      const data = response?.cycle?.uncompletedIssuesUponClose;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class FigmaEmbedInfo_FigmaEmbedQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.FigmaEmbedInfo_FigmaEmbedQueryVariables, "fileId">) {
    return this._request<D.FigmaEmbedInfo_FigmaEmbedQuery, D.FigmaEmbedInfo_FigmaEmbedQueryVariables>(
      D.FigmaEmbedInfo_FigmaEmbedDocument,
      { fileId, ...vars }
    ).then(response => {
      const data = response?.figmaEmbedInfo?.figmaEmbed;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Integration_SettingsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.Integration_SettingsQuery, D.Integration_SettingsQueryVariables>(
      D.Integration_SettingsDocument,
      { id }
    ).then(response => {
      const data = response?.integration?.settings;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Integration_Settings_SlackPostQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.Integration_Settings_SlackPostQuery, D.Integration_Settings_SlackPostQueryVariables>(
      D.Integration_Settings_SlackPostDocument,
      { id }
    ).then(response => {
      const data = response?.integration?.settings?.slackPost;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Integration_Settings_SlackProjectPostQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<
      D.Integration_Settings_SlackProjectPostQuery,
      D.Integration_Settings_SlackProjectPostQueryVariables
    >(D.Integration_Settings_SlackProjectPostDocument, { id }).then(response => {
      const data = response?.integration?.settings?.slackProjectPost;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Integration_Settings_GoogleSheetsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.Integration_Settings_GoogleSheetsQuery, D.Integration_Settings_GoogleSheetsQueryVariables>(
      D.Integration_Settings_GoogleSheetsDocument,
      { id }
    ).then(response => {
      const data = response?.integration?.settings?.googleSheets;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Integration_Settings_SentryQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.Integration_Settings_SentryQuery, D.Integration_Settings_SentryQueryVariables>(
      D.Integration_Settings_SentryDocument,
      { id }
    ).then(response => {
      const data = response?.integration?.settings?.sentry;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationResource_DataQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.IntegrationResource_DataQuery, D.IntegrationResource_DataQueryVariables>(
      D.IntegrationResource_DataDocument,
      { id }
    ).then(response => {
      const data = response?.integrationResource?.data;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationResource_PullRequestQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<D.IntegrationResource_PullRequestQuery, D.IntegrationResource_PullRequestQueryVariables>(
      D.IntegrationResource_PullRequestDocument,
      { id }
    ).then(response => {
      const data = response?.integrationResource?.pullRequest;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationResource_Data_GithubPullRequestQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<
      D.IntegrationResource_Data_GithubPullRequestQuery,
      D.IntegrationResource_Data_GithubPullRequestQueryVariables
    >(D.IntegrationResource_Data_GithubPullRequestDocument, { id }).then(response => {
      const data = response?.integrationResource?.data?.githubPullRequest;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationResource_Data_GitlabMergeRequestQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<
      D.IntegrationResource_Data_GitlabMergeRequestQuery,
      D.IntegrationResource_Data_GitlabMergeRequestQueryVariables
    >(D.IntegrationResource_Data_GitlabMergeRequestDocument, { id }).then(response => {
      const data = response?.integrationResource?.data?.gitlabMergeRequest;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationResource_Data_GithubCommitQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<
      D.IntegrationResource_Data_GithubCommitQuery,
      D.IntegrationResource_Data_GithubCommitQueryVariables
    >(D.IntegrationResource_Data_GithubCommitDocument, { id }).then(response => {
      const data = response?.integrationResource?.data?.githubCommit;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IntegrationResource_Data_SentryIssueQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch() {
    return this._request<
      D.IntegrationResource_Data_SentryIssueQuery,
      D.IntegrationResource_Data_SentryIssueQueryVariables
    >(D.IntegrationResource_Data_SentryIssueDocument, { id }).then(response => {
      const data = response?.integrationResource?.data?.sentryIssue;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class InviteInfo_InviteDataQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.InviteInfo_InviteDataQueryVariables, "userHash">) {
    return this._request<D.InviteInfo_InviteDataQuery, D.InviteInfo_InviteDataQueryVariables>(
      D.InviteInfo_InviteDataDocument,
      { userHash, ...vars }
    ).then(response => {
      const data = response?.inviteInfo?.inviteData;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class IssueLabel_IssuesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.IssueLabel_IssuesQueryVariables, "id">) {
    return this._request<D.IssueLabel_IssuesQuery, D.IssueLabel_IssuesQueryVariables>(D.IssueLabel_IssuesDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.issueLabel?.issues;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Issue_SubscribersQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Issue_SubscribersQueryVariables, "id">) {
    return this._request<D.Issue_SubscribersQuery, D.Issue_SubscribersQueryVariables>(D.Issue_SubscribersDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.issue?.subscribers;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Issue_ChildrenQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Issue_ChildrenQueryVariables, "id">) {
    return this._request<D.Issue_ChildrenQuery, D.Issue_ChildrenQueryVariables>(D.Issue_ChildrenDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.issue?.children;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Issue_CommentsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Issue_CommentsQueryVariables, "id">) {
    return this._request<D.Issue_CommentsQuery, D.Issue_CommentsQueryVariables>(D.Issue_CommentsDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.issue?.comments;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Issue_HistoryQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Issue_HistoryQueryVariables, "id">) {
    return this._request<D.Issue_HistoryQuery, D.Issue_HistoryQueryVariables>(D.Issue_HistoryDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.issue?.history;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Issue_LabelsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Issue_LabelsQueryVariables, "id">) {
    return this._request<D.Issue_LabelsQuery, D.Issue_LabelsQueryVariables>(D.Issue_LabelsDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.issue?.labels;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Issue_IntegrationResourcesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Issue_IntegrationResourcesQueryVariables, "id">) {
    return this._request<D.Issue_IntegrationResourcesQuery, D.Issue_IntegrationResourcesQueryVariables>(
      D.Issue_IntegrationResourcesDocument,
      { id, ...vars }
    ).then(response => {
      const data = response?.issue?.integrationResources;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Issue_RelationsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Issue_RelationsQueryVariables, "id">) {
    return this._request<D.Issue_RelationsQuery, D.Issue_RelationsQueryVariables>(D.Issue_RelationsDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.issue?.relations;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Issue_InverseRelationsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Issue_InverseRelationsQueryVariables, "id">) {
    return this._request<D.Issue_InverseRelationsQuery, D.Issue_InverseRelationsQueryVariables>(
      D.Issue_InverseRelationsDocument,
      { id, ...vars }
    ).then(response => {
      const data = response?.issue?.inverseRelations;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Milestone_ProjectsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Milestone_ProjectsQueryVariables, "id">) {
    return this._request<D.Milestone_ProjectsQuery, D.Milestone_ProjectsQueryVariables>(D.Milestone_ProjectsDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.milestone?.projects;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class OrganizationInvite_IssuesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.OrganizationInvite_IssuesQueryVariables, "id">) {
    return this._request<D.OrganizationInvite_IssuesQuery, D.OrganizationInvite_IssuesQueryVariables>(
      D.OrganizationInvite_IssuesDocument,
      { id, ...vars }
    ).then(response => {
      const data = response?.organizationInvite?.issues;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Project_TeamsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Project_TeamsQueryVariables, "id">) {
    return this._request<D.Project_TeamsQuery, D.Project_TeamsQueryVariables>(D.Project_TeamsDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.project?.teams;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Project_MembersQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Project_MembersQueryVariables, "id">) {
    return this._request<D.Project_MembersQuery, D.Project_MembersQueryVariables>(D.Project_MembersDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.project?.members;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Project_IssuesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Project_IssuesQueryVariables, "id">) {
    return this._request<D.Project_IssuesQuery, D.Project_IssuesQueryVariables>(D.Project_IssuesDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.project?.issues;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Project_LinksQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Project_LinksQueryVariables, "id">) {
    return this._request<D.Project_LinksQuery, D.Project_LinksQueryVariables>(D.Project_LinksDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.project?.links;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Team_IssuesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Team_IssuesQueryVariables, "id">) {
    return this._request<D.Team_IssuesQuery, D.Team_IssuesQueryVariables>(D.Team_IssuesDocument, { id, ...vars }).then(
      response => {
        const data = response?.team?.issues;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class Team_CyclesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Team_CyclesQueryVariables, "id">) {
    return this._request<D.Team_CyclesQuery, D.Team_CyclesQueryVariables>(D.Team_CyclesDocument, { id, ...vars }).then(
      response => {
        const data = response?.team?.cycles;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class Team_MembershipsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Team_MembershipsQueryVariables, "id">) {
    return this._request<D.Team_MembershipsQuery, D.Team_MembershipsQueryVariables>(D.Team_MembershipsDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.team?.memberships;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Team_ProjectsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Team_ProjectsQueryVariables, "id">) {
    return this._request<D.Team_ProjectsQuery, D.Team_ProjectsQueryVariables>(D.Team_ProjectsDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.team?.projects;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Team_StatesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Team_StatesQueryVariables, "id">) {
    return this._request<D.Team_StatesQuery, D.Team_StatesQueryVariables>(D.Team_StatesDocument, { id, ...vars }).then(
      response => {
        const data = response?.team?.states;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class Team_TemplatesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Team_TemplatesQueryVariables, "id">) {
    return this._request<D.Team_TemplatesQuery, D.Team_TemplatesQueryVariables>(D.Team_TemplatesDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.team?.templates;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class Team_LabelsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Team_LabelsQueryVariables, "id">) {
    return this._request<D.Team_LabelsQuery, D.Team_LabelsQueryVariables>(D.Team_LabelsDocument, { id, ...vars }).then(
      response => {
        const data = response?.team?.labels;
        return data ? new (this._request, data)() : undefined;
      }
    );
  }
}

export class Team_WebhooksQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Team_WebhooksQueryVariables, "id">) {
    return this._request<D.Team_WebhooksQuery, D.Team_WebhooksQueryVariables>(D.Team_WebhooksDocument, {
      id,
      ...vars,
    }).then(response => {
      const data = response?.team?.webhooks;
      return data ? new (this._request, data)() : undefined;
    });
  }
}

export class WorkflowState_IssuesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.WorkflowState_IssuesQueryVariables, "id">) {
    return this._request<D.WorkflowState_IssuesQuery, D.WorkflowState_IssuesQueryVariables>(
      D.WorkflowState_IssuesDocument,
      { id, ...vars }
    ).then(response => {
      const data = response?.workflowState?.issues;
      return data ? new (this._request, data)() : undefined;
    });
  }
}
