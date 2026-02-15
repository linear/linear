---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'AgentActivityCreatePromptInput.content' changed type from 'JSONObject!' to 'AgentActivityPromptCreateInputContent!' (AgentActivityCreatePromptInput.content)

feat(schema): [breaking] Field 'promptContext' was removed from object type 'AgentSession' (AgentSession.promptContext)

feat(schema): [breaking] Input field 'type' was removed from input object type 'ReleaseStageUpdateInput' (ReleaseStageUpdateInput.type)

feat(schema): [breaking] Input field 'issueIdentifiers' was removed from input object type 'ReleaseSyncInput' (ReleaseSyncInput.issueIdentifiers)

feat(schema): [dangerous] Enum value 'continuousPipelineReleases' was added to enum 'ViewType' (ViewType.continuousPipelineReleases)

feat(schema): [dangerous] Input field 'hostMappings' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.hostMappings)

feat(schema): [non_breaking] Type 'AgentActivityPromptCreateInputContent' was added (AgentActivityPromptCreateInputContent)

feat(schema): [non_breaking] Type 'AsksWebPage' was added (AsksWebPage)

feat(schema): [non_breaking] Type 'AsksWebPageCreateInput' was added (AsksWebPageCreateInput)

feat(schema): [non_breaking] Type 'AsksWebPagePayload' was added (AsksWebPagePayload)

feat(schema): [non_breaking] Type 'AsksWebPageUpdateInput' was added (AsksWebPageUpdateInput)

feat(schema): [non_breaking] Type 'PullRequestCheck' was added (PullRequestCheck)

feat(schema): [non_breaking] Field 'onBehalfOf' was added to object type 'Comment' (Comment.onBehalfOf)

feat(schema): [non_breaking] Field 'pullRequest' was added to object type 'DocumentContent' (DocumentContent.pullRequest)

feat(schema): [non_breaking] Field 'parentInitiatives' was added to object type 'Initiative' (Initiative.parentInitiatives)

feat(schema): [non_breaking] Field 'asksWebPageCreate' was added to object type 'Mutation' (Mutation.asksWebPageCreate)

feat(schema): [non_breaking] Field 'asksWebPageDelete' was added to object type 'Mutation' (Mutation.asksWebPageDelete)

feat(schema): [non_breaking] Field 'asksWebPageUpdate' was added to object type 'Mutation' (Mutation.asksWebPageUpdate)

feat(schema): [non_breaking] Field 'checks' was added to object type 'PullRequest' (PullRequest.checks)

feat(schema): [non_breaking] Field 'creator' was added to object type 'PullRequest' (PullRequest.creator)

feat(schema): [non_breaking] Field 'asksWebPage' was added to object type 'Query' (Query.asksWebPage)

feat(schema): [non_breaking] Input field 'ReleaseCreateInput.stageId' description changed from 'The current stage of the release. Defaults to the first 'started' stage.' to 'The current stage of the release. Defaults to the first 'completed' stage for continuous pipelines, or the first 'started' stage for scheduled pipelines.' (ReleaseCreateInput.stageId)