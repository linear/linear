---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'DiaryEntryCreateInput' was removed (DiaryEntryCreateInput)

feat(schema): [breaking] Type 'DiaryEntryPayload' was removed (DiaryEntryPayload)

feat(schema): [breaking] Type 'DiaryEntryUpdateInput' was removed (DiaryEntryUpdateInput)

feat(schema): [breaking] Type 'EntityCountResponse' was removed (EntityCountResponse)

feat(schema): [breaking] Type 'TrashOptionType' was removed (TrashOptionType)

feat(schema): [breaking] Input field 'CustomerCollectionFilter.owner' changed type from 'UserFilter' to 'NullableUserFilter' (CustomerCollectionFilter.owner)

feat(schema): [breaking] Input field 'CustomerFilter.owner' changed type from 'UserFilter' to 'NullableUserFilter' (CustomerFilter.owner)

feat(schema): [breaking] Field 'url' was removed from object type 'DiaryEntry' (DiaryEntry.url)

feat(schema): [breaking] Field 'diaryEntryCreate' was removed from object type 'Mutation' (Mutation.diaryEntryCreate)

feat(schema): [breaking] Field 'diaryEntryDelete' was removed from object type 'Mutation' (Mutation.diaryEntryDelete)

feat(schema): [breaking] Field 'diaryEntryUpdate' was removed from object type 'Mutation' (Mutation.diaryEntryUpdate)

feat(schema): [breaking] Argument 'code: String!' added to field 'Mutation.integrationLaunchDarklyConnect' (Mutation.integrationLaunchDarklyConnect.code)

feat(schema): [breaking] Argument 'apiKey: String!' was removed from field 'Mutation.integrationLaunchDarklyConnect' (Mutation.integrationLaunchDarklyConnect.apiKey)

feat(schema): [breaking] Field 'archivedModelSync' (deprecated) was removed from object type 'Query' (Query.archivedModelSync)

feat(schema): [breaking] Field 'archivedModelsSync' (deprecated) was removed from object type 'Query' (Query.archivedModelsSync)

feat(schema): [breaking] Field 'diaryEntry' was removed from object type 'Query' (Query.diaryEntry)

feat(schema): [breaking] Field 'syncEntityCount' was removed from object type 'Query' (Query.syncEntityCount)

feat(schema): [dangerous] Input field 'issueId' was added to input object type 'CustomerNeedUpdateInput' (CustomerNeedUpdateInput.issueId)

feat(schema): [dangerous] Input field 'projectId' was added to input object type 'CustomerNeedUpdateInput' (CustomerNeedUpdateInput.projectId)

feat(schema): [dangerous] Input field 'customerId' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.customerId)

feat(schema): [dangerous] Enum value 'launchDarklyPersonal' was added to enum 'IntegrationService' (IntegrationService.launchDarklyPersonal)

feat(schema): [dangerous] Argument 'jql: String' added to field 'Mutation.issueImportCreateJira' (Mutation.issueImportCreateJira.jql)

feat(schema): [dangerous] Input field 'content' was added to input object type 'ProjectCreateInput' (ProjectCreateInput.content)

feat(schema): [dangerous] Input field 'content' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.content)

feat(schema): [dangerous] Input field 'aiTitles' was added to input object type 'SlackChannelNameMappingInput' (SlackChannelNameMappingInput.aiTitles)

feat(schema): [dangerous] Enum value 'myPullRequests' was added to enum 'ViewType' (ViewType.myPullRequests)

feat(schema): [dangerous] Enum value 'pullRequests' was added to enum 'ViewType' (ViewType.pullRequests)

feat(schema): [non_breaking] Type 'FeedItem' was added (FeedItem)

feat(schema): [non_breaking] Type 'IssueImportJqlCheckPayload' was added (IssueImportJqlCheckPayload)

feat(schema): [non_breaking] Type 'ProjectStatusArchivePayload' was added (ProjectStatusArchivePayload)

feat(schema): [non_breaking] Type 'ProjectStatusCountPayload' was added (ProjectStatusCountPayload)

feat(schema): [non_breaking] Type 'ProjectStatusCreateInput' was added (ProjectStatusCreateInput)

feat(schema): [non_breaking] Type 'ProjectStatusPayload' was added (ProjectStatusPayload)

feat(schema): [non_breaking] Type 'ProjectStatusUpdateInput' was added (ProjectStatusUpdateInput)

feat(schema): [non_breaking] Type 'PullRequest' was added (PullRequest)

feat(schema): [non_breaking] Type 'PullRequestIssueLink' was added (PullRequestIssueLink)

feat(schema): [non_breaking] Type 'PullRequestIssueLinkInput' was added (PullRequestIssueLinkInput)

