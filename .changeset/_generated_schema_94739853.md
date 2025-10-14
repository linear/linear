---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'AppUserAuthentication' was removed (AppUserAuthentication)

feat(schema): [breaking] Type 'AuthorizingUser' was removed (AuthorizingUser)

feat(schema): [breaking] Type 'SummaryPayload' was removed (SummaryPayload)

feat(schema): [breaking] Type 'UserAuthorizedApplication' was removed (UserAuthorizedApplication)

feat(schema): [breaking] Field 'applicationWithAuthorization' was removed from object type 'Query' (Query.applicationWithAuthorization)

feat(schema): [breaking] Field 'summarizeProjectUpdates' was removed from object type 'Query' (Query.summarizeProjectUpdates)

feat(schema): [breaking] Argument 'type: IdentityProviderType!' added to field 'Query.ssoUrlFromEmail' (Query.ssoUrlFromEmail.type)

feat(schema): [dangerous] Input field 'url' was added to input object type 'ContactSalesCreateInput' (ContactSalesCreateInput.url)

feat(schema): [dangerous] Input field 'issueId' was added to input object type 'DocumentCreateInput' (DocumentCreateInput.issueId)

feat(schema): [dangerous] Input field 'issue' was added to input object type 'DocumentFilter' (DocumentFilter.issue)

feat(schema): [dangerous] Input field 'issueId' was added to input object type 'DocumentUpdateInput' (DocumentUpdateInput.issueId)

feat(schema): [dangerous] Input field 'hasSuggestedTeams' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.hasSuggestedTeams)

feat(schema): [dangerous] Input field 'hasSuggestedTeams' was added to input object type 'IssueFilter' (IssueFilter.hasSuggestedTeams)

feat(schema): [dangerous] Input field 'retiredAt' was added to input object type 'IssueLabelCreateInput' (IssueLabelCreateInput.retiredAt)

feat(schema): [dangerous] Input field 'retiredAt' was added to input object type 'IssueLabelUpdateInput' (IssueLabelUpdateInput.retiredAt)

feat(schema): [dangerous] Input field 'noSecret' was added to input object type 'JiraUpdateInput' (JiraUpdateInput.noSecret)

feat(schema): [dangerous] Argument 'skipEditedAt: Boolean' added to field 'Mutation.commentUpdate' (Mutation.commentUpdate.skipEditedAt)

feat(schema): [dangerous] Input field 'hasSuggestedTeams' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.hasSuggestedTeams)

feat(schema): [dangerous] Input field 'generatedUpdatesEnabled' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.generatedUpdatesEnabled)

feat(schema): [dangerous] Input field 'retiredAt' was added to input object type 'ProjectLabelCreateInput' (ProjectLabelCreateInput.retiredAt)

feat(schema): [dangerous] Input field 'retiredAt' was added to input object type 'ProjectLabelUpdateInput' (ProjectLabelUpdateInput.retiredAt)

feat(schema): [dangerous] Enum value 'privateBeta' was added to enum 'ReleaseChannel' (ReleaseChannel.privateBeta)

feat(schema): [dangerous] Enum value 'owner' was added to enum 'UserRoleType' (UserRoleType.owner)

feat(schema): [non_breaking] Type 'AgentSessionUpdateInput' was added (AgentSessionUpdateInput)

feat(schema): [non_breaking] Type 'AiPromptRules' was added (AiPromptRules)

feat(schema): [non_breaking] Type 'CandidateRepository' was added (CandidateRepository)

feat(schema): [non_breaking] Type 'IdentityProviderType' was added (IdentityProviderType)

feat(schema): [non_breaking] Type 'OAuthAuthorizationWebhookPayload' was added (OAuthAuthorizationWebhookPayload)

feat(schema): [non_breaking] Type 'RepositorySuggestion' was added (RepositorySuggestion)

feat(schema): [non_breaking] Type 'RepositorySuggestionsPayload' was added (RepositorySuggestionsPayload)

feat(schema): [non_breaking] Type 'UserSettingsCustomSidebarTheme' was added (UserSettingsCustomSidebarTheme)

feat(schema): [non_breaking] Type 'UserSettingsCustomTheme' was added (UserSettingsCustomTheme)

feat(schema): [non_breaking] Type 'UserSettingsTheme' was added (UserSettingsTheme)

feat(schema): [non_breaking] Type 'UserSettingsThemeDeviceType' was added (UserSettingsThemeDeviceType)

feat(schema): [non_breaking] Type 'UserSettingsThemeMode' was added (UserSettingsThemeMode)

feat(schema): [non_breaking] Type 'UserSettingsThemePreset' was added (UserSettingsThemePreset)

feat(schema): [non_breaking] Input field 'AgentActivityCreateInput.content' description changed from 'The content payload of the agent activity. This object is not strictly typed.
See https://linear.app/developers/agents for typing details.' to 'The content payload of the agent activity. This object is not strictly typed.
See https://linear.app/developers/agent-interaction#activity-content-payload for typing details.' (AgentActivityCreateInput.content)

