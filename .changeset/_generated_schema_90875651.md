---
"@linear/sdk": major
---


feat(schema): [breaking] Argument 'codeVerifier: String!' added to field 'Mutation.integrationSalesforce' (Mutation.integrationSalesforce.codeVerifier)

feat(schema): [breaking] Input field 'aiProviderConfiguration' was removed from input object type 'OrganizationUpdateInput' (OrganizationUpdateInput.aiProviderConfiguration)

feat(schema): [dangerous] Input field 'team' was added to input object type 'DocumentFilter' (DocumentFilter.team)

feat(schema): [dangerous] Input field 'useRestPrSync' was added to input object type 'GitLabSettingsInput' (GitLabSettingsInput.useRestPrSync)

feat(schema): [dangerous] Input field 'validationProjectPath' was added to input object type 'GitLabSettingsInput' (GitLabSettingsInput.validationProjectPath)

feat(schema): [dangerous] Argument 'expiresAt: String' added to field 'Mutation.integrationGitlabConnect' (Mutation.integrationGitlabConnect.expiresAt)

feat(schema): [dangerous] Argument 'readonly: Boolean' added to field 'Mutation.integrationGitlabConnect' (Mutation.integrationGitlabConnect.readonly)

feat(schema): [dangerous] Argument 'validationProjectPath: String' added to field 'Mutation.integrationGitlabConnect' (Mutation.integrationGitlabConnect.validationProjectPath)

feat(schema): [dangerous] Argument 'sort: [DocumentSortInput!]' added to field 'Query.documents' (Query.documents.sort)

feat(schema): [dangerous] Input field 'completedAt' was added to input object type 'ReleaseCreateInput' (ReleaseCreateInput.completedAt)

feat(schema): [dangerous] Input field 'createdAt' was added to input object type 'ReleaseCreateInput' (ReleaseCreateInput.createdAt)

feat(schema): [dangerous] Input field 'startedAt' was added to input object type 'ReleaseCreateInput' (ReleaseCreateInput.startedAt)

feat(schema): [dangerous] Input field 'completedAt' was added to input object type 'ReleaseUpdateInput' (ReleaseUpdateInput.completedAt)

feat(schema): [dangerous] Input field 'startedAt' was added to input object type 'ReleaseUpdateInput' (ReleaseUpdateInput.startedAt)

feat(schema): [dangerous] Input field 'scimGroupName' was added to input object type 'TeamUpdateInput' (TeamUpdateInput.scimGroupName)

feat(schema): [dangerous] Enum value 'schedule' was added to enum 'WorkflowTriggerType' (WorkflowTriggerType.schedule)

feat(schema): [non_breaking] Type 'DocumentCreatedAtSort' was added (DocumentCreatedAtSort)

feat(schema): [non_breaking] Type 'DocumentCreatorSort' was added (DocumentCreatorSort)

feat(schema): [non_breaking] Type 'DocumentProjectSort' was added (DocumentProjectSort)

feat(schema): [non_breaking] Type 'DocumentSortInput' was added (DocumentSortInput)

feat(schema): [non_breaking] Type 'DocumentTitleSort' was added (DocumentTitleSort)

feat(schema): [non_breaking] Type 'DocumentUpdatedAtSort' was added (DocumentUpdatedAtSort)

feat(schema): [non_breaking] Type 'ViewPreferencesInitiativeLabelGroupColumn' was added (ViewPreferencesInitiativeLabelGroupColumn)

feat(schema): [non_breaking] Type 'WorkflowCronJobDefinition' was added (WorkflowCronJobDefinition)

feat(schema): [non_breaking] Field 'workflowCronJobDefinition' was added to object type 'AiConversation' (AiConversation.workflowCronJobDefinition)

feat(schema): [non_breaking] Field 'Document.release' description changed from '[Internal] The release that the document is associated with. Null if the document belongs to a different parent entity type.' to 'The release that the document is associated with. Null if the document belongs to a different parent entity type.' (Document.release)

feat(schema): [non_breaking] Input field 'DocumentCreateInput.releaseId' description changed from '[Internal] Related release for the document.' to 'Related release for the document.' (DocumentCreateInput.releaseId)

