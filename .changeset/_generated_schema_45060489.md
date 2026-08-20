---
"@linear/sdk": major
---


feat(schema): [breaking] Enum value 'featureDisabled' was removed from enum 'AiConversationErrorType' (AiConversationErrorType.featureDisabled)

feat(schema): [breaking] Input field 'statusNamesPerIssueType' was removed from input object type 'JiraSettingsInput' (JiraSettingsInput.statusNamesPerIssueType)

feat(schema): [dangerous] Enum value 'mcpServerConnection' was added to enum 'AiConversationElicitationKind' (AiConversationElicitationKind.mcpServerConnection)

feat(schema): [dangerous] Enum value 'AiPromptRules' was added to enum 'AiConversationEntityCardWidgetArgsType' (AiConversationEntityCardWidgetArgsType.AiPromptRules)

feat(schema): [dangerous] Enum value 'AiPromptRules' was added to enum 'AiConversationEntityListWidgetArgsEntitiesType' (AiConversationEntityListWidgetArgsEntitiesType.AiPromptRules)

feat(schema): [dangerous] Member 'AiConversationElicitationResponsePart' was added to Union type 'AiConversationPart' (AiConversationPart)

feat(schema): [dangerous] Enum value 'elicitationResponse' was added to enum 'AiConversationPartType' (AiConversationPartType.elicitationResponse)

feat(schema): [dangerous] Input field 'searchableContent' was added to input object type 'DocumentFilter' (DocumentFilter.searchableContent)

feat(schema): [dangerous] Input field 'repositoriesSyncedAt' was added to input object type 'GitHubImportSettingsInput' (GitHubImportSettingsInput.repositoriesSyncedAt)

feat(schema): [dangerous] Input field 'repositoryCount' was added to input object type 'GitHubImportSettingsInput' (GitHubImportSettingsInput.repositoryCount)

feat(schema): [dangerous] Input field 'projectStatuses' was added to input object type 'InheritanceEntityMapping' (InheritanceEntityMapping.projectStatuses)

feat(schema): [dangerous] Input field 'adminManagementRole' was added to input object type 'OrganizationSecuritySettingsInput' (OrganizationSecuritySettingsInput.adminManagementRole)

feat(schema): [dangerous] Input field 'teamId' was added to input object type 'ProjectStatusCreateInput' (ProjectStatusCreateInput.teamId)

feat(schema): [dangerous] Input field 'postAssignmentUpdates' was added to input object type 'SlackChannelNameMappingInput' (SlackChannelNameMappingInput.postAssignmentUpdates)

feat(schema): [dangerous] Input field 'postSlaUpdates' was added to input object type 'SlackChannelNameMappingInput' (SlackChannelNameMappingInput.postSlaUpdates)

feat(schema): [dangerous] Input field 'inheritProjectStatuses' was added to input object type 'TeamCreateInput' (TeamCreateInput.inheritProjectStatuses)

feat(schema): [dangerous] Input field 'inheritProjectStatuses' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.inheritProjectStatuses)

feat(schema): [dangerous] Input field 'config' was added to input object type 'TimeScheduleCreateInput' (TimeScheduleCreateInput.config)

feat(schema): [dangerous] Input field 'config' was added to input object type 'TimeScheduleUpdateInput' (TimeScheduleUpdateInput.config)

feat(schema): [dangerous] Enum value 'loopEditRestrictionSpeedbumpShown' was added to enum 'UserFlagType' (UserFlagType.loopEditRestrictionSpeedbumpShown)

feat(schema): [dangerous] Input field 'priorityInboxEnabled' was added to input object type 'UserSettingsUpdateInput' (UserSettingsUpdateInput.priorityInboxEnabled)

feat(schema): [dangerous] Enum value 'automationRunHistory' was added to enum 'ViewType' (ViewType.automationRunHistory)

feat(schema): [non_breaking] Type 'AiConversationElicitationResponseData' was added (AiConversationElicitationResponseData)

