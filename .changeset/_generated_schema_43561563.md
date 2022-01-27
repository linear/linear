---
"@linear/sdk": minor
---


feat(schema): [breaking] Type 'DocumentationSearchPayload' was removed (DocumentationSearchPayload)

feat(schema): [breaking] Type 'SearchResultPayload' was removed (SearchResultPayload)

feat(schema): [breaking] Field 'IssueLabel.team' changed type from 'Team!' to 'Team' (IssueLabel.team)

feat(schema): [breaking] Field 'integrationJiraSettingsUpdate' was removed from object type 'Mutation' (Mutation.integrationJiraSettingsUpdate)

feat(schema): [breaking] Field 'documentationSearch' was removed from object type 'Query' (Query.documentationSearch)

feat(schema): [breaking] Field 'search' was removed from object type 'Query' (Query.search)

feat(schema): [breaking] Field 'Template.organization' changed type from 'Organization!' to 'Organization' (Template.organization)

feat(schema): [breaking] Field 'Template.team' changed type from 'Team!' to 'Team' (Template.team)

feat(schema): [dangerous] Argument 'replaceTeamLabels: Boolean' added to field 'Mutation.issueLabelCreate' (Mutation.issueLabelCreate.replaceTeamLabels)

feat(schema): [dangerous] Input field 'containsIgnoreCase' was added to input object type 'NestedStringComparator' (NestedStringComparator.containsIgnoreCase)

feat(schema): [dangerous] Input field 'eqIgnoreCase' was added to input object type 'NestedStringComparator' (NestedStringComparator.eqIgnoreCase)

feat(schema): [dangerous] Input field 'neqIgnoreCase' was added to input object type 'NestedStringComparator' (NestedStringComparator.neqIgnoreCase)

feat(schema): [dangerous] Input field 'notContainsIgnoreCase' was added to input object type 'NestedStringComparator' (NestedStringComparator.notContainsIgnoreCase)

feat(schema): [dangerous] Input field 'containsIgnoreCase' was added to input object type 'NullableStringComparator' (NullableStringComparator.containsIgnoreCase)

feat(schema): [dangerous] Input field 'eqIgnoreCase' was added to input object type 'NullableStringComparator' (NullableStringComparator.eqIgnoreCase)

feat(schema): [dangerous] Input field 'neqIgnoreCase' was added to input object type 'NullableStringComparator' (NullableStringComparator.neqIgnoreCase)

feat(schema): [dangerous] Input field 'notContainsIgnoreCase' was added to input object type 'NullableStringComparator' (NullableStringComparator.notContainsIgnoreCase)

feat(schema): [dangerous] Input field 'isMe' was added to input object type 'NullableUserFilter' (NullableUserFilter.isMe)

feat(schema): [dangerous] Input field 'containsIgnoreCase' was added to input object type 'StringComparator' (StringComparator.containsIgnoreCase)

feat(schema): [dangerous] Input field 'eqIgnoreCase' was added to input object type 'StringComparator' (StringComparator.eqIgnoreCase)

feat(schema): [dangerous] Input field 'neqIgnoreCase' was added to input object type 'StringComparator' (StringComparator.neqIgnoreCase)

feat(schema): [dangerous] Input field 'notContainsIgnoreCase' was added to input object type 'StringComparator' (StringComparator.notContainsIgnoreCase)

feat(schema): [dangerous] Input field 'color' was added to input object type 'TeamCreateInput' (TeamCreateInput.color)

feat(schema): [dangerous] Input field 'icon' was added to input object type 'TeamCreateInput' (TeamCreateInput.icon)

feat(schema): [dangerous] Input field 'color' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.color)

feat(schema): [dangerous] Input field 'icon' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.icon)

feat(schema): [dangerous] Input field 'teamId' was added to input object type 'TemplateUpdateInput' (TemplateUpdateInput.teamId)

feat(schema): [dangerous] Input field 'reducedPersonalInformation' was added to input object type 'UpdateOrganizationInput' (UpdateOrganizationInput.reducedPersonalInformation)

feat(schema): [dangerous] Input field 'description' was added to input object type 'UpdateUserInput' (UpdateUserInput.description)

feat(schema): [dangerous] Input field 'statusEmoji' was added to input object type 'UpdateUserInput' (UpdateUserInput.statusEmoji)

feat(schema): [dangerous] Input field 'statusLabel' was added to input object type 'UpdateUserInput' (UpdateUserInput.statusLabel)

feat(schema): [dangerous] Input field 'statusUntilAt' was added to input object type 'UpdateUserInput' (UpdateUserInput.statusUntilAt)

feat(schema): [dangerous] Input field 'timezone' was added to input object type 'UpdateUserInput' (UpdateUserInput.timezone)

feat(schema): [dangerous] Input field 'isMe' was added to input object type 'UserFilter' (UserFilter.isMe)

feat(schema): [dangerous] Enum value 'canPlayTetris' was added to enum 'UserFlagType' (UserFlagType.canPlayTetris)

feat(schema): [non_breaking] Type 'GitHubCommitIntegrationPayload' was added (GitHubCommitIntegrationPayload)

feat(schema): [non_breaking] Type 'GoogleSheetsSettingsInput' was added (GoogleSheetsSettingsInput)

feat(schema): [non_breaking] Type 'IntegrationSettingsInput' was added (IntegrationSettingsInput)

feat(schema): [non_breaking] Type 'ProjectLinkUpdateInput' was added (ProjectLinkUpdateInput)

