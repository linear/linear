import * as inquirer from "inquirer";

import { Importer } from "../../types";
import { DequeCsvImporter } from "./DequeCsvImporter";

const BASE_PATH = process.cwd();

export const dequeCsvImporter = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<DequeImportAnswers>(questions);
  const dequeImporter = new DequeCsvImporter(answers.dequeFilePath);
  return dequeImporter;
};

interface DequeImportAnswers {
  dequeFilePath: string;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "dequeFilePath",
    message: "Select your exported CSV file of Deque Auditor issues",
  },
];