feat(schema): [non_breaking] Field 'DocumentSearchResult.release' description changed from '[Internal] The release that the document is associated with. Null if the document belongs to a different parent entity type.' to 'The release that the document is associated with. Null if the document belongs to a different parent entity type.' (DocumentSearchResult.release)

feat(schema): [non_breaking] Input field 'DocumentUpdateInput.releaseId' description changed from '[Internal] Related release for the document.' to 'Related release for the document.' (DocumentUpdateInput.releaseId)

feat(schema): [non_breaking] Input field 'EntityExternalLinkCreateInput.releaseId' description changed from '[Internal] The release associated with the link.' to 'The release associated with the link.' (EntityExternalLinkCreateInput.releaseId)

feat(schema): [non_breaking] Field 'Favorite.release' description changed from '[ALPHA] The favorited release.' to 'The favorited release.' (Favorite.release)

feat(schema): [non_breaking] Field 'Favorite.releasePipeline' description changed from '[ALPHA] The favorited release pipeline.' to 'The favorited release pipeline.' (Favorite.releasePipeline)

feat(schema): [non_breaking] Input field 'FavoriteCreateInput.releaseId' description changed from '[ALPHA] The identifier of the release to favorite.' to 'The identifier of the release to favorite.' (FavoriteCreateInput.releaseId)

feat(schema): [non_breaking] Input field 'FavoriteCreateInput.releasePipelineId' description changed from '[ALPHA] The identifier of the release pipeline to favorite.' to 'The identifier of the release pipeline to favorite.' (FavoriteCreateInput.releasePipelineId)

feat(schema): [non_breaking] Field 'errorRequest' was added to object type 'GitLabIntegrationCreatePayload' (GitLabIntegrationCreatePayload.errorRequest)

feat(schema): [non_breaking] Field 'errorRequest' was added to object type 'GitLabTestConnectionPayload' (GitLabTestConnectionPayload.errorRequest)

feat(schema): [non_breaking] Field 'Issue.releases' description changed from '[ALPHA] Releases associated with the issue.' to 'Releases associated with the issue.' (Issue.releases)

feat(schema): [non_breaking] Input field 'IssueCollectionFilter.releases' description changed from '[ALPHA] Filters that the issue's releases must satisfy.' to 'Filters that the issue's releases must satisfy.' (IssueCollectionFilter.releases)

feat(schema): [non_breaking] Input field 'IssueCreateInput.releaseIds' description changed from '[ALPHA] The identifiers of the releases to associate with this issue.' to 'The identifiers of the releases to associate with this issue.' (IssueCreateInput.releaseIds)

feat(schema): [non_breaking] Input field 'IssueFilter.releases' description changed from '[ALPHA] Filters that the issue's releases must satisfy.' to 'Filters that the issue's releases must satisfy.' (IssueFilter.releases)

feat(schema): [non_breaking] Field 'IssueHistory.addedToReleaseIds' description changed from '[ALPHA] ID's of releases that the issue was added to.' to 'ID's of releases that the issue was added to.' (IssueHistory.addedToReleaseIds)

feat(schema): [non_breaking] Field 'IssueHistory.removedFromReleaseIds' description changed from '[ALPHA] ID's of releases that the issue was removed from.' to 'ID's of releases that the issue was removed from.' (IssueHistory.removedFromReleaseIds)

feat(schema): [non_breaking] Field 'IssueSearchResult.releases' description changed from '[ALPHA] Releases associated with the issue.' to 'Releases associated with the issue.' (IssueSearchResult.releases)

feat(schema): [non_breaking] Input field 'IssueSortInput.release' description changed from '[ALPHA] Sort by most recent release date' to 'Sort by most recent release date' (IssueSortInput.release)

feat(schema): [non_breaking] Description '[Internal] A join entity linking an issue to a release for release tracking. Each record represents an association between a single issue and a single release, along with metadata about the source of the link (e.g., which pull requests connected the issue to the release). Creating or deleting these associations automatically records the change in issue history.' on type 'IssueToRelease' has changed to 'A join entity linking an issue to a release for release tracking. Each record represents an association between a single issue and a single release, along with metadata about the source of the link (e.g., which pull requests connected the issue to the release). Creating or deleting these associations automatically records the change in issue history.' (IssueToRelease)

