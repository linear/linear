---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'WorkspaceAuthorizedApplication' was removed (WorkspaceAuthorizedApplication)

feat(schema): [breaking] Type 'WorkspaceAuthorizedApplicationWithAppUser' was removed (WorkspaceAuthorizedApplicationWithAppUser)

feat(schema): [breaking] Field 'applicationInfoByIds' was removed from object type 'Query' (Query.applicationInfoByIds)

feat(schema): [breaking] Field 'applicationInfoWithMembershipsByIds' (deprecated) was removed from object type 'Query' (Query.applicationInfoWithMembershipsByIds)

feat(schema): [breaking] Field 'authorizedApplications' was removed from object type 'Query' (Query.authorizedApplications)

feat(schema): [breaking] Field 'workspaceAuthorizedApplications' (deprecated) was removed from object type 'Query' (Query.workspaceAuthorizedApplications)

feat(schema): [breaking] Field 'workspaceAuthorizedApplicationsWithAppUser' was removed from object type 'Query' (Query.workspaceAuthorizedApplicationsWithAppUser)

feat(schema): [dangerous] Input field 'signalMetadata' was added to input object type 'AgentActivityCreateInput' (AgentActivityCreateInput.signalMetadata)

feat(schema): [dangerous] Input field 'signalMetadata' was added to input object type 'AgentActivityCreatePromptInput' (AgentActivityCreatePromptInput.signalMetadata)

feat(schema): [dangerous] Enum value 'auth' was added to enum 'AgentActivitySignal' (AgentActivitySignal.auth)

feat(schema): [dangerous] Input field 'issueCreatedAutoReplyEnabled' was added to input object type 'EmailIntakeAddressCreateInput' (EmailIntakeAddressCreateInput.issueCreatedAutoReplyEnabled)

feat(schema): [dangerous] Input field 'issueCreatedAutoReplyEnabled' was added to input object type 'EmailIntakeAddressUpdateInput' (EmailIntakeAddressUpdateInput.issueCreatedAutoReplyEnabled)

feat(schema): [dangerous] Argument 'userEmail: String' added to field 'Mutation.issueSubscribe' (Mutation.issueSubscribe.userEmail)

feat(schema): [dangerous] Argument 'userEmail: String' added to field 'Mutation.issueUnsubscribe' (Mutation.issueUnsubscribe.userEmail)

feat(schema): [dangerous] Input field 'salesforceMetadata' was added to input object type 'SourceMetadataComparator' (SourceMetadataComparator.salesforceMetadata)

feat(schema): [non_breaking] Type 'FileUploadDeletePayload' was added (FileUploadDeletePayload)

feat(schema): [non_breaking] Type 'SalesforceMetadataIntegrationComparator' was added (SalesforceMetadataIntegrationComparator)

feat(schema): [non_breaking] Field 'signalMetadata' was added to object type 'AgentActivity' (AgentActivity.signalMetadata)

feat(schema): [non_breaking] Field 'signalMetadata' was added to object type 'AgentActivityWebhookPayload' (AgentActivityWebhookPayload.signalMetadata)

feat(schema): [non_breaking] Field 'issueCreatedAutoReplyEnabled' was added to object type 'EmailIntakeAddress' (EmailIntakeAddress.issueCreatedAutoReplyEnabled)

feat(schema): [non_breaking] Field 'dismissalReason' was added to object type 'IssueSuggestion' (IssueSuggestion.dismissalReason)

feat(schema): [non_breaking] Field 'fileUploadDangerouslyDelete' was added to object type 'Mutation' (Mutation.fileUploadDangerouslyDelete)

feat(schema): [non_breaking] Field 'userUnlinkFromIdentityProvider' was added to object type 'Mutation' (Mutation.userUnlinkFromIdentityProvider)

feat(schema): [non_breaking] Field 'hipaaComplianceEnabled' was added to object type 'Organization' (Organization.hipaaComplianceEnabled)

feat(schema): [non_breaking] Input field 'SourceMetadataComparator.subType' description changed from 'Compound filters, all of which need to be matched by the sub type.' to 'Comparator for the sub type.' (SourceMetadataComparator.subType)