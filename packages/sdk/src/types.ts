import { DataWebhookPayload, NotificationWebhookPayload } from "./_generated_documents";
import { AppUserNotificationWebhookPayload, EntityWebhookPayload } from "./_generated_sdk";

/**
 * Input options for creating a Linear Client
 */
export interface LinearClientOptions extends RequestInit {
  /** Personal api token generated from https://linear.app/settings/account/security */
  apiKey?: string;
  /** The access token returned from oauth endpoints configured in https://linear.app/settings/account/security */
  accessToken?: string;
  /** The url to the Linear graphql api */
  apiUrl?: string;
}

/**
 * Validated LinearGraphQLClient options
 */
export interface LinearClientParsedOptions extends RequestInit {
  /** The url to the Linear graphql api defaulted to production */
  apiUrl: string;
}

/**
 * The raw response from the Linear GraphQL Client
 */
export interface LinearRawResponse<Data> {
  /** The returned data */
  data?: Data;
  /** Any extensions returned by the Linear API */
  extensions?: unknown;
  /** Response headers */
  headers?: Headers;
  /** Response status */
  status?: number;
  /** An error message */
  error?: string;
  /** Any GraphQL errors returned by the Linear API */
  errors?: LinearGraphQLErrorRaw[];
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
  "UsageLimitExceeded" = "UsageLimitExceeded",
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
 * Description of a GraphQL request used in error handling
 */
export interface GraphQLRequestContext<Variables extends Record<string, unknown>> {
  query: string;
  variables?: Variables;
}

/**
 * The raw error returned by the Linear API
 */
export interface LinearErrorRaw {
  /** Error name if available */
  name?: string;
  /** Error message if available */
  message?: string;
  /** Error information for the request */
  request?: GraphQLRequestContext<Record<string, unknown>>;
  /** Error information for the response */
  response?: LinearRawResponse<unknown>;
}

/**
 * A webhook payload for an app user notification webhook.
 */
export interface AppUserNotificationWebhookPayloadWithNotification extends AppUserNotificationWebhookPayload {
  notification: NotificationWebhookPayload;
}

/**
 * A webhook payload for an entity-specific webhook.
 */
export interface EntityWebhookPayloadWithEntityData extends EntityWebhookPayload {
  data: DataWebhookPayload;
}
