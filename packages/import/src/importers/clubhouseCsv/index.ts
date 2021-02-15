import * as inquirer from "inquirer";
import { Importer } from "../../types";
import { ClubhouseCsvImporter } from "./ClubhouseCsvImporter";

const BASE_PATH = process.cwd();

export const clubhouseCsvImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<ClubhouseImportAnswers>(questions);
  const clubhouseImporter = new ClubhouseCsvImporter(
    answers.clubhouseFilePath,
    answers.clubhouseWorkspaceSlug,
    answers.clubhouseAPIToken
  );
  return clubhouseImporter;
};

interface ClubhouseImportAnswers {
  clubhouseFilePath: string;
  clubhouseWorkspaceSlug: string;
  clubhouseAPIToken: string;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "clubhouseFilePath",
    message: "Select your exported CSV file of Clubhouse stories",
  },
  {
    type: "input",
    name: "clubhouseWorkspaceSlug",
    message: "Input the slug of your Clubhouse workspace (e.g. acme):",
  },
  {
    type: "input",
    name: "clubhouseAPIToken",
    message:
      "To transfer files from Clubhouse, enter a Clubhouse API token (https://app.clubhouse.io/settings/account/api-tokens):",
  },
];
