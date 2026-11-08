import { describe, it, expect } from 'vitest';
import { compute, base, name } from '../src/index';

describe('apps-0038 0', () => {
  it('has stable identity and behavior', () => {
    expect(name).toBe('apps-0038');
    expect(base).toBe(28);
    const v = compute(0);
    expect(typeof v).toBe('number');
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBe(compute(0));
  });
});
