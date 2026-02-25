---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'AsksWebSettings' was removed (AsksWebSettings)

feat(schema): [breaking] Type 'AsksWebSettingsCreateInput' was removed (AsksWebSettingsCreateInput)

feat(schema): [breaking] Type 'AsksWebSettingsEmailIntakeAddressInput' was removed (AsksWebSettingsEmailIntakeAddressInput)

feat(schema): [breaking] Type 'AsksWebSettingsPayload' was removed (AsksWebSettingsPayload)

feat(schema): [breaking] Type 'AsksWebSettingsUpdateInput' was removed (AsksWebSettingsUpdateInput)

feat(schema): [breaking] Input field 'AgentActivityCreatePromptInput.content' changed type from 'JSONObject!' to 'AgentActivityPromptCreateInputContent!' (AgentActivityCreatePromptInput.content)

feat(schema): [breaking] Field 'promptContext' was removed from object type 'AgentSession' (AgentSession.promptContext)

feat(schema): [breaking] Field 'asksWebSettingsCreate' was removed from object type 'Mutation' (Mutation.asksWebSettingsCreate)

feat(schema): [breaking] Field 'asksWebSettingsUpdate' was removed from object type 'Mutation' (Mutation.asksWebSettingsUpdate)

feat(schema): [breaking] Field 'asksWebSetting' was removed from object type 'Query' (Query.asksWebSetting)

feat(schema): [breaking] Input field 'type' was removed from input object type 'ReleaseStageUpdateInput' (ReleaseStageUpdateInput.type)

feat(schema): [breaking] Input field 'description' was removed from input object type 'ReleaseSyncInput' (ReleaseSyncInput.description)

feat(schema): [breaking] Input field 'id' was removed from input object type 'ReleaseSyncInput' (ReleaseSyncInput.id)

feat(schema): [breaking] Input field 'issueIdentifiers' was removed from input object type 'ReleaseSyncInput' (ReleaseSyncInput.issueIdentifiers)

feat(schema): [breaking] Input field 'stageId' was removed from input object type 'ReleaseSyncInput' (ReleaseSyncInput.stageId)

feat(schema): [breaking] Input field 'startDate' was removed from input object type 'ReleaseSyncInput' (ReleaseSyncInput.startDate)

feat(schema): [breaking] Input field 'targetDate' was removed from input object type 'ReleaseSyncInput' (ReleaseSyncInput.targetDate)

feat(schema): [breaking] Input field 'description' was removed from input object type 'ReleaseSyncInputBase' (ReleaseSyncInputBase.description)

feat(schema): [breaking] Input field 'id' was removed from input object type 'ReleaseSyncInputBase' (ReleaseSyncInputBase.id)

feat(schema): [breaking] Input field 'stageId' was removed from input object type 'ReleaseSyncInputBase' (ReleaseSyncInputBase.stageId)

feat(schema): [breaking] Input field 'startDate' was removed from input object type 'ReleaseSyncInputBase' (ReleaseSyncInputBase.startDate)

feat(schema): [breaking] Input field 'targetDate' was removed from input object type 'ReleaseSyncInputBase' (ReleaseSyncInputBase.targetDate)

feat(schema): [dangerous] Input field 'enterpriseUrl' was added to input object type 'GitHubSettingsInput' (GitHubSettingsInput.enterpriseUrl)

feat(schema): [dangerous] Argument 'pullRequestId: String' added to field 'Mutation.agentSessionCreate' (Mutation.agentSessionCreate.pullRequestId)

feat(schema): [dangerous] Argument 'filter: ReleaseFilter' added to field 'Query.releases' (Query.releases.filter)

feat(schema): [dangerous] Input field 'name' was added to input object type 'ReleaseCollectionFilter' (ReleaseCollectionFilter.name)

feat(schema): [dangerous] Input field 'version' was added to input object type 'ReleaseCollectionFilter' (ReleaseCollectionFilter.version)

