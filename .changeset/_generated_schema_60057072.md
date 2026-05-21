---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'pipelineId' was removed from input object type 'ReleaseUpdateInput' (ReleaseUpdateInput.pipelineId)

feat(schema): [breaking] Field 'WorkflowCronJobDefinition.team' changed type from 'Team!' to 'Team' (WorkflowCronJobDefinition.team)

feat(schema): [dangerous] Member 'ReleaseNoteWebhookPayload' was added to Union type 'DataWebhookPayload' (DataWebhookPayload)

feat(schema): [dangerous] Input field 'pipelineTab' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.pipelineTab)

feat(schema): [dangerous] Input field 'releaseNoteId' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.releaseNoteId)

feat(schema): [dangerous] Input field 'workflowDefinitionDraftId' was added to input object type 'IntegrationUpdateInput' (IntegrationUpdateInput.workflowDefinitionDraftId)

feat(schema): [dangerous] Argument 'includeProtectedTeamIds: [String!]' added to field 'Mutation.createCsvExportReport' (Mutation.createCsvExportReport.includeProtectedTeamIds)

feat(schema): [dangerous] Argument 'confirmReplace: Boolean' added to field 'Mutation.integrationGithubConnect' (Mutation.integrationGithubConnect.confirmReplace)

feat(schema): [dangerous] Argument 'workflowDefinitionDraftId: String' added to field 'Mutation.integrationMcpServerConnect' (Mutation.integrationMcpServerConnect.workflowDefinitionDraftId)

feat(schema): [dangerous] Enum value 'billing' was added to enum 'NotificationCategory' (NotificationCategory.billing)

feat(schema): [dangerous] Input field 'billing' was added to input object type 'NotificationCategoryPreferencesInput' (NotificationCategoryPreferencesInput.billing)

feat(schema): [dangerous] Input field 'initiative' was added to input object type 'NullableDocumentContentFilter' (NullableDocumentContentFilter.initiative)

feat(schema): [dangerous] Input field 'projectMilestone' was added to input object type 'NullableDocumentContentFilter' (NullableDocumentContentFilter.projectMilestone)

feat(schema): [dangerous] Input field 'autoGenerateReleaseNotesOnCompletion' was added to input object type 'ReleasePipelineCreateInput' (ReleasePipelineCreateInput.autoGenerateReleaseNotesOnCompletion)

feat(schema): [dangerous] Input field 'autoGenerateReleaseNotesOnCompletion' was added to input object type 'ReleasePipelineUpdateInput' (ReleasePipelineUpdateInput.autoGenerateReleaseNotesOnCompletion)

feat(schema): [dangerous] Enum value 'agentCodeIntelligencePromoDismissed' was added to enum 'UserFlagType' (UserFlagType.agentCodeIntelligencePromoDismissed)

feat(schema): [dangerous] Enum value 'agentCodeIntelligenceSplashAnimationSeen' was added to enum 'UserFlagType' (UserFlagType.agentCodeIntelligenceSplashAnimationSeen)

feat(schema): [dangerous] Enum value 'slackProjectChannelsPromoDismissed' was added to enum 'UserFlagType' (UserFlagType.slackProjectChannelsPromoDismissed)

feat(schema): [dangerous] Enum value 'slackProjectChannelsPromoShown' was added to enum 'UserFlagType' (UserFlagType.slackProjectChannelsPromoShown)

feat(schema): [non_breaking] Type 'GitHubIntegrationConnectDetails' was added (GitHubIntegrationConnectDetails)

feat(schema): [non_breaking] Type 'PipelineTab' was added (PipelineTab)

feat(schema): [non_breaking] Type 'ReleaseNoteGenerationStatus' was added (ReleaseNoteGenerationStatus)

feat(schema): [non_breaking] Type 'ReleaseNoteWebhookPayload' was added (ReleaseNoteWebhookPayload)

feat(schema): [non_breaking] Type 'TeamVisibility' was added (TeamVisibility)

feat(schema): [non_breaking] Type 'UsageAlert' was added (UsageAlert)

feat(schema): [non_breaking] Type 'UsageAlertNotification' was added (UsageAlertNotification)

feat(schema): [non_breaking] Field 'gitHub' was added to object type 'AsksChannelConnectPayload' (AsksChannelConnectPayload.gitHub)

feat(schema): [non_breaking] Field 'cell' was added to object type 'AuthOrganization' (AuthOrganization.cell)

feat(schema): [non_breaking] Field 'oauthClientId' was added to object type 'AuthUser' (AuthUser.oauthClientId)

feat(schema): [non_breaking] Field 'Comment.initiative' description changed from '[Internal] The initiative that the comment is associated with. Null if the comment belongs to a different parent entity type.' to 'The initiative that the comment is associated with. Null if the comment belongs to a different parent entity type.' (Comment.initiative)

feat(schema): [non_breaking] Field 'Comment.initiativeId' description changed from '[Internal] The ID of the initiative that the comment is associated with. Null if the comment belongs to a different parent entity type.' to 'The ID of the initiative that the comment is associated with. Null if the comment belongs to a different parent entity type.' (Comment.initiativeId)

feat(schema): [non_breaking] Field 'Comment.project' description changed from '[Internal] The project that the comment is associated with. Used for project-level discussion threads. Null if the comment belongs to a different parent entity type.' to 'The project that the comment is associated with. Used for project-level discussion threads. Null if the comment belongs to a different parent entity type.' (Comment.project)

feat(schema): [non_breaking] Field 'Comment.projectId' description changed from '[Internal] The ID of the project that the comment is associated with. Null if the comment belongs to a different parent entity type.' to 'The ID of the project that the comment is associated with. Null if the comment belongs to a different parent entity type.' (Comment.projectId)