feat(schema): [non_breaking] Type 'SentrySettingsInput' was added (SentrySettingsInput)

feat(schema): [non_breaking] Type 'SlackPostSettingsInput' was added (SlackPostSettingsInput)

feat(schema): [non_breaking] Type 'ZendeskSettingsInput' was added (ZendeskSettingsInput)

feat(schema): [non_breaking] Field 'contentData' was added to object type 'Document' (Document.contentData)

feat(schema): [non_breaking] Input field 'DocumentCreateInput.contentData' description changed from 'The document content as a Prosemirror document.' to '[Internal] The document content as a Prosemirror document.' (DocumentCreateInput.contentData)

feat(schema): [non_breaking] Input field 'DocumentUpdateInput.contentData' description changed from 'The document content as a Prosemirror document.' to '[Internal] The document content as a Prosemirror document.' (DocumentUpdateInput.contentData)

feat(schema): [non_breaking] Field 'organization' was added to object type 'IssueLabel' (IssueLabel.organization)

feat(schema): [non_breaking] Field 'IssueLabel.team' description changed from 'The team to which the label belongs to.' to 'The team that the label is associated with. If null, the label is associated with the global workspace..' (IssueLabel.team)

feat(schema): [non_breaking] Input field 'IssueLabelCreateInput.teamId' description changed from 'The team associated with the label.' to 'The team associated with the label. If not given, the label will be associated with the entire workspace.' (IssueLabelCreateInput.teamId)

feat(schema): [non_breaking] Input field 'IssueLabelCreateInput.teamId' changed type from 'String!' to 'String' (IssueLabelCreateInput.teamId)

feat(schema): [non_breaking] Field 'attachmentLinkJiraIssue' was added to object type 'Mutation' (Mutation.attachmentLinkJiraIssue)

feat(schema): [non_breaking] Field 'debugCreateSubscription' was added to object type 'Mutation' (Mutation.debugCreateSubscription)

feat(schema): [non_breaking] Field 'integrationGithubCommitCreate' was added to object type 'Mutation' (Mutation.integrationGithubCommitCreate)

feat(schema): [non_breaking] Field 'integrationSettingsUpdate' was added to object type 'Mutation' (Mutation.integrationSettingsUpdate)

feat(schema): [non_breaking] Field 'projectLinkUpdate' was added to object type 'Mutation' (Mutation.projectLinkUpdate)

feat(schema): [non_breaking] Field 'Mutation.debugCreateOAuthApps' description changed from 'Create the OAuth test applications in development.' to '[Internal] Create the OAuth test applications in development.' (Mutation.debugCreateOAuthApps)

feat(schema): [non_breaking] Field 'Mutation.debugCreateSAMLOrg' description changed from 'Create the SAML test organization in development.' to '[Internal] Create the SAML test organization in development.' (Mutation.debugCreateSAMLOrg)

feat(schema): [non_breaking] Field 'Mutation.debugFailWithWarning' description changed from 'Always logs an error to Sentry as warning. Used to debug logging.' to '[Internal] Always logs an error to Sentry as warning. Used to debug logging.' (Mutation.debugFailWithWarning)

feat(schema): [non_breaking] Field 'Mutation.integrationIntercomSettingsUpdate' description changed from 'Updates settings on the Intercom integration.' to '[DEPRECATED] Updates settings on the Intercom integration.' (Mutation.integrationIntercomSettingsUpdate)

feat(schema): [non_breaking] Field 'Mutation.integrationIntercomSettingsUpdate' is deprecated (Mutation.integrationIntercomSettingsUpdate)

feat(schema): [non_breaking] Field 'Mutation.integrationIntercomSettingsUpdate' has deprecation reason 'This mutation is deprecated, please use `integrationSettingsUpdate` instead' (Mutation.integrationIntercomSettingsUpdate)

feat(schema): [non_breaking] Field 'labels' was added to object type 'Organization' (Organization.labels)

feat(schema): [non_breaking] Field 'templates' was added to object type 'Organization' (Organization.templates)

feat(schema): [non_breaking] Field 'color' was added to object type 'Team' (Team.color)

feat(schema): [non_breaking] Field 'icon' was added to object type 'Team' (Team.icon)

feat(schema): [non_breaking] Description 'A template object used for creating new issues faster.' on type 'Template' has changed to 'A template object used for creating entities faster.' (Template)

feat(schema): [non_breaking] Input field 'TemplateCreateInput.teamId' description changed from 'The identifier or key of the team associated with the template.' to 'The identifier or key of the team associated with the template. If not given, the template will be shared across all teams.' (TemplateCreateInput.teamId)

feat(schema): [non_breaking] Input field 'TemplateCreateInput.teamId' changed type from 'String!' to 'String' (TemplateCreateInput.teamId)

feat(schema): [non_breaking] Field 'description' was added to object type 'User' (User.description)

feat(schema): [non_breaking] Field 'isMe' was added to object type 'User' (User.isMe)

feat(schema): [non_breaking] Field 'statusEmoji' was added to object type 'User' (User.statusEmoji)

feat(schema): [non_breaking] Field 'statusLabel' was added to object type 'User' (User.statusLabel)

feat(schema): [non_breaking] Field 'statusUntilAt' was added to object type 'User' (User.statusUntilAt)

feat(schema): [non_breaking] Field 'timezone' was added to object type 'User' (User.timezone)