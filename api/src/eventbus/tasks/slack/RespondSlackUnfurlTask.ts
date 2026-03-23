import type { Block, KnownBlock, MessageAttachment } from "@slack/bolt";
import type { ChatUnfurlArguments, ChatUnfurlResponse } from "@slack/web-api";
import pick from "lodash/pick";
import { ClientUrlHelper } from "@linear/common/urls/ClientUrlHelper";
import { RoutePaths, findMatchingRoute, parseIdOrSlugId } from "@linear/common/Routes";
import { Slack } from "~/services/slack/Slack";
import { Logger } from "~/logging/Logger";
import {
  presentIssuePayload,
  presentSlackAgentSession,
  presentSlackCommentCreated,
  presentSlackCustomView,
  presentSlackDocument,
  presentSlackInitiative,
  presentSlackProject,
} from "~/services/slack/slackPayloads";
import { presentSlackPullRequest } from "~/services/slack/slackPayloadsForPullRequests";
import { sectionBlockForText } from "~/services/slack/slackPayloadBlocks";
import {
  AgentSession,
  Comment,
  CustomView,
  FileUpload,
  Integration,
  IntegrationService,
  Issue,
  Project,
  ProjectUpdate,
  Document,
  Initiative,
  InitiativeUpdate,
  PullRequest,
} from "~/entity";
import { Flags } from "~/flags";
import { URLParseHelper } from "~/utils/URLParseHelper";
import type { Context } from "~/auth/Context";
import { Config } from "~/config/Config";
import { escapeTextForSlackLink } from "~/utils/strings";
import { Iframely } from "~/services/iframely/Iframely";
import { ScheduledTask, Task } from "~/eventbus/tasks/base/ScheduledTask";
import { getActionsToExcludeForIssue } from "~/services/slack/slackWorkObjectsPayloads";
import {
  generateProjectWorkObjectsEntities,
  generateInitiativeWorkObjectsEntities,
  generateIssueWorkObjectsEntities,
  generateDocumentWorkObjectsEntities,
  generatePullRequestWorkObjectsEntities,
} from "~/services/slack/generateWorkObjectsEntities";
import { SlackHelper } from "~/services/slack/SlackHelper";
import { findHeadingNameByHash } from "~/services/slack/slackHeadingHelper";

type Props = {
  /** URLs to unfurl */
  urls: string[];
  /** Slack integration ID */
  integrationId: string;
  /** Slack channel ID */
  channel: string;
  /** Slack message timestamp */
  messageTs: string;
  /** Slack thread timestamp */
  threadTs?: string;
  /** Whether the unfurl is being triggered by Slack Workflow Builder */
  isSlackWorkflowBuilder?: boolean;
};

/**
 * A task that responds to Slack unfurl requests.
 */
@Task()
export class RespondSlackUnfurlTask extends ScheduledTask<Props> {
  /** @inheritdoc */
  public readonly retryStrategy = "defaultExternal";

