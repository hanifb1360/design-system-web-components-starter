import { describe, expect, h, it, render } from '@stencil/vitest';
describe('ds-input', () => {
  it('associates label and description', async () => {
    const { root } = await render(<ds-input label="Email" description="Work address" />);
    const input = root.shadowRoot?.querySelector('input');
    const label = root.shadowRoot?.querySelector('label');
    expect(label?.htmlFor).toBe(input?.id);
    expect(input?.getAttribute('aria-describedby')).toContain('description');
  });
  it('communicates errors programmatically', async () => {
    const { root } = await render(<ds-input label="Email" invalid errorMessage="Required" />);
    const input = root.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
    expect(input?.getAttribute('aria-describedby')).toContain('error');
  });
});
