---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'Mutation.projectDelete' changed type from 'DeletePayload!' to 'ProjectArchivePayload!' (Mutation.projectDelete)

feat(schema): [dangerous] Input field 'slackAsks' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.slackAsks)

feat(schema): [dangerous] Input field 'foreignEntityId' was added to input object type 'IntegrationTemplateCreateInput' (IntegrationTemplateCreateInput.foreignEntityId)

feat(schema): [dangerous] Argument 'trash: Boolean' added to field 'Mutation.projectArchive' (Mutation.projectArchive.trash)

feat(schema): [dangerous] Input field 'metadata' was added to input object type 'OrganizationInviteCreateInput' (OrganizationInviteCreateInput.metadata)

feat(schema): [dangerous] Argument 'teamId: String' added to field 'Query.searchDocuments' (Query.searchDocuments.teamId)

feat(schema): [dangerous] Argument 'teamId: String' added to field 'Query.searchIssues' (Query.searchIssues.teamId)

feat(schema): [dangerous] Argument 'teamId: String' added to field 'Query.searchProjects' (Query.searchProjects.teamId)

feat(schema): [non_breaking] Type 'SlackAsksSettings' was added (SlackAsksSettings)

feat(schema): [non_breaking] Type 'SlackAsksSettingsInput' was added (SlackAsksSettingsInput)

feat(schema): [non_breaking] Type 'SlackChannelNameMapping' was added (SlackChannelNameMapping)

feat(schema): [non_breaking] Type 'SlackChannelNameMappingInput' was added (SlackChannelNameMappingInput)

feat(schema): [non_breaking] Field 'CustomView.owner' description changed from '[ALPHA] The user who owns the custom view.' to 'The user who owns the custom view.' (CustomView.owner)

feat(schema): [non_breaking] Field 'CustomView.owner' changed type from 'User' to 'User!' (CustomView.owner)

feat(schema): [non_breaking] Field 'slackAsks' was added to object type 'IntegrationSettings' (IntegrationSettings.slackAsks)

feat(schema): [non_breaking] Field 'foreignEntityId' was added to object type 'IntegrationTemplate' (IntegrationTemplate.foreignEntityId)

feat(schema): [non_breaking] Field 'integrationAsksConnectChannel' was added to object type 'Mutation' (Mutation.integrationAsksConnectChannel)

feat(schema): [non_breaking] Field 'Mutation.projectDelete' description changed from 'Deletes a project. All issues will be disassociated from the deleted project.' to 'Deletes (trashes) a project.' (Mutation.projectDelete)

feat(schema): [non_breaking] Description for argument 'id' on field 'Mutation.projectDelete' changed from 'The identifier of the project to delete. Also the identifier from the URL is accepted.' to 'The identifier of the project to delete.' (Mutation.projectDelete.id)

feat(schema): [non_breaking] Field 'metadata' was added to object type 'OrganizationInvite' (OrganizationInvite.metadata)

feat(schema): [non_breaking] Field 'trashed' was added to object type 'Project' (Project.trashed)

feat(schema): [non_breaking] Field 'trashed' was added to object type 'ProjectSearchResult' (ProjectSearchResult.trashed)