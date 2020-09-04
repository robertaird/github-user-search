import React from 'react';
import { amber, cyan } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { RelayEnvironment } from 'utils';

const theme = createMuiTheme({
  palette: {
    primary: { main: cyan[400] },
    secondary: { main: amber[500] },
    type: 'dark',
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

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        {children}
      </RelayEnvironmentProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
