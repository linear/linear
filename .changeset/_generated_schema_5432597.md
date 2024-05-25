---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'GithubOAuthTokenPayload' was removed (GithubOAuthTokenPayload)

feat(schema): [breaking] Type 'GithubOrg' was removed (GithubOrg)

feat(schema): [breaking] Type 'GithubRepo' was removed (GithubRepo)

feat(schema): [breaking] Type 'OrganizationStartPlusTrialPayload' was removed (OrganizationStartPlusTrialPayload)

feat(schema): [breaking] Field 'needsManualSetup' was removed from object type 'JiraSettings' (JiraSettings.needsManualSetup)

feat(schema): [breaking] Input field 'needsManualSetup' was removed from input object type 'JiraSettingsInput' (JiraSettingsInput.needsManualSetup)

feat(schema): [breaking] Field 'organizationStartPlusTrial' was removed from object type 'Mutation' (Mutation.organizationStartPlusTrial)

feat(schema): [breaking] Argument 'integrationId: String!' added to field 'Mutation.issueImportCreateGithub' (Mutation.issueImportCreateGithub.integrationId)

feat(schema): [breaking] Argument 'id: String' was removed from field 'Mutation.issueImportCreateGithub' (Mutation.issueImportCreateGithub.id)

feat(schema): [breaking] Field 'issueImportFinishGithubOAuth' was removed from object type 'Query' (Query.issueImportFinishGithubOAuth)

feat(schema): [breaking] Enum value 'myViews' was removed from enum 'ViewType' (ViewType.myViews)

feat(schema): [dangerous] Input field 'projectId' was added to input object type 'EntityExternalLinkCreateInput' (EntityExternalLinkCreateInput.projectId)

feat(schema): [dangerous] Input field 'orgType' was added to input object type 'GitHubSettingsInput' (GitHubSettingsInput.orgType)

feat(schema): [dangerous] Input field 'disallowSignup' was added to input object type 'GoogleUserAccountAuthInput' (GoogleUserAccountAuthInput.disallowSignup)

feat(schema): [dangerous] Input field 'icon' was added to input object type 'InitiativeCreateInput' (InitiativeCreateInput.icon)

feat(schema): [dangerous] Input field 'status' was added to input object type 'InitiativeCreateInput' (InitiativeCreateInput.status)

feat(schema): [dangerous] Input field 'icon' was added to input object type 'InitiativeUpdateInput' (InitiativeUpdateInput.icon)

feat(schema): [dangerous] Input field 'status' was added to input object type 'InitiativeUpdateInput' (InitiativeUpdateInput.status)

feat(schema): [dangerous] Enum value 'githubImport' was added to enum 'IntegrationService' (IntegrationService.githubImport)

feat(schema): [dangerous] Enum value 'slackCustomViewNotifications' was added to enum 'IntegrationService' (IntegrationService.slackCustomViewNotifications)

feat(schema): [dangerous] Input field 'gitHubImport' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.gitHubImport)

feat(schema): [dangerous] Input field 'slackCustomViewNotifications' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.slackCustomViewNotifications)

feat(schema): [dangerous] Input field 'manualSetup' was added to input object type 'JiraConfigurationInput' (JiraConfigurationInput.manualSetup)

feat(schema): [dangerous] Input field 'manualSetup' was added to input object type 'JiraSettingsInput' (JiraSettingsInput.manualSetup)

feat(schema): [dangerous] Input field 'setupPending' was added to input object type 'JiraSettingsInput' (JiraSettingsInput.setupPending)

feat(schema): [dangerous] Argument 'githubRepoIds: [Int!]' added to field 'Mutation.issueImportCreateGithub' (Mutation.issueImportCreateGithub.githubRepoIds)

feat(schema): [dangerous] Argument 'overrideCreatedAt: DateTime' added to field 'Mutation.issueRelationCreate' (Mutation.issueRelationCreate.overrideCreatedAt)

feat(schema): [dangerous] Input field 'projectUpdateReminderFrequencyInWeeks' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.projectUpdateReminderFrequencyInWeeks)

feat(schema): [dangerous] Input field 'enterpriseId' was added to input object type 'SharedSlackSettingsInput' (SharedSlackSettingsInput.enterpriseId)

feat(schema): [dangerous] Input field 'enterpriseId' was added to input object type 'SlackAsksSettingsInput' (SlackAsksSettingsInput.enterpriseId)

feat(schema): [dangerous] Input field 'enterpriseId' was added to input object type 'SlackSettingsInput' (SlackSettingsInput.enterpriseId)

feat(schema): [dangerous] Input field 'notificationDeliveryPreferences' was added to input object type 'UserSettingsUpdateInput' (UserSettingsUpdateInput.notificationDeliveryPreferences)

feat(schema): [dangerous] Enum value 'customViewsPersonal' was added to enum 'ViewType' (ViewType.customViewsPersonal)

feat(schema): [dangerous] Enum value 'initiativesAll' was added to enum 'ViewType' (ViewType.initiativesAll)

feat(schema): [dangerous] Enum value 'initiativesCompleted' was added to enum 'ViewType' (ViewType.initiativesCompleted)

