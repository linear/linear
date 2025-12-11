# Linear SDK Smoke Test

This directory contains smoke tests for the Linear TypeScript SDK to verify that it works correctly across different Node.js and TypeScript versions.

## What is a smoke test?

A smoke test is a basic sanity check that verifies the SDK can be:
- Imported without errors
- Instantiated successfully
- Used with different TypeScript and Node.js versions

## Test Matrix

The smoke test runs on GitHub Actions with the following combinations:

- **Node.js versions:** 18, 20, 22
- **TypeScript versions:** 5.7.2, 5.8.3, 5.9.3 (last three minor releases)

This creates 9 test combinations to ensure compatibility with recent TypeScript versions.

## Running locally

To run the smoke test locally:

```bash
# From the repository root, build the SDK
pnpm build

# Package the SDK
cd packages/sdk
pnpm pack
cd ../..

# Install dependencies and run the test
cd e2e/smoke
npm install typescript @types/node
npm install ../../packages/sdk/linear-sdk-*.tgz
npm test
```

You can also test with a specific TypeScript version:

```bash
npm install typescript@5.3.3 @types/node
npm install ../../packages/sdk/linear-sdk-*.tgz
npm test
```

## What the test does

The smoke test (`test.ts`) performs these basic checks:

1. Imports the `LinearClient` from `@linear/sdk`
2. Instantiates a client with a test API key
3. Verifies no errors occur during import and instantiation
4. Outputs success messages

If any of these steps fail, it indicates a compatibility issue with that Node.js/TypeScript version combination.
