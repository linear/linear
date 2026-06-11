---
"@linear/sdk": major
---


feat(schema): [breaking] Argument 'includeProtectedTeamIds: [String!]' was removed from field 'Mutation.createCsvExportReport' (Mutation.createCsvExportReport.includeProtectedTeamIds)

feat(schema): [breaking] Input field 'allowedAuthServices' was removed from input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.allowedAuthServices)

feat(schema): [breaking] Input field 'hideNonPrimaryOrganizations' was removed from input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.hideNonPrimaryOrganizations)

feat(schema): [dangerous] Enum value 'AgentSession' was added to enum 'AiConversationEntityCardWidgetArgsType' (AiConversationEntityCardWidgetArgsType.AgentSession)

feat(schema): [dangerous] Enum value 'onboarding' was added to enum 'AiConversationInitialSource' (AiConversationInitialSource.onboarding)

feat(schema): [dangerous] Member 'AiConversationElicitationPart' was added to Union type 'AiConversationPart' (AiConversationPart)

feat(schema): [dangerous] Enum value 'elicitation' was added to enum 'AiConversationPartType' (AiConversationPartType.elicitation)

feat(schema): [dangerous] Input field 'canceledAt' was added to input object type 'InitiativeCollectionFilter' (InitiativeCollectionFilter.canceledAt)

feat(schema): [dangerous] Input field 'priority' was added to input object type 'InitiativeCollectionFilter' (InitiativeCollectionFilter.priority)

feat(schema): [dangerous] Input field 'priority' was added to input object type 'InitiativeCreateInput' (InitiativeCreateInput.priority)

feat(schema): [dangerous] Input field 'prioritySortOrder' was added to input object type 'InitiativeCreateInput' (InitiativeCreateInput.prioritySortOrder)

feat(schema): [dangerous] Input field 'canceledAt' was added to input object type 'InitiativeFilter' (InitiativeFilter.canceledAt)

feat(schema): [dangerous] Input field 'priority' was added to input object type 'InitiativeFilter' (InitiativeFilter.priority)

feat(schema): [dangerous] Input field 'priority' was added to input object type 'InitiativeSortInput' (InitiativeSortInput.priority)

feat(schema): [dangerous] Enum value 'Canceled' was added to enum 'InitiativeStatus' (InitiativeStatus.Canceled)

feat(schema): [dangerous] Enum value 'Proposed' was added to enum 'InitiativeStatus' (InitiativeStatus.Proposed)

feat(schema): [dangerous] Input field 'priority' was added to input object type 'InitiativeUpdateInput' (InitiativeUpdateInput.priority)

feat(schema): [dangerous] Input field 'prioritySortOrder' was added to input object type 'InitiativeUpdateInput' (InitiativeUpdateInput.prioritySortOrder)

feat(schema): [dangerous] Input field 'trusted' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.trusted)

feat(schema): [dangerous] Argument 'includeRestrictedTeamIds: [String!]' added to field 'Mutation.createCsvExportReport' (Mutation.createCsvExportReport.includeRestrictedTeamIds)

feat(schema): [dangerous] Argument 'requestedScopes: [String!]' added to field 'Mutation.integrationSlack' (Mutation.integrationSlack.requestedScopes)

feat(schema): [dangerous] Argument 'requestedScopes: [String!]' added to field 'Mutation.integrationSlackAsks' (Mutation.integrationSlackAsks.requestedScopes)

feat(schema): [dangerous] Argument 'requestedScopes: [String!]' added to field 'Mutation.updateIntegrationSlackScopes' (Mutation.updateIntegrationSlackScopes.requestedScopes)

feat(schema): [dangerous] Input field 'canceledAt' was added to input object type 'NullableInitiativeFilter' (NullableInitiativeFilter.canceledAt)

feat(schema): [dangerous] Input field 'priority' was added to input object type 'NullableInitiativeFilter' (NullableInitiativeFilter.priority)

feat(schema): [dangerous] Input field 'restrictedBy' was added to input object type 'NullableTeamFilter' (NullableTeamFilter.restrictedBy)

feat(schema): [dangerous] Input field 'visibility' was added to input object type 'NullableTeamFilter' (NullableTeamFilter.visibility)

feat(schema): [dangerous] Input field 'grantTypes' was added to input object type 'OAuthApplicationCreateInput' (OAuthApplicationCreateInput.grantTypes)

