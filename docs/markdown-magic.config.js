const codeSectionTransform = require("./transforms/code-section");
const textSectionTransform = require("./transforms/text-section");

module.exports = {
  transforms: {
    CODE_SECTION: codeSectionTransform,
    TEXT_SECTION: textSectionTransform,
  },
};
