## GitHub User Search

An app for searching GitHub users. Built with React's new concurrency features, using Relay to interact with GitHub's GraphQL API.

The server requires a `GITHUB_TOKEN` env variable for authentication. You can create a token at https://github.com/settings/tokens. The token should have the following scopes:

```
public_repo
read:org
read:user
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Scripts

`relay:watch` (and by proxy `start`) requires the installation of `watchman`. [Install instructions can be found here](https://facebook.github.io/watchman/docs/install.html).
