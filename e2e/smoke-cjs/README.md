# Linear SDK CommonJS Smoke Test

Verifies the SDK works as a CommonJS module across different Node.js and TypeScript versions.

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
