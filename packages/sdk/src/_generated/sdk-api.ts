import { DocumentNode } from "graphql";

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
 * The wrapped response type from calling a Linear sdk operation
 */
export interface LinearResponse<T> {
  status: LinearStatus;
  data?: T;
  error?: Error;
}

/**
 * Runs the operation and wraps the result in a LinearResponse
 * Catches errors and attaches them to the response object
 */
export async function handler<T>(operation: () => Promise<T>): Promise<LinearResponse<T>> {
  try {
    const response = await operation();
    return {
      status: LinearStatus.success,
      data: response,
    };
  } catch (error) {
    return {
      status: LinearStatus.error,
      error,
    };
  }
}

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
     * Call the linear api with the TeamIssuesQuery
     *
     * @param vars - variables without team id to pass into the TeamIssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamIssuesQuery
     */
    async issues(vars?: Omit<T.TeamIssuesQueryVariables, "id">, opts?: O): Promise<LinearResponse<T.TeamIssuesQuery>> {
      const response = await handler(() =>
        requester<T.TeamIssuesQuery, T.TeamIssuesQueryVariables>(D.TeamIssuesDocument, { id, ...vars }, opts)
      );
      return {
        ...response,
      };
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
     * Call the linear api with the IssueAssigneeQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssueAssigneeQuery
     */
    async assignee(opts?: O): Promise<LinearResponse<T.IssueAssigneeQuery>> {
      const response = await handler(() =>
        requester<T.IssueAssigneeQuery, T.IssueAssigneeQueryVariables>(D.IssueAssigneeDocument, { id }, opts)
      );
      return {
        ...response,
      };
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
     * Call the linear api with the IssueCreateMutation
     *
     * @param vars - variables to pass into the IssueCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssueCreateMutation
     */
    async issueCreate(
      vars: T.IssueCreateMutationVariables,
      opts?: O
    ): Promise<LinearResponse<T.IssueCreateMutation["issueCreate"]>> {
      const response = await handler(() =>
        requester<T.IssueCreateMutation, T.IssueCreateMutationVariables>(D.IssueCreateDocument, vars, opts)
      );
      return {
        ...response,
        data: response?.data?.issueCreate,
      };
    },
    /**
     * Call the linear api with the ViewerQuery
     *
     * @param vars - variables to pass into the ViewerQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the ViewerQuery
     */
    async viewer(vars?: T.ViewerQueryVariables, opts?: O): Promise<LinearResponse<T.ViewerQuery["viewer"]>> {
      const response = await handler(() =>
        requester<T.ViewerQuery, T.ViewerQueryVariables>(D.ViewerDocument, vars, opts)
      );
      return {
        ...response,
        data: response?.data?.viewer,
      };
    },
    /**
     * Call the linear api with the TeamsQuery
     *
     * @param vars - variables to pass into the TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamsQuery
     */
    async teams(vars?: T.TeamsQueryVariables, opts?: O): Promise<LinearResponse<T.TeamsQuery["teams"]>> {
      const response = await handler(() => requester<T.TeamsQuery, T.TeamsQueryVariables>(D.TeamsDocument, vars, opts));
      return {
        ...response,
        data: response?.data?.teams,
      };
    },
    /**
     * Call the linear api with the TeamQuery
     *
     * @param id - id to pass into the TeamQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamQuery
     */
    async team(id: string, opts?: O): Promise<LinearResponse<T.TeamQuery["team"]> & LinearSdkTeam> {
      const response = await handler(() => requester<T.TeamQuery, T.TeamQueryVariables>(D.TeamDocument, { id }, opts));
      return {
        ...response,
        data: response?.data?.team,
        ...createRawLinearSdkTeam(id, requester),
      };
    },
    /**
     * Call the linear api with the IssuesQuery
     *
     * @param vars - variables to pass into the IssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssuesQuery
     */
    async issues(vars?: T.IssuesQueryVariables, opts?: O): Promise<LinearResponse<T.IssuesQuery["issues"]>> {
      const response = await handler(() =>
        requester<T.IssuesQuery, T.IssuesQueryVariables>(D.IssuesDocument, vars, opts)
      );
      return {
        ...response,
        data: response?.data?.issues,
      };
    },
    /**
     * Call the linear api with the IssueQuery
     *
     * @param id - id to pass into the IssueQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssueQuery
     */
    async issue(id: string, opts?: O): Promise<LinearResponse<T.IssueQuery["issue"]> & LinearSdkIssue> {
      const response = await handler(() =>
        requester<T.IssueQuery, T.IssueQueryVariables>(D.IssueDocument, { id }, opts)
      );
      return {
        ...response,
        data: response?.data?.issue,
        ...createRawLinearSdkIssue(id, requester),
      };
    },
  };
}

/**
 * The returned type from calling createRawLinearSdk
 * Initialise a set of operations to run against the Linear api
 */
export type LinearSdk = ReturnType<typeof createRawLinearSdk>;
