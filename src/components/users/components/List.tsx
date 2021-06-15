import React from 'react';
import { ListContainer } from './ListContainer';
import { Item, SkeletonItem } from './ListItem';
import type { edges } from '../types';

type UserListProps = {
  list: edges;
  startPos: number;
  endPos: number;
};

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
        if (
          edge === null ||
          edge.node === null ||
          (edge.node as { __typename: string }).__typename !== 'User'
        ) {
          return null;
        }
        return <Item key={edge.__id} node={edge.node} />;
      })}
      {Skeletons}
    </ListContainer>
  );
}

export default UserList;
