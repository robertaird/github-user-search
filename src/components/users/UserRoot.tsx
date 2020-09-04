import type {} from 'react/experimental';
import React, {
  useCallback,
  useEffect,
  unstable_useTransition as useTransition,
  Suspense,
} from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Grid, TextField, Typography } from '@material-ui/core';
import { useQueryLoader, usePreloadedQuery } from 'react-relay/hooks';
import ErrorBoundary from 'components/errorBoundary';
import UserSearch from './UserSearch';

type UserRootProps = {
  init: () => void;
  defaultSearch?: string;
};

const UserRootQuery = graphql`
  query UserRootQuery($query: String!) {
    # Compose the data dependencies of child components
    # by spreading their fragments:
    ...UserSearchQuery @arguments(query: $query)
  }
`;

const LoadingText = <Typography color="textSecondary">Loading...</Typography>;

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <Grid item container xs={12} justifyContent="center">
    {children}
  </Grid>
);

const User = React.memo(function User({ queryReference }: any) {
  const data = usePreloadedQuery(UserRootQuery, queryReference);
  return <UserSearch users={data} />;
});

const transitionConfig = {
  timeoutMs: 3000,
};

export function UserRoot({ defaultSearch = '', init }: UserRootProps) {
  const [queryReference, loadQuery] = useQueryLoader(UserRootQuery);
  const [startTransition] = useTransition(transitionConfig);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      startTransition(() => {
        init();
        loadQuery({ query: e.target.value });
      });
    },
    [init, loadQuery, startTransition],
  );

  useEffect(() => {
    if (defaultSearch !== '') {
      init();
    }
  }, [defaultSearch, init]);

  useEffect(() => {
    loadQuery({ query: defaultSearch });
  }, [defaultSearch, loadQuery]);

  return (
    <Grid container>
      <GridItem>
        <TextField
          data-testid="search-input"
          label="Search field"
          defaultValue={defaultSearch}
          type="search"
          variant="outlined"
          onChange={onChange}
        />
      </GridItem>
      <GridItem>
        <ErrorBoundary>
          {queryReference === null ? null : (
            <Suspense fallback={LoadingText}>
              <User queryReference={queryReference} />
            </Suspense>
          )}
        </ErrorBoundary>
      </GridItem>
    </Grid>
  );
}

export default UserRoot;
