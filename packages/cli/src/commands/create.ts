import { Command, flags } from "@oclif/command";
import dedent from "dedent";
import prompt from "prompts";
import { client } from "../client";

export default class Create extends Command {
  public static description = dedent`
    Creates a new issue
  `;

  public static examples = [
    dedent`
      $ linear create
      $ linear create --title "Fix a bug" --label Bug
    `,
  ];

  public static flags = {
    help: flags.help({ char: "h" }),
    label: flags.string({
      char: "l",
      multiple: true,
      description: "label to be added to the issue",
    }),
    title: flags.string({
      char: "t",
    }),
    team: flags.string({
      char: "T",
      env: "LINEAR_TEAM",
    }),
  };

  public async run() {
    const { flags } = this.parse(Create);
    let { team, title, label: labels } = flags;
    const teams = await client.team.getAll();

    if (!team) {
      const answer = await prompt({
        type: "select",
        name: "team",
        message: "Pick the team this issue is for",
        choices: teams.map(team => ({
          title: team.name,
          value: team.id,
        })),
      });
      team = answer.team as string;
    } else {
      const teamResult = await client.team.getByName(team);
      if (!teamResult) {
        this.error(
          `Couldn't find team ${team}. Maybe you meant one of these:\n` + teams.map(team => `\t- ${team.name}\n`)
        );
        process.exit(1);
        return;
      }
      team = teamResult.id;
      team as string;
    }

    if (!title) {
      const answer = await prompt({
        type: "text",
        name: "title",
        message: "Enter the issue title",
      });
      title = answer.title as string;
    }

    if (!labels || labels.length !== 0) {
      const teamLabels = await client.label.getNamesFromTeam({ id: team });
      if (teamLabels.length !== 0) {
        const answer = await prompt({
          type: "multiselect",
          name: "labels",
          message: "Add labels to the issue",
          choices: teamLabels.map(label => ({
            title: label.name,
            value: label.id,
          })),
        });
        labels = answer.labels;
      }
    }

    client.issue.create({
      title,
      teamId: team,
      labelIds: labels,
    });
  }
}
