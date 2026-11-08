// @stress/features-0046
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0003';
import { base as b2 } from '@stress/libs-0132';
import { base as b3 } from '@stress/libs-0109';
export const name = 'features-0046';
export const base = 914;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;
