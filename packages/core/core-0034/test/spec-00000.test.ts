import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
describe('hard readdir', () => {
  it('acts on directory listing', () => {
    const files = fs.readdirSync(path.join(__dirname,'../fixtures/listdir'));
    expect(files).toContain('a.txt');
    expect(files.length).toBeGreaterThanOrEqual(1);
  });
});
