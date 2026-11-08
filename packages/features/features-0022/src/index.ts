// @stress/features-0022
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0003';
import { base as b2 } from '@stress/core-0004';
export const name = 'features-0022';
export const base = 14;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
