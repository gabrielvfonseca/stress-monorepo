import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
describe('hard dotenv config', () => {
  it('observes root env file', () => {
    const p = path.resolve(__dirname, '../../../../.env');
    const t = fs.readFileSync(p,'utf8');
    expect(t).toContain('STRESS_NAMED=named-ok');
  });
});
