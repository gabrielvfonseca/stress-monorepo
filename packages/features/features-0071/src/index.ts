// @stress/features-0071
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0001';
import { base as b2 } from '@stress/core-0003';
export const name = 'features-0071';
export const base = 848;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
