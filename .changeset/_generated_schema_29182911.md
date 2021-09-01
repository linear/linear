---
"@linear/sdk": minor
---


feat(schema): [breaking] Type 'InviteData' was removed (InviteData)

feat(schema): [breaking] Type 'InvitePagePayload' was removed (InvitePagePayload)

feat(schema): [breaking] Field 'resentOrganizationInvite' was removed from object type 'Mutation' (Mutation.resentOrganizationInvite)

feat(schema): [breaking] Input field 'webhookResourceTypes' was added to input object type 'OauthClientCreateInput' (OauthClientCreateInput.webhookResourceTypes)

feat(schema): [breaking] Field 'inviteInfo' was removed from object type 'Query' (Query.inviteInfo)

feat(schema): [breaking] Field 'Query.organizationInvite' changed type from 'IssueLabel!' to 'OrganizationInvite!' (Query.organizationInvite)

feat(schema): [dangerous] Input field 'sortOrder' was added to input object type 'IssueCreateInput' (IssueCreateInput.sortOrder)

feat(schema): [dangerous] Input field 'sortOrder' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.sortOrder)

feat(schema): [dangerous] Input field 'webhookUrl' was added to input object type 'OauthClientCreateInput' (OauthClientCreateInput.webhookUrl)

feat(schema): [dangerous] Input field 'webhookResourceTypes' was added to input object type 'OauthClientUpdateInput' (OauthClientUpdateInput.webhookResourceTypes)

feat(schema): [dangerous] Input field 'webhookUrl' was added to input object type 'OauthClientUpdateInput' (OauthClientUpdateInput.webhookUrl)

feat(schema): [dangerous] Enum value 'issueMovePromptCompleted' was added to enum 'UserFlagType' (UserFlagType.issueMovePromptCompleted)

feat(schema): [dangerous] Input field 'allPublicTeams' was added to input object type 'WebhookCreateInput' (WebhookCreateInput.allPublicTeams)

feat(schema): [non_breaking] Type 'EmailSubscribeInput' was added (EmailSubscribeInput)

feat(schema): [non_breaking] Type 'EmailSubscribePayload' was added (EmailSubscribePayload)

feat(schema): [non_breaking] Type 'IssueImportUpdateInput' was added (IssueImportUpdateInput)

feat(schema): [non_breaking] Type 'OrganizationInviteDetailsPayload' was added (OrganizationInviteDetailsPayload)

feat(schema): [non_breaking] Field 'sortOrder' was added to object type 'Issue' (Issue.sortOrder)

feat(schema): [non_breaking] Field 'Issue.boardOrder' is deprecated (Issue.boardOrder)

feat(schema): [non_breaking] Field 'Issue.boardOrder' has deprecation reason 'Will be removed in near future, please use `sortOrder` instead' (Issue.boardOrder)

feat(schema): [non_breaking] Field 'debugCreateOAuthApps' was added to object type 'Mutation' (Mutation.debugCreateOAuthApps)

feat(schema): [non_breaking] Field 'emailSubscribe' was added to object type 'Mutation' (Mutation.emailSubscribe)

feat(schema): [non_breaking] Field 'issueImportUpdate' was added to object type 'Mutation' (Mutation.issueImportUpdate)

feat(schema): [non_breaking] Field 'resendOrganizationInvite' was added to object type 'Mutation' (Mutation.resendOrganizationInvite)

feat(schema): [non_breaking] Field 'webhookResourceTypes' was added to object type 'OauthClient' (OauthClient.webhookResourceTypes)

feat(schema): [non_breaking] Field 'webhookUrl' was added to object type 'OauthClient' (OauthClient.webhookUrl)

feat(schema): [non_breaking] Field 'organizationInviteDetails' was added to object type 'Query' (Query.organizationInviteDetails)

feat(schema): [non_breaking] Field 'Team.autoArchivePeriod' description changed from 'Period after which automatically closed and completed issues are automatically archived in months. Null/undefined means disabled.' to 'Period after which automatically closed and completed issues are automatically archived in months.' (Team.autoArchivePeriod)

feat(schema): [non_breaking] Field 'Team.autoArchivePeriod' changed type from 'Float' to 'Float!' (Team.autoArchivePeriod)

feat(schema): [non_breaking] Field 'webhooksEnabled' was added to object type 'UserAuthorizedApplication' (UserAuthorizedApplication.webhooksEnabled)

feat(schema): [non_breaking] Field 'UserAuthorizedApplication.createdByLinear' description changed from 'Whether the application was created by Linear' to 'Whether the application was created by Linear.' (UserAuthorizedApplication.createdByLinear)

feat(schema): [non_breaking] Field 'Webhook.teamIds' is deprecated (Webhook.teamIds)

feat(schema): [non_breaking] Field 'Webhook.teamIds' has deprecation reason 'This field will no longer be used, and will return an empty array.' (Webhook.teamIds)

feat(schema): [non_breaking] Input field 'WebhookCreateInput.teamId' changed type from 'String!' to 'String' (WebhookCreateInput.teamId)