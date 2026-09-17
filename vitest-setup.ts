import { beforeAll } from 'vitest';

beforeAll(async () => {
  await import(
    /* @vite-ignore */ new URL('./dist/dsstarter/dsstarter.esm.js', import.meta.url).href
  );
});
