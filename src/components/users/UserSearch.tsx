import React, { useCallback } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { usePaginationFragment } from 'react-relay/hooks';
import { Avatar, Link } from '@material-ui/core';
import type { UserSearchQuery$key } from './__generated__/UserSearchQuery.graphql';

type UserSearchProps = {
  users: any;
};

const UserSearchQuery = graphql`
  fragment UserSearchQuery on Query
  @argumentDefinitions(
    query: { type: "String!" }
    cursor: { type: "String" }
    beforeCursor: { type: "String" }
    count: { type: "Int", defaultValue: 20 }
    lastCount: { type: "Int" }
  )
  @refetchable(queryName: "UserSearchPaginationQuery") {
    search(
      query: $query
      type: USER
      first: $count
      after: $cursor
      before: $beforeCursor
      last: $lastCount
    ) @connection(key: "UserSearch_search") {
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
  const {
    data,
    loadNext,
    loadPrevious,
    isLoadingNext,
    isLoadingPrevious,
  } = usePaginationFragment<any, UserSearchQuery$key>(UserSearchQuery, users);

  const loadMore = useCallback(() => {
    // Don't fetch again if we're already loading next
    if (isLoadingNext) {
      return;
    }
    loadNext(20);
  }, [isLoadingNext, loadNext]);
  const loadPrev = useCallback(() => {
    // Don't fetch again if we're already loading next
    if (isLoadingPrevious) {
      return;
    }
    loadPrevious(20);
  }, [isLoadingPrevious, loadPrevious]);
  console.log(data, users);
  return (
    <div className="users">
      {(data?.search.edges ?? []).map((edge) => {
        if (edge == null || edge.node == null) {
          return null;
        }
        return (
          <div className="users-user" key={edge.__id}>
            <Avatar
              alt={edge.node.login}
              src={edge.node.avatarUrl as string}
            ></Avatar>
            <Link href={edge.node.url as string}>{edge.node.login}</Link>
            {edge.node.name}
          </div>
        );
      })}
      <button
        name="load prev users"
        type="button"
        className="load-prev"
        onClick={loadPrev}
      >
        Load Prev
      </button>
      <button
        name="load more users"
        type="button"
        className="load-more"
        onClick={loadMore}
      >
        Load More
      </button>
    </div>
  );
}

export default UserSearch;
