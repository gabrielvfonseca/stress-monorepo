import { describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
describe('hard cjs require', () => {
  it('requires repo file', () => {
    const m = require('../src/cjs-data.cjs');
    expect(m.pkg).toBe('libs-0042');
  });
});
