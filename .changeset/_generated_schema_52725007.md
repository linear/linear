---
"@linear/sdk": minor
---


feat(schema): [breaking] Type 'IssueDescriptionHistory' was removed (IssueDescriptionHistory)

feat(schema): [breaking] Type 'IssueDescriptionHistoryPayload' was removed (IssueDescriptionHistoryPayload)

feat(schema): [breaking] Field 'Comment.user' changed type from 'User!' to 'User' (Comment.user)

feat(schema): [breaking] Input field 'IssueCollectionFilter.creator' changed type from 'UserFilter' to 'NullableUserFilter' (IssueCollectionFilter.creator)

feat(schema): [breaking] Input field 'IssueFilter.creator' changed type from 'UserFilter' to 'NullableUserFilter' (IssueFilter.creator)

feat(schema): [breaking] Field 'issueDescriptionHistory' was removed from object type 'Query' (Query.issueDescriptionHistory)

feat(schema): [breaking] Argument 'newVersion: Boolean' was removed from field 'Query.syncBootstrap' (Query.syncBootstrap.newVersion)

feat(schema): [breaking] Field 'teamIds' (deprecated) was removed from object type 'Webhook' (Webhook.teamIds)

feat(schema): [breaking] Field 'Webhook.team' changed type from 'Team!' to 'Team' (Webhook.team)

feat(schema): [dangerous] Input field 'createAsUser' was added to input object type 'AttachmentCreateInput' (AttachmentCreateInput.createAsUser)

feat(schema): [dangerous] Input field 'neq' was added to input object type 'BooleanComparator' (BooleanComparator.neq)

feat(schema): [dangerous] Input field 'createAsUser' was added to input object type 'CommentCreateInput' (CommentCreateInput.createAsUser)

feat(schema): [dangerous] Input field 'parentId' was added to input object type 'CommentCreateInput' (CommentCreateInput.parentId)

feat(schema): [dangerous] Input field 'clientVersion' was added to input object type 'ContactCreateInput' (ContactCreateInput.clientVersion)

feat(schema): [dangerous] Input field 'predefinedViewTeamId' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.predefinedViewTeamId)

feat(schema): [dangerous] Input field 'predefinedViewType' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.predefinedViewType)

feat(schema): [dangerous] Input field 'folderName' was added to input object type 'FavoriteUpdateInput' (FavoriteUpdateInput.folderName)

feat(schema): [dangerous] Input field 'createAsUser' was added to input object type 'IssueCreateInput' (IssueCreateInput.createAsUser)

feat(schema): [dangerous] Argument 'flags: [UserFlagType!]' added to field 'Mutation.userSettingsFlagsReset' (Mutation.userSettingsFlagsReset.flags)

feat(schema): [dangerous] Input field 'active' was added to input object type 'NullableUserFilter' (NullableUserFilter.active)

feat(schema): [dangerous] Input field 'admin' was added to input object type 'NullableUserFilter' (NullableUserFilter.admin)

feat(schema): [dangerous] Input field 'permission' was added to input object type 'OrganizationInviteCreateInput' (OrganizationInviteCreateInput.permission)

feat(schema): [dangerous] Argument 'actor: String' added to field 'Query.applicationWithAuthorization' (Query.applicationWithAuthorization.actor)

feat(schema): [dangerous] Argument 'includeDependent: Boolean' added to field 'Query.dependentModelSync' (Query.dependentModelSync.includeDependent)

feat(schema): [dangerous] Input field 'active' was added to input object type 'UserFilter' (UserFilter.active)

feat(schema): [dangerous] Input field 'admin' was added to input object type 'UserFilter' (UserFilter.admin)

feat(schema): [dangerous] Enum value 'all' was added to enum 'UserFlagType' (UserFlagType.all)

feat(schema): [dangerous] Enum value 'projectBacklogWelcomeDismissed' was added to enum 'UserFlagType' (UserFlagType.projectBacklogWelcomeDismissed)

feat(schema): [dangerous] Enum value 'projectsAll' was added to enum 'ViewType' (ViewType.projectsAll)

feat(schema): [dangerous] Enum value 'projectsBacklog' was added to enum 'ViewType' (ViewType.projectsBacklog)

feat(schema): [dangerous] Enum value 'projectsClosed' was added to enum 'ViewType' (ViewType.projectsClosed)

feat(schema): [dangerous] Enum value 'roadmapAll' was added to enum 'ViewType' (ViewType.roadmapAll)

feat(schema): [dangerous] Enum value 'roadmapBacklog' was added to enum 'ViewType' (ViewType.roadmapBacklog)

feat(schema): [dangerous] Enum value 'roadmapClosed' was added to enum 'ViewType' (ViewType.roadmapClosed)

feat(schema): [dangerous] Enum value 'search' was added to enum 'ViewType' (ViewType.search)

