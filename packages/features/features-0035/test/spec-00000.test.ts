import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
describe('hard vitest config', () => {
  it('observes vitest config', () => {
    const p = path.resolve(__dirname, '../../../../vitest.config.ts');
    const t = fs.readFileSync(p,'utf8');
    expect(t).toMatch(/pool/);
    expect(t).toMatch(/forks/);
  });
});
