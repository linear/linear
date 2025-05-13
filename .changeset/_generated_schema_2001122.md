---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'ArchiveResponse.includesDependencies' changed type from 'Boolean!' to '[String!]!' (ArchiveResponse.includesDependencies)

feat(schema): [breaking] Field 'summaryText' was removed from object type 'Comment' (Comment.summaryText)

feat(schema): [breaking] Field 'project' was removed from object type 'Post' (Post.project)

feat(schema): [breaking] Argument 'snippetSize: Float' was removed from field 'Query.searchDocuments' (Query.searchDocuments.snippetSize)

feat(schema): [breaking] Argument 'snippetSize: Float' was removed from field 'Query.searchIssues' (Query.searchIssues.snippetSize)

feat(schema): [breaking] Argument 'snippetSize: Float' was removed from field 'Query.searchProjects' (Query.searchProjects.snippetSize)

feat(schema): [breaking] Field 'appUserEnabled' was removed from object type 'UserAuthorizedApplication' (UserAuthorizedApplication.appUserEnabled)

feat(schema): [dangerous] Input field 'feedItemFilterData' was added to input object type 'CustomViewCreateInput' (CustomViewCreateInput.feedItemFilterData)

feat(schema): [dangerous] Input field 'feedItemFilterData' was added to input object type 'CustomViewUpdateInput' (CustomViewUpdateInput.feedItemFilterData)

feat(schema): [dangerous] Input field 'mainSourceId' was added to input object type 'CustomerCreateInput' (CustomerCreateInput.mainSourceId)

feat(schema): [dangerous] Input field 'applyPriorityToRelatedNeeds' was added to input object type 'CustomerNeedUpdateInput' (CustomerNeedUpdateInput.applyPriorityToRelatedNeeds)

feat(schema): [dangerous] Input field 'mainSourceId' was added to input object type 'CustomerUpdateInput' (CustomerUpdateInput.mainSourceId)

feat(schema): [dangerous] Input field 'customerRequestsEnabled' was added to input object type 'EmailIntakeAddressUpdateInput' (EmailIntakeAddressUpdateInput.customerRequestsEnabled)

feat(schema): [dangerous] Input field 'repliesEnabled' was added to input object type 'EmailIntakeAddressUpdateInput' (EmailIntakeAddressUpdateInput.repliesEnabled)

feat(schema): [dangerous] Enum value 'feed' was added to enum 'FacetPageSource' (FacetPageSource.feed)

feat(schema): [dangerous] Input field 'issue' was added to input object type 'GoogleSheetsSettingsInput' (GoogleSheetsSettingsInput.issue)

feat(schema): [dangerous] Input field 'project' was added to input object type 'GoogleSheetsSettingsInput' (GoogleSheetsSettingsInput.project)

feat(schema): [dangerous] Input field 'ancestors' was added to input object type 'InitiativeCollectionFilter' (InitiativeCollectionFilter.ancestors)

feat(schema): [dangerous] Input field 'owner' was added to input object type 'InitiativeCollectionFilter' (InitiativeCollectionFilter.owner)

feat(schema): [dangerous] Input field 'ancestors' was added to input object type 'InitiativeFilter' (InitiativeFilter.ancestors)

feat(schema): [dangerous] Input field 'owner' was added to input object type 'InitiativeFilter' (InitiativeFilter.owner)

feat(schema): [dangerous] Input field 'ageTime' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.ageTime)

feat(schema): [dangerous] Input field 'cycleTime' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.cycleTime)

feat(schema): [dangerous] Input field 'leadTime' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.leadTime)

feat(schema): [dangerous] Input field 'triageTime' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.triageTime)

feat(schema): [dangerous] Input field 'slaStartedAt' was added to input object type 'IssueCreateInput' (IssueCreateInput.slaStartedAt)

feat(schema): [dangerous] Input field 'ageTime' was added to input object type 'IssueFilter' (IssueFilter.ageTime)

