# ADR-005: Data Fetching Strategy with Server Components, TanStack Query, and urql

## Status
Accepted

## Context
The todo-web application consumes a GraphQL API and needs a clear, consistent strategy for fetching and mutating data. The Next.js App Router introduces React Server Components, which can fetch data on the server before sending HTML to the client. However, client-side interactivity (mutations, optimistic updates, polling, cache invalidation) still requires a client-side data management solution. The project needs a strategy that cleanly separates these concerns and avoids unnecessary client-side JavaScript.

## Decision
We use a layered data fetching strategy:

1. **React Server Components** are used for initial data fetching. When a page or layout loads, Server Components fetch the data needed to render the initial view. This happens on the server, so no data-fetching JavaScript is shipped to the client for these operations. Server Components call GraphQL queries via urql's server-side client.

2. **urql** is the GraphQL client used for all GraphQL operations (queries, mutations, subscriptions). It provides a lightweight, extensible client that works in both server and client contexts. urql handles GraphQL document parsing, request execution, and response typing. It is configured with appropriate exchanges for caching, authentication, and error handling.

3. **TanStack Query (React Query)** is used in Client Components for managing server state on the client side. It handles mutations, cache invalidation, optimistic updates, background refetching, and loading/error states. TanStack Query wraps urql's GraphQL operations to provide a consistent data management layer with features like automatic retry, stale-while-revalidate, and query deduplication.

The data flow for a typical page is:
- Server Component fetches initial data via urql, renders HTML, and streams it to the client.
- Client Components hydrate with the server-rendered data and use TanStack Query hooks for subsequent interactions (mutations, refetches, polling).
- TanStack Query calls urql under the hood for the actual GraphQL execution.

## Alternatives Considered
- **Apollo Client**: Apollo is the most widely adopted GraphQL client with a mature cache (normalized cache by default), devtools, and extensive documentation. However, Apollo's bundle size is larger than urql, its normalized cache adds complexity that is not needed for this project's scale, and its integration with React Server Components is less straightforward.
- **urql only (without TanStack Query)**: urql has its own React hooks (`useQuery`, `useMutation`) that could handle client-side state. However, TanStack Query provides more sophisticated cache invalidation, background refetching, optimistic updates, and query lifecycle management. Using TanStack Query as the state management layer gives us these features without relying on urql's more opinionated caching exchanges.
- **TanStack Query with plain fetch**: Instead of urql, we could use raw `fetch` calls with TanStack Query. However, this would mean manually constructing GraphQL requests, handling response parsing, and losing urql's type generation and document handling. urql provides a cleaner abstraction for GraphQL-specific concerns.
- **Server Actions only**: Next.js Server Actions allow mutations to be defined as server functions called from the client. While useful for simple form submissions, Server Actions do not provide client-side cache management, optimistic updates, or the query lifecycle features needed for a responsive interactive application.
- **SWR**: Vercel's SWR is a lightweight data fetching library similar to TanStack Query. TanStack Query was preferred for its richer feature set, including better mutation support, query cancellation, and more granular cache control.

## Consequences
- **Positive**: Initial page loads are fast because data is fetched on the server and streamed as HTML. No loading spinners for the initial render in most cases.
- **Positive**: Client-side JavaScript is minimized because Server Components handle the initial data fetch without shipping fetching logic to the browser.
- **Positive**: TanStack Query provides excellent developer experience with devtools, automatic background refetching, and built-in loading/error state management.
- **Positive**: urql's lightweight architecture and exchange-based plugin system keep the GraphQL client flexible and minimal.
- **Positive**: The separation of concerns is clear: urql handles GraphQL protocol, TanStack Query handles client-side server state, and Server Components handle initial renders.
- **Negative**: The three-layer approach (Server Components + TanStack Query + urql) has a learning curve. Developers need to understand when to use each layer and how data flows between them.
- **Negative**: Hydration mismatches can occur if the server-fetched data and the client-side TanStack Query cache fall out of sync. Care must be taken to properly seed TanStack Query's cache with server-fetched data during hydration.
- **Negative**: Two caching layers (TanStack Query's cache and urql's document cache) can lead to confusion if not configured consistently. The team should establish clear conventions for cache invalidation and TTLs.
