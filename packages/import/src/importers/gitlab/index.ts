import * as inquirer from "inquirer";
import { Importer } from "../../types";
import { GitLabImporter } from "./GitlabImporter";

export const gitlabImport = async (): Promise<Importer> => {
  const answer = await inquirer.prompt<GitLabImportAnswers>(gitlabImportQuestions);

  const [, projectName] = answer.repo.split("/");
  return new GitLabImporter(projectName, answer.gitlabAccessToken);
};

interface GitLabImportAnswers {
  gitlabAccessToken: string;
  repo: string;
}

const gitlabImportQuestions = [
  {
    type: "input",
    name: "gitlabAccessToken",
    message: "GitLab Access Token(personal):",
    validate: (input: string) => {
      if (input.length > 0) {
        return true;
      }
      return "Please enter your GitLab access token";
    },
  },
  {
    type: "input",
    name: "repo",
    message: "Repository(account/project):",
    validate: (input: string) => {
      if (input.length > 0) {
        return true;
      }
      return "Please enter the repository";
    },
  },
];