feat(schema): [dangerous] Input field 'grantTypes' was added to input object type 'OAuthApplicationUpdateInput' (OAuthApplicationUpdateInput.grantTypes)

feat(schema): [dangerous] Input field 'effort' was added to input object type 'OrganizationCodingAgentSettingsInput' (OrganizationCodingAgentSettingsInput.effort)

feat(schema): [dangerous] Input field 'restrictedBy' was added to input object type 'TeamFilter' (TeamFilter.restrictedBy)

feat(schema): [dangerous] Input field 'visibility' was added to input object type 'TeamFilter' (TeamFilter.visibility)

feat(schema): [dangerous] Enum value 'initiativesCanceled' was added to enum 'ViewType' (ViewType.initiativesCanceled)

feat(schema): [dangerous] Enum value 'initiativesProposed' was added to enum 'ViewType' (ViewType.initiativesProposed)

feat(schema): [non_breaking] Type 'AgentSkill' was added (AgentSkill)

feat(schema): [non_breaking] Type 'AgentSkillConnection' was added (AgentSkillConnection)

feat(schema): [non_breaking] Type 'AgentSkillCreateInput' was added (AgentSkillCreateInput)

feat(schema): [non_breaking] Type 'AgentSkillEdge' was added (AgentSkillEdge)

feat(schema): [non_breaking] Type 'AgentSkillFilter' was added (AgentSkillFilter)

feat(schema): [non_breaking] Type 'AgentSkillPayload' was added (AgentSkillPayload)

feat(schema): [non_breaking] Type 'AgentSkillUpdateInput' was added (AgentSkillUpdateInput)

feat(schema): [non_breaking] Type 'AiConversationElicitationKind' was added (AiConversationElicitationKind)

feat(schema): [non_breaking] Type 'AiConversationElicitationOption' was added (AiConversationElicitationOption)

feat(schema): [non_breaking] Type 'AiConversationElicitationPart' was added (AiConversationElicitationPart)

feat(schema): [non_breaking] Type 'AiConversationErrorType' was added (AiConversationErrorType)

feat(schema): [non_breaking] Type 'EmailIntakeAddressRefreshSesDomainStatusPayload' was added (EmailIntakeAddressRefreshSesDomainStatusPayload)

feat(schema): [non_breaking] Type 'InitiativePrioritySort' was added (InitiativePrioritySort)

feat(schema): [non_breaking] Type 'OAuthApplicationGrantType' was added (OAuthApplicationGrantType)

feat(schema): [non_breaking] Type 'TeamVisibilityComparator' was added (TeamVisibilityComparator)

feat(schema): [non_breaking] Field 'reasonCode' was added to object type 'AgentActivityErrorContent' (AgentActivityErrorContent.reasonCode)

feat(schema): [non_breaking] Field 'codingHarnessModelLabel' was added to object type 'AgentSession' (AgentSession.codingHarnessModelLabel)

feat(schema): [non_breaking] Field 'actionSummary' was added to object type 'AiConversationEntityCardWidgetArgs' (AiConversationEntityCardWidgetArgs.actionSummary)

feat(schema): [non_breaking] Field 'snapshot' was added to object type 'AiConversationEntityCardWidgetArgs' (AiConversationEntityCardWidgetArgs.snapshot)

feat(schema): [non_breaking] Field 'snapshot' was added to object type 'AiConversationEntityListWidgetArgsEntities' (AiConversationEntityListWidgetArgsEntities.snapshot)

feat(schema): [non_breaking] Field 'errorType' was added to object type 'AiConversationErrorPart' (AiConversationErrorPart.errorType)

feat(schema): [non_breaking] Field 'invokedByUserId' was added to object type 'DocumentContentHistoryCheckpointType' (DocumentContentHistoryCheckpointType.invokedByUserId)

feat(schema): [non_breaking] Field 'isActive' was added to object type 'DocumentContentHistoryCheckpointType' (DocumentContentHistoryCheckpointType.isActive)

feat(schema): [non_breaking] Field 'canceledAt' was added to object type 'Initiative' (Initiative.canceledAt)

feat(schema): [non_breaking] Field 'priority' was added to object type 'Initiative' (Initiative.priority)

feat(schema): [non_breaking] Field 'prioritySortOrder' was added to object type 'Initiative' (Initiative.prioritySortOrder)

