---
"@linear/import": minor
---

Add Todoist CSV import support to the Linear importer CLI. This change allows users to import tasks from Todoist CSV exports into Linear, with the following features:

- Support for importing tasks with titles, descriptions, and priorities
- Correct mapping of Todoist priorities to Linear priorities (p1 highest -> p1 highest)
- Handling of task creation dates
- Skip non-task items from the CSV
- Proper date handling to ensure compatibility with Linear's API
