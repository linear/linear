import * as inquirer from "inquirer";
import { Importer } from "../../types";
import { ShortcutCsvImporter } from "./ShortcutCsvImporter";

const BASE_PATH = process.cwd();

export const shortcutCsvImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<ShortcutImportAnswers>(questions);
  const shortcutImporter = new ShortcutCsvImporter(
    answers.shortcutFilePath,
    answers.shortcutWorkspaceSlug,
    answers.shortcutAPIToken
  );
  return shortcutImporter;
};

interface ShortcutImportAnswers {
  shortcutFilePath: string;
  shortcutWorkspaceSlug: string;
  shortcutAPIToken: string;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "shortcutFilePath",
    message: "Select your exported CSV file of Shortcut stories",
  },
  {
    type: "input",
    name: "shortcutWorkspaceSlug",
    message: "Input the slug of your Shortcut workspace (e.g. acme):",
  },
  {
    type: "input",
    name: "shortcutAPIToken",
    message:
      "To transfer files from Shortcut, enter a Shortcut API token (https://app.shortcut.com/settings/account/api-tokens):",
  },
];
