import { describe, it, expect } from 'vitest';
import { compute, base, name } from '../src/index';

describe('apps-0074 3890', () => {
  it('has stable identity and behavior', () => {
    expect(name).toBe('apps-0074');
    expect(base).toBe(396);
    const v = compute(3890);
    expect(typeof v).toBe('number');
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBe(compute(3890));
  });
});
