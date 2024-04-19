---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'CommentCollectionFilter.issue' changed type from 'IssueFilter' to 'NullableIssueFilter' (CommentCollectionFilter.issue)

feat(schema): [breaking] Input field 'CommentFilter.issue' changed type from 'IssueFilter' to 'NullableIssueFilter' (CommentFilter.issue)

feat(schema): [breaking] Input field 'CustomViewCreateInput.filterData' changed type from 'JSONObject' to 'IssueFilter' (CustomViewCreateInput.filterData)

feat(schema): [breaking] Input field 'CustomViewCreateInput.projectFilterData' changed type from 'JSONObject' to 'ProjectFilter' (CustomViewCreateInput.projectFilterData)

feat(schema): [breaking] Input field 'CustomViewUpdateInput.filterData' changed type from 'JSONObject' to 'IssueFilter' (CustomViewUpdateInput.filterData)

feat(schema): [breaking] Input field 'CustomViewUpdateInput.projectFilterData' changed type from 'JSONObject' to 'ProjectFilter' (CustomViewUpdateInput.projectFilterData)

feat(schema): [breaking] Field 'Document.project' changed type from 'Project!' to 'Project' (Document.project)

feat(schema): [breaking] Field 'DocumentSearchResult.project' changed type from 'Project!' to 'Project' (DocumentSearchResult.project)

feat(schema): [dangerous] Input field 'parent' was added to input object type 'CommentCollectionFilter' (CommentCollectionFilter.parent)

feat(schema): [dangerous] Input field 'parent' was added to input object type 'CommentFilter' (CommentFilter.parent)

feat(schema): [dangerous] Input field 'initiativeId' was added to input object type 'DocumentCreateInput' (DocumentCreateInput.initiativeId)

feat(schema): [dangerous] Input field 'initiativeId' was added to input object type 'DocumentUpdateInput' (DocumentUpdateInput.initiativeId)

feat(schema): [dangerous] Input field 'loginCodeOnly' was added to input object type 'EmailUserAccountAuthChallengeInput' (EmailUserAccountAuthChallengeInput.loginCodeOnly)

feat(schema): [dangerous] Argument 'syncToCommentThread: Boolean' added to field 'Mutation.attachmentLinkSlack' (Mutation.attachmentLinkSlack.syncToCommentThread)

feat(schema): [dangerous] Argument 'replaceTeamLabels: Boolean' added to field 'Mutation.issueLabelUpdate' (Mutation.issueLabelUpdate.replaceTeamLabels)

feat(schema): [dangerous] Input field 'postCancellationUpdates' was added to input object type 'SlackChannelNameMappingInput' (SlackChannelNameMappingInput.postCancellationUpdates)

feat(schema): [dangerous] Enum value 'editorSlashCommandUsed' was added to enum 'UserFlagType' (UserFlagType.editorSlashCommandUsed)

feat(schema): [dangerous] Enum value 'emptyParagraphSlashCommandTip' was added to enum 'UserFlagType' (UserFlagType.emptyParagraphSlashCommandTip)

feat(schema): [dangerous] Enum value 'myViews' was added to enum 'ViewType' (ViewType.myViews)

feat(schema): [non_breaking] Type 'AuthOrganizationExistsPayload' was added (AuthOrganizationExistsPayload)

feat(schema): [non_breaking] Type 'AuthOrganizationPayload' was added (AuthOrganizationPayload)

feat(schema): [non_breaking] Type 'AuthOrganizationUpdateInput' was added (AuthOrganizationUpdateInput)

feat(schema): [non_breaking] Type 'DocumentNotification' was added (DocumentNotification)

feat(schema): [non_breaking] Type 'EntityExternalLink' was added (EntityExternalLink)

feat(schema): [non_breaking] Type 'EntityExternalLinkConnection' was added (EntityExternalLinkConnection)

feat(schema): [non_breaking] Type 'EntityExternalLinkCreateInput' was added (EntityExternalLinkCreateInput)

feat(schema): [non_breaking] Type 'EntityExternalLinkEdge' was added (EntityExternalLinkEdge)

feat(schema): [non_breaking] Type 'EntityExternalLinkPayload' was added (EntityExternalLinkPayload)

