/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLError, DocumentNode } from "graphql";
import * as T from "./sdk-types";
export * from "./sdk-types";

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
 * Initialise a set of operations, scoped to issueUpdate, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issueUpdate
 */
export function createRawLinearSdkIssueUpdate<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createRawLinearSdkIssueUpdate
 * Initialise a set of operations, scoped to issueUpdate, to run against the Linear api
 */
export type LinearSdkIssueUpdate = ReturnType<typeof createRawLinearSdkIssueUpdate>;

/**
 * Initialise a set of operations, scoped to issueArchive, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issueArchive
 */
export function createRawLinearSdkIssueArchive<O>(id: string, requester: LinearRequester<O>) {
  return {};
}

/**
 * The returned type from calling createRawLinearSdkIssueArchive
 * Initialise a set of operations, scoped to issueArchive, to run against the Linear api
 */
export type LinearSdkIssueArchive = ReturnType<typeof createRawLinearSdkIssueArchive>;

/**
 * Initialise a set of operations, scoped to team, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single team
 */
export function createRawLinearSdkTeam<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the TeamIssuesQuery
     *
     * @param vars - variables without team id to pass into the TeamIssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamIssuesQuery
     */
    async issues(
      vars?: Omit<T.TeamIssuesQueryVariables, "id">,
      opts?: O
    ): Promise<LinearResponse<T.TeamIssuesQuery, T.TeamIssuesQueryVariables>> {
      return handler<T.TeamIssuesQuery, T.TeamIssuesQueryVariables>(() =>
        requester<T.TeamIssuesQuery, T.TeamIssuesQueryVariables>(D.TeamIssuesDocument, { id, ...vars }, opts)
      );
    },
  };
}

/**
 * The returned type from calling createRawLinearSdkTeam
 * Initialise a set of operations, scoped to team, to run against the Linear api
 */
export type LinearSdkTeam = ReturnType<typeof createRawLinearSdkTeam>;

/**
 * Initialise a set of operations, scoped to issue, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @returns The set of available operations scoped to a single issue
 */
export function createRawLinearSdkIssue<O>(id: string, requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the IssueAssigneeQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssueAssigneeQuery
     */
    async assignee(opts?: O): Promise<LinearResponse<T.IssueAssigneeQuery, T.IssueAssigneeQueryVariables>> {
      return handler<T.IssueAssigneeQuery, T.IssueAssigneeQueryVariables>(() =>
        requester<T.IssueAssigneeQuery, T.IssueAssigneeQueryVariables>(D.IssueAssigneeDocument, { id }, opts)
      );
    },
  };
}

/**
 * The returned type from calling createRawLinearSdkIssue
 * Initialise a set of operations, scoped to issue, to run against the Linear api
 */
export type LinearSdkIssue = ReturnType<typeof createRawLinearSdkIssue>;

/**
 * Initialise a set of operations to run against the Linear api
 *
 * @param requester - function to call the graphql client
 * @returns The set of available operations
 */
export function createRawLinearSdk<O>(requester: LinearRequester<O>) {
  return {
    /**
     * Call the Linear api with the IssueCreateMutation
     *
     * @param vars - variables to pass into the IssueCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssueCreateMutation
     */
    async issueCreate(
      vars: T.IssueCreateMutationVariables,
      opts?: O
    ): Promise<LinearResponse<T.IssueCreateMutation["issueCreate"], T.IssueCreateMutationVariables>> {
      const response = await handler<T.IssueCreateMutation, T.IssueCreateMutationVariables>(() =>
        requester<T.IssueCreateMutation, T.IssueCreateMutationVariables>(D.IssueCreateDocument, vars, opts)
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
      vars: Omit<T.IssueUpdateMutationVariables, "id">,
      opts?: O
    ): Promise<
      LinearResponse<T.IssueUpdateMutation["issueUpdate"], T.IssueUpdateMutationVariables> & LinearSdkIssueUpdate
    > {
      const response = await handler<T.IssueUpdateMutation, T.IssueUpdateMutationVariables>(() =>
        requester<T.IssueUpdateMutation, T.IssueUpdateMutationVariables>(D.IssueUpdateDocument, { id, ...vars }, opts)
      );
      return {
        ...response,
        ...createRawLinearSdkIssueUpdate(id, requester),
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
      LinearResponse<T.IssueArchiveMutation["issueArchive"], T.IssueArchiveMutationVariables> & LinearSdkIssueArchive
    > {
      const response = await handler<T.IssueArchiveMutation, T.IssueArchiveMutationVariables>(() =>
        requester<T.IssueArchiveMutation, T.IssueArchiveMutationVariables>(D.IssueArchiveDocument, { id }, opts)
      );
      return {
        ...response,
        ...createRawLinearSdkIssueArchive(id, requester),
        data: response?.data?.issueArchive,
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
      vars?: T.ViewerQueryVariables,
      opts?: O
    ): Promise<LinearResponse<T.ViewerQuery["viewer"], T.ViewerQueryVariables>> {
      const response = await handler<T.ViewerQuery, T.ViewerQueryVariables>(() =>
        requester<T.ViewerQuery, T.ViewerQueryVariables>(D.ViewerDocument, vars, opts)
      );
      return {
        ...response,
        data: response?.data?.viewer,
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
      vars?: T.TeamsQueryVariables,
      opts?: O
    ): Promise<LinearResponse<T.TeamsQuery["teams"], T.TeamsQueryVariables>> {
      const response = await handler<T.TeamsQuery, T.TeamsQueryVariables>(() =>
        requester<T.TeamsQuery, T.TeamsQueryVariables>(D.TeamsDocument, vars, opts)
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
    ): Promise<LinearResponse<T.TeamQuery["team"], T.TeamQueryVariables> & LinearSdkTeam> {
      const response = await handler<T.TeamQuery, T.TeamQueryVariables>(() =>
        requester<T.TeamQuery, T.TeamQueryVariables>(D.TeamDocument, { id }, opts)
      );
      return {
        ...response,
        ...createRawLinearSdkTeam(id, requester),
        data: response?.data?.team,
      };
    },
    /**
     * Call the Linear api with the IssuesQuery
     *
     * @param vars - variables to pass into the IssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssuesQuery
     */
    async issues(
      vars?: T.IssuesQueryVariables,
      opts?: O
    ): Promise<LinearResponse<T.IssuesQuery["issues"], T.IssuesQueryVariables>> {
      const response = await handler<T.IssuesQuery, T.IssuesQueryVariables>(() =>
        requester<T.IssuesQuery, T.IssuesQueryVariables>(D.IssuesDocument, vars, opts)
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
    ): Promise<LinearResponse<T.IssueQuery["issue"], T.IssueQueryVariables> & LinearSdkIssue> {
      const response = await handler<T.IssueQuery, T.IssueQueryVariables>(() =>
        requester<T.IssueQuery, T.IssueQueryVariables>(D.IssueDocument, { id }, opts)
      );
      return {
        ...response,
        ...createRawLinearSdkIssue(id, requester),
        data: response?.data?.issue,
      };
    },
  };
}

/**
 * The returned type from calling createRawLinearSdk
 * Initialise a set of operations to run against the Linear api
 */
export type LinearSdk = ReturnType<typeof createRawLinearSdk>;
