/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLError, DocumentNode } from "graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import * as D from "./sdk-documents";
export * from "./sdk-documents";

/**
 * The function type for calling the graphql client
 */
export type LinearRequester<O = {}> = <R, V>(doc: DocumentNode, vars?: V, opts?: O) => Promise<R>;

/**
 * The available Linear sdk statuses
 */
export enum LinearStatus {
  /**
   * The request has been successful
   */
  "success" = "success",
  /**
   * The request has returned an error
   */
  "error" = "error",
}

/**
 * The wrapped response type from calling a successful Linear sdk operation
 */
export interface LinearResponse<T, V> {
  /**
   * The status of the graphql operation call
   */
  status: LinearStatus;
  /**
   * The http status code of the graphql operation call
   */
  statusCode?: number;
  /**
   * The data returned from a successful call
   */
  data?: T;
  /**
   * The graphql extensions returned on error
   */
  extensions?: any;
  /**
   * The graphql errors caught when executing the graphql operation
   */
  errors?: GraphQLError[];
  /**
   * The error caught when executing the graphql operation
   */
  error?: Error;
  /**
   * The query causing the error when executing the graphql operation
   */
  query?: string;
  /**
   * The variables causing the error when executing the graphql operation
   */
  variables?: V;
}

/**
 * Runs the operation and wraps the result in a LinearResponse
 * Catches errors and attaches them to the response object
 */
