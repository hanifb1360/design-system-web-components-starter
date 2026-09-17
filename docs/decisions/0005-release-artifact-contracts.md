# ADR-0005: Verify release artifacts from consumer projects

- Status: Accepted
- Date: 2026-09-17

## Context

Tests and examples that import a source checkout can pass while the npm package is missing files, has broken exports, leaks development modules, or exposes incompatible declarations. A component library's actual product is its packed artifact.

## Decision

Pack the project in CI, install the resulting tarball into isolated vanilla and React fixtures, and build both consumers. Separately verify required files and public import paths. Enforce raw and gzip budgets across distribution modes and reject test, specification, or Storybook modules in the published collection.

## Consequences

- Package exports, styles, registration, JSX augmentation, and event types are tested from a consumer boundary.
- Consumer verification takes longer and needs dependency installation.
- Size increases require an explicit value-versus-cost decision rather than silently accumulating.
- Passing source tests is necessary but no longer sufficient for release confidence.
