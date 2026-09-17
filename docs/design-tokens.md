# Design tokens

`primitive.css` owns raw scales, `semantic.css` maps them to intent, and `component.css` supplies focused component defaults. Components consume semantic or component tokens, not palette values. Themes override semantic tokens: `[data-theme='dark']` is provided, while consumers can define `[data-theme='brand'] { --ds-color-action-primary: ... }`.

Tokenize durable design decisions shared across contexts. Keep one-off layout relationships and structural component CSS local. Use `--ds-{category}-{role}-{state}` names; avoid aliases with no consumer or speculative token explosions.
