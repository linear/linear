---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'PullRequest' was removed (PullRequest)

feat(schema): [breaking] Type 'PullRequestIssueLink' was removed (PullRequestIssueLink)

feat(schema): [breaking] Type 'PullRequestIssueLinkInput' was removed (PullRequestIssueLinkInput)

feat(schema): [breaking] Type 'PullRequestIssueLinkType' was removed (PullRequestIssueLinkType)

feat(schema): [breaking] Type 'PullRequestStatus' was removed (PullRequestStatus)

feat(schema): [breaking] Input field 'CommentCollectionFilter.documentContent' changed type from 'DocumentContentFilter' to 'NullableDocumentContentFilter' (CommentCollectionFilter.documentContent)

feat(schema): [breaking] Input field 'CommentCollectionFilter.projectUpdate' changed type from 'ProjectUpdateFilter' to 'NullableProjectUpdateFilter' (CommentCollectionFilter.projectUpdate)

feat(schema): [breaking] Input field 'CommentFilter.documentContent' changed type from 'DocumentContentFilter' to 'NullableDocumentContentFilter' (CommentFilter.documentContent)

feat(schema): [breaking] Input field 'CommentFilter.projectUpdate' changed type from 'ProjectUpdateFilter' to 'NullableProjectUpdateFilter' (CommentFilter.projectUpdate)

feat(schema): [breaking] Field 'CustomerNeed.customer' changed type from 'Customer!' to 'Customer' (CustomerNeed.customer)

feat(schema): [breaking] Field 'seenAt' was removed from object type 'FeedItem' (FeedItem.seenAt)

feat(schema): [breaking] Field 'FeedItem.user' changed type from 'User!' to 'User' (FeedItem.user)

feat(schema): [breaking] Input field 'NullableCommentFilter.documentContent' changed type from 'DocumentContentFilter' to 'NullableDocumentContentFilter' (NullableCommentFilter.documentContent)

feat(schema): [breaking] Input field 'NullableCommentFilter.projectUpdate' changed type from 'ProjectUpdateFilter' to 'NullableProjectUpdateFilter' (NullableCommentFilter.projectUpdate)

feat(schema): [breaking] Input field 'NullableProjectMilestoneFilter.name' changed type from 'StringComparator' to 'NullableStringComparator' (NullableProjectMilestoneFilter.name)

feat(schema): [breaking] Input field 'slaDayCount' was removed from input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.slaDayCount)

feat(schema): [breaking] Input field 'ProjectMilestoneCollectionFilter.name' changed type from 'StringComparator' to 'NullableStringComparator' (ProjectMilestoneCollectionFilter.name)

feat(schema): [breaking] Input field 'ProjectMilestoneFilter.name' changed type from 'StringComparator' to 'NullableStringComparator' (ProjectMilestoneFilter.name)

feat(schema): [breaking] Enum value 'myPullRequests' was removed from enum 'ViewType' (ViewType.myPullRequests)

feat(schema): [breaking] Enum value 'pullRequests' was removed from enum 'ViewType' (ViewType.pullRequests)

feat(schema): [dangerous] Input field 'url' was added to input object type 'CustomerNeedCreateInput' (CustomerNeedCreateInput.url)

feat(schema): [dangerous] Input field 'url' was added to input object type 'CustomerNeedUpdateInput' (CustomerNeedUpdateInput.url)

feat(schema): [dangerous] Input field 'approximateNeedCount' was added to input object type 'CustomerSortInput' (CustomerSortInput.approximateNeedCount)

feat(schema): [dangerous] Enum value 'teamIssues' was added to enum 'FacetPageSource' (FacetPageSource.teamIssues)

feat(schema): [dangerous] Input field 'id' was added to input object type 'GitHubRepoMappingInput' (GitHubRepoMappingInput.id)

feat(schema): [dangerous] Input field 'content' was added to input object type 'InitiativeCreateInput' (InitiativeCreateInput.content)

