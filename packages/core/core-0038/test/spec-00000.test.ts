import { describe, it, expect } from 'vitest';
describe('hard env named', () => {
  it('reads named env', () => {
    expect(process.env.STRESS_NAMED).toBe('named-ok');
  });
});
