import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { fetchGitHub } from 'api';

async function fetchRelay(
  params: import('relay-runtime').RequestParameters,
  variables: Record<string, string>,
) {
  if (params.text) {
    return fetchGitHub(params, variables);
  }
}

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
