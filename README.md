# stress-monorepo (test-selection fixture)

Large, complex **TypeScript + pnpm workspaces + Turborepo** monorepo with a full git history, generated as a **stress fixture for test-selection tooling**. It has realistic dependency structure, intentional hard edge cases, and per-commit ground truth. No relation to any other repo.

## Structure (Turborepo)

- Root: `turbo.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `vitest.config.ts` (`pool: forks`), `.env`, `_truth/`, `_generator/`.
- Packages (workspace): `packages/<layer>/<name>` with `@stress/*` names and `workspace:*` deps.
  - Layers (acyclic): `core/*` → `libs/*` → `features/*` → `apps/*`.
- Turbo tasks (`turbo run … --no-daemon`): `build` (depends on `^build`), `test` (depends on `^build`, cached; uses shared `vitest.config.ts`), `lint`, `typecheck`. Package scripts are present for Turbo pipeline compatibility; source is consumed via aliases/Vitest (no compiled `dist` required for tests).
- Root scripts: `build`/`test`/`lint`/`typecheck` via Turbo; `test:root` runs Vitest directly.

## How it’s built

- **Not hand-written.** Seeded generator in `_generator/` produces the repo deterministically (same seed/size ⇒ identical output).
- Generate (from repo root with git): `(cd _generator && node build-all.js --size s|m|l|xl)`
  - `s`: ~50 packages, ~1,000 test files, 500 commits
  - `m`: ~300 packages, ~10,000 test files, 500 commits
  - `l`: ~2,000 packages, ~100,000 test files, 50 commits
  - `xl`: **~500 packages, ~10,000 test files, 500 commits** (10× S packages, Turborepo fixture; “gigantic” in structure/history/hard-case density — increase `xl` in `_generator/sizes.js` for even larger runs)

## Dependency & code characteristics

- **Long-tail fan-in:** a few hubs imported widely, most rarely.
- **Deep chains** (10+ levels), **diamond dependencies**, **re-export barrels** (`index.ts`).
- Tests import real workspace code and assert behavior (behavior changes can fail tests). **No network access during tests.**

## Hard cases (spread across packages; tagged in `_truth/MANIFEST.json`)

Dynamic `import()` with computed path; CJS `require()` of repo files (`createRequire`); workspace package-path/symlink-style resolution; `fs` fixture reads (JSON/txt); `readdir` directory listing; `existsSync` optional files; named `process.env` reads + full env enumeration; config readers (`tsconfig.base.json` paths, `vitest.config.ts`, `.env`, shared root-config marker); worker threads; `child_process` spawns; codegen-generated file imported by tests; nondeterministic clock/`Math.random` tests (invariant assertions).

## Commit history & ground truth

- **S/M/XL:** 500 commits; **L:** 50 commits. Mixed changes: behavior (break+heal / consistent), comment/whitespace, add/delete/rename/move churn, package-metadata rename marker, fixture edits, `readdir` adds, optional toggles, `.env`, config edits affecting tests, lockfile bumps, test edits. History kept healthy by heals/consistent updates.
- `_truth/<sha>.json`: `{ sha, type, expected_affected, must_fail }` — generator-derived impact from imports + runtime/config/env/fixture reads.
- `_truth/MANIFEST.json`: size/seed, counts, `hardCases`/placements/`hardCaseTests`, head.

## What this repo does **not** model

Real product/domain semantics (synthetic deterministic values), full CI/publish/lint/type gates beyond config, true cross-machine/network/flaky-external effects, complete ecosystem fidelity (e.g., exact installed symlink topology), security/perf/production dependency management, or human-like git history. Ground truth is a generator-knowledge approximation of impact.

## Reproducing / verifying

```sh
pnpm install
pnpm exec turbo run build --no-daemon --filter=@stress/core-0000  # Turbo smoke
pnpm exec vitest run packages/core/core-0000                        # direct smoke
pnpm exec turbo run test --no-daemon                                # full (large)
```

The committed fixture is the **XL** Turborepo build (deterministic seed) with passing smoke tests on HEAD. For a fully green HEAD run across all tests, use `pnpm exec vitest run` (or Turbo `test`) and allow time proportional to size.