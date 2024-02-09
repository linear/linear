---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'AuthCreateOrJoinOrganizationResponse' was removed (AuthCreateOrJoinOrganizationResponse)

feat(schema): [breaking] Type 'SamlConfiguration' was removed (SamlConfiguration)

feat(schema): [breaking] Type 'SamlConfigurationInput' was removed (SamlConfigurationInput)

feat(schema): [breaking] Type 'SamlConfigurationPayload' was removed (SamlConfigurationPayload)

feat(schema): [breaking] Field 'ActorBot.id' changed type from 'ID!' to 'ID' (ActorBot.id)

feat(schema): [breaking] Input field 'label' was added to input object type 'AuthApiKeyCreateInput' (AuthApiKeyCreateInput.label)

feat(schema): [breaking] Field 'GitAutomationState.branchPattern' changed type from 'String!' to 'String' (GitAutomationState.branchPattern)

feat(schema): [breaking] Field 'OauthToken.id' changed type from 'ID!' to 'Float!' (OauthToken.id)

feat(schema): [breaking] Field 'ProjectUpdate.diff' changed type from 'JSON' to 'JSONObject' (ProjectUpdate.diff)

feat(schema): [breaking] Field 'ProjectMilestone' (deprecated) was removed from object type 'Query' (Query.ProjectMilestone)

feat(schema): [breaking] Field 'ProjectMilestones' (deprecated) was removed from object type 'Query' (Query.ProjectMilestones)

feat(schema): [breaking] Field 'automationStates' was removed from object type 'Team' (Team.automationStates)

feat(schema): [dangerous] Input field 'quotedText' was added to input object type 'CommentCreateInput' (CommentCreateInput.quotedText)

feat(schema): [dangerous] Input field 'quotedText' was added to input object type 'CommentUpdateInput' (CommentUpdateInput.quotedText)

feat(schema): [dangerous] Input field 'projectId' was added to input object type 'CustomViewCreateInput' (CustomViewCreateInput.projectId)

feat(schema): [dangerous] Input field 'projectId' was added to input object type 'CustomViewUpdateInput' (CustomViewUpdateInput.projectId)

feat(schema): [dangerous] Input field 'document' was added to input object type 'DocumentContentFilter' (DocumentContentFilter.document)

feat(schema): [dangerous] Input field 'project' was added to input object type 'DocumentContentFilter' (DocumentContentFilter.project)

feat(schema): [dangerous] Input field 'initiativeId' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.initiativeId)

feat(schema): [dangerous] Input field 'targetBranchId' was added to input object type 'GitAutomationStateCreateInput' (GitAutomationStateCreateInput.targetBranchId)

feat(schema): [dangerous] Input field 'targetBranchId' was added to input object type 'GitAutomationStateUpdateInput' (GitAutomationStateUpdateInput.targetBranchId)

feat(schema): [dangerous] Input field 'updateMetadata' was added to input object type 'JiraUpdateInput' (JiraUpdateInput.updateMetadata)

feat(schema): [dangerous] Argument 'title: String' added to field 'Mutation.attachmentLinkDiscord' (Mutation.attachmentLinkDiscord.title)

feat(schema): [dangerous] Argument 'title: String' added to field 'Mutation.attachmentLinkFront' (Mutation.attachmentLinkFront.title)

feat(schema): [dangerous] Argument 'title: String' added to field 'Mutation.attachmentLinkGitHubIssue' (Mutation.attachmentLinkGitHubIssue.title)

feat(schema): [dangerous] Argument 'title: String' added to field 'Mutation.attachmentLinkGitHubPR' (Mutation.attachmentLinkGitHubPR.title)

feat(schema): [dangerous] Argument 'title: String' added to field 'Mutation.attachmentLinkGitLabMR' (Mutation.attachmentLinkGitLabMR.title)

feat(schema): [dangerous] Argument 'title: String' added to field 'Mutation.attachmentLinkIntercom' (Mutation.attachmentLinkIntercom.title)

feat(schema): [dangerous] Argument 'title: String' added to field 'Mutation.attachmentLinkZendesk' (Mutation.attachmentLinkZendesk.title)

feat(schema): [dangerous] Input field 'document' was added to input object type 'NullableDocumentContentFilter' (NullableDocumentContentFilter.document)

feat(schema): [dangerous] Input field 'project' was added to input object type 'NullableDocumentContentFilter' (NullableDocumentContentFilter.project)

feat(schema): [dangerous] Argument 'filter: DocumentFilter' added to field 'Project.documents' (Project.documents.filter)

feat(schema): [dangerous] Argument 'filter: ProjectMilestoneFilter' added to field 'Project.projectMilestones' (Project.projectMilestones.filter)

feat(schema): [dangerous] Input field 'statusId' was added to input object type 'ProjectCreateInput' (ProjectCreateInput.statusId)

feat(schema): [dangerous] Argument 'filter: DocumentFilter' added to field 'ProjectSearchResult.documents' (ProjectSearchResult.documents.filter)

feat(schema): [dangerous] Argument 'filter: ProjectMilestoneFilter' added to field 'ProjectSearchResult.projectMilestones' (ProjectSearchResult.projectMilestones.filter)

feat(schema): [dangerous] Input field 'statusId' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.statusId)

feat(schema): [dangerous] Argument 'hash: String' added to field 'Query.comment' (Query.comment.hash)

feat(schema): [dangerous] Argument 'issueId: String' added to field 'Query.comment' (Query.comment.issueId)

feat(schema): [dangerous] Argument 'filter: DocumentFilter' added to field 'Query.documents' (Query.documents.filter)

feat(schema): [dangerous] Input field 'bidirectional' was added to input object type 'TeamRepoMappingInput' (TeamRepoMappingInput.bidirectional)

feat(schema): [dangerous] Input field 'default' was added to input object type 'TeamRepoMappingInput' (TeamRepoMappingInput.default)

feat(schema): [dangerous] Input field 'cycleEnabledStartDate' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.cycleEnabledStartDate)

feat(schema): [dangerous] Input field 'initiativeId' was added to input object type 'ViewPreferencesCreateInput' (ViewPreferencesCreateInput.initiativeId)

feat(schema): [dangerous] Enum value 'initiative' was added to enum 'ViewType' (ViewType.initiative)

feat(schema): [dangerous] Enum value 'initiatives' was added to enum 'ViewType' (ViewType.initiatives)

feat(schema): [non_breaking] Type 'AuthOrganizationInvite' was added (AuthOrganizationInvite)

feat(schema): [non_breaking] Type 'DataRecovery' was added (DataRecovery)

feat(schema): [non_breaking] Type 'DocumentCollectionFilter' was added (DocumentCollectionFilter)

feat(schema): [non_breaking] Type 'DocumentFilter' was added (DocumentFilter)

feat(schema): [non_breaking] Type 'EmailIntakeAddressCreateInput' was added (EmailIntakeAddressCreateInput)

feat(schema): [non_breaking] Type 'EmailIntakeAddressPayload' was added (EmailIntakeAddressPayload)

feat(schema): [non_breaking] Type 'EmailIntakeAddressUpdateInput' was added (EmailIntakeAddressUpdateInput)

feat(schema): [non_breaking] Type 'Facet' was added (Facet)

feat(schema): [non_breaking] Type 'FacetConnection' was added (FacetConnection)

feat(schema): [non_breaking] Type 'FacetEdge' was added (FacetEdge)

feat(schema): [non_breaking] Type 'GitAutomationTargetBranch' was added (GitAutomationTargetBranch)

