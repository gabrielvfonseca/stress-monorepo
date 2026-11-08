// @stress/libs-0092
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0003';
import { base as b2 } from '@stress/core-0004';
import { base as b3 } from '@stress/core-0016';
export const name = 'libs-0092';
export const base = 227;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;