feat(schema): [non_breaking] Type 'RateLimitPayload' was added (RateLimitPayload)

feat(schema): [non_breaking] Type 'RateLimitResultPayload' was added (RateLimitResultPayload)

feat(schema): [non_breaking] Type 'SamlConfigurationPayload' was added (SamlConfigurationPayload)

feat(schema): [non_breaking] Field 'ApiKey.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (ApiKey.updatedAt)

feat(schema): [non_breaking] Field 'includesDependencies' was added to object type 'ArchiveResponse' (ArchiveResponse.includesDependencies)

feat(schema): [non_breaking] Field 'Attachment.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Attachment.updatedAt)

feat(schema): [non_breaking] Field 'AuditEntry.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (AuditEntry.updatedAt)

feat(schema): [non_breaking] Field 'children' was added to object type 'Comment' (Comment.children)

feat(schema): [non_breaking] Field 'parent' was added to object type 'Comment' (Comment.parent)

feat(schema): [non_breaking] Field 'Comment.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Comment.updatedAt)

feat(schema): [non_breaking] Field 'CustomView.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (CustomView.updatedAt)

feat(schema): [non_breaking] Field 'Cycle.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Cycle.updatedAt)

feat(schema): [non_breaking] Field 'Document.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Document.updatedAt)

feat(schema): [non_breaking] Field 'DocumentStep.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (DocumentStep.updatedAt)

feat(schema): [non_breaking] Field 'DocumentVersion.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (DocumentVersion.updatedAt)

feat(schema): [non_breaking] Field 'Emoji.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Emoji.updatedAt)

feat(schema): [non_breaking] Field 'predefinedViewTeam' was added to object type 'Favorite' (Favorite.predefinedViewTeam)

feat(schema): [non_breaking] Field 'predefinedViewType' was added to object type 'Favorite' (Favorite.predefinedViewType)

feat(schema): [non_breaking] Field 'Favorite.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Favorite.updatedAt)

feat(schema): [non_breaking] Field 'Integration.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Integration.updatedAt)

feat(schema): [non_breaking] Field 'IntegrationResource.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (IntegrationResource.updatedAt)

feat(schema): [non_breaking] Field 'Issue.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Issue.updatedAt)

feat(schema): [non_breaking] Field 'attachment' was added to object type 'IssueHistory' (IssueHistory.attachment)

feat(schema): [non_breaking] Field 'IssueHistory.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (IssueHistory.updatedAt)

feat(schema): [non_breaking] Field 'IssueImport.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (IssueImport.updatedAt)

feat(schema): [non_breaking] Field 'IssueLabel.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (IssueLabel.updatedAt)

feat(schema): [non_breaking] Field 'IssueRelation.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (IssueRelation.updatedAt)

feat(schema): [non_breaking] Field 'Milestone.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Milestone.updatedAt)

feat(schema): [non_breaking] Field 'attachmentLinkDiscord' was added to object type 'Mutation' (Mutation.attachmentLinkDiscord)

feat(schema): [non_breaking] Field 'integrationDiscord' was added to object type 'Mutation' (Mutation.integrationDiscord)

feat(schema): [non_breaking] Field 'issueLabelDelete' was added to object type 'Mutation' (Mutation.issueLabelDelete)

feat(schema): [non_breaking] Field 'projectDelete' was added to object type 'Mutation' (Mutation.projectDelete)

feat(schema): [non_breaking] Field 'userDiscordConnect' was added to object type 'Mutation' (Mutation.userDiscordConnect)

feat(schema): [non_breaking] Field 'userExternalUserDisconnect' was added to object type 'Mutation' (Mutation.userExternalUserDisconnect)

feat(schema): [non_breaking] Field 'Mutation.integrationLoom' is deprecated (Mutation.integrationLoom)

feat(schema): [non_breaking] Field 'Mutation.integrationLoom' has deprecation reason 'Not available.' (Mutation.integrationLoom)

feat(schema): [non_breaking] Description for argument 'shouldUseV2Auth' on field 'Mutation.integrationSlack' changed from 'Whether or not v2 of Slack OAuth should be used' to '[DEPRECATED] Whether or not v2 of Slack OAuth should be used. No longer used.' (Mutation.integrationSlack.shouldUseV2Auth)

feat(schema): [non_breaking] Description for argument 'shouldUseV2Auth' on field 'Mutation.integrationSlackPost' changed from 'Whether or not v2 of Slack OAuth should be used' to '[DEPRECATED] Whether or not v2 of Slack OAuth should be used. No longer used.' (Mutation.integrationSlackPost.shouldUseV2Auth)

feat(schema): [non_breaking] Field 'Mutation.issueLabelArchive' is deprecated (Mutation.issueLabelArchive)

feat(schema): [non_breaking] Field 'Mutation.issueLabelArchive' has deprecation reason 'Labels are deleted instead of archived.' (Mutation.issueLabelArchive)

