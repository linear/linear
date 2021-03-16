/* eslint-disable no-console */
import { CriticalityLevel, diff } from "@graphql-inspector/core";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { UrlLoader } from "@graphql-tools/url-loader";
import { writeFileSync } from "fs";
import path from "path";

async function generateChangeset() {
  const mainSchema = await loadSchema(
    "https://raw.githubusercontent.com/linear/linear/master/packages/sdk/src/schema.graphql",
    {
      loaders: [new UrlLoader()],
    }
  );

  const branchSchema = await loadSchema(path.resolve("./src/schema.graphql"), {
    loaders: [new GraphQLFileLoader()],
  });

  const changes = diff(mainSchema, branchSchema);

  const changeLevel = changes.some(change => change.criticality.level === CriticalityLevel.Breaking)
    ? "major"
    : "minor";

  writeFileSync(
    path.resolve("../../.changeset/_generated.md"),
    `---
"@linear/sdk": ${changeLevel}
---
  
${changes.map(change => `feat(schema): ${change.message}${change.path ? ` (${change.path})` : ""}`).join("\n")}`
  );

  return changes;
}

generateChangeset()
  .then(() => {
    console.log("script:generate-changeset: Generated changeset from schema");
  })
  .catch(error => {
    console.error("script:generate-changeset: Generating changeset from schema");
    console.error(error);
    throw error;
  });
