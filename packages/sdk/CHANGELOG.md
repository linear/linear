# Change Log

## 1.17.0

### Minor Changes

- bc39d23: feat(schema): [non_breaking] Field 'allPublicTeams' was added to object type 'Webhook' (Webhook.allPublicTeams)

  feat(schema): [non_breaking] Field 'teamIds' was added to object type 'Webhook' (Webhook.teamIds)

- bc39d23: feat(sdk): output non nullable types

## 1.16.1

### Patch Changes

- 6026ee9: Fix attachmentIssue query used for parent fields

## 1.16.0

### Minor Changes

- 1b61c0a: feat(schema): [dangerous] Input field 'clientAuthCode' was added to input object type 'EmailUserAccountAuthChallengeInput' (EmailUserAccountAuthChallengeInput.clientAuthCode)

  feat(schema): [dangerous] Input field 'snoozedById' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.snoozedById)

  feat(schema): [dangerous] Input field 'snoozedUntilAt' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.snoozedUntilAt)

  feat(schema): [non_breaking] Type 'OauthAuthStringAuthorizePayload' was added (OauthAuthStringAuthorizePayload)

  feat(schema): [non_breaking] Type 'OauthAuthStringChallengePayload' was added (OauthAuthStringChallengePayload)

  feat(schema): [non_breaking] Type 'OauthAuthStringCheckPayload' was added (OauthAuthStringCheckPayload)

  feat(schema): [non_breaking] Input field 'ApiKeyCreateInput.key' description changed from 'The API key value (format: /^[a-zA-Z0-9]{40}\$/).' to 'The API key value.' (ApiKeyCreateInput.key)

  feat(schema): [non_breaking] Field 'snoozedBy' was added to object type 'Issue' (Issue.snoozedBy)

  feat(schema): [non_breaking] Field 'snoozedUntilAt' was added to object type 'Issue' (Issue.snoozedUntilAt)

  feat(schema): [non_breaking] Field 'issueImport' was added to object type 'IssueHistory' (IssueHistory.issueImport)

  feat(schema): [non_breaking] Field 'integrationLoom' was added to object type 'Mutation' (Mutation.integrationLoom)

  feat(schema): [non_breaking] Field 'oauthAuthStringAuthorize' was added to object type 'Mutation' (Mutation.oauthAuthStringAuthorize)

  feat(schema): [non_breaking] Field 'oauthAuthStringChallenge' was added to object type 'Mutation' (Mutation.oauthAuthStringChallenge)

  feat(schema): [non_breaking] Field 'oauthAuthStringCheck' was added to object type 'Mutation' (Mutation.oauthAuthStringCheck)

  feat(schema): [non_breaking] Field 'Mutation.apiKeyCreate' description changed from 'Creates a new API key.' to '[Internal] Creates a new API key.' (Mutation.apiKeyCreate)

  feat(schema): [non_breaking] Field 'Mutation.apiKeyDelete' description changed from 'Deletes an API key.' to '[Internal] Deletes an API key.' (Mutation.apiKeyDelete)

  feat(schema): [non_breaking] Description for argument 'githubRepoName' on field 'Mutation.issueImportCreateGithub' changed from 'Github repository name from which we will import data.' to 'GitHub repository name from which we will import data.' (Mutation.issueImportCreateGithub.githubRepoName)

  feat(schema): [non_breaking] Description for argument 'githubRepoOwner' on field 'Mutation.issueImportCreateGithub' changed from 'Github owner (user or org) for the repository from which we will import data.' to 'GitHub owner (user or org) for the repository from which we will import data.' (Mutation.issueImportCreateGithub.githubRepoOwner)

  feat(schema): [non_breaking] Description for argument 'githubToken' on field 'Mutation.issueImportCreateGithub' changed from 'Github token to fetch information from the Github API.' to 'GitHub token to fetch information from the GitHub API.' (Mutation.issueImportCreateGithub.githubToken)

  feat(schema): [non_breaking] Field 'url' was added to object type 'Project' (Project.url)

  feat(schema): [non_breaking] Field 'Query.apiKeys' description changed from 'All API keys for the user.' to '[Internal] All API keys for the user.' (Query.apiKeys)

  feat(schema): [non_breaking] Field 'url' was added to object type 'User' (User.url)

