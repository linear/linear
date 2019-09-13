import { Linear } from "../linear";
import { gql } from "gql";
import { GetLabelFromCliQuery, GetLabelFromCliQueryVariables, GetAllLabelsFromCliQuery } from "./label.generated";

gql`
  fragment issueDetails on IssueLabel {
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
      query GetLabelFromCLI($id: String!) {
        issueLabel(id: $id) {
          ...issueDetails
        }
      }
    `,
    { id }
  );

  return issueLabel;
};

export const getAllLabels = async (client: Linear) => {
  const { issueLabels } = await client.request<GetAllLabelsFromCliQuery>(gql`
    query GetAllLabelsFromCLI {
      issueLabels {
        ...issueDetails
      }
    }
  `);
  return issueLabels;
};

export const getTeamLabelsByName = async (client: Linear, teamId: string, labelNames: string[]) => {
  const labels = await getAllLabels(client);
  return labels.filter(label => label.team.id === teamId && labelNames.includes(label.name));
};

export const label = (client: Linear) => ({
  get: getLabel.bind(null, client),
  getAll: getAllLabels.bind(null, client),
  getFromTeamByNames: getTeamLabelsByName.bind(null, client), // 🤮
});
