/**
 * @typedef {Object} Query
 * @property {User} user - One specific user.
 * @property {User} viewer - The currently authenticated user.
 * @property {Organization} organization - The user's organization.
 * @property {OrganizationExistsPayload} organizationExists - Does the organization exist.
 * @property {SyncResponse} syncBootstrap - Fetch data to catch up the client to the state of the world.
 * @property {SyncResponse} syncUpdates - Fetches delta packets to catch up the user to the current state of the world.
 * @property {ArchiveResponse} archivedModelSync - Fetches an archived model.
 * @property {ArchiveResponse} archivedModelsSync - Fetches archived models.
 * @property {UserAccountAdminPrivileged} adminUserAccountLookup - Finds a user account by email or identifier. Super user required.
 * @property {UserConnection} users - All users of the organization.
 * @property {ApiKeyConnection} apiKeys - All API keys for the user.
 * @property {Application} application - Get information for an application.
 * @property {Array<Application>} authorizedApplications - Get all authorized applications for a user
 * @property {AuthResolverResponse} availableUsers - Fetch users belonging to this user account.
 * @property {SsoUrlFromEmailResponse} ssoUrlFromEmail - Fetch SSO login URL for the email provided.
 * @property {BillingDetailsPayload} billingDetails - Billing details for the customer.
 * @property {CollaborationDocumentUpdatePayload} collaborativeDocumentJoin - Join collaborative document and get missing steps.
 * @property {Comment} comment - A specific comment.
 * @property {CommentConnection} comments
 * @property {CustomView} customView - One specific custom view.
 * @property {CustomViewConnection} customViews
 * @property {Cycle} cycle - One specific cycle.
 * @property {CycleConnection} cycles - All cycles.
 * @property {Emoji} emoji - A specific emoji.
 * @property {EmojiConnection} emojis
 * @property {Favorite} favorite - One specific favorite.
 * @property {FavoriteConnection} favorites - The user's favorites.
 * @property {FigmaEmbedPayload} figmaEmbedInfo - Fetch Figma screenshot and other information with file and node identifiers.
 * @property {Integration} integration - One specific integration.
 * @property {IntegrationConnection} integrations - All integrations.
 * @property {IntegrationResource} integrationResource - One specific integration resource. (e.g. linked GitHub pull requests for an issue)
 * @property {IntegrationResourceConnection} integrationResources - All integrations resources (e.g. linked GitHub pull requests for issues).
 * @property {InvitePagePayload} inviteInfo - Retrieves information for the public invite page.
 * @property {IssueLabel} issueLabel - One specific label.
 * @property {IssueLabelConnection} issueLabels - All labels.
 * @property {IssueRelation} issueRelation - One specific issue relation.
 * @property {IssueRelationConnection} issueRelations
 * @property {Issue} issue - One specific issue.
 * @property {IssueConnection} issueSearch - [ALPHA] Search issues. This query is experimental and is subject to change without notice.
 * @property {IssueConnection} issues
 * @property {Milestone} milestone - One specific milestone.
 * @property {MilestoneConnection} milestones - All milestones.
 * @property {UserSettings} notification - The user's settings.
 * @property {NotificationConnection} notifications - All notifications.
 * @property {NotificationSubscriptionConnection} notificationSubscription - The user's notification subscriptions.
 * @property {IssueLabel} organizationInvite - One specific organization invite.
 * @property {OrganizationInviteConnection} organizationInvites - All invites for the organization.
 * @property {ProjectLink} projectLink - One specific project link.
 * @property {ProjectLinkConnection} ProjectLinks - All links for the project.
 * @property {Project} project - One specific project.
 * @property {ProjectConnection} projects - All projects.
 * @property {PushSubscriptionPayload} pushSubscriptionTest - Sends a test push message.
 * @property {Reaction} reaction - A specific reaction.
 * @property {ReactionConnection} reactions
 * @property {Subscription} subscription - The organization's subscription.
 * @property {TeamMembership} teamMembership - One specific team membership.
 * @property {TeamMembershipConnection} teamMemberships - All team memberships.
 * @property {Team} team - One specific team.
 * @property {TeamConnection} teams - All teams.
 * @property {Array<Template>} templates - All templates from all users.
 * @property {Template} template - A specific template.
 * @property {ViewPreferencesConnection} viewPreferences - All view preferences.
 * @property {Webhook} webhook - A specific webhook.
 * @property {WebhookConnection} webhooks - All webhooks.
 * @property {WorkflowState} workflowState - One specific state.
 * @property {WorkflowStateConnection} workflowStates - All states.
 */

/**
 * A user that has access to the the resources of an organization.
 *
 * @typedef {Object} User
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} name - The user's full name.
 * @property {string} displayName - The user's display (nick) name. Unique within each organization.
 * @property {string} email - The user's email address.
 * @property {string} [avatarUrl] - An URL to the user's avatar image.
 * @property {string} disableReason - Reason why is the account disabled.
 * @property {string} inviteHash - Unique hash for the user to be used in invite URLs.
 * @property {string} userAccountId
 * @property {UserSettings} settings - The settings of the user.
 * @property {DateTime} [lastSeen] - The last time the user was seen online. If null, the user is currently online.
 * @property {boolean} admin - Whether the user is an organization administrator.
 * @property {boolean} active - Whether the user account is active or disabled.
 * @property {IssueConnection} assignedIssues - Issues assigned to the user.
 * @property {IssueConnection} createdIssues - Issues created by the user.
 * @property {Organization} organization - Organization in which the user belongs to.
 * @property {number} createdIssueCount - Number of issues created.
 * @property {TeamMembershipConnection} teamMemberships - Memberships associated with the user.
 */

/**
 * @typedef {Object} Node
 * @property {string} id - The unique identifier of the entity.
 */

/**
 * The javascript `Date` as string. Type represents date and time as the ISO Date string.
 *
 * @typedef {*} DateTime
 */

/**
 * The settings of a user as a JSON object.
 *
 * @typedef {Object} UserSettings
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {JSONObject} notificationPreferences - The notification channel settings the user has selected.
 * @property {Array<string>} unsubscribedFrom - The email types the user has unsubscribed from.
 * @property {User} user - The user to whom this notification was targeted for.
 */

/**
 * The `JSONObject` scalar type represents JSON values as a string
 *
 * @typedef {*} JSONObject
 */

/**
 * By which field should the pagination order by
 *
 * @typedef {("createdAt"|"updatedAt")} PaginationOrderBy
 */

/**
 * @typedef {Object} IssueConnection
 * @property {Array<IssueEdge>} edges
 * @property {Array<Issue>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} IssueEdge
 * @property {Issue} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * An issue.
 *
 * @typedef {Object} Issue
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {number} number - The issue's unique number.
 * @property {string} title - The issue's title.
 * @property {string} [description] - The issue's description in markdown format.
 * @property {JSON} [descriptionData] - The issue's description as a Prosemirror document.
 * @property {number} priority - The priority of the issue.
 * @property {number} [estimate] - The estimate of the complexity of the issue..
 * @property {number} boardOrder - The order of the item in its column on the board.
 * @property {DateTime} [startedAt] - The time at which the issue was moved into started state.
 * @property {DateTime} [completedAt] - The time at which the issue was moved into completed state.
 * @property {DateTime} [canceledAt] - The time at which the issue was moved into canceled state.
 * @property {DateTime} [autoClosedAt] - The time at which the issue was automatically closed by the auto pruning process.
 * @property {DateTime} [autoArchivedAt] - The time at which the issue was automatically archived by the auto pruning process.
 * @property {TimelessDateScalar} [dueDate] - The date at which the issue is due.
 * @property {Array<string>} previousIdentifiers - Previous identifiers of the issue if it has been moved between teams.
 * @property {string} identifier - Issue's human readable identifier (e.g. ENG-123).
 * @property {string} priorityLabel - Label for the priority.
 * @property {string} url - Issue URL.
 * @property {Team} team - The team that the issue is associated with.
 * @property {Cycle} [cycle] - The cycle that the issue is associated with.
 * @property {WorkflowState} state - The workflow state that the issue is associated with.
 * @property {User} [assignee] - The user to whom the issue is assigned to.
 * @property {Issue} [parent] - The parent of the issue.
 * @property {Project} [project] - The project that the issue is associated with.
 * @property {string} branchName - Suggested branch name for the issue.
 * @property {UserConnection} subscribers - Users who are subscribed to the issue.
 * @property {User} [creator] - The user who created the issue.
 * @property {IssueConnection} children - Children of the issue.
 * @property {CommentConnection} comments - Comments associated with the issue.
 * @property {IssueHistoryConnection} history - History entries associated with the issue.
 * @property {IssueLabelConnection} labels - Labels associated with this issue.
 * @property {IntegrationResourceConnection} integrationResources - Integration resources for this issue.
 * @property {IssueRelationConnection} relations - Relations associated with this issue.
 * @property {IssueRelationConnection} inverseRelations - Inverse relations associated with this issue.
 */

/**
 * The `JSON` scalar type represents JSON values
 *
 * @typedef {*} JSON
 */

/**
 * The `TimelessDateScalar` scalar type represents Date values without a timestamp. It expects strings in the format YYYY-MM-DD
 *
 * @typedef {*} TimelessDateScalar
 */

/**
 * An organizational unit that contains issues.
 *
 * @typedef {Object} Team
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} name - The team's name.
 * @property {string} key - The team's unique key. The key is used in URLs.
 * @property {string} [description] - The team's description.
 * @property {boolean} cyclesEnabled - Whether the team uses cycles.
 * @property {number} cycleStartDay - The day of the week that a new cycle starts.
 * @property {number} cycleDuration - The duration of a cycle in weeks.
 * @property {number} cycleCooldownTime - The cooldown time after each cycle in weeks.
 * @property {boolean} cycleIssueAutoAssignStarted - Auto assign started issues to current cycle.
 * @property {boolean} cycleIssueAutoAssignCompleted - Auto assign completed issues to current cycle.
 * @property {boolean} cycleLockToActive - Only allow issues issues with cycles in Active Issues.
 * @property {number} upcomingCycleCount - How many upcoming cycles to create.
 * @property {string} timezone - The timezone of the team. Defaults to "America/Los_Angeles"
 * @property {string} inviteHash - Unique hash for the team to be used in invite URLs.
 * @property {string} issueEstimationType - The issue estimation type to use.
 * @property {boolean} issueEstimationAllowZero - Whether to allow zeros in issues estimates.
 * @property {boolean} issueEstimationExtended - Whether to add additional points to the estimate scale.
 * @property {number} defaultIssueEstimate - What to use as an default estimate for unestimated issues.
 * @property {string} defaultTemplateForMembersId - The default template to use for new issues created by members of the team.
 * @property {string} defaultTemplateForNonMembersId - The default template to use for new issues created by non-members of the team.
 * @property {WorkflowState} [draftWorkflowState] - The workflow state into which issues are moved when a PR has been opened as draft.
 * @property {WorkflowState} [startWorkflowState] - The workflow state into which issues are moved when a PR has been opened.
 * @property {WorkflowState} [reviewWorkflowState] - The workflow state into which issues are moved when a review has been requested for the PR.
 * @property {WorkflowState} [mergeWorkflowState] - The workflow state into which issues are moved when a PR has been merged.
 * @property {boolean} groupIssueHistory - Whether to group recent issue history entries.
 * @property {boolean} slackNewIssue - Whether to send new issue notifications to Slack.
 * @property {boolean} slackIssueComments - Whether to send new issue comment notifications to Slack.
 * @property {boolean} slackIssueStatuses - Whether to send new issue status updates to Slack.
 * @property {number} autoClosePeriod - Period after which issues are automatically closed in months. Null/undefined means disabled.
 * @property {string} [autoCloseStateId] - The canceled workflow state which auto closed issues will be set to. Defaults to the first canceled state.
 * @property {number} autoArchivePeriod - Period after which automatically closed and completed issues are automatically archived in months. Null/undefined means disabled.
 * @property {WorkflowState} [markedAsDuplicateWorkflowState] - The workflow state into which issues are moved when they are marked as a duplicate of another issue. Defaults to the first canceled state.
 * @property {IssueConnection} issues - Issues associated with the team.
 * @property {CycleConnection} cycles - Cycles associated with the team.
 * @property {TeamMembershipConnection} memberships - Memberships associated with the team.
 * @property {ProjectConnection} projects - Projects associated with the team.
 * @property {WorkflowStateConnection} states - The states that define the workflow associated with the team.
 * @property {TemplateConnection} templates - Templates associated with the team.
 * @property {IssueLabelConnection} labels - Labels associated with the team.
 * @property {Organization} organization - The organization that the team is associated with.
 * @property {string} cycleCalenderUrl - Calender feed (iCal) for cycles.
 * @property {WebhookConnection} webhooks - Webhooks associated with the team.
 */

