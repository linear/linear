import { RequestInit } from "graphql-request/dist/types.dom";

/**
 * Input options for creating a Linear sdk with graphql-request
 */
export interface LinearClientOptions extends RequestInit {
  /** Personal api token generated from https://linear.app/settings/api */
  apiKey?: string;
  /** The access token returned from oauth endpoints configured in https://linear.app/settings/api */
  accessToken?: string;
  /** The url to the Linear graphql api */
  baseUrl?: string;
}

/**
 * Validated graphql-request client options
 */
export interface LinearClientParsedOptions extends RequestInit {
  /** The url to the Linear graphql api defaulted to production */
  baseUrl: string;
}

/**
 * The error types returned by the Linear API
 */
export enum LinearErrorType {
  "FeatureNotAccessible" = "FeatureNotAccessible",
  "InvalidInput" = "InvalidInput",
  "Ratelimited" = "Ratelimited",
  "NetworkError" = "NetworkError",
  "AuthenticationError" = "AuthenticationError",
  "Forbidden" = "Forbidden",
  "BootstrapError" = "BootstrapError",
  "Unknown" = "Unknown",
  "InternalError" = "InternalError",
  "Other" = "Other",
  "UserError" = "UserError",
  "GraphqlError" = "GraphqlError",
  "LockTimeout" = "LockTimeout",
}

/**
 * One of potentially many raw graphql errors returned by the Linear API
 */
export interface LinearGraphQLErrorRaw {
  /** The error type */
  message?: LinearErrorType;
  /** The path to the graphql node at which the error occured */
  path?: string[];
  extensions?: {
    /** The error type */
    type?: LinearErrorType;
    /** If caused by the user input */
    userError?: boolean;
    /** A friendly error message */
    userPresentableMessage?: string;
  };
}

/**
 * The raw error returned by the Linear API
 */
export interface LinearErrorRaw extends Error {
  /** Error information for the request */
  request?: {
    /** The graphql query that caused this error */
    query?: string;
    /** The graphql variables that caused this error */
    variables?: Record<string, unknown>;
  };
  /** Error information for the response */
  response?: {
    /** Any data returned by this request */
    data?: unknown;
    /** The http status of this request */
    status?: number;
    /** A list of graphql errors returned by the Linear API */
    errors?: LinearGraphQLErrorRaw[];
  };
}
