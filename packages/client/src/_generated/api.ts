/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocumentNode } from "graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import * as D from "./documents";
export * from "./documents";

/**
 * The function type for calling the graphql client
 */
export type LinearRequester<O = {}> = <R, V>(doc: DocumentNode, vars?: V, opts?: O) => Promise<R>;

/**
 * Initialise a set of operations to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations
 */
export function createLinearSdk<O>(requester: LinearRequester<O>) {
  return {
    /** user */
    /** viewer */
    /** organization */
    /** organizationExists */
    /** syncBootstrap */
    /** syncUpdates */
    /** archivedModelSync */
    /** archivedModelsSync */
    /** users */
    /** apiKeys */
    /** application */
    /** authorizedApplications */
    /** availableUsers */
    /** ssoUrlFromEmail */
    /** billingDetails */
    /** collaborativeDocumentJoin */
    /** comment */
    /** comments */
    /** customView */
    /** customViews */
    /** cycle */
    /** cycles */
    /** emoji */
    /** emojis */
    /** favorite */
    /** favorites */
    /** figmaEmbedInfo */
    /** integration */
    /** integrations */
    /** integrationResource */
    /** integrationResources */
    /** inviteInfo */
    /** issueLabel */
    /** issueLabels */
    /** issueRelation */
    /** issueRelations */
    /** issue */
    /** issueSearch */
    /** issues */
    /** milestone */
    /** milestones */
    /** notification */
    /** notifications */
    /** notificationSubscription */
    /** organizationInvite */
    /** organizationInvites */
    /** projectLink */
    /** ProjectLinks */
    /** project */
    /** projects */
    /** pushSubscriptionTest */
    /** reaction */
    /** reactions */
    /** subscription */
    /** teamMembership */
    /** teamMemberships */
    /** team */
    /** teams */
    /** templates */
    /** template */
    /** viewPreferences */
    /** webhook */
    /** webhooks */
    /** workflowState */
    /** workflowStates */
    /** userUpdate */
    /** userSuspend */
    /** userUnsuspend */
    /** organizationUpdate */
    /** organizationDeleteChallenge */
    /** organizationDelete */
    /** organizationToggleAccess */
    /** organizationChangeEmailDomain */
    /** organizationToggleSamlEnabled */
    /** organizationConfigureSaml */
    /** eventCreate */
    /** apiKeyCreate */
    /** apiKeyDelete */
    /** emailUserAccountAuthChallenge */
    /** emailTokenUserAccountAuth */
    /** samlTokenUserAccountAuth */
    /** googleUserAccountAuth */
    /** createOrganizationFromOnboarding */
    /** joinOrganizationFromOnboarding */
    /** leaveOrganization */
    /** billingEmailUpdate */
    /** collaborativeDocumentUpdate */
    /** commentCreate */
    /** commentUpdate */
    /** commentDelete */
    /** contactCreate */
    /** customViewCreate */
    /** customViewUpdate */
    /** customViewDelete */
    /** cycleCreate */
    /** cycleUpdate */
    /** cycleArchive */
    /** debugFailWithInternalError */
    /** debugFailWithWarning */
    /** debugCreateSAMLOrg */
    /** emailUnsubscribe */
    /** emojiCreate */
    /** emojiDelete */
    /** favoriteCreate */
    /** favoriteUpdate */
    /** favoriteDelete */
    /** feedbackCreate */
    /** fileUpload */
    /** imageUploadFromUrl */
    /** integrationGithubConnect */
    /** integrationGitlabConnect */
    /** integrationSlack */
    /** integrationSlackPersonal */
    /** integrationSlackPost */
    /** integrationSlackProjectPost */
    /** integrationSlackImportEmojis */
    /** integrationFigma */
    /** integrationGoogleSheets */
    /** refreshGoogleSheetsData */
    /** integrationSentryConnect */
    /** integrationDelete */
    /** integrationResourceArchive */
    /** issueLabelCreate */
    /** issueLabelUpdate */
    /** issueLabelArchive */
    /** issueRelationCreate */
    /** issueRelationUpdate */
    /** issueRelationDelete */
    /** issueCreate */
    /** issueUpdate */
    /** issueArchive */
    /** issueUnarchive */
    /** milestoneCreate */
    /** milestoneUpdate */
    /** milestoneDelete */
    /** notificationCreate */
    /** notificationUpdate */
    /** notificationDelete */
    /** notificationArchive */
    /** notificationUnarchive */
    /** notificationSubscriptionCreate */
    /** notificationSubscriptionDelete */
    /** oauthClientCreate */
    /** oauthClientUpdate */
    /** oauthClientArchive */
    /** oauthClientRotateSecret */
    /** oauthTokenRevoke */
    /** organizationDomainVerify */
    /** organizationDomainCreate */
    /** organizationDomainDelete */
    /** organizationInviteCreate */
    /** resentOrganizationInvite */
    /** organizationInviteDelete */
    /** projectLinkCreate */
    /** projectLinkDelete */
    /** projectCreate */
    /** projectUpdate */
    /** projectArchive */
    /** pushSubscriptionCreate */
    /** pushSubscriptionDelete */
    /** reactionCreate */
    /** reactionDelete */
    /** createCsvExportReport */
    /** subscriptionSessionCreate */
    /** subscriptionUpdateSessionCreate */
    /** subscriptionUpdate */
    /** subscriptionUpgrade */
    /** subscriptionArchive */
    /** teamMembershipCreate */
    /** teamMembershipDelete */
    /** teamCreate */
    /** teamUpdate */
    /** teamArchive */
    /** teamDelete */
    /** templateCreate */
    /** templateUpdate */
    /** templateDelete */
    /** userSettingsUpdate */
    /** userSettingsFlagIncrement */
    /** userSettingsFlagsReset */
    /** userFlagUpdate */
    /** userSubscribeToNewsletter */
    /** viewPreferencesCreate */
    /** viewPreferencesUpdate */
    /** viewPreferencesDelete */
    /** webhookCreate */
    /** webhookUpdate */
    /** webhookDelete */
    /** workflowStateCreate */
    /** workflowStateUpdate */
    /** workflowStateArchive */
  };
}

