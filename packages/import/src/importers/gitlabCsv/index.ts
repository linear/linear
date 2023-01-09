import inquirer from 'inquirer';

import { Importer } from "../../types";
import { GitlabCsvImporter } from "./gitlabCsvImporter";

const BASE_PATH = process.cwd();

export const gitlabCsvImporter = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<GitlabImportAnswer>(questions);
  const linearImporter = new GitlabCsvImporter(answers.gitlabFilePath);
  return linearImporter;
};

interface GitlabImportAnswer {
  gitlabFilePath: string;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "gitlabFilePath",
    message: "Select your exported CSV file of Gitlab issues",
  },
];
