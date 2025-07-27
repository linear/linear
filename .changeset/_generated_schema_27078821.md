---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'allowedAuthServices' was removed from object type 'IdentityProvider' (IdentityProvider.allowedAuthServices)

feat(schema): [breaking] Type for argument 'organizationName' on field 'Mutation.integrationGitHubEnterpriseServerConnect' changed from 'String' to 'String!' (Mutation.integrationGitHubEnterpriseServerConnect.organizationName)

feat(schema): [breaking] Argument 'integrationId: String!' added to field 'Query.verifyGitHubEnterpriseServerInstallation' (Query.verifyGitHubEnterpriseServerInstallation.integrationId)

feat(schema): [dangerous] Input field 'automateTicketReopeningOnProjectCancellation' was added to input object type 'FrontSettingsInput' (FrontSettingsInput.automateTicketReopeningOnProjectCancellation)

feat(schema): [dangerous] Input field 'automateTicketReopeningOnProjectCompletion' was added to input object type 'FrontSettingsInput' (FrontSettingsInput.automateTicketReopeningOnProjectCompletion)

feat(schema): [dangerous] Input field 'codeAccess' was added to input object type 'GitHubPersonalSettingsInput' (GitHubPersonalSettingsInput.codeAccess)

feat(schema): [dangerous] Input field 'codeAccess' was added to input object type 'GitHubSettingsInput' (GitHubSettingsInput.codeAccess)

feat(schema): [dangerous] Input field 'automateTicketReopeningOnProjectCancellation' was added to input object type 'IntercomSettingsInput' (IntercomSettingsInput.automateTicketReopeningOnProjectCancellation)

feat(schema): [dangerous] Input field 'automateTicketReopeningOnProjectCompletion' was added to input object type 'IntercomSettingsInput' (IntercomSettingsInput.automateTicketReopeningOnProjectCompletion)

feat(schema): [dangerous] Input field 'customerImportantCount' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.customerImportantCount)

feat(schema): [dangerous] Input field 'customerImportantCount' was added to input object type 'IssueFilter' (IssueFilter.customerImportantCount)

feat(schema): [dangerous] Argument 'skipInstallationDeletion: Boolean' added to field 'Mutation.integrationDelete' (Mutation.integrationDelete.skipInstallationDeletion)

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

feat(schema): [non_breaking] Field 'sourceMetadata' was added to object type 'AgentActivity' (AgentActivity.sourceMetadata)

feat(schema): [non_breaking] Field 'category' was added to object type 'CustomerNeedNotification' (CustomerNeedNotification.category)

feat(schema): [non_breaking] Field 'category' was added to object type 'CustomerNotification' (CustomerNotification.category)

feat(schema): [non_breaking] Field 'category' was added to object type 'DocumentNotification' (DocumentNotification.category)

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

feat(schema): [non_breaking] Field 'category' was added to interface 'Notification' (Notification.category)

feat(schema): [non_breaking] Input field 'NullableIssueFilter.delegate' description changed from 'Filters that the issue's delegate must satisfy.' to 'Filters that the issue's delegated agent must satisfy.' (NullableIssueFilter.delegate)

feat(schema): [non_breaking] Field 'category' was added to object type 'OauthClientApprovalNotification' (OauthClientApprovalNotification.category)

feat(schema): [non_breaking] Field 'category' was added to object type 'PostNotification' (PostNotification.category)

feat(schema): [non_breaking] Field 'category' was added to object type 'ProjectNotification' (ProjectNotification.category)

feat(schema): [non_breaking] Field 'category' was added to object type 'PullRequestNotification' (PullRequestNotification.category)