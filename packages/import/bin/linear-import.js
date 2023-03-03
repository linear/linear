#!/usr/bin/env node

if (process.argv.length > 2) {
  if (process.argv[2] === "--version") {
    console.log(require("../package.json").version);
    process.exit(0);
  }
}

require("../dist/cli");