feat(schema): [non_breaking] Description '[ALPHA] Input for creating a new association between an issue and a release. Both an issue identifier and a release identifier must be provided.' on type 'IssueToReleaseCreateInput' has changed to 'Input for creating a new association between an issue and a release. Both an issue identifier and a release identifier must be provided.' (IssueToReleaseCreateInput)

feat(schema): [non_breaking] Description '[ALPHA] The result of an issue-to-release mutation, containing the created or updated association and a success indicator.' on type 'IssueToReleasePayload' has changed to 'The result of an issue-to-release mutation, containing the created or updated association and a success indicator.' (IssueToReleasePayload)

feat(schema): [non_breaking] Field 'Mutation.issueToReleaseCreate' description changed from '[ALPHA] Creates a new association between an issue and a release, linking the issue to the release for tracking purposes.' to 'Creates a new association between an issue and a release, linking the issue to the release for tracking purposes.' (Mutation.issueToReleaseCreate)

feat(schema): [non_breaking] Field 'Mutation.issueToReleaseDelete' description changed from '[ALPHA] Deletes an issue-to-release association by its identifier, removing the issue from the release.' to 'Deletes an issue-to-release association by its identifier, removing the issue from the release.' (Mutation.issueToReleaseDelete)

feat(schema): [non_breaking] Field 'Mutation.issueToReleaseDeleteByIssueAndRelease' description changed from '[ALPHA] Deletes an issue-to-release association by looking up the issue and release identifiers, removing the issue from the release.' to 'Deletes an issue-to-release association by looking up the issue and release identifiers, removing the issue from the release.' (Mutation.issueToReleaseDeleteByIssueAndRelease)

feat(schema): [non_breaking] Field 'Mutation.releaseArchive' description changed from '[ALPHA] Archives a release.' to 'Archives a release.' (Mutation.releaseArchive)

feat(schema): [non_breaking] Field 'Mutation.releaseComplete' description changed from '[ALPHA] Marks a release as completed. If version is provided, completes that specific release; otherwise completes the most recent started release.' to 'Marks a release as completed. If version is provided, completes that specific release; otherwise completes the most recent started release.' (Mutation.releaseComplete)

feat(schema): [non_breaking] Field 'Mutation.releaseCompleteByAccessKey' description changed from '[ALPHA] Marks a release as completed using an access key. If version is provided, completes that specific release; otherwise completes the most recent started release. The pipeline is inferred from the access key.' to 'Marks a release as completed using an access key. If version is provided, completes that specific release; otherwise completes the most recent started release. The pipeline is inferred from the access key.' (Mutation.releaseCompleteByAccessKey)

feat(schema): [non_breaking] Field 'Mutation.releaseCreate' description changed from '[ALPHA] Creates a new release in a pipeline. If no stage is specified, defaults to the first completed stage for continuous pipelines or the first started stage for scheduled pipelines.' to 'Creates a new release in a pipeline. If no stage is specified, defaults to the first completed stage for continuous pipelines or the first started stage for scheduled pipelines.' (Mutation.releaseCreate)

feat(schema): [non_breaking] Field 'Mutation.releaseDelete' description changed from '[ALPHA] Moves a release to the trash bin. Trashed releases are archived and will be permanently deleted after a retention period. If the release is already archived, it is marked as trashed with a fresh archive timestamp.' to 'Moves a release to the trash bin. Trashed releases are archived and will be permanently deleted after a retention period. If the release is already archived, it is marked as trashed with a fresh archive timestamp.' (Mutation.releaseDelete)

feat(schema): [non_breaking] Field 'Mutation.releaseNoteCreate' description changed from '[ALPHA] Creates a release note.' to 'Creates a release note.' (Mutation.releaseNoteCreate)

feat(schema): [non_breaking] Field 'Mutation.releaseNoteDelete' description changed from '[ALPHA] Deletes a release note.' to 'Deletes a release note.' (Mutation.releaseNoteDelete)

