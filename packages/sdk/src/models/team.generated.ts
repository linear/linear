import * as Types from '../schema';

export type TeamDetailsFragment = (
  { __typename?: 'Team' }
  & Pick<Types.Team, 'id' | 'key' | 'name'>
);

export type TeamKeysFromCliQueryVariables = {};


export type TeamKeysFromCliQuery = (
  { __typename?: 'Query' }
  & { teams: Array<(
    { __typename?: 'Team' }
    & Pick<Types.Team, 'id' | 'key'>
  )> }
);

export type TeamFromCliQueryVariables = {
  id: Types.Scalars['String']
};


export type TeamFromCliQuery = (
  { __typename?: 'Query' }
  & { team: { __typename?: 'Team' }
    & TeamDetailsFragment
   }
);

export type TeamNamesFromCliQueryVariables = {};


export type TeamNamesFromCliQuery = (
  { __typename?: 'Query' }
  & { teams: Array<(
    { __typename?: 'Team' }
    & Pick<Types.Team, 'id' | 'name'>
  )> }
);

export type TeamsFromCliQueryVariables = {};


export type TeamsFromCliQuery = (
  { __typename?: 'Query' }
  & { teams: Array<{ __typename?: 'Team' }
    & TeamDetailsFragment
  > }
);
