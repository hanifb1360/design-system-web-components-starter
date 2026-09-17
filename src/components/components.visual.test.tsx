import { h, render } from '@stencil/vitest';
import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import '../styles/index.css';

const frameStyle = {
  background: 'var(--ds-color-background)',
  boxSizing: 'border-box',
  display: 'grid',
  gap: '24px',
  padding: '24px',
  width: '420px',
} as const;

describe('component visual contracts', () => {
  it('renders representative light-theme states', async () => {
    const { root } = await render(
      <section aria-label="Light theme component states" style={frameStyle}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <ds-button>Primary</ds-button>
          <ds-button variant="secondary">Secondary</ds-button>
          <ds-button variant="danger">Delete</ds-button>
          <ds-button disabled>Disabled</ds-button>
        </div>
        <ds-input
          description="Used for account notifications."
          label="Email"
          placeholder="reader@example.com"
          required
        />
        <ds-input
          errorMessage="Enter a valid email address."
          invalid
          label="Email"
          value="not-an-email"
        />
      </section>,
    );

    await document.fonts.ready;
    await expect.element(page.elementLocator(root)).toMatchScreenshot();
  });

  it('renders representative dark-theme states', async () => {
    const { root } = await render(
      <section aria-label="Dark theme component states" data-theme="dark" style={frameStyle}>
        <ds-button>
          <ds-icon name="check" slot="start" />
          Save changes
        </ds-button>
        <ds-input description="Theme-aware field styling." label="Display name" value="Ada" />
      </section>,
    );

    await document.fonts.ready;
    await expect.element(page.elementLocator(root)).toMatchScreenshot();
  });
});
