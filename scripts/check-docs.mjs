import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const generated = [
  'docs/components.d.ts',
  'docs/components.json',
  'src/components/ds-button/readme.md',
  'src/components/ds-icon/readme.md',
  'src/components/ds-input/readme.md',
];
const before = new Map(
  generated.map(file => [
    file,
    existsSync(join(root, file)) ? readFileSync(join(root, file)) : null,
  ]),
);

execFileSync('npm', ['run', 'docs'], { cwd: root, stdio: 'inherit' });

const stale = generated.filter(file => {
  const previous = before.get(file);
  const path = join(root, file);
  return !existsSync(path) || previous === null || !previous.equals(readFileSync(path));
});

if (stale.length) {
  throw new Error(
    `Generated API documentation was stale:\n- ${stale.join('\n- ')}\nCommit the regenerated files.`,
  );
}

console.log('Generated component documentation is current.');
