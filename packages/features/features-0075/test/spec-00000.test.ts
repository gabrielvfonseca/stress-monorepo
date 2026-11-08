import { describe, it, expect } from 'vitest';
describe('hard env enumerate', () => {
  it('enumerates environment', () => {
    const keys = Object.keys(process.env);
    expect(keys.length).toBeGreaterThan(0);
    expect(keys).toContain('STRESS_ENUM');
  });
});
