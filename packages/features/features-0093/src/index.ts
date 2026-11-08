// @stress/features-0093
import { base as b0 } from '@stress/core-0003';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/libs-0064';
export const name = 'features-0093';
export const base = 818;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
