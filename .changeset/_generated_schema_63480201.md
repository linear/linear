---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'CustomerCreateInput.revenue' changed type from 'String' to 'Int' (CustomerCreateInput.revenue)

feat(schema): [breaking] Input field 'CustomerCreateInput.size' changed type from 'String' to 'Int' (CustomerCreateInput.size)

feat(schema): [breaking] Field 'contentData' (deprecated) was removed from object type 'DocumentContent' (DocumentContent.contentData)

feat(schema): [breaking] Field 'descriptionData' (deprecated) was removed from object type 'Issue' (Issue.descriptionData)

feat(schema): [breaking] Field 'descriptionData' (deprecated) was removed from object type 'IssueSearchResult' (IssueSearchResult.descriptionData)

feat(schema): [breaking] Field 'customerStatusCreate' was removed from object type 'Mutation' (Mutation.customerStatusCreate)

feat(schema): [breaking] Field 'customerStatusDelete' was removed from object type 'Mutation' (Mutation.customerStatusDelete)

feat(schema): [breaking] Field 'customerStatusUpdate' was removed from object type 'Mutation' (Mutation.customerStatusUpdate)

feat(schema): [breaking] Input field 'organizationId' was added to input object type 'SentrySettingsInput' (SentrySettingsInput.organizationId)

feat(schema): [breaking] Field 'draftWorkflowState' (deprecated) was removed from object type 'Team' (Team.draftWorkflowState)

feat(schema): [breaking] Field 'mergeWorkflowState' (deprecated) was removed from object type 'Team' (Team.mergeWorkflowState)

feat(schema): [breaking] Field 'mergeableWorkflowState' (deprecated) was removed from object type 'Team' (Team.mergeableWorkflowState)

feat(schema): [breaking] Field 'reviewWorkflowState' (deprecated) was removed from object type 'Team' (Team.reviewWorkflowState)

feat(schema): [breaking] Field 'startWorkflowState' (deprecated) was removed from object type 'Team' (Team.startWorkflowState)

feat(schema): [breaking] Input field 'cycleEnabledStartWeek' was removed from input object type 'TeamUpdateInput' (TeamUpdateInput.cycleEnabledStartWeek)

feat(schema): [breaking] Input field 'draftWorkflowStateId' was removed from input object type 'TeamUpdateInput' (TeamUpdateInput.draftWorkflowStateId)

feat(schema): [breaking] Input field 'mergeWorkflowStateId' was removed from input object type 'TeamUpdateInput' (TeamUpdateInput.mergeWorkflowStateId)

feat(schema): [breaking] Input field 'mergeableWorkflowStateId' was removed from input object type 'TeamUpdateInput' (TeamUpdateInput.mergeableWorkflowStateId)

feat(schema): [breaking] Input field 'reviewWorkflowStateId' was removed from input object type 'TeamUpdateInput' (TeamUpdateInput.reviewWorkflowStateId)

feat(schema): [breaking] Input field 'startWorkflowStateId' was removed from input object type 'TeamUpdateInput' (TeamUpdateInput.startWorkflowStateId)

feat(schema): [breaking] Field 'UserSettings.notificationCategoryPreferences' changed type from 'JSONObject!' to 'NotificationCategoryPreferences!' (UserSettings.notificationCategoryPreferences)

feat(schema): [dangerous] Input field 'attachmentId' was added to input object type 'CustomerNeedUpdateInput' (CustomerNeedUpdateInput.attachmentId)

feat(schema): [dangerous] Input field 'displayName' was added to input object type 'CustomerTierCreateInput' (CustomerTierCreateInput.displayName)

feat(schema): [dangerous] Input field 'displayName' was added to input object type 'CustomerTierUpdateInput' (CustomerTierUpdateInput.displayName)

feat(schema): [dangerous] Enum value 'slackInitiativePost' was added to enum 'IntegrationService' (IntegrationService.slackInitiativePost)

feat(schema): [dangerous] Enum value 'slackOrgInitiativeUpdatesPost' was added to enum 'IntegrationService' (IntegrationService.slackOrgInitiativeUpdatesPost)

feat(schema): [dangerous] Input field 'slackInitiativePost' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.slackInitiativePost)

feat(schema): [dangerous] Input field 'slackOrgInitiativeUpdatesPost' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.slackOrgInitiativeUpdatesPost)

