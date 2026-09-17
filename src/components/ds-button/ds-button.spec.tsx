import { describe, expect, h, it, render } from '@stencil/vitest';
describe('ds-button', () => {
  it('uses a native button and preserves its accessible name', async () => {
    const { root } = await render(<ds-button>Save</ds-button>);
    expect(root).toHaveTextContent('Save');
    expect((root as HTMLDsButtonElement).type).toBe('button');
  });
  it('disables activation while loading', async () => {
    const { root } = await render(<ds-button loading>Save</ds-button>);
    expect((root as HTMLDsButtonElement).loading).toBe(true);
    expect(root.getAttribute('loading')).not.toBeNull();
  });
});
