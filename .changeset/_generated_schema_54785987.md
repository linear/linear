---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'ProjectDetailSuggestionInput' was removed (ProjectDetailSuggestionInput)

feat(schema): [breaking] Type 'ProjectDetailSuggestionPayload' was removed (ProjectDetailSuggestionPayload)

feat(schema): [breaking] Field 'Comment.bodyData' changed type from 'String!' to 'String' (Comment.bodyData)

feat(schema): [breaking] Field 'DiaryEntry.bodyData' changed type from 'String!' to 'String' (DiaryEntry.bodyData)

feat(schema): [breaking] Input field 'DiaryEntryCreateInput.date' changed type from 'TimelessDate' to 'TimelessDate!' (DiaryEntryCreateInput.date)

feat(schema): [breaking] Field 'DocumentContentHistoryType.contentData' changed type from 'JSON!' to 'JSON' (DocumentContentHistoryType.contentData)

feat(schema): [breaking] Field 'GoogleSheetsSettings.updatedIssuesAt' changed type from 'DateTime!' to 'DateTime' (GoogleSheetsSettings.updatedIssuesAt)

feat(schema): [breaking] Field 'IssueDraft.attachments' changed type from 'JSONObject!' to 'JSONObject' (IssueDraft.attachments)

feat(schema): [breaking] Field 'userSettingsFlagIncrement' was removed from object type 'Mutation' (Mutation.userSettingsFlagIncrement)

feat(schema): [breaking] Field 'Mutation.documentDelete' changed type from 'DeletePayload!' to 'DocumentArchivePayload!' (Mutation.documentDelete)

feat(schema): [breaking] Field 'NotificationDeliveryPreferencesChannel.schedule' changed type from 'NotificationDeliveryPreferencesSchedule!' to 'NotificationDeliveryPreferencesSchedule' (NotificationDeliveryPreferencesChannel.schedule)

feat(schema): [breaking] Field 'OpsgenieSettings.apiFailedWithUnauthorizedErrorAt' changed type from 'DateTime!' to 'DateTime' (OpsgenieSettings.apiFailedWithUnauthorizedErrorAt)

feat(schema): [breaking] Field 'OrganizationInvite.metadata' changed type from 'JSONObject!' to 'JSONObject' (OrganizationInvite.metadata)

feat(schema): [breaking] Input field 'linearPreviewFlags' was removed from input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.linearPreviewFlags)

feat(schema): [breaking] Field 'PagerDutySettings.apiFailedWithUnauthorizedErrorAt' changed type from 'DateTime!' to 'DateTime' (PagerDutySettings.apiFailedWithUnauthorizedErrorAt)

feat(schema): [breaking] Enum value 'activity' was removed from enum 'ProjectTab' (ProjectTab.activity)

feat(schema): [breaking] Field 'projectDetailsSuggestion' was removed from object type 'Query' (Query.projectDetailsSuggestion)

feat(schema): [breaking] Input field 'ReactionCreateInput.emoji' changed type from 'String' to 'String!' (ReactionCreateInput.emoji)

feat(schema): [breaking] Enum value 'Paused' was removed from enum 'SlaStatus' (SlaStatus.Paused)

feat(schema): [breaking] Field 'TimeSchedule.entries' changed type from '[TimeScheduleEntry!]!' to '[TimeScheduleEntry!]' (TimeSchedule.entries)

feat(schema): [breaking] Field 'UserSettingsFlagPayload.flag' changed type from 'String!' to 'String' (UserSettingsFlagPayload.flag)

feat(schema): [breaking] Field 'UserSettingsFlagPayload.value' changed type from 'Int!' to 'Int' (UserSettingsFlagPayload.value)

feat(schema): [breaking] Enum value 'customViewsPersonal' was removed from enum 'ViewType' (ViewType.customViewsPersonal)

feat(schema): [breaking] Enum value 'initiativesAll' was removed from enum 'ViewType' (ViewType.initiativesAll)

