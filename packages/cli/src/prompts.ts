import { prompt } from "enquirer";
import open from "open";
import os from "os";

export { prompt } from "enquirer";

type Client = typeof import("./client").client;

export const titlePrompt = async () =>
  prompt<{ title: string }>({
    type: "input",
    name: "title",
    message: "Write an issue title",
  });

export const teamPrompt = async () => {
  const { client } = await import("./client");
  return prompt<{
    team: string;
  }>({
    type: "select",
    name: "team",
    message: "Pick a team",
    choices: (await client.team.getAll()).map(t => ({
      name: t.id,
      message: t.name,
    })),
  });
};

type AfterResolve<T> = T extends Promise<infer U> ? U : T;
type IssuesType = AfterResolve<ReturnType<Client["issue"]["getAll"]>>;

export const issuePrompt = async (teamName?: string) => {
  const { client } = await import("./client");
  let issues: IssuesType["issues"];
  if (teamName) {
    const { team } = await client.issue.getAllFromTeam({ name: teamName });
    issues = team.issues;
  } else {
    const { issues: allIssues } = await client.issue.getAll();
    issues = allIssues;
  }

  return prompt<{
    issueKey: string;
  }>({
    type: "autocomplete",
    name: "issueKey",
    message: "Pick an issue",
    choices: issues.map(i => ({
      name: `${i.team.key}-${i.number}`,
      message: `[${i.team.key}-${i.number}] ${i.title}`,
    })),
  });
};

export const openPrompt = async (url: string, force = false) => {
  const shouldOpen =
    force ||
    (await prompt<{
      answer: boolean;
    }>({
      type: "confirm",
      name: "answer",
      message: `Would you like to open ${url.replace("https://linear.app/", "")} in linear?`,
    }).then(({ answer }) => answer));

  const link = os.platform() === "darwin" ? url.replace("https://linear.app/", "linear://") : url;
  shouldOpen ? open(link) : console.log(`You can always open it later at ${link}`);
};

export const apiKeyPrompt = async () =>
  prompt<{ apiKey: string }>({
    type: "password",
    name: "apiKey",
    message: "Enter your linear api key",
  });
