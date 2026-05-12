---
"@linear/sdk": patch
---

fix(sdk): throw early when `LinearWebhookClient` is constructed with an empty or non-string secret, instead of silently HMAC'ing with an empty key
