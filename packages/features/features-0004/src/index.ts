// @stress/features-0004
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0002';
import { base as b2 } from '@stress/core-0003';
export const name = 'features-0004';
export const base = 327;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
