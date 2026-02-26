# ADR-008: MSW for Network-Level Mocking and Testing Layer Boundaries

## Status
Accepted

## Context
ADR-007 established Vitest for unit tests and Playwright for E2E tests, and noted that external dependencies (API calls, GraphQL client) should be mocked to keep unit tests fast and deterministic. It did not specify *how* to mock network calls or define which code layers warrant dedicated tests.

As the project adds tests for the REST API client layer (`src/lib/api-client.ts`, `src/features/todos/api.ts`) and GraphQL operations (`src/features/todos/graphql.ts`, urql hooks), clear conventions are needed for:

1. The tool used to mock HTTP requests in unit tests
2. Which layers get dedicated tests and which are covered by higher-level tests

## Decision

### Network mocking: MSW (`msw/node`)
Use [Mock Service Worker](https://mswjs.io/) (MSW) for intercepting HTTP requests in Vitest tests. MSW intercepts requests at the network layer rather than replacing the `fetch` global, so the full request path — URL construction, headers, method, body serialization, response parsing — is exercised by each test.

A shared set of default handlers lives in `tests/mocks/handlers.ts`. A Node server instance in `tests/mocks/server.ts` is started before all tests, reset after each test, and closed after the suite. Individual tests may override handlers using `server.use(...)` for scenario-specific responses.

### Testing layer boundaries

| Layer | What to test | How |
|---|---|---|
| Pure utilities (`utils.ts`) | Correctness of logic, edge cases | Vitest — no mocking needed |
| React components | Rendering, user interactions, conditional UI | React Testing Library + MSW (for components that fetch) |
| REST API functions (`api.ts`) | URL construction, HTTP method, request body, response shape | Vitest + MSW |
| Base API client (`api-client.ts`) | Base URL, headers, error handling, 204 handling | Vitest + MSW |
| GraphQL document strings (`graphql.ts`) | Not tested — these are static strings with no runtime logic | — |
| urql hooks | Covered indirectly through component tests that mock urql | `vi.mock('urql')` in component tests |
| TanStack Query hooks | Covered indirectly through component tests | React Testing Library with `QueryClientProvider` |
| Full user workflows | Covered by Playwright E2E tests | Playwright |

### Rationale for MSW over `vi.stubGlobal('fetch', ...)`
Mocking `fetch` directly couples tests to implementation details of how `fetch` is called (argument shapes, return values). MSW operates at a higher level — tests describe expected HTTP exchanges, not JavaScript API calls. This means tests remain valid even if the underlying fetch wrapper is refactored, and the same handler definitions can be reused in Playwright tests for E2E network interception.

### Rationale for not testing GraphQL documents
`graphql.ts` contains only tagged template literal strings (GraphQL documents). There is no runtime logic to verify. The correctness of a GraphQL operation (field names, variable types, response shape) is validated at the E2E level when the operation executes against the real API.

## Alternatives Considered
- **`vi.stubGlobal('fetch', vi.fn())`**: Simple and requires no extra dependencies. Rejected because it tests at the wrong abstraction level — tests become tightly coupled to how `fetch` is called rather than what HTTP requests are made, and handlers cannot be shared with Playwright.
- **`nock`**: A popular Node.js HTTP mocking library. Rejected because it works by patching Node's `http` module and does not intercept the `fetch` API used in this project.
- **Integration tests against a real API**: Running tests against a live instance of `todo-api` would provide maximum fidelity. Rejected for unit tests because it requires external infrastructure, slows the feedback loop, and makes tests non-deterministic. This level of fidelity is provided by the Playwright E2E suite instead.

## Consequences
- **Positive**: MSW handlers in `tests/mocks/` serve as a living contract document for the REST API, making expected request/response shapes explicit and discoverable.
- **Positive**: The same handler definitions can be extended for Playwright network interception, avoiding duplication when E2E tests need to mock API responses.
- **Positive**: `onUnhandledRequest: 'error'` in the MSW server configuration causes tests to fail loudly if a component or function makes an unexpected network request, preventing silent test gaps.
- **Negative**: MSW is an additional dependency developers need to understand. Handler setup is more verbose than a simple `vi.fn()` mock.
- **Negative**: MSW does not validate that the application's requests match the real API contract — only that they match the mock handlers. Keeping handlers in sync with the actual API requires discipline, particularly when the API contract changes (see ADR cross-project coordination notes).
