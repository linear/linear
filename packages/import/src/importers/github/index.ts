import inquirer from "inquirer";
import type { Importer } from "../../types.ts";
import { GithubImporter } from "./GithubImporter.ts";
import { githubTokenError } from "./client.ts";

export const githubImport = async (): Promise<Importer> => {
  const answers = await inquirer.prompt<GithubImportAnswers>(questions);

  const [owner, repo] = answers.repo.split("/");
  const githubImporter = new GithubImporter(answers.githubApiKey, owner, repo);
  return githubImporter;
};

interface GithubImportAnswers {
  githubApiKey: string;
  linearApiKey: string;
  repo: string;
}

const questions = [
  {
    type: "input",
    name: "githubApiKey",
    message: "Input your personal GitHub access token (https://github.com/settings/tokens, select `repo` scope)",
    filter: (input: string) => input.trim(),
    validate: (input: string) => githubTokenError(input) ?? true,
  },
  {
    type: "input",
    name: "repo",
    message: 'From which repo do you want to import issues from (e.g. "facebook/react")',
  },
];
