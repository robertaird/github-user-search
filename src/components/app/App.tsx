import React, { useCallback, useState } from 'react';
import { Container as BaseContainer } from '@material-ui/core';
import styled, { css } from 'styled-components';
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
          <GitHubIcon fontSize="large" color="primary" /> User Search
        </Header>
        <Container init={initialized.toString()} maxWidth="md">
          <UserRoot init={init} defaultSearch={defaultSearch ?? ''} />
        </Container>
      </div>
    </Providers>
  );
}

export default App;
