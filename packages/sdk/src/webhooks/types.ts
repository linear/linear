import type { IncomingMessage, ServerResponse } from "http";
import {
  AgentSessionEventWebhookPayload as AgentSessionEventWebhookPayloadType,
  AppUserNotificationWebhookPayload,
  AppUserTeamAccessChangedWebhookPayload as AppUserTeamAccessChangedWebhookPayloadType,
  AttachmentWebhookPayload,
  AuditEntryWebhookPayload,
  CommentWebhookPayload,
  CustomerNeedWebhookPayload,
  CustomerWebhookPayload,
  CycleWebhookPayload,
  DataWebhookPayload,
  DocumentWebhookPayload,
  EntityWebhookPayload,
  InitiativeUpdateWebhookPayload,
  InitiativeWebhookPayload,
  IssueLabelWebhookPayload,
  IssueSlaWebhookPayload as IssueSlaWebhookPayloadType,
  IssueWebhookPayload,
  NotificationWebhookPayload,
  OAuthAppWebhookPayload as OAuthAppWebhookPayloadType,
  ProjectUpdateWebhookPayload,
  ProjectWebhookPayload,
  ReactionWebhookPayload,
  UserWebhookPayload,
} from "../_generated_documents";

export type LinearWebhookPayload =
  | EntityWebhookPayloadWithEntityData
  | EntityWebhookPayloadWithUnknownEntityData
  | IssueSlaWebhookPayload
  | OAuthAppWebhookPayload
  | AppUserNotificationWebhookPayloadWithNotification
  | AppUserTeamAccessChangedWebhookPayload
  | AgentSessionEventWebhookPayload;

/**
 * All possible Linear webhook event types.
 */
export type LinearWebhookEventType =
  | "Attachment"
  | "AuditEntry"
  | "Comment"
  | "Customer"
  | "CustomerNeed"
  | "Cycle"
  | "Document"
  | "Initiative"
  | "InitiativeUpdate"
  | "Issue"
  | "IssueLabel"
  | "Project"
  | "ProjectUpdate"
  | "Reaction"
  | "User"
  | "IssueSLA"
  | "OAuthApp"
  | "AppUserNotification"
  | "PermissionChange"
  | "AgentSessionEvent";

/**
 * Maps webhook event types to their corresponding payload types
 */
export type LinearWebhookEventTypeMap = {
  Attachment: EntityWebhookPayloadWithAttachmentData;
  AuditEntry: EntityWebhookPayloadWithAuditEntryData;
  Comment: EntityWebhookPayloadWithCommentData;
  Customer: EntityWebhookPayloadWithCustomerData;
  CustomerNeed: EntityWebhookPayloadWithCustomerNeedData;
  Cycle: EntityWebhookPayloadWithCycleData;
  Document: EntityWebhookPayloadWithDocumentData;
  Initiative: EntityWebhookPayloadWithInitiativeData;
  InitiativeUpdate: EntityWebhookPayloadWithInitiativeUpdateData;
  Issue: EntityWebhookPayloadWithIssueData;
  IssueLabel: EntityWebhookPayloadWithIssueLabelData;
  Project: EntityWebhookPayloadWithProjectData;
  ProjectUpdate: EntityWebhookPayloadWithProjectUpdateData;
  Reaction: EntityWebhookPayloadWithReactionData;
  User: EntityWebhookPayloadWithUserData;
  IssueSLA: IssueSlaWebhookPayload;
  OAuthApp: OAuthAppWebhookPayload;
  AppUserNotification: AppUserNotificationWebhookPayloadWithNotification;
  PermissionChange: AppUserTeamAccessChangedWebhookPayload;
  AgentSessionEvent: AgentSessionEventWebhookPayload;
};

/**
 * Event handler function for webhook events.
 * @template T - The specific webhook payload type
 * @param payload - The webhook payload data
 * @returns void or Promise<void>
 */
export type LinearWebhookEventHandler<T extends LinearWebhookPayload = LinearWebhookPayload> = (
  payload: T
) => void | Promise<void>;

/**
 * Webhook handler interface that provides event registration capabilities.
 * This interface supports both Fetch API Request/Response and Node.js IncomingMessage/ServerResponse.
 */
export interface LinearWebhookHandler {
  /** Handles incoming webhook requests (Fetch API) */
  (request: Request): Promise<Response>;
  /** Handles incoming webhook requests (Node.js) */
  (request: IncomingMessage, response: ServerResponse): Promise<void>;
  /**
   * Registers an event handler for webhook events.
   *
   * @template T - The specific event type (when not using wildcard)
   * @param eventType - The event type to listen for, or `*` for all events
   * @param handler - The handler function to call when the event occurs
   */
  on<T extends LinearWebhookEventType>(
    eventType: T,
    handler: LinearWebhookEventHandler<LinearWebhookEventTypeMap[T]>
  ): void;
  on(eventType: "*", handler: LinearWebhookEventHandler<LinearWebhookPayload>): void;
  /**
   * Removes an event handler for webhook events.
   *
   * @template T - The specific event type (when not using wildcard)
   * @param eventType - The event type to remove the handler from, or `*` for wildcard handler
   * @param handler - The handler function to remove
   */
  off<T extends LinearWebhookEventType>(
    eventType: T,
    handler: LinearWebhookEventHandler<LinearWebhookEventTypeMap[T]>
  ): void;
  off(eventType: "*", handler: LinearWebhookEventHandler<LinearWebhookPayload>): void;
  /**
   * Removes all event handlers for a specific event type, or all handlers if no event type is specified.
   * @param eventType - Optional event type to remove handlers for
   */
  removeAllListeners(eventType?: string): void;
}

/**
 * A webhook payload for an app user notification webhook.
 */
export interface AppUserNotificationWebhookPayloadWithNotification extends AppUserNotificationWebhookPayload {
  notification: NotificationWebhookPayload;
  type: "AppUserNotification";
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

/**
 * A webhook payload for an Agent Session Event webhook.
 */
export type AgentSessionEventWebhookPayload = Omit<AgentSessionEventWebhookPayloadType, "type"> & {
  type: "AgentSessionEvent";
};

/**
 * A webhook payload for an Issue SLA webhook with a narrowed `type`.
 */
export type IssueSlaWebhookPayload = Omit<IssueSlaWebhookPayloadType, "type"> & {
  type: "IssueSLA";
};

/**
 * A webhook payload for an OAuth App webhook with a narrowed `type`.
 */
export type OAuthAppWebhookPayload = Omit<OAuthAppWebhookPayloadType, "type"> & {
  type: "OAuthApp";
};

/**
 * A webhook payload for an App User Team Access Changed webhook with a narrowed `type`.
 */
export type AppUserTeamAccessChangedWebhookPayload = Omit<AppUserTeamAccessChangedWebhookPayloadType, "type"> & {
  type: "PermissionChange";
};