/**
 * A state in a team workflow.
 *
 * @typedef {Object} WorkflowState
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} name - The state's name.
 * @property {string} color - The state's UI color as a HEX string.
 * @property {string} [description] - Description of the state.
 * @property {number} position - The position of the state in the team flow.
 * @property {string} type - The type of the state.
 * @property {Team} team - The team to which this state belongs to.
 * @property {IssueConnection} issues - Issues belonging in this state.
 */

/**
 * @typedef {Object} CycleConnection
 * @property {Array<CycleEdge>} edges
 * @property {Array<Cycle>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} CycleEdge
 * @property {Cycle} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * A set of issues to be resolved in a specified amount of time.
 *
 * @typedef {Object} Cycle
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {number} number - The number of the cycle.
 * @property {string} [name] - The custom name of the cycle.
 * @property {DateTime} startsAt - The start time of the cycle.
 * @property {DateTime} endsAt - The end time of the cycle.
 * @property {DateTime} [completedAt] - The completion time of the cycle. If null, the cycle hasn't been completed.
 * @property {Array<number>} issueCountHistory - The total number of issues in the cycle after each day.
 * @property {Array<number>} completedIssueCountHistory - The number of completed issues in the cycle after each day.
 * @property {Array<number>} scopeHistory - The total number of estimation points after each day.
 * @property {Array<number>} completedScopeHistory - The number of completed estimation points after each day.
 * @property {Team} team - The team that the cycle is associated with.
 * @property {IssueConnection} issues - Issues associated with the cycle.
 * @property {IssueConnection} uncompletedIssuesUponClose - Issues that weren't completed when the cycle was closed.
 */

/**
 * @typedef {Object} PageInfo
 * @property {boolean} hasPreviousPage - Indicates if there are more results when paginating backward.
 * @property {boolean} hasNextPage - Indicates if there are more results when paginating forward.
 * @property {string} [startCursor] - Cursor representing the first result in the paginated results.
 * @property {string} [endCursor] - Cursor representing the last result in the paginated results.
 */

/**
 * @typedef {Object} TeamMembershipConnection
 * @property {Array<TeamMembershipEdge>} edges
 * @property {Array<TeamMembership>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} TeamMembershipEdge
 * @property {TeamMembership} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * Defines the membership of a user to a team.
 *
 * @typedef {Object} TeamMembership
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {User} user - The user that the membership is associated with.
 * @property {Team} team - The team that the membership is associated with.
 */

/**
 * @typedef {Object} ProjectConnection
 * @property {Array<ProjectEdge>} edges
 * @property {Array<Project>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} ProjectEdge
 * @property {Project} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * A project.
 *
 * @typedef {Object} Project
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} name - The project's name.
 * @property {string} description - The project's description.
 * @property {string} slugId - The project's unique URL slug.
 * @property {string} [icon] - The icon of the project.
 * @property {string} color - The project's color.
 * @property {string} state - The type of the state.
 * @property {User} creator - The user who created the project.
 * @property {User} [lead] - The project lead.
 * @property {Milestone} [milestone] - The milestone that this project is associated with.
 * @property {TimelessDateScalar} [targetDate] - The estimated completion date of the project.
 * @property {DateTime} [startedAt] - The time at which the project was moved into started state.
 * @property {DateTime} [completedAt] - The time at which the project was moved into completed state.
 * @property {DateTime} [canceledAt] - The time at which the project was moved into canceled state.
 * @property {number} sortOrder - The sort order for the project within its milestone.
 * @property {Array<number>} issueCountHistory - The total number of issues in the project after each week.
 * @property {Array<number>} completedIssueCountHistory - The number of completed issues in the project after each week.
 * @property {Array<number>} scopeHistory - The total number of estimation points after each week.
 * @property {Array<number>} completedScopeHistory - The number of completed estimation points after each week.
 * @property {boolean} slackNewIssue - Whether to send new issue notifications to Slack.
 * @property {boolean} slackIssueComments - Whether to send new issue comment notifications to Slack.
 * @property {boolean} slackIssueStatuses - Whether to send new issue status updates to Slack.
 * @property {TeamConnection} teams - Teams associated with this project.
 * @property {UserConnection} members - Users that are members of the project.
 * @property {IssueConnection} issues - Issues associated with the project.
 * @property {ProjectLinkConnection} links - Links associated with the project.
 */

/**
 * A milestone that contains projects.
 *
 * @typedef {Object} Milestone
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} name - The name of the milestone.
 * @property {Organization} organization - The organization that the milestone belongs to.
 * @property {number} sortOrder - The sort order for the milestone.
 * @property {ProjectConnection} projects - Projects associated with the milestone.
 */

/**
 * An organization. Organizations are root-level objects that contain user accounts and teams.
 *
 * @typedef {Object} Organization
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} name - The organization's name.
 * @property {string} urlKey - The organization's unique URL key.
 * @property {string} [logoUrl] - The organization's logo URL.
 * @property {boolean} upgradeThresholdExceeded
 * @property {number} periodUploadVolume - Rolling 30-day total upload volume for the organization, in megabytes.
 * @property {string} gitBranchFormat - How git branches are formatted. If null, default formatting will be used.
 * @property {boolean} gitLinkbackMessagesEnabled - Whether the Git integration linkback messages should be sent.
 * @property {boolean} projectMilestonesEnabled - Whether the organization is using project milestones.
 * @property {boolean} samlEnabled - Whether SAML authentication is enabled for organization.
 * @property {Array<string>} allowedAuthServices - Allowed authentication providers, empty array means all are allowed
 * @property {UserConnection} users - Users associated with the organization.
 * @property {TeamConnection} teams - Teams associated with the organization.
 * @property {MilestoneConnection} mildestones - Milestones associated with the organization.
 * @property {IntegrationConnection} integrations - Integrations associated with the organization.
 * @property {Subscription} [subscription] - The organization's subscription to a paid plan.
 * @property {number} userCount - Number of active users in the organization.
 * @property {number} createdIssueCount - Number of issues in the organization.
 */

/**
 * @typedef {Object} UserConnection
 * @property {Array<UserEdge>} edges
 * @property {Array<User>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} UserEdge
 * @property {User} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * @typedef {Object} TeamConnection
 * @property {Array<TeamEdge>} edges
 * @property {Array<Team>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} TeamEdge
 * @property {Team} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * @typedef {Object} MilestoneConnection
 * @property {Array<MilestoneEdge>} edges
 * @property {Array<Milestone>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} MilestoneEdge
 * @property {Milestone} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * @typedef {Object} IntegrationConnection
 * @property {Array<IntegrationEdge>} edges
 * @property {Array<Integration>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} IntegrationEdge
 * @property {Integration} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * An integration with an external service.
 *
 * @typedef {Object} Integration
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} service - The integration's type.
 * @property {string} [serviceId] - The external service identifier.
 * @property {IntegrationSettings} settings - Settings related to the integration.
 * @property {Organization} organization - The organization that the integration is associated with.
 * @property {Team} [team] - The team that the integration is associated with.
 * @property {User} creator - The user that added the integration.
 */

/**
 * The integration resource's settings
 *
 * @typedef {Object} IntegrationSettings
 * @property {SlackPostSettings} [slackPost]
 * @property {SlackPostSettings} [slackProjectPost]
 * @property {GoogleSheetsSettings} [googleSheets]
 * @property {SentrySettings} [sentry]
 */

/**
 * Slack notification specific settings.
 *
 * @typedef {Object} SlackPostSettings
 * @property {string} channel
 * @property {string} channelId
 * @property {string} configurationUrl
 */

/**
 * Google Sheets specific settings.
 *
 * @typedef {Object} GoogleSheetsSettings
 * @property {string} spreadsheetId
 * @property {string} spreadsheetUrl
 * @property {number} sheetId
 * @property {DateTime} updatedIssuesAt
 */

/**
 * Sentry specific settings.
 *
 * @typedef {Object} SentrySettings
 * @property {string} organizationSlug - The slug of the Sentry organization being connected.
 */

/**
 * The subscription of an organization.
 *
 * @typedef {Object} Subscription
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} type - The subscription type.
 * @property {number} seats - The number of seats in the subscription.
 * @property {User} [creator] - The creator of the subscription.
 * @property {Organization} organization - The organization that the subscription is associated with.
 * @property {DateTime} [canceledAt] - The date the subscription was canceled, if any.
 */

/**
 * @typedef {Object} ProjectLinkConnection
 * @property {Array<ProjectLinkEdge>} edges
 * @property {Array<ProjectLink>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} ProjectLinkEdge
 * @property {ProjectLink} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * An external link for a project.
 *
 * @typedef {Object} ProjectLink
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} url - The link's URL.
 * @property {string} label - The link's label.
 * @property {User} creator - The user who created the link.
 * @property {Project} project - The project that the link is associated with.
 */

/**
 * @typedef {Object} WorkflowStateConnection
 * @property {Array<WorkflowStateEdge>} edges
 * @property {Array<WorkflowState>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} WorkflowStateEdge
 * @property {WorkflowState} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * @typedef {Object} TemplateConnection
 * @property {Array<TemplateEdge>} edges
 * @property {Array<Template>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} TemplateEdge
 * @property {Template} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * A template object used for creating new issues faster.
 *
 * @typedef {Object} Template
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} type - The entity type this template is for.
 * @property {string} name - The name of the template.
 * @property {string} [description] - Template description.
 * @property {JSON} templateData - Template data.
 * @property {Team} team - The team that the template is associated with.
 * @property {User} [creator] - The user who created the template.
 */

