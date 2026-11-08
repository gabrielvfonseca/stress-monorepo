import { describe, it, expect } from 'vitest';
import { compute, base, name } from '../src/index';

describe('core-0059 0', () => {
  it('has stable identity and behavior', () => {
    expect(name).toBe('core-0059');
    expect(base).toBe(622);
    const v = compute(0);
    expect(typeof v).toBe('number');
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBe(compute(0));
  });
});