feat(schema): [breaking] Field 'WorkflowDefinition.conditions' changed type from 'JSONObject!' to 'JSONObject' (WorkflowDefinition.conditions)

feat(schema): [dangerous] Input field 'reactions' was added to input object type 'CommentCollectionFilter' (CommentCollectionFilter.reactions)

feat(schema): [dangerous] Input field 'subscriberIds' was added to input object type 'CommentCreateInput' (CommentCreateInput.subscriberIds)

feat(schema): [dangerous] Input field 'reactions' was added to input object type 'CommentFilter' (CommentFilter.reactions)

feat(schema): [dangerous] Input field 'doNotSubscribeToIssue' was added to input object type 'CommentUpdateInput' (CommentUpdateInput.doNotSubscribeToIssue)

feat(schema): [dangerous] Input field 'subscriberIds' was added to input object type 'CommentUpdateInput' (CommentUpdateInput.subscriberIds)

feat(schema): [dangerous] Input field 'targetDate' was added to input object type 'InitiativeCreateInput' (InitiativeCreateInput.targetDate)

feat(schema): [dangerous] Input field 'targetDateResolution' was added to input object type 'InitiativeCreateInput' (InitiativeCreateInput.targetDateResolution)

feat(schema): [dangerous] Input field 'targetDateResolution' was added to input object type 'InitiativeUpdateInput' (InitiativeUpdateInput.targetDateResolution)

feat(schema): [dangerous] Enum value 'launchDarkly' was added to enum 'IntegrationService' (IntegrationService.launchDarkly)

feat(schema): [dangerous] Input field 'launchDarkly' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.launchDarkly)

feat(schema): [dangerous] Input field 'slackIssueAddedToView' was added to input object type 'IntegrationsSettingsCreateInput' (IntegrationsSettingsCreateInput.slackIssueAddedToView)

feat(schema): [dangerous] Input field 'slackIssueAddedToView' was added to input object type 'IntegrationsSettingsUpdateInput' (IntegrationsSettingsUpdateInput.slackIssueAddedToView)

feat(schema): [dangerous] Input field 'reactions' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.reactions)

feat(schema): [dangerous] Input field 'reactions' was added to input object type 'IssueFilter' (IssueFilter.reactions)

feat(schema): [dangerous] Input field 'reactions' was added to input object type 'NullableCommentFilter' (NullableCommentFilter.reactions)

feat(schema): [dangerous] Input field 'reactions' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.reactions)

feat(schema): [dangerous] Input field 'hasBlockedByRelations' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.hasBlockedByRelations)

feat(schema): [dangerous] Input field 'hasBlockingRelations' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.hasBlockingRelations)

feat(schema): [dangerous] Input field 'hasDependedOnByRelations' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.hasDependedOnByRelations)

feat(schema): [dangerous] Input field 'hasDependsOnRelations' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.hasDependsOnRelations)

feat(schema): [dangerous] Input field 'hasRelatedRelations' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.hasRelatedRelations)

feat(schema): [dangerous] Input field 'projectUpdates' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.projectUpdates)

feat(schema): [dangerous] Input field 'ipRestrictions' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.ipRestrictions)

feat(schema): [dangerous] Input field 'hasBlockedByRelations' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.hasBlockedByRelations)

feat(schema): [dangerous] Input field 'hasBlockingRelations' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.hasBlockingRelations)

feat(schema): [dangerous] Input field 'hasDependedOnByRelations' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.hasDependedOnByRelations)

feat(schema): [dangerous] Input field 'hasDependsOnRelations' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.hasDependsOnRelations)

feat(schema): [dangerous] Input field 'hasRelatedRelations' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.hasRelatedRelations)

feat(schema): [dangerous] Input field 'projectUpdates' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.projectUpdates)

feat(schema): [dangerous] Input field 'hasBlockedByRelations' was added to input object type 'ProjectFilter' (ProjectFilter.hasBlockedByRelations)

