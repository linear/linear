---
"@linear/sdk": patch
---

Mark generated GraphQL documents as pure so bundlers can drop the ones an app never uses. An app that only uses `LinearClient` for one query bundles about 40% smaller.
