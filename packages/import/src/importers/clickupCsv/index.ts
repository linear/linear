import inquirer from "inquirer";

import type { Importer } from "../../types.ts";
import { ClickupCsvImporter } from "./ClickupImporter.ts";

const BASE_PATH = process.cwd();

export const clickupCsvImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<ClickupImportAnswers>(questions);
  return new ClickupCsvImporter(answers.csvFilePath, {
    createLabels: answers.createLabels,
    importStatuses: answers.importStatuses,
  });
};

interface ClickupImportAnswers {
  csvFilePath: string;
  createLabels: boolean;
  importStatuses: boolean;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "csvFilePath",
    message: "Select your exported CSV file of ClickUp issues",
  },
  {
    type: "confirm",
    name: "createLabels",
    message: "Do you want to create missing labels from ClickUp tags, lists, and spaces?",
    default: true,
  },
  {
    type: "confirm",
    name: "importStatuses",
    message:
      "Do you want to import ClickUp statuses as-is? (If no, they will be mapped to standard Linear statuses: Backlog, Todo, In Progress, Done, Canceled)",
    default: false,
  },
];
