import type { UserSearchQuery } from './__generated__/UserSearchQuery.graphql';
export type edges = NonNullable<UserSearchQuery['search']['edges']>;
export type node = NonNullable<NonNullable<edges[number]>['node']>;
