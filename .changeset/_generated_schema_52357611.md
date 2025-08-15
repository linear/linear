---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'supervisor' was removed from object type 'Issue' (Issue.supervisor)

feat(schema): [breaking] Field 'supervisor' was removed from object type 'IssueSearchResult' (IssueSearchResult.supervisor)

feat(schema): [dangerous] Enum value 'continue' was added to enum 'AgentActivitySignal' (AgentActivitySignal.continue)

feat(schema): [dangerous] Input field 'suggestions' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.suggestions)

feat(schema): [dangerous] Input field 'suggestions' was added to input object type 'IssueFilter' (IssueFilter.suggestions)

feat(schema): [dangerous] Input field 'suggestions' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.suggestions)

feat(schema): [dangerous] Input field 'private' was added to input object type 'NullableTeamFilter' (NullableTeamFilter.private)

feat(schema): [dangerous] Input field 'private' was added to input object type 'TeamFilter' (TeamFilter.private)

feat(schema): [non_breaking] Type 'IssueSuggestionCollectionFilter' was added (IssueSuggestionCollectionFilter)

feat(schema): [non_breaking] Type 'IssueSuggestionFilter' was added (IssueSuggestionFilter)

feat(schema): [non_breaking] Input field 'AgentActivityCreateInput.signal' description changed from '[Internal] An optional modifier that provides additional instructions on how the activity should be interpreted.' to 'An optional modifier that provides additional instructions on how the activity should be interpreted.' (AgentActivityCreateInput.signal)

feat(schema): [non_breaking] Input field 'AgentActivityCreatePromptInput.signal' description changed from '[Internal] An optional modifier that provides additional instructions on how the activity should be interpreted.' to 'An optional modifier that provides additional instructions on how the activity should be interpreted.' (AgentActivityCreatePromptInput.signal)

feat(schema): [non_breaking] Field 'anchor' was added to object type 'Draft' (Draft.anchor)

feat(schema): [non_breaking] Field 'filters' was added to object type 'FetchDataPayload' (FetchDataPayload.filters)

feat(schema): [non_breaking] Field 'query' was added to object type 'FetchDataPayload' (FetchDataPayload.query)

feat(schema): [non_breaking] Field 'asksExternalUserRequester' was added to object type 'Issue' (Issue.asksExternalUserRequester)

feat(schema): [non_breaking] Field 'asksRequester' was added to object type 'Issue' (Issue.asksRequester)

feat(schema): [non_breaking] Input field 'IssueCollectionFilter.priority' description changed from 'Comparator for the issues priority.' to 'Comparator for the issues priority. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' (IssueCollectionFilter.priority)

feat(schema): [non_breaking] Input field 'IssueFilter.priority' description changed from 'Comparator for the issues priority.' to 'Comparator for the issues priority. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' (IssueFilter.priority)

feat(schema): [non_breaking] Field 'asksExternalUserRequester' was added to object type 'IssueSearchResult' (IssueSearchResult.asksExternalUserRequester)

feat(schema): [non_breaking] Field 'asksRequester' was added to object type 'IssueSearchResult' (IssueSearchResult.asksRequester)

feat(schema): [non_breaking] Input field 'NullableIssueFilter.priority' description changed from 'Comparator for the issues priority.' to 'Comparator for the issues priority. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' (NullableIssueFilter.priority)

feat(schema): [non_breaking] Input field 'WorkflowStateFilter.type' description changed from 'Comparator for the workflow state type.' to 'Comparator for the workflow state type. Possible values are "triage", "backlog", "unstarted", "started", "completed", "canceled".' (WorkflowStateFilter.type)