import styled from '@emotion/styled';
import { css } from '@emotion/react';

type FlexProps = {
  width?: string;
};

export const FlexItem = styled.div<FlexProps>`
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