- 1b61c0a: feat(schema): [dangerous] Input field 'clientAuthCode' was added to input object type 'EmailUserAccountAuthChallengeInput' (EmailUserAccountAuthChallengeInput.clientAuthCode)

  feat(schema): [dangerous] Input field 'snoozedById' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.snoozedById)

  feat(schema): [dangerous] Input field 'snoozedUntilAt' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.snoozedUntilAt)

  feat(schema): [non_breaking] Type 'OauthAuthStringAuthorizePayload' was added (OauthAuthStringAuthorizePayload)

  feat(schema): [non_breaking] Type 'OauthAuthStringChallengePayload' was added (OauthAuthStringChallengePayload)

  feat(schema): [non_breaking] Type 'OauthAuthStringCheckPayload' was added (OauthAuthStringCheckPayload)

  feat(schema): [non_breaking] Input field 'ApiKeyCreateInput.key' description changed from 'The API key value (format: /^[a-zA-Z0-9]{40}\$/).' to 'The API key value.' (ApiKeyCreateInput.key)

  feat(schema): [non_breaking] Field 'snoozedBy' was added to object type 'Issue' (Issue.snoozedBy)

  feat(schema): [non_breaking] Field 'snoozedUntilAt' was added to object type 'Issue' (Issue.snoozedUntilAt)

  feat(schema): [non_breaking] Field 'issueImport' was added to object type 'IssueHistory' (IssueHistory.issueImport)

  feat(schema): [non_breaking] Field 'integrationLoom' was added to object type 'Mutation' (Mutation.integrationLoom)

  feat(schema): [non_breaking] Field 'oauthAuthStringAuthorize' was added to object type 'Mutation' (Mutation.oauthAuthStringAuthorize)

  feat(schema): [non_breaking] Field 'oauthAuthStringChallenge' was added to object type 'Mutation' (Mutation.oauthAuthStringChallenge)

  feat(schema): [non_breaking] Field 'oauthAuthStringCheck' was added to object type 'Mutation' (Mutation.oauthAuthStringCheck)

  feat(schema): [non_breaking] Field 'Mutation.apiKeyCreate' description changed from 'Creates a new API key.' to '[Internal] Creates a new API key.' (Mutation.apiKeyCreate)

  feat(schema): [non_breaking] Field 'Mutation.apiKeyDelete' description changed from 'Deletes an API key.' to '[Internal] Deletes an API key.' (Mutation.apiKeyDelete)

  feat(schema): [non_breaking] Description for argument 'githubRepoName' on field 'Mutation.issueImportCreateGithub' changed from 'Github repository name from which we will import data.' to 'GitHub repository name from which we will import data.' (Mutation.issueImportCreateGithub.githubRepoName)

  feat(schema): [non_breaking] Description for argument 'githubRepoOwner' on field 'Mutation.issueImportCreateGithub' changed from 'Github owner (user or org) for the repository from which we will import data.' to 'GitHub owner (user or org) for the repository from which we will import data.' (Mutation.issueImportCreateGithub.githubRepoOwner)

  feat(schema): [non_breaking] Description for argument 'githubToken' on field 'Mutation.issueImportCreateGithub' changed from 'Github token to fetch information from the Github API.' to 'GitHub token to fetch information from the GitHub API.' (Mutation.issueImportCreateGithub.githubToken)

  feat(schema): [non_breaking] Field 'url' was added to object type 'Project' (Project.url)

  feat(schema): [non_breaking] Field 'Query.apiKeys' description changed from 'All API keys for the user.' to '[Internal] All API keys for the user.' (Query.apiKeys)

  feat(schema): [non_breaking] Field 'url' was added to object type 'User' (User.url)

- 1b61c0a: feat(schema): [dangerous] Input field 'clientAuthCode' was added to input object type 'EmailUserAccountAuthChallengeInput' (EmailUserAccountAuthChallengeInput.clientAuthCode)

  feat(schema): [dangerous] Input field 'snoozedById' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.snoozedById)

  feat(schema): [dangerous] Input field 'snoozedUntilAt' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.snoozedUntilAt)

  feat(schema): [non_breaking] Type 'OauthAuthStringAuthorizePayload' was added (OauthAuthStringAuthorizePayload)

  feat(schema): [non_breaking] Type 'OauthAuthStringChallengePayload' was added (OauthAuthStringChallengePayload)

  feat(schema): [non_breaking] Type 'OauthAuthStringCheckPayload' was added (OauthAuthStringCheckPayload)

  feat(schema): [non_breaking] Input field 'ApiKeyCreateInput.key' description changed from 'The API key value (format: /^[a-zA-Z0-9]{40}\$/).' to 'The API key value.' (ApiKeyCreateInput.key)

  feat(schema): [non_breaking] Field 'snoozedBy' was added to object type 'Issue' (Issue.snoozedBy)

  feat(schema): [non_breaking] Field 'snoozedUntilAt' was added to object type 'Issue' (Issue.snoozedUntilAt)

  feat(schema): [non_breaking] Field 'issueImport' was added to object type 'IssueHistory' (IssueHistory.issueImport)

  feat(schema): [non_breaking] Field 'integrationLoom' was added to object type 'Mutation' (Mutation.integrationLoom)

  feat(schema): [non_breaking] Field 'oauthAuthStringAuthorize' was added to object type 'Mutation' (Mutation.oauthAuthStringAuthorize)

  feat(schema): [non_breaking] Field 'oauthAuthStringChallenge' was added to object type 'Mutation' (Mutation.oauthAuthStringChallenge)

  feat(schema): [non_breaking] Field 'oauthAuthStringCheck' was added to object type 'Mutation' (Mutation.oauthAuthStringCheck)

  feat(schema): [non_breaking] Field 'Mutation.apiKeyCreate' description changed from 'Creates a new API key.' to '[Internal] Creates a new API key.' (Mutation.apiKeyCreate)

  feat(schema): [non_breaking] Field 'Mutation.apiKeyDelete' description changed from 'Deletes an API key.' to '[Internal] Deletes an API key.' (Mutation.apiKeyDelete)

  feat(schema): [non_breaking] Description for argument 'githubRepoName' on field 'Mutation.issueImportCreateGithub' changed from 'Github repository name from which we will import data.' to 'GitHub repository name from which we will import data.' (Mutation.issueImportCreateGithub.githubRepoName)

  feat(schema): [non_breaking] Description for argument 'githubRepoOwner' on field 'Mutation.issueImportCreateGithub' changed from 'Github owner (user or org) for the repository from which we will import data.' to 'GitHub owner (user or org) for the repository from which we will import data.' (Mutation.issueImportCreateGithub.githubRepoOwner)

  feat(schema): [non_breaking] Description for argument 'githubToken' on field 'Mutation.issueImportCreateGithub' changed from 'Github token to fetch information from the Github API.' to 'GitHub token to fetch information from the GitHub API.' (Mutation.issueImportCreateGithub.githubToken)

  feat(schema): [non_breaking] Field 'url' was added to object type 'Project' (Project.url)

  feat(schema): [non_breaking] Field 'Query.apiKeys' description changed from 'All API keys for the user.' to '[Internal] All API keys for the user.' (Query.apiKeys)

  feat(schema): [non_breaking] Field 'url' was added to object type 'User' (User.url)

