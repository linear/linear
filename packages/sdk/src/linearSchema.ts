/**
 * Copy&paste from schema-raw.graphql
 */
export default `
# source: http://localhost:8090/graphql
# timestamp: Sat Jan 19 2019 16:33:21 GMT-0800 (Pacific Standard Time)

"""An API key"""
type ApiKey {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime

  """Key label."""
  label: String!
}

input ApiKeyCreateInput {
  """The identifier. If none is provided, the backend will generate one"""
  id: String

  """The API key label."""
  label: String!

  """The API key value (format: /^[a-zA-Z0-9]{40}$/)."""
  key: String!
}

type ApiKeyPayload {
  userError: [String!]!
  apiKey: ApiKey!
}

type ArchivePayload {
  userError: [String!]!
}

"""The base class of a backend entity object. Not to be used directly."""
type BackendEntity {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime
}

"""The base class of a model object. Not to be used directly"""
type ClientEntity {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime
}

"""An issue comment"""
type Comment {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime

  """Comment content in markdown format."""
  body: String!

  """Comment content as a Prosemirror document."""
  bodyData: JSON

  """The issue that the comment is associated with."""
  issue: Issue!

  """The user who wrote the comment"""
  user: User!
}

input CommentCreateInput {
  """The identifier. If none is provided, the backend will generate one"""
  id: String

  """The comment content in markdown format."""
  body: String!

  """The comment content as a Prosemirror document."""
  bodyData: JSON

  """The issue to associate the comment with."""
  issueId: String!
}

type CommentPayload {
  userError: [String!]!
  comment: Comment!
}

input CommentUpdateInput {
  """The comment content."""
  body: String!

  """The comment content as a Prosemirror document."""
  bodyData: JSON
}

input CreateOrganizationInput {
  """The identifier. If none is provided, the backend will generate one"""
  id: String

  """The groups name."""
  name: String!
}

input CreateUserInput {
  """The identifier. If none is provided, the backend will generate one"""
  id: String

  """The users name."""
  name: String!

  """The users display name."""
  displayName: String!

  """The users email address."""
  email: String!

  """The users avatar image URL."""
  avatarUrl: String

  """The organization associated with the user."""
  organizationId: String
}

"""
The DateTime scalar type represents date time strings complying to ISO-8601.
"""
scalar DateTime

"""
The Email scalar type represents E-Mail addresses compliant to RFC 822.
"""
scalar Email

"""GitHub's commit data"""
type GitHubCommitPayload {
  id: String!
  message: String!
  timestamp: String!
  url: String!
  added: [String!]!
  removed: [String!]!
  modified: [String!]!
}

"""GitHub's pull request data"""
type GitHubPullRequestPayload {
  status: String!
  number: Float!
  url: String!
  id: String!
  title: String!
  userId: String!
  userLogin: String!
  createdAt: String!
  updatedAt: String!
  closedAt: String!
  mergedAt: String!
}

type ImageUploadPayload {
  userError: [String!]!
  uploadFile: UploadFile
}

"""An integration to external service"""
type Integration {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime

  """The integration's type."""
  service: String!

  """The external service ID."""
  serviceId: String

  """The organization that the integration is associated with."""
  organization: Organization!

  """The project that the integration is associated with."""
  project: Project

  """The user who added the integration"""
  creator: User!

  """Settings related to the integration."""
  settings: IntegrationSettings!
}

type IntegrationPayload {
  userError: [String!]!
  integration: Integration
}

"""An integration resource from external service"""
type IntegrationResource {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime

  """The integration's type."""
  resourceType: String!

  """The external service resource ID."""
  resourceId: String!

  """The integration that the resource is associated with."""
  integration: Integration!

  """The issue that the resource is associated with."""
  issue: Issue!

  """Detailed information about the external resource."""
  data: IntegrationResourceData!
}

"""Integration resource's payload"""
type IntegrationResourceData {
  githubPullRequest: GitHubPullRequestPayload
  githubCommit: GitHubCommitPayload
}

"""Integration resource's payload"""
type IntegrationSettings {
  slackPost: SlackPostSettings
}

"""An issue."""
type Issue {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime

  """The issue's unique number."""
  number: Float!

  """The issue's title."""
  title: String!

  """The issue's description in markdown format."""
  description: String

  """The issue's description as a Prosemirror document."""
  descriptionData: JSON

  """The priority of the issue."""
  priority: Float!

  """Comments associated with the issue"""
  comments: [Comment!]!

  """The project that the issue is associated with."""
  project: Project!

  """The user who created the issue."""
  creator: User!

  """The user to whom the issue is assigned to."""
  assignee: User

  """Users who are subscribed to the issue."""
  subscribers: [User!]!

  """The workflow state that the issue is associated with."""
  state: ProjectState!

  """The order of the item in its column on the board."""
  boardOrder: Float!

  """The time at which the issue was moved into started state."""
  startedAt: DateTime

  """The time at which the issue was moved into completed state."""
  completedAt: DateTime

  """The time at which the issue was moved into canceled state."""
  canceledAt: DateTime
  labels: [IssueLabel!]!
}

input IssueCreateInput {
  """The identifier. If none is provided, the backend will generate one"""
  id: String

  """The issue's title."""
  title: String!

  """The issue description in markdown format."""
  description: String

  """The issue description as a Prosemirror document."""
  descriptionData: JSON

  """The id of the user to assign the issue to."""
  assigneeId: String

  """The priority of the issue"""
  priority: Float

  """The ids of the users subscribing to this ticket."""
  subscriberIds: [String!]

  """The ids of the issue labels associated with this ticket."""
  labelIds: [String!]

  """The project to associate the issue with."""
  projectId: String!

  """The project state which the issue is assigned."""
  stateId: String

  """The order of the item in its column on the board."""
  boardOrder: Float
}

"""Issue labels."""
type IssueLabel {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime

  """The issue label's name."""
  name: String!

  """The issue label's description."""
  description: String

  """The label color."""
  color: String!

  """The parent project in which this label belongs to."""
  project: Project!

  """The user who created the label."""
  creator: User
}

input IssueLabelCreateInput {
  """The identifier. If none is provided, the backend will generate one"""
  id: String

  """The issue label's name."""
  name: String!

  """The issue label's description."""
  description: String

  """The issue label's color."""
  color: String

  """The project to associate the issue label with."""
  projectId: String!
}

type IssueLabelPayload {
  userError: [String!]!
  issueLabel: IssueLabel!
}

type IssuePayload {
  userError: [String!]!
  issue: Issue
}

input IssueUpdateInput {
  """The issue's title."""
  title: String

  """The issue description in markdown format."""
  description: String

  """The issue description as a Prosemirror document."""
  descriptionData: JSON

  """The id of the user to assign the issue to."""
  assigneeId: String

  """The priority of the issue."""
  priority: Float

  """The ids of the users subscribing to this ticket."""
  subscriberIds: [String!]

  """The ids of the issue labels associated with this ticket."""
  labelIds: [String!]

  """The project to associate the issue with."""
  projectId: String

  """The project state which the issue is assigned."""
  stateId: String

  """The order of the item in its column on the board."""
  boardOrder: Float
}

"""
The JSON scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
"""
scalar JSON

type Mutation {
  """Creates a new api key."""
  apiKeyCreate(
    """The api key object to create."""
    input: ApiKeyCreateInput!
  ): ApiKeyPayload!

  """Archives an api key."""
  apiKeyArchive(
    """The identifier of the api key to archive."""
    id: String!
  ): ArchivePayload!

  """Creates a new comment."""
  commentCreate(
    """The comment object to create."""
    input: CommentCreateInput!
  ): CommentPayload!

  """Updates a comment."""
  commentUpdate(
    """A partial comment object to update the issue with."""
    input: CommentUpdateInput!

    """The identifier of the comment to update."""
    id: String!
  ): CommentPayload!

  """Archives a comment."""
  commentArchive(
    """The identifier of the comment to archive."""
    id: String!
  ): ArchivePayload!

  """
  XHR request payload to upload an image directly to Google Cloud Storage
  """
  imageUpload(
    """Upload mime-type"""
    contentType: String!

    """Filename of the uploaded file"""
    filename: String!
  ): ImageUploadPayload!

  """Connects with Github App."""
  integrationGithubConnect(
    """The Github data to connect with."""
    installationId: String!
  ): IntegrationPayload!

  """Save regular Slack integration."""
  integrationSlack(
    """The Slack OAuth redirect URI."""
    redirectUri: String!

    """The Slack OAuth code."""
    code: String!
  ): IntegrationPayload!

  """Save Slack webhook integration."""
  integrationSlackPost(
    """The Slack OAuth redirect URI."""
    redirectUri: String!

    """Integration's associated project."""
    projectId: String!

    """The Slack OAuth code."""
    code: String!
  ): IntegrationPayload!

  """Archives an integration."""
  integrationArchive(
    """The identifier of the integration to archive."""
    id: String!
  ): ArchivePayload!

  """Archives an integration resource."""
  integrationResourceArchive(
    """The identifier of the integration resource to archive."""
    id: String!
  ): ArchivePayload!

  """Creates a new issue label."""
  issueLabelCreate(
    """The issue label object to create."""
    input: IssueLabelCreateInput!
  ): IssueLabelPayload!

  """Archives an issue label."""
  issueLabelArchive(
    """The identifier of the issue label to archive."""
    id: String!
  ): ArchivePayload!

  """Creates a new issue."""
  issueCreate(
    """The issue object to create."""
    input: IssueCreateInput!
  ): IssuePayload!

  """Updates an issue."""
  issueUpdate(
    """A partial issue object to update the issue with."""
    input: IssueUpdateInput!

    """The identifier of the issue to update."""
    id: String!
  ): IssuePayload!

  """Closes an issue by moving it into the first completed state."""
  issueClose(
    """The identifier of the issue to close."""
    id: String!
  ): IssuePayload!

  """Archives an issue."""
  issueArchive(
    """The identifier of the issue to archive."""
    id: String!
  ): ArchivePayload!

  """Updates a notification."""
  notificationUpdate(
    """A partial notification object to update the issue with."""
    input: NotificationUpdateInput!

    """The identifier of the notification to update."""
    id: String!
  ): NotificationPayload!

  """Archives a notification."""
  notificationArchive(
    """The identifier of the notification to archive."""
    id: String!
  ): ArchivePayload!

  """Creates a new organization."""
  organizationCreate(
    """The organization object to create."""
    input: CreateOrganizationInput!
  ): OrganizationPayload!

  """Updates the users organization."""
  organizationUpdate(
    """A partial organization object to update the organization with."""
    input: UpdateOrganizationInput!
  ): OrganizationPayload!

  """Creates a new project."""
  projectCreate(
    """The project object to create."""
    input: ProjectCreateInput!
  ): ProjectPayload!

  """Updates a project."""
  projectUpdate(
    """A partial project object to update the project with."""
    input: ProjectUpdateInput!

    """The identifier of the project to update"""
    id: String!
  ): ProjectPayload!

  """Archives a project."""
  projectArchive(
    """The identifier of the project to archive"""
    id: String!
  ): ArchivePayload!

  """Creates a new project workflow state."""
  projectStateCreate(
    """The project workflow state object to create."""
    input: ProjectStateCreateInput!
  ): ProjectStatePayload!

  """Updates a project workflow state."""
  projectStateUpdate(
    """A partial project workflow state object to update."""
    input: ProjectStateUpdateInput!

    """The identifier of the project workflow state to update."""
    id: String!
  ): ProjectStatePayload!

  """
  Archives a project workflow state. Only states with issues that have been archived can be archived themselves.
  """
  projectStateArchive(
    """The identifier of the project workflow state to archive."""
    id: String!
  ): ArchivePayload!

  """Creates a push subscription."""
  pushSubscriptionCreate(
    """The subscription to create."""
    input: PushSubscriptionCreateInput!
  ): PushSubscriptionPayload!

  """Archives a PushSubscription."""
  pushSubscriptionArchive(
    """The identifier of the PushSubscription to archive"""
    id: String!
  ): PushSubscriptionPayload!

  """Second step of Google's OAuth flow"""
  userAccountGoogleAuth(
    """Code returned from Google's OAuth flow"""
    code: String!
  ): UserGoogleAuthPayload!

  """Creates a new user."""
  userCreate(
    """The user object to create."""
    input: CreateUserInput!
  ): UserPayload!

  """Updates a user."""
  userUpdate(
    """A partial user object to update the user with."""
    input: UpdateUserInput!

    """The identifier of the user to update."""
    id: String!
  ): UserPayload!

  """Archives a user."""
  userArchive(
    """The identifier of the user to archive."""
    id: String!
  ): ArchivePayload!

  """Updates user settings."""
  userSettingsUpdate(
    """A partial notification object to update the settings with."""
    input: UserSettingsUpdateInput!

    """The identifier of the userSettings to update"""
    id: String!
  ): UserSettingsPayload!
}

"""A user notification"""
type Notification {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime

  """Notification type"""
  type: String!

  """The user to whom this notification was targeted for."""
  user: User!

  """The issue that the notification is associated with."""
  issue: Issue!

  """The project which the notification is associated with"""
  project: Project!

  """The time at when the user marked it as read."""
  readAt: DateTime
}

type NotificationPayload {
  userError: [String!]!
  notification: Notification!
}

input NotificationUpdateInput {
  """The time when notification was marked as read."""
  readAt: DateTime
}

"""Organizations contain user accounts and projects."""
type Organization {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime

  """The organizations name."""
  name: String!

  """The organizations picture."""
  pictureUrl: String

  """Projects associated with the organization."""
  projects: [Project!]!

  """Users associated with the organization."""
  users: [User!]!
}

type OrganizationPayload {
  userError: [String!]!
  organization: Organization
}

"""A project that contains issues."""
type Project {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime

  """The project's name."""
  name: String!

  """The project's unique key."""
  key: String!

  """The project's description."""
  description: String

  """Issues associated with the project"""
  issues: [Issue!]!

  """Keys associated with the project"""
  keys: [Issue!]!

  """Issue labels associated with the project."""
  issueLabels: [IssueLabel!]!

  """Issues belonging in this workflow state"""
  states: [ProjectState!]!

  """The organization that the project is associated with."""
  organization: Organization!
}

input ProjectCreateInput {
  """The identifier. If none is provided, the backend will generate one"""
  id: String

  """The name of the project."""
  name: String!

  """The description of the project."""
  description: String

  """
  The key of the project. If not given, a key will be generated based on the name of the project.
  """
  key: String

  """The organization associated with the project."""
  organizationId: String
}

type ProjectPayload {
  userError: [String!]!
  project: Project
}

"""Individual state in an issue workflow."""
type ProjectState {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime

  """The state's name."""
  name: String!

  """The state's emoji."""
  emoji: String

  """Information about the state."""
  description: String

  """Position of the state in the project flow."""
  position: Float!

  """State type."""
  type: String!

  """Issues belonging in this workflow state"""
  issues: [Issue!]!

  """The parent project in which this state belongs to."""
  project: Project!
}

input ProjectStateCreateInput {
  """The identifier. If none is provided, the backend will generate one"""
  id: String

  """The name of the workflow state."""
  name: String!

  """The name of the workflow state."""
  emoji: String

  """The description of the workflow state."""
  description: String

  """The project to associate the workflow state with."""
  projectId: String!
}

type ProjectStatePayload {
  userError: [String!]!
  projectState: ProjectState!
}

input ProjectStateUpdateInput {
  """The name of the workflow state."""
  name: String!

  """The name of the workflow state."""
  emoji: String

  """The description of the workflow state."""
  description: String
}

input ProjectUpdateInput {
  """The name of the project."""
  name: String

  """The description of the project."""
  description: String

  """The key of the project."""
  key: String
}

"""A user's push subscription."""
type PushSubscription {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime
}

input PushSubscriptionCreateInput {
  """The identifier. If none is provided, the backend will generate one"""
  id: String

  """The user id of the subscription"""
  userId: String!

  """The data of the subscription in stringified JSON format"""
  data: String!
}

type PushSubscriptionPayload {
  userError: [String!]!
}

type Query {
  """Fetches all data for the user."""
  syncBootstrap(databaseVersion: Float!, sinceId: Float!): SyncResponse!

  """Fetches all data for the user."""
  syncUpdates(sinceId: Float!): SyncResponse!

  """Fetches all api keys."""
  apiKeys: [ApiKey!]!

  """Fetches all comments."""
  comments: [Comment!]!

  """Fetches a specific comment."""
  comment(id: String!): Comment!

  """Fetches all integrations."""
  integrations: [Integration!]!

  """Fetches a specific integration."""
  integration(id: String!): Integration!

  """
  Fetches all integrations resources (e.g. linked GitHub pull requests for issues).
  """
  integrationResources: [IntegrationResource!]!

  """
  Fetches a specific integration resource (e.g. linked GitHub pull requests for an issue).
  """
  integrationResource(id: String!): IntegrationResource!

  """Fetches all issue labels."""
  issueLabels: [IssueLabel!]!

  """Fetches a specific issue label."""
  issueLabel(id: String!): IssueLabel!

  """Fetches all issues."""
  issues: [Issue!]!

  """Fetches a specific issue."""
  issue(id: String!): Issue!

  """Fetches all notifications."""
  notifications: [Notification!]!

  """Fetches the users settings."""
  notification: UserSettings!

  """Fetches the users organization."""
  organizations: [Organization!]!

  """Fetches the users organization."""
  organization(id: String!): Organization!

  """Fetches all projects."""
  projects: [Project!]!

  """Fetches a specific project."""
  project(id: String!): Project!

  """Fetches all project workflow states."""
  projectStates: [ProjectState!]!

  """Fetches a specific project workflow state."""
  projectState(id: String!): ProjectState!

  """Fetches all users."""
  users: [User!]!

  """Fetches a specific user."""
  user(id: String!): User!
}

type SlackPostSettings {
  channel: String!
  channelId: String!
  configurationUrl: String!
}

"""A transport model for sync responses"""
type SyncResponse {
  """The type of the sync response"""
  type: String!

  """The serialized data associated with the sync response"""
  data: String!

  """The last id covered by the response"""
  lastSyncId: Float!

  """
  The version of the database. Increased by 1 for each migration run on the database
  """
  databaseVersion: Float!
}

input UpdateOrganizationInput {
  """The groups name."""
  name: String!
}

input UpdateUserInput {
  """The users name."""
  name: String

  """The users display name."""
  displayName: String

  """The users email address."""
  email: String

  """The users avatar image URL."""
  avatarUrl: String

  """The organization associated with the user."""
  organizationId: String
}

"""Object representing Google Cloud upload policy"""
type UploadFile {
  filename: String!
  contentType: String!
  uploadUrl: String!
  assetUrl: String!
}

"""A user."""
type User {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime

  """The user's full name."""
  name: String!

  """The user's display (nick) name."""
  displayName: String!

  """The user's email address."""
  email: Email!

  """An URL to the user's avatar image"""
  avatarUrl: String!

  """Issues created by the user."""
  createdIssues: [Issue!]!

  """Issues assigned to the user."""
  assignedIssues: [Issue!]!

  """Notifications assigned to the user."""
  notifications: [Notification!]!

  """Push subscriptions of the user."""
  pushSubscriptions: [PushSubscription!]!

  """Developer API keys of the user."""
  apiKeys: [ApiKey!]!

  """The organization that the user is associated with."""
  organization: Organization!

  """The settings of the user"""
  settings: UserSettings!
}

"""A user account."""
type UserAccount {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime

  """The user's name."""
  name: String!

  """The user's email address."""
  email: Email!

  """The user that this user account is associated with"""
  user: User!
}

type UserGoogleAuthPayload {
  token: String
  userId: String
}

type UserPayload {
  userError: [String!]!
  user: User
}

"""The settings of a user."""
type UserSettings {
  """The models identifier."""
  id: UUID!

  """The time at which the model was created."""
  createdAt: DateTime!

  """The time at which the model was updated."""
  updatedAt: DateTime!

  """The time at which the model was archived."""
  archivedAt: DateTime

  """The user to whom this notification was targeted for."""
  user: User!

  """Whether the navigation sidebar is collapsed."""
  sidebarCollapsed: Boolean!
}

type UserSettingsPayload {
  userError: [String!]!

  """The users settings."""
  userSettings: UserSettings!
}

input UserSettingsUpdateInput {
  """The user's settings"""
  settings: String
}

"""The UUID scalar type represents a UUID."""
scalar UUID
`;
