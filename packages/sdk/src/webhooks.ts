import crypto from "crypto";
import {
  AttachmentWebhookPayload,
  AuditEntryWebhookPayload,
  CommentWebhookPayload,
  CustomerNeedWebhookPayload,
  CustomerWebhookPayload,
  CycleWebhookPayload,
  DocumentWebhookPayload,
  InitiativeUpdateWebhookPayload,
  IssueLabelWebhookPayload,
  IssueWebhookPayload,
  ProjectUpdateWebhookPayload,
  ProjectWebhookPayload,
  ReactionWebhookPayload,
  UserWebhookPayload,
} from "./_generated_documents";
import {
  AppUserTeamAccessChangedWebhookPayload,
  InitiativeWebhookPayload,
  IssueSlaWebhookPayload,
  OAuthAppWebhookPayload,
  AgentSessionEventWebhookPayload,
} from "./_generated_sdk";
import {
  AppUserNotificationWebhookPayloadWithNotification,
  EntityWebhookPayloadWithEntityData,
  EntityWebhookPayloadWithUnknownEntityData,
} from "./types";

export const LINEAR_WEBHOOK_SIGNATURE_HEADER = "linear-signature";
export const LINEAR_WEBHOOK_TS_FIELD = "webhookTimestamp";

/**
 * Provides helper functions to work with Linear webhooks
 */
export class LinearWebhooks {
  public constructor(private secret: string) {}

  /**
   * Verify the webhook signature
   * @param rawBody The webhook request raw body.
   * @param signature The signature to verify.
   * @param timestamp The `webhookTimestamp` field from the request parsed body.
   */
  public verify(rawBody: Buffer, signature: string, timestamp?: number): boolean {
    const verificationBuffer = Buffer.from(crypto.createHmac("sha256", this.secret).update(rawBody).digest("hex"));
    const signatureBuffer = Buffer.from(signature);

    if (verificationBuffer.length !== signatureBuffer.length) {
      throw new Error("Invalid webhook signature");
    }

    if (!crypto.timingSafeEqual(verificationBuffer, signatureBuffer)) {
      throw new Error("Invalid webhook signature");
    }

    if (timestamp) {
      const timeDiff = Math.abs(new Date().getTime() - timestamp);
      // Throw error if more than one minute delta between provided ts and current time
      if (timeDiff > 1000 * 60) {
        throw new Error("Invalid webhook timestamp");
      }
    }

    return true;
  }

  public parseData(
    rawBody: Buffer,
    signature: string,
    timestamp?: number
  ):
    | EntityWebhookPayloadWithEntityData
    | EntityWebhookPayloadWithUnknownEntityData
    | IssueSlaWebhookPayload
    | OAuthAppWebhookPayload
    | AppUserNotificationWebhookPayloadWithNotification
    | AppUserTeamAccessChangedWebhookPayload
    | AgentSessionEventWebhookPayload {
    const verified = this.verify(rawBody, signature, timestamp);
    if (!verified) {
      throw new Error("Invalid webhook signature");
    }

    const parsedBody = JSON.parse(rawBody.toString());
    if (parsedBody.type === "IssueSLA") {
      return parsedBody as IssueSlaWebhookPayload;
    }
    if (parsedBody.type === "OAuthApp") {
      return parsedBody as OAuthAppWebhookPayload;
    }
    if (parsedBody.type === "AppUserNotification") {
      return parsedBody as AppUserNotificationWebhookPayloadWithNotification;
    }
    if (parsedBody.type === "PermissionChange") {
      return parsedBody as AppUserTeamAccessChangedWebhookPayload;
    }
    if (parsedBody.type === "AgentSessionEvent") {
      return parsedBody as AgentSessionEventWebhookPayload;
    }
    const entityWebhookPayload = parsedBody as EntityWebhookPayloadWithEntityData;
    switch (entityWebhookPayload.type) {
      case "Attachment":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as AttachmentWebhookPayload,
        };
      case "AuditEntry":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as AuditEntryWebhookPayload,
        };
      case "Comment":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as CommentWebhookPayload,
        };
      case "Customer":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as CustomerWebhookPayload,
        };
      case "CustomerNeed":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as CustomerNeedWebhookPayload,
        };
      case "Cycle":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as CycleWebhookPayload,
        };
      case "Document":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as DocumentWebhookPayload,
        };
      case "Initiative":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as InitiativeWebhookPayload,
        };
      case "InitiativeUpdate":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as InitiativeUpdateWebhookPayload,
        };
      case "Issue":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as IssueWebhookPayload,
        };
      case "IssueLabel":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as IssueLabelWebhookPayload,
        };
      case "Project":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as ProjectWebhookPayload,
        };
      case "ProjectUpdate":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as ProjectUpdateWebhookPayload,
        };
      case "Reaction":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as ReactionWebhookPayload,
        };
      case "User":
        return {
          ...entityWebhookPayload,
          data: entityWebhookPayload.data as UserWebhookPayload,
        };
      default:
        return entityWebhookPayload as EntityWebhookPayloadWithUnknownEntityData;
    }
  }
}
