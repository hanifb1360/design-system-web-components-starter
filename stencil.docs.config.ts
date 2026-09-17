import type { Config } from '@stencil/core';
import { config as buildConfig } from './stencil.config';

export const config: Config = {
  ...buildConfig,
  outputTargets: [
    { type: 'docs-readme', footer: '*Generated from source. Do not edit below the marker.*' },
    { type: 'docs-json', file: 'docs/components.json' },
  ],
};
