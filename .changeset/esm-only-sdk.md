---
"@linear/sdk": major
---

**`@linear/sdk` is now ESM-only, halving its install size.** Most projects need no changes: on Node.js 20.19+ or 22.12+, `require("@linear/sdk")` still works from CommonJS.

You may need to update your setup if you use:

- **Node.js older than 20.19 or 22.12:** upgrade Node.js, or stay on the previous release of `@linear/sdk`.
- **Jest in CommonJS mode:** Jest can't `require()` ES modules. Let `babel-jest` transform the SDK by adding `transformIgnorePatterns: ["/node_modules/(?!@linear/sdk)"]`, or run Jest with native ESM support (`--experimental-vm-modules`).
- **TypeScript with `"module": "node16"`, or `"nodenext"` on TypeScript 5.7 or older:** these report error TS1479. Use `"module": "nodenext"` with TypeScript 5.8+, or `"moduleResolution": "bundler"`.
