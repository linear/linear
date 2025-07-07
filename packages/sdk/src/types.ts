import { DataWebhookPayload, NotificationWebhookPayload } from "./_generated_documents";
import {
  AppUserNotificationWebhookPayload,
  AttachmentWebhookPayload,
  AuditEntryWebhookPayload,
  CommentWebhookPayload,
  CustomerNeedWebhookPayload,
  CustomerWebhookPayload,
  CycleWebhookPayload,
  DocumentWebhookPayload,
  EntityWebhookPayload,
  InitiativeUpdateWebhookPayload,
  InitiativeWebhookPayload,
  IssueLabelWebhookPayload,
  IssueWebhookPayload,
  ProjectUpdateWebhookPayload,
  ProjectWebhookPayload,
  ReactionWebhookPayload,
  UserWebhookPayload,
} from "./_generated_sdk";

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
export interface EntityWebhookPayloadWithUnknownEntityData extends EntityWebhookPayload {
  data: DataWebhookPayload;
}

/**
 * A webhook payload for an entity-specific webhook.
 */
export type EntityWebhookPayloadWithEntityData =
  | EntityWebhookPayloadWithAttachmentData
  | EntityWebhookPayloadWithAuditEntryData
  | EntityWebhookPayloadWithCommentData
  | EntityWebhookPayloadWithCustomerData
  | EntityWebhookPayloadWithCustomerNeedData
  | EntityWebhookPayloadWithCycleData
  | EntityWebhookPayloadWithDocumentData
  | EntityWebhookPayloadWithInitiativeData
  | EntityWebhookPayloadWithInitiativeUpdateData
  | EntityWebhookPayloadWithIssueData
  | EntityWebhookPayloadWithIssueLabelData
  | EntityWebhookPayloadWithProjectData
  | EntityWebhookPayloadWithProjectUpdateData
  | EntityWebhookPayloadWithReactionData
  | EntityWebhookPayloadWithUserData;

/**
 * A webhook payload for an attachment webhook.
 */
export type EntityWebhookPayloadWithAttachmentData = Omit<EntityWebhookPayload, "type"> & {
  data: AttachmentWebhookPayload;
  type: "Attachment";
};

/**
 * A webhook payload for an audit entry webhook.
 */
export type EntityWebhookPayloadWithAuditEntryData = Omit<EntityWebhookPayload, "type"> & {
  data: AuditEntryWebhookPayload;
  type: "AuditEntry";
};

/**
 * A webhook payload for a comment webhook.
 */
export type EntityWebhookPayloadWithCommentData = Omit<EntityWebhookPayload, "type"> & {
  data: CommentWebhookPayload;
  type: "Comment";
};

/**
 * A webhook payload for a customer webhook.
 */
export type EntityWebhookPayloadWithCustomerData = Omit<EntityWebhookPayload, "type"> & {
  data: CustomerWebhookPayload;
  type: "Customer";
};

/**
 * A webhook payload for a customer need webhook.
 */
export type EntityWebhookPayloadWithCustomerNeedData = Omit<EntityWebhookPayload, "type"> & {
  data: CustomerNeedWebhookPayload;
  type: "CustomerNeed";
};

/**
 * A webhook payload for a cycle webhook.
 */
export type EntityWebhookPayloadWithCycleData = Omit<EntityWebhookPayload, "type"> & {
  data: CycleWebhookPayload;
  type: "Cycle";
};

/**
 * A webhook payload for a document webhook.
 */
export type EntityWebhookPayloadWithDocumentData = Omit<EntityWebhookPayload, "type"> & {
  data: DocumentWebhookPayload;
  type: "Document";
};

/**
 * A webhook payload for an initiative webhook.
 */
export type EntityWebhookPayloadWithInitiativeData = Omit<EntityWebhookPayload, "type"> & {
  data: InitiativeWebhookPayload;
  type: "Initiative";
};

/**
 * A webhook payload for an initiative update webhook.
 */
export type EntityWebhookPayloadWithInitiativeUpdateData = Omit<EntityWebhookPayload, "type"> & {
  data: InitiativeUpdateWebhookPayload;
  type: "InitiativeUpdate";
};

/**
 * A webhook payload for an issue webhook.
 */
export type EntityWebhookPayloadWithIssueData = Omit<EntityWebhookPayload, "type"> & {
  data: IssueWebhookPayload;
  type: "Issue";
};

/**
 * A webhook payload for an issue label webhook.
 */
export type EntityWebhookPayloadWithIssueLabelData = Omit<EntityWebhookPayload, "type"> & {
  data: IssueLabelWebhookPayload;
  type: "IssueLabel";
};

/**
 * A webhook payload for a project webhook.
 */
export type EntityWebhookPayloadWithProjectData = Omit<EntityWebhookPayload, "type"> & {
  data: ProjectWebhookPayload;
  type: "Project";
};

/**
 * A webhook payload for a project update webhook.
 */
export type EntityWebhookPayloadWithProjectUpdateData = Omit<EntityWebhookPayload, "type"> & {
  data: ProjectUpdateWebhookPayload;
  type: "ProjectUpdate";
};

/**
 * A webhook payload for a reaction webhook.
 */
export type EntityWebhookPayloadWithReactionData = Omit<EntityWebhookPayload, "type"> & {
  data: ReactionWebhookPayload;
  type: "Reaction";
};

/**
 * A webhook payload for a user webhook.
 */
export type EntityWebhookPayloadWithUserData = Omit<EntityWebhookPayload, "type"> & {
  data: UserWebhookPayload;
  type: "User";
};