feat(schema): [dangerous] Input field 'name' was added to input object type 'ReleaseFilter' (ReleaseFilter.name)

feat(schema): [dangerous] Input field 'version' was added to input object type 'ReleaseFilter' (ReleaseFilter.version)

feat(schema): [dangerous] Input field 'name' was added to input object type 'ReleasePipelineFilter' (ReleasePipelineFilter.name)

feat(schema): [dangerous] Input field 'frozen' was added to input object type 'ReleaseStageCreateInput' (ReleaseStageCreateInput.frozen)

feat(schema): [dangerous] Input field 'frozen' was added to input object type 'ReleaseStageUpdateInput' (ReleaseStageUpdateInput.frozen)

feat(schema): [dangerous] Enum value 'continuousPipelineReleases' was added to enum 'ViewType' (ViewType.continuousPipelineReleases)

feat(schema): [dangerous] Input field 'hostMappings' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.hostMappings)

feat(schema): [non_breaking] Type 'AgentActivityPromptCreateInputContent' was added (AgentActivityPromptCreateInputContent)

feat(schema): [non_breaking] Type 'CodingAgentSandboxPayload' was added (CodingAgentSandboxPayload)

feat(schema): [non_breaking] Type 'EventTrackingInput' was added (EventTrackingInput)

feat(schema): [non_breaking] Type 'EventTrackingPayload' was added (EventTrackingPayload)

feat(schema): [non_breaking] Type 'IssueSharedAccess' was added (IssueSharedAccess)

feat(schema): [non_breaking] Type 'JiraFetchProjectStatusesInput' was added (JiraFetchProjectStatusesInput)

feat(schema): [non_breaking] Type 'JiraFetchProjectStatusesPayload' was added (JiraFetchProjectStatusesPayload)

feat(schema): [non_breaking] Type 'PullRequestCheck' was added (PullRequestCheck)

feat(schema): [non_breaking] Type 'ViewPreferencesProjectLabelGroupColumn' was added (ViewPreferencesProjectLabelGroupColumn)

feat(schema): [non_breaking] Field 'onBehalfOf' was added to object type 'Comment' (Comment.onBehalfOf)

feat(schema): [non_breaking] Field 'spawnedAgentSessions' was added to object type 'Comment' (Comment.spawnedAgentSessions)

feat(schema): [non_breaking] Field 'needs' was added to object type 'Customer' (Customer.needs)

feat(schema): [non_breaking] Field 'pullRequest' was added to object type 'DocumentContent' (DocumentContent.pullRequest)

feat(schema): [non_breaking] Field 'parentInitiatives' was added to object type 'Initiative' (Initiative.parentInitiatives)

feat(schema): [non_breaking] Field 'diffMarkdown' was added to object type 'InitiativeUpdateWebhookPayload' (InitiativeUpdateWebhookPayload.diffMarkdown)

feat(schema): [non_breaking] Field 'sharedAccess' was added to object type 'Issue' (Issue.sharedAccess)

feat(schema): [non_breaking] Field 'sharedAccess' was added to object type 'IssueSearchResult' (IssueSearchResult.sharedAccess)

feat(schema): [non_breaking] Input field 'JiraSettingsInput.statusNamesPerIssueType' description changed from 'The status names per issue type, per project.' to 'Jira status names grouped by project, separated into issue statuses (non-Epic) and project statuses (Epic). Structure: projectId -> { issueStatuses: string[], projectStatuses: string[] }' (JiraSettingsInput.statusNamesPerIssueType)

feat(schema): [non_breaking] Field 'integrationJiraFetchProjectStatuses' was added to object type 'Mutation' (Mutation.integrationJiraFetchProjectStatuses)

feat(schema): [non_breaking] Field 'trackAnonymousEvent' was added to object type 'Mutation' (Mutation.trackAnonymousEvent)

feat(schema): [non_breaking] Field 'syncedWith' was added to object type 'Project' (Project.syncedWith)

feat(schema): [non_breaking] Field 'syncedWith' was added to object type 'ProjectSearchResult' (ProjectSearchResult.syncedWith)

