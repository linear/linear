---
"@linear/import": minor
---

Add Todoist CSV import support to the Linear importer CLI. This change allows users to import tasks from Todoist CSV exports into Linear, with the following features:

- Support for importing tasks with titles, descriptions, and priorities
- Automatic mapping of Todoist priorities to Linear priorities
- Handling of task creation dates
- Skip non-task items from the CSV
- Proper date handling to ensure compatibility with Linear's API
