---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'DataRecovery' was removed (DataRecovery)

feat(schema): [breaking] Field 'name' was removed from object type 'GithubOrg' (GithubOrg.name)

feat(schema): [dangerous] Input field 'templateId' was added to input object type 'EmailIntakeAddressCreateInput' (EmailIntakeAddressCreateInput.templateId)

feat(schema): [dangerous] Input field 'facetId' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.facetId)

feat(schema): [dangerous] Input field 'pausedAt' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.pausedAt)

feat(schema): [dangerous] Input field 'status' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.status)

feat(schema): [dangerous] Input field 'pausedAt' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.pausedAt)

feat(schema): [dangerous] Input field 'status' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.status)

feat(schema): [dangerous] Input field 'pausedAt' was added to input object type 'ProjectFilter' (ProjectFilter.pausedAt)

feat(schema): [dangerous] Input field 'status' was added to input object type 'ProjectFilter' (ProjectFilter.status)

feat(schema): [dangerous] Input field 'pausedAt' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.pausedAt)

feat(schema): [dangerous] Argument 'snippetSize: Float' added to field 'Query.searchDocuments' (Query.searchDocuments.snippetSize)

feat(schema): [dangerous] Argument 'snippetSize: Float' added to field 'Query.searchIssues' (Query.searchIssues.snippetSize)

feat(schema): [dangerous] Argument 'snippetSize: Float' added to field 'Query.searchProjects' (Query.searchProjects.snippetSize)

feat(schema): [dangerous] Enum value 'splitSearch' was added to enum 'ViewType' (ViewType.splitSearch)

feat(schema): [non_breaking] Type 'ProjectStatusFilter' was added (ProjectStatusFilter)

feat(schema): [non_breaking] Field 'summaryText' was added to object type 'Comment' (Comment.summaryText)

feat(schema): [non_breaking] Input field 'EmailIntakeAddressCreateInput.teamId' changed type from 'String!' to 'String' (EmailIntakeAddressCreateInput.teamId)

feat(schema): [non_breaking] Input field 'NullableProjectFilter.searchableContent' description changed from '[Internal] Comparator for the projects content.' to '[Internal] Comparator for the project's content.' (NullableProjectFilter.searchableContent)

feat(schema): [non_breaking] Field 'pausedAt' was added to object type 'Project' (Project.pausedAt)

feat(schema): [non_breaking] Field 'status' was added to object type 'Project' (Project.status)

feat(schema): [non_breaking] Input field 'ProjectCollectionFilter.searchableContent' description changed from '[Internal] Comparator for the projects content.' to '[Internal] Comparator for the project's content.' (ProjectCollectionFilter.searchableContent)

feat(schema): [non_breaking] Input field 'ProjectFilter.searchableContent' description changed from '[Internal] Comparator for the projects content.' to '[Internal] Comparator for the project's content.' (ProjectFilter.searchableContent)

feat(schema): [non_breaking] Field 'issues' was added to object type 'ProjectMilestone' (ProjectMilestone.issues)

feat(schema): [non_breaking] Field 'pausedAt' was added to object type 'ProjectSearchResult' (ProjectSearchResult.pausedAt)

feat(schema): [non_breaking] Field 'status' was added to object type 'ProjectSearchResult' (ProjectSearchResult.status)

feat(schema): [non_breaking] Field 'applicationInfoWithMembershipsByIds' was added to object type 'Query' (Query.applicationInfoWithMembershipsByIds)

feat(schema): [non_breaking] Description for argument 'hash' on field 'Query.comment' changed from 'The hash of the comment to retrieve, must be combined with an issueId.' to 'The hash of the comment to retrieve.' (Query.comment.hash)

feat(schema): [non_breaking] Description for argument 'issueId' on field 'Query.comment' changed from 'The issue for which to find the comment.' to '[Deprecated] The issue for which to find the comment.' (Query.comment.issueId)

feat(schema): [non_breaking] Field 'Query.workspaceAuthorizedApplications' description changed from '[INTERNAL] Get all authorized applications (with limited fields) for a workspace.' to '[INTERNAL] Get non-internal authorized applications (with limited fields) for a workspace' (Query.workspaceAuthorizedApplications)