---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'eq' was removed from input object type 'SourceMetadataComparator' (SourceMetadataComparator.eq)

feat(schema): [breaking] Input field 'in' was removed from input object type 'SourceMetadataComparator' (SourceMetadataComparator.in)

feat(schema): [breaking] Input field 'neq' was removed from input object type 'SourceMetadataComparator' (SourceMetadataComparator.neq)

feat(schema): [breaking] Input field 'nin' was removed from input object type 'SourceMetadataComparator' (SourceMetadataComparator.nin)

feat(schema): [dangerous] Enum value 'RestoreEntity' was added to enum 'AiConversationTool' (AiConversationTool.RestoreEntity)

feat(schema): [dangerous] Member 'AiConversationRestoreEntityToolCall' was added to Union type 'AiConversationToolCall' (AiConversationToolCall)

feat(schema): [dangerous] Input field 'initiative' was added to input object type 'CommentCollectionFilter' (CommentCollectionFilter.initiative)

feat(schema): [dangerous] Input field 'project' was added to input object type 'CommentCollectionFilter' (CommentCollectionFilter.project)

feat(schema): [dangerous] Input field 'initiativeId' was added to input object type 'CommentCreateInput' (CommentCreateInput.initiativeId)

feat(schema): [dangerous] Input field 'projectId' was added to input object type 'CommentCreateInput' (CommentCreateInput.projectId)

feat(schema): [dangerous] Input field 'initiative' was added to input object type 'CommentFilter' (CommentFilter.initiative)

feat(schema): [dangerous] Input field 'project' was added to input object type 'CommentFilter' (CommentFilter.project)

feat(schema): [dangerous] Input field 'sessionId' was added to input object type 'EmailUserAccountAuthChallengeInput' (EmailUserAccountAuthChallengeInput.sessionId)

feat(schema): [dangerous] Input field 'sessionId' was added to input object type 'GoogleUserAccountAuthInput' (GoogleUserAccountAuthInput.sessionId)

feat(schema): [dangerous] Argument 'clearAttachment: Boolean' added to field 'Mutation.customerNeedUpdate' (Mutation.customerNeedUpdate.clearAttachment)

feat(schema): [dangerous] Input field 'initiative' was added to input object type 'NullableCommentFilter' (NullableCommentFilter.initiative)

feat(schema): [dangerous] Input field 'project' was added to input object type 'NullableCommentFilter' (NullableCommentFilter.project)

feat(schema): [dangerous] Input field 'authSettings' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.authSettings)

feat(schema): [dangerous] Enum value 'tryCodexDismissed' was added to enum 'UserFlagType' (UserFlagType.tryCodexDismissed)

feat(schema): [dangerous] Enum value 'tryCursorDismissed' was added to enum 'UserFlagType' (UserFlagType.tryCursorDismissed)

feat(schema): [dangerous] Enum value 'focus' was added to enum 'ViewType' (ViewType.focus)

feat(schema): [non_breaking] Type 'AiConversationPartPhase' was added (AiConversationPartPhase)

feat(schema): [non_breaking] Type 'AiConversationRestoreEntityToolCall' was added (AiConversationRestoreEntityToolCall)

feat(schema): [non_breaking] Type 'AiConversationRestoreEntityToolCallArgs' was added (AiConversationRestoreEntityToolCallArgs)

feat(schema): [non_breaking] Type 'NullableInitiativeFilter' was added (NullableInitiativeFilter)

feat(schema): [non_breaking] Type 'OrganizationAuthSettingsInput' was added (OrganizationAuthSettingsInput)

feat(schema): [non_breaking] Field 'endedAt' was added to object type 'AiConversationPartMetadata' (AiConversationPartMetadata.endedAt)

feat(schema): [non_breaking] Field 'phase' was added to object type 'AiConversationPartMetadata' (AiConversationPartMetadata.phase)

feat(schema): [non_breaking] Field 'startedAt' was added to object type 'AiConversationPartMetadata' (AiConversationPartMetadata.startedAt)

