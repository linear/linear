---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'AgentContext' was removed (AgentContext)

feat(schema): [breaking] Type 'AgentContextConnection' was removed (AgentContextConnection)

feat(schema): [breaking] Type 'AgentContextCreateInput' was removed (AgentContextCreateInput)

feat(schema): [breaking] Type 'AgentContextEdge' was removed (AgentContextEdge)

feat(schema): [breaking] Type 'AgentContextPayload' was removed (AgentContextPayload)

feat(schema): [breaking] Type 'AgentContextUpdateInput' was removed (AgentContextUpdateInput)

feat(schema): [breaking] Field 'agentContext' was removed from object type 'AgentActivity' (AgentActivity.agentContext)

feat(schema): [breaking] Field 'roadmap' was removed from object type 'Favorite' (Favorite.roadmap)

feat(schema): [breaking] Input field 'roadmapId' was removed from input object type 'FavoriteCreateInput' (FavoriteCreateInput.roadmapId)

feat(schema): [breaking] Field 'allowedAuthServices' was removed from object type 'IdentityProvider' (IdentityProvider.allowedAuthServices)

feat(schema): [breaking] Field 'agentContextCreate' was removed from object type 'Mutation' (Mutation.agentContextCreate)

feat(schema): [breaking] Field 'agentContextUpdate' was removed from object type 'Mutation' (Mutation.agentContextUpdate)

feat(schema): [breaking] Type for argument 'organizationName' on field 'Mutation.integrationGitHubEnterpriseServerConnect' changed from 'String' to 'String!' (Mutation.integrationGitHubEnterpriseServerConnect.organizationName)

feat(schema): [breaking] Field 'agentContext' was removed from object type 'Query' (Query.agentContext)

feat(schema): [breaking] Field 'agentContexts' was removed from object type 'Query' (Query.agentContexts)

feat(schema): [breaking] Argument 'integrationId: String!' added to field 'Query.verifyGitHubEnterpriseServerInstallation' (Query.verifyGitHubEnterpriseServerInstallation.integrationId)

feat(schema): [dangerous] Input field 'initiativeFilterData' was added to input object type 'CustomViewCreateInput' (CustomViewCreateInput.initiativeFilterData)

feat(schema): [dangerous] Input field 'initiativeFilterData' was added to input object type 'CustomViewUpdateInput' (CustomViewUpdateInput.initiativeFilterData)

feat(schema): [dangerous] Input field 'automateTicketReopeningOnProjectCancellation' was added to input object type 'FrontSettingsInput' (FrontSettingsInput.automateTicketReopeningOnProjectCancellation)

feat(schema): [dangerous] Input field 'automateTicketReopeningOnProjectCompletion' was added to input object type 'FrontSettingsInput' (FrontSettingsInput.automateTicketReopeningOnProjectCompletion)

feat(schema): [dangerous] Input field 'codeAccess' was added to input object type 'GitHubSettingsInput' (GitHubSettingsInput.codeAccess)

feat(schema): [dangerous] Enum value 'githubCodeAccessPersonal' was added to enum 'IntegrationService' (IntegrationService.githubCodeAccessPersonal)

feat(schema): [dangerous] Input field 'githubCodeAccessPersonal' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.githubCodeAccessPersonal)

feat(schema): [dangerous] Input field 'automateTicketReopeningOnProjectCancellation' was added to input object type 'IntercomSettingsInput' (IntercomSettingsInput.automateTicketReopeningOnProjectCancellation)

feat(schema): [dangerous] Input field 'automateTicketReopeningOnProjectCompletion' was added to input object type 'IntercomSettingsInput' (IntercomSettingsInput.automateTicketReopeningOnProjectCompletion)

feat(schema): [dangerous] Input field 'customerImportantCount' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.customerImportantCount)

feat(schema): [dangerous] Input field 'customerImportantCount' was added to input object type 'IssueFilter' (IssueFilter.customerImportantCount)

