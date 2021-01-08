/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocumentNode } from "graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import * as D from "./documents";
export * from "./documents";

/**
 * The function type for calling the graphql client
 */
export type LinearRequester = <R, V>(doc: DocumentNode, vars?: V) => Promise<R>;

/**
 * Response from calling user query
 */
export interface UserQueryResponse
  extends LinearSdkUser,
    Omit<ResultOf<typeof D.UserDocument>["user"], "organization"> {
  organization?: () => Promise<OrganizationQueryResponse>;
}

/**
 * Response from calling viewer query
 */
export interface ViewerQueryResponse
  extends LinearSdkViewer,
    Omit<ResultOf<typeof D.ViewerDocument>["viewer"], "organization"> {
  organization?: () => Promise<OrganizationQueryResponse>;
}

/**
 * Response from calling organization query
 */
export type OrganizationQueryResponse = LinearSdkOrganization & ResultOf<typeof D.OrganizationDocument>["organization"];

/**
 * Response from calling organizationExists query
 */
export type OrganizationExistsQueryResponse = ResultOf<typeof D.OrganizationExistsDocument>["organizationExists"];

/**
 * Response from calling syncBootstrap query
 */
export type SyncBootstrapQueryResponse = ResultOf<typeof D.SyncBootstrapDocument>["syncBootstrap"];

/**
 * Response from calling syncUpdates query
 */
export type SyncUpdatesQueryResponse = ResultOf<typeof D.SyncUpdatesDocument>["syncUpdates"];

/**
 * Response from calling archivedModelSync query
 */
export type ArchivedModelSyncQueryResponse = ResultOf<typeof D.ArchivedModelSyncDocument>["archivedModelSync"];

/**
 * Response from calling archivedModelsSync query
 */
export type ArchivedModelsSyncQueryResponse = ResultOf<typeof D.ArchivedModelsSyncDocument>["archivedModelsSync"];

/**
 * Response from calling users query
 */
export type UsersQueryResponse = ResultOf<typeof D.UsersDocument>["users"];

/**
 * Response from calling apiKeys query
 */
export type ApiKeysQueryResponse = ResultOf<typeof D.ApiKeysDocument>["apiKeys"];

/**
 * Response from calling applicationWithAuthorization query
 */
export type ApplicationWithAuthorizationQueryResponse = ResultOf<
  typeof D.ApplicationWithAuthorizationDocument
>["applicationWithAuthorization"];

/**
 * Response from calling authorizedApplications query
 */
export type AuthorizedApplicationsQueryResponse = ResultOf<
  typeof D.AuthorizedApplicationsDocument
>["authorizedApplications"];

/**
 * Response from calling ssoUrlFromEmail query
 */
export type SsoUrlFromEmailQueryResponse = ResultOf<typeof D.SsoUrlFromEmailDocument>["ssoUrlFromEmail"];

/**
 * Response from calling billingDetails query
 */
export type BillingDetailsQueryResponse = LinearSdkBillingDetails &
  ResultOf<typeof D.BillingDetailsDocument>["billingDetails"];

/**
 * Response from calling collaborativeDocumentJoin query
 */
export type CollaborativeDocumentJoinQueryResponse = LinearSdkCollaborativeDocumentJoin &
  ResultOf<typeof D.CollaborativeDocumentJoinDocument>["collaborativeDocumentJoin"];

/**
 * Response from calling comment query
 */
export interface CommentQueryResponse extends Omit<ResultOf<typeof D.CommentDocument>["comment"], "user" | "issue"> {
  user?: (id: string) => Promise<UserQueryResponse>;
  issue?: (id: string) => Promise<IssueQueryResponse>;
}

/**
 * Response from calling comments query
 */
export type CommentsQueryResponse = ResultOf<typeof D.CommentsDocument>["comments"];

/**
 * Response from calling customView query
 */
export interface CustomViewQueryResponse
  extends Omit<ResultOf<typeof D.CustomViewDocument>["customView"], "organization" | "team"> {
  organization?: () => Promise<OrganizationQueryResponse>;
  team?: (id: string) => Promise<TeamQueryResponse>;
}

/**
 * Response from calling customViews query
 */
export type CustomViewsQueryResponse = ResultOf<typeof D.CustomViewsDocument>["customViews"];

/**
 * Response from calling cycle query
 */
export interface CycleQueryResponse extends LinearSdkCycle, Omit<ResultOf<typeof D.CycleDocument>["cycle"], "team"> {
  team?: (id: string) => Promise<TeamQueryResponse>;
}

/**
 * Response from calling cycles query
 */
export type CyclesQueryResponse = ResultOf<typeof D.CyclesDocument>["cycles"];

/**
 * Response from calling emoji query
 */
export interface EmojiQueryResponse extends Omit<ResultOf<typeof D.EmojiDocument>["emoji"], "organization"> {
  organization?: () => Promise<OrganizationQueryResponse>;
}

/**
 * Response from calling emojis query
 */
export type EmojisQueryResponse = ResultOf<typeof D.EmojisDocument>["emojis"];

/**
 * Response from calling favorite query
 */
export interface FavoriteQueryResponse
  extends Omit<ResultOf<typeof D.FavoriteDocument>["favorite"], "user" | "issue" | "project" | "cycle"> {
  user?: (id: string) => Promise<UserQueryResponse>;
  issue?: (id: string) => Promise<IssueQueryResponse>;
  project?: (id: string) => Promise<ProjectQueryResponse>;
  cycle?: (id: string) => Promise<CycleQueryResponse>;
}

/**
 * Response from calling favorites query
 */
export type FavoritesQueryResponse = ResultOf<typeof D.FavoritesDocument>["favorites"];

/**
 * Response from calling figmaEmbedInfo query
 */
export type FigmaEmbedInfoQueryResponse = LinearSdkFigmaEmbedInfo &
  ResultOf<typeof D.FigmaEmbedInfoDocument>["figmaEmbedInfo"];

/**
 * Response from calling integrations query
 */
export type IntegrationsQueryResponse = ResultOf<typeof D.IntegrationsDocument>["integrations"];

/**
 * Response from calling integrationResources query
 */
export type IntegrationResourcesQueryResponse = ResultOf<typeof D.IntegrationResourcesDocument>["integrationResources"];

/**
 * Response from calling inviteInfo query
 */
export type InviteInfoQueryResponse = LinearSdkInviteInfo & ResultOf<typeof D.InviteInfoDocument>["inviteInfo"];

/**
 * Response from calling issueLabel query
 */
export interface IssueLabelQueryResponse
  extends LinearSdkIssueLabel,
    Omit<ResultOf<typeof D.IssueLabelDocument>["issueLabel"], "team"> {
  team?: (id: string) => Promise<TeamQueryResponse>;
}

/**
 * Response from calling issueLabels query
 */
export type IssueLabelsQueryResponse = ResultOf<typeof D.IssueLabelsDocument>["issueLabels"];

/**
 * Response from calling issueRelation query
 */
export interface IssueRelationQueryResponse
  extends Omit<ResultOf<typeof D.IssueRelationDocument>["issueRelation"], "issue"> {
  issue?: (id: string) => Promise<IssueQueryResponse>;
}

/**
 * Response from calling issueRelations query
 */
export type IssueRelationsQueryResponse = ResultOf<typeof D.IssueRelationsDocument>["issueRelations"];

/**
 * Response from calling issue query
 */
export interface IssueQueryResponse
  extends LinearSdkIssue,
    Omit<ResultOf<typeof D.IssueDocument>["issue"], "team" | "cycle" | "project"> {
  team?: (id: string) => Promise<TeamQueryResponse>;
  cycle?: (id: string) => Promise<CycleQueryResponse>;
  project?: (id: string) => Promise<ProjectQueryResponse>;
}

/**
 * Response from calling issueSearch query
 */
export type IssueSearchQueryResponse = ResultOf<typeof D.IssueSearchDocument>["issueSearch"];

/**
 * Response from calling issues query
 */
export type IssuesQueryResponse = ResultOf<typeof D.IssuesDocument>["issues"];

/**
 * Response from calling milestone query
 */
export interface MilestoneQueryResponse
  extends LinearSdkMilestone,
    Omit<ResultOf<typeof D.MilestoneDocument>["milestone"], "organization"> {
  organization?: () => Promise<OrganizationQueryResponse>;
}

/**
 * Response from calling milestones query
 */
export type MilestonesQueryResponse = ResultOf<typeof D.MilestonesDocument>["milestones"];

/**
 * Response from calling notification query
 */
export interface NotificationQueryResponse
  extends Omit<ResultOf<typeof D.NotificationDocument>["notification"], "user"> {
  user?: (id: string) => Promise<UserQueryResponse>;
}

/**
 * Response from calling notifications query
 */
export type NotificationsQueryResponse = ResultOf<typeof D.NotificationsDocument>["notifications"];

/**
 * Response from calling notificationSubscription query
 */
export type NotificationSubscriptionQueryResponse = ResultOf<
  typeof D.NotificationSubscriptionDocument
>["notificationSubscription"];

/**
 * Response from calling organizationInvite query
 */
export interface OrganizationInviteQueryResponse
  extends LinearSdkOrganizationInvite,
    Omit<ResultOf<typeof D.OrganizationInviteDocument>["organizationInvite"], "team"> {
  team?: (id: string) => Promise<TeamQueryResponse>;
}

/**
 * Response from calling organizationInvites query
 */
export type OrganizationInvitesQueryResponse = ResultOf<typeof D.OrganizationInvitesDocument>["organizationInvites"];

/**
 * Response from calling projectLink query
 */
export interface ProjectLinkQueryResponse
  extends Omit<ResultOf<typeof D.ProjectLinkDocument>["projectLink"], "project"> {
  project?: (id: string) => Promise<ProjectQueryResponse>;
}

/**
 * Response from calling ProjectLinks query
 */
export type ProjectLinksQueryResponse = ResultOf<typeof D.ProjectLinksDocument>["ProjectLinks"];

/**
 * Response from calling project query
 */
export interface ProjectQueryResponse
  extends LinearSdkProject,
    Omit<ResultOf<typeof D.ProjectDocument>["project"], "milestone"> {
  milestone?: (id: string) => Promise<MilestoneQueryResponse>;
}

/**
 * Response from calling projects query
 */
export type ProjectsQueryResponse = ResultOf<typeof D.ProjectsDocument>["projects"];

/**
 * Response from calling pushSubscriptionTest query
 */
export type PushSubscriptionTestQueryResponse = ResultOf<typeof D.PushSubscriptionTestDocument>["pushSubscriptionTest"];

/**
 * Response from calling reaction query
 */
export interface ReactionQueryResponse extends Omit<ResultOf<typeof D.ReactionDocument>["reaction"], "user"> {
  user?: (id: string) => Promise<UserQueryResponse>;
}

/**
 * Response from calling reactions query
 */
export type ReactionsQueryResponse = ResultOf<typeof D.ReactionsDocument>["reactions"];

/**
 * Response from calling subscription query
 */
export interface SubscriptionQueryResponse
  extends Omit<ResultOf<typeof D.SubscriptionDocument>["subscription"], "organization"> {
  organization?: () => Promise<OrganizationQueryResponse>;
}

/**
 * Response from calling teamMembership query
 */
export interface TeamMembershipQueryResponse
  extends Omit<ResultOf<typeof D.TeamMembershipDocument>["teamMembership"], "user" | "team"> {
  user?: (id: string) => Promise<UserQueryResponse>;
  team?: (id: string) => Promise<TeamQueryResponse>;
}

/**
 * Response from calling teamMemberships query
 */
export type TeamMembershipsQueryResponse = ResultOf<typeof D.TeamMembershipsDocument>["teamMemberships"];

/**
 * Response from calling team query
 */
export interface TeamQueryResponse
  extends LinearSdkTeam,
    Omit<ResultOf<typeof D.TeamDocument>["team"], "organization"> {
  organization?: () => Promise<OrganizationQueryResponse>;
}

/**
 * Response from calling teams query
 */
export type TeamsQueryResponse = ResultOf<typeof D.TeamsDocument>["teams"];

/**
 * Response from calling templates query
 */
export interface TemplatesQueryResponse extends Omit<ResultOf<typeof D.TemplatesDocument>["templates"], "team"> {
  team?: (id: string) => Promise<TeamQueryResponse>;
}

/**
 * Response from calling template query
 */
export interface TemplateQueryResponse extends Omit<ResultOf<typeof D.TemplateDocument>["template"], "team"> {
  team?: (id: string) => Promise<TeamQueryResponse>;
}

/**
 * Response from calling viewPreferences query
 */
export type ViewPreferencesQueryResponse = ResultOf<typeof D.ViewPreferencesDocument>["viewPreferences"];

/**
 * Response from calling webhook query
 */
export interface WebhookQueryResponse extends Omit<ResultOf<typeof D.WebhookDocument>["webhook"], "team"> {
  team?: (id: string) => Promise<TeamQueryResponse>;
}

/**
 * Response from calling webhooks query
 */
export type WebhooksQueryResponse = ResultOf<typeof D.WebhooksDocument>["webhooks"];

/**
 * Response from calling workflowState query
 */
export interface WorkflowStateQueryResponse
  extends LinearSdkWorkflowState,
    Omit<ResultOf<typeof D.WorkflowStateDocument>["workflowState"], "team"> {
  team?: (id: string) => Promise<TeamQueryResponse>;
}

/**
 * Response from calling workflowStates query
 */
export type WorkflowStatesQueryResponse = ResultOf<typeof D.WorkflowStatesDocument>["workflowStates"];

/**
 * Response from calling userUpdate query
 */
export interface UserUpdateMutationResponse extends Omit<ResultOf<typeof D.UserUpdateDocument>["userUpdate"], "user"> {
  user?: (id: string) => Promise<UserQueryResponse>;
}

/**
 * Response from calling userSuspend query
 */
export type UserSuspendMutationResponse = ResultOf<typeof D.UserSuspendDocument>["userSuspend"];

/**
 * Response from calling userUnsuspend query
 */
export type UserUnsuspendMutationResponse = ResultOf<typeof D.UserUnsuspendDocument>["userUnsuspend"];

/**
 * Response from calling organizationUpdate query
 */
export interface OrganizationUpdateMutationResponse
  extends Omit<ResultOf<typeof D.OrganizationUpdateDocument>["organizationUpdate"], "organization"> {
  organization?: () => Promise<OrganizationQueryResponse>;
}

/**
 * Response from calling organizationDeleteChallenge query
 */
export type OrganizationDeleteChallengeMutationResponse = ResultOf<
  typeof D.OrganizationDeleteChallengeDocument
>["organizationDeleteChallenge"];

/**
 * Response from calling organizationDelete query
 */
export type OrganizationDeleteMutationResponse = ResultOf<typeof D.OrganizationDeleteDocument>["organizationDelete"];

/**
 * Response from calling organizationToggleAccess query
 */
export type OrganizationToggleAccessMutationResponse = ResultOf<
  typeof D.OrganizationToggleAccessDocument
>["organizationToggleAccess"];

/**
 * Response from calling organizationChangeEmailDomain query
 */
export type OrganizationChangeEmailDomainMutationResponse = ResultOf<
  typeof D.OrganizationChangeEmailDomainDocument
>["organizationChangeEmailDomain"];

/**
 * Response from calling organizationToggleSamlEnabled query
 */
export type OrganizationToggleSamlEnabledMutationResponse = ResultOf<
  typeof D.OrganizationToggleSamlEnabledDocument
>["organizationToggleSamlEnabled"];

/**
 * Response from calling organizationConfigureSaml query
 */
export type OrganizationConfigureSamlMutationResponse = ResultOf<
  typeof D.OrganizationConfigureSamlDocument
>["organizationConfigureSaml"];

/**
 * Response from calling eventCreate query
 */
export type EventCreateMutationResponse = ResultOf<typeof D.EventCreateDocument>["eventCreate"];

/**
 * Response from calling apiKeyCreate query
 */
export type ApiKeyCreateMutationResponse = ResultOf<typeof D.ApiKeyCreateDocument>["apiKeyCreate"];

/**
 * Response from calling apiKeyDelete query
 */
export type ApiKeyDeleteMutationResponse = ResultOf<typeof D.ApiKeyDeleteDocument>["apiKeyDelete"];

/**
 * Response from calling emailUserAccountAuthChallenge query
 */
export type EmailUserAccountAuthChallengeMutationResponse = ResultOf<
  typeof D.EmailUserAccountAuthChallengeDocument
>["emailUserAccountAuthChallenge"];

/**
 * Response from calling emailTokenUserAccountAuth query
 */
export type EmailTokenUserAccountAuthMutationResponse = ResultOf<
  typeof D.EmailTokenUserAccountAuthDocument
>["emailTokenUserAccountAuth"];

/**
 * Response from calling samlTokenUserAccountAuth query
 */
export type SamlTokenUserAccountAuthMutationResponse = ResultOf<
  typeof D.SamlTokenUserAccountAuthDocument
>["samlTokenUserAccountAuth"];

/**
 * Response from calling googleUserAccountAuth query
 */
export type GoogleUserAccountAuthMutationResponse = ResultOf<
  typeof D.GoogleUserAccountAuthDocument
>["googleUserAccountAuth"];

/**
 * Response from calling createOrganizationFromOnboarding query
 */
export interface CreateOrganizationFromOnboardingMutationResponse
  extends Omit<
    ResultOf<typeof D.CreateOrganizationFromOnboardingDocument>["createOrganizationFromOnboarding"],
    "organization" | "user"
  > {
  organization?: () => Promise<OrganizationQueryResponse>;
  user?: (id: string) => Promise<UserQueryResponse>;
}

/**
 * Response from calling joinOrganizationFromOnboarding query
 */
export interface JoinOrganizationFromOnboardingMutationResponse
  extends Omit<
    ResultOf<typeof D.JoinOrganizationFromOnboardingDocument>["joinOrganizationFromOnboarding"],
    "organization" | "user"
  > {
  organization?: () => Promise<OrganizationQueryResponse>;
  user?: (id: string) => Promise<UserQueryResponse>;
}

/**
 * Response from calling leaveOrganization query
 */
export interface LeaveOrganizationMutationResponse
  extends Omit<ResultOf<typeof D.LeaveOrganizationDocument>["leaveOrganization"], "organization" | "user"> {
  organization?: () => Promise<OrganizationQueryResponse>;
  user?: (id: string) => Promise<UserQueryResponse>;
}

/**
 * Response from calling billingEmailUpdate query
 */
export type BillingEmailUpdateMutationResponse = ResultOf<typeof D.BillingEmailUpdateDocument>["billingEmailUpdate"];

/**
 * Response from calling collaborativeDocumentUpdate query
 */
export type CollaborativeDocumentUpdateMutationResponse = ResultOf<
  typeof D.CollaborativeDocumentUpdateDocument
>["collaborativeDocumentUpdate"];

/**
 * Response from calling commentCreate query
 */
export type CommentCreateMutationResponse = ResultOf<typeof D.CommentCreateDocument>["commentCreate"];

/**
 * Response from calling commentUpdate query
 */
export type CommentUpdateMutationResponse = ResultOf<typeof D.CommentUpdateDocument>["commentUpdate"];

/**
 * Response from calling commentDelete query
 */
export type CommentDeleteMutationResponse = ResultOf<typeof D.CommentDeleteDocument>["commentDelete"];

/**
 * Response from calling contactCreate query
 */
export type ContactCreateMutationResponse = ResultOf<typeof D.ContactCreateDocument>["contactCreate"];

/**
 * Response from calling customViewCreate query
 */
export type CustomViewCreateMutationResponse = ResultOf<typeof D.CustomViewCreateDocument>["customViewCreate"];

/**
 * Response from calling customViewUpdate query
 */
export type CustomViewUpdateMutationResponse = ResultOf<typeof D.CustomViewUpdateDocument>["customViewUpdate"];

/**
 * Response from calling customViewDelete query
 */
export type CustomViewDeleteMutationResponse = ResultOf<typeof D.CustomViewDeleteDocument>["customViewDelete"];

/**
 * Response from calling cycleCreate query
 */
export interface CycleCreateMutationResponse
  extends Omit<ResultOf<typeof D.CycleCreateDocument>["cycleCreate"], "cycle"> {
  cycle?: (id: string) => Promise<CycleQueryResponse>;
}

/**
 * Response from calling cycleUpdate query
 */
export interface CycleUpdateMutationResponse
  extends Omit<ResultOf<typeof D.CycleUpdateDocument>["cycleUpdate"], "cycle"> {
  cycle?: (id: string) => Promise<CycleQueryResponse>;
}

/**
 * Response from calling cycleArchive query
 */
export type CycleArchiveMutationResponse = ResultOf<typeof D.CycleArchiveDocument>["cycleArchive"];

/**
 * Response from calling debugFailWithInternalError query
 */
export type DebugFailWithInternalErrorMutationResponse = ResultOf<
  typeof D.DebugFailWithInternalErrorDocument
>["debugFailWithInternalError"];

/**
 * Response from calling debugFailWithWarning query
 */
export type DebugFailWithWarningMutationResponse = ResultOf<
  typeof D.DebugFailWithWarningDocument
>["debugFailWithWarning"];

/**
 * Response from calling debugCreateSAMLOrg query
 */
export type DebugCreateSAMLOrgMutationResponse = ResultOf<typeof D.DebugCreateSamlOrgDocument>["debugCreateSAMLOrg"];

/**
 * Response from calling emailUnsubscribe query
 */
export type EmailUnsubscribeMutationResponse = ResultOf<typeof D.EmailUnsubscribeDocument>["emailUnsubscribe"];

/**
 * Response from calling emojiCreate query
 */
export type EmojiCreateMutationResponse = ResultOf<typeof D.EmojiCreateDocument>["emojiCreate"];

/**
 * Response from calling emojiDelete query
 */
export type EmojiDeleteMutationResponse = ResultOf<typeof D.EmojiDeleteDocument>["emojiDelete"];

/**
 * Response from calling favoriteCreate query
 */
export type FavoriteCreateMutationResponse = ResultOf<typeof D.FavoriteCreateDocument>["favoriteCreate"];

/**
 * Response from calling favoriteUpdate query
 */
export type FavoriteUpdateMutationResponse = ResultOf<typeof D.FavoriteUpdateDocument>["favoriteUpdate"];

/**
 * Response from calling favoriteDelete query
 */
export type FavoriteDeleteMutationResponse = ResultOf<typeof D.FavoriteDeleteDocument>["favoriteDelete"];

/**
 * Response from calling feedbackCreate query
 */
export type FeedbackCreateMutationResponse = ResultOf<typeof D.FeedbackCreateDocument>["feedbackCreate"];

/**
 * Response from calling fileUpload query
 */
export type FileUploadMutationResponse = ResultOf<typeof D.FileUploadDocument>["fileUpload"];

/**
 * Response from calling imageUploadFromUrl query
 */
export type ImageUploadFromUrlMutationResponse = ResultOf<typeof D.ImageUploadFromUrlDocument>["imageUploadFromUrl"];

