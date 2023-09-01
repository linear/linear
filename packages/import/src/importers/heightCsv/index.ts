import * as inquirer from "inquirer";

import { Importer } from "../../types";
import { HeightCsvImporter } from "./HeightCsvImporter";

const BASE_PATH = process.cwd();

export const heightCsvImporter = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<HeightImportAnswers>(questions);
  const linearImporter = new HeightCsvImporter(answers.heightFilePath);
  return linearImporter;
};

interface HeightImportAnswers {
  heightFilePath: string;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "heightFilePath",
    message: "Select your exported CSV file of Height tasks",
  },
];
