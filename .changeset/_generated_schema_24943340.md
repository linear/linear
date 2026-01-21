---
"@linear/sdk": minor
---


feat(schema): [dangerous] Input field 'version' was added to input object type 'ReleaseCompleteInput' (ReleaseCompleteInput.version)

feat(schema): [non_breaking] Type 'ReleaseCreateInput' was added (ReleaseCreateInput)

feat(schema): [non_breaking] Field 'releaseCreate' was added to object type 'Mutation' (Mutation.releaseCreate)

feat(schema): [non_breaking] Field 'Mutation.releaseComplete' description changed from '[ALPHA] Marks the most recent started release for a pipeline as completed.' to '[ALPHA] Marks a release as completed. If version is provided, completes that specific release; otherwise completes the most recent started release.' (Mutation.releaseComplete)

feat(schema): [non_breaking] Description for argument 'input' on field 'Mutation.releaseComplete' changed from 'The input containing the pipeline ID.' to 'The input containing the pipeline ID and optional version.' (Mutation.releaseComplete.input)

feat(schema): [non_breaking] Input field 'ReleaseCompleteInput.pipelineId' description changed from 'The identifier of the pipeline to mark the latest started release as completed.' to 'The identifier of the pipeline to mark a release as completed.' (ReleaseCompleteInput.pipelineId)