import { describe, expect, h, it, render } from '@stencil/vitest';

describe('ds-input in a browser', () => {
  it('participates in FormData and emits value changes', async () => {
    const { root, spyOnEvent } = await render(<ds-input label="Email" name="email" />);
    const input = root.shadowRoot?.querySelector('input');
    const event = spyOnEvent('dsInput');
    if (input) {
      input.value = 'reader@example.com';
      input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    }
    expect(event).toHaveReceivedEventDetail('reader@example.com');
    expect(root.shadowRoot?.querySelector('label')?.htmlFor).toBe(input?.id);
  });
});