feat(schema): [non_breaking] Field 'Initiative.status' description changed from 'The lifecycle status of the initiative. One of Planned, Active, Completed.' to 'The lifecycle status of the initiative. One of Proposed, Planned, Active, Completed, Canceled.' (Initiative.status)

feat(schema): [non_breaking] Input field 'InitiativeCollectionFilter.status' description changed from 'Comparator for the initiative status: Planned, Active, Completed' to 'Comparator for the initiative status: Proposed, Planned, Active, Completed, Canceled' (InitiativeCollectionFilter.status)

feat(schema): [non_breaking] Input field 'InitiativeFilter.status' description changed from 'Comparator for the initiative status: Planned, Active, Completed' to 'Comparator for the initiative status: Proposed, Planned, Active, Completed, Canceled' (InitiativeFilter.status)

feat(schema): [non_breaking] Field 'canceledAt' was added to object type 'InitiativeWebhookPayload' (InitiativeWebhookPayload.canceledAt)

feat(schema): [non_breaking] Field 'agentSessions' was added to object type 'Issue' (Issue.agentSessions)

feat(schema): [non_breaking] Field 'trusted' was added to object type 'Issue' (Issue.trusted)

feat(schema): [non_breaking] Field 'agentSessions' was added to object type 'IssueSearchResult' (IssueSearchResult.agentSessions)

feat(schema): [non_breaking] Field 'trusted' was added to object type 'IssueSearchResult' (IssueSearchResult.trusted)

feat(schema): [non_breaking] Field 'agentSkillCreate' was added to object type 'Mutation' (Mutation.agentSkillCreate)

feat(schema): [non_breaking] Field 'agentSkillDelete' was added to object type 'Mutation' (Mutation.agentSkillDelete)

feat(schema): [non_breaking] Field 'agentSkillUpdate' was added to object type 'Mutation' (Mutation.agentSkillUpdate)

feat(schema): [non_breaking] Field 'emailIntakeAddressRefreshSesDomainStatus' was added to object type 'Mutation' (Mutation.emailIntakeAddressRefreshSesDomainStatus)

feat(schema): [non_breaking] Input field 'NullableInitiativeFilter.status' description changed from 'Comparator for the initiative status: Planned, Active, Completed' to 'Comparator for the initiative status: Proposed, Planned, Active, Completed, Canceled' (NullableInitiativeFilter.status)

feat(schema): [non_breaking] Input field 'NullableProjectFilter.priority' description changed from 'Comparator for the projects priority.' to 'Comparator for the project priority.' (NullableProjectFilter.priority)

feat(schema): [non_breaking] Input field 'NullableProjectFilter.status' description changed from 'Filters that the project's status must satisfy.' to 'Filters that the project status must satisfy.' (NullableProjectFilter.status)

feat(schema): [non_breaking] Input field 'NullableTeamFilter.issues' description changed from 'Filters that the teams issues must satisfy.' to 'Filters that the team's issues must satisfy.' (NullableTeamFilter.issues)

feat(schema): [non_breaking] Input field 'NullableTeamFilter.parent' description changed from 'Filters that the teams parent must satisfy.' to 'Filters that the team's parent must satisfy.' (NullableTeamFilter.parent)

feat(schema): [non_breaking] Input field 'NullableTeamFilter.private' description changed from 'Comparator for the team privacy.' to '[DEPRECATED] Comparator for the team privacy.' (NullableTeamFilter.private)

feat(schema): [non_breaking] Field 'grantTypes' was added to object type 'OAuthApplication' (OAuthApplication.grantTypes)

feat(schema): [non_breaking] Input field 'OAuthApplicationCreateInput.developerUrl' changed type from 'String!' to 'String' (OAuthApplicationCreateInput.developerUrl)

feat(schema): [non_breaking] Input field 'OrganizationCodingAgentSettingsInput.model' description changed from '[Internal] The model preference used for Coding Sessions sessions.' to '[Internal] The model preference used for Coding Sessions.' (OrganizationCodingAgentSettingsInput.model)

feat(schema): [non_breaking] Input field 'ProjectCollectionFilter.priority' description changed from 'Comparator for the projects priority.' to 'Comparator for the project priority.' (ProjectCollectionFilter.priority)

feat(schema): [non_breaking] Input field 'ProjectCollectionFilter.status' description changed from 'Filters that the project's status must satisfy.' to 'Filters that the project status must satisfy.' (ProjectCollectionFilter.status)

