---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'AiConversationCreateEntityToolCallResult.createdEntities' changed type from '[AiConversationSearchEntitiesToolCallResultEntities!]' to '[AiConversationCreateEntityToolCallResultCreatedEntities!]' (AiConversationCreateEntityToolCallResult.createdEntities)

feat(schema): [breaking] Field 'AiConversationElicitationOption.prompt' changed type from 'String!' to 'String' (AiConversationElicitationOption.prompt)

feat(schema): [dangerous] Enum value 'confirmation' was added to enum 'AiConversationElicitationKind' (AiConversationElicitationKind.confirmation)

feat(schema): [dangerous] Member 'AiConversationConfirmationElicitationResponseData' was added to Union type 'AiConversationElicitationResponseData' (AiConversationElicitationResponseData)

feat(schema): [dangerous] Input field 'workflowDefinitionId' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.workflowDefinitionId)

feat(schema): [dangerous] Input field 'serviceAccount' was added to input object type 'JiraConfigurationInput' (JiraConfigurationInput.serviceAccount)

feat(schema): [dangerous] Input field 'workspaceIntegrationId' was added to input object type 'JiraPersonalSettingsInput' (JiraPersonalSettingsInput.workspaceIntegrationId)

feat(schema): [dangerous] Input field 'isCloudServiceAccount' was added to input object type 'JiraSettingsInput' (JiraSettingsInput.isCloudServiceAccount)

feat(schema): [dangerous] Input field 'team' was added to input object type 'NullableTemplateFilter' (NullableTemplateFilter.team)

feat(schema): [dangerous] Argument 'filter: EmojiFilter' added to field 'Query.emojis' (Query.emojis.filter)

feat(schema): [dangerous] Argument 'sort: [EmojiSortInput!]' added to field 'Query.emojis' (Query.emojis.sort)

feat(schema): [dangerous] Input field 'preserveStoredCommitSha' was added to input object type 'ReleaseSyncInput' (ReleaseSyncInput.preserveStoredCommitSha)

feat(schema): [dangerous] Input field 'preserveStoredCommitSha' was added to input object type 'ReleaseSyncInputBase' (ReleaseSyncInputBase.preserveStoredCommitSha)

feat(schema): [dangerous] Input field 'description' was added to input object type 'ReleaseUpdateByPipelineInput' (ReleaseUpdateByPipelineInput.description)

feat(schema): [dangerous] Input field 'description' was added to input object type 'ReleaseUpdateByPipelineInputBase' (ReleaseUpdateByPipelineInputBase.description)

feat(schema): [non_breaking] Type 'AgentActivityExecutionSkippedReason' was added (AgentActivityExecutionSkippedReason)

feat(schema): [non_breaking] Type 'AiConversationConfirmationElicitationResponseData' was added (AiConversationConfirmationElicitationResponseData)

feat(schema): [non_breaking] Type 'AiConversationCreateEntityToolCallResultCreatedEntities' was added (AiConversationCreateEntityToolCallResultCreatedEntities)

feat(schema): [non_breaking] Type 'AiConversationDeleteEntityToolCallResult' was added (AiConversationDeleteEntityToolCallResult)

feat(schema): [non_breaking] Type 'AiConversationNotifyUsersToolCallResult' was added (AiConversationNotifyUsersToolCallResult)

feat(schema): [non_breaking] Type 'AiConversationRestoreEntityToolCallResult' was added (AiConversationRestoreEntityToolCallResult)

feat(schema): [non_breaking] Type 'EmojiCreatedAtSort' was added (EmojiCreatedAtSort)

feat(schema): [non_breaking] Type 'EmojiFilter' was added (EmojiFilter)

feat(schema): [non_breaking] Type 'EmojiSortInput' was added (EmojiSortInput)

feat(schema): [non_breaking] Type 'SLAStartMode' was added (SLAStartMode)

feat(schema): [non_breaking] Type 'TemplateFilter' was added (TemplateFilter)

feat(schema): [non_breaking] Type 'WorkflowActivationMode' was added (WorkflowActivationMode)

feat(schema): [non_breaking] Field 'type' was added to object type 'AccessKeyReleaseStage' (AccessKeyReleaseStage.type)

feat(schema): [non_breaking] Field 'executionSkippedReason' was added to object type 'AgentActivity' (AgentActivity.executionSkippedReason)

feat(schema): [non_breaking] Field 'result' was added to object type 'AiConversationDeleteEntityToolCall' (AiConversationDeleteEntityToolCall.result)

feat(schema): [non_breaking] Field 'AiConversationElicitationOption.prompt' description changed from 'The user prompt rendered to the agent when this option is selected.' to 'The user prompt rendered to the agent when this option is selected. Null when selecting the option only dismisses the elicitation without replying.' (AiConversationElicitationOption.prompt)

