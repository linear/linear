import * as Types from '../schema';

export type IssueDetailsFragment = (
  { __typename?: 'Issue' }
  & Pick<Types.Issue, 'id' | 'title' | 'number' | 'description' | 'priority' | 'estimate' | 'assignee'>
  & { labels: Array<(
    { __typename?: 'IssueLabel' }
    & Pick<Types.IssueLabel, 'id' | 'name'>
  )> }
);

export type GetAllIssuesFromCliQueryVariables = {};


export type GetAllIssuesFromCliQuery = (
  { __typename?: 'Query' }
  & { issues: Array<{ __typename?: 'Issue' }
    & IssueDetailsFragment
  > }
);

export type GetIssueFromCliQueryVariables = {
  id: Types.Scalars['String']
};


export type GetIssueFromCliQuery = (
  { __typename?: 'Query' }
  & { issue: { __typename?: 'Issue' }
    & IssueDetailsFragment
   }
);

export type GetTeamIssueIdsFromCliQueryVariables = {
  teamId: Types.Scalars['String']
};


export type GetTeamIssueIdsFromCliQuery = (
  { __typename?: 'Query' }
  & { team: (
    { __typename?: 'Team' }
    & { issues: Array<(
      { __typename?: 'Issue' }
      & Pick<Types.Issue, 'id' | 'number'>
    )> }
  ) }
);

export type CreateIssueFromCliMutationVariables = {
  title: Types.Scalars['String'],
  teamId: Types.Scalars['String'],
  labelIds?: Types.Maybe<Array<Types.Scalars['String']>>
};


export type CreateIssueFromCliMutation = (
  { __typename?: 'Mutation' }
  & { issueCreate: (
    { __typename?: 'IssuePayload' }
    & { issue: Types.Maybe<(
      { __typename?: 'Issue' }
      & Pick<Types.Issue, 'id' | 'number'>
      & { team: (
        { __typename?: 'Team' }
        & Pick<Types.Team, 'key'>
      ) }
    )> }
  ) }
);

export type UpdateIssueFromCliMutationVariables = {
  id: Types.Scalars['String'],
  title?: Types.Maybe<Types.Scalars['String']>,
  description?: Types.Maybe<Types.Scalars['String']>,
  labelIds?: Types.Maybe<Array<Types.Scalars['String']>>
};


export type UpdateIssueFromCliMutation = (
  { __typename?: 'Mutation' }
  & { issueUpdate: (
    { __typename?: 'IssuePayload' }
    & { issue: Types.Maybe<(
      { __typename?: 'Issue' }
      & Pick<Types.Issue, 'id' | 'number'>
      & { team: (
        { __typename?: 'Team' }
        & Pick<Types.Team, 'key'>
      ) }
    )> }
  ) }
);