feat(schema): [dangerous] Input field 'cycleTime' was added to input object type 'IssueFilter' (IssueFilter.cycleTime)

feat(schema): [dangerous] Input field 'leadTime' was added to input object type 'IssueFilter' (IssueFilter.leadTime)

feat(schema): [dangerous] Input field 'triageTime' was added to input object type 'IssueFilter' (IssueFilter.triageTime)

feat(schema): [dangerous] Input field 'isGroup' was added to input object type 'IssueLabelCollectionFilter' (IssueLabelCollectionFilter.isGroup)

feat(schema): [dangerous] Input field 'isGroup' was added to input object type 'IssueLabelFilter' (IssueLabelFilter.isGroup)

feat(schema): [dangerous] Input field 'linkCount' was added to input object type 'IssueSortInput' (IssueSortInput.linkCount)

feat(schema): [dangerous] Input field 'rootIssue' was added to input object type 'IssueSortInput' (IssueSortInput.rootIssue)

feat(schema): [dangerous] Input field 'slaStartedAt' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.slaStartedAt)

feat(schema): [dangerous] Input field 'label' was added to input object type 'JiraSettingsInput' (JiraSettingsInput.label)

feat(schema): [dangerous] Input field 'accessToken' was added to input object type 'JiraUpdateInput' (JiraUpdateInput.accessToken)

feat(schema): [dangerous] Input field 'email' was added to input object type 'JiraUpdateInput' (JiraUpdateInput.email)

feat(schema): [dangerous] Argument 'type: String' added to field 'Mutation.refreshGoogleSheetsData' (Mutation.refreshGoogleSheetsData.type)

feat(schema): [dangerous] Input field 'ageTime' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.ageTime)

feat(schema): [dangerous] Input field 'cycleTime' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.cycleTime)

feat(schema): [dangerous] Input field 'leadTime' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.leadTime)

feat(schema): [dangerous] Input field 'triageTime' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.triageTime)

feat(schema): [dangerous] Input field 'labels' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.labels)

feat(schema): [dangerous] Input field 'aiAddonEnabled' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.aiAddonEnabled)

feat(schema): [dangerous] Input field 'labels' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.labels)

feat(schema): [dangerous] Input field 'labelIds' was added to input object type 'ProjectCreateInput' (ProjectCreateInput.labelIds)

feat(schema): [dangerous] Input field 'labels' was added to input object type 'ProjectFilter' (ProjectFilter.labels)

feat(schema): [dangerous] Enum value 'customers' was added to enum 'ProjectTab' (ProjectTab.customers)

feat(schema): [dangerous] Input field 'labelIds' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.labelIds)

feat(schema): [dangerous] Argument 'hash: String' added to field 'Query.customerNeed' (Query.customerNeed.hash)

feat(schema): [dangerous] Input field 'inheritWorkflowStatuses' was added to input object type 'TeamCreateInput' (TeamCreateInput.inheritWorkflowStatuses)

feat(schema): [dangerous] Input field 'productIntelligenceScope' was added to input object type 'TeamCreateInput' (TeamCreateInput.productIntelligenceScope)

feat(schema): [dangerous] Input field 'aiThreadSummariesEnabled' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.aiThreadSummariesEnabled)

feat(schema): [dangerous] Input field 'productIntelligenceScope' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.productIntelligenceScope)

feat(schema): [dangerous] Enum value 'commandMenuClearShortcutTip' was added to enum 'UserFlagType' (UserFlagType.commandMenuClearShortcutTip)

feat(schema): [dangerous] Input field 'projectLabelId' was added to input object type 'ViewPreferencesCreateInput' (ViewPreferencesCreateInput.projectLabelId)

feat(schema): [dangerous] Enum value 'projectLabel' was added to enum 'ViewType' (ViewType.projectLabel)

feat(schema): [dangerous] Input field 'closedIssuesOrderedByRecency' was added to input object type 'WorkflowStateSort' (WorkflowStateSort.closedIssuesOrderedByRecency)