feat(schema): [non_breaking] Field 'AiConversationElicitationPart.options' description changed from 'Selectable prompt options for multiple-choice elicitations.' to 'The selectable actions for multiple-choice and confirmation elicitations.' (AiConversationElicitationPart.options)

feat(schema): [non_breaking] Field 'AiConversationElicitationPart.title' description changed from 'The title shown above the elicitation choices.' to 'The optional title shown above the elicitation choices.' (AiConversationElicitationPart.title)

feat(schema): [non_breaking] Field 'bodyData' was added to object type 'AiConversationElicitationResponsePart' (AiConversationElicitationResponsePart.bodyData)

feat(schema): [non_breaking] Field 'result' was added to object type 'AiConversationNotifyUsersToolCall' (AiConversationNotifyUsersToolCall.result)

feat(schema): [non_breaking] Field 'message' was added to object type 'AiConversationNotifyUsersToolCallArgs' (AiConversationNotifyUsersToolCallArgs.message)

feat(schema): [non_breaking] Field 'created' was added to object type 'AiConversationPromptCodingSessionToolCallResult' (AiConversationPromptCodingSessionToolCallResult.created)

feat(schema): [non_breaking] Field 'quotaBlocked' was added to object type 'AiConversationPromptCodingSessionToolCallResult' (AiConversationPromptCodingSessionToolCallResult.quotaBlocked)

feat(schema): [non_breaking] Field 'result' was added to object type 'AiConversationRestoreEntityToolCall' (AiConversationRestoreEntityToolCall.result)

feat(schema): [non_breaking] Field 'AiConversationSettingWidgetArgs.target' description changed from 'The resolved settings target returned by ReadSetting' to 'The settings target when the setting scope does not imply it' (AiConversationSettingWidgetArgs.target)

feat(schema): [non_breaking] Field 'updatedEntities' was added to object type 'AiConversationUpdateEntityToolCallResult' (AiConversationUpdateEntityToolCallResult.updatedEntities)

feat(schema): [non_breaking] Field 'workflowDefinition' was added to object type 'Favorite' (Favorite.workflowDefinition)

feat(schema): [non_breaking] Input field 'JiraConfigurationInput.accessToken' description changed from 'The Jira personal access token.' to 'The Jira personal access token, or the API key of a Jira Cloud service account.' (JiraConfigurationInput.accessToken)

feat(schema): [non_breaking] Input field 'JiraUpdateInput.accessToken' description changed from 'The Jira personal access token.' to 'The Jira personal access token, or the API key of a Jira Cloud service account.' (JiraUpdateInput.accessToken)

feat(schema): [non_breaking] Input field 'JiraUpdateInput.email' description changed from 'The Jira user email address associated with the personal access token.' to 'The Jira user email address associated with the access token.' (JiraUpdateInput.email)

feat(schema): [non_breaking] Field 'agentSessionRestartWithDefaultModel' was added to object type 'Mutation' (Mutation.agentSessionRestartWithDefaultModel)

feat(schema): [non_breaking] Field 'Mutation.cycleCreate' is deprecated (Mutation.cycleCreate)

feat(schema): [non_breaking] Field 'Mutation.cycleCreate' has deprecation reason 'Cycle creation is not supported.' (Mutation.cycleCreate)

feat(schema): [non_breaking] Field 'templateSearch' was added to object type 'Query' (Query.templateSearch)

feat(schema): [non_breaking] Field 'Query.latestReleaseByAccessKey' description changed from 'Returns the latest release for the pipeline associated with the access key.' to 'Returns the most recently completed or updated release for the pipeline associated with the access key.' (Query.latestReleaseByAccessKey)

feat(schema): [non_breaking] Field 'Query.recentReleasesByAccessKey' description changed from 'Returns recent releases for the pipeline associated with the access key, ordered with in-progress releases first, followed by the most recently completed releases.' to 'Returns releases for the pipeline associated with the access key, ordered with the most recently completed or updated first.' (Query.recentReleasesByAccessKey)

feat(schema): [non_breaking] Field 'startMode' was added to object type 'SlaConfiguration' (SlaConfiguration.startMode)

feat(schema): [non_breaking] Input field 'SourceMetadataComparator.null' description changed from 'Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.' to 'Null constraint. When true, matches issues without an external source: issues with no source metadata and issues created through the API, an OAuth application, or a loop. When false, matches issues created by an integration or an intake source such as email.' (SourceMetadataComparator.null)

feat(schema): [non_breaking] Field 'content' was added to object type 'Template' (Template.content)

feat(schema): [non_breaking] Field 'pullRequestMergeStrategyPreference' was added to object type 'UserSettings' (UserSettings.pullRequestMergeStrategyPreference)

feat(schema): [non_breaking] Field 'reviewFieldSla' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.reviewFieldSla)

feat(schema): [non_breaking] Field 'activationMode' was added to object type 'WorkflowDefinition' (WorkflowDefinition.activationMode)