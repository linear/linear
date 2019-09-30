import { prompt } from "enquirer";
import open from "open";
import os from "os";
import { client } from "./client";

export { prompt } from "enquirer";

export const titlePrompt = async () =>
  prompt<{ title: string }>({
    type: "input",
    name: "title",
    message: "Write an issue title",
  });

export const teamPrompt = async () =>
  prompt<{ team: string }>({
    type: "select",
    name: "team",
    message: "Pick a team",
    choices: (await client.team.getAll()).map(t => ({
      name: t.id,
      message: t.name,
    })),
  });

type AfterResolve<T> = T extends Promise<infer U> ? U : T;
type IssuesType = AfterResolve<ReturnType<typeof client.issue.getAll>>;

export const issuePrompt = async (teamName?: string) => {
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

export const openPrompt = async (url: string) =>
  prompt<{ answer: boolean }>({
    type: "confirm",
    name: "answer",
    message: `Would you like to open ${url.split("/").pop()}?`,
  }).then(({ answer }) => {
    const link = os.platform() === "darwin" ? url.replace("https://linear.app/", "linear://") : url;
    if (answer) {
      open(link);
    } else {
      console.log(`You can always open it later at ${link}`);
    }
  });