feat(schema): [dangerous] Enum value 'initiativesPlanned' was added to enum 'ViewType' (ViewType.initiativesPlanned)

feat(schema): [non_breaking] Type 'GitHubImportSettings' was added (GitHubImportSettings)

feat(schema): [non_breaking] Type 'GitHubImportSettingsInput' was added (GitHubImportSettingsInput)

feat(schema): [non_breaking] Type 'GithubOrgType' was added (GithubOrgType)

feat(schema): [non_breaking] Type 'InitiativeStatus' was added (InitiativeStatus)

feat(schema): [non_breaking] Type 'NotificationDeliveryPreferences' was added (NotificationDeliveryPreferences)

feat(schema): [non_breaking] Type 'NotificationDeliveryPreferencesChannel' was added (NotificationDeliveryPreferencesChannel)

feat(schema): [non_breaking] Type 'NotificationDeliveryPreferencesChannelInput' was added (NotificationDeliveryPreferencesChannelInput)

feat(schema): [non_breaking] Type 'NotificationDeliveryPreferencesDay' was added (NotificationDeliveryPreferencesDay)

feat(schema): [non_breaking] Type 'NotificationDeliveryPreferencesDayInput' was added (NotificationDeliveryPreferencesDayInput)

feat(schema): [non_breaking] Type 'NotificationDeliveryPreferencesInput' was added (NotificationDeliveryPreferencesInput)

feat(schema): [non_breaking] Type 'NotificationDeliveryPreferencesSchedule' was added (NotificationDeliveryPreferencesSchedule)

feat(schema): [non_breaking] Type 'NotificationDeliveryPreferencesScheduleInput' was added (NotificationDeliveryPreferencesScheduleInput)

feat(schema): [non_breaking] Type 'OrganizationDomainUpdateInput' was added (OrganizationDomainUpdateInput)

feat(schema): [non_breaking] Type 'OrganizationStartTrialPayload' was added (OrganizationStartTrialPayload)

feat(schema): [non_breaking] Type 'Passkey' was added (Passkey)

feat(schema): [non_breaking] Type 'PasskeyLoginStartResponse' was added (PasskeyLoginStartResponse)

feat(schema): [non_breaking] Type 'SuccessPayload' was added (SuccessPayload)

feat(schema): [non_breaking] Field 'enabled' was added to object type 'AuthOrganization' (AuthOrganization.enabled)

feat(schema): [non_breaking] Field 'disableOrganizationCreation' was added to object type 'AuthOrganizationDomain' (AuthOrganizationDomain.disableOrganizationCreation)

feat(schema): [non_breaking] Field 'lockedUsers' was added to object type 'AuthResolverResponse' (AuthResolverResponse.lockedUsers)

feat(schema): [non_breaking] Field 'role' was added to object type 'AuthUser' (AuthUser.role)

feat(schema): [non_breaking] Input field 'EntityExternalLinkCreateInput.initiativeId' changed type from 'String!' to 'String' (EntityExternalLinkCreateInput.initiativeId)

feat(schema): [non_breaking] Description '[ALPHA] A facet. Facets are joins between entities. A facet can tie a custom view to a project, or a a project to a roadmap for example.' on type 'Facet' has changed to 'A facet. Facets are joins between entities. A facet can tie a custom view to a project, or a a project to a roadmap for example.' (Facet)

feat(schema): [non_breaking] Field 'orgType' was added to object type 'GitHubSettings' (GitHubSettings.orgType)

feat(schema): [non_breaking] Field 'icon' was added to object type 'Initiative' (Initiative.icon)

feat(schema): [non_breaking] Field 'status' was added to object type 'Initiative' (Initiative.status)

feat(schema): [non_breaking] Field 'gitHubImport' was added to object type 'IntegrationSettings' (IntegrationSettings.gitHubImport)

feat(schema): [non_breaking] Field 'slackCustomViewNotifications' was added to object type 'IntegrationSettings' (IntegrationSettings.slackCustomViewNotifications)

feat(schema): [non_breaking] Field 'actors' was added to object type 'IssueHistory' (IssueHistory.actors)

feat(schema): [non_breaking] Field 'IssueHistory.addedLabels' has description 'The labels that were added to the issue.' (IssueHistory.addedLabels)

feat(schema): [non_breaking] Field 'IssueHistory.removedLabels' has description 'The labels that were removed from the issue.' (IssueHistory.removedLabels)

feat(schema): [non_breaking] Field 'IssueHistory.triageResponsibilityNotifiedUsers' has description 'The users that were notified of the issue.' (IssueHistory.triageResponsibilityNotifiedUsers)

feat(schema): [non_breaking] Field 'serviceMetadata' was added to object type 'IssueImport' (IssueImport.serviceMetadata)

feat(schema): [non_breaking] Input field 'JiraConfigurationInput.project' description changed from 'The Jira project keys to scope the integration to.' to '[DEPRECATED] The Jira project keys to scope the integration to.' (JiraConfigurationInput.project)

