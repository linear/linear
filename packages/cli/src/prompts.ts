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
