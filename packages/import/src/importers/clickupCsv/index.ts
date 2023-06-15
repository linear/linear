import * as inquirer from "inquirer";
import { Importer } from "../../types";
import { ClickupCsvImporter } from "./ClickupCsvImporter";

const BASE_PATH = process.cwd();

export const clickupCsvImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<ClickupImportAnswers>(questions);
  return new ClickupCsvImporter(answers.clickupFilePath);
};

interface ClickupImportAnswers {
  clickupFilePath: string;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "clickupFilePath",
    message: "Select your exported CSV file of ClickUp tasks",
  },
];
