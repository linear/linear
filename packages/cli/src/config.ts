import chalk from "chalk";
import * as fs from "fs";
import { CONFIG_FILE } from "./constants";

export interface Config {
  token: string;
  projectId: string;
  projectName: string;
  projectKey: string;
  editor?: string;
}

export const loadConfig = (): Config | undefined => {
  try {
    return JSON.parse(`${fs.readFileSync(CONFIG_FILE)}`) as Config;
  } catch (err) {
    return;
  }
};

export const saveConfig = (config: Config) => {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config));
    console.log(`Configuration saved: ${chalk.blue(CONFIG_FILE)}`);
  } catch (err) {
    console.log(chalk.red("Unable to save configuration."));
  }
};

export const deleteConfig = () => {
  try {
    fs.unlinkSync(CONFIG_FILE);
    console.log(`Configuration removed.`);
  } catch (err) {
    console.log(chalk.red("Unable to clear configuration."));
  }
};
