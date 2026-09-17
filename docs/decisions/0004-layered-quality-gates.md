# ADR-0004: Layered quality gates

- Status: Accepted
- Date: 2026-09-17

## Context

No single test technique covers a component library's risks. DOM mocks are fast but cannot prove native browser behavior. Browser interaction tests do not detect every accessibility or visual regression. Full-page screenshots are broad but noisy.

## Decision

Use focused layers: specification tests for rendering contracts, Chromium tests for native behavior, Storybook play functions plus axe for documented states, and element-level visual comparisons for a small high-risk matrix. Keep manual keyboard, screen-reader, zoom, contrast, and forced-colors review explicit because automation cannot certify usability or WCAG conformance.

## Consequences

- Failures point to a specific kind of contract instead of one oversized end-to-end suite.
- CI is slower than unit-only testing and requires Chromium.
- Visual baselines must be reviewed as code and updated only with intentional design changes.
- Important states must be added deliberately; story count alone is not a coverage metric.
