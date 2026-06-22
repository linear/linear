---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'OAuthApplication.webhookResourceTypes' changed type from '[String!]!' to '[WebhookResourceType!]!' (OAuthApplication.webhookResourceTypes)

feat(schema): [breaking] Input field 'OAuthApplicationCreateInput.webhookResourceTypes' changed type from '[String!]' to '[WebhookResourceType!]' (OAuthApplicationCreateInput.webhookResourceTypes)

feat(schema): [breaking] Input field 'OAuthApplicationUpdateInput.webhookResourceTypes' changed type from '[String!]' to '[WebhookResourceType!]' (OAuthApplicationUpdateInput.webhookResourceTypes)

feat(schema): [breaking] Enum value 'agentCodeIntelligencePromoDismissed' was removed from enum 'UserFlagType' (UserFlagType.agentCodeIntelligencePromoDismissed)

feat(schema): [breaking] Enum value 'agentCodeIntelligenceSplashAnimationSeen' was removed from enum 'UserFlagType' (UserFlagType.agentCodeIntelligenceSplashAnimationSeen)

feat(schema): [dangerous] Input field 'entityId' was added to input object type 'AuditEntryFilter' (AuditEntryFilter.entityId)

feat(schema): [dangerous] Input field 'entityIdentifier' was added to input object type 'AuditEntryFilter' (AuditEntryFilter.entityIdentifier)

feat(schema): [dangerous] Input field 'entityType' was added to input object type 'AuditEntryFilter' (AuditEntryFilter.entityType)

feat(schema): [dangerous] Member 'ExternalUserActorWebhookPayload' was added to Union type 'EntityActorWebhookPayload' (EntityActorWebhookPayload)

feat(schema): [dangerous] Enum value 'initiatives' was added to enum 'FacetPageSource' (FacetPageSource.initiatives)

feat(schema): [dangerous] Input field 'leadTeam' was added to input object type 'InitiativeCollectionFilter' (InitiativeCollectionFilter.leadTeam)

feat(schema): [dangerous] Input field 'leadTeamId' was added to input object type 'InitiativeCreateInput' (InitiativeCreateInput.leadTeamId)

feat(schema): [dangerous] Input field 'leadTeam' was added to input object type 'InitiativeFilter' (InitiativeFilter.leadTeam)

feat(schema): [dangerous] Input field 'leadTeamId' was added to input object type 'InitiativeUpdateInput' (InitiativeUpdateInput.leadTeamId)

feat(schema): [dangerous] Input field 'enableAiIntakeAttachmentProcessing' was added to input object type 'IntercomSettingsInput' (IntercomSettingsInput.enableAiIntakeAttachmentProcessing)

feat(schema): [dangerous] Input field 'leadTeam' was added to input object type 'NullableInitiativeFilter' (NullableInitiativeFilter.leadTeam)

feat(schema): [dangerous] Input field 'trustedSourcesAllowlist' was added to input object type 'OrganizationLinearAgentSettingsInput' (OrganizationLinearAgentSettingsInput.trustedSourcesAllowlist)

feat(schema): [dangerous] Input field 'trustedSourcesMode' was added to input object type 'OrganizationLinearAgentSettingsInput' (OrganizationLinearAgentSettingsInput.trustedSourcesMode)

feat(schema): [dangerous] Input field 'automationManagementRole' was added to input object type 'OrganizationSecuritySettingsInput' (OrganizationSecuritySettingsInput.automationManagementRole)

feat(schema): [dangerous] Input field 'initiativesEnabled' was added to input object type 'TeamCreateInput' (TeamCreateInput.initiativesEnabled)

feat(schema): [dangerous] Input field 'automationManagement' was added to input object type 'TeamSecuritySettingsInput' (TeamSecuritySettingsInput.automationManagement)

feat(schema): [dangerous] Input field 'initiativesEnabled' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.initiativesEnabled)

feat(schema): [dangerous] Enum value 'automations' was added to enum 'ViewType' (ViewType.automations)

feat(schema): [dangerous] Enum value 'inboxOther' was added to enum 'ViewType' (ViewType.inboxOther)

feat(schema): [dangerous] Enum value 'inboxPriority' was added to enum 'ViewType' (ViewType.inboxPriority)

feat(schema): [dangerous] Enum value 'initiativesAll' was added to enum 'ViewType' (ViewType.initiativesAll)

feat(schema): [dangerous] Input field 'enableAiIntakeAttachmentProcessing' was added to input object type 'ZendeskSettingsInput' (ZendeskSettingsInput.enableAiIntakeAttachmentProcessing)

feat(schema): [non_breaking] Type 'ExternalUserActorWebhookPayload' was added (ExternalUserActorWebhookPayload)

feat(schema): [non_breaking] Type 'LinearAgentTrustedSourcesMode' was added (LinearAgentTrustedSourcesMode)

feat(schema): [non_breaking] Type 'OrganizationLinearAgentTrustedSourcesAllowlistEntryInput' was added (OrganizationLinearAgentTrustedSourcesAllowlistEntryInput)

feat(schema): [non_breaking] Type 'ProductAnnouncement' was added (ProductAnnouncement)

feat(schema): [non_breaking] Type 'ProductAnnouncementNotification' was added (ProductAnnouncementNotification)

feat(schema): [non_breaking] Type 'WebhookResourceType' was added (WebhookResourceType)

feat(schema): [non_breaking] Field 'queued' was added to object type 'AiConversationPromptCodingSessionToolCallArgs' (AiConversationPromptCodingSessionToolCallArgs.queued)

feat(schema): [non_breaking] Field 'leadTeam' was added to object type 'Initiative' (Initiative.leadTeam)

feat(schema): [non_breaking] Field 'releaseNote' was added to object type 'Release' (Release.releaseNote)

feat(schema): [non_breaking] Description 'A release note. The note body is stored in related document content, and the releases it covers are tracked in releaseIds.' on type 'ReleaseNote' has changed to 'A note documenting one or more releases. The note body is stored in related document content.' (ReleaseNote)

feat(schema): [non_breaking] Field 'automationFieldLastExecuted' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.automationFieldLastExecuted)

feat(schema): [non_breaking] Field 'automationFieldStats' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.automationFieldStats)

feat(schema): [non_breaking] Field 'automationFieldTeam' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.automationFieldTeam)

feat(schema): [non_breaking] Field 'automationFieldTrigger' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.automationFieldTrigger)

feat(schema): [non_breaking] Field 'automationGrouping' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.automationGrouping)

feat(schema): [non_breaking] Field 'automationOrdering' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.automationOrdering)

feat(schema): [non_breaking] Field 'automationShowDescendants' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.automationShowDescendants)

feat(schema): [non_breaking] Field 'automationStatsPeriod' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.automationStatsPeriod)

feat(schema): [non_breaking] Field 'initiativeFieldLeadTeam' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativeFieldLeadTeam)

feat(schema): [non_breaking] Field 'color' was added to object type 'WorkflowDefinition' (WorkflowDefinition.color)

feat(schema): [non_breaking] Field 'icon' was added to object type 'WorkflowDefinition' (WorkflowDefinition.icon)