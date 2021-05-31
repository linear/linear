---
"@linear/sdk": minor
---


feat(schema): [breaking] Argument 'databaseVersion: Int' was removed from field 'Query.syncBootstrap' (Query.syncBootstrap.databaseVersion)

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