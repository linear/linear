import chalk from "chalk";

export const printError = (msg: string) => console.error(chalk.red(msg));

export const printSuccess = (msg: string) =>
  console.error(chalk.cyanBright(msg));
