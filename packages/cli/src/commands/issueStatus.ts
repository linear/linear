import { Issue } from "@linear/sdk";
import inquirer from "inquirer";
import _ from "lodash";
import ora from "ora";
import { createClient } from "../client";
import { Config } from "../config";
import { printError, printSuccess } from "../messages";

/**
 * Change issue status.
 */
export const issueStatus = async (config: Config, issueId: string) => {
  const linear = createClient(config);

  // First, fetch the issue
  const issue: Issue = await linear.getIssue(issueId, "{ id project { id } }");

  // Fetch project states
  const states = await linear.client.query.projectStates(
    {},
    `{ id name project { id } }`
  );
  const projectStates = states.filter(
    state => state.project.id === issue.project.id
  );

  const state = await inquirer.prompt<{
    id: string;
  }>([
    {
      type: "list",
      name: "id",
      message: "Change status to:",
      choices: _.orderBy(projectStates, ["position"]).map(state => ({
        name: state.name,
        value: state.id,
        short: state.name
      }))
    }
  ]);

  // Change status.
  try {
    const spinner = ora().start();
    await linear.client.mutation.issueUpdate(
      {
        id: issue.id,
        input: {
          stateId: state.id
        }
      },
      "{ issue { id } }"
    );
    spinner.stop();
    printSuccess(`${issueId} status changed.`);
  } catch (err) {
    printError("Unable to change status.");
    process.exit();
  }
};
