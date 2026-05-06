---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'OrganizationUpdateInput.customersConfiguration' changed type from 'JSONObject' to 'CustomersConfigurationInput' (OrganizationUpdateInput.customersConfiguration)

feat(schema): [breaking] Input field 'OrganizationUpdateInput.themeSettings' changed type from 'JSONObject' to 'OrganizationThemeSettingsInput' (OrganizationUpdateInput.themeSettings)

feat(schema): [dangerous] Input field 'queued' was added to input object type 'AgentActivityCreatePromptInput' (AgentActivityCreatePromptInput.queued)

feat(schema): [dangerous] Input field 'agentSkillsManagement' was added to input object type 'TeamSecuritySettingsInput' (TeamSecuritySettingsInput.agentSkillsManagement)

feat(schema): [non_breaking] Type 'CustomersAttributesDataSourceConfigurationInput' was added (CustomersAttributesDataSourceConfigurationInput)

feat(schema): [non_breaking] Type 'CustomersAttributesDataSourceIntegrationInput' was added (CustomersAttributesDataSourceIntegrationInput)

feat(schema): [non_breaking] Type 'CustomersConfigurationInput' was added (CustomersConfigurationInput)

feat(schema): [non_breaking] Type 'OrganizationThemeSettingsInput' was added (OrganizationThemeSettingsInput)

feat(schema): [non_breaking] Field 'queued' was added to object type 'AgentActivity' (AgentActivity.queued)

feat(schema): [non_breaking] Field 'sentAt' was added to object type 'AgentActivity' (AgentActivity.sentAt)

feat(schema): [non_breaking] Field 'agentActivityDeleteQueued' was added to object type 'Mutation' (Mutation.agentActivityDeleteQueued)

feat(schema): [non_breaking] Field 'agentActivitySendQueued' was added to object type 'Mutation' (Mutation.agentActivitySendQueued)

feat(schema): [non_breaking] Field 'Team.securitySettings' description changed from 'Security settings for the team, including role-based restrictions for issue sharing, label management, member management, and template management.' to 'Security settings for the team, including role-based restrictions for issue sharing, label management, member management, template management, and agent skills.' (Team.securitySettings)