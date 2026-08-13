---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'InitiativeCollectionFilter.id' changed type from 'IDComparator' to 'EntityIdentifierIDComparator' (InitiativeCollectionFilter.id)

feat(schema): [breaking] Input field 'InitiativeFilter.id' changed type from 'IDComparator' to 'EntityIdentifierIDComparator' (InitiativeFilter.id)

feat(schema): [breaking] Input field 'NullableInitiativeFilter.id' changed type from 'IDComparator' to 'EntityIdentifierIDComparator' (NullableInitiativeFilter.id)

feat(schema): [breaking] Input field 'NullableProjectFilter.id' changed type from 'IDComparator' to 'EntityIdentifierIDComparator' (NullableProjectFilter.id)

feat(schema): [breaking] Input field 'ProjectCollectionFilter.id' changed type from 'IDComparator' to 'EntityIdentifierIDComparator' (ProjectCollectionFilter.id)

feat(schema): [breaking] Input field 'ProjectFilter.id' changed type from 'IDComparator' to 'EntityIdentifierIDComparator' (ProjectFilter.id)

feat(schema): [dangerous] Enum value 'featureDisabled' was added to enum 'AiConversationErrorType' (AiConversationErrorType.featureDisabled)

feat(schema): [dangerous] Enum value 'usageLimit' was added to enum 'AiConversationErrorType' (AiConversationErrorType.usageLimit)

feat(schema): [dangerous] Enum value 'RemoveSpendLimit' was added to enum 'AiConversationTool' (AiConversationTool.RemoveSpendLimit)

feat(schema): [dangerous] Enum value 'SetSpendLimit' was added to enum 'AiConversationTool' (AiConversationTool.SetSpendLimit)

feat(schema): [dangerous] Member 'AiConversationRemoveSpendLimitToolCall' was added to Union type 'AiConversationToolCall' (AiConversationToolCall)

feat(schema): [dangerous] Member 'AiConversationSetSpendLimitToolCall' was added to Union type 'AiConversationToolCall' (AiConversationToolCall)

feat(schema): [dangerous] Input field 'liveFolderPreset' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.liveFolderPreset)

feat(schema): [dangerous] Input field 'customIdentifier' was added to input object type 'InitiativeCollectionFilter' (InitiativeCollectionFilter.customIdentifier)

feat(schema): [dangerous] Input field 'customIdentifier' was added to input object type 'InitiativeFilter' (InitiativeFilter.customIdentifier)

feat(schema): [dangerous] Argument 'accessToken: String' added to field 'Mutation.integrationZendesk' (Mutation.integrationZendesk.accessToken)

feat(schema): [dangerous] Argument 'customApiUrl: String' added to field 'Mutation.integrationZendesk' (Mutation.integrationZendesk.customApiUrl)

feat(schema): [dangerous] Input field 'customIdentifier' was added to input object type 'NullableInitiativeFilter' (NullableInitiativeFilter.customIdentifier)

feat(schema): [dangerous] Input field 'customIdentifier' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.customIdentifier)

feat(schema): [dangerous] Input field 'customIdentifier' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.customIdentifier)

feat(schema): [dangerous] Input field 'customIdentifier' was added to input object type 'ProjectFilter' (ProjectFilter.customIdentifier)

feat(schema): [dangerous] Input field 'workflowDefinitionId' was added to input object type 'SourceMetadataComparator' (SourceMetadataComparator.workflowDefinitionId)

feat(schema): [dangerous] Input field 'bearerTokenAuth' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.bearerTokenAuth)

feat(schema): [dangerous] Input field 'customApiUrl' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.customApiUrl)

feat(schema): [non_breaking] Type 'AgentAutomationUsageLimitScope' was added (AgentAutomationUsageLimitScope)

feat(schema): [non_breaking] Type 'AiConversationRemoveSpendLimitToolCall' was added (AiConversationRemoveSpendLimitToolCall)

feat(schema): [non_breaking] Type 'AiConversationRemoveSpendLimitToolCallArgs' was added (AiConversationRemoveSpendLimitToolCallArgs)

