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
 * Initialize a set of operations, scoped to , to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single
 */
export function createLinearSdk<O>(requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the user
     *
     * @param id - id to pass into the UserQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserQuery
     */
    async user(id: string, opts?: O): Promise<ResultOf<typeof D.UserDocument>["user"] & LinearSdkUser> {
      const response = await requester<D.UserQuery, D.UserQueryVariables>(D.UserDocument, { id }, opts);
      return {
        ...response?.user,
        ...createLinearSdkUser(requester, id),
      };
    },
    /**
     * Call the Linear api with the viewer
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the ViewerQuery
     */
    async viewer(opts?: O): Promise<ResultOf<typeof D.ViewerDocument>["viewer"] & LinearSdkViewer> {
      const response = await requester<D.ViewerQuery, D.ViewerQueryVariables>(D.ViewerDocument, {}, opts);
      return {
        ...response?.viewer,
        ...createLinearSdkViewer(requester),
      };
    },
    /**
     * Call the Linear api with the organization
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationQuery
     */
    async organization(
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationDocument>["organization"] & LinearSdkOrganization> {
      const response = await requester<D.OrganizationQuery, D.OrganizationQueryVariables>(
        D.OrganizationDocument,
        {},
        opts
      );
      return {
        ...response?.organization,
        ...createLinearSdkOrganization(requester),
      };
    },
    /**
     * Call the Linear api with the organizationExists
     *
     * @param urlKey - urlKey to pass into the OrganizationExistsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationExistsQuery
     */
    async organizationExists(
      urlKey: string,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationExistsDocument>["organizationExists"]> {
      const response = await requester<D.OrganizationExistsQuery, D.OrganizationExistsQueryVariables>(
        D.OrganizationExistsDocument,
        { urlKey },
        opts
      );
      return {
        ...response?.organizationExists,
      };
    },
    /**
     * Call the Linear api with the syncBootstrap
     *
     * @param databaseVersion - databaseVersion to pass into the SyncBootstrapQuery
     * @param sinceSyncId - sinceSyncId to pass into the SyncBootstrapQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the SyncBootstrapQuery
     */
    async syncBootstrap(
      databaseVersion: number,
      sinceSyncId: number,
      opts?: O
    ): Promise<ResultOf<typeof D.SyncBootstrapDocument>["syncBootstrap"]> {
      const response = await requester<D.SyncBootstrapQuery, D.SyncBootstrapQueryVariables>(
        D.SyncBootstrapDocument,
        { databaseVersion, sinceSyncId },
        opts
      );
      return {
        ...response?.syncBootstrap,
      };
    },
    /**
     * Call the Linear api with the syncUpdates
     *
     * @param sinceSyncId - sinceSyncId to pass into the SyncUpdatesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the SyncUpdatesQuery
     */
    async syncUpdates(sinceSyncId: number, opts?: O): Promise<ResultOf<typeof D.SyncUpdatesDocument>["syncUpdates"]> {
      const response = await requester<D.SyncUpdatesQuery, D.SyncUpdatesQueryVariables>(
        D.SyncUpdatesDocument,
        { sinceSyncId },
        opts
      );
      return {
        ...response?.syncUpdates,
      };
    },
    /**
     * Call the Linear api with the archivedModelSync
     *
     * @param identifier - identifier to pass into the ArchivedModelSyncQuery
     * @param modelClass - modelClass to pass into the ArchivedModelSyncQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ArchivedModelSyncQuery
     */
    async archivedModelSync(
      identifier: string,
      modelClass: string,
      opts?: O
    ): Promise<ResultOf<typeof D.ArchivedModelSyncDocument>["archivedModelSync"]> {
      const response = await requester<D.ArchivedModelSyncQuery, D.ArchivedModelSyncQueryVariables>(
        D.ArchivedModelSyncDocument,
        { identifier, modelClass },
        opts
      );
      return {
        ...response?.archivedModelSync,
      };
    },
    /**
     * Call the Linear api with the archivedModelsSync
     *
     * @param modelClass - modelClass to pass into the ArchivedModelsSyncQuery
     * @param teamId - teamId to pass into the ArchivedModelsSyncQuery
     * @param vars - variables without 'modelClass', 'teamId' to pass into the ArchivedModelsSyncQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ArchivedModelsSyncQuery
     */
    async archivedModelsSync(
      modelClass: string,
      teamId: string,
      vars?: Omit<D.ArchivedModelsSyncQueryVariables, "modelClass" | "teamId">,
      opts?: O
    ): Promise<ResultOf<typeof D.ArchivedModelsSyncDocument>["archivedModelsSync"]> {
      const response = await requester<D.ArchivedModelsSyncQuery, D.ArchivedModelsSyncQueryVariables>(
        D.ArchivedModelsSyncDocument,
        { modelClass, teamId, ...vars },
        opts
      );
      return {
        ...response?.archivedModelsSync,
      };
    },
    /**
     * Call the Linear api with the users
     *
     * @param vars - variables to pass into the UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the UsersQuery
     */
    async users(vars?: D.UsersQueryVariables, opts?: O): Promise<ResultOf<typeof D.UsersDocument>["users"]> {
      const response = await requester<D.UsersQuery, D.UsersQueryVariables>(D.UsersDocument, vars, opts);
      return {
        ...response?.users,
      };
    },
    /**
     * Call the Linear api with the apiKeys
     *
     * @param vars - variables to pass into the ApiKeysQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ApiKeysQuery
     */
    async apiKeys(vars?: D.ApiKeysQueryVariables, opts?: O): Promise<ResultOf<typeof D.ApiKeysDocument>["apiKeys"]> {
      const response = await requester<D.ApiKeysQuery, D.ApiKeysQueryVariables>(D.ApiKeysDocument, vars, opts);
      return {
        ...response?.apiKeys,
      };
    },
    /**
     * Call the Linear api with the application
     *
     * @param clientId - clientId to pass into the ApplicationQuery
     * @param vars - variables without 'clientId' to pass into the ApplicationQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ApplicationQuery
     */
    async application(
      clientId: string,
      vars?: Omit<D.ApplicationQueryVariables, "clientId">,
      opts?: O
    ): Promise<ResultOf<typeof D.ApplicationDocument>["application"]> {
      const response = await requester<D.ApplicationQuery, D.ApplicationQueryVariables>(
        D.ApplicationDocument,
        { clientId, ...vars },
        opts
      );
      return {
        ...response?.application,
      };
    },
    /**
     * Call the Linear api with the authorizedApplications
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the AuthorizedApplicationsQuery
     */
    async authorizedApplications(
      opts?: O
    ): Promise<ResultOf<typeof D.AuthorizedApplicationsDocument>["authorizedApplications"]> {
      const response = await requester<D.AuthorizedApplicationsQuery, D.AuthorizedApplicationsQueryVariables>(
        D.AuthorizedApplicationsDocument,
        {},
        opts
      );
      return {
        ...response?.authorizedApplications,
      };
    },
    /**
     * Call the Linear api with the availableUsers
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the AvailableUsersQuery
     */
    async availableUsers(opts?: O): Promise<ResultOf<typeof D.AvailableUsersDocument>["availableUsers"]> {
      const response = await requester<D.AvailableUsersQuery, D.AvailableUsersQueryVariables>(
        D.AvailableUsersDocument,
        {},
        opts
      );
      return {
        ...response?.availableUsers,
      };
    },
    /**
     * Call the Linear api with the ssoUrlFromEmail
     *
     * @param email - email to pass into the SsoUrlFromEmailQuery
     * @param vars - variables without 'email' to pass into the SsoUrlFromEmailQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the SsoUrlFromEmailQuery
     */
    async ssoUrlFromEmail(
      email: string,
      vars?: Omit<D.SsoUrlFromEmailQueryVariables, "email">,
      opts?: O
    ): Promise<ResultOf<typeof D.SsoUrlFromEmailDocument>["ssoUrlFromEmail"]> {
      const response = await requester<D.SsoUrlFromEmailQuery, D.SsoUrlFromEmailQueryVariables>(
        D.SsoUrlFromEmailDocument,
        { email, ...vars },
        opts
      );
      return {
        ...response?.ssoUrlFromEmail,
      };
    },
    /**
     * Call the Linear api with the billingDetails
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the BillingDetailsQuery
     */
    async billingDetails(
      opts?: O
    ): Promise<ResultOf<typeof D.BillingDetailsDocument>["billingDetails"] & LinearSdkBillingDetails> {
      const response = await requester<D.BillingDetailsQuery, D.BillingDetailsQueryVariables>(
        D.BillingDetailsDocument,
        {},
        opts
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
     * @param opts - options to pass to the graphql client
     * @returns The result of the CollaborativeDocumentJoinQuery
     */
    async collaborativeDocumentJoin(
      clientId: string,
      issueId: string,
      version: number,
      opts?: O
    ): Promise<
      ResultOf<typeof D.CollaborativeDocumentJoinDocument>["collaborativeDocumentJoin"] &
        LinearSdkCollaborativeDocumentJoin
    > {
      const response = await requester<D.CollaborativeDocumentJoinQuery, D.CollaborativeDocumentJoinQueryVariables>(
        D.CollaborativeDocumentJoinDocument,
        { clientId, issueId, version },
        opts
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
     * @param opts - options to pass to the graphql client
     * @returns The result of the CommentQuery
     */
    async comment(id: string, opts?: O): Promise<ResultOf<typeof D.CommentDocument>["comment"]> {
      const response = await requester<D.CommentQuery, D.CommentQueryVariables>(D.CommentDocument, { id }, opts);
      return {
        ...response?.comment,
      };
    },
    /**
     * Call the Linear api with the comments
     *
     * @param vars - variables to pass into the CommentsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the CommentsQuery
     */
    async comments(
      vars?: D.CommentsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.CommentsDocument>["comments"]> {
      const response = await requester<D.CommentsQuery, D.CommentsQueryVariables>(D.CommentsDocument, vars, opts);
      return {
        ...response?.comments,
      };
    },
    /**
     * Call the Linear api with the customView
     *
     * @param id - id to pass into the CustomViewQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomViewQuery
     */
    async customView(id: string, opts?: O): Promise<ResultOf<typeof D.CustomViewDocument>["customView"]> {
      const response = await requester<D.CustomViewQuery, D.CustomViewQueryVariables>(
        D.CustomViewDocument,
        { id },
        opts
      );
      return {
        ...response?.customView,
      };
    },
    /**
     * Call the Linear api with the customViews
     *
     * @param vars - variables to pass into the CustomViewsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomViewsQuery
     */
    async customViews(
      vars?: D.CustomViewsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.CustomViewsDocument>["customViews"]> {
      const response = await requester<D.CustomViewsQuery, D.CustomViewsQueryVariables>(
        D.CustomViewsDocument,
        vars,
        opts
      );
      return {
        ...response?.customViews,
      };
    },
    /**
     * Call the Linear api with the cycle
     *
     * @param id - id to pass into the CycleQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the CycleQuery
     */
    async cycle(id: string, opts?: O): Promise<ResultOf<typeof D.CycleDocument>["cycle"] & LinearSdkCycle> {
      const response = await requester<D.CycleQuery, D.CycleQueryVariables>(D.CycleDocument, { id }, opts);
      return {
        ...response?.cycle,
        ...createLinearSdkCycle(requester, id),
      };
    },
    /**
     * Call the Linear api with the cycles
     *
     * @param vars - variables to pass into the CyclesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the CyclesQuery
     */
    async cycles(vars?: D.CyclesQueryVariables, opts?: O): Promise<ResultOf<typeof D.CyclesDocument>["cycles"]> {
      const response = await requester<D.CyclesQuery, D.CyclesQueryVariables>(D.CyclesDocument, vars, opts);
      return {
        ...response?.cycles,
      };
    },
    /**
     * Call the Linear api with the emoji
     *
     * @param id - id to pass into the EmojiQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the EmojiQuery
     */
    async emoji(id: string, opts?: O): Promise<ResultOf<typeof D.EmojiDocument>["emoji"]> {
      const response = await requester<D.EmojiQuery, D.EmojiQueryVariables>(D.EmojiDocument, { id }, opts);
      return {
        ...response?.emoji,
      };
    },
    /**
     * Call the Linear api with the emojis
     *
     * @param vars - variables to pass into the EmojisQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the EmojisQuery
     */
    async emojis(vars?: D.EmojisQueryVariables, opts?: O): Promise<ResultOf<typeof D.EmojisDocument>["emojis"]> {
      const response = await requester<D.EmojisQuery, D.EmojisQueryVariables>(D.EmojisDocument, vars, opts);
      return {
        ...response?.emojis,
      };
    },
    /**
     * Call the Linear api with the favorite
     *
     * @param id - id to pass into the FavoriteQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the FavoriteQuery
     */
    async favorite(id: string, opts?: O): Promise<ResultOf<typeof D.FavoriteDocument>["favorite"]> {
      const response = await requester<D.FavoriteQuery, D.FavoriteQueryVariables>(D.FavoriteDocument, { id }, opts);
      return {
        ...response?.favorite,
      };
    },
    /**
     * Call the Linear api with the favorites
     *
     * @param vars - variables to pass into the FavoritesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the FavoritesQuery
     */
    async favorites(
      vars?: D.FavoritesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.FavoritesDocument>["favorites"]> {
      const response = await requester<D.FavoritesQuery, D.FavoritesQueryVariables>(D.FavoritesDocument, vars, opts);
      return {
        ...response?.favorites,
      };
    },
    /**
     * Call the Linear api with the figmaEmbedInfo
     *
     * @param fileId - fileId to pass into the FigmaEmbedInfoQuery
     * @param vars - variables without 'fileId' to pass into the FigmaEmbedInfoQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the FigmaEmbedInfoQuery
     */
    async figmaEmbedInfo(
      fileId: string,
      vars?: Omit<D.FigmaEmbedInfoQueryVariables, "fileId">,
      opts?: O
    ): Promise<ResultOf<typeof D.FigmaEmbedInfoDocument>["figmaEmbedInfo"] & LinearSdkFigmaEmbedInfo> {
      const response = await requester<D.FigmaEmbedInfoQuery, D.FigmaEmbedInfoQueryVariables>(
        D.FigmaEmbedInfoDocument,
        { fileId, ...vars },
        opts
      );
      return {
        ...response?.figmaEmbedInfo,
        ...createLinearSdkFigmaEmbedInfo(requester, fileId),
      };
    },
    /**
     * Call the Linear api with the integration
     *
     * @param id - id to pass into the IntegrationQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationQuery
     */
    async integration(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationDocument>["integration"] & LinearSdkIntegration> {
      const response = await requester<D.IntegrationQuery, D.IntegrationQueryVariables>(
        D.IntegrationDocument,
        { id },
        opts
      );
      return {
        ...response?.integration,
        ...createLinearSdkIntegration(requester, id),
      };
    },
    /**
     * Call the Linear api with the integrations
     *
     * @param vars - variables to pass into the IntegrationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationsQuery
     */
    async integrations(
      vars?: D.IntegrationsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationsDocument>["integrations"]> {
      const response = await requester<D.IntegrationsQuery, D.IntegrationsQueryVariables>(
        D.IntegrationsDocument,
        vars,
        opts
      );
      return {
        ...response?.integrations,
      };
    },
    /**
     * Call the Linear api with the integrationResource
     *
     * @param id - id to pass into the IntegrationResourceQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResourceQuery
     */
    async integrationResource(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationResourceDocument>["integrationResource"] & LinearSdkIntegrationResource> {
      const response = await requester<D.IntegrationResourceQuery, D.IntegrationResourceQueryVariables>(
        D.IntegrationResourceDocument,
        { id },
        opts
      );
      return {
        ...response?.integrationResource,
        ...createLinearSdkIntegrationResource(requester, id),
      };
    },
    /**
     * Call the Linear api with the integrationResources
     *
     * @param vars - variables to pass into the IntegrationResourcesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResourcesQuery
     */
    async integrationResources(
      vars?: D.IntegrationResourcesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationResourcesDocument>["integrationResources"]> {
      const response = await requester<D.IntegrationResourcesQuery, D.IntegrationResourcesQueryVariables>(
        D.IntegrationResourcesDocument,
        vars,
        opts
      );
      return {
        ...response?.integrationResources,
      };
    },
    /**
     * Call the Linear api with the inviteInfo
     *
     * @param userHash - userHash to pass into the InviteInfoQuery
     * @param vars - variables without 'userHash' to pass into the InviteInfoQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the InviteInfoQuery
     */
    async inviteInfo(
      userHash: string,
      vars?: Omit<D.InviteInfoQueryVariables, "userHash">,
      opts?: O
    ): Promise<ResultOf<typeof D.InviteInfoDocument>["inviteInfo"] & LinearSdkInviteInfo> {
      const response = await requester<D.InviteInfoQuery, D.InviteInfoQueryVariables>(
        D.InviteInfoDocument,
        { userHash, ...vars },
        opts
      );
      return {
        ...response?.inviteInfo,
        ...createLinearSdkInviteInfo(requester, userHash),
      };
    },
    /**
     * Call the Linear api with the issueLabel
     *
     * @param id - id to pass into the IssueLabelQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueLabelQuery
     */
    async issueLabel(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueLabelDocument>["issueLabel"] & LinearSdkIssueLabel> {
      const response = await requester<D.IssueLabelQuery, D.IssueLabelQueryVariables>(
        D.IssueLabelDocument,
        { id },
        opts
      );
      return {
        ...response?.issueLabel,
        ...createLinearSdkIssueLabel(requester, id),
      };
    },
    /**
     * Call the Linear api with the issueLabels
     *
     * @param vars - variables to pass into the IssueLabelsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueLabelsQuery
     */
    async issueLabels(
      vars?: D.IssueLabelsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueLabelsDocument>["issueLabels"]> {
      const response = await requester<D.IssueLabelsQuery, D.IssueLabelsQueryVariables>(
        D.IssueLabelsDocument,
        vars,
        opts
      );
      return {
        ...response?.issueLabels,
      };
    },
    /**
     * Call the Linear api with the issueRelation
     *
     * @param id - id to pass into the IssueRelationQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueRelationQuery
     */
    async issueRelation(id: string, opts?: O): Promise<ResultOf<typeof D.IssueRelationDocument>["issueRelation"]> {
      const response = await requester<D.IssueRelationQuery, D.IssueRelationQueryVariables>(
        D.IssueRelationDocument,
        { id },
        opts
      );
      return {
        ...response?.issueRelation,
      };
    },
    /**
     * Call the Linear api with the issueRelations
     *
     * @param vars - variables to pass into the IssueRelationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueRelationsQuery
     */
    async issueRelations(
      vars?: D.IssueRelationsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueRelationsDocument>["issueRelations"]> {
      const response = await requester<D.IssueRelationsQuery, D.IssueRelationsQueryVariables>(
        D.IssueRelationsDocument,
        vars,
        opts
      );
      return {
        ...response?.issueRelations,
      };
    },
    /**
     * Call the Linear api with the issue
     *
     * @param id - id to pass into the IssueQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueQuery
     */
    async issue(id: string, opts?: O): Promise<ResultOf<typeof D.IssueDocument>["issue"] & LinearSdkIssue> {
      const response = await requester<D.IssueQuery, D.IssueQueryVariables>(D.IssueDocument, { id }, opts);
      return {
        ...response?.issue,
        ...createLinearSdkIssue(requester, id),
      };
    },
    /**
     * Call the Linear api with the issueSearch
     *
     * @param query - query to pass into the IssueSearchQuery
     * @param vars - variables without 'query' to pass into the IssueSearchQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueSearchQuery
     */
    async issueSearch(
      query: string,
      vars?: Omit<D.IssueSearchQueryVariables, "query">,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueSearchDocument>["issueSearch"]> {
      const response = await requester<D.IssueSearchQuery, D.IssueSearchQueryVariables>(
        D.IssueSearchDocument,
        { query, ...vars },
        opts
      );
      return {
        ...response?.issueSearch,
      };
    },
    /**
     * Call the Linear api with the issues
     *
     * @param vars - variables to pass into the IssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssuesQuery
     */
    async issues(vars?: D.IssuesQueryVariables, opts?: O): Promise<ResultOf<typeof D.IssuesDocument>["issues"]> {
      const response = await requester<D.IssuesQuery, D.IssuesQueryVariables>(D.IssuesDocument, vars, opts);
      return {
        ...response?.issues,
      };
    },
    /**
     * Call the Linear api with the milestone
     *
     * @param id - id to pass into the MilestoneQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the MilestoneQuery
     */
    async milestone(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.MilestoneDocument>["milestone"] & LinearSdkMilestone> {
      const response = await requester<D.MilestoneQuery, D.MilestoneQueryVariables>(D.MilestoneDocument, { id }, opts);
      return {
        ...response?.milestone,
        ...createLinearSdkMilestone(requester, id),
      };
    },
    /**
     * Call the Linear api with the milestones
     *
     * @param vars - variables to pass into the MilestonesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the MilestonesQuery
     */
    async milestones(
      vars?: D.MilestonesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.MilestonesDocument>["milestones"]> {
      const response = await requester<D.MilestonesQuery, D.MilestonesQueryVariables>(D.MilestonesDocument, vars, opts);
      return {
        ...response?.milestones,
      };
    },
    /**
     * Call the Linear api with the notification
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationQuery
     */
    async notification(opts?: O): Promise<ResultOf<typeof D.NotificationDocument>["notification"]> {
      const response = await requester<D.NotificationQuery, D.NotificationQueryVariables>(
        D.NotificationDocument,
        {},
        opts
      );
      return {
        ...response?.notification,
      };
    },
    /**
     * Call the Linear api with the notifications
     *
     * @param vars - variables to pass into the NotificationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationsQuery
     */
    async notifications(
      vars?: D.NotificationsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationsDocument>["notifications"]> {
      const response = await requester<D.NotificationsQuery, D.NotificationsQueryVariables>(
        D.NotificationsDocument,
        vars,
        opts
      );
      return {
        ...response?.notifications,
      };
    },
    /**
     * Call the Linear api with the notificationSubscription
     *
     * @param vars - variables to pass into the NotificationSubscriptionQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationSubscriptionQuery
     */
    async notificationSubscription(
      vars?: D.NotificationSubscriptionQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationSubscriptionDocument>["notificationSubscription"]> {
      const response = await requester<D.NotificationSubscriptionQuery, D.NotificationSubscriptionQueryVariables>(
        D.NotificationSubscriptionDocument,
        vars,
        opts
      );
      return {
        ...response?.notificationSubscription,
      };
    },
    /**
     * Call the Linear api with the organizationInvite
     *
     * @param id - id to pass into the OrganizationInviteQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationInviteQuery
     */
    async organizationInvite(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationInviteDocument>["organizationInvite"] & LinearSdkOrganizationInvite> {
      const response = await requester<D.OrganizationInviteQuery, D.OrganizationInviteQueryVariables>(
        D.OrganizationInviteDocument,
        { id },
        opts
      );
      return {
        ...response?.organizationInvite,
        ...createLinearSdkOrganizationInvite(requester, id),
      };
    },
    /**
     * Call the Linear api with the organizationInvites
     *
     * @param vars - variables to pass into the OrganizationInvitesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationInvitesQuery
     */
    async organizationInvites(
      vars?: D.OrganizationInvitesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationInvitesDocument>["organizationInvites"]> {
      const response = await requester<D.OrganizationInvitesQuery, D.OrganizationInvitesQueryVariables>(
        D.OrganizationInvitesDocument,
        vars,
        opts
      );
      return {
        ...response?.organizationInvites,
      };
    },
    /**
     * Call the Linear api with the projectLink
     *
     * @param id - id to pass into the ProjectLinkQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectLinkQuery
     */
    async projectLink(id: string, opts?: O): Promise<ResultOf<typeof D.ProjectLinkDocument>["projectLink"]> {
      const response = await requester<D.ProjectLinkQuery, D.ProjectLinkQueryVariables>(
        D.ProjectLinkDocument,
        { id },
        opts
      );
      return {
        ...response?.projectLink,
      };
    },
    /**
     * Call the Linear api with the ProjectLinks
     *
     * @param vars - variables to pass into the ProjectLinksQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectLinksQuery
     */
    async ProjectLinks(
      vars?: D.ProjectLinksQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.ProjectLinksDocument>["ProjectLinks"]> {
      const response = await requester<D.ProjectLinksQuery, D.ProjectLinksQueryVariables>(
        D.ProjectLinksDocument,
        vars,
        opts
      );
      return {
        ...response?.ProjectLinks,
      };
    },
    /**
     * Call the Linear api with the project
     *
     * @param id - id to pass into the ProjectQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectQuery
     */
    async project(id: string, opts?: O): Promise<ResultOf<typeof D.ProjectDocument>["project"] & LinearSdkProject> {
      const response = await requester<D.ProjectQuery, D.ProjectQueryVariables>(D.ProjectDocument, { id }, opts);
      return {
        ...response?.project,
        ...createLinearSdkProject(requester, id),
      };
    },
    /**
     * Call the Linear api with the projects
     *
     * @param vars - variables to pass into the ProjectsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectsQuery
     */
    async projects(
      vars?: D.ProjectsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.ProjectsDocument>["projects"]> {
      const response = await requester<D.ProjectsQuery, D.ProjectsQueryVariables>(D.ProjectsDocument, vars, opts);
      return {
        ...response?.projects,
      };
    },
    /**
     * Call the Linear api with the pushSubscriptionTest
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the PushSubscriptionTestQuery
     */
    async pushSubscriptionTest(
      opts?: O
    ): Promise<ResultOf<typeof D.PushSubscriptionTestDocument>["pushSubscriptionTest"]> {
      const response = await requester<D.PushSubscriptionTestQuery, D.PushSubscriptionTestQueryVariables>(
        D.PushSubscriptionTestDocument,
        {},
        opts
      );
      return {
        ...response?.pushSubscriptionTest,
      };
    },
    /**
     * Call the Linear api with the reaction
     *
     * @param id - id to pass into the ReactionQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ReactionQuery
     */
    async reaction(id: string, opts?: O): Promise<ResultOf<typeof D.ReactionDocument>["reaction"]> {
      const response = await requester<D.ReactionQuery, D.ReactionQueryVariables>(D.ReactionDocument, { id }, opts);
      return {
        ...response?.reaction,
      };
    },
    /**
     * Call the Linear api with the reactions
     *
     * @param vars - variables to pass into the ReactionsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ReactionsQuery
     */
    async reactions(
      vars?: D.ReactionsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.ReactionsDocument>["reactions"]> {
      const response = await requester<D.ReactionsQuery, D.ReactionsQueryVariables>(D.ReactionsDocument, vars, opts);
      return {
        ...response?.reactions,
      };
    },
    /**
     * Call the Linear api with the subscription
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the SubscriptionQuery
     */
    async subscription(opts?: O): Promise<ResultOf<typeof D.SubscriptionDocument>["subscription"]> {
      const response = await requester<D.SubscriptionQuery, D.SubscriptionQueryVariables>(
        D.SubscriptionDocument,
        {},
        opts
      );
      return {
        ...response?.subscription,
      };
    },
    /**
     * Call the Linear api with the teamMembership
     *
     * @param id - id to pass into the TeamMembershipQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamMembershipQuery
     */
    async teamMembership(id: string, opts?: O): Promise<ResultOf<typeof D.TeamMembershipDocument>["teamMembership"]> {
      const response = await requester<D.TeamMembershipQuery, D.TeamMembershipQueryVariables>(
        D.TeamMembershipDocument,
        { id },
        opts
      );
      return {
        ...response?.teamMembership,
      };
    },
    /**
     * Call the Linear api with the teamMemberships
     *
     * @param vars - variables to pass into the TeamMembershipsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamMembershipsQuery
     */
    async teamMemberships(
      vars?: D.TeamMembershipsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamMembershipsDocument>["teamMemberships"]> {
      const response = await requester<D.TeamMembershipsQuery, D.TeamMembershipsQueryVariables>(
        D.TeamMembershipsDocument,
        vars,
        opts
      );
      return {
        ...response?.teamMemberships,
      };
    },
    /**
     * Call the Linear api with the team
     *
     * @param id - id to pass into the TeamQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamQuery
     */
    async team(id: string, opts?: O): Promise<ResultOf<typeof D.TeamDocument>["team"] & LinearSdkTeam> {
      const response = await requester<D.TeamQuery, D.TeamQueryVariables>(D.TeamDocument, { id }, opts);
      return {
        ...response?.team,
        ...createLinearSdkTeam(requester, id),
      };
    },
    /**
     * Call the Linear api with the teams
     *
     * @param vars - variables to pass into the TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamsQuery
     */
    async teams(vars?: D.TeamsQueryVariables, opts?: O): Promise<ResultOf<typeof D.TeamsDocument>["teams"]> {
      const response = await requester<D.TeamsQuery, D.TeamsQueryVariables>(D.TeamsDocument, vars, opts);
      return {
        ...response?.teams,
      };
    },
    /**
     * Call the Linear api with the templates
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the TemplatesQuery
     */
    async templates(opts?: O): Promise<ResultOf<typeof D.TemplatesDocument>["templates"]> {
      const response = await requester<D.TemplatesQuery, D.TemplatesQueryVariables>(D.TemplatesDocument, {}, opts);
      return {
        ...response?.templates,
      };
    },
    /**
     * Call the Linear api with the template
     *
     * @param id - id to pass into the TemplateQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the TemplateQuery
     */
    async template(id: string, opts?: O): Promise<ResultOf<typeof D.TemplateDocument>["template"]> {
      const response = await requester<D.TemplateQuery, D.TemplateQueryVariables>(D.TemplateDocument, { id }, opts);
      return {
        ...response?.template,
      };
    },
    /**
     * Call the Linear api with the viewPreferences
     *
     * @param vars - variables to pass into the ViewPreferencesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ViewPreferencesQuery
     */
    async viewPreferences(
      vars?: D.ViewPreferencesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.ViewPreferencesDocument>["viewPreferences"]> {
      const response = await requester<D.ViewPreferencesQuery, D.ViewPreferencesQueryVariables>(
        D.ViewPreferencesDocument,
        vars,
        opts
      );
      return {
        ...response?.viewPreferences,
      };
    },
    /**
     * Call the Linear api with the webhook
     *
     * @param id - id to pass into the WebhookQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the WebhookQuery
     */
    async webhook(id: string, opts?: O): Promise<ResultOf<typeof D.WebhookDocument>["webhook"]> {
      const response = await requester<D.WebhookQuery, D.WebhookQueryVariables>(D.WebhookDocument, { id }, opts);
      return {
        ...response?.webhook,
      };
    },
    /**
     * Call the Linear api with the webhooks
     *
     * @param vars - variables to pass into the WebhooksQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the WebhooksQuery
     */
    async webhooks(
      vars?: D.WebhooksQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.WebhooksDocument>["webhooks"]> {
      const response = await requester<D.WebhooksQuery, D.WebhooksQueryVariables>(D.WebhooksDocument, vars, opts);
      return {
        ...response?.webhooks,
      };
    },
    /**
     * Call the Linear api with the workflowState
     *
     * @param id - id to pass into the WorkflowStateQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the WorkflowStateQuery
     */
    async workflowState(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.WorkflowStateDocument>["workflowState"] & LinearSdkWorkflowState> {
      const response = await requester<D.WorkflowStateQuery, D.WorkflowStateQueryVariables>(
        D.WorkflowStateDocument,
        { id },
        opts
      );
      return {
        ...response?.workflowState,
        ...createLinearSdkWorkflowState(requester, id),
      };
    },
    /**
     * Call the Linear api with the workflowStates
     *
     * @param vars - variables to pass into the WorkflowStatesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the WorkflowStatesQuery
     */
    async workflowStates(
      vars?: D.WorkflowStatesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.WorkflowStatesDocument>["workflowStates"]> {
      const response = await requester<D.WorkflowStatesQuery, D.WorkflowStatesQueryVariables>(
        D.WorkflowStatesDocument,
        vars,
        opts
      );
      return {
        ...response?.workflowStates,
      };
    },
    /**
     * Call the Linear api with the userUpdate
     *
     * @param input - input to pass into the UserUpdateMutation
     * @param id - id to pass into the UserUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserUpdateMutation
     */
    async userUpdate(
      input: D.UpdateUserInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.UserUpdateDocument>["userUpdate"]> {
      const response = await requester<D.UserUpdateMutation, D.UserUpdateMutationVariables>(
        D.UserUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.userUpdate,
      };
    },
    /**
     * Call the Linear api with the userSuspend
     *
     * @param id - id to pass into the UserSuspendMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserSuspendMutation
     */
    async userSuspend(id: string, opts?: O): Promise<ResultOf<typeof D.UserSuspendDocument>["userSuspend"]> {
      const response = await requester<D.UserSuspendMutation, D.UserSuspendMutationVariables>(
        D.UserSuspendDocument,
        { id },
        opts
      );
      return {
        ...response?.userSuspend,
      };
    },
    /**
     * Call the Linear api with the userUnsuspend
     *
     * @param id - id to pass into the UserUnsuspendMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserUnsuspendMutation
     */
    async userUnsuspend(id: string, opts?: O): Promise<ResultOf<typeof D.UserUnsuspendDocument>["userUnsuspend"]> {
      const response = await requester<D.UserUnsuspendMutation, D.UserUnsuspendMutationVariables>(
        D.UserUnsuspendDocument,
        { id },
        opts
      );
      return {
        ...response?.userUnsuspend,
      };
    },
    /**
     * Call the Linear api with the organizationUpdate
     *
     * @param input - input to pass into the OrganizationUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationUpdateMutation
     */
    async organizationUpdate(
      input: D.UpdateOrganizationInput,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationUpdateDocument>["organizationUpdate"]> {
      const response = await requester<D.OrganizationUpdateMutation, D.OrganizationUpdateMutationVariables>(
        D.OrganizationUpdateDocument,
        { input },
        opts
      );
      return {
        ...response?.organizationUpdate,
      };
    },
    /**
     * Call the Linear api with the organizationDeleteChallenge
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationDeleteChallengeMutation
     */
    async organizationDeleteChallenge(
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationDeleteChallengeDocument>["organizationDeleteChallenge"]> {
      const response = await requester<
        D.OrganizationDeleteChallengeMutation,
        D.OrganizationDeleteChallengeMutationVariables
      >(D.OrganizationDeleteChallengeDocument, {}, opts);
      return {
        ...response?.organizationDeleteChallenge,
      };
    },
    /**
     * Call the Linear api with the organizationDelete
     *
     * @param input - input to pass into the OrganizationDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationDeleteMutation
     */
    async organizationDelete(
      input: D.DeleteOrganizationInput,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationDeleteDocument>["organizationDelete"]> {
      const response = await requester<D.OrganizationDeleteMutation, D.OrganizationDeleteMutationVariables>(
        D.OrganizationDeleteDocument,
        { input },
        opts
      );
      return {
        ...response?.organizationDelete,
      };
    },
    /**
     * Call the Linear api with the organizationToggleAccess
     *
     * @param id - id to pass into the OrganizationToggleAccessMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationToggleAccessMutation
     */
    async organizationToggleAccess(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationToggleAccessDocument>["organizationToggleAccess"]> {
      const response = await requester<D.OrganizationToggleAccessMutation, D.OrganizationToggleAccessMutationVariables>(
        D.OrganizationToggleAccessDocument,
        { id },
        opts
      );
      return {
        ...response?.organizationToggleAccess,
      };
    },
    /**
     * Call the Linear api with the organizationChangeEmailDomain
     *
     * @param toDomain - toDomain to pass into the OrganizationChangeEmailDomainMutation
     * @param fromDomain - fromDomain to pass into the OrganizationChangeEmailDomainMutation
     * @param id - id to pass into the OrganizationChangeEmailDomainMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationChangeEmailDomainMutation
     */
    async organizationChangeEmailDomain(
      toDomain: string,
      fromDomain: string,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationChangeEmailDomainDocument>["organizationChangeEmailDomain"]> {
      const response = await requester<
        D.OrganizationChangeEmailDomainMutation,
        D.OrganizationChangeEmailDomainMutationVariables
      >(D.OrganizationChangeEmailDomainDocument, { toDomain, fromDomain, id }, opts);
      return {
        ...response?.organizationChangeEmailDomain,
      };
    },
    /**
     * Call the Linear api with the organizationToggleSamlEnabled
     *
     * @param id - id to pass into the OrganizationToggleSamlEnabledMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationToggleSamlEnabledMutation
     */
    async organizationToggleSamlEnabled(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationToggleSamlEnabledDocument>["organizationToggleSamlEnabled"]> {
      const response = await requester<
        D.OrganizationToggleSamlEnabledMutation,
        D.OrganizationToggleSamlEnabledMutationVariables
      >(D.OrganizationToggleSamlEnabledDocument, { id }, opts);
      return {
        ...response?.organizationToggleSamlEnabled,
      };
    },
    /**
     * Call the Linear api with the organizationConfigureSaml
     *
     * @param samlConfiguration - samlConfiguration to pass into the OrganizationConfigureSamlMutation
     * @param id - id to pass into the OrganizationConfigureSamlMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationConfigureSamlMutation
     */
    async organizationConfigureSaml(
      samlConfiguration: D.SamlConfigurationInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationConfigureSamlDocument>["organizationConfigureSaml"]> {
      const response = await requester<
        D.OrganizationConfigureSamlMutation,
        D.OrganizationConfigureSamlMutationVariables
      >(D.OrganizationConfigureSamlDocument, { samlConfiguration, id }, opts);
      return {
        ...response?.organizationConfigureSaml,
      };
    },
    /**
     * Call the Linear api with the eventCreate
     *
     * @param input - input to pass into the EventCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the EventCreateMutation
     */
    async eventCreate(
      input: D.EventCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.EventCreateDocument>["eventCreate"]> {
      const response = await requester<D.EventCreateMutation, D.EventCreateMutationVariables>(
        D.EventCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.eventCreate,
      };
    },
    /**
     * Call the Linear api with the apiKeyCreate
     *
     * @param input - input to pass into the ApiKeyCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ApiKeyCreateMutation
     */
    async apiKeyCreate(
      input: D.ApiKeyCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.ApiKeyCreateDocument>["apiKeyCreate"]> {
      const response = await requester<D.ApiKeyCreateMutation, D.ApiKeyCreateMutationVariables>(
        D.ApiKeyCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.apiKeyCreate,
      };
    },
    /**
     * Call the Linear api with the apiKeyDelete
     *
     * @param id - id to pass into the ApiKeyDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ApiKeyDeleteMutation
     */
    async apiKeyDelete(id: string, opts?: O): Promise<ResultOf<typeof D.ApiKeyDeleteDocument>["apiKeyDelete"]> {
      const response = await requester<D.ApiKeyDeleteMutation, D.ApiKeyDeleteMutationVariables>(
        D.ApiKeyDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.apiKeyDelete,
      };
    },
    /**
     * Call the Linear api with the emailUserAccountAuthChallenge
     *
     * @param input - input to pass into the EmailUserAccountAuthChallengeMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the EmailUserAccountAuthChallengeMutation
     */
    async emailUserAccountAuthChallenge(
      input: D.EmailUserAccountAuthChallengeInput,
      opts?: O
    ): Promise<ResultOf<typeof D.EmailUserAccountAuthChallengeDocument>["emailUserAccountAuthChallenge"]> {
      const response = await requester<
        D.EmailUserAccountAuthChallengeMutation,
        D.EmailUserAccountAuthChallengeMutationVariables
      >(D.EmailUserAccountAuthChallengeDocument, { input }, opts);
      return {
        ...response?.emailUserAccountAuthChallenge,
      };
    },
    /**
     * Call the Linear api with the emailTokenUserAccountAuth
     *
     * @param input - input to pass into the EmailTokenUserAccountAuthMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the EmailTokenUserAccountAuthMutation
     */
    async emailTokenUserAccountAuth(
      input: D.TokenUserAccountAuthInput,
      opts?: O
    ): Promise<ResultOf<typeof D.EmailTokenUserAccountAuthDocument>["emailTokenUserAccountAuth"]> {
      const response = await requester<
        D.EmailTokenUserAccountAuthMutation,
        D.EmailTokenUserAccountAuthMutationVariables
      >(D.EmailTokenUserAccountAuthDocument, { input }, opts);
      return {
        ...response?.emailTokenUserAccountAuth,
      };
    },
    /**
     * Call the Linear api with the samlTokenUserAccountAuth
     *
     * @param input - input to pass into the SamlTokenUserAccountAuthMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the SamlTokenUserAccountAuthMutation
     */
    async samlTokenUserAccountAuth(
      input: D.TokenUserAccountAuthInput,
      opts?: O
    ): Promise<ResultOf<typeof D.SamlTokenUserAccountAuthDocument>["samlTokenUserAccountAuth"]> {
      const response = await requester<D.SamlTokenUserAccountAuthMutation, D.SamlTokenUserAccountAuthMutationVariables>(
        D.SamlTokenUserAccountAuthDocument,
        { input },
        opts
      );
      return {
        ...response?.samlTokenUserAccountAuth,
      };
    },
    /**
     * Call the Linear api with the googleUserAccountAuth
     *
     * @param input - input to pass into the GoogleUserAccountAuthMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the GoogleUserAccountAuthMutation
     */
    async googleUserAccountAuth(
      input: D.GoogleUserAccountAuthInput,
      opts?: O
    ): Promise<ResultOf<typeof D.GoogleUserAccountAuthDocument>["googleUserAccountAuth"]> {
      const response = await requester<D.GoogleUserAccountAuthMutation, D.GoogleUserAccountAuthMutationVariables>(
        D.GoogleUserAccountAuthDocument,
        { input },
        opts
      );
      return {
        ...response?.googleUserAccountAuth,
      };
    },
    /**
     * Call the Linear api with the createOrganizationFromOnboarding
     *
     * @param input - input to pass into the CreateOrganizationFromOnboardingMutation
     * @param vars - variables without 'input' to pass into the CreateOrganizationFromOnboardingMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CreateOrganizationFromOnboardingMutation
     */
    async createOrganizationFromOnboarding(
      input: D.CreateOrganizationInput,
      vars?: Omit<D.CreateOrganizationFromOnboardingMutationVariables, "input">,
      opts?: O
    ): Promise<ResultOf<typeof D.CreateOrganizationFromOnboardingDocument>["createOrganizationFromOnboarding"]> {
      const response = await requester<
        D.CreateOrganizationFromOnboardingMutation,
        D.CreateOrganizationFromOnboardingMutationVariables
      >(D.CreateOrganizationFromOnboardingDocument, { input, ...vars }, opts);
      return {
        ...response?.createOrganizationFromOnboarding,
      };
    },
    /**
     * Call the Linear api with the joinOrganizationFromOnboarding
     *
     * @param input - input to pass into the JoinOrganizationFromOnboardingMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the JoinOrganizationFromOnboardingMutation
     */
    async joinOrganizationFromOnboarding(
      input: D.JoinOrganizationInput,
      opts?: O
    ): Promise<ResultOf<typeof D.JoinOrganizationFromOnboardingDocument>["joinOrganizationFromOnboarding"]> {
      const response = await requester<
        D.JoinOrganizationFromOnboardingMutation,
        D.JoinOrganizationFromOnboardingMutationVariables
      >(D.JoinOrganizationFromOnboardingDocument, { input }, opts);
      return {
        ...response?.joinOrganizationFromOnboarding,
      };
    },
    /**
     * Call the Linear api with the leaveOrganization
     *
     * @param organizationId - organizationId to pass into the LeaveOrganizationMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the LeaveOrganizationMutation
     */
    async leaveOrganization(
      organizationId: string,
      opts?: O
    ): Promise<ResultOf<typeof D.LeaveOrganizationDocument>["leaveOrganization"]> {
      const response = await requester<D.LeaveOrganizationMutation, D.LeaveOrganizationMutationVariables>(
        D.LeaveOrganizationDocument,
        { organizationId },
        opts
      );
      return {
        ...response?.leaveOrganization,
      };
    },
    /**
     * Call the Linear api with the billingEmailUpdate
     *
     * @param input - input to pass into the BillingEmailUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the BillingEmailUpdateMutation
     */
    async billingEmailUpdate(
      input: D.BillingEmailUpdateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.BillingEmailUpdateDocument>["billingEmailUpdate"]> {
      const response = await requester<D.BillingEmailUpdateMutation, D.BillingEmailUpdateMutationVariables>(
        D.BillingEmailUpdateDocument,
        { input },
        opts
      );
      return {
        ...response?.billingEmailUpdate,
      };
    },
    /**
     * Call the Linear api with the collaborativeDocumentUpdate
     *
     * @param input - input to pass into the CollaborativeDocumentUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CollaborativeDocumentUpdateMutation
     */
    async collaborativeDocumentUpdate(
      input: D.CollaborationDocumentUpdateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.CollaborativeDocumentUpdateDocument>["collaborativeDocumentUpdate"]> {
      const response = await requester<
        D.CollaborativeDocumentUpdateMutation,
        D.CollaborativeDocumentUpdateMutationVariables
      >(D.CollaborativeDocumentUpdateDocument, { input }, opts);
      return {
        ...response?.collaborativeDocumentUpdate,
      };
    },
    /**
     * Call the Linear api with the commentCreate
     *
     * @param input - input to pass into the CommentCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CommentCreateMutation
     */
    async commentCreate(
      input: D.CommentCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.CommentCreateDocument>["commentCreate"]> {
      const response = await requester<D.CommentCreateMutation, D.CommentCreateMutationVariables>(
        D.CommentCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.commentCreate,
      };
    },
    /**
     * Call the Linear api with the commentUpdate
     *
     * @param input - input to pass into the CommentUpdateMutation
     * @param id - id to pass into the CommentUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CommentUpdateMutation
     */
    async commentUpdate(
      input: D.CommentUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.CommentUpdateDocument>["commentUpdate"]> {
      const response = await requester<D.CommentUpdateMutation, D.CommentUpdateMutationVariables>(
        D.CommentUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.commentUpdate,
      };
    },
    /**
     * Call the Linear api with the commentDelete
     *
     * @param id - id to pass into the CommentDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CommentDeleteMutation
     */
    async commentDelete(id: string, opts?: O): Promise<ResultOf<typeof D.CommentDeleteDocument>["commentDelete"]> {
      const response = await requester<D.CommentDeleteMutation, D.CommentDeleteMutationVariables>(
        D.CommentDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.commentDelete,
      };
    },
    /**
     * Call the Linear api with the contactCreate
     *
     * @param input - input to pass into the ContactCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ContactCreateMutation
     */
    async contactCreate(
      input: D.ContactCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.ContactCreateDocument>["contactCreate"]> {
      const response = await requester<D.ContactCreateMutation, D.ContactCreateMutationVariables>(
        D.ContactCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.contactCreate,
      };
    },
    /**
     * Call the Linear api with the customViewCreate
     *
     * @param input - input to pass into the CustomViewCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomViewCreateMutation
     */
    async customViewCreate(
      input: D.CustomViewCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.CustomViewCreateDocument>["customViewCreate"]> {
      const response = await requester<D.CustomViewCreateMutation, D.CustomViewCreateMutationVariables>(
        D.CustomViewCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.customViewCreate,
      };
    },
    /**
     * Call the Linear api with the customViewUpdate
     *
     * @param input - input to pass into the CustomViewUpdateMutation
     * @param id - id to pass into the CustomViewUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomViewUpdateMutation
     */
    async customViewUpdate(
      input: D.CustomViewUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.CustomViewUpdateDocument>["customViewUpdate"]> {
      const response = await requester<D.CustomViewUpdateMutation, D.CustomViewUpdateMutationVariables>(
        D.CustomViewUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.customViewUpdate,
      };
    },
    /**
     * Call the Linear api with the customViewDelete
     *
     * @param id - id to pass into the CustomViewDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomViewDeleteMutation
     */
    async customViewDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.CustomViewDeleteDocument>["customViewDelete"]> {
      const response = await requester<D.CustomViewDeleteMutation, D.CustomViewDeleteMutationVariables>(
        D.CustomViewDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.customViewDelete,
      };
    },
    /**
     * Call the Linear api with the cycleCreate
     *
     * @param input - input to pass into the CycleCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CycleCreateMutation
     */
    async cycleCreate(
      input: D.CycleCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.CycleCreateDocument>["cycleCreate"]> {
      const response = await requester<D.CycleCreateMutation, D.CycleCreateMutationVariables>(
        D.CycleCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.cycleCreate,
      };
    },
    /**
     * Call the Linear api with the cycleUpdate
     *
     * @param input - input to pass into the CycleUpdateMutation
     * @param id - id to pass into the CycleUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CycleUpdateMutation
     */
    async cycleUpdate(
      input: D.CycleUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.CycleUpdateDocument>["cycleUpdate"]> {
      const response = await requester<D.CycleUpdateMutation, D.CycleUpdateMutationVariables>(
        D.CycleUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.cycleUpdate,
      };
    },
    /**
     * Call the Linear api with the cycleArchive
     *
     * @param id - id to pass into the CycleArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CycleArchiveMutation
     */
    async cycleArchive(id: string, opts?: O): Promise<ResultOf<typeof D.CycleArchiveDocument>["cycleArchive"]> {
      const response = await requester<D.CycleArchiveMutation, D.CycleArchiveMutationVariables>(
        D.CycleArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.cycleArchive,
      };
    },
    /**
     * Call the Linear api with the debugFailWithInternalError
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the DebugFailWithInternalErrorMutation
     */
    async debugFailWithInternalError(
      opts?: O
    ): Promise<ResultOf<typeof D.DebugFailWithInternalErrorDocument>["debugFailWithInternalError"]> {
      const response = await requester<
        D.DebugFailWithInternalErrorMutation,
        D.DebugFailWithInternalErrorMutationVariables
      >(D.DebugFailWithInternalErrorDocument, {}, opts);
      return {
        ...response?.debugFailWithInternalError,
      };
    },
    /**
     * Call the Linear api with the debugFailWithWarning
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the DebugFailWithWarningMutation
     */
    async debugFailWithWarning(
      opts?: O
    ): Promise<ResultOf<typeof D.DebugFailWithWarningDocument>["debugFailWithWarning"]> {
      const response = await requester<D.DebugFailWithWarningMutation, D.DebugFailWithWarningMutationVariables>(
        D.DebugFailWithWarningDocument,
        {},
        opts
      );
      return {
        ...response?.debugFailWithWarning,
      };
    },
    /**
     * Call the Linear api with the debugCreateSAMLOrg
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the DebugCreateSamlOrgMutation
     */
    async debugCreateSAMLOrg(opts?: O): Promise<ResultOf<typeof D.DebugCreateSamlOrgDocument>["debugCreateSAMLOrg"]> {
      const response = await requester<D.DebugCreateSamlOrgMutation, D.DebugCreateSamlOrgMutationVariables>(
        D.DebugCreateSamlOrgDocument,
        {},
        opts
      );
      return {
        ...response?.debugCreateSAMLOrg,
      };
    },
    /**
     * Call the Linear api with the emailUnsubscribe
     *
     * @param input - input to pass into the EmailUnsubscribeMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the EmailUnsubscribeMutation
     */
    async emailUnsubscribe(
      input: D.EmailUnsubscribeInput,
      opts?: O
    ): Promise<ResultOf<typeof D.EmailUnsubscribeDocument>["emailUnsubscribe"]> {
      const response = await requester<D.EmailUnsubscribeMutation, D.EmailUnsubscribeMutationVariables>(
        D.EmailUnsubscribeDocument,
        { input },
        opts
      );
      return {
        ...response?.emailUnsubscribe,
      };
    },
    /**
     * Call the Linear api with the emojiCreate
     *
     * @param input - input to pass into the EmojiCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the EmojiCreateMutation
     */
    async emojiCreate(
      input: D.EmojiCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.EmojiCreateDocument>["emojiCreate"]> {
      const response = await requester<D.EmojiCreateMutation, D.EmojiCreateMutationVariables>(
        D.EmojiCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.emojiCreate,
      };
    },
    /**
     * Call the Linear api with the emojiDelete
     *
     * @param id - id to pass into the EmojiDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the EmojiDeleteMutation
     */
    async emojiDelete(id: string, opts?: O): Promise<ResultOf<typeof D.EmojiDeleteDocument>["emojiDelete"]> {
      const response = await requester<D.EmojiDeleteMutation, D.EmojiDeleteMutationVariables>(
        D.EmojiDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.emojiDelete,
      };
    },
    /**
     * Call the Linear api with the favoriteCreate
     *
     * @param input - input to pass into the FavoriteCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the FavoriteCreateMutation
     */
    async favoriteCreate(
      input: D.FavoriteCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.FavoriteCreateDocument>["favoriteCreate"]> {
      const response = await requester<D.FavoriteCreateMutation, D.FavoriteCreateMutationVariables>(
        D.FavoriteCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.favoriteCreate,
      };
    },
    /**
     * Call the Linear api with the favoriteUpdate
     *
     * @param input - input to pass into the FavoriteUpdateMutation
     * @param id - id to pass into the FavoriteUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the FavoriteUpdateMutation
     */
    async favoriteUpdate(
      input: D.FavoriteUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.FavoriteUpdateDocument>["favoriteUpdate"]> {
      const response = await requester<D.FavoriteUpdateMutation, D.FavoriteUpdateMutationVariables>(
        D.FavoriteUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.favoriteUpdate,
      };
    },
    /**
     * Call the Linear api with the favoriteDelete
     *
     * @param id - id to pass into the FavoriteDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the FavoriteDeleteMutation
     */
    async favoriteDelete(id: string, opts?: O): Promise<ResultOf<typeof D.FavoriteDeleteDocument>["favoriteDelete"]> {
      const response = await requester<D.FavoriteDeleteMutation, D.FavoriteDeleteMutationVariables>(
        D.FavoriteDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.favoriteDelete,
      };
    },
    /**
     * Call the Linear api with the feedbackCreate
     *
     * @param input - input to pass into the FeedbackCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the FeedbackCreateMutation
     */
    async feedbackCreate(
      input: D.FeedbackCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.FeedbackCreateDocument>["feedbackCreate"]> {
      const response = await requester<D.FeedbackCreateMutation, D.FeedbackCreateMutationVariables>(
        D.FeedbackCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.feedbackCreate,
      };
    },
    /**
     * Call the Linear api with the fileUpload
     *
     * @param size - size to pass into the FileUploadMutation
     * @param contentType - contentType to pass into the FileUploadMutation
     * @param filename - filename to pass into the FileUploadMutation
     * @param vars - variables without 'size', 'contentType', 'filename' to pass into the FileUploadMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the FileUploadMutation
     */
    async fileUpload(
      size: number,
      contentType: string,
      filename: string,
      vars?: Omit<D.FileUploadMutationVariables, "size" | "contentType" | "filename">,
      opts?: O
    ): Promise<ResultOf<typeof D.FileUploadDocument>["fileUpload"]> {
      const response = await requester<D.FileUploadMutation, D.FileUploadMutationVariables>(
        D.FileUploadDocument,
        { size, contentType, filename, ...vars },
        opts
      );
      return {
        ...response?.fileUpload,
      };
    },
    /**
     * Call the Linear api with the imageUploadFromUrl
     *
     * @param url - url to pass into the ImageUploadFromUrlMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ImageUploadFromUrlMutation
     */
    async imageUploadFromUrl(
      url: string,
      opts?: O
    ): Promise<ResultOf<typeof D.ImageUploadFromUrlDocument>["imageUploadFromUrl"]> {
      const response = await requester<D.ImageUploadFromUrlMutation, D.ImageUploadFromUrlMutationVariables>(
        D.ImageUploadFromUrlDocument,
        { url },
        opts
      );
      return {
        ...response?.imageUploadFromUrl,
      };
    },
    /**
     * Call the Linear api with the integrationGithubConnect
     *
     * @param installationId - installationId to pass into the IntegrationGithubConnectMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationGithubConnectMutation
     */
    async integrationGithubConnect(
      installationId: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationGithubConnectDocument>["integrationGithubConnect"]> {
      const response = await requester<D.IntegrationGithubConnectMutation, D.IntegrationGithubConnectMutationVariables>(
        D.IntegrationGithubConnectDocument,
        { installationId },
        opts
      );
      return {
        ...response?.integrationGithubConnect,
      };
    },
    /**
     * Call the Linear api with the integrationGitlabConnect
     *
     * @param gitlabUrl - gitlabUrl to pass into the IntegrationGitlabConnectMutation
     * @param accessToken - accessToken to pass into the IntegrationGitlabConnectMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationGitlabConnectMutation
     */
    async integrationGitlabConnect(
      gitlabUrl: string,
      accessToken: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationGitlabConnectDocument>["integrationGitlabConnect"]> {
      const response = await requester<D.IntegrationGitlabConnectMutation, D.IntegrationGitlabConnectMutationVariables>(
        D.IntegrationGitlabConnectDocument,
        { gitlabUrl, accessToken },
        opts
      );
      return {
        ...response?.integrationGitlabConnect,
      };
    },
    /**
     * Call the Linear api with the integrationSlack
     *
     * @param redirectUri - redirectUri to pass into the IntegrationSlackMutation
     * @param code - code to pass into the IntegrationSlackMutation
     * @param vars - variables without 'redirectUri', 'code' to pass into the IntegrationSlackMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationSlackMutation
     */
    async integrationSlack(
      redirectUri: string,
      code: string,
      vars?: Omit<D.IntegrationSlackMutationVariables, "redirectUri" | "code">,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationSlackDocument>["integrationSlack"]> {
      const response = await requester<D.IntegrationSlackMutation, D.IntegrationSlackMutationVariables>(
        D.IntegrationSlackDocument,
        { redirectUri, code, ...vars },
        opts
      );
      return {
        ...response?.integrationSlack,
      };
    },
    /**
     * Call the Linear api with the integrationSlackPersonal
     *
     * @param redirectUri - redirectUri to pass into the IntegrationSlackPersonalMutation
     * @param code - code to pass into the IntegrationSlackPersonalMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationSlackPersonalMutation
     */
    async integrationSlackPersonal(
      redirectUri: string,
      code: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationSlackPersonalDocument>["integrationSlackPersonal"]> {
      const response = await requester<D.IntegrationSlackPersonalMutation, D.IntegrationSlackPersonalMutationVariables>(
        D.IntegrationSlackPersonalDocument,
        { redirectUri, code },
        opts
      );
      return {
        ...response?.integrationSlackPersonal,
      };
    },
    /**
     * Call the Linear api with the integrationSlackPost
     *
     * @param redirectUri - redirectUri to pass into the IntegrationSlackPostMutation
     * @param teamId - teamId to pass into the IntegrationSlackPostMutation
     * @param code - code to pass into the IntegrationSlackPostMutation
     * @param vars - variables without 'redirectUri', 'teamId', 'code' to pass into the IntegrationSlackPostMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationSlackPostMutation
     */
    async integrationSlackPost(
      redirectUri: string,
      teamId: string,
      code: string,
      vars?: Omit<D.IntegrationSlackPostMutationVariables, "redirectUri" | "teamId" | "code">,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationSlackPostDocument>["integrationSlackPost"]> {
      const response = await requester<D.IntegrationSlackPostMutation, D.IntegrationSlackPostMutationVariables>(
        D.IntegrationSlackPostDocument,
        { redirectUri, teamId, code, ...vars },
        opts
      );
      return {
        ...response?.integrationSlackPost,
      };
    },
    /**
     * Call the Linear api with the integrationSlackProjectPost
     *
     * @param redirectUri - redirectUri to pass into the IntegrationSlackProjectPostMutation
     * @param projectId - projectId to pass into the IntegrationSlackProjectPostMutation
     * @param code - code to pass into the IntegrationSlackProjectPostMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationSlackProjectPostMutation
     */
    async integrationSlackProjectPost(
      redirectUri: string,
      projectId: string,
      code: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationSlackProjectPostDocument>["integrationSlackProjectPost"]> {
      const response = await requester<
        D.IntegrationSlackProjectPostMutation,
        D.IntegrationSlackProjectPostMutationVariables
      >(D.IntegrationSlackProjectPostDocument, { redirectUri, projectId, code }, opts);
      return {
        ...response?.integrationSlackProjectPost,
      };
    },
    /**
     * Call the Linear api with the integrationSlackImportEmojis
     *
     * @param redirectUri - redirectUri to pass into the IntegrationSlackImportEmojisMutation
     * @param code - code to pass into the IntegrationSlackImportEmojisMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationSlackImportEmojisMutation
     */
    async integrationSlackImportEmojis(
      redirectUri: string,
      code: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationSlackImportEmojisDocument>["integrationSlackImportEmojis"]> {
      const response = await requester<
        D.IntegrationSlackImportEmojisMutation,
        D.IntegrationSlackImportEmojisMutationVariables
      >(D.IntegrationSlackImportEmojisDocument, { redirectUri, code }, opts);
      return {
        ...response?.integrationSlackImportEmojis,
      };
    },
    /**
     * Call the Linear api with the integrationFigma
     *
     * @param redirectUri - redirectUri to pass into the IntegrationFigmaMutation
     * @param code - code to pass into the IntegrationFigmaMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationFigmaMutation
     */
    async integrationFigma(
      redirectUri: string,
      code: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationFigmaDocument>["integrationFigma"]> {
      const response = await requester<D.IntegrationFigmaMutation, D.IntegrationFigmaMutationVariables>(
        D.IntegrationFigmaDocument,
        { redirectUri, code },
        opts
      );
      return {
        ...response?.integrationFigma,
      };
    },
    /**
     * Call the Linear api with the integrationGoogleSheets
     *
     * @param code - code to pass into the IntegrationGoogleSheetsMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationGoogleSheetsMutation
     */
    async integrationGoogleSheets(
      code: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationGoogleSheetsDocument>["integrationGoogleSheets"]> {
      const response = await requester<D.IntegrationGoogleSheetsMutation, D.IntegrationGoogleSheetsMutationVariables>(
        D.IntegrationGoogleSheetsDocument,
        { code },
        opts
      );
      return {
        ...response?.integrationGoogleSheets,
      };
    },
    /**
     * Call the Linear api with the refreshGoogleSheetsData
     *
     * @param id - id to pass into the RefreshGoogleSheetsDataMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the RefreshGoogleSheetsDataMutation
     */
    async refreshGoogleSheetsData(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.RefreshGoogleSheetsDataDocument>["refreshGoogleSheetsData"]> {
      const response = await requester<D.RefreshGoogleSheetsDataMutation, D.RefreshGoogleSheetsDataMutationVariables>(
        D.RefreshGoogleSheetsDataDocument,
        { id },
        opts
      );
      return {
        ...response?.refreshGoogleSheetsData,
      };
    },
    /**
     * Call the Linear api with the integrationSentryConnect
     *
     * @param organizationSlug - organizationSlug to pass into the IntegrationSentryConnectMutation
     * @param code - code to pass into the IntegrationSentryConnectMutation
     * @param installationId - installationId to pass into the IntegrationSentryConnectMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationSentryConnectMutation
     */
    async integrationSentryConnect(
      organizationSlug: string,
      code: string,
      installationId: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationSentryConnectDocument>["integrationSentryConnect"]> {
      const response = await requester<D.IntegrationSentryConnectMutation, D.IntegrationSentryConnectMutationVariables>(
        D.IntegrationSentryConnectDocument,
        { organizationSlug, code, installationId },
        opts
      );
      return {
        ...response?.integrationSentryConnect,
      };
    },
    /**
     * Call the Linear api with the integrationDelete
     *
     * @param id - id to pass into the IntegrationDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationDeleteMutation
     */
    async integrationDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationDeleteDocument>["integrationDelete"]> {
      const response = await requester<D.IntegrationDeleteMutation, D.IntegrationDeleteMutationVariables>(
        D.IntegrationDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.integrationDelete,
      };
    },
    /**
     * Call the Linear api with the integrationResourceArchive
     *
     * @param id - id to pass into the IntegrationResourceArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResourceArchiveMutation
     */
    async integrationResourceArchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationResourceArchiveDocument>["integrationResourceArchive"]> {
      const response = await requester<
        D.IntegrationResourceArchiveMutation,
        D.IntegrationResourceArchiveMutationVariables
      >(D.IntegrationResourceArchiveDocument, { id }, opts);
      return {
        ...response?.integrationResourceArchive,
      };
    },
    /**
     * Call the Linear api with the issueLabelCreate
     *
     * @param input - input to pass into the IssueLabelCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueLabelCreateMutation
     */
    async issueLabelCreate(
      input: D.IssueLabelCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueLabelCreateDocument>["issueLabelCreate"]> {
      const response = await requester<D.IssueLabelCreateMutation, D.IssueLabelCreateMutationVariables>(
        D.IssueLabelCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.issueLabelCreate,
      };
    },
    /**
     * Call the Linear api with the issueLabelUpdate
     *
     * @param input - input to pass into the IssueLabelUpdateMutation
     * @param id - id to pass into the IssueLabelUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueLabelUpdateMutation
     */
    async issueLabelUpdate(
      input: D.IssueLabelUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueLabelUpdateDocument>["issueLabelUpdate"]> {
      const response = await requester<D.IssueLabelUpdateMutation, D.IssueLabelUpdateMutationVariables>(
        D.IssueLabelUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.issueLabelUpdate,
      };
    },
    /**
     * Call the Linear api with the issueLabelArchive
     *
     * @param id - id to pass into the IssueLabelArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueLabelArchiveMutation
     */
    async issueLabelArchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueLabelArchiveDocument>["issueLabelArchive"]> {
      const response = await requester<D.IssueLabelArchiveMutation, D.IssueLabelArchiveMutationVariables>(
        D.IssueLabelArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.issueLabelArchive,
      };
    },
    /**
     * Call the Linear api with the issueRelationCreate
     *
     * @param input - input to pass into the IssueRelationCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueRelationCreateMutation
     */
    async issueRelationCreate(
      input: D.IssueRelationCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueRelationCreateDocument>["issueRelationCreate"]> {
      const response = await requester<D.IssueRelationCreateMutation, D.IssueRelationCreateMutationVariables>(
        D.IssueRelationCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.issueRelationCreate,
      };
    },
    /**
     * Call the Linear api with the issueRelationUpdate
     *
     * @param input - input to pass into the IssueRelationUpdateMutation
     * @param id - id to pass into the IssueRelationUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueRelationUpdateMutation
     */
    async issueRelationUpdate(
      input: D.IssueRelationUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueRelationUpdateDocument>["issueRelationUpdate"]> {
      const response = await requester<D.IssueRelationUpdateMutation, D.IssueRelationUpdateMutationVariables>(
        D.IssueRelationUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.issueRelationUpdate,
      };
    },
    /**
     * Call the Linear api with the issueRelationDelete
     *
     * @param id - id to pass into the IssueRelationDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueRelationDeleteMutation
     */
    async issueRelationDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueRelationDeleteDocument>["issueRelationDelete"]> {
      const response = await requester<D.IssueRelationDeleteMutation, D.IssueRelationDeleteMutationVariables>(
        D.IssueRelationDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.issueRelationDelete,
      };
    },
    /**
     * Call the Linear api with the issueCreate
     *
     * @param input - input to pass into the IssueCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueCreateMutation
     */
    async issueCreate(
      input: D.IssueCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueCreateDocument>["issueCreate"]> {
      const response = await requester<D.IssueCreateMutation, D.IssueCreateMutationVariables>(
        D.IssueCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.issueCreate,
      };
    },
    /**
     * Call the Linear api with the issueUpdate
     *
     * @param input - input to pass into the IssueUpdateMutation
     * @param id - id to pass into the IssueUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueUpdateMutation
     */
    async issueUpdate(
      input: D.IssueUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueUpdateDocument>["issueUpdate"]> {
      const response = await requester<D.IssueUpdateMutation, D.IssueUpdateMutationVariables>(
        D.IssueUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.issueUpdate,
      };
    },
    /**
     * Call the Linear api with the issueArchive
     *
     * @param id - id to pass into the IssueArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueArchiveMutation
     */
    async issueArchive(id: string, opts?: O): Promise<ResultOf<typeof D.IssueArchiveDocument>["issueArchive"]> {
      const response = await requester<D.IssueArchiveMutation, D.IssueArchiveMutationVariables>(
        D.IssueArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.issueArchive,
      };
    },
    /**
     * Call the Linear api with the issueUnarchive
     *
     * @param id - id to pass into the IssueUnarchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueUnarchiveMutation
     */
    async issueUnarchive(id: string, opts?: O): Promise<ResultOf<typeof D.IssueUnarchiveDocument>["issueUnarchive"]> {
      const response = await requester<D.IssueUnarchiveMutation, D.IssueUnarchiveMutationVariables>(
        D.IssueUnarchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.issueUnarchive,
      };
    },
    /**
     * Call the Linear api with the milestoneCreate
     *
     * @param input - input to pass into the MilestoneCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the MilestoneCreateMutation
     */
    async milestoneCreate(
      input: D.MilestoneCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.MilestoneCreateDocument>["milestoneCreate"]> {
      const response = await requester<D.MilestoneCreateMutation, D.MilestoneCreateMutationVariables>(
        D.MilestoneCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.milestoneCreate,
      };
    },
    /**
     * Call the Linear api with the milestoneUpdate
     *
     * @param input - input to pass into the MilestoneUpdateMutation
     * @param id - id to pass into the MilestoneUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the MilestoneUpdateMutation
     */
    async milestoneUpdate(
      input: D.MilestoneUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.MilestoneUpdateDocument>["milestoneUpdate"]> {
      const response = await requester<D.MilestoneUpdateMutation, D.MilestoneUpdateMutationVariables>(
        D.MilestoneUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.milestoneUpdate,
      };
    },
    /**
     * Call the Linear api with the milestoneDelete
     *
     * @param id - id to pass into the MilestoneDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the MilestoneDeleteMutation
     */
    async milestoneDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.MilestoneDeleteDocument>["milestoneDelete"]> {
      const response = await requester<D.MilestoneDeleteMutation, D.MilestoneDeleteMutationVariables>(
        D.MilestoneDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.milestoneDelete,
      };
    },
    /**
     * Call the Linear api with the notificationCreate
     *
     * @param input - input to pass into the NotificationCreateMutation
     * @param id - id to pass into the NotificationCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationCreateMutation
     */
    async notificationCreate(
      input: D.NotificationUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationCreateDocument>["notificationCreate"]> {
      const response = await requester<D.NotificationCreateMutation, D.NotificationCreateMutationVariables>(
        D.NotificationCreateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.notificationCreate,
      };
    },
    /**
     * Call the Linear api with the notificationUpdate
     *
     * @param input - input to pass into the NotificationUpdateMutation
     * @param id - id to pass into the NotificationUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationUpdateMutation
     */
    async notificationUpdate(
      input: D.NotificationUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationUpdateDocument>["notificationUpdate"]> {
      const response = await requester<D.NotificationUpdateMutation, D.NotificationUpdateMutationVariables>(
        D.NotificationUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.notificationUpdate,
      };
    },
    /**
     * Call the Linear api with the notificationDelete
     *
     * @param id - id to pass into the NotificationDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationDeleteMutation
     */
    async notificationDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationDeleteDocument>["notificationDelete"]> {
      const response = await requester<D.NotificationDeleteMutation, D.NotificationDeleteMutationVariables>(
        D.NotificationDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.notificationDelete,
      };
    },
    /**
     * Call the Linear api with the notificationArchive
     *
     * @param id - id to pass into the NotificationArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationArchiveMutation
     */
    async notificationArchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationArchiveDocument>["notificationArchive"]> {
      const response = await requester<D.NotificationArchiveMutation, D.NotificationArchiveMutationVariables>(
        D.NotificationArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.notificationArchive,
      };
    },
    /**
     * Call the Linear api with the notificationUnarchive
     *
     * @param id - id to pass into the NotificationUnarchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationUnarchiveMutation
     */
    async notificationUnarchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationUnarchiveDocument>["notificationUnarchive"]> {
      const response = await requester<D.NotificationUnarchiveMutation, D.NotificationUnarchiveMutationVariables>(
        D.NotificationUnarchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.notificationUnarchive,
      };
    },
    /**
     * Call the Linear api with the notificationSubscriptionCreate
     *
     * @param input - input to pass into the NotificationSubscriptionCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationSubscriptionCreateMutation
     */
    async notificationSubscriptionCreate(
      input: D.NotificationSubscriptionCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationSubscriptionCreateDocument>["notificationSubscriptionCreate"]> {
      const response = await requester<
        D.NotificationSubscriptionCreateMutation,
        D.NotificationSubscriptionCreateMutationVariables
      >(D.NotificationSubscriptionCreateDocument, { input }, opts);
      return {
        ...response?.notificationSubscriptionCreate,
      };
    },
    /**
     * Call the Linear api with the notificationSubscriptionDelete
     *
     * @param id - id to pass into the NotificationSubscriptionDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationSubscriptionDeleteMutation
     */
    async notificationSubscriptionDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationSubscriptionDeleteDocument>["notificationSubscriptionDelete"]> {
      const response = await requester<
        D.NotificationSubscriptionDeleteMutation,
        D.NotificationSubscriptionDeleteMutationVariables
      >(D.NotificationSubscriptionDeleteDocument, { id }, opts);
      return {
        ...response?.notificationSubscriptionDelete,
      };
    },
    /**
     * Call the Linear api with the oauthClientCreate
     *
     * @param input - input to pass into the OauthClientCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OauthClientCreateMutation
     */
    async oauthClientCreate(
      input: D.OauthClientCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.OauthClientCreateDocument>["oauthClientCreate"]> {
      const response = await requester<D.OauthClientCreateMutation, D.OauthClientCreateMutationVariables>(
        D.OauthClientCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.oauthClientCreate,
      };
    },
    /**
     * Call the Linear api with the oauthClientUpdate
     *
     * @param input - input to pass into the OauthClientUpdateMutation
     * @param id - id to pass into the OauthClientUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OauthClientUpdateMutation
     */
    async oauthClientUpdate(
      input: D.OauthClientUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.OauthClientUpdateDocument>["oauthClientUpdate"]> {
      const response = await requester<D.OauthClientUpdateMutation, D.OauthClientUpdateMutationVariables>(
        D.OauthClientUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.oauthClientUpdate,
      };
    },
    /**
     * Call the Linear api with the oauthClientArchive
     *
     * @param id - id to pass into the OauthClientArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OauthClientArchiveMutation
     */
    async oauthClientArchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.OauthClientArchiveDocument>["oauthClientArchive"]> {
      const response = await requester<D.OauthClientArchiveMutation, D.OauthClientArchiveMutationVariables>(
        D.OauthClientArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.oauthClientArchive,
      };
    },
    /**
     * Call the Linear api with the oauthClientRotateSecret
     *
     * @param id - id to pass into the OauthClientRotateSecretMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OauthClientRotateSecretMutation
     */
    async oauthClientRotateSecret(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.OauthClientRotateSecretDocument>["oauthClientRotateSecret"]> {
      const response = await requester<D.OauthClientRotateSecretMutation, D.OauthClientRotateSecretMutationVariables>(
        D.OauthClientRotateSecretDocument,
        { id },
        opts
      );
      return {
        ...response?.oauthClientRotateSecret,
      };
    },
    /**
     * Call the Linear api with the oauthTokenRevoke
     *
     * @param scope - scope to pass into the OauthTokenRevokeMutation
     * @param appId - appId to pass into the OauthTokenRevokeMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OauthTokenRevokeMutation
     */
    async oauthTokenRevoke(
      scope: string[],
      appId: string,
      opts?: O
    ): Promise<ResultOf<typeof D.OauthTokenRevokeDocument>["oauthTokenRevoke"]> {
      const response = await requester<D.OauthTokenRevokeMutation, D.OauthTokenRevokeMutationVariables>(
        D.OauthTokenRevokeDocument,
        { scope, appId },
        opts
      );
      return {
        ...response?.oauthTokenRevoke,
      };
    },
    /**
     * Call the Linear api with the organizationDomainVerify
     *
     * @param input - input to pass into the OrganizationDomainVerifyMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationDomainVerifyMutation
     */
    async organizationDomainVerify(
      input: D.OrganizationDomainVerificationInput,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationDomainVerifyDocument>["organizationDomainVerify"]> {
      const response = await requester<D.OrganizationDomainVerifyMutation, D.OrganizationDomainVerifyMutationVariables>(
        D.OrganizationDomainVerifyDocument,
        { input },
        opts
      );
      return {
        ...response?.organizationDomainVerify,
      };
    },
    /**
     * Call the Linear api with the organizationDomainCreate
     *
     * @param input - input to pass into the OrganizationDomainCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationDomainCreateMutation
     */
    async organizationDomainCreate(
      input: D.OrganizationDomainCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationDomainCreateDocument>["organizationDomainCreate"]> {
      const response = await requester<D.OrganizationDomainCreateMutation, D.OrganizationDomainCreateMutationVariables>(
        D.OrganizationDomainCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.organizationDomainCreate,
      };
    },
    /**
     * Call the Linear api with the organizationDomainDelete
     *
     * @param id - id to pass into the OrganizationDomainDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationDomainDeleteMutation
     */
    async organizationDomainDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationDomainDeleteDocument>["organizationDomainDelete"]> {
      const response = await requester<D.OrganizationDomainDeleteMutation, D.OrganizationDomainDeleteMutationVariables>(
        D.OrganizationDomainDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.organizationDomainDelete,
      };
    },
    /**
     * Call the Linear api with the organizationInviteCreate
     *
     * @param input - input to pass into the OrganizationInviteCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationInviteCreateMutation
     */
    async organizationInviteCreate(
      input: D.OrganizationInviteCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationInviteCreateDocument>["organizationInviteCreate"]> {
      const response = await requester<D.OrganizationInviteCreateMutation, D.OrganizationInviteCreateMutationVariables>(
        D.OrganizationInviteCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.organizationInviteCreate,
      };
    },
    /**
     * Call the Linear api with the resentOrganizationInvite
     *
     * @param id - id to pass into the ResentOrganizationInviteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ResentOrganizationInviteMutation
     */
    async resentOrganizationInvite(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.ResentOrganizationInviteDocument>["resentOrganizationInvite"]> {
      const response = await requester<D.ResentOrganizationInviteMutation, D.ResentOrganizationInviteMutationVariables>(
        D.ResentOrganizationInviteDocument,
        { id },
        opts
      );
      return {
        ...response?.resentOrganizationInvite,
      };
    },
    /**
     * Call the Linear api with the organizationInviteDelete
     *
     * @param id - id to pass into the OrganizationInviteDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationInviteDeleteMutation
     */
    async organizationInviteDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationInviteDeleteDocument>["organizationInviteDelete"]> {
      const response = await requester<D.OrganizationInviteDeleteMutation, D.OrganizationInviteDeleteMutationVariables>(
        D.OrganizationInviteDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.organizationInviteDelete,
      };
    },
    /**
     * Call the Linear api with the projectLinkCreate
     *
     * @param input - input to pass into the ProjectLinkCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectLinkCreateMutation
     */
    async projectLinkCreate(
      input: D.ProjectLinkCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.ProjectLinkCreateDocument>["projectLinkCreate"]> {
      const response = await requester<D.ProjectLinkCreateMutation, D.ProjectLinkCreateMutationVariables>(
        D.ProjectLinkCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.projectLinkCreate,
      };
    },
    /**
     * Call the Linear api with the projectLinkDelete
     *
     * @param id - id to pass into the ProjectLinkDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectLinkDeleteMutation
     */
    async projectLinkDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.ProjectLinkDeleteDocument>["projectLinkDelete"]> {
      const response = await requester<D.ProjectLinkDeleteMutation, D.ProjectLinkDeleteMutationVariables>(
        D.ProjectLinkDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.projectLinkDelete,
      };
    },
    /**
     * Call the Linear api with the projectCreate
     *
     * @param input - input to pass into the ProjectCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectCreateMutation
     */
    async projectCreate(
      input: D.ProjectCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.ProjectCreateDocument>["projectCreate"]> {
      const response = await requester<D.ProjectCreateMutation, D.ProjectCreateMutationVariables>(
        D.ProjectCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.projectCreate,
      };
    },
    /**
     * Call the Linear api with the projectUpdate
     *
     * @param input - input to pass into the ProjectUpdateMutation
     * @param id - id to pass into the ProjectUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectUpdateMutation
     */
    async projectUpdate(
      input: D.ProjectUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.ProjectUpdateDocument>["projectUpdate"]> {
      const response = await requester<D.ProjectUpdateMutation, D.ProjectUpdateMutationVariables>(
        D.ProjectUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.projectUpdate,
      };
    },
    /**
     * Call the Linear api with the projectArchive
     *
     * @param id - id to pass into the ProjectArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectArchiveMutation
     */
    async projectArchive(id: string, opts?: O): Promise<ResultOf<typeof D.ProjectArchiveDocument>["projectArchive"]> {
      const response = await requester<D.ProjectArchiveMutation, D.ProjectArchiveMutationVariables>(
        D.ProjectArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.projectArchive,
      };
    },
    /**
     * Call the Linear api with the pushSubscriptionCreate
     *
     * @param input - input to pass into the PushSubscriptionCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the PushSubscriptionCreateMutation
     */
    async pushSubscriptionCreate(
      input: D.PushSubscriptionCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.PushSubscriptionCreateDocument>["pushSubscriptionCreate"]> {
      const response = await requester<D.PushSubscriptionCreateMutation, D.PushSubscriptionCreateMutationVariables>(
        D.PushSubscriptionCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.pushSubscriptionCreate,
      };
    },
    /**
     * Call the Linear api with the pushSubscriptionDelete
     *
     * @param id - id to pass into the PushSubscriptionDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the PushSubscriptionDeleteMutation
     */
    async pushSubscriptionDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.PushSubscriptionDeleteDocument>["pushSubscriptionDelete"]> {
      const response = await requester<D.PushSubscriptionDeleteMutation, D.PushSubscriptionDeleteMutationVariables>(
        D.PushSubscriptionDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.pushSubscriptionDelete,
      };
    },
    /**
     * Call the Linear api with the reactionCreate
     *
     * @param input - input to pass into the ReactionCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ReactionCreateMutation
     */
    async reactionCreate(
      input: D.ReactionCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.ReactionCreateDocument>["reactionCreate"]> {
      const response = await requester<D.ReactionCreateMutation, D.ReactionCreateMutationVariables>(
        D.ReactionCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.reactionCreate,
      };
    },
    /**
     * Call the Linear api with the reactionDelete
     *
     * @param id - id to pass into the ReactionDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ReactionDeleteMutation
     */
    async reactionDelete(id: string, opts?: O): Promise<ResultOf<typeof D.ReactionDeleteDocument>["reactionDelete"]> {
      const response = await requester<D.ReactionDeleteMutation, D.ReactionDeleteMutationVariables>(
        D.ReactionDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.reactionDelete,
      };
    },
    /**
     * Call the Linear api with the createCsvExportReport
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the CreateCsvExportReportMutation
     */
    async createCsvExportReport(
      opts?: O
    ): Promise<ResultOf<typeof D.CreateCsvExportReportDocument>["createCsvExportReport"]> {
      const response = await requester<D.CreateCsvExportReportMutation, D.CreateCsvExportReportMutationVariables>(
        D.CreateCsvExportReportDocument,
        {},
        opts
      );
      return {
        ...response?.createCsvExportReport,
      };
    },
    /**
     * Call the Linear api with the subscriptionSessionCreate
     *
     * @param plan - plan to pass into the SubscriptionSessionCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the SubscriptionSessionCreateMutation
     */
    async subscriptionSessionCreate(
      plan: string,
      opts?: O
    ): Promise<ResultOf<typeof D.SubscriptionSessionCreateDocument>["subscriptionSessionCreate"]> {
      const response = await requester<
        D.SubscriptionSessionCreateMutation,
        D.SubscriptionSessionCreateMutationVariables
      >(D.SubscriptionSessionCreateDocument, { plan }, opts);
      return {
        ...response?.subscriptionSessionCreate,
      };
    },
    /**
     * Call the Linear api with the subscriptionUpdateSessionCreate
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the SubscriptionUpdateSessionCreateMutation
     */
    async subscriptionUpdateSessionCreate(
      opts?: O
    ): Promise<ResultOf<typeof D.SubscriptionUpdateSessionCreateDocument>["subscriptionUpdateSessionCreate"]> {
      const response = await requester<
        D.SubscriptionUpdateSessionCreateMutation,
        D.SubscriptionUpdateSessionCreateMutationVariables
      >(D.SubscriptionUpdateSessionCreateDocument, {}, opts);
      return {
        ...response?.subscriptionUpdateSessionCreate,
      };
    },
    /**
     * Call the Linear api with the subscriptionUpdate
     *
     * @param input - input to pass into the SubscriptionUpdateMutation
     * @param id - id to pass into the SubscriptionUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the SubscriptionUpdateMutation
     */
    async subscriptionUpdate(
      input: D.SubscriptionUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.SubscriptionUpdateDocument>["subscriptionUpdate"]> {
      const response = await requester<D.SubscriptionUpdateMutation, D.SubscriptionUpdateMutationVariables>(
        D.SubscriptionUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.subscriptionUpdate,
      };
    },
    /**
     * Call the Linear api with the subscriptionUpgrade
     *
     * @param type - type to pass into the SubscriptionUpgradeMutation
     * @param id - id to pass into the SubscriptionUpgradeMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the SubscriptionUpgradeMutation
     */
    async subscriptionUpgrade(
      type: string,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.SubscriptionUpgradeDocument>["subscriptionUpgrade"]> {
      const response = await requester<D.SubscriptionUpgradeMutation, D.SubscriptionUpgradeMutationVariables>(
        D.SubscriptionUpgradeDocument,
        { type, id },
        opts
      );
      return {
        ...response?.subscriptionUpgrade,
      };
    },
    /**
     * Call the Linear api with the subscriptionArchive
     *
     * @param id - id to pass into the SubscriptionArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the SubscriptionArchiveMutation
     */
    async subscriptionArchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.SubscriptionArchiveDocument>["subscriptionArchive"]> {
      const response = await requester<D.SubscriptionArchiveMutation, D.SubscriptionArchiveMutationVariables>(
        D.SubscriptionArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.subscriptionArchive,
      };
    },
    /**
     * Call the Linear api with the teamMembershipCreate
     *
     * @param input - input to pass into the TeamMembershipCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamMembershipCreateMutation
     */
    async teamMembershipCreate(
      input: D.TeamMembershipCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamMembershipCreateDocument>["teamMembershipCreate"]> {
      const response = await requester<D.TeamMembershipCreateMutation, D.TeamMembershipCreateMutationVariables>(
        D.TeamMembershipCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.teamMembershipCreate,
      };
    },
    /**
     * Call the Linear api with the teamMembershipDelete
     *
     * @param id - id to pass into the TeamMembershipDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamMembershipDeleteMutation
     */
    async teamMembershipDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamMembershipDeleteDocument>["teamMembershipDelete"]> {
      const response = await requester<D.TeamMembershipDeleteMutation, D.TeamMembershipDeleteMutationVariables>(
        D.TeamMembershipDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.teamMembershipDelete,
      };
    },
    /**
     * Call the Linear api with the teamCreate
     *
     * @param input - input to pass into the TeamCreateMutation
     * @param vars - variables without 'input' to pass into the TeamCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamCreateMutation
     */
    async teamCreate(
      input: D.TeamCreateInput,
      vars?: Omit<D.TeamCreateMutationVariables, "input">,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamCreateDocument>["teamCreate"]> {
      const response = await requester<D.TeamCreateMutation, D.TeamCreateMutationVariables>(
        D.TeamCreateDocument,
        { input, ...vars },
        opts
      );
      return {
        ...response?.teamCreate,
      };
    },
    /**
     * Call the Linear api with the teamUpdate
     *
     * @param input - input to pass into the TeamUpdateMutation
     * @param id - id to pass into the TeamUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamUpdateMutation
     */
    async teamUpdate(
      input: D.TeamUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamUpdateDocument>["teamUpdate"]> {
      const response = await requester<D.TeamUpdateMutation, D.TeamUpdateMutationVariables>(
        D.TeamUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.teamUpdate,
      };
    },
    /**
     * Call the Linear api with the teamArchive
     *
     * @param id - id to pass into the TeamArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamArchiveMutation
     */
    async teamArchive(id: string, opts?: O): Promise<ResultOf<typeof D.TeamArchiveDocument>["teamArchive"]> {
      const response = await requester<D.TeamArchiveMutation, D.TeamArchiveMutationVariables>(
        D.TeamArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.teamArchive,
      };
    },
    /**
     * Call the Linear api with the teamDelete
     *
     * @param id - id to pass into the TeamDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamDeleteMutation
     */
    async teamDelete(id: string, opts?: O): Promise<ResultOf<typeof D.TeamDeleteDocument>["teamDelete"]> {
      const response = await requester<D.TeamDeleteMutation, D.TeamDeleteMutationVariables>(
        D.TeamDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.teamDelete,
      };
    },
    /**
     * Call the Linear api with the templateCreate
     *
     * @param input - input to pass into the TemplateCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TemplateCreateMutation
     */
    async templateCreate(
      input: D.TemplateCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.TemplateCreateDocument>["templateCreate"]> {
      const response = await requester<D.TemplateCreateMutation, D.TemplateCreateMutationVariables>(
        D.TemplateCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.templateCreate,
      };
    },
    /**
     * Call the Linear api with the templateUpdate
     *
     * @param input - input to pass into the TemplateUpdateMutation
     * @param id - id to pass into the TemplateUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TemplateUpdateMutation
     */
    async templateUpdate(
      input: D.TemplateUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.TemplateUpdateDocument>["templateUpdate"]> {
      const response = await requester<D.TemplateUpdateMutation, D.TemplateUpdateMutationVariables>(
        D.TemplateUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.templateUpdate,
      };
    },
    /**
     * Call the Linear api with the templateDelete
     *
     * @param id - id to pass into the TemplateDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TemplateDeleteMutation
     */
    async templateDelete(id: string, opts?: O): Promise<ResultOf<typeof D.TemplateDeleteDocument>["templateDelete"]> {
      const response = await requester<D.TemplateDeleteMutation, D.TemplateDeleteMutationVariables>(
        D.TemplateDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.templateDelete,
      };
    },
    /**
     * Call the Linear api with the userSettingsUpdate
     *
     * @param input - input to pass into the UserSettingsUpdateMutation
     * @param id - id to pass into the UserSettingsUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserSettingsUpdateMutation
     */
    async userSettingsUpdate(
      input: D.UserSettingsUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.UserSettingsUpdateDocument>["userSettingsUpdate"]> {
      const response = await requester<D.UserSettingsUpdateMutation, D.UserSettingsUpdateMutationVariables>(
        D.UserSettingsUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.userSettingsUpdate,
      };
    },
    /**
     * Call the Linear api with the userSettingsFlagIncrement
     *
     * @param flag - flag to pass into the UserSettingsFlagIncrementMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserSettingsFlagIncrementMutation
     */
    async userSettingsFlagIncrement(
      flag: string,
      opts?: O
    ): Promise<ResultOf<typeof D.UserSettingsFlagIncrementDocument>["userSettingsFlagIncrement"]> {
      const response = await requester<
        D.UserSettingsFlagIncrementMutation,
        D.UserSettingsFlagIncrementMutationVariables
      >(D.UserSettingsFlagIncrementDocument, { flag }, opts);
      return {
        ...response?.userSettingsFlagIncrement,
      };
    },
    /**
     * Call the Linear api with the userSettingsFlagsReset
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserSettingsFlagsResetMutation
     */
    async userSettingsFlagsReset(
      opts?: O
    ): Promise<ResultOf<typeof D.UserSettingsFlagsResetDocument>["userSettingsFlagsReset"]> {
      const response = await requester<D.UserSettingsFlagsResetMutation, D.UserSettingsFlagsResetMutationVariables>(
        D.UserSettingsFlagsResetDocument,
        {},
        opts
      );
      return {
        ...response?.userSettingsFlagsReset,
      };
    },
    /**
     * Call the Linear api with the userFlagUpdate
     *
     * @param operation - operation to pass into the UserFlagUpdateMutation
     * @param flag - flag to pass into the UserFlagUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserFlagUpdateMutation
     */
    async userFlagUpdate(
      operation: D.UserFlagUpdateOperation,
      flag: D.UserFlagType,
      opts?: O
    ): Promise<ResultOf<typeof D.UserFlagUpdateDocument>["userFlagUpdate"]> {
      const response = await requester<D.UserFlagUpdateMutation, D.UserFlagUpdateMutationVariables>(
        D.UserFlagUpdateDocument,
        { operation, flag },
        opts
      );
      return {
        ...response?.userFlagUpdate,
      };
    },
    /**
     * Call the Linear api with the userSubscribeToNewsletter
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserSubscribeToNewsletterMutation
     */
    async userSubscribeToNewsletter(
      opts?: O
    ): Promise<ResultOf<typeof D.UserSubscribeToNewsletterDocument>["userSubscribeToNewsletter"]> {
      const response = await requester<
        D.UserSubscribeToNewsletterMutation,
        D.UserSubscribeToNewsletterMutationVariables
      >(D.UserSubscribeToNewsletterDocument, {}, opts);
      return {
        ...response?.userSubscribeToNewsletter,
      };
    },
    /**
     * Call the Linear api with the viewPreferencesCreate
     *
     * @param input - input to pass into the ViewPreferencesCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ViewPreferencesCreateMutation
     */
    async viewPreferencesCreate(
      input: D.ViewPreferencesCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.ViewPreferencesCreateDocument>["viewPreferencesCreate"]> {
      const response = await requester<D.ViewPreferencesCreateMutation, D.ViewPreferencesCreateMutationVariables>(
        D.ViewPreferencesCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.viewPreferencesCreate,
      };
    },
    /**
     * Call the Linear api with the viewPreferencesUpdate
     *
     * @param input - input to pass into the ViewPreferencesUpdateMutation
     * @param id - id to pass into the ViewPreferencesUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ViewPreferencesUpdateMutation
     */
    async viewPreferencesUpdate(
      input: D.ViewPreferencesUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.ViewPreferencesUpdateDocument>["viewPreferencesUpdate"]> {
      const response = await requester<D.ViewPreferencesUpdateMutation, D.ViewPreferencesUpdateMutationVariables>(
        D.ViewPreferencesUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.viewPreferencesUpdate,
      };
    },
    /**
     * Call the Linear api with the viewPreferencesDelete
     *
     * @param id - id to pass into the ViewPreferencesDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ViewPreferencesDeleteMutation
     */
    async viewPreferencesDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.ViewPreferencesDeleteDocument>["viewPreferencesDelete"]> {
      const response = await requester<D.ViewPreferencesDeleteMutation, D.ViewPreferencesDeleteMutationVariables>(
        D.ViewPreferencesDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.viewPreferencesDelete,
      };
    },
    /**
     * Call the Linear api with the webhookCreate
     *
     * @param input - input to pass into the WebhookCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the WebhookCreateMutation
     */
    async webhookCreate(
      input: D.WebhookCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.WebhookCreateDocument>["webhookCreate"]> {
      const response = await requester<D.WebhookCreateMutation, D.WebhookCreateMutationVariables>(
        D.WebhookCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.webhookCreate,
      };
    },
    /**
     * Call the Linear api with the webhookUpdate
     *
     * @param input - input to pass into the WebhookUpdateMutation
     * @param id - id to pass into the WebhookUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the WebhookUpdateMutation
     */
    async webhookUpdate(
      input: D.WebhookUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.WebhookUpdateDocument>["webhookUpdate"]> {
      const response = await requester<D.WebhookUpdateMutation, D.WebhookUpdateMutationVariables>(
        D.WebhookUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.webhookUpdate,
      };
    },
    /**
     * Call the Linear api with the webhookDelete
     *
     * @param id - id to pass into the WebhookDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the WebhookDeleteMutation
     */
    async webhookDelete(id: string, opts?: O): Promise<ResultOf<typeof D.WebhookDeleteDocument>["webhookDelete"]> {
      const response = await requester<D.WebhookDeleteMutation, D.WebhookDeleteMutationVariables>(
        D.WebhookDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.webhookDelete,
      };
    },
    /**
     * Call the Linear api with the workflowStateCreate
     *
     * @param input - input to pass into the WorkflowStateCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the WorkflowStateCreateMutation
     */
    async workflowStateCreate(
      input: D.WorkflowStateCreateInput,
      opts?: O
    ): Promise<ResultOf<typeof D.WorkflowStateCreateDocument>["workflowStateCreate"]> {
      const response = await requester<D.WorkflowStateCreateMutation, D.WorkflowStateCreateMutationVariables>(
        D.WorkflowStateCreateDocument,
        { input },
        opts
      );
      return {
        ...response?.workflowStateCreate,
      };
    },
    /**
     * Call the Linear api with the workflowStateUpdate
     *
     * @param input - input to pass into the WorkflowStateUpdateMutation
     * @param id - id to pass into the WorkflowStateUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the WorkflowStateUpdateMutation
     */
    async workflowStateUpdate(
      input: D.WorkflowStateUpdateInput,
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.WorkflowStateUpdateDocument>["workflowStateUpdate"]> {
      const response = await requester<D.WorkflowStateUpdateMutation, D.WorkflowStateUpdateMutationVariables>(
        D.WorkflowStateUpdateDocument,
        { input, id },
        opts
      );
      return {
        ...response?.workflowStateUpdate,
      };
    },
    /**
     * Call the Linear api with the workflowStateArchive
     *
     * @param id - id to pass into the WorkflowStateArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the WorkflowStateArchiveMutation
     */
    async workflowStateArchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.WorkflowStateArchiveDocument>["workflowStateArchive"]> {
      const response = await requester<D.WorkflowStateArchiveMutation, D.WorkflowStateArchiveMutationVariables>(
        D.WorkflowStateArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.workflowStateArchive,
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdk
 * Initialize a set of operations, scoped to , to run against the Linear api
 */
export type LinearSdk = ReturnType<typeof createLinearSdk>;

/**
 * Initialize a set of operations, scoped to user, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single user
 */
export function createLinearSdkUser<O>(requester: LinearRequester<O>, id: string) {
  return {
    /**
     * Call the Linear api with the assignedIssues
     *
     * @param vars - variables without 'id' to pass into the User_AssignedIssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the User_AssignedIssuesQuery
     */
    async assignedIssues(
      vars?: Omit<D.User_AssignedIssuesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.User_AssignedIssuesDocument>["user"]["assignedIssues"]> {
      const response = await requester<D.User_AssignedIssuesQuery, D.User_AssignedIssuesQueryVariables>(
        D.User_AssignedIssuesDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.user?.assignedIssues,
      };
    },
    /**
     * Call the Linear api with the createdIssues
     *
     * @param vars - variables without 'id' to pass into the User_CreatedIssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the User_CreatedIssuesQuery
     */
    async createdIssues(
      vars?: Omit<D.User_CreatedIssuesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.User_CreatedIssuesDocument>["user"]["createdIssues"]> {
      const response = await requester<D.User_CreatedIssuesQuery, D.User_CreatedIssuesQueryVariables>(
        D.User_CreatedIssuesDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.user?.createdIssues,
      };
    },
    /**
     * Call the Linear api with the teamMemberships
     *
     * @param vars - variables without 'id' to pass into the User_TeamMembershipsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the User_TeamMembershipsQuery
     */
    async teamMemberships(
      vars?: Omit<D.User_TeamMembershipsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.User_TeamMembershipsDocument>["user"]["teamMemberships"]> {
      const response = await requester<D.User_TeamMembershipsQuery, D.User_TeamMembershipsQueryVariables>(
        D.User_TeamMembershipsDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.user?.teamMemberships,
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
export function createLinearSdkViewer<O>(requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the assignedIssues
     *
     * @param vars - variables to pass into the Viewer_AssignedIssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Viewer_AssignedIssuesQuery
     */
    async assignedIssues(
      vars?: D.Viewer_AssignedIssuesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Viewer_AssignedIssuesDocument>["viewer"]["assignedIssues"]> {
      const response = await requester<D.Viewer_AssignedIssuesQuery, D.Viewer_AssignedIssuesQueryVariables>(
        D.Viewer_AssignedIssuesDocument,
        vars,
        opts
      );
      return {
        ...response?.viewer?.assignedIssues,
      };
    },
    /**
     * Call the Linear api with the createdIssues
     *
     * @param vars - variables to pass into the Viewer_CreatedIssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Viewer_CreatedIssuesQuery
     */
    async createdIssues(
      vars?: D.Viewer_CreatedIssuesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Viewer_CreatedIssuesDocument>["viewer"]["createdIssues"]> {
      const response = await requester<D.Viewer_CreatedIssuesQuery, D.Viewer_CreatedIssuesQueryVariables>(
        D.Viewer_CreatedIssuesDocument,
        vars,
        opts
      );
      return {
        ...response?.viewer?.createdIssues,
      };
    },
    /**
     * Call the Linear api with the teamMemberships
     *
     * @param vars - variables to pass into the Viewer_TeamMembershipsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Viewer_TeamMembershipsQuery
     */
    async teamMemberships(
      vars?: D.Viewer_TeamMembershipsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Viewer_TeamMembershipsDocument>["viewer"]["teamMemberships"]> {
      const response = await requester<D.Viewer_TeamMembershipsQuery, D.Viewer_TeamMembershipsQueryVariables>(
        D.Viewer_TeamMembershipsDocument,
        vars,
        opts
      );
      return {
        ...response?.viewer?.teamMemberships,
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
export function createLinearSdkOrganization<O>(requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the users
     *
     * @param vars - variables to pass into the Organization_UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Organization_UsersQuery
     */
    async users(
      vars?: D.Organization_UsersQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Organization_UsersDocument>["organization"]["users"]> {
      const response = await requester<D.Organization_UsersQuery, D.Organization_UsersQueryVariables>(
        D.Organization_UsersDocument,
        vars,
        opts
      );
      return {
        ...response?.organization?.users,
      };
    },
    /**
     * Call the Linear api with the teams
     *
     * @param vars - variables to pass into the Organization_TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Organization_TeamsQuery
     */
    async teams(
      vars?: D.Organization_TeamsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Organization_TeamsDocument>["organization"]["teams"]> {
      const response = await requester<D.Organization_TeamsQuery, D.Organization_TeamsQueryVariables>(
        D.Organization_TeamsDocument,
        vars,
        opts
      );
      return {
        ...response?.organization?.teams,
      };
    },
    /**
     * Call the Linear api with the milestones
     *
     * @param vars - variables to pass into the Organization_MilestonesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Organization_MilestonesQuery
     */
    async milestones(
      vars?: D.Organization_MilestonesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Organization_MilestonesDocument>["organization"]["milestones"]> {
      const response = await requester<D.Organization_MilestonesQuery, D.Organization_MilestonesQueryVariables>(
        D.Organization_MilestonesDocument,
        vars,
        opts
      );
      return {
        ...response?.organization?.milestones,
      };
    },
    /**
     * Call the Linear api with the integrations
     *
     * @param vars - variables to pass into the Organization_IntegrationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Organization_IntegrationsQuery
     */
    async integrations(
      vars?: D.Organization_IntegrationsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Organization_IntegrationsDocument>["organization"]["integrations"]> {
      const response = await requester<D.Organization_IntegrationsQuery, D.Organization_IntegrationsQueryVariables>(
        D.Organization_IntegrationsDocument,
        vars,
        opts
      );
      return {
        ...response?.organization?.integrations,
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
export function createLinearSdkBillingDetails<O>(requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the invoices
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the BillingDetails_InvoicesQuery
     */
    async invoices(
      opts?: O
    ): Promise<ResultOf<typeof D.BillingDetails_InvoicesDocument>["billingDetails"]["invoices"]> {
      const response = await requester<D.BillingDetails_InvoicesQuery, D.BillingDetails_InvoicesQueryVariables>(
        D.BillingDetails_InvoicesDocument,
        {},
        opts
      );
      return {
        ...response?.billingDetails?.invoices,
      };
    },
    /**
     * Call the Linear api with the paymentMethod
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the BillingDetails_PaymentMethodQuery
     */
    async paymentMethod(
      opts?: O
    ): Promise<ResultOf<typeof D.BillingDetails_PaymentMethodDocument>["billingDetails"]["paymentMethod"]> {
      const response = await requester<
        D.BillingDetails_PaymentMethodQuery,
        D.BillingDetails_PaymentMethodQueryVariables
      >(D.BillingDetails_PaymentMethodDocument, {}, opts);
      return {
        ...response?.billingDetails?.paymentMethod,
      };
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
export function createLinearSdkCollaborativeDocumentJoin<O>(
  requester: LinearRequester<O>,
  clientId: string,
  issueId: string,
  version: number
) {
  return {
    /**
     * Call the Linear api with the steps
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the CollaborativeDocumentJoin_StepsQuery
     */
    async steps(
      opts?: O
    ): Promise<ResultOf<typeof D.CollaborativeDocumentJoin_StepsDocument>["collaborativeDocumentJoin"]["steps"]> {
      const response = await requester<
        D.CollaborativeDocumentJoin_StepsQuery,
        D.CollaborativeDocumentJoin_StepsQueryVariables
      >(D.CollaborativeDocumentJoin_StepsDocument, { clientId, issueId, version }, opts);
      return {
        ...response?.collaborativeDocumentJoin?.steps,
      };
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
export function createLinearSdkCycle<O>(requester: LinearRequester<O>, id: string) {
  return {
    /**
     * Call the Linear api with the issues
     *
     * @param vars - variables without 'id' to pass into the Cycle_IssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Cycle_IssuesQuery
     */
    async issues(
      vars?: Omit<D.Cycle_IssuesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Cycle_IssuesDocument>["cycle"]["issues"]> {
      const response = await requester<D.Cycle_IssuesQuery, D.Cycle_IssuesQueryVariables>(
        D.Cycle_IssuesDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.cycle?.issues,
      };
    },
    /**
     * Call the Linear api with the uncompletedIssuesUponClose
     *
     * @param vars - variables without 'id' to pass into the Cycle_UncompletedIssuesUponCloseQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Cycle_UncompletedIssuesUponCloseQuery
     */
    async uncompletedIssuesUponClose(
      vars?: Omit<D.Cycle_UncompletedIssuesUponCloseQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Cycle_UncompletedIssuesUponCloseDocument>["cycle"]["uncompletedIssuesUponClose"]> {
      const response = await requester<
        D.Cycle_UncompletedIssuesUponCloseQuery,
        D.Cycle_UncompletedIssuesUponCloseQueryVariables
      >(D.Cycle_UncompletedIssuesUponCloseDocument, { id, ...vars }, opts);
      return {
        ...response?.cycle?.uncompletedIssuesUponClose,
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
export function createLinearSdkFigmaEmbedInfo<O>(requester: LinearRequester<O>, fileId: string) {
  return {
    /**
     * Call the Linear api with the figmaEmbed
     *
     * @param vars - variables without 'fileId' to pass into the FigmaEmbedInfo_FigmaEmbedQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the FigmaEmbedInfo_FigmaEmbedQuery
     */
    async figmaEmbed(
      vars?: Omit<D.FigmaEmbedInfo_FigmaEmbedQueryVariables, "fileId">,
      opts?: O
    ): Promise<ResultOf<typeof D.FigmaEmbedInfo_FigmaEmbedDocument>["figmaEmbedInfo"]["figmaEmbed"]> {
      const response = await requester<D.FigmaEmbedInfo_FigmaEmbedQuery, D.FigmaEmbedInfo_FigmaEmbedQueryVariables>(
        D.FigmaEmbedInfo_FigmaEmbedDocument,
        { fileId, ...vars },
        opts
      );
      return {
        ...response?.figmaEmbedInfo?.figmaEmbed,
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkFigmaEmbedInfo
 * Initialize a set of operations, scoped to figmaEmbedInfo, to run against the Linear api
 */
export type LinearSdkFigmaEmbedInfo = ReturnType<typeof createLinearSdkFigmaEmbedInfo>;

/**
 * Initialize a set of operations, scoped to integration, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single integration
 */
export function createLinearSdkIntegration<O>(requester: LinearRequester<O>, id: string) {
  return {
    /**
     * Call the Linear api with the settings
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_SettingsQuery
     */
    async settings(
      opts?: O
    ): Promise<
      ResultOf<typeof D.Integration_SettingsDocument>["integration"]["settings"] & LinearSdkIntegrationSettings
    > {
      const response = await requester<D.Integration_SettingsQuery, D.Integration_SettingsQueryVariables>(
        D.Integration_SettingsDocument,
        { id },
        opts
      );
      return {
        ...response?.integration?.settings,
        ...createLinearSdkIntegrationSettings(requester, id),
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkIntegration
 * Initialize a set of operations, scoped to integration, to run against the Linear api
 */
export type LinearSdkIntegration = ReturnType<typeof createLinearSdkIntegration>;

/**
 * Initialize a set of operations, scoped to integration,settings, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single integration,settings
 */
export function createLinearSdkIntegrationSettings<O>(requester: LinearRequester<O>, id: string) {
  return {
    /**
     * Call the Linear api with the slackPost
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_Settings_SlackPostQuery
     */
    async slackPost(
      opts?: O
    ): Promise<ResultOf<typeof D.Integration_Settings_SlackPostDocument>["integration"]["settings"]["slackPost"]> {
      const response = await requester<
        D.Integration_Settings_SlackPostQuery,
        D.Integration_Settings_SlackPostQueryVariables
      >(D.Integration_Settings_SlackPostDocument, { id }, opts);
      return {
        ...response?.integration?.settings?.slackPost,
      };
    },
    /**
     * Call the Linear api with the slackProjectPost
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_Settings_SlackProjectPostQuery
     */
    async slackProjectPost(
      opts?: O
    ): Promise<
      ResultOf<typeof D.Integration_Settings_SlackProjectPostDocument>["integration"]["settings"]["slackProjectPost"]
    > {
      const response = await requester<
        D.Integration_Settings_SlackProjectPostQuery,
        D.Integration_Settings_SlackProjectPostQueryVariables
      >(D.Integration_Settings_SlackProjectPostDocument, { id }, opts);
      return {
        ...response?.integration?.settings?.slackProjectPost,
      };
    },
    /**
     * Call the Linear api with the googleSheets
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_Settings_GoogleSheetsQuery
     */
    async googleSheets(
      opts?: O
    ): Promise<
      ResultOf<typeof D.Integration_Settings_GoogleSheetsDocument>["integration"]["settings"]["googleSheets"]
    > {
      const response = await requester<
        D.Integration_Settings_GoogleSheetsQuery,
        D.Integration_Settings_GoogleSheetsQueryVariables
      >(D.Integration_Settings_GoogleSheetsDocument, { id }, opts);
      return {
        ...response?.integration?.settings?.googleSheets,
      };
    },
    /**
     * Call the Linear api with the sentry
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_Settings_SentryQuery
     */
    async sentry(
      opts?: O
    ): Promise<ResultOf<typeof D.Integration_Settings_SentryDocument>["integration"]["settings"]["sentry"]> {
      const response = await requester<D.Integration_Settings_SentryQuery, D.Integration_Settings_SentryQueryVariables>(
        D.Integration_Settings_SentryDocument,
        { id },
        opts
      );
      return {
        ...response?.integration?.settings?.sentry,
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkIntegrationSettings
 * Initialize a set of operations, scoped to integration,settings, to run against the Linear api
 */
export type LinearSdkIntegrationSettings = ReturnType<typeof createLinearSdkIntegrationSettings>;

/**
 * Initialize a set of operations, scoped to integrationResource, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single integrationResource
 */
export function createLinearSdkIntegrationResource<O>(requester: LinearRequester<O>, id: string) {
  return {
    /**
     * Call the Linear api with the data
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResource_DataQuery
     */
    async data(
      opts?: O
    ): Promise<
      ResultOf<typeof D.IntegrationResource_DataDocument>["integrationResource"]["data"] &
        LinearSdkIntegrationResourceData
    > {
      const response = await requester<D.IntegrationResource_DataQuery, D.IntegrationResource_DataQueryVariables>(
        D.IntegrationResource_DataDocument,
        { id },
        opts
      );
      return {
        ...response?.integrationResource?.data,
        ...createLinearSdkIntegrationResourceData(requester, id),
      };
    },
    /**
     * Call the Linear api with the pullRequest
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResource_PullRequestQuery
     */
    async pullRequest(
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationResource_PullRequestDocument>["integrationResource"]["pullRequest"]> {
      const response = await requester<
        D.IntegrationResource_PullRequestQuery,
        D.IntegrationResource_PullRequestQueryVariables
      >(D.IntegrationResource_PullRequestDocument, { id }, opts);
      return {
        ...response?.integrationResource?.pullRequest,
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkIntegrationResource
 * Initialize a set of operations, scoped to integrationResource, to run against the Linear api
 */
export type LinearSdkIntegrationResource = ReturnType<typeof createLinearSdkIntegrationResource>;

/**
 * Initialize a set of operations, scoped to integrationResource,data, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param id - id to scope the returned operations by
 * @returns The set of available operations scoped to a single integrationResource,data
 */
export function createLinearSdkIntegrationResourceData<O>(requester: LinearRequester<O>, id: string) {
  return {
    /**
     * Call the Linear api with the githubPullRequest
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResource_Data_GithubPullRequestQuery
     */
    async githubPullRequest(
      opts?: O
    ): Promise<
      ResultOf<
        typeof D.IntegrationResource_Data_GithubPullRequestDocument
      >["integrationResource"]["data"]["githubPullRequest"]
    > {
      const response = await requester<
        D.IntegrationResource_Data_GithubPullRequestQuery,
        D.IntegrationResource_Data_GithubPullRequestQueryVariables
      >(D.IntegrationResource_Data_GithubPullRequestDocument, { id }, opts);
      return {
        ...response?.integrationResource?.data?.githubPullRequest,
      };
    },
    /**
     * Call the Linear api with the gitlabMergeRequest
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResource_Data_GitlabMergeRequestQuery
     */
    async gitlabMergeRequest(
      opts?: O
    ): Promise<
      ResultOf<
        typeof D.IntegrationResource_Data_GitlabMergeRequestDocument
      >["integrationResource"]["data"]["gitlabMergeRequest"]
    > {
      const response = await requester<
        D.IntegrationResource_Data_GitlabMergeRequestQuery,
        D.IntegrationResource_Data_GitlabMergeRequestQueryVariables
      >(D.IntegrationResource_Data_GitlabMergeRequestDocument, { id }, opts);
      return {
        ...response?.integrationResource?.data?.gitlabMergeRequest,
      };
    },
    /**
     * Call the Linear api with the githubCommit
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResource_Data_GithubCommitQuery
     */
    async githubCommit(
      opts?: O
    ): Promise<
      ResultOf<typeof D.IntegrationResource_Data_GithubCommitDocument>["integrationResource"]["data"]["githubCommit"]
    > {
      const response = await requester<
        D.IntegrationResource_Data_GithubCommitQuery,
        D.IntegrationResource_Data_GithubCommitQueryVariables
      >(D.IntegrationResource_Data_GithubCommitDocument, { id }, opts);
      return {
        ...response?.integrationResource?.data?.githubCommit,
      };
    },
    /**
     * Call the Linear api with the sentryIssue
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResource_Data_SentryIssueQuery
     */
    async sentryIssue(
      opts?: O
    ): Promise<
      ResultOf<typeof D.IntegrationResource_Data_SentryIssueDocument>["integrationResource"]["data"]["sentryIssue"]
    > {
      const response = await requester<
        D.IntegrationResource_Data_SentryIssueQuery,
        D.IntegrationResource_Data_SentryIssueQueryVariables
      >(D.IntegrationResource_Data_SentryIssueDocument, { id }, opts);
      return {
        ...response?.integrationResource?.data?.sentryIssue,
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkIntegrationResourceData
 * Initialize a set of operations, scoped to integrationResource,data, to run against the Linear api
 */
export type LinearSdkIntegrationResourceData = ReturnType<typeof createLinearSdkIntegrationResourceData>;

/**
 * Initialize a set of operations, scoped to inviteInfo, to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @param userHash - userHash to scope the returned operations by
 * @returns The set of available operations scoped to a single inviteInfo
 */
export function createLinearSdkInviteInfo<O>(requester: LinearRequester<O>, userHash: string) {
  return {
    /**
     * Call the Linear api with the inviteData
     *
     * @param vars - variables without 'userHash' to pass into the InviteInfo_InviteDataQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the InviteInfo_InviteDataQuery
     */
    async inviteData(
      vars?: Omit<D.InviteInfo_InviteDataQueryVariables, "userHash">,
      opts?: O
    ): Promise<ResultOf<typeof D.InviteInfo_InviteDataDocument>["inviteInfo"]["inviteData"]> {
      const response = await requester<D.InviteInfo_InviteDataQuery, D.InviteInfo_InviteDataQueryVariables>(
        D.InviteInfo_InviteDataDocument,
        { userHash, ...vars },
        opts
      );
      return {
        ...response?.inviteInfo?.inviteData,
      };
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
export function createLinearSdkIssueLabel<O>(requester: LinearRequester<O>, id: string) {
  return {
    /**
     * Call the Linear api with the issues
     *
     * @param vars - variables without 'id' to pass into the IssueLabel_IssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueLabel_IssuesQuery
     */
    async issues(
      vars?: Omit<D.IssueLabel_IssuesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueLabel_IssuesDocument>["issueLabel"]["issues"]> {
      const response = await requester<D.IssueLabel_IssuesQuery, D.IssueLabel_IssuesQueryVariables>(
        D.IssueLabel_IssuesDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.issueLabel?.issues,
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
export function createLinearSdkIssue<O>(requester: LinearRequester<O>, id: string) {
  return {
    /**
     * Call the Linear api with the subscribers
     *
     * @param vars - variables without 'id' to pass into the Issue_SubscribersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Issue_SubscribersQuery
     */
    async subscribers(
      vars?: Omit<D.Issue_SubscribersQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Issue_SubscribersDocument>["issue"]["subscribers"]> {
      const response = await requester<D.Issue_SubscribersQuery, D.Issue_SubscribersQueryVariables>(
        D.Issue_SubscribersDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.issue?.subscribers,
      };
    },
    /**
     * Call the Linear api with the children
     *
     * @param vars - variables without 'id' to pass into the Issue_ChildrenQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Issue_ChildrenQuery
     */
    async children(
      vars?: Omit<D.Issue_ChildrenQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Issue_ChildrenDocument>["issue"]["children"]> {
      const response = await requester<D.Issue_ChildrenQuery, D.Issue_ChildrenQueryVariables>(
        D.Issue_ChildrenDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.issue?.children,
      };
    },
    /**
     * Call the Linear api with the comments
     *
     * @param vars - variables without 'id' to pass into the Issue_CommentsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Issue_CommentsQuery
     */
    async comments(
      vars?: Omit<D.Issue_CommentsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Issue_CommentsDocument>["issue"]["comments"]> {
      const response = await requester<D.Issue_CommentsQuery, D.Issue_CommentsQueryVariables>(
        D.Issue_CommentsDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.issue?.comments,
      };
    },
    /**
     * Call the Linear api with the history
     *
     * @param vars - variables without 'id' to pass into the Issue_HistoryQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Issue_HistoryQuery
     */
    async history(
      vars?: Omit<D.Issue_HistoryQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Issue_HistoryDocument>["issue"]["history"]> {
      const response = await requester<D.Issue_HistoryQuery, D.Issue_HistoryQueryVariables>(
        D.Issue_HistoryDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.issue?.history,
      };
    },
    /**
     * Call the Linear api with the labels
     *
     * @param vars - variables without 'id' to pass into the Issue_LabelsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Issue_LabelsQuery
     */
    async labels(
      vars?: Omit<D.Issue_LabelsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Issue_LabelsDocument>["issue"]["labels"]> {
      const response = await requester<D.Issue_LabelsQuery, D.Issue_LabelsQueryVariables>(
        D.Issue_LabelsDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.issue?.labels,
      };
    },
    /**
     * Call the Linear api with the integrationResources
     *
     * @param vars - variables without 'id' to pass into the Issue_IntegrationResourcesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Issue_IntegrationResourcesQuery
     */
    async integrationResources(
      vars?: Omit<D.Issue_IntegrationResourcesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Issue_IntegrationResourcesDocument>["issue"]["integrationResources"]> {
      const response = await requester<D.Issue_IntegrationResourcesQuery, D.Issue_IntegrationResourcesQueryVariables>(
        D.Issue_IntegrationResourcesDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.issue?.integrationResources,
      };
    },
    /**
     * Call the Linear api with the relations
     *
     * @param vars - variables without 'id' to pass into the Issue_RelationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Issue_RelationsQuery
     */
    async relations(
      vars?: Omit<D.Issue_RelationsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Issue_RelationsDocument>["issue"]["relations"]> {
      const response = await requester<D.Issue_RelationsQuery, D.Issue_RelationsQueryVariables>(
        D.Issue_RelationsDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.issue?.relations,
      };
    },
    /**
     * Call the Linear api with the inverseRelations
     *
     * @param vars - variables without 'id' to pass into the Issue_InverseRelationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Issue_InverseRelationsQuery
     */
    async inverseRelations(
      vars?: Omit<D.Issue_InverseRelationsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Issue_InverseRelationsDocument>["issue"]["inverseRelations"]> {
      const response = await requester<D.Issue_InverseRelationsQuery, D.Issue_InverseRelationsQueryVariables>(
        D.Issue_InverseRelationsDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.issue?.inverseRelations,
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
export function createLinearSdkMilestone<O>(requester: LinearRequester<O>, id: string) {
  return {
    /**
     * Call the Linear api with the projects
     *
     * @param vars - variables without 'id' to pass into the Milestone_ProjectsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Milestone_ProjectsQuery
     */
    async projects(
      vars?: Omit<D.Milestone_ProjectsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Milestone_ProjectsDocument>["milestone"]["projects"]> {
      const response = await requester<D.Milestone_ProjectsQuery, D.Milestone_ProjectsQueryVariables>(
        D.Milestone_ProjectsDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.milestone?.projects,
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
export function createLinearSdkOrganizationInvite<O>(requester: LinearRequester<O>, id: string) {
  return {
    /**
     * Call the Linear api with the issues
     *
     * @param vars - variables without 'id' to pass into the OrganizationInvite_IssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationInvite_IssuesQuery
     */
    async issues(
      vars?: Omit<D.OrganizationInvite_IssuesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationInvite_IssuesDocument>["organizationInvite"]["issues"]> {
      const response = await requester<D.OrganizationInvite_IssuesQuery, D.OrganizationInvite_IssuesQueryVariables>(
        D.OrganizationInvite_IssuesDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.organizationInvite?.issues,
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
export function createLinearSdkProject<O>(requester: LinearRequester<O>, id: string) {
  return {
    /**
     * Call the Linear api with the teams
     *
     * @param vars - variables without 'id' to pass into the Project_TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Project_TeamsQuery
     */
    async teams(
      vars?: Omit<D.Project_TeamsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Project_TeamsDocument>["project"]["teams"]> {
      const response = await requester<D.Project_TeamsQuery, D.Project_TeamsQueryVariables>(
        D.Project_TeamsDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.project?.teams,
      };
    },
    /**
     * Call the Linear api with the members
     *
     * @param vars - variables without 'id' to pass into the Project_MembersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Project_MembersQuery
     */
    async members(
      vars?: Omit<D.Project_MembersQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Project_MembersDocument>["project"]["members"]> {
      const response = await requester<D.Project_MembersQuery, D.Project_MembersQueryVariables>(
        D.Project_MembersDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.project?.members,
      };
    },
    /**
     * Call the Linear api with the issues
     *
     * @param vars - variables without 'id' to pass into the Project_IssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Project_IssuesQuery
     */
    async issues(
      vars?: Omit<D.Project_IssuesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Project_IssuesDocument>["project"]["issues"]> {
      const response = await requester<D.Project_IssuesQuery, D.Project_IssuesQueryVariables>(
        D.Project_IssuesDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.project?.issues,
      };
    },
    /**
     * Call the Linear api with the links
     *
     * @param vars - variables without 'id' to pass into the Project_LinksQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Project_LinksQuery
     */
    async links(
      vars?: Omit<D.Project_LinksQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Project_LinksDocument>["project"]["links"]> {
      const response = await requester<D.Project_LinksQuery, D.Project_LinksQueryVariables>(
        D.Project_LinksDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.project?.links,
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
export function createLinearSdkTeam<O>(requester: LinearRequester<O>, id: string) {
  return {
    /**
     * Call the Linear api with the issues
     *
     * @param vars - variables without 'id' to pass into the Team_IssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Team_IssuesQuery
     */
    async issues(
      vars?: Omit<D.Team_IssuesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Team_IssuesDocument>["team"]["issues"]> {
      const response = await requester<D.Team_IssuesQuery, D.Team_IssuesQueryVariables>(
        D.Team_IssuesDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.team?.issues,
      };
    },
    /**
     * Call the Linear api with the cycles
     *
     * @param vars - variables without 'id' to pass into the Team_CyclesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Team_CyclesQuery
     */
    async cycles(
      vars?: Omit<D.Team_CyclesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Team_CyclesDocument>["team"]["cycles"]> {
      const response = await requester<D.Team_CyclesQuery, D.Team_CyclesQueryVariables>(
        D.Team_CyclesDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.team?.cycles,
      };
    },
    /**
     * Call the Linear api with the memberships
     *
     * @param vars - variables without 'id' to pass into the Team_MembershipsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Team_MembershipsQuery
     */
    async memberships(
      vars?: Omit<D.Team_MembershipsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Team_MembershipsDocument>["team"]["memberships"]> {
      const response = await requester<D.Team_MembershipsQuery, D.Team_MembershipsQueryVariables>(
        D.Team_MembershipsDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.team?.memberships,
      };
    },
    /**
     * Call the Linear api with the projects
     *
     * @param vars - variables without 'id' to pass into the Team_ProjectsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Team_ProjectsQuery
     */
    async projects(
      vars?: Omit<D.Team_ProjectsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Team_ProjectsDocument>["team"]["projects"]> {
      const response = await requester<D.Team_ProjectsQuery, D.Team_ProjectsQueryVariables>(
        D.Team_ProjectsDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.team?.projects,
      };
    },
    /**
     * Call the Linear api with the states
     *
     * @param vars - variables without 'id' to pass into the Team_StatesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Team_StatesQuery
     */
    async states(
      vars?: Omit<D.Team_StatesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Team_StatesDocument>["team"]["states"]> {
      const response = await requester<D.Team_StatesQuery, D.Team_StatesQueryVariables>(
        D.Team_StatesDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.team?.states,
      };
    },
    /**
     * Call the Linear api with the templates
     *
     * @param vars - variables without 'id' to pass into the Team_TemplatesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Team_TemplatesQuery
     */
    async templates(
      vars?: Omit<D.Team_TemplatesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Team_TemplatesDocument>["team"]["templates"]> {
      const response = await requester<D.Team_TemplatesQuery, D.Team_TemplatesQueryVariables>(
        D.Team_TemplatesDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.team?.templates,
      };
    },
    /**
     * Call the Linear api with the labels
     *
     * @param vars - variables without 'id' to pass into the Team_LabelsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Team_LabelsQuery
     */
    async labels(
      vars?: Omit<D.Team_LabelsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Team_LabelsDocument>["team"]["labels"]> {
      const response = await requester<D.Team_LabelsQuery, D.Team_LabelsQueryVariables>(
        D.Team_LabelsDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.team?.labels,
      };
    },
    /**
     * Call the Linear api with the webhooks
     *
     * @param vars - variables without 'id' to pass into the Team_WebhooksQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Team_WebhooksQuery
     */
    async webhooks(
      vars?: Omit<D.Team_WebhooksQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Team_WebhooksDocument>["team"]["webhooks"]> {
      const response = await requester<D.Team_WebhooksQuery, D.Team_WebhooksQueryVariables>(
        D.Team_WebhooksDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.team?.webhooks,
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
export function createLinearSdkWorkflowState<O>(requester: LinearRequester<O>, id: string) {
  return {
    /**
     * Call the Linear api with the issues
     *
     * @param vars - variables without 'id' to pass into the WorkflowState_IssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the WorkflowState_IssuesQuery
     */
    async issues(
      vars?: Omit<D.WorkflowState_IssuesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.WorkflowState_IssuesDocument>["workflowState"]["issues"]> {
      const response = await requester<D.WorkflowState_IssuesQuery, D.WorkflowState_IssuesQueryVariables>(
        D.WorkflowState_IssuesDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.workflowState?.issues,
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkWorkflowState
 * Initialize a set of operations, scoped to workflowState, to run against the Linear api
 */
export type LinearSdkWorkflowState = ReturnType<typeof createLinearSdkWorkflowState>;
