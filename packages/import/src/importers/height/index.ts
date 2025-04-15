import * as inquirer from "inquirer";
import { Importer } from "../../types";
import { HeightImporter } from "./HeightImporter";

export const heightImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<HeightImportAnswers>(questions);
  const heightImporter = new HeightImporter(answers.heightApiKey, answers.team);
  return heightImporter;
};

interface HeightImportAnswers {
  heightApiKey: string;
  team: string;
}

const questions = [
  {
    type: "input",
    name: "heightApiKey",
    message: "Input your personal Height Secret key",
  },
  {
    type: "input",
    name: "team",
    message: "From which team do you want to import issues from",
  },
];
