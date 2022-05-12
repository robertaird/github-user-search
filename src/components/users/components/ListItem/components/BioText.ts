import styled from 'styled';
import { css } from '@emotion/react';
import { Typography } from '@mui/material';

export const BioText = styled(Typography)<{ $matches?: boolean }>`
  ${({ $matches }) =>
    $matches
      ? css`
          max-width: 80%;
          transform: translateY(-0.75em);
        `
      : ``}
`;
