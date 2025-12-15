import inquirer from "inquirer";
import type { Importer } from "../../types.ts";
import { TrelloJsonImporter } from "./TrelloJsonImporter.ts";

const BASE_PATH = process.cwd();

export const trelloJsonImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<TrelloImportAnswers>(questions);
  const trelloImporter = new TrelloJsonImporter(
    answers.trelloFilePath,
    answers.mapListsToStatuses,
    answers.discardArchivedCards,
    answers.discardArchivedLists
  );
  return trelloImporter;
};

interface TrelloImportAnswers {
  trelloFilePath: string;
  mapListsToStatuses: boolean;
  discardArchivedCards: boolean;
  discardArchivedLists: boolean;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "trelloFilePath",
    message: "Select your exported JSON file of Trello cards",
  },
  {
    type: "confirm",
    name: "mapListsToStatuses",
    message: "Would you like to map Trello lists to statuses?",
    default: true,
  },
  {
    type: "confirm",
    name: "discardArchivedCards",
    message: "Would you like to discard the archived cards?",
    default: true,
  },
  {
    type: "confirm",
    name: "discardArchivedLists",
    message: "Would you like to discard the (possibly unarchived) cards within archived lists?",
    default: true,
  },
];
