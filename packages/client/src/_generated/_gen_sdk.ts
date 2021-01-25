/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocumentNode } from "graphql";
import * as D from "./_gen_documents";

/** The function for calling the graphql client */
export type Request = <Response, Variables>(doc: DocumentNode, variables?: Variables) => Promise<Response>;

/**
 * Base class to provide a request function
 *
 * @param request - function to call the graphql client
 */
class LinearRequest {
  protected _request: Request;

  public constructor(request: Request) {
    this._request = request;
  }
}

/** Fetch return type wrapped in a promise */
type Fetch<Response> = Promise<Response | undefined>;

/**
 * Variables required for pagination
 * Follows the Relay spec
 */
type ConnectionVariables = { after?: string; before?: string };

/**
 * Abstract class for connection models containing a list of nodes and pagination information
 * Follows the Relay spec
 */
abstract class Connection<Node> extends LinearRequest {
  public pageInfo?: PageInfo;
  public nodes?: Node[];
}

/**
 * The base connection class to provide pagination
 * Follows the Relay spec
 *
 * @param request - function to call the graphql client
 * @param fetch - Function to refetch the connection given different pagination variables
 * @param nodes - The list of models to initialize the connection
 * @param pageInfo - The pagination information to initialize the connection
 */
class LinearConnection<Node> extends Connection<Node> {
  private _fetch: (variables?: ConnectionVariables) => Fetch<Connection<Node>>;

  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<Node>>,
    nodes?: Node[],
    pageInfo?: PageInfo
  ) {
    super(request);
    this._fetch = fetch;
    this.nodes = nodes;
    this.pageInfo = pageInfo;
  }

  /** Add nodes to the end of the existing nodes */
  private _appendNodes(nodes?: Node[]) {
    this.nodes = nodes ? [...(this.nodes ?? []), ...nodes] : this.nodes;
  }

  /** Add nodes to the start of the existing nodes */
  private _prependNodes(nodes?: Node[]) {
    this.nodes = nodes ? [...nodes, ...(this.nodes ?? [])] : this.nodes;
  }

  /** Update the pagination end cursor */
  private _appendPageInfo(pageInfo?: PageInfo) {
    if (this.pageInfo) {
      this.pageInfo.endCursor = pageInfo?.endCursor ?? this.pageInfo.startCursor;
      this.pageInfo.hasNextPage = pageInfo?.hasNextPage ?? this.pageInfo.hasNextPage;
    }
  }

  /** Update the pagination start cursor */
  private _prependPageInfo(pageInfo?: PageInfo) {
    if (this.pageInfo) {
      this.pageInfo.startCursor = pageInfo?.startCursor ?? this.pageInfo.startCursor;
      this.pageInfo.hasPreviousPage = pageInfo?.hasPreviousPage ?? this.pageInfo.hasPreviousPage;
    }
  }

  /** Fetch the next page of results */
  public get fetchNext(): Promise<this> {
    return this.pageInfo?.hasNextPage
      ? this._fetch({ after: this.pageInfo?.endCursor }).then(response => {
          this._appendNodes(response?.nodes);
          this._appendPageInfo(response?.pageInfo);
          return this;
        })
      : Promise.resolve(this);
  }

  /** Fetch the previous page of results */
  public get fetchPrevious(): Promise<this> {
    return this.pageInfo?.hasPreviousPage
      ? this._fetch({ before: this.pageInfo?.startCursor }).then(response => {
          this._prependNodes(response?.nodes);
          this._prependPageInfo(response?.pageInfo);
          return this;
        })
      : Promise.resolve(this);
  }
}
/**
 * UserConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this UserConnection model
 * @param data - UserConnection response data
 */
