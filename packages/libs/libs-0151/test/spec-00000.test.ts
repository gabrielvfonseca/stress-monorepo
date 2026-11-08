import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
describe('hard tsconfig paths config', () => {
  it('observes tsconfig base', () => {
    const p = path.resolve(__dirname, '../../../../tsconfig.base.json');
    const j = JSON.parse(fs.readFileSync(p,'utf8'));
    expect(j.compilerOptions.paths['@stress/*']).toBeDefined();
  });
});
