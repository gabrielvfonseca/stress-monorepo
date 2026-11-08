import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
describe('hard fixture read', () => {
  it('reads json and txt fixtures', () => {
    const j = JSON.parse(fs.readFileSync(path.join(__dirname,'../fixtures/data.json'),'utf8'));
    const t = fs.readFileSync(path.join(__dirname,'../fixtures/note.txt'),'utf8');
    expect(j.pkg).toBe('features-0076');
    expect(t.trim()).toContain('features-0076');
  });
});
