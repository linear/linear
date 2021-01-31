/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocumentNode } from "graphql";
import * as D from "./documents";
export * from "./documents";

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

  /** Fetch the next page of results and append to nodes */
  public get fetchNext(): Promise<this> {
    return this.pageInfo?.hasNextPage
      ? this._fetch({ after: this.pageInfo?.endCursor }).then(response => {
          this._appendNodes(response?.nodes);
          this._appendPageInfo(response?.pageInfo);
          return this;
        })
      : Promise.resolve(this);
  }

  /** Fetch the previous page of results and prepend to nodes */
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
 * An API key. Grants access to the user's resources.
 *
 * @param request - function to call the graphql client
 * @param data - D.ApiKeyFragment response data
 */
class ApiKey extends LinearRequest {
  public constructor(request: Request, data: D.ApiKeyFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.label = data.label ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /** The label of the API key. */
  public label?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
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
      data?.nodes ? data.nodes.map(node => new ApiKey(request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
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
 * Public information of the OAuth application.
 *
 * @param request - function to call the graphql client
 * @param data - D.ApplicationFragment response data
 */
class Application extends LinearRequest {
  public constructor(request: Request, data: D.ApplicationFragment) {
    super(request);
    this.clientId = data.clientId ?? undefined;
    this.description = data.description ?? undefined;
    this.developer = data.developer ?? undefined;
    this.developerUrl = data.developerUrl ?? undefined;
    this.imageUrl = data.imageUrl ?? undefined;
    this.name = data.name ?? undefined;
  }

  /** OAuth application's client ID. */
  public clientId?: string;
  /** Information about the application. */
  public description?: string;
  /** Name of the developer. */
  public developer?: string;
  /** Url of the developer (homepage or docs). */
  public developerUrl?: string;
  /** Image of the application. */
  public imageUrl?: string;
  /** Application name. */
  public name?: string;
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
 * Contains requested archived model objects.
 *
 * @param request - function to call the graphql client
 * @param data - D.ArchiveResponseFragment response data
 */
class ArchiveResponse extends LinearRequest {
  public constructor(request: Request, data: D.ArchiveResponseFragment) {
    super(request);
    this.archive = data.archive ?? undefined;
    this.databaseVersion = data.databaseVersion ?? undefined;
    this.totalCount = data.totalCount ?? undefined;
  }

  /** A JSON serialized collection of model objects loaded from the archive */
  public archive?: string;
  /** The version of the remote database. Incremented by 1 for each migration run on the database. */
  public databaseVersion?: number;
  /** The total number of entities in the archive. */
  public totalCount?: number;
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
    this.allowDomainAccess = data.allowDomainAccess ?? undefined;
    this.email = data.email ?? undefined;
    this.id = data.id ?? undefined;
    this.token = data.token ?? undefined;
    this.availableOrganizations = data.availableOrganizations
      ? data.availableOrganizations.map(node => new Organization(request, node))
      : undefined;
    this.users = data.users ? data.users.map(node => new User(request, node)) : undefined;
  }

  /** Should the signup flow allow access for the domain. */
  public allowDomainAccess?: boolean;
  /** Email for the authenticated account. */
  public email?: string;
  /** User account ID. */
  public id?: string;
  /** JWT token for authentication of the account. */
  public token?: string;
  /** Organizations this account has access to, but is not yet a member. */
  public availableOrganizations?: Organization[];
  /** Users belonging to this account. */
  public users?: User[];
}
/**
 * Public information of the OAuth application, plus the authorized scopes for a given user.
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserFragment response data
 */
class AuthorizedApplication extends LinearRequest {
  public constructor(request: Request, data: D.AuthorizedApplicationFragment) {
    super(request);
    this.appId = data.appId ?? undefined;
    this.clientId = data.clientId ?? undefined;
    this.description = data.description ?? undefined;
    this.developer = data.developer ?? undefined;
    this.developerUrl = data.developerUrl ?? undefined;
    this.imageUrl = data.imageUrl ?? undefined;
    this.name = data.name ?? undefined;
    this.scope = data.scope ?? undefined;
  }

  /** OAuth application's ID. */
  public appId?: string;
  /** OAuth application's client ID. */
  public clientId?: string;
  /** Information about the application. */
  public description?: string;
  /** Name of the developer. */
  public developer?: string;
  /** Url of the developer (homepage or docs). */
  public developerUrl?: string;
  /** Image of the application. */
  public imageUrl?: string;
  /** Application name. */
  public name?: string;
  /** Scopes that are authorized for this application for a given user. */
  public scope?: string[];
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
    this.email = data.email ?? undefined;
    this.success = data.success ?? undefined;
    this.paymentMethod = data.paymentMethod ? new Card(request, data.paymentMethod) : undefined;
    this.invoices = data.invoices ? data.invoices.map(node => new Invoice(request, node)) : undefined;
  }

  /** The customer's email address the invoices are sent to. */
  public email?: string;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** List of invoices, if any. */
  public invoices?: Invoice[];
  /** The payment method. */
  public paymentMethod?: Card;
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
    this.email = data.email ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The customer's email address the invoices are sent to. */
  public email?: string;
  /** Whether the operation was successful. */
  public success?: boolean;
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
 * A comment associated with an issue.
 *
 * @param request - function to call the graphql client
 * @param data - D.CommentFragment response data
 */
class Comment extends LinearRequest {
  private _issue?: D.CommentFragment["issue"];
  private _user?: D.CommentFragment["user"];

  public constructor(request: Request, data: D.CommentFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.body = data.body ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.editedAt = data.editedAt ?? undefined;
    this.id = data.id ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._issue = data.issue ?? undefined;
    this._user = data.user ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The comment content in markdown format. */
  public body?: string;
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The time user edited the comment. */
  public editedAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** The issue that the comment is associated with. */
  public get issue(): Fetch<Issue> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
  /** The user who wrote the comment. */
  public get user(): Fetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
}
/**
 * CommentConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserSettingsFragment response data
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
 * @param data - the initial IssueConnectionFragment response data
 */
class IssueConnection extends LinearRequest {
  public constructor(request: Request, data: D.IssueConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Issue(request, node)) : undefined;
  }
}
/**
 * CommentPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueFragment response data
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
 * GitHub's commit data
 *
 * @param request - function to call the graphql client
 * @param data - D.CommitPayloadFragment response data
 */
class CommitPayload extends LinearRequest {
  public constructor(request: Request, data: D.CommitPayloadFragment) {
    super(request);
    this.added = data.added ?? undefined;
    this.id = data.id ?? undefined;
    this.message = data.message ?? undefined;
    this.modified = data.modified ?? undefined;
    this.removed = data.removed ?? undefined;
    this.timestamp = data.timestamp ?? undefined;
    this.url = data.url ?? undefined;
  }

  public added?: string[];
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
 * @param data - the initial TeamFragment response data
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
 * @param data - the initial WorkflowStateFragment response data
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
 * @param data - the initial CycleConnectionFragment response data
 */
class CycleConnection extends LinearRequest {
  public constructor(request: Request, data: D.CycleConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Cycle(request, node)) : undefined;
  }
}
/**
 * A set of issues to be resolved in a specified amount of time.
 *
 * @param request - function to call the graphql client
 * @param data - the initial CycleFragment response data
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
 * @param data - the initial PageInfoFragment response data
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
 * @param data - the initial TeamMembershipConnectionFragment response data
 */
class TeamMembershipConnection extends LinearRequest {
  public constructor(request: Request, data: D.TeamMembershipConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new TeamMembership(request, node)) : undefined;
  }
}
/**
 * Defines the membership of a user to a team.
 *
 * @param request - function to call the graphql client
 * @param data - the initial TeamMembershipFragment response data
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
 * @param data - the initial ProjectConnectionFragment response data
 */
class ProjectConnection extends LinearRequest {
  public constructor(request: Request, data: D.ProjectConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Project(request, node)) : undefined;
  }
}
/**
 * A project.
 *
 * @param request - function to call the graphql client
 * @param data - the initial ProjectFragment response data
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
 * @param data - the initial MilestoneFragment response data
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
 * @param data - the initial OrganizationFragment response data
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
    this.periodUploadVolume = data.periodUploadVolume ?? undefined;
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
  /** Rolling 30-day total upload volume for the organization, in megabytes. */
  public periodUploadVolume?: number;
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
 * UserConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserConnectionFragment response data
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
 * @param data - the initial TeamConnectionFragment response data
 */
class TeamConnection extends LinearRequest {
  public constructor(request: Request, data: D.TeamConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Team(request, node)) : undefined;
  }
}
/**
 * MilestoneConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial MilestoneConnectionFragment response data
 */
class MilestoneConnection extends LinearRequest {
  public constructor(request: Request, data: D.MilestoneConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Milestone(request, node)) : undefined;
  }
}
/**
 * IntegrationConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IntegrationConnectionFragment response data
 */
class IntegrationConnection extends LinearRequest {
  public constructor(request: Request, data: D.IntegrationConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Integration(request, node)) : undefined;
  }
}
/**
 * An integration with an external service.
 *
 * @param request - function to call the graphql client
 * @param data - the initial IntegrationFragment response data
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
 * @param data - the initial IntegrationSettingsFragment response data
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
 * @param data - the initial SlackPostSettingsFragment response data
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
 * @param data - the initial GoogleSheetsSettingsFragment response data
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
 * @param data - the initial SentrySettingsFragment response data
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
 * @param data - the initial SubscriptionFragment response data
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
 * @param data - the initial ProjectLinkConnectionFragment response data
 */
class ProjectLinkConnection extends LinearRequest {
  public constructor(request: Request, data: D.ProjectLinkConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new ProjectLink(request, node)) : undefined;
  }
}
/**
 * An external link for a project.
 *
 * @param request - function to call the graphql client
 * @param data - the initial ProjectLinkFragment response data
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
 * @param data - the initial WorkflowStateConnectionFragment response data
 */
class WorkflowStateConnection extends LinearRequest {
  public constructor(request: Request, data: D.WorkflowStateConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new WorkflowState(request, node)) : undefined;
  }
}
/**
 * TemplateConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial TemplateConnectionFragment response data
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
 * @param data - the initial TemplateFragment response data
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
 * @param data - the initial IssueLabelConnectionFragment response data
 */
class IssueLabelConnection extends LinearRequest {
  public constructor(request: Request, data: D.IssueLabelConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new IssueLabel(request, node)) : undefined;
  }
}
/**
 * Labels that can be associated with issues.
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueLabelFragment response data
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
 * @param data - the initial WebhookConnectionFragment response data
 */
class WebhookConnection extends LinearRequest {
  public constructor(request: Request, data: D.WebhookConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Webhook(request, node)) : undefined;
  }
}
/**
 * ContactPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial WebhookFragment response data
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
 * CreateCsvExportReportPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CommentConnectionFragment response data
 */
class CommentConnection extends LinearRequest {
  public constructor(request: Request, data: D.CommentConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Comment(request, node)) : undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
}
/**
 * CreateOrJoinOrganizationResponse model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CommentFragment response data
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
  /** The issue that the comment is associated with. */
  public get issue(): Fetch<Issue> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
}
/**
 * IssueHistoryConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueHistoryConnectionFragment response data
 */
class IssueHistoryConnection extends LinearRequest {
  public constructor(request: Request, data: D.IssueHistoryConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new IssueHistory(request, node)) : undefined;
  }
}
/**
 * A custom view that has been saved by a user.
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueHistoryFragment response data
 */
class CustomView extends LinearRequest {
  private _creator?: D.CustomViewFragment["creator"];
  private _team?: D.CustomViewFragment["team"];

  public constructor(request: Request, data: D.CustomViewFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.color = data.color ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.description = data.description ?? undefined;
    this.filters = data.filters ?? undefined;
    this.icon = data.icon ?? undefined;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.shared = data.shared ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._creator = data.creator ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The color of the icon of the custom view. */
  public color?: string;
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The description of the custom view. */
  public description?: string;
  /** The filters applied to issues in the custom view. */
  public filters?: D.Scalars["JSONObject"];
  /** The icon of the custom view. */
  public icon?: string;
  /** The unique identifier of the entity. */
  public id?: string;
  /** The name of the custom view. */
  public name?: string;
  /** Whether the custom view is shared with everyone in the organization. */
  public shared?: boolean;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** The user who created the custom view. */
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The organization of the custom view. */
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** The team associated with the custom view. */
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
}
/**
 * CustomViewConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IntegrationResourceConnectionFragment response data
 */
class IntegrationResourceConnection extends LinearRequest {
  public constructor(request: Request, data: D.IntegrationResourceConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new IntegrationResource(request, node)) : undefined;
  }
}
/**
 * CustomViewPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IntegrationResourceFragment response data
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
 * A set of issues to be resolved in a specified amount of time.
 *
 * @param request - function to call the graphql client
 * @param data - D.CycleFragment response data
 */
class Cycle extends LinearRequest {
  private _team?: D.CycleFragment["team"];

