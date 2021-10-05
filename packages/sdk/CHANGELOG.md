# Change Log

## 1.21.0

### Minor Changes

- 91374ca: feat(schema): [breaking] Type 'TimelessDateScalar' was removed (TimelessDateScalar)

  feat(schema): [breaking] Input field 'filterMatchValue' was removed from input object type 'AttachmentFilter' (AttachmentFilter.filterMatchValue)

  feat(schema): [breaking] Field 'Favorite.projectTeam' changed type from 'Project' to 'Team' (Favorite.projectTeam)

  feat(schema): [breaking] Field 'Invoice.dueDate' changed type from 'TimelessDateScalar' to 'TimelessDate' (Invoice.dueDate)

  feat(schema): [breaking] Field 'Issue.dueDate' changed type from 'TimelessDateScalar' to 'TimelessDate' (Issue.dueDate)

  feat(schema): [breaking] Input field 'IssueCreateInput.dueDate' changed type from 'TimelessDateScalar' to 'TimelessDate' (IssueCreateInput.dueDate)

  feat(schema): [breaking] Input field 'comment' was removed from input object type 'IssueFilter' (IssueFilter.comment)

  feat(schema): [breaking] Input field 'IssueFilter.autoArchivedAt' changed type from 'DateComparator' to 'NullableDateComparator' (IssueFilter.autoArchivedAt)

  feat(schema): [breaking] Input field 'IssueFilter.autoClosedAt' changed type from 'DateComparator' to 'NullableDateComparator' (IssueFilter.autoClosedAt)

  feat(schema): [breaking] Input field 'IssueFilter.canceledAt' changed type from 'DateComparator' to 'NullableDateComparator' (IssueFilter.canceledAt)

  feat(schema): [breaking] Input field 'IssueFilter.children' changed type from 'IssueFilter' to 'IssueCollectionFilter' (IssueFilter.children)

  feat(schema): [breaking] Input field 'IssueFilter.completedAt' changed type from 'DateComparator' to 'NullableDateComparator' (IssueFilter.completedAt)

  feat(schema): [breaking] Input field 'IssueFilter.dueDate' changed type from 'TimelessDateComparator' to 'NullableTimelessDateComparator' (IssueFilter.dueDate)

  feat(schema): [breaking] Input field 'IssueFilter.labels' changed type from 'IssueLabelFilter' to 'IssueLabelCollectionFilter' (IssueFilter.labels)

  feat(schema): [breaking] Input field 'IssueFilter.priority' changed type from 'NumberComparator' to 'NullableNumberComparator' (IssueFilter.priority)

  feat(schema): [breaking] Input field 'IssueFilter.snoozedUntilAt' changed type from 'DateComparator' to 'NullableDateComparator' (IssueFilter.snoozedUntilAt)

  feat(schema): [breaking] Input field 'IssueFilter.startedAt' changed type from 'DateComparator' to 'NullableDateComparator' (IssueFilter.startedAt)

  feat(schema): [breaking] Field 'IssueHistory.fromDueDate' changed type from 'TimelessDateScalar' to 'TimelessDate' (IssueHistory.fromDueDate)

  feat(schema): [breaking] Field 'IssueHistory.toDueDate' changed type from 'TimelessDateScalar' to 'TimelessDate' (IssueHistory.toDueDate)

  feat(schema): [breaking] Input field 'IssueUpdateInput.dueDate' changed type from 'TimelessDateScalar' to 'TimelessDate' (IssueUpdateInput.dueDate)

  feat(schema): [breaking] Input field 'MilestoneFilter.projects' changed type from 'UserFilter' to 'ProjectCollectionFilter' (MilestoneFilter.projects)

  feat(schema): [breaking] Input field 'MilestoneFilter.sortOrder' changed type from 'StringComparator' to 'NumberComparator' (MilestoneFilter.sortOrder)

  feat(schema): [breaking] Input field 'NullableMilestoneFilter.projects' changed type from 'UserFilter' to 'ProjectCollectionFilter' (NullableMilestoneFilter.projects)

  feat(schema): [breaking] Input field 'NullableMilestoneFilter.sortOrder' changed type from 'StringComparator' to 'NumberComparator' (NullableMilestoneFilter.sortOrder)

  feat(schema): [breaking] Input field 'NullableProjectFilter.startDate' changed type from 'DateComparator' to 'NullableDateComparator' (NullableProjectFilter.startDate)

  feat(schema): [breaking] Input field 'NullableProjectFilter.targetDate' changed type from 'DateComparator' to 'NullableDateComparator' (NullableProjectFilter.targetDate)

  feat(schema): [breaking] Input field 'verified' was removed from input object type 'OrganizationDomainCreateInput' (OrganizationDomainCreateInput.verified)

  feat(schema): [breaking] Field 'Project.startDate' changed type from 'TimelessDateScalar' to 'TimelessDate' (Project.startDate)

  feat(schema): [breaking] Field 'Project.targetDate' changed type from 'TimelessDateScalar' to 'TimelessDate' (Project.targetDate)

  feat(schema): [breaking] Input field 'ProjectCreateInput.startDate' changed type from 'TimelessDateScalar' to 'TimelessDate' (ProjectCreateInput.startDate)

  feat(schema): [breaking] Input field 'ProjectCreateInput.targetDate' changed type from 'TimelessDateScalar' to 'TimelessDate' (ProjectCreateInput.targetDate)

  feat(schema): [breaking] Input field 'ProjectFilter.startDate' changed type from 'DateComparator' to 'NullableDateComparator' (ProjectFilter.startDate)

  feat(schema): [breaking] Input field 'ProjectFilter.targetDate' changed type from 'DateComparator' to 'NullableDateComparator' (ProjectFilter.targetDate)

  feat(schema): [breaking] Input field 'ProjectUpdateInput.startDate' changed type from 'TimelessDateScalar' to 'TimelessDate' (ProjectUpdateInput.startDate)

  feat(schema): [breaking] Input field 'ProjectUpdateInput.targetDate' changed type from 'TimelessDateScalar' to 'TimelessDate' (ProjectUpdateInput.targetDate)

  feat(schema): [breaking] Input field 'TeamFilter.description' changed type from 'StringComparator' to 'NullableStringComparator' (TeamFilter.description)

  feat(schema): [breaking] Input field 'TimelessDateComparator.eq' changed type from 'TimelessDateScalar' to 'TimelessDate' (TimelessDateComparator.eq)

  feat(schema): [breaking] Input field 'TimelessDateComparator.gt' changed type from 'TimelessDateScalar' to 'TimelessDate' (TimelessDateComparator.gt)

  feat(schema): [breaking] Input field 'TimelessDateComparator.gte' changed type from 'TimelessDateScalar' to 'TimelessDate' (TimelessDateComparator.gte)

  feat(schema): [breaking] Input field 'TimelessDateComparator.in' changed type from '[TimelessDateScalar!]' to '[TimelessDate!]' (TimelessDateComparator.in)

  feat(schema): [breaking] Input field 'TimelessDateComparator.lt' changed type from 'TimelessDateScalar' to 'TimelessDate' (TimelessDateComparator.lt)

  feat(schema): [breaking] Input field 'TimelessDateComparator.lte' changed type from 'TimelessDateScalar' to 'TimelessDate' (TimelessDateComparator.lte)

  feat(schema): [breaking] Input field 'TimelessDateComparator.neq' changed type from 'TimelessDateScalar' to 'TimelessDate' (TimelessDateComparator.neq)

  feat(schema): [breaking] Input field 'TimelessDateComparator.nin' changed type from '[TimelessDateScalar!]' to '[TimelessDate!]' (TimelessDateComparator.nin)

  feat(schema): [dangerous] Input field 'creator' was added to input object type 'AttachmentFilter' (AttachmentFilter.creator)

  feat(schema): [dangerous] Input field 'sourceType' was added to input object type 'AttachmentFilter' (AttachmentFilter.sourceType)

  feat(schema): [dangerous] Input field 'subtitle' was added to input object type 'AttachmentFilter' (AttachmentFilter.subtitle)

  feat(schema): [dangerous] Input field 'title' was added to input object type 'AttachmentFilter' (AttachmentFilter.title)

  feat(schema): [dangerous] Input field 'url' was added to input object type 'AttachmentFilter' (AttachmentFilter.url)

  feat(schema): [dangerous] Input field 'issue' was added to input object type 'CommentFilter' (CommentFilter.issue)

  feat(schema): [dangerous] Input field 'issues' was added to input object type 'CycleFilter' (CycleFilter.issues)

  feat(schema): [dangerous] Input field 'folderName' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.folderName)

  feat(schema): [dangerous] Input field 'parentId' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.parentId)

  feat(schema): [dangerous] Input field 'parentId' was added to input object type 'FavoriteUpdateInput' (FavoriteUpdateInput.parentId)

  feat(schema): [dangerous] Input field 'comments' was added to input object type 'IssueFilter' (IssueFilter.comments)

  feat(schema): [dangerous] Input field 'description' was added to input object type 'IssueFilter' (IssueFilter.description)

  feat(schema): [dangerous] Argument 'coupon: String' added to field 'Mutation.subscriptionSessionCreate' (Mutation.subscriptionSessionCreate.coupon)

  feat(schema): [dangerous] Input field 'issues' was added to input object type 'NullableCycleFilter' (NullableCycleFilter.issues)

  feat(schema): [dangerous] Input field 'issues' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.issues)

  feat(schema): [dangerous] Input field 'assignedIssues' was added to input object type 'NullableUserFilter' (NullableUserFilter.assignedIssues)

  feat(schema): [dangerous] Input field 'issues' was added to input object type 'ProjectFilter' (ProjectFilter.issues)

  feat(schema): [dangerous] Argument 'filter: IssueFilter' added to field 'Query.issueSearch' (Query.issueSearch.filter)

  feat(schema): [dangerous] Input field 'issuerEntityId' was added to input object type 'SamlConfigurationInput' (SamlConfigurationInput.issuerEntityId)

  feat(schema): [dangerous] Input field 'notContains' was added to input object type 'StringComparator' (StringComparator.notContains)

  feat(schema): [dangerous] Input field 'notEndsWith' was added to input object type 'StringComparator' (StringComparator.notEndsWith)

  feat(schema): [dangerous] Input field 'notStartsWith' was added to input object type 'StringComparator' (StringComparator.notStartsWith)

  feat(schema): [dangerous] Input field 'issues' was added to input object type 'TeamFilter' (TeamFilter.issues)

  feat(schema): [dangerous] Input field 'assignedIssues' was added to input object type 'UserFilter' (UserFilter.assignedIssues)

  feat(schema): [dangerous] Input field 'issues' was added to input object type 'WorkflowStateFilter' (WorkflowStateFilter.issues)

  feat(schema): [non_breaking] Type 'BooleanComparator' was added (BooleanComparator)

  feat(schema): [non_breaking] Type 'CommentCollectionFilter' was added (CommentCollectionFilter)

  feat(schema): [non_breaking] Type 'IssueCollectionFilter' was added (IssueCollectionFilter)

  feat(schema): [non_breaking] Type 'IssueLabelCollectionFilter' was added (IssueLabelCollectionFilter)

  feat(schema): [non_breaking] Type 'NestedStringComparator' was added (NestedStringComparator)

  feat(schema): [non_breaking] Type 'NullableDateComparator' was added (NullableDateComparator)

  feat(schema): [non_breaking] Type 'NullableNumberComparator' was added (NullableNumberComparator)

  feat(schema): [non_breaking] Type 'NullableStringComparator' was added (NullableStringComparator)

  feat(schema): [non_breaking] Type 'NullableTimelessDateComparator' was added (NullableTimelessDateComparator)

  feat(schema): [non_breaking] Type 'ProjectCollectionFilter' was added (ProjectCollectionFilter)

  feat(schema): [non_breaking] Type 'TimelessDate' was added (TimelessDate)

  feat(schema): [non_breaking] Field 'creator' was added to object type 'Attachment' (Attachment.creator)

  feat(schema): [non_breaking] Field 'sourceType' was added to object type 'Attachment' (Attachment.sourceType)

  feat(schema): [non_breaking] Description '[Alpha] Project filtering options.' on type 'AttachmentFilter' has changed to '[Alpha] Attachment filtering options.' (AttachmentFilter)

  feat(schema): [non_breaking] Object type 'DateComparator' has description 'Comparator for dates.' (DateComparator)

  feat(schema): [non_breaking] Description 'The javascript `Date` as string. Type represents date and time as the ISO Date string.' on type 'DateTime' has changed to 'Represents a date and time in ISO 8601 format. Accepts shortcuts like `2021` to represent midnight Fri Jan 01 2021. Also accepts ISO 8601 durations strings which are added to the current date to create the represented date (e.g '-P2W1D' represents the date that was two weeks and 1 day ago)' (DateTime)

  feat(schema): [non_breaking] Field 'children' was added to object type 'Favorite' (Favorite.children)

  feat(schema): [non_breaking] Field 'customView' was added to object type 'Favorite' (Favorite.customView)

  feat(schema): [non_breaking] Field 'folderName' was added to object type 'Favorite' (Favorite.folderName)

  feat(schema): [non_breaking] Field 'parent' was added to object type 'Favorite' (Favorite.parent)

  feat(schema): [non_breaking] Field 'Favorite.cycle' description changed from 'Favorited cycle.' to 'The favorited cycle.' (Favorite.cycle)

  feat(schema): [non_breaking] Field 'Favorite.issue' description changed from 'Favorited issue.' to 'The favorited issue.' (Favorite.issue)

  feat(schema): [non_breaking] Field 'Favorite.label' description changed from 'Favorited issue label.' to 'The favorited label.' (Favorite.label)

  feat(schema): [non_breaking] Field 'Favorite.project' description changed from 'Favorited project.' to 'The favorited project.' (Favorite.project)

  feat(schema): [non_breaking] Field 'Favorite.projectTeam' description changed from 'Favorited project team.' to 'The favorited team of the project.' (Favorite.projectTeam)

  feat(schema): [non_breaking] Object type 'IDComparator' has description 'Comparator for identifiers.' (IDComparator)

  feat(schema): [non_breaking] Input field 'IssueFilter.labels' description changed from 'Filters that at least one label on the issue must satisfy.' to 'Filters that issue labels must satisfy.' (IssueFilter.labels)

  feat(schema): [non_breaking] Object type 'NumberComparator' has description 'Comparator for numbers.' (NumberComparator)

  feat(schema): [non_breaking] Field 'issuerEntityId' was added to object type 'SamlConfiguration' (SamlConfiguration.issuerEntityId)

  feat(schema): [non_breaking] Input field 'StringComparator.contains' description changed from 'Has constraint. Matches any value that contains the given string.' to 'Contains constraint. Matches any values that contain the given string.' (StringComparator.contains)

  feat(schema): [non_breaking] Input field 'StringComparator.endsWith' description changed from 'Ends with constraint. Matches any value that ends with the given string.' to 'Ends with constraint. Matches any values that end with the given string.' (StringComparator.endsWith)

  feat(schema): [non_breaking] Input field 'StringComparator.startsWith' description changed from 'Starts with constraint. Matches any value that starts with the given string.' to 'Starts with constraint. Matches any values that start with the given string.' (StringComparator.startsWith)

  feat(schema): [non_breaking] Object type 'StringComparator' has description 'Comparator for strings.' (StringComparator)

  feat(schema): [non_breaking] Object type 'TimelessDateComparator' has description 'Comparator for timeless dates.' (TimelessDateComparator)

