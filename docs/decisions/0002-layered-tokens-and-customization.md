# ADR-0002: Layered tokens and constrained customization

- Status: Accepted
- Date: 2026-09-17

## Context

Shadow DOM prevents accidental selector coupling, but consumers still need intentional theming and composition surfaces. Exposing internal selectors would make refactoring unsafe, while a flat token list would mix palette values, product meaning, and component decisions.

## Decision

Use a one-way token dependency graph: primitive → semantic → component → implementation. Themes override semantic values, and component aliases are evaluated in the active theme scope. Offer customization in this order: tokens, properties or attributes, slots, events, then a small documented `::part` surface.

## Consequences

- Themes can change intent without rewriting component CSS.
- Shadow internals remain replaceable unless explicitly exposed as a part.
- Token removals and documented part changes are public API changes.
- Component-token aliases must be scoped with themes; visual regression coverage protects this rule.