feat(schema): [non_breaking] Field 'Mutation.releaseNoteUpdate' description changed from '[ALPHA] Updates a release note.' to 'Updates a release note.' (Mutation.releaseNoteUpdate)

feat(schema): [non_breaking] Field 'Mutation.releasePipelineArchive' description changed from '[ALPHA] Archives a release pipeline.' to 'Archives a release pipeline.' (Mutation.releasePipelineArchive)

feat(schema): [non_breaking] Field 'Mutation.releasePipelineCreate' description changed from '[ALPHA] Creates a new release pipeline with default stages. Subject to plan entitlement and quota limits.' to 'Creates a new release pipeline with default stages. Subject to plan entitlement and quota limits.' (Mutation.releasePipelineCreate)

feat(schema): [non_breaking] Field 'Mutation.releasePipelineDelete' description changed from '[ALPHA] Permanently deletes a release pipeline and all associated stages and releases.' to 'Permanently deletes a release pipeline and all associated stages and releases.' (Mutation.releasePipelineDelete)

feat(schema): [non_breaking] Field 'Mutation.releasePipelineUnarchive' description changed from '[ALPHA] Unarchives a release pipeline.' to 'Unarchives a release pipeline.' (Mutation.releasePipelineUnarchive)

feat(schema): [non_breaking] Field 'Mutation.releasePipelineUpdate' description changed from '[ALPHA] Updates an existing release pipeline. Supports updating name, slug, type, production flag, path patterns, and team associations. Private teams that the current user cannot access are preserved in the team list.' to 'Updates an existing release pipeline. Supports updating name, slug, type, production flag, path patterns, and team associations. Private teams that the current user cannot access are preserved in the team list.' (Mutation.releasePipelineUpdate)

feat(schema): [non_breaking] Field 'Mutation.releaseStageArchive' description changed from '[ALPHA] Archives a release stage. Only started-type stages can be archived, and only if they have no active releases and at least one other stage of the same type remains. Cannot archive the last non-frozen started stage.' to 'Archives a release stage. Only started-type stages can be archived, and only if they have no active releases and at least one other stage of the same type remains. Cannot archive the last non-frozen started stage.' (Mutation.releaseStageArchive)

feat(schema): [non_breaking] Field 'Mutation.releaseStageCreate' description changed from '[ALPHA] Creates a new release stage in a pipeline. Non-started stages must use default names and colors, and only one stage of each non-started type is allowed per pipeline. Started stages can optionally be frozen, but at least one non-frozen started stage must remain.' to 'Creates a new release stage in a pipeline. Non-started stages must use default names and colors, and only one stage of each non-started type is allowed per pipeline. Started stages can optionally be frozen, but at least one non-frozen started stage must remain.' (Mutation.releaseStageCreate)

feat(schema): [non_breaking] Field 'Mutation.releaseStageUnarchive' description changed from '[ALPHA] Unarchives a release stage.' to 'Unarchives a release stage.' (Mutation.releaseStageUnarchive)

feat(schema): [non_breaking] Field 'Mutation.releaseStageUpdate' description changed from '[ALPHA] Updates an existing release stage. Only started-type stages can be edited. Supports updating name, color, position, and frozen status.' to 'Updates an existing release stage. Only started-type stages can be edited. Supports updating name, color, position, and frozen status.' (Mutation.releaseStageUpdate)

feat(schema): [non_breaking] Field 'Mutation.releaseSync' description changed from '[ALPHA] Syncs release data by resolving issue and pull request references and associating them with a release. For continuous pipelines, creates a new completed release. For scheduled pipelines, finds or creates a started release and accumulates issues into it.' to 'Syncs release data by resolving issue and pull request references and associating them with a release. For continuous pipelines, creates a new completed release. For scheduled pipelines, finds or creates a started release and accumulates issues into it.' (Mutation.releaseSync)

feat(schema): [non_breaking] Field 'Mutation.releaseSyncByAccessKey' description changed from '[ALPHA] Syncs release data using an access key for CI/CD integration. The pipeline is automatically inferred from the access key's configured resources, so no pipeline ID is needed in the input.' to 'Syncs release data using an access key for CI/CD integration. The pipeline is automatically inferred from the access key's configured resources, so no pipeline ID is needed in the input.' (Mutation.releaseSyncByAccessKey)

