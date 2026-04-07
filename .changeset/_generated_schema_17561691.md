---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'issueSharingPolicy' was removed from input object type 'TeamCreateInput' (TeamCreateInput.issueSharingPolicy)

feat(schema): [breaking] Input field 'issueSharingPolicy' was removed from input object type 'TeamUpdateInput' (TeamUpdateInput.issueSharingPolicy)

feat(schema): [dangerous] Enum value 'NavigateToPage' was added to enum 'AiConversationTool' (AiConversationTool.NavigateToPage)

feat(schema): [dangerous] Member 'AiConversationNavigateToPageToolCall' was added to Union type 'AiConversationToolCall' (AiConversationToolCall)

feat(schema): [dangerous] Input field 'releaseIds' was added to input object type 'IssueCreateInput' (IssueCreateInput.releaseIds)

feat(schema): [dangerous] Input field 'addedReleaseIds' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.addedReleaseIds)

feat(schema): [dangerous] Input field 'removedReleaseIds' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.removedReleaseIds)

feat(schema): [dangerous] Input field 'customOAuthServerUrl' was added to input object type 'JiraSettingsInput' (JiraSettingsInput.customOAuthServerUrl)

feat(schema): [dangerous] Input field 'isCustomOAuth' was added to input object type 'JiraSettingsInput' (JiraSettingsInput.isCustomOAuth)

feat(schema): [dangerous] Input field 'personalOAuthClientId' was added to input object type 'JiraSettingsInput' (JiraSettingsInput.personalOAuthClientId)

feat(schema): [dangerous] Input field 'retiredAt' was added to input object type 'NullableTeamFilter' (NullableTeamFilter.retiredAt)

feat(schema): [dangerous] Input field 'slackAutoCreateProjectChannel' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.slackAutoCreateProjectChannel)

feat(schema): [dangerous] Input field 'slackProjectChannelsEnabled' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.slackProjectChannelsEnabled)

feat(schema): [dangerous] Argument 'sort: [ReleasePipelineSortInput!]' added to field 'Query.releasePipelines' (Query.releasePipelines.sort)

feat(schema): [dangerous] Argument 'filter: ReleaseFilter' added to field 'Query.releaseSearch' (Query.releaseSearch.filter)

feat(schema): [dangerous] Input field 'completedAt' was added to input object type 'ReleaseCollectionFilter' (ReleaseCollectionFilter.completedAt)

feat(schema): [dangerous] Input field 'completedAt' was added to input object type 'ReleaseFilter' (ReleaseFilter.completedAt)

feat(schema): [dangerous] Input field 'isProduction' was added to input object type 'ReleasePipelineCreateInput' (ReleasePipelineCreateInput.isProduction)

feat(schema): [dangerous] Input field 'isProduction' was added to input object type 'ReleasePipelineFilter' (ReleasePipelineFilter.isProduction)

feat(schema): [dangerous] Input field 'isProduction' was added to input object type 'ReleasePipelineUpdateInput' (ReleasePipelineUpdateInput.isProduction)

feat(schema): [dangerous] Input field 'inheritSlackAutoCreateProjectChannel' was added to input object type 'TeamCreateInput' (TeamCreateInput.inheritSlackAutoCreateProjectChannel)

feat(schema): [dangerous] Input field 'issueSharingEnabled' was added to input object type 'TeamCreateInput' (TeamCreateInput.issueSharingEnabled)

feat(schema): [dangerous] Input field 'slackAutoCreateProjectChannel' was added to input object type 'TeamCreateInput' (TeamCreateInput.slackAutoCreateProjectChannel)

feat(schema): [dangerous] Input field 'retiredAt' was added to input object type 'TeamFilter' (TeamFilter.retiredAt)

feat(schema): [dangerous] Input field 'issueSharing' was added to input object type 'TeamSecuritySettingsInput' (TeamSecuritySettingsInput.issueSharing)

feat(schema): [dangerous] Input field 'inheritSlackAutoCreateProjectChannel' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.inheritSlackAutoCreateProjectChannel)

feat(schema): [dangerous] Input field 'issueSharingEnabled' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.issueSharingEnabled)

feat(schema): [dangerous] Input field 'slackAutoCreateProjectChannel' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.slackAutoCreateProjectChannel)

feat(schema): [dangerous] Input field 'title' was added to input object type 'UserUpdateInput' (UserUpdateInput.title)

feat(schema): [dangerous] Enum value 'release' was added to enum 'WorkflowType' (WorkflowType.release)

