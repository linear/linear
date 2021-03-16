/* eslint-disable no-console */
import { CriticalityLevel, diff } from "@graphql-inspector/core";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { UrlLoader } from "@graphql-tools/url-loader";
import { writeFileSync } from "fs";
import path from "path";

const levelOrder = {
  [CriticalityLevel.Breaking]: 2,
  [CriticalityLevel.Dangerous]: 1,
  [CriticalityLevel.NonBreaking]: 0,
};

async function generateChangeset() {
  /** Load main schema from github */
  const mainSchema = await loadSchema(
    "https://raw.githubusercontent.com/linear/linear/master/packages/sdk/src/schema.graphql",
    {
      loaders: [new UrlLoader()],
    }
  );

  /** Load branch schema from path */
  const branchSchema = await loadSchema(path.resolve("./src/schema.graphql"), {
    loaders: [new GraphQLFileLoader()],
  });

  /** Calculate diff between main and branch schemas */
  const changes = diff(mainSchema, branchSchema).sort((a, b) => {
    return levelOrder[b.criticality.level] - levelOrder[a.criticality.level];
  });

  /** If we have changes, write to changeset file */
  if (changes.length) {
    writeFileSync(
      path.resolve("../../.changeset/_generated.md"),
      `---
"@linear/sdk": minor
---
  
${changes
  .map(
    change =>
      `feat(schema): [${change.criticality.level.toLowerCase()}] ${change.message}${
        change.path ? ` (${change.path})` : ""
      }`
  )
  .join("\n")}`
    );
  }

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