feat(schema): [non_breaking] Field 'diffMarkdown' was added to object type 'ProjectUpdateWebhookPayload' (ProjectUpdateWebhookPayload.diffMarkdown)

feat(schema): [non_breaking] Field 'syncedWith' was added to object type 'ProjectWebhookPayload' (ProjectWebhookPayload.syncedWith)

feat(schema): [non_breaking] Field 'checks' was added to object type 'PullRequest' (PullRequest.checks)

feat(schema): [non_breaking] Field 'creator' was added to object type 'PullRequest' (PullRequest.creator)

feat(schema): [non_breaking] Field 'agentSessionSandbox' was added to object type 'Query' (Query.agentSessionSandbox)

feat(schema): [non_breaking] Input field 'ReleaseCreateInput.stageId' description changed from 'The current stage of the release. Defaults to the first 'started' stage.' to 'The current stage of the release. Defaults to the first 'completed' stage for continuous pipelines, or the first 'started' stage for scheduled pipelines.' (ReleaseCreateInput.stageId)

feat(schema): [non_breaking] Field 'frozen' was added to object type 'ReleaseStage' (ReleaseStage.frozen)

feat(schema): [non_breaking] Field 'closedIssuesOrderedByRecency' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.closedIssuesOrderedByRecency)

feat(schema): [non_breaking] Field 'customViewFieldDateCreated' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customViewFieldDateCreated)

feat(schema): [non_breaking] Field 'customViewFieldDateUpdated' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customViewFieldDateUpdated)

feat(schema): [non_breaking] Field 'customViewFieldOwner' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customViewFieldOwner)

feat(schema): [non_breaking] Field 'customViewFieldVisibility' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customViewFieldVisibility)

feat(schema): [non_breaking] Field 'customViewsOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customViewsOrdering)

feat(schema): [non_breaking] Field 'customerFieldDomains' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerFieldDomains)

feat(schema): [non_breaking] Field 'customerFieldOwner' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerFieldOwner)

feat(schema): [non_breaking] Field 'customerFieldRequestCount' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerFieldRequestCount)

feat(schema): [non_breaking] Field 'customerFieldRevenue' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerFieldRevenue)

feat(schema): [non_breaking] Field 'customerFieldSize' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerFieldSize)

feat(schema): [non_breaking] Field 'customerFieldSource' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerFieldSource)

feat(schema): [non_breaking] Field 'customerFieldStatus' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerFieldStatus)

feat(schema): [non_breaking] Field 'customerFieldTier' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerFieldTier)

feat(schema): [non_breaking] Field 'customerPageNeedsFieldIssueIdentifier' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerPageNeedsFieldIssueIdentifier)

feat(schema): [non_breaking] Field 'customerPageNeedsFieldIssuePriority' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerPageNeedsFieldIssuePriority)

feat(schema): [non_breaking] Field 'customerPageNeedsFieldIssueStatus' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerPageNeedsFieldIssueStatus)

feat(schema): [non_breaking] Field 'customerPageNeedsFieldIssueTargetDueDate' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerPageNeedsFieldIssueTargetDueDate)

feat(schema): [non_breaking] Field 'customerPageNeedsShowCompletedIssuesAndProjects' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerPageNeedsShowCompletedIssuesAndProjects)

feat(schema): [non_breaking] Field 'customerPageNeedsShowImportantFirst' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerPageNeedsShowImportantFirst)

feat(schema): [non_breaking] Field 'customerPageNeedsViewGrouping' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerPageNeedsViewGrouping)

feat(schema): [non_breaking] Field 'customerPageNeedsViewOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customerPageNeedsViewOrdering)

feat(schema): [non_breaking] Field 'customersViewOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.customersViewOrdering)

feat(schema): [non_breaking] Field 'dashboardFieldDateCreated' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.dashboardFieldDateCreated)

feat(schema): [non_breaking] Field 'dashboardFieldDateUpdated' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.dashboardFieldDateUpdated)

