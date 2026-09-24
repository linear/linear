---
"@linear/import": patch
---

fix(import): harden the GitHub importer's API client: retry network errors, server errors and rate limits with backoff, and fail with GitHub's error message instead of importing incomplete data
