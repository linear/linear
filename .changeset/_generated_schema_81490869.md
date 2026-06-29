---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'agentSessionId' was removed from object type 'AiConversationPromptCodingSessionToolCallArgs' (AiConversationPromptCodingSessionToolCallArgs.agentSessionId)

feat(schema): [dangerous] Enum value 'ReadFile' was added to enum 'AiConversationTool' (AiConversationTool.ReadFile)

feat(schema): [dangerous] Member 'AiConversationReadFileToolCall' was added to Union type 'AiConversationToolCall' (AiConversationToolCall)

feat(schema): [dangerous] Input field 'initiativeLabelId' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.initiativeLabelId)

feat(schema): [dangerous] Input field 'workflowDefinitionId' was added to input object type 'IntegrationUpdateInput' (IntegrationUpdateInput.workflowDefinitionId)

feat(schema): [dangerous] Input field 'automaticConversationIntakeTeamId' was added to input object type 'IntercomSettingsInput' (IntercomSettingsInput.automaticConversationIntakeTeamId)

feat(schema): [dangerous] Input field 'enableAutomaticConversationIntake' was added to input object type 'IntercomSettingsInput' (IntercomSettingsInput.enableAutomaticConversationIntake)

feat(schema): [dangerous] Input field 'initiativeLabelId' was added to input object type 'ViewPreferencesCreateInput' (ViewPreferencesCreateInput.initiativeLabelId)

feat(schema): [dangerous] Enum value 'initiativeLabel' was added to enum 'ViewType' (ViewType.initiativeLabel)

feat(schema): [non_breaking] Type 'AiConversationReadFileToolCall' was added (AiConversationReadFileToolCall)

feat(schema): [non_breaking] Type 'AiConversationReadFileToolCallArgs' was added (AiConversationReadFileToolCallArgs)

feat(schema): [non_breaking] Type 'AiConversationReadFileToolCallArgsMode' was added (AiConversationReadFileToolCallArgsMode)

feat(schema): [non_breaking] Type 'InitiativeLeadTeamChangeImpact' was added (InitiativeLeadTeamChangeImpact)

feat(schema): [non_breaking] Type 'InitiativeLeadTeamChangeMode' was added (InitiativeLeadTeamChangeMode)

feat(schema): [non_breaking] Field 'document' was added to object type 'AiConversation' (AiConversation.document)

feat(schema): [non_breaking] Field 'initiativeLabel' was added to object type 'Favorite' (Favorite.initiativeLabel)

feat(schema): [non_breaking] Description 'Metadata about a workflow automation that made changes to an issue. Links the issue history entry back to the workflow definition that triggered the change, and optionally to any AI conversation involved in the automation.' on type 'IssueHistoryWorkflowMetadata' has changed to 'Metadata about a loop that made changes to an issue. Links the issue history entry back to the workflow definition that triggered the change, and optionally to any AI conversation involved in the loop.' (IssueHistoryWorkflowMetadata)

feat(schema): [non_breaking] Description 'How workspace trusted source access is restricted for agent automations.' on type 'LinearAgentTrustedSourcesMode' has changed to 'How workspace trusted source access is restricted for agent loops.' (LinearAgentTrustedSourcesMode)

feat(schema): [non_breaking] Field 'initiativeLeadTeamUpdate' was added to object type 'Mutation' (Mutation.initiativeLeadTeamUpdate)

feat(schema): [non_breaking] Input field 'OrganizationLinearAgentSettingsInput.trustedSourcesAllowlist' description changed from '[Internal] Trusted-source allowlist for Linear Agent automations.' to '[Internal] Trusted-source allowlist for Linear Agent loops.' (OrganizationLinearAgentSettingsInput.trustedSourcesAllowlist)

feat(schema): [non_breaking] Input field 'OrganizationLinearAgentSettingsInput.trustedSourcesMode' description changed from '[Internal] Whether external trusted sources are disabled or restricted to approved sources for agent automations.' to '[Internal] Whether external trusted sources are disabled or restricted to approved sources for agent loops.' (OrganizationLinearAgentSettingsInput.trustedSourcesMode)

feat(schema): [non_breaking] Input field 'OrganizationLinearAgentTrustedSourcesAllowlistEntryInput.key' description changed from '[Internal] The trusted-source key that Linear Agent automations are allowed to use.' to '[Internal] The trusted-source key that Linear Agent loops are allowed to use.' (OrganizationLinearAgentTrustedSourcesAllowlistEntryInput.key)

feat(schema): [non_breaking] Description '[Internal] A trusted-source entry for the Linear Agent automation allowlist.' on type 'OrganizationLinearAgentTrustedSourcesAllowlistEntryInput' has changed to '[Internal] A trusted-source entry for the Linear Agent loop allowlist.' (OrganizationLinearAgentTrustedSourcesAllowlistEntryInput)

feat(schema): [non_breaking] Input field 'OrganizationSecuritySettingsInput.automationManagementRole' description changed from 'The minimum role required to manage workspace automations.' to 'The minimum role required to manage workspace loops.' (OrganizationSecuritySettingsInput.automationManagementRole)

feat(schema): [non_breaking] Input field 'OrganizationUpdateInput.agentAutomationEnabled' description changed from '[INTERNAL] Whether the workspace has enabled agent automation.' to '[INTERNAL] Whether the workspace has enabled agent loops.' (OrganizationUpdateInput.agentAutomationEnabled)

feat(schema): [non_breaking] Field 'initiativeLeadTeamChangeImpact' was added to object type 'Query' (Query.initiativeLeadTeamChangeImpact)

feat(schema): [non_breaking] Field 'initiativesEnabled' was added to object type 'Team' (Team.initiativesEnabled)

feat(schema): [non_breaking] Input field 'TeamSecuritySettingsInput.automationManagement' description changed from 'The minimum team role required to manage automations in the team.' to 'The minimum team role required to manage loops in the team.' (TeamSecuritySettingsInput.automationManagement)

feat(schema): [non_breaking] Field 'showTeamReviews' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showTeamReviews)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.automationFieldLastExecuted' description changed from 'Whether to show the automation last executed field.' to 'Whether to show the loop last executed field.' (ViewPreferencesValues.automationFieldLastExecuted)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.automationFieldStats' description changed from 'Whether to show the automation status field.' to 'Whether to show the loop status field.' (ViewPreferencesValues.automationFieldStats)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.automationFieldTeam' description changed from 'Whether to show the automation team field.' to 'Whether to show the loop team field.' (ViewPreferencesValues.automationFieldTeam)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.automationFieldTrigger' description changed from 'Whether to show the automation trigger field.' to 'Whether to show the loop trigger field.' (ViewPreferencesValues.automationFieldTrigger)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.automationGrouping' description changed from 'The automation grouping.' to 'The loop grouping.' (ViewPreferencesValues.automationGrouping)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.automationOrdering' description changed from 'The automation ordering.' to 'The loop ordering.' (ViewPreferencesValues.automationOrdering)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.automationShowDescendants' description changed from 'Whether to show sub-team automations.' to 'Whether to show sub-team loops.' (ViewPreferencesValues.automationShowDescendants)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.automationStatsPeriod' description changed from 'The automation stats period.' to 'The loop stats period.' (ViewPreferencesValues.automationStatsPeriod)

feat(schema): [non_breaking] Field 'applyToSubTeams' was added to object type 'WorkflowDefinition' (WorkflowDefinition.applyToSubTeams)