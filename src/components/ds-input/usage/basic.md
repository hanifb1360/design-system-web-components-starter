Provide a visible label and a name when the field participates in a form:

```html
<ds-input
  description="Used for account notifications."
  label="Email"
  name="email"
  required
  type="email"
></ds-input>
```

Listen for `dsInput`; its `detail` is the current string value. The component participates in `FormData`, constraint validation, reset, and disabled fieldsets through `ElementInternals`.
