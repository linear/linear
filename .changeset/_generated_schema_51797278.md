---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'comment' was removed from object type 'AgentContextEventWebhookPayload' (AgentContextEventWebhookPayload.comment)

feat(schema): [breaking] Field 'supervisedIssues' was removed from object type 'User' (User.supervisedIssues)

feat(schema): [dangerous] Member 'AgentActivityWebhookPayload' was added to Union type 'DataWebhookPayload' (DataWebhookPayload)

feat(schema): [dangerous] Input field 'customerRequestsEnabled' was added to input object type 'EmailIntakeAddressCreateInput' (EmailIntakeAddressCreateInput.customerRequestsEnabled)

feat(schema): [dangerous] Input field 'pullRequestId' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.pullRequestId)

feat(schema): [dangerous] Input field 'delegateId' was added to input object type 'IssueCreateInput' (IssueCreateInput.delegateId)

feat(schema): [dangerous] Input field 'useDefaultTemplate' was added to input object type 'IssueCreateInput' (IssueCreateInput.useDefaultTemplate)

feat(schema): [non_breaking] Type 'AgentActivityWebhookPayload' was added (AgentActivityWebhookPayload)

feat(schema): [non_breaking] Field 'sourceComment' was added to object type 'AgentActivity' (AgentActivity.sourceComment)

feat(schema): [non_breaking] Input field 'AgentActivityCreateInput.content' description changed from 'The content payload of the agent activity.' to 'The content payload of the agent activity. This object is not strictly typed.
See https://linear.app/developers/agents for typing details.' (AgentActivityCreateInput.content)

feat(schema): [non_breaking] Field 'agentActivity' was added to object type 'AgentContextEventWebhookPayload' (AgentContextEventWebhookPayload.agentActivity)

feat(schema): [non_breaking] Field 'pullRequest' was added to object type 'Favorite' (Favorite.pullRequest)

feat(schema): [non_breaking] Field 'delegate' was added to object type 'IssueWebhookPayload' (IssueWebhookPayload.delegate)

feat(schema): [non_breaking] Field 'delegateId' was added to object type 'IssueWebhookPayload' (IssueWebhookPayload.delegateId)

feat(schema): [non_breaking] Field 'delegatedIssues' was added to object type 'User' (User.delegatedIssues)