Use the default slot for the label and named slots for optional icons:

```html
<ds-button type="submit">
  <ds-icon name="check" slot="start"></ds-icon>
  Save
</ds-button>
```

`type="submit"` and `type="reset"` act on the nearest light-DOM form. The default `button` type has no implicit form action.
