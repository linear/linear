---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'IssueDraftArchivePayload' was removed (IssueDraftArchivePayload)

feat(schema): [breaking] Type 'IssueDraftCreateInput' was removed (IssueDraftCreateInput)

feat(schema): [breaking] Type 'IssueDraftPayload' was removed (IssueDraftPayload)

feat(schema): [breaking] Type 'IssueDraftUpdateInput' was removed (IssueDraftUpdateInput)

feat(schema): [breaking] Type 'Update' was removed (Update)

feat(schema): [breaking] Type 'UpdateConnection' was removed (UpdateConnection)

feat(schema): [breaking] Type 'UpdateEdge' was removed (UpdateEdge)

feat(schema): [breaking] Type 'UpdateHealthType' was removed (UpdateHealthType)

feat(schema): [breaking] Input field 'CustomerNeedCollectionFilter.customer' changed type from 'CustomerFilter' to 'NullableCustomerFilter' (CustomerNeedCollectionFilter.customer)

feat(schema): [breaking] Input field 'CustomerNeedFilter.customer' changed type from 'CustomerFilter' to 'NullableCustomerFilter' (CustomerNeedFilter.customer)

feat(schema): [breaking] Field 'FeatureFlag.project' changed type from 'Project!' to 'Project' (FeatureFlag.project)

feat(schema): [breaking] Input field 'GitHubRepoMappingInput.id' changed type from 'String' to 'String!' (GitHubRepoMappingInput.id)

feat(schema): [breaking] Field 'labels' was removed from object type 'IssueDraft' (IssueDraft.labels)

feat(schema): [breaking] Field 'issueDraftArchive' was removed from object type 'Mutation' (Mutation.issueDraftArchive)

feat(schema): [breaking] Field 'issueDraftCreate' was removed from object type 'Mutation' (Mutation.issueDraftCreate)

feat(schema): [breaking] Field 'issueDraftDelete' was removed from object type 'Mutation' (Mutation.issueDraftDelete)

feat(schema): [breaking] Field 'issueDraftUpdate' was removed from object type 'Mutation' (Mutation.issueDraftUpdate)

feat(schema): [breaking] Argument 'code: String!' added to field 'Mutation.integrationGithubConnect' (Mutation.integrationGithubConnect.code)

feat(schema): [breaking] Argument 'code: String!' added to field 'Mutation.integrationGithubImportConnect' (Mutation.integrationGithubImportConnect.code)

feat(schema): [dangerous] Input field 'initiativeUpdateId' was added to input object type 'CommentCreateInput' (CommentCreateInput.initiativeUpdateId)

feat(schema): [dangerous] Input field 'postId' was added to input object type 'CommentCreateInput' (CommentCreateInput.postId)

feat(schema): [dangerous] Input field 'logoUrl' was added to input object type 'CustomerCreateInput' (CustomerCreateInput.logoUrl)

feat(schema): [dangerous] Input field 'logoUrl' was added to input object type 'CustomerUpdateInput' (CustomerUpdateInput.logoUrl)

feat(schema): [dangerous] Input field 'recurringIssueTemplate' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.recurringIssueTemplate)

feat(schema): [dangerous] Input field 'slaType' was added to input object type 'IssueCreateInput' (IssueCreateInput.slaType)

feat(schema): [dangerous] Input field 'recurringIssueTemplate' was added to input object type 'IssueFilter' (IssueFilter.recurringIssueTemplate)

feat(schema): [dangerous] Input field 'slaType' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.slaType)

feat(schema): [dangerous] Argument 'reason: String' added to field 'Mutation.logout' (Mutation.logout.reason)

feat(schema): [dangerous] Argument 'reason: String' added to field 'Mutation.logoutAllSessions' (Mutation.logoutAllSessions.reason)

feat(schema): [dangerous] Argument 'reason: String' added to field 'Mutation.logoutOtherSessions' (Mutation.logoutOtherSessions.reason)

feat(schema): [dangerous] Input field 'recurringIssueTemplate' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.recurringIssueTemplate)

feat(schema): [dangerous] Input field 'type' was added to input object type 'NullableTemplateFilter' (NullableTemplateFilter.type)

feat(schema): [dangerous] Argument 'filter: NullableTemplateFilter' added to field 'Organization.templates' (Organization.templates.filter)

feat(schema): [dangerous] Input field 'customersConfiguration' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.customersConfiguration)

feat(schema): [dangerous] Input field 'customersEnabled' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.customersEnabled)

feat(schema): [dangerous] Input field 'postId' was added to input object type 'ReactionCreateInput' (ReactionCreateInput.postId)

feat(schema): [dangerous] Argument 'filter: NullableTemplateFilter' added to field 'Team.templates' (Team.templates.filter)

feat(schema): [dangerous] Input field 'notificationCategoryPreferences' was added to input object type 'UserSettingsUpdateInput' (UserSettingsUpdateInput.notificationCategoryPreferences)

feat(schema): [dangerous] Enum value 'feedAll' was added to enum 'ViewType' (ViewType.feedAll)

feat(schema): [dangerous] Enum value 'feedFollowing' was added to enum 'ViewType' (ViewType.feedFollowing)

feat(schema): [non_breaking] Type 'CustomerNeedArchivePayload' was added (CustomerNeedArchivePayload)

feat(schema): [non_breaking] Type 'DraftConnection' was added (DraftConnection)

feat(schema): [non_breaking] Type 'DraftEdge' was added (DraftEdge)

