import { Linear } from "../linear";
import { gql } from "gql";
import {
  GetLabelFromCliQuery,
  GetLabelFromCliQueryVariables,
  GetAllLabelsFromCliQuery,
  GetLabelsOfIssueFromCliQuery,
  GetLabelsOfIssueFromCliQueryVariables,
} from "./label.generated";
import { IssueSelection, getIssueIdFromSelection, updateIssue } from "./issue";
import { TeamSelection, getTeamIdFromSelection } from "./team";

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

export const getLabel = async (client: Linear, id: string) => {
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

export const getTeamLabelsByName = async (client: Linear, teamSelection: TeamSelection) => {
  const teamId = await getTeamIdFromSelection(client, teamSelection);
  if (!teamId) {
    throw new Error(`Team with selection ${teamSelection} does not exist`);
  }
  const labels = await getAllLabels(client);
  return labels.filter(label => label.team.id === teamId);
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

export const label = (client: Linear) => ({
  get: getLabel.bind(null, client),
  getAll: getAllLabels.bind(null, client),
  getNamesFromTeam: getTeamLabelsByName.bind(null, client), // 🤮
});
