import { describe, expect, h, it, render } from '@stencil/vitest';
describe('ds-icon', () => {
  it('hides decorative icons', async () => {
    const { root } = await render(<ds-icon name="check" />);
    expect(root.shadowRoot?.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });
  it('labels meaningful icons', async () => {
    const { root } = await render(<ds-icon name="info" label="Information" />);
    expect(root.shadowRoot?.querySelector('svg')?.getAttribute('aria-label')).toBe('Information');
  });
});
