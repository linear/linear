---
"@linear/sdk": minor
---


feat(schema): [breaking] Field 'IssueHistory.relationChanges' changed type from 'String' to '[IssueRelationHistoryPayload!]' (IssueHistory.relationChanges)

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