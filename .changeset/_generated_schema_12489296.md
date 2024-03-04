---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'PagerDutyScheduleInfo' was removed (PagerDutyScheduleInfo)

feat(schema): [breaking] Type 'PagerDutyScheduleInfoInput' was removed (PagerDutyScheduleInfoInput)

feat(schema): [breaking] Input field 'apiFailedWithUnauthorizedErrorAt' was added to input object type 'PagerDutyInput' (PagerDutyInput.apiFailedWithUnauthorizedErrorAt)

feat(schema): [breaking] Input field 'scheduleMapping' was removed from input object type 'PagerDutyInput' (PagerDutyInput.scheduleMapping)

feat(schema): [breaking] Field 'scheduleMapping' was removed from object type 'PagerDutySettings' (PagerDutySettings.scheduleMapping)

feat(schema): [breaking] Field 'issueSortOrderDefaultToBottom' was removed from object type 'Team' (Team.issueSortOrderDefaultToBottom)

feat(schema): [breaking] Input field 'issueSortOrderDefaultToBottom' was removed from input object type 'TeamCreateInput' (TeamCreateInput.issueSortOrderDefaultToBottom)

feat(schema): [breaking] Input field 'issueSortOrderDefaultToBottom' was removed from input object type 'TeamUpdateInput' (TeamUpdateInput.issueSortOrderDefaultToBottom)

feat(schema): [dangerous] Input field 'AssigneeSort.order' default value changed from 'Ascending' to 'undefined' (AssigneeSort.order)

feat(schema): [dangerous] Input field 'CompletedAtSort.order' default value changed from 'Ascending' to 'undefined' (CompletedAtSort.order)

feat(schema): [dangerous] Input field 'CreatedAtSort.order' default value changed from 'Ascending' to 'undefined' (CreatedAtSort.order)

feat(schema): [dangerous] Input field 'CycleSort.order' default value changed from 'Descending' to 'undefined' (CycleSort.order)

feat(schema): [dangerous] Input field 'DueDateSort.order' default value changed from 'Ascending' to 'undefined' (DueDateSort.order)

feat(schema): [dangerous] Input field 'EstimateSort.order' default value changed from 'Ascending' to 'undefined' (EstimateSort.order)

feat(schema): [dangerous] Enum value 'opsgenie' was added to enum 'IntegrationService' (IntegrationService.opsgenie)

feat(schema): [dangerous] Input field 'opsgenie' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.opsgenie)

feat(schema): [dangerous] Input field 'LabelSort.order' default value changed from 'Ascending' to 'undefined' (LabelSort.order)

feat(schema): [dangerous] Input field 'ManualSort.order' default value changed from 'Ascending' to 'undefined' (ManualSort.order)

feat(schema): [dangerous] Input field 'MilestoneSort.order' default value changed from 'Ascending' to 'undefined' (MilestoneSort.order)

feat(schema): [dangerous] Input field 'PrioritySort.order' default value changed from 'Descending' to 'undefined' (PrioritySort.order)

feat(schema): [dangerous] Input field 'ProjectSort.order' default value changed from 'Ascending' to 'undefined' (ProjectSort.order)

feat(schema): [dangerous] Argument 'projectId: String' added to field 'Query.issueFilterSuggestion' (Query.issueFilterSuggestion.projectId)

feat(schema): [dangerous] Input field 'SlaStatusSort.order' default value changed from 'Ascending' to 'undefined' (SlaStatusSort.order)

feat(schema): [dangerous] Input field 'TeamSort.order' default value changed from 'Ascending' to 'undefined' (TeamSort.order)

feat(schema): [dangerous] Input field 'TitleSort.order' default value changed from 'Ascending' to 'undefined' (TitleSort.order)

feat(schema): [dangerous] Input field 'UpdatedAtSort.order' default value changed from 'Ascending' to 'undefined' (UpdatedAtSort.order)

feat(schema): [dangerous] Input field 'WorkflowStateSort.order' default value changed from 'Ascending' to 'undefined' (WorkflowStateSort.order)

feat(schema): [non_breaking] Type 'OpsgenieInput' was added (OpsgenieInput)

feat(schema): [non_breaking] Type 'OpsgenieSettings' was added (OpsgenieSettings)

feat(schema): [non_breaking] Field 'opsgenie' was added to object type 'IntegrationSettings' (IntegrationSettings.opsgenie)

feat(schema): [non_breaking] Field 'integrationOpsgenieConnect' was added to object type 'Mutation' (Mutation.integrationOpsgenieConnect)

feat(schema): [non_breaking] Field 'integrationOpsgenieRefreshScheduleMappings' was added to object type 'Mutation' (Mutation.integrationOpsgenieRefreshScheduleMappings)

feat(schema): [non_breaking] Field 'apiFailedWithUnauthorizedErrorAt' was added to object type 'PagerDutySettings' (PagerDutySettings.apiFailedWithUnauthorizedErrorAt)