---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'StringArrayComparator.every' changed type from '[StringItemComparator!]' to 'StringItemComparator' (StringArrayComparator.every)

feat(schema): [breaking] Input field 'StringArrayComparator.some' changed type from '[StringItemComparator!]' to 'StringItemComparator' (StringArrayComparator.some)

feat(schema): [dangerous] Input field 'attachmentUrl' was added to input object type 'CustomerNeedCreateInput' (CustomerNeedCreateInput.attachmentUrl)

feat(schema): [dangerous] Input field 'customerExternalId' was added to input object type 'CustomerNeedCreateInput' (CustomerNeedCreateInput.customerExternalId)

feat(schema): [dangerous] Input field 'attachmentUrl' was added to input object type 'CustomerNeedUpdateInput' (CustomerNeedUpdateInput.attachmentUrl)

feat(schema): [dangerous] Input field 'customerExternalId' was added to input object type 'CustomerNeedUpdateInput' (CustomerNeedUpdateInput.customerExternalId)

feat(schema): [dangerous] Argument 'linkKind: GitLinkKind' added to field 'Mutation.attachmentLinkGitHubPR' (Mutation.attachmentLinkGitHubPR.linkKind)

feat(schema): [dangerous] Input field 'initiativeUpdateReminderFrequencyInWeeks' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.initiativeUpdateReminderFrequencyInWeeks)

feat(schema): [dangerous] Input field 'initiativeUpdateRemindersDay' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.initiativeUpdateRemindersDay)

feat(schema): [dangerous] Input field 'initiativeUpdateRemindersHour' was added to input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.initiativeUpdateRemindersHour)

feat(schema): [dangerous] Enum value 'update' was added to enum 'PostType' (PostType.update)

feat(schema): [dangerous] Enum value 'workspaceMembers' was added to enum 'ViewType' (ViewType.workspaceMembers)

feat(schema): [non_breaking] Type 'CustomerUpsertInput' was added (CustomerUpsertInput)

feat(schema): [non_breaking] Type 'GitLinkKind' was added (GitLinkKind)

feat(schema): [non_breaking] Type 'OrganizationStartTrialInput' was added (OrganizationStartTrialInput)

feat(schema): [non_breaking] Description '[ALPHA] A customer whose needs will be tied to issues or projects.' on type 'Customer' has changed to 'A customer whose needs will be tied to issues or projects.' (Customer)

feat(schema): [non_breaking] Description '[ALPHA] A customer need, expressed through a reference to an issue, project, or comment.' on type 'CustomerNeed' has changed to 'A customer need, expressed through a reference to an issue, project, or comment.' (CustomerNeed)

feat(schema): [non_breaking] Input field 'CustomerNeedCreateInput.url' description changed from 'Optional URL to the source of the customer need.' to '[DEPRECATED] Optional URL to the source of the customer need.' (CustomerNeedCreateInput.url)

feat(schema): [non_breaking] Input field 'CustomerNeedUpdateInput.url' description changed from 'Optional URL to the source of the customer need.' to '[DEPRECATED] Optional URL to the source of the customer need.' (CustomerNeedUpdateInput.url)

feat(schema): [non_breaking] Description '[ALPHA] A customer status.' on type 'CustomerStatus' has changed to 'A customer status.' (CustomerStatus)

feat(schema): [non_breaking] Description '[ALPHA] A customer tier.' on type 'CustomerTier' has changed to 'A customer tier.' (CustomerTier)

feat(schema): [non_breaking] Field 'needs' was added to object type 'Issue' (Issue.needs)

feat(schema): [non_breaking] Field 'schedule' was added to object type 'IssueDraft' (IssueDraft.schedule)

feat(schema): [non_breaking] Field 'needs' was added to object type 'IssueSearchResult' (IssueSearchResult.needs)

feat(schema): [non_breaking] Field 'customerUpsert' was added to object type 'Mutation' (Mutation.customerUpsert)

feat(schema): [non_breaking] Field 'organizationStartTrialForPlan' was added to object type 'Mutation' (Mutation.organizationStartTrialForPlan)

feat(schema): [non_breaking] Field 'Mutation.customerCreate' description changed from '[ALPHA] Creates a new customer.' to 'Creates a new customer.' (Mutation.customerCreate)

feat(schema): [non_breaking] Field 'Mutation.customerDelete' description changed from '[ALPHA] Deletes a customer.' to 'Deletes a customer.' (Mutation.customerDelete)

feat(schema): [non_breaking] Field 'Mutation.customerMerge' description changed from '[ALPHA] Merges two customers.' to 'Merges two customers.' (Mutation.customerMerge)

feat(schema): [non_breaking] Field 'Mutation.customerNeedArchive' description changed from '[ALPHA] Archives a customer need.' to 'Archives a customer need.' (Mutation.customerNeedArchive)

feat(schema): [non_breaking] Field 'Mutation.customerNeedCreate' description changed from '[ALPHA] Creates a new customer need.' to 'Creates a new customer need.' (Mutation.customerNeedCreate)

feat(schema): [non_breaking] Field 'Mutation.customerNeedCreateFromAttachment' description changed from '[ALPHA] Creates a new customer need out of an attachment' to 'Creates a new customer need out of an attachment' (Mutation.customerNeedCreateFromAttachment)

feat(schema): [non_breaking] Field 'Mutation.customerNeedDelete' description changed from '[ALPHA] Deletes a customer need.' to 'Deletes a customer need.' (Mutation.customerNeedDelete)

feat(schema): [non_breaking] Field 'Mutation.customerNeedUnarchive' description changed from '[ALPHA] Unarchives a customer need.' to 'Unarchives a customer need.' (Mutation.customerNeedUnarchive)

