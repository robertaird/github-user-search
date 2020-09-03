import type {} from 'react/experimental';
import React, {
  Fragment,
  useCallback,
  useEffect,
  unstable_useTransition as useTransition,
  Suspense,
} from 'react';
import graphql from 'babel-plugin-relay/macro';
import { TextField } from '@material-ui/core';
import { useQueryLoader, usePreloadedQuery } from 'react-relay/hooks';
import UserSearch from './UserSearch';

type UserRootProps = {
  defaultSearch?: string;
};
const UserRootQuery = graphql`
  query UserRootQuery($query: String!) {
    # Compose the data dependencies of child components
    # by spreading their fragments:
    ...UserSearchQuery @arguments(query: $query)
  }
`;

function User({ queryReference }: any) {
  const data = usePreloadedQuery(UserRootQuery, queryReference);
  return <UserSearch users={data} />;
}

export function UserRoot({ defaultSearch = 'rob' }: UserRootProps) {
  const [queryReference, loadQuery, disposeQuery] = useQueryLoader(
    UserRootQuery,
  );
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000,
  });

  console.log(isPending);

  useEffect(() => {
    loadQuery({ query: defaultSearch });
    return () => {
      disposeQuery();
    };
  }, [defaultSearch, disposeQuery, loadQuery]);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      startTransition(() => {
        loadQuery({ query: e.target.value });
      });
    },
    [loadQuery, startTransition],
  );

  return (
    <Fragment>
      <TextField
        label="Search field"
        defaultValue={defaultSearch}
        type="search"
        variant="outlined"
        onChange={onChange}
      />
      {queryReference === null ? null : (
        <Suspense fallback={'Loading...'}>
          <User queryReference={queryReference} />
        </Suspense>
      )}
    </Fragment>
  );
}

export default UserRoot;
