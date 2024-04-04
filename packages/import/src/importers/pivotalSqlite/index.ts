import * as inquirer from "inquirer";
import { Importer } from "../../types";
import { PivotalSQLiteImporter } from "./PivotalSqliteImporter";

const BASE_PATH = process.cwd();

export const pivotalSQLiteImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<PivotalImportAnswers>(questions);
  const pivotalImporter = new PivotalSQLiteImporter(answers.pivotalFilePath);
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
    message: "Select your exported SQLite database file of Pivotal Tracker data",
  },
];
