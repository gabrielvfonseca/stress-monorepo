import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { writeFile, ensureDir } from './fsutil.js';
import { pkgJson, tsconfig, srcIndex, srcUtil, behaviorTest, hardTest, hardSupportFiles } from './templates.js';

export function writeRoot(root, graph, sizeName) {
  writeFile(path.join(root, 'package.json'), JSON.stringify({
    name: 'stress-monorepo',
    private: true,
    packageManager: 'pnpm@9.15.0',
    scripts: {
      build: 'turbo run build --no-daemon',
      test: 'turbo run test --no-daemon',
      lint: 'turbo run lint --no-daemon',
      typecheck: 'turbo run typecheck --no-daemon',
      'test:root': 'vitest run',
      'build:pkgs': 'pnpm -r --if-present run build',
    },
    devDependencies: {
      turbo: '^2.3.3',
      typescript: '^5.6.3',
      vitest: '^2.1.8',
      '@types/node': '^22.10.1',
    },
  }, null, 2) + '\n');

  writeFile(path.join(root, 'turbo.json'), JSON.stringify({
    $schema: 'https://turbo.build/schema.json',
    tasks: {
      build: {
        dependsOn: ['^build'],
        outputs: ['dist/**'],
      },
      test: {
        dependsOn: ['^build'],
        outputs: [],
        cache: true,
        env: ['STRESS_NAMED', 'STRESS_ENUM', 'STRESS_SIZE'],
      },
      lint: { outputs: [] },
      typecheck: { dependsOn: ['^build'], outputs: [] },
    },
  }, null, 2) + '\n');


  writeFile(path.join(root, 'pnpm-workspace.yaml'), `packages:\n  - "packages/*/*"\n`);
  writeFile(path.join(root, 'tsconfig.base.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2022',
      module: 'ESNext',
      moduleResolution: 'Bundler',
      strict: true,
      declaration: false,
      esModuleInterop: true,
      skipLibCheck: true,
      types: ['node', 'vitest/globals'],
      baseUrl: '.',
      paths: { '@stress/*': ['packages/*/*/src/index.ts', 'packages/*/*/src/index'] }
    }
  }, null, 2) + '\n');

  writeFile(path.join(root, 'vitest.config.ts'), `import { defineConfig } from 'vitest/config';\nimport path from 'node:path';\nimport fs from 'node:fs';\n\nfunction stressAlias() {\n  const root = __dirname;\n  const pkgs = path.join(root, 'packages');\n  const map = new Map();\n  if (fs.existsSync(pkgs)) for (const layer of fs.readdirSync(pkgs)) {\n    const ld = path.join(pkgs, layer);\n    if (!fs.statSync(ld).isDirectory()) continue;\n    for (const name of fs.readdirSync(ld)) map.set(\`@stress/\${name}\`, path.join(ld, name, 'src/index.ts'));\n  }\n  return map;\n}\nconst aliases = stressAlias();\n\nexport default defineConfig({\n  resolve: {\n    alias: Object.fromEntries(aliases),\n  },\n  test: {\n    pool: 'forks',\n    include: ['packages/**/test/**/*.test.ts'],\n    testTimeout: 30000,\n    hookTimeout: 30000,\n    env: { STRESS_NAMED: 'named-ok', STRESS_ENUM: '1' },\n  },\n});\n`);

  writeFile(path.join(root, '.env'), `STRESS_NAMED=named-ok\nSTRESS_ENUM=1\nSTRESS_SIZE=${sizeName}\n`);
  writeFile(path.join(root, '.npmrc'), `shared-workspace-lockfile=true\n`);
  writeFile(path.join(root, '.gitignore'), `node_modules/\ndist/\n_generator/node_modules/\n*.tsbuildinfo\n.turbo/\nout/\n`);

  // shared root config package content marker
  const rootCfg = graph.pkgs.find((p) => p.isRootConfig);
  if (rootCfg) {
    writeFile(path.join(root, rootCfg.dir, 'root-config.json'), JSON.stringify({ shared: true, rev: 1 }) + '\n');
  }
}

export function writePackages(root, graph) {
  for (const pkg of graph.pkgs) {
    const dir = path.join(root, pkg.dir);
    ensureDir(path.join(dir, 'src'));
    ensureDir(path.join(dir, 'test'));
    writeFile(path.join(dir, 'package.json'), pkgJson(pkg, graph));
    writeFile(path.join(dir, 'tsconfig.json'), tsconfig(pkg));
    writeFile(path.join(dir, 'src', 'index.ts'), srcIndex(pkg, graph));
    writeFile(path.join(dir, 'src', 'util.ts'), srcUtil(pkg));
    for (const t of pkg.testFiles) {
      const content = t.kind === 'hard' ? hardTest(pkg, t, graph) : behaviorTest(pkg, t, graph);
      writeFile(path.join(root, t.file), content);
    }
    const support = hardSupportFiles(pkg);
    for (const [p, c] of Object.entries(support)) writeFile(path.join(root, p), c);
  }
}
