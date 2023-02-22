import { DocumentNode } from "graphql/language/ast";
import * as L from "./_generated_documents";

/** The function for calling the graphql client */
export type LinearRequest = <Response, Variables extends Record<string, unknown>>(
  doc: DocumentNode,
  variables?: Variables
) => Promise<Response>;

/**
 * Base class to provide a request function
 *
 * @param request - function to call the graphql client
 */
export class Request {
  protected _request: LinearRequest;

  public constructor(request: LinearRequest) {
    this._request = request;
  }
}

/** Fetch return type wrapped in a promise */
export type LinearFetch<Response> = Promise<Response>;

/**
 * Variables required for pagination
 * Follows the Relay spec
 */
export type LinearConnectionVariables = {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
};

/**
 * Default connection variables required for pagination
 * Defaults to 50 as per the Linear API
 */
function defaultConnection<Variables extends LinearConnectionVariables>(variables: Variables): Variables {
  return {
    ...variables,
    first: variables.first ?? (variables.after ? 50 : undefined),
    last: variables.last ?? (variables.before ? 50 : undefined),
  };
}

/**
 * Connection models containing a list of nodes and pagination information
 * Follows the Relay spec
 */
export class LinearConnection<Node> extends Request {
  public pageInfo: PageInfo;
  public nodes: Node[];

  public constructor(request: LinearRequest) {
    super(request);
    this.pageInfo = new PageInfo(request, { hasNextPage: false, hasPreviousPage: false, __typename: "PageInfo" });
    this.nodes = [];
  }
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
export class Connection<Node> extends LinearConnection<Node> {
  private _fetch: (variables?: LinearConnectionVariables) => LinearFetch<LinearConnection<Node> | undefined>;

  public constructor(
    request: LinearRequest,
    fetch: (variables?: LinearConnectionVariables) => LinearFetch<LinearConnection<Node> | undefined>,
    nodes: Node[],
    pageInfo: PageInfo
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
  public async fetchNext(): Promise<this> {
    if (this.pageInfo?.hasNextPage) {
      const response = await this._fetch({
        after: this.pageInfo?.endCursor,
      });
      this._appendNodes(response?.nodes);
      this._appendPageInfo(response?.pageInfo);
    }
    return Promise.resolve(this);
  }

  /** Fetch the previous page of results and prepend to nodes */
  public async fetchPrevious(): Promise<this> {
    if (this.pageInfo?.hasPreviousPage) {
      const response = await this._fetch({
        before: this.pageInfo?.startCursor,
      });
      this._prependNodes(response?.nodes);
      this._prependPageInfo(response?.pageInfo);
    }
    return Promise.resolve(this);
  }
}

/**
 * Function to parse custom scalars into Date types
 *
 * @param value - value to parse
 */
function parseDate(value?: any): Date | undefined {
  try {
    return value ? new Date(value) : undefined;
  } catch (e) {
    return undefined;
  }
}

/**
 * Function to parse custom scalars into JSON objects
 *
 * @param value - value to parse
 */
function parseJson(value?: any): Record<string, unknown> | undefined {
  try {
    return value ? JSON.parse(value) : undefined;
  } catch (e) {
    return undefined;
  }
}

/**
 * AdminJobConfigurationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.AdminJobConfigurationPayloadFragment response data
 */
export class AdminJobConfigurationPayload extends Request {
  public constructor(request: LinearRequest, data: L.AdminJobConfigurationPayloadFragment) {
    super(request);
    this.currentJob = data.currentJob ?? undefined;
    this.delay = data.delay;
    this.enabled = data.enabled;
    this.param = data.param ?? undefined;
  }

  public currentJob?: string;
  public delay: number;
  public enabled: boolean;
  public param?: string;
}
/**
 * AdminJobStatusPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.AdminJobStatusPayloadFragment response data
 */
export class AdminJobStatusPayload extends Request {
  public constructor(request: LinearRequest, data: L.AdminJobStatusPayloadFragment) {
    super(request);
    this.availableJobs = data.availableJobs;
    this.cursor = data.cursor ?? undefined;
    this.startedAt = parseDate(data.startedAt) ?? undefined;
    this.configuration = new AdminJobConfigurationPayload(request, data.configuration);
  }

  public availableJobs: string[];
  public cursor?: string;
  public startedAt?: Date;
  public configuration: AdminJobConfigurationPayload;
}
/**
 * An API key. Grants access to the user's resources.
 *
 * @param request - function to call the graphql client
 * @param data - L.ApiKeyFragment response data
 */
export class ApiKey extends Request {
  public constructor(request: LinearRequest, data: L.ApiKeyFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.label = data.label;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The label of the API key. */
  public label: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;

  /** Creates a new API key. */
  public create(input: L.ApiKeyCreateInput) {
    return new CreateApiKeyMutation(this._request).fetch(input);
  }
  /** Deletes an API key. */
  public delete() {
    return new DeleteApiKeyMutation(this._request).fetch(this.id);
  }
}
/**
 * ApiKeyConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this ApiKeyConnection model
 * @param data - ApiKeyConnection response data
 */
export class ApiKeyConnection extends Connection<ApiKey> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<ApiKey> | undefined>,
    data: L.ApiKeyConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new ApiKey(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * ApiKeyPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.ApiKeyPayloadFragment response data
 */
export class ApiKeyPayload extends Request {
  public constructor(request: LinearRequest, data: L.ApiKeyPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this.apiKey = new ApiKey(request, data.apiKey);
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The API key that was created. */
  public apiKey: ApiKey;
}
/**
 * Public information of the OAuth application.
 *
 * @param request - function to call the graphql client
 * @param data - L.ApplicationFragment response data
 */
export class Application extends Request {
  public constructor(request: LinearRequest, data: L.ApplicationFragment) {
    super(request);
    this.clientId = data.clientId;
    this.description = data.description ?? undefined;
    this.developer = data.developer;
    this.developerUrl = data.developerUrl;
    this.id = data.id;
    this.imageUrl = data.imageUrl ?? undefined;
    this.name = data.name;
  }

  /** OAuth application's client ID. */
  public clientId: string;
  /** Information about the application. */
  public description?: string;
  /** Name of the developer. */
  public developer: string;
  /** Url of the developer (homepage or docs). */
  public developerUrl: string;
  /** OAuth application's ID. */
  public id: string;
  /** Image of the application. */
  public imageUrl?: string;
  /** Application name. */
  public name: string;
}
/**
 * ArchivePayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.ArchivePayloadFragment response data
 */
export class ArchivePayload extends Request {
  public constructor(request: LinearRequest, data: L.ArchivePayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * Issue attachment (e.g. support ticket, pull request).
 *
 * @param request - function to call the graphql client
 * @param data - L.AttachmentFragment response data
 */
export class Attachment extends Request {
  private _creator?: L.AttachmentFragment["creator"];
  private _issue: L.AttachmentFragment["issue"];

  public constructor(request: LinearRequest, data: L.AttachmentFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.groupBySource = data.groupBySource;
    this.id = data.id;
    this.metadata = parseJson(data.metadata) ?? {};
    this.source = parseJson(data.source) ?? undefined;
    this.sourceType = parseJson(data.sourceType) ?? undefined;
    this.subtitle = data.subtitle ?? undefined;
    this.title = data.title;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.url = data.url;
    this._creator = data.creator ?? undefined;
    this._issue = data.issue;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** Indicates if attachments for the same source application should be grouped in the Linear UI. */
  public groupBySource: boolean;
  /** The unique identifier of the entity. */
  public id: string;
  /** Custom metadata related to the attachment. */
  public metadata: Record<string, unknown>;
  /** Information about the source which created the attachment. */
  public source?: Record<string, unknown>;
  /** An accessor helper to source.type, defines the source type of the attachment. */
  public sourceType?: Record<string, unknown>;
  /** Content for the subtitle line in the Linear attachment widget. */
  public subtitle?: string;
  /** Content for the title line in the Linear attachment widget. */
  public title: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** Location of the attachment which is also used as an identifier. */
  public url: string;
  /** The creator of the attachment. */
  public get creator(): LinearFetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The issue this attachment belongs to. */
  public get issue(): LinearFetch<Issue> | undefined {
    return new IssueQuery(this._request).fetch(this._issue.id);
  }

  /** [DEPRECATED] Archives an issue attachment. */
  public archive() {
    return new ArchiveAttachmentMutation(this._request).fetch(this.id);
  }
  /** Creates a new attachment, or updates existing if the same `url` and `issueId` is used. */
  public create(input: L.AttachmentCreateInput) {
    return new CreateAttachmentMutation(this._request).fetch(input);
  }
  /** Deletes an issue attachment. */
  public delete() {
    return new DeleteAttachmentMutation(this._request).fetch(this.id);
  }
  /** Updates an existing issue attachment. */
  public update(input: L.AttachmentUpdateInput) {
    return new UpdateAttachmentMutation(this._request).fetch(this.id, input);
  }
}
/**
 * AttachmentConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this AttachmentConnection model
 * @param data - AttachmentConnection response data
 */
export class AttachmentConnection extends Connection<Attachment> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<Attachment> | undefined>,
    data: L.AttachmentConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new Attachment(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * AttachmentPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.AttachmentPayloadFragment response data
 */
export class AttachmentPayload extends Request {
  private _attachment: L.AttachmentPayloadFragment["attachment"];

  public constructor(request: LinearRequest, data: L.AttachmentPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._attachment = data.attachment;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The issue attachment that was created. */
  public get attachment(): LinearFetch<Attachment> | undefined {
    return new AttachmentQuery(this._request).fetch(this._attachment.id);
  }
}
/**
 * Workspace audit log entry object.
 *
 * @param request - function to call the graphql client
 * @param data - L.AuditEntryFragment response data
 */
export class AuditEntry extends Request {
  private _actor?: L.AuditEntryFragment["actor"];

  public constructor(request: LinearRequest, data: L.AuditEntryFragment) {
    super(request);
    this.actorId = data.actorId ?? undefined;
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.countryCode = data.countryCode ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.ip = data.ip ?? undefined;
    this.metadata = parseJson(data.metadata) ?? undefined;
    this.requestInformation = parseJson(data.requestInformation) ?? undefined;
    this.type = data.type;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._actor = data.actor ?? undefined;
  }

  /** The ID of the user that caused the audit entry to be created. */
  public actorId?: string;
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** Country code of request resulting to audit entry. */
  public countryCode?: string;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** IP from actor when entry was recorded. */
  public ip?: string;
  /** Additional metadata related to the audit entry. */
  public metadata?: Record<string, unknown>;
  /** Additional information related to the request which performed the action. */
  public requestInformation?: Record<string, unknown>;
  public type: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user that caused the audit entry to be created. */
  public get actor(): LinearFetch<User> | undefined {
    return this._actor?.id ? new UserQuery(this._request).fetch(this._actor?.id) : undefined;
  }
  /** The organization the audit log belongs to. */
  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
}
/**
 * AuditEntryConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this AuditEntryConnection model
 * @param data - AuditEntryConnection response data
 */
export class AuditEntryConnection extends Connection<AuditEntry> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<AuditEntry> | undefined>,
    data: L.AuditEntryConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new AuditEntry(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * AuditEntryType model
 *
 * @param request - function to call the graphql client
 * @param data - L.AuditEntryTypeFragment response data
 */
export class AuditEntryType extends Request {
  public constructor(request: LinearRequest, data: L.AuditEntryTypeFragment) {
    super(request);
    this.description = data.description;
    this.type = data.type;
  }

  /** Description of the audit entry type. */
  public description: string;
  /** The audit entry type. */
  public type: string;
}
/**
 * AuthResolverResponse model
 *
 * @param request - function to call the graphql client
 * @param data - L.AuthResolverResponseFragment response data
 */
export class AuthResolverResponse extends Request {
  public constructor(request: LinearRequest, data: L.AuthResolverResponseFragment) {
    super(request);
    this.allowDomainAccess = data.allowDomainAccess ?? undefined;
    this.email = data.email ?? undefined;
    this.id = data.id;
    this.lastUsedOrganizationId = data.lastUsedOrganizationId ?? undefined;
    this.token = data.token ?? undefined;
    this.availableOrganizations = data.availableOrganizations
      ? data.availableOrganizations.map(node => new Organization(request, node))
      : undefined;
    this.users = data.users.map(node => new User(request, node));
  }

  /** Should the signup flow allow access for the domain. */
  public allowDomainAccess?: boolean;
  /** Email for the authenticated account. */
  public email?: string;
  /** User account ID. */
  public id: string;
  /** ID of the organization last accessed by the user. */
  public lastUsedOrganizationId?: string;
  /** JWT token for authentication of the account. */
  public token?: string;
  /** Organizations this account has access to, but is not yet a member. */
  public availableOrganizations?: Organization[];
  /** Users belonging to this account. */
  public users: User[];
}
/**
 * A comment associated with an issue.
 *
 * @param request - function to call the graphql client
 * @param data - L.CommentFragment response data
 */
export class Comment extends Request {
  private _issue: L.CommentFragment["issue"];
  private _parent?: L.CommentFragment["parent"];
  private _user?: L.CommentFragment["user"];

  public constructor(request: LinearRequest, data: L.CommentFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.body = data.body;
    this.bodyData = data.bodyData;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.editedAt = parseDate(data.editedAt) ?? undefined;
    this.id = data.id;
    this.reactionData = parseJson(data.reactionData) ?? {};
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.url = data.url;
    this._issue = data.issue;
    this._parent = data.parent ?? undefined;
    this._user = data.user ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The comment content in markdown format. */
  public body: string;
  /** The comment content as a Prosemirror document. */
  public bodyData: string;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The time user edited the comment. */
  public editedAt?: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** Emoji reaction summary, grouped by emoji type */
  public reactionData: Record<string, unknown>;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** Comment's URL. */
  public url: string;
  /** The issue that the comment is associated with. */
  public get issue(): LinearFetch<Issue> | undefined {
    return new IssueQuery(this._request).fetch(this._issue.id);
  }
  /** The parent comment under which the current comment is nested. */
  public get parent(): LinearFetch<Comment> | undefined {
    return this._parent?.id ? new CommentQuery(this._request).fetch(this._parent?.id) : undefined;
  }
  /** The user who wrote the comment. */
  public get user(): LinearFetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
  /** The children of the comment. */
  public children(variables?: Omit<L.Comment_ChildrenQueryVariables, "id">) {
    return new Comment_ChildrenQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Creates a new comment. */
  public create(input: L.CommentCreateInput) {
    return new CreateCommentMutation(this._request).fetch(input);
  }
  /** Deletes a comment. */
  public delete() {
    return new DeleteCommentMutation(this._request).fetch(this.id);
  }
  /** Updates a comment. */
  public update(input: L.CommentUpdateInput) {
    return new UpdateCommentMutation(this._request).fetch(this.id, input);
  }
}
/**
 * CommentConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this CommentConnection model
 * @param data - CommentConnection response data
 */
export class CommentConnection extends Connection<Comment> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<Comment> | undefined>,
    data: L.CommentConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new Comment(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * CommentPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.CommentPayloadFragment response data
 */
export class CommentPayload extends Request {
  private _comment: L.CommentPayloadFragment["comment"];

  public constructor(request: LinearRequest, data: L.CommentPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._comment = data.comment;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The comment that was created or updated. */
  public get comment(): LinearFetch<Comment> | undefined {
    return new CommentQuery(this._request).fetch(this._comment.id);
  }
}
/**
 * ContactPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.ContactPayloadFragment response data
 */
export class ContactPayload extends Request {
  public constructor(request: LinearRequest, data: L.ContactPayloadFragment) {
    super(request);
    this.success = data.success;
  }

  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * CreateCsvExportReportPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.CreateCsvExportReportPayloadFragment response data
 */
export class CreateCsvExportReportPayload extends Request {
  public constructor(request: LinearRequest, data: L.CreateCsvExportReportPayloadFragment) {
    super(request);
    this.success = data.success;
  }

  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * CreateOrJoinOrganizationResponse model
 *
 * @param request - function to call the graphql client
 * @param data - L.CreateOrJoinOrganizationResponseFragment response data
 */
export class CreateOrJoinOrganizationResponse extends Request {
  private _user: L.CreateOrJoinOrganizationResponseFragment["user"];

  public constructor(request: LinearRequest, data: L.CreateOrJoinOrganizationResponseFragment) {
    super(request);
    this._user = data.user;
  }

  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }
}
/**
 * A custom view that has been saved by a user.
 *
 * @param request - function to call the graphql client
 * @param data - L.CustomViewFragment response data
 */
export class CustomView extends Request {
  private _creator: L.CustomViewFragment["creator"];
  private _team?: L.CustomViewFragment["team"];

  public constructor(request: LinearRequest, data: L.CustomViewFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.color = data.color ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.description = data.description ?? undefined;
    this.filterData = parseJson(data.filterData) ?? {};
    this.filters = parseJson(data.filters) ?? {};
    this.icon = data.icon ?? undefined;
    this.id = data.id;
    this.name = data.name;
    this.shared = data.shared;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._creator = data.creator;
    this._team = data.team ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The color of the icon of the custom view. */
  public color?: string;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The description of the custom view. */
  public description?: string;
  /** The filter applied to issues in the custom view. */
  public filterData: Record<string, unknown>;
  /** The filters applied to issues in the custom view. */
  public filters: Record<string, unknown>;
  /** The icon of the custom view. */
  public icon?: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** The name of the custom view. */
  public name: string;
  /** Whether the custom view is shared with everyone in the organization. */
  public shared: boolean;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user who created the custom view. */
  public get creator(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._creator.id);
  }
  /** The organization of the custom view. */
  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** The team associated with the custom view. */
  public get team(): LinearFetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }

  /** Creates a new custom view. */
  public create(input: L.CustomViewCreateInput) {
    return new CreateCustomViewMutation(this._request).fetch(input);
  }
  /** Deletes a custom view. */
  public delete() {
    return new DeleteCustomViewMutation(this._request).fetch(this.id);
  }
  /** Updates a custom view. */
  public update(input: L.CustomViewUpdateInput) {
    return new UpdateCustomViewMutation(this._request).fetch(this.id, input);
  }
}
/**
 * CustomViewConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this CustomViewConnection model
 * @param data - CustomViewConnection response data
 */
export class CustomViewConnection extends Connection<CustomView> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<CustomView> | undefined>,
    data: L.CustomViewConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new CustomView(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * CustomViewPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.CustomViewPayloadFragment response data
 */
export class CustomViewPayload extends Request {
  private _customView: L.CustomViewPayloadFragment["customView"];

  public constructor(request: LinearRequest, data: L.CustomViewPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._customView = data.customView;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The custom view that was created or updated. */
  public get customView(): LinearFetch<CustomView> | undefined {
    return new CustomViewQuery(this._request).fetch(this._customView.id);
  }
}
/**
 * A set of issues to be resolved in a specified amount of time.
 *
 * @param request - function to call the graphql client
 * @param data - L.CycleFragment response data
 */
export class Cycle extends Request {
  private _team: L.CycleFragment["team"];

  public constructor(request: LinearRequest, data: L.CycleFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.autoArchivedAt = parseDate(data.autoArchivedAt) ?? undefined;
    this.completedAt = parseDate(data.completedAt) ?? undefined;
    this.completedIssueCountHistory = data.completedIssueCountHistory;
    this.completedScopeHistory = data.completedScopeHistory;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.description = data.description ?? undefined;
    this.endsAt = parseDate(data.endsAt) ?? new Date();
    this.id = data.id;
    this.inProgressScopeHistory = data.inProgressScopeHistory;
    this.issueCountHistory = data.issueCountHistory;
    this.name = data.name ?? undefined;
    this.number = data.number;
    this.progress = data.progress;
    this.scopeHistory = data.scopeHistory;
    this.startsAt = parseDate(data.startsAt) ?? new Date();
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._team = data.team;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the cycle was automatically archived by the auto pruning process. */
  public autoArchivedAt?: Date;
  /** The completion time of the cycle. If null, the cycle hasn't been completed. */
  public completedAt?: Date;
  /** The number of completed issues in the cycle after each day. */
  public completedIssueCountHistory: number[];
  /** The number of completed estimation points after each day. */
  public completedScopeHistory: number[];
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The cycle's description. */
  public description?: string;
  /** The end time of the cycle. */
  public endsAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The number of in progress estimation points after each day. */
  public inProgressScopeHistory: number[];
  /** The total number of issues in the cycle after each day. */
  public issueCountHistory: number[];
  /** The custom name of the cycle. */
  public name?: string;
  /** The number of the cycle. */
  public number: number;
  /** The overall progress of the cycle. This is the (completed estimate points + 0.25 * in progress estimate points) / total estimate points. */
  public progress: number;
  /** The total number of estimation points after each day. */
  public scopeHistory: number[];
  /** The start time of the cycle. */
  public startsAt: Date;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The team that the cycle is associated with. */
  public get team(): LinearFetch<Team> | undefined {
    return new TeamQuery(this._request).fetch(this._team.id);
  }
  /** Issues associated with the cycle. */
  public issues(variables?: Omit<L.Cycle_IssuesQueryVariables, "id">) {
    return new Cycle_IssuesQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Issues that weren't completed when the cycle was closed. */
  public uncompletedIssuesUponClose(variables?: Omit<L.Cycle_UncompletedIssuesUponCloseQueryVariables, "id">) {
    return new Cycle_UncompletedIssuesUponCloseQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Archives a cycle. */
  public archive() {
    return new ArchiveCycleMutation(this._request).fetch(this.id);
  }
  /** Creates a new cycle. */
  public create(input: L.CycleCreateInput) {
    return new CreateCycleMutation(this._request).fetch(input);
  }
  /** Updates a cycle. */
  public update(input: L.CycleUpdateInput) {
    return new UpdateCycleMutation(this._request).fetch(this.id, input);
  }
}
/**
 * CycleConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this CycleConnection model
 * @param data - CycleConnection response data
 */
export class CycleConnection extends Connection<Cycle> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<Cycle> | undefined>,
    data: L.CycleConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new Cycle(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * CyclePayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.CyclePayloadFragment response data
 */
export class CyclePayload extends Request {
  private _cycle?: L.CyclePayloadFragment["cycle"];

  public constructor(request: LinearRequest, data: L.CyclePayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._cycle = data.cycle ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The Cycle that was created or updated. */
  public get cycle(): LinearFetch<Cycle> | undefined {
    return this._cycle?.id ? new CycleQuery(this._request).fetch(this._cycle?.id) : undefined;
  }
}
/**
 * A document for a project.
 *
 * @param request - function to call the graphql client
 * @param data - L.DocumentFragment response data
 */
export class Document extends Request {
  private _creator: L.DocumentFragment["creator"];
  private _project: L.DocumentFragment["project"];
  private _updatedBy: L.DocumentFragment["updatedBy"];

  public constructor(request: LinearRequest, data: L.DocumentFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.color = data.color ?? undefined;
    this.content = data.content ?? undefined;
    this.contentData = parseJson(data.contentData) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.icon = data.icon ?? undefined;
    this.id = data.id;
    this.slugId = data.slugId;
    this.title = data.title;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._creator = data.creator;
    this._project = data.project;
    this._updatedBy = data.updatedBy;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The color of the icon. */
  public color?: string;
  /** The document content in markdown format. */
  public content?: string;
  /** The document content as JSON. */
  public contentData?: Record<string, unknown>;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The icon of the document. */
  public icon?: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** The document's unique URL slug. */
  public slugId: string;
  /** The document title. */
  public title: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user who created the document. */
  public get creator(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._creator.id);
  }
  /** The project that the document is associated with. */
  public get project(): LinearFetch<Project> | undefined {
    return new ProjectQuery(this._request).fetch(this._project.id);
  }
  /** The user who last updated the document. */
  public get updatedBy(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._updatedBy.id);
  }

  /** Creates a new document. */
  public create(input: L.DocumentCreateInput) {
    return new CreateDocumentMutation(this._request).fetch(input);
  }
  /** Deletes a document. */
  public delete() {
    return new DeleteDocumentMutation(this._request).fetch(this.id);
  }
  /** Updates a document. */
  public update(input: L.DocumentUpdateInput) {
    return new UpdateDocumentMutation(this._request).fetch(this.id, input);
  }
}
/**
 * DocumentConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this DocumentConnection model
 * @param data - DocumentConnection response data
 */
export class DocumentConnection extends Connection<Document> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<Document> | undefined>,
    data: L.DocumentConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new Document(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * DocumentPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.DocumentPayloadFragment response data
 */
export class DocumentPayload extends Request {
  private _document: L.DocumentPayloadFragment["document"];

  public constructor(request: LinearRequest, data: L.DocumentPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._document = data.document;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The document that was created or updated. */
  public get document(): LinearFetch<Document> | undefined {
    return new DocumentQuery(this._request).fetch(this._document.id);
  }
}
/**
 * EmailUnsubscribePayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.EmailUnsubscribePayloadFragment response data
 */
export class EmailUnsubscribePayload extends Request {
  public constructor(request: LinearRequest, data: L.EmailUnsubscribePayloadFragment) {
    super(request);
    this.success = data.success;
  }

  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * EmailUserAccountAuthChallengeResponse model
 *
 * @param request - function to call the graphql client
 * @param data - L.EmailUserAccountAuthChallengeResponseFragment response data
 */
export class EmailUserAccountAuthChallengeResponse extends Request {
  public constructor(request: LinearRequest, data: L.EmailUserAccountAuthChallengeResponseFragment) {
    super(request);
    this.authType = data.authType;
    this.success = data.success;
  }

  /** Supported challenge for this user account. Can be either verificationCode or password. */
  public authType: string;
  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * A custom emoji.
 *
 * @param request - function to call the graphql client
 * @param data - L.EmojiFragment response data
 */
export class Emoji extends Request {
  private _creator: L.EmojiFragment["creator"];

  public constructor(request: LinearRequest, data: L.EmojiFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.name = data.name;
    this.source = data.source;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.url = data.url;
    this._creator = data.creator;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The emoji's name. */
  public name: string;
  /** The source of the emoji. */
  public source: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The emoji image URL. */
  public url: string;
  /** The user who created the emoji. */
  public get creator(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._creator.id);
  }
  /** The organization that the emoji belongs to. */
  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }

  /** Creates a custom emoji. */
  public create(input: L.EmojiCreateInput) {
    return new CreateEmojiMutation(this._request).fetch(input);
  }
  /** Deletes an emoji. */
  public delete() {
    return new DeleteEmojiMutation(this._request).fetch(this.id);
  }
}
/**
 * EmojiConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this EmojiConnection model
 * @param data - EmojiConnection response data
 */
export class EmojiConnection extends Connection<Emoji> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<Emoji> | undefined>,
    data: L.EmojiConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new Emoji(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * EmojiPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.EmojiPayloadFragment response data
 */
export class EmojiPayload extends Request {
  private _emoji: L.EmojiPayloadFragment["emoji"];

  public constructor(request: LinearRequest, data: L.EmojiPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._emoji = data.emoji;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The emoji that was created. */
  public get emoji(): LinearFetch<Emoji> | undefined {
    return new EmojiQuery(this._request).fetch(this._emoji.id);
  }
}
/**
 * A basic entity.
 *
 * @param request - function to call the graphql client
 * @param data - L.EntityFragment response data
 */
export class Entity extends Request {
  public constructor(request: LinearRequest, data: L.EntityFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
}
/**
 * EventPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.EventPayloadFragment response data
 */
export class EventPayload extends Request {
  public constructor(request: LinearRequest, data: L.EventPayloadFragment) {
    super(request);
    this.success = data.success;
  }

  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * User favorites presented in the sidebar.
 *
 * @param request - function to call the graphql client
 * @param data - L.FavoriteFragment response data
 */
export class Favorite extends Request {
  private _customView?: L.FavoriteFragment["customView"];
  private _cycle?: L.FavoriteFragment["cycle"];
  private _document?: L.FavoriteFragment["document"];
  private _issue?: L.FavoriteFragment["issue"];
  private _label?: L.FavoriteFragment["label"];
  private _parent?: L.FavoriteFragment["parent"];
  private _predefinedViewTeam?: L.FavoriteFragment["predefinedViewTeam"];
  private _project?: L.FavoriteFragment["project"];
  private _projectTeam?: L.FavoriteFragment["projectTeam"];
  private _roadmap?: L.FavoriteFragment["roadmap"];
  private _user: L.FavoriteFragment["user"];

  public constructor(request: LinearRequest, data: L.FavoriteFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.folderName = data.folderName ?? undefined;
    this.id = data.id;
    this.predefinedViewType = data.predefinedViewType ?? undefined;
    this.sortOrder = data.sortOrder;
    this.type = data.type;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._customView = data.customView ?? undefined;
    this._cycle = data.cycle ?? undefined;
    this._document = data.document ?? undefined;
    this._issue = data.issue ?? undefined;
    this._label = data.label ?? undefined;
    this._parent = data.parent ?? undefined;
    this._predefinedViewTeam = data.predefinedViewTeam ?? undefined;
    this._project = data.project ?? undefined;
    this._projectTeam = data.projectTeam ?? undefined;
    this._roadmap = data.roadmap ?? undefined;
    this._user = data.user;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The name of the folder. Only applies to favorites of type folder. */
  public folderName?: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** The type of favorited predefiend view. */
  public predefinedViewType?: string;
  /** The order of the item in the favorites list. */
  public sortOrder: number;
  /** The type of the favorite. */
  public type: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The favorited custom view. */
  public get customView(): LinearFetch<CustomView> | undefined {
    return this._customView?.id ? new CustomViewQuery(this._request).fetch(this._customView?.id) : undefined;
  }
  /** The favorited cycle. */
  public get cycle(): LinearFetch<Cycle> | undefined {
    return this._cycle?.id ? new CycleQuery(this._request).fetch(this._cycle?.id) : undefined;
  }
  /** The favorited document. */
  public get document(): LinearFetch<Document> | undefined {
    return this._document?.id ? new DocumentQuery(this._request).fetch(this._document?.id) : undefined;
  }
  /** The favorited issue. */
  public get issue(): LinearFetch<Issue> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
  /** The favorited label. */
  public get label(): LinearFetch<IssueLabel> | undefined {
    return this._label?.id ? new IssueLabelQuery(this._request).fetch(this._label?.id) : undefined;
  }
  /** The parent folder of the favorite. */
  public get parent(): LinearFetch<Favorite> | undefined {
    return this._parent?.id ? new FavoriteQuery(this._request).fetch(this._parent?.id) : undefined;
  }
  /** The team of the favorited predefiend view. */
  public get predefinedViewTeam(): LinearFetch<Team> | undefined {
    return this._predefinedViewTeam?.id ? new TeamQuery(this._request).fetch(this._predefinedViewTeam?.id) : undefined;
  }
  /** The favorited project. */
  public get project(): LinearFetch<Project> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
  /** The favorited team of the project. */
  public get projectTeam(): LinearFetch<Team> | undefined {
    return this._projectTeam?.id ? new TeamQuery(this._request).fetch(this._projectTeam?.id) : undefined;
  }
  /** The favorited roadmap. */
  public get roadmap(): LinearFetch<Roadmap> | undefined {
    return this._roadmap?.id ? new RoadmapQuery(this._request).fetch(this._roadmap?.id) : undefined;
  }
  /** The owner of the favorite. */
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }
  /** Children of the favorite. Only applies to favorites of type folder. */
  public children(variables?: Omit<L.Favorite_ChildrenQueryVariables, "id">) {
    return new Favorite_ChildrenQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Creates a new favorite (project, cycle etc). */
  public create(input: L.FavoriteCreateInput) {
    return new CreateFavoriteMutation(this._request).fetch(input);
  }
  /** Deletes a favorite reference. */
  public delete() {
    return new DeleteFavoriteMutation(this._request).fetch(this.id);
  }
  /** Updates a favorite. */
  public update(input: L.FavoriteUpdateInput) {
    return new UpdateFavoriteMutation(this._request).fetch(this.id, input);
  }
}
/**
 * FavoriteConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this FavoriteConnection model
 * @param data - FavoriteConnection response data
 */
export class FavoriteConnection extends Connection<Favorite> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<Favorite> | undefined>,
    data: L.FavoriteConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new Favorite(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * FavoritePayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.FavoritePayloadFragment response data
 */
export class FavoritePayload extends Request {
  private _favorite: L.FavoritePayloadFragment["favorite"];

  public constructor(request: LinearRequest, data: L.FavoritePayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._favorite = data.favorite;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The object that was added as a favorite. */
  public get favorite(): LinearFetch<Favorite> | undefined {
    return new FavoriteQuery(this._request).fetch(this._favorite.id);
  }
}
/**
 * Object representing Figma preview information.
 *
 * @param request - function to call the graphql client
 * @param data - L.FigmaEmbedFragment response data
 */
export class FigmaEmbed extends Request {
  public constructor(request: LinearRequest, data: L.FigmaEmbedFragment) {
    super(request);
    this.lastModified = parseDate(data.lastModified) ?? new Date();
    this.name = data.name;
    this.nodeName = data.nodeName ?? undefined;
    this.url = data.url ?? undefined;
  }

  /** Date when the file was updated at the time of embedding. */
  public lastModified: Date;
  /** Figma file name. */
  public name: string;
  /** Node name. */
  public nodeName?: string;
  /** Figma screenshot URL. */
  public url?: string;
}
/**
 * FigmaEmbedPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.FigmaEmbedPayloadFragment response data
 */
export class FigmaEmbedPayload extends Request {
  public constructor(request: LinearRequest, data: L.FigmaEmbedPayloadFragment) {
    super(request);
    this.success = data.success;
    this.figmaEmbed = data.figmaEmbed ? new FigmaEmbed(request, data.figmaEmbed) : undefined;
  }

  /** Whether the operation was successful. */
  public success: boolean;
  /** Figma embed information. */
  public figmaEmbed?: FigmaEmbed;
}
/**
 * FrontAttachmentPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.FrontAttachmentPayloadFragment response data
 */
export class FrontAttachmentPayload extends Request {
  public constructor(request: LinearRequest, data: L.FrontAttachmentPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * Front specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - L.FrontSettingsFragment response data
 */
export class FrontSettings extends Request {
  public constructor(request: LinearRequest, data: L.FrontSettingsFragment) {
    super(request);
    this.automateTicketReopeningOnCancellation = data.automateTicketReopeningOnCancellation ?? undefined;
    this.automateTicketReopeningOnComment = data.automateTicketReopeningOnComment ?? undefined;
    this.automateTicketReopeningOnCompletion = data.automateTicketReopeningOnCompletion ?? undefined;
    this.sendNoteOnComment = data.sendNoteOnComment ?? undefined;
    this.sendNoteOnStatusChange = data.sendNoteOnStatusChange ?? undefined;
  }

  /** Whether a ticket should be automatically reopened when its linked Linear issue is cancelled. */
  public automateTicketReopeningOnCancellation?: boolean;
  /** Whether a ticket should be automatically reopened when a comment is posted on its linked Linear issue */
  public automateTicketReopeningOnComment?: boolean;
  /** Whether a ticket should be automatically reopened when its linked Linear issue is completed. */
  public automateTicketReopeningOnCompletion?: boolean;
  /** Whether an internal message should be added when someone comments on an issue. */
  public sendNoteOnComment?: boolean;
  /** Whether an internal message should be added when a Linear issue changes status (for status types except completed or canceled). */
  public sendNoteOnStatusChange?: boolean;
}
/**
 * GitHubCommitIntegrationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.GitHubCommitIntegrationPayloadFragment response data
 */
export class GitHubCommitIntegrationPayload extends Request {
  private _integration?: L.GitHubCommitIntegrationPayloadFragment["integration"];

  public constructor(request: LinearRequest, data: L.GitHubCommitIntegrationPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this.webhookSecret = data.webhookSecret;
    this._integration = data.integration ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The webhook secret to provide to GitHub. */
  public webhookSecret: string;
  /** The integration that was created or updated. */
  public get integration(): LinearFetch<Integration> | undefined {
    return this._integration?.id ? new IntegrationQuery(this._request).fetch(this._integration?.id) : undefined;
  }
}
/**
 * Metadata and settings for a GitHub integration.
 *
 * @param request - function to call the graphql client
 * @param data - L.GitHubSettingsFragment response data
 */
export class GitHubSettings extends Request {
  public constructor(request: LinearRequest, data: L.GitHubSettingsFragment) {
    super(request);
    this.orgAvatarUrl = data.orgAvatarUrl;
    this.orgLogin = data.orgLogin;
  }

  /** The avatar URL for the GitHub organization */
  public orgAvatarUrl: string;
  /** The GitHub organization's name */
  public orgLogin: string;
}
/**
 * GitHub OAuth token, plus information about the organizations the user is a member of.
 *
 * @param request - function to call the graphql client
 * @param data - L.GithubOAuthTokenPayloadFragment response data
 */
export class GithubOAuthTokenPayload extends Request {
  public constructor(request: LinearRequest, data: L.GithubOAuthTokenPayloadFragment) {
    super(request);
    this.token = data.token ?? undefined;
    this.organizations = data.organizations ? data.organizations.map(node => new GithubOrg(request, node)) : undefined;
  }

  /** The OAuth token if the operation to fetch it was successful. */
  public token?: string;
  /** A list of the GitHub organizations the user is a member of with attached repositories. */
  public organizations?: GithubOrg[];
}
/**
 * Relevant information for the GitHub organization.
 *
 * @param request - function to call the graphql client
 * @param data - L.GithubOrgFragment response data
 */
export class GithubOrg extends Request {
  public constructor(request: LinearRequest, data: L.GithubOrgFragment) {
    super(request);
    this.id = data.id;
    this.isPersonal = data.isPersonal ?? undefined;
    this.login = data.login;
    this.name = data.name;
    this.repositories = data.repositories.map(node => new GithubRepo(request, node));
  }

  /** GitHub organization id. */
  public id: string;
  /** Whether or not this org is the user's personal repositories. */
  public isPersonal?: boolean;
  /** The login for the GitHub organization. */
  public login: string;
  /** The name of the GitHub organization. */
  public name: string;
  /** Repositories that the organization owns. */
  public repositories: GithubRepo[];
}
/**
 * Relevant information for the GitHub repository.
 *
 * @param request - function to call the graphql client
 * @param data - L.GithubRepoFragment response data
 */
export class GithubRepo extends Request {
  public constructor(request: LinearRequest, data: L.GithubRepoFragment) {
    super(request);
    this.id = data.id;
    this.name = data.name;
  }

  /** The id of the GitHub repository. */
  public id: string;
  /** The name of the GitHub repository. */
  public name: string;
}
/**
 * Google Sheets specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - L.GoogleSheetsSettingsFragment response data
 */
export class GoogleSheetsSettings extends Request {
  public constructor(request: LinearRequest, data: L.GoogleSheetsSettingsFragment) {
    super(request);
    this.sheetId = data.sheetId;
    this.spreadsheetId = data.spreadsheetId;
    this.spreadsheetUrl = data.spreadsheetUrl;
    this.updatedIssuesAt = parseDate(data.updatedIssuesAt) ?? new Date();
  }

  public sheetId: number;
  public spreadsheetId: string;
  public spreadsheetUrl: string;
  public updatedIssuesAt: Date;
}
/**
 * ImageUploadFromUrlPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.ImageUploadFromUrlPayloadFragment response data
 */
export class ImageUploadFromUrlPayload extends Request {
  public constructor(request: LinearRequest, data: L.ImageUploadFromUrlPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this.url = data.url ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The URL containing the image. */
  public url?: string;
}
/**
 * An integration with an external service.
 *
 * @param request - function to call the graphql client
 * @param data - L.IntegrationFragment response data
 */
export class Integration extends Request {
  private _creator: L.IntegrationFragment["creator"];
  private _team?: L.IntegrationFragment["team"];

  public constructor(request: LinearRequest, data: L.IntegrationFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.service = data.service;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._creator = data.creator;
    this._team = data.team ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The integration's type. */
  public service: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user that added the integration. */
  public get creator(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._creator.id);
  }
  /** The organization that the integration is associated with. */
  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** The team that the integration is associated with. */
  public get team(): LinearFetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }

  /** Deletes an integration. */
  public delete() {
    return new DeleteIntegrationMutation(this._request).fetch(this.id);
  }
}
/**
 * IntegrationConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this IntegrationConnection model
 * @param data - IntegrationConnection response data
 */
export class IntegrationConnection extends Connection<Integration> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<Integration> | undefined>,
    data: L.IntegrationConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new Integration(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * IntegrationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.IntegrationPayloadFragment response data
 */
export class IntegrationPayload extends Request {
  private _integration?: L.IntegrationPayloadFragment["integration"];

  public constructor(request: LinearRequest, data: L.IntegrationPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._integration = data.integration ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The integration that was created or updated. */
  public get integration(): LinearFetch<Integration> | undefined {
    return this._integration?.id ? new IntegrationQuery(this._request).fetch(this._integration?.id) : undefined;
  }
}
/**
 * IntegrationRequestPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.IntegrationRequestPayloadFragment response data
 */
export class IntegrationRequestPayload extends Request {
  public constructor(request: LinearRequest, data: L.IntegrationRequestPayloadFragment) {
    super(request);
    this.success = data.success;
  }

  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * The integration resource's settings
 *
 * @param request - function to call the graphql client
 * @param data - L.IntegrationSettingsFragment response data
 */
export class IntegrationSettings extends Request {
  public constructor(request: LinearRequest, data: L.IntegrationSettingsFragment) {
    super(request);
    this.front = data.front ? new FrontSettings(request, data.front) : undefined;
    this.gitHub = data.gitHub ? new GitHubSettings(request, data.gitHub) : undefined;
    this.googleSheets = data.googleSheets ? new GoogleSheetsSettings(request, data.googleSheets) : undefined;
    this.intercom = data.intercom ? new IntercomSettings(request, data.intercom) : undefined;
    this.jira = data.jira ? new JiraSettings(request, data.jira) : undefined;
    this.notion = data.notion ? new NotionSettings(request, data.notion) : undefined;
    this.sentry = data.sentry ? new SentrySettings(request, data.sentry) : undefined;
    this.slackOrgProjectUpdatesPost = data.slackOrgProjectUpdatesPost
      ? new SlackPostSettings(request, data.slackOrgProjectUpdatesPost)
      : undefined;
    this.slackPost = data.slackPost ? new SlackPostSettings(request, data.slackPost) : undefined;
    this.slackProjectPost = data.slackProjectPost ? new SlackPostSettings(request, data.slackProjectPost) : undefined;
    this.zendesk = data.zendesk ? new ZendeskSettings(request, data.zendesk) : undefined;
  }

  public front?: FrontSettings;
  public gitHub?: GitHubSettings;
  public googleSheets?: GoogleSheetsSettings;
  public intercom?: IntercomSettings;
  public jira?: JiraSettings;
  public notion?: NotionSettings;
  public sentry?: SentrySettings;
  public slackOrgProjectUpdatesPost?: SlackPostSettings;
  public slackPost?: SlackPostSettings;
  public slackProjectPost?: SlackPostSettings;
  public zendesk?: ZendeskSettings;
}
/**
 * Join table between templates and integrations
 *
 * @param request - function to call the graphql client
 * @param data - L.IntegrationTemplateFragment response data
 */
export class IntegrationTemplate extends Request {
  private _integration: L.IntegrationTemplateFragment["integration"];
  private _template: L.IntegrationTemplateFragment["template"];

  public constructor(request: LinearRequest, data: L.IntegrationTemplateFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._integration = data.integration;
    this._template = data.template;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The integration that the template is associated with. */
  public get integration(): LinearFetch<Integration> | undefined {
    return new IntegrationQuery(this._request).fetch(this._integration.id);
  }
  /** The template that the integration is associated with. */
  public get template(): LinearFetch<Template> | undefined {
    return new TemplateQuery(this._request).fetch(this._template.id);
  }

  /** Creates a new integrationTemplate join. */
  public create(input: L.IntegrationTemplateCreateInput) {
    return new CreateIntegrationTemplateMutation(this._request).fetch(input);
  }
  /** Deletes a integrationTemplate. */
  public delete() {
    return new DeleteIntegrationTemplateMutation(this._request).fetch(this.id);
  }
}
/**
 * IntegrationTemplateConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this IntegrationTemplateConnection model
 * @param data - IntegrationTemplateConnection response data
 */
export class IntegrationTemplateConnection extends Connection<IntegrationTemplate> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<IntegrationTemplate> | undefined>,
    data: L.IntegrationTemplateConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new IntegrationTemplate(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * IntegrationTemplatePayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.IntegrationTemplatePayloadFragment response data
 */
export class IntegrationTemplatePayload extends Request {
  private _integrationTemplate: L.IntegrationTemplatePayloadFragment["integrationTemplate"];

  public constructor(request: LinearRequest, data: L.IntegrationTemplatePayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._integrationTemplate = data.integrationTemplate;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The IntegrationTemplate that was created or updated. */
  public get integrationTemplate(): LinearFetch<IntegrationTemplate> | undefined {
    return new IntegrationTemplateQuery(this._request).fetch(this._integrationTemplate.id);
  }
}
/**
 * The configuration of all integrations for a project or a team.
 *
 * @param request - function to call the graphql client
 * @param data - L.IntegrationsSettingsFragment response data
 */
export class IntegrationsSettings extends Request {
  private _project?: L.IntegrationsSettingsFragment["project"];
  private _team?: L.IntegrationsSettingsFragment["team"];

  public constructor(request: LinearRequest, data: L.IntegrationsSettingsFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.slackIssueAddedToTriage = data.slackIssueAddedToTriage ?? undefined;
    this.slackIssueCreated = data.slackIssueCreated ?? undefined;
    this.slackIssueNewComment = data.slackIssueNewComment ?? undefined;
    this.slackIssueSlaBreached = data.slackIssueSlaBreached ?? undefined;
    this.slackIssueSlaHighRisk = data.slackIssueSlaHighRisk ?? undefined;
    this.slackIssueStatusChangedAll = data.slackIssueStatusChangedAll ?? undefined;
    this.slackIssueStatusChangedDone = data.slackIssueStatusChangedDone ?? undefined;
    this.slackProjectUpdateCreated = data.slackProjectUpdateCreated ?? undefined;
    this.slackProjectUpdateCreatedToTeam = data.slackProjectUpdateCreatedToTeam ?? undefined;
    this.slackProjectUpdateCreatedToWorkspace = data.slackProjectUpdateCreatedToWorkspace ?? undefined;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._project = data.project ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** Whether to send a Slack message when a new issue is added to triage. */
  public slackIssueAddedToTriage?: boolean;
  /** Whether to send a Slack message when a new issue is created for the project or the team. */
  public slackIssueCreated?: boolean;
  /** Whether to send a Slack message when a comment is created on any of the project or team's issues. */
  public slackIssueNewComment?: boolean;
  /** Whether to send a Slack message when an SLA is breached */
  public slackIssueSlaBreached?: boolean;
  /** Whether to send a Slack message when an SLA is at high risk */
  public slackIssueSlaHighRisk?: boolean;
  /** Whether to send a Slack message when any of the project or team's issues has a change in status. */
  public slackIssueStatusChangedAll?: boolean;
  /** Whether to send a Slack message when any of the project or team's issues change to completed or cancelled. */
  public slackIssueStatusChangedDone?: boolean;
  /** Whether to send a Slack message when a project update is created. */
  public slackProjectUpdateCreated?: boolean;
  /** Whether to send a new project update to team Slack channels. */
  public slackProjectUpdateCreatedToTeam?: boolean;
  /** Whether to send a new project update to workspace Slack channel. */
  public slackProjectUpdateCreatedToWorkspace?: boolean;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** Project which those settings apply to. */
  public get project(): LinearFetch<Project> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
  /** Team which those settings apply to. */
  public get team(): LinearFetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }

  /** Creates new settings for one or more integrations. */
  public create(input: L.IntegrationsSettingsCreateInput) {
    return new CreateIntegrationsSettingsMutation(this._request).fetch(input);
  }
  /** Updates settings related to integrations for a project or a team. */
  public update(input: L.IntegrationsSettingsUpdateInput) {
    return new UpdateIntegrationsSettingsMutation(this._request).fetch(this.id, input);
  }
}
/**
 * IntegrationsSettingsConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this IntegrationsSettingsConnection model
 * @param data - IntegrationsSettingsConnection response data
 */
export class IntegrationsSettingsConnection extends Connection<IntegrationsSettings> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<IntegrationsSettings> | undefined>,
    data: L.IntegrationsSettingsConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new IntegrationsSettings(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * IntegrationsSettingsPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.IntegrationsSettingsPayloadFragment response data
 */
export class IntegrationsSettingsPayload extends Request {
  private _integrationsSettings: L.IntegrationsSettingsPayloadFragment["integrationsSettings"];

  public constructor(request: LinearRequest, data: L.IntegrationsSettingsPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._integrationsSettings = data.integrationsSettings;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The settings that were created or updated. */
  public get integrationsSettings(): LinearFetch<IntegrationsSettings> | undefined {
    return new IntegrationsSettingsQuery(this._request).fetch(this._integrationsSettings.id);
  }
}
/**
 * Intercom specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - L.IntercomSettingsFragment response data
 */
export class IntercomSettings extends Request {
  public constructor(request: LinearRequest, data: L.IntercomSettingsFragment) {
    super(request);
    this.automateTicketReopeningOnCancellation = data.automateTicketReopeningOnCancellation ?? undefined;
    this.automateTicketReopeningOnComment = data.automateTicketReopeningOnComment ?? undefined;
    this.automateTicketReopeningOnCompletion = data.automateTicketReopeningOnCompletion ?? undefined;
    this.sendNoteOnComment = data.sendNoteOnComment ?? undefined;
    this.sendNoteOnStatusChange = data.sendNoteOnStatusChange ?? undefined;
  }

  /** Whether a ticket should be automatically reopened when its linked Linear issue is cancelled. */
  public automateTicketReopeningOnCancellation?: boolean;
  /** Whether a ticket should be automatically reopened when a comment is posted on its linked Linear issue */
  public automateTicketReopeningOnComment?: boolean;
  /** Whether a ticket should be automatically reopened when its linked Linear issue is completed. */
  public automateTicketReopeningOnCompletion?: boolean;
  /** Whether an internal message should be added when someone comments on an issue. */
  public sendNoteOnComment?: boolean;
  /** Whether an internal message should be added when a Linear issue changes status (for status types except completed or canceled). */
  public sendNoteOnStatusChange?: boolean;
}
/**
 * An issue.
 *
 * @param request - function to call the graphql client
 * @param data - L.IssueFragment response data
 */
export class Issue extends Request {
  private _assignee?: L.IssueFragment["assignee"];
  private _creator?: L.IssueFragment["creator"];
  private _cycle?: L.IssueFragment["cycle"];
  private _parent?: L.IssueFragment["parent"];
  private _project?: L.IssueFragment["project"];
  private _snoozedBy?: L.IssueFragment["snoozedBy"];
  private _state: L.IssueFragment["state"];
  private _team: L.IssueFragment["team"];

  public constructor(request: LinearRequest, data: L.IssueFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.autoArchivedAt = parseDate(data.autoArchivedAt) ?? undefined;
    this.autoClosedAt = parseDate(data.autoClosedAt) ?? undefined;
    this.boardOrder = data.boardOrder;
    this.branchName = data.branchName;
    this.canceledAt = parseDate(data.canceledAt) ?? undefined;
    this.completedAt = parseDate(data.completedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.customerTicketCount = data.customerTicketCount;
    this.description = data.description ?? undefined;
    this.dueDate = data.dueDate ?? undefined;
    this.estimate = data.estimate ?? undefined;
    this.id = data.id;
    this.identifier = data.identifier;
    this.number = data.number;
    this.previousIdentifiers = data.previousIdentifiers;
    this.priority = data.priority;
    this.priorityLabel = data.priorityLabel;
    this.snoozedUntilAt = parseDate(data.snoozedUntilAt) ?? undefined;
    this.sortOrder = data.sortOrder;
    this.startedAt = parseDate(data.startedAt) ?? undefined;
    this.startedTriageAt = parseDate(data.startedTriageAt) ?? undefined;
    this.subIssueSortOrder = data.subIssueSortOrder ?? undefined;
    this.title = data.title;
    this.trashed = data.trashed ?? undefined;
    this.triagedAt = parseDate(data.triagedAt) ?? undefined;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.url = data.url;
    this._assignee = data.assignee ?? undefined;
    this._creator = data.creator ?? undefined;
    this._cycle = data.cycle ?? undefined;
    this._parent = data.parent ?? undefined;
    this._project = data.project ?? undefined;
    this._snoozedBy = data.snoozedBy ?? undefined;
    this._state = data.state;
    this._team = data.team;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the issue was automatically archived by the auto pruning process. */
  public autoArchivedAt?: Date;
  /** The time at which the issue was automatically closed by the auto pruning process. */
  public autoClosedAt?: Date;
  /** The order of the item in its column on the board. */
  public boardOrder: number;
  /** Suggested branch name for the issue. */
  public branchName: string;
  /** The time at which the issue was moved into canceled state. */
  public canceledAt?: Date;
  /** The time at which the issue was moved into completed state. */
  public completedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** Returns the number of Attachment resources which are created by customer support ticketing systems (e.g. Zendesk). */
  public customerTicketCount: number;
  /** The issue's description in markdown format. */
  public description?: string;
  /** The date at which the issue is due. */
  public dueDate?: L.Scalars["TimelessDate"];
  /** The estimate of the complexity of the issue.. */
  public estimate?: number;
  /** The unique identifier of the entity. */
  public id: string;
  /** Issue's human readable identifier (e.g. ENG-123). */
  public identifier: string;
  /** The issue's unique number. */
  public number: number;
  /** Previous identifiers of the issue if it has been moved between teams. */
  public previousIdentifiers: string[];
  /** The priority of the issue. */
  public priority: number;
  /** Label for the priority. */
  public priorityLabel: string;
  /** The time until an issue will be snoozed in Triage view. */
  public snoozedUntilAt?: Date;
  /** The order of the item in relation to other items in the organization. */
  public sortOrder: number;
  /** The time at which the issue was moved into started state. */
  public startedAt?: Date;
  /** The time at which the issue entered triage. */
  public startedTriageAt?: Date;
  /** The order of the item in the sub-issue list. Only set if the issue has a parent. */
  public subIssueSortOrder?: number;
  /** The issue's title. */
  public title: string;
  /** A flag that indicates whether the issue is in the trash bin. */
  public trashed?: boolean;
  /** The time at which the issue left triage. */
  public triagedAt?: Date;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** Issue URL. */
  public url: string;
  /** The user to whom the issue is assigned to. */
  public get assignee(): LinearFetch<User> | undefined {
    return this._assignee?.id ? new UserQuery(this._request).fetch(this._assignee?.id) : undefined;
  }
  /** The user who created the issue. */
  public get creator(): LinearFetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The cycle that the issue is associated with. */
  public get cycle(): LinearFetch<Cycle> | undefined {
    return this._cycle?.id ? new CycleQuery(this._request).fetch(this._cycle?.id) : undefined;
  }
  /** The parent of the issue. */
  public get parent(): LinearFetch<Issue> | undefined {
    return this._parent?.id ? new IssueQuery(this._request).fetch(this._parent?.id) : undefined;
  }
  /** The project that the issue is associated with. */
  public get project(): LinearFetch<Project> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
  /** The user who snoozed the issue. */
  public get snoozedBy(): LinearFetch<User> | undefined {
    return this._snoozedBy?.id ? new UserQuery(this._request).fetch(this._snoozedBy?.id) : undefined;
  }
  /** The workflow state that the issue is associated with. */
  public get state(): LinearFetch<WorkflowState> | undefined {
    return new WorkflowStateQuery(this._request).fetch(this._state.id);
  }
  /** The team that the issue is associated with. */
  public get team(): LinearFetch<Team> | undefined {
    return new TeamQuery(this._request).fetch(this._team.id);
  }
  /** Attachments associated with the issue. */
  public attachments(variables?: Omit<L.Issue_AttachmentsQueryVariables, "id">) {
    return new Issue_AttachmentsQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Children of the issue. */
  public children(variables?: Omit<L.Issue_ChildrenQueryVariables, "id">) {
    return new Issue_ChildrenQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Comments associated with the issue. */
  public comments(variables?: Omit<L.Issue_CommentsQueryVariables, "id">) {
    return new Issue_CommentsQuery(this._request, this.id, variables).fetch(variables);
  }
  /** History entries associated with the issue. */
  public history(variables?: Omit<L.Issue_HistoryQueryVariables, "id">) {
    return new Issue_HistoryQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Inverse relations associated with this issue. */
  public inverseRelations(variables?: Omit<L.Issue_InverseRelationsQueryVariables, "id">) {
    return new Issue_InverseRelationsQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Labels associated with this issue. */
  public labels(variables?: Omit<L.Issue_LabelsQueryVariables, "id">) {
    return new Issue_LabelsQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Relations associated with this issue. */
  public relations(variables?: Omit<L.Issue_RelationsQueryVariables, "id">) {
    return new Issue_RelationsQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Users who are subscribed to the issue. */
  public subscribers(variables?: Omit<L.Issue_SubscribersQueryVariables, "id">) {
    return new Issue_SubscribersQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Archives an issue. */
  public archive(variables?: Omit<L.ArchiveIssueMutationVariables, "id">) {
    return new ArchiveIssueMutation(this._request).fetch(this.id, variables);
  }
  /** Creates a new issue. */
  public create(input: L.IssueCreateInput) {
    return new CreateIssueMutation(this._request).fetch(input);
  }
  /** Deletes (trashes) an issue. */
  public delete() {
    return new DeleteIssueMutation(this._request).fetch(this.id);
  }
  /** Unarchives an issue. */
  public unarchive() {
    return new UnarchiveIssueMutation(this._request).fetch(this.id);
  }
  /** Updates an issue. */
  public update(input: L.IssueUpdateInput) {
    return new UpdateIssueMutation(this._request).fetch(this.id, input);
  }
}
/**
 * IssueBatchPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.IssueBatchPayloadFragment response data
 */
export class IssueBatchPayload extends Request {
  public constructor(request: LinearRequest, data: L.IssueBatchPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this.issues = data.issues.map(node => new Issue(request, node));
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The issues that were updated. */
  public issues: Issue[];
}
/**
 * IssueConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this IssueConnection model
 * @param data - IssueConnection response data
 */
export class IssueConnection extends Connection<Issue> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<Issue> | undefined>,
    data: L.IssueConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new Issue(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * A record of changes to an issue.
 *
 * @param request - function to call the graphql client
 * @param data - L.IssueHistoryFragment response data
 */
export class IssueHistory extends Request {
  private _actor?: L.IssueHistoryFragment["actor"];
  private _attachment?: L.IssueHistoryFragment["attachment"];
  private _fromAssignee?: L.IssueHistoryFragment["fromAssignee"];
  private _fromCycle?: L.IssueHistoryFragment["fromCycle"];
  private _fromParent?: L.IssueHistoryFragment["fromParent"];
  private _fromProject?: L.IssueHistoryFragment["fromProject"];
  private _fromState?: L.IssueHistoryFragment["fromState"];
  private _fromTeam?: L.IssueHistoryFragment["fromTeam"];
  private _issue: L.IssueHistoryFragment["issue"];
  private _toAssignee?: L.IssueHistoryFragment["toAssignee"];
  private _toConvertedProject?: L.IssueHistoryFragment["toConvertedProject"];
  private _toCycle?: L.IssueHistoryFragment["toCycle"];
  private _toParent?: L.IssueHistoryFragment["toParent"];
  private _toProject?: L.IssueHistoryFragment["toProject"];
  private _toState?: L.IssueHistoryFragment["toState"];
  private _toTeam?: L.IssueHistoryFragment["toTeam"];

  public constructor(request: LinearRequest, data: L.IssueHistoryFragment) {
    super(request);
    this.actorId = data.actorId ?? undefined;
    this.addedLabelIds = data.addedLabelIds ?? undefined;
    this.archived = data.archived ?? undefined;
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.attachmentId = data.attachmentId ?? undefined;
    this.autoArchived = data.autoArchived ?? undefined;
    this.autoClosed = data.autoClosed ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.fromAssigneeId = data.fromAssigneeId ?? undefined;
    this.fromCycleId = data.fromCycleId ?? undefined;
    this.fromDueDate = data.fromDueDate ?? undefined;
    this.fromEstimate = data.fromEstimate ?? undefined;
    this.fromParentId = data.fromParentId ?? undefined;
    this.fromPriority = data.fromPriority ?? undefined;
    this.fromProjectId = data.fromProjectId ?? undefined;
    this.fromStateId = data.fromStateId ?? undefined;
    this.fromTeamId = data.fromTeamId ?? undefined;
    this.fromTitle = data.fromTitle ?? undefined;
    this.id = data.id;
    this.removedLabelIds = data.removedLabelIds ?? undefined;
    this.toAssigneeId = data.toAssigneeId ?? undefined;
    this.toConvertedProjectId = data.toConvertedProjectId ?? undefined;
    this.toCycleId = data.toCycleId ?? undefined;
    this.toDueDate = data.toDueDate ?? undefined;
    this.toEstimate = data.toEstimate ?? undefined;
    this.toParentId = data.toParentId ?? undefined;
    this.toPriority = data.toPriority ?? undefined;
    this.toProjectId = data.toProjectId ?? undefined;
    this.toStateId = data.toStateId ?? undefined;
    this.toTeamId = data.toTeamId ?? undefined;
    this.toTitle = data.toTitle ?? undefined;
    this.trashed = data.trashed ?? undefined;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.updatedDescription = data.updatedDescription ?? undefined;
    this.issueImport = data.issueImport ? new IssueImport(request, data.issueImport) : undefined;
    this.relationChanges = data.relationChanges
      ? data.relationChanges.map(node => new IssueRelationHistoryPayload(request, node))
      : undefined;
    this._actor = data.actor ?? undefined;
    this._attachment = data.attachment ?? undefined;
    this._fromAssignee = data.fromAssignee ?? undefined;
    this._fromCycle = data.fromCycle ?? undefined;
    this._fromParent = data.fromParent ?? undefined;
    this._fromProject = data.fromProject ?? undefined;
    this._fromState = data.fromState ?? undefined;
    this._fromTeam = data.fromTeam ?? undefined;
    this._issue = data.issue;
    this._toAssignee = data.toAssignee ?? undefined;
    this._toConvertedProject = data.toConvertedProject ?? undefined;
    this._toCycle = data.toCycle ?? undefined;
    this._toParent = data.toParent ?? undefined;
    this._toProject = data.toProject ?? undefined;
    this._toState = data.toState ?? undefined;
    this._toTeam = data.toTeam ?? undefined;
  }

  /** The id of user who made these changes. If null, possibly means that the change made by an integration. */
  public actorId?: string;
  /** ID's of labels that were added. */
  public addedLabelIds?: string[];
  /** Whether the issue was archived or un-archived. */
  public archived?: boolean;
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The id of linked attachment. */
  public attachmentId?: string;
  /** Whether the issue was auto-archived. */
  public autoArchived?: boolean;
  /** Whether the issue was auto-closed. */
  public autoClosed?: boolean;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The id of user from whom the issue was re-assigned from. */
  public fromAssigneeId?: string;
  /** The id of previous cycle of the issue. */
  public fromCycleId?: string;
  /** What the due date was changed from */
  public fromDueDate?: L.Scalars["TimelessDate"];
  /** What the estimate was changed from. */
  public fromEstimate?: number;
  /** The id of previous parent of the issue. */
  public fromParentId?: string;
  /** What the priority was changed from. */
  public fromPriority?: number;
  /** The id of previous project of the issue. */
  public fromProjectId?: string;
  /** The id of previous workflow state of the issue. */
  public fromStateId?: string;
  /** The id of team from which the issue was moved from. */
  public fromTeamId?: string;
  /** What the title was changed from. */
  public fromTitle?: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** ID's of labels that were removed. */
  public removedLabelIds?: string[];
  /** The id of user to whom the issue was assigned to. */
  public toAssigneeId?: string;
  /** The id of new project created from the issue. */
  public toConvertedProjectId?: string;
  /** The id of new cycle of the issue. */
  public toCycleId?: string;
  /** What the due date was changed to */
  public toDueDate?: L.Scalars["TimelessDate"];
  /** What the estimate was changed to. */
  public toEstimate?: number;
  /** The id of new parent of the issue. */
  public toParentId?: string;
  /** What the priority was changed to. */
  public toPriority?: number;
  /** The id of new project of the issue. */
  public toProjectId?: string;
  /** The id of new workflow state of the issue. */
  public toStateId?: string;
  /** The id of team to which the issue was moved to. */
  public toTeamId?: string;
  /** What the title was changed to. */
  public toTitle?: string;
  /** Whether the issue was trashed or un-trashed. */
  public trashed?: boolean;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** Whether the issue's description was updated. */
  public updatedDescription?: boolean;
  /** Changed issue relationships. */
  public relationChanges?: IssueRelationHistoryPayload[];
  /** The import record. */
  public issueImport?: IssueImport;
  /** The user who made these changes. If null, possibly means that the change made by an integration. */
  public get actor(): LinearFetch<User> | undefined {
    return this._actor?.id ? new UserQuery(this._request).fetch(this._actor?.id) : undefined;
  }
  /** The linked attachment. */
  public get attachment(): LinearFetch<Attachment> | undefined {
    return this._attachment?.id ? new AttachmentQuery(this._request).fetch(this._attachment?.id) : undefined;
  }
  /** The user from whom the issue was re-assigned from. */
  public get fromAssignee(): LinearFetch<User> | undefined {
    return this._fromAssignee?.id ? new UserQuery(this._request).fetch(this._fromAssignee?.id) : undefined;
  }
  /** The previous cycle of the issue. */
  public get fromCycle(): LinearFetch<Cycle> | undefined {
    return this._fromCycle?.id ? new CycleQuery(this._request).fetch(this._fromCycle?.id) : undefined;
  }
  /** The previous parent of the issue. */
  public get fromParent(): LinearFetch<Issue> | undefined {
    return this._fromParent?.id ? new IssueQuery(this._request).fetch(this._fromParent?.id) : undefined;
  }
  /** The previous project of the issue. */
  public get fromProject(): LinearFetch<Project> | undefined {
    return this._fromProject?.id ? new ProjectQuery(this._request).fetch(this._fromProject?.id) : undefined;
  }
  /** The previous workflow state of the issue. */
  public get fromState(): LinearFetch<WorkflowState> | undefined {
    return this._fromState?.id ? new WorkflowStateQuery(this._request).fetch(this._fromState?.id) : undefined;
  }
  /** The team from which the issue was moved from. */
  public get fromTeam(): LinearFetch<Team> | undefined {
    return this._fromTeam?.id ? new TeamQuery(this._request).fetch(this._fromTeam?.id) : undefined;
  }
  /** The issue that was changed. */
  public get issue(): LinearFetch<Issue> | undefined {
    return new IssueQuery(this._request).fetch(this._issue.id);
  }
  /** The user to whom the issue was assigned to. */
  public get toAssignee(): LinearFetch<User> | undefined {
    return this._toAssignee?.id ? new UserQuery(this._request).fetch(this._toAssignee?.id) : undefined;
  }
  /** The new project created from the issue. */
  public get toConvertedProject(): LinearFetch<Project> | undefined {
    return this._toConvertedProject?.id
      ? new ProjectQuery(this._request).fetch(this._toConvertedProject?.id)
      : undefined;
  }
  /** The new cycle of the issue. */
  public get toCycle(): LinearFetch<Cycle> | undefined {
    return this._toCycle?.id ? new CycleQuery(this._request).fetch(this._toCycle?.id) : undefined;
  }
  /** The new parent of the issue. */
  public get toParent(): LinearFetch<Issue> | undefined {
    return this._toParent?.id ? new IssueQuery(this._request).fetch(this._toParent?.id) : undefined;
  }
  /** The new project of the issue. */
  public get toProject(): LinearFetch<Project> | undefined {
    return this._toProject?.id ? new ProjectQuery(this._request).fetch(this._toProject?.id) : undefined;
  }
  /** The new workflow state of the issue. */
  public get toState(): LinearFetch<WorkflowState> | undefined {
    return this._toState?.id ? new WorkflowStateQuery(this._request).fetch(this._toState?.id) : undefined;
  }
  /** The team to which the issue was moved to. */
  public get toTeam(): LinearFetch<Team> | undefined {
    return this._toTeam?.id ? new TeamQuery(this._request).fetch(this._toTeam?.id) : undefined;
  }
}
/**
 * IssueHistoryConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this IssueHistoryConnection model
 * @param data - IssueHistoryConnection response data
 */
export class IssueHistoryConnection extends Connection<IssueHistory> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<IssueHistory> | undefined>,
    data: L.IssueHistoryConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new IssueHistory(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * An import job for data from an external service
 *
 * @param request - function to call the graphql client
 * @param data - L.IssueImportFragment response data
 */
export class IssueImport extends Request {
  public constructor(request: LinearRequest, data: L.IssueImportFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.creatorId = data.creatorId;
    this.error = data.error ?? undefined;
    this.id = data.id;
    this.mapping = parseJson(data.mapping) ?? undefined;
    this.progress = data.progress ?? undefined;
    this.service = data.service;
    this.status = data.status;
    this.teamName = data.teamName ?? undefined;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The id for the user that started the job. */
  public creatorId: string;
  /** User readable error message, if one has occurred during the import. */
  public error?: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** The data mapping configuration for the import job. */
  public mapping?: Record<string, unknown>;
  /** Current step progress in % (0-100). */
  public progress?: number;
  /** The service from which data will be imported. */
  public service: string;
  /** The status for the import job. */
  public status: string;
  /** New team's name in cases when teamId not set */
  public teamName?: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;

  /** Deletes an import job. */
  public delete(issueImportId: string) {
    return new DeleteIssueImportMutation(this._request).fetch(issueImportId);
  }
  /** Updates the mapping for the issue import. */
  public update(input: L.IssueImportUpdateInput) {
    return new UpdateIssueImportMutation(this._request).fetch(this.id, input);
  }
}
/**
 * IssueImportDeletePayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.IssueImportDeletePayloadFragment response data
 */
export class IssueImportDeletePayload extends Request {
  public constructor(request: LinearRequest, data: L.IssueImportDeletePayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this.issueImport = data.issueImport ? new IssueImport(request, data.issueImport) : undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The import job that was deleted. */
  public issueImport?: IssueImport;
}
/**
 * IssueImportPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.IssueImportPayloadFragment response data
 */
export class IssueImportPayload extends Request {
  public constructor(request: LinearRequest, data: L.IssueImportPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this.issueImport = data.issueImport ? new IssueImport(request, data.issueImport) : undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The import job that was created or updated. */
  public issueImport?: IssueImport;
}
/**
 * Labels that can be associated with issues.
 *
 * @param request - function to call the graphql client
 * @param data - L.IssueLabelFragment response data
 */
export class IssueLabel extends Request {
  private _creator?: L.IssueLabelFragment["creator"];
  private _parent?: L.IssueLabelFragment["parent"];
  private _team?: L.IssueLabelFragment["team"];

  public constructor(request: LinearRequest, data: L.IssueLabelFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.color = data.color;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.description = data.description ?? undefined;
    this.id = data.id;
    this.name = data.name;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._creator = data.creator ?? undefined;
    this._parent = data.parent ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The label's color as a HEX string. */
  public color: string;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The label's description. */
  public description?: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** The label's name. */
  public name: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user who created the label. */
  public get creator(): LinearFetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** The parent label. */
  public get parent(): LinearFetch<IssueLabel> | undefined {
    return this._parent?.id ? new IssueLabelQuery(this._request).fetch(this._parent?.id) : undefined;
  }
  /** The team that the label is associated with. If null, the label is associated with the global workspace. */
  public get team(): LinearFetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** Children of the label. */
  public children(variables?: Omit<L.IssueLabel_ChildrenQueryVariables, "id">) {
    return new IssueLabel_ChildrenQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Issues associated with the label. */
  public issues(variables?: Omit<L.IssueLabel_IssuesQueryVariables, "id">) {
    return new IssueLabel_IssuesQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Deletes an issue label. */
  public archive() {
    return new ArchiveIssueLabelMutation(this._request).fetch(this.id);
  }
  /** Creates a new label. */
  public create(input: L.IssueLabelCreateInput, variables?: Omit<L.CreateIssueLabelMutationVariables, "input">) {
    return new CreateIssueLabelMutation(this._request).fetch(input, variables);
  }
  /** Deletes an issue label. */
  public delete() {
    return new DeleteIssueLabelMutation(this._request).fetch(this.id);
  }
  /** Updates an label. */
  public update(input: L.IssueLabelUpdateInput) {
    return new UpdateIssueLabelMutation(this._request).fetch(this.id, input);
  }
}
/**
 * IssueLabelConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this IssueLabelConnection model
 * @param data - IssueLabelConnection response data
 */
export class IssueLabelConnection extends Connection<IssueLabel> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<IssueLabel> | undefined>,
    data: L.IssueLabelConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new IssueLabel(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * IssueLabelPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.IssueLabelPayloadFragment response data
 */
export class IssueLabelPayload extends Request {
  private _issueLabel: L.IssueLabelPayloadFragment["issueLabel"];

  public constructor(request: LinearRequest, data: L.IssueLabelPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._issueLabel = data.issueLabel;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The label that was created or updated. */
  public get issueLabel(): LinearFetch<IssueLabel> | undefined {
    return new IssueLabelQuery(this._request).fetch(this._issueLabel.id);
  }
}
/**
 * An issue related notification
 *
 * @param request - function to call the graphql client
 * @param data - L.IssueNotificationFragment response data
 */
export class IssueNotification extends Request {
  private _actor?: L.IssueNotificationFragment["actor"];
  private _comment?: L.IssueNotificationFragment["comment"];
  private _issue: L.IssueNotificationFragment["issue"];
  private _team: L.IssueNotificationFragment["team"];
  private _user: L.IssueNotificationFragment["user"];

  public constructor(request: LinearRequest, data: L.IssueNotificationFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.emailedAt = parseDate(data.emailedAt) ?? undefined;
    this.id = data.id;
    this.reactionEmoji = data.reactionEmoji ?? undefined;
    this.readAt = parseDate(data.readAt) ?? undefined;
    this.snoozedUntilAt = parseDate(data.snoozedUntilAt) ?? undefined;
    this.type = data.type;
    this.unsnoozedAt = parseDate(data.unsnoozedAt) ?? undefined;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._actor = data.actor ?? undefined;
    this._comment = data.comment ?? undefined;
    this._issue = data.issue;
    this._team = data.team;
    this._user = data.user;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /**
   * The time at when an email reminder for this notification was sent to the user. Null, if no email
   *     reminder has been sent.
   */
  public emailedAt?: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** Name of the reaction emoji related to the notification. */
  public reactionEmoji?: string;
  /** The time at when the user marked the notification as read. Null, if the the user hasn't read the notification */
  public readAt?: Date;
  /** The time until a notification will be snoozed. After that it will appear in the inbox again. */
  public snoozedUntilAt?: Date;
  /** Notification type */
  public type: string;
  /** The time at which a notification was unsnoozed.. */
  public unsnoozedAt?: Date;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user that caused the notification. If empty it's Linear itself. */
  public get actor(): LinearFetch<User> | undefined {
    return this._actor?.id ? new UserQuery(this._request).fetch(this._actor?.id) : undefined;
  }
  /** The comment related to the notification. */
  public get comment(): LinearFetch<Comment> | undefined {
    return this._comment?.id ? new CommentQuery(this._request).fetch(this._comment?.id) : undefined;
  }
  /** The issue related to the notification. */
  public get issue(): LinearFetch<Issue> | undefined {
    return new IssueQuery(this._request).fetch(this._issue.id);
  }
  /** The team related to the notification. */
  public get team(): LinearFetch<Team> | undefined {
    return new TeamQuery(this._request).fetch(this._team.id);
  }
  /** The user that received the notification. */
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }
}
/**
 * IssuePayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.IssuePayloadFragment response data
 */
export class IssuePayload extends Request {
  private _issue?: L.IssuePayloadFragment["issue"];

  public constructor(request: LinearRequest, data: L.IssuePayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._issue = data.issue ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The issue that was created or updated. */
  public get issue(): LinearFetch<Issue> | undefined {
    return this._issue?.id ? new IssueQuery(this._request).fetch(this._issue?.id) : undefined;
  }
}
/**
 * IssuePriorityValue model
 *
 * @param request - function to call the graphql client
 * @param data - L.IssuePriorityValueFragment response data
 */
export class IssuePriorityValue extends Request {
  public constructor(request: LinearRequest, data: L.IssuePriorityValueFragment) {
    super(request);
    this.label = data.label;
    this.priority = data.priority;
  }

  /** Priority's label. */
  public label: string;
  /** Priority's number value. */
  public priority: number;
}
/**
 * A relation between two issues.
 *
 * @param request - function to call the graphql client
 * @param data - L.IssueRelationFragment response data
 */
export class IssueRelation extends Request {
  private _issue: L.IssueRelationFragment["issue"];
  private _relatedIssue: L.IssueRelationFragment["relatedIssue"];

  public constructor(request: LinearRequest, data: L.IssueRelationFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.type = data.type;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._issue = data.issue;
    this._relatedIssue = data.relatedIssue;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The relationship of the issue with the related issue. */
  public type: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The issue whose relationship is being described. */
  public get issue(): LinearFetch<Issue> | undefined {
    return new IssueQuery(this._request).fetch(this._issue.id);
  }
  /** The related issue. */
  public get relatedIssue(): LinearFetch<Issue> | undefined {
    return new IssueQuery(this._request).fetch(this._relatedIssue.id);
  }

  /** Creates a new issue relation. */
  public create(input: L.IssueRelationCreateInput) {
    return new CreateIssueRelationMutation(this._request).fetch(input);
  }
  /** Deletes an issue relation. */
  public delete() {
    return new DeleteIssueRelationMutation(this._request).fetch(this.id);
  }
  /** Updates an issue relation. */
  public update(input: L.IssueRelationUpdateInput) {
    return new UpdateIssueRelationMutation(this._request).fetch(this.id, input);
  }
}
/**
 * IssueRelationConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this IssueRelationConnection model
 * @param data - IssueRelationConnection response data
 */
export class IssueRelationConnection extends Connection<IssueRelation> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<IssueRelation> | undefined>,
    data: L.IssueRelationConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new IssueRelation(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * Issue relation history's payload
 *
 * @param request - function to call the graphql client
 * @param data - L.IssueRelationHistoryPayloadFragment response data
 */
export class IssueRelationHistoryPayload extends Request {
  public constructor(request: LinearRequest, data: L.IssueRelationHistoryPayloadFragment) {
    super(request);
    this.identifier = data.identifier;
    this.type = data.type;
  }

  /** The identifier of the related issue. */
  public identifier: string;
  /** The type of the change. */
  public type: string;
}
/**
 * IssueRelationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.IssueRelationPayloadFragment response data
 */
export class IssueRelationPayload extends Request {
  private _issueRelation: L.IssueRelationPayloadFragment["issueRelation"];

  public constructor(request: LinearRequest, data: L.IssueRelationPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._issueRelation = data.issueRelation;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The issue relation that was created or updated. */
  public get issueRelation(): LinearFetch<IssueRelation> | undefined {
    return new IssueRelationQuery(this._request).fetch(this._issueRelation.id);
  }
}
/**
 * Tuple for mapping Jira projects to Linear teams.
 *
 * @param request - function to call the graphql client
 * @param data - L.JiraLinearMappingFragment response data
 */
export class JiraLinearMapping extends Request {
  public constructor(request: LinearRequest, data: L.JiraLinearMappingFragment) {
    super(request);
    this.jiraProjectId = data.jiraProjectId;
    this.linearTeamId = data.linearTeamId;
  }

  /** The Jira id for this project. */
  public jiraProjectId: string;
  /** The Linear team id to map to the given project. */
  public linearTeamId: string;
}
/**
 * Metadata about a Jira project.
 *
 * @param request - function to call the graphql client
 * @param data - L.JiraProjectDataFragment response data
 */
export class JiraProjectData extends Request {
  public constructor(request: LinearRequest, data: L.JiraProjectDataFragment) {
    super(request);
    this.id = data.id;
    this.key = data.key;
    this.name = data.name;
  }

  /** The Jira id for this project. */
  public id: string;
  /** The Jira key for this project, such as ENG. */
  public key: string;
  /** The Jira name for this project, such as Engineering. */
  public name: string;
}
/**
 * Jira specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - L.JiraSettingsFragment response data
 */
export class JiraSettings extends Request {
  public constructor(request: LinearRequest, data: L.JiraSettingsFragment) {
    super(request);
    this.projectMapping = data.projectMapping
      ? data.projectMapping.map(node => new JiraLinearMapping(request, node))
      : undefined;
    this.projects = data.projects.map(node => new JiraProjectData(request, node));
  }

  /** The mapping of Jira project id => Linear team id. */
  public projectMapping?: JiraLinearMapping[];
  /** The Jira projects for the organization. */
  public projects: JiraProjectData[];
}
/**
 * LogoutResponse model
 *
 * @param request - function to call the graphql client
 * @param data - L.LogoutResponseFragment response data
 */
export class LogoutResponse extends Request {
  public constructor(request: LinearRequest, data: L.LogoutResponseFragment) {
    super(request);
    this.success = data.success;
  }

  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * Node model
 *
 * @param request - function to call the graphql client
 * @param data - L.NodeFragment response data
 */
export class Node extends Request {
  public constructor(request: LinearRequest, data: L.NodeFragment) {
    super(request);
    this.id = data.id;
  }

  /** The unique identifier of the entity. */
  public id: string;
}
/**
 * A notification sent to a user.
 *
 * @param request - function to call the graphql client
 * @param data - L.NotificationFragment response data
 */
export class Notification extends Request {
  private _actor?: L.NotificationFragment["actor"];
  private _user: L.NotificationFragment["user"];

  public constructor(request: LinearRequest, data: L.NotificationFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.emailedAt = parseDate(data.emailedAt) ?? undefined;
    this.id = data.id;
    this.readAt = parseDate(data.readAt) ?? undefined;
    this.snoozedUntilAt = parseDate(data.snoozedUntilAt) ?? undefined;
    this.type = data.type;
    this.unsnoozedAt = parseDate(data.unsnoozedAt) ?? undefined;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._actor = data.actor ?? undefined;
    this._user = data.user;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /**
   * The time at when an email reminder for this notification was sent to the user. Null, if no email
   *     reminder has been sent.
   */
  public emailedAt?: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The time at when the user marked the notification as read. Null, if the the user hasn't read the notification */
  public readAt?: Date;
  /** The time until a notification will be snoozed. After that it will appear in the inbox again. */
  public snoozedUntilAt?: Date;
  /** Notification type */
  public type: string;
  /** The time at which a notification was unsnoozed.. */
  public unsnoozedAt?: Date;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user that caused the notification. If empty it's Linear itself. */
  public get actor(): LinearFetch<User> | undefined {
    return this._actor?.id ? new UserQuery(this._request).fetch(this._actor?.id) : undefined;
  }
  /** The user that received the notification. */
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }

  /** Archives a notification. */
  public archive() {
    return new ArchiveNotificationMutation(this._request).fetch(this.id);
  }
  /** Unarchives a notification. */
  public unarchive() {
    return new UnarchiveNotificationMutation(this._request).fetch(this.id);
  }
  /** Updates a notification. */
  public update(input: L.NotificationUpdateInput) {
    return new UpdateNotificationMutation(this._request).fetch(this.id, input);
  }
}
/**
 * NotificationConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this NotificationConnection model
 * @param data - NotificationConnection response data
 */
export class NotificationConnection extends Connection<
  IssueNotification | OauthClientApprovalNotification | ProjectNotification | Notification
> {
  public constructor(
    request: LinearRequest,
    fetch: (
      connection?: LinearConnectionVariables
    ) => LinearFetch<
      | LinearConnection<IssueNotification | OauthClientApprovalNotification | ProjectNotification | Notification>
      | undefined
    >,
    data: L.NotificationConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => {
        switch (node.__typename) {
          case "IssueNotification":
            return new IssueNotification(request, node as L.IssueNotificationFragment);
          case "OauthClientApprovalNotification":
            return new OauthClientApprovalNotification(request, node as L.OauthClientApprovalNotificationFragment);
          case "ProjectNotification":
            return new ProjectNotification(request, node as L.ProjectNotificationFragment);

          default:
            return new Notification(request, node);
        }
      }),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * NotificationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.NotificationPayloadFragment response data
 */
export class NotificationPayload extends Request {
  public constructor(request: LinearRequest, data: L.NotificationPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * Notification subscriptions for models.
 *
 * @param request - function to call the graphql client
 * @param data - L.NotificationSubscriptionFragment response data
 */
export class NotificationSubscription extends Request {
  private _project?: L.NotificationSubscriptionFragment["project"];
  private _team?: L.NotificationSubscriptionFragment["team"];
  private _user: L.NotificationSubscriptionFragment["user"];

  public constructor(request: LinearRequest, data: L.NotificationSubscriptionFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.type = data.type;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._project = data.project ?? undefined;
    this._team = data.team ?? undefined;
    this._user = data.user;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The type of the subscription. */
  public type: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** Subscribed project. */
  public get project(): LinearFetch<Project> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
  /** Subscribed team. */
  public get team(): LinearFetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The user associated with notification subscriptions. */
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }

  /** Creates a new notification subscription for a team or a project. */
  public create(input: L.NotificationSubscriptionCreateInput) {
    return new CreateNotificationSubscriptionMutation(this._request).fetch(input);
  }
  /** Deletes a notification subscription reference. */
  public delete() {
    return new DeleteNotificationSubscriptionMutation(this._request).fetch(this.id);
  }
  /** Updates a notification subscription. */
  public update(input: L.NotificationSubscriptionUpdateInput) {
    return new UpdateNotificationSubscriptionMutation(this._request).fetch(this.id, input);
  }
}
/**
 * NotificationSubscriptionConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this NotificationSubscriptionConnection model
 * @param data - NotificationSubscriptionConnection response data
 */
export class NotificationSubscriptionConnection extends Connection<
  ProjectNotificationSubscription | TeamNotificationSubscription | NotificationSubscription
> {
  public constructor(
    request: LinearRequest,
    fetch: (
      connection?: LinearConnectionVariables
    ) => LinearFetch<
      | LinearConnection<ProjectNotificationSubscription | TeamNotificationSubscription | NotificationSubscription>
      | undefined
    >,
    data: L.NotificationSubscriptionConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => {
        switch (node.__typename) {
          case "ProjectNotificationSubscription":
            return new ProjectNotificationSubscription(request, node as L.ProjectNotificationSubscriptionFragment);
          case "TeamNotificationSubscription":
            return new TeamNotificationSubscription(request, node as L.TeamNotificationSubscriptionFragment);

          default:
            return new NotificationSubscription(request, node);
        }
      }),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * NotificationSubscriptionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.NotificationSubscriptionPayloadFragment response data
 */
export class NotificationSubscriptionPayload extends Request {
  public constructor(request: LinearRequest, data: L.NotificationSubscriptionPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * Notion specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - L.NotionSettingsFragment response data
 */
export class NotionSettings extends Request {
  public constructor(request: LinearRequest, data: L.NotionSettingsFragment) {
    super(request);
    this.workspaceId = data.workspaceId;
    this.workspaceName = data.workspaceName;
  }

  /** The ID of the Notion workspace being connected. */
  public workspaceId: string;
  /** The name of the Notion workspace being connected. */
  public workspaceName: string;
}
/**
 * OAuth2 client application
 *
 * @param request - function to call the graphql client
 * @param data - L.OauthClientFragment response data
 */
export class OauthClient extends Request {
  private _creator: L.OauthClientFragment["creator"];

  public constructor(request: LinearRequest, data: L.OauthClientFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.clientId = data.clientId;
    this.clientSecret = data.clientSecret;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.description = data.description ?? undefined;
    this.developer = data.developer;
    this.developerUrl = data.developerUrl;
    this.id = data.id;
    this.imageUrl = data.imageUrl ?? undefined;
    this.name = data.name;
    this.publicEnabled = data.publicEnabled;
    this.redirectUris = data.redirectUris;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.webhookResourceTypes = data.webhookResourceTypes;
    this.webhookUrl = data.webhookUrl ?? undefined;
    this._creator = data.creator;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** OAuth application's client ID. */
  public clientId: string;
  /** OAuth application's client secret. */
  public clientSecret: string;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** Information about the application. */
  public description?: string;
  /** Name of the developer. */
  public developer: string;
  /** Url of the developer. */
  public developerUrl: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** Image of the application. */
  public imageUrl?: string;
  /** OAuth application's client name. */
  public name: string;
  /** Whether the OAuth application is publicly visible, or only visible to the creating workspace. */
  public publicEnabled: boolean;
  /** List of allowed redirect URIs for the application. */
  public redirectUris: string[];
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The resource types to request when creating new webhooks. */
  public webhookResourceTypes: string[];
  /** Webhook URL */
  public webhookUrl?: string;
  /** The user who created the OAuthClient. */
  public get creator(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._creator.id);
  }
  /** The organization that the OAuthClient is associated with. */
  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
}
/**
 * Request to install OAuth clients on organizations and the response to the request.
 *
 * @param request - function to call the graphql client
 * @param data - L.OauthClientApprovalFragment response data
 */
export class OauthClientApproval extends Request {
  public constructor(request: LinearRequest, data: L.OauthClientApprovalFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.denyReason = data.denyReason ?? undefined;
    this.id = data.id;
    this.oauthClientId = data.oauthClientId;
    this.requestReason = data.requestReason ?? undefined;
    this.requesterId = data.requesterId;
    this.responderId = data.responderId ?? undefined;
    this.scopes = data.scopes;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The reason the request for the OAuth client approval was denied. */
  public denyReason?: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** The uuid of the OAuth client being requested for installation. */
  public oauthClientId: string;
  /** The reason the person wants to install this OAuth client. */
  public requestReason?: string;
  /** The person who requested installing the OAuth client. */
  public requesterId: string;
  /** The person who responded to the request to install the OAuth client. */
  public responderId?: string;
  /** The scopes the app has requested. */
  public scopes: string[];
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
}
/**
 * An oauth client approval related notification
 *
 * @param request - function to call the graphql client
 * @param data - L.OauthClientApprovalNotificationFragment response data
 */
export class OauthClientApprovalNotification extends Request {
  private _actor?: L.OauthClientApprovalNotificationFragment["actor"];
  private _user: L.OauthClientApprovalNotificationFragment["user"];

  public constructor(request: LinearRequest, data: L.OauthClientApprovalNotificationFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.emailedAt = parseDate(data.emailedAt) ?? undefined;
    this.id = data.id;
    this.readAt = parseDate(data.readAt) ?? undefined;
    this.snoozedUntilAt = parseDate(data.snoozedUntilAt) ?? undefined;
    this.type = data.type;
    this.unsnoozedAt = parseDate(data.unsnoozedAt) ?? undefined;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.oauthClientApproval = new OauthClientApproval(request, data.oauthClientApproval);
    this._actor = data.actor ?? undefined;
    this._user = data.user;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /**
   * The time at when an email reminder for this notification was sent to the user. Null, if no email
   *     reminder has been sent.
   */
  public emailedAt?: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The time at when the user marked the notification as read. Null, if the the user hasn't read the notification */
  public readAt?: Date;
  /** The time until a notification will be snoozed. After that it will appear in the inbox again. */
  public snoozedUntilAt?: Date;
  /** Notification type */
  public type: string;
  /** The time at which a notification was unsnoozed.. */
  public unsnoozedAt?: Date;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The OAuth client approval request related to the notification. */
  public oauthClientApproval: OauthClientApproval;
  /** The user that caused the notification. If empty it's Linear itself. */
  public get actor(): LinearFetch<User> | undefined {
    return this._actor?.id ? new UserQuery(this._request).fetch(this._actor?.id) : undefined;
  }
  /** The user that received the notification. */
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }
}
/**
 * An organization. Organizations are root-level objects that contain user accounts and teams.
 *
 * @param request - function to call the graphql client
 * @param data - L.OrganizationFragment response data
 */
export class Organization extends Request {
  public constructor(request: LinearRequest, data: L.OrganizationFragment) {
    super(request);
    this.allowedAuthServices = data.allowedAuthServices;
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.createdIssueCount = data.createdIssueCount;
    this.deletionRequestedAt = parseDate(data.deletionRequestedAt) ?? undefined;
    this.gitBranchFormat = data.gitBranchFormat ?? undefined;
    this.gitLinkbackMessagesEnabled = data.gitLinkbackMessagesEnabled;
    this.gitPublicLinkbackMessagesEnabled = data.gitPublicLinkbackMessagesEnabled;
    this.id = data.id;
    this.logoUrl = data.logoUrl ?? undefined;
    this.name = data.name;
    this.periodUploadVolume = data.periodUploadVolume;
    this.previousUrlKeys = data.previousUrlKeys;
    this.projectUpdateRemindersHour = data.projectUpdateRemindersHour;
    this.roadmapEnabled = data.roadmapEnabled;
    this.samlEnabled = data.samlEnabled;
    this.scimEnabled = data.scimEnabled;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.urlKey = data.urlKey;
    this.userCount = data.userCount;
    this.subscription = data.subscription ? new PaidSubscription(request, data.subscription) : undefined;
  }

  /** Allowed authentication providers, empty array means all are allowed */
  public allowedAuthServices: string[];
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** Number of issues in the organization. */
  public createdIssueCount: number;
  /** The time at which deletion of the organization was requested. */
  public deletionRequestedAt?: Date;
  /** How git branches are formatted. If null, default formatting will be used. */
  public gitBranchFormat?: string;
  /** Whether the Git integration linkback messages should be sent to private repositories. */
  public gitLinkbackMessagesEnabled: boolean;
  /** Whether the Git integration linkback messages should be sent to public repositories. */
  public gitPublicLinkbackMessagesEnabled: boolean;
  /** The unique identifier of the entity. */
  public id: string;
  /** The organization's logo URL. */
  public logoUrl?: string;
  /** The organization's name. */
  public name: string;
  /** Rolling 30-day total upload volume for the organization, in megabytes. */
  public periodUploadVolume: number;
  /** Previously used URL keys for the organization (last 3 are kept and redirected). */
  public previousUrlKeys: string[];
  /** The hour at which to prompt for project updates. */
  public projectUpdateRemindersHour: number;
  /** Whether the organization is using a roadmap. */
  public roadmapEnabled: boolean;
  /** Whether SAML authentication is enabled for organization. */
  public samlEnabled: boolean;
  /** Whether SCIM provisioning is enabled for organization. */
  public scimEnabled: boolean;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The organization's unique URL key. */
  public urlKey: string;
  /** Number of active users in the organization. */
  public userCount: number;
  /** The organization's subscription to a paid plan. */
  public subscription?: PaidSubscription;

  /** Integrations associated with the organization. */
  public integrations(variables?: L.Organization_IntegrationsQueryVariables) {
    return new Organization_IntegrationsQuery(this._request, variables).fetch(variables);
  }
  /** Labels associated with the organization. */
  public labels(variables?: L.Organization_LabelsQueryVariables) {
    return new Organization_LabelsQuery(this._request, variables).fetch(variables);
  }
  /** Teams associated with the organization. */
  public teams(variables?: L.Organization_TeamsQueryVariables) {
    return new Organization_TeamsQuery(this._request, variables).fetch(variables);
  }
  /** Templates associated with the organization. */
  public templates(variables?: L.Organization_TemplatesQueryVariables) {
    return new Organization_TemplatesQuery(this._request, variables).fetch(variables);
  }
  /** Users associated with the organization. */
  public users(variables?: L.Organization_UsersQueryVariables) {
    return new Organization_UsersQuery(this._request, variables).fetch(variables);
  }
  /** Delete's an organization. Administrator privileges required. */
  public delete(input: L.DeleteOrganizationInput) {
    return new DeleteOrganizationMutation(this._request).fetch(input);
  }
  /** Updates the user's organization. */
  public update(input: L.UpdateOrganizationInput) {
    return new UpdateOrganizationMutation(this._request).fetch(input);
  }
}
/**
 * OrganizationCancelDeletePayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.OrganizationCancelDeletePayloadFragment response data
 */
export class OrganizationCancelDeletePayload extends Request {
  public constructor(request: LinearRequest, data: L.OrganizationCancelDeletePayloadFragment) {
    super(request);
    this.success = data.success;
  }

  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * OrganizationDeletePayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.OrganizationDeletePayloadFragment response data
 */
export class OrganizationDeletePayload extends Request {
  public constructor(request: LinearRequest, data: L.OrganizationDeletePayloadFragment) {
    super(request);
    this.success = data.success;
  }

  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * Defines the use of a domain by an organization.
 *
 * @param request - function to call the graphql client
 * @param data - L.OrganizationDomainFragment response data
 */
export class OrganizationDomain extends Request {
  private _creator?: L.OrganizationDomainFragment["creator"];

  public constructor(request: LinearRequest, data: L.OrganizationDomainFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.claimed = data.claimed ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.name = data.name;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.verificationEmail = data.verificationEmail ?? undefined;
    this.verified = data.verified;
    this._creator = data.creator ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** Whether the domains was claimed by the organization through DNS verification. */
  public claimed?: boolean;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** Domain name */
  public name: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** E-mail used to verify this domain */
  public verificationEmail?: string;
  /** Is this domain verified */
  public verified: boolean;
  /** The user who added the domain. */
  public get creator(): LinearFetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }

  /** Deletes a domain. */
  public delete() {
    return new DeleteOrganizationDomainMutation(this._request).fetch(this.id);
  }
}
/**
 * OrganizationExistsPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.OrganizationExistsPayloadFragment response data
 */
export class OrganizationExistsPayload extends Request {
  public constructor(request: LinearRequest, data: L.OrganizationExistsPayloadFragment) {
    super(request);
    this.exists = data.exists;
    this.success = data.success;
  }

  /** Whether the organization exists. */
  public exists: boolean;
  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * An invitation to the organization that has been sent via email.
 *
 * @param request - function to call the graphql client
 * @param data - L.OrganizationInviteFragment response data
 */
export class OrganizationInvite extends Request {
  private _invitee?: L.OrganizationInviteFragment["invitee"];
  private _inviter: L.OrganizationInviteFragment["inviter"];

  public constructor(request: LinearRequest, data: L.OrganizationInviteFragment) {
    super(request);
    this.acceptedAt = parseDate(data.acceptedAt) ?? undefined;
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.email = data.email;
    this.expiresAt = parseDate(data.expiresAt) ?? undefined;
    this.external = data.external;
    this.id = data.id;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._invitee = data.invitee ?? undefined;
    this._inviter = data.inviter;
  }

  /** The time at which the invite was accepted. Null, if the invite hasn't been accepted */
  public acceptedAt?: Date;
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The invitees email address. */
  public email: string;
  /** The time at which the invite will be expiring. Null, if the invite shouldn't expire */
  public expiresAt?: Date;
  /** The invite was sent to external address. */
  public external: boolean;
  /** The unique identifier of the entity. */
  public id: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user who has accepted the invite. Null, if the invite hasn't been accepted. */
  public get invitee(): LinearFetch<User> | undefined {
    return this._invitee?.id ? new UserQuery(this._request).fetch(this._invitee?.id) : undefined;
  }
  /** The user who created the invitation. */
  public get inviter(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._inviter.id);
  }
  /** The organization that the invite is associated with. */
  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }

  /** Creates a new organization invite. */
  public create(input: L.OrganizationInviteCreateInput) {
    return new CreateOrganizationInviteMutation(this._request).fetch(input);
  }
  /** Deletes an organization invite. */
  public delete() {
    return new DeleteOrganizationInviteMutation(this._request).fetch(this.id);
  }
  /** Updates an organization invite. */
  public update(input: L.OrganizationInviteUpdateInput) {
    return new UpdateOrganizationInviteMutation(this._request).fetch(this.id, input);
  }
}
/**
 * OrganizationInviteConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this OrganizationInviteConnection model
 * @param data - OrganizationInviteConnection response data
 */
export class OrganizationInviteConnection extends Connection<OrganizationInvite> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<OrganizationInvite> | undefined>,
    data: L.OrganizationInviteConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new OrganizationInvite(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * OrganizationInviteDetailsPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.OrganizationInviteDetailsPayloadFragment response data
 */
export class OrganizationInviteDetailsPayload extends Request {
  public constructor(request: LinearRequest, data: L.OrganizationInviteDetailsPayloadFragment) {
    super(request);
    this.accepted = data.accepted;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.email = data.email;
    this.expired = data.expired;
    this.inviter = data.inviter;
    this.organizationId = data.organizationId;
    this.organizationLogoUrl = data.organizationLogoUrl ?? undefined;
    this.organizationName = data.organizationName;
  }

  /** Whether the invite has already been accepted. */
  public accepted: boolean;
  /** When the invite was created. */
  public createdAt: Date;
  /** The email of the invitee */
  public email: string;
  /** Whether the invite has expired. */
  public expired: boolean;
  /** The name of the inviter */
  public inviter: string;
  /** ID of the workspace the invite is for. */
  public organizationId: string;
  /** URL of the workspace logo the invite is for. */
  public organizationLogoUrl?: string;
  /** Name of the workspace the invite is for. */
  public organizationName: string;
}
/**
 * OrganizationInvitePayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.OrganizationInvitePayloadFragment response data
 */
export class OrganizationInvitePayload extends Request {
  private _organizationInvite: L.OrganizationInvitePayloadFragment["organizationInvite"];

  public constructor(request: LinearRequest, data: L.OrganizationInvitePayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._organizationInvite = data.organizationInvite;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The organization invite that was created or updated. */
  public get organizationInvite(): LinearFetch<OrganizationInvite> | undefined {
    return new OrganizationInviteQuery(this._request).fetch(this._organizationInvite.id);
  }
}
/**
 * OrganizationPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.OrganizationPayloadFragment response data
 */
export class OrganizationPayload extends Request {
  public constructor(request: LinearRequest, data: L.OrganizationPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The organization that was created or updated. */
  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
}
/**
 * PageInfo model
 *
 * @param request - function to call the graphql client
 * @param data - L.PageInfoFragment response data
 */
export class PageInfo extends Request {
  public constructor(request: LinearRequest, data: L.PageInfoFragment) {
    super(request);
    this.endCursor = data.endCursor ?? undefined;
    this.hasNextPage = data.hasNextPage;
    this.hasPreviousPage = data.hasPreviousPage;
    this.startCursor = data.startCursor ?? undefined;
  }

  /** Cursor representing the last result in the paginated results. */
  public endCursor?: string;
  /** Indicates if there are more results when paginating forward. */
  public hasNextPage: boolean;
  /** Indicates if there are more results when paginating backward. */
  public hasPreviousPage: boolean;
  /** Cursor representing the first result in the paginated results. */
  public startCursor?: string;
}
/**
 * The paid subscription of an organization.
 *
 * @param request - function to call the graphql client
 * @param data - L.PaidSubscriptionFragment response data
 */
export class PaidSubscription extends Request {
  private _creator?: L.PaidSubscriptionFragment["creator"];

  public constructor(request: LinearRequest, data: L.PaidSubscriptionFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.canceledAt = parseDate(data.canceledAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.nextBillingAt = parseDate(data.nextBillingAt) ?? undefined;
    this.pendingChangeType = data.pendingChangeType ?? undefined;
    this.seats = data.seats;
    this.seatsMaximum = data.seatsMaximum ?? undefined;
    this.seatsMinimum = data.seatsMinimum ?? undefined;
    this.type = data.type;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._creator = data.creator ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The date the subscription was canceled, if any. */
  public canceledAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The date the subscription will be billed next. */
  public nextBillingAt?: Date;
  /** The subscription type of a pending change. Null if no change pending. */
  public pendingChangeType?: string;
  /** The number of seats in the subscription. */
  public seats: number;
  /** The maximum number of seats that will be billed in the subscription. */
  public seatsMaximum?: number;
  /** The minimum number of seats that will be billed in the subscription. */
  public seatsMinimum?: number;
  /** The subscription type. */
  public type: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The creator of the subscription. */
  public get creator(): LinearFetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The organization that the subscription is associated with. */
  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
}
/**
 * A personal note for a user
 *
 * @param request - function to call the graphql client
 * @param data - L.PersonalNoteFragment response data
 */
export class PersonalNote extends Request {
  private _user: L.PersonalNoteFragment["user"];

  public constructor(request: LinearRequest, data: L.PersonalNoteFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.contentData = parseJson(data.contentData) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._user = data.user;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The note content as JSON. */
  public contentData?: Record<string, unknown>;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user that owns the note. */
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }
}
/**
 * A project.
 *
 * @param request - function to call the graphql client
 * @param data - L.ProjectFragment response data
 */
export class Project extends Request {
  private _convertedFromIssue?: L.ProjectFragment["convertedFromIssue"];
  private _creator: L.ProjectFragment["creator"];
  private _integrationsSettings?: L.ProjectFragment["integrationsSettings"];
  private _lead?: L.ProjectFragment["lead"];

  public constructor(request: LinearRequest, data: L.ProjectFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.autoArchivedAt = parseDate(data.autoArchivedAt) ?? undefined;
    this.canceledAt = parseDate(data.canceledAt) ?? undefined;
    this.color = data.color;
    this.completedAt = parseDate(data.completedAt) ?? undefined;
    this.completedIssueCountHistory = data.completedIssueCountHistory;
    this.completedScopeHistory = data.completedScopeHistory;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.description = data.description;
    this.icon = data.icon ?? undefined;
    this.id = data.id;
    this.inProgressScopeHistory = data.inProgressScopeHistory;
    this.issueCountHistory = data.issueCountHistory;
    this.name = data.name;
    this.progress = data.progress;
    this.projectUpdateRemindersPausedUntilAt = parseDate(data.projectUpdateRemindersPausedUntilAt) ?? undefined;
    this.scope = data.scope;
    this.scopeHistory = data.scopeHistory;
    this.slackIssueComments = data.slackIssueComments;
    this.slackIssueStatuses = data.slackIssueStatuses;
    this.slackNewIssue = data.slackNewIssue;
    this.slugId = data.slugId;
    this.sortOrder = data.sortOrder;
    this.startedAt = parseDate(data.startedAt) ?? undefined;
    this.state = data.state;
    this.targetDate = data.targetDate ?? undefined;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.url = data.url;
    this._convertedFromIssue = data.convertedFromIssue ?? undefined;
    this._creator = data.creator;
    this._integrationsSettings = data.integrationsSettings ?? undefined;
    this._lead = data.lead ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the project was automatically archived by the auto pruning process. */
  public autoArchivedAt?: Date;
  /** The time at which the project was moved into canceled state. */
  public canceledAt?: Date;
  /** The project's color. */
  public color: string;
  /** The time at which the project was moved into completed state. */
  public completedAt?: Date;
  /** The number of completed issues in the project after each week. */
  public completedIssueCountHistory: number[];
  /** The number of completed estimation points after each week. */
  public completedScopeHistory: number[];
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The project's description. */
  public description: string;
  /** The icon of the project. */
  public icon?: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** The number of in progress estimation points after each week. */
  public inProgressScopeHistory: number[];
  /** The total number of issues in the project after each week. */
  public issueCountHistory: number[];
  /** The project's name. */
  public name: string;
  /** The overall progress of the project. This is the (completed estimate points + 0.25 * in progress estimate points) / total estimate points. */
  public progress: number;
  /** The time until which project update reminders are paused. */
  public projectUpdateRemindersPausedUntilAt?: Date;
  /** The overall scope (total estimate points) of the project. */
  public scope: number;
  /** The total number of estimation points after each week. */
  public scopeHistory: number[];
  /** Whether to send new issue comment notifications to Slack. */
  public slackIssueComments: boolean;
  /** Whether to send new issue status updates to Slack. */
  public slackIssueStatuses: boolean;
  /** Whether to send new issue notifications to Slack. */
  public slackNewIssue: boolean;
  /** The project's unique URL slug. */
  public slugId: string;
  /** The sort order for the project within the organizion. */
  public sortOrder: number;
  /** The time at which the project was moved into started state. */
  public startedAt?: Date;
  /** The type of the state. */
  public state: string;
  /** The estimated completion date of the project. */
  public targetDate?: L.Scalars["TimelessDate"];
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** Project URL. */
  public url: string;
  /** The project was created based on this issue. */
  public get convertedFromIssue(): LinearFetch<Issue> | undefined {
    return this._convertedFromIssue?.id ? new IssueQuery(this._request).fetch(this._convertedFromIssue?.id) : undefined;
  }
  /** The user who created the project. */
  public get creator(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._creator.id);
  }
  /** Settings for all integrations associated with that project. */
  public get integrationsSettings(): LinearFetch<IntegrationsSettings> | undefined {
    return this._integrationsSettings?.id
      ? new IntegrationsSettingsQuery(this._request).fetch(this._integrationsSettings?.id)
      : undefined;
  }
  /** The project lead. */
  public get lead(): LinearFetch<User> | undefined {
    return this._lead?.id ? new UserQuery(this._request).fetch(this._lead?.id) : undefined;
  }
  /** Documents associated with the project. */
  public documents(variables?: Omit<L.Project_DocumentsQueryVariables, "id">) {
    return new Project_DocumentsQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Issues associated with the project. */
  public issues(variables?: Omit<L.Project_IssuesQueryVariables, "id">) {
    return new Project_IssuesQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Links associated with the project. */
  public links(variables?: Omit<L.Project_LinksQueryVariables, "id">) {
    return new Project_LinksQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Users that are members of the project. */
  public members(variables?: Omit<L.Project_MembersQueryVariables, "id">) {
    return new Project_MembersQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Project updates associated with the project. */
  public projectUpdates(variables?: Omit<L.Project_ProjectUpdatesQueryVariables, "id">) {
    return new Project_ProjectUpdatesQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Teams associated with this project. */
  public teams(variables?: Omit<L.Project_TeamsQueryVariables, "id">) {
    return new Project_TeamsQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Archives a project. */
  public archive() {
    return new ArchiveProjectMutation(this._request).fetch(this.id);
  }
  /** Creates a new project. */
  public create(input: L.ProjectCreateInput) {
    return new CreateProjectMutation(this._request).fetch(input);
  }
  /** Deletes a project. All issues will be disassociated from the deleted project. */
  public delete() {
    return new DeleteProjectMutation(this._request).fetch(this.id);
  }
  /** Unarchives a project. */
  public unarchive() {
    return new UnarchiveProjectMutation(this._request).fetch(this.id);
  }
  /** Updates a project. */
  public update(input: L.ProjectUpdateInput) {
    return new UpdateProjectMutation(this._request).fetch(this.id, input);
  }
}
/**
 * ProjectConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this ProjectConnection model
 * @param data - ProjectConnection response data
 */
export class ProjectConnection extends Connection<Project> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<Project> | undefined>,
    data: L.ProjectConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new Project(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * An external link for a project.
 *
 * @param request - function to call the graphql client
 * @param data - L.ProjectLinkFragment response data
 */
export class ProjectLink extends Request {
  private _creator: L.ProjectLinkFragment["creator"];
  private _project: L.ProjectLinkFragment["project"];

  public constructor(request: LinearRequest, data: L.ProjectLinkFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.label = data.label;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.url = data.url;
    this._creator = data.creator;
    this._project = data.project;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The link's label. */
  public label: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The link's URL. */
  public url: string;
  /** The user who created the link. */
  public get creator(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._creator.id);
  }
  /** The project that the link is associated with. */
  public get project(): LinearFetch<Project> | undefined {
    return new ProjectQuery(this._request).fetch(this._project.id);
  }

  /** Creates a new project link. */
  public create(input: L.ProjectLinkCreateInput) {
    return new CreateProjectLinkMutation(this._request).fetch(input);
  }
  /** Deletes a project link. */
  public delete() {
    return new DeleteProjectLinkMutation(this._request).fetch(this.id);
  }
  /** Updates a project link. */
  public update(input: L.ProjectLinkUpdateInput) {
    return new UpdateProjectLinkMutation(this._request).fetch(this.id, input);
  }
}
/**
 * ProjectLinkConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this ProjectLinkConnection model
 * @param data - ProjectLinkConnection response data
 */
export class ProjectLinkConnection extends Connection<ProjectLink> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<ProjectLink> | undefined>,
    data: L.ProjectLinkConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new ProjectLink(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * ProjectLinkPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.ProjectLinkPayloadFragment response data
 */
export class ProjectLinkPayload extends Request {
  private _projectLink: L.ProjectLinkPayloadFragment["projectLink"];

  public constructor(request: LinearRequest, data: L.ProjectLinkPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._projectLink = data.projectLink;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The project that was created or updated. */
  public get projectLink(): LinearFetch<ProjectLink> | undefined {
    return new ProjectLinkQuery(this._request).fetch(this._projectLink.id);
  }
}
/**
 * A milestone for a project.
 *
 * @param request - function to call the graphql client
 * @param data - L.ProjectMilestoneFragment response data
 */
export class ProjectMilestone extends Request {
  private _project: L.ProjectMilestoneFragment["project"];

  public constructor(request: LinearRequest, data: L.ProjectMilestoneFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.description = data.description ?? undefined;
    this.id = data.id;
    this.name = data.name;
    this.targetDate = data.targetDate ?? undefined;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._project = data.project;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The description of the project milestone. */
  public description?: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** The name of the project milestone. */
  public name: string;
  /** The planned completion date of the milestone. */
  public targetDate?: L.Scalars["TimelessDate"];
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The project of the milestone. */
  public get project(): LinearFetch<Project> | undefined {
    return new ProjectQuery(this._request).fetch(this._project.id);
  }

  /** Creates a new project milestone. */
  public create(input: L.ProjectMilestoneCreateInput) {
    return new CreateProjectMilestoneMutation(this._request).fetch(input);
  }
  /** Deletes a project milestone. */
  public delete() {
    return new DeleteProjectMilestoneMutation(this._request).fetch(this.id);
  }
  /** Updates a project milestone. */
  public update(input: L.ProjectMilestoneUpdateInput) {
    return new UpdateProjectMilestoneMutation(this._request).fetch(this.id, input);
  }
}
/**
 * ProjectMilestoneConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this ProjectMilestoneConnection model
 * @param data - ProjectMilestoneConnection response data
 */
export class ProjectMilestoneConnection extends Connection<ProjectMilestone> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<ProjectMilestone> | undefined>,
    data: L.ProjectMilestoneConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new ProjectMilestone(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * ProjectMilestonePayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.ProjectMilestonePayloadFragment response data
 */
export class ProjectMilestonePayload extends Request {
  private _projectMilestone: L.ProjectMilestonePayloadFragment["projectMilestone"];

  public constructor(request: LinearRequest, data: L.ProjectMilestonePayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._projectMilestone = data.projectMilestone;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The project milestone that was created or updated. */
  public get projectMilestone(): LinearFetch<ProjectMilestone> | undefined {
    return new ProjectMilestoneQuery(this._request).fetch(this._projectMilestone.id);
  }
}
/**
 * A project related notification
 *
 * @param request - function to call the graphql client
 * @param data - L.ProjectNotificationFragment response data
 */
export class ProjectNotification extends Request {
  private _actor?: L.ProjectNotificationFragment["actor"];
  private _project: L.ProjectNotificationFragment["project"];
  private _projectUpdate?: L.ProjectNotificationFragment["projectUpdate"];
  private _user: L.ProjectNotificationFragment["user"];

  public constructor(request: LinearRequest, data: L.ProjectNotificationFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.emailedAt = parseDate(data.emailedAt) ?? undefined;
    this.id = data.id;
    this.readAt = parseDate(data.readAt) ?? undefined;
    this.snoozedUntilAt = parseDate(data.snoozedUntilAt) ?? undefined;
    this.type = data.type;
    this.unsnoozedAt = parseDate(data.unsnoozedAt) ?? undefined;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._actor = data.actor ?? undefined;
    this._project = data.project;
    this._projectUpdate = data.projectUpdate ?? undefined;
    this._user = data.user;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /**
   * The time at when an email reminder for this notification was sent to the user. Null, if no email
   *     reminder has been sent.
   */
  public emailedAt?: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The time at when the user marked the notification as read. Null, if the the user hasn't read the notification */
  public readAt?: Date;
  /** The time until a notification will be snoozed. After that it will appear in the inbox again. */
  public snoozedUntilAt?: Date;
  /** Notification type */
  public type: string;
  /** The time at which a notification was unsnoozed.. */
  public unsnoozedAt?: Date;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user that caused the notification. If empty it's Linear itself. */
  public get actor(): LinearFetch<User> | undefined {
    return this._actor?.id ? new UserQuery(this._request).fetch(this._actor?.id) : undefined;
  }
  /** The project related to the notification. */
  public get project(): LinearFetch<Project> | undefined {
    return new ProjectQuery(this._request).fetch(this._project.id);
  }
  /** The project update related to the notification. */
  public get projectUpdate(): LinearFetch<ProjectUpdate> | undefined {
    return this._projectUpdate?.id ? new ProjectUpdateQuery(this._request).fetch(this._projectUpdate?.id) : undefined;
  }
  /** The user that received the notification. */
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }
}
/**
 * A project notification subscription.
 *
 * @param request - function to call the graphql client
 * @param data - L.ProjectNotificationSubscriptionFragment response data
 */
export class ProjectNotificationSubscription extends Request {
  private _project: L.ProjectNotificationSubscriptionFragment["project"];
  private _team?: L.ProjectNotificationSubscriptionFragment["team"];
  private _user: L.ProjectNotificationSubscriptionFragment["user"];

  public constructor(request: LinearRequest, data: L.ProjectNotificationSubscriptionFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.type = data.type;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._project = data.project;
    this._team = data.team ?? undefined;
    this._user = data.user;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The type of the subscription. */
  public type: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The project subscribed to. */
  public get project(): LinearFetch<Project> | undefined {
    return new ProjectQuery(this._request).fetch(this._project.id);
  }
  /** Subscribed team. */
  public get team(): LinearFetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
  /** The user associated with notification subscriptions. */
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }
}
/**
 * ProjectPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.ProjectPayloadFragment response data
 */
export class ProjectPayload extends Request {
  private _project?: L.ProjectPayloadFragment["project"];

  public constructor(request: LinearRequest, data: L.ProjectPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._project = data.project ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The project that was created or updated. */
  public get project(): LinearFetch<Project> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
}
/**
 * A update associated with an project.
 *
 * @param request - function to call the graphql client
 * @param data - L.ProjectUpdateFragment response data
 */
export class ProjectUpdate extends Request {
  private _project: L.ProjectUpdateFragment["project"];
  private _user: L.ProjectUpdateFragment["user"];

  public constructor(request: LinearRequest, data: L.ProjectUpdateFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.body = data.body;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.editedAt = parseDate(data.editedAt) ?? undefined;
    this.id = data.id;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.url = data.url;
    this._project = data.project;
    this._user = data.user;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The update content in markdown format. */
  public body: string;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The time the project update was edited. */
  public editedAt?: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The URL to the project update. */
  public url: string;
  /** The project that the update is associated with. */
  public get project(): LinearFetch<Project> | undefined {
    return new ProjectQuery(this._request).fetch(this._project.id);
  }
  /** The user who wrote the update. */
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }

  /** Creates a new project update. */
  public create(input: L.ProjectUpdateCreateInput) {
    return new CreateProjectUpdateMutation(this._request).fetch(input);
  }
  /** Deletes a project update. */
  public delete() {
    return new DeleteProjectUpdateMutation(this._request).fetch(this.id);
  }
  /** Updates a project update. */
  public update(input: L.ProjectUpdateUpdateInput) {
    return new UpdateProjectUpdateMutation(this._request).fetch(this.id, input);
  }
}
/**
 * ProjectUpdateConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this ProjectUpdateConnection model
 * @param data - ProjectUpdateConnection response data
 */
export class ProjectUpdateConnection extends Connection<ProjectUpdate> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<ProjectUpdate> | undefined>,
    data: L.ProjectUpdateConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new ProjectUpdate(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * Holds information about when a user has interacted with a project update.
 *
 * @param request - function to call the graphql client
 * @param data - L.ProjectUpdateInteractionFragment response data
 */
export class ProjectUpdateInteraction extends Request {
  private _projectUpdate: L.ProjectUpdateInteractionFragment["projectUpdate"];
  private _user: L.ProjectUpdateInteractionFragment["user"];

  public constructor(request: LinearRequest, data: L.ProjectUpdateInteractionFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.readAt = parseDate(data.readAt) ?? new Date();
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._projectUpdate = data.projectUpdate;
    this._user = data.user;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The time at which the user read the project update. */
  public readAt: Date;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The project update that has been interacted with. */
  public get projectUpdate(): LinearFetch<ProjectUpdate> | undefined {
    return new ProjectUpdateQuery(this._request).fetch(this._projectUpdate.id);
  }
  /** The user that has interacted with the project update. */
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }

  /** Creates a new interaction on a project update. */
  public create(input: L.ProjectUpdateInteractionCreateInput) {
    return new CreateProjectUpdateInteractionMutation(this._request).fetch(input);
  }
}
/**
 * ProjectUpdateInteractionConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this ProjectUpdateInteractionConnection model
 * @param data - ProjectUpdateInteractionConnection response data
 */
export class ProjectUpdateInteractionConnection extends Connection<ProjectUpdateInteraction> {
  public constructor(
    request: LinearRequest,
    fetch: (
      connection?: LinearConnectionVariables
    ) => LinearFetch<LinearConnection<ProjectUpdateInteraction> | undefined>,
    data: L.ProjectUpdateInteractionConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new ProjectUpdateInteraction(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * ProjectUpdateInteractionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.ProjectUpdateInteractionPayloadFragment response data
 */
export class ProjectUpdateInteractionPayload extends Request {
  private _projectUpdateInteraction: L.ProjectUpdateInteractionPayloadFragment["projectUpdateInteraction"];

  public constructor(request: LinearRequest, data: L.ProjectUpdateInteractionPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._projectUpdateInteraction = data.projectUpdateInteraction;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The project update interaction that was created or updated. */
  public get projectUpdateInteraction(): LinearFetch<ProjectUpdateInteraction> | undefined {
    return new ProjectUpdateInteractionQuery(this._request).fetch(this._projectUpdateInteraction.id);
  }
}
/**
 * ProjectUpdatePayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.ProjectUpdatePayloadFragment response data
 */
export class ProjectUpdatePayload extends Request {
  private _projectUpdate: L.ProjectUpdatePayloadFragment["projectUpdate"];

  public constructor(request: LinearRequest, data: L.ProjectUpdatePayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._projectUpdate = data.projectUpdate;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The project update that was created or updated. */
  public get projectUpdate(): LinearFetch<ProjectUpdate> | undefined {
    return new ProjectUpdateQuery(this._request).fetch(this._projectUpdate.id);
  }
}
/**
 * ProjectUpdateWithInteractionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.ProjectUpdateWithInteractionPayloadFragment response data
 */
export class ProjectUpdateWithInteractionPayload extends Request {
  private _interaction: L.ProjectUpdateWithInteractionPayloadFragment["interaction"];
  private _projectUpdate: L.ProjectUpdateWithInteractionPayloadFragment["projectUpdate"];

  public constructor(request: LinearRequest, data: L.ProjectUpdateWithInteractionPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._interaction = data.interaction;
    this._projectUpdate = data.projectUpdate;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The project update that was created or updated. */
  public get interaction(): LinearFetch<ProjectUpdateInteraction> | undefined {
    return new ProjectUpdateInteractionQuery(this._request).fetch(this._interaction.id);
  }
  /** The project update that was created or updated. */
  public get projectUpdate(): LinearFetch<ProjectUpdate> | undefined {
    return new ProjectUpdateQuery(this._request).fetch(this._projectUpdate.id);
  }
}
/**
 * A user's web browser push notification subscription.
 *
 * @param request - function to call the graphql client
 * @param data - L.PushSubscriptionFragment response data
 */
export class PushSubscription extends Request {
  public constructor(request: LinearRequest, data: L.PushSubscriptionFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;

  /** Creates a push subscription. */
  public create(input: L.PushSubscriptionCreateInput) {
    return new CreatePushSubscriptionMutation(this._request).fetch(input);
  }
  /** Deletes a push subscription. */
  public delete() {
    return new DeletePushSubscriptionMutation(this._request).fetch(this.id);
  }
}
/**
 * PushSubscriptionConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this PushSubscriptionConnection model
 * @param data - PushSubscriptionConnection response data
 */
export class PushSubscriptionConnection extends Connection<PushSubscription> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<PushSubscription> | undefined>,
    data: L.PushSubscriptionConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new PushSubscription(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * PushSubscriptionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.PushSubscriptionPayloadFragment response data
 */
export class PushSubscriptionPayload extends Request {
  public constructor(request: LinearRequest, data: L.PushSubscriptionPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * PushSubscriptionTestPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.PushSubscriptionTestPayloadFragment response data
 */
export class PushSubscriptionTestPayload extends Request {
  public constructor(request: LinearRequest, data: L.PushSubscriptionTestPayloadFragment) {
    super(request);
    this.success = data.success;
  }

  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * RateLimitPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.RateLimitPayloadFragment response data
 */
export class RateLimitPayload extends Request {
  public constructor(request: LinearRequest, data: L.RateLimitPayloadFragment) {
    super(request);
    this.identifier = data.identifier ?? undefined;
    this.kind = data.kind;
    this.limits = data.limits.map(node => new RateLimitResultPayload(request, node));
  }

  /** The identifier we rate limit on. */
  public identifier?: string;
  /** The kind of rate limit selected for this request. */
  public kind: string;
  /** The state of the rate limit. */
  public limits: RateLimitResultPayload[];
}
/**
 * RateLimitResultPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.RateLimitResultPayloadFragment response data
 */
export class RateLimitResultPayload extends Request {
  public constructor(request: LinearRequest, data: L.RateLimitResultPayloadFragment) {
    super(request);
    this.allowedAmount = data.allowedAmount;
    this.period = data.period;
    this.remainingAmount = data.remainingAmount;
    this.requestedAmount = data.requestedAmount;
    this.reset = data.reset;
    this.type = data.type;
  }

  /** The total allowed quantity for this type of limit. */
  public allowedAmount: number;
  /** The period in which the rate limit is fully replenished in ms. */
  public period: number;
  /** The remaining quantity for this type of limit after this request. */
  public remainingAmount: number;
  /** The requested quantity for this type of limit. */
  public requestedAmount: number;
  /** The timestamp after the rate limit is fully replenished as a UNIX timestamp. */
  public reset: number;
  /** What is being rate limited. */
  public type: string;
}
/**
 * A reaction associated with a comment or a project update.
 *
 * @param request - function to call the graphql client
 * @param data - L.ReactionFragment response data
 */
export class Reaction extends Request {
  private _user: L.ReactionFragment["user"];

  public constructor(request: LinearRequest, data: L.ReactionFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.emoji = data.emoji;
    this.id = data.id;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._user = data.user;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** Name of the reaction's emoji. */
  public emoji: string;
  /** The unique identifier of the entity. */
  public id: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user who reacted. */
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }

  /** Creates a new reaction. */
  public create(input: L.ReactionCreateInput) {
    return new CreateReactionMutation(this._request).fetch(input);
  }
  /** Deletes a reaction. */
  public delete() {
    return new DeleteReactionMutation(this._request).fetch(this.id);
  }
}
/**
 * ReactionConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this ReactionConnection model
 * @param data - ReactionConnection response data
 */
export class ReactionConnection extends Connection<Reaction> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<Reaction> | undefined>,
    data: L.ReactionConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new Reaction(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * ReactionPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.ReactionPayloadFragment response data
 */
export class ReactionPayload extends Request {
  public constructor(request: LinearRequest, data: L.ReactionPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this.reaction = new Reaction(request, data.reaction);
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  public success: boolean;
  public reaction: Reaction;
}
/**
 * A roadmap for projects.
 *
 * @param request - function to call the graphql client
 * @param data - L.RoadmapFragment response data
 */
export class Roadmap extends Request {
  private _creator: L.RoadmapFragment["creator"];
  private _owner: L.RoadmapFragment["owner"];

  public constructor(request: LinearRequest, data: L.RoadmapFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.description = data.description ?? undefined;
    this.id = data.id;
    this.name = data.name;
    this.slugId = data.slugId;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._creator = data.creator;
    this._owner = data.owner;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The description of the roadmap. */
  public description?: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** The name of the roadmap. */
  public name: string;
  /** The roadmap's unique URL slug. */
  public slugId: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user who created the roadmap. */
  public get creator(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._creator.id);
  }
  /** The organization of the roadmap. */
  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** The user who owns the roadmap. */
  public get owner(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._owner.id);
  }
  /** Projects associated with the roadmap. */
  public projects(variables?: Omit<L.Roadmap_ProjectsQueryVariables, "id">) {
    return new Roadmap_ProjectsQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Creates a new roadmap. */
  public create(input: L.RoadmapCreateInput) {
    return new CreateRoadmapMutation(this._request).fetch(input);
  }
  /** Deletes a roadmap. */
  public delete() {
    return new DeleteRoadmapMutation(this._request).fetch(this.id);
  }
  /** Updates a roadmap. */
  public update(input: L.RoadmapUpdateInput) {
    return new UpdateRoadmapMutation(this._request).fetch(this.id, input);
  }
}
/**
 * RoadmapConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this RoadmapConnection model
 * @param data - RoadmapConnection response data
 */
export class RoadmapConnection extends Connection<Roadmap> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<Roadmap> | undefined>,
    data: L.RoadmapConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new Roadmap(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * RoadmapPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.RoadmapPayloadFragment response data
 */
export class RoadmapPayload extends Request {
  private _roadmap: L.RoadmapPayloadFragment["roadmap"];

  public constructor(request: LinearRequest, data: L.RoadmapPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._roadmap = data.roadmap;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The roadmap that was created or updated. */
  public get roadmap(): LinearFetch<Roadmap> | undefined {
    return new RoadmapQuery(this._request).fetch(this._roadmap.id);
  }
}
/**
 * Join table between projects and roadmaps
 *
 * @param request - function to call the graphql client
 * @param data - L.RoadmapToProjectFragment response data
 */
export class RoadmapToProject extends Request {
  private _project: L.RoadmapToProjectFragment["project"];
  private _roadmap: L.RoadmapToProjectFragment["roadmap"];

  public constructor(request: LinearRequest, data: L.RoadmapToProjectFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.sortOrder = data.sortOrder;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._project = data.project;
    this._roadmap = data.roadmap;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The sort order of the project within the roadmap. */
  public sortOrder: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The project that the roadmap is associated with. */
  public get project(): LinearFetch<Project> | undefined {
    return new ProjectQuery(this._request).fetch(this._project.id);
  }
  /** The roadmap that the project is associated with. */
  public get roadmap(): LinearFetch<Roadmap> | undefined {
    return new RoadmapQuery(this._request).fetch(this._roadmap.id);
  }

  /** Creates a new roadmapToProject join. */
  public create(input: L.RoadmapToProjectCreateInput) {
    return new CreateRoadmapToProjectMutation(this._request).fetch(input);
  }
  /** Deletes a roadmapToProject. */
  public delete() {
    return new DeleteRoadmapToProjectMutation(this._request).fetch(this.id);
  }
  /** Updates a roadmapToProject. */
  public update(input: L.RoadmapToProjectUpdateInput) {
    return new UpdateRoadmapToProjectMutation(this._request).fetch(this.id, input);
  }
}
/**
 * RoadmapToProjectConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this RoadmapToProjectConnection model
 * @param data - RoadmapToProjectConnection response data
 */
export class RoadmapToProjectConnection extends Connection<RoadmapToProject> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<RoadmapToProject> | undefined>,
    data: L.RoadmapToProjectConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new RoadmapToProject(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * RoadmapToProjectPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.RoadmapToProjectPayloadFragment response data
 */
export class RoadmapToProjectPayload extends Request {
  private _roadmapToProject: L.RoadmapToProjectPayloadFragment["roadmapToProject"];

  public constructor(request: LinearRequest, data: L.RoadmapToProjectPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._roadmapToProject = data.roadmapToProject;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The roadmapToProject that was created or updated. */
  public get roadmapToProject(): LinearFetch<RoadmapToProject> | undefined {
    return new RoadmapToProjectQuery(this._request).fetch(this._roadmapToProject.id);
  }
}
/**
 * SamlConfiguration model
 *
 * @param request - function to call the graphql client
 * @param data - L.SamlConfigurationFragment response data
 */
export class SamlConfiguration extends Request {
  public constructor(request: LinearRequest, data: L.SamlConfigurationFragment) {
    super(request);
    this.issuerEntityId = data.issuerEntityId ?? undefined;
    this.ssoBinding = data.ssoBinding ?? undefined;
    this.ssoEndpoint = data.ssoEndpoint ?? undefined;
    this.ssoSignAlgo = data.ssoSignAlgo ?? undefined;
    this.ssoSigningCert = data.ssoSigningCert ?? undefined;
  }

  /** The issuer's custom entity ID. */
  public issuerEntityId?: string;
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
 * The organization's SAML configuration
 *
 * @param request - function to call the graphql client
 * @param data - L.SamlConfigurationPayloadFragment response data
 */
export class SamlConfigurationPayload extends Request {
  public constructor(request: LinearRequest, data: L.SamlConfigurationPayloadFragment) {
    super(request);
    this.issuerEntityId = data.issuerEntityId ?? undefined;
    this.ssoBinding = data.ssoBinding ?? undefined;
    this.ssoEndpoint = data.ssoEndpoint ?? undefined;
    this.ssoSignAlgo = data.ssoSignAlgo ?? undefined;
  }

  /** The issuer's custom entity ID. */
  public issuerEntityId?: string;
  /** Binding method for authentication call. Can be either `post` (default) or `redirect`. */
  public ssoBinding?: string;
  /** Sign in endpoint URL for the identity provider. */
  public ssoEndpoint?: string;
  /** The algorithm of the Signing Certificate. Can be one of `sha1`, `sha256` (default), or `sha512`. */
  public ssoSignAlgo?: string;
}
/**
 * Sentry specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - L.SentrySettingsFragment response data
 */
export class SentrySettings extends Request {
  public constructor(request: LinearRequest, data: L.SentrySettingsFragment) {
    super(request);
    this.organizationSlug = data.organizationSlug;
  }

  /** The slug of the Sentry organization being connected. */
  public organizationSlug: string;
}
/**
 * Slack notification specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - L.SlackPostSettingsFragment response data
 */
export class SlackPostSettings extends Request {
  public constructor(request: LinearRequest, data: L.SlackPostSettingsFragment) {
    super(request);
    this.channel = data.channel;
    this.channelId = data.channelId;
    this.configurationUrl = data.configurationUrl;
  }

  public channel: string;
  public channelId: string;
  public configurationUrl: string;
}
/**
 * SsoUrlFromEmailResponse model
 *
 * @param request - function to call the graphql client
 * @param data - L.SsoUrlFromEmailResponseFragment response data
 */
export class SsoUrlFromEmailResponse extends Request {
  public constructor(request: LinearRequest, data: L.SsoUrlFromEmailResponseFragment) {
    super(request);
    this.samlSsoUrl = data.samlSsoUrl;
    this.success = data.success;
  }

  /** SAML SSO sign-in URL. */
  public samlSsoUrl: string;
  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * Contains either the full serialized state of the application or delta packets that the requester can
 *   apply to the local data set in order to be up-to-date.
 *
 * @param request - function to call the graphql client
 * @param data - L.SyncResponseFragment response data
 */
export class SyncResponse extends Request {
  public constructor(request: LinearRequest, data: L.SyncResponseFragment) {
    super(request);
    this.databaseVersion = data.databaseVersion;
    this.delta = data.delta ?? undefined;
    this.lastSyncId = data.lastSyncId;
    this.state = data.state ?? undefined;
    this.subscribedSyncGroups = data.subscribedSyncGroups;
  }

  /** The version of the remote database. Incremented by 1 for each migration run on the database. */
  public databaseVersion: number;
  /**
   * JSON serialized delta changes that the client can apply to its local state
   *     in order to catch up with the state of the world.
   */
  public delta?: string;
  /** The last sync id covered by the response. */
  public lastSyncId: number;
  /**
   * The full state of the organization as a serialized JSON object.
   *     Mutually exclusive with the delta property
   */
  public state?: string;
  /** The sync groups that the user is subscribed to. */
  public subscribedSyncGroups: string[];
}
/**
 * SynchronizedPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.SynchronizedPayloadFragment response data
 */
export class SynchronizedPayload extends Request {
  public constructor(request: LinearRequest, data: L.SynchronizedPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
}
/**
 * An organizational unit that contains issues.
 *
 * @param request - function to call the graphql client
 * @param data - L.TeamFragment response data
 */
export class Team extends Request {
  private _activeCycle?: L.TeamFragment["activeCycle"];
  private _defaultIssueState?: L.TeamFragment["defaultIssueState"];
  private _defaultTemplateForMembers?: L.TeamFragment["defaultTemplateForMembers"];
  private _defaultTemplateForNonMembers?: L.TeamFragment["defaultTemplateForNonMembers"];
  private _draftWorkflowState?: L.TeamFragment["draftWorkflowState"];
  private _integrationsSettings?: L.TeamFragment["integrationsSettings"];
  private _markedAsDuplicateWorkflowState?: L.TeamFragment["markedAsDuplicateWorkflowState"];
  private _mergeWorkflowState?: L.TeamFragment["mergeWorkflowState"];
  private _reviewWorkflowState?: L.TeamFragment["reviewWorkflowState"];
  private _startWorkflowState?: L.TeamFragment["startWorkflowState"];
  private _triageIssueState?: L.TeamFragment["triageIssueState"];

  public constructor(request: LinearRequest, data: L.TeamFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.autoArchivePeriod = data.autoArchivePeriod;
    this.autoClosePeriod = data.autoClosePeriod ?? undefined;
    this.autoCloseStateId = data.autoCloseStateId ?? undefined;
    this.color = data.color ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.cycleCalenderUrl = data.cycleCalenderUrl;
    this.cycleCooldownTime = data.cycleCooldownTime;
    this.cycleDuration = data.cycleDuration;
    this.cycleIssueAutoAssignCompleted = data.cycleIssueAutoAssignCompleted;
    this.cycleIssueAutoAssignStarted = data.cycleIssueAutoAssignStarted;
    this.cycleLockToActive = data.cycleLockToActive;
    this.cycleStartDay = data.cycleStartDay;
    this.cyclesEnabled = data.cyclesEnabled;
    this.defaultIssueEstimate = data.defaultIssueEstimate;
    this.defaultTemplateForMembersId = data.defaultTemplateForMembersId ?? undefined;
    this.defaultTemplateForNonMembersId = data.defaultTemplateForNonMembersId ?? undefined;
    this.description = data.description ?? undefined;
    this.groupIssueHistory = data.groupIssueHistory;
    this.icon = data.icon ?? undefined;
    this.id = data.id;
    this.inviteHash = data.inviteHash;
    this.issueEstimationAllowZero = data.issueEstimationAllowZero;
    this.issueEstimationExtended = data.issueEstimationExtended;
    this.issueEstimationType = data.issueEstimationType;
    this.issueOrderingNoPriorityFirst = data.issueOrderingNoPriorityFirst;
    this.issueSortOrderDefaultToBottom = data.issueSortOrderDefaultToBottom;
    this.key = data.key;
    this.name = data.name;
    this.private = data.private;
    this.requirePriorityToLeaveTriage = data.requirePriorityToLeaveTriage;
    this.slackIssueComments = data.slackIssueComments;
    this.slackIssueStatuses = data.slackIssueStatuses;
    this.slackNewIssue = data.slackNewIssue;
    this.timezone = data.timezone;
    this.triageEnabled = data.triageEnabled;
    this.upcomingCycleCount = data.upcomingCycleCount;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._activeCycle = data.activeCycle ?? undefined;
    this._defaultIssueState = data.defaultIssueState ?? undefined;
    this._defaultTemplateForMembers = data.defaultTemplateForMembers ?? undefined;
    this._defaultTemplateForNonMembers = data.defaultTemplateForNonMembers ?? undefined;
    this._draftWorkflowState = data.draftWorkflowState ?? undefined;
    this._integrationsSettings = data.integrationsSettings ?? undefined;
    this._markedAsDuplicateWorkflowState = data.markedAsDuplicateWorkflowState ?? undefined;
    this._mergeWorkflowState = data.mergeWorkflowState ?? undefined;
    this._reviewWorkflowState = data.reviewWorkflowState ?? undefined;
    this._startWorkflowState = data.startWorkflowState ?? undefined;
    this._triageIssueState = data.triageIssueState ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** Period after which automatically closed and completed issues are automatically archived in months. */
  public autoArchivePeriod: number;
  /** Period after which issues are automatically closed in months. Null/undefined means disabled. */
  public autoClosePeriod?: number;
  /** The canceled workflow state which auto closed issues will be set to. Defaults to the first canceled state. */
  public autoCloseStateId?: string;
  /** The team's color. */
  public color?: string;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** Calendar feed URL (iCal) for cycles. */
  public cycleCalenderUrl: string;
  /** The cooldown time after each cycle in weeks. */
  public cycleCooldownTime: number;
  /** The duration of a cycle in weeks. */
  public cycleDuration: number;
  /** Auto assign completed issues to current cycle. */
  public cycleIssueAutoAssignCompleted: boolean;
  /** Auto assign started issues to current cycle. */
  public cycleIssueAutoAssignStarted: boolean;
  /** Only allow issues issues with cycles in Active Issues. */
  public cycleLockToActive: boolean;
  /** The day of the week that a new cycle starts. */
  public cycleStartDay: number;
  /** Whether the team uses cycles. */
  public cyclesEnabled: boolean;
  /** What to use as an default estimate for unestimated issues. */
  public defaultIssueEstimate: number;
  /** The id of the default template to use for new issues created by members of the team. */
  public defaultTemplateForMembersId?: string;
  /** The id of the default template to use for new issues created by non-members of the team. */
  public defaultTemplateForNonMembersId?: string;
  /** The team's description. */
  public description?: string;
  /** Whether to group recent issue history entries. */
  public groupIssueHistory: boolean;
  /** The icon of the team. */
  public icon?: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** Unique hash for the team to be used in invite URLs. */
  public inviteHash: string;
  /** Whether to allow zeros in issues estimates. */
  public issueEstimationAllowZero: boolean;
  /** Whether to add additional points to the estimate scale. */
  public issueEstimationExtended: boolean;
  /** The issue estimation type to use. */
  public issueEstimationType: string;
  /** Whether issues without priority should be sorted first. */
  public issueOrderingNoPriorityFirst: boolean;
  /** Whether to move issues to bottom of the column when changing state. */
  public issueSortOrderDefaultToBottom: boolean;
  /** The team's unique key. The key is used in URLs. */
  public key: string;
  /** The team's name. */
  public name: string;
  /** Whether the team is private or not. */
  public private: boolean;
  /** Whether an issue needs to have a priority set before leaving triage */
  public requirePriorityToLeaveTriage: boolean;
  /** Whether to send new issue comment notifications to Slack. */
  public slackIssueComments: boolean;
  /** Whether to send new issue status updates to Slack. */
  public slackIssueStatuses: boolean;
  /** Whether to send new issue notifications to Slack. */
  public slackNewIssue: boolean;
  /** The timezone of the team. Defaults to "America/Los_Angeles" */
  public timezone: string;
  /** Whether triage mode is enabled for the team or not. */
  public triageEnabled: boolean;
  /** How many upcoming cycles to create. */
  public upcomingCycleCount: number;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** Team's currently active cycle. */
  public get activeCycle(): LinearFetch<Cycle> | undefined {
    return this._activeCycle?.id ? new CycleQuery(this._request).fetch(this._activeCycle?.id) : undefined;
  }
  /** The default workflow state into which issues are set when they are opened by team members. */
  public get defaultIssueState(): LinearFetch<WorkflowState> | undefined {
    return this._defaultIssueState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._defaultIssueState?.id)
      : undefined;
  }
  /** The default template to use for new issues created by members of the team. */
  public get defaultTemplateForMembers(): LinearFetch<Template> | undefined {
    return this._defaultTemplateForMembers?.id
      ? new TemplateQuery(this._request).fetch(this._defaultTemplateForMembers?.id)
      : undefined;
  }
  /** The default template to use for new issues created by non-members of the team. */
  public get defaultTemplateForNonMembers(): LinearFetch<Template> | undefined {
    return this._defaultTemplateForNonMembers?.id
      ? new TemplateQuery(this._request).fetch(this._defaultTemplateForNonMembers?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when a PR has been opened as draft. */
  public get draftWorkflowState(): LinearFetch<WorkflowState> | undefined {
    return this._draftWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._draftWorkflowState?.id)
      : undefined;
  }
  /** Settings for all integrations associated with that team. */
  public get integrationsSettings(): LinearFetch<IntegrationsSettings> | undefined {
    return this._integrationsSettings?.id
      ? new IntegrationsSettingsQuery(this._request).fetch(this._integrationsSettings?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when they are marked as a duplicate of another issue. Defaults to the first canceled state. */
  public get markedAsDuplicateWorkflowState(): LinearFetch<WorkflowState> | undefined {
    return this._markedAsDuplicateWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._markedAsDuplicateWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when a PR has been merged. */
  public get mergeWorkflowState(): LinearFetch<WorkflowState> | undefined {
    return this._mergeWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._mergeWorkflowState?.id)
      : undefined;
  }
  /** The organization that the team is associated with. */
  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** The workflow state into which issues are moved when a review has been requested for the PR. */
  public get reviewWorkflowState(): LinearFetch<WorkflowState> | undefined {
    return this._reviewWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._reviewWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are moved when a PR has been opened. */
  public get startWorkflowState(): LinearFetch<WorkflowState> | undefined {
    return this._startWorkflowState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._startWorkflowState?.id)
      : undefined;
  }
  /** The workflow state into which issues are set when they are opened by non-team members or integrations if triage is enabled. */
  public get triageIssueState(): LinearFetch<WorkflowState> | undefined {
    return this._triageIssueState?.id
      ? new WorkflowStateQuery(this._request).fetch(this._triageIssueState?.id)
      : undefined;
  }
  /** Cycles associated with the team. */
  public cycles(variables?: Omit<L.Team_CyclesQueryVariables, "id">) {
    return new Team_CyclesQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Issues associated with the team. */
  public issues(variables?: Omit<L.Team_IssuesQueryVariables, "id">) {
    return new Team_IssuesQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Labels associated with the team. */
  public labels(variables?: Omit<L.Team_LabelsQueryVariables, "id">) {
    return new Team_LabelsQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Users who are members of this team. */
  public members(variables?: Omit<L.Team_MembersQueryVariables, "id">) {
    return new Team_MembersQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Memberships associated with the team. For easier access of the same data, use `members` query. */
  public memberships(variables?: Omit<L.Team_MembershipsQueryVariables, "id">) {
    return new Team_MembershipsQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Projects associated with the team. */
  public projects(variables?: Omit<L.Team_ProjectsQueryVariables, "id">) {
    return new Team_ProjectsQuery(this._request, this.id, variables).fetch(variables);
  }
  /** The states that define the workflow associated with the team. */
  public states(variables?: Omit<L.Team_StatesQueryVariables, "id">) {
    return new Team_StatesQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Templates associated with the team. */
  public templates(variables?: Omit<L.Team_TemplatesQueryVariables, "id">) {
    return new Team_TemplatesQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Webhooks associated with the team. */
  public webhooks(variables?: Omit<L.Team_WebhooksQueryVariables, "id">) {
    return new Team_WebhooksQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Creates a new team. The user who creates the team will automatically be added as a member to the newly created team. */
  public create(input: L.TeamCreateInput, variables?: Omit<L.CreateTeamMutationVariables, "input">) {
    return new CreateTeamMutation(this._request).fetch(input, variables);
  }
  /** Deletes a team. */
  public delete() {
    return new DeleteTeamMutation(this._request).fetch(this.id);
  }
  /** Updates a team. */
  public update(input: L.TeamUpdateInput) {
    return new UpdateTeamMutation(this._request).fetch(this.id, input);
  }
}
/**
 * TeamConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this TeamConnection model
 * @param data - TeamConnection response data
 */
export class TeamConnection extends Connection<Team> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<Team> | undefined>,
    data: L.TeamConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new Team(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * Defines the membership of a user to a team.
 *
 * @param request - function to call the graphql client
 * @param data - L.TeamMembershipFragment response data
 */
export class TeamMembership extends Request {
  private _team: L.TeamMembershipFragment["team"];
  private _user: L.TeamMembershipFragment["user"];

  public constructor(request: LinearRequest, data: L.TeamMembershipFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.owner = data.owner ?? undefined;
    this.sortOrder = data.sortOrder;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._team = data.team;
    this._user = data.user;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** Whether the user is the owner of the team */
  public owner?: boolean;
  /** The order of the item in the users team list. */
  public sortOrder: number;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The team that the membership is associated with. */
  public get team(): LinearFetch<Team> | undefined {
    return new TeamQuery(this._request).fetch(this._team.id);
  }
  /** The user that the membership is associated with. */
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }

  /** Creates a new team membership. */
  public create(input: L.TeamMembershipCreateInput) {
    return new CreateTeamMembershipMutation(this._request).fetch(input);
  }
  /** Deletes a team membership. */
  public delete() {
    return new DeleteTeamMembershipMutation(this._request).fetch(this.id);
  }
  /** Updates a team membership. */
  public update(input: L.TeamMembershipUpdateInput) {
    return new UpdateTeamMembershipMutation(this._request).fetch(this.id, input);
  }
}
/**
 * TeamMembershipConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this TeamMembershipConnection model
 * @param data - TeamMembershipConnection response data
 */
export class TeamMembershipConnection extends Connection<TeamMembership> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<TeamMembership> | undefined>,
    data: L.TeamMembershipConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new TeamMembership(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * TeamMembershipPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.TeamMembershipPayloadFragment response data
 */
export class TeamMembershipPayload extends Request {
  private _teamMembership?: L.TeamMembershipPayloadFragment["teamMembership"];

  public constructor(request: LinearRequest, data: L.TeamMembershipPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._teamMembership = data.teamMembership ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The team membership that was created or updated. */
  public get teamMembership(): LinearFetch<TeamMembership> | undefined {
    return this._teamMembership?.id
      ? new TeamMembershipQuery(this._request).fetch(this._teamMembership?.id)
      : undefined;
  }
}
/**
 * A team notification subscription.
 *
 * @param request - function to call the graphql client
 * @param data - L.TeamNotificationSubscriptionFragment response data
 */
export class TeamNotificationSubscription extends Request {
  private _project?: L.TeamNotificationSubscriptionFragment["project"];
  private _team: L.TeamNotificationSubscriptionFragment["team"];
  private _user: L.TeamNotificationSubscriptionFragment["user"];

  public constructor(request: LinearRequest, data: L.TeamNotificationSubscriptionFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.type = data.type;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._project = data.project ?? undefined;
    this._team = data.team;
    this._user = data.user;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The type of the subscription. */
  public type: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** Subscribed project. */
  public get project(): LinearFetch<Project> | undefined {
    return this._project?.id ? new ProjectQuery(this._request).fetch(this._project?.id) : undefined;
  }
  /** The team subscribed to. */
  public get team(): LinearFetch<Team> | undefined {
    return new TeamQuery(this._request).fetch(this._team.id);
  }
  /** The user associated with notification subscriptions. */
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }
}
/**
 * TeamPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.TeamPayloadFragment response data
 */
export class TeamPayload extends Request {
  private _team?: L.TeamPayloadFragment["team"];

  public constructor(request: LinearRequest, data: L.TeamPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._team = data.team ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The team that was created or updated. */
  public get team(): LinearFetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
}
/**
 * A template object used for creating entities faster.
 *
 * @param request - function to call the graphql client
 * @param data - L.TemplateFragment response data
 */
export class Template extends Request {
  private _creator?: L.TemplateFragment["creator"];
  private _lastUpdatedBy?: L.TemplateFragment["lastUpdatedBy"];
  private _team?: L.TemplateFragment["team"];

  public constructor(request: LinearRequest, data: L.TemplateFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.description = data.description ?? undefined;
    this.id = data.id;
    this.name = data.name;
    this.templateData = parseJson(data.templateData) ?? {};
    this.type = data.type;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._creator = data.creator ?? undefined;
    this._lastUpdatedBy = data.lastUpdatedBy ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** Template description. */
  public description?: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** The name of the template. */
  public name: string;
  /** Template data. */
  public templateData: Record<string, unknown>;
  /** The entity type this template is for. */
  public type: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user who created the template. */
  public get creator(): LinearFetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The user who last updated the template. */
  public get lastUpdatedBy(): LinearFetch<User> | undefined {
    return this._lastUpdatedBy?.id ? new UserQuery(this._request).fetch(this._lastUpdatedBy?.id) : undefined;
  }
  /** The organization that the template is associated with. If null, the template is associated with a particular team. */
  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** The team that the template is associated with. If null, the template is global to the workspace. */
  public get team(): LinearFetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }

  /** Creates a new template. */
  public create(input: L.TemplateCreateInput) {
    return new CreateTemplateMutation(this._request).fetch(input);
  }
  /** Deletes a template. */
  public delete() {
    return new DeleteTemplateMutation(this._request).fetch(this.id);
  }
  /** Updates an existing template. */
  public update(input: L.TemplateUpdateInput) {
    return new UpdateTemplateMutation(this._request).fetch(this.id, input);
  }
}
/**
 * TemplateConnection model
 *
 * @param request - function to call the graphql client
 * @param data - L.TemplateConnectionFragment response data
 */
export class TemplateConnection extends Request {
  public constructor(request: LinearRequest, data: L.TemplateConnectionFragment) {
    super(request);
    this.pageInfo = new PageInfo(request, data.pageInfo);
  }

  public pageInfo: PageInfo;
  public get nodes(): LinearFetch<Template[]> {
    return new TemplatesQuery(this._request).fetch();
  }
}
/**
 * TemplatePayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.TemplatePayloadFragment response data
 */
export class TemplatePayload extends Request {
  private _template: L.TemplatePayloadFragment["template"];

  public constructor(request: LinearRequest, data: L.TemplatePayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._template = data.template;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The template that was created or updated. */
  public get template(): LinearFetch<Template> | undefined {
    return new TemplateQuery(this._request).fetch(this._template.id);
  }
}
/**
 * Object representing Google Cloud upload policy, plus additional data.
 *
 * @param request - function to call the graphql client
 * @param data - L.UploadFileFragment response data
 */
export class UploadFile extends Request {
  public constructor(request: LinearRequest, data: L.UploadFileFragment) {
    super(request);
    this.assetUrl = data.assetUrl;
    this.contentType = data.contentType;
    this.filename = data.filename;
    this.metaData = parseJson(data.metaData) ?? undefined;
    this.size = data.size;
    this.uploadUrl = data.uploadUrl;
    this.headers = data.headers.map(node => new UploadFileHeader(request, node));
  }

  /** The asset URL for the uploaded file. (assigned automatically) */
  public assetUrl: string;
  /** The content type. */
  public contentType: string;
  /** The filename. */
  public filename: string;
  public metaData?: Record<string, unknown>;
  /** The size of the uploaded file. */
  public size: number;
  /** The signed URL the for the uploaded file. (assigned automatically) */
  public uploadUrl: string;
  public headers: UploadFileHeader[];
}
/**
 * UploadFileHeader model
 *
 * @param request - function to call the graphql client
 * @param data - L.UploadFileHeaderFragment response data
 */
export class UploadFileHeader extends Request {
  public constructor(request: LinearRequest, data: L.UploadFileHeaderFragment) {
    super(request);
    this.key = data.key;
    this.value = data.value;
  }

  /** Upload file header key. */
  public key: string;
  /** Upload file header value. */
  public value: string;
}
/**
 * UploadPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.UploadPayloadFragment response data
 */
export class UploadPayload extends Request {
  public constructor(request: LinearRequest, data: L.UploadPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this.uploadFile = data.uploadFile ? new UploadFile(request, data.uploadFile) : undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** Object describing the file to be uploaded. */
  public uploadFile?: UploadFile;
}
/**
 * A user that has access to the the resources of an organization.
 *
 * @param request - function to call the graphql client
 * @param data - L.UserFragment response data
 */
export class User extends Request {
  public constructor(request: LinearRequest, data: L.UserFragment) {
    super(request);
    this.active = data.active;
    this.admin = data.admin;
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.avatarUrl = data.avatarUrl ?? undefined;
    this.calendarHash = data.calendarHash ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.createdIssueCount = data.createdIssueCount;
    this.description = data.description ?? undefined;
    this.disableReason = data.disableReason ?? undefined;
    this.displayName = data.displayName;
    this.email = data.email;
    this.guest = data.guest;
    this.id = data.id;
    this.inviteHash = data.inviteHash;
    this.isMe = data.isMe;
    this.lastSeen = parseDate(data.lastSeen) ?? undefined;
    this.name = data.name;
    this.statusEmoji = data.statusEmoji ?? undefined;
    this.statusLabel = data.statusLabel ?? undefined;
    this.statusUntilAt = parseDate(data.statusUntilAt) ?? undefined;
    this.timezone = data.timezone ?? undefined;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.url = data.url;
  }

  /** Whether the user account is active or disabled (suspended). */
  public active: boolean;
  /** Whether the user is an organization administrator. */
  public admin: boolean;
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** An URL to the user's avatar image. */
  public avatarUrl?: string;
  /** Hash for the user to be used in calendar URLs. */
  public calendarHash?: string;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** Number of issues created. */
  public createdIssueCount: number;
  /** A short description of the user, either its title or bio. */
  public description?: string;
  /** Reason why is the account disabled. */
  public disableReason?: string;
  /** The user's display (nick) name. Unique within each organization. */
  public displayName: string;
  /** The user's email address. */
  public email: string;
  /** Whether the user is a guest in the workspace and limited to accessing a subset of teams. */
  public guest: boolean;
  /** The unique identifier of the entity. */
  public id: string;
  /** Unique hash for the user to be used in invite URLs. */
  public inviteHash: string;
  /** Whether the user is the currently authenticated user. */
  public isMe: boolean;
  /** The last time the user was seen online. If null, the user is currently online. */
  public lastSeen?: Date;
  /** The user's full name. */
  public name: string;
  /** The emoji to represent the user current status. */
  public statusEmoji?: string;
  /** The label of the user current status. */
  public statusLabel?: string;
  /** A date at which the user current status should be cleared. */
  public statusUntilAt?: Date;
  /** The local timezone of the user. */
  public timezone?: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** User's profile URL. */
  public url: string;
  /** Organization the user belongs to. */
  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /** Issues assigned to the user. */
  public assignedIssues(variables?: Omit<L.User_AssignedIssuesQueryVariables, "id">) {
    return new User_AssignedIssuesQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Issues created by the user. */
  public createdIssues(variables?: Omit<L.User_CreatedIssuesQueryVariables, "id">) {
    return new User_CreatedIssuesQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Memberships associated with the user. For easier access of the same data, use `teams` query. */
  public teamMemberships(variables?: Omit<L.User_TeamMembershipsQueryVariables, "id">) {
    return new User_TeamMembershipsQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Teams the user is part of. */
  public teams(variables?: Omit<L.User_TeamsQueryVariables, "id">) {
    return new User_TeamsQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Suspends a user. Can only be called by an admin. */
  public suspend() {
    return new SuspendUserMutation(this._request).fetch(this.id);
  }
  /** Un-suspends a user. Can only be called by an admin. */
  public unsuspend() {
    return new UnsuspendUserMutation(this._request).fetch(this.id);
  }
  /** Updates a user. Only available to organization admins and the user themselves. */
  public update(input: L.UpdateUserInput) {
    return new UpdateUserMutation(this._request).fetch(this.id, input);
  }
}
/**
 * A user account.
 *
 * @param request - function to call the graphql client
 * @param data - L.UserAccountFragment response data
 */
export class UserAccount extends Request {
  public constructor(request: LinearRequest, data: L.UserAccountFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.email = data.email;
    this.id = data.id;
    this.name = data.name ?? undefined;
    this.service = data.service;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.users = data.users.map(node => new User(request, node));
  }

  /** The time at which the model was archived. */
  public archivedAt?: Date;
  /** The time at which the model was created. */
  public createdAt: Date;
  /** The user's email address. */
  public email: string;
  /** The models identifier. */
  public id: string;
  /** The user's name. */
  public name?: string;
  /** The authentication service used to create the account. */
  public service: string;
  /** The time at which the model was updated. */
  public updatedAt: Date;
  /** Users belonging to the account. */
  public users: User[];
}
/**
 * UserAdminPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.UserAdminPayloadFragment response data
 */
export class UserAdminPayload extends Request {
  public constructor(request: LinearRequest, data: L.UserAdminPayloadFragment) {
    super(request);
    this.success = data.success;
  }

  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * Public information of the OAuth application, plus whether the application has been authorized for the given scopes.
 *
 * @param request - function to call the graphql client
 * @param data - L.UserAuthorizedApplicationFragment response data
 */
export class UserAuthorizedApplication extends Request {
  public constructor(request: LinearRequest, data: L.UserAuthorizedApplicationFragment) {
    super(request);
    this.approvalErrorCode = data.approvalErrorCode ?? undefined;
    this.clientId = data.clientId;
    this.createdByLinear = data.createdByLinear;
    this.description = data.description ?? undefined;
    this.developer = data.developer;
    this.developerUrl = data.developerUrl;
    this.id = data.id;
    this.imageUrl = data.imageUrl ?? undefined;
    this.isAuthorized = data.isAuthorized;
    this.name = data.name;
    this.webhooksEnabled = data.webhooksEnabled;
  }

  /** Error associated with the application needing to be requested for approval in the workspace */
  public approvalErrorCode?: string;
  /** OAuth application's client ID. */
  public clientId: string;
  /** Whether the application was created by Linear. */
  public createdByLinear: boolean;
  /** Information about the application. */
  public description?: string;
  /** Name of the developer. */
  public developer: string;
  /** Url of the developer (homepage or docs). */
  public developerUrl: string;
  /** OAuth application's ID. */
  public id: string;
  /** Image of the application. */
  public imageUrl?: string;
  /** Whether the user has authorized the application for the given scopes. */
  public isAuthorized: boolean;
  /** Application name. */
  public name: string;
  /** Whether or not webhooks are enabled for the application. */
  public webhooksEnabled: boolean;
}
/**
 * UserConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this UserConnection model
 * @param data - UserConnection response data
 */
export class UserConnection extends Connection<User> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<User> | undefined>,
    data: L.UserConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new User(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * UserPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.UserPayloadFragment response data
 */
export class UserPayload extends Request {
  private _user?: L.UserPayloadFragment["user"];

  public constructor(request: LinearRequest, data: L.UserPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._user = data.user ?? undefined;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The user that was created or updated. */
  public get user(): LinearFetch<User> | undefined {
    return this._user?.id ? new UserQuery(this._request).fetch(this._user?.id) : undefined;
  }
}
/**
 * The settings of a user as a JSON object.
 *
 * @param request - function to call the graphql client
 * @param data - L.UserSettingsFragment response data
 */
export class UserSettings extends Request {
  private _user: L.UserSettingsFragment["user"];

  public constructor(request: LinearRequest, data: L.UserSettingsFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.notificationPreferences = parseJson(data.notificationPreferences) ?? {};
    this.unsubscribedFrom = data.unsubscribedFrom;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._user = data.user;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The notification channel settings the user has selected. */
  public notificationPreferences: Record<string, unknown>;
  /** The email types the user has unsubscribed from. */
  public unsubscribedFrom: string[];
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user associated with these settings. */
  public get user(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._user.id);
  }

  /** Updates the user's settings. */
  public update(input: L.UserSettingsUpdateInput) {
    return new UpdateUserSettingsMutation(this._request).fetch(this.id, input);
  }
}
/**
 * UserSettingsFlagPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.UserSettingsFlagPayloadFragment response data
 */
export class UserSettingsFlagPayload extends Request {
  public constructor(request: LinearRequest, data: L.UserSettingsFlagPayloadFragment) {
    super(request);
    this.flag = data.flag;
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this.value = data.value;
  }

  /** The flag key which was updated. */
  public flag: string;
  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The flag value after update. */
  public value: number;
}
/**
 * UserSettingsFlagsResetPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.UserSettingsFlagsResetPayloadFragment response data
 */
export class UserSettingsFlagsResetPayload extends Request {
  public constructor(request: LinearRequest, data: L.UserSettingsFlagsResetPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
}
/**
 * UserSettingsPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.UserSettingsPayloadFragment response data
 */
export class UserSettingsPayload extends Request {
  public constructor(request: LinearRequest, data: L.UserSettingsPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The user's settings. */
  public get userSettings(): LinearFetch<UserSettings> {
    return new UserSettingsQuery(this._request).fetch();
  }
}
/**
 * View preferences.
 *
 * @param request - function to call the graphql client
 * @param data - L.ViewPreferencesFragment response data
 */
export class ViewPreferences extends Request {
  public constructor(request: LinearRequest, data: L.ViewPreferencesFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.id = data.id;
    this.type = data.type;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.viewType = data.viewType;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The unique identifier of the entity. */
  public id: string;
  /** The view preference type. */
  public type: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The view type. */
  public viewType: string;

  /** Creates a new ViewPreferences object. */
  public create(input: L.ViewPreferencesCreateInput) {
    return new CreateViewPreferencesMutation(this._request).fetch(input);
  }
  /** Deletes a ViewPreferences. */
  public delete() {
    return new DeleteViewPreferencesMutation(this._request).fetch(this.id);
  }
  /** Updates an existing ViewPreferences object. */
  public update(input: L.ViewPreferencesUpdateInput) {
    return new UpdateViewPreferencesMutation(this._request).fetch(this.id, input);
  }
}
/**
 * ViewPreferencesPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.ViewPreferencesPayloadFragment response data
 */
export class ViewPreferencesPayload extends Request {
  public constructor(request: LinearRequest, data: L.ViewPreferencesPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this.viewPreferences = new ViewPreferences(request, data.viewPreferences);
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The view preferences entity being mutated. */
  public viewPreferences: ViewPreferences;
}
/**
 * A webhook used to send HTTP notifications over data updates
 *
 * @param request - function to call the graphql client
 * @param data - L.WebhookFragment response data
 */
export class Webhook extends Request {
  private _creator?: L.WebhookFragment["creator"];
  private _team?: L.WebhookFragment["team"];

  public constructor(request: LinearRequest, data: L.WebhookFragment) {
    super(request);
    this.allPublicTeams = data.allPublicTeams;
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.enabled = data.enabled;
    this.id = data.id;
    this.label = data.label ?? undefined;
    this.resourceTypes = data.resourceTypes;
    this.secret = data.secret ?? undefined;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this.url = data.url ?? undefined;
    this._creator = data.creator ?? undefined;
    this._team = data.team ?? undefined;
  }

  /** Whether the Webhook is enabled for all public teams, including teams created after the webhook was created. */
  public allPublicTeams: boolean;
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** Whether the Webhook is enabled. */
  public enabled: boolean;
  /** The unique identifier of the entity. */
  public id: string;
  /** Webhook label */
  public label?: string;
  /** The resource types this webhook is subscribed to. */
  public resourceTypes: string[];
  /** Secret token for verifying the origin on the recipient side. */
  public secret?: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** Webhook URL */
  public url?: string;
  /** The user who created the webhook. */
  public get creator(): LinearFetch<User> | undefined {
    return this._creator?.id ? new UserQuery(this._request).fetch(this._creator?.id) : undefined;
  }
  /** The team that the webhook is associated with. If null, the webhook is associated with all public teams of the organization. */
  public get team(): LinearFetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }

  /** Creates a new webhook. */
  public create(input: L.WebhookCreateInput) {
    return new CreateWebhookMutation(this._request).fetch(input);
  }
  /** Deletes a Webhook. */
  public delete() {
    return new DeleteWebhookMutation(this._request).fetch(this.id);
  }
  /** Updates an existing Webhook. */
  public update(input: L.WebhookUpdateInput) {
    return new UpdateWebhookMutation(this._request).fetch(this.id, input);
  }
}
/**
 * WebhookConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this WebhookConnection model
 * @param data - WebhookConnection response data
 */
export class WebhookConnection extends Connection<Webhook> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<Webhook> | undefined>,
    data: L.WebhookConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new Webhook(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * WebhookPayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.WebhookPayloadFragment response data
 */
export class WebhookPayload extends Request {
  private _webhook: L.WebhookPayloadFragment["webhook"];

  public constructor(request: LinearRequest, data: L.WebhookPayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._webhook = data.webhook;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The webhook entity being mutated. */
  public get webhook(): LinearFetch<Webhook> | undefined {
    return new WebhookQuery(this._request).fetch(this._webhook.id);
  }
}
/**
 * WorkflowCronJobDefinition model
 *
 * @param request - function to call the graphql client
 * @param data - L.WorkflowCronJobDefinitionFragment response data
 */
export class WorkflowCronJobDefinition extends Request {
  private _creator: L.WorkflowCronJobDefinitionFragment["creator"];
  private _team: L.WorkflowCronJobDefinitionFragment["team"];

  public constructor(request: LinearRequest, data: L.WorkflowCronJobDefinitionFragment) {
    super(request);
    this.activities = parseJson(data.activities) ?? {};
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.description = data.description ?? undefined;
    this.enabled = data.enabled;
    this.id = data.id;
    this.name = data.name;
    this.schedule = parseJson(data.schedule) ?? {};
    this.sortOrder = data.sortOrder;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._creator = data.creator;
    this._team = data.team;
  }

  /** An array of activities that will be executed as part of the workflow cron job. */
  public activities: Record<string, unknown>;
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The description of the workflow cron job. */
  public description?: string;
  public enabled: boolean;
  /** The unique identifier of the entity. */
  public id: string;
  /** The name of the workflow cron job. */
  public name: string;
  /** Cron schedule which is used to execute the workflow cron job. */
  public schedule: Record<string, unknown>;
  /** The sort order of the workflow cron job definition within its siblings. */
  public sortOrder: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user who created the workflow cron job. */
  public get creator(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._creator.id);
  }
  /** The team associated with the workflow cron job. */
  public get team(): LinearFetch<Team> | undefined {
    return new TeamQuery(this._request).fetch(this._team.id);
  }
}
/**
 * WorkflowCronJobDefinitionConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this WorkflowCronJobDefinitionConnection model
 * @param data - WorkflowCronJobDefinitionConnection response data
 */
export class WorkflowCronJobDefinitionConnection extends Connection<WorkflowCronJobDefinition> {
  public constructor(
    request: LinearRequest,
    fetch: (
      connection?: LinearConnectionVariables
    ) => LinearFetch<LinearConnection<WorkflowCronJobDefinition> | undefined>,
    data: L.WorkflowCronJobDefinitionConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new WorkflowCronJobDefinition(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * WorkflowDefinition model
 *
 * @param request - function to call the graphql client
 * @param data - L.WorkflowDefinitionFragment response data
 */
export class WorkflowDefinition extends Request {
  private _creator: L.WorkflowDefinitionFragment["creator"];
  private _team?: L.WorkflowDefinitionFragment["team"];

  public constructor(request: LinearRequest, data: L.WorkflowDefinitionFragment) {
    super(request);
    this.activities = parseJson(data.activities) ?? {};
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.conditions = parseJson(data.conditions) ?? {};
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.description = data.description ?? undefined;
    this.enabled = data.enabled;
    this.groupName = data.groupName ?? undefined;
    this.id = data.id;
    this.name = data.name;
    this.sortOrder = data.sortOrder;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._creator = data.creator;
    this._team = data.team ?? undefined;
  }

  /** An array of activities that will be executed as part of the workflow. */
  public activities: Record<string, unknown>;
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The conditions that need to be match for the workflow to be triggered. */
  public conditions: Record<string, unknown>;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** The description of the workflow. */
  public description?: string;
  public enabled: boolean;
  /** The name of the group that the workflow belongs to. */
  public groupName?: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** The name of the workflow. */
  public name: string;
  /** The sort order of the workflow definition within its siblings. */
  public sortOrder: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The user who created the workflow. */
  public get creator(): LinearFetch<User> | undefined {
    return new UserQuery(this._request).fetch(this._creator.id);
  }
  /** The team associated with the workflow. If not set, the workflow is associated with the entire organization. */
  public get team(): LinearFetch<Team> | undefined {
    return this._team?.id ? new TeamQuery(this._request).fetch(this._team?.id) : undefined;
  }
}
/**
 * WorkflowDefinitionConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this WorkflowDefinitionConnection model
 * @param data - WorkflowDefinitionConnection response data
 */
export class WorkflowDefinitionConnection extends Connection<WorkflowDefinition> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<WorkflowDefinition> | undefined>,
    data: L.WorkflowDefinitionConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new WorkflowDefinition(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * A state in a team workflow.
 *
 * @param request - function to call the graphql client
 * @param data - L.WorkflowStateFragment response data
 */
export class WorkflowState extends Request {
  private _team: L.WorkflowStateFragment["team"];

  public constructor(request: LinearRequest, data: L.WorkflowStateFragment) {
    super(request);
    this.archivedAt = parseDate(data.archivedAt) ?? undefined;
    this.color = data.color;
    this.createdAt = parseDate(data.createdAt) ?? new Date();
    this.description = data.description ?? undefined;
    this.id = data.id;
    this.name = data.name;
    this.position = data.position;
    this.type = data.type;
    this.updatedAt = parseDate(data.updatedAt) ?? new Date();
    this._team = data.team;
  }

  /** The time at which the entity was archived. Null if the entity has not been archived. */
  public archivedAt?: Date;
  /** The state's UI color as a HEX string. */
  public color: string;
  /** The time at which the entity was created. */
  public createdAt: Date;
  /** Description of the state. */
  public description?: string;
  /** The unique identifier of the entity. */
  public id: string;
  /** The state's name. */
  public name: string;
  /** The position of the state in the team flow. */
  public position: number;
  /** The type of the state. */
  public type: string;
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  public updatedAt: Date;
  /** The team to which this state belongs to. */
  public get team(): LinearFetch<Team> | undefined {
    return new TeamQuery(this._request).fetch(this._team.id);
  }
  /** Issues belonging in this state. */
  public issues(variables?: Omit<L.WorkflowState_IssuesQueryVariables, "id">) {
    return new WorkflowState_IssuesQuery(this._request, this.id, variables).fetch(variables);
  }
  /** Archives a state. Only states with issues that have all been archived can be archived. */
  public archive() {
    return new ArchiveWorkflowStateMutation(this._request).fetch(this.id);
  }
  /** Creates a new state, adding it to the workflow of a team. */
  public create(input: L.WorkflowStateCreateInput) {
    return new CreateWorkflowStateMutation(this._request).fetch(input);
  }
  /** Updates a state. */
  public update(input: L.WorkflowStateUpdateInput) {
    return new UpdateWorkflowStateMutation(this._request).fetch(this.id, input);
  }
}
/**
 * WorkflowStateConnection model
 *
 * @param request - function to call the graphql client
 * @param fetch - function to trigger a refetch of this WorkflowStateConnection model
 * @param data - WorkflowStateConnection response data
 */
export class WorkflowStateConnection extends Connection<WorkflowState> {
  public constructor(
    request: LinearRequest,
    fetch: (connection?: LinearConnectionVariables) => LinearFetch<LinearConnection<WorkflowState> | undefined>,
    data: L.WorkflowStateConnectionFragment
  ) {
    super(
      request,
      fetch,
      data.nodes.map(node => new WorkflowState(request, node)),
      new PageInfo(request, data.pageInfo)
    );
  }
}
/**
 * WorkflowStatePayload model
 *
 * @param request - function to call the graphql client
 * @param data - L.WorkflowStatePayloadFragment response data
 */
export class WorkflowStatePayload extends Request {
  private _workflowState: L.WorkflowStatePayloadFragment["workflowState"];

  public constructor(request: LinearRequest, data: L.WorkflowStatePayloadFragment) {
    super(request);
    this.lastSyncId = data.lastSyncId;
    this.success = data.success;
    this._workflowState = data.workflowState;
  }

  /** The identifier of the last sync operation. */
  public lastSyncId: number;
  /** Whether the operation was successful. */
  public success: boolean;
  /** The state that was created or updated. */
  public get workflowState(): LinearFetch<WorkflowState> | undefined {
    return new WorkflowStateQuery(this._request).fetch(this._workflowState.id);
  }
}
/**
 * Zendesk specific settings.
 *
 * @param request - function to call the graphql client
 * @param data - L.ZendeskSettingsFragment response data
 */
export class ZendeskSettings extends Request {
  public constructor(request: LinearRequest, data: L.ZendeskSettingsFragment) {
    super(request);
    this.automateTicketReopeningOnCancellation = data.automateTicketReopeningOnCancellation ?? undefined;
    this.automateTicketReopeningOnComment = data.automateTicketReopeningOnComment ?? undefined;
    this.automateTicketReopeningOnCompletion = data.automateTicketReopeningOnCompletion ?? undefined;
    this.botUserId = data.botUserId ?? undefined;
    this.sendNoteOnComment = data.sendNoteOnComment ?? undefined;
    this.sendNoteOnStatusChange = data.sendNoteOnStatusChange ?? undefined;
    this.subdomain = data.subdomain;
    this.url = data.url;
  }

  /** Whether a ticket should be automatically reopened when its linked Linear issue is cancelled. */
  public automateTicketReopeningOnCancellation?: boolean;
  /** Whether a ticket should be automatically reopened when a comment is posted on its linked Linear issue */
  public automateTicketReopeningOnComment?: boolean;
  /** Whether a ticket should be automatically reopened when its linked Linear issue is completed. */
  public automateTicketReopeningOnCompletion?: boolean;
  /** The ID of the Linear bot user. */
  public botUserId?: string;
  /** Whether an internal message should be added when someone comments on an issue. */
  public sendNoteOnComment?: boolean;
  /** Whether an internal message should be added when a Linear issue changes status (for status types except completed or canceled). */
  public sendNoteOnStatusChange?: boolean;
  /** The subdomain of the Zendesk organization being connected. */
  public subdomain: string;
  /** The URL of the connected Zendesk organization. */
  public url: string;
}
/**
 * A fetchable AirbyteIntegrationConnect Mutation
 *
 * @param request - function to call the graphql client
 */
export class AirbyteIntegrationConnectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the AirbyteIntegrationConnect mutation and return a IntegrationPayload
   *
   * @param input - required input to pass to airbyteIntegrationConnect
   * @returns parsed response from AirbyteIntegrationConnectMutation
   */
  public async fetch(input: L.AirbyteConfigurationInput): LinearFetch<IntegrationPayload> {
    const response = await this._request<
      L.AirbyteIntegrationConnectMutation,
      L.AirbyteIntegrationConnectMutationVariables
    >(L.AirbyteIntegrationConnectDocument, {
      input,
    });
    const data = response.airbyteIntegrationConnect;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable CreateApiKey Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateApiKeyMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateApiKey mutation and return a ApiKeyPayload
   *
   * @param input - required input to pass to createApiKey
   * @returns parsed response from CreateApiKeyMutation
   */
  public async fetch(input: L.ApiKeyCreateInput): LinearFetch<ApiKeyPayload> {
    const response = await this._request<L.CreateApiKeyMutation, L.CreateApiKeyMutationVariables>(
      L.CreateApiKeyDocument,
      {
        input,
      }
    );
    const data = response.apiKeyCreate;

    return new ApiKeyPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteApiKey Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteApiKeyMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteApiKey mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteApiKey
   * @returns parsed response from DeleteApiKeyMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteApiKeyMutation, L.DeleteApiKeyMutationVariables>(
      L.DeleteApiKeyDocument,
      {
        id,
      }
    );
    const data = response.apiKeyDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable ArchiveAttachment Mutation
 *
 * @param request - function to call the graphql client
 */
export class ArchiveAttachmentMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ArchiveAttachment mutation and return a ArchivePayload
   *
   * @param id - required id to pass to archiveAttachment
   * @returns parsed response from ArchiveAttachmentMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.ArchiveAttachmentMutation, L.ArchiveAttachmentMutationVariables>(
      L.ArchiveAttachmentDocument,
      {
        id,
      }
    );
    const data = response.attachmentArchive;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable CreateAttachment Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateAttachmentMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateAttachment mutation and return a AttachmentPayload
   *
   * @param input - required input to pass to createAttachment
   * @returns parsed response from CreateAttachmentMutation
   */
  public async fetch(input: L.AttachmentCreateInput): LinearFetch<AttachmentPayload> {
    const response = await this._request<L.CreateAttachmentMutation, L.CreateAttachmentMutationVariables>(
      L.CreateAttachmentDocument,
      {
        input,
      }
    );
    const data = response.attachmentCreate;

    return new AttachmentPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteAttachment Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteAttachmentMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteAttachment mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteAttachment
   * @returns parsed response from DeleteAttachmentMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteAttachmentMutation, L.DeleteAttachmentMutationVariables>(
      L.DeleteAttachmentDocument,
      {
        id,
      }
    );
    const data = response.attachmentDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable AttachmentLinkDiscord Mutation
 *
 * @param request - function to call the graphql client
 */
export class AttachmentLinkDiscordMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the AttachmentLinkDiscord mutation and return a AttachmentPayload
   *
   * @param channelId - required channelId to pass to attachmentLinkDiscord
   * @param issueId - required issueId to pass to attachmentLinkDiscord
   * @param messageId - required messageId to pass to attachmentLinkDiscord
   * @param url - required url to pass to attachmentLinkDiscord
   * @returns parsed response from AttachmentLinkDiscordMutation
   */
  public async fetch(
    channelId: string,
    issueId: string,
    messageId: string,
    url: string
  ): LinearFetch<AttachmentPayload> {
    const response = await this._request<L.AttachmentLinkDiscordMutation, L.AttachmentLinkDiscordMutationVariables>(
      L.AttachmentLinkDiscordDocument,
      {
        channelId,
        issueId,
        messageId,
        url,
      }
    );
    const data = response.attachmentLinkDiscord;

    return new AttachmentPayload(this._request, data);
  }
}

/**
 * A fetchable AttachmentLinkFront Mutation
 *
 * @param request - function to call the graphql client
 */
export class AttachmentLinkFrontMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the AttachmentLinkFront mutation and return a FrontAttachmentPayload
   *
   * @param conversationId - required conversationId to pass to attachmentLinkFront
   * @param issueId - required issueId to pass to attachmentLinkFront
   * @returns parsed response from AttachmentLinkFrontMutation
   */
  public async fetch(conversationId: string, issueId: string): LinearFetch<FrontAttachmentPayload> {
    const response = await this._request<L.AttachmentLinkFrontMutation, L.AttachmentLinkFrontMutationVariables>(
      L.AttachmentLinkFrontDocument,
      {
        conversationId,
        issueId,
      }
    );
    const data = response.attachmentLinkFront;

    return new FrontAttachmentPayload(this._request, data);
  }
}

/**
 * A fetchable AttachmentLinkIntercom Mutation
 *
 * @param request - function to call the graphql client
 */
export class AttachmentLinkIntercomMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the AttachmentLinkIntercom mutation and return a AttachmentPayload
   *
   * @param conversationId - required conversationId to pass to attachmentLinkIntercom
   * @param issueId - required issueId to pass to attachmentLinkIntercom
   * @returns parsed response from AttachmentLinkIntercomMutation
   */
  public async fetch(conversationId: string, issueId: string): LinearFetch<AttachmentPayload> {
    const response = await this._request<L.AttachmentLinkIntercomMutation, L.AttachmentLinkIntercomMutationVariables>(
      L.AttachmentLinkIntercomDocument,
      {
        conversationId,
        issueId,
      }
    );
    const data = response.attachmentLinkIntercom;

    return new AttachmentPayload(this._request, data);
  }
}

/**
 * A fetchable AttachmentLinkJiraIssue Mutation
 *
 * @param request - function to call the graphql client
 */
export class AttachmentLinkJiraIssueMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the AttachmentLinkJiraIssue mutation and return a AttachmentPayload
   *
   * @param issueId - required issueId to pass to attachmentLinkJiraIssue
   * @param jiraIssueId - required jiraIssueId to pass to attachmentLinkJiraIssue
   * @returns parsed response from AttachmentLinkJiraIssueMutation
   */
  public async fetch(issueId: string, jiraIssueId: string): LinearFetch<AttachmentPayload> {
    const response = await this._request<L.AttachmentLinkJiraIssueMutation, L.AttachmentLinkJiraIssueMutationVariables>(
      L.AttachmentLinkJiraIssueDocument,
      {
        issueId,
        jiraIssueId,
      }
    );
    const data = response.attachmentLinkJiraIssue;

    return new AttachmentPayload(this._request, data);
  }
}

/**
 * A fetchable AttachmentLinkUrl Mutation
 *
 * @param request - function to call the graphql client
 */
export class AttachmentLinkUrlMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the AttachmentLinkUrl mutation and return a AttachmentPayload
   *
   * @param issueId - required issueId to pass to attachmentLinkURL
   * @param url - required url to pass to attachmentLinkURL
   * @param variables - variables without 'issueId', 'url' to pass into the AttachmentLinkUrlMutation
   * @returns parsed response from AttachmentLinkUrlMutation
   */
  public async fetch(
    issueId: string,
    url: string,
    variables?: Omit<L.AttachmentLinkUrlMutationVariables, "issueId" | "url">
  ): LinearFetch<AttachmentPayload> {
    const response = await this._request<L.AttachmentLinkUrlMutation, L.AttachmentLinkUrlMutationVariables>(
      L.AttachmentLinkUrlDocument,
      {
        issueId,
        url,
        ...variables,
      }
    );
    const data = response.attachmentLinkURL;

    return new AttachmentPayload(this._request, data);
  }
}

/**
 * A fetchable AttachmentLinkZendesk Mutation
 *
 * @param request - function to call the graphql client
 */
export class AttachmentLinkZendeskMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the AttachmentLinkZendesk mutation and return a AttachmentPayload
   *
   * @param issueId - required issueId to pass to attachmentLinkZendesk
   * @param ticketId - required ticketId to pass to attachmentLinkZendesk
   * @returns parsed response from AttachmentLinkZendeskMutation
   */
  public async fetch(issueId: string, ticketId: string): LinearFetch<AttachmentPayload> {
    const response = await this._request<L.AttachmentLinkZendeskMutation, L.AttachmentLinkZendeskMutationVariables>(
      L.AttachmentLinkZendeskDocument,
      {
        issueId,
        ticketId,
      }
    );
    const data = response.attachmentLinkZendesk;

    return new AttachmentPayload(this._request, data);
  }
}

/**
 * A fetchable UpdateAttachment Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateAttachmentMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateAttachment mutation and return a AttachmentPayload
   *
   * @param id - required id to pass to updateAttachment
   * @param input - required input to pass to updateAttachment
   * @returns parsed response from UpdateAttachmentMutation
   */
  public async fetch(id: string, input: L.AttachmentUpdateInput): LinearFetch<AttachmentPayload> {
    const response = await this._request<L.UpdateAttachmentMutation, L.UpdateAttachmentMutationVariables>(
      L.UpdateAttachmentDocument,
      {
        id,
        input,
      }
    );
    const data = response.attachmentUpdate;

    return new AttachmentPayload(this._request, data);
  }
}

/**
 * A fetchable CreateComment Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateCommentMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateComment mutation and return a CommentPayload
   *
   * @param input - required input to pass to createComment
   * @returns parsed response from CreateCommentMutation
   */
  public async fetch(input: L.CommentCreateInput): LinearFetch<CommentPayload> {
    const response = await this._request<L.CreateCommentMutation, L.CreateCommentMutationVariables>(
      L.CreateCommentDocument,
      {
        input,
      }
    );
    const data = response.commentCreate;

    return new CommentPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteComment Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteCommentMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteComment mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteComment
   * @returns parsed response from DeleteCommentMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteCommentMutation, L.DeleteCommentMutationVariables>(
      L.DeleteCommentDocument,
      {
        id,
      }
    );
    const data = response.commentDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateComment Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateCommentMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateComment mutation and return a CommentPayload
   *
   * @param id - required id to pass to updateComment
   * @param input - required input to pass to updateComment
   * @returns parsed response from UpdateCommentMutation
   */
  public async fetch(id: string, input: L.CommentUpdateInput): LinearFetch<CommentPayload> {
    const response = await this._request<L.UpdateCommentMutation, L.UpdateCommentMutationVariables>(
      L.UpdateCommentDocument,
      {
        id,
        input,
      }
    );
    const data = response.commentUpdate;

    return new CommentPayload(this._request, data);
  }
}

/**
 * A fetchable CreateContact Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateContactMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateContact mutation and return a ContactPayload
   *
   * @param input - required input to pass to createContact
   * @returns parsed response from CreateContactMutation
   */
  public async fetch(input: L.ContactCreateInput): LinearFetch<ContactPayload> {
    const response = await this._request<L.CreateContactMutation, L.CreateContactMutationVariables>(
      L.CreateContactDocument,
      {
        input,
      }
    );
    const data = response.contactCreate;

    return new ContactPayload(this._request, data);
  }
}

/**
 * A fetchable CreateCsvExportReport Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateCsvExportReportMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateCsvExportReport mutation and return a CreateCsvExportReportPayload
   *
   * @param variables - variables to pass into the CreateCsvExportReportMutation
   * @returns parsed response from CreateCsvExportReportMutation
   */
  public async fetch(variables?: L.CreateCsvExportReportMutationVariables): LinearFetch<CreateCsvExportReportPayload> {
    const response = await this._request<L.CreateCsvExportReportMutation, L.CreateCsvExportReportMutationVariables>(
      L.CreateCsvExportReportDocument,
      variables
    );
    const data = response.createCsvExportReport;

    return new CreateCsvExportReportPayload(this._request, data);
  }
}

/**
 * A fetchable CreateOrganizationFromOnboarding Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateOrganizationFromOnboardingMutation extends Request {
  public constructor(request: LinearRequest) {
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
    input: L.CreateOrganizationInput,
    variables?: Omit<L.CreateOrganizationFromOnboardingMutationVariables, "input">
  ): LinearFetch<CreateOrJoinOrganizationResponse> {
    const response = await this._request<
      L.CreateOrganizationFromOnboardingMutation,
      L.CreateOrganizationFromOnboardingMutationVariables
    >(L.CreateOrganizationFromOnboardingDocument, {
      input,
      ...variables,
    });
    const data = response.createOrganizationFromOnboarding;

    return new CreateOrJoinOrganizationResponse(this._request, data);
  }
}

/**
 * A fetchable CreateCustomView Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateCustomViewMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateCustomView mutation and return a CustomViewPayload
   *
   * @param input - required input to pass to createCustomView
   * @returns parsed response from CreateCustomViewMutation
   */
  public async fetch(input: L.CustomViewCreateInput): LinearFetch<CustomViewPayload> {
    const response = await this._request<L.CreateCustomViewMutation, L.CreateCustomViewMutationVariables>(
      L.CreateCustomViewDocument,
      {
        input,
      }
    );
    const data = response.customViewCreate;

    return new CustomViewPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteCustomView Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteCustomViewMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteCustomView mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteCustomView
   * @returns parsed response from DeleteCustomViewMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteCustomViewMutation, L.DeleteCustomViewMutationVariables>(
      L.DeleteCustomViewDocument,
      {
        id,
      }
    );
    const data = response.customViewDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateCustomView Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateCustomViewMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateCustomView mutation and return a CustomViewPayload
   *
   * @param id - required id to pass to updateCustomView
   * @param input - required input to pass to updateCustomView
   * @returns parsed response from UpdateCustomViewMutation
   */
  public async fetch(id: string, input: L.CustomViewUpdateInput): LinearFetch<CustomViewPayload> {
    const response = await this._request<L.UpdateCustomViewMutation, L.UpdateCustomViewMutationVariables>(
      L.UpdateCustomViewDocument,
      {
        id,
        input,
      }
    );
    const data = response.customViewUpdate;

    return new CustomViewPayload(this._request, data);
  }
}

/**
 * A fetchable ArchiveCycle Mutation
 *
 * @param request - function to call the graphql client
 */
export class ArchiveCycleMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ArchiveCycle mutation and return a ArchivePayload
   *
   * @param id - required id to pass to archiveCycle
   * @returns parsed response from ArchiveCycleMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.ArchiveCycleMutation, L.ArchiveCycleMutationVariables>(
      L.ArchiveCycleDocument,
      {
        id,
      }
    );
    const data = response.cycleArchive;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable CreateCycle Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateCycleMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateCycle mutation and return a CyclePayload
   *
   * @param input - required input to pass to createCycle
   * @returns parsed response from CreateCycleMutation
   */
  public async fetch(input: L.CycleCreateInput): LinearFetch<CyclePayload> {
    const response = await this._request<L.CreateCycleMutation, L.CreateCycleMutationVariables>(L.CreateCycleDocument, {
      input,
    });
    const data = response.cycleCreate;

    return new CyclePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateCycle Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateCycleMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateCycle mutation and return a CyclePayload
   *
   * @param id - required id to pass to updateCycle
   * @param input - required input to pass to updateCycle
   * @returns parsed response from UpdateCycleMutation
   */
  public async fetch(id: string, input: L.CycleUpdateInput): LinearFetch<CyclePayload> {
    const response = await this._request<L.UpdateCycleMutation, L.UpdateCycleMutationVariables>(L.UpdateCycleDocument, {
      id,
      input,
    });
    const data = response.cycleUpdate;

    return new CyclePayload(this._request, data);
  }
}

/**
 * A fetchable CreateDocument Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateDocumentMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateDocument mutation and return a DocumentPayload
   *
   * @param input - required input to pass to createDocument
   * @returns parsed response from CreateDocumentMutation
   */
  public async fetch(input: L.DocumentCreateInput): LinearFetch<DocumentPayload> {
    const response = await this._request<L.CreateDocumentMutation, L.CreateDocumentMutationVariables>(
      L.CreateDocumentDocument,
      {
        input,
      }
    );
    const data = response.documentCreate;

    return new DocumentPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteDocument Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteDocumentMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteDocument mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteDocument
   * @returns parsed response from DeleteDocumentMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteDocumentMutation, L.DeleteDocumentMutationVariables>(
      L.DeleteDocumentDocument,
      {
        id,
      }
    );
    const data = response.documentDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateDocument Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateDocumentMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateDocument mutation and return a DocumentPayload
   *
   * @param id - required id to pass to updateDocument
   * @param input - required input to pass to updateDocument
   * @returns parsed response from UpdateDocumentMutation
   */
  public async fetch(id: string, input: L.DocumentUpdateInput): LinearFetch<DocumentPayload> {
    const response = await this._request<L.UpdateDocumentMutation, L.UpdateDocumentMutationVariables>(
      L.UpdateDocumentDocument,
      {
        id,
        input,
      }
    );
    const data = response.documentUpdate;

    return new DocumentPayload(this._request, data);
  }
}

/**
 * A fetchable EmailTokenUserAccountAuth Mutation
 *
 * @param request - function to call the graphql client
 */
export class EmailTokenUserAccountAuthMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the EmailTokenUserAccountAuth mutation and return a AuthResolverResponse
   *
   * @param input - required input to pass to emailTokenUserAccountAuth
   * @returns parsed response from EmailTokenUserAccountAuthMutation
   */
  public async fetch(input: L.TokenUserAccountAuthInput): LinearFetch<AuthResolverResponse> {
    const response = await this._request<
      L.EmailTokenUserAccountAuthMutation,
      L.EmailTokenUserAccountAuthMutationVariables
    >(L.EmailTokenUserAccountAuthDocument, {
      input,
    });
    const data = response.emailTokenUserAccountAuth;

    return new AuthResolverResponse(this._request, data);
  }
}

/**
 * A fetchable EmailUnsubscribe Mutation
 *
 * @param request - function to call the graphql client
 */
export class EmailUnsubscribeMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the EmailUnsubscribe mutation and return a EmailUnsubscribePayload
   *
   * @param input - required input to pass to emailUnsubscribe
   * @returns parsed response from EmailUnsubscribeMutation
   */
  public async fetch(input: L.EmailUnsubscribeInput): LinearFetch<EmailUnsubscribePayload> {
    const response = await this._request<L.EmailUnsubscribeMutation, L.EmailUnsubscribeMutationVariables>(
      L.EmailUnsubscribeDocument,
      {
        input,
      }
    );
    const data = response.emailUnsubscribe;

    return new EmailUnsubscribePayload(this._request, data);
  }
}

/**
 * A fetchable EmailUserAccountAuthChallenge Mutation
 *
 * @param request - function to call the graphql client
 */
export class EmailUserAccountAuthChallengeMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the EmailUserAccountAuthChallenge mutation and return a EmailUserAccountAuthChallengeResponse
   *
   * @param input - required input to pass to emailUserAccountAuthChallenge
   * @returns parsed response from EmailUserAccountAuthChallengeMutation
   */
  public async fetch(input: L.EmailUserAccountAuthChallengeInput): LinearFetch<EmailUserAccountAuthChallengeResponse> {
    const response = await this._request<
      L.EmailUserAccountAuthChallengeMutation,
      L.EmailUserAccountAuthChallengeMutationVariables
    >(L.EmailUserAccountAuthChallengeDocument, {
      input,
    });
    const data = response.emailUserAccountAuthChallenge;

    return new EmailUserAccountAuthChallengeResponse(this._request, data);
  }
}

/**
 * A fetchable CreateEmoji Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateEmojiMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateEmoji mutation and return a EmojiPayload
   *
   * @param input - required input to pass to createEmoji
   * @returns parsed response from CreateEmojiMutation
   */
  public async fetch(input: L.EmojiCreateInput): LinearFetch<EmojiPayload> {
    const response = await this._request<L.CreateEmojiMutation, L.CreateEmojiMutationVariables>(L.CreateEmojiDocument, {
      input,
    });
    const data = response.emojiCreate;

    return new EmojiPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteEmoji Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteEmojiMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteEmoji mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteEmoji
   * @returns parsed response from DeleteEmojiMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteEmojiMutation, L.DeleteEmojiMutationVariables>(L.DeleteEmojiDocument, {
      id,
    });
    const data = response.emojiDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable CreateEvent Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateEventMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateEvent mutation and return a EventPayload
   *
   * @param input - required input to pass to createEvent
   * @returns parsed response from CreateEventMutation
   */
  public async fetch(input: L.EventCreateInput): LinearFetch<EventPayload> {
    const response = await this._request<L.CreateEventMutation, L.CreateEventMutationVariables>(L.CreateEventDocument, {
      input,
    });
    const data = response.eventCreate;

    return new EventPayload(this._request, data);
  }
}

/**
 * A fetchable CreateFavorite Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateFavoriteMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateFavorite mutation and return a FavoritePayload
   *
   * @param input - required input to pass to createFavorite
   * @returns parsed response from CreateFavoriteMutation
   */
  public async fetch(input: L.FavoriteCreateInput): LinearFetch<FavoritePayload> {
    const response = await this._request<L.CreateFavoriteMutation, L.CreateFavoriteMutationVariables>(
      L.CreateFavoriteDocument,
      {
        input,
      }
    );
    const data = response.favoriteCreate;

    return new FavoritePayload(this._request, data);
  }
}

/**
 * A fetchable DeleteFavorite Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteFavoriteMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteFavorite mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteFavorite
   * @returns parsed response from DeleteFavoriteMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteFavoriteMutation, L.DeleteFavoriteMutationVariables>(
      L.DeleteFavoriteDocument,
      {
        id,
      }
    );
    const data = response.favoriteDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateFavorite Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateFavoriteMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateFavorite mutation and return a FavoritePayload
   *
   * @param id - required id to pass to updateFavorite
   * @param input - required input to pass to updateFavorite
   * @returns parsed response from UpdateFavoriteMutation
   */
  public async fetch(id: string, input: L.FavoriteUpdateInput): LinearFetch<FavoritePayload> {
    const response = await this._request<L.UpdateFavoriteMutation, L.UpdateFavoriteMutationVariables>(
      L.UpdateFavoriteDocument,
      {
        id,
        input,
      }
    );
    const data = response.favoriteUpdate;

    return new FavoritePayload(this._request, data);
  }
}

/**
 * A fetchable FileUpload Mutation
 *
 * @param request - function to call the graphql client
 */
export class FileUploadMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the FileUpload mutation and return a UploadPayload
   *
   * @param contentType - required contentType to pass to fileUpload
   * @param filename - required filename to pass to fileUpload
   * @param size - required size to pass to fileUpload
   * @param variables - variables without 'contentType', 'filename', 'size' to pass into the FileUploadMutation
   * @returns parsed response from FileUploadMutation
   */
  public async fetch(
    contentType: string,
    filename: string,
    size: number,
    variables?: Omit<L.FileUploadMutationVariables, "contentType" | "filename" | "size">
  ): LinearFetch<UploadPayload> {
    const response = await this._request<L.FileUploadMutation, L.FileUploadMutationVariables>(L.FileUploadDocument, {
      contentType,
      filename,
      size,
      ...variables,
    });
    const data = response.fileUpload;

    return new UploadPayload(this._request, data);
  }
}

/**
 * A fetchable GoogleUserAccountAuth Mutation
 *
 * @param request - function to call the graphql client
 */
export class GoogleUserAccountAuthMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the GoogleUserAccountAuth mutation and return a AuthResolverResponse
   *
   * @param input - required input to pass to googleUserAccountAuth
   * @returns parsed response from GoogleUserAccountAuthMutation
   */
  public async fetch(input: L.GoogleUserAccountAuthInput): LinearFetch<AuthResolverResponse> {
    const response = await this._request<L.GoogleUserAccountAuthMutation, L.GoogleUserAccountAuthMutationVariables>(
      L.GoogleUserAccountAuthDocument,
      {
        input,
      }
    );
    const data = response.googleUserAccountAuth;

    return new AuthResolverResponse(this._request, data);
  }
}

/**
 * A fetchable ImageUploadFromUrl Mutation
 *
 * @param request - function to call the graphql client
 */
export class ImageUploadFromUrlMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ImageUploadFromUrl mutation and return a ImageUploadFromUrlPayload
   *
   * @param url - required url to pass to imageUploadFromUrl
   * @returns parsed response from ImageUploadFromUrlMutation
   */
  public async fetch(url: string): LinearFetch<ImageUploadFromUrlPayload> {
    const response = await this._request<L.ImageUploadFromUrlMutation, L.ImageUploadFromUrlMutationVariables>(
      L.ImageUploadFromUrlDocument,
      {
        url,
      }
    );
    const data = response.imageUploadFromUrl;

    return new ImageUploadFromUrlPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteIntegration Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteIntegrationMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteIntegration mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteIntegration
   * @returns parsed response from DeleteIntegrationMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteIntegrationMutation, L.DeleteIntegrationMutationVariables>(
      L.DeleteIntegrationDocument,
      {
        id,
      }
    );
    const data = response.integrationDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationDiscord Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationDiscordMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationDiscord mutation and return a IntegrationPayload
   *
   * @param code - required code to pass to integrationDiscord
   * @param redirectUri - required redirectUri to pass to integrationDiscord
   * @returns parsed response from IntegrationDiscordMutation
   */
  public async fetch(code: string, redirectUri: string): LinearFetch<IntegrationPayload> {
    const response = await this._request<L.IntegrationDiscordMutation, L.IntegrationDiscordMutationVariables>(
      L.IntegrationDiscordDocument,
      {
        code,
        redirectUri,
      }
    );
    const data = response.integrationDiscord;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationFigma Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationFigmaMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationFigma mutation and return a IntegrationPayload
   *
   * @param code - required code to pass to integrationFigma
   * @param redirectUri - required redirectUri to pass to integrationFigma
   * @returns parsed response from IntegrationFigmaMutation
   */
  public async fetch(code: string, redirectUri: string): LinearFetch<IntegrationPayload> {
    const response = await this._request<L.IntegrationFigmaMutation, L.IntegrationFigmaMutationVariables>(
      L.IntegrationFigmaDocument,
      {
        code,
        redirectUri,
      }
    );
    const data = response.integrationFigma;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationFront Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationFrontMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationFront mutation and return a IntegrationPayload
   *
   * @param code - required code to pass to integrationFront
   * @param redirectUri - required redirectUri to pass to integrationFront
   * @returns parsed response from IntegrationFrontMutation
   */
  public async fetch(code: string, redirectUri: string): LinearFetch<IntegrationPayload> {
    const response = await this._request<L.IntegrationFrontMutation, L.IntegrationFrontMutationVariables>(
      L.IntegrationFrontDocument,
      {
        code,
        redirectUri,
      }
    );
    const data = response.integrationFront;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable CreateIntegrationGithubCommit Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateIntegrationGithubCommitMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateIntegrationGithubCommit mutation and return a GitHubCommitIntegrationPayload
   *
   * @returns parsed response from CreateIntegrationGithubCommitMutation
   */
  public async fetch(): LinearFetch<GitHubCommitIntegrationPayload> {
    const response = await this._request<
      L.CreateIntegrationGithubCommitMutation,
      L.CreateIntegrationGithubCommitMutationVariables
    >(L.CreateIntegrationGithubCommitDocument, {});
    const data = response.integrationGithubCommitCreate;

    return new GitHubCommitIntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationGithubConnect Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationGithubConnectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationGithubConnect mutation and return a IntegrationPayload
   *
   * @param installationId - required installationId to pass to integrationGithubConnect
   * @returns parsed response from IntegrationGithubConnectMutation
   */
  public async fetch(installationId: string): LinearFetch<IntegrationPayload> {
    const response = await this._request<
      L.IntegrationGithubConnectMutation,
      L.IntegrationGithubConnectMutationVariables
    >(L.IntegrationGithubConnectDocument, {
      installationId,
    });
    const data = response.integrationGithubConnect;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationGitlabConnect Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationGitlabConnectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationGitlabConnect mutation and return a IntegrationPayload
   *
   * @param accessToken - required accessToken to pass to integrationGitlabConnect
   * @param gitlabUrl - required gitlabUrl to pass to integrationGitlabConnect
   * @returns parsed response from IntegrationGitlabConnectMutation
   */
  public async fetch(accessToken: string, gitlabUrl: string): LinearFetch<IntegrationPayload> {
    const response = await this._request<
      L.IntegrationGitlabConnectMutation,
      L.IntegrationGitlabConnectMutationVariables
    >(L.IntegrationGitlabConnectDocument, {
      accessToken,
      gitlabUrl,
    });
    const data = response.integrationGitlabConnect;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationGoogleSheets Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationGoogleSheetsMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationGoogleSheets mutation and return a IntegrationPayload
   *
   * @param code - required code to pass to integrationGoogleSheets
   * @returns parsed response from IntegrationGoogleSheetsMutation
   */
  public async fetch(code: string): LinearFetch<IntegrationPayload> {
    const response = await this._request<L.IntegrationGoogleSheetsMutation, L.IntegrationGoogleSheetsMutationVariables>(
      L.IntegrationGoogleSheetsDocument,
      {
        code,
      }
    );
    const data = response.integrationGoogleSheets;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationIntercom Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationIntercomMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationIntercom mutation and return a IntegrationPayload
   *
   * @param code - required code to pass to integrationIntercom
   * @param redirectUri - required redirectUri to pass to integrationIntercom
   * @param variables - variables without 'code', 'redirectUri' to pass into the IntegrationIntercomMutation
   * @returns parsed response from IntegrationIntercomMutation
   */
  public async fetch(
    code: string,
    redirectUri: string,
    variables?: Omit<L.IntegrationIntercomMutationVariables, "code" | "redirectUri">
  ): LinearFetch<IntegrationPayload> {
    const response = await this._request<L.IntegrationIntercomMutation, L.IntegrationIntercomMutationVariables>(
      L.IntegrationIntercomDocument,
      {
        code,
        redirectUri,
        ...variables,
      }
    );
    const data = response.integrationIntercom;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteIntegrationIntercom Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteIntegrationIntercomMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteIntegrationIntercom mutation and return a IntegrationPayload
   *
   * @returns parsed response from DeleteIntegrationIntercomMutation
   */
  public async fetch(): LinearFetch<IntegrationPayload> {
    const response = await this._request<
      L.DeleteIntegrationIntercomMutation,
      L.DeleteIntegrationIntercomMutationVariables
    >(L.DeleteIntegrationIntercomDocument, {});
    const data = response.integrationIntercomDelete;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable UpdateIntegrationIntercomSettings Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateIntegrationIntercomSettingsMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateIntegrationIntercomSettings mutation and return a IntegrationPayload
   *
   * @param input - required input to pass to updateIntegrationIntercomSettings
   * @returns parsed response from UpdateIntegrationIntercomSettingsMutation
   */
  public async fetch(input: L.IntercomSettingsInput): LinearFetch<IntegrationPayload> {
    const response = await this._request<
      L.UpdateIntegrationIntercomSettingsMutation,
      L.UpdateIntegrationIntercomSettingsMutationVariables
    >(L.UpdateIntegrationIntercomSettingsDocument, {
      input,
    });
    const data = response.integrationIntercomSettingsUpdate;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationLoom Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationLoomMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationLoom mutation and return a IntegrationPayload
   *
   * @returns parsed response from IntegrationLoomMutation
   */
  public async fetch(): LinearFetch<IntegrationPayload> {
    const response = await this._request<L.IntegrationLoomMutation, L.IntegrationLoomMutationVariables>(
      L.IntegrationLoomDocument,
      {}
    );
    const data = response.integrationLoom;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationRequest Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationRequestMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationRequest mutation and return a IntegrationRequestPayload
   *
   * @param input - required input to pass to integrationRequest
   * @returns parsed response from IntegrationRequestMutation
   */
  public async fetch(input: L.IntegrationRequestInput): LinearFetch<IntegrationRequestPayload> {
    const response = await this._request<L.IntegrationRequestMutation, L.IntegrationRequestMutationVariables>(
      L.IntegrationRequestDocument,
      {
        input,
      }
    );
    const data = response.integrationRequest;

    return new IntegrationRequestPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationSentryConnect Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationSentryConnectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationSentryConnect mutation and return a IntegrationPayload
   *
   * @param code - required code to pass to integrationSentryConnect
   * @param installationId - required installationId to pass to integrationSentryConnect
   * @param organizationSlug - required organizationSlug to pass to integrationSentryConnect
   * @returns parsed response from IntegrationSentryConnectMutation
   */
  public async fetch(code: string, installationId: string, organizationSlug: string): LinearFetch<IntegrationPayload> {
    const response = await this._request<
      L.IntegrationSentryConnectMutation,
      L.IntegrationSentryConnectMutationVariables
    >(L.IntegrationSentryConnectDocument, {
      code,
      installationId,
      organizationSlug,
    });
    const data = response.integrationSentryConnect;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationSlack Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationSlackMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationSlack mutation and return a IntegrationPayload
   *
   * @param code - required code to pass to integrationSlack
   * @param redirectUri - required redirectUri to pass to integrationSlack
   * @param variables - variables without 'code', 'redirectUri' to pass into the IntegrationSlackMutation
   * @returns parsed response from IntegrationSlackMutation
   */
  public async fetch(
    code: string,
    redirectUri: string,
    variables?: Omit<L.IntegrationSlackMutationVariables, "code" | "redirectUri">
  ): LinearFetch<IntegrationPayload> {
    const response = await this._request<L.IntegrationSlackMutation, L.IntegrationSlackMutationVariables>(
      L.IntegrationSlackDocument,
      {
        code,
        redirectUri,
        ...variables,
      }
    );
    const data = response.integrationSlack;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationSlackImportEmojis Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationSlackImportEmojisMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationSlackImportEmojis mutation and return a IntegrationPayload
   *
   * @param code - required code to pass to integrationSlackImportEmojis
   * @param redirectUri - required redirectUri to pass to integrationSlackImportEmojis
   * @returns parsed response from IntegrationSlackImportEmojisMutation
   */
  public async fetch(code: string, redirectUri: string): LinearFetch<IntegrationPayload> {
    const response = await this._request<
      L.IntegrationSlackImportEmojisMutation,
      L.IntegrationSlackImportEmojisMutationVariables
    >(L.IntegrationSlackImportEmojisDocument, {
      code,
      redirectUri,
    });
    const data = response.integrationSlackImportEmojis;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationSlackOrgProjectUpdatesPost Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationSlackOrgProjectUpdatesPostMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationSlackOrgProjectUpdatesPost mutation and return a IntegrationPayload
   *
   * @param code - required code to pass to integrationSlackOrgProjectUpdatesPost
   * @param redirectUri - required redirectUri to pass to integrationSlackOrgProjectUpdatesPost
   * @returns parsed response from IntegrationSlackOrgProjectUpdatesPostMutation
   */
  public async fetch(code: string, redirectUri: string): LinearFetch<IntegrationPayload> {
    const response = await this._request<
      L.IntegrationSlackOrgProjectUpdatesPostMutation,
      L.IntegrationSlackOrgProjectUpdatesPostMutationVariables
    >(L.IntegrationSlackOrgProjectUpdatesPostDocument, {
      code,
      redirectUri,
    });
    const data = response.integrationSlackOrgProjectUpdatesPost;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationSlackPersonal Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationSlackPersonalMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationSlackPersonal mutation and return a IntegrationPayload
   *
   * @param code - required code to pass to integrationSlackPersonal
   * @param redirectUri - required redirectUri to pass to integrationSlackPersonal
   * @returns parsed response from IntegrationSlackPersonalMutation
   */
  public async fetch(code: string, redirectUri: string): LinearFetch<IntegrationPayload> {
    const response = await this._request<
      L.IntegrationSlackPersonalMutation,
      L.IntegrationSlackPersonalMutationVariables
    >(L.IntegrationSlackPersonalDocument, {
      code,
      redirectUri,
    });
    const data = response.integrationSlackPersonal;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationSlackPost Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationSlackPostMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationSlackPost mutation and return a IntegrationPayload
   *
   * @param code - required code to pass to integrationSlackPost
   * @param redirectUri - required redirectUri to pass to integrationSlackPost
   * @param teamId - required teamId to pass to integrationSlackPost
   * @param variables - variables without 'code', 'redirectUri', 'teamId' to pass into the IntegrationSlackPostMutation
   * @returns parsed response from IntegrationSlackPostMutation
   */
  public async fetch(
    code: string,
    redirectUri: string,
    teamId: string,
    variables?: Omit<L.IntegrationSlackPostMutationVariables, "code" | "redirectUri" | "teamId">
  ): LinearFetch<IntegrationPayload> {
    const response = await this._request<L.IntegrationSlackPostMutation, L.IntegrationSlackPostMutationVariables>(
      L.IntegrationSlackPostDocument,
      {
        code,
        redirectUri,
        teamId,
        ...variables,
      }
    );
    const data = response.integrationSlackPost;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationSlackProjectPost Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationSlackProjectPostMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationSlackProjectPost mutation and return a IntegrationPayload
   *
   * @param code - required code to pass to integrationSlackProjectPost
   * @param projectId - required projectId to pass to integrationSlackProjectPost
   * @param redirectUri - required redirectUri to pass to integrationSlackProjectPost
   * @param service - required service to pass to integrationSlackProjectPost
   * @returns parsed response from IntegrationSlackProjectPostMutation
   */
  public async fetch(
    code: string,
    projectId: string,
    redirectUri: string,
    service: string
  ): LinearFetch<IntegrationPayload> {
    const response = await this._request<
      L.IntegrationSlackProjectPostMutation,
      L.IntegrationSlackProjectPostMutationVariables
    >(L.IntegrationSlackProjectPostDocument, {
      code,
      projectId,
      redirectUri,
      service,
    });
    const data = response.integrationSlackProjectPost;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable CreateIntegrationTemplate Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateIntegrationTemplateMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateIntegrationTemplate mutation and return a IntegrationTemplatePayload
   *
   * @param input - required input to pass to createIntegrationTemplate
   * @returns parsed response from CreateIntegrationTemplateMutation
   */
  public async fetch(input: L.IntegrationTemplateCreateInput): LinearFetch<IntegrationTemplatePayload> {
    const response = await this._request<
      L.CreateIntegrationTemplateMutation,
      L.CreateIntegrationTemplateMutationVariables
    >(L.CreateIntegrationTemplateDocument, {
      input,
    });
    const data = response.integrationTemplateCreate;

    return new IntegrationTemplatePayload(this._request, data);
  }
}

/**
 * A fetchable DeleteIntegrationTemplate Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteIntegrationTemplateMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteIntegrationTemplate mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteIntegrationTemplate
   * @returns parsed response from DeleteIntegrationTemplateMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<
      L.DeleteIntegrationTemplateMutation,
      L.DeleteIntegrationTemplateMutationVariables
    >(L.DeleteIntegrationTemplateDocument, {
      id,
    });
    const data = response.integrationTemplateDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable IntegrationZendesk Mutation
 *
 * @param request - function to call the graphql client
 */
export class IntegrationZendeskMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationZendesk mutation and return a IntegrationPayload
   *
   * @param code - required code to pass to integrationZendesk
   * @param redirectUri - required redirectUri to pass to integrationZendesk
   * @param scope - required scope to pass to integrationZendesk
   * @param subdomain - required subdomain to pass to integrationZendesk
   * @returns parsed response from IntegrationZendeskMutation
   */
  public async fetch(
    code: string,
    redirectUri: string,
    scope: string,
    subdomain: string
  ): LinearFetch<IntegrationPayload> {
    const response = await this._request<L.IntegrationZendeskMutation, L.IntegrationZendeskMutationVariables>(
      L.IntegrationZendeskDocument,
      {
        code,
        redirectUri,
        scope,
        subdomain,
      }
    );
    const data = response.integrationZendesk;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable CreateIntegrationsSettings Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateIntegrationsSettingsMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateIntegrationsSettings mutation and return a IntegrationsSettingsPayload
   *
   * @param input - required input to pass to createIntegrationsSettings
   * @returns parsed response from CreateIntegrationsSettingsMutation
   */
  public async fetch(input: L.IntegrationsSettingsCreateInput): LinearFetch<IntegrationsSettingsPayload> {
    const response = await this._request<
      L.CreateIntegrationsSettingsMutation,
      L.CreateIntegrationsSettingsMutationVariables
    >(L.CreateIntegrationsSettingsDocument, {
      input,
    });
    const data = response.integrationsSettingsCreate;

    return new IntegrationsSettingsPayload(this._request, data);
  }
}

/**
 * A fetchable UpdateIntegrationsSettings Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateIntegrationsSettingsMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateIntegrationsSettings mutation and return a IntegrationsSettingsPayload
   *
   * @param id - required id to pass to updateIntegrationsSettings
   * @param input - required input to pass to updateIntegrationsSettings
   * @returns parsed response from UpdateIntegrationsSettingsMutation
   */
  public async fetch(id: string, input: L.IntegrationsSettingsUpdateInput): LinearFetch<IntegrationsSettingsPayload> {
    const response = await this._request<
      L.UpdateIntegrationsSettingsMutation,
      L.UpdateIntegrationsSettingsMutationVariables
    >(L.UpdateIntegrationsSettingsDocument, {
      id,
      input,
    });
    const data = response.integrationsSettingsUpdate;

    return new IntegrationsSettingsPayload(this._request, data);
  }
}

/**
 * A fetchable ArchiveIssue Mutation
 *
 * @param request - function to call the graphql client
 */
export class ArchiveIssueMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ArchiveIssue mutation and return a ArchivePayload
   *
   * @param id - required id to pass to archiveIssue
   * @param variables - variables without 'id' to pass into the ArchiveIssueMutation
   * @returns parsed response from ArchiveIssueMutation
   */
  public async fetch(id: string, variables?: Omit<L.ArchiveIssueMutationVariables, "id">): LinearFetch<ArchivePayload> {
    const response = await this._request<L.ArchiveIssueMutation, L.ArchiveIssueMutationVariables>(
      L.ArchiveIssueDocument,
      {
        id,
        ...variables,
      }
    );
    const data = response.issueArchive;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateIssueBatch Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateIssueBatchMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateIssueBatch mutation and return a IssueBatchPayload
   *
   * @param ids - required ids to pass to updateIssueBatch
   * @param input - required input to pass to updateIssueBatch
   * @returns parsed response from UpdateIssueBatchMutation
   */
  public async fetch(ids: L.Scalars["UUID"][], input: L.IssueUpdateInput): LinearFetch<IssueBatchPayload> {
    const response = await this._request<L.UpdateIssueBatchMutation, L.UpdateIssueBatchMutationVariables>(
      L.UpdateIssueBatchDocument,
      {
        ids,
        input,
      }
    );
    const data = response.issueBatchUpdate;

    return new IssueBatchPayload(this._request, data);
  }
}

/**
 * A fetchable CreateIssue Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateIssueMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateIssue mutation and return a IssuePayload
   *
   * @param input - required input to pass to createIssue
   * @returns parsed response from CreateIssueMutation
   */
  public async fetch(input: L.IssueCreateInput): LinearFetch<IssuePayload> {
    const response = await this._request<L.CreateIssueMutation, L.CreateIssueMutationVariables>(L.CreateIssueDocument, {
      input,
    });
    const data = response.issueCreate;

    return new IssuePayload(this._request, data);
  }
}

/**
 * A fetchable DeleteIssue Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteIssueMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteIssue mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteIssue
   * @returns parsed response from DeleteIssueMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteIssueMutation, L.DeleteIssueMutationVariables>(L.DeleteIssueDocument, {
      id,
    });
    const data = response.issueDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable IssueImportCreateAsana Mutation
 *
 * @param request - function to call the graphql client
 */
export class IssueImportCreateAsanaMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IssueImportCreateAsana mutation and return a IssueImportPayload
   *
   * @param asanaTeamName - required asanaTeamName to pass to issueImportCreateAsana
   * @param asanaToken - required asanaToken to pass to issueImportCreateAsana
   * @param variables - variables without 'asanaTeamName', 'asanaToken' to pass into the IssueImportCreateAsanaMutation
   * @returns parsed response from IssueImportCreateAsanaMutation
   */
  public async fetch(
    asanaTeamName: string,
    asanaToken: string,
    variables?: Omit<L.IssueImportCreateAsanaMutationVariables, "asanaTeamName" | "asanaToken">
  ): LinearFetch<IssueImportPayload> {
    const response = await this._request<L.IssueImportCreateAsanaMutation, L.IssueImportCreateAsanaMutationVariables>(
      L.IssueImportCreateAsanaDocument,
      {
        asanaTeamName,
        asanaToken,
        ...variables,
      }
    );
    const data = response.issueImportCreateAsana;

    return new IssueImportPayload(this._request, data);
  }
}

/**
 * A fetchable IssueImportCreateClubhouse Mutation
 *
 * @param request - function to call the graphql client
 */
export class IssueImportCreateClubhouseMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IssueImportCreateClubhouse mutation and return a IssueImportPayload
   *
   * @param clubhouseTeamName - required clubhouseTeamName to pass to issueImportCreateClubhouse
   * @param clubhouseToken - required clubhouseToken to pass to issueImportCreateClubhouse
   * @param variables - variables without 'clubhouseTeamName', 'clubhouseToken' to pass into the IssueImportCreateClubhouseMutation
   * @returns parsed response from IssueImportCreateClubhouseMutation
   */
  public async fetch(
    clubhouseTeamName: string,
    clubhouseToken: string,
    variables?: Omit<L.IssueImportCreateClubhouseMutationVariables, "clubhouseTeamName" | "clubhouseToken">
  ): LinearFetch<IssueImportPayload> {
    const response = await this._request<
      L.IssueImportCreateClubhouseMutation,
      L.IssueImportCreateClubhouseMutationVariables
    >(L.IssueImportCreateClubhouseDocument, {
      clubhouseTeamName,
      clubhouseToken,
      ...variables,
    });
    const data = response.issueImportCreateClubhouse;

    return new IssueImportPayload(this._request, data);
  }
}

/**
 * A fetchable IssueImportCreateGithub Mutation
 *
 * @param request - function to call the graphql client
 */
export class IssueImportCreateGithubMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IssueImportCreateGithub mutation and return a IssueImportPayload
   *
   * @param githubRepoName - required githubRepoName to pass to issueImportCreateGithub
   * @param githubRepoOwner - required githubRepoOwner to pass to issueImportCreateGithub
   * @param githubToken - required githubToken to pass to issueImportCreateGithub
   * @param variables - variables without 'githubRepoName', 'githubRepoOwner', 'githubToken' to pass into the IssueImportCreateGithubMutation
   * @returns parsed response from IssueImportCreateGithubMutation
   */
  public async fetch(
    githubRepoName: string,
    githubRepoOwner: string,
    githubToken: string,
    variables?: Omit<L.IssueImportCreateGithubMutationVariables, "githubRepoName" | "githubRepoOwner" | "githubToken">
  ): LinearFetch<IssueImportPayload> {
    const response = await this._request<L.IssueImportCreateGithubMutation, L.IssueImportCreateGithubMutationVariables>(
      L.IssueImportCreateGithubDocument,
      {
        githubRepoName,
        githubRepoOwner,
        githubToken,
        ...variables,
      }
    );
    const data = response.issueImportCreateGithub;

    return new IssueImportPayload(this._request, data);
  }
}

/**
 * A fetchable IssueImportCreateJira Mutation
 *
 * @param request - function to call the graphql client
 */
export class IssueImportCreateJiraMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IssueImportCreateJira mutation and return a IssueImportPayload
   *
   * @param jiraEmail - required jiraEmail to pass to issueImportCreateJira
   * @param jiraHostname - required jiraHostname to pass to issueImportCreateJira
   * @param jiraProject - required jiraProject to pass to issueImportCreateJira
   * @param jiraToken - required jiraToken to pass to issueImportCreateJira
   * @param variables - variables without 'jiraEmail', 'jiraHostname', 'jiraProject', 'jiraToken' to pass into the IssueImportCreateJiraMutation
   * @returns parsed response from IssueImportCreateJiraMutation
   */
  public async fetch(
    jiraEmail: string,
    jiraHostname: string,
    jiraProject: string,
    jiraToken: string,
    variables?: Omit<
      L.IssueImportCreateJiraMutationVariables,
      "jiraEmail" | "jiraHostname" | "jiraProject" | "jiraToken"
    >
  ): LinearFetch<IssueImportPayload> {
    const response = await this._request<L.IssueImportCreateJiraMutation, L.IssueImportCreateJiraMutationVariables>(
      L.IssueImportCreateJiraDocument,
      {
        jiraEmail,
        jiraHostname,
        jiraProject,
        jiraToken,
        ...variables,
      }
    );
    const data = response.issueImportCreateJira;

    return new IssueImportPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteIssueImport Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteIssueImportMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteIssueImport mutation and return a IssueImportDeletePayload
   *
   * @param issueImportId - required issueImportId to pass to deleteIssueImport
   * @returns parsed response from DeleteIssueImportMutation
   */
  public async fetch(issueImportId: string): LinearFetch<IssueImportDeletePayload> {
    const response = await this._request<L.DeleteIssueImportMutation, L.DeleteIssueImportMutationVariables>(
      L.DeleteIssueImportDocument,
      {
        issueImportId,
      }
    );
    const data = response.issueImportDelete;

    return new IssueImportDeletePayload(this._request, data);
  }
}

/**
 * A fetchable IssueImportProcess Mutation
 *
 * @param request - function to call the graphql client
 */
export class IssueImportProcessMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IssueImportProcess mutation and return a IssueImportPayload
   *
   * @param issueImportId - required issueImportId to pass to issueImportProcess
   * @param mapping - required mapping to pass to issueImportProcess
   * @returns parsed response from IssueImportProcessMutation
   */
  public async fetch(issueImportId: string, mapping: Record<string, unknown>): LinearFetch<IssueImportPayload> {
    const response = await this._request<L.IssueImportProcessMutation, L.IssueImportProcessMutationVariables>(
      L.IssueImportProcessDocument,
      {
        issueImportId,
        mapping,
      }
    );
    const data = response.issueImportProcess;

    return new IssueImportPayload(this._request, data);
  }
}

/**
 * A fetchable UpdateIssueImport Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateIssueImportMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateIssueImport mutation and return a IssueImportPayload
   *
   * @param id - required id to pass to updateIssueImport
   * @param input - required input to pass to updateIssueImport
   * @returns parsed response from UpdateIssueImportMutation
   */
  public async fetch(id: string, input: L.IssueImportUpdateInput): LinearFetch<IssueImportPayload> {
    const response = await this._request<L.UpdateIssueImportMutation, L.UpdateIssueImportMutationVariables>(
      L.UpdateIssueImportDocument,
      {
        id,
        input,
      }
    );
    const data = response.issueImportUpdate;

    return new IssueImportPayload(this._request, data);
  }
}

/**
 * A fetchable ArchiveIssueLabel Mutation
 *
 * @param request - function to call the graphql client
 */
export class ArchiveIssueLabelMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ArchiveIssueLabel mutation and return a ArchivePayload
   *
   * @param id - required id to pass to archiveIssueLabel
   * @returns parsed response from ArchiveIssueLabelMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.ArchiveIssueLabelMutation, L.ArchiveIssueLabelMutationVariables>(
      L.ArchiveIssueLabelDocument,
      {
        id,
      }
    );
    const data = response.issueLabelArchive;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable CreateIssueLabel Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateIssueLabelMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateIssueLabel mutation and return a IssueLabelPayload
   *
   * @param input - required input to pass to createIssueLabel
   * @param variables - variables without 'input' to pass into the CreateIssueLabelMutation
   * @returns parsed response from CreateIssueLabelMutation
   */
  public async fetch(
    input: L.IssueLabelCreateInput,
    variables?: Omit<L.CreateIssueLabelMutationVariables, "input">
  ): LinearFetch<IssueLabelPayload> {
    const response = await this._request<L.CreateIssueLabelMutation, L.CreateIssueLabelMutationVariables>(
      L.CreateIssueLabelDocument,
      {
        input,
        ...variables,
      }
    );
    const data = response.issueLabelCreate;

    return new IssueLabelPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteIssueLabel Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteIssueLabelMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteIssueLabel mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteIssueLabel
   * @returns parsed response from DeleteIssueLabelMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteIssueLabelMutation, L.DeleteIssueLabelMutationVariables>(
      L.DeleteIssueLabelDocument,
      {
        id,
      }
    );
    const data = response.issueLabelDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateIssueLabel Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateIssueLabelMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateIssueLabel mutation and return a IssueLabelPayload
   *
   * @param id - required id to pass to updateIssueLabel
   * @param input - required input to pass to updateIssueLabel
   * @returns parsed response from UpdateIssueLabelMutation
   */
  public async fetch(id: string, input: L.IssueLabelUpdateInput): LinearFetch<IssueLabelPayload> {
    const response = await this._request<L.UpdateIssueLabelMutation, L.UpdateIssueLabelMutationVariables>(
      L.UpdateIssueLabelDocument,
      {
        id,
        input,
      }
    );
    const data = response.issueLabelUpdate;

    return new IssueLabelPayload(this._request, data);
  }
}

/**
 * A fetchable CreateIssueRelation Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateIssueRelationMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateIssueRelation mutation and return a IssueRelationPayload
   *
   * @param input - required input to pass to createIssueRelation
   * @returns parsed response from CreateIssueRelationMutation
   */
  public async fetch(input: L.IssueRelationCreateInput): LinearFetch<IssueRelationPayload> {
    const response = await this._request<L.CreateIssueRelationMutation, L.CreateIssueRelationMutationVariables>(
      L.CreateIssueRelationDocument,
      {
        input,
      }
    );
    const data = response.issueRelationCreate;

    return new IssueRelationPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteIssueRelation Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteIssueRelationMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteIssueRelation mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteIssueRelation
   * @returns parsed response from DeleteIssueRelationMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteIssueRelationMutation, L.DeleteIssueRelationMutationVariables>(
      L.DeleteIssueRelationDocument,
      {
        id,
      }
    );
    const data = response.issueRelationDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateIssueRelation Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateIssueRelationMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateIssueRelation mutation and return a IssueRelationPayload
   *
   * @param id - required id to pass to updateIssueRelation
   * @param input - required input to pass to updateIssueRelation
   * @returns parsed response from UpdateIssueRelationMutation
   */
  public async fetch(id: string, input: L.IssueRelationUpdateInput): LinearFetch<IssueRelationPayload> {
    const response = await this._request<L.UpdateIssueRelationMutation, L.UpdateIssueRelationMutationVariables>(
      L.UpdateIssueRelationDocument,
      {
        id,
        input,
      }
    );
    const data = response.issueRelationUpdate;

    return new IssueRelationPayload(this._request, data);
  }
}

/**
 * A fetchable IssueReminder Mutation
 *
 * @param request - function to call the graphql client
 */
export class IssueReminderMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IssueReminder mutation and return a IssuePayload
   *
   * @param id - required id to pass to issueReminder
   * @param reminderAt - required reminderAt to pass to issueReminder
   * @returns parsed response from IssueReminderMutation
   */
  public async fetch(id: string, reminderAt: Date): LinearFetch<IssuePayload> {
    const response = await this._request<L.IssueReminderMutation, L.IssueReminderMutationVariables>(
      L.IssueReminderDocument,
      {
        id,
        reminderAt,
      }
    );
    const data = response.issueReminder;

    return new IssuePayload(this._request, data);
  }
}

/**
 * A fetchable UnarchiveIssue Mutation
 *
 * @param request - function to call the graphql client
 */
export class UnarchiveIssueMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UnarchiveIssue mutation and return a ArchivePayload
   *
   * @param id - required id to pass to unarchiveIssue
   * @returns parsed response from UnarchiveIssueMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.UnarchiveIssueMutation, L.UnarchiveIssueMutationVariables>(
      L.UnarchiveIssueDocument,
      {
        id,
      }
    );
    const data = response.issueUnarchive;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateIssue Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateIssueMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateIssue mutation and return a IssuePayload
   *
   * @param id - required id to pass to updateIssue
   * @param input - required input to pass to updateIssue
   * @returns parsed response from UpdateIssueMutation
   */
  public async fetch(id: string, input: L.IssueUpdateInput): LinearFetch<IssuePayload> {
    const response = await this._request<L.UpdateIssueMutation, L.UpdateIssueMutationVariables>(L.UpdateIssueDocument, {
      id,
      input,
    });
    const data = response.issueUpdate;

    return new IssuePayload(this._request, data);
  }
}

/**
 * A fetchable JoinOrganizationFromOnboarding Mutation
 *
 * @param request - function to call the graphql client
 */
export class JoinOrganizationFromOnboardingMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the JoinOrganizationFromOnboarding mutation and return a CreateOrJoinOrganizationResponse
   *
   * @param input - required input to pass to joinOrganizationFromOnboarding
   * @returns parsed response from JoinOrganizationFromOnboardingMutation
   */
  public async fetch(input: L.JoinOrganizationInput): LinearFetch<CreateOrJoinOrganizationResponse> {
    const response = await this._request<
      L.JoinOrganizationFromOnboardingMutation,
      L.JoinOrganizationFromOnboardingMutationVariables
    >(L.JoinOrganizationFromOnboardingDocument, {
      input,
    });
    const data = response.joinOrganizationFromOnboarding;

    return new CreateOrJoinOrganizationResponse(this._request, data);
  }
}

/**
 * A fetchable LeaveOrganization Mutation
 *
 * @param request - function to call the graphql client
 */
export class LeaveOrganizationMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the LeaveOrganization mutation and return a CreateOrJoinOrganizationResponse
   *
   * @param organizationId - required organizationId to pass to leaveOrganization
   * @returns parsed response from LeaveOrganizationMutation
   */
  public async fetch(organizationId: string): LinearFetch<CreateOrJoinOrganizationResponse> {
    const response = await this._request<L.LeaveOrganizationMutation, L.LeaveOrganizationMutationVariables>(
      L.LeaveOrganizationDocument,
      {
        organizationId,
      }
    );
    const data = response.leaveOrganization;

    return new CreateOrJoinOrganizationResponse(this._request, data);
  }
}

/**
 * A fetchable Logout Mutation
 *
 * @param request - function to call the graphql client
 */
export class LogoutMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Logout mutation and return a LogoutResponse
   *
   * @returns parsed response from LogoutMutation
   */
  public async fetch(): LinearFetch<LogoutResponse> {
    const response = await this._request<L.LogoutMutation, L.LogoutMutationVariables>(L.LogoutDocument, {});
    const data = response.logout;

    return new LogoutResponse(this._request, data);
  }
}

/**
 * A fetchable ArchiveNotification Mutation
 *
 * @param request - function to call the graphql client
 */
export class ArchiveNotificationMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ArchiveNotification mutation and return a ArchivePayload
   *
   * @param id - required id to pass to archiveNotification
   * @returns parsed response from ArchiveNotificationMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.ArchiveNotificationMutation, L.ArchiveNotificationMutationVariables>(
      L.ArchiveNotificationDocument,
      {
        id,
      }
    );
    const data = response.notificationArchive;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable CreateNotificationSubscription Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateNotificationSubscriptionMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateNotificationSubscription mutation and return a NotificationSubscriptionPayload
   *
   * @param input - required input to pass to createNotificationSubscription
   * @returns parsed response from CreateNotificationSubscriptionMutation
   */
  public async fetch(input: L.NotificationSubscriptionCreateInput): LinearFetch<NotificationSubscriptionPayload> {
    const response = await this._request<
      L.CreateNotificationSubscriptionMutation,
      L.CreateNotificationSubscriptionMutationVariables
    >(L.CreateNotificationSubscriptionDocument, {
      input,
    });
    const data = response.notificationSubscriptionCreate;

    return new NotificationSubscriptionPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteNotificationSubscription Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteNotificationSubscriptionMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteNotificationSubscription mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteNotificationSubscription
   * @returns parsed response from DeleteNotificationSubscriptionMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<
      L.DeleteNotificationSubscriptionMutation,
      L.DeleteNotificationSubscriptionMutationVariables
    >(L.DeleteNotificationSubscriptionDocument, {
      id,
    });
    const data = response.notificationSubscriptionDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateNotificationSubscription Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateNotificationSubscriptionMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateNotificationSubscription mutation and return a NotificationSubscriptionPayload
   *
   * @param id - required id to pass to updateNotificationSubscription
   * @param input - required input to pass to updateNotificationSubscription
   * @returns parsed response from UpdateNotificationSubscriptionMutation
   */
  public async fetch(
    id: string,
    input: L.NotificationSubscriptionUpdateInput
  ): LinearFetch<NotificationSubscriptionPayload> {
    const response = await this._request<
      L.UpdateNotificationSubscriptionMutation,
      L.UpdateNotificationSubscriptionMutationVariables
    >(L.UpdateNotificationSubscriptionDocument, {
      id,
      input,
    });
    const data = response.notificationSubscriptionUpdate;

    return new NotificationSubscriptionPayload(this._request, data);
  }
}

/**
 * A fetchable UnarchiveNotification Mutation
 *
 * @param request - function to call the graphql client
 */
export class UnarchiveNotificationMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UnarchiveNotification mutation and return a ArchivePayload
   *
   * @param id - required id to pass to unarchiveNotification
   * @returns parsed response from UnarchiveNotificationMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.UnarchiveNotificationMutation, L.UnarchiveNotificationMutationVariables>(
      L.UnarchiveNotificationDocument,
      {
        id,
      }
    );
    const data = response.notificationUnarchive;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateNotification Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateNotificationMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateNotification mutation and return a NotificationPayload
   *
   * @param id - required id to pass to updateNotification
   * @param input - required input to pass to updateNotification
   * @returns parsed response from UpdateNotificationMutation
   */
  public async fetch(id: string, input: L.NotificationUpdateInput): LinearFetch<NotificationPayload> {
    const response = await this._request<L.UpdateNotificationMutation, L.UpdateNotificationMutationVariables>(
      L.UpdateNotificationDocument,
      {
        id,
        input,
      }
    );
    const data = response.notificationUpdate;

    return new NotificationPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteOrganizationCancel Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteOrganizationCancelMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteOrganizationCancel mutation and return a OrganizationCancelDeletePayload
   *
   * @returns parsed response from DeleteOrganizationCancelMutation
   */
  public async fetch(): LinearFetch<OrganizationCancelDeletePayload> {
    const response = await this._request<
      L.DeleteOrganizationCancelMutation,
      L.DeleteOrganizationCancelMutationVariables
    >(L.DeleteOrganizationCancelDocument, {});
    const data = response.organizationCancelDelete;

    return new OrganizationCancelDeletePayload(this._request, data);
  }
}

/**
 * A fetchable DeleteOrganization Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteOrganizationMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteOrganization mutation and return a OrganizationDeletePayload
   *
   * @param input - required input to pass to deleteOrganization
   * @returns parsed response from DeleteOrganizationMutation
   */
  public async fetch(input: L.DeleteOrganizationInput): LinearFetch<OrganizationDeletePayload> {
    const response = await this._request<L.DeleteOrganizationMutation, L.DeleteOrganizationMutationVariables>(
      L.DeleteOrganizationDocument,
      {
        input,
      }
    );
    const data = response.organizationDelete;

    return new OrganizationDeletePayload(this._request, data);
  }
}

/**
 * A fetchable OrganizationDeleteChallenge Mutation
 *
 * @param request - function to call the graphql client
 */
export class OrganizationDeleteChallengeMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the OrganizationDeleteChallenge mutation and return a OrganizationDeletePayload
   *
   * @returns parsed response from OrganizationDeleteChallengeMutation
   */
  public async fetch(): LinearFetch<OrganizationDeletePayload> {
    const response = await this._request<
      L.OrganizationDeleteChallengeMutation,
      L.OrganizationDeleteChallengeMutationVariables
    >(L.OrganizationDeleteChallengeDocument, {});
    const data = response.organizationDeleteChallenge;

    return new OrganizationDeletePayload(this._request, data);
  }
}

/**
 * A fetchable DeleteOrganizationDomain Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteOrganizationDomainMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteOrganizationDomain mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteOrganizationDomain
   * @returns parsed response from DeleteOrganizationDomainMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<
      L.DeleteOrganizationDomainMutation,
      L.DeleteOrganizationDomainMutationVariables
    >(L.DeleteOrganizationDomainDocument, {
      id,
    });
    const data = response.organizationDomainDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable CreateOrganizationInvite Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateOrganizationInviteMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateOrganizationInvite mutation and return a OrganizationInvitePayload
   *
   * @param input - required input to pass to createOrganizationInvite
   * @returns parsed response from CreateOrganizationInviteMutation
   */
  public async fetch(input: L.OrganizationInviteCreateInput): LinearFetch<OrganizationInvitePayload> {
    const response = await this._request<
      L.CreateOrganizationInviteMutation,
      L.CreateOrganizationInviteMutationVariables
    >(L.CreateOrganizationInviteDocument, {
      input,
    });
    const data = response.organizationInviteCreate;

    return new OrganizationInvitePayload(this._request, data);
  }
}

/**
 * A fetchable DeleteOrganizationInvite Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteOrganizationInviteMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteOrganizationInvite mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteOrganizationInvite
   * @returns parsed response from DeleteOrganizationInviteMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<
      L.DeleteOrganizationInviteMutation,
      L.DeleteOrganizationInviteMutationVariables
    >(L.DeleteOrganizationInviteDocument, {
      id,
    });
    const data = response.organizationInviteDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateOrganizationInvite Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateOrganizationInviteMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateOrganizationInvite mutation and return a OrganizationInvitePayload
   *
   * @param id - required id to pass to updateOrganizationInvite
   * @param input - required input to pass to updateOrganizationInvite
   * @returns parsed response from UpdateOrganizationInviteMutation
   */
  public async fetch(id: string, input: L.OrganizationInviteUpdateInput): LinearFetch<OrganizationInvitePayload> {
    const response = await this._request<
      L.UpdateOrganizationInviteMutation,
      L.UpdateOrganizationInviteMutationVariables
    >(L.UpdateOrganizationInviteDocument, {
      id,
      input,
    });
    const data = response.organizationInviteUpdate;

    return new OrganizationInvitePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateOrganization Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateOrganizationMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateOrganization mutation and return a OrganizationPayload
   *
   * @param input - required input to pass to updateOrganization
   * @returns parsed response from UpdateOrganizationMutation
   */
  public async fetch(input: L.UpdateOrganizationInput): LinearFetch<OrganizationPayload> {
    const response = await this._request<L.UpdateOrganizationMutation, L.UpdateOrganizationMutationVariables>(
      L.UpdateOrganizationDocument,
      {
        input,
      }
    );
    const data = response.organizationUpdate;

    return new OrganizationPayload(this._request, data);
  }
}

/**
 * A fetchable ArchiveProject Mutation
 *
 * @param request - function to call the graphql client
 */
export class ArchiveProjectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ArchiveProject mutation and return a ArchivePayload
   *
   * @param id - required id to pass to archiveProject
   * @returns parsed response from ArchiveProjectMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.ArchiveProjectMutation, L.ArchiveProjectMutationVariables>(
      L.ArchiveProjectDocument,
      {
        id,
      }
    );
    const data = response.projectArchive;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable CreateProject Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateProjectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateProject mutation and return a ProjectPayload
   *
   * @param input - required input to pass to createProject
   * @returns parsed response from CreateProjectMutation
   */
  public async fetch(input: L.ProjectCreateInput): LinearFetch<ProjectPayload> {
    const response = await this._request<L.CreateProjectMutation, L.CreateProjectMutationVariables>(
      L.CreateProjectDocument,
      {
        input,
      }
    );
    const data = response.projectCreate;

    return new ProjectPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteProject Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteProjectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteProject mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteProject
   * @returns parsed response from DeleteProjectMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteProjectMutation, L.DeleteProjectMutationVariables>(
      L.DeleteProjectDocument,
      {
        id,
      }
    );
    const data = response.projectDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable CreateProjectLink Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateProjectLinkMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateProjectLink mutation and return a ProjectLinkPayload
   *
   * @param input - required input to pass to createProjectLink
   * @returns parsed response from CreateProjectLinkMutation
   */
  public async fetch(input: L.ProjectLinkCreateInput): LinearFetch<ProjectLinkPayload> {
    const response = await this._request<L.CreateProjectLinkMutation, L.CreateProjectLinkMutationVariables>(
      L.CreateProjectLinkDocument,
      {
        input,
      }
    );
    const data = response.projectLinkCreate;

    return new ProjectLinkPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteProjectLink Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteProjectLinkMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteProjectLink mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteProjectLink
   * @returns parsed response from DeleteProjectLinkMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteProjectLinkMutation, L.DeleteProjectLinkMutationVariables>(
      L.DeleteProjectLinkDocument,
      {
        id,
      }
    );
    const data = response.projectLinkDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateProjectLink Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateProjectLinkMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateProjectLink mutation and return a ProjectLinkPayload
   *
   * @param id - required id to pass to updateProjectLink
   * @param input - required input to pass to updateProjectLink
   * @returns parsed response from UpdateProjectLinkMutation
   */
  public async fetch(id: string, input: L.ProjectLinkUpdateInput): LinearFetch<ProjectLinkPayload> {
    const response = await this._request<L.UpdateProjectLinkMutation, L.UpdateProjectLinkMutationVariables>(
      L.UpdateProjectLinkDocument,
      {
        id,
        input,
      }
    );
    const data = response.projectLinkUpdate;

    return new ProjectLinkPayload(this._request, data);
  }
}

/**
 * A fetchable CreateProjectMilestone Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateProjectMilestoneMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateProjectMilestone mutation and return a ProjectMilestonePayload
   *
   * @param input - required input to pass to createProjectMilestone
   * @returns parsed response from CreateProjectMilestoneMutation
   */
  public async fetch(input: L.ProjectMilestoneCreateInput): LinearFetch<ProjectMilestonePayload> {
    const response = await this._request<L.CreateProjectMilestoneMutation, L.CreateProjectMilestoneMutationVariables>(
      L.CreateProjectMilestoneDocument,
      {
        input,
      }
    );
    const data = response.projectMilestoneCreate;

    return new ProjectMilestonePayload(this._request, data);
  }
}

/**
 * A fetchable DeleteProjectMilestone Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteProjectMilestoneMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteProjectMilestone mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteProjectMilestone
   * @returns parsed response from DeleteProjectMilestoneMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteProjectMilestoneMutation, L.DeleteProjectMilestoneMutationVariables>(
      L.DeleteProjectMilestoneDocument,
      {
        id,
      }
    );
    const data = response.projectMilestoneDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateProjectMilestone Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateProjectMilestoneMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateProjectMilestone mutation and return a ProjectMilestonePayload
   *
   * @param id - required id to pass to updateProjectMilestone
   * @param input - required input to pass to updateProjectMilestone
   * @returns parsed response from UpdateProjectMilestoneMutation
   */
  public async fetch(id: string, input: L.ProjectMilestoneUpdateInput): LinearFetch<ProjectMilestonePayload> {
    const response = await this._request<L.UpdateProjectMilestoneMutation, L.UpdateProjectMilestoneMutationVariables>(
      L.UpdateProjectMilestoneDocument,
      {
        id,
        input,
      }
    );
    const data = response.projectMilestoneUpdate;

    return new ProjectMilestonePayload(this._request, data);
  }
}

/**
 * A fetchable UnarchiveProject Mutation
 *
 * @param request - function to call the graphql client
 */
export class UnarchiveProjectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UnarchiveProject mutation and return a ArchivePayload
   *
   * @param id - required id to pass to unarchiveProject
   * @returns parsed response from UnarchiveProjectMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.UnarchiveProjectMutation, L.UnarchiveProjectMutationVariables>(
      L.UnarchiveProjectDocument,
      {
        id,
      }
    );
    const data = response.projectUnarchive;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateProject Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateProjectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateProject mutation and return a ProjectPayload
   *
   * @param id - required id to pass to updateProject
   * @param input - required input to pass to updateProject
   * @returns parsed response from UpdateProjectMutation
   */
  public async fetch(id: string, input: L.ProjectUpdateInput): LinearFetch<ProjectPayload> {
    const response = await this._request<L.UpdateProjectMutation, L.UpdateProjectMutationVariables>(
      L.UpdateProjectDocument,
      {
        id,
        input,
      }
    );
    const data = response.projectUpdate;

    return new ProjectPayload(this._request, data);
  }
}

/**
 * A fetchable CreateProjectUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateProjectUpdateMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateProjectUpdate mutation and return a ProjectUpdatePayload
   *
   * @param input - required input to pass to createProjectUpdate
   * @returns parsed response from CreateProjectUpdateMutation
   */
  public async fetch(input: L.ProjectUpdateCreateInput): LinearFetch<ProjectUpdatePayload> {
    const response = await this._request<L.CreateProjectUpdateMutation, L.CreateProjectUpdateMutationVariables>(
      L.CreateProjectUpdateDocument,
      {
        input,
      }
    );
    const data = response.projectUpdateCreate;

    return new ProjectUpdatePayload(this._request, data);
  }
}

/**
 * A fetchable DeleteProjectUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteProjectUpdateMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteProjectUpdate mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteProjectUpdate
   * @returns parsed response from DeleteProjectUpdateMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteProjectUpdateMutation, L.DeleteProjectUpdateMutationVariables>(
      L.DeleteProjectUpdateDocument,
      {
        id,
      }
    );
    const data = response.projectUpdateDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable CreateProjectUpdateInteraction Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateProjectUpdateInteractionMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateProjectUpdateInteraction mutation and return a ProjectUpdateInteractionPayload
   *
   * @param input - required input to pass to createProjectUpdateInteraction
   * @returns parsed response from CreateProjectUpdateInteractionMutation
   */
  public async fetch(input: L.ProjectUpdateInteractionCreateInput): LinearFetch<ProjectUpdateInteractionPayload> {
    const response = await this._request<
      L.CreateProjectUpdateInteractionMutation,
      L.CreateProjectUpdateInteractionMutationVariables
    >(L.CreateProjectUpdateInteractionDocument, {
      input,
    });
    const data = response.projectUpdateInteractionCreate;

    return new ProjectUpdateInteractionPayload(this._request, data);
  }
}

/**
 * A fetchable ProjectUpdateMarkAsRead Mutation
 *
 * @param request - function to call the graphql client
 */
export class ProjectUpdateMarkAsReadMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ProjectUpdateMarkAsRead mutation and return a ProjectUpdateWithInteractionPayload
   *
   * @param id - required id to pass to projectUpdateMarkAsRead
   * @returns parsed response from ProjectUpdateMarkAsReadMutation
   */
  public async fetch(id: string): LinearFetch<ProjectUpdateWithInteractionPayload> {
    const response = await this._request<L.ProjectUpdateMarkAsReadMutation, L.ProjectUpdateMarkAsReadMutationVariables>(
      L.ProjectUpdateMarkAsReadDocument,
      {
        id,
      }
    );
    const data = response.projectUpdateMarkAsRead;

    return new ProjectUpdateWithInteractionPayload(this._request, data);
  }
}

/**
 * A fetchable UpdateProjectUpdate Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateProjectUpdateMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateProjectUpdate mutation and return a ProjectUpdatePayload
   *
   * @param id - required id to pass to updateProjectUpdate
   * @param input - required input to pass to updateProjectUpdate
   * @returns parsed response from UpdateProjectUpdateMutation
   */
  public async fetch(id: string, input: L.ProjectUpdateUpdateInput): LinearFetch<ProjectUpdatePayload> {
    const response = await this._request<L.UpdateProjectUpdateMutation, L.UpdateProjectUpdateMutationVariables>(
      L.UpdateProjectUpdateDocument,
      {
        id,
        input,
      }
    );
    const data = response.projectUpdateUpdate;

    return new ProjectUpdatePayload(this._request, data);
  }
}

/**
 * A fetchable CreatePushSubscription Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreatePushSubscriptionMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreatePushSubscription mutation and return a PushSubscriptionPayload
   *
   * @param input - required input to pass to createPushSubscription
   * @returns parsed response from CreatePushSubscriptionMutation
   */
  public async fetch(input: L.PushSubscriptionCreateInput): LinearFetch<PushSubscriptionPayload> {
    const response = await this._request<L.CreatePushSubscriptionMutation, L.CreatePushSubscriptionMutationVariables>(
      L.CreatePushSubscriptionDocument,
      {
        input,
      }
    );
    const data = response.pushSubscriptionCreate;

    return new PushSubscriptionPayload(this._request, data);
  }
}

/**
 * A fetchable DeletePushSubscription Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeletePushSubscriptionMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeletePushSubscription mutation and return a PushSubscriptionPayload
   *
   * @param id - required id to pass to deletePushSubscription
   * @returns parsed response from DeletePushSubscriptionMutation
   */
  public async fetch(id: string): LinearFetch<PushSubscriptionPayload> {
    const response = await this._request<L.DeletePushSubscriptionMutation, L.DeletePushSubscriptionMutationVariables>(
      L.DeletePushSubscriptionDocument,
      {
        id,
      }
    );
    const data = response.pushSubscriptionDelete;

    return new PushSubscriptionPayload(this._request, data);
  }
}

/**
 * A fetchable CreateReaction Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateReactionMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateReaction mutation and return a ReactionPayload
   *
   * @param input - required input to pass to createReaction
   * @returns parsed response from CreateReactionMutation
   */
  public async fetch(input: L.ReactionCreateInput): LinearFetch<ReactionPayload> {
    const response = await this._request<L.CreateReactionMutation, L.CreateReactionMutationVariables>(
      L.CreateReactionDocument,
      {
        input,
      }
    );
    const data = response.reactionCreate;

    return new ReactionPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteReaction Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteReactionMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteReaction mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteReaction
   * @returns parsed response from DeleteReactionMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteReactionMutation, L.DeleteReactionMutationVariables>(
      L.DeleteReactionDocument,
      {
        id,
      }
    );
    const data = response.reactionDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable RefreshGoogleSheetsData Mutation
 *
 * @param request - function to call the graphql client
 */
export class RefreshGoogleSheetsDataMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the RefreshGoogleSheetsData mutation and return a IntegrationPayload
   *
   * @param id - required id to pass to refreshGoogleSheetsData
   * @returns parsed response from RefreshGoogleSheetsDataMutation
   */
  public async fetch(id: string): LinearFetch<IntegrationPayload> {
    const response = await this._request<L.RefreshGoogleSheetsDataMutation, L.RefreshGoogleSheetsDataMutationVariables>(
      L.RefreshGoogleSheetsDataDocument,
      {
        id,
      }
    );
    const data = response.refreshGoogleSheetsData;

    return new IntegrationPayload(this._request, data);
  }
}

/**
 * A fetchable ResendOrganizationInvite Mutation
 *
 * @param request - function to call the graphql client
 */
export class ResendOrganizationInviteMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ResendOrganizationInvite mutation and return a ArchivePayload
   *
   * @param id - required id to pass to resendOrganizationInvite
   * @returns parsed response from ResendOrganizationInviteMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<
      L.ResendOrganizationInviteMutation,
      L.ResendOrganizationInviteMutationVariables
    >(L.ResendOrganizationInviteDocument, {
      id,
    });
    const data = response.resendOrganizationInvite;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable CreateRoadmap Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateRoadmapMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateRoadmap mutation and return a RoadmapPayload
   *
   * @param input - required input to pass to createRoadmap
   * @returns parsed response from CreateRoadmapMutation
   */
  public async fetch(input: L.RoadmapCreateInput): LinearFetch<RoadmapPayload> {
    const response = await this._request<L.CreateRoadmapMutation, L.CreateRoadmapMutationVariables>(
      L.CreateRoadmapDocument,
      {
        input,
      }
    );
    const data = response.roadmapCreate;

    return new RoadmapPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteRoadmap Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteRoadmapMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteRoadmap mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteRoadmap
   * @returns parsed response from DeleteRoadmapMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteRoadmapMutation, L.DeleteRoadmapMutationVariables>(
      L.DeleteRoadmapDocument,
      {
        id,
      }
    );
    const data = response.roadmapDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable CreateRoadmapToProject Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateRoadmapToProjectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateRoadmapToProject mutation and return a RoadmapToProjectPayload
   *
   * @param input - required input to pass to createRoadmapToProject
   * @returns parsed response from CreateRoadmapToProjectMutation
   */
  public async fetch(input: L.RoadmapToProjectCreateInput): LinearFetch<RoadmapToProjectPayload> {
    const response = await this._request<L.CreateRoadmapToProjectMutation, L.CreateRoadmapToProjectMutationVariables>(
      L.CreateRoadmapToProjectDocument,
      {
        input,
      }
    );
    const data = response.roadmapToProjectCreate;

    return new RoadmapToProjectPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteRoadmapToProject Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteRoadmapToProjectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteRoadmapToProject mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteRoadmapToProject
   * @returns parsed response from DeleteRoadmapToProjectMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteRoadmapToProjectMutation, L.DeleteRoadmapToProjectMutationVariables>(
      L.DeleteRoadmapToProjectDocument,
      {
        id,
      }
    );
    const data = response.roadmapToProjectDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateRoadmapToProject Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateRoadmapToProjectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateRoadmapToProject mutation and return a RoadmapToProjectPayload
   *
   * @param id - required id to pass to updateRoadmapToProject
   * @param input - required input to pass to updateRoadmapToProject
   * @returns parsed response from UpdateRoadmapToProjectMutation
   */
  public async fetch(id: string, input: L.RoadmapToProjectUpdateInput): LinearFetch<RoadmapToProjectPayload> {
    const response = await this._request<L.UpdateRoadmapToProjectMutation, L.UpdateRoadmapToProjectMutationVariables>(
      L.UpdateRoadmapToProjectDocument,
      {
        id,
        input,
      }
    );
    const data = response.roadmapToProjectUpdate;

    return new RoadmapToProjectPayload(this._request, data);
  }
}

/**
 * A fetchable UpdateRoadmap Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateRoadmapMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateRoadmap mutation and return a RoadmapPayload
   *
   * @param id - required id to pass to updateRoadmap
   * @param input - required input to pass to updateRoadmap
   * @returns parsed response from UpdateRoadmapMutation
   */
  public async fetch(id: string, input: L.RoadmapUpdateInput): LinearFetch<RoadmapPayload> {
    const response = await this._request<L.UpdateRoadmapMutation, L.UpdateRoadmapMutationVariables>(
      L.UpdateRoadmapDocument,
      {
        id,
        input,
      }
    );
    const data = response.roadmapUpdate;

    return new RoadmapPayload(this._request, data);
  }
}

/**
 * A fetchable SamlTokenUserAccountAuth Mutation
 *
 * @param request - function to call the graphql client
 */
export class SamlTokenUserAccountAuthMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the SamlTokenUserAccountAuth mutation and return a AuthResolverResponse
   *
   * @param input - required input to pass to samlTokenUserAccountAuth
   * @returns parsed response from SamlTokenUserAccountAuthMutation
   */
  public async fetch(input: L.TokenUserAccountAuthInput): LinearFetch<AuthResolverResponse> {
    const response = await this._request<
      L.SamlTokenUserAccountAuthMutation,
      L.SamlTokenUserAccountAuthMutationVariables
    >(L.SamlTokenUserAccountAuthDocument, {
      input,
    });
    const data = response.samlTokenUserAccountAuth;

    return new AuthResolverResponse(this._request, data);
  }
}

/**
 * A fetchable CreateTeam Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateTeamMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateTeam mutation and return a TeamPayload
   *
   * @param input - required input to pass to createTeam
   * @param variables - variables without 'input' to pass into the CreateTeamMutation
   * @returns parsed response from CreateTeamMutation
   */
  public async fetch(
    input: L.TeamCreateInput,
    variables?: Omit<L.CreateTeamMutationVariables, "input">
  ): LinearFetch<TeamPayload> {
    const response = await this._request<L.CreateTeamMutation, L.CreateTeamMutationVariables>(L.CreateTeamDocument, {
      input,
      ...variables,
    });
    const data = response.teamCreate;

    return new TeamPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteTeamCycles Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteTeamCyclesMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteTeamCycles mutation and return a TeamPayload
   *
   * @param id - required id to pass to deleteTeamCycles
   * @returns parsed response from DeleteTeamCyclesMutation
   */
  public async fetch(id: string): LinearFetch<TeamPayload> {
    const response = await this._request<L.DeleteTeamCyclesMutation, L.DeleteTeamCyclesMutationVariables>(
      L.DeleteTeamCyclesDocument,
      {
        id,
      }
    );
    const data = response.teamCyclesDelete;

    return new TeamPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteTeam Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteTeamMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteTeam mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteTeam
   * @returns parsed response from DeleteTeamMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteTeamMutation, L.DeleteTeamMutationVariables>(L.DeleteTeamDocument, {
      id,
    });
    const data = response.teamDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable DeleteTeamKey Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteTeamKeyMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteTeamKey mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteTeamKey
   * @returns parsed response from DeleteTeamKeyMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteTeamKeyMutation, L.DeleteTeamKeyMutationVariables>(
      L.DeleteTeamKeyDocument,
      {
        id,
      }
    );
    const data = response.teamKeyDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable CreateTeamMembership Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateTeamMembershipMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateTeamMembership mutation and return a TeamMembershipPayload
   *
   * @param input - required input to pass to createTeamMembership
   * @returns parsed response from CreateTeamMembershipMutation
   */
  public async fetch(input: L.TeamMembershipCreateInput): LinearFetch<TeamMembershipPayload> {
    const response = await this._request<L.CreateTeamMembershipMutation, L.CreateTeamMembershipMutationVariables>(
      L.CreateTeamMembershipDocument,
      {
        input,
      }
    );
    const data = response.teamMembershipCreate;

    return new TeamMembershipPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteTeamMembership Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteTeamMembershipMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteTeamMembership mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteTeamMembership
   * @returns parsed response from DeleteTeamMembershipMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteTeamMembershipMutation, L.DeleteTeamMembershipMutationVariables>(
      L.DeleteTeamMembershipDocument,
      {
        id,
      }
    );
    const data = response.teamMembershipDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateTeamMembership Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateTeamMembershipMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateTeamMembership mutation and return a TeamMembershipPayload
   *
   * @param id - required id to pass to updateTeamMembership
   * @param input - required input to pass to updateTeamMembership
   * @returns parsed response from UpdateTeamMembershipMutation
   */
  public async fetch(id: string, input: L.TeamMembershipUpdateInput): LinearFetch<TeamMembershipPayload> {
    const response = await this._request<L.UpdateTeamMembershipMutation, L.UpdateTeamMembershipMutationVariables>(
      L.UpdateTeamMembershipDocument,
      {
        id,
        input,
      }
    );
    const data = response.teamMembershipUpdate;

    return new TeamMembershipPayload(this._request, data);
  }
}

/**
 * A fetchable UpdateTeam Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateTeamMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateTeam mutation and return a TeamPayload
   *
   * @param id - required id to pass to updateTeam
   * @param input - required input to pass to updateTeam
   * @returns parsed response from UpdateTeamMutation
   */
  public async fetch(id: string, input: L.TeamUpdateInput): LinearFetch<TeamPayload> {
    const response = await this._request<L.UpdateTeamMutation, L.UpdateTeamMutationVariables>(L.UpdateTeamDocument, {
      id,
      input,
    });
    const data = response.teamUpdate;

    return new TeamPayload(this._request, data);
  }
}

/**
 * A fetchable CreateTemplate Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateTemplateMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateTemplate mutation and return a TemplatePayload
   *
   * @param input - required input to pass to createTemplate
   * @returns parsed response from CreateTemplateMutation
   */
  public async fetch(input: L.TemplateCreateInput): LinearFetch<TemplatePayload> {
    const response = await this._request<L.CreateTemplateMutation, L.CreateTemplateMutationVariables>(
      L.CreateTemplateDocument,
      {
        input,
      }
    );
    const data = response.templateCreate;

    return new TemplatePayload(this._request, data);
  }
}

/**
 * A fetchable DeleteTemplate Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteTemplateMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteTemplate mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteTemplate
   * @returns parsed response from DeleteTemplateMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteTemplateMutation, L.DeleteTemplateMutationVariables>(
      L.DeleteTemplateDocument,
      {
        id,
      }
    );
    const data = response.templateDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateTemplate Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateTemplateMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateTemplate mutation and return a TemplatePayload
   *
   * @param id - required id to pass to updateTemplate
   * @param input - required input to pass to updateTemplate
   * @returns parsed response from UpdateTemplateMutation
   */
  public async fetch(id: string, input: L.TemplateUpdateInput): LinearFetch<TemplatePayload> {
    const response = await this._request<L.UpdateTemplateMutation, L.UpdateTemplateMutationVariables>(
      L.UpdateTemplateDocument,
      {
        id,
        input,
      }
    );
    const data = response.templateUpdate;

    return new TemplatePayload(this._request, data);
  }
}

/**
 * A fetchable UserDemoteAdmin Mutation
 *
 * @param request - function to call the graphql client
 */
export class UserDemoteAdminMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UserDemoteAdmin mutation and return a UserAdminPayload
   *
   * @param id - required id to pass to userDemoteAdmin
   * @returns parsed response from UserDemoteAdminMutation
   */
  public async fetch(id: string): LinearFetch<UserAdminPayload> {
    const response = await this._request<L.UserDemoteAdminMutation, L.UserDemoteAdminMutationVariables>(
      L.UserDemoteAdminDocument,
      {
        id,
      }
    );
    const data = response.userDemoteAdmin;

    return new UserAdminPayload(this._request, data);
  }
}

/**
 * A fetchable UserDemoteMember Mutation
 *
 * @param request - function to call the graphql client
 */
export class UserDemoteMemberMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UserDemoteMember mutation and return a UserAdminPayload
   *
   * @param id - required id to pass to userDemoteMember
   * @returns parsed response from UserDemoteMemberMutation
   */
  public async fetch(id: string): LinearFetch<UserAdminPayload> {
    const response = await this._request<L.UserDemoteMemberMutation, L.UserDemoteMemberMutationVariables>(
      L.UserDemoteMemberDocument,
      {
        id,
      }
    );
    const data = response.userDemoteMember;

    return new UserAdminPayload(this._request, data);
  }
}

/**
 * A fetchable UserDiscordConnect Mutation
 *
 * @param request - function to call the graphql client
 */
export class UserDiscordConnectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UserDiscordConnect mutation and return a UserPayload
   *
   * @param code - required code to pass to userDiscordConnect
   * @param redirectUri - required redirectUri to pass to userDiscordConnect
   * @returns parsed response from UserDiscordConnectMutation
   */
  public async fetch(code: string, redirectUri: string): LinearFetch<UserPayload> {
    const response = await this._request<L.UserDiscordConnectMutation, L.UserDiscordConnectMutationVariables>(
      L.UserDiscordConnectDocument,
      {
        code,
        redirectUri,
      }
    );
    const data = response.userDiscordConnect;

    return new UserPayload(this._request, data);
  }
}

/**
 * A fetchable UserExternalUserDisconnect Mutation
 *
 * @param request - function to call the graphql client
 */
export class UserExternalUserDisconnectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UserExternalUserDisconnect mutation and return a UserPayload
   *
   * @param service - required service to pass to userExternalUserDisconnect
   * @returns parsed response from UserExternalUserDisconnectMutation
   */
  public async fetch(service: string): LinearFetch<UserPayload> {
    const response = await this._request<
      L.UserExternalUserDisconnectMutation,
      L.UserExternalUserDisconnectMutationVariables
    >(L.UserExternalUserDisconnectDocument, {
      service,
    });
    const data = response.userExternalUserDisconnect;

    return new UserPayload(this._request, data);
  }
}

/**
 * A fetchable UpdateUserFlag Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateUserFlagMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateUserFlag mutation and return a UserSettingsFlagPayload
   *
   * @param flag - required flag to pass to updateUserFlag
   * @param operation - required operation to pass to updateUserFlag
   * @returns parsed response from UpdateUserFlagMutation
   */
  public async fetch(flag: L.UserFlagType, operation: L.UserFlagUpdateOperation): LinearFetch<UserSettingsFlagPayload> {
    const response = await this._request<L.UpdateUserFlagMutation, L.UpdateUserFlagMutationVariables>(
      L.UpdateUserFlagDocument,
      {
        flag,
        operation,
      }
    );
    const data = response.userFlagUpdate;

    return new UserSettingsFlagPayload(this._request, data);
  }
}

/**
 * A fetchable UserGitHubConnect Mutation
 *
 * @param request - function to call the graphql client
 */
export class UserGitHubConnectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UserGitHubConnect mutation and return a UserPayload
   *
   * @param code - required code to pass to userGitHubConnect
   * @returns parsed response from UserGitHubConnectMutation
   */
  public async fetch(code: string): LinearFetch<UserPayload> {
    const response = await this._request<L.UserGitHubConnectMutation, L.UserGitHubConnectMutationVariables>(
      L.UserGitHubConnectDocument,
      {
        code,
      }
    );
    const data = response.userGitHubConnect;

    return new UserPayload(this._request, data);
  }
}

/**
 * A fetchable UserGoogleCalendarConnect Mutation
 *
 * @param request - function to call the graphql client
 */
export class UserGoogleCalendarConnectMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UserGoogleCalendarConnect mutation and return a UserPayload
   *
   * @param code - required code to pass to userGoogleCalendarConnect
   * @returns parsed response from UserGoogleCalendarConnectMutation
   */
  public async fetch(code: string): LinearFetch<UserPayload> {
    const response = await this._request<
      L.UserGoogleCalendarConnectMutation,
      L.UserGoogleCalendarConnectMutationVariables
    >(L.UserGoogleCalendarConnectDocument, {
      code,
    });
    const data = response.userGoogleCalendarConnect;

    return new UserPayload(this._request, data);
  }
}

/**
 * A fetchable UserPromoteAdmin Mutation
 *
 * @param request - function to call the graphql client
 */
export class UserPromoteAdminMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UserPromoteAdmin mutation and return a UserAdminPayload
   *
   * @param id - required id to pass to userPromoteAdmin
   * @returns parsed response from UserPromoteAdminMutation
   */
  public async fetch(id: string): LinearFetch<UserAdminPayload> {
    const response = await this._request<L.UserPromoteAdminMutation, L.UserPromoteAdminMutationVariables>(
      L.UserPromoteAdminDocument,
      {
        id,
      }
    );
    const data = response.userPromoteAdmin;

    return new UserAdminPayload(this._request, data);
  }
}

/**
 * A fetchable UserPromoteMember Mutation
 *
 * @param request - function to call the graphql client
 */
export class UserPromoteMemberMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UserPromoteMember mutation and return a UserAdminPayload
   *
   * @param id - required id to pass to userPromoteMember
   * @returns parsed response from UserPromoteMemberMutation
   */
  public async fetch(id: string): LinearFetch<UserAdminPayload> {
    const response = await this._request<L.UserPromoteMemberMutation, L.UserPromoteMemberMutationVariables>(
      L.UserPromoteMemberDocument,
      {
        id,
      }
    );
    const data = response.userPromoteMember;

    return new UserAdminPayload(this._request, data);
  }
}

/**
 * A fetchable UserSettingsFlagIncrement Mutation
 *
 * @param request - function to call the graphql client
 */
export class UserSettingsFlagIncrementMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UserSettingsFlagIncrement mutation and return a UserSettingsFlagPayload
   *
   * @param flag - required flag to pass to userSettingsFlagIncrement
   * @returns parsed response from UserSettingsFlagIncrementMutation
   */
  public async fetch(flag: string): LinearFetch<UserSettingsFlagPayload> {
    const response = await this._request<
      L.UserSettingsFlagIncrementMutation,
      L.UserSettingsFlagIncrementMutationVariables
    >(L.UserSettingsFlagIncrementDocument, {
      flag,
    });
    const data = response.userSettingsFlagIncrement;

    return new UserSettingsFlagPayload(this._request, data);
  }
}

/**
 * A fetchable UserSettingsFlagsReset Mutation
 *
 * @param request - function to call the graphql client
 */
export class UserSettingsFlagsResetMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UserSettingsFlagsReset mutation and return a UserSettingsFlagsResetPayload
   *
   * @param variables - variables to pass into the UserSettingsFlagsResetMutation
   * @returns parsed response from UserSettingsFlagsResetMutation
   */
  public async fetch(
    variables?: L.UserSettingsFlagsResetMutationVariables
  ): LinearFetch<UserSettingsFlagsResetPayload> {
    const response = await this._request<L.UserSettingsFlagsResetMutation, L.UserSettingsFlagsResetMutationVariables>(
      L.UserSettingsFlagsResetDocument,
      variables
    );
    const data = response.userSettingsFlagsReset;

    return new UserSettingsFlagsResetPayload(this._request, data);
  }
}

/**
 * A fetchable UpdateUserSettings Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateUserSettingsMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateUserSettings mutation and return a UserSettingsPayload
   *
   * @param id - required id to pass to updateUserSettings
   * @param input - required input to pass to updateUserSettings
   * @returns parsed response from UpdateUserSettingsMutation
   */
  public async fetch(id: string, input: L.UserSettingsUpdateInput): LinearFetch<UserSettingsPayload> {
    const response = await this._request<L.UpdateUserSettingsMutation, L.UpdateUserSettingsMutationVariables>(
      L.UpdateUserSettingsDocument,
      {
        id,
        input,
      }
    );
    const data = response.userSettingsUpdate;

    return new UserSettingsPayload(this._request, data);
  }
}

/**
 * A fetchable SuspendUser Mutation
 *
 * @param request - function to call the graphql client
 */
export class SuspendUserMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the SuspendUser mutation and return a UserAdminPayload
   *
   * @param id - required id to pass to suspendUser
   * @returns parsed response from SuspendUserMutation
   */
  public async fetch(id: string): LinearFetch<UserAdminPayload> {
    const response = await this._request<L.SuspendUserMutation, L.SuspendUserMutationVariables>(L.SuspendUserDocument, {
      id,
    });
    const data = response.userSuspend;

    return new UserAdminPayload(this._request, data);
  }
}

/**
 * A fetchable UnsuspendUser Mutation
 *
 * @param request - function to call the graphql client
 */
export class UnsuspendUserMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UnsuspendUser mutation and return a UserAdminPayload
   *
   * @param id - required id to pass to unsuspendUser
   * @returns parsed response from UnsuspendUserMutation
   */
  public async fetch(id: string): LinearFetch<UserAdminPayload> {
    const response = await this._request<L.UnsuspendUserMutation, L.UnsuspendUserMutationVariables>(
      L.UnsuspendUserDocument,
      {
        id,
      }
    );
    const data = response.userUnsuspend;

    return new UserAdminPayload(this._request, data);
  }
}

/**
 * A fetchable UpdateUser Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateUserMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateUser mutation and return a UserPayload
   *
   * @param id - required id to pass to updateUser
   * @param input - required input to pass to updateUser
   * @returns parsed response from UpdateUserMutation
   */
  public async fetch(id: string, input: L.UpdateUserInput): LinearFetch<UserPayload> {
    const response = await this._request<L.UpdateUserMutation, L.UpdateUserMutationVariables>(L.UpdateUserDocument, {
      id,
      input,
    });
    const data = response.userUpdate;

    return new UserPayload(this._request, data);
  }
}

/**
 * A fetchable CreateViewPreferences Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateViewPreferencesMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateViewPreferences mutation and return a ViewPreferencesPayload
   *
   * @param input - required input to pass to createViewPreferences
   * @returns parsed response from CreateViewPreferencesMutation
   */
  public async fetch(input: L.ViewPreferencesCreateInput): LinearFetch<ViewPreferencesPayload> {
    const response = await this._request<L.CreateViewPreferencesMutation, L.CreateViewPreferencesMutationVariables>(
      L.CreateViewPreferencesDocument,
      {
        input,
      }
    );
    const data = response.viewPreferencesCreate;

    return new ViewPreferencesPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteViewPreferences Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteViewPreferencesMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteViewPreferences mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteViewPreferences
   * @returns parsed response from DeleteViewPreferencesMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteViewPreferencesMutation, L.DeleteViewPreferencesMutationVariables>(
      L.DeleteViewPreferencesDocument,
      {
        id,
      }
    );
    const data = response.viewPreferencesDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateViewPreferences Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateViewPreferencesMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateViewPreferences mutation and return a ViewPreferencesPayload
   *
   * @param id - required id to pass to updateViewPreferences
   * @param input - required input to pass to updateViewPreferences
   * @returns parsed response from UpdateViewPreferencesMutation
   */
  public async fetch(id: string, input: L.ViewPreferencesUpdateInput): LinearFetch<ViewPreferencesPayload> {
    const response = await this._request<L.UpdateViewPreferencesMutation, L.UpdateViewPreferencesMutationVariables>(
      L.UpdateViewPreferencesDocument,
      {
        id,
        input,
      }
    );
    const data = response.viewPreferencesUpdate;

    return new ViewPreferencesPayload(this._request, data);
  }
}

/**
 * A fetchable CreateWebhook Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateWebhookMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateWebhook mutation and return a WebhookPayload
   *
   * @param input - required input to pass to createWebhook
   * @returns parsed response from CreateWebhookMutation
   */
  public async fetch(input: L.WebhookCreateInput): LinearFetch<WebhookPayload> {
    const response = await this._request<L.CreateWebhookMutation, L.CreateWebhookMutationVariables>(
      L.CreateWebhookDocument,
      {
        input,
      }
    );
    const data = response.webhookCreate;

    return new WebhookPayload(this._request, data);
  }
}

/**
 * A fetchable DeleteWebhook Mutation
 *
 * @param request - function to call the graphql client
 */
export class DeleteWebhookMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the DeleteWebhook mutation and return a ArchivePayload
   *
   * @param id - required id to pass to deleteWebhook
   * @returns parsed response from DeleteWebhookMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.DeleteWebhookMutation, L.DeleteWebhookMutationVariables>(
      L.DeleteWebhookDocument,
      {
        id,
      }
    );
    const data = response.webhookDelete;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateWebhook Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateWebhookMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateWebhook mutation and return a WebhookPayload
   *
   * @param id - required id to pass to updateWebhook
   * @param input - required input to pass to updateWebhook
   * @returns parsed response from UpdateWebhookMutation
   */
  public async fetch(id: string, input: L.WebhookUpdateInput): LinearFetch<WebhookPayload> {
    const response = await this._request<L.UpdateWebhookMutation, L.UpdateWebhookMutationVariables>(
      L.UpdateWebhookDocument,
      {
        id,
        input,
      }
    );
    const data = response.webhookUpdate;

    return new WebhookPayload(this._request, data);
  }
}

/**
 * A fetchable ArchiveWorkflowState Mutation
 *
 * @param request - function to call the graphql client
 */
export class ArchiveWorkflowStateMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ArchiveWorkflowState mutation and return a ArchivePayload
   *
   * @param id - required id to pass to archiveWorkflowState
   * @returns parsed response from ArchiveWorkflowStateMutation
   */
  public async fetch(id: string): LinearFetch<ArchivePayload> {
    const response = await this._request<L.ArchiveWorkflowStateMutation, L.ArchiveWorkflowStateMutationVariables>(
      L.ArchiveWorkflowStateDocument,
      {
        id,
      }
    );
    const data = response.workflowStateArchive;

    return new ArchivePayload(this._request, data);
  }
}

/**
 * A fetchable CreateWorkflowState Mutation
 *
 * @param request - function to call the graphql client
 */
export class CreateWorkflowStateMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CreateWorkflowState mutation and return a WorkflowStatePayload
   *
   * @param input - required input to pass to createWorkflowState
   * @returns parsed response from CreateWorkflowStateMutation
   */
  public async fetch(input: L.WorkflowStateCreateInput): LinearFetch<WorkflowStatePayload> {
    const response = await this._request<L.CreateWorkflowStateMutation, L.CreateWorkflowStateMutationVariables>(
      L.CreateWorkflowStateDocument,
      {
        input,
      }
    );
    const data = response.workflowStateCreate;

    return new WorkflowStatePayload(this._request, data);
  }
}

/**
 * A fetchable UpdateWorkflowState Mutation
 *
 * @param request - function to call the graphql client
 */
export class UpdateWorkflowStateMutation extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UpdateWorkflowState mutation and return a WorkflowStatePayload
   *
   * @param id - required id to pass to updateWorkflowState
   * @param input - required input to pass to updateWorkflowState
   * @returns parsed response from UpdateWorkflowStateMutation
   */
  public async fetch(id: string, input: L.WorkflowStateUpdateInput): LinearFetch<WorkflowStatePayload> {
    const response = await this._request<L.UpdateWorkflowStateMutation, L.UpdateWorkflowStateMutationVariables>(
      L.UpdateWorkflowStateDocument,
      {
        id,
        input,
      }
    );
    const data = response.workflowStateUpdate;

    return new WorkflowStatePayload(this._request, data);
  }
}

/**
 * A fetchable ProjectMilestone Query
 *
 * @param request - function to call the graphql client
 */
export class ProjectMilestoneQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ProjectMilestone query and return a ProjectMilestone
   *
   * @param id - required id to pass to ProjectMilestone
   * @returns parsed response from ProjectMilestoneQuery
   */
  public async fetch(id: string): LinearFetch<ProjectMilestone> {
    const response = await this._request<L.ProjectMilestoneQuery, L.ProjectMilestoneQueryVariables>(
      L.ProjectMilestoneDocument,
      {
        id,
      }
    );
    const data = response.ProjectMilestone;

    return new ProjectMilestone(this._request, data);
  }
}

/**
 * A fetchable ProjectMilestones Query
 *
 * @param request - function to call the graphql client
 */
export class ProjectMilestonesQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ProjectMilestones query and return a ProjectMilestoneConnection
   *
   * @param variables - variables to pass into the ProjectMilestonesQuery
   * @returns parsed response from ProjectMilestonesQuery
   */
  public async fetch(variables?: L.ProjectMilestonesQueryVariables): LinearFetch<ProjectMilestoneConnection> {
    const response = await this._request<L.ProjectMilestonesQuery, L.ProjectMilestonesQueryVariables>(
      L.ProjectMilestonesDocument,
      variables
    );
    const data = response.ProjectMilestones;

    return new ProjectMilestoneConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable AdministrableTeams Query
 *
 * @param request - function to call the graphql client
 */
export class AdministrableTeamsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the AdministrableTeams query and return a TeamConnection
   *
   * @param variables - variables to pass into the AdministrableTeamsQuery
   * @returns parsed response from AdministrableTeamsQuery
   */
  public async fetch(variables?: L.AdministrableTeamsQueryVariables): LinearFetch<TeamConnection> {
    const response = await this._request<L.AdministrableTeamsQuery, L.AdministrableTeamsQueryVariables>(
      L.AdministrableTeamsDocument,
      variables
    );
    const data = response.administrableTeams;

    return new TeamConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable ApiKeys Query
 *
 * @param request - function to call the graphql client
 */
export class ApiKeysQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ApiKeys query and return a ApiKeyConnection
   *
   * @param variables - variables to pass into the ApiKeysQuery
   * @returns parsed response from ApiKeysQuery
   */
  public async fetch(variables?: L.ApiKeysQueryVariables): LinearFetch<ApiKeyConnection> {
    const response = await this._request<L.ApiKeysQuery, L.ApiKeysQueryVariables>(L.ApiKeysDocument, variables);
    const data = response.apiKeys;

    return new ApiKeyConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable ApplicationInfo Query
 *
 * @param request - function to call the graphql client
 */
export class ApplicationInfoQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ApplicationInfo query and return a Application
   *
   * @param clientId - required clientId to pass to applicationInfo
   * @returns parsed response from ApplicationInfoQuery
   */
  public async fetch(clientId: string): LinearFetch<Application> {
    const response = await this._request<L.ApplicationInfoQuery, L.ApplicationInfoQueryVariables>(
      L.ApplicationInfoDocument,
      {
        clientId,
      }
    );
    const data = response.applicationInfo;

    return new Application(this._request, data);
  }
}

/**
 * A fetchable ApplicationWithAuthorization Query
 *
 * @param request - function to call the graphql client
 */
export class ApplicationWithAuthorizationQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ApplicationWithAuthorization query and return a UserAuthorizedApplication
   *
   * @param clientId - required clientId to pass to applicationWithAuthorization
   * @param scope - required scope to pass to applicationWithAuthorization
   * @param variables - variables without 'clientId', 'scope' to pass into the ApplicationWithAuthorizationQuery
   * @returns parsed response from ApplicationWithAuthorizationQuery
   */
  public async fetch(
    clientId: string,
    scope: string[],
    variables?: Omit<L.ApplicationWithAuthorizationQueryVariables, "clientId" | "scope">
  ): LinearFetch<UserAuthorizedApplication> {
    const response = await this._request<
      L.ApplicationWithAuthorizationQuery,
      L.ApplicationWithAuthorizationQueryVariables
    >(L.ApplicationWithAuthorizationDocument, {
      clientId,
      scope,
      ...variables,
    });
    const data = response.applicationWithAuthorization;

    return new UserAuthorizedApplication(this._request, data);
  }
}

/**
 * A fetchable Attachment Query
 *
 * @param request - function to call the graphql client
 */
export class AttachmentQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Attachment query and return a Attachment
   *
   * @param id - required id to pass to attachment
   * @returns parsed response from AttachmentQuery
   */
  public async fetch(id: string): LinearFetch<Attachment> {
    const response = await this._request<L.AttachmentQuery, L.AttachmentQueryVariables>(L.AttachmentDocument, {
      id,
    });
    const data = response.attachment;

    return new Attachment(this._request, data);
  }
}

/**
 * A fetchable AttachmentIssue Query
 *
 * @param request - function to call the graphql client
 */
export class AttachmentIssueQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the AttachmentIssue query and return a Issue
   *
   * @param id - required id to pass to attachmentIssue
   * @returns parsed response from AttachmentIssueQuery
   */
  public async fetch(id: string): LinearFetch<Issue> {
    const response = await this._request<L.AttachmentIssueQuery, L.AttachmentIssueQueryVariables>(
      L.AttachmentIssueDocument,
      {
        id,
      }
    );
    const data = response.attachmentIssue;

    return new Issue(this._request, data);
  }
}

/**
 * A fetchable Attachments Query
 *
 * @param request - function to call the graphql client
 */
export class AttachmentsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Attachments query and return a AttachmentConnection
   *
   * @param variables - variables to pass into the AttachmentsQuery
   * @returns parsed response from AttachmentsQuery
   */
  public async fetch(variables?: L.AttachmentsQueryVariables): LinearFetch<AttachmentConnection> {
    const response = await this._request<L.AttachmentsQuery, L.AttachmentsQueryVariables>(
      L.AttachmentsDocument,
      variables
    );
    const data = response.attachments;

    return new AttachmentConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable AttachmentsForUrl Query
 *
 * @param request - function to call the graphql client
 */
export class AttachmentsForUrlQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the AttachmentsForUrl query and return a AttachmentConnection
   *
   * @param url - required url to pass to attachmentsForURL
   * @param variables - variables without 'url' to pass into the AttachmentsForUrlQuery
   * @returns parsed response from AttachmentsForUrlQuery
   */
  public async fetch(
    url: string,
    variables?: Omit<L.AttachmentsForUrlQueryVariables, "url">
  ): LinearFetch<AttachmentConnection> {
    const response = await this._request<L.AttachmentsForUrlQuery, L.AttachmentsForUrlQueryVariables>(
      L.AttachmentsForUrlDocument,
      {
        url,
        ...variables,
      }
    );
    const data = response.attachmentsForURL;

    return new AttachmentConnection(
      this._request,
      connection =>
        this.fetch(
          url,
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable AuditEntries Query
 *
 * @param request - function to call the graphql client
 */
export class AuditEntriesQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the AuditEntries query and return a AuditEntryConnection
   *
   * @param variables - variables to pass into the AuditEntriesQuery
   * @returns parsed response from AuditEntriesQuery
   */
  public async fetch(variables?: L.AuditEntriesQueryVariables): LinearFetch<AuditEntryConnection> {
    const response = await this._request<L.AuditEntriesQuery, L.AuditEntriesQueryVariables>(
      L.AuditEntriesDocument,
      variables
    );
    const data = response.auditEntries;

    return new AuditEntryConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable AuditEntryTypes Query
 *
 * @param request - function to call the graphql client
 */
export class AuditEntryTypesQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the AuditEntryTypes query and return a AuditEntryType list
   *
   * @returns parsed response from AuditEntryTypesQuery
   */
  public async fetch(): LinearFetch<AuditEntryType[]> {
    const response = await this._request<L.AuditEntryTypesQuery, L.AuditEntryTypesQueryVariables>(
      L.AuditEntryTypesDocument,
      {}
    );
    const data = response.auditEntryTypes;

    return data.map(node => {
      return new AuditEntryType(this._request, node);
    });
  }
}

/**
 * A fetchable AvailableUsers Query
 *
 * @param request - function to call the graphql client
 */
export class AvailableUsersQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the AvailableUsers query and return a AuthResolverResponse
   *
   * @returns parsed response from AvailableUsersQuery
   */
  public async fetch(): LinearFetch<AuthResolverResponse> {
    const response = await this._request<L.AvailableUsersQuery, L.AvailableUsersQueryVariables>(
      L.AvailableUsersDocument,
      {}
    );
    const data = response.availableUsers;

    return new AuthResolverResponse(this._request, data);
  }
}

/**
 * A fetchable Comment Query
 *
 * @param request - function to call the graphql client
 */
export class CommentQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Comment query and return a Comment
   *
   * @param id - required id to pass to comment
   * @returns parsed response from CommentQuery
   */
  public async fetch(id: string): LinearFetch<Comment> {
    const response = await this._request<L.CommentQuery, L.CommentQueryVariables>(L.CommentDocument, {
      id,
    });
    const data = response.comment;

    return new Comment(this._request, data);
  }
}

/**
 * A fetchable Comments Query
 *
 * @param request - function to call the graphql client
 */
export class CommentsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Comments query and return a CommentConnection
   *
   * @param variables - variables to pass into the CommentsQuery
   * @returns parsed response from CommentsQuery
   */
  public async fetch(variables?: L.CommentsQueryVariables): LinearFetch<CommentConnection> {
    const response = await this._request<L.CommentsQuery, L.CommentsQueryVariables>(L.CommentsDocument, variables);
    const data = response.comments;

    return new CommentConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable CustomView Query
 *
 * @param request - function to call the graphql client
 */
export class CustomViewQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CustomView query and return a CustomView
   *
   * @param id - required id to pass to customView
   * @returns parsed response from CustomViewQuery
   */
  public async fetch(id: string): LinearFetch<CustomView> {
    const response = await this._request<L.CustomViewQuery, L.CustomViewQueryVariables>(L.CustomViewDocument, {
      id,
    });
    const data = response.customView;

    return new CustomView(this._request, data);
  }
}

/**
 * A fetchable CustomViews Query
 *
 * @param request - function to call the graphql client
 */
export class CustomViewsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the CustomViews query and return a CustomViewConnection
   *
   * @param variables - variables to pass into the CustomViewsQuery
   * @returns parsed response from CustomViewsQuery
   */
  public async fetch(variables?: L.CustomViewsQueryVariables): LinearFetch<CustomViewConnection> {
    const response = await this._request<L.CustomViewsQuery, L.CustomViewsQueryVariables>(
      L.CustomViewsDocument,
      variables
    );
    const data = response.customViews;

    return new CustomViewConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Cycle Query
 *
 * @param request - function to call the graphql client
 */
export class CycleQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Cycle query and return a Cycle
   *
   * @param id - required id to pass to cycle
   * @returns parsed response from CycleQuery
   */
  public async fetch(id: string): LinearFetch<Cycle> {
    const response = await this._request<L.CycleQuery, L.CycleQueryVariables>(L.CycleDocument, {
      id,
    });
    const data = response.cycle;

    return new Cycle(this._request, data);
  }
}

/**
 * A fetchable Cycles Query
 *
 * @param request - function to call the graphql client
 */
export class CyclesQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Cycles query and return a CycleConnection
   *
   * @param variables - variables to pass into the CyclesQuery
   * @returns parsed response from CyclesQuery
   */
  public async fetch(variables?: L.CyclesQueryVariables): LinearFetch<CycleConnection> {
    const response = await this._request<L.CyclesQuery, L.CyclesQueryVariables>(L.CyclesDocument, variables);
    const data = response.cycles;

    return new CycleConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Document Query
 *
 * @param request - function to call the graphql client
 */
export class DocumentQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Document query and return a Document
   *
   * @param id - required id to pass to document
   * @returns parsed response from DocumentQuery
   */
  public async fetch(id: string): LinearFetch<Document> {
    const response = await this._request<L.DocumentQuery, L.DocumentQueryVariables>(L.DocumentDocument, {
      id,
    });
    const data = response.document;

    return new Document(this._request, data);
  }
}

/**
 * A fetchable Documents Query
 *
 * @param request - function to call the graphql client
 */
export class DocumentsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Documents query and return a DocumentConnection
   *
   * @param variables - variables to pass into the DocumentsQuery
   * @returns parsed response from DocumentsQuery
   */
  public async fetch(variables?: L.DocumentsQueryVariables): LinearFetch<DocumentConnection> {
    const response = await this._request<L.DocumentsQuery, L.DocumentsQueryVariables>(L.DocumentsDocument, variables);
    const data = response.documents;

    return new DocumentConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Emoji Query
 *
 * @param request - function to call the graphql client
 */
export class EmojiQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Emoji query and return a Emoji
   *
   * @param id - required id to pass to emoji
   * @returns parsed response from EmojiQuery
   */
  public async fetch(id: string): LinearFetch<Emoji> {
    const response = await this._request<L.EmojiQuery, L.EmojiQueryVariables>(L.EmojiDocument, {
      id,
    });
    const data = response.emoji;

    return new Emoji(this._request, data);
  }
}

/**
 * A fetchable Emojis Query
 *
 * @param request - function to call the graphql client
 */
export class EmojisQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Emojis query and return a EmojiConnection
   *
   * @param variables - variables to pass into the EmojisQuery
   * @returns parsed response from EmojisQuery
   */
  public async fetch(variables?: L.EmojisQueryVariables): LinearFetch<EmojiConnection> {
    const response = await this._request<L.EmojisQuery, L.EmojisQueryVariables>(L.EmojisDocument, variables);
    const data = response.emojis;

    return new EmojiConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Favorite Query
 *
 * @param request - function to call the graphql client
 */
export class FavoriteQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Favorite query and return a Favorite
   *
   * @param id - required id to pass to favorite
   * @returns parsed response from FavoriteQuery
   */
  public async fetch(id: string): LinearFetch<Favorite> {
    const response = await this._request<L.FavoriteQuery, L.FavoriteQueryVariables>(L.FavoriteDocument, {
      id,
    });
    const data = response.favorite;

    return new Favorite(this._request, data);
  }
}

/**
 * A fetchable Favorites Query
 *
 * @param request - function to call the graphql client
 */
export class FavoritesQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Favorites query and return a FavoriteConnection
   *
   * @param variables - variables to pass into the FavoritesQuery
   * @returns parsed response from FavoritesQuery
   */
  public async fetch(variables?: L.FavoritesQueryVariables): LinearFetch<FavoriteConnection> {
    const response = await this._request<L.FavoritesQuery, L.FavoritesQueryVariables>(L.FavoritesDocument, variables);
    const data = response.favorites;

    return new FavoriteConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable FigmaEmbedInfo Query
 *
 * @param request - function to call the graphql client
 */
export class FigmaEmbedInfoQuery extends Request {
  public constructor(request: LinearRequest) {
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
    variables?: Omit<L.FigmaEmbedInfoQueryVariables, "fileId">
  ): LinearFetch<FigmaEmbedPayload> {
    const response = await this._request<L.FigmaEmbedInfoQuery, L.FigmaEmbedInfoQueryVariables>(
      L.FigmaEmbedInfoDocument,
      {
        fileId,
        ...variables,
      }
    );
    const data = response.figmaEmbedInfo;

    return new FigmaEmbedPayload(this._request, data);
  }
}

/**
 * A fetchable Integration Query
 *
 * @param request - function to call the graphql client
 */
export class IntegrationQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Integration query and return a Integration
   *
   * @param id - required id to pass to integration
   * @returns parsed response from IntegrationQuery
   */
  public async fetch(id: string): LinearFetch<Integration> {
    const response = await this._request<L.IntegrationQuery, L.IntegrationQueryVariables>(L.IntegrationDocument, {
      id,
    });
    const data = response.integration;

    return new Integration(this._request, data);
  }
}

/**
 * A fetchable IntegrationTemplate Query
 *
 * @param request - function to call the graphql client
 */
export class IntegrationTemplateQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationTemplate query and return a IntegrationTemplate
   *
   * @param id - required id to pass to integrationTemplate
   * @returns parsed response from IntegrationTemplateQuery
   */
  public async fetch(id: string): LinearFetch<IntegrationTemplate> {
    const response = await this._request<L.IntegrationTemplateQuery, L.IntegrationTemplateQueryVariables>(
      L.IntegrationTemplateDocument,
      {
        id,
      }
    );
    const data = response.integrationTemplate;

    return new IntegrationTemplate(this._request, data);
  }
}

/**
 * A fetchable IntegrationTemplates Query
 *
 * @param request - function to call the graphql client
 */
export class IntegrationTemplatesQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationTemplates query and return a IntegrationTemplateConnection
   *
   * @param variables - variables to pass into the IntegrationTemplatesQuery
   * @returns parsed response from IntegrationTemplatesQuery
   */
  public async fetch(variables?: L.IntegrationTemplatesQueryVariables): LinearFetch<IntegrationTemplateConnection> {
    const response = await this._request<L.IntegrationTemplatesQuery, L.IntegrationTemplatesQueryVariables>(
      L.IntegrationTemplatesDocument,
      variables
    );
    const data = response.integrationTemplates;

    return new IntegrationTemplateConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Integrations Query
 *
 * @param request - function to call the graphql client
 */
export class IntegrationsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Integrations query and return a IntegrationConnection
   *
   * @param variables - variables to pass into the IntegrationsQuery
   * @returns parsed response from IntegrationsQuery
   */
  public async fetch(variables?: L.IntegrationsQueryVariables): LinearFetch<IntegrationConnection> {
    const response = await this._request<L.IntegrationsQuery, L.IntegrationsQueryVariables>(
      L.IntegrationsDocument,
      variables
    );
    const data = response.integrations;

    return new IntegrationConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable IntegrationsSettings Query
 *
 * @param request - function to call the graphql client
 */
export class IntegrationsSettingsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IntegrationsSettings query and return a IntegrationsSettings
   *
   * @param id - required id to pass to integrationsSettings
   * @returns parsed response from IntegrationsSettingsQuery
   */
  public async fetch(id: string): LinearFetch<IntegrationsSettings> {
    const response = await this._request<L.IntegrationsSettingsQuery, L.IntegrationsSettingsQueryVariables>(
      L.IntegrationsSettingsDocument,
      {
        id,
      }
    );
    const data = response.integrationsSettings;

    return new IntegrationsSettings(this._request, data);
  }
}

/**
 * A fetchable Issue Query
 *
 * @param request - function to call the graphql client
 */
export class IssueQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Issue query and return a Issue
   *
   * @param id - required id to pass to issue
   * @returns parsed response from IssueQuery
   */
  public async fetch(id: string): LinearFetch<Issue> {
    const response = await this._request<L.IssueQuery, L.IssueQueryVariables>(L.IssueDocument, {
      id,
    });
    const data = response.issue;

    return new Issue(this._request, data);
  }
}

/**
 * A fetchable IssueImportFinishGithubOAuth Query
 *
 * @param request - function to call the graphql client
 */
export class IssueImportFinishGithubOAuthQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IssueImportFinishGithubOAuth query and return a GithubOAuthTokenPayload
   *
   * @param code - required code to pass to issueImportFinishGithubOAuth
   * @returns parsed response from IssueImportFinishGithubOAuthQuery
   */
  public async fetch(code: string): LinearFetch<GithubOAuthTokenPayload> {
    const response = await this._request<
      L.IssueImportFinishGithubOAuthQuery,
      L.IssueImportFinishGithubOAuthQueryVariables
    >(L.IssueImportFinishGithubOAuthDocument, {
      code,
    });
    const data = response.issueImportFinishGithubOAuth;

    return new GithubOAuthTokenPayload(this._request, data);
  }
}

/**
 * A fetchable IssueLabel Query
 *
 * @param request - function to call the graphql client
 */
export class IssueLabelQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IssueLabel query and return a IssueLabel
   *
   * @param id - required id to pass to issueLabel
   * @returns parsed response from IssueLabelQuery
   */
  public async fetch(id: string): LinearFetch<IssueLabel> {
    const response = await this._request<L.IssueLabelQuery, L.IssueLabelQueryVariables>(L.IssueLabelDocument, {
      id,
    });
    const data = response.issueLabel;

    return new IssueLabel(this._request, data);
  }
}

/**
 * A fetchable IssueLabels Query
 *
 * @param request - function to call the graphql client
 */
export class IssueLabelsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IssueLabels query and return a IssueLabelConnection
   *
   * @param variables - variables to pass into the IssueLabelsQuery
   * @returns parsed response from IssueLabelsQuery
   */
  public async fetch(variables?: L.IssueLabelsQueryVariables): LinearFetch<IssueLabelConnection> {
    const response = await this._request<L.IssueLabelsQuery, L.IssueLabelsQueryVariables>(
      L.IssueLabelsDocument,
      variables
    );
    const data = response.issueLabels;

    return new IssueLabelConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable IssuePriorityValues Query
 *
 * @param request - function to call the graphql client
 */
export class IssuePriorityValuesQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IssuePriorityValues query and return a IssuePriorityValue list
   *
   * @returns parsed response from IssuePriorityValuesQuery
   */
  public async fetch(): LinearFetch<IssuePriorityValue[]> {
    const response = await this._request<L.IssuePriorityValuesQuery, L.IssuePriorityValuesQueryVariables>(
      L.IssuePriorityValuesDocument,
      {}
    );
    const data = response.issuePriorityValues;

    return data.map(node => {
      return new IssuePriorityValue(this._request, node);
    });
  }
}

/**
 * A fetchable IssueRelation Query
 *
 * @param request - function to call the graphql client
 */
export class IssueRelationQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IssueRelation query and return a IssueRelation
   *
   * @param id - required id to pass to issueRelation
   * @returns parsed response from IssueRelationQuery
   */
  public async fetch(id: string): LinearFetch<IssueRelation> {
    const response = await this._request<L.IssueRelationQuery, L.IssueRelationQueryVariables>(L.IssueRelationDocument, {
      id,
    });
    const data = response.issueRelation;

    return new IssueRelation(this._request, data);
  }
}

/**
 * A fetchable IssueRelations Query
 *
 * @param request - function to call the graphql client
 */
export class IssueRelationsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IssueRelations query and return a IssueRelationConnection
   *
   * @param variables - variables to pass into the IssueRelationsQuery
   * @returns parsed response from IssueRelationsQuery
   */
  public async fetch(variables?: L.IssueRelationsQueryVariables): LinearFetch<IssueRelationConnection> {
    const response = await this._request<L.IssueRelationsQuery, L.IssueRelationsQueryVariables>(
      L.IssueRelationsDocument,
      variables
    );
    const data = response.issueRelations;

    return new IssueRelationConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable IssueVcsBranchSearch Query
 *
 * @param request - function to call the graphql client
 */
export class IssueVcsBranchSearchQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the IssueVcsBranchSearch query and return a Issue
   *
   * @param branchName - required branchName to pass to issueVcsBranchSearch
   * @returns parsed response from IssueVcsBranchSearchQuery
   */
  public async fetch(branchName: string): LinearFetch<Issue | undefined> {
    const response = await this._request<L.IssueVcsBranchSearchQuery, L.IssueVcsBranchSearchQueryVariables>(
      L.IssueVcsBranchSearchDocument,
      {
        branchName,
      }
    );
    const data = response.issueVcsBranchSearch;

    return data ? new Issue(this._request, data) : undefined;
  }
}

/**
 * A fetchable Issues Query
 *
 * @param request - function to call the graphql client
 */
export class IssuesQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Issues query and return a IssueConnection
   *
   * @param variables - variables to pass into the IssuesQuery
   * @returns parsed response from IssuesQuery
   */
  public async fetch(variables?: L.IssuesQueryVariables): LinearFetch<IssueConnection> {
    const response = await this._request<L.IssuesQuery, L.IssuesQueryVariables>(L.IssuesDocument, variables);
    const data = response.issues;

    return new IssueConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Notification Query
 *
 * @param request - function to call the graphql client
 */
export class NotificationQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Notification query and return a Notification
   *
   * @param id - required id to pass to notification
   * @returns parsed response from NotificationQuery
   */
  public async fetch(
    id: string
  ): LinearFetch<IssueNotification | OauthClientApprovalNotification | ProjectNotification | Notification> {
    const response = await this._request<L.NotificationQuery, L.NotificationQueryVariables>(L.NotificationDocument, {
      id,
    });
    const data = response.notification;

    switch (data.__typename) {
      case "IssueNotification":
        return new IssueNotification(this._request, data as L.IssueNotificationFragment);
      case "OauthClientApprovalNotification":
        return new OauthClientApprovalNotification(this._request, data as L.OauthClientApprovalNotificationFragment);
      case "ProjectNotification":
        return new ProjectNotification(this._request, data as L.ProjectNotificationFragment);

      default:
        return new Notification(this._request, data);
    }
  }
}

/**
 * A fetchable NotificationSubscription Query
 *
 * @param request - function to call the graphql client
 */
export class NotificationSubscriptionQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the NotificationSubscription query and return a NotificationSubscription
   *
   * @param id - required id to pass to notificationSubscription
   * @returns parsed response from NotificationSubscriptionQuery
   */
  public async fetch(
    id: string
  ): LinearFetch<ProjectNotificationSubscription | TeamNotificationSubscription | NotificationSubscription> {
    const response = await this._request<L.NotificationSubscriptionQuery, L.NotificationSubscriptionQueryVariables>(
      L.NotificationSubscriptionDocument,
      {
        id,
      }
    );
    const data = response.notificationSubscription;

    switch (data.__typename) {
      case "ProjectNotificationSubscription":
        return new ProjectNotificationSubscription(this._request, data as L.ProjectNotificationSubscriptionFragment);
      case "TeamNotificationSubscription":
        return new TeamNotificationSubscription(this._request, data as L.TeamNotificationSubscriptionFragment);

      default:
        return new NotificationSubscription(this._request, data);
    }
  }
}

/**
 * A fetchable NotificationSubscriptions Query
 *
 * @param request - function to call the graphql client
 */
export class NotificationSubscriptionsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the NotificationSubscriptions query and return a NotificationSubscriptionConnection
   *
   * @param variables - variables to pass into the NotificationSubscriptionsQuery
   * @returns parsed response from NotificationSubscriptionsQuery
   */
  public async fetch(
    variables?: L.NotificationSubscriptionsQueryVariables
  ): LinearFetch<NotificationSubscriptionConnection> {
    const response = await this._request<L.NotificationSubscriptionsQuery, L.NotificationSubscriptionsQueryVariables>(
      L.NotificationSubscriptionsDocument,
      variables
    );
    const data = response.notificationSubscriptions;

    return new NotificationSubscriptionConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Notifications Query
 *
 * @param request - function to call the graphql client
 */
export class NotificationsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Notifications query and return a NotificationConnection
   *
   * @param variables - variables to pass into the NotificationsQuery
   * @returns parsed response from NotificationsQuery
   */
  public async fetch(variables?: L.NotificationsQueryVariables): LinearFetch<NotificationConnection> {
    const response = await this._request<L.NotificationsQuery, L.NotificationsQueryVariables>(
      L.NotificationsDocument,
      variables
    );
    const data = response.notifications;

    return new NotificationConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Organization Query
 *
 * @param request - function to call the graphql client
 */
export class OrganizationQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Organization query and return a Organization
   *
   * @returns parsed response from OrganizationQuery
   */
  public async fetch(): LinearFetch<Organization> {
    const response = await this._request<L.OrganizationQuery, L.OrganizationQueryVariables>(L.OrganizationDocument, {});
    const data = response.organization;

    return new Organization(this._request, data);
  }
}

/**
 * A fetchable OrganizationExists Query
 *
 * @param request - function to call the graphql client
 */
export class OrganizationExistsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the OrganizationExists query and return a OrganizationExistsPayload
   *
   * @param urlKey - required urlKey to pass to organizationExists
   * @returns parsed response from OrganizationExistsQuery
   */
  public async fetch(urlKey: string): LinearFetch<OrganizationExistsPayload> {
    const response = await this._request<L.OrganizationExistsQuery, L.OrganizationExistsQueryVariables>(
      L.OrganizationExistsDocument,
      {
        urlKey,
      }
    );
    const data = response.organizationExists;

    return new OrganizationExistsPayload(this._request, data);
  }
}

/**
 * A fetchable OrganizationInvite Query
 *
 * @param request - function to call the graphql client
 */
export class OrganizationInviteQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the OrganizationInvite query and return a OrganizationInvite
   *
   * @param id - required id to pass to organizationInvite
   * @returns parsed response from OrganizationInviteQuery
   */
  public async fetch(id: string): LinearFetch<OrganizationInvite> {
    const response = await this._request<L.OrganizationInviteQuery, L.OrganizationInviteQueryVariables>(
      L.OrganizationInviteDocument,
      {
        id,
      }
    );
    const data = response.organizationInvite;

    return new OrganizationInvite(this._request, data);
  }
}

/**
 * A fetchable OrganizationInviteDetails Query
 *
 * @param request - function to call the graphql client
 */
export class OrganizationInviteDetailsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the OrganizationInviteDetails query and return a OrganizationInviteDetailsPayload
   *
   * @param id - required id to pass to organizationInviteDetails
   * @returns parsed response from OrganizationInviteDetailsQuery
   */
  public async fetch(id: string): LinearFetch<OrganizationInviteDetailsPayload> {
    const response = await this._request<L.OrganizationInviteDetailsQuery, L.OrganizationInviteDetailsQueryVariables>(
      L.OrganizationInviteDetailsDocument,
      {
        id,
      }
    );
    const data = response.organizationInviteDetails;

    return new OrganizationInviteDetailsPayload(this._request, data);
  }
}

/**
 * A fetchable OrganizationInvites Query
 *
 * @param request - function to call the graphql client
 */
export class OrganizationInvitesQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the OrganizationInvites query and return a OrganizationInviteConnection
   *
   * @param variables - variables to pass into the OrganizationInvitesQuery
   * @returns parsed response from OrganizationInvitesQuery
   */
  public async fetch(variables?: L.OrganizationInvitesQueryVariables): LinearFetch<OrganizationInviteConnection> {
    const response = await this._request<L.OrganizationInvitesQuery, L.OrganizationInvitesQueryVariables>(
      L.OrganizationInvitesDocument,
      variables
    );
    const data = response.organizationInvites;

    return new OrganizationInviteConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Project Query
 *
 * @param request - function to call the graphql client
 */
export class ProjectQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Project query and return a Project
   *
   * @param id - required id to pass to project
   * @returns parsed response from ProjectQuery
   */
  public async fetch(id: string): LinearFetch<Project> {
    const response = await this._request<L.ProjectQuery, L.ProjectQueryVariables>(L.ProjectDocument, {
      id,
    });
    const data = response.project;

    return new Project(this._request, data);
  }
}

/**
 * A fetchable ProjectLink Query
 *
 * @param request - function to call the graphql client
 */
export class ProjectLinkQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ProjectLink query and return a ProjectLink
   *
   * @param id - required id to pass to projectLink
   * @returns parsed response from ProjectLinkQuery
   */
  public async fetch(id: string): LinearFetch<ProjectLink> {
    const response = await this._request<L.ProjectLinkQuery, L.ProjectLinkQueryVariables>(L.ProjectLinkDocument, {
      id,
    });
    const data = response.projectLink;

    return new ProjectLink(this._request, data);
  }
}

/**
 * A fetchable ProjectLinks Query
 *
 * @param request - function to call the graphql client
 */
export class ProjectLinksQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ProjectLinks query and return a ProjectLinkConnection
   *
   * @param variables - variables to pass into the ProjectLinksQuery
   * @returns parsed response from ProjectLinksQuery
   */
  public async fetch(variables?: L.ProjectLinksQueryVariables): LinearFetch<ProjectLinkConnection> {
    const response = await this._request<L.ProjectLinksQuery, L.ProjectLinksQueryVariables>(
      L.ProjectLinksDocument,
      variables
    );
    const data = response.projectLinks;

    return new ProjectLinkConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable ProjectUpdate Query
 *
 * @param request - function to call the graphql client
 */
export class ProjectUpdateQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ProjectUpdate query and return a ProjectUpdate
   *
   * @param id - required id to pass to projectUpdate
   * @returns parsed response from ProjectUpdateQuery
   */
  public async fetch(id: string): LinearFetch<ProjectUpdate> {
    const response = await this._request<L.ProjectUpdateQuery, L.ProjectUpdateQueryVariables>(L.ProjectUpdateDocument, {
      id,
    });
    const data = response.projectUpdate;

    return new ProjectUpdate(this._request, data);
  }
}

/**
 * A fetchable ProjectUpdateInteraction Query
 *
 * @param request - function to call the graphql client
 */
export class ProjectUpdateInteractionQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ProjectUpdateInteraction query and return a ProjectUpdateInteraction
   *
   * @param id - required id to pass to projectUpdateInteraction
   * @returns parsed response from ProjectUpdateInteractionQuery
   */
  public async fetch(id: string): LinearFetch<ProjectUpdateInteraction> {
    const response = await this._request<L.ProjectUpdateInteractionQuery, L.ProjectUpdateInteractionQueryVariables>(
      L.ProjectUpdateInteractionDocument,
      {
        id,
      }
    );
    const data = response.projectUpdateInteraction;

    return new ProjectUpdateInteraction(this._request, data);
  }
}

/**
 * A fetchable ProjectUpdateInteractions Query
 *
 * @param request - function to call the graphql client
 */
export class ProjectUpdateInteractionsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ProjectUpdateInteractions query and return a ProjectUpdateInteractionConnection
   *
   * @param variables - variables to pass into the ProjectUpdateInteractionsQuery
   * @returns parsed response from ProjectUpdateInteractionsQuery
   */
  public async fetch(
    variables?: L.ProjectUpdateInteractionsQueryVariables
  ): LinearFetch<ProjectUpdateInteractionConnection> {
    const response = await this._request<L.ProjectUpdateInteractionsQuery, L.ProjectUpdateInteractionsQueryVariables>(
      L.ProjectUpdateInteractionsDocument,
      variables
    );
    const data = response.projectUpdateInteractions;

    return new ProjectUpdateInteractionConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable ProjectUpdates Query
 *
 * @param request - function to call the graphql client
 */
export class ProjectUpdatesQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the ProjectUpdates query and return a ProjectUpdateConnection
   *
   * @param variables - variables to pass into the ProjectUpdatesQuery
   * @returns parsed response from ProjectUpdatesQuery
   */
  public async fetch(variables?: L.ProjectUpdatesQueryVariables): LinearFetch<ProjectUpdateConnection> {
    const response = await this._request<L.ProjectUpdatesQuery, L.ProjectUpdatesQueryVariables>(
      L.ProjectUpdatesDocument,
      variables
    );
    const data = response.projectUpdates;

    return new ProjectUpdateConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Projects Query
 *
 * @param request - function to call the graphql client
 */
export class ProjectsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Projects query and return a ProjectConnection
   *
   * @param variables - variables to pass into the ProjectsQuery
   * @returns parsed response from ProjectsQuery
   */
  public async fetch(variables?: L.ProjectsQueryVariables): LinearFetch<ProjectConnection> {
    const response = await this._request<L.ProjectsQuery, L.ProjectsQueryVariables>(L.ProjectsDocument, variables);
    const data = response.projects;

    return new ProjectConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable PushSubscriptionTest Query
 *
 * @param request - function to call the graphql client
 */
export class PushSubscriptionTestQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the PushSubscriptionTest query and return a PushSubscriptionTestPayload
   *
   * @returns parsed response from PushSubscriptionTestQuery
   */
  public async fetch(): LinearFetch<PushSubscriptionTestPayload> {
    const response = await this._request<L.PushSubscriptionTestQuery, L.PushSubscriptionTestQueryVariables>(
      L.PushSubscriptionTestDocument,
      {}
    );
    const data = response.pushSubscriptionTest;

    return new PushSubscriptionTestPayload(this._request, data);
  }
}

/**
 * A fetchable RateLimitStatus Query
 *
 * @param request - function to call the graphql client
 */
export class RateLimitStatusQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the RateLimitStatus query and return a RateLimitPayload
   *
   * @returns parsed response from RateLimitStatusQuery
   */
  public async fetch(): LinearFetch<RateLimitPayload> {
    const response = await this._request<L.RateLimitStatusQuery, L.RateLimitStatusQueryVariables>(
      L.RateLimitStatusDocument,
      {}
    );
    const data = response.rateLimitStatus;

    return new RateLimitPayload(this._request, data);
  }
}

/**
 * A fetchable Roadmap Query
 *
 * @param request - function to call the graphql client
 */
export class RoadmapQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Roadmap query and return a Roadmap
   *
   * @param id - required id to pass to roadmap
   * @returns parsed response from RoadmapQuery
   */
  public async fetch(id: string): LinearFetch<Roadmap> {
    const response = await this._request<L.RoadmapQuery, L.RoadmapQueryVariables>(L.RoadmapDocument, {
      id,
    });
    const data = response.roadmap;

    return new Roadmap(this._request, data);
  }
}

/**
 * A fetchable RoadmapToProject Query
 *
 * @param request - function to call the graphql client
 */
export class RoadmapToProjectQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the RoadmapToProject query and return a RoadmapToProject
   *
   * @param id - required id to pass to roadmapToProject
   * @returns parsed response from RoadmapToProjectQuery
   */
  public async fetch(id: string): LinearFetch<RoadmapToProject> {
    const response = await this._request<L.RoadmapToProjectQuery, L.RoadmapToProjectQueryVariables>(
      L.RoadmapToProjectDocument,
      {
        id,
      }
    );
    const data = response.roadmapToProject;

    return new RoadmapToProject(this._request, data);
  }
}

/**
 * A fetchable RoadmapToProjects Query
 *
 * @param request - function to call the graphql client
 */
export class RoadmapToProjectsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the RoadmapToProjects query and return a RoadmapToProjectConnection
   *
   * @param variables - variables to pass into the RoadmapToProjectsQuery
   * @returns parsed response from RoadmapToProjectsQuery
   */
  public async fetch(variables?: L.RoadmapToProjectsQueryVariables): LinearFetch<RoadmapToProjectConnection> {
    const response = await this._request<L.RoadmapToProjectsQuery, L.RoadmapToProjectsQueryVariables>(
      L.RoadmapToProjectsDocument,
      variables
    );
    const data = response.roadmapToProjects;

    return new RoadmapToProjectConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Roadmaps Query
 *
 * @param request - function to call the graphql client
 */
export class RoadmapsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Roadmaps query and return a RoadmapConnection
   *
   * @param variables - variables to pass into the RoadmapsQuery
   * @returns parsed response from RoadmapsQuery
   */
  public async fetch(variables?: L.RoadmapsQueryVariables): LinearFetch<RoadmapConnection> {
    const response = await this._request<L.RoadmapsQuery, L.RoadmapsQueryVariables>(L.RoadmapsDocument, variables);
    const data = response.roadmaps;

    return new RoadmapConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable SsoUrlFromEmail Query
 *
 * @param request - function to call the graphql client
 */
export class SsoUrlFromEmailQuery extends Request {
  public constructor(request: LinearRequest) {
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
    variables?: Omit<L.SsoUrlFromEmailQueryVariables, "email">
  ): LinearFetch<SsoUrlFromEmailResponse> {
    const response = await this._request<L.SsoUrlFromEmailQuery, L.SsoUrlFromEmailQueryVariables>(
      L.SsoUrlFromEmailDocument,
      {
        email,
        ...variables,
      }
    );
    const data = response.ssoUrlFromEmail;

    return new SsoUrlFromEmailResponse(this._request, data);
  }
}

/**
 * A fetchable Team Query
 *
 * @param request - function to call the graphql client
 */
export class TeamQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Team query and return a Team
   *
   * @param id - required id to pass to team
   * @returns parsed response from TeamQuery
   */
  public async fetch(id: string): LinearFetch<Team> {
    const response = await this._request<L.TeamQuery, L.TeamQueryVariables>(L.TeamDocument, {
      id,
    });
    const data = response.team;

    return new Team(this._request, data);
  }
}

/**
 * A fetchable TeamMembership Query
 *
 * @param request - function to call the graphql client
 */
export class TeamMembershipQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the TeamMembership query and return a TeamMembership
   *
   * @param id - required id to pass to teamMembership
   * @returns parsed response from TeamMembershipQuery
   */
  public async fetch(id: string): LinearFetch<TeamMembership> {
    const response = await this._request<L.TeamMembershipQuery, L.TeamMembershipQueryVariables>(
      L.TeamMembershipDocument,
      {
        id,
      }
    );
    const data = response.teamMembership;

    return new TeamMembership(this._request, data);
  }
}

/**
 * A fetchable TeamMemberships Query
 *
 * @param request - function to call the graphql client
 */
export class TeamMembershipsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the TeamMemberships query and return a TeamMembershipConnection
   *
   * @param variables - variables to pass into the TeamMembershipsQuery
   * @returns parsed response from TeamMembershipsQuery
   */
  public async fetch(variables?: L.TeamMembershipsQueryVariables): LinearFetch<TeamMembershipConnection> {
    const response = await this._request<L.TeamMembershipsQuery, L.TeamMembershipsQueryVariables>(
      L.TeamMembershipsDocument,
      variables
    );
    const data = response.teamMemberships;

    return new TeamMembershipConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Teams Query
 *
 * @param request - function to call the graphql client
 */
export class TeamsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Teams query and return a TeamConnection
   *
   * @param variables - variables to pass into the TeamsQuery
   * @returns parsed response from TeamsQuery
   */
  public async fetch(variables?: L.TeamsQueryVariables): LinearFetch<TeamConnection> {
    const response = await this._request<L.TeamsQuery, L.TeamsQueryVariables>(L.TeamsDocument, variables);
    const data = response.teams;

    return new TeamConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Template Query
 *
 * @param request - function to call the graphql client
 */
export class TemplateQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Template query and return a Template
   *
   * @param id - required id to pass to template
   * @returns parsed response from TemplateQuery
   */
  public async fetch(id: string): LinearFetch<Template> {
    const response = await this._request<L.TemplateQuery, L.TemplateQueryVariables>(L.TemplateDocument, {
      id,
    });
    const data = response.template;

    return new Template(this._request, data);
  }
}

/**
 * A fetchable Templates Query
 *
 * @param request - function to call the graphql client
 */
export class TemplatesQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Templates query and return a Template list
   *
   * @returns parsed response from TemplatesQuery
   */
  public async fetch(): LinearFetch<Template[]> {
    const response = await this._request<L.TemplatesQuery, L.TemplatesQueryVariables>(L.TemplatesDocument, {});
    const data = response.templates;

    return data.map(node => {
      return new Template(this._request, node);
    });
  }
}

/**
 * A fetchable User Query
 *
 * @param request - function to call the graphql client
 */
export class UserQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the User query and return a User
   *
   * @param id - required id to pass to user
   * @returns parsed response from UserQuery
   */
  public async fetch(id: string): LinearFetch<User> {
    const response = await this._request<L.UserQuery, L.UserQueryVariables>(L.UserDocument, {
      id,
    });
    const data = response.user;

    return new User(this._request, data);
  }
}

/**
 * A fetchable UserSettings Query
 *
 * @param request - function to call the graphql client
 */
export class UserSettingsQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the UserSettings query and return a UserSettings
   *
   * @returns parsed response from UserSettingsQuery
   */
  public async fetch(): LinearFetch<UserSettings> {
    const response = await this._request<L.UserSettingsQuery, L.UserSettingsQueryVariables>(L.UserSettingsDocument, {});
    const data = response.userSettings;

    return new UserSettings(this._request, data);
  }
}

/**
 * A fetchable Users Query
 *
 * @param request - function to call the graphql client
 */
export class UsersQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Users query and return a UserConnection
   *
   * @param variables - variables to pass into the UsersQuery
   * @returns parsed response from UsersQuery
   */
  public async fetch(variables?: L.UsersQueryVariables): LinearFetch<UserConnection> {
    const response = await this._request<L.UsersQuery, L.UsersQueryVariables>(L.UsersDocument, variables);
    const data = response.users;

    return new UserConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Viewer Query
 *
 * @param request - function to call the graphql client
 */
export class ViewerQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Viewer query and return a User
   *
   * @returns parsed response from ViewerQuery
   */
  public async fetch(): LinearFetch<User> {
    const response = await this._request<L.ViewerQuery, L.ViewerQueryVariables>(L.ViewerDocument, {});
    const data = response.viewer;

    return new User(this._request, data);
  }
}

/**
 * A fetchable Webhook Query
 *
 * @param request - function to call the graphql client
 */
export class WebhookQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Webhook query and return a Webhook
   *
   * @param id - required id to pass to webhook
   * @returns parsed response from WebhookQuery
   */
  public async fetch(id: string): LinearFetch<Webhook> {
    const response = await this._request<L.WebhookQuery, L.WebhookQueryVariables>(L.WebhookDocument, {
      id,
    });
    const data = response.webhook;

    return new Webhook(this._request, data);
  }
}

/**
 * A fetchable Webhooks Query
 *
 * @param request - function to call the graphql client
 */
export class WebhooksQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Webhooks query and return a WebhookConnection
   *
   * @param variables - variables to pass into the WebhooksQuery
   * @returns parsed response from WebhooksQuery
   */
  public async fetch(variables?: L.WebhooksQueryVariables): LinearFetch<WebhookConnection> {
    const response = await this._request<L.WebhooksQuery, L.WebhooksQueryVariables>(L.WebhooksDocument, variables);
    const data = response.webhooks;

    return new WebhookConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable WorkflowState Query
 *
 * @param request - function to call the graphql client
 */
export class WorkflowStateQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the WorkflowState query and return a WorkflowState
   *
   * @param id - required id to pass to workflowState
   * @returns parsed response from WorkflowStateQuery
   */
  public async fetch(id: string): LinearFetch<WorkflowState> {
    const response = await this._request<L.WorkflowStateQuery, L.WorkflowStateQueryVariables>(L.WorkflowStateDocument, {
      id,
    });
    const data = response.workflowState;

    return new WorkflowState(this._request, data);
  }
}

/**
 * A fetchable WorkflowStates Query
 *
 * @param request - function to call the graphql client
 */
export class WorkflowStatesQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the WorkflowStates query and return a WorkflowStateConnection
   *
   * @param variables - variables to pass into the WorkflowStatesQuery
   * @returns parsed response from WorkflowStatesQuery
   */
  public async fetch(variables?: L.WorkflowStatesQueryVariables): LinearFetch<WorkflowStateConnection> {
    const response = await this._request<L.WorkflowStatesQuery, L.WorkflowStatesQueryVariables>(
      L.WorkflowStatesDocument,
      variables
    );
    const data = response.workflowStates;

    return new WorkflowStateConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable AttachmentIssue_Attachments Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to attachmentIssue
 * @param variables - variables without 'id' to pass into the AttachmentIssue_AttachmentsQuery
 */
export class AttachmentIssue_AttachmentsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.AttachmentIssue_AttachmentsQueryVariables, "id">;

  public constructor(
    request: LinearRequest,
    id: string,
    variables?: Omit<L.AttachmentIssue_AttachmentsQueryVariables, "id">
  ) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the AttachmentIssue_Attachments query and return a AttachmentConnection
   *
   * @param variables - variables without 'id' to pass into the AttachmentIssue_AttachmentsQuery
   * @returns parsed response from AttachmentIssue_AttachmentsQuery
   */
  public async fetch(
    variables?: Omit<L.AttachmentIssue_AttachmentsQueryVariables, "id">
  ): LinearFetch<AttachmentConnection> {
    const response = await this._request<
      L.AttachmentIssue_AttachmentsQuery,
      L.AttachmentIssue_AttachmentsQueryVariables
    >(L.AttachmentIssue_AttachmentsDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.attachmentIssue.attachments;

    return new AttachmentConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable AttachmentIssue_Children Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to attachmentIssue
 * @param variables - variables without 'id' to pass into the AttachmentIssue_ChildrenQuery
 */
export class AttachmentIssue_ChildrenQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.AttachmentIssue_ChildrenQueryVariables, "id">;

  public constructor(
    request: LinearRequest,
    id: string,
    variables?: Omit<L.AttachmentIssue_ChildrenQueryVariables, "id">
  ) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the AttachmentIssue_Children query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the AttachmentIssue_ChildrenQuery
   * @returns parsed response from AttachmentIssue_ChildrenQuery
   */
  public async fetch(variables?: Omit<L.AttachmentIssue_ChildrenQueryVariables, "id">): LinearFetch<IssueConnection> {
    const response = await this._request<L.AttachmentIssue_ChildrenQuery, L.AttachmentIssue_ChildrenQueryVariables>(
      L.AttachmentIssue_ChildrenDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.attachmentIssue.children;

    return new IssueConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable AttachmentIssue_Comments Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to attachmentIssue
 * @param variables - variables without 'id' to pass into the AttachmentIssue_CommentsQuery
 */
export class AttachmentIssue_CommentsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.AttachmentIssue_CommentsQueryVariables, "id">;

  public constructor(
    request: LinearRequest,
    id: string,
    variables?: Omit<L.AttachmentIssue_CommentsQueryVariables, "id">
  ) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the AttachmentIssue_Comments query and return a CommentConnection
   *
   * @param variables - variables without 'id' to pass into the AttachmentIssue_CommentsQuery
   * @returns parsed response from AttachmentIssue_CommentsQuery
   */
  public async fetch(variables?: Omit<L.AttachmentIssue_CommentsQueryVariables, "id">): LinearFetch<CommentConnection> {
    const response = await this._request<L.AttachmentIssue_CommentsQuery, L.AttachmentIssue_CommentsQueryVariables>(
      L.AttachmentIssue_CommentsDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.attachmentIssue.comments;

    return new CommentConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable AttachmentIssue_History Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to attachmentIssue
 * @param variables - variables without 'id' to pass into the AttachmentIssue_HistoryQuery
 */
export class AttachmentIssue_HistoryQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.AttachmentIssue_HistoryQueryVariables, "id">;

  public constructor(
    request: LinearRequest,
    id: string,
    variables?: Omit<L.AttachmentIssue_HistoryQueryVariables, "id">
  ) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the AttachmentIssue_History query and return a IssueHistoryConnection
   *
   * @param variables - variables without 'id' to pass into the AttachmentIssue_HistoryQuery
   * @returns parsed response from AttachmentIssue_HistoryQuery
   */
  public async fetch(
    variables?: Omit<L.AttachmentIssue_HistoryQueryVariables, "id">
  ): LinearFetch<IssueHistoryConnection> {
    const response = await this._request<L.AttachmentIssue_HistoryQuery, L.AttachmentIssue_HistoryQueryVariables>(
      L.AttachmentIssue_HistoryDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.attachmentIssue.history;

    return new IssueHistoryConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable AttachmentIssue_InverseRelations Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to attachmentIssue
 * @param variables - variables without 'id' to pass into the AttachmentIssue_InverseRelationsQuery
 */
export class AttachmentIssue_InverseRelationsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.AttachmentIssue_InverseRelationsQueryVariables, "id">;

  public constructor(
    request: LinearRequest,
    id: string,
    variables?: Omit<L.AttachmentIssue_InverseRelationsQueryVariables, "id">
  ) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the AttachmentIssue_InverseRelations query and return a IssueRelationConnection
   *
   * @param variables - variables without 'id' to pass into the AttachmentIssue_InverseRelationsQuery
   * @returns parsed response from AttachmentIssue_InverseRelationsQuery
   */
  public async fetch(
    variables?: Omit<L.AttachmentIssue_InverseRelationsQueryVariables, "id">
  ): LinearFetch<IssueRelationConnection> {
    const response = await this._request<
      L.AttachmentIssue_InverseRelationsQuery,
      L.AttachmentIssue_InverseRelationsQueryVariables
    >(L.AttachmentIssue_InverseRelationsDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.attachmentIssue.inverseRelations;

    return new IssueRelationConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable AttachmentIssue_Labels Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to attachmentIssue
 * @param variables - variables without 'id' to pass into the AttachmentIssue_LabelsQuery
 */
export class AttachmentIssue_LabelsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.AttachmentIssue_LabelsQueryVariables, "id">;

  public constructor(
    request: LinearRequest,
    id: string,
    variables?: Omit<L.AttachmentIssue_LabelsQueryVariables, "id">
  ) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the AttachmentIssue_Labels query and return a IssueLabelConnection
   *
   * @param variables - variables without 'id' to pass into the AttachmentIssue_LabelsQuery
   * @returns parsed response from AttachmentIssue_LabelsQuery
   */
  public async fetch(
    variables?: Omit<L.AttachmentIssue_LabelsQueryVariables, "id">
  ): LinearFetch<IssueLabelConnection> {
    const response = await this._request<L.AttachmentIssue_LabelsQuery, L.AttachmentIssue_LabelsQueryVariables>(
      L.AttachmentIssue_LabelsDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.attachmentIssue.labels;

    return new IssueLabelConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable AttachmentIssue_Relations Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to attachmentIssue
 * @param variables - variables without 'id' to pass into the AttachmentIssue_RelationsQuery
 */
export class AttachmentIssue_RelationsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.AttachmentIssue_RelationsQueryVariables, "id">;

  public constructor(
    request: LinearRequest,
    id: string,
    variables?: Omit<L.AttachmentIssue_RelationsQueryVariables, "id">
  ) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the AttachmentIssue_Relations query and return a IssueRelationConnection
   *
   * @param variables - variables without 'id' to pass into the AttachmentIssue_RelationsQuery
   * @returns parsed response from AttachmentIssue_RelationsQuery
   */
  public async fetch(
    variables?: Omit<L.AttachmentIssue_RelationsQueryVariables, "id">
  ): LinearFetch<IssueRelationConnection> {
    const response = await this._request<L.AttachmentIssue_RelationsQuery, L.AttachmentIssue_RelationsQueryVariables>(
      L.AttachmentIssue_RelationsDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.attachmentIssue.relations;

    return new IssueRelationConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable AttachmentIssue_Subscribers Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to attachmentIssue
 * @param variables - variables without 'id' to pass into the AttachmentIssue_SubscribersQuery
 */
export class AttachmentIssue_SubscribersQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.AttachmentIssue_SubscribersQueryVariables, "id">;

  public constructor(
    request: LinearRequest,
    id: string,
    variables?: Omit<L.AttachmentIssue_SubscribersQueryVariables, "id">
  ) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the AttachmentIssue_Subscribers query and return a UserConnection
   *
   * @param variables - variables without 'id' to pass into the AttachmentIssue_SubscribersQuery
   * @returns parsed response from AttachmentIssue_SubscribersQuery
   */
  public async fetch(variables?: Omit<L.AttachmentIssue_SubscribersQueryVariables, "id">): LinearFetch<UserConnection> {
    const response = await this._request<
      L.AttachmentIssue_SubscribersQuery,
      L.AttachmentIssue_SubscribersQueryVariables
    >(L.AttachmentIssue_SubscribersDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.attachmentIssue.subscribers;

    return new UserConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Comment_Children Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to comment
 * @param variables - variables without 'id' to pass into the Comment_ChildrenQuery
 */
export class Comment_ChildrenQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Comment_ChildrenQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Comment_ChildrenQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Comment_Children query and return a CommentConnection
   *
   * @param variables - variables without 'id' to pass into the Comment_ChildrenQuery
   * @returns parsed response from Comment_ChildrenQuery
   */
  public async fetch(variables?: Omit<L.Comment_ChildrenQueryVariables, "id">): LinearFetch<CommentConnection> {
    const response = await this._request<L.Comment_ChildrenQuery, L.Comment_ChildrenQueryVariables>(
      L.Comment_ChildrenDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.comment.children;

    return new CommentConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Cycle_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to cycle
 * @param variables - variables without 'id' to pass into the Cycle_IssuesQuery
 */
export class Cycle_IssuesQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Cycle_IssuesQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Cycle_IssuesQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Cycle_Issues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the Cycle_IssuesQuery
   * @returns parsed response from Cycle_IssuesQuery
   */
  public async fetch(variables?: Omit<L.Cycle_IssuesQueryVariables, "id">): LinearFetch<IssueConnection> {
    const response = await this._request<L.Cycle_IssuesQuery, L.Cycle_IssuesQueryVariables>(L.Cycle_IssuesDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.cycle.issues;

    return new IssueConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Cycle_UncompletedIssuesUponClose Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to cycle
 * @param variables - variables without 'id' to pass into the Cycle_UncompletedIssuesUponCloseQuery
 */
export class Cycle_UncompletedIssuesUponCloseQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Cycle_UncompletedIssuesUponCloseQueryVariables, "id">;

  public constructor(
    request: LinearRequest,
    id: string,
    variables?: Omit<L.Cycle_UncompletedIssuesUponCloseQueryVariables, "id">
  ) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Cycle_UncompletedIssuesUponClose query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the Cycle_UncompletedIssuesUponCloseQuery
   * @returns parsed response from Cycle_UncompletedIssuesUponCloseQuery
   */
  public async fetch(
    variables?: Omit<L.Cycle_UncompletedIssuesUponCloseQueryVariables, "id">
  ): LinearFetch<IssueConnection> {
    const response = await this._request<
      L.Cycle_UncompletedIssuesUponCloseQuery,
      L.Cycle_UncompletedIssuesUponCloseQueryVariables
    >(L.Cycle_UncompletedIssuesUponCloseDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.cycle.uncompletedIssuesUponClose;

    return new IssueConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Favorite_Children Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to favorite
 * @param variables - variables without 'id' to pass into the Favorite_ChildrenQuery
 */
export class Favorite_ChildrenQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Favorite_ChildrenQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Favorite_ChildrenQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Favorite_Children query and return a FavoriteConnection
   *
   * @param variables - variables without 'id' to pass into the Favorite_ChildrenQuery
   * @returns parsed response from Favorite_ChildrenQuery
   */
  public async fetch(variables?: Omit<L.Favorite_ChildrenQueryVariables, "id">): LinearFetch<FavoriteConnection> {
    const response = await this._request<L.Favorite_ChildrenQuery, L.Favorite_ChildrenQueryVariables>(
      L.Favorite_ChildrenDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.favorite.children;

    return new FavoriteConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable FigmaEmbedInfo_FigmaEmbed Query
 *
 * @param request - function to call the graphql client
 * @param fileId - required fileId to pass to figmaEmbedInfo
 * @param variables - variables without 'fileId' to pass into the FigmaEmbedInfo_FigmaEmbedQuery
 */
export class FigmaEmbedInfo_FigmaEmbedQuery extends Request {
  private _fileId: string;
  private _variables?: Omit<L.FigmaEmbedInfo_FigmaEmbedQueryVariables, "fileId">;

  public constructor(
    request: LinearRequest,
    fileId: string,
    variables?: Omit<L.FigmaEmbedInfo_FigmaEmbedQueryVariables, "fileId">
  ) {
    super(request);
    this._fileId = fileId;
    this._variables = variables;
  }

  /**
   * Call the FigmaEmbedInfo_FigmaEmbed query and return a FigmaEmbed
   *
   * @param variables - variables without 'fileId' to pass into the FigmaEmbedInfo_FigmaEmbedQuery
   * @returns parsed response from FigmaEmbedInfo_FigmaEmbedQuery
   */
  public async fetch(
    variables?: Omit<L.FigmaEmbedInfo_FigmaEmbedQueryVariables, "fileId">
  ): LinearFetch<FigmaEmbed | undefined> {
    const response = await this._request<L.FigmaEmbedInfo_FigmaEmbedQuery, L.FigmaEmbedInfo_FigmaEmbedQueryVariables>(
      L.FigmaEmbedInfo_FigmaEmbedDocument,
      {
        fileId: this._fileId,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.figmaEmbedInfo.figmaEmbed;

    return data ? new FigmaEmbed(this._request, data) : undefined;
  }
}

/**
 * A fetchable Issue_Attachments Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 * @param variables - variables without 'id' to pass into the Issue_AttachmentsQuery
 */
export class Issue_AttachmentsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Issue_AttachmentsQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Issue_AttachmentsQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Issue_Attachments query and return a AttachmentConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_AttachmentsQuery
   * @returns parsed response from Issue_AttachmentsQuery
   */
  public async fetch(variables?: Omit<L.Issue_AttachmentsQueryVariables, "id">): LinearFetch<AttachmentConnection> {
    const response = await this._request<L.Issue_AttachmentsQuery, L.Issue_AttachmentsQueryVariables>(
      L.Issue_AttachmentsDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.issue.attachments;

    return new AttachmentConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Issue_Children Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 * @param variables - variables without 'id' to pass into the Issue_ChildrenQuery
 */
export class Issue_ChildrenQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Issue_ChildrenQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Issue_ChildrenQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Issue_Children query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_ChildrenQuery
   * @returns parsed response from Issue_ChildrenQuery
   */
  public async fetch(variables?: Omit<L.Issue_ChildrenQueryVariables, "id">): LinearFetch<IssueConnection> {
    const response = await this._request<L.Issue_ChildrenQuery, L.Issue_ChildrenQueryVariables>(
      L.Issue_ChildrenDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.issue.children;

    return new IssueConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Issue_Comments Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 * @param variables - variables without 'id' to pass into the Issue_CommentsQuery
 */
export class Issue_CommentsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Issue_CommentsQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Issue_CommentsQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Issue_Comments query and return a CommentConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_CommentsQuery
   * @returns parsed response from Issue_CommentsQuery
   */
  public async fetch(variables?: Omit<L.Issue_CommentsQueryVariables, "id">): LinearFetch<CommentConnection> {
    const response = await this._request<L.Issue_CommentsQuery, L.Issue_CommentsQueryVariables>(
      L.Issue_CommentsDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.issue.comments;

    return new CommentConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Issue_History Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 * @param variables - variables without 'id' to pass into the Issue_HistoryQuery
 */
export class Issue_HistoryQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Issue_HistoryQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Issue_HistoryQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Issue_History query and return a IssueHistoryConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_HistoryQuery
   * @returns parsed response from Issue_HistoryQuery
   */
  public async fetch(variables?: Omit<L.Issue_HistoryQueryVariables, "id">): LinearFetch<IssueHistoryConnection> {
    const response = await this._request<L.Issue_HistoryQuery, L.Issue_HistoryQueryVariables>(L.Issue_HistoryDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.issue.history;

    return new IssueHistoryConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Issue_InverseRelations Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 * @param variables - variables without 'id' to pass into the Issue_InverseRelationsQuery
 */
export class Issue_InverseRelationsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Issue_InverseRelationsQueryVariables, "id">;

  public constructor(
    request: LinearRequest,
    id: string,
    variables?: Omit<L.Issue_InverseRelationsQueryVariables, "id">
  ) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Issue_InverseRelations query and return a IssueRelationConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_InverseRelationsQuery
   * @returns parsed response from Issue_InverseRelationsQuery
   */
  public async fetch(
    variables?: Omit<L.Issue_InverseRelationsQueryVariables, "id">
  ): LinearFetch<IssueRelationConnection> {
    const response = await this._request<L.Issue_InverseRelationsQuery, L.Issue_InverseRelationsQueryVariables>(
      L.Issue_InverseRelationsDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.issue.inverseRelations;

    return new IssueRelationConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Issue_Labels Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 * @param variables - variables without 'id' to pass into the Issue_LabelsQuery
 */
export class Issue_LabelsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Issue_LabelsQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Issue_LabelsQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Issue_Labels query and return a IssueLabelConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_LabelsQuery
   * @returns parsed response from Issue_LabelsQuery
   */
  public async fetch(variables?: Omit<L.Issue_LabelsQueryVariables, "id">): LinearFetch<IssueLabelConnection> {
    const response = await this._request<L.Issue_LabelsQuery, L.Issue_LabelsQueryVariables>(L.Issue_LabelsDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.issue.labels;

    return new IssueLabelConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Issue_Relations Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 * @param variables - variables without 'id' to pass into the Issue_RelationsQuery
 */
export class Issue_RelationsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Issue_RelationsQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Issue_RelationsQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Issue_Relations query and return a IssueRelationConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_RelationsQuery
   * @returns parsed response from Issue_RelationsQuery
   */
  public async fetch(variables?: Omit<L.Issue_RelationsQueryVariables, "id">): LinearFetch<IssueRelationConnection> {
    const response = await this._request<L.Issue_RelationsQuery, L.Issue_RelationsQueryVariables>(
      L.Issue_RelationsDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.issue.relations;

    return new IssueRelationConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Issue_Subscribers Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issue
 * @param variables - variables without 'id' to pass into the Issue_SubscribersQuery
 */
export class Issue_SubscribersQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Issue_SubscribersQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Issue_SubscribersQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Issue_Subscribers query and return a UserConnection
   *
   * @param variables - variables without 'id' to pass into the Issue_SubscribersQuery
   * @returns parsed response from Issue_SubscribersQuery
   */
  public async fetch(variables?: Omit<L.Issue_SubscribersQueryVariables, "id">): LinearFetch<UserConnection> {
    const response = await this._request<L.Issue_SubscribersQuery, L.Issue_SubscribersQueryVariables>(
      L.Issue_SubscribersDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.issue.subscribers;

    return new UserConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable IssueLabel_Children Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issueLabel
 * @param variables - variables without 'id' to pass into the IssueLabel_ChildrenQuery
 */
export class IssueLabel_ChildrenQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.IssueLabel_ChildrenQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.IssueLabel_ChildrenQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the IssueLabel_Children query and return a IssueLabelConnection
   *
   * @param variables - variables without 'id' to pass into the IssueLabel_ChildrenQuery
   * @returns parsed response from IssueLabel_ChildrenQuery
   */
  public async fetch(variables?: Omit<L.IssueLabel_ChildrenQueryVariables, "id">): LinearFetch<IssueLabelConnection> {
    const response = await this._request<L.IssueLabel_ChildrenQuery, L.IssueLabel_ChildrenQueryVariables>(
      L.IssueLabel_ChildrenDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.issueLabel.children;

    return new IssueLabelConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable IssueLabel_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to issueLabel
 * @param variables - variables without 'id' to pass into the IssueLabel_IssuesQuery
 */
export class IssueLabel_IssuesQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.IssueLabel_IssuesQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.IssueLabel_IssuesQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the IssueLabel_Issues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the IssueLabel_IssuesQuery
   * @returns parsed response from IssueLabel_IssuesQuery
   */
  public async fetch(variables?: Omit<L.IssueLabel_IssuesQueryVariables, "id">): LinearFetch<IssueConnection> {
    const response = await this._request<L.IssueLabel_IssuesQuery, L.IssueLabel_IssuesQueryVariables>(
      L.IssueLabel_IssuesDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.issueLabel.issues;

    return new IssueConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable IssueVcsBranchSearch_Attachments Query
 *
 * @param request - function to call the graphql client
 * @param branchName - required branchName to pass to issueVcsBranchSearch
 * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_AttachmentsQuery
 */
export class IssueVcsBranchSearch_AttachmentsQuery extends Request {
  private _branchName: string;
  private _variables?: Omit<L.IssueVcsBranchSearch_AttachmentsQueryVariables, "branchName">;

  public constructor(
    request: LinearRequest,
    branchName: string,
    variables?: Omit<L.IssueVcsBranchSearch_AttachmentsQueryVariables, "branchName">
  ) {
    super(request);
    this._branchName = branchName;
    this._variables = variables;
  }

  /**
   * Call the IssueVcsBranchSearch_Attachments query and return a AttachmentConnection
   *
   * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_AttachmentsQuery
   * @returns parsed response from IssueVcsBranchSearch_AttachmentsQuery
   */
  public async fetch(
    variables?: Omit<L.IssueVcsBranchSearch_AttachmentsQueryVariables, "branchName">
  ): LinearFetch<AttachmentConnection | undefined> {
    const response = await this._request<
      L.IssueVcsBranchSearch_AttachmentsQuery,
      L.IssueVcsBranchSearch_AttachmentsQueryVariables
    >(L.IssueVcsBranchSearch_AttachmentsDocument, {
      branchName: this._branchName,
      ...this._variables,
      ...variables,
    });
    const data = response.issueVcsBranchSearch?.attachments;
    if (data) {
      return new AttachmentConnection(
        this._request,
        connection =>
          this.fetch(
            defaultConnection({
              ...this._variables,
              ...variables,
              ...connection,
            })
          ),
        data
      );
    } else {
      return undefined;
    }
  }
}

/**
 * A fetchable IssueVcsBranchSearch_Children Query
 *
 * @param request - function to call the graphql client
 * @param branchName - required branchName to pass to issueVcsBranchSearch
 * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_ChildrenQuery
 */
export class IssueVcsBranchSearch_ChildrenQuery extends Request {
  private _branchName: string;
  private _variables?: Omit<L.IssueVcsBranchSearch_ChildrenQueryVariables, "branchName">;

  public constructor(
    request: LinearRequest,
    branchName: string,
    variables?: Omit<L.IssueVcsBranchSearch_ChildrenQueryVariables, "branchName">
  ) {
    super(request);
    this._branchName = branchName;
    this._variables = variables;
  }

  /**
   * Call the IssueVcsBranchSearch_Children query and return a IssueConnection
   *
   * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_ChildrenQuery
   * @returns parsed response from IssueVcsBranchSearch_ChildrenQuery
   */
  public async fetch(
    variables?: Omit<L.IssueVcsBranchSearch_ChildrenQueryVariables, "branchName">
  ): LinearFetch<IssueConnection | undefined> {
    const response = await this._request<
      L.IssueVcsBranchSearch_ChildrenQuery,
      L.IssueVcsBranchSearch_ChildrenQueryVariables
    >(L.IssueVcsBranchSearch_ChildrenDocument, {
      branchName: this._branchName,
      ...this._variables,
      ...variables,
    });
    const data = response.issueVcsBranchSearch?.children;
    if (data) {
      return new IssueConnection(
        this._request,
        connection =>
          this.fetch(
            defaultConnection({
              ...this._variables,
              ...variables,
              ...connection,
            })
          ),
        data
      );
    } else {
      return undefined;
    }
  }
}

/**
 * A fetchable IssueVcsBranchSearch_Comments Query
 *
 * @param request - function to call the graphql client
 * @param branchName - required branchName to pass to issueVcsBranchSearch
 * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_CommentsQuery
 */
export class IssueVcsBranchSearch_CommentsQuery extends Request {
  private _branchName: string;
  private _variables?: Omit<L.IssueVcsBranchSearch_CommentsQueryVariables, "branchName">;

  public constructor(
    request: LinearRequest,
    branchName: string,
    variables?: Omit<L.IssueVcsBranchSearch_CommentsQueryVariables, "branchName">
  ) {
    super(request);
    this._branchName = branchName;
    this._variables = variables;
  }

  /**
   * Call the IssueVcsBranchSearch_Comments query and return a CommentConnection
   *
   * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_CommentsQuery
   * @returns parsed response from IssueVcsBranchSearch_CommentsQuery
   */
  public async fetch(
    variables?: Omit<L.IssueVcsBranchSearch_CommentsQueryVariables, "branchName">
  ): LinearFetch<CommentConnection | undefined> {
    const response = await this._request<
      L.IssueVcsBranchSearch_CommentsQuery,
      L.IssueVcsBranchSearch_CommentsQueryVariables
    >(L.IssueVcsBranchSearch_CommentsDocument, {
      branchName: this._branchName,
      ...this._variables,
      ...variables,
    });
    const data = response.issueVcsBranchSearch?.comments;
    if (data) {
      return new CommentConnection(
        this._request,
        connection =>
          this.fetch(
            defaultConnection({
              ...this._variables,
              ...variables,
              ...connection,
            })
          ),
        data
      );
    } else {
      return undefined;
    }
  }
}

/**
 * A fetchable IssueVcsBranchSearch_History Query
 *
 * @param request - function to call the graphql client
 * @param branchName - required branchName to pass to issueVcsBranchSearch
 * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_HistoryQuery
 */
export class IssueVcsBranchSearch_HistoryQuery extends Request {
  private _branchName: string;
  private _variables?: Omit<L.IssueVcsBranchSearch_HistoryQueryVariables, "branchName">;

  public constructor(
    request: LinearRequest,
    branchName: string,
    variables?: Omit<L.IssueVcsBranchSearch_HistoryQueryVariables, "branchName">
  ) {
    super(request);
    this._branchName = branchName;
    this._variables = variables;
  }

  /**
   * Call the IssueVcsBranchSearch_History query and return a IssueHistoryConnection
   *
   * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_HistoryQuery
   * @returns parsed response from IssueVcsBranchSearch_HistoryQuery
   */
  public async fetch(
    variables?: Omit<L.IssueVcsBranchSearch_HistoryQueryVariables, "branchName">
  ): LinearFetch<IssueHistoryConnection | undefined> {
    const response = await this._request<
      L.IssueVcsBranchSearch_HistoryQuery,
      L.IssueVcsBranchSearch_HistoryQueryVariables
    >(L.IssueVcsBranchSearch_HistoryDocument, {
      branchName: this._branchName,
      ...this._variables,
      ...variables,
    });
    const data = response.issueVcsBranchSearch?.history;
    if (data) {
      return new IssueHistoryConnection(
        this._request,
        connection =>
          this.fetch(
            defaultConnection({
              ...this._variables,
              ...variables,
              ...connection,
            })
          ),
        data
      );
    } else {
      return undefined;
    }
  }
}

/**
 * A fetchable IssueVcsBranchSearch_InverseRelations Query
 *
 * @param request - function to call the graphql client
 * @param branchName - required branchName to pass to issueVcsBranchSearch
 * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_InverseRelationsQuery
 */
export class IssueVcsBranchSearch_InverseRelationsQuery extends Request {
  private _branchName: string;
  private _variables?: Omit<L.IssueVcsBranchSearch_InverseRelationsQueryVariables, "branchName">;

  public constructor(
    request: LinearRequest,
    branchName: string,
    variables?: Omit<L.IssueVcsBranchSearch_InverseRelationsQueryVariables, "branchName">
  ) {
    super(request);
    this._branchName = branchName;
    this._variables = variables;
  }

  /**
   * Call the IssueVcsBranchSearch_InverseRelations query and return a IssueRelationConnection
   *
   * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_InverseRelationsQuery
   * @returns parsed response from IssueVcsBranchSearch_InverseRelationsQuery
   */
  public async fetch(
    variables?: Omit<L.IssueVcsBranchSearch_InverseRelationsQueryVariables, "branchName">
  ): LinearFetch<IssueRelationConnection | undefined> {
    const response = await this._request<
      L.IssueVcsBranchSearch_InverseRelationsQuery,
      L.IssueVcsBranchSearch_InverseRelationsQueryVariables
    >(L.IssueVcsBranchSearch_InverseRelationsDocument, {
      branchName: this._branchName,
      ...this._variables,
      ...variables,
    });
    const data = response.issueVcsBranchSearch?.inverseRelations;
    if (data) {
      return new IssueRelationConnection(
        this._request,
        connection =>
          this.fetch(
            defaultConnection({
              ...this._variables,
              ...variables,
              ...connection,
            })
          ),
        data
      );
    } else {
      return undefined;
    }
  }
}

/**
 * A fetchable IssueVcsBranchSearch_Labels Query
 *
 * @param request - function to call the graphql client
 * @param branchName - required branchName to pass to issueVcsBranchSearch
 * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_LabelsQuery
 */
export class IssueVcsBranchSearch_LabelsQuery extends Request {
  private _branchName: string;
  private _variables?: Omit<L.IssueVcsBranchSearch_LabelsQueryVariables, "branchName">;

  public constructor(
    request: LinearRequest,
    branchName: string,
    variables?: Omit<L.IssueVcsBranchSearch_LabelsQueryVariables, "branchName">
  ) {
    super(request);
    this._branchName = branchName;
    this._variables = variables;
  }

  /**
   * Call the IssueVcsBranchSearch_Labels query and return a IssueLabelConnection
   *
   * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_LabelsQuery
   * @returns parsed response from IssueVcsBranchSearch_LabelsQuery
   */
  public async fetch(
    variables?: Omit<L.IssueVcsBranchSearch_LabelsQueryVariables, "branchName">
  ): LinearFetch<IssueLabelConnection | undefined> {
    const response = await this._request<
      L.IssueVcsBranchSearch_LabelsQuery,
      L.IssueVcsBranchSearch_LabelsQueryVariables
    >(L.IssueVcsBranchSearch_LabelsDocument, {
      branchName: this._branchName,
      ...this._variables,
      ...variables,
    });
    const data = response.issueVcsBranchSearch?.labels;
    if (data) {
      return new IssueLabelConnection(
        this._request,
        connection =>
          this.fetch(
            defaultConnection({
              ...this._variables,
              ...variables,
              ...connection,
            })
          ),
        data
      );
    } else {
      return undefined;
    }
  }
}

/**
 * A fetchable IssueVcsBranchSearch_Relations Query
 *
 * @param request - function to call the graphql client
 * @param branchName - required branchName to pass to issueVcsBranchSearch
 * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_RelationsQuery
 */
export class IssueVcsBranchSearch_RelationsQuery extends Request {
  private _branchName: string;
  private _variables?: Omit<L.IssueVcsBranchSearch_RelationsQueryVariables, "branchName">;

  public constructor(
    request: LinearRequest,
    branchName: string,
    variables?: Omit<L.IssueVcsBranchSearch_RelationsQueryVariables, "branchName">
  ) {
    super(request);
    this._branchName = branchName;
    this._variables = variables;
  }

  /**
   * Call the IssueVcsBranchSearch_Relations query and return a IssueRelationConnection
   *
   * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_RelationsQuery
   * @returns parsed response from IssueVcsBranchSearch_RelationsQuery
   */
  public async fetch(
    variables?: Omit<L.IssueVcsBranchSearch_RelationsQueryVariables, "branchName">
  ): LinearFetch<IssueRelationConnection | undefined> {
    const response = await this._request<
      L.IssueVcsBranchSearch_RelationsQuery,
      L.IssueVcsBranchSearch_RelationsQueryVariables
    >(L.IssueVcsBranchSearch_RelationsDocument, {
      branchName: this._branchName,
      ...this._variables,
      ...variables,
    });
    const data = response.issueVcsBranchSearch?.relations;
    if (data) {
      return new IssueRelationConnection(
        this._request,
        connection =>
          this.fetch(
            defaultConnection({
              ...this._variables,
              ...variables,
              ...connection,
            })
          ),
        data
      );
    } else {
      return undefined;
    }
  }
}

/**
 * A fetchable IssueVcsBranchSearch_Subscribers Query
 *
 * @param request - function to call the graphql client
 * @param branchName - required branchName to pass to issueVcsBranchSearch
 * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_SubscribersQuery
 */
export class IssueVcsBranchSearch_SubscribersQuery extends Request {
  private _branchName: string;
  private _variables?: Omit<L.IssueVcsBranchSearch_SubscribersQueryVariables, "branchName">;

  public constructor(
    request: LinearRequest,
    branchName: string,
    variables?: Omit<L.IssueVcsBranchSearch_SubscribersQueryVariables, "branchName">
  ) {
    super(request);
    this._branchName = branchName;
    this._variables = variables;
  }

  /**
   * Call the IssueVcsBranchSearch_Subscribers query and return a UserConnection
   *
   * @param variables - variables without 'branchName' to pass into the IssueVcsBranchSearch_SubscribersQuery
   * @returns parsed response from IssueVcsBranchSearch_SubscribersQuery
   */
  public async fetch(
    variables?: Omit<L.IssueVcsBranchSearch_SubscribersQueryVariables, "branchName">
  ): LinearFetch<UserConnection | undefined> {
    const response = await this._request<
      L.IssueVcsBranchSearch_SubscribersQuery,
      L.IssueVcsBranchSearch_SubscribersQueryVariables
    >(L.IssueVcsBranchSearch_SubscribersDocument, {
      branchName: this._branchName,
      ...this._variables,
      ...variables,
    });
    const data = response.issueVcsBranchSearch?.subscribers;
    if (data) {
      return new UserConnection(
        this._request,
        connection =>
          this.fetch(
            defaultConnection({
              ...this._variables,
              ...variables,
              ...connection,
            })
          ),
        data
      );
    } else {
      return undefined;
    }
  }
}

/**
 * A fetchable Organization_Integrations Query
 *
 * @param request - function to call the graphql client
 * @param variables - variables to pass into the Organization_IntegrationsQuery
 */
export class Organization_IntegrationsQuery extends Request {
  private _variables?: L.Organization_IntegrationsQueryVariables;

  public constructor(request: LinearRequest, variables?: L.Organization_IntegrationsQueryVariables) {
    super(request);

    this._variables = variables;
  }

  /**
   * Call the Organization_Integrations query and return a IntegrationConnection
   *
   * @param variables - variables to pass into the Organization_IntegrationsQuery
   * @returns parsed response from Organization_IntegrationsQuery
   */
  public async fetch(variables?: L.Organization_IntegrationsQueryVariables): LinearFetch<IntegrationConnection> {
    const response = await this._request<L.Organization_IntegrationsQuery, L.Organization_IntegrationsQueryVariables>(
      L.Organization_IntegrationsDocument,
      variables
    );
    const data = response.organization.integrations;

    return new IntegrationConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Organization_Labels Query
 *
 * @param request - function to call the graphql client
 * @param variables - variables to pass into the Organization_LabelsQuery
 */
export class Organization_LabelsQuery extends Request {
  private _variables?: L.Organization_LabelsQueryVariables;

  public constructor(request: LinearRequest, variables?: L.Organization_LabelsQueryVariables) {
    super(request);

    this._variables = variables;
  }

  /**
   * Call the Organization_Labels query and return a IssueLabelConnection
   *
   * @param variables - variables to pass into the Organization_LabelsQuery
   * @returns parsed response from Organization_LabelsQuery
   */
  public async fetch(variables?: L.Organization_LabelsQueryVariables): LinearFetch<IssueLabelConnection> {
    const response = await this._request<L.Organization_LabelsQuery, L.Organization_LabelsQueryVariables>(
      L.Organization_LabelsDocument,
      variables
    );
    const data = response.organization.labels;

    return new IssueLabelConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Organization_Subscription Query
 *
 * @param request - function to call the graphql client
 */
export class Organization_SubscriptionQuery extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Call the Organization_Subscription query and return a PaidSubscription
   *
   * @returns parsed response from Organization_SubscriptionQuery
   */
  public async fetch(): LinearFetch<PaidSubscription | undefined> {
    const response = await this._request<L.Organization_SubscriptionQuery, L.Organization_SubscriptionQueryVariables>(
      L.Organization_SubscriptionDocument,
      {}
    );
    const data = response.organization.subscription;

    return data ? new PaidSubscription(this._request, data) : undefined;
  }
}

/**
 * A fetchable Organization_Teams Query
 *
 * @param request - function to call the graphql client
 * @param variables - variables to pass into the Organization_TeamsQuery
 */
export class Organization_TeamsQuery extends Request {
  private _variables?: L.Organization_TeamsQueryVariables;

  public constructor(request: LinearRequest, variables?: L.Organization_TeamsQueryVariables) {
    super(request);

    this._variables = variables;
  }

  /**
   * Call the Organization_Teams query and return a TeamConnection
   *
   * @param variables - variables to pass into the Organization_TeamsQuery
   * @returns parsed response from Organization_TeamsQuery
   */
  public async fetch(variables?: L.Organization_TeamsQueryVariables): LinearFetch<TeamConnection> {
    const response = await this._request<L.Organization_TeamsQuery, L.Organization_TeamsQueryVariables>(
      L.Organization_TeamsDocument,
      variables
    );
    const data = response.organization.teams;

    return new TeamConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Organization_Templates Query
 *
 * @param request - function to call the graphql client
 * @param variables - variables to pass into the Organization_TemplatesQuery
 */
export class Organization_TemplatesQuery extends Request {
  private _variables?: L.Organization_TemplatesQueryVariables;

  public constructor(request: LinearRequest, variables?: L.Organization_TemplatesQueryVariables) {
    super(request);

    this._variables = variables;
  }

  /**
   * Call the Organization_Templates query and return a TemplateConnection
   *
   * @param variables - variables to pass into the Organization_TemplatesQuery
   * @returns parsed response from Organization_TemplatesQuery
   */
  public async fetch(variables?: L.Organization_TemplatesQueryVariables): LinearFetch<TemplateConnection> {
    const response = await this._request<L.Organization_TemplatesQuery, L.Organization_TemplatesQueryVariables>(
      L.Organization_TemplatesDocument,
      variables
    );
    const data = response.organization.templates;

    return new TemplateConnection(this._request, data);
  }
}

/**
 * A fetchable Organization_Users Query
 *
 * @param request - function to call the graphql client
 * @param variables - variables to pass into the Organization_UsersQuery
 */
export class Organization_UsersQuery extends Request {
  private _variables?: L.Organization_UsersQueryVariables;

  public constructor(request: LinearRequest, variables?: L.Organization_UsersQueryVariables) {
    super(request);

    this._variables = variables;
  }

  /**
   * Call the Organization_Users query and return a UserConnection
   *
   * @param variables - variables to pass into the Organization_UsersQuery
   * @returns parsed response from Organization_UsersQuery
   */
  public async fetch(variables?: L.Organization_UsersQueryVariables): LinearFetch<UserConnection> {
    const response = await this._request<L.Organization_UsersQuery, L.Organization_UsersQueryVariables>(
      L.Organization_UsersDocument,
      variables
    );
    const data = response.organization.users;

    return new UserConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Project_Documents Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to project
 * @param variables - variables without 'id' to pass into the Project_DocumentsQuery
 */
export class Project_DocumentsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Project_DocumentsQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Project_DocumentsQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Project_Documents query and return a DocumentConnection
   *
   * @param variables - variables without 'id' to pass into the Project_DocumentsQuery
   * @returns parsed response from Project_DocumentsQuery
   */
  public async fetch(variables?: Omit<L.Project_DocumentsQueryVariables, "id">): LinearFetch<DocumentConnection> {
    const response = await this._request<L.Project_DocumentsQuery, L.Project_DocumentsQueryVariables>(
      L.Project_DocumentsDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.project.documents;

    return new DocumentConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Project_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to project
 * @param variables - variables without 'id' to pass into the Project_IssuesQuery
 */
export class Project_IssuesQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Project_IssuesQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Project_IssuesQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Project_Issues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the Project_IssuesQuery
   * @returns parsed response from Project_IssuesQuery
   */
  public async fetch(variables?: Omit<L.Project_IssuesQueryVariables, "id">): LinearFetch<IssueConnection> {
    const response = await this._request<L.Project_IssuesQuery, L.Project_IssuesQueryVariables>(
      L.Project_IssuesDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.project.issues;

    return new IssueConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Project_Links Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to project
 * @param variables - variables without 'id' to pass into the Project_LinksQuery
 */
export class Project_LinksQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Project_LinksQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Project_LinksQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Project_Links query and return a ProjectLinkConnection
   *
   * @param variables - variables without 'id' to pass into the Project_LinksQuery
   * @returns parsed response from Project_LinksQuery
   */
  public async fetch(variables?: Omit<L.Project_LinksQueryVariables, "id">): LinearFetch<ProjectLinkConnection> {
    const response = await this._request<L.Project_LinksQuery, L.Project_LinksQueryVariables>(L.Project_LinksDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.project.links;

    return new ProjectLinkConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Project_Members Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to project
 * @param variables - variables without 'id' to pass into the Project_MembersQuery
 */
export class Project_MembersQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Project_MembersQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Project_MembersQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Project_Members query and return a UserConnection
   *
   * @param variables - variables without 'id' to pass into the Project_MembersQuery
   * @returns parsed response from Project_MembersQuery
   */
  public async fetch(variables?: Omit<L.Project_MembersQueryVariables, "id">): LinearFetch<UserConnection> {
    const response = await this._request<L.Project_MembersQuery, L.Project_MembersQueryVariables>(
      L.Project_MembersDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.project.members;

    return new UserConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Project_ProjectUpdates Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to project
 * @param variables - variables without 'id' to pass into the Project_ProjectUpdatesQuery
 */
export class Project_ProjectUpdatesQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Project_ProjectUpdatesQueryVariables, "id">;

  public constructor(
    request: LinearRequest,
    id: string,
    variables?: Omit<L.Project_ProjectUpdatesQueryVariables, "id">
  ) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Project_ProjectUpdates query and return a ProjectUpdateConnection
   *
   * @param variables - variables without 'id' to pass into the Project_ProjectUpdatesQuery
   * @returns parsed response from Project_ProjectUpdatesQuery
   */
  public async fetch(
    variables?: Omit<L.Project_ProjectUpdatesQueryVariables, "id">
  ): LinearFetch<ProjectUpdateConnection> {
    const response = await this._request<L.Project_ProjectUpdatesQuery, L.Project_ProjectUpdatesQueryVariables>(
      L.Project_ProjectUpdatesDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.project.projectUpdates;

    return new ProjectUpdateConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Project_Teams Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to project
 * @param variables - variables without 'id' to pass into the Project_TeamsQuery
 */
export class Project_TeamsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Project_TeamsQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Project_TeamsQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Project_Teams query and return a TeamConnection
   *
   * @param variables - variables without 'id' to pass into the Project_TeamsQuery
   * @returns parsed response from Project_TeamsQuery
   */
  public async fetch(variables?: Omit<L.Project_TeamsQueryVariables, "id">): LinearFetch<TeamConnection> {
    const response = await this._request<L.Project_TeamsQuery, L.Project_TeamsQueryVariables>(L.Project_TeamsDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.project.teams;

    return new TeamConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Roadmap_Projects Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to roadmap
 * @param variables - variables without 'id' to pass into the Roadmap_ProjectsQuery
 */
export class Roadmap_ProjectsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Roadmap_ProjectsQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Roadmap_ProjectsQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Roadmap_Projects query and return a ProjectConnection
   *
   * @param variables - variables without 'id' to pass into the Roadmap_ProjectsQuery
   * @returns parsed response from Roadmap_ProjectsQuery
   */
  public async fetch(variables?: Omit<L.Roadmap_ProjectsQueryVariables, "id">): LinearFetch<ProjectConnection> {
    const response = await this._request<L.Roadmap_ProjectsQuery, L.Roadmap_ProjectsQueryVariables>(
      L.Roadmap_ProjectsDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.roadmap.projects;

    return new ProjectConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Team_Cycles Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 * @param variables - variables without 'id' to pass into the Team_CyclesQuery
 */
export class Team_CyclesQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Team_CyclesQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Team_CyclesQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Team_Cycles query and return a CycleConnection
   *
   * @param variables - variables without 'id' to pass into the Team_CyclesQuery
   * @returns parsed response from Team_CyclesQuery
   */
  public async fetch(variables?: Omit<L.Team_CyclesQueryVariables, "id">): LinearFetch<CycleConnection> {
    const response = await this._request<L.Team_CyclesQuery, L.Team_CyclesQueryVariables>(L.Team_CyclesDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.team.cycles;

    return new CycleConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Team_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 * @param variables - variables without 'id' to pass into the Team_IssuesQuery
 */
export class Team_IssuesQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Team_IssuesQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Team_IssuesQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Team_Issues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the Team_IssuesQuery
   * @returns parsed response from Team_IssuesQuery
   */
  public async fetch(variables?: Omit<L.Team_IssuesQueryVariables, "id">): LinearFetch<IssueConnection> {
    const response = await this._request<L.Team_IssuesQuery, L.Team_IssuesQueryVariables>(L.Team_IssuesDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.team.issues;

    return new IssueConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Team_Labels Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 * @param variables - variables without 'id' to pass into the Team_LabelsQuery
 */
export class Team_LabelsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Team_LabelsQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Team_LabelsQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Team_Labels query and return a IssueLabelConnection
   *
   * @param variables - variables without 'id' to pass into the Team_LabelsQuery
   * @returns parsed response from Team_LabelsQuery
   */
  public async fetch(variables?: Omit<L.Team_LabelsQueryVariables, "id">): LinearFetch<IssueLabelConnection> {
    const response = await this._request<L.Team_LabelsQuery, L.Team_LabelsQueryVariables>(L.Team_LabelsDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.team.labels;

    return new IssueLabelConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Team_Members Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 * @param variables - variables without 'id' to pass into the Team_MembersQuery
 */
export class Team_MembersQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Team_MembersQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Team_MembersQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Team_Members query and return a UserConnection
   *
   * @param variables - variables without 'id' to pass into the Team_MembersQuery
   * @returns parsed response from Team_MembersQuery
   */
  public async fetch(variables?: Omit<L.Team_MembersQueryVariables, "id">): LinearFetch<UserConnection> {
    const response = await this._request<L.Team_MembersQuery, L.Team_MembersQueryVariables>(L.Team_MembersDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.team.members;

    return new UserConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Team_Memberships Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 * @param variables - variables without 'id' to pass into the Team_MembershipsQuery
 */
export class Team_MembershipsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Team_MembershipsQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Team_MembershipsQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Team_Memberships query and return a TeamMembershipConnection
   *
   * @param variables - variables without 'id' to pass into the Team_MembershipsQuery
   * @returns parsed response from Team_MembershipsQuery
   */
  public async fetch(variables?: Omit<L.Team_MembershipsQueryVariables, "id">): LinearFetch<TeamMembershipConnection> {
    const response = await this._request<L.Team_MembershipsQuery, L.Team_MembershipsQueryVariables>(
      L.Team_MembershipsDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.team.memberships;

    return new TeamMembershipConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Team_Projects Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 * @param variables - variables without 'id' to pass into the Team_ProjectsQuery
 */
export class Team_ProjectsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Team_ProjectsQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Team_ProjectsQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Team_Projects query and return a ProjectConnection
   *
   * @param variables - variables without 'id' to pass into the Team_ProjectsQuery
   * @returns parsed response from Team_ProjectsQuery
   */
  public async fetch(variables?: Omit<L.Team_ProjectsQueryVariables, "id">): LinearFetch<ProjectConnection> {
    const response = await this._request<L.Team_ProjectsQuery, L.Team_ProjectsQueryVariables>(L.Team_ProjectsDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.team.projects;

    return new ProjectConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Team_States Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 * @param variables - variables without 'id' to pass into the Team_StatesQuery
 */
export class Team_StatesQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Team_StatesQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Team_StatesQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Team_States query and return a WorkflowStateConnection
   *
   * @param variables - variables without 'id' to pass into the Team_StatesQuery
   * @returns parsed response from Team_StatesQuery
   */
  public async fetch(variables?: Omit<L.Team_StatesQueryVariables, "id">): LinearFetch<WorkflowStateConnection> {
    const response = await this._request<L.Team_StatesQuery, L.Team_StatesQueryVariables>(L.Team_StatesDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.team.states;

    return new WorkflowStateConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Team_Templates Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 * @param variables - variables without 'id' to pass into the Team_TemplatesQuery
 */
export class Team_TemplatesQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Team_TemplatesQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Team_TemplatesQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Team_Templates query and return a TemplateConnection
   *
   * @param variables - variables without 'id' to pass into the Team_TemplatesQuery
   * @returns parsed response from Team_TemplatesQuery
   */
  public async fetch(variables?: Omit<L.Team_TemplatesQueryVariables, "id">): LinearFetch<TemplateConnection> {
    const response = await this._request<L.Team_TemplatesQuery, L.Team_TemplatesQueryVariables>(
      L.Team_TemplatesDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.team.templates;

    return new TemplateConnection(this._request, data);
  }
}

/**
 * A fetchable Team_Webhooks Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to team
 * @param variables - variables without 'id' to pass into the Team_WebhooksQuery
 */
export class Team_WebhooksQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.Team_WebhooksQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.Team_WebhooksQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the Team_Webhooks query and return a WebhookConnection
   *
   * @param variables - variables without 'id' to pass into the Team_WebhooksQuery
   * @returns parsed response from Team_WebhooksQuery
   */
  public async fetch(variables?: Omit<L.Team_WebhooksQueryVariables, "id">): LinearFetch<WebhookConnection> {
    const response = await this._request<L.Team_WebhooksQuery, L.Team_WebhooksQueryVariables>(L.Team_WebhooksDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.team.webhooks;

    return new WebhookConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable User_AssignedIssues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to user
 * @param variables - variables without 'id' to pass into the User_AssignedIssuesQuery
 */
export class User_AssignedIssuesQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.User_AssignedIssuesQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.User_AssignedIssuesQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the User_AssignedIssues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the User_AssignedIssuesQuery
   * @returns parsed response from User_AssignedIssuesQuery
   */
  public async fetch(variables?: Omit<L.User_AssignedIssuesQueryVariables, "id">): LinearFetch<IssueConnection> {
    const response = await this._request<L.User_AssignedIssuesQuery, L.User_AssignedIssuesQueryVariables>(
      L.User_AssignedIssuesDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.user.assignedIssues;

    return new IssueConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable User_CreatedIssues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to user
 * @param variables - variables without 'id' to pass into the User_CreatedIssuesQuery
 */
export class User_CreatedIssuesQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.User_CreatedIssuesQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.User_CreatedIssuesQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the User_CreatedIssues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the User_CreatedIssuesQuery
   * @returns parsed response from User_CreatedIssuesQuery
   */
  public async fetch(variables?: Omit<L.User_CreatedIssuesQueryVariables, "id">): LinearFetch<IssueConnection> {
    const response = await this._request<L.User_CreatedIssuesQuery, L.User_CreatedIssuesQueryVariables>(
      L.User_CreatedIssuesDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.user.createdIssues;

    return new IssueConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable User_TeamMemberships Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to user
 * @param variables - variables without 'id' to pass into the User_TeamMembershipsQuery
 */
export class User_TeamMembershipsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.User_TeamMembershipsQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.User_TeamMembershipsQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the User_TeamMemberships query and return a TeamMembershipConnection
   *
   * @param variables - variables without 'id' to pass into the User_TeamMembershipsQuery
   * @returns parsed response from User_TeamMembershipsQuery
   */
  public async fetch(
    variables?: Omit<L.User_TeamMembershipsQueryVariables, "id">
  ): LinearFetch<TeamMembershipConnection> {
    const response = await this._request<L.User_TeamMembershipsQuery, L.User_TeamMembershipsQueryVariables>(
      L.User_TeamMembershipsDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.user.teamMemberships;

    return new TeamMembershipConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable User_Teams Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to user
 * @param variables - variables without 'id' to pass into the User_TeamsQuery
 */
export class User_TeamsQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.User_TeamsQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.User_TeamsQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the User_Teams query and return a TeamConnection
   *
   * @param variables - variables without 'id' to pass into the User_TeamsQuery
   * @returns parsed response from User_TeamsQuery
   */
  public async fetch(variables?: Omit<L.User_TeamsQueryVariables, "id">): LinearFetch<TeamConnection> {
    const response = await this._request<L.User_TeamsQuery, L.User_TeamsQueryVariables>(L.User_TeamsDocument, {
      id: this._id,
      ...this._variables,
      ...variables,
    });
    const data = response.user.teams;

    return new TeamConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Viewer_AssignedIssues Query
 *
 * @param request - function to call the graphql client
 * @param variables - variables to pass into the Viewer_AssignedIssuesQuery
 */
export class Viewer_AssignedIssuesQuery extends Request {
  private _variables?: L.Viewer_AssignedIssuesQueryVariables;

  public constructor(request: LinearRequest, variables?: L.Viewer_AssignedIssuesQueryVariables) {
    super(request);

    this._variables = variables;
  }

  /**
   * Call the Viewer_AssignedIssues query and return a IssueConnection
   *
   * @param variables - variables to pass into the Viewer_AssignedIssuesQuery
   * @returns parsed response from Viewer_AssignedIssuesQuery
   */
  public async fetch(variables?: L.Viewer_AssignedIssuesQueryVariables): LinearFetch<IssueConnection> {
    const response = await this._request<L.Viewer_AssignedIssuesQuery, L.Viewer_AssignedIssuesQueryVariables>(
      L.Viewer_AssignedIssuesDocument,
      variables
    );
    const data = response.viewer.assignedIssues;

    return new IssueConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Viewer_CreatedIssues Query
 *
 * @param request - function to call the graphql client
 * @param variables - variables to pass into the Viewer_CreatedIssuesQuery
 */
export class Viewer_CreatedIssuesQuery extends Request {
  private _variables?: L.Viewer_CreatedIssuesQueryVariables;

  public constructor(request: LinearRequest, variables?: L.Viewer_CreatedIssuesQueryVariables) {
    super(request);

    this._variables = variables;
  }

  /**
   * Call the Viewer_CreatedIssues query and return a IssueConnection
   *
   * @param variables - variables to pass into the Viewer_CreatedIssuesQuery
   * @returns parsed response from Viewer_CreatedIssuesQuery
   */
  public async fetch(variables?: L.Viewer_CreatedIssuesQueryVariables): LinearFetch<IssueConnection> {
    const response = await this._request<L.Viewer_CreatedIssuesQuery, L.Viewer_CreatedIssuesQueryVariables>(
      L.Viewer_CreatedIssuesDocument,
      variables
    );
    const data = response.viewer.createdIssues;

    return new IssueConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Viewer_TeamMemberships Query
 *
 * @param request - function to call the graphql client
 * @param variables - variables to pass into the Viewer_TeamMembershipsQuery
 */
export class Viewer_TeamMembershipsQuery extends Request {
  private _variables?: L.Viewer_TeamMembershipsQueryVariables;

  public constructor(request: LinearRequest, variables?: L.Viewer_TeamMembershipsQueryVariables) {
    super(request);

    this._variables = variables;
  }

  /**
   * Call the Viewer_TeamMemberships query and return a TeamMembershipConnection
   *
   * @param variables - variables to pass into the Viewer_TeamMembershipsQuery
   * @returns parsed response from Viewer_TeamMembershipsQuery
   */
  public async fetch(variables?: L.Viewer_TeamMembershipsQueryVariables): LinearFetch<TeamMembershipConnection> {
    const response = await this._request<L.Viewer_TeamMembershipsQuery, L.Viewer_TeamMembershipsQueryVariables>(
      L.Viewer_TeamMembershipsDocument,
      variables
    );
    const data = response.viewer.teamMemberships;

    return new TeamMembershipConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable Viewer_Teams Query
 *
 * @param request - function to call the graphql client
 * @param variables - variables to pass into the Viewer_TeamsQuery
 */
export class Viewer_TeamsQuery extends Request {
  private _variables?: L.Viewer_TeamsQueryVariables;

  public constructor(request: LinearRequest, variables?: L.Viewer_TeamsQueryVariables) {
    super(request);

    this._variables = variables;
  }

  /**
   * Call the Viewer_Teams query and return a TeamConnection
   *
   * @param variables - variables to pass into the Viewer_TeamsQuery
   * @returns parsed response from Viewer_TeamsQuery
   */
  public async fetch(variables?: L.Viewer_TeamsQueryVariables): LinearFetch<TeamConnection> {
    const response = await this._request<L.Viewer_TeamsQuery, L.Viewer_TeamsQueryVariables>(
      L.Viewer_TeamsDocument,
      variables
    );
    const data = response.viewer.teams;

    return new TeamConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * A fetchable WorkflowState_Issues Query
 *
 * @param request - function to call the graphql client
 * @param id - required id to pass to workflowState
 * @param variables - variables without 'id' to pass into the WorkflowState_IssuesQuery
 */
export class WorkflowState_IssuesQuery extends Request {
  private _id: string;
  private _variables?: Omit<L.WorkflowState_IssuesQueryVariables, "id">;

  public constructor(request: LinearRequest, id: string, variables?: Omit<L.WorkflowState_IssuesQueryVariables, "id">) {
    super(request);
    this._id = id;
    this._variables = variables;
  }

  /**
   * Call the WorkflowState_Issues query and return a IssueConnection
   *
   * @param variables - variables without 'id' to pass into the WorkflowState_IssuesQuery
   * @returns parsed response from WorkflowState_IssuesQuery
   */
  public async fetch(variables?: Omit<L.WorkflowState_IssuesQueryVariables, "id">): LinearFetch<IssueConnection> {
    const response = await this._request<L.WorkflowState_IssuesQuery, L.WorkflowState_IssuesQueryVariables>(
      L.WorkflowState_IssuesDocument,
      {
        id: this._id,
        ...this._variables,
        ...variables,
      }
    );
    const data = response.workflowState.issues;

    return new IssueConnection(
      this._request,
      connection =>
        this.fetch(
          defaultConnection({
            ...this._variables,
            ...variables,
            ...connection,
          })
        ),
      data
    );
  }
}

/**
 * The SDK class containing all root operations
 *
 * @param request - function to call the graphql client
 */
export class LinearSdk extends Request {
  public constructor(request: LinearRequest) {
    super(request);
  }

  /**
   * Creates an integration api key for Airbyte to connect with Linear
   *
   * @param input - required input to pass to airbyteIntegrationConnect
   * @returns IntegrationPayload
   */
  public airbyteIntegrationConnect(input: L.AirbyteConfigurationInput): LinearFetch<IntegrationPayload> {
    return new AirbyteIntegrationConnectMutation(this._request).fetch(input);
  }
  /**
   * Creates a new API key.
   *
   * @param input - required input to pass to createApiKey
   * @returns ApiKeyPayload
   */
  public createApiKey(input: L.ApiKeyCreateInput): LinearFetch<ApiKeyPayload> {
    return new CreateApiKeyMutation(this._request).fetch(input);
  }
  /**
   * Deletes an API key.
   *
   * @param id - required id to pass to deleteApiKey
   * @returns ArchivePayload
   */
  public deleteApiKey(id: string): LinearFetch<ArchivePayload> {
    return new DeleteApiKeyMutation(this._request).fetch(id);
  }
  /**
   * [DEPRECATED] Archives an issue attachment.
   *
   * @param id - required id to pass to archiveAttachment
   * @returns ArchivePayload
   */
  public archiveAttachment(id: string): LinearFetch<ArchivePayload> {
    return new ArchiveAttachmentMutation(this._request).fetch(id);
  }
  /**
   * Creates a new attachment, or updates existing if the same `url` and `issueId` is used.
   *
   * @param input - required input to pass to createAttachment
   * @returns AttachmentPayload
   */
  public createAttachment(input: L.AttachmentCreateInput): LinearFetch<AttachmentPayload> {
    return new CreateAttachmentMutation(this._request).fetch(input);
  }
  /**
   * Deletes an issue attachment.
   *
   * @param id - required id to pass to deleteAttachment
   * @returns ArchivePayload
   */
  public deleteAttachment(id: string): LinearFetch<ArchivePayload> {
    return new DeleteAttachmentMutation(this._request).fetch(id);
  }
  /**
   * Link an existing Discord message to an issue.
   *
   * @param channelId - required channelId to pass to attachmentLinkDiscord
   * @param issueId - required issueId to pass to attachmentLinkDiscord
   * @param messageId - required messageId to pass to attachmentLinkDiscord
   * @param url - required url to pass to attachmentLinkDiscord
   * @returns AttachmentPayload
   */
  public attachmentLinkDiscord(
    channelId: string,
    issueId: string,
    messageId: string,
    url: string
  ): LinearFetch<AttachmentPayload> {
    return new AttachmentLinkDiscordMutation(this._request).fetch(channelId, issueId, messageId, url);
  }
  /**
   * Link an existing Front conversation to an issue.
   *
   * @param conversationId - required conversationId to pass to attachmentLinkFront
   * @param issueId - required issueId to pass to attachmentLinkFront
   * @returns FrontAttachmentPayload
   */
  public attachmentLinkFront(conversationId: string, issueId: string): LinearFetch<FrontAttachmentPayload> {
    return new AttachmentLinkFrontMutation(this._request).fetch(conversationId, issueId);
  }
  /**
   * Link an existing Intercom conversation to an issue.
   *
   * @param conversationId - required conversationId to pass to attachmentLinkIntercom
   * @param issueId - required issueId to pass to attachmentLinkIntercom
   * @returns AttachmentPayload
   */
  public attachmentLinkIntercom(conversationId: string, issueId: string): LinearFetch<AttachmentPayload> {
    return new AttachmentLinkIntercomMutation(this._request).fetch(conversationId, issueId);
  }
  /**
   * Link an existing Jira issue to an issue.
   *
   * @param issueId - required issueId to pass to attachmentLinkJiraIssue
   * @param jiraIssueId - required jiraIssueId to pass to attachmentLinkJiraIssue
   * @returns AttachmentPayload
   */
  public attachmentLinkJiraIssue(issueId: string, jiraIssueId: string): LinearFetch<AttachmentPayload> {
    return new AttachmentLinkJiraIssueMutation(this._request).fetch(issueId, jiraIssueId);
  }
  /**
   * Link any url to an issue.
   *
   * @param issueId - required issueId to pass to attachmentLinkURL
   * @param url - required url to pass to attachmentLinkURL
   * @param variables - variables without 'issueId', 'url' to pass into the AttachmentLinkUrlMutation
   * @returns AttachmentPayload
   */
  public attachmentLinkURL(
    issueId: string,
    url: string,
    variables?: Omit<L.AttachmentLinkUrlMutationVariables, "issueId" | "url">
  ): LinearFetch<AttachmentPayload> {
    return new AttachmentLinkUrlMutation(this._request).fetch(issueId, url, variables);
  }
  /**
   * Link an existing Zendesk ticket to an issue.
   *
   * @param issueId - required issueId to pass to attachmentLinkZendesk
   * @param ticketId - required ticketId to pass to attachmentLinkZendesk
   * @returns AttachmentPayload
   */
  public attachmentLinkZendesk(issueId: string, ticketId: string): LinearFetch<AttachmentPayload> {
    return new AttachmentLinkZendeskMutation(this._request).fetch(issueId, ticketId);
  }
  /**
   * Updates an existing issue attachment.
   *
   * @param id - required id to pass to updateAttachment
   * @param input - required input to pass to updateAttachment
   * @returns AttachmentPayload
   */
  public updateAttachment(id: string, input: L.AttachmentUpdateInput): LinearFetch<AttachmentPayload> {
    return new UpdateAttachmentMutation(this._request).fetch(id, input);
  }
  /**
   * Creates a new comment.
   *
   * @param input - required input to pass to createComment
   * @returns CommentPayload
   */
  public createComment(input: L.CommentCreateInput): LinearFetch<CommentPayload> {
    return new CreateCommentMutation(this._request).fetch(input);
  }
  /**
   * Deletes a comment.
   *
   * @param id - required id to pass to deleteComment
   * @returns ArchivePayload
   */
  public deleteComment(id: string): LinearFetch<ArchivePayload> {
    return new DeleteCommentMutation(this._request).fetch(id);
  }
  /**
   * Updates a comment.
   *
   * @param id - required id to pass to updateComment
   * @param input - required input to pass to updateComment
   * @returns CommentPayload
   */
  public updateComment(id: string, input: L.CommentUpdateInput): LinearFetch<CommentPayload> {
    return new UpdateCommentMutation(this._request).fetch(id, input);
  }
  /**
   * Saves user message.
   *
   * @param input - required input to pass to createContact
   * @returns ContactPayload
   */
  public createContact(input: L.ContactCreateInput): LinearFetch<ContactPayload> {
    return new CreateContactMutation(this._request).fetch(input);
  }
  /**
   * Create CSV export report for the organization.
   *
   * @param variables - variables to pass into the CreateCsvExportReportMutation
   * @returns CreateCsvExportReportPayload
   */
  public createCsvExportReport(
    variables?: L.CreateCsvExportReportMutationVariables
  ): LinearFetch<CreateCsvExportReportPayload> {
    return new CreateCsvExportReportMutation(this._request).fetch(variables);
  }
  /**
   * Creates an organization from onboarding.
   *
   * @param input - required input to pass to createOrganizationFromOnboarding
   * @param variables - variables without 'input' to pass into the CreateOrganizationFromOnboardingMutation
   * @returns CreateOrJoinOrganizationResponse
   */
  public createOrganizationFromOnboarding(
    input: L.CreateOrganizationInput,
    variables?: Omit<L.CreateOrganizationFromOnboardingMutationVariables, "input">
  ): LinearFetch<CreateOrJoinOrganizationResponse> {
    return new CreateOrganizationFromOnboardingMutation(this._request).fetch(input, variables);
  }
  /**
   * Creates a new custom view.
   *
   * @param input - required input to pass to createCustomView
   * @returns CustomViewPayload
   */
  public createCustomView(input: L.CustomViewCreateInput): LinearFetch<CustomViewPayload> {
    return new CreateCustomViewMutation(this._request).fetch(input);
  }
  /**
   * Deletes a custom view.
   *
   * @param id - required id to pass to deleteCustomView
   * @returns ArchivePayload
   */
  public deleteCustomView(id: string): LinearFetch<ArchivePayload> {
    return new DeleteCustomViewMutation(this._request).fetch(id);
  }
  /**
   * Updates a custom view.
   *
   * @param id - required id to pass to updateCustomView
   * @param input - required input to pass to updateCustomView
   * @returns CustomViewPayload
   */
  public updateCustomView(id: string, input: L.CustomViewUpdateInput): LinearFetch<CustomViewPayload> {
    return new UpdateCustomViewMutation(this._request).fetch(id, input);
  }
  /**
   * Archives a cycle.
   *
   * @param id - required id to pass to archiveCycle
   * @returns ArchivePayload
   */
  public archiveCycle(id: string): LinearFetch<ArchivePayload> {
    return new ArchiveCycleMutation(this._request).fetch(id);
  }
  /**
   * Creates a new cycle.
   *
   * @param input - required input to pass to createCycle
   * @returns CyclePayload
   */
  public createCycle(input: L.CycleCreateInput): LinearFetch<CyclePayload> {
    return new CreateCycleMutation(this._request).fetch(input);
  }
  /**
   * Updates a cycle.
   *
   * @param id - required id to pass to updateCycle
   * @param input - required input to pass to updateCycle
   * @returns CyclePayload
   */
  public updateCycle(id: string, input: L.CycleUpdateInput): LinearFetch<CyclePayload> {
    return new UpdateCycleMutation(this._request).fetch(id, input);
  }
  /**
   * Creates a new document.
   *
   * @param input - required input to pass to createDocument
   * @returns DocumentPayload
   */
  public createDocument(input: L.DocumentCreateInput): LinearFetch<DocumentPayload> {
    return new CreateDocumentMutation(this._request).fetch(input);
  }
  /**
   * Deletes a document.
   *
   * @param id - required id to pass to deleteDocument
   * @returns ArchivePayload
   */
  public deleteDocument(id: string): LinearFetch<ArchivePayload> {
    return new DeleteDocumentMutation(this._request).fetch(id);
  }
  /**
   * Updates a document.
   *
   * @param id - required id to pass to updateDocument
   * @param input - required input to pass to updateDocument
   * @returns DocumentPayload
   */
  public updateDocument(id: string, input: L.DocumentUpdateInput): LinearFetch<DocumentPayload> {
    return new UpdateDocumentMutation(this._request).fetch(id, input);
  }
  /**
   * Authenticates a user account via email and authentication token.
   *
   * @param input - required input to pass to emailTokenUserAccountAuth
   * @returns AuthResolverResponse
   */
  public emailTokenUserAccountAuth(input: L.TokenUserAccountAuthInput): LinearFetch<AuthResolverResponse> {
    return new EmailTokenUserAccountAuthMutation(this._request).fetch(input);
  }
  /**
   * Unsubscribes the user from one type of emails.
   *
   * @param input - required input to pass to emailUnsubscribe
   * @returns EmailUnsubscribePayload
   */
  public emailUnsubscribe(input: L.EmailUnsubscribeInput): LinearFetch<EmailUnsubscribePayload> {
    return new EmailUnsubscribeMutation(this._request).fetch(input);
  }
  /**
   * Finds or creates a new user account by email and sends an email with token.
   *
   * @param input - required input to pass to emailUserAccountAuthChallenge
   * @returns EmailUserAccountAuthChallengeResponse
   */
  public emailUserAccountAuthChallenge(
    input: L.EmailUserAccountAuthChallengeInput
  ): LinearFetch<EmailUserAccountAuthChallengeResponse> {
    return new EmailUserAccountAuthChallengeMutation(this._request).fetch(input);
  }
  /**
   * Creates a custom emoji.
   *
   * @param input - required input to pass to createEmoji
   * @returns EmojiPayload
   */
  public createEmoji(input: L.EmojiCreateInput): LinearFetch<EmojiPayload> {
    return new CreateEmojiMutation(this._request).fetch(input);
  }
  /**
   * Deletes an emoji.
   *
   * @param id - required id to pass to deleteEmoji
   * @returns ArchivePayload
   */
  public deleteEmoji(id: string): LinearFetch<ArchivePayload> {
    return new DeleteEmojiMutation(this._request).fetch(id);
  }
  /**
   * [Deprecated] Creates a new event.
   *
   * @param input - required input to pass to createEvent
   * @returns EventPayload
   */
  public createEvent(input: L.EventCreateInput): LinearFetch<EventPayload> {
    return new CreateEventMutation(this._request).fetch(input);
  }
  /**
   * Creates a new favorite (project, cycle etc).
   *
   * @param input - required input to pass to createFavorite
   * @returns FavoritePayload
   */
  public createFavorite(input: L.FavoriteCreateInput): LinearFetch<FavoritePayload> {
    return new CreateFavoriteMutation(this._request).fetch(input);
  }
  /**
   * Deletes a favorite reference.
   *
   * @param id - required id to pass to deleteFavorite
   * @returns ArchivePayload
   */
  public deleteFavorite(id: string): LinearFetch<ArchivePayload> {
    return new DeleteFavoriteMutation(this._request).fetch(id);
  }
  /**
   * Updates a favorite.
   *
   * @param id - required id to pass to updateFavorite
   * @param input - required input to pass to updateFavorite
   * @returns FavoritePayload
   */
  public updateFavorite(id: string, input: L.FavoriteUpdateInput): LinearFetch<FavoritePayload> {
    return new UpdateFavoriteMutation(this._request).fetch(id, input);
  }
  /**
   * XHR request payload to upload an images, video and other attachments directly to Linear's cloud storage.
   *
   * @param contentType - required contentType to pass to fileUpload
   * @param filename - required filename to pass to fileUpload
   * @param size - required size to pass to fileUpload
   * @param variables - variables without 'contentType', 'filename', 'size' to pass into the FileUploadMutation
   * @returns UploadPayload
   */
  public fileUpload(
    contentType: string,
    filename: string,
    size: number,
    variables?: Omit<L.FileUploadMutationVariables, "contentType" | "filename" | "size">
  ): LinearFetch<UploadPayload> {
    return new FileUploadMutation(this._request).fetch(contentType, filename, size, variables);
  }
  /**
   * Authenticate user account through Google OAuth. This is the 2nd step of OAuth flow.
   *
   * @param input - required input to pass to googleUserAccountAuth
   * @returns AuthResolverResponse
   */
  public googleUserAccountAuth(input: L.GoogleUserAccountAuthInput): LinearFetch<AuthResolverResponse> {
    return new GoogleUserAccountAuthMutation(this._request).fetch(input);
  }
  /**
   * Upload an image from an URL to Linear.
   *
   * @param url - required url to pass to imageUploadFromUrl
   * @returns ImageUploadFromUrlPayload
   */
  public imageUploadFromUrl(url: string): LinearFetch<ImageUploadFromUrlPayload> {
    return new ImageUploadFromUrlMutation(this._request).fetch(url);
  }
  /**
   * Deletes an integration.
   *
   * @param id - required id to pass to deleteIntegration
   * @returns ArchivePayload
   */
  public deleteIntegration(id: string): LinearFetch<ArchivePayload> {
    return new DeleteIntegrationMutation(this._request).fetch(id);
  }
  /**
   * Integrates the organization with Discord.
   *
   * @param code - required code to pass to integrationDiscord
   * @param redirectUri - required redirectUri to pass to integrationDiscord
   * @returns IntegrationPayload
   */
  public integrationDiscord(code: string, redirectUri: string): LinearFetch<IntegrationPayload> {
    return new IntegrationDiscordMutation(this._request).fetch(code, redirectUri);
  }
  /**
   * Integrates the organization with Figma.
   *
   * @param code - required code to pass to integrationFigma
   * @param redirectUri - required redirectUri to pass to integrationFigma
   * @returns IntegrationPayload
   */
  public integrationFigma(code: string, redirectUri: string): LinearFetch<IntegrationPayload> {
    return new IntegrationFigmaMutation(this._request).fetch(code, redirectUri);
  }
  /**
   * Integrates the organization with Front.
   *
   * @param code - required code to pass to integrationFront
   * @param redirectUri - required redirectUri to pass to integrationFront
   * @returns IntegrationPayload
   */
  public integrationFront(code: string, redirectUri: string): LinearFetch<IntegrationPayload> {
    return new IntegrationFrontMutation(this._request).fetch(code, redirectUri);
  }
  /**
   * Generates a webhook for the GitHub commit integration.
   *
   * @returns GitHubCommitIntegrationPayload
   */
  public get createIntegrationGithubCommit(): LinearFetch<GitHubCommitIntegrationPayload> {
    return new CreateIntegrationGithubCommitMutation(this._request).fetch();
  }
  /**
   * Connects the organization with the GitHub App.
   *
   * @param installationId - required installationId to pass to integrationGithubConnect
   * @returns IntegrationPayload
   */
  public integrationGithubConnect(installationId: string): LinearFetch<IntegrationPayload> {
    return new IntegrationGithubConnectMutation(this._request).fetch(installationId);
  }
  /**
   * Connects the organization with a GitLab Access Token.
   *
   * @param accessToken - required accessToken to pass to integrationGitlabConnect
   * @param gitlabUrl - required gitlabUrl to pass to integrationGitlabConnect
   * @returns IntegrationPayload
   */
  public integrationGitlabConnect(accessToken: string, gitlabUrl: string): LinearFetch<IntegrationPayload> {
    return new IntegrationGitlabConnectMutation(this._request).fetch(accessToken, gitlabUrl);
  }
  /**
   * Integrates the organization with Google Sheets.
   *
   * @param code - required code to pass to integrationGoogleSheets
   * @returns IntegrationPayload
   */
  public integrationGoogleSheets(code: string): LinearFetch<IntegrationPayload> {
    return new IntegrationGoogleSheetsMutation(this._request).fetch(code);
  }
  /**
   * Integrates the organization with Intercom.
   *
   * @param code - required code to pass to integrationIntercom
   * @param redirectUri - required redirectUri to pass to integrationIntercom
   * @param variables - variables without 'code', 'redirectUri' to pass into the IntegrationIntercomMutation
   * @returns IntegrationPayload
   */
  public integrationIntercom(
    code: string,
    redirectUri: string,
    variables?: Omit<L.IntegrationIntercomMutationVariables, "code" | "redirectUri">
  ): LinearFetch<IntegrationPayload> {
    return new IntegrationIntercomMutation(this._request).fetch(code, redirectUri, variables);
  }
  /**
   * Disconnects the organization from Intercom.
   *
   * @returns IntegrationPayload
   */
  public get deleteIntegrationIntercom(): LinearFetch<IntegrationPayload> {
    return new DeleteIntegrationIntercomMutation(this._request).fetch();
  }
  /**
   * [DEPRECATED] Updates settings on the Intercom integration.
   *
   * @param input - required input to pass to updateIntegrationIntercomSettings
   * @returns IntegrationPayload
   */
  public updateIntegrationIntercomSettings(input: L.IntercomSettingsInput): LinearFetch<IntegrationPayload> {
    return new UpdateIntegrationIntercomSettingsMutation(this._request).fetch(input);
  }
  /**
   * Enables Loom integration for the organization.
   *
   * @returns IntegrationPayload
   */
  public get integrationLoom(): LinearFetch<IntegrationPayload> {
    return new IntegrationLoomMutation(this._request).fetch();
  }
  /**
   * Requests a currently unavailable integration.
   *
   * @param input - required input to pass to integrationRequest
   * @returns IntegrationRequestPayload
   */
  public integrationRequest(input: L.IntegrationRequestInput): LinearFetch<IntegrationRequestPayload> {
    return new IntegrationRequestMutation(this._request).fetch(input);
  }
  /**
   * Integrates the organization with Sentry.
   *
   * @param code - required code to pass to integrationSentryConnect
   * @param installationId - required installationId to pass to integrationSentryConnect
   * @param organizationSlug - required organizationSlug to pass to integrationSentryConnect
   * @returns IntegrationPayload
   */
  public integrationSentryConnect(
    code: string,
    installationId: string,
    organizationSlug: string
  ): LinearFetch<IntegrationPayload> {
    return new IntegrationSentryConnectMutation(this._request).fetch(code, installationId, organizationSlug);
  }
  /**
   * Integrates the organization with Slack.
   *
   * @param code - required code to pass to integrationSlack
   * @param redirectUri - required redirectUri to pass to integrationSlack
   * @param variables - variables without 'code', 'redirectUri' to pass into the IntegrationSlackMutation
   * @returns IntegrationPayload
   */
  public integrationSlack(
    code: string,
    redirectUri: string,
    variables?: Omit<L.IntegrationSlackMutationVariables, "code" | "redirectUri">
  ): LinearFetch<IntegrationPayload> {
    return new IntegrationSlackMutation(this._request).fetch(code, redirectUri, variables);
  }
  /**
   * Imports custom emojis from your Slack workspace.
   *
   * @param code - required code to pass to integrationSlackImportEmojis
   * @param redirectUri - required redirectUri to pass to integrationSlackImportEmojis
   * @returns IntegrationPayload
   */
  public integrationSlackImportEmojis(code: string, redirectUri: string): LinearFetch<IntegrationPayload> {
    return new IntegrationSlackImportEmojisMutation(this._request).fetch(code, redirectUri);
  }
  /**
   * Slack integration for organization level project update notifications.
   *
   * @param code - required code to pass to integrationSlackOrgProjectUpdatesPost
   * @param redirectUri - required redirectUri to pass to integrationSlackOrgProjectUpdatesPost
   * @returns IntegrationPayload
   */
  public integrationSlackOrgProjectUpdatesPost(code: string, redirectUri: string): LinearFetch<IntegrationPayload> {
    return new IntegrationSlackOrgProjectUpdatesPostMutation(this._request).fetch(code, redirectUri);
  }
  /**
   * Integrates your personal notifications with Slack.
   *
   * @param code - required code to pass to integrationSlackPersonal
   * @param redirectUri - required redirectUri to pass to integrationSlackPersonal
   * @returns IntegrationPayload
   */
  public integrationSlackPersonal(code: string, redirectUri: string): LinearFetch<IntegrationPayload> {
    return new IntegrationSlackPersonalMutation(this._request).fetch(code, redirectUri);
  }
  /**
   * Slack webhook integration.
   *
   * @param code - required code to pass to integrationSlackPost
   * @param redirectUri - required redirectUri to pass to integrationSlackPost
   * @param teamId - required teamId to pass to integrationSlackPost
   * @param variables - variables without 'code', 'redirectUri', 'teamId' to pass into the IntegrationSlackPostMutation
   * @returns IntegrationPayload
   */
  public integrationSlackPost(
    code: string,
    redirectUri: string,
    teamId: string,
    variables?: Omit<L.IntegrationSlackPostMutationVariables, "code" | "redirectUri" | "teamId">
  ): LinearFetch<IntegrationPayload> {
    return new IntegrationSlackPostMutation(this._request).fetch(code, redirectUri, teamId, variables);
  }
  /**
   * Slack integration for project notifications.
   *
   * @param code - required code to pass to integrationSlackProjectPost
   * @param projectId - required projectId to pass to integrationSlackProjectPost
   * @param redirectUri - required redirectUri to pass to integrationSlackProjectPost
   * @param service - required service to pass to integrationSlackProjectPost
   * @returns IntegrationPayload
   */
  public integrationSlackProjectPost(
    code: string,
    projectId: string,
    redirectUri: string,
    service: string
  ): LinearFetch<IntegrationPayload> {
    return new IntegrationSlackProjectPostMutation(this._request).fetch(code, projectId, redirectUri, service);
  }
  /**
   * Creates a new integrationTemplate join.
   *
   * @param input - required input to pass to createIntegrationTemplate
   * @returns IntegrationTemplatePayload
   */
  public createIntegrationTemplate(input: L.IntegrationTemplateCreateInput): LinearFetch<IntegrationTemplatePayload> {
    return new CreateIntegrationTemplateMutation(this._request).fetch(input);
  }
  /**
   * Deletes a integrationTemplate.
   *
   * @param id - required id to pass to deleteIntegrationTemplate
   * @returns ArchivePayload
   */
  public deleteIntegrationTemplate(id: string): LinearFetch<ArchivePayload> {
    return new DeleteIntegrationTemplateMutation(this._request).fetch(id);
  }
  /**
   * Integrates the organization with Zendesk.
   *
   * @param code - required code to pass to integrationZendesk
   * @param redirectUri - required redirectUri to pass to integrationZendesk
   * @param scope - required scope to pass to integrationZendesk
   * @param subdomain - required subdomain to pass to integrationZendesk
   * @returns IntegrationPayload
   */
  public integrationZendesk(
    code: string,
    redirectUri: string,
    scope: string,
    subdomain: string
  ): LinearFetch<IntegrationPayload> {
    return new IntegrationZendeskMutation(this._request).fetch(code, redirectUri, scope, subdomain);
  }
  /**
   * Creates new settings for one or more integrations.
   *
   * @param input - required input to pass to createIntegrationsSettings
   * @returns IntegrationsSettingsPayload
   */
  public createIntegrationsSettings(
    input: L.IntegrationsSettingsCreateInput
  ): LinearFetch<IntegrationsSettingsPayload> {
    return new CreateIntegrationsSettingsMutation(this._request).fetch(input);
  }
  /**
   * Updates settings related to integrations for a project or a team.
   *
   * @param id - required id to pass to updateIntegrationsSettings
   * @param input - required input to pass to updateIntegrationsSettings
   * @returns IntegrationsSettingsPayload
   */
  public updateIntegrationsSettings(
    id: string,
    input: L.IntegrationsSettingsUpdateInput
  ): LinearFetch<IntegrationsSettingsPayload> {
    return new UpdateIntegrationsSettingsMutation(this._request).fetch(id, input);
  }
  /**
   * Archives an issue.
   *
   * @param id - required id to pass to archiveIssue
   * @param variables - variables without 'id' to pass into the ArchiveIssueMutation
   * @returns ArchivePayload
   */
  public archiveIssue(
    id: string,
    variables?: Omit<L.ArchiveIssueMutationVariables, "id">
  ): LinearFetch<ArchivePayload> {
    return new ArchiveIssueMutation(this._request).fetch(id, variables);
  }
  /**
   * Updates multiple issues at once.
   *
   * @param ids - required ids to pass to updateIssueBatch
   * @param input - required input to pass to updateIssueBatch
   * @returns IssueBatchPayload
   */
  public updateIssueBatch(ids: L.Scalars["UUID"][], input: L.IssueUpdateInput): LinearFetch<IssueBatchPayload> {
    return new UpdateIssueBatchMutation(this._request).fetch(ids, input);
  }
  /**
   * Creates a new issue.
   *
   * @param input - required input to pass to createIssue
   * @returns IssuePayload
   */
  public createIssue(input: L.IssueCreateInput): LinearFetch<IssuePayload> {
    return new CreateIssueMutation(this._request).fetch(input);
  }
  /**
   * Deletes (trashes) an issue.
   *
   * @param id - required id to pass to deleteIssue
   * @returns ArchivePayload
   */
  public deleteIssue(id: string): LinearFetch<ArchivePayload> {
    return new DeleteIssueMutation(this._request).fetch(id);
  }
  /**
   * Kicks off an Asana import job.
   *
   * @param asanaTeamName - required asanaTeamName to pass to issueImportCreateAsana
   * @param asanaToken - required asanaToken to pass to issueImportCreateAsana
   * @param variables - variables without 'asanaTeamName', 'asanaToken' to pass into the IssueImportCreateAsanaMutation
   * @returns IssueImportPayload
   */
  public issueImportCreateAsana(
    asanaTeamName: string,
    asanaToken: string,
    variables?: Omit<L.IssueImportCreateAsanaMutationVariables, "asanaTeamName" | "asanaToken">
  ): LinearFetch<IssueImportPayload> {
    return new IssueImportCreateAsanaMutation(this._request).fetch(asanaTeamName, asanaToken, variables);
  }
  /**
   * Kicks off a Shortcut (formerly Clubhouse) import job.
   *
   * @param clubhouseTeamName - required clubhouseTeamName to pass to issueImportCreateClubhouse
   * @param clubhouseToken - required clubhouseToken to pass to issueImportCreateClubhouse
   * @param variables - variables without 'clubhouseTeamName', 'clubhouseToken' to pass into the IssueImportCreateClubhouseMutation
   * @returns IssueImportPayload
   */
  public issueImportCreateClubhouse(
    clubhouseTeamName: string,
    clubhouseToken: string,
    variables?: Omit<L.IssueImportCreateClubhouseMutationVariables, "clubhouseTeamName" | "clubhouseToken">
  ): LinearFetch<IssueImportPayload> {
    return new IssueImportCreateClubhouseMutation(this._request).fetch(clubhouseTeamName, clubhouseToken, variables);
  }
  /**
   * Kicks off a GitHub import job.
   *
   * @param githubRepoName - required githubRepoName to pass to issueImportCreateGithub
   * @param githubRepoOwner - required githubRepoOwner to pass to issueImportCreateGithub
   * @param githubToken - required githubToken to pass to issueImportCreateGithub
   * @param variables - variables without 'githubRepoName', 'githubRepoOwner', 'githubToken' to pass into the IssueImportCreateGithubMutation
   * @returns IssueImportPayload
   */
  public issueImportCreateGithub(
    githubRepoName: string,
    githubRepoOwner: string,
    githubToken: string,
    variables?: Omit<L.IssueImportCreateGithubMutationVariables, "githubRepoName" | "githubRepoOwner" | "githubToken">
  ): LinearFetch<IssueImportPayload> {
    return new IssueImportCreateGithubMutation(this._request).fetch(
      githubRepoName,
      githubRepoOwner,
      githubToken,
      variables
    );
  }
  /**
   * Kicks off a Jira import job.
   *
   * @param jiraEmail - required jiraEmail to pass to issueImportCreateJira
   * @param jiraHostname - required jiraHostname to pass to issueImportCreateJira
   * @param jiraProject - required jiraProject to pass to issueImportCreateJira
   * @param jiraToken - required jiraToken to pass to issueImportCreateJira
   * @param variables - variables without 'jiraEmail', 'jiraHostname', 'jiraProject', 'jiraToken' to pass into the IssueImportCreateJiraMutation
   * @returns IssueImportPayload
   */
  public issueImportCreateJira(
    jiraEmail: string,
    jiraHostname: string,
    jiraProject: string,
    jiraToken: string,
    variables?: Omit<
      L.IssueImportCreateJiraMutationVariables,
      "jiraEmail" | "jiraHostname" | "jiraProject" | "jiraToken"
    >
  ): LinearFetch<IssueImportPayload> {
    return new IssueImportCreateJiraMutation(this._request).fetch(
      jiraEmail,
      jiraHostname,
      jiraProject,
      jiraToken,
      variables
    );
  }
  /**
   * Deletes an import job.
   *
   * @param issueImportId - required issueImportId to pass to deleteIssueImport
   * @returns IssueImportDeletePayload
   */
  public deleteIssueImport(issueImportId: string): LinearFetch<IssueImportDeletePayload> {
    return new DeleteIssueImportMutation(this._request).fetch(issueImportId);
  }
  /**
   * Kicks off import processing.
   *
   * @param issueImportId - required issueImportId to pass to issueImportProcess
   * @param mapping - required mapping to pass to issueImportProcess
   * @returns IssueImportPayload
   */
  public issueImportProcess(issueImportId: string, mapping: Record<string, unknown>): LinearFetch<IssueImportPayload> {
    return new IssueImportProcessMutation(this._request).fetch(issueImportId, mapping);
  }
  /**
   * Updates the mapping for the issue import.
   *
   * @param id - required id to pass to updateIssueImport
   * @param input - required input to pass to updateIssueImport
   * @returns IssueImportPayload
   */
  public updateIssueImport(id: string, input: L.IssueImportUpdateInput): LinearFetch<IssueImportPayload> {
    return new UpdateIssueImportMutation(this._request).fetch(id, input);
  }
  /**
   * Deletes an issue label.
   *
   * @param id - required id to pass to archiveIssueLabel
   * @returns ArchivePayload
   */
  public archiveIssueLabel(id: string): LinearFetch<ArchivePayload> {
    return new ArchiveIssueLabelMutation(this._request).fetch(id);
  }
  /**
   * Creates a new label.
   *
   * @param input - required input to pass to createIssueLabel
   * @param variables - variables without 'input' to pass into the CreateIssueLabelMutation
   * @returns IssueLabelPayload
   */
  public createIssueLabel(
    input: L.IssueLabelCreateInput,
    variables?: Omit<L.CreateIssueLabelMutationVariables, "input">
  ): LinearFetch<IssueLabelPayload> {
    return new CreateIssueLabelMutation(this._request).fetch(input, variables);
  }
  /**
   * Deletes an issue label.
   *
   * @param id - required id to pass to deleteIssueLabel
   * @returns ArchivePayload
   */
  public deleteIssueLabel(id: string): LinearFetch<ArchivePayload> {
    return new DeleteIssueLabelMutation(this._request).fetch(id);
  }
  /**
   * Updates an label.
   *
   * @param id - required id to pass to updateIssueLabel
   * @param input - required input to pass to updateIssueLabel
   * @returns IssueLabelPayload
   */
  public updateIssueLabel(id: string, input: L.IssueLabelUpdateInput): LinearFetch<IssueLabelPayload> {
    return new UpdateIssueLabelMutation(this._request).fetch(id, input);
  }
  /**
   * Creates a new issue relation.
   *
   * @param input - required input to pass to createIssueRelation
   * @returns IssueRelationPayload
   */
  public createIssueRelation(input: L.IssueRelationCreateInput): LinearFetch<IssueRelationPayload> {
    return new CreateIssueRelationMutation(this._request).fetch(input);
  }
  /**
   * Deletes an issue relation.
   *
   * @param id - required id to pass to deleteIssueRelation
   * @returns ArchivePayload
   */
  public deleteIssueRelation(id: string): LinearFetch<ArchivePayload> {
    return new DeleteIssueRelationMutation(this._request).fetch(id);
  }
  /**
   * Updates an issue relation.
   *
   * @param id - required id to pass to updateIssueRelation
   * @param input - required input to pass to updateIssueRelation
   * @returns IssueRelationPayload
   */
  public updateIssueRelation(id: string, input: L.IssueRelationUpdateInput): LinearFetch<IssueRelationPayload> {
    return new UpdateIssueRelationMutation(this._request).fetch(id, input);
  }
  /**
   * Adds an issue reminder. Will cause a notification to be sent when the issue reminder time is reached.
   *
   * @param id - required id to pass to issueReminder
   * @param reminderAt - required reminderAt to pass to issueReminder
   * @returns IssuePayload
   */
  public issueReminder(id: string, reminderAt: Date): LinearFetch<IssuePayload> {
    return new IssueReminderMutation(this._request).fetch(id, reminderAt);
  }
  /**
   * Unarchives an issue.
   *
   * @param id - required id to pass to unarchiveIssue
   * @returns ArchivePayload
   */
  public unarchiveIssue(id: string): LinearFetch<ArchivePayload> {
    return new UnarchiveIssueMutation(this._request).fetch(id);
  }
  /**
   * Updates an issue.
   *
   * @param id - required id to pass to updateIssue
   * @param input - required input to pass to updateIssue
   * @returns IssuePayload
   */
  public updateIssue(id: string, input: L.IssueUpdateInput): LinearFetch<IssuePayload> {
    return new UpdateIssueMutation(this._request).fetch(id, input);
  }
  /**
   * Join an organization from onboarding.
   *
   * @param input - required input to pass to joinOrganizationFromOnboarding
   * @returns CreateOrJoinOrganizationResponse
   */
  public joinOrganizationFromOnboarding(input: L.JoinOrganizationInput): LinearFetch<CreateOrJoinOrganizationResponse> {
    return new JoinOrganizationFromOnboardingMutation(this._request).fetch(input);
  }
  /**
   * Leave an organization.
   *
   * @param organizationId - required organizationId to pass to leaveOrganization
   * @returns CreateOrJoinOrganizationResponse
   */
  public leaveOrganization(organizationId: string): LinearFetch<CreateOrJoinOrganizationResponse> {
    return new LeaveOrganizationMutation(this._request).fetch(organizationId);
  }
  /**
   * Logout of all clients.
   *
   * @returns LogoutResponse
   */
  public get logout(): LinearFetch<LogoutResponse> {
    return new LogoutMutation(this._request).fetch();
  }
  /**
   * Archives a notification.
   *
   * @param id - required id to pass to archiveNotification
   * @returns ArchivePayload
   */
  public archiveNotification(id: string): LinearFetch<ArchivePayload> {
    return new ArchiveNotificationMutation(this._request).fetch(id);
  }
  /**
   * Creates a new notification subscription for a team or a project.
   *
   * @param input - required input to pass to createNotificationSubscription
   * @returns NotificationSubscriptionPayload
   */
  public createNotificationSubscription(
    input: L.NotificationSubscriptionCreateInput
  ): LinearFetch<NotificationSubscriptionPayload> {
    return new CreateNotificationSubscriptionMutation(this._request).fetch(input);
  }
  /**
   * Deletes a notification subscription reference.
   *
   * @param id - required id to pass to deleteNotificationSubscription
   * @returns ArchivePayload
   */
  public deleteNotificationSubscription(id: string): LinearFetch<ArchivePayload> {
    return new DeleteNotificationSubscriptionMutation(this._request).fetch(id);
  }
  /**
   * Updates a notification subscription.
   *
   * @param id - required id to pass to updateNotificationSubscription
   * @param input - required input to pass to updateNotificationSubscription
   * @returns NotificationSubscriptionPayload
   */
  public updateNotificationSubscription(
    id: string,
    input: L.NotificationSubscriptionUpdateInput
  ): LinearFetch<NotificationSubscriptionPayload> {
    return new UpdateNotificationSubscriptionMutation(this._request).fetch(id, input);
  }
  /**
   * Unarchives a notification.
   *
   * @param id - required id to pass to unarchiveNotification
   * @returns ArchivePayload
   */
  public unarchiveNotification(id: string): LinearFetch<ArchivePayload> {
    return new UnarchiveNotificationMutation(this._request).fetch(id);
  }
  /**
   * Updates a notification.
   *
   * @param id - required id to pass to updateNotification
   * @param input - required input to pass to updateNotification
   * @returns NotificationPayload
   */
  public updateNotification(id: string, input: L.NotificationUpdateInput): LinearFetch<NotificationPayload> {
    return new UpdateNotificationMutation(this._request).fetch(id, input);
  }
  /**
   * Cancels the deletion of an organization. Administrator privileges required.
   *
   * @returns OrganizationCancelDeletePayload
   */
  public get deleteOrganizationCancel(): LinearFetch<OrganizationCancelDeletePayload> {
    return new DeleteOrganizationCancelMutation(this._request).fetch();
  }
  /**
   * Delete's an organization. Administrator privileges required.
   *
   * @param input - required input to pass to deleteOrganization
   * @returns OrganizationDeletePayload
   */
  public deleteOrganization(input: L.DeleteOrganizationInput): LinearFetch<OrganizationDeletePayload> {
    return new DeleteOrganizationMutation(this._request).fetch(input);
  }
  /**
   * Get an organization's delete confirmation token. Administrator privileges required.
   *
   * @returns OrganizationDeletePayload
   */
  public get organizationDeleteChallenge(): LinearFetch<OrganizationDeletePayload> {
    return new OrganizationDeleteChallengeMutation(this._request).fetch();
  }
  /**
   * Deletes a domain.
   *
   * @param id - required id to pass to deleteOrganizationDomain
   * @returns ArchivePayload
   */
  public deleteOrganizationDomain(id: string): LinearFetch<ArchivePayload> {
    return new DeleteOrganizationDomainMutation(this._request).fetch(id);
  }
  /**
   * Creates a new organization invite.
   *
   * @param input - required input to pass to createOrganizationInvite
   * @returns OrganizationInvitePayload
   */
  public createOrganizationInvite(input: L.OrganizationInviteCreateInput): LinearFetch<OrganizationInvitePayload> {
    return new CreateOrganizationInviteMutation(this._request).fetch(input);
  }
  /**
   * Deletes an organization invite.
   *
   * @param id - required id to pass to deleteOrganizationInvite
   * @returns ArchivePayload
   */
  public deleteOrganizationInvite(id: string): LinearFetch<ArchivePayload> {
    return new DeleteOrganizationInviteMutation(this._request).fetch(id);
  }
  /**
   * Updates an organization invite.
   *
   * @param id - required id to pass to updateOrganizationInvite
   * @param input - required input to pass to updateOrganizationInvite
   * @returns OrganizationInvitePayload
   */
  public updateOrganizationInvite(
    id: string,
    input: L.OrganizationInviteUpdateInput
  ): LinearFetch<OrganizationInvitePayload> {
    return new UpdateOrganizationInviteMutation(this._request).fetch(id, input);
  }
  /**
   * Updates the user's organization.
   *
   * @param input - required input to pass to updateOrganization
   * @returns OrganizationPayload
   */
  public updateOrganization(input: L.UpdateOrganizationInput): LinearFetch<OrganizationPayload> {
    return new UpdateOrganizationMutation(this._request).fetch(input);
  }
  /**
   * Archives a project.
   *
   * @param id - required id to pass to archiveProject
   * @returns ArchivePayload
   */
  public archiveProject(id: string): LinearFetch<ArchivePayload> {
    return new ArchiveProjectMutation(this._request).fetch(id);
  }
  /**
   * Creates a new project.
   *
   * @param input - required input to pass to createProject
   * @returns ProjectPayload
   */
  public createProject(input: L.ProjectCreateInput): LinearFetch<ProjectPayload> {
    return new CreateProjectMutation(this._request).fetch(input);
  }
  /**
   * Deletes a project. All issues will be disassociated from the deleted project.
   *
   * @param id - required id to pass to deleteProject
   * @returns ArchivePayload
   */
  public deleteProject(id: string): LinearFetch<ArchivePayload> {
    return new DeleteProjectMutation(this._request).fetch(id);
  }
  /**
   * Creates a new project link.
   *
   * @param input - required input to pass to createProjectLink
   * @returns ProjectLinkPayload
   */
  public createProjectLink(input: L.ProjectLinkCreateInput): LinearFetch<ProjectLinkPayload> {
    return new CreateProjectLinkMutation(this._request).fetch(input);
  }
  /**
   * Deletes a project link.
   *
   * @param id - required id to pass to deleteProjectLink
   * @returns ArchivePayload
   */
  public deleteProjectLink(id: string): LinearFetch<ArchivePayload> {
    return new DeleteProjectLinkMutation(this._request).fetch(id);
  }
  /**
   * Updates a project link.
   *
   * @param id - required id to pass to updateProjectLink
   * @param input - required input to pass to updateProjectLink
   * @returns ProjectLinkPayload
   */
  public updateProjectLink(id: string, input: L.ProjectLinkUpdateInput): LinearFetch<ProjectLinkPayload> {
    return new UpdateProjectLinkMutation(this._request).fetch(id, input);
  }
  /**
   * Creates a new project milestone.
   *
   * @param input - required input to pass to createProjectMilestone
   * @returns ProjectMilestonePayload
   */
  public createProjectMilestone(input: L.ProjectMilestoneCreateInput): LinearFetch<ProjectMilestonePayload> {
    return new CreateProjectMilestoneMutation(this._request).fetch(input);
  }
  /**
   * Deletes a project milestone.
   *
   * @param id - required id to pass to deleteProjectMilestone
   * @returns ArchivePayload
   */
  public deleteProjectMilestone(id: string): LinearFetch<ArchivePayload> {
    return new DeleteProjectMilestoneMutation(this._request).fetch(id);
  }
  /**
   * Updates a project milestone.
   *
   * @param id - required id to pass to updateProjectMilestone
   * @param input - required input to pass to updateProjectMilestone
   * @returns ProjectMilestonePayload
   */
  public updateProjectMilestone(
    id: string,
    input: L.ProjectMilestoneUpdateInput
  ): LinearFetch<ProjectMilestonePayload> {
    return new UpdateProjectMilestoneMutation(this._request).fetch(id, input);
  }
  /**
   * Unarchives a project.
   *
   * @param id - required id to pass to unarchiveProject
   * @returns ArchivePayload
   */
  public unarchiveProject(id: string): LinearFetch<ArchivePayload> {
    return new UnarchiveProjectMutation(this._request).fetch(id);
  }
  /**
   * Updates a project.
   *
   * @param id - required id to pass to updateProject
   * @param input - required input to pass to updateProject
   * @returns ProjectPayload
   */
  public updateProject(id: string, input: L.ProjectUpdateInput): LinearFetch<ProjectPayload> {
    return new UpdateProjectMutation(this._request).fetch(id, input);
  }
  /**
   * Creates a new project update.
   *
   * @param input - required input to pass to createProjectUpdate
   * @returns ProjectUpdatePayload
   */
  public createProjectUpdate(input: L.ProjectUpdateCreateInput): LinearFetch<ProjectUpdatePayload> {
    return new CreateProjectUpdateMutation(this._request).fetch(input);
  }
  /**
   * Deletes a project update.
   *
   * @param id - required id to pass to deleteProjectUpdate
   * @returns ArchivePayload
   */
  public deleteProjectUpdate(id: string): LinearFetch<ArchivePayload> {
    return new DeleteProjectUpdateMutation(this._request).fetch(id);
  }
  /**
   * Creates a new interaction on a project update.
   *
   * @param input - required input to pass to createProjectUpdateInteraction
   * @returns ProjectUpdateInteractionPayload
   */
  public createProjectUpdateInteraction(
    input: L.ProjectUpdateInteractionCreateInput
  ): LinearFetch<ProjectUpdateInteractionPayload> {
    return new CreateProjectUpdateInteractionMutation(this._request).fetch(input);
  }
  /**
   * Mark a project update as read.
   *
   * @param id - required id to pass to projectUpdateMarkAsRead
   * @returns ProjectUpdateWithInteractionPayload
   */
  public projectUpdateMarkAsRead(id: string): LinearFetch<ProjectUpdateWithInteractionPayload> {
    return new ProjectUpdateMarkAsReadMutation(this._request).fetch(id);
  }
  /**
   * Updates a project update.
   *
   * @param id - required id to pass to updateProjectUpdate
   * @param input - required input to pass to updateProjectUpdate
   * @returns ProjectUpdatePayload
   */
  public updateProjectUpdate(id: string, input: L.ProjectUpdateUpdateInput): LinearFetch<ProjectUpdatePayload> {
    return new UpdateProjectUpdateMutation(this._request).fetch(id, input);
  }
  /**
   * Creates a push subscription.
   *
   * @param input - required input to pass to createPushSubscription
   * @returns PushSubscriptionPayload
   */
  public createPushSubscription(input: L.PushSubscriptionCreateInput): LinearFetch<PushSubscriptionPayload> {
    return new CreatePushSubscriptionMutation(this._request).fetch(input);
  }
  /**
   * Deletes a push subscription.
   *
   * @param id - required id to pass to deletePushSubscription
   * @returns PushSubscriptionPayload
   */
  public deletePushSubscription(id: string): LinearFetch<PushSubscriptionPayload> {
    return new DeletePushSubscriptionMutation(this._request).fetch(id);
  }
  /**
   * Creates a new reaction.
   *
   * @param input - required input to pass to createReaction
   * @returns ReactionPayload
   */
  public createReaction(input: L.ReactionCreateInput): LinearFetch<ReactionPayload> {
    return new CreateReactionMutation(this._request).fetch(input);
  }
  /**
   * Deletes a reaction.
   *
   * @param id - required id to pass to deleteReaction
   * @returns ArchivePayload
   */
  public deleteReaction(id: string): LinearFetch<ArchivePayload> {
    return new DeleteReactionMutation(this._request).fetch(id);
  }
  /**
   * Manually update Google Sheets data.
   *
   * @param id - required id to pass to refreshGoogleSheetsData
   * @returns IntegrationPayload
   */
  public refreshGoogleSheetsData(id: string): LinearFetch<IntegrationPayload> {
    return new RefreshGoogleSheetsDataMutation(this._request).fetch(id);
  }
  /**
   * Re-send an organization invite.
   *
   * @param id - required id to pass to resendOrganizationInvite
   * @returns ArchivePayload
   */
  public resendOrganizationInvite(id: string): LinearFetch<ArchivePayload> {
    return new ResendOrganizationInviteMutation(this._request).fetch(id);
  }
  /**
   * Creates a new roadmap.
   *
   * @param input - required input to pass to createRoadmap
   * @returns RoadmapPayload
   */
  public createRoadmap(input: L.RoadmapCreateInput): LinearFetch<RoadmapPayload> {
    return new CreateRoadmapMutation(this._request).fetch(input);
  }
  /**
   * Deletes a roadmap.
   *
   * @param id - required id to pass to deleteRoadmap
   * @returns ArchivePayload
   */
  public deleteRoadmap(id: string): LinearFetch<ArchivePayload> {
    return new DeleteRoadmapMutation(this._request).fetch(id);
  }
  /**
   * Creates a new roadmapToProject join.
   *
   * @param input - required input to pass to createRoadmapToProject
   * @returns RoadmapToProjectPayload
   */
  public createRoadmapToProject(input: L.RoadmapToProjectCreateInput): LinearFetch<RoadmapToProjectPayload> {
    return new CreateRoadmapToProjectMutation(this._request).fetch(input);
  }
  /**
   * Deletes a roadmapToProject.
   *
   * @param id - required id to pass to deleteRoadmapToProject
   * @returns ArchivePayload
   */
  public deleteRoadmapToProject(id: string): LinearFetch<ArchivePayload> {
    return new DeleteRoadmapToProjectMutation(this._request).fetch(id);
  }
  /**
   * Updates a roadmapToProject.
   *
   * @param id - required id to pass to updateRoadmapToProject
   * @param input - required input to pass to updateRoadmapToProject
   * @returns RoadmapToProjectPayload
   */
  public updateRoadmapToProject(
    id: string,
    input: L.RoadmapToProjectUpdateInput
  ): LinearFetch<RoadmapToProjectPayload> {
    return new UpdateRoadmapToProjectMutation(this._request).fetch(id, input);
  }
  /**
   * Updates a roadmap.
   *
   * @param id - required id to pass to updateRoadmap
   * @param input - required input to pass to updateRoadmap
   * @returns RoadmapPayload
   */
  public updateRoadmap(id: string, input: L.RoadmapUpdateInput): LinearFetch<RoadmapPayload> {
    return new UpdateRoadmapMutation(this._request).fetch(id, input);
  }
  /**
   * Authenticates a user account via email and authentication token for SAML.
   *
   * @param input - required input to pass to samlTokenUserAccountAuth
   * @returns AuthResolverResponse
   */
  public samlTokenUserAccountAuth(input: L.TokenUserAccountAuthInput): LinearFetch<AuthResolverResponse> {
    return new SamlTokenUserAccountAuthMutation(this._request).fetch(input);
  }
  /**
   * Creates a new team. The user who creates the team will automatically be added as a member to the newly created team.
   *
   * @param input - required input to pass to createTeam
   * @param variables - variables without 'input' to pass into the CreateTeamMutation
   * @returns TeamPayload
   */
  public createTeam(
    input: L.TeamCreateInput,
    variables?: Omit<L.CreateTeamMutationVariables, "input">
  ): LinearFetch<TeamPayload> {
    return new CreateTeamMutation(this._request).fetch(input, variables);
  }
  /**
   * Deletes team's cycles data
   *
   * @param id - required id to pass to deleteTeamCycles
   * @returns TeamPayload
   */
  public deleteTeamCycles(id: string): LinearFetch<TeamPayload> {
    return new DeleteTeamCyclesMutation(this._request).fetch(id);
  }
  /**
   * Deletes a team.
   *
   * @param id - required id to pass to deleteTeam
   * @returns ArchivePayload
   */
  public deleteTeam(id: string): LinearFetch<ArchivePayload> {
    return new DeleteTeamMutation(this._request).fetch(id);
  }
  /**
   * Deletes a previously used team key.
   *
   * @param id - required id to pass to deleteTeamKey
   * @returns ArchivePayload
   */
  public deleteTeamKey(id: string): LinearFetch<ArchivePayload> {
    return new DeleteTeamKeyMutation(this._request).fetch(id);
  }
  /**
   * Creates a new team membership.
   *
   * @param input - required input to pass to createTeamMembership
   * @returns TeamMembershipPayload
   */
  public createTeamMembership(input: L.TeamMembershipCreateInput): LinearFetch<TeamMembershipPayload> {
    return new CreateTeamMembershipMutation(this._request).fetch(input);
  }
  /**
   * Deletes a team membership.
   *
   * @param id - required id to pass to deleteTeamMembership
   * @returns ArchivePayload
   */
  public deleteTeamMembership(id: string): LinearFetch<ArchivePayload> {
    return new DeleteTeamMembershipMutation(this._request).fetch(id);
  }
  /**
   * Updates a team membership.
   *
   * @param id - required id to pass to updateTeamMembership
   * @param input - required input to pass to updateTeamMembership
   * @returns TeamMembershipPayload
   */
  public updateTeamMembership(id: string, input: L.TeamMembershipUpdateInput): LinearFetch<TeamMembershipPayload> {
    return new UpdateTeamMembershipMutation(this._request).fetch(id, input);
  }
  /**
   * Updates a team.
   *
   * @param id - required id to pass to updateTeam
   * @param input - required input to pass to updateTeam
   * @returns TeamPayload
   */
  public updateTeam(id: string, input: L.TeamUpdateInput): LinearFetch<TeamPayload> {
    return new UpdateTeamMutation(this._request).fetch(id, input);
  }
  /**
   * Creates a new template.
   *
   * @param input - required input to pass to createTemplate
   * @returns TemplatePayload
   */
  public createTemplate(input: L.TemplateCreateInput): LinearFetch<TemplatePayload> {
    return new CreateTemplateMutation(this._request).fetch(input);
  }
  /**
   * Deletes a template.
   *
   * @param id - required id to pass to deleteTemplate
   * @returns ArchivePayload
   */
  public deleteTemplate(id: string): LinearFetch<ArchivePayload> {
    return new DeleteTemplateMutation(this._request).fetch(id);
  }
  /**
   * Updates an existing template.
   *
   * @param id - required id to pass to updateTemplate
   * @param input - required input to pass to updateTemplate
   * @returns TemplatePayload
   */
  public updateTemplate(id: string, input: L.TemplateUpdateInput): LinearFetch<TemplatePayload> {
    return new UpdateTemplateMutation(this._request).fetch(id, input);
  }
  /**
   * Makes user a regular user. Can only be called by an admin.
   *
   * @param id - required id to pass to userDemoteAdmin
   * @returns UserAdminPayload
   */
  public userDemoteAdmin(id: string): LinearFetch<UserAdminPayload> {
    return new UserDemoteAdminMutation(this._request).fetch(id);
  }
  /**
   * Makes user a guest. Can only be called by an admin.
   *
   * @param id - required id to pass to userDemoteMember
   * @returns UserAdminPayload
   */
  public userDemoteMember(id: string): LinearFetch<UserAdminPayload> {
    return new UserDemoteMemberMutation(this._request).fetch(id);
  }
  /**
   * Connects the Discord user to this Linear account via OAuth2.
   *
   * @param code - required code to pass to userDiscordConnect
   * @param redirectUri - required redirectUri to pass to userDiscordConnect
   * @returns UserPayload
   */
  public userDiscordConnect(code: string, redirectUri: string): LinearFetch<UserPayload> {
    return new UserDiscordConnectMutation(this._request).fetch(code, redirectUri);
  }
  /**
   * Disconnects the external user from this Linear account.
   *
   * @param service - required service to pass to userExternalUserDisconnect
   * @returns UserPayload
   */
  public userExternalUserDisconnect(service: string): LinearFetch<UserPayload> {
    return new UserExternalUserDisconnectMutation(this._request).fetch(service);
  }
  /**
   * Updates a user's settings flag.
   *
   * @param flag - required flag to pass to updateUserFlag
   * @param operation - required operation to pass to updateUserFlag
   * @returns UserSettingsFlagPayload
   */
  public updateUserFlag(
    flag: L.UserFlagType,
    operation: L.UserFlagUpdateOperation
  ): LinearFetch<UserSettingsFlagPayload> {
    return new UpdateUserFlagMutation(this._request).fetch(flag, operation);
  }
  /**
   * Connects the GitHub user to this Linear account via OAuth2.
   *
   * @param code - required code to pass to userGitHubConnect
   * @returns UserPayload
   */
  public userGitHubConnect(code: string): LinearFetch<UserPayload> {
    return new UserGitHubConnectMutation(this._request).fetch(code);
  }
  /**
   * Connects the Google Calendar to the user to this Linear account via OAuth2.
   *
   * @param code - required code to pass to userGoogleCalendarConnect
   * @returns UserPayload
   */
  public userGoogleCalendarConnect(code: string): LinearFetch<UserPayload> {
    return new UserGoogleCalendarConnectMutation(this._request).fetch(code);
  }
  /**
   * Makes user an admin. Can only be called by an admin.
   *
   * @param id - required id to pass to userPromoteAdmin
   * @returns UserAdminPayload
   */
  public userPromoteAdmin(id: string): LinearFetch<UserAdminPayload> {
    return new UserPromoteAdminMutation(this._request).fetch(id);
  }
  /**
   * Makes user a regular user. Can only be called by an admin.
   *
   * @param id - required id to pass to userPromoteMember
   * @returns UserAdminPayload
   */
  public userPromoteMember(id: string): LinearFetch<UserAdminPayload> {
    return new UserPromoteMemberMutation(this._request).fetch(id);
  }
  /**
   * [Deprecated] Updates a user's settings flag.
   *
   * @param flag - required flag to pass to userSettingsFlagIncrement
   * @returns UserSettingsFlagPayload
   */
  public userSettingsFlagIncrement(flag: string): LinearFetch<UserSettingsFlagPayload> {
    return new UserSettingsFlagIncrementMutation(this._request).fetch(flag);
  }
  /**
   * Resets user's setting flags.
   *
   * @param variables - variables to pass into the UserSettingsFlagsResetMutation
   * @returns UserSettingsFlagsResetPayload
   */
  public userSettingsFlagsReset(
    variables?: L.UserSettingsFlagsResetMutationVariables
  ): LinearFetch<UserSettingsFlagsResetPayload> {
    return new UserSettingsFlagsResetMutation(this._request).fetch(variables);
  }
  /**
   * Updates the user's settings.
   *
   * @param id - required id to pass to updateUserSettings
   * @param input - required input to pass to updateUserSettings
   * @returns UserSettingsPayload
   */
  public updateUserSettings(id: string, input: L.UserSettingsUpdateInput): LinearFetch<UserSettingsPayload> {
    return new UpdateUserSettingsMutation(this._request).fetch(id, input);
  }
  /**
   * Suspends a user. Can only be called by an admin.
   *
   * @param id - required id to pass to suspendUser
   * @returns UserAdminPayload
   */
  public suspendUser(id: string): LinearFetch<UserAdminPayload> {
    return new SuspendUserMutation(this._request).fetch(id);
  }
  /**
   * Un-suspends a user. Can only be called by an admin.
   *
   * @param id - required id to pass to unsuspendUser
   * @returns UserAdminPayload
   */
  public unsuspendUser(id: string): LinearFetch<UserAdminPayload> {
    return new UnsuspendUserMutation(this._request).fetch(id);
  }
  /**
   * Updates a user. Only available to organization admins and the user themselves.
   *
   * @param id - required id to pass to updateUser
   * @param input - required input to pass to updateUser
   * @returns UserPayload
   */
  public updateUser(id: string, input: L.UpdateUserInput): LinearFetch<UserPayload> {
    return new UpdateUserMutation(this._request).fetch(id, input);
  }
  /**
   * Creates a new ViewPreferences object.
   *
   * @param input - required input to pass to createViewPreferences
   * @returns ViewPreferencesPayload
   */
  public createViewPreferences(input: L.ViewPreferencesCreateInput): LinearFetch<ViewPreferencesPayload> {
    return new CreateViewPreferencesMutation(this._request).fetch(input);
  }
  /**
   * Deletes a ViewPreferences.
   *
   * @param id - required id to pass to deleteViewPreferences
   * @returns ArchivePayload
   */
  public deleteViewPreferences(id: string): LinearFetch<ArchivePayload> {
    return new DeleteViewPreferencesMutation(this._request).fetch(id);
  }
  /**
   * Updates an existing ViewPreferences object.
   *
   * @param id - required id to pass to updateViewPreferences
   * @param input - required input to pass to updateViewPreferences
   * @returns ViewPreferencesPayload
   */
  public updateViewPreferences(id: string, input: L.ViewPreferencesUpdateInput): LinearFetch<ViewPreferencesPayload> {
    return new UpdateViewPreferencesMutation(this._request).fetch(id, input);
  }
  /**
   * Creates a new webhook.
   *
   * @param input - required input to pass to createWebhook
   * @returns WebhookPayload
   */
  public createWebhook(input: L.WebhookCreateInput): LinearFetch<WebhookPayload> {
    return new CreateWebhookMutation(this._request).fetch(input);
  }
  /**
   * Deletes a Webhook.
   *
   * @param id - required id to pass to deleteWebhook
   * @returns ArchivePayload
   */
  public deleteWebhook(id: string): LinearFetch<ArchivePayload> {
    return new DeleteWebhookMutation(this._request).fetch(id);
  }
  /**
   * Updates an existing Webhook.
   *
   * @param id - required id to pass to updateWebhook
   * @param input - required input to pass to updateWebhook
   * @returns WebhookPayload
   */
  public updateWebhook(id: string, input: L.WebhookUpdateInput): LinearFetch<WebhookPayload> {
    return new UpdateWebhookMutation(this._request).fetch(id, input);
  }
  /**
   * Archives a state. Only states with issues that have all been archived can be archived.
   *
   * @param id - required id to pass to archiveWorkflowState
   * @returns ArchivePayload
   */
  public archiveWorkflowState(id: string): LinearFetch<ArchivePayload> {
    return new ArchiveWorkflowStateMutation(this._request).fetch(id);
  }
  /**
   * Creates a new state, adding it to the workflow of a team.
   *
   * @param input - required input to pass to createWorkflowState
   * @returns WorkflowStatePayload
   */
  public createWorkflowState(input: L.WorkflowStateCreateInput): LinearFetch<WorkflowStatePayload> {
    return new CreateWorkflowStateMutation(this._request).fetch(input);
  }
  /**
   * Updates a state.
   *
   * @param id - required id to pass to updateWorkflowState
   * @param input - required input to pass to updateWorkflowState
   * @returns WorkflowStatePayload
   */
  public updateWorkflowState(id: string, input: L.WorkflowStateUpdateInput): LinearFetch<WorkflowStatePayload> {
    return new UpdateWorkflowStateMutation(this._request).fetch(id, input);
  }
  /**
   * One specific project milestone.
   *
   * @param id - required id to pass to ProjectMilestone
   * @returns ProjectMilestone
   */
  public ProjectMilestone(id: string): LinearFetch<ProjectMilestone> {
    return new ProjectMilestoneQuery(this._request).fetch(id);
  }
  /**
   * All milestones for the project.
   *
   * @param variables - variables to pass into the ProjectMilestonesQuery
   * @returns ProjectMilestoneConnection
   */
  public ProjectMilestones(variables?: L.ProjectMilestonesQueryVariables): LinearFetch<ProjectMilestoneConnection> {
    return new ProjectMilestonesQuery(this._request).fetch(variables);
  }
  /**
   * All teams you the user can administrate. Administrable teams are teams whose settings the user can change, but to whose issues the user doesn't necessarily have access to.
   *
   * @param variables - variables to pass into the AdministrableTeamsQuery
   * @returns TeamConnection
   */
  public administrableTeams(variables?: L.AdministrableTeamsQueryVariables): LinearFetch<TeamConnection> {
    return new AdministrableTeamsQuery(this._request).fetch(variables);
  }
  /**
   * All API keys for the user.
   *
   * @param variables - variables to pass into the ApiKeysQuery
   * @returns ApiKeyConnection
   */
  public apiKeys(variables?: L.ApiKeysQueryVariables): LinearFetch<ApiKeyConnection> {
    return new ApiKeysQuery(this._request).fetch(variables);
  }
  /**
   * Get basic information for an application.
   *
   * @param clientId - required clientId to pass to applicationInfo
   * @returns Application
   */
  public applicationInfo(clientId: string): LinearFetch<Application> {
    return new ApplicationInfoQuery(this._request).fetch(clientId);
  }
  /**
   * Get information for an application and whether a user has approved it for the given scopes.
   *
   * @param clientId - required clientId to pass to applicationWithAuthorization
   * @param scope - required scope to pass to applicationWithAuthorization
   * @param variables - variables without 'clientId', 'scope' to pass into the ApplicationWithAuthorizationQuery
   * @returns UserAuthorizedApplication
   */
  public applicationWithAuthorization(
    clientId: string,
    scope: string[],
    variables?: Omit<L.ApplicationWithAuthorizationQueryVariables, "clientId" | "scope">
  ): LinearFetch<UserAuthorizedApplication> {
    return new ApplicationWithAuthorizationQuery(this._request).fetch(clientId, scope, variables);
  }
  /**
   * One specific issue attachment.
   * [Deprecated] 'url' can no longer be used as the 'id' parameter. Use 'attachmentsForUrl' instead
   *
   * @param id - required id to pass to attachment
   * @returns Attachment
   */
  public attachment(id: string): LinearFetch<Attachment> {
    return new AttachmentQuery(this._request).fetch(id);
  }
  /**
   * Query an issue by its associated attachment, and its id.
   *
   * @param id - required id to pass to attachmentIssue
   * @returns Issue
   */
  public attachmentIssue(id: string): LinearFetch<Issue> {
    return new AttachmentIssueQuery(this._request).fetch(id);
  }
  /**
   * All issue attachments.
   *
   * To get attachments for a given URL, use `attachmentsForURL` query.
   *
   * @param variables - variables to pass into the AttachmentsQuery
   * @returns AttachmentConnection
   */
  public attachments(variables?: L.AttachmentsQueryVariables): LinearFetch<AttachmentConnection> {
    return new AttachmentsQuery(this._request).fetch(variables);
  }
  /**
   * Returns issue attachments for a given `url`.
   *
   * @param url - required url to pass to attachmentsForURL
   * @param variables - variables without 'url' to pass into the AttachmentsForUrlQuery
   * @returns AttachmentConnection
   */
  public attachmentsForURL(
    url: string,
    variables?: Omit<L.AttachmentsForUrlQueryVariables, "url">
  ): LinearFetch<AttachmentConnection> {
    return new AttachmentsForUrlQuery(this._request).fetch(url, variables);
  }
  /**
   * All audit log entries.
   *
   * @param variables - variables to pass into the AuditEntriesQuery
   * @returns AuditEntryConnection
   */
  public auditEntries(variables?: L.AuditEntriesQueryVariables): LinearFetch<AuditEntryConnection> {
    return new AuditEntriesQuery(this._request).fetch(variables);
  }
  /**
   * List of audit entry types.
   *
   * @returns AuditEntryType[]
   */
  public get auditEntryTypes(): LinearFetch<AuditEntryType[]> {
    return new AuditEntryTypesQuery(this._request).fetch();
  }
  /**
   * Fetch users belonging to this user account.
   *
   * @returns AuthResolverResponse
   */
  public get availableUsers(): LinearFetch<AuthResolverResponse> {
    return new AvailableUsersQuery(this._request).fetch();
  }
  /**
   * A specific comment.
   *
   * @param id - required id to pass to comment
   * @returns Comment
   */
  public comment(id: string): LinearFetch<Comment> {
    return new CommentQuery(this._request).fetch(id);
  }
  /**
   * All comments.
   *
   * @param variables - variables to pass into the CommentsQuery
   * @returns CommentConnection
   */
  public comments(variables?: L.CommentsQueryVariables): LinearFetch<CommentConnection> {
    return new CommentsQuery(this._request).fetch(variables);
  }
  /**
   * One specific custom view.
   *
   * @param id - required id to pass to customView
   * @returns CustomView
   */
  public customView(id: string): LinearFetch<CustomView> {
    return new CustomViewQuery(this._request).fetch(id);
  }
  /**
   * Custom views for the user.
   *
   * @param variables - variables to pass into the CustomViewsQuery
   * @returns CustomViewConnection
   */
  public customViews(variables?: L.CustomViewsQueryVariables): LinearFetch<CustomViewConnection> {
    return new CustomViewsQuery(this._request).fetch(variables);
  }
  /**
   * One specific cycle.
   *
   * @param id - required id to pass to cycle
   * @returns Cycle
   */
  public cycle(id: string): LinearFetch<Cycle> {
    return new CycleQuery(this._request).fetch(id);
  }
  /**
   * All cycles.
   *
   * @param variables - variables to pass into the CyclesQuery
   * @returns CycleConnection
   */
  public cycles(variables?: L.CyclesQueryVariables): LinearFetch<CycleConnection> {
    return new CyclesQuery(this._request).fetch(variables);
  }
  /**
   * One specific document.
   *
   * @param id - required id to pass to document
   * @returns Document
   */
  public document(id: string): LinearFetch<Document> {
    return new DocumentQuery(this._request).fetch(id);
  }
  /**
   * All documents for the project.
   *
   * @param variables - variables to pass into the DocumentsQuery
   * @returns DocumentConnection
   */
  public documents(variables?: L.DocumentsQueryVariables): LinearFetch<DocumentConnection> {
    return new DocumentsQuery(this._request).fetch(variables);
  }
  /**
   * A specific emoji.
   *
   * @param id - required id to pass to emoji
   * @returns Emoji
   */
  public emoji(id: string): LinearFetch<Emoji> {
    return new EmojiQuery(this._request).fetch(id);
  }
  /**
   * All custom emojis.
   *
   * @param variables - variables to pass into the EmojisQuery
   * @returns EmojiConnection
   */
  public emojis(variables?: L.EmojisQueryVariables): LinearFetch<EmojiConnection> {
    return new EmojisQuery(this._request).fetch(variables);
  }
  /**
   * One specific favorite.
   *
   * @param id - required id to pass to favorite
   * @returns Favorite
   */
  public favorite(id: string): LinearFetch<Favorite> {
    return new FavoriteQuery(this._request).fetch(id);
  }
  /**
   * The user's favorites.
   *
   * @param variables - variables to pass into the FavoritesQuery
   * @returns FavoriteConnection
   */
  public favorites(variables?: L.FavoritesQueryVariables): LinearFetch<FavoriteConnection> {
    return new FavoritesQuery(this._request).fetch(variables);
  }
  /**
   * Fetch Figma screenshot and other information with file and node identifiers.
   *
   * @param fileId - required fileId to pass to figmaEmbedInfo
   * @param variables - variables without 'fileId' to pass into the FigmaEmbedInfoQuery
   * @returns FigmaEmbedPayload
   */
  public figmaEmbedInfo(
    fileId: string,
    variables?: Omit<L.FigmaEmbedInfoQueryVariables, "fileId">
  ): LinearFetch<FigmaEmbedPayload> {
    return new FigmaEmbedInfoQuery(this._request).fetch(fileId, variables);
  }
  /**
   * One specific integration.
   *
   * @param id - required id to pass to integration
   * @returns Integration
   */
  public integration(id: string): LinearFetch<Integration> {
    return new IntegrationQuery(this._request).fetch(id);
  }
  /**
   * One specific integrationTemplate.
   *
   * @param id - required id to pass to integrationTemplate
   * @returns IntegrationTemplate
   */
  public integrationTemplate(id: string): LinearFetch<IntegrationTemplate> {
    return new IntegrationTemplateQuery(this._request).fetch(id);
  }
  /**
   * Template and integration connections.
   *
   * @param variables - variables to pass into the IntegrationTemplatesQuery
   * @returns IntegrationTemplateConnection
   */
  public integrationTemplates(
    variables?: L.IntegrationTemplatesQueryVariables
  ): LinearFetch<IntegrationTemplateConnection> {
    return new IntegrationTemplatesQuery(this._request).fetch(variables);
  }
  /**
   * All integrations.
   *
   * @param variables - variables to pass into the IntegrationsQuery
   * @returns IntegrationConnection
   */
  public integrations(variables?: L.IntegrationsQueryVariables): LinearFetch<IntegrationConnection> {
    return new IntegrationsQuery(this._request).fetch(variables);
  }
  /**
   * One specific set of settings.
   *
   * @param id - required id to pass to integrationsSettings
   * @returns IntegrationsSettings
   */
  public integrationsSettings(id: string): LinearFetch<IntegrationsSettings> {
    return new IntegrationsSettingsQuery(this._request).fetch(id);
  }
  /**
   * One specific issue.
   *
   * @param id - required id to pass to issue
   * @returns Issue
   */
  public issue(id: string): LinearFetch<Issue> {
    return new IssueQuery(this._request).fetch(id);
  }
  /**
   * Fetches the GitHub token, completing the OAuth flow.
   *
   * @param code - required code to pass to issueImportFinishGithubOAuth
   * @returns GithubOAuthTokenPayload
   */
  public issueImportFinishGithubOAuth(code: string): LinearFetch<GithubOAuthTokenPayload> {
    return new IssueImportFinishGithubOAuthQuery(this._request).fetch(code);
  }
  /**
   * One specific label.
   *
   * @param id - required id to pass to issueLabel
   * @returns IssueLabel
   */
  public issueLabel(id: string): LinearFetch<IssueLabel> {
    return new IssueLabelQuery(this._request).fetch(id);
  }
  /**
   * All issue labels.
   *
   * @param variables - variables to pass into the IssueLabelsQuery
   * @returns IssueLabelConnection
   */
  public issueLabels(variables?: L.IssueLabelsQueryVariables): LinearFetch<IssueLabelConnection> {
    return new IssueLabelsQuery(this._request).fetch(variables);
  }
  /**
   * Issue priority values and corresponding labels.
   *
   * @returns IssuePriorityValue[]
   */
  public get issuePriorityValues(): LinearFetch<IssuePriorityValue[]> {
    return new IssuePriorityValuesQuery(this._request).fetch();
  }
  /**
   * One specific issue relation.
   *
   * @param id - required id to pass to issueRelation
   * @returns IssueRelation
   */
  public issueRelation(id: string): LinearFetch<IssueRelation> {
    return new IssueRelationQuery(this._request).fetch(id);
  }
  /**
   * All issue relationships.
   *
   * @param variables - variables to pass into the IssueRelationsQuery
   * @returns IssueRelationConnection
   */
  public issueRelations(variables?: L.IssueRelationsQueryVariables): LinearFetch<IssueRelationConnection> {
    return new IssueRelationsQuery(this._request).fetch(variables);
  }
  /**
   * Find issue based on the VCS branch name.
   *
   * @param branchName - required branchName to pass to issueVcsBranchSearch
   * @returns Issue
   */
  public issueVcsBranchSearch(branchName: string): LinearFetch<Issue | undefined> {
    return new IssueVcsBranchSearchQuery(this._request).fetch(branchName);
  }
  /**
   * All issues.
   *
   * @param variables - variables to pass into the IssuesQuery
   * @returns IssueConnection
   */
  public issues(variables?: L.IssuesQueryVariables): LinearFetch<IssueConnection> {
    return new IssuesQuery(this._request).fetch(variables);
  }
  /**
   * One specific notification.
   *
   * @param id - required id to pass to notification
   * @returns Notification
   */
  public notification(
    id: string
  ): LinearFetch<IssueNotification | OauthClientApprovalNotification | ProjectNotification | Notification> {
    return new NotificationQuery(this._request).fetch(id);
  }
  /**
   * One specific notification subscription.
   *
   * @param id - required id to pass to notificationSubscription
   * @returns NotificationSubscription
   */
  public notificationSubscription(
    id: string
  ): LinearFetch<ProjectNotificationSubscription | TeamNotificationSubscription | NotificationSubscription> {
    return new NotificationSubscriptionQuery(this._request).fetch(id);
  }
  /**
   * The user's notification subscriptions.
   *
   * @param variables - variables to pass into the NotificationSubscriptionsQuery
   * @returns NotificationSubscriptionConnection
   */
  public notificationSubscriptions(
    variables?: L.NotificationSubscriptionsQueryVariables
  ): LinearFetch<NotificationSubscriptionConnection> {
    return new NotificationSubscriptionsQuery(this._request).fetch(variables);
  }
  /**
   * All notifications.
   *
   * @param variables - variables to pass into the NotificationsQuery
   * @returns NotificationConnection
   */
  public notifications(variables?: L.NotificationsQueryVariables): LinearFetch<NotificationConnection> {
    return new NotificationsQuery(this._request).fetch(variables);
  }
  /**
   * The user's organization.
   *
   * @returns Organization
   */
  public get organization(): LinearFetch<Organization> {
    return new OrganizationQuery(this._request).fetch();
  }
  /**
   * Does the organization exist.
   *
   * @param urlKey - required urlKey to pass to organizationExists
   * @returns OrganizationExistsPayload
   */
  public organizationExists(urlKey: string): LinearFetch<OrganizationExistsPayload> {
    return new OrganizationExistsQuery(this._request).fetch(urlKey);
  }
  /**
   * One specific organization invite.
   *
   * @param id - required id to pass to organizationInvite
   * @returns OrganizationInvite
   */
  public organizationInvite(id: string): LinearFetch<OrganizationInvite> {
    return new OrganizationInviteQuery(this._request).fetch(id);
  }
  /**
   * One specific organization invite.
   *
   * @param id - required id to pass to organizationInviteDetails
   * @returns OrganizationInviteDetailsPayload
   */
  public organizationInviteDetails(id: string): LinearFetch<OrganizationInviteDetailsPayload> {
    return new OrganizationInviteDetailsQuery(this._request).fetch(id);
  }
  /**
   * All invites for the organization.
   *
   * @param variables - variables to pass into the OrganizationInvitesQuery
   * @returns OrganizationInviteConnection
   */
  public organizationInvites(
    variables?: L.OrganizationInvitesQueryVariables
  ): LinearFetch<OrganizationInviteConnection> {
    return new OrganizationInvitesQuery(this._request).fetch(variables);
  }
  /**
   * One specific project.
   *
   * @param id - required id to pass to project
   * @returns Project
   */
  public project(id: string): LinearFetch<Project> {
    return new ProjectQuery(this._request).fetch(id);
  }
  /**
   * One specific project link.
   *
   * @param id - required id to pass to projectLink
   * @returns ProjectLink
   */
  public projectLink(id: string): LinearFetch<ProjectLink> {
    return new ProjectLinkQuery(this._request).fetch(id);
  }
  /**
   * All links for the project.
   *
   * @param variables - variables to pass into the ProjectLinksQuery
   * @returns ProjectLinkConnection
   */
  public projectLinks(variables?: L.ProjectLinksQueryVariables): LinearFetch<ProjectLinkConnection> {
    return new ProjectLinksQuery(this._request).fetch(variables);
  }
  /**
   * A specific project update.
   *
   * @param id - required id to pass to projectUpdate
   * @returns ProjectUpdate
   */
  public projectUpdate(id: string): LinearFetch<ProjectUpdate> {
    return new ProjectUpdateQuery(this._request).fetch(id);
  }
  /**
   * A specific interaction on a project update.
   *
   * @param id - required id to pass to projectUpdateInteraction
   * @returns ProjectUpdateInteraction
   */
  public projectUpdateInteraction(id: string): LinearFetch<ProjectUpdateInteraction> {
    return new ProjectUpdateInteractionQuery(this._request).fetch(id);
  }
  /**
   * All interactions on project updates.
   *
   * @param variables - variables to pass into the ProjectUpdateInteractionsQuery
   * @returns ProjectUpdateInteractionConnection
   */
  public projectUpdateInteractions(
    variables?: L.ProjectUpdateInteractionsQueryVariables
  ): LinearFetch<ProjectUpdateInteractionConnection> {
    return new ProjectUpdateInteractionsQuery(this._request).fetch(variables);
  }
  /**
   * All project updates.
   *
   * @param variables - variables to pass into the ProjectUpdatesQuery
   * @returns ProjectUpdateConnection
   */
  public projectUpdates(variables?: L.ProjectUpdatesQueryVariables): LinearFetch<ProjectUpdateConnection> {
    return new ProjectUpdatesQuery(this._request).fetch(variables);
  }
  /**
   * All projects.
   *
   * @param variables - variables to pass into the ProjectsQuery
   * @returns ProjectConnection
   */
  public projects(variables?: L.ProjectsQueryVariables): LinearFetch<ProjectConnection> {
    return new ProjectsQuery(this._request).fetch(variables);
  }
  /**
   * Sends a test push message.
   *
   * @returns PushSubscriptionTestPayload
   */
  public get pushSubscriptionTest(): LinearFetch<PushSubscriptionTestPayload> {
    return new PushSubscriptionTestQuery(this._request).fetch();
  }
  /**
   * The status of the rate limiter.
   *
   * @returns RateLimitPayload
   */
  public get rateLimitStatus(): LinearFetch<RateLimitPayload> {
    return new RateLimitStatusQuery(this._request).fetch();
  }
  /**
   * One specific roadmap.
   *
   * @param id - required id to pass to roadmap
   * @returns Roadmap
   */
  public roadmap(id: string): LinearFetch<Roadmap> {
    return new RoadmapQuery(this._request).fetch(id);
  }
  /**
   * One specific roadmapToProject.
   *
   * @param id - required id to pass to roadmapToProject
   * @returns RoadmapToProject
   */
  public roadmapToProject(id: string): LinearFetch<RoadmapToProject> {
    return new RoadmapToProjectQuery(this._request).fetch(id);
  }
  /**
   * Custom views for the user.
   *
   * @param variables - variables to pass into the RoadmapToProjectsQuery
   * @returns RoadmapToProjectConnection
   */
  public roadmapToProjects(variables?: L.RoadmapToProjectsQueryVariables): LinearFetch<RoadmapToProjectConnection> {
    return new RoadmapToProjectsQuery(this._request).fetch(variables);
  }
  /**
   * All roadmaps in the workspace.
   *
   * @param variables - variables to pass into the RoadmapsQuery
   * @returns RoadmapConnection
   */
  public roadmaps(variables?: L.RoadmapsQueryVariables): LinearFetch<RoadmapConnection> {
    return new RoadmapsQuery(this._request).fetch(variables);
  }
  /**
   * Fetch SSO login URL for the email provided.
   *
   * @param email - required email to pass to ssoUrlFromEmail
   * @param variables - variables without 'email' to pass into the SsoUrlFromEmailQuery
   * @returns SsoUrlFromEmailResponse
   */
  public ssoUrlFromEmail(
    email: string,
    variables?: Omit<L.SsoUrlFromEmailQueryVariables, "email">
  ): LinearFetch<SsoUrlFromEmailResponse> {
    return new SsoUrlFromEmailQuery(this._request).fetch(email, variables);
  }
  /**
   * One specific team.
   *
   * @param id - required id to pass to team
   * @returns Team
   */
  public team(id: string): LinearFetch<Team> {
    return new TeamQuery(this._request).fetch(id);
  }
  /**
   * One specific team membership.
   *
   * @param id - required id to pass to teamMembership
   * @returns TeamMembership
   */
  public teamMembership(id: string): LinearFetch<TeamMembership> {
    return new TeamMembershipQuery(this._request).fetch(id);
  }
  /**
   * All team memberships.
   *
   * @param variables - variables to pass into the TeamMembershipsQuery
   * @returns TeamMembershipConnection
   */
  public teamMemberships(variables?: L.TeamMembershipsQueryVariables): LinearFetch<TeamMembershipConnection> {
    return new TeamMembershipsQuery(this._request).fetch(variables);
  }
  /**
   * All teams whose issues can be accessed by the user. This might be different from `administrableTeams`, which also includes teams whose settings can be changed by the user.
   *
   * @param variables - variables to pass into the TeamsQuery
   * @returns TeamConnection
   */
  public teams(variables?: L.TeamsQueryVariables): LinearFetch<TeamConnection> {
    return new TeamsQuery(this._request).fetch(variables);
  }
  /**
   * A specific template.
   *
   * @param id - required id to pass to template
   * @returns Template
   */
  public template(id: string): LinearFetch<Template> {
    return new TemplateQuery(this._request).fetch(id);
  }
  /**
   * All templates from all users.
   *
   * @returns Template[]
   */
  public get templates(): LinearFetch<Template[]> {
    return new TemplatesQuery(this._request).fetch();
  }
  /**
   * One specific user.
   *
   * @param id - required id to pass to user
   * @returns User
   */
  public user(id: string): LinearFetch<User> {
    return new UserQuery(this._request).fetch(id);
  }
  /**
   * The user's settings.
   *
   * @returns UserSettings
   */
  public get userSettings(): LinearFetch<UserSettings> {
    return new UserSettingsQuery(this._request).fetch();
  }
  /**
   * All users for the organization.
   *
   * @param variables - variables to pass into the UsersQuery
   * @returns UserConnection
   */
  public users(variables?: L.UsersQueryVariables): LinearFetch<UserConnection> {
    return new UsersQuery(this._request).fetch(variables);
  }
  /**
   * The currently authenticated user.
   *
   * @returns User
   */
  public get viewer(): LinearFetch<User> {
    return new ViewerQuery(this._request).fetch();
  }
  /**
   * A specific webhook.
   *
   * @param id - required id to pass to webhook
   * @returns Webhook
   */
  public webhook(id: string): LinearFetch<Webhook> {
    return new WebhookQuery(this._request).fetch(id);
  }
  /**
   * All webhooks.
   *
   * @param variables - variables to pass into the WebhooksQuery
   * @returns WebhookConnection
   */
  public webhooks(variables?: L.WebhooksQueryVariables): LinearFetch<WebhookConnection> {
    return new WebhooksQuery(this._request).fetch(variables);
  }
  /**
   * One specific state.
   *
   * @param id - required id to pass to workflowState
   * @returns WorkflowState
   */
  public workflowState(id: string): LinearFetch<WorkflowState> {
    return new WorkflowStateQuery(this._request).fetch(id);
  }
  /**
   * All issue workflow states.
   *
   * @param variables - variables to pass into the WorkflowStatesQuery
   * @returns WorkflowStateConnection
   */
  public workflowStates(variables?: L.WorkflowStatesQueryVariables): LinearFetch<WorkflowStateConnection> {
    return new WorkflowStatesQuery(this._request).fetch(variables);
  }
}
