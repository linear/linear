import { Doc, logger } from "@linear/codegen-doc";
import { replaceInFileSync } from "replace-in-file";

function updateScalars() {
  try {
    const results = replaceInFileSync({
      files: "src/_generated_documents.ts",
      from: [
        ...Doc.SCALAR_STRING_NAMES,
        ...Doc.SCALAR_DATE_NAMES,
        ...Doc.SCALAR_JSON_NAMES,
        ...Doc.SCALAR_DATE_OR_STRING_NAMES,
        ...Object.keys(Doc.SCALAR_NOTIFICATION_TYPE_MAP),
      ].map(name => `${name}: any`),
      to: match => {
        const name = match?.split(":")?.[0];

        if (Doc.SCALAR_STRING_NAMES.includes(name)) {
          return `${name}: ${Doc.SCALAR_STRING_TYPE}`;
        } else if (Doc.SCALAR_DATE_NAMES.includes(name)) {
          return `${name}: ${Doc.SCALAR_DATE_TYPE}`;
        } else if (Doc.SCALAR_JSON_NAMES.includes(name)) {
          return `${name}: ${Doc.SCALAR_JSON_TYPE}`;
        } else if (Doc.SCALAR_DATE_OR_STRING_NAMES.includes(name)) {
          return `${name}: ${Doc.SCALAR_DATE_OR_STRING_TYPE}`;
        } else if (Object.keys(Doc.SCALAR_NOTIFICATION_TYPE_MAP).includes(name)) {
          return `${name}: "${Doc.SCALAR_NOTIFICATION_TYPE_MAP[name as keyof typeof Doc.SCALAR_NOTIFICATION_TYPE_MAP]}"`;
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
