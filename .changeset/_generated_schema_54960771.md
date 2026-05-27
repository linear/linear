---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'isDiffHidden' was removed from input object type 'InitiativeUpdateUpdateInput' (InitiativeUpdateUpdateInput.isDiffHidden)

feat(schema): [breaking] Field 'Mutation.releasePipelineDelete' changed type from 'DeletePayload!' to 'ReleasePipelineArchivePayload!' (Mutation.releasePipelineDelete)

feat(schema): [breaking] Input field 'isDiffHidden' was removed from input object type 'ProjectUpdateUpdateInput' (ProjectUpdateUpdateInput.isDiffHidden)

feat(schema): [dangerous] Enum value 'Bash' was added to enum 'AiConversationTool' (AiConversationTool.Bash)

feat(schema): [dangerous] Enum value 'CreateSandbox' was added to enum 'AiConversationTool' (AiConversationTool.CreateSandbox)

feat(schema): [dangerous] Enum value 'ReadSandboxFile' was added to enum 'AiConversationTool' (AiConversationTool.ReadSandboxFile)

feat(schema): [dangerous] Enum value 'SuggestRepository' was added to enum 'AiConversationTool' (AiConversationTool.SuggestRepository)

feat(schema): [dangerous] Member 'AiConversationBashToolCall' was added to Union type 'AiConversationToolCall' (AiConversationToolCall)

feat(schema): [dangerous] Member 'AiConversationCreateSandboxToolCall' was added to Union type 'AiConversationToolCall' (AiConversationToolCall)

feat(schema): [dangerous] Member 'AiConversationReadSandboxFileToolCall' was added to Union type 'AiConversationToolCall' (AiConversationToolCall)

feat(schema): [dangerous] Member 'AiConversationSuggestRepositoryToolCall' was added to Union type 'AiConversationToolCall' (AiConversationToolCall)

feat(schema): [dangerous] Input field 'description' was added to input object type 'GitHubRepoInput' (GitHubRepoInput.description)

feat(schema): [dangerous] Argument 'mcpServerDefinitionId: String' added to field 'Mutation.integrationMcpServerConnect' (Mutation.integrationMcpServerConnect.mcpServerDefinitionId)

feat(schema): [dangerous] Argument 'mcpServerDefinitionId: String' added to field 'Mutation.integrationMcpServerPersonalConnect' (Mutation.integrationMcpServerPersonalConnect.mcpServerDefinitionId)

feat(schema): [dangerous] Input field 'issue' was added to input object type 'NullableDocumentContentFilter' (NullableDocumentContentFilter.issue)

feat(schema): [dangerous] Input field 'members' was added to input object type 'NullableTeamFilter' (NullableTeamFilter.members)

feat(schema): [dangerous] Input field 'mcpServersMode' was added to input object type 'OrganizationLinearAgentSettingsInput' (OrganizationLinearAgentSettingsInput.mcpServersMode)

feat(schema): [dangerous] Input field 'documents' was added to input object type 'ReleaseCompleteInput' (ReleaseCompleteInput.documents)

feat(schema): [dangerous] Input field 'releaseNotes' was added to input object type 'ReleaseCompleteInput' (ReleaseCompleteInput.releaseNotes)

feat(schema): [dangerous] Input field 'documents' was added to input object type 'ReleaseCompleteInputBase' (ReleaseCompleteInputBase.documents)

feat(schema): [dangerous] Input field 'releaseNotes' was added to input object type 'ReleaseCompleteInputBase' (ReleaseCompleteInputBase.releaseNotes)

feat(schema): [dangerous] Input field 'includeSubjects' was added to input object type 'ReleaseDebugSinkInput' (ReleaseDebugSinkInput.includeSubjects)

feat(schema): [dangerous] Input field 'documents' was added to input object type 'ReleaseSyncInput' (ReleaseSyncInput.documents)

feat(schema): [dangerous] Input field 'releaseNotes' was added to input object type 'ReleaseSyncInput' (ReleaseSyncInput.releaseNotes)

feat(schema): [dangerous] Input field 'documents' was added to input object type 'ReleaseSyncInputBase' (ReleaseSyncInputBase.documents)

feat(schema): [dangerous] Input field 'releaseNotes' was added to input object type 'ReleaseSyncInputBase' (ReleaseSyncInputBase.releaseNotes)

feat(schema): [dangerous] Input field 'documents' was added to input object type 'ReleaseUpdateByPipelineInput' (ReleaseUpdateByPipelineInput.documents)

