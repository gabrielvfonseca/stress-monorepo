import path from 'node:path';

const LAYERS = ['core', 'libs', 'features', 'apps'];

export function buildGraph(rng, size) {
  const n = size.packages;
  // distribute: core 20%, libs 35%, features 30%, apps 15%
  const counts = [
    Math.max(8, Math.floor(n * 0.2)),
    Math.max(8, Math.floor(n * 0.35)),
    Math.max(8, Math.floor(n * 0.3)),
    0,
  ];
  counts[3] = n - counts[0] - counts[1] - counts[2];
  if (counts[3] < 4) { counts[2] -= (4 - counts[3]); counts[3] = 4; }

  const pkgs = [];
  for (let li = 0; li < LAYERS.length; li++) {
    const layer = LAYERS[li];
    for (let i = 0; i < counts[li]; i++) {
      const name = `${layer}-${String(i).padStart(4, '0')}`;
      pkgs.push({
        layer,
        idx: i,
        name,
        fullName: `@stress/${name}`,
        dir: path.join('packages', layer, name),
        deps: [],
        runtimeReads: [], // fixture/config/env reads for truth
        hard: [],
        testFiles: [],
        srcFiles: [],
        behaviorValue: rng.int(1000) + 1,
      });
    }
  }

  const byLayer = Object.fromEntries(LAYERS.map((l) => [l, pkgs.filter((p) => p.layer === l)]));
  const hubs = byLayer.core.slice(0, Math.min(5, byLayer.core.length));

  // Deep chain (10+ levels) across layers
  const chain = [];
  for (let i = 0; i < Math.min(12, byLayer.core.length); i++) chain.push(byLayer.core[i]);
  for (let i = 0; i < Math.min(3, byLayer.libs.length); i++) chain.push(byLayer.libs[i]);
  for (let i = 0; i < Math.min(2, byLayer.features.length); i++) chain.push(byLayer.features[i]);
  for (let i = 1; i < chain.length; i++) {
    addDep(chain[i], chain[i - 1]);
  }
  chain.forEach((p) => p.hard.push('deep-chain'));

  // Diamond: features-0000 -> libs A,B -> core D
  if (byLayer.features[0] && byLayer.libs[0] && byLayer.libs[1] && byLayer.core[0]) {
    const [F, A, B, D] = [byLayer.features[0], byLayer.libs[0], byLayer.libs[1], byLayer.core[byLayer.core.length - 1] || byLayer.core[0]];
    addDep(A, D); addDep(B, D); addDep(F, A); addDep(F, B);
    [F, A, B, D].forEach((p) => p.hard.push('diamond'));
  }

  for (const p of pkgs) {
    const layerIdx = LAYERS.indexOf(p.layer);
    if (layerIdx === 0) continue;
    const lower = pkgs.filter((q) => LAYERS.indexOf(q.layer) < layerIdx);
    // long-tail fan-in: hubs very likely
    for (const h of hubs) {
      if (h !== p && rng.chance(layerIdx === 1 ? 0.7 : 0.45)) addDep(p, h);
    }
    const extra = rng.int(layerIdx + 1) + (p.layer === 'apps' ? 1 : 0);
    for (let i = 0; i < extra; i++) {
      const cand = rng.pick(lower);
      if (cand !== p) addDep(p, cand);
    }
  }

  // ensure at least one dep for non-core
  for (const p of pkgs) {
    if (p.layer !== 'core' && p.deps.length === 0) {
      const lower = pkgs.filter((q) => LAYERS.indexOf(q.layer) < LAYERS.indexOf(p.layer));
      addDep(p, rng.pick(lower));
    }
  }

  // barrel re-exports marker on some packages
  pkgs.filter((_, i) => i % 7 === 0).forEach((p) => p.hard.push('barrel'));

  return { pkgs, layers: LAYERS, hubs, chain };
}

function addDep(pkg, dep) {
  if (pkg === dep) return;
  if (!pkg.deps.includes(dep.fullName)) pkg.deps.push(dep.fullName);
}