## 1.20.0

### Minor Changes

- 9476c32: feat(schema): [dangerous] Argument 'filter: IssueFilter' added to field 'Cycle.issues' (Cycle.issues.filter)

  feat(schema): [dangerous] Argument 'filter: IssueFilter' added to field 'Cycle.uncompletedIssuesUponClose' (Cycle.uncompletedIssuesUponClose.filter)

  feat(schema): [dangerous] Argument 'filter: AttachmentFilter' added to field 'Issue.attachments' (Issue.attachments.filter)

  feat(schema): [dangerous] Argument 'filter: IssueFilter' added to field 'Issue.children' (Issue.children.filter)

  feat(schema): [dangerous] Argument 'filter: CommentFilter' added to field 'Issue.comments' (Issue.comments.filter)

  feat(schema): [dangerous] Argument 'filter: IssueLabelFilter' added to field 'Issue.labels' (Issue.labels.filter)

  feat(schema): [dangerous] Argument 'filter: UserFilter' added to field 'Issue.subscribers' (Issue.subscribers.filter)

  feat(schema): [dangerous] Argument 'filter: IssueFilter' added to field 'IssueLabel.issues' (IssueLabel.issues.filter)

  feat(schema): [dangerous] Argument 'filter: ProjectFilter' added to field 'Milestone.projects' (Milestone.projects.filter)

  feat(schema): [dangerous] Argument 'filter: MilestoneFilter' added to field 'Organization.milestones' (Organization.milestones.filter)

  feat(schema): [dangerous] Argument 'filter: TeamFilter' added to field 'Organization.teams' (Organization.teams.filter)

  feat(schema): [dangerous] Argument 'filter: IssueFilter' added to field 'Project.issues' (Project.issues.filter)

  feat(schema): [dangerous] Argument 'filter: UserFilter' added to field 'Project.members' (Project.members.filter)

  feat(schema): [dangerous] Argument 'filter: TeamFilter' added to field 'Project.teams' (Project.teams.filter)

  feat(schema): [dangerous] Argument 'filter: AttachmentFilter' added to field 'Query.attachments' (Query.attachments.filter)

  feat(schema): [dangerous] Argument 'filter: CommentFilter' added to field 'Query.comments' (Query.comments.filter)

  feat(schema): [dangerous] Argument 'filter: CycleFilter' added to field 'Query.cycles' (Query.cycles.filter)

  feat(schema): [dangerous] Argument 'filter: IssueLabelFilter' added to field 'Query.issueLabels' (Query.issueLabels.filter)

  feat(schema): [dangerous] Argument 'filter: IssueFilter' added to field 'Query.issues' (Query.issues.filter)

  feat(schema): [dangerous] Argument 'filter: MilestoneFilter' added to field 'Query.milestones' (Query.milestones.filter)

  feat(schema): [dangerous] Argument 'filter: ProjectFilter' added to field 'Query.projects' (Query.projects.filter)

  feat(schema): [dangerous] Argument 'filter: TeamFilter' added to field 'Query.teams' (Query.teams.filter)

  feat(schema): [dangerous] Argument 'filter: UserFilter' added to field 'Query.users' (Query.users.filter)

  feat(schema): [dangerous] Argument 'filter: WorkflowStateFilter' added to field 'Query.workflowStates' (Query.workflowStates.filter)

  feat(schema): [dangerous] Argument 'filter: CycleFilter' added to field 'Team.cycles' (Team.cycles.filter)

  feat(schema): [dangerous] Argument 'filter: IssueFilter' added to field 'Team.issues' (Team.issues.filter)

  feat(schema): [dangerous] Argument 'filter: IssueLabelFilter' added to field 'Team.labels' (Team.labels.filter)

  feat(schema): [dangerous] Argument 'filter: UserFilter' added to field 'Team.members' (Team.members.filter)

  feat(schema): [dangerous] Argument 'filter: ProjectFilter' added to field 'Team.projects' (Team.projects.filter)

  feat(schema): [dangerous] Argument 'filter: WorkflowStateFilter' added to field 'Team.states' (Team.states.filter)

  feat(schema): [dangerous] Argument 'filter: IssueFilter' added to field 'User.assignedIssues' (User.assignedIssues.filter)

  feat(schema): [dangerous] Argument 'filter: IssueFilter' added to field 'User.createdIssues' (User.createdIssues.filter)

  feat(schema): [dangerous] Argument 'filter: TeamFilter' added to field 'User.teams' (User.teams.filter)

  feat(schema): [dangerous] Argument 'filter: IssueFilter' added to field 'WorkflowState.issues' (WorkflowState.issues.filter)

  feat(schema): [non_breaking] Type 'AttachmentFilter' was added (AttachmentFilter)

  feat(schema): [non_breaking] Type 'CommentFilter' was added (CommentFilter)

  feat(schema): [non_breaking] Type 'CycleFilter' was added (CycleFilter)

  feat(schema): [non_breaking] Type 'DateComparator' was added (DateComparator)

  feat(schema): [non_breaking] Type 'IDComparator' was added (IDComparator)

  feat(schema): [non_breaking] Type 'IssueFilter' was added (IssueFilter)

  feat(schema): [non_breaking] Type 'IssueLabelFilter' was added (IssueLabelFilter)

  feat(schema): [non_breaking] Type 'MilestoneFilter' was added (MilestoneFilter)

  feat(schema): [non_breaking] Type 'NullableCycleFilter' was added (NullableCycleFilter)

  feat(schema): [non_breaking] Type 'NullableMilestoneFilter' was added (NullableMilestoneFilter)

  feat(schema): [non_breaking] Type 'NullableProjectFilter' was added (NullableProjectFilter)

  feat(schema): [non_breaking] Type 'NullableUserFilter' was added (NullableUserFilter)

  feat(schema): [non_breaking] Type 'NumberComparator' was added (NumberComparator)

  feat(schema): [non_breaking] Type 'ProjectFilter' was added (ProjectFilter)

  feat(schema): [non_breaking] Type 'StringComparator' was added (StringComparator)

  feat(schema): [non_breaking] Type 'TeamFilter' was added (TeamFilter)

  feat(schema): [non_breaking] Type 'TimelessDateComparator' was added (TimelessDateComparator)

  feat(schema): [non_breaking] Type 'UserFilter' was added (UserFilter)

  feat(schema): [non_breaking] Type 'WorkflowStateFilter' was added (WorkflowStateFilter)

## 1.19.0

### Minor Changes

- e0ac1be: feat(schema): [breaking] Type 'InviteData' was removed (InviteData)

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

- a5b9970: fix(pagination): default first and last variables if required

## 1.18.0

### Minor Changes

- 90de5e9: feat(schema): [dangerous] Input field 'referenceCommentId' was added to input object type 'IssueCreateInput' (IssueCreateInput.referenceCommentId)

### Patch Changes

- d3badec: chore(deps): update dependency patch versions

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
