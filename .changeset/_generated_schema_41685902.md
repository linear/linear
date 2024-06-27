---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'projectTeamId' was removed from input object type 'FavoriteCreateInput' (FavoriteCreateInput.projectTeamId)

feat(schema): [breaking] Field 'GitHubSettings.orgAvatarUrl' changed type from 'String!' to 'String' (GitHubSettings.orgAvatarUrl)

feat(schema): [dangerous] Input field 'initiativeId' was added to input object type 'CustomViewCreateInput' (CustomViewCreateInput.initiativeId)

feat(schema): [dangerous] Input field 'initiativeId' was added to input object type 'CustomViewUpdateInput' (CustomViewUpdateInput.initiativeId)

feat(schema): [dangerous] Input field 'trashed' was added to input object type 'DocumentUpdateInput' (DocumentUpdateInput.trashed)

feat(schema): [dangerous] Input field 'initiativeTab' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.initiativeTab)

feat(schema): [dangerous] Input field 'trashed' was added to input object type 'InitiativeUpdateInput' (InitiativeUpdateInput.trashed)

feat(schema): [dangerous] Enum value 'githubEnterpriseServer' was added to enum 'IntegrationService' (IntegrationService.githubEnterpriseServer)

feat(schema): [dangerous] Argument 'permanentlyDelete: Boolean' added to field 'Mutation.issueDelete' (Mutation.issueDelete.permanentlyDelete)

feat(schema): [dangerous] Input field 'trashed' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.trashed)

feat(schema): [dangerous] Enum value 'initiativesBannerDismissed' was added to enum 'UserFlagType' (UserFlagType.initiativesBannerDismissed)

feat(schema): [non_breaking] Type 'CommentNotification' was added (CommentNotification)

feat(schema): [non_breaking] Type 'Draft' was added (Draft)

feat(schema): [non_breaking] Type 'GitHubEnterpriseServerPayload' was added (GitHubEnterpriseServerPayload)

feat(schema): [non_breaking] Type 'InitiativeTab' was added (InitiativeTab)

feat(schema): [non_breaking] Field 'region' was added to object type 'AuthOrganizationBucketNamePayload' (AuthOrganizationBucketNamePayload.region)

feat(schema): [non_breaking] Input field 'CustomViewCreateInput.projectId' description changed from '[Internal] The id of the project associated with the custom view.' to 'The id of the project associated with the custom view.' (CustomViewCreateInput.projectId)

feat(schema): [non_breaking] Field 'actorAvatarColor' was added to object type 'DocumentNotification' (DocumentNotification.actorAvatarColor)

feat(schema): [non_breaking] Field 'actorAvatarUrl' was added to object type 'DocumentNotification' (DocumentNotification.actorAvatarUrl)

feat(schema): [non_breaking] Field 'actorInitials' was added to object type 'DocumentNotification' (DocumentNotification.actorInitials)

feat(schema): [non_breaking] Field 'commentId' was added to object type 'DocumentNotification' (DocumentNotification.commentId)

feat(schema): [non_breaking] Field 'groupingKey' was added to object type 'DocumentNotification' (DocumentNotification.groupingKey)

feat(schema): [non_breaking] Field 'isLinearActor' was added to object type 'DocumentNotification' (DocumentNotification.isLinearActor)

feat(schema): [non_breaking] Field 'issueStatusType' was added to object type 'DocumentNotification' (DocumentNotification.issueStatusType)

feat(schema): [non_breaking] Field 'parentCommentId' was added to object type 'DocumentNotification' (DocumentNotification.parentCommentId)

feat(schema): [non_breaking] Field 'projectUpdateHealth' was added to object type 'DocumentNotification' (DocumentNotification.projectUpdateHealth)

feat(schema): [non_breaking] Field 'subtitle' was added to object type 'DocumentNotification' (DocumentNotification.subtitle)

feat(schema): [non_breaking] Field 'title' was added to object type 'DocumentNotification' (DocumentNotification.title)

