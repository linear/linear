/* eslint-disable no-console */
import { LinearClient } from "@linear/sdk";
import chalk from "chalk";
import { Presets, SingleBar } from "cli-progress";
import { format } from "date-fns";
import * as inquirer from "inquirer";
import { uniq } from "lodash";
import ora from "ora";
import { handleLabels } from "./helpers/labelManager";
import { Comment, Importer, ImportResult } from "./types";
import { replaceImagesInMarkdown } from "./utils/replaceImages";

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

enum IssueStatus {
  Backlog = "backlog",
  Started = "started",
  Completed = "completed",
}

const defaultStateColors: Record<IssueStatus, string> = {
  [IssueStatus.Backlog]: "#bec2c8",
  [IssueStatus.Started]: "#f2c94c",
  [IssueStatus.Completed]: "#5e6ad2",
};

/**
 * Import issues into Linear via the API.
 */
export const importIssues = async (apiKey: string, importer: Importer, apiUrl?: string): Promise<void> => {
  const client = new LinearClient({ apiKey, apiUrl });
  const importData = await importer.import();

  const viewerQuery = await client.viewer;

  let spinner = ora("Fetching teams and users").start();

  const allTeams = await client.paginate(client.teams, {});
  allTeams.sort((a, b) => a.displayName.localeCompare(b.displayName));

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
          name: `[${team.key}] ${team.displayName}`,
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

  spinner = ora("Fetching labels").start();

  const allTeamLabels = await teamInfo.paginate(teamInfo.labels, {});
  const allWorkspaceLabels = await client.paginate(organization.labels, {});

  spinner.stop();
  spinner = ora("Fetching workflow states").start();

  const workflowStates = await teamInfo?.states();

  spinner.stop();
  spinner = ora("Updating labels").start();

  const projectId = importAnswers.targetProjectId;
  const labelMapping = await handleLabels(client, importData, teamId, [...allTeamLabels, ...allWorkspaceLabels]);

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

    const labelIds = issue.labels ? uniq(issue.labels.map(labelId => labelMapping[labelId].id)) : undefined;

    let stateId = !!issue.status ? existingStateMap[issue.status.toLowerCase()] : undefined;
    // Create a new state since one doesn't already exist with this name
    if (!stateId && issue.status) {
      let stateType = IssueStatus.Backlog;
      if (issue.completedAt) {
        stateType = IssueStatus.Completed;
      } else if (issue.startedAt) {
        stateType = IssueStatus.Started;
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
      ? (existingUserMapByEmail[issueAssigneeId] ?? existingUserMapByName[issueAssigneeId])
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

    try {
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
    } catch (error) {
      issuesProgressBar.stop();
      throw error;
    }
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
