import path from 'node:path';

export function pkgJson(pkg, graph) {
  const deps = {};
  for (const d of pkg.deps) deps[d] = 'workspace:*';
  return JSON.stringify({
    name: pkg.fullName,
    version: '1.0.0',
    private: true,
    type: 'module',
    scripts: {
      build: "node -e \"process.stdout.write('ok')\"",
      test: `vitest run --config ../../../vitest.config.ts --dir .`,
      lint: "node -e \"process.stdout.write('ok')\"",
      typecheck: "node -e \"process.stdout.write('ok')\"",
    },
    dependencies: deps,
  }, null, 2) + '\n';
}

export function tsconfig(pkg) {
  return JSON.stringify({
    extends: '../../../tsconfig.base.json',
    include: ['src', 'test', 'fixtures']
  }, null, 2) + '\n';
}

export function srcIndex(pkg, graph) {
  const depPkgs = pkg.deps.map((d) => graph.pkgs.find((p) => p.fullName === d)).filter(Boolean);
  const imports = depPkgs.map((d, i) => `import { base as b${i} } from '${d.fullName}';`).join('\n');
  const sum = depPkgs.length ? depPkgs.map((_, i) => `b${i}`).join(' + ') : '0';
  const barrel = pkg.hard.includes('barrel') ? `export * from './util';\n` : '';
  return `// ${pkg.fullName}\n${imports}\nexport const name = '${pkg.name}';\nexport const base = ${pkg.behaviorValue};\nexport function compute(input: number): number {\n  return base + (${sum}) + input;\n}\n${barrel}export default compute;\n`;
}

export function srcUtil(pkg) {
  return `export const utilTag = '${pkg.name}-util';\nexport function clamp(n: number) { return Math.max(0, Math.min(100000, n)); }\n`;
}

export function behaviorTest(pkg, t, graph) {
  return `import { describe, it, expect } from 'vitest';\nimport { compute, base, name } from '../src/index';\n\ndescribe('${pkg.name} ${t.idx}', () => {\n  it('has stable identity and behavior', () => {\n    expect(name).toBe('${pkg.name}');\n    expect(base).toBe(${pkg.behaviorValue});\n    const v = compute(${t.idx});\n    expect(typeof v).toBe('number');\n    expect(Number.isFinite(v)).toBe(true);\n    expect(v).toBe(compute(${t.idx}));\n  });\n});\n`;
}