feat(schema): [non_breaking] Field 'Mutation.releaseUnarchive' description changed from '[ALPHA] Unarchives a release.' to 'Unarchives a release.' (Mutation.releaseUnarchive)

feat(schema): [non_breaking] Field 'Mutation.releaseUpdate' description changed from '[ALPHA] Updates an existing release by ID. Supports updating name, description, version, commit SHA, pipeline, stage, and dates.' to 'Updates an existing release by ID. Supports updating name, description, version, commit SHA, pipeline, stage, and dates.' (Mutation.releaseUpdate)

feat(schema): [non_breaking] Field 'Mutation.releaseUpdateByPipeline' description changed from '[ALPHA] Updates a release by pipeline identifier. Finds the release by version or latest started/planned release, and optionally transitions it to a new stage by name.' to 'Updates a release by pipeline identifier. Finds the release by version or latest started/planned release, and optionally transitions it to a new stage by name.' (Mutation.releaseUpdateByPipeline)

feat(schema): [non_breaking] Field 'Mutation.releaseUpdateByPipelineByAccessKey' description changed from '[ALPHA] Updates a release by pipeline using an access key.' to 'Updates a release by pipeline using an access key.' (Mutation.releaseUpdateByPipelineByAccessKey)

feat(schema): [non_breaking] Input field 'NullableIssueFilter.releases' description changed from '[ALPHA] Filters that the issue's releases must satisfy.' to 'Filters that the issue's releases must satisfy.' (NullableIssueFilter.releases)

feat(schema): [non_breaking] Input field 'NullableTeamFilter.releasePipelines' description changed from '[ALPHA] Filters that the team's release pipelines must satisfy.' to 'Filters that the team's release pipelines must satisfy.' (NullableTeamFilter.releasePipelines)

feat(schema): [non_breaking] Field 'Organization.releasesEnabled' description changed from '[Internal] Whether release management is enabled for the workspace.' to 'Whether release management is enabled for the workspace.' (Organization.releasesEnabled)

feat(schema): [non_breaking] Field 'Query.issueToRelease' description changed from '[ALPHA] One specific issue-to-release association, looked up by its unique identifier.' to 'One specific issue-to-release association, looked up by its unique identifier.' (Query.issueToRelease)

feat(schema): [non_breaking] Field 'Query.issueToReleases' description changed from '[ALPHA] All issue-to-release associations. Returns a paginated list of all issue-to-release links visible to the authenticated user.' to 'All issue-to-release associations. Returns a paginated list of all issue-to-release links visible to the authenticated user.' (Query.issueToReleases)

feat(schema): [non_breaking] Field 'Query.latestReleaseByAccessKey' description changed from '[ALPHA] Returns the latest release for the pipeline associated with the access key.' to 'Returns the latest release for the pipeline associated with the access key.' (Query.latestReleaseByAccessKey)

feat(schema): [non_breaking] Field 'Query.release' description changed from '[ALPHA] Fetch a single release by its UUID or slug identifier.' to 'Fetch a single release by its UUID or slug identifier.' (Query.release)

feat(schema): [non_breaking] Field 'Query.releaseNote' description changed from '[ALPHA] Fetch a release note by its UUID or slug identifier.' to 'Fetch a release note by its UUID or slug identifier.' (Query.releaseNote)

feat(schema): [non_breaking] Field 'Query.releaseNotes' description changed from '[ALPHA] Release notes in the workspace.' to 'Release notes in the workspace.' (Query.releaseNotes)

feat(schema): [non_breaking] Field 'Query.releasePipeline' description changed from '[ALPHA] Fetch a single release pipeline by its UUID or slug identifier.' to 'Fetch a single release pipeline by its UUID or slug identifier.' (Query.releasePipeline)

feat(schema): [non_breaking] Field 'Query.releasePipelineByAccessKey' description changed from '[ALPHA] Returns a release pipeline by ID. Requires the access key to have access to the pipeline.' to 'Returns a release pipeline by ID. Requires the access key to have access to the pipeline.' (Query.releasePipelineByAccessKey)