feat(schema): [dangerous] Input field 'hasBlockingRelations' was added to input object type 'ProjectFilter' (ProjectFilter.hasBlockingRelations)

feat(schema): [dangerous] Input field 'hasDependedOnByRelations' was added to input object type 'ProjectFilter' (ProjectFilter.hasDependedOnByRelations)

feat(schema): [dangerous] Input field 'hasDependsOnRelations' was added to input object type 'ProjectFilter' (ProjectFilter.hasDependsOnRelations)

feat(schema): [dangerous] Input field 'hasRelatedRelations' was added to input object type 'ProjectFilter' (ProjectFilter.hasRelatedRelations)

feat(schema): [dangerous] Input field 'projectUpdates' was added to input object type 'ProjectFilter' (ProjectFilter.projectUpdates)

feat(schema): [dangerous] Input field 'reactions' was added to input object type 'ProjectUpdateFilter' (ProjectUpdateFilter.reactions)

feat(schema): [dangerous] Enum value 'initiativeOverview' was added to enum 'ViewType' (ViewType.initiativeOverview)

feat(schema): [non_breaking] Type 'AuthOrganizationBucketNamePayload' was added (AuthOrganizationBucketNamePayload)

feat(schema): [non_breaking] Type 'DocumentArchivePayload' was added (DocumentArchivePayload)

feat(schema): [non_breaking] Type 'FacetPageSource' was added (FacetPageSource)

feat(schema): [non_breaking] Type 'FeatureFlag' was added (FeatureFlag)

feat(schema): [non_breaking] Type 'FeatureFlagConnection' was added (FeatureFlagConnection)

feat(schema): [non_breaking] Type 'FeatureFlagEdge' was added (FeatureFlagEdge)

feat(schema): [non_breaking] Type 'FeatureFlagRolloutStage' was added (FeatureFlagRolloutStage)

feat(schema): [non_breaking] Type 'FeatureFlagRolloutStageConnection' was added (FeatureFlagRolloutStageConnection)

feat(schema): [non_breaking] Type 'FeatureFlagRolloutStageEdge' was added (FeatureFlagRolloutStageEdge)

feat(schema): [non_breaking] Type 'FeatureFlagRolloutStageType' was added (FeatureFlagRolloutStageType)

feat(schema): [non_breaking] Type 'LaunchDarklySettings' was added (LaunchDarklySettings)

feat(schema): [non_breaking] Type 'LaunchDarklySettingsInput' was added (LaunchDarklySettingsInput)

feat(schema): [non_breaking] Type 'NullableProjectUpdatesFilter' was added (NullableProjectUpdatesFilter)

feat(schema): [non_breaking] Type 'NullableReactionFilter' was added (NullableReactionFilter)

feat(schema): [non_breaking] Type 'OrganizationIpRestriction' was added (OrganizationIpRestriction)

feat(schema): [non_breaking] Type 'OrganizationIpRestrictionInput' was added (OrganizationIpRestrictionInput)

feat(schema): [non_breaking] Type 'ProjectUpdatesCollectionFilter' was added (ProjectUpdatesCollectionFilter)

feat(schema): [non_breaking] Type 'ProjectUpdatesFilter' was added (ProjectUpdatesFilter)

feat(schema): [non_breaking] Type 'ReactionCollectionFilter' was added (ReactionCollectionFilter)

feat(schema): [non_breaking] Type 'ReactionFilter' was added (ReactionFilter)

feat(schema): [non_breaking] Field 'reactions' was added to object type 'Comment' (Comment.reactions)

feat(schema): [non_breaking] Field 'trashed' was added to object type 'Document' (Document.trashed)

feat(schema): [non_breaking] Field 'DocumentContentHistoryPayload.history' changed type from '[DocumentContentHistoryType!]' to '[DocumentContentHistoryType!]!' (DocumentContentHistoryPayload.history)

feat(schema): [non_breaking] Field 'trashed' was added to object type 'DocumentSearchResult' (DocumentSearchResult.trashed)

