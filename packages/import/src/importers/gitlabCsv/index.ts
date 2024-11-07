import * as inquirer from "inquirer";

import { Importer } from "../../types";
import { GitLabCsvImporter } from "./GitlabCsvImporter";

const BASE_PATH = process.cwd();

export const gitlabCsvImporter = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<GitLabImportAnswers>(questions);
  return new GitLabCsvImporter(answers.csvFilePath);
};

interface GitLabImportAnswers {
  csvFilePath: string;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "csvFilePath",
    message: "Select your exported CSV file of GitLab issues",
  },
];
