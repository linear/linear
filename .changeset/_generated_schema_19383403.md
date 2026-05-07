---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'OrganizationUpdateInput.customersConfiguration' changed type from 'JSONObject' to 'CustomersConfigurationInput' (OrganizationUpdateInput.customersConfiguration)

feat(schema): [breaking] Input field 'OrganizationUpdateInput.themeSettings' changed type from 'JSONObject' to 'OrganizationThemeSettingsInput' (OrganizationUpdateInput.themeSettings)

feat(schema): [dangerous] Input field 'queued' was added to input object type 'AgentActivityCreatePromptInput' (AgentActivityCreatePromptInput.queued)

feat(schema): [dangerous] Member 'AiConversationErrorPart' was added to Union type 'AiConversationPart' (AiConversationPart)

feat(schema): [dangerous] Enum value 'error' was added to enum 'AiConversationPartType' (AiConversationPartType.error)

feat(schema): [dangerous] Input field 'name' was added to input object type 'ReleaseCompleteInput' (ReleaseCompleteInput.name)

feat(schema): [dangerous] Input field 'name' was added to input object type 'ReleaseCompleteInputBase' (ReleaseCompleteInputBase.name)

feat(schema): [dangerous] Input field 'name' was added to input object type 'ReleaseUpdateByPipelineInput' (ReleaseUpdateByPipelineInput.name)

feat(schema): [dangerous] Input field 'name' was added to input object type 'ReleaseUpdateByPipelineInputBase' (ReleaseUpdateByPipelineInputBase.name)

feat(schema): [dangerous] Input field 'agentSkillsManagement' was added to input object type 'TeamSecuritySettingsInput' (TeamSecuritySettingsInput.agentSkillsManagement)

feat(schema): [non_breaking] Type 'AiConversationErrorPart' was added (AiConversationErrorPart)

feat(schema): [non_breaking] Type 'CustomersAttributesDataSourceConfigurationInput' was added (CustomersAttributesDataSourceConfigurationInput)

feat(schema): [non_breaking] Type 'CustomersAttributesDataSourceIntegrationInput' was added (CustomersAttributesDataSourceIntegrationInput)

feat(schema): [non_breaking] Type 'CustomersConfigurationInput' was added (CustomersConfigurationInput)

feat(schema): [non_breaking] Type 'OrganizationThemeSettingsInput' was added (OrganizationThemeSettingsInput)

feat(schema): [non_breaking] Type 'TeamPinnedResource' was added (TeamPinnedResource)

feat(schema): [non_breaking] Type 'TeamResourceSection' was added (TeamResourceSection)

feat(schema): [non_breaking] Field 'queued' was added to object type 'AgentActivity' (AgentActivity.queued)

feat(schema): [non_breaking] Field 'sentAt' was added to object type 'AgentActivity' (AgentActivity.sentAt)

feat(schema): [non_breaking] Field 'AiConversation.parts' description changed from 'The ordered sequence of conversation parts (prompts, text responses, reasoning steps, tool calls, and widgets) that make up this conversation's visible history.' to 'The ordered sequence of conversation parts (prompts, text responses, reasoning steps, tool calls, errors, and widgets) that make up this conversation's visible history.' (AiConversation.parts)

feat(schema): [non_breaking] Field 'project' was added to object type 'EntityExternalLink' (EntityExternalLink.project)

feat(schema): [non_breaking] Field 'agentActivityDeleteQueued' was added to object type 'Mutation' (Mutation.agentActivityDeleteQueued)

feat(schema): [non_breaking] Field 'agentActivitySendQueued' was added to object type 'Mutation' (Mutation.agentActivitySendQueued)

feat(schema): [non_breaking] Field 'microsoftTeamsChannelId' was added to object type 'Project' (Project.microsoftTeamsChannelId)

feat(schema): [non_breaking] Field 'slackChannelId' was added to object type 'Project' (Project.slackChannelId)

feat(schema): [non_breaking] Field 'microsoftTeamsChannelId' was added to object type 'ProjectSearchResult' (ProjectSearchResult.microsoftTeamsChannelId)

feat(schema): [non_breaking] Field 'slackChannelId' was added to object type 'ProjectSearchResult' (ProjectSearchResult.slackChannelId)

feat(schema): [non_breaking] Field 'mergeStatus' was added to object type 'PullRequest' (PullRequest.mergeStatus)

feat(schema): [non_breaking] Field 'openedAt' was added to object type 'PullRequest' (PullRequest.openedAt)

feat(schema): [non_breaking] Input field 'RepositoryDataInput.provider' description changed from 'The VCS provider hosting the repository (e.g., 'github', 'gitlab').' to 'The VCS provider hosting the repository (e.g., 'github', 'gitlab', 'bitbucket').' (RepositoryDataInput.provider)

feat(schema): [non_breaking] Field 'projectUpdateArchived' was added to object type 'Subscription' (Subscription.projectUpdateArchived)

feat(schema): [non_breaking] Field 'pinnedResources' was added to object type 'Team' (Team.pinnedResources)

feat(schema): [non_breaking] Field 'resourceSections' was added to object type 'Team' (Team.resourceSections)

feat(schema): [non_breaking] Field 'Team.securitySettings' description changed from 'Security settings for the team, including role-based restrictions for issue sharing, label management, member management, and template management.' to 'Security settings for the team, including role-based restrictions for issue sharing, label management, member management, template management, and agent skills.' (Team.securitySettings)