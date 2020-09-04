import React, { Fragment } from 'react';
import { Divider } from '@material-ui/core';
import { Item, SkeletonItem } from './ListItem';
import type { edges } from './types';

type UserListProps = {
  list: edges;
  startPos: number;
  endPos: number;
};

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <Fragment>
    {children}
    <Divider />
  </Fragment>
);
export function UserList({ list, startPos, endPos }: UserListProps) {
  const expectedItems = endPos - startPos;
  const slice = list.slice(startPos, endPos);
  const skeletonCount = expectedItems - slice.length;
  const Skeletons = [];
  for (let i = 0; i < skeletonCount; i++) {
    Skeletons.push(
      <ListItem key={`skeleton-${i.toString()}`}>
        <SkeletonItem />
      </ListItem>,
    );
  }
  return (
    <div>
      {slice.map((edge) => {
        if (
          edge === null ||
          edge.node === null ||
          (edge.node as { __typename: string }).__typename !== 'User'
        ) {
          return null;
        }
        return (
          <ListItem key={edge.__id}>
            <Item node={edge.node} />
          </ListItem>
        );
      })}
      {Skeletons}
    </div>
  );
}

export default UserList;