/**
 * @typedef {Object} IssueLabelConnection
 * @property {Array<IssueLabelEdge>} edges
 * @property {Array<IssueLabel>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} IssueLabelEdge
 * @property {IssueLabel} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * Labels that can be associated with issues.
 *
 * @typedef {Object} IssueLabel
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} name - The label's name.
 * @property {string} [description] - The label's description.
 * @property {string} color - The label's color as a HEX string.
 * @property {Team} team - The team to which the label belongs to.
 * @property {User} [creator] - The user who created the label.
 * @property {IssueConnection} issues - Issues associated with the label.
 */

/**
 * @typedef {Object} WebhookConnection
 * @property {Array<WebhookEdge>} edges
 * @property {Array<Webhook>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} WebhookEdge
 * @property {Webhook} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * A webhook used to send HTTP notifications over data updates
 *
 * @typedef {Object} Webhook
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} url - Webhook URL
 * @property {boolean} enabled - Whether the Webhook is enabled.
 * @property {Team} team - The team that the webhook is associated with.
 * @property {User} [creator] - The user who created the webhook.
 * @property {string} [secret] - Secret token for verifying the origin on the recipient side.
 */

/**
 * @typedef {Object} CommentConnection
 * @property {Array<CommentEdge>} edges
 * @property {Array<Comment>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} CommentEdge
 * @property {Comment} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * A comment associated with an issue.
 *
 * @typedef {Object} Comment
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} body - The comment content in markdown format.
 * @property {JSON} [bodyData] - Comment content as a Prosemirror document.
 * @property {Array<JSON>} reactionData - Emoji reactions on the comment.
 * @property {DateTime} [editedAt] - The time user edited the comment.
 * @property {User} user - The user who wrote the comment.
 * @property {Issue} issue - The issue that the comment is associated with.
 */

/**
 * @typedef {Object} IssueHistoryConnection
 * @property {Array<IssueHistoryEdge>} edges
 * @property {Array<IssueHistory>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} IssueHistoryEdge
 * @property {IssueHistory} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * A record of changes to an issue.
 *
 * @typedef {Object} IssueHistory
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {Issue} issue - The issue that was changed.
 * @property {User} [actor] - The user who made these changes. If null, possibly means that the change made by an integration.
 * @property {Integration} [integration] - The integration that made these changes. If null, possibly means that the change was made by a user.
 * @property {boolean} [updatedDescription] - Whether the issue's description was updated.
 * @property {string} [fromTitle] - What the title was changed from.
 * @property {string} [toTitle] - What the title was changed to.
 * @property {User} [fromAssignee] - The user from whom the issue was re-assigned from.
 * @property {User} [toAssignee] - The user to whom the issue was assigned to.
 * @property {number} [fromPriority] - What the priority was changed from.
 * @property {number} [toPriority] - What the priority was changed to.
 * @property {Team} [fromTeam] - The team from which the issue was moved from.
 * @property {Team} [toTeam] - The team to which the issue was moved to.
 * @property {Issue} [fromParent] - The previous parent of the issue.
 * @property {Issue} [toParent] - The new parent of the issue.
 * @property {WorkflowState} [fromState] - The previous workflow state of the issue.
 * @property {WorkflowState} [toState] - The new workflow state of the issue.
 * @property {Cycle} [fromCycle] - The previous cycle of the issue.
 * @property {Cycle} [toCycle] - The new cycle of the issue.
 * @property {Project} [fromProject] - The previous project of the issue.
 * @property {Project} [toProject] - The new project of the issue.
 * @property {number} [fromEstimate] - What the estimate was changed from.
 * @property {number} [toEstimate] - What the estimate was changed to.
 * @property {boolean} [archived] - Whether the issue was archived or un-archived.
 * @property {Array<string>} [addedLabelIds] - ID's of labels that were added.
 * @property {Array<string>} [removedLabelIds] - ID's of labels that were removed.
 * @property {Array<string>} [relationChanges] - Changed issue relationships.
 * @property {boolean} [autoClosed]
 * @property {boolean} [autoArchived]
 * @property {TimelessDateScalar} [fromDueDate] - What the due date was changed from
 * @property {TimelessDateScalar} [toDueDate] - What the due date was changed to
 */

/**
 * @typedef {Object} IntegrationResourceConnection
 * @property {Array<IntegrationResourceEdge>} edges
 * @property {Array<IntegrationResource>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} IntegrationResourceEdge
 * @property {IntegrationResource} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * An integration resource created by an external service.
 *
 * @typedef {Object} IntegrationResource
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} resourceType - The integration's type.
 * @property {string} resourceId - The external service resource ID.
 * @property {IntegrationResourceData} data - Detailed information about the external resource.
 * @property {Integration} integration - The integration that the resource is associated with.
 * @property {Issue} issue - The issue that the resource is associated with.
 * @property {PullRequestPayload} pullRequest - Pull request information for GitHub pull requests and GitLab merge requests.
 */

/**
 * Integration resource's payload
 *
 * @typedef {Object} IntegrationResourceData
 * @property {PullRequestPayload} [githubPullRequest] - The payload for an IntegrationResource of type 'githubPullRequest'
 * @property {PullRequestPayload} [gitlabMergeRequest] - The payload for an IntegrationResource of type 'gitlabMergeRequest'
 * @property {CommitPayload} [githubCommit] - The payload for an IntegrationResource of type 'githubCommit'
 * @property {SentryIssuePayload} [sentryIssue] - The payload for an IntegrationResource of type 'sentryIssue'
 */

/**
 * Pull request data
 *
 * @typedef {Object} PullRequestPayload
 * @property {string} status
 * @property {number} number
 * @property {string} url
 * @property {boolean} draft
 * @property {string} id
 * @property {string} title
 * @property {string} branch
 * @property {string} userId
 * @property {string} userLogin
 * @property {string} repoLogin
 * @property {string} repoName
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} closedAt
 * @property {string} mergedAt
 */

/**
 * GitHub's commit data
 *
 * @typedef {Object} CommitPayload
 * @property {string} id
 * @property {string} message
 * @property {string} timestamp
 * @property {string} url
 * @property {Array<string>} added
 * @property {Array<string>} removed
 * @property {Array<string>} modified
 */

/**
 * Sentry issue data
 *
 * @typedef {Object} SentryIssuePayload
 * @property {string} issueId - The Sentry identifier for the issue.
 * @property {string} webUrl - The description of the issue.
 * @property {string} actorType - The type of the actor who created the issue.
 * @property {number} actorId - The Sentry identifier of the actor who created the issue.
 * @property {string} actorName - The name of the Sentry actor who created this issue.
 * @property {number} projectId - The Sentry identifier of the project this issue belongs to.
 * @property {string} projectSlug - The slug of the project this issue belongs to.
 * @property {string} issueTitle - The title of the issue.
 * @property {string} shortId - The shortId of the issue.
 * @property {string} firstSeen - The date this issue was first seen.
 * @property {string} [firstVersion] - The name of the first release version this issue appeared on, if available.
 */

/**
 * @typedef {Object} IssueRelationConnection
 * @property {Array<IssueRelationEdge>} edges
 * @property {Array<IssueRelation>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} IssueRelationEdge
 * @property {IssueRelation} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * A relation between two issues.
 *
 * @typedef {Object} IssueRelation
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} type - The relationship of the issue with the related issue.
 * @property {Issue} issue - The issue whose relationship is being described.
 * @property {Issue} relatedIssue - The related issue.
 */

/**
 * @typedef {Object} OrganizationExistsPayload
 * @property {boolean} success - Whether the operation was successful.
 * @property {boolean} exists - Whether the organization exists.
 */

/**
 * Contains either the full serialized state of the application or delta packets that the requester can
 *   apply to the local data set in order to be up-to-date.
 *
 * @typedef {Object} SyncResponse
 * @property {string} [state] - The full state of the organization as a serialized JSON object.
 *     Mutually exclusive with the delta property
 * @property {string} [delta] - JSON serialized delta changes that the client can apply to its local state
 *     in order to catch up with the state of the world.
 * @property {string} [archive] - A JSON serialized collection of model objects loaded from the archive
 * @property {number} lastSyncId - The last sync id covered by the response.
 * @property {number} databaseVersion - The version of the remote database. Incremented by 1 for each migration run on the database.
 */

/**
 * Contains requested archived model objects.
 *
 * @typedef {Object} ArchiveResponse
 * @property {string} archive - A JSON serialized collection of model objects loaded from the archive
 * @property {number} totalCount - The total number of entities in the archive.
 * @property {number} databaseVersion - The version of the remote database. Incremented by 1 for each migration run on the database.
 */

/**
 * A user account. Super user required.
 *
 * @typedef {Object} UserAccountAdminPrivileged
 * @property {string} id - The models identifier.
 * @property {DateTime} createdAt - The time at which the model was created.
 * @property {DateTime} updatedAt - The time at which the model was updated.
 * @property {DateTime} [archivedAt] - The time at which the model was archived.
 * @property {string} [name] - The user's name.
 * @property {string} email - The user's email address.
 * @property {string} service - The authentication service used to create the account.
 * @property {Array<UserAdminPrivileged>} users
 */

/**
 * A user that has access to the the resources of an organization. Super user required.
 *
 * @typedef {Object} UserAdminPrivileged
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} name - The user's full name.
 * @property {string} displayName - The user's display (nick) name. Unique within each organization.
 * @property {string} email - The user's email address.
 * @property {string} [avatarUrl] - An URL to the user's avatar image.
 * @property {string} disableReason - Reason why is the account disabled.
 * @property {string} inviteHash - Unique hash for the user to be used in invite URLs.
 * @property {string} userAccountId
 * @property {UserSettings} settings - The settings of the user.
 * @property {DateTime} [lastSeen] - The last time the user was seen online. If null, the user is currently online.
 * @property {boolean} admin - Whether the user is an organization administrator.
 * @property {boolean} active - Whether the user account is active or disabled.
 * @property {IssueConnection} assignedIssues - Issues assigned to the user.
 * @property {IssueConnection} createdIssues - Issues created by the user.
 * @property {OrganizationAdminPrivileged} organization - Organization in which the user belongs to. Super user required.
 * @property {number} createdIssueCount - Number of issues created.
 * @property {TeamMembershipConnection} teamMemberships - Memberships associated with the user.
 */

