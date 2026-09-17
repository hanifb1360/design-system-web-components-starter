# Case study: turning a scaffold into a production-oriented component library

## Summary

This project began as a Stencil 3.5.6 scaffold with generic Storybook examples. The modernization turned it into a deliberately small but production-oriented design-system reference: three accessible components, layered design tokens, framework-neutral distribution, release automation, and evidence-based quality gates.

The work optimized for depth rather than component count. A button, input, and icon are enough to demonstrate API design, Shadow DOM boundaries, native form behavior, accessibility, theming, packaging, consumer integration, documentation, visual governance, and performance constraints.

## The engineering problem

A starter can look convincing while leaving its hardest risks unresolved. The initial repository did not prove that components behaved like native controls, that the packed npm artifact worked in real consumers, that documented states were accessible, or that build output stayed lean. It also lacked a durable way to communicate why architectural choices were made.

The goal was therefore not “add more UI.” It was to establish a maintainable contract across four boundaries:

1. Component authors need typed APIs and clear contribution rules.
2. Consumers need predictable browser behavior and stable package exports.
3. Designers need tokens, themes, visual review, and constrained customization.
4. Maintainers need automated evidence that releases remain accessible, documented, consumable, and within budget.

## Key decisions

### One native implementation

Web Components provide the public runtime contract, while Stencil provides typed authoring and multiple distribution outputs. Vanilla JavaScript and React use the same custom elements rather than parallel implementations. This reduces behavioral drift, but it makes package and framework-boundary testing essential.

### Native semantics over imitation

`ds-button` delegates interaction to a native button and supports light-DOM form submission and reset. `ds-input` uses `ElementInternals` for `FormData`, constraint validation, reset, disabled fieldsets, and state restoration. This was a deeper solution than merely mirroring a value through a custom event.

### Intentional customization

Tokens flow from primitive values to semantic intent to component aliases. Shadow DOM protects implementation details; documented tokens, properties, slots, events, and a narrow `::part` surface provide supported extension points. Visual testing uncovered a theme-scoping flaw in the token aliases, demonstrating why architectural rules need executable checks.

### Test the artifact, not only the source

CI packs the library and installs the tarball into isolated vanilla and React projects. Those builds exercise the loader, CSS export, generated declarations, React JSX augmentation, and typed custom event. A separate package verifier checks required files and import paths.

## Quality strategy

The test pyramid is adapted to component-library risks:

- Fast specification tests cover rendering and property contracts.
- Chromium tests cover native focus, keyboard, form, and `ElementInternals` behavior.
- Twenty-five Storybook tests run documented states through interaction assertions and axe.
- Two focused visual baselines cover high-risk light and dark component states.
- Generated API documentation is rebuilt in CI and compared for drift.
- Production output is measured against raw and gzip budgets.

Automation is intentionally not described as WCAG certification. Screen-reader usability, wording, zoom, contrast contexts, and forced-colors behavior remain part of manual review.

## Measurable outcomes

| Area                         | Evidence                                                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Components                   | 3 typed custom elements with generated API references                                                      |
| Automated tests              | 15 specification/browser/visual tests and 25 Storybook checks (40 total)                                   |
| Consumers                    | Packed-tarball builds for vanilla JavaScript and React                                                     |
| Accessibility                | Native controls, form association, axe in CI, documented manual matrix                                     |
| Visual governance            | Reviewed light and dark baselines with diff output                                                         |
| Lazy distribution            | 29.54 kB raw, 11.23 kB gzip                                                                                |
| Custom-elements distribution | 27.73 kB raw, 10.28 kB gzip                                                                                |
| Public styles                | 3.84 kB raw, 0.83 kB gzip                                                                                  |
| Supply chain                 | Changesets, dependency updates, package-content checks, and zero known audit findings at verification time |

These are repository engineering outcomes, not claims about production adoption or business impact.

## Problems discovered through verification

- Shadow DOM focus is retargeted to the host, so interaction tests must inspect the shadow root's active element rather than apply a light-DOM focus assumption.
- A custom input that looked correct initially lacked full native form participation; browser contracts drove the `ElementInternals` implementation.
- Component token aliases originally resolved in the light root and produced low-contrast text in a dark input. Visual baseline review exposed the issue, and theme-scoped aliases fixed it.
- Test and Storybook modules were entering the published Stencil collection. A production-specific TypeScript configuration and an explicit collection check removed and prevent that leakage.
- Generated documentation contained timestamps and formatter drift. A dedicated docs configuration now normalizes output and makes CI comparison deterministic.

## Tradeoffs and next steps

The project favors explicit quality gates over the fastest possible CI. It targets evergreen browsers because native form association is central to the input contract. React support currently uses consumer-side JSX augmentation; a dedicated adapter package would be justified only if demand requires richer framework ergonomics.

The next meaningful work is operational rather than adding arbitrary components: test the release workflow in a staging registry, define a supported-browser matrix from real consumer needs, add cross-browser coverage where risk warrants it, and collect adoption feedback before expanding the API surface.

## Interview discussion prompts

- Why was `ElementInternals` preferable to a hidden light-DOM input, and what browser-support tradeoff did that create?
- Why do consumer fixtures install a tarball instead of importing the repository directly?
- Which contracts belong in Storybook, browser tests, visual tests, or manual accessibility review?
- How should a team decide whether to raise a bundle budget or redesign a feature?
- When would a React wrapper package become worth the additional release and ownership cost?

See the [architecture decision records](decisions/README.md) for the durable rationale behind these choices.
