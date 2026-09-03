---
"@linear/import": minor
---

Support issue dependencies in Linear CSV import. Optional `Blocks` and `Blocked By` columns resolve references to other issues in the same import file (by row `Id` or title), create the issues, then wire the dependencies as `blocks` relations. Unresolvable, ambiguous, self-referencing, or mutually-contradictory references abort the import before any issue is created so a re-run never duplicates a half-imported backlog.