feat(schema): [non_breaking] Field 'authSettings' was added to object type 'AuthOrganization' (AuthOrganization.authSettings)

feat(schema): [non_breaking] Field 'AuthOrganization.allowedAuthServices' is deprecated (AuthOrganization.allowedAuthServices)

feat(schema): [non_breaking] Field 'AuthOrganization.allowedAuthServices' has deprecation reason 'Use authSettings.allowedAuthServices instead.' (AuthOrganization.allowedAuthServices)

feat(schema): [non_breaking] Field 'temporalWorkflowUrl' was added to object type 'CodingAgentSandboxPayload' (CodingAgentSandboxPayload.temporalWorkflowUrl)

feat(schema): [non_breaking] Field 'initiative' was added to object type 'Comment' (Comment.initiative)

feat(schema): [non_breaking] Field 'initiativeId' was added to object type 'Comment' (Comment.initiativeId)

feat(schema): [non_breaking] Field 'project' was added to object type 'Comment' (Comment.project)

feat(schema): [non_breaking] Field 'projectId' was added to object type 'Comment' (Comment.projectId)

feat(schema): [non_breaking] Description 'A comment associated with an issue.' on type 'Comment' has changed to 'A comment associated with an entity.' (Comment)

feat(schema): [non_breaking] Field 'initiativeId' was added to object type 'CommentChildWebhookPayload' (CommentChildWebhookPayload.initiativeId)

feat(schema): [non_breaking] Field 'projectId' was added to object type 'CommentChildWebhookPayload' (CommentChildWebhookPayload.projectId)

feat(schema): [non_breaking] Field 'initiativeId' was added to object type 'CommentWebhookPayload' (CommentWebhookPayload.initiativeId)

feat(schema): [non_breaking] Field 'projectId' was added to object type 'CommentWebhookPayload' (CommentWebhookPayload.projectId)

feat(schema): [non_breaking] Field 'summary' was added to object type 'Document' (Document.summary)

feat(schema): [non_breaking] Field 'summary' was added to object type 'DocumentSearchResult' (DocumentSearchResult.summary)

feat(schema): [non_breaking] Field 'projectCreateSlackChannel' was added to object type 'Mutation' (Mutation.projectCreateSlackChannel)

feat(schema): [non_breaking] Field 'Mutation.updateIntegrationSlackScopes' description changed from '[Internal] Updates existing Slack integration scopes.' to '[Internal] Updates existing Slack and Asks integration scopes.' (Mutation.updateIntegrationSlackScopes)

feat(schema): [non_breaking] Field 'authSettings' was added to object type 'Organization' (Organization.authSettings)

feat(schema): [non_breaking] Field 'Organization.allowedAuthServices' is deprecated (Organization.allowedAuthServices)

feat(schema): [non_breaking] Field 'Organization.allowedAuthServices' has deprecation reason 'Use authSettings.allowedAuthServices instead.' (Organization.allowedAuthServices)

feat(schema): [non_breaking] Field 'Organization.hideNonPrimaryOrganizations' is deprecated (Organization.hideNonPrimaryOrganizations)

feat(schema): [non_breaking] Field 'Organization.hideNonPrimaryOrganizations' has deprecation reason 'Use authSettings.hideNonPrimaryOrganizations instead.' (Organization.hideNonPrimaryOrganizations)

feat(schema): [non_breaking] Field 'url' was added to object type 'ReleasePipeline' (ReleasePipeline.url)

feat(schema): [non_breaking] Field 'focusViewGrouping' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.focusViewGrouping)

feat(schema): [non_breaking] Field 'focusViewOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.focusViewOrdering)

feat(schema): [non_breaking] Field 'focusViewOrderingDirection' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.focusViewOrderingDirection)

feat(schema): [non_breaking] Field 'slugId' was added to object type 'WorkflowDefinition' (WorkflowDefinition.slugId)