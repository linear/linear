---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'Embed' was removed (Embed)

feat(schema): [breaking] Type 'EmbedPayload' was removed (EmbedPayload)

feat(schema): [breaking] Type 'FigmaEmbed' was removed (FigmaEmbed)

feat(schema): [breaking] Type 'FigmaEmbedPayload' was removed (FigmaEmbedPayload)

feat(schema): [breaking] Type 'FirstResponderSchedule' was removed (FirstResponderSchedule)

feat(schema): [breaking] Type 'FirstResponderScheduleConnection' was removed (FirstResponderScheduleConnection)

feat(schema): [breaking] Type 'FirstResponderScheduleEdge' was removed (FirstResponderScheduleEdge)

feat(schema): [breaking] Type 'PagerDutyScheduleMapping' was removed (PagerDutyScheduleMapping)

feat(schema): [breaking] Type 'PagerDutyScheduleMappingInput' was removed (PagerDutyScheduleMappingInput)

feat(schema): [breaking] Type 'UpdateOrganizationInput' was removed (UpdateOrganizationInput)

feat(schema): [breaking] Type 'UpdateUserInput' was removed (UpdateUserInput)

feat(schema): [breaking] Type 'UserAccountExistsPayload' was removed (UserAccountExistsPayload)

feat(schema): [breaking] Field 'AuthResolverResponse.availableOrganizations' changed type from '[Organization!]' to '[AuthOrganization!]' (AuthResolverResponse.availableOrganizations)

feat(schema): [breaking] Field 'AuthResolverResponse.users' changed type from '[User!]!' to '[AuthUser!]!' (AuthResolverResponse.users)

feat(schema): [breaking] Field 'CreateOrJoinOrganizationResponse.organization' changed type from 'Organization!' to 'AuthOrganization!' (CreateOrJoinOrganizationResponse.organization)

feat(schema): [breaking] Field 'CreateOrJoinOrganizationResponse.user' changed type from 'User!' to 'AuthUser!' (CreateOrJoinOrganizationResponse.user)

feat(schema): [breaking] Field 'Document.contentData' changed type from 'JSONObject' to 'JSON' (Document.contentData)

feat(schema): [breaking] Field 'DocumentContent.contentState' changed type from 'JSONObject' to 'String' (DocumentContent.contentState)

feat(schema): [breaking] Field 'DocumentSearchResult.contentData' changed type from 'JSONObject' to 'JSON' (DocumentSearchResult.contentData)

feat(schema): [breaking] Field 'userGoogleCalendarConnect' was removed from object type 'Mutation' (Mutation.userGoogleCalendarConnect)

feat(schema): [breaking] Type for argument 'input' on field 'Mutation.organizationUpdate' changed from 'UpdateOrganizationInput!' to 'OrganizationUpdateInput!' (Mutation.organizationUpdate.input)

feat(schema): [breaking] Type for argument 'input' on field 'Mutation.userUpdate' changed from 'UpdateUserInput!' to 'UserUpdateInput!' (Mutation.userUpdate.input)

feat(schema): [breaking] Field 'Organization.samlSettings' changed type from 'JSONObject!' to 'JSONObject' (Organization.samlSettings)

feat(schema): [breaking] Input field 'PagerDutyInput.scheduleMapping' changed type from '[PagerDutyScheduleMappingInput!]!' to '[PagerDutyScheduleInfoInput!]!' (PagerDutyInput.scheduleMapping)

feat(schema): [breaking] Field 'PagerDutySettings.scheduleMapping' changed type from '[PagerDutyScheduleMapping!]!' to '[PagerDutyScheduleInfo!]!' (PagerDutySettings.scheduleMapping)

feat(schema): [breaking] Field 'contentData' was removed from object type 'Project' (Project.contentData)

feat(schema): [breaking] Input field 'projectId' was removed from input object type 'ProjectMilestoneUpdateInput' (ProjectMilestoneUpdateInput.projectId)

feat(schema): [breaking] Field 'contentData' was removed from object type 'ProjectSearchResult' (ProjectSearchResult.contentData)

feat(schema): [breaking] Field 'embedInfo' was removed from object type 'Query' (Query.embedInfo)

feat(schema): [breaking] Field 'figmaEmbedInfo' was removed from object type 'Query' (Query.figmaEmbedInfo)

feat(schema): [breaking] Field 'userAccountExists' was removed from object type 'Query' (Query.userAccountExists)

