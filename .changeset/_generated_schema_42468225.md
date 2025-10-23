---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'ApiKey' was removed (ApiKey)

feat(schema): [breaking] Type 'ApiKeyConnection' was removed (ApiKeyConnection)

feat(schema): [breaking] Type 'ApiKeyCreateInput' was removed (ApiKeyCreateInput)

feat(schema): [breaking] Type 'ApiKeyEdge' was removed (ApiKeyEdge)

feat(schema): [breaking] Type 'ApiKeyPayload' was removed (ApiKeyPayload)

feat(schema): [breaking] Type 'ApiKeyUpdateInput' was removed (ApiKeyUpdateInput)

feat(schema): [breaking] Field 'apiKeyCreate' was removed from object type 'Mutation' (Mutation.apiKeyCreate)

feat(schema): [breaking] Field 'apiKeyDelete' was removed from object type 'Mutation' (Mutation.apiKeyDelete)

feat(schema): [breaking] Field 'apiKeyUpdate' was removed from object type 'Mutation' (Mutation.apiKeyUpdate)

feat(schema): [breaking] Field 'apiKeys' was removed from object type 'Query' (Query.apiKeys)

feat(schema): [dangerous] Input field 'dismissedAt' was added to input object type 'AgentSessionUpdateInput' (AgentSessionUpdateInput.dismissedAt)

feat(schema): [dangerous] Input field 'distinctId' was added to input object type 'ContactSalesCreateInput' (ContactSalesCreateInput.distinctId)

feat(schema): [dangerous] Input field 'accumulatedStateUpdatedAt' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.accumulatedStateUpdatedAt)

feat(schema): [dangerous] Input field 'accumulatedStateUpdatedAt' was added to input object type 'IssueFilter' (IssueFilter.accumulatedStateUpdatedAt)

feat(schema): [dangerous] Input field 'accumulatedStateUpdatedAt' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.accumulatedStateUpdatedAt)

feat(schema): [dangerous] Enum value 'slackAgentPromoFromCreateNewIssueShown' was added to enum 'UserFlagType' (UserFlagType.slackAgentPromoFromCreateNewIssueShown)

feat(schema): [non_breaking] Field 'dismissedAt' was added to object type 'AgentSession' (AgentSession.dismissedAt)

feat(schema): [non_breaking] Input field 'AgentSessionUpdateInput.externalLink' description changed from 'The URL of an external agent-hosted page associated with this session.' to 'The URL of an external agent-hosted page associated with this session. Only updatable by the OAuth application that owns the session.' (AgentSessionUpdateInput.externalLink)

feat(schema): [non_breaking] Input field 'AgentSessionUpdateInput.plan' description changed from 'A dynamically updated list of the agent's execution strategy.' to 'A dynamically updated list of the agent's execution strategy. Only updatable by the OAuth application that owns the session.' (AgentSessionUpdateInput.plan)

feat(schema): [non_breaking] Field 'ownersGroupPush' was added to object type 'IdentityProvider' (IdentityProvider.ownersGroupPush)

feat(schema): [non_breaking] Field 'userChangeRole' was added to object type 'Mutation' (Mutation.userChangeRole)

feat(schema): [non_breaking] Field 'Mutation.organizationCancelDelete' description changed from 'Cancels the deletion of an organization. Administrator privileges required.' to 'Cancels the deletion of an organization.' (Mutation.organizationCancelDelete)

feat(schema): [non_breaking] Field 'Mutation.organizationDelete' description changed from 'Delete's an organization. Administrator privileges required.' to 'Deletes an organization.' (Mutation.organizationDelete)

feat(schema): [non_breaking] Field 'Mutation.organizationDeleteChallenge' description changed from 'Get an organization's delete confirmation token. Administrator privileges required.' to 'Get an organization's delete confirmation token.' (Mutation.organizationDeleteChallenge)

feat(schema): [non_breaking] Field 'Mutation.organizationStartTrial' description changed from '[DEPRECATED] Starts a trial for the organization. Administrator privileges required.' to '[DEPRECATED] Starts a trial for the organization.' (Mutation.organizationStartTrial)

feat(schema): [non_breaking] Field 'Mutation.organizationStartTrialForPlan' description changed from 'Starts a trial for the organization on the specified plan type. Administrator privileges required.' to 'Starts a trial for the organization on the specified plan type.' (Mutation.organizationStartTrialForPlan)

feat(schema): [non_breaking] Field 'Mutation.userDemoteAdmin' description changed from 'Makes user a regular user. Can only be called by an admin.' to 'Makes user a regular user. Can only be called by an admin or owner.' (Mutation.userDemoteAdmin)

feat(schema): [non_breaking] Field 'Mutation.userPromoteAdmin' description changed from 'Makes user an admin. Can only be called by an admin.' to 'Makes user an admin. Can only be called by an admin or owner.' (Mutation.userPromoteAdmin)

feat(schema): [non_breaking] Field 'supportsAgentSessions' was added to object type 'User' (User.supportsAgentSessions)