feat(schema): [non_breaking] Type 'EntityExternalLinkUpdateInput' was added (EntityExternalLinkUpdateInput)

feat(schema): [non_breaking] Type 'NullableCommentFilter' was added (NullableCommentFilter)

feat(schema): [non_breaking] Type 'ProjectRelation' was added (ProjectRelation)

feat(schema): [non_breaking] Type 'ProjectRelationConnection' was added (ProjectRelationConnection)

feat(schema): [non_breaking] Type 'ProjectRelationCreateInput' was added (ProjectRelationCreateInput)

feat(schema): [non_breaking] Type 'ProjectRelationEdge' was added (ProjectRelationEdge)

feat(schema): [non_breaking] Type 'ProjectRelationPayload' was added (ProjectRelationPayload)

feat(schema): [non_breaking] Type 'ProjectRelationUpdateInput' was added (ProjectRelationUpdateInput)

feat(schema): [non_breaking] Type 'ViewPreferencesValues' was added (ViewPreferencesValues)

feat(schema): [non_breaking] Field 'locationRegionCode' was added to object type 'AuthenticationSession' (AuthenticationSession.locationRegionCode)

feat(schema): [non_breaking] Field 'locationRegionCode' was added to object type 'AuthenticationSessionResponse' (AuthenticationSessionResponse.locationRegionCode)

feat(schema): [non_breaking] Field 'organizationViewPreferences' was added to object type 'CustomView' (CustomView.organizationViewPreferences)

feat(schema): [non_breaking] Field 'userViewPreferences' was added to object type 'CustomView' (CustomView.userViewPreferences)

feat(schema): [non_breaking] Field 'viewPreferencesValues' was added to object type 'CustomView' (CustomView.viewPreferencesValues)

feat(schema): [non_breaking] Field 'initiative' was added to object type 'Document' (Document.initiative)

feat(schema): [non_breaking] Field 'url' was added to object type 'Document' (Document.url)

feat(schema): [non_breaking] Field 'Document.sortOrder' description changed from 'The order of the item in the project resources list.' to 'The order of the item in the resources list.' (Document.sortOrder)

feat(schema): [non_breaking] Description 'A document for a project.' on type 'Document' has changed to 'A document that can be attached to different entities.' (Document)

feat(schema): [non_breaking] Field 'initiative' was added to object type 'DocumentContent' (DocumentContent.initiative)

feat(schema): [non_breaking] Input field 'DocumentCreateInput.projectId' changed type from 'String!' to 'String' (DocumentCreateInput.projectId)

feat(schema): [non_breaking] Input field 'DocumentCreateInput.sortOrder' description changed from 'The order of the item in the project resources list.' to 'The order of the item in the resources list.' (DocumentCreateInput.sortOrder)

feat(schema): [non_breaking] Field 'initiative' was added to object type 'DocumentSearchResult' (DocumentSearchResult.initiative)

feat(schema): [non_breaking] Field 'url' was added to object type 'DocumentSearchResult' (DocumentSearchResult.url)

feat(schema): [non_breaking] Field 'DocumentSearchResult.sortOrder' description changed from 'The order of the item in the project resources list.' to 'The order of the item in the resources list.' (DocumentSearchResult.sortOrder)

feat(schema): [non_breaking] Input field 'DocumentUpdateInput.sortOrder' description changed from 'The order of the item in the project resources list.' to 'The order of the item in the resources list.' (DocumentUpdateInput.sortOrder)

feat(schema): [non_breaking] Field 'links' was added to object type 'Initiative' (Initiative.links)

feat(schema): [non_breaking] Field 'Initiative.description' description changed from 'The description of the initiative.' to '[Internal] The description of the initiative.' (Initiative.description)

feat(schema): [non_breaking] Input field 'InitiativeCreateInput.description' description changed from 'The description of the initiative.' to '[Internal] The description of the initiative.' (InitiativeCreateInput.description)

feat(schema): [non_breaking] Input field 'InitiativeUpdateInput.description' description changed from 'The description of the initiative.' to '[Internal] The description of the initiative.' (InitiativeUpdateInput.description)

feat(schema): [non_breaking] Field 'Issue.slaBreachesAt' description changed from '[Internal] The time at which the issue's SLA will breach.' to 'The time at which the issue's SLA will breach.' (Issue.slaBreachesAt)