feat(schema): [dangerous] Argument 'skipInstallationDeletion: Boolean' added to field 'Mutation.integrationDelete' (Mutation.integrationDelete.skipInstallationDeletion)

feat(schema): [dangerous] Argument 'codeAccess: Boolean' added to field 'Mutation.integrationGitHubPersonal' (Mutation.integrationGitHubPersonal.codeAccess)

feat(schema): [dangerous] Argument 'codeAccess: Boolean' added to field 'Mutation.integrationGithubConnect' (Mutation.integrationGithubConnect.codeAccess)

feat(schema): [dangerous] Input field 'customerImportantCount' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.customerImportantCount)

feat(schema): [dangerous] Input field 'customerImportantCount' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.customerImportantCount)

feat(schema): [dangerous] Input field 'identityProviderId' was added to input object type 'OrganizationDomainCreateInput' (OrganizationDomainCreateInput.identityProviderId)

feat(schema): [dangerous] Input field 'customerImportantCount' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.customerImportantCount)

feat(schema): [dangerous] Input field 'customerImportantCount' was added to input object type 'ProjectFilter' (ProjectFilter.customerImportantCount)

feat(schema): [dangerous] Input field 'automateTicketReopeningOnProjectCancellation' was added to input object type 'SalesforceSettingsInput' (SalesforceSettingsInput.automateTicketReopeningOnProjectCancellation)

feat(schema): [dangerous] Input field 'automateTicketReopeningOnProjectCompletion' was added to input object type 'SalesforceSettingsInput' (SalesforceSettingsInput.automateTicketReopeningOnProjectCompletion)

feat(schema): [dangerous] Input field 'automateTicketReopeningOnProjectCancellation' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.automateTicketReopeningOnProjectCancellation)

feat(schema): [dangerous] Input field 'automateTicketReopeningOnProjectCompletion' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.automateTicketReopeningOnProjectCompletion)

feat(schema): [non_breaking] Type 'AgentActivityCreatePromptInput' was added (AgentActivityCreatePromptInput)

feat(schema): [non_breaking] Type 'IssueLabelMoveToTeamLabelsInput' was added (IssueLabelMoveToTeamLabelsInput)

feat(schema): [non_breaking] Type 'IssueLabelMoveToTeamLabelsPayload' was added (IssueLabelMoveToTeamLabelsPayload)

feat(schema): [non_breaking] Type 'LabelsMergeInput' was added (LabelsMergeInput)

feat(schema): [non_breaking] Field 'sourceMetadata' was added to object type 'AgentActivity' (AgentActivity.sourceMetadata)

feat(schema): [non_breaking] Field 'initiativeFilterData' was added to object type 'CustomView' (CustomView.initiativeFilterData)

feat(schema): [non_breaking] Field 'initiatives' was added to object type 'CustomView' (CustomView.initiatives)

feat(schema): [non_breaking] Field 'category' was added to object type 'CustomerNeedNotification' (CustomerNeedNotification.category)

feat(schema): [non_breaking] Field 'category' was added to object type 'CustomerNotification' (CustomerNotification.category)

feat(schema): [non_breaking] Field 'category' was added to object type 'DocumentNotification' (DocumentNotification.category)

feat(schema): [non_breaking] Field 'team' was added to object type 'Draft' (Draft.team)

feat(schema): [non_breaking] Field 'defaultMigrated' was added to object type 'IdentityProvider' (IdentityProvider.defaultMigrated)

feat(schema): [non_breaking] Field 'category' was added to object type 'InitiativeNotification' (InitiativeNotification.category)

feat(schema): [non_breaking] Field 'Issue.delegate' description changed from 'The app user that is delegated to work on this issue.' to 'The agent user that is delegated to work on this issue.' (Issue.delegate)

feat(schema): [non_breaking] Input field 'IssueCollectionFilter.delegate' description changed from 'Filters that the issue's delegate must satisfy.' to 'Filters that the issue's delegated agent must satisfy.' (IssueCollectionFilter.delegate)

