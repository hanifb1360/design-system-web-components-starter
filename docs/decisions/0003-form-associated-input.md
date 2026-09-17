# ADR-0003: Native form participation with ElementInternals

- Status: Accepted
- Date: 2026-09-17

## Context

A text field that only emits a custom event appears functional but does not satisfy the browser's form contract. It can disappear from `FormData`, ignore form reset and disabled fieldsets, and report validation independently from the containing form.

## Decision

Make `ds-input` a form-associated custom element using `ElementInternals`. Synchronize its value and validity, implement form reset, disabled, and state-restoration callbacks, and retain a typed composed `dsInput` event for application state. Keep the editable control as a native input inside Shadow DOM.

## Consequences

- The component participates in submission and constraint validation like a native field.
- Browser-mode tests are required because DOM mocks do not implement the complete form-associated lifecycle.
- Supported browsers must provide form-associated custom elements; legacy-browser support requires a deliberate fallback.
- The component carries more lifecycle complexity than a presentation-only wrapper.
