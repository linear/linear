/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocumentNode } from "graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import * as D from "./documents";
export * from "./documents";

/** The function type for calling the graphql client */
export type LinearRequest = <R, V>(doc: DocumentNode, vars?: V) => Promise<R>;

/**
 * A user that has access to the the resources of an organization.
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserFragment response data
 */
export class User {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.UserFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.displayName = data.displayName ?? undefined;
    this.email = data.email ?? undefined;
    this.avatarUrl = data.avatarUrl ?? undefined;
    this.disableReason = data.disableReason ?? undefined;
    this.inviteHash = data.inviteHash ?? undefined;
    this.admin = data.admin ?? undefined;
    this.active = data.active ?? undefined;
    this.createdIssueCount = data.createdIssueCount ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
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
  /** Whether the user is an organization administrator. */
  public admin?: boolean;
  /** Whether the user account is active or disabled. */
  public active?: boolean;
  /** Number of issues created. */
  public createdIssueCount?: number;
  /** The settings of the user. */
  public get settings(): Promise<D.UserSettings | undefined> {
    return new NotificationQuery(this._request).fetch();
  }
  /** Organization in which the user belongs to. */
  public get organization(): Promise<D.Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

/**
 * The settings of a user as a JSON object.
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserSettingsFragment response data
 */
export class UserSettings {
  private _request: LinearRequest;
  private _user?: D.UserSettingsFragment["user"];

  public constructor(request: LinearRequest, data: D.UserSettingsFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.unsubscribedFrom = data.unsubscribedFrom ?? undefined;
    this._user = data.user ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The email types the user has unsubscribed from. */
  public unsubscribedFrom?: string[];
  /** The user to whom this notification was targeted for. */
  public get user(): Promise<D.User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
}

/**
 * IssueConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueConnectionFragment response data
 */
export class IssueConnection {
  public constructor(request: LinearRequest, data: D.IssueConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Issue(request, node)) : undefined;
  }

  public nodes?: Issue[];
  public pageInfo?: PageInfo;
}

/**
 * An issue.
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueFragment response data
 */
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
    this.number = data.number ?? undefined;
    this.title = data.title ?? undefined;
    this.description = data.description ?? undefined;
    this.priority = data.priority ?? undefined;
    this.estimate = data.estimate ?? undefined;
    this.boardOrder = data.boardOrder ?? undefined;
    this.subIssueSortOrder = data.subIssueSortOrder ?? undefined;
    this.identifier = data.identifier ?? undefined;
    this.priorityLabel = data.priorityLabel ?? undefined;
    this.url = data.url ?? undefined;
    this.branchName = data.branchName ?? undefined;
    this.previousIdentifiers = data.previousIdentifiers ?? undefined;
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
  /** The issue's unique number. */
  public number?: number;
  /** The issue's title. */
  public title?: string;
  /** The issue's description in markdown format. */
  public description?: string;
  /** The priority of the issue. */
  public priority?: number;
  /** The estimate of the complexity of the issue.. */
  public estimate?: number;
  /** The order of the item in its column on the board. */
  public boardOrder?: number;
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
  /** Previous identifiers of the issue if it has been moved between teams. */
  public previousIdentifiers?: string[];
  /** The team that the issue is associated with. */
  public get team(): Promise<D.Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The cycle that the issue is associated with. */
  public get cycle(): Promise<D.Cycle | undefined> | undefined {
    return this._cycle?.id ? new CycleQuery(this._request).fetch(this._cycle?.id) : undefined;
  }
  /** The workflow state that the issue is associated with. */
  public get state(): Promise<D.WorkflowState | undefined> | undefined {
    return this._state?.id ? new WorkflowStateQuery(this._request).fetch(this._state?.id) : undefined;
  }
  /** The user to whom the issue is assigned to. */
  public get assignee(): Promise<D.User | undefined> | undefined {
    return this._assignee?.id ? new UserQuery(this._request).fetch(this._assignee?.id) : undefined;
  }
  /** The parent of the issue. */
  public get parent(): Promise<D.Issue | undefined> | undefined {
    return this._parent?.id ? new IssueQuery(this._request).fetch(this._parent?.id) : undefined;
  }
  /** The project that the issue is associated with. */
  public get project(): Promise<D.Project | undefined> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
  /** The user who created the issue. */
  public get creator(): Promise<D.User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}

