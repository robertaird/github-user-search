import React from 'react';
import { amber, cyan } from '@mui/material/colors';
import { createMuiTheme, Theme, ThemeProvider } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from '@emotion/react';
import { RelayEnvironmentProvider } from 'react-relay';
import { RelayEnvironment } from 'utils';

const theme = createMuiTheme({
  palette: {
    primary: { main: cyan[400] },
    secondary: { main: amber[500] },
    mode: 'dark',
  },
  components: {
    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense',
      },
    },
  },
  spacing: 4,
});

declare module '@emotion/styled' {
  export interface DefaultTheme extends Theme {}
}

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <RelayEnvironmentProvider environment={RelayEnvironment}>
          {children}
        </RelayEnvironmentProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
