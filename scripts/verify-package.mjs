import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = new URL('..', import.meta.url);
const temporary = mkdtempSync(join(tmpdir(), 'ds-package-'));
const environment = { ...process.env, npm_config_cache: join(temporary, '.npm-cache') };
execFileSync('npm', ['run', 'build'], { cwd: root, stdio: 'inherit' });
const pack = JSON.parse(
  execFileSync('npm', ['pack', '--json'], { cwd: root, encoding: 'utf8', env: environment }),
)[0];
const required = [
  'dist/index.js',
  'loader/index.js',
  'dist/types/index.d.ts',
  'dist-custom-elements/index.js',
  'src/styles/index.css',
];
for (const file of required)
  if (!pack.files.some(entry => entry.path === file))
    throw new Error(`Packed package is missing ${file}`);
try {
  execFileSync('npm', ['init', '-y'], { cwd: temporary, stdio: 'ignore', env: environment });
  execFileSync('npm', ['install', join(new URL('.', root).pathname, pack.filename)], {
    cwd: temporary,
    stdio: 'ignore',
    env: environment,
  });
  execFileSync(
    'node',
    [
      '--input-type=module',
      '--eval',
      "await import('@hanifb/web-component-design-system-starter'); await import('@hanifb/web-component-design-system-starter/loader'); await import('@hanifb/web-component-design-system-starter/components/ds-button');",
    ],
    { cwd: temporary, stdio: 'inherit' },
  );
  const manifest = JSON.parse(
    readFileSync(
      join(temporary, 'node_modules/@hanifb/web-component-design-system-starter/package.json'),
      'utf8',
    ),
  );
  if (!manifest.types) throw new Error('Packed package has no types entry.');
} finally {
  rmSync(temporary, { recursive: true, force: true });
  rmSync(new URL(pack.filename, root), { force: true });
}
console.log('Package contents and public imports verified.');