feat(schema): [non_breaking] Field 'Query.releasePipelines' description changed from '[ALPHA] All release pipelines in the workspace, with optional filtering and sorting.' to 'All release pipelines in the workspace, with optional filtering and sorting.' (Query.releasePipelines)

feat(schema): [non_breaking] Description for argument 'sort' on field 'Query.releasePipelines' changed from '[ALPHA] Sort returned release pipelines.' to 'Sort returned release pipelines.' (Query.releasePipelines.sort)

feat(schema): [non_breaking] Field 'Query.releaseSearch' description changed from '[ALPHA] Search releases with optional text matching against name, version, and pipeline name. When no search term is provided, returns releases ordered by stage priority (started > planned > completed > canceled).' to 'Search releases with optional text matching against name, version, and pipeline name. When no search term is provided, returns releases ordered by stage priority (started > planned > completed > canceled).' (Query.releaseSearch)

feat(schema): [non_breaking] Field 'Query.releaseStage' description changed from '[ALPHA] Fetch a single release stage by its UUID.' to 'Fetch a single release stage by its UUID.' (Query.releaseStage)

feat(schema): [non_breaking] Field 'Query.releaseStages' description changed from '[ALPHA] All release stages in the workspace, with optional filtering.' to 'All release stages in the workspace, with optional filtering.' (Query.releaseStages)

feat(schema): [non_breaking] Field 'Query.releases' description changed from '[ALPHA] All releases in the workspace, with optional filtering and sorting.' to 'All releases in the workspace, with optional filtering and sorting.' (Query.releases)

feat(schema): [non_breaking] Description for argument 'sort' on field 'Query.releases' changed from '[ALPHA] Sort returned releases.' to 'Sort returned releases.' (Query.releases.sort)

feat(schema): [non_breaking] Field 'Release.currentProgress' description changed from '[Internal] The current progress summary for the release, including counts of issues by workflow state type (e.g., completed, in progress, unstarted).' to 'The current progress summary for the release, including counts of issues by workflow state type (e.g., completed, in progress, unstarted).' (Release.currentProgress)

feat(schema): [non_breaking] Field 'Release.documents' description changed from '[Internal] Documents associated with the release.' to 'Documents associated with the release.' (Release.documents)

feat(schema): [non_breaking] Field 'Release.history' description changed from '[Internal] History entries associated with the release.' to 'History entries associated with the release.' (Release.history)

feat(schema): [non_breaking] Field 'Release.issueCount' description changed from '[ALPHA] Number of issues associated with the release.' to 'Number of issues associated with the release.' (Release.issueCount)

feat(schema): [non_breaking] Field 'Release.issues' description changed from '[ALPHA] Issues associated with the release.' to 'Issues associated with the release.' (Release.issues)

feat(schema): [non_breaking] Field 'Release.links' description changed from '[Internal] Links associated with the release.' to 'Links associated with the release.' (Release.links)

feat(schema): [non_breaking] Field 'Release.progressHistory' description changed from '[Internal] The historical progress snapshots for the release, tracking how issue completion has evolved over time.' to 'The historical progress snapshots for the release, tracking how issue completion has evolved over time.' (Release.progressHistory)

feat(schema): [non_breaking] Field 'Release.releaseNotes' description changed from '[ALPHA] Release notes for the release.' to 'Release notes for the release.' (Release.releaseNotes)

feat(schema): [non_breaking] Description '[Internal] A release that bundles issues together for a software deployment or version. Releases belong to a release pipeline and progress through stages (e.g., planned, started, completed, canceled). Issues are associated with releases via the IssueToRelease join entity, and the release tracks lifecycle timestamps such as when it was started, completed, or canceled.' on type 'Release' has changed to 'A release that bundles issues together for a software deployment or version. Releases belong to a release pipeline and progress through stages (e.g., planned, started, completed, canceled). Issues are associated with releases via the IssueToRelease join entity, and the release tracks lifecycle timestamps such as when it was started, completed, or canceled.' (Release)

feat(schema): [non_breaking] Description '[ALPHA] Release collection filtering options.' on type 'ReleaseCollectionFilter' has changed to 'Release collection filtering options.' (ReleaseCollectionFilter)