feat(schema): [non_breaking] Type 'AiConversationElicitationResponsePart' was added (AiConversationElicitationResponsePart)

feat(schema): [non_breaking] Type 'AiConversationMcpServerConnectionElicitationResponseData' was added (AiConversationMcpServerConnectionElicitationResponseData)

feat(schema): [non_breaking] Type 'AiConversationMcpServerConnectionScope' was added (AiConversationMcpServerConnectionScope)

feat(schema): [non_breaking] Type 'AiConversationMcpServerConnectionScopeType' was added (AiConversationMcpServerConnectionScopeType)

feat(schema): [non_breaking] Type 'AiConversationMultipleChoiceElicitationResponseData' was added (AiConversationMultipleChoiceElicitationResponseData)

feat(schema): [non_breaking] Type 'JiraProjectStatusesPayload' was added (JiraProjectStatusesPayload)

feat(schema): [non_breaking] Type 'PartnerOfferCategory' was added (PartnerOfferCategory)

feat(schema): [non_breaking] Type 'PartnerProgramPartnerPayload' was added (PartnerProgramPartnerPayload)

feat(schema): [non_breaking] Type 'TimeScheduleConfig' was added (TimeScheduleConfig)

feat(schema): [non_breaking] Type 'TimeScheduleConfigInput' was added (TimeScheduleConfigInput)

feat(schema): [non_breaking] Field 'AgentSession.workspaceDiff' description changed from '[Internal] The coding agent's live working-tree diff metadata (changes not yet pushed to origin), reported by the sandbox. Per-file content is fetched on demand from the workspace-diff-blob route. Null when in sync.' to '[Internal] Legacy live working-tree diff metadata. Null when the sandbox is in sync.' (AgentSession.workspaceDiff)

feat(schema): [non_breaking] Field 'AgentSession.workspaceDiff' is deprecated (AgentSession.workspaceDiff)

feat(schema): [non_breaking] Field 'AgentSession.workspaceDiff' has deprecation reason 'Use the session's Diff model instead.' (AgentSession.workspaceDiff)

feat(schema): [non_breaking] Field 'AgentSession.workspaceDiffFiles' description changed from '[Internal] Per-file list of the agent's live working-tree diff at the given content hash. Served behind a repository-read-access gate (the synced summary carries only aggregate counts); null when the requester lacks repository access or there is no current diff.' to '[Internal] Legacy per-file metadata for the agent session's live working-tree diff.' (AgentSession.workspaceDiffFiles)

feat(schema): [non_breaking] Description for argument 'contentHash' on field 'AgentSession.workspaceDiffFiles' changed from 'The diff's content hash, from the session's `workspaceDiff`.' to 'The diff content hash from workspaceDiff.' (AgentSession.workspaceDiffFiles.contentHash)

feat(schema): [non_breaking] Field 'AiConversationElicitationOption.prompt' description changed from 'The prompt sent as a normal user reply when selected.' to 'The user prompt rendered to the agent when this option is selected.' (AiConversationElicitationOption.prompt)

feat(schema): [non_breaking] Field 'integrationId' was added to object type 'AiConversationElicitationPart' (AiConversationElicitationPart.integrationId)

feat(schema): [non_breaking] Field 'scope' was added to object type 'AiConversationElicitationPart' (AiConversationElicitationPart.scope)

feat(schema): [non_breaking] Field 'serverUrl' was added to object type 'AiConversationElicitationPart' (AiConversationElicitationPart.serverUrl)

feat(schema): [non_breaking] Description 'A lightweight question or choice prompt shown with an AI conversation.' on type 'AiConversationElicitationPart' has changed to 'A structured request for user input shown with an AI conversation.' (AiConversationElicitationPart)

feat(schema): [non_breaking] Field 'subscribers' was added to object type 'Document' (Document.subscribers)

