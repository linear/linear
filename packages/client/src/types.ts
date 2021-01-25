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
  "FeatureNotAccessible" = "feature not accessible",
  "InvalidInput" = "invalid input",
  "Ratelimited" = "ratelimited",
  "NetworkError" = "network error",
  "AuthenticationError" = "authentication error",
  "Forbidden" = "forbidden",
  "BootstrapError" = "bootstrap error",
  "Unknown" = "unknown",
  "InternalError" = "internal error",
  "Other" = "other",
  "UserError" = "user error",
  "GraphqlError" = "graphql error",
  "LockTimeout" = "lock timeout",
}
