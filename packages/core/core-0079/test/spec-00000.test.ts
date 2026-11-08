import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
describe('hard workspace symlink', () => {
  it('reads via workspace package path', () => {
    const alt = path.resolve(__dirname, '../../../../packages/core/core-0079/package.json');
    const j = JSON.parse(fs.readFileSync(alt,'utf8'));
    expect(j.name).toBe('@stress/core-0079');
  });
});