/**
 * An organizational unit that contains issues.
 *
 * @param request - function to call the graphql client
 * @param data - the initial TeamFragment response data
 */
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
  public get draftWorkflowState(): Promise<D.WorkflowState | undefined> | undefined {
    return this._draftWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._draftWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when a PR has been opened. */
  public get startWorkflowState(): Promise<D.WorkflowState | undefined> | undefined {
    return this._startWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._startWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when a review has been requested for the PR. */
  public get reviewWorkflowState(): Promise<D.WorkflowState | undefined> | undefined {
    return this._reviewWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._reviewWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when a PR has been merged. */
  public get mergeWorkflowState(): Promise<D.WorkflowState | undefined> | undefined {
    return this._mergeWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._mergeWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when they are marked as a duplicate of another issue. Defaults to the first canceled state. */
  public get markedAsDuplicateWorkflowState(): Promise<D.WorkflowState | undefined> | undefined {
    return this._markedAsDuplicateWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._markedAsDuplicateWorkflowState?.id)
      : undefined;
  }
  /** Team's currently active cycle. */
  public get activeCycle(): Promise<D.Cycle | undefined> | undefined {
    return this._activeCycle?.id ? new CycleQuery(this._request).fetch(this._activeCycle?.id) : undefined;
  }
  /** The organization that the team is associated with. */
  public get organization(): Promise<D.Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

/**
 * A state in a team workflow.
 *
 * @param request - function to call the graphql client
 * @param data - the initial WorkflowStateFragment response data
 */
export class WorkflowState {
  private _request: LinearRequest;
  private _team?: D.WorkflowStateFragment["team"];

  public constructor(request: LinearRequest, data: D.WorkflowStateFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.color = data.color ?? undefined;
    this.description = data.description ?? undefined;
    this.position = data.position ?? undefined;
    this.type = data.type ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
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
  public get team(): Promise<D.Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
}

/**
 * CycleConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CycleConnectionFragment response data
 */
export class CycleConnection {
  public constructor(request: LinearRequest, data: D.CycleConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Cycle(request, node)) : undefined;
  }

  public nodes?: Cycle[];
  public pageInfo?: PageInfo;
}

/**
 * A set of issues to be resolved in a specified amount of time.
 *
 * @param request - function to call the graphql client
 * @param data - the initial CycleFragment response data
 */
export class Cycle {
  private _request: LinearRequest;
  private _team?: D.CycleFragment["team"];

  public constructor(request: LinearRequest, data: D.CycleFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.number = data.number ?? undefined;
    this.name = data.name ?? undefined;
    this.issueCountHistory = data.issueCountHistory ?? undefined;
    this.completedIssueCountHistory = data.completedIssueCountHistory ?? undefined;
    this.scopeHistory = data.scopeHistory ?? undefined;
    this.completedScopeHistory = data.completedScopeHistory ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The number of the cycle. */
  public number?: number;
  /** The custom name of the cycle. */
  public name?: string;
  /** The total number of issues in the cycle after each day. */
  public issueCountHistory?: number[];
  /** The number of completed issues in the cycle after each day. */
  public completedIssueCountHistory?: number[];
  /** The total number of estimation points after each day. */
  public scopeHistory?: number[];
  /** The number of completed estimation points after each day. */
  public completedScopeHistory?: number[];
  /** The team that the cycle is associated with. */
  public get team(): Promise<D.Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
}

/**
 * PageInfo model
 *
 * @param request - function to call the graphql client
 * @param data - the initial PageInfoFragment response data
 */
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

/**
 * TeamMembershipConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial TeamMembershipConnectionFragment response data
 */
export class TeamMembershipConnection {
  public constructor(request: LinearRequest, data: D.TeamMembershipConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new TeamMembership(request, node)) : undefined;
  }

  public nodes?: TeamMembership[];
  public pageInfo?: PageInfo;
}

/**
 * Defines the membership of a user to a team.
 *
 * @param request - function to call the graphql client
 * @param data - the initial TeamMembershipFragment response data
 */
export class TeamMembership {
  private _request: LinearRequest;
  private _user?: D.TeamMembershipFragment["user"];
  private _team?: D.TeamMembershipFragment["team"];

  public constructor(request: LinearRequest, data: D.TeamMembershipFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this._user = data.user ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The user that the membership is associated with. */
  public get user(): Promise<D.User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
  /** The team that the membership is associated with. */
  public get team(): Promise<D.Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
}

/**
 * ProjectConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ProjectConnectionFragment response data
 */
export class ProjectConnection {
  public constructor(request: LinearRequest, data: D.ProjectConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Project(request, node)) : undefined;
  }

  public nodes?: Project[];
  public pageInfo?: PageInfo;
}

/**
 * A project.
 *
 * @param request - function to call the graphql client
 * @param data - the initial ProjectFragment response data
 */
export class Project {
  private _request: LinearRequest;
  private _creator?: D.ProjectFragment["creator"];
  private _lead?: D.ProjectFragment["lead"];
  private _milestone?: D.ProjectFragment["milestone"];

  public constructor(request: LinearRequest, data: D.ProjectFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.description = data.description ?? undefined;
    this.slugId = data.slugId ?? undefined;
    this.icon = data.icon ?? undefined;
    this.color = data.color ?? undefined;
    this.state = data.state ?? undefined;
    this.sortOrder = data.sortOrder ?? undefined;
    this.slackNewIssue = data.slackNewIssue ?? undefined;
    this.slackIssueComments = data.slackIssueComments ?? undefined;
    this.slackIssueStatuses = data.slackIssueStatuses ?? undefined;
    this.issueCountHistory = data.issueCountHistory ?? undefined;
    this.completedIssueCountHistory = data.completedIssueCountHistory ?? undefined;
    this.scopeHistory = data.scopeHistory ?? undefined;
    this.completedScopeHistory = data.completedScopeHistory ?? undefined;
    this._creator = data.creator ?? undefined;
    this._lead = data.lead ?? undefined;
    this._milestone = data.milestone ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
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
  /** The sort order for the project within its milestone. */
  public sortOrder?: number;
  /** Whether to send new issue notifications to Slack. */
  public slackNewIssue?: boolean;
  /** Whether to send new issue comment notifications to Slack. */
  public slackIssueComments?: boolean;
  /** Whether to send new issue status updates to Slack. */
  public slackIssueStatuses?: boolean;
  /** The total number of issues in the project after each week. */
  public issueCountHistory?: number[];
  /** The number of completed issues in the project after each week. */
  public completedIssueCountHistory?: number[];
  /** The total number of estimation points after each week. */
  public scopeHistory?: number[];
  /** The number of completed estimation points after each week. */
  public completedScopeHistory?: number[];
  /** The user who created the project. */
  public get creator(): Promise<D.User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The project lead. */
  public get lead(): Promise<D.User | undefined> | undefined {
    return this._lead?.id ? new UserQuery(this._request).fetch(this._lead?.id) : undefined;
  }
  /** The milestone that this project is associated with. */
  public get milestone(): Promise<D.Milestone | undefined> | undefined {
    return this._milestone?.id ? new MilestoneQuery(this._request).fetch(this._milestone?.id) : undefined;
  }
}

/**
 * A milestone that contains projects.
 *
 * @param request - function to call the graphql client
 * @param data - the initial MilestoneFragment response data
 */
export class Milestone {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.MilestoneFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.sortOrder = data.sortOrder ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The name of the milestone. */
  public name?: string;
  /** The sort order for the milestone. */
  public sortOrder?: number;
  /** The organization that the milestone belongs to. */
  public get organization(): Promise<D.Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

/**
 * An organization. Organizations are root-level objects that contain user accounts and teams.
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationFragment response data
 */
export class Organization {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.OrganizationFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
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
    this.userCount = data.userCount ?? undefined;
    this.createdIssueCount = data.createdIssueCount ?? undefined;
    this.allowedAuthServices = data.allowedAuthServices ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
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
  /** Number of active users in the organization. */
  public userCount?: number;
  /** Number of issues in the organization. */
  public createdIssueCount?: number;
  /** Allowed authentication providers, empty array means all are allowed */
  public allowedAuthServices?: string[];
  /** The organization's subscription to a paid plan. */
  public get subscription(): Promise<D.Subscription | undefined> {
    return new SubscriptionQuery(this._request).fetch();
  }
}

/**
 * UserConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserConnectionFragment response data
 */
export class UserConnection {
  public constructor(request: LinearRequest, data: D.UserConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new User(request, node)) : undefined;
  }

  public nodes?: User[];
  public pageInfo?: PageInfo;
}

/**
 * TeamConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial TeamConnectionFragment response data
 */
export class TeamConnection {
  public constructor(request: LinearRequest, data: D.TeamConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Team(request, node)) : undefined;
  }

  public nodes?: Team[];
  public pageInfo?: PageInfo;
}

/**
 * MilestoneConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial MilestoneConnectionFragment response data
 */
export class MilestoneConnection {
  public constructor(request: LinearRequest, data: D.MilestoneConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Milestone(request, node)) : undefined;
  }

  public nodes?: Milestone[];
  public pageInfo?: PageInfo;
}

/**
 * IntegrationConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IntegrationConnectionFragment response data
 */
export class IntegrationConnection {
  public constructor(request: LinearRequest, data: D.IntegrationConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Integration(request, node)) : undefined;
  }

  public nodes?: Integration[];
  public pageInfo?: PageInfo;
}

/**
 * An integration with an external service.
 *
 * @param request - function to call the graphql client
 * @param data - the initial IntegrationFragment response data
 */
export class Integration {
  private _request: LinearRequest;
  private _team?: D.IntegrationFragment["team"];
  private _creator?: D.IntegrationFragment["creator"];

  public constructor(request: LinearRequest, data: D.IntegrationFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.service = data.service ?? undefined;
    this.serviceId = data.serviceId ?? undefined;
    this.settings = data.settings ? new IntegrationSettings(request, data.settings) : undefined;
    this._team = data.team ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The integration's type. */
  public service?: string;
  /** The external service identifier. */
  public serviceId?: string;
  /** Settings related to the integration. */
  public settings?: IntegrationSettings;
  /** The organization that the integration is associated with. */
  public get organization(): Promise<D.Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** The team that the integration is associated with. */
  public get team(): Promise<D.Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The user that added the integration. */
  public get creator(): Promise<D.User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}

/**
 * The integration resource's settings
 *
 * @param request - function to call the graphql client
 * @param data - the initial IntegrationSettingsFragment response data
 */
export class IntegrationSettings {
  public constructor(request: LinearRequest, data: D.IntegrationSettingsFragment) {
    this.slackPost = data.slackPost ? new SlackPostSettings(request, data.slackPost) : undefined;
    this.slackProjectPost = data.slackProjectPost ? new SlackPostSettings(request, data.slackProjectPost) : undefined;
    this.googleSheets = data.googleSheets ? new GoogleSheetsSettings(request, data.googleSheets) : undefined;
    this.sentry = data.sentry ? new SentrySettings(request, data.sentry) : undefined;
  }

  public slackPost?: SlackPostSettings;
  public slackProjectPost?: SlackPostSettings;
  public googleSheets?: GoogleSheetsSettings;
  public sentry?: SentrySettings;
}

/**
 * Slack notification specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - the initial SlackPostSettingsFragment response data
 */
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

/**
 * Google Sheets specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - the initial GoogleSheetsSettingsFragment response data
 */
export class GoogleSheetsSettings {
  public constructor(request: LinearRequest, data: D.GoogleSheetsSettingsFragment) {
    this.spreadsheetId = data.spreadsheetId ?? undefined;
    this.spreadsheetUrl = data.spreadsheetUrl ?? undefined;
    this.sheetId = data.sheetId ?? undefined;
  }

  public spreadsheetId?: string;
  public spreadsheetUrl?: string;
  public sheetId?: number;
}

/**
 * Sentry specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - the initial SentrySettingsFragment response data
 */
export class SentrySettings {
  public constructor(request: LinearRequest, data: D.SentrySettingsFragment) {
    this.organizationSlug = data.organizationSlug ?? undefined;
  }

  /** The slug of the Sentry organization being connected. */
  public organizationSlug?: string;
}

/**
 * The subscription of an organization.
 *
 * @param request - function to call the graphql client
 * @param data - the initial SubscriptionFragment response data
 */
export class Subscription {
  private _request: LinearRequest;
  private _creator?: D.SubscriptionFragment["creator"];

  public constructor(request: LinearRequest, data: D.SubscriptionFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.type = data.type ?? undefined;
    this.seats = data.seats ?? undefined;
    this.pendingChangeType = data.pendingChangeType ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The subscription type. */
  public type?: string;
  /** The number of seats in the subscription. */
  public seats?: number;
  /** The subscription type of a pending change. Null if no change pending. */
  public pendingChangeType?: string;
  /** The creator of the subscription. */
  public get creator(): Promise<D.User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The organization that the subscription is associated with. */
  public get organization(): Promise<D.Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

/**
 * ProjectLinkConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ProjectLinkConnectionFragment response data
 */
export class ProjectLinkConnection {
  public constructor(request: LinearRequest, data: D.ProjectLinkConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new ProjectLink(request, node)) : undefined;
  }

  public nodes?: ProjectLink[];
  public pageInfo?: PageInfo;
}

/**
 * An external link for a project.
 *
 * @param request - function to call the graphql client
 * @param data - the initial ProjectLinkFragment response data
 */
export class ProjectLink {
  private _request: LinearRequest;
  private _creator?: D.ProjectLinkFragment["creator"];
  private _project?: D.ProjectLinkFragment["project"];

  public constructor(request: LinearRequest, data: D.ProjectLinkFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.url = data.url ?? undefined;
    this.label = data.label ?? undefined;
    this._creator = data.creator ?? undefined;
    this._project = data.project ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The link's URL. */
  public url?: string;
  /** The link's label. */
  public label?: string;
  /** The user who created the link. */
  public get creator(): Promise<D.User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The project that the link is associated with. */
  public get project(): Promise<D.Project | undefined> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
}

/**
 * WorkflowStateConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial WorkflowStateConnectionFragment response data
 */
export class WorkflowStateConnection {
  public constructor(request: LinearRequest, data: D.WorkflowStateConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new WorkflowState(request, node)) : undefined;
  }

  public nodes?: WorkflowState[];
  public pageInfo?: PageInfo;
}

/**
 * TemplateConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial TemplateConnectionFragment response data
 */
export class TemplateConnection {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.TemplateConnectionFragment) {
    this._request = request;
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
  }

  public pageInfo?: PageInfo;
  public get nodes(): Template[] | undefined {
    return this._nodes?.map(node => new Template(this._request, node));
  }
}

/**
 * A template object used for creating new issues faster.
 *
 * @param request - function to call the graphql client
 * @param data - the initial TemplateFragment response data
 */
export class Template {
  private _request: LinearRequest;
  private _team?: D.TemplateFragment["team"];
  private _creator?: D.TemplateFragment["creator"];

  public constructor(request: LinearRequest, data: D.TemplateFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.type = data.type ?? undefined;
    this.name = data.name ?? undefined;
    this.description = data.description ?? undefined;
    this._team = data.team ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The entity type this template is for. */
  public type?: string;
  /** The name of the template. */
  public name?: string;
  /** Template description. */
  public description?: string;
  /** The team that the template is associated with. */
  public get team(): Promise<D.Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The user who created the template. */
  public get creator(): Promise<D.User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}

/**
 * IssueLabelConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueLabelConnectionFragment response data
 */
export class IssueLabelConnection {
  public constructor(request: LinearRequest, data: D.IssueLabelConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new IssueLabel(request, node)) : undefined;
  }

  public nodes?: IssueLabel[];
  public pageInfo?: PageInfo;
}

/**
 * Labels that can be associated with issues.
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueLabelFragment response data
 */
export class IssueLabel {
  private _request: LinearRequest;
  private _team?: D.IssueLabelFragment["team"];
  private _creator?: D.IssueLabelFragment["creator"];

  public constructor(request: LinearRequest, data: D.IssueLabelFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.description = data.description ?? undefined;
    this.color = data.color ?? undefined;
    this._team = data.team ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The label's name. */
  public name?: string;
  /** The label's description. */
  public description?: string;
  /** The label's color as a HEX string. */
  public color?: string;
  /** The team to which the label belongs to. */
  public get team(): Promise<D.Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The user who created the label. */
  public get creator(): Promise<D.User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}

/**
 * WebhookConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial WebhookConnectionFragment response data
 */
export class WebhookConnection {
  public constructor(request: LinearRequest, data: D.WebhookConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Webhook(request, node)) : undefined;
  }

  public nodes?: Webhook[];
  public pageInfo?: PageInfo;
}

/**
 * A webhook used to send HTTP notifications over data updates
 *
 * @param request - function to call the graphql client
 * @param data - the initial WebhookFragment response data
 */
export class Webhook {
  private _request: LinearRequest;
  private _team?: D.WebhookFragment["team"];
  private _creator?: D.WebhookFragment["creator"];

  public constructor(request: LinearRequest, data: D.WebhookFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.url = data.url ?? undefined;
    this.enabled = data.enabled ?? undefined;
    this.secret = data.secret ?? undefined;
    this._team = data.team ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** Webhook URL */
  public url?: string;
  /** Whether the Webhook is enabled. */
  public enabled?: boolean;
  /** Secret token for verifying the origin on the recipient side. */
  public secret?: string;
  /** The team that the webhook is associated with. */
  public get team(): Promise<D.Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The user who created the webhook. */
  public get creator(): Promise<D.User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}

/**
 * CommentConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CommentConnectionFragment response data
 */
export class CommentConnection {
  public constructor(request: LinearRequest, data: D.CommentConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Comment(request, node)) : undefined;
  }

  public nodes?: Comment[];
  public pageInfo?: PageInfo;
}

/**
 * A comment associated with an issue.
 *
 * @param request - function to call the graphql client
 * @param data - the initial CommentFragment response data
 */
export class Comment {
  private _request: LinearRequest;
  private _user?: D.CommentFragment["user"];
  private _issue?: D.CommentFragment["issue"];

  public constructor(request: LinearRequest, data: D.CommentFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.body = data.body ?? undefined;
    this.reactionData = data.reactionData ?? undefined;
    this._user = data.user ?? undefined;
    this._issue = data.issue ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The comment content in markdown format. */
  public body?: string;
  /** Emoji reactions on the comment. */
  public reactionData?: D.Scalars["JSON"][];
  /** The user who wrote the comment. */
  public get user(): Promise<D.User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
  /** The issue that the comment is associated with. */
  public get issue(): Promise<D.Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
}

/**
 * IssueHistoryConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueHistoryConnectionFragment response data
 */
export class IssueHistoryConnection {
  public constructor(request: LinearRequest, data: D.IssueHistoryConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new IssueHistory(request, node)) : undefined;
  }

  public nodes?: IssueHistory[];
  public pageInfo?: PageInfo;
}

/**
 * A record of changes to an issue.
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueHistoryFragment response data
 */
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
    this.updatedDescription = data.updatedDescription ?? undefined;
    this.fromTitle = data.fromTitle ?? undefined;
    this.toTitle = data.toTitle ?? undefined;
    this.fromPriority = data.fromPriority ?? undefined;
    this.toPriority = data.toPriority ?? undefined;
    this.fromEstimate = data.fromEstimate ?? undefined;
    this.toEstimate = data.toEstimate ?? undefined;
    this.archived = data.archived ?? undefined;
    this.autoClosed = data.autoClosed ?? undefined;
    this.autoArchived = data.autoArchived ?? undefined;
    this.addedLabelIds = data.addedLabelIds ?? undefined;
    this.removedLabelIds = data.removedLabelIds ?? undefined;
    this.relationChanges = data.relationChanges ?? undefined;
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
  public autoClosed?: boolean;
  public autoArchived?: boolean;
  /** ID's of labels that were added. */
  public addedLabelIds?: string[];
  /** ID's of labels that were removed. */
  public removedLabelIds?: string[];
  /** Changed issue relationships. */
  public relationChanges?: string[];
  /** The issue that was changed. */
  public get issue(): Promise<D.Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
  /** The user who made these changes. If null, possibly means that the change made by an integration. */
  public get actor(): Promise<D.User | undefined> | undefined {
    return this._actor?.id ? new UserQuery(this._request).fetch(this._actor?.id) : undefined;
  }
  /** The integration that made these changes. If null, possibly means that the change was made by a user. */
  public get integration(): Promise<D.Integration | undefined> | undefined {
    return this._integration?.id ? new IntegrationQuery(this._request).fetch(this._integration?.id) : undefined;
  }
  /** The user from whom the issue was re-assigned from. */
  public get fromAssignee(): Promise<D.User | undefined> | undefined {
    return this._fromAssignee?.id ? new UserQuery(this._request).fetch(this._fromAssignee?.id) : undefined;
  }
  /** The user to whom the issue was assigned to. */
  public get toAssignee(): Promise<D.User | undefined> | undefined {
    return this._toAssignee?.id ? new UserQuery(this._request).fetch(this._toAssignee?.id) : undefined;
  }
  /** The team from which the issue was moved from. */
  public get fromTeam(): Promise<D.Team | undefined> | undefined {
    return this._fromTeam?.id ? new TeamQuery(this._request).fetch(this._fromTeam?.id) : undefined;
  }
  /** The team to which the issue was moved to. */
  public get toTeam(): Promise<D.Team | undefined> | undefined {
    return this._toTeam?.id ? new TeamQuery(this._request).fetch(this._toTeam?.id) : undefined;
  }
  /** The previous parent of the issue. */
  public get fromParent(): Promise<D.Issue | undefined> | undefined {
    return this._fromParent?.id ? new IssueQuery(this._request).fetch(this._fromParent?.id) : undefined;
  }
  /** The new parent of the issue. */
  public get toParent(): Promise<D.Issue | undefined> | undefined {
    return this._toParent?.id ? new IssueQuery(this._request).fetch(this._toParent?.id) : undefined;
  }
  /** The previous workflow state of the issue. */
  public get fromState(): Promise<D.WorkflowState | undefined> | undefined {
    return this._fromState?.id ? new WorkflowStateQuery(this._request).fetch(this._fromState?.id) : undefined;
  }
  /** The new workflow state of the issue. */
  public get toState(): Promise<D.WorkflowState | undefined> | undefined {
    return this._toState?.id ? new WorkflowStateQuery(this._request).fetch(this._toState?.id) : undefined;
  }
  /** The previous cycle of the issue. */
  public get fromCycle(): Promise<D.Cycle | undefined> | undefined {
    return this._fromCycle?.id ? new CycleQuery(this._request).fetch(this._fromCycle?.id) : undefined;
  }
  /** The new cycle of the issue. */
  public get toCycle(): Promise<D.Cycle | undefined> | undefined {
    return this._toCycle?.id ? new CycleQuery(this._request).fetch(this._toCycle?.id) : undefined;
  }
  /** The previous project of the issue. */
  public get fromProject(): Promise<D.Project | undefined> | undefined {
    return this._fromProject?.id ? new ProjectQuery(this._request).fetch(this._fromProject?.id) : undefined;
  }
  /** The new project of the issue. */
  public get toProject(): Promise<D.Project | undefined> | undefined {
    return this._toProject?.id ? new ProjectQuery(this._request).fetch(this._toProject?.id) : undefined;
  }
}

/**
 * IntegrationResourceConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IntegrationResourceConnectionFragment response data
 */
export class IntegrationResourceConnection {
  public constructor(request: LinearRequest, data: D.IntegrationResourceConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new IntegrationResource(request, node)) : undefined;
  }

  public nodes?: IntegrationResource[];
  public pageInfo?: PageInfo;
}

