import gql from "graphql-tag";

export const View = gql`
  query view {
    viewer {
      id
      name
      email
    }
  }
`;
export const Teams = gql`
  query teams {
    teams {
      nodes {
        id
        name
      }
    }
  }
`;
export const Team = gql`
  query team($teamId: String!) {
    team(id: $teamId) {
      id
      name
      issues {
        nodes {
          id
          title
          description
          assignee {
            id
            name
          }
          createdAt
          archivedAt
        }
      }
    }
  }
`;
