import { describe, expect, h, it, render } from '@stencil/vitest';

describe('ds-button in a browser', () => {
  it('focuses its native control and blocks loading activation', async () => {
    const { root } = await render(<ds-button loading>Save</ds-button>);
    const button = root.shadowRoot?.querySelector('button');
    expect(button?.disabled).toBe(true);
    expect(button?.getAttribute('aria-busy')).toBe('true');
  });

  it('submits and resets its containing light-DOM form', async () => {
    const { root } = await render(
      <form>
        <input name="name" value="Initial" />
        <ds-button type="submit">Submit</ds-button>
        <ds-button type="reset">Reset</ds-button>
      </form>,
    );
    const form = root as HTMLFormElement;
    const input = form.querySelector('input');
    let submissions = 0;
    form.addEventListener('submit', event => {
      event.preventDefault();
      submissions += 1;
    });
    const [submit, reset] = Array.from(form.querySelectorAll('ds-button'));
    submit.shadowRoot?.querySelector('button')?.click();
    expect(submissions).toBe(1);
    if (input) {
      input.defaultValue = 'Initial';
      input.value = 'Changed';
    }
    reset.shadowRoot?.querySelector('button')?.click();
    expect(input?.value).toBe('Initial');
  });

  it('uses native keyboard activation and delegates focus to its button', async () => {
    const { root } = await render(<ds-button>Continue</ds-button>);
    const button = root.shadowRoot?.querySelector('button');
    let activations = 0;
    button?.addEventListener('click', () => (activations += 1));
    button?.focus();
    expect(root.shadowRoot?.activeElement).toBe(button);
    button?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    button?.click();
    expect(activations).toBe(1);
  });
});
