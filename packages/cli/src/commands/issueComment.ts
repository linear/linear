import { Issue } from "@linear/sdk";
import ora from "ora";
import { createClient } from "../client";
import { Config } from "../config";
import { readEditorContent } from "../editor/editor";
import { printError, printSuccess } from "../messages";

const commentTemplate = (
  issueTitle: string
) => `# Please enter the comment in markdown.
# Lines starting with '#' will be ignored.
#
# Issue details:
#     title:   ${issueTitle}

`;

export interface CommentIssueArgs {
  comment?: string;
}

/**
 * Create an issue comment.
 */
export const issueComment = async (
  config: Config,
  issueId: string,
  args: CommentIssueArgs
) => {
  const linear = createClient(config);

  // First, fetch the issue
  const issueData: Issue = await linear.getIssue(issueId);

  // Comment body
  const comment =
    args.comment ||
    (await readEditorContent(config, commentTemplate(issueData.title)));

  if (!comment || comment.length === 0) {
    printError("Comment body required.");
    process.exit();
  }

  // Create comment
  try {
    const spinner = ora().start();
    await linear.client.mutation.commentCreate(
      {
        input: {
          body: comment!,
          issueId: issueData!.id
        }
      },
      "{ comment { id } }"
    );
    spinner.stop();
    printSuccess(`Comment posted.`);
  } catch (err) {
    printError("Unable to create comment.");
    process.exit();
  }
};