feat(schema): [non_breaking] Type 'GitAutomationTargetBranchCreateInput' was added (GitAutomationTargetBranchCreateInput)

feat(schema): [non_breaking] Type 'GitAutomationTargetBranchPayload' was added (GitAutomationTargetBranchPayload)

feat(schema): [non_breaking] Type 'GitAutomationTargetBranchUpdateInput' was added (GitAutomationTargetBranchUpdateInput)

feat(schema): [non_breaking] Type 'Initiative' was added (Initiative)

feat(schema): [non_breaking] Type 'InitiativeArchivePayload' was added (InitiativeArchivePayload)

feat(schema): [non_breaking] Type 'InitiativeConnection' was added (InitiativeConnection)

feat(schema): [non_breaking] Type 'InitiativeCreateInput' was added (InitiativeCreateInput)

feat(schema): [non_breaking] Type 'InitiativeEdge' was added (InitiativeEdge)

feat(schema): [non_breaking] Type 'InitiativePayload' was added (InitiativePayload)

feat(schema): [non_breaking] Type 'InitiativeToProject' was added (InitiativeToProject)

feat(schema): [non_breaking] Type 'InitiativeToProjectConnection' was added (InitiativeToProjectConnection)

feat(schema): [non_breaking] Type 'InitiativeToProjectCreateInput' was added (InitiativeToProjectCreateInput)

feat(schema): [non_breaking] Type 'InitiativeToProjectEdge' was added (InitiativeToProjectEdge)

feat(schema): [non_breaking] Type 'InitiativeToProjectPayload' was added (InitiativeToProjectPayload)

feat(schema): [non_breaking] Type 'InitiativeToProjectUpdateInput' was added (InitiativeToProjectUpdateInput)

feat(schema): [non_breaking] Type 'InitiativeUpdateInput' was added (InitiativeUpdateInput)

feat(schema): [non_breaking] Type 'IntegrationHasScopesPayload' was added (IntegrationHasScopesPayload)

feat(schema): [non_breaking] Type 'NullableDocumentFilter' was added (NullableDocumentFilter)

feat(schema): [non_breaking] Type 'ProjectStatus' was added (ProjectStatus)

feat(schema): [non_breaking] Type 'ProjectStatusConnection' was added (ProjectStatusConnection)

feat(schema): [non_breaking] Type 'ProjectStatusEdge' was added (ProjectStatusEdge)

feat(schema): [non_breaking] Type 'ProjectStatusType' was added (ProjectStatusType)

feat(schema): [non_breaking] Type 'TimeSchedule' was added (TimeSchedule)

feat(schema): [non_breaking] Type 'TimeScheduleConnection' was added (TimeScheduleConnection)

feat(schema): [non_breaking] Type 'TimeScheduleEdge' was added (TimeScheduleEdge)

feat(schema): [non_breaking] Type 'TimeScheduleEntry' was added (TimeScheduleEntry)

feat(schema): [non_breaking] Field 'AttachmentSourcesPayload.sources' description changed from 'A unique list of all source types used in this workspace' to 'A unique list of all source types used in this workspace.' (AttachmentSourcesPayload.sources)

feat(schema): [non_breaking] Field 'releaseChannel' was added to object type 'AuthOrganization' (AuthOrganization.releaseChannel)

feat(schema): [non_breaking] Field 'serviceId' was added to object type 'AuthOrganization' (AuthOrganization.serviceId)

feat(schema): [non_breaking] Field 'authType' was added to object type 'AuthOrganizationDomain' (AuthOrganizationDomain.authType)

feat(schema): [non_breaking] Field 'claimed' was added to object type 'AuthOrganizationDomain' (AuthOrganizationDomain.claimed)

feat(schema): [non_breaking] Field 'name' was added to object type 'AuthOrganizationDomain' (AuthOrganizationDomain.name)

feat(schema): [non_breaking] Field 'organizationId' was added to object type 'AuthOrganizationDomain' (AuthOrganizationDomain.organizationId)

feat(schema): [non_breaking] Field 'verified' was added to object type 'AuthOrganizationDomain' (AuthOrganizationDomain.verified)

feat(schema): [non_breaking] Field 'AuthResolverResponse.availableOrganizations' description changed from 'Organizations this account has access to, but is not yet a member.' to 'List of organizations allowing this user account to join automatically.' (AuthResolverResponse.availableOrganizations)

feat(schema): [non_breaking] Field 'AuthResolverResponse.email' changed type from 'String' to 'String!' (AuthResolverResponse.email)

feat(schema): [non_breaking] Field 'AuthResolverResponse.lockedOrganizations' description changed from 'List of organizations this user account is part of but are currently locked because of the current auth service.' to 'List of organization available to this user account but locked due to the current auth method.' (AuthResolverResponse.lockedOrganizations)

feat(schema): [non_breaking] Field 'AuthResolverResponse.token' description changed from 'JWT token for authentication of the account.' to 'Application token.' (AuthResolverResponse.token)

feat(schema): [non_breaking] Field 'AuthResolverResponse.token' is deprecated (AuthResolverResponse.token)

feat(schema): [non_breaking] Field 'AuthResolverResponse.token' has deprecation reason 'Deprecated and not used anymore. Never populated.' (AuthResolverResponse.token)

feat(schema): [non_breaking] Field 'AuthResolverResponse.users' description changed from 'Users belonging to this account.' to 'List of active users that belong to the user account.' (AuthResolverResponse.users)

feat(schema): [non_breaking] Field 'userAccountId' was added to object type 'AuthUser' (AuthUser.userAccountId)

feat(schema): [non_breaking] Description 'Authentication session information' on type 'AuthenticationSessionResponse' has changed to 'Authentication session information.' (AuthenticationSessionResponse)

feat(schema): [non_breaking] Field 'quotedText' was added to object type 'Comment' (Comment.quotedText)

feat(schema): [non_breaking] Field 'Comment.botActor' description changed from 'The bot that created the comment' to 'The bot that created the comment.' (Comment.botActor)

feat(schema): [non_breaking] Field 'Comment.reactionData' description changed from 'Emoji reaction summary, grouped by emoji type' to 'Emoji reaction summary, grouped by emoji type.' (Comment.reactionData)

feat(schema): [non_breaking] Input field 'CommentCreateInput.projectUpdateId' description changed from 'The prject update to associate the comment with.' to 'The project update to associate the comment with.' (CommentCreateInput.projectUpdateId)

feat(schema): [non_breaking] Description '[INTERNAL] Input for sending a message to the Linear Sales team' on type 'ContactSalesCreateInput' has changed to '[INTERNAL] Input for sending a message to the Linear Sales team.' (ContactSalesCreateInput)

feat(schema): [non_breaking] Field 'issues' was added to object type 'CustomView' (CustomView.issues)

feat(schema): [non_breaking] Field 'CustomView.projectFilterData' description changed from '[ALPHA] The filter applied to projects in the custom view.' to 'The filter applied to projects in the custom view.' (CustomView.projectFilterData)

feat(schema): [non_breaking] Field 'CustomView.updatedBy' description changed from '[ALPHA] The user who last updated the custom view.' to 'The user who last updated the custom view.' (CustomView.updatedBy)

feat(schema): [non_breaking] Input field 'CustomViewCreateInput.projectFilterData' description changed from '[ALPHA] The project filter applied to issues in the custom view.' to 'The project filter applied to issues in the custom view.' (CustomViewCreateInput.projectFilterData)

feat(schema): [non_breaking] Field 'CustomViewNotificationSubscription.active' description changed from 'Whether the subscription is active or not' to 'Whether the subscription is active or not.' (CustomViewNotificationSubscription.active)

