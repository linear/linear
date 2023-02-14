---
"@linear/sdk": minor
---


feat(schema): [breaking] Type 'Initiative' was removed (Initiative)

feat(schema): [breaking] Type 'InitiativeConnection' was removed (InitiativeConnection)

feat(schema): [breaking] Type 'InitiativeEdge' was removed (InitiativeEdge)

feat(schema): [breaking] Type 'Milestone' was removed (Milestone)

feat(schema): [breaking] Type 'MilestoneConnection' was removed (MilestoneConnection)

feat(schema): [breaking] Type 'MilestoneCreateInput' was removed (MilestoneCreateInput)

feat(schema): [breaking] Type 'MilestoneEdge' was removed (MilestoneEdge)

feat(schema): [breaking] Type 'MilestoneMigrationPayload' was removed (MilestoneMigrationPayload)

feat(schema): [breaking] Type 'MilestonePayload' was removed (MilestonePayload)

feat(schema): [breaking] Type 'MilestoneUpdateInput' was removed (MilestoneUpdateInput)

feat(schema): [breaking] Type 'MilestonesMigrateInput' was removed (MilestonesMigrateInput)

feat(schema): [breaking] Type 'NestedStringComparator' was removed (NestedStringComparator)

feat(schema): [breaking] Type 'UserAccountEmailChangeFindPayload' was removed (UserAccountEmailChangeFindPayload)

feat(schema): [breaking] Type 'UserAccountEmailChangeVerifyCodePayload' was removed (UserAccountEmailChangeVerifyCodePayload)

feat(schema): [breaking] Type 'UserAccountEmailVerificationPayload' was removed (UserAccountEmailVerificationPayload)

feat(schema): [breaking] Type 'WorkflowConditions' was removed (WorkflowConditions)

feat(schema): [breaking] Type 'WorkflowEntityPropertyMatcher' was removed (WorkflowEntityPropertyMatcher)

feat(schema): [breaking] Input field 'AttachmentCollectionFilter.sourceType' changed type from 'NestedStringComparator' to 'SourceTypeComparator' (AttachmentCollectionFilter.sourceType)

feat(schema): [breaking] Input field 'AttachmentFilter.sourceType' changed type from 'NestedStringComparator' to 'SourceTypeComparator' (AttachmentFilter.sourceType)

feat(schema): [breaking] Field 'slackProjectUpdateCreatedToMilestone' was removed from object type 'IntegrationsSettings' (IntegrationsSettings.slackProjectUpdateCreatedToMilestone)

feat(schema): [breaking] Input field 'slackProjectUpdateCreatedToMilestone' was removed from input object type 'IntegrationsSettingsCreateInput' (IntegrationsSettingsCreateInput.slackProjectUpdateCreatedToMilestone)

feat(schema): [breaking] Input field 'slackProjectUpdateCreatedToMilestone' was removed from input object type 'IntegrationsSettingsUpdateInput' (IntegrationsSettingsUpdateInput.slackProjectUpdateCreatedToMilestone)

feat(schema): [breaking] Field 'migrateMilestonesToRoadmaps' was removed from object type 'Mutation' (Mutation.migrateMilestonesToRoadmaps)

feat(schema): [breaking] Field 'milestoneCreate' (deprecated) was removed from object type 'Mutation' (Mutation.milestoneCreate)

feat(schema): [breaking] Field 'milestoneDelete' (deprecated) was removed from object type 'Mutation' (Mutation.milestoneDelete)

feat(schema): [breaking] Field 'milestoneUpdate' (deprecated) was removed from object type 'Mutation' (Mutation.milestoneUpdate)

feat(schema): [breaking] Field 'userAccountEmailChangeCancel' was removed from object type 'Mutation' (Mutation.userAccountEmailChangeCancel)

feat(schema): [breaking] Field 'userAccountEmailChangeCreate' was removed from object type 'Mutation' (Mutation.userAccountEmailChangeCreate)

feat(schema): [breaking] Field 'userAccountEmailChangeVerifyCode' was removed from object type 'Mutation' (Mutation.userAccountEmailChangeVerifyCode)

feat(schema): [breaking] Field 'initiative' was removed from object type 'Project' (Project.initiative)

feat(schema): [breaking] Field 'milestone' (deprecated) was removed from object type 'Project' (Project.milestone)

