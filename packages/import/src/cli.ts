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

const SERVICE_LABELS: Record<(typeof VALID_SERVICES)[number], string> = {
  github: "GitHub",
  gitlabCsv: "GitLab (CSV export)",
  jiraCsv: "Jira (CSV export)",
  asanaCsv: "Asana (CSV export)",
  pivotalCsv: "Pivotal (CSV export)",
  shortcutCsv: "Shortcut (CSV export)",
  trelloJson: "Trello (JSON export)",
  linearCsv: "Linear (CSV export)",
};

const getFlag = (name: string): string | undefined => {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1 || idx + 1 >= process.argv.length) {return undefined;}
  const value = process.argv[idx + 1];
  return value.startsWith("--") ? undefined : value;
};

const hasFlag = (name: string): boolean => process.argv.includes(`--${name}`);

(async () => {
  try {
    const envApiKey = process.env.LINEAR_API_KEY;
    const flagImporter = getFlag("importer");
    const flagTeam = getFlag("team");
    const flagProject = getFlag("project");
    const flagIncludeComments = hasFlag("include-comments");
    const flagSelfAssign = hasFlag("self-assign");

    if (flagImporter && !VALID_SERVICES.includes(flagImporter as (typeof VALID_SERVICES)[number])) {
      console.error(chalk.red(`Invalid importer "${flagImporter}". Valid options: ${VALID_SERVICES.join(", ")}`));
      process.exit(1);
    }

    let linearApiKey: string;
    let service: string;

    if (envApiKey && flagImporter) {
      linearApiKey = envApiKey;
      service = flagImporter;
    } else {
      const importAnswers = await inquirer.prompt<ImportAnswers>([
        {
          type: "input",
          name: "linearApiKey",
          message: "Input your Linear API key (https://linear.app/settings/account/security)",
          when: () => !envApiKey,
          default: envApiKey,
        },
        {
          type: "list",
          name: "service",
          message: "Which service would you like to import from?",
          choices: VALID_SERVICES.map(value => ({ name: SERVICE_LABELS[value], value })),
          when: () => !flagImporter,
          default: flagImporter,
        },
      ]);

      linearApiKey = envApiKey || importAnswers.linearApiKey;
      service = flagImporter || importAnswers.service;
    }

    if (!linearApiKey) {
      console.error(chalk.red("No Linear API key provided. Create one here: https://linear.app/settings/account/security"));
      process.exit(1);
    }

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
        console.error(chalk.red(`Invalid importer`));
        process.exit(1);
    }

    if (importer) {
      const apiUrl = getFlag("apiUrl");
      await importIssues(linearApiKey, importer, apiUrl, flagTeam, {
        project: flagProject,
        includeComments: flagIncludeComments,
        selfAssign: flagSelfAssign,
      });
    }
  } catch (error) {
    const userFriendlyMessage = error.errors?.[0]?.message;
    if (error.type !== "UsageLimitExceeded") {
      // Don't log when the usage limit is exceeded as we already know the cause.
      console.error(error);
    }
    if (userFriendlyMessage) {
      console.error(chalk.red(userFriendlyMessage));
    }
    process.exit(1);
  }
})();