feat(schema): [breaking] Input field 'teams' was added to input object type 'SlackChannelNameMappingInput' (SlackChannelNameMappingInput.teams)

feat(schema): [breaking] Field 'users' was removed from object type 'UserAccount' (UserAccount.users)

feat(schema): [dangerous] Input field 'documentContentId' was added to input object type 'CommentCreateInput' (CommentCreateInput.documentContentId)

feat(schema): [dangerous] Input field 'projectUpdateId' was added to input object type 'CommentCreateInput' (CommentCreateInput.projectUpdateId)

feat(schema): [dangerous] Input field 'lastAppliedTemplateId' was added to input object type 'DocumentCreateInput' (DocumentCreateInput.lastAppliedTemplateId)

feat(schema): [dangerous] Input field 'lastAppliedTemplateId' was added to input object type 'DocumentUpdateInput' (DocumentUpdateInput.lastAppliedTemplateId)

feat(schema): [dangerous] Input field 'inviteLink' was added to input object type 'EmailUserAccountAuthChallengeInput' (EmailUserAccountAuthChallengeInput.inviteLink)

feat(schema): [dangerous] Input field 'gitHubSync' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.gitHubSync)

feat(schema): [dangerous] Input field 'gitLab' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.gitLab)

feat(schema): [dangerous] Input field 'lastAppliedTemplate' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.lastAppliedTemplate)

feat(schema): [dangerous] Input field 'sourceMetadata' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.sourceMetadata)

feat(schema): [dangerous] Input field 'lastAppliedTemplateId' was added to input object type 'IssueCreateInput' (IssueCreateInput.lastAppliedTemplateId)

feat(schema): [dangerous] Input field 'lastAppliedTemplate' was added to input object type 'IssueFilter' (IssueFilter.lastAppliedTemplate)

feat(schema): [dangerous] Input field 'sourceMetadata' was added to input object type 'IssueFilter' (IssueFilter.sourceMetadata)

feat(schema): [dangerous] Input field 'lastAppliedTemplateId' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.lastAppliedTemplateId)

feat(schema): [dangerous] Argument 'id: String' added to field 'Mutation.attachmentLinkDiscord' (Mutation.attachmentLinkDiscord.id)

feat(schema): [dangerous] Argument 'id: String' added to field 'Mutation.attachmentLinkFront' (Mutation.attachmentLinkFront.id)

feat(schema): [dangerous] Argument 'id: String' added to field 'Mutation.attachmentLinkIntercom' (Mutation.attachmentLinkIntercom.id)

feat(schema): [dangerous] Argument 'id: String' added to field 'Mutation.attachmentLinkZendesk' (Mutation.attachmentLinkZendesk.id)

feat(schema): [dangerous] Input field 'lastAppliedTemplate' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.lastAppliedTemplate)

feat(schema): [dangerous] Input field 'sourceMetadata' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.sourceMetadata)

feat(schema): [dangerous] Input field 'lastAppliedTemplate' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.lastAppliedTemplate)

feat(schema): [dangerous] Input field 'lastAppliedTemplate' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.lastAppliedTemplate)

feat(schema): [dangerous] Input field 'lastAppliedTemplateId' was added to input object type 'ProjectCreateInput' (ProjectCreateInput.lastAppliedTemplateId)

feat(schema): [dangerous] Input field 'lastAppliedTemplate' was added to input object type 'ProjectFilter' (ProjectFilter.lastAppliedTemplate)

feat(schema): [dangerous] Input field 'descriptionData' was added to input object type 'ProjectMilestoneCreateInput' (ProjectMilestoneCreateInput.descriptionData)

feat(schema): [dangerous] Input field 'descriptionData' was added to input object type 'ProjectMilestoneUpdateInput' (ProjectMilestoneUpdateInput.descriptionData)

feat(schema): [dangerous] Input field 'lastAppliedTemplateId' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.lastAppliedTemplateId)

feat(schema): [dangerous] Argument 'filter: ProjectUpdateFilter' added to field 'Query.projectUpdates' (Query.projectUpdates.filter)

feat(schema): [dangerous] Argument 'includeComments: Boolean' added to field 'Query.searchDocuments' (Query.searchDocuments.includeComments)

feat(schema): [dangerous] Argument 'includeComments: Boolean' added to field 'Query.searchIssues' (Query.searchIssues.includeComments)

feat(schema): [dangerous] Argument 'includeComments: Boolean' added to field 'Query.searchProjects' (Query.searchProjects.includeComments)

