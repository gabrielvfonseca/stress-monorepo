export const SIZES = {
  s: { packages: 50, testFiles: 1000, commits: 500, seed: 'stress-s' },
  m: { packages: 300, testFiles: 10000, commits: 500, seed: 'stress-m' },
  l: { packages: 2000, testFiles: 100000, commits: 50, seed: 'stress-l' },
  // 10x of S ("gigantic" fixture) with Turborepo-ready structure
  xl: { packages: 500, testFiles: 10000, commits: 500, seed: 'stress-xl-10x' },
};

export function getSize(name) {
  const s = SIZES[name];
  if (!s) throw new Error(`unknown size ${name}`);
  return s;
}
