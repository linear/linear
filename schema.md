# Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

- [Query](#query)
- [Mutation](#mutation)
- [Objects](#objects)
  - [ApiKey](#apikey)
  - [ApiKeyPayload](#apikeypayload)
  - [ArchivePayload](#archivepayload)
  - [BackendEntity](#backendentity)
  - [ClientEntity](#cliententity)
  - [Comment](#comment)
  - [CommentPayload](#commentpayload)
  - [GitHubCommitPayload](#githubcommitpayload)
  - [GitHubPullRequestPayload](#githubpullrequestpayload)
  - [ImageUploadPayload](#imageuploadpayload)
  - [Integration](#integration)
  - [IntegrationPayload](#integrationpayload)
  - [IntegrationResource](#integrationresource)
  - [IntegrationResourceData](#integrationresourcedata)
  - [IntegrationSettings](#integrationsettings)
  - [Issue](#issue)
  - [IssueLabel](#issuelabel)
  - [IssueLabelPayload](#issuelabelpayload)
  - [IssuePayload](#issuepayload)
  - [Notification](#notification)
  - [NotificationPayload](#notificationpayload)
  - [Organization](#organization)
  - [OrganizationPayload](#organizationpayload)
  - [Project](#project)
  - [ProjectPayload](#projectpayload)
  - [ProjectState](#projectstate)
  - [ProjectStatePayload](#projectstatepayload)
  - [PushSubscription](#pushsubscription)
  - [PushSubscriptionPayload](#pushsubscriptionpayload)
  - [SlackPostSettings](#slackpostsettings)
  - [SyncResponse](#syncresponse)
  - [UploadFile](#uploadfile)
  - [User](#user)
  - [UserAccount](#useraccount)
  - [UserGoogleAuthPayload](#usergoogleauthpayload)
  - [UserPayload](#userpayload)
  - [UserSettings](#usersettings)
  - [UserSettingsPayload](#usersettingspayload)
- [Inputs](#inputs)
  - [ApiKeyCreateInput](#apikeycreateinput)
  - [CommentCreateInput](#commentcreateinput)
  - [CommentUpdateInput](#commentupdateinput)
  - [CreateOrganizationInput](#createorganizationinput)
  - [CreateUserInput](#createuserinput)
  - [IssueCreateInput](#issuecreateinput)
  - [IssueLabelCreateInput](#issuelabelcreateinput)
  - [IssueUpdateInput](#issueupdateinput)
  - [NotificationUpdateInput](#notificationupdateinput)
  - [ProjectCreateInput](#projectcreateinput)
  - [ProjectStateCreateInput](#projectstatecreateinput)
  - [ProjectStateUpdateInput](#projectstateupdateinput)
  - [ProjectUpdateInput](#projectupdateinput)
  - [PushSubscriptionCreateInput](#pushsubscriptioncreateinput)
  - [UpdateOrganizationInput](#updateorganizationinput)
  - [UpdateUserInput](#updateuserinput)
  - [UserSettingsUpdateInput](#usersettingsupdateinput)
- [Scalars](#scalars)
  - [Boolean](#boolean)
  - [DateTime](#datetime)
  - [Email](#email)
  - [Float](#float)
  - [String](#string)
  - [UUID](#uuid)

</details>

## Query

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>syncBootstrap</strong></td>
<td valign="top"><a href="#syncresponse">SyncResponse</a>!</td>
<td>

Fetches all data for the user.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">databaseVersion</td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sinceId</td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>syncUpdates</strong></td>
<td valign="top"><a href="#syncresponse">SyncResponse</a>!</td>
<td>

Fetches all data for the user.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sinceId</td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>apiKeys</strong></td>
<td valign="top">[<a href="#apikey">ApiKey</a>!]!</td>
<td>

Fetches all api keys.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>comments</strong></td>
<td valign="top">[<a href="#comment">Comment</a>!]!</td>
<td>

Fetches all comments.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>comment</strong></td>
<td valign="top"><a href="#comment">Comment</a>!</td>
<td>

Fetches a specific comment.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>integrations</strong></td>
<td valign="top">[<a href="#integration">Integration</a>!]!</td>
<td>

Fetches all integrations.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>integration</strong></td>
<td valign="top"><a href="#integration">Integration</a>!</td>
<td>

Fetches a specific integration.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>integrationResources</strong></td>
<td valign="top">[<a href="#integrationresource">IntegrationResource</a>!]!</td>
<td>

Fetches all integrations resources (e.g. linked GitHub pull requests for issues).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>integrationResource</strong></td>
<td valign="top"><a href="#integrationresource">IntegrationResource</a>!</td>
<td>

Fetches a specific integration resource (e.g. linked GitHub pull requests for an issue).

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issueLabels</strong></td>
<td valign="top">[<a href="#issuelabel">IssueLabel</a>!]!</td>
<td>

Fetches all issue labels.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issueLabel</strong></td>
<td valign="top"><a href="#issuelabel">IssueLabel</a>!</td>
<td>

Fetches a specific issue label.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issues</strong></td>
<td valign="top">[<a href="#issue">Issue</a>!]!</td>
<td>

Fetches all issues.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issue</strong></td>
<td valign="top"><a href="#issue">Issue</a>!</td>
<td>

Fetches a specific issue.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notifications</strong></td>
<td valign="top">[<a href="#notification">Notification</a>!]!</td>
<td>

Fetches all notifications.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notification</strong></td>
<td valign="top"><a href="#usersettings">UserSettings</a>!</td>
<td>

Fetches the users settings.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organizations</strong></td>
<td valign="top">[<a href="#organization">Organization</a>!]!</td>
<td>

Fetches the users organization.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organization</strong></td>
<td valign="top"><a href="#organization">Organization</a>!</td>
<td>

Fetches the users organization.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projects</strong></td>
<td valign="top">[<a href="#project">Project</a>!]!</td>
<td>

Fetches all projects.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>project</strong></td>
<td valign="top"><a href="#project">Project</a>!</td>
<td>

Fetches a specific project.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectStates</strong></td>
<td valign="top">[<a href="#projectstate">ProjectState</a>!]!</td>
<td>

Fetches all project workflow states.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectState</strong></td>
<td valign="top"><a href="#projectstate">ProjectState</a>!</td>
<td>

Fetches a specific project workflow state.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>users</strong></td>
<td valign="top">[<a href="#user">User</a>!]!</td>
<td>

Fetches all users.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td>

Fetches a specific user.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>apiKeyCreate</strong></td>
<td valign="top"><a href="#apikeypayload">ApiKeyPayload</a>!</td>
<td>

Creates a new api key.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#apikeycreateinput">ApiKeyCreateInput</a>!</td>
<td>

The api key object to create.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>apiKeyArchive</strong></td>
<td valign="top"><a href="#archivepayload">ArchivePayload</a>!</td>
<td>

Archives an api key.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the api key to archive.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>commentCreate</strong></td>
<td valign="top"><a href="#commentpayload">CommentPayload</a>!</td>
<td>

Creates a new comment.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#commentcreateinput">CommentCreateInput</a>!</td>
<td>

The comment object to create.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>commentUpdate</strong></td>
<td valign="top"><a href="#commentpayload">CommentPayload</a>!</td>
<td>

Updates a comment.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#commentupdateinput">CommentUpdateInput</a>!</td>
<td>

A partial comment object to update the issue with.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the comment to update.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>commentArchive</strong></td>
<td valign="top"><a href="#archivepayload">ArchivePayload</a>!</td>
<td>

Archives a comment.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the comment to archive.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>imageUpload</strong></td>
<td valign="top"><a href="#imageuploadpayload">ImageUploadPayload</a>!</td>
<td>

XHR request payload to upload an image directly to Google Cloud Storage

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">contentType</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Upload mime-type

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">filename</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Filename of the uploaded file

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>integrationGithubConnect</strong></td>
<td valign="top"><a href="#integrationpayload">IntegrationPayload</a>!</td>
<td>

Connects with Github App.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">installationId</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The Github data to connect with.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>integrationSlack</strong></td>
<td valign="top"><a href="#integrationpayload">IntegrationPayload</a>!</td>
<td>

Save regular Slack integration.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">redirectUri</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The Slack OAuth redirect URI.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">code</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The Slack OAuth code.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>integrationSlackPost</strong></td>
<td valign="top"><a href="#integrationpayload">IntegrationPayload</a>!</td>
<td>

Save Slack webhook integration.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">redirectUri</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The Slack OAuth redirect URI.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">projectId</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Integration's associated project.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">code</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The Slack OAuth code.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>integrationArchive</strong></td>
<td valign="top"><a href="#archivepayload">ArchivePayload</a>!</td>
<td>

Archives an integration.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the integration to archive.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>integrationResourceArchive</strong></td>
<td valign="top"><a href="#archivepayload">ArchivePayload</a>!</td>
<td>

Archives an integration resource.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the integration resource to archive.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issueLabelCreate</strong></td>
<td valign="top"><a href="#issuelabelpayload">IssueLabelPayload</a>!</td>
<td>

Creates a new issue label.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#issuelabelcreateinput">IssueLabelCreateInput</a>!</td>
<td>

The issue label object to create.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issueLabelArchive</strong></td>
<td valign="top"><a href="#archivepayload">ArchivePayload</a>!</td>
<td>

Archives an issue label.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the issue label to archive.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issueCreate</strong></td>
<td valign="top"><a href="#issuepayload">IssuePayload</a>!</td>
<td>

Creates a new issue.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#issuecreateinput">IssueCreateInput</a>!</td>
<td>

The issue object to create.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issueUpdate</strong></td>
<td valign="top"><a href="#issuepayload">IssuePayload</a>!</td>
<td>

Updates an issue.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#issueupdateinput">IssueUpdateInput</a>!</td>
<td>

A partial issue object to update the issue with.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the issue to update.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issueClose</strong></td>
<td valign="top"><a href="#issuepayload">IssuePayload</a>!</td>
<td>

Closes an issue by moving it into the first completed state.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the issue to close.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issueArchive</strong></td>
<td valign="top"><a href="#archivepayload">ArchivePayload</a>!</td>
<td>

Archives an issue.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the issue to archive.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notificationUpdate</strong></td>
<td valign="top"><a href="#notificationpayload">NotificationPayload</a>!</td>
<td>

Updates a notification.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#notificationupdateinput">NotificationUpdateInput</a>!</td>
<td>

A partial notification object to update the issue with.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the notification to update.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notificationArchive</strong></td>
<td valign="top"><a href="#archivepayload">ArchivePayload</a>!</td>
<td>

Archives a notification.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the notification to archive.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organizationCreate</strong></td>
<td valign="top"><a href="#organizationpayload">OrganizationPayload</a>!</td>
<td>

Creates a new organization.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#createorganizationinput">CreateOrganizationInput</a>!</td>
<td>

The organization object to create.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organizationUpdate</strong></td>
<td valign="top"><a href="#organizationpayload">OrganizationPayload</a>!</td>
<td>

Updates the users organization.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#updateorganizationinput">UpdateOrganizationInput</a>!</td>
<td>

A partial organization object to update the organization with.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectCreate</strong></td>
<td valign="top"><a href="#projectpayload">ProjectPayload</a>!</td>
<td>

Creates a new project.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#projectcreateinput">ProjectCreateInput</a>!</td>
<td>

The project object to create.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectUpdate</strong></td>
<td valign="top"><a href="#projectpayload">ProjectPayload</a>!</td>
<td>

Updates a project.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#projectupdateinput">ProjectUpdateInput</a>!</td>
<td>

A partial project object to update the project with.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the project to update

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectArchive</strong></td>
<td valign="top"><a href="#archivepayload">ArchivePayload</a>!</td>
<td>

Archives a project.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the project to archive

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectStateCreate</strong></td>
<td valign="top"><a href="#projectstatepayload">ProjectStatePayload</a>!</td>
<td>

Creates a new project workflow state.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#projectstatecreateinput">ProjectStateCreateInput</a>!</td>
<td>

The project workflow state object to create.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectStateUpdate</strong></td>
<td valign="top"><a href="#projectstatepayload">ProjectStatePayload</a>!</td>
<td>

Updates a project workflow state.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#projectstateupdateinput">ProjectStateUpdateInput</a>!</td>
<td>

A partial project workflow state object to update.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the project workflow state to update.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectStateArchive</strong></td>
<td valign="top"><a href="#archivepayload">ArchivePayload</a>!</td>
<td>

Archives a project workflow state. Only states with issues that have been archived can be archived themselves.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the project workflow state to archive.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pushSubscriptionCreate</strong></td>
<td valign="top"><a href="#pushsubscriptionpayload">PushSubscriptionPayload</a>!</td>
<td>

Creates a push subscription.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#pushsubscriptioncreateinput">PushSubscriptionCreateInput</a>!</td>
<td>

The subscription to create.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pushSubscriptionArchive</strong></td>
<td valign="top"><a href="#pushsubscriptionpayload">PushSubscriptionPayload</a>!</td>
<td>

Archives a PushSubscription.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the PushSubscription to archive

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userAccountGoogleAuth</strong></td>
<td valign="top"><a href="#usergoogleauthpayload">UserGoogleAuthPayload</a>!</td>
<td>

Second step of Google's OAuth flow

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">code</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Code returned from Google's OAuth flow

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userCreate</strong></td>
<td valign="top"><a href="#userpayload">UserPayload</a>!</td>
<td>

Creates a new user.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#createuserinput">CreateUserInput</a>!</td>
<td>

The user object to create.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userUpdate</strong></td>
<td valign="top"><a href="#userpayload">UserPayload</a>!</td>
<td>

Updates a user.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#updateuserinput">UpdateUserInput</a>!</td>
<td>

A partial user object to update the user with.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the user to update.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userArchive</strong></td>
<td valign="top"><a href="#archivepayload">ArchivePayload</a>!</td>
<td>

Archives a user.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the user to archive.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userSettingsUpdate</strong></td>
<td valign="top"><a href="#usersettingspayload">UserSettingsPayload</a>!</td>
<td>

Updates user settings.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#usersettingsupdateinput">UserSettingsUpdateInput</a>!</td>
<td>

A partial notification object to update the settings with.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The identifier of the userSettings to update

</td>
</tr>
</tbody>
</table>

## Objects

### ApiKey

An API key

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>label</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Key label.

</td>
</tr>
</tbody>
</table>

### ApiKeyPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userError</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>apiKey</strong></td>
<td valign="top"><a href="#apikey">ApiKey</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### ArchivePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userError</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
</tbody>
</table>

### BackendEntity

The base class of a backend entity object. Not to be used directly.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
</tbody>
</table>

### ClientEntity

The base class of a model object. Not to be used directly

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
</tbody>
</table>

### Comment

An issue comment

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>body</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comment content

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issue</strong></td>
<td valign="top"><a href="#issue">Issue</a>!</td>
<td>

The issue that the comment is associated with.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td>

The user who wrote the comment

</td>
</tr>
</tbody>
</table>

### CommentPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userError</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>comment</strong></td>
<td valign="top"><a href="#comment">Comment</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### GitHubCommitPayload

GitHub's commit data

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timestamp</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>added</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>removed</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>modified</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
</tbody>
</table>

### GitHubPullRequestPayload

GitHub's pull request data

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>status</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>number</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>title</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userLogin</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>closedAt</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>mergedAt</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### ImageUploadPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userError</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>uploadFile</strong></td>
<td valign="top"><a href="#uploadfile">UploadFile</a></td>
<td></td>
</tr>
</tbody>
</table>

### Integration

An integration to external service

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>service</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The integration's type.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>serviceId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The external service ID.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organization</strong></td>
<td valign="top"><a href="#organization">Organization</a>!</td>
<td>

The organization that the integration is associated with.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>project</strong></td>
<td valign="top"><a href="#project">Project</a></td>
<td>

The project that the integration is associated with.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>creator</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td>

The user who added the integration

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>settings</strong></td>
<td valign="top"><a href="#integrationsettings">IntegrationSettings</a>!</td>
<td>

Settings related to the integration.

</td>
</tr>
</tbody>
</table>

### IntegrationPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userError</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>integration</strong></td>
<td valign="top"><a href="#integration">Integration</a></td>
<td></td>
</tr>
</tbody>
</table>

### IntegrationResource

An integration resource from external service

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>resourceType</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The integration's type.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>resourceId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The external service resource ID.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>integration</strong></td>
<td valign="top"><a href="#integration">Integration</a>!</td>
<td>

The integration that the resource is associated with.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issue</strong></td>
<td valign="top"><a href="#issue">Issue</a>!</td>
<td>

The issue that the resource is associated with.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>data</strong></td>
<td valign="top"><a href="#integrationresourcedata">IntegrationResourceData</a>!</td>
<td>

Detailed information about the external resource.

</td>
</tr>
</tbody>
</table>

### IntegrationResourceData

Integration resource's payload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>githubPullRequest</strong></td>
<td valign="top"><a href="#githubpullrequestpayload">GitHubPullRequestPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>githubCommit</strong></td>
<td valign="top"><a href="#githubcommitpayload">GitHubCommitPayload</a></td>
<td></td>
</tr>
</tbody>
</table>

### IntegrationSettings

Integration resource's payload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>slackPost</strong></td>
<td valign="top"><a href="#slackpostsettings">SlackPostSettings</a></td>
<td></td>
</tr>
</tbody>
</table>

### Issue

An issue.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>number</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

The issue's unique number.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>title</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The issue's title.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The issue's description in markdown.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>comments</strong></td>
<td valign="top">[<a href="#comment">Comment</a>!]!</td>
<td>

Comments associated with the issue

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>labels</strong></td>
<td valign="top">[<a href="#issuelabel">IssueLabel</a>!]!</td>
<td>

Labels associated with the issue.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>project</strong></td>
<td valign="top"><a href="#project">Project</a>!</td>
<td>

The project that the issue is associated with.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>creator</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td>

The user who created the issue.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>assignee</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td>

The user to whom the issue is assigned to.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>subscribers</strong></td>
<td valign="top">[<a href="#user">User</a>!]!</td>
<td>

Users who are subscribed to the issue.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>state</strong></td>
<td valign="top"><a href="#projectstate">ProjectState</a>!</td>
<td>

The workflow state that the issue is associated with.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>boardOrder</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

The order of the item in its column on the board.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>startedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the issue was moved into started state.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>completedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the issue was moved into completed state.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>canceledAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the issue was moved into canceled state.

</td>
</tr>
</tbody>
</table>

### IssueLabel

Issue labels.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The issue label's name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The issue label's description.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>color</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The label color.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>project</strong></td>
<td valign="top"><a href="#project">Project</a>!</td>
<td>

The parent project in which this label belongs to.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>creator</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td>

The user who created the label.

</td>
</tr>
</tbody>
</table>

### IssueLabelPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userError</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issueLabel</strong></td>
<td valign="top"><a href="#issuelabel">IssueLabel</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### IssuePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userError</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issue</strong></td>
<td valign="top"><a href="#issue">Issue</a></td>
<td></td>
</tr>
</tbody>
</table>

### Notification

A user notification

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Notification type

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td>

The user to whom this notification was targeted for.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issue</strong></td>
<td valign="top"><a href="#issue">Issue</a>!</td>
<td>

The issue that the notification is associated with.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>project</strong></td>
<td valign="top"><a href="#project">Project</a>!</td>
<td>

The project which the notification is associated with

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>readAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at when the user marked it as read.

</td>
</tr>
</tbody>
</table>

### NotificationPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userError</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notification</strong></td>
<td valign="top"><a href="#notification">Notification</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### Organization

Organizations contain user accounts and projects.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The organizations name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pictureUrl</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The organizations picture.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projects</strong></td>
<td valign="top">[<a href="#project">Project</a>!]!</td>
<td>

Projects associated with the organization.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>users</strong></td>
<td valign="top">[<a href="#user">User</a>!]!</td>
<td>

Users associated with the organization.

</td>
</tr>
</tbody>
</table>

### OrganizationPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userError</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organization</strong></td>
<td valign="top"><a href="#organization">Organization</a></td>
<td></td>
</tr>
</tbody>
</table>

### Project

A project that contains issues.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The project's name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>key</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The project's unique key.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The project's description.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issues</strong></td>
<td valign="top">[<a href="#issue">Issue</a>!]!</td>
<td>

Issues associated with the project

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>keys</strong></td>
<td valign="top">[<a href="#issue">Issue</a>!]!</td>
<td>

Keys associated with the project

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issueLabels</strong></td>
<td valign="top">[<a href="#issuelabel">IssueLabel</a>!]!</td>
<td>

Issue labels associated with the project.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>states</strong></td>
<td valign="top">[<a href="#projectstate">ProjectState</a>!]!</td>
<td>

Issues belonging in this workflow state

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organization</strong></td>
<td valign="top"><a href="#organization">Organization</a>!</td>
<td>

The organization that the project is associated with.

</td>
</tr>
</tbody>
</table>

### ProjectPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userError</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>project</strong></td>
<td valign="top"><a href="#project">Project</a></td>
<td></td>
</tr>
</tbody>
</table>

### ProjectState

Individual state in an issue workflow.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The state's name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>emoji</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The state's emoji.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Information about the state.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>position</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

Position of the state in the project flow.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

State type.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issues</strong></td>
<td valign="top">[<a href="#issue">Issue</a>!]!</td>
<td>

Issues belonging in this workflow state

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>project</strong></td>
<td valign="top"><a href="#project">Project</a>!</td>
<td>

The parent project in which this state belongs to.

</td>
</tr>
</tbody>
</table>

### ProjectStatePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userError</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectState</strong></td>
<td valign="top"><a href="#projectstate">ProjectState</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### PushSubscription

A user's push subscription.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
</tbody>
</table>

### PushSubscriptionPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userError</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
</tbody>
</table>

### SlackPostSettings

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>channel</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>channelId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>configurationUrl</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### SyncResponse

A transport model for sync responses

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The type of the sync response

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>data</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The serialized data associated with the sync response

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastSyncId</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

The last id covered by the response

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>databaseVersion</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

The version of the database. Increased by 1 for each migration run on the database

</td>
</tr>
</tbody>
</table>

### UploadFile

Object representing Google Cloud upload policy

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>filename</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>contentType</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>uploadUrl</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>assetUrl</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### User

A user.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The user's full name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>displayName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The user's display (nick) name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#email">Email</a>!</td>
<td>

The user's email address.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>avatarUrl</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

An URL to the user's avatar image

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdIssues</strong></td>
<td valign="top">[<a href="#issue">Issue</a>!]!</td>
<td>

Issues created by the user.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>assignedIssues</strong></td>
<td valign="top">[<a href="#issue">Issue</a>!]!</td>
<td>

Issues assigned to the user.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notifications</strong></td>
<td valign="top">[<a href="#notification">Notification</a>!]!</td>
<td>

Notifications assigned to the user.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pushSubscriptions</strong></td>
<td valign="top">[<a href="#pushsubscription">PushSubscription</a>!]!</td>
<td>

Push subscriptions of the user.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>apiKeys</strong></td>
<td valign="top">[<a href="#apikey">ApiKey</a>!]!</td>
<td>

Developer API keys of the user.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organization</strong></td>
<td valign="top"><a href="#organization">Organization</a>!</td>
<td>

The organization that the user is associated with.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>settings</strong></td>
<td valign="top"><a href="#usersettings">UserSettings</a>!</td>
<td>

The settings of the user

</td>
</tr>
</tbody>
</table>

### UserAccount

A user account.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The user's name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#email">Email</a>!</td>
<td>

The user's email address.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td>

The user that this user account is associated with

</td>
</tr>
</tbody>
</table>

### UserGoogleAuthPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>token</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### UserPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userError</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td></td>
</tr>
</tbody>
</table>

### UserSettings

The settings of a user.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#uuid">UUID</a>!</td>
<td>

The models identifier.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was created.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

The time at which the model was updated.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>archivedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time at which the model was archived.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td>

The user to whom this notification was targeted for.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>sidebarCollapsed</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Whether the navigation sidebar is collapsed.

</td>
</tr>
</tbody>
</table>

### UserSettingsPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userError</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userSettings</strong></td>
<td valign="top"><a href="#usersettings">UserSettings</a>!</td>
<td>

The users settings.

</td>
</tr>
</tbody>
</table>

## Inputs

### ApiKeyCreateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The identifier. If none is provided, the backend will generate one

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>label</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The API key label.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>key</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The API key value (format: /^[a-zA-Z0-9]{40}\$/).

</td>
</tr>
</tbody>
</table>

### CommentCreateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The identifier. If none is provided, the backend will generate one

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>body</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The comment content.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>issueId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The issue to associate the comment with.

</td>
</tr>
</tbody>
</table>

### CommentUpdateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>body</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The comment content.

</td>
</tr>
</tbody>
</table>

### CreateOrganizationInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The identifier. If none is provided, the backend will generate one

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The groups name.

</td>
</tr>
</tbody>
</table>

### CreateUserInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The identifier. If none is provided, the backend will generate one

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The users name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>displayName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The users display name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The users email address.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>avatarUrl</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The users avatar image URL.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organizationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The organization associated with the user.

</td>
</tr>
</tbody>
</table>

### IssueCreateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The identifier. If none is provided, the backend will generate one

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>title</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The issue's title.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The issue's description.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>assigneeId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The id of the user to assign the issue to.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>subscriberIds</strong></td>
<td valign="top">[<a href="#string">String</a>!]</td>
<td>

The ids of the users subscribing to this ticket.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>labelIds</strong></td>
<td valign="top">[<a href="#string">String</a>!]</td>
<td>

The ids of the issue labels associated with this ticket.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The project to associate the issue with.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>stateId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The project state which the issue is assigned.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>boardOrder</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

The order of the item in its column on the board.

</td>
</tr>
</tbody>
</table>

### IssueLabelCreateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The identifier. If none is provided, the backend will generate one

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The issue label's name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The issue label's description.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>color</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The issue label's color.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The project to associate the issue label with.

</td>
</tr>
</tbody>
</table>

### IssueUpdateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>title</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The issue's title.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The issues description.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>assigneeId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The id of the user to assign the issue to.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>subscriberIds</strong></td>
<td valign="top">[<a href="#string">String</a>!]</td>
<td>

The ids of the users subscribing to this ticket.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>labelIds</strong></td>
<td valign="top">[<a href="#string">String</a>!]</td>
<td>

The ids of the issue labels associated with this ticket.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The project to associate the issue with.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>stateId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The project state which the issue is assigned.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>boardOrder</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

The order of the item in its column on the board.

</td>
</tr>
</tbody>
</table>

### NotificationUpdateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>readAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The time when notification was marked as read.

</td>
</tr>
</tbody>
</table>

### ProjectCreateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The identifier. If none is provided, the backend will generate one

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The name of the project.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The description of the project.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>key</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The key of the project. If not given, a key will be generated based on the name of the project.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organizationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The organization associated with the project.

</td>
</tr>
</tbody>
</table>

### ProjectStateCreateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The identifier. If none is provided, the backend will generate one

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The name of the workflow state.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>emoji</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The name of the workflow state.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The description of the workflow state.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The project to associate the workflow state with.

</td>
</tr>
</tbody>
</table>

### ProjectStateUpdateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The name of the workflow state.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>emoji</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The name of the workflow state.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The description of the workflow state.

</td>
</tr>
</tbody>
</table>

### ProjectUpdateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The name of the project.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The description of the project.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>key</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The key of the project.

</td>
</tr>
</tbody>
</table>

### PushSubscriptionCreateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The identifier. If none is provided, the backend will generate one

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The user id of the subscription

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>data</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The data of the subscription in stringified JSON format

</td>
</tr>
</tbody>
</table>

### UpdateOrganizationInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The groups name.

</td>
</tr>
</tbody>
</table>

### UpdateUserInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The users name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>displayName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The users display name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The users email address.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>avatarUrl</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The users avatar image URL.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organizationId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The organization associated with the user.

</td>
</tr>
</tbody>
</table>

### UserSettingsUpdateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>settings</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The user's settings

</td>
</tr>
</tbody>
</table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### DateTime

The DateTime scalar type represents date time strings complying to ISO-8601.

### Email

The Email scalar type represents E-Mail addresses compliant to RFC 822.

### Float

The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

### UUID

The UUID scalar type represents a UUID.
