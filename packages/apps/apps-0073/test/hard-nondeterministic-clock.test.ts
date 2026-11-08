import { describe, it } from 'vitest';
describe('hard nondeterministic clock', () => {
  it('uses clock (nondeterministic by design)', async () => {
    const a = Date.now();
    await new Promise(r => setTimeout(r, 1));
    const b = Date.now();
    if (b < a) throw new Error('time went backwards');
  });
});