export function hardTest(pkg, t, graph) {
  const tag = t.tag;
  switch (tag) {
    case 'dynamic-import-computed':
      return `import { describe, it, expect } from 'vitest';\nconst mod = '../src/' + 'util';\ndescribe('hard dynamic import', () => {\n  it('loads computed path', async () => {\n    const m = await import(mod);\n    expect(m.utilTag).toContain('${pkg.name}');\n  });\n});\n`;
    case 'cjs-require':
      return `import { describe, it, expect } from 'vitest';\nimport { createRequire } from 'node:module';\nconst require = createRequire(import.meta.url);\ndescribe('hard cjs require', () => {\n  it('requires repo file', () => {\n    const m = require('../src/cjs-data.cjs');\n    expect(m.pkg).toBe('${pkg.name}');\n  });\n});\n`;
    case 'workspace-symlink':
      return `import { describe, it, expect } from 'vitest';\nimport fs from 'node:fs';\nimport path from 'node:path';\ndescribe('hard workspace symlink', () => {\n  it('reads via workspace package path', () => {\n    const alt = path.resolve(__dirname, '../../../../packages/${pkg.layer}/${pkg.name}/package.json');\n    const j = JSON.parse(fs.readFileSync(alt,'utf8'));\n    expect(j.name).toBe('${pkg.fullName}');\n  });\n});\n`;
    case 'fixture-fs-read':
      return `import { describe, it, expect } from 'vitest';\nimport fs from 'node:fs';\nimport path from 'node:path';\ndescribe('hard fixture read', () => {\n  it('reads json and txt fixtures', () => {\n    const j = JSON.parse(fs.readFileSync(path.join(__dirname,'../fixtures/data.json'),'utf8'));\n    const t = fs.readFileSync(path.join(__dirname,'../fixtures/note.txt'),'utf8');\n    expect(j.pkg).toBe('${pkg.name}');\n    expect(t.trim()).toContain('${pkg.name}');\n  });\n});\n`;
    case 'readdir-list':
      return `import { describe, it, expect } from 'vitest';\nimport fs from 'node:fs';\nimport path from 'node:path';\ndescribe('hard readdir', () => {\n  it('acts on directory listing', () => {\n    const files = fs.readdirSync(path.join(__dirname,'../fixtures/listdir'));\n    expect(files).toContain('a.txt');\n    expect(files.length).toBeGreaterThanOrEqual(1);\n  });\n});\n`;
    case 'existsSync-optional':
      return `import { describe, it, expect } from 'vitest';\nimport fs from 'node:fs';\nimport path from 'node:path';\ndescribe('hard existsSync optional', () => {\n  it('checks optional file', () => {\n    const p = path.join(__dirname,'../fixtures/optional.flag');\n    const exists = fs.existsSync(p);\n    expect(typeof exists).toBe('boolean');\n    if (exists) expect(fs.readFileSync(p,'utf8')).toContain('on');\n  });\n});\n`;
    case 'env-named':
      return `import { describe, it, expect } from 'vitest';\ndescribe('hard env named', () => {\n  it('reads named env', () => {\n    expect(process.env.STRESS_NAMED).toBe('named-ok');\n  });\n});\n`;
    case 'env-enumerate':
      return `import { describe, it, expect } from 'vitest';\ndescribe('hard env enumerate', () => {\n  it('enumerates environment', () => {\n    const keys = Object.keys(process.env);\n    expect(keys.length).toBeGreaterThan(0);\n    expect(keys).toContain('STRESS_ENUM');\n  });\n});\n`;
    case 'config-tsconfig-paths':
      return `import { describe, it, expect } from 'vitest';\nimport fs from 'node:fs';\nimport path from 'node:path';\ndescribe('hard tsconfig paths config', () => {\n  it('observes tsconfig base', () => {\n    const p = path.resolve(__dirname, '../../../../tsconfig.base.json');\n    const j = JSON.parse(fs.readFileSync(p,'utf8'));\n    expect(j.compilerOptions.paths['@stress/*']).toBeDefined();\n  });\n});\n`;
    case 'config-vitest':
      return `import { describe, it, expect } from 'vitest';\nimport fs from 'node:fs';\nimport path from 'node:path';\ndescribe('hard vitest config', () => {\n  it('observes vitest config', () => {\n    const p = path.resolve(__dirname, '../../../../vitest.config.ts');\n    const t = fs.readFileSync(p,'utf8');\n    expect(t).toMatch(/pool/);\n    expect(t).toMatch(/forks/);\n  });\n});\n`;
    case 'config-dotenv':
      return `import { describe, it, expect } from 'vitest';\nimport fs from 'node:fs';\nimport path from 'node:path';\ndescribe('hard dotenv config', () => {\n  it('observes root env file', () => {\n    const p = path.resolve(__dirname, '../../../../.env');\n    const t = fs.readFileSync(p,'utf8');\n    expect(t).toContain('STRESS_NAMED=named-ok');\n  });\n});\n`;
    case 'worker-thread':
      return `import { describe, it, expect } from 'vitest';\nimport { Worker } from 'node:worker_threads';\nimport path from 'node:path';\nimport { fileURLToURL } from 'node:url';\ndescribe('hard worker thread', () => {\n  it('spawns worker', async () => {\n    const w = new Worker(path.join(__dirname,'../src/worker.mjs'));\n    const msg = await new Promise((res, rej) => { w.once('message', res); w.once('error', rej); });\n    expect(msg).toEqual({ ok: true, pkg: '${pkg.name}' });\n    await w.terminate();\n  });\n});\n`;
    case 'child-process':
      return `import { describe, it, expect } from 'vitest';\nimport { execFileSync } from 'node:child_process';\nimport process from 'node:process';\ndescribe('hard child process', () => {\n  it('spawns child', () => {\n    const out = execFileSync(process.execPath, ['-e', "process.stdout.write('child-${pkg.name}')"], { encoding:'utf8' });\n    expect(out).toBe('child-${pkg.name}');\n  });\n});\n`;
    case 'codegen-import':
      return `import { describe, it, expect } from 'vitest';\nimport { generated } from '../src/generated.js';\ndescribe('hard codegen import', () => {\n  it('imports generated file', () => {\n    expect(generated).toBe('${pkg.name}-gen');\n  });\n});\n`;
    case 'nondeterministic-clock':
      return `import { describe, it } from 'vitest';\ndescribe('hard nondeterministic clock', () => {\n  it('uses clock (nondeterministic by design)', async () => {\n    const a = Date.now();\n    await new Promise(r => setTimeout(r, 1));\n    const b = Date.now();\n    if (b < a) throw new Error('time went backwards');\n  });\n});\n`;
    case 'nondeterministic-random':
      return `import { describe, it, expect } from 'vitest';\ndescribe('hard nondeterministic random', () => {\n  it('uses Math.random (nondeterministic by design)', () => {\n    const v = Math.random();\n    expect(v).toBeGreaterThanOrEqual(0);\n    expect(v).toBeLessThan(1);\n  });\n});\n`;
    default:
      return behaviorTest(pkg, t, graph);
  }
}

export function hardSupportFiles(pkg) {
  const files = {};
  if (pkg.hard.includes('cjs-require')) files[path.join(pkg.dir,'src','cjs-data.cjs')] = `module.exports = { pkg: '${pkg.name}' };\n`;
  if (pkg.hard.includes('fixture-fs-read')) {
    files[path.join(pkg.dir,'fixtures','data.json')] = JSON.stringify({ pkg: pkg.name, v: 1 }, null, 2)+'\n';
    files[path.join(pkg.dir,'fixtures','note.txt')] = `note for ${pkg.name}\n`;
  }
  if (pkg.hard.includes('readdir-list')) {
    files[path.join(pkg.dir,'fixtures','listdir','a.txt')] = 'a\n';
  }
  // existsSync optional: file absent initially
  if (pkg.hard.includes('worker-thread')) {
    files[path.join(pkg.dir,'src','worker.mjs')] = `import { parentPort } from 'node:worker_threads';\nparentPort.postMessage({ ok: true, pkg: '${pkg.name}' });\n`;
  }
  if (pkg.hard.includes('codegen-import')) {
    files[path.join(pkg.dir,'src','generated.ts')] = `export const generated = '${pkg.name}-gen';\n`;
  }
  return files;
}