feat(schema): [non_breaking] Field 'subscribers' was added to object type 'DocumentSearchResult' (DocumentSearchResult.subscribers)

feat(schema): [non_breaking] Field 'Initiative.leadTeam' description changed from '[ALPHA] The team that leads the initiative. Null if no lead team is assigned.' to 'The team that leads the initiative. Null if no lead team is assigned.' (Initiative.leadTeam)

feat(schema): [non_breaking] Field 'Initiative.visibility' description changed from '[ALPHA] The visibility of the initiative, derived from its lead team. Public when no lead team is assigned.' to 'The visibility of the initiative, derived from its lead team. Public when no lead team is assigned.' (Initiative.visibility)

feat(schema): [non_breaking] Input field 'InitiativeCollectionFilter.leadTeam' description changed from '[ALPHA] Filters that the initiative lead team must satisfy.' to 'Filters that the initiative lead team must satisfy.' (InitiativeCollectionFilter.leadTeam)

feat(schema): [non_breaking] Input field 'InitiativeCreateInput.leadTeamId' description changed from '[ALPHA] The team that leads the initiative.' to 'The team that leads the initiative.' (InitiativeCreateInput.leadTeamId)

feat(schema): [non_breaking] Input field 'InitiativeFilter.leadTeam' description changed from '[ALPHA] Filters that the initiative lead team must satisfy.' to 'Filters that the initiative lead team must satisfy.' (InitiativeFilter.leadTeam)

feat(schema): [non_breaking] Input field 'InitiativeUpdateInput.leadTeamId' description changed from '[ALPHA] The team that leads the initiative. Set to null to clear.' to 'The team that leads the initiative. Set to null to clear.' (InitiativeUpdateInput.leadTeamId)

feat(schema): [non_breaking] Field 'Mutation.integrationJiraFetchProjectStatuses' description changed from '[INTERNAL] Fetches Jira project statuses and stores them in integration settings.' to '[INTERNAL] Fetches Jira project statuses for the status mapping settings UI.' (Mutation.integrationJiraFetchProjectStatuses)

feat(schema): [non_breaking] Field 'Mutation.integrationJiraFetchProjectStatuses' is deprecated (Mutation.integrationJiraFetchProjectStatuses)

feat(schema): [non_breaking] Field 'Mutation.integrationJiraFetchProjectStatuses' has deprecation reason 'Use the `integrationJiraProjectStatuses` query instead.' (Mutation.integrationJiraFetchProjectStatuses)

feat(schema): [non_breaking] Input field 'NullableInitiativeFilter.leadTeam' description changed from '[ALPHA] Filters that the initiative lead team must satisfy.' to 'Filters that the initiative lead team must satisfy.' (NullableInitiativeFilter.leadTeam)

feat(schema): [non_breaking] Field 'ProjectStatus.team' description changed from '[Internal] The team that the status is scoped to. If null, the status is a workspace-level status available to all teams in the workspace.' to '[Internal] The team that the status is scoped to. If null, the status is a workspace-level status.' (ProjectStatus.team)

feat(schema): [non_breaking] Field 'nativeStackId' was added to object type 'PullRequest' (PullRequest.nativeStackId)

feat(schema): [non_breaking] Field 'nativeStackNumber' was added to object type 'PullRequest' (PullRequest.nativeStackNumber)

feat(schema): [non_breaking] Field 'nativeStackPosition' was added to object type 'PullRequest' (PullRequest.nativeStackPosition)

feat(schema): [non_breaking] Field 'nativeStackSize' was added to object type 'PullRequest' (PullRequest.nativeStackSize)

feat(schema): [non_breaking] Field 'nativeStackTargetBranch' was added to object type 'PullRequest' (PullRequest.nativeStackTargetBranch)

feat(schema): [non_breaking] Field 'committerExternalUserId' was added to object type 'PullRequestCommit' (PullRequestCommit.committerExternalUserId)