feat(schema): [dangerous] Input field 'content' was added to input object type 'InitiativeUpdateInput' (InitiativeUpdateInput.content)

feat(schema): [dangerous] Input field 'sourceCommentId' was added to input object type 'IssueDraftCreateInput' (IssueDraftCreateInput.sourceCommentId)

feat(schema): [dangerous] Field 'IssueHistory.actor' is no longer deprecated (IssueHistory.actor)

feat(schema): [dangerous] Argument 'alsoLeaveParentTeams: Boolean' added to field 'Mutation.teamMembershipDelete' (Mutation.teamMembershipDelete.alsoLeaveParentTeams)

feat(schema): [dangerous] Input field 'and' was added to input object type 'NullableDocumentContentFilter' (NullableDocumentContentFilter.and)

feat(schema): [dangerous] Input field 'null' was added to input object type 'NullableDocumentContentFilter' (NullableDocumentContentFilter.null)

feat(schema): [dangerous] Input field 'or' was added to input object type 'NullableDocumentContentFilter' (NullableDocumentContentFilter.or)

feat(schema): [dangerous] Input field 'initiativeUpdateId' was added to input object type 'ReactionCreateInput' (ReactionCreateInput.initiativeUpdateId)

feat(schema): [dangerous] Enum value 'myReviews' was added to enum 'ViewType' (ViewType.myReviews)

feat(schema): [dangerous] Enum value 'reviews' was added to enum 'ViewType' (ViewType.reviews)

feat(schema): [non_breaking] Type 'ApproximateNeedCountSort' was added (ApproximateNeedCountSort)

feat(schema): [non_breaking] Type 'InitiativeUpdate' was added (InitiativeUpdate)

feat(schema): [non_breaking] Type 'InitiativeUpdateConnection' was added (InitiativeUpdateConnection)

feat(schema): [non_breaking] Type 'InitiativeUpdateEdge' was added (InitiativeUpdateEdge)

feat(schema): [non_breaking] Type 'InitiativeUpdateHealthType' was added (InitiativeUpdateHealthType)

feat(schema): [non_breaking] Type 'NullableProjectUpdateFilter' was added (NullableProjectUpdateFilter)

feat(schema): [non_breaking] Type 'Post' was added (Post)

feat(schema): [non_breaking] Type 'ProjectUpdateArchivePayload' was added (ProjectUpdateArchivePayload)

feat(schema): [non_breaking] Type 'SyncedExternalThread' was added (SyncedExternalThread)

feat(schema): [non_breaking] Type 'Update' was added (Update)

feat(schema): [non_breaking] Type 'UpdateConnection' was added (UpdateConnection)

feat(schema): [non_breaking] Type 'UpdateEdge' was added (UpdateEdge)

feat(schema): [non_breaking] Type 'UpdateHealthType' was added (UpdateHealthType)

feat(schema): [non_breaking] Type 'WebhookFailureEventConnection' was added (WebhookFailureEventConnection)

feat(schema): [non_breaking] Type 'WebhookFailureEventEdge' was added (WebhookFailureEventEdge)

feat(schema): [non_breaking] Field 'externalThread' was added to object type 'Comment' (Comment.externalThread)

feat(schema): [non_breaking] Field 'post' was added to object type 'Comment' (Comment.post)

feat(schema): [non_breaking] Input field 'CommentCollectionFilter.body' description changed from 'Comparator for the comments body.' to 'Comparator for the comment's body.' (CommentCollectionFilter.body)

feat(schema): [non_breaking] Input field 'CommentCollectionFilter.documentContent' description changed from 'Filters that the comments document content must satisfy.' to 'Filters that the comment's document content must satisfy.' (CommentCollectionFilter.documentContent)

feat(schema): [non_breaking] Input field 'CommentCollectionFilter.issue' description changed from 'Filters that the comments issue must satisfy.' to 'Filters that the comment's issue must satisfy.' (CommentCollectionFilter.issue)

