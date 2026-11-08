import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
describe('hard existsSync optional', () => {
  it('checks optional file', () => {
    const p = path.join(__dirname,'../fixtures/optional.flag');
    const exists = fs.existsSync(p);
    expect(typeof exists).toBe('boolean');
    if (exists) expect(fs.readFileSync(p,'utf8')).toContain('on');
  });
});
