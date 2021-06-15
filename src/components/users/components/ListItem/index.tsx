import React, { Suspense } from 'react';
import { Divider, Grid, Link, Typography } from '@material-ui/core';
import {
  PeopleAltOutlined as PeopleAlt,
  StarBorder as Star,
} from '@material-ui/icons';
import ErrorBoundary from 'components/errorBoundary';
import type { node } from '../../types';
import { AvatarSkeleton } from './AvatarSkeleton';
import { BioText } from './BioText';
import { FlexItem } from './FlexItem';
import { GridItem } from './GridItem';
import { InfoIcon } from './InfoIcon';
import { SuspenseAvatar } from './SuspenseAvatar';
import { TextSkeleton } from './TextSkeleton';

type BaseItemProps = {
  avatarComponent: React.ReactNode;
  linkComponent: React.ReactNode;
  url?: string;
  nameComponent: React.ReactNode;
  bioComponent?: React.ReactNode;
  stars: React.ReactNode;
  followers: React.ReactNode;
  testId?: string;
};

type ItemProps = {
  node: node;
};

const emptyCount = { totalCount: 0 };

const BaseItem = ({
  avatarComponent,
  linkComponent,
  url,
  nameComponent,
  bioComponent,
  stars,
  followers,
  testId = 'list-item',
}: BaseItemProps) => (
  <>
    <Grid data-testid={testId} container spacing={2} alignItems="center">
      <FlexItem>{avatarComponent}</FlexItem>
      <GridItem direction="column" container item xs spacing={1}>
        <Link href={url}>{linkComponent}</Link>
        <Typography color="textPrimary">{nameComponent}</Typography>
      </GridItem>
      <GridItem direction="column" container item xs={3}>
        <InfoIcon Icon={Star} title="Starred repositories">
          {stars}
        </InfoIcon>
        <InfoIcon Icon={PeopleAlt} title="Followers">
          {followers}
        </InfoIcon>
      </GridItem>
      {bioComponent && (
        <GridItem container item wrap="nowrap" xs={12}>
          <FlexItem width="38" />
          <BioText variant="body2" color="textSecondary">
            {bioComponent}
          </BioText>
        </GridItem>
      )}
    </Grid>
    <Divider />
  </>
);

export const SkeletonItem = () => (
  <BaseItem
    avatarComponent={AvatarSkeleton}
    linkComponent={TextSkeleton}
    nameComponent={TextSkeleton}
    bioComponent={null}
    stars={TextSkeleton}
    followers={TextSkeleton}
    testId="skeleton-item"
  />
);

export const Item = ({
  node: {
    avatarUrl,
    bio,
    followers: { totalCount: followerCount } = emptyCount,
    login,
    name,
    starredRepositories: { totalCount: starCount } = emptyCount,
    url,
  },
}: ItemProps) => {
  return (
    <BaseItem
      avatarComponent={
        (avatarUrl as string) && (
          <ErrorBoundary>
            <Suspense fallback={AvatarSkeleton}>
              <SuspenseAvatar alt={login} src={avatarUrl as string} />
            </Suspense>
          </ErrorBoundary>
        )
      }
      linkComponent={login}
      url={url as string}
      nameComponent={name}
      bioComponent={bio}
      stars={starCount}
      followers={followerCount}
    />
  );
};

export default Item;
