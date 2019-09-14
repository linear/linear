// tslint:disable:no-invalid-this
import { gql } from "gql";
import { Linear } from "../linear";
import {
  CreateIssueFromCliMutation,
  CreateIssueFromCliMutationVariables,
  UpdateIssueFromCliMutation,
  UpdateIssueFromCliMutationVariables,
  GetTeamIssueIdsFromCliQuery,
  GetTeamIssueIdsFromCliQueryVariables,
  GetIssueFromCliQuery,
  GetIssueFromCliQueryVariables,
} from "./issue.generated";
import { getTeamIdFromKey } from "./team";

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
    assignee
    labels {
      id
      name
    }
  }
`;

export const getAllIssues = async (client: Linear) =>
  client.request(gql`
    ${IssueDetails}
    query GetAllIssuesFromCLI {
      issues {
        ...IssueDetails
      }
    }
  `);

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
  const issue = team.issues.find(issue => issue.number === parseInt(issueNumber));
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

export const createIssue = async (client: Linear, issueInput: CreateIssueFromCliMutationVariables) =>
  client.request<CreateIssueFromCliMutation, CreateIssueFromCliMutationVariables>(
    gql`
      mutation CreateIssueFromCLI($title: String!, $teamId: String!, $labelIds: [String!]) {
        issueCreate(input: { title: $title, teamId: $teamId, labelIds: $labelIds }) {
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

export const issue = (client: Linear) => ({
  create: createIssue.bind(null, client),
  get: getIssue.bind(null, client),
  getAll: getAllIssues.bind(null, client),
  getIdFromKey: getIssueByKey.bind(null, client),
  getByKey: getIssueByKey.bind(null, client),
});
