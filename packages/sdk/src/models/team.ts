import { gql } from "gql";
import { Linear } from "../linear";
import {
  TeamKeysFromCliQuery,
  TeamsFromCliQuery,
  TeamFromCliQuery,
  TeamFromCliQueryVariables,
  TeamNamesFromCliQuery,
} from "./team.generated";

gql`
  fragment TeamDetails on Team {
    id
    key
    name
  }
`;

/**
 * Gets the UUID of a team from the team's key (like `LNR`)
 */
export const getIdFromKey = async (client: Linear, key: string) => {
  const { teams } = await client.request<TeamKeysFromCliQuery>(gql`
    query teamKeysFromCLI {
      teams {
        id
        key
      }
    }
  `);
  const team = teams.find(t => t.key === key);
  return team && team.id;
};

export const getTeam = async (client: Linear, id: string) => {
  const { team } = await client.request<TeamFromCliQuery, TeamFromCliQueryVariables>(
    gql`
      query teamFromCLI($id: String!) {
        team(id: $id) {
          ...TeamDetails
        }
      }
    `,
    { id }
  );
  return team;
};

export const getTeamByName = async (client: Linear, name: string) => {
  const { teams } = await client.request<TeamNamesFromCliQuery>(
    gql`
      query teamNamesFromCLI {
        teams {
          id
          name
        }
      }
    `
  );
  const team = teams.find(team => team.name === name);
  return team ? getTeam(client, team.id) : undefined;
};

export const getTeams = async (client: Linear) => {
  const { teams } = await client.request<TeamsFromCliQuery>(gql`
    query teamsFromCLI {
      teams {
        ...TeamDetails
      }
    }
  `);
  return teams;
};

export const team = (client: Linear) => ({
  get: getTeam.bind(null, client),
  getAll: getTeams.bind(null, client),
  getByName: getTeamByName.bind(null, client),
});