- 1b61c0a: feat(schema): [dangerous] Input field 'clientAuthCode' was added to input object type 'EmailUserAccountAuthChallengeInput' (EmailUserAccountAuthChallengeInput.clientAuthCode)

  feat(schema): [dangerous] Input field 'snoozedById' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.snoozedById)

  feat(schema): [dangerous] Input field 'snoozedUntilAt' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.snoozedUntilAt)

  feat(schema): [non_breaking] Type 'OauthAuthStringAuthorizePayload' was added (OauthAuthStringAuthorizePayload)

  feat(schema): [non_breaking] Type 'OauthAuthStringChallengePayload' was added (OauthAuthStringChallengePayload)

  feat(schema): [non_breaking] Type 'OauthAuthStringCheckPayload' was added (OauthAuthStringCheckPayload)

  feat(schema): [non_breaking] Input field 'ApiKeyCreateInput.key' description changed from 'The API key value (format: /^[a-zA-Z0-9]{40}\$/).' to 'The API key value.' (ApiKeyCreateInput.key)

  feat(schema): [non_breaking] Field 'snoozedBy' was added to object type 'Issue' (Issue.snoozedBy)

  feat(schema): [non_breaking] Field 'snoozedUntilAt' was added to object type 'Issue' (Issue.snoozedUntilAt)

  feat(schema): [non_breaking] Field 'issueImport' was added to object type 'IssueHistory' (IssueHistory.issueImport)

  feat(schema): [non_breaking] Field 'integrationLoom' was added to object type 'Mutation' (Mutation.integrationLoom)

  feat(schema): [non_breaking] Field 'oauthAuthStringAuthorize' was added to object type 'Mutation' (Mutation.oauthAuthStringAuthorize)

  feat(schema): [non_breaking] Field 'oauthAuthStringChallenge' was added to object type 'Mutation' (Mutation.oauthAuthStringChallenge)

  feat(schema): [non_breaking] Field 'oauthAuthStringCheck' was added to object type 'Mutation' (Mutation.oauthAuthStringCheck)

  feat(schema): [non_breaking] Field 'Mutation.apiKeyCreate' description changed from 'Creates a new API key.' to '[Internal] Creates a new API key.' (Mutation.apiKeyCreate)

  feat(schema): [non_breaking] Field 'Mutation.apiKeyDelete' description changed from 'Deletes an API key.' to '[Internal] Deletes an API key.' (Mutation.apiKeyDelete)

  feat(schema): [non_breaking] Description for argument 'githubRepoName' on field 'Mutation.issueImportCreateGithub' changed from 'Github repository name from which we will import data.' to 'GitHub repository name from which we will import data.' (Mutation.issueImportCreateGithub.githubRepoName)

  feat(schema): [non_breaking] Description for argument 'githubRepoOwner' on field 'Mutation.issueImportCreateGithub' changed from 'Github owner (user or org) for the repository from which we will import data.' to 'GitHub owner (user or org) for the repository from which we will import data.' (Mutation.issueImportCreateGithub.githubRepoOwner)

  feat(schema): [non_breaking] Description for argument 'githubToken' on field 'Mutation.issueImportCreateGithub' changed from 'Github token to fetch information from the Github API.' to 'GitHub token to fetch information from the GitHub API.' (Mutation.issueImportCreateGithub.githubToken)

  feat(schema): [non_breaking] Field 'url' was added to object type 'Project' (Project.url)

  feat(schema): [non_breaking] Field 'Query.apiKeys' description changed from 'All API keys for the user.' to '[Internal] All API keys for the user.' (Query.apiKeys)

  feat(schema): [non_breaking] Field 'url' was added to object type 'User' (User.url)

- 1b61c0a: feat(schema): [dangerous] Input field 'snoozedById' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.snoozedById)

  feat(schema): [dangerous] Input field 'snoozedUntilAt' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.snoozedUntilAt)

  feat(schema): [non_breaking] Field 'snoozedBy' was added to object type 'Issue' (Issue.snoozedBy)

  feat(schema): [non_breaking] Field 'snoozedUntilAt' was added to object type 'Issue' (Issue.snoozedUntilAt)

