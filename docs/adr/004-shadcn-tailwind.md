# ADR-004: shadcn/ui with Tailwind CSS for Design System and Component Library

## Status
Accepted

## Context
The project needs a consistent approach to styling and a set of reusable UI components (buttons, inputs, dialogs, dropdowns, etc.) to build the interface efficiently. The solution should support theming, accessibility, and customization without locking the team into a rigid component library that is difficult to modify.

## Decision
We chose **shadcn/ui** as the component library and **Tailwind CSS** as the styling framework.

shadcn/ui is not a traditional npm package. Instead, it provides a CLI (`npx shadcn@latest add <component>`) that copies component source code directly into the project (typically under `components/ui/`). This means the team owns the component code and can modify it freely. The components are built on top of Radix UI primitives, which handle accessibility (ARIA attributes, keyboard navigation, focus management) out of the box.

Tailwind CSS is used for all styling via utility classes applied directly in JSX. The project uses Tailwind's configuration file (`tailwind.config.ts`) to define the design tokens (colors, spacing, typography, breakpoints) and extends it with shadcn/ui's CSS custom properties for theming.

## Alternatives Considered
- **Material UI (MUI)**: MUI is a comprehensive component library with a large set of pre-built components. However, it ships significant runtime CSS-in-JS overhead, its components are harder to customize beyond the provided theme API, and its visual style is closely associated with Google's Material Design, which may not suit the project's desired aesthetic.
- **Chakra UI**: Chakra provides accessible components with a clean API and good theming support. However, it also relies on CSS-in-JS (Emotion) at runtime and its component styling is less flexible than owning the source code directly as shadcn/ui allows.
- **Radix UI + custom styling**: Using Radix primitives directly with custom Tailwind styles was considered. shadcn/ui essentially does this but provides well-designed default implementations, saving significant upfront effort. If needed, the team can still modify the generated components since the code is local.
- **CSS Modules or vanilla CSS**: These approaches avoid the utility-class paradigm but result in more context-switching between files, more naming decisions (BEM, etc.), and a larger surface area for style conflicts. Tailwind's utility-first approach co-locates styles with markup and eliminates class naming as a concern.
- **Styled Components / Emotion**: CSS-in-JS libraries add runtime overhead and complicate Server Component usage in Next.js's App Router, since they typically require a client-side style registry.

## Consequences
- **Positive**: The team owns all component source code, so any component can be modified without forking a library or fighting an abstraction layer. This is especially valuable when design requirements diverge from the library defaults.
- **Positive**: Radix UI primitives provide robust accessibility out of the box, including proper ARIA roles, keyboard navigation, and focus trapping for modals and dropdowns.
- **Positive**: Tailwind CSS works seamlessly with React Server Components since it generates styles at build time with no runtime JavaScript overhead.
- **Positive**: Tailwind's utility classes make it easy to implement responsive designs and dark mode. The design token system ensures visual consistency.
- **Positive**: shadcn/ui has strong community adoption, extensive documentation, and regular updates to the component templates.
- **Negative**: Tailwind utility classes can make JSX verbose, particularly for components with many responsive or state-based styles. Extracting common patterns into reusable components or using `cn()` (classnames merge utility) mitigates this but requires discipline.
- **Negative**: Since shadcn/ui components are copied into the project, updating them when upstream improvements are made is a manual process (re-running the CLI and diffing changes). There is no automatic version upgrade path.
- **Negative**: New developers unfamiliar with Tailwind CSS will need to learn the utility class naming conventions, though IDE extensions (Tailwind CSS IntelliSense) significantly reduce this friction.
