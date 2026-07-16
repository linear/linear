---
"@linear/sdk": minor
---


feat(schema): [dangerous] Enum value 'ProjectMilestone' was added to enum 'AiConversationEntityCardWidgetArgsType' (AiConversationEntityCardWidgetArgsType.ProjectMilestone)

feat(schema): [dangerous] Enum value 'ProjectMilestone' was added to enum 'AiConversationEntityListWidgetArgsEntitiesType' (AiConversationEntityListWidgetArgsEntitiesType.ProjectMilestone)

feat(schema): [dangerous] Input field 'pullRequestIssueMode' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.pullRequestIssueMode)

feat(schema): [dangerous] Argument 'projectId: String' added to field 'Query.projectUpdate' (Query.projectUpdate.projectId)

feat(schema): [non_breaking] Type 'AgentAutomationRetryResolution' was added (AgentAutomationRetryResolution)

feat(schema): [non_breaking] Type 'AgentAutomationRetryResolutionStatus' was added (AgentAutomationRetryResolutionStatus)

feat(schema): [non_breaking] Type 'Diff' was added (Diff)

feat(schema): [non_breaking] Type 'DiffFile' was added (DiffFile)

feat(schema): [non_breaking] Type 'DiffFileState' was added (DiffFileState)

feat(schema): [non_breaking] Field 'AgentSession.workspaceDiffFiles' is deprecated (AgentSession.workspaceDiffFiles)

feat(schema): [non_breaking] Field 'AgentSession.workspaceDiffFiles' has deprecation reason 'Use Diff.files instead.' (AgentSession.workspaceDiffFiles)

feat(schema): [non_breaking] Field 'retryResolution' was added to object type 'AiConversationErrorPart' (AiConversationErrorPart.retryResolution)

feat(schema): [non_breaking] Field 'pullRequestIssueMode' was added to object type 'Organization' (Organization.pullRequestIssueMode)

feat(schema): [non_breaking] Field 'diff' was added to object type 'Query' (Query.diff)

feat(schema): [non_breaking] Input field 'ReleaseCompleteInput.commitSha' description changed from 'The commit SHA associated with this completion. If a completed release with this SHA already exists, it will be returned instead of completing a new release.' to 'The commit SHA to store when moving a release to completed. With a version, an existing SHA is preserved. Without a version, this SHA replaces the started release's SHA and is used to detect retries.' (ReleaseCompleteInput.commitSha)

feat(schema): [non_breaking] Input field 'ReleaseCompleteInputBase.commitSha' description changed from 'The commit SHA associated with this completion. If a completed release with this SHA already exists, it will be returned instead of completing a new release.' to 'The commit SHA to store when moving a release to completed. With a version, an existing SHA is preserved. Without a version, this SHA replaces the started release's SHA and is used to detect retries.' (ReleaseCompleteInputBase.commitSha)