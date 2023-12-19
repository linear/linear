---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'AuthApiKeyDeletePayload' was removed (AuthApiKeyDeletePayload)

feat(schema): [breaking] Type 'GitHubSyncRepo' was removed (GitHubSyncRepo)

feat(schema): [breaking] Type 'GitHubSyncRepoInput' was removed (GitHubSyncRepoInput)

feat(schema): [breaking] Type 'GitHubSyncSettings' was removed (GitHubSyncSettings)

feat(schema): [breaking] Type 'GitHubSyncSettingsInput' was removed (GitHubSyncSettingsInput)

feat(schema): [breaking] Type 'SyncResponse' was removed (SyncResponse)

feat(schema): [breaking] Field 'Comment.issue' changed type from 'Issue!' to 'Issue' (Comment.issue)

feat(schema): [breaking] Field 'Comment.projectUpdate' changed type from 'ProjectUpdate!' to 'ProjectUpdate' (Comment.projectUpdate)

feat(schema): [breaking] Field 'GitHubSettings.repositories' changed type from '[String!]' to '[GitHubRepo!]' (GitHubSettings.repositories)

feat(schema): [breaking] Input field 'GitHubSettingsInput.repositories' changed type from '[String!]' to '[GitHubRepoInput!]' (GitHubSettingsInput.repositories)

feat(schema): [breaking] Enum value 'gitHubSync' was removed from enum 'IntegrationService' (IntegrationService.gitHubSync)

feat(schema): [breaking] Field 'gitHubSync' was removed from object type 'IntegrationSettings' (IntegrationSettings.gitHubSync)

feat(schema): [breaking] Input field 'gitHubSync' was removed from input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.gitHubSync)

feat(schema): [breaking] Field 'integrationGithubSyncConnect' was removed from object type 'Mutation' (Mutation.integrationGithubSyncConnect)

feat(schema): [breaking] Field 'userGitHubConnect' (deprecated) was removed from object type 'Mutation' (Mutation.userGitHubConnect)

feat(schema): [breaking] Field 'userJiraConnect' (deprecated) was removed from object type 'Mutation' (Mutation.userJiraConnect)

feat(schema): [breaking] Field 'Mutation.integrationSlackOrgProjectUpdatesPost' changed type from 'IntegrationPayload!' to 'SlackChannelConnectPayload!' (Mutation.integrationSlackOrgProjectUpdatesPost)

feat(schema): [breaking] Field 'Mutation.integrationSlackPost' changed type from 'IntegrationPayload!' to 'SlackChannelConnectPayload!' (Mutation.integrationSlackPost)

feat(schema): [breaking] Field 'Mutation.integrationSlackProjectPost' changed type from 'IntegrationPayload!' to 'SlackChannelConnectPayload!' (Mutation.integrationSlackProjectPost)

feat(schema): [breaking] Field 'Project.creator' changed type from 'User!' to 'User' (Project.creator)

feat(schema): [breaking] Field 'ProjectSearchResult.creator' changed type from 'User!' to 'User' (ProjectSearchResult.creator)

feat(schema): [dangerous] Input field 'documentContent' was added to input object type 'CommentCollectionFilter' (CommentCollectionFilter.documentContent)

feat(schema): [dangerous] Input field 'projectUpdate' was added to input object type 'CommentCollectionFilter' (CommentCollectionFilter.projectUpdate)

feat(schema): [dangerous] Input field 'documentContent' was added to input object type 'CommentFilter' (CommentFilter.documentContent)

feat(schema): [dangerous] Input field 'projectUpdate' was added to input object type 'CommentFilter' (CommentFilter.projectUpdate)

feat(schema): [dangerous] Input field 'sortOrder' was added to input object type 'DocumentCreateInput' (DocumentCreateInput.sortOrder)

feat(schema): [dangerous] Input field 'sortOrder' was added to input object type 'DocumentUpdateInput' (DocumentUpdateInput.sortOrder)