- 1b61c0a: feat(schema): [dangerous] Input field 'clientAuthCode' was added to input object type 'EmailUserAccountAuthChallengeInput' (EmailUserAccountAuthChallengeInput.clientAuthCode)

  feat(schema): [dangerous] Input field 'snoozedById' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.snoozedById)

  feat(schema): [dangerous] Input field 'snoozedUntilAt' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.snoozedUntilAt)

  feat(schema): [non_breaking] Type 'OauthAuthStringAuthorizePayload' was added (OauthAuthStringAuthorizePayload)

  feat(schema): [non_breaking] Type 'OauthAuthStringChallengePayload' was added (OauthAuthStringChallengePayload)

  feat(schema): [non_breaking] Type 'OauthAuthStringCheckPayload' was added (OauthAuthStringCheckPayload)

  feat(schema): [non_breaking] Input field 'ApiKeyCreateInput.key' description changed from 'The API key value (format: /^[a-zA-Z0-9]{40}\$/).' to 'The API key value.' (ApiKeyCreateInput.key)

  feat(schema): [non_breaking] Field 'snoozedBy' was added to object type 'Issue' (Issue.snoozedBy)

  feat(schema): [non_breaking] Field 'snoozedUntilAt' was added to object type 'Issue' (Issue.snoozedUntilAt)

  feat(schema): [non_breaking] Field 'issueImport' was added to object type 'IssueHistory' (IssueHistory.issueImport)

  feat(schema): [non_breaking] Field 'integrationLoom' was added to object type 'Mutation' (Mutation.integrationLoom)

  feat(schema): [non_breaking] Field 'oauthAuthStringAuthorize' was added to object type 'Mutation' (Mutation.oauthAuthStringAuthorize)

  feat(schema): [non_breaking] Field 'oauthAuthStringChallenge' was added to object type 'Mutation' (Mutation.oauthAuthStringChallenge)

  feat(schema): [non_breaking] Field 'oauthAuthStringCheck' was added to object type 'Mutation' (Mutation.oauthAuthStringCheck)

  feat(schema): [non_breaking] Field 'Mutation.apiKeyCreate' description changed from 'Creates a new API key.' to '[Internal] Creates a new API key.' (Mutation.apiKeyCreate)

  feat(schema): [non_breaking] Field 'Mutation.apiKeyDelete' description changed from 'Deletes an API key.' to '[Internal] Deletes an API key.' (Mutation.apiKeyDelete)

  feat(schema): [non_breaking] Description for argument 'githubRepoName' on field 'Mutation.issueImportCreateGithub' changed from 'Github repository name from which we will import data.' to 'GitHub repository name from which we will import data.' (Mutation.issueImportCreateGithub.githubRepoName)

  feat(schema): [non_breaking] Description for argument 'githubRepoOwner' on field 'Mutation.issueImportCreateGithub' changed from 'Github owner (user or org) for the repository from which we will import data.' to 'GitHub owner (user or org) for the repository from which we will import data.' (Mutation.issueImportCreateGithub.githubRepoOwner)

  feat(schema): [non_breaking] Description for argument 'githubToken' on field 'Mutation.issueImportCreateGithub' changed from 'Github token to fetch information from the Github API.' to 'GitHub token to fetch information from the GitHub API.' (Mutation.issueImportCreateGithub.githubToken)

  feat(schema): [non_breaking] Field 'url' was added to object type 'Project' (Project.url)

  feat(schema): [non_breaking] Field 'Query.apiKeys' description changed from 'All API keys for the user.' to '[Internal] All API keys for the user.' (Query.apiKeys)

  feat(schema): [non_breaking] Field 'url' was added to object type 'User' (User.url)

- aa42eec: feat(schema): [breaking] Field 'teamArchive' was removed from object type 'Mutation' (Mutation.teamArchive)

  feat(schema): [dangerous] Argument 'title: String' added to field 'Mutation.attachmentLinkURL' (Mutation.attachmentLinkURL.title)

  feat(schema): [dangerous] Argument 'newVersion: Boolean' added to field 'Query.syncBootstrap' (Query.syncBootstrap.newVersion)

  feat(schema): [non_breaking] Type 'IntercomSettings' was added (IntercomSettings)

  feat(schema): [non_breaking] Type 'IntercomSettingsInput' was added (IntercomSettingsInput)

  feat(schema): [non_breaking] Field 'progress' was added to object type 'Cycle' (Cycle.progress)

  feat(schema): [non_breaking] Field 'intercom' was added to object type 'IntegrationSettings' (IntegrationSettings.intercom)

  feat(schema): [non_breaking] Field 'trashed' was added to object type 'IssueHistory' (IssueHistory.trashed)

  feat(schema): [non_breaking] Field 'integrationIntercomSettingsUpdate' was added to object type 'Mutation' (Mutation.integrationIntercomSettingsUpdate)

  feat(schema): [non_breaking] Description for argument 'url' on field 'Mutation.attachmentLinkURL' changed from 'The Zendesk ticket ID to link.' to 'The url to link.' (Mutation.attachmentLinkURL.url)

  feat(schema): [non_breaking] Field 'progress' was added to object type 'Project' (Project.progress)

## 1.15.0

### Minor Changes

- 8c7fb4b: feat(schema): [non_breaking] Field 'attachmentLinkIntercom' was added to object type 'Mutation' (Mutation.attachmentLinkIntercom)

  feat(schema): [non_breaking] Field 'integrationIntercomDelete' was added to object type 'Mutation' (Mutation.integrationIntercomDelete)

  feat(schema): [non_breaking] Description for argument 'issueId' on field 'Mutation.attachmentLinkFront' changed from 'The issue for which to link the .' to 'The issue for which to link the Front conversation.' (Mutation.attachmentLinkFront.issueId)

  feat(schema): [non_breaking] Description for argument 'issueId' on field 'Mutation.attachmentLinkZendesk' changed from 'The issue for which to link the .' to 'The issue for which to link the Zendesk ticket.' (Mutation.attachmentLinkZendesk.issueId)

