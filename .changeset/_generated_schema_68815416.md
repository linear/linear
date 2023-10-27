---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'repositories' was removed from object type 'GitHubSyncSettings' (GitHubSyncSettings.repositories)

feat(schema): [breaking] Field 'teamRepoMap' was removed from object type 'GitHubSyncSettings' (GitHubSyncSettings.teamRepoMap)

feat(schema): [breaking] Input field 'repositories' was removed from input object type 'GitHubSyncSettingsInput' (GitHubSyncSettingsInput.repositories)

feat(schema): [breaking] Input field 'teamRepoMap' was removed from input object type 'GitHubSyncSettingsInput' (GitHubSyncSettingsInput.teamRepoMap)

feat(schema): [breaking] Field 'integrationGithubSync' was removed from object type 'Mutation' (Mutation.integrationGithubSync)

feat(schema): [dangerous] Input field 'createOnSyncedSlackThread' was added to input object type 'CommentCreateInput' (CommentCreateInput.createOnSyncedSlackThread)

feat(schema): [dangerous] Input field 'resolvingCommentId' was added to input object type 'CommentUpdateInput' (CommentUpdateInput.resolvingCommentId)

feat(schema): [dangerous] Input field 'resolvingUserId' was added to input object type 'CommentUpdateInput' (CommentUpdateInput.resolvingUserId)

feat(schema): [dangerous] Input field 'repoMapping' was added to input object type 'GitHubSyncSettingsInput' (GitHubSyncSettingsInput.repoMapping)

feat(schema): [dangerous] Input field 'repos' was added to input object type 'GitHubSyncSettingsInput' (GitHubSyncSettingsInput.repos)

feat(schema): [dangerous] Input field 'slack' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.slack)

feat(schema): [dangerous] Input field 'isDiffHidden' was added to input object type 'ProjectUpdateCreateInput' (ProjectUpdateCreateInput.isDiffHidden)

feat(schema): [dangerous] Input field 'isDiffHidden' was added to input object type 'ProjectUpdateUpdateInput' (ProjectUpdateUpdateInput.isDiffHidden)

feat(schema): [dangerous] Input field 'autoCreateOnBotMention' was added to input object type 'SlackChannelNameMappingInput' (SlackChannelNameMappingInput.autoCreateOnBotMention)

feat(schema): [dangerous] Input field 'isShared' was added to input object type 'SlackChannelNameMappingInput' (SlackChannelNameMappingInput.isShared)

feat(schema): [dangerous] Input field 'joinByDefault' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.joinByDefault)

feat(schema): [non_breaking] Type 'IntegrationService' was added (IntegrationService)

feat(schema): [non_breaking] Type 'SlackSettings' was added (SlackSettings)

feat(schema): [non_breaking] Type 'SlackSettingsInput' was added (SlackSettingsInput)

feat(schema): [non_breaking] Type 'TriageResponsibilityManualSelection' was added (TriageResponsibilityManualSelection)

feat(schema): [non_breaking] Type 'TriageResponsibilitySchedule' was added (TriageResponsibilitySchedule)

feat(schema): [non_breaking] Type 'TriageResponsibilityScheduleEntry' was added (TriageResponsibilityScheduleEntry)

feat(schema): [non_breaking] Field 'addBot' was added to object type 'AsksChannelConnectPayload' (AsksChannelConnectPayload.addBot)

feat(schema): [non_breaking] Field 'restoredAt' was added to object type 'DocumentContent' (DocumentContent.restoredAt)

feat(schema): [non_breaking] Field 'repoMapping' was added to object type 'GitHubSyncSettings' (GitHubSyncSettings.repoMapping)

feat(schema): [non_breaking] Field 'repos' was added to object type 'GitHubSyncSettings' (GitHubSyncSettings.repos)

feat(schema): [non_breaking] Field 'slack' was added to object type 'IntegrationSettings' (IntegrationSettings.slack)

feat(schema): [non_breaking] Field 'integrationSourceType' was added to object type 'Issue' (Issue.integrationSourceType)

feat(schema): [non_breaking] Field 'integrationSourceType' was added to object type 'IssueSearchResult' (IssueSearchResult.integrationSourceType)

feat(schema): [non_breaking] Field 'integrationGithubSyncConnect' was added to object type 'Mutation' (Mutation.integrationGithubSyncConnect)

feat(schema): [non_breaking] Field 'Mutation.commentResolve' description changed from '[ALPHA] Resolves a comment.' to 'Resolves a comment.' (Mutation.commentResolve)

feat(schema): [non_breaking] Field 'Mutation.commentUnresolve' description changed from '[ALPHA] Unresolves a comment.' to 'Unresolves a comment.' (Mutation.commentUnresolve)

feat(schema): [non_breaking] Field 'isDiffHidden' was added to object type 'ProjectUpdate' (ProjectUpdate.isDiffHidden)

feat(schema): [non_breaking] Field 'autoCreateOnBotMention' was added to object type 'SlackChannelNameMapping' (SlackChannelNameMapping.autoCreateOnBotMention)

feat(schema): [non_breaking] Field 'isShared' was added to object type 'SlackChannelNameMapping' (SlackChannelNameMapping.isShared)

feat(schema): [non_breaking] Field 'joinByDefault' was added to object type 'Team' (Team.joinByDefault)

feat(schema): [non_breaking] Field 'manualSelection' was added to object type 'TriageResponsibility' (TriageResponsibility.manualSelection)

feat(schema): [non_breaking] Field 'schedule' was added to object type 'TriageResponsibility' (TriageResponsibility.schedule)

feat(schema): [non_breaking] Field 'TriageResponsibility.integration' description changed from 'The integration used for scheduling when using the 'integrationSchedule' configuration.' to 'The integration used for scheduling.' (TriageResponsibility.integration)