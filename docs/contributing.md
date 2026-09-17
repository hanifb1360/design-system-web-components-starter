# Contributing

Use Node 22.12+ and `npm ci`. Run `npm run dev` or `npm run storybook`; before a pull request run `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test`, `npm run test:browser`, `npm run test:storybook`, `npm run build:storybook`, `npm run build:examples`, `npm run verify:package`, and `npm run verify:consumers`.

Generate a component with `npm run generate ds-name`, replace generated coverage with behavioral spec/browser tests, add actual-component stories, document its accessibility contract, and expose only intentional APIs. Add tokens at the highest reusable layer and avoid component values in primitives. Add `npm run changeset` for user-visible changes: patch for fixes, minor for additive APIs, major for removals or incompatible behavior. Pull requests should be focused, documented, and free of generated build output.