/**
 * An integration resource created by an external service.
 *
 * @param request - function to call the graphql client
 * @param data - the initial IntegrationResourceFragment response data
 */
export class IntegrationResource {
  private _request: LinearRequest;
  private _integration?: D.IntegrationResourceFragment["integration"];
  private _issue?: D.IntegrationResourceFragment["issue"];

  public constructor(request: LinearRequest, data: D.IntegrationResourceFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.resourceType = data.resourceType ?? undefined;
    this.resourceId = data.resourceId ?? undefined;
    this.data = data.data ? new IntegrationResourceData(request, data.data) : undefined;
    this.pullRequest = data.pullRequest ? new PullRequestPayload(request, data.pullRequest) : undefined;
    this._integration = data.integration ?? undefined;
    this._issue = data.issue ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The integration's type. */
  public resourceType?: string;
  /** The external service resource ID. */
  public resourceId?: string;
  /** Detailed information about the external resource. */
  public data?: IntegrationResourceData;
  /** Pull request information for GitHub pull requests and GitLab merge requests. */
  public pullRequest?: PullRequestPayload;
  /** The integration that the resource is associated with. */
  public get integration(): Promise<D.Integration | undefined> | undefined {
    return this._integration?.id ? new IntegrationQuery(this._request).fetch(this._integration?.id) : undefined;
  }
  /** The issue that the resource is associated with. */
  public get issue(): Promise<D.Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
}

/**
 * Integration resource's payload
 *
 * @param request - function to call the graphql client
 * @param data - the initial IntegrationResourceDataFragment response data
 */
export class IntegrationResourceData {
  public constructor(request: LinearRequest, data: D.IntegrationResourceDataFragment) {
    this.githubPullRequest = data.githubPullRequest
      ? new PullRequestPayload(request, data.githubPullRequest)
      : undefined;
    this.gitlabMergeRequest = data.gitlabMergeRequest
      ? new PullRequestPayload(request, data.gitlabMergeRequest)
      : undefined;
    this.githubCommit = data.githubCommit ? new CommitPayload(request, data.githubCommit) : undefined;
    this.sentryIssue = data.sentryIssue ? new SentryIssuePayload(request, data.sentryIssue) : undefined;
  }

  /** The payload for an IntegrationResource of type 'githubPullRequest' */
  public githubPullRequest?: PullRequestPayload;
  /** The payload for an IntegrationResource of type 'gitlabMergeRequest' */
  public gitlabMergeRequest?: PullRequestPayload;
  /** The payload for an IntegrationResource of type 'githubCommit' */
  public githubCommit?: CommitPayload;
  /** The payload for an IntegrationResource of type 'sentryIssue' */
  public sentryIssue?: SentryIssuePayload;
}

/**
 * Pull request data
 *
 * @param request - function to call the graphql client
 * @param data - the initial PullRequestPayloadFragment response data
 */
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

/**
 * GitHub's commit data
 *
 * @param request - function to call the graphql client
 * @param data - the initial CommitPayloadFragment response data
 */
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

/**
 * Sentry issue data
 *
 * @param request - function to call the graphql client
 * @param data - the initial SentryIssuePayloadFragment response data
 */
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

/**
 * IssueRelationConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueRelationConnectionFragment response data
 */
export class IssueRelationConnection {
  public constructor(request: LinearRequest, data: D.IssueRelationConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new IssueRelation(request, node)) : undefined;
  }

  public nodes?: IssueRelation[];
  public pageInfo?: PageInfo;
}

/**
 * A relation between two issues.
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueRelationFragment response data
 */
export class IssueRelation {
  private _request: LinearRequest;
  private _issue?: D.IssueRelationFragment["issue"];
  private _relatedIssue?: D.IssueRelationFragment["relatedIssue"];

  public constructor(request: LinearRequest, data: D.IssueRelationFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.type = data.type ?? undefined;
    this._issue = data.issue ?? undefined;
    this._relatedIssue = data.relatedIssue ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The relationship of the issue with the related issue. */
  public type?: string;
  /** The issue whose relationship is being described. */
  public get issue(): Promise<D.Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
  /** The related issue. */
  public get relatedIssue(): Promise<D.Issue | undefined> | undefined {
    return this._relatedIssue?.id ? new IssueQuery(this._request).fetch(this._relatedIssue?.id) : undefined;
  }
}

/**
 * OrganizationExistsPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationExistsPayloadFragment response data
 */
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

/**
 * Contains either the full serialized state of the application or delta packets that the requester can
 *   apply to the local data set in order to be up-to-date.
 *
 * @param request - function to call the graphql client
 * @param data - the initial SyncResponseFragment response data
 */
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

/**
 * Contains requested archived model objects.
 *
 * @param request - function to call the graphql client
 * @param data - the initial ArchiveResponseFragment response data
 */
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

/**
 * A user account. Super user required.
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserAccountAdminPrivilegedFragment response data
 */
export class UserAccountAdminPrivileged {
  public constructor(request: LinearRequest, data: D.UserAccountAdminPrivilegedFragment) {
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.email = data.email ?? undefined;
    this.service = data.service ?? undefined;
    this.users = data.users ? data.users.map(node => new UserAdminPrivileged(request, node)) : undefined;
  }

  /** The models identifier. */
  public id?: string;
  /** The user's name. */
  public name?: string;
  /** The user's email address. */
  public email?: string;
  /** The authentication service used to create the account. */
  public service?: string;
  public users?: UserAdminPrivileged[];
}

/**
 * A user that has access to the the resources of an organization. Super user required.
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserAdminPrivilegedFragment response data
 */
export class UserAdminPrivileged {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.UserAdminPrivilegedFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.displayName = data.displayName ?? undefined;
    this.email = data.email ?? undefined;
    this.avatarUrl = data.avatarUrl ?? undefined;
    this.disableReason = data.disableReason ?? undefined;
    this.inviteHash = data.inviteHash ?? undefined;
    this.admin = data.admin ?? undefined;
    this.active = data.active ?? undefined;
    this.createdIssueCount = data.createdIssueCount ?? undefined;
    this.organization = data.organization ? new OrganizationAdminPrivileged(request, data.organization) : undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
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
  /** Whether the user is an organization administrator. */
  public admin?: boolean;
  /** Whether the user account is active or disabled. */
  public active?: boolean;
  /** Number of issues created. */
  public createdIssueCount?: number;
  /** Organization in which the user belongs to. Super user required. */
  public organization?: OrganizationAdminPrivileged;
  /** The settings of the user. */
  public get settings(): Promise<D.UserSettings | undefined> {
    return new NotificationQuery(this._request).fetch();
  }
}

/**
 * An organization. Super user required.
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationAdminPrivilegedFragment response data
 */
export class OrganizationAdminPrivileged {
  public constructor(request: LinearRequest, data: D.OrganizationAdminPrivilegedFragment) {
    this.id = data.id ?? undefined;
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
    this.userCount = data.userCount ?? undefined;
    this.createdIssueCount = data.createdIssueCount ?? undefined;
    this.stripeCustomerId = data.stripeCustomerId ?? undefined;
    this.allowedAuthServices = data.allowedAuthServices ?? undefined;
    this.subscription = data.subscription ? new SubscriptionAdminPrivileged(request, data.subscription) : undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
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
  /** Number of active users in the organization. */
  public userCount?: number;
  /** Number of issues in the organization. */
  public createdIssueCount?: number;
  /** The Stripe identifier for the organization. */
  public stripeCustomerId?: string;
  /** Allowed authentication providers, empty array means all are allowed */
  public allowedAuthServices?: string[];
  /** The organization's subscription to a paid plan. Super user required. */
  public subscription?: SubscriptionAdminPrivileged;
}

/**
 * The subscription of an organization. Super user required.
 *
 * @param request - function to call the graphql client
 * @param data - the initial SubscriptionAdminPrivilegedFragment response data
 */
export class SubscriptionAdminPrivileged {
  private _request: LinearRequest;
  private _creator?: D.SubscriptionAdminPrivilegedFragment["creator"];