/**
 * The returned type from calling createLinearSdk
 * Initialise a set of operations to run against the Linear api
 */
export type LinearSdk = ReturnType<typeof createLinearSdk>;

/**
 * Initialise a set of operations, scoped to user, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single user
 */
export function createLinearSdkUser<O>(requester: LinearRequester<O>) {
  return {
    /** user-settings */
    /** user-assignedIssues */
    /** user-createdIssues */
    /** user-organization */
    /** user-teamMemberships */
  };
}

/**
 * The returned type from calling createLinearSdkUser
 * Initialise a set of operations, scoped to user, to run against the Linear api
 */
export type LinearSdkUser = ReturnType<typeof createLinearSdkUser>;

/**
 * Initialise a set of operations, scoped to user_organization, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single user_organization
 */
export function createLinearSdkUserOrganization<O>(requester: LinearRequester<O>, id: String) {
  return {
    /** user-organization-users */
    /** user-organization-teams */
    /** user-organization-milestones */
    /** user-organization-integrations */
    /** user-organization-subscription */
  };
}

/**
 * The returned type from calling createLinearSdkUserOrganization
 * Initialise a set of operations, scoped to user_organization, to run against the Linear api
 */
export type LinearSdkUserOrganization = ReturnType<typeof createLinearSdkUserOrganization>;

/**
 * Initialise a set of operations, scoped to viewer, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single viewer
 */
export function createLinearSdkViewer<O>(requester: LinearRequester<O>) {
  return {
    /** viewer-settings */
    /** viewer-assignedIssues */
    /** viewer-createdIssues */
    /** viewer-organization */
    /** viewer-teamMemberships */
  };
}

/**
 * The returned type from calling createLinearSdkViewer
 * Initialise a set of operations, scoped to viewer, to run against the Linear api
 */
export type LinearSdkViewer = ReturnType<typeof createLinearSdkViewer>;

/**
 * Initialise a set of operations, scoped to viewer_organization, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single viewer_organization
 */
