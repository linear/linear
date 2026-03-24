import inquirer from "inquirer";
import type { Importer } from "../../types.ts";
import { PlaneCsvImporter } from "./PlaneCsvImporter.ts";

const BASE_PATH = process.cwd();

export const planeCsvImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<PlaneImportAnswers>(questions);
  const planeImporter = new PlaneCsvImporter(answers.planeFilePath);
  return planeImporter;
};

interface PlaneImportAnswers {
  planeFilePath: string;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "planeFilePath",
    message: "Select your exported CSV file of Plane issues",
  },
];
