/* eslint-disable no-console */
import { LinearClient } from "@linear/sdk";
import { format } from "date-fns";
import chalk from "chalk";
import * as inquirer from "inquirer";
import _, { uniq } from "lodash";
import { Comment, Importer, ImportResult } from "./types";
import { replaceImagesInMarkdown } from "./utils/replaceImages";
import { Presets, SingleBar } from "cli-progress";
import ora from "ora";

type Id = string;

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

  const viewerQuery = await client.viewer;

  let spinner = ora("Fetching teams and users").start();

  const allTeams = await client.paginate(client.teams, {});
  const allUsers = await client.paginate(client.users, { includeDisabled: false });

  spinner.stop();
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
        return allTeams.map(team => ({
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
        const map = allUsers.map(user => ({
          name: user.name,
          value: user.id,
        }));

        map.unshift({ name: "[Unassigned]", value: "" });
        map.unshift({ name: "[Provided assignee]", value: "{{assignee}}" });

        return map;
      },
      when: (answers: ImportAnswers) => {
        return !answers.selfAssign;
      },
    },
  ]);

  let teamKey: string | undefined;
  let teamId: Id | undefined;
  if (importAnswers.newTeam) {
    // Create a new team
    const teamResponse = await client.createTeam({
      name: importAnswers.teamName as string,
    });
    const team = await teamResponse?.team;

    teamKey = team?.key;
    teamId = team?.id;
  } else {
    // Use existing team
    const existingTeam = allTeams?.find(team => team.id === importAnswers.targetTeamId);

    teamKey = existingTeam?.key;
    teamId = importAnswers.targetTeamId as string;
  }

  if (!teamId) {
    throw new Error("No team id found");
  }

  const teamInfo = await client.team(teamId);
  const organization = await client.organization;

  const existingLabels = [];

  spinner = ora("Fetching labels").start();

  const allTeamLabels = await teamInfo.paginate(teamInfo.labels, {});
  const allWorkspaceLabels = await client.paginate(organization.labels, {});

  existingLabels.push(...allTeamLabels, ...allWorkspaceLabels);

  spinner.stop();
  spinner = ora("Fetching workflow states").start();

  const workflowStates = await teamInfo?.states();

  const existingLabelMap = {} as { [name: string]: Id };
  const existingLabelGroupsMap = {} as { [name: string]: Id };
  // Map of groupId to its labelIds
  const existingGroupIdLabelMap = {} as { [id: Id]: { [name: string]: Id } };

  for (const label of existingLabels) {
    const labelName = label.name?.toLowerCase();
    if (label.isGroup) {
      if (labelName && label.id && !existingLabelGroupsMap[labelName]) {
        existingLabelGroupsMap[labelName] = label.id;
      }
    } else {
      if (labelName && label.id && !existingLabelMap[labelName]) {
        existingLabelMap[labelName] = label.id;
      }
    }
  }

  const projectId = importAnswers.targetProjectId;

  const labelMapping = await handleLabels(client, importData, teamId, {
    existingLabelMap,
    existingLabelGroupsMap,
    existingGroupIdLabelMap,
  });

  const existingStateMap = {} as { [name: string]: string };
  for (const state of workflowStates?.nodes ?? []) {
    const stateName = state.name?.toLowerCase();
    if (stateName && state.id && !existingStateMap[stateName]) {
      existingStateMap[stateName] = state.id;
    }
  }

  const existingUserMapByName = {} as { [name: string]: string };
  const existingUserMapByEmail = {} as { [email: string]: string };
  for (const user of allUsers) {
    const userName = user.name?.toLowerCase();
    if (userName && !existingUserMapByName[userName]) {
      existingUserMapByName[userName] = user.id;
    }

    if (!existingUserMapByEmail[user.email]) {
      existingUserMapByEmail[user.email] = user.id;
    }
  }

  spinner.stop();
  const issuesProgressBar = new SingleBar({}, Presets.shades_classic);
  issuesProgressBar.start(importData.issues.length, 0);
  let issueCursor = 0;

  // Create issues
  for (const issue of importData.issues) {
    const issueDescription = issue.description
      ? await replaceImagesInMarkdown(client, issue.description, importData.resourceURLSuffix)
      : undefined;

    const description =
      importAnswers.includeComments && issue.comments
        ? await buildComments(client, issueDescription || "", issue.comments, importData)
        : issueDescription;

    const labelIds = issue.labels ? uniq(issue.labels.map(labelId => labelMapping[labelId])) : undefined;

    let stateId = !!issue.status ? existingStateMap[issue.status.toLowerCase()] : undefined;
    // Create a new state since one doesn't already exist with this name
    if (!stateId && issue.status) {
      let stateType = "backlog";
      if (issue.completedAt) {
        stateType = "completed";
      } else if (issue.startedAt) {
        stateType = "started";
      }
      const newStateResult = await client.createWorkflowState({
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

    const issueAssigneeId = issue.assigneeId?.toLowerCase();
    const existingAssigneeId: Id | undefined = !!issueAssigneeId
      ? existingUserMapByEmail[issueAssigneeId] ?? existingUserMapByName[issueAssigneeId]
      : undefined;

    let assigneeId: Id | undefined;
    if (importAnswers.selfAssign) {
      assigneeId = viewer;
    } else if (importAnswers.targetAssignee === "{{assignee}}") {
      assigneeId = existingAssigneeId;
    } else {
      assigneeId = importAnswers.targetAssignee || undefined;
    }

    const formattedDueDate = issue.dueDate ? format(issue.dueDate, "yyyy-MM-dd") : undefined;

    const createdIssue = await createIssueWithRetries(client, {
      teamId,
      projectId: projectId as unknown as string,
      title: issue.title,
      description,
      priority: issue.priority,
      labelIds,
      stateId,
      assigneeId,
      createdAt: issue.createdAt,
      completedAt: issue.completedAt,
      dueDate: formattedDueDate,
      estimate: issue.estimate,
    });

    if (issue.archived) {
      await (await createdIssue.issue)?.archive();
    }

    issueCursor++;
    issuesProgressBar.update(issueCursor);
  }

  issuesProgressBar.stop();

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

const createIssueWithRetries = async (
  client: LinearClient,
  input: Parameters<LinearClient["createIssue"]>[0],
  retries = 3
): ReturnType<LinearClient["createIssue"]> => {
  try {
    return await client.createIssue(input);
  } catch (error) {
    if (error.type === "Ratelimited" && retries > 0) {
      // Hard-coded to 1 minute for now; when we do LIN-17685, we can use the X-RateLimit-Endpoint-Requests-Remaining
      // header to find out how long to wait.
      await new Promise(resolve => setTimeout(resolve, 60000));
      return createIssueWithRetries(client, input, retries - 1);
    } else {
      throw error;
    }
  }
};

const handleLabels = async (
  client: LinearClient,
  data: ImportResult,
  teamId: string,
  state: {
    existingLabelMap: { [name: string]: string };
    existingLabelGroupsMap: { [name: string]: string };
    existingGroupIdLabelMap: { [id: Id]: { [name: string]: Id } };
  }
) => {
  const { existingLabelMap, existingLabelGroupsMap, existingGroupIdLabelMap } = state;
  const { labels } = data;

  const createLabel = async ({
    name,
    description,
    color,
    parentId,
  }: {
    name: string;
    description?: string;
    color?: string;
    parentId?: string;
  }) => {
    const labelResponse = await client.createIssueLabel({
      name,
      description,
      color,
      teamId,
      parentId,
    });

    const issueLabel = await labelResponse?.issueLabel;
    return issueLabel?.id;
  };

  // Create labels and mapping to source data
  const labelMapping = {} as { [id: string]: Id };

  for (const labelId of Object.keys(labels)) {
    const label = labels[labelId];
    let labelName = _.truncate(label.name.trim(), { length: 80 });

    let groupLabelId: string | undefined;
    // Handle label groups
    if (labelName.indexOf("/") !== -1) {
      const parts = labelName.split("/");
      const group = parts.slice(0, -1).join("/");
      const subgroup = parts[parts.length - 1];

      groupLabelId = existingLabelGroupsMap[group.toLowerCase()];

      const rootLabelExists = existingLabelMap[group.toLowerCase()] !== undefined;

      // Label group does not exist, create it
      if (!groupLabelId) {
        groupLabelId = await createLabel({
          name: rootLabelExists ? `${group} (group)` : group,
          color: label.color,
          description: label.description,
        });

        if (groupLabelId) {
          existingLabelGroupsMap[group.toLowerCase()] = groupLabelId;
          existingGroupIdLabelMap[groupLabelId] = {};
        }
      }

      labelName = subgroup; // Use the subgroup name for the actual label
    }

    let actualLabelId: string | undefined;
    if (groupLabelId) {
      // If we have a group label, check if we've already created the subgroup label
      actualLabelId = existingGroupIdLabelMap[groupLabelId]?.[labelName.toLowerCase()];
    } else {
      // Check if this label matches with an existing group label
      actualLabelId = existingLabelGroupsMap[labelName.toLowerCase()];

      if (actualLabelId) {
        // This label has matched with an existing group label. We cannot re-use the label as-is, it will be renamed.
        actualLabelId = undefined;
        labelName = `${labelName} (imported)`;
      }

      // Check if this label matches with an existing root label
      actualLabelId = existingLabelMap[labelName.toLowerCase()];
    }

    if (!actualLabelId) {
      // We haven't found an existing label, create it
      actualLabelId = await createLabel({
        name: labelName,
        color: label.color,
        description: label.description,
        parentId: groupLabelId,
      });

      if (groupLabelId && actualLabelId) {
        existingGroupIdLabelMap[groupLabelId][labelName.toLowerCase()] = actualLabelId;
      } else if (actualLabelId) {
        existingLabelMap[labelName.toLowerCase()] = actualLabelId;
      }
    }

    if (actualLabelId) {
      labelMapping[labelId] = actualLabelId;
    }
  }

  return labelMapping;
};
