import * as Types from '../schema';

export type IssueDetailsFragment = (
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
    & IssueDetailsFragment
   }
);

export type GetAllLabelsFromCliQueryVariables = {};


export type GetAllLabelsFromCliQuery = (
  { __typename?: 'Query' }
  & { issueLabels: Array<{ __typename?: 'IssueLabel' }
    & IssueDetailsFragment
  > }
);
