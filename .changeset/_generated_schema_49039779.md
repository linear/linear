---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'TriageResponsibilitySchedule' was removed (TriageResponsibilitySchedule)

feat(schema): [breaking] Type 'TriageResponsibilityScheduleEntry' was removed (TriageResponsibilityScheduleEntry)

feat(schema): [breaking] Field 'error' was removed from object type 'TimeSchedule' (TimeSchedule.error)

feat(schema): [breaking] Input field 'error' was removed from input object type 'TimeScheduleCreateInput' (TimeScheduleCreateInput.error)

feat(schema): [breaking] Input field 'integrationId' was removed from input object type 'TimeScheduleCreateInput' (TimeScheduleCreateInput.integrationId)

feat(schema): [breaking] Input field 'TimeScheduleCreateInput.entries' changed type from '[TimeScheduleEntryInput!]' to '[TimeScheduleEntryInput!]!' (TimeScheduleCreateInput.entries)

feat(schema): [breaking] Input field 'error' was removed from input object type 'TimeScheduleUpdateInput' (TimeScheduleUpdateInput.error)

feat(schema): [breaking] Field 'integration' was removed from object type 'TriageResponsibility' (TriageResponsibility.integration)

feat(schema): [breaking] Field 'schedule' was removed from object type 'TriageResponsibility' (TriageResponsibility.schedule)

feat(schema): [breaking] Field 'TriageResponsibility.manualSelection' changed type from 'JSONObject' to 'TriageResponsibilityManualSelection' (TriageResponsibility.manualSelection)

feat(schema): [breaking] Field 'TriageResponsibility.timeSchedule' changed type from 'TimeSchedule!' to 'TimeSchedule' (TriageResponsibility.timeSchedule)

feat(schema): [breaking] 'TriageResponsibilityManualSelection' kind changed from 'InputObjectTypeDefinition' to 'ObjectTypeDefinition' (TriageResponsibilityManualSelection)

feat(schema): [dangerous] Argument 'sort: [IssueSortInput!]' added to field 'Query.issues' (Query.issues.sort)

feat(schema): [non_breaking] Type 'AssigneeSort' was added (AssigneeSort)

feat(schema): [non_breaking] Type 'CompletedAtSort' was added (CompletedAtSort)

feat(schema): [non_breaking] Type 'CreatedAtSort' was added (CreatedAtSort)

feat(schema): [non_breaking] Type 'CycleSort' was added (CycleSort)

feat(schema): [non_breaking] Type 'DueDateSort' was added (DueDateSort)

feat(schema): [non_breaking] Type 'EstimateSort' was added (EstimateSort)

feat(schema): [non_breaking] Type 'IssueSortInput' was added (IssueSortInput)

feat(schema): [non_breaking] Type 'LabelSort' was added (LabelSort)

feat(schema): [non_breaking] Type 'ManualSort' was added (ManualSort)

feat(schema): [non_breaking] Type 'MilestoneSort' was added (MilestoneSort)

feat(schema): [non_breaking] Type 'PaginationNulls' was added (PaginationNulls)

feat(schema): [non_breaking] Type 'PrioritySort' was added (PrioritySort)

feat(schema): [non_breaking] Type 'ProjectSort' was added (ProjectSort)

feat(schema): [non_breaking] Type 'SlaStatusSort' was added (SlaStatusSort)

feat(schema): [non_breaking] Type 'TeamSort' was added (TeamSort)

feat(schema): [non_breaking] Type 'TitleSort' was added (TitleSort)

feat(schema): [non_breaking] Type 'TriageResponsibilityCreateInput' was added (TriageResponsibilityCreateInput)

feat(schema): [non_breaking] Type 'TriageResponsibilityManualSelectionInput' was added (TriageResponsibilityManualSelectionInput)

feat(schema): [non_breaking] Type 'TriageResponsibilityPayload' was added (TriageResponsibilityPayload)

feat(schema): [non_breaking] Type 'TriageResponsibilityUpdateInput' was added (TriageResponsibilityUpdateInput)

feat(schema): [non_breaking] Type 'UpdatedAtSort' was added (UpdatedAtSort)

feat(schema): [non_breaking] Type 'WorkflowStateSort' was added (WorkflowStateSort)

feat(schema): [non_breaking] Field 'expiresAt' was added to object type 'AuthOrganizationInvite' (AuthOrganizationInvite.expiresAt)

feat(schema): [non_breaking] Field 'timeScheduleUpsertExternal' was added to object type 'Mutation' (Mutation.timeScheduleUpsertExternal)

feat(schema): [non_breaking] Field 'triageResponsibilityCreate' was added to object type 'Mutation' (Mutation.triageResponsibilityCreate)

feat(schema): [non_breaking] Field 'triageResponsibilityDelete' was added to object type 'Mutation' (Mutation.triageResponsibilityDelete)

feat(schema): [non_breaking] Field 'triageResponsibilityUpdate' was added to object type 'Mutation' (Mutation.triageResponsibilityUpdate)

feat(schema): [non_breaking] Field 'triageResponsibilities' was added to object type 'Query' (Query.triageResponsibilities)

feat(schema): [non_breaking] Field 'triageResponsibility' was added to object type 'Query' (Query.triageResponsibility)

feat(schema): [non_breaking] Field 'triageResponsibility' was added to object type 'Team' (Team.triageResponsibility)

feat(schema): [non_breaking] Input field 'TimeScheduleCreateInput.externalId' description changed from 'The identifier of the external schedule.' to 'The unique identifier of the external schedule.' (TimeScheduleCreateInput.externalId)

feat(schema): [non_breaking] Input field 'TimeScheduleUpdateInput.externalId' description changed from 'The identifier of the external schedule.' to 'The unique identifier of the external schedule.' (TimeScheduleUpdateInput.externalId)

feat(schema): [non_breaking] Field 'currentUser' was added to object type 'TriageResponsibility' (TriageResponsibility.currentUser)

feat(schema): [non_breaking] Description 'Manual triage responsibility using a set of users.' was removed from object type 'TriageResponsibilityManualSelection' (TriageResponsibilityManualSelection)