feat(schema): [dangerous] Enum value 'Paused' was added to enum 'SlaStatus' (SlaStatus.Paused)

feat(schema): [dangerous] Input field 'autoCreateOnEmoji' was added to input object type 'SlackChannelNameMappingInput' (SlackChannelNameMappingInput.autoCreateOnEmoji)

feat(schema): [dangerous] Input field 'autoCreateOnMessage' was added to input object type 'SlackChannelNameMappingInput' (SlackChannelNameMappingInput.autoCreateOnMessage)

feat(schema): [dangerous] Input field 'defaultProjectTemplateId' was added to input object type 'TeamCreateInput' (TeamCreateInput.defaultProjectTemplateId)

feat(schema): [dangerous] Input field 'defaultProjectTemplateId' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.defaultProjectTemplateId)

feat(schema): [dangerous] Enum value 'helpIslandFeatureInsightsDismissed' was added to enum 'UserFlagType' (UserFlagType.helpIslandFeatureInsightsDismissed)

feat(schema): [non_breaking] Type 'AuthApiKey' was added (AuthApiKey)

feat(schema): [non_breaking] Type 'AuthApiKeyCreateInput' was added (AuthApiKeyCreateInput)

feat(schema): [non_breaking] Type 'AuthApiKeyDeletePayload' was added (AuthApiKeyDeletePayload)

feat(schema): [non_breaking] Type 'AuthApiKeyPayload' was added (AuthApiKeyPayload)

feat(schema): [non_breaking] Type 'AuthIntegration' was added (AuthIntegration)

feat(schema): [non_breaking] Type 'AuthOrganization' was added (AuthOrganization)

feat(schema): [non_breaking] Type 'AuthUser' was added (AuthUser)

feat(schema): [non_breaking] Type 'AuthenticationSession' was added (AuthenticationSession)

feat(schema): [non_breaking] Type 'AuthenticationSessionResponse' was added (AuthenticationSessionResponse)

feat(schema): [non_breaking] Type 'AuthenticationSessionType' was added (AuthenticationSessionType)

feat(schema): [non_breaking] Type 'CustomViewHasSubscribersPayload' was added (CustomViewHasSubscribersPayload)

feat(schema): [non_breaking] Type 'DocumentContentHistory' was added (DocumentContentHistory)

feat(schema): [non_breaking] Type 'DocumentContentHistoryPayload' was added (DocumentContentHistoryPayload)

feat(schema): [non_breaking] Type 'DocumentContentHistoryType' was added (DocumentContentHistoryType)

feat(schema): [non_breaking] Type 'GitHubSyncRepo' was added (GitHubSyncRepo)

feat(schema): [non_breaking] Type 'GitHubSyncRepoInput' was added (GitHubSyncRepoInput)

feat(schema): [non_breaking] Type 'GitHubSyncSettings' was added (GitHubSyncSettings)

feat(schema): [non_breaking] Type 'GitHubSyncSettingsInput' was added (GitHubSyncSettingsInput)

feat(schema): [non_breaking] Type 'GitLabSettings' was added (GitLabSettings)

feat(schema): [non_breaking] Type 'GitLabSettingsInput' was added (GitLabSettingsInput)

feat(schema): [non_breaking] Type 'NullableTemplateFilter' was added (NullableTemplateFilter)

feat(schema): [non_breaking] Type 'OrganizationUpdateInput' was added (OrganizationUpdateInput)

feat(schema): [non_breaking] Type 'PagerDutyScheduleInfo' was added (PagerDutyScheduleInfo)

feat(schema): [non_breaking] Type 'PagerDutyScheduleInfoInput' was added (PagerDutyScheduleInfoInput)

feat(schema): [non_breaking] Type 'ProjectUpdateFilter' was added (ProjectUpdateFilter)

feat(schema): [non_breaking] Type 'ProjectUpdateReminderPayload' was added (ProjectUpdateReminderPayload)

feat(schema): [non_breaking] Type 'SlackAsksTeamSettings' was added (SlackAsksTeamSettings)

feat(schema): [non_breaking] Type 'SlackAsksTeamSettingsInput' was added (SlackAsksTeamSettingsInput)

feat(schema): [non_breaking] Type 'SourceMetadataComparator' was added (SourceMetadataComparator)

feat(schema): [non_breaking] Type 'SubTypeComparator' was added (SubTypeComparator)

feat(schema): [non_breaking] Type 'TeamRepoMapping' was added (TeamRepoMapping)