- 207353d: feat(schema): [non_breaking] Input field 'IssueUpdateInput.trashed' description changed from '[Deprecated] Wether the issue has been trashed.' to 'Wether the issue has been trashed.' (IssueUpdateInput.trashed)
- 94af540: feat(schema): [breaking] Type 'FileUpload' was removed (FileUpload)

  feat(schema): [dangerous] Input field 'iconUrl' was added to input object type 'AttachmentCreateInput' (AttachmentCreateInput.iconUrl)

  feat(schema): [dangerous] Input field 'iconUrl' was added to input object type 'AttachmentUpdateInput' (AttachmentUpdateInput.iconUrl)

  feat(schema): [dangerous] Input field 'snoozedUntilAt' was added to input object type 'NotificationUpdateInput' (NotificationUpdateInput.snoozedUntilAt)

  feat(schema): [dangerous] Input field 'canceledAt' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.canceledAt)

  feat(schema): [dangerous] Input field 'completedAt' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.completedAt)

  feat(schema): [dangerous] Input field 'triageEnabled' was added to input object type 'TeamCreateInput' (TeamCreateInput.triageEnabled)

  feat(schema): [dangerous] Input field 'defaultIssueStateId' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.defaultIssueStateId)

  feat(schema): [dangerous] Input field 'triageEnabled' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.triageEnabled)

  feat(schema): [dangerous] Enum value 'triageWelcomeDismissed' was added to enum 'UserFlagType' (UserFlagType.triageWelcomeDismissed)

  feat(schema): [dangerous] Enum value 'triage' was added to enum 'ViewType' (ViewType.triage)

  feat(schema): [non_breaking] Field 'attachmentLinkURL' was added to object type 'Mutation' (Mutation.attachmentLinkURL)

  feat(schema): [non_breaking] Field 'snoozedUntilAt' was added to object type 'Notification' (Notification.snoozedUntilAt)

  feat(schema): [non_breaking] Field 'defaultIssueState' was added to object type 'Team' (Team.defaultIssueState)

  feat(schema): [non_breaking] Field 'issueOrderingNoPriorityFirst' was added to object type 'Team' (Team.issueOrderingNoPriorityFirst)

  feat(schema): [non_breaking] Field 'triageEnabled' was added to object type 'Team' (Team.triageEnabled)

  feat(schema): [non_breaking] Field 'triageIssueState' was added to object type 'Team' (Team.triageIssueState)

  feat(schema): [non_breaking] Field 'Team.private' description changed from 'Internal. Whether the team is private or not.' to 'Whether the team is private or not.' (Team.private)

  feat(schema): [non_breaking] Input field 'TeamUpdateInput.private' description changed from 'Internal. Whether the team is private or not.' to 'Whether the team is private or not.' (TeamUpdateInput.private)

- 94af540: Remove fields marked with Internal comment

### Patch Changes

- 7f054e3: chore(deps): update dependency patch versions

## 1.14.0

### Minor Changes

- fd2915c: feat(schema): [breaking] Argument 'databaseVersion: Int' was removed from field 'Query.syncBootstrap' (Query.syncBootstrap.databaseVersion)

  feat(schema): [breaking] Argument 'sinceSyncId: Int' was removed from field 'Query.syncBootstrap' (Query.syncBootstrap.sinceSyncId)

  feat(schema): [dangerous] Argument 'includeDisabled: Boolean' added to field 'Issue.subscribers' (Issue.subscribers.includeDisabled)

  feat(schema): [dangerous] Input field 'publicEnabled' was added to input object type 'OauthClientCreateInput' (OauthClientCreateInput.publicEnabled)

  feat(schema): [dangerous] Argument 'includeDisabled: Boolean' added to field 'Organization.users' (Organization.users.includeDisabled)

  feat(schema): [dangerous] Argument 'includeDisabled: Boolean' added to field 'Project.members' (Project.members.includeDisabled)

  feat(schema): [dangerous] Argument 'onlyModels: [String!]' added to field 'Query.syncBootstrap' (Query.syncBootstrap.onlyModels)

  feat(schema): [dangerous] Argument 'includeDisabled: Boolean' added to field 'Query.users' (Query.users.includeDisabled)

  feat(schema): [dangerous] Argument 'includeDisabled: Boolean' added to field 'Team.members' (Team.members.includeDisabled)

  feat(schema): [dangerous] Input field 'issueOrderingNoPriorityFirst' was added to input object type 'TeamCreateInput' (TeamCreateInput.issueOrderingNoPriorityFirst)

  feat(schema): [dangerous] Input field 'issueOrderingNoPriorityFirst' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.issueOrderingNoPriorityFirst)

  feat(schema): [dangerous] Enum value 'dueDateShortcutMigration' was added to enum 'UserFlagType' (UserFlagType.dueDateShortcutMigration)

  feat(schema): [dangerous] Enum value 'importBannerDismissed' was added to enum 'UserFlagType' (UserFlagType.importBannerDismissed)

  feat(schema): [non_breaking] Type 'OrganizationCancelDeletePayload' was added (OrganizationCancelDeletePayload)

  feat(schema): [non_breaking] Type 'SearchResultPayload' was added (SearchResultPayload)

  feat(schema): [non_breaking] Type 'SyncDeltaResponse' was added (SyncDeltaResponse)

  feat(schema): [non_breaking] Field 'Attachment.url' description changed from 'Location of the attachment which is also used as an identifier. Attachment URLs are unique and calls to create a new attachment are idempotent with the URL.' to 'Location of the attachment which is also used as an identifier.' (Attachment.url)

  feat(schema): [non_breaking] Field 'lastUsedOrganizationId' was added to object type 'AuthResolverResponse' (AuthResolverResponse.lastUsedOrganizationId)

  feat(schema): [non_breaking] Field 'attachmentLinkFront' was added to object type 'Mutation' (Mutation.attachmentLinkFront)

  feat(schema): [non_breaking] Field 'integrationFront' was added to object type 'Mutation' (Mutation.integrationFront)

  feat(schema): [non_breaking] Field 'integrationIntercom' was added to object type 'Mutation' (Mutation.integrationIntercom)

  feat(schema): [non_breaking] Field 'organizationCancelDelete' was added to object type 'Mutation' (Mutation.organizationCancelDelete)

  feat(schema): [non_breaking] Field 'teamKeyDelete' was added to object type 'Mutation' (Mutation.teamKeyDelete)

  feat(schema): [non_breaking] Field 'Mutation.attachmentCreate' description changed from '[Alpha] Creates a new attachment, or updates existing if the same `uri` is used.' to '[Alpha] Creates a new attachment, or updates existing if the same `url` and `issueId` is used.' (Mutation.attachmentCreate)

  feat(schema): [non_breaking] Description for argument 'id' on field 'Mutation.attachmentUpdate' changed from 'The identifier of the comment to update.' to 'The identifier of the attachment to update.' (Mutation.attachmentUpdate.id)

  feat(schema): [non_breaking] Field 'deletionRequestedAt' was added to object type 'Organization' (Organization.deletionRequestedAt)

  feat(schema): [non_breaking] Field 'attachmentsForURL' was added to object type 'Query' (Query.attachmentsForURL)

  feat(schema): [non_breaking] Field 'search' was added to object type 'Query' (Query.search)

  feat(schema): [non_breaking] Field 'syncDelta' was added to object type 'Query' (Query.syncDelta)

  feat(schema): [non_breaking] Field 'Query.attachment' description changed from '[Alpha] One specific issue attachment. `url` can be used as the `id` parameter.' to '[Alpha] One specific issue attachment.
  [Deprecated] 'url' can no longer be used as the 'id' parameter. Use 'attachmentsForUrl' instead' (Query.attachment)

  feat(schema): [non_breaking] Field 'Query.attachmentIssue' description changed from '[Alpha] Query an issue by its associated attachment, and its id or URI.' to '[Alpha] Query an issue by its associated attachment, and its id.' (Query.attachmentIssue)

  feat(schema): [non_breaking] Field 'Query.attachmentIssue' is deprecated (Query.attachmentIssue)

  feat(schema): [non_breaking] Field 'Query.attachmentIssue' has deprecation reason 'Will be removed in near future, please use `attachmentsForURL` to get attachments and their issues instead.' (Query.attachmentIssue)

  feat(schema): [non_breaking] Description for argument 'id' on field 'Query.attachmentIssue' changed from '`id` or `url` of the attachment for which you'll want to get the issue for.' to '`id` of the attachment for which you'll want to get the issue for. [Deprecated] `url` as the `id` parameter.' (Query.attachmentIssue.id)

  feat(schema): [non_breaking] Field 'Query.attachments' description changed from '[Alpha] All issue attachments.' to '[Alpha] All issue attachments.

  To get attachments for a given URL, use `attachmentsForURL` query.' (Query.attachments)

  feat(schema): [non_breaking] Description for argument 'syncGroups' on field 'Query.syncBootstrap' changed from 'If defined, only entities for the given sync groups will be loaded' to 'If defined, only models for the given sync groups will be loaded.' (Query.syncBootstrap.syncGroups)

  feat(schema): [non_breaking] Field 'User.active' description changed from 'Whether the user account is active or disabled.' to 'Whether the user account is active or disabled (suspended).' (User.active)

  feat(schema): [non_breaking] Field 'createdByLinear' was added to object type 'UserAuthorizedApplication' (UserAuthorizedApplication.createdByLinear)

