# ADR-006: Vertical Slice Architecture for Frontend Feature Organization

## Status
Accepted

## Context
As the todo-web application grows, the codebase needs a clear organizational structure that scales with the number of features and developers. The traditional approach of grouping files by technical role (all components in one folder, all hooks in another, all types in another) leads to features being scattered across many directories, making it difficult to understand, modify, or delete a feature as a cohesive unit. The backend of this project already uses a Vertical Slice architecture, and aligning the frontend structure with it improves cross-stack consistency.

## Decision
We use **Vertical Slice architecture** to organize frontend features. Each feature is a self-contained directory that co-locates all the code related to that feature, including:

- **API calls and GraphQL operations**: `.graphql` files or query/mutation definitions specific to the feature.
- **TanStack Query hooks**: Custom hooks that wrap queries and mutations for the feature's data (e.g., `useTodos.ts`, `useCreateTodo.ts`).
- **TypeScript types**: Interfaces and types specific to the feature's data model and component props.
- **Components**: React components used exclusively by the feature.
- **Utilities**: Helper functions scoped to the feature.

A typical feature directory looks like:

```
features/
  todos/
    api/
      queries.graphql
      mutations.graphql
    hooks/
      useTodos.ts
      useCreateTodo.ts
      useUpdateTodo.ts
    components/
      TodoList.tsx
      TodoItem.tsx
      CreateTodoForm.tsx
    types.ts
    index.ts
```

Shared code that is used across multiple features (e.g., the urql client configuration, common UI components from shadcn/ui, shared layout components, generic utility functions) lives outside the `features/` directory in dedicated shared directories like `components/ui/`, `lib/`, and `providers/`.

The `app/` directory (Next.js routing) imports from feature directories to compose pages. Route files (`page.tsx`) are kept thin -- they primarily wire together feature components and handle route-level concerns (data fetching in Server Components, layout selection, metadata).

## Alternatives Considered
- **Group by technical role (traditional layered architecture)**: Organizing all components under `components/`, all hooks under `hooks/`, all types under `types/`, etc. This is the most common React project structure and works well for small projects. However, as the project grows, a single feature's code becomes spread across many directories, making it harder to understand the full scope of a feature, refactor it, or remove it cleanly.
- **Group by page/route**: Organizing code by the route that uses it (e.g., `app/todos/components/`, `app/todos/hooks/`). This ties features to specific routes, but features often span multiple routes (e.g., a todo might be displayed on a list page, a detail page, and a dashboard). Vertical slices by feature, separate from the routing structure, avoid this coupling.
- **Domain-Driven Design (DDD) modules**: A more formal module structure with explicit boundaries, dependency rules, and anti-corruption layers. This was considered overkill for the current project size. Vertical slices achieve most of the organizational benefits of DDD without the ceremony.

## Consequences
- **Positive**: Features are self-contained and easy to reason about. A developer working on the todos feature can find all related code in one directory without searching across the codebase.
- **Positive**: Deleting or refactoring a feature is straightforward -- remove or modify the feature's directory and update the route files that reference it.
- **Positive**: Mirrors the backend's Vertical Slice architecture, making it easier for full-stack developers to navigate both codebases and maintain consistent mental models.
- **Positive**: Reduces merge conflicts because developers working on different features are modifying different directories rather than competing for changes in shared `components/` or `hooks/` folders.
- **Positive**: The `index.ts` barrel file in each feature directory provides a clear public API for what the feature exports, encouraging encapsulation.
- **Negative**: Developers must decide whether a piece of code belongs in a feature directory or in the shared layer. This boundary can be ambiguous, especially for components or hooks that start as feature-specific but are later needed elsewhere. The team should extract to shared only when a second feature needs the code, not preemptively.
- **Negative**: Some code duplication may occur across features in the short term if developers are reluctant to extract shared code prematurely. This is acceptable and preferable to premature abstraction.
- **Negative**: New developers accustomed to the traditional `components/hooks/types` structure will need to adjust to the feature-based organization.
