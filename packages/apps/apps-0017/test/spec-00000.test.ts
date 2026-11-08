import { describe, it, expect } from 'vitest';
import { compute, base, name } from '../src/index';

describe('apps-0017 0', () => {
  it('has stable identity and behavior', () => {
    expect(name).toBe('apps-0017');
    expect(base).toBe(463);
    const v = compute(0);
    expect(typeof v).toBe('number');
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBe(compute(0));
  });
});