feat(schema): [non_breaking] Field 'dashboardFieldOwner' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.dashboardFieldOwner)

feat(schema): [non_breaking] Field 'dashboardsOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.dashboardsOrdering)

feat(schema): [non_breaking] Field 'embeddedCustomerNeedsShowImportantFirst' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.embeddedCustomerNeedsShowImportantFirst)

feat(schema): [non_breaking] Field 'embeddedCustomerNeedsViewOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.embeddedCustomerNeedsViewOrdering)

feat(schema): [non_breaking] Field 'fieldAssignee' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldAssignee)

feat(schema): [non_breaking] Field 'fieldCustomerCount' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldCustomerCount)

feat(schema): [non_breaking] Field 'fieldCustomerRevenue' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldCustomerRevenue)

feat(schema): [non_breaking] Field 'fieldCycle' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldCycle)

feat(schema): [non_breaking] Field 'fieldDateArchived' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldDateArchived)

feat(schema): [non_breaking] Field 'fieldDateCreated' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldDateCreated)

feat(schema): [non_breaking] Field 'fieldDateMyActivity' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldDateMyActivity)

feat(schema): [non_breaking] Field 'fieldDateUpdated' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldDateUpdated)

feat(schema): [non_breaking] Field 'fieldDueDate' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldDueDate)

feat(schema): [non_breaking] Field 'fieldEstimate' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldEstimate)

feat(schema): [non_breaking] Field 'fieldId' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldId)

feat(schema): [non_breaking] Field 'fieldLabels' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldLabels)

feat(schema): [non_breaking] Field 'fieldLinkCount' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldLinkCount)

feat(schema): [non_breaking] Field 'fieldMilestone' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldMilestone)

feat(schema): [non_breaking] Field 'fieldPreviewLinks' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldPreviewLinks)

feat(schema): [non_breaking] Field 'fieldPriority' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldPriority)

feat(schema): [non_breaking] Field 'fieldProject' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldProject)

feat(schema): [non_breaking] Field 'fieldPullRequests' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldPullRequests)

feat(schema): [non_breaking] Field 'fieldRelease' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldRelease)

feat(schema): [non_breaking] Field 'fieldSentryIssues' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldSentryIssues)

feat(schema): [non_breaking] Field 'fieldSla' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldSla)

feat(schema): [non_breaking] Field 'fieldStatus' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldStatus)

feat(schema): [non_breaking] Field 'fieldTimeInCurrentStatus' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.fieldTimeInCurrentStatus)

feat(schema): [non_breaking] Field 'hiddenColumns' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.hiddenColumns)

feat(schema): [non_breaking] Field 'hiddenRows' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.hiddenRows)

feat(schema): [non_breaking] Field 'inboxViewOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.inboxViewOrdering)

feat(schema): [non_breaking] Field 'initiativeFieldActivity' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativeFieldActivity)

feat(schema): [non_breaking] Field 'initiativeFieldDescription' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativeFieldDescription)

feat(schema): [non_breaking] Field 'initiativeFieldHealth' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativeFieldHealth)

feat(schema): [non_breaking] Field 'initiativeFieldInitiativeHealth' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativeFieldInitiativeHealth)

feat(schema): [non_breaking] Field 'initiativeFieldOwner' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativeFieldOwner)

feat(schema): [non_breaking] Field 'initiativeFieldProjects' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativeFieldProjects)

feat(schema): [non_breaking] Field 'initiativeFieldTargetDate' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativeFieldTargetDate)

feat(schema): [non_breaking] Field 'initiativeFieldTeams' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativeFieldTeams)

feat(schema): [non_breaking] Field 'initiativeGrouping' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativeGrouping)

feat(schema): [non_breaking] Field 'initiativesViewOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativesViewOrdering)

feat(schema): [non_breaking] Field 'issueGroupingLabelGroupId' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.issueGroupingLabelGroupId)

