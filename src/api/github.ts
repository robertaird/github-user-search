export async function fetchGitHub(
  text: string,
  variables: Record<string, string>,
) {
  // TODO: Replace this with env
  const response = await fetch('http://localhost:8080/graphql', {
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
  return await response.json();
}

export default fetchGitHub;
