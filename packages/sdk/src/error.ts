import { LinearErrorRaw, LinearErrorType, LinearGraphQLErrorRaw } from "./types";
import { capitalize, getKeyByValue, nonNullable } from "./utils";

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
  [LinearErrorType.UsageLimitExceeded]: "usage limit exceeded",
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

    /** Select most readable message */
    this.message =
      error?.extensions?.userPresentableMessage ?? error?.message ?? error?.extensions?.type ?? defaultError;
  }
}

/**
 * An error from the Linear API
 *
 * @param error a raw error returned from the LinearGraphQLClient
 */
export class LinearError extends Error {
  /** The type of the first error returned by the Linear API */
  public type?: LinearErrorType;
  /** A list of graphql errors returned by the Linear API */
  public errors?: LinearGraphQLError[];
  /** The graphql query that caused this error */
  public query?: string;
  /** The graphql variables that caused this error */
  public variables?: Record<string, unknown>;
  /** Any data returned by this request */
  public data?: unknown;
  /** The http status of this request */
  public status?: number;
  /** The raw LinearGraphQLClient error */
  public raw?: LinearErrorRaw;

  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[], type?: LinearErrorType) {
    /** Find messages, duplicate and join, or default */
    super(
      Array.from(
        new Set(
          [capitalize(error?.message?.split(": {")?.[0]), error?.response?.error, errors?.[0]?.message].filter(
            nonNullable
          )
        )
      )
        .filter(nonNullable)
        .join(" - ") ?? defaultError
    );

    this.type = type;

    /** Set error properties */
    this.errors = errors;
    this.query = error?.request?.query;
    this.variables = error?.request?.variables;
    this.status = error?.response?.status;
    this.data = error?.response?.data;
    this.raw = error;
  }
}

export class FeatureNotAccessibleLinearError extends LinearError {
  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]) {
    super(error, errors, LinearErrorType.FeatureNotAccessible);
  }
}

export class InvalidInputLinearError extends LinearError {
  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]) {
    super(error, errors, LinearErrorType.InvalidInput);
  }
}

export class RatelimitedLinearError extends LinearError {
  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]) {
    super(error, errors, LinearErrorType.Ratelimited);

    const headers = error?.response?.headers;
    this.retryAfter = this.parseNumber(headers?.get("retry-after"));
    this.requestsLimit = this.parseNumber(headers?.get("x-ratelimit-requests-limit"));
    this.requestsRemaining = this.parseNumber(headers?.get("x-ratelimit-requests-remaining"));
    this.requestsResetAt = this.parseNumber(headers?.get("x-ratelimit-requests-reset"));
    this.complexityLimit = this.parseNumber(headers?.get("x-ratelimit-complexity-limit"));
    this.complexityRemaining = this.parseNumber(headers?.get("x-ratelimit-complexity-remaining"));
    this.complexityResetAt = this.parseNumber(headers?.get("x-ratelimit-complexity-reset"));
  }

  /** How long, in seconds, the user agent should wait before making a follow-up request. */
  public retryAfter: number | undefined;

  /** The max amount of requests allowed in the duration. */
  public requestsLimit: number | undefined;
  /** The remaining requests before rate limiting kicks in. */
  public requestsRemaining: number | undefined;
  /** Unix timestamp at which the requests will be reset. */
  public requestsResetAt: number | undefined;

  /** The max amount of complexity allowed in the duration. */
  public complexityLimit: number | undefined;
  /** The remaining complexity before rate limiting kicks in. */
  public complexityRemaining: number | undefined;
  /** Unix timestamp at which the complexity will be reset. */
  public complexityResetAt: number | undefined;

  private parseNumber(value: string | undefined | null): number | undefined {
    if (value === undefined || value === null || value === "") {
      return undefined;
    }
    return Number(value) ?? undefined;
  }
}

export class NetworkLinearError extends LinearError {
  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]) {
    super(error, errors, LinearErrorType.NetworkError);
  }
}

export class AuthenticationLinearError extends LinearError {
  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]) {
    super(error, errors, LinearErrorType.AuthenticationError);
  }
}

export class ForbiddenLinearError extends LinearError {
  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]) {
    super(error, errors, LinearErrorType.Forbidden);
  }
}

export class BootstrapLinearError extends LinearError {
  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]) {
    super(error, errors, LinearErrorType.BootstrapError);
  }
}

export class UnknownLinearError extends LinearError {
  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]) {
    super(error, errors, LinearErrorType.Unknown);
  }
}

export class InternalLinearError extends LinearError {
  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]) {
    super(error, errors, LinearErrorType.InternalError);
  }
}

export class OtherLinearError extends LinearError {
  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]) {
    super(error, errors, LinearErrorType.Other);
  }
}

export class UserLinearError extends LinearError {
  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]) {
    super(error, errors, LinearErrorType.UserError);
  }
}

export class GraphqlLinearError extends LinearError {
  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]) {
    super(error, errors, LinearErrorType.GraphqlError);
  }
}

export class LockTimeoutLinearError extends LinearError {
  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]) {
    super(error, errors, LinearErrorType.LockTimeout);
  }
}

export class UsageLimitExceededLinearError extends LinearError {
  public constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]) {
    super(error, errors, LinearErrorType.UsageLimitExceeded);
  }
}

/**
 * A map between the Linear error type and the LinearError class
 */
const errorConstructorMap: Record<LinearErrorType, typeof LinearError> = {
  [LinearErrorType.FeatureNotAccessible]: FeatureNotAccessibleLinearError,
  [LinearErrorType.InvalidInput]: InvalidInputLinearError,
  [LinearErrorType.Ratelimited]: RatelimitedLinearError,
  [LinearErrorType.NetworkError]: NetworkLinearError,
  [LinearErrorType.AuthenticationError]: AuthenticationLinearError,
  [LinearErrorType.Forbidden]: ForbiddenLinearError,
  [LinearErrorType.BootstrapError]: BootstrapLinearError,
  [LinearErrorType.Unknown]: UnknownLinearError,
  [LinearErrorType.InternalError]: InternalLinearError,
  [LinearErrorType.Other]: OtherLinearError,
  [LinearErrorType.UserError]: UserLinearError,
  [LinearErrorType.GraphqlError]: GraphqlLinearError,
  [LinearErrorType.LockTimeout]: LockTimeoutLinearError,
  [LinearErrorType.UsageLimitExceeded]: UsageLimitExceededLinearError,
};

export function parseLinearError(error?: LinearErrorRaw | LinearError): LinearError {
  if (error instanceof LinearError) {
    return error;
  }

  /** Parse graphQL errors */
  const errors = (error?.response?.errors ?? []).map(graphqlError => {
    return new LinearGraphQLError(graphqlError);
  });

  /** Set type based first graphql error or http status */
  const status = error?.response?.status;
  const type =
    errors[0]?.type ??
    (status === 403
      ? LinearErrorType.Forbidden
      : status === 429
        ? LinearErrorType.Ratelimited
        : `${status}`.startsWith("4")
          ? LinearErrorType.AuthenticationError
          : status === 500
            ? LinearErrorType.InternalError
            : `${status}`.startsWith("5")
              ? LinearErrorType.NetworkError
              : LinearErrorType.Unknown);

  const LinearErrorConstructor = errorConstructorMap[type] ?? LinearError;

  return new LinearErrorConstructor(error, errors);
}
