import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import logo from './logo.svg';
import './App.css';
import { UserRoot } from 'components/users';
import { RelayEnvironment } from 'utils';

function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <UserRoot />
        </header>
      </div>
    </RelayEnvironmentProvider>
  );
}

export default App;
