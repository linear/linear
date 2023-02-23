# Change Log

## 2.4.0

### Minor Changes

- 735f437: feat(schema): [breaking] Enum value 'myIssuesTouchedByMe' was removed from enum 'ViewType' (ViewType.myIssuesTouchedByMe)

  feat(schema): [breaking] Field 'schedule' was removed from object type 'WorkflowDefinition' (WorkflowDefinition.schedule)

  feat(schema): [breaking] Enum value 'cron' was removed from enum 'WorkflowTrigger' (WorkflowTrigger.cron)

  feat(schema): [breaking] Enum value 'recurringIssue' was removed from enum 'WorkflowType' (WorkflowType.recurringIssue)

  feat(schema): [dangerous] Input field 'projectMilestone' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.projectMilestone)

  feat(schema): [dangerous] Input field 'projectMilestone' was added to input object type 'IssueFilter' (IssueFilter.projectMilestone)

  feat(schema): [dangerous] Input field 'projectMilestone' was added to input object type 'NullableIssueFilter' (NullableIssueFilter.projectMilestone)

  feat(schema): [non_breaking] Type 'NullableProjectMilestoneFilter' was added (NullableProjectMilestoneFilter)

  feat(schema): [non_breaking] Type 'ReleaseChannel' was added (ReleaseChannel)

  feat(schema): [non_breaking] Type 'WorkflowCronJobDefinition' was added (WorkflowCronJobDefinition)

  feat(schema): [non_breaking] Type 'WorkflowCronJobDefinitionConnection' was added (WorkflowCronJobDefinitionConnection)

  feat(schema): [non_breaking] Type 'WorkflowCronJobDefinitionEdge' was added (WorkflowCronJobDefinitionEdge)

  feat(schema): [non_breaking] Field 'releaseChannel' was added to object type 'Organization' (Organization.releaseChannel)

- 9583079: feat(schema): [non_breaking] Field 'sortOrder' was added to object type 'ProjectMilestone' (ProjectMilestone.sortOrder)

## 2.3.1

### Patch Changes

- 3b943fb: chore(deps): update dependency patch versions

## 2.3.0

### Minor Changes

- 927d073: feat(schema): [breaking] Type 'CommitPayload' was removed (CommitPayload)

  feat(schema): [breaking] Type 'IntegrationResource' was removed (IntegrationResource)

  feat(schema): [breaking] Type 'IntegrationResourceConnection' was removed (IntegrationResourceConnection)

  feat(schema): [breaking] Type 'IntegrationResourceData' was removed (IntegrationResourceData)

  feat(schema): [breaking] Type 'IntegrationResourceEdge' was removed (IntegrationResourceEdge)

  feat(schema): [breaking] Type 'PullRequestPayload' was removed (PullRequestPayload)

  feat(schema): [breaking] Type 'PullRequestReview' was removed (PullRequestReview)

  feat(schema): [breaking] Type 'SentryIssuePayload' was removed (SentryIssuePayload)

  feat(schema): [breaking] Field 'integrationResources' (deprecated) was removed from object type 'Issue' (Issue.integrationResources)

  feat(schema): [breaking] Field 'integrationResourceArchive' (deprecated) was removed from object type 'Mutation' (Mutation.integrationResourceArchive)

  feat(schema): [breaking] Field 'integrationResource' (deprecated) was removed from object type 'Query' (Query.integrationResource)

  feat(schema): [breaking] Field 'integrationResources' (deprecated) was removed from object type 'Query' (Query.integrationResources)

  feat(schema): [non_breaking] Input field 'UpdateOrganizationInput.slaEnabled' description changed from 'Internal. Whether SLA's have been enabled for the organization.' to 'Internal. Whether SLAs have been enabled for the organization.' (UpdateOrganizationInput.slaEnabled)

## 2.2.0

### Minor Changes

- 8c5225b: feat(schema): [breaking] Type 'Initiative' was removed (Initiative)

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

  feat(schema): [dangerous] Input field 'requirePriorityToLeaveTriage' was added to input object type 'TeamCreateInput' (TeamCreateInput.requirePriorityToLeaveTriage)

  feat(schema): [dangerous] Input field 'requirePriorityToLeaveTriage' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.requirePriorityToLeaveTriage)

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

- 9917a58: feat(schema): [non_breaking] Field 'failureReason' was added to object type 'UserAccountEmailVerificationPayload' (UserAccountEmailVerificationPayload.failureReason)
- 8c5225b: feat(schema): [breaking] Type 'Initiative' was removed (Initiative)

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

  feat(schema): [dangerous] Input field 'requirePriorityToLeaveTriage' was added to input object type 'TeamCreateInput' (TeamCreateInput.requirePriorityToLeaveTriage)

  feat(schema): [dangerous] Input field 'requirePriorityToLeaveTriage' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.requirePriorityToLeaveTriage)

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

- 8c5225b: Do not generate tests for skip comments

### Patch Changes

- e9489d3: chore(deps): update dependency patch versions
- 4254b6a: Edit rollup config for dev

## 2.1.0

### Minor Changes

- edf0c13: feat(schema): [breaking] Type 'Aggregation' was removed (Aggregation)

  feat(schema): [breaking] Type 'ChartType' was removed (ChartType)

  feat(schema): [breaking] Type 'DateAggregation' was removed (DateAggregation)

  feat(schema): [breaking] Type 'Dimension' was removed (Dimension)

  feat(schema): [breaking] Type 'DimensionName' was removed (DimensionName)

  feat(schema): [breaking] Type 'FactsTable' was removed (FactsTable)

  feat(schema): [breaking] Type 'InsightPayload' was removed (InsightPayload)

  feat(schema): [breaking] Type 'Measure' was removed (Measure)

  feat(schema): [breaking] Type 'MeasureName' was removed (MeasureName)

  feat(schema): [breaking] Type 'UserSubscribeToNewsletterPayload' was removed (UserSubscribeToNewsletterPayload)

  feat(schema): [breaking] Field 'userSubscribeToNewsletter' was removed from object type 'Mutation' (Mutation.userSubscribeToNewsletter)

  feat(schema): [dangerous] Enum value 'threadedCommentsNudgeIsSeen' was added to enum 'UserFlagType' (UserFlagType.threadedCommentsNudgeIsSeen)

  feat(schema): [non_breaking] Type 'UserAccountEmailChangeFindPayload' was added (UserAccountEmailChangeFindPayload)

  feat(schema): [non_breaking] Type 'UserAccountEmailVerificationPayload' was added (UserAccountEmailVerificationPayload)

  feat(schema): [non_breaking] Type 'UserAccountExistsPayload' was added (UserAccountExistsPayload)

  feat(schema): [non_breaking] Field 'requestInformation' was added to object type 'AuditEntry' (AuditEntry.requestInformation)

  feat(schema): [non_breaking] Input field 'EmailSubscribeInput.email' description changed from 'Email to subscribe.' to '[INTERNAL] Email to subscribe.' (EmailSubscribeInput.email)

  feat(schema): [non_breaking] Field 'EmailSubscribePayload.success' description changed from 'Whether the operation was successful.' to '[INTERNAL] Whether the operation was successful.' (EmailSubscribePayload.success)

  feat(schema): [non_breaking] Field 'userAccountEmailChangeCancel' was added to object type 'Mutation' (Mutation.userAccountEmailChangeCancel)

  feat(schema): [non_breaking] Field 'userAccountEmailChangeCreate' was added to object type 'Mutation' (Mutation.userAccountEmailChangeCreate)

  feat(schema): [non_breaking] Field 'Mutation.emailSubscribe' description changed from 'Subscribes the email to the newsletter.' to '[INTERNAL] Subscribes the email to the newsletter.' (Mutation.emailSubscribe)

  feat(schema): [non_breaking] Field 'userAccountEmailChangeFind' was added to object type 'Query' (Query.userAccountEmailChangeFind)

  feat(schema): [non_breaking] Field 'userAccountExists' was added to object type 'Query' (Query.userAccountExists)

- edf0c13: feat(schema): [breaking] Type 'Aggregation' was removed (Aggregation)

  feat(schema): [breaking] Type 'ChartType' was removed (ChartType)

  feat(schema): [breaking] Type 'DateAggregation' was removed (DateAggregation)

  feat(schema): [breaking] Type 'Dimension' was removed (Dimension)

  feat(schema): [breaking] Type 'DimensionName' was removed (DimensionName)

  feat(schema): [breaking] Type 'FactsTable' was removed (FactsTable)

  feat(schema): [breaking] Type 'InsightPayload' was removed (InsightPayload)

  feat(schema): [breaking] Type 'Measure' was removed (Measure)

  feat(schema): [breaking] Type 'MeasureName' was removed (MeasureName)

  feat(schema): [breaking] Type 'UserSubscribeToNewsletterPayload' was removed (UserSubscribeToNewsletterPayload)

  feat(schema): [breaking] Field 'userSubscribeToNewsletter' was removed from object type 'Mutation' (Mutation.userSubscribeToNewsletter)

  feat(schema): [dangerous] Enum value 'threadedCommentsNudgeIsSeen' was added to enum 'UserFlagType' (UserFlagType.threadedCommentsNudgeIsSeen)

  feat(schema): [non_breaking] Type 'UserAccountEmailChangeFindPayload' was added (UserAccountEmailChangeFindPayload)

  feat(schema): [non_breaking] Type 'UserAccountEmailVerificationPayload' was added (UserAccountEmailVerificationPayload)

  feat(schema): [non_breaking] Type 'UserAccountExistsPayload' was added (UserAccountExistsPayload)

  feat(schema): [non_breaking] Field 'requestInformation' was added to object type 'AuditEntry' (AuditEntry.requestInformation)

  feat(schema): [non_breaking] Input field 'EmailSubscribeInput.email' description changed from 'Email to subscribe.' to '[INTERNAL] Email to subscribe.' (EmailSubscribeInput.email)

  feat(schema): [non_breaking] Field 'EmailSubscribePayload.success' description changed from 'Whether the operation was successful.' to '[INTERNAL] Whether the operation was successful.' (EmailSubscribePayload.success)

  feat(schema): [non_breaking] Field 'userAccountEmailChangeCancel' was added to object type 'Mutation' (Mutation.userAccountEmailChangeCancel)

  feat(schema): [non_breaking] Field 'userAccountEmailChangeCreate' was added to object type 'Mutation' (Mutation.userAccountEmailChangeCreate)

  feat(schema): [non_breaking] Field 'Mutation.emailSubscribe' description changed from 'Subscribes the email to the newsletter.' to '[INTERNAL] Subscribes the email to the newsletter.' (Mutation.emailSubscribe)

  feat(schema): [non_breaking] Field 'userAccountEmailChangeFind' was added to object type 'Query' (Query.userAccountEmailChangeFind)

  feat(schema): [non_breaking] Field 'userAccountExists' was added to object type 'Query' (Query.userAccountExists)

### Patch Changes

- 921a28b: chore(deps): update dependency patch versions
- 21b3b4f: Fix failing test

## 2.0.0

### Major Changes

- 5604ab9: Use prefixed mutations

### Minor Changes

