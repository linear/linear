import { writeFileSync } from "fs";
import path from "path";
import { logger } from "../../codegen-doc/src/index";

async function generateChangeset() {
  writeFileSync(
    path.resolve("../../.changeset/_generated_dependencies.md"),
    `---
"@linear/sdk": patch
"@linear/import": patch
"@linear/codegen-doc": patch
"@linear/codegen-sdk": patch
"@linear/codegen-test": patch
---
  
chore(deps): update dependency patch versions
`
  );
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
