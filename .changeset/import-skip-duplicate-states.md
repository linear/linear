---
"@linear/import": patch
---

fix(import): route CSV statuses that match a workflow state of type `duplicate` to the team's canceled state instead of passing the duplicate-type state id to `createIssue`, which the server rejects with `Cannot create an issue in a duplicate state`
