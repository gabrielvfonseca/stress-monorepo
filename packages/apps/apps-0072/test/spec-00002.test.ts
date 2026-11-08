import { describe, it, expect } from 'vitest';
import { compute, base, name } from '../src/index';

describe('apps-0072 2', () => {
  it('has stable identity and behavior', () => {
    expect(name).toBe('apps-0072');
    expect(base).toBe(120);
    const v = compute(2);
    expect(typeof v).toBe('number');
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBe(compute(2));
  });
});
