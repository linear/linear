/* eslint-disable no-console */
import chalk from "chalk";
import inquirer from "inquirer";
import inquirerFilePath from "inquirer-file-path";
import { importIssues } from "./importIssues.ts";
import { asanaCsvImport } from "./importers/asanaCsv/index.ts";
import { githubImport } from "./importers/github/index.ts";
import { gitlabCsvImporter } from "./importers/gitlabCsv/index.ts";
import { jiraCsvImport } from "./importers/jiraCsv/index.ts";
import { linearCsvImporter } from "./importers/linearCsv/index.ts";
import { pivotalCsvImport } from "./importers/pivotalCsv/index.ts";
import { shortcutCsvImport } from "./importers/shortcutCsv/index.ts";
import { trelloJsonImport } from "./importers/trelloJson/index.ts";
import type { ImportAnswers } from "./types.ts";

inquirer.registerPrompt("filePath", inquirerFilePath);

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
  } catch (error) {
    const userFriendlyMessage = error.errors?.[0]?.message;
    if (error.type !== "UsageLimitExceeded") {
      // Don't log when the usage limit is exceeded as we already know the cause.
      console.error(error);
    }
    if (userFriendlyMessage) {
      console.log(chalk.red(userFriendlyMessage));
    }
  }
})();
