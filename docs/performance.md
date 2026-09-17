# Performance budgets

Performance is treated as a release constraint, not an unsupported claim. `npm run performance:check` makes a production build, measures the shipped JavaScript and public CSS, compresses each group with gzip level 9, and fails when either its raw or compressed ceiling is exceeded. CI also rejects test, specification, or Storybook modules in the published collection.

| Artifact group               | Current raw | Current gzip | Raw budget | Gzip budget |
| ---------------------------- | ----------: | -----------: | ---------: | ----------: |
| Lazy distribution            |    29.54 kB |     11.23 kB |   32.23 kB |    12.21 kB |
| Custom-elements distribution |    27.73 kB |     10.28 kB |   30.27 kB |    11.23 kB |
| Loader                       |     0.49 kB |      0.25 kB |    0.98 kB |     0.49 kB |
| Design tokens and themes     |     3.84 kB |      0.83 kB |    4.88 kB |     1.17 kB |

The groups represent alternative consumption modes, so they should not be added together as a page-load estimate. The lazy distribution and custom-elements distribution each include their shared runtime plus all three current components. Actual transfer depends on the consumer's selected output, tree-shaking, cache state, and server compression.

Budgets intentionally leave limited maintenance headroom. A pull request that exceeds one must either reduce the output or include a reviewed budget change explaining the user value and transfer-cost tradeoff. Never raise a ceiling merely to make CI green.
