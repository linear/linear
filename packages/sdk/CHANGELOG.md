# Change Log

## 1.12.1

### Patch Changes

- e3c045c: chore(deps): update dependency patch versions

## 1.12.0

### Minor Changes

- 8533968: feat(schema): [breaking] Field 'Invoice.created' changed type from 'TimelessDateScalar!' to 'DateTime!' (Invoice.created)

  feat(schema): [non_breaking] Type 'DependencyResponse' was added (DependencyResponse)

  feat(schema): [non_breaking] Field 'dependentModelSync' was added to object type 'Query' (Query.dependentModelSync)

  feat(schema): [non_breaking] Field 'Query.archivedModelSync' description changed from 'Fetches an archived model.' to '[Internal] Fetches an archived model.' (Query.archivedModelSync)

  feat(schema): [non_breaking] Field 'Query.archivedModelsSync' description changed from 'Fetches archived models.' to '[Internal] Fetches archived models.' (Query.archivedModelsSync)

  feat(schema): [non_breaking] Field 'Query.syncBootstrap' description changed from 'Fetch data to catch up the client to the state of the world.' to '[Internal] Fetch data to catch up the client to the state of the world.' (Query.syncBootstrap)

## 1.11.0

### Minor Changes

- 19a8db2: feat(schema): [non_breaking] Input field 'TeamCreateInput.key' description changed from 'The key of the team. If not given, rc key will be generated based on the name of the team.' to 'The key of the team. If not given, the key will be generated based on the name of the team.' (TeamCreateInput.key)
- b3d86d1: feat(schema): [breaking] Field 'IssueHistory.relationChanges' changed type from 'String' to '[IssueRelationHistoryPayload!]' (IssueHistory.relationChanges)

  feat(schema): [breaking] Field 'Query.pushSubscriptionTest' changed type from 'PushSubscriptionPayload!' to 'PushSubscriptionTestPayload!' (Query.pushSubscriptionTest)

  feat(schema): [dangerous] Argument 'id: String' added to field 'Mutation.issueImportCreateAsana' (Mutation.issueImportCreateAsana.id)

  feat(schema): [dangerous] Argument 'id: String' added to field 'Mutation.issueImportCreateClubhouse' (Mutation.issueImportCreateClubhouse.id)

  feat(schema): [dangerous] Argument 'id: String' added to field 'Mutation.issueImportCreateGithub' (Mutation.issueImportCreateGithub.id)

  feat(schema): [dangerous] Argument 'id: String' added to field 'Mutation.issueImportCreateJira' (Mutation.issueImportCreateJira.id)

  feat(schema): [dangerous] Input field 'startDate' was added to input object type 'ProjectCreateInput' (ProjectCreateInput.startDate)

  feat(schema): [dangerous] Input field 'startDate' was added to input object type 'ProjectUpdateInput' (ProjectUpdateInput.startDate)

  feat(schema): [non_breaking] Type 'IssueDescriptionHistory' was added (IssueDescriptionHistory)

  feat(schema): [non_breaking] Type 'IssueDescriptionHistoryPayload' was added (IssueDescriptionHistoryPayload)

  feat(schema): [non_breaking] Type 'IssueRelationHistoryPayload' was added (IssueRelationHistoryPayload)

  feat(schema): [non_breaking] Type 'PushSubscriptionTestPayload' was added (PushSubscriptionTestPayload)

  feat(schema): [non_breaking] Field 'autoArchivedAt' was added to object type 'Cycle' (Cycle.autoArchivedAt)

  feat(schema): [non_breaking] Field 'attachmentDelete' was added to object type 'Mutation' (Mutation.attachmentDelete)

  feat(schema): [non_breaking] Field 'attachmentLinkZendesk' was added to object type 'Mutation' (Mutation.attachmentLinkZendesk)

  feat(schema): [non_breaking] Field 'projectUnarchive' was added to object type 'Mutation' (Mutation.projectUnarchive)

  feat(schema): [non_breaking] Field 'Mutation.attachmentArchive' description changed from '[Alpha] Archives an issue attachment.' to '[DEPRECATED] Archives an issue attachment.' (Mutation.attachmentArchive)

  feat(schema): [non_breaking] Field 'Mutation.attachmentArchive' is deprecated (Mutation.attachmentArchive)

  feat(schema): [non_breaking] Field 'Mutation.attachmentArchive' has deprecation reason 'This mutation is deprecated, please use `attachmentDelete` instead' (Mutation.attachmentArchive)

  feat(schema): [non_breaking] Description for argument 'id' on field 'Mutation.attachmentArchive' changed from 'The identifier of the attachment to delete.' to 'The identifier of the attachment to archive.' (Mutation.attachmentArchive.id)

  feat(schema): [non_breaking] Field 'autoArchivedAt' was added to object type 'Project' (Project.autoArchivedAt)

  feat(schema): [non_breaking] Field 'startDate' was added to object type 'Project' (Project.startDate)

  feat(schema): [non_breaking] Field 'issueDescriptionHistory' was added to object type 'Query' (Query.issueDescriptionHistory)

### Patch Changes

- 387ff7f: chore(deps): update dependency patch versions

## 1.10.0

### Minor Changes

- 97809f0: feat(schema): [breaking] Field 'notificationDelete' was removed from object type 'Mutation' (Mutation.notificationDelete)

