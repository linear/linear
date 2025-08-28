const codeSectionTransform = require("./transforms/code-section");
const textSectionTransform = require("./transforms/text-section");

module.exports = {
  open: "AUTO-GENERATED-CONTENT:START",
  close: "AUTO-GENERATED-CONTENT:END",
  transforms: {
    CODE_SECTION: codeSectionTransform,
    TEXT_SECTION: textSectionTransform,
  },
};