feat(schema): [non_breaking] Field 'sourceInitiative' was added to object type 'Facet' (Facet.sourceInitiative)

feat(schema): [non_breaking] Field 'sourceOrganization' was added to object type 'Facet' (Facet.sourceOrganization)

feat(schema): [non_breaking] Field 'sourcePage' was added to object type 'Facet' (Facet.sourcePage)

feat(schema): [non_breaking] Field 'sourceProject' was added to object type 'Facet' (Facet.sourceProject)

feat(schema): [non_breaking] Field 'sourceTeam' was added to object type 'Facet' (Facet.sourceTeam)

feat(schema): [non_breaking] Field 'targetCustomView' was added to object type 'Facet' (Facet.targetCustomView)

feat(schema): [non_breaking] Field 'facet' was added to object type 'Favorite' (Favorite.facet)

feat(schema): [non_breaking] Input field 'FavoriteCreateInput.facetId' description changed from '[INTERNAL] The identifier of the facet to favorite.' to 'The identifier of the facet to favorite.' (FavoriteCreateInput.facetId)

feat(schema): [non_breaking] Input field 'GoogleSheetsSettingsInput.updatedIssuesAt' changed type from 'DateTime!' to 'DateTime' (GoogleSheetsSettingsInput.updatedIssuesAt)

feat(schema): [non_breaking] Field 'trashed' was added to object type 'Initiative' (Initiative.trashed)

feat(schema): [non_breaking] Field 'launchDarkly' was added to object type 'IntegrationSettings' (IntegrationSettings.launchDarkly)

feat(schema): [non_breaking] Field 'slackIssueAddedToView' was added to object type 'IntegrationsSettings' (IntegrationsSettings.slackIssueAddedToView)

feat(schema): [non_breaking] Field 'reactionData' was added to object type 'Issue' (Issue.reactionData)

feat(schema): [non_breaking] Field 'reactions' was added to object type 'Issue' (Issue.reactions)

feat(schema): [non_breaking] Field 'IssueHistory.actor' description changed from 'The user who made these changes. If null, possibly means that the change made by an integration.' to 'The actor that performed the actions. This field may be empty in the case of integrations or automations.' (IssueHistory.actor)

feat(schema): [non_breaking] Field 'IssueHistory.actor' is deprecated (IssueHistory.actor)

feat(schema): [non_breaking] Field 'IssueHistory.actor' has deprecation reason 'Use actors instead.' (IssueHistory.actor)

feat(schema): [non_breaking] Field 'IssueHistory.fromAssignee' description changed from 'The user from whom the issue was re-assigned from.' to 'The user that was unassigned from the issue.' (IssueHistory.fromAssignee)

feat(schema): [non_breaking] Field 'IssueHistory.fromCycle' description changed from 'The previous cycle of the issue.' to 'The cycle that the issue was moved from.' (IssueHistory.fromCycle)

feat(schema): [non_breaking] Field 'IssueHistory.fromParent' description changed from 'The previous parent of the issue.' to 'The parent issue that the issue was moved from.' (IssueHistory.fromParent)

feat(schema): [non_breaking] Field 'IssueHistory.fromProject' description changed from 'The previous project of the issue.' to 'The project that the issue was moved from.' (IssueHistory.fromProject)

feat(schema): [non_breaking] Field 'IssueHistory.fromState' description changed from 'The previous workflow state of the issue.' to 'The state that the issue was moved from.' (IssueHistory.fromState)

feat(schema): [non_breaking] Field 'IssueHistory.fromTeam' description changed from 'The team from which the issue was moved from.' to 'The team that the issue was moved from.' (IssueHistory.fromTeam)

feat(schema): [non_breaking] Field 'IssueHistory.toAssignee' description changed from 'The user to whom the issue was assigned to.' to 'The user that was assigned to the issue.' (IssueHistory.toAssignee)

