import { describe, it, expect } from 'vitest';
import { compute, base, name } from '../src/index';

describe('features-0102 0', () => {
  it('has stable identity and behavior', () => {
    expect(name).toBe('features-0102');
    expect(base).toBe(202);
    const v = compute(0);
    expect(typeof v).toBe('number');
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBe(compute(0));
  });
});
