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
 * The function type for wrapping an operation call in a LinearResponse
 */
export type LinearHandler<T> = () => Promise<LinearResponse<T>>;

/**
 * Runs the operation and wraps the result in a LinearResponse
 * Catches errors and attaches them to the response object
 */
export function handler<T>(operation: () => Promise<T>): LinearHandler<T> {
  return async function run() {
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
  };
}

/**
 * The type of a Linear sdk wrapper function
 * Must call the operation and return the result
 */
export type LinearWrapper = <T>(action: () => Promise<T>) => Promise<T>;

/**
 * Default wrapper to call the operation and return the result
 */
const defaultWrapper: LinearWrapper = operation => operation();

/**
 * Initialise a set of operations, scoped to team, to run against the Linear api
 *
 * @param id - id to scope the returned operations by
 * @param requester - function to call the graphql client
 * @param wrapper - wrapper function to process before or after the operation is called
 * @returns The set of available operations scoped to a single team
 */
export function createRawLinearSdkTeam<O>(
  id: string,
  requester: LinearRequester<O>,
  wrapper: LinearWrapper = defaultWrapper
) {
  return {
    /**
     * Call the linear api with the TeamIssuesQuery
     *
     * @param vars - variables without team id to pass into the TeamIssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamIssuesQuery
     */
    issues(vars?: Omit<T.TeamIssuesQueryVariables, "id">, opts?: O): Promise<LinearResponse<T.TeamIssuesQuery>> {
      return wrapper(
        handler(() =>
          requester<T.TeamIssuesQuery, T.TeamIssuesQueryVariables>(D.TeamIssuesDocument, { id, ...vars }, opts)
        )
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
 * @param wrapper - wrapper function to process before or after the operation is called
 * @returns The set of available operations scoped to a single issue
 */
export function createRawLinearSdkIssue<O>(
  id: string,
  requester: LinearRequester<O>,
  wrapper: LinearWrapper = defaultWrapper
) {
  return {
    /**
     * Call the linear api with the IssueAssigneeQuery
     *
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssueAssigneeQuery
     */
    assignee(opts?: O): Promise<LinearResponse<T.IssueAssigneeQuery>> {
      return wrapper(
        handler(() =>
          requester<T.IssueAssigneeQuery, T.IssueAssigneeQueryVariables>(D.IssueAssigneeDocument, { id }, opts)
        )
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
 * @param wrapper - wrapper function to process before or after the operation is called
 * @returns The set of available operations
 */
export function createRawLinearSdk<O>(requester: LinearRequester<O>, wrapper: LinearWrapper = defaultWrapper) {
  return {
    /**
     * Call the linear api with the IssueCreateMutation
     *
     * @param vars - variables to pass into the IssueCreateMutation
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssueCreateMutation
     */
    issueCreate(vars: T.IssueCreateMutationVariables, opts?: O): Promise<LinearResponse<T.IssueCreateMutation>> {
      return wrapper(
        handler(() =>
          requester<T.IssueCreateMutation, T.IssueCreateMutationVariables>(D.IssueCreateDocument, vars, opts)
        )
      );
    },
    /**
     * Call the linear api with the ViewerQuery
     *
     * @param vars - variables to pass into the ViewerQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the ViewerQuery
     */
    viewer(vars?: T.ViewerQueryVariables, opts?: O): Promise<LinearResponse<T.ViewerQuery>> {
      return wrapper(handler(() => requester<T.ViewerQuery, T.ViewerQueryVariables>(D.ViewerDocument, vars, opts)));
    },
    /**
     * Call the linear api with the TeamsQuery
     *
     * @param vars - variables to pass into the TeamsQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamsQuery
     */
    teams(vars?: T.TeamsQueryVariables, opts?: O): Promise<LinearResponse<T.TeamsQuery>> {
      return wrapper(handler(() => requester<T.TeamsQuery, T.TeamsQueryVariables>(D.TeamsDocument, vars, opts)));
    },
    /**
     * Call the linear api with the TeamQuery
     *
     * @param id - id to pass into the TeamQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the TeamQuery
     */
    async team(id: string, opts?: O): Promise<LinearResponse<T.TeamQuery> & LinearSdkTeam> {
      const response = await wrapper(
        handler(() => requester<T.TeamQuery, T.TeamQueryVariables>(D.TeamDocument, { id }, opts))
      );
      return {
        ...response,
        ...createRawLinearSdkTeam(id, requester, wrapper),
      };
    },
    /**
     * Call the linear api with the IssuesQuery
     *
     * @param vars - variables to pass into the IssuesQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssuesQuery
     */
    issues(vars?: T.IssuesQueryVariables, opts?: O): Promise<LinearResponse<T.IssuesQuery>> {
      return wrapper(handler(() => requester<T.IssuesQuery, T.IssuesQueryVariables>(D.IssuesDocument, vars, opts)));
    },
    /**
     * Call the linear api with the IssueQuery
     *
     * @param id - id to pass into the IssueQuery
     * @param opts - options to pass to the graphql client
     * @returns The wrapped result of the IssueQuery
     */
    async issue(id: string, opts?: O): Promise<LinearResponse<T.IssueQuery> & LinearSdkIssue> {
      const response = await wrapper(
        handler(() => requester<T.IssueQuery, T.IssueQueryVariables>(D.IssueDocument, { id }, opts))
      );
      return {
        ...response,
        ...createRawLinearSdkIssue(id, requester, wrapper),
      };
    },
  };
}

/**
 * The returned type from calling createRawLinearSdk
 * Initialise a set of operations to run against the Linear api
 */
export type LinearSdk = ReturnType<typeof createRawLinearSdk>;
