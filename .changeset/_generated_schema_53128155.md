---
"@linear/sdk": patch
---


feat(schema): [non_breaking] Input field 'AgentSessionCreateInput.issueId' description changed from 'The issue that this session will be associated with.' to 'The issue that this session will be associated with. Can be a UUID or issue identifier (e.g., 'LIN-123').' (AgentSessionCreateInput.issueId)

feat(schema): [non_breaking] Input field 'AgentSessionCreateOnIssue.issueId' description changed from 'The issue that this session will be associated with.' to 'The issue that this session will be associated with. Can be a UUID or issue identifier (e.g., 'LIN-123').' (AgentSessionCreateOnIssue.issueId)

feat(schema): [non_breaking] Input field 'AttachmentCreateInput.issueId' description changed from 'The issue to associate the attachment with.' to 'The issue to associate the attachment with. Can be a UUID or issue identifier (e.g., 'LIN-123').' (AttachmentCreateInput.issueId)

feat(schema): [non_breaking] Input field 'CommentCreateInput.issueId' description changed from 'The issue to associate the comment with.' to 'The issue to associate the comment with. Can be a UUID or issue identifier (e.g., 'LIN-123').' (CommentCreateInput.issueId)

feat(schema): [non_breaking] Input field 'CustomerNeedCreateInput.issueId' description changed from 'The issue this need is referencing.' to 'The issue this need is referencing. Can be a UUID or issue identifier (e.g., 'LIN-123').' (CustomerNeedCreateInput.issueId)

feat(schema): [non_breaking] Input field 'CustomerNeedUpdateInput.issueId' description changed from 'The issue this need is referencing.' to 'The issue this need is referencing. Can be a UUID or issue identifier (e.g., 'LIN-123').' (CustomerNeedUpdateInput.issueId)

feat(schema): [non_breaking] Input field 'DocumentCreateInput.issueId' description changed from '[Internal] Related issue for the document.' to 'Related issue for the document. Can be a UUID or issue identifier (e.g., 'LIN-123').' (DocumentCreateInput.issueId)

feat(schema): [non_breaking] Input field 'DocumentUpdateInput.issueId' description changed from '[Internal] Related issue for the document.' to 'Related issue for the document. Can be a UUID or issue identifier (e.g., 'LIN-123').' (DocumentUpdateInput.issueId)

feat(schema): [non_breaking] Field 'issueCanceledAutoReplyData' was added to object type 'EmailIntakeAddress' (EmailIntakeAddress.issueCanceledAutoReplyData)

feat(schema): [non_breaking] Field 'issueCompletedAutoReplyData' was added to object type 'EmailIntakeAddress' (EmailIntakeAddress.issueCompletedAutoReplyData)

feat(schema): [non_breaking] Field 'issueCreatedAutoReplyData' was added to object type 'EmailIntakeAddress' (EmailIntakeAddress.issueCreatedAutoReplyData)

feat(schema): [non_breaking] Input field 'FavoriteCreateInput.issueId' description changed from 'The identifier of the issue to favorite.' to 'The identifier of the issue to favorite. Can be a UUID or issue identifier (e.g., 'LIN-123').' (FavoriteCreateInput.issueId)

feat(schema): [non_breaking] Input field 'IssueCreateInput.parentId' description changed from 'The identifier of the parent issue.' to 'The identifier of the parent issue. Can be a UUID or issue identifier (e.g., 'LIN-123').' (IssueCreateInput.parentId)

feat(schema): [non_breaking] Input field 'IssueRelationCreateInput.issueId' description changed from 'The identifier of the issue that is related to another issue.' to 'The identifier of the issue that is related to another issue. Can be a UUID or issue identifier (e.g., 'LIN-123').' (IssueRelationCreateInput.issueId)

feat(schema): [non_breaking] Input field 'IssueRelationCreateInput.relatedIssueId' description changed from 'The identifier of the related issue.' to 'The identifier of the related issue. Can be a UUID or issue identifier (e.g., 'LIN-123').' (IssueRelationCreateInput.relatedIssueId)

feat(schema): [non_breaking] Input field 'IssueRelationUpdateInput.issueId' description changed from 'The identifier of the issue that is related to another issue.' to 'The identifier of the issue that is related to another issue. Can be a UUID or issue identifier (e.g., 'LIN-123').' (IssueRelationUpdateInput.issueId)

feat(schema): [non_breaking] Input field 'IssueRelationUpdateInput.relatedIssueId' description changed from 'The identifier of the related issue.' to 'The identifier of the related issue. Can be a UUID or issue identifier (e.g., 'LIN-123').' (IssueRelationUpdateInput.relatedIssueId)

feat(schema): [non_breaking] Input field 'IssueToReleaseCreateInput.issueId' description changed from 'The identifier of the issue' to 'The identifier of the issue. Can be a UUID or issue identifier (e.g., 'LIN-123').' (IssueToReleaseCreateInput.issueId)

