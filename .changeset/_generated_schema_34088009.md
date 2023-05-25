---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'ExternalUser.email' changed type from 'String!' to 'String' (ExternalUser.email)

feat(schema): [breaking] 'OrganizationInviteDetailsPayload' kind changed from 'ObjectTypeDefinition' to 'UnionTypeDefinition' (OrganizationInviteDetailsPayload)

feat(schema): [dangerous] Input field 'completedProjectMilestones' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.completedProjectMilestones)

feat(schema): [dangerous] Input field 'nextProjectMilestone' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.nextProjectMilestone)

feat(schema): [dangerous] Input field 'projectMilestones' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.projectMilestones)

feat(schema): [dangerous] Input field 'name' was added to input object type 'NullableProjectMilestoneFilter' (NullableProjectMilestoneFilter.name)

feat(schema): [dangerous] Input field 'targetDate' was added to input object type 'NullableProjectMilestoneFilter' (NullableProjectMilestoneFilter.targetDate)

feat(schema): [dangerous] Input field 'completedProjectMilestones' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.completedProjectMilestones)

feat(schema): [dangerous] Input field 'nextProjectMilestone' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.nextProjectMilestone)

feat(schema): [dangerous] Input field 'projectMilestones' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.projectMilestones)

feat(schema): [dangerous] Input field 'completedProjectMilestones' was added to input object type 'ProjectFilter' (ProjectFilter.completedProjectMilestones)

feat(schema): [dangerous] Input field 'nextProjectMilestone' was added to input object type 'ProjectFilter' (ProjectFilter.nextProjectMilestone)

feat(schema): [dangerous] Input field 'projectMilestones' was added to input object type 'ProjectFilter' (ProjectFilter.projectMilestones)

feat(schema): [dangerous] Argument 'filter: ProjectMilestoneFilter' added to field 'Query.ProjectMilestones' (Query.ProjectMilestones.filter)

feat(schema): [non_breaking] Type 'OrganizationAcceptedOrExpiredInviteDetailsPayload' was added (OrganizationAcceptedOrExpiredInviteDetailsPayload)

feat(schema): [non_breaking] Type 'OrganizationInviteFullDetailsPayload' was added (OrganizationInviteFullDetailsPayload)

feat(schema): [non_breaking] Type 'OrganizationInviteStatus' was added (OrganizationInviteStatus)

feat(schema): [non_breaking] Type 'ProjectMilestoneCollectionFilter' was added (ProjectMilestoneCollectionFilter)

feat(schema): [non_breaking] Type 'ProjectMilestoneFilter' was added (ProjectMilestoneFilter)

feat(schema): [non_breaking] Field 'userJiraConnect' was added to object type 'Mutation' (Mutation.userJiraConnect)

feat(schema): [non_breaking] Field 'infoSnapshot' was added to object type 'ProjectUpdate' (ProjectUpdate.infoSnapshot)

feat(schema): [non_breaking] Field 'Team.issueEstimationType' description changed from 'The issue estimation type to use.' to 'The issue estimation type to use. Must be one of "notUsed", "exponential", "fibonacci", "linear", "tShirt".' (Team.issueEstimationType)

feat(schema): [non_breaking] Input field 'TeamCreateInput.issueEstimationType' description changed from 'The issue estimation type to use.' to 'The issue estimation type to use. Must be one of "notUsed", "exponential", "fibonacci", "linear", "tShirt".' (TeamCreateInput.issueEstimationType)

feat(schema): [non_breaking] Input field 'TeamUpdateInput.issueEstimationType' description changed from 'The issue estimation type to use.' to 'The issue estimation type to use. Must be one of "notUsed", "exponential", "fibonacci", "linear", "tShirt".' (TeamUpdateInput.issueEstimationType)

feat(schema): [non_breaking] Field 'showFullUserNames' was added to object type 'UserSettings' (UserSettings.showFullUserNames)