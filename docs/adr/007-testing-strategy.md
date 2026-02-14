# ADR-007: Playwright for End-to-End Testing and Vitest for Unit Testing

## Status
Accepted

## Context
The project needs a testing strategy that provides confidence in both individual units of logic and the application's behavior as experienced by users. The testing tools should integrate well with the existing technology stack (Next.js, TypeScript, React), provide fast feedback during development, and be reliable in CI environments.

## Decision
We use a two-tier testing strategy:

1. **Vitest** for unit and integration tests. Vitest is used to test individual functions, utilities, hooks, and components in isolation or with lightweight mocking. Tests are co-located with the code they test (e.g., `useTodos.test.ts` next to `useTodos.ts`) or placed in a `__tests__` directory within the feature.

2. **Playwright** for end-to-end (E2E) tests. Playwright tests run against the full application in a real browser, verifying complete user workflows such as creating a todo, editing it, marking it complete, and deleting it. E2E tests live in a dedicated `e2e/` or `tests/` directory at the project root.

The general testing guidelines are:
- **Unit tests (Vitest)**: Test pure functions, utility helpers, data transformations, and custom hooks. Use `@testing-library/react` for component tests that verify rendering behavior and user interactions at the component level. Mock external dependencies (API calls, GraphQL client) to keep tests fast and deterministic.
- **E2E tests (Playwright)**: Test critical user journeys end-to-end through a real browser. These tests start the application (or connect to a running instance), interact with the UI as a user would (clicking, typing, navigating), and assert on visible outcomes. E2E tests use Playwright's built-in locators, auto-waiting, and assertion library.

## Alternatives Considered
- **Jest**: Jest is the most widely used JavaScript testing framework and would be a safe choice. However, Vitest is significantly faster due to its native ESM support and Vite-based transformation pipeline. Vitest's API is nearly identical to Jest, so migration knowledge transfers directly. Vitest also handles TypeScript and JSX natively without additional configuration (no `ts-jest` or Babel setup required).
- **Cypress**: Cypress is a popular E2E testing tool with an interactive test runner and time-travel debugging. However, Playwright offers better cross-browser support (Chromium, Firefox, WebKit), faster execution through parallel test workers, and a more capable API for handling multiple tabs, iframes, and network interception. Playwright's auto-waiting model also reduces flaky tests compared to Cypress's implicit waiting.
- **Testing Library only (no E2E)**: Relying solely on component-level tests with Testing Library was considered. While component tests are valuable, they cannot verify that the full application works correctly when all parts are wired together (routing, data fetching, server components, API integration). E2E tests fill this gap.
- **Selenium / WebDriverIO**: These are established E2E frameworks but have more complex setup, slower execution, and less ergonomic APIs compared to Playwright. They are better suited for projects that need to support legacy browsers not covered by Playwright.

## Consequences
- **Positive**: Vitest provides near-instant feedback during development with its watch mode and fast HMR-based test re-execution. Developers can keep tests running continuously without noticeable slowdown.
- **Positive**: Playwright's cross-browser testing (Chromium, Firefox, WebKit) ensures the application works consistently across major browser engines without maintaining separate test configurations.
- **Positive**: Playwright's auto-waiting and web-first assertions reduce test flakiness. Locators automatically wait for elements to be visible and actionable before interacting, eliminating most timing-related failures.
- **Positive**: Co-locating unit tests with source code (following the vertical slice structure from ADR-006) makes it easy to find and maintain tests alongside the code they verify.
- **Positive**: Both tools have excellent TypeScript support, strong documentation, and active communities.
- **Negative**: Maintaining two testing tools means developers need to be familiar with both Vitest and Playwright APIs, configuration, and debugging approaches.
- **Negative**: E2E tests are inherently slower than unit tests and require a running application instance (or a dev server). CI pipeline times will increase as the E2E test suite grows. Parallelization and selective test execution (e.g., running only affected tests on pull requests) can mitigate this.
- **Negative**: E2E tests that depend on backend state (e.g., seeded database data) require a test data management strategy to ensure tests are repeatable and isolated. The team needs to establish conventions for test setup and teardown.
- **Negative**: The line between what should be a Vitest component test and what should be a Playwright E2E test can be blurry. The team guideline is: if the test verifies a user workflow that spans multiple pages or requires real API interaction, it should be an E2E test. If it verifies a single component's behavior or a pure function, it should be a unit test.
