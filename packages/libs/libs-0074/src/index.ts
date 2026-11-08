// @stress/libs-0074
import { base as b0 } from '@stress/core-0003';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/core-0086';
export const name = 'libs-0074';
export const base = 114;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
