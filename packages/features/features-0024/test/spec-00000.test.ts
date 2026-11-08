import { describe, it, expect } from 'vitest';
import { compute, base, name } from '../src/index';

describe('features-0024 0', () => {
  it('has stable identity and behavior', () => {
    expect(name).toBe('features-0024');
    expect(base).toBe(936);
    const v = compute(0);
    expect(typeof v).toBe('number');
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBe(compute(0));
  });
});
