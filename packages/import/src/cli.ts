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

const VALID_SERVICES = [
  "github",
  "gitlabCsv",
  "jiraCsv",
  "asanaCsv",
  "pivotalCsv",
  "shortcutCsv",
  "trelloJson",
  "linearCsv",
] as const;

/** Parse a named CLI flag value: --flag value */
const getFlag = (name: string): string | undefined => {
  const idx = process.argv.indexOf(`--${name}`);
  return idx > -1 && idx + 1 < process.argv.length ? process.argv[idx + 1] : undefined;
};

(async () => {
  try {
    // Support non-interactive mode via CLI flags / env vars
    const flagApiKey = getFlag("api-key") || process.env.LINEAR_API_KEY;
    const flagImporter = getFlag("importer");
    const flagTeam = getFlag("team");

    let linearApiKey: string;
    let service: string;

    if (flagApiKey && flagImporter) {
      // Non-interactive mode: use provided flags
      if (!VALID_SERVICES.includes(flagImporter as (typeof VALID_SERVICES)[number])) {
        console.log(chalk.red(`Invalid importer "${flagImporter}". Valid options: ${VALID_SERVICES.join(", ")}`));
        return;
      }
      linearApiKey = flagApiKey;
      service = flagImporter;
    } else {
      // Interactive mode: prompt as before
      const importAnswers = await inquirer.prompt<ImportAnswers>([
        {
          type: "input",
          name: "linearApiKey",
          message: "Input your Linear API key (https://linear.app/settings/account/security)",
          when: () => !flagApiKey,
          default: flagApiKey,
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
          when: () => !flagImporter,
          default: flagImporter,
        },
      ]);

      linearApiKey = flagApiKey || importAnswers.linearApiKey;
      service = flagImporter || importAnswers.service;
    }

    // TODO: Validate Linear API
    let importer;
    switch (service) {
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
      const apiUrl = getFlag("apiUrl");
      await importIssues(linearApiKey, importer, apiUrl, flagTeam);
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
