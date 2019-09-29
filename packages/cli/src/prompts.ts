import { prompt } from "enquirer";
import { client } from "./client";

export const teamPrompt = async () =>
  prompt<{ team: string }>({
    type: "select",
    name: "team",
    message: "Pick a team",
    choices: (await client.team.getAll()).map(t => t.name),
  });
