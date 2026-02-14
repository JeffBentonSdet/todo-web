# Todo Web

Next.js frontend for the todo application, built with TypeScript and the App Router.

## Tech Stack

- Next.js with App Router and TypeScript
- pnpm for package management, fnm for Node version management
- Tailwind CSS with shadcn/ui component library
- TanStack Query for client-side state, urql for GraphQL
- Playwright for e2e tests, Vitest for unit tests

## Commands

```bash
pnpm install             # Install dependencies
pnpm dev                 # Start development server
pnpm build               # Production build
pnpm test                # Run Vitest unit tests
pnpm test:e2e            # Run Playwright e2e tests
pnpm lint                # Run ESLint
```

## Architecture

This project uses **Vertical Slice Architecture** mirroring the backend structure. See `docs/adr/` for detailed rationale.

### Route Structure

- `src/app/(auth)/` — Public auth routes (login, register)
- `src/app/(app)/` — Authenticated app routes with shared nav layout
- Route groups `(auth)` and `(app)` use different layouts but share the root layout

### Feature Slice Structure

Each feature in `src/features/` co-locates:

- `api.ts` — REST fetch functions
- `graphql.ts` — GraphQL documents (queries/mutations)
- `queries.ts` — TanStack Query hooks
- `types.ts` — TypeScript type definitions
- `utils.ts` — Feature-specific helpers

### Data Fetching Strategy

- **Server Components** — Used for initial data fetching (pages, layouts)
- **TanStack Query** — Used in Client Components for mutations and client-side cache
- **urql** — Used for GraphQL operations

### Component Organization

- `src/components/ui/` — shadcn/ui primitives (do not edit directly after generation)
- `src/components/todos/` — Feature-specific composed components
- `src/components/layout/` — App shell components (navbar, sidebar, page-header)

## Testing

- Unit tests (`tests/unit/`) use Vitest — test utilities, helpers, and pure logic
- E2e tests (`tests/e2e/`) use Playwright — test full user workflows
- Prefer testing user behavior over implementation details

## Conventions

- All modules include a comment describing their purpose
- Use Server Components by default; add `"use client"` only when needed
- Shared utilities go in `src/lib/`, feature-specific code in `src/features/`
- API and GraphQL clients are configured in `src/lib/`