  public constructor(request: LinearRequest, data: D.SubscriptionAdminPrivilegedFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.type = data.type ?? undefined;
    this.seats = data.seats ?? undefined;
    this.pendingChangeType = data.pendingChangeType ?? undefined;
    this.stripeSubscriptionId = data.stripeSubscriptionId ?? undefined;
    this.stripeStatus = data.stripeStatus ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The subscription type. */
  public type?: string;
  /** The number of seats in the subscription. */
  public seats?: number;
  /** The subscription type of a pending change. Null if no change pending. */
  public pendingChangeType?: string;
  /** The Stripe identifier for the subscription. */
  public stripeSubscriptionId?: string;
  /** The Stripe status for the subscription. */
  public stripeStatus?: string;
  /** The creator of the subscription. */
  public get creator(): Promise<D.User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The organization that the subscription is associated with. */
  public get organization(): Promise<D.Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

/**
 * ApiKeyConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ApiKeyConnectionFragment response data
 */
export class ApiKeyConnection {
  public constructor(request: LinearRequest, data: D.ApiKeyConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new ApiKey(request, node)) : undefined;
  }

  public nodes?: ApiKey[];
  public pageInfo?: PageInfo;
}

/**
 * An API key. Grants access to the user's resources.
 *
 * @param request - function to call the graphql client
 * @param data - the initial ApiKeyFragment response data
 */
export class ApiKey {
  public constructor(request: LinearRequest, data: D.ApiKeyFragment) {
    this.id = data.id ?? undefined;
    this.label = data.label ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The label of the API key. */
  public label?: string;
}

/**
 * Public information of the OAuth application, plus whether the application has been authorized for the given scopes.
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserAuthorizedApplicationFragment response data
 */
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

/**
 * Public information of the OAuth application, plus the authorized scopes for a given user.
 *
 * @param request - function to call the graphql client
 * @param data - the initial AuthorizedApplicationFragment response data
 */
export class AuthorizedApplication {
  public constructor(request: LinearRequest, data: D.AuthorizedApplicationFragment) {
    this.clientId = data.clientId ?? undefined;
    this.name = data.name ?? undefined;
    this.description = data.description ?? undefined;
    this.developer = data.developer ?? undefined;
    this.developerUrl = data.developerUrl ?? undefined;
    this.imageUrl = data.imageUrl ?? undefined;
    this.appId = data.appId ?? undefined;
    this.scope = data.scope ?? undefined;
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
  /** OAuth application's ID. */
  public appId?: string;
  /** Scopes that are authorized for this application for a given user. */
  public scope?: string[];
}

/**
 * AuthResolverResponse model
 *
 * @param request - function to call the graphql client
 * @param data - the initial AuthResolverResponseFragment response data
 */
export class AuthResolverResponse {
  public constructor(request: LinearRequest, data: D.AuthResolverResponseFragment) {
    this.id = data.id ?? undefined;
    this.token = data.token ?? undefined;
    this.email = data.email ?? undefined;
    this.allowDomainAccess = data.allowDomainAccess ?? undefined;
    this.users = data.users ? data.users.map(node => new User(request, node)) : undefined;
    this.availableOrganizations = data.availableOrganizations
      ? data.availableOrganizations.map(node => new Organization(request, node))
      : undefined;
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
  public users?: User[];
  /** Organizations this account has access to, but is not yet a member. */
  public availableOrganizations?: Organization[];
}

/**
 * SsoUrlFromEmailResponse model
 *
 * @param request - function to call the graphql client
 * @param data - the initial SsoUrlFromEmailResponseFragment response data
 */
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

/**
 * BillingDetailsPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial BillingDetailsPayloadFragment response data
 */
export class BillingDetailsPayload {
  public constructor(request: LinearRequest, data: D.BillingDetailsPayloadFragment) {
    this.success = data.success ?? undefined;
    this.email = data.email ?? undefined;
    this.paymentMethod = data.paymentMethod ? new Card(request, data.paymentMethod) : undefined;
    this.invoices = data.invoices ? data.invoices.map(node => new Invoice(request, node)) : undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
  /** The customer's email address the invoices are sent to. */
  public email?: string;
  /** List of invoices, if any. */
  public invoices?: Invoice[];
  /** The payment method. */
  public paymentMethod?: Card;
}

/**
 * Invoice model
 *
 * @param request - function to call the graphql client
 * @param data - the initial InvoiceFragment response data
 */
export class Invoice {
  public constructor(request: LinearRequest, data: D.InvoiceFragment) {
    this.url = data.url ?? undefined;
    this.status = data.status ?? undefined;
    this.total = data.total ?? undefined;
  }

  /** The URL at which the invoice can be viewed or paid. */
  public url?: string;
  /** The status of the invoice. */
  public status?: string;
  /** The invoice total, in cents. */
  public total?: number;
}

/**
 * Card model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CardFragment response data
 */
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

/**
 * CollaborationDocumentUpdatePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CollaborationDocumentUpdatePayloadFragment response data
 */
export class CollaborationDocumentUpdatePayload {
  public constructor(request: LinearRequest, data: D.CollaborationDocumentUpdatePayloadFragment) {
    this.success = data.success ?? undefined;
    this.steps = data.steps ? new StepsResponse(request, data.steps) : undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
  /** Document steps the client has not seen yet and need to rebase it's local steps on. */
  public steps?: StepsResponse;
}

/**
 * StepsResponse model
 *
 * @param request - function to call the graphql client
 * @param data - the initial StepsResponseFragment response data
 */
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

/**
 * A custom view that has been saved by a user.
 *
 * @param request - function to call the graphql client
 * @param data - the initial CustomViewFragment response data
 */
export class CustomView {
  private _request: LinearRequest;
  private _team?: D.CustomViewFragment["team"];
  private _creator?: D.CustomViewFragment["creator"];

  public constructor(request: LinearRequest, data: D.CustomViewFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.description = data.description ?? undefined;
    this.icon = data.icon ?? undefined;
    this.color = data.color ?? undefined;
    this.shared = data.shared ?? undefined;
    this._team = data.team ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The name of the custom view. */
  public name?: string;
  /** The description of the custom view. */
  public description?: string;
  /** The icon of the custom view. */
  public icon?: string;
  /** The color of the icon of the custom view. */
  public color?: string;
  /** Whether the custom view is shared with everyone in the organization. */
  public shared?: boolean;
  /** The organization of the custom view. */
  public get organization(): Promise<D.Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** The team associated with the custom view. */
  public get team(): Promise<D.Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The user who created the custom view. */
  public get creator(): Promise<D.User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}

/**
 * CustomViewConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CustomViewConnectionFragment response data
 */
export class CustomViewConnection {
  public constructor(request: LinearRequest, data: D.CustomViewConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new CustomView(request, node)) : undefined;
  }

  public nodes?: CustomView[];
  public pageInfo?: PageInfo;
}

/**
 * A custom emoji.
 *
 * @param request - function to call the graphql client
 * @param data - the initial EmojiFragment response data
 */
export class Emoji {
  private _request: LinearRequest;
  private _creator?: D.EmojiFragment["creator"];

  public constructor(request: LinearRequest, data: D.EmojiFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.url = data.url ?? undefined;
    this.source = data.source ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The emoji's name. */
  public name?: string;
  /** The emoji image URL. */
  public url?: string;
  /** The source of the emoji. */
  public source?: string;
  /** The user who created the emoji. */
  public get creator(): Promise<D.User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The organization that the emoji belongs to. */
  public get organization(): Promise<D.Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

/**
 * EmojiConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial EmojiConnectionFragment response data
 */
export class EmojiConnection {
  public constructor(request: LinearRequest, data: D.EmojiConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Emoji(request, node)) : undefined;
  }

  public nodes?: Emoji[];
  public pageInfo?: PageInfo;
}

/**
 * User favorites presented in the sidebar.
 *
 * @param request - function to call the graphql client
 * @param data - the initial FavoriteFragment response data
 */
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
  /** The type of the favorite. */
  public type?: string;
  /** The order of the item in the favorites list. */
  public sortOrder?: number;
  /** The owner of the favorite. */
  public get user(): Promise<D.User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
  /** Favorited issue. */
  public get issue(): Promise<D.Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
  /** Favorited project. */
  public get project(): Promise<D.Project | undefined> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
  /** Favorited project team. */
  public get projectTeam(): Promise<D.Project | undefined> | undefined {
    return this._projectTeam?.id ? new ProjectQuery(this._request).fetch(this._projectTeam?.id) : undefined;
  }
  /** Favorited cycle. */
  public get cycle(): Promise<D.Cycle | undefined> | undefined {
    return this._cycle?.id ? new CycleQuery(this._request).fetch(this._cycle?.id) : undefined;
  }
  /** Favorited issue label. */
  public get label(): Promise<D.IssueLabel | undefined> | undefined {
    return this._label?.id ? new IssueLabelQuery(this._request).fetch(this._label?.id) : undefined;
  }
}

/**
 * FavoriteConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial FavoriteConnectionFragment response data
 */
export class FavoriteConnection {
  public constructor(request: LinearRequest, data: D.FavoriteConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Favorite(request, node)) : undefined;
  }

  public nodes?: Favorite[];
  public pageInfo?: PageInfo;
}

/**
 * FigmaEmbedPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial FigmaEmbedPayloadFragment response data
 */
export class FigmaEmbedPayload {
  public constructor(request: LinearRequest, data: D.FigmaEmbedPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this.figmaEmbed = data.figmaEmbed ? new FigmaEmbed(request, data.figmaEmbed) : undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** Figma embed information. */
  public figmaEmbed?: FigmaEmbed;
}

/**
 * Object representing Figma preview information.
 *
 * @param request - function to call the graphql client
 * @param data - the initial FigmaEmbedFragment response data
 */
export class FigmaEmbed {
  public constructor(request: LinearRequest, data: D.FigmaEmbedFragment) {
    this.name = data.name ?? undefined;
    this.nodeName = data.nodeName ?? undefined;
    this.url = data.url ?? undefined;
  }

  /** Figma file name. */
  public name?: string;
  /** Node name. */
  public nodeName?: string;
  /** Figma screenshot URL. */
  public url?: string;
}

/**
 * InvitePagePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial InvitePagePayloadFragment response data
 */
export class InvitePagePayload {
  public constructor(request: LinearRequest, data: D.InvitePagePayloadFragment) {
    this.success = data.success ?? undefined;
    this.inviteData = data.inviteData ? new InviteData(request, data.inviteData) : undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
  /** Invite data. */
  public inviteData?: InviteData;
}

/**
 * InviteData model
 *
 * @param request - function to call the graphql client
 * @param data - the initial InviteDataFragment response data
 */
export class InviteData {
  public constructor(request: LinearRequest, data: D.InviteDataFragment) {
    this.inviterName = data.inviterName ?? undefined;
    this.organizationName = data.organizationName ?? undefined;
    this.organizationDomain = data.organizationDomain ?? undefined;
    this.organizationLogoUrl = data.organizationLogoUrl ?? undefined;
    this.userCount = data.userCount ?? undefined;
    this.avatarURLs = data.avatarURLs ?? undefined;
    this.teamNames = data.teamNames ?? undefined;
    this.teamIds = data.teamIds ?? undefined;
  }

  /** The name of the inviter. */
  public inviterName?: string;
  /** The name of the organization the users were invited to. */
  public organizationName?: string;
  /** The domain of the organization the users were invited to. */
  public organizationDomain?: string;
  /** The logo of the organization the users were invited to. */
  public organizationLogoUrl?: string;
  /** The user count of the organization. */
  public userCount?: number;
  /** Avatar URLs for the invitees. */
  public avatarURLs?: string[];
  /** Team names for the invitees. */
  public teamNames?: string[];
  /** Team identifiers for the invitees. */
  public teamIds?: string[];
}

/**
 * NotificationConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial NotificationConnectionFragment response data
 */
export class NotificationConnection {
  public constructor(request: LinearRequest, data: D.NotificationConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Notification(request, node)) : undefined;
  }