feat(schema): [non_breaking] Type 'TeamRepoMappingInput' was added (TeamRepoMappingInput)

feat(schema): [non_breaking] Type 'TriageResponsibility' was added (TriageResponsibility)

feat(schema): [non_breaking] Type 'TriageResponsibilityAction' was added (TriageResponsibilityAction)

feat(schema): [non_breaking] Type 'TriageResponsibilityConnection' was added (TriageResponsibilityConnection)

feat(schema): [non_breaking] Type 'TriageResponsibilityEdge' was added (TriageResponsibilityEdge)

feat(schema): [non_breaking] Type 'UserUpdateInput' was added (UserUpdateInput)

feat(schema): [non_breaking] Field 'lockedOrganizations' was added to object type 'AuthResolverResponse' (AuthResolverResponse.lockedOrganizations)

feat(schema): [non_breaking] Field 'documentContent' was added to object type 'Comment' (Comment.documentContent)

feat(schema): [non_breaking] Field 'projectUpdate' was added to object type 'Comment' (Comment.projectUpdate)

feat(schema): [non_breaking] Field 'resolvedAt' was added to object type 'Comment' (Comment.resolvedAt)

feat(schema): [non_breaking] Field 'Comment.resolvingComment' description changed from '[ALPHA] The comment that resolved the thread.' to 'The comment that resolved the thread.' (Comment.resolvingComment)

feat(schema): [non_breaking] Field 'Comment.resolvingUser' description changed from '[ALPHA] The user that resolved the thread.' to 'The user that resolved the thread.' (Comment.resolvingUser)

feat(schema): [non_breaking] Input field 'CommentCreateInput.issueId' changed type from 'String!' to 'String' (CommentCreateInput.issueId)

feat(schema): [non_breaking] Field 'lastAppliedTemplate' was added to object type 'Document' (Document.lastAppliedTemplate)

feat(schema): [non_breaking] Field 'Document.content' description changed from 'The document content in markdown format.' to 'The documents content in markdown format.' (Document.content)

feat(schema): [non_breaking] Field 'Document.contentData' description changed from 'The document content as JSON.' to 'The documents content as a Prosemirror document.' (Document.contentData)

feat(schema): [non_breaking] Field 'Document.contentData' is deprecated (Document.contentData)

feat(schema): [non_breaking] Field 'Document.contentData' has deprecation reason 'Use content instead.' (Document.contentData)

feat(schema): [non_breaking] Field 'document' was added to object type 'DocumentContent' (DocumentContent.document)

feat(schema): [non_breaking] Field 'projectMilestone' was added to object type 'DocumentContent' (DocumentContent.projectMilestone)

feat(schema): [non_breaking] Field 'DocumentContent.issue' description changed from 'The issue that the document is associated with.' to 'The issue that the content is associated with.' (DocumentContent.issue)

feat(schema): [non_breaking] Field 'DocumentContent.project' description changed from 'The project that the document is associated with.' to 'The project that the content is associated with.' (DocumentContent.project)

feat(schema): [non_breaking] Input field 'DocumentCreateInput.contentData' description changed from 'The document content as a Prosemirror document.' to '[Internal] The document content as a Prosemirror document.' (DocumentCreateInput.contentData)

feat(schema): [non_breaking] Field 'lastAppliedTemplate' was added to object type 'DocumentSearchResult' (DocumentSearchResult.lastAppliedTemplate)

feat(schema): [non_breaking] Field 'DocumentSearchResult.content' description changed from 'The document content in markdown format.' to 'The documents content in markdown format.' (DocumentSearchResult.content)

feat(schema): [non_breaking] Field 'DocumentSearchResult.contentData' description changed from 'The document content as JSON.' to 'The documents content as a Prosemirror document.' (DocumentSearchResult.contentData)

feat(schema): [non_breaking] Field 'DocumentSearchResult.contentData' is deprecated (DocumentSearchResult.contentData)

feat(schema): [non_breaking] Field 'DocumentSearchResult.contentData' has deprecation reason 'Use content instead.' (DocumentSearchResult.contentData)

feat(schema): [non_breaking] Input field 'DocumentUpdateInput.contentData' description changed from 'The document content as a Prosemirror document.' to '[Internal] The document content as a Prosemirror document.' (DocumentUpdateInput.contentData)

feat(schema): [non_breaking] Field 'gitHubSync' was added to object type 'IntegrationSettings' (IntegrationSettings.gitHubSync)

