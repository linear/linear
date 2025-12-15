import inquirer from "inquirer";
import type { Importer } from "../../types.ts";
import { JiraCsvImporter } from "./JiraCsvImporter.ts";

const BASE_PATH = process.cwd();

const JIRA_URL_REGEX = /^https?:\/\/(\S+).atlassian.net/;

export const jiraCsvImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<JiraImportAnswers>(questions);
  let orgSlug = "";
  if (answers.jiraUrlName) {
    orgSlug = answers.jiraUrlName.match(JIRA_URL_REGEX)?.[1] ?? "";
  }
  const jiraImporter = new JiraCsvImporter(answers.jiraFilePath, orgSlug, answers.customJiraUrl);
  return jiraImporter;
};

interface JiraImportAnswers {
  jiraFilePath: string;
  isCloud: boolean;
  customJiraUrl: string;
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
    type: "confirm",
    name: "isCloud",
    message: "Is your Jira installation on Jira Cloud (url similar to https://acme.atlassian.net)?",
    default: true,
  },
  {
    type: "input",
    name: "customJiraUrl",
    message: "Input the URL of your on-prem Jira installation (e.g. https://jira.mydomain.com):",
    when: (answers: JiraImportAnswers) => {
      return !answers.isCloud;
    },
    validate: (input: string) => {
      return input !== "";
    },
  },
  {
    type: "input",
    name: "jiraUrlName",
    message: "Input the URL of your Jira Cloud installation (e.g. https://acme.atlassian.net):",
    when: (answers: JiraImportAnswers) => {
      return answers.isCloud;
    },
    validate: (input: string) => {
      return !!input.match(JIRA_URL_REGEX);
    },
  },
];
