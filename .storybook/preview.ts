import type { Preview } from '@storybook/web-components-vite';
import { defineCustomElements } from '../loader';
import '../src/styles/index.css';

defineCustomElements();

const preview: Preview = {
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' }, controls: { expanded: true }, layout: 'centered' },
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'light',
      toolbar: { icon: 'paintbrush', items: ['light', 'dark'] },
    },
  },
  decorators: [
    (story, context) => {
      document.documentElement.dataset.theme = context.globals.theme as string;
      return story();
    },
  ],
};

export default preview;
