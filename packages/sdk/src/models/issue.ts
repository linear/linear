import { gql } from "gql";
import { Linear } from "../linear";
import {
  CreateIssueFromCliMutation,
  CreateIssueFromCliMutationVariables,
  GetAllIssuesFromCliQuery,
  GetAllTeamIssuesFromCliQuery,
  GetIssueFromCliQuery,
  GetIssueFromCliQueryVariables,
  GetTeamIssueIdsFromCliQuery,
  GetTeamIssueIdsFromCliQueryVariables,
  UpdateIssueFromCliMutation,
  UpdateIssueFromCliMutationVariables,
} from "./issue.generated";
import { getLabelIdFromSelection, LabelSelection } from "./label";
import { GetAllLabelsFromCliQueryVariables } from "./label.generated";
import { Priority } from "./priority";
import { getTeamIdFromKey, getTeamIdFromSelection, TeamSelection } from "./team";

/**
 * An object containing the UUID of an issue or an object containing the issue key.
 * The issue key is formatted like `LNR-123`
 */
export type IssueSelection = { id: string } | { key: string };

export const IssueDetails = gql`
  fragment IssueDetails on Issue {
    id
    title
    number
    description
    priority
    estimate
    assignee {
      id
      name
    }
    team {
      key
    }
    labels {
      id
      name
    }
  }
`;

export const getAllIssues = async (client: Linear) =>
  client.request<GetAllIssuesFromCliQuery>(gql`
    ${IssueDetails}
    query GetAllIssuesFromCLI {
      issues {
        ...IssueDetails
      }
    }
  `);

export const getAllTeamIssues = async (client: Linear, team: TeamSelection) => {
  const teamId = await getTeamIdFromSelection(client, team);
  return client.request<GetAllTeamIssuesFromCliQuery, GetAllLabelsFromCliQueryVariables>(
    gql`
      ${IssueDetails}
      query GetAllTeamIssuesFromCLI($teamId: String!) {
        team(id: $teamId) {
          issues {
            ...IssueDetails
          }
        }
      }
    `,
    { teamId }
  );
};

export const getIssue = async (client: Linear, selection: IssueSelection) => {
  if ("id" in selection) {
    return client.request<GetIssueFromCliQuery, GetIssueFromCliQueryVariables>(
      gql`
        ${IssueDetails}
        query GetIssueFromCLI($id: String!) {
          issue(id: $id) {
            ...IssueDetails
          }
        }
      `,
      selection
    );
  } else {
    return getIssueIdFromKey(client, selection.key);
  }
};

export const getIssueIdFromKey = async (client: Linear, key: string) => {
  const [teamKey, issueNumber] = key.split("-");
  const teamId = await getTeamIdFromKey(client, teamKey);
  if (!teamId) {
    throw new Error(`No team with the key ${teamKey}`);
  }
  const { team } = await client.request<GetTeamIssueIdsFromCliQuery, GetTeamIssueIdsFromCliQueryVariables>(
    gql`
      query GetTeamIssueIdsFromCLI($teamId: String!) {
        team(id: $teamId) {
          issues {
            id
            number
          }
        }
      }
    `,
    { teamId }
  );
  const issue = team.issues.find(i => i.number === parseInt(issueNumber));
  if (issue) {
    return issue.id;
  } else {
    return null;
  }
};

export const getIssueIdFromSelection = (client: Linear, selection: IssueSelection) => {
  if ("id" in selection) {
    return Promise.resolve(selection.id);
  }
  return getIssueIdFromKey(client, selection.key);
};

export const getIssueByKey = async (client: Linear, key: string) => {
  const id = await getIssueIdFromKey(client, key);
  if (id) {
    return getIssue(client, { id });
  } else {
    return null;
  }
};

interface IssueCreationOptions {
  team: TeamSelection;
  title: string;
  description?: string;
  state?: string;
  assignee?: string;
  priority?: Priority;
  labels?: LabelSelection[];
  estimate?: string;
  project?: string;
  cycle?: string;
}

export const createIssue = async (client: Linear, issueInput: IssueCreationOptions) => {
  const teamId = await getTeamIdFromSelection(client, issueInput.team);
  if (!teamId) {
    throw new Error(`Failed to find team id for selection ${issueInput.team}`);
  }

  const labelIds = issueInput.labels
    ? ((await Promise.all(issueInput.labels.map(label => getLabelIdFromSelection(client, label)))) as string[]) // TS 3.7 will make this cleaner with type assertions
    : undefined;
  if (labelIds && labelIds.some(id => id === null)) {
    throw new Error(`One of the labels of the selection is invalid ${issueInput.labels}`);
  }

  return client.request<CreateIssueFromCliMutation, CreateIssueFromCliMutationVariables>(
    gql`
      mutation CreateIssueFromCLI(
        $title: String!
        $teamId: String!
        $labelIds: [String!]
        $description: String
        $assigneeId: String
        $priority: Int
        $estimate: Int
        $cycleId: String
        $projectId: String
        $stateId: String
      ) {
        issueCreate(
          input: {
            title: $title
            teamId: $teamId
            labelIds: $labelIds
            description: $description
            assigneeId: $assigneeId
            estimate: $estimate
            priority: $priority
            cycleId: $cycleId
            projectId: $projectId
            stateId: $stateId
          }
        ) {
          issue {
            id
            number
            url
            team {
              key
            }
          }
        }
      }
    `,
    {
      title: issueInput.title,
      teamId,
      labelIds,
    }
  );
};

export const updateIssue = async (client: Linear, issueInput: UpdateIssueFromCliMutationVariables) =>
  client.request<UpdateIssueFromCliMutation, UpdateIssueFromCliMutationVariables>(
    gql`
      mutation UpdateIssueFromCLI($id: String!, $title: String, $description: String, $labelIds: [String!]) {
        issueUpdate(id: $id, input: { title: $title, description: $description }) {
          issue {
            id
            number
            team {
              key
            }
          }
        }
      }
    `,
    issueInput
  );

export const registerIssue = (client: Linear) => ({
  create: createIssue.bind(null, client),
  get: getIssue.bind(null, client),
  getAll: getAllIssues.bind(null, client),
  getIdFromKey: getIssueByKey.bind(null, client),
  getByKey: getIssueByKey.bind(null, client),
  getAllFromTeam: getAllTeamIssues.bind(null, client),
});