feat(schema): [non_breaking] Input field 'CustomViewUpdateInput.projectFilterData' description changed from '[ALPHA] The project filter applied to issues in the custom view.' to 'The project filter applied to issues in the custom view.' (CustomViewUpdateInput.projectFilterData)

feat(schema): [non_breaking] Field 'CycleNotificationSubscription.active' description changed from 'Whether the subscription is active or not' to 'Whether the subscription is active or not.' (CycleNotificationSubscription.active)

feat(schema): [non_breaking] Input field 'CycleShiftAllInput.daysToShift' description changed from 'The number of days to shift the cycles by.' to '[DEPRECATED] The number of days to shift the cycles by.' (CycleShiftAllInput.daysToShift)

feat(schema): [non_breaking] Input field 'CycleShiftAllInput.id' description changed from 'The cycle id at which to start the shift.' to '[DEPRECATED] The cycle id at which to start the shift.' (CycleShiftAllInput.id)

feat(schema): [non_breaking] Object type 'CycleShiftAllInput' has description '[DEPRECATED] Input for shifting all cycles by a certain number of days. Mutation is now deprecated.' (CycleShiftAllInput)

feat(schema): [non_breaking] Field 'contentState' was added to object type 'Document' (Document.contentState)

feat(schema): [non_breaking] Field 'Document.contentData' description changed from 'The documents content as a Prosemirror document.' to '[Internal] The documents content as a Prosemirror document.' (Document.contentData)

feat(schema): [non_breaking] Field 'DocumentContent.contentData' is deprecated (DocumentContent.contentData)

feat(schema): [non_breaking] Field 'DocumentContent.contentData' has deprecation reason 'Use `contentState` instead' (DocumentContent.contentData)

feat(schema): [non_breaking] Field 'DocumentContent.restoredAt' description changed from 'The time at which the document content was restored from a previous version' to 'The time at which the document content was restored from a previous version.' (DocumentContent.restoredAt)

feat(schema): [non_breaking] Field 'DocumentContentHistory.contentDataSnapshotAt' description changed from 'The timestamp associated with the DocumentContent when it was originally saved' to 'The timestamp associated with the DocumentContent when it was originally saved.' (DocumentContentHistory.contentDataSnapshotAt)

feat(schema): [non_breaking] Description 'A document content history for a document' on type 'DocumentContentHistory' has changed to 'A document content history for a document.' (DocumentContentHistory)

feat(schema): [non_breaking] Field 'contentState' was added to object type 'DocumentSearchResult' (DocumentSearchResult.contentState)

feat(schema): [non_breaking] Field 'DocumentSearchResult.contentData' description changed from 'The documents content as a Prosemirror document.' to '[Internal] The documents content as a Prosemirror document.' (DocumentSearchResult.contentData)

feat(schema): [non_breaking] Field 'DocumentSearchResult.metadata' description changed from 'Metadata related to search result' to 'Metadata related to search result.' (DocumentSearchResult.metadata)

feat(schema): [non_breaking] Field 'organization' was added to object type 'EmailIntakeAddress' (EmailIntakeAddress.organization)

feat(schema): [non_breaking] Field 'template' was added to object type 'EmailIntakeAddress' (EmailIntakeAddress.template)

feat(schema): [non_breaking] Description 'An email address that can be used for submitting issues' on type 'EmailIntakeAddress' has changed to 'An email address that can be used for submitting issues.' (EmailIntakeAddress)

feat(schema): [non_breaking] Description '[ALPHA] An external authenticated (e.g., through Slack) user which doesn't have a Linear account, but can create and update entities in Linear from the external system that authenticated them.' on type 'ExternalUser' has changed to 'An external authenticated (e.g., through Slack) user which doesn't have a Linear account, but can create and update entities in Linear from the external system that authenticated them.' (ExternalUser)

feat(schema): [non_breaking] Field 'targetBranch' was added to object type 'GitAutomationState' (GitAutomationState.targetBranch)

feat(schema): [non_breaking] Field 'GitAutomationState.branchPattern' description changed from 'The target branch, if null, the automation will be triggered on any branch.' to '[DEPRECATED] The target branch, if null, the automation will be triggered on any branch.' (GitAutomationState.branchPattern)

feat(schema): [non_breaking] Field 'GitAutomationState.branchPattern' is deprecated (GitAutomationState.branchPattern)

feat(schema): [non_breaking] Field 'GitAutomationState.branchPattern' has deprecation reason 'Use targetBranch instead.' (GitAutomationState.branchPattern)

feat(schema): [non_breaking] Input field 'GitAutomationStateCreateInput.branchPattern' description changed from 'The target branch pattern. If null, all branches are targeted.' to '[DEPRECATED] The target branch pattern. If null, all branches are targeted.' (GitAutomationStateCreateInput.branchPattern)

feat(schema): [non_breaking] Input field 'GitAutomationStateUpdateInput.branchPattern' description changed from 'The target branch pattern. If null, all branches are targeted.' to '[DEPRECATED] The target branch pattern. If null, all branches are targeted.' (GitAutomationStateUpdateInput.branchPattern)

feat(schema): [non_breaking] Field 'GitHubPersonalSettings.login' description changed from 'The GitHub user's name' to 'The GitHub user's name.' (GitHubPersonalSettings.login)

feat(schema): [non_breaking] Input field 'GitHubPersonalSettingsInput.login' description changed from 'The GitHub user's name' to 'The GitHub user's name.' (GitHubPersonalSettingsInput.login)

feat(schema): [non_breaking] Field 'GitHubSettings.orgAvatarUrl' description changed from 'The avatar URL for the GitHub organization' to 'The avatar URL for the GitHub organization.' (GitHubSettings.orgAvatarUrl)

feat(schema): [non_breaking] Field 'GitHubSettings.orgLogin' description changed from 'The GitHub organization's name' to 'The GitHub organization's name.' (GitHubSettings.orgLogin)

feat(schema): [non_breaking] Field 'GitHubSettings.repositories' description changed from 'The names of the repositories connected for the GitHub integration' to 'The names of the repositories connected for the GitHub integration.' (GitHubSettings.repositories)

feat(schema): [non_breaking] Field 'GitHubSettings.repositoriesMapping' description changed from 'Mapping of team to repository for syncing' to 'Mapping of team to repository for syncing.' (GitHubSettings.repositoriesMapping)

feat(schema): [non_breaking] Input field 'GitHubSettingsInput.orgAvatarUrl' description changed from 'The avatar URL for the GitHub organization' to 'The avatar URL for the GitHub organization.' (GitHubSettingsInput.orgAvatarUrl)

feat(schema): [non_breaking] Input field 'GitHubSettingsInput.orgLogin' description changed from 'The GitHub organization's name' to 'The GitHub organization's name.' (GitHubSettingsInput.orgLogin)

feat(schema): [non_breaking] Input field 'GitHubSettingsInput.repositories' description changed from 'The names of the repositories connected for the GitHub integration' to 'The names of the repositories connected for the GitHub integration.' (GitHubSettingsInput.repositories)

feat(schema): [non_breaking] Input field 'GitHubSettingsInput.repositoriesMapping' description changed from 'Mapping of team to repository for syncing' to 'Mapping of team to repository for syncing.' (GitHubSettingsInput.repositoriesMapping)

feat(schema): [non_breaking] Field 'GitLabSettings.expiresAt' description changed from 'The ISO timestamp the GitLab access token expires' to 'The ISO timestamp the GitLab access token expires.' (GitLabSettings.expiresAt)

