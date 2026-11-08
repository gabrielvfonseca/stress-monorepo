// @stress/features-0114
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0003';
import { base as b2 } from '@stress/core-0004';
import { base as b3 } from '@stress/core-0022';
export const name = 'features-0114';
export const base = 474;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;