feat(schema): [non_breaking] Field 'url' was added to object type 'DocumentNotification' (DocumentNotification.url)

feat(schema): [non_breaking] Field 'initiativeTab' was added to object type 'Favorite' (Favorite.initiativeTab)

feat(schema): [non_breaking] Field 'url' was added to object type 'Favorite' (Favorite.url)

feat(schema): [non_breaking] Field 'Favorite.projectTeam' description changed from 'The favorited team of the project.' to '[DEPRECATED] The favorited team of the project.' (Favorite.projectTeam)

feat(schema): [non_breaking] Input field 'GitHubSettingsInput.orgAvatarUrl' changed type from 'String!' to 'String' (GitHubSettingsInput.orgAvatarUrl)

feat(schema): [non_breaking] Field 'Initiative.description' description changed from '[Internal] The description of the initiative.' to 'The description of the initiative.' (Initiative.description)

feat(schema): [non_breaking] Description for argument 'filter' on field 'Initiative.projects' changed from '[Internal] Filter returned projects.' to 'Filter returned projects.' (Initiative.projects.filter)

feat(schema): [non_breaking] Field 'Initiative.targetDateResolution' description changed from '[INTERNAL] The resolution of the initiative's estimated completion date.' to 'The resolution of the initiative's estimated completion date.' (Initiative.targetDateResolution)

feat(schema): [non_breaking] Description '[INTERNAL] An initiative to group projects.' on type 'Initiative' has changed to 'An initiative to group projects.' (Initiative)

feat(schema): [non_breaking] Input field 'InitiativeCreateInput.description' description changed from '[Internal] The description of the initiative.' to 'The description of the initiative.' (InitiativeCreateInput.description)

feat(schema): [non_breaking] Description '[Internal] The properties of the initiative to create.' on type 'InitiativeCreateInput' has changed to 'The properties of the initiative to create.' (InitiativeCreateInput)

feat(schema): [non_breaking] Field 'actorAvatarColor' was added to object type 'InitiativeNotification' (InitiativeNotification.actorAvatarColor)

feat(schema): [non_breaking] Field 'actorAvatarUrl' was added to object type 'InitiativeNotification' (InitiativeNotification.actorAvatarUrl)

feat(schema): [non_breaking] Field 'actorInitials' was added to object type 'InitiativeNotification' (InitiativeNotification.actorInitials)

feat(schema): [non_breaking] Field 'commentId' was added to object type 'InitiativeNotification' (InitiativeNotification.commentId)

feat(schema): [non_breaking] Field 'groupingKey' was added to object type 'InitiativeNotification' (InitiativeNotification.groupingKey)

feat(schema): [non_breaking] Field 'isLinearActor' was added to object type 'InitiativeNotification' (InitiativeNotification.isLinearActor)

feat(schema): [non_breaking] Field 'issueStatusType' was added to object type 'InitiativeNotification' (InitiativeNotification.issueStatusType)

feat(schema): [non_breaking] Field 'parentCommentId' was added to object type 'InitiativeNotification' (InitiativeNotification.parentCommentId)

feat(schema): [non_breaking] Field 'projectUpdateHealth' was added to object type 'InitiativeNotification' (InitiativeNotification.projectUpdateHealth)

feat(schema): [non_breaking] Field 'subtitle' was added to object type 'InitiativeNotification' (InitiativeNotification.subtitle)

feat(schema): [non_breaking] Field 'title' was added to object type 'InitiativeNotification' (InitiativeNotification.title)

feat(schema): [non_breaking] Field 'url' was added to object type 'InitiativeNotification' (InitiativeNotification.url)

feat(schema): [non_breaking] Description '[Internal] The payload returned by the initiative mutations.' on type 'InitiativePayload' has changed to 'The payload returned by the initiative mutations.' (InitiativePayload)

