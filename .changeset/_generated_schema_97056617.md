---
"@linear/sdk": minor
---


feat(schema): [dangerous] Member 'ReleaseWebhookPayload' was added to Union type 'DataWebhookPayload' (DataWebhookPayload)

feat(schema): [dangerous] Input field 'tagParticipantsInIssues' was added to input object type 'GongSettingsInput' (GongSettingsInput.tagParticipantsInIssues)

feat(schema): [dangerous] Input field 'release' was added to input object type 'IssueSortInput' (IssueSortInput.release)

feat(schema): [dangerous] Input field 'parentId' was added to input object type 'IssueSubscriptionFilter' (IssueSubscriptionFilter.parentId)

feat(schema): [dangerous] Argument 'workflowDefinitionId: String' added to field 'Mutation.integrationMcpServerConnect' (Mutation.integrationMcpServerConnect.workflowDefinitionId)

feat(schema): [dangerous] Argument 'sort: [ReleaseSortInput!]' added to field 'Query.releases' (Query.releases.sort)

feat(schema): [dangerous] Enum value 'release' was added to enum 'WorkflowTriggerType' (WorkflowTriggerType.release)

feat(schema): [non_breaking] Type 'ReleasePipelineChildWebhookPayload' was added (ReleasePipelineChildWebhookPayload)

feat(schema): [non_breaking] Type 'ReleaseSort' was added (ReleaseSort)

feat(schema): [non_breaking] Type 'ReleaseStageChildWebhookPayload' was added (ReleaseStageChildWebhookPayload)

feat(schema): [non_breaking] Type 'ReleaseWebhookPayload' was added (ReleaseWebhookPayload)

feat(schema): [non_breaking] Field 'inheritsSharedAccess' was added to object type 'Issue' (Issue.inheritsSharedAccess)

feat(schema): [non_breaking] Field 'Issue.priority' description changed from 'The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' to 'The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (Issue.priority)

feat(schema): [non_breaking] Input field 'IssueCollectionFilter.priority' description changed from 'Comparator for the issues priority. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' to 'Comparator for the issues priority. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (IssueCollectionFilter.priority)

feat(schema): [non_breaking] Input field 'IssueCreateInput.priority' description changed from 'The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' to 'The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (IssueCreateInput.priority)

feat(schema): [non_breaking] Input field 'IssueFilter.priority' description changed from 'Comparator for the issues priority. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' to 'Comparator for the issues priority. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (IssueFilter.priority)

feat(schema): [non_breaking] Field 'inheritsSharedAccess' was added to object type 'IssueSearchResult' (IssueSearchResult.inheritsSharedAccess)

feat(schema): [non_breaking] Field 'IssueSearchResult.priority' description changed from 'The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' to 'The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (IssueSearchResult.priority)

feat(schema): [non_breaking] Input field 'IssueUpdateInput.priority' description changed from 'The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' to 'The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (IssueUpdateInput.priority)

feat(schema): [non_breaking] Field 'IssueWebhookPayload.priority' description changed from 'The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' to 'The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (IssueWebhookPayload.priority)

feat(schema): [non_breaking] Field 'Mutation.integrationMicrosoftPersonalConnect' description changed from '[ALPHA] Connects the user's personal Microsoft account to Linear.' to 'Connects the user's personal Microsoft account to Linear.' (Mutation.integrationMicrosoftPersonalConnect)

feat(schema): [non_breaking] Field 'Mutation.integrationMicrosoftTeams' description changed from '[ALPHA] Integrates the organization with Microsoft Teams.' to 'Integrates the organization with Microsoft Teams.' (Mutation.integrationMicrosoftTeams)

feat(schema): [non_breaking] Input field 'NullableIssueFilter.priority' description changed from 'Comparator for the issues priority. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' to 'Comparator for the issues priority. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (NullableIssueFilter.priority)

feat(schema): [non_breaking] Field 'Project.priority' description changed from 'The priority of the project. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' to 'The priority of the project. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (Project.priority)

feat(schema): [non_breaking] Input field 'ProjectCreateInput.priority' description changed from 'The priority of the project. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' to 'The priority of the project. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (ProjectCreateInput.priority)

feat(schema): [non_breaking] Field 'ProjectSearchResult.priority' description changed from 'The priority of the project. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' to 'The priority of the project. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (ProjectSearchResult.priority)

feat(schema): [non_breaking] Input field 'ProjectUpdateInput.priority' description changed from 'The priority of the project. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' to 'The priority of the project. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (ProjectUpdateInput.priority)

feat(schema): [non_breaking] Field 'ProjectWebhookPayload.priority' description changed from 'The priority of the project. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' to 'The priority of the project. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (ProjectWebhookPayload.priority)

feat(schema): [non_breaking] Field 'documentContentHistoryEntries' was added to object type 'Query' (Query.documentContentHistoryEntries)

feat(schema): [non_breaking] Field 'documentContentCreated' was added to object type 'Subscription' (Subscription.documentContentCreated)

feat(schema): [non_breaking] Field 'documentContentUpdated' was added to object type 'Subscription' (Subscription.documentContentUpdated)