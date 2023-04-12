---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'Attachment.sourceType' changed type from 'JSONObject' to 'String' (Attachment.sourceType)

feat(schema): [breaking] Field 'Reaction.user' changed type from 'User!' to 'User' (Reaction.user)

feat(schema): [dangerous] Input field 'projectFilterData' was added to input object type 'CustomViewCreateInput' (CustomViewCreateInput.projectFilterData)

feat(schema): [dangerous] Input field 'projectFilterData' was added to input object type 'CustomViewUpdateInput' (CustomViewUpdateInput.projectFilterData)

feat(schema): [dangerous] Input field 'triagedAt' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.triagedAt)

feat(schema): [dangerous] Input field 'triagedAt' was added to input object type 'IssueFilter' (IssueFilter.triagedAt)

feat(schema): [dangerous] Input field 'triagedAt' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.triagedAt)

feat(schema): [dangerous] Input field 'color' was added to input object type 'RoadmapCreateInput' (RoadmapCreateInput.color)

feat(schema): [dangerous] Input field 'color' was added to input object type 'RoadmapUpdateInput' (RoadmapUpdateInput.color)

feat(schema): [dangerous] Enum value 'insightsHelpDismissed' was added to enum 'UserFlagType' (UserFlagType.insightsHelpDismissed)

feat(schema): [dangerous] Enum value 'milestoneOnboardingIsSeenAndDismissed' was added to enum 'UserFlagType' (UserFlagType.milestoneOnboardingIsSeenAndDismissed)

feat(schema): [non_breaking] Type 'CustomViewSuggestionPayload' was added (CustomViewSuggestionPayload)

feat(schema): [non_breaking] Type 'ExternalUser' was added (ExternalUser)

feat(schema): [non_breaking] Type 'ExternalUserConnection' was added (ExternalUserConnection)

feat(schema): [non_breaking] Type 'ExternalUserEdge' was added (ExternalUserEdge)

feat(schema): [non_breaking] Field 'externalUser' was added to object type 'Comment' (Comment.externalUser)

feat(schema): [non_breaking] Field 'projectFilterData' was added to object type 'CustomView' (CustomView.projectFilterData)

feat(schema): [non_breaking] Field 'externalUserCreator' was added to object type 'Issue' (Issue.externalUserCreator)

feat(schema): [non_breaking] Field 'Issue.priority' description changed from 'The priority of the issue.' to 'The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' (Issue.priority)

feat(schema): [non_breaking] Field 'Issue.projectMilestone' description changed from '[ALPHA] The projectMilestone that the issue is associated with.' to 'The projectMilestone that the issue is associated with.' (Issue.projectMilestone)

feat(schema): [non_breaking] Input field 'IssueCollectionFilter.projectMilestone' description changed from '[ALPHA] Filters that the issues project milestone must satisfy.' to 'Filters that the issues project milestone must satisfy.' (IssueCollectionFilter.projectMilestone)

feat(schema): [non_breaking] Input field 'IssueCreateInput.priority' description changed from 'The priority of the issue.' to 'The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' (IssueCreateInput.priority)

feat(schema): [non_breaking] Input field 'IssueCreateInput.projectMilestoneId' description changed from '[ALPHA] The project milestone associated with the issue.' to 'The project milestone associated with the issue.' (IssueCreateInput.projectMilestoneId)

feat(schema): [non_breaking] Field 'projectMilestoneId' was added to object type 'IssueDraft' (IssueDraft.projectMilestoneId)

feat(schema): [non_breaking] Input field 'IssueFilter.projectMilestone' description changed from '[ALPHA] Filters that the issues project milestone must satisfy.' to 'Filters that the issues project milestone must satisfy.' (IssueFilter.projectMilestone)

feat(schema): [non_breaking] Input field 'IssueUpdateInput.priority' description changed from 'The priority of the issue.' to 'The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.' (IssueUpdateInput.priority)

feat(schema): [non_breaking] Input field 'IssueUpdateInput.projectMilestoneId' description changed from '[ALPHA] The project milestone associated with the issue.' to 'The project milestone associated with the issue.' (IssueUpdateInput.projectMilestoneId)

feat(schema): [non_breaking] Input field 'NullableIssueFilter.projectMilestone' description changed from '[ALPHA] Filters that the issues project milestone must satisfy.' to 'Filters that the issues project milestone must satisfy.' (NullableIssueFilter.projectMilestone)

feat(schema): [non_breaking] Description '[ALPHA] Project milestone filtering options.' on type 'NullableProjectMilestoneFilter' has changed to 'Project milestone filtering options.' (NullableProjectMilestoneFilter)

feat(schema): [non_breaking] Field 'Project.projectMilestones' description changed from '[ALPHA] Milestones associated with the project.' to 'Milestones associated with the project.' (Project.projectMilestones)

feat(schema): [non_breaking] Field 'customViewSuggestion' was added to object type 'Query' (Query.customViewSuggestion)

feat(schema): [non_breaking] Field 'externalUser' was added to object type 'Query' (Query.externalUser)

feat(schema): [non_breaking] Field 'externalUsers' was added to object type 'Query' (Query.externalUsers)

feat(schema): [non_breaking] Field 'color' was added to object type 'Roadmap' (Roadmap.color)

feat(schema): [non_breaking] Field 'User.calendarHash' description changed from 'Hash for the user to be used in calendar URLs.' to '[DEPRECATED] Hash for the user to be used in calendar URLs.' (User.calendarHash)

feat(schema): [non_breaking] Field 'calendarHash' was added to object type 'UserSettings' (UserSettings.calendarHash)