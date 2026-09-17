import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const root = fileURLToPath(new URL('..', import.meta.url));
const budgets = JSON.parse(readFileSync(join(root, 'performance-budgets.json'), 'utf8'));

execFileSync('npm', ['run', 'build'], { cwd: root, stdio: 'inherit' });

const collect = (directory, extensions) => {
  const files = [];
  const visit = current => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const path = join(current, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (extensions.includes(extname(entry.name)) && !entry.name.endsWith('.map'))
        files.push(path);
    }
  };
  visit(join(root, directory));
  return files;
};

const format = bytes => `${(bytes / 1024).toFixed(2)} kB`;
const failures = [];

console.log('\nArtifact                          Raw       Budget    Gzip      Budget');
console.log('------------------------------------------------------------------------');
for (const [name, budget] of Object.entries(budgets)) {
  const files = budget.directories.flatMap(directory => collect(directory, budget.extensions));
  const contents = Buffer.concat(files.sort().map(file => readFileSync(file)));
  const raw = contents.byteLength;
  const gzip = gzipSync(contents, { level: 9 }).byteLength;
  console.log(
    `${name.padEnd(32)} ${format(raw).padEnd(9)} ${format(budget.maxRawBytes).padEnd(9)} ${format(gzip).padEnd(9)} ${format(budget.maxGzipBytes)}`,
  );
  if (raw > budget.maxRawBytes)
    failures.push(`${name} raw size ${format(raw)} exceeds ${format(budget.maxRawBytes)}`);
  if (gzip > budget.maxGzipBytes)
    failures.push(`${name} gzip size ${format(gzip)} exceeds ${format(budget.maxGzipBytes)}`);
}

const collectionFiles = collect('dist/collection', ['.js']).map(file => relative(root, file));
const nonProduction = collectionFiles.filter(file => /(?:test|spec|stories)\.js$/.test(file));
if (nonProduction.length)
  failures.push(
    `Published collection contains non-production modules:\n- ${nonProduction.join('\n- ')}`,
  );

if (failures.length)
  throw new Error(`Performance budget check failed:\n- ${failures.join('\n- ')}`);

console.log('\nPerformance budgets passed; published collection contains runtime modules only.');