feat(schema): [non_breaking] Field 'GitLabSettings.readonly' description changed from 'Whether the token is limited to a read-only scope' to 'Whether the token is limited to a read-only scope.' (GitLabSettings.readonly)

feat(schema): [non_breaking] Field 'GitLabSettings.url' description changed from 'The self-hosted URL of the GitLab instance' to 'The self-hosted URL of the GitLab instance.' (GitLabSettings.url)

feat(schema): [non_breaking] Input field 'GitLabSettingsInput.expiresAt' description changed from 'The ISO timestamp the GitLab access token expires' to 'The ISO timestamp the GitLab access token expires.' (GitLabSettingsInput.expiresAt)

feat(schema): [non_breaking] Input field 'GitLabSettingsInput.readonly' description changed from 'Whether the token is limited to a read-only scope' to 'Whether the token is limited to a read-only scope.' (GitLabSettingsInput.readonly)

feat(schema): [non_breaking] Input field 'GitLabSettingsInput.url' description changed from 'The self-hosted URL of the GitLab instance' to 'The self-hosted URL of the GitLab instance.' (GitLabSettingsInput.url)

feat(schema): [non_breaking] Input field 'GoogleUserAccountAuthInput.inviteLink' description changed from 'An optional invite link for an organization.' to 'An optional invite link for an organization used to populate available organizations.' (GoogleUserAccountAuthInput.inviteLink)

feat(schema): [non_breaking] Description 'The integration resource's settings' on type 'IntegrationSettings' has changed to 'The integration resource's settings.' (IntegrationSettings)

feat(schema): [non_breaking] Description 'Join table between templates and integrations' on type 'IntegrationTemplate' has changed to 'Join table between templates and integrations.' (IntegrationTemplate)

feat(schema): [non_breaking] Field 'IntegrationsSettings.slackIssueSlaBreached' description changed from 'Whether to send a Slack message when an SLA is breached' to 'Whether to send a Slack message when an SLA is breached.' (IntegrationsSettings.slackIssueSlaBreached)

feat(schema): [non_breaking] Field 'IntegrationsSettings.slackIssueSlaHighRisk' description changed from 'Whether to send a Slack message when an SLA is at high risk' to 'Whether to send a Slack message when an SLA is at high risk.' (IntegrationsSettings.slackIssueSlaHighRisk)

feat(schema): [non_breaking] Input field 'IntegrationsSettingsCreateInput.slackIssueSlaHighRisk' description changed from 'Whether to send a Slack message when an SLA is at high risk' to 'Whether to send a Slack message when an SLA is at high risk.' (IntegrationsSettingsCreateInput.slackIssueSlaHighRisk)

feat(schema): [non_breaking] Input field 'IntegrationsSettingsUpdateInput.slackIssueSlaHighRisk' description changed from 'Whether to send a Slack message when an SLA is at high risk' to 'Whether to send a Slack message when an SLA is at high risk.' (IntegrationsSettingsUpdateInput.slackIssueSlaHighRisk)

feat(schema): [non_breaking] Field 'descriptionState' was added to object type 'Issue' (Issue.descriptionState)

feat(schema): [non_breaking] Field 'Issue.externalUserCreator' description changed from '[ALPHA] The external user who created the issue.' to 'The external user who created the issue.' (Issue.externalUserCreator)

feat(schema): [non_breaking] Input field 'IssueCreateInput.preserveSortOrderOnCreate' description changed from 'Whether the passed sort order should be preserved' to 'Whether the passed sort order should be preserved.' (IssueCreateInput.preserveSortOrderOnCreate)

feat(schema): [non_breaking] Field 'IssueHistory.botActor' description changed from 'The bot that performed the action' to 'The bot that performed the action.' (IssueHistory.botActor)

feat(schema): [non_breaking] Field 'IssueHistory.fromDueDate' description changed from 'What the due date was changed from' to 'What the due date was changed from.' (IssueHistory.fromDueDate)

feat(schema): [non_breaking] Field 'IssueHistory.toDueDate' description changed from 'What the due date was changed to' to 'What the due date was changed to.' (IssueHistory.toDueDate)

feat(schema): [non_breaking] Field 'IssueImport.errorMetadata' description changed from 'Error code and metadata, if one has occurred during the import' to 'Error code and metadata, if one has occurred during the import.' (IssueImport.errorMetadata)

feat(schema): [non_breaking] Field 'IssueImport.teamName' description changed from 'New team's name in cases when teamId not set' to 'New team's name in cases when teamId not set.' (IssueImport.teamName)

feat(schema): [non_breaking] Description 'An import job for data from an external service' on type 'IssueImport' has changed to 'An import job for data from an external service.' (IssueImport)

feat(schema): [non_breaking] Input field 'IssueImportMappingInput.epics' description changed from 'The mapping configuration for epics' to 'The mapping configuration for epics.' (IssueImportMappingInput.epics)

feat(schema): [non_breaking] Input field 'IssueImportMappingInput.users' description changed from 'The mapping configuration for users' to 'The mapping configuration for users.' (IssueImportMappingInput.users)

feat(schema): [non_breaking] Input field 'IssueImportMappingInput.workflowStates' description changed from 'The mapping configuration for workflow states' to 'The mapping configuration for workflow states.' (IssueImportMappingInput.workflowStates)

feat(schema): [non_breaking] Description 'Issue import mapping input' on type 'IssueImportMappingInput' has changed to 'Issue import mapping input.' (IssueImportMappingInput)

feat(schema): [non_breaking] Field 'IssueNotification.team' description changed from 'The team related to the notification.' to 'The team related to the issue notification.' (IssueNotification.team)

feat(schema): [non_breaking] Field 'IssueNotification.type' description changed from 'Notification type' to 'Notification type.' (IssueNotification.type)

feat(schema): [non_breaking] Description 'An issue related notification' on type 'IssueNotification' has changed to 'An issue related notification.' (IssueNotification)

feat(schema): [non_breaking] Description 'Issue relation history's payload' on type 'IssueRelationHistoryPayload' has changed to 'Issue relation history's payload.' (IssueRelationHistoryPayload)

feat(schema): [non_breaking] Field 'descriptionState' was added to object type 'IssueSearchResult' (IssueSearchResult.descriptionState)

feat(schema): [non_breaking] Field 'IssueSearchResult.externalUserCreator' description changed from '[ALPHA] The external user who created the issue.' to 'The external user who created the issue.' (IssueSearchResult.externalUserCreator)

feat(schema): [non_breaking] Field 'IssueSearchResult.metadata' description changed from 'Metadata related to search result' to 'Metadata related to search result.' (IssueSearchResult.metadata)

feat(schema): [non_breaking] Input field 'JiraUpdateInput.id' description changed from 'The id of the integration to update' to 'The id of the integration to update.' (JiraUpdateInput.id)

feat(schema): [non_breaking] Input field 'JiraUpdateInput.updateProjects' description changed from 'Whether to refresh Jira Projects for the integration' to 'Whether to refresh Jira Projects for the integration.' (JiraUpdateInput.updateProjects)

feat(schema): [non_breaking] Field 'LabelNotificationSubscription.active' description changed from 'Whether the subscription is active or not' to 'Whether the subscription is active or not.' (LabelNotificationSubscription.active)

feat(schema): [non_breaking] Field 'emailIntakeAddressCreate' was added to object type 'Mutation' (Mutation.emailIntakeAddressCreate)

feat(schema): [non_breaking] Field 'emailIntakeAddressDelete' was added to object type 'Mutation' (Mutation.emailIntakeAddressDelete)