feat(schema): [non_breaking] Field 'committerUserId' was added to object type 'PullRequestCommit' (PullRequestCommit.committerUserId)

feat(schema): [non_breaking] Field 'integrationJiraProjectStatuses' was added to object type 'Query' (Query.integrationJiraProjectStatuses)

feat(schema): [non_breaking] Field 'partnerProgramPartners' was added to object type 'Query' (Query.partnerProgramPartners)

feat(schema): [non_breaking] Field 'postAssignmentUpdates' was added to object type 'SlackChannelNameMapping' (SlackChannelNameMapping.postAssignmentUpdates)

feat(schema): [non_breaking] Field 'postSlaUpdates' was added to object type 'SlackChannelNameMapping' (SlackChannelNameMapping.postSlaUpdates)

feat(schema): [non_breaking] Field 'inheritProjectStatuses' was added to object type 'Team' (Team.inheritProjectStatuses)

feat(schema): [non_breaking] Field 'Team.initiativesEnabled' description changed from '[ALPHA] Whether team initiatives are enabled and shown in the team's sidebar.' to 'Whether team initiatives are enabled and shown in the team's sidebar.' (Team.initiativesEnabled)

feat(schema): [non_breaking] Input field 'TeamCreateInput.initiativesEnabled' description changed from '[ALPHA] Whether initiatives are shown in the team's sidebar.' to 'Whether initiatives are shown in the team's sidebar.' (TeamCreateInput.initiativesEnabled)

feat(schema): [non_breaking] Input field 'TeamUpdateInput.initiativesEnabled' description changed from '[ALPHA] Whether initiatives are shown in the team's sidebar.' to 'Whether initiatives are shown in the team's sidebar.' (TeamUpdateInput.initiativesEnabled)

feat(schema): [non_breaking] Field 'config' was added to object type 'TimeSchedule' (TimeSchedule.config)

feat(schema): [non_breaking] Field 'resolvedAt' was added to object type 'UsageAlert' (UsageAlert.resolvedAt)

feat(schema): [non_breaking] Field 'automationRunHistoryShowDuration' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.automationRunHistoryShowDuration)

feat(schema): [non_breaking] Field 'automationRunHistoryShowIssueIdentifier' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.automationRunHistoryShowIssueIdentifier)

feat(schema): [non_breaking] Field 'documentFieldCreator' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.documentFieldCreator)

feat(schema): [non_breaking] Field 'documentFieldDateCreated' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.documentFieldDateCreated)

feat(schema): [non_breaking] Field 'documentFieldDateUpdated' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.documentFieldDateUpdated)

feat(schema): [non_breaking] Field 'documentFieldOwner' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.documentFieldOwner)

feat(schema): [non_breaking] Field 'documentFieldParent' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.documentFieldParent)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.focusViewGrouping' is deprecated (ViewPreferencesValues.focusViewGrouping)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.focusViewGrouping' has deprecation reason 'No longer available' (ViewPreferencesValues.focusViewGrouping)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.focusViewOrdering' is deprecated (ViewPreferencesValues.focusViewOrdering)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.focusViewOrdering' has deprecation reason 'No longer available' (ViewPreferencesValues.focusViewOrdering)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.focusViewOrderingDirection' is deprecated (ViewPreferencesValues.focusViewOrderingDirection)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.focusViewOrderingDirection' has deprecation reason 'No longer available' (ViewPreferencesValues.focusViewOrderingDirection)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.showTeamInitiatives' description changed from '[ALPHA] Whether to show team-level initiatives in the workspace.' to 'Whether to show team-level initiatives in the workspace.' (ViewPreferencesValues.showTeamInitiatives)

feat(schema): [non_breaking] Enum value 'ViewType.focus' was deprecated with reason 'No longer available' (ViewType.focus)

feat(schema): [non_breaking] Field 'restrictEditing' was added to object type 'WorkflowDefinition' (WorkflowDefinition.restrictEditing)