import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const temporary = mkdtempSync(join(tmpdir(), 'ds-consumers-'));
const environment = { ...process.env, npm_config_cache: join(temporary, '.npm-cache') };

const run = (command, args, cwd) =>
  execFileSync(command, args, { cwd, env: environment, stdio: 'inherit' });

try {
  run('npm', ['run', 'build'], root);
  const pack = JSON.parse(
    execFileSync('npm', ['pack', '--json', '--pack-destination', temporary], {
      cwd: root,
      encoding: 'utf8',
      env: environment,
    }),
  )[0];
  const tarball = join(temporary, pack.filename);

  for (const name of ['vanilla', 'react']) {
    const source = join(root, 'examples', name);
    const consumer = join(temporary, name);
    cpSync(source, consumer, {
      recursive: true,
      filter: path => !['dist', 'node_modules', 'tsconfig.tsbuildinfo'].includes(basename(path)),
    });

    const manifestPath = join(consumer, 'package.json');
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    manifest.dependencies['@hanifb/web-component-design-system-starter'] = `file:${tarball}`;
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

    rmSync(join(consumer, 'package-lock.json'), { force: true });
    run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], consumer);
    run('npm', ['run', 'build'], consumer);
    console.log(`${name} consumer verified against ${pack.filename}.`);
  }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
