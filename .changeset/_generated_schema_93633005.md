---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'userDemoteAdmin' (deprecated) was removed from object type 'Mutation' (Mutation.userDemoteAdmin)

feat(schema): [breaking] Field 'userDemoteMember' (deprecated) was removed from object type 'Mutation' (Mutation.userDemoteMember)

feat(schema): [breaking] Field 'userPromoteAdmin' (deprecated) was removed from object type 'Mutation' (Mutation.userPromoteAdmin)

feat(schema): [breaking] Field 'userPromoteMember' (deprecated) was removed from object type 'Mutation' (Mutation.userPromoteMember)

feat(schema): [breaking] Argument 'connectSlackChannel: Boolean' was removed from field 'Mutation.projectCreate' (Mutation.projectCreate.connectSlackChannel)

feat(schema): [dangerous] Input field 'sessionId' was added to input object type 'ContactSalesCreateInput' (ContactSalesCreateInput.sessionId)

feat(schema): [dangerous] Enum value 'asksWeb' was added to enum 'EmailIntakeAddressType' (EmailIntakeAddressType.asksWeb)

feat(schema): [dangerous] Input field 'statusNamesPerIssueType' was added to input object type 'JiraSettingsInput' (JiraSettingsInput.statusNamesPerIssueType)

feat(schema): [dangerous] Argument 'sessionId: String' added to field 'Mutation.createOrganizationFromOnboarding' (Mutation.createOrganizationFromOnboarding.sessionId)

feat(schema): [dangerous] Argument 'githubHost: String' added to field 'Mutation.integrationGithubConnect' (Mutation.integrationGithubConnect.githubHost)

feat(schema): [dangerous] Argument 'slackChannelName: String' added to field 'Mutation.projectCreate' (Mutation.projectCreate.slackChannelName)

feat(schema): [dangerous] Input field 'slackProjectChannelIntegrationId' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.slackProjectChannelIntegrationId)

feat(schema): [dangerous] Input field 'slackProjectChannelPrefix' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.slackProjectChannelPrefix)

feat(schema): [non_breaking] Type 'AsksWebSettingsCreateInput' was added (AsksWebSettingsCreateInput)

feat(schema): [non_breaking] Type 'AsksWebSettingsEmailIntakeAddressInput' was added (AsksWebSettingsEmailIntakeAddressInput)

feat(schema): [non_breaking] Type 'AsksWebSettingsPayload' was added (AsksWebSettingsPayload)

feat(schema): [non_breaking] Type 'AsksWebSettingsUpdateInput' was added (AsksWebSettingsUpdateInput)

feat(schema): [non_breaking] Type 'ProjectAttachmentConnection' was added (ProjectAttachmentConnection)

feat(schema): [non_breaking] Type 'ProjectAttachmentEdge' was added (ProjectAttachmentEdge)

feat(schema): [non_breaking] Type 'WelcomeMessage' was added (WelcomeMessage)

feat(schema): [non_breaking] Type 'WelcomeMessageNotification' was added (WelcomeMessageNotification)

feat(schema): [non_breaking] Field 'welcomeMessage' was added to object type 'DocumentContent' (DocumentContent.welcomeMessage)

feat(schema): [non_breaking] Field 'error' was added to object type 'GitLabIntegrationCreatePayload' (GitLabIntegrationCreatePayload.error)

feat(schema): [non_breaking] Field 'errorResponseBody' was added to object type 'GitLabIntegrationCreatePayload' (GitLabIntegrationCreatePayload.errorResponseBody)

feat(schema): [non_breaking] Field 'errorResponseHeaders' was added to object type 'GitLabIntegrationCreatePayload' (GitLabIntegrationCreatePayload.errorResponseHeaders)

feat(schema): [non_breaking] Field 'fromProjectMilestone' was added to object type 'IssueHistory' (IssueHistory.fromProjectMilestone)

feat(schema): [non_breaking] Field 'fromSlaBreached' was added to object type 'IssueHistory' (IssueHistory.fromSlaBreached)

feat(schema): [non_breaking] Field 'fromSlaBreachesAt' was added to object type 'IssueHistory' (IssueHistory.fromSlaBreachesAt)