feat(schema): [non_breaking] Description '[INTERNAL] Join table between projects and initiatives.' on type 'InitiativeToProject' has changed to 'Join table between projects and initiatives.' (InitiativeToProject)

feat(schema): [non_breaking] Description '[INTERNAL] The properties of the initiativeToProject to create.' on type 'InitiativeToProjectCreateInput' has changed to 'The properties of the initiativeToProject to create.' (InitiativeToProjectCreateInput)

feat(schema): [non_breaking] Description '[INTERNAL] The result of a initiativeToProject mutation.' on type 'InitiativeToProjectPayload' has changed to 'The result of a initiativeToProject mutation.' (InitiativeToProjectPayload)

feat(schema): [non_breaking] Description '[INTERNAL] The properties of the initiativeToProject to update.' on type 'InitiativeToProjectUpdateInput' has changed to 'The properties of the initiativeToProject to update.' (InitiativeToProjectUpdateInput)

feat(schema): [non_breaking] Input field 'InitiativeUpdateInput.description' description changed from '[Internal] The description of the initiative.' to 'The description of the initiative.' (InitiativeUpdateInput.description)

feat(schema): [non_breaking] Description '[Internal] The properties of the initiative to update.' on type 'InitiativeUpdateInput' has changed to 'The properties of the initiative to update.' (InitiativeUpdateInput)

feat(schema): [non_breaking] Field 'displayName' was added to object type 'IssueImport' (IssueImport.displayName)

feat(schema): [non_breaking] Field 'actorAvatarColor' was added to object type 'IssueNotification' (IssueNotification.actorAvatarColor)

feat(schema): [non_breaking] Field 'actorAvatarUrl' was added to object type 'IssueNotification' (IssueNotification.actorAvatarUrl)

feat(schema): [non_breaking] Field 'actorInitials' was added to object type 'IssueNotification' (IssueNotification.actorInitials)

feat(schema): [non_breaking] Field 'commentId' was added to object type 'IssueNotification' (IssueNotification.commentId)

feat(schema): [non_breaking] Field 'groupingKey' was added to object type 'IssueNotification' (IssueNotification.groupingKey)

feat(schema): [non_breaking] Field 'isLinearActor' was added to object type 'IssueNotification' (IssueNotification.isLinearActor)

feat(schema): [non_breaking] Field 'issueStatusType' was added to object type 'IssueNotification' (IssueNotification.issueStatusType)

feat(schema): [non_breaking] Field 'parentComment' was added to object type 'IssueNotification' (IssueNotification.parentComment)

feat(schema): [non_breaking] Field 'parentCommentId' was added to object type 'IssueNotification' (IssueNotification.parentCommentId)

feat(schema): [non_breaking] Field 'projectUpdateHealth' was added to object type 'IssueNotification' (IssueNotification.projectUpdateHealth)

feat(schema): [non_breaking] Field 'subtitle' was added to object type 'IssueNotification' (IssueNotification.subtitle)

feat(schema): [non_breaking] Field 'title' was added to object type 'IssueNotification' (IssueNotification.title)

feat(schema): [non_breaking] Field 'url' was added to object type 'IssueNotification' (IssueNotification.url)

feat(schema): [non_breaking] Field 'integrationGitHubEnterpriseServerConnect' was added to object type 'Mutation' (Mutation.integrationGitHubEnterpriseServerConnect)

feat(schema): [non_breaking] Field 'Mutation.initiativeArchive' description changed from '[Internal] Archives a initiative.' to 'Archives a initiative.' (Mutation.initiativeArchive)

feat(schema): [non_breaking] Field 'Mutation.initiativeCreate' description changed from '[Internal] Creates a new initiative.' to 'Creates a new initiative.' (Mutation.initiativeCreate)

feat(schema): [non_breaking] Field 'Mutation.initiativeDelete' description changed from '[Internal] Deletes (trashes) an initiative.' to 'Deletes (trashes) an initiative.' (Mutation.initiativeDelete)