class UserConnection extends LinearConnection<User> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<User>>,
    data: D.UserConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new User(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * A user that has access to the the resources of an organization.
 *
 * @param request - function to call the graphql client
 * @param data - D.UserFragment response data
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
  /** Settings for the user. Only available for the authenticated user. */
  public get settings(): Fetch<UserSettings> {
    return new UserSettingsQuery(this._request).fetch();
  }
  /** Organization in which the user belongs to. */
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** Issues assigned to the user. */
  public assignedIssues(variables?: Omit<D.User_AssignedIssuesQueryVariables, "id">) {
    return this.id ? new User_AssignedIssuesQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Issues created by the user. */
  public createdIssues(variables?: Omit<D.User_CreatedIssuesQueryVariables, "id">) {
    return this.id ? new User_CreatedIssuesQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Memberships associated with the user. */
  public teamMemberships(variables?: Omit<D.User_TeamMembershipsQueryVariables, "id">) {
    return this.id ? new User_TeamMembershipsQuery(this._request, this.id).fetch(variables) : undefined;
  }
}
/**
 * The settings of a user as a JSON object.
 *
 * @param request - function to call the graphql client
 * @param data - D.UserSettingsFragment response data
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
  public get user(): Fetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
}
/**
 * IssueConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this IssueConnection model
 * @param data - IssueConnection response data
 */
class IssueConnection extends LinearConnection<Issue> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<Issue>>,
    data: D.IssueConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new Issue(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * An issue.
 *
 * @param request - function to call the graphql client
 * @param data - D.IssueFragment response data
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
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The cycle that the issue is associated with. */
  public get cycle(): Fetch<Cycle> | undefined {
    return this._cycle?.id ? new CycleQuery(this._request).fetch(this._cycle?.id) : undefined;
  }
  /** The workflow state that the issue is associated with. */
  public get state(): Fetch<WorkflowState> | undefined {
    return this._state?.id ? new WorkflowStateQuery(this._request).fetch(this._state?.id) : undefined;
  }
  /** The user to whom the issue is assigned to. */
  public get assignee(): Fetch<User> | undefined {
    return this._assignee?.id ? new UserQuery(this._request).fetch(this._assignee?.id) : undefined;
  }
  /** The parent of the issue. */
  public get parent(): Fetch<Issue> | undefined {
    return this._parent?.id ? new IssueQuery(this._request).fetch(this._parent?.id) : undefined;
  }
  /** The project that the issue is associated with. */
  public get project(): Fetch<Project> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
  /** The user who created the issue. */
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** Users who are subscribed to the issue. */
  public subscribers(variables?: Omit<D.Issue_SubscribersQueryVariables, "id">) {
    return this.id ? new Issue_SubscribersQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Children of the issue. */
  public children(variables?: Omit<D.Issue_ChildrenQueryVariables, "id">) {
    return this.id ? new Issue_ChildrenQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Comments associated with the issue. */
  public comments(variables?: Omit<D.Issue_CommentsQueryVariables, "id">) {
    return this.id ? new Issue_CommentsQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** History entries associated with the issue. */
  public history(variables?: Omit<D.Issue_HistoryQueryVariables, "id">) {
    return this.id ? new Issue_HistoryQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Labels associated with this issue. */
  public labels(variables?: Omit<D.Issue_LabelsQueryVariables, "id">) {
    return this.id ? new Issue_LabelsQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Integration resources for this issue. */
  public integrationResources(variables?: Omit<D.Issue_IntegrationResourcesQueryVariables, "id">) {
    return this.id ? new Issue_IntegrationResourcesQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Relations associated with this issue. */
  public relations(variables?: Omit<D.Issue_RelationsQueryVariables, "id">) {
    return this.id ? new Issue_RelationsQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Inverse relations associated with this issue. */
  public inverseRelations(variables?: Omit<D.Issue_InverseRelationsQueryVariables, "id">) {
    return this.id ? new Issue_InverseRelationsQuery(this._request, this.id).fetch(variables) : undefined;
  }
}
/**
 * An organizational unit that contains issues.
 *
 * @param request - function to call the graphql client
 * @param data - D.TeamFragment response data
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
  public get draftWorkflowState(): Fetch<WorkflowState> | undefined {
    return this._draftWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._draftWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when a PR has been opened. */
  public get startWorkflowState(): Fetch<WorkflowState> | undefined {
    return this._startWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._startWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when a review has been requested for the PR. */
  public get reviewWorkflowState(): Fetch<WorkflowState> | undefined {
    return this._reviewWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._reviewWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when a PR has been merged. */
  public get mergeWorkflowState(): Fetch<WorkflowState> | undefined {
    return this._mergeWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._mergeWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when they are marked as a duplicate of another issue. Defaults to the first canceled state. */
  public get markedAsDuplicateWorkflowState(): Fetch<WorkflowState> | undefined {
    return this._markedAsDuplicateWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._markedAsDuplicateWorkflowState?.id)
      : undefined;
  }
  /** Team's currently active cycle. */
  public get activeCycle(): Fetch<Cycle> | undefined {
    return this._activeCycle?.id ? new CycleQuery(this._request).fetch(this._activeCycle?.id) : undefined;
  }
  /** The organization that the team is associated with. */
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** Issues associated with the team. */
  public issues(variables?: Omit<D.Team_IssuesQueryVariables, "id">) {
    return this.id ? new Team_IssuesQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Cycles associated with the team. */
  public cycles(variables?: Omit<D.Team_CyclesQueryVariables, "id">) {
    return this.id ? new Team_CyclesQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Memberships associated with the team. */
  public memberships(variables?: Omit<D.Team_MembershipsQueryVariables, "id">) {
    return this.id ? new Team_MembershipsQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Projects associated with the team. */
  public projects(variables?: Omit<D.Team_ProjectsQueryVariables, "id">) {
    return this.id ? new Team_ProjectsQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** The states that define the workflow associated with the team. */
  public states(variables?: Omit<D.Team_StatesQueryVariables, "id">) {
    return this.id ? new Team_StatesQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Templates associated with the team. */
  public templates(variables?: Omit<D.Team_TemplatesQueryVariables, "id">) {
    return this.id ? new Team_TemplatesQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Labels associated with the team. */
  public labels(variables?: Omit<D.Team_LabelsQueryVariables, "id">) {
    return this.id ? new Team_LabelsQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Webhooks associated with the team. */
  public webhooks(variables?: Omit<D.Team_WebhooksQueryVariables, "id">) {
    return this.id ? new Team_WebhooksQuery(this._request, this.id).fetch(variables) : undefined;
  }
}
/**
 * A state in a team workflow.
 *
 * @param request - function to call the graphql client
 * @param data - D.WorkflowStateFragment response data
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
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** Issues belonging in this state. */
  public issues(variables?: Omit<D.WorkflowState_IssuesQueryVariables, "id">) {
    return this.id ? new WorkflowState_IssuesQuery(this._request, this.id).fetch(variables) : undefined;
  }
}
/**
 * CycleConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this CycleConnection model
 * @param data - CycleConnection response data
 */
class CycleConnection extends LinearConnection<Cycle> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<Cycle>>,
    data: D.CycleConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new Cycle(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * A set of issues to be resolved in a specified amount of time.
 *
 * @param request - function to call the graphql client
 * @param data - D.CycleFragment response data
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
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** Issues associated with the cycle. */
  public issues(variables?: Omit<D.Cycle_IssuesQueryVariables, "id">) {
    return this.id ? new Cycle_IssuesQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Issues that weren't completed when the cycle was closed. */
  public uncompletedIssuesUponClose(variables?: Omit<D.Cycle_UncompletedIssuesUponCloseQueryVariables, "id">) {
    return this.id ? new Cycle_UncompletedIssuesUponCloseQuery(this._request, this.id).fetch(variables) : undefined;
  }
}
/**
 * PageInfo model
 *
 * @param request - function to call the graphql client
 * @param data - D.PageInfoFragment response data
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
 * @param fetch - function to trigger a refetch of this TeamMembershipConnection model
 * @param data - TeamMembershipConnection response data
 */
class TeamMembershipConnection extends LinearConnection<TeamMembership> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<TeamMembership>>,
    data: D.TeamMembershipConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new TeamMembership(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * Defines the membership of a user to a team.
 *
 * @param request - function to call the graphql client
 * @param data - D.TeamMembershipFragment response data
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
  public get user(): Fetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
  /** The team that the membership is associated with. */
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
}
/**
 * ProjectConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this ProjectConnection model
 * @param data - ProjectConnection response data
 */
class ProjectConnection extends LinearConnection<Project> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<Project>>,
    data: D.ProjectConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new Project(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * A project.
 *
 * @param request - function to call the graphql client
 * @param data - D.ProjectFragment response data
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
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The project lead. */
  public get lead(): Fetch<User> | undefined {
    return this._lead?.id ? new UserQuery(this._request).fetch(this._lead?.id) : undefined;
  }
  /** The milestone that this project is associated with. */
  public get milestone(): Fetch<Milestone> | undefined {
    return this._milestone?.id ? new MilestoneQuery(this._request).fetch(this._milestone?.id) : undefined;
  }
  /** Teams associated with this project. */
  public teams(variables?: Omit<D.Project_TeamsQueryVariables, "id">) {
    return this.id ? new Project_TeamsQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Users that are members of the project. */
  public members(variables?: Omit<D.Project_MembersQueryVariables, "id">) {
    return this.id ? new Project_MembersQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Issues associated with the project. */
  public issues(variables?: Omit<D.Project_IssuesQueryVariables, "id">) {
    return this.id ? new Project_IssuesQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Links associated with the project. */
  public links(variables?: Omit<D.Project_LinksQueryVariables, "id">) {
    return this.id ? new Project_LinksQuery(this._request, this.id).fetch(variables) : undefined;
  }
}
/**
 * A milestone that contains projects.
 *
 * @param request - function to call the graphql client
 * @param data - D.MilestoneFragment response data
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
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** Projects associated with the milestone. */
  public projects(variables?: Omit<D.Milestone_ProjectsQueryVariables, "id">) {
    return this.id ? new Milestone_ProjectsQuery(this._request, this.id).fetch(variables) : undefined;
  }
}
/**
 * An organization. Organizations are root-level objects that contain user accounts and teams.
 *
 * @param request - function to call the graphql client
 * @param data - D.OrganizationFragment response data
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
  public get subscription(): Fetch<Subscription> {
    return new SubscriptionQuery(this._request).fetch();
  }
  /** Users associated with the organization. */
  public users(variables?: D.Organization_UsersQueryVariables) {
    return new Organization_UsersQuery(this._request).fetch(variables);
  }
  /** Teams associated with the organization. */
  public teams(variables?: D.Organization_TeamsQueryVariables) {
    return new Organization_TeamsQuery(this._request).fetch(variables);
  }
  /** Milestones associated with the organization. */
  public milestones(variables?: D.Organization_MilestonesQueryVariables) {
    return new Organization_MilestonesQuery(this._request).fetch(variables);
  }
  /** Integrations associated with the organization. */
  public integrations(variables?: D.Organization_IntegrationsQueryVariables) {
    return new Organization_IntegrationsQuery(this._request).fetch(variables);
  }
}
/**
 * TeamConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this TeamConnection model
 * @param data - TeamConnection response data
 */
class TeamConnection extends LinearConnection<Team> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<Team>>,
    data: D.TeamConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new Team(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * MilestoneConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this MilestoneConnection model
 * @param data - MilestoneConnection response data
 */
class MilestoneConnection extends LinearConnection<Milestone> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<Milestone>>,
    data: D.MilestoneConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new Milestone(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * IntegrationConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this IntegrationConnection model
 * @param data - IntegrationConnection response data
 */
class IntegrationConnection extends LinearConnection<Integration> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<Integration>>,
    data: D.IntegrationConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new Integration(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * An integration with an external service.
 *
 * @param request - function to call the graphql client
 * @param data - D.IntegrationFragment response data
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
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** The team that the integration is associated with. */
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The user that added the integration. */
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** Settings related to the integration. */
  public get settings() {
    return this.id ? new Integration_SettingsQuery(this._request, this.id).fetch() : undefined;
  }
}
/**
 * The integration resource's settings
 *
 * @param request - function to call the graphql client
 * @param data - D.IntegrationSettingsFragment response data
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
 * @param data - D.SlackPostSettingsFragment response data
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
 * @param data - D.GoogleSheetsSettingsFragment response data
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
 * @param data - D.SentrySettingsFragment response data
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
 * @param data - D.SubscriptionFragment response data
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
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The organization that the subscription is associated with. */
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
}
/**
 * ProjectLinkConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this ProjectLinkConnection model
 * @param data - ProjectLinkConnection response data
 */
class ProjectLinkConnection extends LinearConnection<ProjectLink> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<ProjectLink>>,
    data: D.ProjectLinkConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new ProjectLink(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * An external link for a project.
 *
 * @param request - function to call the graphql client
 * @param data - D.ProjectLinkFragment response data
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
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The project that the link is associated with. */
  public get project(): Fetch<Project> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
}
/**
 * WorkflowStateConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this WorkflowStateConnection model
 * @param data - WorkflowStateConnection response data
 */
class WorkflowStateConnection extends LinearConnection<WorkflowState> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<WorkflowState>>,
    data: D.WorkflowStateConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new WorkflowState(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * TemplateConnection model
 *
 * @param request - function to call the graphql client
 * @param data - D.TemplateConnectionFragment response data
 */
class TemplateConnection extends LinearRequest {
  public constructor(request: Request, data: D.TemplateConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
  }

  public pageInfo?: PageInfo;
  public get nodes(): Fetch<Template[]> {
    return new TemplatesQuery(this._request).fetch();
  }
}
/**
 * A template object used for creating new issues faster.
 *
 * @param request - function to call the graphql client
 * @param data - D.TemplateFragment response data
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
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The user who created the template. */
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}
/**
 * IssueLabelConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this IssueLabelConnection model
 * @param data - IssueLabelConnection response data
 */
class IssueLabelConnection extends LinearConnection<IssueLabel> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<IssueLabel>>,
    data: D.IssueLabelConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new IssueLabel(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * Labels that can be associated with issues.
 *
 * @param request - function to call the graphql client
 * @param data - D.IssueLabelFragment response data
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
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The user who created the label. */
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** Issues associated with the label. */
  public issues(variables?: Omit<D.IssueLabel_IssuesQueryVariables, "id">) {
    return this.id ? new IssueLabel_IssuesQuery(this._request, this.id).fetch(variables) : undefined;
  }
}
/**
 * WebhookConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this WebhookConnection model
 * @param data - WebhookConnection response data
 */
class WebhookConnection extends LinearConnection<Webhook> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<Webhook>>,
    data: D.WebhookConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new Webhook(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * A webhook used to send HTTP notifications over data updates
 *
 * @param request - function to call the graphql client
 * @param data - D.WebhookFragment response data
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
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The user who created the webhook. */
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}
/**
 * CommentConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this CommentConnection model
 * @param data - CommentConnection response data
 */
class CommentConnection extends LinearConnection<Comment> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<Comment>>,
    data: D.CommentConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new Comment(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * A comment associated with an issue.
 *
 * @param request - function to call the graphql client
 * @param data - D.CommentFragment response data
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
  public get user(): Fetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
  /** The issue that the comment is associated with. */
  public get issue(): Fetch<Issue> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
}
/**
 * IssueHistoryConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this IssueHistoryConnection model
 * @param data - IssueHistoryConnection response data
 */
class IssueHistoryConnection extends LinearConnection<IssueHistory> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<IssueHistory>>,
    data: D.IssueHistoryConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new IssueHistory(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * A record of changes to an issue.
 *
 * @param request - function to call the graphql client
 * @param data - D.IssueHistoryFragment response data
 */
class IssueHistory extends LinearRequest {
  private _issue?: D.IssueHistoryFragment["issue"];
  private _actor?: D.IssueHistoryFragment["actor"];
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
    this.source = data.source ?? undefined;
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
  /** Information about the integration or application which created this history entry. */
  public source?: D.Scalars["JSONObject"];
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
  public get issue(): Fetch<Issue> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
  /** The user who made these changes. If null, possibly means that the change made by an integration. */
  public get actor(): Fetch<User> | undefined {
    return this._actor?.id ? new UserQuery(this._request).fetch(this._actor?.id) : undefined;
  }
  /** The user from whom the issue was re-assigned from. */
  public get fromAssignee(): Fetch<User> | undefined {
    return this._fromAssignee?.id ? new UserQuery(this._request).fetch(this._fromAssignee?.id) : undefined;
  }
  /** The user to whom the issue was assigned to. */
  public get toAssignee(): Fetch<User> | undefined {
    return this._toAssignee?.id ? new UserQuery(this._request).fetch(this._toAssignee?.id) : undefined;
  }
  /** The team from which the issue was moved from. */
  public get fromTeam(): Fetch<Team> | undefined {
    return this._fromTeam?.id ? new TeamQuery(this._request).fetch(this._fromTeam?.id) : undefined;
  }
  /** The team to which the issue was moved to. */
  public get toTeam(): Fetch<Team> | undefined {
    return this._toTeam?.id ? new TeamQuery(this._request).fetch(this._toTeam?.id) : undefined;
  }
  /** The previous parent of the issue. */
  public get fromParent(): Fetch<Issue> | undefined {
    return this._fromParent?.id ? new IssueQuery(this._request).fetch(this._fromParent?.id) : undefined;
  }
  /** The new parent of the issue. */
  public get toParent(): Fetch<Issue> | undefined {
    return this._toParent?.id ? new IssueQuery(this._request).fetch(this._toParent?.id) : undefined;
  }
  /** The previous workflow state of the issue. */
  public get fromState(): Fetch<WorkflowState> | undefined {
    return this._fromState?.id ? new WorkflowStateQuery(this._request).fetch(this._fromState?.id) : undefined;
  }
  /** The new workflow state of the issue. */
  public get toState(): Fetch<WorkflowState> | undefined {
    return this._toState?.id ? new WorkflowStateQuery(this._request).fetch(this._toState?.id) : undefined;
  }
  /** The previous cycle of the issue. */
  public get fromCycle(): Fetch<Cycle> | undefined {
    return this._fromCycle?.id ? new CycleQuery(this._request).fetch(this._fromCycle?.id) : undefined;
  }
  /** The new cycle of the issue. */
  public get toCycle(): Fetch<Cycle> | undefined {
    return this._toCycle?.id ? new CycleQuery(this._request).fetch(this._toCycle?.id) : undefined;
  }
  /** The previous project of the issue. */
  public get fromProject(): Fetch<Project> | undefined {
    return this._fromProject?.id ? new ProjectQuery(this._request).fetch(this._fromProject?.id) : undefined;
  }
  /** The new project of the issue. */
  public get toProject(): Fetch<Project> | undefined {
    return this._toProject?.id ? new ProjectQuery(this._request).fetch(this._toProject?.id) : undefined;
  }
}
/**
 * IntegrationResourceConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this IntegrationResourceConnection model
 * @param data - IntegrationResourceConnection response data
 */
class IntegrationResourceConnection extends LinearConnection<IntegrationResource> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<IntegrationResource>>,
    data: D.IntegrationResourceConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new IntegrationResource(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * An integration resource created by an external service.
 *
 * @param request - function to call the graphql client
 * @param data - D.IntegrationResourceFragment response data
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
  public get integration(): Fetch<Integration> | undefined {
    return this._integration?.id ? new IntegrationQuery(this._request).fetch(this._integration?.id) : undefined;
  }
  /** The issue that the resource is associated with. */
  public get issue(): Fetch<Issue> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
  /** Detailed information about the external resource. */
  public get data() {
    return this.id ? new IntegrationResource_DataQuery(this._request, this.id).fetch() : undefined;
  }
  /** Pull request information for GitHub pull requests and GitLab merge requests. */
  public get pullRequest() {
    return this.id ? new IntegrationResource_PullRequestQuery(this._request, this.id).fetch() : undefined;
  }
}
/**
 * Integration resource's payload
 *
 * @param request - function to call the graphql client
 * @param data - D.IntegrationResourceDataFragment response data
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
 * @param data - D.PullRequestPayloadFragment response data
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
 * @param data - D.CommitPayloadFragment response data
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
 * @param data - D.SentryIssuePayloadFragment response data
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
 * @param fetch - function to trigger a refetch of this IssueRelationConnection model
 * @param data - IssueRelationConnection response data
 */
class IssueRelationConnection extends LinearConnection<IssueRelation> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<IssueRelation>>,
    data: D.IssueRelationConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new IssueRelation(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * A relation between two issues.
 *
 * @param request - function to call the graphql client
 * @param data - D.IssueRelationFragment response data
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
  public get issue(): Fetch<Issue> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
  /** The related issue. */
  public get relatedIssue(): Fetch<Issue> | undefined {
    return this._relatedIssue?.id ? new IssueQuery(this._request).fetch(this._relatedIssue?.id) : undefined;
  }
}
/**
 * OrganizationExistsPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.OrganizationExistsPayloadFragment response data
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
 * @param data - D.SyncResponseFragment response data
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
 * @param data - D.ArchiveResponseFragment response data
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
 * @param data - D.UserAccountAdminPrivilegedFragment response data
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
 * @param data - D.UserAdminPrivilegedFragment response data
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
  /** Settings for the user. Only available for the authenticated user. */
  public get settings(): Fetch<UserSettings> {
    return new UserSettingsQuery(this._request).fetch();
  }
}
/**
 * An organization. Super user required.
 *
 * @param request - function to call the graphql client
 * @param data - D.OrganizationAdminPrivilegedFragment response data
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
 * @param data - D.SubscriptionAdminPrivilegedFragment response data
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
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The organization that the subscription is associated with. */
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
}
/**
 * ApiKeyConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this ApiKeyConnection model
 * @param data - ApiKeyConnection response data
 */
class ApiKeyConnection extends LinearConnection<ApiKey> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<ApiKey>>,
    data: D.ApiKeyConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new ApiKey(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * An API key. Grants access to the user's resources.
 *
 * @param request - function to call the graphql client
 * @param data - D.ApiKeyFragment response data
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
 * @param data - D.UserAuthorizedApplicationFragment response data
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
 * @param data - D.AuthorizedApplicationFragment response data
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
 * @param data - D.AuthResolverResponseFragment response data
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
 * @param data - D.SsoUrlFromEmailResponseFragment response data
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
 * @param data - D.BillingDetailsPayloadFragment response data
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
 * @param data - D.InvoiceFragment response data
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
 * @param data - D.CardFragment response data
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
 * @param data - D.CollaborationDocumentUpdatePayloadFragment response data
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
 * @param data - D.StepsResponseFragment response data
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
 * CustomViewConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this CustomViewConnection model
 * @param data - CustomViewConnection response data
 */
class CustomViewConnection extends LinearConnection<CustomView> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<CustomView>>,
    data: D.CustomViewConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new CustomView(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * A custom view that has been saved by a user.
 *
 * @param request - function to call the graphql client
 * @param data - D.CustomViewFragment response data
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
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** The team associated with the custom view. */
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The user who created the custom view. */
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}
/**
 * EmojiConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this EmojiConnection model
 * @param data - EmojiConnection response data
 */
class EmojiConnection extends LinearConnection<Emoji> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<Emoji>>,
    data: D.EmojiConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new Emoji(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * A custom emoji.
 *
 * @param request - function to call the graphql client
 * @param data - D.EmojiFragment response data
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
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The organization that the emoji belongs to. */
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
}
/**
 * FavoriteConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this FavoriteConnection model
 * @param data - FavoriteConnection response data
 */
class FavoriteConnection extends LinearConnection<Favorite> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<Favorite>>,
    data: D.FavoriteConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new Favorite(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * User favorites presented in the sidebar.
 *
 * @param request - function to call the graphql client
 * @param data - D.FavoriteFragment response data
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
  public get user(): Fetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
  /** Favorited issue. */
  public get issue(): Fetch<Issue> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
  /** Favorited project. */
  public get project(): Fetch<Project> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
  /** Favorited project team. */
  public get projectTeam(): Fetch<Project> | undefined {
    return this._projectTeam?.id ? new ProjectQuery(this._request).fetch(this._projectTeam?.id) : undefined;
  }
  /** Favorited cycle. */
  public get cycle(): Fetch<Cycle> | undefined {
    return this._cycle?.id ? new CycleQuery(this._request).fetch(this._cycle?.id) : undefined;
  }
  /** Favorited issue label. */
  public get label(): Fetch<IssueLabel> | undefined {
    return this._label?.id ? new IssueLabelQuery(this._request).fetch(this._label?.id) : undefined;
  }
}
/**
 * FigmaEmbedPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.FigmaEmbedPayloadFragment response data
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
 * @param data - D.FigmaEmbedFragment response data
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
 * @param data - D.InvitePagePayloadFragment response data
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
 * @param data - D.InviteDataFragment response data
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
 * @param fetch - function to trigger a refetch of this NotificationConnection model
 * @param data - NotificationConnection response data
 */
class NotificationConnection extends LinearConnection<Notification> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<Notification>>,
    data: D.NotificationConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new Notification(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * A notification sent to a user.
 *
 * @param request - function to call the graphql client
 * @param data - D.NotificationFragment response data
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
  public get user(): Fetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
  /** The issue that the notification is associated with. */
  public get issue(): Fetch<Issue> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
  /** The team which the notification is associated with. */
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The comment which the notification is associated with. */
  public get comment(): Fetch<Comment> | undefined {
    return this._comment?.id ? new CommentQuery(this._request).fetch(this._comment?.id) : undefined;
  }
}
/**
 * NotificationSubscriptionConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this NotificationSubscriptionConnection model
 * @param data - NotificationSubscriptionConnection response data
 */
class NotificationSubscriptionConnection extends LinearConnection<NotificationSubscription> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<NotificationSubscription>>,
    data: D.NotificationSubscriptionConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new NotificationSubscription(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * Notification subscriptions for models.
 *
 * @param request - function to call the graphql client
 * @param data - D.NotificationSubscriptionFragment response data
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
  public get user(): Fetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
  /** Subscribed team. */
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** Subscribed project. */
  public get project(): Fetch<Project> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
}
/**
 * OrganizationInviteConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this OrganizationInviteConnection model
 * @param data - OrganizationInviteConnection response data
 */
class OrganizationInviteConnection extends LinearConnection<OrganizationInvite> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<OrganizationInvite>>,
    data: D.OrganizationInviteConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new OrganizationInvite(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * An invitation to the organization that has been sent via email.
 *
 * @param request - function to call the graphql client
 * @param data - D.OrganizationInviteFragment response data
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
  public get inviter(): Fetch<User> | undefined {
    return this._inviter?.id ? new UserQuery(this._request).fetch(this._inviter?.id) : undefined;
  }
  /** The user who has accepted the invite. Null, if the invite hasn't been accepted. */
  public get invitee(): Fetch<User> | undefined {
    return this._invitee?.id ? new UserQuery(this._request).fetch(this._invitee?.id) : undefined;
  }
  /** The organization that the invite is associated with. */
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** undefined */
  public issues(variables?: Omit<D.OrganizationInvite_IssuesQueryVariables, "id">) {
    return this.id ? new OrganizationInvite_IssuesQuery(this._request, this.id).fetch(variables) : undefined;
  }
}
/**
 * PushSubscriptionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.PushSubscriptionPayloadFragment response data
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
 * ReactionConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this ReactionConnection model
 * @param data - ReactionConnection response data
 */
class ReactionConnection extends LinearConnection<Reaction> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<Reaction>>,
    data: D.ReactionConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new Reaction(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * A reaction associated with a comment.
 *
 * @param request - function to call the graphql client
 * @param data - D.ReactionFragment response data
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
  public get user(): Fetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
  /** The comment that the reaction is associated with. */
  public get comment(): Fetch<Comment> | undefined {
    return this._comment?.id ? new CommentQuery(this._request).fetch(this._comment?.id) : undefined;
  }
}
/**
 * UserPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.UserPayloadFragment response data
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
  public get user(): Fetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
}
/**
 * UserAdminPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.UserAdminPayloadFragment response data
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
 * @param data - D.OrganizationPayloadFragment response data
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
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
}
/**
 * OrganizationDeletePayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.OrganizationDeletePayloadFragment response data
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
 * @param data - D.AdminIntegrationPayloadFragment response data
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
 * @param data - D.OrganizationAccessPayloadFragment response data
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
 * @param data - D.OrganizationSamlConfigurePayloadFragment response data
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
 * @param data - D.SamlConfigurationFragment response data
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
 * @param data - D.AdminCommandPayloadFragment response data
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
 * Operation response.
 *
 * @param request - function to call the graphql client
 * @param data - D.AdminResponseFragment response data
 */
class AdminResponse extends LinearRequest {
  public constructor(request: Request, data: D.AdminResponseFragment) {
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
 * @param data - D.EventPayloadFragment response data
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
 * @param data - D.ApiKeyPayloadFragment response data
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
 * @param data - D.ArchivePayloadFragment response data
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
 * @param data - D.EmailUserAccountAuthChallengeResponseFragment response data
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
 * @param data - D.CreateOrJoinOrganizationResponseFragment response data
 */
class CreateOrJoinOrganizationResponse extends LinearRequest {
  private _user?: D.CreateOrJoinOrganizationResponseFragment["user"];

  public constructor(request: Request, data: D.CreateOrJoinOrganizationResponseFragment) {
    super(request);
    this._user = data.user ?? undefined;
  }

  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  public get user(): Fetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
}
/**
 * BillingEmailPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.BillingEmailPayloadFragment response data
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
 * @param data - D.CommentPayloadFragment response data
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
  public get comment(): Fetch<Comment> | undefined {
    return this._comment?.id ? new CommentQuery(this._request).fetch(this._comment?.id) : undefined;
  }
}
/**
 * ContactPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.ContactPayloadFragment response data
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
 * @param data - D.CustomViewPayloadFragment response data
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
  public get customView(): Fetch<CustomView> | undefined {
    return this._customView?.id ? new CustomViewQuery(this._request).fetch(this._customView?.id) : undefined;
  }
}
/**
 * CyclePayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.CyclePayloadFragment response data
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
  public get cycle(): Fetch<Cycle> | undefined {
    return this._cycle?.id ? new CycleQuery(this._request).fetch(this._cycle?.id) : undefined;
  }
}
/**
 * DebugPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.DebugPayloadFragment response data
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
 * @param data - D.EmailUnsubscribePayloadFragment response data
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
 * @param data - D.EmojiPayloadFragment response data
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
  public get emoji(): Fetch<Emoji> | undefined {
    return this._emoji?.id ? new EmojiQuery(this._request).fetch(this._emoji?.id) : undefined;
  }
}
/**
 * FavoritePayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.FavoritePayloadFragment response data
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
  public get favorite(): Fetch<Favorite> | undefined {
    return this._favorite?.id ? new FavoriteQuery(this._request).fetch(this._favorite?.id) : undefined;
  }
}
/**
 * FeedbackPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.FeedbackPayloadFragment response data
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
 * @param data - D.UploadPayloadFragment response data
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
 * @param data - D.UploadFileFragment response data
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
 * @param data - D.UploadFileHeaderFragment response data
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
 * @param data - D.ImageUploadFromUrlPayloadFragment response data
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
 * @param data - D.IntegrationPayloadFragment response data
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
  public get integration(): Fetch<Integration> | undefined {
    return this._integration?.id ? new IntegrationQuery(this._request).fetch(this._integration?.id) : undefined;
  }
}
/**
 * IssueLabelPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.IssueLabelPayloadFragment response data
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
  public get issueLabel(): Fetch<IssueLabel> | undefined {
    return this._issueLabel?.id ? new IssueLabelQuery(this._request).fetch(this._issueLabel?.id) : undefined;
  }
}
/**
 * IssueRelationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.IssueRelationPayloadFragment response data
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
  public get issueRelation(): Fetch<IssueRelation> | undefined {
    return this._issueRelation?.id ? new IssueRelationQuery(this._request).fetch(this._issueRelation?.id) : undefined;
  }
}
/**
 * IssuePayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.IssuePayloadFragment response data
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
  public get issue(): Fetch<Issue> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
}
/**
 * MilestonePayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.MilestonePayloadFragment response data
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
  public get milestone(): Fetch<Milestone> | undefined {
    return this._milestone?.id ? new MilestoneQuery(this._request).fetch(this._milestone?.id) : undefined;
  }
}
/**
 * NotificationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.NotificationPayloadFragment response data
 */
class NotificationPayload extends LinearRequest {
  private _notification?: D.NotificationPayloadFragment["notification"];

  public constructor(request: Request, data: D.NotificationPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._notification = data.notification ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The notification that was created or updated. */
  public get notification(): Fetch<Notification> | undefined {
    return this._notification?.id ? new NotificationQuery(this._request).fetch(this._notification?.id) : undefined;
  }
}
/**
 * NotificationSubscriptionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.NotificationSubscriptionPayloadFragment response data
 */
class NotificationSubscriptionPayload extends LinearRequest {
  private _notificationSubscription?: D.NotificationSubscriptionPayloadFragment["notificationSubscription"];

  public constructor(request: Request, data: D.NotificationSubscriptionPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._notificationSubscription = data.notificationSubscription ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The notification subscription that was created or updated. */
  public get notificationSubscription(): Fetch<NotificationSubscription> | undefined {
    return this._notificationSubscription?.id
      ? new NotificationSubscriptionQuery(this._request).fetch(this._notificationSubscription?.id)
      : undefined;
  }
}
/**
 * OauthClientPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.OauthClientPayloadFragment response data
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
 * @param data - D.OauthClientFragment response data
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
 * @param data - D.RotateSecretPayloadFragment response data
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
 * @param data - D.OauthTokenRevokePayloadFragment response data
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
 * @param data - D.OrganizationDomainPayloadFragment response data
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
 * @param data - D.OrganizationDomainFragment response data
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
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}
/**
 * OrganizationInvitePayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.OrganizationInvitePayloadFragment response data
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
 * @param data - D.ProjectLinkPayloadFragment response data
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
  public get projectLink(): Fetch<ProjectLink> | undefined {
    return this._projectLink?.id ? new ProjectLinkQuery(this._request).fetch(this._projectLink?.id) : undefined;
  }
}
/**
 * ProjectPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.ProjectPayloadFragment response data
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
  public get project(): Fetch<Project> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
}
/**
 * ReactionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.ReactionPayloadFragment response data
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
  public get reaction(): Fetch<Reaction> | undefined {
    return this._reaction?.id ? new ReactionQuery(this._request).fetch(this._reaction?.id) : undefined;
  }
}
/**
 * CreateCsvExportReportPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.CreateCsvExportReportPayloadFragment response data
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
 * @param data - D.SubscriptionSessionPayloadFragment response data
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
 * @param data - D.SubscriptionPayloadFragment response data
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
  public get subscription(): Fetch<Subscription> {
    return new SubscriptionQuery(this._request).fetch();
  }
}
/**
 * TeamMembershipPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.TeamMembershipPayloadFragment response data
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
  public get teamMembership(): Fetch<TeamMembership> | undefined {
    return this._teamMembership?.id
      ? new TeamMembershipQuery(this._request).fetch(this._teamMembership?.id)
      : undefined;
  }
}
/**
 * TeamPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.TeamPayloadFragment response data
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
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
}
/**
 * TemplatePayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.TemplatePayloadFragment response data
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
  public get template(): Fetch<Template> | undefined {
    return this._template?.id ? new TemplateQuery(this._request).fetch(this._template?.id) : undefined;
  }
}
/**
 * UserSettingsPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.UserSettingsPayloadFragment response data
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
  public get userSettings(): Fetch<UserSettings> {
    return new UserSettingsQuery(this._request).fetch();
  }
}
/**
 * UserSettingsFlagPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.UserSettingsFlagPayloadFragment response data
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
 * @param data - D.UserSettingsFlagsResetPayloadFragment response data
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
 * @param data - D.UserSubscribeToNewsletterPayloadFragment response data
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
 * @param data - D.ViewPreferencesPayloadFragment response data
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
 * View preferences.
 *
 * @param request - function to call the graphql client
 * @param data - D.ViewPreferencesFragment response data
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
 * WebhookPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.WebhookPayloadFragment response data
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
  public get webhook(): Fetch<Webhook> | undefined {
    return this._webhook?.id ? new WebhookQuery(this._request).fetch(this._webhook?.id) : undefined;
  }
}
/**
 * WorkflowStatePayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.WorkflowStatePayloadFragment response data
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
  public get workflowState(): Fetch<WorkflowState> | undefined {
    return this._workflowState?.id ? new WorkflowStateQuery(this._request).fetch(this._workflowState?.id) : undefined;
  }
}
/**
 * SynchronizedPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.SynchronizedPayloadFragment response data
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
 * Collaborative editing steps for documents.
 *
 * @param request - function to call the graphql client
 * @param data - D.DocumentStepFragment response data
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
 * @param data - D.PushSubscriptionFragment response data
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
 * @param fetch - function to trigger a refetch of this PushSubscriptionConnection model
 * @param data - PushSubscriptionConnection response data
 */
class PushSubscriptionConnection extends LinearConnection<PushSubscription> {
  public constructor(
    request: Request,
    fetch: (variables?: ConnectionVariables) => Fetch<Connection<PushSubscription>>,
    data: D.PushSubscriptionConnectionFragment
  ) {
    super(
      request,
      fetch,
      data?.nodes ? data.nodes.map(node => new PushSubscription(this._request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * A user account.
 *
 * @param request - function to call the graphql client
 * @param data - D.UserAccountFragment response data
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
 * @param data - D.FileUploadFragment response data
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
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The organization the upload belongs to. */
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
}
/**
 * Public information of the OAuth application.
 *
 * @param request - function to call the graphql client
 * @param data - D.ApplicationFragment response data
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
 * @param data - D.OrganizationDomainSimplePayloadFragment response data
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
 * A fetchable Users Query
 *
 * @param request - function to call the graphql client
 */
class UsersQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Users query and return a UserConnection
   *
   * @param variables - variables to pass into the UsersQuery
   * @returns parsed response from UsersQuery
   */
  public async fetch(variables?: D.UsersQueryVariables): Fetch<UserConnection> {
    return this._request<D.UsersQuery, D.UsersQueryVariables>(D.UsersDocument, variables).then(response => {
      const data = response?.users;
      return data
        ? new UserConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
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
   * Call the User query and return a User
   *
   * @param id - required id to pass to user
   * @returns parsed response from UserQuery
   */
  public async fetch(id: string): Fetch<User> {
    return this._request<D.UserQuery, D.UserQueryVariables>(D.UserDocument, {
      id,
    }).then(response => {
      const data = response?.user;
      return data ? new User(this._request, data) : undefined;
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
   * Call the Viewer query and return a User
   *
   * @returns parsed response from ViewerQuery
   */
  public async fetch(): Fetch<User> {
    return this._request<D.ViewerQuery, D.ViewerQueryVariables>(D.ViewerDocument, {}).then(response => {
      const data = response?.viewer;
      return data ? new User(this._request, data) : undefined;
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
   * Call the Organization query and return a Organization
   *
   * @returns parsed response from OrganizationQuery
   */
  public async fetch(): Fetch<Organization> {
    return this._request<D.OrganizationQuery, D.OrganizationQueryVariables>(D.OrganizationDocument, {}).then(
      response => {
        const data = response?.organization;
        return data ? new Organization(this._request, data) : undefined;
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
   * Call the OrganizationExists query and return a OrganizationExistsPayload
   *
   * @param urlKey - required urlKey to pass to organizationExists
   * @returns parsed response from OrganizationExistsQuery
   */
  public async fetch(urlKey: string): Fetch<OrganizationExistsPayload> {
    return this._request<D.OrganizationExistsQuery, D.OrganizationExistsQueryVariables>(D.OrganizationExistsDocument, {
      urlKey,
    }).then(response => {
      const data = response?.organizationExists;
      return data ? new OrganizationExistsPayload(this._request, data) : undefined;
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
   * Call the SyncBootstrap query and return a SyncResponse
   *
   * @param databaseVersion - required databaseVersion to pass to syncBootstrap
   * @param sinceSyncId - required sinceSyncId to pass to syncBootstrap
   * @returns parsed response from SyncBootstrapQuery
   */
  public async fetch(databaseVersion: number, sinceSyncId: number): Fetch<SyncResponse> {
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
 * A fetchable SyncUpdates Query
 *
 * @param request - function to call the graphql client
 */
class SyncUpdatesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the SyncUpdates query and return a SyncResponse
   *
   * @param sinceSyncId - required sinceSyncId to pass to syncUpdates
   * @returns parsed response from SyncUpdatesQuery
   */
  public async fetch(sinceSyncId: number): Fetch<SyncResponse> {
    return this._request<D.SyncUpdatesQuery, D.SyncUpdatesQueryVariables>(D.SyncUpdatesDocument, {
      sinceSyncId,
    }).then(response => {
      const data = response?.syncUpdates;
      return data ? new SyncResponse(this._request, data) : undefined;
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
   * Call the ArchivedModelSync query and return a ArchiveResponse
   *
   * @param identifier - required identifier to pass to archivedModelSync
   * @param modelClass - required modelClass to pass to archivedModelSync
   * @returns parsed response from ArchivedModelSyncQuery
   */
  public async fetch(identifier: string, modelClass: string): Fetch<ArchiveResponse> {
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
 * A fetchable ArchivedModelsSync Query
 *
 * @param request - function to call the graphql client
 */
class ArchivedModelsSyncQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ArchivedModelsSync query and return a ArchiveResponse
   *
   * @param modelClass - required modelClass to pass to archivedModelsSync
   * @param teamId - required teamId to pass to archivedModelsSync
   * @param variables - variables without 'modelClass', 'teamId' to pass into the ArchivedModelsSyncQuery
   * @returns parsed response from ArchivedModelsSyncQuery
   */
  public async fetch(
    modelClass: string,
    teamId: string,
    variables?: Omit<D.ArchivedModelsSyncQueryVariables, "modelClass" | "teamId">
  ): Fetch<ArchiveResponse> {
    return this._request<D.ArchivedModelsSyncQuery, D.ArchivedModelsSyncQueryVariables>(D.ArchivedModelsSyncDocument, {
      modelClass,
      teamId,
      ...variables,
    }).then(response => {
      const data = response?.archivedModelsSync;
      return data ? new ArchiveResponse(this._request, data) : undefined;
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
   * Call the AdminUserAccountLookup query and return a UserAccountAdminPrivileged
   *
   * @param variables - variables to pass into the AdminUserAccountLookupQuery
   * @returns parsed response from AdminUserAccountLookupQuery
   */
  public async fetch(variables?: D.AdminUserAccountLookupQueryVariables): Fetch<UserAccountAdminPrivileged> {
    return this._request<D.AdminUserAccountLookupQuery, D.AdminUserAccountLookupQueryVariables>(
      D.AdminUserAccountLookupDocument,
      variables
    ).then(response => {
      const data = response?.adminUserAccountLookup;
      return data ? new UserAccountAdminPrivileged(this._request, data) : undefined;
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
   * Call the ApiKeys query and return a ApiKeyConnection
   *
   * @param variables - variables to pass into the ApiKeysQuery
   * @returns parsed response from ApiKeysQuery
   */
  public async fetch(variables?: D.ApiKeysQueryVariables): Fetch<ApiKeyConnection> {
    return this._request<D.ApiKeysQuery, D.ApiKeysQueryVariables>(D.ApiKeysDocument, variables).then(response => {
      const data = response?.apiKeys;
      return data
        ? new ApiKeyConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the ApplicationWithAuthorization query and return a UserAuthorizedApplication
   *
   * @param scope - required scope to pass to applicationWithAuthorization
   * @param clientId - required clientId to pass to applicationWithAuthorization
   * @param variables - variables without 'scope', 'clientId' to pass into the ApplicationWithAuthorizationQuery
   * @returns parsed response from ApplicationWithAuthorizationQuery
   */
  public async fetch(
    scope: string[],
    clientId: string,
    variables?: Omit<D.ApplicationWithAuthorizationQueryVariables, "scope" | "clientId">
  ): Fetch<UserAuthorizedApplication> {
    return this._request<D.ApplicationWithAuthorizationQuery, D.ApplicationWithAuthorizationQueryVariables>(
      D.ApplicationWithAuthorizationDocument,
      {
        scope,
        clientId,
        ...variables,
      }
    ).then(response => {
      const data = response?.applicationWithAuthorization;
      return data ? new UserAuthorizedApplication(this._request, data) : undefined;
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
   * Call the AuthorizedApplications query and return a AuthorizedApplication list
   *
   * @returns parsed response from AuthorizedApplicationsQuery
   */
  public async fetch(): Fetch<AuthorizedApplication[]> {
    return this._request<D.AuthorizedApplicationsQuery, D.AuthorizedApplicationsQueryVariables>(
      D.AuthorizedApplicationsDocument,
      {}
    ).then(response => {
      const data = response?.authorizedApplications;
      return data ? data.map(node => new AuthorizedApplication(this._request, node)) : undefined;
    });
  }
}

/**
 * A fetchable AvailableUsers Query
 *
 * @param request - function to call the graphql client
 */
class AvailableUsersQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the AvailableUsers query and return a AuthResolverResponse
   *
   * @returns parsed response from AvailableUsersQuery
   */
  public async fetch(): Fetch<AuthResolverResponse> {
    return this._request<D.AvailableUsersQuery, D.AvailableUsersQueryVariables>(D.AvailableUsersDocument, {}).then(
      response => {
        const data = response?.availableUsers;
        return data ? new AuthResolverResponse(this._request, data) : undefined;
      }
    );
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
   * Call the SsoUrlFromEmail query and return a SsoUrlFromEmailResponse
   *
   * @param email - required email to pass to ssoUrlFromEmail
   * @param variables - variables without 'email' to pass into the SsoUrlFromEmailQuery
   * @returns parsed response from SsoUrlFromEmailQuery
   */
  public async fetch(
    email: string,
    variables?: Omit<D.SsoUrlFromEmailQueryVariables, "email">
  ): Fetch<SsoUrlFromEmailResponse> {
    return this._request<D.SsoUrlFromEmailQuery, D.SsoUrlFromEmailQueryVariables>(D.SsoUrlFromEmailDocument, {
      email,
      ...variables,
    }).then(response => {
      const data = response?.ssoUrlFromEmail;
      return data ? new SsoUrlFromEmailResponse(this._request, data) : undefined;
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
   * Call the BillingDetails query and return a BillingDetailsPayload
   *
   * @returns parsed response from BillingDetailsQuery
   */
  public async fetch(): Fetch<BillingDetailsPayload> {
    return this._request<D.BillingDetailsQuery, D.BillingDetailsQueryVariables>(D.BillingDetailsDocument, {}).then(
      response => {
        const data = response?.billingDetails;
        return data ? new BillingDetailsPayload(this._request, data) : undefined;
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
   * Call the CollaborativeDocumentJoin query and return a CollaborationDocumentUpdatePayload
   *
   * @param clientId - required clientId to pass to collaborativeDocumentJoin
   * @param issueId - required issueId to pass to collaborativeDocumentJoin
   * @param version - required version to pass to collaborativeDocumentJoin
   * @returns parsed response from CollaborativeDocumentJoinQuery
   */
  public async fetch(clientId: string, issueId: string, version: number): Fetch<CollaborationDocumentUpdatePayload> {
    return this._request<D.CollaborativeDocumentJoinQuery, D.CollaborativeDocumentJoinQueryVariables>(
      D.CollaborativeDocumentJoinDocument,
      {
        clientId,
        issueId,
        version,
      }
    ).then(response => {
      const data = response?.collaborativeDocumentJoin;
      return data ? new CollaborationDocumentUpdatePayload(this._request, data) : undefined;
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
   * Call the Comments query and return a CommentConnection
   *
   * @param variables - variables to pass into the CommentsQuery
   * @returns parsed response from CommentsQuery
   */
  public async fetch(variables?: D.CommentsQueryVariables): Fetch<CommentConnection> {
    return this._request<D.CommentsQuery, D.CommentsQueryVariables>(D.CommentsDocument, variables).then(response => {
      const data = response?.comments;
      return data
        ? new CommentConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the Comment query and return a Comment
   *
   * @param id - required id to pass to comment
   * @returns parsed response from CommentQuery
   */
  public async fetch(id: string): Fetch<Comment> {
    return this._request<D.CommentQuery, D.CommentQueryVariables>(D.CommentDocument, {
      id,
    }).then(response => {
      const data = response?.comment;
      return data ? new Comment(this._request, data) : undefined;
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
   * Call the CustomViews query and return a CustomViewConnection
   *
   * @param variables - variables to pass into the CustomViewsQuery
   * @returns parsed response from CustomViewsQuery
   */
  public async fetch(variables?: D.CustomViewsQueryVariables): Fetch<CustomViewConnection> {
    return this._request<D.CustomViewsQuery, D.CustomViewsQueryVariables>(D.CustomViewsDocument, variables).then(
      response => {
        const data = response?.customViews;
        return data
          ? new CustomViewConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
          : undefined;
      }
    );
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
   * Call the CustomView query and return a CustomView
   *
   * @param id - required id to pass to customView
   * @returns parsed response from CustomViewQuery
   */
  public async fetch(id: string): Fetch<CustomView> {
    return this._request<D.CustomViewQuery, D.CustomViewQueryVariables>(D.CustomViewDocument, {
      id,
    }).then(response => {
      const data = response?.customView;
      return data ? new CustomView(this._request, data) : undefined;
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
   * Call the Cycles query and return a CycleConnection
   *
   * @param variables - variables to pass into the CyclesQuery
   * @returns parsed response from CyclesQuery
   */
  public async fetch(variables?: D.CyclesQueryVariables): Fetch<CycleConnection> {
    return this._request<D.CyclesQuery, D.CyclesQueryVariables>(D.CyclesDocument, variables).then(response => {
      const data = response?.cycles;
      return data
        ? new CycleConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the Cycle query and return a Cycle
   *
   * @param id - required id to pass to cycle
   * @returns parsed response from CycleQuery
   */
  public async fetch(id: string): Fetch<Cycle> {
    return this._request<D.CycleQuery, D.CycleQueryVariables>(D.CycleDocument, {
      id,
    }).then(response => {
      const data = response?.cycle;
      return data ? new Cycle(this._request, data) : undefined;
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
   * Call the Emojis query and return a EmojiConnection
   *
   * @param variables - variables to pass into the EmojisQuery
   * @returns parsed response from EmojisQuery
   */
  public async fetch(variables?: D.EmojisQueryVariables): Fetch<EmojiConnection> {
    return this._request<D.EmojisQuery, D.EmojisQueryVariables>(D.EmojisDocument, variables).then(response => {
      const data = response?.emojis;
      return data
        ? new EmojiConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the Emoji query and return a Emoji
   *
   * @param id - required id to pass to emoji
   * @returns parsed response from EmojiQuery
   */
  public async fetch(id: string): Fetch<Emoji> {
    return this._request<D.EmojiQuery, D.EmojiQueryVariables>(D.EmojiDocument, {
      id,
    }).then(response => {
      const data = response?.emoji;
      return data ? new Emoji(this._request, data) : undefined;
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
   * Call the Favorites query and return a FavoriteConnection
   *
   * @param variables - variables to pass into the FavoritesQuery
   * @returns parsed response from FavoritesQuery
   */
  public async fetch(variables?: D.FavoritesQueryVariables): Fetch<FavoriteConnection> {
    return this._request<D.FavoritesQuery, D.FavoritesQueryVariables>(D.FavoritesDocument, variables).then(response => {
      const data = response?.favorites;
      return data
        ? new FavoriteConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the Favorite query and return a Favorite
   *
   * @param id - required id to pass to favorite
   * @returns parsed response from FavoriteQuery
   */
  public async fetch(id: string): Fetch<Favorite> {
    return this._request<D.FavoriteQuery, D.FavoriteQueryVariables>(D.FavoriteDocument, {
      id,
    }).then(response => {
      const data = response?.favorite;
      return data ? new Favorite(this._request, data) : undefined;
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
   * Call the FigmaEmbedInfo query and return a FigmaEmbedPayload
   *
   * @param fileId - required fileId to pass to figmaEmbedInfo
   * @param variables - variables without 'fileId' to pass into the FigmaEmbedInfoQuery
   * @returns parsed response from FigmaEmbedInfoQuery
   */
  public async fetch(
    fileId: string,
    variables?: Omit<D.FigmaEmbedInfoQueryVariables, "fileId">
  ): Fetch<FigmaEmbedPayload> {
    return this._request<D.FigmaEmbedInfoQuery, D.FigmaEmbedInfoQueryVariables>(D.FigmaEmbedInfoDocument, {
      fileId,
      ...variables,
    }).then(response => {
      const data = response?.figmaEmbedInfo;
      return data ? new FigmaEmbedPayload(this._request, data) : undefined;
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
   * Call the Integrations query and return a IntegrationConnection
   *
   * @param variables - variables to pass into the IntegrationsQuery
   * @returns parsed response from IntegrationsQuery
   */
  public async fetch(variables?: D.IntegrationsQueryVariables): Fetch<IntegrationConnection> {
    return this._request<D.IntegrationsQuery, D.IntegrationsQueryVariables>(D.IntegrationsDocument, variables).then(
      response => {
        const data = response?.integrations;
        return data
          ? new IntegrationConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
          : undefined;
      }
    );
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
   * Call the Integration query and return a Integration
   *
   * @param id - required id to pass to integration
   * @returns parsed response from IntegrationQuery
   */
  public async fetch(id: string): Fetch<Integration> {
    return this._request<D.IntegrationQuery, D.IntegrationQueryVariables>(D.IntegrationDocument, {
      id,
    }).then(response => {
      const data = response?.integration;
      return data ? new Integration(this._request, data) : undefined;
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
   * Call the IntegrationResources query and return a IntegrationResourceConnection
   *
   * @param variables - variables to pass into the IntegrationResourcesQuery
   * @returns parsed response from IntegrationResourcesQuery
   */
  public async fetch(variables?: D.IntegrationResourcesQueryVariables): Fetch<IntegrationResourceConnection> {
    return this._request<D.IntegrationResourcesQuery, D.IntegrationResourcesQueryVariables>(
      D.IntegrationResourcesDocument,
      variables
    ).then(response => {
      const data = response?.integrationResources;
      return data
        ? new IntegrationResourceConnection(
            this._request,
            pagination => this.fetch({ ...variables, ...pagination }),
            data
          )
        : undefined;
    });
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
   * Call the IntegrationResource query and return a IntegrationResource
   *
   * @param id - required id to pass to integrationResource
   * @returns parsed response from IntegrationResourceQuery
   */
  public async fetch(id: string): Fetch<IntegrationResource> {
    return this._request<D.IntegrationResourceQuery, D.IntegrationResourceQueryVariables>(
      D.IntegrationResourceDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.integrationResource;
      return data ? new IntegrationResource(this._request, data) : undefined;
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
   * Call the InviteInfo query and return a InvitePagePayload
   *
   * @param userHash - required userHash to pass to inviteInfo
   * @param variables - variables without 'userHash' to pass into the InviteInfoQuery
   * @returns parsed response from InviteInfoQuery
   */
  public async fetch(
    userHash: string,
    variables?: Omit<D.InviteInfoQueryVariables, "userHash">
  ): Fetch<InvitePagePayload> {
    return this._request<D.InviteInfoQuery, D.InviteInfoQueryVariables>(D.InviteInfoDocument, {
      userHash,
      ...variables,
    }).then(response => {
      const data = response?.inviteInfo;
      return data ? new InvitePagePayload(this._request, data) : undefined;
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
   * Call the IssueLabels query and return a IssueLabelConnection
   *
   * @param variables - variables to pass into the IssueLabelsQuery
   * @returns parsed response from IssueLabelsQuery
   */
  public async fetch(variables?: D.IssueLabelsQueryVariables): Fetch<IssueLabelConnection> {
    return this._request<D.IssueLabelsQuery, D.IssueLabelsQueryVariables>(D.IssueLabelsDocument, variables).then(
      response => {
        const data = response?.issueLabels;
        return data
          ? new IssueLabelConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
          : undefined;
      }
    );
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
   * Call the IssueLabel query and return a IssueLabel
   *
   * @param id - required id to pass to issueLabel
   * @returns parsed response from IssueLabelQuery
   */
  public async fetch(id: string): Fetch<IssueLabel> {
    return this._request<D.IssueLabelQuery, D.IssueLabelQueryVariables>(D.IssueLabelDocument, {
      id,
    }).then(response => {
      const data = response?.issueLabel;
      return data ? new IssueLabel(this._request, data) : undefined;
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
   * Call the IssueRelations query and return a IssueRelationConnection
   *
   * @param variables - variables to pass into the IssueRelationsQuery
   * @returns parsed response from IssueRelationsQuery
   */
  public async fetch(variables?: D.IssueRelationsQueryVariables): Fetch<IssueRelationConnection> {
    return this._request<D.IssueRelationsQuery, D.IssueRelationsQueryVariables>(
      D.IssueRelationsDocument,
      variables
    ).then(response => {
      const data = response?.issueRelations;
      return data
        ? new IssueRelationConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the IssueRelation query and return a IssueRelation
   *
   * @param id - required id to pass to issueRelation
   * @returns parsed response from IssueRelationQuery
   */
  public async fetch(id: string): Fetch<IssueRelation> {
    return this._request<D.IssueRelationQuery, D.IssueRelationQueryVariables>(D.IssueRelationDocument, {
      id,
    }).then(response => {
      const data = response?.issueRelation;
      return data ? new IssueRelation(this._request, data) : undefined;
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
   * Call the Issues query and return a IssueConnection
   *
   * @param variables - variables to pass into the IssuesQuery
   * @returns parsed response from IssuesQuery
   */
  public async fetch(variables?: D.IssuesQueryVariables): Fetch<IssueConnection> {
    return this._request<D.IssuesQuery, D.IssuesQueryVariables>(D.IssuesDocument, variables).then(response => {
      const data = response?.issues;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
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
   * Call the Issue query and return a Issue
   *
   * @param id - required id to pass to issue
   * @returns parsed response from IssueQuery
   */
  public async fetch(id: string): Fetch<Issue> {
    return this._request<D.IssueQuery, D.IssueQueryVariables>(D.IssueDocument, {
      id,
    }).then(response => {
      const data = response?.issue;
      return data ? new Issue(this._request, data) : undefined;
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
   * Call the IssueSearch query and return a IssueConnection
   *
   * @param query - required query to pass to issueSearch
   * @param variables - variables without 'query' to pass into the IssueSearchQuery
   * @returns parsed response from IssueSearchQuery
   */
  public async fetch(query: string, variables?: Omit<D.IssueSearchQueryVariables, "query">): Fetch<IssueConnection> {
    return this._request<D.IssueSearchQuery, D.IssueSearchQueryVariables>(D.IssueSearchDocument, {
      query,
      ...variables,
    }).then(response => {
      const data = response?.issueSearch;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch(query, { ...variables, ...pagination }), data)
        : undefined;
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
   * Call the Milestones query and return a MilestoneConnection
   *
   * @param variables - variables to pass into the MilestonesQuery
   * @returns parsed response from MilestonesQuery
   */
  public async fetch(variables?: D.MilestonesQueryVariables): Fetch<MilestoneConnection> {
    return this._request<D.MilestonesQuery, D.MilestonesQueryVariables>(D.MilestonesDocument, variables).then(
      response => {
        const data = response?.milestones;
        return data
          ? new MilestoneConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
          : undefined;
      }
    );
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
   * Call the Milestone query and return a Milestone
   *
   * @param id - required id to pass to milestone
   * @returns parsed response from MilestoneQuery
   */
  public async fetch(id: string): Fetch<Milestone> {
    return this._request<D.MilestoneQuery, D.MilestoneQueryVariables>(D.MilestoneDocument, {
      id,
    }).then(response => {
      const data = response?.milestone;
      return data ? new Milestone(this._request, data) : undefined;
    });
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
   * Call the Notifications query and return a NotificationConnection
   *
   * @param variables - variables to pass into the NotificationsQuery
   * @returns parsed response from NotificationsQuery
   */
  public async fetch(variables?: D.NotificationsQueryVariables): Fetch<NotificationConnection> {
    return this._request<D.NotificationsQuery, D.NotificationsQueryVariables>(D.NotificationsDocument, variables).then(
      response => {
        const data = response?.notifications;
        return data
          ? new NotificationConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
          : undefined;
      }
    );
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
   * Call the Notification query and return a Notification
   *
   * @param id - required id to pass to notification
   * @returns parsed response from NotificationQuery
   */
  public async fetch(id: string): Fetch<Notification> {
    return this._request<D.NotificationQuery, D.NotificationQueryVariables>(D.NotificationDocument, {
      id,
    }).then(response => {
      const data = response?.notification;
      return data ? new Notification(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable NotificationSubscriptions Query
 *
 * @param request - function to call the graphql client
 */
class NotificationSubscriptionsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the NotificationSubscriptions query and return a NotificationSubscriptionConnection
   *
   * @param variables - variables to pass into the NotificationSubscriptionsQuery
   * @returns parsed response from NotificationSubscriptionsQuery
   */
  public async fetch(variables?: D.NotificationSubscriptionsQueryVariables): Fetch<NotificationSubscriptionConnection> {
    return this._request<D.NotificationSubscriptionsQuery, D.NotificationSubscriptionsQueryVariables>(
      D.NotificationSubscriptionsDocument,
      variables
    ).then(response => {
      const data = response?.notificationSubscriptions;
      return data
        ? new NotificationSubscriptionConnection(
            this._request,
            pagination => this.fetch({ ...variables, ...pagination }),
            data
          )
        : undefined;
    });
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
   * Call the NotificationSubscription query and return a NotificationSubscription
   *
   * @param id - required id to pass to notificationSubscription
   * @returns parsed response from NotificationSubscriptionQuery
   */
  public async fetch(id: string): Fetch<NotificationSubscription> {
    return this._request<D.NotificationSubscriptionQuery, D.NotificationSubscriptionQueryVariables>(
      D.NotificationSubscriptionDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.notificationSubscription;
      return data ? new NotificationSubscription(this._request, data) : undefined;
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
   * Call the OrganizationInvites query and return a OrganizationInviteConnection
   *
   * @param variables - variables to pass into the OrganizationInvitesQuery
   * @returns parsed response from OrganizationInvitesQuery
   */
  public async fetch(variables?: D.OrganizationInvitesQueryVariables): Fetch<OrganizationInviteConnection> {
    return this._request<D.OrganizationInvitesQuery, D.OrganizationInvitesQueryVariables>(
      D.OrganizationInvitesDocument,
      variables
    ).then(response => {
      const data = response?.organizationInvites;
      return data
        ? new OrganizationInviteConnection(
            this._request,
            pagination => this.fetch({ ...variables, ...pagination }),
            data
          )
        : undefined;
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
   * Call the OrganizationInvite query and return a IssueLabel
   *
   * @param id - required id to pass to organizationInvite
   * @returns parsed response from OrganizationInviteQuery
   */
  public async fetch(id: string): Fetch<IssueLabel> {
    return this._request<D.OrganizationInviteQuery, D.OrganizationInviteQueryVariables>(D.OrganizationInviteDocument, {
      id,
    }).then(response => {
      const data = response?.organizationInvite;
      return data ? new IssueLabel(this._request, data) : undefined;
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
   * Call the ProjectLinks query and return a ProjectLinkConnection
   *
   * @param variables - variables to pass into the ProjectLinksQuery
   * @returns parsed response from ProjectLinksQuery
   */
  public async fetch(variables?: D.ProjectLinksQueryVariables): Fetch<ProjectLinkConnection> {
    return this._request<D.ProjectLinksQuery, D.ProjectLinksQueryVariables>(D.ProjectLinksDocument, variables).then(
      response => {
        const data = response?.projectLinks;
        return data
          ? new ProjectLinkConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
          : undefined;
      }
    );
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
   * Call the ProjectLink query and return a ProjectLink
   *
   * @param id - required id to pass to projectLink
   * @returns parsed response from ProjectLinkQuery
   */
  public async fetch(id: string): Fetch<ProjectLink> {
    return this._request<D.ProjectLinkQuery, D.ProjectLinkQueryVariables>(D.ProjectLinkDocument, {
      id,
    }).then(response => {
      const data = response?.projectLink;
      return data ? new ProjectLink(this._request, data) : undefined;
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
   * Call the Projects query and return a ProjectConnection
   *
   * @param variables - variables to pass into the ProjectsQuery
   * @returns parsed response from ProjectsQuery
   */
  public async fetch(variables?: D.ProjectsQueryVariables): Fetch<ProjectConnection> {
    return this._request<D.ProjectsQuery, D.ProjectsQueryVariables>(D.ProjectsDocument, variables).then(response => {
      const data = response?.projects;
      return data
        ? new ProjectConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
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
   * Call the Project query and return a Project
   *
   * @param id - required id to pass to project
   * @returns parsed response from ProjectQuery
   */
  public async fetch(id: string): Fetch<Project> {
    return this._request<D.ProjectQuery, D.ProjectQueryVariables>(D.ProjectDocument, {
      id,
    }).then(response => {
      const data = response?.project;
      return data ? new Project(this._request, data) : undefined;
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
   * Call the PushSubscriptionTest query and return a PushSubscriptionPayload
   *
   * @returns parsed response from PushSubscriptionTestQuery
   */
  public async fetch(): Fetch<PushSubscriptionPayload> {
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
 * A fetchable Reactions Query
 *
 * @param request - function to call the graphql client
 */
class ReactionsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the Reactions query and return a ReactionConnection
   *
   * @param variables - variables to pass into the ReactionsQuery
   * @returns parsed response from ReactionsQuery
   */
  public async fetch(variables?: D.ReactionsQueryVariables): Fetch<ReactionConnection> {
    return this._request<D.ReactionsQuery, D.ReactionsQueryVariables>(D.ReactionsDocument, variables).then(response => {
      const data = response?.reactions;
      return data
        ? new ReactionConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the Reaction query and return a Reaction
   *
   * @param id - required id to pass to reaction
   * @returns parsed response from ReactionQuery
   */
  public async fetch(id: string): Fetch<Reaction> {
    return this._request<D.ReactionQuery, D.ReactionQueryVariables>(D.ReactionDocument, {
      id,
    }).then(response => {
      const data = response?.reaction;
      return data ? new Reaction(this._request, data) : undefined;
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
   * Call the Subscription query and return a Subscription
   *
   * @returns parsed response from SubscriptionQuery
   */
  public async fetch(): Fetch<Subscription> {
    return this._request<D.SubscriptionQuery, D.SubscriptionQueryVariables>(D.SubscriptionDocument, {}).then(
      response => {
        const data = response?.subscription;
        return data ? new Subscription(this._request, data) : undefined;
      }
    );
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
   * Call the TeamMemberships query and return a TeamMembershipConnection
   *
   * @param variables - variables to pass into the TeamMembershipsQuery
   * @returns parsed response from TeamMembershipsQuery
   */
  public async fetch(variables?: D.TeamMembershipsQueryVariables): Fetch<TeamMembershipConnection> {
    return this._request<D.TeamMembershipsQuery, D.TeamMembershipsQueryVariables>(
      D.TeamMembershipsDocument,
      variables
    ).then(response => {
      const data = response?.teamMemberships;
      return data
        ? new TeamMembershipConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
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
   * Call the TeamMembership query and return a TeamMembership
   *
   * @param id - required id to pass to teamMembership
   * @returns parsed response from TeamMembershipQuery
   */
  public async fetch(id: string): Fetch<TeamMembership> {
    return this._request<D.TeamMembershipQuery, D.TeamMembershipQueryVariables>(D.TeamMembershipDocument, {
      id,
    }).then(response => {
      const data = response?.teamMembership;
      return data ? new TeamMembership(this._request, data) : undefined;
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
   * Call the Teams query and return a TeamConnection
   *
   * @param variables - variables to pass into the TeamsQuery
   * @returns parsed response from TeamsQuery
   */
  public async fetch(variables?: D.TeamsQueryVariables): Fetch<TeamConnection> {
    return this._request<D.TeamsQuery, D.TeamsQueryVariables>(D.TeamsDocument, variables).then(response => {
      const data = response?.teams;
      return data
        ? new TeamConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
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
   * Call the Team query and return a Team
   *
   * @param id - required id to pass to team
   * @returns parsed response from TeamQuery
   */
  public async fetch(id: string): Fetch<Team> {
    return this._request<D.TeamQuery, D.TeamQueryVariables>(D.TeamDocument, {
      id,
    }).then(response => {
      const data = response?.team;
      return data ? new Team(this._request, data) : undefined;
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
   * Call the Templates query and return a Template list
   *
   * @returns parsed response from TemplatesQuery
   */
  public async fetch(): Fetch<Template[]> {
    return this._request<D.TemplatesQuery, D.TemplatesQueryVariables>(D.TemplatesDocument, {}).then(response => {
      const data = response?.templates;
      return data ? data.map(node => new Template(this._request, node)) : undefined;
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
   * Call the Template query and return a Template
   *
   * @param id - required id to pass to template
   * @returns parsed response from TemplateQuery
   */
  public async fetch(id: string): Fetch<Template> {
    return this._request<D.TemplateQuery, D.TemplateQueryVariables>(D.TemplateDocument, {
      id,
    }).then(response => {
      const data = response?.template;
      return data ? new Template(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable UserSettings Query
 *
 * @param request - function to call the graphql client
 */
class UserSettingsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the UserSettings query and return a UserSettings
   *
   * @returns parsed response from UserSettingsQuery
   */
  public async fetch(): Fetch<UserSettings> {
    return this._request<D.UserSettingsQuery, D.UserSettingsQueryVariables>(D.UserSettingsDocument, {}).then(
      response => {
        const data = response?.userSettings;
        return data ? new UserSettings(this._request, data) : undefined;
      }
    );
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
   * Call the Webhooks query and return a WebhookConnection
   *
   * @param variables - variables to pass into the WebhooksQuery
   * @returns parsed response from WebhooksQuery
   */
  public async fetch(variables?: D.WebhooksQueryVariables): Fetch<WebhookConnection> {
    return this._request<D.WebhooksQuery, D.WebhooksQueryVariables>(D.WebhooksDocument, variables).then(response => {
      const data = response?.webhooks;
      return data
        ? new WebhookConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
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
   * Call the Webhook query and return a Webhook
   *
   * @param id - required id to pass to webhook
   * @returns parsed response from WebhookQuery
   */
  public async fetch(id: string): Fetch<Webhook> {
    return this._request<D.WebhookQuery, D.WebhookQueryVariables>(D.WebhookDocument, {
      id,
    }).then(response => {
      const data = response?.webhook;
      return data ? new Webhook(this._request, data) : undefined;
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
   * Call the WorkflowStates query and return a WorkflowStateConnection
   *
   * @param variables - variables to pass into the WorkflowStatesQuery
   * @returns parsed response from WorkflowStatesQuery
   */
  public async fetch(variables?: D.WorkflowStatesQueryVariables): Fetch<WorkflowStateConnection> {
    return this._request<D.WorkflowStatesQuery, D.WorkflowStatesQueryVariables>(
      D.WorkflowStatesDocument,
      variables
    ).then(response => {
      const data = response?.workflowStates;
      return data
        ? new WorkflowStateConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the WorkflowState query and return a WorkflowState
   *
   * @param id - required id to pass to workflowState
   * @returns parsed response from WorkflowStateQuery
   */
  public async fetch(id: string): Fetch<WorkflowState> {
    return this._request<D.WorkflowStateQuery, D.WorkflowStateQueryVariables>(D.WorkflowStateDocument, {
      id,
    }).then(response => {
      const data = response?.workflowState;
      return data ? new WorkflowState(this._request, data) : undefined;
    });
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
   * Call the UserUpdate mutation and return a UserPayload
   *
   * @param input - required input to pass to userUpdate
   * @param id - required id to pass to userUpdate
   * @returns parsed response from UserUpdateMutation
   */
  public async fetch(input: D.UpdateUserInput, id: string): Fetch<UserPayload> {
    return this._request<D.UserUpdateMutation, D.UserUpdateMutationVariables>(D.UserUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.userUpdate;
      return data ? new UserPayload(this._request, data) : undefined;
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
   * Call the UserPromoteAdmin mutation and return a UserAdminPayload
   *
   * @param id - required id to pass to userPromoteAdmin
   * @returns parsed response from UserPromoteAdminMutation
   */
  public async fetch(id: string): Fetch<UserAdminPayload> {
    return this._request<D.UserPromoteAdminMutation, D.UserPromoteAdminMutationVariables>(D.UserPromoteAdminDocument, {
      id,
    }).then(response => {
      const data = response?.userPromoteAdmin;
      return data ? new UserAdminPayload(this._request, data) : undefined;
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
   * Call the UserDemoteAdmin mutation and return a UserAdminPayload
   *
   * @param id - required id to pass to userDemoteAdmin
   * @returns parsed response from UserDemoteAdminMutation
   */
  public async fetch(id: string): Fetch<UserAdminPayload> {
    return this._request<D.UserDemoteAdminMutation, D.UserDemoteAdminMutationVariables>(D.UserDemoteAdminDocument, {
      id,
    }).then(response => {
      const data = response?.userDemoteAdmin;
      return data ? new UserAdminPayload(this._request, data) : undefined;
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
   * Call the UserSuspend mutation and return a UserAdminPayload
   *
   * @param id - required id to pass to userSuspend
   * @returns parsed response from UserSuspendMutation
   */
  public async fetch(id: string): Fetch<UserAdminPayload> {
    return this._request<D.UserSuspendMutation, D.UserSuspendMutationVariables>(D.UserSuspendDocument, {
      id,
    }).then(response => {
      const data = response?.userSuspend;
      return data ? new UserAdminPayload(this._request, data) : undefined;
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
   * Call the UserUnsuspend mutation and return a UserAdminPayload
   *
   * @param id - required id to pass to userUnsuspend
   * @returns parsed response from UserUnsuspendMutation
   */
  public async fetch(id: string): Fetch<UserAdminPayload> {
    return this._request<D.UserUnsuspendMutation, D.UserUnsuspendMutationVariables>(D.UserUnsuspendDocument, {
      id,
    }).then(response => {
      const data = response?.userUnsuspend;
      return data ? new UserAdminPayload(this._request, data) : undefined;
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
   * Call the OrganizationUpdate mutation and return a OrganizationPayload
   *
   * @param input - required input to pass to organizationUpdate
   * @returns parsed response from OrganizationUpdateMutation
   */
  public async fetch(input: D.UpdateOrganizationInput): Fetch<OrganizationPayload> {
    return this._request<D.OrganizationUpdateMutation, D.OrganizationUpdateMutationVariables>(
      D.OrganizationUpdateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.organizationUpdate;
      return data ? new OrganizationPayload(this._request, data) : undefined;
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
   * Call the OrganizationDeleteChallenge mutation and return a OrganizationDeletePayload
   *
   * @returns parsed response from OrganizationDeleteChallengeMutation
   */
  public async fetch(): Fetch<OrganizationDeletePayload> {
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
 * A fetchable OrganizationDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class OrganizationDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationDelete mutation and return a OrganizationDeletePayload
   *
   * @param input - required input to pass to organizationDelete
   * @returns parsed response from OrganizationDeleteMutation
   */
  public async fetch(input: D.DeleteOrganizationInput): Fetch<OrganizationDeletePayload> {
    return this._request<D.OrganizationDeleteMutation, D.OrganizationDeleteMutationVariables>(
      D.OrganizationDeleteDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.organizationDelete;
      return data ? new OrganizationDeletePayload(this._request, data) : undefined;
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
   * Call the AdminDeleteIntegration mutation and return a AdminIntegrationPayload
   *
   * @param id - required id to pass to adminDeleteIntegration
   * @returns parsed response from AdminDeleteIntegrationMutation
   */
  public async fetch(id: string): Fetch<AdminIntegrationPayload> {
    return this._request<D.AdminDeleteIntegrationMutation, D.AdminDeleteIntegrationMutationVariables>(
      D.AdminDeleteIntegrationDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.adminDeleteIntegration;
      return data ? new AdminIntegrationPayload(this._request, data) : undefined;
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
   * Call the OrganizationToggleAccess mutation and return a OrganizationAccessPayload
   *
   * @param id - required id to pass to organizationToggleAccess
   * @returns parsed response from OrganizationToggleAccessMutation
   */
  public async fetch(id: string): Fetch<OrganizationAccessPayload> {
    return this._request<D.OrganizationToggleAccessMutation, D.OrganizationToggleAccessMutationVariables>(
      D.OrganizationToggleAccessDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.organizationToggleAccess;
      return data ? new OrganizationAccessPayload(this._request, data) : undefined;
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
   * Call the OrganizationChangeEmailDomain mutation and return a OrganizationAccessPayload
   *
   * @param toDomain - required toDomain to pass to organizationChangeEmailDomain
   * @param fromDomain - required fromDomain to pass to organizationChangeEmailDomain
   * @param id - required id to pass to organizationChangeEmailDomain
   * @returns parsed response from OrganizationChangeEmailDomainMutation
   */
  public async fetch(toDomain: string, fromDomain: string, id: string): Fetch<OrganizationAccessPayload> {
    return this._request<D.OrganizationChangeEmailDomainMutation, D.OrganizationChangeEmailDomainMutationVariables>(
      D.OrganizationChangeEmailDomainDocument,
      {
        toDomain,
        fromDomain,
        id,
      }
    ).then(response => {
      const data = response?.organizationChangeEmailDomain;
      return data ? new OrganizationAccessPayload(this._request, data) : undefined;
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
   * Call the OrganizationToggleSamlEnabled mutation and return a OrganizationSamlConfigurePayload
   *
   * @param id - required id to pass to organizationToggleSamlEnabled
   * @returns parsed response from OrganizationToggleSamlEnabledMutation
   */
  public async fetch(id: string): Fetch<OrganizationSamlConfigurePayload> {
    return this._request<D.OrganizationToggleSamlEnabledMutation, D.OrganizationToggleSamlEnabledMutationVariables>(
      D.OrganizationToggleSamlEnabledDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.organizationToggleSamlEnabled;
      return data ? new OrganizationSamlConfigurePayload(this._request, data) : undefined;
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
   * Call the OrganizationConfigureSaml mutation and return a OrganizationSamlConfigurePayload
   *
   * @param samlConfiguration - required samlConfiguration to pass to organizationConfigureSaml
   * @param id - required id to pass to organizationConfigureSaml
   * @returns parsed response from OrganizationConfigureSamlMutation
   */
  public async fetch(samlConfiguration: D.SamlConfigurationInput, id: string): Fetch<OrganizationSamlConfigurePayload> {
    return this._request<D.OrganizationConfigureSamlMutation, D.OrganizationConfigureSamlMutationVariables>(
      D.OrganizationConfigureSamlDocument,
      {
        samlConfiguration,
        id,
      }
    ).then(response => {
      const data = response?.organizationConfigureSaml;
      return data ? new OrganizationSamlConfigurePayload(this._request, data) : undefined;
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
   * Call the AdminCommand mutation and return a AdminCommandPayload
   *
   * @param input - required input to pass to adminCommand
   * @returns parsed response from AdminCommandMutation
   */
  public async fetch(input: D.AdminCommandInput): Fetch<AdminCommandPayload> {
    return this._request<D.AdminCommandMutation, D.AdminCommandMutationVariables>(D.AdminCommandDocument, {
      input,
    }).then(response => {
      const data = response?.adminCommand;
      return data ? new AdminCommandPayload(this._request, data) : undefined;
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
   * Call the AdminBulkEmail mutation and return a AdminCommandPayload
   *
   * @param emails - required emails to pass to adminBulkEmail
   * @param markdownContent - required markdownContent to pass to adminBulkEmail
   * @param subject - required subject to pass to adminBulkEmail
   * @param variables - variables without 'emails', 'markdownContent', 'subject' to pass into the AdminBulkEmailMutation
   * @returns parsed response from AdminBulkEmailMutation
   */
  public async fetch(
    emails: string[],
    markdownContent: string,
    subject: string,
    variables?: Omit<D.AdminBulkEmailMutationVariables, "emails" | "markdownContent" | "subject">
  ): Fetch<AdminCommandPayload> {
    return this._request<D.AdminBulkEmailMutation, D.AdminBulkEmailMutationVariables>(D.AdminBulkEmailDocument, {
      emails,
      markdownContent,
      subject,
      ...variables,
    }).then(response => {
      const data = response?.adminBulkEmail;
      return data ? new AdminCommandPayload(this._request, data) : undefined;
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
   * Call the AdminCreateStripeCustomer mutation and return a AdminCommandPayload
   *
   * @param organizationId - required organizationId to pass to adminCreateStripeCustomer
   * @returns parsed response from AdminCreateStripeCustomerMutation
   */
  public async fetch(organizationId: string): Fetch<AdminCommandPayload> {
    return this._request<D.AdminCreateStripeCustomerMutation, D.AdminCreateStripeCustomerMutationVariables>(
      D.AdminCreateStripeCustomerDocument,
      {
        organizationId,
      }
    ).then(response => {
      const data = response?.adminCreateStripeCustomer;
      return data ? new AdminCommandPayload(this._request, data) : undefined;
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
   * Call the AdminScheduleAnonymousTask mutation and return a AdminCommandPayload
   *
   * @param taskName - required taskName to pass to adminScheduleAnonymousTask
   * @returns parsed response from AdminScheduleAnonymousTaskMutation
   */
  public async fetch(taskName: string): Fetch<AdminCommandPayload> {
    return this._request<D.AdminScheduleAnonymousTaskMutation, D.AdminScheduleAnonymousTaskMutationVariables>(
      D.AdminScheduleAnonymousTaskDocument,
      {
        taskName,
      }
    ).then(response => {
      const data = response?.adminScheduleAnonymousTask;
      return data ? new AdminCommandPayload(this._request, data) : undefined;
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
   * Call the AdminUserAccountChangeEmail mutation and return a UserAccountAdminPrivileged
   *
   * @param newEmail - required newEmail to pass to adminUserAccountChangeEmail
   * @param id - required id to pass to adminUserAccountChangeEmail
   * @returns parsed response from AdminUserAccountChangeEmailMutation
   */
  public async fetch(newEmail: string, id: string): Fetch<UserAccountAdminPrivileged> {
    return this._request<D.AdminUserAccountChangeEmailMutation, D.AdminUserAccountChangeEmailMutationVariables>(
      D.AdminUserAccountChangeEmailDocument,
      {
        newEmail,
        id,
      }
    ).then(response => {
      const data = response?.adminUserAccountChangeEmail;
      return data ? new UserAccountAdminPrivileged(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable AdminUserAccountDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class AdminUserAccountDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the AdminUserAccountDelete mutation and return a AdminResponse
   *
   * @param email - required email to pass to adminUserAccountDelete
   * @param id - required id to pass to adminUserAccountDelete
   * @param variables - variables without 'email', 'id' to pass into the AdminUserAccountDeleteMutation
   * @returns parsed response from AdminUserAccountDeleteMutation
   */
  public async fetch(
    email: string,
    id: string,
    variables?: Omit<D.AdminUserAccountDeleteMutationVariables, "email" | "id">
  ): Fetch<AdminResponse> {
    return this._request<D.AdminUserAccountDeleteMutation, D.AdminUserAccountDeleteMutationVariables>(
      D.AdminUserAccountDeleteDocument,
      {
        email,
        id,
        ...variables,
      }
    ).then(response => {
      const data = response?.adminUserAccountDelete;
      return data ? new AdminResponse(this._request, data) : undefined;
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
   * Call the EventCreate mutation and return a EventPayload
   *
   * @param input - required input to pass to eventCreate
   * @returns parsed response from EventCreateMutation
   */
  public async fetch(input: D.EventCreateInput): Fetch<EventPayload> {
    return this._request<D.EventCreateMutation, D.EventCreateMutationVariables>(D.EventCreateDocument, {
      input,
    }).then(response => {
      const data = response?.eventCreate;
      return data ? new EventPayload(this._request, data) : undefined;
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
   * Call the ApiKeyCreate mutation and return a ApiKeyPayload
   *
   * @param input - required input to pass to apiKeyCreate
   * @returns parsed response from ApiKeyCreateMutation
   */
  public async fetch(input: D.ApiKeyCreateInput): Fetch<ApiKeyPayload> {
    return this._request<D.ApiKeyCreateMutation, D.ApiKeyCreateMutationVariables>(D.ApiKeyCreateDocument, {
      input,
    }).then(response => {
      const data = response?.apiKeyCreate;
      return data ? new ApiKeyPayload(this._request, data) : undefined;
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
   * Call the ApiKeyDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to apiKeyDelete
   * @returns parsed response from ApiKeyDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.ApiKeyDeleteMutation, D.ApiKeyDeleteMutationVariables>(D.ApiKeyDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.apiKeyDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the EmailUserAccountAuthChallenge mutation and return a EmailUserAccountAuthChallengeResponse
   *
   * @param input - required input to pass to emailUserAccountAuthChallenge
   * @returns parsed response from EmailUserAccountAuthChallengeMutation
   */
  public async fetch(input: D.EmailUserAccountAuthChallengeInput): Fetch<EmailUserAccountAuthChallengeResponse> {
    return this._request<D.EmailUserAccountAuthChallengeMutation, D.EmailUserAccountAuthChallengeMutationVariables>(
      D.EmailUserAccountAuthChallengeDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.emailUserAccountAuthChallenge;
      return data ? new EmailUserAccountAuthChallengeResponse(this._request, data) : undefined;
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
   * Call the EmailTokenUserAccountAuth mutation and return a AuthResolverResponse
   *
   * @param input - required input to pass to emailTokenUserAccountAuth
   * @returns parsed response from EmailTokenUserAccountAuthMutation
   */
  public async fetch(input: D.TokenUserAccountAuthInput): Fetch<AuthResolverResponse> {
    return this._request<D.EmailTokenUserAccountAuthMutation, D.EmailTokenUserAccountAuthMutationVariables>(
      D.EmailTokenUserAccountAuthDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.emailTokenUserAccountAuth;
      return data ? new AuthResolverResponse(this._request, data) : undefined;
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
   * Call the SamlTokenUserAccountAuth mutation and return a AuthResolverResponse
   *
   * @param input - required input to pass to samlTokenUserAccountAuth
   * @returns parsed response from SamlTokenUserAccountAuthMutation
   */
  public async fetch(input: D.TokenUserAccountAuthInput): Fetch<AuthResolverResponse> {
    return this._request<D.SamlTokenUserAccountAuthMutation, D.SamlTokenUserAccountAuthMutationVariables>(
      D.SamlTokenUserAccountAuthDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.samlTokenUserAccountAuth;
      return data ? new AuthResolverResponse(this._request, data) : undefined;
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
   * Call the GoogleUserAccountAuth mutation and return a AuthResolverResponse
   *
   * @param input - required input to pass to googleUserAccountAuth
   * @returns parsed response from GoogleUserAccountAuthMutation
   */
  public async fetch(input: D.GoogleUserAccountAuthInput): Fetch<AuthResolverResponse> {
    return this._request<D.GoogleUserAccountAuthMutation, D.GoogleUserAccountAuthMutationVariables>(
      D.GoogleUserAccountAuthDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.googleUserAccountAuth;
      return data ? new AuthResolverResponse(this._request, data) : undefined;
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
   * Call the CreateOrganizationFromOnboarding mutation and return a CreateOrJoinOrganizationResponse
   *
   * @param input - required input to pass to createOrganizationFromOnboarding
   * @param variables - variables without 'input' to pass into the CreateOrganizationFromOnboardingMutation
   * @returns parsed response from CreateOrganizationFromOnboardingMutation
   */
  public async fetch(
    input: D.CreateOrganizationInput,
    variables?: Omit<D.CreateOrganizationFromOnboardingMutationVariables, "input">
  ): Fetch<CreateOrJoinOrganizationResponse> {
    return this._request<
      D.CreateOrganizationFromOnboardingMutation,
      D.CreateOrganizationFromOnboardingMutationVariables
    >(D.CreateOrganizationFromOnboardingDocument, {
      input,
      ...variables,
    }).then(response => {
      const data = response?.createOrganizationFromOnboarding;
      return data ? new CreateOrJoinOrganizationResponse(this._request, data) : undefined;
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
   * Call the JoinOrganizationFromOnboarding mutation and return a CreateOrJoinOrganizationResponse
   *
   * @param input - required input to pass to joinOrganizationFromOnboarding
   * @returns parsed response from JoinOrganizationFromOnboardingMutation
   */
  public async fetch(input: D.JoinOrganizationInput): Fetch<CreateOrJoinOrganizationResponse> {
    return this._request<D.JoinOrganizationFromOnboardingMutation, D.JoinOrganizationFromOnboardingMutationVariables>(
      D.JoinOrganizationFromOnboardingDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.joinOrganizationFromOnboarding;
      return data ? new CreateOrJoinOrganizationResponse(this._request, data) : undefined;
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
   * Call the LeaveOrganization mutation and return a CreateOrJoinOrganizationResponse
   *
   * @param organizationId - required organizationId to pass to leaveOrganization
   * @returns parsed response from LeaveOrganizationMutation
   */
  public async fetch(organizationId: string): Fetch<CreateOrJoinOrganizationResponse> {
    return this._request<D.LeaveOrganizationMutation, D.LeaveOrganizationMutationVariables>(
      D.LeaveOrganizationDocument,
      {
        organizationId,
      }
    ).then(response => {
      const data = response?.leaveOrganization;
      return data ? new CreateOrJoinOrganizationResponse(this._request, data) : undefined;
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
   * Call the BillingEmailUpdate mutation and return a BillingEmailPayload
   *
   * @param input - required input to pass to billingEmailUpdate
   * @returns parsed response from BillingEmailUpdateMutation
   */
  public async fetch(input: D.BillingEmailUpdateInput): Fetch<BillingEmailPayload> {
    return this._request<D.BillingEmailUpdateMutation, D.BillingEmailUpdateMutationVariables>(
      D.BillingEmailUpdateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.billingEmailUpdate;
      return data ? new BillingEmailPayload(this._request, data) : undefined;
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
   * Call the CollaborativeDocumentUpdate mutation and return a CollaborationDocumentUpdatePayload
   *
   * @param input - required input to pass to collaborativeDocumentUpdate
   * @returns parsed response from CollaborativeDocumentUpdateMutation
   */
  public async fetch(input: D.CollaborationDocumentUpdateInput): Fetch<CollaborationDocumentUpdatePayload> {
    return this._request<D.CollaborativeDocumentUpdateMutation, D.CollaborativeDocumentUpdateMutationVariables>(
      D.CollaborativeDocumentUpdateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.collaborativeDocumentUpdate;
      return data ? new CollaborationDocumentUpdatePayload(this._request, data) : undefined;
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
   * Call the CommentCreate mutation and return a CommentPayload
   *
   * @param input - required input to pass to commentCreate
   * @returns parsed response from CommentCreateMutation
   */
  public async fetch(input: D.CommentCreateInput): Fetch<CommentPayload> {
    return this._request<D.CommentCreateMutation, D.CommentCreateMutationVariables>(D.CommentCreateDocument, {
      input,
    }).then(response => {
      const data = response?.commentCreate;
      return data ? new CommentPayload(this._request, data) : undefined;
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
   * Call the CommentUpdate mutation and return a CommentPayload
   *
   * @param input - required input to pass to commentUpdate
   * @param id - required id to pass to commentUpdate
   * @returns parsed response from CommentUpdateMutation
   */
  public async fetch(input: D.CommentUpdateInput, id: string): Fetch<CommentPayload> {
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
 * A fetchable CommentDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class CommentDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CommentDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to commentDelete
   * @returns parsed response from CommentDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.CommentDeleteMutation, D.CommentDeleteMutationVariables>(D.CommentDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.commentDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the ContactCreate mutation and return a ContactPayload
   *
   * @param input - required input to pass to contactCreate
   * @returns parsed response from ContactCreateMutation
   */
  public async fetch(input: D.ContactCreateInput): Fetch<ContactPayload> {
    return this._request<D.ContactCreateMutation, D.ContactCreateMutationVariables>(D.ContactCreateDocument, {
      input,
    }).then(response => {
      const data = response?.contactCreate;
      return data ? new ContactPayload(this._request, data) : undefined;
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
   * Call the CustomViewCreate mutation and return a CustomViewPayload
   *
   * @param input - required input to pass to customViewCreate
   * @returns parsed response from CustomViewCreateMutation
   */
  public async fetch(input: D.CustomViewCreateInput): Fetch<CustomViewPayload> {
    return this._request<D.CustomViewCreateMutation, D.CustomViewCreateMutationVariables>(D.CustomViewCreateDocument, {
      input,
    }).then(response => {
      const data = response?.customViewCreate;
      return data ? new CustomViewPayload(this._request, data) : undefined;
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
   * Call the CustomViewUpdate mutation and return a CustomViewPayload
   *
   * @param input - required input to pass to customViewUpdate
   * @param id - required id to pass to customViewUpdate
   * @returns parsed response from CustomViewUpdateMutation
   */
  public async fetch(input: D.CustomViewUpdateInput, id: string): Fetch<CustomViewPayload> {
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
 * A fetchable CustomViewDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class CustomViewDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CustomViewDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to customViewDelete
   * @returns parsed response from CustomViewDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.CustomViewDeleteMutation, D.CustomViewDeleteMutationVariables>(D.CustomViewDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.customViewDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the CycleCreate mutation and return a CyclePayload
   *
   * @param input - required input to pass to cycleCreate
   * @returns parsed response from CycleCreateMutation
   */
  public async fetch(input: D.CycleCreateInput): Fetch<CyclePayload> {
    return this._request<D.CycleCreateMutation, D.CycleCreateMutationVariables>(D.CycleCreateDocument, {
      input,
    }).then(response => {
      const data = response?.cycleCreate;
      return data ? new CyclePayload(this._request, data) : undefined;
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
   * Call the CycleUpdate mutation and return a CyclePayload
   *
   * @param input - required input to pass to cycleUpdate
   * @param id - required id to pass to cycleUpdate
   * @returns parsed response from CycleUpdateMutation
   */
  public async fetch(input: D.CycleUpdateInput, id: string): Fetch<CyclePayload> {
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
 * A fetchable CycleArchive Mutation
 *
 * @param request - function to call the graphql client
 */
class CycleArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the CycleArchive mutation and return a ArchivePayload
   *
   * @param id - required id to pass to cycleArchive
   * @returns parsed response from CycleArchiveMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.CycleArchiveMutation, D.CycleArchiveMutationVariables>(D.CycleArchiveDocument, {
      id,
    }).then(response => {
      const data = response?.cycleArchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the DebugFailWithInternalError mutation and return a DebugPayload
   *
   * @returns parsed response from DebugFailWithInternalErrorMutation
   */
  public async fetch(): Fetch<DebugPayload> {
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
 * A fetchable DebugFailWithWarning Mutation
 *
 * @param request - function to call the graphql client
 */
class DebugFailWithWarningMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the DebugFailWithWarning mutation and return a DebugPayload
   *
   * @returns parsed response from DebugFailWithWarningMutation
   */
  public async fetch(): Fetch<DebugPayload> {
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
 * A fetchable DebugCreateSamlOrg Mutation
 *
 * @param request - function to call the graphql client
 */
class DebugCreateSamlOrgMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the DebugCreateSamlOrg mutation and return a DebugPayload
   *
   * @returns parsed response from DebugCreateSamlOrgMutation
   */
  public async fetch(): Fetch<DebugPayload> {
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
 * A fetchable EmailUnsubscribe Mutation
 *
 * @param request - function to call the graphql client
 */
class EmailUnsubscribeMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the EmailUnsubscribe mutation and return a EmailUnsubscribePayload
   *
   * @param input - required input to pass to emailUnsubscribe
   * @returns parsed response from EmailUnsubscribeMutation
   */
  public async fetch(input: D.EmailUnsubscribeInput): Fetch<EmailUnsubscribePayload> {
    return this._request<D.EmailUnsubscribeMutation, D.EmailUnsubscribeMutationVariables>(D.EmailUnsubscribeDocument, {
      input,
    }).then(response => {
      const data = response?.emailUnsubscribe;
      return data ? new EmailUnsubscribePayload(this._request, data) : undefined;
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
   * Call the EmojiCreate mutation and return a EmojiPayload
   *
   * @param input - required input to pass to emojiCreate
   * @returns parsed response from EmojiCreateMutation
   */
  public async fetch(input: D.EmojiCreateInput): Fetch<EmojiPayload> {
    return this._request<D.EmojiCreateMutation, D.EmojiCreateMutationVariables>(D.EmojiCreateDocument, {
      input,
    }).then(response => {
      const data = response?.emojiCreate;
      return data ? new EmojiPayload(this._request, data) : undefined;
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
   * Call the EmojiDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to emojiDelete
   * @returns parsed response from EmojiDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.EmojiDeleteMutation, D.EmojiDeleteMutationVariables>(D.EmojiDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.emojiDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the FavoriteCreate mutation and return a FavoritePayload
   *
   * @param input - required input to pass to favoriteCreate
   * @returns parsed response from FavoriteCreateMutation
   */
  public async fetch(input: D.FavoriteCreateInput): Fetch<FavoritePayload> {
    return this._request<D.FavoriteCreateMutation, D.FavoriteCreateMutationVariables>(D.FavoriteCreateDocument, {
      input,
    }).then(response => {
      const data = response?.favoriteCreate;
      return data ? new FavoritePayload(this._request, data) : undefined;
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
   * Call the FavoriteUpdate mutation and return a FavoritePayload
   *
   * @param input - required input to pass to favoriteUpdate
   * @param id - required id to pass to favoriteUpdate
   * @returns parsed response from FavoriteUpdateMutation
   */
  public async fetch(input: D.FavoriteUpdateInput, id: string): Fetch<FavoritePayload> {
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
 * A fetchable FavoriteDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class FavoriteDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the FavoriteDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to favoriteDelete
   * @returns parsed response from FavoriteDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.FavoriteDeleteMutation, D.FavoriteDeleteMutationVariables>(D.FavoriteDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.favoriteDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the FeedbackCreate mutation and return a FeedbackPayload
   *
   * @param input - required input to pass to feedbackCreate
   * @returns parsed response from FeedbackCreateMutation
   */
  public async fetch(input: D.FeedbackCreateInput): Fetch<FeedbackPayload> {
    return this._request<D.FeedbackCreateMutation, D.FeedbackCreateMutationVariables>(D.FeedbackCreateDocument, {
      input,
    }).then(response => {
      const data = response?.feedbackCreate;
      return data ? new FeedbackPayload(this._request, data) : undefined;
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
   * Call the FileUpload mutation and return a UploadPayload
   *
   * @param size - required size to pass to fileUpload
   * @param contentType - required contentType to pass to fileUpload
   * @param filename - required filename to pass to fileUpload
   * @param variables - variables without 'size', 'contentType', 'filename' to pass into the FileUploadMutation
   * @returns parsed response from FileUploadMutation
   */
  public async fetch(
    size: number,
    contentType: string,
    filename: string,
    variables?: Omit<D.FileUploadMutationVariables, "size" | "contentType" | "filename">
  ): Fetch<UploadPayload> {
    return this._request<D.FileUploadMutation, D.FileUploadMutationVariables>(D.FileUploadDocument, {
      size,
      contentType,
      filename,
      ...variables,
    }).then(response => {
      const data = response?.fileUpload;
      return data ? new UploadPayload(this._request, data) : undefined;
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
   * Call the ImageUploadFromUrl mutation and return a ImageUploadFromUrlPayload
   *
   * @param url - required url to pass to imageUploadFromUrl
   * @returns parsed response from ImageUploadFromUrlMutation
   */
  public async fetch(url: string): Fetch<ImageUploadFromUrlPayload> {
    return this._request<D.ImageUploadFromUrlMutation, D.ImageUploadFromUrlMutationVariables>(
      D.ImageUploadFromUrlDocument,
      {
        url,
      }
    ).then(response => {
      const data = response?.imageUploadFromUrl;
      return data ? new ImageUploadFromUrlPayload(this._request, data) : undefined;
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
   * Call the IntegrationGithubConnect mutation and return a IntegrationPayload
   *
   * @param installationId - required installationId to pass to integrationGithubConnect
   * @returns parsed response from IntegrationGithubConnectMutation
   */
  public async fetch(installationId: string): Fetch<IntegrationPayload> {
    return this._request<D.IntegrationGithubConnectMutation, D.IntegrationGithubConnectMutationVariables>(
      D.IntegrationGithubConnectDocument,
      {
        installationId,
      }
    ).then(response => {
      const data = response?.integrationGithubConnect;
      return data ? new IntegrationPayload(this._request, data) : undefined;
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
   * Call the IntegrationGitlabConnect mutation and return a IntegrationPayload
   *
   * @param gitlabUrl - required gitlabUrl to pass to integrationGitlabConnect
   * @param accessToken - required accessToken to pass to integrationGitlabConnect
   * @returns parsed response from IntegrationGitlabConnectMutation
   */
  public async fetch(gitlabUrl: string, accessToken: string): Fetch<IntegrationPayload> {
    return this._request<D.IntegrationGitlabConnectMutation, D.IntegrationGitlabConnectMutationVariables>(
      D.IntegrationGitlabConnectDocument,
      {
        gitlabUrl,
        accessToken,
      }
    ).then(response => {
      const data = response?.integrationGitlabConnect;
      return data ? new IntegrationPayload(this._request, data) : undefined;
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
   * Call the IntegrationSlack mutation and return a IntegrationPayload
   *
   * @param redirectUri - required redirectUri to pass to integrationSlack
   * @param code - required code to pass to integrationSlack
   * @param variables - variables without 'redirectUri', 'code' to pass into the IntegrationSlackMutation
   * @returns parsed response from IntegrationSlackMutation
   */
  public async fetch(
    redirectUri: string,
    code: string,
    variables?: Omit<D.IntegrationSlackMutationVariables, "redirectUri" | "code">
  ): Fetch<IntegrationPayload> {
    return this._request<D.IntegrationSlackMutation, D.IntegrationSlackMutationVariables>(D.IntegrationSlackDocument, {
      redirectUri,
      code,
      ...variables,
    }).then(response => {
      const data = response?.integrationSlack;
      return data ? new IntegrationPayload(this._request, data) : undefined;
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
   * Call the IntegrationSlackPersonal mutation and return a IntegrationPayload
   *
   * @param redirectUri - required redirectUri to pass to integrationSlackPersonal
   * @param code - required code to pass to integrationSlackPersonal
   * @returns parsed response from IntegrationSlackPersonalMutation
   */
  public async fetch(redirectUri: string, code: string): Fetch<IntegrationPayload> {
    return this._request<D.IntegrationSlackPersonalMutation, D.IntegrationSlackPersonalMutationVariables>(
      D.IntegrationSlackPersonalDocument,
      {
        redirectUri,
        code,
      }
    ).then(response => {
      const data = response?.integrationSlackPersonal;
      return data ? new IntegrationPayload(this._request, data) : undefined;
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
   * Call the IntegrationSlackPost mutation and return a IntegrationPayload
   *
   * @param redirectUri - required redirectUri to pass to integrationSlackPost
   * @param teamId - required teamId to pass to integrationSlackPost
   * @param code - required code to pass to integrationSlackPost
   * @param variables - variables without 'redirectUri', 'teamId', 'code' to pass into the IntegrationSlackPostMutation
   * @returns parsed response from IntegrationSlackPostMutation
   */
  public async fetch(
    redirectUri: string,
    teamId: string,
    code: string,
    variables?: Omit<D.IntegrationSlackPostMutationVariables, "redirectUri" | "teamId" | "code">
  ): Fetch<IntegrationPayload> {
    return this._request<D.IntegrationSlackPostMutation, D.IntegrationSlackPostMutationVariables>(
      D.IntegrationSlackPostDocument,
      {
        redirectUri,
        teamId,
        code,
        ...variables,
      }
    ).then(response => {
      const data = response?.integrationSlackPost;
      return data ? new IntegrationPayload(this._request, data) : undefined;
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
   * Call the IntegrationSlackProjectPost mutation and return a IntegrationPayload
   *
   * @param redirectUri - required redirectUri to pass to integrationSlackProjectPost
   * @param projectId - required projectId to pass to integrationSlackProjectPost
   * @param code - required code to pass to integrationSlackProjectPost
   * @returns parsed response from IntegrationSlackProjectPostMutation
   */
  public async fetch(redirectUri: string, projectId: string, code: string): Fetch<IntegrationPayload> {
    return this._request<D.IntegrationSlackProjectPostMutation, D.IntegrationSlackProjectPostMutationVariables>(
      D.IntegrationSlackProjectPostDocument,
      {
        redirectUri,
        projectId,
        code,
      }
    ).then(response => {
      const data = response?.integrationSlackProjectPost;
      return data ? new IntegrationPayload(this._request, data) : undefined;
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
   * Call the IntegrationSlackImportEmojis mutation and return a IntegrationPayload
   *
   * @param redirectUri - required redirectUri to pass to integrationSlackImportEmojis
   * @param code - required code to pass to integrationSlackImportEmojis
   * @returns parsed response from IntegrationSlackImportEmojisMutation
   */
  public async fetch(redirectUri: string, code: string): Fetch<IntegrationPayload> {
    return this._request<D.IntegrationSlackImportEmojisMutation, D.IntegrationSlackImportEmojisMutationVariables>(
      D.IntegrationSlackImportEmojisDocument,
      {
        redirectUri,
        code,
      }
    ).then(response => {
      const data = response?.integrationSlackImportEmojis;
      return data ? new IntegrationPayload(this._request, data) : undefined;
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
   * Call the IntegrationFigma mutation and return a IntegrationPayload
   *
   * @param redirectUri - required redirectUri to pass to integrationFigma
   * @param code - required code to pass to integrationFigma
   * @returns parsed response from IntegrationFigmaMutation
   */
  public async fetch(redirectUri: string, code: string): Fetch<IntegrationPayload> {
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
 * A fetchable IntegrationGoogleSheets Mutation
 *
 * @param request - function to call the graphql client
 */
class IntegrationGoogleSheetsMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IntegrationGoogleSheets mutation and return a IntegrationPayload
   *
   * @param code - required code to pass to integrationGoogleSheets
   * @returns parsed response from IntegrationGoogleSheetsMutation
   */
  public async fetch(code: string): Fetch<IntegrationPayload> {
    return this._request<D.IntegrationGoogleSheetsMutation, D.IntegrationGoogleSheetsMutationVariables>(
      D.IntegrationGoogleSheetsDocument,
      {
        code,
      }
    ).then(response => {
      const data = response?.integrationGoogleSheets;
      return data ? new IntegrationPayload(this._request, data) : undefined;
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
   * Call the RefreshGoogleSheetsData mutation and return a IntegrationPayload
   *
   * @param id - required id to pass to refreshGoogleSheetsData
   * @returns parsed response from RefreshGoogleSheetsDataMutation
   */
  public async fetch(id: string): Fetch<IntegrationPayload> {
    return this._request<D.RefreshGoogleSheetsDataMutation, D.RefreshGoogleSheetsDataMutationVariables>(
      D.RefreshGoogleSheetsDataDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.refreshGoogleSheetsData;
      return data ? new IntegrationPayload(this._request, data) : undefined;
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
   * Call the IntegrationSentryConnect mutation and return a IntegrationPayload
   *
   * @param organizationSlug - required organizationSlug to pass to integrationSentryConnect
   * @param code - required code to pass to integrationSentryConnect
   * @param installationId - required installationId to pass to integrationSentryConnect
   * @returns parsed response from IntegrationSentryConnectMutation
   */
  public async fetch(organizationSlug: string, code: string, installationId: string): Fetch<IntegrationPayload> {
    return this._request<D.IntegrationSentryConnectMutation, D.IntegrationSentryConnectMutationVariables>(
      D.IntegrationSentryConnectDocument,
      {
        organizationSlug,
        code,
        installationId,
      }
    ).then(response => {
      const data = response?.integrationSentryConnect;
      return data ? new IntegrationPayload(this._request, data) : undefined;
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
   * Call the IntegrationDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to integrationDelete
   * @returns parsed response from IntegrationDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.IntegrationDeleteMutation, D.IntegrationDeleteMutationVariables>(
      D.IntegrationDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.integrationDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the IntegrationResourceArchive mutation and return a ArchivePayload
   *
   * @param id - required id to pass to integrationResourceArchive
   * @returns parsed response from IntegrationResourceArchiveMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.IntegrationResourceArchiveMutation, D.IntegrationResourceArchiveMutationVariables>(
      D.IntegrationResourceArchiveDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.integrationResourceArchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the IssueLabelCreate mutation and return a IssueLabelPayload
   *
   * @param input - required input to pass to issueLabelCreate
   * @returns parsed response from IssueLabelCreateMutation
   */
  public async fetch(input: D.IssueLabelCreateInput): Fetch<IssueLabelPayload> {
    return this._request<D.IssueLabelCreateMutation, D.IssueLabelCreateMutationVariables>(D.IssueLabelCreateDocument, {
      input,
    }).then(response => {
      const data = response?.issueLabelCreate;
      return data ? new IssueLabelPayload(this._request, data) : undefined;
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
   * Call the IssueLabelUpdate mutation and return a IssueLabelPayload
   *
   * @param input - required input to pass to issueLabelUpdate
   * @param id - required id to pass to issueLabelUpdate
   * @returns parsed response from IssueLabelUpdateMutation
   */
  public async fetch(input: D.IssueLabelUpdateInput, id: string): Fetch<IssueLabelPayload> {
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
 * A fetchable IssueLabelArchive Mutation
 *
 * @param request - function to call the graphql client
 */
class IssueLabelArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueLabelArchive mutation and return a ArchivePayload
   *
   * @param id - required id to pass to issueLabelArchive
   * @returns parsed response from IssueLabelArchiveMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.IssueLabelArchiveMutation, D.IssueLabelArchiveMutationVariables>(
      D.IssueLabelArchiveDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.issueLabelArchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the IssueRelationCreate mutation and return a IssueRelationPayload
   *
   * @param input - required input to pass to issueRelationCreate
   * @returns parsed response from IssueRelationCreateMutation
   */
  public async fetch(input: D.IssueRelationCreateInput): Fetch<IssueRelationPayload> {
    return this._request<D.IssueRelationCreateMutation, D.IssueRelationCreateMutationVariables>(
      D.IssueRelationCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.issueRelationCreate;
      return data ? new IssueRelationPayload(this._request, data) : undefined;
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
   * Call the IssueRelationUpdate mutation and return a IssueRelationPayload
   *
   * @param input - required input to pass to issueRelationUpdate
   * @param id - required id to pass to issueRelationUpdate
   * @returns parsed response from IssueRelationUpdateMutation
   */
  public async fetch(input: D.IssueRelationUpdateInput, id: string): Fetch<IssueRelationPayload> {
    return this._request<D.IssueRelationUpdateMutation, D.IssueRelationUpdateMutationVariables>(
      D.IssueRelationUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.issueRelationUpdate;
      return data ? new IssueRelationPayload(this._request, data) : undefined;
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
   * Call the IssueRelationDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to issueRelationDelete
   * @returns parsed response from IssueRelationDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.IssueRelationDeleteMutation, D.IssueRelationDeleteMutationVariables>(
      D.IssueRelationDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.issueRelationDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the IssueCreate mutation and return a IssuePayload
   *
   * @param input - required input to pass to issueCreate
   * @returns parsed response from IssueCreateMutation
   */
  public async fetch(input: D.IssueCreateInput): Fetch<IssuePayload> {
    return this._request<D.IssueCreateMutation, D.IssueCreateMutationVariables>(D.IssueCreateDocument, {
      input,
    }).then(response => {
      const data = response?.issueCreate;
      return data ? new IssuePayload(this._request, data) : undefined;
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
   * Call the IssueUpdate mutation and return a IssuePayload
   *
   * @param input - required input to pass to issueUpdate
   * @param id - required id to pass to issueUpdate
   * @returns parsed response from IssueUpdateMutation
   */
  public async fetch(input: D.IssueUpdateInput, id: string): Fetch<IssuePayload> {
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
 * A fetchable IssueArchive Mutation
 *
 * @param request - function to call the graphql client
 */
class IssueArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the IssueArchive mutation and return a ArchivePayload
   *
   * @param id - required id to pass to issueArchive
   * @returns parsed response from IssueArchiveMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.IssueArchiveMutation, D.IssueArchiveMutationVariables>(D.IssueArchiveDocument, {
      id,
    }).then(response => {
      const data = response?.issueArchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the IssueUnarchive mutation and return a ArchivePayload
   *
   * @param id - required id to pass to issueUnarchive
   * @returns parsed response from IssueUnarchiveMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.IssueUnarchiveMutation, D.IssueUnarchiveMutationVariables>(D.IssueUnarchiveDocument, {
      id,
    }).then(response => {
      const data = response?.issueUnarchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the MilestoneCreate mutation and return a MilestonePayload
   *
   * @param input - required input to pass to milestoneCreate
   * @returns parsed response from MilestoneCreateMutation
   */
  public async fetch(input: D.MilestoneCreateInput): Fetch<MilestonePayload> {
    return this._request<D.MilestoneCreateMutation, D.MilestoneCreateMutationVariables>(D.MilestoneCreateDocument, {
      input,
    }).then(response => {
      const data = response?.milestoneCreate;
      return data ? new MilestonePayload(this._request, data) : undefined;
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
   * Call the MilestoneUpdate mutation and return a MilestonePayload
   *
   * @param input - required input to pass to milestoneUpdate
   * @param id - required id to pass to milestoneUpdate
   * @returns parsed response from MilestoneUpdateMutation
   */
  public async fetch(input: D.MilestoneUpdateInput, id: string): Fetch<MilestonePayload> {
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
 * A fetchable MilestoneDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class MilestoneDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the MilestoneDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to milestoneDelete
   * @returns parsed response from MilestoneDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.MilestoneDeleteMutation, D.MilestoneDeleteMutationVariables>(D.MilestoneDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.milestoneDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the NotificationCreate mutation and return a NotificationPayload
   *
   * @param input - required input to pass to notificationCreate
   * @param id - required id to pass to notificationCreate
   * @returns parsed response from NotificationCreateMutation
   */
  public async fetch(input: D.NotificationUpdateInput, id: string): Fetch<NotificationPayload> {
    return this._request<D.NotificationCreateMutation, D.NotificationCreateMutationVariables>(
      D.NotificationCreateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.notificationCreate;
      return data ? new NotificationPayload(this._request, data) : undefined;
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
   * Call the NotificationUpdate mutation and return a NotificationPayload
   *
   * @param input - required input to pass to notificationUpdate
   * @param id - required id to pass to notificationUpdate
   * @returns parsed response from NotificationUpdateMutation
   */
  public async fetch(input: D.NotificationUpdateInput, id: string): Fetch<NotificationPayload> {
    return this._request<D.NotificationUpdateMutation, D.NotificationUpdateMutationVariables>(
      D.NotificationUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.notificationUpdate;
      return data ? new NotificationPayload(this._request, data) : undefined;
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
   * Call the NotificationDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to notificationDelete
   * @returns parsed response from NotificationDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.NotificationDeleteMutation, D.NotificationDeleteMutationVariables>(
      D.NotificationDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.notificationDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the NotificationArchive mutation and return a ArchivePayload
   *
   * @param id - required id to pass to notificationArchive
   * @returns parsed response from NotificationArchiveMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.NotificationArchiveMutation, D.NotificationArchiveMutationVariables>(
      D.NotificationArchiveDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.notificationArchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the NotificationUnarchive mutation and return a ArchivePayload
   *
   * @param id - required id to pass to notificationUnarchive
   * @returns parsed response from NotificationUnarchiveMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.NotificationUnarchiveMutation, D.NotificationUnarchiveMutationVariables>(
      D.NotificationUnarchiveDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.notificationUnarchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the NotificationSubscriptionCreate mutation and return a NotificationSubscriptionPayload
   *
   * @param input - required input to pass to notificationSubscriptionCreate
   * @returns parsed response from NotificationSubscriptionCreateMutation
   */
  public async fetch(input: D.NotificationSubscriptionCreateInput): Fetch<NotificationSubscriptionPayload> {
    return this._request<D.NotificationSubscriptionCreateMutation, D.NotificationSubscriptionCreateMutationVariables>(
      D.NotificationSubscriptionCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.notificationSubscriptionCreate;
      return data ? new NotificationSubscriptionPayload(this._request, data) : undefined;
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
   * Call the NotificationSubscriptionDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to notificationSubscriptionDelete
   * @returns parsed response from NotificationSubscriptionDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.NotificationSubscriptionDeleteMutation, D.NotificationSubscriptionDeleteMutationVariables>(
      D.NotificationSubscriptionDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.notificationSubscriptionDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the OauthClientCreate mutation and return a OauthClientPayload
   *
   * @param input - required input to pass to oauthClientCreate
   * @returns parsed response from OauthClientCreateMutation
   */
  public async fetch(input: D.OauthClientCreateInput): Fetch<OauthClientPayload> {
    return this._request<D.OauthClientCreateMutation, D.OauthClientCreateMutationVariables>(
      D.OauthClientCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.oauthClientCreate;
      return data ? new OauthClientPayload(this._request, data) : undefined;
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
   * Call the OauthClientUpdate mutation and return a OauthClientPayload
   *
   * @param input - required input to pass to oauthClientUpdate
   * @param id - required id to pass to oauthClientUpdate
   * @returns parsed response from OauthClientUpdateMutation
   */
  public async fetch(input: D.OauthClientUpdateInput, id: string): Fetch<OauthClientPayload> {
    return this._request<D.OauthClientUpdateMutation, D.OauthClientUpdateMutationVariables>(
      D.OauthClientUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.oauthClientUpdate;
      return data ? new OauthClientPayload(this._request, data) : undefined;
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
   * Call the OauthClientArchive mutation and return a ArchivePayload
   *
   * @param id - required id to pass to oauthClientArchive
   * @returns parsed response from OauthClientArchiveMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.OauthClientArchiveMutation, D.OauthClientArchiveMutationVariables>(
      D.OauthClientArchiveDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.oauthClientArchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the OauthClientRotateSecret mutation and return a RotateSecretPayload
   *
   * @param id - required id to pass to oauthClientRotateSecret
   * @returns parsed response from OauthClientRotateSecretMutation
   */
  public async fetch(id: string): Fetch<RotateSecretPayload> {
    return this._request<D.OauthClientRotateSecretMutation, D.OauthClientRotateSecretMutationVariables>(
      D.OauthClientRotateSecretDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.oauthClientRotateSecret;
      return data ? new RotateSecretPayload(this._request, data) : undefined;
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
   * Call the OauthTokenRevoke mutation and return a OauthTokenRevokePayload
   *
   * @param scope - required scope to pass to oauthTokenRevoke
   * @param appId - required appId to pass to oauthTokenRevoke
   * @returns parsed response from OauthTokenRevokeMutation
   */
  public async fetch(scope: string[], appId: string): Fetch<OauthTokenRevokePayload> {
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
 * A fetchable OrganizationDomainVerify Mutation
 *
 * @param request - function to call the graphql client
 */
class OrganizationDomainVerifyMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the OrganizationDomainVerify mutation and return a OrganizationDomainPayload
   *
   * @param input - required input to pass to organizationDomainVerify
   * @returns parsed response from OrganizationDomainVerifyMutation
   */
  public async fetch(input: D.OrganizationDomainVerificationInput): Fetch<OrganizationDomainPayload> {
    return this._request<D.OrganizationDomainVerifyMutation, D.OrganizationDomainVerifyMutationVariables>(
      D.OrganizationDomainVerifyDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.organizationDomainVerify;
      return data ? new OrganizationDomainPayload(this._request, data) : undefined;
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
   * Call the OrganizationDomainCreate mutation and return a OrganizationDomainPayload
   *
   * @param input - required input to pass to organizationDomainCreate
   * @returns parsed response from OrganizationDomainCreateMutation
   */
  public async fetch(input: D.OrganizationDomainCreateInput): Fetch<OrganizationDomainPayload> {
    return this._request<D.OrganizationDomainCreateMutation, D.OrganizationDomainCreateMutationVariables>(
      D.OrganizationDomainCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.organizationDomainCreate;
      return data ? new OrganizationDomainPayload(this._request, data) : undefined;
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
   * Call the OrganizationDomainDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to organizationDomainDelete
   * @returns parsed response from OrganizationDomainDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.OrganizationDomainDeleteMutation, D.OrganizationDomainDeleteMutationVariables>(
      D.OrganizationDomainDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.organizationDomainDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the OrganizationInviteCreate mutation and return a OrganizationInvitePayload
   *
   * @param input - required input to pass to organizationInviteCreate
   * @returns parsed response from OrganizationInviteCreateMutation
   */
  public async fetch(input: D.OrganizationInviteCreateInput): Fetch<OrganizationInvitePayload> {
    return this._request<D.OrganizationInviteCreateMutation, D.OrganizationInviteCreateMutationVariables>(
      D.OrganizationInviteCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.organizationInviteCreate;
      return data ? new OrganizationInvitePayload(this._request, data) : undefined;
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
   * Call the ResentOrganizationInvite mutation and return a ArchivePayload
   *
   * @param id - required id to pass to resentOrganizationInvite
   * @returns parsed response from ResentOrganizationInviteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.ResentOrganizationInviteMutation, D.ResentOrganizationInviteMutationVariables>(
      D.ResentOrganizationInviteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.resentOrganizationInvite;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the OrganizationInviteDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to organizationInviteDelete
   * @returns parsed response from OrganizationInviteDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.OrganizationInviteDeleteMutation, D.OrganizationInviteDeleteMutationVariables>(
      D.OrganizationInviteDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.organizationInviteDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the ProjectLinkCreate mutation and return a ProjectLinkPayload
   *
   * @param input - required input to pass to projectLinkCreate
   * @returns parsed response from ProjectLinkCreateMutation
   */
  public async fetch(input: D.ProjectLinkCreateInput): Fetch<ProjectLinkPayload> {
    return this._request<D.ProjectLinkCreateMutation, D.ProjectLinkCreateMutationVariables>(
      D.ProjectLinkCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.projectLinkCreate;
      return data ? new ProjectLinkPayload(this._request, data) : undefined;
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
   * Call the ProjectLinkDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to projectLinkDelete
   * @returns parsed response from ProjectLinkDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.ProjectLinkDeleteMutation, D.ProjectLinkDeleteMutationVariables>(
      D.ProjectLinkDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.projectLinkDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the ProjectCreate mutation and return a ProjectPayload
   *
   * @param input - required input to pass to projectCreate
   * @returns parsed response from ProjectCreateMutation
   */
  public async fetch(input: D.ProjectCreateInput): Fetch<ProjectPayload> {
    return this._request<D.ProjectCreateMutation, D.ProjectCreateMutationVariables>(D.ProjectCreateDocument, {
      input,
    }).then(response => {
      const data = response?.projectCreate;
      return data ? new ProjectPayload(this._request, data) : undefined;
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
   * Call the ProjectUpdate mutation and return a ProjectPayload
   *
   * @param input - required input to pass to projectUpdate
   * @param id - required id to pass to projectUpdate
   * @returns parsed response from ProjectUpdateMutation
   */
  public async fetch(input: D.ProjectUpdateInput, id: string): Fetch<ProjectPayload> {
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
 * A fetchable ProjectArchive Mutation
 *
 * @param request - function to call the graphql client
 */
class ProjectArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ProjectArchive mutation and return a ArchivePayload
   *
   * @param id - required id to pass to projectArchive
   * @returns parsed response from ProjectArchiveMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.ProjectArchiveMutation, D.ProjectArchiveMutationVariables>(D.ProjectArchiveDocument, {
      id,
    }).then(response => {
      const data = response?.projectArchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the PushSubscriptionCreate mutation and return a PushSubscriptionPayload
   *
   * @param input - required input to pass to pushSubscriptionCreate
   * @returns parsed response from PushSubscriptionCreateMutation
   */
  public async fetch(input: D.PushSubscriptionCreateInput): Fetch<PushSubscriptionPayload> {
    return this._request<D.PushSubscriptionCreateMutation, D.PushSubscriptionCreateMutationVariables>(
      D.PushSubscriptionCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.pushSubscriptionCreate;
      return data ? new PushSubscriptionPayload(this._request, data) : undefined;
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
   * Call the PushSubscriptionDelete mutation and return a PushSubscriptionPayload
   *
   * @param id - required id to pass to pushSubscriptionDelete
   * @returns parsed response from PushSubscriptionDeleteMutation
   */
  public async fetch(id: string): Fetch<PushSubscriptionPayload> {
    return this._request<D.PushSubscriptionDeleteMutation, D.PushSubscriptionDeleteMutationVariables>(
      D.PushSubscriptionDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.pushSubscriptionDelete;
      return data ? new PushSubscriptionPayload(this._request, data) : undefined;
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
   * Call the ReactionCreate mutation and return a ReactionPayload
   *
   * @param input - required input to pass to reactionCreate
   * @returns parsed response from ReactionCreateMutation
   */
  public async fetch(input: D.ReactionCreateInput): Fetch<ReactionPayload> {
    return this._request<D.ReactionCreateMutation, D.ReactionCreateMutationVariables>(D.ReactionCreateDocument, {
      input,
    }).then(response => {
      const data = response?.reactionCreate;
      return data ? new ReactionPayload(this._request, data) : undefined;
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
   * Call the ReactionDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to reactionDelete
   * @returns parsed response from ReactionDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.ReactionDeleteMutation, D.ReactionDeleteMutationVariables>(D.ReactionDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.reactionDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the CreateCsvExportReport mutation and return a CreateCsvExportReportPayload
   *
   * @returns parsed response from CreateCsvExportReportMutation
   */
  public async fetch(): Fetch<CreateCsvExportReportPayload> {
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
 * A fetchable SubscriptionSessionCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class SubscriptionSessionCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the SubscriptionSessionCreate mutation and return a SubscriptionSessionPayload
   *
   * @param plan - required plan to pass to subscriptionSessionCreate
   * @returns parsed response from SubscriptionSessionCreateMutation
   */
  public async fetch(plan: string): Fetch<SubscriptionSessionPayload> {
    return this._request<D.SubscriptionSessionCreateMutation, D.SubscriptionSessionCreateMutationVariables>(
      D.SubscriptionSessionCreateDocument,
      {
        plan,
      }
    ).then(response => {
      const data = response?.subscriptionSessionCreate;
      return data ? new SubscriptionSessionPayload(this._request, data) : undefined;
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
   * Call the SubscriptionUpdateSessionCreate mutation and return a SubscriptionSessionPayload
   *
   * @returns parsed response from SubscriptionUpdateSessionCreateMutation
   */
  public async fetch(): Fetch<SubscriptionSessionPayload> {
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
 * A fetchable SubscriptionUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class SubscriptionUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the SubscriptionUpdate mutation and return a SubscriptionPayload
   *
   * @param input - required input to pass to subscriptionUpdate
   * @param id - required id to pass to subscriptionUpdate
   * @returns parsed response from SubscriptionUpdateMutation
   */
  public async fetch(input: D.SubscriptionUpdateInput, id: string): Fetch<SubscriptionPayload> {
    return this._request<D.SubscriptionUpdateMutation, D.SubscriptionUpdateMutationVariables>(
      D.SubscriptionUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.subscriptionUpdate;
      return data ? new SubscriptionPayload(this._request, data) : undefined;
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
   * Call the SubscriptionUpgrade mutation and return a SubscriptionPayload
   *
   * @param type - required type to pass to subscriptionUpgrade
   * @param id - required id to pass to subscriptionUpgrade
   * @returns parsed response from SubscriptionUpgradeMutation
   */
  public async fetch(type: string, id: string): Fetch<SubscriptionPayload> {
    return this._request<D.SubscriptionUpgradeMutation, D.SubscriptionUpgradeMutationVariables>(
      D.SubscriptionUpgradeDocument,
      {
        type,
        id,
      }
    ).then(response => {
      const data = response?.subscriptionUpgrade;
      return data ? new SubscriptionPayload(this._request, data) : undefined;
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
   * Call the SubscriptionArchive mutation and return a ArchivePayload
   *
   * @param id - required id to pass to subscriptionArchive
   * @returns parsed response from SubscriptionArchiveMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.SubscriptionArchiveMutation, D.SubscriptionArchiveMutationVariables>(
      D.SubscriptionArchiveDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.subscriptionArchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the TeamMembershipCreate mutation and return a TeamMembershipPayload
   *
   * @param input - required input to pass to teamMembershipCreate
   * @returns parsed response from TeamMembershipCreateMutation
   */
  public async fetch(input: D.TeamMembershipCreateInput): Fetch<TeamMembershipPayload> {
    return this._request<D.TeamMembershipCreateMutation, D.TeamMembershipCreateMutationVariables>(
      D.TeamMembershipCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.teamMembershipCreate;
      return data ? new TeamMembershipPayload(this._request, data) : undefined;
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
   * Call the TeamMembershipDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to teamMembershipDelete
   * @returns parsed response from TeamMembershipDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.TeamMembershipDeleteMutation, D.TeamMembershipDeleteMutationVariables>(
      D.TeamMembershipDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.teamMembershipDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the TeamCreate mutation and return a TeamPayload
   *
   * @param input - required input to pass to teamCreate
   * @param variables - variables without 'input' to pass into the TeamCreateMutation
   * @returns parsed response from TeamCreateMutation
   */
  public async fetch(
    input: D.TeamCreateInput,
    variables?: Omit<D.TeamCreateMutationVariables, "input">
  ): Fetch<TeamPayload> {
    return this._request<D.TeamCreateMutation, D.TeamCreateMutationVariables>(D.TeamCreateDocument, {
      input,
      ...variables,
    }).then(response => {
      const data = response?.teamCreate;
      return data ? new TeamPayload(this._request, data) : undefined;
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
   * Call the TeamUpdate mutation and return a TeamPayload
   *
   * @param input - required input to pass to teamUpdate
   * @param id - required id to pass to teamUpdate
   * @returns parsed response from TeamUpdateMutation
   */
  public async fetch(input: D.TeamUpdateInput, id: string): Fetch<TeamPayload> {
    return this._request<D.TeamUpdateMutation, D.TeamUpdateMutationVariables>(D.TeamUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.teamUpdate;
      return data ? new TeamPayload(this._request, data) : undefined;
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
   * Call the TeamArchive mutation and return a ArchivePayload
   *
   * @param id - required id to pass to teamArchive
   * @returns parsed response from TeamArchiveMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.TeamArchiveMutation, D.TeamArchiveMutationVariables>(D.TeamArchiveDocument, {
      id,
    }).then(response => {
      const data = response?.teamArchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the TeamDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to teamDelete
   * @returns parsed response from TeamDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.TeamDeleteMutation, D.TeamDeleteMutationVariables>(D.TeamDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.teamDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the TemplateCreate mutation and return a TemplatePayload
   *
   * @param input - required input to pass to templateCreate
   * @returns parsed response from TemplateCreateMutation
   */
  public async fetch(input: D.TemplateCreateInput): Fetch<TemplatePayload> {
    return this._request<D.TemplateCreateMutation, D.TemplateCreateMutationVariables>(D.TemplateCreateDocument, {
      input,
    }).then(response => {
      const data = response?.templateCreate;
      return data ? new TemplatePayload(this._request, data) : undefined;
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
   * Call the TemplateUpdate mutation and return a TemplatePayload
   *
   * @param input - required input to pass to templateUpdate
   * @param id - required id to pass to templateUpdate
   * @returns parsed response from TemplateUpdateMutation
   */
  public async fetch(input: D.TemplateUpdateInput, id: string): Fetch<TemplatePayload> {
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
 * A fetchable TemplateDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class TemplateDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the TemplateDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to templateDelete
   * @returns parsed response from TemplateDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.TemplateDeleteMutation, D.TemplateDeleteMutationVariables>(D.TemplateDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.templateDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the UserSettingsUpdate mutation and return a UserSettingsPayload
   *
   * @param input - required input to pass to userSettingsUpdate
   * @param id - required id to pass to userSettingsUpdate
   * @returns parsed response from UserSettingsUpdateMutation
   */
  public async fetch(input: D.UserSettingsUpdateInput, id: string): Fetch<UserSettingsPayload> {
    return this._request<D.UserSettingsUpdateMutation, D.UserSettingsUpdateMutationVariables>(
      D.UserSettingsUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.userSettingsUpdate;
      return data ? new UserSettingsPayload(this._request, data) : undefined;
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
   * Call the UserSettingsFlagIncrement mutation and return a UserSettingsFlagPayload
   *
   * @param flag - required flag to pass to userSettingsFlagIncrement
   * @returns parsed response from UserSettingsFlagIncrementMutation
   */
  public async fetch(flag: string): Fetch<UserSettingsFlagPayload> {
    return this._request<D.UserSettingsFlagIncrementMutation, D.UserSettingsFlagIncrementMutationVariables>(
      D.UserSettingsFlagIncrementDocument,
      {
        flag,
      }
    ).then(response => {
      const data = response?.userSettingsFlagIncrement;
      return data ? new UserSettingsFlagPayload(this._request, data) : undefined;
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
   * Call the UserSettingsFlagsReset mutation and return a UserSettingsFlagsResetPayload
   *
   * @returns parsed response from UserSettingsFlagsResetMutation
   */
  public async fetch(): Fetch<UserSettingsFlagsResetPayload> {
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
 * A fetchable UserFlagUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
class UserFlagUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the UserFlagUpdate mutation and return a UserSettingsFlagPayload
   *
   * @param operation - required operation to pass to userFlagUpdate
   * @param flag - required flag to pass to userFlagUpdate
   * @returns parsed response from UserFlagUpdateMutation
   */
  public async fetch(operation: D.UserFlagUpdateOperation, flag: D.UserFlagType): Fetch<UserSettingsFlagPayload> {
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
 * A fetchable UserSubscribeToNewsletter Mutation
 *
 * @param request - function to call the graphql client
 */
class UserSubscribeToNewsletterMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the UserSubscribeToNewsletter mutation and return a UserSubscribeToNewsletterPayload
   *
   * @returns parsed response from UserSubscribeToNewsletterMutation
   */
  public async fetch(): Fetch<UserSubscribeToNewsletterPayload> {
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
 * A fetchable ViewPreferencesCreate Mutation
 *
 * @param request - function to call the graphql client
 */
class ViewPreferencesCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the ViewPreferencesCreate mutation and return a ViewPreferencesPayload
   *
   * @param input - required input to pass to viewPreferencesCreate
   * @returns parsed response from ViewPreferencesCreateMutation
   */
  public async fetch(input: D.ViewPreferencesCreateInput): Fetch<ViewPreferencesPayload> {
    return this._request<D.ViewPreferencesCreateMutation, D.ViewPreferencesCreateMutationVariables>(
      D.ViewPreferencesCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.viewPreferencesCreate;
      return data ? new ViewPreferencesPayload(this._request, data) : undefined;
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
   * Call the ViewPreferencesUpdate mutation and return a ViewPreferencesPayload
   *
   * @param input - required input to pass to viewPreferencesUpdate
   * @param id - required id to pass to viewPreferencesUpdate
   * @returns parsed response from ViewPreferencesUpdateMutation
   */
  public async fetch(input: D.ViewPreferencesUpdateInput, id: string): Fetch<ViewPreferencesPayload> {
    return this._request<D.ViewPreferencesUpdateMutation, D.ViewPreferencesUpdateMutationVariables>(
      D.ViewPreferencesUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.viewPreferencesUpdate;
      return data ? new ViewPreferencesPayload(this._request, data) : undefined;
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
   * Call the ViewPreferencesDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to viewPreferencesDelete
   * @returns parsed response from ViewPreferencesDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.ViewPreferencesDeleteMutation, D.ViewPreferencesDeleteMutationVariables>(
      D.ViewPreferencesDeleteDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.viewPreferencesDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the WebhookCreate mutation and return a WebhookPayload
   *
   * @param input - required input to pass to webhookCreate
   * @returns parsed response from WebhookCreateMutation
   */
  public async fetch(input: D.WebhookCreateInput): Fetch<WebhookPayload> {
    return this._request<D.WebhookCreateMutation, D.WebhookCreateMutationVariables>(D.WebhookCreateDocument, {
      input,
    }).then(response => {
      const data = response?.webhookCreate;
      return data ? new WebhookPayload(this._request, data) : undefined;
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
   * Call the WebhookUpdate mutation and return a WebhookPayload
   *
   * @param input - required input to pass to webhookUpdate
   * @param id - required id to pass to webhookUpdate
   * @returns parsed response from WebhookUpdateMutation
   */
  public async fetch(input: D.WebhookUpdateInput, id: string): Fetch<WebhookPayload> {
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
 * A fetchable WebhookDelete Mutation
 *
 * @param request - function to call the graphql client
 */
class WebhookDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  /**
   * Call the WebhookDelete mutation and return a ArchivePayload
   *
   * @param id - required id to pass to webhookDelete
   * @returns parsed response from WebhookDeleteMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.WebhookDeleteMutation, D.WebhookDeleteMutationVariables>(D.WebhookDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.webhookDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
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
   * Call the WorkflowStateCreate mutation and return a WorkflowStatePayload
   *
   * @param input - required input to pass to workflowStateCreate
   * @returns parsed response from WorkflowStateCreateMutation
   */
  public async fetch(input: D.WorkflowStateCreateInput): Fetch<WorkflowStatePayload> {
    return this._request<D.WorkflowStateCreateMutation, D.WorkflowStateCreateMutationVariables>(
      D.WorkflowStateCreateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.workflowStateCreate;
      return data ? new WorkflowStatePayload(this._request, data) : undefined;
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
   * Call the WorkflowStateUpdate mutation and return a WorkflowStatePayload
   *
   * @param input - required input to pass to workflowStateUpdate
   * @param id - required id to pass to workflowStateUpdate
   * @returns parsed response from WorkflowStateUpdateMutation
   */
  public async fetch(input: D.WorkflowStateUpdateInput, id: string): Fetch<WorkflowStatePayload> {
    return this._request<D.WorkflowStateUpdateMutation, D.WorkflowStateUpdateMutationVariables>(
      D.WorkflowStateUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.workflowStateUpdate;
      return data ? new WorkflowStatePayload(this._request, data) : undefined;
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
   * Call the WorkflowStateArchive mutation and return a ArchivePayload
   *
   * @param id - required id to pass to workflowStateArchive
   * @returns parsed response from WorkflowStateArchiveMutation
   */
  public async fetch(id: string): Fetch<ArchivePayload> {
    return this._request<D.WorkflowStateArchiveMutation, D.WorkflowStateArchiveMutationVariables>(
      D.WorkflowStateArchiveDocument,
      {
        id,
      }
    ).then(response => {
      const data = response?.workflowStateArchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable User_AssignedIssues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to user
 */
class User_AssignedIssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the User_AssignedIssues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the User_AssignedIssuesQuery
   * @returns parsed response from User_AssignedIssuesQuery
   */
  public async fetch(variables?: Omit<D.User_AssignedIssuesQueryVariables, "id">): Fetch<IssueConnection> {
    return this._request<D.User_AssignedIssuesQuery, D.User_AssignedIssuesQueryVariables>(
      D.User_AssignedIssuesDocument,
      {
        id: this._id,
        ...variables,
      }
    ).then(response => {
      const data = response?.user?.assignedIssues;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable User_CreatedIssues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to user
 */
class User_CreatedIssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the User_CreatedIssues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the User_CreatedIssuesQuery
   * @returns parsed response from User_CreatedIssuesQuery
   */
  public async fetch(variables?: Omit<D.User_CreatedIssuesQueryVariables, "id">): Fetch<IssueConnection> {
    return this._request<D.User_CreatedIssuesQuery, D.User_CreatedIssuesQueryVariables>(D.User_CreatedIssuesDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.user?.createdIssues;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable User_TeamMemberships Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to user
 */
class User_TeamMembershipsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the User_TeamMemberships query and return a TeamMembershipConnection
   *
   * @param variables - variables without 'id' to pass into the User_TeamMembershipsQuery
   * @returns parsed response from User_TeamMembershipsQuery
   */
  public async fetch(variables?: Omit<D.User_TeamMembershipsQueryVariables, "id">): Fetch<TeamMembershipConnection> {
    return this._request<D.User_TeamMembershipsQuery, D.User_TeamMembershipsQueryVariables>(
      D.User_TeamMembershipsDocument,
      {
        id: this._id,
        ...variables,
      }
    ).then(response => {
      const data = response?.user?.teamMemberships;
      return data
        ? new TeamMembershipConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the Viewer_AssignedIssues query and return a IssueConnection
   *
   * @param variables - variables to pass into the Viewer_AssignedIssuesQuery
   * @returns parsed response from Viewer_AssignedIssuesQuery
   */
  public async fetch(variables?: D.Viewer_AssignedIssuesQueryVariables): Fetch<IssueConnection> {
    return this._request<D.Viewer_AssignedIssuesQuery, D.Viewer_AssignedIssuesQueryVariables>(
      D.Viewer_AssignedIssuesDocument,
      variables
    ).then(response => {
      const data = response?.viewer?.assignedIssues;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the Viewer_CreatedIssues query and return a IssueConnection
   *
   * @param variables - variables to pass into the Viewer_CreatedIssuesQuery
   * @returns parsed response from Viewer_CreatedIssuesQuery
   */
  public async fetch(variables?: D.Viewer_CreatedIssuesQueryVariables): Fetch<IssueConnection> {
    return this._request<D.Viewer_CreatedIssuesQuery, D.Viewer_CreatedIssuesQueryVariables>(
      D.Viewer_CreatedIssuesDocument,
      variables
    ).then(response => {
      const data = response?.viewer?.createdIssues;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the Viewer_TeamMemberships query and return a TeamMembershipConnection
   *
   * @param variables - variables to pass into the Viewer_TeamMembershipsQuery
   * @returns parsed response from Viewer_TeamMembershipsQuery
   */
  public async fetch(variables?: D.Viewer_TeamMembershipsQueryVariables): Fetch<TeamMembershipConnection> {
    return this._request<D.Viewer_TeamMembershipsQuery, D.Viewer_TeamMembershipsQueryVariables>(
      D.Viewer_TeamMembershipsDocument,
      variables
    ).then(response => {
      const data = response?.viewer?.teamMemberships;
      return data
        ? new TeamMembershipConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the Organization_Users query and return a UserConnection
   *
   * @param variables - variables to pass into the Organization_UsersQuery
   * @returns parsed response from Organization_UsersQuery
   */
  public async fetch(variables?: D.Organization_UsersQueryVariables): Fetch<UserConnection> {
    return this._request<D.Organization_UsersQuery, D.Organization_UsersQueryVariables>(
      D.Organization_UsersDocument,
      variables
    ).then(response => {
      const data = response?.organization?.users;
      return data
        ? new UserConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the Organization_Teams query and return a TeamConnection
   *
   * @param variables - variables to pass into the Organization_TeamsQuery
   * @returns parsed response from Organization_TeamsQuery
   */
  public async fetch(variables?: D.Organization_TeamsQueryVariables): Fetch<TeamConnection> {
    return this._request<D.Organization_TeamsQuery, D.Organization_TeamsQueryVariables>(
      D.Organization_TeamsDocument,
      variables
    ).then(response => {
      const data = response?.organization?.teams;
      return data
        ? new TeamConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the Organization_Milestones query and return a MilestoneConnection
   *
   * @param variables - variables to pass into the Organization_MilestonesQuery
   * @returns parsed response from Organization_MilestonesQuery
   */
  public async fetch(variables?: D.Organization_MilestonesQueryVariables): Fetch<MilestoneConnection> {
    return this._request<D.Organization_MilestonesQuery, D.Organization_MilestonesQueryVariables>(
      D.Organization_MilestonesDocument,
      variables
    ).then(response => {
      const data = response?.organization?.milestones;
      return data
        ? new MilestoneConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the Organization_Integrations query and return a IntegrationConnection
   *
   * @param variables - variables to pass into the Organization_IntegrationsQuery
   * @returns parsed response from Organization_IntegrationsQuery
   */
  public async fetch(variables?: D.Organization_IntegrationsQueryVariables): Fetch<IntegrationConnection> {
    return this._request<D.Organization_IntegrationsQuery, D.Organization_IntegrationsQueryVariables>(
      D.Organization_IntegrationsDocument,
      variables
    ).then(response => {
      const data = response?.organization?.integrations;
      return data
        ? new IntegrationConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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
   * Call the BillingDetails_PaymentMethod query and return a Card
   *
   * @returns parsed response from BillingDetails_PaymentMethodQuery
   */
  public async fetch(): Fetch<Card> {
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
 * A fetchable CollaborativeDocumentJoin_Steps Query
 *
 * @param request - function to call the graphql client
 * @param clientId - required clientId to pass to collaborativeDocumentJoin
 * @param issueId - required issueId to pass to collaborativeDocumentJoin
 * @param version - required version to pass to collaborativeDocumentJoin
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
   * Call the CollaborativeDocumentJoin_Steps query and return a StepsResponse
   *
   * @returns parsed response from CollaborativeDocumentJoin_StepsQuery
   */
  public async fetch(): Fetch<StepsResponse> {
    return this._request<D.CollaborativeDocumentJoin_StepsQuery, D.CollaborativeDocumentJoin_StepsQueryVariables>(
      D.CollaborativeDocumentJoin_StepsDocument,
      {
        clientId: this._clientId,
        issueId: this._issueId,
        version: this._version,
      }
    ).then(response => {
      const data = response?.collaborativeDocumentJoin?.steps;
      return data ? new StepsResponse(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable Cycle_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to cycle
 */
class Cycle_IssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Cycle_Issues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the Cycle_IssuesQuery
   * @returns parsed response from Cycle_IssuesQuery
   */
  public async fetch(variables?: Omit<D.Cycle_IssuesQueryVariables, "id">): Fetch<IssueConnection> {
    return this._request<D.Cycle_IssuesQuery, D.Cycle_IssuesQueryVariables>(D.Cycle_IssuesDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.cycle?.issues;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Cycle_UncompletedIssuesUponClose Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to cycle
 */
class Cycle_UncompletedIssuesUponCloseQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Cycle_UncompletedIssuesUponClose query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the Cycle_UncompletedIssuesUponCloseQuery
   * @returns parsed response from Cycle_UncompletedIssuesUponCloseQuery
   */
  public async fetch(variables?: Omit<D.Cycle_UncompletedIssuesUponCloseQueryVariables, "id">): Fetch<IssueConnection> {
    return this._request<D.Cycle_UncompletedIssuesUponCloseQuery, D.Cycle_UncompletedIssuesUponCloseQueryVariables>(
      D.Cycle_UncompletedIssuesUponCloseDocument,
      {
        id: this._id,
        ...variables,
      }
    ).then(response => {
      const data = response?.cycle?.uncompletedIssuesUponClose;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable FigmaEmbedInfo_FigmaEmbed Query
 *
 * @param request - function to call the graphql client
 * @param fileId - required fileId to pass to figmaEmbedInfo
 */
class FigmaEmbedInfo_FigmaEmbedQuery extends LinearRequest {
  private _fileId: string;

  public constructor(request: Request, fileId: string) {
    super(request);
    this._fileId = fileId;
  }

  /**
   * Call the FigmaEmbedInfo_FigmaEmbed query and return a FigmaEmbed
   *
   * @param variables - variables without 'fileId' to pass into the FigmaEmbedInfo_FigmaEmbedQuery
   * @returns parsed response from FigmaEmbedInfo_FigmaEmbedQuery
   */
  public async fetch(variables?: Omit<D.FigmaEmbedInfo_FigmaEmbedQueryVariables, "fileId">): Fetch<FigmaEmbed> {
    return this._request<D.FigmaEmbedInfo_FigmaEmbedQuery, D.FigmaEmbedInfo_FigmaEmbedQueryVariables>(
      D.FigmaEmbedInfo_FigmaEmbedDocument,
      {
        fileId: this._fileId,
        ...variables,
      }
    ).then(response => {
      const data = response?.figmaEmbedInfo?.figmaEmbed;
      return data ? new FigmaEmbed(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable Integration_Settings Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integration
 */
class Integration_SettingsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Integration_Settings query and return a IntegrationSettings
   *
   * @returns parsed response from Integration_SettingsQuery
   */
  public async fetch(): Fetch<IntegrationSettings> {
    return this._request<D.Integration_SettingsQuery, D.Integration_SettingsQueryVariables>(
      D.Integration_SettingsDocument,
      {
        id: this._id,
      }
    ).then(response => {
      const data = response?.integration?.settings;
      return data ? new IntegrationSettings(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable Integration_Settings_SlackPost Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integration_settings
 */
class Integration_Settings_SlackPostQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Integration_Settings_SlackPost query and return a SlackPostSettings
   *
   * @returns parsed response from Integration_Settings_SlackPostQuery
   */
  public async fetch(): Fetch<SlackPostSettings> {
    return this._request<D.Integration_Settings_SlackPostQuery, D.Integration_Settings_SlackPostQueryVariables>(
      D.Integration_Settings_SlackPostDocument,
      {
        id: this._id,
      }
    ).then(response => {
      const data = response?.integration?.settings?.slackPost;
      return data ? new SlackPostSettings(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable Integration_Settings_SlackProjectPost Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integration_settings
 */
class Integration_Settings_SlackProjectPostQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Integration_Settings_SlackProjectPost query and return a SlackPostSettings
   *
   * @returns parsed response from Integration_Settings_SlackProjectPostQuery
   */
  public async fetch(): Fetch<SlackPostSettings> {
    return this._request<
      D.Integration_Settings_SlackProjectPostQuery,
      D.Integration_Settings_SlackProjectPostQueryVariables
    >(D.Integration_Settings_SlackProjectPostDocument, {
      id: this._id,
    }).then(response => {
      const data = response?.integration?.settings?.slackProjectPost;
      return data ? new SlackPostSettings(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable Integration_Settings_GoogleSheets Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integration_settings
 */
class Integration_Settings_GoogleSheetsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Integration_Settings_GoogleSheets query and return a GoogleSheetsSettings
   *
   * @returns parsed response from Integration_Settings_GoogleSheetsQuery
   */
  public async fetch(): Fetch<GoogleSheetsSettings> {
    return this._request<D.Integration_Settings_GoogleSheetsQuery, D.Integration_Settings_GoogleSheetsQueryVariables>(
      D.Integration_Settings_GoogleSheetsDocument,
      {
        id: this._id,
      }
    ).then(response => {
      const data = response?.integration?.settings?.googleSheets;
      return data ? new GoogleSheetsSettings(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable Integration_Settings_Sentry Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integration_settings
 */
class Integration_Settings_SentryQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Integration_Settings_Sentry query and return a SentrySettings
   *
   * @returns parsed response from Integration_Settings_SentryQuery
   */
  public async fetch(): Fetch<SentrySettings> {
    return this._request<D.Integration_Settings_SentryQuery, D.Integration_Settings_SentryQueryVariables>(
      D.Integration_Settings_SentryDocument,
      {
        id: this._id,
      }
    ).then(response => {
      const data = response?.integration?.settings?.sentry;
      return data ? new SentrySettings(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationResource_Data Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integrationResource
 */
class IntegrationResource_DataQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the IntegrationResource_Data query and return a IntegrationResourceData
   *
   * @returns parsed response from IntegrationResource_DataQuery
   */
  public async fetch(): Fetch<IntegrationResourceData> {
    return this._request<D.IntegrationResource_DataQuery, D.IntegrationResource_DataQueryVariables>(
      D.IntegrationResource_DataDocument,
      {
        id: this._id,
      }
    ).then(response => {
      const data = response?.integrationResource?.data;
      return data ? new IntegrationResourceData(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationResource_PullRequest Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integrationResource
 */
class IntegrationResource_PullRequestQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the IntegrationResource_PullRequest query and return a PullRequestPayload
   *
   * @returns parsed response from IntegrationResource_PullRequestQuery
   */
  public async fetch(): Fetch<PullRequestPayload> {
    return this._request<D.IntegrationResource_PullRequestQuery, D.IntegrationResource_PullRequestQueryVariables>(
      D.IntegrationResource_PullRequestDocument,
      {
        id: this._id,
      }
    ).then(response => {
      const data = response?.integrationResource?.pullRequest;
      return data ? new PullRequestPayload(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationResource_Data_GithubPullRequest Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integrationResource_data
 */
class IntegrationResource_Data_GithubPullRequestQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the IntegrationResource_Data_GithubPullRequest query and return a PullRequestPayload
   *
   * @returns parsed response from IntegrationResource_Data_GithubPullRequestQuery
   */
  public async fetch(): Fetch<PullRequestPayload> {
    return this._request<
      D.IntegrationResource_Data_GithubPullRequestQuery,
      D.IntegrationResource_Data_GithubPullRequestQueryVariables
    >(D.IntegrationResource_Data_GithubPullRequestDocument, {
      id: this._id,
    }).then(response => {
      const data = response?.integrationResource?.data?.githubPullRequest;
      return data ? new PullRequestPayload(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationResource_Data_GitlabMergeRequest Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integrationResource_data
 */
class IntegrationResource_Data_GitlabMergeRequestQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the IntegrationResource_Data_GitlabMergeRequest query and return a PullRequestPayload
   *
   * @returns parsed response from IntegrationResource_Data_GitlabMergeRequestQuery
   */
  public async fetch(): Fetch<PullRequestPayload> {
    return this._request<
      D.IntegrationResource_Data_GitlabMergeRequestQuery,
      D.IntegrationResource_Data_GitlabMergeRequestQueryVariables
    >(D.IntegrationResource_Data_GitlabMergeRequestDocument, {
      id: this._id,
    }).then(response => {
      const data = response?.integrationResource?.data?.gitlabMergeRequest;
      return data ? new PullRequestPayload(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationResource_Data_GithubCommit Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integrationResource_data
 */
class IntegrationResource_Data_GithubCommitQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the IntegrationResource_Data_GithubCommit query and return a CommitPayload
   *
   * @returns parsed response from IntegrationResource_Data_GithubCommitQuery
   */
  public async fetch(): Fetch<CommitPayload> {
    return this._request<
      D.IntegrationResource_Data_GithubCommitQuery,
      D.IntegrationResource_Data_GithubCommitQueryVariables
    >(D.IntegrationResource_Data_GithubCommitDocument, {
      id: this._id,
    }).then(response => {
      const data = response?.integrationResource?.data?.githubCommit;
      return data ? new CommitPayload(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable IntegrationResource_Data_SentryIssue Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integrationResource_data
 */
class IntegrationResource_Data_SentryIssueQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the IntegrationResource_Data_SentryIssue query and return a SentryIssuePayload
   *
   * @returns parsed response from IntegrationResource_Data_SentryIssueQuery
   */
  public async fetch(): Fetch<SentryIssuePayload> {
    return this._request<
      D.IntegrationResource_Data_SentryIssueQuery,
      D.IntegrationResource_Data_SentryIssueQueryVariables
    >(D.IntegrationResource_Data_SentryIssueDocument, {
      id: this._id,
    }).then(response => {
      const data = response?.integrationResource?.data?.sentryIssue;
      return data ? new SentryIssuePayload(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable InviteInfo_InviteData Query
 *
 * @param request - function to call the graphql client
 * @param userHash - required userHash to pass to inviteInfo
 */
class InviteInfo_InviteDataQuery extends LinearRequest {
  private _userHash: string;

  public constructor(request: Request, userHash: string) {
    super(request);
    this._userHash = userHash;
  }

  /**
   * Call the InviteInfo_InviteData query and return a InviteData
   *
   * @param variables - variables without 'userHash' to pass into the InviteInfo_InviteDataQuery
   * @returns parsed response from InviteInfo_InviteDataQuery
   */
  public async fetch(variables?: Omit<D.InviteInfo_InviteDataQueryVariables, "userHash">): Fetch<InviteData> {
    return this._request<D.InviteInfo_InviteDataQuery, D.InviteInfo_InviteDataQueryVariables>(
      D.InviteInfo_InviteDataDocument,
      {
        userHash: this._userHash,
        ...variables,
      }
    ).then(response => {
      const data = response?.inviteInfo?.inviteData;
      return data ? new InviteData(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable IssueLabel_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issueLabel
 */
class IssueLabel_IssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the IssueLabel_Issues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the IssueLabel_IssuesQuery
   * @returns parsed response from IssueLabel_IssuesQuery
   */
  public async fetch(variables?: Omit<D.IssueLabel_IssuesQueryVariables, "id">): Fetch<IssueConnection> {
    return this._request<D.IssueLabel_IssuesQuery, D.IssueLabel_IssuesQueryVariables>(D.IssueLabel_IssuesDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.issueLabel?.issues;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Issue_Subscribers Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 */
class Issue_SubscribersQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_Subscribers query and return a UserConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_SubscribersQuery
   * @returns parsed response from Issue_SubscribersQuery
   */
  public async fetch(variables?: Omit<D.Issue_SubscribersQueryVariables, "id">): Fetch<UserConnection> {
    return this._request<D.Issue_SubscribersQuery, D.Issue_SubscribersQueryVariables>(D.Issue_SubscribersDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.issue?.subscribers;
      return data
        ? new UserConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Issue_Children Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 */
class Issue_ChildrenQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_Children query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_ChildrenQuery
   * @returns parsed response from Issue_ChildrenQuery
   */
  public async fetch(variables?: Omit<D.Issue_ChildrenQueryVariables, "id">): Fetch<IssueConnection> {
    return this._request<D.Issue_ChildrenQuery, D.Issue_ChildrenQueryVariables>(D.Issue_ChildrenDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.issue?.children;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Issue_Comments Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 */
class Issue_CommentsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_Comments query and return a CommentConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_CommentsQuery
   * @returns parsed response from Issue_CommentsQuery
   */
  public async fetch(variables?: Omit<D.Issue_CommentsQueryVariables, "id">): Fetch<CommentConnection> {
    return this._request<D.Issue_CommentsQuery, D.Issue_CommentsQueryVariables>(D.Issue_CommentsDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.issue?.comments;
      return data
        ? new CommentConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Issue_History Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 */
class Issue_HistoryQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_History query and return a IssueHistoryConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_HistoryQuery
   * @returns parsed response from Issue_HistoryQuery
   */
  public async fetch(variables?: Omit<D.Issue_HistoryQueryVariables, "id">): Fetch<IssueHistoryConnection> {
    return this._request<D.Issue_HistoryQuery, D.Issue_HistoryQueryVariables>(D.Issue_HistoryDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.issue?.history;
      return data
        ? new IssueHistoryConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Issue_Labels Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 */
class Issue_LabelsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_Labels query and return a IssueLabelConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_LabelsQuery
   * @returns parsed response from Issue_LabelsQuery
   */
  public async fetch(variables?: Omit<D.Issue_LabelsQueryVariables, "id">): Fetch<IssueLabelConnection> {
    return this._request<D.Issue_LabelsQuery, D.Issue_LabelsQueryVariables>(D.Issue_LabelsDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.issue?.labels;
      return data
        ? new IssueLabelConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Issue_IntegrationResources Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 */
class Issue_IntegrationResourcesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_IntegrationResources query and return a IntegrationResourceConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_IntegrationResourcesQuery
   * @returns parsed response from Issue_IntegrationResourcesQuery
   */
  public async fetch(
    variables?: Omit<D.Issue_IntegrationResourcesQueryVariables, "id">
  ): Fetch<IntegrationResourceConnection> {
    return this._request<D.Issue_IntegrationResourcesQuery, D.Issue_IntegrationResourcesQueryVariables>(
      D.Issue_IntegrationResourcesDocument,
      {
        id: this._id,
        ...variables,
      }
    ).then(response => {
      const data = response?.issue?.integrationResources;
      return data
        ? new IntegrationResourceConnection(
            this._request,
            pagination => this.fetch({ ...variables, ...pagination }),
            data
          )
        : undefined;
    });
  }
}

/**
 * A fetchable Issue_Relations Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 */
class Issue_RelationsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_Relations query and return a IssueRelationConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_RelationsQuery
   * @returns parsed response from Issue_RelationsQuery
   */
  public async fetch(variables?: Omit<D.Issue_RelationsQueryVariables, "id">): Fetch<IssueRelationConnection> {
    return this._request<D.Issue_RelationsQuery, D.Issue_RelationsQueryVariables>(D.Issue_RelationsDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.issue?.relations;
      return data
        ? new IssueRelationConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Issue_InverseRelations Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 */
class Issue_InverseRelationsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Issue_InverseRelations query and return a IssueRelationConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_InverseRelationsQuery
   * @returns parsed response from Issue_InverseRelationsQuery
   */
  public async fetch(variables?: Omit<D.Issue_InverseRelationsQueryVariables, "id">): Fetch<IssueRelationConnection> {
    return this._request<D.Issue_InverseRelationsQuery, D.Issue_InverseRelationsQueryVariables>(
      D.Issue_InverseRelationsDocument,
      {
        id: this._id,
        ...variables,
      }
    ).then(response => {
      const data = response?.issue?.inverseRelations;
      return data
        ? new IssueRelationConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Milestone_Projects Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to milestone
 */
class Milestone_ProjectsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Milestone_Projects query and return a ProjectConnection
   *
   * @param variables - variables without 'id' to pass into the Milestone_ProjectsQuery
   * @returns parsed response from Milestone_ProjectsQuery
   */
  public async fetch(variables?: Omit<D.Milestone_ProjectsQueryVariables, "id">): Fetch<ProjectConnection> {
    return this._request<D.Milestone_ProjectsQuery, D.Milestone_ProjectsQueryVariables>(D.Milestone_ProjectsDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.milestone?.projects;
      return data
        ? new ProjectConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable OrganizationInvite_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to organizationInvite
 */
class OrganizationInvite_IssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the OrganizationInvite_Issues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the OrganizationInvite_IssuesQuery
   * @returns parsed response from OrganizationInvite_IssuesQuery
   */
  public async fetch(variables?: Omit<D.OrganizationInvite_IssuesQueryVariables, "id">): Fetch<IssueConnection> {
    return this._request<D.OrganizationInvite_IssuesQuery, D.OrganizationInvite_IssuesQueryVariables>(
      D.OrganizationInvite_IssuesDocument,
      {
        id: this._id,
        ...variables,
      }
    ).then(response => {
      const data = response?.organizationInvite?.issues;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Project_Teams Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to project
 */
class Project_TeamsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Project_Teams query and return a TeamConnection
   *
   * @param variables - variables without 'id' to pass into the Project_TeamsQuery
   * @returns parsed response from Project_TeamsQuery
   */
  public async fetch(variables?: Omit<D.Project_TeamsQueryVariables, "id">): Fetch<TeamConnection> {
    return this._request<D.Project_TeamsQuery, D.Project_TeamsQueryVariables>(D.Project_TeamsDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.project?.teams;
      return data
        ? new TeamConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Project_Members Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to project
 */
class Project_MembersQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Project_Members query and return a UserConnection
   *
   * @param variables - variables without 'id' to pass into the Project_MembersQuery
   * @returns parsed response from Project_MembersQuery
   */
  public async fetch(variables?: Omit<D.Project_MembersQueryVariables, "id">): Fetch<UserConnection> {
    return this._request<D.Project_MembersQuery, D.Project_MembersQueryVariables>(D.Project_MembersDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.project?.members;
      return data
        ? new UserConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Project_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to project
 */
class Project_IssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Project_Issues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the Project_IssuesQuery
   * @returns parsed response from Project_IssuesQuery
   */
  public async fetch(variables?: Omit<D.Project_IssuesQueryVariables, "id">): Fetch<IssueConnection> {
    return this._request<D.Project_IssuesQuery, D.Project_IssuesQueryVariables>(D.Project_IssuesDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.project?.issues;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Project_Links Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to project
 */
class Project_LinksQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Project_Links query and return a ProjectLinkConnection
   *
   * @param variables - variables without 'id' to pass into the Project_LinksQuery
   * @returns parsed response from Project_LinksQuery
   */
  public async fetch(variables?: Omit<D.Project_LinksQueryVariables, "id">): Fetch<ProjectLinkConnection> {
    return this._request<D.Project_LinksQuery, D.Project_LinksQueryVariables>(D.Project_LinksDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.project?.links;
      return data
        ? new ProjectLinkConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Team_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 */
class Team_IssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_Issues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the Team_IssuesQuery
   * @returns parsed response from Team_IssuesQuery
   */
  public async fetch(variables?: Omit<D.Team_IssuesQueryVariables, "id">): Fetch<IssueConnection> {
    return this._request<D.Team_IssuesQuery, D.Team_IssuesQueryVariables>(D.Team_IssuesDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.team?.issues;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Team_Cycles Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 */
class Team_CyclesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_Cycles query and return a CycleConnection
   *
   * @param variables - variables without 'id' to pass into the Team_CyclesQuery
   * @returns parsed response from Team_CyclesQuery
   */
  public async fetch(variables?: Omit<D.Team_CyclesQueryVariables, "id">): Fetch<CycleConnection> {
    return this._request<D.Team_CyclesQuery, D.Team_CyclesQueryVariables>(D.Team_CyclesDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.team?.cycles;
      return data
        ? new CycleConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Team_Memberships Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 */
class Team_MembershipsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_Memberships query and return a TeamMembershipConnection
   *
   * @param variables - variables without 'id' to pass into the Team_MembershipsQuery
   * @returns parsed response from Team_MembershipsQuery
   */
  public async fetch(variables?: Omit<D.Team_MembershipsQueryVariables, "id">): Fetch<TeamMembershipConnection> {
    return this._request<D.Team_MembershipsQuery, D.Team_MembershipsQueryVariables>(D.Team_MembershipsDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.team?.memberships;
      return data
        ? new TeamMembershipConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Team_Projects Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 */
class Team_ProjectsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_Projects query and return a ProjectConnection
   *
   * @param variables - variables without 'id' to pass into the Team_ProjectsQuery
   * @returns parsed response from Team_ProjectsQuery
   */
  public async fetch(variables?: Omit<D.Team_ProjectsQueryVariables, "id">): Fetch<ProjectConnection> {
    return this._request<D.Team_ProjectsQuery, D.Team_ProjectsQueryVariables>(D.Team_ProjectsDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.team?.projects;
      return data
        ? new ProjectConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Team_States Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 */
class Team_StatesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_States query and return a WorkflowStateConnection
   *
   * @param variables - variables without 'id' to pass into the Team_StatesQuery
   * @returns parsed response from Team_StatesQuery
   */
  public async fetch(variables?: Omit<D.Team_StatesQueryVariables, "id">): Fetch<WorkflowStateConnection> {
    return this._request<D.Team_StatesQuery, D.Team_StatesQueryVariables>(D.Team_StatesDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.team?.states;
      return data
        ? new WorkflowStateConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Team_Templates Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 */
class Team_TemplatesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_Templates query and return a TemplateConnection
   *
   * @param variables - variables without 'id' to pass into the Team_TemplatesQuery
   * @returns parsed response from Team_TemplatesQuery
   */
  public async fetch(variables?: Omit<D.Team_TemplatesQueryVariables, "id">): Fetch<TemplateConnection> {
    return this._request<D.Team_TemplatesQuery, D.Team_TemplatesQueryVariables>(D.Team_TemplatesDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.team?.templates;
      return data ? new TemplateConnection(this._request, data) : undefined;
    });
  }
}

/**
 * A fetchable Team_Labels Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 */
class Team_LabelsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_Labels query and return a IssueLabelConnection
   *
   * @param variables - variables without 'id' to pass into the Team_LabelsQuery
   * @returns parsed response from Team_LabelsQuery
   */
  public async fetch(variables?: Omit<D.Team_LabelsQueryVariables, "id">): Fetch<IssueLabelConnection> {
    return this._request<D.Team_LabelsQuery, D.Team_LabelsQueryVariables>(D.Team_LabelsDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.team?.labels;
      return data
        ? new IssueLabelConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable Team_Webhooks Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 */
class Team_WebhooksQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the Team_Webhooks query and return a WebhookConnection
   *
   * @param variables - variables without 'id' to pass into the Team_WebhooksQuery
   * @returns parsed response from Team_WebhooksQuery
   */
  public async fetch(variables?: Omit<D.Team_WebhooksQueryVariables, "id">): Fetch<WebhookConnection> {
    return this._request<D.Team_WebhooksQuery, D.Team_WebhooksQueryVariables>(D.Team_WebhooksDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.team?.webhooks;
      return data
        ? new WebhookConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * A fetchable WorkflowState_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to workflowState
 */
class WorkflowState_IssuesQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
    this._id = id;
  }

  /**
   * Call the WorkflowState_Issues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the WorkflowState_IssuesQuery
   * @returns parsed response from WorkflowState_IssuesQuery
   */
  public async fetch(variables?: Omit<D.WorkflowState_IssuesQueryVariables, "id">): Fetch<IssueConnection> {
    return this._request<D.WorkflowState_IssuesQuery, D.WorkflowState_IssuesQueryVariables>(
      D.WorkflowState_IssuesDocument,
      {
        id: this._id,
        ...variables,
      }
    ).then(response => {
      const data = response?.workflowState?.issues;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
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

  /**
   * Query users for UserConnection
   * All users for the organization.
   *
   * @param variables - variables to pass into the UsersQuery
   * @returns UserConnection
   */
  public users(variables?: D.UsersQueryVariables): Fetch<UserConnection> {
    return new UsersQuery(this._request).fetch(variables);
  }
  /**
   * Query user for User
   * One specific user.
   *
   * @param id - required id to pass to user
   * @returns User
   */
  public user(id: string): Fetch<User> {
    return new UserQuery(this._request).fetch(id);
  }
  /**
   * Query viewer for User
   * The currently authenticated user.
   *
   * @returns User
   */
  public get viewer(): Fetch<User> {
    return new ViewerQuery(this._request).fetch();
  }
  /**
   * Query organization for Organization
   * The user's organization.
   *
   * @returns Organization
   */
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /**
   * Query organizationExists for OrganizationExistsPayload
   * Does the organization exist.
   *
   * @param urlKey - required urlKey to pass to organizationExists
   * @returns OrganizationExistsPayload
   */
  public organizationExists(urlKey: string): Fetch<OrganizationExistsPayload> {
    return new OrganizationExistsQuery(this._request).fetch(urlKey);
  }
  /**
   * Query syncBootstrap for SyncResponse
   * Fetch data to catch up the client to the state of the world.
   *
   * @param databaseVersion - required databaseVersion to pass to syncBootstrap
   * @param sinceSyncId - required sinceSyncId to pass to syncBootstrap
   * @returns SyncResponse
   */
  public syncBootstrap(databaseVersion: number, sinceSyncId: number): Fetch<SyncResponse> {
    return new SyncBootstrapQuery(this._request).fetch(databaseVersion, sinceSyncId);
  }
  /**
   * Query syncUpdates for SyncResponse
   * Fetches delta packets to catch up the user to the current state of the world.
   *
   * @param sinceSyncId - required sinceSyncId to pass to syncUpdates
   * @returns SyncResponse
   */
  public syncUpdates(sinceSyncId: number): Fetch<SyncResponse> {
    return new SyncUpdatesQuery(this._request).fetch(sinceSyncId);
  }
  /**
   * Query archivedModelSync for ArchiveResponse
   * Fetches an archived model.
   *
   * @param identifier - required identifier to pass to archivedModelSync
   * @param modelClass - required modelClass to pass to archivedModelSync
   * @returns ArchiveResponse
   */
  public archivedModelSync(identifier: string, modelClass: string): Fetch<ArchiveResponse> {
    return new ArchivedModelSyncQuery(this._request).fetch(identifier, modelClass);
  }
  /**
   * Query archivedModelsSync for ArchiveResponse
   * Fetches archived models.
   *
   * @param modelClass - required modelClass to pass to archivedModelsSync
   * @param teamId - required teamId to pass to archivedModelsSync
   * @param variables - variables without 'modelClass', 'teamId' to pass into the ArchivedModelsSyncQuery
   * @returns ArchiveResponse
   */
  public archivedModelsSync(
    modelClass: string,
    teamId: string,
    variables?: Omit<D.ArchivedModelsSyncQueryVariables, "modelClass" | "teamId">
  ): Fetch<ArchiveResponse> {
    return new ArchivedModelsSyncQuery(this._request).fetch(modelClass, teamId, variables);
  }
  /**
   * Query adminUserAccountLookup for UserAccountAdminPrivileged
   * Finds a user account by email or identifier. Super user required.
   *
   * @param variables - variables to pass into the AdminUserAccountLookupQuery
   * @returns UserAccountAdminPrivileged
   */
  public adminUserAccountLookup(variables?: D.AdminUserAccountLookupQueryVariables): Fetch<UserAccountAdminPrivileged> {
    return new AdminUserAccountLookupQuery(this._request).fetch(variables);
  }
  /**
   * Query apiKeys for ApiKeyConnection
   * All API keys for the user.
   *
   * @param variables - variables to pass into the ApiKeysQuery
   * @returns ApiKeyConnection
   */
  public apiKeys(variables?: D.ApiKeysQueryVariables): Fetch<ApiKeyConnection> {
    return new ApiKeysQuery(this._request).fetch(variables);
  }
  /**
   * Query applicationWithAuthorization for UserAuthorizedApplication
   * Get information for an application and whether a user has approved it for the given scopes.
   *
   * @param scope - required scope to pass to applicationWithAuthorization
   * @param clientId - required clientId to pass to applicationWithAuthorization
   * @param variables - variables without 'scope', 'clientId' to pass into the ApplicationWithAuthorizationQuery
   * @returns UserAuthorizedApplication
   */
  public applicationWithAuthorization(
    scope: string[],
    clientId: string,
    variables?: Omit<D.ApplicationWithAuthorizationQueryVariables, "scope" | "clientId">
  ): Fetch<UserAuthorizedApplication> {
    return new ApplicationWithAuthorizationQuery(this._request).fetch(scope, clientId, variables);
  }
  /**
   * Query authorizedApplications for AuthorizedApplications
   * Get all authorized applications for a user
   *
   * @returns AuthorizedApplication[]
   */
  public get authorizedApplications(): Fetch<AuthorizedApplication[]> {
    return new AuthorizedApplicationsQuery(this._request).fetch();
  }
  /**
   * Query availableUsers for AuthResolverResponse
   * Fetch users belonging to this user account.
   *
   * @returns AuthResolverResponse
   */
  public get availableUsers(): Fetch<AuthResolverResponse> {
    return new AvailableUsersQuery(this._request).fetch();
  }
  /**
   * Query ssoUrlFromEmail for SsoUrlFromEmailResponse
   * Fetch SSO login URL for the email provided.
   *
   * @param email - required email to pass to ssoUrlFromEmail
   * @param variables - variables without 'email' to pass into the SsoUrlFromEmailQuery
   * @returns SsoUrlFromEmailResponse
   */
  public ssoUrlFromEmail(
    email: string,
    variables?: Omit<D.SsoUrlFromEmailQueryVariables, "email">
  ): Fetch<SsoUrlFromEmailResponse> {
    return new SsoUrlFromEmailQuery(this._request).fetch(email, variables);
  }
  /**
   * Query billingDetails for BillingDetailsPayload
   * Billing details for the customer.
   *
   * @returns BillingDetailsPayload
   */
  public get billingDetails(): Fetch<BillingDetailsPayload> {
    return new BillingDetailsQuery(this._request).fetch();
  }
  /**
   * Query collaborativeDocumentJoin for CollaborationDocumentUpdatePayload
   * Join collaborative document and get missing steps.
   *
   * @param clientId - required clientId to pass to collaborativeDocumentJoin
   * @param issueId - required issueId to pass to collaborativeDocumentJoin
   * @param version - required version to pass to collaborativeDocumentJoin
   * @returns CollaborationDocumentUpdatePayload
   */
  public collaborativeDocumentJoin(
    clientId: string,
    issueId: string,
    version: number
  ): Fetch<CollaborationDocumentUpdatePayload> {
    return new CollaborativeDocumentJoinQuery(this._request).fetch(clientId, issueId, version);
  }
  /**
   * Query comments for CommentConnection
   * All comments.
   *
   * @param variables - variables to pass into the CommentsQuery
   * @returns CommentConnection
   */
  public comments(variables?: D.CommentsQueryVariables): Fetch<CommentConnection> {
    return new CommentsQuery(this._request).fetch(variables);
  }
  /**
   * Query comment for Comment
   * A specific comment.
   *
   * @param id - required id to pass to comment
   * @returns Comment
   */
  public comment(id: string): Fetch<Comment> {
    return new CommentQuery(this._request).fetch(id);
  }
  /**
   * Query customViews for CustomViewConnection
   * Custom views for the user.
   *
   * @param variables - variables to pass into the CustomViewsQuery
   * @returns CustomViewConnection
   */
  public customViews(variables?: D.CustomViewsQueryVariables): Fetch<CustomViewConnection> {
    return new CustomViewsQuery(this._request).fetch(variables);
  }
  /**
   * Query customView for CustomView
   * One specific custom view.
   *
   * @param id - required id to pass to customView
   * @returns CustomView
   */
  public customView(id: string): Fetch<CustomView> {
    return new CustomViewQuery(this._request).fetch(id);
  }
  /**
   * Query cycles for CycleConnection
   * All cycles.
   *
   * @param variables - variables to pass into the CyclesQuery
   * @returns CycleConnection
   */
  public cycles(variables?: D.CyclesQueryVariables): Fetch<CycleConnection> {
    return new CyclesQuery(this._request).fetch(variables);
  }
  /**
   * Query cycle for Cycle
   * One specific cycle.
   *
   * @param id - required id to pass to cycle
   * @returns Cycle
   */
  public cycle(id: string): Fetch<Cycle> {
    return new CycleQuery(this._request).fetch(id);
  }
  /**
   * Query emojis for EmojiConnection
   * All custom emojis.
   *
   * @param variables - variables to pass into the EmojisQuery
   * @returns EmojiConnection
   */
  public emojis(variables?: D.EmojisQueryVariables): Fetch<EmojiConnection> {
    return new EmojisQuery(this._request).fetch(variables);
  }
  /**
   * Query emoji for Emoji
   * A specific emoji.
   *
   * @param id - required id to pass to emoji
   * @returns Emoji
   */
  public emoji(id: string): Fetch<Emoji> {
    return new EmojiQuery(this._request).fetch(id);
  }
  /**
   * Query favorites for FavoriteConnection
   * The user's favorites.
   *
   * @param variables - variables to pass into the FavoritesQuery
   * @returns FavoriteConnection
   */
  public favorites(variables?: D.FavoritesQueryVariables): Fetch<FavoriteConnection> {
    return new FavoritesQuery(this._request).fetch(variables);
  }
  /**
   * Query favorite for Favorite
   * One specific favorite.
   *
   * @param id - required id to pass to favorite
   * @returns Favorite
   */
  public favorite(id: string): Fetch<Favorite> {
    return new FavoriteQuery(this._request).fetch(id);
  }
  /**
   * Query figmaEmbedInfo for FigmaEmbedPayload
   * Fetch Figma screenshot and other information with file and node identifiers.
   *
   * @param fileId - required fileId to pass to figmaEmbedInfo
   * @param variables - variables without 'fileId' to pass into the FigmaEmbedInfoQuery
   * @returns FigmaEmbedPayload
   */
  public figmaEmbedInfo(
    fileId: string,
    variables?: Omit<D.FigmaEmbedInfoQueryVariables, "fileId">
  ): Fetch<FigmaEmbedPayload> {
    return new FigmaEmbedInfoQuery(this._request).fetch(fileId, variables);
  }
  /**
   * Query integrations for IntegrationConnection
   * All integrations.
   *
   * @param variables - variables to pass into the IntegrationsQuery
   * @returns IntegrationConnection
   */
  public integrations(variables?: D.IntegrationsQueryVariables): Fetch<IntegrationConnection> {
    return new IntegrationsQuery(this._request).fetch(variables);
  }
  /**
   * Query integration for Integration
   * One specific integration.
   *
   * @param id - required id to pass to integration
   * @returns Integration
   */
  public integration(id: string): Fetch<Integration> {
    return new IntegrationQuery(this._request).fetch(id);
  }
  /**
   * Query integrationResources for IntegrationResourceConnection
   * All integrations resources (e.g. linked GitHub pull requests for issues).
   *
   * @param variables - variables to pass into the IntegrationResourcesQuery
   * @returns IntegrationResourceConnection
   */
  public integrationResources(variables?: D.IntegrationResourcesQueryVariables): Fetch<IntegrationResourceConnection> {
    return new IntegrationResourcesQuery(this._request).fetch(variables);
  }
  /**
   * Query integrationResource for IntegrationResource
   * One specific integration resource. (e.g. linked GitHub pull requests for an issue)
   *
   * @param id - required id to pass to integrationResource
   * @returns IntegrationResource
   */
  public integrationResource(id: string): Fetch<IntegrationResource> {
    return new IntegrationResourceQuery(this._request).fetch(id);
  }
  /**
   * Query inviteInfo for InvitePagePayload
   * Retrieves information for the public invite page.
   *
   * @param userHash - required userHash to pass to inviteInfo
   * @param variables - variables without 'userHash' to pass into the InviteInfoQuery
   * @returns InvitePagePayload
   */
  public inviteInfo(
    userHash: string,
    variables?: Omit<D.InviteInfoQueryVariables, "userHash">
  ): Fetch<InvitePagePayload> {
    return new InviteInfoQuery(this._request).fetch(userHash, variables);
  }
  /**
   * Query issueLabels for IssueLabelConnection
   * All issue labels.
   *
   * @param variables - variables to pass into the IssueLabelsQuery
   * @returns IssueLabelConnection
   */
  public issueLabels(variables?: D.IssueLabelsQueryVariables): Fetch<IssueLabelConnection> {
    return new IssueLabelsQuery(this._request).fetch(variables);
  }
  /**
   * Query issueLabel for IssueLabel
   * One specific label.
   *
   * @param id - required id to pass to issueLabel
   * @returns IssueLabel
   */
  public issueLabel(id: string): Fetch<IssueLabel> {
    return new IssueLabelQuery(this._request).fetch(id);
  }
  /**
   * Query issueRelations for IssueRelationConnection
   * All issue relationships.
   *
   * @param variables - variables to pass into the IssueRelationsQuery
   * @returns IssueRelationConnection
   */
  public issueRelations(variables?: D.IssueRelationsQueryVariables): Fetch<IssueRelationConnection> {
    return new IssueRelationsQuery(this._request).fetch(variables);
  }
  /**
   * Query issueRelation for IssueRelation
   * One specific issue relation.
   *
   * @param id - required id to pass to issueRelation
   * @returns IssueRelation
   */
  public issueRelation(id: string): Fetch<IssueRelation> {
    return new IssueRelationQuery(this._request).fetch(id);
  }
  /**
   * Query issues for IssueConnection
   * All issues.
   *
   * @param variables - variables to pass into the IssuesQuery
   * @returns IssueConnection
   */
  public issues(variables?: D.IssuesQueryVariables): Fetch<IssueConnection> {
    return new IssuesQuery(this._request).fetch(variables);
  }
  /**
   * Query issue for Issue
   * One specific issue.
   *
   * @param id - required id to pass to issue
   * @returns Issue
   */
  public issue(id: string): Fetch<Issue> {
    return new IssueQuery(this._request).fetch(id);
  }
  /**
   * Query issueSearch for IssueConnection
   * [ALPHA] Search issues. This query is experimental and is subject to change without notice.
   *
   * @param query - required query to pass to issueSearch
   * @param variables - variables without 'query' to pass into the IssueSearchQuery
   * @returns IssueConnection
   */
  public issueSearch(query: string, variables?: Omit<D.IssueSearchQueryVariables, "query">): Fetch<IssueConnection> {
    return new IssueSearchQuery(this._request).fetch(query, variables);
  }
  /**
   * Query milestones for MilestoneConnection
   * All milestones.
   *
   * @param variables - variables to pass into the MilestonesQuery
   * @returns MilestoneConnection
   */
  public milestones(variables?: D.MilestonesQueryVariables): Fetch<MilestoneConnection> {
    return new MilestonesQuery(this._request).fetch(variables);
  }
  /**
   * Query milestone for Milestone
   * One specific milestone.
   *
   * @param id - required id to pass to milestone
   * @returns Milestone
   */
  public milestone(id: string): Fetch<Milestone> {
    return new MilestoneQuery(this._request).fetch(id);
  }
  /**
   * Query notifications for NotificationConnection
   * All notifications.
   *
   * @param variables - variables to pass into the NotificationsQuery
   * @returns NotificationConnection
   */
  public notifications(variables?: D.NotificationsQueryVariables): Fetch<NotificationConnection> {
    return new NotificationsQuery(this._request).fetch(variables);
  }
  /**
   * Query notification for Notification
   * One specific notification.
   *
   * @param id - required id to pass to notification
   * @returns Notification
   */
  public notification(id: string): Fetch<Notification> {
    return new NotificationQuery(this._request).fetch(id);
  }
  /**
   * Query notificationSubscriptions for NotificationSubscriptionConnection
   * The user's notification subscriptions.
   *
   * @param variables - variables to pass into the NotificationSubscriptionsQuery
   * @returns NotificationSubscriptionConnection
   */
  public notificationSubscriptions(
    variables?: D.NotificationSubscriptionsQueryVariables
  ): Fetch<NotificationSubscriptionConnection> {
    return new NotificationSubscriptionsQuery(this._request).fetch(variables);
  }
  /**
   * Query notificationSubscription for NotificationSubscription
   * One specific notification subscription.
   *
   * @param id - required id to pass to notificationSubscription
   * @returns NotificationSubscription
   */
  public notificationSubscription(id: string): Fetch<NotificationSubscription> {
    return new NotificationSubscriptionQuery(this._request).fetch(id);
  }
  /**
   * Query organizationInvites for OrganizationInviteConnection
   * All invites for the organization.
   *
   * @param variables - variables to pass into the OrganizationInvitesQuery
   * @returns OrganizationInviteConnection
   */
  public organizationInvites(variables?: D.OrganizationInvitesQueryVariables): Fetch<OrganizationInviteConnection> {
    return new OrganizationInvitesQuery(this._request).fetch(variables);
  }
  /**
   * Query organizationInvite for IssueLabel
   * One specific organization invite.
   *
   * @param id - required id to pass to organizationInvite
   * @returns IssueLabel
   */
  public organizationInvite(id: string): Fetch<IssueLabel> {
    return new OrganizationInviteQuery(this._request).fetch(id);
  }
  /**
   * Query projectLinks for ProjectLinkConnection
   * All links for the project.
   *
   * @param variables - variables to pass into the ProjectLinksQuery
   * @returns ProjectLinkConnection
   */
  public projectLinks(variables?: D.ProjectLinksQueryVariables): Fetch<ProjectLinkConnection> {
    return new ProjectLinksQuery(this._request).fetch(variables);
  }
  /**
   * Query projectLink for ProjectLink
   * One specific project link.
   *
   * @param id - required id to pass to projectLink
   * @returns ProjectLink
   */
  public projectLink(id: string): Fetch<ProjectLink> {
    return new ProjectLinkQuery(this._request).fetch(id);
  }
  /**
   * Query projects for ProjectConnection
   * All projects.
   *
   * @param variables - variables to pass into the ProjectsQuery
   * @returns ProjectConnection
   */
  public projects(variables?: D.ProjectsQueryVariables): Fetch<ProjectConnection> {
    return new ProjectsQuery(this._request).fetch(variables);
  }
  /**
   * Query project for Project
   * One specific project.
   *
   * @param id - required id to pass to project
   * @returns Project
   */
  public project(id: string): Fetch<Project> {
    return new ProjectQuery(this._request).fetch(id);
  }
  /**
   * Query pushSubscriptionTest for PushSubscriptionPayload
   * Sends a test push message.
   *
   * @returns PushSubscriptionPayload
   */
  public get pushSubscriptionTest(): Fetch<PushSubscriptionPayload> {
    return new PushSubscriptionTestQuery(this._request).fetch();
  }
  /**
   * Query reactions for ReactionConnection
   * All comment emoji reactions.
   *
   * @param variables - variables to pass into the ReactionsQuery
   * @returns ReactionConnection
   */
  public reactions(variables?: D.ReactionsQueryVariables): Fetch<ReactionConnection> {
    return new ReactionsQuery(this._request).fetch(variables);
  }
  /**
   * Query reaction for Reaction
   * A specific reaction.
   *
   * @param id - required id to pass to reaction
   * @returns Reaction
   */
  public reaction(id: string): Fetch<Reaction> {
    return new ReactionQuery(this._request).fetch(id);
  }
  /**
   * Query subscription for Subscription
   * The organization's subscription.
   *
   * @returns Subscription
   */
  public get subscription(): Fetch<Subscription> {
    return new SubscriptionQuery(this._request).fetch();
  }
  /**
   * Query teamMemberships for TeamMembershipConnection
   * All team memberships.
   *
   * @param variables - variables to pass into the TeamMembershipsQuery
   * @returns TeamMembershipConnection
   */
  public teamMemberships(variables?: D.TeamMembershipsQueryVariables): Fetch<TeamMembershipConnection> {
    return new TeamMembershipsQuery(this._request).fetch(variables);
  }
  /**
   * Query teamMembership for TeamMembership
   * One specific team membership.
   *
   * @param id - required id to pass to teamMembership
   * @returns TeamMembership
   */
  public teamMembership(id: string): Fetch<TeamMembership> {
    return new TeamMembershipQuery(this._request).fetch(id);
  }
  /**
   * Query teams for TeamConnection
   * All teams.
   *
   * @param variables - variables to pass into the TeamsQuery
   * @returns TeamConnection
   */
  public teams(variables?: D.TeamsQueryVariables): Fetch<TeamConnection> {
    return new TeamsQuery(this._request).fetch(variables);
  }
  /**
   * Query team for Team
   * One specific team.
   *
   * @param id - required id to pass to team
   * @returns Team
   */
  public team(id: string): Fetch<Team> {
    return new TeamQuery(this._request).fetch(id);
  }
  /**
   * Query templates for Templates
   * All templates from all users.
   *
   * @returns Template[]
   */
  public get templates(): Fetch<Template[]> {
    return new TemplatesQuery(this._request).fetch();
  }
  /**
   * Query template for Template
   * A specific template.
   *
   * @param id - required id to pass to template
   * @returns Template
   */
  public template(id: string): Fetch<Template> {
    return new TemplateQuery(this._request).fetch(id);
  }
  /**
   * Query userSettings for UserSettings
   * The user's settings.
   *
   * @returns UserSettings
   */
  public get userSettings(): Fetch<UserSettings> {
    return new UserSettingsQuery(this._request).fetch();
  }
  /**
   * Query webhooks for WebhookConnection
   * All webhooks.
   *
   * @param variables - variables to pass into the WebhooksQuery
   * @returns WebhookConnection
   */
  public webhooks(variables?: D.WebhooksQueryVariables): Fetch<WebhookConnection> {
    return new WebhooksQuery(this._request).fetch(variables);
  }
  /**
   * Query webhook for Webhook
   * A specific webhook.
   *
   * @param id - required id to pass to webhook
   * @returns Webhook
   */
  public webhook(id: string): Fetch<Webhook> {
    return new WebhookQuery(this._request).fetch(id);
  }
  /**
   * Query workflowStates for WorkflowStateConnection
   * All issue workflow states.
   *
   * @param variables - variables to pass into the WorkflowStatesQuery
   * @returns WorkflowStateConnection
   */
  public workflowStates(variables?: D.WorkflowStatesQueryVariables): Fetch<WorkflowStateConnection> {
    return new WorkflowStatesQuery(this._request).fetch(variables);
  }
  /**
   * Query workflowState for WorkflowState
   * One specific state.
   *
   * @param id - required id to pass to workflowState
   * @returns WorkflowState
   */
  public workflowState(id: string): Fetch<WorkflowState> {
    return new WorkflowStateQuery(this._request).fetch(id);
  }
  /**
   * Mutation userUpdate for UserPayload
   *
   * @param input - required input to pass to userUpdate
   * @param id - required id to pass to userUpdate
   * @returns UserPayload
   */
  public userUpdate(input: D.UpdateUserInput, id: string): Fetch<UserPayload> {
    return new UserUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation userPromoteAdmin for UserAdminPayload
   *
   * @param id - required id to pass to userPromoteAdmin
   * @returns UserAdminPayload
   */
  public userPromoteAdmin(id: string): Fetch<UserAdminPayload> {
    return new UserPromoteAdminMutation(this._request).fetch(id);
  }
  /**
   * Mutation userDemoteAdmin for UserAdminPayload
   *
   * @param id - required id to pass to userDemoteAdmin
   * @returns UserAdminPayload
   */
  public userDemoteAdmin(id: string): Fetch<UserAdminPayload> {
    return new UserDemoteAdminMutation(this._request).fetch(id);
  }
  /**
   * Mutation userSuspend for UserAdminPayload
   *
   * @param id - required id to pass to userSuspend
   * @returns UserAdminPayload
   */
  public userSuspend(id: string): Fetch<UserAdminPayload> {
    return new UserSuspendMutation(this._request).fetch(id);
  }
  /**
   * Mutation userUnsuspend for UserAdminPayload
   *
   * @param id - required id to pass to userUnsuspend
   * @returns UserAdminPayload
   */
  public userUnsuspend(id: string): Fetch<UserAdminPayload> {
    return new UserUnsuspendMutation(this._request).fetch(id);
  }
  /**
   * Mutation organizationUpdate for OrganizationPayload
   *
   * @param input - required input to pass to organizationUpdate
   * @returns OrganizationPayload
   */
  public organizationUpdate(input: D.UpdateOrganizationInput): Fetch<OrganizationPayload> {
    return new OrganizationUpdateMutation(this._request).fetch(input);
  }
  /**
   * Mutation organizationDeleteChallenge for OrganizationDeletePayload
   *
   * @returns OrganizationDeletePayload
   */
  public get organizationDeleteChallenge(): Fetch<OrganizationDeletePayload> {
    return new OrganizationDeleteChallengeMutation(this._request).fetch();
  }
  /**
   * Mutation organizationDelete for OrganizationDeletePayload
   *
   * @param input - required input to pass to organizationDelete
   * @returns OrganizationDeletePayload
   */
  public organizationDelete(input: D.DeleteOrganizationInput): Fetch<OrganizationDeletePayload> {
    return new OrganizationDeleteMutation(this._request).fetch(input);
  }
  /**
   * Mutation adminDeleteIntegration for AdminIntegrationPayload
   *
   * @param id - required id to pass to adminDeleteIntegration
   * @returns AdminIntegrationPayload
   */
  public adminDeleteIntegration(id: string): Fetch<AdminIntegrationPayload> {
    return new AdminDeleteIntegrationMutation(this._request).fetch(id);
  }
  /**
   * Mutation organizationToggleAccess for OrganizationAccessPayload
   *
   * @param id - required id to pass to organizationToggleAccess
   * @returns OrganizationAccessPayload
   */
  public organizationToggleAccess(id: string): Fetch<OrganizationAccessPayload> {
    return new OrganizationToggleAccessMutation(this._request).fetch(id);
  }
  /**
   * Mutation organizationChangeEmailDomain for OrganizationAccessPayload
   *
   * @param toDomain - required toDomain to pass to organizationChangeEmailDomain
   * @param fromDomain - required fromDomain to pass to organizationChangeEmailDomain
   * @param id - required id to pass to organizationChangeEmailDomain
   * @returns OrganizationAccessPayload
   */
  public organizationChangeEmailDomain(
    toDomain: string,
    fromDomain: string,
    id: string
  ): Fetch<OrganizationAccessPayload> {
    return new OrganizationChangeEmailDomainMutation(this._request).fetch(toDomain, fromDomain, id);
  }
  /**
   * Mutation organizationToggleSamlEnabled for OrganizationSamlConfigurePayload
   *
   * @param id - required id to pass to organizationToggleSamlEnabled
   * @returns OrganizationSamlConfigurePayload
   */
  public organizationToggleSamlEnabled(id: string): Fetch<OrganizationSamlConfigurePayload> {
    return new OrganizationToggleSamlEnabledMutation(this._request).fetch(id);
  }
  /**
   * Mutation organizationConfigureSaml for OrganizationSamlConfigurePayload
   *
   * @param samlConfiguration - required samlConfiguration to pass to organizationConfigureSaml
   * @param id - required id to pass to organizationConfigureSaml
   * @returns OrganizationSamlConfigurePayload
   */
  public organizationConfigureSaml(
    samlConfiguration: D.SamlConfigurationInput,
    id: string
  ): Fetch<OrganizationSamlConfigurePayload> {
    return new OrganizationConfigureSamlMutation(this._request).fetch(samlConfiguration, id);
  }
  /**
   * Mutation adminCommand for AdminCommandPayload
   *
   * @param input - required input to pass to adminCommand
   * @returns AdminCommandPayload
   */
  public adminCommand(input: D.AdminCommandInput): Fetch<AdminCommandPayload> {
    return new AdminCommandMutation(this._request).fetch(input);
  }
  /**
   * Mutation adminBulkEmail for AdminCommandPayload
   *
   * @param emails - required emails to pass to adminBulkEmail
   * @param markdownContent - required markdownContent to pass to adminBulkEmail
   * @param subject - required subject to pass to adminBulkEmail
   * @param variables - variables without 'emails', 'markdownContent', 'subject' to pass into the AdminBulkEmailMutation
   * @returns AdminCommandPayload
   */
  public adminBulkEmail(
    emails: string[],
    markdownContent: string,
    subject: string,
    variables?: Omit<D.AdminBulkEmailMutationVariables, "emails" | "markdownContent" | "subject">
  ): Fetch<AdminCommandPayload> {
    return new AdminBulkEmailMutation(this._request).fetch(emails, markdownContent, subject, variables);
  }
  /**
   * Mutation adminCreateStripeCustomer for AdminCommandPayload
   *
   * @param organizationId - required organizationId to pass to adminCreateStripeCustomer
   * @returns AdminCommandPayload
   */
  public adminCreateStripeCustomer(organizationId: string): Fetch<AdminCommandPayload> {
    return new AdminCreateStripeCustomerMutation(this._request).fetch(organizationId);
  }
  /**
   * Mutation adminScheduleAnonymousTask for AdminCommandPayload
   *
   * @param taskName - required taskName to pass to adminScheduleAnonymousTask
   * @returns AdminCommandPayload
   */
  public adminScheduleAnonymousTask(taskName: string): Fetch<AdminCommandPayload> {
    return new AdminScheduleAnonymousTaskMutation(this._request).fetch(taskName);
  }
  /**
   * Mutation adminUserAccountChangeEmail for UserAccountAdminPrivileged
   *
   * @param newEmail - required newEmail to pass to adminUserAccountChangeEmail
   * @param id - required id to pass to adminUserAccountChangeEmail
   * @returns UserAccountAdminPrivileged
   */
  public adminUserAccountChangeEmail(newEmail: string, id: string): Fetch<UserAccountAdminPrivileged> {
    return new AdminUserAccountChangeEmailMutation(this._request).fetch(newEmail, id);
  }
  /**
   * Mutation adminUserAccountDelete for AdminResponse
   *
   * @param email - required email to pass to adminUserAccountDelete
   * @param id - required id to pass to adminUserAccountDelete
   * @param variables - variables without 'email', 'id' to pass into the AdminUserAccountDeleteMutation
   * @returns AdminResponse
   */
  public adminUserAccountDelete(
    email: string,
    id: string,
    variables?: Omit<D.AdminUserAccountDeleteMutationVariables, "email" | "id">
  ): Fetch<AdminResponse> {
    return new AdminUserAccountDeleteMutation(this._request).fetch(email, id, variables);
  }
  /**
   * Mutation eventCreate for EventPayload
   *
   * @param input - required input to pass to eventCreate
   * @returns EventPayload
   */
  public eventCreate(input: D.EventCreateInput): Fetch<EventPayload> {
    return new EventCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation apiKeyCreate for ApiKeyPayload
   *
   * @param input - required input to pass to apiKeyCreate
   * @returns ApiKeyPayload
   */
  public apiKeyCreate(input: D.ApiKeyCreateInput): Fetch<ApiKeyPayload> {
    return new ApiKeyCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation apiKeyDelete for ArchivePayload
   *
   * @param id - required id to pass to apiKeyDelete
   * @returns ArchivePayload
   */
  public apiKeyDelete(id: string): Fetch<ArchivePayload> {
    return new ApiKeyDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation emailUserAccountAuthChallenge for EmailUserAccountAuthChallengeResponse
   *
   * @param input - required input to pass to emailUserAccountAuthChallenge
   * @returns EmailUserAccountAuthChallengeResponse
   */
  public emailUserAccountAuthChallenge(
    input: D.EmailUserAccountAuthChallengeInput
  ): Fetch<EmailUserAccountAuthChallengeResponse> {
    return new EmailUserAccountAuthChallengeMutation(this._request).fetch(input);
  }
  /**
   * Mutation emailTokenUserAccountAuth for AuthResolverResponse
   *
   * @param input - required input to pass to emailTokenUserAccountAuth
   * @returns AuthResolverResponse
   */
  public emailTokenUserAccountAuth(input: D.TokenUserAccountAuthInput): Fetch<AuthResolverResponse> {
    return new EmailTokenUserAccountAuthMutation(this._request).fetch(input);
  }
  /**
   * Mutation samlTokenUserAccountAuth for AuthResolverResponse
   *
   * @param input - required input to pass to samlTokenUserAccountAuth
   * @returns AuthResolverResponse
   */
  public samlTokenUserAccountAuth(input: D.TokenUserAccountAuthInput): Fetch<AuthResolverResponse> {
    return new SamlTokenUserAccountAuthMutation(this._request).fetch(input);
  }
  /**
   * Mutation googleUserAccountAuth for AuthResolverResponse
   *
   * @param input - required input to pass to googleUserAccountAuth
   * @returns AuthResolverResponse
   */
  public googleUserAccountAuth(input: D.GoogleUserAccountAuthInput): Fetch<AuthResolverResponse> {
    return new GoogleUserAccountAuthMutation(this._request).fetch(input);
  }
  /**
   * Mutation createOrganizationFromOnboarding for CreateOrJoinOrganizationResponse
   *
   * @param input - required input to pass to createOrganizationFromOnboarding
   * @param variables - variables without 'input' to pass into the CreateOrganizationFromOnboardingMutation
   * @returns CreateOrJoinOrganizationResponse
   */
  public createOrganizationFromOnboarding(
    input: D.CreateOrganizationInput,
    variables?: Omit<D.CreateOrganizationFromOnboardingMutationVariables, "input">
  ): Fetch<CreateOrJoinOrganizationResponse> {
    return new CreateOrganizationFromOnboardingMutation(this._request).fetch(input, variables);
  }
  /**
   * Mutation joinOrganizationFromOnboarding for CreateOrJoinOrganizationResponse
   *
   * @param input - required input to pass to joinOrganizationFromOnboarding
   * @returns CreateOrJoinOrganizationResponse
   */
  public joinOrganizationFromOnboarding(input: D.JoinOrganizationInput): Fetch<CreateOrJoinOrganizationResponse> {
    return new JoinOrganizationFromOnboardingMutation(this._request).fetch(input);
  }
  /**
   * Mutation leaveOrganization for CreateOrJoinOrganizationResponse
   *
   * @param organizationId - required organizationId to pass to leaveOrganization
   * @returns CreateOrJoinOrganizationResponse
   */
  public leaveOrganization(organizationId: string): Fetch<CreateOrJoinOrganizationResponse> {
    return new LeaveOrganizationMutation(this._request).fetch(organizationId);
  }
  /**
   * Mutation billingEmailUpdate for BillingEmailPayload
   *
   * @param input - required input to pass to billingEmailUpdate
   * @returns BillingEmailPayload
   */
  public billingEmailUpdate(input: D.BillingEmailUpdateInput): Fetch<BillingEmailPayload> {
    return new BillingEmailUpdateMutation(this._request).fetch(input);
  }
  /**
   * Mutation collaborativeDocumentUpdate for CollaborationDocumentUpdatePayload
   *
   * @param input - required input to pass to collaborativeDocumentUpdate
   * @returns CollaborationDocumentUpdatePayload
   */
  public collaborativeDocumentUpdate(
    input: D.CollaborationDocumentUpdateInput
  ): Fetch<CollaborationDocumentUpdatePayload> {
    return new CollaborativeDocumentUpdateMutation(this._request).fetch(input);
  }
  /**
   * Mutation commentCreate for CommentPayload
   *
   * @param input - required input to pass to commentCreate
   * @returns CommentPayload
   */
  public commentCreate(input: D.CommentCreateInput): Fetch<CommentPayload> {
    return new CommentCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation commentUpdate for CommentPayload
   *
   * @param input - required input to pass to commentUpdate
   * @param id - required id to pass to commentUpdate
   * @returns CommentPayload
   */
  public commentUpdate(input: D.CommentUpdateInput, id: string): Fetch<CommentPayload> {
    return new CommentUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation commentDelete for ArchivePayload
   *
   * @param id - required id to pass to commentDelete
   * @returns ArchivePayload
   */
  public commentDelete(id: string): Fetch<ArchivePayload> {
    return new CommentDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation contactCreate for ContactPayload
   *
   * @param input - required input to pass to contactCreate
   * @returns ContactPayload
   */
  public contactCreate(input: D.ContactCreateInput): Fetch<ContactPayload> {
    return new ContactCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation customViewCreate for CustomViewPayload
   *
   * @param input - required input to pass to customViewCreate
   * @returns CustomViewPayload
   */
  public customViewCreate(input: D.CustomViewCreateInput): Fetch<CustomViewPayload> {
    return new CustomViewCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation customViewUpdate for CustomViewPayload
   *
   * @param input - required input to pass to customViewUpdate
   * @param id - required id to pass to customViewUpdate
   * @returns CustomViewPayload
   */
  public customViewUpdate(input: D.CustomViewUpdateInput, id: string): Fetch<CustomViewPayload> {
    return new CustomViewUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation customViewDelete for ArchivePayload
   *
   * @param id - required id to pass to customViewDelete
   * @returns ArchivePayload
   */
  public customViewDelete(id: string): Fetch<ArchivePayload> {
    return new CustomViewDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation cycleCreate for CyclePayload
   *
   * @param input - required input to pass to cycleCreate
   * @returns CyclePayload
   */
  public cycleCreate(input: D.CycleCreateInput): Fetch<CyclePayload> {
    return new CycleCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation cycleUpdate for CyclePayload
   *
   * @param input - required input to pass to cycleUpdate
   * @param id - required id to pass to cycleUpdate
   * @returns CyclePayload
   */
  public cycleUpdate(input: D.CycleUpdateInput, id: string): Fetch<CyclePayload> {
    return new CycleUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation cycleArchive for ArchivePayload
   *
   * @param id - required id to pass to cycleArchive
   * @returns ArchivePayload
   */
  public cycleArchive(id: string): Fetch<ArchivePayload> {
    return new CycleArchiveMutation(this._request).fetch(id);
  }
  /**
   * Mutation debugFailWithInternalError for DebugPayload
   *
   * @returns DebugPayload
   */
  public get debugFailWithInternalError(): Fetch<DebugPayload> {
    return new DebugFailWithInternalErrorMutation(this._request).fetch();
  }
  /**
   * Mutation debugFailWithWarning for DebugPayload
   *
   * @returns DebugPayload
   */
  public get debugFailWithWarning(): Fetch<DebugPayload> {
    return new DebugFailWithWarningMutation(this._request).fetch();
  }
  /**
   * Mutation debugCreateSAMLOrg for DebugPayload
   *
   * @returns DebugPayload
   */
  public get debugCreateSAMLOrg(): Fetch<DebugPayload> {
    return new DebugCreateSamlOrgMutation(this._request).fetch();
  }
  /**
   * Mutation emailUnsubscribe for EmailUnsubscribePayload
   *
   * @param input - required input to pass to emailUnsubscribe
   * @returns EmailUnsubscribePayload
   */
  public emailUnsubscribe(input: D.EmailUnsubscribeInput): Fetch<EmailUnsubscribePayload> {
    return new EmailUnsubscribeMutation(this._request).fetch(input);
  }
  /**
   * Mutation emojiCreate for EmojiPayload
   *
   * @param input - required input to pass to emojiCreate
   * @returns EmojiPayload
   */
  public emojiCreate(input: D.EmojiCreateInput): Fetch<EmojiPayload> {
    return new EmojiCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation emojiDelete for ArchivePayload
   *
   * @param id - required id to pass to emojiDelete
   * @returns ArchivePayload
   */
  public emojiDelete(id: string): Fetch<ArchivePayload> {
    return new EmojiDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation favoriteCreate for FavoritePayload
   *
   * @param input - required input to pass to favoriteCreate
   * @returns FavoritePayload
   */
  public favoriteCreate(input: D.FavoriteCreateInput): Fetch<FavoritePayload> {
    return new FavoriteCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation favoriteUpdate for FavoritePayload
   *
   * @param input - required input to pass to favoriteUpdate
   * @param id - required id to pass to favoriteUpdate
   * @returns FavoritePayload
   */
  public favoriteUpdate(input: D.FavoriteUpdateInput, id: string): Fetch<FavoritePayload> {
    return new FavoriteUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation favoriteDelete for ArchivePayload
   *
   * @param id - required id to pass to favoriteDelete
   * @returns ArchivePayload
   */
  public favoriteDelete(id: string): Fetch<ArchivePayload> {
    return new FavoriteDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation feedbackCreate for FeedbackPayload
   *
   * @param input - required input to pass to feedbackCreate
   * @returns FeedbackPayload
   */
  public feedbackCreate(input: D.FeedbackCreateInput): Fetch<FeedbackPayload> {
    return new FeedbackCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation fileUpload for UploadPayload
   *
   * @param size - required size to pass to fileUpload
   * @param contentType - required contentType to pass to fileUpload
   * @param filename - required filename to pass to fileUpload
   * @param variables - variables without 'size', 'contentType', 'filename' to pass into the FileUploadMutation
   * @returns UploadPayload
   */
  public fileUpload(
    size: number,
    contentType: string,
    filename: string,
    variables?: Omit<D.FileUploadMutationVariables, "size" | "contentType" | "filename">
  ): Fetch<UploadPayload> {
    return new FileUploadMutation(this._request).fetch(size, contentType, filename, variables);
  }
  /**
   * Mutation imageUploadFromUrl for ImageUploadFromUrlPayload
   *
   * @param url - required url to pass to imageUploadFromUrl
   * @returns ImageUploadFromUrlPayload
   */
  public imageUploadFromUrl(url: string): Fetch<ImageUploadFromUrlPayload> {
    return new ImageUploadFromUrlMutation(this._request).fetch(url);
  }
  /**
   * Mutation integrationGithubConnect for IntegrationPayload
   *
   * @param installationId - required installationId to pass to integrationGithubConnect
   * @returns IntegrationPayload
   */
  public integrationGithubConnect(installationId: string): Fetch<IntegrationPayload> {
    return new IntegrationGithubConnectMutation(this._request).fetch(installationId);
  }
  /**
   * Mutation integrationGitlabConnect for IntegrationPayload
   *
   * @param gitlabUrl - required gitlabUrl to pass to integrationGitlabConnect
   * @param accessToken - required accessToken to pass to integrationGitlabConnect
   * @returns IntegrationPayload
   */
  public integrationGitlabConnect(gitlabUrl: string, accessToken: string): Fetch<IntegrationPayload> {
    return new IntegrationGitlabConnectMutation(this._request).fetch(gitlabUrl, accessToken);
  }
  /**
   * Mutation integrationSlack for IntegrationPayload
   *
   * @param redirectUri - required redirectUri to pass to integrationSlack
   * @param code - required code to pass to integrationSlack
   * @param variables - variables without 'redirectUri', 'code' to pass into the IntegrationSlackMutation
   * @returns IntegrationPayload
   */
  public integrationSlack(
    redirectUri: string,
    code: string,
    variables?: Omit<D.IntegrationSlackMutationVariables, "redirectUri" | "code">
  ): Fetch<IntegrationPayload> {
    return new IntegrationSlackMutation(this._request).fetch(redirectUri, code, variables);
  }
  /**
   * Mutation integrationSlackPersonal for IntegrationPayload
   *
   * @param redirectUri - required redirectUri to pass to integrationSlackPersonal
   * @param code - required code to pass to integrationSlackPersonal
   * @returns IntegrationPayload
   */
  public integrationSlackPersonal(redirectUri: string, code: string): Fetch<IntegrationPayload> {
    return new IntegrationSlackPersonalMutation(this._request).fetch(redirectUri, code);
  }
  /**
   * Mutation integrationSlackPost for IntegrationPayload
   *
   * @param redirectUri - required redirectUri to pass to integrationSlackPost
   * @param teamId - required teamId to pass to integrationSlackPost
   * @param code - required code to pass to integrationSlackPost
   * @param variables - variables without 'redirectUri', 'teamId', 'code' to pass into the IntegrationSlackPostMutation
   * @returns IntegrationPayload
   */
  public integrationSlackPost(
    redirectUri: string,
    teamId: string,
    code: string,
    variables?: Omit<D.IntegrationSlackPostMutationVariables, "redirectUri" | "teamId" | "code">
  ): Fetch<IntegrationPayload> {
    return new IntegrationSlackPostMutation(this._request).fetch(redirectUri, teamId, code, variables);
  }
  /**
   * Mutation integrationSlackProjectPost for IntegrationPayload
   *
   * @param redirectUri - required redirectUri to pass to integrationSlackProjectPost
   * @param projectId - required projectId to pass to integrationSlackProjectPost
   * @param code - required code to pass to integrationSlackProjectPost
   * @returns IntegrationPayload
   */
  public integrationSlackProjectPost(redirectUri: string, projectId: string, code: string): Fetch<IntegrationPayload> {
    return new IntegrationSlackProjectPostMutation(this._request).fetch(redirectUri, projectId, code);
  }
  /**
   * Mutation integrationSlackImportEmojis for IntegrationPayload
   *
   * @param redirectUri - required redirectUri to pass to integrationSlackImportEmojis
   * @param code - required code to pass to integrationSlackImportEmojis
   * @returns IntegrationPayload
   */
  public integrationSlackImportEmojis(redirectUri: string, code: string): Fetch<IntegrationPayload> {
    return new IntegrationSlackImportEmojisMutation(this._request).fetch(redirectUri, code);
  }
  /**
   * Mutation integrationFigma for IntegrationPayload
   *
   * @param redirectUri - required redirectUri to pass to integrationFigma
   * @param code - required code to pass to integrationFigma
   * @returns IntegrationPayload
   */
  public integrationFigma(redirectUri: string, code: string): Fetch<IntegrationPayload> {
    return new IntegrationFigmaMutation(this._request).fetch(redirectUri, code);
  }
  /**
   * Mutation integrationGoogleSheets for IntegrationPayload
   *
   * @param code - required code to pass to integrationGoogleSheets
   * @returns IntegrationPayload
   */
  public integrationGoogleSheets(code: string): Fetch<IntegrationPayload> {
    return new IntegrationGoogleSheetsMutation(this._request).fetch(code);
  }
  /**
   * Mutation refreshGoogleSheetsData for IntegrationPayload
   *
   * @param id - required id to pass to refreshGoogleSheetsData
   * @returns IntegrationPayload
   */
  public refreshGoogleSheetsData(id: string): Fetch<IntegrationPayload> {
    return new RefreshGoogleSheetsDataMutation(this._request).fetch(id);
  }
  /**
   * Mutation integrationSentryConnect for IntegrationPayload
   *
   * @param organizationSlug - required organizationSlug to pass to integrationSentryConnect
   * @param code - required code to pass to integrationSentryConnect
   * @param installationId - required installationId to pass to integrationSentryConnect
   * @returns IntegrationPayload
   */
  public integrationSentryConnect(
    organizationSlug: string,
    code: string,
    installationId: string
  ): Fetch<IntegrationPayload> {
    return new IntegrationSentryConnectMutation(this._request).fetch(organizationSlug, code, installationId);
  }
  /**
   * Mutation integrationDelete for ArchivePayload
   *
   * @param id - required id to pass to integrationDelete
   * @returns ArchivePayload
   */
  public integrationDelete(id: string): Fetch<ArchivePayload> {
    return new IntegrationDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation integrationResourceArchive for ArchivePayload
   *
   * @param id - required id to pass to integrationResourceArchive
   * @returns ArchivePayload
   */
  public integrationResourceArchive(id: string): Fetch<ArchivePayload> {
    return new IntegrationResourceArchiveMutation(this._request).fetch(id);
  }
  /**
   * Mutation issueLabelCreate for IssueLabelPayload
   *
   * @param input - required input to pass to issueLabelCreate
   * @returns IssueLabelPayload
   */
  public issueLabelCreate(input: D.IssueLabelCreateInput): Fetch<IssueLabelPayload> {
    return new IssueLabelCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation issueLabelUpdate for IssueLabelPayload
   *
   * @param input - required input to pass to issueLabelUpdate
   * @param id - required id to pass to issueLabelUpdate
   * @returns IssueLabelPayload
   */
  public issueLabelUpdate(input: D.IssueLabelUpdateInput, id: string): Fetch<IssueLabelPayload> {
    return new IssueLabelUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation issueLabelArchive for ArchivePayload
   *
   * @param id - required id to pass to issueLabelArchive
   * @returns ArchivePayload
   */
  public issueLabelArchive(id: string): Fetch<ArchivePayload> {
    return new IssueLabelArchiveMutation(this._request).fetch(id);
  }
  /**
   * Mutation issueRelationCreate for IssueRelationPayload
   *
   * @param input - required input to pass to issueRelationCreate
   * @returns IssueRelationPayload
   */
  public issueRelationCreate(input: D.IssueRelationCreateInput): Fetch<IssueRelationPayload> {
    return new IssueRelationCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation issueRelationUpdate for IssueRelationPayload
   *
   * @param input - required input to pass to issueRelationUpdate
   * @param id - required id to pass to issueRelationUpdate
   * @returns IssueRelationPayload
   */
  public issueRelationUpdate(input: D.IssueRelationUpdateInput, id: string): Fetch<IssueRelationPayload> {
    return new IssueRelationUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation issueRelationDelete for ArchivePayload
   *
   * @param id - required id to pass to issueRelationDelete
   * @returns ArchivePayload
   */
  public issueRelationDelete(id: string): Fetch<ArchivePayload> {
    return new IssueRelationDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation issueCreate for IssuePayload
   *
   * @param input - required input to pass to issueCreate
   * @returns IssuePayload
   */
  public issueCreate(input: D.IssueCreateInput): Fetch<IssuePayload> {
    return new IssueCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation issueUpdate for IssuePayload
   *
   * @param input - required input to pass to issueUpdate
   * @param id - required id to pass to issueUpdate
   * @returns IssuePayload
   */
  public issueUpdate(input: D.IssueUpdateInput, id: string): Fetch<IssuePayload> {
    return new IssueUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation issueArchive for ArchivePayload
   *
   * @param id - required id to pass to issueArchive
   * @returns ArchivePayload
   */
  public issueArchive(id: string): Fetch<ArchivePayload> {
    return new IssueArchiveMutation(this._request).fetch(id);
  }
  /**
   * Mutation issueUnarchive for ArchivePayload
   *
   * @param id - required id to pass to issueUnarchive
   * @returns ArchivePayload
   */
  public issueUnarchive(id: string): Fetch<ArchivePayload> {
    return new IssueUnarchiveMutation(this._request).fetch(id);
  }
  /**
   * Mutation milestoneCreate for MilestonePayload
   *
   * @param input - required input to pass to milestoneCreate
   * @returns MilestonePayload
   */
  public milestoneCreate(input: D.MilestoneCreateInput): Fetch<MilestonePayload> {
    return new MilestoneCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation milestoneUpdate for MilestonePayload
   *
   * @param input - required input to pass to milestoneUpdate
   * @param id - required id to pass to milestoneUpdate
   * @returns MilestonePayload
   */
  public milestoneUpdate(input: D.MilestoneUpdateInput, id: string): Fetch<MilestonePayload> {
    return new MilestoneUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation milestoneDelete for ArchivePayload
   *
   * @param id - required id to pass to milestoneDelete
   * @returns ArchivePayload
   */
  public milestoneDelete(id: string): Fetch<ArchivePayload> {
    return new MilestoneDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation notificationCreate for NotificationPayload
   *
   * @param input - required input to pass to notificationCreate
   * @param id - required id to pass to notificationCreate
   * @returns NotificationPayload
   */
  public notificationCreate(input: D.NotificationUpdateInput, id: string): Fetch<NotificationPayload> {
    return new NotificationCreateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation notificationUpdate for NotificationPayload
   *
   * @param input - required input to pass to notificationUpdate
   * @param id - required id to pass to notificationUpdate
   * @returns NotificationPayload
   */
  public notificationUpdate(input: D.NotificationUpdateInput, id: string): Fetch<NotificationPayload> {
    return new NotificationUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation notificationDelete for ArchivePayload
   *
   * @param id - required id to pass to notificationDelete
   * @returns ArchivePayload
   */
  public notificationDelete(id: string): Fetch<ArchivePayload> {
    return new NotificationDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation notificationArchive for ArchivePayload
   *
   * @param id - required id to pass to notificationArchive
   * @returns ArchivePayload
   */
  public notificationArchive(id: string): Fetch<ArchivePayload> {
    return new NotificationArchiveMutation(this._request).fetch(id);
  }
  /**
   * Mutation notificationUnarchive for ArchivePayload
   *
   * @param id - required id to pass to notificationUnarchive
   * @returns ArchivePayload
   */
  public notificationUnarchive(id: string): Fetch<ArchivePayload> {
    return new NotificationUnarchiveMutation(this._request).fetch(id);
  }
  /**
   * Mutation notificationSubscriptionCreate for NotificationSubscriptionPayload
   *
   * @param input - required input to pass to notificationSubscriptionCreate
   * @returns NotificationSubscriptionPayload
   */
  public notificationSubscriptionCreate(
    input: D.NotificationSubscriptionCreateInput
  ): Fetch<NotificationSubscriptionPayload> {
    return new NotificationSubscriptionCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation notificationSubscriptionDelete for ArchivePayload
   *
   * @param id - required id to pass to notificationSubscriptionDelete
   * @returns ArchivePayload
   */
  public notificationSubscriptionDelete(id: string): Fetch<ArchivePayload> {
    return new NotificationSubscriptionDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation oauthClientCreate for OauthClientPayload
   *
   * @param input - required input to pass to oauthClientCreate
   * @returns OauthClientPayload
   */
  public oauthClientCreate(input: D.OauthClientCreateInput): Fetch<OauthClientPayload> {
    return new OauthClientCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation oauthClientUpdate for OauthClientPayload
   *
   * @param input - required input to pass to oauthClientUpdate
   * @param id - required id to pass to oauthClientUpdate
   * @returns OauthClientPayload
   */
  public oauthClientUpdate(input: D.OauthClientUpdateInput, id: string): Fetch<OauthClientPayload> {
    return new OauthClientUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation oauthClientArchive for ArchivePayload
   *
   * @param id - required id to pass to oauthClientArchive
   * @returns ArchivePayload
   */
  public oauthClientArchive(id: string): Fetch<ArchivePayload> {
    return new OauthClientArchiveMutation(this._request).fetch(id);
  }
  /**
   * Mutation oauthClientRotateSecret for RotateSecretPayload
   *
   * @param id - required id to pass to oauthClientRotateSecret
   * @returns RotateSecretPayload
   */
  public oauthClientRotateSecret(id: string): Fetch<RotateSecretPayload> {
    return new OauthClientRotateSecretMutation(this._request).fetch(id);
  }
  /**
   * Mutation oauthTokenRevoke for OauthTokenRevokePayload
   *
   * @param scope - required scope to pass to oauthTokenRevoke
   * @param appId - required appId to pass to oauthTokenRevoke
   * @returns OauthTokenRevokePayload
   */
  public oauthTokenRevoke(scope: string[], appId: string): Fetch<OauthTokenRevokePayload> {
    return new OauthTokenRevokeMutation(this._request).fetch(scope, appId);
  }
  /**
   * Mutation organizationDomainVerify for OrganizationDomainPayload
   *
   * @param input - required input to pass to organizationDomainVerify
   * @returns OrganizationDomainPayload
   */
  public organizationDomainVerify(input: D.OrganizationDomainVerificationInput): Fetch<OrganizationDomainPayload> {
    return new OrganizationDomainVerifyMutation(this._request).fetch(input);
  }
  /**
   * Mutation organizationDomainCreate for OrganizationDomainPayload
   *
   * @param input - required input to pass to organizationDomainCreate
   * @returns OrganizationDomainPayload
   */
  public organizationDomainCreate(input: D.OrganizationDomainCreateInput): Fetch<OrganizationDomainPayload> {
    return new OrganizationDomainCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation organizationDomainDelete for ArchivePayload
   *
   * @param id - required id to pass to organizationDomainDelete
   * @returns ArchivePayload
   */
  public organizationDomainDelete(id: string): Fetch<ArchivePayload> {
    return new OrganizationDomainDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation organizationInviteCreate for OrganizationInvitePayload
   *
   * @param input - required input to pass to organizationInviteCreate
   * @returns OrganizationInvitePayload
   */
  public organizationInviteCreate(input: D.OrganizationInviteCreateInput): Fetch<OrganizationInvitePayload> {
    return new OrganizationInviteCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation resentOrganizationInvite for ArchivePayload
   *
   * @param id - required id to pass to resentOrganizationInvite
   * @returns ArchivePayload
   */
  public resentOrganizationInvite(id: string): Fetch<ArchivePayload> {
    return new ResentOrganizationInviteMutation(this._request).fetch(id);
  }
  /**
   * Mutation organizationInviteDelete for ArchivePayload
   *
   * @param id - required id to pass to organizationInviteDelete
   * @returns ArchivePayload
   */
  public organizationInviteDelete(id: string): Fetch<ArchivePayload> {
    return new OrganizationInviteDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation projectLinkCreate for ProjectLinkPayload
   *
   * @param input - required input to pass to projectLinkCreate
   * @returns ProjectLinkPayload
   */
  public projectLinkCreate(input: D.ProjectLinkCreateInput): Fetch<ProjectLinkPayload> {
    return new ProjectLinkCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation projectLinkDelete for ArchivePayload
   *
   * @param id - required id to pass to projectLinkDelete
   * @returns ArchivePayload
   */
  public projectLinkDelete(id: string): Fetch<ArchivePayload> {
    return new ProjectLinkDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation projectCreate for ProjectPayload
   *
   * @param input - required input to pass to projectCreate
   * @returns ProjectPayload
   */
  public projectCreate(input: D.ProjectCreateInput): Fetch<ProjectPayload> {
    return new ProjectCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation projectUpdate for ProjectPayload
   *
   * @param input - required input to pass to projectUpdate
   * @param id - required id to pass to projectUpdate
   * @returns ProjectPayload
   */
  public projectUpdate(input: D.ProjectUpdateInput, id: string): Fetch<ProjectPayload> {
    return new ProjectUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation projectArchive for ArchivePayload
   *
   * @param id - required id to pass to projectArchive
   * @returns ArchivePayload
   */
  public projectArchive(id: string): Fetch<ArchivePayload> {
    return new ProjectArchiveMutation(this._request).fetch(id);
  }
  /**
   * Mutation pushSubscriptionCreate for PushSubscriptionPayload
   *
   * @param input - required input to pass to pushSubscriptionCreate
   * @returns PushSubscriptionPayload
   */
  public pushSubscriptionCreate(input: D.PushSubscriptionCreateInput): Fetch<PushSubscriptionPayload> {
    return new PushSubscriptionCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation pushSubscriptionDelete for PushSubscriptionPayload
   *
   * @param id - required id to pass to pushSubscriptionDelete
   * @returns PushSubscriptionPayload
   */
  public pushSubscriptionDelete(id: string): Fetch<PushSubscriptionPayload> {
    return new PushSubscriptionDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation reactionCreate for ReactionPayload
   *
   * @param input - required input to pass to reactionCreate
   * @returns ReactionPayload
   */
  public reactionCreate(input: D.ReactionCreateInput): Fetch<ReactionPayload> {
    return new ReactionCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation reactionDelete for ArchivePayload
   *
   * @param id - required id to pass to reactionDelete
   * @returns ArchivePayload
   */
  public reactionDelete(id: string): Fetch<ArchivePayload> {
    return new ReactionDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation createCsvExportReport for CreateCsvExportReportPayload
   *
   * @returns CreateCsvExportReportPayload
   */
  public get createCsvExportReport(): Fetch<CreateCsvExportReportPayload> {
    return new CreateCsvExportReportMutation(this._request).fetch();
  }
  /**
   * Mutation subscriptionSessionCreate for SubscriptionSessionPayload
   *
   * @param plan - required plan to pass to subscriptionSessionCreate
   * @returns SubscriptionSessionPayload
   */
  public subscriptionSessionCreate(plan: string): Fetch<SubscriptionSessionPayload> {
    return new SubscriptionSessionCreateMutation(this._request).fetch(plan);
  }
  /**
   * Mutation subscriptionUpdateSessionCreate for SubscriptionSessionPayload
   *
   * @returns SubscriptionSessionPayload
   */
  public get subscriptionUpdateSessionCreate(): Fetch<SubscriptionSessionPayload> {
    return new SubscriptionUpdateSessionCreateMutation(this._request).fetch();
  }
  /**
   * Mutation subscriptionUpdate for SubscriptionPayload
   *
   * @param input - required input to pass to subscriptionUpdate
   * @param id - required id to pass to subscriptionUpdate
   * @returns SubscriptionPayload
   */
  public subscriptionUpdate(input: D.SubscriptionUpdateInput, id: string): Fetch<SubscriptionPayload> {
    return new SubscriptionUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation subscriptionUpgrade for SubscriptionPayload
   *
   * @param type - required type to pass to subscriptionUpgrade
   * @param id - required id to pass to subscriptionUpgrade
   * @returns SubscriptionPayload
   */
  public subscriptionUpgrade(type: string, id: string): Fetch<SubscriptionPayload> {
    return new SubscriptionUpgradeMutation(this._request).fetch(type, id);
  }
  /**
   * Mutation subscriptionArchive for ArchivePayload
   *
   * @param id - required id to pass to subscriptionArchive
   * @returns ArchivePayload
   */
  public subscriptionArchive(id: string): Fetch<ArchivePayload> {
    return new SubscriptionArchiveMutation(this._request).fetch(id);
  }
  /**
   * Mutation teamMembershipCreate for TeamMembershipPayload
   *
   * @param input - required input to pass to teamMembershipCreate
   * @returns TeamMembershipPayload
   */
  public teamMembershipCreate(input: D.TeamMembershipCreateInput): Fetch<TeamMembershipPayload> {
    return new TeamMembershipCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation teamMembershipDelete for ArchivePayload
   *
   * @param id - required id to pass to teamMembershipDelete
   * @returns ArchivePayload
   */
  public teamMembershipDelete(id: string): Fetch<ArchivePayload> {
    return new TeamMembershipDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation teamCreate for TeamPayload
   *
   * @param input - required input to pass to teamCreate
   * @param variables - variables without 'input' to pass into the TeamCreateMutation
   * @returns TeamPayload
   */
  public teamCreate(
    input: D.TeamCreateInput,
    variables?: Omit<D.TeamCreateMutationVariables, "input">
  ): Fetch<TeamPayload> {
    return new TeamCreateMutation(this._request).fetch(input, variables);
  }
  /**
   * Mutation teamUpdate for TeamPayload
   *
   * @param input - required input to pass to teamUpdate
   * @param id - required id to pass to teamUpdate
   * @returns TeamPayload
   */
  public teamUpdate(input: D.TeamUpdateInput, id: string): Fetch<TeamPayload> {
    return new TeamUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation teamArchive for ArchivePayload
   *
   * @param id - required id to pass to teamArchive
   * @returns ArchivePayload
   */
  public teamArchive(id: string): Fetch<ArchivePayload> {
    return new TeamArchiveMutation(this._request).fetch(id);
  }
  /**
   * Mutation teamDelete for ArchivePayload
   *
   * @param id - required id to pass to teamDelete
   * @returns ArchivePayload
   */
  public teamDelete(id: string): Fetch<ArchivePayload> {
    return new TeamDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation templateCreate for TemplatePayload
   *
   * @param input - required input to pass to templateCreate
   * @returns TemplatePayload
   */
  public templateCreate(input: D.TemplateCreateInput): Fetch<TemplatePayload> {
    return new TemplateCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation templateUpdate for TemplatePayload
   *
   * @param input - required input to pass to templateUpdate
   * @param id - required id to pass to templateUpdate
   * @returns TemplatePayload
   */
  public templateUpdate(input: D.TemplateUpdateInput, id: string): Fetch<TemplatePayload> {
    return new TemplateUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation templateDelete for ArchivePayload
   *
   * @param id - required id to pass to templateDelete
   * @returns ArchivePayload
   */
  public templateDelete(id: string): Fetch<ArchivePayload> {
    return new TemplateDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation userSettingsUpdate for UserSettingsPayload
   *
   * @param input - required input to pass to userSettingsUpdate
   * @param id - required id to pass to userSettingsUpdate
   * @returns UserSettingsPayload
   */
  public userSettingsUpdate(input: D.UserSettingsUpdateInput, id: string): Fetch<UserSettingsPayload> {
    return new UserSettingsUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation userSettingsFlagIncrement for UserSettingsFlagPayload
   *
   * @param flag - required flag to pass to userSettingsFlagIncrement
   * @returns UserSettingsFlagPayload
   */
  public userSettingsFlagIncrement(flag: string): Fetch<UserSettingsFlagPayload> {
    return new UserSettingsFlagIncrementMutation(this._request).fetch(flag);
  }
  /**
   * Mutation userSettingsFlagsReset for UserSettingsFlagsResetPayload
   *
   * @returns UserSettingsFlagsResetPayload
   */
  public get userSettingsFlagsReset(): Fetch<UserSettingsFlagsResetPayload> {
    return new UserSettingsFlagsResetMutation(this._request).fetch();
  }
  /**
   * Mutation userFlagUpdate for UserSettingsFlagPayload
   *
   * @param operation - required operation to pass to userFlagUpdate
   * @param flag - required flag to pass to userFlagUpdate
   * @returns UserSettingsFlagPayload
   */
  public userFlagUpdate(operation: D.UserFlagUpdateOperation, flag: D.UserFlagType): Fetch<UserSettingsFlagPayload> {
    return new UserFlagUpdateMutation(this._request).fetch(operation, flag);
  }
  /**
   * Mutation userSubscribeToNewsletter for UserSubscribeToNewsletterPayload
   *
   * @returns UserSubscribeToNewsletterPayload
   */
  public get userSubscribeToNewsletter(): Fetch<UserSubscribeToNewsletterPayload> {
    return new UserSubscribeToNewsletterMutation(this._request).fetch();
  }
  /**
   * Mutation viewPreferencesCreate for ViewPreferencesPayload
   *
   * @param input - required input to pass to viewPreferencesCreate
   * @returns ViewPreferencesPayload
   */
  public viewPreferencesCreate(input: D.ViewPreferencesCreateInput): Fetch<ViewPreferencesPayload> {
    return new ViewPreferencesCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation viewPreferencesUpdate for ViewPreferencesPayload
   *
   * @param input - required input to pass to viewPreferencesUpdate
   * @param id - required id to pass to viewPreferencesUpdate
   * @returns ViewPreferencesPayload
   */
  public viewPreferencesUpdate(input: D.ViewPreferencesUpdateInput, id: string): Fetch<ViewPreferencesPayload> {
    return new ViewPreferencesUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation viewPreferencesDelete for ArchivePayload
   *
   * @param id - required id to pass to viewPreferencesDelete
   * @returns ArchivePayload
   */
  public viewPreferencesDelete(id: string): Fetch<ArchivePayload> {
    return new ViewPreferencesDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation webhookCreate for WebhookPayload
   *
   * @param input - required input to pass to webhookCreate
   * @returns WebhookPayload
   */
  public webhookCreate(input: D.WebhookCreateInput): Fetch<WebhookPayload> {
    return new WebhookCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation webhookUpdate for WebhookPayload
   *
   * @param input - required input to pass to webhookUpdate
   * @param id - required id to pass to webhookUpdate
   * @returns WebhookPayload
   */
  public webhookUpdate(input: D.WebhookUpdateInput, id: string): Fetch<WebhookPayload> {
    return new WebhookUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation webhookDelete for ArchivePayload
   *
   * @param id - required id to pass to webhookDelete
   * @returns ArchivePayload
   */
  public webhookDelete(id: string): Fetch<ArchivePayload> {
    return new WebhookDeleteMutation(this._request).fetch(id);
  }
  /**
   * Mutation workflowStateCreate for WorkflowStatePayload
   *
   * @param input - required input to pass to workflowStateCreate
   * @returns WorkflowStatePayload
   */
  public workflowStateCreate(input: D.WorkflowStateCreateInput): Fetch<WorkflowStatePayload> {
    return new WorkflowStateCreateMutation(this._request).fetch(input);
  }
  /**
   * Mutation workflowStateUpdate for WorkflowStatePayload
   *
   * @param input - required input to pass to workflowStateUpdate
   * @param id - required id to pass to workflowStateUpdate
   * @returns WorkflowStatePayload
   */
  public workflowStateUpdate(input: D.WorkflowStateUpdateInput, id: string): Fetch<WorkflowStatePayload> {
    return new WorkflowStateUpdateMutation(this._request).fetch(input, id);
  }
  /**
   * Mutation workflowStateArchive for ArchivePayload
   *
   * @param id - required id to pass to workflowStateArchive
   * @returns ArchivePayload
   */
  public workflowStateArchive(id: string): Fetch<ArchivePayload> {
    return new WorkflowStateArchiveMutation(this._request).fetch(id);
  }
}
