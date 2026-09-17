# Accessibility

The library aims for WCAG 2.2 AA-compatible behavior where applicable but makes no certification claim. Vitest browser tests, semantic assertions, and Storybook axe checks catch regressions. Every Storybook story is rendered in Chromium and axe violations fail CI. Automation cannot judge wording, usability, reading order, all contrast contexts, or assistive-technology quality.

Contributors manually test keyboard operation, focus visibility, zoom/reflow, forced colors, and representative screen readers. `ds-button` retains native activation, submits or resets its containing form, and blocks duplicate activation while loading without replacing its accessible name. `ds-input` connects label, description, invalid state, and error; it participates in `FormData`, constraint validation, reset, disabled fieldsets, and state restoration through `ElementInternals`. Decorative icons are hidden; meaningful standalone icons require `label`.

Consumers must supply useful labels and text, use components in a logical order, choose valid autocomplete values, announce application-level async results, and verify contrast after overriding tokens.