## 1.9.0

### Minor Changes

- 7a42d64: feat(schema): [breaking] Type 'OAuthTokenPayload' was removed (OAuthTokenPayload)
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
- 4976448: Change TimelessDateScalar from Date to string type

## 1.8.4

### Patch Changes

- 7e70161: fix(client): fix custom client headers and add test

## 1.8.3

### Patch Changes

- 7bf0153: chore(release): use npm token from secrets

## 1.8.2

### Patch Changes

- 111595f: chore(publish): use changeset access public

## 1.8.1

### Patch Changes

- 867d226: chore(release): bump changeset
- 80561d9: chore(release): fix release environment

## 1.8.0

### Minor Changes

- 302b0e2: feat(sdk): update schema

### Patch Changes

- 47cdc52: chore(test): add jest fake timers
- f384cdb: Bump changeset

## 1.7.0

### Minor Changes

- 8875ff0: Remove graphql-request dependency

## 1.6.5

### Patch Changes

- f937b3c: Replace process.env for umd builds

## 1.6.4

### Patch Changes

- 021c972: Add umd output for sdk

## 1.6.3

### Patch Changes

- 66d320b: Update readme

## 1.6.2

### Patch Changes

- a92d49c: Add mutation models to readme

## 1.6.1

### Patch Changes

- bf7fed1: Add import issue delete

## 1.6.0

### Minor Changes

- bcec326: Add mutations to models

### Patch Changes

- 104f54f: Update to master

## 1.5.3

### Patch Changes

- Update readmes

## 1.5.2

### Patch Changes

- Update import from deprecated repo

## 1.5.1

### Patch Changes

- Update custom scalars to use non-any types

## 1.5.0

### Minor Changes

- Update schema to add attachments
  Fix query discovery to use matching name if available
  Add date and json parsing
  Add tests for parsing

## 1.4.6

### Patch Changes

- Update schema adding attachments

## 1.4.5

### Patch Changes

- Add link from auth error to api settings

## 1.4.4

### Patch Changes

- Update dependencies for tsc resolution

## 1.4.3

### Patch Changes

- Package dependencies with build output

## 1.4.2

### Patch Changes

- Bump packages

## 1.4.1

### Patch Changes

- Add changeset

## 1.4.0

### Minor Changes

- a24f725: Test release action

### Patch Changes

- 25e40c8: Test bump
- b36cd12: Test changeset action
- bc1394a: Remove local dependency
- ab58795: Test bump

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.3.1](https://github.com/linear/linear/compare/v1.3.0...v1.3.1) (2021-02-15)

**Note:** Version bump only for package @linear/sdk

# 1.3.0 (2021-02-15)

### Bug Fixes

- **error:** split error into many constructors ([9a68e93](https://github.com/linear/linear/commit/9a68e93aeb8d2a41e91a054ca2648d788fc1583e))
- **sdk:** apply parent variables to nested sdk queries ([3458ebf](https://github.com/linear/linear/commit/3458ebf5cee10066bbe93f0af1d0fe718d971ac9))
- **sdk:** remove get from connection helpers ([ae48d89](https://github.com/linear/linear/commit/ae48d89e80be1fafe4a4d94022eb71a1b365ff4d))

### Features

- **schema:** update schema ([2b4e044](https://github.com/linear/linear/commit/2b4e0448bc8996c25cfa185ece6c5efe1ee20ca9))
- **schema:** update schema ([7ba67e1](https://github.com/linear/linear/commit/7ba67e16654623cc5b352a2dcf9d6df8758f0a15))
- **sdk:** merge client and sdk packages ([ba1dcf5](https://github.com/linear/linear/commit/ba1dcf5b93c719ab5676e73260744ef727a9dcdb))

## [1.1.5](https://github.com/linear/linear/compare/@linear/sdk@1.1.4...@linear/sdk@1.1.5) (2021-02-12)

**Note:** Version bump only for package @linear/sdk

## [1.1.4](https://github.com/linear/linear/compare/@linear/sdk@1.1.3...@linear/sdk@1.1.4) (2021-02-12)

**Note:** Version bump only for package @linear/sdk

## [1.1.3](https://github.com/linear/linear/compare/@linear/sdk@1.1.2...@linear/sdk@1.1.3) (2021-02-12)

**Note:** Version bump only for package @linear/sdk

## [1.1.2](https://github.com/linear/linear/compare/@linear/sdk@1.1.0...@linear/sdk@1.1.2) (2021-02-12)

**Note:** Version bump only for package @linear/sdk

# 1.1.0 (2021-02-12)

### Bug Fixes

- **error:** split error into many constructors ([9a68e93](https://github.com/linear/linear/commit/9a68e93aeb8d2a41e91a054ca2648d788fc1583e))
- **sdk:** apply parent variables to nested sdk queries ([3458ebf](https://github.com/linear/linear/commit/3458ebf5cee10066bbe93f0af1d0fe718d971ac9))
- **sdk:** remove get from connection helpers ([ae48d89](https://github.com/linear/linear/commit/ae48d89e80be1fafe4a4d94022eb71a1b365ff4d))

### Features

- **schema:** update schema ([7ba67e1](https://github.com/linear/linear/commit/7ba67e16654623cc5b352a2dcf9d6df8758f0a15))
