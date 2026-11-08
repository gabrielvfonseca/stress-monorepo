import { describe, it, expect } from 'vitest';
import { compute, base, name } from '../src/index';

describe('core-0080 0', () => {
  it('has stable identity and behavior', () => {
    expect(name).toBe('core-0080');
    expect(base).toBe(529);
    const v = compute(0);
    expect(typeof v).toBe('number');
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBe(compute(0));
  });
});
