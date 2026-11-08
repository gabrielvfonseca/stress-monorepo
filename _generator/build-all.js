#!/usr/bin/env node
import path from 'node:path';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRng } from './rng.js';
import { getSize } from './sizes.js';
import { buildGraph } from './graph.js';
import { assignHardCases, planTests } from './plan.js';
import { writeRoot, writePackages } from './emit.js';
import { runHistory } from './history.js';
import { writeFile } from './fsutil.js';

const args = process.argv.slice(2);
const sizeIdx = args.indexOf('--size');
const sizeName = sizeIdx >= 0 ? args[sizeIdx + 1] : 'l';
const size = getSize(sizeName);
const root = path.resolve(process.cwd(), '..');
if (!fs.existsSync(path.join(root, '.git'))) throw new Error('expected git repo at root');

console.log(`Building ${sizeName}: packages=${size.packages} tests=${size.testFiles} commits=${size.commits}`);
const rng = createRng(size.seed);
const graph = buildGraph(rng, size);
const hard = assignHardCases(rng, graph);
planTests(rng, graph, size);

writeRoot(root, graph, sizeName);
writePackages(root, graph);

const head = runHistory(root, graph, size, rng);

// manifest
const manifest = {
  size: sizeName,
  seed: size.seed,
  packages: graph.pkgs.length,
  testFiles: graph.pkgs.reduce((a,p)=>a+p.testFiles.length,0),
  hardCases: hard.HARD_CASES,
  placements: hard.placements,
  hardCaseTests: graph.pkgs.flatMap(p=>p.testFiles.filter(t=>t.kind==='hard' && t.tag).map(t=>({ tag: t.tag, test: t.file, package: p.fullName }))),
  head,
};
writeFile(path.join(root, '_truth', 'MANIFEST.json'), JSON.stringify(manifest, null, 2) + '\n');
execFileSync('git', ['add','-A'], { cwd: root });
execFileSync('git', ['commit','-m','chore: add truth manifest and finalize'], { cwd: root, stdio: 'inherit' });

console.log('Generated at', root, 'head', head);
