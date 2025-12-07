import * as inquirer from "inquirer";
import { Importer } from "../../types";
import { TrelloJsonImporter } from "./TrelloJsonImporter";

const BASE_PATH = process.cwd();

export const trelloJsonImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<TrelloImportAnswers>(questions);
  const trelloImporter = new TrelloJsonImporter(
    answers.trelloFilePath,
    answers.mapListsToStatuses,
    answers.discardArchivedCards,
    answers.discardArchivedLists,
    answers.migrateAttachments,
    answers.migrateAttachments ? answers.trelloApiKey || "" : "",
    answers.migrateAttachments ? answers.trelloApiToken || "" : ""
  );
  return trelloImporter;
};

interface TrelloImportAnswers {
  trelloFilePath: string;
  mapListsToStatuses: boolean;
  discardArchivedCards: boolean;
  discardArchivedLists: boolean;
  migrateAttachments: boolean;
  trelloApiKey: string;
  trelloApiToken: string;
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
  {
    type: "confirm",
    name: "migrateAttachments",
    message:
      "Do you want to migrate attachments? (If yes, you need to provide your Trello API Key and Token otherwise the importer will simply include links to the trello attachments)",
    default: false,
  },
  {
    type: "string",
    name: "trelloApiKey",
    message: "Please enter your Trello API Key",
    default: "",
    when: (answers: TrelloImportAnswers) => answers.migrateAttachments,
  },
  {
    type: "string",
    name: "trelloApiToken",
    message: "Please enter your Trello API Token",
    default: "",
    when: (answers: TrelloImportAnswers) => answers.migrateAttachments,
  },
];
