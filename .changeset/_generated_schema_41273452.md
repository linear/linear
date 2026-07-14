---
"@linear/sdk": minor
---


feat(schema): [dangerous] Input field 'subscriptionType' was added to input object type 'NotificationFilter' (NotificationFilter.subscriptionType)

feat(schema): [dangerous] Input field 'defaultHomeView' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.defaultHomeView)

feat(schema): [dangerous] Input field 'teamId' was added to input object type 'ProjectLabelCreateInput' (ProjectLabelCreateInput.teamId)

feat(schema): [dangerous] Input field 'allowAgentInPrivateChannels' was added to input object type 'SlackSettingsInput' (SlackSettingsInput.allowAgentInPrivateChannels)

feat(schema): [dangerous] Input field 'syncAgentThreadsInPrivateChannels' was added to input object type 'SlackSettingsInput' (SlackSettingsInput.syncAgentThreadsInPrivateChannels)

feat(schema): [dangerous] Enum value 'agentLoopsPromoShown' was added to enum 'UserFlagType' (UserFlagType.agentLoopsPromoShown)

feat(schema): [non_breaking] Type 'NotificationSubscriptionType' was added (NotificationSubscriptionType)

feat(schema): [non_breaking] Type 'NotificationSubscriptionTypeComparator' was added (NotificationSubscriptionTypeComparator)

feat(schema): [non_breaking] Type 'WorkflowDefinitionNotification' was added (WorkflowDefinitionNotification)

feat(schema): [non_breaking] Field 'AgentSession.url' description changed from 'The URL to the agent session page in the Linear app. Null for direct chat sessions without an associated issue.' to 'The URL to the agent session page in the Linear app. Null when no issue is associated.' (AgentSession.url)

feat(schema): [non_breaking] Input field 'AgentSessionCreateInput.context' description changed from '[Internal] Serialized JSON representing the page contexts this session is related to. Used for direct chat sessions to provide context about the current page (e.g., Issue, Project).' to '[Internal] No longer supported.' (AgentSessionCreateInput.context)

feat(schema): [non_breaking] Field 'lastUsedAt' was added to object type 'EmailIntakeAddress' (EmailIntakeAddress.lastUsedAt)

feat(schema): [non_breaking] Field 'Initiative.labelIds' description changed from '[Internal] The IDs of the initiative labels associated with this initiative.' to 'The IDs of the initiative labels associated with this initiative.' (Initiative.labelIds)

feat(schema): [non_breaking] Field 'Initiative.labels' description changed from '[Internal] Labels associated with this initiative.' to 'Labels associated with this initiative.' (Initiative.labels)

feat(schema): [non_breaking] Field 'Initiative.priority' description changed from '[Internal] The priority of the initiative. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' to 'The priority of the initiative. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (Initiative.priority)

feat(schema): [non_breaking] Field 'Initiative.prioritySortOrder' description changed from '[Internal] The sort order of the initiative within the workspace when ordered by priority.' to 'The sort order of the initiative within the workspace when ordered by priority.' (Initiative.prioritySortOrder)

feat(schema): [non_breaking] Input field 'InitiativeCollectionFilter.labels' description changed from '[Internal] Filters that the initiative labels must satisfy.' to 'Filters that the initiative labels must satisfy.' (InitiativeCollectionFilter.labels)

feat(schema): [non_breaking] Input field 'InitiativeCollectionFilter.priority' description changed from '[Internal] Comparator for the initiative priority.' to 'Comparator for the initiative priority.' (InitiativeCollectionFilter.priority)

feat(schema): [non_breaking] Input field 'InitiativeCreateInput.labelIds' description changed from '[Internal] The identifiers of the initiative labels associated with this initiative.' to 'The identifiers of the initiative labels associated with this initiative.' (InitiativeCreateInput.labelIds)

feat(schema): [non_breaking] Input field 'InitiativeCreateInput.priority' description changed from '[Internal] The priority of the initiative. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' to 'The priority of the initiative. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (InitiativeCreateInput.priority)

feat(schema): [non_breaking] Input field 'InitiativeCreateInput.prioritySortOrder' description changed from '[Internal] The sort order of the initiative within the workspace, when ordered by priority.' to 'The sort order of the initiative within the workspace, when ordered by priority.' (InitiativeCreateInput.prioritySortOrder)