export function createLinearSdkViewerOrganization<O>(requester: LinearRequester<O>) {
  return {
    /** viewer-organization-users */
    /** viewer-organization-teams */
    /** viewer-organization-milestones */
    /** viewer-organization-integrations */
    /** viewer-organization-subscription */
  };
}

/**
 * The returned type from calling createLinearSdkViewerOrganization
 * Initialise a set of operations, scoped to viewer_organization, to run against the Linear api
 */
export type LinearSdkViewerOrganization = ReturnType<typeof createLinearSdkViewerOrganization>;

/**
 * Initialise a set of operations, scoped to organization, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single organization
 */
export function createLinearSdkOrganization<O>(requester: LinearRequester<O>) {
  return {
    /** organization-users */
    /** organization-teams */
    /** organization-milestones */
    /** organization-integrations */
    /** organization-subscription */
  };
}

/**
 * The returned type from calling createLinearSdkOrganization
 * Initialise a set of operations, scoped to organization, to run against the Linear api
 */
export type LinearSdkOrganization = ReturnType<typeof createLinearSdkOrganization>;

/**
 * Initialise a set of operations, scoped to availableUsers, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single availableUsers
 */
export function createLinearSdkAvailableUsers<O>(requester: LinearRequester<O>) {
  return {
    /** availableUsers-availableOrganizations */
  };
}

/**
 * The returned type from calling createLinearSdkAvailableUsers
 * Initialise a set of operations, scoped to availableUsers, to run against the Linear api
 */
export type LinearSdkAvailableUsers = ReturnType<typeof createLinearSdkAvailableUsers>;

/**
 * Initialise a set of operations, scoped to availableUsers_availableOrganizations, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single availableUsers_availableOrganizations
 */
export function createLinearSdkAvailableUsersAvailableOrganizations<O>(requester: LinearRequester<O>) {
  return {
    /** availableUsers-availableOrganizations-users */
    /** availableUsers-availableOrganizations-teams */
    /** availableUsers-availableOrganizations-milestones */
    /** availableUsers-availableOrganizations-integrations */
    /** availableUsers-availableOrganizations-subscription */
  };
}

/**
 * The returned type from calling createLinearSdkAvailableUsersAvailableOrganizations
 * Initialise a set of operations, scoped to availableUsers_availableOrganizations, to run against the Linear api
 */
export type LinearSdkAvailableUsersAvailableOrganizations = ReturnType<
  typeof createLinearSdkAvailableUsersAvailableOrganizations
>;

/**
 * Initialise a set of operations, scoped to billingDetails, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single billingDetails
 */
export function createLinearSdkBillingDetails<O>(requester: LinearRequester<O>) {
  return {
    /** billingDetails-invoices */
    /** billingDetails-paymentMethod */
  };
}

/**
 * The returned type from calling createLinearSdkBillingDetails
 * Initialise a set of operations, scoped to billingDetails, to run against the Linear api
 */
export type LinearSdkBillingDetails = ReturnType<typeof createLinearSdkBillingDetails>;

/**
 * Initialise a set of operations, scoped to collaborativeDocumentJoin, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single collaborativeDocumentJoin
 */
export function createLinearSdkCollaborativeDocumentJoin<O>(requester: LinearRequester<O>) {
  return {
    /** collaborativeDocumentJoin-steps */
  };
}

/**
 * The returned type from calling createLinearSdkCollaborativeDocumentJoin
 * Initialise a set of operations, scoped to collaborativeDocumentJoin, to run against the Linear api
 */
export type LinearSdkCollaborativeDocumentJoin = ReturnType<typeof createLinearSdkCollaborativeDocumentJoin>;

/**
 * Initialise a set of operations, scoped to customView, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single customView
 */
export function createLinearSdkCustomView<O>(requester: LinearRequester<O>) {
  return {
    /** customView-organization */
  };
}

/**
 * The returned type from calling createLinearSdkCustomView
 * Initialise a set of operations, scoped to customView, to run against the Linear api
 */
export type LinearSdkCustomView = ReturnType<typeof createLinearSdkCustomView>;

/**
 * Initialise a set of operations, scoped to customView_organization, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single customView_organization
 */
