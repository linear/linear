---
"@linear/sdk": major
---

`@linear/sdk` is now ESM-only, which cuts its install size in half. It requires Node.js 20.19+ or 22.12+, where `require("@linear/sdk")` keeps working from CommonJS without code changes.

If you are affected:

- **Node.js older than 20.19 or 22.12:** upgrade Node.js. Both older lines are end-of-life.
- **Jest in CommonJS mode:** Jest can't `require()` ES modules. Let `babel-jest` transform the SDK by excluding it from `transformIgnorePatterns` (for example `["/node_modules/(?!@linear/sdk)"]`), or run Jest with native ESM support (`--experimental-vm-modules`).
- **TypeScript with `"module": "node16"`, or `"nodenext"` on TypeScript 5.7 or older (error TS1479):** use `"module": "nodenext"` with TypeScript 5.8+, or `"moduleResolution": "bundler"`.