feat(schema): [non_breaking] Input field 'ProjectFilter.priority' description changed from 'Comparator for the projects priority.' to 'Comparator for the project priority.' (ProjectFilter.priority)

feat(schema): [non_breaking] Input field 'ProjectFilter.status' description changed from 'Filters that the project's status must satisfy.' to 'Filters that the project status must satisfy.' (ProjectFilter.status)

feat(schema): [non_breaking] Field 'agentSkill' was added to object type 'Query' (Query.agentSkill)

feat(schema): [non_breaking] Field 'agentSkills' was added to object type 'Query' (Query.agentSkills)

feat(schema): [non_breaking] Field 'pipeline' was added to object type 'ReleaseNote' (ReleaseNote.pipeline)

feat(schema): [non_breaking] Field 'ReleasePipeline.autoGenerateReleaseNotesOnCompletion' description changed from 'Whether to automatically generate a release note when a release is completed. Only applies to scheduled pipelines; ignored for continuous pipelines.' to 'Whether to automatically generate a release note when a release is completed.' (ReleasePipeline.autoGenerateReleaseNotesOnCompletion)

feat(schema): [non_breaking] Input field 'ReleasePipelineCreateInput.autoGenerateReleaseNotesOnCompletion' description changed from 'Whether to automatically generate a release note when a release is completed. Only applies to scheduled pipelines; ignored for continuous pipelines. Defaults to false.' to 'Whether to automatically generate a release note when a release is completed. Defaults to false.' (ReleasePipelineCreateInput.autoGenerateReleaseNotesOnCompletion)

feat(schema): [non_breaking] Input field 'ReleasePipelineUpdateInput.autoGenerateReleaseNotesOnCompletion' description changed from 'Whether to automatically generate a release note when a release is completed. Only applies to scheduled pipelines; ignored for continuous pipelines.' to 'Whether to automatically generate a release note when a release is completed.' (ReleasePipelineUpdateInput.autoGenerateReleaseNotesOnCompletion)

feat(schema): [non_breaking] Field 'protectedById' was added to object type 'Team' (Team.protectedById)

feat(schema): [non_breaking] Field 'Team.protectedBy' description changed from '[Internal] For protected teams, the enclosing private team that forms the visibility boundary. Null for public and private teams.' to '[Internal] For restricted teams, the enclosing private team that forms the visibility boundary.' (Team.protectedBy)

feat(schema): [non_breaking] Field 'Team.protectedBy' is deprecated (Team.protectedBy)

feat(schema): [non_breaking] Field 'Team.protectedBy' has deprecation reason 'Use restrictedBy instead.' (Team.protectedBy)

feat(schema): [non_breaking] Field 'Team.restrictedBy' description changed from '[Internal] For restricted teams, the enclosing private team that forms the visibility boundary. Alias for protectedBy.' to '[Internal] For restricted teams, the enclosing private team that forms the visibility boundary. Null for public and private teams.' (Team.restrictedBy)

feat(schema): [non_breaking] Input field 'TeamFilter.issues' description changed from 'Filters that the teams issues must satisfy.' to 'Filters that the team's issues must satisfy.' (TeamFilter.issues)

feat(schema): [non_breaking] Input field 'TeamFilter.parent' description changed from 'Filters that the teams parent must satisfy.' to 'Filters that the team's parent must satisfy.' (TeamFilter.parent)

feat(schema): [non_breaking] Input field 'TeamFilter.private' description changed from 'Comparator for the team privacy.' to '[DEPRECATED] Comparator for the team privacy.' (TeamFilter.private)

feat(schema): [non_breaking] Description 'The visibility of a team. A team can be public, private, or restricted within an enclosing private-team boundary. The protected enum value remains as a legacy alias for compatibility.' on type 'TeamVisibility' has changed to 'The visibility of a team. A team can be public, private, or restricted within an enclosing private-team boundary.' (TeamVisibility)

feat(schema): [non_breaking] Field 'initiativeFieldPriority' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativeFieldPriority)

feat(schema): [non_breaking] Field 'reviewFieldGithubTeam' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.reviewFieldGithubTeam)

feat(schema): [non_breaking] Field 'stats' was added to object type 'WorkflowDefinition' (WorkflowDefinition.stats)