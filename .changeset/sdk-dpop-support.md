---
"@linear/sdk": minor
---

`LinearClient` accepts a `dpop` signer to send DPoP-bound access tokens. Each request is signed with a fresh proof, and the client retries once when the server asks for a new nonce. `createDPoPProof`, `dpopSignerFromCryptoKeyPair` and `derToJoseSignature` are exported for token endpoint requests and KMS-backed keys.
