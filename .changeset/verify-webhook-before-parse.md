---
"@linear/sdk": patch
---

Verify the webhook signature in `createHandler()` before parsing the request body, so requests with an invalid signature are rejected without being parsed.
