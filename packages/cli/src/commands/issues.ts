import { CommanderStatic, Command } from "commander";

export const register = (program: CommanderStatic): any => {
  program
    .command("issues")
    .description("List your issues with different filters")
    .option("-a, --active", "List your active issues")
    .option("-b, --backlog", "List your backlog issues")
    .option("-x, --closed", "List your closed issues")
    .option("-e, --all", "List all your issues")
    .action((command: Command) => {
      const { active, backlog, closed, all } = command;
      if (!(active || backlog || closed || all)) {
        command.outputHelp();
      }
      if (all || active) {
        console.log("list my active issues");
      }
      if (all || backlog) {
        console.log("list my backlog issues");
      }
      if (all || closed) {
        console.log("List my closed issues");
      }
    });
};
