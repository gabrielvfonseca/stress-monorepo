#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRng } from './rng.js';
import { getSize } from './sizes.js';
import { buildGraph } from './graph.js';
import { assignHardCases, planTests } from './plan.js';
import { writeRoot, writePackages } from './emit.js';
import { writeFile } from './fsutil.js';

const args = process.argv.slice(2);
const sizeIdx = args.indexOf('--size');
const sizeName = sizeIdx >= 0 ? args[sizeIdx + 1] : 'l';
const size = getSize(sizeName);
const root = path.resolve(process.cwd(), '..'); // _generator/ -> repo root
if (!root.endsWith('stress-monorepo')) throw new Error(`unexpected root ${root}`);

console.log(`Generating size=${sizeName} packages=${size.packages} testFiles=${size.testFiles} commits=${size.commits}`);
const rng = createRng(size.seed);
const graph = buildGraph(rng, size);
assignHardCases(rng, graph);
planTests(rng, graph, size);

writeRoot(root, graph, sizeName);
writePackages(root, graph);

// initial manifest placeholder; full truth/history added by history generator
writeFile(path.join(root, '_truth', 'MANIFEST.json'), JSON.stringify({ size: sizeName, note: 'pending history' }, null, 2) + '\n');

console.log('Files written (base state).');
