import * as inquirer from "inquirer";
import { Importer } from "../../types";
import { TeamworkCsvImporter } from "./TeamworkCsvImporter";

const BASE_PATH = process.cwd();

export const teamworkCsvImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<TeamworkImportAnswers>(questions);
  return new TeamworkCsvImporter(answers.teamworkFilePath, answers.teamworkUrlName ?? "", answers.isImportCompleted);
};

interface TeamworkImportAnswers {
  teamworkFilePath: string;
  teamworkUrlName: string;
  isImportCompleted: boolean;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "teamworkFilePath",
    message: "Select your exported CSV file of Teamwork issues",
  },
  {
    type: "input",
    name: "teamworkUrlName",
    message: "Input the URL of your Teamwork board (e.g. https://xxxx.teamwork.com/):",
  },
  {
    type: "confirm",
    name: "isImportCompleted",
    message: "Do you need to import completed tasks?",
  },
];