feat(schema): [non_breaking] Field 'emailIntakeAddressRotate' was added to object type 'Mutation' (Mutation.emailIntakeAddressRotate)

feat(schema): [non_breaking] Field 'emailIntakeAddressUpdate' was added to object type 'Mutation' (Mutation.emailIntakeAddressUpdate)

feat(schema): [non_breaking] Field 'gitAutomationTargetBranchCreate' was added to object type 'Mutation' (Mutation.gitAutomationTargetBranchCreate)

feat(schema): [non_breaking] Field 'gitAutomationTargetBranchDelete' was added to object type 'Mutation' (Mutation.gitAutomationTargetBranchDelete)

feat(schema): [non_breaking] Field 'gitAutomationTargetBranchUpdate' was added to object type 'Mutation' (Mutation.gitAutomationTargetBranchUpdate)

feat(schema): [non_breaking] Field 'initiativeArchive' was added to object type 'Mutation' (Mutation.initiativeArchive)

feat(schema): [non_breaking] Field 'initiativeCreate' was added to object type 'Mutation' (Mutation.initiativeCreate)

feat(schema): [non_breaking] Field 'initiativeDelete' was added to object type 'Mutation' (Mutation.initiativeDelete)

feat(schema): [non_breaking] Field 'initiativeToProjectCreate' was added to object type 'Mutation' (Mutation.initiativeToProjectCreate)

feat(schema): [non_breaking] Field 'initiativeToProjectDelete' was added to object type 'Mutation' (Mutation.initiativeToProjectDelete)

feat(schema): [non_breaking] Field 'initiativeToProjectUpdate' was added to object type 'Mutation' (Mutation.initiativeToProjectUpdate)

feat(schema): [non_breaking] Field 'initiativeUnarchive' was added to object type 'Mutation' (Mutation.initiativeUnarchive)

feat(schema): [non_breaking] Field 'initiativeUpdate' was added to object type 'Mutation' (Mutation.initiativeUpdate)

feat(schema): [non_breaking] Field 'integrationArchive' was added to object type 'Mutation' (Mutation.integrationArchive)

feat(schema): [non_breaking] Field 'Mutation.airbyteIntegrationConnect' description changed from 'Creates an integration api key for Airbyte to connect with Linear' to 'Creates an integration api key for Airbyte to connect with Linear.' (Mutation.airbyteIntegrationConnect)

feat(schema): [non_breaking] Description for argument 'id' on field 'Mutation.attachmentLinkDiscord' changed from 'Optional attachment ID that may be provided through the API' to 'Optional attachment ID that may be provided through the API.' (Mutation.attachmentLinkDiscord.id)

feat(schema): [non_breaking] Description for argument 'id' on field 'Mutation.attachmentLinkFront' changed from 'Optional attachment ID that may be provided through the API' to 'Optional attachment ID that may be provided through the API.' (Mutation.attachmentLinkFront.id)

feat(schema): [non_breaking] Description for argument 'id' on field 'Mutation.attachmentLinkGitHubIssue' changed from 'Optional attachment ID that may be provided through the API' to 'Optional attachment ID that may be provided through the API.' (Mutation.attachmentLinkGitHubIssue.id)

feat(schema): [non_breaking] Description for argument 'id' on field 'Mutation.attachmentLinkGitHubPR' changed from 'Optional attachment ID that may be provided through the API' to 'Optional attachment ID that may be provided through the API.' (Mutation.attachmentLinkGitHubPR.id)

feat(schema): [non_breaking] Description for argument 'id' on field 'Mutation.attachmentLinkGitLabMR' changed from 'Optional attachment ID that may be provided through the API' to 'Optional attachment ID that may be provided through the API.' (Mutation.attachmentLinkGitLabMR.id)

feat(schema): [non_breaking] Description for argument 'projectPathWithNamespace' on field 'Mutation.attachmentLinkGitLabMR' changed from 'The path name to the project including any (sub)groups. E.g. linear/main/client' to 'The path name to the project including any (sub)groups. E.g. linear/main/client.' (Mutation.attachmentLinkGitLabMR.projectPathWithNamespace)

feat(schema): [non_breaking] Description for argument 'id' on field 'Mutation.attachmentLinkIntercom' changed from 'Optional attachment ID that may be provided through the API' to 'Optional attachment ID that may be provided through the API.' (Mutation.attachmentLinkIntercom.id)

feat(schema): [non_breaking] Description for argument 'id' on field 'Mutation.attachmentLinkSlack' changed from 'Optional attachment ID that may be provided through the API' to 'Optional attachment ID that may be provided through the API.' (Mutation.attachmentLinkSlack.id)

feat(schema): [non_breaking] Description for argument 'title' on field 'Mutation.attachmentLinkSlack' changed from 'Optional title that may be provided through the API' to 'The title to use for the attachment.' (Mutation.attachmentLinkSlack.title)

feat(schema): [non_breaking] Description for argument 'id' on field 'Mutation.attachmentLinkZendesk' changed from 'Optional attachment ID that may be provided through the API' to 'Optional attachment ID that may be provided through the API.' (Mutation.attachmentLinkZendesk.id)

feat(schema): [non_breaking] Field 'Mutation.cycleShiftAll' description changed from 'Shifts all cycles starts by a certain number of weeks.' to '[DEPRECATED] Shifts all cycles starts by a certain number of weeks.' (Mutation.cycleShiftAll)

feat(schema): [non_breaking] Description for argument 'gitlabUrl' on field 'Mutation.integrationGitlabConnect' changed from 'The URL of the GitLab installation' to 'The URL of the GitLab installation.' (Mutation.integrationGitlabConnect.gitlabUrl)

feat(schema): [non_breaking] Field 'Mutation.integrationJiraUpdate' description changed from '[INTERNAL] Updates a Jira Integration' to '[INTERNAL] Updates a Jira Integration.' (Mutation.integrationJiraUpdate)

feat(schema): [non_breaking] Description for argument 'input' on field 'Mutation.integrationJiraUpdate' changed from 'Jira integration update input' to 'Jira integration update input.' (Mutation.integrationJiraUpdate.input)

feat(schema): [non_breaking] Field 'Mutation.integrationSlackAsks' description changed from 'Integrates the organization with the Slack Asks app' to 'Integrates the organization with the Slack Asks app.' (Mutation.integrationSlackAsks)

feat(schema): [non_breaking] Description for argument 'trash' on field 'Mutation.issueArchive' changed from 'Whether to trash the issue' to 'Whether to trash the issue.' (Mutation.issueArchive.trash)

feat(schema): [non_breaking] Description for argument 'trash' on field 'Mutation.projectArchive' changed from 'Whether to trash the project' to 'Whether to trash the project.' (Mutation.projectArchive.trash)

feat(schema): [non_breaking] Description for argument 'service' on field 'Mutation.userExternalUserDisconnect' changed from 'The external service to disconnect' to 'The external service to disconnect.' (Mutation.userExternalUserDisconnect.service)

feat(schema): [non_breaking] Description for argument 'operation' on field 'Mutation.userFlagUpdate' changed from 'Flag operation to perform' to 'Flag operation to perform.' (Mutation.userFlagUpdate.operation)

feat(schema): [non_breaking] Field 'Notification.type' description changed from 'Notification type' to 'Notification type.' (Notification.type)

feat(schema): [non_breaking] Field 'NotificationSubscription.active' description changed from 'Whether the subscription is active or not' to 'Whether the subscription is active or not.' (NotificationSubscription.active)

