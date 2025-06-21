import * as inquirer from "inquirer";
import { Importer } from "../../types";
import { TodoistCsvImporter } from "./TodoistCsvImporter";

const BASE_PATH = process.cwd();

export const todoistCsvImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<TodoistImportAnswers>(questions);
  return new TodoistCsvImporter(answers.todoistFilePath);
};

interface TodoistImportAnswers {
  todoistFilePath: string;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "todoistFilePath",
    message: "Select your exported CSV file from Todoist",
  },
];
