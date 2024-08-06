---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'TeamRepoMapping' was removed (TeamRepoMapping)

feat(schema): [breaking] Type 'TeamRepoMappingInput' was removed (TeamRepoMappingInput)

feat(schema): [breaking] Field 'EntityExternalLink.initiative' changed type from 'Initiative!' to 'Initiative' (EntityExternalLink.initiative)

feat(schema): [breaking] Field 'GitHubSettings.repositoriesMapping' changed type from '[TeamRepoMapping!]' to '[GitHubRepoMapping!]' (GitHubSettings.repositoriesMapping)

feat(schema): [breaking] Input field 'GitHubSettingsInput.repositoriesMapping' changed type from '[TeamRepoMappingInput!]' to '[GitHubRepoMappingInput!]' (GitHubSettingsInput.repositoriesMapping)

feat(schema): [breaking] Field 'integrationUpdateSlack' was removed from object type 'Mutation' (Mutation.integrationUpdateSlack)

feat(schema): [dangerous] Input field 'completedAt' was added to input object type 'IssueCreateInput' (IssueCreateInput.completedAt)

feat(schema): [dangerous] Argument 'createAsUser: String' added to field 'Mutation.attachmentLinkJiraIssue' (Mutation.attachmentLinkJiraIssue.createAsUser)

feat(schema): [dangerous] Argument 'displayIconUrl: String' added to field 'Mutation.attachmentLinkJiraIssue' (Mutation.attachmentLinkJiraIssue.displayIconUrl)

feat(schema): [dangerous] Argument 'id: String' added to field 'Mutation.attachmentLinkJiraIssue' (Mutation.attachmentLinkJiraIssue.id)

feat(schema): [dangerous] Argument 'title: String' added to field 'Mutation.attachmentLinkJiraIssue' (Mutation.attachmentLinkJiraIssue.title)

feat(schema): [dangerous] Input field 'postAcceptedFromTriageUpdates' was added to input object type 'SlackChannelNameMappingInput' (SlackChannelNameMappingInput.postAcceptedFromTriageUpdates)

feat(schema): [dangerous] Input field 'postCompletionUpdates' was added to input object type 'SlackChannelNameMappingInput' (SlackChannelNameMappingInput.postCompletionUpdates)

feat(schema): [non_breaking] Type 'GitHubRepoMapping' was added (GitHubRepoMapping)

feat(schema): [non_breaking] Type 'GitHubRepoMappingInput' was added (GitHubRepoMappingInput)

feat(schema): [non_breaking] Field 'ApiKey.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (ApiKey.updatedAt)

feat(schema): [non_breaking] Field 'Attachment.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Attachment.updatedAt)

feat(schema): [non_breaking] Field 'AuditEntry.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (AuditEntry.updatedAt)

feat(schema): [non_breaking] Field 'Comment.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Comment.updatedAt)

feat(schema): [non_breaking] Field 'CustomAttribute.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (CustomAttribute.updatedAt)

feat(schema): [non_breaking] Field 'CustomView.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (CustomView.updatedAt)

feat(schema): [non_breaking] Field 'CustomViewNotificationSubscription.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (CustomViewNotificationSubscription.updatedAt)

feat(schema): [non_breaking] Field 'Customer.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Customer.updatedAt)

feat(schema): [non_breaking] Field 'CustomerNeed.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (CustomerNeed.updatedAt)

feat(schema): [non_breaking] Field 'CustomerSchema.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (CustomerSchema.updatedAt)

feat(schema): [non_breaking] Field 'CustomerSchemaField.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (CustomerSchemaField.updatedAt)

feat(schema): [non_breaking] Field 'CustomerStatus.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (CustomerStatus.updatedAt)

feat(schema): [non_breaking] Field 'Cycle.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Cycle.updatedAt)

feat(schema): [non_breaking] Field 'CycleNotificationSubscription.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (CycleNotificationSubscription.updatedAt)

feat(schema): [non_breaking] Field 'DiaryEntry.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (DiaryEntry.updatedAt)

feat(schema): [non_breaking] Field 'documentContentId' was added to object type 'Document' (Document.documentContentId)

feat(schema): [non_breaking] Field 'Document.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Document.updatedAt)