feat(schema): [non_breaking] Field 'gitLab' was added to object type 'IntegrationSettings' (IntegrationSettings.gitLab)

feat(schema): [non_breaking] Field 'lastAppliedTemplate' was added to object type 'Issue' (Issue.lastAppliedTemplate)

feat(schema): [non_breaking] Field 'Issue.descriptionData' is deprecated (Issue.descriptionData)

feat(schema): [non_breaking] Field 'Issue.descriptionData' has deprecation reason 'Use description instead.' (Issue.descriptionData)

feat(schema): [non_breaking] Field 'addedLabels' was added to object type 'IssueHistory' (IssueHistory.addedLabels)

feat(schema): [non_breaking] Field 'removedLabels' was added to object type 'IssueHistory' (IssueHistory.removedLabels)

feat(schema): [non_breaking] Field 'subscriptions' was added to object type 'IssueNotification' (IssueNotification.subscriptions)

feat(schema): [non_breaking] Field 'lastAppliedTemplate' was added to object type 'IssueSearchResult' (IssueSearchResult.lastAppliedTemplate)

feat(schema): [non_breaking] Field 'IssueSearchResult.descriptionData' is deprecated (IssueSearchResult.descriptionData)

feat(schema): [non_breaking] Field 'IssueSearchResult.descriptionData' has deprecation reason 'Use description instead.' (IssueSearchResult.descriptionData)

feat(schema): [non_breaking] Field 'attachmentLinkGitHubPR' was added to object type 'Mutation' (Mutation.attachmentLinkGitHubPR)

feat(schema): [non_breaking] Field 'attachmentLinkGitLabMR' was added to object type 'Mutation' (Mutation.attachmentLinkGitLabMR)

feat(schema): [non_breaking] Field 'createProjectUpdateReminder' was added to object type 'Mutation' (Mutation.createProjectUpdateReminder)

feat(schema): [non_breaking] Field 'integrationGithubSync' was added to object type 'Mutation' (Mutation.integrationGithubSync)

feat(schema): [non_breaking] Field 'integrationGoogleCalendarPersonalConnect' was added to object type 'Mutation' (Mutation.integrationGoogleCalendarPersonalConnect)

feat(schema): [non_breaking] Field 'integrationPagerDutyRefreshScheduleMappings' was added to object type 'Mutation' (Mutation.integrationPagerDutyRefreshScheduleMappings)

feat(schema): [non_breaking] Field 'issueAddLabel' was added to object type 'Mutation' (Mutation.issueAddLabel)

feat(schema): [non_breaking] Field 'issueRemoveLabel' was added to object type 'Mutation' (Mutation.issueRemoveLabel)

feat(schema): [non_breaking] Field 'issueSubscribe' was added to object type 'Mutation' (Mutation.issueSubscribe)

feat(schema): [non_breaking] Field 'issueUnsubscribe' was added to object type 'Mutation' (Mutation.issueUnsubscribe)

feat(schema): [non_breaking] Field 'logoutAllSessions' was added to object type 'Mutation' (Mutation.logoutAllSessions)

feat(schema): [non_breaking] Field 'logoutOtherSessions' was added to object type 'Mutation' (Mutation.logoutOtherSessions)

feat(schema): [non_breaking] Field 'logoutSession' was added to object type 'Mutation' (Mutation.logoutSession)

feat(schema): [non_breaking] Field 'Mutation.logout' description changed from 'Logout of all clients.' to 'Logout the client.' (Mutation.logout)

feat(schema): [non_breaking] Field 'OauthClient.creator' description changed from 'The user who created the OAuthClient.' to 'The user who created the OAuth application.' (OauthClient.creator)

feat(schema): [non_breaking] Field 'OauthClient.organization' description changed from 'The organization that the OAuthClient is associated with.' to 'The organization that the OAuth application is associated with.' (OauthClient.organization)

feat(schema): [non_breaking] Field 'OauthClient.publicEnabled' description changed from 'Whether the OAuth application is publicly visible, or only visible to the creating workspace.' to 'Whether the OAuth application can be installed in other organizations.' (OauthClient.publicEnabled)

feat(schema): [non_breaking] Field 'allowMembersToInvite' was added to object type 'Organization' (Organization.allowMembersToInvite)

feat(schema): [non_breaking] Input field 'PagerDutyInput.scheduleMapping' description changed from 'The mapping of PagerDuty schedule id to names.' to 'Metadata about a PagerDuty schedule.' (PagerDutyInput.scheduleMapping)