### Patch Changes

- fd2915c: fix(query): do not match queries unless all required args are present in the response object

## 1.13.0

### Minor Changes

- 8553690: feat(schema): [dangerous] Input field 'trashed' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.trashed)

  feat(schema): [dangerous] Input field 'publicEnabled' was added to input object type 'OauthClientUpdateInput' (OauthClientUpdateInput.publicEnabled)

  feat(schema): [non_breaking] Field 'customerTicketCount' was added to object type 'Issue' (Issue.customerTicketCount)

  feat(schema): [non_breaking] Field 'issueDelete' was added to object type 'Mutation' (Mutation.issueDelete)

  feat(schema): [non_breaking] Field 'publicEnabled' was added to object type 'OauthClient' (OauthClient.publicEnabled)

  feat(schema): [non_breaking] Field 'nextBillingAt' was added to object type 'Subscription' (Subscription.nextBillingAt)

### Patch Changes

- 56c1a6c: chore(deps): update dependency patch versions
- df71ee5: Fix typescript type check

## 1.12.1

### Patch Changes

- e3c045c: chore(deps): update dependency patch versions

## 1.12.0

### Minor Changes

- 8533968: feat(schema): [breaking] Field 'Invoice.created' changed type from 'TimelessDateScalar!' to 'DateTime!' (Invoice.created)

  feat(schema): [non_breaking] Type 'DependencyResponse' was added (DependencyResponse)

  feat(schema): [non_breaking] Field 'dependentModelSync' was added to object type 'Query' (Query.dependentModelSync)

  feat(schema): [non_breaking] Field 'Query.archivedModelSync' description changed from 'Fetches an archived model.' to '[Internal] Fetches an archived model.' (Query.archivedModelSync)

  feat(schema): [non_breaking] Field 'Query.archivedModelsSync' description changed from 'Fetches archived models.' to '[Internal] Fetches archived models.' (Query.archivedModelsSync)

  feat(schema): [non_breaking] Field 'Query.syncBootstrap' description changed from 'Fetch data to catch up the client to the state of the world.' to '[Internal] Fetch data to catch up the client to the state of the world.' (Query.syncBootstrap)

## 1.11.0

### Minor Changes

