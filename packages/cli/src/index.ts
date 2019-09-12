#! /usr/bin/env node

import program from "commander";
import { login, logout } from "./commands/auth";
import { issueAssign } from "./commands/issueAssign";
import { issueClose } from "./commands/issueClose";
import { CommentIssueArgs, issueComment } from "./commands/issueComment";
import { issueStatus } from "./commands/issueStatus";
import { newIssue, NewIssueArgs } from "./commands/newIssue";
import { openIssue } from "./commands/openIssue";
import { loadConfig } from "./config";

(async () => {
  program.version(process.env.npm_package_version || "");

  // Unauthenticated commands

  program
    .command("login")
    .description("Login to Linear")
    .action(login);

  // Authenticated commands

  const config = loadConfig();
  if (!config) {
    await login;
  } else {
    program
      .command("logout")
      .description("Logout session")
      .action(logout);

    program
      .command("issue [title]")
      .alias("i")
      .option("--description <description>", "Issue description")
      .option("--skipInput", "Skip user input (title required)")
      .description("Create a new issue")
      .action((title: string, args: NewIssueArgs) =>
        newIssue(config!, title, args)
      );

    program
      .command("comment <issueId>")
      .alias("c")
      .option("--comment <comment>", "Comment")
      .description(
        "Comment on issue. If `--comment` is omitted, interactive comment composer is opened"
      )
      .action((issueId: string, args: CommentIssueArgs) =>
        issueComment(config!, issueId, args)
      );

    program
      .command("close <issueId>")
      .description("Mark issue as done.")
      .action((issueId: string) => issueClose(config!, issueId));

    program
      .command("status <issueId>")
      .description("Change issue status.")
      .action((issueId: string) => issueStatus(config!, issueId));

    program
      .command("assign <issueId>")
      .description("Change issue assignee.")
      .action((issueId: string) => issueAssign(config!, issueId));

    program
      .command("open [issue ID]")
      .alias("o")
      .description("Opens issue in the browser")
      .action(openIssue);
  }

  program.parse(process.argv);
})();
