/* eslint-disable no-console */
import { IssueRelationType, LinearClient } from "@linear/sdk";
import chalk from "chalk";
import { Presets, SingleBar } from "cli-progress";
import { format } from "date-fns";
import inquirer from "inquirer";
import uniq from "lodash/uniq.js";
import ora from "ora";
import { handleLabels } from "./helpers/labelManager.ts";
import type { Comment, Importer, ImportResult, Issue } from "./types.ts";
import { replaceImagesInMarkdown } from "./utils/replaceImages.ts";

type Id = string;

interface ImportAnswers {
  newTeam: boolean;
  includeComments?: boolean;
  includeProject?: string;
  selfAssign?: boolean;
  targetAssignee?: string;
  targetProjectId?: string;
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

interface NonInteractiveFlags {
  project?: string;
  includeComments?: boolean;
  selfAssign?: boolean;
}

/** One resolved dependency between two source-batch issues. Holds the source issues until creation maps them to Linear ids. */
interface ResolvedDependency {
  /** The issue that blocks. */
  blocker: Issue;
  /** The issue that is blocked. */
  blocked: Issue;
}

/** Maps a source issue to the Linear id created for it during the import loop. */
type CreatedIssueIds = Map<Issue, string>;

/**
 * Import issues into Linear via the API.
 */
export const importIssues = async (
  apiKey: string,
  importer: Importer,
  apiUrl?: string,
  targetTeamIdFlag?: string,
  flags?: NonInteractiveFlags
): Promise<void> => {
  const client = new LinearClient({ apiKey, apiUrl });
  const importData = await importer.import();

  // Resolve and validate dependency references against the source batch before any workspace mutation
  // (team creation, label creation, or issue creation). A bad reference must abort before anything is
  // created, otherwise a re-run would duplicate issues or strand a half-mutated workspace.
  const resolvedDependencies = resolveDependencies(importData.issues);

  const viewerQuery = await client.viewer;

  let spinner = ora("Fetching teams and users").start();

  const allTeams = await client.paginate(client.teams, {});
  allTeams.sort((a, b) => a.displayName.localeCompare(b.displayName));

  const allUsers = await client.paginate(client.users, { includeDisabled: false });

  spinner.stop();
  const viewer = viewerQuery?.id;

  let resolvedTeamIdFlag: string | undefined;
  if (targetTeamIdFlag) {
    const matchedTeam = allTeams.find(
      team => team.id === targetTeamIdFlag || team.key.toLowerCase() === targetTeamIdFlag.toLowerCase()
    );
    if (matchedTeam) {
      resolvedTeamIdFlag = matchedTeam.id;
    } else {
      console.error(
        chalk.red(`Team "${targetTeamIdFlag}" not found. Available teams: ${allTeams.map(t => t.key).join(", ")}`)
      );
      process.exit(1);
    }
  }

  let resolvedProjectIdFlag: string | undefined;
  if (flags?.project && !resolvedTeamIdFlag) {
    console.error(chalk.red("--project requires --team to be specified."));
    process.exit(1);
  }
  if (flags?.project && resolvedTeamIdFlag) {
    const team = await client.team(resolvedTeamIdFlag);
    const teamProjects = await team?.projects();
    const projects = teamProjects?.nodes ?? [];
    const matchedProject = projects.find(
      p => p.id === flags.project || p.name.toLowerCase() === flags.project!.toLowerCase()
    );
    if (matchedProject) {
      resolvedProjectIdFlag = matchedProject.id;
    } else {
      console.error(
        chalk.red(`Project "${flags.project}" not found. Available projects: ${projects.map(p => p.name).join(", ")}`)
      );
      process.exit(1);
    }
  }

  let importAnswers: ImportAnswers;
  if (resolvedTeamIdFlag) {
    importAnswers = {
      newTeam: false,
      targetTeamId: resolvedTeamIdFlag,
      selfAssign: flags?.selfAssign ?? false,
      includeComments: flags?.includeComments ?? false,
    };
  } else {
    importAnswers = await inquirer.prompt<ImportAnswers>([
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
  }

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

  const projectId = resolvedProjectIdFlag || importAnswers.targetProjectId;
  const labelMapping = await handleLabels(client, importData, teamId, [...allTeamLabels, ...allWorkspaceLabels]);

  const existingStateMap = {} as { [name: string]: string };
  const canceledStateId = workflowStates?.nodes?.find(state => state.type === "canceled")?.id;
  for (const state of workflowStates?.nodes ?? []) {
    const stateName = state.name?.toLowerCase();
    if (!stateName || !state.id) {
      continue;
    }
    if (state.type === "duplicate") {
      // duplicate-type states are rejected by createIssue; route incoming statuses with this name to canceled instead
      if (canceledStateId && !existingStateMap[stateName]) {
        existingStateMap[stateName] = canceledStateId;
      }
      continue;
    }
    if (!existingStateMap[stateName]) {
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

  // Only track created ids when dependencies need to be linked afterwards.
  const createdIssueIds: CreatedIssueIds | undefined = resolvedDependencies.length > 0 ? new Map() : undefined;

  // Create issues
  for (const issue of importData.issues) {
    const issueDescription = issue.description
      ? importData.skipImageReplacement
        ? issue.description
        : await replaceImagesInMarkdown(client, issue.description, importData.resourceURLSuffix)
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
      const createdIssue = await withRateLimitRetries(() =>
        client.createIssue({
          teamId,
          projectId,
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
        })
      );

      if (issue.archived) {
        await (await createdIssue.issue)?.archive();
      }

      const createdIssueId = createdIssue.issueId;
      if (createdIssue.success === false || !createdIssueId) {
        issuesProgressBar.stop();
        throw new Error(
          `Failed to create issue "${issue.title}": the API rejected the creation (no issue id returned).`
        );
      }
      if (createdIssueIds) {
        createdIssueIds.set(issue, createdIssueId);
      }

      issueCursor++;
      issuesProgressBar.update(issueCursor);
    } catch (error) {
      issuesProgressBar.stop();
      throw error;
    }
  }

  issuesProgressBar.stop();

  if (resolvedDependencies.length > 0 && createdIssueIds) {
    spinner = ora("Creating issue dependencies").start();
    try {
      await createRelations(client, resolvedDependencies, createdIssueIds);
    } finally {
      spinner.stop();
    }
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

    const body = importData.skipImageReplacement
      ? comment.body || ""
      : await replaceImagesInMarkdown(client, comment.body || "", importData.resourceURLSuffix);
    newComments.push(`**${user.name}**${" " + date}\n\n${body}\n`);
  }
  return `${description}\n\n---\n\n${newComments.join("\n\n")}`;
};

/**
 * Run a Linear request, retrying up to `retries` times when the API rate-limits the caller. Both issue
 * creation and relation creation ride this wrapper so a rate-limited import does not fail midway.
 */
const withRateLimitRetries = async <T>(request: () => Promise<T>, retries = 3): Promise<T> => {
  try {
    return await request();
  } catch (error) {
    if (error.type === "Ratelimited" && retries > 0) {
      // Hard-coded to 1 minute for now; when we do LIN-17685, we can use the X-RateLimit-Endpoint-Requests-Remaining
      // header to find out how long to wait.
      await new Promise(resolve => setTimeout(resolve, 60000));
      return withRateLimitRetries(request, retries - 1);
    } else {
      throw error;
    }
  }
};

/**
 * Resolve every `blocks` / `blockedBy` reference against the source batch and return the deduplicated
 * dependency pairs to create. Each reference is matched, in order, against:
 *
 * 1. a source issue's externalId (its row `Id`),
 * 2. a case-insensitive, trimmed title match.
 *
 * A reference that matches zero issues or more than one issue aborts the import before any issue is created.
 * Pairs are canonicalized (the blocking issue first) and deduplicated so one dependency expressed in both
 * the `Blocks` and `Blocked By` columns is created only once.
 */
export const resolveDependencies = (issues: Issue[]): ResolvedDependency[] => {
  const byExternalId = new Map<string, Issue[]>();
  const byLowerTitle = new Map<string, Issue[]>();

  for (const issue of issues) {
    if (issue.externalId) {
      const idMatches = byExternalId.get(issue.externalId) ?? [];
      idMatches.push(issue);
      byExternalId.set(issue.externalId, idMatches);
    }
    const lowerTitle = issue.title.trim().toLowerCase();
    const titleMatches = byLowerTitle.get(lowerTitle) ?? [];
    titleMatches.push(issue);
    byLowerTitle.set(lowerTitle, titleMatches);
  }

  const match = (reference: string): Issue => {
    const trimmed = reference.trim();
    const idMatches = byExternalId.get(trimmed);
    if (idMatches) {
      if (idMatches.length > 1) {
        throw new Error(
          `dependency reference "${reference}" matched ${idMatches.length} issues in this import (row Ids must be unique)`
        );
      }
      return idMatches[0];
    }

    const titleMatches = byLowerTitle.get(trimmed.toLowerCase());
    if (!titleMatches) {
      throw new Error(`dependency reference "${reference}" matched 0 issues in this import`);
    }
    if (titleMatches.length > 1) {
      throw new Error(
        `dependency reference "${reference}" matched ${titleMatches.length} issues in this import (titles must be unique)`
      );
    }
    return titleMatches[0];
  };

  // Two issues can only share one `blocks` relation regardless of which column expressed it, so key the
  // seen-set on the ordered pair of issue indices and keep first-occurrence order. A pair declared in both
  // directions (row A blocks B and row B blocks A) is rejected rather than silently collapsed, and a
  // self-reference is rejected too, so malformed graphs fail before any issue is created.
  const indexByIdentity = new Map<Issue, number>();
  issues.forEach((issue, index) => indexByIdentity.set(issue, index));

  const seen = new Set<string>();
  const unique: ResolvedDependency[] = [];
  for (const issue of issues) {
    for (const reference of issue.blocks ?? []) {
      const blocked = match(reference);
      if (blocked === issue) {
        throw new Error(`dependency reference "${reference}" refers to the issue itself in Blocks`);
      }
      const blockerIdx = indexByIdentity.get(issue)!;
      const blockedIdx = indexByIdentity.get(blocked)!;
      const key = `${blockerIdx}:${blockedIdx}`;
      const reverseKey = `${blockedIdx}:${blockerIdx}`;
      if (seen.has(reverseKey)) {
        throw new Error(
          `dependency reference "${reference}" declares a blocks relation in both directions (rows reference each other)`
        );
      }
      if (!seen.has(key)) {
        seen.add(key);
        unique.push({ blocker: issue, blocked });
      }
    }
    for (const reference of issue.blockedBy ?? []) {
      const blocker = match(reference);
      if (blocker === issue) {
        throw new Error(`dependency reference "${reference}" refers to the issue itself in Blocked By`);
      }
      const blockerIdx = indexByIdentity.get(issue)!;
      const blockedIdx = indexByIdentity.get(blocker)!;
      const key = `${blockedIdx}:${blockerIdx}`;
      const reverseKey = `${blockerIdx}:${blockedIdx}`;
      if (seen.has(reverseKey)) {
        throw new Error(
          `dependency reference "${reference}" declares a blocks relation in both directions (rows reference each other)`
        );
      }
      if (!seen.has(key)) {
        seen.add(key);
        unique.push({ blocker, blocked: issue });
      }
    }
  }
  return unique;
};

/**
 * Create the resolved `blocks` relations once every issue in the batch has been created. The source issues
 * resolved at validation time are mapped to their created Linear ids; any issue whose creation did not return
 * an id is skipped and reported. Each relation creation is retried on rate limits, and its `success` flag is
 * checked so a silent partial graph is never reported as a successful import.
 */
const createRelations = async (
  client: LinearClient,
  dependencies: ResolvedDependency[],
  createdIssueIds: CreatedIssueIds
): Promise<void> => {
  for (const dep of dependencies) {
    const issueId = createdIssueIds.get(dep.blocker);
    const relatedIssueId = createdIssueIds.get(dep.blocked);

    if (!issueId || !relatedIssueId) {
      console.error(
        chalk.yellow(
          `Skipped dependency "${dep.blocked.title}" blocked by "${dep.blocker.title}": a referenced issue could not be matched to a created issue.`
        )
      );
      continue;
    }

    const result = await withRateLimitRetries(() =>
      client.createIssueRelation({
        issueId,
        relatedIssueId,
        type: IssueRelationType.Blocks,
      })
    );
    if (result.success === false) {
      throw new Error(
        `Failed to create dependency between "${dep.blocker.title}" and "${dep.blocked.title}": the API rejected the relation.`
      );
    }
  }
};
