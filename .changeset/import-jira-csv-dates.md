---
"@linear/import": patch
---

fix(import): keep created dates from Jira CSV exports, and import issues in Jira's "Done" status category as completed and "In Progress" ones as started, so statuses created during the import get the right type.
