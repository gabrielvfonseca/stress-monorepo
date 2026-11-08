import { describe, it, expect } from 'vitest';
import { compute, base, name } from '../src/index';

describe('features-0125 0', () => {
  it('has stable identity and behavior', () => {
    expect(name).toBe('features-0125');
    expect(base).toBe(787);
    const v = compute(0);
    expect(typeof v).toBe('number');
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBe(compute(0));
  });
});