feat(schema): [non_breaking] Input field 'CommentCollectionFilter.projectUpdate' description changed from 'Filters that the comments project update must satisfy.' to 'Filters that the comment's project update must satisfy.' (CommentCollectionFilter.projectUpdate)

feat(schema): [non_breaking] Input field 'CommentCollectionFilter.reactions' description changed from 'Filters that the comments reactions must satisfy.' to 'Filters that the comment's reactions must satisfy.' (CommentCollectionFilter.reactions)

feat(schema): [non_breaking] Input field 'CommentCollectionFilter.user' description changed from 'Filters that the comments creator must satisfy.' to 'Filters that the comment's creator must satisfy.' (CommentCollectionFilter.user)

feat(schema): [non_breaking] Input field 'CommentFilter.body' description changed from 'Comparator for the comments body.' to 'Comparator for the comment's body.' (CommentFilter.body)

feat(schema): [non_breaking] Input field 'CommentFilter.documentContent' description changed from 'Filters that the comments document content must satisfy.' to 'Filters that the comment's document content must satisfy.' (CommentFilter.documentContent)

feat(schema): [non_breaking] Input field 'CommentFilter.issue' description changed from 'Filters that the comments issue must satisfy.' to 'Filters that the comment's issue must satisfy.' (CommentFilter.issue)

feat(schema): [non_breaking] Input field 'CommentFilter.projectUpdate' description changed from 'Filters that the comments project update must satisfy.' to 'Filters that the comment's project update must satisfy.' (CommentFilter.projectUpdate)

feat(schema): [non_breaking] Input field 'CommentFilter.reactions' description changed from 'Filters that the comments reactions must satisfy.' to 'Filters that the comment's reactions must satisfy.' (CommentFilter.reactions)

feat(schema): [non_breaking] Input field 'CommentFilter.user' description changed from 'Filters that the comments creator must satisfy.' to 'Filters that the comment's creator must satisfy.' (CommentFilter.user)

feat(schema): [non_breaking] Field 'approximateNeedCount' was added to object type 'Customer' (Customer.approximateNeedCount)

feat(schema): [non_breaking] Field 'url' was added to object type 'CustomerNeed' (CustomerNeed.url)

feat(schema): [non_breaking] Input field 'CustomerNeedCreateInput.customerId' changed type from 'String!' to 'String' (CustomerNeedCreateInput.customerId)

feat(schema): [non_breaking] Field 'customerNeed' was added to object type 'Draft' (Draft.customerNeed)

feat(schema): [non_breaking] Field 'post' was added to object type 'Draft' (Draft.post)

feat(schema): [non_breaking] Field 'organization' was added to object type 'FeedItem' (FeedItem.organization)

feat(schema): [non_breaking] Field 'post' was added to object type 'FeedItem' (FeedItem.post)

feat(schema): [non_breaking] Field 'team' was added to object type 'FeedItem' (FeedItem.team)

feat(schema): [non_breaking] Field 'id' was added to object type 'GitHubRepoMapping' (GitHubRepoMapping.id)

feat(schema): [non_breaking] Field 'content' was added to object type 'Initiative' (Initiative.content)

feat(schema): [non_breaking] Field 'health' was added to object type 'Initiative' (Initiative.health)

feat(schema): [non_breaking] Field 'healthUpdatedAt' was added to object type 'Initiative' (Initiative.healthUpdatedAt)

feat(schema): [non_breaking] Field 'slaType' was added to object type 'Issue' (Issue.slaType)

feat(schema): [non_breaking] Field 'sourceCommentId' was added to object type 'IssueDraft' (IssueDraft.sourceCommentId)

feat(schema): [non_breaking] Field 'descriptionUpdatedBy' was added to object type 'IssueHistory' (IssueHistory.descriptionUpdatedBy)

feat(schema): [non_breaking] Deprecation reason was removed from field 'IssueHistory.actor' (IssueHistory.actor)

feat(schema): [non_breaking] Field 'IssueHistory.actors' is deprecated (IssueHistory.actors)

