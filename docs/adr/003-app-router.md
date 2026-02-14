# ADR-003: Next.js App Router over Pages Router

## Status
Accepted

## Context
Next.js offers two routing systems: the legacy **Pages Router** (`pages/` directory) and the newer **App Router** (`app/` directory). The project needs to commit to one routing approach to avoid confusion and ensure consistency. The App Router was introduced as stable in Next.js 13.4 and represents the framework's current and future direction.

## Decision
We chose the **App Router** (`app/` directory) as the routing system for the todo-web project. All routes, layouts, and pages are defined using the App Router conventions.

This means the project uses:
- `app/` directory structure with `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` file conventions.
- React Server Components (RSC) as the default rendering model, with `"use client"` directives only where client-side interactivity is needed.
- Nested layouts for shared UI across route segments.
- Route groups (parenthesized folders like `(auth)`) for organizing routes without affecting the URL structure.
- The `next/navigation` module (not `next/router`) for programmatic navigation.

## Alternatives Considered
- **Pages Router**: The Pages Router is mature, stable, and well-documented with a large body of community resources and tutorials. It uses `getServerSideProps`, `getStaticProps`, and `getInitialProps` for data fetching. However, it does not support React Server Components, nested layouts, or streaming. Vercel has stated that while the Pages Router will continue to be supported, all new features and optimizations will target the App Router.
- **Hybrid approach (both routers)**: Next.js supports using both routers simultaneously by having both `app/` and `pages/` directories. This was considered as a migration strategy but rejected because it introduces confusion about which router handles a given route, complicates data fetching patterns, and makes it harder for new developers to understand the codebase.

## Consequences
- **Positive**: The App Router supports React Server Components, which allow data fetching to happen on the server without shipping the fetching code to the client. This reduces client-side JavaScript bundle size and improves performance.
- **Positive**: Nested layouts enable shared UI (headers, sidebars, navigation) to persist across navigations without re-rendering, providing a smoother user experience.
- **Positive**: Streaming and Suspense support allows the server to send HTML progressively, improving time-to-first-byte for pages with slow data sources.
- **Positive**: The project is aligned with Next.js's long-term direction, meaning it will benefit from future improvements, optimizations, and new features.
- **Negative**: The App Router has a steeper learning curve, especially around the mental model of Server Components vs. Client Components, when to use `"use client"`, and how caching and revalidation work.
- **Negative**: Some third-party libraries and community examples still target the Pages Router, which can require adaptation when integrating them into an App Router project.
- **Negative**: The App Router's caching behavior can be surprising and difficult to debug, particularly around `fetch` request deduplication and the router cache. The team needs to understand these mechanisms to avoid stale data issues.
