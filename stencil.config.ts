import type { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'dsStarter',
  sourceMap: true,
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
