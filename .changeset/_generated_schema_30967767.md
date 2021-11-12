---
"@linear/sdk": minor
---


feat(schema): [breaking] Field 'Mutation.attachmentLinkFront' changed type from 'AttachmentPayload!' to 'FrontAttachmentPayload!' (Mutation.attachmentLinkFront)

feat(schema): [dangerous] Input field 'commentBody' was added to input object type 'AttachmentCreateInput' (AttachmentCreateInput.commentBody)

feat(schema): [dangerous] Input field 'commentBodyData' was added to input object type 'AttachmentCreateInput' (AttachmentCreateInput.commentBodyData)

feat(schema): [dangerous] Input field 'filterData' was added to input object type 'CustomViewCreateInput' (CustomViewCreateInput.filterData)

feat(schema): [dangerous] Input field 'filterData' was added to input object type 'CustomViewUpdateInput' (CustomViewUpdateInput.filterData)

feat(schema): [dangerous] Input field 'documentId' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.documentId)

feat(schema): [dangerous] Argument 'includeClosedIssues: Boolean' added to field 'Mutation.issueImportCreateAsana' (Mutation.issueImportCreateAsana.includeClosedIssues)

feat(schema): [dangerous] Argument 'includeClosedIssues: Boolean' added to field 'Mutation.issueImportCreateClubhouse' (Mutation.issueImportCreateClubhouse.includeClosedIssues)

feat(schema): [dangerous] Argument 'includeClosedIssues: Boolean' added to field 'Mutation.issueImportCreateGithub' (Mutation.issueImportCreateGithub.includeClosedIssues)

feat(schema): [dangerous] Argument 'includeClosedIssues: Boolean' added to field 'Mutation.issueImportCreateJira' (Mutation.issueImportCreateJira.includeClosedIssues)

feat(schema): [dangerous] Input field 'cycleEnabledStartWeek' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.cycleEnabledStartWeek)

feat(schema): [dangerous] Enum value 'slackCommentReactionTipShown' was added to enum 'UserFlagType' (UserFlagType.slackCommentReactionTipShown)

feat(schema): [non_breaking] Type 'AuditEntry' was added (AuditEntry)

feat(schema): [non_breaking] Type 'AuditEntryConnection' was added (AuditEntryConnection)

feat(schema): [non_breaking] Type 'AuditEntryEdge' was added (AuditEntryEdge)

feat(schema): [non_breaking] Type 'AuditEntryFilter' was added (AuditEntryFilter)

feat(schema): [non_breaking] Type 'AuditEntryType' was added (AuditEntryType)

feat(schema): [non_breaking] Type 'BatchRequest' was added (BatchRequest)

feat(schema): [non_breaking] Type 'Document' was added (Document)

feat(schema): [non_breaking] Type 'DocumentConnection' was added (DocumentConnection)

feat(schema): [non_breaking] Type 'DocumentCreateInput' was added (DocumentCreateInput)

feat(schema): [non_breaking] Type 'DocumentEdge' was added (DocumentEdge)

feat(schema): [non_breaking] Type 'DocumentPayload' was added (DocumentPayload)

feat(schema): [non_breaking] Type 'DocumentUpdateInput' was added (DocumentUpdateInput)

feat(schema): [non_breaking] Type 'DocumentVersion' was added (DocumentVersion)

feat(schema): [non_breaking] Type 'DocumentVersionConnection' was added (DocumentVersionConnection)

feat(schema): [non_breaking] Type 'DocumentVersionEdge' was added (DocumentVersionEdge)

feat(schema): [non_breaking] Type 'DocumentationSearchPayload' was added (DocumentationSearchPayload)

feat(schema): [non_breaking] Type 'FrontAttachmentPayload' was added (FrontAttachmentPayload)

feat(schema): [non_breaking] Type 'IssueBatchPayload' was added (IssueBatchPayload)

feat(schema): [non_breaking] Type 'JiraConfigurationInput' was added (JiraConfigurationInput)

feat(schema): [non_breaking] Type 'SyncBatchResponse' was added (SyncBatchResponse)

feat(schema): [non_breaking] Type 'UUID' was added (UUID)

feat(schema): [non_breaking] Field 'webhooksEnabled' was added to object type 'AuthorizedApplication' (AuthorizedApplication.webhooksEnabled)

feat(schema): [non_breaking] Field 'filterData' was added to object type 'CustomView' (CustomView.filterData)

feat(schema): [non_breaking] Field 'CustomView.filters' is deprecated (CustomView.filters)

feat(schema): [non_breaking] Field 'CustomView.filters' has deprecation reason 'Will be replaced by `filterData` in a future update' (CustomView.filters)

feat(schema): [non_breaking] Field 'DependencyResponse.dependencies' description changed from 'A JSON serialized collection of model objects loaded from the archive' to 'A JSON serialized collection of dependencies.' (DependencyResponse.dependencies)