export async function handler<T, V>(operation: () => Promise<T>): Promise<LinearResponse<T, V>> {
  try {
    const response = await operation();
    return {
      status: LinearStatus.success,
      statusCode: 200,
      data: response,
    };
  } catch (error) {
    return {
      ...error,
      status: LinearStatus.error,
      statusCode: error?.response?.status ?? undefined,
      extensions: error?.response?.extensions ?? undefined,
      errors: error?.response?.errors ?? undefined,
      query: error?.request?.query ?? undefined,
      variables: error?.request?.variables ?? undefined,
      error,
    };
  }
}

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
     * Call the Linear api with the IssueAssigneeQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssueAssigneeQuery
     */
    async assignee(
      opts?: O
    ): Promise<LinearResponse<ResultOf<typeof D.IssueAssigneeDocument>, D.IssueAssigneeQueryVariables>> {
      return handler<D.IssueAssigneeQuery, D.IssueAssigneeQueryVariables>(() =>
        requester<D.IssueAssigneeQuery, D.IssueAssigneeQueryVariables>(D.IssueAssigneeDocument, { id }, opts)
      );
    },
  };
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
    ): Promise<LinearResponse<ResultOf<typeof D.TeamIssuesDocument>, D.TeamIssuesQueryVariables>> {
      return handler<D.TeamIssuesQuery, D.TeamIssuesQueryVariables>(() =>
        requester<D.TeamIssuesQuery, D.TeamIssuesQueryVariables>(D.TeamIssuesDocument, { id, ...vars }, opts)
      );
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
    ): Promise<LinearResponse<ResultOf<typeof D.TeamLabelsDocument>, D.TeamLabelsQueryVariables>> {
      return handler<D.TeamLabelsQuery, D.TeamLabelsQueryVariables>(() =>
        requester<D.TeamLabelsQuery, D.TeamLabelsQueryVariables>(D.TeamLabelsDocument, { id, ...vars }, opts)
      );
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
    ): Promise<LinearResponse<ResultOf<typeof D.TeamProjectsDocument>, D.TeamProjectsQueryVariables>> {
      return handler<D.TeamProjectsQuery, D.TeamProjectsQueryVariables>(() =>
        requester<D.TeamProjectsQuery, D.TeamProjectsQueryVariables>(D.TeamProjectsDocument, { id, ...vars }, opts)
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
    ): Promise<LinearResponse<ResultOf<typeof D.TeamStatesDocument>, D.TeamStatesQueryVariables>> {
      return handler<D.TeamStatesQuery, D.TeamStatesQueryVariables>(() =>
        requester<D.TeamStatesQuery, D.TeamStatesQueryVariables>(D.TeamStatesDocument, { id, ...vars }, opts)
      );
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
    async issues(
      vars?: D.IssuesQueryVariables,
      opts?: O
    ): Promise<LinearResponse<ResultOf<typeof D.IssuesDocument>["issues"], D.IssuesQueryVariables>> {
      const response = await handler<D.IssuesQuery, D.IssuesQueryVariables>(() =>
        requester<D.IssuesQuery, D.IssuesQueryVariables>(D.IssuesDocument, vars, opts)
      );
      return {
        ...response,
        data: response?.data?.issues,
      };
    },
    /**
     * Call the Linear api with the IssueQuery
     *
     * @param id - id to pass into the IssueQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssueQuery
     */
    async issue(
      id: string,
      opts?: O
    ): Promise<LinearResponse<ResultOf<typeof D.IssueDocument>["issue"], D.IssueQueryVariables> & LinearSdkIssue> {
      const response = await handler<D.IssueQuery, D.IssueQueryVariables>(() =>
        requester<D.IssueQuery, D.IssueQueryVariables>(D.IssueDocument, { id }, opts)
      );
      return {
        ...response,
        ...createLinearSdkIssue(id, requester),
        data: response?.data?.issue,
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
    ): Promise<LinearResponse<ResultOf<typeof D.IssueCreateDocument>["issueCreate"], D.IssueCreateMutationVariables>> {
      const response = await handler<D.IssueCreateMutation, D.IssueCreateMutationVariables>(() =>
        requester<D.IssueCreateMutation, D.IssueCreateMutationVariables>(D.IssueCreateDocument, vars, opts)
      );
      return {
        ...response,
        data: response?.data?.issueCreate,
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
    ): Promise<
      LinearResponse<ResultOf<typeof D.IssueUpdateDocument>["issueUpdate"], D.IssueUpdateMutationVariables> &
        LinearSdkIssueUpdate
    > {
      const response = await handler<D.IssueUpdateMutation, D.IssueUpdateMutationVariables>(() =>
        requester<D.IssueUpdateMutation, D.IssueUpdateMutationVariables>(D.IssueUpdateDocument, { id, ...vars }, opts)
      );
      return {
        ...response,
        ...createLinearSdkIssueUpdate(id, requester),
        data: response?.data?.issueUpdate,
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
    ): Promise<
      LinearResponse<ResultOf<typeof D.IssueArchiveDocument>["issueArchive"], D.IssueArchiveMutationVariables> &
        LinearSdkIssueArchive
    > {
      const response = await handler<D.IssueArchiveMutation, D.IssueArchiveMutationVariables>(() =>
        requester<D.IssueArchiveMutation, D.IssueArchiveMutationVariables>(D.IssueArchiveDocument, { id }, opts)
      );
      return {
        ...response,
        ...createLinearSdkIssueArchive(id, requester),
        data: response?.data?.issueArchive,
      };
    },
    /**
     * Call the Linear api with the TeamsQuery
     *
     * @param vars - variables to pass into the TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamsQuery
     */
    async teams(
      vars?: D.TeamsQueryVariables,
      opts?: O
    ): Promise<LinearResponse<ResultOf<typeof D.TeamsDocument>["teams"], D.TeamsQueryVariables>> {
      const response = await handler<D.TeamsQuery, D.TeamsQueryVariables>(() =>
        requester<D.TeamsQuery, D.TeamsQueryVariables>(D.TeamsDocument, vars, opts)
      );
      return {
        ...response,
        data: response?.data?.teams,
      };
    },
    /**
     * Call the Linear api with the TeamQuery
     *
     * @param id - id to pass into the TeamQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamQuery
     */
    async team(
      id: string,
      opts?: O
    ): Promise<LinearResponse<ResultOf<typeof D.TeamDocument>["team"], D.TeamQueryVariables> & LinearSdkTeam> {
      const response = await handler<D.TeamQuery, D.TeamQueryVariables>(() =>
        requester<D.TeamQuery, D.TeamQueryVariables>(D.TeamDocument, { id }, opts)
      );
      return {
        ...response,
        ...createLinearSdkTeam(id, requester),
        data: response?.data?.team,
      };
    },
    /**
     * Call the Linear api with the UsersQuery
     *
     * @param vars - variables to pass into the UsersQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the UsersQuery
     */
    async users(
      vars?: D.UsersQueryVariables,
      opts?: O
    ): Promise<LinearResponse<ResultOf<typeof D.UsersDocument>["users"], D.UsersQueryVariables>> {
      const response = await handler<D.UsersQuery, D.UsersQueryVariables>(() =>
        requester<D.UsersQuery, D.UsersQueryVariables>(D.UsersDocument, vars, opts)
      );
      return {
        ...response,
        data: response?.data?.users,
      };
    },
    /**
     * Call the Linear api with the ViewerQuery
     *
     * @param vars - variables to pass into the ViewerQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the ViewerQuery
     */
    async viewer(
      vars?: D.ViewerQueryVariables,
      opts?: O
    ): Promise<LinearResponse<ResultOf<typeof D.ViewerDocument>["viewer"], D.ViewerQueryVariables>> {
      const response = await handler<D.ViewerQuery, D.ViewerQueryVariables>(() =>
        requester<D.ViewerQuery, D.ViewerQueryVariables>(D.ViewerDocument, vars, opts)
      );
      return {
        ...response,
        data: response?.data?.viewer,
      };
    },
  };
}

/**
 * The returned type from calling createLinearSdk
 * Initialise a set of operations to run against the Linear api
 */
export type LinearSdk = ReturnType<typeof createLinearSdk>;
