# Linear SDK CommonJS Smoke Test

Verifies the ESM-only SDK can be loaded with `require()` from CommonJS across different Node.js and TypeScript versions.

This also guards against top-level await in the SDK, which would make `require()` fail with `ERR_REQUIRE_ASYNC_MODULE`.

## Running locally

```bash
# From repository root
pnpm build
cd packages/sdk && pnpm pack --out linear-sdk.tar.gz && cd ../..

# Run test
cd e2e/smoke-cjs
npm install typescript @types/node
npm install ../../packages/sdk/linear-sdk.tar.gz
npm test
```
