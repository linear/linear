import inquirer from 'inquirer';
import { Importer } from "../../types";
import { PivotalCsvImporter } from "./PivotalCsvImporter";

const BASE_PATH = process.cwd();

export const pivotalCsvImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<PivotalImportAnswers>(questions);
  const pivotalImporter = new PivotalCsvImporter(answers.pivotalFilePath);
  return pivotalImporter;
};

interface PivotalImportAnswers {
  pivotalFilePath: string;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "pivotalFilePath",
    message: "Select your exported CSV file of Pivotal stories",
  },
];
