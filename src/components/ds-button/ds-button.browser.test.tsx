import { describe, expect, h, it, render } from '@stencil/vitest';

describe('ds-button in a browser', () => {
  it('focuses its native control and blocks loading activation', async () => {
    const { root } = await render(<ds-button loading>Save</ds-button>);
    const button = root.shadowRoot?.querySelector('button');
    expect(button?.disabled).toBe(true);
    expect(button?.getAttribute('aria-busy')).toBe('true');
  });
});
