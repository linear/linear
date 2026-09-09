---
"@linear/sdk": patch
---

Require a finite numeric `webhookTimestamp` in the signed body and enforce the existing one-minute replay window in all webhook verification APIs. Unsigned timestamp headers and legacy timestamp arguments can no longer bypass this check. The optional third argument to `verify()` and `parseData()` is retained for source compatibility but ignored; callers can omit it. Payloads without a signed timestamp, including header-only payloads, are now rejected.