feat(schema): [non_breaking] Description '[ALPHA] Release filtering options.' on type 'ReleaseFilter' has changed to 'Release filtering options.' (ReleaseFilter)

feat(schema): [non_breaking] Description '[Internal] A release history record containing a batch of chronologically ordered change events for a release. Each record holds up to 30 entries, and new records are created once the current record is full and a time window has elapsed. Tracks changes to name, description, version, stage, dates, pipeline, and archive status.' on type 'ReleaseHistory' has changed to 'A release history record containing a batch of chronologically ordered change events for a release. Each record holds up to 30 entries, and new records are created once the current record is full and a time window has elapsed. Tracks changes to name, description, version, stage, dates, pipeline, and archive status.' (ReleaseHistory)

feat(schema): [non_breaking] Field 'ReleaseNote.documentContent' description changed from '[Internal] Document content backing the release note body.' to 'Document content backing the release note body.' (ReleaseNote.documentContent)

feat(schema): [non_breaking] Field 'ReleaseNote.releases' description changed from '[ALPHA] Releases included in the note.' to 'Releases included in the note.' (ReleaseNote.releases)

feat(schema): [non_breaking] Field 'ReleaseNote.title' description changed from '[ALPHA] User-supplied title for the release note.' to 'User-supplied title for the release note.' (ReleaseNote.title)

feat(schema): [non_breaking] Description '[Internal] A release note. The note body is stored in related document content, and the releases it covers are tracked in releaseIds.' on type 'ReleaseNote' has changed to 'A release note. The note body is stored in related document content, and the releases it covers are tracked in releaseIds.' (ReleaseNote)

feat(schema): [non_breaking] Description '[ALPHA] Input for creating a release note.' on type 'ReleaseNoteCreateInput' has changed to 'Input for creating a release note.' (ReleaseNoteCreateInput)

feat(schema): [non_breaking] Description '[ALPHA] The result of a release note mutation.' on type 'ReleaseNotePayload' has changed to 'The result of a release note mutation.' (ReleaseNotePayload)

feat(schema): [non_breaking] Description '[ALPHA] Input for updating a release note.' on type 'ReleaseNoteUpdateInput' has changed to 'Input for updating a release note.' (ReleaseNoteUpdateInput)

feat(schema): [non_breaking] Field 'ReleasePipeline.approximateReleaseCount' description changed from '[ALPHA] The approximate number of non-archived releases in this pipeline. This is a denormalized count that is updated when releases are created or archived, and may not reflect the exact count at all times.' to 'The approximate number of non-archived releases in this pipeline. This is a denormalized count that is updated when releases are created or archived, and may not reflect the exact count at all times.' (ReleasePipeline.approximateReleaseCount)

feat(schema): [non_breaking] Field 'ReleasePipeline.isProduction' description changed from '[ALPHA] Whether this pipeline targets a production environment. Defaults to true. Used to distinguish production pipelines from staging or development pipelines.' to 'Whether this pipeline targets a production environment. Defaults to true. Used to distinguish production pipelines from staging or development pipelines.' (ReleasePipeline.isProduction)

feat(schema): [non_breaking] Field 'ReleasePipeline.releaseNoteTemplate' description changed from '[Internal] The document template used to define the release notes format for this pipeline. AI-generated release notes follow the structure and tone of this template. Null if no template has been configured.' to 'The document template used to define the release notes format for this pipeline. AI-generated release notes follow the structure and tone of this template. Null if no template has been configured.' (ReleasePipeline.releaseNoteTemplate)

feat(schema): [non_breaking] Field 'ReleasePipeline.releases' description changed from '[ALPHA] Releases associated with this pipeline.' to 'Releases associated with this pipeline.' (ReleasePipeline.releases)

feat(schema): [non_breaking] Description for argument 'sort' on field 'ReleasePipeline.releases' changed from '[ALPHA] Sort returned releases.' to 'Sort returned releases.' (ReleasePipeline.releases.sort)

feat(schema): [non_breaking] Field 'ReleasePipeline.stages' description changed from '[ALPHA] Stages associated with this pipeline.' to 'Stages associated with this pipeline.' (ReleasePipeline.stages)

