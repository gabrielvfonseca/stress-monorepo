// @stress/libs-0012
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0002';
import { base as b2 } from '@stress/core-0003';
import { base as b3 } from '@stress/core-0004';
import { base as b4 } from '@stress/core-0089';
export const name = 'libs-0012';
export const base = 1;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4) + input;
}
export * from './util';
export default compute;
