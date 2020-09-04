import React, { Suspense } from 'react';
import styled, { css } from 'styled-components';
import {
  Avatar,
  AvatarProps,
  Link,
  Typography,
  Tooltip,
  Grid,
} from '@material-ui/core';
import { Skeleton as BaseSkeleton } from '@material-ui/lab';
import {
  PeopleAltOutlined as PeopleAlt,
  StarBorder as Star,
} from '@material-ui/icons';
import ErrorBoundary from 'components/errorBoundary';
import loadImage from './loadImage';
import type { node } from './types';

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

type FlexProps = {
  width?: string;
};

const FlexItem = styled.div<FlexProps>`
  flex: 0 0 auto;
  padding: 16px;
  ${({ width }) =>
    width
      ? css`
          width: ${width}px;
          padding: 0 16px;
        `
      : ''}
`;

const GridItem = styled(Grid)`
  text-align: initial;
`;

const InfoIconText = styled(Typography)`
  padding: 0 4px 0 0;
`;

const BioText = styled(Typography)`
  max-width: 80%;
  transform: translateY(-0.75em);
`;

const Skeleton = styled(BaseSkeleton)`
  min-width: 20px;
`;

const TextSkeleton = <Skeleton variant="text" />;

const AvatarSkeleton = (
  <Skeleton
    data-testid="avatarskeleton"
    width={40}
    height={40}
    variant="circular"
  />
);

const SuspenseAvatar = ({
  alt,
  src,
  ...props
}: AvatarProps & { src: string }) => {
  loadImage(src).read();
  return <Avatar alt={alt} src={src} {...props} />;
};

const InfoIcon = ({
  children,
  title,
  Icon,
}: {
  Icon: typeof import('@material-ui/core/SvgIcon').default;
  children: React.ReactNode;
  title: string;
}) => (
  <Tooltip title={title}>
    <Grid item container justifyContent="flex-end">
      <InfoIconText color="textPrimary">{children}</InfoIconText>
      <Icon color="secondary" />
    </Grid>
  </Tooltip>
);

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
        avatarUrl && (
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
