import { beforeAll } from 'vitest';

beforeAll(async () => {
  await import(new URL('./dist/dsstarter/dsstarter.esm.js', import.meta.url).href);
});
