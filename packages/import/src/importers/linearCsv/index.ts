import inquirer from "inquirer";

import type { Importer } from "../../types.ts";
import { LinearCsvImporter } from "./LinearCsvImporter.ts";

const BASE_PATH = process.cwd();

export const linearCsvImporter = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<LinearImportAnswers>(questions);
  const linearImporter = new LinearCsvImporter(answers.linearFilePath);
  return linearImporter;
};

interface LinearImportAnswers {
  linearFilePath: string;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "linearFilePath",
    message: "Select your exported CSV file of Linear issues",
  },
];
