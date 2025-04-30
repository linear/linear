import ora from "ora";
import TurndownService from "turndown";
import { Importer, ImportResult, IssuePriority } from "../../types";
import { heightClient } from "./client";
type HeightPriority = "Critical" | "High" | "Medium" | "Low";

type TeamList = {
  list: {
    id: string;
    name: string;
  }[];
};

type UserList = {
  list: {
    id: string;
    username: string;
    email: string;
  }[];
};

type TaskList = {
  list: {
    id: string;
    name: string;
    createdAt: string;
    completedAt: string;
    descriptionRichText: string;
    status: string;
    tags: string[];
    assigneesIds: string[];
    fields: {
      name: string;
      label?: {
        value: string;
      };
      labels?: {
        value: string;
      }[];
    }[];
  }[];
};

/**
 * Import issues from a Height.
 *
 * @param apiKey Height API key
 * @param teamName Name of the team to import
 */
export class HeightImporter implements Importer {
  public constructor(apiKey: string, teamName: string) {
    this.apiKey = apiKey;
    this.teamName = teamName;
  }

  public get name(): string {
    return "Height (CSV)";
  }

  public get defaultTeamName(): string {
    return "Height";
  }

  public import = async (): Promise<ImportResult> => {
    const turndown = new TurndownService();
    const height = heightClient(this.apiKey);

    let spinner = ora("Fetching teams").start();

    const teams = (await height("/teams")) as TeamList;

    const teamId = teams.list.find(team => team.name === this.teamName)?.id;
    if (!teamId) {
      throw new Error(`Team ${this.teamName} not found`);
    }

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    spinner.stop();
    spinner = ora("Fetching users").start();

    const users = (await height("/users", {})) as UserList;

    for (const user of users.list) {
      importData.users[user.id] = {
        name: user.username,
        email: user.email,
      };
    }

    spinner.stop();
    spinner = ora("Fetching tasks").start();

    let hasNext = true;
    let cursor = "";
    while (hasNext) {
      const issues = (await height("/tasks", {
        usePagination: true,
        expand: JSON.stringify(["subTasks"]),
        filters: JSON.stringify({
          and: [{ teamIds: { values: [teamId] } }, cursor ? { createdAt: { gt: {date: cursor} } } : undefined].filter(Boolean),
        }),
        order: JSON.stringify([{ column: "createdAt", direction: "ASC" }]),
        limit: 50,
      })) as TaskList;

      if (issues.list.length === 0) {
        hasNext = false;
      } else {
        cursor = issues.list[issues.list.length - 1].createdAt;
      }

      for (const issue of issues.list) {
        const status = issue.status;
        if (importData.statuses?.[status]) {
          importData.statuses[status] = {
            name: status,
          };
        }

        const assigneeId = issue.assigneesIds[0];
        const priority = mapPriority(issue.fields.find(f => f.name === "Priority")?.label?.value as HeightPriority);
        const labels = issue.fields.find(f => f.name === "Tags")?.labels?.map(tag => tag.value) || [];

        importData.issues.push({
          title: issue.name,
          description: turndown.turndown(issue.descriptionRichText),
          status,
          assigneeId,
          priority,
          createdAt: new Date(issue.createdAt),
          completedAt: issue.completedAt ? new Date(issue.completedAt) : undefined,
          labels,
        });

        for (const lab of labels) {
          if (!importData.labels[lab]) {
            importData.labels[lab] = {
              name: lab,
            };
          }
        }
      }
    }

    spinner.stop();
    return importData;
  };

  // -- Private interface

  private apiKey: string;
  private teamName: string;
}

const mapPriority = (input?: HeightPriority): IssuePriority => {
  if (!input) {
    return 0;
  }

  const priorityMap: Record<HeightPriority, IssuePriority> = {
    Critical: 1,
    High: 2,
    Medium: 3,
    Low: 4,
  };
  return priorityMap[input] || 0;
};
