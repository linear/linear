---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'allowedAiProviders' was removed from input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.allowedAiProviders)

feat(schema): [dangerous] Input field 'hasSharedUsers' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.hasSharedUsers)

feat(schema): [dangerous] Input field 'sharedWith' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.sharedWith)

feat(schema): [dangerous] Input field 'hasSharedUsers' was added to input object type 'IssueFilter' (IssueFilter.hasSharedUsers)

feat(schema): [dangerous] Input field 'sharedWith' was added to input object type 'IssueFilter' (IssueFilter.sharedWith)

feat(schema): [dangerous] Input field 'hasSharedUsers' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.hasSharedUsers)

feat(schema): [dangerous] Input field 'sharedWith' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.sharedWith)

feat(schema): [dangerous] Enum value 'myIssuesSharedWithMe' was added to enum 'ViewType' (ViewType.myIssuesSharedWithMe)

feat(schema): [non_breaking] Field 'AgentActivityWebhookPayload.userId' changed type from 'String' to 'String!' (AgentActivityWebhookPayload.userId)

feat(schema): [non_breaking] Field 'url' was added to object type 'AgentSession' (AgentSession.url)

feat(schema): [non_breaking] Input field 'AgentSessionCreateInput.context' description changed from 'Serialized JSON representing the page contexts this session is related to. Used for direct chat sessions to provide context about the current page (e.g., Issue, Project).' to '[Internal] Serialized JSON representing the page contexts this session is related to. Used for direct chat sessions to provide context about the current page (e.g., Issue, Project).' (AgentSessionCreateInput.context)

feat(schema): [non_breaking] Field 'url' was added to object type 'AgentSessionWebhookPayload' (AgentSessionWebhookPayload.url)

feat(schema): [non_breaking] Field 'Organization.allowedAiProviders' description changed from '[INTERNAL] Permitted AI providers in order of preference. Empty array means all providers are allowed.' to '[INTERNAL] Permitted AI providers.' (Organization.allowedAiProviders)

feat(schema): [non_breaking] Field 'Organization.allowedAiProviders' is deprecated (Organization.allowedAiProviders)

feat(schema): [non_breaking] Field 'Organization.allowedAiProviders' has deprecation reason 'Use aiProviderConfiguration instead.' (Organization.allowedAiProviders)