export function createLinearSdkCustomViewOrganization<O>(requester: LinearRequester<O>, id: String) {
  return {
    /** customView-organization-users */
    /** customView-organization-teams */
    /** customView-organization-milestones */
    /** customView-organization-integrations */
    /** customView-organization-subscription */
  };
}

/**
 * The returned type from calling createLinearSdkCustomViewOrganization
 * Initialise a set of operations, scoped to customView_organization, to run against the Linear api
 */
export type LinearSdkCustomViewOrganization = ReturnType<typeof createLinearSdkCustomViewOrganization>;

/**
 * Initialise a set of operations, scoped to cycle, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single cycle
 */
export function createLinearSdkCycle<O>(requester: LinearRequester<O>) {
  return {
    /** cycle-issues */
    /** cycle-uncompletedIssuesUponClose */
  };
}

/**
 * The returned type from calling createLinearSdkCycle
 * Initialise a set of operations, scoped to cycle, to run against the Linear api
 */
export type LinearSdkCycle = ReturnType<typeof createLinearSdkCycle>;

/**
 * Initialise a set of operations, scoped to emoji, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single emoji
 */
export function createLinearSdkEmoji<O>(requester: LinearRequester<O>) {
  return {
    /** emoji-organization */
  };
}

/**
 * The returned type from calling createLinearSdkEmoji
 * Initialise a set of operations, scoped to emoji, to run against the Linear api
 */
export type LinearSdkEmoji = ReturnType<typeof createLinearSdkEmoji>;

/**
 * Initialise a set of operations, scoped to emoji_organization, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single emoji_organization
 */
export function createLinearSdkEmojiOrganization<O>(requester: LinearRequester<O>, id: String) {
  return {
    /** emoji-organization-users */
    /** emoji-organization-teams */
    /** emoji-organization-milestones */
    /** emoji-organization-integrations */
    /** emoji-organization-subscription */
  };
}

/**
 * The returned type from calling createLinearSdkEmojiOrganization
 * Initialise a set of operations, scoped to emoji_organization, to run against the Linear api
 */
export type LinearSdkEmojiOrganization = ReturnType<typeof createLinearSdkEmojiOrganization>;

/**
 * Initialise a set of operations, scoped to figmaEmbedInfo, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single figmaEmbedInfo
 */
export function createLinearSdkFigmaEmbedInfo<O>(requester: LinearRequester<O>) {
  return {
    /** figmaEmbedInfo-figmaEmbed */
  };
}

/**
 * The returned type from calling createLinearSdkFigmaEmbedInfo
 * Initialise a set of operations, scoped to figmaEmbedInfo, to run against the Linear api
 */
export type LinearSdkFigmaEmbedInfo = ReturnType<typeof createLinearSdkFigmaEmbedInfo>;

/**
 * Initialise a set of operations, scoped to integration, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single integration
 */
export function createLinearSdkIntegration<O>(requester: LinearRequester<O>) {
  return {
    /** integration-settings */
    /** integration-organization */
  };
}

/**
 * The returned type from calling createLinearSdkIntegration
 * Initialise a set of operations, scoped to integration, to run against the Linear api
 */
export type LinearSdkIntegration = ReturnType<typeof createLinearSdkIntegration>;

/**
 * Initialise a set of operations, scoped to integration_settings, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single integration_settings
 */
export function createLinearSdkIntegrationSettings<O>(requester: LinearRequester<O>, id: String) {
  return {
    /** integration-settings-slackPost */
    /** integration-settings-slackProjectPost */
    /** integration-settings-googleSheets */
    /** integration-settings-sentry */
  };
}

/**
 * The returned type from calling createLinearSdkIntegrationSettings
 * Initialise a set of operations, scoped to integration_settings, to run against the Linear api
 */
export type LinearSdkIntegrationSettings = ReturnType<typeof createLinearSdkIntegrationSettings>;

/**
 * Initialise a set of operations, scoped to integration_organization, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single integration_organization
 */
