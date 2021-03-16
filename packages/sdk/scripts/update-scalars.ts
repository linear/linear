import { replaceInFileSync } from "replace-in-file";
import { Doc, logger } from "../../codegen-doc/src/index";

function updateScalars() {
  try {
    const results = replaceInFileSync({
      files: "src/_generated_documents.ts",
      from: [...Doc.SCALAR_DATE_NAMES, ...Doc.SCALAR_JSON_NAMES].map(name => `${name}: any`),
      to: match => {
        const name = match?.split(":")?.[0];

        if (Doc.SCALAR_DATE_NAMES.includes(name)) {
          return `${name}: ${Doc.SCALAR_DATE_TYPE}`;
        } else if (Doc.SCALAR_JSON_NAMES.includes(name)) {
          return `${name}: ${Doc.SCALAR_JSON_TYPE}`;
        } else {
          return match;
        }
      },
    });

    logger.info("script:update-scalars: Replaced custom scalars", results);
  } catch (error) {
    logger.error("script:update-scalars: Replacing custom scalars");
    logger.fatal(error);
    throw error;
  }
}

updateScalars();
