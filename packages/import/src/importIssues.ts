/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import chalk from "chalk";
import * as inquirer from "inquirer";
import _ from "lodash";
import linearClient from "./client";
import { GraphQLClientRequest } from "./client/types";
import { Comment, Importer, ImportResult } from "./types";
import { getTeamProjects } from "./utils/getTeamProjects";
import { replaceImagesInMarkdown } from "./utils/replaceImages";

interface ImportAnswers {
  newTeam: boolean;
  includeComments?: boolean;
  includeProject?: string;
  selfAssign?: boolean;
  targetAssignee?: string;
  targetProjectId?: boolean;
  targetTeamId?: string;
  teamName?: string;
}

interface QueryResponse {
  teams: {
    nodes: {
      id: string;
      name: string;
      key: string;
      projects: {
        nodes: {
          id: string;
          name: string;
          key: string;
        }[];
      };
    }[];
  };
  users: {
    nodes: {
      id: string;
      name: string;
      active: boolean;
    }[];
  };
  viewer: {
    id: string;
  };
}

interface TeamInfoResponse {
  team: {
    labels: {
      nodes: {
        id: string;
        name: string;
      }[];
    };
    states: {
      nodes: {
        id: string;
        name: string;
      }[];
    };
  };
}

interface LabelCreateResponse {
  issueLabelCreate: {
    issueLabel: {
      id: string;
    };
    success: boolean;
  };
}

/**
 * Import issues into Linear via the API.
 */
