import gql from "graphql-tag";
export const PageInfoFragment = gql`
  fragment PageInfoFragment on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;
export const UserFragment = gql`
  fragment UserFragment on User {
    id
    name
    displayName
    email
  }
`;
export const IssueBaseFragment = gql`
  fragment IssueBaseFragment on Issue {
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
    branchName
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
      ...UserFragment
    }
    project {
      id
    }
    creator {
      ...UserFragment
    }
  }
  ${UserFragment}
`;
export const IssueFragment = gql`
  fragment IssueFragment on Issue {
    ...IssueBaseFragment
    parent {
      ...IssueBaseFragment
    }
  }
  ${IssueBaseFragment}
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
      ...UserFragment
    }
  }
  ${UserFragment}
`;
export const TeamsDocument = gql`
  query teams {
    teams {
      nodes {
        ...TeamFragment
      }
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        cursor
        node {
          ...TeamFragment
        }
      }
    }
  }
  ${TeamFragment}
  ${PageInfoFragment}
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
      nodes {
        ...IssueFragment
      }
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        cursor
        node {
          ...IssueFragment
        }
      }
    }
  }
  ${IssueFragment}
  ${PageInfoFragment}
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
        nodes {
          ...IssueFragment
        }
        pageInfo {
          ...PageInfoFragment
        }
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
  ${PageInfoFragment}
`;
export const IssueDocument = gql`
  query issue($id: String!) {
    issue(id: $id) {
      ...IssueFragment
    }
  }
  ${IssueFragment}
`;
export const IssueAssigneeDocument = gql`
  query issueAssignee($id: String!) {
    issue(id: $id) {
      assignee {
        ...UserFragment
      }
    }
  }
  ${UserFragment}
`;