  public constructor(request: Request, data: D.CycleFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.completedAt = data.completedAt ?? undefined;
    this.completedIssueCountHistory = data.completedIssueCountHistory ?? undefined;
    this.completedScopeHistory = data.completedScopeHistory ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.endsAt = data.endsAt ?? undefined;
    this.id = data.id ?? undefined;
    this.issueCountHistory = data.issueCountHistory ?? undefined;
    this.name = data.name ?? undefined;
    this.number = data.number ?? undefined;
    this.scopeHistory = data.scopeHistory ?? undefined;
    this.startsAt = data.startsAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The completion time of the cycle. If null, the cycle hasn't been completed. */
  public completedAt?: D.Scalars["DateTime"];
  /** The number of completed issues in the cycle after each day. */
  public completedIssueCountHistory?: number[];
  /** The number of completed estimation points after each day. */
  public completedScopeHistory?: number[];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The end time of the cycle. */
  public endsAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /** The total number of issues in the cycle after each day. */
  public issueCountHistory?: number[];
  /** The custom name of the cycle. */
  public name?: string;
  /** The number of the cycle. */
  public number?: number;
  /** The total number of estimation points after each day. */
  public scopeHistory?: number[];
  /** The start time of the cycle. */
  public startsAt?: D.Scalars["DateTime"];
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
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
      data?.nodes ? data.nodes.map(node => new Cycle(request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * CyclePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IntegrationResourceDataFragment response data
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
 * @param data - the initial PullRequestPayloadFragment response data
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
 * Collaborative editing steps for documents.
 *
 * @param request - function to call the graphql client
 * @param data - D.DocumentStepFragment response data
 */
class DocumentStep extends LinearRequest {
  public constructor(request: Request, data: D.DocumentStepFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.clientId = data.clientId ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.step = data.step ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.version = data.version ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** Connected client ID. */
  public clientId?: string;
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /** Step data. */
  public step?: D.Scalars["JSON"];
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** Step version. */
  public version?: number;
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
 * EmailUserAccountAuthChallengeResponse model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CommitPayloadFragment response data
 */
class EmailUserAccountAuthChallengeResponse extends LinearRequest {
  public constructor(request: Request, data: D.EmailUserAccountAuthChallengeResponseFragment) {
    super(request);
    this.authType = data.authType ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** Supported challenge for this user account. Can be either verificationCode or password. */
  public authType?: string;
  /** Whether the operation was successful. */
  public success?: boolean;
}
/**
 * A custom emoji.
 *
 * @param request - function to call the graphql client
 * @param data - the initial SentryIssuePayloadFragment response data
 */
class Emoji extends LinearRequest {
  private _creator?: D.EmojiFragment["creator"];

  public constructor(request: Request, data: D.EmojiFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.source = data.source ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.url = data.url ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /** The emoji's name. */
  public name?: string;
  /** The source of the emoji. */
  public source?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** The emoji image URL. */
  public url?: string;
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
 * EmojiConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueRelationConnectionFragment response data
 */
class IssueRelationConnection extends LinearRequest {
  public constructor(request: Request, data: D.IssueRelationConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new IssueRelation(request, node)) : undefined;
  }
}
/**
 * EmojiPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueRelationFragment response data
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
 * EventPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationExistsPayloadFragment response data
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
 * User favorites presented in the sidebar.
 *
 * @param request - function to call the graphql client
 * @param data - the initial SyncResponseFragment response data
 */
class Favorite extends LinearRequest {
  private _cycle?: D.FavoriteFragment["cycle"];
  private _issue?: D.FavoriteFragment["issue"];
  private _label?: D.FavoriteFragment["label"];
  private _project?: D.FavoriteFragment["project"];
  private _projectTeam?: D.FavoriteFragment["projectTeam"];
  private _user?: D.FavoriteFragment["user"];

  public constructor(request: Request, data: D.FavoriteFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.sortOrder = data.sortOrder ?? undefined;
    this.type = data.type ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._cycle = data.cycle ?? undefined;
    this._issue = data.issue ?? undefined;
    this._label = data.label ?? undefined;
    this._project = data.project ?? undefined;
    this._projectTeam = data.projectTeam ?? undefined;
    this._user = data.user ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /** The order of the item in the favorites list. */
  public sortOrder?: number;
  /** The type of the favorite. */
  public type?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** Favorited cycle. */
  public get cycle(): Fetch<Cycle> | undefined {
    return this._cycle?.id ? new CycleQuery(this._request).fetch(this._cycle?.id) : undefined;
  }
  /** Favorited issue. */
  public get issue(): Fetch<Issue> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
  /** Favorited issue label. */
  public get label(): Fetch<IssueLabel> | undefined {
    return this._label?.id ? new IssueLabelQuery(this._request).fetch(this._label?.id) : undefined;
  }
  /** Favorited project. */
  public get project(): Fetch<Project> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
  /** Favorited project team. */
  public get projectTeam(): Fetch<Project> | undefined {
    return this._projectTeam?.id ? new ProjectQuery(this._request).fetch(this._projectTeam?.id) : undefined;
  }
  /** The owner of the favorite. */
  public get user(): Fetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
}
/**
 * FavoriteConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ArchiveResponseFragment response data
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
      data?.nodes ? data.nodes.map(node => new Favorite(request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * FavoritePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserAccountAdminPrivilegedFragment response data
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
 * @param data - the initial UserAdminPrivilegedFragment response data
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
 * Object representing Figma preview information.
 *
 * @param request - function to call the graphql client
 * @param data - D.FigmaEmbedFragment response data
 */
class FigmaEmbed extends LinearRequest {
  public constructor(request: Request, data: D.FigmaEmbedFragment) {
    super(request);
    this.lastModified = data.lastModified ?? undefined;
    this.name = data.name ?? undefined;
    this.nodeName = data.nodeName ?? undefined;
    this.url = data.url ?? undefined;
  }

  /** Date when the file was updated at the time of embedding. */
  public lastModified?: D.Scalars["DateTime"];
  /** Figma file name. */
  public name?: string;
  /** Node name. */
  public nodeName?: string;
  /** Figma screenshot URL. */
  public url?: string;
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
 * A recorded entry of a file uploaded by a user.
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationAdminPrivilegedFragment response data
 */
class FileUpload extends LinearRequest {
  private _creator?: D.FileUploadFragment["creator"];

  public constructor(request: Request, data: D.FileUploadFragment) {
    super(request);
    this.assetUrl = data.assetUrl ?? undefined;
    this.contentType = data.contentType ?? undefined;
    this.filename = data.filename ?? undefined;
    this.id = data.id ?? undefined;
    this.metaData = data.metaData ?? undefined;
    this.size = data.size ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The asset URL this file is available at. */
  public assetUrl?: string;
  /** The MIME type of the uploaded file. */
  public contentType?: string;
  /** The name of the uploaded file. */
  public filename?: string;
  /** The unique identifier of the entity. */
  public id?: string;
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
 * Google Sheets specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - D.GoogleSheetsSettingsFragment response data
 */
class GoogleSheetsSettings extends LinearRequest {
  public constructor(request: Request, data: D.GoogleSheetsSettingsFragment) {
    super(request);
    this.sheetId = data.sheetId ?? undefined;
    this.spreadsheetId = data.spreadsheetId ?? undefined;
    this.spreadsheetUrl = data.spreadsheetUrl ?? undefined;
    this.updatedIssuesAt = data.updatedIssuesAt ?? undefined;
  }

  public sheetId?: number;
  public spreadsheetId?: string;
  public spreadsheetUrl?: string;
  public updatedIssuesAt?: D.Scalars["DateTime"];
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
    this.success = data.success ?? undefined;
    this.url = data.url ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The URL containing the image. */
  public url?: string;
}
/**
 * An integration with an external service.
 *
 * @param request - function to call the graphql client
 * @param data - the initial SubscriptionAdminPrivilegedFragment response data
 */
class Integration extends LinearRequest {
  private _creator?: D.IntegrationFragment["creator"];
  private _team?: D.IntegrationFragment["team"];

  public constructor(request: Request, data: D.IntegrationFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.service = data.service ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._creator = data.creator ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /** The integration's type. */
  public service?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** The user that added the integration. */
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The organization that the integration is associated with. */
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** The team that the integration is associated with. */
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
}
/**
 * IntegrationConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ApiKeyConnectionFragment response data
 */
class ApiKeyConnection extends LinearRequest {
  public constructor(request: Request, data: D.ApiKeyConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new ApiKey(request, node)) : undefined;
  }
}
/**
 * IntegrationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ApiKeyFragment response data
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
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.resourceId = data.resourceId ?? undefined;
    this.resourceType = data.resourceType ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._integration = data.integration ?? undefined;
    this._issue = data.issue ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /** The external service resource ID. */
  public resourceId?: string;
  /** The integration's type. */
  public resourceType?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
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
 * IntegrationResourceConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserAuthorizedApplicationFragment response data
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
      data?.nodes ? data.nodes.map(node => new IntegrationResource(request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * Integration resource's payload
 *
 * @param request - function to call the graphql client
 * @param data - the initial AuthorizedApplicationFragment response data
 */
class IntegrationResourceData extends LinearRequest {
  public constructor(request: Request, data: D.IntegrationResourceDataFragment) {
    super(request);
    this.githubCommit = data.githubCommit ? new CommitPayload(request, data.githubCommit) : undefined;
    this.githubPullRequest = data.githubPullRequest
      ? new PullRequestPayload(request, data.githubPullRequest)
      : undefined;
    this.gitlabMergeRequest = data.gitlabMergeRequest
      ? new PullRequestPayload(request, data.gitlabMergeRequest)
      : undefined;
    this.sentryIssue = data.sentryIssue ? new SentryIssuePayload(request, data.sentryIssue) : undefined;
  }

  /** Figma file name. */
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
 * @param data - the initial AuthResolverResponseFragment response data
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
 * The integration resource's settings
 *
 * @param request - function to call the graphql client
 * @param data - the initial SsoUrlFromEmailResponseFragment response data
 */
class IntegrationSettings extends LinearRequest {
  public constructor(request: Request, data: D.IntegrationSettingsFragment) {
    super(request);
    this.googleSheets = data.googleSheets ? new GoogleSheetsSettings(request, data.googleSheets) : undefined;
    this.sentry = data.sentry ? new SentrySettings(request, data.sentry) : undefined;
    this.slackPost = data.slackPost ? new SlackPostSettings(request, data.slackPost) : undefined;
    this.slackProjectPost = data.slackProjectPost ? new SlackPostSettings(request, data.slackProjectPost) : undefined;
  }

  public googleSheets?: GoogleSheetsSettings;
  public sentry?: SentrySettings;
  public slackPost?: SlackPostSettings;
  public slackProjectPost?: SlackPostSettings;
}
/**
 * InviteData model
 *
 * @param request - function to call the graphql client
 * @param data - the initial BillingDetailsPayloadFragment response data
 */
class InviteData extends LinearRequest {
  public constructor(request: Request, data: D.InviteDataFragment) {
    super(request);
    this.avatarURLs = data.avatarURLs ?? undefined;
    this.inviterName = data.inviterName ?? undefined;
    this.organizationDomain = data.organizationDomain ?? undefined;
    this.organizationLogoUrl = data.organizationLogoUrl ?? undefined;
    this.organizationName = data.organizationName ?? undefined;
    this.teamIds = data.teamIds ?? undefined;
    this.teamNames = data.teamNames ?? undefined;
    this.userCount = data.userCount ?? undefined;
  }

  /** Avatar URLs for the invitees. */
  public avatarURLs?: string[];
  /** The name of the inviter. */
  public inviterName?: string;
  /** The domain of the organization the users were invited to. */
  public organizationDomain?: string;
  /** The logo of the organization the users were invited to. */
  public organizationLogoUrl?: string;
  /** The name of the organization the users were invited to. */
  public organizationName?: string;
  /** Team identifiers for the invitees. */
  public teamIds?: string[];
  /** Team names for the invitees. */
  public teamNames?: string[];
  /** The user count of the organization. */
  public userCount?: number;
}
/**
 * NotificationConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial InvoiceFragment response data
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
      data?.nodes ? data.nodes.map(node => new Notification(request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * A notification sent to a user.
 *
 * @param request - function to call the graphql client
 * @param data - the initial CardFragment response data
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
 * @param data - the initial CollaborationDocumentUpdatePayloadFragment response data
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
 * @param data - the initial StepsResponseFragment response data
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
      data?.nodes ? data.nodes.map(node => new CustomView(request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * A custom view that has been saved by a user.
 *
 * @param request - function to call the graphql client
 * @param data - the initial CustomViewFragment response data
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
 * Invoice model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CustomViewConnectionFragment response data
 */
class EmojiConnection extends LinearRequest {
  public constructor(request: Request, data: D.EmojiConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Emoji(request, node)) : undefined;
  }

  /** The creation date of the invoice. */
  public created?: D.Scalars["TimelessDateScalar"];
  /** The due date of the invoice. */
  public dueDate?: D.Scalars["TimelessDateScalar"];
  /** The status of the invoice. */
  public status?: string;
  /** The invoice total, in cents. */
  public total?: number;
  /** The URL at which the invoice can be viewed or paid. */
  public url?: string;
}
/**
 * An issue.
 *
 * @param request - function to call the graphql client
 * @param data - the initial EmojiFragment response data
 */
class Issue extends LinearRequest {
  private _assignee?: D.IssueFragment["assignee"];
  private _creator?: D.IssueFragment["creator"];
  private _cycle?: D.IssueFragment["cycle"];
  private _parent?: D.IssueFragment["parent"];
  private _project?: D.IssueFragment["project"];
  private _state?: D.IssueFragment["state"];
  private _team?: D.IssueFragment["team"];

  public constructor(request: Request, data: D.IssueFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.autoArchivedAt = data.autoArchivedAt ?? undefined;
    this.autoClosedAt = data.autoClosedAt ?? undefined;
    this.boardOrder = data.boardOrder ?? undefined;
    this.branchName = data.branchName ?? undefined;
    this.canceledAt = data.canceledAt ?? undefined;
    this.completedAt = data.completedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.description = data.description ?? undefined;
    this.dueDate = data.dueDate ?? undefined;
    this.estimate = data.estimate ?? undefined;
    this.id = data.id ?? undefined;
    this.identifier = data.identifier ?? undefined;
    this.number = data.number ?? undefined;
    this.previousIdentifiers = data.previousIdentifiers ?? undefined;
    this.priority = data.priority ?? undefined;
    this.priorityLabel = data.priorityLabel ?? undefined;
    this.startedAt = data.startedAt ?? undefined;
    this.subIssueSortOrder = data.subIssueSortOrder ?? undefined;
    this.title = data.title ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.url = data.url ?? undefined;
    this._assignee = data.assignee ?? undefined;
    this._creator = data.creator ?? undefined;
    this._cycle = data.cycle ?? undefined;
    this._parent = data.parent ?? undefined;
    this._project = data.project ?? undefined;
    this._state = data.state ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the issue was automatically archived by the auto pruning process. */
  public autoArchivedAt?: D.Scalars["DateTime"];
  /** The time at which the issue was automatically closed by the auto pruning process. */
  public autoClosedAt?: D.Scalars["DateTime"];
  /** The order of the item in its column on the board. */
  public boardOrder?: number;
  /** Suggested branch name for the issue. */
  public branchName?: string;
  /** The time at which the issue was moved into canceled state. */
  public canceledAt?: D.Scalars["DateTime"];
  /** The time at which the issue was moved into completed state. */
  public completedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The issue's description in markdown format. */
  public description?: string;
  /** The date at which the issue is due. */
  public dueDate?: D.Scalars["TimelessDateScalar"];
  /** The estimate of the complexity of the issue.. */
  public estimate?: number;
  /** The unique identifier of the entity. */
  public id?: string;
  /** Issue's human readable identifier (e.g. ENG-123). */
  public identifier?: string;
  /** The issue's unique number. */
  public number?: number;
  /** Previous identifiers of the issue if it has been moved between teams. */
  public previousIdentifiers?: string[];
  /** The priority of the issue. */
  public priority?: number;
  /** Label for the priority. */
  public priorityLabel?: string;
  /** The time at which the issue was moved into started state. */
  public startedAt?: D.Scalars["DateTime"];
  /** The order of the item in the sub-issue list. Only set if the issue has a parent. */
  public subIssueSortOrder?: number;
  /** The issue's title. */
  public title?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** Issue URL. */
  public url?: string;
  /** The user to whom the issue is assigned to. */
  public get assignee(): Fetch<User> | undefined {
    return this._assignee?.id ? new UserQuery(this._request).fetch(this._assignee?.id) : undefined;
  }
  /** The user who created the issue. */
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The cycle that the issue is associated with. */
  public get cycle(): Fetch<Cycle> | undefined {
    return this._cycle?.id ? new CycleQuery(this._request).fetch(this._cycle?.id) : undefined;
  }
  /** The parent of the issue. */
  public get parent(): Fetch<Issue> | undefined {
    return this._parent?.id ? new IssueQuery(this._request).fetch(this._parent?.id) : undefined;
  }
  /** The project that the issue is associated with. */
  public get project(): Fetch<Project> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
  /** The workflow state that the issue is associated with. */
  public get state(): Fetch<WorkflowState> | undefined {
    return this._state?.id ? new WorkflowStateQuery(this._request).fetch(this._state?.id) : undefined;
  }
  /** The team that the issue is associated with. */
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
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
  /** Integration resources for this issue. */
  public integrationResources(variables?: Omit<D.Issue_IntegrationResourcesQueryVariables, "id">) {
    return this.id ? new Issue_IntegrationResourcesQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Labels associated with this issue. */
  public labels(variables?: Omit<D.Issue_LabelsQueryVariables, "id">) {
    return this.id ? new Issue_LabelsQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Relations associated with this issue. */
  public relations(variables?: Omit<D.Issue_RelationsQueryVariables, "id">) {
    return this.id ? new Issue_RelationsQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Users who are subscribed to the issue. */
  public subscribers(variables?: Omit<D.Issue_SubscribersQueryVariables, "id">) {
    return this.id ? new Issue_SubscribersQuery(this._request, this.id).fetch(variables) : undefined;
  }
  /** Inverse relations associated with this issue. */
  public inverseRelations(variables?: Omit<D.Issue_InverseRelationsQueryVariables, "id">) {
    return this.id ? new Issue_InverseRelationsQuery(this._request, this.id).fetch(variables) : undefined;
  }
}
/**
 * IssueConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial EmojiConnectionFragment response data
 */
class FavoriteConnection extends LinearRequest {
  public constructor(request: Request, data: D.FavoriteConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Favorite(request, node)) : undefined;
  }
}
/**
 * A record of changes to an issue.
 *
 * @param request - function to call the graphql client
 * @param data - the initial FavoriteFragment response data
 */
class IssueHistory extends LinearRequest {
  private _actor?: D.IssueHistoryFragment["actor"];
  private _fromAssignee?: D.IssueHistoryFragment["fromAssignee"];
  private _fromCycle?: D.IssueHistoryFragment["fromCycle"];
  private _fromParent?: D.IssueHistoryFragment["fromParent"];
  private _fromProject?: D.IssueHistoryFragment["fromProject"];
  private _fromState?: D.IssueHistoryFragment["fromState"];
  private _fromTeam?: D.IssueHistoryFragment["fromTeam"];
  private _issue?: D.IssueHistoryFragment["issue"];
  private _toAssignee?: D.IssueHistoryFragment["toAssignee"];
  private _toCycle?: D.IssueHistoryFragment["toCycle"];
  private _toParent?: D.IssueHistoryFragment["toParent"];
  private _toProject?: D.IssueHistoryFragment["toProject"];
  private _toState?: D.IssueHistoryFragment["toState"];
  private _toTeam?: D.IssueHistoryFragment["toTeam"];

  public constructor(request: Request, data: D.IssueHistoryFragment) {
    super(request);
    this.addedLabelIds = data.addedLabelIds ?? undefined;
    this.archived = data.archived ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.autoArchived = data.autoArchived ?? undefined;
    this.autoClosed = data.autoClosed ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.fromDueDate = data.fromDueDate ?? undefined;
    this.fromEstimate = data.fromEstimate ?? undefined;
    this.fromPriority = data.fromPriority ?? undefined;
    this.fromTitle = data.fromTitle ?? undefined;
    this.id = data.id ?? undefined;
    this.relationChanges = data.relationChanges ?? undefined;
    this.removedLabelIds = data.removedLabelIds ?? undefined;
    this.source = data.source ?? undefined;
    this.toDueDate = data.toDueDate ?? undefined;
    this.toEstimate = data.toEstimate ?? undefined;
    this.toPriority = data.toPriority ?? undefined;
    this.toTitle = data.toTitle ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.updatedDescription = data.updatedDescription ?? undefined;
    this._actor = data.actor ?? undefined;
    this._fromAssignee = data.fromAssignee ?? undefined;
    this._fromCycle = data.fromCycle ?? undefined;
    this._fromParent = data.fromParent ?? undefined;
    this._fromProject = data.fromProject ?? undefined;
    this._fromState = data.fromState ?? undefined;
    this._fromTeam = data.fromTeam ?? undefined;
    this._issue = data.issue ?? undefined;
    this._toAssignee = data.toAssignee ?? undefined;
    this._toCycle = data.toCycle ?? undefined;
    this._toParent = data.toParent ?? undefined;
    this._toProject = data.toProject ?? undefined;
    this._toState = data.toState ?? undefined;
    this._toTeam = data.toTeam ?? undefined;
  }

  /** ID's of labels that were added. */
  public addedLabelIds?: string[];
  /** Whether the issue was archived or un-archived. */
  public archived?: boolean;
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  public autoArchived?: boolean;
  public autoClosed?: boolean;
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** What the due date was changed from */
  public fromDueDate?: D.Scalars["TimelessDateScalar"];
  /** What the estimate was changed from. */
  public fromEstimate?: number;
  /** What the priority was changed from. */
  public fromPriority?: number;
  /** What the title was changed from. */
  public fromTitle?: string;
  /** The unique identifier of the entity. */
  public id?: string;
  /** Changed issue relationships. */
  public relationChanges?: string[];
  /** ID's of labels that were removed. */
  public removedLabelIds?: string[];
  /** Information about the integration or application which created this history entry. */
  public source?: D.Scalars["JSONObject"];
  /** What the due date was changed to */
  public toDueDate?: D.Scalars["TimelessDateScalar"];
  /** What the estimate was changed to. */
  public toEstimate?: number;
  /** What the priority was changed to. */
  public toPriority?: number;
  /** What the title was changed to. */
  public toTitle?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** Whether the issue's description was updated. */
  public updatedDescription?: boolean;
  /** The user who made these changes. If null, possibly means that the change made by an integration. */
  public get actor(): Fetch<User> | undefined {
    return this._actor?.id ? new UserQuery(this._request).fetch(this._actor?.id) : undefined;
  }
  /** The user from whom the issue was re-assigned from. */
  public get fromAssignee(): Fetch<User> | undefined {
    return this._fromAssignee?.id ? new UserQuery(this._request).fetch(this._fromAssignee?.id) : undefined;
  }
  /** The previous cycle of the issue. */
  public get fromCycle(): Fetch<Cycle> | undefined {
    return this._fromCycle?.id ? new CycleQuery(this._request).fetch(this._fromCycle?.id) : undefined;
  }
  /** The previous parent of the issue. */
  public get fromParent(): Fetch<Issue> | undefined {
    return this._fromParent?.id ? new IssueQuery(this._request).fetch(this._fromParent?.id) : undefined;
  }
}
/**
 * FavoriteConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial FavoriteConnectionFragment response data
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
 * @param data - the initial FigmaEmbedPayloadFragment response data
 */
class OrganizationExistsPayload extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationExistsPayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
    this.exists = data.exists ?? undefined;
  }

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
 * PushSubscriptionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial InvitePagePayloadFragment response data
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
  /** Invite data. */
  public inviteData?: InviteData;
}
/**
 * InviteData model
 *
 * @param request - function to call the graphql client
 * @param data - the initial InviteDataFragment response data
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
 * ReactionConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial NotificationConnectionFragment response data
 */
class NotificationConnection extends LinearRequest {
  public constructor(request: Request, data: D.NotificationConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new Notification(request, node)) : undefined;
  }
}
/**
 * A reaction associated with a comment.
 *
 * @param request - function to call the graphql client
 * @param data - the initial NotificationFragment response data
 */
class IssueImport extends LinearRequest {
  public constructor(request: Request, data: D.IssueImportFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.creatorId = data.creatorId ?? undefined;
    this.id = data.id ?? undefined;
    this.service = data.service ?? undefined;
    this.status = data.status ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The id for the user that started the job. */
  public creatorId?: string;
  /** The unique identifier of the entity. */
  public id?: string;
  /** The service from which data will be imported. */
  public service?: string;
  /** The status for the import job. */
  public status?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
}
/**
 * IssueImportPayload model
 *
 * @param request - function to call the graphql client
 * @param data - D.IssueImportPayloadFragment response data
 */
class IssueImportPayload extends LinearRequest {
  public constructor(request: Request, data: D.IssueImportPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this.issueImport = data.issueImport ? new IssueImport(request, data.issueImport) : undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
  /** The import job that was created or updated. */
  public issueImport?: IssueImport;
}
/**
 * NotificationSubscriptionConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial NotificationSubscriptionConnectionFragment response data
 */
class NotificationSubscriptionConnection extends LinearRequest {
  public constructor(request: Request, data: D.NotificationSubscriptionConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new NotificationSubscription(request, node)) : undefined;
  }
}
/**
 * Notification subscriptions for models.
 *
 * @param request - function to call the graphql client
 * @param data - the initial NotificationSubscriptionFragment response data
 */
class IssueLabel extends LinearRequest {
  private _creator?: D.IssueLabelFragment["creator"];
  private _team?: D.IssueLabelFragment["team"];

  public constructor(request: Request, data: D.IssueLabelFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.color = data.color ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.description = data.description ?? undefined;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._creator = data.creator ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The label's color as a HEX string. */
  public color?: string;
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The label's description. */
  public description?: string;
  /** The unique identifier of the entity. */
  public id?: string;
  /** The label's name. */
  public name?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** The user who created the label. */
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The team to which the label belongs to. */
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** Issues associated with the label. */
  public issues(variables?: Omit<D.IssueLabel_IssuesQueryVariables, "id">) {
    return this.id ? new IssueLabel_IssuesQuery(this._request, this.id).fetch(variables) : undefined;
  }
}
/**
 * IssueLabelConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationInviteConnectionFragment response data
 */
class OrganizationInviteConnection extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationInviteConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new OrganizationInvite(request, node)) : undefined;
  }
}
/**
 * IssueLabelPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationInviteFragment response data
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
 * IssuePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial PushSubscriptionPayloadFragment response data
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
 * A relation between two issues.
 *
 * @param request - function to call the graphql client
 * @param data - the initial ReactionFragment response data
 */
class IssueRelation extends LinearRequest {
  private _issue?: D.IssueRelationFragment["issue"];
  private _relatedIssue?: D.IssueRelationFragment["relatedIssue"];

  public constructor(request: Request, data: D.IssueRelationFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.type = data.type ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._issue = data.issue ?? undefined;
    this._relatedIssue = data.relatedIssue ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /** The relationship of the issue with the related issue. */
  public type?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
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
      data?.nodes ? data.nodes.map(node => new IssueRelation(request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * ReactionConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ReactionConnectionFragment response data
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
 * @param data - the initial ViewPreferencesConnectionFragment response data
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
 * @param data - the initial ViewPreferencesFragment response data
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
 * @param data - the initial UserPayloadFragment response data
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
 * @param data - the initial UserAdminPayloadFragment response data
 */
class UserAdminPayload extends LinearRequest {
  public constructor(request: Request, data: D.UserAdminPayloadFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.sortOrder = data.sortOrder ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /** The name of the milestone. */
  public name?: string;
  /** The sort order for the milestone. */
  public sortOrder?: number;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
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
 * MilestoneConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationPayloadFragment response data
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
      data?.nodes ? data.nodes.map(node => new Milestone(request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * MilestonePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationDeletePayloadFragment response data
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
 * A notification sent to a user.
 *
 * @param request - function to call the graphql client
 * @param data - the initial AdminIntegrationPayloadFragment response data
 */
class Notification extends LinearRequest {
  private _comment?: D.NotificationFragment["comment"];
  private _issue?: D.NotificationFragment["issue"];
  private _team?: D.NotificationFragment["team"];
  private _user?: D.NotificationFragment["user"];

  /** Whether the operation was successful. */
  public success?: boolean;
}
/**
 * EmailUnsubscribePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationAccessPayloadFragment response data
 */
class EmailUnsubscribePayload extends LinearRequest {
  public constructor(request: Request, data: D.EmailUnsubscribePayloadFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.emailedAt = data.emailedAt ?? undefined;
    this.id = data.id ?? undefined;
    this.reactionEmoji = data.reactionEmoji ?? undefined;
    this.readAt = data.readAt ?? undefined;
    this.type = data.type ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._comment = data.comment ?? undefined;
    this._issue = data.issue ?? undefined;
    this._team = data.team ?? undefined;
    this._user = data.user ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /**
   * The time at when an email reminder for this notification was sent to the user. Null, if no email
   *     reminder has been sent.
   */
  public emailedAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /** Name of the reaction emoji associated with the notification. */
  public reactionEmoji?: string;
  /** The time at when the user marked the notification as read. Null, if the the user hasn't read the notification */
  public readAt?: D.Scalars["DateTime"];
  /** Notification type */
  public type?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** The comment which the notification is associated with. */
  public get comment(): Fetch<Comment> | undefined {
    return this._comment?.id ? new CommentQuery(this._request).fetch(this._comment?.id) : undefined;
  }
  /** The issue that the notification is associated with. */
  public get issue(): Fetch<Issue> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
  /** The team which the notification is associated with. */
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The recipient of the notification. */
  public get user(): Fetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
}
/**
 * NotificationConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationSamlConfigurePayloadFragment response data
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
      data?.nodes ? data.nodes.map(node => new Notification(request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * NotificationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial SamlConfigurationFragment response data
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
 * Notification subscriptions for models.
 *
 * @param request - function to call the graphql client
 * @param data - the initial AdminCommandPayloadFragment response data
 */
class NotificationSubscription extends LinearRequest {
  private _project?: D.NotificationSubscriptionFragment["project"];
  private _team?: D.NotificationSubscriptionFragment["team"];
  private _user?: D.NotificationSubscriptionFragment["user"];

  public constructor(request: Request, data: D.NotificationSubscriptionFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.type = data.type ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._project = data.project ?? undefined;
    this._team = data.team ?? undefined;
    this._user = data.user ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /** The type of the subscription. */
  public type?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** Subscribed project. */
  public get project(): Fetch<Project> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
  /** Subscribed team. */
  public get team(): Fetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The user associated with notification subscriptions. */
  public get user(): Fetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
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
      data?.nodes ? data.nodes.map(node => new NotificationSubscription(request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
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
 * OAuth2 client application
 *
 * @param request - function to call the graphql client
 * @param data - the initial EventPayloadFragment response data
 */
class OauthClient extends LinearRequest {
  public constructor(request: Request, data: D.OauthClientFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.clientId = data.clientId ?? undefined;
    this.clientSecret = data.clientSecret ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.description = data.description ?? undefined;
    this.developer = data.developer ?? undefined;
    this.developerUrl = data.developerUrl ?? undefined;
    this.id = data.id ?? undefined;
    this.imageUrl = data.imageUrl ?? undefined;
    this.name = data.name ?? undefined;
    this.redirectUris = data.redirectUris ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** OAuth application's client ID. */
  public clientId?: string;
  /** OAuth application's client secret. */
  public clientSecret?: string;
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** Information about the application. */
  public description?: string;
  /** Name of the developer. */
  public developer?: string;
  /** Url of the developer. */
  public developerUrl?: string;
  /** The unique identifier of the entity. */
  public id?: string;
  /** Image of the application. */
  public imageUrl?: string;
  /** OAuth application's client name. */
  public name?: string;
  /** List of allowed redirect URIs for the application. */
  public redirectUris?: string[];
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
}
/**
 * OauthClientPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ApiKeyPayloadFragment response data
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
 * An organization. Organizations are root-level objects that contain user accounts and teams.
 *
 * @param request - function to call the graphql client
 * @param data - the initial ArchivePayloadFragment response data
 */
class Organization extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationFragment) {
    super(request);
    this.allowedAuthServices = data.allowedAuthServices ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.createdIssueCount = data.createdIssueCount ?? undefined;
    this.gitLinkbackMessagesEnabled = data.gitLinkbackMessagesEnabled ?? undefined;
    this.gitPublicLinkbackMessagesEnabled = data.gitPublicLinkbackMessagesEnabled ?? undefined;
    this.id = data.id ?? undefined;
    this.logoUrl = data.logoUrl ?? undefined;
    this.name = data.name ?? undefined;
    this.periodUploadVolume = data.periodUploadVolume ?? undefined;
    this.roadmapEnabled = data.roadmapEnabled ?? undefined;
    this.samlEnabled = data.samlEnabled ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.urlKey = data.urlKey ?? undefined;
    this.userCount = data.userCount ?? undefined;
  }

  /** Allowed authentication providers, empty array means all are allowed */
  public allowedAuthServices?: string[];
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** Number of issues in the organization. */
  public createdIssueCount?: number;
  /** Whether the Git integration linkback messages should be sent to private repositories. */
  public gitLinkbackMessagesEnabled?: boolean;
  /** Whether the Git integration linkback messages should be sent to public repositories. */
  public gitPublicLinkbackMessagesEnabled?: boolean;
  /** The unique identifier of the entity. */
  public id?: string;
  /** The organization's logo URL. */
  public logoUrl?: string;
  /** The organization's name. */
  public name?: string;
  /** Rolling 30-day total upload volume for the organization, in megabytes. */
  public periodUploadVolume?: number;
  /** Whether the organization is using a roadmap. */
  public roadmapEnabled?: boolean;
  /** Whether SAML authentication is enabled for organization. */
  public samlEnabled?: boolean;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** The organization's unique URL key. */
  public urlKey?: string;
  /** Number of active users in the organization. */
  public userCount?: number;

  /** Milestones associated with the organization. */
  public milestones(variables?: D.Organization_MilestonesQueryVariables) {
    return new Organization_MilestonesQuery(this._request).fetch(variables);
  }
  /** Teams associated with the organization. */
  public teams(variables?: D.Organization_TeamsQueryVariables) {
    return new Organization_TeamsQuery(this._request).fetch(variables);
  }
  /** Users associated with the organization. */
  public users(variables?: D.Organization_UsersQueryVariables) {
    return new Organization_UsersQuery(this._request).fetch(variables);
  }
  /** Integrations associated with the organization. */
  public integrations(variables?: D.Organization_IntegrationsQueryVariables) {
    return new Organization_IntegrationsQuery(this._request).fetch(variables);
  }
}
/**
 * OrganizationDeletePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial EmailUserAccountAuthChallengeResponseFragment response data
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
 * Defines the use of a domain by an organization.
 *
 * @param request - function to call the graphql client
 * @param data - the initial CreateOrJoinOrganizationResponseFragment response data
 */
class OrganizationDomain extends LinearRequest {
  private _creator?: D.OrganizationDomainFragment["creator"];

  public constructor(request: Request, data: D.OrganizationDomainFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.verificationEmail = data.verificationEmail ?? undefined;
    this.verified = data.verified ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /** Domain name */
  public name?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** E-mail used to verify this domain */
  public verificationEmail?: string;
  /** Is this domain verified */
  public verified?: boolean;
  /** The user who added the domain. */
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}
/**
 * OrganizationDomainPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial BillingEmailPayloadFragment response data
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
 * OrganizationDomainSimplePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CommentPayloadFragment response data
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
 * OrganizationExistsPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ContactPayloadFragment response data
 */
class OrganizationExistsPayload extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationExistsPayloadFragment) {
    super(request);
    this.exists = data.exists ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** Whether the organization exists. */
  public exists?: boolean;
  /** Whether the operation was successful. */
  public success?: boolean;
}
/**
 * An invitation to the organization that has been sent via email.
 *
 * @param request - function to call the graphql client
 * @param data - the initial CustomViewPayloadFragment response data
 */
class OrganizationInvite extends LinearRequest {
  private _invitee?: D.OrganizationInviteFragment["invitee"];
  private _inviter?: D.OrganizationInviteFragment["inviter"];

  public constructor(request: Request, data: D.OrganizationInviteFragment) {
    super(request);
    this.acceptedAt = data.acceptedAt ?? undefined;
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.email = data.email ?? undefined;
    this.expiresAt = data.expiresAt ?? undefined;
    this.external = data.external ?? undefined;
    this.id = data.id ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._invitee = data.invitee ?? undefined;
    this._inviter = data.inviter ?? undefined;
  }

  /** The time at which the invite was accepted. Null, if the invite hasn't been accepted */
  public acceptedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The invitees email address. */
  public email?: string;
  /** The time at which the invite will be expiring. Null, if the invite shouldn't expire */
  public expiresAt?: D.Scalars["DateTime"];
  /** The invite was sent to external address. */
  public external?: boolean;
  /** The unique identifier of the entity. */
  public id?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** The user who has accepted the invite. Null, if the invite hasn't been accepted. */
  public get invitee(): Fetch<User> | undefined {
    return this._invitee?.id ? new UserQuery(this._request).fetch(this._invitee?.id) : undefined;
  }
  /** The user who created the invitation. */
  public get inviter(): Fetch<User> | undefined {
    return this._inviter?.id ? new UserQuery(this._request).fetch(this._inviter?.id) : undefined;
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
 * OrganizationInviteConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial CyclePayloadFragment response data
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
      data?.nodes ? data.nodes.map(node => new OrganizationInvite(request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
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
 * OrganizationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial DebugPayloadFragment response data
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
 * PageInfo model
 *
 * @param request - function to call the graphql client
 * @param data - the initial EmailUnsubscribePayloadFragment response data
 */
class PageInfo extends LinearRequest {
  public constructor(request: Request, data: D.PageInfoFragment) {
    super(request);
    this.endCursor = data.endCursor ?? undefined;
    this.hasNextPage = data.hasNextPage ?? undefined;
    this.hasPreviousPage = data.hasPreviousPage ?? undefined;
    this.startCursor = data.startCursor ?? undefined;
  }

  /** Cursor representing the last result in the paginated results. */
  public endCursor?: string;
  /** Indicates if there are more results when paginating forward. */
  public hasNextPage?: boolean;
  /** Indicates if there are more results when paginating backward. */
  public hasPreviousPage?: boolean;
  /** Cursor representing the first result in the paginated results. */
  public startCursor?: string;
}
/**
 * A project.
 *
 * @param request - function to call the graphql client
 * @param data - the initial EmojiPayloadFragment response data
 */
class Project extends LinearRequest {
  private _creator?: D.ProjectFragment["creator"];
  private _lead?: D.ProjectFragment["lead"];
  private _milestone?: D.ProjectFragment["milestone"];

  public constructor(request: Request, data: D.ProjectFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.canceledAt = data.canceledAt ?? undefined;
    this.color = data.color ?? undefined;
    this.completedAt = data.completedAt ?? undefined;
    this.completedIssueCountHistory = data.completedIssueCountHistory ?? undefined;
    this.completedScopeHistory = data.completedScopeHistory ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.description = data.description ?? undefined;
    this.icon = data.icon ?? undefined;
    this.id = data.id ?? undefined;
    this.issueCountHistory = data.issueCountHistory ?? undefined;
    this.name = data.name ?? undefined;
    this.scopeHistory = data.scopeHistory ?? undefined;
    this.slackIssueComments = data.slackIssueComments ?? undefined;
    this.slackIssueStatuses = data.slackIssueStatuses ?? undefined;
    this.slackNewIssue = data.slackNewIssue ?? undefined;
    this.slugId = data.slugId ?? undefined;
    this.sortOrder = data.sortOrder ?? undefined;
    this.startedAt = data.startedAt ?? undefined;
    this.state = data.state ?? undefined;
    this.targetDate = data.targetDate ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._creator = data.creator ?? undefined;
    this._lead = data.lead ?? undefined;
    this._milestone = data.milestone ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the project was moved into canceled state. */
  public canceledAt?: D.Scalars["DateTime"];
  /** The project's color. */
  public color?: string;
  /** The time at which the project was moved into completed state. */
  public completedAt?: D.Scalars["DateTime"];
  /** The number of completed issues in the project after each week. */
  public completedIssueCountHistory?: number[];
  /** The number of completed estimation points after each week. */
  public completedScopeHistory?: number[];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The project's description. */
  public description?: string;
  /** The icon of the project. */
  public icon?: string;
  /** The unique identifier of the entity. */
  public id?: string;
  /** The total number of issues in the project after each week. */
  public issueCountHistory?: number[];
  /** The project's name. */
  public name?: string;
  /** The total number of estimation points after each week. */
  public scopeHistory?: number[];
  /** Whether to send new issue comment notifications to Slack. */
  public slackIssueComments?: boolean;
  /** Whether to send new issue status updates to Slack. */
  public slackIssueStatuses?: boolean;
  /** Whether to send new issue notifications to Slack. */
  public slackNewIssue?: boolean;
  /** The project's unique URL slug. */
  public slugId?: string;
  /** The sort order for the project within its milestone. */
  public sortOrder?: number;
  /** The time at which the project was moved into started state. */
  public startedAt?: D.Scalars["DateTime"];
  /** The type of the state. */
  public state?: string;
  /** The estimated completion date of the project. */
  public targetDate?: D.Scalars["TimelessDateScalar"];
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
 * @param data - the initial FavoritePayloadFragment response data
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
 * @param data - the initial FeedbackPayloadFragment response data
 */
class OauthTokenRevokePayload extends LinearRequest {
  public constructor(request: Request, data: D.OauthTokenRevokePayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }
}
/**
 * ProjectConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial UploadPayloadFragment response data
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
      data?.nodes ? data.nodes.map(node => new Project(request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * An external link for a project.
 *
 * @param request - function to call the graphql client
 * @param data - the initial UploadFileFragment response data
 */
class ProjectLink extends LinearRequest {
  private _creator?: D.ProjectLinkFragment["creator"];
  private _project?: D.ProjectLinkFragment["project"];

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
 * @param data - the initial UploadFileHeaderFragment response data
 */
class UploadFileHeader extends LinearRequest {
  public constructor(request: Request, data: D.UploadFileHeaderFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.label = data.label ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.url = data.url ?? undefined;
    this._creator = data.creator ?? undefined;
    this._project = data.project ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /** The link's label. */
  public label?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** The link's URL. */
  public url?: string;
  /** The user who created the link. */
  public get creator(): Fetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
}
/**
 * OrganizationInvitePayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ImageUploadFromUrlPayloadFragment response data
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
 * OrganizationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IntegrationPayloadFragment response data
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
 * ProjectLinkConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueLabelPayloadFragment response data
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
      data?.nodes ? data.nodes.map(node => new ProjectLink(request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * ProjectLinkPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial IssueRelationPayloadFragment response data
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
 * @param data - the initial IssuePayloadFragment response data
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
 * @param data - the initial MilestonePayloadFragment response data
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
 * @param data - the initial NotificationPayloadFragment response data
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
 * @param data - D.PullRequestPayloadFragment response data
 */
class PullRequestPayload extends LinearRequest {
  public constructor(request: Request, data: D.PullRequestPayloadFragment) {
    super(request);
    this.branch = data.branch ?? undefined;
    this.closedAt = data.closedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.draft = data.draft ?? undefined;
    this.id = data.id ?? undefined;
    this.mergedAt = data.mergedAt ?? undefined;
    this.number = data.number ?? undefined;
    this.repoLogin = data.repoLogin ?? undefined;
    this.repoName = data.repoName ?? undefined;
    this.status = data.status ?? undefined;
    this.title = data.title ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.url = data.url ?? undefined;
    this.userId = data.userId ?? undefined;
    this.userLogin = data.userLogin ?? undefined;
  }

  public branch?: string;
  public closedAt?: string;
  public createdAt?: string;
  public draft?: boolean;
  public id?: string;
  public mergedAt?: string;
  public number?: number;
  public repoLogin?: string;
  public repoName?: string;
  public status?: string;
  public title?: string;
  public updatedAt?: string;
  public url?: string;
  public userId?: string;
  public userLogin?: string;
}
/**
 * A user's web browser push notification subscription.
 *
 * @param request - function to call the graphql client
 * @param data - the initial NotificationSubscriptionPayloadFragment response data
 */
class PushSubscription extends LinearRequest {
  public constructor(request: Request, data: D.PushSubscriptionFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
}
/**
 * TeamPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OauthClientPayloadFragment response data
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
 * PushSubscriptionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OauthClientFragment response data
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
 * @param data - the initial RotateSecretPayloadFragment response data
 */
class Reaction extends LinearRequest {
  private _comment?: D.ReactionFragment["comment"];
  private _user?: D.ReactionFragment["user"];

  public constructor(request: Request, data: D.ReactionFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.emoji = data.emoji ?? undefined;
    this.id = data.id ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._comment = data.comment ?? undefined;
    this._user = data.user ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** Name of the reaction's emoji. */
  public emoji?: string;
  /** The unique identifier of the entity. */
  public id?: string;
  /**
   * The last time at which the entity was updated. This is the same as the creation time if the
   *     entity hasn't been update after creation.
   */
  public updatedAt?: D.Scalars["DateTime"];
  /** The comment that the reaction is associated with. */
  public get comment(): Fetch<Comment> | undefined {
    return this._comment?.id ? new CommentQuery(this._request).fetch(this._comment?.id) : undefined;
  }
  /** The user who reacted. */
  public get user(): Fetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
}
/**
 * ReactionConnection model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OauthTokenRevokePayloadFragment response data
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
      data?.nodes ? data.nodes.map(node => new Reaction(request, node)) : undefined,
      data?.pageInfo ? new PageInfo(request, data.pageInfo) : undefined
    );
  }
}
/**
 * ReactionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial OrganizationDomainPayloadFragment response data
 */
class ReactionPayload extends LinearRequest {
  private _reaction?: D.ReactionPayloadFragment["reaction"];

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
 * @param data - the initial OrganizationDomainFragment response data
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
 * @param data - the initial OrganizationInvitePayloadFragment response data
 */
class OrganizationInvitePayload extends LinearRequest {
  public constructor(request: Request, data: D.OrganizationInvitePayloadFragment) {
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
 * RotateSecretPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial ProjectLinkPayloadFragment response data
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
 * The integration resource's settings
 *
 * @param request - function to call the graphql client
 * @param data - the initial ProjectPayloadFragment response data
 */
class SamlConfiguration extends LinearRequest {
  public constructor(request: Request, data: D.SamlConfigurationFragment) {
    super(request);
    this.allowedDomains = data.allowedDomains ?? undefined;
    this.ssoBinding = data.ssoBinding ?? undefined;
    this.ssoEndpoint = data.ssoEndpoint ?? undefined;
    this.ssoSignAlgo = data.ssoSignAlgo ?? undefined;
    this.ssoSigningCert = data.ssoSigningCert ?? undefined;
  }

  /** List of allowed email domains for SAML authentication. */
  public allowedDomains?: string[];
  /** Binding method for authentication call. Can be either `post` (default) or `redirect`. */
  public ssoBinding?: string;
  /** Sign in endpoint URL for the identity provider. */
  public ssoEndpoint?: string;
  /** The algorithm of the Signing Certificate. Can be one of `sha1`, `sha256` (default), or `sha512`. */
  public ssoSignAlgo?: string;
  /** X.509 Signing Certificate in string form. */
  public ssoSigningCert?: string;
}
/**
 * Sentry issue data
 *
 * @param request - function to call the graphql client
 * @param data - the initial ReactionPayloadFragment response data
 */
class SentryIssuePayload extends LinearRequest {
  public constructor(request: Request, data: D.SentryIssuePayloadFragment) {
    super(request);
    this.actorId = data.actorId ?? undefined;
    this.actorName = data.actorName ?? undefined;
    this.actorType = data.actorType ?? undefined;
    this.firstSeen = data.firstSeen ?? undefined;
    this.firstVersion = data.firstVersion ?? undefined;
    this.issueId = data.issueId ?? undefined;
    this.issueTitle = data.issueTitle ?? undefined;
    this.projectId = data.projectId ?? undefined;
    this.projectSlug = data.projectSlug ?? undefined;
    this.shortId = data.shortId ?? undefined;
    this.webUrl = data.webUrl ?? undefined;
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
 * @param data - the initial CreateCsvExportReportPayloadFragment response data
 */
class CreateCsvExportReportPayload extends LinearRequest {
  public constructor(request: Request, data: D.CreateCsvExportReportPayloadFragment) {
    super(request);
    this.success = data.success ?? undefined;
  }

  /** Whether the operation was successful. */
  public success?: boolean;
  /** The view preferences entity being mutated. */
  public viewPreferences?: ViewPreferences;
}
/**
 * Sentry specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - the initial SubscriptionSessionPayloadFragment response data
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
 * Slack notification specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - the initial SubscriptionPayloadFragment response data
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
 * SsoUrlFromEmailResponse model
 *
 * @param request - function to call the graphql client
 * @param data - the initial TeamMembershipPayloadFragment response data
 */
class SsoUrlFromEmailResponse extends LinearRequest {
  public constructor(request: Request, data: D.SsoUrlFromEmailResponseFragment) {
    super(request);
    this.samlSsoUrl = data.samlSsoUrl ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** SAML SSO sign-in URL. */
  public samlSsoUrl?: string;
  /** Whether the operation was successful. */
  public success?: boolean;
}
/**
 * StepsResponse model
 *
 * @param request - function to call the graphql client
 * @param data - the initial TeamPayloadFragment response data
 */
class StepsResponse extends LinearRequest {
  public constructor(request: Request, data: D.StepsResponseFragment) {
    super(request);
    this.clientIds = data.clientIds ?? undefined;
    this.steps = data.steps ?? undefined;
    this.version = data.version ?? undefined;
  }

  /** List of client IDs for the document steps. */
  public clientIds?: string[];
  /** New document steps from the client. */
  public steps?: D.Scalars["JSON"][];
  /** Client's document version. */
  public version?: number;
}
/**
 * The subscription of an organization.
 *
 * @param request - function to call the graphql client
 * @param data - the initial TemplatePayloadFragment response data
 */
class Subscription extends LinearRequest {
  private _creator?: D.SubscriptionFragment["creator"];

  public constructor(request: Request, data: D.SubscriptionFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.canceledAt = data.canceledAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.pendingChangeType = data.pendingChangeType ?? undefined;
    this.seats = data.seats ?? undefined;
    this.type = data.type ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._creator = data.creator ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** The date the subscription was canceled, if any. */
  public canceledAt?: D.Scalars["DateTime"];
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** The unique identifier of the entity. */
  public id?: string;
  /** The subscription type of a pending change. Null if no change pending. */
  public pendingChangeType?: string;
  /** The number of seats in the subscription. */
  public seats?: number;
  /** The subscription type. */
  public type?: string;
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
 * The integration resource's settings
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserSettingsPayloadFragment response data
 */
class SamlConfiguration extends LinearRequest {
  public constructor(request: Request, data: D.SamlConfigurationFragment) {
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
 * @param data - the initial UserSettingsFlagPayloadFragment response data
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
 * @param data - the initial UserSettingsFlagsResetPayloadFragment response data
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
 * @param data - the initial UserSubscribeToNewsletterPayloadFragment response data
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
 * @param data - the initial ViewPreferencesPayloadFragment response data
 */
class ViewPreferencesPayload extends LinearRequest {
  public constructor(request: Request, data: D.ViewPreferencesPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this.viewPreferences = data.viewPreferences ? new ViewPreferences(request, data.viewPreferences) : undefined;
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
 * SubscriptionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial WebhookPayloadFragment response data
 */
class SubscriptionPayload extends LinearRequest {
  public constructor(request: Request, data: D.SubscriptionPayloadFragment) {
    super(request);
    this.canceledAt = data.canceledAt ?? undefined;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  /** The date the subscription was set to cancel at the end of the billing period, if any. */
  public canceledAt?: D.Scalars["DateTime"];
  /** The identifier of the last sync operation. */
  public lastSyncId?: number;
  /** Whether the operation was successful. */
  public success?: boolean;
}
/**
 * SubscriptionSessionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial WorkflowStatePayloadFragment response data
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
 * Contains either the full serialized state of the application or delta packets that the requester can
 *   apply to the local data set in order to be up-to-date.
 *
 * @param request - function to call the graphql client
 * @param data - D.SyncResponseFragment response data
 */
class SyncResponse extends LinearRequest {
  public constructor(request: Request, data: D.SyncResponseFragment) {
    super(request);
    this.archive = data.archive ?? undefined;
    this.databaseVersion = data.databaseVersion ?? undefined;
    this.delta = data.delta ?? undefined;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.state = data.state ?? undefined;
  }

  /** A JSON serialized collection of model objects loaded from the archive */
  public archive?: string;
  /** The version of the remote database. Incremented by 1 for each migration run on the database. */
  public databaseVersion?: number;
  /**
   * JSON serialized delta changes that the client can apply to its local state
   *     in order to catch up with the state of the world.
   */
  public delta?: string;
  /** The last sync id covered by the response. */
  public lastSyncId?: number;
  /**
   * The full state of the organization as a serialized JSON object.
   *     Mutually exclusive with the delta property
   */
  public state?: string;
}
/**
 * SynchronizedPayload model
 *
 * @param request - function to call the graphql client
 * @param data - the initial DocumentStepFragment response data
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
 * An organizational unit that contains issues.
 *
 * @param request - function to call the graphql client
 * @param data - the initial PushSubscriptionFragment response data
 */
class Team extends LinearRequest {
  private _activeCycle?: D.TeamFragment["activeCycle"];
  private _draftWorkflowState?: D.TeamFragment["draftWorkflowState"];
  private _markedAsDuplicateWorkflowState?: D.TeamFragment["markedAsDuplicateWorkflowState"];
  private _mergeWorkflowState?: D.TeamFragment["mergeWorkflowState"];
  private _reviewWorkflowState?: D.TeamFragment["reviewWorkflowState"];
  private _startWorkflowState?: D.TeamFragment["startWorkflowState"];

  public constructor(request: Request, data: D.TeamFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.autoArchivePeriod = data.autoArchivePeriod ?? undefined;
    this.autoClosePeriod = data.autoClosePeriod ?? undefined;
    this.autoCloseStateId = data.autoCloseStateId ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.cycleCalenderUrl = data.cycleCalenderUrl ?? undefined;
    this.cycleCooldownTime = data.cycleCooldownTime ?? undefined;
    this.cycleDuration = data.cycleDuration ?? undefined;
    this.cycleIssueAutoAssignCompleted = data.cycleIssueAutoAssignCompleted ?? undefined;
    this.cycleIssueAutoAssignStarted = data.cycleIssueAutoAssignStarted ?? undefined;
    this.cycleLockToActive = data.cycleLockToActive ?? undefined;
    this.cycleStartDay = data.cycleStartDay ?? undefined;
    this.cyclesEnabled = data.cyclesEnabled ?? undefined;
    this.defaultIssueEstimate = data.defaultIssueEstimate ?? undefined;
    this.description = data.description ?? undefined;
    this.groupIssueHistory = data.groupIssueHistory ?? undefined;
    this.id = data.id ?? undefined;
    this.inviteHash = data.inviteHash ?? undefined;
    this.issueEstimationAllowZero = data.issueEstimationAllowZero ?? undefined;
    this.issueEstimationExtended = data.issueEstimationExtended ?? undefined;
    this.issueEstimationType = data.issueEstimationType ?? undefined;
    this.key = data.key ?? undefined;
    this.name = data.name ?? undefined;
    this.slackIssueComments = data.slackIssueComments ?? undefined;
    this.slackIssueStatuses = data.slackIssueStatuses ?? undefined;
    this.slackNewIssue = data.slackNewIssue ?? undefined;
    this.timezone = data.timezone ?? undefined;
    this.upcomingCycleCount = data.upcomingCycleCount ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._activeCycle = data.activeCycle ?? undefined;
    this._draftWorkflowState = data.draftWorkflowState ?? undefined;
    this._markedAsDuplicateWorkflowState = data.markedAsDuplicateWorkflowState ?? undefined;
    this._mergeWorkflowState = data.mergeWorkflowState ?? undefined;
    this._reviewWorkflowState = data.reviewWorkflowState ?? undefined;
    this._startWorkflowState = data.startWorkflowState ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: D.Scalars["DateTime"];
  /** Period after which automatically closed and completed issues are automatically archived in months. Null/undefined means disabled. */
  public autoArchivePeriod?: number;
  /** Period after which issues are automatically closed in months. Null/undefined means disabled. */
  public autoClosePeriod?: number;
  /** The canceled workflow state which auto closed issues will be set to. Defaults to the first canceled state. */
  public autoCloseStateId?: string;
  /** The time at which the entity was created. */
  public createdAt?: D.Scalars["DateTime"];
  /** Calender feed (iCal) for cycles. */
  public cycleCalenderUrl?: string;
  /** The cooldown time after each cycle in weeks. */
  public cycleCooldownTime?: number;
  /** The duration of a cycle in weeks. */
  public cycleDuration?: number;
  /** Auto assign completed issues to current cycle. */
  public cycleIssueAutoAssignCompleted?: boolean;
  /** Auto assign started issues to current cycle. */
  public cycleIssueAutoAssignStarted?: boolean;
  /** Only allow issues issues with cycles in Active Issues. */
  public cycleLockToActive?: boolean;
  /** The day of the week that a new cycle starts. */
  public cycleStartDay?: number;
  /** Whether the team uses cycles. */
  public cyclesEnabled?: boolean;
  /** What to use as an default estimate for unestimated issues. */
  public defaultIssueEstimate?: number;
  /** The team's description. */
  public description?: string;
  /** Whether to group recent issue history entries. */
  public groupIssueHistory?: boolean;
  /** The unique identifier of the entity. */
  public id?: string;
  /** Unique hash for the team to be used in invite URLs. */
  public inviteHash?: string;
  /** Whether to allow zeros in issues estimates. */
  public issueEstimationAllowZero?: boolean;
  /** Whether to add additional points to the estimate scale. */
  public issueEstimationExtended?: boolean;
  /** The issue estimation type to use. */
  public issueEstimationType?: string;
  /** The team's unique key. The key is used in URLs. */
  public key?: string;
  /** The team's name. */
  public name?: string;
  /** Whether to send new issue comment notifications to Slack. */
  public slackIssueComments?: boolean;
  /** Whether to send new issue status updates to Slack. */
  public slackIssueStatuses?: boolean;
  /** Whether to send new issue notifications to Slack. */
  public slackNewIssue?: boolean;
  /** The timezone of the team. Defaults to "America/Los_Angeles" */
  public timezone?: string;
  /** How many upcoming cycles to create. */
  public upcomingCycleCount?: number;
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
 * @param data - the initial PushSubscriptionConnectionFragment response data
 */
class PushSubscriptionConnection extends LinearRequest {
  public constructor(request: Request, data: D.PushSubscriptionConnectionFragment) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
    this.nodes = data.nodes ? data.nodes.map(node => new PushSubscription(request, node)) : undefined;
  }
}
/**
 * A user account.
 *
 * @param request - function to call the graphql client
 * @param data - the initial UserAccountFragment response data
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
 * @param data - the initial FileUploadFragment response data
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
  /** The workflow state into which issues are moved when they are marked as a duplicate of another issue. Defaults to the first canceled state. */
  public get markedAsDuplicateWorkflowState(): Fetch<WorkflowState> | undefined {
    return this._markedAsDuplicateWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._markedAsDuplicateWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when a PR has been merged. */
  public get mergeWorkflowState(): Fetch<WorkflowState> | undefined {
    return this._mergeWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._mergeWorkflowState?.id)
      : undefined;
  }
  /** The organization that the team is associated with. */
  public get organization(): Fetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
}
/**
 * Public information of the OAuth application.
 *
 * @param request - function to call the graphql client
 * @param data - the initial SynchronizedPayloadFragment response data
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
 * @param data - the initial ApplicationFragment response data
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
 * @param data - the initial OrganizationDomainSimplePayloadFragment response data
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
 * Query UserDocument for User
 *
 * @param request - function to call the graphql client
 */
class UserQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<User | undefined> {
    return this.request<D.UserQuery, D.UserQueryVariables>(D.UserDocument, {
      id,
    }).then(response => {
      const data = response?.user;
      return data ? new User(this._request, data) : undefined;
    });
  }
}

/**
 * Query ViewerDocument for User
 *
 * @param request - function to call the graphql client
 */
class ViewerQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(): Promise<User | undefined> {
    return this.request<D.ViewerQuery, D.ViewerQueryVariables>(D.ViewerDocument, {}).then(response => {
      const data = response?.viewer;
      return data ? new User(this._request, data) : undefined;
    });
  }
}

/**
 * Query OrganizationDocument for Organization
 *
 * @param request - function to call the graphql client
 */
class OrganizationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(): Promise<Organization | undefined> {
    return this.request<D.OrganizationQuery, D.OrganizationQueryVariables>(D.OrganizationDocument, {}).then(
      response => {
        const data = response?.organization;
        return data ? new Organization(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Query OrganizationExistsDocument for OrganizationExistsPayload
 *
 * @param request - function to call the graphql client
 */
class OrganizationExistsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(urlKey: string): Promise<OrganizationExistsPayload | undefined> {
    return this.request<D.OrganizationExistsQuery, D.OrganizationExistsQueryVariables>(D.OrganizationExistsDocument, {
      urlKey,
    }).then(response => {
      const data = response?.organizationExists;
      return data ? new OrganizationExistsPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query SyncBootstrapDocument for SyncResponse
 *
 * @param request - function to call the graphql client
 */
class SyncBootstrapQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(databaseVersion: number, sinceSyncId: number): Promise<SyncResponse | undefined> {
    return this.request<D.SyncBootstrapQuery, D.SyncBootstrapQueryVariables>(D.SyncBootstrapDocument, {
      databaseVersion,
      sinceSyncId,
    }).then(response => {
      const data = response?.syncBootstrap;
      return data ? new SyncResponse(this._request, data) : undefined;
    });
  }
}
/**
 * Query SyncUpdatesDocument for SyncResponse
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this TeamConnection model
 * @param data - TeamConnection response data
 */
class SyncUpdatesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(sinceSyncId: number): Promise<SyncResponse | undefined> {
    return this.request<D.SyncUpdatesQuery, D.SyncUpdatesQueryVariables>(D.SyncUpdatesDocument, {
      sinceSyncId,
    }).then(response => {
      const data = response?.syncUpdates;
      return data ? new SyncResponse(this._request, data) : undefined;
    });
  }
}
/**
 * Query ArchivedModelSyncDocument for ArchiveResponse
 *
 * @param request - function to call the graphql client
 * @param data - D.TeamMembershipFragment response data
 */
class TeamMembership extends LinearRequest {
  private _team?: D.TeamMembershipFragment["team"];
  private _user?: D.TeamMembershipFragment["user"];

  public constructor(request: Request, data: D.TeamMembershipFragment) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._team = data.team ?? undefined;
    this._user = data.user ?? undefined;
  }

  public async fetch(identifier: string, modelClass: string): Promise<ArchiveResponse | undefined> {
    return this.request<D.ArchivedModelSyncQuery, D.ArchivedModelSyncQueryVariables>(D.ArchivedModelSyncDocument, {
      identifier,
      modelClass,
    }).then(response => {
      const data = response?.archivedModelSync;
      return data ? new ArchiveResponse(this._request, data) : undefined;
    });
  }
}
/**
 * Query ArchivedModelsSyncDocument for ArchiveResponse
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this TeamMembershipConnection model
 * @param data - TeamMembershipConnection response data
 */
class ArchivedModelsSyncQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Query AdminUserAccountLookupDocument for UserAccountAdminPrivileged
 *
 * @param request - function to call the graphql client
 * @param data - D.TeamMembershipPayloadFragment response data
 */
class AdminUserAccountLookupQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._teamMembership = data.teamMembership ?? undefined;
  }

  public async fetch(vars?: D.AdminUserAccountLookupQueryVariables): Promise<UserAccountAdminPrivileged | undefined> {
    return this.request<D.AdminUserAccountLookupQuery, D.AdminUserAccountLookupQueryVariables>(
      D.AdminUserAccountLookupDocument,
      variables
    ).then(response => {
      const data = response?.adminUserAccountLookup;
      return data ? new UserAccountAdminPrivileged(this._request, data) : undefined;
    });
  }
}
/**
 * Query UsersDocument for UserConnection
 *
 * @param request - function to call the graphql client
 * @param data - D.TeamPayloadFragment response data
 */
class UsersQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.UsersQueryVariables): Promise<UserConnection | undefined> {
    return this.request<D.UsersQuery, D.UsersQueryVariables>(D.UsersDocument, vars).then(response => {
      const data = response?.users;
      return data ? new UserConnection(this.request, data) : undefined;
    });
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
 * Query ApiKeysDocument for ApiKeyConnection
 *
 * @param request - function to call the graphql client
 * @param data - D.TemplateFragment response data
 */
class ApiKeysQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.description = data.description ?? undefined;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.templateData = data.templateData ?? undefined;
    this.type = data.type ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._creator = data.creator ?? undefined;
    this._team = data.team ?? undefined;
  }

  public async fetch(vars?: D.ApiKeysQueryVariables): Promise<ApiKeyConnection | undefined> {
    return this.request<D.ApiKeysQuery, D.ApiKeysQueryVariables>(D.ApiKeysDocument, vars).then(response => {
      const data = response?.apiKeys;
      return data
        ? new ApiKeyConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}
/**
 * Query ApplicationWithAuthorizationDocument for UserAuthorizedApplication
 *
 * @param request - function to call the graphql client
 * @param data - D.TemplateConnectionFragment response data
 */
class ApplicationWithAuthorizationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.pageInfo = data.pageInfo ? new PageInfo(request, data.pageInfo) : undefined;
  }

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
 * Query AuthorizedApplicationsDocument for AuthorizedApplications
 *
 * @param request - function to call the graphql client
 */
class AuthorizedApplicationsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(): Promise<AuthorizedApplication[] | undefined> {
    return this.request<D.AuthorizedApplicationsQuery, D.AuthorizedApplicationsQueryVariables>(
      D.AuthorizedApplicationsDocument,
      {}
    ).then(response => {
      const data = response?.authorizedApplications;
      return data ? data.map(node => new AuthorizedApplication(this._request, node)) : undefined;
    });
  }
}
/**
 * Query SsoUrlFromEmailDocument for SsoUrlFromEmailResponse
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
 * Query BillingDetailsDocument for BillingDetailsPayload
 *
 * @param request - function to call the graphql client
 * @param data - D.UploadFileFragment response data
 */
class UploadFile extends LinearRequest {
  public constructor(request: Request, data: D.UploadFileFragment) {
    super(request);
    this.assetUrl = data.assetUrl ?? undefined;
    this.contentType = data.contentType ?? undefined;
    this.filename = data.filename ?? undefined;
    this.metaData = data.metaData ?? undefined;
    this.size = data.size ?? undefined;
    this.uploadUrl = data.uploadUrl ?? undefined;
    this.headers = data.headers ? data.headers.map(node => new UploadFileHeader(request, node)) : undefined;
  }

  public async fetch(): Promise<BillingDetailsPayload | undefined> {
    return this.request<D.BillingDetailsQuery, D.BillingDetailsQueryVariables>(D.BillingDetailsDocument, {}).then(
      response => {
        const data = response?.billingDetails;
        return data ? new BillingDetailsPayload(this._request, data) : undefined;
      }
    );
  }
}
/**
 * Query CollaborativeDocumentJoinDocument for CollaborationDocumentUpdatePayload
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
      return data ? new CollaborationDocumentUpdatePayload(this._request, data) : undefined;
    });
  }
}
/**
 * Query CommentDocument for Comment
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

  public async fetch(id: string): Promise<Comment | undefined> {
    return this.request<D.CommentQuery, D.CommentQueryVariables>(D.CommentDocument, {
      id,
    }).then(response => {
      const data = response?.comment;
      return data ? new Comment(this._request, data) : undefined;
    });
  }
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
 * Query CommentsDocument for CommentConnection
 *
 * @param request - function to call the graphql client
 * @param data - D.UserAdminPayloadFragment response data
 */
class SyncBootstrapQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.success = data.success ?? undefined;
  }

  public async fetch(vars?: D.CommentsQueryVariables): Promise<CommentConnection | undefined> {
    return this.request<D.CommentsQuery, D.CommentsQueryVariables>(D.CommentsDocument, vars).then(response => {
      const data = response?.comments;
      return data ? new CommentConnection(this.request, data) : undefined;
    });
  }
}
/**
 * Query CustomViewDocument for CustomView
 *
 * @param request - function to call the graphql client
 * @param data - D.UserAuthorizedApplicationFragment response data
 */
class SyncUpdatesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.clientId = data.clientId ?? undefined;
    this.description = data.description ?? undefined;
    this.developer = data.developer ?? undefined;
    this.developerUrl = data.developerUrl ?? undefined;
    this.imageUrl = data.imageUrl ?? undefined;
    this.isAuthorized = data.isAuthorized ?? undefined;
    this.name = data.name ?? undefined;
  }

  public async fetch(id: string): Promise<CustomView | undefined> {
    return this.request<D.CustomViewQuery, D.CustomViewQueryVariables>(D.CustomViewDocument, {
      id,
    }).then(response => {
      const data = response?.syncUpdates;
      return data ? new SyncResponse(this._request, data) : undefined;
    });
  }
}
/**
 * Query CustomViewsDocument for CustomViewConnection
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this UserConnection model
 * @param data - UserConnection response data
 */
class ArchivedModelSyncQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.CustomViewsQueryVariables): Promise<CustomViewConnection | undefined> {
    return this.request<D.CustomViewsQuery, D.CustomViewsQueryVariables>(D.CustomViewsDocument, vars).then(response => {
      const data = response?.customViews;
      return data ? new CustomViewConnection(this.request, data) : undefined;
    });
  }
}
/**
 * Query CycleDocument for Cycle
 *
 * @param request - function to call the graphql client
 * @param data - D.UserPayloadFragment response data
 */
class ArchivedModelsSyncQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._user = data.user ?? undefined;
  }

  public async fetch(id: string): Promise<Cycle | undefined> {
    return this.request<D.CycleQuery, D.CycleQueryVariables>(D.CycleDocument, {
      id,
    }).then(response => {
      const data = response?.archivedModelsSync;
      return data ? new ArchiveResponse(this._request, data) : undefined;
    });
  }
}
/**
 * Query CyclesDocument for CycleConnection
 *
 * @param request - function to call the graphql client
 * @param data - D.UserSettingsFragment response data
 */
class ApiKeysQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.notificationPreferences = data.notificationPreferences ?? undefined;
    this.unsubscribedFrom = data.unsubscribedFrom ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._user = data.user ?? undefined;
  }

  public async fetch(vars?: D.CyclesQueryVariables): Promise<CycleConnection | undefined> {
    return this.request<D.CyclesQuery, D.CyclesQueryVariables>(D.CyclesDocument, vars).then(response => {
      const data = response?.cycles;
      return data ? new CycleConnection(this.request, data) : undefined;
    });
  }
}
/**
 * Query EmojiDocument for Emoji
 *
 * @param request - function to call the graphql client
 * @param data - D.UserSettingsFlagPayloadFragment response data
 */
class ApplicationWithAuthorizationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.flag = data.flag ?? undefined;
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this.value = data.value ?? undefined;
  }

  public async fetch(id: string): Promise<Emoji | undefined> {
    return this.request<D.EmojiQuery, D.EmojiQueryVariables>(D.EmojiDocument, {
      id,
    }).then(response => {
      const data = response?.emoji;
      return data ? new Emoji(this._request, data) : undefined;
    });
  }
}
/**
 * Query EmojisDocument for EmojiConnection
 *
 * @param request - function to call the graphql client
 * @param data - D.UserSettingsFlagsResetPayloadFragment response data
 */
class AuthorizedApplicationsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  public async fetch(vars?: D.EmojisQueryVariables): Promise<EmojiConnection | undefined> {
    return this.request<D.EmojisQuery, D.EmojisQueryVariables>(D.EmojisDocument, vars).then(response => {
      const data = response?.emojis;
      return data ? new EmojiConnection(this.request, data) : undefined;
    });
  }
}
/**
 * Query FavoriteDocument for Favorite
 *
 * @param request - function to call the graphql client
 * @param data - D.UserSettingsPayloadFragment response data
 */
class AvailableUsersQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
  }

  public async fetch(id: string): Promise<Favorite | undefined> {
    return this.request<D.FavoriteQuery, D.FavoriteQueryVariables>(D.FavoriteDocument, {
      id,
    }).then(response => {
      const data = response?.favorite;
      return data ? new Favorite(this._request, data) : undefined;
    });
  }
}
/**
 * Query FavoritesDocument for FavoriteConnection
 *
 * @param request - function to call the graphql client
 * @param data - D.UserSubscribeToNewsletterPayloadFragment response data
 */
class FavoritesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.success = data.success ?? undefined;
  }

  public async fetch(vars?: D.FavoritesQueryVariables): Promise<FavoriteConnection | undefined> {
    return this.request<D.FavoritesQuery, D.FavoritesQueryVariables>(D.FavoritesDocument, vars).then(response => {
      const data = response?.favorites;
      return data ? new FavoriteConnection(this.request, data) : undefined;
    });
  }
}
/**
 * Query FigmaEmbedInfoDocument for FigmaEmbedPayload
 *
 * @param request - function to call the graphql client
 * @param data - D.ViewPreferencesFragment response data
 */
class SsoUrlFromEmailQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.id = data.id ?? undefined;
    this.type = data.type ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.viewType = data.viewType ?? undefined;
  }

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
 * Query IntegrationDocument for Integration
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

  public async fetch(id: string): Promise<Integration | undefined> {
    return this.request<D.IntegrationQuery, D.IntegrationQueryVariables>(D.IntegrationDocument, {
      id,
    }).then(response => {
      const data = response?.integration;
      return data ? new Integration(this._request, data) : undefined;
    });
  }
}
/**
 * Query IntegrationsDocument for IntegrationConnection
 *
 * @param request - function to call the graphql client
 * @param data - D.WebhookFragment response data
 */
class CommentsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.enabled = data.enabled ?? undefined;
    this.id = data.id ?? undefined;
    this.secret = data.secret ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.url = data.url ?? undefined;
    this._creator = data.creator ?? undefined;
    this._team = data.team ?? undefined;
  }

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
 * Query IntegrationResourceDocument for IntegrationResource
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this WebhookConnection model
 * @param data - WebhookConnection response data
 */
class IntegrationResourceQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<IntegrationResource | undefined> {
    return this.request<D.IntegrationResourceQuery, D.IntegrationResourceQueryVariables>(
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
 * Query IntegrationResourcesDocument for IntegrationResourceConnection
 *
 * @param request - function to call the graphql client
 * @param data - D.WebhookPayloadFragment response data
 */
class CommentQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._webhook = data.webhook ?? undefined;
  }

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
 * Query InviteInfoDocument for InvitePagePayload
 *
 * @param request - function to call the graphql client
 * @param data - D.WorkflowStateFragment response data
 */
class InviteInfoQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.archivedAt = data.archivedAt ?? undefined;
    this.color = data.color ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.description = data.description ?? undefined;
    this.id = data.id ?? undefined;
    this.name = data.name ?? undefined;
    this.position = data.position ?? undefined;
    this.type = data.type ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this._team = data.team ?? undefined;
  }

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
 * Query IssueLabelDocument for IssueLabel
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this WorkflowStateConnection model
 * @param data - WorkflowStateConnection response data
 */
class CustomViewQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<IssueLabel | undefined> {
    return this.request<D.IssueLabelQuery, D.IssueLabelQueryVariables>(D.IssueLabelDocument, {
      id,
    }).then(response => {
      const data = response?.customView;
      return data ? new CustomView(this._request, data) : undefined;
    });
  }
}
/**
 * Query IssueLabelsDocument for IssueLabelConnection
 *
 * @param request - function to call the graphql client
 * @param data - D.WorkflowStatePayloadFragment response data
 */
class CyclesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
    this.lastSyncId = data.lastSyncId ?? undefined;
    this.success = data.success ?? undefined;
    this._workflowState = data.workflowState ?? undefined;
  }

  public async fetch(vars?: D.IssueLabelsQueryVariables): Promise<IssueLabelConnection | undefined> {
    return this.request<D.IssueLabelsQuery, D.IssueLabelsQueryVariables>(D.IssueLabelsDocument, vars).then(response => {
      const data = response?.issueLabels;
      return data ? new IssueLabelConnection(this.request, data) : undefined;
    });
  }
}
/**
 * Query IssueRelationDocument for IssueRelation
 *
 * @param request - function to call the graphql client
 */
class CycleQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<IssueRelation | undefined> {
    return this.request<D.IssueRelationQuery, D.IssueRelationQueryVariables>(D.IssueRelationDocument, {
      id,
    }).then(response => {
      const data = response?.cycle;
      return data ? new Cycle(this._request, data) : undefined;
    });
  }
}

/**
 * Query IssueRelationsDocument for IssueRelationConnection
 *
 * @param request - function to call the graphql client
 */
class EmojisQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Query IssueDocument for Issue
 *
 * @param request - function to call the graphql client
 */
class EmojiQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<Issue | undefined> {
    return this.request<D.IssueQuery, D.IssueQueryVariables>(D.IssueDocument, {
      id,
    }).then(response => {
      const data = response?.emoji;
      return data ? new Emoji(this._request, data) : undefined;
    });
  }
}

/**
 * Query IssueSearchDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class FavoritesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    query: string,
    vars?: Omit<D.IssueSearchQueryVariables, "query">
  ): Promise<IssueConnection | undefined> {
    return this.request<D.IssueSearchQuery, D.IssueSearchQueryVariables>(D.IssueSearchDocument, {
      query,
      ...variables,
    }).then(response => {
      const data = response?.issueSearch;
      return data
        ? new FavoriteConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * Query IssuesDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class FavoriteQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.IssuesQueryVariables): Promise<IssueConnection | undefined> {
    return this.request<D.IssuesQuery, D.IssuesQueryVariables>(D.IssuesDocument, vars).then(response => {
      const data = response?.issues;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * Query MilestoneDocument for Milestone
 *
 * @param request - function to call the graphql client
 */
class FigmaEmbedInfoQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<Milestone | undefined> {
    return this.request<D.MilestoneQuery, D.MilestoneQueryVariables>(D.MilestoneDocument, {
      id,
    }).then(response => {
      const data = response?.figmaEmbedInfo;
      return data ? new FigmaEmbedPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query MilestonesDocument for MilestoneConnection
 *
 * @param request - function to call the graphql client
 */
class IntegrationsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.MilestonesQueryVariables): Promise<MilestoneConnection | undefined> {
    return this.request<D.MilestonesQuery, D.MilestonesQueryVariables>(D.MilestonesDocument, vars).then(response => {
      const data = response?.milestones;
      return data ? new MilestoneConnection(this.request, data) : undefined;
    });
  }
}

/**
 * Query NotificationDocument for UserSettings
 *
 * @param request - function to call the graphql client
 */
class IntegrationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Query NotificationsDocument for NotificationConnection
 *
 * @param request - function to call the graphql client
 */
class IntegrationResourcesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Query NotificationSubscriptionDocument for NotificationSubscriptionConnection
 *
 * @param request - function to call the graphql client
 */
class IntegrationResourceQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: D.NotificationSubscriptionQueryVariables
  ): Promise<NotificationSubscriptionConnection | undefined> {
    return this.request<D.NotificationSubscriptionQuery, D.NotificationSubscriptionQueryVariables>(
      D.NotificationSubscriptionDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.notificationSubscription;
      return data ? new NotificationSubscriptionConnection(this.request, data) : undefined;
    });
  }
}

/**
 * Query OrganizationInviteDocument for IssueLabel
 *
 * @param request - function to call the graphql client
 */
class OrganizationInviteQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Query OrganizationInvitesDocument for OrganizationInviteConnection
 *
 * @param request - function to call the graphql client
 */
class CollaborativeDocumentJoinQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.OrganizationInvitesQueryVariables): Promise<OrganizationInviteConnection | undefined> {
    return this.request<D.OrganizationInvitesQuery, D.OrganizationInvitesQueryVariables>(
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
 * Query ProjectLinkDocument for ProjectLink
 *
 * @param request - function to call the graphql client
 */
class InviteInfoQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ProjectLink | undefined> {
    return this.request<D.ProjectLinkQuery, D.ProjectLinkQueryVariables>(D.ProjectLinkDocument, {
      id,
    }).then(response => {
      const data = response?.inviteInfo;
      return data ? new InvitePagePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query ProjectLinksDocument for ProjectLinkConnection
 *
 * @param request - function to call the graphql client
 */
class IssueLabelsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.ProjectLinksQueryVariables): Promise<ProjectLinkConnection | undefined> {
    return this.request<D.ProjectLinksQuery, D.ProjectLinksQueryVariables>(D.ProjectLinksDocument, vars).then(
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
 * Query ProjectDocument for Project
 *
 * @param request - function to call the graphql client
 */
class IssueLabelQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<Project | undefined> {
    return this.request<D.ProjectQuery, D.ProjectQueryVariables>(D.ProjectDocument, {
      id,
    }).then(response => {
      const data = response?.issueLabel;
      return data ? new IssueLabel(this._request, data) : undefined;
    });
  }
}

/**
 * Query ProjectsDocument for ProjectConnection
 *
 * @param request - function to call the graphql client
 */
class IssueRelationsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.ProjectsQueryVariables): Promise<ProjectConnection | undefined> {
    return this.request<D.ProjectsQuery, D.ProjectsQueryVariables>(D.ProjectsDocument, vars).then(response => {
      const data = response?.projects;
      return data
        ? new IssueRelationConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * Query PushSubscriptionTestDocument for PushSubscriptionPayload
 *
 * @param request - function to call the graphql client
 */
class IssueRelationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Query ReactionDocument for Reaction
 *
 * @param request - function to call the graphql client
 */
class IssuesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Query ReactionsDocument for ReactionConnection
 *
 * @param request - function to call the graphql client
 */
class IssueQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.ReactionsQueryVariables): Promise<ReactionConnection | undefined> {
    return this.request<D.ReactionsQuery, D.ReactionsQueryVariables>(D.ReactionsDocument, vars).then(response => {
      const data = response?.reactions;
      return data
        ? new ReactionConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * Query SubscriptionDocument for Subscription
 *
 * @param request - function to call the graphql client
 */
class IssueSearchQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Query TeamMembershipDocument for TeamMembership
 *
 * @param request - function to call the graphql client
 */
class MilestonesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Query TeamMembershipsDocument for TeamMembershipConnection
 *
 * @param request - function to call the graphql client
 */
class MilestoneQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Query TeamDocument for Team
 *
 * @param request - function to call the graphql client
 */
class NotificationsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<Team | undefined> {
    return this.request<D.TeamQuery, D.TeamQueryVariables>(D.TeamDocument, {
      id,
    }).then(response => {
      const data = response?.notification;
      return data ? new Notification(this._request, data) : undefined;
    });
  }
}

/**
 * Query TeamsDocument for TeamConnection
 *
 * @param request - function to call the graphql client
 */
class NotificationSubscriptionsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.TeamsQueryVariables): Promise<TeamConnection | undefined> {
    return this.request<D.TeamsQuery, D.TeamsQueryVariables>(D.TeamsDocument, vars).then(response => {
      const data = response?.teams;
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
 * Query TemplatesDocument for Templates
 *
 * @param request - function to call the graphql client
 */
class OrganizationInvitesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(): Promise<Template[] | undefined> {
    return this.request<D.TemplatesQuery, D.TemplatesQueryVariables>(D.TemplatesDocument, {}).then(response => {
      const data = response?.templates;
      return data ? data.map(node => new Template(this._request, node)) : undefined;
    });
  }
}

/**
 * Query TemplateDocument for Template
 *
 * @param request - function to call the graphql client
 */
class OrganizationInviteQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<Template | undefined> {
    return this.request<D.TemplateQuery, D.TemplateQueryVariables>(D.TemplateDocument, {
      id,
    }).then(response => {
      const data = response?.organizationInvite;
      return data ? new IssueLabel(this._request, data) : undefined;
    });
  }
}

/**
 * Query ViewPreferencesDocument for ViewPreferencesConnection
 *
 * @param request - function to call the graphql client
 */
class OrganizationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.ViewPreferencesQueryVariables): Promise<ViewPreferencesConnection | undefined> {
    return this.request<D.ViewPreferencesQuery, D.ViewPreferencesQueryVariables>(D.ViewPreferencesDocument, vars).then(
      response => {
        const data = response?.organization;
        return data ? new Organization(this._request, data) : undefined;
      }
    );
  }
}

/**
 * Query WebhookDocument for Webhook
 *
 * @param request - function to call the graphql client
 */
class WebhookQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Query WebhooksDocument for WebhookConnection
 *
 * @param request - function to call the graphql client
 */
class OrganizationExistsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.WebhooksQueryVariables): Promise<WebhookConnection | undefined> {
    return this.request<D.WebhooksQuery, D.WebhooksQueryVariables>(D.WebhooksDocument, vars).then(response => {
      const data = response?.webhooks;
      return data
        ? new WebhookConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * Query WorkflowStateDocument for WorkflowState
 *
 * @param request - function to call the graphql client
 */
class ProjectLinksQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<WorkflowState | undefined> {
    return this.request<D.WorkflowStateQuery, D.WorkflowStateQueryVariables>(D.WorkflowStateDocument, {
      id,
    }).then(response => {
      const data = response?.webhook;
      return data ? new Webhook(this._request, data) : undefined;
    });
  }
}

/**
 * Query WorkflowStatesDocument for WorkflowStateConnection
 *
 * @param request - function to call the graphql client
 */
class ProjectLinkQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Mutation UserUpdateDocument for UserPayload
 *
 * @param request - function to call the graphql client
 */
class ProjectQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.UpdateUserInput, id: string): Promise<UserPayload | undefined> {
    return this.request<D.UserUpdateMutation, D.UserUpdateMutationVariables>(D.UserUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.project;
      return data ? new Project(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation UserPromoteAdminDocument for UserAdminPayload
 *
 * @param request - function to call the graphql client
 */
class PushSubscriptionTestQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<UserAdminPayload | undefined> {
    return this.request<D.UserPromoteAdminMutation, D.UserPromoteAdminMutationVariables>(D.UserPromoteAdminDocument, {
      id,
    }).then(response => {
      const data = response?.userPromoteAdmin;
      return data ? new UserAdminPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation UserDemoteAdminDocument for UserAdminPayload
 *
 * @param request - function to call the graphql client
 */
class ReactionsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<UserAdminPayload | undefined> {
    return this.request<D.UserDemoteAdminMutation, D.UserDemoteAdminMutationVariables>(D.UserDemoteAdminDocument, {
      id,
    }).then(response => {
      const data = response?.userDemoteAdmin;
      return data ? new UserAdminPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation UserSuspendDocument for UserAdminPayload
 *
 * @param request - function to call the graphql client
 */
class ReactionQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<UserAdminPayload | undefined> {
    return this.request<D.UserSuspendMutation, D.UserSuspendMutationVariables>(D.UserSuspendDocument, {
      id,
    }).then(response => {
      const data = response?.reaction;
      return data ? new Reaction(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation UserUnsuspendDocument for UserAdminPayload
 *
 * @param request - function to call the graphql client
 */
class SubscriptionQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<UserAdminPayload | undefined> {
    return this.request<D.UserUnsuspendMutation, D.UserUnsuspendMutationVariables>(D.UserUnsuspendDocument, {
      id,
    }).then(response => {
      const data = response?.userUnsuspend;
      return data ? new UserAdminPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation OrganizationUpdateDocument for OrganizationPayload
 *
 * @param request - function to call the graphql client
 */
class TeamMembershipsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.UpdateOrganizationInput): Promise<OrganizationPayload | undefined> {
    return this.request<D.OrganizationUpdateMutation, D.OrganizationUpdateMutationVariables>(
      D.OrganizationUpdateDocument,
      {
        input,
      }
    ).then(response => {
      const data = response?.teamMemberships;
      return data
        ? new TeamMembershipConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * Mutation OrganizationDeleteChallengeDocument for OrganizationDeletePayload
 *
 * @param request - function to call the graphql client
 */
class TeamMembershipQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(): Promise<OrganizationDeletePayload | undefined> {
    return this.request<D.OrganizationDeleteChallengeMutation, D.OrganizationDeleteChallengeMutationVariables>(
      D.OrganizationDeleteChallengeDocument,
      {}
    ).then(response => {
      const data = response?.organizationDeleteChallenge;
      return data ? new OrganizationDeletePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation OrganizationDeleteDocument for OrganizationDeletePayload
 *
 * @param request - function to call the graphql client
 */
class TeamsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.DeleteOrganizationInput): Promise<OrganizationDeletePayload | undefined> {
    return this.request<D.OrganizationDeleteMutation, D.OrganizationDeleteMutationVariables>(
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
 * Mutation AdminDeleteIntegrationDocument for AdminIntegrationPayload
 *
 * @param request - function to call the graphql client
 */
class TeamQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<AdminIntegrationPayload | undefined> {
    return this.request<D.AdminDeleteIntegrationMutation, D.AdminDeleteIntegrationMutationVariables>(
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
 * Mutation OrganizationToggleAccessDocument for OrganizationAccessPayload
 *
 * @param request - function to call the graphql client
 */
class TemplatesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<OrganizationAccessPayload | undefined> {
    return this.request<D.OrganizationToggleAccessMutation, D.OrganizationToggleAccessMutationVariables>(
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
 * Mutation OrganizationChangeEmailDomainDocument for OrganizationAccessPayload
 *
 * @param request - function to call the graphql client
 */
class TemplateQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
      return data ? new OrganizationAccessPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation OrganizationToggleSamlEnabledDocument for OrganizationSamlConfigurePayload
 *
 * @param request - function to call the graphql client
 */
class UsersQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<OrganizationSamlConfigurePayload | undefined> {
    return this.request<D.OrganizationToggleSamlEnabledMutation, D.OrganizationToggleSamlEnabledMutationVariables>(
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
 * Mutation OrganizationConfigureSamlDocument for OrganizationSamlConfigurePayload
 *
 * @param request - function to call the graphql client
 */
class UserQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
      return data ? new OrganizationSamlConfigurePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation AdminCommandDocument for AdminCommandPayload
 *
 * @param request - function to call the graphql client
 */
class ViewerQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.AdminCommandInput): Promise<AdminCommandPayload | undefined> {
    return this.request<D.AdminCommandMutation, D.AdminCommandMutationVariables>(D.AdminCommandDocument, {
      input,
    }).then(response => {
      const data = response?.adminCommand;
      return data ? new AdminCommandPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation AdminBulkEmailDocument for AdminCommandPayload
 *
 * @param request - function to call the graphql client
 */
class UserSettingsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Mutation AdminCreateStripeCustomerDocument for AdminCommandPayload
 *
 * @param request - function to call the graphql client
 */
class WebhooksQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(organizationId: string): Promise<AdminCommandPayload | undefined> {
    return this.request<D.AdminCreateStripeCustomerMutation, D.AdminCreateStripeCustomerMutationVariables>(
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
 * Mutation AdminScheduleAnonymousTaskDocument for AdminCommandPayload
 *
 * @param request - function to call the graphql client
 */
class WebhookQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(taskName: string): Promise<AdminCommandPayload | undefined> {
    return this.request<D.AdminScheduleAnonymousTaskMutation, D.AdminScheduleAnonymousTaskMutationVariables>(
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
 * Mutation AdminUserAccountChangeEmailDocument for UserAccountAdminPrivileged
 *
 * @param request - function to call the graphql client
 */
class WorkflowStatesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(newEmail: string, id: string): Promise<UserAccountAdminPrivileged | undefined> {
    return this.request<D.AdminUserAccountChangeEmailMutation, D.AdminUserAccountChangeEmailMutationVariables>(
      D.AdminUserAccountChangeEmailDocument,
      {
        newEmail,
        id,
      }
    ).then(response => {
      const data = response?.workflowStates;
      return data
        ? new WorkflowStateConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * Mutation EventCreateDocument for EventPayload
 *
 * @param request - function to call the graphql client
 */
class EventCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.EventCreateInput): Promise<EventPayload | undefined> {
    return this.request<D.EventCreateMutation, D.EventCreateMutationVariables>(D.EventCreateDocument, {
      input,
    }).then(response => {
      const data = response?.eventCreate;
      return data ? new EventPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation ApiKeyCreateDocument for ApiKeyPayload
 *
 * @param request - function to call the graphql client
 */
class ApiKeyCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.ApiKeyCreateInput): Promise<ApiKeyPayload | undefined> {
    return this.request<D.ApiKeyCreateMutation, D.ApiKeyCreateMutationVariables>(D.ApiKeyCreateDocument, {
      input,
    }).then(response => {
      const data = response?.apiKeyCreate;
      return data ? new ApiKeyPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation ApiKeyDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class ApiKeyDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.ApiKeyDeleteMutation, D.ApiKeyDeleteMutationVariables>(D.ApiKeyDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.apiKeyDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation EmailUserAccountAuthChallengeDocument for EmailUserAccountAuthChallengeResponse
 *
 * @param request - function to call the graphql client
 */
class EmailUserAccountAuthChallengeMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
      return data ? new EmailUserAccountAuthChallengeResponse(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation EmailTokenUserAccountAuthDocument for AuthResolverResponse
 *
 * @param request - function to call the graphql client
 */
class EmailTokenUserAccountAuthMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.TokenUserAccountAuthInput): Promise<AuthResolverResponse | undefined> {
    return this.request<D.EmailTokenUserAccountAuthMutation, D.EmailTokenUserAccountAuthMutationVariables>(
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
 * Mutation SamlTokenUserAccountAuthDocument for AuthResolverResponse
 *
 * @param request - function to call the graphql client
 */
class SamlTokenUserAccountAuthMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.TokenUserAccountAuthInput): Promise<AuthResolverResponse | undefined> {
    return this.request<D.SamlTokenUserAccountAuthMutation, D.SamlTokenUserAccountAuthMutationVariables>(
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
 * Mutation GoogleUserAccountAuthDocument for AuthResolverResponse
 *
 * @param request - function to call the graphql client
 */
class GoogleUserAccountAuthMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.GoogleUserAccountAuthInput): Promise<AuthResolverResponse | undefined> {
    return this.request<D.GoogleUserAccountAuthMutation, D.GoogleUserAccountAuthMutationVariables>(
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
 * Mutation CreateOrganizationFromOnboardingDocument for CreateOrJoinOrganizationResponse
 *
 * @param request - function to call the graphql client
 */
class CreateOrganizationFromOnboardingMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Mutation JoinOrganizationFromOnboardingDocument for CreateOrJoinOrganizationResponse
 *
 * @param request - function to call the graphql client
 */
class JoinOrganizationFromOnboardingMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.JoinOrganizationInput): Promise<CreateOrJoinOrganizationResponse | undefined> {
    return this.request<D.JoinOrganizationFromOnboardingMutation, D.JoinOrganizationFromOnboardingMutationVariables>(
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
 * Mutation LeaveOrganizationDocument for CreateOrJoinOrganizationResponse
 *
 * @param request - function to call the graphql client
 */
class LeaveOrganizationMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(organizationId: string): Promise<CreateOrJoinOrganizationResponse | undefined> {
    return this.request<D.LeaveOrganizationMutation, D.LeaveOrganizationMutationVariables>(
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
 * Mutation BillingEmailUpdateDocument for BillingEmailPayload
 *
 * @param request - function to call the graphql client
 */
class BillingEmailUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.BillingEmailUpdateInput): Promise<BillingEmailPayload | undefined> {
    return this.request<D.BillingEmailUpdateMutation, D.BillingEmailUpdateMutationVariables>(
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
 * Mutation CollaborativeDocumentUpdateDocument for CollaborationDocumentUpdatePayload
 *
 * @param request - function to call the graphql client
 */
class CollaborativeDocumentUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
      return data ? new CollaborationDocumentUpdatePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation CommentCreateDocument for CommentPayload
 *
 * @param request - function to call the graphql client
 */
class CommentCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.CommentCreateInput): Promise<CommentPayload | undefined> {
    return this.request<D.CommentCreateMutation, D.CommentCreateMutationVariables>(D.CommentCreateDocument, {
      input,
    }).then(response => {
      const data = response?.commentCreate;
      return data ? new CommentPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation CommentUpdateDocument for CommentPayload
 *
 * @param request - function to call the graphql client
 */
class CommentUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.CommentUpdateInput, id: string): Promise<CommentPayload | undefined> {
    return this.request<D.CommentUpdateMutation, D.CommentUpdateMutationVariables>(D.CommentUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.commentUpdate;
      return data ? new CommentPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation CommentDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class CommentDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.CommentDeleteMutation, D.CommentDeleteMutationVariables>(D.CommentDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.commentDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation ContactCreateDocument for ContactPayload
 *
 * @param request - function to call the graphql client
 */
class ContactCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.ContactCreateInput): Promise<ContactPayload | undefined> {
    return this.request<D.ContactCreateMutation, D.ContactCreateMutationVariables>(D.ContactCreateDocument, {
      input,
    }).then(response => {
      const data = response?.contactCreate;
      return data ? new ContactPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation CustomViewCreateDocument for CustomViewPayload
 *
 * @param request - function to call the graphql client
 */
class CustomViewCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.CustomViewCreateInput): Promise<CustomViewPayload | undefined> {
    return this.request<D.CustomViewCreateMutation, D.CustomViewCreateMutationVariables>(D.CustomViewCreateDocument, {
      input,
    }).then(response => {
      const data = response?.customViewCreate;
      return data ? new CustomViewPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation CustomViewUpdateDocument for CustomViewPayload
 *
 * @param request - function to call the graphql client
 */
class CustomViewUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.CustomViewUpdateInput, id: string): Promise<CustomViewPayload | undefined> {
    return this.request<D.CustomViewUpdateMutation, D.CustomViewUpdateMutationVariables>(D.CustomViewUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.customViewUpdate;
      return data ? new CustomViewPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation CustomViewDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class CustomViewDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.CustomViewDeleteMutation, D.CustomViewDeleteMutationVariables>(D.CustomViewDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.customViewDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation CycleCreateDocument for CyclePayload
 *
 * @param request - function to call the graphql client
 */
class CycleCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.CycleCreateInput): Promise<CyclePayload | undefined> {
    return this.request<D.CycleCreateMutation, D.CycleCreateMutationVariables>(D.CycleCreateDocument, {
      input,
    }).then(response => {
      const data = response?.cycleCreate;
      return data ? new CyclePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation CycleUpdateDocument for CyclePayload
 *
 * @param request - function to call the graphql client
 */
class CycleUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.CycleUpdateInput, id: string): Promise<CyclePayload | undefined> {
    return this.request<D.CycleUpdateMutation, D.CycleUpdateMutationVariables>(D.CycleUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.cycleUpdate;
      return data ? new CyclePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation CycleArchiveDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class CycleArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.CycleArchiveMutation, D.CycleArchiveMutationVariables>(D.CycleArchiveDocument, {
      id,
    }).then(response => {
      const data = response?.cycleArchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation DebugFailWithInternalErrorDocument for DebugPayload
 *
 * @param request - function to call the graphql client
 */
class DebugFailWithInternalErrorMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(): Promise<DebugPayload | undefined> {
    return this.request<D.DebugFailWithInternalErrorMutation, D.DebugFailWithInternalErrorMutationVariables>(
      D.DebugFailWithInternalErrorDocument,
      {}
    ).then(response => {
      const data = response?.debugFailWithInternalError;
      return data ? new DebugPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation DebugFailWithWarningDocument for DebugPayload
 *
 * @param request - function to call the graphql client
 */
class DebugFailWithWarningMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(): Promise<DebugPayload | undefined> {
    return this.request<D.DebugFailWithWarningMutation, D.DebugFailWithWarningMutationVariables>(
      D.DebugFailWithWarningDocument,
      {}
    ).then(response => {
      const data = response?.debugFailWithWarning;
      return data ? new DebugPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation DebugCreateSamlOrgDocument for DebugPayload
 *
 * @param request - function to call the graphql client
 */
class DebugCreateSamlOrgMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(): Promise<DebugPayload | undefined> {
    return this.request<D.DebugCreateSamlOrgMutation, D.DebugCreateSamlOrgMutationVariables>(
      D.DebugCreateSamlOrgDocument,
      {}
    ).then(response => {
      const data = response?.debugCreateSAMLOrg;
      return data ? new DebugPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation EmailUnsubscribeDocument for EmailUnsubscribePayload
 *
 * @param request - function to call the graphql client
 */
class EmailUnsubscribeMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.EmailUnsubscribeInput): Promise<EmailUnsubscribePayload | undefined> {
    return this.request<D.EmailUnsubscribeMutation, D.EmailUnsubscribeMutationVariables>(D.EmailUnsubscribeDocument, {
      input,
    }).then(response => {
      const data = response?.emailUnsubscribe;
      return data ? new EmailUnsubscribePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation EmojiCreateDocument for EmojiPayload
 *
 * @param request - function to call the graphql client
 */
class EmojiCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.EmojiCreateInput): Promise<EmojiPayload | undefined> {
    return this.request<D.EmojiCreateMutation, D.EmojiCreateMutationVariables>(D.EmojiCreateDocument, {
      input,
    }).then(response => {
      const data = response?.emojiCreate;
      return data ? new EmojiPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation EmojiDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class EmojiDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.EmojiDeleteMutation, D.EmojiDeleteMutationVariables>(D.EmojiDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.emojiDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation FavoriteCreateDocument for FavoritePayload
 *
 * @param request - function to call the graphql client
 */
class FavoriteCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.FavoriteCreateInput): Promise<FavoritePayload | undefined> {
    return this.request<D.FavoriteCreateMutation, D.FavoriteCreateMutationVariables>(D.FavoriteCreateDocument, {
      input,
    }).then(response => {
      const data = response?.favoriteCreate;
      return data ? new FavoritePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation FavoriteUpdateDocument for FavoritePayload
 *
 * @param request - function to call the graphql client
 */
class FavoriteUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.FavoriteUpdateInput, id: string): Promise<FavoritePayload | undefined> {
    return this.request<D.FavoriteUpdateMutation, D.FavoriteUpdateMutationVariables>(D.FavoriteUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.favoriteUpdate;
      return data ? new FavoritePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation FavoriteDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class FavoriteDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.FavoriteDeleteMutation, D.FavoriteDeleteMutationVariables>(D.FavoriteDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.favoriteDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation FeedbackCreateDocument for FeedbackPayload
 *
 * @param request - function to call the graphql client
 */
class FeedbackCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.FeedbackCreateInput): Promise<FeedbackPayload | undefined> {
    return this.request<D.FeedbackCreateMutation, D.FeedbackCreateMutationVariables>(D.FeedbackCreateDocument, {
      input,
    }).then(response => {
      const data = response?.feedbackCreate;
      return data ? new FeedbackPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation FileUploadDocument for UploadPayload
 *
 * @param request - function to call the graphql client
 */
class FileUploadMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    userHash: string,
    variables?: Omit<D.InviteInfoQueryVariables, "userHash">
  ): Fetch<InvitePagePayload> {
    return this._request<D.InviteInfoQuery, D.InviteInfoQueryVariables>(D.InviteInfoDocument, {
      userHash,
      ...variables,
    }).then(response => {
      const data = response?.fileUpload;
      return data ? new UploadPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation ImageUploadFromUrlDocument for ImageUploadFromUrlPayload
 *
 * @param request - function to call the graphql client
 */
class ImageUploadFromUrlMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(url: string): Promise<ImageUploadFromUrlPayload | undefined> {
    return this.request<D.ImageUploadFromUrlMutation, D.ImageUploadFromUrlMutationVariables>(
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
 * Mutation IntegrationGithubConnectDocument for IntegrationPayload
 *
 * @param request - function to call the graphql client
 */
class IssueQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(installationId: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationGithubConnectMutation, D.IntegrationGithubConnectMutationVariables>(
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
 * Mutation IntegrationGitlabConnectDocument for IntegrationPayload
 *
 * @param request - function to call the graphql client
 */
class IssueArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(gitlabUrl: string, accessToken: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationGitlabConnectMutation, D.IntegrationGitlabConnectMutationVariables>(
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
 * Mutation IntegrationSlackDocument for IntegrationPayload
 *
 * @param request - function to call the graphql client
 */
class IssueCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
      const data = response?.issueCreate;
      return data ? new IssuePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation IntegrationSlackPersonalDocument for IntegrationPayload
 *
 * @param request - function to call the graphql client
 */
class IssueImportCreateGithubMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(redirectUri: string, code: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationSlackPersonalMutation, D.IntegrationSlackPersonalMutationVariables>(
      D.IntegrationSlackPersonalDocument,
      {
        githubRepoOwner,
        githubRepoName,
        githubToken,
        teamId,
      }
    ).then(response => {
      const data = response?.issueImportCreateGithub;
      return data ? new IssueImportPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation IntegrationSlackPostDocument for IntegrationPayload
 *
 * @param request - function to call the graphql client
 */
class IssueLabelQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Mutation IntegrationSlackProjectPostDocument for IntegrationPayload
 *
 * @param request - function to call the graphql client
 */
class IssueLabelArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(redirectUri: string, projectId: string, code: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationSlackProjectPostMutation, D.IntegrationSlackProjectPostMutationVariables>(
      D.IntegrationSlackProjectPostDocument,
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
 * Mutation IntegrationSlackImportEmojisDocument for IntegrationPayload
 *
 * @param request - function to call the graphql client
 */
class IssueLabelCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(redirectUri: string, code: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationSlackImportEmojisMutation, D.IntegrationSlackImportEmojisMutationVariables>(
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
 * Mutation IntegrationFigmaDocument for IntegrationPayload
 *
 * @param request - function to call the graphql client
 */
class IssueLabelUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(redirectUri: string, code: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationFigmaMutation, D.IntegrationFigmaMutationVariables>(D.IntegrationFigmaDocument, {
      redirectUri,
      code,
    }).then(response => {
      const data = response?.issueLabelUpdate;
      return data ? new IssueLabelPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation IntegrationGoogleSheetsDocument for IntegrationPayload
 *
 * @param request - function to call the graphql client
 */
class IssueLabelsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(code: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationGoogleSheetsMutation, D.IntegrationGoogleSheetsMutationVariables>(
      D.IntegrationGoogleSheetsDocument,
      {
        code,
      }
    );
  }
}

/**
 * Mutation RefreshGoogleSheetsDataDocument for IntegrationPayload
 *
 * @param request - function to call the graphql client
 */
class IssueRelationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<IntegrationPayload | undefined> {
    return this.request<D.RefreshGoogleSheetsDataMutation, D.RefreshGoogleSheetsDataMutationVariables>(
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
 * Mutation IntegrationSentryConnectDocument for IntegrationPayload
 *
 * @param request - function to call the graphql client
 */
class IssueRelationCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    organizationSlug: string,
    code: string,
    installationId: string
  ): Promise<IntegrationPayload | undefined> {
    return this.request<D.IntegrationSentryConnectMutation, D.IntegrationSentryConnectMutationVariables>(
      D.IntegrationSentryConnectDocument,
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
 * Mutation IntegrationDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class IssueRelationDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.IntegrationDeleteMutation, D.IntegrationDeleteMutationVariables>(
      D.IntegrationDeleteDocument,
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
 * Mutation IntegrationResourceArchiveDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class IssueRelationUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.IntegrationResourceArchiveMutation, D.IntegrationResourceArchiveMutationVariables>(
      D.IntegrationResourceArchiveDocument,
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
 * Mutation IssueLabelCreateDocument for IssueLabelPayload
 *
 * @param request - function to call the graphql client
 */
class IssueSearchQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.IssueLabelCreateInput): Promise<IssueLabelPayload | undefined> {
    return this.request<D.IssueLabelCreateMutation, D.IssueLabelCreateMutationVariables>(D.IssueLabelCreateDocument, {
      input,
    }).then(response => {
      const data = response?.issueSearch;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch(query, { ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * Mutation IssueLabelUpdateDocument for IssueLabelPayload
 *
 * @param request - function to call the graphql client
 */
class IssueUnarchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.IssueLabelUpdateInput, id: string): Promise<IssueLabelPayload | undefined> {
    return this.request<D.IssueLabelUpdateMutation, D.IssueLabelUpdateMutationVariables>(D.IssueLabelUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.issueUnarchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation IssueLabelArchiveDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class IssueUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.IssueLabelArchiveMutation, D.IssueLabelArchiveMutationVariables>(
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
 * Mutation IssueRelationCreateDocument for IssueRelationPayload
 *
 * @param request - function to call the graphql client
 */
class IssuesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.IssueRelationCreateInput): Promise<IssueRelationPayload | undefined> {
    return this.request<D.IssueRelationCreateMutation, D.IssueRelationCreateMutationVariables>(
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
 * Mutation IssueRelationUpdateDocument for IssueRelationPayload
 *
 * @param request - function to call the graphql client
 */
class JoinOrganizationFromOnboardingMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.IssueRelationUpdateInput, id: string): Promise<IssueRelationPayload | undefined> {
    return this.request<D.IssueRelationUpdateMutation, D.IssueRelationUpdateMutationVariables>(
      D.IssueRelationUpdateDocument,
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
 * Mutation IssueRelationDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class LeaveOrganizationMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.IssueRelationDeleteMutation, D.IssueRelationDeleteMutationVariables>(
      D.IssueRelationDeleteDocument,
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
 * Mutation IssueCreateDocument for IssuePayload
 *
 * @param request - function to call the graphql client
 */
class MilestoneQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.IssueCreateInput): Promise<IssuePayload | undefined> {
    return this.request<D.IssueCreateMutation, D.IssueCreateMutationVariables>(D.IssueCreateDocument, {
      input,
    }).then(response => {
      const data = response?.milestone;
      return data ? new Milestone(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation IssueUpdateDocument for IssuePayload
 *
 * @param request - function to call the graphql client
 */
class MilestoneCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.IssueUpdateInput, id: string): Promise<IssuePayload | undefined> {
    return this.request<D.IssueUpdateMutation, D.IssueUpdateMutationVariables>(D.IssueUpdateDocument, {
      input,
    }).then(response => {
      const data = response?.milestoneCreate;
      return data ? new MilestonePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation IssueArchiveDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class MilestoneDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.IssueArchiveMutation, D.IssueArchiveMutationVariables>(D.IssueArchiveDocument, {
      id,
    }).then(response => {
      const data = response?.milestoneDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation IssueUnarchiveDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class MilestoneUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.IssueUnarchiveMutation, D.IssueUnarchiveMutationVariables>(D.IssueUnarchiveDocument, {
      id,
    }).then(response => {
      const data = response?.milestoneUpdate;
      return data ? new MilestonePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation MilestoneCreateDocument for MilestonePayload
 *
 * @param request - function to call the graphql client
 */
class MilestonesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.MilestoneCreateInput): Promise<MilestonePayload | undefined> {
    return this.request<D.MilestoneCreateMutation, D.MilestoneCreateMutationVariables>(D.MilestoneCreateDocument, {
      input,
    }).then(response => {
      const data = response?.milestoneCreate;
      return data ? new MilestonePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation MilestoneUpdateDocument for MilestonePayload
 *
 * @param request - function to call the graphql client
 */
class NotificationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.MilestoneUpdateInput, id: string): Promise<MilestonePayload | undefined> {
    return this.request<D.MilestoneUpdateMutation, D.MilestoneUpdateMutationVariables>(D.MilestoneUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.notification;
      return data ? new Notification(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation MilestoneDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class NotificationArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.MilestoneDeleteMutation, D.MilestoneDeleteMutationVariables>(D.MilestoneDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.milestoneDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation NotificationCreateDocument for NotificationPayload
 *
 * @param request - function to call the graphql client
 */
class NotificationCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.NotificationUpdateInput, id: string): Promise<NotificationPayload | undefined> {
    return this.request<D.NotificationCreateMutation, D.NotificationCreateMutationVariables>(
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
 * Mutation NotificationUpdateDocument for NotificationPayload
 *
 * @param request - function to call the graphql client
 */
class NotificationUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.NotificationUpdateInput, id: string): Promise<NotificationPayload | undefined> {
    return this.request<D.NotificationUpdateMutation, D.NotificationUpdateMutationVariables>(
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
 * Mutation NotificationDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class NotificationDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.NotificationDeleteMutation, D.NotificationDeleteMutationVariables>(
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
 * Mutation NotificationArchiveDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class NotificationArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.NotificationArchiveMutation, D.NotificationArchiveMutationVariables>(
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
 * Mutation NotificationUnarchiveDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class NotificationSubscriptionQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.NotificationUnarchiveMutation, D.NotificationUnarchiveMutationVariables>(
      D.NotificationUnarchiveDocument,
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
 * Mutation NotificationSubscriptionCreateDocument for NotificationSubscriptionPayload
 *
 * @param request - function to call the graphql client
 */
class NotificationSubscriptionCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
      return data ? new NotificationSubscriptionPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation NotificationSubscriptionDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class NotificationSubscriptionDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.NotificationSubscriptionDeleteMutation, D.NotificationSubscriptionDeleteMutationVariables>(
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
 * Mutation OauthClientCreateDocument for OauthClientPayload
 *
 * @param request - function to call the graphql client
 */
class OauthClientCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.OauthClientCreateInput): Promise<OauthClientPayload | undefined> {
    return this.request<D.OauthClientCreateMutation, D.OauthClientCreateMutationVariables>(
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
 * Mutation OauthClientUpdateDocument for OauthClientPayload
 *
 * @param request - function to call the graphql client
 */
class NotificationSubscriptionsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.OauthClientUpdateInput, id: string): Promise<OauthClientPayload | undefined> {
    return this.request<D.OauthClientUpdateMutation, D.OauthClientUpdateMutationVariables>(
      D.OauthClientUpdateDocument,
      {
        input,
        id,
      }
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
 * Mutation OauthClientArchiveDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class NotificationUnarchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.OauthClientArchiveMutation, D.OauthClientArchiveMutationVariables>(
      D.OauthClientArchiveDocument,
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
 * Mutation OauthClientRotateSecretDocument for RotateSecretPayload
 *
 * @param request - function to call the graphql client
 */
class NotificationUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<RotateSecretPayload | undefined> {
    return this.request<D.OauthClientRotateSecretMutation, D.OauthClientRotateSecretMutationVariables>(
      D.OauthClientRotateSecretDocument,
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
 * Mutation OauthTokenRevokeDocument for OauthTokenRevokePayload
 *
 * @param request - function to call the graphql client
 */
class NotificationsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(scope: string[], appId: string): Promise<OauthTokenRevokePayload | undefined> {
    return this.request<D.OauthTokenRevokeMutation, D.OauthTokenRevokeMutationVariables>(D.OauthTokenRevokeDocument, {
      scope,
      appId,
    }).then(response => {
      const data = response?.oauthTokenRevoke;
      return data ? new OauthTokenRevokePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation OrganizationDomainVerifyDocument for OrganizationDomainPayload
 *
 * @param request - function to call the graphql client
 */
class OauthClientArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.OrganizationDomainVerificationInput): Promise<OrganizationDomainPayload | undefined> {
    return this.request<D.OrganizationDomainVerifyMutation, D.OrganizationDomainVerifyMutationVariables>(
      D.OrganizationDomainVerifyDocument,
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
 * Mutation OrganizationDomainCreateDocument for OrganizationDomainPayload
 *
 * @param request - function to call the graphql client
 */
class OauthClientCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.OrganizationDomainCreateInput): Promise<OrganizationDomainPayload | undefined> {
    return this.request<D.OrganizationDomainCreateMutation, D.OrganizationDomainCreateMutationVariables>(
      D.OrganizationDomainCreateDocument,
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
 * Mutation OrganizationDomainDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class OauthClientRotateSecretMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.OrganizationDomainDeleteMutation, D.OrganizationDomainDeleteMutationVariables>(
      D.OrganizationDomainDeleteDocument,
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
 * Mutation OrganizationInviteCreateDocument for OrganizationInvitePayload
 *
 * @param request - function to call the graphql client
 */
class OauthClientUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.OrganizationInviteCreateInput): Promise<OrganizationInvitePayload | undefined> {
    return this.request<D.OrganizationInviteCreateMutation, D.OrganizationInviteCreateMutationVariables>(
      D.OrganizationInviteCreateDocument,
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
 * Mutation ResentOrganizationInviteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class OauthTokenRevokeMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.ResentOrganizationInviteMutation, D.ResentOrganizationInviteMutationVariables>(
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
 * Mutation OrganizationInviteDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class OrganizationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.OrganizationInviteDeleteMutation, D.OrganizationInviteDeleteMutationVariables>(
      D.OrganizationInviteDeleteDocument,
      {
        id,
      }
    );
  }
}

/**
 * Mutation ProjectLinkCreateDocument for ProjectLinkPayload
 *
 * @param request - function to call the graphql client
 */
class OrganizationDomainDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.ProjectLinkCreateInput): Promise<ProjectLinkPayload | undefined> {
    return this.request<D.ProjectLinkCreateMutation, D.ProjectLinkCreateMutationVariables>(
      D.ProjectLinkCreateDocument,
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
 * Mutation ProjectLinkDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class OrganizationDomainVerifyMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.ProjectLinkDeleteMutation, D.ProjectLinkDeleteMutationVariables>(
      D.ProjectLinkDeleteDocument,
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
 * Mutation ProjectCreateDocument for ProjectPayload
 *
 * @param request - function to call the graphql client
 */
class OrganizationExistsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.ProjectCreateInput): Promise<ProjectPayload | undefined> {
    return this.request<D.ProjectCreateMutation, D.ProjectCreateMutationVariables>(D.ProjectCreateDocument, {
      input,
    }).then(response => {
      const data = response?.organizationExists;
      return data ? new OrganizationExistsPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation ProjectUpdateDocument for ProjectPayload
 *
 * @param request - function to call the graphql client
 */
class OrganizationInviteQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.ProjectUpdateInput, id: string): Promise<ProjectPayload | undefined> {
    return this.request<D.ProjectUpdateMutation, D.ProjectUpdateMutationVariables>(D.ProjectUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.organizationInvite;
      return data ? new IssueLabel(this._request, data) : undefined;
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
 * Mutation ProjectArchiveDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class OrganizationInviteDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.ProjectArchiveMutation, D.ProjectArchiveMutationVariables>(D.ProjectArchiveDocument, {
      id,
    }).then(response => {
      const data = response?.projectArchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation PushSubscriptionCreateDocument for PushSubscriptionPayload
 *
 * @param request - function to call the graphql client
 */
class OrganizationInvitesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.PushSubscriptionCreateInput): Promise<PushSubscriptionPayload | undefined> {
    return this.request<D.PushSubscriptionCreateMutation, D.PushSubscriptionCreateMutationVariables>(
      D.PushSubscriptionCreateDocument,
      {
        input,
      }
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
 * Mutation PushSubscriptionDeleteDocument for PushSubscriptionPayload
 *
 * @param request - function to call the graphql client
 */
class OrganizationUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<PushSubscriptionPayload | undefined> {
    return this.request<D.PushSubscriptionDeleteMutation, D.PushSubscriptionDeleteMutationVariables>(
      D.PushSubscriptionDeleteDocument,
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
 * Mutation ReactionCreateDocument for ReactionPayload
 *
 * @param request - function to call the graphql client
 */
class ProjectQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.ReactionCreateInput): Promise<ReactionPayload | undefined> {
    return this.request<D.ReactionCreateMutation, D.ReactionCreateMutationVariables>(D.ReactionCreateDocument, {
      input,
    }).then(response => {
      const data = response?.project;
      return data ? new Project(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation ReactionDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class ProjectArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.ReactionDeleteMutation, D.ReactionDeleteMutationVariables>(D.ReactionDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.projectArchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation CreateCsvExportReportDocument for CreateCsvExportReportPayload
 *
 * @param request - function to call the graphql client
 */
class ProjectCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(): Promise<CreateCsvExportReportPayload | undefined> {
    return this.request<D.CreateCsvExportReportMutation, D.CreateCsvExportReportMutationVariables>(
      D.CreateCsvExportReportDocument,
      {}
    ).then(response => {
      const data = response?.createCsvExportReport;
      return data ? new CreateCsvExportReportPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation SubscriptionSessionCreateDocument for SubscriptionSessionPayload
 *
 * @param request - function to call the graphql client
 */
class ProjectLinkQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(plan: string): Promise<SubscriptionSessionPayload | undefined> {
    return this.request<D.SubscriptionSessionCreateMutation, D.SubscriptionSessionCreateMutationVariables>(
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
 * Mutation SubscriptionUpdateSessionCreateDocument for SubscriptionSessionPayload
 *
 * @param request - function to call the graphql client
 */
class ProjectLinkCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(): Promise<SubscriptionSessionPayload | undefined> {
    return this.request<D.SubscriptionUpdateSessionCreateMutation, D.SubscriptionUpdateSessionCreateMutationVariables>(
      D.SubscriptionUpdateSessionCreateDocument,
      {}
    ).then(response => {
      const data = response?.projectLinkCreate;
      return data ? new ProjectLinkPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation SubscriptionUpdateDocument for SubscriptionPayload
 *
 * @param request - function to call the graphql client
 */
class ProjectLinkDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.SubscriptionUpdateInput, id: string): Promise<SubscriptionPayload | undefined> {
    return this.request<D.SubscriptionUpdateMutation, D.SubscriptionUpdateMutationVariables>(
      D.SubscriptionUpdateDocument,
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
 * Mutation SubscriptionUpgradeDocument for SubscriptionPayload
 *
 * @param request - function to call the graphql client
 */
class ProjectLinksQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(type: string, id: string): Promise<SubscriptionPayload | undefined> {
    return this.request<D.SubscriptionUpgradeMutation, D.SubscriptionUpgradeMutationVariables>(
      D.SubscriptionUpgradeDocument,
      {
        type,
        id,
      }
    );
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
 * Mutation SubscriptionArchiveDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class ProjectsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.SubscriptionArchiveMutation, D.SubscriptionArchiveMutationVariables>(
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
 * Mutation TeamMembershipCreateDocument for TeamMembershipPayload
 *
 * @param request - function to call the graphql client
 */
class PushSubscriptionCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.TeamMembershipCreateInput): Promise<TeamMembershipPayload | undefined> {
    return this.request<D.TeamMembershipCreateMutation, D.TeamMembershipCreateMutationVariables>(
      D.TeamMembershipCreateDocument,
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
 * Mutation TeamMembershipDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class PushSubscriptionDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.TeamMembershipDeleteMutation, D.TeamMembershipDeleteMutationVariables>(
      D.TeamMembershipDeleteDocument,
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
 * Mutation TeamCreateDocument for TeamPayload
 *
 * @param request - function to call the graphql client
 */
class PushSubscriptionTestQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Mutation TeamUpdateDocument for TeamPayload
 *
 * @param request - function to call the graphql client
 */
class ReactionQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.TeamUpdateInput, id: string): Promise<TeamPayload | undefined> {
    return this.request<D.TeamUpdateMutation, D.TeamUpdateMutationVariables>(D.TeamUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.reaction;
      return data ? new Reaction(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation TeamArchiveDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class ReactionCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.TeamArchiveMutation, D.TeamArchiveMutationVariables>(D.TeamArchiveDocument, {
      id,
    }).then(response => {
      const data = response?.reactionCreate;
      return data ? new ReactionPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation TeamDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class ReactionDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.TeamDeleteMutation, D.TeamDeleteMutationVariables>(D.TeamDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.reactionDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation TemplateCreateDocument for TemplatePayload
 *
 * @param request - function to call the graphql client
 */
class ReactionsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.TemplateCreateInput): Promise<TemplatePayload | undefined> {
    return this.request<D.TemplateCreateMutation, D.TemplateCreateMutationVariables>(D.TemplateCreateDocument, {
      input,
    }).then(response => {
      const data = response?.templateCreate;
      return data ? new TemplatePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation TemplateUpdateDocument for TemplatePayload
 *
 * @param request - function to call the graphql client
 */
class RefreshGoogleSheetsDataMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.TemplateUpdateInput, id: string): Promise<TemplatePayload | undefined> {
    return this.request<D.TemplateUpdateMutation, D.TemplateUpdateMutationVariables>(D.TemplateUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.templateUpdate;
      return data ? new TemplatePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation TemplateDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class ResentOrganizationInviteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.TemplateDeleteMutation, D.TemplateDeleteMutationVariables>(D.TemplateDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.templateDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation UserSettingsUpdateDocument for UserSettingsPayload
 *
 * @param request - function to call the graphql client
 */
class UserSettingsUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.UserSettingsUpdateInput, id: string): Promise<UserSettingsPayload | undefined> {
    return this.request<D.UserSettingsUpdateMutation, D.UserSettingsUpdateMutationVariables>(
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
 * Mutation UserSettingsFlagIncrementDocument for UserSettingsFlagPayload
 *
 * @param request - function to call the graphql client
 */
class UserSettingsFlagIncrementMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(flag: string): Promise<UserSettingsFlagPayload | undefined> {
    return this.request<D.UserSettingsFlagIncrementMutation, D.UserSettingsFlagIncrementMutationVariables>(
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
 * Mutation UserSettingsFlagsResetDocument for UserSettingsFlagsResetPayload
 *
 * @param request - function to call the graphql client
 */
class UserSettingsFlagsResetMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(): Promise<UserSettingsFlagsResetPayload | undefined> {
    return this.request<D.UserSettingsFlagsResetMutation, D.UserSettingsFlagsResetMutationVariables>(
      D.UserSettingsFlagsResetDocument,
      {}
    ).then(response => {
      const data = response?.userSettingsFlagsReset;
      return data ? new UserSettingsFlagsResetPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation UserFlagUpdateDocument for UserSettingsFlagPayload
 *
 * @param request - function to call the graphql client
 */
class UserFlagUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    operation: D.UserFlagUpdateOperation,
    flag: D.UserFlagType
  ): Promise<UserSettingsFlagPayload | undefined> {
    return this.request<D.UserFlagUpdateMutation, D.UserFlagUpdateMutationVariables>(D.UserFlagUpdateDocument, {
      operation,
      flag,
    }).then(response => {
      const data = response?.templateUpdate;
      return data ? new TemplatePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation UserSubscribeToNewsletterDocument for UserSubscribeToNewsletterPayload
 *
 * @param request - function to call the graphql client
 */
class TemplateDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(): Promise<UserSubscribeToNewsletterPayload | undefined> {
    return this.request<D.UserSubscribeToNewsletterMutation, D.UserSubscribeToNewsletterMutationVariables>(
      D.UserSubscribeToNewsletterDocument,
      {}
    ).then(response => {
      const data = response?.userSubscribeToNewsletter;
      return data ? new UserSubscribeToNewsletterPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation ViewPreferencesCreateDocument for ViewPreferencesPayload
 *
 * @param request - function to call the graphql client
 */
class UserUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.ViewPreferencesCreateInput): Promise<ViewPreferencesPayload | undefined> {
    return this.request<D.ViewPreferencesCreateMutation, D.ViewPreferencesCreateMutationVariables>(
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
 * Mutation ViewPreferencesUpdateDocument for ViewPreferencesPayload
 *
 * @param request - function to call the graphql client
 */
class UserPromoteAdminMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.ViewPreferencesUpdateInput, id: string): Promise<ViewPreferencesPayload | undefined> {
    return this.request<D.ViewPreferencesUpdateMutation, D.ViewPreferencesUpdateMutationVariables>(
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
 * Mutation ViewPreferencesDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class UserDemoteAdminMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.ViewPreferencesDeleteMutation, D.ViewPreferencesDeleteMutationVariables>(
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
 * Mutation WebhookCreateDocument for WebhookPayload
 *
 * @param request - function to call the graphql client
 */
class UserSuspendMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.WebhookCreateInput): Promise<WebhookPayload | undefined> {
    return this.request<D.WebhookCreateMutation, D.WebhookCreateMutationVariables>(D.WebhookCreateDocument, {
      input,
    }).then(response => {
      const data = response?.userSuspend;
      return data ? new UserAdminPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation WebhookUpdateDocument for WebhookPayload
 *
 * @param request - function to call the graphql client
 */
class UserUnsuspendMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.WebhookUpdateInput, id: string): Promise<WebhookPayload | undefined> {
    return this.request<D.WebhookUpdateMutation, D.WebhookUpdateMutationVariables>(D.WebhookUpdateDocument, {
      input,
      id,
    }).then(response => {
      const data = response?.userUnsuspend;
      return data ? new UserAdminPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation WebhookDeleteDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class UserSettingsUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.WebhookDeleteMutation, D.WebhookDeleteMutationVariables>(D.WebhookDeleteDocument, {
      id,
    }).then(response => {
      const data = response?.webhookDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation WorkflowStateCreateDocument for WorkflowStatePayload
 *
 * @param request - function to call the graphql client
 */
class SubscriptionUpgradeMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.WorkflowStateCreateInput): Promise<WorkflowStatePayload | undefined> {
    return this.request<D.WorkflowStateCreateMutation, D.WorkflowStateCreateMutationVariables>(
      D.WorkflowStateCreateDocument,
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
 * Mutation WorkflowStateUpdateDocument for WorkflowStatePayload
 *
 * @param request - function to call the graphql client
 */
class SyncBootstrapQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(input: D.WorkflowStateUpdateInput, id: string): Promise<WorkflowStatePayload | undefined> {
    return this.request<D.WorkflowStateUpdateMutation, D.WorkflowStateUpdateMutationVariables>(
      D.WorkflowStateUpdateDocument,
      {
        input,
        id,
      }
    ).then(response => {
      const data = response?.userSettingsFlagsReset;
      return data ? new UserSettingsFlagsResetPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Mutation WorkflowStateArchiveDocument for ArchivePayload
 *
 * @param request - function to call the graphql client
 */
class SyncUpdatesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(id: string): Promise<ArchivePayload | undefined> {
    return this.request<D.WorkflowStateArchiveMutation, D.WorkflowStateArchiveMutationVariables>(
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
 * Query User_AssignedIssuesDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class TeamQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.User_AssignedIssuesQueryVariables, "id">): Promise<IssueConnection | undefined> {
    return this.request<D.User_AssignedIssuesQuery, D.User_AssignedIssuesQueryVariables>(
      D.User_AssignedIssuesDocument,
      {
        id: this._id,
        ...variables,
      }
    ).then(response => {
      const data = response?.userSubscribeToNewsletter;
      return data ? new UserSubscribeToNewsletterPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query User_CreatedIssuesDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class TeamArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.User_CreatedIssuesQueryVariables, "id">): Promise<IssueConnection | undefined> {
    return this.request<D.User_CreatedIssuesQuery, D.User_CreatedIssuesQueryVariables>(D.User_CreatedIssuesDocument, {
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
 * Query User_TeamMembershipsDocument for TeamMembershipConnection
 *
 * @param request - function to call the graphql client
 */
class TeamCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: Omit<D.User_TeamMembershipsQueryVariables, "id">
  ): Promise<TeamMembershipConnection | undefined> {
    return this.request<D.User_TeamMembershipsQuery, D.User_TeamMembershipsQueryVariables>(
      D.User_TeamMembershipsDocument,
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
 * Query Viewer_AssignedIssuesDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class TeamDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.Viewer_AssignedIssuesQueryVariables): Promise<IssueConnection | undefined> {
    return this.request<D.Viewer_AssignedIssuesQuery, D.Viewer_AssignedIssuesQueryVariables>(
      D.Viewer_AssignedIssuesDocument,
      variables
    ).then(response => {
      const data = response?.viewPreferencesDelete;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query Viewer_CreatedIssuesDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class TeamMembershipQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.Viewer_CreatedIssuesQueryVariables): Promise<IssueConnection | undefined> {
    return this.request<D.Viewer_CreatedIssuesQuery, D.Viewer_CreatedIssuesQueryVariables>(
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
 * Query Viewer_TeamMembershipsDocument for TeamMembershipConnection
 *
 * @param request - function to call the graphql client
 */
class TeamMembershipCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.Viewer_TeamMembershipsQueryVariables): Promise<TeamMembershipConnection | undefined> {
    return this.request<D.Viewer_TeamMembershipsQuery, D.Viewer_TeamMembershipsQueryVariables>(
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
 * Query Organization_UsersDocument for UserConnection
 *
 * @param request - function to call the graphql client
 */
class TeamMembershipDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.Organization_UsersQueryVariables): Promise<UserConnection | undefined> {
    return this.request<D.Organization_UsersQuery, D.Organization_UsersQueryVariables>(
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
 * Query Organization_TeamsDocument for TeamConnection
 *
 * @param request - function to call the graphql client
 */
class TeamMembershipsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.Organization_TeamsQueryVariables): Promise<TeamConnection | undefined> {
    return this.request<D.Organization_TeamsQuery, D.Organization_TeamsQueryVariables>(
      D.Organization_TeamsDocument,
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
 * Query Organization_MilestonesDocument for MilestoneConnection
 *
 * @param request - function to call the graphql client
 */
class TeamUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.Organization_MilestonesQueryVariables): Promise<MilestoneConnection | undefined> {
    return this.request<D.Organization_MilestonesQuery, D.Organization_MilestonesQueryVariables>(
      D.Organization_MilestonesDocument,
      variables
    ).then(response => {
      const data = response?.workflowStateUpdate;
      return data ? new WorkflowStatePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query Organization_IntegrationsDocument for IntegrationConnection
 *
 * @param request - function to call the graphql client
 */
class TeamsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.Organization_IntegrationsQueryVariables): Promise<IntegrationConnection | undefined> {
    return this.request<D.Organization_IntegrationsQuery, D.Organization_IntegrationsQueryVariables>(
      D.Organization_IntegrationsDocument,
      variables
    ).then(response => {
      const data = response?.workflowStateArchive;
      return data ? new ArchivePayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query AdminUserAccountLookup_UsersDocument for undefined
 *
 * @param request - function to call the graphql client
 */
class AdminUserAccountLookup_UsersQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: D.AdminUserAccountLookup_UsersQueryVariables): Promise<undefined | undefined> {
    return this.request<D.AdminUserAccountLookup_UsersQuery, D.AdminUserAccountLookup_UsersQueryVariables>(
      D.AdminUserAccountLookup_UsersDocument,
      vars
    ).then(response => {
      const data = response?.adminUserAccountLookup?.users;
      return data ? new undefined(this.request, data) : undefined;
    });
  }
}

/**
 * Query AdminUserAccountLookup_Users_AssignedIssuesDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class AdminUserAccountLookup_Users_AssignedIssuesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: D.AdminUserAccountLookup_Users_AssignedIssuesQueryVariables
  ): Promise<IssueConnection | undefined> {
    return this.request<
      D.AdminUserAccountLookup_Users_AssignedIssuesQuery,
      D.AdminUserAccountLookup_Users_AssignedIssuesQueryVariables
    >(D.AdminUserAccountLookup_Users_AssignedIssuesDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.assignedIssues;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * Query AdminUserAccountLookup_Users_CreatedIssuesDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class AdminUserAccountLookup_Users_CreatedIssuesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: D.AdminUserAccountLookup_Users_CreatedIssuesQueryVariables
  ): Promise<IssueConnection | undefined> {
    return this.request<
      D.AdminUserAccountLookup_Users_CreatedIssuesQuery,
      D.AdminUserAccountLookup_Users_CreatedIssuesQueryVariables
    >(D.AdminUserAccountLookup_Users_CreatedIssuesDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.createdIssues;
      return data ? new IssueConnection(this.request, data) : undefined;
    });
  }
}

/**
 * Query AdminUserAccountLookup_Users_OrganizationDocument for OrganizationAdminPrivileged
 *
 * @param request - function to call the graphql client
 */
class AdminUserAccountLookup_Users_OrganizationQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: D.AdminUserAccountLookup_Users_OrganizationQueryVariables
  ): Promise<OrganizationAdminPrivileged | undefined> {
    return this.request<
      D.AdminUserAccountLookup_Users_OrganizationQuery,
      D.AdminUserAccountLookup_Users_OrganizationQueryVariables
    >(D.AdminUserAccountLookup_Users_OrganizationDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.organization;
      return data ? new OrganizationAdminPrivileged(this.request, data) : undefined;
    });
  }
}

/**
 * Query AdminUserAccountLookup_Users_TeamMembershipsDocument for TeamMembershipConnection
 *
 * @param request - function to call the graphql client
 */
class AdminUserAccountLookup_Users_TeamMembershipsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: D.AdminUserAccountLookup_Users_TeamMembershipsQueryVariables
  ): Promise<TeamMembershipConnection | undefined> {
    return this.request<
      D.AdminUserAccountLookup_Users_TeamMembershipsQuery,
      D.AdminUserAccountLookup_Users_TeamMembershipsQueryVariables
    >(D.AdminUserAccountLookup_Users_TeamMembershipsDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.teamMemberships;
      return data ? new TeamMembershipConnection(this.request, data) : undefined;
    });
  }
}

/**
 * Query AdminUserAccountLookup_Users_Organization_UsersDocument for UserConnection
 *
 * @param request - function to call the graphql client
 */
class AdminUserAccountLookup_Users_Organization_UsersQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: D.AdminUserAccountLookup_Users_Organization_UsersQueryVariables
  ): Promise<UserConnection | undefined> {
    return this.request<
      D.AdminUserAccountLookup_Users_Organization_UsersQuery,
      D.AdminUserAccountLookup_Users_Organization_UsersQueryVariables
    >(D.AdminUserAccountLookup_Users_Organization_UsersDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.organization?.users;
      return data ? new UserConnection(this.request, data) : undefined;
    });
  }
}

/**
 * Query AdminUserAccountLookup_Users_Organization_TeamsDocument for TeamConnection
 *
 * @param request - function to call the graphql client
 */
class AdminUserAccountLookup_Users_Organization_TeamsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: D.AdminUserAccountLookup_Users_Organization_TeamsQueryVariables
  ): Promise<TeamConnection | undefined> {
    return this.request<
      D.AdminUserAccountLookup_Users_Organization_TeamsQuery,
      D.AdminUserAccountLookup_Users_Organization_TeamsQueryVariables
    >(D.AdminUserAccountLookup_Users_Organization_TeamsDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.organization?.teams;
      return data ? new TeamConnection(this.request, data) : undefined;
    });
  }
}

/**
 * Query AdminUserAccountLookup_Users_Organization_MilestonesDocument for MilestoneConnection
 *
 * @param request - function to call the graphql client
 */
class AdminUserAccountLookup_Users_Organization_MilestonesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: D.AdminUserAccountLookup_Users_Organization_MilestonesQueryVariables
  ): Promise<MilestoneConnection | undefined> {
    return this.request<
      D.AdminUserAccountLookup_Users_Organization_MilestonesQuery,
      D.AdminUserAccountLookup_Users_Organization_MilestonesQueryVariables
    >(D.AdminUserAccountLookup_Users_Organization_MilestonesDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.organization?.milestones;
      return data ? new MilestoneConnection(this.request, data) : undefined;
    });
  }
}

/**
 * Query AdminUserAccountLookup_Users_Organization_IntegrationsDocument for IntegrationConnection
 *
 * @param request - function to call the graphql client
 */
class AdminUserAccountLookup_Users_Organization_IntegrationsQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: D.AdminUserAccountLookup_Users_Organization_IntegrationsQueryVariables
  ): Promise<IntegrationConnection | undefined> {
    return this.request<
      D.AdminUserAccountLookup_Users_Organization_IntegrationsQuery,
      D.AdminUserAccountLookup_Users_Organization_IntegrationsQueryVariables
    >(D.AdminUserAccountLookup_Users_Organization_IntegrationsDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.organization?.integrations;
      return data ? new IntegrationConnection(this.request, data) : undefined;
    });
  }
}

/**
 * Query AdminUserAccountLookup_Users_Organization_SubscriptionDocument for SubscriptionAdminPrivileged
 *
 * @param request - function to call the graphql client
 */
class AdminUserAccountLookup_Users_Organization_SubscriptionQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: D.AdminUserAccountLookup_Users_Organization_SubscriptionQueryVariables
  ): Promise<SubscriptionAdminPrivileged | undefined> {
    return this.request<
      D.AdminUserAccountLookup_Users_Organization_SubscriptionQuery,
      D.AdminUserAccountLookup_Users_Organization_SubscriptionQueryVariables
    >(D.AdminUserAccountLookup_Users_Organization_SubscriptionDocument, vars).then(response => {
      const data = response?.adminUserAccountLookup?.users?.organization?.subscription;
      return data ? new SubscriptionAdminPrivileged(this.request, data) : undefined;
    });
  }
}

/**
 * Query BillingDetails_InvoicesDocument for undefined
 *
 * @param request - function to call the graphql client
 */
class BillingDetails_InvoicesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(): Promise<undefined | undefined> {
    return this.request<D.BillingDetails_InvoicesQuery, D.BillingDetails_InvoicesQueryVariables>(
      D.BillingDetails_InvoicesDocument,
      {}
    ).then(response => {
      const data = response?.billingDetails?.invoices;
      return data ? new undefined(this.request, data) : undefined;
    });
  }
}

/**
 * Query BillingDetails_PaymentMethodDocument for Card
 *
 * @param request - function to call the graphql client
 */
class BillingDetails_PaymentMethodQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

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
 * Query CollaborativeDocumentJoin_StepsDocument for StepsResponse
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
 * Query Cycle_IssuesDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class TemplateDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.Cycle_IssuesQueryVariables, "id">): Promise<IssueConnection | undefined> {
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
 * Query Cycle_UncompletedIssuesUponCloseDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class TemplateUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: Omit<D.Cycle_UncompletedIssuesUponCloseQueryVariables, "id">
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
 * Query FigmaEmbedInfo_FigmaEmbedDocument for FigmaEmbed
 *
 * @param request - function to call the graphql client
 */
class TemplatesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: Omit<D.FigmaEmbedInfo_FigmaEmbedQueryVariables, "fileId">
  ): Promise<FigmaEmbed | undefined> {
    return this.request<D.FigmaEmbedInfo_FigmaEmbedQuery, D.FigmaEmbedInfo_FigmaEmbedQueryVariables>(
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
 * Query Integration_SettingsDocument for IntegrationSettings
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integration
 */
class Integration_SettingsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
  }

  public async fetch(): Promise<IntegrationSettings | undefined> {
    return this.request<D.Integration_SettingsQuery, D.Integration_SettingsQueryVariables>(
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
 * Query Integration_Settings_SlackPostDocument for SlackPostSettings
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integration_settings
 */
class Integration_Settings_SlackPostQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
  }

  public async fetch(): Promise<SlackPostSettings | undefined> {
    return this.request<D.Integration_Settings_SlackPostQuery, D.Integration_Settings_SlackPostQueryVariables>(
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
 * Query Integration_Settings_SlackProjectPostDocument for SlackPostSettings
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integration_settings
 */
class Integration_Settings_SlackProjectPostQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
  }

  public async fetch(): Promise<SlackPostSettings | undefined> {
    return this.request<
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
 * Query Integration_Settings_GoogleSheetsDocument for GoogleSheetsSettings
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integration_settings
 */
class Integration_Settings_GoogleSheetsQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
  }

  public async fetch(): Promise<GoogleSheetsSettings | undefined> {
    return this.request<D.Integration_Settings_GoogleSheetsQuery, D.Integration_Settings_GoogleSheetsQueryVariables>(
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
 * Query Integration_Settings_SentryDocument for SentrySettings
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integration_settings
 */
class Integration_Settings_SentryQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
  }

  public async fetch(): Promise<SentrySettings | undefined> {
    return this.request<D.Integration_Settings_SentryQuery, D.Integration_Settings_SentryQueryVariables>(
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
 * Query IntegrationResource_DataDocument for IntegrationResourceData
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to integrationResource
 */
class IntegrationResource_DataQuery extends LinearRequest {
  private _id: string;

  public constructor(request: Request, id: string) {
    super(request);
  }

  public async fetch(): Promise<IntegrationResourceData | undefined> {
    return this.request<D.IntegrationResource_DataQuery, D.IntegrationResource_DataQueryVariables>(
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
 * Query IntegrationResource_PullRequestDocument for PullRequestPayload
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

  public async fetch(): Promise<PullRequestPayload | undefined> {
    return this.request<D.IntegrationResource_PullRequestQuery, D.IntegrationResource_PullRequestQueryVariables>(
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
 * Query IntegrationResource_Data_GithubPullRequestDocument for PullRequestPayload
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

  public async fetch(): Promise<PullRequestPayload | undefined> {
    return this.request<
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
 * Query IntegrationResource_Data_GitlabMergeRequestDocument for PullRequestPayload
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

  public async fetch(): Promise<PullRequestPayload | undefined> {
    return this.request<
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
 * Query IntegrationResource_Data_GithubCommitDocument for CommitPayload
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

  public async fetch(): Promise<CommitPayload | undefined> {
    return this.request<
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
 * Query IntegrationResource_Data_SentryIssueDocument for SentryIssuePayload
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

  public async fetch(): Promise<SentryIssuePayload | undefined> {
    return this.request<
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
 * Query InviteInfo_InviteDataDocument for InviteData
 *
 * @param request - function to call the graphql client
 * @param userHash - required userHash to pass to inviteInfo
 */
class InviteInfo_InviteDataQuery extends LinearRequest {
  private _userHash: string;

  public constructor(request: Request, userHash: string) {
    super(request);
  }

  public async fetch(vars?: Omit<D.InviteInfo_InviteDataQueryVariables, "userHash">): Promise<InviteData | undefined> {
    return this.request<D.InviteInfo_InviteDataQuery, D.InviteInfo_InviteDataQueryVariables>(
      D.InviteInfo_InviteDataDocument,
      {
        userHash: this._userHash,
        ...variables,
      }
    ).then(response => {
      const data = response?.userSettingsFlagsReset;
      return data ? new UserSettingsFlagsResetPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query IssueLabel_IssuesDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class UserSettingsUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.IssueLabel_IssuesQueryVariables, "id">): Promise<IssueConnection | undefined> {
    return this.request<D.IssueLabel_IssuesQuery, D.IssueLabel_IssuesQueryVariables>(D.IssueLabel_IssuesDocument, {
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
 * Query Issue_SubscribersDocument for UserConnection
 *
 * @param request - function to call the graphql client
 */
class UserSubscribeToNewsletterMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.Issue_SubscribersQueryVariables, "id">): Promise<UserConnection | undefined> {
    return this.request<D.Issue_SubscribersQuery, D.Issue_SubscribersQueryVariables>(D.Issue_SubscribersDocument, {
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
 * Query Issue_ChildrenDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class UserSuspendMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.Issue_ChildrenQueryVariables, "id">): Promise<IssueConnection | undefined> {
    return this.request<D.Issue_ChildrenQuery, D.Issue_ChildrenQueryVariables>(D.Issue_ChildrenDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.userSuspend;
      return data ? new UserAdminPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query Issue_CommentsDocument for CommentConnection
 *
 * @param request - function to call the graphql client
 */
class UserUnsuspendMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.Issue_CommentsQueryVariables, "id">): Promise<CommentConnection | undefined> {
    return this.request<D.Issue_CommentsQuery, D.Issue_CommentsQueryVariables>(D.Issue_CommentsDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.userUnsuspend;
      return data ? new UserAdminPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query Issue_HistoryDocument for IssueHistoryConnection
 *
 * @param request - function to call the graphql client
 */
class UserUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.Issue_HistoryQueryVariables, "id">): Promise<IssueHistoryConnection | undefined> {
    return this.request<D.Issue_HistoryQuery, D.Issue_HistoryQueryVariables>(D.Issue_HistoryDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.userUpdate;
      return data ? new UserPayload(this._request, data) : undefined;
    });
  }
}

/**
 * Query Issue_LabelsDocument for IssueLabelConnection
 *
 * @param request - function to call the graphql client
 */
class UsersQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.Issue_LabelsQueryVariables, "id">): Promise<IssueLabelConnection | undefined> {
    return this.request<D.Issue_LabelsQuery, D.Issue_LabelsQueryVariables>(D.Issue_LabelsDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.issue?.labels;
      return data
        ? new UserConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * Query Issue_IntegrationResourcesDocument for IntegrationResourceConnection
 *
 * @param request - function to call the graphql client
 */
class ViewPreferencesCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    variables?: Omit<D.Issue_IntegrationResourcesQueryVariables, "id">
  ): Fetch<IntegrationResourceConnection> {
    return this._request<D.Issue_IntegrationResourcesQuery, D.Issue_IntegrationResourcesQueryVariables>(
      D.Issue_IntegrationResourcesDocument,
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
 * Query Issue_RelationsDocument for IssueRelationConnection
 *
 * @param request - function to call the graphql client
 */
class ViewPreferencesDeleteMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.Issue_RelationsQueryVariables, "id">): Promise<IssueRelationConnection | undefined> {
    return this.request<D.Issue_RelationsQuery, D.Issue_RelationsQueryVariables>(D.Issue_RelationsDocument, {
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
 * Query Issue_InverseRelationsDocument for IssueRelationConnection
 *
 * @param request - function to call the graphql client
 */
class ViewPreferencesUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: Omit<D.Issue_InverseRelationsQueryVariables, "id">
  ): Promise<IssueRelationConnection | undefined> {
    return this.request<D.Issue_InverseRelationsQuery, D.Issue_InverseRelationsQueryVariables>(
      D.Issue_InverseRelationsDocument,
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
 * Query Milestone_ProjectsDocument for ProjectConnection
 *
 * @param request - function to call the graphql client
 */
class ViewerQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.Milestone_ProjectsQueryVariables, "id">): Promise<ProjectConnection | undefined> {
    return this.request<D.Milestone_ProjectsQuery, D.Milestone_ProjectsQueryVariables>(D.Milestone_ProjectsDocument, {
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
 * Query OrganizationInvite_IssuesDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class WebhookQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(
    vars?: Omit<D.OrganizationInvite_IssuesQueryVariables, "id">
  ): Promise<IssueConnection | undefined> {
    return this.request<D.OrganizationInvite_IssuesQuery, D.OrganizationInvite_IssuesQueryVariables>(
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
 * Query Project_TeamsDocument for TeamConnection
 *
 * @param request - function to call the graphql client
 */
class WorkflowStateQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.Project_TeamsQueryVariables, "id">): Promise<TeamConnection | undefined> {
    return this.request<D.Project_TeamsQuery, D.Project_TeamsQueryVariables>(D.Project_TeamsDocument, {
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
 * Query Project_MembersDocument for UserConnection
 *
 * @param request - function to call the graphql client
 */
class WorkflowStateCreateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.Project_MembersQueryVariables, "id">): Promise<UserConnection | undefined> {
    return this.request<D.Project_MembersQuery, D.Project_MembersQueryVariables>(D.Project_MembersDocument, {
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
 * Query Project_IssuesDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class WorkflowStateUpdateMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.Project_IssuesQueryVariables, "id">): Promise<IssueConnection | undefined> {
    return this.request<D.Project_IssuesQuery, D.Project_IssuesQueryVariables>(D.Project_IssuesDocument, {
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
 * Query Project_LinksDocument for ProjectLinkConnection
 *
 * @param request - function to call the graphql client
 */
class WorkflowStatesQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.Project_LinksQueryVariables, "id">): Promise<ProjectLinkConnection | undefined> {
    return this.request<D.Project_LinksQuery, D.Project_LinksQueryVariables>(D.Project_LinksDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.project?.links;
      return data
        ? new WorkflowStateConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * Query Team_IssuesDocument for IssueConnection
 *
 * @param request - function to call the graphql client
 */
class WorkflowStateArchiveMutation extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.Team_IssuesQueryVariables, "id">): Promise<IssueConnection | undefined> {
    return this.request<D.Team_IssuesQuery, D.Team_IssuesQueryVariables>(D.Team_IssuesDocument, {
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
 * Query Team_CyclesDocument for CycleConnection
 *
 * @param request - function to call the graphql client
 */
class BillingDetails_PaymentMethodQuery extends LinearRequest {
  public constructor(request: Request) {
    super(request);
  }

  public async fetch(vars?: Omit<D.Team_CyclesQueryVariables, "id">): Promise<CycleConnection | undefined> {
    return this.request<D.Team_CyclesQuery, D.Team_CyclesQueryVariables>(D.Team_CyclesDocument, {
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
 * Query Team_MembershipsDocument for TeamMembershipConnection
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

  public async fetch(
    vars?: Omit<D.Team_MembershipsQueryVariables, "id">
  ): Promise<TeamMembershipConnection | undefined> {
    return this.request<D.Team_MembershipsQuery, D.Team_MembershipsQueryVariables>(D.Team_MembershipsDocument, {
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
 * Query Team_ProjectsDocument for ProjectConnection
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

  public async fetch(vars?: Omit<D.Team_ProjectsQueryVariables, "id">): Promise<ProjectConnection | undefined> {
    return this.request<D.Team_ProjectsQuery, D.Team_ProjectsQueryVariables>(D.Team_ProjectsDocument, {
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
 * Query Team_StatesDocument for WorkflowStateConnection
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

  public async fetch(vars?: Omit<D.Team_StatesQueryVariables, "id">): Promise<WorkflowStateConnection | undefined> {
    return this.request<D.Team_StatesQuery, D.Team_StatesQueryVariables>(D.Team_StatesDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.team?.states;
      return data
        ? new IssueConnection(this._request, pagination => this.fetch({ ...variables, ...pagination }), data)
        : undefined;
    });
  }
}

/**
 * Query Team_TemplatesDocument for TemplateConnection
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

  public async fetch(vars?: Omit<D.Team_TemplatesQueryVariables, "id">): Promise<TemplateConnection | undefined> {
    return this.request<D.Team_TemplatesQuery, D.Team_TemplatesQueryVariables>(D.Team_TemplatesDocument, {
      id: this._id,
      ...variables,
    }).then(response => {
      const data = response?.team?.templates;
      return data ? new TemplateConnection(this._request, data) : undefined;
    });
  }
}

/**
 * Query Team_LabelsDocument for IssueLabelConnection
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

  public async fetch(vars?: Omit<D.Team_LabelsQueryVariables, "id">): Promise<IssueLabelConnection | undefined> {
    return this.request<D.Team_LabelsQuery, D.Team_LabelsQueryVariables>(D.Team_LabelsDocument, {
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
 * Query Team_WebhooksDocument for WebhookConnection
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

  public async fetch(vars?: Omit<D.Team_WebhooksQueryVariables, "id">): Promise<WebhookConnection | undefined> {
    return this.request<D.Team_WebhooksQuery, D.Team_WebhooksQueryVariables>(D.Team_WebhooksDocument, {
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
 * Query WorkflowState_IssuesDocument for IssueConnection
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

  public async fetch(vars?: Omit<D.WorkflowState_IssuesQueryVariables, "id">): Promise<IssueConnection | undefined> {
    return this.request<D.WorkflowState_IssuesQuery, D.WorkflowState_IssuesQueryVariables>(
      D.WorkflowState_IssuesDocument,
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
