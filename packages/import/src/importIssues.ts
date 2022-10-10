/* eslint-disable no-console */
import { LinearClient } from "@linear/sdk";
import { format } from "date-fns";
import chalk from "chalk";
import * as inquirer from "inquirer";
import _ from "lodash";
import { Comment, Importer, ImportResult } from "./types";
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

const defaultStateColors = {
  backlog: "#bec2c8",
  started: "#f2c94c",
  completed: "#5e6ad2",
};

/**
 * Import issues into Linear via the API.
 */
export const importIssues = async (apiKey: string, importer: Importer): Promise<void> => {
  const client = new LinearClient({ apiKey });
  const importData = await importer.import();

  const teamsQuery = await client.teams();
  const viewerQuery = await client.viewer;
  const usersQuery = await client.users();

  const teams = teamsQuery?.nodes ?? [];
  const users = usersQuery?.nodes?.filter(user => user.active) ?? [];
  const viewer = viewerQuery?.id;

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
        return teams.map(team => ({
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
      when: async (answers: ImportAnswers) => {
        // if no team is selected then don't show projects screen
        if (!answers.targetTeamId) {
          return false;
        }

        const team = await client.team(answers.targetTeamId);
        const teamProjects = await team?.projects();

        const projects = teamProjects?.nodes ?? [];
        return projects.length > 0;
      },
    },
    {
      type: "list",
      name: "targetProjectId",
      message: "Import into project:",
      choices: async (answers: ImportAnswers) => {
        // if no team is selected then don't show projects screen
        if (!answers.targetTeamId) {
          return false;
        }

        const team = await client.team(answers.targetTeamId);
        const teamProjects = await team?.projects();

        const projects = teamProjects?.nodes ?? [];
        return projects.map(project => ({
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
        const map = users.map(user => ({
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

  let teamKey: string | undefined;
  let teamId: string | undefined;
  if (importAnswers.newTeam) {
    // Create a new team
    const teamResponse = await client.teamCreate({
      name: importAnswers.teamName as string,
    });
    const team = await teamResponse?.team;

    teamKey = team?.key;
    teamId = team?.id;
  } else {
    // Use existing team
    const existingTeam = teams?.find(team => team.id === importAnswers.targetTeamId);

    teamKey = existingTeam?.key;
    teamId = importAnswers.targetTeamId as string;
  }

  if (!teamId) {
    throw new Error("No team id found");
  }

  const teamInfo = await client.team(teamId);

  const issueLabels = await teamInfo?.labels();
  const workflowStates = await teamInfo?.states();

  const existingLabelMap = {} as { [name: string]: string };
  for (const label of issueLabels?.nodes ?? []) {
    const labelName = label.name?.toLowerCase();
    if (labelName && label.id && !existingLabelMap[labelName]) {
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
      const labelResponse = await client.issueLabelCreate({
        name: labelName,
        description: label.description,
        color: label.color,
        teamId,
      });

      const issueLabel = await labelResponse?.issueLabel;
      if (issueLabel?.id) {
        actualLabelId = issueLabel?.id;
      }
      existingLabelMap[labelName.toLowerCase()] = actualLabelId;
    }
    labelMapping[labelId] = actualLabelId;
  }

  const existingStateMap = {} as { [name: string]: string };
  for (const state of workflowStates?.nodes ?? []) {
    const stateName = state.name?.toLowerCase();
    if (stateName && state.id && !existingStateMap[stateName]) {
      existingStateMap[stateName] = state.id;
    }
  }

  const existingUserMap = {} as { [name: string]: string };
  for (const user of users) {
    const userName = user.name?.toLowerCase();
    if (userName && user.id && !existingUserMap[userName]) {
      existingUserMap[userName] = user.id;
    }
  }

  // Create issues
  for (const issue of importData.issues) {
    const issueDescription = issue.description
      ? await replaceImagesInMarkdown(client, issue.description, importData.resourceURLSuffix)
      : undefined;

    const description =
      importAnswers.includeComments && issue.comments
        ? await buildComments(client, issueDescription || "", issue.comments, importData)
        : issueDescription;

    const labelIds = issue.labels ? issue.labels.map(labelId => labelMapping[labelId]) : undefined;

    let stateId = !!issue.status ? existingStateMap[issue.status.toLowerCase()] : undefined;
    // Create a new state since one doesn't already exist with this name
    if (!stateId && issue.status) {
      let stateType = "backlog";
      if (issue.completedAt) {
        stateType = "completed";
      } else if (issue.startedAt) {
        stateType = "started";
      }
      const newStateResult = await client.workflowStateCreate({
        name: issue.status,
        teamId,
        color: defaultStateColors[stateType],
        type: stateType,
      });
      if (newStateResult?.success) {
        const newState = await newStateResult.workflowState;
        if (newState?.id) {
          existingStateMap[issue.status.toLowerCase()] = newState.id;
          stateId = newState.id;
        }
      }
    }

    const existingAssigneeId: string | undefined = !!issue.assigneeId
      ? existingUserMap[issue.assigneeId.toLowerCase()]
      : undefined;

    const assigneeId: string | undefined =
      existingAssigneeId || importAnswers.selfAssign
        ? viewer
        : !!importAnswers.targetAssignee && importAnswers.targetAssignee.length > 0
        ? importAnswers.targetAssignee
        : undefined;

    const formattedDueDate = issue.dueDate ? format(issue.dueDate, "yyyy-MM-dd") : undefined;

    await client.issueCreate({
      teamId,
      projectId: projectId as unknown as string,
      title: issue.title,
      description,
      priority: issue.priority,
      labelIds,
      stateId,
      assigneeId,
      dueDate: formattedDueDate,
    });
  }

  console.info(chalk.green(`${importer.name} issues imported to your team: https://linear.app/team/${teamKey}/all`));
};

// Build comments into issue description
const buildComments = async (
  client: LinearClient,
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
