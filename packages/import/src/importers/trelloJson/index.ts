import * as inquirer from "inquirer";
import { Importer } from "../../types";
import { TrelloJsonImporter } from "./TrelloJsonImporter";

const BASE_PATH = process.cwd();

export const trelloJsonImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<TrelloImportAnswers>(questions);
  const trelloImporter = new TrelloJsonImporter(
    answers.trelloFilePath,
    answers.discardArchivedCards,
    answers.discardArchivedLists,
    answers.listToStatusMap
  );
  return trelloImporter;
};

interface TrelloImportAnswers {
  trelloFilePath: string;
  discardArchivedCards: boolean;
  discardArchivedLists: boolean;
  listToStatusMap: string;
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
  {
    type: "input",
    name: "listToStatusMap",
    message: "Enter a mapping for list name to linear status, e.g. ListName1=Status1,Listname2=Status2",
    default:
      "Backlog=Backlog,Todo=Todo,In Progress=In Progress,In Review=In Review,Done=Done,Canceled=Canceled,Triage=Triage",
  },
];
