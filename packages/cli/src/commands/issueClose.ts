import ora from "ora";
import { createClient } from "../client";
import { Config } from "../config";
import { printError, printSuccess } from "../messages";

/**
 * Mark issue as done.
 */
export const issueClose = async (config: Config, issueId: string) => {
  const linear = createClient(config);

  // First, fetch the issue
  const issue = await linear.getIssue(issueId);

  // Change status to first completed state.
  const spinner = ora().start();
  try {
    await linear.client.mutation.issueClose(
      {
        id: issue.id
      },
      "{ issue { id } }"
    );
    spinner.stop();
    printSuccess(`${issueId} marked as done.`);
  } catch (err) {
    spinner.stop();
    printError("Unable to change status.");
    process.exit();
  }
};
