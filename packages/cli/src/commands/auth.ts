import * as inquirer from "inquirer";
import ora from "ora";
import { createClient } from "../client";
import { deleteConfig, saveConfig } from "../config";

export const login = async () => {
  console.log(
    "Login required. Please create and developer key at https://linear.app/settings"
  );

  const input = await inquirer.prompt<{ apiKey: string }>([
    {
      type: "input",
      name: "apiKey",
      message: "Enter your developer key:"
    }
  ]);

  if (!input.apiKey) {
    process.exit();
  }

  const linear = createClient({ token: input.apiKey });
  const spinner = ora().start();
  const projects = await linear.client.query.projects();
  spinner.stop();

  let projectId: string;
  let projectKey: string;
  let projectName: string;
  if (projects.length === 1) {
    const { id, key, name } = projects[0];
    projectId = id;
    projectKey = key;
    projectName = name;
  } else {
    const projectInput = await inquirer.prompt<{
      project: string;
    }>([
      {
        type: "list",
        name: "project",
        message: "Default project:",
        choices: projects.map(project => ({
          name: `[${project.key}] ${project.name}`,
          value: project.id,
          short: project.key
        }))
      }
    ]);
    projectId = projectInput.project;
    const { key, name } = projects.find(project => project.id === projectId)!;
    projectKey = key;
    projectName = name;
  }

  const editorInput = await inquirer.prompt<{
    editor: string;
  }>([
    {
      type: "input",
      name: "editor",
      message: "Editor:",
      default: process.env.EDITOR || process.env.VISUAL || "vim"
    }
  ]);

  saveConfig({
    token: input.apiKey,
    projectId,
    projectName,
    projectKey,
    editor: editorInput.editor
  });
};

export const logout = async () => {
  deleteConfig();
};
