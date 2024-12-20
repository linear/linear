---
"@linear/sdk": major
---


feat(schema): [breaking] Input field 'CustomerUpsertInput.externalId' changed type from '[String!]' to 'String' (CustomerUpsertInput.externalId)

feat(schema): [dangerous] Input field 'addedLabelIds' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.addedLabelIds)

feat(schema): [dangerous] Input field 'removedLabelIds' was added to input object type 'IssueUpdateInput' (IssueUpdateInput.removedLabelIds)

feat(schema): [non_breaking] Field 'Mutation.customerUpsert' description changed from 'Upserts a customer, creating it if it doesn't exists, updating it otherwise. Matches against an existing customer with `id` or `externalIds`' to 'Upserts a customer, creating it if it doesn't exists, updating it otherwise. Matches against an existing customer with `id` or `externalId`' (Mutation.customerUpsert)