feat(schema): [non_breaking] Field 'DocumentContent.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (DocumentContent.updatedAt)

feat(schema): [non_breaking] Field 'DocumentContentHistory.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (DocumentContentHistory.updatedAt)

feat(schema): [non_breaking] Field 'DocumentNotification.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (DocumentNotification.updatedAt)

feat(schema): [non_breaking] Field 'documentContentId' was added to object type 'DocumentSearchResult' (DocumentSearchResult.documentContentId)

feat(schema): [non_breaking] Field 'DocumentSearchResult.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (DocumentSearchResult.updatedAt)

feat(schema): [non_breaking] Field 'Draft.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Draft.updatedAt)

feat(schema): [non_breaking] Field 'EmailIntakeAddress.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (EmailIntakeAddress.updatedAt)

feat(schema): [non_breaking] Field 'Emoji.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Emoji.updatedAt)

feat(schema): [non_breaking] Field 'Entity.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Entity.updatedAt)

feat(schema): [non_breaking] Field 'EntityExternalLink.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (EntityExternalLink.updatedAt)

feat(schema): [non_breaking] Field 'ExternalUser.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (ExternalUser.updatedAt)

feat(schema): [non_breaking] Field 'Facet.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Facet.updatedAt)

feat(schema): [non_breaking] Field 'Favorite.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Favorite.updatedAt)

feat(schema): [non_breaking] Field 'FeatureFlag.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (FeatureFlag.updatedAt)

feat(schema): [non_breaking] Field 'FeatureFlagRolloutStage.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (FeatureFlagRolloutStage.updatedAt)

feat(schema): [non_breaking] Field 'GitAutomationState.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (GitAutomationState.updatedAt)

feat(schema): [non_breaking] Field 'GitAutomationTargetBranch.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (GitAutomationTargetBranch.updatedAt)

feat(schema): [non_breaking] Field 'Initiative.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Initiative.updatedAt)

feat(schema): [non_breaking] Field 'InitiativeNotification.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (InitiativeNotification.updatedAt)

feat(schema): [non_breaking] Field 'InitiativeNotificationSubscription.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (InitiativeNotificationSubscription.updatedAt)

feat(schema): [non_breaking] Field 'InitiativeToProject.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (InitiativeToProject.updatedAt)

feat(schema): [non_breaking] Field 'Integration.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Integration.updatedAt)

feat(schema): [non_breaking] Field 'IntegrationTemplate.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (IntegrationTemplate.updatedAt)

feat(schema): [non_breaking] Field 'IntegrationsSettings.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (IntegrationsSettings.updatedAt)

feat(schema): [non_breaking] Field 'Issue.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Issue.updatedAt)

feat(schema): [non_breaking] Field 'IssueDraft.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (IssueDraft.updatedAt)

feat(schema): [non_breaking] Field 'IssueHistory.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (IssueHistory.updatedAt)

feat(schema): [non_breaking] Field 'IssueImport.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (IssueImport.updatedAt)

feat(schema): [non_breaking] Field 'IssueLabel.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (IssueLabel.updatedAt)

feat(schema): [non_breaking] Field 'IssueNotification.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (IssueNotification.updatedAt)

feat(schema): [non_breaking] Field 'IssueRelation.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (IssueRelation.updatedAt)

feat(schema): [non_breaking] Field 'IssueSearchResult.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (IssueSearchResult.updatedAt)

feat(schema): [non_breaking] Field 'LabelNotificationSubscription.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (LabelNotificationSubscription.updatedAt)

feat(schema): [non_breaking] Field 'Notification.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Notification.updatedAt)

feat(schema): [non_breaking] Field 'NotificationSubscription.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (NotificationSubscription.updatedAt)

feat(schema): [non_breaking] Field 'OauthClient.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (OauthClient.updatedAt)

feat(schema): [non_breaking] Field 'OauthClientApproval.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (OauthClientApproval.updatedAt)

feat(schema): [non_breaking] Field 'OauthClientApprovalNotification.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (OauthClientApprovalNotification.updatedAt)

feat(schema): [non_breaking] Field 'Organization.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Organization.updatedAt)

feat(schema): [non_breaking] Field 'OrganizationDomain.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (OrganizationDomain.updatedAt)

feat(schema): [non_breaking] Field 'OrganizationInvite.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (OrganizationInvite.updatedAt)

