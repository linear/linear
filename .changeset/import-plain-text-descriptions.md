---
"@linear/import": patch
---

fix(import): keep Asana notes and Pivotal Tracker descriptions as written. Both were converted as Jira markup, which rewrote underscores in URLs and email addresses, turned a leading `#` into a numbered list, and broke Markdown links in Pivotal descriptions.
