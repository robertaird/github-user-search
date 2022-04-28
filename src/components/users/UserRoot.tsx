import React, {
  useCallback,
  useEffect,
  startTransition,
  useTransition,
  Suspense,
} from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Grid, TextField, Typography } from '@mui/material';
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

const User = React.memo(function User({ init, queryReference }: any) {
  const data = usePreloadedQuery(UserRootQuery, queryReference);
  useEffect(() => {
    if (data) {
      init();
    }
  }, [data, init]);
  return <UserSearch users={data} />;
});

// const transitionConfig = {
//   timeoutMs: 3000,
// };

export function UserRoot({ defaultSearch = '', init }: UserRootProps) {
  const [queryReference, loadQuery] = useQueryLoader(UserRootQuery);
  const [something] = useTransition();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      startTransition(() => {
        loadQuery({ query: e.target.value });
      });
    },
    [loadQuery],
  );

  useEffect(() => {
    if (defaultSearch !== '') {
      init();
    }
  }, [defaultSearch, init]);

  useEffect(() => {
    if (defaultSearch !== '') {
      loadQuery({ query: defaultSearch });
    }
  }, [defaultSearch, loadQuery]);

  return (
    <Grid container spacing={1}>
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
              <User init={init} queryReference={queryReference} />
            </Suspense>
          )}
        </ErrorBoundary>
      </GridItem>
    </Grid>
  );
}

export default UserRoot;
