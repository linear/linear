#!/usr/bin/env node

if (process.argv.length > 2) {
  if (process.argv[2] === "--version") {
    console.log(require("../package.json").version);
    process.exit(0);
  }
  if (process.argv[2] === "--help") {
    console.log(`Usage: linear-import [options]

Options:
  --version              Show version number
  --help                 Show this help message
  --api-key <key>        Linear API key (or set LINEAR_API_KEY env var)
  --importer <service>   Import source: github, gitlabCsv, jiraCsv, asanaCsv,
                         pivotalCsv, shortcutCsv, trelloJson, linearCsv
  --team <key|id>        Target team key or ID
  --apiUrl <url>         Custom API URL

When --api-key and --importer are both provided, the CLI runs in
non-interactive mode. Add --team to also skip the team selection prompt.`);
    process.exit(0);
  }
}

require("../dist/cli.cjs");
