import { gql } from "gql";
import { Linear } from "../linear";
import {
  TeamKeysFromCliQuery,
  TeamsFromCliQuery,
  TeamFromCliQuery,
  TeamFromCliQueryVariables,
  TeamNamesFromCliQuery,
  GetTeamNamesFromCliQuery,
} from "./team.generated";

export type TeamSelection = { id: string } | { name: string } | { key: string };

const TeamDetails = gql`
  fragment TeamDetails on Team {
    id
    key
    name
  }
`;

export const getTeamIdFromSelection = async (client: Linear, selection: TeamSelection) => {
  if ("id" in selection) {
    return selection.id;
  } else if ("key" in selection) {
    return getTeamIdFromKey(client, selection.key);
  } else if ("name" in selection) {
    return getTeamIdFromName(client, selection.name);
  } else {
    throw new Error(`Unknown team selection ${selection}`);
  }
};

/**
 * Gets the UUID of a team from the team's key (like `LNR`)
 */
export const getTeamIdFromKey = async (client: Linear, key: string) => {
  const { teams } = await client.request<TeamKeysFromCliQuery>(gql`
    query teamKeysFromCLI {
      teams {
        id
        key
      }
    }
  `);
  const team = teams.find(t => t.key.toUpperCase() === key.toUpperCase());
  return team && team.id;
};

/**
 * Gets the UUID of a team from the team's name
 */
export const getTeamIdFromName = async (client: Linear, name: string) => {
  const { teams } = await client.request<GetTeamNamesFromCliQuery>(gql`
    query GetTeamNamesFromCLI {
      teams {
        id
        name
      }
    }
  `);
  const team = teams.find(t => t.name.toLowerCase() === name.toLowerCase());
  return team && team.id;
};

export const getTeam = async (client: Linear, id: string) => {
  const { team } = await client.request<TeamFromCliQuery, TeamFromCliQueryVariables>(
    gql`
      ${TeamDetails}
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
    ${TeamDetails}
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
