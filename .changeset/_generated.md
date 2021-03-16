---
"@linear/sdk": minor
---
  
feat(schema): [breaking] Type 'OAuthTokenPayload' was removed (OAuthTokenPayload)
feat(schema): [breaking] Field 'Query.issueImportFinishGithubOAuth' changed type from 'OAuthTokenPayload!' to 'GithubOAuthTokenPayload!' (Query.issueImportFinishGithubOAuth)
feat(schema): [dangerous] Argument 'instantProcess: Boolean' added to field 'Mutation.issueImportCreateAsana' (Mutation.issueImportCreateAsana.instantProcess)
feat(schema): [dangerous] Argument 'instantProcess: Boolean' added to field 'Mutation.issueImportCreateClubhouse' (Mutation.issueImportCreateClubhouse.instantProcess)
feat(schema): [dangerous] Argument 'instantProcess: Boolean' added to field 'Mutation.issueImportCreateGithub' (Mutation.issueImportCreateGithub.instantProcess)
feat(schema): [dangerous] Argument 'instantProcess: Boolean' added to field 'Mutation.issueImportCreateJira' (Mutation.issueImportCreateJira.instantProcess)
feat(schema): [dangerous] Input field 'userId' was added to input object type 'ViewPreferencesCreateInput' (ViewPreferencesCreateInput.userId)
feat(schema): [dangerous] Enum value 'userProfile' was added to enum 'ViewType' (ViewType.userProfile)
feat(schema): [non_breaking] Type 'GithubOAuthTokenPayload' was added (GithubOAuthTokenPayload)
feat(schema): [non_breaking] Type 'IssueImportMappingInput' was added (IssueImportMappingInput)
feat(schema): [non_breaking] Field 'GithubOrg.id' description changed from 'GitHub org's id.' to 'GitHub organization id.' (GithubOrg.id)
feat(schema): [non_breaking] Field 'GithubOrg.login' description changed from 'The login for the GitHub org.' to 'The login for the GitHub organization.' (GithubOrg.login)
feat(schema): [non_breaking] Field 'GithubOrg.name' description changed from 'The name of the GitHub org.' to 'The name of the GitHub organization.' (GithubOrg.name)
feat(schema): [non_breaking] Field 'GithubOrg.repositories' description changed from 'Repositories that the org owns.' to 'Repositories that the organization owns.' (GithubOrg.repositories)
feat(schema): [non_breaking] Field 'mapping' was added to object type 'IssueImport' (IssueImport.mapping)
feat(schema): [non_breaking] Field 'issueImportProcess' was added to object type 'Mutation' (Mutation.issueImportProcess)
feat(schema): [non_breaking] Description 'How trashed issues should be loaded.' on type 'TrashOptionType' has changed to 'How trashed models should be loaded.' (TrashOptionType)