feat(schema): [non_breaking] Input field 'InitiativeFilter.labels' description changed from '[Internal] Filters that the initiative labels must satisfy.' to 'Filters that the initiative labels must satisfy.' (InitiativeFilter.labels)

feat(schema): [non_breaking] Input field 'InitiativeFilter.priority' description changed from '[Internal] Comparator for the initiative priority.' to 'Comparator for the initiative priority.' (InitiativeFilter.priority)

feat(schema): [non_breaking] Input field 'InitiativeUpdateInput.labelIds' description changed from '[Internal] The identifiers of the initiative labels associated with this initiative.' to 'The identifiers of the initiative labels associated with this initiative.' (InitiativeUpdateInput.labelIds)

feat(schema): [non_breaking] Input field 'InitiativeUpdateInput.priority' description changed from '[Internal] The priority of the initiative. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' to 'The priority of the initiative. 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low.' (InitiativeUpdateInput.priority)

feat(schema): [non_breaking] Input field 'InitiativeUpdateInput.prioritySortOrder' description changed from '[Internal] The sort order of the initiative within the workspace, when ordered by priority.' to 'The sort order of the initiative within the workspace, when ordered by priority.' (InitiativeUpdateInput.prioritySortOrder)

feat(schema): [non_breaking] Field 'labelIds' was added to object type 'InitiativeWebhookPayload' (InitiativeWebhookPayload.labelIds)

feat(schema): [non_breaking] Field 'priority' was added to object type 'InitiativeWebhookPayload' (InitiativeWebhookPayload.priority)

feat(schema): [non_breaking] Field 'Mutation.initiativeAddLabel' description changed from '[Internal]Adds a label to an initiative.' to 'Adds a label to an initiative.' (Mutation.initiativeAddLabel)

feat(schema): [non_breaking] Field 'Mutation.initiativeRemoveLabel' description changed from '[Internal]Removes a label from an initiative.' to 'Removes a label from an initiative.' (Mutation.initiativeRemoveLabel)

feat(schema): [non_breaking] Input field 'NullableInitiativeFilter.labels' description changed from '[Internal] Filters that the initiative labels must satisfy.' to 'Filters that the initiative labels must satisfy.' (NullableInitiativeFilter.labels)

feat(schema): [non_breaking] Input field 'NullableInitiativeFilter.priority' description changed from '[Internal] Comparator for the initiative priority.' to 'Comparator for the initiative priority.' (NullableInitiativeFilter.priority)

feat(schema): [non_breaking] Field 'defaultHomeView' was added to object type 'Organization' (Organization.defaultHomeView)

feat(schema): [non_breaking] Field 'inheritedFrom' was added to object type 'ProjectLabel' (ProjectLabel.inheritedFrom)

feat(schema): [non_breaking] Field 'team' was added to object type 'ProjectLabel' (ProjectLabel.team)

feat(schema): [non_breaking] Description 'Input for creating a new project label. A name is required. The label is created as a workspace-level label available to all projects.' on type 'ProjectLabelCreateInput' has changed to 'Input for creating a new project label. A name is required. If no team is specified, the label is created as a workspace-level label available to all teams.' (ProjectLabelCreateInput)

feat(schema): [non_breaking] Field 'reactionData' was added to object type 'PullRequest' (PullRequest.reactionData)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.initiativeFieldLabels' description changed from '[Internal] Whether to show the initiative labels field.' to 'Whether to show the initiative labels field.' (ViewPreferencesValues.initiativeFieldLabels)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.initiativeFieldPriority' description changed from '[Internal] Whether to show the initiative priority field.' to 'Whether to show the initiative priority field.' (ViewPreferencesValues.initiativeFieldPriority)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.initiativeGroupingLabelGroupId' description changed from '[Internal] The label group ID used for initiative grouping.' to 'The label group ID used for initiative grouping.' (ViewPreferencesValues.initiativeGroupingLabelGroupId)

feat(schema): [non_breaking] Field 'ViewPreferencesValues.initiativeLabelGroupColumns' description changed from '[Internal] The initiative label group columns configuration.' to 'The initiative label group columns configuration.' (ViewPreferencesValues.initiativeLabelGroupColumns)

feat(schema): [non_breaking] Field 'owner' was added to object type 'WorkflowDefinition' (WorkflowDefinition.owner)