feat(schema): [non_breaking] Field 'document' was added to object type 'Favorite' (Favorite.document)

feat(schema): [non_breaking] Field 'documentCreate' was added to object type 'Mutation' (Mutation.documentCreate)

feat(schema): [non_breaking] Field 'documentDelete' was added to object type 'Mutation' (Mutation.documentDelete)

feat(schema): [non_breaking] Field 'documentUpdate' was added to object type 'Mutation' (Mutation.documentUpdate)

feat(schema): [non_breaking] Field 'issueBatchUpdate' was added to object type 'Mutation' (Mutation.issueBatchUpdate)

feat(schema): [non_breaking] Field 'jiraIntegrationConnect' was added to object type 'Mutation' (Mutation.jiraIntegrationConnect)

feat(schema): [non_breaking] Field 'Mutation.subscriptionArchive' description changed from 'Archives a subscription.' to '[Internal] Archives a subscription.' (Mutation.subscriptionArchive)

feat(schema): [non_breaking] Field 'Mutation.subscriptionSessionCreate' description changed from 'Creates a subscription session. Used internally to integrate with Stripe.' to '[Internal] Creates a subscription session. Used internally to integrate with Stripe.' (Mutation.subscriptionSessionCreate)

feat(schema): [non_breaking] Field 'Mutation.subscriptionUpdate' description changed from 'Updates a subscription.' to '[Internal] Updates a subscription.' (Mutation.subscriptionUpdate)

feat(schema): [non_breaking] Field 'Mutation.subscriptionUpdateSessionCreate' description changed from 'Creates a subscription update session. Used internally to integrate with Stripe.' to '[Internal] Creates a subscription update session. Used internally to integrate with Stripe.' (Mutation.subscriptionUpdateSessionCreate)

feat(schema): [non_breaking] Field 'Mutation.subscriptionUpgrade' description changed from 'Upgrades a subscription plan.' to '[Internal] Upgrades a subscription plan.' (Mutation.subscriptionUpgrade)

feat(schema): [non_breaking] Field 'documents' was added to object type 'Project' (Project.documents)

feat(schema): [non_breaking] Field 'administrableTeams' was added to object type 'Query' (Query.administrableTeams)

feat(schema): [non_breaking] Field 'auditEntries' was added to object type 'Query' (Query.auditEntries)

feat(schema): [non_breaking] Field 'auditEntryTypes' was added to object type 'Query' (Query.auditEntryTypes)

feat(schema): [non_breaking] Field 'document' was added to object type 'Query' (Query.document)

feat(schema): [non_breaking] Field 'documentationSearch' was added to object type 'Query' (Query.documentationSearch)

feat(schema): [non_breaking] Field 'documents' was added to object type 'Query' (Query.documents)

feat(schema): [non_breaking] Field 'syncBatch' was added to object type 'Query' (Query.syncBatch)

feat(schema): [non_breaking] Field 'Query.teams' description changed from 'All teams.' to 'All teams whose issues can be accessed by the user. This might be different from `administrableTeams`, which also includes teams whose settings can be changed by the user.' (Query.teams)

feat(schema): [non_breaking] Field 'defaultTemplateForMembers' was added to object type 'Team' (Team.defaultTemplateForMembers)

feat(schema): [non_breaking] Field 'defaultTemplateForNonMembers' was added to object type 'Team' (Team.defaultTemplateForNonMembers)

feat(schema): [non_breaking] Field 'Team.cycleCalenderUrl' description changed from 'Calender feed (iCal) for cycles.' to 'Calendar feed URL (iCal) for cycles.' (Team.cycleCalenderUrl)

feat(schema): [non_breaking] Field 'Team.defaultTemplateForMembersId' description changed from 'The default template to use for new issues created by members of the team.' to 'The id of the default template to use for new issues created by members of the team.' (Team.defaultTemplateForMembersId)

feat(schema): [non_breaking] Field 'Team.defaultTemplateForMembersId' is deprecated (Team.defaultTemplateForMembersId)

feat(schema): [non_breaking] Field 'Team.defaultTemplateForMembersId' has deprecation reason 'Use defaultTemplateForMembers instead' (Team.defaultTemplateForMembersId)

feat(schema): [non_breaking] Field 'Team.defaultTemplateForNonMembersId' description changed from 'The default template to use for new issues created by non-members of the team.' to 'The id of the default template to use for new issues created by non-members of the team.' (Team.defaultTemplateForNonMembersId)

feat(schema): [non_breaking] Field 'Team.defaultTemplateForNonMembersId' is deprecated (Team.defaultTemplateForNonMembersId)

feat(schema): [non_breaking] Field 'Team.defaultTemplateForNonMembersId' has deprecation reason 'Use defaultTemplateForNonMembers instead' (Team.defaultTemplateForNonMembersId)

feat(schema): [non_breaking] Field 'User.organization' description changed from 'Organization in which the user belongs to.' to 'Organization the user belongs to.' (User.organization)