feat(schema): [non_breaking] Type 'Duration' was added (Duration)

feat(schema): [non_breaking] Type 'FeedItemFilter' was added (FeedItemFilter)

feat(schema): [non_breaking] Type 'GoogleSheetsExportSettings' was added (GoogleSheetsExportSettings)

feat(schema): [non_breaking] Type 'LinkCountSort' was added (LinkCountSort)

feat(schema): [non_breaking] Type 'NullableDurationComparator' was added (NullableDurationComparator)

feat(schema): [non_breaking] Type 'ProductIntelligenceScope' was added (ProductIntelligenceScope)

feat(schema): [non_breaking] Type 'ProjectLabel' was added (ProjectLabel)

feat(schema): [non_breaking] Type 'ProjectLabelCollectionFilter' was added (ProjectLabelCollectionFilter)

feat(schema): [non_breaking] Type 'ProjectLabelConnection' was added (ProjectLabelConnection)

feat(schema): [non_breaking] Type 'ProjectLabelEdge' was added (ProjectLabelEdge)

feat(schema): [non_breaking] Type 'ProjectLabelFilter' was added (ProjectLabelFilter)

feat(schema): [non_breaking] Type 'RootIssueSort' was added (RootIssueSort)

feat(schema): [non_breaking] Field 'bodyData' was added to object type 'Attachment' (Attachment.bodyData)

feat(schema): [non_breaking] Field 'threadSummary' was added to object type 'Comment' (Comment.threadSummary)

feat(schema): [non_breaking] Field 'feedItemFilterData' was added to object type 'CustomView' (CustomView.feedItemFilterData)

feat(schema): [non_breaking] Field 'mainSourceId' was added to object type 'Customer' (Customer.mainSourceId)

feat(schema): [non_breaking] Field 'customerRequestsEnabled' was added to object type 'EmailIntakeAddress' (EmailIntakeAddress.customerRequestsEnabled)

feat(schema): [non_breaking] Field 'repliesEnabled' was added to object type 'EmailIntakeAddress' (EmailIntakeAddress.repliesEnabled)

feat(schema): [non_breaking] Input field 'EmailIntakeAddressUpdateInput.enabled' changed type from 'Boolean!' to 'Boolean' (EmailIntakeAddressUpdateInput.enabled)

feat(schema): [non_breaking] Field 'sourceFeedUser' was added to object type 'Facet' (Facet.sourceFeedUser)

feat(schema): [non_breaking] Input field 'GoogleSheetsSettingsInput.sheetId' has description '[Deprecated] The ID of the target sheet (tab) within the Google Sheet.' (GoogleSheetsSettingsInput.sheetId)

feat(schema): [non_breaking] Input field 'GoogleSheetsSettingsInput.sheetId' changed type from 'Float!' to 'Float' (GoogleSheetsSettingsInput.sheetId)

feat(schema): [non_breaking] Input field 'GoogleSheetsSettingsInput.spreadsheetId' has description '[Deprecated] The ID of the exported Google Sheet.' (GoogleSheetsSettingsInput.spreadsheetId)

feat(schema): [non_breaking] Input field 'GoogleSheetsSettingsInput.spreadsheetId' changed type from 'String!' to 'String' (GoogleSheetsSettingsInput.spreadsheetId)

feat(schema): [non_breaking] Input field 'GoogleSheetsSettingsInput.spreadsheetUrl' has description '[Deprecated] The URL of the exported Google Sheet.' (GoogleSheetsSettingsInput.spreadsheetUrl)

feat(schema): [non_breaking] Input field 'GoogleSheetsSettingsInput.spreadsheetUrl' changed type from 'String!' to 'String' (GoogleSheetsSettingsInput.spreadsheetUrl)

feat(schema): [non_breaking] Input field 'GoogleSheetsSettingsInput.updatedIssuesAt' has description '[Deprecated] The date of the most recent export.' (GoogleSheetsSettingsInput.updatedIssuesAt)

