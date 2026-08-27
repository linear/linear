---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'FetchDataPayload' was removed (FetchDataPayload)

feat(schema): [breaking] Field 'DocumentContentHistoryCheckpointType.sourceMetadata' changed type from 'JSON' to 'JSONObject' (DocumentContentHistoryCheckpointType.sourceMetadata)

feat(schema): [breaking] Field 'DocumentContentHistoryType.contentData' changed type from 'JSON' to 'JSONObject' (DocumentContentHistoryType.contentData)

feat(schema): [breaking] Field 'DocumentContentHistoryType.metadata' changed type from 'JSON' to 'JSONObject' (DocumentContentHistoryType.metadata)

feat(schema): [breaking] Field 'fetchData' was removed from object type 'Query' (Query.fetchData)

feat(schema): [dangerous] Enum value 'AgentSession' was added to enum 'AiConversationEntityListWidgetArgsEntitiesType' (AiConversationEntityListWidgetArgsEntitiesType.AgentSession)

feat(schema): [dangerous] Enum value 'PostChatMessage' was added to enum 'AiConversationTool' (AiConversationTool.PostChatMessage)

feat(schema): [dangerous] Enum value 'ReadSetting' was added to enum 'AiConversationTool' (AiConversationTool.ReadSetting)

feat(schema): [dangerous] Enum value 'SearchSettings' was added to enum 'AiConversationTool' (AiConversationTool.SearchSettings)

feat(schema): [dangerous] Member 'AiConversationPostChatMessageToolCall' was added to Union type 'AiConversationToolCall' (AiConversationToolCall)

feat(schema): [dangerous] Member 'AiConversationReadSettingToolCall' was added to Union type 'AiConversationToolCall' (AiConversationToolCall)

feat(schema): [dangerous] Member 'AiConversationSearchSettingsToolCall' was added to Union type 'AiConversationToolCall' (AiConversationToolCall)

feat(schema): [dangerous] Member 'AiConversationSettingWidget' was added to Union type 'AiConversationWidget' (AiConversationWidget)

feat(schema): [dangerous] Enum value 'Setting' was added to enum 'AiConversationWidgetName' (AiConversationWidgetName.Setting)

feat(schema): [dangerous] Enum value 'workflowDefinition' was added to enum 'NotificationSubscriptionType' (NotificationSubscriptionType.workflowDefinition)

feat(schema): [dangerous] Input field 'team' was added to input object type 'ProjectStatusFilter' (ProjectStatusFilter.team)

feat(schema): [dangerous] Input field 'enableLoops' was added to input object type 'SlackSettingsInput' (SlackSettingsInput.enableLoops)

feat(schema): [dangerous] Input field 'inboxBadgeScope' was added to input object type 'UserSettingsUpdateInput' (UserSettingsUpdateInput.inboxBadgeScope)

feat(schema): [dangerous] Enum value 'cycleEnded' was added to enum 'WorkflowTrigger' (WorkflowTrigger.cycleEnded)

feat(schema): [dangerous] Enum value 'cycleStarted' was added to enum 'WorkflowTrigger' (WorkflowTrigger.cycleStarted)

feat(schema): [dangerous] Enum value 'cycle' was added to enum 'WorkflowTriggerType' (WorkflowTriggerType.cycle)

feat(schema): [non_breaking] Type 'AiConversationPostChatMessageToolCall' was added (AiConversationPostChatMessageToolCall)

feat(schema): [non_breaking] Type 'AiConversationPostChatMessageToolCallArgs' was added (AiConversationPostChatMessageToolCallArgs)

feat(schema): [non_breaking] Type 'AiConversationPostChatMessageToolCallArgsPlatform' was added (AiConversationPostChatMessageToolCallArgsPlatform)

feat(schema): [non_breaking] Type 'AiConversationReadSettingToolCall' was added (AiConversationReadSettingToolCall)

feat(schema): [non_breaking] Type 'AiConversationReadSettingToolCallArgs' was added (AiConversationReadSettingToolCallArgs)

feat(schema): [non_breaking] Type 'AiConversationSearchSettingsToolCall' was added (AiConversationSearchSettingsToolCall)