feat(schema): [breaking] Input field 'milestoneId' was removed from input object type 'ProjectCreateInput' (ProjectCreateInput.milestoneId)

feat(schema): [breaking] Input field 'milestoneId' was removed from input object type 'ProjectUpdateInput' (ProjectUpdateInput.milestoneId)

feat(schema): [breaking] Field 'milestone' (deprecated) was removed from object type 'Query' (Query.milestone)

feat(schema): [breaking] Field 'milestones' (deprecated) was removed from object type 'Query' (Query.milestones)

feat(schema): [breaking] Field 'userAccountEmailChangeFind' was removed from object type 'Query' (Query.userAccountEmailChangeFind)

feat(schema): [breaking] Field 'organization' was removed from object type 'WorkflowDefinition' (WorkflowDefinition.organization)

feat(schema): [breaking] Field 'WorkflowDefinition.team' changed type from 'Team!' to 'Team' (WorkflowDefinition.team)

feat(schema): [breaking] Field 'WorkflowDefinition.trigger' changed type from 'WorkflowTriggerType!' to 'WorkflowTrigger!' (WorkflowDefinition.trigger)

feat(schema): [breaking] Enum value 'cron' was removed from enum 'WorkflowTriggerType' (WorkflowTriggerType.cron)

feat(schema): [breaking] Enum value 'issueCreated' was removed from enum 'WorkflowTriggerType' (WorkflowTriggerType.issueCreated)

feat(schema): [breaking] Enum value 'issueDeleted' was removed from enum 'WorkflowTriggerType' (WorkflowTriggerType.issueDeleted)

feat(schema): [breaking] Enum value 'issueUpdated' was removed from enum 'WorkflowTriggerType' (WorkflowTriggerType.issueUpdated)

feat(schema): [dangerous] Input field 'doNotSubscribeToIssue' was added to input object type 'CommentCreateInput' (CommentCreateInput.doNotSubscribeToIssue)

feat(schema): [dangerous] Input field 'notion' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.notion)

feat(schema): [dangerous] Input field 'slackIssueAddedToTriage' was added to input object type 'IntegrationsSettingsCreateInput' (IntegrationsSettingsCreateInput.slackIssueAddedToTriage)

feat(schema): [dangerous] Input field 'slackIssueSlaBreached' was added to input object type 'IntegrationsSettingsCreateInput' (IntegrationsSettingsCreateInput.slackIssueSlaBreached)

feat(schema): [dangerous] Input field 'slackIssueSlaHighRisk' was added to input object type 'IntegrationsSettingsCreateInput' (IntegrationsSettingsCreateInput.slackIssueSlaHighRisk)

feat(schema): [dangerous] Input field 'slackIssueAddedToTriage' was added to input object type 'IntegrationsSettingsUpdateInput' (IntegrationsSettingsUpdateInput.slackIssueAddedToTriage)

feat(schema): [dangerous] Input field 'slackIssueSlaBreached' was added to input object type 'IntegrationsSettingsUpdateInput' (IntegrationsSettingsUpdateInput.slackIssueSlaBreached)

feat(schema): [dangerous] Input field 'slackIssueSlaHighRisk' was added to input object type 'IntegrationsSettingsUpdateInput' (IntegrationsSettingsUpdateInput.slackIssueSlaHighRisk)

feat(schema): [dangerous] Input field 'slaStatus' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.slaStatus)

feat(schema): [dangerous] Input field 'projectMilestoneId' was added to input object type 'IssueCreateInput' (IssueCreateInput.projectMilestoneId)

feat(schema): [dangerous] Input field 'slaStatus' was added to input object type 'IssueFilter' (IssueFilter.slaStatus)

feat(schema): [dangerous] Input field 'projectMilestoneId' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.projectMilestoneId)

feat(schema): [dangerous] Input field 'slaBreachesAt' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.slaBreachesAt)

feat(schema): [dangerous] Argument 'id: String' added to field 'Mutation.attachmentLinkURL' (Mutation.attachmentLinkURL.id)

feat(schema): [dangerous] Input field 'teamNotificationSubscriptionTypes' was added to input object type 'NotificationSubscriptionCreateInput' (NotificationSubscriptionCreateInput.teamNotificationSubscriptionTypes)