feat(schema): [non_breaking] Type 'IssueBatchCreateInput' was added (IssueBatchCreateInput)

feat(schema): [non_breaking] Type 'IssueTitleSuggestionFromCustomerRequestPayload' was added (IssueTitleSuggestionFromCustomerRequestPayload)

feat(schema): [non_breaking] Type 'NotificationCategoryPreferences' was added (NotificationCategoryPreferences)

feat(schema): [non_breaking] Type 'NotificationCategoryPreferencesChannel' was added (NotificationCategoryPreferencesChannel)

feat(schema): [non_breaking] Type 'NotificationCategoryPreferencesChannelInput' was added (NotificationCategoryPreferencesChannelInput)

feat(schema): [non_breaking] Type 'NotificationCategoryPreferencesInput' was added (NotificationCategoryPreferencesInput)

feat(schema): [non_breaking] Type 'NullableCustomerFilter' was added (NullableCustomerFilter)

feat(schema): [non_breaking] Type 'PostType' was added (PostType)

feat(schema): [non_breaking] Field 'initiativeUpdate' was added to object type 'Comment' (Comment.initiativeUpdate)

feat(schema): [non_breaking] Field 'initiative' was added to object type 'Draft' (Draft.initiative)

feat(schema): [non_breaking] Field 'initiativeUpdate' was added to object type 'Draft' (Draft.initiativeUpdate)

feat(schema): [non_breaking] Field 'issue' was added to object type 'FeatureFlag' (FeatureFlag.issue)

feat(schema): [non_breaking] Description 'A feature flag for a project.' on type 'FeatureFlag' has changed to 'A feature flag for a project or an issue.' (FeatureFlag)

feat(schema): [non_breaking] Field 'initiativeUpdate' was added to object type 'FeedItem' (FeedItem.initiativeUpdate)

feat(schema): [non_breaking] Field 'GitHubRepoMapping.id' changed type from 'String' to 'String!' (GitHubRepoMapping.id)

feat(schema): [non_breaking] Field 'recurringIssueTemplate' was added to object type 'Issue' (Issue.recurringIssueTemplate)

feat(schema): [non_breaking] Field 'slaHighRiskAt' was added to object type 'Issue' (Issue.slaHighRiskAt)

feat(schema): [non_breaking] Field 'slaMediumRiskAt' was added to object type 'Issue' (Issue.slaMediumRiskAt)

feat(schema): [non_breaking] Field 'labelIds' was added to object type 'IssueDraft' (IssueDraft.labelIds)

feat(schema): [non_breaking] Field 'needs' was added to object type 'IssueDraft' (IssueDraft.needs)

feat(schema): [non_breaking] Field 'parentId' was added to object type 'IssueDraft' (IssueDraft.parentId)

feat(schema): [non_breaking] Field 'parentIssueId' was added to object type 'IssueDraft' (IssueDraft.parentIssueId)

feat(schema): [non_breaking] Field 'inheritedFrom' was added to object type 'IssueLabel' (IssueLabel.inheritedFrom)

feat(schema): [non_breaking] Field 'recurringIssueTemplate' was added to object type 'IssueSearchResult' (IssueSearchResult.recurringIssueTemplate)

feat(schema): [non_breaking] Field 'slaHighRiskAt' was added to object type 'IssueSearchResult' (IssueSearchResult.slaHighRiskAt)

feat(schema): [non_breaking] Field 'slaMediumRiskAt' was added to object type 'IssueSearchResult' (IssueSearchResult.slaMediumRiskAt)

feat(schema): [non_breaking] Field 'customerNeedArchive' was added to object type 'Mutation' (Mutation.customerNeedArchive)

feat(schema): [non_breaking] Field 'issueBatchCreate' was added to object type 'Mutation' (Mutation.issueBatchCreate)

feat(schema): [non_breaking] Field 'Mutation.projectRelationCreate' description changed from '[ALPHA] Creates a new project relation.' to 'Creates a new project relation.' (Mutation.projectRelationCreate)

feat(schema): [non_breaking] Field 'Mutation.projectRelationDelete' description changed from '[ALPHA] Deletes a project relation.' to 'Deletes a project relation.' (Mutation.projectRelationDelete)

feat(schema): [non_breaking] Field 'Mutation.projectRelationUpdate' description changed from '[ALPHA] Updates a project relation.' to 'Updates a project relation.' (Mutation.projectRelationUpdate)

feat(schema): [non_breaking] Field 'customersConfiguration' was added to object type 'Organization' (Organization.customersConfiguration)

feat(schema): [non_breaking] Field 'customersEnabled' was added to object type 'Organization' (Organization.customersEnabled)

feat(schema): [non_breaking] Field 'type' was added to object type 'Post' (Post.type)

feat(schema): [non_breaking] Field 'issueTitleSuggestionFromCustomerRequest' was added to object type 'Query' (Query.issueTitleSuggestionFromCustomerRequest)

feat(schema): [non_breaking] Description 'Which day count to use for SLA calculations.' was removed from object type 'SLADayCountType' (SLADayCountType)

feat(schema): [non_breaking] Field 'drafts' was added to object type 'User' (User.drafts)

feat(schema): [non_breaking] Field 'autoAssignToSelf' was added to object type 'UserSettings' (UserSettings.autoAssignToSelf)

feat(schema): [non_breaking] Field 'notificationCategoryPreferences' was added to object type 'UserSettings' (UserSettings.notificationCategoryPreferences)