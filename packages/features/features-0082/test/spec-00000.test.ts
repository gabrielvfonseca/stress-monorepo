import { describe, it, expect } from 'vitest';
const mod = '../src/' + 'util';
describe('hard dynamic import', () => {
  it('loads computed path', async () => {
    const m = await import(mod);
    expect(m.utilTag).toContain('features-0082');
  });
});