/**
 * An organization. Super user required.
 *
 * @typedef {Object} OrganizationAdminPrivileged
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} name - The organization's name.
 * @property {string} urlKey - The organization's unique URL key.
 * @property {string} [logoUrl] - The organization's logo URL.
 * @property {boolean} upgradeThresholdExceeded
 * @property {number} periodUploadVolume - Rolling 30-day total upload volume for the organization, in megabytes.
 * @property {string} gitBranchFormat - How git branches are formatted. If null, default formatting will be used.
 * @property {boolean} gitLinkbackMessagesEnabled - Whether the Git integration linkback messages should be sent.
 * @property {boolean} projectMilestonesEnabled - Whether the organization is using project milestones.
 * @property {boolean} samlEnabled - Whether SAML authentication is enabled for organization.
 * @property {Array<string>} allowedAuthServices - Allowed authentication providers, empty array means all are allowed
 * @property {UserConnection} users - Users associated with the organization.
 * @property {TeamConnection} teams - Teams associated with the organization.
 * @property {MilestoneConnection} mildestones - Milestones associated with the organization.
 * @property {IntegrationConnection} integrations - Integrations associated with the organization.
 * @property {SubscriptionAdminPrivileged} [subscription] - The organization's subscription to a paid plan. Super user required.
 * @property {number} userCount - Number of active users in the organization.
 * @property {number} createdIssueCount - Number of issues in the organization.
 * @property {string} [stripeCustomerId] - The Stripe identifier for the organization.
 */

/**
 * The subscription of an organization. Super user required.
 *
 * @typedef {Object} SubscriptionAdminPrivileged
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} type - The subscription type.
 * @property {number} seats - The number of seats in the subscription.
 * @property {User} [creator] - The creator of the subscription.
 * @property {Organization} organization - The organization that the subscription is associated with.
 * @property {DateTime} [canceledAt] - The date the subscription was canceled, if any.
 * @property {string} stripeSubscriptionId - The Stripe identifier for the subscription.
 * @property {string} stripeStatus - The Stripe status for the subscription.
 */

/**
 * @typedef {Object} ApiKeyConnection
 * @property {Array<ApiKeyEdge>} edges
 * @property {Array<ApiKey>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} ApiKeyEdge
 * @property {ApiKey} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * An API key. Grants access to the user's resources.
 *
 * @typedef {Object} ApiKey
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} label - The label of the API key.
 */

/**
 * Public information of the OAuth application.
 *
 * @typedef {Object} Application
 * @property {string} clientId - OAuth application's client ID.
 * @property {string} name - Application name.
 * @property {string} [description] - Information about the application.
 * @property {string} developer - Name of the developer.
 * @property {string} developerUrl - Url of the developer (homepage or docs).
 * @property {string} [imageUrl] - Image of the application.
 */

/**
 * @typedef {Object} AuthResolverResponse
 * @property {string} id - User account ID.
 * @property {string} [token] - JWT token for authentication of the account.
 * @property {string} [email] - Email for the authenticated account.
 * @property {boolean} [allowDomainAccess] - Should the signup flow allow access for the domain.
 * @property {Array<User>} users - Users belonging to this account.
 * @property {Array<Organization>} [availableOrganizations] - Organizations this account has access to, but is not yet a member.
 */

/**
 * @typedef {Object} SsoUrlFromEmailResponse
 * @property {boolean} success - Whether the operation was successful.
 * @property {string} samlSsoUrl - SAML SSO sign-in URL.
 */

/**
 * @typedef {Object} BillingDetailsPayload
 * @property {boolean} success - Whether the operation was successful.
 * @property {string} [email] - The customer's email address the invoices are sent to.
 * @property {Array<Invoice>} invoices - List of invoices, if any.
 * @property {Card} [paymentMethod] - The payment method.
 */

/**
 * @typedef {Object} Invoice
 * @property {string} [url] - The URL at which the invoice can be viewed or paid.
 * @property {TimelessDateScalar} created - The creation date of the invoice.
 * @property {TimelessDateScalar} [dueDate] - The due date of the invoice.
 * @property {string} status - The status of the invoice.
 * @property {number} total - The invoice total, in cents.
 */

/**
 * @typedef {Object} Card
 * @property {string} brand - The brand of the card, e.g. Visa.
 * @property {string} last4 - The last four digits used to identify the card.
 */

/**
 * @typedef {Object} CollaborationDocumentUpdatePayload
 * @property {StepsResponse} [steps] - Document steps the client has not seen yet and need to rebase it's local steps on.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} StepsResponse
 * @property {number} version - Client's document version.
 * @property {Array<JSON>} [steps] - New document steps from the client.
 * @property {Array<string>} clientIds - List of client IDs for the document steps.
 */

/**
 * A custom view that has been saved by a user.
 *
 * @typedef {Object} CustomView
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} name - The name of the custom view.
 * @property {string} [description] - The description of the custom view.
 * @property {string} [icon] - The icon of the custom view.
 * @property {string} [color] - The color of the icon of the custom view.
 * @property {Organization} organization - The organization of the custom view.
 * @property {Team} [team] - The team associated with the custom view.
 * @property {User} creator - The user who created the custom view.
 * @property {JSONObject} filters - The filters applied to issues in the custom view.
 * @property {boolean} shared - Whether the custom view is shared with everyone in the organization.
 */

/**
 * @typedef {Object} CustomViewConnection
 * @property {Array<CustomViewEdge>} edges
 * @property {Array<CustomView>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} CustomViewEdge
 * @property {CustomView} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * A custom emoji.
 *
 * @typedef {Object} Emoji
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} name - The emoji's name.
 * @property {string} url - The emoji image URL.
 * @property {string} source - The source of the emoji.
 * @property {User} creator - The user who created the emoji.
 * @property {Organization} organization - The organization that the emoji belongs to.
 */

/**
 * @typedef {Object} EmojiConnection
 * @property {Array<EmojiEdge>} edges
 * @property {Array<Emoji>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} EmojiEdge
 * @property {Emoji} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * User favorites presented in the sidebar.
 *
 * @typedef {Object} Favorite
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} type - The type of the favorite.
 * @property {number} sortOrder - The order of the item in the favorites list.
 * @property {User} user - The owner of the favorite.
 * @property {Issue} [issue] - Favorited issue.
 * @property {Project} [project] - Favorited project.
 * @property {Project} [projectTeam] - Favorited project team.
 * @property {Cycle} [cycle] - Favorited cycle.
 * @property {IssueLabel} [label] - Favorited issue label.
 */

/**
 * @typedef {Object} FavoriteConnection
 * @property {Array<FavoriteEdge>} edges
 * @property {Array<Favorite>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} FavoriteEdge
 * @property {Favorite} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * @typedef {Object} FigmaEmbedPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {FigmaEmbed} [figmaEmbed] - Figma embed information.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * Object representing Figma preview information.
 *
 * @typedef {Object} FigmaEmbed
 * @property {string} name - Figma file name.
 * @property {DateTime} lastModified - Date when the file was updated at the time of embedding.
 * @property {string} [nodeName] - Node name.
 * @property {string} [url] - Figma screenshot URL.
 */

/**
 * @typedef {Object} InvitePagePayload
 * @property {InviteData} [inviteData] - Invite data.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} InviteData
 * @property {string} inviterName - The name of the inviter.
 * @property {Array<string>} avatarURLs - Avatar URLs for the invitees.
 * @property {Array<string>} teamNames - Team names for the invitees.
 * @property {Array<string>} teamIds - Team identifiers for the invitees.
 * @property {string} organizationName - The name of the organization the users were invited to.
 * @property {string} organizationDomain - The domain of the organization the users were invited to.
 * @property {string} [organizationLogoUrl] - The logo of the organization the users were invited to.
 * @property {number} userCount - The user count of the organization.
 */

/**
 * @typedef {Object} NotificationConnection
 * @property {Array<NotificationEdge>} edges
 * @property {Array<Notification>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} NotificationEdge
 * @property {Notification} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * A notification sent to a user.
 *
 * @typedef {Object} Notification
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} type - Notification type
 * @property {string} [reactionEmoji] - Name of the reaction emoji associated with the notification.
 * @property {DateTime} [readAt] - The time at when the user marked the notification as read. Null, if the the user hasn't read the notification
 * @property {DateTime} [emailedAt] - The time at when an email reminder for this notification was sent to the user. Null, if no email
 *     reminder has been sent.
 * @property {User} user - The recipient of the notification.
 * @property {Issue} issue - The issue that the notification is associated with.
 * @property {Team} team - The team which the notification is associated with.
 * @property {Comment} [comment] - The comment which the notification is associated with.
 */

/**
 * @typedef {Object} NotificationSubscriptionConnection
 * @property {Array<NotificationSubscriptionEdge>} edges
 * @property {Array<NotificationSubscription>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} NotificationSubscriptionEdge
 * @property {NotificationSubscription} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * Notification subscriptions for models.
 *
 * @typedef {Object} NotificationSubscription
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} type - The type of the subscription.
 * @property {User} user - The user associated with notification subscriptions.
 * @property {Team} [team] - Subscribed team.
 * @property {Project} [project] - Subscribed project.
 */

/**
 * @typedef {Object} OrganizationInviteConnection
 * @property {Array<OrganizationInviteEdge>} edges
 * @property {Array<OrganizationInvite>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} OrganizationInviteEdge
 * @property {OrganizationInvite} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * An invitation to the organization that has been sent via email.
 *
 * @typedef {Object} OrganizationInvite
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} email - The invitees email address.
 * @property {boolean} external - The invite was sent to external address.
 * @property {DateTime} [acceptedAt] - The time at which the invite was accepted. Null, if the invite hasn't been accepted
 * @property {DateTime} [expiresAt] - The time at which the invite will be expiring. Null, if the invite shouldn't expire
 * @property {User} inviter - The user who created the invitation.
 * @property {User} [invitee] - The user who has accepted the invite. Null, if the invite hasn't been accepted.
 * @property {Organization} organization - The organization that the invite is associated with.
 */

/**
 * @typedef {Object} PushSubscriptionPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * A reaction associated with a comment.
 *
 * @typedef {Object} Reaction
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} emoji - Name of the reaction's emoji.
 * @property {User} user - The user who reacted.
 * @property {Comment} comment - The comment that the reaction is associated with.
 */

/**
 * @typedef {Object} ReactionConnection
 * @property {Array<ReactionEdge>} edges
 * @property {Array<Reaction>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} ReactionEdge
 * @property {Reaction} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * @typedef {Object} ViewPreferencesConnection
 * @property {Array<ViewPreferencesEdge>} edges
 * @property {Array<ViewPreferences>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} ViewPreferencesEdge
 * @property {ViewPreferences} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * View preferences.
 *
 * @typedef {Object} ViewPreferences
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} type - The view preference type.
 * @property {string} viewType - The view type.
 */

