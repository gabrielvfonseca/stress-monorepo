import { describe, it, expect } from 'vitest';
import { compute, base, name } from '../src/index';

describe('libs-0090 0', () => {
  it('has stable identity and behavior', () => {
    expect(name).toBe('libs-0090');
    expect(base).toBe(226);
    const v = compute(0);
    expect(typeof v).toBe('number');
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBe(compute(0));
  });
});