feat(schema): [non_breaking] Field 'suggestionsGeneratedAt' was added to object type 'Issue' (Issue.suggestionsGeneratedAt)

feat(schema): [non_breaking] Field 'suggestionsGeneratedAt' was added to object type 'IssueSearchResult' (IssueSearchResult.suggestionsGeneratedAt)

feat(schema): [non_breaking] Field 'projectAddLabel' was added to object type 'Mutation' (Mutation.projectAddLabel)

feat(schema): [non_breaking] Field 'projectRemoveLabel' was added to object type 'Mutation' (Mutation.projectRemoveLabel)

feat(schema): [non_breaking] Field 'Mutation.roadmapArchive' is deprecated (Mutation.roadmapArchive)

feat(schema): [non_breaking] Field 'Mutation.roadmapArchive' has deprecation reason 'Roadmaps are deprecated, use initiatives instead.' (Mutation.roadmapArchive)

feat(schema): [non_breaking] Field 'Mutation.roadmapCreate' is deprecated (Mutation.roadmapCreate)

feat(schema): [non_breaking] Field 'Mutation.roadmapCreate' has deprecation reason 'Roadmaps are deprecated, use initiatives instead.' (Mutation.roadmapCreate)

feat(schema): [non_breaking] Field 'Mutation.roadmapDelete' is deprecated (Mutation.roadmapDelete)

feat(schema): [non_breaking] Field 'Mutation.roadmapDelete' has deprecation reason 'Roadmaps are deprecated, use initiatives instead.' (Mutation.roadmapDelete)

feat(schema): [non_breaking] Field 'Mutation.roadmapUnarchive' is deprecated (Mutation.roadmapUnarchive)

feat(schema): [non_breaking] Field 'Mutation.roadmapUnarchive' has deprecation reason 'Roadmaps are deprecated, use initiatives instead.' (Mutation.roadmapUnarchive)

feat(schema): [non_breaking] Field 'Mutation.roadmapUpdate' is deprecated (Mutation.roadmapUpdate)

feat(schema): [non_breaking] Field 'Mutation.roadmapUpdate' has deprecation reason 'Roadmaps are deprecated, use initiatives instead.' (Mutation.roadmapUpdate)

feat(schema): [non_breaking] Field 'projectLabels' was added to object type 'Organization' (Organization.projectLabels)

feat(schema): [non_breaking] Field 'labels' was added to object type 'Project' (Project.labels)

feat(schema): [non_breaking] Field 'needs' was added to object type 'Project' (Project.needs)

feat(schema): [non_breaking] Field 'sourceType' was added to object type 'ProjectAttachment' (ProjectAttachment.sourceType)

feat(schema): [non_breaking] Field 'labels' was added to object type 'ProjectSearchResult' (ProjectSearchResult.labels)

feat(schema): [non_breaking] Field 'needs' was added to object type 'ProjectSearchResult' (ProjectSearchResult.needs)

feat(schema): [non_breaking] Description for argument 'id' on field 'Query.customerNeed' changed from 'undefined' to 'The identifier of the need to retrieve.' (Query.customerNeed.id)

feat(schema): [non_breaking] Type for argument 'id' on field 'Query.customerNeed' changed from 'String!' to 'String' (Query.customerNeed.id)

feat(schema): [non_breaking] Field 'Query.roadmap' is deprecated (Query.roadmap)

feat(schema): [non_breaking] Field 'Query.roadmap' has deprecation reason 'Roadmaps are deprecated, use initiatives instead.' (Query.roadmap)

feat(schema): [non_breaking] Field 'Query.roadmaps' is deprecated (Query.roadmaps)

feat(schema): [non_breaking] Field 'Query.roadmaps' has deprecation reason 'Roadmaps are deprecated, use initiatives instead.' (Query.roadmaps)

feat(schema): [non_breaking] Field 'aiThreadSummariesEnabled' was added to object type 'Team' (Team.aiThreadSummariesEnabled)