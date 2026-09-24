# Linear SDK CommonJS (nodenext) Smoke Test

Verifies the ESM-only SDK can be imported from a CommonJS project using TypeScript's `nodenext` module setting. This requires TypeScript 5.8 or later.

## Running locally

```bash
# From repository root
pnpm build
cd packages/sdk && pnpm pack --out linear-sdk.tar.gz && cd ../..

# Run test
cd e2e/smoke-cjs-nodenext
npm install typescript @types/node
npm install ../../packages/sdk/linear-sdk.tar.gz
npm test
```
