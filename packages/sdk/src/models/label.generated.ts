import * as Types from '../schema';

export type LabelDetailsFragment = (
  { __typename?: 'IssueLabel' }
  & Pick<Types.IssueLabel, 'id' | 'name' | 'description'>
  & { team: (
    { __typename?: 'Team' }
    & Pick<Types.Team, 'id'>
  ) }
);

export type GetLabelFromCliQueryVariables = {
  id: Types.Scalars['String']
};


export type GetLabelFromCliQuery = (
  { __typename?: 'Query' }
  & { issueLabel: { __typename?: 'IssueLabel' }
    & LabelDetailsFragment
   }
);

export type GetAllLabelsFromCliQueryVariables = {};


export type GetAllLabelsFromCliQuery = (
  { __typename?: 'Query' }
  & { issueLabels: Array<{ __typename?: 'IssueLabel' }
    & LabelDetailsFragment
  > }
);

export type GetLabelsOfIssueFromCliQueryVariables = {
  id: Types.Scalars['String']
};


export type GetLabelsOfIssueFromCliQuery = (
  { __typename?: 'Query' }
  & { issue: (
    { __typename?: 'Issue' }
    & { team: (
      { __typename?: 'Team' }
      & { issueLabels: Array<(
        { __typename?: 'IssueLabel' }
        & Pick<Types.IssueLabel, 'id' | 'name'>
      )> }
    ) }
  ) }
);
