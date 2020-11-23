/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as inquirer from "inquirer";
import { Importer } from "../../types";
import { JiraCsvImporter } from "./JiraCsvImporter";

const BASE_PATH = process.cwd();

const JIRA_URL_REGEX = /^https?:\/\/(\S+).atlassian.net/;

export const jiraCsvImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<JiraImportAnswers>(questions);
  const orgSlug = answers.jiraUrlName.match(JIRA_URL_REGEX)![1];
  const jiraImporter = new JiraCsvImporter(answers.jiraFilePath, orgSlug);
  return jiraImporter;
};

interface JiraImportAnswers {
  jiraFilePath: string;
  jiraUrlName: string;
}

const questions = [
  {
    basePath: BASE_PATH,
    type: "filePath",
    name: "jiraFilePath",
    message: "Select your exported CSV file of Jira issues",
  },
  {
    type: "input",
    name: "jiraUrlName",
    message: "Input the URL of your Jira installation (e.g. https://acme.atlassian.net):",
    validate: (input: string) => {
      return !!input.match(JIRA_URL_REGEX);
    },
  },
];
