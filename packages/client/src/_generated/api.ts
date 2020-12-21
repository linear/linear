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
 * Initialise a set of operations, scoped to user, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single user
 */
export function createLinearSdkUser<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the User_SettingsQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the User_SettingsQuery
     */
    async settings(opts?: O): Promise<ResultOf<typeof D.User_SettingsDocument>["user"]["settings"]> {
      const response = await requester<D.User_SettingsQuery, D.User_SettingsQueryVariables>(
        D.User_SettingsDocument,
        { id },
        opts
      );
      return {
        ...response?.user?.settings,
      };
    },
    /**
     * Call the Linear api with the User_AssignedIssuesQuery
     *
     * @param vars - variables without user id to pass into the User_AssignedIssuesQuery
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
     * Call the Linear api with the User_CreatedIssuesQuery
     *
     * @param vars - variables without user id to pass into the User_CreatedIssuesQuery
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
     * Call the Linear api with the User_OrganizationQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the User_OrganizationQuery
     */
    async organization(opts?: O): Promise<ResultOf<typeof D.User_OrganizationDocument>["user"]["organization"]> {
      const response = await requester<D.User_OrganizationQuery, D.User_OrganizationQueryVariables>(
        D.User_OrganizationDocument,
        { id },
        opts
      );
      return {
        ...response?.user?.organization,
      };
    },
    /**
     * Call the Linear api with the User_Organization_UsersQuery
     *
     * @param vars - variables without user id to pass into the User_Organization_UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the User_Organization_UsersQuery
     */
    async users(
      vars?: Omit<D.User_Organization_UsersQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.User_Organization_UsersDocument>["user"]> {
      const response = await requester<D.User_Organization_UsersQuery, D.User_Organization_UsersQueryVariables>(
        D.User_Organization_UsersDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.user,
      };
    },
    /**
     * Call the Linear api with the User_Organization_TeamsQuery
     *
     * @param vars - variables without user id to pass into the User_Organization_TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the User_Organization_TeamsQuery
     */
    async teams(
      vars?: Omit<D.User_Organization_TeamsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.User_Organization_TeamsDocument>["user"]> {
      const response = await requester<D.User_Organization_TeamsQuery, D.User_Organization_TeamsQueryVariables>(
        D.User_Organization_TeamsDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.user,
      };
    },
    /**
     * Call the Linear api with the User_Organization_MilestonesQuery
     *
     * @param vars - variables without user id to pass into the User_Organization_MilestonesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the User_Organization_MilestonesQuery
     */
    async milestones(
      vars?: Omit<D.User_Organization_MilestonesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.User_Organization_MilestonesDocument>["user"]> {
      const response = await requester<
        D.User_Organization_MilestonesQuery,
        D.User_Organization_MilestonesQueryVariables
      >(D.User_Organization_MilestonesDocument, { id, ...vars }, opts);
      return {
        ...response?.user,
      };
    },
    /**
     * Call the Linear api with the User_Organization_IntegrationsQuery
     *
     * @param vars - variables without user id to pass into the User_Organization_IntegrationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the User_Organization_IntegrationsQuery
     */
    async integrations(
      vars?: Omit<D.User_Organization_IntegrationsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.User_Organization_IntegrationsDocument>["user"]> {
      const response = await requester<
        D.User_Organization_IntegrationsQuery,
        D.User_Organization_IntegrationsQueryVariables
      >(D.User_Organization_IntegrationsDocument, { id, ...vars }, opts);
      return {
        ...response?.user,
      };
    },
    /**
     * Call the Linear api with the User_Organization_SubscriptionQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the User_Organization_SubscriptionQuery
     */
    async subscription(opts?: O): Promise<ResultOf<typeof D.User_Organization_SubscriptionDocument>["user"]> {
      const response = await requester<
        D.User_Organization_SubscriptionQuery,
        D.User_Organization_SubscriptionQueryVariables
      >(D.User_Organization_SubscriptionDocument, { id }, opts);
      return {
        ...response?.user,
      };
    },
    /**
     * Call the Linear api with the User_TeamMembershipsQuery
     *
     * @param vars - variables without user id to pass into the User_TeamMembershipsQuery
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
 * Initialise a set of operations, scoped to user, to run against the Linear api
 */
export type LinearSdkUser = ReturnType<typeof createLinearSdkUser>;

/**
 * Initialise a set of operations, scoped to comment, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single comment
 */
export function createLinearSdkComment<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkComment
 * Initialise a set of operations, scoped to comment, to run against the Linear api
 */
export type LinearSdkComment = ReturnType<typeof createLinearSdkComment>;

/**
 * Initialise a set of operations, scoped to customView, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single customView
 */
export function createLinearSdkCustomView<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the CustomView_OrganizationQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomView_OrganizationQuery
     */
    async organization(
      opts?: O
    ): Promise<ResultOf<typeof D.CustomView_OrganizationDocument>["customView"]["organization"]> {
      const response = await requester<D.CustomView_OrganizationQuery, D.CustomView_OrganizationQueryVariables>(
        D.CustomView_OrganizationDocument,
        { id },
        opts
      );
      return {
        ...response?.customView?.organization,
      };
    },
    /**
     * Call the Linear api with the CustomView_Organization_UsersQuery
     *
     * @param vars - variables without customView id to pass into the CustomView_Organization_UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomView_Organization_UsersQuery
     */
    async users(
      vars?: Omit<D.CustomView_Organization_UsersQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.CustomView_Organization_UsersDocument>["customView"]> {
      const response = await requester<
        D.CustomView_Organization_UsersQuery,
        D.CustomView_Organization_UsersQueryVariables
      >(D.CustomView_Organization_UsersDocument, { id, ...vars }, opts);
      return {
        ...response?.customView,
      };
    },
    /**
     * Call the Linear api with the CustomView_Organization_TeamsQuery
     *
     * @param vars - variables without customView id to pass into the CustomView_Organization_TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomView_Organization_TeamsQuery
     */
    async teams(
      vars?: Omit<D.CustomView_Organization_TeamsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.CustomView_Organization_TeamsDocument>["customView"]> {
      const response = await requester<
        D.CustomView_Organization_TeamsQuery,
        D.CustomView_Organization_TeamsQueryVariables
      >(D.CustomView_Organization_TeamsDocument, { id, ...vars }, opts);
      return {
        ...response?.customView,
      };
    },
    /**
     * Call the Linear api with the CustomView_Organization_MilestonesQuery
     *
     * @param vars - variables without customView id to pass into the CustomView_Organization_MilestonesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomView_Organization_MilestonesQuery
     */
    async milestones(
      vars?: Omit<D.CustomView_Organization_MilestonesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.CustomView_Organization_MilestonesDocument>["customView"]> {
      const response = await requester<
        D.CustomView_Organization_MilestonesQuery,
        D.CustomView_Organization_MilestonesQueryVariables
      >(D.CustomView_Organization_MilestonesDocument, { id, ...vars }, opts);
      return {
        ...response?.customView,
      };
    },
    /**
     * Call the Linear api with the CustomView_Organization_IntegrationsQuery
     *
     * @param vars - variables without customView id to pass into the CustomView_Organization_IntegrationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomView_Organization_IntegrationsQuery
     */
    async integrations(
      vars?: Omit<D.CustomView_Organization_IntegrationsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.CustomView_Organization_IntegrationsDocument>["customView"]> {
      const response = await requester<
        D.CustomView_Organization_IntegrationsQuery,
        D.CustomView_Organization_IntegrationsQueryVariables
      >(D.CustomView_Organization_IntegrationsDocument, { id, ...vars }, opts);
      return {
        ...response?.customView,
      };
    },
    /**
     * Call the Linear api with the CustomView_Organization_SubscriptionQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomView_Organization_SubscriptionQuery
     */
    async subscription(
      opts?: O
    ): Promise<ResultOf<typeof D.CustomView_Organization_SubscriptionDocument>["customView"]> {
      const response = await requester<
        D.CustomView_Organization_SubscriptionQuery,
        D.CustomView_Organization_SubscriptionQueryVariables
      >(D.CustomView_Organization_SubscriptionDocument, { id }, opts);
      return {
        ...response?.customView,
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkCustomView
 * Initialise a set of operations, scoped to customView, to run against the Linear api
 */
export type LinearSdkCustomView = ReturnType<typeof createLinearSdkCustomView>;

/**
 * Initialise a set of operations, scoped to cycle, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single cycle
 */
export function createLinearSdkCycle<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the Cycle_IssuesQuery
     *
     * @param vars - variables without cycle id to pass into the Cycle_IssuesQuery
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
     * Call the Linear api with the Cycle_UncompletedIssuesUponCloseQuery
     *
     * @param vars - variables without cycle id to pass into the Cycle_UncompletedIssuesUponCloseQuery
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
 * Initialise a set of operations, scoped to cycle, to run against the Linear api
 */
export type LinearSdkCycle = ReturnType<typeof createLinearSdkCycle>;

/**
 * Initialise a set of operations, scoped to emoji, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single emoji
 */
export function createLinearSdkEmoji<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the Emoji_OrganizationQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Emoji_OrganizationQuery
     */
    async organization(opts?: O): Promise<ResultOf<typeof D.Emoji_OrganizationDocument>["emoji"]["organization"]> {
      const response = await requester<D.Emoji_OrganizationQuery, D.Emoji_OrganizationQueryVariables>(
        D.Emoji_OrganizationDocument,
        { id },
        opts
      );
      return {
        ...response?.emoji?.organization,
      };
    },
    /**
     * Call the Linear api with the Emoji_Organization_UsersQuery
     *
     * @param vars - variables without emoji id to pass into the Emoji_Organization_UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Emoji_Organization_UsersQuery
     */
    async users(
      vars?: Omit<D.Emoji_Organization_UsersQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Emoji_Organization_UsersDocument>["emoji"]> {
      const response = await requester<D.Emoji_Organization_UsersQuery, D.Emoji_Organization_UsersQueryVariables>(
        D.Emoji_Organization_UsersDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.emoji,
      };
    },
    /**
     * Call the Linear api with the Emoji_Organization_TeamsQuery
     *
     * @param vars - variables without emoji id to pass into the Emoji_Organization_TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Emoji_Organization_TeamsQuery
     */
    async teams(
      vars?: Omit<D.Emoji_Organization_TeamsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Emoji_Organization_TeamsDocument>["emoji"]> {
      const response = await requester<D.Emoji_Organization_TeamsQuery, D.Emoji_Organization_TeamsQueryVariables>(
        D.Emoji_Organization_TeamsDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.emoji,
      };
    },
    /**
     * Call the Linear api with the Emoji_Organization_MilestonesQuery
     *
     * @param vars - variables without emoji id to pass into the Emoji_Organization_MilestonesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Emoji_Organization_MilestonesQuery
     */
    async milestones(
      vars?: Omit<D.Emoji_Organization_MilestonesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Emoji_Organization_MilestonesDocument>["emoji"]> {
      const response = await requester<
        D.Emoji_Organization_MilestonesQuery,
        D.Emoji_Organization_MilestonesQueryVariables
      >(D.Emoji_Organization_MilestonesDocument, { id, ...vars }, opts);
      return {
        ...response?.emoji,
      };
    },
    /**
     * Call the Linear api with the Emoji_Organization_IntegrationsQuery
     *
     * @param vars - variables without emoji id to pass into the Emoji_Organization_IntegrationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Emoji_Organization_IntegrationsQuery
     */
    async integrations(
      vars?: Omit<D.Emoji_Organization_IntegrationsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Emoji_Organization_IntegrationsDocument>["emoji"]> {
      const response = await requester<
        D.Emoji_Organization_IntegrationsQuery,
        D.Emoji_Organization_IntegrationsQueryVariables
      >(D.Emoji_Organization_IntegrationsDocument, { id, ...vars }, opts);
      return {
        ...response?.emoji,
      };
    },
    /**
     * Call the Linear api with the Emoji_Organization_SubscriptionQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Emoji_Organization_SubscriptionQuery
     */
    async subscription(opts?: O): Promise<ResultOf<typeof D.Emoji_Organization_SubscriptionDocument>["emoji"]> {
      const response = await requester<
        D.Emoji_Organization_SubscriptionQuery,
        D.Emoji_Organization_SubscriptionQueryVariables
      >(D.Emoji_Organization_SubscriptionDocument, { id }, opts);
      return {
        ...response?.emoji,
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkEmoji
 * Initialise a set of operations, scoped to emoji, to run against the Linear api
 */
export type LinearSdkEmoji = ReturnType<typeof createLinearSdkEmoji>;

/**
 * Initialise a set of operations, scoped to favorite, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single favorite
 */
export function createLinearSdkFavorite<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkFavorite
 * Initialise a set of operations, scoped to favorite, to run against the Linear api
 */
export type LinearSdkFavorite = ReturnType<typeof createLinearSdkFavorite>;

/**
 * Initialise a set of operations, scoped to integration, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single integration
 */
export function createLinearSdkIntegration<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the Integration_SettingsQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_SettingsQuery
     */
    async settings(opts?: O): Promise<ResultOf<typeof D.Integration_SettingsDocument>["integration"]["settings"]> {
      const response = await requester<D.Integration_SettingsQuery, D.Integration_SettingsQueryVariables>(
        D.Integration_SettingsDocument,
        { id },
        opts
      );
      return {
        ...response?.integration?.settings,
      };
    },
    /**
     * Call the Linear api with the Integration_Settings_SlackPostQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_Settings_SlackPostQuery
     */
    async slackPost(opts?: O): Promise<ResultOf<typeof D.Integration_Settings_SlackPostDocument>["integration"]> {
      const response = await requester<
        D.Integration_Settings_SlackPostQuery,
        D.Integration_Settings_SlackPostQueryVariables
      >(D.Integration_Settings_SlackPostDocument, { id }, opts);
      return {
        ...response?.integration,
      };
    },
    /**
     * Call the Linear api with the Integration_Settings_SlackProjectPostQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_Settings_SlackProjectPostQuery
     */
    async slackProjectPost(
      opts?: O
    ): Promise<ResultOf<typeof D.Integration_Settings_SlackProjectPostDocument>["integration"]> {
      const response = await requester<
        D.Integration_Settings_SlackProjectPostQuery,
        D.Integration_Settings_SlackProjectPostQueryVariables
      >(D.Integration_Settings_SlackProjectPostDocument, { id }, opts);
      return {
        ...response?.integration,
      };
    },
    /**
     * Call the Linear api with the Integration_Settings_GoogleSheetsQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_Settings_GoogleSheetsQuery
     */
    async googleSheets(opts?: O): Promise<ResultOf<typeof D.Integration_Settings_GoogleSheetsDocument>["integration"]> {
      const response = await requester<
        D.Integration_Settings_GoogleSheetsQuery,
        D.Integration_Settings_GoogleSheetsQueryVariables
      >(D.Integration_Settings_GoogleSheetsDocument, { id }, opts);
      return {
        ...response?.integration,
      };
    },
    /**
     * Call the Linear api with the Integration_Settings_SentryQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_Settings_SentryQuery
     */
    async sentry(opts?: O): Promise<ResultOf<typeof D.Integration_Settings_SentryDocument>["integration"]> {
      const response = await requester<D.Integration_Settings_SentryQuery, D.Integration_Settings_SentryQueryVariables>(
        D.Integration_Settings_SentryDocument,
        { id },
        opts
      );
      return {
        ...response?.integration,
      };
    },
    /**
     * Call the Linear api with the Integration_OrganizationQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_OrganizationQuery
     */
    async organization(
      opts?: O
    ): Promise<ResultOf<typeof D.Integration_OrganizationDocument>["integration"]["organization"]> {
      const response = await requester<D.Integration_OrganizationQuery, D.Integration_OrganizationQueryVariables>(
        D.Integration_OrganizationDocument,
        { id },
        opts
      );
      return {
        ...response?.integration?.organization,
      };
    },
    /**
     * Call the Linear api with the Integration_Organization_UsersQuery
     *
     * @param vars - variables without integration id to pass into the Integration_Organization_UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_Organization_UsersQuery
     */
    async users(
      vars?: Omit<D.Integration_Organization_UsersQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Integration_Organization_UsersDocument>["integration"]> {
      const response = await requester<
        D.Integration_Organization_UsersQuery,
        D.Integration_Organization_UsersQueryVariables
      >(D.Integration_Organization_UsersDocument, { id, ...vars }, opts);
      return {
        ...response?.integration,
      };
    },
    /**
     * Call the Linear api with the Integration_Organization_TeamsQuery
     *
     * @param vars - variables without integration id to pass into the Integration_Organization_TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_Organization_TeamsQuery
     */
    async teams(
      vars?: Omit<D.Integration_Organization_TeamsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Integration_Organization_TeamsDocument>["integration"]> {
      const response = await requester<
        D.Integration_Organization_TeamsQuery,
        D.Integration_Organization_TeamsQueryVariables
      >(D.Integration_Organization_TeamsDocument, { id, ...vars }, opts);
      return {
        ...response?.integration,
      };
    },
    /**
     * Call the Linear api with the Integration_Organization_MilestonesQuery
     *
     * @param vars - variables without integration id to pass into the Integration_Organization_MilestonesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_Organization_MilestonesQuery
     */
    async milestones(
      vars?: Omit<D.Integration_Organization_MilestonesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Integration_Organization_MilestonesDocument>["integration"]> {
      const response = await requester<
        D.Integration_Organization_MilestonesQuery,
        D.Integration_Organization_MilestonesQueryVariables
      >(D.Integration_Organization_MilestonesDocument, { id, ...vars }, opts);
      return {
        ...response?.integration,
      };
    },
    /**
     * Call the Linear api with the Integration_Organization_IntegrationsQuery
     *
     * @param vars - variables without integration id to pass into the Integration_Organization_IntegrationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_Organization_IntegrationsQuery
     */
    async integrations(
      vars?: Omit<D.Integration_Organization_IntegrationsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Integration_Organization_IntegrationsDocument>["integration"]> {
      const response = await requester<
        D.Integration_Organization_IntegrationsQuery,
        D.Integration_Organization_IntegrationsQueryVariables
      >(D.Integration_Organization_IntegrationsDocument, { id, ...vars }, opts);
      return {
        ...response?.integration,
      };
    },
    /**
     * Call the Linear api with the Integration_Organization_SubscriptionQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Integration_Organization_SubscriptionQuery
     */
    async subscription(
      opts?: O
    ): Promise<ResultOf<typeof D.Integration_Organization_SubscriptionDocument>["integration"]> {
      const response = await requester<
        D.Integration_Organization_SubscriptionQuery,
        D.Integration_Organization_SubscriptionQueryVariables
      >(D.Integration_Organization_SubscriptionDocument, { id }, opts);
      return {
        ...response?.integration,
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdkIntegration
 * Initialise a set of operations, scoped to integration, to run against the Linear api
 */
export type LinearSdkIntegration = ReturnType<typeof createLinearSdkIntegration>;

/**
 * Initialise a set of operations, scoped to integrationResource, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single integrationResource
 */
export function createLinearSdkIntegrationResource<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the IntegrationResource_DataQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResource_DataQuery
     */
    async data(opts?: O): Promise<ResultOf<typeof D.IntegrationResource_DataDocument>["integrationResource"]["data"]> {
      const response = await requester<D.IntegrationResource_DataQuery, D.IntegrationResource_DataQueryVariables>(
        D.IntegrationResource_DataDocument,
        { id },
        opts
      );
      return {
        ...response?.integrationResource?.data,
      };
    },
    /**
     * Call the Linear api with the IntegrationResource_Data_GithubPullRequestQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResource_Data_GithubPullRequestQuery
     */
    async githubPullRequest(
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationResource_Data_GithubPullRequestDocument>["integrationResource"]> {
      const response = await requester<
        D.IntegrationResource_Data_GithubPullRequestQuery,
        D.IntegrationResource_Data_GithubPullRequestQueryVariables
      >(D.IntegrationResource_Data_GithubPullRequestDocument, { id }, opts);
      return {
        ...response?.integrationResource,
      };
    },
    /**
     * Call the Linear api with the IntegrationResource_Data_GitlabMergeRequestQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResource_Data_GitlabMergeRequestQuery
     */
    async gitlabMergeRequest(
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationResource_Data_GitlabMergeRequestDocument>["integrationResource"]> {
      const response = await requester<
        D.IntegrationResource_Data_GitlabMergeRequestQuery,
        D.IntegrationResource_Data_GitlabMergeRequestQueryVariables
      >(D.IntegrationResource_Data_GitlabMergeRequestDocument, { id }, opts);
      return {
        ...response?.integrationResource,
      };
    },
    /**
     * Call the Linear api with the IntegrationResource_Data_GithubCommitQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResource_Data_GithubCommitQuery
     */
    async githubCommit(
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationResource_Data_GithubCommitDocument>["integrationResource"]> {
      const response = await requester<
        D.IntegrationResource_Data_GithubCommitQuery,
        D.IntegrationResource_Data_GithubCommitQueryVariables
      >(D.IntegrationResource_Data_GithubCommitDocument, { id }, opts);
      return {
        ...response?.integrationResource,
      };
    },
    /**
     * Call the Linear api with the IntegrationResource_Data_SentryIssueQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResource_Data_SentryIssueQuery
     */
    async sentryIssue(
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationResource_Data_SentryIssueDocument>["integrationResource"]> {
      const response = await requester<
        D.IntegrationResource_Data_SentryIssueQuery,
        D.IntegrationResource_Data_SentryIssueQueryVariables
      >(D.IntegrationResource_Data_SentryIssueDocument, { id }, opts);
      return {
        ...response?.integrationResource,
      };
    },
    /**
     * Call the Linear api with the IntegrationResource_PullRequestQuery
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
 * Initialise a set of operations, scoped to integrationResource, to run against the Linear api
 */
export type LinearSdkIntegrationResource = ReturnType<typeof createLinearSdkIntegrationResource>;

/**
 * Initialise a set of operations, scoped to issueLabel, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issueLabel
 */
export function createLinearSdkIssueLabel<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the IssueLabel_IssuesQuery
     *
     * @param vars - variables without issueLabel id to pass into the IssueLabel_IssuesQuery
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
 * Initialise a set of operations, scoped to issueLabel, to run against the Linear api
 */
export type LinearSdkIssueLabel = ReturnType<typeof createLinearSdkIssueLabel>;

/**
 * Initialise a set of operations, scoped to issueRelation, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issueRelation
 */
export function createLinearSdkIssueRelation<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkIssueRelation
 * Initialise a set of operations, scoped to issueRelation, to run against the Linear api
 */
export type LinearSdkIssueRelation = ReturnType<typeof createLinearSdkIssueRelation>;

/**
 * Initialise a set of operations, scoped to issue, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issue
 */
export function createLinearSdkIssue<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the Issue_SubscribersQuery
     *
     * @param vars - variables without issue id to pass into the Issue_SubscribersQuery
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
     * Call the Linear api with the Issue_ChildrenQuery
     *
     * @param vars - variables without issue id to pass into the Issue_ChildrenQuery
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
     * Call the Linear api with the Issue_CommentsQuery
     *
     * @param vars - variables without issue id to pass into the Issue_CommentsQuery
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
     * Call the Linear api with the Issue_HistoryQuery
     *
     * @param vars - variables without issue id to pass into the Issue_HistoryQuery
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
     * Call the Linear api with the Issue_LabelsQuery
     *
     * @param vars - variables without issue id to pass into the Issue_LabelsQuery
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
     * Call the Linear api with the Issue_IntegrationResourcesQuery
     *
     * @param vars - variables without issue id to pass into the Issue_IntegrationResourcesQuery
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
     * Call the Linear api with the Issue_RelationsQuery
     *
     * @param vars - variables without issue id to pass into the Issue_RelationsQuery
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
     * Call the Linear api with the Issue_InverseRelationsQuery
     *
     * @param vars - variables without issue id to pass into the Issue_InverseRelationsQuery
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
 * Initialise a set of operations, scoped to issue, to run against the Linear api
 */
export type LinearSdkIssue = ReturnType<typeof createLinearSdkIssue>;

/**
 * Initialise a set of operations, scoped to milestone, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single milestone
 */
export function createLinearSdkMilestone<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the Milestone_OrganizationQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Milestone_OrganizationQuery
     */
    async organization(
      opts?: O
    ): Promise<ResultOf<typeof D.Milestone_OrganizationDocument>["milestone"]["organization"]> {
      const response = await requester<D.Milestone_OrganizationQuery, D.Milestone_OrganizationQueryVariables>(
        D.Milestone_OrganizationDocument,
        { id },
        opts
      );
      return {
        ...response?.milestone?.organization,
      };
    },
    /**
     * Call the Linear api with the Milestone_Organization_UsersQuery
     *
     * @param vars - variables without milestone id to pass into the Milestone_Organization_UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Milestone_Organization_UsersQuery
     */
    async users(
      vars?: Omit<D.Milestone_Organization_UsersQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Milestone_Organization_UsersDocument>["milestone"]> {
      const response = await requester<
        D.Milestone_Organization_UsersQuery,
        D.Milestone_Organization_UsersQueryVariables
      >(D.Milestone_Organization_UsersDocument, { id, ...vars }, opts);
      return {
        ...response?.milestone,
      };
    },
    /**
     * Call the Linear api with the Milestone_Organization_TeamsQuery
     *
     * @param vars - variables without milestone id to pass into the Milestone_Organization_TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Milestone_Organization_TeamsQuery
     */
    async teams(
      vars?: Omit<D.Milestone_Organization_TeamsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Milestone_Organization_TeamsDocument>["milestone"]> {
      const response = await requester<
        D.Milestone_Organization_TeamsQuery,
        D.Milestone_Organization_TeamsQueryVariables
      >(D.Milestone_Organization_TeamsDocument, { id, ...vars }, opts);
      return {
        ...response?.milestone,
      };
    },
    /**
     * Call the Linear api with the Milestone_Organization_MilestonesQuery
     *
     * @param vars - variables without milestone id to pass into the Milestone_Organization_MilestonesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Milestone_Organization_MilestonesQuery
     */
    async milestones(
      vars?: Omit<D.Milestone_Organization_MilestonesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Milestone_Organization_MilestonesDocument>["milestone"]> {
      const response = await requester<
        D.Milestone_Organization_MilestonesQuery,
        D.Milestone_Organization_MilestonesQueryVariables
      >(D.Milestone_Organization_MilestonesDocument, { id, ...vars }, opts);
      return {
        ...response?.milestone,
      };
    },
    /**
     * Call the Linear api with the Milestone_Organization_IntegrationsQuery
     *
     * @param vars - variables without milestone id to pass into the Milestone_Organization_IntegrationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Milestone_Organization_IntegrationsQuery
     */
    async integrations(
      vars?: Omit<D.Milestone_Organization_IntegrationsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Milestone_Organization_IntegrationsDocument>["milestone"]> {
      const response = await requester<
        D.Milestone_Organization_IntegrationsQuery,
        D.Milestone_Organization_IntegrationsQueryVariables
      >(D.Milestone_Organization_IntegrationsDocument, { id, ...vars }, opts);
      return {
        ...response?.milestone,
      };
    },
    /**
     * Call the Linear api with the Milestone_Organization_SubscriptionQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Milestone_Organization_SubscriptionQuery
     */
    async subscription(opts?: O): Promise<ResultOf<typeof D.Milestone_Organization_SubscriptionDocument>["milestone"]> {
      const response = await requester<
        D.Milestone_Organization_SubscriptionQuery,
        D.Milestone_Organization_SubscriptionQueryVariables
      >(D.Milestone_Organization_SubscriptionDocument, { id }, opts);
      return {
        ...response?.milestone,
      };
    },
    /**
     * Call the Linear api with the Milestone_ProjectsQuery
     *
     * @param vars - variables without milestone id to pass into the Milestone_ProjectsQuery
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
 * Initialise a set of operations, scoped to milestone, to run against the Linear api
 */
export type LinearSdkMilestone = ReturnType<typeof createLinearSdkMilestone>;

/**
 * Initialise a set of operations, scoped to organizationInvite, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single organizationInvite
 */
export function createLinearSdkOrganizationInvite<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the OrganizationInvite_IssuesQuery
     *
     * @param vars - variables without organizationInvite id to pass into the OrganizationInvite_IssuesQuery
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
 * Initialise a set of operations, scoped to organizationInvite, to run against the Linear api
 */
export type LinearSdkOrganizationInvite = ReturnType<typeof createLinearSdkOrganizationInvite>;

/**
 * Initialise a set of operations, scoped to projectLink, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single projectLink
 */
export function createLinearSdkProjectLink<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkProjectLink
 * Initialise a set of operations, scoped to projectLink, to run against the Linear api
 */
export type LinearSdkProjectLink = ReturnType<typeof createLinearSdkProjectLink>;

/**
 * Initialise a set of operations, scoped to project, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single project
 */
export function createLinearSdkProject<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the Project_TeamsQuery
     *
     * @param vars - variables without project id to pass into the Project_TeamsQuery
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
     * Call the Linear api with the Project_MembersQuery
     *
     * @param vars - variables without project id to pass into the Project_MembersQuery
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
     * Call the Linear api with the Project_IssuesQuery
     *
     * @param vars - variables without project id to pass into the Project_IssuesQuery
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
     * Call the Linear api with the Project_LinksQuery
     *
     * @param vars - variables without project id to pass into the Project_LinksQuery
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
 * Initialise a set of operations, scoped to project, to run against the Linear api
 */
export type LinearSdkProject = ReturnType<typeof createLinearSdkProject>;

/**
 * Initialise a set of operations, scoped to reaction, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single reaction
 */
export function createLinearSdkReaction<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkReaction
 * Initialise a set of operations, scoped to reaction, to run against the Linear api
 */
export type LinearSdkReaction = ReturnType<typeof createLinearSdkReaction>;

/**
 * Initialise a set of operations, scoped to teamMembership, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single teamMembership
 */
export function createLinearSdkTeamMembership<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkTeamMembership
 * Initialise a set of operations, scoped to teamMembership, to run against the Linear api
 */
export type LinearSdkTeamMembership = ReturnType<typeof createLinearSdkTeamMembership>;

/**
 * Initialise a set of operations, scoped to team, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single team
 */
export function createLinearSdkTeam<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the Team_IssuesQuery
     *
     * @param vars - variables without team id to pass into the Team_IssuesQuery
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
     * Call the Linear api with the Team_CyclesQuery
     *
     * @param vars - variables without team id to pass into the Team_CyclesQuery
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
     * Call the Linear api with the Team_MembershipsQuery
     *
     * @param vars - variables without team id to pass into the Team_MembershipsQuery
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
     * Call the Linear api with the Team_ProjectsQuery
     *
     * @param vars - variables without team id to pass into the Team_ProjectsQuery
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
     * Call the Linear api with the Team_StatesQuery
     *
     * @param vars - variables without team id to pass into the Team_StatesQuery
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
     * Call the Linear api with the Team_TemplatesQuery
     *
     * @param vars - variables without team id to pass into the Team_TemplatesQuery
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
     * Call the Linear api with the Team_LabelsQuery
     *
     * @param vars - variables without team id to pass into the Team_LabelsQuery
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
     * Call the Linear api with the Team_OrganizationQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Team_OrganizationQuery
     */
    async organization(opts?: O): Promise<ResultOf<typeof D.Team_OrganizationDocument>["team"]["organization"]> {
      const response = await requester<D.Team_OrganizationQuery, D.Team_OrganizationQueryVariables>(
        D.Team_OrganizationDocument,
        { id },
        opts
      );
      return {
        ...response?.team?.organization,
      };
    },
    /**
     * Call the Linear api with the Team_Organization_UsersQuery
     *
     * @param vars - variables without team id to pass into the Team_Organization_UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Team_Organization_UsersQuery
     */
    async users(
      vars?: Omit<D.Team_Organization_UsersQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Team_Organization_UsersDocument>["team"]> {
      const response = await requester<D.Team_Organization_UsersQuery, D.Team_Organization_UsersQueryVariables>(
        D.Team_Organization_UsersDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.team,
      };
    },
    /**
     * Call the Linear api with the Team_Organization_TeamsQuery
     *
     * @param vars - variables without team id to pass into the Team_Organization_TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Team_Organization_TeamsQuery
     */
    async teams(
      vars?: Omit<D.Team_Organization_TeamsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Team_Organization_TeamsDocument>["team"]> {
      const response = await requester<D.Team_Organization_TeamsQuery, D.Team_Organization_TeamsQueryVariables>(
        D.Team_Organization_TeamsDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.team,
      };
    },
    /**
     * Call the Linear api with the Team_Organization_MilestonesQuery
     *
     * @param vars - variables without team id to pass into the Team_Organization_MilestonesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Team_Organization_MilestonesQuery
     */
    async milestones(
      vars?: Omit<D.Team_Organization_MilestonesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Team_Organization_MilestonesDocument>["team"]> {
      const response = await requester<
        D.Team_Organization_MilestonesQuery,
        D.Team_Organization_MilestonesQueryVariables
      >(D.Team_Organization_MilestonesDocument, { id, ...vars }, opts);
      return {
        ...response?.team,
      };
    },
    /**
     * Call the Linear api with the Team_Organization_IntegrationsQuery
     *
     * @param vars - variables without team id to pass into the Team_Organization_IntegrationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Team_Organization_IntegrationsQuery
     */
    async integrations(
      vars?: Omit<D.Team_Organization_IntegrationsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.Team_Organization_IntegrationsDocument>["team"]> {
      const response = await requester<
        D.Team_Organization_IntegrationsQuery,
        D.Team_Organization_IntegrationsQueryVariables
      >(D.Team_Organization_IntegrationsDocument, { id, ...vars }, opts);
      return {
        ...response?.team,
      };
    },
    /**
     * Call the Linear api with the Team_Organization_SubscriptionQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The result of the Team_Organization_SubscriptionQuery
     */
    async subscription(opts?: O): Promise<ResultOf<typeof D.Team_Organization_SubscriptionDocument>["team"]> {
      const response = await requester<
        D.Team_Organization_SubscriptionQuery,
        D.Team_Organization_SubscriptionQueryVariables
      >(D.Team_Organization_SubscriptionDocument, { id }, opts);
      return {
        ...response?.team,
      };
    },
    /**
     * Call the Linear api with the Team_WebhooksQuery
     *
     * @param vars - variables without team id to pass into the Team_WebhooksQuery
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
 * Initialise a set of operations, scoped to team, to run against the Linear api
 */
export type LinearSdkTeam = ReturnType<typeof createLinearSdkTeam>;

/**
 * Initialise a set of operations, scoped to template, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single template
 */
export function createLinearSdkTemplate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkTemplate
 * Initialise a set of operations, scoped to template, to run against the Linear api
 */
export type LinearSdkTemplate = ReturnType<typeof createLinearSdkTemplate>;

/**
 * Initialise a set of operations, scoped to webhook, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single webhook
 */
export function createLinearSdkWebhook<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkWebhook
 * Initialise a set of operations, scoped to webhook, to run against the Linear api
 */
export type LinearSdkWebhook = ReturnType<typeof createLinearSdkWebhook>;

/**
 * Initialise a set of operations, scoped to workflowState, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single workflowState
 */
export function createLinearSdkWorkflowState<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the WorkflowState_IssuesQuery
     *
     * @param vars - variables without workflowState id to pass into the WorkflowState_IssuesQuery
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
 * Initialise a set of operations, scoped to workflowState, to run against the Linear api
 */
export type LinearSdkWorkflowState = ReturnType<typeof createLinearSdkWorkflowState>;

/**
 * Initialise a set of operations, scoped to userUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single userUpdate
 */
export function createLinearSdkUserUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkUserUpdate
 * Initialise a set of operations, scoped to userUpdate, to run against the Linear api
 */
export type LinearSdkUserUpdate = ReturnType<typeof createLinearSdkUserUpdate>;

/**
 * Initialise a set of operations, scoped to userPromoteAdmin, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single userPromoteAdmin
 */
export function createLinearSdkUserPromoteAdmin<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkUserPromoteAdmin
 * Initialise a set of operations, scoped to userPromoteAdmin, to run against the Linear api
 */
export type LinearSdkUserPromoteAdmin = ReturnType<typeof createLinearSdkUserPromoteAdmin>;

/**
 * Initialise a set of operations, scoped to userDemoteAdmin, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single userDemoteAdmin
 */
export function createLinearSdkUserDemoteAdmin<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkUserDemoteAdmin
 * Initialise a set of operations, scoped to userDemoteAdmin, to run against the Linear api
 */
export type LinearSdkUserDemoteAdmin = ReturnType<typeof createLinearSdkUserDemoteAdmin>;

/**
 * Initialise a set of operations, scoped to userSuspend, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single userSuspend
 */
export function createLinearSdkUserSuspend<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkUserSuspend
 * Initialise a set of operations, scoped to userSuspend, to run against the Linear api
 */
export type LinearSdkUserSuspend = ReturnType<typeof createLinearSdkUserSuspend>;

/**
 * Initialise a set of operations, scoped to userUnsuspend, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single userUnsuspend
 */
export function createLinearSdkUserUnsuspend<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkUserUnsuspend
 * Initialise a set of operations, scoped to userUnsuspend, to run against the Linear api
 */
export type LinearSdkUserUnsuspend = ReturnType<typeof createLinearSdkUserUnsuspend>;

/**
 * Initialise a set of operations, scoped to adminDeleteIntegration, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single adminDeleteIntegration
 */
export function createLinearSdkAdminDeleteIntegration<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkAdminDeleteIntegration
 * Initialise a set of operations, scoped to adminDeleteIntegration, to run against the Linear api
 */
export type LinearSdkAdminDeleteIntegration = ReturnType<typeof createLinearSdkAdminDeleteIntegration>;

/**
 * Initialise a set of operations, scoped to organizationToggleAccess, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single organizationToggleAccess
 */
export function createLinearSdkOrganizationToggleAccess<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkOrganizationToggleAccess
 * Initialise a set of operations, scoped to organizationToggleAccess, to run against the Linear api
 */
export type LinearSdkOrganizationToggleAccess = ReturnType<typeof createLinearSdkOrganizationToggleAccess>;

/**
 * Initialise a set of operations, scoped to organizationChangeEmailDomain, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single organizationChangeEmailDomain
 */
export function createLinearSdkOrganizationChangeEmailDomain<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkOrganizationChangeEmailDomain
 * Initialise a set of operations, scoped to organizationChangeEmailDomain, to run against the Linear api
 */
export type LinearSdkOrganizationChangeEmailDomain = ReturnType<typeof createLinearSdkOrganizationChangeEmailDomain>;

/**
 * Initialise a set of operations, scoped to organizationToggleSamlEnabled, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single organizationToggleSamlEnabled
 */
export function createLinearSdkOrganizationToggleSamlEnabled<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkOrganizationToggleSamlEnabled
 * Initialise a set of operations, scoped to organizationToggleSamlEnabled, to run against the Linear api
 */
export type LinearSdkOrganizationToggleSamlEnabled = ReturnType<typeof createLinearSdkOrganizationToggleSamlEnabled>;

/**
 * Initialise a set of operations, scoped to organizationConfigureSaml, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single organizationConfigureSaml
 */
export function createLinearSdkOrganizationConfigureSaml<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkOrganizationConfigureSaml
 * Initialise a set of operations, scoped to organizationConfigureSaml, to run against the Linear api
 */
export type LinearSdkOrganizationConfigureSaml = ReturnType<typeof createLinearSdkOrganizationConfigureSaml>;

/**
 * Initialise a set of operations, scoped to adminUserAccountChangeEmail, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single adminUserAccountChangeEmail
 */
export function createLinearSdkAdminUserAccountChangeEmail<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkAdminUserAccountChangeEmail
 * Initialise a set of operations, scoped to adminUserAccountChangeEmail, to run against the Linear api
 */
export type LinearSdkAdminUserAccountChangeEmail = ReturnType<typeof createLinearSdkAdminUserAccountChangeEmail>;

/**
 * Initialise a set of operations, scoped to apiKeyDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single apiKeyDelete
 */
export function createLinearSdkApiKeyDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkApiKeyDelete
 * Initialise a set of operations, scoped to apiKeyDelete, to run against the Linear api
 */
export type LinearSdkApiKeyDelete = ReturnType<typeof createLinearSdkApiKeyDelete>;

/**
 * Initialise a set of operations, scoped to commentUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single commentUpdate
 */
export function createLinearSdkCommentUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkCommentUpdate
 * Initialise a set of operations, scoped to commentUpdate, to run against the Linear api
 */
export type LinearSdkCommentUpdate = ReturnType<typeof createLinearSdkCommentUpdate>;

/**
 * Initialise a set of operations, scoped to commentDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single commentDelete
 */
export function createLinearSdkCommentDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkCommentDelete
 * Initialise a set of operations, scoped to commentDelete, to run against the Linear api
 */
export type LinearSdkCommentDelete = ReturnType<typeof createLinearSdkCommentDelete>;

/**
 * Initialise a set of operations, scoped to customViewUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single customViewUpdate
 */
export function createLinearSdkCustomViewUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkCustomViewUpdate
 * Initialise a set of operations, scoped to customViewUpdate, to run against the Linear api
 */
export type LinearSdkCustomViewUpdate = ReturnType<typeof createLinearSdkCustomViewUpdate>;

/**
 * Initialise a set of operations, scoped to customViewDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single customViewDelete
 */
export function createLinearSdkCustomViewDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkCustomViewDelete
 * Initialise a set of operations, scoped to customViewDelete, to run against the Linear api
 */
export type LinearSdkCustomViewDelete = ReturnType<typeof createLinearSdkCustomViewDelete>;

/**
 * Initialise a set of operations, scoped to cycleUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single cycleUpdate
 */
export function createLinearSdkCycleUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkCycleUpdate
 * Initialise a set of operations, scoped to cycleUpdate, to run against the Linear api
 */
export type LinearSdkCycleUpdate = ReturnType<typeof createLinearSdkCycleUpdate>;

/**
 * Initialise a set of operations, scoped to cycleArchive, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single cycleArchive
 */
export function createLinearSdkCycleArchive<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkCycleArchive
 * Initialise a set of operations, scoped to cycleArchive, to run against the Linear api
 */
export type LinearSdkCycleArchive = ReturnType<typeof createLinearSdkCycleArchive>;

/**
 * Initialise a set of operations, scoped to emojiDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single emojiDelete
 */
export function createLinearSdkEmojiDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkEmojiDelete
 * Initialise a set of operations, scoped to emojiDelete, to run against the Linear api
 */
export type LinearSdkEmojiDelete = ReturnType<typeof createLinearSdkEmojiDelete>;

/**
 * Initialise a set of operations, scoped to favoriteUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single favoriteUpdate
 */
export function createLinearSdkFavoriteUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkFavoriteUpdate
 * Initialise a set of operations, scoped to favoriteUpdate, to run against the Linear api
 */
export type LinearSdkFavoriteUpdate = ReturnType<typeof createLinearSdkFavoriteUpdate>;

/**
 * Initialise a set of operations, scoped to favoriteDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single favoriteDelete
 */
export function createLinearSdkFavoriteDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkFavoriteDelete
 * Initialise a set of operations, scoped to favoriteDelete, to run against the Linear api
 */
export type LinearSdkFavoriteDelete = ReturnType<typeof createLinearSdkFavoriteDelete>;

/**
 * Initialise a set of operations, scoped to refreshGoogleSheetsData, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single refreshGoogleSheetsData
 */
export function createLinearSdkRefreshGoogleSheetsData<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkRefreshGoogleSheetsData
 * Initialise a set of operations, scoped to refreshGoogleSheetsData, to run against the Linear api
 */
export type LinearSdkRefreshGoogleSheetsData = ReturnType<typeof createLinearSdkRefreshGoogleSheetsData>;

/**
 * Initialise a set of operations, scoped to integrationDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single integrationDelete
 */
export function createLinearSdkIntegrationDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkIntegrationDelete
 * Initialise a set of operations, scoped to integrationDelete, to run against the Linear api
 */
export type LinearSdkIntegrationDelete = ReturnType<typeof createLinearSdkIntegrationDelete>;

/**
 * Initialise a set of operations, scoped to integrationResourceArchive, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single integrationResourceArchive
 */
export function createLinearSdkIntegrationResourceArchive<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkIntegrationResourceArchive
 * Initialise a set of operations, scoped to integrationResourceArchive, to run against the Linear api
 */
export type LinearSdkIntegrationResourceArchive = ReturnType<typeof createLinearSdkIntegrationResourceArchive>;

/**
 * Initialise a set of operations, scoped to issueLabelUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issueLabelUpdate
 */
export function createLinearSdkIssueLabelUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkIssueLabelUpdate
 * Initialise a set of operations, scoped to issueLabelUpdate, to run against the Linear api
 */
export type LinearSdkIssueLabelUpdate = ReturnType<typeof createLinearSdkIssueLabelUpdate>;

/**
 * Initialise a set of operations, scoped to issueLabelArchive, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issueLabelArchive
 */
export function createLinearSdkIssueLabelArchive<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkIssueLabelArchive
 * Initialise a set of operations, scoped to issueLabelArchive, to run against the Linear api
 */
export type LinearSdkIssueLabelArchive = ReturnType<typeof createLinearSdkIssueLabelArchive>;

/**
 * Initialise a set of operations, scoped to issueRelationUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issueRelationUpdate
 */
export function createLinearSdkIssueRelationUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkIssueRelationUpdate
 * Initialise a set of operations, scoped to issueRelationUpdate, to run against the Linear api
 */
export type LinearSdkIssueRelationUpdate = ReturnType<typeof createLinearSdkIssueRelationUpdate>;

/**
 * Initialise a set of operations, scoped to issueRelationDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issueRelationDelete
 */
export function createLinearSdkIssueRelationDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkIssueRelationDelete
 * Initialise a set of operations, scoped to issueRelationDelete, to run against the Linear api
 */
export type LinearSdkIssueRelationDelete = ReturnType<typeof createLinearSdkIssueRelationDelete>;

/**
 * Initialise a set of operations, scoped to issueUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issueUpdate
 */
export function createLinearSdkIssueUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkIssueUpdate
 * Initialise a set of operations, scoped to issueUpdate, to run against the Linear api
 */
export type LinearSdkIssueUpdate = ReturnType<typeof createLinearSdkIssueUpdate>;

/**
 * Initialise a set of operations, scoped to issueArchive, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issueArchive
 */
export function createLinearSdkIssueArchive<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkIssueArchive
 * Initialise a set of operations, scoped to issueArchive, to run against the Linear api
 */
export type LinearSdkIssueArchive = ReturnType<typeof createLinearSdkIssueArchive>;

/**
 * Initialise a set of operations, scoped to issueUnarchive, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issueUnarchive
 */
export function createLinearSdkIssueUnarchive<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkIssueUnarchive
 * Initialise a set of operations, scoped to issueUnarchive, to run against the Linear api
 */
export type LinearSdkIssueUnarchive = ReturnType<typeof createLinearSdkIssueUnarchive>;

/**
 * Initialise a set of operations, scoped to milestoneUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single milestoneUpdate
 */
export function createLinearSdkMilestoneUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkMilestoneUpdate
 * Initialise a set of operations, scoped to milestoneUpdate, to run against the Linear api
 */
export type LinearSdkMilestoneUpdate = ReturnType<typeof createLinearSdkMilestoneUpdate>;

/**
 * Initialise a set of operations, scoped to milestoneDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single milestoneDelete
 */
export function createLinearSdkMilestoneDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkMilestoneDelete
 * Initialise a set of operations, scoped to milestoneDelete, to run against the Linear api
 */
export type LinearSdkMilestoneDelete = ReturnType<typeof createLinearSdkMilestoneDelete>;

/**
 * Initialise a set of operations, scoped to notificationCreate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single notificationCreate
 */
export function createLinearSdkNotificationCreate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkNotificationCreate
 * Initialise a set of operations, scoped to notificationCreate, to run against the Linear api
 */
export type LinearSdkNotificationCreate = ReturnType<typeof createLinearSdkNotificationCreate>;

/**
 * Initialise a set of operations, scoped to notificationUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single notificationUpdate
 */
export function createLinearSdkNotificationUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkNotificationUpdate
 * Initialise a set of operations, scoped to notificationUpdate, to run against the Linear api
 */
export type LinearSdkNotificationUpdate = ReturnType<typeof createLinearSdkNotificationUpdate>;

/**
 * Initialise a set of operations, scoped to notificationDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single notificationDelete
 */
export function createLinearSdkNotificationDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkNotificationDelete
 * Initialise a set of operations, scoped to notificationDelete, to run against the Linear api
 */
export type LinearSdkNotificationDelete = ReturnType<typeof createLinearSdkNotificationDelete>;

/**
 * Initialise a set of operations, scoped to notificationArchive, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single notificationArchive
 */
export function createLinearSdkNotificationArchive<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkNotificationArchive
 * Initialise a set of operations, scoped to notificationArchive, to run against the Linear api
 */
export type LinearSdkNotificationArchive = ReturnType<typeof createLinearSdkNotificationArchive>;

/**
 * Initialise a set of operations, scoped to notificationUnarchive, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single notificationUnarchive
 */
export function createLinearSdkNotificationUnarchive<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkNotificationUnarchive
 * Initialise a set of operations, scoped to notificationUnarchive, to run against the Linear api
 */
export type LinearSdkNotificationUnarchive = ReturnType<typeof createLinearSdkNotificationUnarchive>;

/**
 * Initialise a set of operations, scoped to notificationSubscriptionDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single notificationSubscriptionDelete
 */
export function createLinearSdkNotificationSubscriptionDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkNotificationSubscriptionDelete
 * Initialise a set of operations, scoped to notificationSubscriptionDelete, to run against the Linear api
 */
export type LinearSdkNotificationSubscriptionDelete = ReturnType<typeof createLinearSdkNotificationSubscriptionDelete>;

/**
 * Initialise a set of operations, scoped to oauthClientUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single oauthClientUpdate
 */
export function createLinearSdkOauthClientUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkOauthClientUpdate
 * Initialise a set of operations, scoped to oauthClientUpdate, to run against the Linear api
 */
export type LinearSdkOauthClientUpdate = ReturnType<typeof createLinearSdkOauthClientUpdate>;

/**
 * Initialise a set of operations, scoped to oauthClientArchive, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single oauthClientArchive
 */
export function createLinearSdkOauthClientArchive<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkOauthClientArchive
 * Initialise a set of operations, scoped to oauthClientArchive, to run against the Linear api
 */
export type LinearSdkOauthClientArchive = ReturnType<typeof createLinearSdkOauthClientArchive>;

/**
 * Initialise a set of operations, scoped to oauthClientRotateSecret, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single oauthClientRotateSecret
 */
export function createLinearSdkOauthClientRotateSecret<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkOauthClientRotateSecret
 * Initialise a set of operations, scoped to oauthClientRotateSecret, to run against the Linear api
 */
export type LinearSdkOauthClientRotateSecret = ReturnType<typeof createLinearSdkOauthClientRotateSecret>;

/**
 * Initialise a set of operations, scoped to organizationDomainDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single organizationDomainDelete
 */
export function createLinearSdkOrganizationDomainDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkOrganizationDomainDelete
 * Initialise a set of operations, scoped to organizationDomainDelete, to run against the Linear api
 */
export type LinearSdkOrganizationDomainDelete = ReturnType<typeof createLinearSdkOrganizationDomainDelete>;

/**
 * Initialise a set of operations, scoped to resentOrganizationInvite, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single resentOrganizationInvite
 */
export function createLinearSdkResentOrganizationInvite<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkResentOrganizationInvite
 * Initialise a set of operations, scoped to resentOrganizationInvite, to run against the Linear api
 */
export type LinearSdkResentOrganizationInvite = ReturnType<typeof createLinearSdkResentOrganizationInvite>;

/**
 * Initialise a set of operations, scoped to organizationInviteDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single organizationInviteDelete
 */
export function createLinearSdkOrganizationInviteDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkOrganizationInviteDelete
 * Initialise a set of operations, scoped to organizationInviteDelete, to run against the Linear api
 */
export type LinearSdkOrganizationInviteDelete = ReturnType<typeof createLinearSdkOrganizationInviteDelete>;

/**
 * Initialise a set of operations, scoped to projectLinkDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single projectLinkDelete
 */
export function createLinearSdkProjectLinkDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkProjectLinkDelete
 * Initialise a set of operations, scoped to projectLinkDelete, to run against the Linear api
 */
export type LinearSdkProjectLinkDelete = ReturnType<typeof createLinearSdkProjectLinkDelete>;

/**
 * Initialise a set of operations, scoped to projectUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single projectUpdate
 */
export function createLinearSdkProjectUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkProjectUpdate
 * Initialise a set of operations, scoped to projectUpdate, to run against the Linear api
 */
export type LinearSdkProjectUpdate = ReturnType<typeof createLinearSdkProjectUpdate>;

/**
 * Initialise a set of operations, scoped to projectArchive, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single projectArchive
 */
export function createLinearSdkProjectArchive<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkProjectArchive
 * Initialise a set of operations, scoped to projectArchive, to run against the Linear api
 */
export type LinearSdkProjectArchive = ReturnType<typeof createLinearSdkProjectArchive>;

/**
 * Initialise a set of operations, scoped to pushSubscriptionDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single pushSubscriptionDelete
 */
export function createLinearSdkPushSubscriptionDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkPushSubscriptionDelete
 * Initialise a set of operations, scoped to pushSubscriptionDelete, to run against the Linear api
 */
export type LinearSdkPushSubscriptionDelete = ReturnType<typeof createLinearSdkPushSubscriptionDelete>;

/**
 * Initialise a set of operations, scoped to reactionDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single reactionDelete
 */
export function createLinearSdkReactionDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkReactionDelete
 * Initialise a set of operations, scoped to reactionDelete, to run against the Linear api
 */
export type LinearSdkReactionDelete = ReturnType<typeof createLinearSdkReactionDelete>;

/**
 * Initialise a set of operations, scoped to subscriptionUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single subscriptionUpdate
 */
export function createLinearSdkSubscriptionUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkSubscriptionUpdate
 * Initialise a set of operations, scoped to subscriptionUpdate, to run against the Linear api
 */
export type LinearSdkSubscriptionUpdate = ReturnType<typeof createLinearSdkSubscriptionUpdate>;

/**
 * Initialise a set of operations, scoped to subscriptionUpgrade, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single subscriptionUpgrade
 */
export function createLinearSdkSubscriptionUpgrade<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkSubscriptionUpgrade
 * Initialise a set of operations, scoped to subscriptionUpgrade, to run against the Linear api
 */
export type LinearSdkSubscriptionUpgrade = ReturnType<typeof createLinearSdkSubscriptionUpgrade>;

/**
 * Initialise a set of operations, scoped to subscriptionArchive, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single subscriptionArchive
 */
export function createLinearSdkSubscriptionArchive<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkSubscriptionArchive
 * Initialise a set of operations, scoped to subscriptionArchive, to run against the Linear api
 */
export type LinearSdkSubscriptionArchive = ReturnType<typeof createLinearSdkSubscriptionArchive>;

/**
 * Initialise a set of operations, scoped to teamMembershipDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single teamMembershipDelete
 */
export function createLinearSdkTeamMembershipDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkTeamMembershipDelete
 * Initialise a set of operations, scoped to teamMembershipDelete, to run against the Linear api
 */
export type LinearSdkTeamMembershipDelete = ReturnType<typeof createLinearSdkTeamMembershipDelete>;

/**
 * Initialise a set of operations, scoped to teamUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single teamUpdate
 */
export function createLinearSdkTeamUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkTeamUpdate
 * Initialise a set of operations, scoped to teamUpdate, to run against the Linear api
 */
export type LinearSdkTeamUpdate = ReturnType<typeof createLinearSdkTeamUpdate>;

/**
 * Initialise a set of operations, scoped to teamArchive, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single teamArchive
 */
export function createLinearSdkTeamArchive<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkTeamArchive
 * Initialise a set of operations, scoped to teamArchive, to run against the Linear api
 */
export type LinearSdkTeamArchive = ReturnType<typeof createLinearSdkTeamArchive>;

/**
 * Initialise a set of operations, scoped to teamDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single teamDelete
 */
export function createLinearSdkTeamDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkTeamDelete
 * Initialise a set of operations, scoped to teamDelete, to run against the Linear api
 */
export type LinearSdkTeamDelete = ReturnType<typeof createLinearSdkTeamDelete>;

/**
 * Initialise a set of operations, scoped to templateUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single templateUpdate
 */
export function createLinearSdkTemplateUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkTemplateUpdate
 * Initialise a set of operations, scoped to templateUpdate, to run against the Linear api
 */
export type LinearSdkTemplateUpdate = ReturnType<typeof createLinearSdkTemplateUpdate>;

/**
 * Initialise a set of operations, scoped to templateDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single templateDelete
 */
export function createLinearSdkTemplateDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkTemplateDelete
 * Initialise a set of operations, scoped to templateDelete, to run against the Linear api
 */
export type LinearSdkTemplateDelete = ReturnType<typeof createLinearSdkTemplateDelete>;

/**
 * Initialise a set of operations, scoped to userSettingsUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single userSettingsUpdate
 */
export function createLinearSdkUserSettingsUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkUserSettingsUpdate
 * Initialise a set of operations, scoped to userSettingsUpdate, to run against the Linear api
 */
export type LinearSdkUserSettingsUpdate = ReturnType<typeof createLinearSdkUserSettingsUpdate>;

/**
 * Initialise a set of operations, scoped to viewPreferencesUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single viewPreferencesUpdate
 */
export function createLinearSdkViewPreferencesUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkViewPreferencesUpdate
 * Initialise a set of operations, scoped to viewPreferencesUpdate, to run against the Linear api
 */
export type LinearSdkViewPreferencesUpdate = ReturnType<typeof createLinearSdkViewPreferencesUpdate>;

/**
 * Initialise a set of operations, scoped to viewPreferencesDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single viewPreferencesDelete
 */
export function createLinearSdkViewPreferencesDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkViewPreferencesDelete
 * Initialise a set of operations, scoped to viewPreferencesDelete, to run against the Linear api
 */
export type LinearSdkViewPreferencesDelete = ReturnType<typeof createLinearSdkViewPreferencesDelete>;

/**
 * Initialise a set of operations, scoped to webhookUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single webhookUpdate
 */
export function createLinearSdkWebhookUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkWebhookUpdate
 * Initialise a set of operations, scoped to webhookUpdate, to run against the Linear api
 */
export type LinearSdkWebhookUpdate = ReturnType<typeof createLinearSdkWebhookUpdate>;

/**
 * Initialise a set of operations, scoped to webhookDelete, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single webhookDelete
 */
export function createLinearSdkWebhookDelete<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkWebhookDelete
 * Initialise a set of operations, scoped to webhookDelete, to run against the Linear api
 */
export type LinearSdkWebhookDelete = ReturnType<typeof createLinearSdkWebhookDelete>;

/**
 * Initialise a set of operations, scoped to workflowStateUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single workflowStateUpdate
 */
export function createLinearSdkWorkflowStateUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkWorkflowStateUpdate
 * Initialise a set of operations, scoped to workflowStateUpdate, to run against the Linear api
 */
export type LinearSdkWorkflowStateUpdate = ReturnType<typeof createLinearSdkWorkflowStateUpdate>;

/**
 * Initialise a set of operations, scoped to workflowStateArchive, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single workflowStateArchive
 */
export function createLinearSdkWorkflowStateArchive<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkWorkflowStateArchive
 * Initialise a set of operations, scoped to workflowStateArchive, to run against the Linear api
 */
export type LinearSdkWorkflowStateArchive = ReturnType<typeof createLinearSdkWorkflowStateArchive>;

/**
 * Initialise a set of operations to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations
 */
export function createLinearSdk<O>(requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the UserQuery
     *
     * @param id - id to pass into the UserQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserQuery
     */
    async user(id: string, opts?: O): Promise<ResultOf<typeof D.UserDocument>["user"] & LinearSdkUser> {
      const response = await requester<D.UserQuery, D.UserQueryVariables>(D.UserDocument, { id }, opts);
      return {
        ...response?.user,
        ...createLinearSdkUser(id, requester),
      };
    },
    /**
     * Call the Linear api with the ViewerQuery
     *
     * @param vars - variables to pass into the ViewerQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ViewerQuery
     */
    async viewer(vars?: D.ViewerQueryVariables, opts?: O): Promise<ResultOf<typeof D.ViewerDocument>["viewer"]> {
      const response = await requester<D.ViewerQuery, D.ViewerQueryVariables>(D.ViewerDocument, vars, opts);
      return {
        ...response?.viewer,
      };
    },
    /**
     * Call the Linear api with the Viewer_SettingsQuery
     *
     * @param vars - variables to pass into the Viewer_SettingsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Viewer_SettingsQuery
     */
    async settings(
      vars?: D.Viewer_SettingsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Viewer_SettingsDocument>> {
      return requester<D.Viewer_SettingsQuery, D.Viewer_SettingsQueryVariables>(D.Viewer_SettingsDocument, vars, opts);
    },
    /**
     * Call the Linear api with the Viewer_AssignedIssuesQuery
     *
     * @param vars - variables to pass into the Viewer_AssignedIssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Viewer_AssignedIssuesQuery
     */
    async assignedIssues(
      vars?: D.Viewer_AssignedIssuesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Viewer_AssignedIssuesDocument>> {
      return requester<D.Viewer_AssignedIssuesQuery, D.Viewer_AssignedIssuesQueryVariables>(
        D.Viewer_AssignedIssuesDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Viewer_CreatedIssuesQuery
     *
     * @param vars - variables to pass into the Viewer_CreatedIssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Viewer_CreatedIssuesQuery
     */
    async createdIssues(
      vars?: D.Viewer_CreatedIssuesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Viewer_CreatedIssuesDocument>> {
      return requester<D.Viewer_CreatedIssuesQuery, D.Viewer_CreatedIssuesQueryVariables>(
        D.Viewer_CreatedIssuesDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Viewer_OrganizationQuery
     *
     * @param vars - variables to pass into the Viewer_OrganizationQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Viewer_OrganizationQuery
     */
    async organization(
      vars?: D.Viewer_OrganizationQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Viewer_OrganizationDocument>> {
      return requester<D.Viewer_OrganizationQuery, D.Viewer_OrganizationQueryVariables>(
        D.Viewer_OrganizationDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Viewer_Organization_UsersQuery
     *
     * @param vars - variables to pass into the Viewer_Organization_UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Viewer_Organization_UsersQuery
     */
    async users(
      vars?: D.Viewer_Organization_UsersQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Viewer_Organization_UsersDocument>> {
      return requester<D.Viewer_Organization_UsersQuery, D.Viewer_Organization_UsersQueryVariables>(
        D.Viewer_Organization_UsersDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Viewer_Organization_TeamsQuery
     *
     * @param vars - variables to pass into the Viewer_Organization_TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Viewer_Organization_TeamsQuery
     */
    async teams(
      vars?: D.Viewer_Organization_TeamsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Viewer_Organization_TeamsDocument>> {
      return requester<D.Viewer_Organization_TeamsQuery, D.Viewer_Organization_TeamsQueryVariables>(
        D.Viewer_Organization_TeamsDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Viewer_Organization_MilestonesQuery
     *
     * @param vars - variables to pass into the Viewer_Organization_MilestonesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Viewer_Organization_MilestonesQuery
     */
    async milestones(
      vars?: D.Viewer_Organization_MilestonesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Viewer_Organization_MilestonesDocument>> {
      return requester<D.Viewer_Organization_MilestonesQuery, D.Viewer_Organization_MilestonesQueryVariables>(
        D.Viewer_Organization_MilestonesDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Viewer_Organization_IntegrationsQuery
     *
     * @param vars - variables to pass into the Viewer_Organization_IntegrationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Viewer_Organization_IntegrationsQuery
     */
    async integrations(
      vars?: D.Viewer_Organization_IntegrationsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Viewer_Organization_IntegrationsDocument>> {
      return requester<D.Viewer_Organization_IntegrationsQuery, D.Viewer_Organization_IntegrationsQueryVariables>(
        D.Viewer_Organization_IntegrationsDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Viewer_Organization_SubscriptionQuery
     *
     * @param vars - variables to pass into the Viewer_Organization_SubscriptionQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Viewer_Organization_SubscriptionQuery
     */
    async subscription(
      vars?: D.Viewer_Organization_SubscriptionQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Viewer_Organization_SubscriptionDocument>> {
      return requester<D.Viewer_Organization_SubscriptionQuery, D.Viewer_Organization_SubscriptionQueryVariables>(
        D.Viewer_Organization_SubscriptionDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Viewer_TeamMembershipsQuery
     *
     * @param vars - variables to pass into the Viewer_TeamMembershipsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Viewer_TeamMembershipsQuery
     */
    async teamMemberships(
      vars?: D.Viewer_TeamMembershipsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Viewer_TeamMembershipsDocument>> {
      return requester<D.Viewer_TeamMembershipsQuery, D.Viewer_TeamMembershipsQueryVariables>(
        D.Viewer_TeamMembershipsDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the OrganizationQuery
     *
     * @param vars - variables to pass into the OrganizationQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationQuery
     */
    async organization(
      vars?: D.OrganizationQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationDocument>["organization"]> {
      const response = await requester<D.OrganizationQuery, D.OrganizationQueryVariables>(
        D.OrganizationDocument,
        vars,
        opts
      );
      return {
        ...response?.organization,
      };
    },
    /**
     * Call the Linear api with the Organization_UsersQuery
     *
     * @param vars - variables to pass into the Organization_UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Organization_UsersQuery
     */
    async users(
      vars?: D.Organization_UsersQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Organization_UsersDocument>> {
      return requester<D.Organization_UsersQuery, D.Organization_UsersQueryVariables>(
        D.Organization_UsersDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Organization_TeamsQuery
     *
     * @param vars - variables to pass into the Organization_TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Organization_TeamsQuery
     */
    async teams(
      vars?: D.Organization_TeamsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Organization_TeamsDocument>> {
      return requester<D.Organization_TeamsQuery, D.Organization_TeamsQueryVariables>(
        D.Organization_TeamsDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Organization_MilestonesQuery
     *
     * @param vars - variables to pass into the Organization_MilestonesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Organization_MilestonesQuery
     */
    async milestones(
      vars?: D.Organization_MilestonesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Organization_MilestonesDocument>> {
      return requester<D.Organization_MilestonesQuery, D.Organization_MilestonesQueryVariables>(
        D.Organization_MilestonesDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Organization_IntegrationsQuery
     *
     * @param vars - variables to pass into the Organization_IntegrationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Organization_IntegrationsQuery
     */
    async integrations(
      vars?: D.Organization_IntegrationsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Organization_IntegrationsDocument>> {
      return requester<D.Organization_IntegrationsQuery, D.Organization_IntegrationsQueryVariables>(
        D.Organization_IntegrationsDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Organization_SubscriptionQuery
     *
     * @param vars - variables to pass into the Organization_SubscriptionQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Organization_SubscriptionQuery
     */
    async subscription(
      vars?: D.Organization_SubscriptionQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Organization_SubscriptionDocument>> {
      return requester<D.Organization_SubscriptionQuery, D.Organization_SubscriptionQueryVariables>(
        D.Organization_SubscriptionDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the OrganizationExistsQuery
     *
     * @param vars - variables to pass into the OrganizationExistsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationExistsQuery
     */
    async organizationExists(
      vars: D.OrganizationExistsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationExistsDocument>["organizationExists"]> {
      const response = await requester<D.OrganizationExistsQuery, D.OrganizationExistsQueryVariables>(
        D.OrganizationExistsDocument,
        vars,
        opts
      );
      return {
        ...response?.organizationExists,
      };
    },
    /**
     * Call the Linear api with the SyncBootstrapQuery
     *
     * @param vars - variables to pass into the SyncBootstrapQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the SyncBootstrapQuery
     */
    async syncBootstrap(
      vars: D.SyncBootstrapQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.SyncBootstrapDocument>["syncBootstrap"]> {
      const response = await requester<D.SyncBootstrapQuery, D.SyncBootstrapQueryVariables>(
        D.SyncBootstrapDocument,
        vars,
        opts
      );
      return {
        ...response?.syncBootstrap,
      };
    },
    /**
     * Call the Linear api with the SyncUpdatesQuery
     *
     * @param vars - variables to pass into the SyncUpdatesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the SyncUpdatesQuery
     */
    async syncUpdates(
      vars: D.SyncUpdatesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.SyncUpdatesDocument>["syncUpdates"]> {
      const response = await requester<D.SyncUpdatesQuery, D.SyncUpdatesQueryVariables>(
        D.SyncUpdatesDocument,
        vars,
        opts
      );
      return {
        ...response?.syncUpdates,
      };
    },
    /**
     * Call the Linear api with the ArchivedModelSyncQuery
     *
     * @param vars - variables to pass into the ArchivedModelSyncQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ArchivedModelSyncQuery
     */
    async archivedModelSync(
      vars: D.ArchivedModelSyncQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.ArchivedModelSyncDocument>["archivedModelSync"]> {
      const response = await requester<D.ArchivedModelSyncQuery, D.ArchivedModelSyncQueryVariables>(
        D.ArchivedModelSyncDocument,
        vars,
        opts
      );
      return {
        ...response?.archivedModelSync,
      };
    },
    /**
     * Call the Linear api with the ArchivedModelsSyncQuery
     *
     * @param vars - variables to pass into the ArchivedModelsSyncQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ArchivedModelsSyncQuery
     */
    async archivedModelsSync(
      vars: D.ArchivedModelsSyncQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.ArchivedModelsSyncDocument>["archivedModelsSync"]> {
      const response = await requester<D.ArchivedModelsSyncQuery, D.ArchivedModelsSyncQueryVariables>(
        D.ArchivedModelsSyncDocument,
        vars,
        opts
      );
      return {
        ...response?.archivedModelsSync,
      };
    },
    /**
     * Call the Linear api with the AdminUserAccountLookupQuery
     *
     * @param id - id to pass into the AdminUserAccountLookupQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookupQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookupQuery
     */
    async adminUserAccountLookup(
      id: string,
      vars?: Omit<D.AdminUserAccountLookupQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookupDocument>["adminUserAccountLookup"]> {
      const response = await requester<D.AdminUserAccountLookupQuery, D.AdminUserAccountLookupQueryVariables>(
        D.AdminUserAccountLookupDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.adminUserAccountLookup,
      };
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_UsersQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_UsersQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_UsersQuery
     */
    async users(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_UsersQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookup_UsersDocument>> {
      return requester<D.AdminUserAccountLookup_UsersQuery, D.AdminUserAccountLookup_UsersQueryVariables>(
        D.AdminUserAccountLookup_UsersDocument,
        { id, ...vars },
        opts
      );
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_SettingsQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_SettingsQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_SettingsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_SettingsQuery
     */
    async settings(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_Users_SettingsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookup_Users_SettingsDocument>> {
      return requester<
        D.AdminUserAccountLookup_Users_SettingsQuery,
        D.AdminUserAccountLookup_Users_SettingsQueryVariables
      >(D.AdminUserAccountLookup_Users_SettingsDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_AssignedIssuesQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_AssignedIssuesQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_AssignedIssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_AssignedIssuesQuery
     */
    async assignedIssues(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_Users_AssignedIssuesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookup_Users_AssignedIssuesDocument>> {
      return requester<
        D.AdminUserAccountLookup_Users_AssignedIssuesQuery,
        D.AdminUserAccountLookup_Users_AssignedIssuesQueryVariables
      >(D.AdminUserAccountLookup_Users_AssignedIssuesDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_CreatedIssuesQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_CreatedIssuesQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_CreatedIssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_CreatedIssuesQuery
     */
    async createdIssues(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_Users_CreatedIssuesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookup_Users_CreatedIssuesDocument>> {
      return requester<
        D.AdminUserAccountLookup_Users_CreatedIssuesQuery,
        D.AdminUserAccountLookup_Users_CreatedIssuesQueryVariables
      >(D.AdminUserAccountLookup_Users_CreatedIssuesDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_OrganizationQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_OrganizationQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_OrganizationQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_OrganizationQuery
     */
    async organization(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_Users_OrganizationQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookup_Users_OrganizationDocument>> {
      return requester<
        D.AdminUserAccountLookup_Users_OrganizationQuery,
        D.AdminUserAccountLookup_Users_OrganizationQueryVariables
      >(D.AdminUserAccountLookup_Users_OrganizationDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_Organization_UsersQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_Organization_UsersQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_Organization_UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_Organization_UsersQuery
     */
    async users(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_Users_Organization_UsersQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookup_Users_Organization_UsersDocument>> {
      return requester<
        D.AdminUserAccountLookup_Users_Organization_UsersQuery,
        D.AdminUserAccountLookup_Users_Organization_UsersQueryVariables
      >(D.AdminUserAccountLookup_Users_Organization_UsersDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_Organization_TeamsQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_Organization_TeamsQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_Organization_TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_Organization_TeamsQuery
     */
    async teams(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_Users_Organization_TeamsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookup_Users_Organization_TeamsDocument>> {
      return requester<
        D.AdminUserAccountLookup_Users_Organization_TeamsQuery,
        D.AdminUserAccountLookup_Users_Organization_TeamsQueryVariables
      >(D.AdminUserAccountLookup_Users_Organization_TeamsDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_Organization_MilestonesQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_Organization_MilestonesQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_Organization_MilestonesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_Organization_MilestonesQuery
     */
    async milestones(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_Users_Organization_MilestonesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookup_Users_Organization_MilestonesDocument>> {
      return requester<
        D.AdminUserAccountLookup_Users_Organization_MilestonesQuery,
        D.AdminUserAccountLookup_Users_Organization_MilestonesQueryVariables
      >(D.AdminUserAccountLookup_Users_Organization_MilestonesDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_Organization_IntegrationsQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_Organization_IntegrationsQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_Organization_IntegrationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_Organization_IntegrationsQuery
     */
    async integrations(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_Users_Organization_IntegrationsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookup_Users_Organization_IntegrationsDocument>> {
      return requester<
        D.AdminUserAccountLookup_Users_Organization_IntegrationsQuery,
        D.AdminUserAccountLookup_Users_Organization_IntegrationsQueryVariables
      >(D.AdminUserAccountLookup_Users_Organization_IntegrationsDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_Organization_SubscriptionQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_Organization_SubscriptionQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_Organization_SubscriptionQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_Organization_SubscriptionQuery
     */
    async subscription(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_Users_Organization_SubscriptionQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookup_Users_Organization_SubscriptionDocument>> {
      return requester<
        D.AdminUserAccountLookup_Users_Organization_SubscriptionQuery,
        D.AdminUserAccountLookup_Users_Organization_SubscriptionQueryVariables
      >(D.AdminUserAccountLookup_Users_Organization_SubscriptionDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_Organization_Subscription_OrganizationQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_Organization_Subscription_OrganizationQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_Organization_Subscription_OrganizationQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_Organization_Subscription_OrganizationQuery
     */
    async organization(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_Users_Organization_Subscription_OrganizationQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookup_Users_Organization_Subscription_OrganizationDocument>> {
      return requester<
        D.AdminUserAccountLookup_Users_Organization_Subscription_OrganizationQuery,
        D.AdminUserAccountLookup_Users_Organization_Subscription_OrganizationQueryVariables
      >(D.AdminUserAccountLookup_Users_Organization_Subscription_OrganizationDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_Organization_Subscription_Organization_UsersQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_Organization_Subscription_Organization_UsersQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_Organization_Subscription_Organization_UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_Organization_Subscription_Organization_UsersQuery
     */
    async users(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_UsersQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_UsersDocument>> {
      return requester<
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_UsersQuery,
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_UsersQueryVariables
      >(D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_UsersDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_Organization_Subscription_Organization_TeamsQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_Organization_Subscription_Organization_TeamsQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_Organization_Subscription_Organization_TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_Organization_Subscription_Organization_TeamsQuery
     */
    async teams(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_TeamsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_TeamsDocument>> {
      return requester<
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_TeamsQuery,
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_TeamsQueryVariables
      >(D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_TeamsDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_Organization_Subscription_Organization_MilestonesQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_Organization_Subscription_Organization_MilestonesQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_Organization_Subscription_Organization_MilestonesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_Organization_Subscription_Organization_MilestonesQuery
     */
    async milestones(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_MilestonesQueryVariables, "id">,
      opts?: O
    ): Promise<
      ResultOf<typeof D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_MilestonesDocument>
    > {
      return requester<
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_MilestonesQuery,
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_MilestonesQueryVariables
      >(
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_MilestonesDocument,
        { id, ...vars },
        opts
      );
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_Organization_Subscription_Organization_IntegrationsQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_Organization_Subscription_Organization_IntegrationsQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_Organization_Subscription_Organization_IntegrationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_Organization_Subscription_Organization_IntegrationsQuery
     */
    async integrations(
      id: string,
      vars?: Omit<
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_IntegrationsQueryVariables,
        "id"
      >,
      opts?: O
    ): Promise<
      ResultOf<typeof D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_IntegrationsDocument>
    > {
      return requester<
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_IntegrationsQuery,
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_IntegrationsQueryVariables
      >(
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_IntegrationsDocument,
        { id, ...vars },
        opts
      );
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_Organization_Subscription_Organization_SubscriptionQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_Organization_Subscription_Organization_SubscriptionQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_Organization_Subscription_Organization_SubscriptionQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_Organization_Subscription_Organization_SubscriptionQuery
     */
    async subscription(
      id: string,
      vars?: Omit<
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_SubscriptionQueryVariables,
        "id"
      >,
      opts?: O
    ): Promise<
      ResultOf<typeof D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_SubscriptionDocument>
    > {
      return requester<
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_SubscriptionQuery,
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_SubscriptionQueryVariables
      >(
        D.AdminUserAccountLookup_Users_Organization_Subscription_Organization_SubscriptionDocument,
        { id, ...vars },
        opts
      );
    },
    /**
     * Call the Linear api with the AdminUserAccountLookup_Users_TeamMembershipsQuery
     *
     * @param id - id to pass into the AdminUserAccountLookup_Users_TeamMembershipsQuery
     * @param vars - variables without undefined id to pass into the AdminUserAccountLookup_Users_TeamMembershipsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountLookup_Users_TeamMembershipsQuery
     */
    async teamMemberships(
      id: string,
      vars?: Omit<D.AdminUserAccountLookup_Users_TeamMembershipsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminUserAccountLookup_Users_TeamMembershipsDocument>> {
      return requester<
        D.AdminUserAccountLookup_Users_TeamMembershipsQuery,
        D.AdminUserAccountLookup_Users_TeamMembershipsQueryVariables
      >(D.AdminUserAccountLookup_Users_TeamMembershipsDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the UsersQuery
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
     * Call the Linear api with the ApiKeysQuery
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
     * Call the Linear api with the ApplicationQuery
     *
     * @param vars - variables to pass into the ApplicationQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ApplicationQuery
     */
    async application(
      vars: D.ApplicationQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.ApplicationDocument>["application"]> {
      const response = await requester<D.ApplicationQuery, D.ApplicationQueryVariables>(
        D.ApplicationDocument,
        vars,
        opts
      );
      return {
        ...response?.application,
      };
    },
    /**
     * Call the Linear api with the AuthorizedApplicationsQuery
     *
     * @param vars - variables to pass into the AuthorizedApplicationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AuthorizedApplicationsQuery
     */
    async authorizedApplications(
      vars?: D.AuthorizedApplicationsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.AuthorizedApplicationsDocument>["authorizedApplications"]> {
      const response = await requester<D.AuthorizedApplicationsQuery, D.AuthorizedApplicationsQueryVariables>(
        D.AuthorizedApplicationsDocument,
        vars,
        opts
      );
      return {
        ...response?.authorizedApplications,
      };
    },
    /**
     * Call the Linear api with the AvailableUsersQuery
     *
     * @param vars - variables to pass into the AvailableUsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AvailableUsersQuery
     */
    async availableUsers(
      vars?: D.AvailableUsersQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.AvailableUsersDocument>["availableUsers"]> {
      const response = await requester<D.AvailableUsersQuery, D.AvailableUsersQueryVariables>(
        D.AvailableUsersDocument,
        vars,
        opts
      );
      return {
        ...response?.availableUsers,
      };
    },
    /**
     * Call the Linear api with the AvailableUsers_AvailableOrganizationsQuery
     *
     * @param vars - variables to pass into the AvailableUsers_AvailableOrganizationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AvailableUsers_AvailableOrganizationsQuery
     */
    async availableOrganizations(
      vars?: D.AvailableUsers_AvailableOrganizationsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.AvailableUsers_AvailableOrganizationsDocument>> {
      return requester<
        D.AvailableUsers_AvailableOrganizationsQuery,
        D.AvailableUsers_AvailableOrganizationsQueryVariables
      >(D.AvailableUsers_AvailableOrganizationsDocument, vars, opts);
    },
    /**
     * Call the Linear api with the AvailableUsers_AvailableOrganizations_UsersQuery
     *
     * @param vars - variables to pass into the AvailableUsers_AvailableOrganizations_UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AvailableUsers_AvailableOrganizations_UsersQuery
     */
    async users(
      vars?: D.AvailableUsers_AvailableOrganizations_UsersQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.AvailableUsers_AvailableOrganizations_UsersDocument>> {
      return requester<
        D.AvailableUsers_AvailableOrganizations_UsersQuery,
        D.AvailableUsers_AvailableOrganizations_UsersQueryVariables
      >(D.AvailableUsers_AvailableOrganizations_UsersDocument, vars, opts);
    },
    /**
     * Call the Linear api with the AvailableUsers_AvailableOrganizations_TeamsQuery
     *
     * @param vars - variables to pass into the AvailableUsers_AvailableOrganizations_TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AvailableUsers_AvailableOrganizations_TeamsQuery
     */
    async teams(
      vars?: D.AvailableUsers_AvailableOrganizations_TeamsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.AvailableUsers_AvailableOrganizations_TeamsDocument>> {
      return requester<
        D.AvailableUsers_AvailableOrganizations_TeamsQuery,
        D.AvailableUsers_AvailableOrganizations_TeamsQueryVariables
      >(D.AvailableUsers_AvailableOrganizations_TeamsDocument, vars, opts);
    },
    /**
     * Call the Linear api with the AvailableUsers_AvailableOrganizations_MilestonesQuery
     *
     * @param vars - variables to pass into the AvailableUsers_AvailableOrganizations_MilestonesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AvailableUsers_AvailableOrganizations_MilestonesQuery
     */
    async milestones(
      vars?: D.AvailableUsers_AvailableOrganizations_MilestonesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.AvailableUsers_AvailableOrganizations_MilestonesDocument>> {
      return requester<
        D.AvailableUsers_AvailableOrganizations_MilestonesQuery,
        D.AvailableUsers_AvailableOrganizations_MilestonesQueryVariables
      >(D.AvailableUsers_AvailableOrganizations_MilestonesDocument, vars, opts);
    },
    /**
     * Call the Linear api with the AvailableUsers_AvailableOrganizations_IntegrationsQuery
     *
     * @param vars - variables to pass into the AvailableUsers_AvailableOrganizations_IntegrationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AvailableUsers_AvailableOrganizations_IntegrationsQuery
     */
    async integrations(
      vars?: D.AvailableUsers_AvailableOrganizations_IntegrationsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.AvailableUsers_AvailableOrganizations_IntegrationsDocument>> {
      return requester<
        D.AvailableUsers_AvailableOrganizations_IntegrationsQuery,
        D.AvailableUsers_AvailableOrganizations_IntegrationsQueryVariables
      >(D.AvailableUsers_AvailableOrganizations_IntegrationsDocument, vars, opts);
    },
    /**
     * Call the Linear api with the AvailableUsers_AvailableOrganizations_SubscriptionQuery
     *
     * @param vars - variables to pass into the AvailableUsers_AvailableOrganizations_SubscriptionQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the AvailableUsers_AvailableOrganizations_SubscriptionQuery
     */
    async subscription(
      vars?: D.AvailableUsers_AvailableOrganizations_SubscriptionQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.AvailableUsers_AvailableOrganizations_SubscriptionDocument>> {
      return requester<
        D.AvailableUsers_AvailableOrganizations_SubscriptionQuery,
        D.AvailableUsers_AvailableOrganizations_SubscriptionQueryVariables
      >(D.AvailableUsers_AvailableOrganizations_SubscriptionDocument, vars, opts);
    },
    /**
     * Call the Linear api with the SsoUrlFromEmailQuery
     *
     * @param vars - variables to pass into the SsoUrlFromEmailQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the SsoUrlFromEmailQuery
     */
    async ssoUrlFromEmail(
      vars: D.SsoUrlFromEmailQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.SsoUrlFromEmailDocument>["ssoUrlFromEmail"]> {
      const response = await requester<D.SsoUrlFromEmailQuery, D.SsoUrlFromEmailQueryVariables>(
        D.SsoUrlFromEmailDocument,
        vars,
        opts
      );
      return {
        ...response?.ssoUrlFromEmail,
      };
    },
    /**
     * Call the Linear api with the BillingDetailsQuery
     *
     * @param vars - variables to pass into the BillingDetailsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the BillingDetailsQuery
     */
    async billingDetails(
      vars?: D.BillingDetailsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.BillingDetailsDocument>["billingDetails"]> {
      const response = await requester<D.BillingDetailsQuery, D.BillingDetailsQueryVariables>(
        D.BillingDetailsDocument,
        vars,
        opts
      );
      return {
        ...response?.billingDetails,
      };
    },
    /**
     * Call the Linear api with the BillingDetails_InvoicesQuery
     *
     * @param vars - variables to pass into the BillingDetails_InvoicesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the BillingDetails_InvoicesQuery
     */
    async invoices(
      vars?: D.BillingDetails_InvoicesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.BillingDetails_InvoicesDocument>> {
      return requester<D.BillingDetails_InvoicesQuery, D.BillingDetails_InvoicesQueryVariables>(
        D.BillingDetails_InvoicesDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the BillingDetails_PaymentMethodQuery
     *
     * @param vars - variables to pass into the BillingDetails_PaymentMethodQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the BillingDetails_PaymentMethodQuery
     */
    async paymentMethod(
      vars?: D.BillingDetails_PaymentMethodQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.BillingDetails_PaymentMethodDocument>> {
      return requester<D.BillingDetails_PaymentMethodQuery, D.BillingDetails_PaymentMethodQueryVariables>(
        D.BillingDetails_PaymentMethodDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the CollaborativeDocumentJoinQuery
     *
     * @param vars - variables to pass into the CollaborativeDocumentJoinQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the CollaborativeDocumentJoinQuery
     */
    async collaborativeDocumentJoin(
      vars: D.CollaborativeDocumentJoinQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.CollaborativeDocumentJoinDocument>["collaborativeDocumentJoin"]> {
      const response = await requester<D.CollaborativeDocumentJoinQuery, D.CollaborativeDocumentJoinQueryVariables>(
        D.CollaborativeDocumentJoinDocument,
        vars,
        opts
      );
      return {
        ...response?.collaborativeDocumentJoin,
      };
    },
    /**
     * Call the Linear api with the CollaborativeDocumentJoin_StepsQuery
     *
     * @param vars - variables to pass into the CollaborativeDocumentJoin_StepsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the CollaborativeDocumentJoin_StepsQuery
     */
    async steps(
      vars: D.CollaborativeDocumentJoin_StepsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.CollaborativeDocumentJoin_StepsDocument>> {
      return requester<D.CollaborativeDocumentJoin_StepsQuery, D.CollaborativeDocumentJoin_StepsQueryVariables>(
        D.CollaborativeDocumentJoin_StepsDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the CommentQuery
     *
     * @param id - id to pass into the CommentQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the CommentQuery
     */
    async comment(id: string, opts?: O): Promise<ResultOf<typeof D.CommentDocument>["comment"] & LinearSdkComment> {
      const response = await requester<D.CommentQuery, D.CommentQueryVariables>(D.CommentDocument, { id }, opts);
      return {
        ...response?.comment,
        ...createLinearSdkComment(id, requester),
      };
    },
    /**
     * Call the Linear api with the CommentsQuery
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
     * Call the Linear api with the CustomViewQuery
     *
     * @param id - id to pass into the CustomViewQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomViewQuery
     */
    async customView(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.CustomViewDocument>["customView"] & LinearSdkCustomView> {
      const response = await requester<D.CustomViewQuery, D.CustomViewQueryVariables>(
        D.CustomViewDocument,
        { id },
        opts
      );
      return {
        ...response?.customView,
        ...createLinearSdkCustomView(id, requester),
      };
    },
    /**
     * Call the Linear api with the CustomViewsQuery
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
     * Call the Linear api with the CycleQuery
     *
     * @param id - id to pass into the CycleQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the CycleQuery
     */
    async cycle(id: string, opts?: O): Promise<ResultOf<typeof D.CycleDocument>["cycle"] & LinearSdkCycle> {
      const response = await requester<D.CycleQuery, D.CycleQueryVariables>(D.CycleDocument, { id }, opts);
      return {
        ...response?.cycle,
        ...createLinearSdkCycle(id, requester),
      };
    },
    /**
     * Call the Linear api with the CyclesQuery
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
     * Call the Linear api with the EmojiQuery
     *
     * @param id - id to pass into the EmojiQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the EmojiQuery
     */
    async emoji(id: string, opts?: O): Promise<ResultOf<typeof D.EmojiDocument>["emoji"] & LinearSdkEmoji> {
      const response = await requester<D.EmojiQuery, D.EmojiQueryVariables>(D.EmojiDocument, { id }, opts);
      return {
        ...response?.emoji,
        ...createLinearSdkEmoji(id, requester),
      };
    },
    /**
     * Call the Linear api with the EmojisQuery
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
     * Call the Linear api with the FavoriteQuery
     *
     * @param id - id to pass into the FavoriteQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the FavoriteQuery
     */
    async favorite(id: string, opts?: O): Promise<ResultOf<typeof D.FavoriteDocument>["favorite"] & LinearSdkFavorite> {
      const response = await requester<D.FavoriteQuery, D.FavoriteQueryVariables>(D.FavoriteDocument, { id }, opts);
      return {
        ...response?.favorite,
        ...createLinearSdkFavorite(id, requester),
      };
    },
    /**
     * Call the Linear api with the FavoritesQuery
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
     * Call the Linear api with the FigmaEmbedInfoQuery
     *
     * @param vars - variables to pass into the FigmaEmbedInfoQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the FigmaEmbedInfoQuery
     */
    async figmaEmbedInfo(
      vars: D.FigmaEmbedInfoQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.FigmaEmbedInfoDocument>["figmaEmbedInfo"]> {
      const response = await requester<D.FigmaEmbedInfoQuery, D.FigmaEmbedInfoQueryVariables>(
        D.FigmaEmbedInfoDocument,
        vars,
        opts
      );
      return {
        ...response?.figmaEmbedInfo,
      };
    },
    /**
     * Call the Linear api with the FigmaEmbedInfo_FigmaEmbedQuery
     *
     * @param vars - variables to pass into the FigmaEmbedInfo_FigmaEmbedQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the FigmaEmbedInfo_FigmaEmbedQuery
     */
    async figmaEmbed(
      vars: D.FigmaEmbedInfo_FigmaEmbedQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.FigmaEmbedInfo_FigmaEmbedDocument>> {
      return requester<D.FigmaEmbedInfo_FigmaEmbedQuery, D.FigmaEmbedInfo_FigmaEmbedQueryVariables>(
        D.FigmaEmbedInfo_FigmaEmbedDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the IntegrationQuery
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
        ...createLinearSdkIntegration(id, requester),
      };
    },
    /**
     * Call the Linear api with the IntegrationsQuery
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
     * Call the Linear api with the IntegrationResourceQuery
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
        ...createLinearSdkIntegrationResource(id, requester),
      };
    },
    /**
     * Call the Linear api with the IntegrationResourcesQuery
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
     * Call the Linear api with the InviteInfoQuery
     *
     * @param vars - variables to pass into the InviteInfoQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the InviteInfoQuery
     */
    async inviteInfo(
      vars: D.InviteInfoQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.InviteInfoDocument>["inviteInfo"]> {
      const response = await requester<D.InviteInfoQuery, D.InviteInfoQueryVariables>(D.InviteInfoDocument, vars, opts);
      return {
        ...response?.inviteInfo,
      };
    },
    /**
     * Call the Linear api with the InviteInfo_InviteDataQuery
     *
     * @param vars - variables to pass into the InviteInfo_InviteDataQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the InviteInfo_InviteDataQuery
     */
    async inviteData(
      vars: D.InviteInfo_InviteDataQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.InviteInfo_InviteDataDocument>> {
      return requester<D.InviteInfo_InviteDataQuery, D.InviteInfo_InviteDataQueryVariables>(
        D.InviteInfo_InviteDataDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the IssueLabelQuery
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
        ...createLinearSdkIssueLabel(id, requester),
      };
    },
    /**
     * Call the Linear api with the IssueLabelsQuery
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
     * Call the Linear api with the IssueRelationQuery
     *
     * @param id - id to pass into the IssueRelationQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueRelationQuery
     */
    async issueRelation(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueRelationDocument>["issueRelation"] & LinearSdkIssueRelation> {
      const response = await requester<D.IssueRelationQuery, D.IssueRelationQueryVariables>(
        D.IssueRelationDocument,
        { id },
        opts
      );
      return {
        ...response?.issueRelation,
        ...createLinearSdkIssueRelation(id, requester),
      };
    },
    /**
     * Call the Linear api with the IssueRelationsQuery
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
     * Call the Linear api with the IssueQuery
     *
     * @param id - id to pass into the IssueQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueQuery
     */
    async issue(id: string, opts?: O): Promise<ResultOf<typeof D.IssueDocument>["issue"] & LinearSdkIssue> {
      const response = await requester<D.IssueQuery, D.IssueQueryVariables>(D.IssueDocument, { id }, opts);
      return {
        ...response?.issue,
        ...createLinearSdkIssue(id, requester),
      };
    },
    /**
     * Call the Linear api with the IssueSearchQuery
     *
     * @param vars - variables to pass into the IssueSearchQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueSearchQuery
     */
    async issueSearch(
      vars: D.IssueSearchQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueSearchDocument>["issueSearch"]> {
      const response = await requester<D.IssueSearchQuery, D.IssueSearchQueryVariables>(
        D.IssueSearchDocument,
        vars,
        opts
      );
      return {
        ...response?.issueSearch,
      };
    },
    /**
     * Call the Linear api with the IssuesQuery
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
     * Call the Linear api with the MilestoneQuery
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
        ...createLinearSdkMilestone(id, requester),
      };
    },
    /**
     * Call the Linear api with the MilestonesQuery
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
     * Call the Linear api with the NotificationQuery
     *
     * @param vars - variables to pass into the NotificationQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationQuery
     */
    async notification(
      vars?: D.NotificationQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationDocument>["notification"]> {
      const response = await requester<D.NotificationQuery, D.NotificationQueryVariables>(
        D.NotificationDocument,
        vars,
        opts
      );
      return {
        ...response?.notification,
      };
    },
    /**
     * Call the Linear api with the NotificationsQuery
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
     * Call the Linear api with the NotificationSubscriptionQuery
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
     * Call the Linear api with the OrganizationInviteQuery
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
        ...createLinearSdkOrganizationInvite(id, requester),
      };
    },
    /**
     * Call the Linear api with the OrganizationInvitesQuery
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
     * Call the Linear api with the ProjectLinkQuery
     *
     * @param id - id to pass into the ProjectLinkQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectLinkQuery
     */
    async projectLink(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.ProjectLinkDocument>["projectLink"] & LinearSdkProjectLink> {
      const response = await requester<D.ProjectLinkQuery, D.ProjectLinkQueryVariables>(
        D.ProjectLinkDocument,
        { id },
        opts
      );
      return {
        ...response?.projectLink,
        ...createLinearSdkProjectLink(id, requester),
      };
    },
    /**
     * Call the Linear api with the ProjectLinksQuery
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
     * Call the Linear api with the ProjectQuery
     *
     * @param id - id to pass into the ProjectQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectQuery
     */
    async project(id: string, opts?: O): Promise<ResultOf<typeof D.ProjectDocument>["project"] & LinearSdkProject> {
      const response = await requester<D.ProjectQuery, D.ProjectQueryVariables>(D.ProjectDocument, { id }, opts);
      return {
        ...response?.project,
        ...createLinearSdkProject(id, requester),
      };
    },
    /**
     * Call the Linear api with the ProjectsQuery
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
     * Call the Linear api with the PushSubscriptionTestQuery
     *
     * @param vars - variables to pass into the PushSubscriptionTestQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the PushSubscriptionTestQuery
     */
    async pushSubscriptionTest(
      vars?: D.PushSubscriptionTestQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.PushSubscriptionTestDocument>["pushSubscriptionTest"]> {
      const response = await requester<D.PushSubscriptionTestQuery, D.PushSubscriptionTestQueryVariables>(
        D.PushSubscriptionTestDocument,
        vars,
        opts
      );
      return {
        ...response?.pushSubscriptionTest,
      };
    },
    /**
     * Call the Linear api with the ReactionQuery
     *
     * @param id - id to pass into the ReactionQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the ReactionQuery
     */
    async reaction(id: string, opts?: O): Promise<ResultOf<typeof D.ReactionDocument>["reaction"] & LinearSdkReaction> {
      const response = await requester<D.ReactionQuery, D.ReactionQueryVariables>(D.ReactionDocument, { id }, opts);
      return {
        ...response?.reaction,
        ...createLinearSdkReaction(id, requester),
      };
    },
    /**
     * Call the Linear api with the ReactionsQuery
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
     * Call the Linear api with the SubscriptionQuery
     *
     * @param vars - variables to pass into the SubscriptionQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the SubscriptionQuery
     */
    async subscription(
      vars?: D.SubscriptionQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.SubscriptionDocument>["subscription"]> {
      const response = await requester<D.SubscriptionQuery, D.SubscriptionQueryVariables>(
        D.SubscriptionDocument,
        vars,
        opts
      );
      return {
        ...response?.subscription,
      };
    },
    /**
     * Call the Linear api with the Subscription_OrganizationQuery
     *
     * @param vars - variables to pass into the Subscription_OrganizationQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Subscription_OrganizationQuery
     */
    async organization(
      vars?: D.Subscription_OrganizationQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Subscription_OrganizationDocument>> {
      return requester<D.Subscription_OrganizationQuery, D.Subscription_OrganizationQueryVariables>(
        D.Subscription_OrganizationDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Subscription_Organization_UsersQuery
     *
     * @param vars - variables to pass into the Subscription_Organization_UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Subscription_Organization_UsersQuery
     */
    async users(
      vars?: D.Subscription_Organization_UsersQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Subscription_Organization_UsersDocument>> {
      return requester<D.Subscription_Organization_UsersQuery, D.Subscription_Organization_UsersQueryVariables>(
        D.Subscription_Organization_UsersDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Subscription_Organization_TeamsQuery
     *
     * @param vars - variables to pass into the Subscription_Organization_TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Subscription_Organization_TeamsQuery
     */
    async teams(
      vars?: D.Subscription_Organization_TeamsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Subscription_Organization_TeamsDocument>> {
      return requester<D.Subscription_Organization_TeamsQuery, D.Subscription_Organization_TeamsQueryVariables>(
        D.Subscription_Organization_TeamsDocument,
        vars,
        opts
      );
    },
    /**
     * Call the Linear api with the Subscription_Organization_MilestonesQuery
     *
     * @param vars - variables to pass into the Subscription_Organization_MilestonesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Subscription_Organization_MilestonesQuery
     */
    async milestones(
      vars?: D.Subscription_Organization_MilestonesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Subscription_Organization_MilestonesDocument>> {
      return requester<
        D.Subscription_Organization_MilestonesQuery,
        D.Subscription_Organization_MilestonesQueryVariables
      >(D.Subscription_Organization_MilestonesDocument, vars, opts);
    },
    /**
     * Call the Linear api with the Subscription_Organization_IntegrationsQuery
     *
     * @param vars - variables to pass into the Subscription_Organization_IntegrationsQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the Subscription_Organization_IntegrationsQuery
     */
    async integrations(
      vars?: D.Subscription_Organization_IntegrationsQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.Subscription_Organization_IntegrationsDocument>> {
      return requester<
        D.Subscription_Organization_IntegrationsQuery,
        D.Subscription_Organization_IntegrationsQueryVariables
      >(D.Subscription_Organization_IntegrationsDocument, vars, opts);
    },
    /**
     * Call the Linear api with the TeamMembershipQuery
     *
     * @param id - id to pass into the TeamMembershipQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamMembershipQuery
     */
    async teamMembership(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamMembershipDocument>["teamMembership"] & LinearSdkTeamMembership> {
      const response = await requester<D.TeamMembershipQuery, D.TeamMembershipQueryVariables>(
        D.TeamMembershipDocument,
        { id },
        opts
      );
      return {
        ...response?.teamMembership,
        ...createLinearSdkTeamMembership(id, requester),
      };
    },
    /**
     * Call the Linear api with the TeamMembershipsQuery
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
     * Call the Linear api with the TeamQuery
     *
     * @param id - id to pass into the TeamQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamQuery
     */
    async team(id: string, opts?: O): Promise<ResultOf<typeof D.TeamDocument>["team"] & LinearSdkTeam> {
      const response = await requester<D.TeamQuery, D.TeamQueryVariables>(D.TeamDocument, { id }, opts);
      return {
        ...response?.team,
        ...createLinearSdkTeam(id, requester),
      };
    },
    /**
     * Call the Linear api with the TeamsQuery
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
     * Call the Linear api with the TemplatesQuery
     *
     * @param vars - variables to pass into the TemplatesQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the TemplatesQuery
     */
    async templates(
      vars?: D.TemplatesQueryVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.TemplatesDocument>["templates"]> {
      const response = await requester<D.TemplatesQuery, D.TemplatesQueryVariables>(D.TemplatesDocument, vars, opts);
      return {
        ...response?.templates,
      };
    },
    /**
     * Call the Linear api with the TemplateQuery
     *
     * @param id - id to pass into the TemplateQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the TemplateQuery
     */
    async template(id: string, opts?: O): Promise<ResultOf<typeof D.TemplateDocument>["template"] & LinearSdkTemplate> {
      const response = await requester<D.TemplateQuery, D.TemplateQueryVariables>(D.TemplateDocument, { id }, opts);
      return {
        ...response?.template,
        ...createLinearSdkTemplate(id, requester),
      };
    },
    /**
     * Call the Linear api with the ViewPreferencesQuery
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
     * Call the Linear api with the WebhookQuery
     *
     * @param id - id to pass into the WebhookQuery
     * @param opts - options to pass to the graphql client
     * @returns The result of the WebhookQuery
     */
    async webhook(id: string, opts?: O): Promise<ResultOf<typeof D.WebhookDocument>["webhook"] & LinearSdkWebhook> {
      const response = await requester<D.WebhookQuery, D.WebhookQueryVariables>(D.WebhookDocument, { id }, opts);
      return {
        ...response?.webhook,
        ...createLinearSdkWebhook(id, requester),
      };
    },
    /**
     * Call the Linear api with the WebhooksQuery
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
     * Call the Linear api with the WorkflowStateQuery
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
        ...createLinearSdkWorkflowState(id, requester),
      };
    },
    /**
     * Call the Linear api with the WorkflowStatesQuery
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
     * Call the Linear api with the UserUpdateMutation
     *
     * @param id - id to pass into the UserUpdateMutation
     * @param vars - variables without undefined id to pass into the UserUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserUpdateMutation
     */
    async userUpdate(
      id: string,
      vars: Omit<D.UserUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.UserUpdateDocument>["userUpdate"] & LinearSdkUserUpdate> {
      const response = await requester<D.UserUpdateMutation, D.UserUpdateMutationVariables>(
        D.UserUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.userUpdate,
        ...createLinearSdkUserUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the UserPromoteAdminMutation
     *
     * @param id - id to pass into the UserPromoteAdminMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserPromoteAdminMutation
     */
    async userPromoteAdmin(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.UserPromoteAdminDocument>["userPromoteAdmin"] & LinearSdkUserPromoteAdmin> {
      const response = await requester<D.UserPromoteAdminMutation, D.UserPromoteAdminMutationVariables>(
        D.UserPromoteAdminDocument,
        { id },
        opts
      );
      return {
        ...response?.userPromoteAdmin,
        ...createLinearSdkUserPromoteAdmin(id, requester),
      };
    },
    /**
     * Call the Linear api with the UserDemoteAdminMutation
     *
     * @param id - id to pass into the UserDemoteAdminMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserDemoteAdminMutation
     */
    async userDemoteAdmin(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.UserDemoteAdminDocument>["userDemoteAdmin"] & LinearSdkUserDemoteAdmin> {
      const response = await requester<D.UserDemoteAdminMutation, D.UserDemoteAdminMutationVariables>(
        D.UserDemoteAdminDocument,
        { id },
        opts
      );
      return {
        ...response?.userDemoteAdmin,
        ...createLinearSdkUserDemoteAdmin(id, requester),
      };
    },
    /**
     * Call the Linear api with the UserSuspendMutation
     *
     * @param id - id to pass into the UserSuspendMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserSuspendMutation
     */
    async userSuspend(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.UserSuspendDocument>["userSuspend"] & LinearSdkUserSuspend> {
      const response = await requester<D.UserSuspendMutation, D.UserSuspendMutationVariables>(
        D.UserSuspendDocument,
        { id },
        opts
      );
      return {
        ...response?.userSuspend,
        ...createLinearSdkUserSuspend(id, requester),
      };
    },
    /**
     * Call the Linear api with the UserUnsuspendMutation
     *
     * @param id - id to pass into the UserUnsuspendMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserUnsuspendMutation
     */
    async userUnsuspend(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.UserUnsuspendDocument>["userUnsuspend"] & LinearSdkUserUnsuspend> {
      const response = await requester<D.UserUnsuspendMutation, D.UserUnsuspendMutationVariables>(
        D.UserUnsuspendDocument,
        { id },
        opts
      );
      return {
        ...response?.userUnsuspend,
        ...createLinearSdkUserUnsuspend(id, requester),
      };
    },
    /**
     * Call the Linear api with the OrganizationUpdateMutation
     *
     * @param vars - variables to pass into the OrganizationUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationUpdateMutation
     */
    async organizationUpdate(
      vars: D.OrganizationUpdateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationUpdateDocument>["organizationUpdate"]> {
      const response = await requester<D.OrganizationUpdateMutation, D.OrganizationUpdateMutationVariables>(
        D.OrganizationUpdateDocument,
        vars,
        opts
      );
      return {
        ...response?.organizationUpdate,
      };
    },
    /**
     * Call the Linear api with the OrganizationDeleteChallengeMutation
     *
     * @param vars - variables to pass into the OrganizationDeleteChallengeMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationDeleteChallengeMutation
     */
    async organizationDeleteChallenge(
      vars?: D.OrganizationDeleteChallengeMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationDeleteChallengeDocument>["organizationDeleteChallenge"]> {
      const response = await requester<
        D.OrganizationDeleteChallengeMutation,
        D.OrganizationDeleteChallengeMutationVariables
      >(D.OrganizationDeleteChallengeDocument, vars, opts);
      return {
        ...response?.organizationDeleteChallenge,
      };
    },
    /**
     * Call the Linear api with the OrganizationDeleteMutation
     *
     * @param vars - variables to pass into the OrganizationDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationDeleteMutation
     */
    async organizationDelete(
      vars: D.OrganizationDeleteMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationDeleteDocument>["organizationDelete"]> {
      const response = await requester<D.OrganizationDeleteMutation, D.OrganizationDeleteMutationVariables>(
        D.OrganizationDeleteDocument,
        vars,
        opts
      );
      return {
        ...response?.organizationDelete,
      };
    },
    /**
     * Call the Linear api with the AdminDeleteIntegrationMutation
     *
     * @param id - id to pass into the AdminDeleteIntegrationMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminDeleteIntegrationMutation
     */
    async adminDeleteIntegration(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.AdminDeleteIntegrationDocument>["adminDeleteIntegration"] & LinearSdkAdminDeleteIntegration
    > {
      const response = await requester<D.AdminDeleteIntegrationMutation, D.AdminDeleteIntegrationMutationVariables>(
        D.AdminDeleteIntegrationDocument,
        { id },
        opts
      );
      return {
        ...response?.adminDeleteIntegration,
        ...createLinearSdkAdminDeleteIntegration(id, requester),
      };
    },
    /**
     * Call the Linear api with the OrganizationToggleAccessMutation
     *
     * @param id - id to pass into the OrganizationToggleAccessMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationToggleAccessMutation
     */
    async organizationToggleAccess(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.OrganizationToggleAccessDocument>["organizationToggleAccess"] &
        LinearSdkOrganizationToggleAccess
    > {
      const response = await requester<D.OrganizationToggleAccessMutation, D.OrganizationToggleAccessMutationVariables>(
        D.OrganizationToggleAccessDocument,
        { id },
        opts
      );
      return {
        ...response?.organizationToggleAccess,
        ...createLinearSdkOrganizationToggleAccess(id, requester),
      };
    },
    /**
     * Call the Linear api with the OrganizationChangeEmailDomainMutation
     *
     * @param id - id to pass into the OrganizationChangeEmailDomainMutation
     * @param vars - variables without undefined id to pass into the OrganizationChangeEmailDomainMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationChangeEmailDomainMutation
     */
    async organizationChangeEmailDomain(
      id: string,
      vars: Omit<D.OrganizationChangeEmailDomainMutationVariables, "id">,
      opts?: O
    ): Promise<
      ResultOf<typeof D.OrganizationChangeEmailDomainDocument>["organizationChangeEmailDomain"] &
        LinearSdkOrganizationChangeEmailDomain
    > {
      const response = await requester<
        D.OrganizationChangeEmailDomainMutation,
        D.OrganizationChangeEmailDomainMutationVariables
      >(D.OrganizationChangeEmailDomainDocument, { id, ...vars }, opts);
      return {
        ...response?.organizationChangeEmailDomain,
        ...createLinearSdkOrganizationChangeEmailDomain(id, requester),
      };
    },
    /**
     * Call the Linear api with the OrganizationToggleSamlEnabledMutation
     *
     * @param id - id to pass into the OrganizationToggleSamlEnabledMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationToggleSamlEnabledMutation
     */
    async organizationToggleSamlEnabled(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.OrganizationToggleSamlEnabledDocument>["organizationToggleSamlEnabled"] &
        LinearSdkOrganizationToggleSamlEnabled
    > {
      const response = await requester<
        D.OrganizationToggleSamlEnabledMutation,
        D.OrganizationToggleSamlEnabledMutationVariables
      >(D.OrganizationToggleSamlEnabledDocument, { id }, opts);
      return {
        ...response?.organizationToggleSamlEnabled,
        ...createLinearSdkOrganizationToggleSamlEnabled(id, requester),
      };
    },
    /**
     * Call the Linear api with the OrganizationConfigureSamlMutation
     *
     * @param id - id to pass into the OrganizationConfigureSamlMutation
     * @param vars - variables without undefined id to pass into the OrganizationConfigureSamlMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationConfigureSamlMutation
     */
    async organizationConfigureSaml(
      id: string,
      vars: Omit<D.OrganizationConfigureSamlMutationVariables, "id">,
      opts?: O
    ): Promise<
      ResultOf<typeof D.OrganizationConfigureSamlDocument>["organizationConfigureSaml"] &
        LinearSdkOrganizationConfigureSaml
    > {
      const response = await requester<
        D.OrganizationConfigureSamlMutation,
        D.OrganizationConfigureSamlMutationVariables
      >(D.OrganizationConfigureSamlDocument, { id, ...vars }, opts);
      return {
        ...response?.organizationConfigureSaml,
        ...createLinearSdkOrganizationConfigureSaml(id, requester),
      };
    },
    /**
     * Call the Linear api with the AdminCommandMutation
     *
     * @param vars - variables to pass into the AdminCommandMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminCommandMutation
     */
    async adminCommand(
      vars: D.AdminCommandMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminCommandDocument>["adminCommand"]> {
      const response = await requester<D.AdminCommandMutation, D.AdminCommandMutationVariables>(
        D.AdminCommandDocument,
        vars,
        opts
      );
      return {
        ...response?.adminCommand,
      };
    },
    /**
     * Call the Linear api with the AdminBulkEmailMutation
     *
     * @param vars - variables to pass into the AdminBulkEmailMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminBulkEmailMutation
     */
    async adminBulkEmail(
      vars: D.AdminBulkEmailMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminBulkEmailDocument>["adminBulkEmail"]> {
      const response = await requester<D.AdminBulkEmailMutation, D.AdminBulkEmailMutationVariables>(
        D.AdminBulkEmailDocument,
        vars,
        opts
      );
      return {
        ...response?.adminBulkEmail,
      };
    },
    /**
     * Call the Linear api with the AdminCreateStripeCustomerMutation
     *
     * @param vars - variables to pass into the AdminCreateStripeCustomerMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminCreateStripeCustomerMutation
     */
    async adminCreateStripeCustomer(
      vars: D.AdminCreateStripeCustomerMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminCreateStripeCustomerDocument>["adminCreateStripeCustomer"]> {
      const response = await requester<
        D.AdminCreateStripeCustomerMutation,
        D.AdminCreateStripeCustomerMutationVariables
      >(D.AdminCreateStripeCustomerDocument, vars, opts);
      return {
        ...response?.adminCreateStripeCustomer,
      };
    },
    /**
     * Call the Linear api with the AdminScheduleAnonymousTaskMutation
     *
     * @param vars - variables to pass into the AdminScheduleAnonymousTaskMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminScheduleAnonymousTaskMutation
     */
    async adminScheduleAnonymousTask(
      vars: D.AdminScheduleAnonymousTaskMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.AdminScheduleAnonymousTaskDocument>["adminScheduleAnonymousTask"]> {
      const response = await requester<
        D.AdminScheduleAnonymousTaskMutation,
        D.AdminScheduleAnonymousTaskMutationVariables
      >(D.AdminScheduleAnonymousTaskDocument, vars, opts);
      return {
        ...response?.adminScheduleAnonymousTask,
      };
    },
    /**
     * Call the Linear api with the AdminUserAccountChangeEmailMutation
     *
     * @param id - id to pass into the AdminUserAccountChangeEmailMutation
     * @param vars - variables without undefined id to pass into the AdminUserAccountChangeEmailMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the AdminUserAccountChangeEmailMutation
     */
    async adminUserAccountChangeEmail(
      id: string,
      vars: Omit<D.AdminUserAccountChangeEmailMutationVariables, "id">,
      opts?: O
    ): Promise<
      ResultOf<typeof D.AdminUserAccountChangeEmailDocument>["adminUserAccountChangeEmail"] &
        LinearSdkAdminUserAccountChangeEmail
    > {
      const response = await requester<
        D.AdminUserAccountChangeEmailMutation,
        D.AdminUserAccountChangeEmailMutationVariables
      >(D.AdminUserAccountChangeEmailDocument, { id, ...vars }, opts);
      return {
        ...response?.adminUserAccountChangeEmail,
        ...createLinearSdkAdminUserAccountChangeEmail(id, requester),
      };
    },
    /**
     * Call the Linear api with the EventCreateMutation
     *
     * @param vars - variables to pass into the EventCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the EventCreateMutation
     */
    async eventCreate(
      vars: D.EventCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.EventCreateDocument>["eventCreate"]> {
      const response = await requester<D.EventCreateMutation, D.EventCreateMutationVariables>(
        D.EventCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.eventCreate,
      };
    },
    /**
     * Call the Linear api with the ApiKeyCreateMutation
     *
     * @param vars - variables to pass into the ApiKeyCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ApiKeyCreateMutation
     */
    async apiKeyCreate(
      vars: D.ApiKeyCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.ApiKeyCreateDocument>["apiKeyCreate"]> {
      const response = await requester<D.ApiKeyCreateMutation, D.ApiKeyCreateMutationVariables>(
        D.ApiKeyCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.apiKeyCreate,
      };
    },
    /**
     * Call the Linear api with the ApiKeyDeleteMutation
     *
     * @param id - id to pass into the ApiKeyDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ApiKeyDeleteMutation
     */
    async apiKeyDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.ApiKeyDeleteDocument>["apiKeyDelete"] & LinearSdkApiKeyDelete> {
      const response = await requester<D.ApiKeyDeleteMutation, D.ApiKeyDeleteMutationVariables>(
        D.ApiKeyDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.apiKeyDelete,
        ...createLinearSdkApiKeyDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the EmailUserAccountAuthChallengeMutation
     *
     * @param vars - variables to pass into the EmailUserAccountAuthChallengeMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the EmailUserAccountAuthChallengeMutation
     */
    async emailUserAccountAuthChallenge(
      vars: D.EmailUserAccountAuthChallengeMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.EmailUserAccountAuthChallengeDocument>["emailUserAccountAuthChallenge"]> {
      const response = await requester<
        D.EmailUserAccountAuthChallengeMutation,
        D.EmailUserAccountAuthChallengeMutationVariables
      >(D.EmailUserAccountAuthChallengeDocument, vars, opts);
      return {
        ...response?.emailUserAccountAuthChallenge,
      };
    },
    /**
     * Call the Linear api with the EmailTokenUserAccountAuthMutation
     *
     * @param vars - variables to pass into the EmailTokenUserAccountAuthMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the EmailTokenUserAccountAuthMutation
     */
    async emailTokenUserAccountAuth(
      vars: D.EmailTokenUserAccountAuthMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.EmailTokenUserAccountAuthDocument>["emailTokenUserAccountAuth"]> {
      const response = await requester<
        D.EmailTokenUserAccountAuthMutation,
        D.EmailTokenUserAccountAuthMutationVariables
      >(D.EmailTokenUserAccountAuthDocument, vars, opts);
      return {
        ...response?.emailTokenUserAccountAuth,
      };
    },
    /**
     * Call the Linear api with the SamlTokenUserAccountAuthMutation
     *
     * @param vars - variables to pass into the SamlTokenUserAccountAuthMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the SamlTokenUserAccountAuthMutation
     */
    async samlTokenUserAccountAuth(
      vars: D.SamlTokenUserAccountAuthMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.SamlTokenUserAccountAuthDocument>["samlTokenUserAccountAuth"]> {
      const response = await requester<D.SamlTokenUserAccountAuthMutation, D.SamlTokenUserAccountAuthMutationVariables>(
        D.SamlTokenUserAccountAuthDocument,
        vars,
        opts
      );
      return {
        ...response?.samlTokenUserAccountAuth,
      };
    },
    /**
     * Call the Linear api with the GoogleUserAccountAuthMutation
     *
     * @param vars - variables to pass into the GoogleUserAccountAuthMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the GoogleUserAccountAuthMutation
     */
    async googleUserAccountAuth(
      vars: D.GoogleUserAccountAuthMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.GoogleUserAccountAuthDocument>["googleUserAccountAuth"]> {
      const response = await requester<D.GoogleUserAccountAuthMutation, D.GoogleUserAccountAuthMutationVariables>(
        D.GoogleUserAccountAuthDocument,
        vars,
        opts
      );
      return {
        ...response?.googleUserAccountAuth,
      };
    },
    /**
     * Call the Linear api with the CreateOrganizationFromOnboardingMutation
     *
     * @param vars - variables to pass into the CreateOrganizationFromOnboardingMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CreateOrganizationFromOnboardingMutation
     */
    async createOrganizationFromOnboarding(
      vars: D.CreateOrganizationFromOnboardingMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.CreateOrganizationFromOnboardingDocument>["createOrganizationFromOnboarding"]> {
      const response = await requester<
        D.CreateOrganizationFromOnboardingMutation,
        D.CreateOrganizationFromOnboardingMutationVariables
      >(D.CreateOrganizationFromOnboardingDocument, vars, opts);
      return {
        ...response?.createOrganizationFromOnboarding,
      };
    },
    /**
     * Call the Linear api with the JoinOrganizationFromOnboardingMutation
     *
     * @param vars - variables to pass into the JoinOrganizationFromOnboardingMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the JoinOrganizationFromOnboardingMutation
     */
    async joinOrganizationFromOnboarding(
      vars: D.JoinOrganizationFromOnboardingMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.JoinOrganizationFromOnboardingDocument>["joinOrganizationFromOnboarding"]> {
      const response = await requester<
        D.JoinOrganizationFromOnboardingMutation,
        D.JoinOrganizationFromOnboardingMutationVariables
      >(D.JoinOrganizationFromOnboardingDocument, vars, opts);
      return {
        ...response?.joinOrganizationFromOnboarding,
      };
    },
    /**
     * Call the Linear api with the LeaveOrganizationMutation
     *
     * @param vars - variables to pass into the LeaveOrganizationMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the LeaveOrganizationMutation
     */
    async leaveOrganization(
      vars: D.LeaveOrganizationMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.LeaveOrganizationDocument>["leaveOrganization"]> {
      const response = await requester<D.LeaveOrganizationMutation, D.LeaveOrganizationMutationVariables>(
        D.LeaveOrganizationDocument,
        vars,
        opts
      );
      return {
        ...response?.leaveOrganization,
      };
    },
    /**
     * Call the Linear api with the BillingEmailUpdateMutation
     *
     * @param vars - variables to pass into the BillingEmailUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the BillingEmailUpdateMutation
     */
    async billingEmailUpdate(
      vars: D.BillingEmailUpdateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.BillingEmailUpdateDocument>["billingEmailUpdate"]> {
      const response = await requester<D.BillingEmailUpdateMutation, D.BillingEmailUpdateMutationVariables>(
        D.BillingEmailUpdateDocument,
        vars,
        opts
      );
      return {
        ...response?.billingEmailUpdate,
      };
    },
    /**
     * Call the Linear api with the CollaborativeDocumentUpdateMutation
     *
     * @param vars - variables to pass into the CollaborativeDocumentUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CollaborativeDocumentUpdateMutation
     */
    async collaborativeDocumentUpdate(
      vars: D.CollaborativeDocumentUpdateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.CollaborativeDocumentUpdateDocument>["collaborativeDocumentUpdate"]> {
      const response = await requester<
        D.CollaborativeDocumentUpdateMutation,
        D.CollaborativeDocumentUpdateMutationVariables
      >(D.CollaborativeDocumentUpdateDocument, vars, opts);
      return {
        ...response?.collaborativeDocumentUpdate,
      };
    },
    /**
     * Call the Linear api with the CommentCreateMutation
     *
     * @param vars - variables to pass into the CommentCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CommentCreateMutation
     */
    async commentCreate(
      vars: D.CommentCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.CommentCreateDocument>["commentCreate"]> {
      const response = await requester<D.CommentCreateMutation, D.CommentCreateMutationVariables>(
        D.CommentCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.commentCreate,
      };
    },
    /**
     * Call the Linear api with the CommentUpdateMutation
     *
     * @param id - id to pass into the CommentUpdateMutation
     * @param vars - variables without undefined id to pass into the CommentUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CommentUpdateMutation
     */
    async commentUpdate(
      id: string,
      vars: Omit<D.CommentUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.CommentUpdateDocument>["commentUpdate"] & LinearSdkCommentUpdate> {
      const response = await requester<D.CommentUpdateMutation, D.CommentUpdateMutationVariables>(
        D.CommentUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.commentUpdate,
        ...createLinearSdkCommentUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the CommentDeleteMutation
     *
     * @param id - id to pass into the CommentDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CommentDeleteMutation
     */
    async commentDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.CommentDeleteDocument>["commentDelete"] & LinearSdkCommentDelete> {
      const response = await requester<D.CommentDeleteMutation, D.CommentDeleteMutationVariables>(
        D.CommentDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.commentDelete,
        ...createLinearSdkCommentDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the ContactCreateMutation
     *
     * @param vars - variables to pass into the ContactCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ContactCreateMutation
     */
    async contactCreate(
      vars: D.ContactCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.ContactCreateDocument>["contactCreate"]> {
      const response = await requester<D.ContactCreateMutation, D.ContactCreateMutationVariables>(
        D.ContactCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.contactCreate,
      };
    },
    /**
     * Call the Linear api with the CustomViewCreateMutation
     *
     * @param vars - variables to pass into the CustomViewCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomViewCreateMutation
     */
    async customViewCreate(
      vars: D.CustomViewCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.CustomViewCreateDocument>["customViewCreate"]> {
      const response = await requester<D.CustomViewCreateMutation, D.CustomViewCreateMutationVariables>(
        D.CustomViewCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.customViewCreate,
      };
    },
    /**
     * Call the Linear api with the CustomViewUpdateMutation
     *
     * @param id - id to pass into the CustomViewUpdateMutation
     * @param vars - variables without undefined id to pass into the CustomViewUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomViewUpdateMutation
     */
    async customViewUpdate(
      id: string,
      vars: Omit<D.CustomViewUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.CustomViewUpdateDocument>["customViewUpdate"] & LinearSdkCustomViewUpdate> {
      const response = await requester<D.CustomViewUpdateMutation, D.CustomViewUpdateMutationVariables>(
        D.CustomViewUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.customViewUpdate,
        ...createLinearSdkCustomViewUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the CustomViewDeleteMutation
     *
     * @param id - id to pass into the CustomViewDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CustomViewDeleteMutation
     */
    async customViewDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.CustomViewDeleteDocument>["customViewDelete"] & LinearSdkCustomViewDelete> {
      const response = await requester<D.CustomViewDeleteMutation, D.CustomViewDeleteMutationVariables>(
        D.CustomViewDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.customViewDelete,
        ...createLinearSdkCustomViewDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the CycleCreateMutation
     *
     * @param vars - variables to pass into the CycleCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CycleCreateMutation
     */
    async cycleCreate(
      vars: D.CycleCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.CycleCreateDocument>["cycleCreate"]> {
      const response = await requester<D.CycleCreateMutation, D.CycleCreateMutationVariables>(
        D.CycleCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.cycleCreate,
      };
    },
    /**
     * Call the Linear api with the CycleUpdateMutation
     *
     * @param id - id to pass into the CycleUpdateMutation
     * @param vars - variables without undefined id to pass into the CycleUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CycleUpdateMutation
     */
    async cycleUpdate(
      id: string,
      vars: Omit<D.CycleUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.CycleUpdateDocument>["cycleUpdate"] & LinearSdkCycleUpdate> {
      const response = await requester<D.CycleUpdateMutation, D.CycleUpdateMutationVariables>(
        D.CycleUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.cycleUpdate,
        ...createLinearSdkCycleUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the CycleArchiveMutation
     *
     * @param id - id to pass into the CycleArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CycleArchiveMutation
     */
    async cycleArchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.CycleArchiveDocument>["cycleArchive"] & LinearSdkCycleArchive> {
      const response = await requester<D.CycleArchiveMutation, D.CycleArchiveMutationVariables>(
        D.CycleArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.cycleArchive,
        ...createLinearSdkCycleArchive(id, requester),
      };
    },
    /**
     * Call the Linear api with the DebugFailWithInternalErrorMutation
     *
     * @param vars - variables to pass into the DebugFailWithInternalErrorMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the DebugFailWithInternalErrorMutation
     */
    async debugFailWithInternalError(
      vars?: D.DebugFailWithInternalErrorMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.DebugFailWithInternalErrorDocument>["debugFailWithInternalError"]> {
      const response = await requester<
        D.DebugFailWithInternalErrorMutation,
        D.DebugFailWithInternalErrorMutationVariables
      >(D.DebugFailWithInternalErrorDocument, vars, opts);
      return {
        ...response?.debugFailWithInternalError,
      };
    },
    /**
     * Call the Linear api with the DebugFailWithWarningMutation
     *
     * @param vars - variables to pass into the DebugFailWithWarningMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the DebugFailWithWarningMutation
     */
    async debugFailWithWarning(
      vars?: D.DebugFailWithWarningMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.DebugFailWithWarningDocument>["debugFailWithWarning"]> {
      const response = await requester<D.DebugFailWithWarningMutation, D.DebugFailWithWarningMutationVariables>(
        D.DebugFailWithWarningDocument,
        vars,
        opts
      );
      return {
        ...response?.debugFailWithWarning,
      };
    },
    /**
     * Call the Linear api with the DebugCreateSamlOrgMutation
     *
     * @param vars - variables to pass into the DebugCreateSamlOrgMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the DebugCreateSamlOrgMutation
     */
    async debugCreateSAMLOrg(
      vars?: D.DebugCreateSamlOrgMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.DebugCreateSamlOrgDocument>["debugCreateSAMLOrg"]> {
      const response = await requester<D.DebugCreateSamlOrgMutation, D.DebugCreateSamlOrgMutationVariables>(
        D.DebugCreateSamlOrgDocument,
        vars,
        opts
      );
      return {
        ...response?.debugCreateSAMLOrg,
      };
    },
    /**
     * Call the Linear api with the EmailUnsubscribeMutation
     *
     * @param vars - variables to pass into the EmailUnsubscribeMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the EmailUnsubscribeMutation
     */
    async emailUnsubscribe(
      vars: D.EmailUnsubscribeMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.EmailUnsubscribeDocument>["emailUnsubscribe"]> {
      const response = await requester<D.EmailUnsubscribeMutation, D.EmailUnsubscribeMutationVariables>(
        D.EmailUnsubscribeDocument,
        vars,
        opts
      );
      return {
        ...response?.emailUnsubscribe,
      };
    },
    /**
     * Call the Linear api with the EmojiCreateMutation
     *
     * @param vars - variables to pass into the EmojiCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the EmojiCreateMutation
     */
    async emojiCreate(
      vars: D.EmojiCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.EmojiCreateDocument>["emojiCreate"]> {
      const response = await requester<D.EmojiCreateMutation, D.EmojiCreateMutationVariables>(
        D.EmojiCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.emojiCreate,
      };
    },
    /**
     * Call the Linear api with the EmojiDeleteMutation
     *
     * @param id - id to pass into the EmojiDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the EmojiDeleteMutation
     */
    async emojiDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.EmojiDeleteDocument>["emojiDelete"] & LinearSdkEmojiDelete> {
      const response = await requester<D.EmojiDeleteMutation, D.EmojiDeleteMutationVariables>(
        D.EmojiDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.emojiDelete,
        ...createLinearSdkEmojiDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the FavoriteCreateMutation
     *
     * @param vars - variables to pass into the FavoriteCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the FavoriteCreateMutation
     */
    async favoriteCreate(
      vars: D.FavoriteCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.FavoriteCreateDocument>["favoriteCreate"]> {
      const response = await requester<D.FavoriteCreateMutation, D.FavoriteCreateMutationVariables>(
        D.FavoriteCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.favoriteCreate,
      };
    },
    /**
     * Call the Linear api with the FavoriteUpdateMutation
     *
     * @param id - id to pass into the FavoriteUpdateMutation
     * @param vars - variables without undefined id to pass into the FavoriteUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the FavoriteUpdateMutation
     */
    async favoriteUpdate(
      id: string,
      vars: Omit<D.FavoriteUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.FavoriteUpdateDocument>["favoriteUpdate"] & LinearSdkFavoriteUpdate> {
      const response = await requester<D.FavoriteUpdateMutation, D.FavoriteUpdateMutationVariables>(
        D.FavoriteUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.favoriteUpdate,
        ...createLinearSdkFavoriteUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the FavoriteDeleteMutation
     *
     * @param id - id to pass into the FavoriteDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the FavoriteDeleteMutation
     */
    async favoriteDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.FavoriteDeleteDocument>["favoriteDelete"] & LinearSdkFavoriteDelete> {
      const response = await requester<D.FavoriteDeleteMutation, D.FavoriteDeleteMutationVariables>(
        D.FavoriteDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.favoriteDelete,
        ...createLinearSdkFavoriteDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the FeedbackCreateMutation
     *
     * @param vars - variables to pass into the FeedbackCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the FeedbackCreateMutation
     */
    async feedbackCreate(
      vars: D.FeedbackCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.FeedbackCreateDocument>["feedbackCreate"]> {
      const response = await requester<D.FeedbackCreateMutation, D.FeedbackCreateMutationVariables>(
        D.FeedbackCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.feedbackCreate,
      };
    },
    /**
     * Call the Linear api with the FileUploadMutation
     *
     * @param vars - variables to pass into the FileUploadMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the FileUploadMutation
     */
    async fileUpload(
      vars: D.FileUploadMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.FileUploadDocument>["fileUpload"]> {
      const response = await requester<D.FileUploadMutation, D.FileUploadMutationVariables>(
        D.FileUploadDocument,
        vars,
        opts
      );
      return {
        ...response?.fileUpload,
      };
    },
    /**
     * Call the Linear api with the ImageUploadFromUrlMutation
     *
     * @param vars - variables to pass into the ImageUploadFromUrlMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ImageUploadFromUrlMutation
     */
    async imageUploadFromUrl(
      vars: D.ImageUploadFromUrlMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.ImageUploadFromUrlDocument>["imageUploadFromUrl"]> {
      const response = await requester<D.ImageUploadFromUrlMutation, D.ImageUploadFromUrlMutationVariables>(
        D.ImageUploadFromUrlDocument,
        vars,
        opts
      );
      return {
        ...response?.imageUploadFromUrl,
      };
    },
    /**
     * Call the Linear api with the IntegrationGithubConnectMutation
     *
     * @param vars - variables to pass into the IntegrationGithubConnectMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationGithubConnectMutation
     */
    async integrationGithubConnect(
      vars: D.IntegrationGithubConnectMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationGithubConnectDocument>["integrationGithubConnect"]> {
      const response = await requester<D.IntegrationGithubConnectMutation, D.IntegrationGithubConnectMutationVariables>(
        D.IntegrationGithubConnectDocument,
        vars,
        opts
      );
      return {
        ...response?.integrationGithubConnect,
      };
    },
    /**
     * Call the Linear api with the IntegrationGitlabConnectMutation
     *
     * @param vars - variables to pass into the IntegrationGitlabConnectMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationGitlabConnectMutation
     */
    async integrationGitlabConnect(
      vars: D.IntegrationGitlabConnectMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationGitlabConnectDocument>["integrationGitlabConnect"]> {
      const response = await requester<D.IntegrationGitlabConnectMutation, D.IntegrationGitlabConnectMutationVariables>(
        D.IntegrationGitlabConnectDocument,
        vars,
        opts
      );
      return {
        ...response?.integrationGitlabConnect,
      };
    },
    /**
     * Call the Linear api with the IntegrationSlackMutation
     *
     * @param vars - variables to pass into the IntegrationSlackMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationSlackMutation
     */
    async integrationSlack(
      vars: D.IntegrationSlackMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationSlackDocument>["integrationSlack"]> {
      const response = await requester<D.IntegrationSlackMutation, D.IntegrationSlackMutationVariables>(
        D.IntegrationSlackDocument,
        vars,
        opts
      );
      return {
        ...response?.integrationSlack,
      };
    },
    /**
     * Call the Linear api with the IntegrationSlackPersonalMutation
     *
     * @param vars - variables to pass into the IntegrationSlackPersonalMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationSlackPersonalMutation
     */
    async integrationSlackPersonal(
      vars: D.IntegrationSlackPersonalMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationSlackPersonalDocument>["integrationSlackPersonal"]> {
      const response = await requester<D.IntegrationSlackPersonalMutation, D.IntegrationSlackPersonalMutationVariables>(
        D.IntegrationSlackPersonalDocument,
        vars,
        opts
      );
      return {
        ...response?.integrationSlackPersonal,
      };
    },
    /**
     * Call the Linear api with the IntegrationSlackPostMutation
     *
     * @param vars - variables to pass into the IntegrationSlackPostMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationSlackPostMutation
     */
    async integrationSlackPost(
      vars: D.IntegrationSlackPostMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationSlackPostDocument>["integrationSlackPost"]> {
      const response = await requester<D.IntegrationSlackPostMutation, D.IntegrationSlackPostMutationVariables>(
        D.IntegrationSlackPostDocument,
        vars,
        opts
      );
      return {
        ...response?.integrationSlackPost,
      };
    },
    /**
     * Call the Linear api with the IntegrationSlackProjectPostMutation
     *
     * @param vars - variables to pass into the IntegrationSlackProjectPostMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationSlackProjectPostMutation
     */
    async integrationSlackProjectPost(
      vars: D.IntegrationSlackProjectPostMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationSlackProjectPostDocument>["integrationSlackProjectPost"]> {
      const response = await requester<
        D.IntegrationSlackProjectPostMutation,
        D.IntegrationSlackProjectPostMutationVariables
      >(D.IntegrationSlackProjectPostDocument, vars, opts);
      return {
        ...response?.integrationSlackProjectPost,
      };
    },
    /**
     * Call the Linear api with the IntegrationSlackImportEmojisMutation
     *
     * @param vars - variables to pass into the IntegrationSlackImportEmojisMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationSlackImportEmojisMutation
     */
    async integrationSlackImportEmojis(
      vars: D.IntegrationSlackImportEmojisMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationSlackImportEmojisDocument>["integrationSlackImportEmojis"]> {
      const response = await requester<
        D.IntegrationSlackImportEmojisMutation,
        D.IntegrationSlackImportEmojisMutationVariables
      >(D.IntegrationSlackImportEmojisDocument, vars, opts);
      return {
        ...response?.integrationSlackImportEmojis,
      };
    },
    /**
     * Call the Linear api with the IntegrationFigmaMutation
     *
     * @param vars - variables to pass into the IntegrationFigmaMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationFigmaMutation
     */
    async integrationFigma(
      vars: D.IntegrationFigmaMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationFigmaDocument>["integrationFigma"]> {
      const response = await requester<D.IntegrationFigmaMutation, D.IntegrationFigmaMutationVariables>(
        D.IntegrationFigmaDocument,
        vars,
        opts
      );
      return {
        ...response?.integrationFigma,
      };
    },
    /**
     * Call the Linear api with the IntegrationGoogleSheetsMutation
     *
     * @param vars - variables to pass into the IntegrationGoogleSheetsMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationGoogleSheetsMutation
     */
    async integrationGoogleSheets(
      vars: D.IntegrationGoogleSheetsMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationGoogleSheetsDocument>["integrationGoogleSheets"]> {
      const response = await requester<D.IntegrationGoogleSheetsMutation, D.IntegrationGoogleSheetsMutationVariables>(
        D.IntegrationGoogleSheetsDocument,
        vars,
        opts
      );
      return {
        ...response?.integrationGoogleSheets,
      };
    },
    /**
     * Call the Linear api with the RefreshGoogleSheetsDataMutation
     *
     * @param id - id to pass into the RefreshGoogleSheetsDataMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the RefreshGoogleSheetsDataMutation
     */
    async refreshGoogleSheetsData(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.RefreshGoogleSheetsDataDocument>["refreshGoogleSheetsData"] & LinearSdkRefreshGoogleSheetsData
    > {
      const response = await requester<D.RefreshGoogleSheetsDataMutation, D.RefreshGoogleSheetsDataMutationVariables>(
        D.RefreshGoogleSheetsDataDocument,
        { id },
        opts
      );
      return {
        ...response?.refreshGoogleSheetsData,
        ...createLinearSdkRefreshGoogleSheetsData(id, requester),
      };
    },
    /**
     * Call the Linear api with the IntegrationSentryConnectMutation
     *
     * @param vars - variables to pass into the IntegrationSentryConnectMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationSentryConnectMutation
     */
    async integrationSentryConnect(
      vars: D.IntegrationSentryConnectMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationSentryConnectDocument>["integrationSentryConnect"]> {
      const response = await requester<D.IntegrationSentryConnectMutation, D.IntegrationSentryConnectMutationVariables>(
        D.IntegrationSentryConnectDocument,
        vars,
        opts
      );
      return {
        ...response?.integrationSentryConnect,
      };
    },
    /**
     * Call the Linear api with the IntegrationDeleteMutation
     *
     * @param id - id to pass into the IntegrationDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationDeleteMutation
     */
    async integrationDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IntegrationDeleteDocument>["integrationDelete"] & LinearSdkIntegrationDelete> {
      const response = await requester<D.IntegrationDeleteMutation, D.IntegrationDeleteMutationVariables>(
        D.IntegrationDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.integrationDelete,
        ...createLinearSdkIntegrationDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the IntegrationResourceArchiveMutation
     *
     * @param id - id to pass into the IntegrationResourceArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IntegrationResourceArchiveMutation
     */
    async integrationResourceArchive(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.IntegrationResourceArchiveDocument>["integrationResourceArchive"] &
        LinearSdkIntegrationResourceArchive
    > {
      const response = await requester<
        D.IntegrationResourceArchiveMutation,
        D.IntegrationResourceArchiveMutationVariables
      >(D.IntegrationResourceArchiveDocument, { id }, opts);
      return {
        ...response?.integrationResourceArchive,
        ...createLinearSdkIntegrationResourceArchive(id, requester),
      };
    },
    /**
     * Call the Linear api with the IssueLabelCreateMutation
     *
     * @param vars - variables to pass into the IssueLabelCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueLabelCreateMutation
     */
    async issueLabelCreate(
      vars: D.IssueLabelCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueLabelCreateDocument>["issueLabelCreate"]> {
      const response = await requester<D.IssueLabelCreateMutation, D.IssueLabelCreateMutationVariables>(
        D.IssueLabelCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.issueLabelCreate,
      };
    },
    /**
     * Call the Linear api with the IssueLabelUpdateMutation
     *
     * @param id - id to pass into the IssueLabelUpdateMutation
     * @param vars - variables without undefined id to pass into the IssueLabelUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueLabelUpdateMutation
     */
    async issueLabelUpdate(
      id: string,
      vars: Omit<D.IssueLabelUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueLabelUpdateDocument>["issueLabelUpdate"] & LinearSdkIssueLabelUpdate> {
      const response = await requester<D.IssueLabelUpdateMutation, D.IssueLabelUpdateMutationVariables>(
        D.IssueLabelUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.issueLabelUpdate,
        ...createLinearSdkIssueLabelUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the IssueLabelArchiveMutation
     *
     * @param id - id to pass into the IssueLabelArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueLabelArchiveMutation
     */
    async issueLabelArchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueLabelArchiveDocument>["issueLabelArchive"] & LinearSdkIssueLabelArchive> {
      const response = await requester<D.IssueLabelArchiveMutation, D.IssueLabelArchiveMutationVariables>(
        D.IssueLabelArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.issueLabelArchive,
        ...createLinearSdkIssueLabelArchive(id, requester),
      };
    },
    /**
     * Call the Linear api with the IssueRelationCreateMutation
     *
     * @param vars - variables to pass into the IssueRelationCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueRelationCreateMutation
     */
    async issueRelationCreate(
      vars: D.IssueRelationCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueRelationCreateDocument>["issueRelationCreate"]> {
      const response = await requester<D.IssueRelationCreateMutation, D.IssueRelationCreateMutationVariables>(
        D.IssueRelationCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.issueRelationCreate,
      };
    },
    /**
     * Call the Linear api with the IssueRelationUpdateMutation
     *
     * @param id - id to pass into the IssueRelationUpdateMutation
     * @param vars - variables without undefined id to pass into the IssueRelationUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueRelationUpdateMutation
     */
    async issueRelationUpdate(
      id: string,
      vars: Omit<D.IssueRelationUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueRelationUpdateDocument>["issueRelationUpdate"] & LinearSdkIssueRelationUpdate> {
      const response = await requester<D.IssueRelationUpdateMutation, D.IssueRelationUpdateMutationVariables>(
        D.IssueRelationUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.issueRelationUpdate,
        ...createLinearSdkIssueRelationUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the IssueRelationDeleteMutation
     *
     * @param id - id to pass into the IssueRelationDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueRelationDeleteMutation
     */
    async issueRelationDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueRelationDeleteDocument>["issueRelationDelete"] & LinearSdkIssueRelationDelete> {
      const response = await requester<D.IssueRelationDeleteMutation, D.IssueRelationDeleteMutationVariables>(
        D.IssueRelationDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.issueRelationDelete,
        ...createLinearSdkIssueRelationDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the IssueCreateMutation
     *
     * @param vars - variables to pass into the IssueCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueCreateMutation
     */
    async issueCreate(
      vars: D.IssueCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueCreateDocument>["issueCreate"]> {
      const response = await requester<D.IssueCreateMutation, D.IssueCreateMutationVariables>(
        D.IssueCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.issueCreate,
      };
    },
    /**
     * Call the Linear api with the IssueUpdateMutation
     *
     * @param id - id to pass into the IssueUpdateMutation
     * @param vars - variables without undefined id to pass into the IssueUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueUpdateMutation
     */
    async issueUpdate(
      id: string,
      vars: Omit<D.IssueUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueUpdateDocument>["issueUpdate"] & LinearSdkIssueUpdate> {
      const response = await requester<D.IssueUpdateMutation, D.IssueUpdateMutationVariables>(
        D.IssueUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.issueUpdate,
        ...createLinearSdkIssueUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the IssueArchiveMutation
     *
     * @param id - id to pass into the IssueArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueArchiveMutation
     */
    async issueArchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueArchiveDocument>["issueArchive"] & LinearSdkIssueArchive> {
      const response = await requester<D.IssueArchiveMutation, D.IssueArchiveMutationVariables>(
        D.IssueArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.issueArchive,
        ...createLinearSdkIssueArchive(id, requester),
      };
    },
    /**
     * Call the Linear api with the IssueUnarchiveMutation
     *
     * @param id - id to pass into the IssueUnarchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the IssueUnarchiveMutation
     */
    async issueUnarchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.IssueUnarchiveDocument>["issueUnarchive"] & LinearSdkIssueUnarchive> {
      const response = await requester<D.IssueUnarchiveMutation, D.IssueUnarchiveMutationVariables>(
        D.IssueUnarchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.issueUnarchive,
        ...createLinearSdkIssueUnarchive(id, requester),
      };
    },
    /**
     * Call the Linear api with the MilestoneCreateMutation
     *
     * @param vars - variables to pass into the MilestoneCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the MilestoneCreateMutation
     */
    async milestoneCreate(
      vars: D.MilestoneCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.MilestoneCreateDocument>["milestoneCreate"]> {
      const response = await requester<D.MilestoneCreateMutation, D.MilestoneCreateMutationVariables>(
        D.MilestoneCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.milestoneCreate,
      };
    },
    /**
     * Call the Linear api with the MilestoneUpdateMutation
     *
     * @param id - id to pass into the MilestoneUpdateMutation
     * @param vars - variables without undefined id to pass into the MilestoneUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the MilestoneUpdateMutation
     */
    async milestoneUpdate(
      id: string,
      vars: Omit<D.MilestoneUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.MilestoneUpdateDocument>["milestoneUpdate"] & LinearSdkMilestoneUpdate> {
      const response = await requester<D.MilestoneUpdateMutation, D.MilestoneUpdateMutationVariables>(
        D.MilestoneUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.milestoneUpdate,
        ...createLinearSdkMilestoneUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the MilestoneDeleteMutation
     *
     * @param id - id to pass into the MilestoneDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the MilestoneDeleteMutation
     */
    async milestoneDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.MilestoneDeleteDocument>["milestoneDelete"] & LinearSdkMilestoneDelete> {
      const response = await requester<D.MilestoneDeleteMutation, D.MilestoneDeleteMutationVariables>(
        D.MilestoneDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.milestoneDelete,
        ...createLinearSdkMilestoneDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the NotificationCreateMutation
     *
     * @param id - id to pass into the NotificationCreateMutation
     * @param vars - variables without undefined id to pass into the NotificationCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationCreateMutation
     */
    async notificationCreate(
      id: string,
      vars: Omit<D.NotificationCreateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationCreateDocument>["notificationCreate"] & LinearSdkNotificationCreate> {
      const response = await requester<D.NotificationCreateMutation, D.NotificationCreateMutationVariables>(
        D.NotificationCreateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.notificationCreate,
        ...createLinearSdkNotificationCreate(id, requester),
      };
    },
    /**
     * Call the Linear api with the NotificationUpdateMutation
     *
     * @param id - id to pass into the NotificationUpdateMutation
     * @param vars - variables without undefined id to pass into the NotificationUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationUpdateMutation
     */
    async notificationUpdate(
      id: string,
      vars: Omit<D.NotificationUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationUpdateDocument>["notificationUpdate"] & LinearSdkNotificationUpdate> {
      const response = await requester<D.NotificationUpdateMutation, D.NotificationUpdateMutationVariables>(
        D.NotificationUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.notificationUpdate,
        ...createLinearSdkNotificationUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the NotificationDeleteMutation
     *
     * @param id - id to pass into the NotificationDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationDeleteMutation
     */
    async notificationDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationDeleteDocument>["notificationDelete"] & LinearSdkNotificationDelete> {
      const response = await requester<D.NotificationDeleteMutation, D.NotificationDeleteMutationVariables>(
        D.NotificationDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.notificationDelete,
        ...createLinearSdkNotificationDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the NotificationArchiveMutation
     *
     * @param id - id to pass into the NotificationArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationArchiveMutation
     */
    async notificationArchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationArchiveDocument>["notificationArchive"] & LinearSdkNotificationArchive> {
      const response = await requester<D.NotificationArchiveMutation, D.NotificationArchiveMutationVariables>(
        D.NotificationArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.notificationArchive,
        ...createLinearSdkNotificationArchive(id, requester),
      };
    },
    /**
     * Call the Linear api with the NotificationUnarchiveMutation
     *
     * @param id - id to pass into the NotificationUnarchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationUnarchiveMutation
     */
    async notificationUnarchive(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.NotificationUnarchiveDocument>["notificationUnarchive"] & LinearSdkNotificationUnarchive
    > {
      const response = await requester<D.NotificationUnarchiveMutation, D.NotificationUnarchiveMutationVariables>(
        D.NotificationUnarchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.notificationUnarchive,
        ...createLinearSdkNotificationUnarchive(id, requester),
      };
    },
    /**
     * Call the Linear api with the NotificationSubscriptionCreateMutation
     *
     * @param vars - variables to pass into the NotificationSubscriptionCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationSubscriptionCreateMutation
     */
    async notificationSubscriptionCreate(
      vars: D.NotificationSubscriptionCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.NotificationSubscriptionCreateDocument>["notificationSubscriptionCreate"]> {
      const response = await requester<
        D.NotificationSubscriptionCreateMutation,
        D.NotificationSubscriptionCreateMutationVariables
      >(D.NotificationSubscriptionCreateDocument, vars, opts);
      return {
        ...response?.notificationSubscriptionCreate,
      };
    },
    /**
     * Call the Linear api with the NotificationSubscriptionDeleteMutation
     *
     * @param id - id to pass into the NotificationSubscriptionDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the NotificationSubscriptionDeleteMutation
     */
    async notificationSubscriptionDelete(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.NotificationSubscriptionDeleteDocument>["notificationSubscriptionDelete"] &
        LinearSdkNotificationSubscriptionDelete
    > {
      const response = await requester<
        D.NotificationSubscriptionDeleteMutation,
        D.NotificationSubscriptionDeleteMutationVariables
      >(D.NotificationSubscriptionDeleteDocument, { id }, opts);
      return {
        ...response?.notificationSubscriptionDelete,
        ...createLinearSdkNotificationSubscriptionDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the OauthClientCreateMutation
     *
     * @param vars - variables to pass into the OauthClientCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OauthClientCreateMutation
     */
    async oauthClientCreate(
      vars: D.OauthClientCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.OauthClientCreateDocument>["oauthClientCreate"]> {
      const response = await requester<D.OauthClientCreateMutation, D.OauthClientCreateMutationVariables>(
        D.OauthClientCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.oauthClientCreate,
      };
    },
    /**
     * Call the Linear api with the OauthClientUpdateMutation
     *
     * @param id - id to pass into the OauthClientUpdateMutation
     * @param vars - variables without undefined id to pass into the OauthClientUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OauthClientUpdateMutation
     */
    async oauthClientUpdate(
      id: string,
      vars: Omit<D.OauthClientUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.OauthClientUpdateDocument>["oauthClientUpdate"] & LinearSdkOauthClientUpdate> {
      const response = await requester<D.OauthClientUpdateMutation, D.OauthClientUpdateMutationVariables>(
        D.OauthClientUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.oauthClientUpdate,
        ...createLinearSdkOauthClientUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the OauthClientArchiveMutation
     *
     * @param id - id to pass into the OauthClientArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OauthClientArchiveMutation
     */
    async oauthClientArchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.OauthClientArchiveDocument>["oauthClientArchive"] & LinearSdkOauthClientArchive> {
      const response = await requester<D.OauthClientArchiveMutation, D.OauthClientArchiveMutationVariables>(
        D.OauthClientArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.oauthClientArchive,
        ...createLinearSdkOauthClientArchive(id, requester),
      };
    },
    /**
     * Call the Linear api with the OauthClientRotateSecretMutation
     *
     * @param id - id to pass into the OauthClientRotateSecretMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OauthClientRotateSecretMutation
     */
    async oauthClientRotateSecret(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.OauthClientRotateSecretDocument>["oauthClientRotateSecret"] & LinearSdkOauthClientRotateSecret
    > {
      const response = await requester<D.OauthClientRotateSecretMutation, D.OauthClientRotateSecretMutationVariables>(
        D.OauthClientRotateSecretDocument,
        { id },
        opts
      );
      return {
        ...response?.oauthClientRotateSecret,
        ...createLinearSdkOauthClientRotateSecret(id, requester),
      };
    },
    /**
     * Call the Linear api with the OauthTokenRevokeMutation
     *
     * @param vars - variables to pass into the OauthTokenRevokeMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OauthTokenRevokeMutation
     */
    async oauthTokenRevoke(
      vars: D.OauthTokenRevokeMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.OauthTokenRevokeDocument>["oauthTokenRevoke"]> {
      const response = await requester<D.OauthTokenRevokeMutation, D.OauthTokenRevokeMutationVariables>(
        D.OauthTokenRevokeDocument,
        vars,
        opts
      );
      return {
        ...response?.oauthTokenRevoke,
      };
    },
    /**
     * Call the Linear api with the OrganizationDomainVerifyMutation
     *
     * @param vars - variables to pass into the OrganizationDomainVerifyMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationDomainVerifyMutation
     */
    async organizationDomainVerify(
      vars: D.OrganizationDomainVerifyMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationDomainVerifyDocument>["organizationDomainVerify"]> {
      const response = await requester<D.OrganizationDomainVerifyMutation, D.OrganizationDomainVerifyMutationVariables>(
        D.OrganizationDomainVerifyDocument,
        vars,
        opts
      );
      return {
        ...response?.organizationDomainVerify,
      };
    },
    /**
     * Call the Linear api with the OrganizationDomainCreateMutation
     *
     * @param vars - variables to pass into the OrganizationDomainCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationDomainCreateMutation
     */
    async organizationDomainCreate(
      vars: D.OrganizationDomainCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationDomainCreateDocument>["organizationDomainCreate"]> {
      const response = await requester<D.OrganizationDomainCreateMutation, D.OrganizationDomainCreateMutationVariables>(
        D.OrganizationDomainCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.organizationDomainCreate,
      };
    },
    /**
     * Call the Linear api with the OrganizationDomainDeleteMutation
     *
     * @param id - id to pass into the OrganizationDomainDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationDomainDeleteMutation
     */
    async organizationDomainDelete(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.OrganizationDomainDeleteDocument>["organizationDomainDelete"] &
        LinearSdkOrganizationDomainDelete
    > {
      const response = await requester<D.OrganizationDomainDeleteMutation, D.OrganizationDomainDeleteMutationVariables>(
        D.OrganizationDomainDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.organizationDomainDelete,
        ...createLinearSdkOrganizationDomainDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the OrganizationInviteCreateMutation
     *
     * @param vars - variables to pass into the OrganizationInviteCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationInviteCreateMutation
     */
    async organizationInviteCreate(
      vars: D.OrganizationInviteCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.OrganizationInviteCreateDocument>["organizationInviteCreate"]> {
      const response = await requester<D.OrganizationInviteCreateMutation, D.OrganizationInviteCreateMutationVariables>(
        D.OrganizationInviteCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.organizationInviteCreate,
      };
    },
    /**
     * Call the Linear api with the ResentOrganizationInviteMutation
     *
     * @param id - id to pass into the ResentOrganizationInviteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ResentOrganizationInviteMutation
     */
    async resentOrganizationInvite(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.ResentOrganizationInviteDocument>["resentOrganizationInvite"] &
        LinearSdkResentOrganizationInvite
    > {
      const response = await requester<D.ResentOrganizationInviteMutation, D.ResentOrganizationInviteMutationVariables>(
        D.ResentOrganizationInviteDocument,
        { id },
        opts
      );
      return {
        ...response?.resentOrganizationInvite,
        ...createLinearSdkResentOrganizationInvite(id, requester),
      };
    },
    /**
     * Call the Linear api with the OrganizationInviteDeleteMutation
     *
     * @param id - id to pass into the OrganizationInviteDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the OrganizationInviteDeleteMutation
     */
    async organizationInviteDelete(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.OrganizationInviteDeleteDocument>["organizationInviteDelete"] &
        LinearSdkOrganizationInviteDelete
    > {
      const response = await requester<D.OrganizationInviteDeleteMutation, D.OrganizationInviteDeleteMutationVariables>(
        D.OrganizationInviteDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.organizationInviteDelete,
        ...createLinearSdkOrganizationInviteDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the ProjectLinkCreateMutation
     *
     * @param vars - variables to pass into the ProjectLinkCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectLinkCreateMutation
     */
    async projectLinkCreate(
      vars: D.ProjectLinkCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.ProjectLinkCreateDocument>["projectLinkCreate"]> {
      const response = await requester<D.ProjectLinkCreateMutation, D.ProjectLinkCreateMutationVariables>(
        D.ProjectLinkCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.projectLinkCreate,
      };
    },
    /**
     * Call the Linear api with the ProjectLinkDeleteMutation
     *
     * @param id - id to pass into the ProjectLinkDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectLinkDeleteMutation
     */
    async projectLinkDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.ProjectLinkDeleteDocument>["projectLinkDelete"] & LinearSdkProjectLinkDelete> {
      const response = await requester<D.ProjectLinkDeleteMutation, D.ProjectLinkDeleteMutationVariables>(
        D.ProjectLinkDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.projectLinkDelete,
        ...createLinearSdkProjectLinkDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the ProjectCreateMutation
     *
     * @param vars - variables to pass into the ProjectCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectCreateMutation
     */
    async projectCreate(
      vars: D.ProjectCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.ProjectCreateDocument>["projectCreate"]> {
      const response = await requester<D.ProjectCreateMutation, D.ProjectCreateMutationVariables>(
        D.ProjectCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.projectCreate,
      };
    },
    /**
     * Call the Linear api with the ProjectUpdateMutation
     *
     * @param id - id to pass into the ProjectUpdateMutation
     * @param vars - variables without undefined id to pass into the ProjectUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectUpdateMutation
     */
    async projectUpdate(
      id: string,
      vars: Omit<D.ProjectUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.ProjectUpdateDocument>["projectUpdate"] & LinearSdkProjectUpdate> {
      const response = await requester<D.ProjectUpdateMutation, D.ProjectUpdateMutationVariables>(
        D.ProjectUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.projectUpdate,
        ...createLinearSdkProjectUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the ProjectArchiveMutation
     *
     * @param id - id to pass into the ProjectArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ProjectArchiveMutation
     */
    async projectArchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.ProjectArchiveDocument>["projectArchive"] & LinearSdkProjectArchive> {
      const response = await requester<D.ProjectArchiveMutation, D.ProjectArchiveMutationVariables>(
        D.ProjectArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.projectArchive,
        ...createLinearSdkProjectArchive(id, requester),
      };
    },
    /**
     * Call the Linear api with the PushSubscriptionCreateMutation
     *
     * @param vars - variables to pass into the PushSubscriptionCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the PushSubscriptionCreateMutation
     */
    async pushSubscriptionCreate(
      vars: D.PushSubscriptionCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.PushSubscriptionCreateDocument>["pushSubscriptionCreate"]> {
      const response = await requester<D.PushSubscriptionCreateMutation, D.PushSubscriptionCreateMutationVariables>(
        D.PushSubscriptionCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.pushSubscriptionCreate,
      };
    },
    /**
     * Call the Linear api with the PushSubscriptionDeleteMutation
     *
     * @param id - id to pass into the PushSubscriptionDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the PushSubscriptionDeleteMutation
     */
    async pushSubscriptionDelete(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.PushSubscriptionDeleteDocument>["pushSubscriptionDelete"] & LinearSdkPushSubscriptionDelete
    > {
      const response = await requester<D.PushSubscriptionDeleteMutation, D.PushSubscriptionDeleteMutationVariables>(
        D.PushSubscriptionDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.pushSubscriptionDelete,
        ...createLinearSdkPushSubscriptionDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the ReactionCreateMutation
     *
     * @param vars - variables to pass into the ReactionCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ReactionCreateMutation
     */
    async reactionCreate(
      vars: D.ReactionCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.ReactionCreateDocument>["reactionCreate"]> {
      const response = await requester<D.ReactionCreateMutation, D.ReactionCreateMutationVariables>(
        D.ReactionCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.reactionCreate,
      };
    },
    /**
     * Call the Linear api with the ReactionDeleteMutation
     *
     * @param id - id to pass into the ReactionDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ReactionDeleteMutation
     */
    async reactionDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.ReactionDeleteDocument>["reactionDelete"] & LinearSdkReactionDelete> {
      const response = await requester<D.ReactionDeleteMutation, D.ReactionDeleteMutationVariables>(
        D.ReactionDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.reactionDelete,
        ...createLinearSdkReactionDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the CreateCsvExportReportMutation
     *
     * @param vars - variables to pass into the CreateCsvExportReportMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the CreateCsvExportReportMutation
     */
    async createCsvExportReport(
      vars?: D.CreateCsvExportReportMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.CreateCsvExportReportDocument>["createCsvExportReport"]> {
      const response = await requester<D.CreateCsvExportReportMutation, D.CreateCsvExportReportMutationVariables>(
        D.CreateCsvExportReportDocument,
        vars,
        opts
      );
      return {
        ...response?.createCsvExportReport,
      };
    },
    /**
     * Call the Linear api with the SubscriptionSessionCreateMutation
     *
     * @param vars - variables to pass into the SubscriptionSessionCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the SubscriptionSessionCreateMutation
     */
    async subscriptionSessionCreate(
      vars: D.SubscriptionSessionCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.SubscriptionSessionCreateDocument>["subscriptionSessionCreate"]> {
      const response = await requester<
        D.SubscriptionSessionCreateMutation,
        D.SubscriptionSessionCreateMutationVariables
      >(D.SubscriptionSessionCreateDocument, vars, opts);
      return {
        ...response?.subscriptionSessionCreate,
      };
    },
    /**
     * Call the Linear api with the SubscriptionUpdateSessionCreateMutation
     *
     * @param vars - variables to pass into the SubscriptionUpdateSessionCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the SubscriptionUpdateSessionCreateMutation
     */
    async subscriptionUpdateSessionCreate(
      vars?: D.SubscriptionUpdateSessionCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.SubscriptionUpdateSessionCreateDocument>["subscriptionUpdateSessionCreate"]> {
      const response = await requester<
        D.SubscriptionUpdateSessionCreateMutation,
        D.SubscriptionUpdateSessionCreateMutationVariables
      >(D.SubscriptionUpdateSessionCreateDocument, vars, opts);
      return {
        ...response?.subscriptionUpdateSessionCreate,
      };
    },
    /**
     * Call the Linear api with the SubscriptionUpdateMutation
     *
     * @param id - id to pass into the SubscriptionUpdateMutation
     * @param vars - variables without undefined id to pass into the SubscriptionUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the SubscriptionUpdateMutation
     */
    async subscriptionUpdate(
      id: string,
      vars: Omit<D.SubscriptionUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.SubscriptionUpdateDocument>["subscriptionUpdate"] & LinearSdkSubscriptionUpdate> {
      const response = await requester<D.SubscriptionUpdateMutation, D.SubscriptionUpdateMutationVariables>(
        D.SubscriptionUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.subscriptionUpdate,
        ...createLinearSdkSubscriptionUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the SubscriptionUpgradeMutation
     *
     * @param id - id to pass into the SubscriptionUpgradeMutation
     * @param vars - variables without undefined id to pass into the SubscriptionUpgradeMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the SubscriptionUpgradeMutation
     */
    async subscriptionUpgrade(
      id: string,
      vars: Omit<D.SubscriptionUpgradeMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.SubscriptionUpgradeDocument>["subscriptionUpgrade"] & LinearSdkSubscriptionUpgrade> {
      const response = await requester<D.SubscriptionUpgradeMutation, D.SubscriptionUpgradeMutationVariables>(
        D.SubscriptionUpgradeDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.subscriptionUpgrade,
        ...createLinearSdkSubscriptionUpgrade(id, requester),
      };
    },
    /**
     * Call the Linear api with the SubscriptionArchiveMutation
     *
     * @param id - id to pass into the SubscriptionArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the SubscriptionArchiveMutation
     */
    async subscriptionArchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.SubscriptionArchiveDocument>["subscriptionArchive"] & LinearSdkSubscriptionArchive> {
      const response = await requester<D.SubscriptionArchiveMutation, D.SubscriptionArchiveMutationVariables>(
        D.SubscriptionArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.subscriptionArchive,
        ...createLinearSdkSubscriptionArchive(id, requester),
      };
    },
    /**
     * Call the Linear api with the TeamMembershipCreateMutation
     *
     * @param vars - variables to pass into the TeamMembershipCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamMembershipCreateMutation
     */
    async teamMembershipCreate(
      vars: D.TeamMembershipCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamMembershipCreateDocument>["teamMembershipCreate"]> {
      const response = await requester<D.TeamMembershipCreateMutation, D.TeamMembershipCreateMutationVariables>(
        D.TeamMembershipCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.teamMembershipCreate,
      };
    },
    /**
     * Call the Linear api with the TeamMembershipDeleteMutation
     *
     * @param id - id to pass into the TeamMembershipDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamMembershipDeleteMutation
     */
    async teamMembershipDelete(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.TeamMembershipDeleteDocument>["teamMembershipDelete"] & LinearSdkTeamMembershipDelete
    > {
      const response = await requester<D.TeamMembershipDeleteMutation, D.TeamMembershipDeleteMutationVariables>(
        D.TeamMembershipDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.teamMembershipDelete,
        ...createLinearSdkTeamMembershipDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the TeamCreateMutation
     *
     * @param vars - variables to pass into the TeamCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamCreateMutation
     */
    async teamCreate(
      vars: D.TeamCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamCreateDocument>["teamCreate"]> {
      const response = await requester<D.TeamCreateMutation, D.TeamCreateMutationVariables>(
        D.TeamCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.teamCreate,
      };
    },
    /**
     * Call the Linear api with the TeamUpdateMutation
     *
     * @param id - id to pass into the TeamUpdateMutation
     * @param vars - variables without undefined id to pass into the TeamUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamUpdateMutation
     */
    async teamUpdate(
      id: string,
      vars: Omit<D.TeamUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamUpdateDocument>["teamUpdate"] & LinearSdkTeamUpdate> {
      const response = await requester<D.TeamUpdateMutation, D.TeamUpdateMutationVariables>(
        D.TeamUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.teamUpdate,
        ...createLinearSdkTeamUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the TeamArchiveMutation
     *
     * @param id - id to pass into the TeamArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamArchiveMutation
     */
    async teamArchive(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamArchiveDocument>["teamArchive"] & LinearSdkTeamArchive> {
      const response = await requester<D.TeamArchiveMutation, D.TeamArchiveMutationVariables>(
        D.TeamArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.teamArchive,
        ...createLinearSdkTeamArchive(id, requester),
      };
    },
    /**
     * Call the Linear api with the TeamDeleteMutation
     *
     * @param id - id to pass into the TeamDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TeamDeleteMutation
     */
    async teamDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamDeleteDocument>["teamDelete"] & LinearSdkTeamDelete> {
      const response = await requester<D.TeamDeleteMutation, D.TeamDeleteMutationVariables>(
        D.TeamDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.teamDelete,
        ...createLinearSdkTeamDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the TemplateCreateMutation
     *
     * @param vars - variables to pass into the TemplateCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TemplateCreateMutation
     */
    async templateCreate(
      vars: D.TemplateCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.TemplateCreateDocument>["templateCreate"]> {
      const response = await requester<D.TemplateCreateMutation, D.TemplateCreateMutationVariables>(
        D.TemplateCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.templateCreate,
      };
    },
    /**
     * Call the Linear api with the TemplateUpdateMutation
     *
     * @param id - id to pass into the TemplateUpdateMutation
     * @param vars - variables without undefined id to pass into the TemplateUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TemplateUpdateMutation
     */
    async templateUpdate(
      id: string,
      vars: Omit<D.TemplateUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.TemplateUpdateDocument>["templateUpdate"] & LinearSdkTemplateUpdate> {
      const response = await requester<D.TemplateUpdateMutation, D.TemplateUpdateMutationVariables>(
        D.TemplateUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.templateUpdate,
        ...createLinearSdkTemplateUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the TemplateDeleteMutation
     *
     * @param id - id to pass into the TemplateDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the TemplateDeleteMutation
     */
    async templateDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.TemplateDeleteDocument>["templateDelete"] & LinearSdkTemplateDelete> {
      const response = await requester<D.TemplateDeleteMutation, D.TemplateDeleteMutationVariables>(
        D.TemplateDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.templateDelete,
        ...createLinearSdkTemplateDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the UserSettingsUpdateMutation
     *
     * @param id - id to pass into the UserSettingsUpdateMutation
     * @param vars - variables without undefined id to pass into the UserSettingsUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserSettingsUpdateMutation
     */
    async userSettingsUpdate(
      id: string,
      vars: Omit<D.UserSettingsUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.UserSettingsUpdateDocument>["userSettingsUpdate"] & LinearSdkUserSettingsUpdate> {
      const response = await requester<D.UserSettingsUpdateMutation, D.UserSettingsUpdateMutationVariables>(
        D.UserSettingsUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.userSettingsUpdate,
        ...createLinearSdkUserSettingsUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the UserSettingsFlagIncrementMutation
     *
     * @param vars - variables to pass into the UserSettingsFlagIncrementMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserSettingsFlagIncrementMutation
     */
    async userSettingsFlagIncrement(
      vars: D.UserSettingsFlagIncrementMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.UserSettingsFlagIncrementDocument>["userSettingsFlagIncrement"]> {
      const response = await requester<
        D.UserSettingsFlagIncrementMutation,
        D.UserSettingsFlagIncrementMutationVariables
      >(D.UserSettingsFlagIncrementDocument, vars, opts);
      return {
        ...response?.userSettingsFlagIncrement,
      };
    },
    /**
     * Call the Linear api with the UserSettingsFlagsResetMutation
     *
     * @param vars - variables to pass into the UserSettingsFlagsResetMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserSettingsFlagsResetMutation
     */
    async userSettingsFlagsReset(
      vars?: D.UserSettingsFlagsResetMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.UserSettingsFlagsResetDocument>["userSettingsFlagsReset"]> {
      const response = await requester<D.UserSettingsFlagsResetMutation, D.UserSettingsFlagsResetMutationVariables>(
        D.UserSettingsFlagsResetDocument,
        vars,
        opts
      );
      return {
        ...response?.userSettingsFlagsReset,
      };
    },
    /**
     * Call the Linear api with the UserFlagUpdateMutation
     *
     * @param vars - variables to pass into the UserFlagUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserFlagUpdateMutation
     */
    async userFlagUpdate(
      vars: D.UserFlagUpdateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.UserFlagUpdateDocument>["userFlagUpdate"]> {
      const response = await requester<D.UserFlagUpdateMutation, D.UserFlagUpdateMutationVariables>(
        D.UserFlagUpdateDocument,
        vars,
        opts
      );
      return {
        ...response?.userFlagUpdate,
      };
    },
    /**
     * Call the Linear api with the UserSubscribeToNewsletterMutation
     *
     * @param vars - variables to pass into the UserSubscribeToNewsletterMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the UserSubscribeToNewsletterMutation
     */
    async userSubscribeToNewsletter(
      vars?: D.UserSubscribeToNewsletterMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.UserSubscribeToNewsletterDocument>["userSubscribeToNewsletter"]> {
      const response = await requester<
        D.UserSubscribeToNewsletterMutation,
        D.UserSubscribeToNewsletterMutationVariables
      >(D.UserSubscribeToNewsletterDocument, vars, opts);
      return {
        ...response?.userSubscribeToNewsletter,
      };
    },
    /**
     * Call the Linear api with the ViewPreferencesCreateMutation
     *
     * @param vars - variables to pass into the ViewPreferencesCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ViewPreferencesCreateMutation
     */
    async viewPreferencesCreate(
      vars: D.ViewPreferencesCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.ViewPreferencesCreateDocument>["viewPreferencesCreate"]> {
      const response = await requester<D.ViewPreferencesCreateMutation, D.ViewPreferencesCreateMutationVariables>(
        D.ViewPreferencesCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.viewPreferencesCreate,
      };
    },
    /**
     * Call the Linear api with the ViewPreferencesUpdateMutation
     *
     * @param id - id to pass into the ViewPreferencesUpdateMutation
     * @param vars - variables without undefined id to pass into the ViewPreferencesUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ViewPreferencesUpdateMutation
     */
    async viewPreferencesUpdate(
      id: string,
      vars: Omit<D.ViewPreferencesUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<
      ResultOf<typeof D.ViewPreferencesUpdateDocument>["viewPreferencesUpdate"] & LinearSdkViewPreferencesUpdate
    > {
      const response = await requester<D.ViewPreferencesUpdateMutation, D.ViewPreferencesUpdateMutationVariables>(
        D.ViewPreferencesUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.viewPreferencesUpdate,
        ...createLinearSdkViewPreferencesUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the ViewPreferencesDeleteMutation
     *
     * @param id - id to pass into the ViewPreferencesDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the ViewPreferencesDeleteMutation
     */
    async viewPreferencesDelete(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.ViewPreferencesDeleteDocument>["viewPreferencesDelete"] & LinearSdkViewPreferencesDelete
    > {
      const response = await requester<D.ViewPreferencesDeleteMutation, D.ViewPreferencesDeleteMutationVariables>(
        D.ViewPreferencesDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.viewPreferencesDelete,
        ...createLinearSdkViewPreferencesDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the WebhookCreateMutation
     *
     * @param vars - variables to pass into the WebhookCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the WebhookCreateMutation
     */
    async webhookCreate(
      vars: D.WebhookCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.WebhookCreateDocument>["webhookCreate"]> {
      const response = await requester<D.WebhookCreateMutation, D.WebhookCreateMutationVariables>(
        D.WebhookCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.webhookCreate,
      };
    },
    /**
     * Call the Linear api with the WebhookUpdateMutation
     *
     * @param id - id to pass into the WebhookUpdateMutation
     * @param vars - variables without undefined id to pass into the WebhookUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the WebhookUpdateMutation
     */
    async webhookUpdate(
      id: string,
      vars: Omit<D.WebhookUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.WebhookUpdateDocument>["webhookUpdate"] & LinearSdkWebhookUpdate> {
      const response = await requester<D.WebhookUpdateMutation, D.WebhookUpdateMutationVariables>(
        D.WebhookUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.webhookUpdate,
        ...createLinearSdkWebhookUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the WebhookDeleteMutation
     *
     * @param id - id to pass into the WebhookDeleteMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the WebhookDeleteMutation
     */
    async webhookDelete(
      id: string,
      opts?: O
    ): Promise<ResultOf<typeof D.WebhookDeleteDocument>["webhookDelete"] & LinearSdkWebhookDelete> {
      const response = await requester<D.WebhookDeleteMutation, D.WebhookDeleteMutationVariables>(
        D.WebhookDeleteDocument,
        { id },
        opts
      );
      return {
        ...response?.webhookDelete,
        ...createLinearSdkWebhookDelete(id, requester),
      };
    },
    /**
     * Call the Linear api with the WorkflowStateCreateMutation
     *
     * @param vars - variables to pass into the WorkflowStateCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the WorkflowStateCreateMutation
     */
    async workflowStateCreate(
      vars: D.WorkflowStateCreateMutationVariables,
      opts?: O
    ): Promise<ResultOf<typeof D.WorkflowStateCreateDocument>["workflowStateCreate"]> {
      const response = await requester<D.WorkflowStateCreateMutation, D.WorkflowStateCreateMutationVariables>(
        D.WorkflowStateCreateDocument,
        vars,
        opts
      );
      return {
        ...response?.workflowStateCreate,
      };
    },
    /**
     * Call the Linear api with the WorkflowStateUpdateMutation
     *
     * @param id - id to pass into the WorkflowStateUpdateMutation
     * @param vars - variables without undefined id to pass into the WorkflowStateUpdateMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the WorkflowStateUpdateMutation
     */
    async workflowStateUpdate(
      id: string,
      vars: Omit<D.WorkflowStateUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.WorkflowStateUpdateDocument>["workflowStateUpdate"] & LinearSdkWorkflowStateUpdate> {
      const response = await requester<D.WorkflowStateUpdateMutation, D.WorkflowStateUpdateMutationVariables>(
        D.WorkflowStateUpdateDocument,
        { id, ...vars },
        opts
      );
      return {
        ...response?.workflowStateUpdate,
        ...createLinearSdkWorkflowStateUpdate(id, requester),
      };
    },
    /**
     * Call the Linear api with the WorkflowStateArchiveMutation
     *
     * @param id - id to pass into the WorkflowStateArchiveMutation
     * @param opts - options to pass to the graphql client
     * @returns The result of the WorkflowStateArchiveMutation
     */
    async workflowStateArchive(
      id: string,
      opts?: O
    ): Promise<
      ResultOf<typeof D.WorkflowStateArchiveDocument>["workflowStateArchive"] & LinearSdkWorkflowStateArchive
    > {
      const response = await requester<D.WorkflowStateArchiveMutation, D.WorkflowStateArchiveMutationVariables>(
        D.WorkflowStateArchiveDocument,
        { id },
        opts
      );
      return {
        ...response?.workflowStateArchive,
        ...createLinearSdkWorkflowStateArchive(id, requester),
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdk
 * Initialise a set of operations to run against the Linear api
 */
export type LinearSdk = ReturnType<typeof createLinearSdk>;
