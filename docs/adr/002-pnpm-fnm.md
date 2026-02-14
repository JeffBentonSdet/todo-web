# ADR-002: pnpm for Package Management and fnm for Node Version Management

## Status
Accepted

## Context
The project needs a reliable and performant package manager for installing and managing JavaScript dependencies. It also needs a consistent way to ensure all developers and CI environments use the same Node.js version to avoid "works on my machine" issues.

## Decision
We chose **pnpm** as the package manager and **fnm** (Fast Node Manager) for Node.js version management.

pnpm is used for all dependency installation, script execution, and lockfile management. The project includes a `.npmrc` file for pnpm configuration and a `pnpm-lock.yaml` lockfile that must be committed to version control.

fnm is the recommended tool for installing and switching between Node.js versions. The project specifies the required Node.js version in the `.node-version` file at the repository root, which fnm reads automatically when entering the project directory (when configured with shell integration).

## Alternatives Considered
- **npm**: npm is the default Node.js package manager and requires no additional installation. However, it uses a flat `node_modules` structure that can lead to phantom dependencies (where code accidentally imports a transitive dependency that is not explicitly listed in `package.json`). npm is also slower than pnpm for installation in most benchmarks.
- **yarn (v1 / Classic)**: Yarn Classic improved on npm's early shortcomings but has been in maintenance mode. It also uses a flat `node_modules` structure with the same phantom dependency problem.
- **yarn (v3 / Berry with PnP)**: Yarn Berry with Plug'n'Play eliminates `node_modules` entirely, which can improve performance. However, PnP has compatibility issues with some tools and libraries, and the migration path is more disruptive. The developer experience with pnpm is more straightforward.
- **nvm (Node Version Manager)**: nvm is the most widely known Node version manager but is implemented as a shell function that can slow down shell startup. It does not support Windows natively. fnm is written in Rust, starts significantly faster, and works cross-platform.
- **volta**: Volta is another Rust-based Node version manager with the added ability to pin package manager versions. It is a solid alternative, but fnm is simpler, has fewer opinions, and the team had more familiarity with it.

## Consequences
- **Positive**: pnpm's content-addressable storage means dependencies are stored once on disk and hard-linked into projects, saving significant disk space across multiple projects.
- **Positive**: pnpm's strict `node_modules` structure (symlinked, non-flat) prevents phantom dependencies, meaning the code can only import packages explicitly listed in `package.json`. This catches missing dependency declarations early.
- **Positive**: pnpm is faster than npm and yarn Classic for most installation scenarios due to its storage model and parallel fetching.
- **Positive**: fnm switches Node versions almost instantly compared to nvm, and its `.node-version` file is compatible with most Node version managers as a fallback.
- **Negative**: Developers must install pnpm separately (it is not bundled with Node.js). New team members unfamiliar with pnpm may need a brief orientation.
- **Negative**: Some CI environments and deployment platforms default to npm or yarn, requiring explicit configuration to use pnpm instead.
- **Negative**: pnpm's strict dependency resolution can surface errors that npm silently ignores, which may require adding missing dependencies to `package.json` when adopting new libraries.