feat(schema): [dangerous] Input field 'initiativeId' was added to input object type 'IntegrationsSettingsCreateInput' (IntegrationsSettingsCreateInput.initiativeId)

feat(schema): [dangerous] Input field 'slackInitiativeUpdateCreated' was added to input object type 'IntegrationsSettingsCreateInput' (IntegrationsSettingsCreateInput.slackInitiativeUpdateCreated)

feat(schema): [dangerous] Input field 'slackInitiativeUpdateCreated' was added to input object type 'IntegrationsSettingsUpdateInput' (IntegrationsSettingsUpdateInput.slackInitiativeUpdateCreated)

feat(schema): [dangerous] Input field 'sourcePullRequestCommentId' was added to input object type 'IssueCreateInput' (IssueCreateInput.sourcePullRequestCommentId)

feat(schema): [dangerous] Input field 'initiativeUpdateId' was added to input object type 'NotificationEntityInput' (NotificationEntityInput.initiativeUpdateId)

feat(schema): [dangerous] Input field 'initiativeUpdateId' was added to input object type 'NotificationUpdateInput' (NotificationUpdateInput.initiativeUpdateId)

feat(schema): [dangerous] Input field 'workingDays' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.workingDays)

feat(schema): [dangerous] Input field 'pullRequestCommentId' was added to input object type 'ReactionCreateInput' (ReactionCreateInput.pullRequestCommentId)

feat(schema): [dangerous] Input field 'pullRequestId' was added to input object type 'ReactionCreateInput' (ReactionCreateInput.pullRequestId)

feat(schema): [dangerous] Input field 'notificationChannelPreferences' was added to input object type 'UserSettingsUpdateInput' (UserSettingsUpdateInput.notificationChannelPreferences)

feat(schema): [dangerous] Enum value 'customer' was added to enum 'ViewType' (ViewType.customer)

feat(schema): [dangerous] Input field 'canReadCustomers' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.canReadCustomers)

feat(schema): [non_breaking] Type 'CustomerNeedCreateFromAttachmentInput' was added (CustomerNeedCreateFromAttachmentInput)

feat(schema): [non_breaking] Type 'NotificationCategory' was added (NotificationCategory)

feat(schema): [non_breaking] Type 'NotificationChannel' was added (NotificationChannel)

feat(schema): [non_breaking] Type 'NotificationChannelPreferences' was added (NotificationChannelPreferences)

feat(schema): [non_breaking] Type 'NotificationChannelPreferencesInput' was added (NotificationChannelPreferencesInput)

feat(schema): [non_breaking] Type 'PullRequestComment' was added (PullRequestComment)

feat(schema): [non_breaking] Type 'PullRequestUserState' was added (PullRequestUserState)

feat(schema): [non_breaking] Type 'PullRequestUserStateInput' was added (PullRequestUserStateInput)

feat(schema): [non_breaking] Field 'CustomerNeed.priority' description changed from 'The urgency of the customer need. 0 = No urgency, 1 = Critical, 2 = Important, 3 = Nice to have.' to 'Whether the customer need is important or not. 0 = Not important, 1 = Important.' (CustomerNeed.priority)

feat(schema): [non_breaking] Input field 'CustomerNeedCreateInput.priority' description changed from 'The urgency of the customer need. 0 = No urgency, 1 = Critical, 2 = Important, 3 = Nice to have.' to 'Whether the customer need is important or not. 0 = Not important, 1 = Important.' (CustomerNeedCreateInput.priority)

feat(schema): [non_breaking] Input field 'CustomerNeedUpdateInput.priority' description changed from 'The urgency of the customer need. 0 = No urgency, 1 = Critical, 2 = Important, 3 = Nice to have.' to 'Whether the customer need is important or not. 0 = Not important, 1 = Important.' (CustomerNeedUpdateInput.priority)

feat(schema): [non_breaking] Field 'displayName' was added to object type 'CustomerTier' (CustomerTier.displayName)

feat(schema): [non_breaking] Input field 'CustomerTierCreateInput.name' changed type from 'String!' to 'String' (CustomerTierCreateInput.name)

feat(schema): [non_breaking] Field 'integrationsSettings' was added to object type 'Initiative' (Initiative.integrationsSettings)

feat(schema): [non_breaking] Field 'url' was added to object type 'Initiative' (Initiative.url)