/**
 * Response from calling integrationGithubConnect query
 */
export type IntegrationGithubConnectMutationResponse = ResultOf<
  typeof D.IntegrationGithubConnectDocument
>["integrationGithubConnect"];

/**
 * Response from calling integrationGitlabConnect query
 */
export type IntegrationGitlabConnectMutationResponse = ResultOf<
  typeof D.IntegrationGitlabConnectDocument
>["integrationGitlabConnect"];

/**
 * Response from calling integrationSlack query
 */
export type IntegrationSlackMutationResponse = ResultOf<typeof D.IntegrationSlackDocument>["integrationSlack"];

/**
 * Response from calling integrationSlackPersonal query
 */
export type IntegrationSlackPersonalMutationResponse = ResultOf<
  typeof D.IntegrationSlackPersonalDocument
>["integrationSlackPersonal"];

/**
 * Response from calling integrationSlackPost query
 */
export type IntegrationSlackPostMutationResponse = ResultOf<
  typeof D.IntegrationSlackPostDocument
>["integrationSlackPost"];

/**
 * Response from calling integrationSlackProjectPost query
 */
export type IntegrationSlackProjectPostMutationResponse = ResultOf<
  typeof D.IntegrationSlackProjectPostDocument
>["integrationSlackProjectPost"];

/**
 * Response from calling integrationSlackImportEmojis query
 */
export type IntegrationSlackImportEmojisMutationResponse = ResultOf<
  typeof D.IntegrationSlackImportEmojisDocument
>["integrationSlackImportEmojis"];

/**
 * Response from calling integrationFigma query
 */
export type IntegrationFigmaMutationResponse = ResultOf<typeof D.IntegrationFigmaDocument>["integrationFigma"];

/**
 * Response from calling integrationGoogleSheets query
 */
export type IntegrationGoogleSheetsMutationResponse = ResultOf<
  typeof D.IntegrationGoogleSheetsDocument
>["integrationGoogleSheets"];

/**
 * Response from calling refreshGoogleSheetsData query
 */
export type RefreshGoogleSheetsDataMutationResponse = ResultOf<
  typeof D.RefreshGoogleSheetsDataDocument
>["refreshGoogleSheetsData"];

/**
 * Response from calling integrationSentryConnect query
 */
export type IntegrationSentryConnectMutationResponse = ResultOf<
  typeof D.IntegrationSentryConnectDocument
>["integrationSentryConnect"];

/**
 * Response from calling integrationDelete query
 */
export type IntegrationDeleteMutationResponse = ResultOf<typeof D.IntegrationDeleteDocument>["integrationDelete"];

/**
 * Response from calling integrationResourceArchive query
 */
export type IntegrationResourceArchiveMutationResponse = ResultOf<
  typeof D.IntegrationResourceArchiveDocument
>["integrationResourceArchive"];

/**
 * Response from calling issueLabelCreate query
 */
export interface IssueLabelCreateMutationResponse
  extends Omit<ResultOf<typeof D.IssueLabelCreateDocument>["issueLabelCreate"], "issueLabel"> {
  issueLabel?: (id: string) => Promise<IssueLabelQueryResponse>;
}

/**
 * Response from calling issueLabelUpdate query
 */
export interface IssueLabelUpdateMutationResponse
  extends Omit<ResultOf<typeof D.IssueLabelUpdateDocument>["issueLabelUpdate"], "issueLabel"> {
  issueLabel?: (id: string) => Promise<IssueLabelQueryResponse>;
}

/**
 * Response from calling issueLabelArchive query
 */
export type IssueLabelArchiveMutationResponse = ResultOf<typeof D.IssueLabelArchiveDocument>["issueLabelArchive"];

/**
 * Response from calling issueRelationCreate query
 */
export type IssueRelationCreateMutationResponse = ResultOf<typeof D.IssueRelationCreateDocument>["issueRelationCreate"];

/**
 * Response from calling issueRelationUpdate query
 */
export type IssueRelationUpdateMutationResponse = ResultOf<typeof D.IssueRelationUpdateDocument>["issueRelationUpdate"];

/**
 * Response from calling issueRelationDelete query
 */
export type IssueRelationDeleteMutationResponse = ResultOf<typeof D.IssueRelationDeleteDocument>["issueRelationDelete"];

/**
 * Response from calling issueCreate query
 */
export interface IssueCreateMutationResponse
  extends Omit<ResultOf<typeof D.IssueCreateDocument>["issueCreate"], "issue"> {
  issue?: (id: string) => Promise<IssueQueryResponse>;
}

/**
 * Response from calling issueUpdate query
 */
export interface IssueUpdateMutationResponse
  extends Omit<ResultOf<typeof D.IssueUpdateDocument>["issueUpdate"], "issue"> {
  issue?: (id: string) => Promise<IssueQueryResponse>;
}

/**
 * Response from calling issueArchive query
 */
export type IssueArchiveMutationResponse = ResultOf<typeof D.IssueArchiveDocument>["issueArchive"];

/**
 * Response from calling issueUnarchive query
 */
export type IssueUnarchiveMutationResponse = ResultOf<typeof D.IssueUnarchiveDocument>["issueUnarchive"];

/**
 * Response from calling milestoneCreate query
 */
export interface MilestoneCreateMutationResponse
  extends Omit<ResultOf<typeof D.MilestoneCreateDocument>["milestoneCreate"], "milestone"> {
  milestone?: (id: string) => Promise<MilestoneQueryResponse>;
}

/**
 * Response from calling milestoneUpdate query
 */
export interface MilestoneUpdateMutationResponse
  extends Omit<ResultOf<typeof D.MilestoneUpdateDocument>["milestoneUpdate"], "milestone"> {
  milestone?: (id: string) => Promise<MilestoneQueryResponse>;
}

/**
 * Response from calling milestoneDelete query
 */
export type MilestoneDeleteMutationResponse = ResultOf<typeof D.MilestoneDeleteDocument>["milestoneDelete"];

/**
 * Response from calling notificationCreate query
 */
export type NotificationCreateMutationResponse = ResultOf<typeof D.NotificationCreateDocument>["notificationCreate"];

/**
 * Response from calling notificationUpdate query
 */
export type NotificationUpdateMutationResponse = ResultOf<typeof D.NotificationUpdateDocument>["notificationUpdate"];

/**
 * Response from calling notificationDelete query
 */
export type NotificationDeleteMutationResponse = ResultOf<typeof D.NotificationDeleteDocument>["notificationDelete"];

/**
 * Response from calling notificationArchive query
 */
export type NotificationArchiveMutationResponse = ResultOf<typeof D.NotificationArchiveDocument>["notificationArchive"];

/**
 * Response from calling notificationUnarchive query
 */
export type NotificationUnarchiveMutationResponse = ResultOf<
  typeof D.NotificationUnarchiveDocument
>["notificationUnarchive"];

/**
 * Response from calling notificationSubscriptionCreate query
 */
export type NotificationSubscriptionCreateMutationResponse = ResultOf<
  typeof D.NotificationSubscriptionCreateDocument
>["notificationSubscriptionCreate"];

/**
 * Response from calling notificationSubscriptionDelete query
 */
export type NotificationSubscriptionDeleteMutationResponse = ResultOf<
  typeof D.NotificationSubscriptionDeleteDocument
>["notificationSubscriptionDelete"];

/**
 * Response from calling oauthClientCreate query
 */
export type OauthClientCreateMutationResponse = ResultOf<typeof D.OauthClientCreateDocument>["oauthClientCreate"];

/**
 * Response from calling oauthClientUpdate query
 */
export type OauthClientUpdateMutationResponse = ResultOf<typeof D.OauthClientUpdateDocument>["oauthClientUpdate"];

/**
 * Response from calling oauthClientArchive query
 */
export type OauthClientArchiveMutationResponse = ResultOf<typeof D.OauthClientArchiveDocument>["oauthClientArchive"];

/**
 * Response from calling oauthClientRotateSecret query
 */
export type OauthClientRotateSecretMutationResponse = ResultOf<
  typeof D.OauthClientRotateSecretDocument
>["oauthClientRotateSecret"];

/**
 * Response from calling oauthTokenRevoke query
 */
export type OauthTokenRevokeMutationResponse = ResultOf<typeof D.OauthTokenRevokeDocument>["oauthTokenRevoke"];

/**
 * Response from calling organizationDomainVerify query
 */
export type OrganizationDomainVerifyMutationResponse = ResultOf<
  typeof D.OrganizationDomainVerifyDocument
>["organizationDomainVerify"];

/**
 * Response from calling organizationDomainCreate query
 */
export type OrganizationDomainCreateMutationResponse = ResultOf<
  typeof D.OrganizationDomainCreateDocument
>["organizationDomainCreate"];

/**
 * Response from calling organizationDomainDelete query
 */
export type OrganizationDomainDeleteMutationResponse = ResultOf<
  typeof D.OrganizationDomainDeleteDocument
>["organizationDomainDelete"];

/**
 * Response from calling organizationInviteCreate query
 */
export interface OrganizationInviteCreateMutationResponse
  extends Omit<ResultOf<typeof D.OrganizationInviteCreateDocument>["organizationInviteCreate"], "organizationInvite"> {
  organizationInvite?: (id: string) => Promise<OrganizationInviteQueryResponse>;
}

/**
 * Response from calling resentOrganizationInvite query
 */
export type ResentOrganizationInviteMutationResponse = ResultOf<
  typeof D.ResentOrganizationInviteDocument
>["resentOrganizationInvite"];

/**
 * Response from calling organizationInviteDelete query
 */
export type OrganizationInviteDeleteMutationResponse = ResultOf<
  typeof D.OrganizationInviteDeleteDocument
>["organizationInviteDelete"];

/**
 * Response from calling projectLinkCreate query
 */
export type ProjectLinkCreateMutationResponse = ResultOf<typeof D.ProjectLinkCreateDocument>["projectLinkCreate"];

/**
 * Response from calling projectLinkDelete query
 */
export type ProjectLinkDeleteMutationResponse = ResultOf<typeof D.ProjectLinkDeleteDocument>["projectLinkDelete"];

/**
 * Response from calling projectCreate query
 */
export interface ProjectCreateMutationResponse
  extends Omit<ResultOf<typeof D.ProjectCreateDocument>["projectCreate"], "project"> {
  project?: (id: string) => Promise<ProjectQueryResponse>;
}

/**
 * Response from calling projectUpdate query
 */
export interface ProjectUpdateMutationResponse
  extends Omit<ResultOf<typeof D.ProjectUpdateDocument>["projectUpdate"], "project"> {
  project?: (id: string) => Promise<ProjectQueryResponse>;
}

/**
 * Response from calling projectArchive query
 */
export type ProjectArchiveMutationResponse = ResultOf<typeof D.ProjectArchiveDocument>["projectArchive"];

/**
 * Response from calling pushSubscriptionCreate query
 */
export type PushSubscriptionCreateMutationResponse = ResultOf<
  typeof D.PushSubscriptionCreateDocument
>["pushSubscriptionCreate"];

/**
 * Response from calling pushSubscriptionDelete query
 */
export type PushSubscriptionDeleteMutationResponse = ResultOf<
  typeof D.PushSubscriptionDeleteDocument
>["pushSubscriptionDelete"];

/**
 * Response from calling reactionCreate query
 */
export type ReactionCreateMutationResponse = ResultOf<typeof D.ReactionCreateDocument>["reactionCreate"];

/**
 * Response from calling reactionDelete query
 */
export type ReactionDeleteMutationResponse = ResultOf<typeof D.ReactionDeleteDocument>["reactionDelete"];

/**
 * Response from calling createCsvExportReport query
 */
export type CreateCsvExportReportMutationResponse = ResultOf<
  typeof D.CreateCsvExportReportDocument
>["createCsvExportReport"];

/**
 * Response from calling subscriptionSessionCreate query
 */
export type SubscriptionSessionCreateMutationResponse = ResultOf<
  typeof D.SubscriptionSessionCreateDocument
>["subscriptionSessionCreate"];

/**
 * Response from calling subscriptionUpdateSessionCreate query
 */
export type SubscriptionUpdateSessionCreateMutationResponse = ResultOf<
  typeof D.SubscriptionUpdateSessionCreateDocument
>["subscriptionUpdateSessionCreate"];

/**
 * Response from calling subscriptionUpdate query
 */
export type SubscriptionUpdateMutationResponse = ResultOf<typeof D.SubscriptionUpdateDocument>["subscriptionUpdate"];

/**
 * Response from calling subscriptionUpgrade query
 */
export type SubscriptionUpgradeMutationResponse = ResultOf<typeof D.SubscriptionUpgradeDocument>["subscriptionUpgrade"];

/**
 * Response from calling subscriptionArchive query
 */
export type SubscriptionArchiveMutationResponse = ResultOf<typeof D.SubscriptionArchiveDocument>["subscriptionArchive"];

/**
 * Response from calling teamMembershipCreate query
 */
export type TeamMembershipCreateMutationResponse = ResultOf<
  typeof D.TeamMembershipCreateDocument
>["teamMembershipCreate"];

/**
 * Response from calling teamMembershipDelete query
 */
export type TeamMembershipDeleteMutationResponse = ResultOf<
  typeof D.TeamMembershipDeleteDocument
>["teamMembershipDelete"];

/**
 * Response from calling teamCreate query
 */
export interface TeamCreateMutationResponse extends Omit<ResultOf<typeof D.TeamCreateDocument>["teamCreate"], "team"> {
  team?: (id: string) => Promise<TeamQueryResponse>;
}

/**
 * Response from calling teamUpdate query
 */
export interface TeamUpdateMutationResponse extends Omit<ResultOf<typeof D.TeamUpdateDocument>["teamUpdate"], "team"> {
  team?: (id: string) => Promise<TeamQueryResponse>;
}

/**
 * Response from calling teamArchive query
 */
export type TeamArchiveMutationResponse = ResultOf<typeof D.TeamArchiveDocument>["teamArchive"];

/**
 * Response from calling teamDelete query
 */
export type TeamDeleteMutationResponse = ResultOf<typeof D.TeamDeleteDocument>["teamDelete"];

/**
 * Response from calling templateCreate query
 */
export type TemplateCreateMutationResponse = ResultOf<typeof D.TemplateCreateDocument>["templateCreate"];

/**
 * Response from calling templateUpdate query
 */
export type TemplateUpdateMutationResponse = ResultOf<typeof D.TemplateUpdateDocument>["templateUpdate"];

/**
 * Response from calling templateDelete query
 */
export type TemplateDeleteMutationResponse = ResultOf<typeof D.TemplateDeleteDocument>["templateDelete"];

/**
 * Response from calling userSettingsUpdate query
 */
export type UserSettingsUpdateMutationResponse = ResultOf<typeof D.UserSettingsUpdateDocument>["userSettingsUpdate"];

/**
 * Response from calling userSettingsFlagIncrement query
 */
export type UserSettingsFlagIncrementMutationResponse = ResultOf<
  typeof D.UserSettingsFlagIncrementDocument
>["userSettingsFlagIncrement"];

/**
 * Response from calling userSettingsFlagsReset query
 */
export type UserSettingsFlagsResetMutationResponse = ResultOf<
  typeof D.UserSettingsFlagsResetDocument
>["userSettingsFlagsReset"];

/**
 * Response from calling userFlagUpdate query
 */
export type UserFlagUpdateMutationResponse = ResultOf<typeof D.UserFlagUpdateDocument>["userFlagUpdate"];

/**
 * Response from calling userSubscribeToNewsletter query
 */
export type UserSubscribeToNewsletterMutationResponse = ResultOf<
  typeof D.UserSubscribeToNewsletterDocument
>["userSubscribeToNewsletter"];

/**
 * Response from calling viewPreferencesCreate query
 */
export type ViewPreferencesCreateMutationResponse = ResultOf<
  typeof D.ViewPreferencesCreateDocument
>["viewPreferencesCreate"];

/**
 * Response from calling viewPreferencesUpdate query
 */
export type ViewPreferencesUpdateMutationResponse = ResultOf<
  typeof D.ViewPreferencesUpdateDocument
>["viewPreferencesUpdate"];

/**
 * Response from calling viewPreferencesDelete query
 */
export type ViewPreferencesDeleteMutationResponse = ResultOf<
  typeof D.ViewPreferencesDeleteDocument
>["viewPreferencesDelete"];

/**
 * Response from calling webhookCreate query
 */
export type WebhookCreateMutationResponse = ResultOf<typeof D.WebhookCreateDocument>["webhookCreate"];

/**
 * Response from calling webhookUpdate query
 */
export type WebhookUpdateMutationResponse = ResultOf<typeof D.WebhookUpdateDocument>["webhookUpdate"];

/**
 * Response from calling webhookDelete query
 */
export type WebhookDeleteMutationResponse = ResultOf<typeof D.WebhookDeleteDocument>["webhookDelete"];

/**
 * Response from calling workflowStateCreate query
 */
export interface WorkflowStateCreateMutationResponse
  extends Omit<ResultOf<typeof D.WorkflowStateCreateDocument>["workflowStateCreate"], "workflowState"> {
  workflowState?: (id: string) => Promise<WorkflowStateQueryResponse>;
}

/**
 * Response from calling workflowStateUpdate query
 */
export interface WorkflowStateUpdateMutationResponse
  extends Omit<ResultOf<typeof D.WorkflowStateUpdateDocument>["workflowStateUpdate"], "workflowState"> {
  workflowState?: (id: string) => Promise<WorkflowStateQueryResponse>;
}

/**
 * Response from calling workflowStateArchive query
 */
export type WorkflowStateArchiveMutationResponse = ResultOf<
  typeof D.WorkflowStateArchiveDocument
>["workflowStateArchive"];

/**
 * Response from calling user assignedIssues query
 */
export type User_AssignedIssuesQueryResponse = ResultOf<typeof D.User_AssignedIssuesDocument>["user"]["assignedIssues"];

/**
 * Response from calling user createdIssues query
 */
export type User_CreatedIssuesQueryResponse = ResultOf<typeof D.User_CreatedIssuesDocument>["user"]["createdIssues"];

/**
 * Response from calling user teamMemberships query
 */
export type User_TeamMembershipsQueryResponse = ResultOf<
  typeof D.User_TeamMembershipsDocument
>["user"]["teamMemberships"];

/**
 * Response from calling viewer assignedIssues query
 */
export type Viewer_AssignedIssuesQueryResponse = ResultOf<
  typeof D.Viewer_AssignedIssuesDocument
>["viewer"]["assignedIssues"];

/**
 * Response from calling viewer createdIssues query
 */
export type Viewer_CreatedIssuesQueryResponse = ResultOf<
  typeof D.Viewer_CreatedIssuesDocument
>["viewer"]["createdIssues"];

/**
 * Response from calling viewer teamMemberships query
 */
export type Viewer_TeamMembershipsQueryResponse = ResultOf<
  typeof D.Viewer_TeamMembershipsDocument
>["viewer"]["teamMemberships"];

/**
 * Response from calling organization users query
 */
export type Organization_UsersQueryResponse = ResultOf<typeof D.Organization_UsersDocument>["organization"]["users"];

/**
 * Response from calling organization teams query
 */
export type Organization_TeamsQueryResponse = ResultOf<typeof D.Organization_TeamsDocument>["organization"]["teams"];

/**
 * Response from calling organization milestones query
 */
export type Organization_MilestonesQueryResponse = ResultOf<
  typeof D.Organization_MilestonesDocument
>["organization"]["milestones"];

/**
 * Response from calling organization integrations query
 */
export type Organization_IntegrationsQueryResponse = ResultOf<
  typeof D.Organization_IntegrationsDocument
>["organization"]["integrations"];

/**
 * Response from calling billingDetails invoices query
 */
export type BillingDetails_InvoicesQueryResponse = ResultOf<
  typeof D.BillingDetails_InvoicesDocument
>["billingDetails"]["invoices"];

/**
 * Response from calling billingDetails paymentMethod query
 */
export type BillingDetails_PaymentMethodQueryResponse = ResultOf<
  typeof D.BillingDetails_PaymentMethodDocument
>["billingDetails"]["paymentMethod"];

/**
 * Response from calling collaborativeDocumentJoin steps query
 */
export type CollaborativeDocumentJoin_StepsQueryResponse = ResultOf<
  typeof D.CollaborativeDocumentJoin_StepsDocument
>["collaborativeDocumentJoin"]["steps"];

/**
 * Response from calling cycle issues query
 */
export type Cycle_IssuesQueryResponse = ResultOf<typeof D.Cycle_IssuesDocument>["cycle"]["issues"];

/**
 * Response from calling cycle uncompletedIssuesUponClose query
 */
export type Cycle_UncompletedIssuesUponCloseQueryResponse = ResultOf<
  typeof D.Cycle_UncompletedIssuesUponCloseDocument
>["cycle"]["uncompletedIssuesUponClose"];

/**
 * Response from calling figmaEmbedInfo figmaEmbed query
 */
export type FigmaEmbedInfo_FigmaEmbedQueryResponse = ResultOf<
  typeof D.FigmaEmbedInfo_FigmaEmbedDocument
>["figmaEmbedInfo"]["figmaEmbed"];

/**
 * Response from calling inviteInfo inviteData query
 */
export type InviteInfo_InviteDataQueryResponse = ResultOf<
  typeof D.InviteInfo_InviteDataDocument
>["inviteInfo"]["inviteData"];

/**
 * Response from calling issueLabel issues query
 */
export type IssueLabel_IssuesQueryResponse = ResultOf<typeof D.IssueLabel_IssuesDocument>["issueLabel"]["issues"];

/**
 * Response from calling issue subscribers query
 */
export type Issue_SubscribersQueryResponse = ResultOf<typeof D.Issue_SubscribersDocument>["issue"]["subscribers"];

/**
 * Response from calling issue children query
 */
export type Issue_ChildrenQueryResponse = ResultOf<typeof D.Issue_ChildrenDocument>["issue"]["children"];

/**
 * Response from calling issue comments query
 */
export type Issue_CommentsQueryResponse = ResultOf<typeof D.Issue_CommentsDocument>["issue"]["comments"];

/**
 * Response from calling issue history query
 */
export type Issue_HistoryQueryResponse = ResultOf<typeof D.Issue_HistoryDocument>["issue"]["history"];

/**
 * Response from calling issue labels query
 */
export type Issue_LabelsQueryResponse = ResultOf<typeof D.Issue_LabelsDocument>["issue"]["labels"];

/**
 * Response from calling issue integrationResources query
 */
export type Issue_IntegrationResourcesQueryResponse = ResultOf<
  typeof D.Issue_IntegrationResourcesDocument
>["issue"]["integrationResources"];

/**
 * Response from calling issue relations query
 */
export type Issue_RelationsQueryResponse = ResultOf<typeof D.Issue_RelationsDocument>["issue"]["relations"];

/**
 * Response from calling issue inverseRelations query
 */
export type Issue_InverseRelationsQueryResponse = ResultOf<
  typeof D.Issue_InverseRelationsDocument