feat(schema): [non_breaking] Field 'IssueHistory.actors' has deprecation reason 'Use `actor` and `descriptionUpdatedBy` instead.' (IssueHistory.actors)

feat(schema): [non_breaking] Field 'slaType' was added to object type 'IssueSearchResult' (IssueSearchResult.slaType)

feat(schema): [non_breaking] Field 'projectUpdateArchive' was added to object type 'Mutation' (Mutation.projectUpdateArchive)

feat(schema): [non_breaking] Field 'projectUpdateUnarchive' was added to object type 'Mutation' (Mutation.projectUpdateUnarchive)

feat(schema): [non_breaking] Field 'Mutation.projectUpdateDelete' is deprecated (Mutation.projectUpdateDelete)

feat(schema): [non_breaking] Field 'Mutation.projectUpdateDelete' has deprecation reason 'Use `projectUpdateArchive` instead.' (Mutation.projectUpdateDelete)

feat(schema): [non_breaking] Input field 'NullableCommentFilter.body' description changed from 'Comparator for the comments body.' to 'Comparator for the comment's body.' (NullableCommentFilter.body)

feat(schema): [non_breaking] Input field 'NullableCommentFilter.documentContent' description changed from 'Filters that the comments document content must satisfy.' to 'Filters that the comment's document content must satisfy.' (NullableCommentFilter.documentContent)

feat(schema): [non_breaking] Input field 'NullableCommentFilter.issue' description changed from 'Filters that the comments issue must satisfy.' to 'Filters that the comment's issue must satisfy.' (NullableCommentFilter.issue)

feat(schema): [non_breaking] Input field 'NullableCommentFilter.projectUpdate' description changed from 'Filters that the comments project update must satisfy.' to 'Filters that the comment's project update must satisfy.' (NullableCommentFilter.projectUpdate)

feat(schema): [non_breaking] Input field 'NullableCommentFilter.reactions' description changed from 'Filters that the comments reactions must satisfy.' to 'Filters that the comment's reactions must satisfy.' (NullableCommentFilter.reactions)

feat(schema): [non_breaking] Input field 'NullableCommentFilter.user' description changed from 'Filters that the comments creator must satisfy.' to 'Filters that the comment's creator must satisfy.' (NullableCommentFilter.user)

feat(schema): [non_breaking] Field 'Organization.slaDayCount' description changed from 'Which day count to use for SLA calculations.' to '[DEPRECATED] Which day count to use for SLA calculations.' (Organization.slaDayCount)

feat(schema): [non_breaking] Field 'Organization.slaDayCount' is deprecated (Organization.slaDayCount)

feat(schema): [non_breaking] Field 'Organization.slaDayCount' has deprecation reason 'No longer in use' (Organization.slaDayCount)

feat(schema): [non_breaking] Field 'ProjectUpdate.bodyData' description changed from '[Internal] The content of the project update as a Prosemirror document.' to '[Internal] The content of the update as a Prosemirror document.' (ProjectUpdate.bodyData)

feat(schema): [non_breaking] Field 'ProjectUpdate.editedAt' description changed from 'The time the project update was edited.' to 'The time the update was edited.' (ProjectUpdate.editedAt)

feat(schema): [non_breaking] Field 'ProjectUpdate.slugId' description changed from 'The project update's unique URL slug.' to 'The update's unique URL slug.' (ProjectUpdate.slugId)

feat(schema): [non_breaking] Description 'The health type of a project when the update is created.' on type 'ProjectUpdateHealthType' has changed to 'The health type when the project update is created.' (ProjectUpdateHealthType)

feat(schema): [non_breaking] Field 'initiativeUpdate' was added to object type 'Reaction' (Reaction.initiativeUpdate)

feat(schema): [non_breaking] Field 'post' was added to object type 'Reaction' (Reaction.post)

feat(schema): [non_breaking] Field 'failures' was added to object type 'Webhook' (Webhook.failures)