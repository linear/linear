---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'name' was removed from input object type 'CustomerTierFilter' (CustomerTierFilter.name)

feat(schema): [breaking] Field 'releaseIds' was removed from object type 'Issue' (Issue.releaseIds)

feat(schema): [breaking] Field 'releaseIds' was removed from object type 'IssueSearchResult' (IssueSearchResult.releaseIds)

feat(schema): [dangerous] Input field 'displayName' was added to input object type 'CustomerTierFilter' (CustomerTierFilter.displayName)

feat(schema): [dangerous] Input field 'type' was added to input object type 'ReleasePipelineCreateInput' (ReleasePipelineCreateInput.type)

feat(schema): [dangerous] Input field 'type' was added to input object type 'ReleasePipelineUpdateInput' (ReleasePipelineUpdateInput.type)

feat(schema): [dangerous] Enum value 'release' was added to enum 'ViewType' (ViewType.release)

feat(schema): [non_breaking] Type 'IssueToRelease' was added (IssueToRelease)

feat(schema): [non_breaking] Type 'IssueToReleaseConnection' was added (IssueToReleaseConnection)

feat(schema): [non_breaking] Type 'IssueToReleaseCreateInput' was added (IssueToReleaseCreateInput)

feat(schema): [non_breaking] Type 'IssueToReleaseEdge' was added (IssueToReleaseEdge)

feat(schema): [non_breaking] Type 'IssueToReleasePayload' was added (IssueToReleasePayload)

feat(schema): [non_breaking] Type 'ReleasePipelineType' was added (ReleasePipelineType)

feat(schema): [non_breaking] Field 'allowNameChange' was added to object type 'IdentityProvider' (IdentityProvider.allowNameChange)

feat(schema): [non_breaking] Field 'addedToReleaseIds' was added to object type 'IssueHistory' (IssueHistory.addedToReleaseIds)

feat(schema): [non_breaking] Field 'addedToReleases' was added to object type 'IssueHistory' (IssueHistory.addedToReleases)

feat(schema): [non_breaking] Field 'removedFromReleaseIds' was added to object type 'IssueHistory' (IssueHistory.removedFromReleaseIds)

feat(schema): [non_breaking] Field 'removedFromReleases' was added to object type 'IssueHistory' (IssueHistory.removedFromReleases)

feat(schema): [non_breaking] Field 'issueToReleaseCreate' was added to object type 'Mutation' (Mutation.issueToReleaseCreate)

feat(schema): [non_breaking] Field 'issueToReleaseDelete' was added to object type 'Mutation' (Mutation.issueToReleaseDelete)

feat(schema): [non_breaking] Field 'issueToReleaseDeleteByIssueAndRelease' was added to object type 'Mutation' (Mutation.issueToReleaseDeleteByIssueAndRelease)

feat(schema): [non_breaking] Field 'projectExternalSyncDisable' was added to object type 'Mutation' (Mutation.projectExternalSyncDisable)

feat(schema): [non_breaking] Field 'trialStartsAt' was added to object type 'Organization' (Organization.trialStartsAt)

feat(schema): [non_breaking] Field 'issueToRelease' was added to object type 'Query' (Query.issueToRelease)

feat(schema): [non_breaking] Field 'issueToReleases' was added to object type 'Query' (Query.issueToReleases)

feat(schema): [non_breaking] Field 'slugId' was added to object type 'Release' (Release.slugId)

feat(schema): [non_breaking] Input field 'ReleaseCreateInput.stageId' description changed from 'The current stage of the release. Defaults to the first 'planned' stage.' to 'The current stage of the release. Defaults to the first 'completed' stage.' (ReleaseCreateInput.stageId)

feat(schema): [non_breaking] Field 'type' was added to object type 'ReleasePipeline' (ReleasePipeline.type)

feat(schema): [non_breaking] Field 'Team.inviteHash' description changed from 'Unique hash for the team to be used in invite URLs.' to '[DEPRECATED] Unique hash for the team to be used in invite URLs.' (Team.inviteHash)

feat(schema): [non_breaking] Field 'Team.inviteHash' is deprecated (Team.inviteHash)

feat(schema): [non_breaking] Field 'Team.inviteHash' has deprecation reason 'Not used anymore, simply returning an empty string.' (Team.inviteHash)