feat(schema): [dangerous] Input field 'teamNotificationSubscriptionTypes' was added to input object type 'NotificationSubscriptionUpdateInput' (NotificationSubscriptionUpdateInput.teamNotificationSubscriptionTypes)

feat(schema): [dangerous] Input field 'slaStatus' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.slaStatus)

feat(schema): [dangerous] Input field 'slaEnabled' was added to input object type 'UpdateOrganizationInput' (UpdateOrganizationInput.slaEnabled)

feat(schema): [dangerous] Enum value 'myIssuesActivity' was added to enum 'ViewType' (ViewType.myIssuesActivity)

feat(schema): [dangerous] Enum value 'myIssuesTouchedByMe' was added to enum 'ViewType' (ViewType.myIssuesTouchedByMe)

feat(schema): [dangerous] Enum value 'issue' was added to enum 'WorkflowTriggerType' (WorkflowTriggerType.issue)

feat(schema): [dangerous] Enum value 'project' was added to enum 'WorkflowTriggerType' (WorkflowTriggerType.project)

feat(schema): [dangerous] Enum value 'sla' was added to enum 'WorkflowType' (WorkflowType.sla)

feat(schema): [non_breaking] Type 'IssueDraft' was added (IssueDraft)

feat(schema): [non_breaking] Type 'NotionSettings' was added (NotionSettings)

feat(schema): [non_breaking] Type 'NotionSettingsInput' was added (NotionSettingsInput)

feat(schema): [non_breaking] Type 'PersonalNote' was added (PersonalNote)

feat(schema): [non_breaking] Type 'ProjectMilestone' was added (ProjectMilestone)

feat(schema): [non_breaking] Type 'ProjectMilestoneConnection' was added (ProjectMilestoneConnection)

feat(schema): [non_breaking] Type 'ProjectMilestoneCreateInput' was added (ProjectMilestoneCreateInput)

feat(schema): [non_breaking] Type 'ProjectMilestoneEdge' was added (ProjectMilestoneEdge)

feat(schema): [non_breaking] Type 'ProjectMilestonePayload' was added (ProjectMilestonePayload)

feat(schema): [non_breaking] Type 'ProjectMilestoneUpdateInput' was added (ProjectMilestoneUpdateInput)

feat(schema): [non_breaking] Type 'SlaStatus' was added (SlaStatus)

feat(schema): [non_breaking] Type 'SlaStatusComparator' was added (SlaStatusComparator)

feat(schema): [non_breaking] Type 'SourceTypeComparator' was added (SourceTypeComparator)

feat(schema): [non_breaking] Type 'WorkflowCondition' was added (WorkflowCondition)

feat(schema): [non_breaking] Type 'WorkflowDefinitionConnection' was added (WorkflowDefinitionConnection)

feat(schema): [non_breaking] Type 'WorkflowDefinitionEdge' was added (WorkflowDefinitionEdge)

feat(schema): [non_breaking] Type 'WorkflowTrigger' was added (WorkflowTrigger)

feat(schema): [non_breaking] Field 'organization' was added to object type 'AuditEntry' (AuditEntry.organization)

feat(schema): [non_breaking] Field 'Comment.parent' description changed from 'The parent of the comment.' to 'The parent comment under which the current comment is nested.' (Comment.parent)

feat(schema): [non_breaking] Input field 'CommentCreateInput.parentId' description changed from '[Internal] The parent under which to nest the comment.' to 'The parent comment under which to nest a current comment.' (CommentCreateInput.parentId)

feat(schema): [non_breaking] Field 'notion' was added to object type 'IntegrationSettings' (IntegrationSettings.notion)

feat(schema): [non_breaking] Field 'slackIssueAddedToTriage' was added to object type 'IntegrationsSettings' (IntegrationsSettings.slackIssueAddedToTriage)

feat(schema): [non_breaking] Field 'slackIssueSlaBreached' was added to object type 'IntegrationsSettings' (IntegrationsSettings.slackIssueSlaBreached)

feat(schema): [non_breaking] Field 'slackIssueSlaHighRisk' was added to object type 'IntegrationsSettings' (IntegrationsSettings.slackIssueSlaHighRisk)

feat(schema): [non_breaking] Field 'projectMilestone' was added to object type 'Issue' (Issue.projectMilestone)

feat(schema): [non_breaking] Field 'slaBreachesAt' was added to object type 'Issue' (Issue.slaBreachesAt)

