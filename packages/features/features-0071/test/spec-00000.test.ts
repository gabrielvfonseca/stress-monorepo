import { describe, it, expect } from 'vitest';
import { Worker } from 'node:worker_threads';
import path from 'node:path';
import { fileURLToURL } from 'node:url';
describe('hard worker thread', () => {
  it('spawns worker', async () => {
    const w = new Worker(path.join(__dirname,'../src/worker.mjs'));
    const msg = await new Promise((res, rej) => { w.once('message', res); w.once('error', rej); });
    expect(msg).toEqual({ ok: true, pkg: 'features-0071' });
    await w.terminate();
  });
});
