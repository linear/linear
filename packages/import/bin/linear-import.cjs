#!/usr/bin/env node

if (process.argv.length > 2) {
  if (process.argv[2] === "--version") {
    console.log(require("../package.json").version);
    process.exit(0);
  }
  if (process.argv[2] === "--help") {
    console.log(`Usage: linear-import [options]

Options:
  --version                Show version number
  --help                   Show this help message
  --importer <service>     Import source: github, gitlabCsv, jiraCsv, asanaCsv,
                           pivotalCsv, shortcutCsv, trelloJson, linearCsv
  --team <key|id>          Target team key or ID
  --project <key|id>       Target project key or ID
  --include-comments       Include comments in issue descriptions
  --self-assign            Assign imported issues to yourself
  --apiUrl <url>           Custom API URL

Environment variables:
  LINEAR_API_KEY           Linear API key (required for non-interactive mode)

When LINEAR_API_KEY and --importer are both provided, the CLI runs in
non-interactive mode. Add --team to also skip the team selection prompt.`);
    process.exit(0);
  }
}

require("../dist/cli.cjs");
