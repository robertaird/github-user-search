const host = process.env.REACT_APP_SERVER_HOST || '';
const port = process.env.REACT_APP_SERVER_PORT
  ? `:${process.env.REACT_APP_SERVER_PORT}`
  : '';
const serverUrl = `${host}${port}`;

export async function fetchGitHub(
  { text, name }: import('relay-runtime').RequestParameters,
  variables: Record<string, string>,
) {
  const response = await fetch(`${serverUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  const json = await response.json();

  if (Array.isArray(json.errors)) {
    throw new Error(
      `Error fetching GraphQL query '${name}' from ${serverUrl} with variables '${JSON.stringify(
        variables,
      )}': ${JSON.stringify(json.errors)}`,
    );
  }
  return json;
}

export default fetchGitHub;