feat(schema): [non_breaking] Field 'ReleasePipeline.teams' description changed from '[ALPHA] Teams associated with this pipeline.' to 'Teams associated with this pipeline.' (ReleasePipeline.teams)

feat(schema): [non_breaking] Field 'ReleasePipeline.url' description changed from '[Internal] The URL to the release pipeline's releases list in the Linear app.' to 'The URL to the release pipeline's releases list in the Linear app.' (ReleasePipeline.url)

feat(schema): [non_breaking] Description '[Internal] A release pipeline that defines a release workflow with ordered stages. Pipelines can be continuous (each sync creates a completed release) or scheduled (issues accumulate in a started release that is explicitly completed). Pipelines are associated with teams and can filter commits by file path patterns.' on type 'ReleasePipeline' has changed to 'A release pipeline that defines a release workflow with ordered stages. Pipelines can be continuous (each sync creates a completed release) or scheduled (issues accumulate in a started release that is explicitly completed). Pipelines are associated with teams and can filter commits by file path patterns.' (ReleasePipeline)

feat(schema): [non_breaking] Description '[ALPHA] Release pipeline collection filtering options.' on type 'ReleasePipelineCollectionFilter' has changed to 'Release pipeline collection filtering options.' (ReleasePipelineCollectionFilter)

feat(schema): [non_breaking] Description '[ALPHA] Release pipeline filtering options.' on type 'ReleasePipelineFilter' has changed to 'Release pipeline filtering options.' (ReleasePipelineFilter)

feat(schema): [non_breaking] Description '[Internal] Issue release sorting options.' on type 'ReleaseSort' has changed to 'Issue release sorting options.' (ReleaseSort)

feat(schema): [non_breaking] Field 'ReleaseStage.releases' description changed from '[ALPHA] Releases associated with this stage.' to 'Releases associated with this stage.' (ReleaseStage.releases)

feat(schema): [non_breaking] Description '[Internal] A stage within a release pipeline that represents a phase in the release lifecycle (e.g., Planned, In Progress, Completed, Canceled). Releases progress through stages as they move toward production. Started-type stages can be frozen to prevent new issues from being automatically synced into releases at that stage.' on type 'ReleaseStage' has changed to 'A stage within a release pipeline that represents a phase in the release lifecycle (e.g., Planned, In Progress, Completed, Canceled). Releases progress through stages as they move toward production. Started-type stages can be frozen to prevent new issues from being automatically synced into releases at that stage.' (ReleaseStage)

feat(schema): [non_breaking] Description '[ALPHA] Release stage filtering options.' on type 'ReleaseStageFilter' has changed to 'Release stage filtering options.' (ReleaseStageFilter)

feat(schema): [non_breaking] Description '[ALPHA] Comparator for release stage type.' on type 'ReleaseStageTypeComparator' has changed to 'Comparator for release stage type.' (ReleaseStageTypeComparator)

feat(schema): [non_breaking] Field 'Team.releasePipelines' description changed from '[ALPHA] Release pipelines associated with the team.' to 'Release pipelines associated with the team.' (Team.releasePipelines)

feat(schema): [non_breaking] Input field 'TeamFilter.releasePipelines' description changed from '[ALPHA] Filters that the team's release pipelines must satisfy.' to 'Filters that the team's release pipelines must satisfy.' (TeamFilter.releasePipelines)

feat(schema): [non_breaking] Field 'Template.pipeline' description changed from '[Internal] The release pipeline this template is bound to. Required when the template type is 'releaseNote' and forbidden otherwise. The pipeline owns at most one release note template, which defines the format AI follows when generating release notes.' to 'The release pipeline this template is bound to. Required when the template type is 'releaseNote' and forbidden otherwise. The pipeline owns at most one release note template, which defines the format AI follows when generating release notes.' (Template.pipeline)

feat(schema): [non_breaking] Field 'initiativeGroupingLabelGroupId' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativeGroupingLabelGroupId)

feat(schema): [non_breaking] Field 'initiativeLabelGroupColumns' was added to object type 'ViewPreferencesValues' (ViewPreferencesValues.initiativeLabelGroupColumns)