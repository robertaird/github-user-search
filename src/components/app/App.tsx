import React, { useCallback, useState } from 'react';
import { Container as BaseContainer } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Providers from './Providers';
import './App.css';
import { UserRoot } from 'components/users';
import { GitHubIcon } from 'components/icons';

type StyleProps = {
  init: string;
};

const transform = css`
  transform: translateY(40vh);
`;

const setTransform = ({ init }: StyleProps) =>
  init === 'true' ? '' : transform;

const Header = styled.header<StyleProps>`
  transition: transform 1s ease;
  ${setTransform}
`;

const Container = styled(BaseContainer)<StyleProps>`
  transition: transform 1s ease;
  padding-top: 1rem;
  ${setTransform}
`;

function App() {
  const [initialized, setInit] = useState(false);
  const defaultSearch = new URLSearchParams(window.location.search).get(
    'query',
  );
  const init = useCallback(() => {
    if (!initialized) {
      setInit(true);
    }
  }, [initialized]);

  return (
    <Providers>
      <div className="App">
        <Header init={initialized.toString()} className="App-header">
          <GitHubIcon sx={{ mr: 2 }} fontSize="large" color="primary" /> User
          Search
        </Header>
        <Container init={initialized.toString()} maxWidth="md">
          <UserRoot init={init} defaultSearch={defaultSearch ?? ''} />
        </Container>
      </div>
    </Providers>
  );
}

export default App;
