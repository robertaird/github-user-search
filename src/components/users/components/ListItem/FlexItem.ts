import styled, { css } from 'styled-components';

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
