import React, { Suspense } from 'react';
import { Divider, Grid, Link, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  PeopleAltOutlined as PeopleAlt,
  StarBorder as Star,
} from '@mui/icons-material';
import ErrorBoundary from 'components/errorBoundary';
import {
  AvatarSkeleton,
  BioText,
  FlexItem,
  GridItem,
  InfoIcon,
  SuspenseAvatar,
  TextSkeleton,
} from './components';
import type { node } from '../../types';

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
}: BaseItemProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Grid data-testid={testId} container spacing={2} alignItems="center">
        <FlexItem>{avatarComponent}</FlexItem>
        <GridItem direction="column" container item xs md={3} spacing={1}>
          <Link href={url}>{linkComponent}</Link>
          <Typography color="textPrimary">{nameComponent}</Typography>
        </GridItem>
        {(!matches || bioComponent) && (
          <GridItem
            container
            item
            wrap="nowrap"
            xs={12}
            md
            order={matches ? 2 : 0}
          >
            {matches && <FlexItem width="38" />}
            {bioComponent && (
              <BioText $matches={matches} variant="body2" color="textSecondary">
                {bioComponent}
              </BioText>
            )}
          </GridItem>
        )}
        <GridItem direction="column" container item xs={3} md={2}>
          <InfoIcon Icon={Star} title="Starred repositories">
            {stars}
          </InfoIcon>
          <InfoIcon Icon={PeopleAlt} title="Followers">
            {followers}
          </InfoIcon>
        </GridItem>
      </Grid>
      <Divider />
    </>
  );
};

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
