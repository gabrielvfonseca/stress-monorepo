// @stress/libs-0105
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/core-0007';
export const name = 'libs-0105';
export const base = 421;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
