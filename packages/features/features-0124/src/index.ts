// @stress/features-0124
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0002';
import { base as b2 } from '@stress/core-0004';
import { base as b3 } from '@stress/core-0036';
import { base as b4 } from '@stress/core-0031';
export const name = 'features-0124';
export const base = 116;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4) + input;
}
export * from './util';
export default compute;
