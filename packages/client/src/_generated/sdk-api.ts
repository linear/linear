/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocumentNode } from "graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import * as D from "./sdk-documents";
export * from "./sdk-documents";

/**
 * The function type for calling the graphql client
 */
export type LinearRequester<O = {}> = <R, V>(doc: DocumentNode, vars?: V, opts?: O) => Promise<R>;

/**
 * Initialise a set of operations, scoped to issue, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issue
 */
export function createLinearSdkIssue<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createLinearSdkIssue
 * Initialise a set of operations, scoped to issue, to run against the Linear api
 */
export type LinearSdkIssue = ReturnType<typeof createLinearSdkIssue>;

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
 * Initialise a set of operations, scoped to team, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single team
 */
export function createLinearSdkTeam<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the TeamIssuesQuery
     *
     * @param vars - variables without team id to pass into the TeamIssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamIssuesQuery
     */
    async issues(
      vars?: Omit<D.TeamIssuesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamIssuesDocument>> {
      return requester<D.TeamIssuesQuery, D.TeamIssuesQueryVariables>(D.TeamIssuesDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the TeamLabelsQuery
     *
     * @param vars - variables without team id to pass into the TeamLabelsQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamLabelsQuery
     */
    async labels(
      vars?: Omit<D.TeamLabelsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamLabelsDocument>> {
      return requester<D.TeamLabelsQuery, D.TeamLabelsQueryVariables>(D.TeamLabelsDocument, { id, ...vars }, opts);
    },
    /**
     * Call the Linear api with the TeamProjectsQuery
     *
     * @param vars - variables without team id to pass into the TeamProjectsQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamProjectsQuery
     */
    async projects(
      vars?: Omit<D.TeamProjectsQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamProjectsDocument>> {
      return requester<D.TeamProjectsQuery, D.TeamProjectsQueryVariables>(
        D.TeamProjectsDocument,
        { id, ...vars },
        opts
      );
    },
    /**
     * Call the Linear api with the TeamStatesQuery
     *
     * @param vars - variables without team id to pass into the TeamStatesQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamStatesQuery
     */
    async states(
      vars?: Omit<D.TeamStatesQueryVariables, "id">,
      opts?: O
    ): Promise<ResultOf<typeof D.TeamStatesDocument>> {
      return requester<D.TeamStatesQuery, D.TeamStatesQueryVariables>(D.TeamStatesDocument, { id, ...vars }, opts);
    },
  };
}

/**
 * The returned type from calling createLinearSdkTeam
 * Initialise a set of operations, scoped to team, to run against the Linear api
 */
export type LinearSdkTeam = ReturnType<typeof createLinearSdkTeam>;

/**
 * Initialise a set of operations to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations
 */
export function createLinearSdk<O>(requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the IssuesQuery
     *
     * @param vars - variables to pass into the IssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssuesQuery
     */
    async issues(vars?: D.IssuesQueryVariables, opts?: O): Promise<ResultOf<typeof D.IssuesDocument>["issues"]> {
      const response = await requester<D.IssuesQuery, D.IssuesQueryVariables>(D.IssuesDocument, vars, opts);
      return {
        ...response?.issues,
      };
    },
    /**
     * Call the Linear api with the IssueQuery
     *
     * @param id - id to pass into the IssueQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssueQuery
     */
    async issue(id: string, opts?: O): Promise<ResultOf<typeof D.IssueDocument>["issue"] & LinearSdkIssue> {
      const response = await requester<D.IssueQuery, D.IssueQueryVariables>(D.IssueDocument, { id }, opts);
      return {
        ...response?.issue,
        ...createLinearSdkIssue(id, requester),
      };
    },
    /**
     * Call the Linear api with the IssueCreateMutation
     *
     * @param vars - variables to pass into the IssueCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssueCreateMutation
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
     * @returns The wrapped result of the IssueUpdateMutation
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
     * @returns The wrapped result of the IssueArchiveMutation
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
     * Call the Linear api with the TeamsQuery
     *
     * @param vars - variables to pass into the TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamsQuery
     */
    async teams(vars?: D.TeamsQueryVariables, opts?: O): Promise<ResultOf<typeof D.TeamsDocument>["teams"]> {
      const response = await requester<D.TeamsQuery, D.TeamsQueryVariables>(D.TeamsDocument, vars, opts);
      return {
        ...response?.teams,
      };
    },
    /**
     * Call the Linear api with the TeamQuery
     *
     * @param id - id to pass into the TeamQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamQuery
     */
    async team(id: string, opts?: O): Promise<ResultOf<typeof D.TeamDocument>["team"] & LinearSdkTeam> {
      const response = await requester<D.TeamQuery, D.TeamQueryVariables>(D.TeamDocument, { id }, opts);
      return {
        ...response?.team,
        ...createLinearSdkTeam(id, requester),
      };
    },
    /**
     * Call the Linear api with the UsersQuery
     *
     * @param vars - variables to pass into the UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the UsersQuery
     */
    async users(vars?: D.UsersQueryVariables, opts?: O): Promise<ResultOf<typeof D.UsersDocument>["users"]> {
      const response = await requester<D.UsersQuery, D.UsersQueryVariables>(D.UsersDocument, vars, opts);
      return {
        ...response?.users,
      };
    },
    /**
     * Call the Linear api with the ViewerQuery
     *
     * @param vars - variables to pass into the ViewerQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the ViewerQuery
     */
    async viewer(vars?: D.ViewerQueryVariables, opts?: O): Promise<ResultOf<typeof D.ViewerDocument>["viewer"]> {
      const response = await requester<D.ViewerQuery, D.ViewerQueryVariables>(D.ViewerDocument, vars, opts);
      return {
        ...response?.viewer,
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdk
 * Initialise a set of operations to run against the Linear api
 */
export type LinearSdk = ReturnType<typeof createLinearSdk>;
