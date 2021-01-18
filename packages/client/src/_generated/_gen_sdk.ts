/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocumentNode } from "graphql";
import * as D from "./_gen_documents";

/** The function type for calling the graphql client */
export type Request = <R, V>(doc: DocumentNode, vars?: V) => Promise<R>;

/**
 * Base class to provide a request function
 *
 * @param request - function to call the graphql client
 */
class LinearRequest {
  public constructor(request: Request) {
    this.request = request;
  }

  protected request: Request;
}

/**
 * A user that has access to the the resources of an organization.
 *
 * @param request - function to call the graphql client
 * @param data - UserFragment response data
 */
class User extends LinearRequest {
  public constructor(request: Request, data: D.UserFragment) {
    super(request);
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
    return new NotificationQuery(this.request).fetch();
  }
  /** Organization in which the user belongs to. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this.request).fetch();
  }
  /** Issues assigned to the user. */
  public assignedIssues(vars?: Omit<D.User_AssignedIssuesQueryVariables, "id" | "id">) {
    return this.id ? new User_AssignedIssuesQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Issues created by the user. */
  public createdIssues(vars?: Omit<D.User_CreatedIssuesQueryVariables, "id" | "id">) {
    return this.id ? new User_CreatedIssuesQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Memberships associated with the user. */
  public teamMemberships(vars?: Omit<D.User_TeamMembershipsQueryVariables, "id" | "id">) {
    return this.id ? new User_TeamMembershipsQuery(this.request, this.id).fetch(vars) : undefined;
  }
}

/**
 * The settings of a user as a JSON object.
 *
 * @param request - function to call the graphql client
 * @param data - UserSettingsFragment response data
 */
class UserSettings extends LinearRequest {
  private _user?: D.UserSettingsFragment["user"];

  public constructor(request: Request, data: D.UserSettingsFragment) {
    super(request);
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
    return this._user?.id ? new UserQuery(this.request).fetch(this._user?.id) : undefined;
  }
}

/**
 * IssueConnection model
 *
 * @param request - function to call the graphql client
 * @param data - IssueConnectionFragment response data
 */
class IssueConnection extends LinearRequest {
  public constructor(request: Request, data: D.IssueConnectionFragment) {
    super(request);
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
 * @param data - IssueFragment response data
 */
class Issue extends LinearRequest {
  private _team?: D.IssueFragment["team"];
  private _cycle?: D.IssueFragment["cycle"];
  private _state?: D.IssueFragment["state"];
  private _assignee?: D.IssueFragment["assignee"];
  private _parent?: D.IssueFragment["parent"];
  private _project?: D.IssueFragment["project"];
  private _creator?: D.IssueFragment["creator"];

  public constructor(request: Request, data: D.IssueFragment) {
    super(request);
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
    return this._team?.id ? new TeamQuery(this.request).fetch(this._team?.id) : undefined;
  }
  /** The cycle that the issue is associated with. */
  public get cycle(): Promise<Cycle | undefined> | undefined {
    return this._cycle?.id ? new CycleQuery(this.request).fetch(this._cycle?.id) : undefined;
  }
  /** The workflow state that the issue is associated with. */
  public get state(): Promise<WorkflowState | undefined> | undefined {
    return this._state?.id ? new WorkflowStateQuery(this.request).fetch(this._state?.id) : undefined;
  }
  /** The user to whom the issue is assigned to. */
  public get assignee(): Promise<User | undefined> | undefined {
    return this._assignee?.id ? new UserQuery(this.request).fetch(this._assignee?.id) : undefined;
  }
  /** The parent of the issue. */
  public get parent(): Promise<Issue | undefined> | undefined {
    return this._parent?.id ? new IssueQuery(this.request).fetch(this._parent?.id) : undefined;
  }
  /** The project that the issue is associated with. */
  public get project(): Promise<Project | undefined> | undefined {
    return this._project?.id ? new ProjectQuery(this.request).fetch(this._project?.id) : undefined;
  }
  /** The user who created the issue. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this.request).fetch(this._creator?.id) : undefined;
  }
  /** Users who are subscribed to the issue. */
  public subscribers(vars?: Omit<D.Issue_SubscribersQueryVariables, "id" | "id">) {
    return this.id ? new Issue_SubscribersQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Children of the issue. */
  public children(vars?: Omit<D.Issue_ChildrenQueryVariables, "id" | "id">) {
    return this.id ? new Issue_ChildrenQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Comments associated with the issue. */
  public comments(vars?: Omit<D.Issue_CommentsQueryVariables, "id" | "id">) {
    return this.id ? new Issue_CommentsQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** History entries associated with the issue. */
  public history(vars?: Omit<D.Issue_HistoryQueryVariables, "id" | "id">) {
    return this.id ? new Issue_HistoryQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Labels associated with this issue. */
  public labels(vars?: Omit<D.Issue_LabelsQueryVariables, "id" | "id">) {
    return this.id ? new Issue_LabelsQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Integration resources for this issue. */
  public integrationResources(vars?: Omit<D.Issue_IntegrationResourcesQueryVariables, "id" | "id">) {
    return this.id ? new Issue_IntegrationResourcesQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Relations associated with this issue. */
  public relations(vars?: Omit<D.Issue_RelationsQueryVariables, "id" | "id">) {
    return this.id ? new Issue_RelationsQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Inverse relations associated with this issue. */
  public inverseRelations(vars?: Omit<D.Issue_InverseRelationsQueryVariables, "id" | "id">) {
    return this.id ? new Issue_InverseRelationsQuery(this.request, this.id).fetch(vars) : undefined;
  }
}

/**
 * An organizational unit that contains issues.
 *
 * @param request - function to call the graphql client
 * @param data - TeamFragment response data
 */
class Team extends LinearRequest {
  private _draftWorkflowState?: D.TeamFragment["draftWorkflowState"];
  private _startWorkflowState?: D.TeamFragment["startWorkflowState"];
  private _reviewWorkflowState?: D.TeamFragment["reviewWorkflowState"];
  private _mergeWorkflowState?: D.TeamFragment["mergeWorkflowState"];
  private _markedAsDuplicateWorkflowState?: D.TeamFragment["markedAsDuplicateWorkflowState"];
  private _activeCycle?: D.TeamFragment["activeCycle"];

  public constructor(request: Request, data: D.TeamFragment) {
    super(request);
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
      ? new WorkflowStateQuery(this.request).fetch(this._draftWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when a PR has been opened. */
  public get startWorkflowState(): Promise<WorkflowState | undefined> | undefined {
    return this._startWorkflowState?.id
      ? new WorkflowStateQuery(this.request).fetch(this._startWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when a review has been requested for the PR. */
  public get reviewWorkflowState(): Promise<WorkflowState | undefined> | undefined {
    return this._reviewWorkflowState?.id
      ? new WorkflowStateQuery(this.request).fetch(this._reviewWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when a PR has been merged. */
  public get mergeWorkflowState(): Promise<WorkflowState | undefined> | undefined {
    return this._mergeWorkflowState?.id
      ? new WorkflowStateQuery(this.request).fetch(this._mergeWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when they are marked as a duplicate of another issue. Defaults to the first canceled state. */
  public get markedAsDuplicateWorkflowState(): Promise<WorkflowState | undefined> | undefined {
    return this._markedAsDuplicateWorkflowState?.id
      ? new WorkflowStateQuery(this.request).fetch(this._markedAsDuplicateWorkflowState?.id)
      : undefined;
  }
  /** Team's currently active cycle. */
  public get activeCycle(): Promise<Cycle | undefined> | undefined {
    return this._activeCycle?.id ? new CycleQuery(this.request).fetch(this._activeCycle?.id) : undefined;
  }
  /** The organization that the team is associated with. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this.request).fetch();
  }
  /** Issues associated with the team. */
  public issues(vars?: Omit<D.Team_IssuesQueryVariables, "id" | "id">) {
    return this.id ? new Team_IssuesQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Cycles associated with the team. */
  public cycles(vars?: Omit<D.Team_CyclesQueryVariables, "id" | "id">) {
    return this.id ? new Team_CyclesQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Memberships associated with the team. */
  public memberships(vars?: Omit<D.Team_MembershipsQueryVariables, "id" | "id">) {
    return this.id ? new Team_MembershipsQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Projects associated with the team. */
  public projects(vars?: Omit<D.Team_ProjectsQueryVariables, "id" | "id">) {
    return this.id ? new Team_ProjectsQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** The states that define the workflow associated with the team. */
  public states(vars?: Omit<D.Team_StatesQueryVariables, "id" | "id">) {
    return this.id ? new Team_StatesQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Templates associated with the team. */
  public templates(vars?: Omit<D.Team_TemplatesQueryVariables, "id" | "id">) {
    return this.id ? new Team_TemplatesQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Labels associated with the team. */
  public labels(vars?: Omit<D.Team_LabelsQueryVariables, "id" | "id">) {
    return this.id ? new Team_LabelsQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Webhooks associated with the team. */
  public webhooks(vars?: Omit<D.Team_WebhooksQueryVariables, "id" | "id">) {
    return this.id ? new Team_WebhooksQuery(this.request, this.id).fetch(vars) : undefined;
  }
}

/**
 * A state in a team workflow.
 *
 * @param request - function to call the graphql client
 * @param data - WorkflowStateFragment response data
 */
class WorkflowState extends LinearRequest {
  private _team?: D.WorkflowStateFragment["team"];

  public constructor(request: Request, data: D.WorkflowStateFragment) {
    super(request);
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
    return this._team?.id ? new TeamQuery(this.request).fetch(this._team?.id) : undefined;
  }
  /** Issues belonging in this state. */
  public issues(vars?: Omit<D.WorkflowState_IssuesQueryVariables, "id" | "id">) {
    return this.id ? new WorkflowState_IssuesQuery(this.request, this.id).fetch(vars) : undefined;
  }
}

/**
 * CycleConnection model
 *
 * @param request - function to call the graphql client
 * @param data - CycleConnectionFragment response data
 */
class CycleConnection extends LinearRequest {
  public constructor(request: Request, data: D.CycleConnectionFragment) {
    super(request);
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
 * @param data - CycleFragment response data
 */
class Cycle extends LinearRequest {
  private _team?: D.CycleFragment["team"];

  public constructor(request: Request, data: D.CycleFragment) {
    super(request);
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
    return this._team?.id ? new TeamQuery(this.request).fetch(this._team?.id) : undefined;
  }
  /** Issues associated with the cycle. */
  public issues(vars?: Omit<D.Cycle_IssuesQueryVariables, "id" | "id">) {
    return this.id ? new Cycle_IssuesQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Issues that weren't completed when the cycle was closed. */
  public uncompletedIssuesUponClose(vars?: Omit<D.Cycle_UncompletedIssuesUponCloseQueryVariables, "id" | "id">) {
    return this.id ? new Cycle_UncompletedIssuesUponCloseQuery(this.request, this.id).fetch(vars) : undefined;
  }
}

/**
 * PageInfo model
 *
 * @param request - function to call the graphql client
 * @param data - PageInfoFragment response data
 */
class PageInfo extends LinearRequest {
  public constructor(request: Request, data: D.PageInfoFragment) {
    super(request);
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
 * @param data - TeamMembershipConnectionFragment response data
 */
class TeamMembershipConnection extends LinearRequest {
  public constructor(request: Request, data: D.TeamMembershipConnectionFragment) {
    super(request);
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
 * @param data - TeamMembershipFragment response data
 */
class TeamMembership extends LinearRequest {
  private _user?: D.TeamMembershipFragment["user"];
  private _team?: D.TeamMembershipFragment["team"];

  public constructor(request: Request, data: D.TeamMembershipFragment) {
    super(request);
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
    return this._user?.id ? new UserQuery(this.request).fetch(this._user?.id) : undefined;
  }
  /** The team that the membership is associated with. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this.request).fetch(this._team?.id) : undefined;
  }
}

/**
 * ProjectConnection model
 *
 * @param request - function to call the graphql client
 * @param data - ProjectConnectionFragment response data
 */
class ProjectConnection extends LinearRequest {
  public constructor(request: Request, data: D.ProjectConnectionFragment) {
    super(request);
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
 * @param data - ProjectFragment response data
 */
class Project extends LinearRequest {
  private _creator?: D.ProjectFragment["creator"];
  private _lead?: D.ProjectFragment["lead"];
  private _milestone?: D.ProjectFragment["milestone"];

  public constructor(request: Request, data: D.ProjectFragment) {
    super(request);
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
    return this._creator?.id ? new UserQuery(this.request).fetch(this._creator?.id) : undefined;
  }
  /** The project lead. */
  public get lead(): Promise<User | undefined> | undefined {
    return this._lead?.id ? new UserQuery(this.request).fetch(this._lead?.id) : undefined;
  }
  /** The milestone that this project is associated with. */
  public get milestone(): Promise<Milestone | undefined> | undefined {
    return this._milestone?.id ? new MilestoneQuery(this.request).fetch(this._milestone?.id) : undefined;
  }
  /** Teams associated with this project. */
  public teams(vars?: Omit<D.Project_TeamsQueryVariables, "id" | "id">) {
    return this.id ? new Project_TeamsQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Users that are members of the project. */
  public members(vars?: Omit<D.Project_MembersQueryVariables, "id" | "id">) {
    return this.id ? new Project_MembersQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Issues associated with the project. */
  public issues(vars?: Omit<D.Project_IssuesQueryVariables, "id" | "id">) {
    return this.id ? new Project_IssuesQuery(this.request, this.id).fetch(vars) : undefined;
  }
  /** Links associated with the project. */
  public links(vars?: Omit<D.Project_LinksQueryVariables, "id" | "id">) {
    return this.id ? new Project_LinksQuery(this.request, this.id).fetch(vars) : undefined;
  }
}

/**
 * A milestone that contains projects.
 *
 * @param request - function to call the graphql client
 * @param data - MilestoneFragment response data
 */
class Milestone extends LinearRequest {
  public constructor(request: Request, data: D.MilestoneFragment) {
    super(request);
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
    return new OrganizationQuery(this.request).fetch();
  }
  /** Projects associated with the milestone. */
  public projects(vars?: Omit<D.Milestone_ProjectsQueryVariables, "id" | "id">) {
    return this.id ? new Milestone_ProjectsQuery(this.request, this.id).fetch(vars) : undefined;
  }
}

/**
 * An organization. Organizations are root-level objects that contain user accounts and teams.
 *
 * @param request - function to call the graphql client
 * @param data - OrganizationFragment response data
 */
class Organization extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationFragment) {
    super(request);
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
    return new SubscriptionQuery(this.request).fetch();
  }
  /** Users associated with the organization. */
  public users(vars?: D.Organization_UsersQueryVariables) {
    return new Organization_UsersQuery(this.request).fetch(vars);
  }
  /** Teams associated with the organization. */
  public teams(vars?: D.Organization_TeamsQueryVariables) {
    return new Organization_TeamsQuery(this.request).fetch(vars);
  }
  /** Milestones associated with the organization. */
  public milestones(vars?: D.Organization_MilestonesQueryVariables) {
    return new Organization_MilestonesQuery(this.request).fetch(vars);
  }
  /** Integrations associated with the organization. */
  public integrations(vars?: D.Organization_IntegrationsQueryVariables) {
    return new Organization_IntegrationsQuery(this.request).fetch(vars);
  }
}

/**
 * UserConnection model
 *
 * @param request - function to call the graphql client
 * @param data - UserConnectionFragment response data
 */
class UserConnection extends LinearRequest {
  public constructor(request: Request, data: D.UserConnectionFragment) {
    super(request);
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
 * @param data - TeamConnectionFragment response data
 */
class TeamConnection extends LinearRequest {
  public constructor(request: Request, data: D.TeamConnectionFragment) {
    super(request);
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
 * @param data - MilestoneConnectionFragment response data
 */
class MilestoneConnection extends LinearRequest {
  public constructor(request: Request, data: D.MilestoneConnectionFragment) {
    super(request);
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
 * @param data - IntegrationConnectionFragment response data
 */
class IntegrationConnection extends LinearRequest {
  public constructor(request: Request, data: D.IntegrationConnectionFragment) {
    super(request);
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
 * @param data - IntegrationFragment response data
 */
class Integration extends LinearRequest {
  private _team?: D.IntegrationFragment["team"];
  private _creator?: D.IntegrationFragment["creator"];

  public constructor(request: Request, data: D.IntegrationFragment) {
    super(request);
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
    return new OrganizationQuery(this.request).fetch();
  }
  /** The team that the integration is associated with. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this.request).fetch(this._team?.id) : undefined;
  }
  /** The user that added the integration. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this.request).fetch(this._creator?.id) : undefined;
  }
  /** Settings related to the integration. */
  public get settings() {
    return this.id ? new Integration_SettingsQuery(this.request, this.id).fetch() : undefined;
  }
}

/**
 * The integration resource's settings
 *
 * @param request - function to call the graphql client
 * @param data - IntegrationSettingsFragment response data
 */
class IntegrationSettings extends LinearRequest {
  public constructor(request: Request, data: D.IntegrationSettingsFragment) {
    super(request);
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
 * @param data - SlackPostSettingsFragment response data
 */
class SlackPostSettings extends LinearRequest {
  public constructor(request: Request, data: D.SlackPostSettingsFragment) {
    super(request);
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
 * @param data - GoogleSheetsSettingsFragment response data
 */
class GoogleSheetsSettings extends LinearRequest {
  public constructor(request: Request, data: D.GoogleSheetsSettingsFragment) {
    super(request);
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

/**
 * Sentry specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - SentrySettingsFragment response data
 */
class SentrySettings extends LinearRequest {
  public constructor(request: Request, data: D.SentrySettingsFragment) {
    super(request);
    this.organizationSlug = data.organizationSlug ?? undefined;
  }

  /** The slug of the Sentry organization being connected. */
  public organizationSlug?: string;
}

/**
 * The subscription of an organization.
 *
 * @param request - function to call the graphql client
 * @param data - SubscriptionFragment response data
 */
class Subscription extends LinearRequest {
  private _creator?: D.SubscriptionFragment["creator"];

  public constructor(request: Request, data: D.SubscriptionFragment) {
    super(request);
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
    return this._creator?.id ? new UserQuery(this.request).fetch(this._creator?.id) : undefined;
  }
  /** The organization that the subscription is associated with. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this.request).fetch();
  }
}

/**
 * ProjectLinkConnection model
 *
 * @param request - function to call the graphql client
 * @param data - ProjectLinkConnectionFragment response data
 */
class ProjectLinkConnection extends LinearRequest {
  public constructor(request: Request, data: D.ProjectLinkConnectionFragment) {
    super(request);
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
 * @param data - ProjectLinkFragment response data
 */
class ProjectLink extends LinearRequest {
  private _creator?: D.ProjectLinkFragment["creator"];
  private _project?: D.ProjectLinkFragment["project"];

  public constructor(request: Request, data: D.ProjectLinkFragment) {
    super(request);
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
    return this._creator?.id ? new UserQuery(this.request).fetch(this._creator?.id) : undefined;
  }
  /** The project that the link is associated with. */
  public get project(): Promise<Project | undefined> | undefined {
    return this._project?.id ? new ProjectQuery(this.request).fetch(this._project?.id) : undefined;
  }
}

/**
 * WorkflowStateConnection model
 *
 * @param request - function to call the graphql client
 * @param data - WorkflowStateConnectionFragment response data
 */
class WorkflowStateConnection extends LinearRequest {
  public constructor(request: Request, data: D.WorkflowStateConnectionFragment) {
    super(request);
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
 * @param data - TemplateConnectionFragment response data
 */
class TemplateConnection extends LinearRequest {
  public constructor(request: Request, data: D.TemplateConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
  }

  public pageInfo?: PageInfo;
  public get nodes(): Promise<Template[] | undefined> {
    return new TemplatesQuery(this.request).fetch();
  }
}

/**
 * A template object used for creating new issues faster.
 *
 * @param request - function to call the graphql client
 * @param data - TemplateFragment response data
 */
class Template extends LinearRequest {
  private _team?: D.TemplateFragment["team"];
  private _creator?: D.TemplateFragment["creator"];

  public constructor(request: Request, data: D.TemplateFragment) {
    super(request);
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
    return this._team?.id ? new TeamQuery(this.request).fetch(this._team?.id) : undefined;
  }
  /** The user who created the template. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this.request).fetch(this._creator?.id) : undefined;
  }
}

/**
 * IssueLabelConnection model
 *
 * @param request - function to call the graphql client
 * @param data - IssueLabelConnectionFragment response data
 */
class IssueLabelConnection extends LinearRequest {
  public constructor(request: Request, data: D.IssueLabelConnectionFragment) {
    super(request);
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
 * @param data - IssueLabelFragment response data
 */
class IssueLabel extends LinearRequest {
  private _team?: D.IssueLabelFragment["team"];
  private _creator?: D.IssueLabelFragment["creator"];

  public constructor(request: Request, data: D.IssueLabelFragment) {
    super(request);
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
    return this._team?.id ? new TeamQuery(this.request).fetch(this._team?.id) : undefined;
  }
  /** The user who created the label. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this.request).fetch(this._creator?.id) : undefined;
  }
  /** Issues associated with the label. */
  public issues(vars?: Omit<D.IssueLabel_IssuesQueryVariables, "id" | "id">) {
    return this.id ? new IssueLabel_IssuesQuery(this.request, this.id).fetch(vars) : undefined;
  }
}

/**
 * WebhookConnection model
 *
 * @param request - function to call the graphql client
 * @param data - WebhookConnectionFragment response data
 */
class WebhookConnection extends LinearRequest {
  public constructor(request: Request, data: D.WebhookConnectionFragment) {
    super(request);
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
 * @param data - WebhookFragment response data
 */
class Webhook extends LinearRequest {
  private _team?: D.WebhookFragment["team"];
  private _creator?: D.WebhookFragment["creator"];

  public constructor(request: Request, data: D.WebhookFragment) {
    super(request);
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
    return this._team?.id ? new TeamQuery(this.request).fetch(this._team?.id) : undefined;
  }
  /** The user who created the webhook. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this.request).fetch(this._creator?.id) : undefined;
  }
}

/**
 * CommentConnection model
 *
 * @param request - function to call the graphql client
 * @param data - CommentConnectionFragment response data
 */
class CommentConnection extends LinearRequest {
  public constructor(request: Request, data: D.CommentConnectionFragment) {
    super(request);
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
 * @param data - CommentFragment response data
 */
class Comment extends LinearRequest {
  private _user?: D.CommentFragment["user"];
  private _issue?: D.CommentFragment["issue"];

  public constructor(request: Request, data: D.CommentFragment) {
    super(request);
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
    return this._user?.id ? new UserQuery(this.request).fetch(this._user?.id) : undefined;
  }
  /** The issue that the comment is associated with. */
  public get issue(): Promise<Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this.request).fetch(this._issue?.id) : undefined;
  }
}

/**
 * IssueHistoryConnection model
 *
 * @param request - function to call the graphql client
 * @param data - IssueHistoryConnectionFragment response data
 */
class IssueHistoryConnection extends LinearRequest {
  public constructor(request: Request, data: D.IssueHistoryConnectionFragment) {
    super(request);
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
 * @param data - IssueHistoryFragment response data
 */
class IssueHistory extends LinearRequest {
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

  public constructor(request: Request, data: D.IssueHistoryFragment) {
    super(request);
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
    return this._issue?.id ? new IssueQuery(this.request).fetch(this._issue?.id) : undefined;
  }
  /** The user who made these changes. If null, possibly means that the change made by an integration. */
  public get actor(): Promise<User | undefined> | undefined {
    return this._actor?.id ? new UserQuery(this.request).fetch(this._actor?.id) : undefined;
  }
  /** The integration that made these changes. If null, possibly means that the change was made by a user. */
  public get integration(): Promise<Integration | undefined> | undefined {
    return this._integration?.id ? new IntegrationQuery(this.request).fetch(this._integration?.id) : undefined;
  }
  /** The user from whom the issue was re-assigned from. */
  public get fromAssignee(): Promise<User | undefined> | undefined {
    return this._fromAssignee?.id ? new UserQuery(this.request).fetch(this._fromAssignee?.id) : undefined;
  }
  /** The user to whom the issue was assigned to. */
  public get toAssignee(): Promise<User | undefined> | undefined {
    return this._toAssignee?.id ? new UserQuery(this.request).fetch(this._toAssignee?.id) : undefined;
  }
  /** The team from which the issue was moved from. */
  public get fromTeam(): Promise<Team | undefined> | undefined {
    return this._fromTeam?.id ? new TeamQuery(this.request).fetch(this._fromTeam?.id) : undefined;
  }
  /** The team to which the issue was moved to. */
  public get toTeam(): Promise<Team | undefined> | undefined {
    return this._toTeam?.id ? new TeamQuery(this.request).fetch(this._toTeam?.id) : undefined;
  }
  /** The previous parent of the issue. */
  public get fromParent(): Promise<Issue | undefined> | undefined {
    return this._fromParent?.id ? new IssueQuery(this.request).fetch(this._fromParent?.id) : undefined;
  }
  /** The new parent of the issue. */
  public get toParent(): Promise<Issue | undefined> | undefined {
    return this._toParent?.id ? new IssueQuery(this.request).fetch(this._toParent?.id) : undefined;
  }
  /** The previous workflow state of the issue. */
  public get fromState(): Promise<WorkflowState | undefined> | undefined {
    return this._fromState?.id ? new WorkflowStateQuery(this.request).fetch(this._fromState?.id) : undefined;
  }
  /** The new workflow state of the issue. */
  public get toState(): Promise<WorkflowState | undefined> | undefined {
    return this._toState?.id ? new WorkflowStateQuery(this.request).fetch(this._toState?.id) : undefined;
  }
  /** The previous cycle of the issue. */
  public get fromCycle(): Promise<Cycle | undefined> | undefined {
    return this._fromCycle?.id ? new CycleQuery(this.request).fetch(this._fromCycle?.id) : undefined;
  }
  /** The new cycle of the issue. */
  public get toCycle(): Promise<Cycle | undefined> | undefined {
    return this._toCycle?.id ? new CycleQuery(this.request).fetch(this._toCycle?.id) : undefined;
  }
  /** The previous project of the issue. */
  public get fromProject(): Promise<Project | undefined> | undefined {
    return this._fromProject?.id ? new ProjectQuery(this.request).fetch(this._fromProject?.id) : undefined;
  }
  /** The new project of the issue. */
  public get toProject(): Promise<Project | undefined> | undefined {
    return this._toProject?.id ? new ProjectQuery(this.request).fetch(this._toProject?.id) : undefined;
  }
}

/**
 * IntegrationResourceConnection model
 *
 * @param request - function to call the graphql client
 * @param data - IntegrationResourceConnectionFragment response data
 */
class IntegrationResourceConnection extends LinearRequest {
  public constructor(request: Request, data: D.IntegrationResourceConnectionFragment) {
    super(request);
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
 * @param data - IntegrationResourceFragment response data
 */
class IntegrationResource extends LinearRequest {
  private _integration?: D.IntegrationResourceFragment["integration"];
  private _issue?: D.IntegrationResourceFragment["issue"];

  public constructor(request: Request, data: D.IntegrationResourceFragment) {
    super(request);
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
    return this._integration?.id ? new IntegrationQuery(this.request).fetch(this._integration?.id) : undefined;
  }
  /** The issue that the resource is associated with. */
  public get issue(): Promise<Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this.request).fetch(this._issue?.id) : undefined;
  }
  /** Detailed information about the external resource. */
  public get data() {
    return this.id ? new IntegrationResource_DataQuery(this.request, this.id).fetch() : undefined;
  }
  /** Pull request information for GitHub pull requests and GitLab merge requests. */
  public get pullRequest() {
    return this.id ? new IntegrationResource_PullRequestQuery(this.request, this.id).fetch() : undefined;
  }
}

/**
 * Integration resource's payload
 *
 * @param request - function to call the graphql client
 * @param data - IntegrationResourceDataFragment response data
 */
class IntegrationResourceData extends LinearRequest {
  public constructor(request: Request, data: D.IntegrationResourceDataFragment) {
    super(request);
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
 * @param data - PullRequestPayloadFragment response data
 */
class PullRequestPayload extends LinearRequest {
  public constructor(request: Request, data: D.PullRequestPayloadFragment) {
    super(request);
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
 * @param data - CommitPayloadFragment response data
 */
class CommitPayload extends LinearRequest {
  public constructor(request: Request, data: D.CommitPayloadFragment) {
    super(request);
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
 * @param data - SentryIssuePayloadFragment response data
 */
class SentryIssuePayload extends LinearRequest {
  public constructor(request: Request, data: D.SentryIssuePayloadFragment) {
    super(request);
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
 * @param data - IssueRelationConnectionFragment response data
 */
class IssueRelationConnection extends LinearRequest {
  public constructor(request: Request, data: D.IssueRelationConnectionFragment) {
    super(request);
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
 * @param data - IssueRelationFragment response data
 */
class IssueRelation extends LinearRequest {
  private _issue?: D.IssueRelationFragment["issue"];
  private _relatedIssue?: D.IssueRelationFragment["relatedIssue"];

  public constructor(request: Request, data: D.IssueRelationFragment) {
    super(request);
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
    return this._issue?.id ? new IssueQuery(this.request).fetch(this._issue?.id) : undefined;
  }
  /** The related issue. */
  public get relatedIssue(): Promise<Issue | undefined> | undefined {
    return this._relatedIssue?.id ? new IssueQuery(this.request).fetch(this._relatedIssue?.id) : undefined;
  }
}

/**
 * OrganizationExistsPayload model
 *
 * @param request - function to call the graphql client
 * @param data - OrganizationExistsPayloadFragment response data
 */
class OrganizationExistsPayload extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationExistsPayloadFragment) {
    super(request);
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
 * @param data - SyncResponseFragment response data
 */
class SyncResponse extends LinearRequest {
  public constructor(request: Request, data: D.SyncResponseFragment) {
    super(request);
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
 * @param data - ArchiveResponseFragment response data
 */
class ArchiveResponse extends LinearRequest {
  public constructor(request: Request, data: D.ArchiveResponseFragment) {
    super(request);
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
 * @param data - UserAccountAdminPrivilegedFragment response data
 */
class UserAccountAdminPrivileged extends LinearRequest {
  public constructor(request: Request, data: D.UserAccountAdminPrivilegedFragment) {
    super(request);
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.email = data.email ?? undefined;
    this.service = data.service ?? undefined;
    this.users = data.users ? data.users.map(node => new UserAdminPrivileged(request, node)) : undefined;
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
  public users?: UserAdminPrivileged[];
}

/**
 * A user that has access to the the resources of an organization. Super user required.
 *
 * @param request - function to call the graphql client
 * @param data - UserAdminPrivilegedFragment response data
 */
class UserAdminPrivileged extends LinearRequest {
  public constructor(request: Request, data: D.UserAdminPrivilegedFragment) {
    super(request);
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
    this.lastSeen = data.lastSeen ?? undefined;
    this.admin = data.admin ?? undefined;
    this.active = data.active ?? undefined;
    this.createdIssueCount = data.createdIssueCount ?? undefined;
    this.organization = data.organization ? new OrganizationAdminPrivileged(request, data.organization) : undefined;
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
  /** The last time the user was seen online. If null, the user is currently online. */
  public lastSeen?: D.Scalars["DateTime"];
  /** Whether the user is an organization administrator. */
  public admin?: boolean;
  /** Whether the user account is active or disabled. */
  public active?: boolean;
  /** Number of issues created. */
  public createdIssueCount?: number;
  /** Organization in which the user belongs to. Super user required. */
  public organization?: OrganizationAdminPrivileged;
  /** The settings of the user. */
  public get settings(): Promise<UserSettings | undefined> {
    return new NotificationQuery(this.request).fetch();
  }
}

/**
 * An organization. Super user required.
 *
 * @param request - function to call the graphql client
 * @param data - OrganizationAdminPrivilegedFragment response data
 */
class OrganizationAdminPrivileged extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationAdminPrivilegedFragment) {
    super(request);
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
    this.subscription = data.subscription ? new SubscriptionAdminPrivileged(request, data.subscription) : undefined;
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
  /** The organization's subscription to a paid plan. Super user required. */
  public subscription?: SubscriptionAdminPrivileged;
}

/**
 * The subscription of an organization. Super user required.
 *
 * @param request - function to call the graphql client
 * @param data - SubscriptionAdminPrivilegedFragment response data
 */
class SubscriptionAdminPrivileged extends LinearRequest {
  private _creator?: D.SubscriptionAdminPrivilegedFragment["creator"];

  public constructor(request: Request, data: D.SubscriptionAdminPrivilegedFragment) {
    super(request);
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
    return this._creator?.id ? new UserQuery(this.request).fetch(this._creator?.id) : undefined;
  }
  /** The organization that the subscription is associated with. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this.request).fetch();
  }
}

/**
 * ApiKeyConnection model
 *
 * @param request - function to call the graphql client
 * @param data - ApiKeyConnectionFragment response data
 */
class ApiKeyConnection extends LinearRequest {
  public constructor(request: Request, data: D.ApiKeyConnectionFragment) {
    super(request);
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
 * @param data - ApiKeyFragment response data
 */
class ApiKey extends LinearRequest {
  public constructor(request: Request, data: D.ApiKeyFragment) {
    super(request);
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

/**
 * Public information of the OAuth application, plus whether the application has been authorized for the given scopes.
 *
 * @param request - function to call the graphql client
 * @param data - UserAuthorizedApplicationFragment response data
 */
class UserAuthorizedApplication extends LinearRequest {
  public constructor(request: Request, data: D.UserAuthorizedApplicationFragment) {
    super(request);
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
 * @param data - AuthorizedApplicationFragment response data
 */
class AuthorizedApplication extends LinearRequest {
  public constructor(request: Request, data: D.AuthorizedApplicationFragment) {
    super(request);
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

/**
 * AuthResolverResponse model
 *
 * @param request - function to call the graphql client
 * @param data - AuthResolverResponseFragment response data
 */
class AuthResolverResponse extends LinearRequest {
  public constructor(request: Request, data: D.AuthResolverResponseFragment) {
    super(request);
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
 * @param data - SsoUrlFromEmailResponseFragment response data
 */
class SsoUrlFromEmailResponse extends LinearRequest {
  public constructor(request: Request, data: D.SsoUrlFromEmailResponseFragment) {
    super(request);
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
 * @param data - BillingDetailsPayloadFragment response data
 */
class BillingDetailsPayload extends LinearRequest {
  public constructor(request: Request, data: D.BillingDetailsPayloadFragment) {
    super(request);
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
 * @param data - InvoiceFragment response data
 */
class Invoice extends LinearRequest {
  public constructor(request: Request, data: D.InvoiceFragment) {
    super(request);
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

/**
 * Card model
 *
 * @param request - function to call the graphql client
 * @param data - CardFragment response data
 */
class Card extends LinearRequest {
  public constructor(request: Request, data: D.CardFragment) {
    super(request);
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
 * @param data - CollaborationDocumentUpdatePayloadFragment response data
 */
class CollaborationDocumentUpdatePayload extends LinearRequest {
  public constructor(request: Request, data: D.CollaborationDocumentUpdatePayloadFragment) {
    super(request);
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
 * @param data - StepsResponseFragment response data
 */
class StepsResponse extends LinearRequest {
  public constructor(request: Request, data: D.StepsResponseFragment) {
    super(request);
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
 * @param data - CustomViewFragment response data
 */
class CustomView extends LinearRequest {
  private _team?: D.CustomViewFragment["team"];
  private _creator?: D.CustomViewFragment["creator"];

  public constructor(request: Request, data: D.CustomViewFragment) {
    super(request);
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
    return new OrganizationQuery(this.request).fetch();
  }
  /** The team associated with the custom view. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this.request).fetch(this._team?.id) : undefined;
  }
  /** The user who created the custom view. */
  public get creator(): Promise<User | undefined> | undefined {
    return this._creator?.id ? new UserQuery(this.request).fetch(this._creator?.id) : undefined;
  }
}

/**
 * CustomViewConnection model
 *
 * @param request - function to call the graphql client
 * @param data - CustomViewConnectionFragment response data
 */
class CustomViewConnection extends LinearRequest {
  public constructor(request: Request, data: D.CustomViewConnectionFragment) {
    super(request);
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
 * @param data - EmojiFragment response data
 */
class Emoji extends LinearRequest {
  private _creator?: D.EmojiFragment["creator"];

  public constructor(request: Request, data: D.EmojiFragment) {
    super(request);
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
    return this._creator?.id ? new UserQuery(this.request).fetch(this._creator?.id) : undefined;
  }
  /** The organization that the emoji belongs to. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this.request).fetch();
  }
}

/**
 * EmojiConnection model
 *
 * @param request - function to call the graphql client
 * @param data - EmojiConnectionFragment response data
 */
class EmojiConnection extends LinearRequest {
  public constructor(request: Request, data: D.EmojiConnectionFragment) {
    super(request);
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
 * @param data - FavoriteFragment response data
 */
class Favorite extends LinearRequest {
  private _user?: D.FavoriteFragment["user"];
  private _issue?: D.FavoriteFragment["issue"];
  private _project?: D.FavoriteFragment["project"];
  private _projectTeam?: D.FavoriteFragment["projectTeam"];
  private _cycle?: D.FavoriteFragment["cycle"];
  private _label?: D.FavoriteFragment["label"];

  public constructor(request: Request, data: D.FavoriteFragment) {
    super(request);
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
    return this._user?.id ? new UserQuery(this.request).fetch(this._user?.id) : undefined;
  }
  /** Favorited issue. */
  public get issue(): Promise<Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this.request).fetch(this._issue?.id) : undefined;
  }
  /** Favorited project. */
  public get project(): Promise<Project | undefined> | undefined {
    return this._project?.id ? new ProjectQuery(this.request).fetch(this._project?.id) : undefined;
  }
  /** Favorited project team. */
  public get projectTeam(): Promise<Project | undefined> | undefined {
    return this._projectTeam?.id ? new ProjectQuery(this.request).fetch(this._projectTeam?.id) : undefined;
  }
  /** Favorited cycle. */
  public get cycle(): Promise<Cycle | undefined> | undefined {
    return this._cycle?.id ? new CycleQuery(this.request).fetch(this._cycle?.id) : undefined;
  }
  /** Favorited issue label. */
  public get label(): Promise<IssueLabel | undefined> | undefined {
    return this._label?.id ? new IssueLabelQuery(this.request).fetch(this._label?.id) : undefined;
  }
}

/**
 * FavoriteConnection model
 *
 * @param request - function to call the graphql client
 * @param data - FavoriteConnectionFragment response data
 */
class FavoriteConnection extends LinearRequest {
  public constructor(request: Request, data: D.FavoriteConnectionFragment) {
    super(request);
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
 * @param data - FigmaEmbedPayloadFragment response data
 */
class FigmaEmbedPayload extends LinearRequest {
  public constructor(request: Request, data: D.FigmaEmbedPayloadFragment) {
    super(request);
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
 * @param data - FigmaEmbedFragment response data
 */
class FigmaEmbed extends LinearRequest {
  public constructor(request: Request, data: D.FigmaEmbedFragment) {
    super(request);
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

/**
 * InvitePagePayload model
 *
 * @param request - function to call the graphql client
 * @param data - InvitePagePayloadFragment response data
 */
class InvitePagePayload extends LinearRequest {
  public constructor(request: Request, data: D.InvitePagePayloadFragment) {
    super(request);
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
 * @param data - InviteDataFragment response data
 */
class InviteData extends LinearRequest {
  public constructor(request: Request, data: D.InviteDataFragment) {
    super(request);
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

/**
 * NotificationConnection model
 *
 * @param request - function to call the graphql client
 * @param data - NotificationConnectionFragment response data
 */
class NotificationConnection extends LinearRequest {
  public constructor(request: Request, data: D.NotificationConnectionFragment) {
    super(request);
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
 * @param data - NotificationFragment response data
 */
class Notification extends LinearRequest {
  private _user?: D.NotificationFragment["user"];
  private _issue?: D.NotificationFragment["issue"];
  private _team?: D.NotificationFragment["team"];
  private _comment?: D.NotificationFragment["comment"];

  public constructor(request: Request, data: D.NotificationFragment) {
    super(request);
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
    return this._user?.id ? new UserQuery(this.request).fetch(this._user?.id) : undefined;
  }
  /** The issue that the notification is associated with. */
  public get issue(): Promise<Issue | undefined> | undefined {
    return this._issue?.id ? new IssueQuery(this.request).fetch(this._issue?.id) : undefined;
  }
  /** The team which the notification is associated with. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this.request).fetch(this._team?.id) : undefined;
  }
  /** The comment which the notification is associated with. */
  public get comment(): Promise<Comment | undefined> | undefined {
    return this._comment?.id ? new CommentQuery(this.request).fetch(this._comment?.id) : undefined;
  }
}

/**
 * NotificationSubscriptionConnection model
 *
 * @param request - function to call the graphql client
 * @param data - NotificationSubscriptionConnectionFragment response data
 */
class NotificationSubscriptionConnection extends LinearRequest {
  public constructor(request: Request, data: D.NotificationSubscriptionConnectionFragment) {
    super(request);
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
 * @param data - NotificationSubscriptionFragment response data
 */
class NotificationSubscription extends LinearRequest {
  private _user?: D.NotificationSubscriptionFragment["user"];
  private _team?: D.NotificationSubscriptionFragment["team"];
  private _project?: D.NotificationSubscriptionFragment["project"];

  public constructor(request: Request, data: D.NotificationSubscriptionFragment) {
    super(request);
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
    return this._user?.id ? new UserQuery(this.request).fetch(this._user?.id) : undefined;
  }
  /** Subscribed team. */
  public get team(): Promise<Team | undefined> | undefined {
    return this._team?.id ? new TeamQuery(this.request).fetch(this._team?.id) : undefined;
  }
  /** Subscribed project. */
  public get project(): Promise<Project | undefined> | undefined {
    return this._project?.id ? new ProjectQuery(this.request).fetch(this._project?.id) : undefined;
  }
}

/**
 * OrganizationInviteConnection model
 *
 * @param request - function to call the graphql client
 * @param data - OrganizationInviteConnectionFragment response data
 */
class OrganizationInviteConnection extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationInviteConnectionFragment) {
    super(request);
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
 * @param data - OrganizationInviteFragment response data
 */
class OrganizationInvite extends LinearRequest {
  private _inviter?: D.OrganizationInviteFragment["inviter"];
  private _invitee?: D.OrganizationInviteFragment["invitee"];

  public constructor(request: Request, data: D.OrganizationInviteFragment) {
    super(request);
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
    return this._inviter?.id ? new UserQuery(this.request).fetch(this._inviter?.id) : undefined;
  }
  /** The user who has accepted the invite. Null, if the invite hasn't been accepted. */
  public get invitee(): Promise<User | undefined> | undefined {
    return this._invitee?.id ? new UserQuery(this.request).fetch(this._invitee?.id) : undefined;
  }
  /** The organization that the invite is associated with. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this.request).fetch();
  }
  /** undefined */
  public issues(vars?: Omit<D.OrganizationInvite_IssuesQueryVariables, "id" | "id">) {
    return this.id ? new OrganizationInvite_IssuesQuery(this.request, this.id).fetch(vars) : undefined;
  }
}

/**
 * PushSubscriptionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - PushSubscriptionPayloadFragment response data
 */
class PushSubscriptionPayload extends LinearRequest {
  public constructor(request: Request, data: D.PushSubscriptionPayloadFragment) {
    super(request);
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
 * @param data - ReactionFragment response data
 */
class Reaction extends LinearRequest {
  private _user?: D.ReactionFragment["user"];
  private _comment?: D.ReactionFragment["comment"];

  public constructor(request: Request, data: D.ReactionFragment) {
    super(request);
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
    return this._user?.id ? new UserQuery(this.request).fetch(this._user?.id) : undefined;
  }
  /** The comment that the reaction is associated with. */
  public get comment(): Promise<Comment | undefined> | undefined {
    return this._comment?.id ? new CommentQuery(this.request).fetch(this._comment?.id) : undefined;
  }
}

/**
 * ReactionConnection model
 *
 * @param request - function to call the graphql client
 * @param data - ReactionConnectionFragment response data
 */
class ReactionConnection extends LinearRequest {
  public constructor(request: Request, data: D.ReactionConnectionFragment) {
    super(request);
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
 * @param data - ViewPreferencesConnectionFragment response data
 */
class ViewPreferencesConnection extends LinearRequest {
  public constructor(request: Request, data: D.ViewPreferencesConnectionFragment) {
    super(request);
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
 * @param data - ViewPreferencesFragment response data
 */
class ViewPreferences extends LinearRequest {
  public constructor(request: Request, data: D.ViewPreferencesFragment) {
    super(request);
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

/**
 * UserPayload model
 *
 * @param request - function to call the graphql client
 * @param data - UserPayloadFragment response data
 */
class UserPayload extends LinearRequest {
  private _user?: D.UserPayloadFragment["user"];

  public constructor(request: Request, data: D.UserPayloadFragment) {
    super(request);
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
    return this._user?.id ? new UserQuery(this.request).fetch(this._user?.id) : undefined;
  }
}

/**
 * UserAdminPayload model
 *
 * @param request - function to call the graphql client
 * @param data - UserAdminPayloadFragment response data
 */
class UserAdminPayload extends LinearRequest {
  public constructor(request: Request, data: D.UserAdminPayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * OrganizationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - OrganizationPayloadFragment response data
 */
class OrganizationPayload extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The organization that was created or updated. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this.request).fetch();
  }
}

/**
 * OrganizationDeletePayload model
 *
 * @param request - function to call the graphql client
 * @param data - OrganizationDeletePayloadFragment response data
 */
class OrganizationDeletePayload extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationDeletePayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * AdminIntegrationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - AdminIntegrationPayloadFragment response data
 */
class AdminIntegrationPayload extends LinearRequest {
  public constructor(request: Request, data: D.AdminIntegrationPayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * OrganizationAccessPayload model
 *
 * @param request - function to call the graphql client
 * @param data - OrganizationAccessPayloadFragment response data
 */
class OrganizationAccessPayload extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationAccessPayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * OrganizationSamlConfigurePayload model
 *
 * @param request - function to call the graphql client
 * @param data - OrganizationSamlConfigurePayloadFragment response data
 */
class OrganizationSamlConfigurePayload extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationSamlConfigurePayloadFragment) {
    super(request);
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
 * @param data - SamlConfigurationFragment response data
 */
class SamlConfiguration extends LinearRequest {
  public constructor(request: Request, data: D.SamlConfigurationFragment) {
    super(request);
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
 * @param data - AdminCommandPayloadFragment response data
 */
class AdminCommandPayload extends LinearRequest {
  public constructor(request: Request, data: D.AdminCommandPayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * EventPayload model
 *
 * @param request - function to call the graphql client
 * @param data - EventPayloadFragment response data
 */
class EventPayload extends LinearRequest {
  public constructor(request: Request, data: D.EventPayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * ApiKeyPayload model
 *
 * @param request - function to call the graphql client
 * @param data - ApiKeyPayloadFragment response data
 */
class ApiKeyPayload extends LinearRequest {
  public constructor(request: Request, data: D.ApiKeyPayloadFragment) {
    super(request);
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
 * @param data - ArchivePayloadFragment response data
 */
class ArchivePayload extends LinearRequest {
  public constructor(request: Request, data: D.ArchivePayloadFragment) {
    super(request);
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
 * @param data - EmailUserAccountAuthChallengeResponseFragment response data
 */
class EmailUserAccountAuthChallengeResponse extends LinearRequest {
  public constructor(request: Request, data: D.EmailUserAccountAuthChallengeResponseFragment) {
    super(request);
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
 * @param data - CreateOrJoinOrganizationResponseFragment response data
 */
class CreateOrJoinOrganizationResponse extends LinearRequest {
  private _user?: D.CreateOrJoinOrganizationResponseFragment["user"];

  public constructor(request: Request, data: D.CreateOrJoinOrganizationResponseFragment) {
    super(request);
    this._user = data.user ?? undefined;
  }

  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this.request).fetch();
  }
  public get user(): Promise<User | undefined> | undefined {
    return this._user?.id ? new UserQuery(this.request).fetch(this._user?.id) : undefined;
  }
}

/**
 * BillingEmailPayload model
 *
 * @param request - function to call the graphql client
 * @param data - BillingEmailPayloadFragment response data
 */
class BillingEmailPayload extends LinearRequest {
  public constructor(request: Request, data: D.BillingEmailPayloadFragment) {
    super(request);
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
 * @param data - CommentPayloadFragment response data
 */
class CommentPayload extends LinearRequest {
  private _comment?: D.CommentPayloadFragment["comment"];

  public constructor(request: Request, data: D.CommentPayloadFragment) {
    super(request);
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
    return this._comment?.id ? new CommentQuery(this.request).fetch(this._comment?.id) : undefined;
  }
}

/**
 * ContactPayload model
 *
 * @param request - function to call the graphql client
 * @param data - ContactPayloadFragment response data
 */
class ContactPayload extends LinearRequest {
  public constructor(request: Request, data: D.ContactPayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * CustomViewPayload model
 *
 * @param request - function to call the graphql client
 * @param data - CustomViewPayloadFragment response data
 */
class CustomViewPayload extends LinearRequest {
  private _customView?: D.CustomViewPayloadFragment["customView"];

  public constructor(request: Request, data: D.CustomViewPayloadFragment) {
    super(request);
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
    return this._customView?.id ? new CustomViewQuery(this.request).fetch(this._customView?.id) : undefined;
  }
}

/**
 * CyclePayload model
 *
 * @param request - function to call the graphql client
 * @param data - CyclePayloadFragment response data
 */
class CyclePayload extends LinearRequest {
  private _cycle?: D.CyclePayloadFragment["cycle"];

  public constructor(request: Request, data: D.CyclePayloadFragment) {
    super(request);
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
    return this._cycle?.id ? new CycleQuery(this.request).fetch(this._cycle?.id) : undefined;
  }
}

/**
 * DebugPayload model
 *
 * @param request - function to call the graphql client
 * @param data - DebugPayloadFragment response data
 */
class DebugPayload extends LinearRequest {
  public constructor(request: Request, data: D.DebugPayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * EmailUnsubscribePayload model
 *
 * @param request - function to call the graphql client
 * @param data - EmailUnsubscribePayloadFragment response data
 */
class EmailUnsubscribePayload extends LinearRequest {
  public constructor(request: Request, data: D.EmailUnsubscribePayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * EmojiPayload model
 *
 * @param request - function to call the graphql client
 * @param data - EmojiPayloadFragment response data
 */
class EmojiPayload extends LinearRequest {
  private _emoji?: D.EmojiPayloadFragment["emoji"];

  public constructor(request: Request, data: D.EmojiPayloadFragment) {
    super(request);
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
    return this._emoji?.id ? new EmojiQuery(this.request).fetch(this._emoji?.id) : undefined;
  }
}

/**
 * FavoritePayload model
 *
 * @param request - function to call the graphql client
 * @param data - FavoritePayloadFragment response data
 */
class FavoritePayload extends LinearRequest {
  private _favorite?: D.FavoritePayloadFragment["favorite"];

  public constructor(request: Request, data: D.FavoritePayloadFragment) {
    super(request);
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
    return this._favorite?.id ? new FavoriteQuery(this.request).fetch(this._favorite?.id) : undefined;
  }
}

/**
 * FeedbackPayload model
 *
 * @param request - function to call the graphql client
 * @param data - FeedbackPayloadFragment response data
 */
class FeedbackPayload extends LinearRequest {
  public constructor(request: Request, data: D.FeedbackPayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * UploadPayload model
 *
 * @param request - function to call the graphql client
 * @param data - UploadPayloadFragment response data
 */
class UploadPayload extends LinearRequest {
  public constructor(request: Request, data: D.UploadPayloadFragment) {
    super(request);
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
 * @param data - UploadFileFragment response data
 */
class UploadFile extends LinearRequest {
  public constructor(request: Request, data: D.UploadFileFragment) {
    super(request);
    this.filename = data.filename ?? undefined;
    this.contentType = data.contentType ?? undefined;
    this.size = data.size ?? undefined;
    this.uploadUrl = data.uploadUrl ?? undefined;
    this.assetUrl = data.assetUrl ?? undefined;
    this.metaData = data.metaData ?? undefined;
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
  public metaData?: D.Scalars["JSON"];
  public headers?: UploadFileHeader[];
}

/**
 * UploadFileHeader model
 *
 * @param request - function to call the graphql client
 * @param data - UploadFileHeaderFragment response data
 */
class UploadFileHeader extends LinearRequest {
  public constructor(request: Request, data: D.UploadFileHeaderFragment) {
    super(request);
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
 * @param data - ImageUploadFromUrlPayloadFragment response data
 */
class ImageUploadFromUrlPayload extends LinearRequest {
  public constructor(request: Request, data: D.ImageUploadFromUrlPayloadFragment) {
    super(request);
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
 * @param data - IntegrationPayloadFragment response data
 */
class IntegrationPayload extends LinearRequest {
  private _integration?: D.IntegrationPayloadFragment["integration"];

  public constructor(request: Request, data: D.IntegrationPayloadFragment) {
    super(request);
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
    return this._integration?.id ? new IntegrationQuery(this.request).fetch(this._integration?.id) : undefined;
  }
}

/**
 * IssueLabelPayload model
 *
 * @param request - function to call the graphql client
 * @param data - IssueLabelPayloadFragment response data
 */
class IssueLabelPayload extends LinearRequest {
  private _issueLabel?: D.IssueLabelPayloadFragment["issueLabel"];

  public constructor(request: Request, data: D.IssueLabelPayloadFragment) {
    super(request);
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
    return this._issueLabel?.id ? new IssueLabelQuery(this.request).fetch(this._issueLabel?.id) : undefined;
  }
}

/**
 * IssueRelationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - IssueRelationPayloadFragment response data
 */
class IssueRelationPayload extends LinearRequest {
  private _issueRelation?: D.IssueRelationPayloadFragment["issueRelation"];

  public constructor(request: Request, data: D.IssueRelationPayloadFragment) {
    super(request);
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
    return this._issueRelation?.id ? new IssueRelationQuery(this.request).fetch(this._issueRelation?.id) : undefined;
  }
}

/**
 * IssuePayload model
 *
 * @param request - function to call the graphql client
 * @param data - IssuePayloadFragment response data
 */
class IssuePayload extends LinearRequest {
  private _issue?: D.IssuePayloadFragment["issue"];

  public constructor(request: Request, data: D.IssuePayloadFragment) {
    super(request);
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
    return this._issue?.id ? new IssueQuery(this.request).fetch(this._issue?.id) : undefined;
  }
}

/**
 * MilestonePayload model
 *
 * @param request - function to call the graphql client
 * @param data - MilestonePayloadFragment response data
 */
class MilestonePayload extends LinearRequest {
  private _milestone?: D.MilestonePayloadFragment["milestone"];

  public constructor(request: Request, data: D.MilestonePayloadFragment) {
    super(request);
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
    return this._milestone?.id ? new MilestoneQuery(this.request).fetch(this._milestone?.id) : undefined;
  }
}

/**
 * NotificationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - NotificationPayloadFragment response data
 */
class NotificationPayload extends LinearRequest {
  public constructor(request: Request, data: D.NotificationPayloadFragment) {
    super(request);
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
 * @param data - NotificationSubscriptionPayloadFragment response data
 */
class NotificationSubscriptionPayload extends LinearRequest {
  public constructor(request: Request, data: D.NotificationSubscriptionPayloadFragment) {
    super(request);
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
 * @param data - OauthClientPayloadFragment response data
 */
class OauthClientPayload extends LinearRequest {
  public constructor(request: Request, data: D.OauthClientPayloadFragment) {
    super(request);
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
 * @param data - OauthClientFragment response data
 */
class OauthClient extends LinearRequest {
  public constructor(request: Request, data: D.OauthClientFragment) {
    super(request);
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

/**
 * RotateSecretPayload model
 *
 * @param request - function to call the graphql client
 * @param data - RotateSecretPayloadFragment response data
 */
class RotateSecretPayload extends LinearRequest {
  public constructor(request: Request, data: D.RotateSecretPayloadFragment) {
    super(request);
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
 * @param data - OauthTokenRevokePayloadFragment response data
 */
class OauthTokenRevokePayload extends LinearRequest {
  public constructor(request: Request, data: D.OauthTokenRevokePayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * OrganizationDomainPayload model
 *
 * @param request - function to call the graphql client
 * @param data - OrganizationDomainPayloadFragment response data
 */
class OrganizationDomainPayload extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationDomainPayloadFragment) {
    super(request);
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
 * @param data - OrganizationDomainFragment response data
 */
class OrganizationDomain extends LinearRequest {
  private _creator?: D.OrganizationDomainFragment["creator"];

  public constructor(request: Request, data: D.OrganizationDomainFragment) {
    super(request);
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
    return this._creator?.id ? new UserQuery(this.request).fetch(this._creator?.id) : undefined;
  }
}

/**
 * OrganizationInvitePayload model
 *
 * @param request - function to call the graphql client
 * @param data - OrganizationInvitePayloadFragment response data
 */
class OrganizationInvitePayload extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationInvitePayloadFragment) {
    super(request);
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
 * @param data - ProjectLinkPayloadFragment response data
 */
class ProjectLinkPayload extends LinearRequest {
  private _projectLink?: D.ProjectLinkPayloadFragment["projectLink"];

  public constructor(request: Request, data: D.ProjectLinkPayloadFragment) {
    super(request);
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
    return this._projectLink?.id ? new ProjectLinkQuery(this.request).fetch(this._projectLink?.id) : undefined;
  }
}

/**
 * ProjectPayload model
 *
 * @param request - function to call the graphql client
 * @param data - ProjectPayloadFragment response data
 */
class ProjectPayload extends LinearRequest {
  private _project?: D.ProjectPayloadFragment["project"];

  public constructor(request: Request, data: D.ProjectPayloadFragment) {
    super(request);
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
    return this._project?.id ? new ProjectQuery(this.request).fetch(this._project?.id) : undefined;
  }
}

/**
 * ReactionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - ReactionPayloadFragment response data
 */
class ReactionPayload extends LinearRequest {
  private _reaction?: D.ReactionPayloadFragment["reaction"];

  public constructor(request: Request, data: D.ReactionPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._reaction = data.reaction ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  public success?: boolean;
  public get reaction(): Promise<Reaction | undefined> | undefined {
    return this._reaction?.id ? new ReactionQuery(this.request).fetch(this._reaction?.id) : undefined;
  }
}

/**
 * CreateCsvExportReportPayload model
 *
 * @param request - function to call the graphql client
 * @param data - CreateCsvExportReportPayloadFragment response data
 */
class CreateCsvExportReportPayload extends LinearRequest {
  public constructor(request: Request, data: D.CreateCsvExportReportPayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * SubscriptionSessionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - SubscriptionSessionPayloadFragment response data
 */
class SubscriptionSessionPayload extends LinearRequest {
  public constructor(request: Request, data: D.SubscriptionSessionPayloadFragment) {
    super(request);
    this.session = data.session ?? undefined;
  }

  /** The subscription session that was created or updated. */
  public session?: string;
}

/**
 * SubscriptionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - SubscriptionPayloadFragment response data
 */
class SubscriptionPayload extends LinearRequest {
  public constructor(request: Request, data: D.SubscriptionPayloadFragment) {
    super(request);
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
    return new SubscriptionQuery(this.request).fetch();
  }
}

/**
 * TeamMembershipPayload model
 *
 * @param request - function to call the graphql client
 * @param data - TeamMembershipPayloadFragment response data
 */
class TeamMembershipPayload extends LinearRequest {
  private _teamMembership?: D.TeamMembershipPayloadFragment["teamMembership"];

  public constructor(request: Request, data: D.TeamMembershipPayloadFragment) {
    super(request);
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
    return this._teamMembership?.id ? new TeamMembershipQuery(this.request).fetch(this._teamMembership?.id) : undefined;
  }
}

/**
 * TeamPayload model
 *
 * @param request - function to call the graphql client
 * @param data - TeamPayloadFragment response data
 */
class TeamPayload extends LinearRequest {
  private _team?: D.TeamPayloadFragment["team"];

  public constructor(request: Request, data: D.TeamPayloadFragment) {
    super(request);
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
    return this._team?.id ? new TeamQuery(this.request).fetch(this._team?.id) : undefined;
  }
}

/**
 * TemplatePayload model
 *
 * @param request - function to call the graphql client
 * @param data - TemplatePayloadFragment response data
 */
class TemplatePayload extends LinearRequest {
  private _template?: D.TemplatePayloadFragment["template"];

  public constructor(request: Request, data: D.TemplatePayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._template = data.template ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The template that was created or updated. */
  public get template(): Promise<Template | undefined> | undefined {
    return this._template?.id ? new TemplateQuery(this.request).fetch(this._template?.id) : undefined;
  }
}

/**
 * UserSettingsPayload model
 *
 * @param request - function to call the graphql client
 * @param data - UserSettingsPayloadFragment response data
 */
class UserSettingsPayload extends LinearRequest {
  public constructor(request: Request, data: D.UserSettingsPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The user's settings. */
  public get userSettings(): Promise<UserSettings | undefined> {
    return new NotificationQuery(this.request).fetch();
  }
}

/**
 * UserSettingsFlagPayload model
 *
 * @param request - function to call the graphql client
 * @param data - UserSettingsFlagPayloadFragment response data
 */
class UserSettingsFlagPayload extends LinearRequest {
  public constructor(request: Request, data: D.UserSettingsFlagPayloadFragment) {
    super(request);
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
 * @param data - UserSettingsFlagsResetPayloadFragment response data
 */
class UserSettingsFlagsResetPayload extends LinearRequest {
  public constructor(request: Request, data: D.UserSettingsFlagsResetPayloadFragment) {
    super(request);
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
 * @param data - UserSubscribeToNewsletterPayloadFragment response data
 */
class UserSubscribeToNewsletterPayload extends LinearRequest {
  public constructor(request: Request, data: D.UserSubscribeToNewsletterPayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * ViewPreferencesPayload model
 *
 * @param request - function to call the graphql client
 * @param data - ViewPreferencesPayloadFragment response data
 */
class ViewPreferencesPayload extends LinearRequest {
  public constructor(request: Request, data: D.ViewPreferencesPayloadFragment) {
    super(request);
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
 * @param data - WebhookPayloadFragment response data
 */
class WebhookPayload extends LinearRequest {
  private _webhook?: D.WebhookPayloadFragment["webhook"];

  public constructor(request: Request, data: D.WebhookPayloadFragment) {
    super(request);
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
    return this._webhook?.id ? new WebhookQuery(this.request).fetch(this._webhook?.id) : undefined;
  }
}

/**
 * WorkflowStatePayload model
 *
 * @param request - function to call the graphql client
 * @param data - WorkflowStatePayloadFragment response data
 */
class WorkflowStatePayload extends LinearRequest {
  private _workflowState?: D.WorkflowStatePayloadFragment["workflowState"];

  public constructor(request: Request, data: D.WorkflowStatePayloadFragment) {
    super(request);
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
    return this._workflowState?.id ? new WorkflowStateQuery(this.request).fetch(this._workflowState?.id) : undefined;
  }
}

/**
 * Collaborative editing steps for documents.
 *
 * @param request - function to call the graphql client
 * @param data - DocumentStepFragment response data
 */
class DocumentStep extends LinearRequest {
  public constructor(request: Request, data: D.DocumentStepFragment) {
    super(request);
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

/**
 * A user's web browser push notification subscription.
 *
 * @param request - function to call the graphql client
 * @param data - PushSubscriptionFragment response data
 */
class PushSubscription extends LinearRequest {
  public constructor(request: Request, data: D.PushSubscriptionFragment) {
    super(request);
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

/**
 * PushSubscriptionConnection model
 *
 * @param request - function to call the graphql client
 * @param data - PushSubscriptionConnectionFragment response data
 */
class PushSubscriptionConnection extends LinearRequest {
  public constructor(request: Request, data: D.PushSubscriptionConnectionFragment) {
    super(request);
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
 * @param data - UserAccountFragment response data
 */
class UserAccount extends LinearRequest {
  public constructor(request: Request, data: D.UserAccountFragment) {
    super(request);
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.name = data.name ?? undefined;
    this.email = data.email ?? undefined;
    this.service = data.service ?? undefined;
    this.users = data.users ? data.users.map(node => new User(request, node)) : undefined;
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
  public users?: User[];
}

/**
 * A recorded entry of a file uploaded by a user.
 *
 * @param request - function to call the graphql client
 * @param data - FileUploadFragment response data
 */
class FileUpload extends LinearRequest {
  private _creator?: D.FileUploadFragment["creator"];

  public constructor(request: Request, data: D.FileUploadFragment) {
    super(request);
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
    return this._creator?.id ? new UserQuery(this.request).fetch(this._creator?.id) : undefined;
  }
  /** The organization the upload belongs to. */
  public get organization(): Promise<Organization | undefined> {
    return new OrganizationQuery(this.request).fetch();
  }
}

/**
 * SynchronizedPayload model
 *
 * @param request - function to call the graphql client
 * @param data - SynchronizedPayloadFragment response data
 */
class SynchronizedPayload extends LinearRequest {
  public constructor(request: Request, data: D.SynchronizedPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
}

/**
 * Public information of the OAuth application.
 *
 * @param request - function to call the graphql client
 * @param data - ApplicationFragment response data
 */
class Application extends LinearRequest {
  public constructor(request: Request, data: D.ApplicationFragment) {
    super(request);
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
 * @param data - OrganizationDomainSimplePayloadFragment response data
 */
class OrganizationDomainSimplePayload extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationDomainSimplePayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}

/**
 * A fetchable User Query
 *
 * @param request - function to call the graphql client
 */
class UserQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the User Query and return a User
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<User | undefined> {
    return this.request<D.UserQuery, D.UserQueryVariables>(D.UserDocument, {
      id,
    }).then(response => {
      const data = response?.user;
      return data ? new User(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Viewer Query
 *
 * @param request - function to call the graphql client
 */
class ViewerQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Viewer Query and return a User
   *
   */
  public async fetch(): Promise<User | undefined> {
    return this.request<D.ViewerQuery, D.ViewerQueryVariables>(D.ViewerDocument, {}).then(response => {
      const data = response?.viewer;
      return data ? new User(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Organization Query
 *
 * @param request - function to call the graphql client
 */
class OrganizationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Organization Query and return a Organization
   *
   */
  public async fetch(): Promise<Organization | undefined> {
    return this.request<D.OrganizationQuery, D.OrganizationQueryVariables>(D.OrganizationDocument, {}).then(
      response => {
        const data = response?.organization;
        return data ? new Organization(this.request, data) : undefined;
      }
    );
  }
}

/**
 * A fetchable OrganizationExists Query
 *
 * @param request - function to call the graphql client
 */
class OrganizationExistsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationExists Query and return a OrganizationExistsPayload
   *
   * @param urlKey - required urlKey variable to set the  scope
   */
  public async fetch(urlKey: string): Promise<OrganizationExistsPayload | undefined> {
    return this.request<D.OrganizationExistsQuery, D.OrganizationExistsQueryVariables>(D.OrganizationExistsDocument, {
      urlKey,
    }).then(response => {
      const data = response?.organizationExists;
      return data ? new OrganizationExistsPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable SyncBootstrap Query
 *
 * @param request - function to call the graphql client
 */
class SyncBootstrapQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the SyncBootstrap Query and return a SyncResponse
   *
   * @param databaseVersion - required databaseVersion variable to set the  scope
   * @param sinceSyncId - required sinceSyncId variable to set the  scope
   */
  public async fetch(databaseVersion: number, sinceSyncId: number): Promise<SyncResponse | undefined> {
    return this.request<D.SyncBootstrapQuery, D.SyncBootstrapQueryVariables>(D.SyncBootstrapDocument, {
      databaseVersion,
      sinceSyncId,
    }).then(response => {
      const data = response?.syncBootstrap;
      return data ? new SyncResponse(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable SyncUpdates Query
 *
 * @param request - function to call the graphql client
 */
class SyncUpdatesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the SyncUpdates Query and return a SyncResponse
   *
   * @param sinceSyncId - required sinceSyncId variable to set the  scope
   */
  public async fetch(sinceSyncId: number): Promise<SyncResponse | undefined> {
    return this.request<D.SyncUpdatesQuery, D.SyncUpdatesQueryVariables>(D.SyncUpdatesDocument, {
      sinceSyncId,
    }).then(response => {
      const data = response?.syncUpdates;
      return data ? new SyncResponse(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ArchivedModelSync Query
 *
 * @param request - function to call the graphql client
 */
class ArchivedModelSyncQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ArchivedModelSync Query and return a ArchiveResponse
   *
   * @param identifier - required identifier variable to set the  scope
   * @param modelClass - required modelClass variable to set the  scope
   */
  public async fetch(identifier: string, modelClass: string): Promise<ArchiveResponse | undefined> {
    return this.request<D.ArchivedModelSyncQuery, D.ArchivedModelSyncQueryVariables>(D.ArchivedModelSyncDocument, {
      identifier,
      modelClass,
    }).then(response => {
      const data = response?.archivedModelSync;
      return data ? new ArchiveResponse(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ArchivedModelsSync Query
 *
 * @param request - function to call the graphql client
 */
class ArchivedModelsSyncQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ArchivedModelsSync Query and return a ArchiveResponse
   *
   * @param modelClass - required modelClass variable to set the  scope
   * @param teamId - required teamId variable to set the  scope
   * @param vars - variables without 'modelClass', 'teamId' to pass into the ArchivedModelsSyncQuery
   */
  public async fetch(
    modelClass: string,
    teamId: string,
    vars?: Omit<D.ArchivedModelsSyncQueryVariables, "modelClass" | "teamId">
  ): Promise<ArchiveResponse | undefined> {
    return this.request<D.ArchivedModelsSyncQuery, D.ArchivedModelsSyncQueryVariables>(D.ArchivedModelsSyncDocument, {
      modelClass,
      teamId,
      ...vars,
    }).then(response => {
      const data = response?.archivedModelsSync;
      return data ? new ArchiveResponse(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable AdminUserAccountLookup Query
 *
 * @param request - function to call the graphql client
 */
class AdminUserAccountLookupQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the AdminUserAccountLookup Query and return a UserAccountAdminPrivileged
   *
   * @param vars - variables to pass into the AdminUserAccountLookupQuery
   */
  public async fetch(vars?: D.AdminUserAccountLookupQueryVariables): Promise<UserAccountAdminPrivileged | undefined> {
    return this.request<D.AdminUserAccountLookupQuery, D.AdminUserAccountLookupQueryVariables>(
      D.AdminUserAccountLookupDocument,
      vars
    ).then(response => {
      const data = response?.adminUserAccountLookup;
      return data ? new UserAccountAdminPrivileged(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Users Query
 *
 * @param request - function to call the graphql client
 */
class UsersQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Users Query and return a UserConnection
   *
   * @param vars - variables to pass into the UsersQuery
   */
  public async fetch(vars?: D.UsersQueryVariables): Promise<UserConnection | undefined> {
    return this.request<D.UsersQuery, D.UsersQueryVariables>(D.UsersDocument, vars).then(response => {
      const data = response?.users;
      return data ? new UserConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ApiKeys Query
 *
 * @param request - function to call the graphql client
 */
class ApiKeysQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ApiKeys Query and return a ApiKeyConnection
   *
   * @param vars - variables to pass into the ApiKeysQuery
   */
  public async fetch(vars?: D.ApiKeysQueryVariables): Promise<ApiKeyConnection | undefined> {
    return this.request<D.ApiKeysQuery, D.ApiKeysQueryVariables>(D.ApiKeysDocument, vars).then(response => {
      const data = response?.apiKeys;
      return data ? new ApiKeyConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ApplicationWithAuthorization Query
 *
 * @param request - function to call the graphql client
 */
class ApplicationWithAuthorizationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ApplicationWithAuthorization Query and return a UserAuthorizedApplication
   *
   * @param scope - required scope variable to set the  scope
   * @param clientId - required clientId variable to set the  scope
   * @param vars - variables without 'scope', 'clientId' to pass into the ApplicationWithAuthorizationQuery
   */
  public async fetch(
    scope: string[],
    clientId: string,
    vars?: Omit<D.ApplicationWithAuthorizationQueryVariables, "scope" | "clientId">
  ): Promise<UserAuthorizedApplication | undefined> {
    return this.request<D.ApplicationWithAuthorizationQuery, D.ApplicationWithAuthorizationQueryVariables>(
      D.ApplicationWithAuthorizationDocument,
      {
        scope,
        clientId,
        ...vars,
      }
    ).then(response => {
      const data = response?.applicationWithAuthorization;
      return data ? new UserAuthorizedApplication(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable AuthorizedApplications Query
 *
 * @param request - function to call the graphql client
 */
class AuthorizedApplicationsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the AuthorizedApplications Query and return a AuthorizedApplication list
   *
   */
  public async fetch(): Promise<AuthorizedApplication[] | undefined> {
    return this.request<D.AuthorizedApplicationsQuery, D.AuthorizedApplicationsQueryVariables>(
      D.AuthorizedApplicationsDocument,
      {}
    ).then(response => {
      const data = response?.authorizedApplications;
      return data ? data.map(node => new AuthorizedApplication(this.request, node)) : undefined;
    });
  }
}

/**
 * A fetchable SsoUrlFromEmail Query
 *
 * @param request - function to call the graphql client
 */
class SsoUrlFromEmailQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the SsoUrlFromEmail Query and return a SsoUrlFromEmailResponse
   *
   * @param email - required email variable to set the  scope
   * @param vars - variables without 'email' to pass into the SsoUrlFromEmailQuery
   */
  public async fetch(
    email: string,
    vars?: Omit<D.SsoUrlFromEmailQueryVariables, "email">
  ): Promise<SsoUrlFromEmailResponse | undefined> {
    return this.request<D.SsoUrlFromEmailQuery, D.SsoUrlFromEmailQueryVariables>(D.SsoUrlFromEmailDocument, {
      email,
      ...vars,
    }).then(response => {
      const data = response?.ssoUrlFromEmail;
      return data ? new SsoUrlFromEmailResponse(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable BillingDetails Query
 *
 * @param request - function to call the graphql client
 */
class BillingDetailsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the BillingDetails Query and return a BillingDetailsPayload
   *
   */
  public async fetch(): Promise<BillingDetailsPayload | undefined> {
    return this.request<D.BillingDetailsQuery, D.BillingDetailsQueryVariables>(D.BillingDetailsDocument, {}).then(
      response => {
        const data = response?.billingDetails;
        return data ? new BillingDetailsPayload(this.request, data) : undefined;
      }
    );
  }
}

/**
 * A fetchable CollaborativeDocumentJoin Query
 *
 * @param request - function to call the graphql client
 */
class CollaborativeDocumentJoinQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CollaborativeDocumentJoin Query and return a CollaborationDocumentUpdatePayload
   *
   * @param clientId - required clientId variable to set the  scope
   * @param issueId - required issueId variable to set the  scope
   * @param version - required version variable to set the  scope
   */
  public async fetch(
    clientId: string,
    issueId: string,
    version: number
  ): Promise<CollaborationDocumentUpdatePayload | undefined> {
    return this.request<D.CollaborativeDocumentJoinQuery, D.CollaborativeDocumentJoinQueryVariables>(
      D.CollaborativeDocumentJoinDocument,
      {
        clientId,
        issueId,
        version,
      }
    ).then(response => {
      const data = response?.collaborativeDocumentJoin;
      return data ? new CollaborationDocumentUpdatePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Comment Query
 *
 * @param request - function to call the graphql client
 */
class CommentQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Comment Query and return a Comment
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<Comment | undefined> {
    return this.request<D.CommentQuery, D.CommentQueryVariables>(D.CommentDocument, {
      id,
    }).then(response => {
      const data = response?.comment;
      return data ? new Comment(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Comments Query
 *
 * @param request - function to call the graphql client
 */
class CommentsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Comments Query and return a CommentConnection
   *
   * @param vars - variables to pass into the CommentsQuery
   */
  public async fetch(vars?: D.CommentsQueryVariables): Promise<CommentConnection | undefined> {
    return this.request<D.CommentsQuery, D.CommentsQueryVariables>(D.CommentsDocument, vars).then(response => {
      const data = response?.comments;
      return data ? new CommentConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CustomView Query
 *
 * @param request - function to call the graphql client
 */
class CustomViewQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CustomView Query and return a CustomView
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<CustomView | undefined> {
    return this.request<D.CustomViewQuery, D.CustomViewQueryVariables>(D.CustomViewDocument, {
      id,
    }).then(response => {
      const data = response?.customView;
      return data ? new CustomView(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CustomViews Query
 *
 * @param request - function to call the graphql client
 */
class CustomViewsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CustomViews Query and return a CustomViewConnection
   *
   * @param vars - variables to pass into the CustomViewsQuery
   */
  public async fetch(vars?: D.CustomViewsQueryVariables): Promise<CustomViewConnection | undefined> {
    return this.request<D.CustomViewsQuery, D.CustomViewsQueryVariables>(D.CustomViewsDocument, vars).then(response => {
      const data = response?.customViews;
      return data ? new CustomViewConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Cycle Query
 *
 * @param request - function to call the graphql client
 */
class CycleQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Cycle Query and return a Cycle
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<Cycle | undefined> {
    return this.request<D.CycleQuery, D.CycleQueryVariables>(D.CycleDocument, {
      id,
    }).then(response => {
      const data = response?.cycle;
      return data ? new Cycle(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Cycles Query
 *
 * @param request - function to call the graphql client
 */
class CyclesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Cycles Query and return a CycleConnection
   *
   * @param vars - variables to pass into the CyclesQuery
   */
  public async fetch(vars?: D.CyclesQueryVariables): Promise<CycleConnection | undefined> {
    return this.request<D.CyclesQuery, D.CyclesQueryVariables>(D.CyclesDocument, vars).then(response => {
      const data = response?.cycles;
      return data ? new CycleConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Emoji Query
 *
 * @param request - function to call the graphql client
 */
class EmojiQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Emoji Query and return a Emoji
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<Emoji | undefined> {
    return this.request<D.EmojiQuery, D.EmojiQueryVariables>(D.EmojiDocument, {
      id,
    }).then(response => {
      const data = response?.emoji;
      return data ? new Emoji(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Emojis Query
 *
 * @param request - function to call the graphql client
 */
class EmojisQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Emojis Query and return a EmojiConnection
   *
   * @param vars - variables to pass into the EmojisQuery
   */
  public async fetch(vars?: D.EmojisQueryVariables): Promise<EmojiConnection | undefined> {
    return this.request<D.EmojisQuery, D.EmojisQueryVariables>(D.EmojisDocument, vars).then(response => {
      const data = response?.emojis;
      return data ? new EmojiConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Favorite Query
 *
 * @param request - function to call the graphql client
 */
class FavoriteQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Favorite Query and return a Favorite
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<Favorite | undefined> {
    return this.request<D.FavoriteQuery, D.FavoriteQueryVariables>(D.FavoriteDocument, {
      id,
    }).then(response => {
      const data = response?.favorite;
      return data ? new Favorite(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Favorites Query
 *
 * @param request - function to call the graphql client
 */
class FavoritesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Favorites Query and return a FavoriteConnection
   *
   * @param vars - variables to pass into the FavoritesQuery
   */
  public async fetch(vars?: D.FavoritesQueryVariables): Promise<FavoriteConnection | undefined> {
    return this.request<D.FavoritesQuery, D.FavoritesQueryVariables>(D.FavoritesDocument, vars).then(response => {
      const data = response?.favorites;
      return data ? new FavoriteConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable FigmaEmbedInfo Query
 *
 * @param request - function to call the graphql client
 */
class FigmaEmbedInfoQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the FigmaEmbedInfo Query and return a FigmaEmbedPayload
   *
   * @param fileId - required fileId variable to set the  scope
   * @param vars - variables without 'fileId' to pass into the FigmaEmbedInfoQuery
   */
  public async fetch(
    fileId: string,
    vars?: Omit<D.FigmaEmbedInfoQueryVariables, "fileId">
  ): Promise<FigmaEmbedPayload | undefined> {
    return this.request<D.FigmaEmbedInfoQuery, D.FigmaEmbedInfoQueryVariables>(D.FigmaEmbedInfoDocument, {
      fileId,
      ...vars,
    }).then(response => {
      const data = response?.figmaEmbedInfo;
      return data ? new FigmaEmbedPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Integration Query
 *
 * @param request - function to call the graphql client
 */
class IntegrationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Integration Query and return a Integration
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<Integration | undefined> {
    return this.request<D.IntegrationQuery, D.IntegrationQueryVariables>(D.IntegrationDocument, {
      id,
    }).then(response => {
      const data = response?.integration;
      return data ? new Integration(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Integrations Query
 *
 * @param request - function to call the graphql client
 */
class IntegrationsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Integrations Query and return a IntegrationConnection
   *
   * @param vars - variables to pass into the IntegrationsQuery
   */
  public async fetch(vars?: D.IntegrationsQueryVariables): Promise<IntegrationConnection | undefined> {
    return this.request<D.IntegrationsQuery, D.IntegrationsQueryVariables>(D.IntegrationsDocument, vars).then(
      response => {
        const data = response?.integrations;
        return data ? new IntegrationConnection(this.request, data) : undefined;
      }
    );
  }
}

/**
 * A fetchable IntegrationResource Query
 *
 * @param request - function to call the graphql client
 */
class IntegrationResourceQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationResource Query and return a IntegrationResource
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<IntegrationResource | undefined> {
    return this.request<D.IntegrationResourceQuery, D.IntegrationResourceQueryVariables>(
      D.IntegrationResourceDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.integrationResource;
      return data ? new IntegrationResource(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationResources Query
 *
 * @param request - function to call the graphql client
 */
class IntegrationResourcesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationResources Query and return a IntegrationResourceConnection
   *
   * @param vars - variables to pass into the IntegrationResourcesQuery
   */
  public async fetch(vars?: D.IntegrationResourcesQueryVariables): Promise<IntegrationResourceConnection | undefined> {
    return this.request<D.IntegrationResourcesQuery, D.IntegrationResourcesQueryVariables>(
      D.IntegrationResourcesDocument,
      vars
    ).then(response => {
      const data = response?.integrationResources;
      return data ? new IntegrationResourceConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable InviteInfo Query
 *
 * @param request - function to call the graphql client
 */
class InviteInfoQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the InviteInfo Query and return a InvitePagePayload
   *
   * @param userHash - required userHash variable to set the  scope
   * @param vars - variables without 'userHash' to pass into the InviteInfoQuery
   */
  public async fetch(
    userHash: string,
    vars?: Omit<D.InviteInfoQueryVariables, "userHash">
  ): Promise<InvitePagePayload | undefined> {
    return this.request<D.InviteInfoQuery, D.InviteInfoQueryVariables>(D.InviteInfoDocument, {
      userHash,
      ...vars,
    }).then(response => {
      const data = response?.inviteInfo;
      return data ? new InvitePagePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueLabel Query
 *
 * @param request - function to call the graphql client
 */
class IssueLabelQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueLabel Query and return a IssueLabel
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<IssueLabel | undefined> {
    return this.request<D.IssueLabelQuery, D.IssueLabelQueryVariables>(D.IssueLabelDocument, {
      id,
    }).then(response => {
      const data = response?.issueLabel;
      return data ? new IssueLabel(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueLabels Query
 *
 * @param request - function to call the graphql client
 */
class IssueLabelsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueLabels Query and return a IssueLabelConnection
   *
   * @param vars - variables to pass into the IssueLabelsQuery
   */
  public async fetch(vars?: D.IssueLabelsQueryVariables): Promise<IssueLabelConnection | undefined> {
    return this.request<D.IssueLabelsQuery, D.IssueLabelsQueryVariables>(D.IssueLabelsDocument, vars).then(response => {
      const data = response?.issueLabels;
      return data ? new IssueLabelConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueRelation Query
 *
 * @param request - function to call the graphql client
 */
class IssueRelationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueRelation Query and return a IssueRelation
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<IssueRelation | undefined> {
    return this.request<D.IssueRelationQuery, D.IssueRelationQueryVariables>(D.IssueRelationDocument, {
      id,
    }).then(response => {
      const data = response?.issueRelation;
      return data ? new IssueRelation(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueRelations Query
 *
 * @param request - function to call the graphql client
 */
class IssueRelationsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueRelations Query and return a IssueRelationConnection
   *
   * @param vars - variables to pass into the IssueRelationsQuery
   */
  public async fetch(vars?: D.IssueRelationsQueryVariables): Promise<IssueRelationConnection | undefined> {
    return this.request<D.IssueRelationsQuery, D.IssueRelationsQueryVariables>(D.IssueRelationsDocument, vars).then(
      response => {
        const data = response?.issueRelations;
        return data ? new IssueRelationConnection(this.request, data) : undefined;
      }
    );
  }
}

/**
 * A fetchable Issue Query
 *
 * @param request - function to call the graphql client
 */
class IssueQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Issue Query and return a Issue
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<Issue | undefined> {
    return this.request<D.IssueQuery, D.IssueQueryVariables>(D.IssueDocument, {
      id,
    }).then(response => {
      const data = response?.issue;
      return data ? new Issue(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueSearch Query
 *
 * @param request - function to call the graphql client
 */
class IssueSearchQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueSearch Query and return a IssueConnection
   *
   * @param query - required query variable to set the  scope
   * @param vars - variables without 'query' to pass into the IssueSearchQuery
   */
  public async fetch(
    query: string,
    vars?: Omit<D.IssueSearchQueryVariables, "query">
  ): Promise<IssueConnection | undefined> {
    return this.request<D.IssueSearchQuery, D.IssueSearchQueryVariables>(D.IssueSearchDocument, {
      query,
      ...vars,
    }).then(response => {
      const data = response?.issueSearch;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Issues Query
 *
 * @param request - function to call the graphql client
 */
class IssuesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Issues Query and return a IssueConnection
   *
   * @param vars - variables to pass into the IssuesQuery
   */
  public async fetch(vars?: D.IssuesQueryVariables): Promise<IssueConnection | undefined> {
    return this.request<D.IssuesQuery, D.IssuesQueryVariables>(D.IssuesDocument, vars).then(response => {
      const data = response?.issues;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Milestone Query
 *
 * @param request - function to call the graphql client
 */
class MilestoneQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Milestone Query and return a Milestone
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<Milestone | undefined> {
    return this.request<D.MilestoneQuery, D.MilestoneQueryVariables>(D.MilestoneDocument, {
      id,
    }).then(response => {
      const data = response?.milestone;
      return data ? new Milestone(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Milestones Query
 *
 * @param request - function to call the graphql client
 */
class MilestonesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Milestones Query and return a MilestoneConnection
   *
   * @param vars - variables to pass into the MilestonesQuery
   */
  public async fetch(vars?: D.MilestonesQueryVariables): Promise<MilestoneConnection | undefined> {
    return this.request<D.MilestonesQuery, D.MilestonesQueryVariables>(D.MilestonesDocument, vars).then(response => {
      const data = response?.milestones;
      return data ? new MilestoneConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Notification Query
 *
 * @param request - function to call the graphql client
 */
class NotificationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Notification Query and return a UserSettings
   *
   */
  public async fetch(): Promise<UserSettings | undefined> {
    return this.request<D.NotificationQuery, D.NotificationQueryVariables>(D.NotificationDocument, {}).then(
      response => {
        const data = response?.notification;
        return data ? new UserSettings(this.request, data) : undefined;
      }
    );
  }
}

/**
 * A fetchable Notifications Query
 *
 * @param request - function to call the graphql client
 */
class NotificationsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Notifications Query and return a NotificationConnection
   *
   * @param vars - variables to pass into the NotificationsQuery
   */
  public async fetch(vars?: D.NotificationsQueryVariables): Promise<NotificationConnection | undefined> {
    return this.request<D.NotificationsQuery, D.NotificationsQueryVariables>(D.NotificationsDocument, vars).then(
      response => {
        const data = response?.notifications;
        return data ? new NotificationConnection(this.request, data) : undefined;
      }
    );
  }
}

/**
 * A fetchable NotificationSubscription Query
 *
 * @param request - function to call the graphql client
 */
class NotificationSubscriptionQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the NotificationSubscription Query and return a NotificationSubscriptionConnection
   *
   * @param vars - variables to pass into the NotificationSubscriptionQuery
   */
  public async fetch(
    vars?: D.NotificationSubscriptionQueryVariables
  ): Promise<NotificationSubscriptionConnection | undefined> {
    return this.request<D.NotificationSubscriptionQuery, D.NotificationSubscriptionQueryVariables>(
      D.NotificationSubscriptionDocument,
      vars
    ).then(response => {
      const data = response?.notificationSubscription;
      return data ? new NotificationSubscriptionConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationInvite Query
 *
 * @param request - function to call the graphql client
 */
class OrganizationInviteQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationInvite Query and return a IssueLabel
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<IssueLabel | undefined> {
    return this.request<D.OrganizationInviteQuery, D.OrganizationInviteQueryVariables>(D.OrganizationInviteDocument, {
      id,
    }).then(response => {
      const data = response?.organizationInvite;
      return data ? new IssueLabel(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationInvites Query
 *
 * @param request - function to call the graphql client
 */
class OrganizationInvitesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationInvites Query and return a OrganizationInviteConnection
   *
   * @param vars - variables to pass into the OrganizationInvitesQuery
   */
  public async fetch(vars?: D.OrganizationInvitesQueryVariables): Promise<OrganizationInviteConnection | undefined> {
    return this.request<D.OrganizationInvitesQuery, D.OrganizationInvitesQueryVariables>(
      D.OrganizationInvitesDocument,
      vars
    ).then(response => {
      const data = response?.organizationInvites;
      return data ? new OrganizationInviteConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ProjectLink Query
 *
 * @param request - function to call the graphql client
 */
class ProjectLinkQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ProjectLink Query and return a ProjectLink
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ProjectLink | undefined> {
    return this.request<D.ProjectLinkQuery, D.ProjectLinkQueryVariables>(D.ProjectLinkDocument, {
      id,
    }).then(response => {
      const data = response?.projectLink;
      return data ? new ProjectLink(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ProjectLinks Query
 *
 * @param request - function to call the graphql client
 */
class ProjectLinksQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ProjectLinks Query and return a ProjectLinkConnection
   *
   * @param vars - variables to pass into the ProjectLinksQuery
   */
  public async fetch(vars?: D.ProjectLinksQueryVariables): Promise<ProjectLinkConnection | undefined> {
    return this.request<D.ProjectLinksQuery, D.ProjectLinksQueryVariables>(D.ProjectLinksDocument, vars).then(
      response => {
        const data = response?.ProjectLinks;
        return data ? new ProjectLinkConnection(this.request, data) : undefined;
      }
    );
  }
}

/**
 * A fetchable Project Query
 *
 * @param request - function to call the graphql client
 */
class ProjectQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Project Query and return a Project
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<Project | undefined> {
    return this.request<D.ProjectQuery, D.ProjectQueryVariables>(D.ProjectDocument, {
      id,
    }).then(response => {
      const data = response?.project;
      return data ? new Project(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Projects Query
 *
 * @param request - function to call the graphql client
 */
class ProjectsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Projects Query and return a ProjectConnection
   *
   * @param vars - variables to pass into the ProjectsQuery
   */
  public async fetch(vars?: D.ProjectsQueryVariables): Promise<ProjectConnection | undefined> {
    return this.request<D.ProjectsQuery, D.ProjectsQueryVariables>(D.ProjectsDocument, vars).then(response => {
      const data = response?.projects;
      return data ? new ProjectConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable PushSubscriptionTest Query
 *
 * @param request - function to call the graphql client
 */
class PushSubscriptionTestQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the PushSubscriptionTest Query and return a PushSubscriptionPayload
   *
   */
  public async fetch(): Promise<PushSubscriptionPayload | undefined> {
    return this.request<D.PushSubscriptionTestQuery, D.PushSubscriptionTestQueryVariables>(
      D.PushSubscriptionTestDocument,
      {}
    ).then(response => {
      const data = response?.pushSubscriptionTest;
      return data ? new PushSubscriptionPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Reaction Query
 *
 * @param request - function to call the graphql client
 */
class ReactionQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Reaction Query and return a Reaction
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<Reaction | undefined> {
    return this.request<D.ReactionQuery, D.ReactionQueryVariables>(D.ReactionDocument, {
      id,
    }).then(response => {
      const data = response?.reaction;
      return data ? new Reaction(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Reactions Query
 *
 * @param request - function to call the graphql client
 */
class ReactionsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Reactions Query and return a ReactionConnection
   *
   * @param vars - variables to pass into the ReactionsQuery
   */
  public async fetch(vars?: D.ReactionsQueryVariables): Promise<ReactionConnection | undefined> {
    return this.request<D.ReactionsQuery, D.ReactionsQueryVariables>(D.ReactionsDocument, vars).then(response => {
      const data = response?.reactions;
      return data ? new ReactionConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Subscription Query
 *
 * @param request - function to call the graphql client
 */
class SubscriptionQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Subscription Query and return a Subscription
   *
   */
  public async fetch(): Promise<Subscription | undefined> {
    return this.request<D.SubscriptionQuery, D.SubscriptionQueryVariables>(D.SubscriptionDocument, {}).then(
      response => {
        const data = response?.subscription;
        return data ? new Subscription(this.request, data) : undefined;
      }
    );
  }
}

/**
 * A fetchable TeamMembership Query
 *
 * @param request - function to call the graphql client
 */
class TeamMembershipQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the TeamMembership Query and return a TeamMembership
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<TeamMembership | undefined> {
    return this.request<D.TeamMembershipQuery, D.TeamMembershipQueryVariables>(D.TeamMembershipDocument, {
      id,
    }).then(response => {
      const data = response?.teamMembership;
      return data ? new TeamMembership(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable TeamMemberships Query
 *
 * @param request - function to call the graphql client
 */
class TeamMembershipsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the TeamMemberships Query and return a TeamMembershipConnection
   *
   * @param vars - variables to pass into the TeamMembershipsQuery
   */
  public async fetch(vars?: D.TeamMembershipsQueryVariables): Promise<TeamMembershipConnection | undefined> {
    return this.request<D.TeamMembershipsQuery, D.TeamMembershipsQueryVariables>(D.TeamMembershipsDocument, vars).then(
      response => {
        const data = response?.teamMemberships;
        return data ? new TeamMembershipConnection(this.request, data) : undefined;
      }
    );
  }
}

/**
 * A fetchable Team Query
 *
 * @param request - function to call the graphql client
 */
class TeamQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Team Query and return a Team
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<Team | undefined> {
    return this.request<D.TeamQuery, D.TeamQueryVariables>(D.TeamDocument, {
      id,
    }).then(response => {
      const data = response?.team;
      return data ? new Team(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Teams Query
 *
 * @param request - function to call the graphql client
 */
class TeamsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Teams Query and return a TeamConnection
   *
   * @param vars - variables to pass into the TeamsQuery
   */
  public async fetch(vars?: D.TeamsQueryVariables): Promise<TeamConnection | undefined> {
    return this.request<D.TeamsQuery, D.TeamsQueryVariables>(D.TeamsDocument, vars).then(response => {
      const data = response?.teams;
      return data ? new TeamConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Templates Query
 *
 * @param request - function to call the graphql client
 */
class TemplatesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Templates Query and return a Template list
   *
   */
  public async fetch(): Promise<Template[] | undefined> {
    return this.request<D.TemplatesQuery, D.TemplatesQueryVariables>(D.TemplatesDocument, {}).then(response => {
      const data = response?.templates;
      return data ? data.map(node => new Template(this.request, node)) : undefined;
    });
  }
}

/**
 * A fetchable Template Query
 *
 * @param request - function to call the graphql client
 */
class TemplateQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Template Query and return a Template
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<Template | undefined> {
    return this.request<D.TemplateQuery, D.TemplateQueryVariables>(D.TemplateDocument, {
      id,
    }).then(response => {
      const data = response?.template;
      return data ? new Template(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ViewPreferences Query
 *
 * @param request - function to call the graphql client
 */
class ViewPreferencesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ViewPreferences Query and return a ViewPreferencesConnection
   *
   * @param vars - variables to pass into the ViewPreferencesQuery
   */
  public async fetch(vars?: D.ViewPreferencesQueryVariables): Promise<ViewPreferencesConnection | undefined> {
    return this.request<D.ViewPreferencesQuery, D.ViewPreferencesQueryVariables>(D.ViewPreferencesDocument, vars).then(
      response => {
        const data = response?.viewPreferences;
        return data ? new ViewPreferencesConnection(this.request, data) : undefined;
      }
    );
  }
}

/**
 * A fetchable Webhook Query
 *
 * @param request - function to call the graphql client
 */
class WebhookQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Webhook Query and return a Webhook
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<Webhook | undefined> {
    return this.request<D.WebhookQuery, D.WebhookQueryVariables>(D.WebhookDocument, {
      id,
    }).then(response => {
      const data = response?.webhook;
      return data ? new Webhook(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Webhooks Query
 *
 * @param request - function to call the graphql client
 */
class WebhooksQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Webhooks Query and return a WebhookConnection
   *
   * @param vars - variables to pass into the WebhooksQuery
   */
  public async fetch(vars?: D.WebhooksQueryVariables): Promise<WebhookConnection | undefined> {
    return this.request<D.WebhooksQuery, D.WebhooksQueryVariables>(D.WebhooksDocument, vars).then(response => {
      const data = response?.webhooks;
      return data ? new WebhookConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable WorkflowState Query
 *
 * @param request - function to call the graphql client
 */
class WorkflowStateQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the WorkflowState Query and return a WorkflowState
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<WorkflowState | undefined> {
    return this.request<D.WorkflowStateQuery, D.WorkflowStateQueryVariables>(D.WorkflowStateDocument, {
      id,
    }).then(response => {
      const data = response?.workflowState;
      return data ? new WorkflowState(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable WorkflowStates Query
 *
 * @param request - function to call the graphql client
 */
class WorkflowStatesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the WorkflowStates Query and return a WorkflowStateConnection
   *
   * @param vars - variables to pass into the WorkflowStatesQuery
   */
  public async fetch(vars?: D.WorkflowStatesQueryVariables): Promise<WorkflowStateConnection | undefined> {
    return this.request<D.WorkflowStatesQuery, D.WorkflowStatesQueryVariables>(D.WorkflowStatesDocument, vars).then(
      response => {
        const data = response?.workflowStates;
        return data ? new WorkflowStateConnection(this.request, data) : undefined;
      }
    );
  }
}

/**
 * A fetchable UserUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class UserUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the UserUpdate Mutation and return a UserPayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.UpdateUserInput, id: string): Promise<UserPayload | undefined> {
    return this.request<D.UserUpdateMutation, D.UserUpdateMutationVariables>(D.UserUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.userUpdate;
      return data ? new UserPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable UserPromoteAdmin Mutation
 *
 * @param request - function to call the graphql client
 */
class UserPromoteAdminMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the UserPromoteAdmin Mutation and return a UserAdminPayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<UserAdminPayload | undefined> {
    return this.request<D.UserPromoteAdminMutation, D.UserPromoteAdminMutationVariables>(D.UserPromoteAdminDocument, {
      id,
    }).then(response => {
      const data = response?.userPromoteAdmin;
      return data ? new UserAdminPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable UserDemoteAdmin Mutation
 *
 * @param request - function to call the graphql client
 */
class UserDemoteAdminMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the UserDemoteAdmin Mutation and return a UserAdminPayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<UserAdminPayload | undefined> {
    return this.request<D.UserDemoteAdminMutation, D.UserDemoteAdminMutationVariables>(D.UserDemoteAdminDocument, {
      id,
    }).then(response => {
      const data = response?.userDemoteAdmin;
      return data ? new UserAdminPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable UserSuspend Mutation
 *
 * @param request - function to call the graphql client
 */
class UserSuspendMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the UserSuspend Mutation and return a UserAdminPayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<UserAdminPayload | undefined> {
    return this.request<D.UserSuspendMutation, D.UserSuspendMutationVariables>(D.UserSuspendDocument, {
      id,
    }).then(response => {
      const data = response?.userSuspend;
      return data ? new UserAdminPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable UserUnsuspend Mutation
 *
 * @param request - function to call the graphql client
 */
class UserUnsuspendMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the UserUnsuspend Mutation and return a UserAdminPayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<UserAdminPayload | undefined> {
    return this.request<D.UserUnsuspendMutation, D.UserUnsuspendMutationVariables>(D.UserUnsuspendDocument, {
      id,
    }).then(response => {
      const data = response?.userUnsuspend;
      return data ? new UserAdminPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class OrganizationUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationUpdate Mutation and return a OrganizationPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.UpdateOrganizationInput): Promise<OrganizationPayload | undefined> {
    return this.request<D.OrganizationUpdateMutation, D.OrganizationUpdateMutationVariables>(
      D.OrganizationUpdateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.organizationUpdate;
      return data ? new OrganizationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationDeleteChallenge Mutation
 *
 * @param request - function to call the graphql client
 */
class OrganizationDeleteChallengeMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationDeleteChallenge Mutation and return a OrganizationDeletePayload
   *
   */
  public async fetch(): Promise<OrganizationDeletePayload | undefined> {
    return this.request<D.OrganizationDeleteChallengeMutation, D.OrganizationDeleteChallengeMutationVariables>(
      D.OrganizationDeleteChallengeDocument,
      {}
    ).then(response => {
      const data = response?.organizationDeleteChallenge;
      return data ? new OrganizationDeletePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class OrganizationDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationDelete Mutation and return a OrganizationDeletePayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.DeleteOrganizationInput): Promise<OrganizationDeletePayload | undefined> {
    return this.request<D.OrganizationDeleteMutation, D.OrganizationDeleteMutationVariables>(
      D.OrganizationDeleteDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.organizationDelete;
      return data ? new OrganizationDeletePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable AdminDeleteIntegration Mutation
 *
 * @param request - function to call the graphql client
 */
class AdminDeleteIntegrationMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the AdminDeleteIntegration Mutation and return a AdminIntegrationPayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<AdminIntegrationPayload | undefined> {
    return this.request<D.AdminDeleteIntegrationMutation, D.AdminDeleteIntegrationMutationVariables>(
      D.AdminDeleteIntegrationDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.adminDeleteIntegration;
      return data ? new AdminIntegrationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationToggleAccess Mutation
 *
 * @param request - function to call the graphql client
 */
class OrganizationToggleAccessMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationToggleAccess Mutation and return a OrganizationAccessPayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<OrganizationAccessPayload | undefined> {
    return this.request<D.OrganizationToggleAccessMutation, D.OrganizationToggleAccessMutationVariables>(
      D.OrganizationToggleAccessDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.organizationToggleAccess;
      return data ? new OrganizationAccessPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationChangeEmailDomain Mutation
 *
 * @param request - function to call the graphql client
 */
class OrganizationChangeEmailDomainMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationChangeEmailDomain Mutation and return a OrganizationAccessPayload
   *
   * @param toDomain - required toDomain variable to set the  scope
   * @param fromDomain - required fromDomain variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(toDomain: string, fromDomain: string, id: string): Promise<OrganizationAccessPayload | undefined> {
    return this.request<D.OrganizationChangeEmailDomainMutation, D.OrganizationChangeEmailDomainMutationVariables>(
      D.OrganizationChangeEmailDomainDocument,
      {
        toDomain,
        fromDomain,
        id,
      }
    ).then(response => {
      const data = response?.organizationChangeEmailDomain;
      return data ? new OrganizationAccessPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationToggleSamlEnabled Mutation
 *
 * @param request - function to call the graphql client
 */
class OrganizationToggleSamlEnabledMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationToggleSamlEnabled Mutation and return a OrganizationSamlConfigurePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<OrganizationSamlConfigurePayload | undefined> {
    return this.request<D.OrganizationToggleSamlEnabledMutation, D.OrganizationToggleSamlEnabledMutationVariables>(
      D.OrganizationToggleSamlEnabledDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.organizationToggleSamlEnabled;
      return data ? new OrganizationSamlConfigurePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationConfigureSaml Mutation
 *
 * @param request - function to call the graphql client
 */
class OrganizationConfigureSamlMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationConfigureSaml Mutation and return a OrganizationSamlConfigurePayload
   *
   * @param samlConfiguration - required samlConfiguration variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(
    samlConfiguration: D.SamlConfigurationInput,
    id: string
  ): Promise<OrganizationSamlConfigurePayload | undefined> {
    return this.request<D.OrganizationConfigureSamlMutation, D.OrganizationConfigureSamlMutationVariables>(
      D.OrganizationConfigureSamlDocument,
      {
        samlConfiguration,
        id,
      }
    ).then(response => {
      const data = response?.organizationConfigureSaml;
      return data ? new OrganizationSamlConfigurePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable AdminCommand Mutation
 *
 * @param request - function to call the graphql client
 */
class AdminCommandMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the AdminCommand Mutation and return a AdminCommandPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.AdminCommandInput): Promise<AdminCommandPayload | undefined> {
    return this.request<D.AdminCommandMutation, D.AdminCommandMutationVariables>(D.AdminCommandDocument, {
      input,
    }).then(response => {
      const data = response?.adminCommand;
      return data ? new AdminCommandPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable AdminBulkEmail Mutation
 *
 * @param request - function to call the graphql client
 */
class AdminBulkEmailMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the AdminBulkEmail Mutation and return a AdminCommandPayload
   *
   * @param emails - required emails variable to set the  scope
   * @param markdownContent - required markdownContent variable to set the  scope
   * @param subject - required subject variable to set the  scope
   * @param vars - variables without 'emails', 'markdownContent', 'subject' to pass into the AdminBulkEmailMutation
   */
  public async fetch(
    emails: string[],
    markdownContent: string,
    subject: string,
    vars?: Omit<D.AdminBulkEmailMutationVariables, "emails" | "markdownContent" | "subject">
  ): Promise<AdminCommandPayload | undefined> {
    return this.request<D.AdminBulkEmailMutation, D.AdminBulkEmailMutationVariables>(D.AdminBulkEmailDocument, {
      emails,
      markdownContent,
      subject,
      ...vars,
    }).then(response => {
      const data = response?.adminBulkEmail;
      return data ? new AdminCommandPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable AdminCreateStripeCustomer Mutation
 *
 * @param request - function to call the graphql client
 */
class AdminCreateStripeCustomerMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the AdminCreateStripeCustomer Mutation and return a AdminCommandPayload
   *
   * @param organizationId - required organizationId variable to set the  scope
   */
  public async fetch(organizationId: string): Promise<AdminCommandPayload | undefined> {
    return this.request<D.AdminCreateStripeCustomerMutation, D.AdminCreateStripeCustomerMutationVariables>(
      D.AdminCreateStripeCustomerDocument,
      {
        organizationId,
      }
    ).then(response => {
      const data = response?.adminCreateStripeCustomer;
      return data ? new AdminCommandPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable AdminScheduleAnonymousTask Mutation
 *
 * @param request - function to call the graphql client
 */
class AdminScheduleAnonymousTaskMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the AdminScheduleAnonymousTask Mutation and return a AdminCommandPayload
   *
   * @param taskName - required taskName variable to set the  scope
   */
  public async fetch(taskName: string): Promise<AdminCommandPayload | undefined> {
    return this.request<D.AdminScheduleAnonymousTaskMutation, D.AdminScheduleAnonymousTaskMutationVariables>(
      D.AdminScheduleAnonymousTaskDocument,
      {
        taskName,
      }
    ).then(response => {
      const data = response?.adminScheduleAnonymousTask;
      return data ? new AdminCommandPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable AdminUserAccountChangeEmail Mutation
 *
 * @param request - function to call the graphql client
 */
class AdminUserAccountChangeEmailMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the AdminUserAccountChangeEmail Mutation and return a UserAccountAdminPrivileged
   *
   * @param newEmail - required newEmail variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(newEmail: string, id: string): Promise<UserAccountAdminPrivileged | undefined> {
    return this.request<D.AdminUserAccountChangeEmailMutation, D.AdminUserAccountChangeEmailMutationVariables>(
      D.AdminUserAccountChangeEmailDocument,
      {
        newEmail,
        id,
      }
    ).then(response => {
      const data = response?.adminUserAccountChangeEmail;
      return data ? new UserAccountAdminPrivileged(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable EventCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class EventCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the EventCreate Mutation and return a EventPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.EventCreateInput): Promise<EventPayload | undefined> {
    return this.request<D.EventCreateMutation, D.EventCreateMutationVariables>(D.EventCreateDocument, {
      input,
    }).then(response => {
      const data = response?.eventCreate;
      return data ? new EventPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ApiKeyCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class ApiKeyCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ApiKeyCreate Mutation and return a ApiKeyPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.ApiKeyCreateInput): Promise<ApiKeyPayload | undefined> {
    return this.request<D.ApiKeyCreateMutation, D.ApiKeyCreateMutationVariables>(D.ApiKeyCreateDocument, {
      input,
    }).then(response => {
      const data = response?.apiKeyCreate;
      return data ? new ApiKeyPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ApiKeyDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class ApiKeyDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ApiKeyDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.ApiKeyDeleteMutation, D.ApiKeyDeleteMutationVariables>(D.ApiKeyDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.apiKeyDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable EmailUserAccountAuthChallenge Mutation
 *
 * @param request - function to call the graphql client
 */
class EmailUserAccountAuthChallengeMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the EmailUserAccountAuthChallenge Mutation and return a EmailUserAccountAuthChallengeResponse
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(
    input: D.EmailUserAccountAuthChallengeInput
  ): Promise<EmailUserAccountAuthChallengeResponse | undefined> {
    return this.request<D.EmailUserAccountAuthChallengeMutation, D.EmailUserAccountAuthChallengeMutationVariables>(
      D.EmailUserAccountAuthChallengeDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.emailUserAccountAuthChallenge;
      return data ? new EmailUserAccountAuthChallengeResponse(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable EmailTokenUserAccountAuth Mutation
 *
 * @param request - function to call the graphql client
 */
class EmailTokenUserAccountAuthMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the EmailTokenUserAccountAuth Mutation and return a AuthResolverResponse
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.TokenUserAccountAuthInput): Promise<AuthResolverResponse | undefined> {
    return this.request<D.EmailTokenUserAccountAuthMutation, D.EmailTokenUserAccountAuthMutationVariables>(
      D.EmailTokenUserAccountAuthDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.emailTokenUserAccountAuth;
      return data ? new AuthResolverResponse(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable SamlTokenUserAccountAuth Mutation
 *
 * @param request - function to call the graphql client
 */
class SamlTokenUserAccountAuthMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the SamlTokenUserAccountAuth Mutation and return a AuthResolverResponse
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.TokenUserAccountAuthInput): Promise<AuthResolverResponse | undefined> {
    return this.request<D.SamlTokenUserAccountAuthMutation, D.SamlTokenUserAccountAuthMutationVariables>(
      D.SamlTokenUserAccountAuthDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.samlTokenUserAccountAuth;
      return data ? new AuthResolverResponse(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable GoogleUserAccountAuth Mutation
 *
 * @param request - function to call the graphql client
 */
class GoogleUserAccountAuthMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the GoogleUserAccountAuth Mutation and return a AuthResolverResponse
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.GoogleUserAccountAuthInput): Promise<AuthResolverResponse | undefined> {
    return this.request<D.GoogleUserAccountAuthMutation, D.GoogleUserAccountAuthMutationVariables>(
      D.GoogleUserAccountAuthDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.googleUserAccountAuth;
      return data ? new AuthResolverResponse(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CreateOrganizationFromOnboarding Mutation
 *
 * @param request - function to call the graphql client
 */
class CreateOrganizationFromOnboardingMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CreateOrganizationFromOnboarding Mutation and return a CreateOrJoinOrganizationResponse
   *
   * @param input - required input variable to set the  scope
   * @param vars - variables without 'input' to pass into the CreateOrganizationFromOnboardingMutation
   */
  public async fetch(
    input: D.CreateOrganizationInput,
    vars?: Omit<D.CreateOrganizationFromOnboardingMutationVariables, "input">
  ): Promise<CreateOrJoinOrganizationResponse | undefined> {
    return this.request<
      D.CreateOrganizationFromOnboardingMutation,
      D.CreateOrganizationFromOnboardingMutationVariables
    >(D.CreateOrganizationFromOnboardingDocument, {
      input,
      ...vars,
    }).then(response => {
      const data = response?.createOrganizationFromOnboarding;
      return data ? new CreateOrJoinOrganizationResponse(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable JoinOrganizationFromOnboarding Mutation
 *
 * @param request - function to call the graphql client
 */
class JoinOrganizationFromOnboardingMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the JoinOrganizationFromOnboarding Mutation and return a CreateOrJoinOrganizationResponse
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.JoinOrganizationInput): Promise<CreateOrJoinOrganizationResponse | undefined> {
    return this.request<D.JoinOrganizationFromOnboardingMutation, D.JoinOrganizationFromOnboardingMutationVariables>(
      D.JoinOrganizationFromOnboardingDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.joinOrganizationFromOnboarding;
      return data ? new CreateOrJoinOrganizationResponse(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable LeaveOrganization Mutation
 *
 * @param request - function to call the graphql client
 */
class LeaveOrganizationMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the LeaveOrganization Mutation and return a CreateOrJoinOrganizationResponse
   *
   * @param organizationId - required organizationId variable to set the  scope
   */
  public async fetch(organizationId: string): Promise<CreateOrJoinOrganizationResponse | undefined> {
    return this.request<D.LeaveOrganizationMutation, D.LeaveOrganizationMutationVariables>(
      D.LeaveOrganizationDocument,
      {
        organizationId,
      }
    ).then(response => {
      const data = response?.leaveOrganization;
      return data ? new CreateOrJoinOrganizationResponse(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable BillingEmailUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class BillingEmailUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the BillingEmailUpdate Mutation and return a BillingEmailPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.BillingEmailUpdateInput): Promise<BillingEmailPayload | undefined> {
    return this.request<D.BillingEmailUpdateMutation, D.BillingEmailUpdateMutationVariables>(
      D.BillingEmailUpdateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.billingEmailUpdate;
      return data ? new BillingEmailPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CollaborativeDocumentUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class CollaborativeDocumentUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CollaborativeDocumentUpdate Mutation and return a CollaborationDocumentUpdatePayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(
    input: D.CollaborationDocumentUpdateInput
  ): Promise<CollaborationDocumentUpdatePayload | undefined> {
    return this.request<D.CollaborativeDocumentUpdateMutation, D.CollaborativeDocumentUpdateMutationVariables>(
      D.CollaborativeDocumentUpdateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.collaborativeDocumentUpdate;
      return data ? new CollaborationDocumentUpdatePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CommentCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class CommentCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CommentCreate Mutation and return a CommentPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.CommentCreateInput): Promise<CommentPayload | undefined> {
    return this.request<D.CommentCreateMutation, D.CommentCreateMutationVariables>(D.CommentCreateDocument, {
      input,
    }).then(response => {
      const data = response?.commentCreate;
      return data ? new CommentPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CommentUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class CommentUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CommentUpdate Mutation and return a CommentPayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.CommentUpdateInput, id: string): Promise<CommentPayload | undefined> {
    return this.request<D.CommentUpdateMutation, D.CommentUpdateMutationVariables>(D.CommentUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.commentUpdate;
      return data ? new CommentPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CommentDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class CommentDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CommentDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.CommentDeleteMutation, D.CommentDeleteMutationVariables>(D.CommentDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.commentDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ContactCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class ContactCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ContactCreate Mutation and return a ContactPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.ContactCreateInput): Promise<ContactPayload | undefined> {
    return this.request<D.ContactCreateMutation, D.ContactCreateMutationVariables>(D.ContactCreateDocument, {
      input,
    }).then(response => {
      const data = response?.contactCreate;
      return data ? new ContactPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CustomViewCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class CustomViewCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CustomViewCreate Mutation and return a CustomViewPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.CustomViewCreateInput): Promise<CustomViewPayload | undefined> {
    return this.request<D.CustomViewCreateMutation, D.CustomViewCreateMutationVariables>(D.CustomViewCreateDocument, {
      input,
    }).then(response => {
      const data = response?.customViewCreate;
      return data ? new CustomViewPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CustomViewUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class CustomViewUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CustomViewUpdate Mutation and return a CustomViewPayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.CustomViewUpdateInput, id: string): Promise<CustomViewPayload | undefined> {
    return this.request<D.CustomViewUpdateMutation, D.CustomViewUpdateMutationVariables>(D.CustomViewUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.customViewUpdate;
      return data ? new CustomViewPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CustomViewDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class CustomViewDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CustomViewDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.CustomViewDeleteMutation, D.CustomViewDeleteMutationVariables>(D.CustomViewDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.customViewDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CycleCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class CycleCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CycleCreate Mutation and return a CyclePayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.CycleCreateInput): Promise<CyclePayload | undefined> {
    return this.request<D.CycleCreateMutation, D.CycleCreateMutationVariables>(D.CycleCreateDocument, {
      input,
    }).then(response => {
      const data = response?.cycleCreate;
      return data ? new CyclePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CycleUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class CycleUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CycleUpdate Mutation and return a CyclePayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.CycleUpdateInput, id: string): Promise<CyclePayload | undefined> {
    return this.request<D.CycleUpdateMutation, D.CycleUpdateMutationVariables>(D.CycleUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.cycleUpdate;
      return data ? new CyclePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CycleArchive Mutation
 *
 * @param request - function to call the graphql client
 */
class CycleArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CycleArchive Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.CycleArchiveMutation, D.CycleArchiveMutationVariables>(D.CycleArchiveDocument, {
      id,
    }).then(response => {
      const data = response?.cycleArchive;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable DebugFailWithInternalError Mutation
 *
 * @param request - function to call the graphql client
 */
class DebugFailWithInternalErrorMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the DebugFailWithInternalError Mutation and return a DebugPayload
   *
   */
  public async fetch(): Promise<DebugPayload | undefined> {
    return this.request<D.DebugFailWithInternalErrorMutation, D.DebugFailWithInternalErrorMutationVariables>(
      D.DebugFailWithInternalErrorDocument,
      {}
    ).then(response => {
      const data = response?.debugFailWithInternalError;
      return data ? new DebugPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable DebugFailWithWarning Mutation
 *
 * @param request - function to call the graphql client
 */
class DebugFailWithWarningMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the DebugFailWithWarning Mutation and return a DebugPayload
   *
   */
  public async fetch(): Promise<DebugPayload | undefined> {
    return this.request<D.DebugFailWithWarningMutation, D.DebugFailWithWarningMutationVariables>(
      D.DebugFailWithWarningDocument,
      {}
    ).then(response => {
      const data = response?.debugFailWithWarning;
      return data ? new DebugPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable DebugCreateSamlOrg Mutation
 *
 * @param request - function to call the graphql client
 */
class DebugCreateSamlOrgMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the DebugCreateSamlOrg Mutation and return a DebugPayload
   *
   */
  public async fetch(): Promise<DebugPayload | undefined> {
    return this.request<D.DebugCreateSamlOrgMutation, D.DebugCreateSamlOrgMutationVariables>(
      D.DebugCreateSamlOrgDocument,
      {}
    ).then(response => {
      const data = response?.debugCreateSAMLOrg;
      return data ? new DebugPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable EmailUnsubscribe Mutation
 *
 * @param request - function to call the graphql client
 */
class EmailUnsubscribeMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the EmailUnsubscribe Mutation and return a EmailUnsubscribePayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.EmailUnsubscribeInput): Promise<EmailUnsubscribePayload | undefined> {
    return this.request<D.EmailUnsubscribeMutation, D.EmailUnsubscribeMutationVariables>(D.EmailUnsubscribeDocument, {
      input,
    }).then(response => {
      const data = response?.emailUnsubscribe;
      return data ? new EmailUnsubscribePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable EmojiCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class EmojiCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the EmojiCreate Mutation and return a EmojiPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.EmojiCreateInput): Promise<EmojiPayload | undefined> {
    return this.request<D.EmojiCreateMutation, D.EmojiCreateMutationVariables>(D.EmojiCreateDocument, {
      input,
    }).then(response => {
      const data = response?.emojiCreate;
      return data ? new EmojiPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable EmojiDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class EmojiDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the EmojiDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.EmojiDeleteMutation, D.EmojiDeleteMutationVariables>(D.EmojiDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.emojiDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable FavoriteCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class FavoriteCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the FavoriteCreate Mutation and return a FavoritePayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.FavoriteCreateInput): Promise<FavoritePayload | undefined> {
    return this.request<D.FavoriteCreateMutation, D.FavoriteCreateMutationVariables>(D.FavoriteCreateDocument, {
      input,
    }).then(response => {
      const data = response?.favoriteCreate;
      return data ? new FavoritePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable FavoriteUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class FavoriteUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the FavoriteUpdate Mutation and return a FavoritePayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.FavoriteUpdateInput, id: string): Promise<FavoritePayload | undefined> {
    return this.request<D.FavoriteUpdateMutation, D.FavoriteUpdateMutationVariables>(D.FavoriteUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.favoriteUpdate;
      return data ? new FavoritePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable FavoriteDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class FavoriteDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the FavoriteDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.FavoriteDeleteMutation, D.FavoriteDeleteMutationVariables>(D.FavoriteDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.favoriteDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable FeedbackCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class FeedbackCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the FeedbackCreate Mutation and return a FeedbackPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.FeedbackCreateInput): Promise<FeedbackPayload | undefined> {
    return this.request<D.FeedbackCreateMutation, D.FeedbackCreateMutationVariables>(D.FeedbackCreateDocument, {
      input,
    }).then(response => {
      const data = response?.feedbackCreate;
      return data ? new FeedbackPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable FileUpload Mutation
 *
 * @param request - function to call the graphql client
 */
class FileUploadMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the FileUpload Mutation and return a UploadPayload
   *
   * @param size - required size variable to set the  scope
   * @param contentType - required contentType variable to set the  scope
   * @param filename - required filename variable to set the  scope
   * @param vars - variables without 'size', 'contentType', 'filename' to pass into the FileUploadMutation
   */
  public async fetch(
    size: number,
    contentType: string,
    filename: string,
    vars?: Omit<D.FileUploadMutationVariables, "size" | "contentType" | "filename">
  ): Promise<UploadPayload | undefined> {
    return this.request<D.FileUploadMutation, D.FileUploadMutationVariables>(D.FileUploadDocument, {
      size,
      contentType,
      filename,
      ...vars,
    }).then(response => {
      const data = response?.fileUpload;
      return data ? new UploadPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ImageUploadFromUrl Mutation
 *
 * @param request - function to call the graphql client
 */
class ImageUploadFromUrlMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ImageUploadFromUrl Mutation and return a ImageUploadFromUrlPayload
   *
   * @param url - required url variable to set the  scope
   */
  public async fetch(url: string): Promise<ImageUploadFromUrlPayload | undefined> {
    return this.request<D.ImageUploadFromUrlMutation, D.ImageUploadFromUrlMutationVariables>(
      D.ImageUploadFromUrlDocument,
      {
        url,
      }
    ).then(response => {
      const data = response?.imageUploadFromUrl;
      return data ? new ImageUploadFromUrlPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationGithubConnect Mutation
 *
 * @param request - function to call the graphql client
 */
class IntegrationGithubConnectMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationGithubConnect Mutation and return a IntegrationPayload
   *
   * @param installationId - required installationId variable to set the  scope
   */
  public async fetch(installationId: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationGithubConnectMutation, D.IntegrationGithubConnectMutationVariables>(
      D.IntegrationGithubConnectDocument,
      {
        installationId,
      }
    ).then(response => {
      const data = response?.integrationGithubConnect;
      return data ? new IntegrationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationGitlabConnect Mutation
 *
 * @param request - function to call the graphql client
 */
class IntegrationGitlabConnectMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationGitlabConnect Mutation and return a IntegrationPayload
   *
   * @param gitlabUrl - required gitlabUrl variable to set the  scope
   * @param accessToken - required accessToken variable to set the  scope
   */
  public async fetch(gitlabUrl: string, accessToken: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationGitlabConnectMutation, D.IntegrationGitlabConnectMutationVariables>(
      D.IntegrationGitlabConnectDocument,
      {
        gitlabUrl,
        accessToken,
      }
    ).then(response => {
      const data = response?.integrationGitlabConnect;
      return data ? new IntegrationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationSlack Mutation
 *
 * @param request - function to call the graphql client
 */
class IntegrationSlackMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationSlack Mutation and return a IntegrationPayload
   *
   * @param redirectUri - required redirectUri variable to set the  scope
   * @param code - required code variable to set the  scope
   * @param vars - variables without 'redirectUri', 'code' to pass into the IntegrationSlackMutation
   */
  public async fetch(
    redirectUri: string,
    code: string,
    vars?: Omit<D.IntegrationSlackMutationVariables, "redirectUri" | "code">
  ): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationSlackMutation, D.IntegrationSlackMutationVariables>(D.IntegrationSlackDocument, {
      redirectUri,
      code,
      ...vars,
    }).then(response => {
      const data = response?.integrationSlack;
      return data ? new IntegrationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationSlackPersonal Mutation
 *
 * @param request - function to call the graphql client
 */
class IntegrationSlackPersonalMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationSlackPersonal Mutation and return a IntegrationPayload
   *
   * @param redirectUri - required redirectUri variable to set the  scope
   * @param code - required code variable to set the  scope
   */
  public async fetch(redirectUri: string, code: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationSlackPersonalMutation, D.IntegrationSlackPersonalMutationVariables>(
      D.IntegrationSlackPersonalDocument,
      {
        redirectUri,
        code,
      }
    ).then(response => {
      const data = response?.integrationSlackPersonal;
      return data ? new IntegrationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationSlackPost Mutation
 *
 * @param request - function to call the graphql client
 */
class IntegrationSlackPostMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationSlackPost Mutation and return a IntegrationPayload
   *
   * @param redirectUri - required redirectUri variable to set the  scope
   * @param teamId - required teamId variable to set the  scope
   * @param code - required code variable to set the  scope
   * @param vars - variables without 'redirectUri', 'teamId', 'code' to pass into the IntegrationSlackPostMutation
   */
  public async fetch(
    redirectUri: string,
    teamId: string,
    code: string,
    vars?: Omit<D.IntegrationSlackPostMutationVariables, "redirectUri" | "teamId" | "code">
  ): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationSlackPostMutation, D.IntegrationSlackPostMutationVariables>(
      D.IntegrationSlackPostDocument,
      {
        redirectUri,
        teamId,
        code,
        ...vars,
      }
    ).then(response => {
      const data = response?.integrationSlackPost;
      return data ? new IntegrationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationSlackProjectPost Mutation
 *
 * @param request - function to call the graphql client
 */
class IntegrationSlackProjectPostMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationSlackProjectPost Mutation and return a IntegrationPayload
   *
   * @param redirectUri - required redirectUri variable to set the  scope
   * @param projectId - required projectId variable to set the  scope
   * @param code - required code variable to set the  scope
   */
  public async fetch(redirectUri: string, projectId: string, code: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationSlackProjectPostMutation, D.IntegrationSlackProjectPostMutationVariables>(
      D.IntegrationSlackProjectPostDocument,
      {
        redirectUri,
        projectId,
        code,
      }
    ).then(response => {
      const data = response?.integrationSlackProjectPost;
      return data ? new IntegrationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationSlackImportEmojis Mutation
 *
 * @param request - function to call the graphql client
 */
class IntegrationSlackImportEmojisMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationSlackImportEmojis Mutation and return a IntegrationPayload
   *
   * @param redirectUri - required redirectUri variable to set the  scope
   * @param code - required code variable to set the  scope
   */
  public async fetch(redirectUri: string, code: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationSlackImportEmojisMutation, D.IntegrationSlackImportEmojisMutationVariables>(
      D.IntegrationSlackImportEmojisDocument,
      {
        redirectUri,
        code,
      }
    ).then(response => {
      const data = response?.integrationSlackImportEmojis;
      return data ? new IntegrationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationFigma Mutation
 *
 * @param request - function to call the graphql client
 */
class IntegrationFigmaMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationFigma Mutation and return a IntegrationPayload
   *
   * @param redirectUri - required redirectUri variable to set the  scope
   * @param code - required code variable to set the  scope
   */
  public async fetch(redirectUri: string, code: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationFigmaMutation, D.IntegrationFigmaMutationVariables>(D.IntegrationFigmaDocument, {
      redirectUri,
      code,
    }).then(response => {
      const data = response?.integrationFigma;
      return data ? new IntegrationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationGoogleSheets Mutation
 *
 * @param request - function to call the graphql client
 */
class IntegrationGoogleSheetsMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationGoogleSheets Mutation and return a IntegrationPayload
   *
   * @param code - required code variable to set the  scope
   */
  public async fetch(code: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationGoogleSheetsMutation, D.IntegrationGoogleSheetsMutationVariables>(
      D.IntegrationGoogleSheetsDocument,
      {
        code,
      }
    ).then(response => {
      const data = response?.integrationGoogleSheets;
      return data ? new IntegrationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable RefreshGoogleSheetsData Mutation
 *
 * @param request - function to call the graphql client
 */
class RefreshGoogleSheetsDataMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the RefreshGoogleSheetsData Mutation and return a IntegrationPayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.RefreshGoogleSheetsDataMutation, D.RefreshGoogleSheetsDataMutationVariables>(
      D.RefreshGoogleSheetsDataDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.refreshGoogleSheetsData;
      return data ? new IntegrationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationSentryConnect Mutation
 *
 * @param request - function to call the graphql client
 */
class IntegrationSentryConnectMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationSentryConnect Mutation and return a IntegrationPayload
   *
   * @param organizationSlug - required organizationSlug variable to set the  scope
   * @param code - required code variable to set the  scope
   * @param installationId - required installationId variable to set the  scope
   */
  public async fetch(
    organizationSlug: string,
    code: string,
    installationId: string
  ): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationSentryConnectMutation, D.IntegrationSentryConnectMutationVariables>(
      D.IntegrationSentryConnectDocument,
      {
        organizationSlug,
        code,
        installationId,
      }
    ).then(response => {
      const data = response?.integrationSentryConnect;
      return data ? new IntegrationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class IntegrationDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.IntegrationDeleteMutation, D.IntegrationDeleteMutationVariables>(
      D.IntegrationDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.integrationDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationResourceArchive Mutation
 *
 * @param request - function to call the graphql client
 */
class IntegrationResourceArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationResourceArchive Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.IntegrationResourceArchiveMutation, D.IntegrationResourceArchiveMutationVariables>(
      D.IntegrationResourceArchiveDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.integrationResourceArchive;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueLabelCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class IssueLabelCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueLabelCreate Mutation and return a IssueLabelPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.IssueLabelCreateInput): Promise<IssueLabelPayload | undefined> {
    return this.request<D.IssueLabelCreateMutation, D.IssueLabelCreateMutationVariables>(D.IssueLabelCreateDocument, {
      input,
    }).then(response => {
      const data = response?.issueLabelCreate;
      return data ? new IssueLabelPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueLabelUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class IssueLabelUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueLabelUpdate Mutation and return a IssueLabelPayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.IssueLabelUpdateInput, id: string): Promise<IssueLabelPayload | undefined> {
    return this.request<D.IssueLabelUpdateMutation, D.IssueLabelUpdateMutationVariables>(D.IssueLabelUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.issueLabelUpdate;
      return data ? new IssueLabelPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueLabelArchive Mutation
 *
 * @param request - function to call the graphql client
 */
class IssueLabelArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueLabelArchive Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.IssueLabelArchiveMutation, D.IssueLabelArchiveMutationVariables>(
      D.IssueLabelArchiveDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.issueLabelArchive;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueRelationCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class IssueRelationCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueRelationCreate Mutation and return a IssueRelationPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.IssueRelationCreateInput): Promise<IssueRelationPayload | undefined> {
    return this.request<D.IssueRelationCreateMutation, D.IssueRelationCreateMutationVariables>(
      D.IssueRelationCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.issueRelationCreate;
      return data ? new IssueRelationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueRelationUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class IssueRelationUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueRelationUpdate Mutation and return a IssueRelationPayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.IssueRelationUpdateInput, id: string): Promise<IssueRelationPayload | undefined> {
    return this.request<D.IssueRelationUpdateMutation, D.IssueRelationUpdateMutationVariables>(
      D.IssueRelationUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.issueRelationUpdate;
      return data ? new IssueRelationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueRelationDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class IssueRelationDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueRelationDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.IssueRelationDeleteMutation, D.IssueRelationDeleteMutationVariables>(
      D.IssueRelationDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.issueRelationDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class IssueCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueCreate Mutation and return a IssuePayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.IssueCreateInput): Promise<IssuePayload | undefined> {
    return this.request<D.IssueCreateMutation, D.IssueCreateMutationVariables>(D.IssueCreateDocument, {
      input,
    }).then(response => {
      const data = response?.issueCreate;
      return data ? new IssuePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class IssueUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueUpdate Mutation and return a IssuePayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.IssueUpdateInput, id: string): Promise<IssuePayload | undefined> {
    return this.request<D.IssueUpdateMutation, D.IssueUpdateMutationVariables>(D.IssueUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.issueUpdate;
      return data ? new IssuePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueArchive Mutation
 *
 * @param request - function to call the graphql client
 */
class IssueArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueArchive Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.IssueArchiveMutation, D.IssueArchiveMutationVariables>(D.IssueArchiveDocument, {
      id,
    }).then(response => {
      const data = response?.issueArchive;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueUnarchive Mutation
 *
 * @param request - function to call the graphql client
 */
class IssueUnarchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueUnarchive Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.IssueUnarchiveMutation, D.IssueUnarchiveMutationVariables>(D.IssueUnarchiveDocument, {
      id,
    }).then(response => {
      const data = response?.issueUnarchive;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable MilestoneCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class MilestoneCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the MilestoneCreate Mutation and return a MilestonePayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.MilestoneCreateInput): Promise<MilestonePayload | undefined> {
    return this.request<D.MilestoneCreateMutation, D.MilestoneCreateMutationVariables>(D.MilestoneCreateDocument, {
      input,
    }).then(response => {
      const data = response?.milestoneCreate;
      return data ? new MilestonePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable MilestoneUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class MilestoneUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the MilestoneUpdate Mutation and return a MilestonePayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.MilestoneUpdateInput, id: string): Promise<MilestonePayload | undefined> {
    return this.request<D.MilestoneUpdateMutation, D.MilestoneUpdateMutationVariables>(D.MilestoneUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.milestoneUpdate;
      return data ? new MilestonePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable MilestoneDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class MilestoneDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the MilestoneDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.MilestoneDeleteMutation, D.MilestoneDeleteMutationVariables>(D.MilestoneDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.milestoneDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable NotificationCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class NotificationCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the NotificationCreate Mutation and return a NotificationPayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.NotificationUpdateInput, id: string): Promise<NotificationPayload | undefined> {
    return this.request<D.NotificationCreateMutation, D.NotificationCreateMutationVariables>(
      D.NotificationCreateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.notificationCreate;
      return data ? new NotificationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable NotificationUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class NotificationUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the NotificationUpdate Mutation and return a NotificationPayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.NotificationUpdateInput, id: string): Promise<NotificationPayload | undefined> {
    return this.request<D.NotificationUpdateMutation, D.NotificationUpdateMutationVariables>(
      D.NotificationUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.notificationUpdate;
      return data ? new NotificationPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable NotificationDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class NotificationDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the NotificationDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.NotificationDeleteMutation, D.NotificationDeleteMutationVariables>(
      D.NotificationDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.notificationDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable NotificationArchive Mutation
 *
 * @param request - function to call the graphql client
 */
class NotificationArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the NotificationArchive Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.NotificationArchiveMutation, D.NotificationArchiveMutationVariables>(
      D.NotificationArchiveDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.notificationArchive;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable NotificationUnarchive Mutation
 *
 * @param request - function to call the graphql client
 */
class NotificationUnarchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the NotificationUnarchive Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.NotificationUnarchiveMutation, D.NotificationUnarchiveMutationVariables>(
      D.NotificationUnarchiveDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.notificationUnarchive;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable NotificationSubscriptionCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class NotificationSubscriptionCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the NotificationSubscriptionCreate Mutation and return a NotificationSubscriptionPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(
    input: D.NotificationSubscriptionCreateInput
  ): Promise<NotificationSubscriptionPayload | undefined> {
    return this.request<D.NotificationSubscriptionCreateMutation, D.NotificationSubscriptionCreateMutationVariables>(
      D.NotificationSubscriptionCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.notificationSubscriptionCreate;
      return data ? new NotificationSubscriptionPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable NotificationSubscriptionDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class NotificationSubscriptionDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the NotificationSubscriptionDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.NotificationSubscriptionDeleteMutation, D.NotificationSubscriptionDeleteMutationVariables>(
      D.NotificationSubscriptionDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.notificationSubscriptionDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OauthClientCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class OauthClientCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OauthClientCreate Mutation and return a OauthClientPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.OauthClientCreateInput): Promise<OauthClientPayload | undefined> {
    return this.request<D.OauthClientCreateMutation, D.OauthClientCreateMutationVariables>(
      D.OauthClientCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.oauthClientCreate;
      return data ? new OauthClientPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OauthClientUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class OauthClientUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OauthClientUpdate Mutation and return a OauthClientPayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.OauthClientUpdateInput, id: string): Promise<OauthClientPayload | undefined> {
    return this.request<D.OauthClientUpdateMutation, D.OauthClientUpdateMutationVariables>(
      D.OauthClientUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.oauthClientUpdate;
      return data ? new OauthClientPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OauthClientArchive Mutation
 *
 * @param request - function to call the graphql client
 */
class OauthClientArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OauthClientArchive Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.OauthClientArchiveMutation, D.OauthClientArchiveMutationVariables>(
      D.OauthClientArchiveDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.oauthClientArchive;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OauthClientRotateSecret Mutation
 *
 * @param request - function to call the graphql client
 */
class OauthClientRotateSecretMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OauthClientRotateSecret Mutation and return a RotateSecretPayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<RotateSecretPayload | undefined> {
    return this.request<D.OauthClientRotateSecretMutation, D.OauthClientRotateSecretMutationVariables>(
      D.OauthClientRotateSecretDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.oauthClientRotateSecret;
      return data ? new RotateSecretPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OauthTokenRevoke Mutation
 *
 * @param request - function to call the graphql client
 */
class OauthTokenRevokeMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OauthTokenRevoke Mutation and return a OauthTokenRevokePayload
   *
   * @param scope - required scope variable to set the  scope
   * @param appId - required appId variable to set the  scope
   */
  public async fetch(scope: string[], appId: string): Promise<OauthTokenRevokePayload | undefined> {
    return this.request<D.OauthTokenRevokeMutation, D.OauthTokenRevokeMutationVariables>(D.OauthTokenRevokeDocument, {
      scope,
      appId,
    }).then(response => {
      const data = response?.oauthTokenRevoke;
      return data ? new OauthTokenRevokePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationDomainVerify Mutation
 *
 * @param request - function to call the graphql client
 */
class OrganizationDomainVerifyMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationDomainVerify Mutation and return a OrganizationDomainPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.OrganizationDomainVerificationInput): Promise<OrganizationDomainPayload | undefined> {
    return this.request<D.OrganizationDomainVerifyMutation, D.OrganizationDomainVerifyMutationVariables>(
      D.OrganizationDomainVerifyDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.organizationDomainVerify;
      return data ? new OrganizationDomainPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationDomainCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class OrganizationDomainCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationDomainCreate Mutation and return a OrganizationDomainPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.OrganizationDomainCreateInput): Promise<OrganizationDomainPayload | undefined> {
    return this.request<D.OrganizationDomainCreateMutation, D.OrganizationDomainCreateMutationVariables>(
      D.OrganizationDomainCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.organizationDomainCreate;
      return data ? new OrganizationDomainPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationDomainDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class OrganizationDomainDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationDomainDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.OrganizationDomainDeleteMutation, D.OrganizationDomainDeleteMutationVariables>(
      D.OrganizationDomainDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.organizationDomainDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationInviteCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class OrganizationInviteCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationInviteCreate Mutation and return a OrganizationInvitePayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.OrganizationInviteCreateInput): Promise<OrganizationInvitePayload | undefined> {
    return this.request<D.OrganizationInviteCreateMutation, D.OrganizationInviteCreateMutationVariables>(
      D.OrganizationInviteCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.organizationInviteCreate;
      return data ? new OrganizationInvitePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ResentOrganizationInvite Mutation
 *
 * @param request - function to call the graphql client
 */
class ResentOrganizationInviteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ResentOrganizationInvite Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.ResentOrganizationInviteMutation, D.ResentOrganizationInviteMutationVariables>(
      D.ResentOrganizationInviteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.resentOrganizationInvite;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationInviteDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class OrganizationInviteDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationInviteDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.OrganizationInviteDeleteMutation, D.OrganizationInviteDeleteMutationVariables>(
      D.OrganizationInviteDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.organizationInviteDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ProjectLinkCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class ProjectLinkCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ProjectLinkCreate Mutation and return a ProjectLinkPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.ProjectLinkCreateInput): Promise<ProjectLinkPayload | undefined> {
    return this.request<D.ProjectLinkCreateMutation, D.ProjectLinkCreateMutationVariables>(
      D.ProjectLinkCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.projectLinkCreate;
      return data ? new ProjectLinkPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ProjectLinkDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class ProjectLinkDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ProjectLinkDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.ProjectLinkDeleteMutation, D.ProjectLinkDeleteMutationVariables>(
      D.ProjectLinkDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.projectLinkDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ProjectCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class ProjectCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ProjectCreate Mutation and return a ProjectPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.ProjectCreateInput): Promise<ProjectPayload | undefined> {
    return this.request<D.ProjectCreateMutation, D.ProjectCreateMutationVariables>(D.ProjectCreateDocument, {
      input,
    }).then(response => {
      const data = response?.projectCreate;
      return data ? new ProjectPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ProjectUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class ProjectUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ProjectUpdate Mutation and return a ProjectPayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.ProjectUpdateInput, id: string): Promise<ProjectPayload | undefined> {
    return this.request<D.ProjectUpdateMutation, D.ProjectUpdateMutationVariables>(D.ProjectUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.projectUpdate;
      return data ? new ProjectPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ProjectArchive Mutation
 *
 * @param request - function to call the graphql client
 */
class ProjectArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ProjectArchive Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.ProjectArchiveMutation, D.ProjectArchiveMutationVariables>(D.ProjectArchiveDocument, {
      id,
    }).then(response => {
      const data = response?.projectArchive;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable PushSubscriptionCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class PushSubscriptionCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the PushSubscriptionCreate Mutation and return a PushSubscriptionPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.PushSubscriptionCreateInput): Promise<PushSubscriptionPayload | undefined> {
    return this.request<D.PushSubscriptionCreateMutation, D.PushSubscriptionCreateMutationVariables>(
      D.PushSubscriptionCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.pushSubscriptionCreate;
      return data ? new PushSubscriptionPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable PushSubscriptionDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class PushSubscriptionDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the PushSubscriptionDelete Mutation and return a PushSubscriptionPayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<PushSubscriptionPayload | undefined> {
    return this.request<D.PushSubscriptionDeleteMutation, D.PushSubscriptionDeleteMutationVariables>(
      D.PushSubscriptionDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.pushSubscriptionDelete;
      return data ? new PushSubscriptionPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ReactionCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class ReactionCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ReactionCreate Mutation and return a ReactionPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.ReactionCreateInput): Promise<ReactionPayload | undefined> {
    return this.request<D.ReactionCreateMutation, D.ReactionCreateMutationVariables>(D.ReactionCreateDocument, {
      input,
    }).then(response => {
      const data = response?.reactionCreate;
      return data ? new ReactionPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ReactionDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class ReactionDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ReactionDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.ReactionDeleteMutation, D.ReactionDeleteMutationVariables>(D.ReactionDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.reactionDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CreateCsvExportReport Mutation
 *
 * @param request - function to call the graphql client
 */
class CreateCsvExportReportMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CreateCsvExportReport Mutation and return a CreateCsvExportReportPayload
   *
   */
  public async fetch(): Promise<CreateCsvExportReportPayload | undefined> {
    return this.request<D.CreateCsvExportReportMutation, D.CreateCsvExportReportMutationVariables>(
      D.CreateCsvExportReportDocument,
      {}
    ).then(response => {
      const data = response?.createCsvExportReport;
      return data ? new CreateCsvExportReportPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable SubscriptionSessionCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class SubscriptionSessionCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the SubscriptionSessionCreate Mutation and return a SubscriptionSessionPayload
   *
   * @param plan - required plan variable to set the  scope
   */
  public async fetch(plan: string): Promise<SubscriptionSessionPayload | undefined> {
    return this.request<D.SubscriptionSessionCreateMutation, D.SubscriptionSessionCreateMutationVariables>(
      D.SubscriptionSessionCreateDocument,
      {
        plan,
      }
    ).then(response => {
      const data = response?.subscriptionSessionCreate;
      return data ? new SubscriptionSessionPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable SubscriptionUpdateSessionCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class SubscriptionUpdateSessionCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the SubscriptionUpdateSessionCreate Mutation and return a SubscriptionSessionPayload
   *
   */
  public async fetch(): Promise<SubscriptionSessionPayload | undefined> {
    return this.request<D.SubscriptionUpdateSessionCreateMutation, D.SubscriptionUpdateSessionCreateMutationVariables>(
      D.SubscriptionUpdateSessionCreateDocument,
      {}
    ).then(response => {
      const data = response?.subscriptionUpdateSessionCreate;
      return data ? new SubscriptionSessionPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable SubscriptionUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class SubscriptionUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the SubscriptionUpdate Mutation and return a SubscriptionPayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.SubscriptionUpdateInput, id: string): Promise<SubscriptionPayload | undefined> {
    return this.request<D.SubscriptionUpdateMutation, D.SubscriptionUpdateMutationVariables>(
      D.SubscriptionUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.subscriptionUpdate;
      return data ? new SubscriptionPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable SubscriptionUpgrade Mutation
 *
 * @param request - function to call the graphql client
 */
class SubscriptionUpgradeMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the SubscriptionUpgrade Mutation and return a SubscriptionPayload
   *
   * @param type - required type variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(type: string, id: string): Promise<SubscriptionPayload | undefined> {
    return this.request<D.SubscriptionUpgradeMutation, D.SubscriptionUpgradeMutationVariables>(
      D.SubscriptionUpgradeDocument,
      {
        type,
        id,
      }
    ).then(response => {
      const data = response?.subscriptionUpgrade;
      return data ? new SubscriptionPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable SubscriptionArchive Mutation
 *
 * @param request - function to call the graphql client
 */
class SubscriptionArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the SubscriptionArchive Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.SubscriptionArchiveMutation, D.SubscriptionArchiveMutationVariables>(
      D.SubscriptionArchiveDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.subscriptionArchive;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable TeamMembershipCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class TeamMembershipCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the TeamMembershipCreate Mutation and return a TeamMembershipPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.TeamMembershipCreateInput): Promise<TeamMembershipPayload | undefined> {
    return this.request<D.TeamMembershipCreateMutation, D.TeamMembershipCreateMutationVariables>(
      D.TeamMembershipCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.teamMembershipCreate;
      return data ? new TeamMembershipPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable TeamMembershipDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class TeamMembershipDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the TeamMembershipDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.TeamMembershipDeleteMutation, D.TeamMembershipDeleteMutationVariables>(
      D.TeamMembershipDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.teamMembershipDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable TeamCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class TeamCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the TeamCreate Mutation and return a TeamPayload
   *
   * @param input - required input variable to set the  scope
   * @param vars - variables without 'input' to pass into the TeamCreateMutation
   */
  public async fetch(
    input: D.TeamCreateInput,
    vars?: Omit<D.TeamCreateMutationVariables, "input">
  ): Promise<TeamPayload | undefined> {
    return this.request<D.TeamCreateMutation, D.TeamCreateMutationVariables>(D.TeamCreateDocument, {
      input,
      ...vars,
    }).then(response => {
      const data = response?.teamCreate;
      return data ? new TeamPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable TeamUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class TeamUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the TeamUpdate Mutation and return a TeamPayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.TeamUpdateInput, id: string): Promise<TeamPayload | undefined> {
    return this.request<D.TeamUpdateMutation, D.TeamUpdateMutationVariables>(D.TeamUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.teamUpdate;
      return data ? new TeamPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable TeamArchive Mutation
 *
 * @param request - function to call the graphql client
 */
class TeamArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the TeamArchive Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.TeamArchiveMutation, D.TeamArchiveMutationVariables>(D.TeamArchiveDocument, {
      id,
    }).then(response => {
      const data = response?.teamArchive;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable TeamDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class TeamDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the TeamDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.TeamDeleteMutation, D.TeamDeleteMutationVariables>(D.TeamDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.teamDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable TemplateCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class TemplateCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the TemplateCreate Mutation and return a TemplatePayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.TemplateCreateInput): Promise<TemplatePayload | undefined> {
    return this.request<D.TemplateCreateMutation, D.TemplateCreateMutationVariables>(D.TemplateCreateDocument, {
      input,
    }).then(response => {
      const data = response?.templateCreate;
      return data ? new TemplatePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable TemplateUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class TemplateUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the TemplateUpdate Mutation and return a TemplatePayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.TemplateUpdateInput, id: string): Promise<TemplatePayload | undefined> {
    return this.request<D.TemplateUpdateMutation, D.TemplateUpdateMutationVariables>(D.TemplateUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.templateUpdate;
      return data ? new TemplatePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable TemplateDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class TemplateDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the TemplateDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.TemplateDeleteMutation, D.TemplateDeleteMutationVariables>(D.TemplateDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.templateDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable UserSettingsUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class UserSettingsUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the UserSettingsUpdate Mutation and return a UserSettingsPayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.UserSettingsUpdateInput, id: string): Promise<UserSettingsPayload | undefined> {
    return this.request<D.UserSettingsUpdateMutation, D.UserSettingsUpdateMutationVariables>(
      D.UserSettingsUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.userSettingsUpdate;
      return data ? new UserSettingsPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable UserSettingsFlagIncrement Mutation
 *
 * @param request - function to call the graphql client
 */
class UserSettingsFlagIncrementMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the UserSettingsFlagIncrement Mutation and return a UserSettingsFlagPayload
   *
   * @param flag - required flag variable to set the  scope
   */
  public async fetch(flag: string): Promise<UserSettingsFlagPayload | undefined> {
    return this.request<D.UserSettingsFlagIncrementMutation, D.UserSettingsFlagIncrementMutationVariables>(
      D.UserSettingsFlagIncrementDocument,
      {
        flag,
      }
    ).then(response => {
      const data = response?.userSettingsFlagIncrement;
      return data ? new UserSettingsFlagPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable UserSettingsFlagsReset Mutation
 *
 * @param request - function to call the graphql client
 */
class UserSettingsFlagsResetMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the UserSettingsFlagsReset Mutation and return a UserSettingsFlagsResetPayload
   *
   */
  public async fetch(): Promise<UserSettingsFlagsResetPayload | undefined> {
    return this.request<D.UserSettingsFlagsResetMutation, D.UserSettingsFlagsResetMutationVariables>(
      D.UserSettingsFlagsResetDocument,
      {}
    ).then(response => {
      const data = response?.userSettingsFlagsReset;
      return data ? new UserSettingsFlagsResetPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable UserFlagUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class UserFlagUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the UserFlagUpdate Mutation and return a UserSettingsFlagPayload
   *
   * @param operation - required operation variable to set the  scope
   * @param flag - required flag variable to set the  scope
   */
  public async fetch(
    operation: D.UserFlagUpdateOperation,
    flag: D.UserFlagType
  ): Promise<UserSettingsFlagPayload | undefined> {
    return this.request<D.UserFlagUpdateMutation, D.UserFlagUpdateMutationVariables>(D.UserFlagUpdateDocument, {
      operation,
      flag,
    }).then(response => {
      const data = response?.userFlagUpdate;
      return data ? new UserSettingsFlagPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable UserSubscribeToNewsletter Mutation
 *
 * @param request - function to call the graphql client
 */
class UserSubscribeToNewsletterMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the UserSubscribeToNewsletter Mutation and return a UserSubscribeToNewsletterPayload
   *
   */
  public async fetch(): Promise<UserSubscribeToNewsletterPayload | undefined> {
    return this.request<D.UserSubscribeToNewsletterMutation, D.UserSubscribeToNewsletterMutationVariables>(
      D.UserSubscribeToNewsletterDocument,
      {}
    ).then(response => {
      const data = response?.userSubscribeToNewsletter;
      return data ? new UserSubscribeToNewsletterPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ViewPreferencesCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class ViewPreferencesCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ViewPreferencesCreate Mutation and return a ViewPreferencesPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.ViewPreferencesCreateInput): Promise<ViewPreferencesPayload | undefined> {
    return this.request<D.ViewPreferencesCreateMutation, D.ViewPreferencesCreateMutationVariables>(
      D.ViewPreferencesCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.viewPreferencesCreate;
      return data ? new ViewPreferencesPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ViewPreferencesUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class ViewPreferencesUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ViewPreferencesUpdate Mutation and return a ViewPreferencesPayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.ViewPreferencesUpdateInput, id: string): Promise<ViewPreferencesPayload | undefined> {
    return this.request<D.ViewPreferencesUpdateMutation, D.ViewPreferencesUpdateMutationVariables>(
      D.ViewPreferencesUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.viewPreferencesUpdate;
      return data ? new ViewPreferencesPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable ViewPreferencesDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class ViewPreferencesDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ViewPreferencesDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.ViewPreferencesDeleteMutation, D.ViewPreferencesDeleteMutationVariables>(
      D.ViewPreferencesDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.viewPreferencesDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable WebhookCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class WebhookCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the WebhookCreate Mutation and return a WebhookPayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.WebhookCreateInput): Promise<WebhookPayload | undefined> {
    return this.request<D.WebhookCreateMutation, D.WebhookCreateMutationVariables>(D.WebhookCreateDocument, {
      input,
    }).then(response => {
      const data = response?.webhookCreate;
      return data ? new WebhookPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable WebhookUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class WebhookUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the WebhookUpdate Mutation and return a WebhookPayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.WebhookUpdateInput, id: string): Promise<WebhookPayload | undefined> {
    return this.request<D.WebhookUpdateMutation, D.WebhookUpdateMutationVariables>(D.WebhookUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.webhookUpdate;
      return data ? new WebhookPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable WebhookDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class WebhookDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the WebhookDelete Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.WebhookDeleteMutation, D.WebhookDeleteMutationVariables>(D.WebhookDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.webhookDelete;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable WorkflowStateCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class WorkflowStateCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the WorkflowStateCreate Mutation and return a WorkflowStatePayload
   *
   * @param input - required input variable to set the  scope
   */
  public async fetch(input: D.WorkflowStateCreateInput): Promise<WorkflowStatePayload | undefined> {
    return this.request<D.WorkflowStateCreateMutation, D.WorkflowStateCreateMutationVariables>(
      D.WorkflowStateCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.workflowStateCreate;
      return data ? new WorkflowStatePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable WorkflowStateUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class WorkflowStateUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the WorkflowStateUpdate Mutation and return a WorkflowStatePayload
   *
   * @param input - required input variable to set the  scope
   * @param id - required id variable to set the  scope
   */
  public async fetch(input: D.WorkflowStateUpdateInput, id: string): Promise<WorkflowStatePayload | undefined> {
    return this.request<D.WorkflowStateUpdateMutation, D.WorkflowStateUpdateMutationVariables>(
      D.WorkflowStateUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.workflowStateUpdate;
      return data ? new WorkflowStatePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable WorkflowStateArchive Mutation
 *
 * @param request - function to call the graphql client
 */
class WorkflowStateArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the WorkflowStateArchive Mutation and return a ArchivePayload
   *
   * @param id - required id variable to set the  scope
   */
  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.WorkflowStateArchiveMutation, D.WorkflowStateArchiveMutationVariables>(
      D.WorkflowStateArchiveDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.workflowStateArchive;
      return data ? new ArchivePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable User_AssignedIssues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class User_AssignedIssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the User_AssignedIssues Query and return a IssueConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the User_AssignedIssuesQuery
   */
  public async fetch(
    vars?: Omit<D.User_AssignedIssuesQueryVariables, "id" | "id">
  ): Promise<IssueConnection | undefined> {
    return this.request<D.User_AssignedIssuesQuery, D.User_AssignedIssuesQueryVariables>(
      D.User_AssignedIssuesDocument,
      {
        id: this._id,
        ...vars,
      }
    ).then(response => {
      const data = response?.user?.assignedIssues;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable User_CreatedIssues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class User_CreatedIssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the User_CreatedIssues Query and return a IssueConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the User_CreatedIssuesQuery
   */
  public async fetch(
    vars?: Omit<D.User_CreatedIssuesQueryVariables, "id" | "id">
  ): Promise<IssueConnection | undefined> {
    return this.request<D.User_CreatedIssuesQuery, D.User_CreatedIssuesQueryVariables>(D.User_CreatedIssuesDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.user?.createdIssues;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable User_TeamMemberships Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class User_TeamMembershipsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the User_TeamMemberships Query and return a TeamMembershipConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the User_TeamMembershipsQuery
   */
  public async fetch(
    vars?: Omit<D.User_TeamMembershipsQueryVariables, "id" | "id">
  ): Promise<TeamMembershipConnection | undefined> {
    return this.request<D.User_TeamMembershipsQuery, D.User_TeamMembershipsQueryVariables>(
      D.User_TeamMembershipsDocument,
      {
        id: this._id,
        ...vars,
      }
    ).then(response => {
      const data = response?.user?.teamMemberships;
      return data ? new TeamMembershipConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Viewer_AssignedIssues Query
 *
 * @param request - function to call the graphql client
 */
class Viewer_AssignedIssuesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Viewer_AssignedIssues Query and return a IssueConnection
   *
   * @param vars - variables to pass into the Viewer_AssignedIssuesQuery
   */
  public async fetch(vars?: D.Viewer_AssignedIssuesQueryVariables): Promise<IssueConnection | undefined> {
    return this.request<D.Viewer_AssignedIssuesQuery, D.Viewer_AssignedIssuesQueryVariables>(
      D.Viewer_AssignedIssuesDocument,
      vars
    ).then(response => {
      const data = response?.viewer?.assignedIssues;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Viewer_CreatedIssues Query
 *
 * @param request - function to call the graphql client
 */
class Viewer_CreatedIssuesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Viewer_CreatedIssues Query and return a IssueConnection
   *
   * @param vars - variables to pass into the Viewer_CreatedIssuesQuery
   */
  public async fetch(vars?: D.Viewer_CreatedIssuesQueryVariables): Promise<IssueConnection | undefined> {
    return this.request<D.Viewer_CreatedIssuesQuery, D.Viewer_CreatedIssuesQueryVariables>(
      D.Viewer_CreatedIssuesDocument,
      vars
    ).then(response => {
      const data = response?.viewer?.createdIssues;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Viewer_TeamMemberships Query
 *
 * @param request - function to call the graphql client
 */
class Viewer_TeamMembershipsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Viewer_TeamMemberships Query and return a TeamMembershipConnection
   *
   * @param vars - variables to pass into the Viewer_TeamMembershipsQuery
   */
  public async fetch(vars?: D.Viewer_TeamMembershipsQueryVariables): Promise<TeamMembershipConnection | undefined> {
    return this.request<D.Viewer_TeamMembershipsQuery, D.Viewer_TeamMembershipsQueryVariables>(
      D.Viewer_TeamMembershipsDocument,
      vars
    ).then(response => {
      const data = response?.viewer?.teamMemberships;
      return data ? new TeamMembershipConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Organization_Users Query
 *
 * @param request - function to call the graphql client
 */
class Organization_UsersQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Organization_Users Query and return a UserConnection
   *
   * @param vars - variables to pass into the Organization_UsersQuery
   */
  public async fetch(vars?: D.Organization_UsersQueryVariables): Promise<UserConnection | undefined> {
    return this.request<D.Organization_UsersQuery, D.Organization_UsersQueryVariables>(
      D.Organization_UsersDocument,
      vars
    ).then(response => {
      const data = response?.organization?.users;
      return data ? new UserConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Organization_Teams Query
 *
 * @param request - function to call the graphql client
 */
class Organization_TeamsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Organization_Teams Query and return a TeamConnection
   *
   * @param vars - variables to pass into the Organization_TeamsQuery
   */
  public async fetch(vars?: D.Organization_TeamsQueryVariables): Promise<TeamConnection | undefined> {
    return this.request<D.Organization_TeamsQuery, D.Organization_TeamsQueryVariables>(
      D.Organization_TeamsDocument,
      vars
    ).then(response => {
      const data = response?.organization?.teams;
      return data ? new TeamConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Organization_Milestones Query
 *
 * @param request - function to call the graphql client
 */
class Organization_MilestonesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Organization_Milestones Query and return a MilestoneConnection
   *
   * @param vars - variables to pass into the Organization_MilestonesQuery
   */
  public async fetch(vars?: D.Organization_MilestonesQueryVariables): Promise<MilestoneConnection | undefined> {
    return this.request<D.Organization_MilestonesQuery, D.Organization_MilestonesQueryVariables>(
      D.Organization_MilestonesDocument,
      vars
    ).then(response => {
      const data = response?.organization?.milestones;
      return data ? new MilestoneConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Organization_Integrations Query
 *
 * @param request - function to call the graphql client
 */
class Organization_IntegrationsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Organization_Integrations Query and return a IntegrationConnection
   *
   * @param vars - variables to pass into the Organization_IntegrationsQuery
   */
  public async fetch(vars?: D.Organization_IntegrationsQueryVariables): Promise<IntegrationConnection | undefined> {
    return this.request<D.Organization_IntegrationsQuery, D.Organization_IntegrationsQueryVariables>(
      D.Organization_IntegrationsDocument,
      vars
    ).then(response => {
      const data = response?.organization?.integrations;
      return data ? new IntegrationConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable BillingDetails_PaymentMethod Query
 *
 * @param request - function to call the graphql client
 */
class BillingDetails_PaymentMethodQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the BillingDetails_PaymentMethod Query and return a Card
   *
   */
  public async fetch(): Promise<Card | undefined> {
    return this.request<D.BillingDetails_PaymentMethodQuery, D.BillingDetails_PaymentMethodQueryVariables>(
      D.BillingDetails_PaymentMethodDocument,
      {}
    ).then(response => {
      const data = response?.billingDetails?.paymentMethod;
      return data ? new Card(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable CollaborativeDocumentJoin_Steps Query
 *
 * @param request - function to call the graphql client
 * @param clientId - required clientId variable to set the  scope
 * @param issueId - required issueId variable to set the  scope
 * @param version - required version variable to set the  scope
 */
class CollaborativeDocumentJoin_StepsQuery extends LinearRequest {
  private _clientId: string;
  private _issueId: string;
  private _version: number;

  public constructor(request: Request, clientId: string, issueId: string, version: number) {
    super(request);
    this._clientId = clientId;
    this._issueId = issueId;
    this._version = version;
  }

  /**
   * Call the CollaborativeDocumentJoin_Steps Query and return a StepsResponse
   *
   */
  public async fetch(): Promise<StepsResponse | undefined> {
    return this.request<D.CollaborativeDocumentJoin_StepsQuery, D.CollaborativeDocumentJoin_StepsQueryVariables>(
      D.CollaborativeDocumentJoin_StepsDocument,
      {
        clientId: this._clientId,
        issueId: this._issueId,
        version: this._version,
      }
    ).then(response => {
      const data = response?.collaborativeDocumentJoin?.steps;
      return data ? new StepsResponse(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Cycle_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Cycle_IssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Cycle_Issues Query and return a IssueConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Cycle_IssuesQuery
   */
  public async fetch(vars?: Omit<D.Cycle_IssuesQueryVariables, "id" | "id">): Promise<IssueConnection | undefined> {
    return this.request<D.Cycle_IssuesQuery, D.Cycle_IssuesQueryVariables>(D.Cycle_IssuesDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.cycle?.issues;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Cycle_UncompletedIssuesUponClose Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Cycle_UncompletedIssuesUponCloseQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Cycle_UncompletedIssuesUponClose Query and return a IssueConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Cycle_UncompletedIssuesUponCloseQuery
   */
  public async fetch(
    vars?: Omit<D.Cycle_UncompletedIssuesUponCloseQueryVariables, "id" | "id">
  ): Promise<IssueConnection | undefined> {
    return this.request<D.Cycle_UncompletedIssuesUponCloseQuery, D.Cycle_UncompletedIssuesUponCloseQueryVariables>(
      D.Cycle_UncompletedIssuesUponCloseDocument,
      {
        id: this._id,
        ...vars,
      }
    ).then(response => {
      const data = response?.cycle?.uncompletedIssuesUponClose;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable FigmaEmbedInfo_FigmaEmbed Query
 *
 * @param request - function to call the graphql client
 * @param fileId - required fileId variable to set the  scope
 */
class FigmaEmbedInfo_FigmaEmbedQuery extends LinearRequest {
  private _fileId: string;

  public constructor(request: Request, fileId: string) {
    super(request);
    this._fileId = fileId;
  }

  /**
   * Call the FigmaEmbedInfo_FigmaEmbed Query and return a FigmaEmbed
   *
   * @param vars - variables without 'fileId', 'fileId' to pass into the FigmaEmbedInfo_FigmaEmbedQuery
   */
  public async fetch(
    vars?: Omit<D.FigmaEmbedInfo_FigmaEmbedQueryVariables, "fileId" | "fileId">
  ): Promise<FigmaEmbed | undefined> {
    return this.request<D.FigmaEmbedInfo_FigmaEmbedQuery, D.FigmaEmbedInfo_FigmaEmbedQueryVariables>(
      D.FigmaEmbedInfo_FigmaEmbedDocument,
      {
        fileId: this._fileId,
        ...vars,
      }
    ).then(response => {
      const data = response?.figmaEmbedInfo?.figmaEmbed;
      return data ? new FigmaEmbed(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Integration_Settings Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Integration_SettingsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Integration_Settings Query and return a IntegrationSettings
   *
   */
  public async fetch(): Promise<IntegrationSettings | undefined> {
    return this.request<D.Integration_SettingsQuery, D.Integration_SettingsQueryVariables>(
      D.Integration_SettingsDocument,
      {
        id: this._id,
      }
    ).then(response => {
      const data = response?.integration?.settings;
      return data ? new IntegrationSettings(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Integration_Settings_SlackPost Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the integration scope
 */
class Integration_Settings_SlackPostQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Integration_Settings_SlackPost Query and return a SlackPostSettings
   *
   */
  public async fetch(): Promise<SlackPostSettings | undefined> {
    return this.request<D.Integration_Settings_SlackPostQuery, D.Integration_Settings_SlackPostQueryVariables>(
      D.Integration_Settings_SlackPostDocument,
      {
        id: this._id,
      }
    ).then(response => {
      const data = response?.integration?.settings?.slackPost;
      return data ? new SlackPostSettings(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Integration_Settings_SlackProjectPost Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the integration scope
 */
class Integration_Settings_SlackProjectPostQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Integration_Settings_SlackProjectPost Query and return a SlackPostSettings
   *
   */
  public async fetch(): Promise<SlackPostSettings | undefined> {
    return this.request<
      D.Integration_Settings_SlackProjectPostQuery,
      D.Integration_Settings_SlackProjectPostQueryVariables
    >(D.Integration_Settings_SlackProjectPostDocument, {
      id: this._id,
    }).then(response => {
      const data = response?.integration?.settings?.slackProjectPost;
      return data ? new SlackPostSettings(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Integration_Settings_GoogleSheets Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the integration scope
 */
class Integration_Settings_GoogleSheetsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Integration_Settings_GoogleSheets Query and return a GoogleSheetsSettings
   *
   */
  public async fetch(): Promise<GoogleSheetsSettings | undefined> {
    return this.request<D.Integration_Settings_GoogleSheetsQuery, D.Integration_Settings_GoogleSheetsQueryVariables>(
      D.Integration_Settings_GoogleSheetsDocument,
      {
        id: this._id,
      }
    ).then(response => {
      const data = response?.integration?.settings?.googleSheets;
      return data ? new GoogleSheetsSettings(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Integration_Settings_Sentry Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the integration scope
 */
class Integration_Settings_SentryQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Integration_Settings_Sentry Query and return a SentrySettings
   *
   */
  public async fetch(): Promise<SentrySettings | undefined> {
    return this.request<D.Integration_Settings_SentryQuery, D.Integration_Settings_SentryQueryVariables>(
      D.Integration_Settings_SentryDocument,
      {
        id: this._id,
      }
    ).then(response => {
      const data = response?.integration?.settings?.sentry;
      return data ? new SentrySettings(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationResource_Data Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class IntegrationResource_DataQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the IntegrationResource_Data Query and return a IntegrationResourceData
   *
   */
  public async fetch(): Promise<IntegrationResourceData | undefined> {
    return this.request<D.IntegrationResource_DataQuery, D.IntegrationResource_DataQueryVariables>(
      D.IntegrationResource_DataDocument,
      {
        id: this._id,
      }
    ).then(response => {
      const data = response?.integrationResource?.data;
      return data ? new IntegrationResourceData(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationResource_PullRequest Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class IntegrationResource_PullRequestQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the IntegrationResource_PullRequest Query and return a PullRequestPayload
   *
   */
  public async fetch(): Promise<PullRequestPayload | undefined> {
    return this.request<D.IntegrationResource_PullRequestQuery, D.IntegrationResource_PullRequestQueryVariables>(
      D.IntegrationResource_PullRequestDocument,
      {
        id: this._id,
      }
    ).then(response => {
      const data = response?.integrationResource?.pullRequest;
      return data ? new PullRequestPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationResource_Data_GithubPullRequest Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the integrationResource scope
 */
class IntegrationResource_Data_GithubPullRequestQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the IntegrationResource_Data_GithubPullRequest Query and return a PullRequestPayload
   *
   */
  public async fetch(): Promise<PullRequestPayload | undefined> {
    return this.request<
      D.IntegrationResource_Data_GithubPullRequestQuery,
      D.IntegrationResource_Data_GithubPullRequestQueryVariables
    >(D.IntegrationResource_Data_GithubPullRequestDocument, {
      id: this._id,
    }).then(response => {
      const data = response?.integrationResource?.data?.githubPullRequest;
      return data ? new PullRequestPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationResource_Data_GitlabMergeRequest Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the integrationResource scope
 */
class IntegrationResource_Data_GitlabMergeRequestQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the IntegrationResource_Data_GitlabMergeRequest Query and return a PullRequestPayload
   *
   */
  public async fetch(): Promise<PullRequestPayload | undefined> {
    return this.request<
      D.IntegrationResource_Data_GitlabMergeRequestQuery,
      D.IntegrationResource_Data_GitlabMergeRequestQueryVariables
    >(D.IntegrationResource_Data_GitlabMergeRequestDocument, {
      id: this._id,
    }).then(response => {
      const data = response?.integrationResource?.data?.gitlabMergeRequest;
      return data ? new PullRequestPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationResource_Data_GithubCommit Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the integrationResource scope
 */
class IntegrationResource_Data_GithubCommitQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the IntegrationResource_Data_GithubCommit Query and return a CommitPayload
   *
   */
  public async fetch(): Promise<CommitPayload | undefined> {
    return this.request<
      D.IntegrationResource_Data_GithubCommitQuery,
      D.IntegrationResource_Data_GithubCommitQueryVariables
    >(D.IntegrationResource_Data_GithubCommitDocument, {
      id: this._id,
    }).then(response => {
      const data = response?.integrationResource?.data?.githubCommit;
      return data ? new CommitPayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationResource_Data_SentryIssue Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the integrationResource scope
 */
class IntegrationResource_Data_SentryIssueQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the IntegrationResource_Data_SentryIssue Query and return a SentryIssuePayload
   *
   */
  public async fetch(): Promise<SentryIssuePayload | undefined> {
    return this.request<
      D.IntegrationResource_Data_SentryIssueQuery,
      D.IntegrationResource_Data_SentryIssueQueryVariables
    >(D.IntegrationResource_Data_SentryIssueDocument, {
      id: this._id,
    }).then(response => {
      const data = response?.integrationResource?.data?.sentryIssue;
      return data ? new SentryIssuePayload(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable InviteInfo_InviteData Query
 *
 * @param request - function to call the graphql client
 * @param userHash - required userHash variable to set the  scope
 */
class InviteInfo_InviteDataQuery extends LinearRequest {
  private _userHash: string;

  public constructor(request: Request, userHash: string) {
    super(request);
    this._userHash = userHash;
  }

  /**
   * Call the InviteInfo_InviteData Query and return a InviteData
   *
   * @param vars - variables without 'userHash', 'userHash' to pass into the InviteInfo_InviteDataQuery
   */
  public async fetch(
    vars?: Omit<D.InviteInfo_InviteDataQueryVariables, "userHash" | "userHash">
  ): Promise<InviteData | undefined> {
    return this.request<D.InviteInfo_InviteDataQuery, D.InviteInfo_InviteDataQueryVariables>(
      D.InviteInfo_InviteDataDocument,
      {
        userHash: this._userHash,
        ...vars,
      }
    ).then(response => {
      const data = response?.inviteInfo?.inviteData;
      return data ? new InviteData(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueLabel_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class IssueLabel_IssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the IssueLabel_Issues Query and return a IssueConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the IssueLabel_IssuesQuery
   */
  public async fetch(
    vars?: Omit<D.IssueLabel_IssuesQueryVariables, "id" | "id">
  ): Promise<IssueConnection | undefined> {
    return this.request<D.IssueLabel_IssuesQuery, D.IssueLabel_IssuesQueryVariables>(D.IssueLabel_IssuesDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.issueLabel?.issues;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Issue_Subscribers Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Issue_SubscribersQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_Subscribers Query and return a UserConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Issue_SubscribersQuery
   */
  public async fetch(vars?: Omit<D.Issue_SubscribersQueryVariables, "id" | "id">): Promise<UserConnection | undefined> {
    return this.request<D.Issue_SubscribersQuery, D.Issue_SubscribersQueryVariables>(D.Issue_SubscribersDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.issue?.subscribers;
      return data ? new UserConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Issue_Children Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Issue_ChildrenQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_Children Query and return a IssueConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Issue_ChildrenQuery
   */
  public async fetch(vars?: Omit<D.Issue_ChildrenQueryVariables, "id" | "id">): Promise<IssueConnection | undefined> {
    return this.request<D.Issue_ChildrenQuery, D.Issue_ChildrenQueryVariables>(D.Issue_ChildrenDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.issue?.children;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Issue_Comments Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Issue_CommentsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_Comments Query and return a CommentConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Issue_CommentsQuery
   */
  public async fetch(vars?: Omit<D.Issue_CommentsQueryVariables, "id" | "id">): Promise<CommentConnection | undefined> {
    return this.request<D.Issue_CommentsQuery, D.Issue_CommentsQueryVariables>(D.Issue_CommentsDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.issue?.comments;
      return data ? new CommentConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Issue_History Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Issue_HistoryQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_History Query and return a IssueHistoryConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Issue_HistoryQuery
   */
  public async fetch(
    vars?: Omit<D.Issue_HistoryQueryVariables, "id" | "id">
  ): Promise<IssueHistoryConnection | undefined> {
    return this.request<D.Issue_HistoryQuery, D.Issue_HistoryQueryVariables>(D.Issue_HistoryDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.issue?.history;
      return data ? new IssueHistoryConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Issue_Labels Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Issue_LabelsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_Labels Query and return a IssueLabelConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Issue_LabelsQuery
   */
  public async fetch(
    vars?: Omit<D.Issue_LabelsQueryVariables, "id" | "id">
  ): Promise<IssueLabelConnection | undefined> {
    return this.request<D.Issue_LabelsQuery, D.Issue_LabelsQueryVariables>(D.Issue_LabelsDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.issue?.labels;
      return data ? new IssueLabelConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Issue_IntegrationResources Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Issue_IntegrationResourcesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_IntegrationResources Query and return a IntegrationResourceConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Issue_IntegrationResourcesQuery
   */
  public async fetch(
    vars?: Omit<D.Issue_IntegrationResourcesQueryVariables, "id" | "id">
  ): Promise<IntegrationResourceConnection | undefined> {
    return this.request<D.Issue_IntegrationResourcesQuery, D.Issue_IntegrationResourcesQueryVariables>(
      D.Issue_IntegrationResourcesDocument,
      {
        id: this._id,
        ...vars,
      }
    ).then(response => {
      const data = response?.issue?.integrationResources;
      return data ? new IntegrationResourceConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Issue_Relations Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Issue_RelationsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_Relations Query and return a IssueRelationConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Issue_RelationsQuery
   */
  public async fetch(
    vars?: Omit<D.Issue_RelationsQueryVariables, "id" | "id">
  ): Promise<IssueRelationConnection | undefined> {
    return this.request<D.Issue_RelationsQuery, D.Issue_RelationsQueryVariables>(D.Issue_RelationsDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.issue?.relations;
      return data ? new IssueRelationConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Issue_InverseRelations Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Issue_InverseRelationsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_InverseRelations Query and return a IssueRelationConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Issue_InverseRelationsQuery
   */
  public async fetch(
    vars?: Omit<D.Issue_InverseRelationsQueryVariables, "id" | "id">
  ): Promise<IssueRelationConnection | undefined> {
    return this.request<D.Issue_InverseRelationsQuery, D.Issue_InverseRelationsQueryVariables>(
      D.Issue_InverseRelationsDocument,
      {
        id: this._id,
        ...vars,
      }
    ).then(response => {
      const data = response?.issue?.inverseRelations;
      return data ? new IssueRelationConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Milestone_Projects Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Milestone_ProjectsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Milestone_Projects Query and return a ProjectConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Milestone_ProjectsQuery
   */
  public async fetch(
    vars?: Omit<D.Milestone_ProjectsQueryVariables, "id" | "id">
  ): Promise<ProjectConnection | undefined> {
    return this.request<D.Milestone_ProjectsQuery, D.Milestone_ProjectsQueryVariables>(D.Milestone_ProjectsDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.milestone?.projects;
      return data ? new ProjectConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable OrganizationInvite_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class OrganizationInvite_IssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the OrganizationInvite_Issues Query and return a IssueConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the OrganizationInvite_IssuesQuery
   */
  public async fetch(
    vars?: Omit<D.OrganizationInvite_IssuesQueryVariables, "id" | "id">
  ): Promise<IssueConnection | undefined> {
    return this.request<D.OrganizationInvite_IssuesQuery, D.OrganizationInvite_IssuesQueryVariables>(
      D.OrganizationInvite_IssuesDocument,
      {
        id: this._id,
        ...vars,
      }
    ).then(response => {
      const data = response?.organizationInvite?.issues;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Project_Teams Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Project_TeamsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Project_Teams Query and return a TeamConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Project_TeamsQuery
   */
  public async fetch(vars?: Omit<D.Project_TeamsQueryVariables, "id" | "id">): Promise<TeamConnection | undefined> {
    return this.request<D.Project_TeamsQuery, D.Project_TeamsQueryVariables>(D.Project_TeamsDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.project?.teams;
      return data ? new TeamConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Project_Members Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Project_MembersQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Project_Members Query and return a UserConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Project_MembersQuery
   */
  public async fetch(vars?: Omit<D.Project_MembersQueryVariables, "id" | "id">): Promise<UserConnection | undefined> {
    return this.request<D.Project_MembersQuery, D.Project_MembersQueryVariables>(D.Project_MembersDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.project?.members;
      return data ? new UserConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Project_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Project_IssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Project_Issues Query and return a IssueConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Project_IssuesQuery
   */
  public async fetch(vars?: Omit<D.Project_IssuesQueryVariables, "id" | "id">): Promise<IssueConnection | undefined> {
    return this.request<D.Project_IssuesQuery, D.Project_IssuesQueryVariables>(D.Project_IssuesDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.project?.issues;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Project_Links Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Project_LinksQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Project_Links Query and return a ProjectLinkConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Project_LinksQuery
   */
  public async fetch(
    vars?: Omit<D.Project_LinksQueryVariables, "id" | "id">
  ): Promise<ProjectLinkConnection | undefined> {
    return this.request<D.Project_LinksQuery, D.Project_LinksQueryVariables>(D.Project_LinksDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.project?.links;
      return data ? new ProjectLinkConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Team_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Team_IssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_Issues Query and return a IssueConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Team_IssuesQuery
   */
  public async fetch(vars?: Omit<D.Team_IssuesQueryVariables, "id" | "id">): Promise<IssueConnection | undefined> {
    return this.request<D.Team_IssuesQuery, D.Team_IssuesQueryVariables>(D.Team_IssuesDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.team?.issues;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Team_Cycles Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Team_CyclesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_Cycles Query and return a CycleConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Team_CyclesQuery
   */
  public async fetch(vars?: Omit<D.Team_CyclesQueryVariables, "id" | "id">): Promise<CycleConnection | undefined> {
    return this.request<D.Team_CyclesQuery, D.Team_CyclesQueryVariables>(D.Team_CyclesDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.team?.cycles;
      return data ? new CycleConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Team_Memberships Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Team_MembershipsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_Memberships Query and return a TeamMembershipConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Team_MembershipsQuery
   */
  public async fetch(
    vars?: Omit<D.Team_MembershipsQueryVariables, "id" | "id">
  ): Promise<TeamMembershipConnection | undefined> {
    return this.request<D.Team_MembershipsQuery, D.Team_MembershipsQueryVariables>(D.Team_MembershipsDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.team?.memberships;
      return data ? new TeamMembershipConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Team_Projects Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Team_ProjectsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_Projects Query and return a ProjectConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Team_ProjectsQuery
   */
  public async fetch(vars?: Omit<D.Team_ProjectsQueryVariables, "id" | "id">): Promise<ProjectConnection | undefined> {
    return this.request<D.Team_ProjectsQuery, D.Team_ProjectsQueryVariables>(D.Team_ProjectsDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.team?.projects;
      return data ? new ProjectConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Team_States Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Team_StatesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_States Query and return a WorkflowStateConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Team_StatesQuery
   */
  public async fetch(
    vars?: Omit<D.Team_StatesQueryVariables, "id" | "id">
  ): Promise<WorkflowStateConnection | undefined> {
    return this.request<D.Team_StatesQuery, D.Team_StatesQueryVariables>(D.Team_StatesDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.team?.states;
      return data ? new WorkflowStateConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Team_Templates Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Team_TemplatesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_Templates Query and return a TemplateConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Team_TemplatesQuery
   */
  public async fetch(
    vars?: Omit<D.Team_TemplatesQueryVariables, "id" | "id">
  ): Promise<TemplateConnection | undefined> {
    return this.request<D.Team_TemplatesQuery, D.Team_TemplatesQueryVariables>(D.Team_TemplatesDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.team?.templates;
      return data ? new TemplateConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Team_Labels Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Team_LabelsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_Labels Query and return a IssueLabelConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Team_LabelsQuery
   */
  public async fetch(vars?: Omit<D.Team_LabelsQueryVariables, "id" | "id">): Promise<IssueLabelConnection | undefined> {
    return this.request<D.Team_LabelsQuery, D.Team_LabelsQueryVariables>(D.Team_LabelsDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.team?.labels;
      return data ? new IssueLabelConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable Team_Webhooks Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class Team_WebhooksQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_Webhooks Query and return a WebhookConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the Team_WebhooksQuery
   */
  public async fetch(vars?: Omit<D.Team_WebhooksQueryVariables, "id" | "id">): Promise<WebhookConnection | undefined> {
    return this.request<D.Team_WebhooksQuery, D.Team_WebhooksQueryVariables>(D.Team_WebhooksDocument, {
      id: this._id,
      ...vars,
    }).then(response => {
      const data = response?.team?.webhooks;
      return data ? new WebhookConnection(this.request, data) : undefined;
    });
  }
}

/**
 * A fetchable WorkflowState_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id variable to set the  scope
 */
class WorkflowState_IssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the WorkflowState_Issues Query and return a IssueConnection
   *
   * @param vars - variables without 'id', 'id' to pass into the WorkflowState_IssuesQuery
   */
  public async fetch(
    vars?: Omit<D.WorkflowState_IssuesQueryVariables, "id" | "id">
  ): Promise<IssueConnection | undefined> {
    return this.request<D.WorkflowState_IssuesQuery, D.WorkflowState_IssuesQueryVariables>(
      D.WorkflowState_IssuesDocument,
      {
        id: this._id,
        ...vars,
      }
    ).then(response => {
      const data = response?.workflowState?.issues;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * The SDK class containing all root operations
 *
 * @param request - function to call the graphql client
 */
export class LinearSdk extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public user = new UserQuery(this.request).fetch;
  public viewer = new ViewerQuery(this.request).fetch;
  public organization = new OrganizationQuery(this.request).fetch;
  public organizationExists = new OrganizationExistsQuery(this.request).fetch;
  public syncBootstrap = new SyncBootstrapQuery(this.request).fetch;
  public syncUpdates = new SyncUpdatesQuery(this.request).fetch;
  public archivedModelSync = new ArchivedModelSyncQuery(this.request).fetch;
  public archivedModelsSync = new ArchivedModelsSyncQuery(this.request).fetch;
  public adminUserAccountLookup = new AdminUserAccountLookupQuery(this.request).fetch;
  public users = new UsersQuery(this.request).fetch;
  public apiKeys = new ApiKeysQuery(this.request).fetch;
  public applicationWithAuthorization = new ApplicationWithAuthorizationQuery(this.request).fetch;
  public authorizedApplications = new AuthorizedApplicationsQuery(this.request).fetch;
  public ssoUrlFromEmail = new SsoUrlFromEmailQuery(this.request).fetch;
  public billingDetails = new BillingDetailsQuery(this.request).fetch;
  public collaborativeDocumentJoin = new CollaborativeDocumentJoinQuery(this.request).fetch;
  public comment = new CommentQuery(this.request).fetch;
  public comments = new CommentsQuery(this.request).fetch;
  public customView = new CustomViewQuery(this.request).fetch;
  public customViews = new CustomViewsQuery(this.request).fetch;
  public cycle = new CycleQuery(this.request).fetch;
  public cycles = new CyclesQuery(this.request).fetch;
  public emoji = new EmojiQuery(this.request).fetch;
  public emojis = new EmojisQuery(this.request).fetch;
  public favorite = new FavoriteQuery(this.request).fetch;
  public favorites = new FavoritesQuery(this.request).fetch;
  public figmaEmbedInfo = new FigmaEmbedInfoQuery(this.request).fetch;
  public integration = new IntegrationQuery(this.request).fetch;
  public integrations = new IntegrationsQuery(this.request).fetch;
  public integrationResource = new IntegrationResourceQuery(this.request).fetch;
  public integrationResources = new IntegrationResourcesQuery(this.request).fetch;
  public inviteInfo = new InviteInfoQuery(this.request).fetch;
  public issueLabel = new IssueLabelQuery(this.request).fetch;
  public issueLabels = new IssueLabelsQuery(this.request).fetch;
  public issueRelation = new IssueRelationQuery(this.request).fetch;
  public issueRelations = new IssueRelationsQuery(this.request).fetch;
  public issue = new IssueQuery(this.request).fetch;
  public issueSearch = new IssueSearchQuery(this.request).fetch;
  public issues = new IssuesQuery(this.request).fetch;
  public milestone = new MilestoneQuery(this.request).fetch;
  public milestones = new MilestonesQuery(this.request).fetch;
  public notification = new NotificationQuery(this.request).fetch;
  public notifications = new NotificationsQuery(this.request).fetch;
  public notificationSubscription = new NotificationSubscriptionQuery(this.request).fetch;
  public organizationInvite = new OrganizationInviteQuery(this.request).fetch;
  public organizationInvites = new OrganizationInvitesQuery(this.request).fetch;
  public projectLink = new ProjectLinkQuery(this.request).fetch;
  public ProjectLinks = new ProjectLinksQuery(this.request).fetch;
  public project = new ProjectQuery(this.request).fetch;
  public projects = new ProjectsQuery(this.request).fetch;
  public pushSubscriptionTest = new PushSubscriptionTestQuery(this.request).fetch;
  public reaction = new ReactionQuery(this.request).fetch;
  public reactions = new ReactionsQuery(this.request).fetch;
  public subscription = new SubscriptionQuery(this.request).fetch;
  public teamMembership = new TeamMembershipQuery(this.request).fetch;
  public teamMemberships = new TeamMembershipsQuery(this.request).fetch;
  public team = new TeamQuery(this.request).fetch;
  public teams = new TeamsQuery(this.request).fetch;
  public templates = new TemplatesQuery(this.request).fetch;
  public template = new TemplateQuery(this.request).fetch;
  public viewPreferences = new ViewPreferencesQuery(this.request).fetch;
  public webhook = new WebhookQuery(this.request).fetch;
  public webhooks = new WebhooksQuery(this.request).fetch;
  public workflowState = new WorkflowStateQuery(this.request).fetch;
  public workflowStates = new WorkflowStatesQuery(this.request).fetch;
  public userUpdate = new UserUpdateMutation(this.request).fetch;
  public userPromoteAdmin = new UserPromoteAdminMutation(this.request).fetch;
  public userDemoteAdmin = new UserDemoteAdminMutation(this.request).fetch;
  public userSuspend = new UserSuspendMutation(this.request).fetch;
  public userUnsuspend = new UserUnsuspendMutation(this.request).fetch;
  public organizationUpdate = new OrganizationUpdateMutation(this.request).fetch;
  public organizationDeleteChallenge = new OrganizationDeleteChallengeMutation(this.request).fetch;
  public organizationDelete = new OrganizationDeleteMutation(this.request).fetch;
  public adminDeleteIntegration = new AdminDeleteIntegrationMutation(this.request).fetch;
  public organizationToggleAccess = new OrganizationToggleAccessMutation(this.request).fetch;
  public organizationChangeEmailDomain = new OrganizationChangeEmailDomainMutation(this.request).fetch;
  public organizationToggleSamlEnabled = new OrganizationToggleSamlEnabledMutation(this.request).fetch;
  public organizationConfigureSaml = new OrganizationConfigureSamlMutation(this.request).fetch;
  public adminCommand = new AdminCommandMutation(this.request).fetch;
  public adminBulkEmail = new AdminBulkEmailMutation(this.request).fetch;
  public adminCreateStripeCustomer = new AdminCreateStripeCustomerMutation(this.request).fetch;
  public adminScheduleAnonymousTask = new AdminScheduleAnonymousTaskMutation(this.request).fetch;
  public adminUserAccountChangeEmail = new AdminUserAccountChangeEmailMutation(this.request).fetch;
  public eventCreate = new EventCreateMutation(this.request).fetch;
  public apiKeyCreate = new ApiKeyCreateMutation(this.request).fetch;
  public apiKeyDelete = new ApiKeyDeleteMutation(this.request).fetch;
  public emailUserAccountAuthChallenge = new EmailUserAccountAuthChallengeMutation(this.request).fetch;
  public emailTokenUserAccountAuth = new EmailTokenUserAccountAuthMutation(this.request).fetch;
  public samlTokenUserAccountAuth = new SamlTokenUserAccountAuthMutation(this.request).fetch;
  public googleUserAccountAuth = new GoogleUserAccountAuthMutation(this.request).fetch;
  public createOrganizationFromOnboarding = new CreateOrganizationFromOnboardingMutation(this.request).fetch;
  public joinOrganizationFromOnboarding = new JoinOrganizationFromOnboardingMutation(this.request).fetch;
  public leaveOrganization = new LeaveOrganizationMutation(this.request).fetch;
  public billingEmailUpdate = new BillingEmailUpdateMutation(this.request).fetch;
  public collaborativeDocumentUpdate = new CollaborativeDocumentUpdateMutation(this.request).fetch;
  public commentCreate = new CommentCreateMutation(this.request).fetch;
  public commentUpdate = new CommentUpdateMutation(this.request).fetch;
  public commentDelete = new CommentDeleteMutation(this.request).fetch;
  public contactCreate = new ContactCreateMutation(this.request).fetch;
  public customViewCreate = new CustomViewCreateMutation(this.request).fetch;
  public customViewUpdate = new CustomViewUpdateMutation(this.request).fetch;
  public customViewDelete = new CustomViewDeleteMutation(this.request).fetch;
  public cycleCreate = new CycleCreateMutation(this.request).fetch;
  public cycleUpdate = new CycleUpdateMutation(this.request).fetch;
  public cycleArchive = new CycleArchiveMutation(this.request).fetch;
  public debugFailWithInternalError = new DebugFailWithInternalErrorMutation(this.request).fetch;
  public debugFailWithWarning = new DebugFailWithWarningMutation(this.request).fetch;
  public debugCreateSAMLOrg = new DebugCreateSamlOrgMutation(this.request).fetch;
  public emailUnsubscribe = new EmailUnsubscribeMutation(this.request).fetch;
  public emojiCreate = new EmojiCreateMutation(this.request).fetch;
  public emojiDelete = new EmojiDeleteMutation(this.request).fetch;
  public favoriteCreate = new FavoriteCreateMutation(this.request).fetch;
  public favoriteUpdate = new FavoriteUpdateMutation(this.request).fetch;
  public favoriteDelete = new FavoriteDeleteMutation(this.request).fetch;
  public feedbackCreate = new FeedbackCreateMutation(this.request).fetch;
  public fileUpload = new FileUploadMutation(this.request).fetch;
  public imageUploadFromUrl = new ImageUploadFromUrlMutation(this.request).fetch;
  public integrationGithubConnect = new IntegrationGithubConnectMutation(this.request).fetch;
  public integrationGitlabConnect = new IntegrationGitlabConnectMutation(this.request).fetch;
  public integrationSlack = new IntegrationSlackMutation(this.request).fetch;
  public integrationSlackPersonal = new IntegrationSlackPersonalMutation(this.request).fetch;
  public integrationSlackPost = new IntegrationSlackPostMutation(this.request).fetch;
  public integrationSlackProjectPost = new IntegrationSlackProjectPostMutation(this.request).fetch;
  public integrationSlackImportEmojis = new IntegrationSlackImportEmojisMutation(this.request).fetch;
  public integrationFigma = new IntegrationFigmaMutation(this.request).fetch;
  public integrationGoogleSheets = new IntegrationGoogleSheetsMutation(this.request).fetch;
  public refreshGoogleSheetsData = new RefreshGoogleSheetsDataMutation(this.request).fetch;
  public integrationSentryConnect = new IntegrationSentryConnectMutation(this.request).fetch;
  public integrationDelete = new IntegrationDeleteMutation(this.request).fetch;
  public integrationResourceArchive = new IntegrationResourceArchiveMutation(this.request).fetch;
  public issueLabelCreate = new IssueLabelCreateMutation(this.request).fetch;
  public issueLabelUpdate = new IssueLabelUpdateMutation(this.request).fetch;
  public issueLabelArchive = new IssueLabelArchiveMutation(this.request).fetch;
  public issueRelationCreate = new IssueRelationCreateMutation(this.request).fetch;
  public issueRelationUpdate = new IssueRelationUpdateMutation(this.request).fetch;
  public issueRelationDelete = new IssueRelationDeleteMutation(this.request).fetch;
  public issueCreate = new IssueCreateMutation(this.request).fetch;
  public issueUpdate = new IssueUpdateMutation(this.request).fetch;
  public issueArchive = new IssueArchiveMutation(this.request).fetch;
  public issueUnarchive = new IssueUnarchiveMutation(this.request).fetch;
  public milestoneCreate = new MilestoneCreateMutation(this.request).fetch;
  public milestoneUpdate = new MilestoneUpdateMutation(this.request).fetch;
  public milestoneDelete = new MilestoneDeleteMutation(this.request).fetch;
  public notificationCreate = new NotificationCreateMutation(this.request).fetch;
  public notificationUpdate = new NotificationUpdateMutation(this.request).fetch;
  public notificationDelete = new NotificationDeleteMutation(this.request).fetch;
  public notificationArchive = new NotificationArchiveMutation(this.request).fetch;
  public notificationUnarchive = new NotificationUnarchiveMutation(this.request).fetch;
  public notificationSubscriptionCreate = new NotificationSubscriptionCreateMutation(this.request).fetch;
  public notificationSubscriptionDelete = new NotificationSubscriptionDeleteMutation(this.request).fetch;
  public oauthClientCreate = new OauthClientCreateMutation(this.request).fetch;
  public oauthClientUpdate = new OauthClientUpdateMutation(this.request).fetch;
  public oauthClientArchive = new OauthClientArchiveMutation(this.request).fetch;
  public oauthClientRotateSecret = new OauthClientRotateSecretMutation(this.request).fetch;
  public oauthTokenRevoke = new OauthTokenRevokeMutation(this.request).fetch;
  public organizationDomainVerify = new OrganizationDomainVerifyMutation(this.request).fetch;
  public organizationDomainCreate = new OrganizationDomainCreateMutation(this.request).fetch;
  public organizationDomainDelete = new OrganizationDomainDeleteMutation(this.request).fetch;
  public organizationInviteCreate = new OrganizationInviteCreateMutation(this.request).fetch;
  public resentOrganizationInvite = new ResentOrganizationInviteMutation(this.request).fetch;
  public organizationInviteDelete = new OrganizationInviteDeleteMutation(this.request).fetch;
  public projectLinkCreate = new ProjectLinkCreateMutation(this.request).fetch;
  public projectLinkDelete = new ProjectLinkDeleteMutation(this.request).fetch;
  public projectCreate = new ProjectCreateMutation(this.request).fetch;
  public projectUpdate = new ProjectUpdateMutation(this.request).fetch;
  public projectArchive = new ProjectArchiveMutation(this.request).fetch;
  public pushSubscriptionCreate = new PushSubscriptionCreateMutation(this.request).fetch;
  public pushSubscriptionDelete = new PushSubscriptionDeleteMutation(this.request).fetch;
  public reactionCreate = new ReactionCreateMutation(this.request).fetch;
  public reactionDelete = new ReactionDeleteMutation(this.request).fetch;
  public createCsvExportReport = new CreateCsvExportReportMutation(this.request).fetch;
  public subscriptionSessionCreate = new SubscriptionSessionCreateMutation(this.request).fetch;
  public subscriptionUpdateSessionCreate = new SubscriptionUpdateSessionCreateMutation(this.request).fetch;
  public subscriptionUpdate = new SubscriptionUpdateMutation(this.request).fetch;
  public subscriptionUpgrade = new SubscriptionUpgradeMutation(this.request).fetch;
  public subscriptionArchive = new SubscriptionArchiveMutation(this.request).fetch;
  public teamMembershipCreate = new TeamMembershipCreateMutation(this.request).fetch;
  public teamMembershipDelete = new TeamMembershipDeleteMutation(this.request).fetch;
  public teamCreate = new TeamCreateMutation(this.request).fetch;
  public teamUpdate = new TeamUpdateMutation(this.request).fetch;
  public teamArchive = new TeamArchiveMutation(this.request).fetch;
  public teamDelete = new TeamDeleteMutation(this.request).fetch;
  public templateCreate = new TemplateCreateMutation(this.request).fetch;
  public templateUpdate = new TemplateUpdateMutation(this.request).fetch;
  public templateDelete = new TemplateDeleteMutation(this.request).fetch;
  public userSettingsUpdate = new UserSettingsUpdateMutation(this.request).fetch;
  public userSettingsFlagIncrement = new UserSettingsFlagIncrementMutation(this.request).fetch;
  public userSettingsFlagsReset = new UserSettingsFlagsResetMutation(this.request).fetch;
  public userFlagUpdate = new UserFlagUpdateMutation(this.request).fetch;
  public userSubscribeToNewsletter = new UserSubscribeToNewsletterMutation(this.request).fetch;
  public viewPreferencesCreate = new ViewPreferencesCreateMutation(this.request).fetch;
  public viewPreferencesUpdate = new ViewPreferencesUpdateMutation(this.request).fetch;
  public viewPreferencesDelete = new ViewPreferencesDeleteMutation(this.request).fetch;
  public webhookCreate = new WebhookCreateMutation(this.request).fetch;
  public webhookUpdate = new WebhookUpdateMutation(this.request).fetch;
  public webhookDelete = new WebhookDeleteMutation(this.request).fetch;
  public workflowStateCreate = new WorkflowStateCreateMutation(this.request).fetch;
  public workflowStateUpdate = new WorkflowStateUpdateMutation(this.request).fetch;
  public workflowStateArchive = new WorkflowStateArchiveMutation(this.request).fetch;
}
