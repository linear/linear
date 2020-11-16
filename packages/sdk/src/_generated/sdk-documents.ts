import gql from "graphql-tag";
export const IssueFragment = gql`
  fragment IssueFragment on Issue {
    id
    createdAt
    updatedAt
    archivedAt
    number
    title
    description
    priority
    estimate
    boardOrder
    startedAt
    completedAt
    canceledAt
    autoClosedAt
    autoArchivedAt
    dueDate
    previousIdentifiers
    identifier
    priorityLabel
    url
    team {
      id
    }
    cycle {
      id
    }
    state {
      id
    }
    assignee {
      id
    }
    parent {
      id
    }
    project {
      id
    }
    branchName
    creator {
      id
    }
  }
`;
export const TeamFragment = gql`
  fragment TeamFragment on Team {
    id
    name
  }
`;
export const IssueCreateDocument = gql`
  mutation issueCreate($teamId: String!, $title: String!, $description: String!) {
    issueCreate(input: { title: $title, description: $description, teamId: $teamId }) {
      success
      issue {
        ...IssueFragment
      }
    }
  }
  ${IssueFragment}
`;
export const ViewerDocument = gql`
  query viewer {
    viewer {
      id
      name
      email
    }
  }
`;
export const TeamsDocument = gql`
  query teams {
    teams {
      nodes {
        ...TeamFragment
      }
    }
  }
  ${TeamFragment}
`;
export const TeamDocument = gql`
  query team($id: String!) {
    team(id: $id) {
      ...TeamFragment
    }
  }
  ${TeamFragment}
`;
export const IssuesDocument = gql`
  query issues(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $includeArchived: Boolean
    $orderBy: PaginationOrderBy
  ) {
    issues(
      before: $before
      after: $after
      first: $first
      last: $last
      includeArchived: $includeArchived
      orderBy: $orderBy
    ) {
      edges {
        cursor
        node {
          ...IssueFragment
        }
      }
    }
  }
  ${IssueFragment}
`;
export const TeamIssuesDocument = gql`
  query teamIssues(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $includeArchived: Boolean
    $orderBy: PaginationOrderBy
    $id: String!
  ) {
    team(id: $id) {
      issues(
        before: $before
        after: $after
        first: $first
        last: $last
        includeArchived: $includeArchived
        orderBy: $orderBy
      ) {
        edges {
          cursor
          node {
            ...IssueFragment
          }
        }
      }
    }
  }
  ${IssueFragment}
`;
export const IssueDocument = gql`
  query issue($id: String!) {
    issue(id: $id) {
      ...IssueFragment
    }
  }
  ${IssueFragment}
`;
