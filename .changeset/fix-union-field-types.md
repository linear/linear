---
"@linear/codegen-sdk": patch
---

fix(codegen-sdk): use fragment type for union fields instead of schema type

Union fields pass through raw fragment data directly without a wrapper class, unlike object fields. This fixes a TypeScript error when the schema has required [Internal] fields on union members that are excluded from fragments.