feat(schema): [dangerous] Input field 'projectTab' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.projectTab)

feat(schema): [dangerous] Input field 'repositoriesMapping' was added to input object type 'GitHubSettingsInput' (GitHubSettingsInput.repositoriesMapping)

feat(schema): [dangerous] Input field 'gitHubPersonal' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.gitHubPersonal)

feat(schema): [dangerous] Input field 'default' was added to input object type 'JiraLinearMappingInput' (JiraLinearMappingInput.default)

feat(schema): [dangerous] Input field 'isJiraServer' was added to input object type 'JiraSettingsInput' (JiraSettingsInput.isJiraServer)

feat(schema): [dangerous] Argument 'accessToken: String' added to field 'Mutation.integrationJiraPersonal' (Mutation.integrationJiraPersonal.accessToken)

feat(schema): [dangerous] Argument 'connectSlackChannel: Boolean' added to field 'Mutation.projectCreate' (Mutation.projectCreate.connectSlackChannel)

feat(schema): [dangerous] Input field 'fiscalYearStartMonth' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.fiscalYearStartMonth)

feat(schema): [dangerous] Input field 'startDateResolution' was added to input object type 'ProjectCreateInput' (ProjectCreateInput.startDateResolution)

feat(schema): [dangerous] Input field 'targetDateResolution' was added to input object type 'ProjectCreateInput' (ProjectCreateInput.targetDateResolution)

feat(schema): [dangerous] Input field 'sortOrder' was added to input object type 'ProjectLinkCreateInput' (ProjectLinkCreateInput.sortOrder)

feat(schema): [dangerous] Input field 'sortOrder' was added to input object type 'ProjectLinkUpdateInput' (ProjectLinkUpdateInput.sortOrder)

feat(schema): [dangerous] Input field 'startDateResolution' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.startDateResolution)

feat(schema): [dangerous] Input field 'targetDateResolution' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.targetDateResolution)

feat(schema): [dangerous] Argument 'sendStrategy: SendStrategy' added to field 'Query.pushSubscriptionTest' (Query.pushSubscriptionTest.sendStrategy)

feat(schema): [dangerous] Argument 'targetMobile: Boolean' added to field 'Query.pushSubscriptionTest' (Query.pushSubscriptionTest.targetMobile)

feat(schema): [dangerous] Input field 'autoCreateTemplateId' was added to input object type 'SlackChannelNameMappingInput' (SlackChannelNameMappingInput.autoCreateTemplateId)

feat(schema): [dangerous] Input field 'channelType' was added to input object type 'SlackPostSettingsInput' (SlackPostSettingsInput.channelType)

feat(schema): [dangerous] Input field 'setIssueSortOrderOnStateChange' was added to input object type 'TeamCreateInput' (TeamCreateInput.setIssueSortOrderOnStateChange)

feat(schema): [dangerous] Input field 'setIssueSortOrderOnStateChange' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.setIssueSortOrderOnStateChange)

feat(schema): [dangerous] Enum value 'projectDocuments' was added to enum 'ViewType' (ViewType.projectDocuments)

feat(schema): [non_breaking] Type 'AuthCreateOrJoinOrganizationResponse' was added (AuthCreateOrJoinOrganizationResponse)

feat(schema): [non_breaking] Type 'AuthOauthClientWithMemberships' was added (AuthOauthClientWithMemberships)

feat(schema): [non_breaking] Type 'AuthOauthClientWithScope' was added (AuthOauthClientWithScope)

feat(schema): [non_breaking] Type 'AuthOauthClientWithTokens' was added (AuthOauthClientWithTokens)

feat(schema): [non_breaking] Type 'AuthOrganizationDomain' was added (AuthOrganizationDomain)

feat(schema): [non_breaking] Type 'AuthSuccessPayload' was added (AuthSuccessPayload)

feat(schema): [non_breaking] Type 'AuthorizedApplicationBase' was added (AuthorizedApplicationBase)

