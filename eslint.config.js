import eslint from '@eslint/js';
import stencil from '@stencil/eslint-plugin';
import prettier from 'eslint-config-prettier';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'dist-custom-elements/**',
      'loader/**',
      'www/**',
      'storybook-static/**',
      'examples/*/dist/**',
      'src/components.d.ts',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { ...stencil.configs.flat.recommended, files: ['src/components/**/*.tsx'] },
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ['**/*.tsx'],
    rules: { '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^h$' }] },
  },
  prettier,
);
