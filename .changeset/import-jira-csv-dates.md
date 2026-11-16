---
"@linear/import": patch
---

fix(import): keep created dates from Jira CSV exports, and import issues in Jira's "Done" status category as completed and "In Progress" ones as started, so statuses created during the import get the right type. Only send an issue's completion date when its status is a completed type and it has a creation date, and never before that date, so the API doesn't reject the issue and stop the import.