feat(schema): [non_breaking] Field 'issueNesting' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.issueNesting)

feat(schema): [non_breaking] Field 'issueSubGroupingLabelGroupId' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.issueSubGroupingLabelGroupId)

feat(schema): [non_breaking] Field 'layout' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.layout)

feat(schema): [non_breaking] Field 'memberFieldJoined' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.memberFieldJoined)

feat(schema): [non_breaking] Field 'memberFieldStatus' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.memberFieldStatus)

feat(schema): [non_breaking] Field 'memberFieldTeams' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.memberFieldTeams)

feat(schema): [non_breaking] Field 'projectCustomerNeedsShowCompletedIssuesLast' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectCustomerNeedsShowCompletedIssuesLast)

feat(schema): [non_breaking] Field 'projectCustomerNeedsShowImportantFirst' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectCustomerNeedsShowImportantFirst)

feat(schema): [non_breaking] Field 'projectCustomerNeedsViewGrouping' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectCustomerNeedsViewGrouping)

feat(schema): [non_breaking] Field 'projectCustomerNeedsViewOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectCustomerNeedsViewOrdering)

feat(schema): [non_breaking] Field 'projectFieldActivity' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldActivity)

feat(schema): [non_breaking] Field 'projectFieldCustomerCount' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldCustomerCount)

feat(schema): [non_breaking] Field 'projectFieldCustomerRevenue' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldCustomerRevenue)

feat(schema): [non_breaking] Field 'projectFieldDateCompleted' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldDateCompleted)

feat(schema): [non_breaking] Field 'projectFieldDateCreated' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldDateCreated)

feat(schema): [non_breaking] Field 'projectFieldDateUpdated' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldDateUpdated)

feat(schema): [non_breaking] Field 'projectFieldDescription' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldDescription)

feat(schema): [non_breaking] Field 'projectFieldDescriptionBoard' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldDescriptionBoard)

feat(schema): [non_breaking] Field 'projectFieldHealth' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldHealth)

feat(schema): [non_breaking] Field 'projectFieldHealthTimeline' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldHealthTimeline)

feat(schema): [non_breaking] Field 'projectFieldInitiatives' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldInitiatives)

feat(schema): [non_breaking] Field 'projectFieldLabels' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldLabels)

feat(schema): [non_breaking] Field 'projectFieldLead' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldLead)

feat(schema): [non_breaking] Field 'projectFieldLeadTimeline' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldLeadTimeline)

feat(schema): [non_breaking] Field 'projectFieldMembers' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldMembers)

feat(schema): [non_breaking] Field 'projectFieldMembersBoard' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldMembersBoard)

feat(schema): [non_breaking] Field 'projectFieldMembersList' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldMembersList)

feat(schema): [non_breaking] Field 'projectFieldMembersTimeline' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldMembersTimeline)

feat(schema): [non_breaking] Field 'projectFieldMilestone' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldMilestone)

feat(schema): [non_breaking] Field 'projectFieldMilestoneTimeline' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldMilestoneTimeline)

feat(schema): [non_breaking] Field 'projectFieldPredictions' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldPredictions)

feat(schema): [non_breaking] Field 'projectFieldPredictionsTimeline' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldPredictionsTimeline)

feat(schema): [non_breaking] Field 'projectFieldPriority' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldPriority)

feat(schema): [non_breaking] Field 'projectFieldRelations' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldRelations)

feat(schema): [non_breaking] Field 'projectFieldRelationsTimeline' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldRelationsTimeline)

feat(schema): [non_breaking] Field 'projectFieldRoadmaps' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldRoadmaps)

feat(schema): [non_breaking] Field 'projectFieldRoadmapsBoard' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldRoadmapsBoard)

feat(schema): [non_breaking] Field 'projectFieldRoadmapsList' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldRoadmapsList)

feat(schema): [non_breaking] Field 'projectFieldRoadmapsTimeline' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldRoadmapsTimeline)