feat(schema): [non_breaking] Description 'The different requests statuses possible for an OAuth client approval request' on type 'OAuthClientApprovalStatus' has changed to 'The different requests statuses possible for an OAuth client approval request.' (OAuthClientApprovalStatus)

feat(schema): [non_breaking] Field 'OauthClient.webhookUrl' description changed from 'Webhook URL' to 'Webhook URL.' (OauthClient.webhookUrl)

feat(schema): [non_breaking] Field 'OauthClientApprovalNotification.type' description changed from 'Notification type' to 'Notification type.' (OauthClientApprovalNotification.type)

feat(schema): [non_breaking] Description 'An oauth client approval related notification' on type 'OauthClientApprovalNotification' has changed to 'An oauth client approval related notification.' (OauthClientApprovalNotification)

feat(schema): [non_breaking] Field 'client' was added to object type 'OauthToken' (OauthToken.client)

feat(schema): [non_breaking] Field 'clientId' was added to object type 'OauthToken' (OauthToken.clientId)

feat(schema): [non_breaking] Field 'revokedAt' was added to object type 'OauthToken' (OauthToken.revokedAt)

feat(schema): [non_breaking] Field 'user' was added to object type 'OauthToken' (OauthToken.user)

feat(schema): [non_breaking] Field 'userId' was added to object type 'OauthToken' (OauthToken.userId)

feat(schema): [non_breaking] Field 'Organization.allowMembersToInvite' description changed from 'Whether member users are allowed to send invites' to 'Whether member users are allowed to send invites.' (Organization.allowMembersToInvite)

feat(schema): [non_breaking] Field 'Organization.allowedAuthServices' description changed from 'Allowed authentication providers, empty array means all are allowed' to 'Allowed authentication providers, empty array means all are allowed.' (Organization.allowedAuthServices)

feat(schema): [non_breaking] Field 'Organization.samlSettings' description changed from '[INTERNAL] SAML settings' to '[INTERNAL] SAML settings.' (Organization.samlSettings)

feat(schema): [non_breaking] Field 'Organization.slaDayCount' description changed from 'Which day count to use for SLA calculations' to 'Which day count to use for SLA calculations.' (Organization.slaDayCount)

feat(schema): [non_breaking] Field 'OrganizationAcceptedOrExpiredInviteDetailsPayload.status' description changed from 'The status of the invite' to 'The status of the invite.' (OrganizationAcceptedOrExpiredInviteDetailsPayload.status)

feat(schema): [non_breaking] Field 'OrganizationDomain.authType' description changed from 'What type of auth is the domain used for' to 'What type of auth is the domain used for.' (OrganizationDomain.authType)

feat(schema): [non_breaking] Field 'OrganizationDomain.name' description changed from 'Domain name' to 'Domain name.' (OrganizationDomain.name)

feat(schema): [non_breaking] Field 'OrganizationDomain.verificationEmail' description changed from 'E-mail used to verify this domain' to 'E-mail used to verify this domain.' (OrganizationDomain.verificationEmail)

feat(schema): [non_breaking] Field 'OrganizationDomain.verified' description changed from 'Is this domain verified' to 'Is this domain verified.' (OrganizationDomain.verified)

feat(schema): [non_breaking] Field 'OrganizationInvite.acceptedAt' description changed from 'The time at which the invite was accepted. Null, if the invite hasn't been accepted' to 'The time at which the invite was accepted. Null, if the invite hasn't been accepted.' (OrganizationInvite.acceptedAt)

feat(schema): [non_breaking] Field 'OrganizationInvite.expiresAt' description changed from 'The time at which the invite will be expiring. Null, if the invite shouldn't expire' to 'The time at which the invite will be expiring. Null, if the invite shouldn't expire.' (OrganizationInvite.expiresAt)

feat(schema): [non_breaking] Input field 'OrganizationInviteCreateInput.metadata' description changed from '[INTERNAL] Optional metadata about the invite' to '[INTERNAL] Optional metadata about the invite.' (OrganizationInviteCreateInput.metadata)

feat(schema): [non_breaking] Field 'OrganizationInviteFullDetailsPayload.email' description changed from 'The email of the invitee' to 'The email of the invitee.' (OrganizationInviteFullDetailsPayload.email)

feat(schema): [non_breaking] Field 'OrganizationInviteFullDetailsPayload.inviter' description changed from 'The name of the inviter' to 'The name of the inviter.' (OrganizationInviteFullDetailsPayload.inviter)

feat(schema): [non_breaking] Field 'OrganizationInviteFullDetailsPayload.status' description changed from 'The status of the invite' to 'The status of the invite.' (OrganizationInviteFullDetailsPayload.status)

feat(schema): [non_breaking] Input field 'OrganizationUpdateInput.linearPreviewFlags' description changed from 'Linear Preview feature flags' to 'Linear Preview feature flags.' (OrganizationUpdateInput.linearPreviewFlags)

feat(schema): [non_breaking] Field 'contentState' was added to object type 'Project' (Project.contentState)

feat(schema): [non_breaking] Field 'descriptionState' was added to object type 'ProjectMilestone' (ProjectMilestone.descriptionState)

feat(schema): [non_breaking] Field 'ProjectMilestone.descriptionData' is deprecated (ProjectMilestone.descriptionData)

feat(schema): [non_breaking] Field 'ProjectMilestone.descriptionData' has deprecation reason 'Use `descriptionState` instead.' (ProjectMilestone.descriptionData)

feat(schema): [non_breaking] Field 'ProjectNotification.type' description changed from 'Notification type' to 'Notification type.' (ProjectNotification.type)

feat(schema): [non_breaking] Description 'A project related notification' on type 'ProjectNotification' has changed to 'A project related notification.' (ProjectNotification)

feat(schema): [non_breaking] Field 'ProjectNotificationSubscription.active' description changed from 'Whether the subscription is active or not' to 'Whether the subscription is active or not.' (ProjectNotificationSubscription.active)

feat(schema): [non_breaking] Field 'contentState' was added to object type 'ProjectSearchResult' (ProjectSearchResult.contentState)

feat(schema): [non_breaking] Field 'ProjectSearchResult.metadata' description changed from 'Metadata related to search result' to 'Metadata related to search result.' (ProjectSearchResult.metadata)

feat(schema): [non_breaking] Field 'bodyData' was added to object type 'ProjectUpdate' (ProjectUpdate.bodyData)

feat(schema): [non_breaking] Field 'ProjectUpdate.isDiffHidden' description changed from '[ALPHA] Whether project update diff should be hidden' to 'Whether project update diff should be hidden.' (ProjectUpdate.isDiffHidden)

feat(schema): [non_breaking] Input field 'ProjectUpdateCreateInput.isDiffHidden' description changed from '[ALPHA] Whether the diff between the current update and the previous one should be hidden.' to 'Whether the diff between the current update and the previous one should be hidden.' (ProjectUpdateCreateInput.isDiffHidden)

feat(schema): [non_breaking] Input field 'ProjectUpdateUpdateInput.isDiffHidden' description changed from '[ALPHA] Whether the diff between the current update and the previous one should be hidden.' to 'Whether the diff between the current update and the previous one should be hidden.' (ProjectUpdateUpdateInput.isDiffHidden)

feat(schema): [non_breaking] Input field 'PushSubscriptionCreateInput.type' description changed from 'Whether this is a subscription payload for Google Cloud Messaging or Apple Push Notification service' to 'Whether this is a subscription payload for Google Cloud Messaging or Apple Push Notification service.' (PushSubscriptionCreateInput.type)