feat(schema): [dangerous] Input field 'releaseNotes' was added to input object type 'ReleaseUpdateByPipelineInput' (ReleaseUpdateByPipelineInput.releaseNotes)

feat(schema): [dangerous] Input field 'documents' was added to input object type 'ReleaseUpdateByPipelineInputBase' (ReleaseUpdateByPipelineInputBase.documents)

feat(schema): [dangerous] Input field 'releaseNotes' was added to input object type 'ReleaseUpdateByPipelineInputBase' (ReleaseUpdateByPipelineInputBase.releaseNotes)

feat(schema): [dangerous] Input field 'members' was added to input object type 'TeamFilter' (TeamFilter.members)

feat(schema): [non_breaking] Type 'AiConversationBashToolCall' was added (AiConversationBashToolCall)

feat(schema): [non_breaking] Type 'AiConversationBashToolCallArgs' was added (AiConversationBashToolCallArgs)

feat(schema): [non_breaking] Type 'AiConversationCreateSandboxToolCall' was added (AiConversationCreateSandboxToolCall)

feat(schema): [non_breaking] Type 'AiConversationCreateSandboxToolCallArgs' was added (AiConversationCreateSandboxToolCallArgs)

feat(schema): [non_breaking] Type 'AiConversationReadSandboxFileToolCall' was added (AiConversationReadSandboxFileToolCall)

feat(schema): [non_breaking] Type 'AiConversationReadSandboxFileToolCallArgs' was added (AiConversationReadSandboxFileToolCallArgs)

feat(schema): [non_breaking] Type 'AiConversationSuggestRepositoryToolCall' was added (AiConversationSuggestRepositoryToolCall)

feat(schema): [non_breaking] Type 'LinearAgentMcpServersMode' was added (LinearAgentMcpServersMode)

feat(schema): [non_breaking] Type 'ReleaseDocumentInput' was added (ReleaseDocumentInput)

feat(schema): [non_breaking] Type 'ReleaseNoteInput' was added (ReleaseNoteInput)

feat(schema): [non_breaking] Field 'InitiativeUpdate.isDiffHidden' description changed from 'Whether the diff between this update and the previous one should be hidden in the UI.' to 'Whether the diff between this update and the previous one should be hidden in the UI. Only used for legacy updates. Not settable in the UI.' (InitiativeUpdate.isDiffHidden)

feat(schema): [non_breaking] Field 'Mutation.releasePipelineDelete' description changed from 'Permanently deletes a release pipeline and all associated stages and releases.' to 'Moves a release pipeline to the trash bin. Trashed pipelines are archived and will be permanently deleted after a retention period, along with all their releases. If the pipeline is already archived, it is marked as trashed with a fresh archive timestamp.' (Mutation.releasePipelineDelete)

feat(schema): [non_breaking] Field 'OAuthApplication.clientId' description changed from 'The public client ID used during OAuth authorization flows.' to 'The client ID used during OAuth authorization flows.' (OAuthApplication.clientId)

feat(schema): [non_breaking] Description 'Public API representation of an OAuth application managed by the calling OAuth application. Secrets are only returned by create and rotation mutations.' on type 'OAuthApplication' has changed to 'An OAuth application that can be managed by the calling OAuth application.' (OAuthApplication)

feat(schema): [non_breaking] Input field 'OAuthApplicationCreateInput.idempotencyKey' description changed from 'Optional client-supplied idempotency key. Reusing the same key with the same managing OAuth application returns the existing OAuth application instead of creating a duplicate.' to 'Optional client-supplied idempotency key. Reusing the same key with the same managing OAuth application returns the existing OAuth application instead of creating a duplicate. The key does not apply to archived applications.' (OAuthApplicationCreateInput.idempotencyKey)

feat(schema): [non_breaking] Input field 'OrganizationLinearAgentSettingsInput.mcpServersAllowlist' description changed from '[Internal] The MCP server allowlist for Linear Agent. When unset, all MCP servers are allowed.' to '[Internal] Legacy MCP server allowlist for Linear Agent.' (OrganizationLinearAgentSettingsInput.mcpServersAllowlist)

feat(schema): [non_breaking] Field 'parentShas' was added to object type 'PullRequestCommit' (PullRequestCommit.parentShas)

feat(schema): [non_breaking] Field 'trashed' was added to object type 'ReleasePipeline' (ReleasePipeline.trashed)

feat(schema): [non_breaking] Field 'hasGitHubCodeAccess' was added to object type 'User' (User.hasGitHubCodeAccess)

feat(schema): [non_breaking] Field 'timelineShowProjectsAside' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.timelineShowProjectsAside)