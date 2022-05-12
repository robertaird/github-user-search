import React from 'react';
import { ListContainer } from './ListContainer';
import { Item, SkeletonItem } from './ListItem';
import type { edges, node } from '../types';

type UserListProps = {
  list: edges;
  startPos: number;
  endPos: number;
};

function isUser(node?: node | null): node is node {
  return (node as node & { __typename: string })?.__typename === 'User';
}

export function UserList({ list, startPos, endPos }: UserListProps) {
  const expectedItems = endPos - startPos;
  const slice = list.slice(startPos, endPos);
  const skeletonCount = expectedItems - slice.length;
  const Skeletons = [];
  for (let i = 0; i < skeletonCount; i++) {
    Skeletons.push(<SkeletonItem key={`skeleton-${i.toString()}`} />);
  }
  return (
    <ListContainer>
      {slice.map((edge) => {
        if (edge && isUser(edge.node)) {
          return <Item key={edge.__id} node={edge.node} />;
        }
        return null;
      })}
      {Skeletons}
    </ListContainer>
  );
}

export default UserList;
