# ADR-001: Next.js with TypeScript for Web Frontend

## Status
Accepted

## Context
The todo-web project requires a modern web frontend framework that supports server-side rendering, static generation, and a rich developer experience. The team needs a framework that is well-supported, has a large ecosystem, and can scale with the application as it grows. Additionally, the codebase should enforce type safety to reduce runtime errors and improve maintainability, especially as more developers join the project.

## Decision
We chose **Next.js** as the web framework and **TypeScript** as the programming language for the todo-web frontend.

Next.js provides a full-stack React framework with built-in routing, server-side rendering (SSR), static site generation (SSG), and API routes. TypeScript is used across the entire codebase to enforce type safety at compile time, improving code quality and enabling better IDE support (autocompletion, refactoring, inline documentation).

## Alternatives Considered
- **Vite + React + TypeScript**: Vite offers fast build times and a lightweight dev server, but lacks the built-in SSR, file-based routing, and deployment optimizations that Next.js provides out of the box. We would need to configure and maintain these features ourselves.
- **Remix**: Remix is a strong alternative with excellent data loading patterns and nested routing. However, Next.js has a larger community, more third-party integrations, and broader deployment support (especially with Vercel). The team also had more prior experience with Next.js.
- **Astro**: Astro excels at content-heavy sites with its island architecture, but the todo application is highly interactive and benefits more from React's component model and Next.js's client-side navigation.
- **Plain JavaScript (no TypeScript)**: While faster to prototype initially, plain JavaScript lacks the compile-time safety checks that prevent entire categories of bugs. The overhead of TypeScript configuration is minimal compared to the long-term benefits of type safety.

## Consequences
- **Positive**: Strong ecosystem and community support means most problems have well-documented solutions. TypeScript catches type errors at build time rather than in production. Server-side rendering improves initial load performance and SEO. File-based routing reduces boilerplate. Vercel provides first-class deployment support.
- **Positive**: TypeScript types serve as living documentation for data shapes, API contracts, and component props, making onboarding easier for new developers.
- **Negative**: Next.js has a larger learning curve than a plain React + Vite setup, particularly around server components, caching behavior, and the distinction between server and client rendering.
- **Negative**: TypeScript adds some verbosity and requires type definitions for third-party libraries that may not ship their own. Build times are slightly longer than plain JavaScript.
- **Negative**: The team is coupled to Vercel's roadmap for Next.js, though the framework is open source and can be self-hosted.