feat(schema): [non_breaking] Field 'Issue.slaStartedAt' description changed from '[Internal] The time at which the issue's SLA began.' to 'The time at which the issue's SLA began.' (Issue.slaStartedAt)

feat(schema): [non_breaking] Field 'triageResponsibilityNotifiedUsers' was added to object type 'IssueHistory' (IssueHistory.triageResponsibilityNotifiedUsers)

feat(schema): [non_breaking] Field 'IssueSearchResult.slaBreachesAt' description changed from '[Internal] The time at which the issue's SLA will breach.' to 'The time at which the issue's SLA will breach.' (IssueSearchResult.slaBreachesAt)

feat(schema): [non_breaking] Field 'IssueSearchResult.slaStartedAt' description changed from '[Internal] The time at which the issue's SLA began.' to 'The time at which the issue's SLA began.' (IssueSearchResult.slaStartedAt)

feat(schema): [non_breaking] Field 'entityExternalLinkCreate' was added to object type 'Mutation' (Mutation.entityExternalLinkCreate)

feat(schema): [non_breaking] Field 'entityExternalLinkDelete' was added to object type 'Mutation' (Mutation.entityExternalLinkDelete)

feat(schema): [non_breaking] Field 'entityExternalLinkUpdate' was added to object type 'Mutation' (Mutation.entityExternalLinkUpdate)

feat(schema): [non_breaking] Field 'projectRelationCreate' was added to object type 'Mutation' (Mutation.projectRelationCreate)

feat(schema): [non_breaking] Field 'projectRelationDelete' was added to object type 'Mutation' (Mutation.projectRelationDelete)

feat(schema): [non_breaking] Field 'projectRelationUpdate' was added to object type 'Mutation' (Mutation.projectRelationUpdate)

feat(schema): [non_breaking] Description for argument 'replaceTeamLabels' on field 'Mutation.issueLabelCreate' changed from 'Whether to replace all team-specific labels with the same name with this newly created workspace label.' to 'Whether to replace all team-specific labels with the same name with this newly created workspace label (default: false).' (Mutation.issueLabelCreate.replaceTeamLabels)

feat(schema): [non_breaking] Field 'scope' was added to object type 'OauthToken' (OauthToken.scope)

feat(schema): [non_breaking] Field 'projectStatuses' was added to object type 'Organization' (Organization.projectStatuses)

feat(schema): [non_breaking] Description '[ALPHA] A project status.' on type 'ProjectStatus' has changed to 'A project status.' (ProjectStatus)

feat(schema): [non_breaking] Field 'comments' was added to object type 'ProjectUpdate' (ProjectUpdate.comments)

feat(schema): [non_breaking] Field 'reactionData' was added to object type 'ProjectUpdate' (ProjectUpdate.reactionData)

feat(schema): [non_breaking] Field 'entityExternalLink' was added to object type 'Query' (Query.entityExternalLink)

feat(schema): [non_breaking] Field 'projectRelation' was added to object type 'Query' (Query.projectRelation)

feat(schema): [non_breaking] Field 'projectRelations' was added to object type 'Query' (Query.projectRelations)

feat(schema): [non_breaking] Field 'url' was added to object type 'Roadmap' (Roadmap.url)

feat(schema): [non_breaking] Field 'postCancellationUpdates' was added to object type 'SlackChannelNameMapping' (SlackChannelNameMapping.postCancellationUpdates)

feat(schema): [non_breaking] Field 'SlackChannelNameMapping.botAdded' description changed from 'Whether or not we the Linear Asks bot has been added to this Slack channel.' to 'Whether or not the Linear Asks bot has been added to this Slack channel.' (SlackChannelNameMapping.botAdded)

feat(schema): [non_breaking] Input field 'SlackChannelNameMappingInput.botAdded' description changed from 'Whether or not we the Linear Asks bot has been added to this Slack channel.' to 'Whether or not the Linear Asks bot has been added to this Slack channel.' (SlackChannelNameMappingInput.botAdded)

feat(schema): [non_breaking] Field 'scimManaged' was added to object type 'Team' (Team.scimManaged)

feat(schema): [non_breaking] Field 'preferences' was added to object type 'ViewPreferences' (ViewPreferences.preferences)