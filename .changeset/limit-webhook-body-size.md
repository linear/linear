---
"@linear/sdk": patch
---

Limit webhook request bodies read by `createHandler()` before signature verification. Requests whose `content-length` or streamed body exceeds the limit are rejected with `413` without buffering the rest of the body, in both Fetch and Node.js handlers. The limit defaults to 5 MiB and can be configured with `createHandler({ maxBodyBytes })`.
