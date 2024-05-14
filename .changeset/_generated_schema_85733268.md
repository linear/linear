---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'documentReminder' was removed from object type 'Mutation' (Mutation.documentReminder)

feat(schema): [breaking] Field 'Reminder.remindAt' changed type from 'DateTime!' to 'DateTime' (Reminder.remindAt)

feat(schema): [dangerous] Enum value 'email' was added to enum 'IntegrationService' (IntegrationService.email)

feat(schema): [dangerous] Input field 'needsManualSetup' was added to input object type 'JiraSettingsInput' (JiraSettingsInput.needsManualSetup)

feat(schema): [dangerous] Input field 'deleteWebhook' was added to input object type 'JiraUpdateInput' (JiraUpdateInput.deleteWebhook)

feat(schema): [dangerous] Input field 'webhookSecret' was added to input object type 'JiraUpdateInput' (JiraUpdateInput.webhookSecret)

feat(schema): [dangerous] Argument 'githubRepoId: String' added to field 'Mutation.issueImportCreateGithub' (Mutation.issueImportCreateGithub.githubRepoId)

feat(schema): [dangerous] Input field 'initiativeId' was added to input object type 'NotificationEntityInput' (NotificationEntityInput.initiativeId)

feat(schema): [non_breaking] Type 'InitiativeNotification' was added (InitiativeNotification)

feat(schema): [non_breaking] Type 'IssueImportSyncCheckPayload' was added (IssueImportSyncCheckPayload)

feat(schema): [non_breaking] Type 'OrganizationMeta' was added (OrganizationMeta)

feat(schema): [non_breaking] Type 'ProjectDetailSuggestionInput' was added (ProjectDetailSuggestionInput)

feat(schema): [non_breaking] Type 'ProjectDetailSuggestionPayload' was added (ProjectDetailSuggestionPayload)

feat(schema): [non_breaking] Type 'TextDraft' was added (TextDraft)

feat(schema): [non_breaking] Field 'webhookResourceTypes' was added to object type 'AuthOauthClient' (AuthOauthClient.webhookResourceTypes)

feat(schema): [non_breaking] Field 'webhookSecret' was added to object type 'AuthOauthClient' (AuthOauthClient.webhookSecret)

feat(schema): [non_breaking] Field 'projects' was added to object type 'CustomView' (CustomView.projects)

feat(schema): [non_breaking] Field 'needsManualSetup' was added to object type 'JiraSettings' (JiraSettings.needsManualSetup)

feat(schema): [non_breaking] Field 'issueImportCheckSync' was added to object type 'Query' (Query.issueImportCheckSync)

feat(schema): [non_breaking] Field 'organizationMeta' was added to object type 'Query' (Query.organizationMeta)

feat(schema): [non_breaking] Field 'projectDetailsSuggestion' was added to object type 'Query' (Query.projectDetailsSuggestion)

feat(schema): [non_breaking] Field 'schedule' was added to object type 'Reminder' (Reminder.schedule)

feat(schema): [non_breaking] Field 'Reminder.remindAt' description changed from 'The time when a reminder triggers a notification in users inbox.' to 'The time when a reminder triggers a notification in the user's inbox.' (Reminder.remindAt)