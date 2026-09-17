# ADR-0001: Web Components with Stencil

- Status: Accepted
- Date: 2026-09-17

## Context

The library needs one implementation that can serve vanilla JavaScript and multiple frameworks without duplicating component behavior. Authoring raw custom elements would minimize framework dependencies but would require the project to maintain its own rendering, reactive-property, declaration-generation, and distribution conventions.

## Decision

Use standards-based custom elements as the public runtime contract and Stencil as the authoring compiler. Publish both a lazy loader and individually importable custom-element modules. Keep framework-specific code in consumer examples and type augmentation rather than inside component implementations.

## Consequences

- Consumers receive native elements, attributes, properties, slots, events, and DOM APIs.
- One component implementation serves vanilla and React consumers.
- Stencil is a build-time architectural dependency and its generated output must be verified during upgrades.
- Framework ergonomics that exceed native custom-element support may require separately versioned adapters later.