feat(schema): [non_breaking] Field 'slaStartedAt' was added to object type 'Issue' (Issue.slaStartedAt)

feat(schema): [non_breaking] Field 'startedTriageAt' was added to object type 'Issue' (Issue.startedTriageAt)

feat(schema): [non_breaking] Field 'changes' was added to object type 'IssueHistory' (IssueHistory.changes)

feat(schema): [non_breaking] Field 'issueDescriptionUpdateFromFront' was added to object type 'Mutation' (Mutation.issueDescriptionUpdateFromFront)

feat(schema): [non_breaking] Field 'projectMilestoneCreate' was added to object type 'Mutation' (Mutation.projectMilestoneCreate)

feat(schema): [non_breaking] Field 'projectMilestoneDelete' was added to object type 'Mutation' (Mutation.projectMilestoneDelete)

feat(schema): [non_breaking] Field 'projectMilestoneUpdate' was added to object type 'Mutation' (Mutation.projectMilestoneUpdate)

feat(schema): [non_breaking] Input field 'NotificationSubscriptionUpdateInput.projectNotificationSubscriptionType' changed type from 'ProjectNotificationSubscriptionType!' to 'ProjectNotificationSubscriptionType' (NotificationSubscriptionUpdateInput.projectNotificationSubscriptionType)

feat(schema): [non_breaking] Field 'PaidSubscription.seatsMaximum' description changed from 'The maximum number of seats that can be added to the subscription.' to 'The maximum number of seats that will be billed in the subscription.' (PaidSubscription.seatsMaximum)

feat(schema): [non_breaking] Field 'projectMilestones' was added to object type 'Project' (Project.projectMilestones)

feat(schema): [non_breaking] Field 'Project.sortOrder' description changed from 'The sort order for the project within its milestone/initiative.' to 'The sort order for the project within the organizion.' (Project.sortOrder)

feat(schema): [non_breaking] Field 'ProjectMilestone' was added to object type 'Query' (Query.ProjectMilestone)

feat(schema): [non_breaking] Field 'ProjectMilestones' was added to object type 'Query' (Query.ProjectMilestones)

feat(schema): [non_breaking] Input field 'RoadmapToProjectCreateInput.sortOrder' description changed from 'The sort order for the project within its milestone.' to 'The sort order for the project within its organization.' (RoadmapToProjectCreateInput.sortOrder)

feat(schema): [non_breaking] Input field 'RoadmapToProjectUpdateInput.sortOrder' description changed from 'The sort order for the project within its milestone.' to 'The sort order for the project within its organization.' (RoadmapToProjectUpdateInput.sortOrder)

feat(schema): [non_breaking] Field 'requirePriorityToLeaveTriage' was added to object type 'Team' (Team.requirePriorityToLeaveTriage)

feat(schema): [non_breaking] Field 'groupName' was added to object type 'WorkflowDefinition' (WorkflowDefinition.groupName)

feat(schema): [non_breaking] Field 'sortOrder' was added to object type 'WorkflowDefinition' (WorkflowDefinition.sortOrder)

feat(schema): [non_breaking] Field 'triggerType' was added to object type 'WorkflowDefinition' (WorkflowDefinition.triggerType)

feat(schema): [non_breaking] Field 'WorkflowDefinition.conditions' description changed from 'One or more conditions that need to be true for workflow to be triggered.' to 'The conditions that need to be match for the workflow to be triggered.' (WorkflowDefinition.conditions)

feat(schema): [non_breaking] Field 'WorkflowDefinition.description' description changed from 'The workflow description.' to 'The description of the workflow.' (WorkflowDefinition.description)

feat(schema): [non_breaking] Field 'WorkflowDefinition.team' description changed from 'The team associated with the workflow.' to 'The team associated with the workflow. If not set, the workflow is associated with the entire organization.' (WorkflowDefinition.team)

feat(schema): [non_breaking] Field 'WorkflowDefinition.trigger' description changed from 'The type of the trigger that kicks off the workflow.' to 'The type of the event that triggers off the workflow.' (WorkflowDefinition.trigger)

feat(schema): [non_breaking] Field 'WorkflowDefinition.type' description changed from 'The type of the workflow' to 'The type of the workflow.' (WorkflowDefinition.type)