feat(schema): [non_breaking] Field 'manualSetup' was added to object type 'JiraSettings' (JiraSettings.manualSetup)

feat(schema): [non_breaking] Field 'setupPending' was added to object type 'JiraSettings' (JiraSettings.setupPending)

feat(schema): [non_breaking] Field 'attachmentSyncToSlack' was added to object type 'Mutation' (Mutation.attachmentSyncToSlack)

feat(schema): [non_breaking] Field 'integrationGithubImportConnect' was added to object type 'Mutation' (Mutation.integrationGithubImportConnect)

feat(schema): [non_breaking] Field 'integrationSlackCustomViewNotifications' was added to object type 'Mutation' (Mutation.integrationSlackCustomViewNotifications)

feat(schema): [non_breaking] Field 'issueImportCreateLinearV2' was added to object type 'Mutation' (Mutation.issueImportCreateLinearV2)

feat(schema): [non_breaking] Field 'organizationDomainUpdate' was added to object type 'Mutation' (Mutation.organizationDomainUpdate)

feat(schema): [non_breaking] Field 'organizationStartTrial' was added to object type 'Mutation' (Mutation.organizationStartTrial)

feat(schema): [non_breaking] Field 'passkeyLoginFinish' was added to object type 'Mutation' (Mutation.passkeyLoginFinish)

feat(schema): [non_breaking] Field 'passkeyLoginStart' was added to object type 'Mutation' (Mutation.passkeyLoginStart)

feat(schema): [non_breaking] Field 'projectReassignStatus' was added to object type 'Mutation' (Mutation.projectReassignStatus)

feat(schema): [non_breaking] Field 'Mutation.apiKeyCreate' description changed from 'Creates a new API key.' to '[INTERNAL] Creates a new API key.' (Mutation.apiKeyCreate)

feat(schema): [non_breaking] Field 'Mutation.apiKeyDelete' description changed from 'Deletes an API key.' to '[INTERNAL] Deletes an API key.' (Mutation.apiKeyDelete)

feat(schema): [non_breaking] Description for argument 'githubRepoId' on field 'Mutation.issueImportCreateGithub' changed from 'ID of the Github repository from which we will import data.' to '[DEPRECATED] ID of the Github repository from which we will import data.' (Mutation.issueImportCreateGithub.githubRepoId)

feat(schema): [non_breaking] Description for argument 'githubRepoName' on field 'Mutation.issueImportCreateGithub' changed from 'GitHub repository name from which we will import data.' to '[DEPRECATED] GitHub repository name from which we will import data.' (Mutation.issueImportCreateGithub.githubRepoName)

feat(schema): [non_breaking] Type for argument 'githubRepoName' on field 'Mutation.issueImportCreateGithub' changed from 'String!' to 'String' (Mutation.issueImportCreateGithub.githubRepoName)

feat(schema): [non_breaking] Description for argument 'githubRepoOwner' on field 'Mutation.issueImportCreateGithub' changed from 'GitHub owner (user or org) for the repository from which we will import data.' to '[DEPRECATED] GitHub owner (user or org) for the repository from which we will import data.' (Mutation.issueImportCreateGithub.githubRepoOwner)

feat(schema): [non_breaking] Type for argument 'githubRepoOwner' on field 'Mutation.issueImportCreateGithub' changed from 'String!' to 'String' (Mutation.issueImportCreateGithub.githubRepoOwner)

feat(schema): [non_breaking] Description for argument 'githubToken' on field 'Mutation.issueImportCreateGithub' changed from 'GitHub token to fetch information from the GitHub API.' to '[DEPRECATED] GitHub token to fetch information from the GitHub API.' (Mutation.issueImportCreateGithub.githubToken)

feat(schema): [non_breaking] Type for argument 'githubToken' on field 'Mutation.issueImportCreateGithub' changed from 'String!' to 'String' (Mutation.issueImportCreateGithub.githubToken)

feat(schema): [non_breaking] Field 'projectUpdateReminderFrequencyInWeeks' was added to object type 'Organization' (Organization.projectUpdateReminderFrequencyInWeeks)

feat(schema): [non_breaking] Field 'Organization.trialEndsAt' description changed from 'The time at which the trial of the plus plan will end.' to 'The time at which the trial will end.' (Organization.trialEndsAt)

feat(schema): [non_breaking] Field 'disableOrganizationCreation' was added to object type 'OrganizationDomain' (OrganizationDomain.disableOrganizationCreation)

feat(schema): [non_breaking] Field 'enterpriseId' was added to object type 'SharedSlackSettings' (SharedSlackSettings.enterpriseId)

feat(schema): [non_breaking] Field 'enterpriseId' was added to object type 'SlackAsksSettings' (SlackAsksSettings.enterpriseId)

feat(schema): [non_breaking] Field 'enterpriseId' was added to object type 'SlackSettings' (SlackSettings.enterpriseId)

feat(schema): [non_breaking] Field 'textDrafts' was added to object type 'User' (User.textDrafts)

feat(schema): [non_breaking] Field 'notificationDeliveryPreferences' was added to object type 'UserSettings' (UserSettings.notificationDeliveryPreferences)