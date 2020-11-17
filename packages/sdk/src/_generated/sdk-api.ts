import { DocumentNode } from "graphql";

import * as T from "./sdk-types";
export * from "./sdk-types";

import * as D from "./sdk-documents";
export * from "./sdk-documents";

export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, opts?: C) => Promise<R>;

export enum LinearStatus {
  "success" = "success",
  "error" = "error",
}

export interface LinearResponse<T> {
  status: LinearStatus;
  data?: T;
  error?: Error;
}

export type LinearHandler<T> = () => Promise<LinearResponse<T>>;

export function linearHandler<T>(operation: () => Promise<T>): LinearHandler<T> {
  return async function handler() {
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

export type LinearWrapper = <T>(action: () => Promise<T>) => Promise<T>;

const defaultWrapper: LinearWrapper = operation => operation();

export function createRawLinearSdkTeam<C>(
  id: string,
  requester: Requester<C>,
  wrapper: LinearWrapper = defaultWrapper
) {
  return {
    issues(vars?: Omit<T.TeamIssuesQueryVariables, "id">, opts?: C): Promise<LinearResponse<T.TeamIssuesQuery>> {
      return wrapper(
        linearHandler(() =>
          requester<T.TeamIssuesQuery, T.TeamIssuesQueryVariables>(D.TeamIssuesDocument, { id, ...vars }, opts)
        )
      );
    },
  };
}

export type LinearSdkTeam = ReturnType<typeof createRawLinearSdkTeam>;

export function createRawLinearSdkIssue<C>(
  id: string,
  requester: Requester<C>,
  wrapper: LinearWrapper = defaultWrapper
) {
  return {
    assignee(opts?: C): Promise<LinearResponse<T.IssueAssigneeQuery>> {
      return wrapper(
        linearHandler(() =>
          requester<T.IssueAssigneeQuery, T.IssueAssigneeQueryVariables>(D.IssueAssigneeDocument, { id }, opts)
        )
      );
    },
  };
}

export type LinearSdkIssue = ReturnType<typeof createRawLinearSdkIssue>;

export function createRawLinearSdk<C>(requester: Requester<C>, wrapper: LinearWrapper = defaultWrapper) {
  return {
    issueCreate(vars: T.IssueCreateMutationVariables, opts?: C): Promise<LinearResponse<T.IssueCreateMutation>> {
      return wrapper(
        linearHandler(() =>
          requester<T.IssueCreateMutation, T.IssueCreateMutationVariables>(D.IssueCreateDocument, vars, opts)
        )
      );
    },
    viewer(vars?: T.ViewerQueryVariables, opts?: C): Promise<LinearResponse<T.ViewerQuery>> {
      return wrapper(
        linearHandler(() => requester<T.ViewerQuery, T.ViewerQueryVariables>(D.ViewerDocument, vars, opts))
      );
    },
    teams(vars?: T.TeamsQueryVariables, opts?: C): Promise<LinearResponse<T.TeamsQuery>> {
      return wrapper(linearHandler(() => requester<T.TeamsQuery, T.TeamsQueryVariables>(D.TeamsDocument, vars, opts)));
    },
    async team(id: string, opts?: C): Promise<LinearResponse<T.TeamQuery> & LinearSdkTeam> {
      const response = await wrapper(
        linearHandler(() => requester<T.TeamQuery, T.TeamQueryVariables>(D.TeamDocument, { id }, opts))
      );
      return {
        ...response,
        ...createRawLinearSdkTeam(id, requester, wrapper),
      };
    },
    issues(vars?: T.IssuesQueryVariables, opts?: C): Promise<LinearResponse<T.IssuesQuery>> {
      return wrapper(
        linearHandler(() => requester<T.IssuesQuery, T.IssuesQueryVariables>(D.IssuesDocument, vars, opts))
      );
    },
    async issue(id: string, opts?: C): Promise<LinearResponse<T.IssueQuery> & LinearSdkIssue> {
      const response = await wrapper(
        linearHandler(() => requester<T.IssueQuery, T.IssueQueryVariables>(D.IssueDocument, { id }, opts))
      );
      return {
        ...response,
        ...createRawLinearSdkIssue(id, requester, wrapper),
      };
    },
  };
}

export type LinearSdk = ReturnType<typeof createRawLinearSdk>;
