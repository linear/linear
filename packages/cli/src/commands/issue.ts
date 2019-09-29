import { Command, CommanderStatic } from "commander";
import { client } from "../client";
import { extraHelp } from "../shared";

const accumulateLabels = (label: string, previousLabels: string) => Array.from(new Set(previousLabels.concat(label)));

const registerIssueOptions = (command: Command) =>
  command
    .option("-c, --create <title>", "create an issue")
    .option("-d, --description <description>", "set the description")
    .option("-s, --state <state>", "set the state")
    .option("-a, --assignee <user>", "add an assignee")
    .option("-p, --priority <priority>", "set the priority")
    .option("-l, --label <labelName>", "add a label", accumulateLabels, [])
    .option("-r, --rename <newTitle>", "rename the issue")
    .option("-E, --estimate <estimate>", "change the estimate")
    .option("-P, --project <project>", "set the project")
    .option("-C, --cycle <cycle>", "add to a cycle")
    .option("--archive", "archive this issue")
    .action((issueKey, cmd) => {
      const {
        archive,
        create: newTitle,
        state,
        assignee,
        priority,
        label: labels,
        rename: renamedTitle,
        estimate,
        project,
        cycle,
      } = cmd;
      if (issueKey && !issueKey.match(/[A-Za-z]+-\d+/)) {
        console.error(`Invalid issue key ${issueKey} expected something like ABC-123\n`);
        cmd.outputHelp();
        process.exit(1);
      }
      if (!issueKey && !newTitle) {
        console.error(`Expected to be called with '-c title' or ABC-123`);
      }
      if (archive && (!issueKey || newTitle)) {
        console.error(`Can't archive issue without issueKey or while creating a new issue`);
      }
      if (newTitle) {
        console.log("creating issue", newTitle);
      }
      if (state) {
        console.log("setting issue state to", state);
      }
      if (assignee) {
        console.log("setting assignee to", assignee);
      }
    })
    .on("--help", extraHelp);

export const register = (program: CommanderStatic) => {
  // @ts-ignore
  if (global.registerIssueGlobally) {
    // const { args } = program.parseOptions(process.argv);
    registerIssueOptions(program.arguments("[issueKey]"));
    // program.emit("command:*");
  }
  registerIssueOptions(program.command("issue [issueKey]").description("View, create, or update an issue"));
};
