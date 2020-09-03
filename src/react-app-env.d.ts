/// <reference types="react-scripts" />
declare module 'babel-plugin-relay/macro' {
  import { graphql } from 'react-relay';
  export default graphql;
}

declare module 'react-relay/hooks' {
  import type {
    GraphQLTaggedNode,
    OperationType,
    RequestParameters,
  } from 'relay-runtime';
  export * from '@types/react-relay/hooks';

  /**
   * @types/react-relay is not up to date. Can't blame them, experimental apis.
   * Quick and dirty conversion from flow files.
   */
  type UseLoadQueryHookType<TQuery extends OperationType> = any;

  export type PreloadableConcreteRequest<TQuery extends OperationType> = {
    kind: 'PreloadableConcreteRequest';
    params: RequestParameters;
  };

  export function useQueryLoader<TQuery extends OperationType>(
    preloadableRequest: GraphQLTaggedNode | PreloadableConcreteRequest<TQuery>,
  ): UseLoadQueryHookType<TQuery>;
}
