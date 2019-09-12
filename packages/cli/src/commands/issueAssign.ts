import { Issue } from "@linear/sdk";
import inquirer from "inquirer";
import _ from "lodash";
import ora from "ora";
import { createClient } from "../client";
import { Config } from "../config";
import { printError, printSuccess } from "../messages";

/**
 * Change issue assignee.
 */
export const issueAssign = async (config: Config, issueId: string) => {
  const linear = createClient(config);

  // First, fetch the issue
  const issue: Issue = await linear.getIssue(issueId, "{ id project { id } }");

  // Fetch users
  const users = await linear.client.query.users();

  const assignee = await inquirer.prompt<{
    id: string;
  }>([
    {
      type: "list",
      name: "id",
      message: "Assign issue to:",
      choices: users.map(user => ({
        name: user.name,
        value: user.id,
        short: user.name
      }))
    }
  ]);

  // Assign to user.
  try {
    const spinner = ora().start();
    await linear.client.mutation.issueUpdate(
      {
        id: issue.id,
        input: {
          assigneeId: assignee.id
        }
      },
      "{ issue { id } }"
    );
    spinner.stop();
    printSuccess(`${issueId} assignee changed.`);
  } catch (err) {
    printError("Unable to change status.");
    process.exit();
  }
};
