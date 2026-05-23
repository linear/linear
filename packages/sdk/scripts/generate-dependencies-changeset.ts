import { writeFile } from "fs";
import path from "path";
import { promisify } from "util";

const filename = path.resolve(`../../.changeset/_generated_dependencies.md`);

function printLines(lines: (string | undefined)[]): string {
  return lines.filter(Boolean).join("\n");
}

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
    process.stdout.write("script:generate-dependencies-changeset: Generated changeset for dependencies\n");
  })
  .catch(error => {
    process.stderr.write("script:generate-dependencies-changeset: Generating changeset for dependencies\n");
    throw error;
  });