export const importIssues = async (apiKey: string, importer: Importer) => {
  const linear = linearClient(apiKey);
  const importData = await importer.import();

  const queryInfo = (await linear(`
    query {
      teams {
        nodes {
          id
          name
          key
          projects {
            nodes {
              id
              name
            }
          }
        }
      }
      viewer {
        id
      }
      users {
        nodes {
          id
          name
          active
        }
      }
    }
  `)) as QueryResponse;

  const teams = queryInfo.teams.nodes;
  const users = queryInfo.users.nodes.filter(user => user.active);
  const me = queryInfo.viewer.id;

  // Prompt the user to either get or create a team
  const importAnswers = await inquirer.prompt<ImportAnswers>([
    {
      type: "confirm",
      name: "newTeam",
      message: "Do you want to create a new team for imported issues?",
      default: true,
    },
    {
      type: "input",
      name: "teamName",
      message: "Name of the team:",
      default: importer.defaultTeamName || importer.name,
      when: (answers: ImportAnswers) => {
        return answers.newTeam;
      },
    },
    {
      type: "list",
      name: "targetTeamId",
      message: "Import into team:",
      choices: async () => {
        return teams.map((team: { id: string; name: string; key: string }) => ({
          name: `[${team.key}] ${team.name}`,
          value: team.id,
        }));
      },
      when: (answers: ImportAnswers) => {
        return !answers.newTeam;
      },
    },
    {
      type: "confirm",
      name: "includeProject",
      message: "Do you want to import to a specific project?",
      when: (answers: ImportAnswers) => {
        // if no team is selected then don't show projects screen
        if (!answers.targetTeamId) {
          return false;
        }

        const projects = getTeamProjects(answers.targetTeamId, teams);
        return projects.length > 0;
      },
    },
    {
      type: "list",
      name: "targetProjectId",
      message: "Import into project:",
      choices: async (answers: ImportAnswers) => {
        const projects = getTeamProjects(answers.targetTeamId as string, teams);
        return projects.map((project: { id: string; name: string }) => ({
          name: project.name,
          value: project.id,
        }));
      },
      when: (answers: ImportAnswers) => {
        return answers.includeProject;
      },
    },
    {
      type: "confirm",
      name: "includeComments",
      message: "Do you want to include comments in the issue description?",
      when: () => {
        return !!importData.issues.find(issue => issue.comments && issue.comments.length > 0);
      },
    },
    {
      type: "confirm",
      name: "selfAssign",
      message: "Do you want to assign these issues to yourself?",
      default: true,
    },
    {
      type: "list",
      name: "targetAssignee",
      message: "Assign to user:",
      choices: () => {
        const map = users.map((user: { id: string; name: string }) => ({
          name: user.name,
          value: user.id,
        }));
        map.push({ name: "[Unassigned]", value: "" });
        return map;
      },
      when: (answers: ImportAnswers) => {
        return !answers.selfAssign;
      },
    },
  ]);

  let teamKey: string;
  let teamId: string;
  if (importAnswers.newTeam) {
    // Create a new team
    const teamResponse = await linear(
      `mutation createIssuesTeam($name: String!) {
            teamCreate(input: { name: $name }) {
              success
              team {
                id
                name
                key
              }
            }
          }
        `,
      {
        name: importAnswers.teamName as string,
      }
    );
    teamKey = (teamResponse as any).teamCreate.team.key;
    teamId = (teamResponse as any).teamCreate.team.id;
  } else {
    // Use existing team
    teamKey = teams.find(team => team.id === importAnswers.targetTeamId)?.key ?? "unknown";
    teamId = importAnswers.targetTeamId as string;
  }

  const teamInfo = (await linear(`query {
    team(id: "${teamId}") {
      labels {
        nodes {
          id
          name
        }
      }
      states {
        nodes {
          id
          name
        }
      }
    }
  }`)) as TeamInfoResponse;

  const issueLabels = teamInfo.team.labels.nodes;
  const workflowStates = teamInfo.team.states.nodes;

  const existingLabelMap = {} as { [name: string]: string };
  for (const label of issueLabels) {
    const labelName = label.name.toLowerCase();
    if (!existingLabelMap[labelName]) {
      existingLabelMap[labelName] = label.id;
    }
  }

  const projectId = importAnswers.targetProjectId;

  // Create labels and mapping to source data
  const labelMapping = {} as { [id: string]: string };
  for (const labelId of Object.keys(importData.labels)) {
    const label = importData.labels[labelId];
    const labelName = _.truncate(label.name.trim(), { length: 20 });
    let actualLabelId = existingLabelMap[labelName.toLowerCase()];

    if (!actualLabelId) {
      const labelResponse = (await linear(
        `
          mutation createLabel($teamId: String!, $name: String!, $description: String, $color: String) {
            issueLabelCreate(input: { name: $name, description: $description, color: $color, teamId: $teamId }) {
              issueLabel {
                id
              }
              success
            }
          }
        `,
        {
          name: labelName,
          description: label.description,
          color: label.color,
          teamId,
        }
      )) as LabelCreateResponse;

      actualLabelId = labelResponse.issueLabelCreate.issueLabel.id;
      existingLabelMap[labelName.toLowerCase()] = actualLabelId;
    }
    labelMapping[labelId] = actualLabelId;
  }

  const existingStateMap = {} as { [name: string]: string };
  for (const state of workflowStates) {
    const stateName = state.name.toLowerCase();
    if (!existingStateMap[stateName]) {
      existingStateMap[stateName] = state.id;
    }
  }

  const existingUserMap = {} as { [name: string]: string };
  for (const user of users) {
    const userName = user.name.toLowerCase();
    if (!existingUserMap[userName]) {
      existingUserMap[userName] = user.id;
    }
  }

  // Create issues
  for (const issue of importData.issues) {
    const issueDescription = issue.description
      ? await replaceImagesInMarkdown(linear, issue.description, importData.resourceURLSuffix)
      : undefined;

    const description =
      importAnswers.includeComments && issue.comments
        ? await buildComments(linear, issueDescription || "", issue.comments, importData)
        : issueDescription;

    const labelIds = issue.labels ? issue.labels.map(labelId => labelMapping[labelId]) : undefined;

    const stateId = !!issue.status ? existingStateMap[issue.status.toLowerCase()] : undefined;

    const existingAssigneeId: string | undefined = !!issue.assigneeId
      ? existingUserMap[issue.assigneeId.toLowerCase()]
      : undefined;

    const assigneeId: string | undefined =
      existingAssigneeId || importAnswers.selfAssign
        ? me
        : !!importAnswers.targetAssignee && importAnswers.targetAssignee.length > 0
        ? importAnswers.targetAssignee
        : undefined;

    await linear(
      `
          mutation createIssue(
              $teamId: String!,
              $projectId: String,
              $title: String!,
              $description: String,
              $priority: Int,
              $labelIds: [String!]
              $stateId: String
              $assigneeId: String
            ) {
            issueCreate(input: {
                                teamId: $teamId,
                                projectId: $projectId,
                                title: $title,
                                description: $description,
                                priority: $priority,
                                labelIds: $labelIds
                                stateId: $stateId
                                assigneeId: $assigneeId
                              }) {
              success
            }
          }
        `,
      {
        teamId,
        projectId,
        title: issue.title,
        description,
        priority: issue.priority,
        labelIds,
        stateId,
        assigneeId,
      }
    );
  }

  console.error(
    chalk.green(`${importer.name} issues imported to your backlog: https://linear.app/team/${teamKey}/backlog`)
  );
};

// Build comments into issue description
const buildComments = async (
  client: GraphQLClientRequest,
  description: string,
  comments: Comment[],
  importData: ImportResult
) => {
  const newComments: string[] = [];
  for (const comment of comments) {
    const user = importData.users[comment.userId];
    const date = comment.createdAt ? comment.createdAt.toISOString().split("T")[0] : undefined;

    const body = await replaceImagesInMarkdown(client, comment.body || "", importData.resourceURLSuffix);
    newComments.push(`**${user.name}**${" " + date}\n\n${body}\n`);
  }
  return `${description}\n\n---\n\n${newComments.join("\n\n")}`;
};