feat(schema): [non_breaking] Field 'fromSlaStartedAt' was added to object type 'IssueHistory' (IssueHistory.fromSlaStartedAt)

feat(schema): [non_breaking] Field 'fromSlaType' was added to object type 'IssueHistory' (IssueHistory.fromSlaType)

feat(schema): [non_breaking] Field 'toProjectMilestone' was added to object type 'IssueHistory' (IssueHistory.toProjectMilestone)

feat(schema): [non_breaking] Field 'toSlaBreached' was added to object type 'IssueHistory' (IssueHistory.toSlaBreached)

feat(schema): [non_breaking] Field 'toSlaBreachesAt' was added to object type 'IssueHistory' (IssueHistory.toSlaBreachesAt)

feat(schema): [non_breaking] Field 'toSlaStartedAt' was added to object type 'IssueHistory' (IssueHistory.toSlaStartedAt)

feat(schema): [non_breaking] Field 'toSlaType' was added to object type 'IssueHistory' (IssueHistory.toSlaType)

feat(schema): [non_breaking] Field 'triageResponsibilityTeam' was added to object type 'IssueHistory' (IssueHistory.triageResponsibilityTeam)

feat(schema): [non_breaking] Field 'asksWebSettingsCreate' was added to object type 'Mutation' (Mutation.asksWebSettingsCreate)

feat(schema): [non_breaking] Field 'asksWebSettingsUpdate' was added to object type 'Mutation' (Mutation.asksWebSettingsUpdate)

feat(schema): [non_breaking] Field 'Mutation.releaseUpdateByPipeline' description changed from '[ALPHA] Updates a release by pipeline. If version is provided, updates that specific release; otherwise updates the most recent started release.' to '[ALPHA] Updates a release by pipeline.' (Mutation.releaseUpdateByPipeline)

feat(schema): [non_breaking] Field 'Mutation.releaseUpdateByPipelineByAccessKey' description changed from '[ALPHA] Updates a release by pipeline using an access key. If version is provided, updates that specific release; otherwise updates the most recent started release. The pipeline is inferred from the access key.' to '[ALPHA] Updates a release by pipeline using an access key.' (Mutation.releaseUpdateByPipelineByAccessKey)

feat(schema): [non_breaking] Input field 'NullableUserFilter.owner' description changed from '[Internal] Comparator for the user's owner status.' to 'Comparator for the user's owner status.' (NullableUserFilter.owner)

feat(schema): [non_breaking] Field 'slackProjectChannelIntegration' was added to object type 'Organization' (Organization.slackProjectChannelIntegration)

feat(schema): [non_breaking] Field 'slackProjectChannelPrefix' was added to object type 'Organization' (Organization.slackProjectChannelPrefix)

feat(schema): [non_breaking] Field 'attachments' was added to object type 'Project' (Project.attachments)

feat(schema): [non_breaking] Field 'attachments' was added to object type 'ProjectSearchResult' (ProjectSearchResult.attachments)

feat(schema): [non_breaking] Input field 'ReleaseUpdateByPipelineInput.version' description changed from 'The version of the release to update. If not provided, the latest started release will be updated.' to 'The version of the release to update. If not provided, the latest started or latest planned release will be updated.' (ReleaseUpdateByPipelineInput.version)

feat(schema): [non_breaking] Input field 'ReleaseUpdateByPipelineInputBase.version' description changed from 'The version of the release to update. If not provided, the latest started release will be updated.' to 'The version of the release to update. If not provided, the latest started or latest planned release will be updated.' (ReleaseUpdateByPipelineInputBase.version)

feat(schema): [non_breaking] Field 'retiredAt' was added to object type 'Team' (Team.retiredAt)

feat(schema): [non_breaking] Input field 'TeamUpdateInput.retiredAt' description changed from '[Internal] When the team was retired.' to 'When the team was retired.' (TeamUpdateInput.retiredAt)

feat(schema): [non_breaking] Input field 'UserCollectionFilter.owner' description changed from '[Internal] Comparator for the user's owner status.' to 'Comparator for the user's owner status.' (UserCollectionFilter.owner)

feat(schema): [non_breaking] Input field 'UserFilter.owner' description changed from '[Internal] Comparator for the user's owner status.' to 'Comparator for the user's owner status.' (UserFilter.owner)