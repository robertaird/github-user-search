import React, { useEffect, Suspense } from 'react';
import graphql from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
  useQueryLoader,
  usePreloadedQuery,
} from 'react-relay/hooks';
import logo from './logo.svg';
import './App.css';
import { RelayEnvironment } from 'utils';
import type {
  default as AppRepositoryConcrete,
  AppRepositoryNameQuery,
} from './__generated__/AppRepositoryNameQuery.graphql';

const RepositoryNameQuery = graphql<typeof AppRepositoryConcrete>`
  query AppRepositoryNameQuery {
    repository(owner: "facebook", name: "relay") {
      name
    }
  }
`;

type AppProps = {
  queryReference: any;
};

function App({ queryReference }: AppProps) {
  const data = usePreloadedQuery<AppRepositoryNameQuery>(
    RepositoryNameQuery,
    queryReference,
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{data.repository?.name}</p>
      </header>
    </div>
  );
}

function LoadStuff() {
  const [queryReference, loadQuery, disposeQuery] = useQueryLoader(
    RepositoryNameQuery,
  );
  useEffect(() => {
    loadQuery();
    return () => {
      disposeQuery();
    };
  }, [disposeQuery, loadQuery]);

  return queryReference === null ? null : (
    <Suspense fallback={'Loading...'}>
      <App queryReference={queryReference} />
    </Suspense>
  );
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <LoadStuff />
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