export function createLinearSdkIntegrationOrganization<O>(requester: LinearRequester<O>, id: String) {
  return {
    /** integration-organization-users */
    /** integration-organization-teams */
    /** integration-organization-milestones */
    /** integration-organization-integrations */
    /** integration-organization-subscription */
  };
}

/**
 * The returned type from calling createLinearSdkIntegrationOrganization
 * Initialise a set of operations, scoped to integration_organization, to run against the Linear api
 */
export type LinearSdkIntegrationOrganization = ReturnType<typeof createLinearSdkIntegrationOrganization>;

/**
 * Initialise a set of operations, scoped to integrationResource, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single integrationResource
 */
export function createLinearSdkIntegrationResource<O>(requester: LinearRequester<O>) {
  return {
    /** integrationResource-data */
    /** integrationResource-pullRequest */
  };
}

/**
 * The returned type from calling createLinearSdkIntegrationResource
 * Initialise a set of operations, scoped to integrationResource, to run against the Linear api
 */
export type LinearSdkIntegrationResource = ReturnType<typeof createLinearSdkIntegrationResource>;

/**
 * Initialise a set of operations, scoped to integrationResource_data, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single integrationResource_data
 */
export function createLinearSdkIntegrationResourceData<O>(requester: LinearRequester<O>, id: String) {
  return {
    /** integrationResource-data-githubPullRequest */
    /** integrationResource-data-gitlabMergeRequest */
    /** integrationResource-data-githubCommit */
    /** integrationResource-data-sentryIssue */
  };
}

/**
 * The returned type from calling createLinearSdkIntegrationResourceData
 * Initialise a set of operations, scoped to integrationResource_data, to run against the Linear api
 */
export type LinearSdkIntegrationResourceData = ReturnType<typeof createLinearSdkIntegrationResourceData>;

/**
 * Initialise a set of operations, scoped to inviteInfo, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single inviteInfo
 */
export function createLinearSdkInviteInfo<O>(requester: LinearRequester<O>) {
  return {
    /** inviteInfo-inviteData */
  };
}

/**
 * The returned type from calling createLinearSdkInviteInfo
 * Initialise a set of operations, scoped to inviteInfo, to run against the Linear api
 */
export type LinearSdkInviteInfo = ReturnType<typeof createLinearSdkInviteInfo>;

/**
 * Initialise a set of operations, scoped to issueLabel, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issueLabel
 */
export function createLinearSdkIssueLabel<O>(requester: LinearRequester<O>) {
  return {
    /** issueLabel-issues */
  };
}

/**
 * The returned type from calling createLinearSdkIssueLabel
 * Initialise a set of operations, scoped to issueLabel, to run against the Linear api
 */
export type LinearSdkIssueLabel = ReturnType<typeof createLinearSdkIssueLabel>;

/**
 * Initialise a set of operations, scoped to issue, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issue
 */
export function createLinearSdkIssue<O>(requester: LinearRequester<O>) {
  return {
    /** issue-subscribers */
    /** issue-children */
    /** issue-comments */
    /** issue-history */
    /** issue-labels */
    /** issue-integrationResources */
    /** issue-relations */
    /** issue-inverseRelations */
  };
}

/**
 * The returned type from calling createLinearSdkIssue
 * Initialise a set of operations, scoped to issue, to run against the Linear api
 */
export type LinearSdkIssue = ReturnType<typeof createLinearSdkIssue>;

/**
 * Initialise a set of operations, scoped to milestone, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single milestone
 */
export function createLinearSdkMilestone<O>(requester: LinearRequester<O>) {
  return {
    /** milestone-organization */
    /** milestone-projects */
  };
}

/**
 * The returned type from calling createLinearSdkMilestone
 * Initialise a set of operations, scoped to milestone, to run against the Linear api
 */
export type LinearSdkMilestone = ReturnType<typeof createLinearSdkMilestone>;

/**
 * Initialise a set of operations, scoped to milestone_organization, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single milestone_organization
 */
export function createLinearSdkMilestoneOrganization<O>(requester: LinearRequester<O>, id: String) {
  return {
    /** milestone-organization-users */
    /** milestone-organization-teams */
    /** milestone-organization-milestones */
    /** milestone-organization-integrations */
    /** milestone-organization-subscription */
  };
}

