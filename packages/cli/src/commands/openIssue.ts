import chalk from "chalk";
import open from "open";
import { URL } from "../constants";

const ISSUE_REGEXP = new RegExp(/^(\w+)-\d+$/);

export const openIssue = async (issueId: string) => {
  const match = issueId.match(ISSUE_REGEXP);
  if (match && match.length) {
    open(`${URL}/projects/${match[1]}/all/${match[0]}`);
  } else {
    console.log(chalk.red(`Invalid issue ID. Should be in form ENG-123`));
  }
};
