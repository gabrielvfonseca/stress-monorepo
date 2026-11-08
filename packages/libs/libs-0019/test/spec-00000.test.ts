import { describe, it, expect } from 'vitest';
import { compute, base, name } from '../src/index';

describe('libs-0019 0', () => {
  it('has stable identity and behavior', () => {
    expect(name).toBe('libs-0019');
    expect(base).toBe(251);
    const v = compute(0);
    expect(typeof v).toBe('number');
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBe(compute(0));
  });
});