/**
 * The returned type from calling createLinearSdkMilestoneOrganization
 * Initialise a set of operations, scoped to milestone_organization, to run against the Linear api
 */
export type LinearSdkMilestoneOrganization = ReturnType<typeof createLinearSdkMilestoneOrganization>;

/**
 * Initialise a set of operations, scoped to organizationInvite, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single organizationInvite
 */
export function createLinearSdkOrganizationInvite<O>(requester: LinearRequester<O>) {
  return {
    /** organizationInvite-issues */
  };
}

/**
 * The returned type from calling createLinearSdkOrganizationInvite
 * Initialise a set of operations, scoped to organizationInvite, to run against the Linear api
 */
export type LinearSdkOrganizationInvite = ReturnType<typeof createLinearSdkOrganizationInvite>;

/**
 * Initialise a set of operations, scoped to project, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single project
 */
export function createLinearSdkProject<O>(requester: LinearRequester<O>) {
  return {
    /** project-teams */
    /** project-members */
    /** project-issues */
    /** project-links */
  };
}

/**
 * The returned type from calling createLinearSdkProject
 * Initialise a set of operations, scoped to project, to run against the Linear api
 */
export type LinearSdkProject = ReturnType<typeof createLinearSdkProject>;

/**
 * Initialise a set of operations, scoped to subscription, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single subscription
 */
export function createLinearSdkSubscription<O>(requester: LinearRequester<O>) {
  return {
    /** subscription-organization */
  };
}

/**
 * The returned type from calling createLinearSdkSubscription
 * Initialise a set of operations, scoped to subscription, to run against the Linear api
 */
export type LinearSdkSubscription = ReturnType<typeof createLinearSdkSubscription>;

/**
 * Initialise a set of operations, scoped to subscription_organization, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single subscription_organization
 */
export function createLinearSdkSubscriptionOrganization<O>(requester: LinearRequester<O>) {
  return {
    /** subscription-organization-users */
    /** subscription-organization-teams */
    /** subscription-organization-milestones */
    /** subscription-organization-integrations */
  };
}

/**
 * The returned type from calling createLinearSdkSubscriptionOrganization
 * Initialise a set of operations, scoped to subscription_organization, to run against the Linear api
 */
export type LinearSdkSubscriptionOrganization = ReturnType<typeof createLinearSdkSubscriptionOrganization>;

/**
 * Initialise a set of operations, scoped to team, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single team
 */
export function createLinearSdkTeam<O>(requester: LinearRequester<O>) {
  return {
    /** team-issues */
    /** team-cycles */
    /** team-memberships */
    /** team-projects */
    /** team-states */
    /** team-templates */
    /** team-labels */
    /** team-organization */
    /** team-webhooks */
  };
}

/**
 * The returned type from calling createLinearSdkTeam
 * Initialise a set of operations, scoped to team, to run against the Linear api
 */
export type LinearSdkTeam = ReturnType<typeof createLinearSdkTeam>;

/**
 * Initialise a set of operations, scoped to team_organization, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single team_organization
 */
export function createLinearSdkTeamOrganization<O>(requester: LinearRequester<O>, id: String) {
  return {
    /** team-organization-users */
    /** team-organization-teams */
    /** team-organization-milestones */
    /** team-organization-integrations */
    /** team-organization-subscription */
  };
}

/**
 * The returned type from calling createLinearSdkTeamOrganization
 * Initialise a set of operations, scoped to team_organization, to run against the Linear api
 */
export type LinearSdkTeamOrganization = ReturnType<typeof createLinearSdkTeamOrganization>;

/**
 * Initialise a set of operations, scoped to workflowState, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single workflowState
 */
export function createLinearSdkWorkflowState<O>(requester: LinearRequester<O>) {
  return {
    /** workflowState-issues */
  };
}

/**
 * The returned type from calling createLinearSdkWorkflowState
 * Initialise a set of operations, scoped to workflowState, to run against the Linear api
 */
export type LinearSdkWorkflowState = ReturnType<typeof createLinearSdkWorkflowState>;
