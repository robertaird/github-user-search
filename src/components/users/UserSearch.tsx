import React, {
  useCallback,
  useEffect,
  useState,
  useDeferredValue,
  useTransition,
} from 'react';
import styled from '@emotion/styled';
import graphql from 'babel-plugin-relay/macro';
import { usePaginationFragment } from 'react-relay/hooks';
import { Grid, Typography } from '@mui/material';
import { UserList, UserNav } from './components';
import type { UserSearchQuery$key } from './__generated__/UserSearchQuery.graphql';

type UserSearchProps = {
  // TODO: Actual type
  users: any;
};

const Container = styled.div`
  width: 100%;
  padding-bottom: 2rem;
`;

const MatchesGrid = styled(Grid)`
  && {
    min-width: 130px;
    margin-right: 25px;
  }
`;

const count = 10;

const UserSearchQuery = graphql`
  fragment UserSearchQuery on Query
  @argumentDefinitions(
    query: { type: "String!" }
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 10 }
  )
  @refetchable(queryName: "UserSearchPaginationQuery") {
    search(query: $query, type: USER, first: $count, after: $cursor)
      @connection(key: "UserSearch_search") {
      userCount
      edges {
        __id
        node {
          ... on User {
            starredRepositories {
              totalCount
            }
            followers {
              totalCount
            }
            url
            bio
            avatarUrl
            login
            name
          }
        }
      }
    }
  }
`;

export function UserSearch({ users }: UserSearchProps) {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    any,
    UserSearchQuery$key
  >(UserSearchQuery, users);

  const [startPos, setStartPosition] = useState(0);
  const [loadCount, setLoadCount] = useState(count);
  const deferredLoadCount = useDeferredValue(loadCount);
  const [, startTransition] = useTransition();

  const userCount = data?.search.userCount ?? 0;
  const possibleNextPos = startPos + count;
  const nextPos =
    possibleNextPos > userCount ? userCount % count : possibleNextPos;
  const prevPos = startPos - count;

  const nextNode = data?.search.edges?.[nextPos];

  const loadMore = useCallback(
    (c: number = deferredLoadCount) => {
      // Don't fetch again if we're already loading next
      if (isLoadingNext) {
        return;
      }
      loadNext(c, {
        onComplete: () => {
          if (loadCount !== count) {
            setLoadCount(count);
          }
        },
      });
    },
    [isLoadingNext, loadNext, loadCount, deferredLoadCount],
  );

  useEffect(() => {
    setStartPosition(0);
  }, [userCount]);

  const prevPage = useCallback(() => {
    if (prevPos > -1) {
      setStartPosition(prevPos);
    }
  }, [prevPos, setStartPosition]);

  const nextPage = useCallback(() => {
    startTransition(() => {
      if (!nextNode) {
        loadMore(10);
      }
      if (hasNext || nextNode) {
        setStartPosition(nextPos);
      }
    });
  }, [hasNext, loadMore, nextNode, nextPos, startTransition]);

  // Handle the user pressing 'next' multiple times in a row
  useEffect(() => {
    const length = data?.search.edges?.length ?? count;
    if (length < nextPos && hasNext && !isLoadingNext) {
      setLoadCount(nextPos - length);
    }
  }, [data?.search.edges?.length, isLoadingNext, nextPos, hasNext]);

  // Ensure the list is up to date
  useEffect(() => {
    const length = data?.search.edges?.length ?? count;
    if (length < nextPos) {
      loadMore();
    }
  }, [data?.search.edges?.length, nextPos, loadMore]);

  const Nav = (
    <UserNav
      nextDisabled={!(hasNext || nextNode)}
      nextPage={nextPage}
      prevDisabled={prevPos < 0}
      prevPage={prevPage}
    ></UserNav>
  );

  return (
    <Container className="users">
      <Grid container alignItems="baseline" justifyContent="center">
        <MatchesGrid item>
          <Typography color="textPrimary">
            {(data?.search.userCount ?? 0).toLocaleString()} matches
          </Typography>
        </MatchesGrid>
        <Grid item>{Nav}</Grid>
      </Grid>
      <UserList
        list={data?.search.edges ?? []}
        startPos={startPos}
        endPos={userCount === 0 ? 0 : nextPos}
      />
      {userCount > 0 && Nav}
    </Container>
  );
}

export default UserSearch;