/**
 * @typedef {Object} Mutation
 * @property {UserPayload} userUpdate - Updates a user. Only available to organization admins and the user themselves.
 * @property {UserAdminPayload} userPromoteAdmin - Makes user an admin. Can only be called by an admin.
 * @property {UserAdminPayload} userDemoteAdmin - Makes user a regular user. Can only be called by an admin.
 * @property {UserAdminPayload} userSuspend - Suspends a user. Can only be called by an admin.
 * @property {UserAdminPayload} userUnsuspend - Un-suspends a user. Can only be called by an admin.
 * @property {OrganizationPayload} organizationUpdate - Updates the user's organization.
 * @property {OrganizationDeletePayload} organizationDeleteChallenge - Get an organization's delete confirmation token. Administrator privileges required.
 * @property {OrganizationDeletePayload} organizationDelete - Delete's an organization. Administrator privileges required.
 * @property {OrganizationAccessPayload} organizationToggleAccess - Disable organization access. Superuser privileges required.
 * @property {OrganizationAccessPayload} organizationChangeEmailDomain - Change email domain for all users and accounts in the organization.
 * @property {OrganizationSamlConfigurePayload} organizationToggleSamlEnabled - Toggle SAML authentication on or off for an organization. Superuser privileges required.
 * @property {OrganizationSamlConfigurePayload} organizationConfigureSaml - Configure SAML authentication for an organization. Superuser privileges required.
 * @property {AdminCommandPayload} adminCommand - Executes admin command.
 * @property {AdminCommandPayload} adminBulkEmail - Sends out emails in bulk to our users.
 * @property {AdminCommandPayload} adminCreateStripeCustomer - Creates a stripe customer for an organization.
 * @property {AdminCommandPayload} adminScheduleAnonymousTask - Schedules a task. Currently only anonymous tasks without any parameters can be scheduled.
 * @property {UserAccountAdminPrivileged} adminUserAccountChangeEmail - Changes the email address for the user account and all of its users.
 * @property {EventPayload} eventCreate - [Deprecated] Creates a new event.
 * @property {ApiKeyPayload} apiKeyCreate - Creates a new API key.
 * @property {ArchivePayload} apiKeyDelete - Deletes an API key.
 * @property {EmailUserAccountAuthChallengeResponse} emailUserAccountAuthChallenge - Finds or creates a new user account by email and sends an email with token.
 * @property {AuthResolverResponse} emailTokenUserAccountAuth - Authenticates a user account via email and authentication token.
 * @property {AuthResolverResponse} googleUserAccountAuth - Authenticate user account through Google OAuth. This is the 2nd step of OAuth flow.
 * @property {CreateOrJoinOrganizationResponse} createOrganizationFromOnboarding - Creates an organization from onboarding.
 * @property {CreateOrJoinOrganizationResponse} joinOrganizationFromOnboarding - Join an organization from onboarding.
 * @property {CreateOrJoinOrganizationResponse} leaveOrganization - Leave an organization.
 * @property {BillingEmailPayload} billingEmailUpdate - Updates the billing email address for the customer.
 * @property {CollaborationDocumentUpdatePayload} collaborativeDocumentUpdate - Update collaborative document with client steps.
 * @property {CommentPayload} commentCreate - Creates a new comment.
 * @property {CommentPayload} commentUpdate - Updates a comment.
 * @property {ArchivePayload} commentDelete - Deletes a comment.
 * @property {ContactPayload} contactCreate - Saves user message.
 * @property {CustomViewPayload} customViewCreate - Creates a new custom view.
 * @property {CustomViewPayload} customViewUpdate - Updates a custom view.
 * @property {ArchivePayload} customViewDelete - Deletes a custom view.
 * @property {CyclePayload} cycleCreate - Creates a new cycle.
 * @property {CyclePayload} cycleUpdate - Updates a cycle.
 * @property {ArchivePayload} cycleArchive - Archives a cycle.
 * @property {DebugPayload} debugFailWithInternalError - Always fails with internal error. Used to debug logging.
 * @property {DebugPayload} debugFailWithWarning - Always logs an error to Sentry as warning. Used to debug logging.
 * @property {DebugPayload} debugCreateSAMLOrg - Create the SAML test organization in development.
 * @property {EmailUnsubscribePayload} emailUnsubscribe - Unsubscribes the user from one type of emails.
 * @property {EmojiPayload} emojiCreate - Creates a custom emoji.
 * @property {ArchivePayload} emojiDelete - Deletes an emoji.
 * @property {FavoritePayload} favoriteCreate - Creates a new favorite (project, cycle etc).
 * @property {FavoritePayload} favoriteUpdate - Updates a favorite.
 * @property {ArchivePayload} favoriteDelete - Deletes a favorite reference.
 * @property {FeedbackPayload} feedbackCreate - Saves user feedback.
 * @property {UploadPayload} fileUpload - XHR request payload to upload an images, video and other attachments directly to Linear's cloud storage.
 * @property {ImageUploadFromUrlPayload} imageUploadFromUrl - Upload an image from an URL to Linear.
 * @property {IntegrationPayload} integrationGithubConnect - Connects the organization with the GitHub App.
 * @property {IntegrationPayload} integrationGitlabConnect - Connects the organization with a GitLab Access Token.
 * @property {IntegrationPayload} integrationSlack - Integrates the organization with Slack.
 * @property {IntegrationPayload} integrationSlackPersonal - Integrates your personal notifications with Slack.
 * @property {IntegrationPayload} integrationSlackPost - Slack webhook integration.
 * @property {IntegrationPayload} integrationSlackProjectPost - Slack integration for project notifications.
 * @property {IntegrationPayload} integrationSlackImportEmojis - Imports custom emojis from your Slack workspace.
 * @property {IntegrationPayload} integrationFigma - Integrates the organization with Figma.
 * @property {IntegrationPayload} integrationGoogleSheets - Integrates the organization with Google Sheets.
 * @property {IntegrationPayload} refreshGoogleSheetsData - Manually update Google Sheets data.
 * @property {IntegrationPayload} integrationSentryConnect - Integrates the organization with Sentry.
 * @property {ArchivePayload} integrationDelete - Deletes an integration.
 * @property {ArchivePayload} integrationResourceArchive - Archives an integration resource.
 * @property {IssueLabelPayload} issueLabelCreate - Creates a new label.
 * @property {IssueLabelPayload} issueLabelUpdate - Updates an label.
 * @property {ArchivePayload} issueLabelArchive - Archives an issue label.
 * @property {IssueRelationPayload} issueRelationCreate - Creates a new issue relation.
 * @property {IssueRelationPayload} issueRelationUpdate - Updates an issue relation.
 * @property {ArchivePayload} issueRelationDelete - Deletes an issue relation.
 * @property {IssuePayload} issueCreate - Creates a new issue.
 * @property {IssuePayload} issueUpdate - Updates an issue.
 * @property {ArchivePayload} issueArchive - Archives an issue.
 * @property {ArchivePayload} issueUnarchive - Unarchives an issue.
 * @property {MilestonePayload} milestoneCreate - Creates a new milestone.
 * @property {MilestonePayload} milestoneUpdate - Updates a milestone.
 * @property {ArchivePayload} milestoneDelete - Deletes a milestone.
 * @property {NotificationPayload} notificationCreate - Creates a notification.
 * @property {NotificationPayload} notificationUpdate - Updates a notification.
 * @property {ArchivePayload} notificationDelete - [Deprecated] Deletes a notification.
 * @property {ArchivePayload} notificationArchive - Archives a notification.
 * @property {ArchivePayload} notificationUnarchive - Unarchives a notification.
 * @property {NotificationSubscriptionPayload} notificationSubscriptionCreate - Creates a new notification subscription for a team or a project.
 * @property {ArchivePayload} notificationSubscriptionDelete - Deletes a notification subscription reference.
 * @property {OauthClientPayload} oauthClientCreate - Creates a new OAuth client.
 * @property {OauthClientPayload} oauthClientUpdate - Updates an OAuth client.
 * @property {ArchivePayload} oauthClientArchive - Archives an OAuth client.
 * @property {OrganizationDomainPayload} organizationDomainVerify - Verifies a domain to be added to an organization.
 * @property {OrganizationDomainPayload} organizationDomainCreate - Adds a domain to be allowed for an organization.
 * @property {ArchivePayload} organizationDomainDelete - Deletes a domain.
 * @property {OrganizationInvitePayload} organizationInviteCreate - Creates a new organization invite.
 * @property {ArchivePayload} resentOrganizationInvite - Re-send an organization invite.
 * @property {ArchivePayload} organizationInviteDelete - Deletes an organization invite.
 * @property {ProjectLinkPayload} projectLinkCreate - Creates a new project link.
 * @property {ArchivePayload} projectLinkDelete - Deletes a project link.
 * @property {ProjectPayload} projectCreate - Creates a new project.
 * @property {ProjectPayload} projectUpdate - Updates a project.
 * @property {ArchivePayload} projectArchive - Archives a project.
 * @property {PushSubscriptionPayload} pushSubscriptionCreate - Creates a push subscription.
 * @property {PushSubscriptionPayload} pushSubscriptionDelete - Deletes a push subscription.
 * @property {ReactionPayload} reactionCreate - Creates a new reaction.
 * @property {ArchivePayload} reactionDelete - Deletes a reaction.
 * @property {CreateCsvExportReportPayload} createCsvExportReport - Create CSV export report for the organization.
 * @property {SubscriptionSessionPayload} subscriptionSessionCreate - Creates a subscription session. Used internally to integrate with Stripe.
 * @property {SubscriptionSessionPayload} subscriptionUpdateSessionCreate - Creates a subscription update session. Used internally to integrate with Stripe.
 * @property {SubscriptionPayload} subscriptionUpdate - Updates a subscription.
 * @property {ArchivePayload} subscriptionArchive - Archives a subscription.
 * @property {TeamMembershipPayload} teamMembershipCreate - Creates a new team membership.
 * @property {ArchivePayload} teamMembershipDelete - Deletes a team membership.
 * @property {TeamPayload} teamCreate - Creates a new team. The user who creates the team will automatically be added as a member to the newly created team.
 * @property {TeamPayload} teamUpdate - Updates a team.
 * @property {ArchivePayload} teamArchive - Archives a team.
 * @property {ArchivePayload} teamDelete - Deletes a team.
 * @property {TemplatePayload} templateCreate - Creates a new template.
 * @property {TemplatePayload} templateUpdate - Updates an existing template.
 * @property {ArchivePayload} templateDelete - Deletes a template.
 * @property {UserSettingsPayload} userSettingsUpdate - Updates the user's settings.
 * @property {UserSettingsFlagPayload} userSettingsFlagIncrement - [Deprecated] Updates a user's settings flag.
 * @property {UserSettingsFlagsResetPayload} userSettingsFlagsReset - Resets user's setting flags.
 * @property {UserSettingsFlagPayload} userFlagUpdate - Updates a user's settings flag.
 * @property {UserSubscribeToNewsletterPayload} userSubscribeToNewsletter - Subscribes user to changelog newsletter.
 * @property {ViewPreferencesPayload} viewPreferencesCreate - Creates a new ViewPreferences object.
 * @property {ViewPreferencesPayload} viewPreferencesUpdate - Updates an existing ViewPreferences object.
 * @property {ArchivePayload} viewPreferencesDelete - Deletes a ViewPreferences.
 * @property {WebhookPayload} webhookCreate - Creates a new webhook.
 * @property {WebhookPayload} webhookUpdate - Updates an existing Webhook.
 * @property {ArchivePayload} webhookDelete - Deletes a Webhook.
 * @property {WorkflowStatePayload} workflowStateCreate - Creates a new state, adding it to the workflow of a team.
 * @property {WorkflowStatePayload} workflowStateUpdate - Updates a state.
 * @property {ArchivePayload} workflowStateArchive - Archives a state. Only states with issues that have all been archived can be archived.
 */

