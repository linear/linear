import { gql } from "gql";
import { Linear } from "../linear";
import { getIssueIdFromSelection, IssueSelection, updateIssue } from "./issue";
import {
  GetAllLabelsFromCliQuery,
  GetIssueLabelIdsFromCliQuery,
  GetLabelFromCliQuery,
  GetLabelFromCliQueryVariables,
  GetLabelsOfIssueFromCliQuery,
  GetLabelsOfIssueFromCliQueryVariables,
} from "./label.generated";
import { getTeamIdFromSelection, TeamSelection } from "./team";

export type LabelSelection = { id: string } | { name: string; team: TeamSelection };

export const LabelDetails = gql`
  fragment LabelDetails on IssueLabel {
    id
    name
    description
    team {
      id
    }
  }
`;

export const getLabelIdFromSelection = async (client: Linear, selection: LabelSelection) => {
  if ("id" in selection) {
    return selection.id;
  } else if ("name" in selection && "team" in selection) {
    const teamId = await getTeamIdFromSelection(client, selection.team);
    const { issueLabels } = await client.request<GetIssueLabelIdsFromCliQuery>(gql`
      query GetIssueLabelIdsFromCLI {
        issueLabels {
          id
          name
          team {
            id
          }
        }
      }
    `);
    const label = issueLabels.find(issueLabel => issueLabel.name === selection.name && issueLabel.team.id === teamId);
    return label ? label.id : null;
  } else {
    throw new Error(`Unknown label selection ${selection}`);
  }
};

export const getLabel = async (client: Linear, selection: LabelSelection) => {
  const id = await getLabelIdFromSelection(client, selection);
  if (!id) {
    throw new Error(`Couldn't find id for label selection ${selection}`);
  }
  const { issueLabel } = await client.request<GetLabelFromCliQuery, GetLabelFromCliQueryVariables>(
    gql`
      ${LabelDetails}
      query GetLabelFromCLI($id: String!) {
        issueLabel(id: $id) {
          ...LabelDetails
        }
      }
    `,
    { id }
  );

  return issueLabel;
};

export const getAllLabels = async (client: Linear) => {
  const { issueLabels } = await client.request<GetAllLabelsFromCliQuery>(gql`
    ${LabelDetails}
    query GetAllLabelsFromCLI {
      issueLabels {
        ...LabelDetails
      }
    }
  `);
  return issueLabels;
};

export const getTeamLabels = async (client: Linear, teamSelection: TeamSelection) => {
  const teamId = await getTeamIdFromSelection(client, teamSelection);
  if (!teamId) {
    throw new Error(`Team with selection ${teamSelection} does not exist`);
  }
  const labels = await getAllLabels(client);
  return labels.filter(label => label.team.id === teamId);
};

export const getLabelByName = async (client: Linear, teamSelection: TeamSelection, name: string) => {
  const labels = await getTeamLabels(client, teamSelection);
  return labels.find(label => label.name === name);
};

/**
 *
 * @param client Linear sdk instance
 * @param issueSelection A selection of which issue to add the label for
 * @param labels A list of label names to be added
 */
export const addLabelsToIssue = async (client: Linear, issueSelection: IssueSelection, labels: string[]) => {
  const issueId = await getIssueIdFromSelection(client, issueSelection);
  if (!issueId) {
    throw new Error(`No issue id found for ${issueSelection}`);
  }
  const { issue } = await client.request<GetLabelsOfIssueFromCliQuery, GetLabelsOfIssueFromCliQueryVariables>(
    gql`
      query GetLabelsOfIssueFromCLI($id: String!) {
        issue(id: $id) {
          team {
            issueLabels {
              id
              name
            }
          }
        }
      }
    `,
    { id: issueId }
  );

  const lowerCaseLabels = labels.map(label => label.toLowerCase());
  const labelIds = issue.team.issueLabels
    .filter(label => lowerCaseLabels.includes(label.name.toLowerCase()))
    .map(label => label.id);
  return updateIssue(client, { id: issueId, labelIds });
};

export const registerLabel = (client: Linear) => ({
  get: getLabel.bind(null, client),
  getAll: getAllLabels.bind(null, client),
  getAllForTeam: getTeamLabels.bind(null, client),
});
