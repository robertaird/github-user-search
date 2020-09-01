/// <reference types="react-scripts" />
declare module 'babel-plugin-relay/macro' {
  export default function graphql<T = unknown>(
    ...args: TemplateStringsArray[]
  ): T {}
}

declare module 'react-relay/hooks' {
  export * from '@types/react-relay/hooks';
  export const useQueryLoader: any;
}