feat(schema): [non_breaking] Description 'The different push subscription types' on type 'PushSubscriptionType' has changed to 'The different push subscription types.' (PushSubscriptionType)

feat(schema): [non_breaking] Field 'initiative' was added to object type 'Query' (Query.initiative)

feat(schema): [non_breaking] Field 'initiativeToProject' was added to object type 'Query' (Query.initiativeToProject)

feat(schema): [non_breaking] Field 'initiativeToProjects' was added to object type 'Query' (Query.initiativeToProjects)

feat(schema): [non_breaking] Field 'initiatives' was added to object type 'Query' (Query.initiatives)

feat(schema): [non_breaking] Field 'integrationHasScopes' was added to object type 'Query' (Query.integrationHasScopes)

feat(schema): [non_breaking] Field 'Query.applicationInfoByIds' description changed from '[INTERNAL] Get basic information for a list of applications' to '[INTERNAL] Get basic information for a list of applications.' (Query.applicationInfoByIds)

feat(schema): [non_breaking] Description for argument 'scope' on field 'Query.applicationWithAuthorization' changed from 'Scopes being requested by the application' to 'Scopes being requested by the application.' (Query.applicationWithAuthorization.scope)

feat(schema): [non_breaking] Field 'Query.attachmentSources' description changed from '[Internal] Get a list of all unique attachment sources in the workspace' to '[Internal] Get a list of all unique attachment sources in the workspace.' (Query.attachmentSources)

feat(schema): [non_breaking] Description for argument 'teamId' on field 'Query.attachmentSources' changed from '(optional) if provided will only return attachment sources for the given team' to '(optional) if provided will only return attachment sources for the given team.' (Query.attachmentSources.teamId)

feat(schema): [non_breaking] Field 'Query.authorizedApplications' description changed from '[INTERNAL] Get all authorized applications for a user' to '[INTERNAL] Get all authorized applications for a user.' (Query.authorizedApplications)

feat(schema): [non_breaking] Type for argument 'id' on field 'Query.comment' changed from 'String!' to 'String' (Query.comment.id)

feat(schema): [non_breaking] Description for argument 'id' on field 'Query.emoji' changed from 'The identifier of the emoji to retrieve.' to 'The identifier or the name of the emoji to retrieve.' (Query.emoji.id)

feat(schema): [non_breaking] Description for argument 'csvUrl' on field 'Query.issueImportCheckCSV' changed from 'CSV storage url' to 'CSV storage url.' (Query.issueImportCheckCSV.csvUrl)

feat(schema): [non_breaking] Description for argument 'service' on field 'Query.issueImportCheckCSV' changed from 'The service the CSV containing data from' to 'The service the CSV containing data from.' (Query.issueImportCheckCSV.service)

feat(schema): [non_breaking] Description for argument 'includeComments' on field 'Query.searchDocuments' changed from 'Should associated comments be searched (default: true)' to 'Should associated comments be searched (default: true).' (Query.searchDocuments.includeComments)

feat(schema): [non_breaking] Description for argument 'teamId' on field 'Query.searchDocuments' changed from 'UUID of a team to use as a boost' to 'UUID of a team to use as a boost.' (Query.searchDocuments.teamId)

feat(schema): [non_breaking] Description for argument 'includeComments' on field 'Query.searchIssues' changed from 'Should associated comments be searched (default: true)' to 'Should associated comments be searched (default: true).' (Query.searchIssues.includeComments)

feat(schema): [non_breaking] Description for argument 'teamId' on field 'Query.searchIssues' changed from 'UUID of a team to use as a boost' to 'UUID of a team to use as a boost.' (Query.searchIssues.teamId)

feat(schema): [non_breaking] Description for argument 'includeComments' on field 'Query.searchProjects' changed from 'Should associated comments be searched (default: true)' to 'Should associated comments be searched (default: true).' (Query.searchProjects.includeComments)

feat(schema): [non_breaking] Description for argument 'teamId' on field 'Query.searchProjects' changed from 'UUID of a team to use as a boost' to 'UUID of a team to use as a boost.' (Query.searchProjects.teamId)

feat(schema): [non_breaking] Description for argument 'integrationType' on field 'Query.templatesForIntegration' changed from 'The type of integration for which to return associated templates' to 'The type of integration for which to return associated templates.' (Query.templatesForIntegration.integrationType)

feat(schema): [non_breaking] Field 'Query.workspaceAuthorizedApplications' description changed from '[INTERNAL] Get all authorized applications (with limited fields) for a workspace' to '[INTERNAL] Get all authorized applications (with limited fields) for a workspace.' (Query.workspaceAuthorizedApplications)

feat(schema): [non_breaking] Input field 'ReactionCreateInput.id' description changed from 'The identifier in UUID v4 format. If none is provided, the backend will generate one' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (ReactionCreateInput.id)

feat(schema): [non_breaking] Description 'Features release channel' on type 'ReleaseChannel' has changed to 'Features release channel.' (ReleaseChannel)

feat(schema): [non_breaking] Input field 'RoadmapCreateInput.ownerId' description changed from 'The owner of the roadmap' to 'The owner of the roadmap.' (RoadmapCreateInput.ownerId)

feat(schema): [non_breaking] Description 'Join table between projects and roadmaps' on type 'RoadmapToProject' has changed to 'Join table between projects and roadmaps.' (RoadmapToProject)

feat(schema): [non_breaking] Input field 'RoadmapUpdateInput.ownerId' description changed from 'The owner of the roadmap' to 'The owner of the roadmap.' (RoadmapUpdateInput.ownerId)

feat(schema): [non_breaking] Description 'Which day count to use for SLA calculations' on type 'SLADayCountType' has changed to 'Which day count to use for SLA calculations.' (SLADayCountType)

feat(schema): [non_breaking] Field 'SlackAsksTeamSettings.hasDefaultAsk' description changed from 'Whether the default Asks template is enabled in the given channel for this team' to 'Whether the default Asks template is enabled in the given channel for this team.' (SlackAsksTeamSettings.hasDefaultAsk)

feat(schema): [non_breaking] Description 'Tuple for mapping Slack channel IDs to names' on type 'SlackAsksTeamSettings' has changed to 'Tuple for mapping Slack channel IDs to names.' (SlackAsksTeamSettings)

feat(schema): [non_breaking] Input field 'SlackAsksTeamSettingsInput.hasDefaultAsk' description changed from 'Whether the default Asks template is enabled in the given channel for this team' to 'Whether the default Asks template is enabled in the given channel for this team.' (SlackAsksTeamSettingsInput.hasDefaultAsk)

feat(schema): [non_breaking] Field 'SlackChannelNameMapping.autoCreateOnBotMention' description changed from 'Whether or not @-mentioning the bot should automatically create an Ask with the message' to 'Whether or not @-mentioning the bot should automatically create an Ask with the message.' (SlackChannelNameMapping.autoCreateOnBotMention)

feat(schema): [non_breaking] Field 'SlackChannelNameMapping.autoCreateOnEmoji' description changed from 'Whether or not using the :ticket: emoji in this channel should automatically create Asks' to 'Whether or not using the :ticket: emoji in this channel should automatically create Asks.' (SlackChannelNameMapping.autoCreateOnEmoji)

feat(schema): [non_breaking] Field 'SlackChannelNameMapping.autoCreateOnMessage' description changed from 'Whether or not top-level messages in this channel should automatically create Asks' to 'Whether or not top-level messages in this channel should automatically create Asks.' (SlackChannelNameMapping.autoCreateOnMessage)

