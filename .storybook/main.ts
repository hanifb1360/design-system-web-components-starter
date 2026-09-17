import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: { name: '@storybook/web-components-vite', options: {} },
  staticDirs: [
    { from: '../src/styles', to: '/styles' },
    { from: '../www/build', to: '/build' },
  ],
};

export default config;