feat(schema): [non_breaking] Field 'plan' was added to object type 'AgentSession' (AgentSession.plan)

feat(schema): [non_breaking] Field 'spEntityId' was added to object type 'AuthIdentityProvider' (AuthIdentityProvider.spEntityId)

feat(schema): [non_breaking] Field 'type' was added to object type 'AuthIdentityProvider' (AuthIdentityProvider.type)

feat(schema): [non_breaking] Field 'documentContentId' was added to object type 'Comment' (Comment.documentContentId)

feat(schema): [non_breaking] Field 'initiativeUpdateId' was added to object type 'Comment' (Comment.initiativeUpdateId)

feat(schema): [non_breaking] Field 'issueId' was added to object type 'Comment' (Comment.issueId)

feat(schema): [non_breaking] Field 'parentId' was added to object type 'Comment' (Comment.parentId)

feat(schema): [non_breaking] Field 'projectUpdateId' was added to object type 'Comment' (Comment.projectUpdateId)

feat(schema): [non_breaking] Field 'resolvingCommentId' was added to object type 'Comment' (Comment.resolvingCommentId)

feat(schema): [non_breaking] Field 'issue' was added to object type 'Document' (Document.issue)

feat(schema): [non_breaking] Field 'aiPromptRules' was added to object type 'DocumentContent' (DocumentContent.aiPromptRules)

feat(schema): [non_breaking] Field 'issue' was added to object type 'DocumentSearchResult' (DocumentSearchResult.issue)

feat(schema): [non_breaking] Field 'spEntityId' was added to object type 'IdentityProvider' (IdentityProvider.spEntityId)

feat(schema): [non_breaking] Field 'type' was added to object type 'IdentityProvider' (IdentityProvider.type)

feat(schema): [non_breaking] Field 'documents' was added to object type 'Issue' (Issue.documents)

feat(schema): [non_breaking] Field 'triageResponsibilityAutoAssigned' was added to object type 'IssueHistory' (IssueHistory.triageResponsibilityAutoAssigned)

feat(schema): [non_breaking] Field 'retiredAt' was added to object type 'IssueLabel' (IssueLabel.retiredAt)

feat(schema): [non_breaking] Field 'retiredBy' was added to object type 'IssueLabel' (IssueLabel.retiredBy)

feat(schema): [non_breaking] Field 'documents' was added to object type 'IssueSearchResult' (IssueSearchResult.documents)

feat(schema): [non_breaking] Input field 'JiraConfigurationInput.email' description changed from 'The Jira user's email address.' to 'The Jira user's email address. A username is also accepted on Jira Server / DC.' (JiraConfigurationInput.email)

feat(schema): [non_breaking] Field 'agentSessionUpdate' was added to object type 'Mutation' (Mutation.agentSessionUpdate)

feat(schema): [non_breaking] Field 'customerUnsync' was added to object type 'Mutation' (Mutation.customerUnsync)

feat(schema): [non_breaking] Field 'issueLabelRestore' was added to object type 'Mutation' (Mutation.issueLabelRestore)

feat(schema): [non_breaking] Field 'issueLabelRetire' was added to object type 'Mutation' (Mutation.issueLabelRetire)

feat(schema): [non_breaking] Field 'projectLabelRestore' was added to object type 'Mutation' (Mutation.projectLabelRestore)

feat(schema): [non_breaking] Field 'projectLabelRetire' was added to object type 'Mutation' (Mutation.projectLabelRetire)

feat(schema): [non_breaking] Field 'Mutation.issueLabelUpdate' description changed from 'Updates an label.' to 'Updates a label.' (Mutation.issueLabelUpdate)

feat(schema): [non_breaking] Field 'generatedUpdatesEnabled' was added to object type 'Organization' (Organization.generatedUpdatesEnabled)

feat(schema): [non_breaking] Field 'Organization.aiAddonEnabled' description changed from '[INTERNAL] Whether the organization has enabled the AI add-on.' to '[INTERNAL] Whether the organization has enabled the AI add-on (which at this point only includes triage suggestions).' (Organization.aiAddonEnabled)

feat(schema): [non_breaking] Field 'Organization.createdIssueCount' description changed from 'Number of issues in the organization.' to 'Aproximate number of issues in the organization, including archived ones.' (Organization.createdIssueCount)

feat(schema): [non_breaking] Field 'retiredAt' was added to object type 'ProjectLabel' (ProjectLabel.retiredAt)

feat(schema): [non_breaking] Field 'retiredBy' was added to object type 'ProjectLabel' (ProjectLabel.retiredBy)

feat(schema): [non_breaking] Field 'issueRepositorySuggestions' was added to object type 'Query' (Query.issueRepositorySuggestions)

feat(schema): [non_breaking] Field 'theme' was added to object type 'UserSettings' (UserSettings.theme)