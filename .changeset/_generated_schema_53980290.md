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

feat(schema): [dangerous] Enum value 'workspaceMembers' was added to enum 'ViewType' (ViewType.workspaceMembers)

feat(schema): [non_breaking] Type 'CustomerUpsertInput' was added (CustomerUpsertInput)

feat(schema): [non_breaking] Type 'GitLinkKind' was added (GitLinkKind)

feat(schema): [non_breaking] Type 'OrganizationStartTrialInput' was added (OrganizationStartTrialInput)

feat(schema): [non_breaking] Input field 'CustomerNeedCreateInput.url' description changed from 'Optional URL to the source of the customer need.' to '[DEPRECATED] Optional URL to the source of the customer need.' (CustomerNeedCreateInput.url)

feat(schema): [non_breaking] Input field 'CustomerNeedUpdateInput.url' description changed from 'Optional URL to the source of the customer need.' to '[DEPRECATED] Optional URL to the source of the customer need.' (CustomerNeedUpdateInput.url)

feat(schema): [non_breaking] Field 'needs' was added to object type 'Issue' (Issue.needs)

feat(schema): [non_breaking] Field 'schedule' was added to object type 'IssueDraft' (IssueDraft.schedule)

feat(schema): [non_breaking] Field 'needs' was added to object type 'IssueSearchResult' (IssueSearchResult.needs)

feat(schema): [non_breaking] Field 'customerUpsert' was added to object type 'Mutation' (Mutation.customerUpsert)

feat(schema): [non_breaking] Field 'organizationStartTrialForPlan' was added to object type 'Mutation' (Mutation.organizationStartTrialForPlan)

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

feat(schema): [non_breaking] Field 'UserSettings.notificationDeliveryPreferences' description changed from 'The notification delivery preferences for the user.' to 'The notification delivery preferences for the user. Note: notificationDisabled field is deprecated in favor of notificationChannelPreferences.' (UserSettings.notificationDeliveryPreferences)

feat(schema): [non_breaking] Field 'UserSettings.subscribedToUnreadNotificationsReminder' description changed from 'Whether this user is subscribed to unread notifications reminder emails or not.' to '[DEPRECATED] Whether this user is subscribed to unread notifications reminder emails or not.' (UserSettings.subscribedToUnreadNotificationsReminder)

feat(schema): [non_breaking] Field 'UserSettings.subscribedToUnreadNotificationsReminder' is deprecated (UserSettings.subscribedToUnreadNotificationsReminder)

feat(schema): [non_breaking] Field 'UserSettings.subscribedToUnreadNotificationsReminder' has deprecation reason 'This field has been replaced by notificationChannelPreferences' (UserSettings.subscribedToUnreadNotificationsReminder)

feat(schema): [non_breaking] Input field 'UserSettingsUpdateInput.notificationPreferences' description changed from 'The user's notification preferences.' to '[DEPRECATED] The user's notification preferences.' (UserSettingsUpdateInput.notificationPreferences)

feat(schema): [non_breaking] Input field 'UserSettingsUpdateInput.subscribedToUnreadNotificationsReminder' description changed from 'Whether this user is subscribed to email notifications reminder or not.' to '[DEPRECATED] Whether this user is subscribed to email notifications reminder or not.' (UserSettingsUpdateInput.subscribedToUnreadNotificationsReminder)