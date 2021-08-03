---
"@linear/sdk": minor
---


feat(schema): [dangerous] Input field 'clientAuthCode' was added to input object type 'EmailUserAccountAuthChallengeInput' (EmailUserAccountAuthChallengeInput.clientAuthCode)

feat(schema): [dangerous] Input field 'snoozedById' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.snoozedById)

feat(schema): [dangerous] Input field 'snoozedUntilAt' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.snoozedUntilAt)

feat(schema): [non_breaking] Type 'OauthAuthStringAuthorizePayload' was added (OauthAuthStringAuthorizePayload)

feat(schema): [non_breaking] Type 'OauthAuthStringChallengePayload' was added (OauthAuthStringChallengePayload)

feat(schema): [non_breaking] Type 'OauthAuthStringCheckPayload' was added (OauthAuthStringCheckPayload)

feat(schema): [non_breaking] Input field 'ApiKeyCreateInput.key' description changed from 'The API key value (format: /^[a-zA-Z0-9]{40}$/).' to 'The API key value.' (ApiKeyCreateInput.key)

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