feat(schema): [non_breaking] Field 'projectFieldRolloutStage' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldRolloutStage)

feat(schema): [non_breaking] Field 'projectFieldStartDate' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldStartDate)

feat(schema): [non_breaking] Field 'projectFieldStatus' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldStatus)

feat(schema): [non_breaking] Field 'projectFieldStatusTimeline' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldStatusTimeline)

feat(schema): [non_breaking] Field 'projectFieldTargetDate' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldTargetDate)

feat(schema): [non_breaking] Field 'projectFieldTeams' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldTeams)

feat(schema): [non_breaking] Field 'projectFieldTeamsBoard' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldTeamsBoard)

feat(schema): [non_breaking] Field 'projectFieldTeamsList' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldTeamsList)

feat(schema): [non_breaking] Field 'projectFieldTeamsTimeline' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectFieldTeamsTimeline)

feat(schema): [non_breaking] Field 'projectGroupOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectGroupOrdering)

feat(schema): [non_breaking] Field 'projectGrouping' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectGrouping)

feat(schema): [non_breaking] Field 'projectGroupingDateResolution' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectGroupingDateResolution)

feat(schema): [non_breaking] Field 'projectGroupingLabelGroupId' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectGroupingLabelGroupId)

feat(schema): [non_breaking] Field 'projectLabelGroupColumns' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectLabelGroupColumns)

feat(schema): [non_breaking] Field 'projectLayout' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectLayout)

feat(schema): [non_breaking] Field 'projectShowEmptyGroups' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectShowEmptyGroups)

feat(schema): [non_breaking] Field 'projectShowEmptyGroupsBoard' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectShowEmptyGroupsBoard)

feat(schema): [non_breaking] Field 'projectShowEmptyGroupsList' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectShowEmptyGroupsList)

feat(schema): [non_breaking] Field 'projectShowEmptyGroupsTimeline' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectShowEmptyGroupsTimeline)

feat(schema): [non_breaking] Field 'projectShowEmptySubGroups' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectShowEmptySubGroups)

feat(schema): [non_breaking] Field 'projectShowEmptySubGroupsBoard' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectShowEmptySubGroupsBoard)

feat(schema): [non_breaking] Field 'projectShowEmptySubGroupsList' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectShowEmptySubGroupsList)

feat(schema): [non_breaking] Field 'projectShowEmptySubGroupsTimeline' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectShowEmptySubGroupsTimeline)

feat(schema): [non_breaking] Field 'projectSubGrouping' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectSubGrouping)

feat(schema): [non_breaking] Field 'projectSubGroupingLabelGroupId' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectSubGroupingLabelGroupId)

feat(schema): [non_breaking] Field 'projectViewOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectViewOrdering)

feat(schema): [non_breaking] Field 'projectZoomLevel' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.projectZoomLevel)

feat(schema): [non_breaking] Field 'releasePipelinesViewOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.releasePipelinesViewOrdering)

feat(schema): [non_breaking] Field 'reviewFieldAvatar' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.reviewFieldAvatar)

feat(schema): [non_breaking] Field 'reviewFieldChecks' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.reviewFieldChecks)

feat(schema): [non_breaking] Field 'reviewFieldIdentifier' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.reviewFieldIdentifier)

feat(schema): [non_breaking] Field 'reviewFieldPreviewLinks' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.reviewFieldPreviewLinks)

feat(schema): [non_breaking] Field 'reviewFieldRepository' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.reviewFieldRepository)

feat(schema): [non_breaking] Field 'reviewGrouping' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.reviewGrouping)

feat(schema): [non_breaking] Field 'reviewViewOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.reviewViewOrdering)

feat(schema): [non_breaking] Field 'searchResultType' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.searchResultType)

feat(schema): [non_breaking] Field 'searchViewOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.searchViewOrdering)

feat(schema): [non_breaking] Field 'showArchivedItems' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showArchivedItems)