>["issue"]["inverseRelations"];

/**
 * Response from calling milestone projects query
 */
export type Milestone_ProjectsQueryResponse = ResultOf<typeof D.Milestone_ProjectsDocument>["milestone"]["projects"];

/**
 * Response from calling organizationInvite issues query
 */
export type OrganizationInvite_IssuesQueryResponse = ResultOf<
  typeof D.OrganizationInvite_IssuesDocument
>["organizationInvite"]["issues"];

/**
 * Response from calling project teams query
 */
export type Project_TeamsQueryResponse = ResultOf<typeof D.Project_TeamsDocument>["project"]["teams"];

/**
 * Response from calling project members query
 */
export type Project_MembersQueryResponse = ResultOf<typeof D.Project_MembersDocument>["project"]["members"];

/**
 * Response from calling project issues query
 */
export type Project_IssuesQueryResponse = ResultOf<typeof D.Project_IssuesDocument>["project"]["issues"];

/**
 * Response from calling project links query
 */
export type Project_LinksQueryResponse = ResultOf<typeof D.Project_LinksDocument>["project"]["links"];

/**
 * Response from calling team issues query
 */
export type Team_IssuesQueryResponse = ResultOf<typeof D.Team_IssuesDocument>["team"]["issues"];

/**
 * Response from calling team cycles query
 */
export type Team_CyclesQueryResponse = ResultOf<typeof D.Team_CyclesDocument>["team"]["cycles"];

/**
 * Response from calling team memberships query
 */
export type Team_MembershipsQueryResponse = ResultOf<typeof D.Team_MembershipsDocument>["team"]["memberships"];

/**
 * Response from calling team projects query
 */
export type Team_ProjectsQueryResponse = ResultOf<typeof D.Team_ProjectsDocument>["team"]["projects"];

/**
 * Response from calling team states query
 */
export type Team_StatesQueryResponse = ResultOf<typeof D.Team_StatesDocument>["team"]["states"];

/**
 * Response from calling team templates query
 */
export type Team_TemplatesQueryResponse = ResultOf<typeof D.Team_TemplatesDocument>["team"]["templates"];

/**
 * Response from calling team labels query
 */
export type Team_LabelsQueryResponse = ResultOf<typeof D.Team_LabelsDocument>["team"]["labels"];

/**
 * Response from calling team webhooks query
 */
export type Team_WebhooksQueryResponse = ResultOf<typeof D.Team_WebhooksDocument>["team"]["webhooks"];

/**
 * Response from calling workflowState issues query
 */
export type WorkflowState_IssuesQueryResponse = ResultOf<
  typeof D.WorkflowState_IssuesDocument
>["workflowState"]["issues"];

/**
 * Initialize a set of operations to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations
 */
