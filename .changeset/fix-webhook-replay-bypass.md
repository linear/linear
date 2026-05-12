---
"@linear/sdk": patch
---

Fix webhook replay bypass where a fresh unsigned `linear-timestamp` header could override a stale signed `webhookTimestamp` in the body. The signed body timestamp now takes precedence over the header.
