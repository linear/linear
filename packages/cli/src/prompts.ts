import { prompt } from "enquirer";
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
    choices: (await client.team.getAll()).map(t => t.name),
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
