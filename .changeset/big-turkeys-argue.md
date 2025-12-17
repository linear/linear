---
"@linear/import": major
---

Migrate linear-import to tsdown.

BREAKING CHANGE: `@linear/import` used to export library internals as
individual files. The library is not being installed by any third-party
dependency. If you rely on the external exports, please let us know, so
we can re-expose them.