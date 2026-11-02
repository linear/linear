---
"@linear/sdk": minor
---

`LinearClient` accepts a `dpop` signer to send DPoP-bound access tokens. Each request is signed with a fresh proof, and the client retries once when the server asks for a new nonce. `@linear/sdk/oauth` exports the `DPoPSigner` type, `createDPoPSigner` for WebCrypto key pairs and KMS-backed keys, and `createDPoPProof` for OAuth token endpoint requests.
