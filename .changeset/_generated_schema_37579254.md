---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'sourceComment' was removed from object type 'AgentActivity' (AgentActivity.sourceComment)

feat(schema): [breaking] Field 'sourceCommentId' was removed from object type 'AgentActivityPromptContent' (AgentActivityPromptContent.sourceCommentId)

feat(schema): [breaking] Field 'sourceCommentId' was removed from object type 'AgentActivityResponseContent' (AgentActivityResponseContent.sourceCommentId)

feat(schema): [non_breaking] Field 'sourceCommentId' was added to object type 'AgentActivity' (AgentActivity.sourceCommentId)

feat(schema): [non_breaking] Field 'AgentActivityPromptContent.body' changed type from 'String' to 'String!' (AgentActivityPromptContent.body)

feat(schema): [non_breaking] Field 'body' was added to object type 'AgentActivityResponseContent' (AgentActivityResponseContent.body)

feat(schema): [non_breaking] Field 'Query.semanticSearch' description changed from '[ALPHA] Search for various resources using natural language.' to '[INTERNAL] Search for various resources using natural language.' (Query.semanticSearch)

feat(schema): [non_breaking] Field 'Query.semanticSearch' is deprecated (Query.semanticSearch)

feat(schema): [non_breaking] Field 'Query.semanticSearch' has deprecation reason 'Use specific search endpoints like searchIssues, searchProjects, searchDocuments instead.' (Query.semanticSearch)

feat(schema): [non_breaking] Description '[ALPHA] Payload returned by semantic search.' on type 'SemanticSearchPayload' has changed to '[INTERNAL] Payload returned by semantic search.' (SemanticSearchPayload)

feat(schema): [non_breaking] Description '[ALPHA] A semantic search result reference.' on type 'SemanticSearchResult' has changed to '[INTERNAL] A semantic search result reference.' (SemanticSearchResult)

feat(schema): [non_breaking] Description '[ALPHA] The type of the semantic search result.' on type 'SemanticSearchResultType' has changed to '[INTERNAL] The type of the semantic search result.' (SemanticSearchResultType)