feat(schema): [non_breaking] Type 'AiConversationSearchSettingsToolCallArgs' was added (AiConversationSearchSettingsToolCallArgs)

feat(schema): [non_breaking] Type 'AiConversationSettingWidget' was added (AiConversationSettingWidget)

feat(schema): [non_breaking] Type 'AiConversationSettingWidgetArgs' was added (AiConversationSettingWidgetArgs)

feat(schema): [non_breaking] Type 'AiConversationSettingWidgetArgsTarget' was added (AiConversationSettingWidgetArgsTarget)

feat(schema): [non_breaking] Type 'DraftGenerationMetadata' was added (DraftGenerationMetadata)

feat(schema): [non_breaking] Type 'DraftUpdateHealthType' was added (DraftUpdateHealthType)

feat(schema): [non_breaking] Type 'InboxBadgeScope' was added (InboxBadgeScope)

feat(schema): [non_breaking] Type 'Meeting' was added (Meeting)

feat(schema): [non_breaking] Type 'MeetingAnalysisStatus' was added (MeetingAnalysisStatus)

feat(schema): [non_breaking] Type 'UsageAlertConnection' was added (UsageAlertConnection)

feat(schema): [non_breaking] Type 'UsageAlertEdge' was added (UsageAlertEdge)

feat(schema): [non_breaking] Type 'UsageAlertFilter' was added (UsageAlertFilter)

feat(schema): [non_breaking] Type 'UsageAlertType' was added (UsageAlertType)

feat(schema): [non_breaking] Type 'UsageAlertTypeComparator' was added (UsageAlertTypeComparator)

feat(schema): [non_breaking] Type 'WorkflowDefinitionEditAccess' was added (WorkflowDefinitionEditAccess)

feat(schema): [non_breaking] Field 'modelSelection' was added to object type 'AgentSession' (AgentSession.modelSelection)

feat(schema): [non_breaking] Field 'summary' was added to object type 'AiConversationAckPart' (AiConversationAckPart.summary)

feat(schema): [non_breaking] Field 'createdEntities' was added to object type 'AiConversationCreateEntityToolCallResult' (AiConversationCreateEntityToolCallResult.createdEntities)

feat(schema): [non_breaking] Field 'Customer.approximateNeedCount' description changed from 'The approximate count of customer needs (requests) associated with this customer. This is a denormalized counter and may not reflect the exact count at all times.' to 'The approximate number of distinct requests associated with this customer, deduplicated per issue or project. This is a denormalized counter and may not reflect the exact count at all times.' (Customer.approximateNeedCount)

feat(schema): [non_breaking] Field 'actorInactive' was added to object type 'CustomerNeedNotification' (CustomerNeedNotification.actorInactive)

feat(schema): [non_breaking] Field 'actorInactive' was added to object type 'CustomerNotification' (CustomerNotification.actorInactive)

feat(schema): [non_breaking] Field 'CustomerWebhookPayload.approximateNeedCount' description changed from 'The approximate number of needs of the customer.' to 'The approximate number of distinct requests associated with this customer, deduplicated per issue or project. This is a denormalized counter and may not reflect the exact count at all times.' (CustomerWebhookPayload.approximateNeedCount)

feat(schema): [non_breaking] Field 'meeting' was added to object type 'DocumentContent' (DocumentContent.meeting)

feat(schema): [non_breaking] Field 'actorInactive' was added to object type 'DocumentNotification' (DocumentNotification.actorInactive)

feat(schema): [non_breaking] Field 'generationMetadata' was added to object type 'Draft' (Draft.generationMetadata)

feat(schema): [non_breaking] Field 'updateHealth' was added to object type 'Draft' (Draft.updateHealth)

feat(schema): [non_breaking] Deprecation reason on field 'Draft.isAutogenerated' has changed from 'Use 'data.generationMetadata' instead' to 'Use 'generationMetadata' instead' (Draft.isAutogenerated)

feat(schema): [non_breaking] Field 'actorInactive' was added to object type 'InitiativeNotification' (InitiativeNotification.actorInactive)