feat(schema): [non_breaking] Type 'CycleShiftAllInput' was added (CycleShiftAllInput)

feat(schema): [non_breaking] Type 'DateResolutionType' was added (DateResolutionType)

feat(schema): [non_breaking] Type 'EmailIntakeAddress' was added (EmailIntakeAddress)

feat(schema): [non_breaking] Type 'GitAutomationState' was added (GitAutomationState)

feat(schema): [non_breaking] Type 'GitAutomationStateConnection' was added (GitAutomationStateConnection)

feat(schema): [non_breaking] Type 'GitAutomationStateCreateInput' was added (GitAutomationStateCreateInput)

feat(schema): [non_breaking] Type 'GitAutomationStateEdge' was added (GitAutomationStateEdge)

feat(schema): [non_breaking] Type 'GitAutomationStatePayload' was added (GitAutomationStatePayload)

feat(schema): [non_breaking] Type 'GitAutomationStateUpdateInput' was added (GitAutomationStateUpdateInput)

feat(schema): [non_breaking] Type 'GitAutomationStates' was added (GitAutomationStates)

feat(schema): [non_breaking] Type 'GitHubPersonalSettings' was added (GitHubPersonalSettings)

feat(schema): [non_breaking] Type 'GitHubPersonalSettingsInput' was added (GitHubPersonalSettingsInput)

feat(schema): [non_breaking] Type 'GitHubRepo' was added (GitHubRepo)

feat(schema): [non_breaking] Type 'GitHubRepoInput' was added (GitHubRepoInput)

feat(schema): [non_breaking] Type 'JiraUpdateInput' was added (JiraUpdateInput)

feat(schema): [non_breaking] Type 'OauthToken' was added (OauthToken)

feat(schema): [non_breaking] Type 'ProjectTab' was added (ProjectTab)

feat(schema): [non_breaking] Type 'SendStrategy' was added (SendStrategy)

feat(schema): [non_breaking] Type 'SlackChannelConnectPayload' was added (SlackChannelConnectPayload)

feat(schema): [non_breaking] Type 'SlackChannelType' was added (SlackChannelType)

feat(schema): [non_breaking] Type 'TeamArchivePayload' was added (TeamArchivePayload)

feat(schema): [non_breaking] Field 'AsksChannelConnectPayload.addBot' description changed from 'Whether the bot needs to be added to the channel.' to 'Whether the bot needs to be manually added to the channel.' (AsksChannelConnectPayload.addBot)

feat(schema): [non_breaking] Field 'archivedAt' was added to object type 'AuthOauthClient' (AuthOauthClient.archivedAt)

feat(schema): [non_breaking] Field 'creatorId' was added to object type 'AuthOauthClient' (AuthOauthClient.creatorId)

feat(schema): [non_breaking] Field 'description' was added to object type 'AuthOauthClient' (AuthOauthClient.description)

feat(schema): [non_breaking] Field 'developer' was added to object type 'AuthOauthClient' (AuthOauthClient.developer)

feat(schema): [non_breaking] Field 'developerUrl' was added to object type 'AuthOauthClient' (AuthOauthClient.developerUrl)

feat(schema): [non_breaking] Field 'imageUrl' was added to object type 'AuthOauthClient' (AuthOauthClient.imageUrl)

feat(schema): [non_breaking] Field 'name' was added to object type 'AuthOauthClient' (AuthOauthClient.name)

feat(schema): [non_breaking] Field 'organizationId' was added to object type 'AuthOauthClient' (AuthOauthClient.organizationId)

feat(schema): [non_breaking] Field 'publicEnabled' was added to object type 'AuthOauthClient' (AuthOauthClient.publicEnabled)

feat(schema): [non_breaking] Field 'webhookUrl' was added to object type 'AuthOauthClient' (AuthOauthClient.webhookUrl)

feat(schema): [non_breaking] Field 'samlSettings' was added to object type 'AuthOrganization' (AuthOrganization.samlSettings)

