/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type UserRootQueryVariables = {
  query: string;
};
export type UserRootQueryResponse = {
  readonly ' $fragmentRefs': FragmentRefs<'UserSearchQuery'>;
};
export type UserRootQuery = {
  readonly response: UserRootQueryResponse;
  readonly variables: UserRootQueryVariables;
};

/*
query UserRootQuery(
  $query: String!
) {
  ...UserSearchQuery_1Qr5xf
}

fragment UserSearchQuery_1Qr5xf on Query {
  search(query: $query, type: USER, first: 10) {
    userCount
    edges {
      node {
        __typename
        ... on User {
          starredRepositories {
            totalCount
          }
          followers {
            totalCount
          }
          url
          bio
          avatarUrl
          login
          name
        }
        ... on Node {
          __isNode: __typename
          id
        }
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'query',
      },
    ],
    v1 = {
      kind: 'Variable',
      name: 'query',
      variableName: 'query',
    },
    v2 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 10,
      },
      v1 /*: any*/,
      {
        kind: 'Literal',
        name: 'type',
        value: 'USER',
      },
    ],
    v3 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'totalCount',
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'UserRootQuery',
      selections: [
        {
          args: [v1 /*: any*/],
          kind: 'FragmentSpread',
          name: 'UserSearchQuery',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'UserRootQuery',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'SearchResultItemConnection',
          kind: 'LinkedField',
          name: 'search',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'userCount',
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: 'SearchResultItemEdge',
              kind: 'LinkedField',
              name: 'edges',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: null,
                  kind: 'LinkedField',
                  name: 'node',
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: '__typename',
                      storageKey: null,
                    },
                    {
                      kind: 'InlineFragment',
                      selections: [
                        {
                          alias: null,
                          args: null,
                          concreteType: 'StarredRepositoryConnection',
                          kind: 'LinkedField',
                          name: 'starredRepositories',
                          plural: false,
                          selections: v3 /*: any*/,
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          concreteType: 'FollowerConnection',
                          kind: 'LinkedField',
                          name: 'followers',
                          plural: false,
                          selections: v3 /*: any*/,
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'url',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'bio',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'avatarUrl',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'login',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'name',
                          storageKey: null,
                        },
                      ],
                      type: 'User',
                      abstractKey: null,
                    },
                    {
                      kind: 'InlineFragment',
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'id',
                          storageKey: null,
                        },
                      ],
                      type: 'Node',
                      abstractKey: '__isNode',
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'cursor',
                  storageKey: null,
                },
                {
                  kind: 'ClientExtension',
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: '__id',
                      storageKey: null,
                    },
                  ],
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: 'PageInfo',
              kind: 'LinkedField',
              name: 'pageInfo',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'endCursor',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'hasNextPage',
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
        {
          alias: null,
          args: v2 /*: any*/,
          filters: ['query', 'type'],
          handle: 'connection',
          key: 'UserSearch_search',
          kind: 'LinkedHandle',
          name: 'search',
        },
      ],
    },
    params: {
      cacheID: 'c1934f2aacbb87084e5b902ca21d2a0f',
      id: null,
      metadata: {},
      name: 'UserRootQuery',
      operationKind: 'query',
      text: 'query UserRootQuery(\n  $query: String!\n) {\n  ...UserSearchQuery_1Qr5xf\n}\n\nfragment UserSearchQuery_1Qr5xf on Query {\n  search(query: $query, type: USER, first: 10) {\n    userCount\n    edges {\n      node {\n        __typename\n        ... on User {\n          starredRepositories {\n            totalCount\n          }\n          followers {\n            totalCount\n          }\n          url\n          bio\n          avatarUrl\n          login\n          name\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n',
    },
  };
})();
(node as any).hash = '3b9098605713923e28196de680ca62b9';
export default node;
