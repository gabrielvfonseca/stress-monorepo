import { describe, it, expect } from 'vitest';
describe('hard nondeterministic random', () => {
  it('uses Math.random (nondeterministic by design)', () => {
    const v = Math.random();
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThan(1);
  });
});
