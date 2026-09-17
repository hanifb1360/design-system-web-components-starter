import { describe, expect, h, it, render } from '@stencil/vitest';

describe('ds-input in a browser', () => {
  it('participates in FormData and emits value changes', async () => {
    const { root, spyOnEvent } = await render(
      <form>
        <ds-input label="Email" name="email" />
      </form>,
    );
    const control = root.querySelector('ds-input');
    const input = control?.shadowRoot?.querySelector('input');
    const event = spyOnEvent('dsInput');
    if (input) {
      input.value = 'reader@example.com';
      input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    }
    expect(event).toHaveReceivedEventDetail('reader@example.com');
    expect(control?.shadowRoot?.querySelector('label')?.htmlFor).toBe(input?.id);
    expect(new FormData(root as HTMLFormElement).get('email')).toBe('reader@example.com');
  });

  it('restores its initial value and excludes disabled controls', async () => {
    const { root } = await render(
      <form>
        <ds-input label="Name" name="name" value="Initial" />
        <ds-input disabled label="Ignored" name="ignored" value="Hidden" />
      </form>,
    );
    const form = root as HTMLFormElement;
    const control = form.querySelector('ds-input') as HTMLDsInputElement;
    control.value = 'Changed';
    await new Promise(resolve => requestAnimationFrame(resolve));
    form.reset();
    await new Promise(resolve => requestAnimationFrame(resolve));
    const data = new FormData(form);
    expect(control.value).toBe('Initial');
    expect(data.get('name')).toBe('Initial');
    expect(data.has('ignored')).toBe(false);
  });

  it('exposes required and explicit invalid states to the form', async () => {
    const { root } = await render(<ds-input label="Email" name="email" required />);
    const control = root as HTMLDsInputElement;
    expect(control.matches(':invalid')).toBe(true);
    control.value = 'reader@example.com';
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(control.matches(':valid')).toBe(true);
    control.invalid = true;
    control.errorMessage = 'This address is unavailable.';
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(control.matches(':invalid')).toBe(true);
  });

  it('creates unique label associations for multiple instances', async () => {
    const { root } = await render(
      <section>
        <ds-input label="First" />
        <ds-input label="Second" />
      </section>,
    );
    const ids = Array.from(root.querySelectorAll('ds-input')).map(
      control => control.shadowRoot?.querySelector('input')?.id,
    );
    expect(new Set(ids).size).toBe(2);
  });
});