- 5604ab9: feat(schema): [breaking] Schema subscription root has changed from 'Subscription' to 'unknown'

  feat(schema): [breaking] Type 'ArchiveResponse' was removed (ArchiveResponse)

  feat(schema): [breaking] Type 'BatchRequest' was removed (BatchRequest)

  feat(schema): [breaking] Type 'BillingDetailsPayload' was removed (BillingDetailsPayload)

  feat(schema): [breaking] Type 'BillingEmailPayload' was removed (BillingEmailPayload)

  feat(schema): [breaking] Type 'BillingEmailUpdateInput' was removed (BillingEmailUpdateInput)

  feat(schema): [breaking] Type 'Card' was removed (Card)

  feat(schema): [breaking] Type 'CollaborationDocumentUpdateInput' was removed (CollaborationDocumentUpdateInput)

  feat(schema): [breaking] Type 'CollaborationDocumentUpdatePayload' was removed (CollaborationDocumentUpdatePayload)

  feat(schema): [breaking] Type 'DebugPayload' was removed (DebugPayload)

  feat(schema): [breaking] Type 'DependencyResponse' was removed (DependencyResponse)

  feat(schema): [breaking] Type 'DocumentStep' was removed (DocumentStep)

  feat(schema): [breaking] Type 'DocumentVersion' was removed (DocumentVersion)

  feat(schema): [breaking] Type 'DocumentVersionConnection' was removed (DocumentVersionConnection)

  feat(schema): [breaking] Type 'DocumentVersionEdge' was removed (DocumentVersionEdge)

  feat(schema): [breaking] Type 'FeedbackCreateInput' was removed (FeedbackCreateInput)

  feat(schema): [breaking] Type 'FeedbackPayload' was removed (FeedbackPayload)

  feat(schema): [breaking] Type 'Invoice' was removed (Invoice)

  feat(schema): [breaking] Type 'MilestoneFilter' was removed (MilestoneFilter)

  feat(schema): [breaking] Type 'NullableMilestoneFilter' was removed (NullableMilestoneFilter)

  feat(schema): [breaking] Type 'OauthAuthStringAuthorizePayload' was removed (OauthAuthStringAuthorizePayload)

  feat(schema): [breaking] Type 'OauthAuthStringChallengePayload' was removed (OauthAuthStringChallengePayload)

  feat(schema): [breaking] Type 'OauthAuthStringCheckPayload' was removed (OauthAuthStringCheckPayload)

  feat(schema): [breaking] Type 'OauthClientCreateInput' was removed (OauthClientCreateInput)

  feat(schema): [breaking] Type 'OauthClientPayload' was removed (OauthClientPayload)

  feat(schema): [breaking] Type 'OauthClientUpdateInput' was removed (OauthClientUpdateInput)

  feat(schema): [breaking] Type 'OauthTokenRevokePayload' was removed (OauthTokenRevokePayload)

  feat(schema): [breaking] Type 'RotateSecretPayload' was removed (RotateSecretPayload)

  feat(schema): [breaking] Type 'StepsResponse' was removed (StepsResponse)

  feat(schema): [breaking] Type 'Subscription' was removed (Subscription)

  feat(schema): [breaking] Type 'SubscriptionPayload' was removed (SubscriptionPayload)

  feat(schema): [breaking] Type 'SubscriptionSessionPayload' was removed (SubscriptionSessionPayload)

  feat(schema): [breaking] Type 'SubscriptionUpdateInput' was removed (SubscriptionUpdateInput)

  feat(schema): [breaking] Type 'SyncBatchResponse' was removed (SyncBatchResponse)

  feat(schema): [breaking] Type 'SyncDeltaResponse' was removed (SyncDeltaResponse)

  feat(schema): [breaking] Type 'TrashOptionType' was removed (TrashOptionType)

  feat(schema): [breaking] Field 'description' was removed from object type 'AuthorizedApplication' (AuthorizedApplication.description)

  feat(schema): [breaking] Field 'developer' was removed from object type 'AuthorizedApplication' (AuthorizedApplication.developer)

  feat(schema): [breaking] Field 'developerUrl' was removed from object type 'AuthorizedApplication' (AuthorizedApplication.developerUrl)

  feat(schema): [breaking] Input field 'CommentCollectionFilter.and' changed type from '[CommentFilter!]' to '[CommentCollectionFilter!]' (CommentCollectionFilter.and)

  feat(schema): [breaking] Input field 'CommentCollectionFilter.or' changed type from '[CommentFilter!]' to '[CommentCollectionFilter!]' (CommentCollectionFilter.or)

  feat(schema): [breaking] Field 'IntegrationResource.integration' changed type from 'Integration!' to 'Integration' (IntegrationResource.integration)

  feat(schema): [breaking] Input field 'IssueCollectionFilter.and' changed type from '[IssueFilter!]' to '[IssueCollectionFilter!]' (IssueCollectionFilter.and)

  feat(schema): [breaking] Input field 'IssueCollectionFilter.attachments' changed type from 'AttachmentFilter' to 'AttachmentCollectionFilter' (IssueCollectionFilter.attachments)

  feat(schema): [breaking] Input field 'IssueCollectionFilter.estimate' changed type from 'NumberComparator' to 'EstimateComparator' (IssueCollectionFilter.estimate)

  feat(schema): [breaking] Input field 'IssueCollectionFilter.or' changed type from '[IssueFilter!]' to '[IssueCollectionFilter!]' (IssueCollectionFilter.or)

  feat(schema): [breaking] Input field 'IssueFilter.attachments' changed type from 'AttachmentFilter' to 'AttachmentCollectionFilter' (IssueFilter.attachments)

  feat(schema): [breaking] Input field 'IssueFilter.estimate' changed type from 'NumberComparator' to 'EstimateComparator' (IssueFilter.estimate)

  feat(schema): [breaking] Field 'source' was removed from object type 'IssueHistory' (IssueHistory.source)

  feat(schema): [breaking] Input field 'IssueLabelCollectionFilter.and' changed type from '[IssueLabelFilter!]' to '[IssueLabelCollectionFilter!]' (IssueLabelCollectionFilter.and)

  feat(schema): [breaking] Input field 'IssueLabelCollectionFilter.or' changed type from '[IssueLabelFilter!]' to '[IssueLabelCollectionFilter!]' (IssueLabelCollectionFilter.or)

  feat(schema): [breaking] Input field 'documentVersion' was removed from input object type 'IssueUpdateInput' (IssueUpdateInput.documentVersion)

  feat(schema): [breaking] Field 'billingEmailUpdate' was removed from object type 'Mutation' (Mutation.billingEmailUpdate)

  feat(schema): [breaking] Field 'collaborativeDocumentUpdate' was removed from object type 'Mutation' (Mutation.collaborativeDocumentUpdate)

  feat(schema): [breaking] Field 'debugCreateOAuthApps' was removed from object type 'Mutation' (Mutation.debugCreateOAuthApps)

  feat(schema): [breaking] Field 'debugCreateSAMLOrg' was removed from object type 'Mutation' (Mutation.debugCreateSAMLOrg)

  feat(schema): [breaking] Field 'debugCreateSubscription' was removed from object type 'Mutation' (Mutation.debugCreateSubscription)

  feat(schema): [breaking] Field 'debugFailWithInternalError' was removed from object type 'Mutation' (Mutation.debugFailWithInternalError)

  feat(schema): [breaking] Field 'debugFailWithWarning' was removed from object type 'Mutation' (Mutation.debugFailWithWarning)

  feat(schema): [breaking] Field 'feedbackCreate' was removed from object type 'Mutation' (Mutation.feedbackCreate)

  feat(schema): [breaking] Field 'notificationCreate' was removed from object type 'Mutation' (Mutation.notificationCreate)

  feat(schema): [breaking] Field 'oauthAuthStringAuthorize' was removed from object type 'Mutation' (Mutation.oauthAuthStringAuthorize)

  feat(schema): [breaking] Field 'oauthAuthStringChallenge' was removed from object type 'Mutation' (Mutation.oauthAuthStringChallenge)

  feat(schema): [breaking] Field 'oauthAuthStringCheck' was removed from object type 'Mutation' (Mutation.oauthAuthStringCheck)

  feat(schema): [breaking] Field 'oauthClientArchive' was removed from object type 'Mutation' (Mutation.oauthClientArchive)

  feat(schema): [breaking] Field 'oauthClientCreate' was removed from object type 'Mutation' (Mutation.oauthClientCreate)

  feat(schema): [breaking] Field 'oauthClientRotateSecret' was removed from object type 'Mutation' (Mutation.oauthClientRotateSecret)

  feat(schema): [breaking] Field 'oauthClientUpdate' was removed from object type 'Mutation' (Mutation.oauthClientUpdate)

  feat(schema): [breaking] Field 'oauthTokenRevoke' was removed from object type 'Mutation' (Mutation.oauthTokenRevoke)

  feat(schema): [breaking] Field 'subscriptionArchive' was removed from object type 'Mutation' (Mutation.subscriptionArchive)

  feat(schema): [breaking] Field 'subscriptionSessionCreate' was removed from object type 'Mutation' (Mutation.subscriptionSessionCreate)

  feat(schema): [breaking] Field 'subscriptionUpdate' was removed from object type 'Mutation' (Mutation.subscriptionUpdate)

  feat(schema): [breaking] Field 'subscriptionUpdateSessionCreate' was removed from object type 'Mutation' (Mutation.subscriptionUpdateSessionCreate)

  feat(schema): [breaking] Field 'subscriptionUpgrade' was removed from object type 'Mutation' (Mutation.subscriptionUpgrade)

  feat(schema): [breaking] Argument 'service: String!' added to field 'Mutation.integrationSlackProjectPost' (Mutation.integrationSlackProjectPost.service)

  feat(schema): [breaking] 'NotificationSubscription' kind changed from 'ObjectTypeDefinition' to 'InterfaceTypeDefinition' (NotificationSubscription)

  feat(schema): [breaking] Input field 'NullableCycleFilter.and' changed type from '[CycleFilter!]' to '[NullableCycleFilter!]' (NullableCycleFilter.and)

  feat(schema): [breaking] Input field 'NullableCycleFilter.or' changed type from '[CycleFilter!]' to '[NullableCycleFilter!]' (NullableCycleFilter.or)

  feat(schema): [breaking] Input field 'milestone' was removed from input object type 'NullableProjectFilter' (NullableProjectFilter.milestone)

  feat(schema): [breaking] Input field 'NullableProjectFilter.and' changed type from '[ProjectFilter!]' to '[NullableProjectFilter!]' (NullableProjectFilter.and)

  feat(schema): [breaking] Input field 'NullableProjectFilter.or' changed type from '[ProjectFilter!]' to '[NullableProjectFilter!]' (NullableProjectFilter.or)

  feat(schema): [breaking] Input field 'NullableUserFilter.and' changed type from '[UserFilter!]' to '[NullableUserFilter!]' (NullableUserFilter.and)

  feat(schema): [breaking] Input field 'NullableUserFilter.or' changed type from '[UserFilter!]' to '[NullableUserFilter!]' (NullableUserFilter.or)

  feat(schema): [breaking] Field 'OauthClient.description' changed type from 'String!' to 'String' (OauthClient.description)

  feat(schema): [breaking] Field 'OauthClient.imageUrl' changed type from 'String!' to 'String' (OauthClient.imageUrl)

  feat(schema): [breaking] Field 'milestones' was removed from object type 'Organization' (Organization.milestones)

  feat(schema): [breaking] Field 'Organization.subscription' changed type from 'Subscription' to 'PaidSubscription' (Organization.subscription)

  feat(schema): [breaking] Field 'permission' was removed from object type 'OrganizationInvite' (OrganizationInvite.permission)

  feat(schema): [breaking] Input field 'permission' was removed from input object type 'OrganizationInviteCreateInput' (OrganizationInviteCreateInput.permission)

  feat(schema): [breaking] Field 'permission' was removed from object type 'OrganizationInviteDetailsPayload' (OrganizationInviteDetailsPayload.permission)

  feat(schema): [breaking] Input field 'milestone' was removed from input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.milestone)

  feat(schema): [breaking] Input field 'ProjectCollectionFilter.and' changed type from '[ProjectFilter!]' to '[ProjectCollectionFilter!]' (ProjectCollectionFilter.and)

  feat(schema): [breaking] Input field 'ProjectCollectionFilter.or' changed type from '[ProjectFilter!]' to '[ProjectCollectionFilter!]' (ProjectCollectionFilter.or)

  feat(schema): [breaking] Input field 'milestone' was removed from input object type 'ProjectFilter' (ProjectFilter.milestone)

  feat(schema): [breaking] Field 'archivedModelSync' was removed from object type 'Query' (Query.archivedModelSync)

  feat(schema): [breaking] Field 'archivedModelsSync' was removed from object type 'Query' (Query.archivedModelsSync)

  feat(schema): [breaking] Field 'billingDetails' was removed from object type 'Query' (Query.billingDetails)

  feat(schema): [breaking] Field 'collaborativeDocumentJoin' was removed from object type 'Query' (Query.collaborativeDocumentJoin)

  feat(schema): [breaking] Field 'dependentModelSync' was removed from object type 'Query' (Query.dependentModelSync)

  feat(schema): [breaking] Field 'reaction' was removed from object type 'Query' (Query.reaction)

  feat(schema): [breaking] Field 'reactions' was removed from object type 'Query' (Query.reactions)

  feat(schema): [breaking] Field 'subscription' was removed from object type 'Query' (Query.subscription)

  feat(schema): [breaking] Field 'syncBatch' was removed from object type 'Query' (Query.syncBatch)

  feat(schema): [breaking] Field 'syncBootstrap' was removed from object type 'Query' (Query.syncBootstrap)

  feat(schema): [breaking] Field 'syncDelta' was removed from object type 'Query' (Query.syncDelta)

  feat(schema): [breaking] Argument 'filter: MilestoneFilter' was removed from field 'Query.milestones' (Query.milestones.filter)

  feat(schema): [breaking] Field 'comment' was removed from object type 'Reaction' (Reaction.comment)

  feat(schema): [breaking] Field 'allowedDomains' was removed from object type 'SamlConfiguration' (SamlConfiguration.allowedDomains)

  feat(schema): [breaking] Input field 'allowedDomains' was removed from input object type 'SamlConfigurationInput' (SamlConfigurationInput.allowedDomains)

  feat(schema): [breaking] Field 'allowedDomains' was removed from object type 'SamlConfigurationPayload' (SamlConfigurationPayload.allowedDomains)

  feat(schema): [breaking] Field 'UploadFile.metaData' changed type from 'JSON' to 'JSONObject' (UploadFile.metaData)

  feat(schema): [breaking] Input field 'UserSettingsUpdateInput.settings' changed type from 'String' to 'JSONObject' (UserSettingsUpdateInput.settings)

  feat(schema): [breaking] Field 'Webhook.label' changed type from 'String!' to 'String' (Webhook.label)

  feat(schema): [breaking] Field 'ZendeskSettings.botUserId' changed type from 'String!' to 'String' (ZendeskSettings.botUserId)

  feat(schema): [dangerous] Input field 'and' was added to input object type 'AttachmentFilter' (AttachmentFilter.and)

  feat(schema): [dangerous] Input field 'or' was added to input object type 'AttachmentFilter' (AttachmentFilter.or)

  feat(schema): [dangerous] Input field 'length' was added to input object type 'CommentCollectionFilter' (CommentCollectionFilter.length)

  feat(schema): [dangerous] Input field 'createdAt' was added to input object type 'CommentCreateInput' (CommentCreateInput.createdAt)

  feat(schema): [dangerous] Input field 'displayIconUrl' was added to input object type 'CommentCreateInput' (CommentCreateInput.displayIconUrl)

  feat(schema): [dangerous] Input field 'description' was added to input object type 'CycleCreateInput' (CycleCreateInput.description)

  feat(schema): [dangerous] Input field 'isActive' was added to input object type 'CycleFilter' (CycleFilter.isActive)

  feat(schema): [dangerous] Input field 'isFuture' was added to input object type 'CycleFilter' (CycleFilter.isFuture)

  feat(schema): [dangerous] Input field 'isNext' was added to input object type 'CycleFilter' (CycleFilter.isNext)

  feat(schema): [dangerous] Input field 'isPast' was added to input object type 'CycleFilter' (CycleFilter.isPast)

  feat(schema): [dangerous] Input field 'isPrevious' was added to input object type 'CycleFilter' (CycleFilter.isPrevious)

  feat(schema): [dangerous] Input field 'description' was added to input object type 'CycleUpdateInput' (CycleUpdateInput.description)

  feat(schema): [dangerous] Input field 'roadmapId' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.roadmapId)

  feat(schema): [dangerous] Input field 'front' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.front)

  feat(schema): [dangerous] Input field 'gitHub' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.gitHub)

  feat(schema): [dangerous] Input field 'slackOrgProjectUpdatesPost' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.slackOrgProjectUpdatesPost)

  feat(schema): [dangerous] Input field 'automateTicketReopeningOnCancellation' was added to input object type 'IntercomSettingsInput' (IntercomSettingsInput.automateTicketReopeningOnCancellation)

  feat(schema): [dangerous] Input field 'automateTicketReopeningOnComment' was added to input object type 'IntercomSettingsInput' (IntercomSettingsInput.automateTicketReopeningOnComment)

  feat(schema): [dangerous] Input field 'automateTicketReopeningOnCompletion' was added to input object type 'IntercomSettingsInput' (IntercomSettingsInput.automateTicketReopeningOnCompletion)

  feat(schema): [dangerous] Input field 'hasBlockedByRelations' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.hasBlockedByRelations)

  feat(schema): [dangerous] Input field 'hasBlockingRelations' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.hasBlockingRelations)

  feat(schema): [dangerous] Input field 'hasDuplicateRelations' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.hasDuplicateRelations)

  feat(schema): [dangerous] Input field 'hasRelatedRelations' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.hasRelatedRelations)

  feat(schema): [dangerous] Input field 'length' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.length)

  feat(schema): [dangerous] Input field 'parent' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.parent)

  feat(schema): [dangerous] Input field 'searchableContent' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.searchableContent)

  feat(schema): [dangerous] Input field 'subscribers' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.subscribers)

  feat(schema): [dangerous] Input field 'createdAt' was added to input object type 'IssueCreateInput' (IssueCreateInput.createdAt)

  feat(schema): [dangerous] Input field 'displayIconUrl' was added to input object type 'IssueCreateInput' (IssueCreateInput.displayIconUrl)

  feat(schema): [dangerous] Input field 'hasBlockedByRelations' was added to input object type 'IssueFilter' (IssueFilter.hasBlockedByRelations)

  feat(schema): [dangerous] Input field 'hasBlockingRelations' was added to input object type 'IssueFilter' (IssueFilter.hasBlockingRelations)

  feat(schema): [dangerous] Input field 'hasDuplicateRelations' was added to input object type 'IssueFilter' (IssueFilter.hasDuplicateRelations)

  feat(schema): [dangerous] Input field 'hasRelatedRelations' was added to input object type 'IssueFilter' (IssueFilter.hasRelatedRelations)

  feat(schema): [dangerous] Input field 'parent' was added to input object type 'IssueFilter' (IssueFilter.parent)

  feat(schema): [dangerous] Input field 'searchableContent' was added to input object type 'IssueFilter' (IssueFilter.searchableContent)

  feat(schema): [dangerous] Input field 'subscribers' was added to input object type 'IssueFilter' (IssueFilter.subscribers)

  feat(schema): [dangerous] Input field 'length' was added to input object type 'IssueLabelCollectionFilter' (IssueLabelCollectionFilter.length)

  feat(schema): [dangerous] Input field 'parent' was added to input object type 'IssueLabelCollectionFilter' (IssueLabelCollectionFilter.parent)

  feat(schema): [dangerous] Input field 'parentId' was added to input object type 'IssueLabelCreateInput' (IssueLabelCreateInput.parentId)

  feat(schema): [dangerous] Input field 'parent' was added to input object type 'IssueLabelFilter' (IssueLabelFilter.parent)

  feat(schema): [dangerous] Input field 'parentId' was added to input object type 'IssueLabelUpdateInput' (IssueLabelUpdateInput.parentId)

  feat(schema): [dangerous] Input field 'description' was added to input object type 'MilestoneCreateInput' (MilestoneCreateInput.description)

  feat(schema): [dangerous] Input field 'targetDate' was added to input object type 'MilestoneCreateInput' (MilestoneCreateInput.targetDate)

  feat(schema): [dangerous] Input field 'teamIds' was added to input object type 'MilestoneCreateInput' (MilestoneCreateInput.teamIds)

  feat(schema): [dangerous] Input field 'description' was added to input object type 'MilestoneUpdateInput' (MilestoneUpdateInput.description)

  feat(schema): [dangerous] Input field 'targetDate' was added to input object type 'MilestoneUpdateInput' (MilestoneUpdateInput.targetDate)

  feat(schema): [dangerous] Input field 'teamIds' was added to input object type 'MilestoneUpdateInput' (MilestoneUpdateInput.teamIds)

  feat(schema): [dangerous] Argument 'makePublic: Boolean' added to field 'Mutation.fileUpload' (Mutation.fileUpload.makePublic)

  feat(schema): [dangerous] Argument 'domainUrl: String' added to field 'Mutation.integrationIntercom' (Mutation.integrationIntercom.domainUrl)

  feat(schema): [dangerous] Argument 'organizationId: String' added to field 'Mutation.issueImportCreateAsana' (Mutation.issueImportCreateAsana.organizationId)

  feat(schema): [dangerous] Argument 'teamName: String' added to field 'Mutation.issueImportCreateAsana' (Mutation.issueImportCreateAsana.teamName)

  feat(schema): [dangerous] Argument 'organizationId: String' added to field 'Mutation.issueImportCreateClubhouse' (Mutation.issueImportCreateClubhouse.organizationId)

  feat(schema): [dangerous] Argument 'teamName: String' added to field 'Mutation.issueImportCreateClubhouse' (Mutation.issueImportCreateClubhouse.teamName)

  feat(schema): [dangerous] Argument 'organizationId: String' added to field 'Mutation.issueImportCreateGithub' (Mutation.issueImportCreateGithub.organizationId)

  feat(schema): [dangerous] Argument 'teamName: String' added to field 'Mutation.issueImportCreateGithub' (Mutation.issueImportCreateGithub.teamName)

  feat(schema): [dangerous] Argument 'organizationId: String' added to field 'Mutation.issueImportCreateJira' (Mutation.issueImportCreateJira.organizationId)

  feat(schema): [dangerous] Argument 'teamName: String' added to field 'Mutation.issueImportCreateJira' (Mutation.issueImportCreateJira.teamName)

  feat(schema): [dangerous] Argument 'triggerEmailVerification: Boolean' added to field 'Mutation.organizationDomainCreate' (Mutation.organizationDomainCreate.triggerEmailVerification)

  feat(schema): [dangerous] Input field 'projectNotificationSubscriptionType' was added to input object type 'NotificationSubscriptionCreateInput' (NotificationSubscriptionCreateInput.projectNotificationSubscriptionType)

  feat(schema): [dangerous] Input field 'projectUpdateId' was added to input object type 'NotificationUpdateInput' (NotificationUpdateInput.projectUpdateId)

  feat(schema): [dangerous] Input field 'isActive' was added to input object type 'NullableCycleFilter' (NullableCycleFilter.isActive)

  feat(schema): [dangerous] Input field 'isFuture' was added to input object type 'NullableCycleFilter' (NullableCycleFilter.isFuture)

  feat(schema): [dangerous] Input field 'isNext' was added to input object type 'NullableCycleFilter' (NullableCycleFilter.isNext)

  feat(schema): [dangerous] Input field 'isPast' was added to input object type 'NullableCycleFilter' (NullableCycleFilter.isPast)

  feat(schema): [dangerous] Input field 'isPrevious' was added to input object type 'NullableCycleFilter' (NullableCycleFilter.isPrevious)

  feat(schema): [dangerous] Input field 'roadmaps' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.roadmaps)

  feat(schema): [dangerous] Input field 'slugId' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.slugId)

  feat(schema): [dangerous] Input field 'authType' was added to input object type 'OrganizationDomainCreateInput' (OrganizationDomainCreateInput.authType)

  feat(schema): [dangerous] Input field 'role' was added to input object type 'OrganizationInviteCreateInput' (OrganizationInviteCreateInput.role)

  feat(schema): [dangerous] Input field 'length' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.length)

  feat(schema): [dangerous] Input field 'roadmaps' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.roadmaps)

  feat(schema): [dangerous] Input field 'slugId' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.slugId)

  feat(schema): [dangerous] Input field 'convertedFromIssueId' was added to input object type 'ProjectCreateInput' (ProjectCreateInput.convertedFromIssueId)

  feat(schema): [dangerous] Input field 'roadmaps' was added to input object type 'ProjectFilter' (ProjectFilter.roadmaps)

  feat(schema): [dangerous] Input field 'slugId' was added to input object type 'ProjectFilter' (ProjectFilter.slugId)

  feat(schema): [dangerous] Input field 'convertedFromIssueId' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.convertedFromIssueId)

  feat(schema): [dangerous] Input field 'projectUpdateRemindersPausedUntilAt' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.projectUpdateRemindersPausedUntilAt)

  feat(schema): [dangerous] Input field 'type' was added to input object type 'PushSubscriptionCreateInput' (PushSubscriptionCreateInput.type)

  feat(schema): [dangerous] Input field 'projectUpdateId' was added to input object type 'ReactionCreateInput' (ReactionCreateInput.projectUpdateId)

  feat(schema): [dangerous] Input field 'issueSortOrderDefaultToBottom' was added to input object type 'TeamCreateInput' (TeamCreateInput.issueSortOrderDefaultToBottom)

  feat(schema): [dangerous] Input field 'sortOrder' was added to input object type 'TeamMembershipCreateInput' (TeamMembershipCreateInput.sortOrder)

  feat(schema): [dangerous] Input field 'sortOrder' was added to input object type 'TeamMembershipUpdateInput' (TeamMembershipUpdateInput.sortOrder)

  feat(schema): [dangerous] Input field 'issueSortOrderDefaultToBottom' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.issueSortOrderDefaultToBottom)

  feat(schema): [dangerous] Input field 'oauthAppReview' was added to input object type 'UpdateOrganizationInput' (UpdateOrganizationInput.oauthAppReview)

  feat(schema): [dangerous] Input field 'projectUpdateRemindersDay' was added to input object type 'UpdateOrganizationInput' (UpdateOrganizationInput.projectUpdateRemindersDay)

  feat(schema): [dangerous] Input field 'projectUpdateRemindersHour' was added to input object type 'UpdateOrganizationInput' (UpdateOrganizationInput.projectUpdateRemindersHour)

  feat(schema): [dangerous] Input field 'projectUpdatesReminderFrequency' was added to input object type 'UpdateOrganizationInput' (UpdateOrganizationInput.projectUpdatesReminderFrequency)

  feat(schema): [dangerous] Enum value 'insightsWelcomeDismissed' was added to enum 'UserFlagType' (UserFlagType.insightsWelcomeDismissed)

  feat(schema): [dangerous] Enum value 'issueLabelSuggestionUsed' was added to enum 'UserFlagType' (UserFlagType.issueLabelSuggestionUsed)

  feat(schema): [dangerous] Enum value 'joinTeamIntroductionDismissed' was added to enum 'UserFlagType' (UserFlagType.joinTeamIntroductionDismissed)

  feat(schema): [dangerous] Enum value 'projectUpdatesWelcomeDismissed' was added to enum 'UserFlagType' (UserFlagType.projectUpdatesWelcomeDismissed)

  feat(schema): [dangerous] Enum value 'rewindBannerDismissed' was added to enum 'UserFlagType' (UserFlagType.rewindBannerDismissed)

  feat(schema): [dangerous] Enum value 'teamsPageIntroductionDismissed' was added to enum 'UserFlagType' (UserFlagType.teamsPageIntroductionDismissed)

  feat(schema): [dangerous] Input field 'roadmapId' was added to input object type 'ViewPreferencesCreateInput' (ViewPreferencesCreateInput.roadmapId)

  feat(schema): [dangerous] Enum value 'archive' was added to enum 'ViewType' (ViewType.archive)

  feat(schema): [dangerous] Enum value 'customRoadmap' was added to enum 'ViewType' (ViewType.customRoadmap)

  feat(schema): [dangerous] Enum value 'myIssuesCreatedByMe' was added to enum 'ViewType' (ViewType.myIssuesCreatedByMe)

  feat(schema): [dangerous] Enum value 'myIssuesSubscribedTo' was added to enum 'ViewType' (ViewType.myIssuesSubscribedTo)

  feat(schema): [dangerous] Enum value 'teams' was added to enum 'ViewType' (ViewType.teams)

  feat(schema): [dangerous] Enum value 'userProfileCreatedByUser' was added to enum 'ViewType' (ViewType.userProfileCreatedByUser)

  feat(schema): [dangerous] Input field 'automateTicketReopeningOnCancellation' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.automateTicketReopeningOnCancellation)

  feat(schema): [dangerous] Input field 'automateTicketReopeningOnComment' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.automateTicketReopeningOnComment)

  feat(schema): [dangerous] Input field 'automateTicketReopeningOnCompletion' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.automateTicketReopeningOnCompletion)

  feat(schema): [dangerous] Input field 'sendNoteOnComment' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.sendNoteOnComment)

  feat(schema): [dangerous] Input field 'sendNoteOnStatusChange' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.sendNoteOnStatusChange)

  feat(schema): [non_breaking] Type 'AdminJobConfiguration' was added (AdminJobConfiguration)

  feat(schema): [non_breaking] Type 'AdminJobConfigurationPayload' was added (AdminJobConfigurationPayload)

  feat(schema): [non_breaking] Type 'AdminJobStatusPayload' was added (AdminJobStatusPayload)

  feat(schema): [non_breaking] Type 'Aggregation' was added (Aggregation)

  feat(schema): [non_breaking] Type 'AirbyteConfigurationInput' was added (AirbyteConfigurationInput)

  feat(schema): [non_breaking] Type 'AttachmentCollectionFilter' was added (AttachmentCollectionFilter)

  feat(schema): [non_breaking] Type 'AuthMembership' was added (AuthMembership)

  feat(schema): [non_breaking] Type 'ChartType' was added (ChartType)

  feat(schema): [non_breaking] Type 'ContactSalesCreateInput' was added (ContactSalesCreateInput)

  feat(schema): [non_breaking] Type 'ContentComparator' was added (ContentComparator)

  feat(schema): [non_breaking] Type 'DateAggregation' was added (DateAggregation)

  feat(schema): [non_breaking] Type 'Day' was added (Day)

  feat(schema): [non_breaking] Type 'Dimension' was added (Dimension)

  feat(schema): [non_breaking] Type 'DimensionName' was added (DimensionName)

  feat(schema): [non_breaking] Type 'EstimateComparator' was added (EstimateComparator)

  feat(schema): [non_breaking] Type 'FactsTable' was added (FactsTable)

  feat(schema): [non_breaking] Type 'FrontSettings' was added (FrontSettings)

  feat(schema): [non_breaking] Type 'FrontSettingsInput' was added (FrontSettingsInput)

  feat(schema): [non_breaking] Type 'GitHubSettings' was added (GitHubSettings)

  feat(schema): [non_breaking] Type 'GitHubSettingsInput' was added (GitHubSettingsInput)

  feat(schema): [non_breaking] Type 'Initiative' was added (Initiative)

  feat(schema): [non_breaking] Type 'InitiativeConnection' was added (InitiativeConnection)

  feat(schema): [non_breaking] Type 'InitiativeEdge' was added (InitiativeEdge)

  feat(schema): [non_breaking] Type 'InsightPayload' was added (InsightPayload)

  feat(schema): [non_breaking] Type 'IntegrationRequestInput' was added (IntegrationRequestInput)

  feat(schema): [non_breaking] Type 'IntegrationRequestPayload' was added (IntegrationRequestPayload)

  feat(schema): [non_breaking] Type 'IntegrationTemplate' was added (IntegrationTemplate)

  feat(schema): [non_breaking] Type 'IntegrationTemplateConnection' was added (IntegrationTemplateConnection)

  feat(schema): [non_breaking] Type 'IntegrationTemplateCreateInput' was added (IntegrationTemplateCreateInput)

  feat(schema): [non_breaking] Type 'IntegrationTemplateEdge' was added (IntegrationTemplateEdge)

  feat(schema): [non_breaking] Type 'IntegrationTemplatePayload' was added (IntegrationTemplatePayload)

  feat(schema): [non_breaking] Type 'IntegrationsSettings' was added (IntegrationsSettings)

  feat(schema): [non_breaking] Type 'IntegrationsSettingsConnection' was added (IntegrationsSettingsConnection)

  feat(schema): [non_breaking] Type 'IntegrationsSettingsCreateInput' was added (IntegrationsSettingsCreateInput)

  feat(schema): [non_breaking] Type 'IntegrationsSettingsEdge' was added (IntegrationsSettingsEdge)

  feat(schema): [non_breaking] Type 'IntegrationsSettingsPayload' was added (IntegrationsSettingsPayload)

  feat(schema): [non_breaking] Type 'IntegrationsSettingsUpdateInput' was added (IntegrationsSettingsUpdateInput)

  feat(schema): [non_breaking] Type 'LogoutResponse' was added (LogoutResponse)

  feat(schema): [non_breaking] Type 'Measure' was added (Measure)

  feat(schema): [non_breaking] Type 'MeasureName' was added (MeasureName)

  feat(schema): [non_breaking] Type 'MilestoneMigrationPayload' was added (MilestoneMigrationPayload)

  feat(schema): [non_breaking] Type 'MilestonesMigrateInput' was added (MilestonesMigrateInput)

  feat(schema): [non_breaking] Type 'NotificationSubscriptionUpdateInput' was added (NotificationSubscriptionUpdateInput)

  feat(schema): [non_breaking] Type 'NullableIssueFilter' was added (NullableIssueFilter)

  feat(schema): [non_breaking] Type 'OAuthClientApprovalStatus' was added (OAuthClientApprovalStatus)

  feat(schema): [non_breaking] Type 'OauthClientApproval' was added (OauthClientApproval)

  feat(schema): [non_breaking] Type 'OauthClientApprovalNotification' was added (OauthClientApprovalNotification)

  feat(schema): [non_breaking] Type 'OrganizationDomainAuthType' was added (OrganizationDomainAuthType)

  feat(schema): [non_breaking] Type 'OrganizationDomainClaimPayload' was added (OrganizationDomainClaimPayload)

  feat(schema): [non_breaking] Type 'OrganizationInviteUpdateInput' was added (OrganizationInviteUpdateInput)

  feat(schema): [non_breaking] Type 'PaidSubscription' was added (PaidSubscription)

  feat(schema): [non_breaking] Type 'ProjectNotification' was added (ProjectNotification)

  feat(schema): [non_breaking] Type 'ProjectNotificationSubscription' was added (ProjectNotificationSubscription)

  feat(schema): [non_breaking] Type 'ProjectNotificationSubscriptionType' was added (ProjectNotificationSubscriptionType)

  feat(schema): [non_breaking] Type 'ProjectUpdate' was added (ProjectUpdate)

  feat(schema): [non_breaking] Type 'ProjectUpdateConnection' was added (ProjectUpdateConnection)

  feat(schema): [non_breaking] Type 'ProjectUpdateCreateInput' was added (ProjectUpdateCreateInput)

  feat(schema): [non_breaking] Type 'ProjectUpdateEdge' was added (ProjectUpdateEdge)

  feat(schema): [non_breaking] Type 'ProjectUpdateHealthType' was added (ProjectUpdateHealthType)

  feat(schema): [non_breaking] Type 'ProjectUpdateInteraction' was added (ProjectUpdateInteraction)

  feat(schema): [non_breaking] Type 'ProjectUpdateInteractionConnection' was added (ProjectUpdateInteractionConnection)

  feat(schema): [non_breaking] Type 'ProjectUpdateInteractionCreateInput' was added (ProjectUpdateInteractionCreateInput)

  feat(schema): [non_breaking] Type 'ProjectUpdateInteractionEdge' was added (ProjectUpdateInteractionEdge)

  feat(schema): [non_breaking] Type 'ProjectUpdateInteractionPayload' was added (ProjectUpdateInteractionPayload)

  feat(schema): [non_breaking] Type 'ProjectUpdatePayload' was added (ProjectUpdatePayload)

  feat(schema): [non_breaking] Type 'ProjectUpdateReminderFrequency' was added (ProjectUpdateReminderFrequency)

  feat(schema): [non_breaking] Type 'ProjectUpdateUpdateInput' was added (ProjectUpdateUpdateInput)

  feat(schema): [non_breaking] Type 'ProjectUpdateWithInteractionPayload' was added (ProjectUpdateWithInteractionPayload)

  feat(schema): [non_breaking] Type 'PullRequestReview' was added (PullRequestReview)

  feat(schema): [non_breaking] Type 'PushSubscriptionType' was added (PushSubscriptionType)

  feat(schema): [non_breaking] Type 'RelationExistsComparator' was added (RelationExistsComparator)

  feat(schema): [non_breaking] Type 'Roadmap' was added (Roadmap)

  feat(schema): [non_breaking] Type 'RoadmapCollectionFilter' was added (RoadmapCollectionFilter)

  feat(schema): [non_breaking] Type 'RoadmapConnection' was added (RoadmapConnection)

  feat(schema): [non_breaking] Type 'RoadmapCreateInput' was added (RoadmapCreateInput)

  feat(schema): [non_breaking] Type 'RoadmapEdge' was added (RoadmapEdge)

  feat(schema): [non_breaking] Type 'RoadmapFilter' was added (RoadmapFilter)

  feat(schema): [non_breaking] Type 'RoadmapPayload' was added (RoadmapPayload)

  feat(schema): [non_breaking] Type 'RoadmapToProject' was added (RoadmapToProject)

  feat(schema): [non_breaking] Type 'RoadmapToProjectConnection' was added (RoadmapToProjectConnection)

  feat(schema): [non_breaking] Type 'RoadmapToProjectCreateInput' was added (RoadmapToProjectCreateInput)

  feat(schema): [non_breaking] Type 'RoadmapToProjectEdge' was added (RoadmapToProjectEdge)

  feat(schema): [non_breaking] Type 'RoadmapToProjectPayload' was added (RoadmapToProjectPayload)

  feat(schema): [non_breaking] Type 'RoadmapToProjectUpdateInput' was added (RoadmapToProjectUpdateInput)

  feat(schema): [non_breaking] Type 'RoadmapUpdateInput' was added (RoadmapUpdateInput)

  feat(schema): [non_breaking] Type 'TeamNotificationSubscription' was added (TeamNotificationSubscription)

  feat(schema): [non_breaking] Type 'UserAccountEmailChange' was added (UserAccountEmailChange)

  feat(schema): [non_breaking] Type 'UserAccountEmailChangeVerifyCodePayload' was added (UserAccountEmailChangeVerifyCodePayload)

  feat(schema): [non_breaking] Type 'UserCollectionFilter' was added (UserCollectionFilter)

  feat(schema): [non_breaking] Type 'UserRoleType' was added (UserRoleType)

  feat(schema): [non_breaking] Type 'WorkflowConditions' was added (WorkflowConditions)

  feat(schema): [non_breaking] Type 'WorkflowDefinition' was added (WorkflowDefinition)

  feat(schema): [non_breaking] Type 'WorkflowEntityPropertyMatcher' was added (WorkflowEntityPropertyMatcher)

  feat(schema): [non_breaking] Type 'WorkflowTriggerType' was added (WorkflowTriggerType)

  feat(schema): [non_breaking] Type 'WorkflowType' was added (WorkflowType)

  feat(schema): [non_breaking] Type 'WorkspaceAuthorizedApplication' was added (WorkspaceAuthorizedApplication)

  feat(schema): [non_breaking] Field 'ApiKey.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (ApiKey.updatedAt)

  feat(schema): [non_breaking] Input field 'ApiKeyCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (ApiKeyCreateInput.id)

  feat(schema): [non_breaking] Field 'id' was added to object type 'Application' (Application.id)

  feat(schema): [non_breaking] Field 'Attachment.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Attachment.updatedAt)

  feat(schema): [non_breaking] Description '[Alpha] Issue attachment (e.g. support ticket, pull request).' on type 'Attachment' has changed to 'Issue attachment (e.g. support ticket, pull request).' (Attachment)

  feat(schema): [non_breaking] Input field 'AttachmentCreateInput.commentBodyData' description changed from '[Internal] Create a linked comment with Prosemirror body. Please use `commentBody` instead' to 'Create a linked comment with Prosemirror body. Please use `commentBody` instead' (AttachmentCreateInput.commentBodyData)

  feat(schema): [non_breaking] Input field 'AttachmentCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (AttachmentCreateInput.id)

  feat(schema): [non_breaking] Description '[Alpha] Attachment filtering options.' on type 'AttachmentFilter' has changed to 'Attachment filtering options.' (AttachmentFilter)

  feat(schema): [non_breaking] Field 'AuditEntry.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (AuditEntry.updatedAt)

  feat(schema): [non_breaking] Description '[Alpha] Audit entry filtering options.' on type 'AuditEntryFilter' has changed to 'Audit entry filtering options.' (AuditEntryFilter)

  feat(schema): [non_breaking] Description 'Public information of the OAuth application, plus the authorized scopes for a given user.' on type 'AuthorizedApplication' has changed to '[INTERNAL] Public information of the OAuth application, plus the authorized scopes for a given user.' (AuthorizedApplication)

  feat(schema): [non_breaking] Field 'bodyData' was added to object type 'Comment' (Comment.bodyData)

  feat(schema): [non_breaking] Field 'reactionData' was added to object type 'Comment' (Comment.reactionData)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Comment.children' changed from '[Alpha] Filter returned comments.' to 'Filter returned comments.' (Comment.children.filter)

  feat(schema): [non_breaking] Field 'Comment.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Comment.updatedAt)

  feat(schema): [non_breaking] Description '[Alpha] Comment filtering options.' on type 'CommentCollectionFilter' has changed to 'Comment filtering options.' (CommentCollectionFilter)

  feat(schema): [non_breaking] Input field 'CommentCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (CommentCreateInput.id)

  feat(schema): [non_breaking] Description '[Alpha] Comment filtering options.' on type 'CommentFilter' has changed to 'Comment filtering options.' (CommentFilter)

  feat(schema): [non_breaking] Field 'CustomView.filterData' description changed from '[Alpha] The filter applied to issues in the custom view.' to 'The filter applied to issues in the custom view.' (CustomView.filterData)

  feat(schema): [non_breaking] Field 'CustomView.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (CustomView.updatedAt)

  feat(schema): [non_breaking] Input field 'CustomViewCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (CustomViewCreateInput.id)

  feat(schema): [non_breaking] Field 'description' was added to object type 'Cycle' (Cycle.description)

  feat(schema): [non_breaking] Field 'inProgressScopeHistory' was added to object type 'Cycle' (Cycle.inProgressScopeHistory)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Cycle.issues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (Cycle.issues.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Cycle.uncompletedIssuesUponClose' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (Cycle.uncompletedIssuesUponClose.filter)

  feat(schema): [non_breaking] Field 'Cycle.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Cycle.updatedAt)

  feat(schema): [non_breaking] Input field 'CycleCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (CycleCreateInput.id)

  feat(schema): [non_breaking] Description '[Alpha] Project filtering options.' on type 'CycleFilter' has changed to 'Cycle filtering options.' (CycleFilter)

  feat(schema): [non_breaking] Field 'Document.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Document.updatedAt)

  feat(schema): [non_breaking] Input field 'DocumentCreateInput.contentData' description changed from '[Internal] The document content as a Prosemirror document.' to 'The document content as a Prosemirror document.' (DocumentCreateInput.contentData)

  feat(schema): [non_breaking] Input field 'DocumentCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (DocumentCreateInput.id)

  feat(schema): [non_breaking] Input field 'DocumentUpdateInput.contentData' description changed from '[Internal] The document content as a Prosemirror document.' to 'The document content as a Prosemirror document.' (DocumentUpdateInput.contentData)

  feat(schema): [non_breaking] Field 'Emoji.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Emoji.updatedAt)

  feat(schema): [non_breaking] Input field 'EmojiCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (EmojiCreateInput.id)

  feat(schema): [non_breaking] Field 'Entity.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Entity.updatedAt)

  feat(schema): [non_breaking] Field 'roadmap' was added to object type 'Favorite' (Favorite.roadmap)

  feat(schema): [non_breaking] Field 'Favorite.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Favorite.updatedAt)

  feat(schema): [non_breaking] Input field 'FavoriteUpdateInput.parentId' description changed from 'The id of the folder to move the favorite under.' to 'The identifier (in UUID v4 format) of the folder to move the favorite under.' (FavoriteUpdateInput.parentId)

  feat(schema): [non_breaking] Field 'isPersonal' was added to object type 'GithubOrg' (GithubOrg.isPersonal)

  feat(schema): [non_breaking] Field 'Integration.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Integration.updatedAt)

  feat(schema): [non_breaking] Field 'IntegrationResource.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (IntegrationResource.updatedAt)

  feat(schema): [non_breaking] Field 'front' was added to object type 'IntegrationSettings' (IntegrationSettings.front)

  feat(schema): [non_breaking] Field 'gitHub' was added to object type 'IntegrationSettings' (IntegrationSettings.gitHub)

  feat(schema): [non_breaking] Field 'slackOrgProjectUpdatesPost' was added to object type 'IntegrationSettings' (IntegrationSettings.slackOrgProjectUpdatesPost)

  feat(schema): [non_breaking] Field 'automateTicketReopeningOnCancellation' was added to object type 'IntercomSettings' (IntercomSettings.automateTicketReopeningOnCancellation)

  feat(schema): [non_breaking] Field 'automateTicketReopeningOnComment' was added to object type 'IntercomSettings' (IntercomSettings.automateTicketReopeningOnComment)

  feat(schema): [non_breaking] Field 'automateTicketReopeningOnCompletion' was added to object type 'IntercomSettings' (IntercomSettings.automateTicketReopeningOnCompletion)

  feat(schema): [non_breaking] Field 'descriptionData' was added to object type 'Issue' (Issue.descriptionData)

  feat(schema): [non_breaking] Field 'triagedAt' was added to object type 'Issue' (Issue.triagedAt)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Issue.attachments' changed from '[Alpha] Filter returned attachments.' to 'Filter returned attachments.' (Issue.attachments.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Issue.children' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (Issue.children.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Issue.comments' changed from '[Alpha] Filter returned comments.' to 'Filter returned comments.' (Issue.comments.filter)

  feat(schema): [non_breaking] Field 'Issue.integrationResources' description changed from 'Integration resources for this issue.' to '[DEPRECATED] Integration resources for this issue.' (Issue.integrationResources)

  feat(schema): [non_breaking] Field 'Issue.integrationResources' is deprecated (Issue.integrationResources)

  feat(schema): [non_breaking] Field 'Issue.integrationResources' has deprecation reason 'This field will soon be deprecated, please use `attachments` instead' (Issue.integrationResources)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Issue.labels' changed from '[Alpha] Filter returned issue labels.' to 'Filter returned issue labels.' (Issue.labels.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Issue.subscribers' changed from '[Alpha] Filter returned subscribers.' to 'Filter returned subscribers.' (Issue.subscribers.filter)

  feat(schema): [non_breaking] Field 'Issue.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Issue.updatedAt)

  feat(schema): [non_breaking] Description '[Alpha] Issue filtering options.' on type 'IssueCollectionFilter' has changed to 'Issue filtering options.' (IssueCollectionFilter)

  feat(schema): [non_breaking] Input field 'IssueCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (IssueCreateInput.id)

  feat(schema): [non_breaking] Description '[Alpha] Issue filtering options.' on type 'IssueFilter' has changed to 'Issue filtering options.' (IssueFilter)

  feat(schema): [non_breaking] Field 'actorId' was added to object type 'IssueHistory' (IssueHistory.actorId)

  feat(schema): [non_breaking] Field 'attachmentId' was added to object type 'IssueHistory' (IssueHistory.attachmentId)

  feat(schema): [non_breaking] Field 'fromAssigneeId' was added to object type 'IssueHistory' (IssueHistory.fromAssigneeId)

  feat(schema): [non_breaking] Field 'fromCycleId' was added to object type 'IssueHistory' (IssueHistory.fromCycleId)

  feat(schema): [non_breaking] Field 'fromParentId' was added to object type 'IssueHistory' (IssueHistory.fromParentId)

  feat(schema): [non_breaking] Field 'fromProjectId' was added to object type 'IssueHistory' (IssueHistory.fromProjectId)

  feat(schema): [non_breaking] Field 'fromStateId' was added to object type 'IssueHistory' (IssueHistory.fromStateId)

  feat(schema): [non_breaking] Field 'fromTeamId' was added to object type 'IssueHistory' (IssueHistory.fromTeamId)

  feat(schema): [non_breaking] Field 'toAssigneeId' was added to object type 'IssueHistory' (IssueHistory.toAssigneeId)

  feat(schema): [non_breaking] Field 'toConvertedProject' was added to object type 'IssueHistory' (IssueHistory.toConvertedProject)

  feat(schema): [non_breaking] Field 'toConvertedProjectId' was added to object type 'IssueHistory' (IssueHistory.toConvertedProjectId)

  feat(schema): [non_breaking] Field 'toCycleId' was added to object type 'IssueHistory' (IssueHistory.toCycleId)

  feat(schema): [non_breaking] Field 'toParentId' was added to object type 'IssueHistory' (IssueHistory.toParentId)

  feat(schema): [non_breaking] Field 'toProjectId' was added to object type 'IssueHistory' (IssueHistory.toProjectId)

  feat(schema): [non_breaking] Field 'toStateId' was added to object type 'IssueHistory' (IssueHistory.toStateId)

  feat(schema): [non_breaking] Field 'toTeamId' was added to object type 'IssueHistory' (IssueHistory.toTeamId)

  feat(schema): [non_breaking] Field 'IssueHistory.autoArchived' has description 'Whether the issue was auto-archived.' (IssueHistory.autoArchived)

  feat(schema): [non_breaking] Field 'IssueHistory.autoClosed' has description 'Whether the issue was auto-closed.' (IssueHistory.autoClosed)

  feat(schema): [non_breaking] Field 'IssueHistory.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (IssueHistory.updatedAt)

  feat(schema): [non_breaking] Field 'progress' was added to object type 'IssueImport' (IssueImport.progress)

  feat(schema): [non_breaking] Field 'teamName' was added to object type 'IssueImport' (IssueImport.teamName)

  feat(schema): [non_breaking] Field 'IssueImport.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (IssueImport.updatedAt)

  feat(schema): [non_breaking] Field 'children' was added to object type 'IssueLabel' (IssueLabel.children)

  feat(schema): [non_breaking] Field 'parent' was added to object type 'IssueLabel' (IssueLabel.parent)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'IssueLabel.issues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (IssueLabel.issues.filter)

  feat(schema): [non_breaking] Field 'IssueLabel.organization' changed type from 'Organization' to 'Organization!' (IssueLabel.organization)

  feat(schema): [non_breaking] Field 'IssueLabel.team' description changed from 'The team that the label is associated with. If null, the label is associated with the global workspace..' to 'The team that the label is associated with. If null, the label is associated with the global workspace.' (IssueLabel.team)

  feat(schema): [non_breaking] Field 'IssueLabel.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (IssueLabel.updatedAt)

  feat(schema): [non_breaking] Description '[Alpha] Issue label filtering options.' on type 'IssueLabelCollectionFilter' has changed to 'Issue label filtering options.' (IssueLabelCollectionFilter)

  feat(schema): [non_breaking] Input field 'IssueLabelCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (IssueLabelCreateInput.id)

  feat(schema): [non_breaking] Description '[Alpha] Issue label filtering options.' on type 'IssueLabelFilter' has changed to 'Issue label filtering options.' (IssueLabelFilter)

  feat(schema): [non_breaking] Field 'actor' was added to object type 'IssueNotification' (IssueNotification.actor)

  feat(schema): [non_breaking] Field 'unsnoozedAt' was added to object type 'IssueNotification' (IssueNotification.unsnoozedAt)

  feat(schema): [non_breaking] Field 'IssueNotification.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (IssueNotification.updatedAt)

  feat(schema): [non_breaking] Field 'IssueRelation.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (IssueRelation.updatedAt)

  feat(schema): [non_breaking] Input field 'IssueRelationCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (IssueRelationCreateInput.id)

  feat(schema): [non_breaking] Description 'The `JSON` scalar type represents JSON values' on type 'JSON' has changed to 'The `JSON` scalar type represents arbitrary values as _stringified_ JSON' (JSON)

  feat(schema): [non_breaking] Description 'The `JSONObject` scalar type represents JSON values as a string' on type 'JSONObject' has changed to 'The `JSONObject` scalar type represents arbitrary values as _embedded_ JSON' (JSONObject)

  feat(schema): [non_breaking] Field 'description' was added to object type 'Milestone' (Milestone.description)

  feat(schema): [non_breaking] Field 'targetDate' was added to object type 'Milestone' (Milestone.targetDate)

  feat(schema): [non_breaking] Field 'Milestone.projects' is deprecated (Milestone.projects)

  feat(schema): [non_breaking] Field 'Milestone.projects' has deprecation reason 'Milestones will be removed. Use roadmaps instead.' (Milestone.projects)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Milestone.projects' changed from '[Alpha] Filter returned projects.' to 'Filter returned projects.' (Milestone.projects.filter)

  feat(schema): [non_breaking] Field 'Milestone.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Milestone.updatedAt)

  feat(schema): [non_breaking] Input field 'MilestoneCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (MilestoneCreateInput.id)

  feat(schema): [non_breaking] Field 'airbyteIntegrationConnect' was added to object type 'Mutation' (Mutation.airbyteIntegrationConnect)

  feat(schema): [non_breaking] Field 'contactSalesCreate' was added to object type 'Mutation' (Mutation.contactSalesCreate)

  feat(schema): [non_breaking] Field 'integrationRequest' was added to object type 'Mutation' (Mutation.integrationRequest)

  feat(schema): [non_breaking] Field 'integrationSlackOrgProjectUpdatesPost' was added to object type 'Mutation' (Mutation.integrationSlackOrgProjectUpdatesPost)

  feat(schema): [non_breaking] Field 'integrationTemplateCreate' was added to object type 'Mutation' (Mutation.integrationTemplateCreate)

  feat(schema): [non_breaking] Field 'integrationTemplateDelete' was added to object type 'Mutation' (Mutation.integrationTemplateDelete)

  feat(schema): [non_breaking] Field 'integrationsSettingsCreate' was added to object type 'Mutation' (Mutation.integrationsSettingsCreate)

  feat(schema): [non_breaking] Field 'integrationsSettingsUpdate' was added to object type 'Mutation' (Mutation.integrationsSettingsUpdate)

  feat(schema): [non_breaking] Field 'issueReminder' was added to object type 'Mutation' (Mutation.issueReminder)

  feat(schema): [non_breaking] Field 'logout' was added to object type 'Mutation' (Mutation.logout)

  feat(schema): [non_breaking] Field 'migrateMilestonesToRoadmaps' was added to object type 'Mutation' (Mutation.migrateMilestonesToRoadmaps)

  feat(schema): [non_breaking] Field 'notificationSubscriptionUpdate' was added to object type 'Mutation' (Mutation.notificationSubscriptionUpdate)

  feat(schema): [non_breaking] Field 'organizationDomainClaim' was added to object type 'Mutation' (Mutation.organizationDomainClaim)

  feat(schema): [non_breaking] Field 'organizationInviteUpdate' was added to object type 'Mutation' (Mutation.organizationInviteUpdate)

  feat(schema): [non_breaking] Field 'projectUpdateCreate' was added to object type 'Mutation' (Mutation.projectUpdateCreate)

  feat(schema): [non_breaking] Field 'projectUpdateDelete' was added to object type 'Mutation' (Mutation.projectUpdateDelete)

  feat(schema): [non_breaking] Field 'projectUpdateInteractionCreate' was added to object type 'Mutation' (Mutation.projectUpdateInteractionCreate)

  feat(schema): [non_breaking] Field 'projectUpdateMarkAsRead' was added to object type 'Mutation' (Mutation.projectUpdateMarkAsRead)

  feat(schema): [non_breaking] Field 'projectUpdateUpdate' was added to object type 'Mutation' (Mutation.projectUpdateUpdate)

  feat(schema): [non_breaking] Field 'roadmapCreate' was added to object type 'Mutation' (Mutation.roadmapCreate)

  feat(schema): [non_breaking] Field 'roadmapDelete' was added to object type 'Mutation' (Mutation.roadmapDelete)

  feat(schema): [non_breaking] Field 'roadmapToProjectCreate' was added to object type 'Mutation' (Mutation.roadmapToProjectCreate)

  feat(schema): [non_breaking] Field 'roadmapToProjectDelete' was added to object type 'Mutation' (Mutation.roadmapToProjectDelete)

  feat(schema): [non_breaking] Field 'roadmapToProjectUpdate' was added to object type 'Mutation' (Mutation.roadmapToProjectUpdate)

  feat(schema): [non_breaking] Field 'roadmapUpdate' was added to object type 'Mutation' (Mutation.roadmapUpdate)

  feat(schema): [non_breaking] Field 'teamCyclesDelete' was added to object type 'Mutation' (Mutation.teamCyclesDelete)

  feat(schema): [non_breaking] Field 'userAccountEmailChangeVerifyCode' was added to object type 'Mutation' (Mutation.userAccountEmailChangeVerifyCode)

  feat(schema): [non_breaking] Field 'userDemoteMember' was added to object type 'Mutation' (Mutation.userDemoteMember)

  feat(schema): [non_breaking] Field 'userGitHubConnect' was added to object type 'Mutation' (Mutation.userGitHubConnect)

  feat(schema): [non_breaking] Field 'userGoogleCalendarConnect' was added to object type 'Mutation' (Mutation.userGoogleCalendarConnect)

  feat(schema): [non_breaking] Field 'userPromoteMember' was added to object type 'Mutation' (Mutation.userPromoteMember)

  feat(schema): [non_breaking] Field 'Mutation.apiKeyCreate' description changed from '[Internal] Creates a new API key.' to 'Creates a new API key.' (Mutation.apiKeyCreate)

  feat(schema): [non_breaking] Field 'Mutation.apiKeyDelete' description changed from '[Internal] Deletes an API key.' to 'Deletes an API key.' (Mutation.apiKeyDelete)

  feat(schema): [non_breaking] Field 'Mutation.attachmentCreate' description changed from '[Alpha] Creates a new attachment, or updates existing if the same `url` and `issueId` is used.' to 'Creates a new attachment, or updates existing if the same `url` and `issueId` is used.' (Mutation.attachmentCreate)

  feat(schema): [non_breaking] Field 'Mutation.attachmentDelete' description changed from '[Alpha] Deletes an issue attachment.' to 'Deletes an issue attachment.' (Mutation.attachmentDelete)

  feat(schema): [non_breaking] Field 'Mutation.attachmentUpdate' description changed from '[Alpha] Updates an existing issue attachment.' to 'Updates an existing issue attachment.' (Mutation.attachmentUpdate)

  feat(schema): [non_breaking] Field 'Mutation.integrationResourceArchive' is deprecated (Mutation.integrationResourceArchive)

  feat(schema): [non_breaking] Field 'Mutation.integrationResourceArchive' has deprecation reason 'This query will soon be deprecated, please use `attachmentArchive` instead' (Mutation.integrationResourceArchive)

  feat(schema): [non_breaking] Type for argument 'teamId' on field 'Mutation.issueImportCreateAsana' changed from 'String!' to 'String' (Mutation.issueImportCreateAsana.teamId)

  feat(schema): [non_breaking] Field 'Mutation.issueImportCreateClubhouse' description changed from 'Kicks off a Clubhouse import job.' to 'Kicks off a Shortcut (formerly Clubhouse) import job.' (Mutation.issueImportCreateClubhouse)

  feat(schema): [non_breaking] Description for argument 'clubhouseTeamName' on field 'Mutation.issueImportCreateClubhouse' changed from 'Clubhouse team name to choose which issues we should import.' to 'Shortcut (formerly Clubhouse) team name to choose which issues we should import.' (Mutation.issueImportCreateClubhouse.clubhouseTeamName)

  feat(schema): [non_breaking] Description for argument 'clubhouseToken' on field 'Mutation.issueImportCreateClubhouse' changed from 'Clubhouse token to fetch information from the Clubhouse API.' to 'Shortcut (formerly Clubhouse) token to fetch information from the Clubhouse API.' (Mutation.issueImportCreateClubhouse.clubhouseToken)

  feat(schema): [non_breaking] Type for argument 'teamId' on field 'Mutation.issueImportCreateClubhouse' changed from 'String!' to 'String' (Mutation.issueImportCreateClubhouse.teamId)

  feat(schema): [non_breaking] Type for argument 'teamId' on field 'Mutation.issueImportCreateGithub' changed from 'String!' to 'String' (Mutation.issueImportCreateGithub.teamId)

  feat(schema): [non_breaking] Description for argument 'teamId' on field 'Mutation.issueImportCreateJira' changed from 'ID of the team into which to import data.' to 'ID of the team into which to import data. Empty to create new team.' (Mutation.issueImportCreateJira.teamId)

  feat(schema): [non_breaking] Type for argument 'teamId' on field 'Mutation.issueImportCreateJira' changed from 'String!' to 'String' (Mutation.issueImportCreateJira.teamId)

  feat(schema): [non_breaking] Field 'Mutation.issueLabelArchive' description changed from 'Archives an issue label.' to 'Deletes an issue label.' (Mutation.issueLabelArchive)

  feat(schema): [non_breaking] Deprecation reason on field 'Mutation.issueLabelArchive' has changed from 'Labels are deleted instead of archived.' to 'Labels are deleted instead of archived now!' (Mutation.issueLabelArchive)

  feat(schema): [non_breaking] Field 'Mutation.milestoneCreate' is deprecated (Mutation.milestoneCreate)

  feat(schema): [non_breaking] Field 'Mutation.milestoneCreate' has deprecation reason 'Milestones will be removed. Use roadmaps instead.' (Mutation.milestoneCreate)

  feat(schema): [non_breaking] Field 'Mutation.milestoneDelete' is deprecated (Mutation.milestoneDelete)

  feat(schema): [non_breaking] Field 'Mutation.milestoneDelete' has deprecation reason 'Milestones will be removed. Use roadmaps instead.' (Mutation.milestoneDelete)

  feat(schema): [non_breaking] Field 'Mutation.milestoneUpdate' is deprecated (Mutation.milestoneUpdate)

  feat(schema): [non_breaking] Field 'Mutation.milestoneUpdate' has deprecation reason 'Milestones will be removed. Use roadmaps instead.' (Mutation.milestoneUpdate)

  feat(schema): [non_breaking] Description for argument 'input' on field 'Mutation.notificationUpdate' changed from 'A partial notification object to update the issue with.' to 'A partial notification object to update the notification with.' (Mutation.notificationUpdate.input)

  feat(schema): [non_breaking] Field 'Mutation.organizationDomainCreate' description changed from 'Adds a domain to be allowed for an organization.' to '[INTERNAL] Adds a domain to be allowed for an organization.' (Mutation.organizationDomainCreate)

  feat(schema): [non_breaking] Field 'Mutation.organizationDomainVerify' description changed from 'Verifies a domain to be added to an organization.' to '[INTERNAL] Verifies a domain to be added to an organization.' (Mutation.organizationDomainVerify)

  feat(schema): [non_breaking] Field 'actor' was added to interface 'Notification' (Notification.actor)

  feat(schema): [non_breaking] Field 'unsnoozedAt' was added to interface 'Notification' (Notification.unsnoozedAt)

  feat(schema): [non_breaking] Field 'Notification.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Notification.updatedAt)

  feat(schema): [non_breaking] Input field 'NotificationSubscriptionCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (NotificationSubscriptionCreateInput.id)

  feat(schema): [non_breaking] Input field 'NullableCycleFilter.and' description changed from 'Compound filters, all of which need to be matched by the cycle.' to 'Compound filters, one of which need to be matched by the cycle.' (NullableCycleFilter.and)

  feat(schema): [non_breaking] Description '[Alpha] Cycle filtering options.' on type 'NullableCycleFilter' has changed to 'Cycle filtering options.' (NullableCycleFilter)

  feat(schema): [non_breaking] Description '[Alpha] Project filtering options.' on type 'NullableProjectFilter' has changed to 'Project filtering options.' (NullableProjectFilter)

  feat(schema): [non_breaking] Description '[Alpha] User filtering options.' on type 'NullableUserFilter' has changed to 'User filtering options.' (NullableUserFilter)

  feat(schema): [non_breaking] Field 'creator' was added to object type 'OauthClient' (OauthClient.creator)

  feat(schema): [non_breaking] Field 'organization' was added to object type 'OauthClient' (OauthClient.organization)

  feat(schema): [non_breaking] Field 'OauthClient.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (OauthClient.updatedAt)

  feat(schema): [non_breaking] Field 'previousUrlKeys' was added to object type 'Organization' (Organization.previousUrlKeys)

  feat(schema): [non_breaking] Field 'projectUpdateRemindersDay' was added to object type 'Organization' (Organization.projectUpdateRemindersDay)

  feat(schema): [non_breaking] Field 'projectUpdateRemindersHour' was added to object type 'Organization' (Organization.projectUpdateRemindersHour)

  feat(schema): [non_breaking] Field 'projectUpdatesReminderFrequency' was added to object type 'Organization' (Organization.projectUpdatesReminderFrequency)

  feat(schema): [non_breaking] Field 'scimEnabled' was added to object type 'Organization' (Organization.scimEnabled)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Organization.labels' changed from '[Alpha] Filter returned issue labels.' to 'Filter returned issue labels.' (Organization.labels.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Organization.teams' changed from '[Alpha] Filter returned teams.' to 'Filter returned teams.' (Organization.teams.filter)

  feat(schema): [non_breaking] Field 'Organization.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Organization.updatedAt)

  feat(schema): [non_breaking] Field 'authType' was added to object type 'OrganizationDomain' (OrganizationDomain.authType)

  feat(schema): [non_breaking] Field 'claimed' was added to object type 'OrganizationDomain' (OrganizationDomain.claimed)

  feat(schema): [non_breaking] Field 'OrganizationDomain.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (OrganizationDomain.updatedAt)

  feat(schema): [non_breaking] Input field 'OrganizationDomainCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (OrganizationDomainCreateInput.id)

  feat(schema): [non_breaking] Input field 'OrganizationDomainCreateInput.verificationEmail' changed type from 'String!' to 'String' (OrganizationDomainCreateInput.verificationEmail)

  feat(schema): [non_breaking] Object type 'OrganizationDomainPayload' has description '[INTERNAL] Organization domain operation response.' (OrganizationDomainPayload)

  feat(schema): [non_breaking] Object type 'OrganizationDomainSimplePayload' has description '[INTERNAL] Organization domain operation response.' (OrganizationDomainSimplePayload)

  feat(schema): [non_breaking] Input field 'OrganizationDomainVerificationInput.organizationDomainId' description changed from 'The identifier of the domain being verified.' to 'The identifier in UUID v4 format of the domain being verified.' (OrganizationDomainVerificationInput.organizationDomainId)

  feat(schema): [non_breaking] Field 'role' was added to object type 'OrganizationInvite' (OrganizationInvite.role)

  feat(schema): [non_breaking] Field 'OrganizationInvite.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (OrganizationInvite.updatedAt)

  feat(schema): [non_breaking] Input field 'OrganizationInviteCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (OrganizationInviteCreateInput.id)

  feat(schema): [non_breaking] Field 'role' was added to object type 'OrganizationInviteDetailsPayload' (OrganizationInviteDetailsPayload.role)

  feat(schema): [non_breaking] Field 'convertedFromIssue' was added to object type 'Project' (Project.convertedFromIssue)

  feat(schema): [non_breaking] Field 'inProgressScopeHistory' was added to object type 'Project' (Project.inProgressScopeHistory)

  feat(schema): [non_breaking] Field 'initiative' was added to object type 'Project' (Project.initiative)

  feat(schema): [non_breaking] Field 'integrationsSettings' was added to object type 'Project' (Project.integrationsSettings)

  feat(schema): [non_breaking] Field 'projectUpdateRemindersPausedUntilAt' was added to object type 'Project' (Project.projectUpdateRemindersPausedUntilAt)

  feat(schema): [non_breaking] Field 'projectUpdates' was added to object type 'Project' (Project.projectUpdates)

  feat(schema): [non_breaking] Field 'scope' was added to object type 'Project' (Project.scope)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Project.issues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (Project.issues.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Project.members' changed from '[Alpha] Filter returned users.' to 'Filter returned users.' (Project.members.filter)

  feat(schema): [non_breaking] Field 'Project.milestone' is deprecated (Project.milestone)

  feat(schema): [non_breaking] Field 'Project.milestone' has deprecation reason 'Milestones will be removed. Use roadmaps instead.' (Project.milestone)

  feat(schema): [non_breaking] Field 'Project.sortOrder' description changed from 'The sort order for the project within its milestone.' to 'The sort order for the project within its milestone/initiative.' (Project.sortOrder)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Project.teams' changed from '[Alpha] Filter returned teams.' to 'Filter returned teams.' (Project.teams.filter)

  feat(schema): [non_breaking] Field 'Project.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Project.updatedAt)

  feat(schema): [non_breaking] Description '[Alpha] Project filtering options.' on type 'ProjectCollectionFilter' has changed to 'Project filtering options.' (ProjectCollectionFilter)

  feat(schema): [non_breaking] Input field 'ProjectCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (ProjectCreateInput.id)

  feat(schema): [non_breaking] Input field 'ProjectCreateInput.sortOrder' description changed from 'The sort order for the project within its milestone.' to 'The sort order for the project within shared views.' (ProjectCreateInput.sortOrder)

  feat(schema): [non_breaking] Input field 'ProjectCreateInput.startDate' description changed from '[Internal] The planned start date of the project.' to 'The planned start date of the project.' (ProjectCreateInput.startDate)

  feat(schema): [non_breaking] Description '[Alpha] Project filtering options.' on type 'ProjectFilter' has changed to 'Project filtering options.' (ProjectFilter)

  feat(schema): [non_breaking] Field 'ProjectLink.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (ProjectLink.updatedAt)

  feat(schema): [non_breaking] Input field 'ProjectLinkCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (ProjectLinkCreateInput.id)

  feat(schema): [non_breaking] Input field 'ProjectUpdateInput.sortOrder' description changed from 'The sort order for the project within its milestone.' to 'The sort order for the project in shared views.' (ProjectUpdateInput.sortOrder)

  feat(schema): [non_breaking] Input field 'ProjectUpdateInput.startDate' description changed from '[Internal] The planned start date of the project.' to 'The planned start date of the project.' (ProjectUpdateInput.startDate)

  feat(schema): [non_breaking] Field 'reviewers' was added to object type 'PullRequestPayload' (PullRequestPayload.reviewers)

  feat(schema): [non_breaking] Field 'reviews' was added to object type 'PullRequestPayload' (PullRequestPayload.reviews)

  feat(schema): [non_breaking] Field 'PushSubscription.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (PushSubscription.updatedAt)

  feat(schema): [non_breaking] Input field 'PushSubscriptionCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (PushSubscriptionCreateInput.id)

  feat(schema): [non_breaking] Field 'applicationInfoByIds' was added to object type 'Query' (Query.applicationInfoByIds)

  feat(schema): [non_breaking] Field 'integrationTemplate' was added to object type 'Query' (Query.integrationTemplate)

  feat(schema): [non_breaking] Field 'integrationTemplates' was added to object type 'Query' (Query.integrationTemplates)

  feat(schema): [non_breaking] Field 'integrationsSettings' was added to object type 'Query' (Query.integrationsSettings)

  feat(schema): [non_breaking] Field 'organizationDomainClaimRequest' was added to object type 'Query' (Query.organizationDomainClaimRequest)

  feat(schema): [non_breaking] Field 'projectUpdate' was added to object type 'Query' (Query.projectUpdate)

  feat(schema): [non_breaking] Field 'projectUpdateInteraction' was added to object type 'Query' (Query.projectUpdateInteraction)

  feat(schema): [non_breaking] Field 'projectUpdateInteractions' was added to object type 'Query' (Query.projectUpdateInteractions)

  feat(schema): [non_breaking] Field 'projectUpdates' was added to object type 'Query' (Query.projectUpdates)

  feat(schema): [non_breaking] Field 'roadmap' was added to object type 'Query' (Query.roadmap)

  feat(schema): [non_breaking] Field 'roadmapToProject' was added to object type 'Query' (Query.roadmapToProject)

  feat(schema): [non_breaking] Field 'roadmapToProjects' was added to object type 'Query' (Query.roadmapToProjects)

  feat(schema): [non_breaking] Field 'roadmaps' was added to object type 'Query' (Query.roadmaps)

  feat(schema): [non_breaking] Field 'workspaceAuthorizedApplications' was added to object type 'Query' (Query.workspaceAuthorizedApplications)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.administrableTeams' changed from '[Alpha] Filter returned teams.' to 'Filter returned teams.' (Query.administrableTeams.filter)

  feat(schema): [non_breaking] Field 'Query.apiKeys' description changed from '[Internal] All API keys for the user.' to 'All API keys for the user.' (Query.apiKeys)

  feat(schema): [non_breaking] Field 'Query.attachment' description changed from '[Alpha] One specific issue attachment.
  [Deprecated] 'url' can no longer be used as the 'id' parameter. Use 'attachmentsForUrl' instead' to 'One specific issue attachment.
  [Deprecated] 'url' can no longer be used as the 'id' parameter. Use 'attachmentsForUrl' instead' (Query.attachment)

  feat(schema): [non_breaking] Field 'Query.attachmentIssue' description changed from '[Alpha] Query an issue by its associated attachment, and its id.' to 'Query an issue by its associated attachment, and its id.' (Query.attachmentIssue)

  feat(schema): [non_breaking] Field 'Query.attachments' description changed from '[Alpha] All issue attachments.

  To get attachments for a given URL, use `attachmentsForURL` query.' to 'All issue attachments.

  To get attachments for a given URL, use `attachmentsForURL` query.' (Query.attachments)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.attachments' changed from '[Alpha] Filter returned attachments.' to 'Filter returned attachments.' (Query.attachments.filter)

  feat(schema): [non_breaking] Field 'Query.attachmentsForURL' description changed from '[Alpha] Returns issue attachments for a given `url`.' to 'Returns issue attachments for a given `url`.' (Query.attachmentsForURL)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.auditEntries' changed from '[Alpha] Filter returned audit entries.' to 'Filter returned audit entries.' (Query.auditEntries.filter)

  feat(schema): [non_breaking] Field 'Query.authorizedApplications' description changed from 'Get all authorized applications for a user' to '[INTERNAL] Get all authorized applications for a user' (Query.authorizedApplications)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.comments' changed from '[Alpha] Filter returned comments.' to 'Filter returned comments.' (Query.comments.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.cycles' changed from '[Alpha] Filter returned users.' to 'Filter returned users.' (Query.cycles.filter)

  feat(schema): [non_breaking] Field 'Query.integrationResource' is deprecated (Query.integrationResource)

  feat(schema): [non_breaking] Field 'Query.integrationResource' has deprecation reason 'This query will soon be deprecated, please use `attachment` instead' (Query.integrationResource)

  feat(schema): [non_breaking] Field 'Query.integrationResources' is deprecated (Query.integrationResources)

  feat(schema): [non_breaking] Field 'Query.integrationResources' has deprecation reason 'This query will soon be deprecated, please use `attachments` instead' (Query.integrationResources)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.issueLabels' changed from '[Alpha] Filter returned issue labels.' to 'Filter returned issue labels.' (Query.issueLabels.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.issueSearch' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (Query.issueSearch.filter)

  feat(schema): [non_breaking] Field 'Query.issueVcsBranchSearch' description changed from '[Internal] Find issue based on the VCS branch name.' to 'Find issue based on the VCS branch name.' (Query.issueVcsBranchSearch)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.issues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (Query.issues.filter)

  feat(schema): [non_breaking] Field 'Query.milestone' is deprecated (Query.milestone)

  feat(schema): [non_breaking] Field 'Query.milestone' has deprecation reason 'Milestones will be removed. Use roadmaps instead.' (Query.milestone)

  feat(schema): [non_breaking] Field 'Query.milestones' is deprecated (Query.milestones)

  feat(schema): [non_breaking] Field 'Query.milestones' has deprecation reason 'Milestones will be removed. Use roadmaps instead.' (Query.milestones)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.projects' changed from '[Alpha] Filter returned projects.' to 'Filter returned projects.' (Query.projects.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.teams' changed from '[Alpha] Filter returned teams.' to 'Filter returned teams.' (Query.teams.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.users' changed from '[Alpha] Filter returned users.' to 'Filter returned users.' (Query.users.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.workflowStates' changed from '[Alpha] Filter returned workflow states.' to 'Filter returned workflow states.' (Query.workflowStates.filter)

  feat(schema): [non_breaking] Field 'Reaction.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Reaction.updatedAt)

  feat(schema): [non_breaking] Description 'A reaction associated with a comment.' on type 'Reaction' has changed to 'A reaction associated with a comment or a project update.' (Reaction)

  feat(schema): [non_breaking] Input field 'ReactionCreateInput.commentId' changed type from 'String!' to 'String' (ReactionCreateInput.commentId)

  feat(schema): [non_breaking] Input field 'ReactionCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one' (ReactionCreateInput.id)

  feat(schema): [non_breaking] Field 'integrationsSettings' was added to object type 'Team' (Team.integrationsSettings)

  feat(schema): [non_breaking] Field 'issueSortOrderDefaultToBottom' was added to object type 'Team' (Team.issueSortOrderDefaultToBottom)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Team.cycles' changed from '[Alpha] Filter returned cycles.' to 'Filter returned cycles.' (Team.cycles.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Team.issues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (Team.issues.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Team.labels' changed from '[Alpha] Filter returned issue labels.' to 'Filter returned issue labels.' (Team.labels.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Team.members' changed from '[Alpha] Filter returned users.' to 'Filter returned users.' (Team.members.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Team.projects' changed from '[Alpha] Filter returned projects.' to 'Filter returned projects.' (Team.projects.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Team.states' changed from '[Alpha] Filter returned workflow states.' to 'Filter returned workflow states.' (Team.states.filter)

  feat(schema): [non_breaking] Field 'Team.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Team.updatedAt)

  feat(schema): [non_breaking] Input field 'TeamCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (TeamCreateInput.id)

  feat(schema): [non_breaking] Description '[Alpha] Project filtering options.' on type 'TeamFilter' has changed to 'Team filtering options.' (TeamFilter)

  feat(schema): [non_breaking] Field 'sortOrder' was added to object type 'TeamMembership' (TeamMembership.sortOrder)

  feat(schema): [non_breaking] Field 'TeamMembership.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (TeamMembership.updatedAt)

  feat(schema): [non_breaking] Input field 'TeamMembershipCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (TeamMembershipCreateInput.id)

  feat(schema): [non_breaking] Input field 'TeamMembershipUpdateInput.owner' changed type from 'Boolean!' to 'Boolean' (TeamMembershipUpdateInput.owner)

  feat(schema): [non_breaking] Field 'lastUpdatedBy' was added to object type 'Template' (Template.lastUpdatedBy)

  feat(schema): [non_breaking] Field 'Template.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Template.updatedAt)

  feat(schema): [non_breaking] Input field 'TemplateCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (TemplateCreateInput.id)

  feat(schema): [non_breaking] Input field 'UpdateOrganizationInput.reducedPersonalInformation' description changed from 'Whether the organization is using project milestones.' to 'Whether the organization has opted for reduced customer support attachment information.' (UpdateOrganizationInput.reducedPersonalInformation)

  feat(schema): [non_breaking] Input field 'UpdateOrganizationInput.roadmapEnabled' description changed from 'Whether the organization is using project milestones.' to 'Whether the organization is using roadmap.' (UpdateOrganizationInput.roadmapEnabled)

  feat(schema): [non_breaking] Field 'calendarHash' was added to object type 'User' (User.calendarHash)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'User.assignedIssues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (User.assignedIssues.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'User.createdIssues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (User.createdIssues.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'User.teams' changed from '[Alpha] Filter returned teams.' to 'Filter returned teams.' (User.teams.filter)

  feat(schema): [non_breaking] Field 'User.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (User.updatedAt)

  feat(schema): [non_breaking] Field 'approvalErrorCode' was added to object type 'UserAuthorizedApplication' (UserAuthorizedApplication.approvalErrorCode)

  feat(schema): [non_breaking] Field 'id' was added to object type 'UserAuthorizedApplication' (UserAuthorizedApplication.id)

  feat(schema): [non_breaking] Description '[Alpha] User filtering options.' on type 'UserFilter' has changed to 'User filtering options.' (UserFilter)

  feat(schema): [non_breaking] Field 'UserSettings.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (UserSettings.updatedAt)

  feat(schema): [non_breaking] Field 'ViewPreferences.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (ViewPreferences.updatedAt)

  feat(schema): [non_breaking] Input field 'ViewPreferencesCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (ViewPreferencesCreateInput.id)

  feat(schema): [non_breaking] Field 'Webhook.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Webhook.updatedAt)

  feat(schema): [non_breaking] Input field 'WebhookCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (WebhookCreateInput.id)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'WorkflowState.issues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (WorkflowState.issues.filter)

  feat(schema): [non_breaking] Field 'WorkflowState.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (WorkflowState.updatedAt)

  feat(schema): [non_breaking] Input field 'WorkflowStateCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (WorkflowStateCreateInput.id)

  feat(schema): [non_breaking] Description '[Alpha] Workflow state filtering options.' on type 'WorkflowStateFilter' has changed to 'Workflow state filtering options.' (WorkflowStateFilter)

  feat(schema): [non_breaking] Field 'automateTicketReopeningOnCancellation' was added to object type 'ZendeskSettings' (ZendeskSettings.automateTicketReopeningOnCancellation)

  feat(schema): [non_breaking] Field 'automateTicketReopeningOnComment' was added to object type 'ZendeskSettings' (ZendeskSettings.automateTicketReopeningOnComment)

  feat(schema): [non_breaking] Field 'automateTicketReopeningOnCompletion' was added to object type 'ZendeskSettings' (ZendeskSettings.automateTicketReopeningOnCompletion)

  feat(schema): [non_breaking] Field 'sendNoteOnComment' was added to object type 'ZendeskSettings' (ZendeskSettings.sendNoteOnComment)

  feat(schema): [non_breaking] Field 'sendNoteOnStatusChange' was added to object type 'ZendeskSettings' (ZendeskSettings.sendNoteOnStatusChange)

  feat(schema): [non_breaking] Input field 'ZendeskSettingsInput.botUserId' changed type from 'String!' to 'String' (ZendeskSettingsInput.botUserId)

- 2c682eb: feat(schema): [breaking] 'Notification' kind changed from 'ObjectTypeDefinition' to 'InterfaceTypeDefinition' (Notification)

  feat(schema): [non_breaking] Type 'Entity' was added (Entity)

  feat(schema): [non_breaking] Type 'IssueNotification' was added (IssueNotification)

- 2457fd0: feat(schema): [breaking] Type 'IssueDescriptionHistory' was removed (IssueDescriptionHistory)

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

- 5604ab9: feat(schema): [breaking] Schema subscription root has changed from 'Subscription' to 'unknown'

  feat(schema): [breaking] Type 'ArchiveResponse' was removed (ArchiveResponse)

  feat(schema): [breaking] Type 'BatchRequest' was removed (BatchRequest)

  feat(schema): [breaking] Type 'BillingDetailsPayload' was removed (BillingDetailsPayload)

  feat(schema): [breaking] Type 'BillingEmailPayload' was removed (BillingEmailPayload)

  feat(schema): [breaking] Type 'BillingEmailUpdateInput' was removed (BillingEmailUpdateInput)

  feat(schema): [breaking] Type 'Card' was removed (Card)

  feat(schema): [breaking] Type 'CollaborationDocumentUpdateInput' was removed (CollaborationDocumentUpdateInput)

  feat(schema): [breaking] Type 'CollaborationDocumentUpdatePayload' was removed (CollaborationDocumentUpdatePayload)

  feat(schema): [breaking] Type 'DebugPayload' was removed (DebugPayload)

  feat(schema): [breaking] Type 'DependencyResponse' was removed (DependencyResponse)

  feat(schema): [breaking] Type 'DocumentStep' was removed (DocumentStep)

  feat(schema): [breaking] Type 'DocumentVersion' was removed (DocumentVersion)

  feat(schema): [breaking] Type 'DocumentVersionConnection' was removed (DocumentVersionConnection)

  feat(schema): [breaking] Type 'DocumentVersionEdge' was removed (DocumentVersionEdge)

  feat(schema): [breaking] Type 'FeedbackCreateInput' was removed (FeedbackCreateInput)

  feat(schema): [breaking] Type 'FeedbackPayload' was removed (FeedbackPayload)

  feat(schema): [breaking] Type 'Invoice' was removed (Invoice)

  feat(schema): [breaking] Type 'MilestoneFilter' was removed (MilestoneFilter)

  feat(schema): [breaking] Type 'NullableMilestoneFilter' was removed (NullableMilestoneFilter)

  feat(schema): [breaking] Type 'OauthAuthStringAuthorizePayload' was removed (OauthAuthStringAuthorizePayload)

  feat(schema): [breaking] Type 'OauthAuthStringChallengePayload' was removed (OauthAuthStringChallengePayload)

  feat(schema): [breaking] Type 'OauthAuthStringCheckPayload' was removed (OauthAuthStringCheckPayload)

  feat(schema): [breaking] Type 'OauthClientCreateInput' was removed (OauthClientCreateInput)

  feat(schema): [breaking] Type 'OauthClientPayload' was removed (OauthClientPayload)

  feat(schema): [breaking] Type 'OauthClientUpdateInput' was removed (OauthClientUpdateInput)

  feat(schema): [breaking] Type 'OauthTokenRevokePayload' was removed (OauthTokenRevokePayload)

  feat(schema): [breaking] Type 'RotateSecretPayload' was removed (RotateSecretPayload)

  feat(schema): [breaking] Type 'StepsResponse' was removed (StepsResponse)

  feat(schema): [breaking] Type 'Subscription' was removed (Subscription)

  feat(schema): [breaking] Type 'SubscriptionPayload' was removed (SubscriptionPayload)

  feat(schema): [breaking] Type 'SubscriptionSessionPayload' was removed (SubscriptionSessionPayload)

  feat(schema): [breaking] Type 'SubscriptionUpdateInput' was removed (SubscriptionUpdateInput)

  feat(schema): [breaking] Type 'SyncBatchResponse' was removed (SyncBatchResponse)

  feat(schema): [breaking] Type 'SyncDeltaResponse' was removed (SyncDeltaResponse)

  feat(schema): [breaking] Type 'TrashOptionType' was removed (TrashOptionType)

  feat(schema): [breaking] Field 'description' was removed from object type 'AuthorizedApplication' (AuthorizedApplication.description)

  feat(schema): [breaking] Field 'developer' was removed from object type 'AuthorizedApplication' (AuthorizedApplication.developer)

  feat(schema): [breaking] Field 'developerUrl' was removed from object type 'AuthorizedApplication' (AuthorizedApplication.developerUrl)

  feat(schema): [breaking] Input field 'CommentCollectionFilter.and' changed type from '[CommentFilter!]' to '[CommentCollectionFilter!]' (CommentCollectionFilter.and)

  feat(schema): [breaking] Input field 'CommentCollectionFilter.or' changed type from '[CommentFilter!]' to '[CommentCollectionFilter!]' (CommentCollectionFilter.or)

  feat(schema): [breaking] Field 'IntegrationResource.integration' changed type from 'Integration!' to 'Integration' (IntegrationResource.integration)

  feat(schema): [breaking] Input field 'IssueCollectionFilter.and' changed type from '[IssueFilter!]' to '[IssueCollectionFilter!]' (IssueCollectionFilter.and)

  feat(schema): [breaking] Input field 'IssueCollectionFilter.attachments' changed type from 'AttachmentFilter' to 'AttachmentCollectionFilter' (IssueCollectionFilter.attachments)

  feat(schema): [breaking] Input field 'IssueCollectionFilter.estimate' changed type from 'NumberComparator' to 'EstimateComparator' (IssueCollectionFilter.estimate)

  feat(schema): [breaking] Input field 'IssueCollectionFilter.or' changed type from '[IssueFilter!]' to '[IssueCollectionFilter!]' (IssueCollectionFilter.or)

  feat(schema): [breaking] Input field 'IssueFilter.attachments' changed type from 'AttachmentFilter' to 'AttachmentCollectionFilter' (IssueFilter.attachments)

  feat(schema): [breaking] Input field 'IssueFilter.estimate' changed type from 'NumberComparator' to 'EstimateComparator' (IssueFilter.estimate)

  feat(schema): [breaking] Field 'source' was removed from object type 'IssueHistory' (IssueHistory.source)

  feat(schema): [breaking] Input field 'IssueLabelCollectionFilter.and' changed type from '[IssueLabelFilter!]' to '[IssueLabelCollectionFilter!]' (IssueLabelCollectionFilter.and)

  feat(schema): [breaking] Input field 'IssueLabelCollectionFilter.or' changed type from '[IssueLabelFilter!]' to '[IssueLabelCollectionFilter!]' (IssueLabelCollectionFilter.or)

  feat(schema): [breaking] Input field 'documentVersion' was removed from input object type 'IssueUpdateInput' (IssueUpdateInput.documentVersion)

  feat(schema): [breaking] Field 'billingEmailUpdate' was removed from object type 'Mutation' (Mutation.billingEmailUpdate)

  feat(schema): [breaking] Field 'collaborativeDocumentUpdate' was removed from object type 'Mutation' (Mutation.collaborativeDocumentUpdate)

  feat(schema): [breaking] Field 'debugCreateOAuthApps' was removed from object type 'Mutation' (Mutation.debugCreateOAuthApps)

  feat(schema): [breaking] Field 'debugCreateSAMLOrg' was removed from object type 'Mutation' (Mutation.debugCreateSAMLOrg)

  feat(schema): [breaking] Field 'debugCreateSubscription' was removed from object type 'Mutation' (Mutation.debugCreateSubscription)

  feat(schema): [breaking] Field 'debugFailWithInternalError' was removed from object type 'Mutation' (Mutation.debugFailWithInternalError)

  feat(schema): [breaking] Field 'debugFailWithWarning' was removed from object type 'Mutation' (Mutation.debugFailWithWarning)

  feat(schema): [breaking] Field 'feedbackCreate' was removed from object type 'Mutation' (Mutation.feedbackCreate)

  feat(schema): [breaking] Field 'notificationCreate' was removed from object type 'Mutation' (Mutation.notificationCreate)

  feat(schema): [breaking] Field 'oauthAuthStringAuthorize' was removed from object type 'Mutation' (Mutation.oauthAuthStringAuthorize)

  feat(schema): [breaking] Field 'oauthAuthStringChallenge' was removed from object type 'Mutation' (Mutation.oauthAuthStringChallenge)

  feat(schema): [breaking] Field 'oauthAuthStringCheck' was removed from object type 'Mutation' (Mutation.oauthAuthStringCheck)

  feat(schema): [breaking] Field 'oauthClientArchive' was removed from object type 'Mutation' (Mutation.oauthClientArchive)

  feat(schema): [breaking] Field 'oauthClientCreate' was removed from object type 'Mutation' (Mutation.oauthClientCreate)

  feat(schema): [breaking] Field 'oauthClientRotateSecret' was removed from object type 'Mutation' (Mutation.oauthClientRotateSecret)

  feat(schema): [breaking] Field 'oauthClientUpdate' was removed from object type 'Mutation' (Mutation.oauthClientUpdate)

  feat(schema): [breaking] Field 'oauthTokenRevoke' was removed from object type 'Mutation' (Mutation.oauthTokenRevoke)

  feat(schema): [breaking] Field 'subscriptionArchive' was removed from object type 'Mutation' (Mutation.subscriptionArchive)

  feat(schema): [breaking] Field 'subscriptionSessionCreate' was removed from object type 'Mutation' (Mutation.subscriptionSessionCreate)

  feat(schema): [breaking] Field 'subscriptionUpdate' was removed from object type 'Mutation' (Mutation.subscriptionUpdate)

  feat(schema): [breaking] Field 'subscriptionUpdateSessionCreate' was removed from object type 'Mutation' (Mutation.subscriptionUpdateSessionCreate)

  feat(schema): [breaking] Field 'subscriptionUpgrade' was removed from object type 'Mutation' (Mutation.subscriptionUpgrade)

  feat(schema): [breaking] Argument 'service: String!' added to field 'Mutation.integrationSlackProjectPost' (Mutation.integrationSlackProjectPost.service)

  feat(schema): [breaking] 'NotificationSubscription' kind changed from 'ObjectTypeDefinition' to 'InterfaceTypeDefinition' (NotificationSubscription)

  feat(schema): [breaking] Input field 'NullableCycleFilter.and' changed type from '[CycleFilter!]' to '[NullableCycleFilter!]' (NullableCycleFilter.and)

  feat(schema): [breaking] Input field 'NullableCycleFilter.or' changed type from '[CycleFilter!]' to '[NullableCycleFilter!]' (NullableCycleFilter.or)

  feat(schema): [breaking] Input field 'milestone' was removed from input object type 'NullableProjectFilter' (NullableProjectFilter.milestone)

  feat(schema): [breaking] Input field 'NullableProjectFilter.and' changed type from '[ProjectFilter!]' to '[NullableProjectFilter!]' (NullableProjectFilter.and)

  feat(schema): [breaking] Input field 'NullableProjectFilter.or' changed type from '[ProjectFilter!]' to '[NullableProjectFilter!]' (NullableProjectFilter.or)

  feat(schema): [breaking] Input field 'NullableUserFilter.and' changed type from '[UserFilter!]' to '[NullableUserFilter!]' (NullableUserFilter.and)

  feat(schema): [breaking] Input field 'NullableUserFilter.or' changed type from '[UserFilter!]' to '[NullableUserFilter!]' (NullableUserFilter.or)

  feat(schema): [breaking] Field 'OauthClient.description' changed type from 'String!' to 'String' (OauthClient.description)

  feat(schema): [breaking] Field 'OauthClient.imageUrl' changed type from 'String!' to 'String' (OauthClient.imageUrl)

  feat(schema): [breaking] Field 'milestones' was removed from object type 'Organization' (Organization.milestones)

  feat(schema): [breaking] Field 'Organization.subscription' changed type from 'Subscription' to 'PaidSubscription' (Organization.subscription)

  feat(schema): [breaking] Field 'permission' was removed from object type 'OrganizationInvite' (OrganizationInvite.permission)

  feat(schema): [breaking] Input field 'permission' was removed from input object type 'OrganizationInviteCreateInput' (OrganizationInviteCreateInput.permission)

  feat(schema): [breaking] Field 'permission' was removed from object type 'OrganizationInviteDetailsPayload' (OrganizationInviteDetailsPayload.permission)

  feat(schema): [breaking] Input field 'milestone' was removed from input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.milestone)

  feat(schema): [breaking] Input field 'ProjectCollectionFilter.and' changed type from '[ProjectFilter!]' to '[ProjectCollectionFilter!]' (ProjectCollectionFilter.and)

  feat(schema): [breaking] Input field 'ProjectCollectionFilter.or' changed type from '[ProjectFilter!]' to '[ProjectCollectionFilter!]' (ProjectCollectionFilter.or)

  feat(schema): [breaking] Input field 'milestone' was removed from input object type 'ProjectFilter' (ProjectFilter.milestone)

  feat(schema): [breaking] Field 'archivedModelSync' was removed from object type 'Query' (Query.archivedModelSync)

  feat(schema): [breaking] Field 'archivedModelsSync' was removed from object type 'Query' (Query.archivedModelsSync)

  feat(schema): [breaking] Field 'billingDetails' was removed from object type 'Query' (Query.billingDetails)

  feat(schema): [breaking] Field 'collaborativeDocumentJoin' was removed from object type 'Query' (Query.collaborativeDocumentJoin)

  feat(schema): [breaking] Field 'dependentModelSync' was removed from object type 'Query' (Query.dependentModelSync)

  feat(schema): [breaking] Field 'reaction' was removed from object type 'Query' (Query.reaction)

  feat(schema): [breaking] Field 'reactions' was removed from object type 'Query' (Query.reactions)

  feat(schema): [breaking] Field 'subscription' was removed from object type 'Query' (Query.subscription)

  feat(schema): [breaking] Field 'syncBatch' was removed from object type 'Query' (Query.syncBatch)

  feat(schema): [breaking] Field 'syncBootstrap' was removed from object type 'Query' (Query.syncBootstrap)

  feat(schema): [breaking] Field 'syncDelta' was removed from object type 'Query' (Query.syncDelta)

  feat(schema): [breaking] Argument 'filter: MilestoneFilter' was removed from field 'Query.milestones' (Query.milestones.filter)

  feat(schema): [breaking] Field 'comment' was removed from object type 'Reaction' (Reaction.comment)

  feat(schema): [breaking] Field 'allowedDomains' was removed from object type 'SamlConfiguration' (SamlConfiguration.allowedDomains)

  feat(schema): [breaking] Input field 'allowedDomains' was removed from input object type 'SamlConfigurationInput' (SamlConfigurationInput.allowedDomains)

  feat(schema): [breaking] Field 'allowedDomains' was removed from object type 'SamlConfigurationPayload' (SamlConfigurationPayload.allowedDomains)

  feat(schema): [breaking] Field 'UploadFile.metaData' changed type from 'JSON' to 'JSONObject' (UploadFile.metaData)

  feat(schema): [breaking] Input field 'UserSettingsUpdateInput.settings' changed type from 'String' to 'JSONObject' (UserSettingsUpdateInput.settings)

  feat(schema): [breaking] Field 'Webhook.label' changed type from 'String!' to 'String' (Webhook.label)

  feat(schema): [breaking] Field 'ZendeskSettings.botUserId' changed type from 'String!' to 'String' (ZendeskSettings.botUserId)

  feat(schema): [dangerous] Input field 'and' was added to input object type 'AttachmentFilter' (AttachmentFilter.and)

  feat(schema): [dangerous] Input field 'or' was added to input object type 'AttachmentFilter' (AttachmentFilter.or)

  feat(schema): [dangerous] Input field 'length' was added to input object type 'CommentCollectionFilter' (CommentCollectionFilter.length)

  feat(schema): [dangerous] Input field 'createdAt' was added to input object type 'CommentCreateInput' (CommentCreateInput.createdAt)

  feat(schema): [dangerous] Input field 'displayIconUrl' was added to input object type 'CommentCreateInput' (CommentCreateInput.displayIconUrl)

  feat(schema): [dangerous] Input field 'description' was added to input object type 'CycleCreateInput' (CycleCreateInput.description)

  feat(schema): [dangerous] Input field 'isActive' was added to input object type 'CycleFilter' (CycleFilter.isActive)

  feat(schema): [dangerous] Input field 'isFuture' was added to input object type 'CycleFilter' (CycleFilter.isFuture)

  feat(schema): [dangerous] Input field 'isNext' was added to input object type 'CycleFilter' (CycleFilter.isNext)

  feat(schema): [dangerous] Input field 'isPast' was added to input object type 'CycleFilter' (CycleFilter.isPast)

  feat(schema): [dangerous] Input field 'isPrevious' was added to input object type 'CycleFilter' (CycleFilter.isPrevious)

  feat(schema): [dangerous] Input field 'description' was added to input object type 'CycleUpdateInput' (CycleUpdateInput.description)

  feat(schema): [dangerous] Input field 'roadmapId' was added to input object type 'FavoriteCreateInput' (FavoriteCreateInput.roadmapId)

  feat(schema): [dangerous] Input field 'front' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.front)

  feat(schema): [dangerous] Input field 'gitHub' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.gitHub)

  feat(schema): [dangerous] Input field 'slackOrgProjectUpdatesPost' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.slackOrgProjectUpdatesPost)

  feat(schema): [dangerous] Input field 'automateTicketReopeningOnCancellation' was added to input object type 'IntercomSettingsInput' (IntercomSettingsInput.automateTicketReopeningOnCancellation)

  feat(schema): [dangerous] Input field 'automateTicketReopeningOnComment' was added to input object type 'IntercomSettingsInput' (IntercomSettingsInput.automateTicketReopeningOnComment)

  feat(schema): [dangerous] Input field 'automateTicketReopeningOnCompletion' was added to input object type 'IntercomSettingsInput' (IntercomSettingsInput.automateTicketReopeningOnCompletion)

  feat(schema): [dangerous] Input field 'hasBlockedByRelations' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.hasBlockedByRelations)

  feat(schema): [dangerous] Input field 'hasBlockingRelations' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.hasBlockingRelations)

  feat(schema): [dangerous] Input field 'hasDuplicateRelations' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.hasDuplicateRelations)

  feat(schema): [dangerous] Input field 'hasRelatedRelations' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.hasRelatedRelations)

  feat(schema): [dangerous] Input field 'length' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.length)

  feat(schema): [dangerous] Input field 'parent' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.parent)

  feat(schema): [dangerous] Input field 'searchableContent' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.searchableContent)

  feat(schema): [dangerous] Input field 'subscribers' was added to input object type 'IssueCollectionFilter' (IssueCollectionFilter.subscribers)

  feat(schema): [dangerous] Input field 'createdAt' was added to input object type 'IssueCreateInput' (IssueCreateInput.createdAt)

  feat(schema): [dangerous] Input field 'displayIconUrl' was added to input object type 'IssueCreateInput' (IssueCreateInput.displayIconUrl)

  feat(schema): [dangerous] Input field 'hasBlockedByRelations' was added to input object type 'IssueFilter' (IssueFilter.hasBlockedByRelations)

  feat(schema): [dangerous] Input field 'hasBlockingRelations' was added to input object type 'IssueFilter' (IssueFilter.hasBlockingRelations)

  feat(schema): [dangerous] Input field 'hasDuplicateRelations' was added to input object type 'IssueFilter' (IssueFilter.hasDuplicateRelations)

  feat(schema): [dangerous] Input field 'hasRelatedRelations' was added to input object type 'IssueFilter' (IssueFilter.hasRelatedRelations)

  feat(schema): [dangerous] Input field 'parent' was added to input object type 'IssueFilter' (IssueFilter.parent)

  feat(schema): [dangerous] Input field 'searchableContent' was added to input object type 'IssueFilter' (IssueFilter.searchableContent)

  feat(schema): [dangerous] Input field 'subscribers' was added to input object type 'IssueFilter' (IssueFilter.subscribers)

  feat(schema): [dangerous] Input field 'length' was added to input object type 'IssueLabelCollectionFilter' (IssueLabelCollectionFilter.length)

  feat(schema): [dangerous] Input field 'parent' was added to input object type 'IssueLabelCollectionFilter' (IssueLabelCollectionFilter.parent)

  feat(schema): [dangerous] Input field 'parentId' was added to input object type 'IssueLabelCreateInput' (IssueLabelCreateInput.parentId)

  feat(schema): [dangerous] Input field 'parent' was added to input object type 'IssueLabelFilter' (IssueLabelFilter.parent)

  feat(schema): [dangerous] Input field 'parentId' was added to input object type 'IssueLabelUpdateInput' (IssueLabelUpdateInput.parentId)

  feat(schema): [dangerous] Input field 'description' was added to input object type 'MilestoneCreateInput' (MilestoneCreateInput.description)

  feat(schema): [dangerous] Input field 'targetDate' was added to input object type 'MilestoneCreateInput' (MilestoneCreateInput.targetDate)

  feat(schema): [dangerous] Input field 'teamIds' was added to input object type 'MilestoneCreateInput' (MilestoneCreateInput.teamIds)

  feat(schema): [dangerous] Input field 'description' was added to input object type 'MilestoneUpdateInput' (MilestoneUpdateInput.description)

  feat(schema): [dangerous] Input field 'targetDate' was added to input object type 'MilestoneUpdateInput' (MilestoneUpdateInput.targetDate)

  feat(schema): [dangerous] Input field 'teamIds' was added to input object type 'MilestoneUpdateInput' (MilestoneUpdateInput.teamIds)

  feat(schema): [dangerous] Argument 'makePublic: Boolean' added to field 'Mutation.fileUpload' (Mutation.fileUpload.makePublic)

  feat(schema): [dangerous] Argument 'domainUrl: String' added to field 'Mutation.integrationIntercom' (Mutation.integrationIntercom.domainUrl)

  feat(schema): [dangerous] Argument 'organizationId: String' added to field 'Mutation.issueImportCreateAsana' (Mutation.issueImportCreateAsana.organizationId)

  feat(schema): [dangerous] Argument 'teamName: String' added to field 'Mutation.issueImportCreateAsana' (Mutation.issueImportCreateAsana.teamName)

  feat(schema): [dangerous] Argument 'organizationId: String' added to field 'Mutation.issueImportCreateClubhouse' (Mutation.issueImportCreateClubhouse.organizationId)

  feat(schema): [dangerous] Argument 'teamName: String' added to field 'Mutation.issueImportCreateClubhouse' (Mutation.issueImportCreateClubhouse.teamName)

  feat(schema): [dangerous] Argument 'organizationId: String' added to field 'Mutation.issueImportCreateGithub' (Mutation.issueImportCreateGithub.organizationId)

  feat(schema): [dangerous] Argument 'teamName: String' added to field 'Mutation.issueImportCreateGithub' (Mutation.issueImportCreateGithub.teamName)

  feat(schema): [dangerous] Argument 'organizationId: String' added to field 'Mutation.issueImportCreateJira' (Mutation.issueImportCreateJira.organizationId)

  feat(schema): [dangerous] Argument 'teamName: String' added to field 'Mutation.issueImportCreateJira' (Mutation.issueImportCreateJira.teamName)

  feat(schema): [dangerous] Argument 'triggerEmailVerification: Boolean' added to field 'Mutation.organizationDomainCreate' (Mutation.organizationDomainCreate.triggerEmailVerification)

  feat(schema): [dangerous] Input field 'projectNotificationSubscriptionType' was added to input object type 'NotificationSubscriptionCreateInput' (NotificationSubscriptionCreateInput.projectNotificationSubscriptionType)

  feat(schema): [dangerous] Input field 'projectUpdateId' was added to input object type 'NotificationUpdateInput' (NotificationUpdateInput.projectUpdateId)

  feat(schema): [dangerous] Input field 'isActive' was added to input object type 'NullableCycleFilter' (NullableCycleFilter.isActive)

  feat(schema): [dangerous] Input field 'isFuture' was added to input object type 'NullableCycleFilter' (NullableCycleFilter.isFuture)

  feat(schema): [dangerous] Input field 'isNext' was added to input object type 'NullableCycleFilter' (NullableCycleFilter.isNext)

  feat(schema): [dangerous] Input field 'isPast' was added to input object type 'NullableCycleFilter' (NullableCycleFilter.isPast)

  feat(schema): [dangerous] Input field 'isPrevious' was added to input object type 'NullableCycleFilter' (NullableCycleFilter.isPrevious)

  feat(schema): [dangerous] Input field 'roadmaps' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.roadmaps)

  feat(schema): [dangerous] Input field 'slugId' was added to input object type 'NullableProjectFilter' (NullableProjectFilter.slugId)

  feat(schema): [dangerous] Input field 'authType' was added to input object type 'OrganizationDomainCreateInput' (OrganizationDomainCreateInput.authType)

  feat(schema): [dangerous] Input field 'role' was added to input object type 'OrganizationInviteCreateInput' (OrganizationInviteCreateInput.role)

  feat(schema): [dangerous] Input field 'length' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.length)

  feat(schema): [dangerous] Input field 'roadmaps' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.roadmaps)

  feat(schema): [dangerous] Input field 'slugId' was added to input object type 'ProjectCollectionFilter' (ProjectCollectionFilter.slugId)

  feat(schema): [dangerous] Input field 'convertedFromIssueId' was added to input object type 'ProjectCreateInput' (ProjectCreateInput.convertedFromIssueId)

  feat(schema): [dangerous] Input field 'roadmaps' was added to input object type 'ProjectFilter' (ProjectFilter.roadmaps)

  feat(schema): [dangerous] Input field 'slugId' was added to input object type 'ProjectFilter' (ProjectFilter.slugId)

  feat(schema): [dangerous] Input field 'convertedFromIssueId' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.convertedFromIssueId)

  feat(schema): [dangerous] Input field 'projectUpdateRemindersPausedUntilAt' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.projectUpdateRemindersPausedUntilAt)

  feat(schema): [dangerous] Input field 'type' was added to input object type 'PushSubscriptionCreateInput' (PushSubscriptionCreateInput.type)

  feat(schema): [dangerous] Input field 'projectUpdateId' was added to input object type 'ReactionCreateInput' (ReactionCreateInput.projectUpdateId)

  feat(schema): [dangerous] Input field 'issueSortOrderDefaultToBottom' was added to input object type 'TeamCreateInput' (TeamCreateInput.issueSortOrderDefaultToBottom)

  feat(schema): [dangerous] Input field 'sortOrder' was added to input object type 'TeamMembershipCreateInput' (TeamMembershipCreateInput.sortOrder)

  feat(schema): [dangerous] Input field 'sortOrder' was added to input object type 'TeamMembershipUpdateInput' (TeamMembershipUpdateInput.sortOrder)

  feat(schema): [dangerous] Input field 'issueSortOrderDefaultToBottom' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.issueSortOrderDefaultToBottom)

  feat(schema): [dangerous] Input field 'oauthAppReview' was added to input object type 'UpdateOrganizationInput' (UpdateOrganizationInput.oauthAppReview)

  feat(schema): [dangerous] Input field 'projectUpdateRemindersDay' was added to input object type 'UpdateOrganizationInput' (UpdateOrganizationInput.projectUpdateRemindersDay)

  feat(schema): [dangerous] Input field 'projectUpdateRemindersHour' was added to input object type 'UpdateOrganizationInput' (UpdateOrganizationInput.projectUpdateRemindersHour)

  feat(schema): [dangerous] Input field 'projectUpdatesReminderFrequency' was added to input object type 'UpdateOrganizationInput' (UpdateOrganizationInput.projectUpdatesReminderFrequency)

  feat(schema): [dangerous] Enum value 'insightsWelcomeDismissed' was added to enum 'UserFlagType' (UserFlagType.insightsWelcomeDismissed)

  feat(schema): [dangerous] Enum value 'issueLabelSuggestionUsed' was added to enum 'UserFlagType' (UserFlagType.issueLabelSuggestionUsed)

  feat(schema): [dangerous] Enum value 'joinTeamIntroductionDismissed' was added to enum 'UserFlagType' (UserFlagType.joinTeamIntroductionDismissed)

  feat(schema): [dangerous] Enum value 'projectUpdatesWelcomeDismissed' was added to enum 'UserFlagType' (UserFlagType.projectUpdatesWelcomeDismissed)

  feat(schema): [dangerous] Enum value 'rewindBannerDismissed' was added to enum 'UserFlagType' (UserFlagType.rewindBannerDismissed)

  feat(schema): [dangerous] Enum value 'teamsPageIntroductionDismissed' was added to enum 'UserFlagType' (UserFlagType.teamsPageIntroductionDismissed)

  feat(schema): [dangerous] Input field 'roadmapId' was added to input object type 'ViewPreferencesCreateInput' (ViewPreferencesCreateInput.roadmapId)

  feat(schema): [dangerous] Enum value 'archive' was added to enum 'ViewType' (ViewType.archive)

  feat(schema): [dangerous] Enum value 'customRoadmap' was added to enum 'ViewType' (ViewType.customRoadmap)

  feat(schema): [dangerous] Enum value 'myIssuesCreatedByMe' was added to enum 'ViewType' (ViewType.myIssuesCreatedByMe)

  feat(schema): [dangerous] Enum value 'myIssuesSubscribedTo' was added to enum 'ViewType' (ViewType.myIssuesSubscribedTo)

  feat(schema): [dangerous] Enum value 'teams' was added to enum 'ViewType' (ViewType.teams)

  feat(schema): [dangerous] Enum value 'userProfileCreatedByUser' was added to enum 'ViewType' (ViewType.userProfileCreatedByUser)

  feat(schema): [dangerous] Input field 'automateTicketReopeningOnCancellation' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.automateTicketReopeningOnCancellation)

  feat(schema): [dangerous] Input field 'automateTicketReopeningOnComment' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.automateTicketReopeningOnComment)

  feat(schema): [dangerous] Input field 'automateTicketReopeningOnCompletion' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.automateTicketReopeningOnCompletion)

  feat(schema): [dangerous] Input field 'sendNoteOnComment' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.sendNoteOnComment)

  feat(schema): [dangerous] Input field 'sendNoteOnStatusChange' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.sendNoteOnStatusChange)

  feat(schema): [non_breaking] Type 'AdminJobConfiguration' was added (AdminJobConfiguration)

  feat(schema): [non_breaking] Type 'AdminJobConfigurationPayload' was added (AdminJobConfigurationPayload)

  feat(schema): [non_breaking] Type 'AdminJobStatusPayload' was added (AdminJobStatusPayload)

  feat(schema): [non_breaking] Type 'Aggregation' was added (Aggregation)

  feat(schema): [non_breaking] Type 'AirbyteConfigurationInput' was added (AirbyteConfigurationInput)

  feat(schema): [non_breaking] Type 'AttachmentCollectionFilter' was added (AttachmentCollectionFilter)

  feat(schema): [non_breaking] Type 'AuthMembership' was added (AuthMembership)

  feat(schema): [non_breaking] Type 'ChartType' was added (ChartType)

  feat(schema): [non_breaking] Type 'ContactSalesCreateInput' was added (ContactSalesCreateInput)

  feat(schema): [non_breaking] Type 'ContentComparator' was added (ContentComparator)

  feat(schema): [non_breaking] Type 'DateAggregation' was added (DateAggregation)

  feat(schema): [non_breaking] Type 'Day' was added (Day)

  feat(schema): [non_breaking] Type 'Dimension' was added (Dimension)

  feat(schema): [non_breaking] Type 'DimensionName' was added (DimensionName)

  feat(schema): [non_breaking] Type 'EstimateComparator' was added (EstimateComparator)

  feat(schema): [non_breaking] Type 'FactsTable' was added (FactsTable)

  feat(schema): [non_breaking] Type 'FrontSettings' was added (FrontSettings)

  feat(schema): [non_breaking] Type 'FrontSettingsInput' was added (FrontSettingsInput)

  feat(schema): [non_breaking] Type 'GitHubSettings' was added (GitHubSettings)

  feat(schema): [non_breaking] Type 'GitHubSettingsInput' was added (GitHubSettingsInput)

  feat(schema): [non_breaking] Type 'Initiative' was added (Initiative)

  feat(schema): [non_breaking] Type 'InitiativeConnection' was added (InitiativeConnection)

  feat(schema): [non_breaking] Type 'InitiativeEdge' was added (InitiativeEdge)

  feat(schema): [non_breaking] Type 'InsightPayload' was added (InsightPayload)

  feat(schema): [non_breaking] Type 'IntegrationRequestInput' was added (IntegrationRequestInput)

  feat(schema): [non_breaking] Type 'IntegrationRequestPayload' was added (IntegrationRequestPayload)

  feat(schema): [non_breaking] Type 'IntegrationTemplate' was added (IntegrationTemplate)

  feat(schema): [non_breaking] Type 'IntegrationTemplateConnection' was added (IntegrationTemplateConnection)

  feat(schema): [non_breaking] Type 'IntegrationTemplateCreateInput' was added (IntegrationTemplateCreateInput)

  feat(schema): [non_breaking] Type 'IntegrationTemplateEdge' was added (IntegrationTemplateEdge)

  feat(schema): [non_breaking] Type 'IntegrationTemplatePayload' was added (IntegrationTemplatePayload)

  feat(schema): [non_breaking] Type 'IntegrationsSettings' was added (IntegrationsSettings)

  feat(schema): [non_breaking] Type 'IntegrationsSettingsConnection' was added (IntegrationsSettingsConnection)

  feat(schema): [non_breaking] Type 'IntegrationsSettingsCreateInput' was added (IntegrationsSettingsCreateInput)

  feat(schema): [non_breaking] Type 'IntegrationsSettingsEdge' was added (IntegrationsSettingsEdge)

  feat(schema): [non_breaking] Type 'IntegrationsSettingsPayload' was added (IntegrationsSettingsPayload)

  feat(schema): [non_breaking] Type 'IntegrationsSettingsUpdateInput' was added (IntegrationsSettingsUpdateInput)

  feat(schema): [non_breaking] Type 'LogoutResponse' was added (LogoutResponse)

  feat(schema): [non_breaking] Type 'Measure' was added (Measure)

  feat(schema): [non_breaking] Type 'MeasureName' was added (MeasureName)

  feat(schema): [non_breaking] Type 'MilestoneMigrationPayload' was added (MilestoneMigrationPayload)

  feat(schema): [non_breaking] Type 'MilestonesMigrateInput' was added (MilestonesMigrateInput)

  feat(schema): [non_breaking] Type 'NotificationSubscriptionUpdateInput' was added (NotificationSubscriptionUpdateInput)

  feat(schema): [non_breaking] Type 'NullableIssueFilter' was added (NullableIssueFilter)

  feat(schema): [non_breaking] Type 'OAuthClientApprovalStatus' was added (OAuthClientApprovalStatus)

  feat(schema): [non_breaking] Type 'OauthClientApproval' was added (OauthClientApproval)

  feat(schema): [non_breaking] Type 'OauthClientApprovalNotification' was added (OauthClientApprovalNotification)

  feat(schema): [non_breaking] Type 'OrganizationDomainAuthType' was added (OrganizationDomainAuthType)

  feat(schema): [non_breaking] Type 'OrganizationDomainClaimPayload' was added (OrganizationDomainClaimPayload)

  feat(schema): [non_breaking] Type 'OrganizationInviteUpdateInput' was added (OrganizationInviteUpdateInput)

  feat(schema): [non_breaking] Type 'PaidSubscription' was added (PaidSubscription)

  feat(schema): [non_breaking] Type 'ProjectNotification' was added (ProjectNotification)

  feat(schema): [non_breaking] Type 'ProjectNotificationSubscription' was added (ProjectNotificationSubscription)

  feat(schema): [non_breaking] Type 'ProjectNotificationSubscriptionType' was added (ProjectNotificationSubscriptionType)

  feat(schema): [non_breaking] Type 'ProjectUpdate' was added (ProjectUpdate)

  feat(schema): [non_breaking] Type 'ProjectUpdateConnection' was added (ProjectUpdateConnection)

  feat(schema): [non_breaking] Type 'ProjectUpdateCreateInput' was added (ProjectUpdateCreateInput)

  feat(schema): [non_breaking] Type 'ProjectUpdateEdge' was added (ProjectUpdateEdge)

  feat(schema): [non_breaking] Type 'ProjectUpdateHealthType' was added (ProjectUpdateHealthType)

  feat(schema): [non_breaking] Type 'ProjectUpdateInteraction' was added (ProjectUpdateInteraction)

  feat(schema): [non_breaking] Type 'ProjectUpdateInteractionConnection' was added (ProjectUpdateInteractionConnection)

  feat(schema): [non_breaking] Type 'ProjectUpdateInteractionCreateInput' was added (ProjectUpdateInteractionCreateInput)

  feat(schema): [non_breaking] Type 'ProjectUpdateInteractionEdge' was added (ProjectUpdateInteractionEdge)

  feat(schema): [non_breaking] Type 'ProjectUpdateInteractionPayload' was added (ProjectUpdateInteractionPayload)

  feat(schema): [non_breaking] Type 'ProjectUpdatePayload' was added (ProjectUpdatePayload)

  feat(schema): [non_breaking] Type 'ProjectUpdateReminderFrequency' was added (ProjectUpdateReminderFrequency)

  feat(schema): [non_breaking] Type 'ProjectUpdateUpdateInput' was added (ProjectUpdateUpdateInput)

  feat(schema): [non_breaking] Type 'ProjectUpdateWithInteractionPayload' was added (ProjectUpdateWithInteractionPayload)

  feat(schema): [non_breaking] Type 'PullRequestReview' was added (PullRequestReview)

  feat(schema): [non_breaking] Type 'PushSubscriptionType' was added (PushSubscriptionType)

  feat(schema): [non_breaking] Type 'RelationExistsComparator' was added (RelationExistsComparator)

  feat(schema): [non_breaking] Type 'Roadmap' was added (Roadmap)

  feat(schema): [non_breaking] Type 'RoadmapCollectionFilter' was added (RoadmapCollectionFilter)

  feat(schema): [non_breaking] Type 'RoadmapConnection' was added (RoadmapConnection)

  feat(schema): [non_breaking] Type 'RoadmapCreateInput' was added (RoadmapCreateInput)

  feat(schema): [non_breaking] Type 'RoadmapEdge' was added (RoadmapEdge)

  feat(schema): [non_breaking] Type 'RoadmapFilter' was added (RoadmapFilter)

  feat(schema): [non_breaking] Type 'RoadmapPayload' was added (RoadmapPayload)

  feat(schema): [non_breaking] Type 'RoadmapToProject' was added (RoadmapToProject)

  feat(schema): [non_breaking] Type 'RoadmapToProjectConnection' was added (RoadmapToProjectConnection)

  feat(schema): [non_breaking] Type 'RoadmapToProjectCreateInput' was added (RoadmapToProjectCreateInput)

  feat(schema): [non_breaking] Type 'RoadmapToProjectEdge' was added (RoadmapToProjectEdge)

  feat(schema): [non_breaking] Type 'RoadmapToProjectPayload' was added (RoadmapToProjectPayload)

  feat(schema): [non_breaking] Type 'RoadmapToProjectUpdateInput' was added (RoadmapToProjectUpdateInput)

  feat(schema): [non_breaking] Type 'RoadmapUpdateInput' was added (RoadmapUpdateInput)

  feat(schema): [non_breaking] Type 'TeamNotificationSubscription' was added (TeamNotificationSubscription)

  feat(schema): [non_breaking] Type 'UserAccountEmailChange' was added (UserAccountEmailChange)

  feat(schema): [non_breaking] Type 'UserAccountEmailChangeVerifyCodePayload' was added (UserAccountEmailChangeVerifyCodePayload)

  feat(schema): [non_breaking] Type 'UserCollectionFilter' was added (UserCollectionFilter)

  feat(schema): [non_breaking] Type 'UserRoleType' was added (UserRoleType)

  feat(schema): [non_breaking] Type 'WorkflowConditions' was added (WorkflowConditions)

  feat(schema): [non_breaking] Type 'WorkflowDefinition' was added (WorkflowDefinition)

  feat(schema): [non_breaking] Type 'WorkflowEntityPropertyMatcher' was added (WorkflowEntityPropertyMatcher)

  feat(schema): [non_breaking] Type 'WorkflowTriggerType' was added (WorkflowTriggerType)

  feat(schema): [non_breaking] Type 'WorkflowType' was added (WorkflowType)

  feat(schema): [non_breaking] Type 'WorkspaceAuthorizedApplication' was added (WorkspaceAuthorizedApplication)

  feat(schema): [non_breaking] Field 'ApiKey.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (ApiKey.updatedAt)

  feat(schema): [non_breaking] Input field 'ApiKeyCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (ApiKeyCreateInput.id)

  feat(schema): [non_breaking] Field 'id' was added to object type 'Application' (Application.id)

  feat(schema): [non_breaking] Field 'Attachment.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Attachment.updatedAt)

  feat(schema): [non_breaking] Description '[Alpha] Issue attachment (e.g. support ticket, pull request).' on type 'Attachment' has changed to 'Issue attachment (e.g. support ticket, pull request).' (Attachment)

  feat(schema): [non_breaking] Input field 'AttachmentCreateInput.commentBodyData' description changed from '[Internal] Create a linked comment with Prosemirror body. Please use `commentBody` instead' to 'Create a linked comment with Prosemirror body. Please use `commentBody` instead' (AttachmentCreateInput.commentBodyData)

  feat(schema): [non_breaking] Input field 'AttachmentCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (AttachmentCreateInput.id)

  feat(schema): [non_breaking] Description '[Alpha] Attachment filtering options.' on type 'AttachmentFilter' has changed to 'Attachment filtering options.' (AttachmentFilter)

  feat(schema): [non_breaking] Field 'AuditEntry.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (AuditEntry.updatedAt)

  feat(schema): [non_breaking] Description '[Alpha] Audit entry filtering options.' on type 'AuditEntryFilter' has changed to 'Audit entry filtering options.' (AuditEntryFilter)

  feat(schema): [non_breaking] Description 'Public information of the OAuth application, plus the authorized scopes for a given user.' on type 'AuthorizedApplication' has changed to '[INTERNAL] Public information of the OAuth application, plus the authorized scopes for a given user.' (AuthorizedApplication)

  feat(schema): [non_breaking] Field 'bodyData' was added to object type 'Comment' (Comment.bodyData)

  feat(schema): [non_breaking] Field 'reactionData' was added to object type 'Comment' (Comment.reactionData)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Comment.children' changed from '[Alpha] Filter returned comments.' to 'Filter returned comments.' (Comment.children.filter)

  feat(schema): [non_breaking] Field 'Comment.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Comment.updatedAt)

  feat(schema): [non_breaking] Description '[Alpha] Comment filtering options.' on type 'CommentCollectionFilter' has changed to 'Comment filtering options.' (CommentCollectionFilter)

  feat(schema): [non_breaking] Input field 'CommentCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (CommentCreateInput.id)

  feat(schema): [non_breaking] Description '[Alpha] Comment filtering options.' on type 'CommentFilter' has changed to 'Comment filtering options.' (CommentFilter)

  feat(schema): [non_breaking] Field 'CustomView.filterData' description changed from '[Alpha] The filter applied to issues in the custom view.' to 'The filter applied to issues in the custom view.' (CustomView.filterData)

  feat(schema): [non_breaking] Field 'CustomView.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (CustomView.updatedAt)

  feat(schema): [non_breaking] Input field 'CustomViewCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (CustomViewCreateInput.id)

  feat(schema): [non_breaking] Field 'description' was added to object type 'Cycle' (Cycle.description)

  feat(schema): [non_breaking] Field 'inProgressScopeHistory' was added to object type 'Cycle' (Cycle.inProgressScopeHistory)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Cycle.issues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (Cycle.issues.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Cycle.uncompletedIssuesUponClose' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (Cycle.uncompletedIssuesUponClose.filter)

  feat(schema): [non_breaking] Field 'Cycle.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Cycle.updatedAt)

  feat(schema): [non_breaking] Input field 'CycleCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (CycleCreateInput.id)

  feat(schema): [non_breaking] Description '[Alpha] Project filtering options.' on type 'CycleFilter' has changed to 'Cycle filtering options.' (CycleFilter)

  feat(schema): [non_breaking] Field 'Document.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Document.updatedAt)

  feat(schema): [non_breaking] Input field 'DocumentCreateInput.contentData' description changed from '[Internal] The document content as a Prosemirror document.' to 'The document content as a Prosemirror document.' (DocumentCreateInput.contentData)

  feat(schema): [non_breaking] Input field 'DocumentCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (DocumentCreateInput.id)

  feat(schema): [non_breaking] Input field 'DocumentUpdateInput.contentData' description changed from '[Internal] The document content as a Prosemirror document.' to 'The document content as a Prosemirror document.' (DocumentUpdateInput.contentData)

  feat(schema): [non_breaking] Field 'Emoji.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Emoji.updatedAt)

  feat(schema): [non_breaking] Input field 'EmojiCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (EmojiCreateInput.id)

  feat(schema): [non_breaking] Field 'Entity.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Entity.updatedAt)

  feat(schema): [non_breaking] Field 'roadmap' was added to object type 'Favorite' (Favorite.roadmap)

  feat(schema): [non_breaking] Field 'Favorite.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Favorite.updatedAt)

  feat(schema): [non_breaking] Input field 'FavoriteUpdateInput.parentId' description changed from 'The id of the folder to move the favorite under.' to 'The identifier (in UUID v4 format) of the folder to move the favorite under.' (FavoriteUpdateInput.parentId)

  feat(schema): [non_breaking] Field 'isPersonal' was added to object type 'GithubOrg' (GithubOrg.isPersonal)

  feat(schema): [non_breaking] Field 'Integration.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Integration.updatedAt)

  feat(schema): [non_breaking] Field 'IntegrationResource.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (IntegrationResource.updatedAt)

  feat(schema): [non_breaking] Field 'front' was added to object type 'IntegrationSettings' (IntegrationSettings.front)

  feat(schema): [non_breaking] Field 'gitHub' was added to object type 'IntegrationSettings' (IntegrationSettings.gitHub)

  feat(schema): [non_breaking] Field 'slackOrgProjectUpdatesPost' was added to object type 'IntegrationSettings' (IntegrationSettings.slackOrgProjectUpdatesPost)

  feat(schema): [non_breaking] Field 'automateTicketReopeningOnCancellation' was added to object type 'IntercomSettings' (IntercomSettings.automateTicketReopeningOnCancellation)

  feat(schema): [non_breaking] Field 'automateTicketReopeningOnComment' was added to object type 'IntercomSettings' (IntercomSettings.automateTicketReopeningOnComment)

  feat(schema): [non_breaking] Field 'automateTicketReopeningOnCompletion' was added to object type 'IntercomSettings' (IntercomSettings.automateTicketReopeningOnCompletion)

  feat(schema): [non_breaking] Field 'descriptionData' was added to object type 'Issue' (Issue.descriptionData)

  feat(schema): [non_breaking] Field 'triagedAt' was added to object type 'Issue' (Issue.triagedAt)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Issue.attachments' changed from '[Alpha] Filter returned attachments.' to 'Filter returned attachments.' (Issue.attachments.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Issue.children' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (Issue.children.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Issue.comments' changed from '[Alpha] Filter returned comments.' to 'Filter returned comments.' (Issue.comments.filter)

  feat(schema): [non_breaking] Field 'Issue.integrationResources' description changed from 'Integration resources for this issue.' to '[DEPRECATED] Integration resources for this issue.' (Issue.integrationResources)

  feat(schema): [non_breaking] Field 'Issue.integrationResources' is deprecated (Issue.integrationResources)

  feat(schema): [non_breaking] Field 'Issue.integrationResources' has deprecation reason 'This field will soon be deprecated, please use `attachments` instead' (Issue.integrationResources)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Issue.labels' changed from '[Alpha] Filter returned issue labels.' to 'Filter returned issue labels.' (Issue.labels.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Issue.subscribers' changed from '[Alpha] Filter returned subscribers.' to 'Filter returned subscribers.' (Issue.subscribers.filter)

  feat(schema): [non_breaking] Field 'Issue.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Issue.updatedAt)

  feat(schema): [non_breaking] Description '[Alpha] Issue filtering options.' on type 'IssueCollectionFilter' has changed to 'Issue filtering options.' (IssueCollectionFilter)

  feat(schema): [non_breaking] Input field 'IssueCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (IssueCreateInput.id)

  feat(schema): [non_breaking] Description '[Alpha] Issue filtering options.' on type 'IssueFilter' has changed to 'Issue filtering options.' (IssueFilter)

  feat(schema): [non_breaking] Field 'actorId' was added to object type 'IssueHistory' (IssueHistory.actorId)

  feat(schema): [non_breaking] Field 'attachmentId' was added to object type 'IssueHistory' (IssueHistory.attachmentId)

  feat(schema): [non_breaking] Field 'fromAssigneeId' was added to object type 'IssueHistory' (IssueHistory.fromAssigneeId)

  feat(schema): [non_breaking] Field 'fromCycleId' was added to object type 'IssueHistory' (IssueHistory.fromCycleId)

  feat(schema): [non_breaking] Field 'fromParentId' was added to object type 'IssueHistory' (IssueHistory.fromParentId)

  feat(schema): [non_breaking] Field 'fromProjectId' was added to object type 'IssueHistory' (IssueHistory.fromProjectId)

  feat(schema): [non_breaking] Field 'fromStateId' was added to object type 'IssueHistory' (IssueHistory.fromStateId)

  feat(schema): [non_breaking] Field 'fromTeamId' was added to object type 'IssueHistory' (IssueHistory.fromTeamId)

  feat(schema): [non_breaking] Field 'toAssigneeId' was added to object type 'IssueHistory' (IssueHistory.toAssigneeId)

  feat(schema): [non_breaking] Field 'toConvertedProject' was added to object type 'IssueHistory' (IssueHistory.toConvertedProject)

  feat(schema): [non_breaking] Field 'toConvertedProjectId' was added to object type 'IssueHistory' (IssueHistory.toConvertedProjectId)

  feat(schema): [non_breaking] Field 'toCycleId' was added to object type 'IssueHistory' (IssueHistory.toCycleId)

  feat(schema): [non_breaking] Field 'toParentId' was added to object type 'IssueHistory' (IssueHistory.toParentId)

  feat(schema): [non_breaking] Field 'toProjectId' was added to object type 'IssueHistory' (IssueHistory.toProjectId)

  feat(schema): [non_breaking] Field 'toStateId' was added to object type 'IssueHistory' (IssueHistory.toStateId)

  feat(schema): [non_breaking] Field 'toTeamId' was added to object type 'IssueHistory' (IssueHistory.toTeamId)

  feat(schema): [non_breaking] Field 'IssueHistory.autoArchived' has description 'Whether the issue was auto-archived.' (IssueHistory.autoArchived)

  feat(schema): [non_breaking] Field 'IssueHistory.autoClosed' has description 'Whether the issue was auto-closed.' (IssueHistory.autoClosed)

  feat(schema): [non_breaking] Field 'IssueHistory.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (IssueHistory.updatedAt)

  feat(schema): [non_breaking] Field 'progress' was added to object type 'IssueImport' (IssueImport.progress)

  feat(schema): [non_breaking] Field 'teamName' was added to object type 'IssueImport' (IssueImport.teamName)

  feat(schema): [non_breaking] Field 'IssueImport.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (IssueImport.updatedAt)

  feat(schema): [non_breaking] Field 'children' was added to object type 'IssueLabel' (IssueLabel.children)

  feat(schema): [non_breaking] Field 'parent' was added to object type 'IssueLabel' (IssueLabel.parent)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'IssueLabel.issues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (IssueLabel.issues.filter)

  feat(schema): [non_breaking] Field 'IssueLabel.organization' changed type from 'Organization' to 'Organization!' (IssueLabel.organization)

  feat(schema): [non_breaking] Field 'IssueLabel.team' description changed from 'The team that the label is associated with. If null, the label is associated with the global workspace..' to 'The team that the label is associated with. If null, the label is associated with the global workspace.' (IssueLabel.team)

  feat(schema): [non_breaking] Field 'IssueLabel.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (IssueLabel.updatedAt)

  feat(schema): [non_breaking] Description '[Alpha] Issue label filtering options.' on type 'IssueLabelCollectionFilter' has changed to 'Issue label filtering options.' (IssueLabelCollectionFilter)

  feat(schema): [non_breaking] Input field 'IssueLabelCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (IssueLabelCreateInput.id)

  feat(schema): [non_breaking] Description '[Alpha] Issue label filtering options.' on type 'IssueLabelFilter' has changed to 'Issue label filtering options.' (IssueLabelFilter)

  feat(schema): [non_breaking] Field 'actor' was added to object type 'IssueNotification' (IssueNotification.actor)

  feat(schema): [non_breaking] Field 'unsnoozedAt' was added to object type 'IssueNotification' (IssueNotification.unsnoozedAt)

  feat(schema): [non_breaking] Field 'IssueNotification.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (IssueNotification.updatedAt)

  feat(schema): [non_breaking] Field 'IssueRelation.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (IssueRelation.updatedAt)

  feat(schema): [non_breaking] Input field 'IssueRelationCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (IssueRelationCreateInput.id)

  feat(schema): [non_breaking] Description 'The `JSON` scalar type represents JSON values' on type 'JSON' has changed to 'The `JSON` scalar type represents arbitrary values as _stringified_ JSON' (JSON)

  feat(schema): [non_breaking] Description 'The `JSONObject` scalar type represents JSON values as a string' on type 'JSONObject' has changed to 'The `JSONObject` scalar type represents arbitrary values as _embedded_ JSON' (JSONObject)

  feat(schema): [non_breaking] Field 'description' was added to object type 'Milestone' (Milestone.description)

  feat(schema): [non_breaking] Field 'targetDate' was added to object type 'Milestone' (Milestone.targetDate)

  feat(schema): [non_breaking] Field 'Milestone.projects' is deprecated (Milestone.projects)

  feat(schema): [non_breaking] Field 'Milestone.projects' has deprecation reason 'Milestones will be removed. Use roadmaps instead.' (Milestone.projects)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Milestone.projects' changed from '[Alpha] Filter returned projects.' to 'Filter returned projects.' (Milestone.projects.filter)

  feat(schema): [non_breaking] Field 'Milestone.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Milestone.updatedAt)

  feat(schema): [non_breaking] Input field 'MilestoneCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (MilestoneCreateInput.id)

  feat(schema): [non_breaking] Field 'airbyteIntegrationConnect' was added to object type 'Mutation' (Mutation.airbyteIntegrationConnect)

  feat(schema): [non_breaking] Field 'contactSalesCreate' was added to object type 'Mutation' (Mutation.contactSalesCreate)

  feat(schema): [non_breaking] Field 'integrationRequest' was added to object type 'Mutation' (Mutation.integrationRequest)

  feat(schema): [non_breaking] Field 'integrationSlackOrgProjectUpdatesPost' was added to object type 'Mutation' (Mutation.integrationSlackOrgProjectUpdatesPost)

  feat(schema): [non_breaking] Field 'integrationTemplateCreate' was added to object type 'Mutation' (Mutation.integrationTemplateCreate)

  feat(schema): [non_breaking] Field 'integrationTemplateDelete' was added to object type 'Mutation' (Mutation.integrationTemplateDelete)

  feat(schema): [non_breaking] Field 'integrationsSettingsCreate' was added to object type 'Mutation' (Mutation.integrationsSettingsCreate)

  feat(schema): [non_breaking] Field 'integrationsSettingsUpdate' was added to object type 'Mutation' (Mutation.integrationsSettingsUpdate)

  feat(schema): [non_breaking] Field 'issueReminder' was added to object type 'Mutation' (Mutation.issueReminder)

  feat(schema): [non_breaking] Field 'logout' was added to object type 'Mutation' (Mutation.logout)

  feat(schema): [non_breaking] Field 'migrateMilestonesToRoadmaps' was added to object type 'Mutation' (Mutation.migrateMilestonesToRoadmaps)

  feat(schema): [non_breaking] Field 'notificationSubscriptionUpdate' was added to object type 'Mutation' (Mutation.notificationSubscriptionUpdate)

  feat(schema): [non_breaking] Field 'organizationDomainClaim' was added to object type 'Mutation' (Mutation.organizationDomainClaim)

  feat(schema): [non_breaking] Field 'organizationInviteUpdate' was added to object type 'Mutation' (Mutation.organizationInviteUpdate)

  feat(schema): [non_breaking] Field 'projectUpdateCreate' was added to object type 'Mutation' (Mutation.projectUpdateCreate)

  feat(schema): [non_breaking] Field 'projectUpdateDelete' was added to object type 'Mutation' (Mutation.projectUpdateDelete)

  feat(schema): [non_breaking] Field 'projectUpdateInteractionCreate' was added to object type 'Mutation' (Mutation.projectUpdateInteractionCreate)

  feat(schema): [non_breaking] Field 'projectUpdateMarkAsRead' was added to object type 'Mutation' (Mutation.projectUpdateMarkAsRead)

  feat(schema): [non_breaking] Field 'projectUpdateUpdate' was added to object type 'Mutation' (Mutation.projectUpdateUpdate)

  feat(schema): [non_breaking] Field 'roadmapCreate' was added to object type 'Mutation' (Mutation.roadmapCreate)

  feat(schema): [non_breaking] Field 'roadmapDelete' was added to object type 'Mutation' (Mutation.roadmapDelete)

  feat(schema): [non_breaking] Field 'roadmapToProjectCreate' was added to object type 'Mutation' (Mutation.roadmapToProjectCreate)

  feat(schema): [non_breaking] Field 'roadmapToProjectDelete' was added to object type 'Mutation' (Mutation.roadmapToProjectDelete)

  feat(schema): [non_breaking] Field 'roadmapToProjectUpdate' was added to object type 'Mutation' (Mutation.roadmapToProjectUpdate)

  feat(schema): [non_breaking] Field 'roadmapUpdate' was added to object type 'Mutation' (Mutation.roadmapUpdate)

  feat(schema): [non_breaking] Field 'teamCyclesDelete' was added to object type 'Mutation' (Mutation.teamCyclesDelete)

  feat(schema): [non_breaking] Field 'userAccountEmailChangeVerifyCode' was added to object type 'Mutation' (Mutation.userAccountEmailChangeVerifyCode)

  feat(schema): [non_breaking] Field 'userDemoteMember' was added to object type 'Mutation' (Mutation.userDemoteMember)

  feat(schema): [non_breaking] Field 'userGitHubConnect' was added to object type 'Mutation' (Mutation.userGitHubConnect)

  feat(schema): [non_breaking] Field 'userGoogleCalendarConnect' was added to object type 'Mutation' (Mutation.userGoogleCalendarConnect)

  feat(schema): [non_breaking] Field 'userPromoteMember' was added to object type 'Mutation' (Mutation.userPromoteMember)

  feat(schema): [non_breaking] Field 'Mutation.apiKeyCreate' description changed from '[Internal] Creates a new API key.' to 'Creates a new API key.' (Mutation.apiKeyCreate)

  feat(schema): [non_breaking] Field 'Mutation.apiKeyDelete' description changed from '[Internal] Deletes an API key.' to 'Deletes an API key.' (Mutation.apiKeyDelete)

  feat(schema): [non_breaking] Field 'Mutation.attachmentCreate' description changed from '[Alpha] Creates a new attachment, or updates existing if the same `url` and `issueId` is used.' to 'Creates a new attachment, or updates existing if the same `url` and `issueId` is used.' (Mutation.attachmentCreate)

  feat(schema): [non_breaking] Field 'Mutation.attachmentDelete' description changed from '[Alpha] Deletes an issue attachment.' to 'Deletes an issue attachment.' (Mutation.attachmentDelete)

  feat(schema): [non_breaking] Field 'Mutation.attachmentUpdate' description changed from '[Alpha] Updates an existing issue attachment.' to 'Updates an existing issue attachment.' (Mutation.attachmentUpdate)

  feat(schema): [non_breaking] Field 'Mutation.integrationResourceArchive' is deprecated (Mutation.integrationResourceArchive)

  feat(schema): [non_breaking] Field 'Mutation.integrationResourceArchive' has deprecation reason 'This query will soon be deprecated, please use `attachmentArchive` instead' (Mutation.integrationResourceArchive)

  feat(schema): [non_breaking] Type for argument 'teamId' on field 'Mutation.issueImportCreateAsana' changed from 'String!' to 'String' (Mutation.issueImportCreateAsana.teamId)

  feat(schema): [non_breaking] Field 'Mutation.issueImportCreateClubhouse' description changed from 'Kicks off a Clubhouse import job.' to 'Kicks off a Shortcut (formerly Clubhouse) import job.' (Mutation.issueImportCreateClubhouse)

  feat(schema): [non_breaking] Description for argument 'clubhouseTeamName' on field 'Mutation.issueImportCreateClubhouse' changed from 'Clubhouse team name to choose which issues we should import.' to 'Shortcut (formerly Clubhouse) team name to choose which issues we should import.' (Mutation.issueImportCreateClubhouse.clubhouseTeamName)

  feat(schema): [non_breaking] Description for argument 'clubhouseToken' on field 'Mutation.issueImportCreateClubhouse' changed from 'Clubhouse token to fetch information from the Clubhouse API.' to 'Shortcut (formerly Clubhouse) token to fetch information from the Clubhouse API.' (Mutation.issueImportCreateClubhouse.clubhouseToken)

  feat(schema): [non_breaking] Type for argument 'teamId' on field 'Mutation.issueImportCreateClubhouse' changed from 'String!' to 'String' (Mutation.issueImportCreateClubhouse.teamId)

  feat(schema): [non_breaking] Type for argument 'teamId' on field 'Mutation.issueImportCreateGithub' changed from 'String!' to 'String' (Mutation.issueImportCreateGithub.teamId)

  feat(schema): [non_breaking] Description for argument 'teamId' on field 'Mutation.issueImportCreateJira' changed from 'ID of the team into which to import data.' to 'ID of the team into which to import data. Empty to create new team.' (Mutation.issueImportCreateJira.teamId)

  feat(schema): [non_breaking] Type for argument 'teamId' on field 'Mutation.issueImportCreateJira' changed from 'String!' to 'String' (Mutation.issueImportCreateJira.teamId)

  feat(schema): [non_breaking] Field 'Mutation.issueLabelArchive' description changed from 'Archives an issue label.' to 'Deletes an issue label.' (Mutation.issueLabelArchive)

  feat(schema): [non_breaking] Deprecation reason on field 'Mutation.issueLabelArchive' has changed from 'Labels are deleted instead of archived.' to 'Labels are deleted instead of archived now!' (Mutation.issueLabelArchive)

  feat(schema): [non_breaking] Field 'Mutation.milestoneCreate' is deprecated (Mutation.milestoneCreate)

  feat(schema): [non_breaking] Field 'Mutation.milestoneCreate' has deprecation reason 'Milestones will be removed. Use roadmaps instead.' (Mutation.milestoneCreate)

  feat(schema): [non_breaking] Field 'Mutation.milestoneDelete' is deprecated (Mutation.milestoneDelete)

  feat(schema): [non_breaking] Field 'Mutation.milestoneDelete' has deprecation reason 'Milestones will be removed. Use roadmaps instead.' (Mutation.milestoneDelete)

  feat(schema): [non_breaking] Field 'Mutation.milestoneUpdate' is deprecated (Mutation.milestoneUpdate)

  feat(schema): [non_breaking] Field 'Mutation.milestoneUpdate' has deprecation reason 'Milestones will be removed. Use roadmaps instead.' (Mutation.milestoneUpdate)

  feat(schema): [non_breaking] Description for argument 'input' on field 'Mutation.notificationUpdate' changed from 'A partial notification object to update the issue with.' to 'A partial notification object to update the notification with.' (Mutation.notificationUpdate.input)

  feat(schema): [non_breaking] Field 'Mutation.organizationDomainCreate' description changed from 'Adds a domain to be allowed for an organization.' to '[INTERNAL] Adds a domain to be allowed for an organization.' (Mutation.organizationDomainCreate)

  feat(schema): [non_breaking] Field 'Mutation.organizationDomainVerify' description changed from 'Verifies a domain to be added to an organization.' to '[INTERNAL] Verifies a domain to be added to an organization.' (Mutation.organizationDomainVerify)

  feat(schema): [non_breaking] Field 'actor' was added to interface 'Notification' (Notification.actor)

  feat(schema): [non_breaking] Field 'unsnoozedAt' was added to interface 'Notification' (Notification.unsnoozedAt)

  feat(schema): [non_breaking] Field 'Notification.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Notification.updatedAt)

  feat(schema): [non_breaking] Input field 'NotificationSubscriptionCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (NotificationSubscriptionCreateInput.id)

  feat(schema): [non_breaking] Input field 'NullableCycleFilter.and' description changed from 'Compound filters, all of which need to be matched by the cycle.' to 'Compound filters, one of which need to be matched by the cycle.' (NullableCycleFilter.and)

  feat(schema): [non_breaking] Description '[Alpha] Cycle filtering options.' on type 'NullableCycleFilter' has changed to 'Cycle filtering options.' (NullableCycleFilter)

  feat(schema): [non_breaking] Description '[Alpha] Project filtering options.' on type 'NullableProjectFilter' has changed to 'Project filtering options.' (NullableProjectFilter)

  feat(schema): [non_breaking] Description '[Alpha] User filtering options.' on type 'NullableUserFilter' has changed to 'User filtering options.' (NullableUserFilter)

  feat(schema): [non_breaking] Field 'creator' was added to object type 'OauthClient' (OauthClient.creator)

  feat(schema): [non_breaking] Field 'organization' was added to object type 'OauthClient' (OauthClient.organization)

  feat(schema): [non_breaking] Field 'OauthClient.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (OauthClient.updatedAt)

  feat(schema): [non_breaking] Field 'previousUrlKeys' was added to object type 'Organization' (Organization.previousUrlKeys)

  feat(schema): [non_breaking] Field 'projectUpdateRemindersDay' was added to object type 'Organization' (Organization.projectUpdateRemindersDay)

  feat(schema): [non_breaking] Field 'projectUpdateRemindersHour' was added to object type 'Organization' (Organization.projectUpdateRemindersHour)

  feat(schema): [non_breaking] Field 'projectUpdatesReminderFrequency' was added to object type 'Organization' (Organization.projectUpdatesReminderFrequency)

  feat(schema): [non_breaking] Field 'scimEnabled' was added to object type 'Organization' (Organization.scimEnabled)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Organization.labels' changed from '[Alpha] Filter returned issue labels.' to 'Filter returned issue labels.' (Organization.labels.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Organization.teams' changed from '[Alpha] Filter returned teams.' to 'Filter returned teams.' (Organization.teams.filter)

  feat(schema): [non_breaking] Field 'Organization.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Organization.updatedAt)

  feat(schema): [non_breaking] Field 'authType' was added to object type 'OrganizationDomain' (OrganizationDomain.authType)

  feat(schema): [non_breaking] Field 'claimed' was added to object type 'OrganizationDomain' (OrganizationDomain.claimed)

  feat(schema): [non_breaking] Field 'OrganizationDomain.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (OrganizationDomain.updatedAt)

  feat(schema): [non_breaking] Input field 'OrganizationDomainCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (OrganizationDomainCreateInput.id)

  feat(schema): [non_breaking] Input field 'OrganizationDomainCreateInput.verificationEmail' changed type from 'String!' to 'String' (OrganizationDomainCreateInput.verificationEmail)

  feat(schema): [non_breaking] Object type 'OrganizationDomainPayload' has description '[INTERNAL] Organization domain operation response.' (OrganizationDomainPayload)

  feat(schema): [non_breaking] Object type 'OrganizationDomainSimplePayload' has description '[INTERNAL] Organization domain operation response.' (OrganizationDomainSimplePayload)

  feat(schema): [non_breaking] Input field 'OrganizationDomainVerificationInput.organizationDomainId' description changed from 'The identifier of the domain being verified.' to 'The identifier in UUID v4 format of the domain being verified.' (OrganizationDomainVerificationInput.organizationDomainId)

  feat(schema): [non_breaking] Field 'role' was added to object type 'OrganizationInvite' (OrganizationInvite.role)

  feat(schema): [non_breaking] Field 'OrganizationInvite.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (OrganizationInvite.updatedAt)

  feat(schema): [non_breaking] Input field 'OrganizationInviteCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (OrganizationInviteCreateInput.id)

  feat(schema): [non_breaking] Field 'role' was added to object type 'OrganizationInviteDetailsPayload' (OrganizationInviteDetailsPayload.role)

  feat(schema): [non_breaking] Field 'convertedFromIssue' was added to object type 'Project' (Project.convertedFromIssue)

  feat(schema): [non_breaking] Field 'inProgressScopeHistory' was added to object type 'Project' (Project.inProgressScopeHistory)

  feat(schema): [non_breaking] Field 'initiative' was added to object type 'Project' (Project.initiative)

  feat(schema): [non_breaking] Field 'integrationsSettings' was added to object type 'Project' (Project.integrationsSettings)

  feat(schema): [non_breaking] Field 'projectUpdateRemindersPausedUntilAt' was added to object type 'Project' (Project.projectUpdateRemindersPausedUntilAt)

  feat(schema): [non_breaking] Field 'projectUpdates' was added to object type 'Project' (Project.projectUpdates)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Project.issues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (Project.issues.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Project.members' changed from '[Alpha] Filter returned users.' to 'Filter returned users.' (Project.members.filter)

  feat(schema): [non_breaking] Field 'Project.milestone' is deprecated (Project.milestone)

  feat(schema): [non_breaking] Field 'Project.milestone' has deprecation reason 'Milestones will be removed. Use roadmaps instead.' (Project.milestone)

  feat(schema): [non_breaking] Field 'Project.sortOrder' description changed from 'The sort order for the project within its milestone.' to 'The sort order for the project within its milestone/initiative.' (Project.sortOrder)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Project.teams' changed from '[Alpha] Filter returned teams.' to 'Filter returned teams.' (Project.teams.filter)

  feat(schema): [non_breaking] Field 'Project.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Project.updatedAt)

  feat(schema): [non_breaking] Description '[Alpha] Project filtering options.' on type 'ProjectCollectionFilter' has changed to 'Project filtering options.' (ProjectCollectionFilter)

  feat(schema): [non_breaking] Input field 'ProjectCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (ProjectCreateInput.id)

  feat(schema): [non_breaking] Input field 'ProjectCreateInput.sortOrder' description changed from 'The sort order for the project within its milestone.' to 'The sort order for the project within shared views.' (ProjectCreateInput.sortOrder)

  feat(schema): [non_breaking] Input field 'ProjectCreateInput.startDate' description changed from '[Internal] The planned start date of the project.' to 'The planned start date of the project.' (ProjectCreateInput.startDate)

  feat(schema): [non_breaking] Description '[Alpha] Project filtering options.' on type 'ProjectFilter' has changed to 'Project filtering options.' (ProjectFilter)

  feat(schema): [non_breaking] Field 'ProjectLink.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (ProjectLink.updatedAt)

  feat(schema): [non_breaking] Input field 'ProjectLinkCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (ProjectLinkCreateInput.id)

  feat(schema): [non_breaking] Input field 'ProjectUpdateInput.sortOrder' description changed from 'The sort order for the project within its milestone.' to 'The sort order for the project in shared views.' (ProjectUpdateInput.sortOrder)

  feat(schema): [non_breaking] Input field 'ProjectUpdateInput.startDate' description changed from '[Internal] The planned start date of the project.' to 'The planned start date of the project.' (ProjectUpdateInput.startDate)

  feat(schema): [non_breaking] Field 'reviewers' was added to object type 'PullRequestPayload' (PullRequestPayload.reviewers)

  feat(schema): [non_breaking] Field 'reviews' was added to object type 'PullRequestPayload' (PullRequestPayload.reviews)

  feat(schema): [non_breaking] Field 'PushSubscription.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (PushSubscription.updatedAt)

  feat(schema): [non_breaking] Input field 'PushSubscriptionCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (PushSubscriptionCreateInput.id)

  feat(schema): [non_breaking] Field 'applicationInfoByIds' was added to object type 'Query' (Query.applicationInfoByIds)

  feat(schema): [non_breaking] Field 'integrationTemplate' was added to object type 'Query' (Query.integrationTemplate)

  feat(schema): [non_breaking] Field 'integrationTemplates' was added to object type 'Query' (Query.integrationTemplates)

  feat(schema): [non_breaking] Field 'integrationsSettings' was added to object type 'Query' (Query.integrationsSettings)

  feat(schema): [non_breaking] Field 'organizationDomainClaimRequest' was added to object type 'Query' (Query.organizationDomainClaimRequest)

  feat(schema): [non_breaking] Field 'projectUpdate' was added to object type 'Query' (Query.projectUpdate)

  feat(schema): [non_breaking] Field 'projectUpdateInteraction' was added to object type 'Query' (Query.projectUpdateInteraction)

  feat(schema): [non_breaking] Field 'projectUpdateInteractions' was added to object type 'Query' (Query.projectUpdateInteractions)

  feat(schema): [non_breaking] Field 'projectUpdates' was added to object type 'Query' (Query.projectUpdates)

  feat(schema): [non_breaking] Field 'roadmap' was added to object type 'Query' (Query.roadmap)

  feat(schema): [non_breaking] Field 'roadmapToProject' was added to object type 'Query' (Query.roadmapToProject)

  feat(schema): [non_breaking] Field 'roadmapToProjects' was added to object type 'Query' (Query.roadmapToProjects)

  feat(schema): [non_breaking] Field 'roadmaps' was added to object type 'Query' (Query.roadmaps)

  feat(schema): [non_breaking] Field 'workspaceAuthorizedApplications' was added to object type 'Query' (Query.workspaceAuthorizedApplications)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.administrableTeams' changed from '[Alpha] Filter returned teams.' to 'Filter returned teams.' (Query.administrableTeams.filter)

  feat(schema): [non_breaking] Field 'Query.apiKeys' description changed from '[Internal] All API keys for the user.' to 'All API keys for the user.' (Query.apiKeys)

  feat(schema): [non_breaking] Field 'Query.attachment' description changed from '[Alpha] One specific issue attachment.
  [Deprecated] 'url' can no longer be used as the 'id' parameter. Use 'attachmentsForUrl' instead' to 'One specific issue attachment.
  [Deprecated] 'url' can no longer be used as the 'id' parameter. Use 'attachmentsForUrl' instead' (Query.attachment)

  feat(schema): [non_breaking] Field 'Query.attachmentIssue' description changed from '[Alpha] Query an issue by its associated attachment, and its id.' to 'Query an issue by its associated attachment, and its id.' (Query.attachmentIssue)

  feat(schema): [non_breaking] Field 'Query.attachments' description changed from '[Alpha] All issue attachments.

  To get attachments for a given URL, use `attachmentsForURL` query.' to 'All issue attachments.

  To get attachments for a given URL, use `attachmentsForURL` query.' (Query.attachments)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.attachments' changed from '[Alpha] Filter returned attachments.' to 'Filter returned attachments.' (Query.attachments.filter)

  feat(schema): [non_breaking] Field 'Query.attachmentsForURL' description changed from '[Alpha] Returns issue attachments for a given `url`.' to 'Returns issue attachments for a given `url`.' (Query.attachmentsForURL)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.auditEntries' changed from '[Alpha] Filter returned audit entries.' to 'Filter returned audit entries.' (Query.auditEntries.filter)

  feat(schema): [non_breaking] Field 'Query.authorizedApplications' description changed from 'Get all authorized applications for a user' to '[INTERNAL] Get all authorized applications for a user' (Query.authorizedApplications)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.comments' changed from '[Alpha] Filter returned comments.' to 'Filter returned comments.' (Query.comments.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.cycles' changed from '[Alpha] Filter returned users.' to 'Filter returned users.' (Query.cycles.filter)

  feat(schema): [non_breaking] Field 'Query.integrationResource' is deprecated (Query.integrationResource)

  feat(schema): [non_breaking] Field 'Query.integrationResource' has deprecation reason 'This query will soon be deprecated, please use `attachment` instead' (Query.integrationResource)

  feat(schema): [non_breaking] Field 'Query.integrationResources' is deprecated (Query.integrationResources)

  feat(schema): [non_breaking] Field 'Query.integrationResources' has deprecation reason 'This query will soon be deprecated, please use `attachments` instead' (Query.integrationResources)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.issueLabels' changed from '[Alpha] Filter returned issue labels.' to 'Filter returned issue labels.' (Query.issueLabels.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.issueSearch' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (Query.issueSearch.filter)

  feat(schema): [non_breaking] Field 'Query.issueVcsBranchSearch' description changed from '[Internal] Find issue based on the VCS branch name.' to 'Find issue based on the VCS branch name.' (Query.issueVcsBranchSearch)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.issues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (Query.issues.filter)

  feat(schema): [non_breaking] Field 'Query.milestone' is deprecated (Query.milestone)

  feat(schema): [non_breaking] Field 'Query.milestone' has deprecation reason 'Milestones will be removed. Use roadmaps instead.' (Query.milestone)

  feat(schema): [non_breaking] Field 'Query.milestones' is deprecated (Query.milestones)

  feat(schema): [non_breaking] Field 'Query.milestones' has deprecation reason 'Milestones will be removed. Use roadmaps instead.' (Query.milestones)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.projects' changed from '[Alpha] Filter returned projects.' to 'Filter returned projects.' (Query.projects.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.teams' changed from '[Alpha] Filter returned teams.' to 'Filter returned teams.' (Query.teams.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.users' changed from '[Alpha] Filter returned users.' to 'Filter returned users.' (Query.users.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Query.workflowStates' changed from '[Alpha] Filter returned workflow states.' to 'Filter returned workflow states.' (Query.workflowStates.filter)

  feat(schema): [non_breaking] Field 'Reaction.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Reaction.updatedAt)

  feat(schema): [non_breaking] Description 'A reaction associated with a comment.' on type 'Reaction' has changed to 'A reaction associated with a comment or a project update.' (Reaction)

  feat(schema): [non_breaking] Input field 'ReactionCreateInput.commentId' changed type from 'String!' to 'String' (ReactionCreateInput.commentId)

  feat(schema): [non_breaking] Input field 'ReactionCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one' (ReactionCreateInput.id)

  feat(schema): [non_breaking] Field 'integrationsSettings' was added to object type 'Team' (Team.integrationsSettings)

  feat(schema): [non_breaking] Field 'issueSortOrderDefaultToBottom' was added to object type 'Team' (Team.issueSortOrderDefaultToBottom)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Team.cycles' changed from '[Alpha] Filter returned cycles.' to 'Filter returned cycles.' (Team.cycles.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Team.issues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (Team.issues.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Team.labels' changed from '[Alpha] Filter returned issue labels.' to 'Filter returned issue labels.' (Team.labels.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Team.members' changed from '[Alpha] Filter returned users.' to 'Filter returned users.' (Team.members.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Team.projects' changed from '[Alpha] Filter returned projects.' to 'Filter returned projects.' (Team.projects.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'Team.states' changed from '[Alpha] Filter returned workflow states.' to 'Filter returned workflow states.' (Team.states.filter)

  feat(schema): [non_breaking] Field 'Team.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Team.updatedAt)

  feat(schema): [non_breaking] Input field 'TeamCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (TeamCreateInput.id)

  feat(schema): [non_breaking] Description '[Alpha] Project filtering options.' on type 'TeamFilter' has changed to 'Team filtering options.' (TeamFilter)

  feat(schema): [non_breaking] Field 'sortOrder' was added to object type 'TeamMembership' (TeamMembership.sortOrder)

  feat(schema): [non_breaking] Field 'TeamMembership.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (TeamMembership.updatedAt)

  feat(schema): [non_breaking] Input field 'TeamMembershipCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (TeamMembershipCreateInput.id)

  feat(schema): [non_breaking] Input field 'TeamMembershipUpdateInput.owner' changed type from 'Boolean!' to 'Boolean' (TeamMembershipUpdateInput.owner)

  feat(schema): [non_breaking] Field 'lastUpdatedBy' was added to object type 'Template' (Template.lastUpdatedBy)

  feat(schema): [non_breaking] Field 'Template.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Template.updatedAt)

  feat(schema): [non_breaking] Input field 'TemplateCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (TemplateCreateInput.id)

  feat(schema): [non_breaking] Input field 'UpdateOrganizationInput.reducedPersonalInformation' description changed from 'Whether the organization is using project milestones.' to 'Whether the organization has opted for reduced customer support attachment information.' (UpdateOrganizationInput.reducedPersonalInformation)

  feat(schema): [non_breaking] Input field 'UpdateOrganizationInput.roadmapEnabled' description changed from 'Whether the organization is using project milestones.' to 'Whether the organization is using roadmap.' (UpdateOrganizationInput.roadmapEnabled)

  feat(schema): [non_breaking] Field 'calendarHash' was added to object type 'User' (User.calendarHash)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'User.assignedIssues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (User.assignedIssues.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'User.createdIssues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (User.createdIssues.filter)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'User.teams' changed from '[Alpha] Filter returned teams.' to 'Filter returned teams.' (User.teams.filter)

  feat(schema): [non_breaking] Field 'User.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (User.updatedAt)

  feat(schema): [non_breaking] Field 'approvalErrorCode' was added to object type 'UserAuthorizedApplication' (UserAuthorizedApplication.approvalErrorCode)

  feat(schema): [non_breaking] Field 'id' was added to object type 'UserAuthorizedApplication' (UserAuthorizedApplication.id)

  feat(schema): [non_breaking] Description '[Alpha] User filtering options.' on type 'UserFilter' has changed to 'User filtering options.' (UserFilter)

  feat(schema): [non_breaking] Field 'UserSettings.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (UserSettings.updatedAt)

  feat(schema): [non_breaking] Field 'ViewPreferences.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (ViewPreferences.updatedAt)

  feat(schema): [non_breaking] Input field 'ViewPreferencesCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (ViewPreferencesCreateInput.id)

  feat(schema): [non_breaking] Field 'Webhook.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (Webhook.updatedAt)

  feat(schema): [non_breaking] Input field 'WebhookCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (WebhookCreateInput.id)

  feat(schema): [non_breaking] Description for argument 'filter' on field 'WorkflowState.issues' changed from '[Alpha] Filter returned issues.' to 'Filter returned issues.' (WorkflowState.issues.filter)

  feat(schema): [non_breaking] Field 'WorkflowState.updatedAt' description changed from 'The last time at which the entity was updated. This is the same as the creation time if the
  entity hasn't been updated after creation.' to 'The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
  for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
  been updated after creation.' (WorkflowState.updatedAt)

  feat(schema): [non_breaking] Input field 'WorkflowStateCreateInput.id' description changed from 'The identifier. If none is provided, the backend will generate one.' to 'The identifier in UUID v4 format. If none is provided, the backend will generate one.' (WorkflowStateCreateInput.id)

  feat(schema): [non_breaking] Description '[Alpha] Workflow state filtering options.' on type 'WorkflowStateFilter' has changed to 'Workflow state filtering options.' (WorkflowStateFilter)

  feat(schema): [non_breaking] Field 'automateTicketReopeningOnCancellation' was added to object type 'ZendeskSettings' (ZendeskSettings.automateTicketReopeningOnCancellation)

  feat(schema): [non_breaking] Field 'automateTicketReopeningOnComment' was added to object type 'ZendeskSettings' (ZendeskSettings.automateTicketReopeningOnComment)

  feat(schema): [non_breaking] Field 'automateTicketReopeningOnCompletion' was added to object type 'ZendeskSettings' (ZendeskSettings.automateTicketReopeningOnCompletion)

  feat(schema): [non_breaking] Field 'sendNoteOnComment' was added to object type 'ZendeskSettings' (ZendeskSettings.sendNoteOnComment)

  feat(schema): [non_breaking] Field 'sendNoteOnStatusChange' was added to object type 'ZendeskSettings' (ZendeskSettings.sendNoteOnStatusChange)

  feat(schema): [non_breaking] Input field 'ZendeskSettingsInput.botUserId' changed type from 'String!' to 'String' (ZendeskSettingsInput.botUserId)

### Patch Changes

- 980454f: Removed deprecated rollup plugin `rollup-plugin-size-snapshot`

## 1.22.0

### Minor Changes

- 4e2964b: feat(schema): [breaking] Field 'Mutation.attachmentLinkFront' changed type from 'AttachmentPayload!' to 'FrontAttachmentPayload!' (Mutation.attachmentLinkFront)

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

- 90706af: feat(schema): [breaking] Type 'DocumentationSearchPayload' was removed (DocumentationSearchPayload)

  feat(schema): [breaking] Type 'SearchResultPayload' was removed (SearchResultPayload)

  feat(schema): [breaking] Field 'IssueLabel.team' changed type from 'Team!' to 'Team' (IssueLabel.team)

  feat(schema): [breaking] Field 'integrationJiraSettingsUpdate' was removed from object type 'Mutation' (Mutation.integrationJiraSettingsUpdate)

  feat(schema): [breaking] Field 'documentationSearch' was removed from object type 'Query' (Query.documentationSearch)

  feat(schema): [breaking] Field 'search' was removed from object type 'Query' (Query.search)

  feat(schema): [breaking] Field 'Template.organization' changed type from 'Organization!' to 'Organization' (Template.organization)

  feat(schema): [breaking] Field 'Template.team' changed type from 'Team!' to 'Team' (Template.team)

  feat(schema): [dangerous] Argument 'replaceTeamLabels: Boolean' added to field 'Mutation.issueLabelCreate' (Mutation.issueLabelCreate.replaceTeamLabels)

  feat(schema): [dangerous] Input field 'containsIgnoreCase' was added to input object type 'NestedStringComparator' (NestedStringComparator.containsIgnoreCase)

  feat(schema): [dangerous] Input field 'eqIgnoreCase' was added to input object type 'NestedStringComparator' (NestedStringComparator.eqIgnoreCase)

  feat(schema): [dangerous] Input field 'neqIgnoreCase' was added to input object type 'NestedStringComparator' (NestedStringComparator.neqIgnoreCase)

  feat(schema): [dangerous] Input field 'notContainsIgnoreCase' was added to input object type 'NestedStringComparator' (NestedStringComparator.notContainsIgnoreCase)

  feat(schema): [dangerous] Input field 'containsIgnoreCase' was added to input object type 'NullableStringComparator' (NullableStringComparator.containsIgnoreCase)

  feat(schema): [dangerous] Input field 'eqIgnoreCase' was added to input object type 'NullableStringComparator' (NullableStringComparator.eqIgnoreCase)

  feat(schema): [dangerous] Input field 'neqIgnoreCase' was added to input object type 'NullableStringComparator' (NullableStringComparator.neqIgnoreCase)

  feat(schema): [dangerous] Input field 'notContainsIgnoreCase' was added to input object type 'NullableStringComparator' (NullableStringComparator.notContainsIgnoreCase)

  feat(schema): [dangerous] Input field 'isMe' was added to input object type 'NullableUserFilter' (NullableUserFilter.isMe)

  feat(schema): [dangerous] Input field 'containsIgnoreCase' was added to input object type 'StringComparator' (StringComparator.containsIgnoreCase)

  feat(schema): [dangerous] Input field 'eqIgnoreCase' was added to input object type 'StringComparator' (StringComparator.eqIgnoreCase)

  feat(schema): [dangerous] Input field 'neqIgnoreCase' was added to input object type 'StringComparator' (StringComparator.neqIgnoreCase)

  feat(schema): [dangerous] Input field 'notContainsIgnoreCase' was added to input object type 'StringComparator' (StringComparator.notContainsIgnoreCase)

  feat(schema): [dangerous] Input field 'color' was added to input object type 'TeamCreateInput' (TeamCreateInput.color)

  feat(schema): [dangerous] Input field 'icon' was added to input object type 'TeamCreateInput' (TeamCreateInput.icon)

  feat(schema): [dangerous] Input field 'color' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.color)

  feat(schema): [dangerous] Input field 'icon' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.icon)

  feat(schema): [dangerous] Input field 'teamId' was added to input object type 'TemplateUpdateInput' (TemplateUpdateInput.teamId)

  feat(schema): [dangerous] Input field 'reducedPersonalInformation' was added to input object type 'UpdateOrganizationInput' (UpdateOrganizationInput.reducedPersonalInformation)

  feat(schema): [dangerous] Input field 'description' was added to input object type 'UpdateUserInput' (UpdateUserInput.description)

  feat(schema): [dangerous] Input field 'statusEmoji' was added to input object type 'UpdateUserInput' (UpdateUserInput.statusEmoji)

  feat(schema): [dangerous] Input field 'statusLabel' was added to input object type 'UpdateUserInput' (UpdateUserInput.statusLabel)

  feat(schema): [dangerous] Input field 'statusUntilAt' was added to input object type 'UpdateUserInput' (UpdateUserInput.statusUntilAt)

  feat(schema): [dangerous] Input field 'timezone' was added to input object type 'UpdateUserInput' (UpdateUserInput.timezone)

  feat(schema): [dangerous] Input field 'isMe' was added to input object type 'UserFilter' (UserFilter.isMe)

  feat(schema): [dangerous] Enum value 'canPlayTetris' was added to enum 'UserFlagType' (UserFlagType.canPlayTetris)

  feat(schema): [non_breaking] Type 'GitHubCommitIntegrationPayload' was added (GitHubCommitIntegrationPayload)

  feat(schema): [non_breaking] Type 'GoogleSheetsSettingsInput' was added (GoogleSheetsSettingsInput)

  feat(schema): [non_breaking] Type 'IntegrationSettingsInput' was added (IntegrationSettingsInput)

  feat(schema): [non_breaking] Type 'ProjectLinkUpdateInput' was added (ProjectLinkUpdateInput)

  feat(schema): [non_breaking] Type 'SentrySettingsInput' was added (SentrySettingsInput)

  feat(schema): [non_breaking] Type 'SlackPostSettingsInput' was added (SlackPostSettingsInput)

  feat(schema): [non_breaking] Type 'ZendeskSettingsInput' was added (ZendeskSettingsInput)

  feat(schema): [non_breaking] Field 'contentData' was added to object type 'Document' (Document.contentData)

  feat(schema): [non_breaking] Input field 'DocumentCreateInput.contentData' description changed from 'The document content as a Prosemirror document.' to '[Internal] The document content as a Prosemirror document.' (DocumentCreateInput.contentData)

  feat(schema): [non_breaking] Input field 'DocumentUpdateInput.contentData' description changed from 'The document content as a Prosemirror document.' to '[Internal] The document content as a Prosemirror document.' (DocumentUpdateInput.contentData)

  feat(schema): [non_breaking] Field 'organization' was added to object type 'IssueLabel' (IssueLabel.organization)

  feat(schema): [non_breaking] Field 'IssueLabel.team' description changed from 'The team to which the label belongs to.' to 'The team that the label is associated with. If null, the label is associated with the global workspace..' (IssueLabel.team)

  feat(schema): [non_breaking] Input field 'IssueLabelCreateInput.teamId' description changed from 'The team associated with the label.' to 'The team associated with the label. If not given, the label will be associated with the entire workspace.' (IssueLabelCreateInput.teamId)

  feat(schema): [non_breaking] Input field 'IssueLabelCreateInput.teamId' changed type from 'String!' to 'String' (IssueLabelCreateInput.teamId)

  feat(schema): [non_breaking] Field 'attachmentLinkJiraIssue' was added to object type 'Mutation' (Mutation.attachmentLinkJiraIssue)

  feat(schema): [non_breaking] Field 'debugCreateSubscription' was added to object type 'Mutation' (Mutation.debugCreateSubscription)

  feat(schema): [non_breaking] Field 'integrationGithubCommitCreate' was added to object type 'Mutation' (Mutation.integrationGithubCommitCreate)

  feat(schema): [non_breaking] Field 'integrationSettingsUpdate' was added to object type 'Mutation' (Mutation.integrationSettingsUpdate)

  feat(schema): [non_breaking] Field 'projectLinkUpdate' was added to object type 'Mutation' (Mutation.projectLinkUpdate)

  feat(schema): [non_breaking] Field 'Mutation.debugCreateOAuthApps' description changed from 'Create the OAuth test applications in development.' to '[Internal] Create the OAuth test applications in development.' (Mutation.debugCreateOAuthApps)

  feat(schema): [non_breaking] Field 'Mutation.debugCreateSAMLOrg' description changed from 'Create the SAML test organization in development.' to '[Internal] Create the SAML test organization in development.' (Mutation.debugCreateSAMLOrg)

  feat(schema): [non_breaking] Field 'Mutation.debugFailWithWarning' description changed from 'Always logs an error to Sentry as warning. Used to debug logging.' to '[Internal] Always logs an error to Sentry as warning. Used to debug logging.' (Mutation.debugFailWithWarning)

  feat(schema): [non_breaking] Field 'Mutation.integrationIntercomSettingsUpdate' description changed from 'Updates settings on the Intercom integration.' to '[DEPRECATED] Updates settings on the Intercom integration.' (Mutation.integrationIntercomSettingsUpdate)

  feat(schema): [non_breaking] Field 'Mutation.integrationIntercomSettingsUpdate' is deprecated (Mutation.integrationIntercomSettingsUpdate)

  feat(schema): [non_breaking] Field 'Mutation.integrationIntercomSettingsUpdate' has deprecation reason 'This mutation is deprecated, please use `integrationSettingsUpdate` instead' (Mutation.integrationIntercomSettingsUpdate)

  feat(schema): [non_breaking] Field 'labels' was added to object type 'Organization' (Organization.labels)

  feat(schema): [non_breaking] Field 'templates' was added to object type 'Organization' (Organization.templates)

  feat(schema): [non_breaking] Field 'color' was added to object type 'Team' (Team.color)

  feat(schema): [non_breaking] Field 'icon' was added to object type 'Team' (Team.icon)

  feat(schema): [non_breaking] Description 'A template object used for creating new issues faster.' on type 'Template' has changed to 'A template object used for creating entities faster.' (Template)

  feat(schema): [non_breaking] Input field 'TemplateCreateInput.teamId' description changed from 'The identifier or key of the team associated with the template.' to 'The identifier or key of the team associated with the template. If not given, the template will be shared across all teams.' (TemplateCreateInput.teamId)

  feat(schema): [non_breaking] Input field 'TemplateCreateInput.teamId' changed type from 'String!' to 'String' (TemplateCreateInput.teamId)

  feat(schema): [non_breaking] Field 'description' was added to object type 'User' (User.description)

  feat(schema): [non_breaking] Field 'isMe' was added to object type 'User' (User.isMe)

  feat(schema): [non_breaking] Field 'statusEmoji' was added to object type 'User' (User.statusEmoji)

  feat(schema): [non_breaking] Field 'statusLabel' was added to object type 'User' (User.statusLabel)

  feat(schema): [non_breaking] Field 'statusUntilAt' was added to object type 'User' (User.statusUntilAt)

  feat(schema): [non_breaking] Field 'timezone' was added to object type 'User' (User.timezone)

- 9e25007: feat(schema): [breaking] Field 'Webhook.url' changed type from 'String!' to 'String' (Webhook.url)

  feat(schema): [non_breaking] Type 'JiraLinearMapping' was added (JiraLinearMapping)

  feat(schema): [non_breaking] Type 'JiraLinearMappingInput' was added (JiraLinearMappingInput)

  feat(schema): [non_breaking] Type 'JiraProjectData' was added (JiraProjectData)

  feat(schema): [non_breaking] Type 'JiraProjectDataInput' was added (JiraProjectDataInput)

  feat(schema): [non_breaking] Type 'JiraSettings' was added (JiraSettings)

  feat(schema): [non_breaking] Type 'JiraSettingsInput' was added (JiraSettingsInput)

  feat(schema): [non_breaking] Field 'updatedBy' was added to object type 'Document' (Document.updatedBy)

  feat(schema): [non_breaking] Field 'jira' was added to object type 'IntegrationSettings' (IntegrationSettings.jira)

  feat(schema): [non_breaking] Field 'integrationJiraSettingsUpdate' was added to object type 'Mutation' (Mutation.integrationJiraSettingsUpdate)

  feat(schema): [non_breaking] Field 'organization' was added to object type 'Template' (Template.organization)

  feat(schema): [non_breaking] Field 'Template.team' description changed from 'The team that the template is associated with.' to 'The team that the template is associated with. If null, the template is global to the workspace.' (Template.team)

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
