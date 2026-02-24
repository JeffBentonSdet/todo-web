// GraphQL client. Configured urql client instance for communicating with the todo-api GraphQL endpoint.
import { createClient, cacheExchange, fetchExchange } from 'urql';

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:5000/graphql';

export const graphqlClient = createClient({
  url: GRAPHQL_URL,
  exchanges: [cacheExchange, fetchExchange],
});
