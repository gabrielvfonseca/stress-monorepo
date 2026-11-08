import { defineConfig } from 'vitest/config';
import path from 'node:path';
import fs from 'node:fs';

function stressAlias() {
  const root = __dirname;
  const pkgs = path.join(root, 'packages');
  const map = new Map();
  if (fs.existsSync(pkgs)) for (const layer of fs.readdirSync(pkgs)) {
    const ld = path.join(pkgs, layer);
    if (!fs.statSync(ld).isDirectory()) continue;
    for (const name of fs.readdirSync(ld)) map.set(`@stress/${name}`, path.join(ld, name, 'src/index.ts'));
  }
  return map;
}
const aliases = stressAlias();

export default defineConfig({
  resolve: {
    alias: Object.fromEntries(aliases),
  },
  test: {
    pool: 'forks',
    include: ['packages/**/test/**/*.test.ts'],
    testTimeout: 30000,
    hookTimeout: 30000,
    env: { STRESS_NAMED: 'named-ok', STRESS_ENUM: '1' },
  },
});
// history rev 13 pool=forks
