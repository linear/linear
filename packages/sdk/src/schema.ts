export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
  /** The `JSON` scalar type represents JSON values */
  JSON: any,
};

/** An API key. Grants access to the users resources. */
export type ApiKey = {
   __typename?: 'ApiKey',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The label of the API key. */
  label: Scalars['String'],
};

export type ApiKeyCreateInput = {
  /** The identifier. If none is provided, the backend will generate one. */
  id?: Maybe<Scalars['String']>,
  /** The label for the API key. */
  label: Scalars['String'],
  /** The API key value (format: /^[a-zA-Z0-9]{40}$/). */
  key: Scalars['String'],
};

export type ApiKeyPayload = {
   __typename?: 'ApiKeyPayload',
  lastSyncId: Scalars['Float'],
  apiKey: ApiKey,
  success: Scalars['Boolean'],
};

export type ArchivePayload = {
   __typename?: 'ArchivePayload',
  lastSyncId: Scalars['Float'],
  success: Scalars['Boolean'],
};

/** The base class of a backend entity object. Not to be used directly. */
export type BackendEntity = {
   __typename?: 'BackendEntity',
  /** The models identifier. */
  id: Scalars['ID'],
  /** The time at which the model was created. */
  createdAt: Scalars['DateTime'],
  /** The time at which the model was updated. */
  updatedAt: Scalars['DateTime'],
  /** The time at which the model was archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
};

/** The base class of a model object. Not to be used directly */
export type ClientEntity = {
   __typename?: 'ClientEntity',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
};

/** A comment associated with an issue. */
export type Comment = {
   __typename?: 'Comment',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The comment content in markdown format. */
  body: Scalars['String'],
  /** Comment content as a Prosemirror document. */
  bodyData?: Maybe<Scalars['JSON']>,
  /** The issue that the comment is associated with. */
  issue: Issue,
  /** The user who wrote the comment. */
  user: User,
};

export type CommentCreateInput = {
  /** The identifier. If none is provided, the backend will generate one */
  id?: Maybe<Scalars['String']>,
  /** The comment content in markdown format. */
  body: Scalars['String'],
  /** The comment content as a Prosemirror document. */
  bodyData?: Maybe<Scalars['JSON']>,
  /** The issue to associate the comment with. */
  issueId: Scalars['String'],
};

export type CommentPayload = {
   __typename?: 'CommentPayload',
  lastSyncId: Scalars['Float'],
  comment: Comment,
  success: Scalars['Boolean'],
};

export type CommentUpdateInput = {
  /** The comment content. */
  body?: Maybe<Scalars['String']>,
  /** The comment content as a Prosemirror document. */
  bodyData?: Maybe<Scalars['JSON']>,
};

/** A set of issues to be resolved in a specified amount of time. */
export type Cycle = {
   __typename?: 'Cycle',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The number of the cycle. */
  number: Scalars['Float'],
  /** The custom name of the cycle. */
  name?: Maybe<Scalars['String']>,
  /** The start time of the cycle. */
  startsAt: Scalars['DateTime'],
  /** The end time of the cycle. */
  endsAt: Scalars['DateTime'],
  /** The completion time of the cycle. If null, the cycle hasn't been completed */
  completedAt?: Maybe<Scalars['DateTime']>,
  /** The total number of issues in the cycle after each day. */
  issueCountHistory: Array<Scalars['Float']>,
  /** The number of completed issues in the cycle after each day. */
  completedIssueCountHistory: Array<Scalars['Float']>,
  /** The total number of estimation points after each day. */
  scopeHistory: Array<Scalars['Float']>,
  /** The number of completed estimation points after each day. */
  completedScopeHistory: Array<Scalars['Float']>,
  /** The team that the cycle is associated with. */
  team: Team,
  /** Issues associated with the cycle. */
  issues: Array<Issue>,
  /** Issues that weren't completed when the cycle was closed. */
  uncompletedIssuesUponClose: Array<Issue>,
};

export type CycleCreateInput = {
  /** The identifier. If none is provided, the backend will generate one. */
  id?: Maybe<Scalars['String']>,
  /** The custom name of the cycle. */
  name?: Maybe<Scalars['String']>,
  /** The team to associate the cycle with. */
  teamId: Scalars['String'],
  /** The start date of the cycle. */
  startsAt: Scalars['DateTime'],
  /** The end date of the cycle. */
  endsAt: Scalars['DateTime'],
  /** The end date of the cycle. */
  completedAt?: Maybe<Scalars['DateTime']>,
};

export type CyclePayload = {
   __typename?: 'CyclePayload',
  lastSyncId: Scalars['Float'],
  cycle?: Maybe<Cycle>,
  success: Scalars['Boolean'],
};

export type CycleUpdateInput = {
  /** The custom name of the cycle. */
  name?: Maybe<Scalars['String']>,
  /** The team to associate the cycle with. */
  teamId?: Maybe<Scalars['String']>,
  /** The start date of the cycle. */
  startsAt?: Maybe<Scalars['DateTime']>,
  /** The end date of the cycle. */
  endsAt?: Maybe<Scalars['DateTime']>,
  /** The end date of the cycle. */
  completedAt?: Maybe<Scalars['DateTime']>,
};


export type DebugPayload = {
   __typename?: 'DebugPayload',
  success: Scalars['Boolean'],
};

export type EmailUnsubscribeInput = {
  /** Email type to unsubscribed from. */
  type: Scalars['String'],
  /** The user's email validation token. */
  token: Scalars['String'],
  /** The user's identifier. */
  userId: Scalars['String'],
};

export type EmailUnsubscribePayload = {
   __typename?: 'EmailUnsubscribePayload',
  lastSyncId: Scalars['Float'],
  /** Whether the operation was successful. */
  success: Scalars['Boolean'],
};

/** User favorites presented in the sidebar. */
export type Favorite = {
   __typename?: 'Favorite',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The type of the favorite. */
  type: Scalars['String'],
  /** Favorited issue. */
  issue?: Maybe<Issue>,
  /** Favorited project. */
  project?: Maybe<Project>,
  /** Favorited cycle. */
  cycle?: Maybe<Cycle>,
  /** Favorited issue label. */
  label?: Maybe<IssueLabel>,
  /** The owner of the favorite */
  user: User,
};

export type FavoriteCreateInput = {
  /** The identifier. If none is provided, the backend will generate one */
  id?: Maybe<Scalars['String']>,
  /** The identifier of the issue to favorite. */
  issueId?: Maybe<Scalars['String']>,
  /** The identifier of the project to favorite. */
  projectId?: Maybe<Scalars['String']>,
  /** The identifier of the cycle to favorite. */
  cycleId?: Maybe<Scalars['String']>,
  /** The identifier of the label to favorite. */
  labelId?: Maybe<Scalars['String']>,
};

export type FavoritePayload = {
   __typename?: 'FavoritePayload',
  lastSyncId: Scalars['Float'],
  favorite: Favorite,
  success: Scalars['Boolean'],
};

export type FeedbackCreateInput = {
  /** The feedback the user sent */
  feedback: Scalars['String'],
  /** How disappointed the user would be if he/she could no longer use Linear. */
  disappointmentRating: Scalars['Float'],
};

export type FeedbackPayload = {
   __typename?: 'FeedbackPayload',
  success: Scalars['Boolean'],
};

/** GitHub's commit data */
export type GitHubCommitPayload = {
   __typename?: 'GitHubCommitPayload',
  id: Scalars['String'],
  message: Scalars['String'],
  timestamp: Scalars['String'],
  url: Scalars['String'],
  added: Array<Scalars['String']>,
  removed: Array<Scalars['String']>,
  modified: Array<Scalars['String']>,
};

/** GitHub's pull request data */
export type GitHubPullRequestPayload = {
   __typename?: 'GitHubPullRequestPayload',
  status: Scalars['String'],
  number: Scalars['Float'],
  url: Scalars['String'],
  id: Scalars['String'],
  title: Scalars['String'],
  userId: Scalars['String'],
  userLogin: Scalars['String'],
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
  closedAt: Scalars['String'],
  mergedAt: Scalars['String'],
};

export type ImageUploadFromUrlPayload = {
   __typename?: 'ImageUploadFromUrlPayload',
  lastSyncId: Scalars['Float'],
  url?: Maybe<Scalars['String']>,
  success: Scalars['Boolean'],
};

/** An integration with an external service. */
export type Integration = {
   __typename?: 'Integration',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The integration's type. */
  service: Scalars['String'],
  /** The external service identifier. */
  serviceId?: Maybe<Scalars['String']>,
  /** The organization that the integration is associated with. */
  organization: Organization,
  /** The team that the integration is associated with. */
  team?: Maybe<Team>,
  /** The user that added the integration. */
  creator: User,
  /** Settings related to the integration. */
  settings: IntegrationSettings,
};

export type IntegrationPayload = {
   __typename?: 'IntegrationPayload',
  lastSyncId: Scalars['Float'],
  integration?: Maybe<Integration>,
  success: Scalars['Boolean'],
};

/** An integration resource created by an external service. */
export type IntegrationResource = {
   __typename?: 'IntegrationResource',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The integration's type. */
  resourceType: Scalars['String'],
  /** The external service resource ID. */
  resourceId: Scalars['String'],
  /** The integration that the resource is associated with. */
  integration: Integration,
  /** The issue that the resource is associated with. */
  issue: Issue,
  /** Detailed information about the external resource. */
  data: IntegrationResourceData,
};

/** Integration resource's payload */
export type IntegrationResourceData = {
   __typename?: 'IntegrationResourceData',
  githubPullRequest?: Maybe<GitHubPullRequestPayload>,
  githubCommit?: Maybe<GitHubCommitPayload>,
};

/** The integration resource's payload */
export type IntegrationSettings = {
   __typename?: 'IntegrationSettings',
  slackPost?: Maybe<SlackPostSettings>,
};

/** An issue. */
export type Issue = {
   __typename?: 'Issue',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The issue's unique number. */
  number: Scalars['Float'],
  /** The issue's title. */
  title: Scalars['String'],
  /** The issue's description in markdown format. */
  description?: Maybe<Scalars['String']>,
  /** The issue's description as a Prosemirror document. */
  descriptionData?: Maybe<Scalars['JSON']>,
  /** The priority of the issue. */
  priority: Scalars['Float'],
  /** The estimate of the complexity of the issue.. */
  estimate?: Maybe<Scalars['Float']>,
  /** The order of the item in its column on the board. */
  boardOrder: Scalars['Float'],
  /** The time at which the issue was moved into started state. */
  startedAt?: Maybe<Scalars['DateTime']>,
  /** The time at which the issue was moved into completed state. */
  completedAt?: Maybe<Scalars['DateTime']>,
  /** The time at which the issue was moved into canceled state. */
  canceledAt?: Maybe<Scalars['DateTime']>,
  /** Comments associated with the issue */
  comments: Array<Comment>,
  /** History entries associated with the issue */
  history: Array<IssueHistory>,
  /** The team that the issue is associated with. */
  team: Team,
  /** The cycle that the issue is associated with. */
  cycle?: Maybe<Cycle>,
  /** The project that the issue is associated with. */
  project?: Maybe<Project>,
  /** Users who are subscribed to the issue. */
  subscribers: Array<User>,
  /** The user who created the issue. */
  creator?: Maybe<User>,
  /** The user to whom the issue is assigned to. */
  assignee?: Maybe<User>,
  /** The workflow state that the issue is associated with. */
  state: WorkflowState,
  /** The parent of the issue. */
  parent?: Maybe<Issue>,
  /** Children of the issue. */
  children: Array<Issue>,
  /** Integration resources for this issue. */
  integrationResources: Array<IntegrationResource>,
  labels: Array<IssueLabel>,
  url: Scalars['String'],
};

export type IssueCreateInput = {
  /** The identifier. If none is provided, the backend will generate one. */
  id?: Maybe<Scalars['String']>,
  /** The issue's title. */
  title: Scalars['String'],
  /** The issue description in markdown format. */
  description?: Maybe<Scalars['String']>,
  /** The issue description as a Prosemirror document. */
  descriptionData?: Maybe<Scalars['JSON']>,
  /** The id of the user to assign the issue to. */
  assigneeId?: Maybe<Scalars['String']>,
  /** The id of the parent issue. */
  parentId?: Maybe<Scalars['String']>,
  /** The priority of the issue. */
  priority?: Maybe<Scalars['Int']>,
  /** The estimated complexity of the issue. */
  estimate?: Maybe<Scalars['Int']>,
  /** The ids of the users subscribing to this ticket. */
  subscriberIds?: Maybe<Array<Scalars['String']>>,
  /** The ids of the issue labels associated with this ticket. */
  labelIds?: Maybe<Array<Scalars['String']>>,
  /** The team associated with the issue. */
  teamId: Scalars['String'],
  /** The cycle associated with the issue. */
  cycleId?: Maybe<Scalars['String']>,
  /** The project associated with the issue. */
  projectId?: Maybe<Scalars['String']>,
  /** The team state of the issue. */
  stateId?: Maybe<Scalars['String']>,
  /** The position of the item in its column on the kanban board. */
  boardOrder?: Maybe<Scalars['Float']>,
};

/** A record of changes to an issue. */
export type IssueHistory = {
   __typename?: 'IssueHistory',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The issue that was changed. */
  issue: Issue,
  /** The user who made these changes. If null, possibly means that the change made by an integration. */
  actor?: Maybe<User>,
  /** The integration that made these changes. If null, possibly means that the change was made by a user. */
  integration?: Maybe<Integration>,
  /** Whether the issue's description was updated. */
  updatedDescription?: Maybe<Scalars['Boolean']>,
  /** What the title was changed from. */
  fromTitle?: Maybe<Scalars['String']>,
  /** What the title was changed to. */
  toTitle?: Maybe<Scalars['String']>,
  /** The user from whom the issue was re-assigned from. */
  fromAssignee?: Maybe<User>,
  /** The user to whom the issue was assigned to. */
  toAssignee?: Maybe<User>,
  /** What the priority was changed from. */
  fromPriority?: Maybe<Scalars['Float']>,
  /** What the priority was changed to. */
  toPriority?: Maybe<Scalars['Float']>,
  /** The team from which the issue was moved from. */
  fromTeam?: Maybe<Team>,
  /** The team to which the issue was moved to. */
  toTeam?: Maybe<Team>,
  /** The previous parent of the issue. */
  fromParent?: Maybe<Issue>,
  /** The new parent of the issue. */
  toParent?: Maybe<Issue>,
  /** The previous workflow state of the issue. */
  fromState?: Maybe<WorkflowState>,
  /** The new workflow state of the issue. */
  toState?: Maybe<WorkflowState>,
  /** The previous cycle of the issue. */
  fromCycle?: Maybe<Cycle>,
  /** The new cycle of the issue. */
  toCycle?: Maybe<Cycle>,
  /** What the estimate was changed from. */
  fromEstimate?: Maybe<Scalars['Float']>,
  /** What the estimate was changed to. */
  toEstimate?: Maybe<Scalars['Float']>,
};

/** Labels that can be associated with issues. */
export type IssueLabel = {
   __typename?: 'IssueLabel',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The label's name. */
  name: Scalars['String'],
  /** The label's description. */
  description?: Maybe<Scalars['String']>,
  /** The label's color as a HEX string. */
  color: Scalars['String'],
  /** The team to which the label belongs to. */
  team: Team,
  /** The user who created the label. */
  creator?: Maybe<User>,
};

export type IssueLabelCreateInput = {
  /** The identifier. If none is provided, the backend will generate one */
  id?: Maybe<Scalars['String']>,
  /** The label's name. */
  name: Scalars['String'],
  /** The label's description. */
  description?: Maybe<Scalars['String']>,
  /** The label's color. */
  color?: Maybe<Scalars['String']>,
  /** The team associated with the label. */
  teamId: Scalars['String'],
};

export type IssueLabelPayload = {
   __typename?: 'IssueLabelPayload',
  lastSyncId: Scalars['Float'],
  issueLabel: IssueLabel,
  success: Scalars['Boolean'],
};

export type IssueLabelUpdateInput = {
  /** The label's name. */
  name?: Maybe<Scalars['String']>,
  /** The label's description. */
  description?: Maybe<Scalars['String']>,
  /** The label's color. */
  color?: Maybe<Scalars['String']>,
};

export type IssuePayload = {
   __typename?: 'IssuePayload',
  lastSyncId: Scalars['Float'],
  issue?: Maybe<Issue>,
  success: Scalars['Boolean'],
};

export type IssueUpdateInput = {
  /** The issue's title. */
  title?: Maybe<Scalars['String']>,
  /** The issue description in markdown format. */
  description?: Maybe<Scalars['String']>,
  /** The issue description as a Prosemirror document. */
  descriptionData?: Maybe<Scalars['JSON']>,
  /** The id of the user to assign the issue to. */
  assigneeId?: Maybe<Scalars['String']>,
  /** The id of the parent issue. */
  parentId?: Maybe<Scalars['String']>,
  /** The priority of the issue. */
  priority?: Maybe<Scalars['Int']>,
  /** The estimated complexity of the issue. */
  estimate?: Maybe<Scalars['Int']>,
  /** The ids of the users subscribing to this ticket. */
  subscriberIds?: Maybe<Array<Scalars['String']>>,
  /** The ids of the issue labels associated with this ticket. */
  labelIds?: Maybe<Array<Scalars['String']>>,
  /** The team associated with the issue. */
  teamId?: Maybe<Scalars['String']>,
  /** The cycle associated with the issue. */
  cycleId?: Maybe<Scalars['String']>,
  /** The project associated with the issue. */
  projectId?: Maybe<Scalars['String']>,
  /** The team state of the issue. */
  stateId?: Maybe<Scalars['String']>,
  /** The position of the item in its column on the board. */
  boardOrder?: Maybe<Scalars['Float']>,
};


export type Mutation = {
   __typename?: 'Mutation',
  /** Creates a new API key. */
  apiKeyCreate: ApiKeyPayload,
  /** Archives an API key. */
  apiKeyArchive: ArchivePayload,
  /** Creates a new comment. */
  commentCreate: CommentPayload,
  /** Updates a comment. */
  commentUpdate: CommentPayload,
  /** Archives a comment. */
  commentArchive: ArchivePayload,
  /** Creates a new cycle. */
  cycleCreate: CyclePayload,
  /** Updates a cycle. */
  cycleUpdate: CyclePayload,
  /** Archives a cycle. */
  cycleArchive: ArchivePayload,
  /** Always fails with internal error. Used to debug logging. */
  debugFailWithInternalError: DebugPayload,
  /** Unsubscribes the user from one type of emails. */
  emailUnsubscribe: EmailUnsubscribePayload,
  /** Creates a new favorite (project, cycle etc). */
  favoriteCreate: FavoritePayload,
  /** Archives a favorite reference. */
  favoriteArchive: ArchivePayload,
  /** Saves user feedback. */
  feedbackCreate: FeedbackPayload,
  /** XHR request payload to upload an images, video and other attachments directly to Linear's cloud storage */
  fileUpload: UploadPayload,
  /** Upload an image from an URL to Linear. */
  imageUploadFromUrl: ImageUploadFromUrlPayload,
  /** Connects to organization with the GitHub App. */
  integrationGithubConnect: IntegrationPayload,
  /** Integrates the organization with Slack. */
  integrationSlack: IntegrationPayload,
  /** Slack webhook integration. */
  integrationSlackPost: IntegrationPayload,
  /** Archives an integration. */
  integrationArchive: ArchivePayload,
  /** Archives an integration resource. */
  integrationResourceArchive: ArchivePayload,
  /** Creates a new label. */
  issueLabelCreate: IssueLabelPayload,
  /** Updates an label. */
  issueLabelUpdate: IssueLabelPayload,
  /** Archives an issue label. */
  issueLabelArchive: ArchivePayload,
  /** Creates a new issue. */
  issueCreate: IssuePayload,
  /** Updates an issue. */
  issueUpdate: IssuePayload,
  /** Archives an issue. */
  issueArchive: ArchivePayload,
  /** Updates a notification. */
  notificationUpdate: NotificationPayload,
  /** Archives a notification. */
  notificationArchive: ArchivePayload,
  /** Creates a new organization invite. */
  organizationInviteCreate: OrganizationInvitePayload,
  /** Re-send an organization invite. */
  resentOrganizationInvite: ArchivePayload,
  /** Archives an organization invite. */
  organizationInviteArchive: ArchivePayload,
  /** Updates the user's organization. This mutation requires organization admin privileges. */
  organizationUpdate: OrganizationPayload,
  /** Creates a new pinned issue reference. */
  pinnedIssueCreate: PinnedIssuePayload,
  /** Archives a pinned issue reference. */
  pinnedIssueArchive: ArchivePayload,
  /** Creates a new project. */
  projectCreate: ProjectPayload,
  /** Updates a project. */
  projectUpdate: ProjectPayload,
  /** Archives a project. */
  projectArchive: ArchivePayload,
  /** Creates a push subscription. */
  pushSubscriptionCreate: PushSubscriptionPayload,
  /** Archives a PushSubscription. */
  pushSubscriptionArchive: PushSubscriptionPayload,
  /** Creates a subscription session. Used internally to integrate with Stripe */
  subscriptionSessionCreate: SubscriptionSessionPayload,
  /** Archives a subscription. */
  subscriptionArchive: ArchivePayload,
  /** Creates a new team. */
  teamCreate: TeamPayload,
  /** Updates a team. */
  teamUpdate: TeamPayload,
  /** Archives a team. */
  teamArchive: ArchivePayload,
  /** Second step of Google's OAuth flow. */
  userAccountGoogleAuth: UserGoogleAuthPayload,
  /** Updates a user. Only available to organization admins and the user themselves. */
  userUpdate: UserPayload,
  /** Updates the users settings. */
  userSettingsUpdate: UserSettingsPayload,
  /** Updates user settings. */
  userSettingsFlagIncrement: UserSettingsFlagPayload,
  /** Resets user's setting flags. */
  userSettingsFlagsReset: UserSettingsFlagsResetPayload,
  /** Creates a new wait-list entry. */
  waitListEntryCreate: WaitListEntryPayload,
  /** Subscribes user to changelog newsletter. */
  subscribeToNewsletter: SubscribeToNewsletterPayload,
  /** Creates a new whitelist entry. Superuser privileges required. */
  whiteListEntryCreate: WhiteListEntryPayload,
  /** Creates a new state, adding it to the workflow of a team. */
  workflowStateCreate: WorkflowStatePayload,
  /** Updates a state. */
  workflowStateUpdate: WorkflowStatePayload,
  /** Archives a state. Only states with issues that have all been archived can be archived. */
  workflowStateArchive: ArchivePayload,
};


export type MutationApiKeyCreateArgs = {
  input: ApiKeyCreateInput
};


export type MutationApiKeyArchiveArgs = {
  id: Scalars['String']
};


export type MutationCommentCreateArgs = {
  input: CommentCreateInput
};


export type MutationCommentUpdateArgs = {
  input: CommentUpdateInput,
  id: Scalars['String']
};


export type MutationCommentArchiveArgs = {
  id: Scalars['String']
};


export type MutationCycleCreateArgs = {
  input: CycleCreateInput
};


export type MutationCycleUpdateArgs = {
  input: CycleUpdateInput,
  id: Scalars['String']
};


export type MutationCycleArchiveArgs = {
  id: Scalars['String']
};


export type MutationEmailUnsubscribeArgs = {
  input: EmailUnsubscribeInput
};


export type MutationFavoriteCreateArgs = {
  input: FavoriteCreateInput
};


export type MutationFavoriteArchiveArgs = {
  id: Scalars['String']
};


export type MutationFeedbackCreateArgs = {
  input: FeedbackCreateInput
};


export type MutationFileUploadArgs = {
  contentType: Scalars['String'],
  filename: Scalars['String']
};


export type MutationImageUploadFromUrlArgs = {
  url: Scalars['String']
};


export type MutationIntegrationGithubConnectArgs = {
  installationId: Scalars['String']
};


export type MutationIntegrationSlackArgs = {
  redirectUri: Scalars['String'],
  code: Scalars['String']
};


export type MutationIntegrationSlackPostArgs = {
  redirectUri: Scalars['String'],
  teamId: Scalars['String'],
  code: Scalars['String']
};


export type MutationIntegrationArchiveArgs = {
  id: Scalars['String']
};


export type MutationIntegrationResourceArchiveArgs = {
  id: Scalars['String']
};


export type MutationIssueLabelCreateArgs = {
  input: IssueLabelCreateInput
};


export type MutationIssueLabelUpdateArgs = {
  input: IssueLabelUpdateInput,
  id: Scalars['String']
};


export type MutationIssueLabelArchiveArgs = {
  id: Scalars['String']
};


export type MutationIssueCreateArgs = {
  input: IssueCreateInput
};


export type MutationIssueUpdateArgs = {
  input: IssueUpdateInput,
  id: Scalars['String']
};


export type MutationIssueArchiveArgs = {
  id: Scalars['String']
};


export type MutationNotificationUpdateArgs = {
  input: NotificationUpdateInput,
  id: Scalars['String']
};


export type MutationNotificationArchiveArgs = {
  id: Scalars['String']
};


export type MutationOrganizationInviteCreateArgs = {
  input: OrganizationInviteCreateInput
};


export type MutationResentOrganizationInviteArgs = {
  id: Scalars['String']
};


export type MutationOrganizationInviteArchiveArgs = {
  id: Scalars['String']
};


export type MutationOrganizationUpdateArgs = {
  input: UpdateOrganizationInput
};


export type MutationPinnedIssueCreateArgs = {
  input: PinnedIssueCreateInput
};


export type MutationPinnedIssueArchiveArgs = {
  id: Scalars['String']
};


export type MutationProjectCreateArgs = {
  input: ProjectCreateInput
};


export type MutationProjectUpdateArgs = {
  input: ProjectUpdateInput,
  id: Scalars['String']
};


export type MutationProjectArchiveArgs = {
  id: Scalars['String']
};


export type MutationPushSubscriptionCreateArgs = {
  input: PushSubscriptionCreateInput
};


export type MutationPushSubscriptionArchiveArgs = {
  id: Scalars['String']
};


export type MutationSubscriptionSessionCreateArgs = {
  update?: Maybe<Scalars['Boolean']>,
  plan: Scalars['String']
};


export type MutationSubscriptionArchiveArgs = {
  id: Scalars['String']
};


export type MutationTeamCreateArgs = {
  input: TeamCreateInput
};


export type MutationTeamUpdateArgs = {
  input: TeamUpdateInput,
  id: Scalars['String']
};


export type MutationTeamArchiveArgs = {
  id: Scalars['String']
};


export type MutationUserAccountGoogleAuthArgs = {
  timezone: Scalars['String'],
  code: Scalars['String']
};


export type MutationUserUpdateArgs = {
  input: UpdateUserInput,
  id: Scalars['String']
};


export type MutationUserSettingsUpdateArgs = {
  input: UserSettingsUpdateInput,
  id: Scalars['String']
};


export type MutationUserSettingsFlagIncrementArgs = {
  flag: Scalars['String']
};


export type MutationWaitListEntryCreateArgs = {
  input: WaitListEntryCreateInput
};


export type MutationSubscribeToNewsletterArgs = {
  input: SubscribeToNewsletterInput
};


export type MutationWhiteListEntryCreateArgs = {
  input: WhiteListEntryCreateInput
};


export type MutationWorkflowStateCreateArgs = {
  input: WorkflowStateCreateInput
};


export type MutationWorkflowStateUpdateArgs = {
  input: WorkflowStateUpdateInput,
  id: Scalars['String']
};


export type MutationWorkflowStateArchiveArgs = {
  id: Scalars['String']
};

/** A notification sent to a user. */
export type Notification = {
   __typename?: 'Notification',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** Notification type */
  type: Scalars['String'],
  /** The recipient of the notification. */
  user: User,
  /** The issue that the notification is associated with. */
  issue: Issue,
  /** The team which the notification is associated with */
  team: Team,
  /** The created comment if applicable */
  comment?: Maybe<Comment>,
  /** The time at when the user marked the notification as read. Null, if the the user hasn't read the notification */
  readAt?: Maybe<Scalars['DateTime']>,
  /** 
 * The time at when an email reminder for this notification was sent to the user. Null, if no email 
   *     reminder has been sent.
 **/
  emailedAt?: Maybe<Scalars['DateTime']>,
};

export type NotificationPayload = {
   __typename?: 'NotificationPayload',
  lastSyncId: Scalars['Float'],
  notification: Notification,
  success: Scalars['Boolean'],
};

export type NotificationUpdateInput = {
  /** The time when notification was marked as read. */
  readAt?: Maybe<Scalars['DateTime']>,
};

/** An organization. Organizations are root-level objects that contain user accounts and teams. */
export type Organization = {
   __typename?: 'Organization',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The organizations name. */
  name: Scalars['String'],
  /** The organizations picture. */
  pictureUrl?: Maybe<Scalars['String']>,
  /** Teams associated with the organization. */
  teams: Array<Team>,
  /** Users associated with the organization. */
  users: Array<User>,
  /** The subscription for the organization. */
  subscription?: Maybe<Subscription>,
  /** Integrations associated with the organization. */
  integrations: Array<Integration>,
};

/** An invitation to the organization that has been sent via email. */
export type OrganizationInvite = {
   __typename?: 'OrganizationInvite',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The invitees email address. */
  email: Scalars['String'],
  /** The user who created the invitation. */
  inviter: User,
  /** The user who has accepted the invite. Null, if the invite hasn't been accepted */
  invitee?: Maybe<User>,
  /** The time at which the invite was accepted. Null, if the invite hasn't been accepted */
  acceptedAt?: Maybe<Scalars['DateTime']>,
  /** The organization that the invite is associated with. */
  organization: Organization,
};

export type OrganizationInviteCreateInput = {
  /** The identifier. If none is provided, the backend will generate one */
  id?: Maybe<Scalars['String']>,
  /** The email of the invitee. */
  email: Scalars['String'],
  /** The message to send to the invitee. */
  message?: Maybe<Scalars['String']>,
};

export type OrganizationInvitePayload = {
   __typename?: 'OrganizationInvitePayload',
  lastSyncId: Scalars['Float'],
  organizationInvite: OrganizationInvite,
  success: Scalars['Boolean'],
};

export type OrganizationPayload = {
   __typename?: 'OrganizationPayload',
  lastSyncId: Scalars['Float'],
  organization?: Maybe<Organization>,
  success: Scalars['Boolean'],
};

/** An issue that has been pinned by a user. */
export type PinnedIssue = {
   __typename?: 'PinnedIssue',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The pinning user. */
  user: User,
  /** The pinned issue. */
  issue: Issue,
};

export type PinnedIssueCreateInput = {
  /** The identifier. If none is provided, the backend will generate one */
  id?: Maybe<Scalars['String']>,
  /** The identifier of the issue to pin. */
  issueId: Scalars['String'],
};

export type PinnedIssuePayload = {
   __typename?: 'PinnedIssuePayload',
  lastSyncId: Scalars['Float'],
  pinnedIssue: PinnedIssue,
  success: Scalars['Boolean'],
};

/** A project. */
export type Project = {
   __typename?: 'Project',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The project's name. */
  name: Scalars['String'],
  /** The project's description. */
  description: Scalars['String'],
  /** The project's color. */
  color: Scalars['String'],
  /** The type of the state. */
  state: Scalars['String'],
  /** The team that the project is associated with. */
  team: Team,
  /** The user who created the project. */
  creator: User,
  /** Issues associated with the project. */
  issues: Array<Issue>,
  /** The estimated completetion date of the project. */
  targetDate?: Maybe<Scalars['DateTime']>,
  /** The time at which the project was moved into started state. */
  startedAt?: Maybe<Scalars['DateTime']>,
  /** The time at which the project was moved into completed state. */
  completedAt?: Maybe<Scalars['DateTime']>,
  /** The time at which the project was moved into canceled state. */
  canceledAt?: Maybe<Scalars['DateTime']>,
};

export type ProjectCreateInput = {
  /** The identifier. If none is provided, the backend will generate one. */
  id?: Maybe<Scalars['String']>,
  /** The name of the project. */
  name: Scalars['String'],
  /** The color of the project. */
  color?: Maybe<Scalars['String']>,
  /** Project's state */
  state?: Maybe<Scalars['String']>,
  /** The description for the project. */
  description?: Maybe<Scalars['String']>,
  /** The team to associate the project with. */
  teamId: Scalars['String'],
  /** The planned target date of the project. */
  targetDate?: Maybe<Scalars['DateTime']>,
};

export type ProjectPayload = {
   __typename?: 'ProjectPayload',
  lastSyncId: Scalars['Float'],
  project?: Maybe<Project>,
  success: Scalars['Boolean'],
};

export type ProjectUpdateInput = {
  /** Project's state */
  state?: Maybe<Scalars['String']>,
  /** The name of the project. */
  name?: Maybe<Scalars['String']>,
  /** The description for the project. */
  description?: Maybe<Scalars['String']>,
  /** The color of the project. */
  color?: Maybe<Scalars['String']>,
  /** The planned target date of the project. */
  targetDate?: Maybe<Scalars['DateTime']>,
};

/** A user's web browser push notification subscription. */
export type PushSubscription = {
   __typename?: 'PushSubscription',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
};

export type PushSubscriptionCreateInput = {
  /** The identifier. If none is provided, the backend will generate one */
  id?: Maybe<Scalars['String']>,
  /** The user id of the subscription */
  userId: Scalars['String'],
  /** The data of the subscription in stringified JSON format */
  data: Scalars['String'],
};

export type PushSubscriptionPayload = {
   __typename?: 'PushSubscriptionPayload',
  lastSyncId: Scalars['Float'],
  success: Scalars['Boolean'],
};

export type Query = {
   __typename?: 'Query',
  /** Fetch data to catch up the client to the state of the world. */
  syncBootstrap: SyncResponse,
  /** Fetches delta packets to catch up the user to the current state of the world. */
  syncUpdates: SyncResponse,
  /** Fetches an archived model. */
  archivedModelSync: SyncResponse,
  /** All API keys for the user. */
  apiKeys: Array<ApiKey>,
  /** All comments from all users. */
  comments: Array<Comment>,
  /** A specific comment. */
  comment: Comment,
  /** All cycles. */
  cycles: Array<Cycle>,
  /** One specific cycle. */
  cycle: Cycle,
  /** The user's favorites. */
  favorites: Array<Favorite>,
  /** One specific favorite. */
  favorite: Favorite,
  /** All integrations. */
  integrations: Array<Integration>,
  /** One specific integration. */
  integration: Integration,
  /** All integrations resources (e.g. linked GitHub pull requests for issues). */
  integrationResources: Array<IntegrationResource>,
  /** One specific integration resource (e.g. linked GitHub pull requests for an issue). */
  integrationResource: IntegrationResource,
  /** All labels. */
  issueLabels: Array<IssueLabel>,
  /** One specific label. */
  issueLabel: IssueLabel,
  /** All issues. */
  issues: Array<Issue>,
  /** One specific issue. */
  issue: Issue,
  /** All notifications. */
  notifications: Array<Notification>,
  /** The users settings. */
  notification: UserSettings,
  /** All invites for the organization. */
  organizationInvites: Array<OrganizationInvite>,
  /** One specific organization invite. */
  organizationInvite: IssueLabel,
  /** The user's organization. */
  organization: Organization,
  /** The users pinned issues. */
  pinnedIssues: Array<PinnedIssue>,
  /** All projects. */
  projects: Array<Project>,
  /** One specific project. */
  project: Project,
  /** Sends a test push message. */
  pushSubscriptionTest: PushSubscriptionPayload,
  /** The organization's subscription. */
  subscription: Subscription,
  /** All teams. */
  teams: Array<Team>,
  /** One specific team. */
  team: Team,
  /** All users of the organization. */
  users: Array<User>,
  /** One specific user. */
  user: User,
  /** All states. */
  workflowStates: Array<WorkflowState>,
  /** One specific state. */
  workflowState: WorkflowState,
};


export type QuerySyncBootstrapArgs = {
  databaseVersion: Scalars['Float'],
  sinceSyncId: Scalars['Float']
};


export type QuerySyncUpdatesArgs = {
  sinceSyncId: Scalars['Float']
};


export type QueryArchivedModelSyncArgs = {
  identifier: Scalars['String'],
  modelClass: Scalars['String']
};


export type QueryCommentArgs = {
  id: Scalars['String']
};


export type QueryCycleArgs = {
  id: Scalars['String']
};


export type QueryFavoriteArgs = {
  id: Scalars['String']
};


export type QueryIntegrationArgs = {
  id: Scalars['String']
};


export type QueryIntegrationResourceArgs = {
  id: Scalars['String']
};


export type QueryIssueLabelArgs = {
  id: Scalars['String']
};


export type QueryIssueArgs = {
  id: Scalars['String']
};


export type QueryOrganizationInviteArgs = {
  id: Scalars['String']
};


export type QueryProjectArgs = {
  id: Scalars['String']
};


export type QueryTeamArgs = {
  id: Scalars['String']
};


export type QueryUserArgs = {
  id: Scalars['String']
};


export type QueryWorkflowStateArgs = {
  id: Scalars['String']
};

export type SlackPostSettings = {
   __typename?: 'SlackPostSettings',
  channel: Scalars['String'],
  channelId: Scalars['String'],
  configurationUrl: Scalars['String'],
};

export type SubscribeToNewsletterInput = {
  /** The user's email address which will be subscribed to changelog newsletter. */
  email: Scalars['String'],
};

export type SubscribeToNewsletterPayload = {
   __typename?: 'SubscribeToNewsletterPayload',
  success: Scalars['Boolean'],
};

/** The subscription of an organization. */
export type Subscription = {
   __typename?: 'Subscription',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The subscription type. */
  type: Scalars['String'],
  /** The number of seats in the subscription. */
  seats: Scalars['Float'],
  /** The Stripe customer identifier. */
  stripeCustomerId: Scalars['String'],
  /** The Stripe identifier for the subscription. */
  stripeSubscriptionId: Scalars['String'],
  /** The organization that the user is associated with. */
  organization: Organization,
};

export type SubscriptionSessionPayload = {
   __typename?: 'SubscriptionSessionPayload',
  session?: Maybe<Scalars['String']>,
};

export type SynchronizedPayload = {
   __typename?: 'SynchronizedPayload',
  lastSyncId: Scalars['Float'],
};

/** 
 * Contains either the full serialized state of the application or delta packets that the requester can 
 *   apply to the local data set in order to be up-to-date.
 **/
export type SyncResponse = {
   __typename?: 'SyncResponse',
  /** 
 * The full state of the organization as a serialized JSON object.
   *     Mutually exclusive with the delta property
 **/
  state?: Maybe<Scalars['String']>,
  /** 
 * JSON serialized delta changes that the client can apply to its local state 
   *     in order to catch up with the state of the world.
 **/
  delta?: Maybe<Scalars['String']>,
  /** A JSON serialized collection of model objects loaded from the archive */
  archive?: Maybe<Scalars['String']>,
  /** The last sync id covered by the response. */
  lastSyncId: Scalars['Float'],
  /** The version of the remote database. Incremented by 1 for each migration run on the database. */
  databaseVersion: Scalars['Float'],
};

/** An organizational unit that contains issues. */
export type Team = {
   __typename?: 'Team',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The team's name. */
  name: Scalars['String'],
  /** The team's unique key. The key is used in URLs. */
  key: Scalars['String'],
  /** The team's description. */
  description?: Maybe<Scalars['String']>,
  /** Issues associated with the team. */
  issues: Array<Issue>,
  /** Cycles associated with the team. */
  cycles: Array<Cycle>,
  /** Projects associated with the team. */
  projects: Array<Project>,
  /** Other keys associated with the team. */
  keys: Array<Issue>,
  /** Labels associated with the team. */
  issueLabels: Array<IssueLabel>,
  /** The states that define the workflow associated with the team. */
  states: Array<WorkflowState>,
  /** The organization that the team is associated with. */
  organization: Organization,
  /** Whether the team uses cycles. */
  cyclesEnabled: Scalars['Boolean'],
  /** The day of the week that a new cycle starts. */
  cycleStartDay: Scalars['Float'],
  /** The duration of a cycle in weeks. */
  cycleDuration: Scalars['Float'],
  /** The cooldown time after each cycle in weeks. */
  cycleCooldownTime: Scalars['Float'],
  /** The timezone of the team. Defaults to "America/Los_Angeles" */
  timezone: Scalars['String'],
  /** The issue estimation type to use. */
  issueEstimationType: Scalars['String'],
  /** The workflow state into which issues are moved when a PR has been opened. */
  startWorkflowState?: Maybe<WorkflowState>,
  /** The workflow state into which issues are moved when a review has been requested for the PR. */
  reviewWorkflowState?: Maybe<WorkflowState>,
  /** The workflow state into which issues are moved when a PR has been merged. */
  mergeWorkflowState?: Maybe<WorkflowState>,
};

export type TeamCreateInput = {
  /** The identifier. If none is provided, the backend will generate one */
  id?: Maybe<Scalars['String']>,
  /** The name of the team. */
  name: Scalars['String'],
  /** The description of the team. */
  description?: Maybe<Scalars['String']>,
  /** The key of the team. If not given, a key will be generated based on the name of the team. */
  key?: Maybe<Scalars['String']>,
  /** The organization associated with the team. */
  organizationId?: Maybe<Scalars['String']>,
  /** Whether the team uses cycles. */
  cyclesEnabled?: Maybe<Scalars['Boolean']>,
  /** The day of the week that a new cycle starts. */
  cycleStartDay?: Maybe<Scalars['Float']>,
  /** The duration of each cycle in weeks. */
  cycleDuration?: Maybe<Scalars['Int']>,
  /** The cooldown time after each cycle in weeks. */
  cycleCooldownTime?: Maybe<Scalars['Int']>,
  /** The timezone of the team. */
  timezone?: Maybe<Scalars['String']>,
  /** The issue estimation type to use. */
  issueEstimationType?: Maybe<Scalars['String']>,
};

export type TeamPayload = {
   __typename?: 'TeamPayload',
  lastSyncId: Scalars['Float'],
  team?: Maybe<Team>,
  success: Scalars['Boolean'],
};

export type TeamUpdateInput = {
  /** The name of the team. */
  name?: Maybe<Scalars['String']>,
  /** The description of the team. */
  description?: Maybe<Scalars['String']>,
  /** The key of the team. */
  key?: Maybe<Scalars['String']>,
  /** Whether the team uses cycles. */
  cyclesEnabled?: Maybe<Scalars['Boolean']>,
  /** The day of the week that a new cycle starts. */
  cycleStartDay?: Maybe<Scalars['Float']>,
  /** The duration of each cycle in weeks. */
  cycleDuration?: Maybe<Scalars['Int']>,
  /** The cooldown time after each cycle in weeks. */
  cycleCooldownTime?: Maybe<Scalars['Int']>,
  /** The timezone of the team. */
  timezone?: Maybe<Scalars['String']>,
  /** The issue estimation type to use. */
  issueEstimationType?: Maybe<Scalars['String']>,
  /** The workflow state into which issues are moved when a PR has been opened. */
  startWorkflowStateId?: Maybe<Scalars['String']>,
  /** The workflow state into which issues are moved when a review has been requested for the PR. */
  reviewWorkflowStateId?: Maybe<Scalars['String']>,
  /** The workflow state into which issues are moved when a PR has been merged. */
  mergeWorkflowStateId?: Maybe<Scalars['String']>,
};

export type UpdateOrganizationInput = {
  /** The organization's name. */
  name: Scalars['String'],
};

export type UpdateUserInput = {
  /** The users name. */
  name?: Maybe<Scalars['String']>,
  /** The users display name. */
  displayName?: Maybe<Scalars['String']>,
  /** The users avatar image URL. */
  avatarUrl?: Maybe<Scalars['String']>,
  /** Whether the user account is active. */
  active?: Maybe<Scalars['Boolean']>,
  /** Whether the user account has admin privileges. */
  admin?: Maybe<Scalars['Boolean']>,
};

/** Object representing Google Cloud upload policy */
export type UploadFile = {
   __typename?: 'UploadFile',
  filename: Scalars['String'],
  contentType: Scalars['String'],
  uploadUrl: Scalars['String'],
  assetUrl: Scalars['String'],
};

export type UploadPayload = {
   __typename?: 'UploadPayload',
  lastSyncId: Scalars['Float'],
  uploadFile?: Maybe<UploadFile>,
  success: Scalars['Boolean'],
};

/** A user that has access to the the resources of an organization. */
export type User = {
   __typename?: 'User',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The user's full name. */
  name: Scalars['String'],
  /** The user's display (nick) name. Unique within each organization. */
  displayName: Scalars['String'],
  /** The user's email address. */
  email: Scalars['String'],
  /** An URL to the user's avatar image. */
  avatarUrl: Scalars['String'],
  /** Whether the use is an organization administrator. */
  admin: Scalars['Boolean'],
  /** Whether the user account is active or disabled. */
  active: Scalars['Boolean'],
  /** Issues created by the user. */
  createdIssues: Array<Issue>,
  /** Issues assigned to the user. */
  assignedIssues: Array<Issue>,
  /** Notifications associated with the user. */
  notifications: Array<Notification>,
  /** Push subscriptions associated with the user. */
  pushSubscriptions: Array<PushSubscription>,
  /** Pinned issues of the user. */
  pinnedIssues: Array<PinnedIssue>,
  /** Developer API keys associated with the user. */
  apiKeys: Array<ApiKey>,
  /** The organization that the user is associated with. */
  organization: Organization,
  /** The settings of the user. */
  settings: UserSettings,
};

/** A user account. */
export type UserAccount = {
   __typename?: 'UserAccount',
  /** The models identifier. */
  id: Scalars['ID'],
  /** The time at which the model was created. */
  createdAt: Scalars['DateTime'],
  /** The time at which the model was updated. */
  updatedAt: Scalars['DateTime'],
  /** The time at which the model was archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The user's name. */
  name: Scalars['String'],
  /** The user's email address. */
  email: Scalars['String'],
  /** The user that this user account is associated with */
  user: User,
};

export type UserGoogleAuthPayload = {
   __typename?: 'UserGoogleAuthPayload',
  lastSyncId: Scalars['Float'],
  token?: Maybe<Scalars['String']>,
  userId?: Maybe<Scalars['String']>,
};

export type UserPayload = {
   __typename?: 'UserPayload',
  lastSyncId: Scalars['Float'],
  user?: Maybe<User>,
  success: Scalars['Boolean'],
};

/** The settings of a user as a JSON object. */
export type UserSettings = {
   __typename?: 'UserSettings',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The email types the user has unsubscribed from. */
  unsubscribedFrom: Array<Scalars['String']>,
  /** The user to whom this notification was targeted for. */
  user: User,
};

export type UserSettingsFlagPayload = {
   __typename?: 'UserSettingsFlagPayload',
  lastSyncId: Scalars['Float'],
  /** The flag key which was updated. */
  flag: Scalars['String'],
  /** The flag value after update. */
  value: Scalars['Int'],
  success: Scalars['Boolean'],
};

export type UserSettingsFlagsResetPayload = {
   __typename?: 'UserSettingsFlagsResetPayload',
  lastSyncId: Scalars['Float'],
  success: Scalars['Boolean'],
};

export type UserSettingsPayload = {
   __typename?: 'UserSettingsPayload',
  lastSyncId: Scalars['Float'],
  /** The users settings. */
  userSettings: UserSettings,
  success: Scalars['Boolean'],
};

export type UserSettingsUpdateInput = {
  /** The user's settings. */
  settings?: Maybe<Scalars['String']>,
  /** The types of emails the user has unsubscribed from. */
  unsubscribedFrom?: Maybe<Array<Scalars['String']>>,
};

export type WaitListEntryCreateInput = {
  /** The users email address. */
  email: Scalars['String'],
};

export type WaitListEntryPayload = {
   __typename?: 'WaitListEntryPayload',
  success: Scalars['Boolean'],
};

export type WhiteListEntryCreateInput = {
  /** The domain or personal email address to whitelist. */
  entry: Scalars['String'],
  /** The email address of the user who created the entry. */
  createdByEmail?: Maybe<Scalars['String']>,
};

export type WhiteListEntryPayload = {
   __typename?: 'WhiteListEntryPayload',
  success: Scalars['Boolean'],
};

/** A state in a team workflow. */
export type WorkflowState = {
   __typename?: 'WorkflowState',
  /** The unique identifier of the entity. */
  id: Scalars['ID'],
  /** The time at which the entity was created. */
  createdAt: Scalars['DateTime'],
  /** 
 * The last time at which the entity was updated. This is the same as the creation time if the 
   *     entity hasn't been update after creation.
 **/
  updatedAt: Scalars['DateTime'],
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Maybe<Scalars['DateTime']>,
  /** The state's name. */
  name: Scalars['String'],
  /** The state's UI color as a HEX string. */
  color: Scalars['String'],
  /** Description of the state. */
  description?: Maybe<Scalars['String']>,
  /** The position of the state in the team flow. */
  position: Scalars['Float'],
  /** The type of the state. */
  type: Scalars['String'],
  /** Issues belonging in this workflow state. */
  issues: Array<Issue>,
  /** The team to which this state belongs to. */
  team: Team,
};

export type WorkflowStateCreateInput = {
  /** The identifier. If none is provided, the backend will generate one. */
  id?: Maybe<Scalars['String']>,
  /** The workflow type. */
  type: Scalars['String'],
  /** The name of the workflow state. */
  name: Scalars['String'],
  /** The color of the state. */
  color: Scalars['String'],
  /** The description of the state. */
  description?: Maybe<Scalars['String']>,
  /** The position of the state. */
  position?: Maybe<Scalars['Float']>,
  /** The team associated with the state. */
  teamId: Scalars['String'],
};

export type WorkflowStatePayload = {
   __typename?: 'WorkflowStatePayload',
  lastSyncId: Scalars['Float'],
  workflowState: WorkflowState,
  success: Scalars['Boolean'],
};

export type WorkflowStateUpdateInput = {
  /** The name of the state. */
  name?: Maybe<Scalars['String']>,
  /** The color of the state. */
  color?: Maybe<Scalars['String']>,
  /** The description of the state. */
  description?: Maybe<Scalars['String']>,
  /** The position of the state. */
  position?: Maybe<Scalars['Float']>,
};
