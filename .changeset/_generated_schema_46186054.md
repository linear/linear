---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'Comment.documentContent' changed type from 'DocumentContent!' to 'DocumentContent' (Comment.documentContent)

feat(schema): [breaking] Argument 'projectPathWithNamespace: String!' added to field 'Mutation.attachmentLinkGitLabMR' (Mutation.attachmentLinkGitLabMR.projectPathWithNamespace)

feat(schema): [breaking] Argument 'owner: String!' was removed from field 'Mutation.attachmentLinkGitLabMR' (Mutation.attachmentLinkGitLabMR.owner)

feat(schema): [breaking] Argument 'repo: String!' was removed from field 'Mutation.attachmentLinkGitLabMR' (Mutation.attachmentLinkGitLabMR.repo)

feat(schema): [dangerous] Enum value 'githubPersonal' was added to enum 'IntegrationService' (IntegrationService.githubPersonal)

feat(schema): [dangerous] Input field 'jiraPersonal' was added to input object type 'IntegrationSettingsInput' (IntegrationSettingsInput.jiraPersonal)

feat(schema): [dangerous] Input field 'canAdministrate' was added to input object type 'SlackAsksSettingsInput' (SlackAsksSettingsInput.canAdministrate)

feat(schema): [dangerous] Input field 'botAdded' was added to input object type 'SlackChannelNameMappingInput' (SlackChannelNameMappingInput.botAdded)

feat(schema): [non_breaking] Type 'JiraPersonalSettings' was added (JiraPersonalSettings)

feat(schema): [non_breaking] Type 'JiraPersonalSettingsInput' was added (JiraPersonalSettingsInput)

feat(schema): [non_breaking] Input field 'AttachmentCreateInput.commentBodyData' description changed from 'Create a linked comment with Prosemirror body. Please use `commentBody` instead' to '[Internal] Create a linked comment with Prosemirror body. Please use `commentBody` instead.' (AttachmentCreateInput.commentBodyData)

feat(schema): [non_breaking] Field 'browserType' was added to object type 'AuthenticationSession' (AuthenticationSession.browserType)

feat(schema): [non_breaking] Field 'browserType' was added to object type 'AuthenticationSessionResponse' (AuthenticationSessionResponse.browserType)

feat(schema): [non_breaking] Field 'Comment.bodyData' description changed from 'The comment content as a Prosemirror document.' to '[Internal] The comment content as a Prosemirror document.' (Comment.bodyData)

feat(schema): [non_breaking] Input field 'CommentCreateInput.bodyData' description changed from 'The comment content as a Prosemirror document.' to '[Internal] The comment content as a Prosemirror document.' (CommentCreateInput.bodyData)

feat(schema): [non_breaking] Field 'modelName' was added to object type 'CustomView' (CustomView.modelName)

feat(schema): [non_breaking] Field 'DocumentContent.contentData' description changed from 'The document content as JSON.' to '[Internal] The document content as a Prosemirror document.' (DocumentContent.contentData)

feat(schema): [non_breaking] Field 'DocumentContentHistory.contentData' description changed from 'The document content as JSON.' to '[Internal] The document content as a Prosemirror document.' (DocumentContentHistory.contentData)

feat(schema): [non_breaking] Field 'DocumentContentHistoryType.contentData' description changed from 'The document content as Prosemirror document.' to '[Internal] The document content as Prosemirror document.' (DocumentContentHistoryType.contentData)

feat(schema): [non_breaking] Field 'jiraPersonal' was added to object type 'IntegrationSettings' (IntegrationSettings.jiraPersonal)

feat(schema): [non_breaking] Input field 'IssueCreateInput.descriptionData' description changed from 'The issue description as a Prosemirror document.' to '[Internal] The issue description as a Prosemirror document.' (IssueCreateInput.descriptionData)

feat(schema): [non_breaking] Field 'integrationGitHubPersonal' was added to object type 'Mutation' (Mutation.integrationGitHubPersonal)

feat(schema): [non_breaking] Field 'Mutation.userGitHubConnect' description changed from 'Connects the GitHub user to this Linear account via OAuth2.' to '[DEPRECATED] Connects the GitHub user to this Linear account via OAuth2.' (Mutation.userGitHubConnect)

feat(schema): [non_breaking] Field 'Mutation.userGitHubConnect' is deprecated (Mutation.userGitHubConnect)

feat(schema): [non_breaking] Field 'Mutation.userGitHubConnect' has deprecation reason 'Replaced by integrationGitHubPersonal mutation on Integration resolver.' (Mutation.userGitHubConnect)

feat(schema): [non_breaking] Input field 'ProjectMilestoneCreateInput.descriptionData' description changed from 'The description of the project milestone as a Prosemirror document.' to '[Internal] The description of the project milestone as a Prosemirror document.' (ProjectMilestoneCreateInput.descriptionData)

feat(schema): [non_breaking] Input field 'ProjectMilestoneUpdateInput.descriptionData' description changed from 'The description of the project milestone as a Prosemirror document.' to '[Internal] The description of the project milestone as a Prosemirror document.' (ProjectMilestoneUpdateInput.descriptionData)

feat(schema): [non_breaking] Input field 'ProjectUpdateCreateInput.bodyData' description changed from 'The content of the project update as a Prosemirror document.' to '[Internal] The content of the project update as a Prosemirror document.' (ProjectUpdateCreateInput.bodyData)

feat(schema): [non_breaking] Field 'canAdministrate' was added to object type 'SlackAsksSettings' (SlackAsksSettings.canAdministrate)

feat(schema): [non_breaking] Field 'botAdded' was added to object type 'SlackChannelNameMapping' (SlackChannelNameMapping.botAdded)