  public nodes?: Notification[];
  public pageInfo?: PageInfo;
}

/**
 * A notification sent to a user.
 *
 * @param request - function to call the graphql client
 * @param data - the initial NotificationFragment response data
 */
export class Notification {
  private _request: LinearRequest;
  private _user?: D.NotificationFragment["user"];
  private _issue?: D.NotificationFragment["issue"];
  private _team?: D.NotificationFragment["team"];
  private _comment?: D.NotificationFragment["comment"];

  public constructor(request: LinearRequest, data: D.NotificationFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.type = data.type ?? undefined;
    this.reactionEmoji = data.reactionEmoji ?? undefined;
    this._user = data.user ?? undefined;
    this._issue = data.issue ?? undefined;
    this._team = data.team ?? undefined;
    this._comment = data.comment ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** Notification type */
  public type?: string;
  /** Name of the reaction emoji associated with the notification. */
  public reactionEmoji?: string;
  /** The recipient of the notification. */
  public get user(): Promise<D.User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
  /** The issue that the notification is associated with. */
  public get issue(): Promise<D.Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
  /** The team which the notification is associated with. */
  public get team(): Promise<D.Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The comment which the notification is associated with. */
  public get comment(): Promise<D.Comment | undefined> | undefined {
    return this._comment?.id ? new CommentQuery(this._request).fetch(this._comment?.id) : undefined;
  }
}

/**
 * NotificationSubscriptionConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial NotificationSubscriptionConnectionFragment response data
 */
export class NotificationSubscriptionConnection {
  public constructor(request: LinearRequest, data: D.NotificationSubscriptionConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new NotificationSubscription(request, node)) : undefined;
  }

  public nodes?: NotificationSubscription[];
  public pageInfo?: PageInfo;
}

/**
 * Notification subscriptions for models.
 *
 * @param request - function to call the graphql client
 * @param data - the initial NotificationSubscriptionFragment response data
 */
export class NotificationSubscription {
  private _request: LinearRequest;
  private _user?: D.NotificationSubscriptionFragment["user"];
  private _team?: D.NotificationSubscriptionFragment["team"];
  private _project?: D.NotificationSubscriptionFragment["project"];

  public constructor(request: LinearRequest, data: D.NotificationSubscriptionFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.type = data.type ?? undefined;
    this._user = data.user ?? undefined;
    this._team = data.team ?? undefined;
    this._project = data.project ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The type of the subscription. */
  public type?: string;
  /** The user associated with notification subscriptions. */
  public get user(): Promise<D.User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
  /** Subscribed team. */
  public get team(): Promise<D.Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** Subscribed project. */
  public get project(): Promise<D.Project | undefined> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
}

/**
 * OrganizationInviteConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationInviteConnectionFragment response data
 */
export class OrganizationInviteConnection {
  public constructor(request: LinearRequest, data: D.OrganizationInviteConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new OrganizationInvite(request, node)) : undefined;
  }

  public nodes?: OrganizationInvite[];
  public pageInfo?: PageInfo;
}

/**
 * An invitation to the organization that has been sent via email.
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationInviteFragment response data
 */
export class OrganizationInvite {
  private _request: LinearRequest;
  private _inviter?: D.OrganizationInviteFragment["inviter"];
  private _invitee?: D.OrganizationInviteFragment["invitee"];