feat(schema): [non_breaking] Input field 'CommentCreateInput.initiativeId' description changed from '[Internal] The initiative to associate the comment with.' to 'The initiative to associate the comment with.' (CommentCreateInput.initiativeId)

feat(schema): [non_breaking] Input field 'CommentCreateInput.projectId' description changed from '[Internal] The project to associate the comment with.' to 'The project to associate the comment with.' (CommentCreateInput.projectId)

feat(schema): [non_breaking] Field 'content' was added to object type 'CustomerNeed' (CustomerNeed.content)

feat(schema): [non_breaking] Description 'The rich-text content body of a document, issue, project, initiative, project milestone, pull request, release note, AI prompt rules, or welcome message. Content is stored as a base64-encoded Yjs state and can be converted to Markdown or ProseMirror JSON. Each DocumentContent belongs to exactly one parent entity and supports real-time collaborative editing.' on type 'DocumentContent' has changed to 'The rich-text content body of a document, issue, project, initiative, project milestone, pull request, release note, automation prompt, AI prompt rules, or welcome message. Content is stored as a base64-encoded Yjs state and can be converted to Markdown or ProseMirror JSON. Each DocumentContent belongs to exactly one parent entity and supports real-time collaborative editing.' (DocumentContent)

feat(schema): [non_breaking] Field 'pipelineTab' was added to object type 'Favorite' (Favorite.pipelineTab)

feat(schema): [non_breaking] Field 'releaseNote' was added to object type 'Favorite' (Favorite.releaseNote)

feat(schema): [non_breaking] Field 'gitHub' was added to object type 'GitHubCommitIntegrationPayload' (GitHubCommitIntegrationPayload.gitHub)

feat(schema): [non_breaking] Field 'gitHub' was added to object type 'GitHubEnterpriseServerPayload' (GitHubEnterpriseServerPayload.gitHub)

feat(schema): [non_breaking] Field 'gitHub' was added to object type 'GitLabIntegrationCreatePayload' (GitLabIntegrationCreatePayload.gitHub)

feat(schema): [non_breaking] Field 'gitHub' was added to object type 'GitLabTestConnectionPayload' (GitLabTestConnectionPayload.gitHub)

feat(schema): [non_breaking] Field 'gitHub' was added to object type 'IntegrationPayload' (IntegrationPayload.gitHub)

feat(schema): [non_breaking] Field 'failedAutomationRuleId' was added to object type 'IssueSuggestionMetadata' (IssueSuggestionMetadata.failedAutomationRuleId)

feat(schema): [non_breaking] Field 'failedAutomationRuleReason' was added to object type 'IssueSuggestionMetadata' (IssueSuggestionMetadata.failedAutomationRuleReason)

feat(schema): [non_breaking] Field 'gitHub' was added to object type 'JiraFetchProjectStatusesPayload' (JiraFetchProjectStatusesPayload.gitHub)

feat(schema): [non_breaking] Field 'billing' was added to object type 'NotificationCategoryPreferences' (NotificationCategoryPreferences.billing)

feat(schema): [non_breaking] Field 'aiTelemetryEnabled' was added to object type 'Organization' (Organization.aiTelemetryEnabled)

feat(schema): [non_breaking] Field 'recentReleasesByAccessKey' was added to object type 'Query' (Query.recentReleasesByAccessKey)

feat(schema): [non_breaking] Field 'firstRelease' was added to object type 'ReleaseNote' (ReleaseNote.firstRelease)

feat(schema): [non_breaking] Field 'generationStatus' was added to object type 'ReleaseNote' (ReleaseNote.generationStatus)

feat(schema): [non_breaking] Field 'releaseCount' was added to object type 'ReleaseNote' (ReleaseNote.releaseCount)

feat(schema): [non_breaking] Field 'autoGenerateReleaseNotesOnCompletion' was added to object type 'ReleasePipeline' (ReleasePipeline.autoGenerateReleaseNotesOnCompletion)

feat(schema): [non_breaking] Field 'gitHub' was added to object type 'SlackChannelConnectPayload' (SlackChannelConnectPayload.gitHub)

feat(schema): [non_breaking] Field 'protected' was added to object type 'Team' (Team.protected)

feat(schema): [non_breaking] Field 'visibility' was added to object type 'Team' (Team.visibility)

feat(schema): [non_breaking] Field 'Team.private' is deprecated (Team.private)

feat(schema): [non_breaking] Field 'Team.private' has deprecation reason 'Use `Team.visibility` instead.' (Team.private)

feat(schema): [non_breaking] Description 'A team is the primary organizational unit in Linear. Issues belong to teams, and each team has its own workflow states, cycles, labels, and settings. Teams can be public (visible to all workspace members) or private (visible only to team members). Teams can also have sub-teams that inherit settings from their parent.' on type 'Team' has changed to 'A team is the primary organizational unit in Linear. Issues belong to teams, and each team has its own workflow states, cycles, labels, and settings. Teams can be public (visible to all workspace members), private (visible only to team members), or protected (visible only within an enclosing private-team boundary). Teams can also have sub-teams that inherit settings from their parent.' (Team)

feat(schema): [non_breaking] Field 'inboxViewGrouping' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.inboxViewGrouping)

feat(schema): [non_breaking] Field 'runOnce' was added to object type 'WorkflowDefinition' (WorkflowDefinition.runOnce)

feat(schema): [non_breaking] Field 'schedule' was added to object type 'WorkflowDefinition' (WorkflowDefinition.schedule)