- 19a8db2: feat(schema): [non_breaking] Input field 'TeamCreateInput.key' description changed from 'The key of the team. If not given, rc key will be generated based on the name of the team.' to 'The key of the team. If not given, the key will be generated based on the name of the team.' (TeamCreateInput.key)
- b3d86d1: feat(schema): [breaking] Field 'IssueHistory.relationChanges' changed type from 'String' to '[IssueRelationHistoryPayload!]' (IssueHistory.relationChanges)

  feat(schema): [breaking] Field 'Query.pushSubscriptionTest' changed type from 'PushSubscriptionPayload!' to 'PushSubscriptionTestPayload!' (Query.pushSubscriptionTest)

  feat(schema): [dangerous] Argument 'id: String' added to field 'Mutation.issueImportCreateAsana' (Mutation.issueImportCreateAsana.id)

  feat(schema): [dangerous] Argument 'id: String' added to field 'Mutation.issueImportCreateClubhouse' (Mutation.issueImportCreateClubhouse.id)

  feat(schema): [dangerous] Argument 'id: String' added to field 'Mutation.issueImportCreateGithub' (Mutation.issueImportCreateGithub.id)

  feat(schema): [dangerous] Argument 'id: String' added to field 'Mutation.issueImportCreateJira' (Mutation.issueImportCreateJira.id)

  feat(schema): [dangerous] Input field 'startDate' was added to input object type 'ProjectCreateInput' (ProjectCreateInput.startDate)

  feat(schema): [dangerous] Input field 'startDate' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.startDate)

  feat(schema): [non_breaking] Type 'IssueDescriptionHistory' was added (IssueDescriptionHistory)

  feat(schema): [non_breaking] Type 'IssueDescriptionHistoryPayload' was added (IssueDescriptionHistoryPayload)

  feat(schema): [non_breaking] Type 'IssueRelationHistoryPayload' was added (IssueRelationHistoryPayload)

  feat(schema): [non_breaking] Type 'PushSubscriptionTestPayload' was added (PushSubscriptionTestPayload)

  feat(schema): [non_breaking] Field 'autoArchivedAt' was added to object type 'Cycle' (Cycle.autoArchivedAt)

  feat(schema): [non_breaking] Field 'attachmentDelete' was added to object type 'Mutation' (Mutation.attachmentDelete)

  feat(schema): [non_breaking] Field 'attachmentLinkZendesk' was added to object type 'Mutation' (Mutation.attachmentLinkZendesk)

  feat(schema): [non_breaking] Field 'projectUnarchive' was added to object type 'Mutation' (Mutation.projectUnarchive)

  feat(schema): [non_breaking] Field 'Mutation.attachmentArchive' description changed from '[Alpha] Archives an issue attachment.' to '[DEPRECATED] Archives an issue attachment.' (Mutation.attachmentArchive)

  feat(schema): [non_breaking] Field 'Mutation.attachmentArchive' is deprecated (Mutation.attachmentArchive)

  feat(schema): [non_breaking] Field 'Mutation.attachmentArchive' has deprecation reason 'This mutation is deprecated, please use `attachmentDelete` instead' (Mutation.attachmentArchive)

  feat(schema): [non_breaking] Description for argument 'id' on field 'Mutation.attachmentArchive' changed from 'The identifier of the attachment to delete.' to 'The identifier of the attachment to archive.' (Mutation.attachmentArchive.id)

  feat(schema): [non_breaking] Field 'autoArchivedAt' was added to object type 'Project' (Project.autoArchivedAt)

  feat(schema): [non_breaking] Field 'startDate' was added to object type 'Project' (Project.startDate)

  feat(schema): [non_breaking] Field 'issueDescriptionHistory' was added to object type 'Query' (Query.issueDescriptionHistory)

### Patch Changes

- 387ff7f: chore(deps): update dependency patch versions

## 1.10.0

### Minor Changes

- 97809f0: feat(schema): [breaking] Field 'notificationDelete' was removed from object type 'Mutation' (Mutation.notificationDelete)

## 1.9.0

### Minor Changes

- 7a42d64: feat(schema): [breaking] Type 'OAuthTokenPayload' was removed (OAuthTokenPayload)
  feat(schema): [breaking] Field 'Query.issueImportFinishGithubOAuth' changed type from 'OAuthTokenPayload!' to 'GithubOAuthTokenPayload!' (Query.issueImportFinishGithubOAuth)
  feat(schema): [dangerous] Argument 'instantProcess: Boolean' added to field 'Mutation.issueImportCreateAsana' (Mutation.issueImportCreateAsana.instantProcess)
  feat(schema): [dangerous] Argument 'instantProcess: Boolean' added to field 'Mutation.issueImportCreateClubhouse' (Mutation.issueImportCreateClubhouse.instantProcess)
  feat(schema): [dangerous] Argument 'instantProcess: Boolean' added to field 'Mutation.issueImportCreateGithub' (Mutation.issueImportCreateGithub.instantProcess)
  feat(schema): [dangerous] Argument 'instantProcess: Boolean' added to field 'Mutation.issueImportCreateJira' (Mutation.issueImportCreateJira.instantProcess)
  feat(schema): [dangerous] Input field 'userId' was added to input object type 'ViewPreferencesCreateInput' (ViewPreferencesCreateInput.userId)
  feat(schema): [dangerous] Enum value 'userProfile' was added to enum 'ViewType' (ViewType.userProfile)
  feat(schema): [non_breaking] Type 'GithubOAuthTokenPayload' was added (GithubOAuthTokenPayload)
  feat(schema): [non_breaking] Type 'IssueImportMappingInput' was added (IssueImportMappingInput)
  feat(schema): [non_breaking] Field 'GithubOrg.id' description changed from 'GitHub org's id.' to 'GitHub organization id.' (GithubOrg.id)
  feat(schema): [non_breaking] Field 'GithubOrg.login' description changed from 'The login for the GitHub org.' to 'The login for the GitHub organization.' (GithubOrg.login)
  feat(schema): [non_breaking] Field 'GithubOrg.name' description changed from 'The name of the GitHub org.' to 'The name of the GitHub organization.' (GithubOrg.name)
  feat(schema): [non_breaking] Field 'GithubOrg.repositories' description changed from 'Repositories that the org owns.' to 'Repositories that the organization owns.' (GithubOrg.repositories)
  feat(schema): [non_breaking] Field 'mapping' was added to object type 'IssueImport' (IssueImport.mapping)
  feat(schema): [non_breaking] Field 'issueImportProcess' was added to object type 'Mutation' (Mutation.issueImportProcess)
  feat(schema): [non_breaking] Description 'How trashed issues should be loaded.' on type 'TrashOptionType' has changed to 'How trashed models should be loaded.' (TrashOptionType)
