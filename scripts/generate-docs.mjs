import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const catalogPath = join(root, 'docs/components.json');

execFileSync('stencil', ['docs', '--config', 'stencil.docs.config.ts'], {
  cwd: root,
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
delete catalog.timestamp;
writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);

execFileSync(
  'prettier',
  ['--write', 'docs/components.d.ts', 'docs/components.json', 'src/components/*/readme.md'],
  { cwd: root, shell: process.platform === 'win32', stdio: 'ignore' },
);
