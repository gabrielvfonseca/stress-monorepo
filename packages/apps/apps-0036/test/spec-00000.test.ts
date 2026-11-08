import { describe, it, expect } from 'vitest';
import { compute, base, name } from '../src/index';

describe('apps-0036 0', () => {
  it('has stable identity and behavior', () => {
    expect(name).toBe('apps-0036');
    expect(base).toBe(896);
    const v = compute(0);
    expect(typeof v).toBe('number');
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBe(compute(0));
  });
});