feat(schema): [non_breaking] Field 'PaidSubscription.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (PaidSubscription.updatedAt)

feat(schema): [non_breaking] Field 'documentContent' was added to object type 'Project' (Project.documentContent)

feat(schema): [non_breaking] Field 'Project.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Project.updatedAt)

feat(schema): [non_breaking] Field 'ProjectLink.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (ProjectLink.updatedAt)

feat(schema): [non_breaking] Field 'documentContent' was added to object type 'ProjectMilestone' (ProjectMilestone.documentContent)

feat(schema): [non_breaking] Field 'ProjectMilestone.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (ProjectMilestone.updatedAt)

feat(schema): [non_breaking] Field 'ProjectNotification.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (ProjectNotification.updatedAt)

feat(schema): [non_breaking] Field 'ProjectNotificationSubscription.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (ProjectNotificationSubscription.updatedAt)

feat(schema): [non_breaking] Field 'ProjectRelation.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (ProjectRelation.updatedAt)

feat(schema): [non_breaking] Field 'documentContent' was added to object type 'ProjectSearchResult' (ProjectSearchResult.documentContent)

feat(schema): [non_breaking] Field 'ProjectSearchResult.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (ProjectSearchResult.updatedAt)

feat(schema): [non_breaking] Field 'ProjectStatus.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (ProjectStatus.updatedAt)

feat(schema): [non_breaking] Field 'ProjectUpdate.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (ProjectUpdate.updatedAt)

feat(schema): [non_breaking] Field 'ProjectUpdateInteraction.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (ProjectUpdateInteraction.updatedAt)

feat(schema): [non_breaking] Field 'PushSubscription.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (PushSubscription.updatedAt)

feat(schema): [non_breaking] Field 'externalUser' was added to object type 'Reaction' (Reaction.externalUser)

feat(schema): [non_breaking] Field 'Reaction.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Reaction.updatedAt)

feat(schema): [non_breaking] Field 'Reminder.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Reminder.updatedAt)

feat(schema): [non_breaking] Field 'Roadmap.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Roadmap.updatedAt)

feat(schema): [non_breaking] Field 'RoadmapToProject.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (RoadmapToProject.updatedAt)

feat(schema): [non_breaking] Field 'postAcceptedFromTriageUpdates' was added to object type 'SlackChannelNameMapping' (SlackChannelNameMapping.postAcceptedFromTriageUpdates)

feat(schema): [non_breaking] Field 'postCompletionUpdates' was added to object type 'SlackChannelNameMapping' (SlackChannelNameMapping.postCompletionUpdates)

feat(schema): [non_breaking] Field 'Team.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Team.updatedAt)

feat(schema): [non_breaking] Field 'TeamMembership.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (TeamMembership.updatedAt)

feat(schema): [non_breaking] Field 'TeamNotificationSubscription.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (TeamNotificationSubscription.updatedAt)

feat(schema): [non_breaking] Field 'Template.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Template.updatedAt)

feat(schema): [non_breaking] Field 'TextDraft.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (TextDraft.updatedAt)

feat(schema): [non_breaking] Field 'TimeSchedule.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (TimeSchedule.updatedAt)

feat(schema): [non_breaking] Field 'TriageResponsibility.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (TriageResponsibility.updatedAt)

feat(schema): [non_breaking] Field 'User.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (User.updatedAt)

feat(schema): [non_breaking] Field 'UserNotificationSubscription.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (UserNotificationSubscription.updatedAt)

feat(schema): [non_breaking] Field 'UserSettings.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (UserSettings.updatedAt)

feat(schema): [non_breaking] Field 'ViewPreferences.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (ViewPreferences.updatedAt)

feat(schema): [non_breaking] Field 'Webhook.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (Webhook.updatedAt)

feat(schema): [non_breaking] Field 'WorkflowCronJobDefinition.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (WorkflowCronJobDefinition.updatedAt)

feat(schema): [non_breaking] Field 'WorkflowDefinition.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (WorkflowDefinition.updatedAt)

feat(schema): [non_breaking] Field 'WorkflowState.updatedAt' description changed from 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
    for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
    been updated after creation.' to 'The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
    been updated after creation.' (WorkflowState.updatedAt)