export function createLinearSdk(requester: LinearRequester) {
  return {
    /**
     * Call the Linear api with the user
     *
     * @param id - id to pass into the UserQuery
     * @returns The result of the UserQuery
     */
    async user(id: string): Promise<UserQueryResponse> {
      const response = await requester<D.UserQuery, D.UserQueryVariables>(D.UserDocument, { id });
      return {
        ...response?.user,
        organization: () => createLinearSdk(requester).organization(),
        ...createLinearSdkUser(requester, id),
      };
    },
    /**
     * Call the Linear api with the viewer
     *
     * @returns The result of the ViewerQuery
     */
    async viewer(): Promise<ViewerQueryResponse> {
      const response = await requester<D.ViewerQuery, D.ViewerQueryVariables>(D.ViewerDocument, {});
      return {
        ...response?.viewer,
        organization: () => createLinearSdk(requester).organization(),
        ...createLinearSdkViewer(requester),
      };
    },
    /**
     * Call the Linear api with the organization
     *
     * @returns The result of the OrganizationQuery
     */
    async organization(): Promise<OrganizationQueryResponse> {
      const response = await requester<D.OrganizationQuery, D.OrganizationQueryVariables>(D.OrganizationDocument, {});
      return {
        ...response?.organization,
        ...createLinearSdkOrganization(requester),
      };
    },
    /**
     * Call the Linear api with the organizationExists
     *
     * @param urlKey - urlKey to pass into the OrganizationExistsQuery
     * @returns The result of the OrganizationExistsQuery
     */
    async organizationExists(urlKey: string): Promise<OrganizationExistsQueryResponse> {
      const response = await requester<D.OrganizationExistsQuery, D.OrganizationExistsQueryVariables>(
        D.OrganizationExistsDocument,
        { urlKey }
      );
      return response?.organizationExists;
    },
    /**
     * Call the Linear api with the syncBootstrap
     *
     * @param databaseVersion - databaseVersion to pass into the SyncBootstrapQuery
     * @param sinceSyncId - sinceSyncId to pass into the SyncBootstrapQuery
     * @returns The result of the SyncBootstrapQuery
     */
    async syncBootstrap(databaseVersion: number, sinceSyncId: number): Promise<SyncBootstrapQueryResponse> {
      const response = await requester<D.SyncBootstrapQuery, D.SyncBootstrapQueryVariables>(D.SyncBootstrapDocument, {
        databaseVersion,
        sinceSyncId,
      });
      return response?.syncBootstrap;
    },
    /**
     * Call the Linear api with the syncUpdates
     *
     * @param sinceSyncId - sinceSyncId to pass into the SyncUpdatesQuery
     * @returns The result of the SyncUpdatesQuery
     */
    async syncUpdates(sinceSyncId: number): Promise<SyncUpdatesQueryResponse> {
      const response = await requester<D.SyncUpdatesQuery, D.SyncUpdatesQueryVariables>(D.SyncUpdatesDocument, {
        sinceSyncId,
      });
      return response?.syncUpdates;
    },
    /**
     * Call the Linear api with the archivedModelSync
     *
     * @param identifier - identifier to pass into the ArchivedModelSyncQuery
     * @param modelClass - modelClass to pass into the ArchivedModelSyncQuery
     * @returns The result of the ArchivedModelSyncQuery
     */
    async archivedModelSync(identifier: string, modelClass: string): Promise<ArchivedModelSyncQueryResponse> {
      const response = await requester<D.ArchivedModelSyncQuery, D.ArchivedModelSyncQueryVariables>(
        D.ArchivedModelSyncDocument,
        { identifier, modelClass }
      );
      return response?.archivedModelSync;
    },
    /**
     * Call the Linear api with the archivedModelsSync
     *
     * @param modelClass - modelClass to pass into the ArchivedModelsSyncQuery
     * @param teamId - teamId to pass into the ArchivedModelsSyncQuery
     * @param vars - variables without 'modelClass', 'teamId' to pass into the ArchivedModelsSyncQuery
     * @returns The result of the ArchivedModelsSyncQuery
     */
    async archivedModelsSync(
      modelClass: string,
      teamId: string,
      vars?: Omit<D.ArchivedModelsSyncQueryVariables, "modelClass" | "teamId">
    ): Promise<ArchivedModelsSyncQueryResponse> {
      const response = await requester<D.ArchivedModelsSyncQuery, D.ArchivedModelsSyncQueryVariables>(
        D.ArchivedModelsSyncDocument,
        { modelClass, teamId, ...vars }
      );
      return response?.archivedModelsSync;
    },
    /**
     * Call the Linear api with the users
     *
     * @param vars - variables to pass into the UsersQuery
     * @returns The result of the UsersQuery
     */
    async users(vars?: D.UsersQueryVariables): Promise<UsersQueryResponse> {
      const response = await requester<D.UsersQuery, D.UsersQueryVariables>(D.UsersDocument, vars);
      return {
        ...response?.users,
        nodes: response?.users.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the apiKeys
     *
     * @param vars - variables to pass into the ApiKeysQuery
     * @returns The result of the ApiKeysQuery
     */
    async apiKeys(vars?: D.ApiKeysQueryVariables): Promise<ApiKeysQueryResponse> {
      const response = await requester<D.ApiKeysQuery, D.ApiKeysQueryVariables>(D.ApiKeysDocument, vars);
      return {
        ...response?.apiKeys,
        nodes: response?.apiKeys.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the applicationWithAuthorization
     *
     * @param scope - scope to pass into the ApplicationWithAuthorizationQuery
     * @param clientId - clientId to pass into the ApplicationWithAuthorizationQuery
     * @param vars - variables without 'scope', 'clientId' to pass into the ApplicationWithAuthorizationQuery
     * @returns The result of the ApplicationWithAuthorizationQuery
     */
    async applicationWithAuthorization(
      scope: string[],
      clientId: string,
      vars?: Omit<D.ApplicationWithAuthorizationQueryVariables, "scope" | "clientId">
    ): Promise<ApplicationWithAuthorizationQueryResponse> {
      const response = await requester<
        D.ApplicationWithAuthorizationQuery,
        D.ApplicationWithAuthorizationQueryVariables
      >(D.ApplicationWithAuthorizationDocument, { scope, clientId, ...vars });
      return response?.applicationWithAuthorization;
    },
    /**
     * Call the Linear api with the authorizedApplications
     *
     * @returns The result of the AuthorizedApplicationsQuery
     */
    async authorizedApplications(): Promise<AuthorizedApplicationsQueryResponse> {
      const response = await requester<D.AuthorizedApplicationsQuery, D.AuthorizedApplicationsQueryVariables>(
        D.AuthorizedApplicationsDocument,
        {}
      );
      return response?.authorizedApplications;
    },
    /**
     * Call the Linear api with the ssoUrlFromEmail
     *
     * @param email - email to pass into the SsoUrlFromEmailQuery
     * @param vars - variables without 'email' to pass into the SsoUrlFromEmailQuery
     * @returns The result of the SsoUrlFromEmailQuery
     */
    async ssoUrlFromEmail(
      email: string,
      vars?: Omit<D.SsoUrlFromEmailQueryVariables, "email">
    ): Promise<SsoUrlFromEmailQueryResponse> {
      const response = await requester<D.SsoUrlFromEmailQuery, D.SsoUrlFromEmailQueryVariables>(
        D.SsoUrlFromEmailDocument,
        { email, ...vars }
      );
      return response?.ssoUrlFromEmail;
    },
    /**
     * Call the Linear api with the billingDetails
     *
     * @returns The result of the BillingDetailsQuery
     */
    async billingDetails(): Promise<BillingDetailsQueryResponse> {
      const response = await requester<D.BillingDetailsQuery, D.BillingDetailsQueryVariables>(
        D.BillingDetailsDocument,
        {}
      );
      return {
        ...response?.billingDetails,
        ...createLinearSdkBillingDetails(requester),
      };
    },
    /**
     * Call the Linear api with the collaborativeDocumentJoin
     *
     * @param clientId - clientId to pass into the CollaborativeDocumentJoinQuery
     * @param issueId - issueId to pass into the CollaborativeDocumentJoinQuery
     * @param version - version to pass into the CollaborativeDocumentJoinQuery
     * @returns The result of the CollaborativeDocumentJoinQuery
     */
    async collaborativeDocumentJoin(
      clientId: string,
      issueId: string,
      version: number
    ): Promise<CollaborativeDocumentJoinQueryResponse> {
      const response = await requester<D.CollaborativeDocumentJoinQuery, D.CollaborativeDocumentJoinQueryVariables>(
        D.CollaborativeDocumentJoinDocument,
        { clientId, issueId, version }
      );
      return {
        ...response?.collaborativeDocumentJoin,
        ...createLinearSdkCollaborativeDocumentJoin(requester, clientId, issueId, version),
      };
    },
    /**
     * Call the Linear api with the comment
     *
     * @param id - id to pass into the CommentQuery
     * @returns The result of the CommentQuery
     */
    async comment(id: string): Promise<CommentQueryResponse> {
      const response = await requester<D.CommentQuery, D.CommentQueryVariables>(D.CommentDocument, { id });
      return {
        ...response?.comment,
        user: response?.comment?.user?.id
          ? () => createLinearSdk(requester).user(response?.comment?.user?.id as string)
          : undefined,
        issue: response?.comment?.issue?.id
          ? () => createLinearSdk(requester).issue(response?.comment?.issue?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the comments
     *
     * @param vars - variables to pass into the CommentsQuery
     * @returns The result of the CommentsQuery
     */
    async comments(vars?: D.CommentsQueryVariables): Promise<CommentsQueryResponse> {
      const response = await requester<D.CommentsQuery, D.CommentsQueryVariables>(D.CommentsDocument, vars);
      return {
        ...response?.comments,
        nodes: response?.comments.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the customView
     *
     * @param id - id to pass into the CustomViewQuery
     * @returns The result of the CustomViewQuery
     */
    async customView(id: string): Promise<CustomViewQueryResponse> {
      const response = await requester<D.CustomViewQuery, D.CustomViewQueryVariables>(D.CustomViewDocument, { id });
      return {
        ...response?.customView,
        organization: () => createLinearSdk(requester).organization(),
        team: response?.customView?.team?.id
          ? () => createLinearSdk(requester).team(response?.customView?.team?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the customViews
     *
     * @param vars - variables to pass into the CustomViewsQuery
     * @returns The result of the CustomViewsQuery
     */
    async customViews(vars?: D.CustomViewsQueryVariables): Promise<CustomViewsQueryResponse> {
      const response = await requester<D.CustomViewsQuery, D.CustomViewsQueryVariables>(D.CustomViewsDocument, vars);
      return {
        ...response?.customViews,
        nodes: response?.customViews.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the cycle
     *
     * @param id - id to pass into the CycleQuery
     * @returns The result of the CycleQuery
     */
    async cycle(id: string): Promise<CycleQueryResponse> {
      const response = await requester<D.CycleQuery, D.CycleQueryVariables>(D.CycleDocument, { id });
      return {
        ...response?.cycle,
        team: response?.cycle?.team?.id
          ? () => createLinearSdk(requester).team(response?.cycle?.team?.id as string)
          : undefined,
        ...createLinearSdkCycle(requester, id),
      };
    },
    /**
     * Call the Linear api with the cycles
     *
     * @param vars - variables to pass into the CyclesQuery
     * @returns The result of the CyclesQuery
     */
    async cycles(vars?: D.CyclesQueryVariables): Promise<CyclesQueryResponse> {
      const response = await requester<D.CyclesQuery, D.CyclesQueryVariables>(D.CyclesDocument, vars);
      return {
        ...response?.cycles,
        nodes: response?.cycles.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the emoji
     *
     * @param id - id to pass into the EmojiQuery
     * @returns The result of the EmojiQuery
     */
    async emoji(id: string): Promise<EmojiQueryResponse> {
      const response = await requester<D.EmojiQuery, D.EmojiQueryVariables>(D.EmojiDocument, { id });
      return {
        ...response?.emoji,
        organization: () => createLinearSdk(requester).organization(),
      };
    },
    /**
     * Call the Linear api with the emojis
     *
     * @param vars - variables to pass into the EmojisQuery
     * @returns The result of the EmojisQuery
     */
    async emojis(vars?: D.EmojisQueryVariables): Promise<EmojisQueryResponse> {
      const response = await requester<D.EmojisQuery, D.EmojisQueryVariables>(D.EmojisDocument, vars);
      return {
        ...response?.emojis,
        nodes: response?.emojis.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the favorite
     *
     * @param id - id to pass into the FavoriteQuery
     * @returns The result of the FavoriteQuery
     */
    async favorite(id: string): Promise<FavoriteQueryResponse> {
      const response = await requester<D.FavoriteQuery, D.FavoriteQueryVariables>(D.FavoriteDocument, { id });
      return {
        ...response?.favorite,
        user: response?.favorite?.user?.id
          ? () => createLinearSdk(requester).user(response?.favorite?.user?.id as string)
          : undefined,
        issue: response?.favorite?.issue?.id
          ? () => createLinearSdk(requester).issue(response?.favorite?.issue?.id as string)
          : undefined,
        project: response?.favorite?.project?.id
          ? () => createLinearSdk(requester).project(response?.favorite?.project?.id as string)
          : undefined,
        cycle: response?.favorite?.cycle?.id
          ? () => createLinearSdk(requester).cycle(response?.favorite?.cycle?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the favorites
     *
     * @param vars - variables to pass into the FavoritesQuery
     * @returns The result of the FavoritesQuery
     */
    async favorites(vars?: D.FavoritesQueryVariables): Promise<FavoritesQueryResponse> {
      const response = await requester<D.FavoritesQuery, D.FavoritesQueryVariables>(D.FavoritesDocument, vars);
      return {
        ...response?.favorites,
        nodes: response?.favorites.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the figmaEmbedInfo
     *
     * @param fileId - fileId to pass into the FigmaEmbedInfoQuery
     * @param vars - variables without 'fileId' to pass into the FigmaEmbedInfoQuery
     * @returns The result of the FigmaEmbedInfoQuery
     */
    async figmaEmbedInfo(
      fileId: string,
      vars?: Omit<D.FigmaEmbedInfoQueryVariables, "fileId">
    ): Promise<FigmaEmbedInfoQueryResponse> {
      const response = await requester<D.FigmaEmbedInfoQuery, D.FigmaEmbedInfoQueryVariables>(
        D.FigmaEmbedInfoDocument,
        { fileId, ...vars }
      );
      return {
        ...response?.figmaEmbedInfo,
        ...createLinearSdkFigmaEmbedInfo(requester, fileId),
      };
    },
    /**
     * Call the Linear api with the integrations
     *
     * @param vars - variables to pass into the IntegrationsQuery
     * @returns The result of the IntegrationsQuery
     */
    async integrations(vars?: D.IntegrationsQueryVariables): Promise<IntegrationsQueryResponse> {
      const response = await requester<D.IntegrationsQuery, D.IntegrationsQueryVariables>(D.IntegrationsDocument, vars);
      return {
        ...response?.integrations,
        nodes: response?.integrations.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the integrationResources
     *
     * @param vars - variables to pass into the IntegrationResourcesQuery
     * @returns The result of the IntegrationResourcesQuery
     */
    async integrationResources(
      vars?: D.IntegrationResourcesQueryVariables
    ): Promise<IntegrationResourcesQueryResponse> {
      const response = await requester<D.IntegrationResourcesQuery, D.IntegrationResourcesQueryVariables>(
        D.IntegrationResourcesDocument,
        vars
      );
      return {
        ...response?.integrationResources,
        nodes: response?.integrationResources.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the inviteInfo
     *
     * @param userHash - userHash to pass into the InviteInfoQuery
     * @param vars - variables without 'userHash' to pass into the InviteInfoQuery
     * @returns The result of the InviteInfoQuery
     */
    async inviteInfo(
      userHash: string,
      vars?: Omit<D.InviteInfoQueryVariables, "userHash">
    ): Promise<InviteInfoQueryResponse> {
      const response = await requester<D.InviteInfoQuery, D.InviteInfoQueryVariables>(D.InviteInfoDocument, {
        userHash,
        ...vars,
      });
      return {
        ...response?.inviteInfo,
        ...createLinearSdkInviteInfo(requester, userHash),
      };
    },
    /**
     * Call the Linear api with the issueLabel
     *
     * @param id - id to pass into the IssueLabelQuery
     * @returns The result of the IssueLabelQuery
     */
    async issueLabel(id: string): Promise<IssueLabelQueryResponse> {
      const response = await requester<D.IssueLabelQuery, D.IssueLabelQueryVariables>(D.IssueLabelDocument, { id });
      return {
        ...response?.issueLabel,
        team: response?.issueLabel?.team?.id
          ? () => createLinearSdk(requester).team(response?.issueLabel?.team?.id as string)
          : undefined,
        ...createLinearSdkIssueLabel(requester, id),
      };
    },
    /**
     * Call the Linear api with the issueLabels
     *
     * @param vars - variables to pass into the IssueLabelsQuery
     * @returns The result of the IssueLabelsQuery
     */
    async issueLabels(vars?: D.IssueLabelsQueryVariables): Promise<IssueLabelsQueryResponse> {
      const response = await requester<D.IssueLabelsQuery, D.IssueLabelsQueryVariables>(D.IssueLabelsDocument, vars);
      return {
        ...response?.issueLabels,
        nodes: response?.issueLabels.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the issueRelation
     *
     * @param id - id to pass into the IssueRelationQuery
     * @returns The result of the IssueRelationQuery
     */
    async issueRelation(id: string): Promise<IssueRelationQueryResponse> {
      const response = await requester<D.IssueRelationQuery, D.IssueRelationQueryVariables>(D.IssueRelationDocument, {
        id,
      });
      return {
        ...response?.issueRelation,
        issue: response?.issueRelation?.issue?.id
          ? () => createLinearSdk(requester).issue(response?.issueRelation?.issue?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the issueRelations
     *
     * @param vars - variables to pass into the IssueRelationsQuery
     * @returns The result of the IssueRelationsQuery
     */
    async issueRelations(vars?: D.IssueRelationsQueryVariables): Promise<IssueRelationsQueryResponse> {
      const response = await requester<D.IssueRelationsQuery, D.IssueRelationsQueryVariables>(
        D.IssueRelationsDocument,
        vars
      );
      return {
        ...response?.issueRelations,
        nodes: response?.issueRelations.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the issue
     *
     * @param id - id to pass into the IssueQuery
     * @returns The result of the IssueQuery
     */
    async issue(id: string): Promise<IssueQueryResponse> {
      const response = await requester<D.IssueQuery, D.IssueQueryVariables>(D.IssueDocument, { id });
      return {
        ...response?.issue,
        team: response?.issue?.team?.id
          ? () => createLinearSdk(requester).team(response?.issue?.team?.id as string)
          : undefined,
        cycle: response?.issue?.cycle?.id
          ? () => createLinearSdk(requester).cycle(response?.issue?.cycle?.id as string)
          : undefined,
        project: response?.issue?.project?.id
          ? () => createLinearSdk(requester).project(response?.issue?.project?.id as string)
          : undefined,
        ...createLinearSdkIssue(requester, id),
      };
    },
    /**
     * Call the Linear api with the issueSearch
     *
     * @param query - query to pass into the IssueSearchQuery
     * @param vars - variables without 'query' to pass into the IssueSearchQuery
     * @returns The result of the IssueSearchQuery
     */
    async issueSearch(
      query: string,
      vars?: Omit<D.IssueSearchQueryVariables, "query">
    ): Promise<IssueSearchQueryResponse> {
      const response = await requester<D.IssueSearchQuery, D.IssueSearchQueryVariables>(D.IssueSearchDocument, {
        query,
        ...vars,
      });
      return {
        ...response?.issueSearch,
        nodes: response?.issueSearch.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the issues
     *
     * @param vars - variables to pass into the IssuesQuery
     * @returns The result of the IssuesQuery
     */
    async issues(vars?: D.IssuesQueryVariables): Promise<IssuesQueryResponse> {
      const response = await requester<D.IssuesQuery, D.IssuesQueryVariables>(D.IssuesDocument, vars);
      return {
        ...response?.issues,
        nodes: response?.issues.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the milestone
     *
     * @param id - id to pass into the MilestoneQuery
     * @returns The result of the MilestoneQuery
     */
    async milestone(id: string): Promise<MilestoneQueryResponse> {
      const response = await requester<D.MilestoneQuery, D.MilestoneQueryVariables>(D.MilestoneDocument, { id });
      return {
        ...response?.milestone,
        organization: () => createLinearSdk(requester).organization(),
        ...createLinearSdkMilestone(requester, id),
      };
    },
    /**
     * Call the Linear api with the milestones
     *
     * @param vars - variables to pass into the MilestonesQuery
     * @returns The result of the MilestonesQuery
     */
    async milestones(vars?: D.MilestonesQueryVariables): Promise<MilestonesQueryResponse> {
      const response = await requester<D.MilestonesQuery, D.MilestonesQueryVariables>(D.MilestonesDocument, vars);
      return {
        ...response?.milestones,
        nodes: response?.milestones.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the notification
     *
     * @returns The result of the NotificationQuery
     */
    async notification(): Promise<NotificationQueryResponse> {
      const response = await requester<D.NotificationQuery, D.NotificationQueryVariables>(D.NotificationDocument, {});
      return {
        ...response?.notification,
        user: response?.notification?.user?.id
          ? () => createLinearSdk(requester).user(response?.notification?.user?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the notifications
     *
     * @param vars - variables to pass into the NotificationsQuery
     * @returns The result of the NotificationsQuery
     */
    async notifications(vars?: D.NotificationsQueryVariables): Promise<NotificationsQueryResponse> {
      const response = await requester<D.NotificationsQuery, D.NotificationsQueryVariables>(
        D.NotificationsDocument,
        vars
      );
      return {
        ...response?.notifications,
        nodes: response?.notifications.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the notificationSubscription
     *
     * @param vars - variables to pass into the NotificationSubscriptionQuery
     * @returns The result of the NotificationSubscriptionQuery
     */
    async notificationSubscription(
      vars?: D.NotificationSubscriptionQueryVariables
    ): Promise<NotificationSubscriptionQueryResponse> {
      const response = await requester<D.NotificationSubscriptionQuery, D.NotificationSubscriptionQueryVariables>(
        D.NotificationSubscriptionDocument,
        vars
      );
      return {
        ...response?.notificationSubscription,
        nodes: response?.notificationSubscription.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the organizationInvite
     *
     * @param id - id to pass into the OrganizationInviteQuery
     * @returns The result of the OrganizationInviteQuery
     */
    async organizationInvite(id: string): Promise<OrganizationInviteQueryResponse> {
      const response = await requester<D.OrganizationInviteQuery, D.OrganizationInviteQueryVariables>(
        D.OrganizationInviteDocument,
        { id }
      );
      return {
        ...response?.organizationInvite,
        team: response?.organizationInvite?.team?.id
          ? () => createLinearSdk(requester).team(response?.organizationInvite?.team?.id as string)
          : undefined,
        ...createLinearSdkOrganizationInvite(requester, id),
      };
    },
    /**
     * Call the Linear api with the organizationInvites
     *
     * @param vars - variables to pass into the OrganizationInvitesQuery
     * @returns The result of the OrganizationInvitesQuery
     */
    async organizationInvites(vars?: D.OrganizationInvitesQueryVariables): Promise<OrganizationInvitesQueryResponse> {
      const response = await requester<D.OrganizationInvitesQuery, D.OrganizationInvitesQueryVariables>(
        D.OrganizationInvitesDocument,
        vars
      );
      return {
        ...response?.organizationInvites,
        nodes: response?.organizationInvites.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the projectLink
     *
     * @param id - id to pass into the ProjectLinkQuery
     * @returns The result of the ProjectLinkQuery
     */
    async projectLink(id: string): Promise<ProjectLinkQueryResponse> {
      const response = await requester<D.ProjectLinkQuery, D.ProjectLinkQueryVariables>(D.ProjectLinkDocument, { id });
      return {
        ...response?.projectLink,
        project: response?.projectLink?.project?.id
          ? () => createLinearSdk(requester).project(response?.projectLink?.project?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the ProjectLinks
     *
     * @param vars - variables to pass into the ProjectLinksQuery
     * @returns The result of the ProjectLinksQuery
     */
    async ProjectLinks(vars?: D.ProjectLinksQueryVariables): Promise<ProjectLinksQueryResponse> {
      const response = await requester<D.ProjectLinksQuery, D.ProjectLinksQueryVariables>(D.ProjectLinksDocument, vars);
      return {
        ...response?.ProjectLinks,
        nodes: response?.ProjectLinks.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the project
     *
     * @param id - id to pass into the ProjectQuery
     * @returns The result of the ProjectQuery
     */
    async project(id: string): Promise<ProjectQueryResponse> {
      const response = await requester<D.ProjectQuery, D.ProjectQueryVariables>(D.ProjectDocument, { id });
      return {
        ...response?.project,
        milestone: response?.project?.milestone?.id
          ? () => createLinearSdk(requester).milestone(response?.project?.milestone?.id as string)
          : undefined,
        ...createLinearSdkProject(requester, id),
      };
    },
    /**
     * Call the Linear api with the projects
     *
     * @param vars - variables to pass into the ProjectsQuery
     * @returns The result of the ProjectsQuery
     */
    async projects(vars?: D.ProjectsQueryVariables): Promise<ProjectsQueryResponse> {
      const response = await requester<D.ProjectsQuery, D.ProjectsQueryVariables>(D.ProjectsDocument, vars);
      return {
        ...response?.projects,
        nodes: response?.projects.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the pushSubscriptionTest
     *
     * @returns The result of the PushSubscriptionTestQuery
     */
    async pushSubscriptionTest(): Promise<PushSubscriptionTestQueryResponse> {
      const response = await requester<D.PushSubscriptionTestQuery, D.PushSubscriptionTestQueryVariables>(
        D.PushSubscriptionTestDocument,
        {}
      );
      return response?.pushSubscriptionTest;
    },
    /**
     * Call the Linear api with the reaction
     *
     * @param id - id to pass into the ReactionQuery
     * @returns The result of the ReactionQuery
     */
    async reaction(id: string): Promise<ReactionQueryResponse> {
      const response = await requester<D.ReactionQuery, D.ReactionQueryVariables>(D.ReactionDocument, { id });
      return {
        ...response?.reaction,
        user: response?.reaction?.user?.id
          ? () => createLinearSdk(requester).user(response?.reaction?.user?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the reactions
     *
     * @param vars - variables to pass into the ReactionsQuery
     * @returns The result of the ReactionsQuery
     */
    async reactions(vars?: D.ReactionsQueryVariables): Promise<ReactionsQueryResponse> {
      const response = await requester<D.ReactionsQuery, D.ReactionsQueryVariables>(D.ReactionsDocument, vars);
      return {
        ...response?.reactions,
        nodes: response?.reactions.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the subscription
     *
     * @returns The result of the SubscriptionQuery
     */
    async subscription(): Promise<SubscriptionQueryResponse> {
      const response = await requester<D.SubscriptionQuery, D.SubscriptionQueryVariables>(D.SubscriptionDocument, {});
      return {
        ...response?.subscription,
        organization: () => createLinearSdk(requester).organization(),
      };
    },
    /**
     * Call the Linear api with the teamMembership
     *
     * @param id - id to pass into the TeamMembershipQuery
     * @returns The result of the TeamMembershipQuery
     */
    async teamMembership(id: string): Promise<TeamMembershipQueryResponse> {
      const response = await requester<D.TeamMembershipQuery, D.TeamMembershipQueryVariables>(
        D.TeamMembershipDocument,
        { id }
      );
      return {
        ...response?.teamMembership,
        user: response?.teamMembership?.user?.id
          ? () => createLinearSdk(requester).user(response?.teamMembership?.user?.id as string)
          : undefined,
        team: response?.teamMembership?.team?.id
          ? () => createLinearSdk(requester).team(response?.teamMembership?.team?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the teamMemberships
     *
     * @param vars - variables to pass into the TeamMembershipsQuery
     * @returns The result of the TeamMembershipsQuery
     */
    async teamMemberships(vars?: D.TeamMembershipsQueryVariables): Promise<TeamMembershipsQueryResponse> {
      const response = await requester<D.TeamMembershipsQuery, D.TeamMembershipsQueryVariables>(
        D.TeamMembershipsDocument,
        vars
      );
      return {
        ...response?.teamMemberships,
        nodes: response?.teamMemberships.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the team
     *
     * @param id - id to pass into the TeamQuery
     * @returns The result of the TeamQuery
     */
    async team(id: string): Promise<TeamQueryResponse> {
      const response = await requester<D.TeamQuery, D.TeamQueryVariables>(D.TeamDocument, { id });
      return {
        ...response?.team,
        organization: () => createLinearSdk(requester).organization(),
        ...createLinearSdkTeam(requester, id),
      };
    },
    /**
     * Call the Linear api with the teams
     *
     * @param vars - variables to pass into the TeamsQuery
     * @returns The result of the TeamsQuery
     */
    async teams(vars?: D.TeamsQueryVariables): Promise<TeamsQueryResponse> {
      const response = await requester<D.TeamsQuery, D.TeamsQueryVariables>(D.TeamsDocument, vars);
      return {
        ...response?.teams,
        nodes: response?.teams.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the templates
     *
     * @returns The result of the TemplatesQuery
     */
    async templates(): Promise<TemplatesQueryResponse> {
      const response = await requester<D.TemplatesQuery, D.TemplatesQueryVariables>(D.TemplatesDocument, {});
      return {
        ...response?.templates,
        team: response?.templates?.team?.id
          ? () => createLinearSdk(requester).team(response?.templates?.team?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the template
     *
     * @param id - id to pass into the TemplateQuery
     * @returns The result of the TemplateQuery
     */
    async template(id: string): Promise<TemplateQueryResponse> {
      const response = await requester<D.TemplateQuery, D.TemplateQueryVariables>(D.TemplateDocument, { id });
      return {
        ...response?.template,
        team: response?.template?.team?.id
          ? () => createLinearSdk(requester).team(response?.template?.team?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the viewPreferences
     *
     * @param vars - variables to pass into the ViewPreferencesQuery
     * @returns The result of the ViewPreferencesQuery
     */
    async viewPreferences(vars?: D.ViewPreferencesQueryVariables): Promise<ViewPreferencesQueryResponse> {
      const response = await requester<D.ViewPreferencesQuery, D.ViewPreferencesQueryVariables>(
        D.ViewPreferencesDocument,
        vars
      );
      return {
        ...response?.viewPreferences,
        nodes: response?.viewPreferences.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the webhook
     *
     * @param id - id to pass into the WebhookQuery
     * @returns The result of the WebhookQuery
     */
    async webhook(id: string): Promise<WebhookQueryResponse> {
      const response = await requester<D.WebhookQuery, D.WebhookQueryVariables>(D.WebhookDocument, { id });
      return {
        ...response?.webhook,
        team: response?.webhook?.team?.id
          ? () => createLinearSdk(requester).team(response?.webhook?.team?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the webhooks
     *
     * @param vars - variables to pass into the WebhooksQuery
     * @returns The result of the WebhooksQuery
     */
    async webhooks(vars?: D.WebhooksQueryVariables): Promise<WebhooksQueryResponse> {
      const response = await requester<D.WebhooksQuery, D.WebhooksQueryVariables>(D.WebhooksDocument, vars);
      return {
        ...response?.webhooks,
        nodes: response?.webhooks.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the workflowState
     *
     * @param id - id to pass into the WorkflowStateQuery
     * @returns The result of the WorkflowStateQuery
     */
    async workflowState(id: string): Promise<WorkflowStateQueryResponse> {
      const response = await requester<D.WorkflowStateQuery, D.WorkflowStateQueryVariables>(D.WorkflowStateDocument, {
        id,
      });
      return {
        ...response?.workflowState,
        team: response?.workflowState?.team?.id
          ? () => createLinearSdk(requester).team(response?.workflowState?.team?.id as string)
          : undefined,
        ...createLinearSdkWorkflowState(requester, id),
      };
    },
    /**
     * Call the Linear api with the workflowStates
     *
     * @param vars - variables to pass into the WorkflowStatesQuery
     * @returns The result of the WorkflowStatesQuery
     */
    async workflowStates(vars?: D.WorkflowStatesQueryVariables): Promise<WorkflowStatesQueryResponse> {
      const response = await requester<D.WorkflowStatesQuery, D.WorkflowStatesQueryVariables>(
        D.WorkflowStatesDocument,
        vars
      );
      return {
        ...response?.workflowStates,
        nodes: response?.workflowStates.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the userUpdate
     *
     * @param input - input to pass into the UserUpdateMutation
     * @param id - id to pass into the UserUpdateMutation
     * @returns The result of the UserUpdateMutation
     */
    async userUpdate(input: D.UpdateUserInput, id: string): Promise<UserUpdateMutationResponse> {
      const response = await requester<D.UserUpdateMutation, D.UserUpdateMutationVariables>(D.UserUpdateDocument, {
        input,
        id,
      });
      return {
        ...response?.userUpdate,
        user: response?.userUpdate?.user?.id
          ? () => createLinearSdk(requester).user(response?.userUpdate?.user?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the userSuspend
     *
     * @param id - id to pass into the UserSuspendMutation
     * @returns The result of the UserSuspendMutation
     */
    async userSuspend(id: string): Promise<UserSuspendMutationResponse> {
      const response = await requester<D.UserSuspendMutation, D.UserSuspendMutationVariables>(D.UserSuspendDocument, {
        id,
      });
      return response?.userSuspend;
    },
    /**
     * Call the Linear api with the userUnsuspend
     *
     * @param id - id to pass into the UserUnsuspendMutation
     * @returns The result of the UserUnsuspendMutation
     */
    async userUnsuspend(id: string): Promise<UserUnsuspendMutationResponse> {
      const response = await requester<D.UserUnsuspendMutation, D.UserUnsuspendMutationVariables>(
        D.UserUnsuspendDocument,
        { id }
      );
      return response?.userUnsuspend;
    },
    /**
     * Call the Linear api with the organizationUpdate
     *
     * @param input - input to pass into the OrganizationUpdateMutation
     * @returns The result of the OrganizationUpdateMutation
     */
    async organizationUpdate(input: D.UpdateOrganizationInput): Promise<OrganizationUpdateMutationResponse> {
      const response = await requester<D.OrganizationUpdateMutation, D.OrganizationUpdateMutationVariables>(
        D.OrganizationUpdateDocument,
        { input }
      );
      return {
        ...response?.organizationUpdate,
        organization: () => createLinearSdk(requester).organization(),
      };
    },
    /**
     * Call the Linear api with the organizationDeleteChallenge
     *
     * @returns The result of the OrganizationDeleteChallengeMutation
     */
    async organizationDeleteChallenge(): Promise<OrganizationDeleteChallengeMutationResponse> {
      const response = await requester<
        D.OrganizationDeleteChallengeMutation,
        D.OrganizationDeleteChallengeMutationVariables
      >(D.OrganizationDeleteChallengeDocument, {});
      return response?.organizationDeleteChallenge;
    },
    /**
     * Call the Linear api with the organizationDelete
     *
     * @param input - input to pass into the OrganizationDeleteMutation
     * @returns The result of the OrganizationDeleteMutation
     */
    async organizationDelete(input: D.DeleteOrganizationInput): Promise<OrganizationDeleteMutationResponse> {
      const response = await requester<D.OrganizationDeleteMutation, D.OrganizationDeleteMutationVariables>(
        D.OrganizationDeleteDocument,
        { input }
      );
      return response?.organizationDelete;
    },
    /**
     * Call the Linear api with the organizationToggleAccess
     *
     * @param id - id to pass into the OrganizationToggleAccessMutation
     * @returns The result of the OrganizationToggleAccessMutation
     */
    async organizationToggleAccess(id: string): Promise<OrganizationToggleAccessMutationResponse> {
      const response = await requester<D.OrganizationToggleAccessMutation, D.OrganizationToggleAccessMutationVariables>(
        D.OrganizationToggleAccessDocument,
        { id }
      );
      return response?.organizationToggleAccess;
    },
    /**
     * Call the Linear api with the organizationChangeEmailDomain
     *
     * @param toDomain - toDomain to pass into the OrganizationChangeEmailDomainMutation
     * @param fromDomain - fromDomain to pass into the OrganizationChangeEmailDomainMutation
     * @param id - id to pass into the OrganizationChangeEmailDomainMutation
     * @returns The result of the OrganizationChangeEmailDomainMutation
     */
    async organizationChangeEmailDomain(
      toDomain: string,
      fromDomain: string,
      id: string
    ): Promise<OrganizationChangeEmailDomainMutationResponse> {
      const response = await requester<
        D.OrganizationChangeEmailDomainMutation,
        D.OrganizationChangeEmailDomainMutationVariables
      >(D.OrganizationChangeEmailDomainDocument, { toDomain, fromDomain, id });
      return response?.organizationChangeEmailDomain;
    },
    /**
     * Call the Linear api with the organizationToggleSamlEnabled
     *
     * @param id - id to pass into the OrganizationToggleSamlEnabledMutation
     * @returns The result of the OrganizationToggleSamlEnabledMutation
     */
    async organizationToggleSamlEnabled(id: string): Promise<OrganizationToggleSamlEnabledMutationResponse> {
      const response = await requester<
        D.OrganizationToggleSamlEnabledMutation,
        D.OrganizationToggleSamlEnabledMutationVariables
      >(D.OrganizationToggleSamlEnabledDocument, { id });
      return response?.organizationToggleSamlEnabled;
    },
    /**
     * Call the Linear api with the organizationConfigureSaml
     *
     * @param samlConfiguration - samlConfiguration to pass into the OrganizationConfigureSamlMutation
     * @param id - id to pass into the OrganizationConfigureSamlMutation
     * @returns The result of the OrganizationConfigureSamlMutation
     */
    async organizationConfigureSaml(
      samlConfiguration: D.SamlConfigurationInput,
      id: string
    ): Promise<OrganizationConfigureSamlMutationResponse> {
      const response = await requester<
        D.OrganizationConfigureSamlMutation,
        D.OrganizationConfigureSamlMutationVariables
      >(D.OrganizationConfigureSamlDocument, { samlConfiguration, id });
      return response?.organizationConfigureSaml;
    },
    /**
     * Call the Linear api with the eventCreate
     *
     * @param input - input to pass into the EventCreateMutation
     * @returns The result of the EventCreateMutation
     */
    async eventCreate(input: D.EventCreateInput): Promise<EventCreateMutationResponse> {
      const response = await requester<D.EventCreateMutation, D.EventCreateMutationVariables>(D.EventCreateDocument, {
        input,
      });
      return response?.eventCreate;
    },
    /**
     * Call the Linear api with the apiKeyCreate
     *
     * @param input - input to pass into the ApiKeyCreateMutation
     * @returns The result of the ApiKeyCreateMutation
     */
    async apiKeyCreate(input: D.ApiKeyCreateInput): Promise<ApiKeyCreateMutationResponse> {
      const response = await requester<D.ApiKeyCreateMutation, D.ApiKeyCreateMutationVariables>(
        D.ApiKeyCreateDocument,
        { input }
      );
      return response?.apiKeyCreate;
    },
    /**
     * Call the Linear api with the apiKeyDelete
     *
     * @param id - id to pass into the ApiKeyDeleteMutation
     * @returns The result of the ApiKeyDeleteMutation
     */
    async apiKeyDelete(id: string): Promise<ApiKeyDeleteMutationResponse> {
      const response = await requester<D.ApiKeyDeleteMutation, D.ApiKeyDeleteMutationVariables>(
        D.ApiKeyDeleteDocument,
        { id }
      );
      return response?.apiKeyDelete;
    },
    /**
     * Call the Linear api with the emailUserAccountAuthChallenge
     *
     * @param input - input to pass into the EmailUserAccountAuthChallengeMutation
     * @returns The result of the EmailUserAccountAuthChallengeMutation
     */
    async emailUserAccountAuthChallenge(
      input: D.EmailUserAccountAuthChallengeInput
    ): Promise<EmailUserAccountAuthChallengeMutationResponse> {
      const response = await requester<
        D.EmailUserAccountAuthChallengeMutation,
        D.EmailUserAccountAuthChallengeMutationVariables
      >(D.EmailUserAccountAuthChallengeDocument, { input });
      return response?.emailUserAccountAuthChallenge;
    },
    /**
     * Call the Linear api with the emailTokenUserAccountAuth
     *
     * @param input - input to pass into the EmailTokenUserAccountAuthMutation
     * @returns The result of the EmailTokenUserAccountAuthMutation
     */
    async emailTokenUserAccountAuth(
      input: D.TokenUserAccountAuthInput
    ): Promise<EmailTokenUserAccountAuthMutationResponse> {
      const response = await requester<
        D.EmailTokenUserAccountAuthMutation,
        D.EmailTokenUserAccountAuthMutationVariables
      >(D.EmailTokenUserAccountAuthDocument, { input });
      return response?.emailTokenUserAccountAuth;
    },
    /**
     * Call the Linear api with the samlTokenUserAccountAuth
     *
     * @param input - input to pass into the SamlTokenUserAccountAuthMutation
     * @returns The result of the SamlTokenUserAccountAuthMutation
     */
    async samlTokenUserAccountAuth(
      input: D.TokenUserAccountAuthInput
    ): Promise<SamlTokenUserAccountAuthMutationResponse> {
      const response = await requester<D.SamlTokenUserAccountAuthMutation, D.SamlTokenUserAccountAuthMutationVariables>(
        D.SamlTokenUserAccountAuthDocument,
        { input }
      );
      return response?.samlTokenUserAccountAuth;
    },
    /**
     * Call the Linear api with the googleUserAccountAuth
     *
     * @param input - input to pass into the GoogleUserAccountAuthMutation
     * @returns The result of the GoogleUserAccountAuthMutation
     */
    async googleUserAccountAuth(input: D.GoogleUserAccountAuthInput): Promise<GoogleUserAccountAuthMutationResponse> {
      const response = await requester<D.GoogleUserAccountAuthMutation, D.GoogleUserAccountAuthMutationVariables>(
        D.GoogleUserAccountAuthDocument,
        { input }
      );
      return response?.googleUserAccountAuth;
    },
    /**
     * Call the Linear api with the createOrganizationFromOnboarding
     *
     * @param input - input to pass into the CreateOrganizationFromOnboardingMutation
     * @param vars - variables without 'input' to pass into the CreateOrganizationFromOnboardingMutation
     * @returns The result of the CreateOrganizationFromOnboardingMutation
     */
    async createOrganizationFromOnboarding(
      input: D.CreateOrganizationInput,
      vars?: Omit<D.CreateOrganizationFromOnboardingMutationVariables, "input">
    ): Promise<CreateOrganizationFromOnboardingMutationResponse> {
      const response = await requester<
        D.CreateOrganizationFromOnboardingMutation,
        D.CreateOrganizationFromOnboardingMutationVariables
      >(D.CreateOrganizationFromOnboardingDocument, { input, ...vars });
      return {
        ...response?.createOrganizationFromOnboarding,
        organization: () => createLinearSdk(requester).organization(),
        user: response?.createOrganizationFromOnboarding?.user?.id
          ? () => createLinearSdk(requester).user(response?.createOrganizationFromOnboarding?.user?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the joinOrganizationFromOnboarding
     *
     * @param input - input to pass into the JoinOrganizationFromOnboardingMutation
     * @returns The result of the JoinOrganizationFromOnboardingMutation
     */
    async joinOrganizationFromOnboarding(
      input: D.JoinOrganizationInput
    ): Promise<JoinOrganizationFromOnboardingMutationResponse> {
      const response = await requester<
        D.JoinOrganizationFromOnboardingMutation,
        D.JoinOrganizationFromOnboardingMutationVariables
      >(D.JoinOrganizationFromOnboardingDocument, { input });
      return {
        ...response?.joinOrganizationFromOnboarding,
        organization: () => createLinearSdk(requester).organization(),
        user: response?.joinOrganizationFromOnboarding?.user?.id
          ? () => createLinearSdk(requester).user(response?.joinOrganizationFromOnboarding?.user?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the leaveOrganization
     *
     * @param organizationId - organizationId to pass into the LeaveOrganizationMutation
     * @returns The result of the LeaveOrganizationMutation
     */
    async leaveOrganization(organizationId: string): Promise<LeaveOrganizationMutationResponse> {
      const response = await requester<D.LeaveOrganizationMutation, D.LeaveOrganizationMutationVariables>(
        D.LeaveOrganizationDocument,
        { organizationId }
      );
      return {
        ...response?.leaveOrganization,
        organization: () => createLinearSdk(requester).organization(),
        user: response?.leaveOrganization?.user?.id
          ? () => createLinearSdk(requester).user(response?.leaveOrganization?.user?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the billingEmailUpdate
     *
     * @param input - input to pass into the BillingEmailUpdateMutation
     * @returns The result of the BillingEmailUpdateMutation
     */
    async billingEmailUpdate(input: D.BillingEmailUpdateInput): Promise<BillingEmailUpdateMutationResponse> {
      const response = await requester<D.BillingEmailUpdateMutation, D.BillingEmailUpdateMutationVariables>(
        D.BillingEmailUpdateDocument,
        { input }
      );
      return response?.billingEmailUpdate;
    },
    /**
     * Call the Linear api with the collaborativeDocumentUpdate
     *
     * @param input - input to pass into the CollaborativeDocumentUpdateMutation
     * @returns The result of the CollaborativeDocumentUpdateMutation
     */
    async collaborativeDocumentUpdate(
      input: D.CollaborationDocumentUpdateInput
    ): Promise<CollaborativeDocumentUpdateMutationResponse> {
      const response = await requester<
        D.CollaborativeDocumentUpdateMutation,
        D.CollaborativeDocumentUpdateMutationVariables
      >(D.CollaborativeDocumentUpdateDocument, { input });
      return response?.collaborativeDocumentUpdate;
    },
    /**
     * Call the Linear api with the commentCreate
     *
     * @param input - input to pass into the CommentCreateMutation
     * @returns The result of the CommentCreateMutation
     */
    async commentCreate(input: D.CommentCreateInput): Promise<CommentCreateMutationResponse> {
      const response = await requester<D.CommentCreateMutation, D.CommentCreateMutationVariables>(
        D.CommentCreateDocument,
        { input }
      );
      return response?.commentCreate;
    },
    /**
     * Call the Linear api with the commentUpdate
     *
     * @param input - input to pass into the CommentUpdateMutation
     * @param id - id to pass into the CommentUpdateMutation
     * @returns The result of the CommentUpdateMutation
     */
    async commentUpdate(input: D.CommentUpdateInput, id: string): Promise<CommentUpdateMutationResponse> {
      const response = await requester<D.CommentUpdateMutation, D.CommentUpdateMutationVariables>(
        D.CommentUpdateDocument,
        { input, id }
      );
      return response?.commentUpdate;
    },
    /**
     * Call the Linear api with the commentDelete
     *
     * @param id - id to pass into the CommentDeleteMutation
     * @returns The result of the CommentDeleteMutation
     */
    async commentDelete(id: string): Promise<CommentDeleteMutationResponse> {
      const response = await requester<D.CommentDeleteMutation, D.CommentDeleteMutationVariables>(
        D.CommentDeleteDocument,
        { id }
      );
      return response?.commentDelete;
    },
    /**
     * Call the Linear api with the contactCreate
     *
     * @param input - input to pass into the ContactCreateMutation
     * @returns The result of the ContactCreateMutation
     */
    async contactCreate(input: D.ContactCreateInput): Promise<ContactCreateMutationResponse> {
      const response = await requester<D.ContactCreateMutation, D.ContactCreateMutationVariables>(
        D.ContactCreateDocument,
        { input }
      );
      return response?.contactCreate;
    },
    /**
     * Call the Linear api with the customViewCreate
     *
     * @param input - input to pass into the CustomViewCreateMutation
     * @returns The result of the CustomViewCreateMutation
     */
    async customViewCreate(input: D.CustomViewCreateInput): Promise<CustomViewCreateMutationResponse> {
      const response = await requester<D.CustomViewCreateMutation, D.CustomViewCreateMutationVariables>(
        D.CustomViewCreateDocument,
        { input }
      );
      return response?.customViewCreate;
    },
    /**
     * Call the Linear api with the customViewUpdate
     *
     * @param input - input to pass into the CustomViewUpdateMutation
     * @param id - id to pass into the CustomViewUpdateMutation
     * @returns The result of the CustomViewUpdateMutation
     */
    async customViewUpdate(input: D.CustomViewUpdateInput, id: string): Promise<CustomViewUpdateMutationResponse> {
      const response = await requester<D.CustomViewUpdateMutation, D.CustomViewUpdateMutationVariables>(
        D.CustomViewUpdateDocument,
        { input, id }
      );
      return response?.customViewUpdate;
    },
    /**
     * Call the Linear api with the customViewDelete
     *
     * @param id - id to pass into the CustomViewDeleteMutation
     * @returns The result of the CustomViewDeleteMutation
     */
    async customViewDelete(id: string): Promise<CustomViewDeleteMutationResponse> {
      const response = await requester<D.CustomViewDeleteMutation, D.CustomViewDeleteMutationVariables>(
        D.CustomViewDeleteDocument,
        { id }
      );
      return response?.customViewDelete;
    },
    /**
     * Call the Linear api with the cycleCreate
     *
     * @param input - input to pass into the CycleCreateMutation
     * @returns The result of the CycleCreateMutation
     */
    async cycleCreate(input: D.CycleCreateInput): Promise<CycleCreateMutationResponse> {
      const response = await requester<D.CycleCreateMutation, D.CycleCreateMutationVariables>(D.CycleCreateDocument, {
        input,
      });
      return {
        ...response?.cycleCreate,
        cycle: response?.cycleCreate?.cycle?.id
          ? () => createLinearSdk(requester).cycle(response?.cycleCreate?.cycle?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the cycleUpdate
     *
     * @param input - input to pass into the CycleUpdateMutation
     * @param id - id to pass into the CycleUpdateMutation
     * @returns The result of the CycleUpdateMutation
     */
    async cycleUpdate(input: D.CycleUpdateInput, id: string): Promise<CycleUpdateMutationResponse> {
      const response = await requester<D.CycleUpdateMutation, D.CycleUpdateMutationVariables>(D.CycleUpdateDocument, {
        input,
        id,
      });
      return {
        ...response?.cycleUpdate,
        cycle: response?.cycleUpdate?.cycle?.id
          ? () => createLinearSdk(requester).cycle(response?.cycleUpdate?.cycle?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the cycleArchive
     *
     * @param id - id to pass into the CycleArchiveMutation
     * @returns The result of the CycleArchiveMutation
     */
    async cycleArchive(id: string): Promise<CycleArchiveMutationResponse> {
      const response = await requester<D.CycleArchiveMutation, D.CycleArchiveMutationVariables>(
        D.CycleArchiveDocument,
        { id }
      );
      return response?.cycleArchive;
    },
    /**
     * Call the Linear api with the debugFailWithInternalError
     *
     * @returns The result of the DebugFailWithInternalErrorMutation
     */
    async debugFailWithInternalError(): Promise<DebugFailWithInternalErrorMutationResponse> {
      const response = await requester<
        D.DebugFailWithInternalErrorMutation,
        D.DebugFailWithInternalErrorMutationVariables
      >(D.DebugFailWithInternalErrorDocument, {});
      return response?.debugFailWithInternalError;
    },
    /**
     * Call the Linear api with the debugFailWithWarning
     *
     * @returns The result of the DebugFailWithWarningMutation
     */
    async debugFailWithWarning(): Promise<DebugFailWithWarningMutationResponse> {
      const response = await requester<D.DebugFailWithWarningMutation, D.DebugFailWithWarningMutationVariables>(
        D.DebugFailWithWarningDocument,
        {}
      );
      return response?.debugFailWithWarning;
    },
    /**
     * Call the Linear api with the debugCreateSAMLOrg
     *
     * @returns The result of the DebugCreateSamlOrgMutation
     */
    async debugCreateSAMLOrg(): Promise<DebugCreateSAMLOrgMutationResponse> {
      const response = await requester<D.DebugCreateSamlOrgMutation, D.DebugCreateSamlOrgMutationVariables>(
        D.DebugCreateSamlOrgDocument,
        {}
      );
      return response?.debugCreateSAMLOrg;
    },
    /**
     * Call the Linear api with the emailUnsubscribe
     *
     * @param input - input to pass into the EmailUnsubscribeMutation
     * @returns The result of the EmailUnsubscribeMutation
     */
    async emailUnsubscribe(input: D.EmailUnsubscribeInput): Promise<EmailUnsubscribeMutationResponse> {
      const response = await requester<D.EmailUnsubscribeMutation, D.EmailUnsubscribeMutationVariables>(
        D.EmailUnsubscribeDocument,
        { input }
      );
      return response?.emailUnsubscribe;
    },
    /**
     * Call the Linear api with the emojiCreate
     *
     * @param input - input to pass into the EmojiCreateMutation
     * @returns The result of the EmojiCreateMutation
     */
    async emojiCreate(input: D.EmojiCreateInput): Promise<EmojiCreateMutationResponse> {
      const response = await requester<D.EmojiCreateMutation, D.EmojiCreateMutationVariables>(D.EmojiCreateDocument, {
        input,
      });
      return response?.emojiCreate;
    },
    /**
     * Call the Linear api with the emojiDelete
     *
     * @param id - id to pass into the EmojiDeleteMutation
     * @returns The result of the EmojiDeleteMutation
     */
    async emojiDelete(id: string): Promise<EmojiDeleteMutationResponse> {
      const response = await requester<D.EmojiDeleteMutation, D.EmojiDeleteMutationVariables>(D.EmojiDeleteDocument, {
        id,
      });
      return response?.emojiDelete;
    },
    /**
     * Call the Linear api with the favoriteCreate
     *
     * @param input - input to pass into the FavoriteCreateMutation
     * @returns The result of the FavoriteCreateMutation
     */
    async favoriteCreate(input: D.FavoriteCreateInput): Promise<FavoriteCreateMutationResponse> {
      const response = await requester<D.FavoriteCreateMutation, D.FavoriteCreateMutationVariables>(
        D.FavoriteCreateDocument,
        { input }
      );
      return response?.favoriteCreate;
    },
    /**
     * Call the Linear api with the favoriteUpdate
     *
     * @param input - input to pass into the FavoriteUpdateMutation
     * @param id - id to pass into the FavoriteUpdateMutation
     * @returns The result of the FavoriteUpdateMutation
     */
    async favoriteUpdate(input: D.FavoriteUpdateInput, id: string): Promise<FavoriteUpdateMutationResponse> {
      const response = await requester<D.FavoriteUpdateMutation, D.FavoriteUpdateMutationVariables>(
        D.FavoriteUpdateDocument,
        { input, id }
      );
      return response?.favoriteUpdate;
    },
    /**
     * Call the Linear api with the favoriteDelete
     *
     * @param id - id to pass into the FavoriteDeleteMutation
     * @returns The result of the FavoriteDeleteMutation
     */
    async favoriteDelete(id: string): Promise<FavoriteDeleteMutationResponse> {
      const response = await requester<D.FavoriteDeleteMutation, D.FavoriteDeleteMutationVariables>(
        D.FavoriteDeleteDocument,
        { id }
      );
      return response?.favoriteDelete;
    },
    /**
     * Call the Linear api with the feedbackCreate
     *
     * @param input - input to pass into the FeedbackCreateMutation
     * @returns The result of the FeedbackCreateMutation
     */
    async feedbackCreate(input: D.FeedbackCreateInput): Promise<FeedbackCreateMutationResponse> {
      const response = await requester<D.FeedbackCreateMutation, D.FeedbackCreateMutationVariables>(
        D.FeedbackCreateDocument,
        { input }
      );
      return response?.feedbackCreate;
    },
    /**
     * Call the Linear api with the fileUpload
     *
     * @param size - size to pass into the FileUploadMutation
     * @param contentType - contentType to pass into the FileUploadMutation
     * @param filename - filename to pass into the FileUploadMutation
     * @param vars - variables without 'size', 'contentType', 'filename' to pass into the FileUploadMutation
     * @returns The result of the FileUploadMutation
     */
    async fileUpload(
      size: number,
      contentType: string,
      filename: string,
      vars?: Omit<D.FileUploadMutationVariables, "size" | "contentType" | "filename">
    ): Promise<FileUploadMutationResponse> {
      const response = await requester<D.FileUploadMutation, D.FileUploadMutationVariables>(D.FileUploadDocument, {
        size,
        contentType,
        filename,
        ...vars,
      });
      return response?.fileUpload;
    },
    /**
     * Call the Linear api with the imageUploadFromUrl
     *
     * @param url - url to pass into the ImageUploadFromUrlMutation
     * @returns The result of the ImageUploadFromUrlMutation
     */
    async imageUploadFromUrl(url: string): Promise<ImageUploadFromUrlMutationResponse> {
      const response = await requester<D.ImageUploadFromUrlMutation, D.ImageUploadFromUrlMutationVariables>(
        D.ImageUploadFromUrlDocument,
        { url }
      );
      return response?.imageUploadFromUrl;
    },
    /**
     * Call the Linear api with the integrationGithubConnect
     *
     * @param installationId - installationId to pass into the IntegrationGithubConnectMutation
     * @returns The result of the IntegrationGithubConnectMutation
     */
    async integrationGithubConnect(installationId: string): Promise<IntegrationGithubConnectMutationResponse> {
      const response = await requester<D.IntegrationGithubConnectMutation, D.IntegrationGithubConnectMutationVariables>(
        D.IntegrationGithubConnectDocument,
        { installationId }
      );
      return response?.integrationGithubConnect;
    },
    /**
     * Call the Linear api with the integrationGitlabConnect
     *
     * @param gitlabUrl - gitlabUrl to pass into the IntegrationGitlabConnectMutation
     * @param accessToken - accessToken to pass into the IntegrationGitlabConnectMutation
     * @returns The result of the IntegrationGitlabConnectMutation
     */
    async integrationGitlabConnect(
      gitlabUrl: string,
      accessToken: string
    ): Promise<IntegrationGitlabConnectMutationResponse> {
      const response = await requester<D.IntegrationGitlabConnectMutation, D.IntegrationGitlabConnectMutationVariables>(
        D.IntegrationGitlabConnectDocument,
        { gitlabUrl, accessToken }
      );
      return response?.integrationGitlabConnect;
    },
    /**
     * Call the Linear api with the integrationSlack
     *
     * @param redirectUri - redirectUri to pass into the IntegrationSlackMutation
     * @param code - code to pass into the IntegrationSlackMutation
     * @param vars - variables without 'redirectUri', 'code' to pass into the IntegrationSlackMutation
     * @returns The result of the IntegrationSlackMutation
     */
    async integrationSlack(
      redirectUri: string,
      code: string,
      vars?: Omit<D.IntegrationSlackMutationVariables, "redirectUri" | "code">
    ): Promise<IntegrationSlackMutationResponse> {
      const response = await requester<D.IntegrationSlackMutation, D.IntegrationSlackMutationVariables>(
        D.IntegrationSlackDocument,
        { redirectUri, code, ...vars }
      );
      return response?.integrationSlack;
    },
    /**
     * Call the Linear api with the integrationSlackPersonal
     *
     * @param redirectUri - redirectUri to pass into the IntegrationSlackPersonalMutation
     * @param code - code to pass into the IntegrationSlackPersonalMutation
     * @returns The result of the IntegrationSlackPersonalMutation
     */
    async integrationSlackPersonal(
      redirectUri: string,
      code: string
    ): Promise<IntegrationSlackPersonalMutationResponse> {
      const response = await requester<D.IntegrationSlackPersonalMutation, D.IntegrationSlackPersonalMutationVariables>(
        D.IntegrationSlackPersonalDocument,
        { redirectUri, code }
      );
      return response?.integrationSlackPersonal;
    },
    /**
     * Call the Linear api with the integrationSlackPost
     *
     * @param redirectUri - redirectUri to pass into the IntegrationSlackPostMutation
     * @param teamId - teamId to pass into the IntegrationSlackPostMutation
     * @param code - code to pass into the IntegrationSlackPostMutation
     * @param vars - variables without 'redirectUri', 'teamId', 'code' to pass into the IntegrationSlackPostMutation
     * @returns The result of the IntegrationSlackPostMutation
     */
    async integrationSlackPost(
      redirectUri: string,
      teamId: string,
      code: string,
      vars?: Omit<D.IntegrationSlackPostMutationVariables, "redirectUri" | "teamId" | "code">
    ): Promise<IntegrationSlackPostMutationResponse> {
      const response = await requester<D.IntegrationSlackPostMutation, D.IntegrationSlackPostMutationVariables>(
        D.IntegrationSlackPostDocument,
        { redirectUri, teamId, code, ...vars }
      );
      return response?.integrationSlackPost;
    },
    /**
     * Call the Linear api with the integrationSlackProjectPost
     *
     * @param redirectUri - redirectUri to pass into the IntegrationSlackProjectPostMutation
     * @param projectId - projectId to pass into the IntegrationSlackProjectPostMutation
     * @param code - code to pass into the IntegrationSlackProjectPostMutation
     * @returns The result of the IntegrationSlackProjectPostMutation
     */
    async integrationSlackProjectPost(
      redirectUri: string,
      projectId: string,
      code: string
    ): Promise<IntegrationSlackProjectPostMutationResponse> {
      const response = await requester<
        D.IntegrationSlackProjectPostMutation,
        D.IntegrationSlackProjectPostMutationVariables
      >(D.IntegrationSlackProjectPostDocument, { redirectUri, projectId, code });
      return response?.integrationSlackProjectPost;
    },
    /**
     * Call the Linear api with the integrationSlackImportEmojis
     *
     * @param redirectUri - redirectUri to pass into the IntegrationSlackImportEmojisMutation
     * @param code - code to pass into the IntegrationSlackImportEmojisMutation
     * @returns The result of the IntegrationSlackImportEmojisMutation
     */
    async integrationSlackImportEmojis(
      redirectUri: string,
      code: string
    ): Promise<IntegrationSlackImportEmojisMutationResponse> {
      const response = await requester<
        D.IntegrationSlackImportEmojisMutation,
        D.IntegrationSlackImportEmojisMutationVariables
      >(D.IntegrationSlackImportEmojisDocument, { redirectUri, code });
      return response?.integrationSlackImportEmojis;
    },
    /**
     * Call the Linear api with the integrationFigma
     *
     * @param redirectUri - redirectUri to pass into the IntegrationFigmaMutation
     * @param code - code to pass into the IntegrationFigmaMutation
     * @returns The result of the IntegrationFigmaMutation
     */
    async integrationFigma(redirectUri: string, code: string): Promise<IntegrationFigmaMutationResponse> {
      const response = await requester<D.IntegrationFigmaMutation, D.IntegrationFigmaMutationVariables>(
        D.IntegrationFigmaDocument,
        { redirectUri, code }
      );
      return response?.integrationFigma;
    },
    /**
     * Call the Linear api with the integrationGoogleSheets
     *
     * @param code - code to pass into the IntegrationGoogleSheetsMutation
     * @returns The result of the IntegrationGoogleSheetsMutation
     */
    async integrationGoogleSheets(code: string): Promise<IntegrationGoogleSheetsMutationResponse> {
      const response = await requester<D.IntegrationGoogleSheetsMutation, D.IntegrationGoogleSheetsMutationVariables>(
        D.IntegrationGoogleSheetsDocument,
        { code }
      );
      return response?.integrationGoogleSheets;
    },
    /**
     * Call the Linear api with the refreshGoogleSheetsData
     *
     * @param id - id to pass into the RefreshGoogleSheetsDataMutation
     * @returns The result of the RefreshGoogleSheetsDataMutation
     */
    async refreshGoogleSheetsData(id: string): Promise<RefreshGoogleSheetsDataMutationResponse> {
      const response = await requester<D.RefreshGoogleSheetsDataMutation, D.RefreshGoogleSheetsDataMutationVariables>(
        D.RefreshGoogleSheetsDataDocument,
        { id }
      );
      return response?.refreshGoogleSheetsData;
    },
    /**
     * Call the Linear api with the integrationSentryConnect
     *
     * @param organizationSlug - organizationSlug to pass into the IntegrationSentryConnectMutation
     * @param code - code to pass into the IntegrationSentryConnectMutation
     * @param installationId - installationId to pass into the IntegrationSentryConnectMutation
     * @returns The result of the IntegrationSentryConnectMutation
     */
    async integrationSentryConnect(
      organizationSlug: string,
      code: string,
      installationId: string
    ): Promise<IntegrationSentryConnectMutationResponse> {
      const response = await requester<D.IntegrationSentryConnectMutation, D.IntegrationSentryConnectMutationVariables>(
        D.IntegrationSentryConnectDocument,
        { organizationSlug, code, installationId }
      );
      return response?.integrationSentryConnect;
    },
    /**
     * Call the Linear api with the integrationDelete
     *
     * @param id - id to pass into the IntegrationDeleteMutation
     * @returns The result of the IntegrationDeleteMutation
     */
    async integrationDelete(id: string): Promise<IntegrationDeleteMutationResponse> {
      const response = await requester<D.IntegrationDeleteMutation, D.IntegrationDeleteMutationVariables>(
        D.IntegrationDeleteDocument,
        { id }
      );
      return response?.integrationDelete;
    },
    /**
     * Call the Linear api with the integrationResourceArchive
     *
     * @param id - id to pass into the IntegrationResourceArchiveMutation
     * @returns The result of the IntegrationResourceArchiveMutation
     */
    async integrationResourceArchive(id: string): Promise<IntegrationResourceArchiveMutationResponse> {
      const response = await requester<
        D.IntegrationResourceArchiveMutation,
        D.IntegrationResourceArchiveMutationVariables
      >(D.IntegrationResourceArchiveDocument, { id });
      return response?.integrationResourceArchive;
    },
    /**
     * Call the Linear api with the issueLabelCreate
     *
     * @param input - input to pass into the IssueLabelCreateMutation
     * @returns The result of the IssueLabelCreateMutation
     */
    async issueLabelCreate(input: D.IssueLabelCreateInput): Promise<IssueLabelCreateMutationResponse> {
      const response = await requester<D.IssueLabelCreateMutation, D.IssueLabelCreateMutationVariables>(
        D.IssueLabelCreateDocument,
        { input }
      );
      return {
        ...response?.issueLabelCreate,
        issueLabel: response?.issueLabelCreate?.issueLabel?.id
          ? () => createLinearSdk(requester).issueLabel(response?.issueLabelCreate?.issueLabel?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the issueLabelUpdate
     *
     * @param input - input to pass into the IssueLabelUpdateMutation
     * @param id - id to pass into the IssueLabelUpdateMutation
     * @returns The result of the IssueLabelUpdateMutation
     */
    async issueLabelUpdate(input: D.IssueLabelUpdateInput, id: string): Promise<IssueLabelUpdateMutationResponse> {
      const response = await requester<D.IssueLabelUpdateMutation, D.IssueLabelUpdateMutationVariables>(
        D.IssueLabelUpdateDocument,
        { input, id }
      );
      return {
        ...response?.issueLabelUpdate,
        issueLabel: response?.issueLabelUpdate?.issueLabel?.id
          ? () => createLinearSdk(requester).issueLabel(response?.issueLabelUpdate?.issueLabel?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the issueLabelArchive
     *
     * @param id - id to pass into the IssueLabelArchiveMutation
     * @returns The result of the IssueLabelArchiveMutation
     */
    async issueLabelArchive(id: string): Promise<IssueLabelArchiveMutationResponse> {
      const response = await requester<D.IssueLabelArchiveMutation, D.IssueLabelArchiveMutationVariables>(
        D.IssueLabelArchiveDocument,
        { id }
      );
      return response?.issueLabelArchive;
    },
    /**
     * Call the Linear api with the issueRelationCreate
     *
     * @param input - input to pass into the IssueRelationCreateMutation
     * @returns The result of the IssueRelationCreateMutation
     */
    async issueRelationCreate(input: D.IssueRelationCreateInput): Promise<IssueRelationCreateMutationResponse> {
      const response = await requester<D.IssueRelationCreateMutation, D.IssueRelationCreateMutationVariables>(
        D.IssueRelationCreateDocument,
        { input }
      );
      return response?.issueRelationCreate;
    },
    /**
     * Call the Linear api with the issueRelationUpdate
     *
     * @param input - input to pass into the IssueRelationUpdateMutation
     * @param id - id to pass into the IssueRelationUpdateMutation
     * @returns The result of the IssueRelationUpdateMutation
     */
    async issueRelationUpdate(
      input: D.IssueRelationUpdateInput,
      id: string
    ): Promise<IssueRelationUpdateMutationResponse> {
      const response = await requester<D.IssueRelationUpdateMutation, D.IssueRelationUpdateMutationVariables>(
        D.IssueRelationUpdateDocument,
        { input, id }
      );
      return response?.issueRelationUpdate;
    },
    /**
     * Call the Linear api with the issueRelationDelete
     *
     * @param id - id to pass into the IssueRelationDeleteMutation
     * @returns The result of the IssueRelationDeleteMutation
     */
    async issueRelationDelete(id: string): Promise<IssueRelationDeleteMutationResponse> {
      const response = await requester<D.IssueRelationDeleteMutation, D.IssueRelationDeleteMutationVariables>(
        D.IssueRelationDeleteDocument,
        { id }
      );
      return response?.issueRelationDelete;
    },
    /**
     * Call the Linear api with the issueCreate
     *
     * @param input - input to pass into the IssueCreateMutation
     * @returns The result of the IssueCreateMutation
     */
    async issueCreate(input: D.IssueCreateInput): Promise<IssueCreateMutationResponse> {
      const response = await requester<D.IssueCreateMutation, D.IssueCreateMutationVariables>(D.IssueCreateDocument, {
        input,
      });
      return {
        ...response?.issueCreate,
        issue: response?.issueCreate?.issue?.id
          ? () => createLinearSdk(requester).issue(response?.issueCreate?.issue?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the issueUpdate
     *
     * @param input - input to pass into the IssueUpdateMutation
     * @param id - id to pass into the IssueUpdateMutation
     * @returns The result of the IssueUpdateMutation
     */
    async issueUpdate(input: D.IssueUpdateInput, id: string): Promise<IssueUpdateMutationResponse> {
      const response = await requester<D.IssueUpdateMutation, D.IssueUpdateMutationVariables>(D.IssueUpdateDocument, {
        input,
        id,
      });
      return {
        ...response?.issueUpdate,
        issue: response?.issueUpdate?.issue?.id
          ? () => createLinearSdk(requester).issue(response?.issueUpdate?.issue?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the issueArchive
     *
     * @param id - id to pass into the IssueArchiveMutation
     * @returns The result of the IssueArchiveMutation
     */
    async issueArchive(id: string): Promise<IssueArchiveMutationResponse> {
      const response = await requester<D.IssueArchiveMutation, D.IssueArchiveMutationVariables>(
        D.IssueArchiveDocument,
        { id }
      );
      return response?.issueArchive;
    },
    /**
     * Call the Linear api with the issueUnarchive
     *
     * @param id - id to pass into the IssueUnarchiveMutation
     * @returns The result of the IssueUnarchiveMutation
     */
    async issueUnarchive(id: string): Promise<IssueUnarchiveMutationResponse> {
      const response = await requester<D.IssueUnarchiveMutation, D.IssueUnarchiveMutationVariables>(
        D.IssueUnarchiveDocument,
        { id }
      );
      return response?.issueUnarchive;
    },
    /**
     * Call the Linear api with the milestoneCreate
     *
     * @param input - input to pass into the MilestoneCreateMutation
     * @returns The result of the MilestoneCreateMutation
     */
    async milestoneCreate(input: D.MilestoneCreateInput): Promise<MilestoneCreateMutationResponse> {
      const response = await requester<D.MilestoneCreateMutation, D.MilestoneCreateMutationVariables>(
        D.MilestoneCreateDocument,
        { input }
      );
      return {
        ...response?.milestoneCreate,
        milestone: response?.milestoneCreate?.milestone?.id
          ? () => createLinearSdk(requester).milestone(response?.milestoneCreate?.milestone?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the milestoneUpdate
     *
     * @param input - input to pass into the MilestoneUpdateMutation
     * @param id - id to pass into the MilestoneUpdateMutation
     * @returns The result of the MilestoneUpdateMutation
     */
    async milestoneUpdate(input: D.MilestoneUpdateInput, id: string): Promise<MilestoneUpdateMutationResponse> {
      const response = await requester<D.MilestoneUpdateMutation, D.MilestoneUpdateMutationVariables>(
        D.MilestoneUpdateDocument,
        { input, id }
      );
      return {
        ...response?.milestoneUpdate,
        milestone: response?.milestoneUpdate?.milestone?.id
          ? () => createLinearSdk(requester).milestone(response?.milestoneUpdate?.milestone?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the milestoneDelete
     *
     * @param id - id to pass into the MilestoneDeleteMutation
     * @returns The result of the MilestoneDeleteMutation
     */
    async milestoneDelete(id: string): Promise<MilestoneDeleteMutationResponse> {
      const response = await requester<D.MilestoneDeleteMutation, D.MilestoneDeleteMutationVariables>(
        D.MilestoneDeleteDocument,
        { id }
      );
      return response?.milestoneDelete;
    },
    /**
     * Call the Linear api with the notificationCreate
     *
     * @param input - input to pass into the NotificationCreateMutation
     * @param id - id to pass into the NotificationCreateMutation
     * @returns The result of the NotificationCreateMutation
     */
    async notificationCreate(
      input: D.NotificationUpdateInput,
      id: string
    ): Promise<NotificationCreateMutationResponse> {
      const response = await requester<D.NotificationCreateMutation, D.NotificationCreateMutationVariables>(
        D.NotificationCreateDocument,
        { input, id }
      );
      return response?.notificationCreate;
    },
    /**
     * Call the Linear api with the notificationUpdate
     *
     * @param input - input to pass into the NotificationUpdateMutation
     * @param id - id to pass into the NotificationUpdateMutation
     * @returns The result of the NotificationUpdateMutation
     */
    async notificationUpdate(
      input: D.NotificationUpdateInput,
      id: string
    ): Promise<NotificationUpdateMutationResponse> {
      const response = await requester<D.NotificationUpdateMutation, D.NotificationUpdateMutationVariables>(
        D.NotificationUpdateDocument,
        { input, id }
      );
      return response?.notificationUpdate;
    },
    /**
     * Call the Linear api with the notificationDelete
     *
     * @param id - id to pass into the NotificationDeleteMutation
     * @returns The result of the NotificationDeleteMutation
     */
    async notificationDelete(id: string): Promise<NotificationDeleteMutationResponse> {
      const response = await requester<D.NotificationDeleteMutation, D.NotificationDeleteMutationVariables>(
        D.NotificationDeleteDocument,
        { id }
      );
      return response?.notificationDelete;
    },
    /**
     * Call the Linear api with the notificationArchive
     *
     * @param id - id to pass into the NotificationArchiveMutation
     * @returns The result of the NotificationArchiveMutation
     */
    async notificationArchive(id: string): Promise<NotificationArchiveMutationResponse> {
      const response = await requester<D.NotificationArchiveMutation, D.NotificationArchiveMutationVariables>(
        D.NotificationArchiveDocument,
        { id }
      );
      return response?.notificationArchive;
    },
    /**
     * Call the Linear api with the notificationUnarchive
     *
     * @param id - id to pass into the NotificationUnarchiveMutation
     * @returns The result of the NotificationUnarchiveMutation
     */
    async notificationUnarchive(id: string): Promise<NotificationUnarchiveMutationResponse> {
      const response = await requester<D.NotificationUnarchiveMutation, D.NotificationUnarchiveMutationVariables>(
        D.NotificationUnarchiveDocument,
        { id }
      );
      return response?.notificationUnarchive;
    },
    /**
     * Call the Linear api with the notificationSubscriptionCreate
     *
     * @param input - input to pass into the NotificationSubscriptionCreateMutation
     * @returns The result of the NotificationSubscriptionCreateMutation
     */
    async notificationSubscriptionCreate(
      input: D.NotificationSubscriptionCreateInput
    ): Promise<NotificationSubscriptionCreateMutationResponse> {
      const response = await requester<
        D.NotificationSubscriptionCreateMutation,
        D.NotificationSubscriptionCreateMutationVariables
      >(D.NotificationSubscriptionCreateDocument, { input });
      return response?.notificationSubscriptionCreate;
    },
    /**
     * Call the Linear api with the notificationSubscriptionDelete
     *
     * @param id - id to pass into the NotificationSubscriptionDeleteMutation
     * @returns The result of the NotificationSubscriptionDeleteMutation
     */
    async notificationSubscriptionDelete(id: string): Promise<NotificationSubscriptionDeleteMutationResponse> {
      const response = await requester<
        D.NotificationSubscriptionDeleteMutation,
        D.NotificationSubscriptionDeleteMutationVariables
      >(D.NotificationSubscriptionDeleteDocument, { id });
      return response?.notificationSubscriptionDelete;
    },
    /**
     * Call the Linear api with the oauthClientCreate
     *
     * @param input - input to pass into the OauthClientCreateMutation
     * @returns The result of the OauthClientCreateMutation
     */
    async oauthClientCreate(input: D.OauthClientCreateInput): Promise<OauthClientCreateMutationResponse> {
      const response = await requester<D.OauthClientCreateMutation, D.OauthClientCreateMutationVariables>(
        D.OauthClientCreateDocument,
        { input }
      );
      return response?.oauthClientCreate;
    },
    /**
     * Call the Linear api with the oauthClientUpdate
     *
     * @param input - input to pass into the OauthClientUpdateMutation
     * @param id - id to pass into the OauthClientUpdateMutation
     * @returns The result of the OauthClientUpdateMutation
     */
    async oauthClientUpdate(input: D.OauthClientUpdateInput, id: string): Promise<OauthClientUpdateMutationResponse> {
      const response = await requester<D.OauthClientUpdateMutation, D.OauthClientUpdateMutationVariables>(
        D.OauthClientUpdateDocument,
        { input, id }
      );
      return response?.oauthClientUpdate;
    },
    /**
     * Call the Linear api with the oauthClientArchive
     *
     * @param id - id to pass into the OauthClientArchiveMutation
     * @returns The result of the OauthClientArchiveMutation
     */
    async oauthClientArchive(id: string): Promise<OauthClientArchiveMutationResponse> {
      const response = await requester<D.OauthClientArchiveMutation, D.OauthClientArchiveMutationVariables>(
        D.OauthClientArchiveDocument,
        { id }
      );
      return response?.oauthClientArchive;
    },
    /**
     * Call the Linear api with the oauthClientRotateSecret
     *
     * @param id - id to pass into the OauthClientRotateSecretMutation
     * @returns The result of the OauthClientRotateSecretMutation
     */
    async oauthClientRotateSecret(id: string): Promise<OauthClientRotateSecretMutationResponse> {
      const response = await requester<D.OauthClientRotateSecretMutation, D.OauthClientRotateSecretMutationVariables>(
        D.OauthClientRotateSecretDocument,
        { id }
      );
      return response?.oauthClientRotateSecret;
    },
    /**
     * Call the Linear api with the oauthTokenRevoke
     *
     * @param scope - scope to pass into the OauthTokenRevokeMutation
     * @param appId - appId to pass into the OauthTokenRevokeMutation
     * @returns The result of the OauthTokenRevokeMutation
     */
    async oauthTokenRevoke(scope: string[], appId: string): Promise<OauthTokenRevokeMutationResponse> {
      const response = await requester<D.OauthTokenRevokeMutation, D.OauthTokenRevokeMutationVariables>(
        D.OauthTokenRevokeDocument,
        { scope, appId }
      );
      return response?.oauthTokenRevoke;
    },
    /**
     * Call the Linear api with the organizationDomainVerify
     *
     * @param input - input to pass into the OrganizationDomainVerifyMutation
     * @returns The result of the OrganizationDomainVerifyMutation
     */
    async organizationDomainVerify(
      input: D.OrganizationDomainVerificationInput
    ): Promise<OrganizationDomainVerifyMutationResponse> {
      const response = await requester<D.OrganizationDomainVerifyMutation, D.OrganizationDomainVerifyMutationVariables>(
        D.OrganizationDomainVerifyDocument,
        { input }
      );
      return response?.organizationDomainVerify;
    },
    /**
     * Call the Linear api with the organizationDomainCreate
     *
     * @param input - input to pass into the OrganizationDomainCreateMutation
     * @returns The result of the OrganizationDomainCreateMutation
     */
    async organizationDomainCreate(
      input: D.OrganizationDomainCreateInput
    ): Promise<OrganizationDomainCreateMutationResponse> {
      const response = await requester<D.OrganizationDomainCreateMutation, D.OrganizationDomainCreateMutationVariables>(
        D.OrganizationDomainCreateDocument,
        { input }
      );
      return response?.organizationDomainCreate;
    },
    /**
     * Call the Linear api with the organizationDomainDelete
     *
     * @param id - id to pass into the OrganizationDomainDeleteMutation
     * @returns The result of the OrganizationDomainDeleteMutation
     */
    async organizationDomainDelete(id: string): Promise<OrganizationDomainDeleteMutationResponse> {
      const response = await requester<D.OrganizationDomainDeleteMutation, D.OrganizationDomainDeleteMutationVariables>(
        D.OrganizationDomainDeleteDocument,
        { id }
      );
      return response?.organizationDomainDelete;
    },
    /**
     * Call the Linear api with the organizationInviteCreate
     *
     * @param input - input to pass into the OrganizationInviteCreateMutation
     * @returns The result of the OrganizationInviteCreateMutation
     */
    async organizationInviteCreate(
      input: D.OrganizationInviteCreateInput
    ): Promise<OrganizationInviteCreateMutationResponse> {
      const response = await requester<D.OrganizationInviteCreateMutation, D.OrganizationInviteCreateMutationVariables>(
        D.OrganizationInviteCreateDocument,
        { input }
      );
      return {
        ...response?.organizationInviteCreate,
        organizationInvite: response?.organizationInviteCreate?.organizationInvite?.id
          ? () =>
              createLinearSdk(requester).organizationInvite(
                response?.organizationInviteCreate?.organizationInvite?.id as string
              )
          : undefined,
      };
    },
    /**
     * Call the Linear api with the resentOrganizationInvite
     *
     * @param id - id to pass into the ResentOrganizationInviteMutation
     * @returns The result of the ResentOrganizationInviteMutation
     */
    async resentOrganizationInvite(id: string): Promise<ResentOrganizationInviteMutationResponse> {
      const response = await requester<D.ResentOrganizationInviteMutation, D.ResentOrganizationInviteMutationVariables>(
        D.ResentOrganizationInviteDocument,
        { id }
      );
      return response?.resentOrganizationInvite;
    },
    /**
     * Call the Linear api with the organizationInviteDelete
     *
     * @param id - id to pass into the OrganizationInviteDeleteMutation
     * @returns The result of the OrganizationInviteDeleteMutation
     */
    async organizationInviteDelete(id: string): Promise<OrganizationInviteDeleteMutationResponse> {
      const response = await requester<D.OrganizationInviteDeleteMutation, D.OrganizationInviteDeleteMutationVariables>(
        D.OrganizationInviteDeleteDocument,
        { id }
      );
      return response?.organizationInviteDelete;
    },
    /**
     * Call the Linear api with the projectLinkCreate
     *
     * @param input - input to pass into the ProjectLinkCreateMutation
     * @returns The result of the ProjectLinkCreateMutation
     */
    async projectLinkCreate(input: D.ProjectLinkCreateInput): Promise<ProjectLinkCreateMutationResponse> {
      const response = await requester<D.ProjectLinkCreateMutation, D.ProjectLinkCreateMutationVariables>(
        D.ProjectLinkCreateDocument,
        { input }
      );
      return response?.projectLinkCreate;
    },
    /**
     * Call the Linear api with the projectLinkDelete
     *
     * @param id - id to pass into the ProjectLinkDeleteMutation
     * @returns The result of the ProjectLinkDeleteMutation
     */
    async projectLinkDelete(id: string): Promise<ProjectLinkDeleteMutationResponse> {
      const response = await requester<D.ProjectLinkDeleteMutation, D.ProjectLinkDeleteMutationVariables>(
        D.ProjectLinkDeleteDocument,
        { id }
      );
      return response?.projectLinkDelete;
    },
    /**
     * Call the Linear api with the projectCreate
     *
     * @param input - input to pass into the ProjectCreateMutation
     * @returns The result of the ProjectCreateMutation
     */
    async projectCreate(input: D.ProjectCreateInput): Promise<ProjectCreateMutationResponse> {
      const response = await requester<D.ProjectCreateMutation, D.ProjectCreateMutationVariables>(
        D.ProjectCreateDocument,
        { input }
      );
      return {
        ...response?.projectCreate,
        project: response?.projectCreate?.project?.id
          ? () => createLinearSdk(requester).project(response?.projectCreate?.project?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the projectUpdate
     *
     * @param input - input to pass into the ProjectUpdateMutation
     * @param id - id to pass into the ProjectUpdateMutation
     * @returns The result of the ProjectUpdateMutation
     */
    async projectUpdate(input: D.ProjectUpdateInput, id: string): Promise<ProjectUpdateMutationResponse> {
      const response = await requester<D.ProjectUpdateMutation, D.ProjectUpdateMutationVariables>(
        D.ProjectUpdateDocument,
        { input, id }
      );
      return {
        ...response?.projectUpdate,
        project: response?.projectUpdate?.project?.id
          ? () => createLinearSdk(requester).project(response?.projectUpdate?.project?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the projectArchive
     *
     * @param id - id to pass into the ProjectArchiveMutation
     * @returns The result of the ProjectArchiveMutation
     */
    async projectArchive(id: string): Promise<ProjectArchiveMutationResponse> {
      const response = await requester<D.ProjectArchiveMutation, D.ProjectArchiveMutationVariables>(
        D.ProjectArchiveDocument,
        { id }
      );
      return response?.projectArchive;
    },
    /**
     * Call the Linear api with the pushSubscriptionCreate
     *
     * @param input - input to pass into the PushSubscriptionCreateMutation
     * @returns The result of the PushSubscriptionCreateMutation
     */
    async pushSubscriptionCreate(
      input: D.PushSubscriptionCreateInput
    ): Promise<PushSubscriptionCreateMutationResponse> {
      const response = await requester<D.PushSubscriptionCreateMutation, D.PushSubscriptionCreateMutationVariables>(
        D.PushSubscriptionCreateDocument,
        { input }
      );
      return response?.pushSubscriptionCreate;
    },
    /**
     * Call the Linear api with the pushSubscriptionDelete
     *
     * @param id - id to pass into the PushSubscriptionDeleteMutation
     * @returns The result of the PushSubscriptionDeleteMutation
     */
    async pushSubscriptionDelete(id: string): Promise<PushSubscriptionDeleteMutationResponse> {
      const response = await requester<D.PushSubscriptionDeleteMutation, D.PushSubscriptionDeleteMutationVariables>(
        D.PushSubscriptionDeleteDocument,
        { id }
      );
      return response?.pushSubscriptionDelete;
    },
    /**
     * Call the Linear api with the reactionCreate
     *
     * @param input - input to pass into the ReactionCreateMutation
     * @returns The result of the ReactionCreateMutation
     */
    async reactionCreate(input: D.ReactionCreateInput): Promise<ReactionCreateMutationResponse> {
      const response = await requester<D.ReactionCreateMutation, D.ReactionCreateMutationVariables>(
        D.ReactionCreateDocument,
        { input }
      );
      return response?.reactionCreate;
    },
    /**
     * Call the Linear api with the reactionDelete
     *
     * @param id - id to pass into the ReactionDeleteMutation
     * @returns The result of the ReactionDeleteMutation
     */
    async reactionDelete(id: string): Promise<ReactionDeleteMutationResponse> {
      const response = await requester<D.ReactionDeleteMutation, D.ReactionDeleteMutationVariables>(
        D.ReactionDeleteDocument,
        { id }
      );
      return response?.reactionDelete;
    },
    /**
     * Call the Linear api with the createCsvExportReport
     *
     * @returns The result of the CreateCsvExportReportMutation
     */
    async createCsvExportReport(): Promise<CreateCsvExportReportMutationResponse> {
      const response = await requester<D.CreateCsvExportReportMutation, D.CreateCsvExportReportMutationVariables>(
        D.CreateCsvExportReportDocument,
        {}
      );
      return response?.createCsvExportReport;
    },
    /**
     * Call the Linear api with the subscriptionSessionCreate
     *
     * @param plan - plan to pass into the SubscriptionSessionCreateMutation
     * @returns The result of the SubscriptionSessionCreateMutation
     */
    async subscriptionSessionCreate(plan: string): Promise<SubscriptionSessionCreateMutationResponse> {
      const response = await requester<
        D.SubscriptionSessionCreateMutation,
        D.SubscriptionSessionCreateMutationVariables
      >(D.SubscriptionSessionCreateDocument, { plan });
      return response?.subscriptionSessionCreate;
    },
    /**
     * Call the Linear api with the subscriptionUpdateSessionCreate
     *
     * @returns The result of the SubscriptionUpdateSessionCreateMutation
     */
    async subscriptionUpdateSessionCreate(): Promise<SubscriptionUpdateSessionCreateMutationResponse> {
      const response = await requester<
        D.SubscriptionUpdateSessionCreateMutation,
        D.SubscriptionUpdateSessionCreateMutationVariables
      >(D.SubscriptionUpdateSessionCreateDocument, {});
      return response?.subscriptionUpdateSessionCreate;
    },
    /**
     * Call the Linear api with the subscriptionUpdate
     *
     * @param input - input to pass into the SubscriptionUpdateMutation
     * @param id - id to pass into the SubscriptionUpdateMutation
     * @returns The result of the SubscriptionUpdateMutation
     */
    async subscriptionUpdate(
      input: D.SubscriptionUpdateInput,
      id: string
    ): Promise<SubscriptionUpdateMutationResponse> {
      const response = await requester<D.SubscriptionUpdateMutation, D.SubscriptionUpdateMutationVariables>(
        D.SubscriptionUpdateDocument,
        { input, id }
      );
      return response?.subscriptionUpdate;
    },
    /**
     * Call the Linear api with the subscriptionUpgrade
     *
     * @param type - type to pass into the SubscriptionUpgradeMutation
     * @param id - id to pass into the SubscriptionUpgradeMutation
     * @returns The result of the SubscriptionUpgradeMutation
     */
    async subscriptionUpgrade(type: string, id: string): Promise<SubscriptionUpgradeMutationResponse> {
      const response = await requester<D.SubscriptionUpgradeMutation, D.SubscriptionUpgradeMutationVariables>(
        D.SubscriptionUpgradeDocument,
        { type, id }
      );
      return response?.subscriptionUpgrade;
    },
    /**
     * Call the Linear api with the subscriptionArchive
     *
     * @param id - id to pass into the SubscriptionArchiveMutation
     * @returns The result of the SubscriptionArchiveMutation
     */
    async subscriptionArchive(id: string): Promise<SubscriptionArchiveMutationResponse> {
      const response = await requester<D.SubscriptionArchiveMutation, D.SubscriptionArchiveMutationVariables>(
        D.SubscriptionArchiveDocument,
        { id }
      );
      return response?.subscriptionArchive;
    },
    /**
     * Call the Linear api with the teamMembershipCreate
     *
     * @param input - input to pass into the TeamMembershipCreateMutation
     * @returns The result of the TeamMembershipCreateMutation
     */
    async teamMembershipCreate(input: D.TeamMembershipCreateInput): Promise<TeamMembershipCreateMutationResponse> {
      const response = await requester<D.TeamMembershipCreateMutation, D.TeamMembershipCreateMutationVariables>(
        D.TeamMembershipCreateDocument,
        { input }
      );
      return response?.teamMembershipCreate;
    },
    /**
     * Call the Linear api with the teamMembershipDelete
     *
     * @param id - id to pass into the TeamMembershipDeleteMutation
     * @returns The result of the TeamMembershipDeleteMutation
     */
    async teamMembershipDelete(id: string): Promise<TeamMembershipDeleteMutationResponse> {
      const response = await requester<D.TeamMembershipDeleteMutation, D.TeamMembershipDeleteMutationVariables>(
        D.TeamMembershipDeleteDocument,
        { id }
      );
      return response?.teamMembershipDelete;
    },
    /**
     * Call the Linear api with the teamCreate
     *
     * @param input - input to pass into the TeamCreateMutation
     * @param vars - variables without 'input' to pass into the TeamCreateMutation
     * @returns The result of the TeamCreateMutation
     */
    async teamCreate(
      input: D.TeamCreateInput,
      vars?: Omit<D.TeamCreateMutationVariables, "input">
    ): Promise<TeamCreateMutationResponse> {
      const response = await requester<D.TeamCreateMutation, D.TeamCreateMutationVariables>(D.TeamCreateDocument, {
        input,
        ...vars,
      });
      return {
        ...response?.teamCreate,
        team: response?.teamCreate?.team?.id
          ? () => createLinearSdk(requester).team(response?.teamCreate?.team?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the teamUpdate
     *
     * @param input - input to pass into the TeamUpdateMutation
     * @param id - id to pass into the TeamUpdateMutation
     * @returns The result of the TeamUpdateMutation
     */
    async teamUpdate(input: D.TeamUpdateInput, id: string): Promise<TeamUpdateMutationResponse> {
      const response = await requester<D.TeamUpdateMutation, D.TeamUpdateMutationVariables>(D.TeamUpdateDocument, {
        input,
        id,
      });
      return {
        ...response?.teamUpdate,
        team: response?.teamUpdate?.team?.id
          ? () => createLinearSdk(requester).team(response?.teamUpdate?.team?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the teamArchive
     *
     * @param id - id to pass into the TeamArchiveMutation
     * @returns The result of the TeamArchiveMutation
     */
    async teamArchive(id: string): Promise<TeamArchiveMutationResponse> {
      const response = await requester<D.TeamArchiveMutation, D.TeamArchiveMutationVariables>(D.TeamArchiveDocument, {
        id,
      });
      return response?.teamArchive;
    },
    /**
     * Call the Linear api with the teamDelete
     *
     * @param id - id to pass into the TeamDeleteMutation
     * @returns The result of the TeamDeleteMutation
     */
    async teamDelete(id: string): Promise<TeamDeleteMutationResponse> {
      const response = await requester<D.TeamDeleteMutation, D.TeamDeleteMutationVariables>(D.TeamDeleteDocument, {
        id,
      });
      return response?.teamDelete;
    },
    /**
     * Call the Linear api with the templateCreate
     *
     * @param input - input to pass into the TemplateCreateMutation
     * @returns The result of the TemplateCreateMutation
     */
    async templateCreate(input: D.TemplateCreateInput): Promise<TemplateCreateMutationResponse> {
      const response = await requester<D.TemplateCreateMutation, D.TemplateCreateMutationVariables>(
        D.TemplateCreateDocument,
        { input }
      );
      return response?.templateCreate;
    },
    /**
     * Call the Linear api with the templateUpdate
     *
     * @param input - input to pass into the TemplateUpdateMutation
     * @param id - id to pass into the TemplateUpdateMutation
     * @returns The result of the TemplateUpdateMutation
     */
    async templateUpdate(input: D.TemplateUpdateInput, id: string): Promise<TemplateUpdateMutationResponse> {
      const response = await requester<D.TemplateUpdateMutation, D.TemplateUpdateMutationVariables>(
        D.TemplateUpdateDocument,
        { input, id }
      );
      return response?.templateUpdate;
    },
    /**
     * Call the Linear api with the templateDelete
     *
     * @param id - id to pass into the TemplateDeleteMutation
     * @returns The result of the TemplateDeleteMutation
     */
    async templateDelete(id: string): Promise<TemplateDeleteMutationResponse> {
      const response = await requester<D.TemplateDeleteMutation, D.TemplateDeleteMutationVariables>(
        D.TemplateDeleteDocument,
        { id }
      );
      return response?.templateDelete;
    },
    /**
     * Call the Linear api with the userSettingsUpdate
     *
     * @param input - input to pass into the UserSettingsUpdateMutation
     * @param id - id to pass into the UserSettingsUpdateMutation
     * @returns The result of the UserSettingsUpdateMutation
     */
    async userSettingsUpdate(
      input: D.UserSettingsUpdateInput,
      id: string
    ): Promise<UserSettingsUpdateMutationResponse> {
      const response = await requester<D.UserSettingsUpdateMutation, D.UserSettingsUpdateMutationVariables>(
        D.UserSettingsUpdateDocument,
        { input, id }
      );
      return response?.userSettingsUpdate;
    },
    /**
     * Call the Linear api with the userSettingsFlagIncrement
     *
     * @param flag - flag to pass into the UserSettingsFlagIncrementMutation
     * @returns The result of the UserSettingsFlagIncrementMutation
     */
    async userSettingsFlagIncrement(flag: string): Promise<UserSettingsFlagIncrementMutationResponse> {
      const response = await requester<
        D.UserSettingsFlagIncrementMutation,
        D.UserSettingsFlagIncrementMutationVariables
      >(D.UserSettingsFlagIncrementDocument, { flag });
      return response?.userSettingsFlagIncrement;
    },
    /**
     * Call the Linear api with the userSettingsFlagsReset
     *
     * @returns The result of the UserSettingsFlagsResetMutation
     */
    async userSettingsFlagsReset(): Promise<UserSettingsFlagsResetMutationResponse> {
      const response = await requester<D.UserSettingsFlagsResetMutation, D.UserSettingsFlagsResetMutationVariables>(
        D.UserSettingsFlagsResetDocument,
        {}
      );
      return response?.userSettingsFlagsReset;
    },
    /**
     * Call the Linear api with the userFlagUpdate
     *
     * @param operation - operation to pass into the UserFlagUpdateMutation
     * @param flag - flag to pass into the UserFlagUpdateMutation
     * @returns The result of the UserFlagUpdateMutation
     */
    async userFlagUpdate(
      operation: D.UserFlagUpdateOperation,
      flag: D.UserFlagType
    ): Promise<UserFlagUpdateMutationResponse> {
      const response = await requester<D.UserFlagUpdateMutation, D.UserFlagUpdateMutationVariables>(
        D.UserFlagUpdateDocument,
        { operation, flag }
      );
      return response?.userFlagUpdate;
    },
    /**
     * Call the Linear api with the userSubscribeToNewsletter
     *
     * @returns The result of the UserSubscribeToNewsletterMutation
     */
    async userSubscribeToNewsletter(): Promise<UserSubscribeToNewsletterMutationResponse> {
      const response = await requester<
        D.UserSubscribeToNewsletterMutation,
        D.UserSubscribeToNewsletterMutationVariables
      >(D.UserSubscribeToNewsletterDocument, {});
      return response?.userSubscribeToNewsletter;
    },
    /**
     * Call the Linear api with the viewPreferencesCreate
     *
     * @param input - input to pass into the ViewPreferencesCreateMutation
     * @returns The result of the ViewPreferencesCreateMutation
     */
    async viewPreferencesCreate(input: D.ViewPreferencesCreateInput): Promise<ViewPreferencesCreateMutationResponse> {
      const response = await requester<D.ViewPreferencesCreateMutation, D.ViewPreferencesCreateMutationVariables>(
        D.ViewPreferencesCreateDocument,
        { input }
      );
      return response?.viewPreferencesCreate;
    },
    /**
     * Call the Linear api with the viewPreferencesUpdate
     *
     * @param input - input to pass into the ViewPreferencesUpdateMutation
     * @param id - id to pass into the ViewPreferencesUpdateMutation
     * @returns The result of the ViewPreferencesUpdateMutation
     */
    async viewPreferencesUpdate(
      input: D.ViewPreferencesUpdateInput,
      id: string
    ): Promise<ViewPreferencesUpdateMutationResponse> {
      const response = await requester<D.ViewPreferencesUpdateMutation, D.ViewPreferencesUpdateMutationVariables>(
        D.ViewPreferencesUpdateDocument,
        { input, id }
      );
      return response?.viewPreferencesUpdate;
    },
    /**
     * Call the Linear api with the viewPreferencesDelete
     *
     * @param id - id to pass into the ViewPreferencesDeleteMutation
     * @returns The result of the ViewPreferencesDeleteMutation
     */
    async viewPreferencesDelete(id: string): Promise<ViewPreferencesDeleteMutationResponse> {
      const response = await requester<D.ViewPreferencesDeleteMutation, D.ViewPreferencesDeleteMutationVariables>(
        D.ViewPreferencesDeleteDocument,
        { id }
      );
      return response?.viewPreferencesDelete;
    },
    /**
     * Call the Linear api with the webhookCreate
     *
     * @param input - input to pass into the WebhookCreateMutation
     * @returns The result of the WebhookCreateMutation
     */
    async webhookCreate(input: D.WebhookCreateInput): Promise<WebhookCreateMutationResponse> {
      const response = await requester<D.WebhookCreateMutation, D.WebhookCreateMutationVariables>(
        D.WebhookCreateDocument,
        { input }
      );
      return response?.webhookCreate;
    },
    /**
     * Call the Linear api with the webhookUpdate
     *
     * @param input - input to pass into the WebhookUpdateMutation
     * @param id - id to pass into the WebhookUpdateMutation
     * @returns The result of the WebhookUpdateMutation
     */
    async webhookUpdate(input: D.WebhookUpdateInput, id: string): Promise<WebhookUpdateMutationResponse> {
      const response = await requester<D.WebhookUpdateMutation, D.WebhookUpdateMutationVariables>(
        D.WebhookUpdateDocument,
        { input, id }
      );
      return response?.webhookUpdate;
    },
    /**
     * Call the Linear api with the webhookDelete
     *
     * @param id - id to pass into the WebhookDeleteMutation
     * @returns The result of the WebhookDeleteMutation
     */
    async webhookDelete(id: string): Promise<WebhookDeleteMutationResponse> {
      const response = await requester<D.WebhookDeleteMutation, D.WebhookDeleteMutationVariables>(
        D.WebhookDeleteDocument,
        { id }
      );
      return response?.webhookDelete;
    },
    /**
     * Call the Linear api with the workflowStateCreate
     *
     * @param input - input to pass into the WorkflowStateCreateMutation
     * @returns The result of the WorkflowStateCreateMutation
     */
    async workflowStateCreate(input: D.WorkflowStateCreateInput): Promise<WorkflowStateCreateMutationResponse> {
      const response = await requester<D.WorkflowStateCreateMutation, D.WorkflowStateCreateMutationVariables>(
        D.WorkflowStateCreateDocument,
        { input }
      );
      return {
        ...response?.workflowStateCreate,
        workflowState: response?.workflowStateCreate?.workflowState?.id
          ? () => createLinearSdk(requester).workflowState(response?.workflowStateCreate?.workflowState?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the workflowStateUpdate
     *
     * @param input - input to pass into the WorkflowStateUpdateMutation
     * @param id - id to pass into the WorkflowStateUpdateMutation
     * @returns The result of the WorkflowStateUpdateMutation
     */
    async workflowStateUpdate(
      input: D.WorkflowStateUpdateInput,
      id: string
    ): Promise<WorkflowStateUpdateMutationResponse> {
      const response = await requester<D.WorkflowStateUpdateMutation, D.WorkflowStateUpdateMutationVariables>(
        D.WorkflowStateUpdateDocument,
        { input, id }
      );
      return {
        ...response?.workflowStateUpdate,
        workflowState: response?.workflowStateUpdate?.workflowState?.id
          ? () => createLinearSdk(requester).workflowState(response?.workflowStateUpdate?.workflowState?.id as string)
          : undefined,
      };
    },
    /**
     * Call the Linear api with the workflowStateArchive
     *
     * @param id - id to pass into the WorkflowStateArchiveMutation
     * @returns The result of the WorkflowStateArchiveMutation
     */
    async workflowStateArchive(id: string): Promise<WorkflowStateArchiveMutationResponse> {
      const response = await requester<D.WorkflowStateArchiveMutation, D.WorkflowStateArchiveMutationVariables>(
        D.WorkflowStateArchiveDocument,
        { id }
      );
      return response?.workflowStateArchive;
    },
  };
}

/**
 * The returned type from calling createLinearSdk
 * Initialize a set of operations to run against the Linear api
 */
export type LinearSdk = ReturnType<typeof createLinearSdk>;

/**
 * Initialize a set of operations, scoped to user, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single user
 */
export function createLinearSdkUser(requester: LinearRequester, id: string) {
  return {
    /**
     * Call the Linear api with the assignedIssues
     *
     * @param vars - variables without 'id' to pass into the User_AssignedIssuesQuery
     * @returns The result of the User_AssignedIssuesQuery
     */
    async assignedIssues(
      vars?: Omit<D.User_AssignedIssuesQueryVariables, "id">
    ): Promise<User_AssignedIssuesQueryResponse> {
      const response = await requester<D.User_AssignedIssuesQuery, D.User_AssignedIssuesQueryVariables>(
        D.User_AssignedIssuesDocument,
        { id, ...vars }
      );
      return {
        ...response?.user?.assignedIssues,
        nodes: response?.user?.assignedIssues.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the createdIssues
     *
     * @param vars - variables without 'id' to pass into the User_CreatedIssuesQuery
     * @returns The result of the User_CreatedIssuesQuery
     */
    async createdIssues(
      vars?: Omit<D.User_CreatedIssuesQueryVariables, "id">
    ): Promise<User_CreatedIssuesQueryResponse> {
      const response = await requester<D.User_CreatedIssuesQuery, D.User_CreatedIssuesQueryVariables>(
        D.User_CreatedIssuesDocument,
        { id, ...vars }
      );
      return {
        ...response?.user?.createdIssues,
        nodes: response?.user?.createdIssues.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the teamMemberships
     *
     * @param vars - variables without 'id' to pass into the User_TeamMembershipsQuery
     * @returns The result of the User_TeamMembershipsQuery
     */
    async teamMemberships(
      vars?: Omit<D.User_TeamMembershipsQueryVariables, "id">
    ): Promise<User_TeamMembershipsQueryResponse> {
      const response = await requester<D.User_TeamMembershipsQuery, D.User_TeamMembershipsQueryVariables>(
        D.User_TeamMembershipsDocument,
        { id, ...vars }
      );
      return {
        ...response?.user?.teamMemberships,
        nodes: response?.user?.teamMemberships.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkUser
 * Initialize a set of operations, scoped to user, to run against the Linear api
 */
export type LinearSdkUser = ReturnType<typeof createLinearSdkUser>;

/**
 * Initialize a set of operations, scoped to viewer, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single viewer
 */
export function createLinearSdkViewer(requester: LinearRequester) {
  return {
    /**
     * Call the Linear api with the assignedIssues
     *
     * @param vars - variables to pass into the Viewer_AssignedIssuesQuery
     * @returns The result of the Viewer_AssignedIssuesQuery
     */
    async assignedIssues(vars?: D.Viewer_AssignedIssuesQueryVariables): Promise<Viewer_AssignedIssuesQueryResponse> {
      const response = await requester<D.Viewer_AssignedIssuesQuery, D.Viewer_AssignedIssuesQueryVariables>(
        D.Viewer_AssignedIssuesDocument,
        vars
      );
      return {
        ...response?.viewer?.assignedIssues,
        nodes: response?.viewer?.assignedIssues.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the createdIssues
     *
     * @param vars - variables to pass into the Viewer_CreatedIssuesQuery
     * @returns The result of the Viewer_CreatedIssuesQuery
     */
    async createdIssues(vars?: D.Viewer_CreatedIssuesQueryVariables): Promise<Viewer_CreatedIssuesQueryResponse> {
      const response = await requester<D.Viewer_CreatedIssuesQuery, D.Viewer_CreatedIssuesQueryVariables>(
        D.Viewer_CreatedIssuesDocument,
        vars
      );
      return {
        ...response?.viewer?.createdIssues,
        nodes: response?.viewer?.createdIssues.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the teamMemberships
     *
     * @param vars - variables to pass into the Viewer_TeamMembershipsQuery
     * @returns The result of the Viewer_TeamMembershipsQuery
     */
    async teamMemberships(vars?: D.Viewer_TeamMembershipsQueryVariables): Promise<Viewer_TeamMembershipsQueryResponse> {
      const response = await requester<D.Viewer_TeamMembershipsQuery, D.Viewer_TeamMembershipsQueryVariables>(
        D.Viewer_TeamMembershipsDocument,
        vars
      );
      return {
        ...response?.viewer?.teamMemberships,
        nodes: response?.viewer?.teamMemberships.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkViewer
 * Initialize a set of operations, scoped to viewer, to run against the Linear api
 */
export type LinearSdkViewer = ReturnType<typeof createLinearSdkViewer>;

/**
 * Initialize a set of operations, scoped to organization, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single organization
 */
export function createLinearSdkOrganization(requester: LinearRequester) {
  return {
    /**
     * Call the Linear api with the users
     *
     * @param vars - variables to pass into the Organization_UsersQuery
     * @returns The result of the Organization_UsersQuery
     */
    async users(vars?: D.Organization_UsersQueryVariables): Promise<Organization_UsersQueryResponse> {
      const response = await requester<D.Organization_UsersQuery, D.Organization_UsersQueryVariables>(
        D.Organization_UsersDocument,
        vars
      );
      return {
        ...response?.organization?.users,
        nodes: response?.organization?.users.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the teams
     *
     * @param vars - variables to pass into the Organization_TeamsQuery
     * @returns The result of the Organization_TeamsQuery
     */
    async teams(vars?: D.Organization_TeamsQueryVariables): Promise<Organization_TeamsQueryResponse> {
      const response = await requester<D.Organization_TeamsQuery, D.Organization_TeamsQueryVariables>(
        D.Organization_TeamsDocument,
        vars
      );
      return {
        ...response?.organization?.teams,
        nodes: response?.organization?.teams.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the milestones
     *
     * @param vars - variables to pass into the Organization_MilestonesQuery
     * @returns The result of the Organization_MilestonesQuery
     */
    async milestones(vars?: D.Organization_MilestonesQueryVariables): Promise<Organization_MilestonesQueryResponse> {
      const response = await requester<D.Organization_MilestonesQuery, D.Organization_MilestonesQueryVariables>(
        D.Organization_MilestonesDocument,
        vars
      );
      return {
        ...response?.organization?.milestones,
        nodes: response?.organization?.milestones.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the integrations
     *
     * @param vars - variables to pass into the Organization_IntegrationsQuery
     * @returns The result of the Organization_IntegrationsQuery
     */
    async integrations(
      vars?: D.Organization_IntegrationsQueryVariables
    ): Promise<Organization_IntegrationsQueryResponse> {
      const response = await requester<D.Organization_IntegrationsQuery, D.Organization_IntegrationsQueryVariables>(
        D.Organization_IntegrationsDocument,
        vars
      );
      return {
        ...response?.organization?.integrations,
        nodes: response?.organization?.integrations.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkOrganization
 * Initialize a set of operations, scoped to organization, to run against the Linear api
 */
export type LinearSdkOrganization = ReturnType<typeof createLinearSdkOrganization>;

/**
 * Initialize a set of operations, scoped to billingDetails, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single billingDetails
 */
export function createLinearSdkBillingDetails(requester: LinearRequester) {
  return {
    /**
     * Call the Linear api with the invoices
     *
     * @returns The result of the BillingDetails_InvoicesQuery
     */
    async invoices(): Promise<BillingDetails_InvoicesQueryResponse> {
      const response = await requester<D.BillingDetails_InvoicesQuery, D.BillingDetails_InvoicesQueryVariables>(
        D.BillingDetails_InvoicesDocument,
        {}
      );
      return response?.billingDetails?.invoices;
    },
    /**
     * Call the Linear api with the paymentMethod
     *
     * @returns The result of the BillingDetails_PaymentMethodQuery
     */
    async paymentMethod(): Promise<BillingDetails_PaymentMethodQueryResponse> {
      const response = await requester<
        D.BillingDetails_PaymentMethodQuery,
        D.BillingDetails_PaymentMethodQueryVariables
      >(D.BillingDetails_PaymentMethodDocument, {});
      return response?.billingDetails?.paymentMethod;
    },
  };
}

/**
 * The returned type from calling createLinearSdkBillingDetails
 * Initialize a set of operations, scoped to billingDetails, to run against the Linear api
 */
export type LinearSdkBillingDetails = ReturnType<typeof createLinearSdkBillingDetails>;

/**
 * Initialize a set of operations, scoped to collaborativeDocumentJoin, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param clientId - clientId to scope the returned operations by
 * @param issueId - issueId to scope the returned operations by
 * @param version - version to scope the returned operations by
 * @returns The set of available operations scoped to a single collaborativeDocumentJoin
 */
export function createLinearSdkCollaborativeDocumentJoin(
  requester: LinearRequester,
  clientId: string,
  issueId: string,
  version: number
) {
  return {
    /**
     * Call the Linear api with the steps
     *
     * @returns The result of the CollaborativeDocumentJoin_StepsQuery
     */
    async steps(): Promise<CollaborativeDocumentJoin_StepsQueryResponse> {
      const response = await requester<
        D.CollaborativeDocumentJoin_StepsQuery,
        D.CollaborativeDocumentJoin_StepsQueryVariables
      >(D.CollaborativeDocumentJoin_StepsDocument, { clientId, issueId, version });
      return response?.collaborativeDocumentJoin?.steps;
    },
  };
}

/**
 * The returned type from calling createLinearSdkCollaborativeDocumentJoin
 * Initialize a set of operations, scoped to collaborativeDocumentJoin, to run against the Linear api
 */
export type LinearSdkCollaborativeDocumentJoin = ReturnType<typeof createLinearSdkCollaborativeDocumentJoin>;

/**
 * Initialize a set of operations, scoped to cycle, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single cycle
 */
export function createLinearSdkCycle(requester: LinearRequester, id: string) {
  return {
    /**
     * Call the Linear api with the issues
     *
     * @param vars - variables without 'id' to pass into the Cycle_IssuesQuery
     * @returns The result of the Cycle_IssuesQuery
     */
    async issues(vars?: Omit<D.Cycle_IssuesQueryVariables, "id">): Promise<Cycle_IssuesQueryResponse> {
      const response = await requester<D.Cycle_IssuesQuery, D.Cycle_IssuesQueryVariables>(D.Cycle_IssuesDocument, {
        id,
        ...vars,
      });
      return {
        ...response?.cycle?.issues,
        nodes: response?.cycle?.issues.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the uncompletedIssuesUponClose
     *
     * @param vars - variables without 'id' to pass into the Cycle_UncompletedIssuesUponCloseQuery
     * @returns The result of the Cycle_UncompletedIssuesUponCloseQuery
     */
    async uncompletedIssuesUponClose(
      vars?: Omit<D.Cycle_UncompletedIssuesUponCloseQueryVariables, "id">
    ): Promise<Cycle_UncompletedIssuesUponCloseQueryResponse> {
      const response = await requester<
        D.Cycle_UncompletedIssuesUponCloseQuery,
        D.Cycle_UncompletedIssuesUponCloseQueryVariables
      >(D.Cycle_UncompletedIssuesUponCloseDocument, { id, ...vars });
      return {
        ...response?.cycle?.uncompletedIssuesUponClose,
        nodes: response?.cycle?.uncompletedIssuesUponClose.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkCycle
 * Initialize a set of operations, scoped to cycle, to run against the Linear api
 */
export type LinearSdkCycle = ReturnType<typeof createLinearSdkCycle>;

/**
 * Initialize a set of operations, scoped to figmaEmbedInfo, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param fileId - fileId to scope the returned operations by
 * @returns The set of available operations scoped to a single figmaEmbedInfo
 */
export function createLinearSdkFigmaEmbedInfo(requester: LinearRequester, fileId: string) {
  return {
    /**
     * Call the Linear api with the figmaEmbed
     *
     * @param vars - variables without 'fileId' to pass into the FigmaEmbedInfo_FigmaEmbedQuery
     * @returns The result of the FigmaEmbedInfo_FigmaEmbedQuery
     */
    async figmaEmbed(
      vars?: Omit<D.FigmaEmbedInfo_FigmaEmbedQueryVariables, "fileId">
    ): Promise<FigmaEmbedInfo_FigmaEmbedQueryResponse> {
      const response = await requester<D.FigmaEmbedInfo_FigmaEmbedQuery, D.FigmaEmbedInfo_FigmaEmbedQueryVariables>(
        D.FigmaEmbedInfo_FigmaEmbedDocument,
        { fileId, ...vars }
      );
      return response?.figmaEmbedInfo?.figmaEmbed;
    },
  };
}

/**
 * The returned type from calling createLinearSdkFigmaEmbedInfo
 * Initialize a set of operations, scoped to figmaEmbedInfo, to run against the Linear api
 */
export type LinearSdkFigmaEmbedInfo = ReturnType<typeof createLinearSdkFigmaEmbedInfo>;

/**
 * Initialize a set of operations, scoped to inviteInfo, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param userHash - userHash to scope the returned operations by
 * @returns The set of available operations scoped to a single inviteInfo
 */
export function createLinearSdkInviteInfo(requester: LinearRequester, userHash: string) {
  return {
    /**
     * Call the Linear api with the inviteData
     *
     * @param vars - variables without 'userHash' to pass into the InviteInfo_InviteDataQuery
     * @returns The result of the InviteInfo_InviteDataQuery
     */
    async inviteData(
      vars?: Omit<D.InviteInfo_InviteDataQueryVariables, "userHash">
    ): Promise<InviteInfo_InviteDataQueryResponse> {
      const response = await requester<D.InviteInfo_InviteDataQuery, D.InviteInfo_InviteDataQueryVariables>(
        D.InviteInfo_InviteDataDocument,
        { userHash, ...vars }
      );
      return response?.inviteInfo?.inviteData;
    },
  };
}

/**
 * The returned type from calling createLinearSdkInviteInfo
 * Initialize a set of operations, scoped to inviteInfo, to run against the Linear api
 */
export type LinearSdkInviteInfo = ReturnType<typeof createLinearSdkInviteInfo>;

/**
 * Initialize a set of operations, scoped to issueLabel, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single issueLabel
 */
export function createLinearSdkIssueLabel(requester: LinearRequester, id: string) {
  return {
    /**
     * Call the Linear api with the issues
     *
     * @param vars - variables without 'id' to pass into the IssueLabel_IssuesQuery
     * @returns The result of the IssueLabel_IssuesQuery
     */
    async issues(vars?: Omit<D.IssueLabel_IssuesQueryVariables, "id">): Promise<IssueLabel_IssuesQueryResponse> {
      const response = await requester<D.IssueLabel_IssuesQuery, D.IssueLabel_IssuesQueryVariables>(
        D.IssueLabel_IssuesDocument,
        { id, ...vars }
      );
      return {
        ...response?.issueLabel?.issues,
        nodes: response?.issueLabel?.issues.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkIssueLabel
 * Initialize a set of operations, scoped to issueLabel, to run against the Linear api
 */
export type LinearSdkIssueLabel = ReturnType<typeof createLinearSdkIssueLabel>;

/**
 * Initialize a set of operations, scoped to issue, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single issue
 */
export function createLinearSdkIssue(requester: LinearRequester, id: string) {
  return {
    /**
     * Call the Linear api with the subscribers
     *
     * @param vars - variables without 'id' to pass into the Issue_SubscribersQuery
     * @returns The result of the Issue_SubscribersQuery
     */
    async subscribers(vars?: Omit<D.Issue_SubscribersQueryVariables, "id">): Promise<Issue_SubscribersQueryResponse> {
      const response = await requester<D.Issue_SubscribersQuery, D.Issue_SubscribersQueryVariables>(
        D.Issue_SubscribersDocument,
        { id, ...vars }
      );
      return {
        ...response?.issue?.subscribers,
        nodes: response?.issue?.subscribers.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the children
     *
     * @param vars - variables without 'id' to pass into the Issue_ChildrenQuery
     * @returns The result of the Issue_ChildrenQuery
     */
    async children(vars?: Omit<D.Issue_ChildrenQueryVariables, "id">): Promise<Issue_ChildrenQueryResponse> {
      const response = await requester<D.Issue_ChildrenQuery, D.Issue_ChildrenQueryVariables>(
        D.Issue_ChildrenDocument,
        { id, ...vars }
      );
      return {
        ...response?.issue?.children,
        nodes: response?.issue?.children.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the comments
     *
     * @param vars - variables without 'id' to pass into the Issue_CommentsQuery
     * @returns The result of the Issue_CommentsQuery
     */
    async comments(vars?: Omit<D.Issue_CommentsQueryVariables, "id">): Promise<Issue_CommentsQueryResponse> {
      const response = await requester<D.Issue_CommentsQuery, D.Issue_CommentsQueryVariables>(
        D.Issue_CommentsDocument,
        { id, ...vars }
      );
      return {
        ...response?.issue?.comments,
        nodes: response?.issue?.comments.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the history
     *
     * @param vars - variables without 'id' to pass into the Issue_HistoryQuery
     * @returns The result of the Issue_HistoryQuery
     */
    async history(vars?: Omit<D.Issue_HistoryQueryVariables, "id">): Promise<Issue_HistoryQueryResponse> {
      const response = await requester<D.Issue_HistoryQuery, D.Issue_HistoryQueryVariables>(D.Issue_HistoryDocument, {
        id,
        ...vars,
      });
      return {
        ...response?.issue?.history,
        nodes: response?.issue?.history.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the labels
     *
     * @param vars - variables without 'id' to pass into the Issue_LabelsQuery
     * @returns The result of the Issue_LabelsQuery
     */
    async labels(vars?: Omit<D.Issue_LabelsQueryVariables, "id">): Promise<Issue_LabelsQueryResponse> {
      const response = await requester<D.Issue_LabelsQuery, D.Issue_LabelsQueryVariables>(D.Issue_LabelsDocument, {
        id,
        ...vars,
      });
      return {
        ...response?.issue?.labels,
        nodes: response?.issue?.labels.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the integrationResources
     *
     * @param vars - variables without 'id' to pass into the Issue_IntegrationResourcesQuery
     * @returns The result of the Issue_IntegrationResourcesQuery
     */
    async integrationResources(
      vars?: Omit<D.Issue_IntegrationResourcesQueryVariables, "id">
    ): Promise<Issue_IntegrationResourcesQueryResponse> {
      const response = await requester<D.Issue_IntegrationResourcesQuery, D.Issue_IntegrationResourcesQueryVariables>(
        D.Issue_IntegrationResourcesDocument,
        { id, ...vars }
      );
      return {
        ...response?.issue?.integrationResources,
        nodes: response?.issue?.integrationResources.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the relations
     *
     * @param vars - variables without 'id' to pass into the Issue_RelationsQuery
     * @returns The result of the Issue_RelationsQuery
     */
    async relations(vars?: Omit<D.Issue_RelationsQueryVariables, "id">): Promise<Issue_RelationsQueryResponse> {
      const response = await requester<D.Issue_RelationsQuery, D.Issue_RelationsQueryVariables>(
        D.Issue_RelationsDocument,
        { id, ...vars }
      );
      return {
        ...response?.issue?.relations,
        nodes: response?.issue?.relations.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the inverseRelations
     *
     * @param vars - variables without 'id' to pass into the Issue_InverseRelationsQuery
     * @returns The result of the Issue_InverseRelationsQuery
     */
    async inverseRelations(
      vars?: Omit<D.Issue_InverseRelationsQueryVariables, "id">
    ): Promise<Issue_InverseRelationsQueryResponse> {
      const response = await requester<D.Issue_InverseRelationsQuery, D.Issue_InverseRelationsQueryVariables>(
        D.Issue_InverseRelationsDocument,
        { id, ...vars }
      );
      return {
        ...response?.issue?.inverseRelations,
        nodes: response?.issue?.inverseRelations.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkIssue
 * Initialize a set of operations, scoped to issue, to run against the Linear api
 */
export type LinearSdkIssue = ReturnType<typeof createLinearSdkIssue>;

/**
 * Initialize a set of operations, scoped to milestone, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single milestone
 */
export function createLinearSdkMilestone(requester: LinearRequester, id: string) {
  return {
    /**
     * Call the Linear api with the projects
     *
     * @param vars - variables without 'id' to pass into the Milestone_ProjectsQuery
     * @returns The result of the Milestone_ProjectsQuery
     */
    async projects(vars?: Omit<D.Milestone_ProjectsQueryVariables, "id">): Promise<Milestone_ProjectsQueryResponse> {
      const response = await requester<D.Milestone_ProjectsQuery, D.Milestone_ProjectsQueryVariables>(
        D.Milestone_ProjectsDocument,
        { id, ...vars }
      );
      return {
        ...response?.milestone?.projects,
        nodes: response?.milestone?.projects.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkMilestone
 * Initialize a set of operations, scoped to milestone, to run against the Linear api
 */
export type LinearSdkMilestone = ReturnType<typeof createLinearSdkMilestone>;

/**
 * Initialize a set of operations, scoped to organizationInvite, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single organizationInvite
 */
export function createLinearSdkOrganizationInvite(requester: LinearRequester, id: string) {
  return {
    /**
     * Call the Linear api with the issues
     *
     * @param vars - variables without 'id' to pass into the OrganizationInvite_IssuesQuery
     * @returns The result of the OrganizationInvite_IssuesQuery
     */
    async issues(
      vars?: Omit<D.OrganizationInvite_IssuesQueryVariables, "id">
    ): Promise<OrganizationInvite_IssuesQueryResponse> {
      const response = await requester<D.OrganizationInvite_IssuesQuery, D.OrganizationInvite_IssuesQueryVariables>(
        D.OrganizationInvite_IssuesDocument,
        { id, ...vars }
      );
      return {
        ...response?.organizationInvite?.issues,
        nodes: response?.organizationInvite?.issues.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkOrganizationInvite
 * Initialize a set of operations, scoped to organizationInvite, to run against the Linear api
 */
export type LinearSdkOrganizationInvite = ReturnType<typeof createLinearSdkOrganizationInvite>;

/**
 * Initialize a set of operations, scoped to project, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single project
 */
export function createLinearSdkProject(requester: LinearRequester, id: string) {
  return {
    /**
     * Call the Linear api with the teams
     *
     * @param vars - variables without 'id' to pass into the Project_TeamsQuery
     * @returns The result of the Project_TeamsQuery
     */
    async teams(vars?: Omit<D.Project_TeamsQueryVariables, "id">): Promise<Project_TeamsQueryResponse> {
      const response = await requester<D.Project_TeamsQuery, D.Project_TeamsQueryVariables>(D.Project_TeamsDocument, {
        id,
        ...vars,
      });
      return {
        ...response?.project?.teams,
        nodes: response?.project?.teams.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the members
     *
     * @param vars - variables without 'id' to pass into the Project_MembersQuery
     * @returns The result of the Project_MembersQuery
     */
    async members(vars?: Omit<D.Project_MembersQueryVariables, "id">): Promise<Project_MembersQueryResponse> {
      const response = await requester<D.Project_MembersQuery, D.Project_MembersQueryVariables>(
        D.Project_MembersDocument,
        { id, ...vars }
      );
      return {
        ...response?.project?.members,
        nodes: response?.project?.members.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the issues
     *
     * @param vars - variables without 'id' to pass into the Project_IssuesQuery
     * @returns The result of the Project_IssuesQuery
     */
    async issues(vars?: Omit<D.Project_IssuesQueryVariables, "id">): Promise<Project_IssuesQueryResponse> {
      const response = await requester<D.Project_IssuesQuery, D.Project_IssuesQueryVariables>(
        D.Project_IssuesDocument,
        { id, ...vars }
      );
      return {
        ...response?.project?.issues,
        nodes: response?.project?.issues.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the links
     *
     * @param vars - variables without 'id' to pass into the Project_LinksQuery
     * @returns The result of the Project_LinksQuery
     */
    async links(vars?: Omit<D.Project_LinksQueryVariables, "id">): Promise<Project_LinksQueryResponse> {
      const response = await requester<D.Project_LinksQuery, D.Project_LinksQueryVariables>(D.Project_LinksDocument, {
        id,
        ...vars,
      });
      return {
        ...response?.project?.links,
        nodes: response?.project?.links.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkProject
 * Initialize a set of operations, scoped to project, to run against the Linear api
 */
export type LinearSdkProject = ReturnType<typeof createLinearSdkProject>;

/**
 * Initialize a set of operations, scoped to team, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single team
 */
export function createLinearSdkTeam(requester: LinearRequester, id: string) {
  return {
    /**
     * Call the Linear api with the issues
     *
     * @param vars - variables without 'id' to pass into the Team_IssuesQuery
     * @returns The result of the Team_IssuesQuery
     */
    async issues(vars?: Omit<D.Team_IssuesQueryVariables, "id">): Promise<Team_IssuesQueryResponse> {
      const response = await requester<D.Team_IssuesQuery, D.Team_IssuesQueryVariables>(D.Team_IssuesDocument, {
        id,
        ...vars,
      });
      return {
        ...response?.team?.issues,
        nodes: response?.team?.issues.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the cycles
     *
     * @param vars - variables without 'id' to pass into the Team_CyclesQuery
     * @returns The result of the Team_CyclesQuery
     */
    async cycles(vars?: Omit<D.Team_CyclesQueryVariables, "id">): Promise<Team_CyclesQueryResponse> {
      const response = await requester<D.Team_CyclesQuery, D.Team_CyclesQueryVariables>(D.Team_CyclesDocument, {
        id,
        ...vars,
      });
      return {
        ...response?.team?.cycles,
        nodes: response?.team?.cycles.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the memberships
     *
     * @param vars - variables without 'id' to pass into the Team_MembershipsQuery
     * @returns The result of the Team_MembershipsQuery
     */
    async memberships(vars?: Omit<D.Team_MembershipsQueryVariables, "id">): Promise<Team_MembershipsQueryResponse> {
      const response = await requester<D.Team_MembershipsQuery, D.Team_MembershipsQueryVariables>(
        D.Team_MembershipsDocument,
        { id, ...vars }
      );
      return {
        ...response?.team?.memberships,
        nodes: response?.team?.memberships.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the projects
     *
     * @param vars - variables without 'id' to pass into the Team_ProjectsQuery
     * @returns The result of the Team_ProjectsQuery
     */
    async projects(vars?: Omit<D.Team_ProjectsQueryVariables, "id">): Promise<Team_ProjectsQueryResponse> {
      const response = await requester<D.Team_ProjectsQuery, D.Team_ProjectsQueryVariables>(D.Team_ProjectsDocument, {
        id,
        ...vars,
      });
      return {
        ...response?.team?.projects,
        nodes: response?.team?.projects.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the states
     *
     * @param vars - variables without 'id' to pass into the Team_StatesQuery
     * @returns The result of the Team_StatesQuery
     */
    async states(vars?: Omit<D.Team_StatesQueryVariables, "id">): Promise<Team_StatesQueryResponse> {
      const response = await requester<D.Team_StatesQuery, D.Team_StatesQueryVariables>(D.Team_StatesDocument, {
        id,
        ...vars,
      });
      return {
        ...response?.team?.states,
        nodes: response?.team?.states.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the templates
     *
     * @param vars - variables without 'id' to pass into the Team_TemplatesQuery
     * @returns The result of the Team_TemplatesQuery
     */
    async templates(vars?: Omit<D.Team_TemplatesQueryVariables, "id">): Promise<Team_TemplatesQueryResponse> {
      const response = await requester<D.Team_TemplatesQuery, D.Team_TemplatesQueryVariables>(
        D.Team_TemplatesDocument,
        { id, ...vars }
      );
      return {
        ...response?.team?.templates,
        nodes: response?.team?.templates.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the labels
     *
     * @param vars - variables without 'id' to pass into the Team_LabelsQuery
     * @returns The result of the Team_LabelsQuery
     */
    async labels(vars?: Omit<D.Team_LabelsQueryVariables, "id">): Promise<Team_LabelsQueryResponse> {
      const response = await requester<D.Team_LabelsQuery, D.Team_LabelsQueryVariables>(D.Team_LabelsDocument, {
        id,
        ...vars,
      });
      return {
        ...response?.team?.labels,
        nodes: response?.team?.labels.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
    /**
     * Call the Linear api with the webhooks
     *
     * @param vars - variables without 'id' to pass into the Team_WebhooksQuery
     * @returns The result of the Team_WebhooksQuery
     */
    async webhooks(vars?: Omit<D.Team_WebhooksQueryVariables, "id">): Promise<Team_WebhooksQueryResponse> {
      const response = await requester<D.Team_WebhooksQuery, D.Team_WebhooksQueryVariables>(D.Team_WebhooksDocument, {
        id,
        ...vars,
      });
      return {
        ...response?.team?.webhooks,
        nodes: response?.team?.webhooks.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkTeam
 * Initialize a set of operations, scoped to team, to run against the Linear api
 */
export type LinearSdkTeam = ReturnType<typeof createLinearSdkTeam>;

/**
 * Initialize a set of operations, scoped to workflowState, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single workflowState
 */
export function createLinearSdkWorkflowState(requester: LinearRequester, id: string) {
  return {
    /**
     * Call the Linear api with the issues
     *
     * @param vars - variables without 'id' to pass into the WorkflowState_IssuesQuery
     * @returns The result of the WorkflowState_IssuesQuery
     */
    async issues(vars?: Omit<D.WorkflowState_IssuesQueryVariables, "id">): Promise<WorkflowState_IssuesQueryResponse> {
      const response = await requester<D.WorkflowState_IssuesQuery, D.WorkflowState_IssuesQueryVariables>(
        D.WorkflowState_IssuesDocument,
        { id, ...vars }
      );
      return {
        ...response?.workflowState?.issues,
        nodes: response?.workflowState?.issues.nodes.map(x => ({
          ...x,
          ...x,
        })),
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkWorkflowState
 * Initialize a set of operations, scoped to workflowState, to run against the Linear api
 */
export type LinearSdkWorkflowState = ReturnType<typeof createLinearSdkWorkflowState>;
