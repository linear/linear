import { writeFile } from "fs";
import path from "path";
import { promisify } from "util";
import { logger, printLines } from "../../codegen-doc/src/index";

const filename = path.resolve(`../../.changeset/_generated_dependencies_${Math.ceil(Math.random() * 100000000)}.md`);

const changeset = printLines([
  "---",
  '"@linear/sdk": patch',
  '"@linear/import": patch',
  '"@linear/codegen-doc": patch',
  '"@linear/codegen-sdk": patch',
  '"@linear/codegen-test": patch',
  "---",
]);

/**
 * Generate a changeset file for updating patch dependencies
 */
async function generateChangeset() {
  await promisify(writeFile)(filename, printLines([changeset, "\n", "chore(deps): update dependency patch versions"]));
}

generateChangeset()
  .then(() => {
    logger.info("script:generate-dependencies-changeset: Generated changeset for dependencies");
  })
  .catch(error => {
    logger.error("script:generate-dependencies-changeset: Generating changeset for dependencies");
    logger.fatal(error);
    throw error;
  });