feat(schema): [non_breaking] Input field 'IssueCreateInput.delegateId' description changed from 'The identifier of the app user to delegate the issue to.' to 'The identifier of the agent user to delegate the issue to.' (IssueCreateInput.delegateId)

feat(schema): [non_breaking] Field 'IssueDraft.delegateId' description changed from 'The app user delegated to work on the issue being drafted.' to 'The agent user delegated to work on the issue being drafted.' (IssueDraft.delegateId)

feat(schema): [non_breaking] Input field 'IssueFilter.delegate' description changed from 'Filters that the issue's delegate must satisfy.' to 'Filters that the issue's delegated agent must satisfy.' (IssueFilter.delegate)

feat(schema): [non_breaking] Field 'category' was added to object type 'IssueNotification' (IssueNotification.category)

feat(schema): [non_breaking] Field 'IssueSearchResult.delegate' description changed from 'The app user that is delegated to work on this issue.' to 'The agent user that is delegated to work on this issue.' (IssueSearchResult.delegate)

feat(schema): [non_breaking] Field 'rank' was added to object type 'IssueSuggestionMetadata' (IssueSuggestionMetadata.rank)

feat(schema): [non_breaking] Input field 'IssueUpdateInput.delegateId' description changed from 'The identifier of the app user to delegate the issue to.' to 'The identifier of the agent user to delegate the issue to.' (IssueUpdateInput.delegateId)

feat(schema): [non_breaking] Field 'agentActivityCreatePrompt' was added to object type 'Mutation' (Mutation.agentActivityCreatePrompt)

feat(schema): [non_breaking] Field 'issueLabelMoveToTeamLabels' was added to object type 'Mutation' (Mutation.issueLabelMoveToTeamLabels)

feat(schema): [non_breaking] Field 'issueLabelsMerge' was added to object type 'Mutation' (Mutation.issueLabelsMerge)

feat(schema): [non_breaking] Field 'projectLabelsMerge' was added to object type 'Mutation' (Mutation.projectLabelsMerge)

feat(schema): [non_breaking] Field 'category' was added to interface 'Notification' (Notification.category)

feat(schema): [non_breaking] Input field 'NullableIssueFilter.delegate' description changed from 'Filters that the issue's delegate must satisfy.' to 'Filters that the issue's delegated agent must satisfy.' (NullableIssueFilter.delegate)

feat(schema): [non_breaking] Field 'category' was added to object type 'OauthClientApprovalNotification' (OauthClientApprovalNotification.category)

feat(schema): [non_breaking] Field 'category' was added to object type 'PostNotification' (PostNotification.category)

feat(schema): [non_breaking] Field 'category' was added to object type 'ProjectNotification' (ProjectNotification.category)

feat(schema): [non_breaking] Field 'category' was added to object type 'PullRequestNotification' (PullRequestNotification.category)

feat(schema): [non_breaking] Field 'Query.roadmapToProject' is deprecated (Query.roadmapToProject)

feat(schema): [non_breaking] Field 'Query.roadmapToProject' has deprecation reason 'RoadmapToProject is deprecated, use InitiativeToProject instead.' (Query.roadmapToProject)

feat(schema): [non_breaking] Description was removed from field 'Query.roadmapToProjects' (Query.roadmapToProjects)

feat(schema): [non_breaking] Field 'Query.roadmapToProjects' is deprecated (Query.roadmapToProjects)

feat(schema): [non_breaking] Field 'Query.roadmapToProjects' has deprecation reason 'RoadmapToProject is deprecated, use InitiativeToProject instead.' (Query.roadmapToProjects)

feat(schema): [non_breaking] Description 'A roadmap for projects.' on type 'Roadmap' has changed to '[Deprecated] A roadmap for projects.' (Roadmap)

feat(schema): [non_breaking] Description 'Join table between projects and roadmaps.' on type 'RoadmapToProject' has changed to '[Deprecated] Join table between projects and roadmaps.' (RoadmapToProject)