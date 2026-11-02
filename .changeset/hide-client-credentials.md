---
"@linear/sdk": patch
---

Keep the `apiKey` and `accessToken` out of `LinearClient` options, so logging or serializing the client no longer exposes them. `client.options.headers` no longer includes `Authorization`. The client adds it to each request unless the request already sets one through the `headers` option, `client.client.setHeader` or `client.client.setHeaders`.
