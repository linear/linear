---
"@linear/sdk": minor
---


feat(schema): [dangerous] Argument 'sort: [ProjectSortInput!]' added to field 'CustomView.projects' (CustomView.projects.sort)

feat(schema): [dangerous] Argument 'sort: [ProjectSortInput!]' added to field 'Initiative.projects' (Initiative.projects.sort)

feat(schema): [dangerous] Input field 'restrictAgentInvocationToMembers' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.restrictAgentInvocationToMembers)

feat(schema): [dangerous] Argument 'filter: CustomViewFilter' added to field 'Query.customViews' (Query.customViews.filter)

feat(schema): [dangerous] Argument 'sort: [ProjectSortInput!]' added to field 'Query.projects' (Query.projects.sort)

feat(schema): [dangerous] Input field 'restrictVisibility' was added to input object type 'SalesforceSettingsInput' (SalesforceSettingsInput.restrictVisibility)

feat(schema): [dangerous] Argument 'sort: [ProjectSortInput!]' added to field 'Team.projects' (Team.projects.sort)

feat(schema): [non_breaking] Type 'AgentActivity' was added (AgentActivity)

feat(schema): [non_breaking] Type 'AgentActivityActionContent' was added (AgentActivityActionContent)

feat(schema): [non_breaking] Type 'AgentActivityConnection' was added (AgentActivityConnection)

feat(schema): [non_breaking] Type 'AgentActivityContent' was added (AgentActivityContent)

feat(schema): [non_breaking] Type 'AgentActivityCreateInput' was added (AgentActivityCreateInput)

feat(schema): [non_breaking] Type 'AgentActivityEdge' was added (AgentActivityEdge)

feat(schema): [non_breaking] Type 'AgentActivityErrorContent' was added (AgentActivityErrorContent)

feat(schema): [non_breaking] Type 'AgentActivityObservationContent' was added (AgentActivityObservationContent)

feat(schema): [non_breaking] Type 'AgentActivityPayload' was added (AgentActivityPayload)

feat(schema): [non_breaking] Type 'AgentActivityResponseContent' was added (AgentActivityResponseContent)

feat(schema): [non_breaking] Type 'AgentActivityType' was added (AgentActivityType)

feat(schema): [non_breaking] Type 'AgentContext' was added (AgentContext)

feat(schema): [non_breaking] Type 'AgentContextConnection' was added (AgentContextConnection)

feat(schema): [non_breaking] Type 'AgentContextCreateInput' was added (AgentContextCreateInput)

feat(schema): [non_breaking] Type 'AgentContextEdge' was added (AgentContextEdge)

feat(schema): [non_breaking] Type 'AgentContextPayload' was added (AgentContextPayload)

feat(schema): [non_breaking] Type 'AgentContextStatus' was added (AgentContextStatus)

feat(schema): [non_breaking] Type 'AgentContextType' was added (AgentContextType)

feat(schema): [non_breaking] Type 'AgentContextUpdateInput' was added (AgentContextUpdateInput)

feat(schema): [non_breaking] Type 'CustomViewFilter' was added (CustomViewFilter)

feat(schema): [non_breaking] Type 'ProjectManualSort' was added (ProjectManualSort)

feat(schema): [non_breaking] Type 'ProjectNameSort' was added (ProjectNameSort)

feat(schema): [non_breaking] Type 'ProjectPrioritySort' was added (ProjectPrioritySort)

feat(schema): [non_breaking] Type 'ProjectSortInput' was added (ProjectSortInput)

feat(schema): [non_breaking] Type 'ProjectStatusSort' was added (ProjectStatusSort)

feat(schema): [non_breaking] Type 'StartDateSort' was added (StartDateSort)

feat(schema): [non_breaking] Type 'TargetDateSort' was added (TargetDateSort)

feat(schema): [non_breaking] Type 'WorkspaceAuthorizedApplicationWithAppUser' was added (WorkspaceAuthorizedApplicationWithAppUser)

feat(schema): [non_breaking] Field 'facet' was added to object type 'CustomView' (CustomView.facet)

feat(schema): [non_breaking] Field 'supervisor' was added to object type 'Issue' (Issue.supervisor)

feat(schema): [non_breaking] Field 'supervisor' was added to object type 'IssueSearchResult' (IssueSearchResult.supervisor)

feat(schema): [non_breaking] Field 'agentActivityCreate' was added to object type 'Mutation' (Mutation.agentActivityCreate)

feat(schema): [non_breaking] Field 'agentContextCreate' was added to object type 'Mutation' (Mutation.agentContextCreate)

feat(schema): [non_breaking] Field 'agentContextUpdate' was added to object type 'Mutation' (Mutation.agentContextUpdate)

feat(schema): [non_breaking] Field 'agentActivities' was added to object type 'Query' (Query.agentActivities)

feat(schema): [non_breaking] Field 'agentActivity' was added to object type 'Query' (Query.agentActivity)

feat(schema): [non_breaking] Field 'agentContext' was added to object type 'Query' (Query.agentContext)

feat(schema): [non_breaking] Field 'agentContexts' was added to object type 'Query' (Query.agentContexts)

feat(schema): [non_breaking] Field 'workspaceAuthorizedApplicationsWithAppUser' was added to object type 'Query' (Query.workspaceAuthorizedApplicationsWithAppUser)

feat(schema): [non_breaking] Field 'Query.applicationInfoWithMembershipsByIds' description changed from '[INTERNAL] Get information for a list of applications with memberships' to '[DEPRECATED] [INTERNAL] Get information for a list of applications with memberships' (Query.applicationInfoWithMembershipsByIds)

feat(schema): [non_breaking] Field 'Query.applicationInfoWithMembershipsByIds' is deprecated (Query.applicationInfoWithMembershipsByIds)

feat(schema): [non_breaking] Field 'Query.applicationInfoWithMembershipsByIds' has deprecation reason 'Use more efficient `workspaceAuthorizedApplicationsWithAppUser` and `workspaceAuthorizedApplication` instead.' (Query.applicationInfoWithMembershipsByIds)

feat(schema): [non_breaking] Field 'Query.workspaceAuthorizedApplications' description changed from '[INTERNAL] Get non-internal authorized applications (with limited fields) for a workspace' to '[DEPRECATED] [INTERNAL] Get non-internal authorized applications (with limited fields) for a workspace' (Query.workspaceAuthorizedApplications)

feat(schema): [non_breaking] Field 'Query.workspaceAuthorizedApplications' is deprecated (Query.workspaceAuthorizedApplications)

feat(schema): [non_breaking] Field 'Query.workspaceAuthorizedApplications' has deprecation reason 'Use more efficient `workspaceAuthorizedApplicationsWithAppUser` and `workspaceAuthorizedApplication` instead.' (Query.workspaceAuthorizedApplications)

feat(schema): [non_breaking] Field 'supervisedIssues' was added to object type 'User' (User.supervisedIssues)