/**
 * @typedef {Object} UpdateUserInput
 * @property {string} [name] - The name of the user.
 * @property {string} [displayName] - The display name of the user.
 * @property {string} [avatarUrl] - The avatar image URL of the user.
 * @property {boolean} [active] - Whether the user account is active.
 * @property {string} [disableReason] - Reason for deactivation.
 * @property {boolean} [admin] - Whether the user account has admin privileges.
 */

/**
 * @typedef {Object} UserPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {User} [user] - The user that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} UserAdminPayload
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} UpdateOrganizationInput
 * @property {string} [name] - The name of the organization.
 * @property {string} [logoUrl] - The logo of the organization.
 * @property {string} [urlKey] - The URL key of the organization.
 * @property {string} [gitBranchFormat] - How git branches are formatted. If null, default formatting will be used.
 * @property {boolean} [gitLinkbackMessagesEnabled] - Whether the Git integration linkback messages should be sent.
 * @property {boolean} [projectMilestonesEnabled] - Whether the organization is using project milestones.
 * @property {JSONObject} [linearPreviewFlags] - Linear Preview feature flags
 */

/**
 * @typedef {Object} OrganizationPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Organization} [organization] - The organization that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} OrganizationDeletePayload
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} DeleteOrganizationInput
 * @property {string} deletionCode - The deletion code to confirm operation.
 */

/**
 * @typedef {Object} OrganizationAccessPayload
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} OrganizationSamlConfigurePayload
 * @property {boolean} success - Whether the operation was successful.
 * @property {SamlConfiguration} samlConfiguration - Organization's current SAML configuration.
 * @property {boolean} samlEnabled - Whether SAML is enabled for the organization.
 */

/**
 * The integration resource's settings
 *
 * @typedef {Object} SamlConfiguration
 * @property {string} [ssoSigningCert] - X.509 Signing Certificate in string form.
 * @property {string} [ssoEndpoint] - Sign in endpoint URL for the identity provider.
 * @property {string} [ssoBinding] - Binding method for authentication call. Can be either `post` (default) or `redirect`.
 * @property {string} [ssoSignAlgo] - The algorithm of the Signing Certificate. Can be one of `sha1`, `sha256` (default), or `sha512`.
 * @property {Array<string>} [allowedDomains] - List of allowed email domains for SAML authentication.
 */

/**
 * @typedef {Object} SamlConfigurationInput
 * @property {string} [ssoSigningCert] - X.509 Signing Certificate in string form.
 * @property {string} [ssoEndpoint] - Sign in endpoint URL for the identity provider.
 * @property {string} [ssoBinding] - Binding method for authentication call. Can be either `post` (default) or `redirect`.
 * @property {string} [ssoSignAlgo] - The algorithm of the Signing Certificate. Can be one of `sha1`, `sha256` (default), or `sha512`.
 * @property {Array<string>} [allowedDomains] - List of allowed email domains for SAML authentication.
 */

/**
 * @typedef {Object} AdminCommandInput
 * @property {string} cmd - Command to perform.
 * @property {string} [value] - The value of the command.
 */

/**
 * @typedef {Object} AdminCommandPayload
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} EventCreateInput
 * @property {string} category - The category of the event to create.
 * @property {string} subject - The subject of the event.
 * @property {string} [targetId] - The target identifier of the event.
 * @property {number} [value] - The value of the event.
 * @property {JSON} [data] - Additional data of the event, encoded as JSON.
 */

/**
 * @typedef {Object} EventPayload
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} ApiKeyCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} label - The label for the API key.
 * @property {string} key - The API key value (format: /^[a-zA-Z0-9]{40}$/).
 */

/**
 * @typedef {Object} ApiKeyPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {ApiKey} apiKey - The API key that was created.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} ArchivePayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} EmailUserAccountAuthChallengeInput
 * @property {string} email - The email for which to generate the magic login code.
 * @property {boolean} [isDesktop] - Whether the login was requested from the desktop app.
 * @property {string} [signupCode] - Signup code.
 */

/**
 * @typedef {Object} EmailUserAccountAuthChallengeResponse
 * @property {boolean} success - Whether the operation was successful.
 * @property {string} authType - Supported challenge for this user account. Can be either verificationCode or password.
 */

/**
 * @typedef {Object} EmailUserAccountAuthInput
 * @property {string} email - The email which to login via the magic login code.
 * @property {string} token - The magic login code.
 * @property {string} timezone - The timezone of the user's browser.
 * @property {Array<string>} [teamIdsToJoin] - The identifiers of the teams to auto-join.
 */

/**
 * @typedef {Object} GoogleUserAccountAuthInput
 * @property {string} code - Code returned from Google's OAuth flow.
 * @property {string} [redirectUri] - The URI to redirect the user to.
 * @property {string} timezone - The timezone of the user's browser.
 * @property {Array<string>} [teamIdsToJoin] - The identifiers of the teams to auto-join.
 * @property {string} [signupCode] - Signup code.
 */

/**
 * @typedef {Object} OnboardingCustomerSurvey
 * @property {string} [companyRole]
 * @property {string} [companySize]
 */

/**
 * @typedef {Object} CreateOrganizationInput
 * @property {string} name - The name of the organization.
 * @property {string} urlKey - The URL key of the organization.
 * @property {boolean} [domainAccess] - Whether the organization should allow email domain access.
 * @property {string} [timezone] - The timezone of the organization, passed in by client.
 */

/**
 * @typedef {Object} CreateOrJoinOrganizationResponse
 * @property {Organization} organization
 * @property {User} user
 */

/**
 * @typedef {Object} JoinOrganizationInput
 * @property {string} organizationId - The identifier of the organization.
 */

/**
 * @typedef {Object} BillingEmailUpdateInput
 * @property {string} email - The email address to which to send invoices.
 */

/**
 * @typedef {Object} BillingEmailPayload
 * @property {boolean} success - Whether the operation was successful.
 * @property {string} [email] - The customer's email address the invoices are sent to.
 */

/**
 * @typedef {Object} CollaborationDocumentUpdateInput
 * @property {string} issueId - Document identifier.
 * @property {number} version - Client's document version number.
 * @property {Array<JSON>} steps - New document steps from the client.
 * @property {string} clientId - Client identifier.
 */

/**
 * @typedef {Object} CommentCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} [body] - The comment content in markdown format.
 * @property {JSON} [bodyData] - The comment content as a Prosemirror document.
 * @property {string} issueId - The issue to associate the comment with.
 */

/**
 * @typedef {Object} CommentPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Comment} comment - The comment that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} CommentUpdateInput
 * @property {string} [body] - The comment content.
 * @property {JSON} [bodyData] - The comment content as a Prosemirror document.
 */

/**
 * @typedef {Object} ContactCreateInput
 * @property {string} type - The type of support contact.
 * @property {string} message - The message the user sent.
 * @property {string} [operatingSystem] - User's operating system.
 * @property {string} [browser] - User's browser information.
 * @property {string} [device] - User's device information.
 * @property {number} [disappointmentRating] - How disappointed the user would be if they could no longer use Linear.
 */

/**
 * @typedef {Object} ContactPayload
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} CustomViewCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} name - The name of the custom view.
 * @property {string} [description] - The description of the custom view.
 * @property {string} [icon] - The icon of the custom view.
 * @property {string} [color] - The color of the icon of the custom view.
 * @property {string} [teamId] - The id of the team associated with the custom view.
 * @property {JSONObject} [filters] - The filters applied to issues in the custom view.
 * @property {boolean} [shared] - Whether the custom view is shared with everyone in the organization.
 */

/**
 * @typedef {Object} CustomViewPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {CustomView} customView - The custom view that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} CustomViewUpdateInput
 * @property {string} [name] - The name of the custom view.
 * @property {string} [description] - The description of the custom view.
 * @property {string} [icon] - The icon of the custom view.
 * @property {string} [color] - The color of the icon of the custom view.
 * @property {string} [teamId] - The id of the team associated with the custom view.
 * @property {JSONObject} [filters] - The filters applied to issues in the custom view.
 * @property {boolean} [shared] - Whether the custom view is shared with everyone in the organization.
 */

/**
 * @typedef {Object} CycleCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} [name] - The custom name of the cycle.
 * @property {string} teamId - The team to associate the cycle with.
 * @property {DateTime} startsAt - The start date of the cycle.
 * @property {DateTime} endsAt - The end date of the cycle.
 * @property {DateTime} [completedAt] - The completion time of the cycle. If null, the cycle hasn't been completed.
 */

/**
 * @typedef {Object} CyclePayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Cycle} [cycle] - The Cycle that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} CycleUpdateInput
 * @property {string} [name] - The custom name of the cycle.
 * @property {DateTime} [startsAt] - The start date of the cycle.
 * @property {DateTime} [endsAt] - The end date of the cycle.
 * @property {DateTime} [completedAt] - The end date of the cycle.
 */

/**
 * @typedef {Object} DebugPayload
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} EmailUnsubscribeInput
 * @property {string} type - Email type to unsubscribed from.
 * @property {string} token - The user's email validation token.
 * @property {string} userId - The identifier of the user.
 */

/**
 * @typedef {Object} EmailUnsubscribePayload
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} EmojiCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} name - The name of the custom emoji.
 * @property {string} url - The URL for the emoji.
 */

/**
 * @typedef {Object} EmojiPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Emoji} emoji - The emoji that was created.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} FavoriteCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} [issueId] - The identifier of the issue to favorite.
 * @property {string} [projectId] - The identifier of the project to favorite.
 * @property {string} [projectTeamId] - The identifier of the project team to favorite.
 * @property {string} [cycleId] - The identifier of the cycle to favorite.
 * @property {string} [customViewId] - The identifier of the custom view to favorite.
 * @property {string} [labelId] - The identifier of the label to favorite.
 * @property {number} [sortOrder] - The position of the item in the favorites list.
 */

/**
 * @typedef {Object} FavoritePayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Favorite} favorite - The object that was added as a favorite.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} FavoriteUpdateInput
 * @property {number} [sortOrder] - The position of the item in the favorites list.
 */

/**
 * @typedef {Object} FeedbackCreateInput
 * @property {string} feedback - The feedback the user sent.
 * @property {number} disappointmentRating - How disappointed the user would be if he/she could no longer use Linear.
 */

/**
 * @typedef {Object} FeedbackPayload
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} UploadPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {UploadFile} [uploadFile] - Object describing the file to be uploaded.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * Object representing Google Cloud upload policy, plus additional data.
 *
 * @typedef {Object} UploadFile
 * @property {string} filename - The filename.
 * @property {string} contentType - The content type.
 * @property {number} size - The size of the uploaded file.
 * @property {string} uploadUrl - The signed URL the for the uploaded file. (assigned automatically)
 * @property {string} assetUrl - The asset URL for the uploaded file. (assigned automatically)
 * @property {JSON} [metaData]
 * @property {Array<UploadFileHeader>} headers
 */

/**
 * @typedef {Object} UploadFileHeader
 * @property {string} key - Upload file header key.
 * @property {string} value - Upload file header value.
 */

