import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { writeFile, ensureDir } from './fsutil.js';
import { srcIndex, behaviorTest } from './templates.js';

function git(root, args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}
function commitAll(root, msg) {
  git(root, ['add', '-A']);
  try { git(root, ['diff', '--cached', '--quiet']); 
    // nothing staged
  } catch { /* has staged changes */ }
  git(root, ['commit', '-m', msg, '--allow-empty']);
  return git(root, ['rev-parse', 'HEAD']).trim();
}
function writeTruth(root, sha, obj) {
  writeFile(path.join(root, '_truth', `${sha}.json`), JSON.stringify({ sha, ...obj }, null, 2) + '\n');
}

export function runHistory(root, graph, size, rng) {
  const byName = new Map(graph.pkgs.map((p) => [p.fullName, p]));
  const rev = new Map(graph.pkgs.map((p) => [p.fullName, new Set()]));
  for (const p of graph.pkgs) for (const d of p.deps) rev.get(d)?.add(p.fullName);

  function allTestsIn(pkgNames) {
    const files = [];
    for (const n of pkgNames) { const p = byName.get(n); if (p) for (const t of p.testFiles) files.push(t.file); }
    return [...new Set(files)].sort();
  }
  function pkgTests(pkg, pred) { return pkg.testFiles.filter(pred).map(t=>t.file); }

  const envReaders = () => {
    const f=[]; for (const p of graph.pkgs) for (const t of p.testFiles) if (['env-named','env-enumerate','config-dotenv'].includes(t.tag)) f.push(t.file); return [...new Set(f)].sort();
  };
  const vitestReaders = () => { const f=[]; for (const p of graph.pkgs) for (const t of p.testFiles) if (t.tag==='config-vitest') f.push(t.file); return [...new Set(f)].sort(); };
  const tsconfigReaders = () => { const f=[]; for (const p of graph.pkgs) for (const t of p.testFiles) if (t.tag==='config-tsconfig-paths') f.push(t.file); return [...new Set(f)].sort(); };

  ensureDir(path.join(root, '_truth'));
  // initial commit = full fixture state
  const sha0 = commitAll(root, 'initial: fixture state');
  writeTruth(root, sha0, { type: 'initial', expected_affected: [], must_fail: [] });

  const N = size.commits;
  const kinds = N <= 50
    ? ['behavior-break','heal','comment','fixture','env','config-vitest','readdir-add','optional-create','test-edit','lockfile']
    : ['behavior-break','heal','behavior-consistent','comment','whitespace','add-file','delete-file','rename-file','fixture','readdir-add','optional-create','env','config-vitest','config-tsconfig','lockfile','test-edit','move-file','rename-package'];

  let pendingHeal = null;
  let commitsMade = 1;
  let i = 0;
  while (commitsMade < N) {
    let kind = kinds[i % kinds.length];
    i++;
    if (pendingHeal) kind = 'heal'; // force heal next to keep history healthy quickly
    const pkg = graph.pkgs[i % graph.pkgs.length];
    let res = null;

    if (kind === 'heal' && pendingHeal) {
      // restore tests to match new behavior
      const h = pendingHeal;
      for (const t of h.pkg.testFiles.filter(t=>t.kind==='normal')) fs.writeFileSync(path.join(root,t.file), behaviorTest(h.pkg,t,graph));
      res = { message: `fix(${h.pkg.name}): update tests for behavior change`, expected_affected: h.affected, must_fail: h.affected, type: 'heal' };
      pendingHeal = null;
    } else if (kind === 'behavior-break') {
      const old = pkg.behaviorValue;
      pkg.behaviorValue = old + 7 + (i % 5);
      fs.writeFileSync(path.join(root,pkg.dir,'src','index.ts'), srcIndex(pkg, graph));
      // do NOT update tests -> they will fail (assert base === old)
      const affected = pkgTests(pkg, t=>t.kind==='normal'); // only normal tests assert base
      pendingHeal = { pkg, affected };
      res = { message: `feat(${pkg.name}): change behavior (breaks tests)`, expected_affected: affected, must_fail: affected, type: 'behavior-break' };
    } else if (kind === 'behavior-consistent') {
      pkg.behaviorValue = pkg.behaviorValue + 3;
      fs.writeFileSync(path.join(root,pkg.dir,'src','index.ts'), srcIndex(pkg, graph));
      for (const t of pkg.testFiles.filter(t=>t.kind==='normal')) fs.writeFileSync(path.join(root,t.file), behaviorTest(pkg,t,graph));
      const affected = pkgTests(pkg, t=>t.kind==='normal');
      res = { message: `feat(${pkg.name}): behavior update with tests`, expected_affected: affected, must_fail: [], type: 'behavior-consistent' };
    } else if (kind === 'comment') {
      fs.appendFileSync(path.join(root,pkg.dir,'src','index.ts'), `\n// note ${i}\n`);
      res = { message: `docs(${pkg.name}): comment ${i}`, expected_affected: [], must_fail: [], type:'comment' };
    } else if (kind === 'whitespace') {
      fs.appendFileSync(path.join(root,pkg.dir,'src','util.ts'), `\n`);
      res = { message: `style(${pkg.name}): whitespace ${i}`, expected_affected: [], must_fail: [], type:'whitespace' };
    } else if (kind === 'add-file') {
      writeFile(path.join(root,pkg.dir,'src',`extra-${i}.ts`), `export const e${i}=${i};\n`);
      res = { message: `chore(${pkg.name}): add file ${i}`, expected_affected: [], must_fail: [], type:'add-file' };
    } else if (kind === 'delete-file') {
      const cands = fs.readdirSync(path.join(root,pkg.dir,'src')).filter(f=>f.startsWith('extra-'));
      if (cands.length) fs.unlinkSync(path.join(root,pkg.dir,'src',cands[0]));
      else writeFile(path.join(root,pkg.dir,'src',`extra-del-${i}.ts`),`export const d=${i};\n`);
      res = { message: `chore(${pkg.name}): delete/add file ${i}`, expected_affected: [], must_fail: [], type:'delete-file' };
    } else if (kind === 'rename-file') {
      const a = path.join(root,pkg.dir,'src','util.ts');
      const b = path.join(root,pkg.dir,'src','util-renamed.ts');
      const a2 = path.join(root,pkg.dir,'src','util.ts');
      if (fs.existsSync(b)) fs.renameSync(b,a2); // move back
      else if (fs.existsSync(a)) { fs.copyFileSync(a,b); /* keep original too to avoid breaking imports; represents file added/renamed churn */ }
      res = { message: `refactor(${pkg.name}): file rename churn ${i}`, expected_affected: [], must_fail: [], type:'rename-file' };
    } else if (kind === 'move-file') {
      const srcD = path.join(root,pkg.dir,'src','sub');
      ensureDir(srcD);
      const f = path.join(srcD,`moved-${i}.ts`); fs.writeFileSync(f,`export const m=${i};\n`);
      res = { message: `refactor(${pkg.name}): move file ${i}`, expected_affected: [], must_fail: [], type:'move-file' };
    } else if (kind === 'rename-package') {
      // simulated by updating package description metadata (actual dir rename is expensive/disruptive to deps)
      const pj = path.join(root,pkg.dir,'package.json');
      const j = JSON.parse(fs.readFileSync(pj,'utf8')); j.description = `renamed-marker-${i}`; fs.writeFileSync(pj, JSON.stringify(j,null,2)+'\n');
      res = { message: `refactor(${pkg.name}): package metadata rename ${i}`, expected_affected: [], must_fail: [], type:'rename-package' };
    } else if (kind === 'fixture') {
      const fp = graph.pkgs.find(p=>p.hard.includes('fixture-fs-read')) || pkg;
      const fj = path.join(root,fp.dir,'fixtures','data.json');
      if (fs.existsSync(fj)) { const j=JSON.parse(fs.readFileSync(fj,'utf8')); j.v=(j.v||0)+1; fs.writeFileSync(fj,JSON.stringify(j,null,2)+'\n'); }
      res = { message: `testdata(${fp.name}): fixture edit ${i}`, expected_affected: pkgTests(fp,t=>t.tag==='fixture-fs-read'), must_fail: [], type:'fixture' };
    } else if (kind === 'readdir-add') {
      const rp = graph.pkgs.find(p=>p.hard.includes('readdir-list')) || pkg;
      const d = path.join(root,rp.dir,'fixtures','listdir'); ensureDir(d); fs.writeFileSync(path.join(d,`e-${i}.txt`),'x\n');
      res = { message: `testdata(${rp.name}): readdir add ${i}`, expected_affected: pkgTests(rp,t=>t.tag==='readdir-list'), must_fail: [], type:'readdir-add' };
    } else if (kind === 'optional-create') {
      const op = graph.pkgs.find(p=>p.hard.includes('existsSync-optional')) || pkg;
      const f = path.join(root,op.dir,'fixtures','optional.flag');
      if (fs.existsSync(f)) fs.unlinkSync(f); else { ensureDir(path.dirname(f)); fs.writeFileSync(f,`on-${i}\n`); }
      res = { message: `testdata(${op.name}): optional toggle ${i}`, expected_affected: pkgTests(op,t=>t.tag==='existsSync-optional'), must_fail: [], type:'optional-create' };
    } else if (kind === 'env') {
      fs.appendFileSync(path.join(root,'.env'), `STRESS_I${i}=${i}\n`);
      res = { message: `chore: env edit ${i}`, expected_affected: envReaders(), must_fail: [], type:'env' };
    } else if (kind === 'config-vitest') {
      const vp = path.join(root,'vitest.config.ts');
      let t = fs.readFileSync(vp,'utf8');
      t = t.replace(/\/\/ history rev .*\n?/g, '') + `// history rev ${i} pool=forks\n`;
      fs.writeFileSync(vp, t);
      res = { message: `chore: vitest config ${i}`, expected_affected: vitestReaders(), must_fail: [], type:'config-vitest' };
    } else if (kind === 'config-tsconfig') {
      const tp = path.join(root,'tsconfig.base.json'); const j=JSON.parse(fs.readFileSync(tp,'utf8')); j.compilerOptions.rev=i; fs.writeFileSync(tp,JSON.stringify(j,null,2)+'\n');
      res = { message: `chore: tsconfig config ${i}`, expected_affected: tsconfigReaders(), must_fail: [], type:'config-tsconfig' };
    } else if (kind === 'lockfile') {
      fs.appendFileSync(path.join(root,'pnpm-lock.yaml'), `# i${i}\n`);
      res = { message: `chore: lockfile bump ${i}`, expected_affected: [], must_fail: [], type:'lockfile' };
    } else if (kind === 'test-edit') {
      const t = pkg.testFiles.find(x=>x.kind==='normal');
      if (t) fs.appendFileSync(path.join(root,t.file), `// edit ${i}\n`);
      res = { message: `test(${pkg.name}): edit ${i}`, expected_affected: t?[t.file]:[], must_fail: [], type:'test-edit' };
    } else {
      res = { message: `chore: misc ${i}`, expected_affected: [], must_fail: [], type: kind };
    }

    const sha = commitAll(root, res.message);
    writeTruth(root, sha, { type: res.type || kind, expected_affected: (res.expected_affected||[]).sort(), must_fail: (res.must_fail||[]).sort() });
    commitsMade++;
  }

  // if pending heal remains (shouldn't due to loop), heal in a final amend? no, amend changes sha/history; better ensure no pending heal by planning.
  if (pendingHeal) {
    const h = pendingHeal;
    for (const t of h.pkg.testFiles.filter(t=>t.kind==='normal')) fs.writeFileSync(path.join(root,t.file), behaviorTest(h.pkg,t,graph));
    const sha = commitAll(root, `fix(${h.pkg.name}): final heal`);
    writeTruth(root, sha, { type:'heal', expected_affected: h.affected, must_fail: h.affected });
  }

  return git(root, ['rev-parse', 'HEAD']).trim();
}
