---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'Mutation.releaseCompleteByAccessKey' changed type from 'ReleasePayload!' to 'AccessKeyReleasePayload!' (Mutation.releaseCompleteByAccessKey)

feat(schema): [breaking] Field 'Mutation.releaseSyncByAccessKey' changed type from 'ReleasePayload!' to 'AccessKeyReleasePayload!' (Mutation.releaseSyncByAccessKey)

feat(schema): [breaking] Field 'Mutation.releaseUpdateByPipelineByAccessKey' changed type from 'ReleasePayload!' to 'AccessKeyReleasePayload!' (Mutation.releaseUpdateByPipelineByAccessKey)

feat(schema): [breaking] Field 'Query.latestReleaseByAccessKey' changed type from 'Release' to 'AccessKeyRelease' (Query.latestReleaseByAccessKey)

feat(schema): [breaking] Field 'Query.recentReleasesByAccessKey' changed type from '[Release!]!' to '[AccessKeyRelease!]!' (Query.recentReleasesByAccessKey)

feat(schema): [breaking] Field 'Query.releasePipelineByAccessKey' changed type from 'ReleasePipeline!' to 'AccessKeyReleasePipeline!' (Query.releasePipelineByAccessKey)

feat(schema): [dangerous] Enum value 'subAgent' was added to enum 'AiConversationInitialSource' (AiConversationInitialSource.subAgent)

feat(schema): [dangerous] Enum value 'SpawnSubagent' was added to enum 'AiConversationTool' (AiConversationTool.SpawnSubagent)

feat(schema): [dangerous] Member 'AiConversationSpawnSubagentToolCall' was added to Union type 'AiConversationToolCall' (AiConversationToolCall)

feat(schema): [dangerous] Input field 'projectLabels' was added to input object type 'InheritanceEntityMapping' (InheritanceEntityMapping.projectLabels)

feat(schema): [dangerous] Argument 'partnerOfferToken: String' added to field 'Mutation.createOrganizationFromOnboarding' (Mutation.createOrganizationFromOnboarding.partnerOfferToken)

feat(schema): [dangerous] Argument 'botUserRole: String' added to field 'Mutation.integrationZendesk' (Mutation.integrationZendesk.botUserRole)

feat(schema): [dangerous] Argument 'replaceTeamLabels: Boolean' added to field 'Mutation.projectLabelCreate' (Mutation.projectLabelCreate.replaceTeamLabels)

feat(schema): [dangerous] Argument 'replaceTeamLabels: Boolean' added to field 'Mutation.projectLabelUpdate' (Mutation.projectLabelUpdate.replaceTeamLabels)

feat(schema): [dangerous] Input field 'workspaceInitiativesRole' was added to input object type 'OrganizationSecuritySettingsInput' (OrganizationSecuritySettingsInput.workspaceInitiativesRole)

feat(schema): [dangerous] Input field 'defaultHomeViewTargetId' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.defaultHomeViewTargetId)

feat(schema): [dangerous] Input field 'leadTeamId' was added to input object type 'ProjectCreateInput' (ProjectCreateInput.leadTeamId)

feat(schema): [dangerous] Input field 'leadTeamId' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.leadTeamId)

feat(schema): [dangerous] Input field 'issuePattern' was added to input object type 'ReleaseDebugSinkInput' (ReleaseDebugSinkInput.issuePattern)

feat(schema): [non_breaking] Type 'AccessKeyRelease' was added (AccessKeyRelease)

feat(schema): [non_breaking] Type 'AccessKeyReleasePayload' was added (AccessKeyReleasePayload)

feat(schema): [non_breaking] Type 'AccessKeyReleasePipeline' was added (AccessKeyReleasePipeline)

feat(schema): [non_breaking] Type 'AccessKeyReleaseStage' was added (AccessKeyReleaseStage)

feat(schema): [non_breaking] Type 'AgentActivityPushCommit' was added (AgentActivityPushCommit)

feat(schema): [non_breaking] Type 'AgentActivityPushSummary' was added (AgentActivityPushSummary)

feat(schema): [non_breaking] Type 'AiConversationSpawnSubagentToolCall' was added (AiConversationSpawnSubagentToolCall)

feat(schema): [non_breaking] Type 'AiConversationSpawnSubagentToolCallArgs' was added (AiConversationSpawnSubagentToolCallArgs)

feat(schema): [non_breaking] Type 'AiConversationSpawnSubagentToolCallResult' was added (AiConversationSpawnSubagentToolCallResult)

feat(schema): [non_breaking] Type 'IssueSuggestionReasonReference' was added (IssueSuggestionReasonReference)

feat(schema): [non_breaking] Type 'PartnerDiscountType' was added (PartnerDiscountType)

feat(schema): [non_breaking] Type 'PartnerOfferIneligibilityReason' was added (PartnerOfferIneligibilityReason)

feat(schema): [non_breaking] Type 'PartnerOfferRedeemPayload' was added (PartnerOfferRedeemPayload)

feat(schema): [non_breaking] Type 'PartnerOfferWorkspacePayload' was added (PartnerOfferWorkspacePayload)

