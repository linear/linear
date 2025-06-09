---
"@linear/sdk": major
---


feat(schema): [breaking] Type 'BaseEntityWebhookPayload' was removed (BaseEntityWebhookPayload)

feat(schema): [breaking] Field 'AppUserNotificationWebhookPayload.createdAt' changed type from 'String!' to 'DateTime!' (AppUserNotificationWebhookPayload.createdAt)

feat(schema): [breaking] Field 'CommentWebhookPayload.documentContent' changed type from 'BaseEntityWebhookPayload' to 'DocumentContentChildWebhookPayload' (CommentWebhookPayload.documentContent)

feat(schema): [dangerous] Input field 'reopenCaseStatus' was added to input object type 'SalesforceSettingsInput' (SalesforceSettingsInput.reopenCaseStatus)

feat(schema): [non_breaking] Type 'AppUserTeamAccessChangedWebhookPayload' was added (AppUserTeamAccessChangedWebhookPayload)

feat(schema): [non_breaking] Type 'AuditEntryWebhookPayload' was added (AuditEntryWebhookPayload)

feat(schema): [non_breaking] Type 'BaseWebhookPayload' was added (BaseWebhookPayload)

feat(schema): [non_breaking] Type 'CustomResourceWebhookPayload' was added (CustomResourceWebhookPayload)

feat(schema): [non_breaking] Type 'DataWebhookPayload' was added (DataWebhookPayload)

feat(schema): [non_breaking] Type 'DocumentContentChildWebhookPayload' was added (DocumentContentChildWebhookPayload)

feat(schema): [non_breaking] Type 'DocumentWebhookPayload' was added (DocumentWebhookPayload)

feat(schema): [non_breaking] Type 'EntityWebhookPayload' was added (EntityWebhookPayload)

feat(schema): [non_breaking] Type 'IssueSlaWebhookPayload' was added (IssueSlaWebhookPayload)

feat(schema): [non_breaking] Type 'OAuthAppWebhookPayload' was added (OAuthAppWebhookPayload)

feat(schema): [non_breaking] Field 'AppUserNotificationWebhookPayload.action' description changed from 'The action of the notification.' to 'The type of action that triggered the webhook.' (AppUserNotificationWebhookPayload.action)

feat(schema): [non_breaking] Field 'AppUserNotificationWebhookPayload.appUserId' description changed from 'The app user id of the webhook.' to 'ID of the app user the notification is for.' (AppUserNotificationWebhookPayload.appUserId)

feat(schema): [non_breaking] Field 'AppUserNotificationWebhookPayload.createdAt' description changed from 'The timestamp the webhook was created at.' to 'The time the payload was created.' (AppUserNotificationWebhookPayload.createdAt)

feat(schema): [non_breaking] Field 'AppUserNotificationWebhookPayload.notification' description changed from 'The notification of the webhook.' to 'Details of the notification.' (AppUserNotificationWebhookPayload.notification)

feat(schema): [non_breaking] Field 'AppUserNotificationWebhookPayload.oauthClientId' description changed from 'The oauth client id of the webhook.' to 'ID of the OAuth client the app user is tied to.' (AppUserNotificationWebhookPayload.oauthClientId)

feat(schema): [non_breaking] Field 'AppUserNotificationWebhookPayload.organizationId' description changed from 'The organization id of the webhook.' to 'ID of the organization for which the webhook belongs to.' (AppUserNotificationWebhookPayload.organizationId)

feat(schema): [non_breaking] Field 'AppUserNotificationWebhookPayload.type' description changed from 'The type of the notification.' to 'The type of resource.' (AppUserNotificationWebhookPayload.type)

feat(schema): [non_breaking] Description 'Complete payload for an app user notification webhook.' on type 'AppUserNotificationWebhookPayload' has changed to 'Payload for app user notification webhook events.' (AppUserNotificationWebhookPayload)

feat(schema): [non_breaking] Field 'integrationSalesforceMetadataRefresh' was added to object type 'Mutation' (Mutation.integrationSalesforceMetadataRefresh)

feat(schema): [non_breaking] Field 'Query._dummy' changed type from 'String' to 'String!' (Query._dummy)