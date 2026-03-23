import querystring from "querystring";
import type { WebAPICallResult } from "@slack/web-api";
import type { OAuthV2Response } from "@slack/oauth";
import { SlackOAuthAppType } from "@linear/common/models/Integration";
import { fetch, type Response } from "~/utils/fetch";
import { type AnyContext, type Context, withTxContext, withTxOrganizationContext } from "~/auth/Context";
import { InputError, InternalError } from "~/errors/Errors";
import { RetryAfterHelper } from "~/helpers/RetryAfterHelper";
import { IntegrationInternalError, RateLimitedError } from "~/services/errors";
import { Config } from "~/config/Config";
import type { Integration } from "~/entity";
import { Logger } from "~/logging/Logger";
import { formUrlEncode } from "~/utils/formUrlEncode";

/** Extended WebAPICallResult that includes warning fields Slack may return */
interface SlackAPICallResult extends WebAPICallResult {
  warning?: string;
  response_metadata?: { warnings?: string[] };
}

/** Noisy warnings that we don't need to log */
const ignoredWarnings = ["superfluous_charset"];

/** Slack's base API endpoint. */
export const SLACK_API_URL = "https://slack.com/api";

/**
 * Class to call out to the Slack API.
 */
export class Slack {
  /**
   * Send a post request to the Slack API.
   *
   * @param context Context for the request
   * @param endpoint Slack endpoint for the request
   * @param integration Slack integration object whose token we use for the request
   * @param body Request body
   * @param options.urlencoded Should the request be sent with urlencoded format
   * @param options.hookUrl Hook url to override provided endpoint (used with webhooks)
   * @param options.ignoredErrors List of errors that should be swallowed rather than logged. Only use if you are
   *  certain you do not want to debug why the request would be failing.
   * @returns Response from Slack
   */
  public static async post<SlackArguments, SlackResponse extends SlackAPICallResult>(
    context: Context,
    endpoint: string,
    integration: Integration,
    body: SlackArguments,
    options: { urlencoded?: boolean; hookUrl?: string; ignoredErrors?: string[] } = {}
  ): Promise<SlackResponse | undefined> {
    let data: SlackResponse, response: Response;
    const requestUrl = options.hookUrl || `${SLACK_API_URL}/${endpoint}`;

    const effectiveAccessToken = await integration.effectiveAccessToken(context);
    try {
      if (options.urlencoded) {
        response = await fetch(requestUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${effectiveAccessToken}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: formUrlEncode(body),
          // @ts-expect-error
          json: true,
        });
        data = await response.json();
      } else {
        response = await fetch(requestUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${effectiveAccessToken}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(body),
        });
        if (response.status === 200 && !response.headers.get("Content-Type")?.includes("application/json")) {
          // There is no body, so return
          return;
        }
        data = await response.json();
      }
    } catch (error) {
      // We can't do much about timeouts
      if (
        error.message.includes("ETIMEDOUT") ||
        error.message.includes("ECONNRESET") ||
        error.message.includes("EAI_AGAIN") ||
        error.message.includes("ECONNREFUSED")
      ) {
        return;
      }
      throw new Error(error.message);
    }

    // Check for warnings - Slack can return a warning with either ok: true or ok: false
    // e.g., metadata_too_large warning when Work Objects metadata exceeds 4000 bytes
    if (data.warning && !ignoredWarnings.includes(data.warning)) {
      Logger.warn("integrations", "Slack API returned warning", context, {
        integration: { id: integration.id },
        endpoint,
        ok: data.ok,
        error: data.error,
        warning: data.warning,
        warnings: data.response_metadata?.warnings,
      });
    }

    if (data.ok) {
      return data;
    }

    if (!data.error) {
      Logger.debug("integrations", "Slack API call failed with no error", context, {
        integrationId: integration.id,
        endpoint,
        body,
      });
      return data;
    }

    if (data.error === "expired_response_url" && options?.hookUrl && endpoint === "") {
      // Use chat.postMessage as a fallback for expired response URLs
      return Slack.post(context, "chat.postMessage", integration, body, { ...options, hookUrl: undefined });
    }

    // If we're ignoring this error, ignore it and return the data
    if (options?.ignoredErrors?.includes(data.error)) {
      return data;
    }

    // Handle tokens revoked on Slack's side
    if (["token_revoked", "account_inactive", "invalid_auth"].includes(data.error)) {
      await withTxOrganizationContext(
        context,
        { organization: await integration.loadRelation(context, "organization"), integration },
        async organizationContext => {
          Logger.info("auth", "Slack access revoked for integration", organizationContext, {
            id: integration.id,
            slack: {
              error: data,
              body,
            },
          });

          try {
            await integration.disconnectAndNotifyUser(organizationContext);
          } catch (error) {
            // If the token is already invalid, it's pretty useless, so just delete the integration. We really only hit
            // this for very old integrations during backfills that involve Slack API calls since workspaces actively
            // using the Slack integration will have valid tokens and/or admin users.
            if (error instanceof InternalError && error.message.includes("couldn't find an admin user")) {
              await integration.delete(organizationContext);
            }
          }
        }
      );

      return data;
    }

    // If we took too long to respond to this trigger we can't do anything about it now. The user has already seen an
    // error in Slack at this point, so only action is they can retry.
    if (data.error === "trigger_expired" || data.error === "expired_trigger_id") {
      return data;
    }

    // Handle specific errors that are not dangerous for various API endpoints
    Slack.handleError(data.error, response, integration, context, {
      endpoint,
      ignoredErrors: options.ignoredErrors,
      data,
      body: JSON.stringify(body),
    });
    return;
  }

  /**
   * Makes a request to the Slack API.
   * @param {string} endpoint - The Slack API endpoint.
   * @param {querystring.ParsedUrlQueryInput} body - The request body.
   * @param {string} [token] - The authentication token.
   * @returns {Promise<any>} - The response data.
   */
  public static async request(endpoint: string, body: querystring.ParsedUrlQueryInput, token?: string) {
    let data, response;
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      response = await fetch(`${SLACK_API_URL}/${endpoint}?${querystring.stringify(body)}`, {
        headers,
      });
      data = await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
    if (!data.ok) {
      Slack.handleError(data.error, response, undefined, undefined, { data });
    }
    return data;
  }

  /**
   * Posts a request to a Slack webhook endpoint.
   * @param {Context} context - The request context.
   * @param {Integration} integration - The Slack webhook integration.
   * @param {Object} body - The request body.
   */
  public static async postWebhook(context: Context, integration: Integration, body: { [key: string]: unknown }) {
    const url = integration.data && "url" in integration.data ? integration.data.url : undefined;
    const stringifiedBody = JSON.stringify(body);
    if (!url) {
      return;
    }

    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: stringifiedBody,
      });
    } catch (error) {
      Slack.handleError(error.message, response, integration, context, { body: stringifiedBody });
      return;
    }
    if (!response.ok) {
      const text = await response.text();

      // https://api.slack.com/messaging/webhooks#handling_errors
      // "no_service" means the webhook is either disabled, removed, or invalid.
      // "no_active_hooks" is not documented but feels like the same thing.
      // "team_disabled" means the Slack workspace is no longer active
      // "invalid_token" means the Slack bot token we have for the integration is invalid
      // "channel_not_found" means the channel we are trying to post to no longer exists
      // It's fine to delete the integration and let the user re-add it if needed.
      const errorsToDisconnectFor = [
        "no_service",
        "no_active_hooks",
        "team_disabled",
        "invalid_token",
        "channel_not_found",
      ];
      if (errorsToDisconnectFor.includes(text)) {
        await withTxContext(context, async txContext => {
          await integration.delete(txContext);
        });
        Logger.info("integrations", "Deleted Slack integration due to failure from Slack post webhook", context, {
          slackError: text,
        });
      } else {
        Slack.handleError(text, response, integration, context, { body: stringifiedBody });
      }
    }
  }

  /**
   * Produces an OAuth response for a Slack application.
   *
   * @param code - The authorization code.
   * @param app - The type of Slack OAuth app.
   * @param redirectUri - The redirect URI.
   * @param useStagingApp - Flag indicating whether to use the staging version of the Slack app.
   * @returns A promise that resolves to the OAuthV2Response.
   */
  public static async oauthAccess(
    code: string,
    app: SlackOAuthAppType,
    redirectUri: string = `${Config.CLIENT_URL || ""}/connect/slack/callback`,
    useStagingApp?: boolean
  ): Promise<OAuthV2Response> {
    const endpoint = "oauth.v2.access";

    // If the workspace is flagged into the staging app and we're not in development, use the staging app's credentials
    return (await Slack.request(endpoint, {
      client_id:
        app === SlackOAuthAppType.Linear
          ? useStagingApp
            ? Config.SLACK_STAGING_CLIENT_ID
            : Config.SLACK_CLIENT_ID
          : Config.SLACK_INTAKE_APP_CLIENT_ID,
      client_secret:
        app === SlackOAuthAppType.Linear
          ? useStagingApp
            ? Config.SLACK_STAGING_CLIENT_SECRET
            : Config.SLACK_CLIENT_SECRET
          : Config.SLACK_INTAKE_APP_CLIENT_SECRET,
      redirect_uri: redirectUri,
      code,
    })) as OAuthV2Response;
  }

  private static handleError(
    error: string,
    response?: Response,
    integration?: Integration,
    context?: AnyContext,
    options?: {
      body?: string;
      endpoint?: string;
      ignoredErrors?: string[];
      data?: WebAPICallResult;
    }
  ) {
    if (response?.status === 429 || error === "ratelimited") {
      // Slack's ratelimited error also comes with a Retry-After header:
      // https://api.slack.com/methods/chat.postMessage#errors
      const retryAfterMs = RetryAfterHelper.parseMs(response?.headers.get("Retry-After"));
      if (retryAfterMs !== undefined) {
        throw new RateLimitedError("Slack rate limited", retryAfterMs);
      }
    } else if (error === "internal_error") {
      // We can't do much about errors on the Slack end: https://api.slack.com/automation/cli/errors#internal_error
      // Log details here since this is unusual and we might want to understand what's going on
      Logger.info("integrations", "Received an internal error from Slack", context, {
        integration,
        error,
        response,
      });
      throw new IntegrationInternalError(error);
    } else if (error === "invalid_arguments") {
      // Extract detailed error messages from response_metadata if available
      const responseMetadata = options?.data?.response_metadata;
      const detailedMessages = responseMetadata?.messages || [];

      let errorMessage = "Invalid arguments";
      if (detailedMessages.length > 0) {
        errorMessage = `${errorMessage}: ${detailedMessages.join(", ")}`;
      }

      Logger.info("integrations", "Received invalid_arguments error from Slack", context, {
        integration: integration ? { id: integration.id } : undefined,
        error,
        detailedMessages,
        response,
        data: options?.data,
      });

      throw new Error(errorMessage);
    } else if (error === "invalid_attachments") {
      // `invalid_attachments` is expected if there is poor formatting in the unfurl when we post to a webhook endpoint.
      // We ideally wouldn't hit this, but Slack is quite finicky on exactly what it accepts so we unintentionally hit
      // this for things like extra new lines, imperfect truncation of a very long set of blocks, etc. It's a noisy
      // error that we don't need to throw, but will instead log to debug as needed.
      Logger.warn("integrations", "Received invalid_attachments when posting to Slack", context, {
        integration: integration ? { id: integration.id } : undefined,
        error,
        response,
        body: options?.body,
      });
      return;
    } else if (error.includes("message_limit_exceeded")) {
      // `message_limit_exceeded` is expected if the workspace is a free one and has exceeded its message limit. Both
      // webhook POSTs and API calls can hit this error. We use .includes here because Slack sends this error as part of
      // a larger string in the webhook case, whereas the API call case will just return the error string directly.
      Logger.info(
        "integrations",
        "Slack workspace has exceeded its message limit and couldn't receive a message",
        context,
        {
          integration,
          error,
          response,
        }
      );
      return;
    } else if (options?.endpoint === "conversations.info") {
      // For conversations.info: https://api.slack.com/methods/conversations.info#errors
      // missing_scope is expected if the app hasn't been reinstalled with new scopes
      // channel_not_found is expected if we are querying for bot membership in a private channel or DM and the bot isn't
      // a member
      if (error === "missing_scope") {
        Logger.info("integrations", "Slack app is missing the right scopes to query conversations.info", context, {
          error,
          response,
        });
        return;
      } else if (error === "channel_not_found") {
        Logger.info("integrations", "Received channel_not_found error when querying conversations.info", context, {
          error,
          response,
        });
        return;
      }
    }
    // For conversations.open: https://api.slack.com/methods/conversations.open#errors
    // missing_scope is expected if the app hasn't been reinstalled with new scopes
    else if (options?.endpoint === "conversations.open") {
      if (error === "missing_scope") {
        Logger.info("integrations", "Slack app is missing the right scopes to call conversations.open", context, {
          error,
          response,
        });
        return;
      }
    } else if (options?.endpoint === "conversations.replies" || options?.endpoint === "conversations.history") {
      // For conversations.history: https://api.slack.com/methods/conversations.history#errors
      // For conversations.replies: https://api.slack.com/methods/conversations.replies#errors
      // We call these endpoints when adding a link to a Slack message as an attachment, so we use InputError since the
      // issues are usually with the input link or lack of permissions
      if (error === "not_in_channel" || error === "channel_not_found") {
        throw new InputError(
          Slack.inputErrorMessages.botNotInChannel,
          "Please make sure the Linear Slack bot is in the channel you are trying to link a message from."
        );
      } else if (error === "missing_scope") {
        throw new InputError(
          Slack.inputErrorMessages.insufficientPermissions,
          "Please reinstall the Slack integration in Linear to have the scopes needed to use this feature."
        );
      } else {
        Logger.info(
          "integrations",
          "Error fetching Slack message details from conversations.replies or conversations.history",
          context,
          {
            error,
            response,
          }
        );
        throw new InputError(
          Slack.inputErrorMessages.unableToFetchMessageDetails,
          "Please verify that your Slack permalink is valid."
        );
      }
    } else if (options?.endpoint === "chat.postEphemeral") {
      // For chat.postEphemeral: https://api.slack.com/methods/chat.postEphemeral#errors
      // user_not_in_channel is expected if the bot user isn't in a DM channel
      // is_archived is expected if the channel is archived. We can't post to archived channels.
      // channel_not_found is expected if the channel no longer exists
      if (error === "user_not_in_channel") {
        Logger.info("integrations", "Slack app tried to post ephemeral message to channel user is not in", context, {
          error,
          response,
        });
        return;
      } else if (error === "is_archived" || error === "channel_not_found") {
        return;
      }
    } else if (options?.endpoint === "chat.postMessage") {
      // For chat.postMessage: https://api.slack.com/methods/chat.postMessage#errors
      // is_archived is expected if the channel is archived. We can't post to archived channels.
      // channel_not_found is expected if the channel no longer exists
      if (error === "is_archived" || error === "channel_not_found") {
        return;
      }
    } else if (options?.endpoint === "chat.unfurl") {
      // For chat.unfurl: https://api.slack.com/methods/chat.unfurl#errors
      // cannot_parse_attachment is expected if there is a formatting error in the unfurl. We ideally wouldn't hit this,
      // but Slack is quite finicky on exactly what it accepts so we unintentionally hit this for things like extra new
      // lines, imperfect truncation of a very long set of blocks, etc. It's a noisy error that we don't need to throw,
      // but will instead log to debug as needed.
      if (error === "cannot_parse_attachment") {
        Logger.warn("integrations", "Received cannot_parse_attachment for a Slack unfurl", context, {
          integration: integration ? { id: integration.id } : undefined,
          error,
          response,
        });
        return;
      }
      // error_processing_metadata occurs when the Work Objects metadata payload is too large or malformed for Slack
      // to process. The unfurl still works without metadata, so this is not a critical error.
      if (error === "error_processing_metadata") {
        Logger.warn("integrations", "Received error_processing_metadata for a Slack unfurl", context, {
          integration: integration ? { id: integration.id } : undefined,
          error,
          response,
        });
        return;
      }
    } else if (options?.endpoint === "chat.update" && error === "is_inactive") {
      // https://api.slack.com/methods/chat.update#errors
      // Trying to update a message in a frozen/archived/deleted channel. Nothing much we can do about it.
      Logger.info("integrations", "Error updating a message in a frozen channel", context, {
        integration: integration ? { id: integration.id } : undefined,
        error,
        response,
        data: options?.data,
      });
      return;
    } else if (options?.endpoint === "chat.update" && error === "message_not_found") {
      // https://api.slack.com/methods/chat.update#errors
      Logger.info("integrations", "Error updating a message that can't be found", context, {
        integration: integration ? { id: integration.id } : undefined,
        error,
        response,
        data: options?.data,
      });
      return;
    } else if (options?.endpoint === "views.update" && error === "not_found") {
      // For views.update: https://api.slack.com/methods/views.update#errors
      // not_found is expected if the modal was closed before we could update it
      return;
    } else if (options?.endpoint === "views.publish") {
      Logger.info("integrations", "Error publishing a view", context, {
        integration: integration ? { id: integration.id } : undefined,
        error,
        response,
        data: options?.data,
      });
    } else if (options?.endpoint === "bots.info" && error === "bot_not_found") {
      // For bots.info: https://api.slack.com/methods/bots.info#errors
      // bot_not_found is expected if the bot is no longer in the workspace
      return;
    }

    // Throw all other errors unless we explicity want to ignore them
    if (!options?.ignoredErrors?.includes(error)) {
      Logger.info("integrations", "Error posting to Slack integration", context, {
        integration: integration ? { id: integration.id } : undefined,
        error,
        response,
        data: options?.data,
        // also send the body if it's an invalid_blocks error
        // so we can see what kind of blocks we sent
        body: error === "invalid_blocks" ? options?.body : undefined,
      });

      if (error === "no_text") {
        const body = options?.body;
        Logger.info("integrations", "No text to post to Slack integration", context, {
          integration: integration ? { id: integration.id } : undefined,
          error,
          response,
          data: options?.data,
          body,
          bodySize: body ? Buffer.byteLength(body, "utf8") : undefined,
        });
        return;
      }

      throw new Error(error);
    }
  }

  /** Known error messages */
  public static inputErrorMessages = {
    botNotInChannel: "Slack bot is not in the channel",
    insufficientPermissions: "Slack integration has insufficient permissions",
    unableToFetchMessageDetails: "Unable to fetch Slack message details from permalink",
  };
}