feat(schema): [non_breaking] Field 'relations' was added to object type 'IssueDraft' (IssueDraft.relations)

feat(schema): [non_breaking] Field 'actorInactive' was added to object type 'IssueNotification' (IssueNotification.actorInactive)

feat(schema): [non_breaking] Field 'Mutation.issueBatchCreate' description changed from 'Creates a list of issues in one transaction.' to 'Creates a list of issues atomically.' (Mutation.issueBatchCreate)

feat(schema): [non_breaking] Field 'actorInactive' was added to interface 'Notification' (Notification.actorInactive)

feat(schema): [non_breaking] Field 'actorInactive' was added to object type 'OauthClientApprovalNotification' (OauthClientApprovalNotification.actorInactive)

feat(schema): [non_breaking] Field 'actorInactive' was added to object type 'PostNotification' (PostNotification.actorInactive)

feat(schema): [non_breaking] Field 'actorInactive' was added to object type 'ProductAnnouncementNotification' (ProductAnnouncementNotification.actorInactive)

feat(schema): [non_breaking] Field 'Project.identifier' description changed from '[Internal] The human-readable identifier of the project. Returns the custom identifier override when set, otherwise the workspace default `<prefix>-<number>`. Null for legacy projects that have not been backfilled.' to '[Internal] The human-readable identifier of the project. Returns the custom identifier override when set, otherwise the default `P-<leadTeamKey>-<number>`. Null for projects without a lead team and for legacy projects that have not been backfilled.' (Project.identifier)

feat(schema): [non_breaking] Field 'actorInactive' was added to object type 'ProjectNotification' (ProjectNotification.actorInactive)

feat(schema): [non_breaking] Field 'ProjectSearchResult.identifier' description changed from '[Internal] The human-readable identifier of the project. Returns the custom identifier override when set, otherwise the workspace default `<prefix>-<number>`. Null for legacy projects that have not been backfilled.' to '[Internal] The human-readable identifier of the project. Returns the custom identifier override when set, otherwise the default `P-<leadTeamKey>-<number>`. Null for projects without a lead team and for legacy projects that have not been backfilled.' (ProjectSearchResult.identifier)

feat(schema): [non_breaking] Field 'mergedByExternalUser' was added to object type 'PullRequest' (PullRequest.mergedByExternalUser)

feat(schema): [non_breaking] Field 'mergedByUser' was added to object type 'PullRequest' (PullRequest.mergedByUser)

feat(schema): [non_breaking] Field 'actorInactive' was added to object type 'PullRequestNotification' (PullRequestNotification.actorInactive)

feat(schema): [non_breaking] Field 'usageAlert' was added to object type 'Query' (Query.usageAlert)

feat(schema): [non_breaking] Field 'usageAlerts' was added to object type 'Query' (Query.usageAlerts)

feat(schema): [non_breaking] Field 'UsageAlert.metadata' description changed from 'Type-specific metadata captured when the alert was triggered.' to 'Type-specific snapshot captured when the alert was triggered, keyed by the alert type — for example the credit balance and threshold for a lowBalance alert. A resolution entry is added once new usage credits have landed and cleared the alert's condition.' (UsageAlert.metadata)

feat(schema): [non_breaking] Field 'actorInactive' was added to object type 'UsageAlertNotification' (UsageAlertNotification.actorInactive)

feat(schema): [non_breaking] Field 'actorInactive' was added to object type 'WelcomeMessageNotification' (WelcomeMessageNotification.actorInactive)

feat(schema): [non_breaking] Field 'editAccess' was added to object type 'WorkflowDefinition' (WorkflowDefinition.editAccess)

feat(schema): [non_breaking] Field 'WorkflowDefinition.restrictEditing' is deprecated (WorkflowDefinition.restrictEditing)

feat(schema): [non_breaking] Field 'WorkflowDefinition.restrictEditing' has deprecation reason 'Use editAccess instead.' (WorkflowDefinition.restrictEditing)

feat(schema): [non_breaking] Field 'actorInactive' was added to object type 'WorkflowDefinitionNotification' (WorkflowDefinitionNotification.actorInactive)