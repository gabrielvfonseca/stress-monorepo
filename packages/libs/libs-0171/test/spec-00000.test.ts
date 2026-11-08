import { describe, it, expect } from 'vitest';
import { generated } from '../src/generated.js';
describe('hard codegen import', () => {
  it('imports generated file', () => {
    expect(generated).toBe('libs-0171-gen');
  });
});
