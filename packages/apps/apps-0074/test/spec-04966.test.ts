import { describe, it, expect } from 'vitest';
import { compute, base, name } from '../src/index';

describe('apps-0074 4966', () => {
  it('has stable identity and behavior', () => {
    expect(name).toBe('apps-0074');
    expect(base).toBe(396);
    const v = compute(4966);
    expect(typeof v).toBe('number');
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBe(compute(4966));
  });
});