  /**
   * Executes the task.
   * @param {Context} context - The execution context.
   * @param {Props} props - The task properties.
   * @returns {Promise<void>} - A promise that resolves when the task is executed.
   */
  public override async execute(context: Context, props: Props): Promise<void> {
    const { urls, integrationId, channel, messageTs, threadTs, isSlackWorkflowBuilder } = props;

    const integration = await Integration.findByIdOrFail(context, integrationId, { includeArchived: false });

    if (integration.organizationId === "cf73833b-ec2a-4656-b1c7-2468c8b1e5f4") {
      Logger.info("integrations", "Running RespondSlackUnfurlTask for Leela's test workspace", context, {
        urls,
        integration: pick(integration, ["id", "service", "serviceId"]),
      });
    }

    // Skip unfurling if the message is addressed to the main Slack bot
    const isAddressedToBot = await SlackHelper.isMessageAddressedToMainSlackBot(
      context,
      integration,
      channel,
      messageTs,
      threadTs
    );
    if (isAddressedToBot) {
      return;
    }

    const canUseWorkObjects = integration.canUseWorkObjects;
    const [
      canUseProjectWorkObjects,
      canUseInitiativeWorkObjects,
      canUseDocumentWorkObjects,
      canUsePullRequestWorkObjects,
    ] = await Promise.all([
      integration.canUseProjectWorkObjects(context),
      integration.canUseInitiativeWorkObjects(context),
      integration.canUseDocumentWorkObjects(context),
      integration.canUsePullRequestWorkObjects(context),
    ]);

    const urlUnfurls: { [key: string]: MessageAttachment } = {};
    const modelUnfurls: { [key: string]: MessageAttachment } = {};
    const issuesForWorkObjects = [];
    const documentsForWorkObjects = [];
    const projectsForWorkObjects: { project: Project; url: string }[] = [];
    const initiativesForWorkObjects: { initiative: Initiative; url: string }[] = [];
    const pullRequestsForWorkObjects: { pullRequest: PullRequest; url: string }[] = [];
    // Track unfurled entity IDs to avoid duplicate unfurls when multiple URLs point to the same entity
    const unfurledEntityIds = new Set<string>();

    for (const url of urls) {
      const routeMatch = findMatchingRoute(url, Config.CLIENT_URL) ?? [];
      const { pathname: path } = new URL(url);

      // Images
      if (
        (Config.UPLOAD_BUCKET_DOMAIN && url.startsWith(Config.UPLOAD_BUCKET_DOMAIN)) ||
        (Config.PUBLIC_BUCKET_DOMAIN && url.startsWith(Config.PUBLIC_BUCKET_DOMAIN))
      ) {
        const file = await FileUpload.findByAssetUrl(context, url);
        if (!file || !file.isImage) {
          continue;
        }
        urlUnfurls[url] = {
          blocks: [
            {
              type: "image",
              image_url: url,
              alt_text: file.filename || "Image from Linear",
            },
          ],
        };
      } else if (Config.SECURE_IMAGE_PROXY_URL && url.startsWith(Config.SECURE_IMAGE_PROXY_URL)) {
        urlUnfurls[url] = {
          blocks: [
            {
              type: "image",
              image_url: url,
              alt_text: "Image from Linear",
            },
          ],
        };
      } else if (routeMatch) {
        const [route, params] = routeMatch;
        if ("orgKey" in params) {
          const orgKey = params.orgKey;
          if (orgKey !== context.organization.urlKey) {
            continue;
          }
        }

        // Issue
        if (route === RoutePaths.issue) {
          const issue = await Issue.findById(context, params.issueId, { includeArchived: true });

          if (issue?.organizationId !== integration.organizationId) {
            // Account for edge case in Enterprise Grid where the same identifier can exist in multiple workspaces that
            // the user has access to
            continue;
          }
          const issueSource = issue?.sourceMetadata?.subType;
          if (integration.service === IntegrationService.slackAsks && issueSource !== IntegrationService.slackAsks) {
            // The Asks integration can only unfurl Asks issues
            continue;
          }
          const team = await issue?.loadRelation(context, "team");
          if (issue && team && !team.private) {
            const commentHash = URLParseHelper.parseCommentHashFromUrl(url);
            const agentSessionHash = URLParseHelper.parseAgentSessionHashFromUrl(url);
            if (commentHash) {
              const comment = await Comment.findByHash(context, commentHash);
              // Verify comment belongs to this issue and comment hasn't been unfurled yet
              if (comment && comment.issueId === issue.id && !unfurledEntityIds.has(`comment:${comment.id}`)) {
                modelUnfurls[url] = await presentSlackCommentCreated(context, integration, comment, issue, {
                  includeLinkedUsername: true,
                  enableIntegrationActions: false,
                });
                unfurledEntityIds.add(`comment:${comment.id}`);
              }
            } else if (agentSessionHash) {
              const agentSession = await AgentSession.findByHash(context, agentSessionHash);
              // Verify agent session belongs to this issue and hasn't been unfurled yet
              if (
                agentSession &&
                agentSession.issueId === issue.id &&
                !unfurledEntityIds.has(`agentSession:${agentSession.id}`)
              ) {
                modelUnfurls[url] = await presentSlackAgentSession(context, integration, agentSession, issue);
                unfurledEntityIds.add(`agentSession:${agentSession.id}`);
              }
            } else if (!unfurledEntityIds.has(`issue:${issue.id}`)) {
              // Skip if this issue has already been unfurled via a different URL
              modelUnfurls[url] = await presentIssuePayload(context, integration, issue, {
                includeDescription: true,
                includeProject: true,
                excludeAllActions: isSlackWorkflowBuilder,
                actionsToExclude: await getActionsToExcludeForIssue(context, integration, issue, {
                  channel,
                  messageTs,
                  threadTs,
                }),
              });
              unfurledEntityIds.add(`issue:${issue.id}`);

              if (canUseWorkObjects) {
                // Collect issue for work objects generation
                issuesForWorkObjects.push({
                  issue,
                  url,
                  options: {
                    includeDescription: true,
                    includeProject: true,
                    includeSLA: true,
                    excludeAllActions: isSlackWorkflowBuilder,
                    channel,
                    messageTs,
                    threadTs,
                  },
                });
              }
            }
          }
        }

        // Following models are only supported in Slack, not Asks
        if (integration.service === IntegrationService.slack) {
          // Initiative
          if (route === RoutePaths.initiative) {
            const initiativeId = parseIdOrSlugId(params.initiativeId);
            const initiative = await Initiative.findById(context, initiativeId, { includeArchived: true });
            if (initiative) {
              const updateHash = URLParseHelper.parseUpdateHashFromUrl(url, "initiativeUpdate");
              if (updateHash) {
                const initiativeUpdate = await InitiativeUpdate.findBySlugId(context, initiative.id, updateHash);
                if (initiativeUpdate && !unfurledEntityIds.has(`initiativeUpdate:${initiativeUpdate.id}`)) {
                  const slackUpdatePayload = pick(
                    await initiativeUpdate.toSlackPayload(context, integration),
                    "blocks"
                  );
                  modelUnfurls[url] = slackUpdatePayload;
                  unfurledEntityIds.add(`initiativeUpdate:${initiativeUpdate.id}`);
                }
              } else if (!unfurledEntityIds.has(`initiative:${initiative.id}`)) {
                // Check for document heading hash in initiative overview
                const headingHash = URLParseHelper.parseDocumentHeadingHashFromUrl(url);
                let headingName: string | undefined;
                if (headingHash) {
                  const documentContent = await initiative.loadRelation(context, "documentContent");
                  headingName = findHeadingNameByHash(documentContent?.getContentData(), headingHash);
                }
                modelUnfurls[url] = await presentSlackInitiative(context, initiative, {
                  headingName,
                  headingHash,
                });
                unfurledEntityIds.add(`initiative:${initiative.id}`);

                if (canUseInitiativeWorkObjects) {
                  initiativesForWorkObjects.push({ initiative, url });
                }
              }
            }
          }

          // Project
          if (route === RoutePaths.project) {
            const projectId = parseIdOrSlugId(params.projectId);
            const project = await Project.findById(context, projectId, { includeArchived: false });
            const teams = await project?.teams(context);
            if (project && teams && teams.some(team => !team.private)) {
              const updateHash = URLParseHelper.parseUpdateHashFromUrl(url, "projectUpdate");
              if (updateHash) {
                const projectUpdate = await ProjectUpdate.findBySlugId(context, project.id, updateHash);
                if (projectUpdate && !unfurledEntityIds.has(`projectUpdate:${projectUpdate.id}`)) {
                  const slackUpdatePayload = pick(await projectUpdate.toSlackPayload(context, integration), "blocks");
                  modelUnfurls[url] = slackUpdatePayload;
                  unfurledEntityIds.add(`projectUpdate:${projectUpdate.id}`);
                }
              } else if (!unfurledEntityIds.has(`project:${project.id}`)) {
                // Check for document heading hash in project overview
                const headingHash = URLParseHelper.parseDocumentHeadingHashFromUrl(url);
                let headingName: string | undefined;
                if (headingHash) {
                  const documentContent = await project.loadRelation(context, "documentContent");
                  headingName = findHeadingNameByHash(documentContent?.getContentData(), headingHash);
                }
                modelUnfurls[url] = await presentSlackProject(context, project, {
                  headingName,
                  headingHash,
                });
                unfurledEntityIds.add(`project:${project.id}`);

                if (canUseProjectWorkObjects) {
                  projectsForWorkObjects.push({ project, url });
                }
              }
            }
          }

          // Custom view
          if (
            route === RoutePaths.customView ||
            route === RoutePaths.projectFacet ||
            route === RoutePaths.allProjectsFacet ||
            route === RoutePaths.initiativeFacet ||
            route === RoutePaths.teamIssuesFacet
          ) {
            const customViewId = parseIdOrSlugId(params.customViewId);
            const customView = await CustomView.findById(context, customViewId, { includeArchived: false });
            // eslint-disable-next-line linear-app/no-many-to-one-access
            const team = await customView?.team;
            if (
              customView &&
              customView.shared &&
              !team?.private &&
              !unfurledEntityIds.has(`customView:${customView.id}`)
            ) {
              modelUnfurls[url] = await presentSlackCustomView(context, customView);
              unfurledEntityIds.add(`customView:${customView.id}`);
            }
          }

          // Document
          if (route === RoutePaths.document) {
            const documentId = parseIdOrSlugId(params.documentId);
            const document = await Document.findById(context, documentId, { includeArchived: false });
            if (!document) {
              continue;
            }
            const documentContent = await document.loadRelation(context, "documentContent");
            const commentHash = URLParseHelper.parseCommentHashFromUrl(url);
            if (documentContent && commentHash) {
              const comment = await Comment.findByHash(context, commentHash);
              if (comment && !unfurledEntityIds.has(`comment:${comment.id}`)) {
                modelUnfurls[url] = await presentSlackCommentCreated(context, integration, comment, document, {
                  includeLinkedUsername: true,
                  enableIntegrationActions: false,
                });
                unfurledEntityIds.add(`comment:${comment.id}`);
              }
            } else if (!unfurledEntityIds.has(`document:${document.id}`)) {
              const teams = await document.teams(context);
              // Documents can have no team relations - if so privacy is not a concern
              if (teams.length === 0 || teams.some(team => !team.private)) {
                const headingHash = URLParseHelper.parseDocumentHeadingHashFromUrl(url);
                let headingName: string | undefined;
                if (headingHash && documentContent) {
                  headingName = findHeadingNameByHash(documentContent.getContentData(), headingHash);
                }
                // Load parent and summary for both forms of unfurl ahead of time
                const [parent, summary] = await Promise.all([
                  document.parent(context),
                  SlackHelper.summarizeDocumentContent(context, document, documentContent),
                ]);
                modelUnfurls[url] = await presentSlackDocument(context, integration, document, {
                  parent,
                  documentContent,
                  headingName,
                  headingHash,
                  summary,
                });
                unfurledEntityIds.add(`document:${document.id}`);

                if (canUseDocumentWorkObjects) {
                  documentsForWorkObjects.push({
                    document,
                    url,
                    parent,
                    documentContent,
                    headingName,
                    headingHash,
                    summary,
                  });
                }
              }
            }
          }

          // Pull Request Review
          if (route === RoutePaths.review) {
            const codeReviewsEnabled = await Flags.variation(Flags.codeReviews, context, false);
            if (codeReviewsEnabled) {
              const reviewId = parseIdOrSlugId(params.reviewId);
              const pullRequest = await PullRequest.findById(context, reviewId, { includeArchived: false });
              if (
                pullRequest &&
                pullRequest.organizationId === integration.organizationId &&
                !unfurledEntityIds.has(`pullRequest:${pullRequest.id}`)
              ) {
                if (canUsePullRequestWorkObjects) {
                  pullRequestsForWorkObjects.push({ pullRequest, url });
                } else {
                  modelUnfurls[url] = await presentSlackPullRequest(context, pullRequest);
                }
                unfurledEntityIds.add(`pullRequest:${pullRequest.id}`);
              }
            }
          }
        }
      } else if (url.startsWith(Config.CLIENT_URL) && ClientUrlHelper.isWebsiteRouterPath(path)) {
        // No regular website unfurls for Asks
        if (integration.service !== IntegrationService.slack) {
          continue;
        }

        // Fallback to generic unfurl through Iframely for public pages
        try {
          const embed = await Iframely.get(context, `${Config.CLIENT_URL}${path}`);

          if (embed && embed.title) {
            urlUnfurls[url] = {
              blocks: [
                {
                  ...sectionBlockForText(
                    `*<${url}|${escapeTextForSlackLink(embed.title)}>*${embed.description ? `\n${embed.description}` : ""}`
                  ),
                },
              ].filter(Boolean) as (Block | KnownBlock)[],
            };

            if (embed.thumbnailUrl) {
              urlUnfurls[url].blocks?.unshift({
                type: "image",
                image_url: embed.thumbnailUrl,
                alt_text: embed.title,
              });
            }
          }
        } catch (error) {
          // no-op
        }
      }
    }

    for (const unfurl of Object.values(modelUnfurls)) {
      // Unfurls do not allow the text field, which is a fallback in other situations
      delete unfurl.text;
    }

    // Generate Work Objects metadata for issues, projects, initiatives, and documents.
    // The presence of the metadata field will cause the unfurl to be shown as a Work Objects entity.
    const [
      issueWorkObjectsEntities,
      projectWorkObjectsEntities,
      initiativeWorkObjectsEntities,
      documentWorkObjectsEntities,
      pullRequestWorkObjectsEntities,
    ] = await Promise.all([
      generateIssueWorkObjectsEntities(context, integration, issuesForWorkObjects),
      generateProjectWorkObjectsEntities(context, integration, projectsForWorkObjects),
      generateInitiativeWorkObjectsEntities(context, integration, initiativesForWorkObjects),
      generateDocumentWorkObjectsEntities(context, integration, documentsForWorkObjects),
      generatePullRequestWorkObjectsEntities(context, integration, pullRequestsForWorkObjects),
    ]);
    const workObjectsEntities = [
      ...issueWorkObjectsEntities,
      ...projectWorkObjectsEntities,
      ...initiativeWorkObjectsEntities,
      ...documentWorkObjectsEntities,
      ...pullRequestWorkObjectsEntities,
    ];

    // Cap total metadata size to avoid Slack's error_processing_metadata error.
    // Individual entities are already capped at MAX_METADATA_BYTES (3400), but the combined
    // payload can exceed Slack's total metadata limit when multiple URLs are unfurled in one message.
    if (workObjectsEntities.length > 1) {
      const maxTotalMetadataBytes = SlackHelper.MAX_METADATA_BYTES;
      const originalCount = workObjectsEntities.length;
      while (
        workObjectsEntities.length > 0 &&
        Buffer.byteLength(JSON.stringify({ entities: workObjectsEntities }), "utf8") > maxTotalMetadataBytes
      ) {
        workObjectsEntities.pop();
      }
      if (workObjectsEntities.length < originalCount) {
        Logger.info("integrations", "Dropped Work Object entities to fit total metadata size limit", context, {
          integration: { id: integration.id },
          originalCount,
          finalCount: workObjectsEntities.length,
        });
      }
    }

    // For chat.unfurl, work objects metadata is a JSON string (see L317 comment above)
    const workObjectsMetadata =
      workObjectsEntities.length > 0
        ? {
            metadata: JSON.stringify({ entities: workObjectsEntities }),
          }
        : {};

    const payload = {
      channel,
      ts: messageTs,
      unfurls: { ...modelUnfurls, ...urlUnfurls },
      ...workObjectsMetadata,
    };

    // There are specific errors we can't do anything about: https://api.slack.com/methods/chat.unfurl#errors
    const ignoredErrors = ["cannot_unfurl_message", "cannot_unfurl_url", "cannot_find_message", "fatal_error"];
    try {
      await Slack.post<ChatUnfurlArguments, ChatUnfurlResponse>(context, "chat.unfurl", integration, payload, {
        ignoredErrors,
      });
    } catch (error) {
      if (!ignoredErrors.includes(error)) {
        Logger.error("integrations", "Error posting to slack chat.unfurl", error, context, {
          integration: { id: integration.id },
          slack: {
            channel,
            payload: JSON.stringify(payload),
            props,
          },
        });
      }
    }
  }
}