feat(schema): [non_breaking] Input field 'IssueUpdateInput.parentId' description changed from 'The identifier of the parent issue.' to 'The identifier of the parent issue. Can be a UUID or issue identifier (e.g., 'LIN-123').' (IssueUpdateInput.parentId)

feat(schema): [non_breaking] Description for argument 'issueId' on field 'Mutation.attachmentLinkDiscord' changed from 'The issue for which to link the Discord message.' to 'The issue for which to link the Discord message. Can be a UUID or issue identifier (e.g., 'LIN-123').' (Mutation.attachmentLinkDiscord.issueId)

feat(schema): [non_breaking] Description for argument 'issueId' on field 'Mutation.attachmentLinkFront' changed from 'The issue for which to link the Front conversation.' to 'The issue for which to link the Front conversation. Can be a UUID or issue identifier (e.g., 'LIN-123').' (Mutation.attachmentLinkFront.issueId)

feat(schema): [non_breaking] Description for argument 'issueId' on field 'Mutation.attachmentLinkGitHubIssue' changed from 'The Linear issue for which to link the GitHub issue.' to 'The Linear issue for which to link the GitHub issue. Can be a UUID or issue identifier (e.g., 'LIN-123').' (Mutation.attachmentLinkGitHubIssue.issueId)

feat(schema): [non_breaking] Description for argument 'issueId' on field 'Mutation.attachmentLinkGitHubPR' changed from 'The issue for which to link the GitHub pull request.' to 'The issue for which to link the GitHub pull request. Can be a UUID or issue identifier (e.g., 'LIN-123').' (Mutation.attachmentLinkGitHubPR.issueId)

feat(schema): [non_breaking] Description for argument 'issueId' on field 'Mutation.attachmentLinkGitLabMR' changed from 'The issue for which to link the GitLab merge request.' to 'The issue for which to link the GitLab merge request. Can be a UUID or issue identifier (e.g., 'LIN-123').' (Mutation.attachmentLinkGitLabMR.issueId)

feat(schema): [non_breaking] Description for argument 'issueId' on field 'Mutation.attachmentLinkIntercom' changed from 'The issue for which to link the Intercom conversation.' to 'The issue for which to link the Intercom conversation. Can be a UUID or issue identifier (e.g., 'LIN-123').' (Mutation.attachmentLinkIntercom.issueId)

feat(schema): [non_breaking] Description for argument 'issueId' on field 'Mutation.attachmentLinkJiraIssue' changed from 'The issue for which to link the Jira issue.' to 'The issue for which to link the Jira issue. Can be a UUID or issue identifier (e.g., 'LIN-123').' (Mutation.attachmentLinkJiraIssue.issueId)

feat(schema): [non_breaking] Description for argument 'issueId' on field 'Mutation.attachmentLinkSalesforce' changed from 'The issue for which to link the Salesforce case.' to 'The issue for which to link the Salesforce case. Can be a UUID or issue identifier (e.g., 'LIN-123').' (Mutation.attachmentLinkSalesforce.issueId)

feat(schema): [non_breaking] Description for argument 'issueId' on field 'Mutation.attachmentLinkSlack' changed from 'The issue to which to link the Slack message.' to 'The issue to which to link the Slack message. Can be a UUID or issue identifier (e.g., 'LIN-123').' (Mutation.attachmentLinkSlack.issueId)

feat(schema): [non_breaking] Description for argument 'issueId' on field 'Mutation.attachmentLinkURL' changed from 'The issue for which to link the url.' to 'The issue for which to link the url. Can be a UUID or issue identifier (e.g., 'LIN-123').' (Mutation.attachmentLinkURL.issueId)

feat(schema): [non_breaking] Description for argument 'issueId' on field 'Mutation.attachmentLinkZendesk' changed from 'The issue for which to link the Zendesk ticket.' to 'The issue for which to link the Zendesk ticket. Can be a UUID or issue identifier (e.g., 'LIN-123').' (Mutation.attachmentLinkZendesk.issueId)

feat(schema): [non_breaking] Description for argument 'issueId' on field 'Mutation.issueToReleaseDeleteByIssueAndRelease' changed from 'The identifier of the issue' to 'The identifier of the issue. Can be a UUID or issue identifier (e.g., 'LIN-123').' (Mutation.issueToReleaseDeleteByIssueAndRelease.issueId)

feat(schema): [non_breaking] Field 'initiativeToProjects' was added to object type 'Project' (Project.initiativeToProjects)

feat(schema): [non_breaking] Field 'initiativeToProjects' was added to object type 'ProjectSearchResult' (ProjectSearchResult.initiativeToProjects)

feat(schema): [non_breaking] Input field 'ReactionCreateInput.issueId' description changed from 'The issue to associate the reaction with.' to 'The issue to associate the reaction with. Can be a UUID or issue identifier (e.g., 'LIN-123').' (ReactionCreateInput.issueId)