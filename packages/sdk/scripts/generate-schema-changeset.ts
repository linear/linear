import { CriticalityLevel, diff } from "@graphql-inspector/core";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { UrlLoader } from "@graphql-tools/url-loader";
import { writeFile } from "fs";
import path from "path";
import { promisify } from "util";
import { logger, printLines } from "../../codegen-doc/src/index";

const levelOrder = {
  [CriticalityLevel.Breaking]: 2,
  [CriticalityLevel.Dangerous]: 1,
  [CriticalityLevel.NonBreaking]: 0,
};

const filename = path.resolve(`../../.changeset/_generated_schema_${Math.ceil(Math.random() * 100000000)}.md`);

const changeset = printLines(["---", '"@linear/sdk": minor', "---"]);

/**
 * Generate a changeset file by diffing the current schema with the master branch
 */
async function generateSchemaChangeset() {
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
    await promisify(writeFile)(
      filename,
      printLines([
        changeset,
        "\n",
        changes
          .map(
            change =>
              `feat(schema): [${change.criticality.level.toLowerCase()}] ${change.message}${
                change.path ? ` (${change.path})` : ""
              }`
          )
          .join("\n\n"),
      ])
    );
  }

  return changes;
}

generateSchemaChangeset()
  .then(() => {
    logger.info("script:generate-schema-changeset: Generated changeset from schema");
  })
  .catch(error => {
    logger.error("script:generate-schema-changeset: Generating changeset from schema");
    logger.fatal(error);
    throw error;
  });
