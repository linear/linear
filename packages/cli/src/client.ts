import { Linear } from "@linear/sdk";
import { Issue } from "@linear/sdk/dist/generated-binding";
import chalk from "chalk";
import ora from "ora";

export const createClient = (config: { token: string }) =>
  new LinearClient({ token: config.token });

class LinearClient {
  public constructor(config: { token: string }) {
    this.token = config.token;
  }

  public get client() {
    return new Linear({ token: this.token });
  }

  public getIssue = async (issueId: string, info?: string): Promise<Issue> => {
    let issue: Issue;
    const spinner = ora().start();
    try {
      issue = await this.client.query.issue(
        {
          id: issueId
        },
        info
      );
      spinner.stop();
      return issue;
    } catch (err) {
      spinner.stop();
      console.log(chalk.red("Unknown issue."));
      process.exit();
    }
    return issue!;
  };

  // -- Private instance

  private token: string;
}
