import React from 'react';
import styled from '@emotion/styled';
import { Typography, Tooltip, Grid } from '@mui/material';

const InfoIconText = styled(Typography)`
  padding: 0 4px 0 0;
`;

export const InfoIcon = ({
  children,
  title,
  Icon,
}: {
  Icon: typeof import('@mui/material/SvgIcon').default;
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
