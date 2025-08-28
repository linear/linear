const fs = require("fs");
const path = require("path");

module.exports = function TEXT_SECTION({ options, srcPath }) {
  let text;
  let syntax = options.syntax;
  if (!options.id || !options.src) {
    return false;
  }

  const fileDir = path.dirname(srcPath);
  const filePath = path.resolve(fileDir, options.src);

  try {
    text = fs.readFileSync(filePath, "utf8", (err, contents) => {
      if (err) {
        console.log(`FILE NOT FOUND ${filePath}`);
        console.log(err);
        throw err;
      }
      return contents;
    });
  } catch (e) {
    console.log(`FILE NOT FOUND ${filePath}`);
    throw e;
  }
  if (!syntax) {
    syntax = path.extname(filePath).replace(/^./, "");
  }

  // trim leading and trailing spaces/line breaks in code
  text = text.replace(/^\s+|\s+$/g, "");

  const lines = text.split("\n");

  const startLine = lines.findIndex(line => line.includes(`TEXT_SECTION:${options.id}:START`)) ?? 0;
  const endLine = lines.findIndex(line => line.includes(`TEXT_SECTION:${options.id}:END`)) ?? lines.length - 1;

  const selectedLines = lines.slice(startLine + 1, endLine);

  const trimBy = selectedLines[0]?.match(/^(\s*)/)?.[1]?.length;

  return selectedLines.map(line => line.substring(trimBy)).join("\n");
};