feat(schema): [non_breaking] Type 'AiConversationNavigateToPageToolCall' was added (AiConversationNavigateToPageToolCall)

feat(schema): [non_breaking] Type 'AiConversationNavigateToPageToolCallArgs' was added (AiConversationNavigateToPageToolCallArgs)

feat(schema): [non_breaking] Type 'AiConversationNavigateToPageToolCallResult' was added (AiConversationNavigateToPageToolCallResult)

feat(schema): [non_breaking] Type 'ReleaseHistory' was added (ReleaseHistory)

feat(schema): [non_breaking] Type 'ReleaseHistoryConnection' was added (ReleaseHistoryConnection)

feat(schema): [non_breaking] Type 'ReleaseHistoryEdge' was added (ReleaseHistoryEdge)

feat(schema): [non_breaking] Type 'ReleasePipelineNameSort' was added (ReleasePipelineNameSort)

feat(schema): [non_breaking] Type 'ReleasePipelineSortInput' was added (ReleasePipelineSortInput)

feat(schema): [non_breaking] Field 'aiPromptProgresses' was added to object type 'Issue' (Issue.aiPromptProgresses)

feat(schema): [non_breaking] Field 'releases' was added to object type 'Issue' (Issue.releases)

feat(schema): [non_breaking] Field 'aiPromptProgresses' was added to object type 'IssueSearchResult' (IssueSearchResult.aiPromptProgresses)

feat(schema): [non_breaking] Field 'releases' was added to object type 'IssueSearchResult' (IssueSearchResult.releases)

feat(schema): [non_breaking] Field 'releasesEnabled' was added to object type 'Organization' (Organization.releasesEnabled)

feat(schema): [non_breaking] Field 'slackAutoCreateProjectChannel' was added to object type 'Organization' (Organization.slackAutoCreateProjectChannel)

feat(schema): [non_breaking] Field 'slackProjectChannelsEnabled' was added to object type 'Organization' (Organization.slackProjectChannelsEnabled)

feat(schema): [non_breaking] Field 'Query.releaseSearch' description changed from '[ALPHA] Search releases by term with ranked results.' to '[ALPHA] Search releases with optional text matching and filter-based scoping.' (Query.releaseSearch)

feat(schema): [non_breaking] Description for argument 'term' on field 'Query.releaseSearch' changed from 'Search term to match against release name, version, and pipeline name.' to 'Search term to match against release name, version, and pipeline name. When omitted, returns releases ordered by stage priority.' (Query.releaseSearch.term)

feat(schema): [non_breaking] Type for argument 'term' on field 'Query.releaseSearch' changed from 'String!' to 'String' (Query.releaseSearch.term)

feat(schema): [non_breaking] Field 'creator' was added to object type 'Release' (Release.creator)

feat(schema): [non_breaking] Field 'history' was added to object type 'Release' (Release.history)

feat(schema): [non_breaking] Field 'isProduction' was added to object type 'ReleasePipeline' (ReleasePipeline.isProduction)

feat(schema): [non_breaking] Field 'creatorId' was added to object type 'ReleaseWebhookPayload' (ReleaseWebhookPayload.creatorId)

feat(schema): [non_breaking] Field 'ancestors' was added to object type 'Team' (Team.ancestors)

feat(schema): [non_breaking] Field 'inheritSlackAutoCreateProjectChannel' was added to object type 'Team' (Team.inheritSlackAutoCreateProjectChannel)

feat(schema): [non_breaking] Field 'slackAutoCreateProjectChannel' was added to object type 'Team' (Team.slackAutoCreateProjectChannel)

feat(schema): [non_breaking] Field 'Team.autoArchivePeriod' description changed from 'Period after which automatically closed and completed issues are automatically archived in months.' to 'Period after which automatically closed, completed, and duplicate issues are automatically archived in months.' (Team.autoArchivePeriod)

feat(schema): [non_breaking] Input field 'TeamCreateInput.autoArchivePeriod' description changed from 'Period after which closed and completed issues are automatically archived, in months. 0 means disabled.' to 'Period after which closed (completed, canceled, or duplicate) issues are automatically archived, in months. 0 means disabled.' (TeamCreateInput.autoArchivePeriod)

feat(schema): [non_breaking] Input field 'TeamUpdateInput.autoArchivePeriod' description changed from 'Period after which closed and completed issues are automatically archived, in months.' to 'Period after which closed (completed, canceled, or duplicate) issues are automatically archived, in months.' (TeamUpdateInput.autoArchivePeriod)

feat(schema): [non_breaking] Field 'title' was added to object type 'User' (User.title)