feat(schema): [non_breaking] Type 'AiConversationSetSpendLimitToolCall' was added (AiConversationSetSpendLimitToolCall)

feat(schema): [non_breaking] Type 'AiConversationSetSpendLimitToolCallArgs' was added (AiConversationSetSpendLimitToolCallArgs)

feat(schema): [non_breaking] Type 'EntityIdentifierIDComparator' was added (EntityIdentifierIDComparator)

feat(schema): [non_breaking] Type 'ReleaseChildWebhookPayload' was added (ReleaseChildWebhookPayload)

feat(schema): [non_breaking] Type 'WorkflowDefinitionIdComparator' was added (WorkflowDefinitionIdComparator)

feat(schema): [non_breaking] Field 'usageLimitResetsAt' was added to object type 'AiConversationErrorPart' (AiConversationErrorPart.usageLimitResetsAt)

feat(schema): [non_breaking] Field 'usageLimitScope' was added to object type 'AiConversationErrorPart' (AiConversationErrorPart.usageLimitScope)

feat(schema): [non_breaking] Field 'pullRequest' was added to object type 'Draft' (Draft.pullRequest)

feat(schema): [non_breaking] Field 'liveFolderDefinition' was added to object type 'Favorite' (Favorite.liveFolderDefinition)

feat(schema): [non_breaking] Field 'liveFolderPreset' was added to object type 'Favorite' (Favorite.liveFolderPreset)

feat(schema): [non_breaking] Field 'milestone' was added to object type 'IssueWebhookPayload' (IssueWebhookPayload.milestone)

feat(schema): [non_breaking] Field 'releases' was added to object type 'IssueWebhookPayload' (IssueWebhookPayload.releases)

feat(schema): [non_breaking] Description for argument 'code' on field 'Mutation.integrationZendesk' changed from 'The Zendesk OAuth code.' to 'The Zendesk OAuth code. Required unless connecting with `accessToken`.' (Mutation.integrationZendesk.code)

feat(schema): [non_breaking] Type for argument 'code' on field 'Mutation.integrationZendesk' changed from 'String!' to 'String' (Mutation.integrationZendesk.code)

feat(schema): [non_breaking] Description for argument 'redirectUri' on field 'Mutation.integrationZendesk' changed from 'The Zendesk OAuth redirect URI.' to 'The Zendesk OAuth redirect URI. Required when connecting with `code`.' (Mutation.integrationZendesk.redirectUri)

feat(schema): [non_breaking] Type for argument 'redirectUri' on field 'Mutation.integrationZendesk' changed from 'String!' to 'String' (Mutation.integrationZendesk.redirectUri)

feat(schema): [non_breaking] Description for argument 'scope' on field 'Mutation.integrationZendesk' changed from 'The Zendesk OAuth scopes.' to 'The Zendesk OAuth scopes. Required when connecting with `code`.' (Mutation.integrationZendesk.scope)

feat(schema): [non_breaking] Type for argument 'scope' on field 'Mutation.integrationZendesk' changed from 'String!' to 'String' (Mutation.integrationZendesk.scope)

feat(schema): [non_breaking] Field 'inheritedFrom' was added to object type 'ProjectStatus' (ProjectStatus.inheritedFrom)

feat(schema): [non_breaking] Field 'team' was added to object type 'ProjectStatus' (ProjectStatus.team)

feat(schema): [non_breaking] Field 'auditLogWebhookFailureEvents' was added to object type 'Query' (Query.auditLogWebhookFailureEvents)

feat(schema): [non_breaking] Field 'userSettingsUpdated' was added to object type 'Subscription' (Subscription.userSettingsUpdated)

feat(schema): [non_breaking] Field 'aiConversationId' was added to object type 'WorkflowDefinitionNotification' (WorkflowDefinitionNotification.aiConversationId)

feat(schema): [non_breaking] Input field 'ZendeskSettingsInput.url' description changed from 'The URL of the connected Zendesk organization.' to 'The URL of the connected Zendesk organization, used to link into Zendesk. API requests use `customApiUrl` when it is set.' (ZendeskSettingsInput.url)