feat(schema): [non_breaking] Field 'initiativeUpdateId' was added to object type 'InitiativeNotification' (InitiativeNotification.initiativeUpdateId)

feat(schema): [non_breaking] Field 'slackInitiativePost' was added to object type 'IntegrationSettings' (IntegrationSettings.slackInitiativePost)

feat(schema): [non_breaking] Field 'slackOrgInitiativeUpdatesPost' was added to object type 'IntegrationSettings' (IntegrationSettings.slackOrgInitiativeUpdatesPost)

feat(schema): [non_breaking] Field 'initiative' was added to object type 'IntegrationsSettings' (IntegrationsSettings.initiative)

feat(schema): [non_breaking] Field 'slackInitiativeUpdateCreated' was added to object type 'IntegrationsSettings' (IntegrationsSettings.slackInitiativeUpdateCreated)

feat(schema): [non_breaking] Description 'The configuration of all integrations for a project or a team.' on type 'IntegrationsSettings' has changed to 'The configuration of all integrations for different entities.' (IntegrationsSettings)

feat(schema): [non_breaking] Field 'customerMerge' was added to object type 'Mutation' (Mutation.customerMerge)

feat(schema): [non_breaking] Field 'customerNeedCreateFromAttachment' was added to object type 'Mutation' (Mutation.customerNeedCreateFromAttachment)

feat(schema): [non_breaking] Field 'customerNeedUnarchive' was added to object type 'Mutation' (Mutation.customerNeedUnarchive)

feat(schema): [non_breaking] Field 'integrationGithubImportRefresh' was added to object type 'Mutation' (Mutation.integrationGithubImportRefresh)

feat(schema): [non_breaking] Field 'integrationSlackInitiativePost' was added to object type 'Mutation' (Mutation.integrationSlackInitiativePost)

feat(schema): [non_breaking] Field 'integrationSlackOrgInitiativeUpdatesPost' was added to object type 'Mutation' (Mutation.integrationSlackOrgInitiativeUpdatesPost)

feat(schema): [non_breaking] Field 'notificationCategoryChannelSubscriptionUpdate' was added to object type 'Mutation' (Mutation.notificationCategoryChannelSubscriptionUpdate)

feat(schema): [non_breaking] Description for argument 'id' on field 'Mutation.customerNeedArchive' changed from 'The identifier of the customer need to delete.' to 'The identifier of the customer need to archive.' (Mutation.customerNeedArchive.id)

feat(schema): [non_breaking] Field 'Mutation.projectUpdateMarkAsRead' is deprecated (Mutation.projectUpdateMarkAsRead)

feat(schema): [non_breaking] Field 'Mutation.projectUpdateMarkAsRead' has deprecation reason 'Project uppdate interactions are not used and will be removed.' (Mutation.projectUpdateMarkAsRead)

feat(schema): [non_breaking] Field 'workingDays' was added to object type 'Organization' (Organization.workingDays)

feat(schema): [non_breaking] Field 'currentProgress' was added to object type 'ProjectMilestone' (ProjectMilestone.currentProgress)

feat(schema): [non_breaking] Field 'progressHistory' was added to object type 'ProjectMilestone' (ProjectMilestone.progressHistory)

feat(schema): [non_breaking] Field 'document' was added to object type 'ProjectNotification' (ProjectNotification.document)

feat(schema): [non_breaking] Field 'initiative' was added to object type 'ProjectNotification' (ProjectNotification.initiative)

feat(schema): [non_breaking] Field 'initiativeUpdate' was added to object type 'ProjectNotification' (ProjectNotification.initiativeUpdate)

feat(schema): [non_breaking] Field 'ProjectUpdateWithInteractionPayload.interaction' is deprecated (ProjectUpdateWithInteractionPayload.interaction)

feat(schema): [non_breaking] Field 'ProjectUpdateWithInteractionPayload.interaction' has deprecation reason 'Project update interactions are not used and will be removed.' (ProjectUpdateWithInteractionPayload.interaction)

feat(schema): [non_breaking] Field 'organizationId' was added to object type 'SentrySettings' (SentrySettings.organizationId)

feat(schema): [non_breaking] Field 'notificationChannelPreferences' was added to object type 'UserSettings' (UserSettings.notificationChannelPreferences)

feat(schema): [non_breaking] Field 'canReadCustomers' was added to object type 'ZendeskSettings' (ZendeskSettings.canReadCustomers)