feat(schema): [non_breaking] Field 'Mutation.initiativeToProjectCreate' description changed from '[INTERNAL] Creates a new initiativeToProject join.' to 'Creates a new initiativeToProject join.' (Mutation.initiativeToProjectCreate)

feat(schema): [non_breaking] Field 'Mutation.initiativeToProjectDelete' description changed from '[INTERNAL] Deletes a initiativeToProject.' to 'Deletes a initiativeToProject.' (Mutation.initiativeToProjectDelete)

feat(schema): [non_breaking] Field 'Mutation.initiativeToProjectUpdate' description changed from '[INTERNAL] Updates a initiativeToProject.' to 'Updates a initiativeToProject.' (Mutation.initiativeToProjectUpdate)

feat(schema): [non_breaking] Field 'Mutation.initiativeUnarchive' description changed from '[Internal] Unarchives a initiative.' to 'Unarchives a initiative.' (Mutation.initiativeUnarchive)

feat(schema): [non_breaking] Field 'Mutation.initiativeUpdate' description changed from '[Internal] Updates a initiative.' to 'Updates a initiative.' (Mutation.initiativeUpdate)

feat(schema): [non_breaking] Description for argument 'integrationId' on field 'Mutation.issueImportCreateGithub' changed from 'ID of the Github import integration to use to access issues.' to '[DEPRECATED] ID of the Github import integration to use to access issues.' (Mutation.issueImportCreateGithub.integrationId)

feat(schema): [non_breaking] Type for argument 'integrationId' on field 'Mutation.issueImportCreateGithub' changed from 'String!' to 'String' (Mutation.issueImportCreateGithub.integrationId)

feat(schema): [non_breaking] Field 'actorAvatarColor' was added to interface 'Notification' (Notification.actorAvatarColor)

feat(schema): [non_breaking] Field 'actorAvatarUrl' was added to interface 'Notification' (Notification.actorAvatarUrl)

feat(schema): [non_breaking] Field 'actorInitials' was added to interface 'Notification' (Notification.actorInitials)

feat(schema): [non_breaking] Field 'groupingKey' was added to interface 'Notification' (Notification.groupingKey)

feat(schema): [non_breaking] Field 'isLinearActor' was added to interface 'Notification' (Notification.isLinearActor)

feat(schema): [non_breaking] Field 'issueStatusType' was added to interface 'Notification' (Notification.issueStatusType)

feat(schema): [non_breaking] Field 'projectUpdateHealth' was added to interface 'Notification' (Notification.projectUpdateHealth)

feat(schema): [non_breaking] Field 'subtitle' was added to interface 'Notification' (Notification.subtitle)

feat(schema): [non_breaking] Field 'title' was added to interface 'Notification' (Notification.title)

feat(schema): [non_breaking] Field 'url' was added to interface 'Notification' (Notification.url)

feat(schema): [non_breaking] Field 'actorAvatarColor' was added to object type 'OauthClientApprovalNotification' (OauthClientApprovalNotification.actorAvatarColor)

feat(schema): [non_breaking] Field 'actorAvatarUrl' was added to object type 'OauthClientApprovalNotification' (OauthClientApprovalNotification.actorAvatarUrl)

feat(schema): [non_breaking] Field 'actorInitials' was added to object type 'OauthClientApprovalNotification' (OauthClientApprovalNotification.actorInitials)

feat(schema): [non_breaking] Field 'groupingKey' was added to object type 'OauthClientApprovalNotification' (OauthClientApprovalNotification.groupingKey)

feat(schema): [non_breaking] Field 'isLinearActor' was added to object type 'OauthClientApprovalNotification' (OauthClientApprovalNotification.isLinearActor)

feat(schema): [non_breaking] Field 'issueStatusType' was added to object type 'OauthClientApprovalNotification' (OauthClientApprovalNotification.issueStatusType)

