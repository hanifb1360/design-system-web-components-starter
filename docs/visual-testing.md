# Visual regression testing

`npm run test:visual` renders a deliberately small matrix of high-value component states in headless Chromium and compares each frame with a committed PNG baseline. The matrix covers light and dark themes, button variants and disabled state, input supporting text, required state, and validation feedback. Behavioral and accessibility tests remain responsible for semantics and interaction.

Baselines use a fixed viewport, explicit frame dimensions, non-animated states, stable-screenshot detection, and a small pixel tolerance. The filename intentionally omits the operating system so local and CI runs exercise the same reviewed contract. Keep the matrix focused: add a state when it represents a distinct layout or visual risk, rather than snapshotting every story.

For an intentional design change:

1. Run `npm run test:visual:update`.
2. Inspect the changed PNGs and any generated diff images; do not approve them from a command result alone.
3. Confirm the change matches the design intent in both themes.
4. Commit the baselines with the implementation and describe the visual change in the pull request.

Unexpected failures retain actual and diff images under `.vitest-attachments/`, which is ignored by Git and suitable for CI artifact upload.
