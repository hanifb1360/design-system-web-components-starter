# Component guidelines

Start with native HTML and keep public APIs small and typed. Use positive boolean properties, standard names where possible, native events when sufficient, and composed custom events only when the platform has no equivalent. Slots represent meaningful composition points; Shadow DOM internals and parts are public only when documented.

Document the component class, every public property and event, and each supported slot and CSS part next to the implementation. Put consumer examples in the component's `usage/` directory. `npm run docs` generates human-readable component references and `docs/components.json`; `npm run docs:check` prevents metadata drift in CI.

Consume component/semantic tokens, preserve keyboard behavior and visible focus, test behavior rather than snapshots, and add Storybook stories for important states. Every component needs accessible-name guidance, real-browser coverage where behavior depends on the browser, and a Changeset for public changes. Removing or renaming properties, events, slots, parts, or tokens is breaking.