feat(schema): [non_breaking] Field 'projectUpdateHealth' was added to object type 'OauthClientApprovalNotification' (OauthClientApprovalNotification.projectUpdateHealth)

feat(schema): [non_breaking] Field 'subtitle' was added to object type 'OauthClientApprovalNotification' (OauthClientApprovalNotification.subtitle)

feat(schema): [non_breaking] Field 'title' was added to object type 'OauthClientApprovalNotification' (OauthClientApprovalNotification.title)

feat(schema): [non_breaking] Field 'url' was added to object type 'OauthClientApprovalNotification' (OauthClientApprovalNotification.url)

feat(schema): [non_breaking] Field 'actorAvatarColor' was added to object type 'ProjectNotification' (ProjectNotification.actorAvatarColor)

feat(schema): [non_breaking] Field 'actorAvatarUrl' was added to object type 'ProjectNotification' (ProjectNotification.actorAvatarUrl)

feat(schema): [non_breaking] Field 'actorInitials' was added to object type 'ProjectNotification' (ProjectNotification.actorInitials)

feat(schema): [non_breaking] Field 'comment' was added to object type 'ProjectNotification' (ProjectNotification.comment)

feat(schema): [non_breaking] Field 'commentId' was added to object type 'ProjectNotification' (ProjectNotification.commentId)

feat(schema): [non_breaking] Field 'groupingKey' was added to object type 'ProjectNotification' (ProjectNotification.groupingKey)

feat(schema): [non_breaking] Field 'isLinearActor' was added to object type 'ProjectNotification' (ProjectNotification.isLinearActor)

feat(schema): [non_breaking] Field 'issueStatusType' was added to object type 'ProjectNotification' (ProjectNotification.issueStatusType)

feat(schema): [non_breaking] Field 'parentComment' was added to object type 'ProjectNotification' (ProjectNotification.parentComment)

feat(schema): [non_breaking] Field 'parentCommentId' was added to object type 'ProjectNotification' (ProjectNotification.parentCommentId)

feat(schema): [non_breaking] Field 'projectUpdateHealth' was added to object type 'ProjectNotification' (ProjectNotification.projectUpdateHealth)

feat(schema): [non_breaking] Field 'subtitle' was added to object type 'ProjectNotification' (ProjectNotification.subtitle)

feat(schema): [non_breaking] Field 'title' was added to object type 'ProjectNotification' (ProjectNotification.title)

feat(schema): [non_breaking] Field 'url' was added to object type 'ProjectNotification' (ProjectNotification.url)

feat(schema): [non_breaking] Description 'A user's web browser push notification subscription.' on type 'PushSubscription' has changed to 'A user's web or mobile push notification subscription.' (PushSubscription)

feat(schema): [non_breaking] Field 'Query.initiative' description changed from '[Internal] One specific initiative.' to 'One specific initiative.' (Query.initiative)

feat(schema): [non_breaking] Field 'Query.initiativeToProject' description changed from '[INTERNAL] One specific initiativeToProject.' to 'One specific initiativeToProject.' (Query.initiativeToProject)

feat(schema): [non_breaking] Field 'Query.initiativeToProjects' description changed from '[INTERNAL] returns a list of initiative to project entities.' to 'returns a list of initiative to project entities.' (Query.initiativeToProjects)

feat(schema): [non_breaking] Field 'Query.initiatives' description changed from '[Internal] All initiatives in the workspace.' to 'All initiatives in the workspace.' (Query.initiatives)

feat(schema): [non_breaking] Field 'data' was added to object type 'TextDraft' (TextDraft.data)

feat(schema): [non_breaking] Description 'A text draft, used for comments and project updates.' on type 'TextDraft' has changed to '[DEPRECATED] A text draft, used for comments and project updates.' (TextDraft)

feat(schema): [non_breaking] Field 'avatarBackgroundColor' was added to object type 'User' (User.avatarBackgroundColor)

feat(schema): [non_breaking] Field 'initials' was added to object type 'User' (User.initials)