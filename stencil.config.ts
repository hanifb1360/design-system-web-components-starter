import type { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'dsStarter',
  sourceMap: true,
  tsconfig: './tsconfig.stencil.json',
  outputTargets: [
    { type: 'dist', esmLoaderPath: '../loader' },
    {
      type: 'dist-custom-elements',
      dir: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
      externalRuntime: false,
      generateTypeDeclarations: true,
    },
    { type: 'www', serviceWorker: null },
  ],
};
