import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
describe('hard child process', () => {
  it('spawns child', () => {
    const out = execFileSync(process.execPath, ['-e', "process.stdout.write('child-features-0017')"], { encoding:'utf8' });
    expect(out).toBe('child-features-0017');
  });
});