feat(schema): [non_breaking] Type 'PullRequestIssueLinkType' was added (PullRequestIssueLinkType)

feat(schema): [non_breaking] Type 'PullRequestReviewer' was added (PullRequestReviewer)

feat(schema): [non_breaking] Type 'PullRequestReviewerDecision' was added (PullRequestReviewerDecision)

feat(schema): [non_breaking] Type 'PullRequestReviewerInput' was added (PullRequestReviewerInput)

feat(schema): [non_breaking] Type 'PullRequestStatus' was added (PullRequestStatus)

feat(schema): [non_breaking] Field 'Comment.bodyData' changed type from 'String' to 'String!' (Comment.bodyData)

feat(schema): [non_breaking] Input field 'CommentUpdateInput.bodyData' description changed from 'The comment content as a Prosemirror document.' to '[Internal] The comment content as a Prosemirror document.' (CommentUpdateInput.bodyData)

feat(schema): [non_breaking] Field 'CustomerNeed.priority' description changed from 'The priority of the customer need. 0 = No priority, 1 = Critical, 2 = Important, 3 = Nice to have.' to 'The urgency of the customer need. 0 = No urgency, 1 = Critical, 2 = Important, 3 = Nice to have.' (CustomerNeed.priority)

feat(schema): [non_breaking] Input field 'CustomerNeedCreateInput.priority' description changed from 'The priority of the customer need. 0 = No priority, 1 = Critical, 2 = Important, 3 = Nice to have.' to 'The urgency of the customer need. 0 = No urgency, 1 = Critical, 2 = Important, 3 = Nice to have.' (CustomerNeedCreateInput.priority)

feat(schema): [non_breaking] Input field 'CustomerNeedUpdateInput.priority' description changed from 'The priority of the customer need. 0 = No priority, 1 = Critical, 2 = Important, 3 = Nice to have.' to 'The urgency of the customer need. 0 = No urgency, 1 = Critical, 2 = Important, 3 = Nice to have.' (CustomerNeedUpdateInput.priority)

feat(schema): [non_breaking] Field 'customer' was added to object type 'Favorite' (Favorite.customer)

feat(schema): [non_breaking] Field 'labels' was added to object type 'IssueDraft' (IssueDraft.labels)

feat(schema): [non_breaking] Field 'integrationLaunchDarklyPersonalConnect' was added to object type 'Mutation' (Mutation.integrationLaunchDarklyPersonalConnect)

feat(schema): [non_breaking] Field 'projectStatusArchive' was added to object type 'Mutation' (Mutation.projectStatusArchive)

feat(schema): [non_breaking] Field 'projectStatusCreate' was added to object type 'Mutation' (Mutation.projectStatusCreate)

feat(schema): [non_breaking] Field 'projectStatusUnarchive' was added to object type 'Mutation' (Mutation.projectStatusUnarchive)

feat(schema): [non_breaking] Field 'projectStatusUpdate' was added to object type 'Mutation' (Mutation.projectStatusUpdate)

feat(schema): [non_breaking] Field 'updateIntegrationSlackScopes' was added to object type 'Mutation' (Mutation.updateIntegrationSlackScopes)

feat(schema): [non_breaking] Field 'customerCount' was added to object type 'Organization' (Organization.customerCount)

feat(schema): [non_breaking] Field 'comments' was added to object type 'Project' (Project.comments)

feat(schema): [non_breaking] Field 'Project.health' description changed from 'The health of the project based on the last project update.' to 'The health of the project.' (Project.health)

feat(schema): [non_breaking] Field 'comments' was added to object type 'ProjectSearchResult' (ProjectSearchResult.comments)

feat(schema): [non_breaking] Field 'ProjectSearchResult.health' description changed from 'The health of the project based on the last project update.' to 'The health of the project.' (ProjectSearchResult.health)

feat(schema): [non_breaking] Field 'issueImportJqlCheck' was added to object type 'Query' (Query.issueImportJqlCheck)

feat(schema): [non_breaking] Field 'projectStatus' was added to object type 'Query' (Query.projectStatus)

feat(schema): [non_breaking] Field 'projectStatusProjectCount' was added to object type 'Query' (Query.projectStatusProjectCount)

feat(schema): [non_breaking] Field 'projectStatuses' was added to object type 'Query' (Query.projectStatuses)

feat(schema): [non_breaking] Field 'aiTitles' was added to object type 'SlackChannelNameMapping' (SlackChannelNameMapping.aiTitles)

feat(schema): [non_breaking] Field 'initiative' was added to object type 'WorkflowDefinition' (WorkflowDefinition.initiative)