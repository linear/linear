import { makeBindingClass, Options } from "graphql-binding";
import { GraphQLResolveInfo, GraphQLSchema } from "graphql";
import { IResolvers } from "graphql-tools/dist/Interfaces";
import schema from "./schema";

export interface Query {
  syncBootstrap: <T = SyncResponse>(
    args: { databaseVersion: Float; sinceId: Float },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  syncUpdates: <T = SyncResponse>(
    args: { sinceId: Float },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  apiKeys: <T = Array<ApiKey>>(
    args?: {},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  comments: <T = Array<Comment>>(
    args?: {},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  comment: <T = Comment>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  integrations: <T = Array<Integration>>(
    args?: {},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  integration: <T = Integration>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  integrationResources: <T = Array<IntegrationResource>>(
    args?: {},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  integrationResource: <T = IntegrationResource>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  issueLabels: <T = Array<IssueLabel>>(
    args?: {},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  issueLabel: <T = IssueLabel>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  issues: <T = Array<Issue>>(
    args?: {},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  issue: <T = Issue>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  notifications: <T = Array<Notification>>(
    args?: {},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  notification: <T = UserSettings>(
    args?: {},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  organizations: <T = Array<Organization>>(
    args?: {},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  organization: <T = Organization>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  projects: <T = Array<Project>>(
    args?: {},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  project: <T = Project>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  projectStates: <T = Array<ProjectState>>(
    args?: {},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  projectState: <T = ProjectState>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  users: <T = Array<User>>(
    args?: {},
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  user: <T = User>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
}

export interface Mutation {
  apiKeyCreate: <T = ApiKeyPayload>(
    args: { input: ApiKeyCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  apiKeyArchive: <T = ArchivePayload>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  commentCreate: <T = CommentPayload>(
    args: { input: CommentCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  commentUpdate: <T = CommentPayload>(
    args: { input: CommentUpdateInput; id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  commentArchive: <T = ArchivePayload>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  imageUpload: <T = ImageUploadPayload>(
    args: { contentType: String; filename: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  integrationGithubConnect: <T = IntegrationPayload>(
    args: { installationId: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  integrationSlack: <T = IntegrationPayload>(
    args: { redirectUri: String; code: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  integrationSlackPost: <T = IntegrationPayload>(
    args: { redirectUri: String; projectId: String; code: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  integrationArchive: <T = ArchivePayload>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  integrationResourceArchive: <T = ArchivePayload>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  issueLabelCreate: <T = IssueLabelPayload>(
    args: { input: IssueLabelCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  issueLabelArchive: <T = ArchivePayload>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  issueCreate: <T = IssuePayload>(
    args: { input: IssueCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  issueUpdate: <T = IssuePayload>(
    args: { input: IssueUpdateInput; id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  issueClose: <T = IssuePayload>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  issueArchive: <T = ArchivePayload>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  notificationUpdate: <T = NotificationPayload>(
    args: { input: NotificationUpdateInput; id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  notificationArchive: <T = ArchivePayload>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  organizationCreate: <T = OrganizationPayload>(
    args: { input: CreateOrganizationInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  organizationUpdate: <T = OrganizationPayload>(
    args: { input: UpdateOrganizationInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  projectCreate: <T = ProjectPayload>(
    args: { input: ProjectCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  projectUpdate: <T = ProjectPayload>(
    args: { input: ProjectUpdateInput; id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  projectArchive: <T = ArchivePayload>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  projectStateCreate: <T = ProjectStatePayload>(
    args: { input: ProjectStateCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  projectStateUpdate: <T = ProjectStatePayload>(
    args: { input: ProjectStateUpdateInput; id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  projectStateArchive: <T = ArchivePayload>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  pushSubscriptionCreate: <T = PushSubscriptionPayload>(
    args: { input: PushSubscriptionCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  pushSubscriptionArchive: <T = PushSubscriptionPayload>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  userAccountGoogleAuth: <T = UserGoogleAuthPayload>(
    args: { code: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  userCreate: <T = UserPayload>(
    args: { input: CreateUserInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  userUpdate: <T = UserPayload>(
    args: { input: UpdateUserInput; id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  userArchive: <T = ArchivePayload>(
    args: { id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  userSettingsUpdate: <T = UserSettingsPayload>(
    args: { input: UserSettingsUpdateInput; id: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
}

export interface Subscription {}

export interface BindingInstance {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
  request: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;
  delegate(
    operation: "query" | "mutation",
    fieldName: string,
    args: {
      [key: string]: any;
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options
  ): Promise<any>;
  delegateSubscription(
    fieldName: string,
    args?: {
      [key: string]: any;
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options
  ): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new (...args: any[]): T;
}

export const Binding = makeBindingClass<BindingConstructor<BindingInstance>>({
  schema
});

/**
 * Types
 */

export interface ApiKeyCreateInput {
  id?: String | null;
  label: String;
  key: String;
}

export interface CommentCreateInput {
  id?: String | null;
  body: String;
  issueId: String;
}

export interface CommentUpdateInput {
  body: String;
}

export interface CreateOrganizationInput {
  id?: String | null;
  name: String;
}

export interface CreateUserInput {
  id?: String | null;
  name: String;
  displayName: String;
  email: String;
  avatarUrl?: String | null;
  organizationId?: String | null;
}

export interface IssueCreateInput {
  id?: String | null;
  title: String;
  description?: String | null;
  assigneeId?: String | null;
  subscriberIds?: String[] | String | null;
  labelIds?: String[] | String | null;
  projectId: String;
  stateId?: String | null;
  boardOrder?: Float;
}

export interface IssueLabelCreateInput {
  id?: String | null;
  name: String;
  description?: String | null;
  color?: String | null;
  projectId: String;
}

export interface IssueUpdateInput {
  title?: String | null;
  description?: String | null;
  assigneeId?: String | null;
  subscriberIds?: String[] | String | null;
  labelIds?: String[] | String | null;
  projectId?: String | null;
  stateId?: String | null;
  boardOrder?: Float | null;
}

export interface NotificationUpdateInput {
  readAt?: DateTime | null;
}

export interface ProjectCreateInput {
  id?: String | null;
  name: String;
  description?: String | null;
  key?: String | null;
  organizationId?: String | null;
}

export interface ProjectStateCreateInput {
  id?: String | null;
  name: String;
  emoji?: String | null;
  description?: String | null;
  projectId: String;
}

export interface ProjectStateUpdateInput {
  name: String;
  emoji?: String | null;
  description?: String | null;
}

export interface ProjectUpdateInput {
  name?: String | null;
  description?: String | null;
  key?: String | null;
}

export interface PushSubscriptionCreateInput {
  id?: String | null;
  userId: String;
  data: String;
}

export interface UpdateOrganizationInput {
  name: String;
}

export interface UpdateUserInput {
  name?: String | null;
  displayName?: String | null;
  email?: String | null;
  avatarUrl?: String | null;
  organizationId?: String | null;
}

export interface UserSettingsUpdateInput {
  settings?: String | null;
}

/*
 * An API key

 */
export interface ApiKey {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
  label: String;
}

export interface ApiKeyPayload {
  userError: Array<String>;
  apiKey: ApiKey;
}

export interface ArchivePayload {
  userError: Array<String>;
}

/*
 * The base class of a backend entity object. Not to be used directly.

 */
export interface BackendEntity {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
}

/*
 * The base class of a model object. Not to be used directly

 */
export interface ClientEntity {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
}

/*
 * An issue comment

 */
export interface Comment {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
  body: String;
  issue: Issue;
  user: User;
}

export interface CommentPayload {
  userError: Array<String>;
  comment: Comment;
}

/*
 * GitHub's commit data

 */
export interface GitHubCommitPayload {
  id: String;
  message: String;
  timestamp: String;
  url: String;
  added: Array<String>;
  removed: Array<String>;
  modified: Array<String>;
}

/*
 * GitHub's pull request data

 */
export interface GitHubPullRequestPayload {
  status: String;
  number: Float;
  url: String;
  id: String;
  title: String;
  userId: String;
  userLogin: String;
  createdAt: String;
  updatedAt: String;
  closedAt: String;
  mergedAt: String;
}

export interface ImageUploadPayload {
  userError: Array<String>;
  uploadFile?: UploadFile | null;
}

/*
 * An integration to external service

 */
export interface Integration {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
  service: String;
  serviceId?: String | null;
  organization: Organization;
  project?: Project | null;
  creator: User;
  settings: IntegrationSettings;
}

export interface IntegrationPayload {
  userError: Array<String>;
  integration?: Integration | null;
}

/*
 * An integration resource from external service

 */
export interface IntegrationResource {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
  resourceType: String;
  resourceId: String;
  integration: Integration;
  issue: Issue;
  data: IntegrationResourceData;
}

/*
 * Integration resource's payload

 */
export interface IntegrationResourceData {
  githubPullRequest?: GitHubPullRequestPayload | null;
  githubCommit?: GitHubCommitPayload | null;
}

/*
 * Integration resource's payload

 */
export interface IntegrationSettings {
  slackPost?: SlackPostSettings | null;
}

/*
 * An issue.

 */
export interface Issue {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
  number: Float;
  title: String;
  description?: String | null;
  comments: Array<Comment>;
  labels: Array<IssueLabel>;
  project: Project;
  creator: User;
  assignee?: User | null;
  subscribers: Array<User>;
  state: ProjectState;
  boardOrder: Float;
  startedAt?: DateTime | null;
  completedAt?: DateTime | null;
  canceledAt?: DateTime | null;
}

/*
 * Issue labels.

 */
export interface IssueLabel {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
  name: String;
  description?: String | null;
  color: String;
  project: Project;
  creator?: User | null;
}

export interface IssueLabelPayload {
  userError: Array<String>;
  issueLabel: IssueLabel;
}

export interface IssuePayload {
  userError: Array<String>;
  issue?: Issue | null;
}

/*
 * A user notification

 */
export interface Notification {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
  type: String;
  user: User;
  issue: Issue;
  project: Project;
  readAt?: DateTime | null;
}

export interface NotificationPayload {
  userError: Array<String>;
  notification: Notification;
}

/*
 * Organizations contain user accounts and projects.

 */
export interface Organization {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
  name: String;
  pictureUrl?: String | null;
  projects: Array<Project>;
  users: Array<User>;
}

export interface OrganizationPayload {
  userError: Array<String>;
  organization?: Organization | null;
}

/*
 * A project that contains issues.

 */
export interface Project {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
  name: String;
  key: String;
  description?: String | null;
  issues: Array<Issue>;
  keys: Array<Issue>;
  issueLabels: Array<IssueLabel>;
  states: Array<ProjectState>;
  organization: Organization;
}

export interface ProjectPayload {
  userError: Array<String>;
  project?: Project | null;
}

/*
 * Individual state in an issue workflow.

 */
export interface ProjectState {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
  name: String;
  emoji?: String | null;
  description?: String | null;
  position: Float;
  type: String;
  issues: Array<Issue>;
  project: Project;
}

export interface ProjectStatePayload {
  userError: Array<String>;
  projectState: ProjectState;
}

/*
 * A user's push subscription.

 */
export interface PushSubscription {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
}

export interface PushSubscriptionPayload {
  userError: Array<String>;
}

export interface SlackPostSettings {
  channel: String;
  channelId: String;
  configurationUrl: String;
}

/*
 * A transport model for sync responses

 */
export interface SyncResponse {
  type: String;
  data: String;
  lastSyncId: Float;
  databaseVersion: Float;
}

/*
 * Object representing Google Cloud upload policy

 */
export interface UploadFile {
  filename: String;
  contentType: String;
  uploadUrl: String;
  assetUrl: String;
}

/*
 * A user.

 */
export interface User {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
  name: String;
  displayName: String;
  email: Email;
  avatarUrl: String;
  createdIssues: Array<Issue>;
  assignedIssues: Array<Issue>;
  notifications: Array<Notification>;
  pushSubscriptions: Array<PushSubscription>;
  apiKeys: Array<ApiKey>;
  organization: Organization;
  settings: UserSettings;
}

/*
 * A user account.

 */
export interface UserAccount {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
  name: String;
  email: Email;
  user: User;
}

export interface UserGoogleAuthPayload {
  token?: String | null;
  userId?: String | null;
}

export interface UserPayload {
  userError: Array<String>;
  user?: User | null;
}

/*
 * The settings of a user.

 */
export interface UserSettings {
  id: UUID;
  createdAt: DateTime;
  updatedAt: DateTime;
  archivedAt?: DateTime | null;
  user: User;
  sidebarCollapsed: Boolean;
}

export interface UserSettingsPayload {
  userError: Array<String>;
  userSettings: UserSettings;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The DateTime scalar type represents date time strings complying to ISO-8601.
*/
export type DateTime = Date | string;

/*
The Email scalar type represents E-Mail addresses compliant to RFC 822.
*/
export type Email = string;

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
export type Float = number;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The UUID scalar type represents a UUID.
*/
export type UUID = string;
