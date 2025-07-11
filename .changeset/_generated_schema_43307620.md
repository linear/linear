---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'AgentContextStatus' was removed (AgentContextStatus)

feat(schema): [breaking] Type 'AgentContextType' was removed (AgentContextType)

feat(schema): [breaking] Field 'sourceCommentId' was removed from object type 'AgentActivity' (AgentActivity.sourceCommentId)

feat(schema): [breaking] Field 'AgentActivity.agentContext' changed type from 'AgentContext!' to 'AgentContext' (AgentActivity.agentContext)

feat(schema): [breaking] Input field 'agentSessionId' was added to input object type 'AgentActivityCreateInput' (AgentActivityCreateInput.agentSessionId)

feat(schema): [breaking] Input field 'agentContextId' was removed from input object type 'AgentActivityCreateInput' (AgentActivityCreateInput.agentContextId)

feat(schema): [breaking] Field 'AgentContext.status' changed type from 'AgentContextStatus!' to 'AgentSessionStatus!' (AgentContext.status)

feat(schema): [breaking] Field 'AgentContext.type' changed type from 'AgentContextType!' to 'AgentSessionType!' (AgentContext.type)

feat(schema): [breaking] Input field 'AgentContextCreateInput.type' changed type from 'AgentContextType!' to 'AgentSessionType!' (AgentContextCreateInput.type)

feat(schema): [breaking] Input field 'AgentContextUpdateInput.status' changed type from 'AgentContextStatus' to 'AgentSessionStatus' (AgentContextUpdateInput.status)

feat(schema): [non_breaking] Type 'AgentSession' was added (AgentSession)

feat(schema): [non_breaking] Type 'AgentSessionConnection' was added (AgentSessionConnection)

feat(schema): [non_breaking] Type 'AgentSessionEdge' was added (AgentSessionEdge)

feat(schema): [non_breaking] Type 'AgentSessionStatus' was added (AgentSessionStatus)

feat(schema): [non_breaking] Type 'AgentSessionType' was added (AgentSessionType)

feat(schema): [non_breaking] Field 'agentSession' was added to object type 'AgentActivity' (AgentActivity.agentSession)

feat(schema): [non_breaking] Field 'AgentActivity.sourceComment' description changed from 'The comment that this activity is linked to.' to 'The comment this activity is linked to.' (AgentActivity.sourceComment)

feat(schema): [non_breaking] Description 'A context for agent activities and state management.' on type 'AgentContext' has changed to '[DEPRECATED] A context for agent activities and state management.' (AgentContext)

feat(schema): [non_breaking] Field 'documentContent' was added to object type 'Initiative' (Initiative.documentContent)

feat(schema): [non_breaking] Field 'documents' was added to object type 'Initiative' (Initiative.documents)

feat(schema): [non_breaking] Field 'Issue.delegate' description changed from '[Internal] The agent that is delegated to complete this issue.' to 'The app user that is delegated to work on this issue.' (Issue.delegate)

feat(schema): [non_breaking] Input field 'IssueCollectionFilter.delegate' description changed from '[Internal] Filters that the issues delegate must satisfy.' to 'Filters that the issue's delegate must satisfy.' (IssueCollectionFilter.delegate)

feat(schema): [non_breaking] Input field 'IssueFilter.delegate' description changed from '[Internal] Filters that the issues delegate must satisfy.' to 'Filters that the issue's delegate must satisfy.' (IssueFilter.delegate)

feat(schema): [non_breaking] Field 'IssueSearchResult.delegate' description changed from '[Internal] The agent that is delegated to complete this issue.' to 'The app user that is delegated to work on this issue.' (IssueSearchResult.delegate)

feat(schema): [non_breaking] Input field 'NullableIssueFilter.delegate' description changed from '[Internal] Filters that the issues delegate must satisfy.' to 'Filters that the issue's delegate must satisfy.' (NullableIssueFilter.delegate)

feat(schema): [non_breaking] Field 'agentSession' was added to object type 'Query' (Query.agentSession)

feat(schema): [non_breaking] Field 'agentSessions' was added to object type 'Query' (Query.agentSessions)

feat(schema): [non_breaking] Field 'User.delegatedIssues' description changed from '[Internal] Issues delegated to this user.' to 'Issues delegated to this user.' (User.delegatedIssues)