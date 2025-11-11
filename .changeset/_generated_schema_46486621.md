---
"@linear/sdk": minor
---


feat(schema): [dangerous] Input field 'inheritedFromId' was added to input object type 'CycleFilter' (CycleFilter.inheritedFromId)

feat(schema): [dangerous] Input field 'inheritedFromId' was added to input object type 'NullableCycleFilter' (NullableCycleFilter.inheritedFromId)

feat(schema): [dangerous] Input field 'content' was added to input object type 'NullableDocumentContentFilter' (NullableDocumentContentFilter.content)

feat(schema): [dangerous] Input field 'inheritedFromId' was added to input object type 'NullableTemplateFilter' (NullableTemplateFilter.inheritedFromId)

feat(schema): [non_breaking] Field 'AgentSession.creator' description changed from 'The user that created this agent session.' to 'The human user responsible for the agent session. Null if the session was initiated via automation or by an agent user, with no responsible human user.' (AgentSession.creator)

feat(schema): [non_breaking] Field 'AgentSessionWebhookPayload.creator' description changed from 'The user that created the agent session.' to 'The human user responsible for the agent session. Unset if the session was initiated via automation or by an agent user, with no responsible human user.' (AgentSessionWebhookPayload.creator)

feat(schema): [non_breaking] Field 'AgentSessionWebhookPayload.creatorId' description changed from 'The ID of the user that created the agent session.' to 'The ID of the human user responsible for the agent session. Unset if the session was initiated via automation or by an agent user, with no responsible human user.' (AgentSessionWebhookPayload.creatorId)

feat(schema): [non_breaking] Input field 'TeamUpdateInput.joinByDefault' description changed from 'Whether new users should join this team by default. Mutation restricted to workspace admins!' to 'Whether new users should join this team by default. Mutation restricted to workspace admins or owners!' (TeamUpdateInput.joinByDefault)

feat(schema): [non_breaking] Input field 'TeamUpdateInput.scimManaged' description changed from 'Whether the team is managed by SCIM integration. Mutation restricted to workspace admins and only unsetting is allowed!' to 'Whether the team is managed by SCIM integration. Mutation restricted to workspace admins or owners and only unsetting is allowed!' (TeamUpdateInput.scimManaged)