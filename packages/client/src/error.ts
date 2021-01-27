import { getKeyByValue } from "@linear/plugin-common";
import { LinearErrorRaw, LinearErrorType, LinearGraphQLErrorRaw } from "./types";

/**
 * A map between the Linear API string type and the LinearErrorType enum
 */
const errorMap: Record<LinearErrorType, string> = {
  [LinearErrorType.FeatureNotAccessible]: "feature not accessible",
  [LinearErrorType.InvalidInput]: "invalid input",
  [LinearErrorType.Ratelimited]: "ratelimited",
  [LinearErrorType.NetworkError]: "network error",
  [LinearErrorType.AuthenticationError]: "authentication error",
  [LinearErrorType.Forbidden]: "forbidden",
  [LinearErrorType.BootstrapError]: "bootstrap error",
  [LinearErrorType.Unknown]: "unknown",
  [LinearErrorType.InternalError]: "internal error",
  [LinearErrorType.Other]: "other",
  [LinearErrorType.UserError]: "user error",
  [LinearErrorType.GraphqlError]: "graphql error",
  [LinearErrorType.LockTimeout]: "lock timeout",
};

/**
 * Match the error type or return unknown
 */
function getErrorType(type?: string): LinearErrorType {
  return getKeyByValue(errorMap, type) ?? LinearErrorType.Unknown;
}

/**
 * The error shown if no other message is available
 */
const defaultError = "Unknown error from LinearClient";

/**
 * One of potentially many graphql errors returned by the Linear API
 *
 * @error the raw graphql error returned on the error response
 */
export class LinearGraphQLError {
  /** The type of this graphql error */
  public type: LinearErrorType;
  /** A friendly error message */
  public message: string;
  /** If this error is caused by the user input */
  public userError?: boolean;
  /** The path to the graphql node at which the error occured */
  public path?: string[];

  public constructor(error?: LinearGraphQLErrorRaw) {
    this.type = getErrorType(error?.extensions?.type);
    this.userError = error?.extensions?.userError;
    this.path = error?.path;

    /** Set best available message */
    this.message =
      error?.extensions?.userPresentableMessage ?? error?.message ?? error?.extensions?.type ?? defaultError;
  }
}

/**
 * An error from the Linear API
 *
 * @param error a raw error returned from the graphql-request client
 */
export class LinearError extends Error {
  /** The type of the first error returned by the Linear API */
  public type: LinearErrorType;
  /** A list of graphql errors returned by the Linear API */
  public errors: LinearGraphQLError[];
  /** The graphql query that caused this error */
  public query?: string;
  /** The graphql variables that caused this error */
  public variables?: Record<string, unknown>;
  /** Any data returned by this request */
  public data?: unknown;
  /** The http status of this request */
  public status?: number;

  public constructor(error?: LinearErrorRaw) {
    /** Parse graphql errors */
    const errors = (error?.response?.errors ?? []).map(graphqlError => {
      return new LinearGraphQLError(graphqlError);
    });

    /** Set best available message */
    super(errors[0]?.message ?? error?.message ?? error?.name ?? defaultError);

    /** Set error properties */
    this.type = errors[0]?.type ?? LinearErrorType.Unknown;
    this.status = error?.response?.status;
    this.errors = errors;
    this.query = error?.request?.query;
    this.variables = error?.request?.variables;
    this.data = error?.response?.data;
  }
}