feat(schema): [non_breaking] Field 'Mutation.customerNeedUpdate' description changed from '[ALPHA] Updates a customer need' to 'Updates a customer need' (Mutation.customerNeedUpdate)

feat(schema): [non_breaking] Field 'Mutation.customerTierCreate' description changed from '[ALPHA] Creates a new customer tier.' to 'Creates a new customer tier.' (Mutation.customerTierCreate)

feat(schema): [non_breaking] Field 'Mutation.customerTierDelete' description changed from '[ALPHA] Deletes a customer tier.' to 'Deletes a customer tier.' (Mutation.customerTierDelete)

feat(schema): [non_breaking] Field 'Mutation.customerTierUpdate' description changed from '[ALPHA] Updates a customer tier.' to 'Updates a customer tier.' (Mutation.customerTierUpdate)

feat(schema): [non_breaking] Field 'Mutation.customerUpdate' description changed from '[ALPHA] Updates a customer' to 'Updates a customer' (Mutation.customerUpdate)

feat(schema): [non_breaking] Field 'Mutation.organizationStartTrial' description changed from 'Starts a trial for the organization. Administrator privileges required.' to '[DEPRECATED] Starts a trial for the organization. Administrator privileges required.' (Mutation.organizationStartTrial)

feat(schema): [non_breaking] Field 'Mutation.organizationStartTrial' is deprecated (Mutation.organizationStartTrial)

feat(schema): [non_breaking] Field 'Mutation.organizationStartTrial' has deprecation reason 'Use organizationStartTrialForPlan' (Mutation.organizationStartTrial)

feat(schema): [non_breaking] Field 'NotificationDeliveryPreferencesChannel.notificationsDisabled' description changed from 'Whether notifications are enabled for this channel.' to '[DEPRECATED] Whether notifications are enabled for this channel. Use notificationChannelPreferences instead.' (NotificationDeliveryPreferencesChannel.notificationsDisabled)

feat(schema): [non_breaking] Field 'NotificationDeliveryPreferencesChannel.notificationsDisabled' is deprecated (NotificationDeliveryPreferencesChannel.notificationsDisabled)

feat(schema): [non_breaking] Field 'NotificationDeliveryPreferencesChannel.notificationsDisabled' has deprecation reason 'This field has been replaced by notificationChannelPreferences' (NotificationDeliveryPreferencesChannel.notificationsDisabled)

feat(schema): [non_breaking] Input field 'NotificationDeliveryPreferencesChannelInput.notificationsDisabled' description changed from 'Whether notifications are enabled for this channel.' to '[DEPRECATED] Whether notifications are enabled for this channel. Use notificationChannelPreferences instead.' (NotificationDeliveryPreferencesChannelInput.notificationsDisabled)

feat(schema): [non_breaking] Field 'initiativeUpdateReminderFrequencyInWeeks' was added to object type 'Organization' (Organization.initiativeUpdateReminderFrequencyInWeeks)

feat(schema): [non_breaking] Field 'initiativeUpdateRemindersDay' was added to object type 'Organization' (Organization.initiativeUpdateRemindersDay)

feat(schema): [non_breaking] Field 'initiativeUpdateRemindersHour' was added to object type 'Organization' (Organization.initiativeUpdateRemindersHour)

feat(schema): [non_breaking] Field 'slugId' was added to object type 'Post' (Post.slugId)

feat(schema): [non_breaking] Field 'title' was added to object type 'Post' (Post.title)

feat(schema): [non_breaking] Description for argument 'sorts' on field 'Query.customers' changed from '[INTERNAL] Sort returned customers.' to 'Sort returned customers.' (Query.customers.sorts)

feat(schema): [non_breaking] Field 'Query.issueTitleSuggestionFromCustomerRequest' description changed from '[ALPHA] Suggests issue title based on a customer request.' to 'Suggests issue title based on a customer request.' (Query.issueTitleSuggestionFromCustomerRequest)

feat(schema): [non_breaking] Field 'UserSettings.notificationDeliveryPreferences' description changed from 'The notification delivery preferences for the user.' to 'The notification delivery preferences for the user. Note: notificationDisabled field is deprecated in favor of notificationChannelPreferences.' (UserSettings.notificationDeliveryPreferences)

feat(schema): [non_breaking] Field 'UserSettings.subscribedToUnreadNotificationsReminder' description changed from 'Whether this user is subscribed to unread notifications reminder emails or not.' to '[DEPRECATED] Whether this user is subscribed to unread notifications reminder emails or not.' (UserSettings.subscribedToUnreadNotificationsReminder)

feat(schema): [non_breaking] Field 'UserSettings.subscribedToUnreadNotificationsReminder' is deprecated (UserSettings.subscribedToUnreadNotificationsReminder)

feat(schema): [non_breaking] Field 'UserSettings.subscribedToUnreadNotificationsReminder' has deprecation reason 'This field has been replaced by notificationChannelPreferences' (UserSettings.subscribedToUnreadNotificationsReminder)

feat(schema): [non_breaking] Input field 'UserSettingsUpdateInput.notificationPreferences' description changed from 'The user's notification preferences.' to '[DEPRECATED] The user's notification preferences.' (UserSettingsUpdateInput.notificationPreferences)

feat(schema): [non_breaking] Input field 'UserSettingsUpdateInput.subscribedToUnreadNotificationsReminder' description changed from 'Whether this user is subscribed to email notifications reminder or not.' to '[DEPRECATED] Whether this user is subscribed to email notifications reminder or not.' (UserSettingsUpdateInput.subscribedToUnreadNotificationsReminder)