/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import chalk from "chalk";
import * as inquirer from "inquirer";
import { importIssues } from "./importIssues";
import { asanaCsvImport } from "./importers/asanaCsv";
import { githubImport } from "./importers/github";
import { jiraCsvImport } from "./importers/jiraCsv";
import { linearCsvImporter } from "./importers/linearCsv";
import { pivotalCsvImport } from "./importers/pivotalCsv";
import { shortcutCsvImport } from "./importers/shortcutCsv";
import { trelloJsonImport } from "./importers/trelloJson";
import { ImportAnswers } from "./types";
import { gitlabCsvImporter } from "./importers/gitlabCsv";

inquirer.registerPrompt("filePath", require("inquirer-file-path"));

(async () => {
  try {
    const importAnswers = await inquirer.prompt<ImportAnswers>([
      {
        type: "input",
        name: "linearApiKey",
        message: "Input your Linear API key (https://linear.app/settings/account/security)",
      },
      {
        type: "list",
        name: "service",
        message: "Which service would you like to import from?",
        choices: [
          {
            name: "GitHub",
            value: "github",
          },
          {
            name: "GitLab (CSV export)",
            value: "gitlabCsv",
          },
          {
            name: "Jira (CSV export)",
            value: "jiraCsv",
          },
          {
            name: "Asana (CSV export)",
            value: "asanaCsv",
          },
          {
            name: "Pivotal (CSV export)",
            value: "pivotalCsv",
          },
          {
            name: "Shortcut (CSV export)",
            value: "shortcutCsv",
          },
          {
            name: "Trello (JSON export)",
            value: "trelloJson",
          },
          {
            name: "Linear (CSV export)",
            value: "linearCsv",
          },
        ],
      },
    ]);

    // TODO: Validate Linear API
    let importer;
    switch (importAnswers.service) {
      case "github":
        importer = await githubImport();
        break;
      case "gitlabCsv":
        importer = await gitlabCsvImporter();
        break;
      case "jiraCsv":
        importer = await jiraCsvImport();
        break;
      case "asanaCsv":
        importer = await asanaCsvImport();
        break;
      case "pivotalCsv":
        importer = await pivotalCsvImport();
        break;
      case "shortcutCsv":
        importer = await shortcutCsvImport();
        break;
      case "trelloJson":
        importer = await trelloJsonImport();
        break;
      case "linearCsv":
        importer = await linearCsvImporter();
        break;
      default:
        console.log(chalk.red(`Invalid importer`));
        return;
    }

    if (importer) {
      const apiUrlIndex = process.argv.indexOf("--apiUrl");
      const apiUrl = apiUrlIndex > -1 ? process.argv[apiUrlIndex + 1] : undefined;
      await importIssues(importAnswers.linearApiKey, importer, apiUrl);
    }
  } catch (e) {
    // Deal with the fact the chain failed
    console.error(e);
  }
})();