feat(schema): [non_breaking] Field 'IssueHistory.toCycle' description changed from 'The new cycle of the issue.' to 'The cycle that the issue was moved to.' (IssueHistory.toCycle)

feat(schema): [non_breaking] Field 'IssueHistory.toParent' description changed from 'The new parent of the issue.' to 'The parent issue that the issue was moved to.' (IssueHistory.toParent)

feat(schema): [non_breaking] Field 'IssueHistory.toProject' description changed from 'The new project of the issue.' to 'The project that the issue was moved to.' (IssueHistory.toProject)

feat(schema): [non_breaking] Field 'IssueHistory.toState' description changed from 'The new workflow state of the issue.' to 'The state that the issue was moved to.' (IssueHistory.toState)

feat(schema): [non_breaking] Field 'IssueHistory.toTeam' description changed from 'The team to which the issue was moved to.' to 'The team that the issue was moved to.' (IssueHistory.toTeam)

feat(schema): [non_breaking] Field 'reactionData' was added to object type 'IssueSearchResult' (IssueSearchResult.reactionData)

feat(schema): [non_breaking] Field 'reactions' was added to object type 'IssueSearchResult' (IssueSearchResult.reactions)

feat(schema): [non_breaking] Field 'documentUnarchive' was added to object type 'Mutation' (Mutation.documentUnarchive)

feat(schema): [non_breaking] Field 'integrationLaunchDarklyConnect' was added to object type 'Mutation' (Mutation.integrationLaunchDarklyConnect)

feat(schema): [non_breaking] Field 'Mutation.documentDelete' description changed from 'Deletes a document.' to 'Deletes (trashes) a document.' (Mutation.documentDelete)

feat(schema): [non_breaking] Field 'Mutation.initiativeDelete' description changed from '[Internal] Deletes a initiative.' to '[Internal] Deletes (trashes) an initiative.' (Mutation.initiativeDelete)

feat(schema): [non_breaking] Description for argument 'copySettingsFromTeamId' on field 'Mutation.teamCreate' changed from 'The team id to copy settings from.' to 'The team id to copy settings from, if any.' (Mutation.teamCreate.copySettingsFromTeamId)

feat(schema): [non_breaking] Input field 'NotificationDeliveryPreferencesChannelInput.schedule' changed type from 'NotificationDeliveryPreferencesScheduleInput!' to 'NotificationDeliveryPreferencesScheduleInput' (NotificationDeliveryPreferencesChannelInput.schedule)

feat(schema): [non_breaking] Input field 'OpsgenieInput.apiFailedWithUnauthorizedErrorAt' changed type from 'DateTime!' to 'DateTime' (OpsgenieInput.apiFailedWithUnauthorizedErrorAt)

feat(schema): [non_breaking] Field 'ipRestrictions' was added to object type 'Organization' (Organization.ipRestrictions)

feat(schema): [non_breaking] Input field 'OrganizationUpdateInput.projectUpdatesReminderFrequency' description changed from 'The frequency at which project updates are sent.' to '[DEPRECATED] The frequency at which project updates are sent.' (OrganizationUpdateInput.projectUpdatesReminderFrequency)

feat(schema): [non_breaking] Input field 'PagerDutyInput.apiFailedWithUnauthorizedErrorAt' changed type from 'DateTime!' to 'DateTime' (PagerDutyInput.apiFailedWithUnauthorizedErrorAt)

feat(schema): [non_breaking] Field 'PaidSubscription.collectionMethod' changed type from 'String' to 'String!' (PaidSubscription.collectionMethod)

feat(schema): [non_breaking] Field 'reactions' was added to object type 'ProjectUpdate' (ProjectUpdate.reactions)

feat(schema): [non_breaking] Description 'ProjectUpdate filtering options.' on type 'ProjectUpdateFilter' has changed to 'Options for filtering project updates.' (ProjectUpdateFilter)

feat(schema): [non_breaking] Field 'TeamMembership.owner' changed type from 'Boolean' to 'Boolean!' (TeamMembership.owner)