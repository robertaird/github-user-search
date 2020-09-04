import React from 'react';
import { Typography } from '@material-ui/core';

type error = Error & { source: string };

export default class ErrorBoundary extends React.Component<
  {},
  { error: error | null }
> {
  constructor(props: {}) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: error) {
    return {
      error,
    };
  }

  render() {
    if (this.state.error != null) {
      return (
        <div data-testid="error">
          <Typography color="error">
            Error: {this.state.error.message}
          </Typography>
          <div>
            <Typography component="pre" color="error">
              {JSON.stringify(this.state.error.source, null, 2)}
            </Typography>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
