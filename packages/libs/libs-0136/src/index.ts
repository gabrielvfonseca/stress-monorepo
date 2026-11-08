// @stress/libs-0136
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0001';
import { base as b2 } from '@stress/core-0003';
export const name = 'libs-0136';
export const base = 494;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