feat(schema): [non_breaking] Field 'scimEnabled' was added to object type 'AuthOrganization' (AuthOrganization.scimEnabled)

feat(schema): [non_breaking] Field 'AuthOrganization.id' has description 'The unique identifier of the entity.' (AuthOrganization.id)

feat(schema): [non_breaking] Field 'active' was added to object type 'AuthUser' (AuthUser.active)

feat(schema): [non_breaking] Object type 'AuthenticationSessionResponse' has description 'Authentication session information' (AuthenticationSessionResponse)

feat(schema): [non_breaking] Field 'Comment.externalUser' description changed from '[ALPHA] The external user who wrote the comment.' to 'The external user who wrote the comment.' (Comment.externalUser)

feat(schema): [non_breaking] Field 'Comment.projectUpdate' description changed from '[ALPHA] The project update that the comment is associated with.' to 'The project update that the comment is associated with.' (Comment.projectUpdate)

feat(schema): [non_breaking] Field 'sortOrder' was added to object type 'Document' (Document.sortOrder)

feat(schema): [non_breaking] Field 'sortOrder' was added to object type 'DocumentSearchResult' (DocumentSearchResult.sortOrder)

feat(schema): [non_breaking] Field 'projectTab' was added to object type 'Favorite' (Favorite.projectTab)

feat(schema): [non_breaking] Field 'repositoriesMapping' was added to object type 'GitHubSettings' (GitHubSettings.repositoriesMapping)

feat(schema): [non_breaking] Field 'gitHubPersonal' was added to object type 'IntegrationSettings' (IntegrationSettings.gitHubPersonal)

feat(schema): [non_breaking] Field 'botActor' was added to object type 'Issue' (Issue.botActor)

feat(schema): [non_breaking] Field 'labelIds' was added to object type 'Issue' (Issue.labelIds)

feat(schema): [non_breaking] Field 'botActor' was added to object type 'IssueSearchResult' (IssueSearchResult.botActor)

feat(schema): [non_breaking] Field 'labelIds' was added to object type 'IssueSearchResult' (IssueSearchResult.labelIds)

feat(schema): [non_breaking] Field 'default' was added to object type 'JiraLinearMapping' (JiraLinearMapping.default)

feat(schema): [non_breaking] Field 'isJiraServer' was added to object type 'JiraSettings' (JiraSettings.isJiraServer)

feat(schema): [non_breaking] Field 'attachmentLinkGitHubIssue' was added to object type 'Mutation' (Mutation.attachmentLinkGitHubIssue)

feat(schema): [non_breaking] Field 'cycleShiftAll' was added to object type 'Mutation' (Mutation.cycleShiftAll)

feat(schema): [non_breaking] Field 'gitAutomationStateCreate' was added to object type 'Mutation' (Mutation.gitAutomationStateCreate)

feat(schema): [non_breaking] Field 'gitAutomationStateDelete' was added to object type 'Mutation' (Mutation.gitAutomationStateDelete)

feat(schema): [non_breaking] Field 'gitAutomationStateUpdate' was added to object type 'Mutation' (Mutation.gitAutomationStateUpdate)

feat(schema): [non_breaking] Field 'integrationJiraUpdate' was added to object type 'Mutation' (Mutation.integrationJiraUpdate)

feat(schema): [non_breaking] Field 'teamUnarchive' was added to object type 'Mutation' (Mutation.teamUnarchive)

feat(schema): [non_breaking] Field 'Mutation.attachmentLinkGitHubPR' description changed from 'Link an existing GitHub PR to an issue.' to 'Link a GitHub pull request to an issue.' (Mutation.attachmentLinkGitHubPR)

feat(schema): [non_breaking] Type for argument 'number' on field 'Mutation.attachmentLinkGitHubPR' changed from 'Float!' to 'Float' (Mutation.attachmentLinkGitHubPR.number)