feat(schema): [non_breaking] Type 'PartnerOfferWorkspacesPayload' was added (PartnerOfferWorkspacesPayload)

feat(schema): [non_breaking] Type 'PresentedIssueSuggestionReason' was added (PresentedIssueSuggestionReason)

feat(schema): [non_breaking] Field 'pushSummary' was added to object type 'AgentActivity' (AgentActivity.pushSummary)

feat(schema): [non_breaking] Field 'issue' was added to object type 'AiConversation' (AiConversation.issue)

feat(schema): [non_breaking] Field 'dismissedElicitationId' was added to object type 'AiConversationUserState' (AiConversationUserState.dismissedElicitationId)

feat(schema): [non_breaking] Field 'presentedReasons' was added to object type 'IssueSuggestion' (IssueSuggestion.presentedReasons)

feat(schema): [non_breaking] Field 'partnerOfferRedeem' was added to object type 'Mutation' (Mutation.partnerOfferRedeem)

feat(schema): [non_breaking] Field 'defaultHomeViewTargetId' was added to object type 'Organization' (Organization.defaultHomeViewTargetId)

feat(schema): [non_breaking] Field 'discountType' was added to object type 'PartnerOfferDetailsPayload' (PartnerOfferDetailsPayload.discountType)

feat(schema): [non_breaking] Field 'discountValue' was added to object type 'PartnerOfferDetailsPayload' (PartnerOfferDetailsPayload.discountValue)

feat(schema): [non_breaking] Field 'durationMonths' was added to object type 'PartnerOfferDetailsPayload' (PartnerOfferDetailsPayload.durationMonths)

feat(schema): [non_breaking] Field 'PartnerOfferDetailsPayload.token' description changed from 'Short-lived signed token to carry the redemption through signup. Embeds a freshly minted redemption identifier, the offer identifier, and its mint and expiry times.' to 'Short-lived signed token that carries the redemption through signup or an existing-workspace redemption. Embeds a pre-minted redemption identifier, the offer identifier, and its mint and expiry times.' (PartnerOfferDetailsPayload.token)

feat(schema): [non_breaking] Field 'identifier' was added to object type 'Project' (Project.identifier)

feat(schema): [non_breaking] Field 'leadTeam' was added to object type 'Project' (Project.leadTeam)

feat(schema): [non_breaking] Field 'previousIdentifiers' was added to object type 'Project' (Project.previousIdentifiers)

feat(schema): [non_breaking] Field 'resourceCount' was added to object type 'Project' (Project.resourceCount)

feat(schema): [non_breaking] Field 'identifier' was added to object type 'ProjectSearchResult' (ProjectSearchResult.identifier)

feat(schema): [non_breaking] Field 'leadTeam' was added to object type 'ProjectSearchResult' (ProjectSearchResult.leadTeam)

feat(schema): [non_breaking] Field 'previousIdentifiers' was added to object type 'ProjectSearchResult' (ProjectSearchResult.previousIdentifiers)

feat(schema): [non_breaking] Field 'resourceCount' was added to object type 'ProjectSearchResult' (ProjectSearchResult.resourceCount)

feat(schema): [non_breaking] Field 'identifier' was added to object type 'ProjectWebhookPayload' (ProjectWebhookPayload.identifier)

feat(schema): [non_breaking] Field 'previousIdentifiers' was added to object type 'ProjectWebhookPayload' (ProjectWebhookPayload.previousIdentifiers)

feat(schema): [non_breaking] Field 'partnerOfferWorkspaces' was added to object type 'Query' (Query.partnerOfferWorkspaces)

feat(schema): [non_breaking] Field 'Query.recentReleasesByAccessKey' description changed from 'Returns recent in-progress and completed releases for the pipeline associated with the access key, ordered with in-progress first then most recently completed. Used by `linear-release` to walk candidates and pick the one whose `commitSha` is an ancestor of the current build commit, which disambiguates concurrent release trains on the same pipeline.' to 'Returns recent releases for the pipeline associated with the access key, ordered with in-progress releases first, followed by the most recently completed releases.' (Query.recentReleasesByAccessKey)

feat(schema): [non_breaking] Field 'Query.releasePipelineByAccessKey' description changed from 'Returns a release pipeline by ID. Requires the access key to have access to the pipeline.' to 'Returns the release pipeline associated with the access key.' (Query.releasePipelineByAccessKey)

feat(schema): [non_breaking] Input field 'UserSettingsUpdateInput.settings' description changed from 'The user's settings.' to 'The user's settings. Merged key by key into the existing settings: keys missing from the object are left unchanged, and a key set to null is removed.' (UserSettingsUpdateInput.settings)

feat(schema): [non_breaking] Field 'automationShowDisabled' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.automationShowDisabled)

feat(schema): [non_breaking] Field 'initiativeFieldId' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativeFieldId)

feat(schema): [non_breaking] Field 'projectFieldId' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldId)

feat(schema): [non_breaking] Field 'reviewFieldOpenedAt' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.reviewFieldOpenedAt)

feat(schema): [non_breaking] Field 'reviewFieldStatusDetails' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.reviewFieldStatusDetails)

feat(schema): [non_breaking] Field 'showParentInitiatives' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showParentInitiatives)