feat(schema): [non_breaking] Field 'showCompletedAgentSessions' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showCompletedAgentSessions)

feat(schema): [non_breaking] Field 'showCompletedProjects' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showCompletedProjects)

feat(schema): [non_breaking] Field 'showCompletedReviews' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showCompletedReviews)

feat(schema): [non_breaking] Field 'showDraftReviews' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showDraftReviews)

feat(schema): [non_breaking] Field 'showEmptyGroups' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showEmptyGroups)

feat(schema): [non_breaking] Field 'showEmptyGroupsBoard' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showEmptyGroupsBoard)

feat(schema): [non_breaking] Field 'showEmptyGroupsList' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showEmptyGroupsList)

feat(schema): [non_breaking] Field 'showEmptySubGroups' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showEmptySubGroups)

feat(schema): [non_breaking] Field 'showEmptySubGroupsBoard' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showEmptySubGroupsBoard)

feat(schema): [non_breaking] Field 'showEmptySubGroupsList' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showEmptySubGroupsList)

feat(schema): [non_breaking] Field 'showNestedInitiatives' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showNestedInitiatives)

feat(schema): [non_breaking] Field 'showParents' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showParents)

feat(schema): [non_breaking] Field 'showReadItems' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showReadItems)

feat(schema): [non_breaking] Field 'showSnoozedItems' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showSnoozedItems)

feat(schema): [non_breaking] Field 'showSubInitiativeProjects' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showSubInitiativeProjects)

feat(schema): [non_breaking] Field 'showSubIssues' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showSubIssues)

feat(schema): [non_breaking] Field 'showSubTeamIssues' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showSubTeamIssues)

feat(schema): [non_breaking] Field 'showSubTeamProjects' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showSubTeamProjects)

feat(schema): [non_breaking] Field 'showSupervisedIssues' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showSupervisedIssues)

feat(schema): [non_breaking] Field 'showTriageIssues' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showTriageIssues)

feat(schema): [non_breaking] Field 'showUnreadItemsFirst' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.showUnreadItemsFirst)

feat(schema): [non_breaking] Field 'teamFieldCycle' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.teamFieldCycle)

feat(schema): [non_breaking] Field 'teamFieldDateCreated' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.teamFieldDateCreated)

feat(schema): [non_breaking] Field 'teamFieldDateUpdated' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.teamFieldDateUpdated)

feat(schema): [non_breaking] Field 'teamFieldIdentifier' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.teamFieldIdentifier)

feat(schema): [non_breaking] Field 'teamFieldMembers' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.teamFieldMembers)

feat(schema): [non_breaking] Field 'teamFieldMembership' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.teamFieldMembership)

feat(schema): [non_breaking] Field 'teamFieldOwner' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.teamFieldOwner)

feat(schema): [non_breaking] Field 'teamFieldProjects' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.teamFieldProjects)

feat(schema): [non_breaking] Field 'teamViewOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.teamViewOrdering)

feat(schema): [non_breaking] Field 'timelineChronologyShowCycleTeamIds' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.timelineChronologyShowCycleTeamIds)

feat(schema): [non_breaking] Field 'timelineChronologyShowWeekNumbers' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.timelineChronologyShowWeekNumbers)

feat(schema): [non_breaking] Field 'timelineZoomScale' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.timelineZoomScale)

feat(schema): [non_breaking] Field 'triageViewOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.triageViewOrdering)

feat(schema): [non_breaking] Field 'viewOrderingDirection' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.viewOrderingDirection)

feat(schema): [non_breaking] Field 'workspaceMembersViewOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.workspaceMembersViewOrdering)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.issueSubGrouping' description changed from 'The issue sub grouping.' to 'The issue sub-grouping.' (ViewPreferencesValues.issueSubGrouping)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.showCompletedIssues' description changed from 'Whether to show completed issues.' to 'Whether completed issues are shown and for how long.' (ViewPreferencesValues.showCompletedIssues)