- 4976448: Change TimelessDateScalar from Date to string type

## 1.8.4

### Patch Changes

- 7e70161: fix(client): fix custom client headers and add test

## 1.8.3

### Patch Changes

- 7bf0153: chore(release): use npm token from secrets

## 1.8.2

### Patch Changes

- 111595f: chore(publish): use changeset access public

## 1.8.1

### Patch Changes

- 867d226: chore(release): bump changeset
- 80561d9: chore(release): fix release environment

## 1.8.0

### Minor Changes

- 302b0e2: feat(sdk): update schema

### Patch Changes

- 47cdc52: chore(test): add jest fake timers
- f384cdb: Bump changeset

## 1.7.0

### Minor Changes

- 8875ff0: Remove graphql-request dependency

## 1.6.5

### Patch Changes

- f937b3c: Replace process.env for umd builds

## 1.6.4

### Patch Changes

- 021c972: Add umd output for sdk

## 1.6.3

### Patch Changes

- 66d320b: Update readme

## 1.6.2

### Patch Changes

- a92d49c: Add mutation models to readme

## 1.6.1

### Patch Changes

- bf7fed1: Add import issue delete

## 1.6.0

### Minor Changes

- bcec326: Add mutations to models

### Patch Changes

- 104f54f: Update to master

## 1.5.3

### Patch Changes

- Update readmes

## 1.5.2

### Patch Changes

- Update import from deprecated repo

## 1.5.1

### Patch Changes

- Update custom scalars to use non-any types

## 1.5.0

### Minor Changes

- Update schema to add attachments
  Fix query discovery to use matching name if available
  Add date and json parsing
  Add tests for parsing

## 1.4.6

### Patch Changes

- Update schema adding attachments

## 1.4.5

### Patch Changes

- Add link from auth error to api settings

## 1.4.4

### Patch Changes

- Update dependencies for tsc resolution

## 1.4.3

### Patch Changes

- Package dependencies with build output

## 1.4.2

### Patch Changes

- Bump packages

## 1.4.1

### Patch Changes

- Add changeset

## 1.4.0

### Minor Changes

- a24f725: Test release action

### Patch Changes

- 25e40c8: Test bump
- b36cd12: Test changeset action
- bc1394a: Remove local dependency
- ab58795: Test bump

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.3.1](https://github.com/linear/linear/compare/v1.3.0...v1.3.1) (2021-02-15)

**Note:** Version bump only for package @linear/sdk

# 1.3.0 (2021-02-15)

### Bug Fixes

- **error:** split error into many constructors ([9a68e93](https://github.com/linear/linear/commit/9a68e93aeb8d2a41e91a054ca2648d788fc1583e))
- **sdk:** apply parent variables to nested sdk queries ([3458ebf](https://github.com/linear/linear/commit/3458ebf5cee10066bbe93f0af1d0fe718d971ac9))
- **sdk:** remove get from connection helpers ([ae48d89](https://github.com/linear/linear/commit/ae48d89e80be1fafe4a4d94022eb71a1b365ff4d))

### Features

- **schema:** update schema ([2b4e044](https://github.com/linear/linear/commit/2b4e0448bc8996c25cfa185ece6c5efe1ee20ca9))
- **schema:** update schema ([7ba67e1](https://github.com/linear/linear/commit/7ba67e16654623cc5b352a2dcf9d6df8758f0a15))
- **sdk:** merge client and sdk packages ([ba1dcf5](https://github.com/linear/linear/commit/ba1dcf5b93c719ab5676e73260744ef727a9dcdb))

## [1.1.5](https://github.com/linear/linear/compare/@linear/sdk@1.1.4...@linear/sdk@1.1.5) (2021-02-12)

**Note:** Version bump only for package @linear/sdk

## [1.1.4](https://github.com/linear/linear/compare/@linear/sdk@1.1.3...@linear/sdk@1.1.4) (2021-02-12)

**Note:** Version bump only for package @linear/sdk

## [1.1.3](https://github.com/linear/linear/compare/@linear/sdk@1.1.2...@linear/sdk@1.1.3) (2021-02-12)

**Note:** Version bump only for package @linear/sdk

## [1.1.2](https://github.com/linear/linear/compare/@linear/sdk@1.1.0...@linear/sdk@1.1.2) (2021-02-12)

**Note:** Version bump only for package @linear/sdk

# 1.1.0 (2021-02-12)

### Bug Fixes

- **error:** split error into many constructors ([9a68e93](https://github.com/linear/linear/commit/9a68e93aeb8d2a41e91a054ca2648d788fc1583e))
- **sdk:** apply parent variables to nested sdk queries ([3458ebf](https://github.com/linear/linear/commit/3458ebf5cee10066bbe93f0af1d0fe718d971ac9))
- **sdk:** remove get from connection helpers ([ae48d89](https://github.com/linear/linear/commit/ae48d89e80be1fafe4a4d94022eb71a1b365ff4d))

### Features

- **schema:** update schema ([7ba67e1](https://github.com/linear/linear/commit/7ba67e16654623cc5b352a2dcf9d6df8758f0a15))
