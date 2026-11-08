import path from 'node:path';

const HARD_CASES = [
  'dynamic-import-computed',
  'cjs-require',
  'workspace-symlink',
  'fixture-fs-read',
  'readdir-list',
  'existsSync-optional',
  'env-named',
  'env-enumerate',
  'config-tsconfig-paths',
  'config-vitest',
  'config-dotenv',
  'config-root-shared',
  'worker-thread',
  'child-process',
  'codegen-import',
  'nondeterministic-clock',
  'nondeterministic-random',
];

export function assignHardCases(rng, graph) {
  const { pkgs } = graph;
  const placements = [];
  // spread across packages; ensure each appears at least once (and a few duplicates for realism)
  const targets = rng.shuffle(pkgs.slice());
  for (let i = 0; i < HARD_CASES.length; i++) {
    const tag = HARD_CASES[i];
    const pkg = targets[i % targets.length];
    pkg.hard.push(tag);
    placements.push({ tag, pkg: pkg.fullName, dir: pkg.dir });
  }
  // mark config/root-shared package
  const rootCfg = pkgs.find((p) => p.layer === 'core' && p.idx === 0) || pkgs[0];
  rootCfg.hard.push('config-root-shared');
  rootCfg.isRootConfig = true;
  return { HARD_CASES, placements, rootCfg: rootCfg.fullName };
}

export function planTests(rng, graph, size) {
  const { pkgs } = graph;
  const total = size.testFiles;
  // allocate: weighted toward apps/features, but every package gets >=1
  const base = pkgs.map(() => 1);
  let remaining = Math.max(0, total - pkgs.length);
  const weights = pkgs.map((p) => {
    if (p.layer === 'apps') return 6;
    if (p.layer === 'features') return 4;
    if (p.layer === 'libs') return 2;
    return 1 + (graph.hubs.includes(p) ? 3 : 0);
  });
  const wsum = weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < pkgs.length && remaining > 0; i++) {
    const add = i === pkgs.length - 1 ? remaining : Math.floor((remaining * weights[i]) / wsum);
    base[i] += Math.max(0, add);
  }
  // fix rounding
  let sum = base.reduce((a, b) => a + b, 0);
  while (sum < total) { base[rng.int(pkgs.length)]++; sum++; }
  while (sum > total) { const i = rng.int(pkgs.length); if (base[i] > 1) { base[i]--; sum--; } }

  for (let i = 0; i < pkgs.length; i++) {
    const p = pkgs[i];
    for (let t = 0; t < base[i]; t++) {
      p.testFiles.push({
        file: path.join(p.dir, 'test', `spec-${String(t).padStart(5, '0')}.test.ts`),
        idx: t,
        kind: 'normal',
        extra: null,
      });
    }
  }
  // attach hard-case specific tests (tagged) - they count within allocations by reusing/marking first test
  attachHardTests(graph);
  return total;
}

function attachHardTests(graph) {
  for (const p of graph.pkgs) {
    for (const tag of p.hard) {
      if (['deep-chain','diamond','barrel','config-root-shared'].includes(tag)) continue;
      const t = p.testFiles.find((x) => x.kind === 'normal') || p.testFiles[0];
      if (!t) continue;
      // some tags get dedicated test file to keep normal tests stable
      if (['nondeterministic-clock','nondeterministic-random'].includes(tag)) {
        p.testFiles.push({ file: path.join(p.dir, 'test', `hard-${tag}.test.ts`), idx: 9999, kind: 'hard', tag });
      } else if (t.kind === 'normal' && !t.tag) {
        t.kind = 'hard'; t.tag = tag;
      } else {
        p.testFiles.push({ file: path.join(p.dir, 'test', `hard-${tag}.test.ts`), idx: 9998, kind: 'hard', tag });
      }
    }
  }
}
