---
"@linear/sdk": minor
---


feat(schema): [breaking] Type 'TimelessDateScalar' was removed (TimelessDateScalar)

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