feat(schema): [non_breaking] Type for argument 'owner' on field 'Mutation.attachmentLinkGitHubPR' changed from 'String!' to 'String' (Mutation.attachmentLinkGitHubPR.owner)

feat(schema): [non_breaking] Type for argument 'repo' on field 'Mutation.attachmentLinkGitHubPR' changed from 'String!' to 'String' (Mutation.attachmentLinkGitHubPR.repo)

feat(schema): [non_breaking] Description for argument 'code' on field 'Mutation.integrationJiraPersonal' changed from 'The Jira OAuth code.' to 'The Jira OAuth code, when connecting using OAuth.' (Mutation.integrationJiraPersonal.code)

feat(schema): [non_breaking] Type for argument 'code' on field 'Mutation.integrationJiraPersonal' changed from 'String!' to 'String' (Mutation.integrationJiraPersonal.code)

feat(schema): [non_breaking] Field 'fiscalYearStartMonth' was added to object type 'Organization' (Organization.fiscalYearStartMonth)

feat(schema): [non_breaking] Field 'startDateResolution' was added to object type 'Project' (Project.startDateResolution)

feat(schema): [non_breaking] Field 'targetDateResolution' was added to object type 'Project' (Project.targetDateResolution)

feat(schema): [non_breaking] Field 'sortOrder' was added to object type 'ProjectLink' (ProjectLink.sortOrder)

feat(schema): [non_breaking] Field 'startDateResolution' was added to object type 'ProjectSearchResult' (ProjectSearchResult.startDateResolution)

feat(schema): [non_breaking] Field 'targetDateResolution' was added to object type 'ProjectSearchResult' (ProjectSearchResult.targetDateResolution)

feat(schema): [non_breaking] Field 'archivedTeams' was added to object type 'Query' (Query.archivedTeams)

feat(schema): [non_breaking] Field 'comment' was added to object type 'Reaction' (Reaction.comment)

feat(schema): [non_breaking] Field 'issue' was added to object type 'Reaction' (Reaction.issue)

feat(schema): [non_breaking] Field 'projectUpdate' was added to object type 'Reaction' (Reaction.projectUpdate)

feat(schema): [non_breaking] Field 'Reaction.user' description changed from 'The user who reacted.' to 'The user that created the reaction.' (Reaction.user)

feat(schema): [non_breaking] Field 'autoCreateTemplateId' was added to object type 'SlackChannelNameMapping' (SlackChannelNameMapping.autoCreateTemplateId)

feat(schema): [non_breaking] Field 'channelType' was added to object type 'SlackPostSettings' (SlackPostSettings.channelType)

feat(schema): [non_breaking] Field 'automationStates' was added to object type 'Team' (Team.automationStates)

feat(schema): [non_breaking] Field 'setIssueSortOrderOnStateChange' was added to object type 'Team' (Team.setIssueSortOrderOnStateChange)

feat(schema): [non_breaking] Field 'Team.issueSortOrderDefaultToBottom' description changed from 'Whether to move issues to bottom of the column when changing state.' to '[DEPRECATED] Whether to move issues to bottom of the column when changing state. Use setIssueSortOrderOnStateChange instead.' (Team.issueSortOrderDefaultToBottom)

feat(schema): [non_breaking] Input field 'TeamCreateInput.issueSortOrderDefaultToBottom' description changed from 'Whether to move issues to bottom of the column when changing state.' to '[DEPRECATED] Whether to move issues to bottom of the column when changing state. Use setIssueSortOrderOnStateChange instead.' (TeamCreateInput.issueSortOrderDefaultToBottom)

feat(schema): [non_breaking] Input field 'TeamUpdateInput.issueSortOrderDefaultToBottom' description changed from 'Whether to move issues to bottom of the column when changing state.' to '[DEPRECATED] Whether to move issues to bottom of the column when changing state. Use setIssueSortOrderOnStateChange instead.' (TeamUpdateInput.issueSortOrderDefaultToBottom)