feat(schema): [non_breaking] Description for argument 'id' on field 'Mutation.milestoneDelete' changed from 'The identifier of the milestone to delete. Only milestones without projects can be deleted.' to 'The identifier of the milestone to delete.' (Mutation.milestoneDelete.id)

feat(schema): [non_breaking] Field 'Mutation.projectArchive' is deprecated (Mutation.projectArchive)

feat(schema): [non_breaking] Field 'Mutation.projectArchive' has deprecation reason 'Deprecated in favor of projectDelete.' (Mutation.projectArchive)

feat(schema): [non_breaking] Field 'Notification.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Notification.updatedAt)

feat(schema): [non_breaking] Field 'NotificationSubscription.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (NotificationSubscription.updatedAt)

feat(schema): [non_breaking] Input field 'NullableUserFilter.displayName' description changed from 'Comparator for the users display name.' to 'Comparator for the user's display name.' (NullableUserFilter.displayName)

feat(schema): [non_breaking] Input field 'NullableUserFilter.email' description changed from 'Comparator for the users email.' to 'Comparator for the user's email.' (NullableUserFilter.email)

feat(schema): [non_breaking] Input field 'NullableUserFilter.name' description changed from 'Comparator for the users name.' to 'Comparator for the user's name.' (NullableUserFilter.name)

feat(schema): [non_breaking] Field 'OauthClient.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (OauthClient.updatedAt)

feat(schema): [non_breaking] Field 'Organization.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Organization.updatedAt)

feat(schema): [non_breaking] Field 'OrganizationDomain.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (OrganizationDomain.updatedAt)

feat(schema): [non_breaking] Field 'permission' was added to object type 'OrganizationInvite' (OrganizationInvite.permission)

feat(schema): [non_breaking] Field 'OrganizationInvite.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (OrganizationInvite.updatedAt)

feat(schema): [non_breaking] Field 'permission' was added to object type 'OrganizationInviteDetailsPayload' (OrganizationInviteDetailsPayload.permission)

feat(schema): [non_breaking] Field 'Project.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Project.updatedAt)

feat(schema): [non_breaking] Field 'ProjectLink.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (ProjectLink.updatedAt)

feat(schema): [non_breaking] Field 'PushSubscription.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (PushSubscription.updatedAt)

feat(schema): [non_breaking] Field 'applicationInfo' was added to object type 'Query' (Query.applicationInfo)

feat(schema): [non_breaking] Field 'issueVcsBranchSearch' was added to object type 'Query' (Query.issueVcsBranchSearch)

feat(schema): [non_breaking] Field 'rateLimitStatus' was added to object type 'Query' (Query.rateLimitStatus)

feat(schema): [non_breaking] Description for argument 'query' on field 'Query.issueSearch' changed from 'Search string to look for.' to '[Deprecated] Search string to look for.' (Query.issueSearch.query)

feat(schema): [non_breaking] Field 'Reaction.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Reaction.updatedAt)

feat(schema): [non_breaking] Description 'The integration resource's settings' was removed from object type 'SamlConfiguration' (SamlConfiguration)

feat(schema): [non_breaking] Field 'Subscription.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Subscription.updatedAt)

feat(schema): [non_breaking] Field 'Team.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Team.updatedAt)

feat(schema): [non_breaking] Field 'TeamMembership.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (TeamMembership.updatedAt)

feat(schema): [non_breaking] Field 'Template.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Template.updatedAt)

feat(schema): [non_breaking] Field 'guest' was added to object type 'User' (User.guest)

feat(schema): [non_breaking] Field 'User.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (User.updatedAt)

feat(schema): [non_breaking] Input field 'UserFilter.displayName' description changed from 'Comparator for the users display name.' to 'Comparator for the user's display name.' (UserFilter.displayName)

feat(schema): [non_breaking] Input field 'UserFilter.email' description changed from 'Comparator for the users email.' to 'Comparator for the user's email.' (UserFilter.email)

feat(schema): [non_breaking] Input field 'UserFilter.name' description changed from 'Comparator for the users name.' to 'Comparator for the user's name.' (UserFilter.name)

feat(schema): [non_breaking] Field 'UserSettings.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (UserSettings.updatedAt)

feat(schema): [non_breaking] Field 'ViewPreferences.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (ViewPreferences.updatedAt)

feat(schema): [non_breaking] Field 'Webhook.team' description changed from 'The team that the webhook is associated with.' to 'The team that the webhook is associated with. If null, the webhook is associated with all public teams of the organization.' (Webhook.team)

feat(schema): [non_breaking] Field 'Webhook.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (Webhook.updatedAt)

feat(schema): [non_breaking] Field 'WorkflowState.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been update after creation.' to 'The last time at which the entity was updated. This is the same as the creation time if the
    entity hasn't been updated after creation.' (WorkflowState.updatedAt)