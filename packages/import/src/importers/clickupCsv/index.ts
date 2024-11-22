import * as inquirer from "inquirer";
import { Importer } from "../../types";
import { ClickupCsvImporter } from "./ClickupCsvImporter";
import { QuestionCollection } from "inquirer";

const BASE_PATH = process.cwd();

export const clickupCsvImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<ClickupImportAnswers>(questions);
  return new ClickupCsvImporter(answers.clickupFilePath, answers.spaceFilter, answers.ignoreSubtasks);
};

interface ClickupImportAnswers {
  clickupFilePath: string;
  spaceFilter: string;
  ignoreSubtasks: boolean;
}

const questions: QuestionCollection<ClickupImportAnswers> = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "clickupFilePath",
    message: "Select your exported CSV file of ClickUp tasks",
  },
  {
    type: "input",
    name: "spaceFilter",
    message: "Select a space to filter by (leave blank for all spaces):",
    default: "",
  },
  {
    type: "confirm",
    name: "ignoreSubtasks",
    message: "Should subtasks be ignored (they'll be separate tasks otherwise)?",
    default: true,
  },
];
