---
"@linear/sdk": minor
---


feat(schema): [dangerous] Default value for argument 'includeSubTeams' on field 'CustomView.projects' changed from 'false' to 'true' (CustomView.projects.includeSubTeams)

feat(schema): [dangerous] Input field 'customerVisibility' was added to input object type 'SlackAsksSettingsInput' (SlackAsksSettingsInput.customerVisibility)

feat(schema): [dangerous] Input field 'parent' was added to input object type 'TeamCollectionFilter' (TeamCollectionFilter.parent)

feat(schema): [non_breaking] Type 'CustomerVisibilityMode' was added (CustomerVisibilityMode)

feat(schema): [non_breaking] Field 'url' was added to object type 'Customer' (Customer.url)

feat(schema): [non_breaking] Field 'url' was added to object type 'CustomerWebhookPayload' (CustomerWebhookPayload.url)

feat(schema): [non_breaking] Field 'initiativeUpdates' was added to object type 'Initiative' (Initiative.initiativeUpdates)

feat(schema): [non_breaking] Field 'Organization.allowMembersToInvite' description changed from 'Whether member users are allowed to send invites.' to '[DEPRECATED] Whether member users are allowed to send invites.' (Organization.allowMembersToInvite)

feat(schema): [non_breaking] Field 'Organization.allowMembersToInvite' is deprecated (Organization.allowMembersToInvite)

feat(schema): [non_breaking] Field 'Organization.allowMembersToInvite' has deprecation reason 'Use `securitySettings.invitationsRole` instead.' (Organization.allowMembersToInvite)

feat(schema): [non_breaking] Field 'Organization.restrictLabelManagementToAdmins' description changed from 'Whether workspace label creation, update, and deletion is restricted to admins.' to '[DEPRECATED] Whether workspace label creation, update, and deletion is restricted to admins.' (Organization.restrictLabelManagementToAdmins)

feat(schema): [non_breaking] Field 'Organization.restrictLabelManagementToAdmins' is deprecated (Organization.restrictLabelManagementToAdmins)

feat(schema): [non_breaking] Field 'Organization.restrictLabelManagementToAdmins' has deprecation reason 'Use `securitySettings.labelManagementRole` instead.' (Organization.restrictLabelManagementToAdmins)

feat(schema): [non_breaking] Field 'Organization.restrictTeamCreationToAdmins' description changed from 'Whether team creation is restricted to admins.' to '[DEPRECATED] Whether team creation is restricted to admins.' (Organization.restrictTeamCreationToAdmins)

feat(schema): [non_breaking] Field 'Organization.restrictTeamCreationToAdmins' is deprecated (Organization.restrictTeamCreationToAdmins)

feat(schema): [non_breaking] Field 'Organization.restrictTeamCreationToAdmins' has deprecation reason 'Use `securitySettings.teamCreationRole` instead.' (Organization.restrictTeamCreationToAdmins)

feat(schema): [non_breaking] Field 'TeamMembership.owner' description changed from 'Whether the user is the owner of the team.' to 'Whether the user is an owner of the team.' (TeamMembership.owner)

feat(schema): [non_breaking] Input field 'TeamUpdateInput.autoCloseChildIssues' description changed from '[INTERNAL] Whether to automatically close all sub-issues when a parent issue in this team is closed.' to 'Whether to automatically close all sub-issues when a parent issue in this team is closed.' (TeamUpdateInput.autoCloseChildIssues)

feat(schema): [non_breaking] Input field 'TeamUpdateInput.autoCloseParentIssues' description changed from '[INTERNAL] Whether to automatically close a parent issue in this team if all its sub-issues are closed.' to 'Whether to automatically close a parent issue in this team if all its sub-issues are closed.' (TeamUpdateInput.autoCloseParentIssues)