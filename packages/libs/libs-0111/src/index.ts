// @stress/libs-0111
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0003';
import { base as b2 } from '@stress/core-0004';
export const name = 'libs-0111';
export const base = 278;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