/**
 * @typedef {Object} ImageUploadFromUrlPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {string} [url] - The URL containing the image.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} IntegrationPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Integration} [integration] - The integration that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} IssueLabelCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} name - The name of the label.
 * @property {string} [description] - The description of the label.
 * @property {string} [color] - The color of the label.
 * @property {string} teamId - The team associated with the label.
 */

/**
 * @typedef {Object} IssueLabelPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {IssueLabel} issueLabel - The label that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} IssueLabelUpdateInput
 * @property {string} [name] - The name of the label.
 * @property {string} [description] - The description of the label.
 * @property {string} [color] - The color of the label.
 */

/**
 * @typedef {Object} IssueRelationCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {IssueRelationType} type - The type of relation of the issue to the related issue.
 * @property {string} issueId - The identifier of the issue that is related to another issue.
 * @property {string} relatedIssueId - The identifier of the related issue.
 */

/**
 * The type of the issue relation.
 *
 * @typedef {("blocks"|"duplicate"|"related")} IssueRelationType
 */

/**
 * @typedef {Object} IssueRelationPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {IssueRelation} issueRelation - The issue relation that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} IssueRelationUpdateInput
 * @property {string} [type] - The type of relation of the issue to the related issue.
 * @property {string} [issueId] - The identifier of the issue that is related to another issue.
 * @property {string} [relatedIssueId] - The identifier of the related issue.
 */

/**
 * @typedef {Object} IssueCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} title - The title of the issue.
 * @property {string} [description] - The issue description in markdown format.
 * @property {JSON} [descriptionData] - The issue description as a Prosemirror document.
 * @property {string} [assigneeId] - The identifier of the user to assign the issue to.
 * @property {string} [parentId] - The identifier of the parent issue.
 * @property {number} [priority] - The priority of the issue.
 * @property {number} [estimate] - The estimated complexity of the issue.
 * @property {Array<string>} [subscriberIds] - The identifiers of the users subscribing to this ticket.
 * @property {Array<string>} [labelIds] - The identifiers of the issue labels associated with this ticket.
 * @property {string} teamId - The identifier or key of the team associated with the issue.
 * @property {string} [cycleId] - The cycle associated with the issue.
 * @property {string} [projectId] - The project associated with the issue.
 * @property {string} [stateId] - The team state of the issue.
 * @property {number} [boardOrder] - The position of the item in its column on the kanban board.
 * @property {TimelessDateScalar} [dueDate] - The date at which the issue is due.
 */

/**
 * @typedef {Object} IssuePayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Issue} [issue] - The issue that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} IssueUpdateInput
 * @property {string} [title] - The issue title.
 * @property {string} [description] - The issue description in markdown format.
 * @property {JSON} [descriptionData] - The issue description as a Prosemirror document.
 * @property {string} [assigneeId] - The identifier of the user to assign the issue to.
 * @property {string} [parentId] - The identifier of the parent issue.
 * @property {number} [priority] - The priority of the issue.
 * @property {number} [estimate] - The estimated complexity of the issue.
 * @property {Array<string>} [subscriberIds] - The identifiers of the users subscribing to this ticket.
 * @property {Array<string>} [labelIds] - The identifiers of the issue labels associated with this ticket.
 * @property {string} [teamId] - The identifier or key of the team associated with the issue.
 * @property {string} [cycleId] - The cycle associated with the issue.
 * @property {string} [projectId] - The project associated with the issue.
 * @property {string} [stateId] - The team state of the issue.
 * @property {number} [boardOrder] - The position of the item in its column on the board.
 * @property {number} [documentVersion] - [DEPRECATED] Document version for backwards compatibility.
 * @property {TimelessDateScalar} [dueDate] - The date at which the issue is due.
 */

/**
 * @typedef {Object} MilestoneCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} name - The name of the milestone.
 * @property {number} [sortOrder] - The sort order of the milestone.
 */

/**
 * @typedef {Object} MilestonePayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Milestone} [milestone] - The milesteone that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} MilestoneUpdateInput
 * @property {string} [name] - The name of the milestone.
 * @property {number} [sortOrder] - The sort order of the milestone.
 */

/**
 * @typedef {Object} NotificationUpdateInput
 * @property {DateTime} [readAt] - The time when notification was marked as read.
 */

/**
 * @typedef {Object} NotificationPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Notification} notification - The notification that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} NotificationSubscriptionCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} [teamId] - The identifier of the team to subscribe to.
 * @property {string} [projectId] - The identifier of the project to subscribe to.
 */

/**
 * @typedef {Object} NotificationSubscriptionPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {NotificationSubscription} notificationSubscription - The notification subscription that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} OauthClientCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} name - The application's name.
 * @property {string} [description] - User facing description of the application.
 * @property {string} developer - Name of the developer of the application.
 * @property {string} developerUrl - Url of the developer (homepage or docs).
 * @property {Array<string>} redirectUris - List of allowed redirect URIs for the application.
 * @property {string} [imageUrl] - URL for the app icon.
 */

/**
 * @typedef {Object} OauthClientPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {OauthClient} oauthClient - The OAuth client application that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * OAuth2 client application
 *
 * @typedef {Object} OauthClient
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} clientId - OAuth application's client ID.
 * @property {string} name - OAuth application's client name.
 * @property {string} description - Information about the application.
 * @property {string} developer - Name of the developer.
 * @property {string} developerUrl - Url of the developer.
 * @property {string} imageUrl - Image of the application.
 * @property {string} clientSecret - OAuth application's client secret.
 * @property {Array<string>} redirectUris - List of allowed redirect URIs for the application.
 */

/**
 * @typedef {Object} OauthClientUpdateInput
 * @property {string} [name] - The application's name.
 * @property {string} [description] - User facing description of the application.
 * @property {string} [developer] - Name of the developer of the application.
 * @property {string} [developerUrl] - URL of the developer (homepage or docs).
 * @property {Array<string>} [redirectUris] - List of allowed redirect URIs for the application.
 * @property {string} [imageUrl] - URL for the app icon.
 */

/**
 * @typedef {Object} OrganizationDomainVerificationInput
 * @property {string} organizationDomainId - The identifier of the domain being verified.
 * @property {string} verificationCode - The verification code sent via email.
 */

/**
 * @typedef {Object} OrganizationDomainPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {OrganizationDomain} organizationDomain - The organization domain that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * Defines the use of a domain by an organization.
 *
 * @typedef {Object} OrganizationDomain
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {string} name - Domain name
 * @property {boolean} verified - Is this domain verified
 * @property {User} [creator] - The user who added the domain.
 * @property {string} [verificationEmail] - E-mail used to verify this domain
 */

/**
 * @typedef {Object} OrganizationDomainCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} name - The domain name to add.
 * @property {string} verificationEmail - The email address to which to send the verification code.
 * @property {boolean} verified - Is the domain verified.
 */

/**
 * @typedef {Object} OrganizationInviteCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} email - The email of the invitee.
 * @property {string} [message] - The message to send to the invitee.
 * @property {Array<string>} [teamIds] - The teams that the user has been invited to.
 */

/**
 * @typedef {Object} OrganizationInvitePayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {OrganizationInvite} organizationInvite - The organization invite that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} ProjectLinkCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} url - The URL of the link.
 * @property {string} label - The label for the link.
 * @property {string} projectId - Related project for the link.
 */

/**
 * @typedef {Object} ProjectLinkPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {ProjectLink} projectLink - The project that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} ProjectCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} name - The name of the project.
 * @property {string} [icon] - The icon of the project.
 * @property {string} [color] - The color of the project.
 * @property {string} [state] - The state of the project.
 * @property {string} [description] - The description for the project.
 * @property {string} [milestoneId] - The identifier of the milestone to associate the project with.
 * @property {Array<string>} teamIds - The identifiers of the teams this project is associated with.
 * @property {string} [leadId] - The identifier of the project lead.
 * @property {Array<string>} [memberIds] - The identifiers of the members of this project.
 * @property {TimelessDateScalar} [targetDate] - The planned target date of the project.
 * @property {number} [sortOrder] - The sort order for the project within its milestone.
 */

/**
 * @typedef {Object} ProjectPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Project} [project] - The project that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} ProjectUpdateInput
 * @property {string} [state] - The state of the project.
 * @property {string} [name] - The name of the project.
 * @property {string} [description] - The description for the project.
 * @property {string} [milestoneId] - The identifier of the milestone to associate the project with.
 * @property {string} [icon] - The icon of the project.
 * @property {string} [color] - The color of the project.
 * @property {Array<string>} [teamIds] - The identifiers of the teams this project is associated with.
 * @property {string} [leadId] - The identifier of the project lead.
 * @property {Array<string>} [memberIds] - The identifiers of the members of this project.
 * @property {TimelessDateScalar} [targetDate] - The planned target date of the project.
 * @property {boolean} [slackNewIssue] - Whether to send new issue notifications to Slack.
 * @property {boolean} [slackIssueComments] - Whether to send new issue comment notifications to Slack.
 * @property {boolean} [slackIssueStatuses] - Whether to send issue status update notifications to Slack.
 * @property {number} [sortOrder] - The sort order for the project within its milestone.
 */

/**
 * @typedef {Object} PushSubscriptionCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} userId - The user identifier of the subscription.
 * @property {string} data - The data of the subscription in stringified JSON format.
 */

/**
 * @typedef {Object} ReactionCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one
 * @property {string} [emoji] - The emoji the user reacted with.
 * @property {string} commentId - The comment to associate the reaction with.
 */

/**
 * @typedef {Object} ReactionPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Reaction} reaction
 * @property {boolean} success
 */

/**
 * @typedef {Object} CreateCsvExportReportPayload
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} SubscriptionSessionPayload
 * @property {string} [session] - The subscription session that was created or updated.
 */

/**
 * @typedef {Object} SubscriptionUpdateInput
 * @property {DateTime} [canceledAt] - The date the subscription was set to cancel, if any.
 */

/**
 * @typedef {Object} SubscriptionPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Subscription} subscription - The subscription entity being mutated.
 * @property {DateTime} [canceledAt] - The date the subscription was set to cancel at the end of the billing period, if any.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} TeamMembershipCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} userId - The identifier of the user associated with the membership.
 * @property {string} teamId - The identifier of the team associated with the membership.
 */

