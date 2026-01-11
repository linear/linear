---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'AgentSession.type' changed type from 'AgentSessionType!' to 'AgentSessionType' (AgentSession.type)

feat(schema): [breaking] Input field 'AgentSessionExternalUrlInput.label' changed type from 'String' to 'String!' (AgentSessionExternalUrlInput.label)

feat(schema): [breaking] Field 'issueCanceledAutoReplyData' was removed from object type 'EmailIntakeAddress' (EmailIntakeAddress.issueCanceledAutoReplyData)

feat(schema): [breaking] Field 'issueCompletedAutoReplyData' was removed from object type 'EmailIntakeAddress' (EmailIntakeAddress.issueCompletedAutoReplyData)

feat(schema): [breaking] Field 'issueCreatedAutoReplyData' was removed from object type 'EmailIntakeAddress' (EmailIntakeAddress.issueCreatedAutoReplyData)

feat(schema): [dangerous] Input field 'context' was added to input object type 'AgentSessionCreateInput' (AgentSessionCreateInput.context)

feat(schema): [dangerous] Input field 'challengeResponse' was added to input object type 'EmailUserAccountAuthChallengeInput' (EmailUserAccountAuthChallengeInput.challengeResponse)

feat(schema): [dangerous] Input field 'aiProviderConfiguration' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.aiProviderConfiguration)

feat(schema): [non_breaking] Field 'context' was added to object type 'AgentSession' (AgentSession.context)

feat(schema): [non_breaking] Field 'AgentSession.type' description changed from 'The type of the agent session.' to '[DEPRECATED] The type of the agent session.' (AgentSession.type)

feat(schema): [non_breaking] Field 'AgentSession.type' is deprecated (AgentSession.type)

feat(schema): [non_breaking] Field 'AgentSession.type' has deprecation reason 'This field is slated for removal.' (AgentSession.type)

feat(schema): [non_breaking] Input field 'AgentSessionExternalUrlInput.label' description changed from 'Optional label for the URL.' to 'Label for the URL.' (AgentSessionExternalUrlInput.label)

feat(schema): [non_breaking] Description 'The type of an agent session.' on type 'AgentSessionType' has changed to '[DEPRECATED] The type of an agent session.' (AgentSessionType)

feat(schema): [non_breaking] Field 'aiProviderConfiguration' was added to object type 'Organization' (Organization.aiProviderConfiguration)