feat(schema): [non_breaking] Field 'PagerDutySettings.scheduleMapping' description changed from 'The mapping of PagerDuty schedule id to names.' to 'Metadata about a PagerDuty schedule.' (PagerDutySettings.scheduleMapping)

feat(schema): [non_breaking] Field 'collectionMethod' was added to object type 'PaidSubscription' (PaidSubscription.collectionMethod)

feat(schema): [non_breaking] Field 'lastAppliedTemplate' was added to object type 'Project' (Project.lastAppliedTemplate)

feat(schema): [non_breaking] Field 'descriptionData' was added to object type 'ProjectMilestone' (ProjectMilestone.descriptionData)

feat(schema): [non_breaking] Field 'ProjectMilestone.description' description changed from 'The description of the project milestone.' to 'The project milestone's description in markdown format.' (ProjectMilestone.description)

feat(schema): [non_breaking] Input field 'ProjectMilestoneCreateInput.description' description changed from 'The description of the project milestone.' to 'The description of the project milestone in markdown format.' (ProjectMilestoneCreateInput.description)

feat(schema): [non_breaking] Input field 'ProjectMilestoneUpdateInput.description' description changed from 'The description of the project milestone.' to 'The description of the project milestone in markdown format.' (ProjectMilestoneUpdateInput.description)

feat(schema): [non_breaking] Field 'lastAppliedTemplate' was added to object type 'ProjectSearchResult' (ProjectSearchResult.lastAppliedTemplate)

feat(schema): [non_breaking] Field 'diffMarkdown' was added to object type 'ProjectUpdate' (ProjectUpdate.diffMarkdown)

feat(schema): [non_breaking] Input field 'PushSubscriptionCreateInput.userId' changed type from 'String!' to 'String' (PushSubscriptionCreateInput.userId)

feat(schema): [non_breaking] Field 'entity' was added to object type 'PushSubscriptionPayload' (PushSubscriptionPayload.entity)

feat(schema): [non_breaking] Field 'authenticationSessions' was added to object type 'Query' (Query.authenticationSessions)

feat(schema): [non_breaking] Field 'customViewHasSubscribers' was added to object type 'Query' (Query.customViewHasSubscribers)

feat(schema): [non_breaking] Field 'documentContentHistory' was added to object type 'Query' (Query.documentContentHistory)

feat(schema): [non_breaking] Field 'Query.documents' description changed from 'All documents for the project.' to 'All documents in the workspace.' (Query.documents)

feat(schema): [non_breaking] Field 'autoCreateOnEmoji' was added to object type 'SlackChannelNameMapping' (SlackChannelNameMapping.autoCreateOnEmoji)

feat(schema): [non_breaking] Field 'autoCreateOnMessage' was added to object type 'SlackChannelNameMapping' (SlackChannelNameMapping.autoCreateOnMessage)

feat(schema): [non_breaking] Field 'teams' was added to object type 'SlackChannelNameMapping' (SlackChannelNameMapping.teams)

feat(schema): [non_breaking] Description 'Tuple for mapping Slack channel IDs to names' on type 'SlackChannelNameMapping' has changed to 'Object for mapping Slack channel IDs to names and other settings' (SlackChannelNameMapping)

feat(schema): [non_breaking] Field 'SyncResponse.delta' description changed from 'JSON serialized delta changes that the client can apply to its local state
    in order to catch up with the state of the world.' to 'JSON serialized delta changes that the client can apply to its local state in order to catch up with the state of the world.' (SyncResponse.delta)

feat(schema): [non_breaking] Description 'Contains either the full serialized state of the application or delta packets that the requester can
  apply to the local data set in order to be up-to-date.' on type 'SyncResponse' has changed to 'Contains either the full serialized state of the application or delta packets that the requester can apply to the local data set in order to be up-to-date.' (SyncResponse)

feat(schema): [non_breaking] Field 'defaultProjectTemplate' was added to object type 'Team' (Team.defaultProjectTemplate)

feat(schema): [non_breaking] Field 'Team.cycleLockToActive' description changed from 'Only allow issues issues with cycles in Active Issues.' to 'Auto assign issues to current cycle if in active status.' (Team.cycleLockToActive)

feat(schema): [non_breaking] Field 'WorkflowState.type' description changed from 'The type of the state.' to 'The type of the state. One of "triage", "backlog", "unstarted", "started", "completed", "canceled".' (WorkflowState.type)