/**
 * @typedef {Object} TeamMembershipPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {TeamMembership} [teamMembership] - The team membership that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} TeamCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} name - The name of the team.
 * @property {string} [description] - The description of the team.
 * @property {string} [key] - The key of the team. If not given, rc key will be generated based on the name of the team.
 * @property {string} [organizationId] - The organization associated with the team.
 * @property {boolean} [cyclesEnabled] - Whether the team uses cycles.
 * @property {number} [cycleStartDay] - The day of the week that a new cycle starts.
 * @property {number} [cycleDuration] - The duration of each cycle in weeks.
 * @property {number} [cycleCooldownTime] - The cooldown time after each cycle in weeks.
 * @property {boolean} [cycleIssueAutoAssignStarted] - Auto assign started issues to current active cycle setting.
 * @property {boolean} [cycleIssueAutoAssignCompleted] - Auto assign completed issues to current active cycle setting.
 * @property {boolean} [cycleLockToActive] - Only allow issues issues with cycles in Active Issues.
 * @property {number} [upcomingCycleCount] - How many upcoming cycles to create.
 * @property {string} [timezone] - The timezone of the team.
 * @property {string} [issueEstimationType] - The issue estimation type to use.
 * @property {boolean} [issueEstimationAllowZero] - Whether to allow zeros in issues estimates.
 * @property {boolean} [issueEstimationExtended] - Whether to add additional points to the estimate scale.
 * @property {number} [defaultIssueEstimate] - What to use as an default estimate for unestimated issues.
 * @property {boolean} [groupIssueHistory] - Whether to group recent issue history entries.
 * @property {string} [defaultTemplateForMembersId] - The identifier of the default template for members of this team.
 * @property {string} [defaultTemplateForNonMembersId] - The identifier of the default template for non-members of this team.
 * @property {number} [autoClosePeriod] - Period after which issues are automatically closed, in months.
 * @property {string} [autoCloseStateId] - The canceled workflow state which auto closed issues will be set to.
 * @property {number} [autoArchivePeriod] - Period after which closed and completed issues are automatically archived, in months. 0 means disabled.
 * @property {string} [markedAsDuplicateWorkflowStateId] - The workflow state into which issues are moved when they are marked as a duplicate of another issue.
 */

/**
 * @typedef {Object} TeamPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Team} [team] - The team that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} TeamUpdateInput
 * @property {string} [name] - The name of the team.
 * @property {string} [description] - The description of the team.
 * @property {string} [key] - The key of the team.
 * @property {boolean} [cyclesEnabled] - Whether the team uses cycles.
 * @property {number} [cycleStartDay] - The day of the week that a new cycle starts.
 * @property {number} [cycleDuration] - The duration of each cycle in weeks.
 * @property {number} [cycleCooldownTime] - The cooldown time after each cycle in weeks.
 * @property {boolean} [cycleIssueAutoAssignStarted] - Auto assign started issues to current active cycle setting.
 * @property {boolean} [cycleIssueAutoAssignCompleted] - Auto assign completed issues to current active cycle setting.
 * @property {boolean} [cycleLockToActive] - Only allow issues with cycles in Active Issues.
 * @property {number} [upcomingCycleCount] - How many upcoming cycles to create.
 * @property {string} [timezone] - The timezone of the team.
 * @property {string} [issueEstimationType] - The issue estimation type to use.
 * @property {boolean} [issueEstimationAllowZero] - Whether to allow zeros in issues estimates.
 * @property {boolean} [issueEstimationExtended] - Whether to add additional points to the estimate scale.
 * @property {number} [defaultIssueEstimate] - What to use as an default estimate for unestimated issues.
 * @property {string} [draftWorkflowStateId] - The workflow state into which issues are moved when a draft PR has been opened.
 * @property {string} [startWorkflowStateId] - The workflow state into which issues are moved when a PR has been opened.
 * @property {string} [reviewWorkflowStateId] - The workflow state into which issues are moved when a review has been requested for the PR.
 * @property {string} [mergeWorkflowStateId] - The workflow state into which issues are moved when a PR has been merged.
 * @property {boolean} [slackNewIssue] - Whether to send new issue notifications to Slack.
 * @property {boolean} [slackIssueComments] - Whether to send new issue comment notifications to Slack.
 * @property {boolean} [slackIssueStatuses] - Whether to send issue status update notifications to Slack.
 * @property {boolean} [groupIssueHistory] - Whether to group recent issue history entries.
 * @property {string} [defaultTemplateForMembersId] - The identifier of the default template for members of this team.
 * @property {string} [defaultTemplateForNonMembersId] - The identifier of the default template for non-members of this team.
 * @property {number} [autoClosePeriod] - Period after which issues are automatically closed, in months.
 * @property {string} [autoCloseStateId] - The canceled workflow state which auto closed issues will be set to.
 * @property {number} [autoArchivePeriod] - Period after which closed and completed issues are automatically archived, in months.
 * @property {string} [markedAsDuplicateWorkflowStateId] - The workflow state into which issues are moved when they are marked as a duplicate of another issue.
 */

/**
 * @typedef {Object} TemplateCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} type - The template type, e.g. 'issue'.
 * @property {string} teamId - The identifier or key of the team associated with the template.
 * @property {string} name - The template name.
 * @property {string} [description] - The template description.
 * @property {JSON} templateData - The template data as JSON encoded attributes of the type of entity, such as an issue.
 */

/**
 * @typedef {Object} TemplatePayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Template} template - The template that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} TemplateUpdateInput
 * @property {string} [name] - The template name.
 * @property {string} [description] - The template description.
 * @property {JSON} [templateData] - The template data as JSON encoded attributes of the type of entity, such as an issue.
 */

/**
 * @typedef {Object} UserSettingsUpdateInput
 * @property {string} [settings] - The user's settings.
 * @property {Array<string>} [unsubscribedFrom] - The types of emails the user has unsubscribed from.
 * @property {JSONObject} [notificationPreferences] - The user's notification preferences.
 */

/**
 * @typedef {Object} UserSettingsPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {UserSettings} userSettings - The user's settings.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} UserSettingsFlagPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {string} flag - The flag key which was updated.
 * @property {number} value - The flag value after update.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} UserSettingsFlagsResetPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * Operations that can be applied to UserFlagType
 *
 * @typedef {("incr"|"decr"|"clear"|"lock")} UserFlagUpdateOperation
 */

/**
 * The types of flags that the user can have.
 *
 * @typedef {("completedOnboarding"|"desktopInstalled"|"desktopDownloadToastDismissed"|"emptyBacklogDismissed"|"emptyCustomViewsDismissed"|"emptyActiveIssuesDismissed"|"emptyMyIssuesDismissed"|"cycleWelcomeDismissed"|"projectWelcomeDismissed"|"analyticsWelcomeDismissed"|"figmaPromptDismissed"|"migrateThemePreference"|"listSelectionTip"|"clearedAllNotifications")} UserFlagType
 */

/**
 * @typedef {Object} UserSubscribeToNewsletterPayload
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} ViewPreferencesCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {ViewPreferencesType} type - The type of view preferences (either user or organization level preferences).
 * @property {ViewType} viewType - The view type of the view preferences are associated with.
 * @property {JSONObject} preferences - View preferences object.
 * @property {string} [teamId] - The team these view preferences are associated with.
 * @property {string} [projectId] - The project these view preferences are associated with.
 * @property {string} [labelId] - The label these view preferences are associated with.
 * @property {string} [cycleId] - The cycle these view preferences are associated with.
 * @property {string} [customViewId] - The custom view these view preferences are associated with.
 */

/**
 * The type of view preferences (either user or organization level preferences).
 *
 * @typedef {("organization"|"user")} ViewPreferencesType
 */

/**
 * The client view this custom view is targeting.
 *
 * @typedef {("inbox"|"myIssues"|"board"|"completedCycle"|"cycle"|"project"|"label"|"activeIssues"|"backlog"|"allIssues"|"customView")} ViewType
 */

/**
 * @typedef {Object} ViewPreferencesPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {ViewPreferences} viewPreferences - The view preferences entity being mutated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} ViewPreferencesUpdateInput
 * @property {JSONObject} preferences - View preferences.
 */

/**
 * @typedef {Object} WebhookCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {boolean} [enabled] - Whether this webhook is enabled.
 * @property {string} [secret] - An optional secret token used to sign the webhook payload.
 * @property {string} url - The URL that will be called on data changes.
 * @property {string} teamId - The identifier or key of the team associated with the Webhook.
 */

/**
 * @typedef {Object} WebhookPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {Webhook} webhook - The webhook entity being mutated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} WebhookUpdateInput
 * @property {string} [secret] - An optional secret token used to sign the Webhook payload.
 * @property {boolean} [enabled] - Whether this webhook is enabled.
 * @property {string} [url] - The URL that will be called on data changes.
 */

/**
 * @typedef {Object} WorkflowStateCreateInput
 * @property {string} [id] - The identifier. If none is provided, the backend will generate one.
 * @property {string} type - The workflow type.
 * @property {string} name - The name of the state.
 * @property {string} color - The color of the state.
 * @property {string} [description] - The description of the state.
 * @property {number} [position] - The position of the state.
 * @property {string} teamId - The team associated with the state.
 */

/**
 * @typedef {Object} WorkflowStatePayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 * @property {WorkflowState} workflowState - The state that was created or updated.
 * @property {boolean} success - Whether the operation was successful.
 */

/**
 * @typedef {Object} WorkflowStateUpdateInput
 * @property {string} [name] - The name of the state.
 * @property {string} [color] - The color of the state.
 * @property {string} [description] - The description of the state.
 * @property {number} [position] - The position of the state.
 */

/**
 * Collaborative editing steps for documents.
 *
 * @typedef {Object} DocumentStep
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 * @property {JSON} step - Step data.
 * @property {number} version - Step version.
 * @property {string} clientId - Connected client ID.
 */

/**
 * A user's web browser push notification subscription.
 *
 * @typedef {Object} PushSubscription
 * @property {string} id - The unique identifier of the entity.
 * @property {DateTime} createdAt - The time at which the entity was created.
 * @property {DateTime} updatedAt - The last time at which the entity was updated. This is the same as the creation time if the
 *     entity hasn't been update after creation.
 * @property {DateTime} [archivedAt] - The time at which the entity was archived. Null if the entity has not been archived.
 */

/**
 * @typedef {Object} PushSubscriptionEdge
 * @property {PushSubscription} node
 * @property {string} cursor - Used in `before` and `after` args
 */

/**
 * @typedef {Object} PushSubscriptionConnection
 * @property {Array<PushSubscriptionEdge>} edges
 * @property {Array<PushSubscription>} nodes
 * @property {PageInfo} pageInfo
 */

/**
 * A user account.
 *
 * @typedef {Object} UserAccount
 * @property {string} id - The models identifier.
 * @property {DateTime} createdAt - The time at which the model was created.
 * @property {DateTime} updatedAt - The time at which the model was updated.
 * @property {DateTime} [archivedAt] - The time at which the model was archived.
 * @property {string} [name] - The user's name.
 * @property {string} email - The user's email address.
 * @property {string} service - The authentication service used to create the account.
 * @property {Array<User>} users - Users belonging to the account.
 */

/**
 * A recorded entry of a file uploaded by a user.
 *
 * @typedef {Object} FileUpload
 * @property {string} id - The unique identifier of the entity.
 * @property {User} [creator] - The user who uploaded the file.
 * @property {Organization} organization - The organization the upload belongs to.
 * @property {string} [assetUrl] - The asset URL this file is available at.
 * @property {string} [contentType] - The MIME type of the uploaded file.
 * @property {string} [filename] - The name of the uploaded file.
 * @property {JSON} metaData - Additional metadata of the file.
 * @property {number} size - Size of the uploaded file in bytes.
 */

/**
 * @typedef {Object} SynchronizedPayload
 * @property {number} lastSyncId - The identifier of the last sync operation.
 */

/**
 * @typedef {Object} OrganizationDomainSimplePayload
 * @property {boolean} success - Whether the operation was successful.
 */