  public constructor(request: LinearRequest, data: D.OrganizationInviteFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.email = data.email ?? undefined;
    this.external = data.external ?? undefined;
    this._inviter = data.inviter ?? undefined;
    this._invitee = data.invitee ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The invitees email address. */
  public email?: string;
  /** The invite was sent to external address. */
  public external?: boolean;
  /** The user who created the invitation. */
  public get inviter(): Promise<D.User | undefined> | undefined {
    return this._inviter?.id ? new UserQuery(this._request).fetch(this._inviter?.id) : undefined;
  }
  /** The user who has accepted the invite. Null, if the invite hasn't been accepted. */
  public get invitee(): Promise<D.User | undefined> | undefined {
    return this._invitee?.id ? new UserQuery(this._request).fetch(this._invitee?.id) : undefined;
  }
  /** The organization that the invite is associated with. */
  public get organization(): Promise<D.Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

/**
 * PushSubscriptionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial PushSubscriptionPayloadFragment response data
 */
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

/**
 * A reaction associated with a comment.
 *
 * @param request - function to call the graphql client
 * @param data - the initial ReactionFragment response data
 */
export class Reaction {
  private _request: LinearRequest;
  private _user?: D.ReactionFragment["user"];
  private _comment?: D.ReactionFragment["comment"];

  public constructor(request: LinearRequest, data: D.ReactionFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.emoji = data.emoji ?? undefined;
    this._user = data.user ?? undefined;
    this._comment = data.comment ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** Name of the reaction's emoji. */
  public emoji?: string;
  /** The user who reacted. */
  public get user(): Promise<D.User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
  /** The comment that the reaction is associated with. */
  public get comment(): Promise<D.Comment | undefined> | undefined {
    return this._comment?.id ? new CommentQuery(this._request).fetch(this._comment?.id) : undefined;
  }
}

/**
 * ReactionConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ReactionConnectionFragment response data
 */
export class ReactionConnection {
  public constructor(request: LinearRequest, data: D.ReactionConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Reaction(request, node)) : undefined;
  }

  public nodes?: Reaction[];
  public pageInfo?: PageInfo;
}

/**
 * ViewPreferencesConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ViewPreferencesConnectionFragment response data
 */
export class ViewPreferencesConnection {
  public constructor(request: LinearRequest, data: D.ViewPreferencesConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new ViewPreferences(request, node)) : undefined;
  }

  public nodes?: ViewPreferences[];
  public pageInfo?: PageInfo;
}

/**
 * View preferences.
 *
 * @param request - function to call the graphql client
 * @param data - the initial ViewPreferencesFragment response data
 */
export class ViewPreferences {
  public constructor(request: LinearRequest, data: D.ViewPreferencesFragment) {
    this.id = data.id ?? undefined;
    this.type = data.type ?? undefined;
    this.viewType = data.viewType ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** The view preference type. */
  public type?: string;
  /** The view type. */
  public viewType?: string;
}

/**
 * UserPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserPayloadFragment response data
 */
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
  public get user(): Promise<D.User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
}

/**
 * UserAdminPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserAdminPayloadFragment response data
 */
export class UserAdminPayload {
  public constructor(request: LinearRequest, data: D.UserAdminPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * OrganizationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationPayloadFragment response data
 */
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
  public get organization(): Promise<D.Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

/**
 * OrganizationDeletePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationDeletePayloadFragment response data
 */
export class OrganizationDeletePayload {
  public constructor(request: LinearRequest, data: D.OrganizationDeletePayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * AdminIntegrationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial AdminIntegrationPayloadFragment response data
 */
export class AdminIntegrationPayload {
  public constructor(request: LinearRequest, data: D.AdminIntegrationPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * OrganizationAccessPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationAccessPayloadFragment response data
 */
export class OrganizationAccessPayload {
  public constructor(request: LinearRequest, data: D.OrganizationAccessPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * OrganizationSamlConfigurePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationSamlConfigurePayloadFragment response data
 */
export class OrganizationSamlConfigurePayload {
  public constructor(request: LinearRequest, data: D.OrganizationSamlConfigurePayloadFragment) {
    this.success = data.success ?? undefined;
    this.samlEnabled = data.samlEnabled ?? undefined;
    this.samlConfiguration = data.samlConfiguration
      ? new SamlConfiguration(request, data.samlConfiguration)
      : undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
  /** Whether SAML is enabled for the organization. */
  public samlEnabled?: boolean;
  /** Organization's current SAML configuration. */
  public samlConfiguration?: SamlConfiguration;
}

/**
 * The integration resource's settings
 *
 * @param request - function to call the graphql client
 * @param data - the initial SamlConfigurationFragment response data
 */
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

/**
 * AdminCommandPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial AdminCommandPayloadFragment response data
 */
export class AdminCommandPayload {
  public constructor(request: LinearRequest, data: D.AdminCommandPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * EventPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial EventPayloadFragment response data
 */
export class EventPayload {
  public constructor(request: LinearRequest, data: D.EventPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * ApiKeyPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ApiKeyPayloadFragment response data
 */
export class ApiKeyPayload {
  public constructor(request: LinearRequest, data: D.ApiKeyPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this.apiKey = data.apiKey ? new ApiKey(request, data.apiKey) : undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The API key that was created. */
  public apiKey?: ApiKey;
}

/**
 * ArchivePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ArchivePayloadFragment response data
 */
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

/**
 * EmailUserAccountAuthChallengeResponse model
 *
 * @param request - function to call the graphql client
 * @param data - the initial EmailUserAccountAuthChallengeResponseFragment response data
 */
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

/**
 * CreateOrJoinOrganizationResponse model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CreateOrJoinOrganizationResponseFragment response data
 */
export class CreateOrJoinOrganizationResponse {
  private _request: LinearRequest;
  private _user?: D.CreateOrJoinOrganizationResponseFragment["user"];

  public constructor(request: LinearRequest, data: D.CreateOrJoinOrganizationResponseFragment) {
    this._request = request;
    this._user = data.user ?? undefined;
  }

  public get organization(): Promise<D.Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
  public get user(): Promise<D.User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
}

/**
 * BillingEmailPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial BillingEmailPayloadFragment response data
 */
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

/**
 * CommentPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CommentPayloadFragment response data
 */
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
  public get comment(): Promise<D.Comment | undefined> | undefined {
    return this._comment?.id ? new CommentQuery(this._request).fetch(this._comment?.id) : undefined;
  }
}

/**
 * ContactPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ContactPayloadFragment response data
 */
export class ContactPayload {
  public constructor(request: LinearRequest, data: D.ContactPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * CustomViewPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CustomViewPayloadFragment response data
 */
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
  public get customView(): Promise<D.CustomView | undefined> | undefined {
    return this._customView?.id ? new CustomViewQuery(this._request).fetch(this._customView?.id) : undefined;
  }
}

/**
 * CyclePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CyclePayloadFragment response data
 */
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
  public get cycle(): Promise<D.Cycle | undefined> | undefined {
    return this._cycle?.id ? new CycleQuery(this._request).fetch(this._cycle?.id) : undefined;
  }
}

/**
 * DebugPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial DebugPayloadFragment response data
 */
export class DebugPayload {
  public constructor(request: LinearRequest, data: D.DebugPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * EmailUnsubscribePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial EmailUnsubscribePayloadFragment response data
 */
export class EmailUnsubscribePayload {
  public constructor(request: LinearRequest, data: D.EmailUnsubscribePayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * EmojiPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial EmojiPayloadFragment response data
 */
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
  public get emoji(): Promise<D.Emoji | undefined> | undefined {
    return this._emoji?.id ? new EmojiQuery(this._request).fetch(this._emoji?.id) : undefined;
  }
}

/**
 * FavoritePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial FavoritePayloadFragment response data
 */
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
  public get favorite(): Promise<D.Favorite | undefined> | undefined {
    return this._favorite?.id ? new FavoriteQuery(this._request).fetch(this._favorite?.id) : undefined;
  }
}

/**
 * FeedbackPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial FeedbackPayloadFragment response data
 */
export class FeedbackPayload {
  public constructor(request: LinearRequest, data: D.FeedbackPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * UploadPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial UploadPayloadFragment response data
 */
export class UploadPayload {
  public constructor(request: LinearRequest, data: D.UploadPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this.uploadFile = data.uploadFile ? new UploadFile(request, data.uploadFile) : undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** Object describing the file to be uploaded. */
  public uploadFile?: UploadFile;
}

/**
 * Object representing Google Cloud upload policy, plus additional data.
 *
 * @param request - function to call the graphql client
 * @param data - the initial UploadFileFragment response data
 */
export class UploadFile {
  public constructor(request: LinearRequest, data: D.UploadFileFragment) {
    this.filename = data.filename ?? undefined;
    this.contentType = data.contentType ?? undefined;
    this.size = data.size ?? undefined;
    this.uploadUrl = data.uploadUrl ?? undefined;
    this.assetUrl = data.assetUrl ?? undefined;
    this.headers = data.headers ? data.headers.map(node => new UploadFileHeader(request, node)) : undefined;
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
  public headers?: UploadFileHeader[];
}

/**
 * UploadFileHeader model
 *
 * @param request - function to call the graphql client
 * @param data - the initial UploadFileHeaderFragment response data
 */
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

/**
 * ImageUploadFromUrlPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ImageUploadFromUrlPayloadFragment response data
 */
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

/**
 * IntegrationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IntegrationPayloadFragment response data
 */
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
  public get integration(): Promise<D.Integration | undefined> | undefined {
    return this._integration?.id ? new IntegrationQuery(this._request).fetch(this._integration?.id) : undefined;
  }
}

/**
 * IssueLabelPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueLabelPayloadFragment response data
 */
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
  public get issueLabel(): Promise<D.IssueLabel | undefined> | undefined {
    return this._issueLabel?.id ? new IssueLabelQuery(this._request).fetch(this._issueLabel?.id) : undefined;
  }
}

/**
 * IssueRelationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueRelationPayloadFragment response data
 */
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
  public get issueRelation(): Promise<D.IssueRelation | undefined> | undefined {
    return this._issueRelation?.id ? new IssueRelationQuery(this._request).fetch(this._issueRelation?.id) : undefined;
  }
}

/**
 * IssuePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssuePayloadFragment response data
 */
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
  public get issue(): Promise<D.Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
}

/**
 * MilestonePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial MilestonePayloadFragment response data
 */
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
  public get milestone(): Promise<D.Milestone | undefined> | undefined {
    return this._milestone?.id ? new MilestoneQuery(this._request).fetch(this._milestone?.id) : undefined;
  }
}

/**
 * NotificationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial NotificationPayloadFragment response data
 */
export class NotificationPayload {
  public constructor(request: LinearRequest, data: D.NotificationPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this.notification = data.notification ? new Notification(request, data.notification) : undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The notification that was created or updated. */
  public notification?: Notification;
}

/**
 * NotificationSubscriptionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial NotificationSubscriptionPayloadFragment response data
 */
export class NotificationSubscriptionPayload {
  public constructor(request: LinearRequest, data: D.NotificationSubscriptionPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this.notificationSubscription = data.notificationSubscription
      ? new NotificationSubscription(request, data.notificationSubscription)
      : undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The notification subscription that was created or updated. */
  public notificationSubscription?: NotificationSubscription;
}

/**
 * OauthClientPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OauthClientPayloadFragment response data
 */
export class OauthClientPayload {
  public constructor(request: LinearRequest, data: D.OauthClientPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this.oauthClient = data.oauthClient ? new OauthClient(request, data.oauthClient) : undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The OAuth client application that was created or updated. */
  public oauthClient?: OauthClient;
}

/**
 * OAuth2 client application
 *
 * @param request - function to call the graphql client
 * @param data - the initial OauthClientFragment response data
 */
export class OauthClient {
  public constructor(request: LinearRequest, data: D.OauthClientFragment) {
    this.id = data.id ?? undefined;
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

/**
 * RotateSecretPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial RotateSecretPayloadFragment response data
 */
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

/**
 * OauthTokenRevokePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OauthTokenRevokePayloadFragment response data
 */
export class OauthTokenRevokePayload {
  public constructor(request: LinearRequest, data: D.OauthTokenRevokePayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * OrganizationDomainPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationDomainPayloadFragment response data
 */
export class OrganizationDomainPayload {
  public constructor(request: LinearRequest, data: D.OrganizationDomainPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this.organizationDomain = data.organizationDomain
      ? new OrganizationDomain(request, data.organizationDomain)
      : undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The organization domain that was created or updated. */
  public organizationDomain?: OrganizationDomain;
}

/**
 * Defines the use of a domain by an organization.
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationDomainFragment response data
 */
export class OrganizationDomain {
  private _request: LinearRequest;
  private _creator?: D.OrganizationDomainFragment["creator"];

  public constructor(request: LinearRequest, data: D.OrganizationDomainFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.verified = data.verified ?? undefined;
    this.verificationEmail = data.verificationEmail ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** Domain name */
  public name?: string;
  /** Is this domain verified */
  public verified?: boolean;
  /** E-mail used to verify this domain */
  public verificationEmail?: string;
  /** The user who added the domain. */
  public get creator(): Promise<D.User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}

/**
 * OrganizationInvitePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationInvitePayloadFragment response data
 */
export class OrganizationInvitePayload {
  public constructor(request: LinearRequest, data: D.OrganizationInvitePayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this.organizationInvite = data.organizationInvite
      ? new OrganizationInvite(request, data.organizationInvite)
      : undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The organization invite that was created or updated. */
  public organizationInvite?: OrganizationInvite;
}

/**
 * ProjectLinkPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ProjectLinkPayloadFragment response data
 */
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
  public get projectLink(): Promise<D.ProjectLink | undefined> | undefined {
    return this._projectLink?.id ? new ProjectLinkQuery(this._request).fetch(this._projectLink?.id) : undefined;
  }
}

/**
 * ProjectPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ProjectPayloadFragment response data
 */
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
  public get project(): Promise<D.Project | undefined> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
}

/**
 * ReactionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ReactionPayloadFragment response data
 */
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
  public get reaction(): Promise<D.Reaction | undefined> | undefined {
    return this._reaction?.id ? new ReactionQuery(this._request).fetch(this._reaction?.id) : undefined;
  }
}

/**
 * CreateCsvExportReportPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CreateCsvExportReportPayloadFragment response data
 */
export class CreateCsvExportReportPayload {
  public constructor(request: LinearRequest, data: D.CreateCsvExportReportPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * SubscriptionSessionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial SubscriptionSessionPayloadFragment response data
 */
export class SubscriptionSessionPayload {
  public constructor(request: LinearRequest, data: D.SubscriptionSessionPayloadFragment) {
    this.session = data.session ?? undefined;
  }

  /** The subscription session that was created or updated. */
  public session?: string;
}

/**
 * SubscriptionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial SubscriptionPayloadFragment response data
 */
export class SubscriptionPayload {
  private _request: LinearRequest;

  public constructor(request: LinearRequest, data: D.SubscriptionPayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The subscription entity being mutated. */
  public get subscription(): Promise<D.Subscription | undefined> {
    return new SubscriptionQuery(this._request).fetch();
  }
}

/**
 * TeamMembershipPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial TeamMembershipPayloadFragment response data
 */
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
  public get teamMembership(): Promise<D.TeamMembership | undefined> | undefined {
    return this._teamMembership?.id
      ? new TeamMembershipQuery(this._request).fetch(this._teamMembership?.id)
      : undefined;
  }
}

/**
 * TeamPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial TeamPayloadFragment response data
 */
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
  public get team(): Promise<D.Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
}

/**
 * TemplatePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial TemplatePayloadFragment response data
 */
export class TemplatePayload {
  private _request: LinearRequest;
  private _template?: D.TemplatePayloadFragment["template"];

  public constructor(request: LinearRequest, data: D.TemplatePayloadFragment) {
    this._request = request;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._template = data.template ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The template that was created or updated. */
  public get template(): Promise<D.Template | undefined> | undefined {
    return this._template?.id ? new TemplateQuery(this._request).fetch(this._template?.id) : undefined;
  }
}

/**
 * UserSettingsPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserSettingsPayloadFragment response data
 */
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
  public get userSettings(): Promise<D.UserSettings | undefined> {
    return new NotificationQuery(this._request).fetch();
  }
}

/**
 * UserSettingsFlagPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserSettingsFlagPayloadFragment response data
 */
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

/**
 * UserSettingsFlagsResetPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserSettingsFlagsResetPayloadFragment response data
 */
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

/**
 * UserSubscribeToNewsletterPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserSubscribeToNewsletterPayloadFragment response data
 */
export class UserSubscribeToNewsletterPayload {
  public constructor(request: LinearRequest, data: D.UserSubscribeToNewsletterPayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * ViewPreferencesPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ViewPreferencesPayloadFragment response data
 */
export class ViewPreferencesPayload {
  public constructor(request: LinearRequest, data: D.ViewPreferencesPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this.viewPreferences = data.viewPreferences ? new ViewPreferences(request, data.viewPreferences) : undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The view preferences entity being mutated. */
  public viewPreferences?: ViewPreferences;
}

/**
 * WebhookPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial WebhookPayloadFragment response data
 */
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
  public get webhook(): Promise<D.Webhook | undefined> | undefined {
    return this._webhook?.id ? new WebhookQuery(this._request).fetch(this._webhook?.id) : undefined;
  }
}

/**
 * WorkflowStatePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial WorkflowStatePayloadFragment response data
 */
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
  public get workflowState(): Promise<D.WorkflowState | undefined> | undefined {
    return this._workflowState?.id ? new WorkflowStateQuery(this._request).fetch(this._workflowState?.id) : undefined;
  }
}

/**
 * Collaborative editing steps for documents.
 *
 * @param request - function to call the graphql client
 * @param data - the initial DocumentStepFragment response data
 */
export class DocumentStep {
  public constructor(request: LinearRequest, data: D.DocumentStepFragment) {
    this.id = data.id ?? undefined;
    this.version = data.version ?? undefined;
    this.clientId = data.clientId ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
  /** Step version. */
  public version?: number;
  /** Connected client ID. */
  public clientId?: string;
}

/**
 * A user's web browser push notification subscription.
 *
 * @param request - function to call the graphql client
 * @param data - the initial PushSubscriptionFragment response data
 */
export class PushSubscription {
  public constructor(request: LinearRequest, data: D.PushSubscriptionFragment) {
    this.id = data.id ?? undefined;
  }

  /** The unique identifier of the entity. */
  public id?: string;
}

/**
 * PushSubscriptionConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial PushSubscriptionConnectionFragment response data
 */
export class PushSubscriptionConnection {
  public constructor(request: LinearRequest, data: D.PushSubscriptionConnectionFragment) {
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new PushSubscription(request, node)) : undefined;
  }

  public nodes?: PushSubscription[];
  public pageInfo?: PageInfo;
}

/**
 * A user account.
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserAccountFragment response data
 */
export class UserAccount {
  public constructor(request: LinearRequest, data: D.UserAccountFragment) {
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.email = data.email ?? undefined;
    this.service = data.service ?? undefined;
    this.users = data.users ? data.users.map(node => new User(request, node)) : undefined;
  }

  /** The models identifier. */
  public id?: string;
  /** The user's name. */
  public name?: string;
  /** The user's email address. */
  public email?: string;
  /** The authentication service used to create the account. */
  public service?: string;
  /** Users belonging to the account. */
  public users?: User[];
}

/**
 * A recorded entry of a file uploaded by a user.
 *
 * @param request - function to call the graphql client
 * @param data - the initial FileUploadFragment response data
 */
export class FileUpload {
  private _request: LinearRequest;
  private _creator?: D.FileUploadFragment["creator"];

  public constructor(request: LinearRequest, data: D.FileUploadFragment) {
    this._request = request;
    this.id = data.id ?? undefined;
    this.assetUrl = data.assetUrl ?? undefined;
    this.contentType = data.contentType ?? undefined;
    this.filename = data.filename ?? undefined;
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
  /** Size of the uploaded file in bytes. */
  public size?: number;
  /** The user who uploaded the file. */
  public get creator(): Promise<D.User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The organization the upload belongs to. */
  public get organization(): Promise<D.Organization | undefined> {
    return new OrganizationQuery(this._request).fetch();
  }
}

/**
 * SynchronizedPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial SynchronizedPayloadFragment response data
 */
export class SynchronizedPayload {
  public constructor(request: LinearRequest, data: D.SynchronizedPayloadFragment) {
    this.lastSyncId = data.lastSyncId ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
}

/**
 * Public information of the OAuth application.
 *
 * @param request - function to call the graphql client
 * @param data - the initial ApplicationFragment response data
 */
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

/**
 * OrganizationDomainSimplePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationDomainSimplePayloadFragment response data
 */
export class OrganizationDomainSimplePayload {
  public constructor(request: LinearRequest, data: D.OrganizationDomainSimplePayloadFragment) {
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}
/**
 * Query {@link UserDocument} for {@link User}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link ViewerDocument} for {@link User}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link OrganizationDocument} for {@link Organization}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link OrganizationExistsDocument} for {@link OrganizationExistsPayload}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link SyncBootstrapDocument} for {@link SyncResponse}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link SyncUpdatesDocument} for {@link SyncResponse}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link ArchivedModelSyncDocument} for {@link ArchiveResponse}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link ArchivedModelsSyncDocument} for {@link ArchiveResponse}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link AdminUserAccountLookupDocument} for {@link UserAccountAdminPrivileged}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link UsersDocument} for {@link UserConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link ApiKeysDocument} for {@link ApiKeyConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link ApplicationWithAuthorizationDocument} for {@link UserAuthorizedApplication}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link AvailableUsersDocument} for {@link AuthResolverResponse}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link SsoUrlFromEmailDocument} for {@link SsoUrlFromEmailResponse}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link BillingDetailsDocument} for {@link BillingDetailsPayload}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link CollaborativeDocumentJoinDocument} for {@link CollaborationDocumentUpdatePayload}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link CommentDocument} for {@link Comment}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link CommentsDocument} for {@link CommentConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link CustomViewDocument} for {@link CustomView}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link CustomViewsDocument} for {@link CustomViewConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link CycleDocument} for {@link Cycle}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link CyclesDocument} for {@link CycleConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link EmojiDocument} for {@link Emoji}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link EmojisDocument} for {@link EmojiConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link FavoriteDocument} for {@link Favorite}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link FavoritesDocument} for {@link FavoriteConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link FigmaEmbedInfoDocument} for {@link FigmaEmbedPayload}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link IntegrationDocument} for {@link Integration}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link IntegrationsDocument} for {@link IntegrationConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link IntegrationResourceDocument} for {@link IntegrationResource}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link IntegrationResourcesDocument} for {@link IntegrationResourceConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link InviteInfoDocument} for {@link InvitePagePayload}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link IssueLabelDocument} for {@link IssueLabel}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link IssueLabelsDocument} for {@link IssueLabelConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link IssueRelationDocument} for {@link IssueRelation}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link IssueRelationsDocument} for {@link IssueRelationConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link IssueDocument} for {@link Issue}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link IssueSearchDocument} for {@link IssueConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link IssuesDocument} for {@link IssueConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link MilestoneDocument} for {@link Milestone}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link MilestonesDocument} for {@link MilestoneConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link NotificationDocument} for {@link UserSettings}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link NotificationsDocument} for {@link NotificationConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link NotificationSubscriptionDocument} for {@link NotificationSubscriptionConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link OrganizationInviteDocument} for {@link IssueLabel}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link OrganizationInvitesDocument} for {@link OrganizationInviteConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link ProjectLinkDocument} for {@link ProjectLink}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link ProjectLinksDocument} for {@link ProjectLinkConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link ProjectDocument} for {@link Project}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link ProjectsDocument} for {@link ProjectConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link PushSubscriptionTestDocument} for {@link PushSubscriptionPayload}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link ReactionDocument} for {@link Reaction}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link ReactionsDocument} for {@link ReactionConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link SubscriptionDocument} for {@link Subscription}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link TeamMembershipDocument} for {@link TeamMembership}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link TeamMembershipsDocument} for {@link TeamMembershipConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link TeamDocument} for {@link Team}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link TeamsDocument} for {@link TeamConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link TemplateDocument} for {@link Template}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link ViewPreferencesDocument} for {@link ViewPreferencesConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link WebhookDocument} for {@link Webhook}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link WebhooksDocument} for {@link WebhookConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link WorkflowStateDocument} for {@link WorkflowState}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Query {@link WorkflowStatesDocument} for {@link WorkflowStateConnection}
 *
 * @param request - function to call the graphql client
 */
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

/**
 * Mutation {@link UserUpdateDocument} for {@link UserPayload}
 *
 * @param request - function to call the graphql client
 */
export class UserUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.UpdateUserInput, id: string) {
    return this._request<D.UserUpdateMutation, D.UserUpdateMutationVariables>(D.UserUpdateDocument, { input, id }).then(
      response => {
        const data = response?.userUpdate;
        return data ? new UserPayload(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Mutation {@link UserPromoteAdminDocument} for {@link UserAdminPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new UserAdminPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link UserDemoteAdminDocument} for {@link UserAdminPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new UserAdminPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link UserSuspendDocument} for {@link UserAdminPayload}
 *
 * @param request - function to call the graphql client
 */
export class UserSuspendMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.UserSuspendMutation, D.UserSuspendMutationVariables>(D.UserSuspendDocument, { id }).then(
      response => {
        const data = response?.userSuspend;
        return data ? new UserAdminPayload(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Mutation {@link UserUnsuspendDocument} for {@link UserAdminPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new UserAdminPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OrganizationUpdateDocument} for {@link OrganizationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new OrganizationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OrganizationDeleteChallengeDocument} for {@link OrganizationDeletePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new OrganizationDeletePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OrganizationDeleteDocument} for {@link OrganizationDeletePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new OrganizationDeletePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link AdminDeleteIntegrationDocument} for {@link AdminIntegrationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new AdminIntegrationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OrganizationToggleAccessDocument} for {@link OrganizationAccessPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new OrganizationAccessPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OrganizationChangeEmailDomainDocument} for {@link OrganizationAccessPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new OrganizationAccessPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OrganizationToggleSamlEnabledDocument} for {@link OrganizationSamlConfigurePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new OrganizationSamlConfigurePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OrganizationConfigureSamlDocument} for {@link OrganizationSamlConfigurePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new OrganizationSamlConfigurePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link AdminCommandDocument} for {@link AdminCommandPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new AdminCommandPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link AdminBulkEmailDocument} for {@link AdminCommandPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new AdminCommandPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link AdminCreateStripeCustomerDocument} for {@link AdminCommandPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new AdminCommandPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link AdminScheduleAnonymousTaskDocument} for {@link AdminCommandPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new AdminCommandPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link AdminUserAccountChangeEmailDocument} for {@link UserAccountAdminPrivileged}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new UserAccountAdminPrivileged(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link EventCreateDocument} for {@link EventPayload}
 *
 * @param request - function to call the graphql client
 */
export class EventCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.EventCreateInput) {
    return this._request<D.EventCreateMutation, D.EventCreateMutationVariables>(D.EventCreateDocument, { input }).then(
      response => {
        const data = response?.eventCreate;
        return data ? new EventPayload(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Mutation {@link ApiKeyCreateDocument} for {@link ApiKeyPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ApiKeyPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link ApiKeyDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
export class ApiKeyDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.ApiKeyDeleteMutation, D.ApiKeyDeleteMutationVariables>(D.ApiKeyDeleteDocument, { id }).then(
      response => {
        const data = response?.apiKeyDelete;
        return data ? new ArchivePayload(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Mutation {@link EmailUserAccountAuthChallengeDocument} for {@link EmailUserAccountAuthChallengeResponse}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new EmailUserAccountAuthChallengeResponse(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link EmailTokenUserAccountAuthDocument} for {@link AuthResolverResponse}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new AuthResolverResponse(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link SamlTokenUserAccountAuthDocument} for {@link AuthResolverResponse}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new AuthResolverResponse(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link GoogleUserAccountAuthDocument} for {@link AuthResolverResponse}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new AuthResolverResponse(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link CreateOrganizationFromOnboardingDocument} for {@link CreateOrJoinOrganizationResponse}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new CreateOrJoinOrganizationResponse(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link JoinOrganizationFromOnboardingDocument} for {@link CreateOrJoinOrganizationResponse}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new CreateOrJoinOrganizationResponse(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link LeaveOrganizationDocument} for {@link CreateOrJoinOrganizationResponse}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new CreateOrJoinOrganizationResponse(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link BillingEmailUpdateDocument} for {@link BillingEmailPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new BillingEmailPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link CollaborativeDocumentUpdateDocument} for {@link CollaborationDocumentUpdatePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new CollaborationDocumentUpdatePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link CommentCreateDocument} for {@link CommentPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new CommentPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link CommentUpdateDocument} for {@link CommentPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new CommentPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link CommentDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link ContactCreateDocument} for {@link ContactPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ContactPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link CustomViewCreateDocument} for {@link CustomViewPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new CustomViewPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link CustomViewUpdateDocument} for {@link CustomViewPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new CustomViewPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link CustomViewDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link CycleCreateDocument} for {@link CyclePayload}
 *
 * @param request - function to call the graphql client
 */
export class CycleCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.CycleCreateInput) {
    return this._request<D.CycleCreateMutation, D.CycleCreateMutationVariables>(D.CycleCreateDocument, { input }).then(
      response => {
        const data = response?.cycleCreate;
        return data ? new CyclePayload(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Mutation {@link CycleUpdateDocument} for {@link CyclePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new CyclePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link CycleArchiveDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
export class CycleArchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.CycleArchiveMutation, D.CycleArchiveMutationVariables>(D.CycleArchiveDocument, { id }).then(
      response => {
        const data = response?.cycleArchive;
        return data ? new ArchivePayload(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Mutation {@link DebugFailWithInternalErrorDocument} for {@link DebugPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new DebugPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link DebugFailWithWarningDocument} for {@link DebugPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new DebugPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link DebugCreateSamlOrgDocument} for {@link DebugPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new DebugPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link EmailUnsubscribeDocument} for {@link EmailUnsubscribePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new EmailUnsubscribePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link EmojiCreateDocument} for {@link EmojiPayload}
 *
 * @param request - function to call the graphql client
 */
export class EmojiCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.EmojiCreateInput) {
    return this._request<D.EmojiCreateMutation, D.EmojiCreateMutationVariables>(D.EmojiCreateDocument, { input }).then(
      response => {
        const data = response?.emojiCreate;
        return data ? new EmojiPayload(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Mutation {@link EmojiDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
export class EmojiDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.EmojiDeleteMutation, D.EmojiDeleteMutationVariables>(D.EmojiDeleteDocument, { id }).then(
      response => {
        const data = response?.emojiDelete;
        return data ? new ArchivePayload(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Mutation {@link FavoriteCreateDocument} for {@link FavoritePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new FavoritePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link FavoriteUpdateDocument} for {@link FavoritePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new FavoritePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link FavoriteDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link FeedbackCreateDocument} for {@link FeedbackPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new FeedbackPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link FileUploadDocument} for {@link UploadPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new UploadPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link ImageUploadFromUrlDocument} for {@link ImageUploadFromUrlPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ImageUploadFromUrlPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IntegrationGithubConnectDocument} for {@link IntegrationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IntegrationGitlabConnectDocument} for {@link IntegrationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IntegrationSlackDocument} for {@link IntegrationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IntegrationSlackPersonalDocument} for {@link IntegrationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IntegrationSlackPostDocument} for {@link IntegrationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IntegrationSlackProjectPostDocument} for {@link IntegrationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IntegrationSlackImportEmojisDocument} for {@link IntegrationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IntegrationFigmaDocument} for {@link IntegrationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IntegrationGoogleSheetsDocument} for {@link IntegrationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link RefreshGoogleSheetsDataDocument} for {@link IntegrationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IntegrationSentryConnectDocument} for {@link IntegrationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IntegrationDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IntegrationResourceArchiveDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IssueLabelCreateDocument} for {@link IssueLabelPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueLabelPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IssueLabelUpdateDocument} for {@link IssueLabelPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueLabelPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IssueLabelArchiveDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IssueRelationCreateDocument} for {@link IssueRelationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueRelationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IssueRelationUpdateDocument} for {@link IssueRelationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueRelationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IssueRelationDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IssueCreateDocument} for {@link IssuePayload}
 *
 * @param request - function to call the graphql client
 */
export class IssueCreateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.IssueCreateInput) {
    return this._request<D.IssueCreateMutation, D.IssueCreateMutationVariables>(D.IssueCreateDocument, { input }).then(
      response => {
        const data = response?.issueCreate;
        return data ? new IssuePayload(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Mutation {@link IssueUpdateDocument} for {@link IssuePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssuePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link IssueArchiveDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
export class IssueArchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.IssueArchiveMutation, D.IssueArchiveMutationVariables>(D.IssueArchiveDocument, { id }).then(
      response => {
        const data = response?.issueArchive;
        return data ? new ArchivePayload(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Mutation {@link IssueUnarchiveDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link MilestoneCreateDocument} for {@link MilestonePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new MilestonePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link MilestoneUpdateDocument} for {@link MilestonePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new MilestonePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link MilestoneDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link NotificationCreateDocument} for {@link NotificationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new NotificationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link NotificationUpdateDocument} for {@link NotificationPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new NotificationPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link NotificationDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link NotificationArchiveDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link NotificationUnarchiveDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link NotificationSubscriptionCreateDocument} for {@link NotificationSubscriptionPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new NotificationSubscriptionPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link NotificationSubscriptionDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OauthClientCreateDocument} for {@link OauthClientPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new OauthClientPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OauthClientUpdateDocument} for {@link OauthClientPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new OauthClientPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OauthClientArchiveDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OauthClientRotateSecretDocument} for {@link RotateSecretPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new RotateSecretPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OauthTokenRevokeDocument} for {@link OauthTokenRevokePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new OauthTokenRevokePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OrganizationDomainVerifyDocument} for {@link OrganizationDomainPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new OrganizationDomainPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OrganizationDomainCreateDocument} for {@link OrganizationDomainPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new OrganizationDomainPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OrganizationDomainDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OrganizationInviteCreateDocument} for {@link OrganizationInvitePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new OrganizationInvitePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link ResentOrganizationInviteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link OrganizationInviteDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link ProjectLinkCreateDocument} for {@link ProjectLinkPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ProjectLinkPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link ProjectLinkDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link ProjectCreateDocument} for {@link ProjectPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ProjectPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link ProjectUpdateDocument} for {@link ProjectPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ProjectPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link ProjectArchiveDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link PushSubscriptionCreateDocument} for {@link PushSubscriptionPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new PushSubscriptionPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link PushSubscriptionDeleteDocument} for {@link PushSubscriptionPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new PushSubscriptionPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link ReactionCreateDocument} for {@link ReactionPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ReactionPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link ReactionDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link CreateCsvExportReportDocument} for {@link CreateCsvExportReportPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new CreateCsvExportReportPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link SubscriptionSessionCreateDocument} for {@link SubscriptionSessionPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new SubscriptionSessionPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link SubscriptionUpdateSessionCreateDocument} for {@link SubscriptionSessionPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new SubscriptionSessionPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link SubscriptionUpdateDocument} for {@link SubscriptionPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new SubscriptionPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link SubscriptionUpgradeDocument} for {@link SubscriptionPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new SubscriptionPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link SubscriptionArchiveDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link TeamMembershipCreateDocument} for {@link TeamMembershipPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new TeamMembershipPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link TeamMembershipDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link TeamCreateDocument} for {@link TeamPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new TeamPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link TeamUpdateDocument} for {@link TeamPayload}
 *
 * @param request - function to call the graphql client
 */
export class TeamUpdateMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(input: D.TeamUpdateInput, id: string) {
    return this._request<D.TeamUpdateMutation, D.TeamUpdateMutationVariables>(D.TeamUpdateDocument, { input, id }).then(
      response => {
        const data = response?.teamUpdate;
        return data ? new TeamPayload(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Mutation {@link TeamArchiveDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
export class TeamArchiveMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.TeamArchiveMutation, D.TeamArchiveMutationVariables>(D.TeamArchiveDocument, { id }).then(
      response => {
        const data = response?.teamArchive;
        return data ? new ArchivePayload(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Mutation {@link TeamDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
export class TeamDeleteMutation {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(id: string) {
    return this._request<D.TeamDeleteMutation, D.TeamDeleteMutationVariables>(D.TeamDeleteDocument, { id }).then(
      response => {
        const data = response?.teamDelete;
        return data ? new ArchivePayload(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Mutation {@link TemplateCreateDocument} for {@link TemplatePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new TemplatePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link TemplateUpdateDocument} for {@link TemplatePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new TemplatePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link TemplateDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link UserSettingsUpdateDocument} for {@link UserSettingsPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new UserSettingsPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link UserSettingsFlagIncrementDocument} for {@link UserSettingsFlagPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new UserSettingsFlagPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link UserSettingsFlagsResetDocument} for {@link UserSettingsFlagsResetPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new UserSettingsFlagsResetPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link UserFlagUpdateDocument} for {@link UserSettingsFlagPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new UserSettingsFlagPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link UserSubscribeToNewsletterDocument} for {@link UserSubscribeToNewsletterPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new UserSubscribeToNewsletterPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link ViewPreferencesCreateDocument} for {@link ViewPreferencesPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ViewPreferencesPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link ViewPreferencesUpdateDocument} for {@link ViewPreferencesPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ViewPreferencesPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link ViewPreferencesDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link WebhookCreateDocument} for {@link WebhookPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new WebhookPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link WebhookUpdateDocument} for {@link WebhookPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new WebhookPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link WebhookDeleteDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link WorkflowStateCreateDocument} for {@link WorkflowStatePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new WorkflowStatePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link WorkflowStateUpdateDocument} for {@link WorkflowStatePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new WorkflowStatePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation {@link WorkflowStateArchiveDocument} for {@link ArchivePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link User_AssignedIssuesDocument} for {@link IssueConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link User_CreatedIssuesDocument} for {@link IssueConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link User_TeamMembershipsDocument} for {@link TeamMembershipConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new TeamMembershipConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Viewer_AssignedIssuesDocument} for {@link IssueConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Viewer_CreatedIssuesDocument} for {@link IssueConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Viewer_TeamMembershipsDocument} for {@link TeamMembershipConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new TeamMembershipConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Organization_UsersDocument} for {@link UserConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new UserConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Organization_TeamsDocument} for {@link TeamConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new TeamConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Organization_MilestonesDocument} for {@link MilestoneConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new MilestoneConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Organization_IntegrationsDocument} for {@link IntegrationConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link BillingDetails_PaymentMethodDocument} for {@link Card}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new Card(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link CollaborativeDocumentJoin_StepsDocument} for {@link StepsResponse}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new StepsResponse(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Cycle_IssuesDocument} for {@link IssueConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Cycle_UncompletedIssuesUponCloseDocument} for {@link IssueConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link FigmaEmbedInfo_FigmaEmbedDocument} for {@link FigmaEmbed}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new FigmaEmbed(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Integration_SettingsDocument} for {@link IntegrationSettings}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationSettings(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Integration_Settings_SlackPostDocument} for {@link SlackPostSettings}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new SlackPostSettings(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Integration_Settings_SlackProjectPostDocument} for {@link SlackPostSettings}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new SlackPostSettings(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Integration_Settings_GoogleSheetsDocument} for {@link GoogleSheetsSettings}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new GoogleSheetsSettings(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Integration_Settings_SentryDocument} for {@link SentrySettings}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new SentrySettings(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link IntegrationResource_DataDocument} for {@link IntegrationResourceData}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationResourceData(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link IntegrationResource_PullRequestDocument} for {@link PullRequestPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new PullRequestPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link IntegrationResource_Data_GithubPullRequestDocument} for {@link PullRequestPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new PullRequestPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link IntegrationResource_Data_GitlabMergeRequestDocument} for {@link PullRequestPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new PullRequestPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link IntegrationResource_Data_GithubCommitDocument} for {@link CommitPayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new CommitPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link IntegrationResource_Data_SentryIssueDocument} for {@link SentryIssuePayload}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new SentryIssuePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link InviteInfo_InviteDataDocument} for {@link InviteData}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new InviteData(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link IssueLabel_IssuesDocument} for {@link IssueConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Issue_SubscribersDocument} for {@link UserConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new UserConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Issue_ChildrenDocument} for {@link IssueConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Issue_CommentsDocument} for {@link CommentConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new CommentConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Issue_HistoryDocument} for {@link IssueHistoryConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueHistoryConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Issue_LabelsDocument} for {@link IssueLabelConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueLabelConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Issue_IntegrationResourcesDocument} for {@link IntegrationResourceConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IntegrationResourceConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Issue_RelationsDocument} for {@link IssueRelationConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueRelationConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Issue_InverseRelationsDocument} for {@link IssueRelationConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueRelationConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Milestone_ProjectsDocument} for {@link ProjectConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ProjectConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link OrganizationInvite_IssuesDocument} for {@link IssueConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Project_TeamsDocument} for {@link TeamConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new TeamConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Project_MembersDocument} for {@link UserConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new UserConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Project_IssuesDocument} for {@link IssueConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Project_LinksDocument} for {@link ProjectLinkConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ProjectLinkConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Team_IssuesDocument} for {@link IssueConnection}
 *
 * @param request - function to call the graphql client
 */
export class Team_IssuesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Team_IssuesQueryVariables, "id">) {
    return this._request<D.Team_IssuesQuery, D.Team_IssuesQueryVariables>(D.Team_IssuesDocument, { id, ...vars }).then(
      response => {
        const data = response?.team?.issues;
        return data ? new IssueConnection(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Query {@link Team_CyclesDocument} for {@link CycleConnection}
 *
 * @param request - function to call the graphql client
 */
export class Team_CyclesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Team_CyclesQueryVariables, "id">) {
    return this._request<D.Team_CyclesQuery, D.Team_CyclesQueryVariables>(D.Team_CyclesDocument, { id, ...vars }).then(
      response => {
        const data = response?.team?.cycles;
        return data ? new CycleConnection(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Query {@link Team_MembershipsDocument} for {@link TeamMembershipConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new TeamMembershipConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Team_ProjectsDocument} for {@link ProjectConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new ProjectConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Team_StatesDocument} for {@link WorkflowStateConnection}
 *
 * @param request - function to call the graphql client
 */
export class Team_StatesQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Team_StatesQueryVariables, "id">) {
    return this._request<D.Team_StatesQuery, D.Team_StatesQueryVariables>(D.Team_StatesDocument, { id, ...vars }).then(
      response => {
        const data = response?.team?.states;
        return data ? new WorkflowStateConnection(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Query {@link Team_TemplatesDocument} for {@link TemplateConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new TemplateConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link Team_LabelsDocument} for {@link IssueLabelConnection}
 *
 * @param request - function to call the graphql client
 */
export class Team_LabelsQuery {
  private _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }

  public async fetch(vars?: Omit<D.Team_LabelsQueryVariables, "id">) {
    return this._request<D.Team_LabelsQuery, D.Team_LabelsQueryVariables>(D.Team_LabelsDocument, { id, ...vars }).then(
      response => {
        const data = response?.team?.labels;
        return data ? new IssueLabelConnection(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Query {@link Team_WebhooksDocument} for {@link WebhookConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new WebhookConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query {@link WorkflowState_IssuesDocument} for {@link IssueConnection}
 *
 * @param request - function to call the graphql client
 */
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
      return data ? new IssueConnection(this._request, data) : undefined;
    });
  }
}