feat(schema): [non_breaking] Field 'SlackChannelNameMapping.botAdded' description changed from 'Whether or not we the Linear Asks bot has been added to this Slack channel' to 'Whether or not we the Linear Asks bot has been added to this Slack channel.' (SlackChannelNameMapping.botAdded)

feat(schema): [non_breaking] Field 'SlackChannelNameMapping.isPrivate' description changed from 'Whether or not the Slack channel is private' to 'Whether or not the Slack channel is private.' (SlackChannelNameMapping.isPrivate)

feat(schema): [non_breaking] Field 'SlackChannelNameMapping.isShared' description changed from 'Whether or not the Slack channel is shared with an external org' to 'Whether or not the Slack channel is shared with an external org.' (SlackChannelNameMapping.isShared)

feat(schema): [non_breaking] Field 'SlackChannelNameMapping.teams' description changed from 'Which teams are connected to the channel and settings for those teams' to 'Which teams are connected to the channel and settings for those teams.' (SlackChannelNameMapping.teams)

feat(schema): [non_breaking] Description 'Object for mapping Slack channel IDs to names and other settings' on type 'SlackChannelNameMapping' has changed to 'Object for mapping Slack channel IDs to names and other settings.' (SlackChannelNameMapping)

feat(schema): [non_breaking] Input field 'SlackChannelNameMappingInput.autoCreateOnBotMention' description changed from 'Whether or not @-mentioning the bot should automatically create an Ask with the message' to 'Whether or not @-mentioning the bot should automatically create an Ask with the message.' (SlackChannelNameMappingInput.autoCreateOnBotMention)

feat(schema): [non_breaking] Input field 'SlackChannelNameMappingInput.autoCreateOnEmoji' description changed from 'Whether or not using the :ticket: emoji in this channel should automatically create Asks' to 'Whether or not using the :ticket: emoji in this channel should automatically create Asks.' (SlackChannelNameMappingInput.autoCreateOnEmoji)

feat(schema): [non_breaking] Input field 'SlackChannelNameMappingInput.autoCreateOnMessage' description changed from 'Whether or not top-level messages in this channel should automatically create Asks' to 'Whether or not top-level messages in this channel should automatically create Asks.' (SlackChannelNameMappingInput.autoCreateOnMessage)

feat(schema): [non_breaking] Input field 'SlackChannelNameMappingInput.botAdded' description changed from 'Whether or not we the Linear Asks bot has been added to this Slack channel' to 'Whether or not we the Linear Asks bot has been added to this Slack channel.' (SlackChannelNameMappingInput.botAdded)

feat(schema): [non_breaking] Input field 'SlackChannelNameMappingInput.isPrivate' description changed from 'Whether or not the Slack channel is private' to 'Whether or not the Slack channel is private.' (SlackChannelNameMappingInput.isPrivate)

feat(schema): [non_breaking] Input field 'SlackChannelNameMappingInput.isShared' description changed from 'Whether or not the Slack channel is shared with an external org' to 'Whether or not the Slack channel is shared with an external org.' (SlackChannelNameMappingInput.isShared)

feat(schema): [non_breaking] Input field 'SlackChannelNameMappingInput.teams' description changed from 'Which teams are connected to the channel and settings for those teams' to 'Which teams are connected to the channel and settings for those teams.' (SlackChannelNameMappingInput.teams)

feat(schema): [non_breaking] Field 'gitAutomationStates' was added to object type 'Team' (Team.gitAutomationStates)

feat(schema): [non_breaking] Field 'Team.requirePriorityToLeaveTriage' description changed from 'Whether an issue needs to have a priority set before leaving triage' to 'Whether an issue needs to have a priority set before leaving triage.' (Team.requirePriorityToLeaveTriage)

feat(schema): [non_breaking] Field 'TeamMembership.owner' description changed from 'Whether the user is the owner of the team' to 'Whether the user is the owner of the team.' (TeamMembership.owner)

feat(schema): [non_breaking] Field 'TeamNotificationSubscription.active' description changed from 'Whether the subscription is active or not' to 'Whether the subscription is active or not.' (TeamNotificationSubscription.active)

feat(schema): [non_breaking] Field 'bidirectional' was added to object type 'TeamRepoMapping' (TeamRepoMapping.bidirectional)

feat(schema): [non_breaking] Field 'default' was added to object type 'TeamRepoMapping' (TeamRepoMapping.default)

feat(schema): [non_breaking] Description 'Tuple for mapping Linear teams to GitHub repos.' on type 'TeamRepoMapping' has changed to 'Mapping of Linear teams to GitHub repos.' (TeamRepoMapping)

feat(schema): [non_breaking] Input field 'TeamUpdateInput.cycleEnabledStartWeek' description changed from 'Whether the first cycle should start in the current or the next week.' to '[DEPRECATED] Whether the first cycle should start in the current or the next week.' (TeamUpdateInput.cycleEnabledStartWeek)

feat(schema): [non_breaking] Field 'timeSchedule' was added to object type 'TriageResponsibility' (TriageResponsibility.timeSchedule)

feat(schema): [non_breaking] Field 'UploadFile.assetUrl' description changed from 'The asset URL for the uploaded file. (assigned automatically)' to 'The asset URL for the uploaded file. (assigned automatically).' (UploadFile.assetUrl)

feat(schema): [non_breaking] Field 'UploadFile.uploadUrl' description changed from 'The signed URL the for the uploaded file. (assigned automatically)' to 'The signed URL the for the uploaded file. (assigned automatically).' (UploadFile.uploadUrl)

feat(schema): [non_breaking] Field 'authTokenLinkDisabled' was added to object type 'UserAccount' (UserAccount.authTokenLinkDisabled)

feat(schema): [non_breaking] Field 'UserAuthorizedApplication.approvalErrorCode' description changed from 'Error associated with the application needing to be requested for approval in the workspace' to 'Error associated with the application needing to be requested for approval in the workspace.' (UserAuthorizedApplication.approvalErrorCode)

feat(schema): [non_breaking] Description 'Operations that can be applied to UserFlagType' on type 'UserFlagUpdateOperation' has changed to 'Operations that can be applied to UserFlagType.' (UserFlagUpdateOperation)

feat(schema): [non_breaking] Field 'UserNotificationSubscription.active' description changed from 'Whether the subscription is active or not' to 'Whether the subscription is active or not.' (UserNotificationSubscription.active)

feat(schema): [non_breaking] Description 'The different permission roles available to users on an organization' on type 'UserRoleType' has changed to 'The different permission roles available to users on an organization.' (UserRoleType)

feat(schema): [non_breaking] Field 'Webhook.label' description changed from 'Webhook label' to 'Webhook label.' (Webhook.label)

feat(schema): [non_breaking] Field 'Webhook.url' description changed from 'Webhook URL' to 'Webhook URL.' (Webhook.url)

feat(schema): [non_breaking] Description 'A webhook used to send HTTP notifications over data updates' on type 'Webhook' has changed to 'A webhook used to send HTTP notifications over data updates.' (Webhook)

feat(schema): [non_breaking] Field 'WorkspaceAuthorizedApplication.memberships' description changed from 'UserIds and membership dates of everyone who has authorized the application with the set of scopes' to 'UserIds and membership dates of everyone who has authorized the application with the set of scopes.' (WorkspaceAuthorizedApplication.memberships)

feat(schema): [non_breaking] Field 'WorkspaceAuthorizedApplication.totalMembers' description changed from 'Total number of members that authorized the application' to 'Total number of members that authorized the application.' (WorkspaceAuthorizedApplication.totalMembers)